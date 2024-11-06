const username = "Chanyang"
const welcomeMSG = document.getElementById("welcome-msg");

welcomeMSG.textContent += username === "" ? `Guest` : username;

