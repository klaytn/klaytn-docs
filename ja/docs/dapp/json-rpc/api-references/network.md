---
description: >-
  ネットワーク構成のクエリに使用されるAPI。
---

# ネームスペースネット <a id="namespace-net"></a>

名前空間 `net` は、Klaytn ネットワークに関連する関数を提供します。


## networkID <a id="net_networkid"></a>

ネットワーク識別子(ネットワーク ID)を返します。

**パラメータ**

なし

**戻り値**

| タイプ | Description                                                                                                                       |
| --- | --------------------------------------------------------------------------------------------------------------------------------- |
| 品質  | The integer of the network identifier.<br> - `"1001"`: Klaytn Baobab testnet.<br> - `"8217"`: Klaytn Cypress mainnet. |

**例**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_networkID","params":[],"id":67}' https://api.baobab.klaytn.net:8651

// Result
{
    "jsonrpc":"2.0",
    "id":67,
    "result":"1001"
}
```


## net_listen <a id="net_listening"></a>

クライアントがネットワーク接続を積極的にリッスンしている場合、 `true` を返します。

**パラメータ**

なし

**戻り値**

| タイプ     | Description               |
| ------- | ------------------------- |
| Boolean | `true` , それ以外の場合 `false`. |

**例**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}' https://api.baobab.klaytn.net:8651

// Result
{
    "id":67,
    "jsonrpc":"2.0",
    "result":true
}
```


## net_peerCount <a id="net_peercount"></a>

クライアントに現在接続されているピアの数を返します。

**パラメータ**

なし

**戻り値**

| タイプ | Description |
| --- | ----------- |
| 品質  | 接続ピアの数の整数。  |

**例**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}' https://api.baobab.klaytn.net:8651

// Result
{
    "id":74,
    "jsonrpc": "2.0",
    "result": "0x3" // 2
}
```

## net_peerCountByType <a id="net_peercountbytype"></a>

接続されたノードの数を type とキーと値のペアを持つ接続されたノードの合計数で返します。

**パラメータ**

なし

**戻り値**

| タイプ     | Description                 |
| ------- | --------------------------- |
| JSON文字列 | 接続されているピアの数と、接続されているピアの合計数。 |

**例**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_peerCountByType","params":[],"id":74}) https://api.baobab.klaytn.net:8651

// Result
{
    "id":74,
    "jsonrpc": "2.0",
    "result": {"en":3,"pn":2,"total":5}
}
```

## net_version <a id="net_version"></a>

現在の klaytn プロトコルのバージョンを返します。

**パラメータ**

なし

**戻り値**

| タイプ | Description                                                                                                     |
| --- | --------------------------------------------------------------------------------------------------------------- |
| 品質  | Klaytnプロトコルバージョンの整数。<br> - `"1001"`: Klaytn Baobab testnet.<br> - `"8217"`: Klaytn Cypress mainnet. |

**例**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}' https://api.baobab.klaytn.net:8651
// Result
{
    "jsonrpc":"2.0",
    "id":67,
    "result":"1001"
}
```