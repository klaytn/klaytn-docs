# 取引手数料 <a id="transaction-fees"></a>

現在の Klaytn 仮想マシンの \(KLVM\' のトランザクション手数料は次のように計算されます。

```text
取引手数料 := (ガス使用総額) x (単価)
```

* 使用される `合計ガス` は、KLVMによってオペコードのガスコストと本質的なガスコストに基づいて計算される。
* `単価` は、Klaytnで定義されたガスの価格である。

この計算された取引手数料は、取引に応じて送信者またはエンタープライズアカウントの残高から差し引かれます。

## ガスおよび単価の概要 <a id="gas-and-unit-price-overview"></a>

### ガス <a id="gas"></a>

ブロックチェーンの状態を変更するすべてのアクションにはガスが必要です。 ノードがERC-20トークンを使用してKLAY送信などのユーザーのトランザクションを処理する場合。 またはコントラクトを実行するには、ユーザーが計算とストレージの使用料を支払わなければなりません。 支払い金額は必要な `ガス` の金額によって決まります。

`ガス` は、ユーザーの取引を処理するために必要な計算量を表す測定単位です。

### 単価： <a id="unit-price"></a>

`単価` は単一ガスの価格です。 単価\( `ガス価格`とも呼ばれる)は、ガバナンスによってシステム内で設定されます。 現在、ガス当たり250ston\(_、例えば_、250 x 10^9 peb\)に設定されており、ユーザーによって変更することはできません。 単価の現在の値は、 `klay.gasPrice` API を呼び出すことで取得できます。

Ethereumでは、ユーザーはトランザクションごとにガス価格を設定し、鉱山労働者は報酬を最大化するためにブロックに含める取引を選択します。 それは限られた資源のための入札のような何かである。 このアプローチは市場ベースであるために機能しています。 しかし、取引コストは変動し、多くの場合、実行を保証するには高すぎます。

この問題を解決するために、Klaytnは固定単価を使用しており、価格はガバナンス評議会によって調整することができます。 このポリシーにより、すべてのトランザクションが均等に処理され、実行が保証されます。 したがって、ユーザーは適切な単価を決定するのに苦労する必要はありません。

#### 単価に対するトランザクション検証 <a id="transaction-validation-against-unit-price"></a>

Klaytnは、Klaytnの単価に等しい、ユーザーが設定できるガス価格での取引のみ受け付けます。 Klaytnの単価とは異なるガス価格の取引を拒否します。

#### 単価エラー <a id="unit-price-error"></a>

エラーメッセージ `無効なユニット価格` は、トランザクションのガス価格がKlaytnのユニット価格と等しくない場合に返されます。

### 取引の交換 <a id="transaction-replacement"></a>

Klaytnは現在、単価を使用してトランザクションを交換する方法を提供していませんが、将来的にはトランザクション交換の異なるメソッドをサポートする可能性があります。 Ethereumでは、与えられたnonceを持つトランザクションをより高いガス価格で新しいトランザクションに置き換えることができることに注意してください。

## Klaytnのガステーブル  <a id="klaytns-gas-table"></a>

基本的に、KlaytnはEthereumとの互換性を維持しています。 したがって、KlaytnのガステーブルはEthereumのテーブルとかなり似ています。 しかし、Klaytnのユニークな特徴が存在するため、それらの特徴のためにいくつかの新しい定数があります。

{% hint style="success" %}
注: このドキュメントには、プロトコルアップグレードの有効化前に使用されるガス表が含まれています。 最新のドキュメントが必要な場合は、 [最新のドキュメント](transaction-fees.md) を参照してください。
{% endhint %}

### 一般手数料 <a id="common-fee"></a>

| 項目                | Gas   | Description                                        |
|:----------------- |:----- |:-------------------------------------------------- |
| G\_zero         | 0     | セットWzerの操作のために支払われたものはありません                        |
| G\_base         | 2     | セットWbaseの操作に支払うガスの量                                |
| G\_Verylow      | 3     | 設定されたWverylowの操作に支払うガスの量                           |
| G\_low          | 5     | セットWlowの操作に支払うガスの量                                 |
| G\_mid          | 8     | 設定されたWmidの操作に支払うガスの量                               |
| G\_hight        | 10    | セットの操作に支払うガスの量 Whigh                               |
| G\_blockhash    | 20    | BLOCKHASHの支払い方法                                    |
| G\_extcode      | 700   | 設定されたWextcodeの操作に支払うガスの量                           |
| G\_balance      | 400   | BALANCEオペレーションに支払うガスの量                             |
| G\_sload        | 200   | SLOADオペレーションに支払い済み                                 |
| G\_jumpdest     | 1     | JUMPDESTオペレーションに支払い済み                              |
| G\_sset         | 20000 | ストレージ値がゼロから非ゼロに設定されている場合のSSTORE操作の支払い済み            |
| G\_sreset       | 5000  | ストレージ値のゼロが変更されているか、またはゼロに設定されている場合、SSTORE操作で支払われます |
| G\_sclear       | 15000 | ストレージ値がゼロ以外からゼロに設定されている場合に返金カウンターに追加されました。         |
| R\_selfdestruct | 24000 | アカウントを自動破壊するために \(返金カウンターに追加された) の払い戻しを与えられました    |
| G\_selfdestruct | 5000  | SELFDESTRUCT運用に支払うガスの量                             |
| G\_create       | 32000 | CREATE操作で支払い済み                                     |
| G\_codeposit    | 200   | CREATE操作のための1バイトあたりの支払いで、コードの状態への配置に成功します          |
| G\_call         | 700   | 通話料金を支払う                                           |
| G\_callvalue    | 9000  | CALL操作の一部としてゼロ以外の値の転送に支払い済み                        |
| G\_callfroend   | 2300  | ゼロ以外の価値振替のためにGcallvalueから引かれた呼ばれる契約の禄金             |
| G\_newaccount   | 25000 | アカウントを作成するコールまたはSELFDESTRUCT操作の支払い済み               |
| G\_exp          | 10    | Expオペレーションの部分的支払い                                  |
| G\_expbyte      | 50    | EXP操作のdlog256\(指数\)eを掛けた時の一部の支払い                 |
| G\_memory       | 3     | メモリを拡大するときに追加の単語ごとに支払い済み                           |
| G\_txcreate     | 32000 | すべてのコントラクト作成トランザクションで支払い済み                         |
| G\_transaction  | 21000 | すべての取引に支払い済み                                       |
| G\_log          | 375   | ログ操作の部分的な支払い                                       |
| G\_logdata      | 8     | LOGオペレーションのデータで1バイトごとに支払い済み                        |
| G\_logtopic     | 375   | ログ操作のトピックごとに支払い済み                                  |
| G\_sha3         | 30    | SHA3操作ごとに支払い済み                                     |
| G\_sha3word     | 6     | SHA3操作にデータを入力するための単語ごとに支払い（切り上げ）                   |
| G\_copy         | 3     | コピーした単語を掛けた\*COPY演算の部分的な支払いは、切り上げられます            |
| G\_blockhash    | 20    | BLOCKHASHの支払い方法                                    |
| G\_extcodehash  | 400   | 契約コードの kecchak256 ハッシュを取得するための支払い済み                |
| G\_create2      | 32000 | CREATEと同一に操作しますが、異なる引数を使用するオペコードCREATE2用に支払い済み     |

### プリコンパイル済み契約 <a id="precompiled-contracts"></a>

事前にコンパイルされた契約は、通常、複雑な暗号計算を実行し、他の契約によって開始される特別な種類の契約です。

| 項目                      | Gas       | Description                    |
|:----------------------- |:--------- |:------------------------------ |
| EcrecoverGas            | 3000      | ECRecover操作を実行                 |
| Sha256BaseGas           | 60        | sha256 ハッシュ操作を実行します            |
| Sha256PerWordGas        | 12        | ​                              |
| Ripemd160BaseGas        | 600       | Ripemd160操作を実行                 |
| Ripemd160PerWordGas     | 120       | ​                              |
| IdentityBaseGas         | 15        | ​                              |
| WordGas IdentityPerGas  | 3         | ​                              |
| ModExpQuadCoeffDiv      | 20        | ​                              |
| Bn256AddGas             | 500       | Bn256 楕円曲線操作を実行                |
| Bn256ScalarMulgas       | 40000     | ​                              |
| Bn256PairingBaseGas     | 100000    | ​                              |
| Bn256PairingPerPointGas | 80000     | ​                              |
| VMLogBaseGas            | 100       | ノードのログファイルにログを書く - Klaytn only |
| VMLogPerByteGas         | 20        | Klaytn のみ                      |
| 料金支払者                   | 300       | 手数料支払者の住所を取得する - Klaytn のみ     |
| ValidateSenderGas       | 署名ごとに5000 | 送信者のアドレスと署名 - Klaytn のみ        |

XXXBaseGasとXXXPerWordGasを持つアイテムの合計ガス \(例: Sha256BaseGas, Sh256PerWordGas\) は次のように計算されます。

```text
TotalGas = XXXBaseGas + (単語数* XXXPerWordGas)
```

ValidateSenderGas は署名ごとに支払われる必要があります。

```text
TotalGas = 署名数 * ValidateSenderGas
```

### アカウント関連のガステーブル <a id="account-related-gas-table"></a>

| 項目                         | Gas   | Description                    |
|:-------------------------- |:----- |:------------------------------ |
| TxAccountCreationGasPerKey | 20000 | キーペア作成に必要なガス                   |
| TxValidationGasPerKey      | 15000 | 鍵検証に必要なガス                      |
| TxGasAccountUpdate         | 21000 | アカウントの更新に必要なガス                 |
| TxGasFeeDelegated          | 10000 | 手数料の委託に必要なガス                   |
| TxGasFeeDelegatedWithRatio | 15000 | 手数料の委託に必要なガス                   |
| TxGasCancel                | 21000 | 同じノンスのトランザクションをキャンセルするために必要なガス |
| TxGasValueTransfer         | 21000 | KLAY転送に必要なガス                   |
| TxGasContractExecution     | 21000 | コントラクト実行のためのベースガス              |
| TxDataGas                  | 100   | トランザクションごとに必要なガス               |

ペイロードデータのガスは以下のように計算されます

```text
GasPayload = number_of_bytes * TxDataGas
```

### トランザクションタイプのためのガス式 <a id="gas-formula-for-transaction-types"></a>

| TxType                 | Gas                                                    |
|:---------------------- |:------------------------------------------------------ |
| 従来の取引                  | TxGas + PayloadGas + KeyValidationGas                  |
| ValueTransfer          | TxGasValueTransfer + KeyValidationGas                  |
| ValueTransferMemo      | TxGasValueTransfer + PayloadGas + KeyValidationGas     |
| アカウント更新                | TxGasAccountUpdate + KeyCreationGas + KeyValidationGas |
| SmartContractDeploy    | TxGasContractCreation + PayloadGas + KeyValidationGas  |
| SmartContractExecution | TxGasContractExecution + PayloadGas + KeyValidationGas |
| キャンセル                  | TxGasCancel + KeyValidationGas                         |

KeyValidationGas は、キーの型に基づいて以下のように定義されています。

| キーの種類  | Gas                                               |
|:------ |:------------------------------------------------- |
| なし     | 該当なし                                              |
| Legacy | 0                                                 |
| 失敗     | 0                                                 |
| 公開     | 0                                                 |
| マルチシグ  | \(keys-1\) \* GasValidationPerKey \(15000\) |
| ロールベース | バリデーションで使用されるロール内のキーに基づいています                      |

KeyCreationGas は、キーの型に基づいて以下のように定義されます。

| キーの種類  | Gas                                                                                                                                                                                    |
|:------ |:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| なし     | 該当なし                                                                                                                                                                                   |
| Legacy | 0                                                                                                                                                                                      |
| 失敗     | 0                                                                                                                                                                                      |
| 公開     | GasCreationPerKey \(20000\)                                                                                                                                                          |
| マルチシグ  | \(keys\) \* GasCreationPerKey                                                                                                                                                      |
| ロールベース | 各役割の鍵に基づいて計算されたガス料金。 例えば、GasRoleTransaction = \(keys\) _GasCreationPerKey_ _GasRoleAccountUpdate = \(keys\)_ GasCreationPerKey GasRoleFeePayer = \(keys\) \* GasCreationPerKey |
