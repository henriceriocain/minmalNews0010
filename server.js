// Requirments
const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");
const db = require("./db/db-config");
const qs = require("querystring");
const bcrypt = require("bcrypt");
const Session = require("node-session");

const session = new Session ({
  secret: "CSCI1170A3",
  cookie: {
    maxAge: 7000 * 60 * 60 * 24,
    httpOnly: true,
  }
});

const server = http.createServer((req, res) => {

  session.startSession(req, res, () => {
    handleRequest(req, res);
  });

});

// Handles server requests
function handleRequest(req, res){

  // Variables
  const requestedMethod = req.method;
  const requestedPath = url.parse(req.url).pathname;
  const requestedParams = url.parse(req.url).query;
  let requestedFilePath;

  // Helper logs to check whats being requested
  if(requestedMethod === "GET"){
    console.log(requestedPath + requestedParams);
  }

  // Get / Endpoint
  if(requestedMethod === "GET" && requestedPath === "/"){
    requestedFilePath = path.join(__dirname, "public", "index.html");
    fs.readFile(requestedFilePath, "utf-8", (err, data) => {
      if(err){
        res.writeHead(500, {"Content-Type": "text/plain"});
        return res.end("Server error reading file");
      }
      console.log("Within /");
      console.log(req.session.get("userId"));
      console.log(req.session.get("isLoggedIn"));

      let finalFile;
      if(req.session.get("isLoggedIn")){
        finalFile = data
          .replace("%_NAVLINK1_%", "Welcome user!")
          .replace("%_NAVLINKHREF1_%", "/")
          .replace("%_NAVLINK2_%", "Logout")
          .replace("%_NAVLINKHREF2_%", "/logout");
      } else {
        finalFile = data
          .replace("%_NAVLINK1_%", "Login")
          .replace("%_NAVLINKHREF1_%", "/login.html")
          .replace("%_NAVLINK2_%", "Register")
          .replace("%_NAVLINKHREF2_%", "/register.html");
      }
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(finalFile);
    });
  }

  // GET /script.js Endpoint
  if(requestedMethod === "GET" && requestedPath === "/script.js"){
    requestedFilePath = path.join(__dirname, "public", "script.js");
    fs.readFile(requestedFilePath, (err, data) => {
      if(err){
        res.writeHead(500, {"Content-Type": "text/plain"});
        return res.end("Server error reading file");
      }
      res.writeHead(200, {"Content-Type": "application/javascript"})
      res.end(data);
    });
  }

  // GET /articles Endpoint
  if(requestedMethod === "GET" && requestedPath === "/articles"){
    db.query(
      "SELECT * FROM articles", 
      (err, data) => {
      if(err){
        res.writeHead(500, {"Content-Type": "text/plain"});
        return res.end("Server error reading db");
      }
      // console.log(data);
      res.writeHead(200, {"Content-Type": "application/json"});
      // res.end() ALWAYS NEEDS A STRING OR BUFER!!!
      res.end(JSON.stringify(data));
    });
  }

  // GET /articles?article Endpoint
  if(requestedMethod === "GET" && requestedPath === "/article" && requestedParams){
    if(req.session.get("isLoggedIn")){
      db.query(
        "SELECT * FROM articles WHERE a_slug = ?",
        [requestedParams],
        (err, data) => {
        if(err){
          res.writeHead(500, {"Content-Type": "text/plain"});
          res.end("Server error reading file");
        }
        fs.readFile(path.join(__dirname, "public", "article.html"), "utf-8", (err, file) => {
          if(err){
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.end("Server error reading file");
          }
          let finalFile = file
            .replace("%_HEADER_%", data[0].a_title)
            .replace("%_CONTENTS_%", data[0].a_content)
            .replace("%_ISPREMIUM_%", (data[0].is_premium ? "Premium article" : "Free article"));
          res.writeHead(200, {"Content-Type": "text/html"});
          res.end(finalFile);
        });
      });
    } else {
      db.query(
        "SELECT * FROM articles WHERE a_slug = ?",
        [requestedParams],
        (err, data) => {
        if(err){
          res.writeHead(500, {"Content-Type": "text/plain"});
          res.end("Server error reading file");
        }
        fs.readFile(path.join(__dirname, "public", "article.html"), "utf-8", (err, file) => {
          if(err){
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.end("Server error reading file");
          }
          let finalFile = file
            .replace("%_HEADER_%", data[0].a_title)
            .replace("%_CONTENTS_%", data[0].a_teaser)
            .replace("%_ISPREMIUM_%", (data[0].is_premium ? "Premium article: Please log in to see the rest of the article" : "Free article"));
          res.writeHead(200, {"Content-Type": "text/html"});
          res.end(finalFile);
        });
      });
    }
  }


  // GET /search Endpoint
  if(requestedMethod === "GET" && requestedPath === "/search"){
    requestedFilePath = path.join(__dirname, "public", "results.html");
    fs.readFile(requestedFilePath, (err, data) => {
      if(err){
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.end("Server error reading file");
      }
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(data);
    });
  }

  // GET /results Endpoint
  if(requestedMethod === "GET" && requestedPath === "/results"){
    db.query(
      "SELECT * FROM articles WHERE LOWER(a_title) LIKE ?",
      [`%${requestedParams.toLowerCase()}%`],
      (err, data) => {
        if(err){
          res.writeHead(500, {"Content-Type": "text/plain"});
          return res.end("Server error reading file")
        }
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(data));
      }
    );
  }

  // GET /login.html
  if(requestedMethod === "GET" && requestedPath === "/login.html"){
    requestedFilePath = path.join(__dirname, "public", "login.html");
    fs.readFile(requestedFilePath, (err, data) => {
        if(err){
          res.writeHead(500, {"Content-Type": "text/plain"});
          return res.end("Server error reading file")
        }
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(data);
    });
  }

  // GET /register.html
  if(requestedMethod === "GET" && requestedPath === "/register.html"){
    requestedFilePath = path.join(__dirname, "public", "register.html");
    fs.readFile(requestedFilePath, (err, data) => {
        if(err){
          res.writeHead(500, {"Content-Type": "text/plain"});
          return res.end("Server error reading file")
        }
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(data);
    });
  }

  // POST /register
  if(requestedMethod === "POST" && requestedPath === "/register"){
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      // email=henriceriocain%40dal.ca&password=1234
      let inputObject = qs.parse(body);
      let email = inputObject.email;
      let password = inputObject.password;

      db.query(
        "SELECT id FROM users WHERE email = ?",
        [email],
        async (err, data) => {
          if(err){
            res.writeHead(500, {"Content-Type": "text/plain"});
            return res.end("Server error reading db");
          }
          if(data.length == 0){
            let passwordRequirements = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[ ])(?=.*[^A-Za-z\d ]).{16,}$/;
            if(passwordRequirements.test(password)){
              console.log("Good!");


              let encrpytedPassword = await bcrypt.hash(password, 4);
              let now = new Date();

              db.query(
                "INSERT INTO users (email, password_hash, created_at, updated_at) VALUES (?, ?, ?, ?)",
                [email, encrpytedPassword, now, now],
                (err, summary) => {
                  if(err){
                    res.writeHead(500, {"Content-Type": "text/plain"});
                    return res.end("Server error reading db");
                  }
                    requestedFilePath = path.join(__dirname, "public", "login.html");
                    fs.readFile(requestedFilePath, (err, data) => {
                        if(err){
                          res.writeHead(500, {"Content-Type": "text/plain"});
                          return res.end("Server error reading file")
                        }
                        res.writeHead(200, {"Content-Type": "text/html"});
                        res.end(data);
                    });
                }
              );
              
            } else {
              console.log("BAD!");
            }
          } else {
            res.writeHead(500, {"Content-Type": "text/plain"});
            return res.end("Account already exists");
          }
        }
      );

    });
  }

  // POST /login
  if(requestedMethod === "POST" && requestedPath === "/login"){
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {

      let jsObject = qs.parse(body);
      let email = jsObject.email;
      let password = jsObject.password;
    
      console.log("User input password: ");
      console.log(password);

      db.query(
        "SELECT password_hash, id FROM users WHERE email = ?",
        [email],
        async (err, data) => {
          if(err){
            res.writeHead(500, {"Content-Type": "text/plain"});
            return res.end("Server error reading db");
          }
          let dbHash = data[0].password_hash;
          if(await bcrypt.compare(password, dbHash)){

            console.log("Login Successful!");
            console.log(data[0].id);
            req.session.put("userId", data[0].id);
            req.session.put("isLoggedIn", true);

            console.log("Within /Login");
            console.log(req.session.get("userId"));
            console.log(req.session.get("isLoggedIn"));

            res.writeHead("302", {"Location": "/"});
            return res.end();
          }
          else {
            console.log("Not the same");
            console.log(dbHash);
            console.log(inputHash);
          }
        }
      );

    });
  }

  // GET /logout
  if(requestedMethod === "GET" && requestedPath === "/logout"){
    req.session.flush();
    res.writeHead(302, {"Location": "/"});
    res.end();
  }
}

server.listen(8000, "localhost", () => {
  console.log("Server started at: http://localhost:8000");
});
