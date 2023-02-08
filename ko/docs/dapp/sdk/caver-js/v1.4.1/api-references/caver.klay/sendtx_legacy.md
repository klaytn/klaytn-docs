# 기본 트랜잭션<a id="legacy-transaction"></a>

## sendTransaction (Legacy) <a id="sendtransaction-legacy"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
트랜잭션을 네트워크로 보냅니다.

참고: ` AccountKeyLegacy` 가 있는 계정 만, sendTransaction 이 가능합니다.

**Parameters**

The parameters of sendTransaction are a transaction object and a callback function.

| Name              | Type     | Description                                                                                                |
| ----------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transactionObject | Object   | The transaction object to send.                                                                            |
| callback          | Function | (optional) Optional callback, returns an error object as the first parameter and the result as the second. |

` LEGACY`  유형의 트랜잭션 오브젝트의 구조는 다음과 같습니다.

| Name     | Type                                            | Description                                                                                                                                                      |
| -------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from     | String                                          | Address of this transaction sender.                                                                                                                              |
| to       | String                                          | (선택 사항) 메시지 수신자 주소이며, 트랜잭션이 컨트랙트 생성 트랜잭션일 경우 수신자 주소가 입력되지 않습니다.                                                                                                  |
| value    | Number &#124; String &#124; BN &#124; BigNumber | (선택 사항) 트랜잭션으로 전송할 peb 단위로 환산된 KLAY입니다. 컨트랙트 생성 트랜잭션일 경우 (생성 함수가 KLAY를 받을 수 있게 설정되었다면) 컨트랙트가 생성 시 보유하는 KLAY입니다.                                                  |
| gas      | Number                                          | The maximum amount of gas willing to pay for the transaction (unused gas is refunded).                                                                           |
| gasPrice | Number                                          | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                       |
| data     | String                                          | (선택 사항) 컨트랙트의 함수를 호출할 수 있는 데이터가 담긴 [ABI byte string](http://solidity.readthedocs.io/en/latest/abi-spec.html) 또는, 컨트랙트 생성 트랜잭션일 경우 컨트랙트를 초기화(initialize)하는 코드입니다. |
| nonce    | Number                                          | (optional) Integer of a nonce. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`.                                              |

**Return Value**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: A promise combined event emitter. Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. On an out-of-gas error, the second parameter is the receipt.

**Example**

```javascript
const account = caver.klay.accounts.wallet.add('0x{private key}')

var code = "0x603d80600c6000396000f3007c01000000000000000000000000000000000000000000000000000000006000350463c6888fa18114602d57005b6007600435028060005260206000f3";

// using the callback
caver.klay.sendTransaction({
    from: account.address,
    data: code // deploying a contracrt
}, function(error, hash){
    ...
});

// using the promise
caver.klay.sendTransaction({
    from: account.address,
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    value: '1000000000000000'
})
.then(function(receipt){
    ...
});

// using the event emitter
caver.klay.sendTransaction({
    from: account.address,
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    value: '1000000000000000'
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // If an out-of-gas error, the second parameter is the receipt.
```
