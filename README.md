
# AiAssistant extension for VSCode

This is a chat bot that uses AiAssistant api. After setting your settings(api key, temperature,response number, size ), you can ask what you want or generate images.
To learn more please visit offical [OpenAI](https://openai.com/).

## Appendix

This chat bot uses VSCode api. Your API KEY will be safely stored in your workspace.
with new version v1.1.0 add new three commands to VSCode editor context menu with their keyboard shortcuts below.

- AiAssistant Add Comments(`ctrl+ alt + c`, `shift + cmd + c`). Support all language.
- AiAssistant Add Documentations(`ctrl + alt + d`, `shift + cmd + d`). Only support javaScript, TypeScript, Java and C#.
- AiAssistant Refactor(`ctrl + alt + r`, `shift + cmd + r`). Only support javaScript, TypeScript, Java and C#.

The result of these commands depent on AiAssistant "text-davinci-003" model. 

AiAssistant Models:

- [gpt-3.5-turbo](https://github.com/kydycode/AiAssistant-3.5-turbo) used for chat.
- [text-davinci-003](https://platform.openai.com/docs/models/gpt-3-5) used for text completions.
- [DALL·E](https://platform.openai.com/docs/models/dall-e) used for image generations.

Chat completions defaults;

- model : "gpt-3.5-turbo"
- temperature : 0.7
- stream: true
- messages: [{ role: "user", content: prompt }]

Text completions defaults;

- model : "text-davinci-003"
- max_tokens: 2048,
- temperature: 0.0,
- top_p: 0.1

Image generation defaults;

- model : "DALL·E"
- n: 1,
- size: '1024x1024',

## Installation

Your VSCode version number has to be greater than or equal to 1.77.0 version.
Install from VSCode Extensions panel or [vscode-ai-assistant](https://marketplace.visualstudio.com/items?itemName=ikasann-self.vscode-ai-assistant) from VSCode Marketplace

```bash
  Go to Settings > Extensions > vscode-ai-assistant
```

## Release Notes

- v0.0.1 first relese with simple command and chat panel.
- v0.0.2 Add icon start button on VSCode Activity bar.
- V0.0.3 bugfix updates
- V1.0.0 Add Explorer View and show history of last 10 queries.
- V1.1.0 Add new three commands to VSCode editor context menu. These: AiAssistant Add Comments, AiAssistant Add Documentaions and AiAssistant Refactor.
- V1.1.1 Add conditions to context menu commands.
- V1.1.2 Add temperature settings to chat panel and add editor logo.
- V1.2.0 Add settings panel and image generation tab.

## Using Extension

- Open chat panel.

![alt text](https://github.com/komsikov/ai-assistant-vscode-extension/blob/main/docs/images/start-and-api-key.gif?raw=true)

- Set api key.

![alt text](https://github.com/komsikov/ai-assistant-vscode-extension/blob/main/docs/images/extension.png?raw=true)

- Say hello!

![alt text](https://github.com/komsikov/ai-assistant-vscode-extension/blob/main/docs/images/extension-1.png?raw=true)

- Wite a simple typescript code that find squareroot of a number.

![alt text](https://github.com/komsikov/ai-assistant-vscode-extension/blob/main/docs/images/extension-2.png?raw=true)

- Click recent query in the history.

![alt text](https://github.com/komsikov/ai-assistant-vscode-extension/blob/main/docs/images/history-clear.gif?raw=true)

- New Setting Panel.

![alt text](https://github.com/komsikov/ai-assistant-vscode-extension/blob/main/docs/images/new-ask-gpt.png?raw=true)

- New Image Generate Panel.

![alt text](https://github.com/komsikov/ai-assistant-vscode-extension/blob/main/docs/images/generate-image.png?raw=true)

- Add comments.
![alt text](https://github.com/komsikov/ai-assistant-vscode-extension/blob/main/docs/images/add-comment-1.png?raw=true)

![alt text](https://github.com/komsikov/ai-assistant-vscode-extension/blob/main/docs/images/add-comment-2.png?raw=true)

- Add documentations.

![alt text](https://github.com/komsikov/ai-assistant-vscode-extension/blob/main/docs/images/add-documentation-1.png?raw=true)

## Roadmap

- Add AiAssistant Edit image model.
- Add AiAssistant Create image variation model.

## 🚀 About Me

I'm a full stack developer. I've been dealing with software since 2016. I worked on a lot of projects so far. My strongest skills are C#, .Net
Core, MsSql, javaScript, TypeScript and Angular2+. Also, I am working on sample projects of Nodejs, MongoDb etc. like this extension.
