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

app.get("/",(req,res)=>{
    res.render("index")
})

app.post("/command",(req,res)=>{
    const command = req.body.command.toLowerCase();

    if(command.includes("calculator")){
        exec("calc");
        return res.json({reply: "Opened Calculator"});
    }
    else if(command.includes("chrome")){
        exec("start chrome");
        return res.json({ reply: "Opened Chrome" });
    }
    else if(command.includes("vs code")){
        exec("code");
        return res.json({reply: "Opened VS code"});
    }
    else if(command.includes("notepad")){
        exec("notepad");
        return res.json({reply: "Opened Notepad"});
    }
    // else if(command.startsWith("open folder")){
    //     let foldername = command.replace("open folder","").trim();

    //     if(foldername){
    //         let folderpath = `C:\Users\Windows\Desktop\${foldername}`;
    //         exec(`start "" "${foldername}"`, (error)=>{
    //             if(error){
    //                 reply = `Could not open folder: ${folderName}`;
    //             }
    //             else{
    //                 reply = `Opening folder: ${folderName}`;
    //             }
    //             res.json({ reply });
    //         })
    //     }
    // }
    // else if(command.includes("whatsapp")){
    //     exec('"C:\\Users\\Windows\\AppData\\Local\\WhatsApp\\WhatsApp.exe"');
    //     return res.json({reply:"Opend Whatsapp"})
    // }
    else{
        return res.json({ reply: "Sorry, I didn't understand that command." });
    }
})

app.listen(port,()=>{
    console.log("The app is listning on port : " ,port);
})