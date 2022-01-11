# 개발 도구 설치하기 <a id="install-development-tools"></a>

## caver-js 설치 <a id="installing-caver-js"></a>

다음과 같은 klaytn 프로젝트 디렉토리를 만드는 것이 좋습니다:

```bash
$ mkdir $HOME/klaytn
```

> 계속 진행하기 위해 `npm`과 `node.js` 설치가 요구됩니다. 시스템에 설치하기 위해 [get-npm](https://www.npmjs.com/get-npm)과 [node.js](https://nodejs.org/en/)를 참조해 주시길 바랍니다.

​[caver-js](../../dapp/sdk/caver-js/README.md) is a JSON RPC framework for the Klaytn network \(equivalent to web3.js in Ethereum\). caver-js를 설치하기 전에, `npm init`을 통해 `package.json`을 생성해야 합니다. 이후 caver-js를 설치하기 위해 `npm install caver-js`를 입력하세요.

```bash
$ npm init # klaytn 프로젝트 디렉토리에서 npm 초기화
$ npm install caver-js
```

**참고**: caver-js를 이미 설치한 경우, 최신 버전으로 업데이트하시길 바랍니다.

```bash
$ npm cache clean --force # npm 캐시 초기화
$ npm install caver-js@latest # caver-js를 최신 버전으로 업데이트
```

caver-js를 업데이트하는 동안 다음 오류가 발생하면, `websocket` 디렉토리의 `.git` 폴더를 제거하세요.

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

**참고**: web3.js의 `web3.eth...`로 시작하는 모든 함수 호출은 `caver.klay...`로 대체되어야 합니다.

`web3.eth.sendTransaction({ ... })` \(X\)

`caver.klay.sendTransaction({ ... })` \(O\)

## 트러플 설치 <a id="installing-truffle"></a>

이 튜토리얼에서 트러플은 솔리디티로 작성된 스마트 컨트랙트를 컴파일하고 배포하는 데 사용됩니다. 현재 Klaytn은 트러플 버전 4.1.15를 지원합니다. 트러플에 대한 자세한 내용은 다음 사이트를 참조하세요:

* 트러플 스토리지 - [https://github.com/trufflesuite/truffle](https://github.com/trufflesuite/truffle)​
* 트러플 문서 - [https://trufflesuite.com/docs](https://trufflesuite.com/docs)

트러플은 다음 방법들로 설치 가능합니다:

1\) 다음 명령을 실행하여 npm을 전역(global)으로 사용할 수 있습니다:

```bash
$ sudo npm install -g truffle@4.1.15
$ cd /usr/local/lib/node_modules/truffle
$ sudo npm install solc@0.5.6
$ cd -
```

또는

2\) 지역적(local)으로 사용할 수 있습니다. 즉, 로컬 디렉토리에서 다음을 실행합니다:

```bash
# $HOME/klaytn/에 있다고 가정합니다.
$ npm install truffle@4.1.15
$ cd node_modules/truffle
$ npm install solc@0.5.6
$ cd -
$ ln -s node_modules/truffle/build/cli.bundled.js truffle
$ export PATH=`pwd`:$PATH
```

## vvisp 설치 <a id="installing-vvisp"></a>

vvisp은 스마트 컨트랙트 개발을 위해 [HEACHI LABS](https://henesis.io/)에서 제공하는 사용하기 쉬운 cli 도구/프레임워크입니다. 단일 명령만으로 환경을 쉽게 설정하고, Klaytn 스마트 컨트랙트를 배포 및 실행할 수 있습니다. 트러플 프레임워크를 지원하므로, 트러플에 익숙한 개발자는 어려움 없이 vvisp을 사용할 수 있습니다.

Here, we introduce how to install vvisp and use it to set up the Klaytn dApp development environment.

* vvisp 스토리지 - [https://github.com/HAECHI-LABS/vvisp](https://github.com/HAECHI-LABS/vvisp)
* vvisp 문서 - [https://github.com/HAECHI-LABS/vvisp/blob/dev/README\_KLAYTN.md](https://github.com/HAECHI-LABS/vvisp/blob/dev/README_KLAYTN.md)

npm 또는 yarn이 존재하는 경우 다음 명령을 실행하여 vvisp을 쉽게 설치할 수 있습니다:

```bash
$ npm install -g @haechi-labs/vvisp
# 또는 yarn을 사용하는 경우
$ yarn global add @haechi-labs/vvisp
```

설치 시 vvisp 명령을 사용하여 제대로 설치되었는지 확인할 수 있습니다. **참고**: **v2.1.0** 이상의 버전을 사용해야 합니다.

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

# 설치된 버전을 확인할 수 있습니다.
$ vvisp --version
v2.1.0
```



