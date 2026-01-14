// VocalDesk - Modern Full Window Design
const startBtn = document.getElementById("startBtn");
const commandText = document.getElementById("commandText");
const statusText = document.getElementById("status");
const soundWave = document.getElementById("soundWave");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");
const practiceBtn = document.getElementById("practiceBtn");
const practiceStatus = document.getElementById("practiceStatus");
const fabBtn = document.getElementById("fabBtn");
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const sidebar = document.querySelector(".sidebar");
const totalCommandsEl = document.getElementById("totalCommands");

// Navigation
const navItems = document.querySelectorAll(".nav-item");
const contentSections = document.querySelectorAll(".content-section");

// Command history storage
let commandHistory = JSON.parse(localStorage.getItem("vocalDeskHistory")) || [];

// Practice mode state
let practiceMode = false;

// Initialize Speech Recognition API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    statusText.textContent = "Speech Recognition not supported";
    startBtn.disabled = true;
    fabBtn.disabled = true;
} else {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    // Start listening function
    const startListening = () => {
        statusText.textContent = "Listening...";
        commandText.textContent = "Speak now...";
        soundWave.classList.add("active");
        startBtn.classList.add("listening");
        try {
            recognition.start();
        } catch (error) {
            console.log("Recognition already started");
        }
    };

    // Start listening on button click
    startBtn.addEventListener("click", startListening);
    fabBtn.addEventListener("click", startListening);

    // Keyboard shortcuts handler
    document.addEventListener("keydown", (event) => {
        // Animate key press
        animateKeyPress(event.code, event.ctrlKey);

        // Space bar to start listening
        if (event.code === "Space" && event.target === document.body) {
            event.preventDefault();
            startListening();
            if (practiceMode) {
                practiceStatus.textContent = "✓ Great! You pressed Space to start listening!";
                practiceStatus.style.color = "var(--primary)";
            }
        }

        // Escape to stop listening
        if (event.code === "Escape") {
            try {
                recognition.stop();
                statusText.textContent = "Stopped";
                soundWave.classList.remove("active");
                startBtn.classList.remove("listening");
                if (practiceMode) {
                    practiceStatus.textContent = "✓ Perfect! You pressed Escape to stop!";
                    practiceStatus.style.color = "var(--primary)";
                }
            } catch (error) {
                console.log("Recognition not active");
            }
        }

        // H to toggle history
        if (event.code === "KeyH" && !event.ctrlKey && event.target === document.body) {
            event.preventDefault();
            navigateToSection("history");
            if (practiceMode) {
                practiceStatus.textContent = "✓ Awesome! You navigated to history!";
                practiceStatus.style.color = "var(--primary)";
            }
        }

        // Ctrl+C to clear history
        if (event.ctrlKey && event.code === "KeyC" && event.target === document.body) {
            event.preventDefault();
            commandHistory = [];
            localStorage.removeItem("vocalDeskHistory");
            renderHistory();
            if (practiceMode) {
                practiceStatus.textContent = "✓ Excellent! History cleared with Ctrl+C!";
                practiceStatus.style.color = "var(--primary)";
            }
        }

        // ? (Shift+/) to show help
        if (event.shiftKey && event.code === "Slash") {
            event.preventDefault();
            navigateToSection("shortcuts");
            if (practiceMode) {
                practiceStatus.textContent = "✓ Nice! You opened the shortcuts guide!";
                practiceStatus.style.color = "var(--primary)";
            }
        }
    });

    // Process recognized speech
    recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        commandText.textContent = transcript;
        statusText.textContent = "Processing...";
        soundWave.classList.remove("active");

        try {
            // Send command to backend
            const response = await fetch("/command", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ command: transcript })
            });

            const data = await response.json();
            statusText.textContent = data.reply;

            // Add to history
            addToHistory(transcript, data.reply);
        } catch (error) {
            statusText.textContent = "Error: Could not process command";
            console.error("Fetch error:", error);
        }
    };

    // Handle recognition errors
    recognition.onerror = (event) => {
        statusText.textContent = `Error: ${event.error}`;
        console.error("Recognition error:", event.error);
        soundWave.classList.remove("active");
        startBtn.classList.remove("listening");
    };

    // Reset button state when recognition ends
    recognition.onend = () => {
        soundWave.classList.remove("active");
        startBtn.classList.remove("listening");
        if (statusText.textContent === "Listening...") {
            statusText.textContent = "Ready";
        }
    };
}

