# 시작하기

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

caver-js의 특정 버전을 설치하려면 다음 명령을 시도하세요:

```text
$ npm install caver-js@X.X.X
```

## caver-js로 시작하기 <a id="starting-with-caver-js"></a>

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
> const caver = new Caver('http://localhost:8551/')
```

## 계정 관리 <a id="managing-accounts"></a>

### 계정 생성 <a id="creating-an-account"></a>

아래와 같이 계정을 생성하기 위해 `caver-js`를 사용할 수 있습니다. [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#create-a-new-account)을 통해 계정을 생성할 수도 있습니다.

```text
> const account = caver.klay.accounts.create()

> account
{ address: '0x3bd32d55e64d6cbe54bec4f5200e678ee8d1a990',
  privateKey: '0x{private key}',
  ... }
```

**참고**: [caver.klay.accounts](api-references/caver.klay.accounts.md)와 관련된 함수들은 실제 Klaytn 네트워크에는 영향을 미치지 않습니다.

### caver-js에 계정 추가하기

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

## 트랜잭션 발신 <a id="sending-a-transaction"></a>

이 장에서는 Baobab 네트워크에서 caver-js를 사용하여 KLAY를 보내는 방법을 보여줍니다.

### Baobab Faucet을 통해 KLAY 받기 <a id="getting-klay-via-baobab-faucet"></a>

테스트를 위해 KLAY가 필요한 경우 [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay)에서 Baobab testnet KLAY를 얻을 수 있습니다. 개인키 또는 키스토어 파일을 사용하여 Klaytn Wallet에 로그인하고 테스트를 위해 faucet을 통해 Baobab 테스트넷 KLAY를 받습니다.

### 송금 트랜잭션 전송

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

그리고 위와 같이 [caver.klay.accounts.signTransaction](api-references/caver.klay.accounts.md#signtransaction)을 실행하여 RLP 인코딩된 트랜잭션\(`rawTransaction`\)을 생성하고, 이를 이용하여 아래와 같이 해당 트랜잭션을 Klaytn 네트워크에 전송합니다.

```text
> caver.klay.sendSignedTransaction(rawTransaction).on('transactionHash', console.log)
0xac418c96f7386a3343d149eeb29e48e28905525dda2e5afe55b0661f9ab01aca
```

위 예시처럼 `.on(‘transactionHash’, console.log)`를 호출하여 제출한 트랜잭션의 해시값을 요청하고 이벤트 에미터(event emitter)로 받아올 수 있어요.

### 영수증 확인<a id="checking-receipts"></a>

[caver.klay.sendSignedTransaction](api-references/caver.klay/transaction.md#sendsignedtransaction) 또는 [caver.klay.sendTransaction](api-references/caver.klay/transaction.md#sendtransaction)을 통해 트랜잭션을 전송할 때 프로미스(promise)나 이벤트 에미터(event emitter)를 사용하여 트랜잭션의 영수증을 받아올 수 있습니다.

다음 예시는 프로미스(promise) 및 이벤트 에미터(event emitter)를 사용하여 영수증을 받는 과정입니다.

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

// 이벤트 에미터(event emitter) 사용
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

위 예시와 같이 프로미스(promise)와 이벤트 에미터(event emitter)를 통해 트랜잭션을 전송한 결과를 가져올 수 있습니다. 또한 트랜잭션의 해시값을 알고 있다면 [caver.klay.getTransactionReceipt](api-references/caver.klay/transaction.md#gettransactionreceipt) RPC 호출을 하여 트랜잭션 영수증을 요청할 수도 있습니다. 아래 예시는 [caver.klay.getTransactionReceipt](api-references/caver.klay/transaction.md#gettransactionreceipt) RPC 호출을 사용하여 영수증을 받는 방법을 보여줍니다.

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

트랜잭션의 실행 결과는 영수증의 상태를 통하여 확인할 수 있습니다. 리턴값에 대한 자세한 설명은 [getTransactionReceipt](api-references/caver.klay/transaction.md#gettransactionreceipt)를 참조하세요. 만약 트랜잭션 실행이 실패한다면 에러에 대한 내용은 영수증의 `txError`에서 확인할 수 있습니다. `txError`에 대한 자세한 설명은 [txError: Detailed Information of Transaction Failures](../../json-rpc/transaction-error-codes.md)를 참고하세요.

## 다른 트랜잭션 타입 실행하기 <a id="executing-other-transaction-types"></a>

Klaytn은 확장성과 성능을 위한 다양한 트랜잭션 타입을 제공합니다. 자세한 내용은 [Transactions](https://docs.klaytn.com/klaytn/design/transactions)을 참고하세요. 이 장에서는 caver-js와 함께 사용할 수 있는 다양한 예시를 설명합니다.

### 트랜잭션 비용 위임

Klaytn은 [트랜잭션 비용 위임](../../../klaytn/design/transactions/README.md#fee-delegation) 기능을 제공합니다. 예제 코드는 다음과 같습니다.

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

서명된 RLP 인코딩된 트랜잭션 객체 \(`rawTransaction`\)으로 트랜잭션 비용 지불자는 서명을 첨부한 후 트랜잭션을 보낼 수 있습니다. 트랜잭션 비용 지불자는 senderRawTransaction에 `rawTransaction`를 설정하고 아래 예시와 같이 트랜잭션 비용 지불자의 주소로 서명합니다.

```text
// 아직 caver-js 지갑에 트랜잭션 비용 지불자의 계정을 추가하지 않았다면, 'caver.klay.accounts.wallet.add'를 실행하여 지갑에 계정을 추가하세요.
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

