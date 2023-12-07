const express = require("express");
const mysql = require("mysql");

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servern körs på port ${PORT}`);
});

app.use(express.json()); // för att läsa data från klient och för att skicka svar (ersätter bodyparser som vi använt någon gång tidigare)

const crypto = require("crypto"); //INSTALLERA MED "npm install crypto" I KOMMANDOTOLKEN
function hash(comp) {
  const hash = crypto.createHash("sha256");
  hash.update(comp);
  return hash.digest("hex");
}

const jwt = require("jsonwebtoken"); // installera med "npm install jsonwebtoken"
app.post("/login", function (req, res) {
  console.log(req.body);
  if (!(req.body && req.body.username && req.body.password)) {
    // om efterfrågad data saknas i request
    res.sendStatus(400);
    return;
  }
  let sql = `SELECT * FROM users WHERE username='${req.body.username}'`;

  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    let passwordHash = hash(req.body.password);
    if (result[0].password == passwordHash) {
      //Denna kod skapar en token att returnera till anroparen.
      let payload = {
        sub: result[0].username, //sub är obligatorisk
        name: result[0].name, //Valbar information om användaren
        email: result[0].email,
      };
      let token = jwt.sign(payload, "EnHemlighetSomIngenKanGissaXyz123%&/");
      res.json(token);
    } else {
      res.sendStatus(401);
    }
  });
});

app.get("/users", function (req, res) {
  let authHeader = req.headers["authorization"];
  if (authHeader === undefined) {
    // skicka lämplig HTTP-status om auth-header saknas, en “400 någonting”
    res.sendStatus(400); // "Bad request"
    return;
  }
  let token = authHeader.slice(7); // tar bort "BEARER " från headern.
  // nu finns den inskickade token i variabeln token
  console.log(token);

  // avkoda token
  let decoded;
  try {
    decoded = jwt.verify(token, "EnHemlighetSomIngenKanGissaXyz123%&/");
  } catch (err) {
    console.log(err); //Logga felet, för felsökning på servern.
    res.status(401).send("Invalid auth token");
    return;
  }

  //Här kan man göra något bra med den info som finns i decoded...
  console.log(decoded);
  console.log(`Tjena ${decoded.name}! Din mailadress är ${decoded.email}.`);
  // ... men just nu nöjer vi oss bara att läsa från databasen.
  let sql = "SELECT * FROM users"; // ÄNDRA TILL NAMN PÅ ER EGEN TABELL (om den heter något annat än "users")
  console.log(sql);
  // skicka query till databasen
  con.query(sql, function (err, result, fields) {
    res.send(result);
  });
});

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jensen2023",
  multipleStatements: true,
});

const COLUMNS = ["id", "username", "password", "name", "email"]; // ÄNDRA TILL NAMN PÅ KOLUMNER I ER EGEN TABELL

// Serve your documentation
/* app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dokumentation.html");
}); */
app.post("/users", (req, res) => {
  // kod för att validera input
  if (!req.body.username) {
    res.status(400).send("username required!");
    return; // avslutar metoden
  }
  let fields = ["username", "password", "name", "email"]; // ändra eventuellt till namn på er egen databastabells kolumner
  for (let key in req.body) {
    if (!fields.includes(key)) {
      res.status(400).send("Unknown field: " + key);
      return; // avslutar metoden
    }
  }
  // kod för att hantera anrop
  let sql = `INSERT INTO users (username, password, name, email)
      VALUES ('${req.body.username}',  
      '${hash(req.body.password)}',
      '${req.body.name}',
      '${req.body.email}');
      SELECT LAST_INSERT_ID();`; // OBS: innehåller två query: ett insert och ett select
  console.log(sql);

  con.query(sql, (err, result, fields) => {
    if (err) throw err;
    // kod för att hantera retur av data
    console.log(result);
    let output = {
      id: result[1][0].id,
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
    };
    res.send(output);
  });
});

// Get all users or filter based on query parameters
/* app.get("/users", (req, res) => {
  let sql = "SELECT * FROM users";
  let condition = createCondition(req.query);
  console.log(sql + condition);

  con.query(sql + condition, (err, result, fields) => {
    res.send(result);
  });
}); */

// route-parameter, dvs. filtrera efter ID i URL:en
app.get("/users/:id", (req, res) => {
  // Värdet på id ligger i req.params
  let sql = "SELECT * FROM users WHERE id=" + req.params.id;
  console.log(sql);
  // skicka query till databasen
  con.query(sql, (err, result, fields) => {
    if (result.length > 0) {
      res.send(result);
    } else {
      res.sendStatus(404); // 404=not found
    }
  });
});

// Add a new user

function createCondition(query) {
  let output = " WHERE ";
  for (let key in query) {
    if (COLUMNS.includes(key)) {
      output += `${key}="${query[key]}" OR `;
    }
  }
  if (output.length == 7) {
    return "";
  } else {
    return output.substring(0, output.length - 4); // ta bort sista " OR "
  }
}
app.use(express.json());

app.put("/users/:id", function (req, res) {
  //kod här för att hantera anrop…
  // kolla först att all data som ska finnas finns i request-body
  if (!(req.body && req.body.name && req.body.email && req.body.password)) {
    // om data saknas i body
    res.sendStatus(400);
    return;
  }
  let sql = `UPDATE users 
        SET name = '${req.body.name}', email = '${req.body.email}', password = '${req.body.password}'
        WHERE id = ${req.params.id}`;

  con.query(sql, function (err, result, fields) {
    if (err) {
      throw err;
      //kod här för felhantering, skicka felmeddelande osv.
    } else {
      // meddela klienten att request har processats OK
      res.sendStatus(200);
    }
  });
});