// Navigation functionality
navItems.forEach(item => {
    item.addEventListener("click", () => {
        const section = item.dataset.section;
        navigateToSection(section);
        
        // Close mobile menu
        if (window.innerWidth <= 768) {
            sidebar.classList.remove("active");
            mobileMenuToggle.classList.remove("active");
        }
    });
});

function navigateToSection(section) {
    // Update nav items
    navItems.forEach(nav => nav.classList.remove("active"));
    document.querySelector(`[data-section="${section}"]`).classList.add("active");

    // Update content sections
    contentSections.forEach(content => content.classList.remove("active"));
    document.getElementById(section).classList.add("active");
}

// Mobile menu toggle
mobileMenuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    mobileMenuToggle.classList.toggle("active");
});

// Close sidebar when clicking outside on mobile
document.addEventListener("click", (event) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            sidebar.classList.remove("active");
            mobileMenuToggle.classList.remove("active");
        }
    }
});

// Add command to history
function addToHistory(command, response) {
    const timestamp = new Date().toLocaleTimeString();
    const historyItem = { command, response, timestamp };
    
    commandHistory.unshift(historyItem);
    if (commandHistory.length > 20) commandHistory.pop();
    
    localStorage.setItem("vocalDeskHistory", JSON.stringify(commandHistory));
    renderHistory();
    updateStats();
}