**참고**: 트랜잭션 비용 지불자의 계정은 caver-js 지갑에 있어야 합니다.

### 계정 업데이트

계정의 키를 변경하려면 아래와 같은 트랜잭션을 보내세요. 키 타입에 따른 트랜잭션 필드에 대한 [계정 업데이트](api-references/caver.klay/sendtx_account_update.md)를 확인하세요.

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

### 스마트 컨트랙트

[caver.klay.Contract](api-references/caver.klay.Contract.md) 패키지를 사용하면 Klaytn의 스마트 컨트랙트와 쉽게 상호작용할 수 있습니다. 저수준 ABI\(Application Binary Interface\)가 주어지면 스마트 컨트랙트의 모든 메소드를 자동으로 자바스크립트 호출로 변환합니다. 이를 통해 스마트 컨트랙트가 마치 자바스크립트 객체인 것처럼 스마트 컨트랙트와 상호작용할 수 있습니다.

먼저 스마트 컨트랙트를 컴파일하여 바이트코드와 ABI를 얻습니다.

```text
> solc --abi --bin --allow-paths . ./test.sol
======= ./test.sol:Count =======
Binary: 
60806040526000805534801561001457600080fd5b50610123806100246000396000f3fe6080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60df565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260e5565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060dd6004803603602081101560c857600080fd5b810190808035906020019092919050505060ed565b005b60005481565b600043905090565b806000819055505056fea165627a7a72305820e381897039d8e48bf74b4a096bb1c4ed02f331bd1a7a4add6217b72fa888f2f10029
Contract JSON ABI 
[{"constant":true,"inputs":[],"name":"count","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBlockNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_count","type":"uint256"}],"name":"setCount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```

**참고**: 스마트 컨트랙트를 작성하려면 솔리디티 컴파일러가 설치되어 있어야 합니다.

스마트 컨트랙트 배포에 [caver.klay.Contract](api-references/caver.klay.Contract.md)를 사용하거나, [SMART_CONTRACT_DEPLOY](api-references/caver.klay/sendtx_smart_contract_deploy.md) 트랜잭션을 사용하여 배포할 수 있습니다. 다음은 [caver.klay.Contract](api-references/caver.klay.Contract.md)를 사용하는 예시입니다.

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

스마트 컨트랙트의 특정 메소드를 호출하는 한 가지 방법은 `caver.klay.Contract`를 사용하거나 [SMART_CONTRACT_EXECUTION](api-references/caver.klay/sendtx_smart_contract_execution.md)를 사용하는 것입니다.

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

자세한 내용은 [caver.klay.Contract](api-references/caver.klay.Contract.md)를 참조하세요.

## 샘플 프로젝트 <a id="sample-projects"></a>

caver-js를 사용한 BApp \(Blockchain Application\) 개발 샘플 프로젝트는 다음과 같습니다:

* [Count BApp 개발하기](../../tutorials/count-bapp/README.md)
* [Klaystagram](../../tutorials/klaystagram/README.md)

## 링크 <a id="links"></a>

* caver-js [깃허브 레포지토리](https://github.com/klaytn/caver-js)
* caver-js on [npm](https://www.npmjs.com/package/caver-js)


