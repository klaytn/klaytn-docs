# 스마트 컨트랙트 배포 트랜잭션<a id="smart-contract-deploy-transaction"></a>

## sendTransaction (SMART_CONTRACT_DEPLOY) <a id="sendtransaction-smart_contract_deploy"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
[Smart Contract Deploy](../../../../../../klaytn/design/transactions/basic.md#txtypesmartcontractdeploy) 트랜잭션을 네트워크에 전송합니다.

**Parameters**

The parameters of sendTransaction are a transaction object and a callback function.

| Name              | Type     | Description                                                                                                |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transactionObject | Object   | The transaction object to send.                                                                            |
| callback          | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

` SMART_CONTRACT_DEPLOY`  트랜잭션 오브젝트 구조는 다음과 같습니다.

| Name       | Type                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | String                                          | Transaction Type. "SMART_CONTRACT_DEPLOY"                                                                                                                                                                                                                                                                                                                                                                                               |
| from       | String                                          | Address of this transaction sender.                                                                                                                                                                                                                                                                                                                                                                                                       |
| gas        | Number                                          | The maximum amount of gas willing to pay for the transaction (unused gas is refunded).                                                                                                                                                                                                                                                                                                                                                    |
| gasPrice   | Number                                          | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                                                                                                                                                                                                                                                                |
| nonce      | Number                                          | (optional) Integer of a nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`.                                                                                                                                                                                                                                                                                                                       |
| data       | String                                          | A bytecode of smart contract to be deployed. 스마트 컨트랙트의 생성자에 인수를 전달해야하는 경우 "컴파일 된 바이트 코드 + 인수" 형식으로 데이터를 설정해야합니다. If the compiled bytecode is '0x123 ... 321' and you need to pass 1 to the constructor, you must set '0x123 ... 321' + '00000000000000000000000000000000000000000000000000000000000001'. [ caver.klay.abi.encodeContractDeploy](../caver.klay.abi.md#encodecontractdeploy) 를 사용하여, 매개 변수를 포함한, 인코딩 된 바이트코드 값을 가져올 수 있습니다. |
| value      | Number &#124; String &#124; BN &#124; BigNumber | 배포와 함께, 컨트랙트로 전송될 값. value 가 전송되기 위해서, 컨트랙트의 생성자는 반드시 'payable' 이어야 합니다. 생성자가 'payable' 이 아닌경우, value는 항상 0  입니다.                                                                                                                                                                                                                                                                                                                         |
| codeFormat | String                                          | (선택 사항, 기본값은: `"EVM"`) 스마트 컨트랙트의 코드 포맷입니다.                                                                                                                                                                                                                                                                                                                                                                                                |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

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


// 사례 2 : 생성자 인수를 사용하여 스마트 컨트랙트 배포 (caver.klay.abi.encodeContractDeploy 사용)

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
[Fee Delegated Smart Contract Deploy](../../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedsmartcontractdeploy) 트랜잭션을 네트워크에 전송합니다.

**Parameters**

The parameters of sendTransaction are a transaction object and a callback function.

| Name              | Type     | Description                                                                                                |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transactionObject | Object   | The transaction object to send.                                                                            |
| callback          | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

` FEE_DELEGATED_SMART_CONTRACT_DEPLOY`  트랜잭션 오브젝트 구조는 다음과 같습니다.

| Name       | Type                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | String                                          | Transaction Type. "FEE_DELEGATED_SMART_CONTRACT_DEPLOY"                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| from       | String                                          | Address of this transaction sender.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| gas        | Number                                          | The maximum amount of gas willing to pay for the transaction (unused gas is refunded).                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| gasPrice   | Number                                          | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                                                                                                                                                                                                                                                                                                                                                              |
| nonce      | Number                                          | (optional) Integer of a nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| data       | String                                          | A bytecode of smart contract to be deployed. If you need to pass an argument to the constructor of the smart contract, you must set data in the format of "compiled byte code + arguments". If the compiled bytecode is '0x123 ... 321' and you need to pass 1 to the constructor, you must set '0x123 ... 321' + '00000000000000000000000000000000000000000000000000000000000001'. Use [caver.klay.abi.encodeContractDeploy](../caver.klay.abi.md#encodecontractdeploy) to get the encoded value of the byte code with the parameters. |
| value      | Number &#124; String &#124; BN &#124; BigNumber | The value that will be transferred to the contract with this deployment. To accept the value transfer, the contract constructor must be 'payable'. If the contract constructor is not payable, value must be zero.                                                                                                                                                                                                                                                                                                                      |
| codeFormat | String                                          | (optional, default: `"EVM"`) The code format of smart contract.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

위의 구조를 가진 `FEE_DELEGATED_SMART_CONTRACT_DEPLOY` 유형의 트랜잭션 오브젝트, 또는  `FEE_DELEGATED_SMART_CONTRACT_DEPLOY` 유형의 `RLP 인코딩된 트랜잭션`은 트랜잭션 발신자의 경우 [caver.klay.accounts.signTransaction](../caver.klay.accounts.md#signtransaction)의 매개 변수로, 수수료 납부자의 경우 [ caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction)의 매개 변수로 사용할 수 있습니다.

In order for the fee payer to sign an RLP encoded transaction signed by the sender and send it to the network, define an object with the following structure and call `caver.klay.sendTransaction`.

| Name                 | Type   | Description                                   |
| -------------------- | ------ | --------------------------------------------- |
| feePayer             | String | The fee payer address of the transaction.     |
| senderRawTransaction | String | The RLP-encoded transaction signed by sender. |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

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
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.

// 생성자에 arguments를 전달하며, 스마트 컨트랙트를 배포합니다 (caver.klay.abi.encodeContractDeploy 사용).

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
[Fee Delegated Smart Contract Deploy With Ratio](../../../../../../klaytn/design/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractdeploywithratio) 트랜잭션을 네트워크에 전송합니다.

**Parameters**

The parameters of sendTransaction are a transaction object and a callback function.

| Name              | Type     | Description                                                                                                |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transactionObject | Object   | The transaction object to send.                                                                            |
| callback          | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

` FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO`  트랜잭션 오브젝트 구조는 다음과 같습니다.

| Name       | Type                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | String                                          | Transaction Type. "FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO"                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| from       | String                                          | Address of this transaction sender.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| gas        | Number                                          | The maximum amount of gas willing to pay for the transaction (unused gas is refunded).                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| gasPrice   | Number                                          | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                                                                                                                                                                                                                                                                                                                                                              |
| nonce      | Number                                          | (optional) Integer of a nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| data       | String                                          | A bytecode of smart contract to be deployed. If you need to pass an argument to the constructor of the smart contract, you must set data in the format of "compiled byte code + arguments". If the compiled bytecode is '0x123 ... 321' and you need to pass 1 to the constructor, you must set '0x123 ... 321' + '00000000000000000000000000000000000000000000000000000000000001'. Use [caver.klay.abi.encodeContractDeploy](../caver.klay.abi.md#encodecontractdeploy) to get the encoded value of the byte code with the parameters. |
| value      | Number &#124; String &#124; BN &#124; BigNumber | The value that will be transferred to the contract with this deployment. To accept the value transfer, the contract constructor must be 'payable'. If the contract constructor is not payable, value must be zero.                                                                                                                                                                                                                                                                                                                      |
| codeFormat | String                                          | (optional, default: `"EVM"`) The code format of smart contract.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| feeRatio   | Number                                          | Fee ratio of the fee payer. If it is 30, 30% of the fee will be paid by the fee payer. 70% will be paid by the sender. The range of fee ratio is 1 ~ 99, if it is out of range, the transaction will not be accepted.                                                                                                                                                                                                                                                                                                                   |

위의 구조를 가진 `FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO` 유형의 트랜잭션 오브젝트, 또는  `FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO` 유형의 `RLP 인코딩된 트랜잭션`은 트랜잭션 발신자의 경우 [caver.klay.accounts.signTransaction](../caver.klay.accounts.md#signtransaction)의 매개 변수로, 수수료 납부자의 경우 [ caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction)의 매개 변수로 사용할 수 있습니다.

In order for the fee payer to sign an RLP encoded transaction signed by the sender and send it to the network, define an object with the following structure and call `caver.klay.sendTransaction`.

| Name                 | Type   | Description                                   |
| -------------------- | ------ | --------------------------------------------- |
| feePayer             | String | The fee payer address of the transaction.     |
| senderRawTransaction | String | The RLP-encoded transaction signed by sender. |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

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