// Render history list
function renderHistory() {
    if (commandHistory.length === 0) {
        historyList.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">📭</span>
                <p>No commands yet</p>
                <span class="empty-hint">Start speaking to see your history</span>
            </div>
        `;
        return;
    }

    historyList.innerHTML = commandHistory.map(item => `
        <div class="history-item-modern">
            <span class="history-icon">🎤</span>
            <div class="history-content">
                <div class="history-command">${item.command}</div>
                <div class="history-response">✓ ${item.response}</div>
            </div>
            <div class="history-time">${item.timestamp}</div>
        </div>
    `).join("");
}

// Update stats
function updateStats() {
    totalCommandsEl.textContent = commandHistory.length;
}

// Clear history
clearHistoryBtn.addEventListener("click", () => {
    commandHistory = [];
    localStorage.removeItem("vocalDeskHistory");
    renderHistory();
    updateStats();
});

// Keyboard animation function
function animateKeyPress(keyCode, ctrlKey = false) {
    const keyVisual = document.querySelector(`.key-visual[data-key="${keyCode}"]`);
    
    if (keyVisual) {
        keyVisual.classList.add("pressed");
        
        // Highlight the shortcut card
        const shortcutCard = keyVisual.closest(".shortcut-card");
        if (shortcutCard) {
            shortcutCard.classList.add("active");
        }

        setTimeout(() => {
            keyVisual.classList.remove("pressed");
            if (shortcutCard) {
                shortcutCard.classList.remove("active");
            }
        }, 300);
    }

    // Handle Ctrl combinations
    if (ctrlKey && keyCode === "KeyC") {
        const ctrlCVisual = document.querySelector('.key-visual.combo[data-key="KeyC"]');
        if (ctrlCVisual) {
            ctrlCVisual.classList.add("pressed");
            const shortcutCard = ctrlCVisual.closest(".shortcut-card");
            if (shortcutCard) {
                shortcutCard.classList.add("active");
            }

            setTimeout(() => {
                ctrlCVisual.classList.remove("pressed");
                if (shortcutCard) {
                    shortcutCard.classList.remove("active");
                }
            }, 300);
        }
    }
}

// Practice mode toggle
practiceBtn.addEventListener("click", () => {
    practiceMode = !practiceMode;
    
    if (practiceMode) {
        practiceBtn.innerHTML = '<span>🛑</span> Stop Practice';
        practiceBtn.style.background = "linear-gradient(135deg, #ff6b6b, #ff5252)";
        practiceStatus.textContent = "Practice Mode Active! Try pressing any shortcut key...";
        practiceStatus.style.color = "var(--primary)";
        
        // Add visual indicator to all shortcuts
        document.querySelectorAll(".shortcut-card").forEach(card => {
            card.classList.add("practice-active");
        });
    } else {
        practiceBtn.innerHTML = '<span>🎮</span> Practice Mode';
        practiceBtn.style.background = "linear-gradient(135deg, var(--primary), var(--primary-dark))";
        practiceStatus.textContent = "Press any shortcut key to see it in action!";
        practiceStatus.style.color = "var(--text-secondary)";
        
        // Remove visual indicator
        document.querySelectorAll(".shortcut-card").forEach(card => {
            card.classList.remove("practice-active");
        });
    }
});

// Command cards click to navigate
document.querySelectorAll(".command-card-modern").forEach(card => {
    card.addEventListener("click", () => {
        navigateToSection("home");
        startListening();
    });
});

// Shortcuts tabs functionality
const tabBtns = document.querySelectorAll(".tab-btn");
const shortcutsCategories = document.querySelectorAll(".shortcuts-category");

tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.dataset.category;
        
        // Update active tab
        tabBtns.forEach(tab => tab.classList.remove("active"));
        btn.classList.add("active");
        
        // Show corresponding category
        shortcutsCategories.forEach(cat => {
            cat.classList.remove("active");
            if (cat.dataset.category === category) {
                cat.classList.add("active");
            }
        });
    });
});

// Enhanced keyboard detection for all shortcuts
document.addEventListener("keydown", (event) => {
    // Build shortcut identifier
    let shortcutId = "";
    if (event.ctrlKey) shortcutId += "ctrl-";
    if (event.shiftKey) shortcutId += "shift-";
    if (event.altKey) shortcutId += "alt-";
    if (event.metaKey) shortcutId += "win-";
    
    // Add the key
    const key = event.key.toLowerCase();
    if (key === " ") shortcutId += "space";
    else if (key === "arrowleft") shortcutId += "left";
    else if (key === "arrowright") shortcutId += "right";
    else if (key === "arrowup") shortcutId += "up";
    else if (key === "arrowdown") shortcutId += "down";
    else if (key === "backspace") shortcutId += "backspace";
    else if (key === "+") shortcutId += "plus";
    else if (key === "-") shortcutId += "minus";
    else shortcutId += key;
    
    // Remove trailing dash
    shortcutId = shortcutId.replace(/-$/, "");
    
    // Find and animate matching shortcut card
    const matchingCard = document.querySelector(`.shortcut-card[data-keys="${shortcutId}"]`);
    if (matchingCard && practiceMode) {
        matchingCard.classList.add("active");
        
        // Animate all key visuals in the card
        const keyVisuals = matchingCard.querySelectorAll(".key-visual");
        keyVisuals.forEach(kv => kv.classList.add("pressed"));
        
        // Update practice status
        const title = matchingCard.querySelector(".shortcut-title").textContent;
        practiceStatus.textContent = `✓ Perfect! You pressed: ${title}`;
        practiceStatus.style.color = "var(--primary)";
        
        setTimeout(() => {
            matchingCard.classList.remove("active");
            keyVisuals.forEach(kv => kv.classList.remove("pressed"));
        }, 500);
    }
});

// Load history on page load
renderHistory();
updateStats();
