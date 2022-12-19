# ブロックチェーン検査 <a id="blockchain-inspection"></a>

## debug_dumpBlock <a id="debug_dumpblock"></a>

ブロック番号に対応する状態を取得し、 アカウントのリスト（ストレージ、コードを含む）を返す。

**注意**: この関数は、現在4つの 番目の最新の数値の状態を正しく返します。  コマンドライン オプション `--state.block-interval` (デフォルト: 128) の値に応じて、古いブロック状態の取得が制限されます。  これは、関数 が、 state.block-interval の倍数であるブロック番号のみに対して状態の取得を行うことを意味します。  例えば、 state.block-interval が 128 の場合、この関数は ブロック番号 "0x0", "0x80", "0x100", "0x180" などの状態を返します。  ブロック 番号が state.block-interval の倍数でない場合、それは 'missing trie node' エラーを返します。

| クライアント | メソッドの呼び出し                                           |
|:------:| --------------------------------------------------- |
| コンソール  | `debug.dumpBlock(number)`                           |
|  RPC   | `{"method": "debug_dumpBlock", "params": [number]}` |

**パラメータ**

| 名前            | タイプ                             | Description                                                                                                                                              |
| ------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ブロック番号またはハッシュ | QUANTITY &#124; Tag &#124; Hash | 整数または16進ブロック番号、または文字列 `"forest"`、 ` "latest" ` または `"pending"` `"pending"` [既定のブロックパラメータ](../klay/block.md#the-default-block-parameter)、またはブロックハッシュのように。 |

{% hint style="success" %}
注意: Klaytn v1.7.0 より前のバージョンでは、hex文字列タイプのみ使用できます。
{% endhint %}

**戻り値**

| タイプ     | Description |
| ------- | ----------- |
| JSON文字列 | ブロック情報      |

**例**

コンソール
```javascript
> debug.dumpBlock("0x80")
{
  accounts: {
    0000000000000000000000000000000000000035: {
      balance: "12800000000000000000",
      code: "6080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a723058201307c3756f4e627009187dcdbc0b3e286c13b98ba9279a25bfcc18dd8bcd73e40029",
      codeHash: "62b00472fac99d94ccc52f5addac43d54c129cd2c6d2357c9557abea67efdec5",
      nonce: 0,
      root: "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      storage: {}
    },
    /...(skipped).../
      codeHash: "3f34b5d7038ae652086ba4847ede2668b26a50107c5258d1412f764b942e2661",
      nonce: 1,
      root: "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      storage: {}
    }
  },
  root: "70383c826d1161ec2f12d799023317d8da7775dd47b8502d2d7ef646d094d3a5"
}

> debug.dumpBlock("0x81")
Error: missing trie node a573119868e0898fe5526732a079dd713c005fcbcce38dec5cae75af0378e4d3 (path )
    at web3.js:3239:20
    at web3.js:6447:15
    at web3.js:5181:36
    at <anonymous>:1:1
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_dumpBlock","params":["0x80"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":{"root":70383c826d1161ec2f12d7923317d8da7775d47b8502d7ef646d094d3a5","accounts":{"000000000000000000000000000000000000000000000000000000000000000000000000
```

## debug_dumpStateTrie <a id="debug_dumpstatetrie"></a>

指定した状態ルートのすべての状態/ストレージの試行を取得します。

| クライアント | メソッドの呼び出し                                               |
|:------:| ------------------------------------------------------- |
| コンソール  | `debug.dumpStateTrie(number)`                           |
|  RPC   | `{"method": "debug_dumpStateTrie", "params": [number]}` |

**パラメータ**

| 名前 | タイプ | Description |
| -- | --- | ----------- |
| 数値 | int | ブロック番号      |

**戻り値**

| タイプ     | Description  |
| ------- | ------------ |
| JSON文字列 | 状態トリエの結果をダンプ |

**例**

コンソール
```javascript
> debug.dumpStateTrie(10)
{
    root: "70383c826d1161ec2f12d799023317d8da7775dd47b8502d2d7ef646d094d3a5",
    tries: [...]
}
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_dumpStateTrie","params":["0x80"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":{"root":70383c826d1161ec2f12d799023317d8da7775d47b8502d7ef64d094d3a5","tries":[...]}}
```

