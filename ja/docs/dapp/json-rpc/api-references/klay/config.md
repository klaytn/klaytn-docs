## klay_chainID <a id="klay_chainid"></a>

チェーンの ID を返します。

**Parameters**

None

**Return Value**

| Type     | Description   |
| -------- | ------------- |
| QUANTITY | チェーンの ID の整数。 |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_chainID","id":1}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"0x7e2"
}
```


## klay_clientVersion <a id="klay_clientversion"></a>

Klaytn ノードの現在のクライアントバージョンを返します。

**Parameters**

None

**Return Value**

| Type   | Description                |
| ------ | -------------------------- |
| String | Klaytn ノードの現在のクライアントバージョン。 |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_clientVersion","id":1}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"Klaytn/v0.9.1+3518232250/linux-amd64/go1.11.2"
}
```


## klay_gasPrice <a id="klay_gasprice"></a>

ペブ内のガス価格の提案を返します。

**Parameters**

None

**Return Value**

| Type     | Description                              |
| -------- | ---------------------------------------- |
| QUANTITY | Integer of the current gas price in peb. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_gasPrice","params":[],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xAE9F7BCC00" // 250,000,000,000 peb = 250 ston
}
```

## klay_gasPriceAt <a id="klay_gaspriceat"></a>

下記の条件に基づいて異なる値を返します。 戻り値の単位は peb です。

- ヘッダ内で `baseFee` が未定義の場合、ガバナンスパラメータから単価を返します。
- ブロックが保留中のブロックの場合、txpoolのガス価格を返します。
- そうでなければ、指定されたブロックの基本手数料を返します。


**Parameters**

| Type | Description                  |
| ---- | ---------------------------- |
| 番号   | ブロック番号 省略した場合は、最新の単価が返却されます。 |

**Return Value**

| Type     | Description                              |
| -------- | ---------------------------------------- |
| QUANTITY | Integer of the current gas price in peb. |

**Example**

```javascript
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_gasPriceAt","params":["0x64"],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0xAE9F7BCC00" // 250,000,000,000 peb = 250 ston
}
```

## klay_isParallelDBWrite <a id="klay_isparalleldbwrite"></a>

Returns `true` if the node is writing blockchain data in parallel manner. It is enabled by default.

**Parameters**

None

**Return Value**

| Type    | Description                                                                        |
| ------- | ---------------------------------------------------------------------------------- |
| Boolean | `true` は、ノードがブロックチェーンデータを並列に書き込んでいることを意味します。 ノードがデータを連続的に書き込んでいる場合は `false` になります。 |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_isParallelDBWrite","id":1}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":true
}
```


## klay_isSenderTxHashIndexingEnabled <a id="klay_issendertxhashindexingenabled"></a>

Returns `true` if the node is indexing sender transaction hash to transaction hash mapping information. デフォルトでは無効化されており、 `--sendertxhashindexing` で有効化することができます。

**Parameters**

None

**Return Value**

| Type    | Description                                                            |
| ------- | ---------------------------------------------------------------------- |
| Boolean | `true` は、ノードが送信者トランザクションハッシュをトランザクションハッシュマッピング情報にインデックス付けしていることを意味します。 |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_isSenderTxHashIndexingEnabled","id":1}' https://public-en-baobab.klaytn.net

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":true
}
```


## klay_protocolVersion <a id="klay_protocolversion"></a>

ノードの Klaytn プロトコルバージョンを返します。 サイプレス/バオバブの現在のバージョンは `istanbul/65` です。

**Parameters**

None

**Return Value**

| Type   | Description             |
| ------ | ----------------------- |
| String | ノードの Klaytn プロトコルバージョン。 |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_protocolVersion","params":[],"id":1}' https://public-en-baobab.klaytn.net

// Result
{
   "jsonrpc":"2.0",
   "id":1,
   "result":"0x40"
}
```


## klay_rewardbase <a id="klay_rewardbase"></a>

Returns the rewardbase of the current node. Rewardbaseは、ブロック報酬が行われるアカウントのアドレスです。 It is only required for CNs.

**Parameters**

None

**Return Value**

| Type         | Description |
| ------------ | ----------- |
| 20-byte DATA | 住所。         |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"klay_rewardbase","id":1}' https://public-en-baobab.klaytn.net

// Result - If requested from non-CN nodes
{
    "jsonrpc":"2.0",
    "id":1,
    "error":{
        "code":-32000,
        "message":"rewardbase must be explicitly specified"
        }
}

// Result - If requested from CN nodes
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"0x96Fd91f34Cc8da9f6338C106Ba37aA8B48FB4Fa5"
}
```

