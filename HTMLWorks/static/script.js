document.getElementById("openChatBtn").addEventListener("click", function() {
    document.getElementById("chatPopup").style.display = "block";
});

document.getElementById("closeChatBtn").addEventListener("click", function() {
    document.getElementById("chatPopup").style.display = "none";
});

document.getElementById("sendBtn").addEventListener("click", function() {
    sendMessage();
});

document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});


async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    // Display user message
    appendMessage('user', userInput);

    // Send request to the backend
    const response = await fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: userInput })
    });

    const data = await response.json();
    if (data.error) {
        appendMessage('bot', 'Error: ' + data.error);
    } else {
        appendMessage('bot', data.result);
    }

    // Clear input field
    document.getElementById('user-input').value = '';
}

function appendMessage(sender, message) {
    const chatBody = document.getElementById('chat-body');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', sender);

    const avatarElement = document.createElement('div');
    avatarElement.classList.add('avatar');
    avatarElement.textContent = sender === 'user' ? 'U' : 'B';

    const textElement = document.createElement('div');
    textElement.classList.add('message');
    textElement.textContent = message;

    messageElement.appendChild(avatarElement);
    messageElement.appendChild(textElement);
    chatBody.appendChild(messageElement);

    // Scroll to the bottom
    chatBody.scrollTop = chatBody.scrollHeight;
}

