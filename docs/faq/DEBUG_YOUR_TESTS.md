# How to debug tests  
This guide will help you get started debugging your tests.
  
## Enable Inspector  
When started with the `--debug` switch, Yoshi will allow to attach NodeJS debugger to the relevant child process with the default host and port.
You can configure the default port by: `--debug=XXXX`    
  
## [Inspector Clients](https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients)  
  
Several commercial and open source tools can connect to Node's Inspector and there for can debug Yoshi tasks. Basic info on these follows:  
  
#### [Chrome DevTools](https://github.com/ChromeDevTools/devtools-frontend)  [55+](https://nodejs.org/en/docs/guides/debugging-getting-started/#chrome-devtools-55)  
  
-   **Option 1**: Open  `chrome://inspect` in a Chromium-based browser. Click the Configure button and ensure your target host and port are listed.  
-   **Option 2 - ✅ Recommended**: Install the Chrome Extension NIM (Node Inspector Manager):[https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj](https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj)  
  
  
#### [Visual Studio Code](https://github.com/microsoft/vscode)  [1.10+](https://nodejs.org/en/docs/guides/debugging-getting-started/#visual-studio-code-1-10)  
  
- In the Debug panel, click the settings icon to open  `.vscode/launch.json`. Select "Node.js" for initial setup.  
- 📌 You must tell vscode the target debugging port, otherwise vscode will try to debug Yoshi's main process in random generated port, so add `"port" : 9229` (or the port you choose)
 - Example launch.json -  
   
```json
 {  
 "name": "Run Tests", 
 "type": "node",
 "request": "launch",
 "args" : ["test", "--debug"], 
 "port": 9229, 
 "program": "${workspaceFolder}/node_modules/.bin/yoshi"
 }  
```  
#### [JetBrains WebStorm](https://www.jetbrains.com/webstorm/)  [2017.1+ and other JetBrains IDEs](https://nodejs.org/en/docs/guides/debugging-getting-started/#jetbrains-webstorm-2017-1-and-other-jetbrains-ides)  
  
- Create a new Node.js debug configuration with the wantted Yoshi task name   
 - 📌 no `--debug` flag needed when using WebStorm  
 - WebStorm will inject `--inspect-brk=XXX` and automatically attach debugger to Yoshi's main process and any other child process.   
 - Example configuration -   
       
![image description](https://image.ibb.co/cYNPOn/Screen_Shot_2018_05_02_at_21_56_05.png)  
  
  
#### [chrome-remote-interface](https://github.com/cyrus-and/chrome-remote-interface)[](https://nodejs.org/en/docs/guides/debugging-getting-started/#chrome-remote-interface)  
  
- Library to ease connections to Inspector Protocol endpoints.
