## getFilterChanges <a id="getfilterchanges"></a>

```javascript
caver.klay.getFilterChanges(filterId [, callback])
```

フィルタのポーリングメソッド。最後のポーリング以降のログの配列を返します。

**パラメータ**

| 名前       | タイプ | Description                                                        |
| -------- | --- | ------------------------------------------------------------------ |
| filterId | 文字列 | フィルタID。                                                            |
| callback | 関数  | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |

**戻り値**

`Promise` は `Array` を返します。

`Array` 内で返されるログ `Object` の構造は以下のようになります:インデックス付きログ引数の0~4バイトのデータ配列。 (Solidity: 最初のトピックは、イベント (*など) の署名のハッシュです。 * ,*, `Deposit(address,bytes32,uint256)`), イベントを `anonymous` 指定子で宣言したことを除いて).</td> </tr> 

</tbody> </table> 

**例**



```javascript
> caver.klay.getFilterChanges('0xafb8e49bbcba9d61a3c616a3a312533e').then(console.log);
[ 
    { 
        address: '0x71e503935b7816757AA0314d4E7354dab9D39162',
        topics: [ '0xe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9' ],
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        blockNumber: 3525,
        transactionHash: '0x1b28e2c723e45a0d8978890598903f36a74397c9cea8531dc9762c39483e417f',
        transactionIndex: 0,
        blockHash: '0xb7f0bdaba93d3baaa01a5c24517da443207f774e0202f02c298e8e997a540b3d',
        logIndex: 0,
        id: 'log_c1ea867d'
    } 
]
```




## getFilterLogs <a id="getfilterlogs"></a>



```javascript
caver.klay.getFilterLogs(filterId [, callback])
```


