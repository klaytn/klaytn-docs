# 샘플 트랜잭션 보내기

간단한 워밍업으로 트랜잭션을 전송해 보겠습니다. 이 짧은 예제에서는 키스토어를 생성하고, 클레이튼 노드에 연결하고, 트랜잭션을 생성할 것이며, 이 모든 과정을 caver-js를 사용해 해보겠습니다!

caver-js를 처음 사용하더라도 걱정하지 마세요. 아래의 간단한 단계를 따르기만 하면 됩니다.

## 전제 조건

먼저 다음 패키지를 설치합니다.
* [Node.js](https://nodejs.org/en/download/) 버전 ([14.16.0](https://nodejs.org/dist/latest-v14.x/))
* [npm](https://www.npmjs.com/get-npm)
* [nvm](https://github.com/nvm-sh/nvm)
* [Solidity 컴파일러](https://solidity.readthedocs.io/en/develop/installing-solidity.html)

*참고:* nvm 설치 후 `nvm: command not found` 오류가 발생하면 이 [문제 해결 가이드](https://github.com/nvm-sh/nvm/issues/2060)를 참조하세요.
 
## 1. 계정 생성 및 키스토어 다운로드 <a id="1.-create-an-account-and-download-keystore"></a>
가장 간단하게 계정을 생성하는 방법은 [Klaytn 온라인 툴킷](https://toolkit.klaytn.foundation/misc/generateKeystore)을 사용하는 것입니다.

![클레이튼 온라인 툴킷](/img/references/keystore.png)

키스토어 파일을 다운로드하고 이름을 `keystore.json`과 같이 좀 더 간단한 이름으로 변경해 보겠습니다.

**트랜잭션을 전송하려면 KLAY가 필요합니다.** Baobab 테스트넷용 테스트 KLAY는 [Faucet](https://baobab.wallet.klaytn.foundation/faucet)에서 받을 수 있습니다. 자세한 안내는 [Klaytn 지갑](../../../build/tools/wallets/klaytn-wallet.md#how-to-receive-baobab-testnet-klay)을 참고하시기 바랍니다.

## 2. 프로젝트 초기화 <a id="2.-initialize-project"></a>

먼저 프로젝트를 위한 폴더를 만들어 보겠습니다. 간단히 `test`라고 부르겠습니다. 명령줄로 이동하여 입력합니다:

```
mkdir test
```

이제 폴더로 이동해 보겠습니다.

```
cd test
```

caver-js를 다운로드할 폴더에 있습니다. 하지만 그 전에 12 또는 14를 사용해야 하기 때문에 `node.js` 버전을 확인해야 합니다.

다음과 같이 버전을 확인할 수 있습니다:

```
node --version
```

버전이 12 또는 14가 아닌 경우 **변경**하세요. 여기서는 버전([14.16.0](https://nodejs.org/dist/latest-v14.x/)을 사용하겠습니다.) 따라서 `nvm use 14.16.0`을 입력하여 노드 버전을 변경해 보겠습니다.

이제 프로젝트를 초기화해 보겠습니다:

```
npm init
```

간단한 테스트이므로 질문에 어떻게 대답하든 상관없습니다. 계속 `엔터`를 누르세요.

```

package name: (test) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: 
license: (ISC) 
About to write to /Users/terri.k/test/package.json:

{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes)
```

또는 아래 명령어를 입력하면 `엔터`를 누르지 않아도 됩니다:

```
npm init -y
```

## 3. caver-js 다운로드 <a id="3.-download-caver-js"></a>

이제 caver-js를 설치할 준비가 되었습니다.


```
npm install caver-js
```

또한 아래 모듈이 필요하므로 추가합니다:

```
npm i read
```

## 4. 테스트 파일 만들기 <a id="4.-create-test-file"></a>

다음과 같이 'testcaver.js'라는 이름의 테스트 파일을 생성해 보겠습니다:

``` 
touch testcaver.js
```

이 파일에 코드를 작성하여 KLAY를 전송하기 위한 트랜잭션을 전송할 것입니다.


## 5. 클레이튼 노드에 연결하기 <a id="5.-connect-to-klaytn-node"></a>

블록체인 네트워크에 트랜잭션을 전송하기 때문에 클레이튼 노드에 연결해야 합니다. 클레이튼의 테스트넷 Baobab을 사용할 것입니다.

아래와 같이 `caver-js`와 `read` 모듈을 가져와서 Baobab 네트워크의 클레이튼 노드에 연결합니다:

```javascript
const Caver = require('caver-js')
const read = require('read')
const caver = new Caver('https://public-en-baobab.klaytn.net/')
```

## 6. 키스토어 제공, Keyring 생성 및 caver 지갑에 추가 <a id="6.-add-keystore-create-keyring-and-add-to-caver-wallet"></a>

블록체인에서 거래를 하려면 계정이 필요합니다. 해당 계정 정보는 키 저장소에 포함되어 있습니다. `loadPassword()` 함수를 사용하여 터미널에서 비밀번호 프롬프트를 구현할 수 있습니다. 함수는 다음과 같습니다:

```
async function loadPassword() {
    return new Promise((resolve, reject)=> {
        read({ prompt: 'Password: ', silent: true }, function(er, password) {
            if(er) {
                reject(er)
                return
            }
            resolve(password)
        })

    })

}
```

프롬프트에서 입력한 비밀번호는 같은 디렉터리에 있는 키스토어 파일과 함께 해독되어 `Keyring`으로 저장됩니다.

그 후 `Keyring`이 지갑에 저장됩니다. 아래에 줄을 추가합니다:

```
async function sendKlay() {
// Read keystore json file
  const fs = require('fs')
	const keystore = fs.readFileSync('./keystore.json', 'utf8')
	const password = await loadPassword()

	// Decrypt keystore and create
	const keyring = caver.wallet.keyring.decrypt(keystore, password)
	console.log(keyring)

    // Add to caver.wallet
	caver.wallet.add(keyring)

	}
```

## 7. 트랜잭션 보내기 <a id="7.-send-transaction"></a>

이제 일부 KLAY를 전송하는 트랜잭션을 생성하겠습니다. 이러한 유형의 트랜잭션을 "밸류 전송 트랜잭션"이라고 합니다. 각 매개변수를 자세히 살펴보겠습니다.

`from` 주소는 저희가 업로드한 키스토어에서 파생됩니다. `to` 주소는 KLAY를 수신하는 주소이며, 어떤 주소든 사용할 수 있습니다. `value`의 경우 `caver.utils.toPeb()`을 사용하여 편리하게 KLAY를 peb으로 변환할 수 있습니다. 여기서는 10 KLAY를 전송합니다. `gas`의 경우,

```
	
	// Create value transfer transaction
	const vt = caver.transaction.valueTransfer.create({
		from: keyring.address,
		to: '0x8084fed6b1847448c24692470fc3b2ed87f9eb47',
		value: caver.utils.toPeb(10, `klay`),
		gas: 25000,
	})

	// Sign to the transaction
	const signed = await caver.wallet.sign(keyring.address, vt)

	// Send transaction to the Klaytn blockchain platform (Klaytn)
	const receipt = await caver.rpc.klay.sendRawTransaction(signed)
	console.log(receipt)
}
```

마지막에 추가하는 것을 잊지 마세요:

```
sendKlay()
```

## 8. 코드 실행 <a id="8.-run-the-code"></a>

방금 작성한 코드를 실행해 보겠습니다:

```
node testcaver.js
```

![비밀번호 입력](/img/references/prompt.png)


결과는 다음과 같이 표시됩니다:

```
SingleKeyring {
  _address: '0x658750eaa5d4db896d9ad0de79e00d551e0bf808',
  _key: PrivateKey {
    _privateKey: '0xea296e1bc67ba18a9ca87161c9e4fe486bb805ffff4f7a453f621a45e341e076'
  }
}
{
  blockHash: '0x0c29221072f049cf08ec2112755cbc0bc55289de5337faf2911147a4d8229693',
  blockNumber: '0x64e399d',
  contractAddress: null,
  effectiveGasPrice: '0x5d21dba00',
  from: '0x658750eaa5d4db896d9ad0de79e00d551e0bf808',
  gas: '0x61a8',
  gasPrice: '0xba43b7400',
  gasUsed: '0x5208',
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  nonce: '0x0',
  senderTxHash: '0xdef371f3b194de1d6b6b678a3181e0e961549f2bc8f6391f97f48c8ea995225e',
  signatures: [
    {
      V: '0x7f6',
      R: '0x6425f98285f8e680a9cbfe32de824cceedd7fdca91ba9f7fa513898bc0d01ea8',
      S: '0x37718277df2a7a940212c9adb411f52d79d8cced784177c41224dca1a1ef122c'
    }
  ],
  status: '0x1',
  to: '0x7f1d6235b79688169fd6e15c4e8f540d6799dc75',
  transactionHash: '0xdef371f3b194de1d6b6b678a3181e0e961549f2bc8f6391f97f48c8ea995225e',
  transactionIndex: '0x2',
  type: 'TxTypeValueTransfer',
  typeInt: 8,
  value: '0x8ac7230489e80000'
}
```

트랜잭션 내역은 [Klaytnfinder](https://baobab.klaytnfinder.io/) 또는 [Klaytnscope](https://scope.klaytn.com)에서 `transactionHash`를 통해 확인할 수 있습니다.

## 9. 전체 코드 <a id="9.-run-the-code"></a>

```
const Caver = require('caver-js')
const read = require('read')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function sendKLAY() {
    // Read keystore json file
    	const fs = require('fs')
	const keystore = fs.readFileSync('./keystore.json', 'utf8')
	const password = await loadPassword()

	// Decrypt keystore and create
	const keyring = caver.wallet.keyring.decrypt(keystore, password)
	console.log(keyring)

    // Add to caver.wallet
	caver.wallet.add(keyring)

    // Create value transfer transaction
	const vt = caver.transaction.valueTransfer.create({
		from: keyring.address,
		to: '0x7f1D6235B79688169fd6e15C4E8f540d6799dC75',
		value: caver.utils.toPeb(10, `klay`),
		gas: 25000,
	})

	// Sign to the transaction
	const signed = await caver.wallet.sign(keyring.address, vt)

	// Send transaction to the Klaytn blockchain platform (Klaytn)
	const receipt = await caver.rpc.klay.sendRawTransaction(signed)
	console.log(receipt)
}

async function loadPassword() {
    var read = require('read')

    return new Promise((resolve, reject)=> {
        read({ prompt: 'Password: ', silent: true }, function(er, password) {
            if(er) {
                reject(er)
                return
            }
            resolve(password)
        })

    })

}

sendKLAY()
```

caver-js를 사용하여 트랜잭션을 제출한 것에 대해 자신감을 가지셨기를 바랍니다. 막히는 부분이 있거나 궁금한 점이 있으시다면, [클레이튼 포럼](https://forum.klaytn.foundation/)에서 도움을 받으시기 바랍니다.

