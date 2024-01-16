# 스마트 컨트랙트 배포

## sendTransaction (SMART_CONTRACT_DEPLOY) <a id="sendtransaction-smart_contract_deploy"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```

[스마트 컨트랙트 배포](../../../../../../learn/transactions/basic.md#txtypesmartcontractdeploy) 트랜잭션을 네트워크에 전송합니다.

**매개변수**

sendTransaction의 매개 변수는 트랜잭션 객체와 콜백 함수입니다.

| 이름                | 유형       | 설명                                                                                  |
| ----------------- | -------- | ----------------------------------------------------------------------------------- |
| transactionObject | Object   | 전송할 트랜잭션 오브젝트입니다.                                                                   |
| callback          | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개 변수로 오류 개체를 반환하고 두 번째 매개 변수로 결과를 반환합니다. |

`SMART_CONTRACT_DEPLOY` 타입의 트랜잭션 객체는 다음과 같은 구조를 가집니다:

| 이름         | 유형                                  | 설명                                                                                                                                                                                                                                                                                                                                                                    |
| ---------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | String                              | 트랜잭션 유형. "SMART_CONTRACT_DEPLOY"                                                                                                                                                                                                                                                                                            |
| from       | String                              | 이 트랜잭션 발신자의 주소입니다.                                                                                                                                                                                                                                                                                                                                                    |
| gas        | Number                              | 트랜잭션에 지불할 최대 가스 금액(미사용 가스는 환불됨).                                                                                                                                                                                                                                                                                                                   |
| gasPrice   | Number                              | (선택 사항) 발신자가 제공한 가스 가격(peb 단위). 가스 가격은 Klaytn 노드에 설정된 단위가격과 동일해야 합니다.                                                                                                                                                                                                                                                           |
| nonce      | Number                              | (선택 사항) nonce의 정수입니다. 생략할 경우, caver-js가 `caver.klay.getTransactionCount`를 호출하여 설정합니다.                                                                                                                                                                                                                                                              |
| data       | String                              | 배포할 스마트 컨트랙트의 바이트코드입니다. 스마트 컨트랙트 생성자에 인자를 전달해야 하는 경우, '컴파일된 바이트 코드 + 인자' 형식으로 데이터를 설정해야 합니다. 컴파일된 바이트코드가 '0x123 ... 321'이고 생성자에 1을 전달해야 하는 경우 '0x123 ... 321' + '00000000000000000000000000000000000000000000000000000000000001'를 설정해야 합니다. [caver.klay.abi.encodeContractDeploy](../../caver.klay.abi.md#encodecontractdeploy)를 사용하여 매개변수와 함께 바이트 코드의 인코딩된 값을 가져옵니다. |
| value      | number \| string \| BN \| BigNumber | 이 배포를 통해 컨트랙트로 전송될 값입니다. 밸류 전송을 수락하려면 컨트랙트 생성자가 '지불 가능'이어야 합니다. 컨트랙트 생성자가 지불 가능하지 않은 경우, 값은 0이어야 합니다.                                                                                                                                                                                                                                                                 |
| codeFormat | String                              | (선택 사항, 기본값: `"EVM"`) 스마트 컨트랙트의 코드 형식입니다.                                                                                                                                                                                                                                                                                                          |

**리턴 값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스 결합 이벤트 이미터입니다. 트랜잭션 영수증을 사용할 수 있을 때 해결됩니다. 추가로 다음과 같은 이벤트를 사용할 수 있습니다:

- `"transactionHash"`는 `String`을 반환합니다: 트랜잭션이 전송되고 트랜잭션 해시를 사용할 수 있는 직후에 발생합니다.
- `"receipt"`는 `Object`를 반환합니다: 트랜잭션 영수증을 사용할 수 있을 때 발생합니다.
- `"error"`는 `Error`를 반환합니다: 전송 중 에러가 발생하면 발생합니다. 가스 부족 오류에서 두 번째 매개 변수는 영수증입니다.

**예시**

```javascript
const account = caver.klay.accounts.wallet.add('0x{private key}')

// Case 1: Deploying smart contract

// using the promise
caver.klay.sendTransaction({
    type: 'SMART_CONTRACT_DEPLOY',
    from: account.address,
    data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: '300000',
    value: '0x174876e800',
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    type: 'SMART_CONTRACT_DEPLOY',
    from: account.address,
    data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: '300000',
    value: '0x174876e800',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.


// Case 2: Deploying smart contract with constructor arguments (using caver.klay.abi.encodeContractDeploy).

// using the promise
caver.klay.sendTransaction({
    type: 'SMART_CONTRACT_DEPLOY',
    from: account.address,
    data: caver.klay.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" }, { "name": "_b", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee0029', 1, 2),
    gas: '300000',
    value: 0,
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    type: 'SMART_CONTRACT_DEPLOY',
    from: account.address,
    data: caver.klay.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" }, { "name": "_b", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee0029', 1, 2),
    gas: '300000',
    value: 0,
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```

## sendTransaction (FEE_DELEGATED_SMART_CONTRACT_DEPLOY) <a id="sendtransaction-fee_delegated_smart_contract_deploy"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```

[수수료 위임 스마트 컨트랙트 배포](../../../../../../learn/transactions/fee-delegation.md#txtypefeedelegatedsmartcontractdeploy) 트랜잭션을 네트워크에 전송합니다.

**매개변수**

sendTransaction의 매개 변수는 트랜잭션 객체와 콜백 함수입니다.

| 이름                | 유형       | 설명                                                                                  |
| ----------------- | -------- | ----------------------------------------------------------------------------------- |
| transactionObject | Object   | 전송할 트랜잭션 오브젝트입니다.                                                                   |
| callback          | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개 변수로 오류 개체를 반환하고 두 번째 매개 변수로 결과를 반환합니다. |

`FEE_DELEGATED_SMART_CONTRACT_DEPLOY` 타입의 트랜잭션 객체는 다음과 같은 구조를 가집니다:

| 이름         | 유형                                  | 설명                                                                                                                                                                                                                                                                                                                                                                    |
| ---------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | String                              | 트랜잭션 유형. "FEE_DELEGATED_SMART_CONTRACT_DEPLOY"                                                                                                                                                                                                                                    |
| from       | String                              | 이 트랜잭션 발신자의 주소입니다.                                                                                                                                                                                                                                                                                                                                                    |
| gas        | Number                              | 트랜잭션에 대해 지불할 최대 가스 금액(미사용 가스는 환불됨).                                                                                                                                                                                                                                                                                                                |
| gasPrice   | Number                              | (선택 사항) 발신자가 제공한 가스 가격(peb 단위). 가스 가격은 Klaytn 노드에 설정된 단위가격과 동일해야 합니다.                                                                                                                                                                                                                                                           |
| nonce      | Number                              | (선택 사항) nonce의 정수입니다. 생략할 경우, caver-js가 `caver.klay.getTransactionCount`를 호출하여 설정합니다.                                                                                                                                                                                                                                                              |
| data       | String                              | 배포할 스마트 컨트랙트의 바이트코드입니다. 스마트 컨트랙트 생성자에 인자를 전달해야 하는 경우, '컴파일된 바이트 코드 + 인자' 형식으로 데이터를 설정해야 합니다. 컴파일된 바이트코드가 '0x123 ... 321'이고 생성자에 1을 전달해야 하는 경우 '0x123 ... 321' + '00000000000000000000000000000000000000000000000000000000000001'를 설정해야 합니다. [caver.klay.abi.encodeContractDeploy](../../caver.klay.abi.md#encodecontractdeploy)를 사용하여 매개변수와 함께 바이트 코드의 인코딩된 값을 가져옵니다. |
| value      | number \| string \| BN \| BigNumber | 이 배포를 통해 컨트랙트로 전송될 값입니다. 밸류 전송을 수락하려면 컨트랙트 생성자가 '지불 가능'이어야 합니다. 컨트랙트 생성자가 지불 가능하지 않은 경우, 값은 0이어야 합니다.                                                                                                                                                                                                                                                                 |
| codeFormat | String                              | (선택 사항, 기본값: `"EVM"`) 스마트 컨트랙트의 코드 형식입니다.                                                                                                                                                                                                                                                                                                          |

위와 같은 구조의 `FEE_DELEGATED_SMART_CONTRACT_DEPLOY` 타입의 트랜잭션 오브젝트 또는 `FEE_DELEGATED_SMART_CONTRACT_DEPLOY` 타입의 `RLP 인코딩된 트랜잭션`을 발신자의 경우 [caver.klay.accounts.signTransaction](../../caver.klay.accounts.md#signtransaction)에, 수수료 납부자의 경우 [caver.klay.accounts.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction)에서 매개변수로 사용할 수 있습니다.

수수료 납부자가 발신자가 서명한 RLP 인코딩 트랜잭션에 서명하고 네트워크에 전송하려면 다음 구조의 객체를 정의하고 `caver.klay.sendTransaction`을 호출합니다.

| 이름                   | 유형     | 설명                         |
| -------------------- | ------ | -------------------------- |
| feePayer             | String | 트랜잭션의 수수료 납부자 주소입니다.       |
| senderRawTransaction | String | 발신자가 서명한 RLP 인코딩된 트랜잭션입니다. |

**리턴 값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스 결합 이벤트 이미터입니다. 트랜잭션 영수증을 사용할 수 있을 때 해결됩니다. 추가로 다음과 같은 이벤트를 사용할 수 있습니다:

- `"transactionHash"`는 `String`을 반환합니다: 트랜잭션이 전송되고 트랜잭션 해시를 사용할 수 있는 직후에 발생합니다.
- `"receipt"`는 `Object`를 반환합니다: 트랜잭션 영수증을 사용할 수 있을 때 발생합니다.
- `"error"`는 `Error`를 반환합니다: 전송 중 에러가 발생하면 발생합니다. 가스 부족 오류에서 두 번째 매개 변수는 영수증입니다.

**예시**

```javascript
const sender = caver.klay.accounts.wallet.add('0x{private key}')
const feePayer = caver.klay.accounts.wallet.add('0x{private key}')

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY',
  from: sender.address,
  data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
  gas:  '300000',
  value: caver.utils.toPeb('1', `klay`),
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.then(function(receipt){
    ...
});

// using the event emitter
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY',
  from: sender.address,
  data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
  gas:  '300000',
  value: caver.utils.toPeb('1', `klay`),
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

// Deploying smart contract with constructor arguments (using caver.klay.abi.encodeContractDeploy).

const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY',
  from: sender.address,
  data: caver.klay.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" }, { "name": "_b", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee0029', 1, 2),
  gas:  '300000',
  value: 0,
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.then(function(receipt){
    ...
});
```

## sendTransaction (FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO) <a id="sendtransaction-fee_delegated_smart_contract_deploy_with_ratio"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```

[비율에 따른 수수료 위임 스마트 컨트랙트 배포](../../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractdeploywithratio) 트랜잭션을 네트워크에 전송합니다.

**매개변수**

sendTransaction의 매개 변수는 트랜잭션 객체와 콜백 함수입니다.

| 이름                | 유형       | 설명                                                                                  |
| ----------------- | -------- | ----------------------------------------------------------------------------------- |
| transactionObject | Object   | 전송할 트랜잭션 오브젝트입니다.                                                                   |
| callback          | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개 변수로 오류 개체를 반환하고 두 번째 매개 변수로 결과를 반환합니다. |

`FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO` 타입의 트랜잭션 객체는 다음과 같은 구조를 가집니다:

| 이름         | 유형                                  | 설명                                                                                                                                                                                                                                                                                                                                                                    |
| ---------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | String                              | 트랜잭션 유형. "FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO"                                                                                                                                                                               |
| from       | String                              | 이 트랜잭션 발신자의 주소입니다.                                                                                                                                                                                                                                                                                                                                                    |
| gas        | Number                              | 트랜잭션에 대해 지불할 최대 가스 금액(미사용 가스는 환불됨).                                                                                                                                                                                                                                                                                                                |
| gasPrice   | Number                              | (선택 사항) 발신자가 제공한 가스 가격(peb 단위). 가스 가격은 Klaytn 노드에 설정된 단위가격과 동일해야 합니다.                                                                                                                                                                                                                                                           |
| nonce      | Number                              | (선택 사항) nonce의 정수입니다. 생략할 경우, caver-js가 `caver.klay.getTransactionCount`를 호출하여 설정합니다.                                                                                                                                                                                                                                                              |
| data       | String                              | 배포할 스마트 컨트랙트의 바이트코드입니다. 스마트 컨트랙트 생성자에 인자를 전달해야 하는 경우, '컴파일된 바이트 코드 + 인자' 형식으로 데이터를 설정해야 합니다. 컴파일된 바이트코드가 '0x123 ... 321'이고 생성자에 1을 전달해야 하는 경우 '0x123 ... 321' + '00000000000000000000000000000000000000000000000000000000000001'를 설정해야 합니다. [caver.klay.abi.encodeContractDeploy](../../caver.klay.abi.md#encodecontractdeploy)를 사용하여 매개변수와 함께 바이트 코드의 인코딩된 값을 가져옵니다. |
| value      | number \| string \| BN \| BigNumber | 이 배포를 통해 컨트랙트로 전송될 값입니다. 밸류 전송을 수락하려면 컨트랙트 생성자가 '지불 가능'이어야 합니다. 컨트랙트 생성자가 지불 가능하지 않은 경우, 값은 0이어야 합니다.                                                                                                                                                                                                                                                                 |
| codeFormat | String                              | (선택 사항, 기본값: `"EVM"`) 스마트 컨트랙트의 코드 형식입니다.                                                                                                                                                                                                                                                                                                          |
| feeRatio   | Number                              | 수수료 납부자의 수수료 비율입니다. 30이면 수수료의 30%는 수수료 지불자가 지불합니다. 70이면 70%는 발신자가 지불합니다. 수수료 비율의 범위는 1 \~ 99이며, 범위를 벗어나면 트랜잭션이 승인되지 않습니다.                                                                                                                                                                                                                                             |

위와 같은 구조의 `FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO` 타입의 트랜잭션 오브젝트 또는 `FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO` 타입의 `RLP 인코딩된 트랜잭션`을 발신자의 경우 [caver.klay.accounts.signTransaction](../../caver.klay.accounts.md#signtransaction)에서, 수수료 납부자의 경우 [caver.klay.accounts.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction)에서 매개변수로 사용할 수 있습니다.

수수료 납부자가 발신자가 서명한 RLP 인코딩 트랜잭션에 서명하고 네트워크에 전송하려면 다음 구조의 객체를 정의하고 `caver.klay.sendTransaction`을 호출합니다.

| 이름                   | 유형     | 설명                         |
| -------------------- | ------ | -------------------------- |
| feePayer             | String | 트랜잭션의 수수료 납부자 주소입니다.       |
| senderRawTransaction | String | 발신자가 서명한 RLP 인코딩된 트랜잭션입니다. |

**리턴 값**

`callback`은 32바이트 트랜잭션 해시를 반환합니다.

`PromiEvent`: 프로미스 결합 이벤트 이미터입니다. 트랜잭션 영수증을 사용할 수 있을 때 해결됩니다. 추가로 다음과 같은 이벤트를 사용할 수 있습니다:

- `"transactionHash"`는 `String`을 반환합니다: 트랜잭션이 전송되고 트랜잭션 해시를 사용할 수 있는 직후에 발생합니다.
- `"receipt"`는 `Object`를 반환합니다: 트랜잭션 영수증을 사용할 수 있을 때 발생합니다.
- `"error"`는 `Error`를 반환합니다: 전송 중 에러가 발생하면 발생합니다. 가스 부족 오류에서 두 번째 매개 변수는 영수증입니다.

**예시**

```javascript
const sender = caver.klay.accounts.wallet.add('0x{private key}')
const feePayer = caver.klay.accounts.wallet.add('0x{private key}')

// using the promise
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO',
  from: sender.address,
  data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
  gas:  '300000',
  value: caver.utils.toPeb('1', `klay`),
  feeRatio: 30,
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.then(function(receipt){
    ...
});

// using the event emitter
const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO',
  from: sender.address,
  data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
  gas:  '300000',
  value: caver.utils.toPeb('1', `klay`),
  feeRatio: 30,
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

// Deploying smart contract with constructor arguments (using caver.klay.abi.encodeContractDeploy).

const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO',
  from: sender.address,
  data: caver.klay.abi.encodeContractDeploy([
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" },
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" },
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" },
        { "inputs": [ { "name": "_a", "type": "uint256" }, { "name": "_b", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }
    ],'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee0029', 1, 2),
  gas:  '300000',
  value: 0,
  feeRatio: 30,
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.then(function(receipt){
    ...
});
```