## debug_getBlockRlp <a id="debug_getblockrlp"></a>

ブロック番号から RLP でエンコードされたブロックを取得し、返します。

| クライアント | メソッドの呼び出し                                             |
|:------:| ----------------------------------------------------- |
| コンソール  | `debug.getBlockRlp(number)`                           |
|  RPC   | `{"method": "debug_getBlockRlp", "params": [number]}` |

参照: [RLP](https://github.com/ethereum/wiki/wiki/RLP)

**パラメータ**

| 名前            | タイプ                             | Description                                                                                                                                              |
| ------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ブロック番号またはハッシュ | QUANTITY &#124; Tag &#124; Hash | 整数または16進ブロック番号、または文字列 `"forest"`、 ` "latest" ` または `"pending"` `"pending"` [既定のブロックパラメータ](../klay/block.md#the-default-block-parameter)、またはブロックハッシュのように。 |

{% hint style="success" %}
注意: Klaytn v1.7.0 より前のバージョンでは、整数型のみ使用できます。
{% endhint %}

**戻り値**

| タイプ | Description        |
| --- | ------------------ |
| 文字列 | RLP でエンコードされたブロック。 |

**例**

コンソール
```javascript
> debug.getBlockRlp(100)
"f90399f90394a05a825207c8396b848fefc73e442db004adee6596309af27630871b6a3d424758a01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347940000000000000000000000000000000000000000940000000000000000000000000000000000000000a0b2ff1e4173123faa241fb93d83860e09f9e1ca1cfaf24c40c9e963e65c0b0317a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421b9010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016485e8d4a50fff80845bb9e92eb90187d7820401846b6c617988676f312e31302e33856c696e75780000000000000000f90164f854943b215ed129645b949722d4efbd9c749838d85bf0947050164b7718c667c9661afd924f6c0c5e5d4a01947f303b360063efc575e99cf2f7602efa034e832e94f38624dba0e106aa6a79335f77d3fd6409f9e4d8b84126d1ae355905704d8ffcc50599a8a051ac7c50ed6fc6d7caf6510cf0329b56cf3e3babfe45cc95143074ca0385627ea3b6ac3f6ad7961b60f23e32965d3b0c2900f8c9b841c3423ecb41ee86b193dbb98bf74e0c1b8e0c475503a8f5ef37ef7566af34443c77b492a1f92e5a7411c36efeae08ebc698d02353c38f07a3d5c32168243ab7e901b841ec6558f4e5d123b9dc240e77db493f1e5e2f55f108d3c4f9b39e10dbca39ad7b3fc2dd5d27a7a3d92938ad4245bef5a914377fb2b92cbe342067a9963ab121b700b841f34ed94f29cd0aefd841cc8aba9dcc9d4c2fe14795f3a661e8ce92c2014c2099327e5f4285e1d1821e55f297cf5252bafed521ab49906b9b596a3187ce1e529c00a063746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365880000000000000000c0c0"
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_getBlockRlp","params":['200'],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":"f905ebf905e6a03ab9a91f37811c1a2e975d1f684e4f9acbfcda09ff1529369a50a0c95ed0c026a01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347940000000000000000000000000000000000000000940000000000000000000000000000000000000000a067302a0f946f9a676f187c0bebe6a61515321ff34614af507ac2fad9edac9018a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421b90100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000181c885e8d4a50fff80845bc3e058b903d8d7820302846b6c617988676f312e31302e34856c696e75780000000000000000f903b5f9011194011feb9f54d7cf0c59563d4f621a90e59fe839d9941aa5286f1ae8e183a8f8aebf2cb8425654a4979f94417a9f6e635f458be805702d85dd76d5dbb80aa8944eeabc5dbca48ff84a7fb36d67b51240ad37b01694518df54c51a355d1d961a641a1ee58a4acac62219453113c502402751deec24f6b4ca046878a74afa09459d4136ee1b30d9055b39675c86b5435d48662f9945b36da8763dce3bf84137ca79d56c468017383d2949b974f03aa0bb7d73882e3cfb80ec7a9e9ba543694af70cadbacb65d3a98352a12cc464dffb7e8181894c21dc40330bf91583c79eb58ae527487008f669d94c4a852238132f40ca085554f7bdcaf5f9ebab00f94ebd17315849780edc86f5f32081c8fbb0bd90a23b841ca7b5ac7fa0f6f228ba67544cf898005466a713bb863aaaaada20e58a838b2b468856e6277890a42ec92f8af40ca348a45438efa09d5e572ed8be4b535e016b701f9025bb841e64b232ed585759854e609c7947d19931a14e7906c5bbfe4acaa9aa7484d28f70b9dbfb7047dbd971e5d077d97306f26be258d2b016446fd41474082cc274a2b01b84195cf54ec0ac1ad4137be193f8d111f893590bd840cdb514c42ac169eb69e666a47e6cb358847364411c9cacb6261005d7fd4583e0d40216a1fa86fb083be270901b841e6caa2cb395a6e9d9c0853834a87a4c03444ec2b94035b3742c19ca09a72384c3ea9738aa66b43ad6f40269e8fd0ba015e23db36d7d7ccf666adba67c4bda4fc01b8418ad3f264ebb0dc47788f1d872423b7b067137d5d550f3311642308d5251f3e50049af533b8e16309ace3bf41ecf38a65a6e364458f8224c9efe57983c590590601b84129e147bf2666826af23027237e2894b074014ff38711ffe7168aa808a52c7e4863f2da1c5abd625567ef59b053f0b7abd36459b30a1e4d4d953784cb5f568fc500b841d58b713b28dba4bcb26ebbd274bbb12a8738a054c9cd18a2ee7298264e683a720dd633b66fa98edfe926e844d6e45f884b5e22fcd0df39d4d6f1fc84f1caceb701b8412dfaeadac01129c1ff9352c1b4b66e1c6b035b80e4b53e3ea5344a82ef607e3321fa05e57f6bdb27e4bd665af3e6c8b19575b3888f1b949c0cadbb186857b7cb01b841bb240246258aae93db40017e0ba437e0c4e517a25643282ee361f89fdb877a745f682a1f2c0441aa2d59cfa2058dc61d46f046499d4036efa02557b33a2f395200b841fdb9bb602e321d80ea09621e6ac36c01dc11152651404b4f7dba8be13466142914d97592c2625d83c27e220521d860b6128a0172c0ff39cdc23dabbfd4fdbb8100a063746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365880000000000000000c0c0"}
```


## debug_getModifiedAccountsByHash <a id="debug_getmodifiedaccountsbyhash"></a>

Returns all accounts that have changed between the two blocks specified by their block hashes. `endBlockHash` で行われた変更は含まれますが、 `startBlockHash` で行われた変更は含まれません。 `endBlockHash` が指定されていない場合、 `startBlockHash` で変更された口座を返します。 変更は、nonce、balance、code hash、またはstorage hashの差として定義されます。


| クライアント | メソッドの呼び出し                                                                                   |
|:------:| ------------------------------------------------------------------------------------------- |
| コンソール  | `debug.getModifiedAccountsByNumber(startBlockHash, endBlockHash)`                           |
|  RPC   | `{"method": "debug_getModifiedAccountsByNumber", "params": [startBlockHash, endBlockHash]}` |

**パラメータ**

| 名前             | タイプ       | Description             |
| -------------- | --------- | ----------------------- |
| startBlockHash | 32バイトのデータ | チェックする範囲の最初のブロックハッシュ。   |
| endBlockHash   | 32バイトのデータ | (オプション) 範囲の最後のブロックハッシュ。 |

**戻り値**

| タイプ     | Description                                             |
| ------- | ------------------------------------------------------- |
| JSON文字列 | The list of addresses modified between the given range. |

**例**

コンソール
```javascript
> debug.getModifiedAccountsByHash("0x583a02df4222c82d4ffe5d3658d0f7ac233f4dc5de83f6430d74199038b606b6", "0x69833f0fc012dc36be910aa6909f5395cd35136dbeae29ed2170a7d4162a009c")

["0x31b93ca83b5ad17582e886c400667c6f698b8ccd", "0xb7fe15c42e66bd71835b07dc6e7daee7729f6235", "0xe31a0edb11357dba71377e625fc6174da4ef4321", "0x16b11cf9c2186a117b0da38315b42b1eaa03bbe5", "0xd3ec3c7e4cad042dbdcb6a7e0fdbc55a92276f12", "0xa4e0d726ce51572e66295756ad93206592c43a59", "0xf65e07b6626ab43ecea744803fa46bd4a89bfdb6", "0xaac56dfe44f9894d4f536cd17acfbc44bf81a843", "0x3855407fa65c4c5104648b3a9e495072df62b585", "0x61a7cbdd597848494fa85cbb76f9c63ad9c06cad", "0xa4845491cb0dad5bd6707a33c02af0d9db435c15", "0x026e8f70a26b6e5c8bec25e23869846edfdd6728", "0x3cf3e8caea91501321feee0f0692fcd98f1c6292", "0x18822790d7baf2fa6bbca6ad8baa46985abeb81b"]
```

HTTP RPC
```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_getModifiedAccountsByHash","params":["0x583a02df4222c82d4ffe5d3658d0f7233f4dc5de83f6430d74199038b606b6", "0x69833f0fc012dc36be910aa6909f5395cd35136dbeae29a7d4162a009c","id":1}' https://api.baoblay.net:8651

{"jrpc":1,
```


## debug_getModifiedAccountsByNumber <a id="debug_getmodifiedaccountsbynumber"></a>

Returns all accounts that have changed between the two blocks specified by their block numbers. `endBlockNum` で行われた変更は含まれますが、 `startBlockNum` で行われた変更は含まれません。 `endBlockNum` が指定されていない場合、 `startBlockNum` で変更された口座を返します。 変更は、nonce、balance、 code hash、またはstorage hashの差として定義されます。


| クライアント | メソッドの呼び出し                                                                                 |
|:------:| ----------------------------------------------------------------------------------------- |
| コンソール  | `debug.getModifiedAccountsByNumber(startBlockNum, endBlockNum)`                           |
|  RPC   | `{"method": "debug_getModifiedAccountsByNumber", "params": [startBlockNum, endBlockNum]}` |

**パラメータ**

| 名前            | タイプ | Description           |
| ------------- | --- | --------------------- |
| startBlockNum | int | チェックする範囲の最初のブロック番号。   |
| endBlockNum   | int | (オプション) 範囲の最後のブロック番号。 |

**戻り値**

| タイプ     | Description                                             |
| ------- | ------------------------------------------------------- |
| JSON文字列 | The list of addresses modified between the given range. |

**例**

コンソール
```javascript
> debug.getModifiedAccountsByNumber(171904, 172160)
["0x31b93ca83b5ad17582e886c400667c6f698b8ccd", "0xb7fe15c42e66bd71835b07dc6e7daee7729f6235", "0xe31a0edb11357dba71377e625fc6174da4ef4321", "0x16b11cf9c2186a117b0da38315b42b1eaa03bbe5", "0xd3ec3c7e4cad042dbdcb6a7e0fdbc55a92276f12", "0xa4e0d726ce51572e66295756ad93206592c43a59", "0xf65e07b6626ab43ecea744803fa46bd4a89bfdb6", "0xaac56dfe44f9894d4f536cd17acfbc44bf81a843", "0x3855407fa65c4c5104648b3a9e495072df62b585", "0x61a7cbdd597848494fa85cbb76f9c63ad9c06cad", "0xa4845491cb0dad5bd6707a33c02af0d9db435c15", "0x026e8f70a26b6e5c8bec25e23869846edfdd6728", "0x3cf3e8caea91501321feee0f0692fcd98f1c6292", "0x18822790d7baf2fa6bbca6ad8baa46985abeb81b"]
```

HTTP RPC
```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_getModifiedAccountsByNumber","params":[171904, 172160],"id":1}' https://api.baobab.klaytn.net:8651

{"jsonrpc":","id":1,"result":1,"result":["0x31b93ca83b5ad17582e8864006c6f698b8ccd","0xb7fe15c42e66bd71835bdc6e7dae77f6
```


## debug_preimage <a id="debug_preimage"></a>

既知の場合、sha3 ハッシュのプリイメージを返します。

| クライアント | メソッドの呼び出し                                        |
|:------:| ------------------------------------------------ |
| コンソール  | `debug.preimage(hash)`                           |
|  RPC   | `{"method": "debug_preimage", "params": [hash]}` |


**パラメータ**

| 名前   | タイプ | Description |
| ---- | --- | ----------- |
| hash | 文字列 | シャー・3・ハッシュだ |

**戻り値**

| 名前       | タイプ | Description       |
| -------- | --- | ----------------- |
| preimage | 文字列 | sha3 ハッシュのプリイメージ。 |

**例**

コンソール
```javascript
> debug.preimage("0xaf953a2d01f55cfe080c0c94150a60105e8ac3d51153058a1f03dd239dd08586")
"0xdd738d9a7d987a98798123b2322d389470328420bb3d84023a8405a5523cc532235ba325235243242cb9a4758609a8604 ...  98bbd743053d0cbadaaccd4865cc0348685460ada874506ad984506ad80458ad69038fd6f908340fd9af68faf903760"
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_preimage","params":["0xaf953a2d01f55cfe080c0c94150a60105e8ac3d51153058a1f03dd239dd08586"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":"0xaf953a2d01f55cfe080c0c94150a60105e8ac3d51153058a1f03dd239dd08586")
"0xdd738d9a7d987a98798123b2322d389470328420bb3d84023a8405a5523cc532235ba325235243242cb9a4758609a8604 ...  98bbd743053d0cbadaaccd4865cc0348685460ada874506ad984506ad80458ad69038fd6f908340fd9af68faf903760"}
```

## debug_getBadBlocks <a id="debug_getbadblocks"></a>

クライアントがネットワーク上で最後に見た「バッドブロック」のリストを返します。

| クライアント | メソッドの呼び出し                                        |
|:------:| ------------------------------------------------ |
| コンソール  | `debug.getBadBlocks()`                           |
|  RPC   | `{"method": "debug_getBadBlocks", "params": []}` |

**パラメータ**

なし

**戻り値**

| 名前       | タイプ  | Description      |
| -------- | ---- | ---------------- |
| badBlock | JSON | ブロックハッシュのJSONリスト |

**例**

コンソール
```javascript
> debug.getBadBlocks()
[]
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_getBadBlocks","params":[],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":[]}
```

## debug_printBlock <a id="debug_printblock"></a>

ブロックを取得し、きれいな形式を返します。

| クライアント | メソッドの呼び出し                                            |
|:------:| ---------------------------------------------------- |
| コンソール  | `debug.printBlock(number)`                           |
|  RPC   | `{"method": "debug_printBlock", "params": [number]}` |

**パラメータ**

| 名前            | タイプ                             | Description                                                                                                                                              |
| ------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ブロック番号またはハッシュ | QUANTITY &#124; Tag &#124; Hash | 整数または16進ブロック番号、または文字列 `"forest"`、 ` "latest" ` または `"pending"` `"pending"` [既定のブロックパラメータ](../klay/block.md#the-default-block-parameter)、またはブロックハッシュのように。 |

{% hint style="success" %}
注意: Klaytn v1.7.0 より前のバージョンでは、整数型のみ使用できます。
{% endhint %}

**戻り値**

| タイプ | Description  |
| --- | ------------ |
| 文字列 | ブロック構造体のダンプ。 |

**例**

コンソール
```javascript
> debug.printBlock(65120)
"(*types.Block)(0xc436fad3b0)(Block(#65120): Size: 2.95 kB {\nMinerHash: 7a5f8d37d34be6d9d19c5f161756d607da62227bb725ddb2f372682d7a9f1445\nHeader(e96d6477acfeba8ba865c315020471dcf751aa1bddca77f469334ab0492d218f):\n[\n\tParentHash:      e768b5b7eeb1005fe130c26da744d47e042e9227cee675fa70c89ede38653aea\n\tCoinbase:         0000000000000000000000000000000000000000\n\tRewardbase:       0000000000000000000000000000000000000000\n\tRoot: ... 0xc3be927ae5c0c48a0c83a1dbdf2df737c4a708eb6dae0ccb4a7eb042ea0a6ebf\n\tS:       0x53d8bed6357f88c8bab1f3d83942aa53c14269e58016e284656b12996a5d759a\n\tHex:      f863829d9280825208949619a83fcefc5647736cfd28845fcc4f716ff53b8080820fe7a0c3be927ae5c0c48a0c83a1dbdf2df737c4a708eb6dae0ccb4a7eb042ea0a6ebfa053d8bed6357f88c8bab1f3d83942aa53c14269e58016e284656b12996a5d759a\n]\n}\n)\n"

```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_printBlock","params":[65120],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":"(*types.Block)(0xc4355b05a0)(Block(#65120): Size: 2.95 kB {\nMinerHash: 7a5f8d37d34be6d9d19c5f161756d607da62227bb725ddb2f372682d7a9f1445\nHeader(e96d6477acfeba8ba865c315020471dcf751aa1bddca77f469334ab0492d218f):\n[\n\tParentHash:       e768b5b7eeb1005fe130c26da744d47e042e9227cee675fa70c89ede38653aea\n\tCoinbase:         0000000000000000000000000000000000000000\n\tRewardbase:  ... 0000000000000000000000000000000000000000\n\tRoot:             4fd68a8f550cbd9ad665bc1a8021882ced5e1859fd9e28a48cb2910532b6ef27\n\tTxSha:            e3dbb8245038adcdc849de54af1d05f0c36c4c20d2710e31d525bd012d20a193\n\tReceiptSha:       212d4f453a897e2a486c86a4b120c1a850e89753865fe7f1aafa4"}
```


## debug_setHead <a id="debug_sethead"></a>

**`警告`**: この API はまだ実装されておらず、常に "未実装の API" エラーを返します。

ローカルチェーンの現在の先頭をブロック番号で設定します。

**注意**: これは破壊的な行為であり、あなたのチェーンに深刻なダメージを与える可能性があります。 *の極端な* に注意して使用してください。

| クライアント | メソッドの呼び出し                                         |
|:------:| ------------------------------------------------- |
| コンソール  | `debug.setHead(number)`                           |
|  RPC   | `{"method": "debug_setHead", "params": [number]}` |


**パラメータ**

| 名前 | タイプ | Description      |
| -- | --- | ---------------- |
| 数値 | 文字列 | 16 進数文字列のブロック番号。 |

**戻り値**

なし

**例**

コンソール
```javascript
> debug.setHead("0x100")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_setHead","params":["0x100"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_seedHash <a id="debug_seedhash"></a>

