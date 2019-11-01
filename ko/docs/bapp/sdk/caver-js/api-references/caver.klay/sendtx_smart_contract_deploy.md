# Smart Contract Deploy Transaction

## sendTransaction (SMART_CONTRACT_DEPLOY)

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Smart Contract Deploy](../../../../../klaytn/design/transactions/basic.md#txtypesmartcontractdeploy) transaction to the network.

**매개변수**

| 명칭                           | Type                                            | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject            | 객체                                              | The transaction object to send.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| transactionObject.type       | 문자열                                             | The type of "SMART_CONTRACT_DEPLOY" transaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| transactionObject.from       | 문자열                                             | The address of the sender.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| transactionObject.gas        | Number                                          | The amount of gas to use for the transaction (unused gas is refunded).                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| transactionObject.gasPrice   | Number                                          | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| transactionObject.nonce      | Number                                          | (선택사항) nonce의 정숫값입니다. 이를 통해 같은 nonce를 사용하는 보류 중인 트랜잭션을 덮어쓸 수 있습니다. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`.                                                                                                                                                                                                                                                                                                                                                                                            |
| transactionObject.data       | 문자열                                             | 배포할 스마트 컨트랙트의 바이트코드. If you need to pass an argument to the constructor of a smart contract, you must set to data in the form of compiled byte code + arguments. If the compiled bytecode is '0x123 ... 321', if you need to pass 1 to the constructor, you must pass '0x123 ... 321' + '00000000000000000000000000000000000000000000000000000000000001' to data in this form. Use [caver.klay.abi.encodeContractDeploy](../caver.klay.abi.md#encodeContractDeploy) to get the byte code and parameter values of the constructor encoded together. |
| transactionObject.value      | Number &#124; String &#124; BN &#124; BigNumber | The value transferred for transaction. If contract's modifier is not payable, value must be zero.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| transactionObject.codeFormat | 문자열                                             | (optional, default: `"EVM"`) The code format of smart contract code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| callback                     | Function                                        | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

**리턴값**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: 프로미스(promise)가 조합된 이벤트 에미터(event emitter). Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.


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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.
```


## sendTransaction (FEE_DELEGATED_SMART_CONTRACT_DEPLOY)

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Fee Delegated Smart Contract Deploy](../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedsmartcontractdeploy) transaction to the network.

**매개변수**

| 명칭                                     | Type                                            | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject                      | 객체                                              | The transaction object to send.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| transactionObject.type                 | 문자열                                             | The type of "FEE_DELEGATED_SMART_CONTRACT_DEPLOY" transaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| transactionObject.from                 | 문자열                                             | The address of the sender.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| transactionObject.gas                  | Number                                          | The amount of gas to use for the transaction (unused gas is refunded).                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| transactionObject.gasPrice             | Number                                          | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| transactionObject.nonce                | Number                                          | (선택사항) nonce의 정숫값입니다. 이를 통해 같은 nonce를 사용하는 보류 중인 트랜잭션을 덮어쓸 수 있습니다. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`.                                                                                                                                                                                                                                                                                                                                                                                            |
| transactionObject.data                 | 문자열                                             | 배포할 스마트 컨트랙트의 바이트코드. If you need to pass an argument to the constructor of a smart contract, you must set to data in the form of compiled byte code + arguments. If the compiled bytecode is '0x123 ... 321', if you need to pass 1 to the constructor, you must pass '0x123 ... 321' + '00000000000000000000000000000000000000000000000000000000000001' to data in this form. Use [caver.klay.abi.encodeContractDeploy](../caver.klay.abi.md#encodeContractDeploy) to get the byte code and parameter values of the constructor encoded together. |
| transactionObject.value                | Number &#124; String &#124; BN &#124; BigNumber | The value transferred for transaction. If contract's modifier is not payable, value must be zero.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| transactionObject.codeFormat           | 문자열                                             | (optional, default: `"EVM"`) The code format of smart contract code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| transactionObject.feePayer             | 문자열                                             | (for fee payer) The fee payer address of the transaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| transactionObject.senderRawTransaction | 문자열                                             | (for fee payer) The raw transaction of a sender.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| callback                               | Function                                        | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

**리턴값**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: 프로미스(promise)가 조합된 이벤트 에미터(event emitter). Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

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
  value: caver.utils.toPeb('1', 'KLAY'),
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
  value: caver.utils.toPeb('1', 'KLAY'),
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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

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

## sendTransaction (FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO)

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a [Fee Delegated Smart Contract Deploy With Ratio](../../../../../klaytn/design/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractdeploywithratio) transaction to the network.

**매개변수**

| 명칭                                     | Type                                            | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject                      | 객체                                              | The transaction object to send.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| transactionObject.type                 | 문자열                                             | The type of "FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO" transaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| transactionObject.from                 | 문자열                                             | The address of the sender.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| transactionObject.gas                  | Number                                          | The amount of gas to use for the transaction (unused gas is refunded).                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| transactionObject.gasPrice             | Number                                          | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| transactionObject.nonce                | Number                                          | (선택사항) nonce의 정숫값입니다. 이를 통해 같은 nonce를 사용하는 보류 중인 트랜잭션을 덮어쓸 수 있습니다. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`.                                                                                                                                                                                                                                                                                                                                                                                            |
| transactionObject.data                 | 문자열                                             | 배포할 스마트 컨트랙트의 바이트코드. If you need to pass an argument to the constructor of a smart contract, you must set to data in the form of compiled byte code + arguments. If the compiled bytecode is '0x123 ... 321', if you need to pass 1 to the constructor, you must pass '0x123 ... 321' + '00000000000000000000000000000000000000000000000000000000000001' to data in this form. Use [caver.klay.abi.encodeContractDeploy](../caver.klay.abi.md#encodeContractDeploy) to get the byte code and parameter values of the constructor encoded together. |
| transactionObject.value                | Number &#124; String &#124; BN &#124; BigNumber | The value transferred for transaction. If contract's modifier is not payable, value must be zero.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| transactionObject.codeFormat           | 문자열                                             | (optional, default: `"EVM"`) The code format of smart contract code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| transactionObject.feeRatio             | Number                                          | Fee ratio of the fee payer. 이 값이 30이면, 트랜잭션 비용의 30%를 트랜잭션 비용 납부자가 지불합니다. 나머지 70%는 트랜잭션 발신자가 지불합니다. The range of fee ratio is 1 ~ 99, if it is out of range, the transaction will not be accepted.                                                                                                                                                                                                                                                                                                                                                  |
| transactionObject.feePayer             | 문자열                                             | (for fee payer) The fee payer address of the transaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| transactionObject.senderRawTransaction | 문자열                                             | (for fee payer) The raw transaction of a sender.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| callback                               | Function                                        | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

**리턴값**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: 프로미스(promise)가 조합된 이벤트 에미터(event emitter). Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

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
  value: caver.utils.toPeb('1', 'KLAY'),
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
  value: caver.utils.toPeb('1', 'KLAY'),
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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

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


