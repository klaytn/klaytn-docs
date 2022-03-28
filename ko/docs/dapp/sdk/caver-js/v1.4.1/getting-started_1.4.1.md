# 시작하기 <a id="getting-started"></a>

## 준비 사항 <a id="prerequisites"></a>

### 의존성 <a id="dependencies"></a>

caver-js 라이브러리를 사용하려면 다음 패키지가 필요합니다.

* [Node.js](https://nodejs.org/en/download/)
* [npm](https://www.npmjs.com/get-npm)
* [gcc-c++](https://gcc.gnu.org/)
* [Solidity compiler](https://solidity.readthedocs.io/en/develop/installing-solidity.html)

**참고** caver-js는 Node.js 버전 8 및 10에서 실행할 수 있으며, 권장 버전은 다음과 같습니다:

* lts/carbon \([8.16.0](https://nodejs.org/dist/latest-v8.x/)\)
* lts/dubnium \([10.16.0](https://nodejs.org/dist/latest-v10.x/)\)

다른 버전의 Node\(가령 Node v12\)를 이미 사용중인 경우, Node Version Manager\([NVM](https://github.com/nvm-sh/nvm)\)를 사용해 caver-js가 지원하는 버전을 설치하고 사용합니다.

### 설치 <a id="installation"></a>

다음 명령을 사용해 npm으로 caver-js를 설치하세요:

```text
$ npm install caver-js
```

**참고**: `package.json` 파일이 설치 경로와 동일한 곳에 존재해야 합니다. 만일 존재하지 않으면, `npm init`을 통해 `package.json`가 생성되어야 합니다.

caver-js의 특정 버전을 설치하려면 다음 명령을 이용하세요:

```text
$ npm install caver-js@X.X.X
```

## caver-js 시작하기<a id="starting-with-caver-js"></a>

caver-js 설치가 끝나면 이제 caver-js를 Klaytn 노드와 연결할 수 있습니다.

아래 예시와 같이 caver-js 모듈을 가져와 Baobab 테스트넷의 Klaytn 노드에 연결할 수 있습니다:

```text
$ node
> const Caver = require('caver-js')
> const caver = new Caver('https://api.baobab.klaytn.net:8651/')
```

EN을 실행 중인 경우, 아래와 같이 호스트와 포트를 변경하여 자신의 노드에 연결할 수 있습니다:

```text
$ node
> const Caver = require('caver-js')
> const caver = new Caver('https://api.baobab.klaytn.net:8651/')
```

## 계정 관리 <a id="managing-accounts"></a>

### 계정 생성 <a id="creating-an-account"></a>

아래와 같이 계정을 생성하기 위해 `caver-js`를 사용할 수 있습니다. [Klaytn Wallet](../../../../toolkit/klaytn-wallet.md#create-a-new-account)을 통해 계정을 생성할 수 있습니다.

```text
> const account = caver.klay.accounts.create()

> account
{ address: '0x3bd32d55e64d6cbe54bec4f5200e678ee8d1a990',
  privateKey: '0x{private key}',
  ... }
```

**Note**: Functions associated with [caver.klay.accounts][] have no effect on the actual Klaytn network.

### caver-js에 계정 추가하기 <a id="add-accounts-to-caver-js"></a>

caver-js에서 제공하는 인메모리 지갑을 사용하면 쉽게 계정을 사용할 수 있습니다. 다음 예시는 계정 객체 및 Klaytn Wallet이 생성한 키스토어 파일을 사용해 지갑에 계정을 추가하는 방법을 보여줍니다.

```text
// Using an account object
> caver.klay.accounts.wallet.add(caver.klay.accounts.create())
{ 
    address: '0xebec0df19ed2f8b4070dec94d55a69077c544403',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 0 
}

// Using a keystore file.
> const decryptedAccount = caver.klay.accounts.decrypt({
        "version": 3,
        "id": "7c05d545-85ce-46c9-b6e9-9110d6597931",
        "address": "0x460406d822b5908504353deabc890e0de61eb42b",
        "crypto": {
            "ciphertext": "d2a84b99312215ca2d8ea43b251dc94fd55c3fc4a0c283538ef114d20251bf4a",
            "cipherparams": {
                "iv": "21b4298e33b8a61549f6abbecbd4d347"
            },
            "cipher": "aes-128-ctr",
            "kdf": "scrypt",
            "kdfparams": {
                "dklen": 32,
                "salt": "6c7a1618ee5525b10ddbcf0f0879214200984f583faf55af5dd2a7a0b7a58fd6",
                "n": 4096,
                "r": 8,
                "p": 1
            },
            "mac": "99e4c25ac8acf1571d4161f2c40db92a391aefd42ec871e23601a7af446432a7"
        }
    }, 'password')
> caver.klay.accounts.wallet.add(decryptedAccount)
{ 
    address: '0x460406d822b5908504353deabc890e0de61eb42b',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}
```

caver-js 지갑에 추가된 계정은 `sendTransaction`에 사용될 수 있습니다.

## 트랜잭션 전송하기 <a id="sending-a-transaction"></a>

이 장에서는 Baobab 네트워크에서 caver-js를 사용하여 KLAY를 보내는 방법을 보여줍니다.

### Baobab Faucet을 통해 KLAY 받기 <a id="getting-klay-via-baobab-faucet"></a>

테스트를 위해 KLAY가 필요한 경우 [Klaytn Wallet](../../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay)에서 Baobab testnet KLAY를 얻을 수 있습니다. 개인키 또는 키스토어 파일을 사용하여 Klaytn Wallet에 로그인하고 테스트를 위해 faucet을 통해 Baobab 테스트넷 KLAY를 받습니다.

### 송금 트랜잭션 전송 <a id="sending-a-value-transfer-transaction"></a>

트랜잭션 서명은 caver-js 지갑을 통해 할 수 있습니다. 만약 caver-js 지갑에 계정이 있다면, `caver.klay.sendTransaction`을 실행할 때 caver-js 지갑에 저장된 개인키로 서명이 생성됩니다. 이때 `caver.klay.sendTransaction`은 서명 생성과 트랜잭션 제출을 동시에 처리합니다.

```text
// 아직 caver-js 지갑에 계정을 추가하지 않았다면 'caver.klay.accounts.wallet.add'를 실행하여 지갑에 계정을 추가하세요.
// 동일한 계정이 이미 지갑에 있는 경우 'Error: Account exists with {hex in address}'가 출력됩니다. 이 경우 출력된 주소값을 'from' 필드에 입력하여 해당 계정을 참조할 수 있습니다.

> const account = caver.klay.accounts.wallet.add('0x{private key}')

> caver.klay.sendTransaction({
    type: 'VALUE_TRANSFER',
    from: account.address',
    to: '0xeF5cd886C7f8d85fbe8023291761341aCBb4DA01',
    gas: '300000',
    value: 1,
  }).then(console.log)
{ 
    blockHash: '0x5e9f427c9550a6f7575bcf60aba9257634884519a6273a23e8eefee2a696cce4',
    blockNumber: 3841096,
    contractAddress: null,
    from: '0x3bd32d55e64d6cbe54bec4f5200e678ee8d1a990',
    ...
    status: true,
    to: '0xef5cd886c7f8d85fbe8023291761341acbb4da01',
    transactionHash: '0xb09f6d26734074a259f6cbe4d509d2bf40f6f0a4559081354527ae211dd9d00f',
    transactionIndex: 1,
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x1' 
}
```

caver-js 지갑 없이 해당 개인키로부터 서명을 직접 생성하고자 하는 경우 다음과 같이 진행할 수 있습니다.

1. `caver.klay.accounts.signTransaction`를 실행하세요. - 개인키로 트랜잭션을 서명하고 RLP 인코딩합니다.
2. `caver.klay.sendSignedTransaction`을 실행하세요. - caver-js와 연결된 노드에게 RLP 인코딩된 트랜잭션을 전송합니다.

먼저 트랜잭션을 서명하려면 아래와 같이 발신자, 수신자, 개인키를 지정하세요.

**참고:** 발신자의 잔액은 송금하려는 KLAY보다 많아야 합니다.

```text
> caver.klay.accounts.signTransaction({
    type: 'VALUE_TRANSFER',
    from: '0x71959675eeb7c7ec1e0c74f206a9c488d7f178d4',
    to: '0xeF5cd886C7f8d85fbe8023291761341aCBb4DA01',
    gas: '300000',
    value: caver.utils.toPeb('1', 'KLAY'),
  }, '0x{private key}').then((result)=>{
      rawTransaction = result.rawTransaction
  })
```

You can get a RLP-encoded transaction \(`rawTransaction`\) using [caver.klay.accounts.signTransaction][] as above and use this to transfer the transaction to the Klaytn network as below.

```text
> caver.klay.sendSignedTransaction(rawTransaction).on('transactionHash', console.log)
0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca
```

위 예시처럼 `.on(‘transactionHash’, console.log)`를 호출하여 제출한 트랜잭션의 해시를 요청하고 이벤트 이미터(event emitter)로 받아올 수 있어요.

### 영수증 확인<a id="checking-receipts"></a>

[caver.klay.sendSignedTransaction](api-references/caver.klay/transaction.md#sendsignedtransaction) 또는 [caver.klay.sendTransaction](api-references/caver.klay/transaction.md#sendtransaction)을 통해 트랜잭션을 전송할 때 프로미스(promise)나 이벤트 이미터(event emitter)를 사용하여 트랜잭션의 영수증을 받아올 수 있습니다.

다음 예시는 프로미스(promise) 및 이벤트 이미터(event emitter)를 사용하여 영수증을 받는 과정입니다.

```text
// 프로미스(promise) 사용
> caver.klay.sendSignedTransaction(rawTransaction).then(console.log)
{ 
    blockHash: '0x6ccef34eb59fab927705d344f080f449b576c0626e4aa3e20f569feb8df6e283',
    blockNumber: 19097,
    contractAddress: null,
    from: '0x71959675eeb7c7ec1e0c74f206a9c488d7f178d4',
    ...
    status: true,
    to: '0xef5cd886c7f8d85fbe8023291761341acbb4da01',
    transactionHash: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
    transactionIndex: 0,
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0xde0b6b3a7640000' 
}

// 이벤트 이미터(event emitter) 사용
> caver.klay.sendSignedTransaction(rawTransaction).on('receipt', console.log)
{ 
    blockHash: '0x6ccef34eb59fab927705d344f080f449b576c0626e4aa3e20f569feb8df6e283',
    blockNumber: 19097,
    contractAddress: null,
    from: '0x71959675eeb7c7ec1e0c74f206a9c488d7f178d4',
    ...
    status: true,
    to: '0xef5cd886c7f8d85fbe8023291761341acbb4da01',
    transactionHash: '0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca',
    transactionIndex: 0,
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0xde0b6b3a7640000' 
}
```

위 예시와 같이 프로미스(promise)와 이벤트 이미터(event emitter)를 통해 트랜잭션을 전송한 결과를 가져올 수 있습니다. And also, if you know the transaction hash, you can query the transaction receipt using the [caver.klay.getTransactionReceipt][] RPC call. The example below shows how to get a receipt using the [caver.klay.getTransactionReceipt][] RPC call.

```text
> caver.klay.getTransactionReceipt('0xbad4dd6d80beda6c04d90f1db7e4179557ab48423d4f14295b33e38a9418e59f').then(console.log)
{ 
    blockHash: '0xd56ac90d552f924f228683f78854c0ffd9f29498f985892f726326a860378a53',
    blockNumber: 3827075,
    contractAddress: null,
    from: '0x3bd32d55e64d6cbe54bec4f5200e678ee8d1a990',
    gas: '0x493e0',
    gasPrice: '0x5d21dba00',
    gasUsed: 21000,
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    nonce: '0x2',
    senderTxHash: '0xbad4dd6d80beda6c04d90f1db7e4179557ab48423d4f14295b33e38a9418e59f',
    signatures: [ 
        { 
            V: '0x7f5',
            R: '0x30222c5c4a16e9053492ab90b1555585f2f4da3712de9f3e1f9ca8ce952f4aeb',
            S: '0x621d65429322d3ed961ca04a00cf050ee85b35fa69aaa300a41bf483febdc91' 
        } 
    ],
    status: true,
    to: '0xef5cd886c7f8d85fbe8023291761341acbb4da01',
    transactionHash: '0xbad4dd6d80beda6c04d90f1db7e4179557ab48423d4f14295b33e38a9418e59f',
    transactionIndex: 2,
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0xde0b6b3a7640000' 
}
```

트랜잭션의 실행 결과는 영수증의 상태를 통하여 확인할 수 있습니다. For a detailed description of the return values, see [getTransactionReceipt][]. 만약 트랜잭션 실행이 실패한다면 에러에 대한 내용은 영수증의 `txError`에서 확인할 수 있습니다. For more information about `txError`, see [txError: Detailed Information of Transaction Failures][].

## 다른 트랜잭션 타입 실행하기 <a id="executing-other-transaction-types"></a>

Klaytn은 확장성과 성능을 위한 다양한 트랜잭션 타입을 제공합니다. 자세한 내용은 [트랜잭션](../../../../klaytn/design/transactions/README.md)을 참고하세요. 이 장에서는 caver-js와 함께 사용할 수 있는 다양한 예시를 설명합니다.

### 트랜잭션 수수료 위임 <a id="fee-delegation"></a>

Klaytn provides [Fee Delegation][] feature. 예제 코드는 다음과 같습니다.

발신인인 경우 아래 코드를 사용하여 RLP로 인코딩된 트랜잭션 객체를 만드세요:

```text
> caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_VALUE_TRANSFER',
    from: '0x3bd32d55e64d6cbe54bec4f5200e678ee8d1a990',
    to: '0xeF5cd886C7f8d85fbe8023291761341aCBb4DA01',
    gas: '300000',
    value: caver.utils.toPeb('1', 'KLAY'),
  }, '0x{private key}').then((ret)=>{rawTransaction = ret.rawTransaction})

> rawTransaction
'0x09f88d038505d21dba00830493e094ef5cd886c7f8d85fbe8023291761341acbb4da01880de0b6b3a7640000943bd32d55e64d6cbe54bec4f5200e678ee8d1a990f847f8458207f5a0a48374bbf227fbbdcb28f3360d0cc1f5e36922be409a3edd8b0c6fa5aa5c57dda07e15ebe1c9dd78d1c0f36a5f7970e578c2e57d9360cd25928674d1c05d7e161d80c4c3018080'
```

서명된 RLP 인코딩된 트랜잭션 객체 \(`rawTransaction`\)으로 트랜잭션 수수료 납부자는 서명을 첨부한 후 트랜잭션을 보낼 수 있습니다. 트랜잭션 수수료 납부자는 senderRawTransaction에 `rawTransaction`를 설정하고 아래 예시와 같이 트랜잭션 수수료 납부자의 주소로 서명합니다.

```text
// 아직 caver-js 지갑에 트랜잭션 수수료 납부자의 계정을 추가하지 않았다면, 'caver.klay.accounts.wallet.add'를 실행하여 지갑에 계정을 추가하세요.
// 이미 계정이 지갑에 추가된 경우 'Error: Account exists with {hex in address}'가 출력됩니다. 이 경우 `feePayer.address` 대신 계정 주소를 사용하세요.
> const feePayer = caver.klay.accounts.wallet.add('0x{private key}')

> caver.klay.sendTransaction({
    senderRawTransaction: rawTransaction,
    feePayer: feePayer.address,
  }).then(console.log)
{ 
    blockHash: '0xf0c4ef717a674ffaea8bf68597c936ce8a3773dab1e1f6f42508963f124bc301',
    blockNumber: 3840725,
    ...
    transactionHash: '0x8d1fea7710bc351540257a4ae7f2274d66ddd7f62bcdb6f1f77893cecb659405',
    transactionIndex: 2,
    type: 'TxTypeFeeDelegatedValueTransfer',
    typeInt: 9,
    value: '0xde0b6b3a7640000' 
}
```

**참고**: 트랜잭션 수수료 납부자의 계정은 caver-js 지갑에 있어야 합니다.

### 계정 업데이트 <a id="account-update"></a>

계정의 키를 변경하려면 아래와 같은 트랜잭션을 보내세요. Please check [Account Update][] for the transaction field according to the key type.

```text
// 아직 caver-js 지갑에 계정을 추가하지 않았다면 'caver.klay.accounts.wallet.add'를 실행하여 지갑에 계정을 추가하세요.
// 동일한 계정이 이미 지갑에 있는 경우 'Error: Account exists with {hex in address}'가 출력됩니다. 이 경우 출력된 주소값을 'from' 필드에 입력하여 해당 계정을 참조할 수 있습니다.
> const account = caver.klay.accounts.wallet.add('0x{private key}')

> caver.klay.sendTransaction({
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    publicKey:  '0x9016de15ebb219b1e8bc732070df93a28903e5799d0cd24a807a5afabf4601f7e5ab312b5a682dd8c0e72e71e67552174d5082cde25db3626a5b025f97f8a005',
    gas: '300000',
}).then(console.log);
```

### 스마트 컨트랙트 <a id="smart-contract"></a>

The [caver.klay.Contract][] package makes it easy to interact with smart contracts on Klaytn. 저수준 ABI\(Application Binary Interface\)가 주어지면 스마트 컨트랙트의 모든 메소드를 자동으로 자바스크립트 호출로 변환합니다. 이를 통해 스마트 컨트랙트가 마치 자바스크립트 객체인 것처럼 스마트 컨트랙트와 상호작용할 수 있습니다.

먼저 스마트 컨트랙트를 컴파일하여 바이트코드와 ABI를 얻습니다.

```text
> solc --abi --bin --allow-paths . ./test.sol
======= ./test.sol:Count =======
Binary: 
60806040526000805534801561001457600080fd5b50610123806100246000396000f3fe6080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60df565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260e5565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060dd6004803603602081101560c857600080fd5b810190808035906020019092919050505060ed565b005b60005481565b600043905090565b806000819055505056fea165627a7a72305820e381897039d8e48bf74b4a096bb1c4ed02f331bd1a7a4add6217b72fa888f2f10029
Contract JSON ABI 
[{"constant":true,"inputs":[],"name":"count","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBlockNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_count","type":"uint256"}],"name":"setCount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```

**참고**: 스마트 컨트랙트를 컴파일하려면 솔리디티 컴파일러가 설치되어 있어야 합니다.

For smart contract deployment, you can use [caver.klay.Contract][] to deploy it, or you can deploy it using [SMART_CONTRACT_DEPLOY][] transaction. Here is an example of using [caver.klay.Contract][].

컨트랙트 인스턴스가 생성되면, 아래와 같이 바이트코드를 `data` 필드에 전달하는 것으로 배포할 수 있습니다:

```text
// 아직 caver-js 지갑에 계정을 추가하지 않았다면 'caver.klay.accounts.wallet.add'를 실행하여 지갑에 계정을 추가하세요.
// 동일한 계정이 이미 지갑에 있는 경우 'Error: Account exists with {hex in address}'가 출력됩니다. 이 경우 출력된 주소값을 'from' 필드에 입력하여 해당 계정을 참조할 수 있습니다.
> const account = caver.klay.accounts.wallet.add('0x{private key}')

> contractInstance.deploy({
    data:  '60806040526000805534801561001457600080fd5b50610123806100246000396000f3fe6080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60df565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260e5565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060dd6004803603602081101560c857600080fd5b810190808035906020019092919050505060ed565b005b60005481565b600043905090565b806000819055505056fea165627a7a72305820e381897039d8e48bf74b4a096bb1c4ed02f331bd1a7a4add6217b72fa888f2f10029',
}).send({
    from: account.address,
    gas: '0x4bfd200',
    value: '0x0',
}).then(console.log)
{ 
    blockHash: '0x71426773ed65f307bdfac5070ac54f11f406086bbe8dfa170215ed4190f176ed',
    blockNumber: 226,
    codeFormat: '0x0',
    contractAddress: '0xC9f0b868e5103b6823171a2Df85E7B696660E466',
    from: '0x71959675eeb7c7ec1e0c74f206a9c488d7f178d4',
    gas: '0x4bfd200',
    gasPrice: '0x5d21dba00',
    gasUsed: 149017,
    humanReadable: false,
    input: '0x60806040526000805534801561001457600080fd5b50610123806100246000396000f3fe6080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60df565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260e5565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060dd6004803603602081101560c857600080fd5b810190808035906020019092919050505060ed565b005b60005481565b600043905090565b806000819055505056fea165627a7a72305820e381897039d8e48bf74b4a096bb1c4ed02f331bd1a7a4add6217b72fa888f2f10029',
    ...
    type: 'TxTypeSmartContractDeploy',
    typeInt: 40,
    value: '0x0',
    events: {} 
}
```

배포된 컨트랙트 주소는 트랜잭션 영수증의 `contractAddress`에서 찾을 수 있습니다. 스마트 컨트랙트 실행 트랜잭션을 보내기 전, 다음과 같이 주소를 컨트랙트 인스턴스의 주소로 설정하세요:

```text
> contractInstance.options.address = '0xC9f0b868e5103b6823171a2Df85E7B696660E466'
'0xC9f0b868e5103b6823171a2Df85E7B696660E466'
```

One way to invoke a specific method of a smart contract is to use it with `caver.klay.Contract` or use [SMART_CONTRACT_EXECUTION][].

스마트 컨트랙트로 트랜잭션을 생성하려면:

```text
// 아직 caver-js 지갑에 계정을 추가하지 않았다면 'caver.klay.accounts.wallet.add'를 실행하여 지갑에 계정을 추가하세요.
// 동일한 계정이 이미 지갑에 있는 경우 'Error: Account exists with {hex in address}'가 출력됩니다. 이 경우 출력된 주소값을 'from' 필드에 입력하여 해당 계정을 참조할 수 있습니다.
> const account = caver.klay.accounts.wallet.add('0x{private key}')

> contractInstance.methods.setCount(1).send({from:account.address, gas:'0x4bfd200'}).then(console.log)
{ 
    blockHash: '0x159f8515102951bca9c403b2b1b37850ca01a08dffb9a763837f55a6d518bbb6',
    blockNumber: 644,
    contractAddress: null,
    from: '0x71959675eeb7c7ec1e0c74f206a9c488d7f178d4',
    gas: '0x4bfd200',
    gasPrice: '0x5d21dba00',
    gasUsed: 44875,
    input: '0xd14e62b80000000000000000000000000000000000000000000000000000000000000001',
    ...
    type: 'TxTypeSmartContractExecution',
    typeInt: 48,
    value: '0x0',
    events: {} 
}
```

스마트 컨트랙트를 호출하려면:

```text
> contractInstance.methods.getBlockNumber().call().then(console.log)
2194
```

See [caver.klay.Contract][] for details.

## 다양한 AccountKey 타입 사용 <a id="using-various-accountkey-types"></a>

caver-js introduces new classes to support the various types of [AccountKey][] supported by the platform.

아래 예제는 Node.js 파일에서의 예시를 설명합니다. 예제를 실습하려면, 먼저 아래처럼 작업 디렉토리에 테스트 파일을 생성하세요.

```bash
$ touch test.js
```
작업 디렉토리에 생성된 `test.js` 파일을 확인할 수 있을 것입니다.

test.js에 다음 코드를 작성하세요.
```javascript
// test.js file
const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')

async function testFunction() {
    const version = await caver.klay.getNodeInfo()
    console.log(version)
}

testFunction()
```

파일을 저장하고 콘솔에서 실행하세요.

```bash
$ node ./test.js
```

console.log 출력을 확인했다면, 아래 단계로 진행하세요.

**참고** caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0)부터 이러한 클래스가 지원됩니다.

### 계정 <a id="account"></a>
Account는 계정의 주소와 키를 포함하는 클래스입니다. Account에는 [AccountKeyPublic](#accountkeypublic), [AccountKeyMultiSig](#accountkeymultisig), 또는 [AccountKeyRoleBased](#accountkeyrolebased) 중 하나인  [AccountKey](#accountkey)가 있습니다.

caver.klay.accounts 패키지는 개인키를 저장하고 관리하는 [AccountKeyPublic](#accountkeypublic)을 기본으로 사용합니다.

다음 예제는 AccountKeyPublic을 AccountKey로 가지는 계정을 만듭니다.
```javascript
// test.js file
async function testFunction() {
    // Create random account with accountKeyPublic by default
    const account = caver.klay.accounts.create()
    printAccount(account)

    // Create account with specific private key string
    const privateKey = caver.klay.accounts.create().privateKey
    const accountFromKey = caver.klay.accounts.privateKeyToAccount(privateKey)
    printAccount(accountFromKey)
}

function printAccount(account) {
    console.log(`address: ${account.address}`)
    console.log(`privateKey: ${account.privateKey}`)
    console.log(`accountKeyType: ${account.accountKeyType}`)
    console.log(`accountKey`)
    console.log(account.accountKey)
    console.log(`account.keys: ${account.keys}`)
    console.log(`account.transactionKey: ${account.transactionKey}`)
    console.log(`account.updateKey: ${account.updateKey}`)
    console.log(`account.feePayerKey: ${account.feePayerKey}\n`)
}
```

위의 printAccount는 계정 인스턴스의 속성을 사용하는 방법을 보여줍니다. 계정 내부의 속성은 다음과 같습니다.

| 속성명            | 설명                                                                                                                                                                                                   |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address        | 계정 주소.                                                                                                                                                                                               |
| privateKey     | 계정에 있는 accountKey의 기본 키 문자열. 이 속성은 이전 버전과의 호환성을 위해 남겨졌습니다. privateKey는 accountKey의 기본 키만 나타내므로, privateKey를 사용하여 서명하거나 트랜잭션을 보내지 않는 편이 좋습니다. transactionKey, updateKey 또는 feePayerKey를 사용하는 것이 좋습니다. |
| accountKeyType | 계정이 가진 accountKey의 유형. `AccountKeyPublic`, `AccountKeyMultiSig`, 또는 `AccountKeyRoleBased`일 수 있습니다.                                                                                                   |
| accountKey     | 계정의 키. AccountKeyPublic, AccountKeyMultiSig 또는 AccountKeyRoleBased입니다.                                                                                                                               |
| keys           | 계정이 가진 accountKey의 모든 키.                                                                                                                                                                             |
| transactionKey | [RoleTransaction](../../../../klaytn/design/accounts.md#roles)에 사용되는 키. AccountKeyPublic 또는 AccountKeyMultiSig는 어떤 역할에도 묶이지 않으므로, transactionKey는 키와 동일한 값을 가집니다.                                    |
| updateKey      | [RoleAccountUpdate](../../../../klaytn/design/accounts.md#roles)에 사용되는 키. AccountKeyPublic 또는 AccountKeyMultiSig는 어떤 역할에도 묶이지 않으므로, updateKey는 키와 동일한 값을 가집니다.                                       |
| feePayerKey    | [RoleFeePayer](../../../../klaytn/design/accounts.md#roles)에 사용되는 키. AccountKeyPublic 또는 AccountKeyMultiSig는 어떤 역할에도 묶이지 않으므로, feePayerKey는 키와 동일한 값을 가집니다.                                          |

**참고** `transactionKey`, `updateKey`, 그리고 `feePayerKey`는 역할에 사용해야 하는 개인키 문자열 또는 개인키 문자열 배열을 반환합니다. 따라서 privateKey 속성을 사용하는 대신, accountKey 유형에 대한 걱정 없이 `transactionKey`, `updateKey` 그리고 `feePayerKey`를 적절하게 사용하는 것이 권장됩니다.

다양한 AccountKey 클래스에 대한 설명은 [AccountKey](#accountkey) 부분에서 제공됩니다.

### AccountKey  <a id="accountkey"></a>
AccountKey는 계정의 키를 저장하는 데이터 구조입니다. 계정에는 서명에 사용할 하나의 개인키 문자열 또는 여러 개인키 문자열이 있을 수 있습니다. 계정은 [역할들](../../../../klaytn/design/accounts.md#roles)로 개인키를 관리할 수도 있습니다.

이 구조를 지원하기 위해, caver-js는 AccountKeyPublic, AccountKeyMultiSig 및 AccountKeyRoleBased라는 새로운 클래스를 도입했습니다.

AccountKey를 만들려면 `caver.klay.accounts.createAccountKey`를 사용하세요. 이 함수는 매개변수 유형에 따라 생성할 AccountKey를 결정합니다. 개인키 문자열이 매개변수로 제공되면 AccountKeyPublic을 생성하고, 개인키 문자열 배열이 제공되면 AccountKeyMultiSig를 생성합니다. 각 역할마다 다른 키를 가진 객체가 있으면 AccountKeyRoleBased를 생성합니다.

**참고** caver-js에서 정의된 `AccountKey`에 대한 클래스는 caver-js에서 개인키를 저장하기 위한 데이터 구조입니다. Klaytn 네트워크 계정의 키와 다를 수 있습니다.

#### AccountKeyPublic  <a id="accountkeypublic"></a>
AccountKeyPublic은 하나의 개인키 문자열을 저장하고 관리하기 위한 클래스입니다.

다음은 AccountKeyPublic으로 계정을 업데이트하는 방법에 대해 설명합니다. 다음 코드를 testFunction()에 작성하고 실행하세요.

```javascript
const privateKey = caver.klay.accounts.create().privateKey
const accountKey = caver.klay.accounts.createAccountKey(privateKey)

console.log(accountKey)
console.log(`type: ${accountKey.type}`)
console.log(`keys: ${accountKey.keys}`)
console.log(`transactionKey: ${accountKey.transactionKey}`)
console.log(`updateKey: ${accountKey.updateKey}`)
console.log(`feePayerKey: ${accountKey.feePayerKey}`)
```

AccountKeyPublic는 개인키 문자열을 저장하고 관리하므로, 위의 예제를 실행하면, `keys`, `transactionKey`, `updateKey` 그리고 `feePayerKey` 모두 동일한 개인키 문자열을 나타내는 것을 볼 수 있을 것입니다.

AccountKeyPublic을 accountKey로 계정을 생성하는 예제는 아래를 참조하세요.

```javascript
const privateKey = caver.klay.accounts.create().privateKey
const accountKey = caver.klay.accounts.createAccountKey(privateKey)

const address = caver.klay.accounts.create().address

// Create an Account instance with a private key string
const accountFromStringKey = caver.klay.accounts.createWithAccountKey(address, privateKey)

// Create an Account instance with an AccountKeyPublic instance
const accountFromAccountKey = caver.klay.accounts.createWithAccountKey(address, accountKey)
```

#### AccountKeyMultiSig  <a id="accountkeymultisig"></a>
AccountKeyPublic은 여러 개인키 문자열을 저장하고 관리하기 위한 클래스입니다.

다음은 AccountKeyMultiSig으로 계정을 업데이트하는 방법에 대해 설명합니다. 다음 코드를 testFunction()에 작성하고 실행하세요.

```javascript
const privateKeyArray = [caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey]
const accountKey = caver.klay.accounts.createAccountKey(privateKeyArray)

console.log(accountKey)
console.log(`type: ${accountKey.type}`)
console.log(`keys: ${accountKey.keys}`)
console.log(`transactionKey: ${accountKey.transactionKey}`)
console.log(`updateKey: ${accountKey.updateKey}`)
console.log(`feePayerKey: ${accountKey.feePayerKey}`)
```

AccountKeyPublic는 여러 개인키 문자열을 저장하고 관리하므로, 위의 예제를 실행하면, `keys`, `transactionKey`, `updateKey` 그리고 `feePayerKey` 모두 동일한 여러 개인키 문자열을 나타내는 것을 볼 수 있을 것입니다.

만일 트랜잭션을 서명할 때 사용할 개인키(또는 개인키 문자열의 배열)를 명시하지 않았다면, caver-js는 인메모리 지갑에서 `from` 또는 `fee payer`와 일치하는 계정을 찾아 서명합니다. 이 경우, 계정에 여러 개의 개인키가 있는 경우, caver-js는 모든 해당하는 키로 트랜잭션에 서명합니다.

AccountKeyMultiSig을 accountKey로 계정을 생성하는 예제는 아래를 참조하세요.

```javascript
const privateKeyArray = [caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey]
const accountKey = caver.klay.accounts.createAccountKey(privateKeyArray)

const address = caver.klay.accounts.create().address

// Create Account instance with an array of private key strings
const accountFromStringKey = caver.klay.accounts.createWithAccountKey(address, privateKeyArray)

// Create Account instance with AccountKeyMultiSig instance
const accountFromAccountKey = caver.klay.accounts.createWithAccountKey(address, accountKey)
```

#### AccountKeyRoleBased  <a id="accountkeyrolebased"></a>
AccountKeyRoleBased는 각 역할의 키를 저장하고 관리하기 위한 클래스입니다. 각 역할은 하나의 개인키 문자열 또는 여러 개인키 문자열을 가질 수 있습니다.

다음은 AccountKeyRoleBased으로 계정을 업데이트하는 방법에 대해 설명합니다. 다음 코드를 testFunction()에 작성하고 실행하세요.

```javascript
const keyobject = {
    transactionKey: [caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey],
    updateKey: caver.klay.accounts.create().privateKey,
    feePayerKey: [caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey]
}
const accountKey = caver.klay.accounts.createAccountKey(keyobject)

console.log(accountKey)
console.log(`type: ${accountKey.type}`)
console.log(`keys:`)
console.log(accountKey.keys)
console.log(`transactionKey: ${accountKey.transactionKey}`)
console.log(`updateKey: ${accountKey.updateKey}`)
console.log(`feePayerKey: ${accountKey.feePayerKey}`)
```

AccountKeyRoleBased는 역할별로 키를 저장하고 관리하므로, 위의 예제를 실행하면, `keys` 속성에 정의된 세 가지 역할(transactionKey, updateKey, feePayerKey)을 확인할 수 있습니다. 따라서, 다른 AccountKey([AccountKeyPublic](#accountkeypublic) 또는 [AccountKeyMultiSig](#accountkeymultisig))와 달리, transactionKey, updateKey 및 feePayerKey는 각각 다른 키를 나타냅니다.

AccountKeyRoleBased을 accountKey로 계정을 생성하는 예제는 아래를 참조하세요.

```javascript
const keyobject = {
    transactionKey: [caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey],
    updateKey: caver.klay.accounts.create().privateKey,
    feePayerKey: [caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey]
}
const accountKey = caver.klay.accounts.createAccountKey(keyobject)

const address = caver.klay.accounts.create().address

// Create Account instance with an object that defines key by role
const accountFromStringKey = caver.klay.accounts.createWithAccountKey(address, keyobject)

// Create Account instance with AccountKeyRoleBased instance
const accountFromAccountKey = caver.klay.accounts.createWithAccountKey(address, accountKey)
```

위의 예제를 통해 caver-js에서 계정 및 다양한 AccountKey 유형을 사용하는 방법을 볼 수 있습니다.

이 예제는 Klaytn 네트워크에 영향을 미치지 않음을 유의하세요. AccountKeyPublic, AccountKeyMultiSig 또는 AccountKeyRoleBased와 같은 특정 계정 키 유형으로 계정을 사용하려면, Klaytn 네트워크에 계정 업데이트 트랜잭션을 보내야합니다.

다음 [AccountForUpdate](#accountforupdate)는 Klaytn 네트워크에 트랜잭션을 보내 계정을 업데이트하는 방법에 대해 설명합니다.

### AccountForUpdate  <a id="accountforupdate"></a>

AccountForUpdate는 계정 업데이트를 위한 트랜잭션을 보다 쉽게 사용할 수 있도록 설계한 클래스입니다.

AccountForUpdate는 계정 업데이트에 사용할 공개키와 업데이트 할 계정의 주소만 가지고 있습니다.

아래 예제는 accountKey로 계정을 업데이트하는 것으로 시작합니다. 계정에 테스트에 사용하기 충분한 KLAY가 있어야 합니다. Baobab 네트워크에서 사용할 테스트 KLAY는 [Baobab Faucet](../../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay)에서 얻을 수 있습니다.

#### AccountForUpdate 생성하기<a id="create-an-accountforupdate"></a>
AccountForUpdate를 생성하는 것으로 시작하겠습니다.

업데이트할 계정 주소와 사용할 새로운 키로 `createAccountForUpdate()`를 호출하여 생성할 수 있습니다.

```javascript
const account = caver.klay.accounts.create()

// AccountForUpdate with AccountKeyPublic
const privateKeyString = caver.klay.accounts.create().privateKey
const accountForUpdateForAccountKeyPublic = caver.klay.accounts.createAccountForUpdate(account.address, privateKeyString)

// AccountForUpdate with AccountKeyMultiSig
const privateKeyArray = [caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey]
const multiSigOptions = { threshold: 2, weight: [1, 1] }
const accountForUpdateForAccountKeyMultiSig = caver.klay.accounts.createAccountForUpdate(account.address, privateKeyArray, multiSigOptions)

// AccountForUpdate with AccountKeyRoleBased
const keyObject = {
    transactionKey: [caver.klay.accounts.create().privateKey, caver.klay.accounts.create().privateKey],
    updateKey: caver.klay.accounts.create().privateKey,
    feePayerKey: caver.klay.accounts.create().privateKey,
}
const roleBasedOptions = { transactionKey: { threshold: 2, weight: [1, 1] } }
const accountForUpdateForAccountKeyRoleBased = caver.klay.accounts.createAccountForUpdate(account.address, keyObject, roleBasedOptions)

// AccountForUpdate with LegacyKey
const accountForUpdateForLegacyKey = caver.klay.accounts.createAccountForUpdateWithLegacyKey(account.address)

// AccountForUpdate with FailKey
const accountForUpdateForFailKey = caver.klay.accounts.createAccountForUpdateWithFailKey(account.address)
```

**참고** 개인키 문자열 여러 개를 가지도록 업데이트 할 때는 option 개체에 임계 값과 가중치를 정의해야 합니다.

#### AccountForUpdate로 계정 업데이트<a id="account-update-with-accountforupdate"></a>

위에서 만든 AccountForUpdate를 사용하여 계정 업데이트 트랜잭션을 쉽게 만들 수 있습니다.

계정을 업데이트 하는데 사용하는 트랜잭션은 세 종류가 있습니다 : `ACCOUNT_UPDATE`, `FEE_DELEGATED_ACCOUNT_UPDATE` 그리고 `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO`.

아래 예에서 `account`는 KLAY 잔액이 충분한 계정이며 `accountForUpdate`는 새로운 키와 변경하고자 하는 계정 주소를 가진 AccountForUpdate 객체입니다. `accountForUpdate`는 caver.klay.accounts.createAccountForUpdate를 사용하여 생성됩니다.

아래 예는 AccountForUpdate를 사용하여 트랜잭션을 생성하고 Klaytn 네트워크로 전송하는 방법을 보여줍니다.

```javascript
const updateTx = {
    type: 'ACCOUNT_UPDATE',
    from: account.address,
    key: accountForUpdate,
    gas: 300000,
}

// Sign transaction with updateKey of account
const signed = await caver.klay.accounts.signTransaction(updateTx, account.updateKey)

// Send account update transaction
const receipt = await caver.klay.sendSignedTransaction(signed)
console.log(receipt)

// Get accountKey from Klaytn network
const updatedKey = await caver.klay.getAccountKey(account.address)
console.log(updatedKey)
```

`FEE_DELEGATED_ACCOUNT_UPDATE` 트랜잭션을 사용하는 방법은 아래 예를 참조하세요.

```javascript
const updateTx = {
    type: 'FEE_DELEGATED_ACCOUNT_UPDATE',
    from: account.address,
    key: accountForUpdate,
    gas: 300000,
}

// Sender signs transaction with updateKey of account
const senderSigned = await caver.klay.accounts.signTransaction(updateTx, account.updateKey)

// Fee payer signs transaction with feePayerKey of fee payer
const feePayerSigned = await caver.klay.accounts.feePayerSignTransaction(senderSigned.rawTransaction, feePayer.address, feePayer.feePayerKey)

// Send fee delegated account update transaction
const receipt = await caver.klay.sendSignedTransaction(feePayerSigned)
console.log(receipt)

// Get accountKey from Klaytn network
const updatedKey = await caver.klay.getAccountKey(account.address)
console.log(updatedKey)
```

**참고** `caver.klay.accounts.feePayerSignTransaction`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0)부터 지원됩니다.

`FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO` 트랜잭션을 사용하려는경우 위의 예제에 `updateTx`를 아래와 같이 정의하세요.

```javascript
const updateTx = {
    type: 'FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO',
    from: account.address,
    key: accountForUpdate,
    gas: 300000,
    feeRatio: 30,
}
```

계정이 성공적으로 업데이트되면 이전 키를 더 이상 사용할 수 없습니다. caver-js에 저장된 계정의 `accountKey`를 아래와 같이 업데이트 하세요.

계정의 `accountKey` 프로퍼티를 직접적으로 변경하고자 할 때, 할당하는 값은 AccountKeyPublic, AccountKeyMultiSig, 또는 AccountKeyRoleBased의 객체이어야만 합니다.

```javascript
const accountKey = caver.klay.accounts.createAccountKey(newKey)
account.accountKey = accountKey
```

계정이 caver-js의 인메모리 지갑에 있는 경우, 아래와 같이 업데이트하세요.

```javascript
// Add account to in-memory wallet
caver.klay.accounts.wallet.add(account)

caver.klay.accounts.wallet.updateAccountKey(account.address, newKey)
```

이제 caver-js에서 업데이트된 계정을 사용할 준비가 되었습니다.

## 다중 서명된 트랜잭션 보내기<a id="sending-a-transaction-with-multiple-signer"></a>

계정의 accountKey가 AccountKeyMultiSig 또는 AccountKeyRoleBased인 경우 각 키를 관리하는 사람이 다를 수 있습니다.

이 장에서는 서명하는 사람이 여럿인 경우 서명을 수집하고 트랜잭션을 보내는 방법에 대해 설명합니다.

### 순차적 서명<a id="sequential-sign"></a>
The result object of [caver.klay.accounts.signTransaction][] has a rawTransaction field.

`rawTransaction`은 RLP 인코딩된 트랜잭션으로 `signatures`와 `feePayerSignatures`를 가지고 있습니다. `feePayerSignature`는 수수료 위임 트랜잭션인 경우에만 포함됩니다.

다음 예제는 여러 개인 키를 사용하여 트랜잭션에 순차적으로 서명하는 방법을 보여줍니다. 계정의 transactionKey에 두 개의 개인키 문자열이 있다고 가정해보죠.

```javascript
const tx = {
    type: 'VALUE_TRANSFER',
    from: account.address,
    to: caver.klay.accounts.create().address,
    value: 1,
    gas: 900000,
}

// Sign with transactionKey[0]
const user1Signed = await caver.klay.accounts.signTransaction(tx, account.transactionKey[0])

// Append sender's signatures with transactionKey[1]
const user2Signed = await caver.klay.accounts.signTransaction(user1Signed.rawTransaction, account.transactionKey[1])

const receipt = await caver.klay.sendSignedTransaction(user2Signed)
console.log(receipt)
```

AccountKeyRoleBased 타입의 수수료 납부자 키로 서명하려면 아래 예를 참조하십시오. 수수료 납부자는 feePayerKey에 3개의 개인키 문자열이 있다고 가정합니다.

```javascript
const tx = {
    type: 'FEE_DELEGATED_VALUE_TRANSFER',
    from: account.address,
    to: caver.klay.accounts.create().address,
    value: 1,
    gas: 900000,
}

// Sign with transactionKey[0] and transactionKey[1]
const userSigned = await caver.klay.accounts.signTransaction(tx, [account.transactionKey[0], account.transactionKey[1]])

// Fee payer signs transaction with feePayerKey[0]
const feePayer1Signed = await caver.klay.accounts.feePayerSignTransaction(userSigned.rawTransaction, feePayer.address, feePayer.feePayerKey[0])

// Append feePayerSignatures with feePayerKey[1] and feePayerKey[2]
const feePayer2Signed = await caver.klay.accounts.feePayerSignTransaction(feePayer1Signed.rawTransaction, feePayer.address, [feePayer.feePayerKey[1], feePayer.feePayerKey[2]])

const receipt = await caver.klay.sendSignedTransaction(feePayer2Signed)
console.log(receipt)
```

**참고** `caver.klay.accounts.feePayerSignTransaction`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0)부터 지원됩니다.

사용하는 계정이 caver-js의 인메모리 지갑에 있으면 키를 `signTransaction` 또는 `feePayerSignTransaction`에 전달할 필요가 없습니다. 아래 예제를 참조하세요.

```javascript
const tx = {
    type: 'FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO',
    from: account.address,
    to: caver.klay.accounts.create().address,
    value: 1,
    gas: 900000,
    feeRatio: 10,
}

// Sign with transactionKey[0] and transactionKey[1]
const userSigned = await caver.klay.accounts.signTransaction(tx)

// Fee payer signs transaction with feePayerKey[0], feePayerKey[1] and feePayerKey[2]
const feePayerSigned = await caver.klay.accounts.feePayerSignTransaction(userSigned.rawTransaction, feePayer.address)

const receipt = await caver.klay.sendSignedTransaction(feePayerSigned)
console.log(receipt)
```

### RawTransaction의 서명을 통합하기 <a id="combine-signatures-from-rawtransaction"></a>

여러 사람으로부터 `caver.klay.accounts.signTransaction` 또는 `caver.klay.accounts.feePayerSignTransaction`이 반환하는 오브젝트를 전달받은 경우, 모든 서명 정보를 포함한 하나의 RLP 인코딩된 트랜잭션을 생성할 수 있습니다.

아래 예제는 RLP 인코딩된 트랜잭션들을 하나로 통합하고 전송하는 방법을 보여줍니다.
```javascript
const tx = {
    type: 'FEE_DELEGATED_VALUE_TRANSFER',
    from: account.address,
    to: caver.klay.accounts.create().address,
    value: 1,
    gas: 900000,
}

// Sign with transactionKey[0]
const user1Signed = await caver.klay.accounts.signTransaction(tx, account.transactionKey[0])

// Sign with transactionKey[1]
const user2Signed = await caver.klay.accounts.signTransaction(tx, account.transactionKey[1])

// Fee payer signs transaction with feePayerKey[0]
const feePayer1Signed = await caver.klay.accounts.feePayerSignTransaction(tx, feePayer.address, feePayer.feePayerKey[0])

// Fee payer signs transaction with feePayerKey[1]
const feePayer2Signed = await caver.klay.accounts.feePayerSignTransaction(tx, feePayer.address, feePayer.feePayerKey[1])

// Fee payer signs transaction with feePayerKey[2]
const feePayer3Signed = await caver.klay.accounts.feePayerSignTransaction(tx, feePayer.address, feePayer.feePayerKey[2])

const rawTransactionArray = [user1Signed.rawTransaction, user2Signed.rawTransaction, feePayer1Signed.rawTransaction, feePayer2Signed.rawTransaction, feePayer3Signed.rawTransaction]
const combined = await caver.klay.accounts.combineSignatures(rawTransactionArray)

const receipt = await caver.klay.sendSignedTransaction(combined)
console.log(receipt)
```

**참고** `caver.klay.accounts.combineSignatures`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0)부터 지원됩니다.

### Signatures 및 FeePayerSignatures와 함께 트랜잭션 오브젝트 전송하기 <a id="send-transaction-object-with-signatures-and-feepayersignatures"></a>

여러 서명인로부터 `signatures` 또는 `feePayerSignatures`만을 전달받는 경우, 아래와 같이 트랜잭션을 전송할 수 있습니다.

```javascript
const tx = {
    type: 'FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO',
    from: account.address,
    to: caver.klay.accounts.create().address,
    value: 1,
    gas: 900000,
    feeRatio: 10,
}

// Sign with transactionKey[0] and transactionKey[1]
const { signatures } = await caver.klay.accounts.signTransaction(tx)

// Fee payer signs transaction with feePayerKey[0], feePayerKey[1] and feePayerKey[2]
const { feePayerSignatures } = await caver.klay.accounts.feePayerSignTransaction(tx, feePayer.address)

// Fill in the missing information in the tx object.
tx.signatures = signatures
tx.feePayer = feePayer.address
tx.feePayerSignatures = feePayerSignatures

const receipt = await caver.klay.sendSignedTransaction(tx)
console.log(receipt)
```

또한, `caver.klay.accounts.getRawTransactionWithSignatures`을 호출하여 트랜잭션 오브젝트의 signatures와 feePayerSignatures를 포함한 RLP 인코딩된 트랜잭션을 얻을 수 있습니다.

```javascript
const tx = {
    type: 'FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO',
    from: account.address,
    to: caver.klay.accounts.create().address,
    value: 1,
    gas: 900000,
    feeRatio: 10,
}

// Sign with transactionKey[0] and transactionKey[1]
const { signatures } = await caver.klay.accounts.signTransaction(tx)

// Fee payer signs transaction with feePayerKey[0], feePayerKey[1] and feePayerKey[2]
const { feePayerSignatures } = await caver.klay.accounts.feePayerSignTransaction(tx, feePayer.address)

// Fill in the missing information in the tx object.
tx.signatures = signatures
tx.feePayer = feePayer.address
tx.feePayerSignatures = feePayerSignatures

const { rawTransaction } = await caver.klay.accounts.getRawTransactionWithSignatures(tx)
console.log(rawTransaction)
```

**참고** `caver.klay.accounts.getRawTransactionWithSignatures`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0)부터 지원됩니다.

## 샘플 프로젝트 <a id="sample-projects"></a>

Sample projects for development of dApps \(Decentralized Applications\) using caver-js can be found below:

* [Count BApp 개발하기](../../../tutorials/count-bapp/README.md)
* [Klaystagram](../../../tutorials/klaystagram/README.md)

## 링크 <a id="links"></a>

* caver-js [깃허브 레포지토리](https://github.com/klaytn/caver-js)
* caver-js on [npm](https://www.npmjs.com/package/caver-js)



[caver.klay.Contract]: api-references/caver.klay.Contract.md
[caver.klay.accounts]: api-references/caver.klay.accounts.md
[caver.klay.accounts.signTransaction]: api-references/caver.klay.accounts.md#signtransaction
[caver.klay.getTransactionReceipt]: api-references/caver.klay/transaction.md#gettransactionreceipt
[getTransactionReceipt]: api-references/caver.klay/transaction.md#gettransactionreceipt
[txError: Detailed Information of Transaction Failures]: ../../../json-rpc/transaction-error-codes.md
[Fee Delegation]: ../../../../klaytn/design/transactions/README.md#fee-delegation
[AccountKey]: ../../../../klaytn/design/accounts.md#account-key
[Account Update]: api-references/caver.klay/sendtx_account_update.md
[SMART_CONTRACT_DEPLOY]: api-references/caver.klay/sendtx_smart_contract_deploy.md
[SMART_CONTRACT_EXECUTION]: api-references/caver.klay/sendtx_smart_contract_execution.md