ブロックのシードハッシュを取得します。


| クライアント | メソッドの呼び出し                                          |
|:------:| -------------------------------------------------- |
| コンソール  | `debug.seedHash(number)`                           |
|  RPC   | `{"method": "debug_seedHash", "params": [number]}` |


**パラメータ**

| 名前 | タイプ    | Description |
| -- | ------ | ----------- |
| 数値 | uint64 | ブロック番号      |

**戻り値**

| 名前       | タイプ | Description  |
| -------- | --- | ------------ |
| seedHash | 文字列 | ブロックシードハッシュ。 |

**例**

コンソール
```javascript
> debug.seedHash(100)
"0x000000000000000000000000000000000000000000000000000000000000"
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_seedHash","params":[100],"id":1}) https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":"0x0000000000000000000000000000000000000000000000000000"}
```


## debug_startWarmUp <a id="debug_startwarmup"></a>

`startUp` は、最新の状態の trie を繰り返して、trie キャッシュをウォーム アップします。 trieキャッシュの90%がいっぱいの場合、反復は自動的に停止されます。 このメソッドは、ウォームアップの開始に失敗した場合にエラーを返すか、成功した場合は `null` を返します。

| クライアント | メソッドの起動                           |
|:------:| --------------------------------- |
| コンソール  | `debug.startWarmUp()`             |
|  RPC   | `{"method": "debug_startWarmUp"}` |

