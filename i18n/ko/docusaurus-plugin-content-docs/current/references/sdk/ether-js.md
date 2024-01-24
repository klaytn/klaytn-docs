# ethers.js

![](/img/references/Klaytn-ether.js.png)

[ethers.js](https://docs.ethers.org/)는 개발자가 클레이튼과 같은 EVM 호환 블록체인 네트워크와 상호작용할 수 있도록 해주는 JavaScript 라이브러리입니다. [이더리움 동등성](https://medium.com/klaytn/using-ethereum-tools-in-klaytn-dc068d48de04)에 대한 기능을 클레이튼이 지원함에 따라, 이더리움 툴을 큰 수정 없이 클레이튼에서 사용할 수 있습니다.

따라서 개발자는 이 호환성을 활용하고 ethers.js 라이브러리를 사용하여 Klaytn 노드와 상호작용할 수 있습니다.

In this guide, you'll learn how to use the ethers.js library to read data from the blockchain, send a transaction and interact with an existing contract on the Klaytn Network.

## 전제 조건

- 코드 편집기: [VS-Code](https://code.visualstudio.com/download)와 같은 소스 코드 편집기.
- [MetaMask](../../build/tutorials/connecting-metamask#install-metamask): 컨트랙트를 배포하고, 트랜잭션에 서명하고, 컨트랙트와 상호 작용하는 데 사용됩니다.
- RPC 엔드포인트: 지원되는 [엔드포인트 공급자](../service-providers/public-en.md) 중 하나에서 얻을 수 있습니다.
- [Faucet](https://baobab.wallet.klaytn.foundation/faucet)에서 KLAY 테스트: 충분한 KLAY로 계정에 자금을 충전합니다.
- [NodeJS 및 NPM](https://nodejs.org/en/)

## 프로젝트 설정

시작하려면 이 가이드에서 생성할 파일을 저장할 프로젝트 디렉터리를 만들어야 합니다.

```bash
mkdir ethers-js
cd ethers-js
```

### ethers.js 설치

터미널에서 다음 명령을 실행하여 ethers.js를 설치합니다:

```bash
npm install --save ethers
```

### ethers.js 초기화하기

In this tutorial, we will create a bunch of script files to read data from the blockchain, send transactions, and also interact with an existing smart contract. 시작하려면 각 스크립트 파일에 대해 ethers.js를 초기화하는 방법을 알아야 합니다.

`ethers`를 스크립트 파일로 가져옵니다.

```js
const ethers = require('ethers');
```

ethers 임포트에 성공했다면, 클레이튼 네트워크의 RPC URL을 가진 새로운 ethers.js `JsonRpcProvider` 객체를 인스턴스화하여 클레이튼에 연결해야 합니다. 기존 코드에 아래 코드를 추가합니다:

```js
const url = "RPC URL";
const provider = new ethers.JsonRpcProvider(url)
```

또한 트랜잭션에 서명하려면 개인 키를 추가해야 합니다. 기존 코드에 아래 코드를 추가합니다:

```js
const privKey = "Paste Privatekey"
const signer = new ethers.Wallet(privKey, provider)
```

## 블록체인에서 데이터 읽기

블록체인에서 데이터를 읽으려면 다음 명령을 실행하여 프로젝트 폴더에 새 `read.js` 파일을 생성합니다:

```bash
touch read.js
```

이 파일을 생성한 후 '초기화하기' 섹션에서 설명한 대로 이더를 초기화합니다. 이 섹션에서는 블록체인에서 데이터(예: blockNumber, KLAY 잔액)를 읽는 방법을 배웁니다.

실제로 작동하는 모습을 보려면 `read.js`에 다음 코드를 붙여넣으세요.

```js
async function getBlockNumber() {
    const blocknumber = await provider.getBlockNumber()
    console.log("blocknumber", blocknumber) 
}

async function getKlayBalance() {
    const klayBalance  = await provider.getBalance("paste wallet address")
    const formatBalance = ethers.formatEther(klayBalance)
    console.log(`You have ${formatBalance} KLAY`)
}

// call the functions below:
getBlockNumber()
getKlayBalance()

```

**출력**

To run the script and read data from the blockchain, run the following command in your terminal:

```bash
node read.js
```

트랜잭션이 성공하면 터미널에서 블록 번호와 사용자의 KLAY 잔액을 확인할 수 있습니다.

## 블록체인에 트랜잭션 보내기

블록체인에 트랜잭션을 전송하려면 다음 명령을 실행하여 프로젝트 폴더에 새 `send.js` 파일을 생성합니다:

```bash
touch send.js
```

이 파일을 생성한 후 '초기화하기' 섹션에서 설명한 대로 ethers를 초기화합니다. 이 섹션에서는 블록체인에 트랜잭션을 전송하는 방법(예: KLAY를 주소로 전송하는 방법)을 배웁니다.

실제로 작동하는 모습을 보려면 `send.js`에 다음 코드를 붙여넣으세요.

```js
const ethers = require('ethers');

const url = "RPC URL";
const provider = new ethers.JsonRpcProvider(url)

const privKey = "Paste private key"
const signer = new ethers.Wallet(privKey, provider)

async function sendTx() {

    const tx = await signer.sendTransaction({
               to: "Paste recipient address",
               value: 90000000000,
               maxFeePerGas: 250000000000,
               maxPriorityFeePerGas: 250000000000,
               gasLimit: 21000,
           })
    
    const receipt = await tx.wait()
    console.log(receipt);
    
}

// call the function
sendTx();
```

**출력**

To run the script and send data to the blockchain, run the following command in your terminal:

```bash
node send.js
```

If the transaction was successful, you'll see the transaction receipt logged in your terminal.

![](/img/references/send-ethers.png)

## Interacting with smart contracts

클레이튼의 기존 스마트 컨트랙트와 상호작용하려면 다음 명령을 실행하여 프로젝트 폴더에 `interact.js` 파일을 새로 생성합니다:

```bash
touch interact.js
```

이 파일을 생성한 후 '초기화하기' 섹션에서 설명한 대로 ethers를 초기화합니다. 이 섹션에서는 배포된 컨트랙트의 ABI와 주소를 사용하여 `contract` 객체를 인스턴스화하여 Klaytn에서 스마트 컨트랙트와 상호작용하기 위해 ethers.js를 사용하겠습니다:

이 가이드의 목적을 위해, [Remix IDE](../../build/tutorials/connecting-remix.md)에 simple_storage 컨트랙트를 컴파일하고 배포했습니다. `store` 함수를 호출하여 컨트랙트에 트랜잭션을 전송하고 `retrieve` 함수를 호출하여 컨트랙트에서 트랜잭션을 읽어올 것입니다.

실제로 작동하는 모습을 보려면 `interact.js`에 다음 코드를 붙여넣으세요.

```js
const ethers = require('ethers');

const url = "RPC URL";
const provider = new ethers.JsonRpcProvider(url)

const privKey = "Paste private key"
const signer = new ethers.Wallet(privKey, provider)

// replace with your contract ABI
const abi = [
    {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

// replace with your contract address
const contractAddress = "0x472a1226796b6a0918DC78d40b87d750881fdbDC";

// // For write-only contracts, provide a Signer object instead of a Provider object:

const contract = new ethers.Contract(contractAddress, abi, signer);


// send transaction to smart contract
// modify contract
async function setValue(value) {
    const tx = await contract.store(value);
    console.log(tx.hash);
}

// read contract data

async function retrieveValue() {
    const value = await contract.retrieve();
    console.log(value);
}

// call the following functions
setValue(value)
retrieveValue()
```

**출력**

To run the script and interact with smart contracts, run the following command in your terminal:

```js
node interact.js
```

If the transaction was successful, you'll see the transaction hash and the value stored in your terminal

ethers.js에 대한 자세한 가이드는 [ethers.js 문서](https://docs.ethers.org/)를 참조하시기 바랍니다. 또한, 이 가이드의 전체 코드 구현은 [GitHub](https://github.com/klaytn/examples/tree/main/sdk-and-libraries-for-interacting-with-klaytn-node/ethers-js)에서 확인할 수 있습니다.
