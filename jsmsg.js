document.getElementById('messageForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting traditionally

    const messageInput = document.getElementById('message');
    const message = messageInput.value;

    // Clear the input field after submitting
    messageInput.value = '';

    // Display the sent message in the message history
    const messageList = document.getElementById('messageList');
    const sentMessageElement = document.createElement('li');
    sentMessageElement.className = 'sent';
    sentMessageElement.textContent = `You: ${message}`;
    messageList.appendChild(sentMessageElement);

    // Create the FormData object to send the message
    const data = new FormData();
    data.append('username', 'temp-idk-test-dynamic');
    data.append('key', '1B490066-EA03-E39A-A18C-C4868E45CFAE'); // Static key or API key
    data.append('message', message);

    // Create a new XMLHttpRequest to send the message
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status >= 200 && this.status < 300) {
                // Success! Show the received response as a message
                const receivedMessage = JSON.parse(this.responseText).response || 'No response from server';
                const receivedMessageElement = document.createElement('li');
                receivedMessageElement.className = 'received';
                receivedMessageElement.textContent = `API: ${receivedMessage}`;
                messageList.appendChild(receivedMessageElement);
            } else {
                // Handle error response
                const errorElement = document.createElement('li');
                errorElement.className = 'received';
                errorElement.textContent = 'Error: Failed to send message.';
                messageList.appendChild(errorElement);
            }
        }
    });

    // Open and send the request to the API
    xhr.open('POST', 'https://inteltech.p.rapidapi.com/credit.php');
    xhr.setRequestHeader('x-rapidapi-key', 'feed8a256amsh34f63651972352cp1b95efjsn4c5e7103f99e');
    xhr.setRequestHeader('x-rapidapi-host', 'inteltech.p.rapidapi.com');
    xhr.send(data);
});
