# 🎤 VocalDesk

A voice-controlled desktop assistant that allows users to control applications hands-free using voice commands. Built with Node.js, Express, and the Web Speech API.

## ✨ Features

- **Voice Recognition**: Real-time speech-to-text using Web Speech API
- **Application Control**: Launch desktop applications with voice commands
- **Responsive UI**: Modern, dark-themed interface with visual feedback
- **RESTful API**: Clean backend architecture with Express.js
- **Cross-browser Support**: Works with Chrome, Edge, and other Chromium-based browsers

## 🚀 Supported Commands

- "Open Calculator" - Launches Windows Calculator
- "Open Chrome" - Opens Google Chrome browser
- "Open VS Code" - Launches Visual Studio Code
- "Open Notepad" - Opens Windows Notepad

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Template Engine**: EJS
- **APIs**: Web Speech API (Speech Recognition)
- **Process Management**: Node.js Child Process

## 📋 Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- Modern web browser with Web Speech API support (Chrome, Edge)
- Windows OS (for application launching features)

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vocaldesk
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

1. Click the "Start Listening" button
2. Allow microphone access when prompted
3. Speak a command clearly (e.g., "Open Calculator")
4. The application will process your command and launch the requested program

## 📁 Project Structure

```
vocaldesk/
├── public/
│   ├── script.js      # Client-side voice recognition logic
│   └── style.css      # Responsive styling
├── views/
│   └── index.ejs      # Main application interface
├── index.js           # Express server and API routes
├── package.json       # Project dependencies and scripts
└── README.md          # Project documentation
```

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
- Command history and analytics
- Multi-language support

## 📝 License

MIT

## 👤 Author

Your Name - [Your GitHub Profile]

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Note**: This project is designed for Windows environments. Application launching commands may need modification for other operating systems.
