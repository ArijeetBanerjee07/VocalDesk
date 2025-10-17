const startBtn = document.getElementById("startBtn");
const commandText = document.getElementById("commandText");
const statusText = document.getElementById("status");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition;

recognition.lang = "en-US";
recognition.interimResults = false;

startBtn.addEventListener("click",()=>{
    statusText.textContent = "Listening...."
    recognition.start();
})

recognition.onresult = async (event)=>{
    const transcript = event.results[0][0].transcript.toLowerCase(); //the speech
    commandText.textContent = transcript;
    statusText.textContent = "processing...";

    // sending data to backend

    const res = await fetch("/command",{
        method:"POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify({command:transcript})
    });
    const data = await res.json();
    statusText.textContent = data.reply;
}

recognition.onerror = (event) => {
    statusText.textContent = "Error: " + event.error;
};