**パラメータ**

なし

**戻り値**

| タイプ | Description                                |
| --- | ------------------------------------------ |
| エラー | `ウォーム アップが開始された場合は null` またはそうでない場合はエラーです。 |

**例**

コンソール

```javascript
> debug.startWarmUp()
null
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_startWarmUp","id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_startContractWarmUp <a id="debug_startcontractwarmup"></a>

`startContractWarmUp` は、トリエキャッシュをウォームアップするために、指定されたコントラクトアドレスの最新のストレージトライを繰り返します。 trieキャッシュの90%がいっぱいの場合、反復は自動的に停止されます。 ウォーム アップの開始に失敗した場合、または指定されたアドレスがコントラクトアドレスではない場合、メソッドはエラーを返します。 または `null` が正常に開始された場合。

| クライアント | メソッドの起動                                                        |
|:------:| -------------------------------------------------------------- |
| コンソール  | `debug.startContractWarmUp(address)`                           |
|  RPC   | `{"method": "debug_startContractWarmUp", "params": [address]}` |

**パラメータ**

| タイプ        | Description |
| ---------- | ----------- |
| 20 バイトのデータ | コントラクトアドレス  |

**戻り値**

| タイプ | Description                                |
| --- | ------------------------------------------ |
| エラー | `ウォーム アップが開始された場合は null` またはそうでない場合はエラーです。 |

**例**

コンソール

```javascript
> debug.startContractWarmUp("0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b")
null
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_startContractWarmUp", "params":["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b"], "id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0",","id":1,"result":null}
```

## debug_stopWarmUp <a id="debug_stopwarmup"></a>

`stopWarmUp` は現在実行中のウォームアップを停止します。 このメソッドはパラメータを取りません。 `null` を返すか、ウォームアップが停止したかどうかに応じてエラーが返されます。

| クライアント | メソッドの起動                    |
|:------:| -------------------------- |
| コンソール  | `debug.stopWarmUp()`       |
|  RPC   | `{"method": "stopWarmUp"}` |

**パラメータ**

なし

**戻り値**

| タイプ | Description                                 |
| --- | ------------------------------------------- |
| エラー | `ウォームアップが停止した場合は null` またはそうでない場合はエラーになります。 |

**例**

コンソール

```javascript
> debug.stopWarmUp()
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_stopWarmUp","id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```

## debug_startCollectingTrieStats <a id="debug_startCollectingTrieStats"></a>

`startCollectingTrieStats` は、最新の状態またはストレージのトライを反復してトリの統計を収集します。 指定されたアドレスにコントラクトのストレージトライの統計を収集します。 空のアドレス(="0x00...00")が与えられると、状態全体の統計が収集されます。 統計は終了の1分前に記録され、全体情報と深さごとの情報が含まれます。 このメソッドは、タスクの開始に失敗した場合にエラーを返すか、成功した場合は `null` を返します。

| クライアント | メソッドの起動                                                             |
|:------:| ------------------------------------------------------------------- |
| コンソール  | `debug.startCollectingTrieStats(address)`                           |
|  RPC   | `{"method": "debug_startCollectingTrieStats", "params": [address]}` |

**パラメータ**

| タイプ        | Description |
| ---------- | ----------- |
| 20 バイトのデータ | コントラクトアドレス  |

**戻り値**

| タイプ | Description                              |
| --- | ---------------------------------------- |
| エラー | `null` trie統計タスクを収集するか、そうでない場合はエラーになります。 |

**例**

コンソール

```javascript
// empty address to collect whole state trie statistics
> debug.startCollectingTrieStats("0x0000000000000000000000000000000000000000")
null
// contract address to collect storage trie statistics
> debug.startCollectingTrieStats("0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b")
null
```

HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_startCollectingTrieStats", "params":["0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b"], "id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0",","id":1,"result":null}
```

ログ

```
INFO[03/10,12:03:12 +09] [5] trie statistics blockNum=1491072root=0x64af12b6374b92f6db457fa1b98fe9522d9f36ba352e3c4e01cdb75f001e8264len(children)=16
...
INFO[03/10,12:03:12 +09] [5] Finished collecting trie statistics       elapsed=95.152412ms numNodes=133036 numLeafNodes=95948 maxDepth=9
INFO[03/10,12:03:12 +09] [5] number of leaf nodes in a depth           depth=5 numNodes=22098
INFO[03/10,12:03:12 +09] [5] number of leaf nodes in a depth           depth=6 numNodes=65309
INFO[03/10,12:03:12 +09] [5] number of leaf nodes in a depth           depth=7 numNodes=8083
INFO[03/10,12:03:12 +09] [5] number of leaf nodes in a depth           depth=8 numNodes=456
INFO[03/10,12:03:12 +09] [5] number of leaf nodes in a depth           depth=9 numNodes=2
```