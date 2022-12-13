# caver.rpc.net <a id="caver-rpc-net"></a>

`caver.rpc.net` は `net` の名前空間を持つ JSON-RPC 呼び出しを提供します。

## caver.rpc.net.getNetworkId <a id="caver-rpc-net-getnetworkid"></a>

```javascript
caver.rpc.net.getNetworkId([callback])
```

Klaytn Node のネットワーク識別子 (ネットワーク ID) を返します。

**パラメータ**

| 名前       | タイプ | Description                                                        |
| -------- | --- | ------------------------------------------------------------------ |
| callback | 関数  | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |


**戻り値**

`Promise` は `番号` を返します。

| タイプ | Description |
| --- | ----------- |
| 数値  | ネットワークID。   |

**例**

```javascript
> caver.rpc.net.getNetworkId().then(console.log)
1001
```

## caver.rpc.net.isListening <a id="caver-rpc-net-islistening"></a>

```javascript
caver.rpc.net.isListening([callback])
```

Klaytn Node がネットワーク接続を積極的にリッスンしている場合、 `true` を返します。

**パラメータ**

| 名前       | タイプ | Description                                                        |
| -------- | --- | ------------------------------------------------------------------ |
| callback | 関数  | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |


**戻り値**

`Promise` は `boolean` を返します

| タイプ     | Description               |
| ------- | ------------------------- |
| boolean | `true` , それ以外の場合 `false`. |

**例**

```javascript
> caver.rpc.net.isListening().then(console.log)
true
```

## caver.rpc.net.getPeerCount <a id="caver-rpc-net-getpeercount"></a>

```javascript
caver.rpc.net.getPeerCount([callback])
```

Klaytn Node に現在接続されているピアの数を返します。

**パラメータ**

| 名前       | タイプ | Description                                                        |
| -------- | --- | ------------------------------------------------------------------ |
| callback | 関数  | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |


**戻り値**

`Promise` は `文字列` を返します

| タイプ | Description        |
| --- | ------------------ |
| 文字列 | 接続されているピアの数を表示します。 |

**例**

```javascript
> caver.rpc.net.getPeerCount().then(console.log)
0x3
```

## caver.rpc.net.getPeerCountByType <a id="caver-rpc-net-getpeercountbytype"></a>

```javascript
caver.rpc.net.getPeerCountByType([callback])
```

接続されたノードの数を type とキーと値のペアを持つ接続されたノードの合計数で返します。

**パラメータ**

| 名前       | タイプ | Description                                                        |
| -------- | --- | ------------------------------------------------------------------ |
| callback | 関数  | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |


**戻り値**

`Promise` は `オブジェクト` を返す

| タイプ    | Description                 |
| ------ | --------------------------- |
| object | 接続されているピアの数と、接続されているピアの合計数。 |

**例**

```javascript
> caver.rpc.net.getPeerCountByType().then(console.log)
{ en: 1, pn: 2, total: 3 }
```