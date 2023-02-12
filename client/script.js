if ("WebSocket" in window) {
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const yourContent = document.querySelector('.your-content-box');
    const contentBox = document.querySelector('.my-content-box');
    console.log("The browser supports it")
    const ws = new WebSocket('ws://localhost:3000');

    const displayMessage = (val) => {
        let p = document.createElement('p');
        p.textContent = val;
        p.classList.add("my-message");
        contentBox.appendChild(p);
        messageInput.value = "";
    }
    const displayYourMessage = (val) =>{
        let p = document.createElement('p');
        p.textContent = val;
        p.classList.add('your-message');
        yourContent.appendChild(p);
        messageInput.value = "";
    }
    ws.onopen = () => {
        console.log("Server connected")
    }
    sendBtn.addEventListener('click', e => {
        if (ws) {
            ws.send(messageInput.value)
            displayMessage(messageInput.value.trim());
        }else{
            alert("No connection established with the backend. Refresh and try again")
        }
    })

    ws.onmessage = (message) => {
        console.log(`The message is ${message.data}`);
        displayYourMessage(message.data);
    }
    ws.close = () => {
        ws = null;
        alert("Connection closed, Refresh to load");
    };
} else {
    alert("WebSocket is not supported by your browser");
}