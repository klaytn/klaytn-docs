# 取引手数料 <a id="transaction-fees"></a>
現在のKlaytn仮想マシン\(KLVM\)のトランザクション手数料は以下のように計算されます。

```text
(トランザクション手数料) := (ガス使用料) * (ベース手数料)
```

* `Gas Used` は、KLVMによってオペコードのガスコストと本質的なガスコストに基づいて計算される。
* `基本手数料` は、取引に使用される実際のガス価格です。 これは、 `実効ガス価格` と同じ意味を持っています。

この計算された取引手数料は、取引に応じて送信者または手数料支払者の口座残高から差し引かれます。

## ガスとベース料金の概要 <a id="gas-and-base-fee-overview"></a>
### ガス <a id="gas"></a>
ブロックチェーンの状態を変更するすべてのアクションにはガスが必要です。 ノードが KIP-7 トークンを使用して、KLAY送信などのユーザのトランザクションを処理する場合。 またはコントラクトを実行するには、ユーザーが計算とストレージの使用料を支払わなければなりません。 支払金額は必要な `ガス` の金額で決まります。

`ガス` は、ユーザーの取引を処理するために必要な計算量を表す測定単位です。

### 動的ガス料金メカニズム <a id="dynamic-gas-fee-mechanism"></a>
Klaytn v1.9.0ハードフォーク以来、動的ガス料金メカニズムは既存の固定料金ポリシーを置き換えました。 動的ガス料金ポリシーは、ネットワークの乱用とストレージの過剰使用を防止することにより、ユーザーに安定したサービスを提供します。 ネットワーク状況によりガス料金は変化します。 7つのパラメータが `基本料金(ガス料金)` に影響を与えます :

1. PREVIOUS_BASE_FEE: 前のブロックの基本手数料
2. GAS_USED_FOR_THE_PREVIOUS_BLOCK: 前のブロックのすべてのトランザクション処理に使用されたガス
3. GAS_TARGET:基本料金の増減を決定するガス量 (現時点で3,000万)
4. MAX_BLOCK_GAS_USED_FOR_BASE_FEE: 暗黙のブロックガス制限で最大基準変更レートを適用します (現時点では6000万)
5. BASE_FEE_DELTA_REDUCING_DENOMINATOR: 基本料金の最大値をブロックごとに5%に変更する(現時点で20個をガバナンスにより後から変更することができる)。
6. UPPER_BOUND_BASE_FEE: 基本手数料の最大値(現時点では 750 ston、ガバナンスによって後から変更できます)
7. LOWER_BOUND_BASE_FEE: 基本手数料の最小値(現時点では25st、ガバナンスによって後から変更できます)

### 基本手数料 <a id="base-fee"></a>
このアルゴリズムの基本的な考え方は、使用されるガスがベースガスを超えた場合、 `ベース手数料` が上昇することです。 これは、ネットワーク内の取引数とプロセスで使用されるガスと密接に関連しています。 `基本手数料` には、手数料が無期限に増加または減少するのを防ぐための上限と下限があります。 また、 `基準手数料`の急激な変化を防ぐため、ガスのキャップと変動の調整値もあります。 値はガバナンスによって変更できます。

```text
(BASE_FEE_CHANGE_RATE) = (GAS_USED_FOR_THE_PREVIOUS_BLOCK - GAS_TARGET)
(ADJUSTED_BASE_FEE_CHANGE_RATE) = (BASE_FEE_CHANGE_RATE) / (GAS_TARGET) / (BASE_FEE_DELTA_REDUCING_DENOMINATOR)
(BASE_FEE_CHANGE_RANGE) = (PREVIOUS_BASE_FEE) * (ADJUSTED_BASE_FEE_CHANGE_RATE)
(BASE_FEE) = (PREVIOUS_BASE_FEE) + (BASE_FEE_CHANGE_RANGE) 
```

`基本手数料` は、ブロックごとに計算されます。毎秒変更される可能性があります。 単一のブロックからのトランザクションは、トランザクション手数料を計算するのに同じ `基本手数料` を使用します。 ブロック `基本手数料` より高いガス価格の取引のみがブロックに含めることができます。 各ブロックのトランザクション手数料の半分が書き込まれます(BURN_RATIO = 0.5はガバナンスによって変更できません)。

> 注:KlaytnをEthereumのEIP-1559から離す重要な機能は、それがヒントを持っていないことです。 Klaytn は First Come, First Served(FCFS)のトランザクションの原則に従います。

### 取引の交換 <a id="transaction-replacement"></a>

Klaytnは現在、単価を使用してトランザクションを交換する方法を提供していませんが、将来的にはトランザクション交換の異なるメソッドをサポートする可能性があります。 Ethereumでは、与えられたnonceを持つトランザクションをより高いガス価格で新しいトランザクションに置き換えることができることに注意してください。

## Klaytnのガステーブル  <a id="klaytns-gas-table"></a>

基本的に、KlaytnはEthereumとの互換性を維持しています。 したがって、KlaytnのガステーブルはEthereumのテーブルとかなり似ています。 しかし、いくつかの新しい定数を必要とする Klaytn 固有の機能があります。

{% hint style="success" %}
注: ガステーブルは `イスタンブールEVM` プロトコルのアップグレード、または「ハードフォーク」で変更されました。 前のドキュメントをご希望の場合は、 [前のドキュメント](transaction-fees-previous.md) をご参照ください。

`IstanbulEVM` protocol upgrade block number is as follows.
* Baobab Testnet: `#75373312`
* Cypress Mainnet: `#86816005`
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
| G\_balance      | 700   | BALANCEオペレーションに支払うガスの量                             |
| G\_sload        | 800   | SLOADオペレーションに支払い済み                                 |
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
| G\_extcodehash  | 700   | 契約コードの kecchak256 ハッシュを取得するための支払い済み                |
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
| Bn256AddGas             | 150       | Bn256 楕円曲線操作を実行                |
| Bn256ScalarMulgas       | 6000      | ​                              |
| Bn256PairingBaseGas     | 45000     | ​                              |
| Bn256PairingPerPointGas | 34000     | ​                              |
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

Blake2fガスコストは以下の式に基づいて計算されます。 `input` は、blake2f呼び出しの入力である。
```text
Gas = uint64(binary.BigEndian.Uint32(input[0:4]))
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

KeyValidationGas は、キーの型に基づいて以下のように定義されます。

| キーの種類  | Gas                                                                 |
|:------ |:------------------------------------------------------------------- |
| なし     | 該当なし                                                                |
| Legacy | 0                                                                   |
| 失敗     | 0                                                                   |
| 公開     | 0                                                                   |
| マルチシグ  | \(number of signatures - 1\) \* GasValidationPerKey \(15000\) |
| ロールベース | バリデーションで使用されるロール内のキーに基づいています                                        |

KeyCreationGas は、キーの型に基づいて以下のように定義されます。

| キーの種類  | Gas                                                                                                                                                                                    |
|:------ |:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| なし     | 該当なし                                                                                                                                                                                   |
| Legacy | 0                                                                                                                                                                                      |
| 失敗     | 0                                                                                                                                                                                      |
| 公開     | GasCreationPerKey \(20000\)                                                                                                                                                          |
| マルチシグ  | \(keys\) \* GasCreationPerKey                                                                                                                                                      |
| ロールベース | 各役割の鍵に基づいて計算されたガス料金。 例えば、GasRoleTransaction = \(keys\) _GasCreationPerKey_ _GasRoleAccountUpdate = \(keys\)_ GasCreationPerKey GasRoleFeePayer = \(keys\) \* GasCreationPerKey |

