# 従来の取引 <a id="legacy-transaction"></a>

## sendTransaction (Legacy) <a id="sendtransaction-legacy"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
ネットワークにトランザクションを送信します。

注: `AccountKeyLegacy` を持つアカウントのみがこのトランザクションを送信できます。

**パラメータ**

sendTransaction のパラメータはトランザクションオブジェクトとコールバック関数です。

| 名前                | タイプ    | Description                                                        |
| ----------------- | ------ | ------------------------------------------------------------------ |
| transactionObject | Object | 送信するトランザクションオブジェクト。                                                |
| callback          | 関数     | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |

タイプ `LEGACY` のトランザクションオブジェクトには以下の構造があります。

| 名前       | タイプ                                             | Description                                                                                                                                   |
| -------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| from     | 文字列                                             | このトランザクション送信者のアドレス。                                                                                                                           |
| to       | 文字列                                             | (オプション) コントラクト作成トランザクションに未定義のメッセージの宛先アドレスです。                                                                                                  |
| 値        | Number &#124; String &#124; BN &#124; BigNumber | (オプション) pebでトランザクションに転送される値で、契約作成トランザクションの場合は寄付も行います。                                                                                         |
| ガス       | Number                                          | 取引に支払うガスの最大額(使用されていないガスは返金されます)。                                                                                                              |
| gasPrice | Number                                          | (オプション) ペブで送信者が提供するガス価格。 gasPriceは、Klaytnノードで設定されているunitPriceと同じである必要があります。                                                                   |
| data     | 文字列                                             | (オプション) コントラクト上の関数呼び出しのデータを含む [ABI バイト文字列](http://solidity.readthedocs.io/en/latest/abi-spec.html) のいずれかです。 または、契約作成トランザクションの場合、初期化コードを指定します。 |
| nonce    | Number                                          | (オプション) nonce の整数。 省略された場合、 `caver.klay.getTransactionCount` を呼び出すことで caver-js によって設定されます。                                                    |

**戻り値**

`コールバック` は 32 バイトのトランザクションハッシュを返します。

`PromiEvent`: A promise combined event emitter. 領収書が入手可能な場合には解決されます。 さらに、次のイベントが利用できます:

- `"transactionHash"` returns `String`: トランザクションが送信され、トランザクションハッシュが利用可能になった直後に発行される。
- `"receipt"` は `オブジェクト`: トランザクション受信が可能であるときに発生します。
- `"error"` returns `Error`: 送信中にエラーが発生した場合に発生します。 ガス欠エラーでは、2 番目のパラメータはレシートです。

**例**

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
.on('error', console.error); // ガス漏れの場合、2番目のパラメータはレシートです。
```
