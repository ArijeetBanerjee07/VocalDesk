const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { fileURLToPath } = require("url");
const { exec } = require("child_process");

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());

let port = 8080;




app.listen(port,()=>{
    console.log("The app is listning on port : " ,port);
})