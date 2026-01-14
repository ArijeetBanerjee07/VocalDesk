const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { exec } = require("child_process");

// Middleware configuration
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());

// Server configuration
const PORT = process.env.PORT || 8080;

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

// Command mapping for voice-controlled applications
const commandMap = {
    calculator: { cmd: "calc", response: "Opened Calculator" },
    chrome: { cmd: "start chrome", response: "Opened Chrome" },
    "vs code": { cmd: "code", response: "Opened VS Code" },
    notepad: { cmd: "notepad", response: "Opened Notepad" }
};

app.post("/command", (req, res) => {
    const command = req.body.command?.toLowerCase();

    if (!command) {
        return res.status(400).json({ reply: "No command received." });
    }

    // Check command map for matching application
    for (const [key, value] of Object.entries(commandMap)) {
        if (command.includes(key)) {
            exec(value.cmd, (error) => {
                if (error) {
                    console.error(`Error executing ${key}:`, error);
                }
            });
            return res.json({ reply: value.response });
        }
    }

    // Default response for unrecognized commands
    return res.json({ reply: "Sorry, I didn't understand that command." });
});

// Start server
app.listen(PORT, () => {
    console.log(`🎤 VocalDesk is running on http://localhost:${PORT}`);
});