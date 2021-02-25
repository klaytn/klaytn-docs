# Install Development Tools <a id="install-development-tools"></a>

## Installing caver-js <a id="installing-caver-js"></a>

We recommend to create a klaytn project directory such that:

```bash
$ mkdir $HOME/klaytn
```

> You need `npm` and `node.js` installed to proceed. Please refer to [get-npm](https://www.npmjs.com/get-npm) and [node.js](https://nodejs.org/en/) for installation on your system.

​[caver-js](../../bapp/sdk/caver-js/README.md) is a JSON RPC framework for the Klaytn network \(equivalent to web3.js in Ethereum\). Before installing caver-js, you must generate `package.json` file via `npm init` command, and then type `npm install caver-js` to install caver-js.

```bash
$ npm init # initialize npm at the klaytn project directory
$ npm install caver-js
```

**NOTE**: If you already installed caver-js, please update it to the latest version.

```bash
$ npm cache clean --force # initialize npm cache
$ npm install caver-js@latest # update caver-js to the latest version
```

If you receive the following errors while updating the caver-js, remove `.git` folder in the `websocket` directory.

```bash
npm ERR! path /Users/username/klaytn/node_modules/websocket
npm ERR! code EISGIT
npm ERR! git /Users/username/klaytn/node_modules/websocket: Appears to be a git repo or submodule.
npm ERR! git     /Users/username/klaytn/node_modules/websocket
npm ERR! git Refusing to remove it. Update manually,
npm ERR! git or move it out of the way first.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/username/.npm/_logs/2019-06-25T01_49_37_032Z-debug.log​

$ rm /Users/username/klaytn/node_modules/websocket/.git
```

**Note:** For all the function calls that begin with `web3.eth...` in web3.js, should be replaced with `caver.klay...`.

`web3.eth.sendTransaction({ ... })` \(X\) 

`caver.klay.sendTransaction({ ... })` \(O\)

## Installing Truffle <a id="installing-truffle"></a>

In this tutorial, Truffle is used to compile and deploy smart contracts written in Solidity. Currently, Klaytn supports Truffle version 4.1.15. For further information about Truffle, refer to the following sites:

* Truffle repository - [https://github.com/trufflesuite/truffle](https://github.com/trufflesuite/truffle)​
* Truffle documents - [https://trufflesuite.com/docs](https://trufflesuite.com/docs)​

We can install Truffle either

1\) globally using npm by executing the following commands:

```bash
$ sudo npm install -g truffle@4.1.15
$ cd /usr/local/lib/node_modules/truffle
$ sudo npm install solc@0.5.6
$ cd -
```

or

2\) locally, i.e., in your local directory, by executing the followings:

```bash
# Assuming you are in $HOME/klaytn/.
$ npm install truffle@4.1.15
$ cd node_modules/truffle
$ npm install solc@0.5.6
$ cd -
$ ln -s node_modules/truffle/build/cli.bundled.js truffle
$ export PATH=`pwd`:$PATH
```

## Installing vvisp <a id="installing-vvisp"></a>

vvisp is an easy-to-use cli tool/framework for developing smart contracts, provided by [HEACHI LABS](https://henesis.io/). You can easily set environment, deploy and execute Klaytn smart contracts with a single-command. It supports the Truffle framework, so developers familiar with Truffle can use vvisp without difficulty.

Here, we introduce how to install vvisp and use it to set up the Klaytn Bapp development environment.

* vvisp repository - [https://github.com/HAECHI-LABS/vvisp](https://github.com/HAECHI-LABS/vvisp)​
* vvisp document - [https://github.com/HAECHI-LABS/vvisp/blob/dev/README\_KLAYTN.md](https://github.com/HAECHI-LABS/vvisp/blob/dev/README_KLAYTN.md)​

vvisp can be easily installed if you have npm or yarn by executing the following command:

```bash
$ npm install -g @haechi-labs/vvisp
# or if you use yarn
$ yarn global add @haechi-labs/vvisp
```

Upon installation, you can utilize the vvisp command to ensure it has been installed properly. **NOTE**: You should use version over **v2.1.0**.

```bash
$ vvisp
Usage: vvisp <command> [options]

where <command> is one of: compile, console, deploy-contract, deploy-service, flatten, gen-script, init

Options:
  -v, --version  output the version number
  -h, --help     output usage information

Commands:

   compile [files...]                       compile the smart contracts

   console [script-api-path]                run interactive shell to execute contract scripts

   deploy-contract <file> [arguments...]    deploy the smart contracts

   deploy-service                           deploy or upgrade smart contract service using the deployment configure file

   flatten <files...>                       flatten the smart contracts

   gen-script [files...]                    generate javascript libraries communicating the smart contracts

   init [name]                              initialize directory to use vvisp

# you can check installed version.
$ vvisp --version
v2.1.0
```



