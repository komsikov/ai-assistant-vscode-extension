
import * as vscode from 'vscode';
import { ChatPanelView } from 'views/chatPanelView';
import { ImagePanelView } from 'views/imagePanelView';
import { SideBarViewProvider } from 'views/sideBarViewProvider';
import { registerCommand } from 'utilities/contextMenuCommand';
import { getStoreData } from 'model/context.model';

export async function activate(context: vscode.ExtensionContext) {

	// Chat panel register
	const chatPanelCommand = vscode.commands.registerCommand("vscode-ai-assistant.start", () => {
    ChatPanelView.render(context);
	});
	context.subscriptions.push(chatPanelCommand);

	// Image panel register
	const imagePanelCommand = vscode.commands.registerCommand("vscode-ai-assistant.start-image", () => {
    ImagePanelView.render(context);
	});
	context.subscriptions.push(imagePanelCommand);

	// Side Bar View Provider
	const provider = new SideBarViewProvider(context.extensionUri, context);
	context.subscriptions.push(vscode.window.registerWebviewViewProvider(SideBarViewProvider.viewType, provider));

	const storeData = getStoreData(context);
	registerCommand(storeData?.apiKey);

}

export function deactivate() { }
