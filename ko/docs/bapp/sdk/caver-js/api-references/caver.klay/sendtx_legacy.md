# Legacy Transaction <a id="legacy-transaction"></a>

## sendTransaction (Legacy) <a id="sendtransaction-legacy"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Sends a transaction to the network.

Note: Only the account having `AccountKeyLegacy` can send this transaction.

**매개변수**

The parameters of sendTransaction are a transaction object and a callback function.

| 명칭                | 형식       | 설명                                                                   |
| ----------------- | -------- | -------------------------------------------------------------------- |
| transactionObject | 객체       | The transaction object to send.                                      |
| callback          | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

A transaction object of type `LEGACY` has the following structure:

| 명칭       | 형식                                              | 설명                                                                                                                                                                                                                                |
| -------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from     | 문자열                                             | Address of this transaction sender.                                                                                                                                                                                               |
| to       | 문자열                                             | (optional) The destination address of the message, left undefined for a contract-creation transaction.                                                                                                                            |
| value    | Number &#124; String &#124; BN &#124; BigNumber | (optional) The value transferred for the transaction in peb, also the endowment if it's a contract-creation transaction.                                                                                                          |
| gas      | Number                                          | The maximum amount of gas willing to pay for the transaction (unused gas is refunded).                                                                                                                                            |
| gasPrice | Number                                          | (optional) Gas price provided by the sender in peb. The gasPrice must be the same as the unitPrice set in the Klaytn node.                                                                                                        |
| data     | 문자열                                             | (optional) Either an [ABI byte string](http://solidity.readthedocs.io/en/latest/abi-spec.html) containing the data of the function call on a contract, or in the case of a contract-creation transaction the initialization code. |
| nonce    | Number                                          | (선택사항) 논스의 정숫값입니다. If omitted, it will be set by caver-js via calling `caver.klay.getTransactionCount`.                                                                                                                           |

**리턴값**

The `callback` will return the 32-byte transaction hash.

`PromiEvent`: 프로미스(promise)가 조합된 이벤트 이미터(event emitter). Will be resolved when the transaction receipt is available. Additionally the following events are available:

- `"transactionHash"` returns `String`: Is fired right after the transaction is sent and a transaction hash is available.
- `"receipt"` returns `Object`: Is fired when the transaction receipt is available.
- `"error"` returns `Error`: Is fired if an error occurs during sending. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

**예시**

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
.on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.
```
