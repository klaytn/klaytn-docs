# スマートコントラクト展開取引 <a id="smart-contract-deploy-transaction"></a>

## sendTransaction (SMART_CONTRACT_DEPLOY) <a id="sendtransaction-smart_contract_deploy"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
ネットワークに [スマートコントラクトデプロイ](../../../../../../klaytn/design/transactions/basic.md#txtypesmartcontractdeploy) トランザクションを送信します。

**パラメータ**

sendTransaction のパラメータはトランザクションオブジェクトとコールバック関数です。

| 名前                | タイプ    | Description                                                        |
| ----------------- | ------ | ------------------------------------------------------------------ |
| transactionObject | Object | 送信するトランザクションオブジェクト。                                                |
| callback          | 関数     | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |

種類 `SMART_CONTRACT_DEPLOY` のトランザクションオブジェクトには以下の構造があります:

| 名前         | タイプ                                             | Description                                                                                                                                                                                                                                                                                                                                                         |
| ---------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| タイプ        | 文字列                                             | トランザクションの種類 "MART_CONTRACT_DEPLOY"                                                                                                                                                                                                                                                                                                                                |
| from       | 文字列                                             | このトランザクション送信者のアドレス。                                                                                                                                                                                                                                                                                                                                                 |
| ガス         | Number                                          | 取引に支払うガスの最大額(使用されていないガスは返金されます)。                                                                                                                                                                                                                                                                                                                                    |
| gasPrice   | Number                                          | (オプション) ペブで送信者が提供するガス価格。 gasPriceは、Klaytnノードで設定されているunitPriceと同じである必要があります。                                                                                                                                                                                                                                                                                         |
| nonce      | Number                                          | (オプション) nonce の整数。 省略された場合、 `caver.klay.getTransactionCount` を呼び出すことで caver-js によって設定されます。                                                                                                                                                                                                                                                                          |
| data       | 文字列                                             | デプロイされるスマートコントラクトのバイトコード。 スマートコントラクトのコンストラクタに引数を渡す必要がある場合。 「コンパイル済みバイトコード + 引数」の形式でデータを設定する必要があります。 コンパイルされたバイトコードが '0x123 ... 321' で、コンストラクタに 1 を渡す必要がある場合は、'0x123 ... 321' + '0000000000000000000000000000000000000000000001' を設定する必要があります。 [caver.klay.abi.encodeContractDeploy](../caver.klay.abi.md#encodecontractdeploy) を使用して、パラメータを使用してバイトコードのエンコード値を取得します。 |
| 値          | Number &#124; String &#124; BN &#124; BigNumber | このデプロイメントでコントラクトに転送される値。 値の転送を受け入れるには、コントラクトコンストラクタは 'payable' でなければなりません。 コントラクトコンストラクタが支払われない場合、値はゼロでなければなりません。                                                                                                                                                                                                                                                   |
| codeFormat | 文字列                                             | (オプション、デフォルト: `"EVM"`) スマートコントラクトのコード形式。                                                                                                                                                                                                                                                                                                                            |

**戻り値**

`コールバック` は 32 バイトのトランザクションハッシュを返します。

`PromiEvent`: A promise combined event emitter. 領収書が入手可能な場合には解決されます。 さらに、次のイベントが利用できます:

- `"transactionHash"` returns `String`: トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発行される。
- `"receipt"` は `オブジェクト`: トランザクション受信が可能であるときに発生します。
- `"error"` returns `Error`: 送信中にエラーが発生した場合に発生します。 ガス欠エラーでは、2 番目のパラメータはレシートです。

**例**

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
.on('error', console.error); // ガス漏れの場合、2番目のパラメータはレシートです。


// ケース 2: コンストラクタ引数を使用したスマートコントラクトの導入 (caver.klay.abi.encodeContractDeployを使用)。

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
.on('error', console.error); // ガス漏れの場合、2番目のパラメータはレシートです。
```


## sendTransaction (FEE_DELEGATED_SMART_CONTRACT_DEPLOY) <a id="sendtransaction-fee_delegated_smart_contract_deploy"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
ネットワークに [手数料委託スマートコントラクトデプロイ](../../../../../../klaytn/design/transactions/fee-delegation.md#txtypefeedelegatedsmartcontractdeploy) トランザクションを送信します。

**パラメータ**

sendTransaction のパラメータはトランザクションオブジェクトとコールバック関数です。

| 名前                | タイプ    | Description                                                        |
| ----------------- | ------ | ------------------------------------------------------------------ |
| transactionObject | Object | 送信するトランザクションオブジェクト。                                                |
| callback          | 関数     | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |

タイプ `FEE_DELEGATED_SMART_CONTRACT_DEPLOY` のトランザクションオブジェクト

| 名前         | タイプ                                             | Description                                                                                                                                                                                                                                                                                                                                                         |
| ---------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| タイプ        | 文字列                                             | トランザクションの種類 "FEE_DELEGATED_SMART_CONTRACT_DEPLOY"                                                                                                                                                                                                                                                                                                               |
| from       | 文字列                                             | このトランザクション送信者のアドレス。                                                                                                                                                                                                                                                                                                                                                 |
| ガス         | Number                                          | 取引に支払うガスの最大額(使用されていないガスは返金されます)。                                                                                                                                                                                                                                                                                                                                    |
| gasPrice   | Number                                          | (オプション) ペブで送信者が提供するガス価格。 gasPriceは、Klaytnノードで設定されているunitPriceと同じである必要があります。                                                                                                                                                                                                                                                                                         |
| nonce      | Number                                          | (オプション) nonce の整数。 省略された場合、 `caver.klay.getTransactionCount` を呼び出すことで caver-js によって設定されます。                                                                                                                                                                                                                                                                          |
| data       | 文字列                                             | デプロイされるスマートコントラクトのバイトコード。 スマートコントラクトのコンストラクタに引数を渡す必要がある場合。 「コンパイル済みバイトコード + 引数」の形式でデータを設定する必要があります。 コンパイルされたバイトコードが '0x123 ... 321' で、コンストラクタに 1 を渡す必要がある場合は、'0x123 ... 321' + '0000000000000000000000000000000000000000000001' を設定する必要があります。 [caver.klay.abi.encodeContractDeploy](../caver.klay.abi.md#encodecontractdeploy) を使用して、パラメータを使用してバイトコードのエンコード値を取得します。 |
| 値          | Number &#124; String &#124; BN &#124; BigNumber | このデプロイメントでコントラクトに転送される値。 値の転送を受け入れるには、コントラクトコンストラクタは 'payable' でなければなりません。 コントラクトコンストラクタが支払われない場合、値はゼロでなければなりません。                                                                                                                                                                                                                                                   |
| codeFormat | 文字列                                             | (オプション、デフォルト: `"EVM"`) スマートコントラクトのコード形式。                                                                                                                                                                                                                                                                                                                            |

A transaction object of type `FEE_DELEGATED_SMART_CONTRACT_DEPLOY` with the above structure or an `RLP-encoded transaction` of type `FEE_DELEGATED_SMART_CONTRACT_DEPLOY` can be used as a parameter in [caver.klay.accounts.signTransaction](../caver.klay.accounts.md#signtransaction) for sender and in [caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction) for fee payer.

In order for the fee payer to sign an RLP encoded transaction signed by the sender and send it to the network, define an object with the following structure and call `caver.klay.sendTransaction`.

| 名前                   | タイプ | Description                        |
| -------------------- | --- | ---------------------------------- |
| feePayer             | 文字列 | このトランザクションの手数料支払者アドレス。             |
| senderRawTransaction | 文字列 | 送信者によって署名された RLP エンコードされたトランザクション。 |

**戻り値**

`コールバック` は 32 バイトのトランザクションハッシュを返します。

`PromiEvent`: A promise combined event emitter. 領収書が入手可能な場合には解決されます。 さらに、次のイベントが利用できます:

- `"transactionHash"` returns `String`: トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発行される。
- `"receipt"` は `オブジェクト`: トランザクション受信が可能であるときに発生します。
- `"error"` returns `Error`: 送信中にエラーが発生した場合に発生します。 ガス欠エラーでは、2 番目のパラメータはレシートです。

**例**

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
.on('error', console.error); // ガス漏れの場合、2番目のパラメータはレシートです。

// コンストラクター引数でスマートコントラクトをデプロイする (caver.klay.abi.encodeContractDeploy)。

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
ネットワークに [手数料委託スマートコントラクトを委託する](../../../../../../klaytn/design/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractdeploywithratio) トランザクションを送信する。

**パラメータ**

sendTransaction のパラメータはトランザクションオブジェクトとコールバック関数です。

| 名前                | タイプ    | Description                                                        |
| ----------------- | ------ | ------------------------------------------------------------------ |
| transactionObject | Object | 送信するトランザクションオブジェクト。                                                |
| callback          | 関数     | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |

タイプ `FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO のトランザクションオブジェクト` には以下の構造があります。

| 名前         | タイプ                                             | Description                                                                                                                                                                                                                                                                                                                                                         |
| ---------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| タイプ        | 文字列                                             | トランザクションの種類 "FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO"                                                                                                                                                                                                                                                                                                  |
| from       | 文字列                                             | このトランザクション送信者のアドレス。                                                                                                                                                                                                                                                                                                                                                 |
| ガス         | Number                                          | 取引に支払うガスの最大額(使用されていないガスは返金されます)。                                                                                                                                                                                                                                                                                                                                    |
| gasPrice   | Number                                          | (オプション) ペブで送信者が提供するガス価格。 gasPriceは、Klaytnノードで設定されているunitPriceと同じである必要があります。                                                                                                                                                                                                                                                                                         |
| nonce      | Number                                          | (オプション) nonce の整数。 省略された場合、 `caver.klay.getTransactionCount` を呼び出すことで caver-js によって設定されます。                                                                                                                                                                                                                                                                          |
| data       | 文字列                                             | デプロイされるスマートコントラクトのバイトコード。 スマートコントラクトのコンストラクタに引数を渡す必要がある場合。 「コンパイル済みバイトコード + 引数」の形式でデータを設定する必要があります。 コンパイルされたバイトコードが '0x123 ... 321' で、コンストラクタに 1 を渡す必要がある場合は、'0x123 ... 321' + '0000000000000000000000000000000000000000000001' を設定する必要があります。 [caver.klay.abi.encodeContractDeploy](../caver.klay.abi.md#encodecontractdeploy) を使用して、パラメータを使用してバイトコードのエンコード値を取得します。 |
| 値          | Number &#124; String &#124; BN &#124; BigNumber | このデプロイメントでコントラクトに転送される値。 値の転送を受け入れるには、コントラクトコンストラクタは 'payable' でなければなりません。 コントラクトコンストラクタが支払われない場合、値はゼロでなければなりません。                                                                                                                                                                                                                                                   |
| codeFormat | 文字列                                             | (オプション、デフォルト: `"EVM"`) スマートコントラクトのコード形式。                                                                                                                                                                                                                                                                                                                            |
| 手数料比       | Number                                          | 手数料支払者の手数料比率。 30%の場合は、手数料の30%が手数料支払者によって支払われます。 70%は送信者が支払います。 手数料比率の範囲は1~99ですが、範囲外の場合は取引は受け付けられません。                                                                                                                                                                                                                                                                |

A transaction object of type `FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO` with the above structure or an `RLP-encoded transaction` of type `FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO` can be used as a parameters in [caver.klay.accounts.signTransaction](../caver.klay.accounts.md#signtransaction) for sender and in [caver.klay.accounts.feePayerSignTransaction](../caver.klay.accounts.md#feepayersigntransaction) for fee payer.

In order for the fee payer to sign an RLP encoded transaction signed by the sender and send it to the network, define an object with the following structure and call `caver.klay.sendTransaction`.

| 名前                   | タイプ | Description                        |
| -------------------- | --- | ---------------------------------- |
| feePayer             | 文字列 | このトランザクションの手数料支払者アドレス。             |
| senderRawTransaction | 文字列 | 送信者によって署名された RLP エンコードされたトランザクション。 |

**戻り値**

`コールバック` は 32 バイトのトランザクションハッシュを返します。

`PromiEvent`: A promise combined event emitter. 領収書が入手可能な場合には解決されます。 さらに、次のイベントが利用できます:

- `"transactionHash"` returns `String`: トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発行される。
- `"receipt"` は `オブジェクト`: トランザクション受信が可能であるときに発生します。
- `"error"` returns `Error`: 送信中にエラーが発生した場合に発生します。 ガス欠エラーでは、2 番目のパラメータはレシートです。

**例**

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
.on('error', console.error); // ガス漏れの場合、2番目のパラメータはレシートです。

// コンストラクター引数でスマートコントラクトをデプロイする (caver.klay.abi.encodeContractDeploy)。

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


