const vscode = acquireVsCodeApi();

/**
 * Add load event.
 */
window.addEventListener("load", main);

// Declare Html elements.
const startChatButton = document.getElementById("start-ai-assistant-button");
const startImageButton = document.getElementById("image-generate-button");

/**
 * Main function
 */
function main() {

  // Add event Listeners of Html elements.
  startChatButton?.addEventListener("click", handleStartButtonClick);
  startImageButton?.addEventListener("click", handleImageButtonClick);

  // Handle messages sent from the extension or panel to the webview
  window.addEventListener('message', (event) => {
    const message = event.data; // The json data that the extension sent
    switch (message.command) {
      case 'settings-exist':
        // Append api key.
        console.log('"settings-exist" message');
        break;
      case 'error':
        console.log(message);
        break;
    }
  });
}

/**
 * Handle start button click event.
 */
function handleStartButtonClick() {
  // Send messages to Panel.
  vscode.postMessage({
    command: "start-chat-command",
    text: 'start-chat',
  });
}

/**
 * Handle image button click event.
 */
function handleImageButtonClick() {
  // Send messages to Panel.
  vscode.postMessage({
    command: "image-button-clicked-command",
    text: 'image-button',
  });
}
