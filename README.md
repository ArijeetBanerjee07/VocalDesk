# 🎤 VocalDesk

A modern voice-controlled desktop assistant that allows users to control applications hands-free using voice commands. Built with Node.js, Express, and the Web Speech API.

## ✨ Features

- **Voice Recognition**: Real-time speech-to-text using Web Speech API
- **Modern Full-Window UI**: Sleek sidebar navigation with smooth animations
- **Application Control**: Launch desktop applications with voice commands
- **Command History**: Track and review your voice commands with timestamps
- **Interactive Keyboard Shortcuts**: Learn 40+ keyboard shortcuts across 5 categories with live animations
- **Practice Mode**: Interactive learning mode with real-time visual feedback
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **RESTful API**: Clean backend architecture with Express.js
- **Cross-browser Support**: Works with Chrome, Edge, and other Chromium-based browsers

## 🚀 Supported Voice Commands

- "Open Calculator" - Launches Windows Calculator
- "Open Chrome" - Opens Google Chrome browser
- "Open VS Code" - Launches Visual Studio Code
- "Open Notepad" - Opens Windows Notepad

## ⌨️ Keyboard Shortcuts Categories

### VocalDesk Shortcuts
- Space - Start voice recognition
- Esc - Stop listening
- H - View history
- Ctrl+C - Clear history
- ? - Show help

### General Shortcuts
Copy, Paste, Cut, Undo, Redo, Select All, Save, Print, Find

### Text Editing
Bold, Italic, Underline, Word navigation, Line navigation

### Browser Shortcuts
New Tab, Close Tab, Refresh, Zoom, Tab switching

### Windows Shortcuts
Show Desktop, File Explorer, Lock PC, Window snapping, App switching

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Template Engine**: EJS
- **APIs**: Web Speech API (Speech Recognition)
- **Process Management**: Node.js Child Process
- **UI/UX**: Modern glassmorphism design, SVG icons, CSS animations

## 📋 Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- Modern web browser with Web Speech API support (Chrome, Edge)
- Windows OS (for application launching features)

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/ArijeetBanerjee07/VocalDesk.git
cd VocalDesk
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:8080
```

## 💻 Usage

### Voice Control
1. Click the "Start Listening" button or press Space
2. Allow microphone access when prompted
3. Speak a command clearly (e.g., "Open Calculator")
4. The application will process your command and launch the requested program

### Learning Shortcuts
1. Click "Learn" in the sidebar
2. Browse through 5 categories of shortcuts
3. Enable "Practice Mode" to see live animations
4. Press any shortcut key to see it highlighted in real-time

## 📁 Project Structure

```
vocaldesk/
├── public/
│   ├── script.js      # Client-side logic with voice recognition
│   └── style.css      # Modern full-window responsive styling
├── views/
│   └── index.ejs      # Main application interface
├── index.js           # Express server and API routes
├── package.json       # Project dependencies and scripts
├── .gitignore         # Git ignore rules
└── README.md          # Project documentation
```

## 🎨 UI Features

- **Sidebar Navigation**: Clean navigation with SVG icons
- **Hero Section**: Large, impactful landing page with gradient text
- **Sound Wave Animation**: Visual feedback during voice recognition
- **Stats Dashboard**: Real-time command statistics
- **Command Cards**: Interactive cards for each available command
- **History Timeline**: Modern timeline view of command history
- **Keyboard Visualizations**: 3D keyboard keys with press animations
- **Practice Mode**: Interactive learning with visual feedback
- **Mobile Responsive**: Hamburger menu and floating action button

## 🔒 Security Considerations

- Application uses `child_process.exec()` for launching programs
- Input validation implemented to prevent command injection
- Runs on localhost by default
- Consider additional security measures for production deployment

## 🌟 Future Enhancements

- Add more application commands
- Implement custom command configuration
- Add voice feedback using Text-to-Speech
- Support for macOS and Linux
- Advanced analytics dashboard
- Multi-language support
- Cloud sync for command history
- Custom keyboard shortcut creation

## 📝 License

MIT

## 👤 Author

Arijeet Banerjee - [GitHub Profile](https://github.com/ArijeetBanerjee07)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 🙏 Acknowledgments

- Web Speech API for voice recognition
- Express.js for backend framework
- Modern CSS techniques for beautiful UI

---

**Note**: This project is designed for Windows environments. Application launching commands may need modification for other operating systems.
