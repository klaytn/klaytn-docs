# Klaytn ネイティブコイン - KLY <a id="klaytn-native-coin-klay"></a>

## KLAY <a id="klay"></a>

KLAYはKlaytnの主な社内譲渡可能な暗号通貨であり、スマートコントラクトの作成または実行時またはKLAY転送時に取引手数料を支払うために使用されます。

KLAYは、Klaytn 分散アプリケーションプラットフォームを動作させるために必要な要素である。 これは、要求された操作を実行するコンセンサスノードに対するプラットフォームのクライアントによる支払いの一形態です。 To put it another way, KLAY is an incentive; it ensures that developers write high-quality applications \(wasteful code costs more\) and that the network remains healthy \(CNs are compensated for the resources they contribute\).

## KLAYの単位 <a id="units-of-klay"></a>

KlaytnはKLAYに以下の単位系を使用します。

* `peb` は最小の通貨単位です。
* `ston` は `Gpeb` の別名で、便宜上導入されたものです。
* A `KLAY` is 10^18 peb

| 単位             | peb値      | peb                                       |
|:-------------- |:--------- |:----------------------------------------- |
| peb            | 1 peb     | 1                                         |
| kpeb           | 10^3 peb  | 1,000                                     |
| Mpeb           | 10^6 peb  | 1,000,000                                 |
| Gpeb           | 10^9 peb  | 1,000,000,000                             |
| ston           | 10^9 peb  | 1,000,000,000                             |
| uKLAY（uKLAY）   | 10^12 peb | 1,000,000,000,000                         |
| mKLAY:         | 10^15 peb | 1,000,000,000,000,000                     |
| KLAY           | 10^18 peb | 1,000,000,000,000,000,000                 |
| kKLAY          | 10^21 peb | 1,000,000,000,000,000,000,000             |
| MKLAY          | 10^24 peb | 1,000,000,000,000,000,000,000,000         |
| GKLAYformat@@0 | 10^27 peb | 1,000,000,000,000,000,000,000,000,000     |
| TKLAY:         | 10^30 peb | 1,000,000,000,000,000,000,000,000,000,000 |

#### KLAYユニットに関連するAPI <a id="apis-related-to-klay-units"></a>

`klay.toPeb` と `klay.fromPeb` はKLY単位間で変換するための便利なAPIです。

```text
$ ./klay attach data/dd/klay.ipc
...
> klay.fromPeb(25, "peb")
"25"
> klay.fromPeb(25, "Gpeb")
"0.000000025"
> klay.fromPeb(25, "ston")
"0.000000025"
> klay.fromPeb(25, "KLAY")
"0.000000000000000025"
> klay.toPeb(25, "peb")
"25"
> klay.toPeb(25, "ston")
"25000000000"
> klay.toPeb(25, "KLAY")
"25000000000000000000"
```

You can get the list of all units supported by `klay.toPeb` and `klay.fromPeb` by sending an invalid unit string such as the one below.

```text
> klay.toPeb(1, "something-does-not-exist")
Error: This unit doesn't exist, please use one of the following units
"noKLAY": "0"
"peb": "1"
"kpeb": "1000"
"Mpeb": "1000000"
"Gpeb": "1000000000"
"ston": "1000000000"
"uKLAY": "1000000000000"
"mKLAY": "1000000000000000"
"KLAY": "1000000000000000000"
"kKLAY": "1000000000000000000000"
"MKLAY": "1000000000000000000000000"
"GKLAY": "1000000000000000000000000000"
"TKLAY": "1000000000000000000000000000000"

    at web3.js:2170:19
    at web3.js:2255:49
    at <anonymous>:1:1
```



