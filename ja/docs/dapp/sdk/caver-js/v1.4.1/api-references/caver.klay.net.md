---
description: >-
  名前空間 'net' の Klaytn API への JavaScript ラッパー。
---

# caver.klay.net <a id="caver-klay-net"></a>

`caver-klay-net` パッケージにより、Klaytn ノードの ネットワークプロパティと対話することができます。

```javascript
var Net = require('caver-klay-net');

// "Personal.providers.givenProvider" will be set if in a Klaytn supportedブラウザ.
var net = new Net(Net.givenProvider || 'ws://some.local-or-remote.node:8552');

// or using the caver package
var Caver = require('caver');
var caver = new Caver(Caver. ivenProvider || 'ws://some.local-or-remote.node:8552');
// -> caver.klay.net
```


## getId <a id="getid"></a>

```javascript
caver.klay.net.getId([callback])
```

現在のネットワークIDを取得します。

**パラメータ**

| 名前       | タイプ | Description                                                        |
| -------- | --- | ------------------------------------------------------------------ |
| callback | 関数  | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |

**戻り値**

`Promise` は `Number` - ネットワークIDを返します。

**例**

```javascript
> caver.klay.net.getId().then(console.log);
1000
```


## isListening <a id="islistening"></a>

```javascript
caver.klay.net.isListening([callback])
```

ノードがピアを待ち受けているかどうかを確認します。

**パラメータ**

| 名前       | タイプ | Description                                                        |
| -------- | --- | ------------------------------------------------------------------ |
| callback | 関数  | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |

**戻り値**

`Promise` は `Boolean` - `true` ノードがピアを待ち受けている場合、 `false` を返します。

**例**

```javascript
> caver.klay.net.isListening().then(console.log);
true
```


## getPeerCount <a id="getpeercount"></a>

```javascript
caver.klay.net.getPeerCount([callback])
```

接続しているピアの数を取得します。

**パラメータ**

| 名前       | タイプ | Description                                                        |
| -------- | --- | ------------------------------------------------------------------ |
| callback | 関数  | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |

**戻り値**

`Promise` は `Number` - 接続されたピアの数を返します。

**例**

```javascript
> caver.klay.net.getPeerCount().then(console.log);
10
```

## peerCountByType <a id="peercountbytype"></a>

```javascript
caver.klay.net.peerCountByType([callback])
```

接続されたノードの数を type とキーと値のペアを持つ接続されたノードの合計数で返します。

**パラメータ**

| 名前       | タイプ | Description                                                        |
| -------- | --- | ------------------------------------------------------------------ |
| callback | 関数  | (オプション) オプションのコールバックは、最初のパラメータとしてエラーオブジェクトを返し、結果は2番目のパラメータとして返します。 |

**戻り値**

`Promise` は `Object` - 接続されたピアの数と、接続されたピアの総数を返します。

**例**

```javascript
> caver.klay.net.peerCountByType().then(console.log);
{ en: 1, pn: 2, total: 3 }
```
