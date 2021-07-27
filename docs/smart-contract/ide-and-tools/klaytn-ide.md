# Klaytn IDE

![](../../.gitbook/assets/ide-overview-all.png)

Klaytn IDE is a browser-based compiler and IDE that helps developers build Klaytn smart contracts with Solidity language. Klaytn IDE also supports test and deployment of smart contracts. Klaytn IDE is forked from Remix 0.7.7.

You can access to the Klaytn IDE at [https://ide.klaytn.com](https://ide.klaytn.com). This document is an overview of the Klaytn IDE, it explains the major features and the usage guideline. You can find more detailed information in [Remix docs](https://remix-ide.readthedocs.io/en/latest/).

## What's different from Remix? <a id="what-s-different-from-remix"></a>

1. Sign-in with Klaytn accounts
2. Supports 2 Solidity versions \(v0.4.24 and v0.5.6\)
3. Does not support Plugin, Gist add-on, and Swarm.

## Overview <a id="overview"></a>

![](../../.gitbook/assets/ide-docs-sections.png)

The layout of the Klaytn IDE is as shown above. There are 4 areas - file explorer, code editor, console, and modules.

## 1. File Explorer <a id="1-file-explorer"></a>

![](../../.gitbook/assets/ide-file-explorer.png)

The file explorer on the left side of the workspace shows the list of smart contract files stored in your browser. Please be aware that clearing the browser storage will permanently delete all smart contract files you wrote. You can add, rename, and delete files from the file explorer.

* Create a new file  
  * You can create `Untitled1.sol` file by clicking ![](../../.gitbook/assets/ide-create-file.png) icon on the title bar.
* Add a local file  
  * You can select files from the local file system and import them to the browser storage. Clicking ![](../../.gitbook/assets/ide-open-file.png) icon will display a select-file dialog.
* Rename and delete a file  
  * Right-click on a file will show up a context menu from which you can rename or delete the file.

## 2. Code Editor <a id="2-code-editor"></a>

![](../../.gitbook/assets/ide-editor-view.png)

At the center of the workspace, you can edit files.

### File tabs <a id="file-tabs"></a>

You can open multiple files, and the editor displays the opened files as tabs. When you create or add a file to the file explorer, the file appears on the file tabs. Clicking ![](../../.gitbook/assets/ide-editor-close.png) icon on the tab will close the file.

Note: Closing a file \(by clicking ![](../../.gitbook/assets/ide-editor-close.png) icon\) does not remove the file from the file explorer.

### Auto-completion for Solidity reserved keywords <a id="auto-completion-for-solidity-reserved-keywords"></a>

There are frequently-used statements in Solidity, for example, `bytes32`, `public`, and `modifier`. You don't need to type the whole characters since Klaytn IDE suggests the word you are intending to type. The auto-completion works for all reserved keywords in Solidity and the functions, variables, and classes you define.

![](../../.gitbook/assets/ide-auto-completion.png)

### Error detection <a id="error-detection"></a>

A red marker is displayed next to the line number where a compilation error occurred.

![](../../.gitbook/assets/ide-error-detection.png)

## 3. Modules <a id="3-modules"></a>

There are six tabs in Modules. Compile, Run, Analysis, Testing, Debugger, and Settings.

![](../../.gitbook/assets/ide-tabs.png)

* Compile: To select the compiler version and to enable/disable several compilation options. A list of compiled projects is displayed in this tab as well. 
* Run: In this tab, you can deploy a contract to the network and invoke the contract functions. This tab has options to manage the parameters for transactions, such as network, account, gas limit, and input params.
* Analysis: You can run static and runtime code analysis with the selected checklist. 
* Testing: Create and run unit tests.
* Debugger: Allows you to debug the transaction. 
* Settings: General settings and Help & Support links.

### Compile <a id="compile"></a>

Compiling is triggered when you click the `Start to compile` button. If you want the file to be compiled each time the file is saved or when another file is selected - check the `Auto compile` checkbox.

For now, we support two compiler versions, Solidity v0.4.24 and v0.5.6. So you always need to add `pragma solidity 0.4.24;` or `pragma solidity 0.5.6` on top of the document. You can manually click `"Compile"` button \(Cmd+s for MacOS, Ctrl+s for Windows\) every time you need, or you can activate the auto-compile function.

![](../../.gitbook/assets/ide-compile-tab.png)

Note:

* Your codes are automatically saved every 15 seconds. Auto-save is also triggered when you compile a file, close the file tab, or leave the Klaytn IDE.  
* If activated, "Auto-compile" starts to compile when you stop typing.

### Run <a id="run"></a>

#### Environment \(Network Selector\) <a id="environment-network-selector"></a>

![](../../.gitbook/assets/ide-environment.png)

You can choose which network to use from the `"Environment"` dropdown. By default, Klaytn IDE provides following network options:

1. **Baobab network** \(Klaytn testnet\)
2. **Cypress network** \(Klaytn mainnet\)

If you want to connect to another custom node, click the dropdown list, select `"Caver provider"`, and fill the URL of the network you want to connect to. If the protocol of network you want to connect to is `HTTP`, not `HTTPS`, please use [http\://ide.klaytn.com](http://ide.klaytn.com).

> To deploy a contract, you need KLAY to pay the transaction fee. For the `Baobab network` \(Klaytn testnet\), you can get some **testnet KLAY** from the faucet \[[https://baobab.wallet.klaytn.com/faucet](https://baobab.wallet.klaytn.com/faucet)\]. After receiving **testnet KLAY** from the faucet, import the account to the Klaytn IDE in the `"Account"` selector.

#### Account \(Account Selector\) <a id="account-account-selector"></a>

![](../../.gitbook/assets/ide-from-account.png)

With `Account Selector`, you can change your current account to another one.  
To import an account, click ![](../../.gitbook/assets/ide-add-account-button.png) button and choose the import method either by private key or keystore.

![](../../.gitbook/assets/ide-account-add-popup.png)

After Import, your account balance will appear in the`Account` selector in a few seconds.

#### Value <a id="value"></a>

![](../../.gitbook/assets/ide-tx-value-controller.png)

On the `Value (Tx Value Controller)`, you can fill the amount of value for the next created transaction.

#### Gas Limit Controller <a id="gas-limit-controller"></a>

![](../../.gitbook/assets/ide-gas-limit-controller.png)

In the `Gas Limit` controller, you can fill the maximum amount of gas which will be used for calling a smart contract function.

#### Deploy <a id="deploy"></a>

![](../../.gitbook/assets/ide-deploy.png)

Once you compile the code, you will find the contract listed in the dropdown selector. Among the compiled list, you can select a contract and deploy it by clicking the `Deploy` button.

![](../../.gitbook/assets/ide-deploy-result.png)

If the contract is deployed successfully, the contract address is shown and you can see the list of functions that the contract exposes in the below. There are only two types of functions in the smart contract, functions that write data to the blockchain \(transaction\) and functions that read data from the blockchain.

### Analysis <a id="analysis"></a>

![](../../.gitbook/assets/ide-tab-analysis.png)

This section shows the output from the last compilation. By default, a new analysis is run at each compilation.

The analysis tab gives detailed information about the contract code. It can help you avoid code mistakes and to enforce best practices.

If you need more information, please visit [Remix docs &gt; Analysis ](https://remix-ide.readthedocs.io/en/latest/static_analysis.html?highlight=analysis)

### Testing <a id="testing"></a>

![](../../.gitbook/assets/ide-tab-testing.png)

In this section, you can create a new solidity test file in the current folder and execute the tests. The execution result is displayed below. If you need more information, please visit [Remix docs &gt; Unit Testing](https://remix-ide.readthedocs.io/en/latest/unittesting.html)

### Debugger <a id="debugger"></a>

![](../../.gitbook/assets/ide-tab-debugger.png)

This module allows you to debug the transaction. It can be used to deploy transactions created from IDE and already mined transactions.

> Debugging works only if the current environment provides the necessary features. For debugging, the **personal** API must be enabled in the EN node. Please see the `RPC_API` option in the [EN configuration file](../../node/endpoint-node/operation-guide/configuration.md).

If you need more information, please visit [Remix docs &gt; Debugger](https://remix-ide.readthedocs.io/en/latest/debugger.html)

### Settings <a id="settings"></a>

![](../../.gitbook/assets/ide-tab-setting.png)

This tab contains general settings and support channels.

Important settings:

* Text Wrap: controls if the text in the editor should be wrapped.
* Enable Personal Mode : use in private network

## 4. Terminal <a id="4-terminal"></a>

![](../../.gitbook/assets/ide-console.png)

At the bottom of the code editor, compiled outputs, compiler errors, deployment results, and transaction information are shown in the terminal.

If you click on the transaction output, detailed information will be shown. If debugging is supported, debugging the transaction will work on the Debug tab.

## Develop with OpenZeppelin <a id="develop-with-openzeppelin"></a>

OpenZeppelin is a library for secure smart contract development. It provides implementations of standards like ERC20 and ERC721 which you can deploy as-is or extend to suit your needs, as well as Solidity components to build custom contracts and more complex decentralized systems.

The OpenZeppelin library is available after connecting to localhost via remixd. This requires the installation of remixd.

### Install Remixd <a id="install-remixd"></a>

Remixd is a tool that is intended to be used with Remix IDE \(aka. Browser-Solidity\). It allows a websocket connection between Remix IDE \(web application\) and the local computer. Get more details at: [remixd document](https://remix-ide.readthedocs.io/en/latest/remixd.html?highlight=remixd).

`remixd` can be globally installed using the following command: After installation, start `remixd`. `-s` option gives the IDE access to the given folder. In the given folder, you will install OpenZeppelin and place your contract source code.

\`\`\`bash $ remixd -s --remix-ide [http://ide.klaytn.com](http://ide.klaytn.com)

For example, `remixd -s ~/temp/openzeppelin --remix-ide http://ide.klaytn.com`

Then, you will see the following messages in your terminal.

![](../../.gitbook/assets/ide-launch-remixd.png)

### Install OpenZeppelin <a id="install-openzepplin"></a>

Go to the shared folder, and install OpenZeppelin.

\`\`\`bash $ cd $ npm install openzeppelin-solidity

### Connect Remixd <a id="connect-remixd"></a>

Click remix connect button as shown below.

![](../../.gitbook/assets/ide-connect-remixd.png)

Click connect.

![](../../.gitbook/assets/ide-connet-remix-popup.png)

localhost directory will appear in the file browser.

![](../../.gitbook/assets/ide-connection-localhost.png)

In your contract source file, import the required solidity contract from the OpenZeppelin.

![](../../.gitbook/assets/ide-import-openzepplin.png)

## Need more information? <a id="need-more-information"></a>

The Klaytn IDE is based on the Remix v0.7.7. Many features are compatible, so please refer to the [official Remix documentation](https://remix-ide.readthedocs.io/en/latest/).

## Send us feedback! <a id="send-us-feedback"></a>

If you have any feedback or suggestions about Klaytn IDE, please send an email to [developer@klaytn.com](mailto:developer@klaytn.com).

