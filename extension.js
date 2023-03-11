// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
//var openurl = require('openurl').open;


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "hello" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('hello.androidHow', async () => {
		let options = {
		  prompt: "Введи посилання на сайт або локального файлу",
		  placeHolder: "http://localhost:3000 або https://www.google.com",
		};
		const input = await vscode.window.showInputBox(options);
		// The code you place here will be executed every time your command is executed

		//vscode.env.openExternal(vscode.Uri.parse('https://example.com'))
		//openurl("http://google.com");
		// Display a message box to the user
		const panel = vscode.window.createWebviewPanel(
			'catCoding',
			'Cat Coding',
			vscode.ViewColumn.One,
			{enableScripts: true}
		  );
		//   // And set its HTML content
		panel.webview.html = getWebviewContent(input);
		// panel.webview.asWebviewUri(vscode.Uri.parse("http://google.com"))
		/**
		 * 
		 * @param {string} string
		 */
		function isValidHttpUrl(string) {
			let url;
			try {
			  url = new URL(string);
			} catch (_) {
			  return false;
			}
			return url.protocol === "http:" || url.protocol === "https:";
		}
		  /**
		 * @param {string} url
		 */
		  function getWebviewContent(url) {
			if (isValidHttpUrl(url)) {
				const protocol = new URL(url);
				if (protocol.protocol == "https:") {
					return `<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Cat Coding</title>
				</head>
				<body>
				<style>
				iframe {
					width: 340px;
					border: none;
					height: 668px;
				}
				</style>
					<iframe sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-downloads allow-downloads-without-user-activation allow-presentation allow-orientation-lock allow-scripts" allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; display-capture; encrypted-media; execution-while-not-rendered; execution-while-out-of-viewport; fullscreen; gamepad; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; navigation-override; oversized-images; payment; picture-in-picture; publickey-credentials; speaker-selection; sync-xhr; unoptimized-images; unsized-media; usb; screen-wake-lock; web-share; xr-spatial-tracking" src="https://iphone.teleweb.repl.co/www/?url=${url}"></iframe>
					<button>${url}</button>
					<script>document.querySelector("button").onclick = () => {
						document.querySelector("iframe").src = document.querySelector("iframe").src;
					}</script>
				</body>
				</html>`;
				} else if (protocol.protocol == "http:") {
					// http://192.168.1.105:8080/phone.svg
					return `<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Cat Coding</title>
				</head>
				<body>
				<style>
				iframe {
					width: 340px;
					border: none;
					height: 668px;
				}
				</style>
					<iframe sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-downloads allow-downloads-without-user-activation allow-presentation allow-orientation-lock allow-scripts" allow="accelerometer; ambient-light-sensor; autoplay; battery; camera; display-capture; encrypted-media; execution-while-not-rendered; execution-while-out-of-viewport; fullscreen; gamepad; geolocation; gyroscope; layout-animations; legacy-image-formats; magnetometer; microphone; midi; navigation-override; oversized-images; payment; picture-in-picture; publickey-credentials; speaker-selection; sync-xhr; unoptimized-images; unsized-media; usb; screen-wake-lock; web-share; xr-spatial-tracking" src="${url}"></iframe>
					<button>${protocol.protocol}</button>
					<script>document.querySelector("button").onclick = () => {
						document.querySelector("iframe").src = document.querySelector("iframe").src;
					}</script>
				</body>
				</html>`;
				} else {
					vscode.window.showErrorMessage("Введи або посилання на сайт(https://sait.com) або запусти свій проект на веб-сервері і встав посилання з нього(http://0.0.0.0:1000)");
				}
			} else {
				return `<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Cat Coding</title>
				</head>
				<body>
				<style>
				iframe {
					width: 340px;
					border: none;
					height: 668px;
				}
				</style>
					<iframe src="404/"></iframe>
				</body>
				</html>`;
			}
		  }
		vscode.window.showInformationMessage('Hello World VSCODE');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
