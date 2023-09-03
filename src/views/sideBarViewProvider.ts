import * as vscode from 'vscode';
import {
  getNonce,
  getAsWebviewUri,
  getStoreData,
  setStoreData,
} from 'model/context.model';

export class SideBarViewProvider implements vscode.WebviewViewProvider {

  public static readonly viewType = 'ai-assistant-view-id';
  private _view?: vscode.WebviewView;

  constructor(
    private readonly _extensionUri: vscode.Uri,
    private readonly _context: vscode.ExtensionContext,
  ) { }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {

    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this._extensionUri, 'out')]
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview, this._extensionUri);

    // Register message events that comes from the js.
    this.addReceiveMessageEvents(webviewView.webview);


    // Read the api key from globalState and send it to webview
    const storeData = getStoreData(this._context);
    this._view.webview.postMessage({ command: 'settings-exist', data: storeData });
  }

  /**
   * Add listener for event comes from js.
   * @param webview :vscode.Webview
   */
  private addReceiveMessageEvents(webview: vscode.Webview) {
    webview.onDidReceiveMessage((message: any) => {
      const command = message.command;
      switch (command) {
        case "start-chat-command":
          this.startAiAssistantWebViewPanel();
          break;

        case "image-button-clicked-command":
          this.startImageWebViewPanel();
          break;
        case "save-settings":
          setStoreData(this._context, message.data);
          const responseMessage = `Settings saved successfully.`;
          vscode.window.showInformationMessage(responseMessage);
          break;
      }
    },
      undefined
    );
  }

  /**
   * start main panel.
   */
  private startAiAssistantWebViewPanel(): void {
    vscode.commands.executeCommand('vscode-ai-assistant.start');
  }

  /**
   * start image main  panel.
   */
  private startImageWebViewPanel(): void {
    vscode.commands.executeCommand('vscode-ai-assistant.start-image');
  }

  /**
   * Gets html content of webview.
   * @param webview: vscode.Webview
   * @param extensionUri: vscode.Uri
   * @returns string
   */
  private _getHtmlForWebview(webview: vscode.Webview, extensionUri: vscode.Uri) {

    // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
    const scriptUri = getAsWebviewUri(webview, extensionUri, ["out/controller", "sidebar.controller.js"]);

    // Do the same for the stylesheet.
    const styleVSCodeUri = getAsWebviewUri(webview, extensionUri, ['out/assets', 'vscode.css']);

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
					Use a content security policy to only allow loading styles from our extension directory,
					and only allow scripts that have a specific nonce.
					(See the 'webview-sample' extension sample for img-src content security policy examples)
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} https:; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleVSCodeUri}" rel="stylesheet">
				<title>Panel</title>
			</head>
			<body>

			<div class="flex-container">
				<button id="start-ai-assistant-button">New Chat</button>
				<button id="image-generate-button" class="success">Images</button>
			</div>

			<script nonce="${nonce}" src="${scriptUri}"></script>
			<div class="model">
				<p> Editor model:<a href="https://platform.openai.com/docs/models/gpt-3-5"> ${'text-davinci-003'}</a></p>
				<p> Chat model:<a href="https://platform.openai.com/docs/models/gpt-3-5"> ${'gpt-3.5-turbo'}</a></p>
				<p> Image model:<a href="https://platform.openai.com/docs/models/dall-e"> ${'DALL·E'}</a></p>
			<div>
			</body>
			</html>`;
  }
}