与えられた id を持つフィルタに一致するすべてのログの配列を返します。 The filter object should be obtained using [newFilter](#newfilter).  
Note that filter ids returned by other filter creation functions, such as [newBlockFilter](#newblockfilter) or [newPendingTransactionFilter](#newpendingtransactionfilter), cannot be used with this function.

**パラメータ**

| 名前       | タイプ | Description                                                        |
| -------- | --- | ------------------------------------------------------------------ |
| filterId | 文字列 | フィルタID。                                                            |
| callback | 関数  | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |


**戻り値**

[getFilterChanges](#getfilterchanges) を見る

**例**



```javascript
> caver.klay.getFilterLogs('0xcac08a7fc32fc625a519644187e9f690').then(console.log);
[
    {
        address: '0x55384B52a9E5091B6012717197887dd3B5779Df3',
        topics: [ '0xe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9' ],
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        blockNumber: 7217,
        transactionHash: '0xa7436c54e47dafbce696de65f6e890c96ac22c236f50ca1be28b9b568034c3b3',
        transactionIndex: 0,
        blockHash: '0xe4f27c524dacfaaccb36735deccee69b3d6c315e969779784c36bb8e14b89e01',
        logIndex: 0,
        id: 'log_2dd695a8' 
    }
]
```





## getPastLogs <a id="getpastlogs"></a>



```javascript
caver.klay.getPastLogs(options [, callback])
```


指定したオプションに一致する過去のログを取得します。

**パラメータ**

| 名前                | タイプ                 | Description                                                                                                                                                                    |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| オプション             | Object              | フィルタオプション。                                                                                                                                                                     |
| options.fromBlock | 数値 &#124; 文字列       | (オプション) ログを取得する最も古いブロックの数。 (`"latest"` は最新のブロックを意味します。 デフォルト値は `"latest"` です。                                                                                                  |
| options.toBlock   | 数値 &#124; 文字列       | (オプション) ログを取得する最後のブロックの数。 (`"latest"` は最新のブロックを意味します。 デフォルト値は `"latest"` です。                                                                                                   |
| options.address   | String &#124; Array | (オプション) 住所または住所のリスト。 特定のアカウントに関連するログのみが返されます。                                                                                                                                  |
| options.topics    | 行列                  | (オプション) ログエントリに表示される値の配列。 順序は重要である。 トピックを省略したい場合は、 `null`、 *例:*, `[null, '0x12...']` を使用してください。 そのトピックのオプションを指定して、各トピックの配列を渡すこともできます。 *例えば、* `[null, ['option1', 'option2']]`. |
| callback          | 関数                  | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。                                                                                                             |


**戻り値**

`Promise` は `Array` - ログオブジェクトの配列を返します。

`Array` 内で返されるイベント `Object` の構造は以下のようになります:

| 名前               | タイプ            | Description                                                                                    |
| ---------------- | -------------- | ---------------------------------------------------------------------------------------------- |
| address          | 文字列            | このイベントが発生した元。                                                                                  |
| data             | 文字列            | The data containing non-indexed log parameter.                                                 |
| トピック             | 行列             | 最大 4 32 バイトのトピックを持つ配列、topic 1-3 には、ログのインデックス付きパラメータが含まれます。                                     |
| logIndex         | Number         | Integer of the event index position in the block.                                              |
| transactionIndex | Number         | トランザクションのインデックス位置の整数、イベントが作成されました。                                                             |
| transactionHash  | 32-byte String | このイベントが作成されたトランザクションのハッシュ。                                                                     |
| blockHash        | 32-byte String | このイベントが作成されたブロックのハッシュ。 `保留中の null`。                                                            |
| blockNumber      | Number         | このログが作成されたブロック番号 `null` when still pending.                                                    |
| id               | 文字列            | A log identifier. "log_" 文字列を `keccak256(blockHash + transactionHash + logIndex).substr(0, 8)` |


**例**



```javascript
> caver.klay.getPastLogs({
    address: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
    topics: ["0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234"]
})
.then(console.log);

[{
    data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blockNumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    id: 'log_124d61bc',
},{...}]
```




## newBlockFilter <a id="newblockfilter"></a>



```javascript
caver.klay.newBlockFilter([callback])
```


ノードにフィルタを作成し、新しいブロックの到着に関する情報を受け取ります。 状態が変更されたかどうかを確認するには、 [getFilterChanges](#getfilterchanges) を呼び出します。

**パラメータ**

| 名前       | タイプ | Description                                                               |
| -------- | --- | ------------------------------------------------------------------------- |
| callback | 関数  | (オプション) オプションのコールバック。 コールバックは、error オブジェクトを最初のパラメータとし、結果は 2 番目のパラメータとします。 |


**戻り値**

`Promise` は `String` - フィルタ id。

**例**



```javascript
> caver.klay.newBlockFilter().then(console.log);
0x9ca049dc8b0788ee05724e45fc4137f1
```




## newFilter <a id="newfilter"></a>



```javascript
caver.klay.newFilter(options [, callback])
```


与えられたフィルターオプションを使用してフィルターオブジェクトを作成し、特定の状態の変更 (ログ) を受け取ります。

- 状態が変更されたかどうかを確認するには、 [getFilterChanges](#getfilterchanges) を呼び出します。
- `newFilter`で作成されたフィルタに一致するすべてのログを取得するには、 [getFilterLogs](#getfilterlogs) を呼び出します。

トピックフィルタの詳細については、 [Klaytn Platform API - klay_newFilter](../../../../../json-rpc/api-references/klay/filter.md#klay_newfilter) を参照してください。

**パラメータ**

| 名前                | タイプ                 | Description                                                                                                                                                               |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| オプション             | Object              | フィルタオプション。                                                                                                                                                                |
| options.fromBlock | 数値 &#124; 文字列       | (オプション) イベントをクエリする最も初期のブロック高さの数。 (特殊なタグがあります。 `"latest"` は最新のブロックを意味します)。 デフォルト値は `"latest"` です。                                                                          |
| options.toBlock   | 数値 &#124; 文字列       | (オプション) イベントをクエリする最後のブロック高さの数 (特殊なタグがあります。`"latest"` は最新の確認済みブロックを意味します)。 デフォルト値は `"latest"` です。                                                                          |
| options.address   | String &#124; Array | (オプション) 指定されたコントラクト内で生成されたログを取得するアドレスまたはアドレスのリスト。                                                                                                                         |
| options.topics    | 行列                  | (オプション) ログエントリで検索する値の配列。 順序は重要である。 指定された位置のすべてを一致させたい場合は、 `null`、 *などの*、 `[null, '0x12...']` を使用します。 配列のいずれかにマッチする配列を渡すこともできます。  *例えば、* `[null, ['option1', 'option2']]`. |
| callback          | 関数                  | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。                                                                                                        |


**戻り値**

`Promise` は `String` - フィルタ id。

**例**



```javascript
> caver.klay.newFilter({}).then(console.log);
0x40d40cb9758c6f0d99d9c2ce9c0f823

> caver.klay.newFilter({address: "0x55384B52a9E5091B6012717197887dd3B5779Df3"}).then(console.log);
0xd165cbf31b9d60346aada33dbefe01b
```




## newPendingTransactionFilter <a id="newpendingtransactionfilter"></a>



```javascript
caver.klay.newPendingTransactionFilter([callback])
```


新しい保留中のトランザクションの到着に関する情報を受信するために、ノードにフィルターを作成します。 状態が変更されたかどうかを確認するには、 [getFilterChanges](#getfilterchanges) を呼び出します。

**パラメータ**

| 名前       | タイプ | Description                                                        |
| -------- | --- | ------------------------------------------------------------------ |
| callback | 関数  | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |


**戻り値**

`Promise` は `String` - フィルタ id。

**例**



```javascript
> caver.klay.newPendingTransactionFilter().then(console.log);
0x1426438ffdae5abf43edf4159c5b013b
```




## アンインストールフィルタ <a id="uninstallfilter"></a>



```javascript
caver.klay.uninstallFilter(filterId [, callback])
```


与えられた id のフィルターを削除します。 モニタリングが不要になった場合は、すぐにフィルタを外すことを強くお勧めします。 フィルターが [getFilterChanges](#getfilterchanges) でノードで設定されたタイムアウト値よりも多く呼び出されていない場合、フィルターは削除されます。 デフォルトの設定は5分です。

**パラメータ**

| 名前       | タイプ | Description                                                        |
| -------- | --- | ------------------------------------------------------------------ |
| filterId | 文字列 | フィルタID。                                                            |
| callback | 関数  | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |


**戻り値**

`Promise` は `Boolean` - フィルタが正常にアンインストールされた場合 `true` を返します。そうでなければ、 `false` を返します。

**例**



```javascript
> caver.klay.uninstallFilter('0x1426438ffdae5abf43edf4159c5b013b').then(console.log);
true
```
