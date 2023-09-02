
import * as vscode from 'vscode';
import { AiAssistantPanel } from './panels/main-view-panel';
import { SideBarViewProvider } from './panels/side-bar-view-panel';
import { getStoreData } from './utilities/utility.service';
import { registerCommand } from './utilities/context-menu-command';
import { ImagePanel } from './panels/image-view-panel';

export async function activate(context: vscode.ExtensionContext) {

	// Chat panel register
	const chatPanelCommand = vscode.commands.registerCommand("vscode-ai-assistant.start", () => {
		AiAssistantPanel.render(context);
	});
	context.subscriptions.push(chatPanelCommand);

	// Image panel register
	const imagePanelCommand = vscode.commands.registerCommand("vscode-ai-assistant.start-image", () => {
		ImagePanel.render(context);
	});
	context.subscriptions.push(imagePanelCommand);

	// Side Bar View Provider
	const provider = new SideBarViewProvider(context.extensionUri, context);

	context.subscriptions.push(vscode.window.registerWebviewViewProvider(SideBarViewProvider.viewType, provider));

	const storeData = getStoreData(context);
	registerCommand(storeData.apiKey);

}

export function deactivate() { }
