## 1. Environment Setup

### 1) Install Node.js (npm)

> We recommend you install the latest Node LTS version for the `caver-js` compatibility.

- Download Node.js (npm) from the official site: https://nodejs.org/
- Install the package by clicking the download file.
- Type `$ node --version` in your terminal to verify `node` has been successfully installed.  
    ```
    v10.16.0
    ```

&#9888; At the time of writing, the latest LTS version that is compatible with `caver-js` is 10.16.0. If you have a higher Node version, `caver-js` cannot be installed. Reinstall the Node or use [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) to set up a stable environment.


### 2) Install Truffle
Truffle is a great tool for compiling and deploying contract files.

- Type `$ sudo npm install -g truffle` in your terminal to install the truffle.
- Type `$ truffle version` in your terminal to verify `truffle` has been installed successfully.  
    ```
    Truffle v5.0.27
    ```

&#9888; If the version is lower than 5, install the truffle version 5.  
`$ sudo npm install -g truffle@5`
