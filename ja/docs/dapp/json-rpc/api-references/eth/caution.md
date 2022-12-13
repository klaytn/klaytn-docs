---
description: >-
  Klaytnでeth名前空間apisを使用する際の注意。
---

# ネームスペースの注意 <a id="namespace-caution"></a>

Klaytn は `eth` 名前空間 API をサポートしているため、イーサリアムベースの SDK やツールを使用する開発者は、 既存のプロジェクトを Klaytn に簡単に移行できるようになりました。 (たとえば、Ethereumツール内のエンドポイント URLを置き換えて、Klaytn ノードを指すことができます。

しかし、KlaytnとEthereumの間に存在する基本的なデザインの違いにより、 いくつかのAPIは完全にサポートされることができません。 （例：一部のフィールドは常にゼロの値を持っています）

このドキュメントでは、これらの API の制限について説明します。

## ブロックヘッダー <a id="block_header"></a>

関連API: [eth_getHeaderByNumber](./block.md#eth_getheaderbynumber), [eth_getHeaderByHash](./block.md/#eth_getheaderbyhash).

* :warning: の説明をよくお読みください。
* 説明内の :white_check_mark: アイコンは、Ethereumと同じ方法で使用されているフィールドを示します。

| イーサリアムヘッダーフィールド  | Klaytnヘッダフィールド     | Description                                                                                                                                                                                                                                                                                                      |
| ---------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| baseFeePerGas    | (追加)               | :warning: Klaytn には baseFeePerGas スキームがないため、このフィールドは常に `0x0` の値を持ちます。                                                                                                                                                                                                                                            |
| 難易度：             | (追加)               | :warning: このフィールドは、Klaytn ヘッダーの `blockScore` に対応します。これは、 `0x1` に固定されています。 これは、KlaytnのコンセンサスメカニズムがPoWに基づいていないため、ブロック難易度の技術的概念がKlaytnコアには適用できないことを示しています。                                                                                                                                                          |
| extraData        | extraData          | :warning: この項目は常に空の値を示す `0x` を持っています。 Owing to the fact that Klaytn's `extraData` contains consensus data such as validators addresses, validators signatures, and proposer signature, it is not applicable to `eth` namespace API.                                                                              |
| gasLimit         | (追加)               | :warning: このフィールドは常に値 `0xe8d4a50fff`(=`999999999999` の小数点以下) を持っています。 これは、KlaytnにGasLimitがないため、任意の数字です。 執筆時点では、この数字はEthereumの [ブロックガス制限の30倍です](https://ethereum.org/en/developers/docs/gas/#block-size)。 詳細については、 [計算コスト](../../../../klaytn/design/computation/computation-cost/computation-cost.md) を参照してください。 |
| gasUsed          | gasUsed            | :white_check_mark: このブロック内のトランザクションで使用されるガスの合計に等しいスカラー値。                                                                                                                                                                                                                                                       |
|                  | governanceData(省略) | :warning: このフィールドはEthereum Block Headerには存在しないため、省略されます。                                                                                                                                                                                                                                                         |
| hash             | hash               | :white_check_mark: ブロックのハッシュ値。                                                                                                                                                                                                                                                                                 |
| logsBloom        | logsBloom          | :white_check_mark: ブロックのログのブルームフィルター。 `ブロック保留中の場合は null`                                                                                                                                                                                                                                                       |
| miner            | (追加)               | :warning: This field returns the block proposer's address, because Klaytn's [consensus mechanism](../../../../klaytn/design/consensus-mechanism.md) is [PBFT](../../../../klaytn/design/consensus-mechanism.md#pbft-practical-byzantine-fault-tolerance), which has a block proposer instead of miners.          |
| mixHash          | (追加)               | :warning: KlaytnのコンセンサスメカニズムはPoWに基づいていないため、このフィールドは常にゼロハッシュ(`0x00...`)を持ちます。                                                                                                                                                                                                                                     |
| nonce            | (追加)               | :warning: KlaytnのコンセンサスメカニズムはPoWに基づいていないため、このフィールドは常にゼロNonce (`0x00...`) を持っています。                                                                                                                                                                                                                                |
| 数値               | 数値                 | :white_check_mark: ブロック番号。                                                                                                                                                                                                                                                                                     |
| parentHash       | parentHash         | :white_check_mark: 親ブロックのハッシュ。                                                                                                                                                                                                                                                                                 |
| receiptsRoot     | receiptsRoot       | :white_check_mark: ブロックのレシートのルートが試行されました。                                                                                                                                                                                                                                                                      |
|                  | 報酬（省略）             | :warning: このフィールドはEthereum Block Headerには存在しないため、省略されます。                                                                                                                                                                                                                                                         |
| sha3Uncles       | (追加)               | :warning: このフィールドは常に `0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347`を持っています。 これは空のブロックヘッダを含むリストのRLPエンコードバイトのKecchak256ハッシュで、Klaytnには叔父ブロックがないためです。                                                                                                                                          |
| サイズ              | サイズ                | :white_check_mark: このブロックのサイズをバイトで指定します。                                                                                                                                                                                                                                                                       |
| stateRoot        | stateRoot          | :white_check_mark: ブロックの最終状態のルート。                                                                                                                                                                                                                                                                              |
| timestamp        | timestamp          | :white_check_mark: ブロックがCollatedされた時の unix タイムスタンプ。                                                                                                                                                                                                                                                            |
|                  | timestampFoS(省略)   | :warning: このフィールドはEthereum Block Headerには存在しないため、省略されます。                                                                                                                                                                                                                                                         |
| totalDifficulty  | (追加)               | :warning: クエリブロックまでのチェーンの難易度の合計。                                                                                                                                                                                                                                                                                 |
| transactionsRoot | transactionsRoot   | :white_check_mark: ブロックのトランザクションのルート。                                                                                                                                                                                                                                                                          |


## ブロック <a id="block"></a>

Related APIs: [eth_getBlockByHash](./block.md/#eth_getblockbyhash), [eth_getBlockByNumber](./block.md/#eth_getblockbynumber), [eth_getUncleByBlockHashAndIndex](./block.md/#eth_getunclebyblockhashandindex), [eth_getUncleByBlockNumberAndIndex](./block.md/#eth_getunclebyblocknumberandindex).

Block にはヘッダのフィールドが含まれており、ヘッダはすでに上記でカバーされています。 このセクションでは、ヘッダー以外のブロックの残りのフィールドについて説明します。

* :warning: の説明をよくお読みください。
* 説明内の :white_check_mark: アイコンは、Ethereumと同じ方法で使用されているフィールドを示します。

| イーサリアムヘッダーフィールド | Klaytnヘッダフィールド | Description                                                                      |
| --------------- | -------------- | -------------------------------------------------------------------------------- |
|                 | voteData(省略)   | :warning: このフィールドはEthereum Blockに存在しないため、省略されます。                                 |
| おじさんたち          | (追加)           | :warning: このフィールドは常に値 `[]` を持っています。なぜなら、Klaytn コアには叔父ブロックの技術的な概念がないからです。         |
| 取引              | 取引             | :white_check_mark: トランザクションオブジェクトの配列、または最後に与えられたパラメータに応じた32 Bytesトランザクションハッシュ。 |


## 取引 <a id="transaction"></a>

関連API: [eth_getTransactionByHash](./transaction.md/#eth_gettransactionbyhash), [eth_getTransactionByBlockHashAndIndex](./transaction.md/#eth_gettransactionbyblockhashandindex), [eth_getTransactionByBlockNumberAndIndex](./transaction.md/#eth_gettransactionbyblocknumberandindex), [eth_pendingTransactions](./transaction.md/#eth_pendingtransactions).

Klaytnには多くのトランザクションタイプがあり、データ構造のフィールドは型によって異なります。

So you have to check how various types of Klaytn transaction are converted as Ethereum transaction because during converting process some fields are omitted or added with zero or dummy values. つまり、 変換中にいくつかの重要な情報(Klaytnの面で)が失われます。

このドキュメントでは、EthereumLegacyTransaction を [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) の前にEthereumトランザクションフォーマットとして定義しています。

eth名前空間JSON-RPCAPIを介してKlaytnトランザクションをクエリしようとすると、KlaytnトランザクションはEthereum Legacyトランザクションタイプとして リターンします。

この文書では、変換プロセスの詳細について説明します (Klaytn transaction -> Ethereum Legacy Transaction)。

* :warning: の説明をよくお読みください。
* 説明内の :white_check_mark: アイコンは、Ethereumと同じ方法で使用されているフィールドを示します。

### 一般フィールド

さまざまな Klaytn トランザクションの種類にかかわらず、共通のフィールドがあります。 このセクションでは、共通フィールドがEthereum Legacy Transactionとしてどのように機能するかについて説明します。

| イーサリアムレガシートランザクションフィールド | Klaytn トランザクションフィールド                                                              | Description                                                                                                                                                                                                      |
| ----------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash               | blockHash                                                                         | :white_check_mark: ブロックハッシュ。                                                                                                                                                                                   |
| blockNumber             | blockNumber                                                                       | :white_check_mark: ブロック番号                                                                                                                                                                                      |
| from                    | from                                                                              | :white_check_mark: 送信者のアドレス                                                                                                                                                                                    |
| ガス                      | ガス                                                                                | :white_check_mark: ガスが送信者から提供されました。                                                                                                                                                                            |
| gasPrice                | gasPrice                                                                          | :warning: Klaytnのコンテキストでは [単価](../../../../klaytn/design/transaction-fees/transaction-fees.md#unit-price) とも呼ばれ、この値はガバナンスプロセスを通じてシステム内で決定されます。                                                                   |
| hash                    | hash                                                                              | :white_check_mark: トランザクションハッシュ                                                                                                                                                                                |
| input                   | （以下の項で取り上げる）                                                                      | このフィールドの説明は以下の詳細なトランザクション項目で説明されています。                                                                                                                                                                            |
| nonce                   | nonce                                                                             | :white_check_mark: この前の送信者によって行われたトランザクションの数。                                                                                                                                                                  |
|                         | [senderTxHash](../../../../klaytn/design/transactions/README.md#sendertxhash)(省略) | :warning: このフィールドはEthereum Legacy Transactionには存在しないため、省略されます。                                                                                                                                                   |
|                         | 署名（省略）                                                                            | :warning: このフィールドはEthereum Legacy Transactionには存在しないため、省略されます。                                                                                                                                                   |
| to                      | （以下の項で取り上げる）                                                                      | このフィールドの説明は以下の詳細なトランザクション項目で説明されています。                                                                                                                                                                            |
| transactionIndex        | transactionIndex                                                                  | :warning: Ethereumとほぼ同じですが、Ethereumとは異なり、Klaytnは保留中のときと同じように整数を返します。                                                                                                                                             |
| 値                       | （以下の項で取り上げる）                                                                      | このフィールドの説明は以下の詳細なトランザクション項目で説明されています。                                                                                                                                                                            |
| タイプ                     | type(converted)                                                                   | :warning: In Klaytn, `type` returns the transaction type in string (e.g. `"LegacyTransaction"`), but it has been converted to hexadecimal (e.g. `0x0`) to match Ethereum. Klaytnでのみ有効なトランザクションタイプは常に `0x0`を返します。 |
|                         | typeInt(省略)                                                                       | :warning: このフィールドはEthereum Legacy Transactionには存在しないため、省略されます。                                                                                                                                                   |
| v                       | (追加)                                                                              | :warning: Klaytnはマルチシグをサポートしているため、Klaytnのトランザクションは複数の署名を持つことができます。 `署名[0].V` は フィールド `v` の値として使用されます。                                                                                                            |
| r                       | (追加)                                                                              | :warning: Klaytnはマルチシグをサポートしているため、Klaytnのトランザクションは複数の署名を持つことができます。 `署名[0].R` は フィールド `r` の値として使用されます。                                                                                                            |
| s                       | (追加)                                                                              | :warning: Klaytnはマルチシグをサポートしているため、Klaytnのトランザクションは複数の署名を持つことができます。 `署名[0].S` はフィールド `s` の値として使用されます。                                                                                                             |

### [手数料委任のための一般フィールド](../../../../klaytn/design/transactions/fee-delegation.md)
さまざまな Klaytn [FeeDelegation](../../../../klaytn/design/transactions/fee-delegation.md) トランザクションタイプに関係なく、共通のフィールドがあります。 このセクションでは、feeDelegation(上記の共通フィールドを除く) がEthereum Legacy Transactionとして機能する方法について説明します。

| イーサリアムレガシートランザクションフィールド | Klaytn FeeDelegation Transaction フィールド | Description                                                    |
| ----------------------- | -------------------------------------- | -------------------------------------------------------------- |
|                         | feePayer(省略)                           | :warning: このフィールドはEthereum Legacy Transactionには存在しないため、省略されます。 |
|                         | feePayerSignatures(省略)                 | :warning: このフィールドはEthereum Legacy Transactionには存在しないため、省略されます。 |

### [PartialFeeDelegation](../../../../klaytn/design/transactions/partial-fee-delegation.md) の共通フィールド
さまざまな Klaytn [PartialFeeDelegation](../../../../klaytn/design/transactions/partial-fee-delegation.md) トランザクションタイプに関係なく、共通のフィールドがあります。 このセクションでは、partialFeeDelegation(上記の共通フィールドを除く) がEthereum Legacy Transactionとして機能する方法について説明します。

| イーサリアムレガシートランザクションフィールド | Klaytn PartialFeeDelegation トランザクションフィールド | Description                                                    |
| ----------------------- | ----------------------------------------- | -------------------------------------------------------------- |
|                         | feeRatio(省略)                              | :warning: このフィールドはEthereum Legacy Transactionには存在しないため、省略されます。 |

### トランザクションタイプごとに異なるフィールド
#### 従来の取引

| イーサリアムレガシートランザクションフィールド | Klaytn LegacyTransaction Field | Description                                                                  |
| ----------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| input                   | input                          | :white_check_mark: トランザクションとともに送信されたデータ。                                   |
| to                      | to                             | :white_check_mark: 受信者のアドレス `null` when its contract creation transaction. |
| 値                       | 値                              | :white_check_mark: 値は Peb で転送されました。                                        |

**Klaytn LegacyTransaction** は以下のようなEthereum Legacy Transactionとして機能します。
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    "gas": "0x204c8e",
    "gasPrice": "0x5d21dba00",
    "hash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "input": "0xe2bbb1580...",
    "nonce": "0x22aa",
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "r": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", /** added */
    "s": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69", /** added */
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 0, omitted */
    "value": "0x0"
  }
}
```

#### ValueTransfer

| イーサリアムレガシートランザクションフィールド | Klaytn ValueTransfer トランザクションフィールド | Description                                                                                      |
| ----------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| input                   | (追加)                               | :warning: このフィールドは常に値 `0x` を持っています。これは、このフィールドはKlaytn ValueTransfer トランザクションに存在しないため、空の入力を意味します。 |
| to                      | to                                 | :white_check_mark: 受信者のアドレス                                                                    |
| 値                       | 値                                  | :white_check_mark: 値は Peb で転送されました。                                                            |

**Klaytn ValueTransfer Transaction** は以下のようなEthereum Legacy Transactionとして機能します。
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    "gas": "0x204c8e",
    "gasPrice": "0x5d21dba00",
    "hash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "input": "0x", /** added */
    "nonce": "0x22aa",
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "r": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", /** added */
    "s": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69", /** added */
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 8, omitted */
    "value": "0x49249695"
  }
}
```

#### ValueTransferMemo

| イーサリアムレガシートランザクションフィールド | Klaytn ValueTransferMemo トランザクションフィールド | Description                                |
| ----------------------- | -------------------------------------- | ------------------------------------------ |
| input                   | input                                  | :white_check_mark: トランザクションとともに送信されたデータ。 |
| to                      | to                                     | :white_check_mark: 受信者のアドレス              |
| 値                       | 値                                      | :white_check_mark: 値は Peb で転送されました。      |

**Klaytn ValueTransferMemo Transaction** は以下のようなEthereum Legacy Transactionとして提供されます。
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    "gas": "0x204c8e",
    "gasPrice": "0x5d21dba00",
    "hash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "input": "0x32104204104", 
    "nonce": "0x22aa",
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "r": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", /** added */
    "s": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69", /** added */
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 16, omitted */
    "value": "0x49249695"
  }
}
```

#### SmartContractDeploy

| イーサリアムレガシートランザクションフィールド | Klaytn SmartContractDeploy トランザクションフィールド | Description                                                                                |
| ----------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------ |
|                         | codeFormat(省略)                           | :warning: このフィールドはEthereum Legacy Transactionには存在しないため、省略されます。                             |
|                         | humanReadable(省略)                        | :warning: このフィールドはEthereum Legacy Transactionには存在しないため、省略されます。                             |
| input                   | input                                    | :white_check_mark: トランザクションとともに送信されたデータ。                                                 |
| to                      | to                                       | :white_check_mark: 受信者のアドレス このトランザクションはコントラクト作成トランザクションであるため、このフィールドは常に値 `null` を持っています。 |
| 値                       | 値                                        | :white_check_mark: 値は Peb で転送されました。                                                      |

**Klaytn SmartContractDeploy Transaction** は以下のようなEthereum Legacy Transactionとして機能します。
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    /** "codeFormat": "0x0", omitted */
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    /** "humanReadable": false, omitted */
    "input": "0x6080...",
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "null",
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 40, omitted */
    "value": "0x0"
  }
}
```

#### SmartContractExecution

| イーサリアムレガシートランザクションフィールド | Klaytn SmartContractactionトランザクションフィールド | Description                                |
| ----------------------- | --------------------------------------- | ------------------------------------------ |
| input                   | input                                   | :white_check_mark: トランザクションとともに送信されたデータ。 |
| to                      | to                                      | :white_check_mark: スマートコントラクトのアドレス。      |
| 値                       | 値                                       | :white_check_mark: 値は Peb で転送されました。      |

**Klaytn SmartContractExecution Transaction** は以下のようなEthereum Legacy Transactionとして機能します。
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    "input": "0x6080...",
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x6e71df210046227af62323ae35c0ea5e606a349c",
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 48, omitted */
    "value": "0x6449e84e47a8a80000"
  }
}
```

#### アカウント更新

| イーサリアムレガシートランザクションフィールド | Klaytn AccountUpdate トランザクションフィールド | Description                                                                                                             |
| ----------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
|                         | key(省略)                            | :warning: このフィールドはEthereum Legacy Transactionには存在しないため、省略されます。                                                          |
| input                   | (追加)                               | :warning: このフィールドは常に値 `0x` を持っています。これは、このフィールドはKlaytn AccountUpdate トランザクションに存在しないため、空の入力を意味します。                        |
| to                      | (追加)                               | :warning: このフィールドは `の` と常に同じアドレスを持っています。なぜなら、このフィールドは Klaytn AccountUpdate トランザクションに存在せず、 `から` の値を与えることが最も意味のあるものだからです。 |
| 値                       | (追加)                               | :warning: このフィールドは、Klaytn AccountUpdate トランザクションにこのフィールドが存在しないため、常に値 `0x0` を持っています。                                     |

**Klaytn AccountUpdate Transaction** は以下のようなEthereum Legacy Transactionとして機能します。
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    /** "key": "0x02a103bf900d727fcbb4baa9f9ffc840ba947af7c7dae52ad6ef453ab5d50942e18b2f", omitted */
    "input": "0x6080...",
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d", /** added */
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 32, omitted */
    "value": "0x6449e84e47a8a80000"
  }
}
```

#### キャンセル

| イーサリアムレガシートランザクションフィールド | Klaytn トランザクションキャンセルフィールド | Description                                                                                                                    |
| ----------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| input                   | (追加)                      | :warning: このフィールドは常に値 `0x` を持っています。これは、このフィールドはKlaytn Cancel トランザクションに存在しないため、空の入力を意味します。                                      |
| to                      | (追加)                      | :warning: このフィールドは常に `from` と同じアドレスを持っています。なぜなら、このフィールドはKlaytn Cancel トランザクションに存在せず、 `から` のアドレスが最も意味のあるものとしてこのフィールドの値を与えるからです。 |
| 値                       | (追加)                      | :warning: このフィールドは、Klaytn Cancel トランザクションに存在しないため、常に値 `0x0` を持っています。                                                           |

**Klaytn Cancel Transaction** は以下のようなEthereum Legacy Transactionとして機能します。
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
    "blockNumber": "0x4857712",
    "from": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d",
    "gas": "0x5b8d80",
    "gasPrice": "0x5d21dba00",
    "hash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
    "input": "0x", /** added */
    "nonce": "0x2",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x760fcf5159263b7cf39b0751e7d2bb008d09147d", /** added */
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 56, omitted */
    "value": "0x0" /** added */
  }
}
```

#### ChainDataAnchoring

| イーサリアムレガシートランザクションフィールド | Klaytn ChainDataAnchoring トランザクションフィールド | Description                                                                                                                    |
| ----------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| input                   | input                                   | :white_check_mark: トランザクションとともに送信されたデータ。                                                                                     |
|                         | inputJSON(省略)                           | :warning: このフィールドはEthereum Legacy Transactionには存在しないため、省略されます。                                                                 |
| to                      | (追加)                                    | :warning: このフィールドは常に `from` と同じアドレスを持っています。なぜなら、このフィールドはKlaytn ChainDataAnchoring トランザクションに存在せず、 `から` の値を与えることが最も意味のあるものだからです。 |
| 値                       | (追加)                                    | :warning: このフィールドは、Klaytn ChainDataAnchoring トランザクションに存在しないため、常に値 `0x0` を持っています。                                               |

**Klaytn ChainDataAnchoring Transaction** は以下のようなEthereum Legacy Transactionとして機能します。
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xfec3dab64552e3148d8dbf8fba0bdcc4f170b458683065cf47e67c35e45ac395",
    "blockNumber": "0x3052bb2",
    "from": "0x89ecb00d2a52f2d4ead1578d60928a19ad3224bd",
    "gas": "0x186a0",
    "gasPrice": "0x5d21dba00",
    "hash": "0x9d64d2fb416cb4e4c2c9a4575b627d291c5139d477356af767f35dc5a887c138",
    "input": "0xf8129412941294129.",
    /** "inputJSON": {
      "blockHash": "0x2b69e9532eddd9a25dc48c53253d8bc93a29770362a8f778fe799e3493cad626",
      "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "parentHash": "0x094084ac3580231708c2a2dcbcf39f712a61dcc070b76a7eaaaf8b6f07a9549c",
      "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "stateRoot": "0x768b8ae0874e4ac5e3ef9bccbeb417b4207d562b85dfb30ecf9cc8344209a5e6",
      "blockNumber": 43372800,
      "blockCount": 86400,
      "txCount": 53777
    }, omitted */
    "nonce": "0x278",
    /** "senderTxHash": "0x104e27f4cd69215f0080eca9f51bf06232c107b3209e16a7c004c7b5e619c846", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "r": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9", /** added */
    "s": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec", /** added */
    "to": "0x89ecb00d2a52f2d4ead1578d60928a19ad3224bd", /** added */
    "transactionIndex": "0x6",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    "v": "0x4055" /** added */
    /** "typeInt": 72, omitted */
    "value": "0x0" /** added */
  }
}
```

## char@@0char@@1char@@2 <a id="transaction_receipt"></a>

関連API: [eth_getTransactionReceipt](./transaction.md/#eth_gettransactionreceipt).

デフォルトでは、Klaytn Transaction Receiptのフィールドは、トランザクションの種類によって異なります。 Klaytnには多くのトランザクションタイプがあるため、トランザクション受領のフィールドはトランザクションタイプによって異なります。

名前空間JSON-RPC apisを介してKlaytnトランザクションレシートをクエリしようとすると、 Klaytn TransactionReceiptはEthereumトランザクションレシートとして返されます。

この文書では、変換プロセスの詳細について説明します(Klaytn Transaction Receipt -> Ethereum Transaction Receipt)。

* :warning: の説明をよくお読みください。
* 説明内の :white_check_mark: アイコンは、Ethereumと同じ方法で使用されているフィールドを示します。

### 一般フィールド

さまざまな Klaytn トランザクションの種類にかかわらず、共通のフィールドがあります。 (Klaytn Transaction Receiptのフィールドはトランザクションの種類に基づいて様々であることを忘れないでください。

このセクションでは、一般的なフィールドがEthereumトランザクション領収書として機能する方法について説明します。

| Ethereumトランザクション領収書フィールド | Klaytn トランザクション領収書フィールド                                                           | Description                                                                                                                                                                                                |
| ------------------------ | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash                | blockHash                                                                         | :white_check_mark: ブロックハッシュ。                                                                                                                                                                             |
| blockNumber              | blockNumber                                                                       | :white_check_mark: ブロック番号                                                                                                                                                                                |
| コントラクトアドレス               | コントラクトアドレス                                                                        | :white_check_mark: トランザクションがコントラクト作成の場合、コントラクトアドレスが作成されました。それ以外の場合は - `null`。                                                                                                                            |
| 累積ガス使用                   | (追加)                                                                              | :warning: この取引がブロック内で実行されたときに使用されるガスの合計量 これはEthereumフィールドと同じ意味で提供されています。                                                                                                                                   |
| effectiveGasPrice        | (追加)                                                                              | :warning: Klaytnは一定のガス価格ポリシーを使用しているため、gasPrice値が返されます。 gasPrice( [Unit Price](../../../../klaytn/design/transaction-fees/transaction-fees.md#unit-price)とも呼ばれます)はガバナンスによってシステムに設定されます。                     |
| from                     | from                                                                              | :white_check_mark: 送信者のアドレス                                                                                                                                                                              |
|                          | gas(省略)                                                                           | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。                                                                                                                                                   |
| gasUsed                  | gasUsed                                                                           | :white_check_mark: この特定の取引だけで使用されるガスの量                                                                                                                                                                   |
|                          | gasPrice(省略)                                                                      | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。                                                                                                                                                   |
| ログ                       | ログ                                                                                | :white_check_mark: トランザクションによって生成されたログオブジェクトの配列。                                                                                                                                                         |
| logsBloom                | logsBloom                                                                         | :white_check_mark: ライトクライアントが関連するログをすばやく取得できるようにブルームフィルター。                                                                                                                                               |
|                          | nonce(省略)                                                                         | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。                                                                                                                                                   |
|                          | [senderTxHash](../../../../klaytn/design/transactions/README.md#sendertxhash)(省略) | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。                                                                                                                                                   |
|                          | 署名（省略）                                                                            | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。                                                                                                                                                   |
| ステータス                    | ステータス                                                                             | :white_check_mark: 1（成功）または0（失敗）のいずれかです。                                                                                                                                                                 |
| to                       | （以下の項で取り上げる）                                                                      | このフィールドの説明は以下の詳細なトランザクション項目で説明されています。                                                                                                                                                                      |
| transactionHash          | transactionHash                                                                   | :white_check_mark: トランザクションハッシュ。                                                                                                                                                                         |
| transactionIndex         | transactionIndex                                                                  | :warning: Ethereumとほぼ同じですが、Ethereumとは異なり、Klaytnは保留中のときと同じように整数を返します。                                                                                                                                       |
| タイプ                      | type(converted)                                                                   | :warning: このフィールドの値とデータ型が変換されます。 The type of this field is a string(e.g. `"LegacyTransaction"`) in Klaytn but it is converted and served as hexadecimal(e.g. `0x`) just like Ethereum Transaction Receipt. |
|                          | typeInt(省略)                                                                       | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。                                                                                                                                                   |

### [手数料委任のための一般フィールド](../../../../klaytn/design/transactions/fee-delegation.md)
さまざまな Klaytn [FeeDelegation](../../../../klaytn/design/transactions/fee-delegation.md) トランザクションタイプに関係なく、共通のフィールドがあります。 (Klaytn Transaction Receiptのフィールドはトランザクションの種類に基づいて様々であることを忘れないでください。

このセクションでは、feeDelegation(上記の共通フィールドを除く) がEthereumトランザクション領収書として提供される方法について説明します。

| Ethereumトランザクション領収書フィールド | Klaytn FeeDelegation Transaction Receipt Field | Description                                              |
| ------------------------ | ---------------------------------------------- | -------------------------------------------------------- |
|                          | feePayer(省略)                                   | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。 |
|                          | feePayerSignatures(省略)                         | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。 |

### [PartialFeeDelegation](../../../../klaytn/design/transactions/partial-fee-delegation.md) の共通フィールド
さまざまな Klaytn [PartialFeeDelegation](../../../../klaytn/design/transactions/partial-fee-delegation.md) トランザクションタイプに関係なく、共通のフィールドがあります。 (Klaytn Transaction Receiptのフィールドはトランザクションの種類に基づいて様々であることを忘れないでください。

このセクションでは、partialFeeDelegation(上記の共通フィールドを除く) がEthereumトランザクション領収書として提供される方法について説明します。

| Ethereumトランザクション領収書フィールド | Klaytn PartialFeeDelegation Transaction Receipt フィールド | Description                                              |
| ------------------------ | ----------------------------------------------------- | -------------------------------------------------------- |
|                          | feeRatio(省略)                                          | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。 |

### トランザクションタイプごとに異なるフィールド
#### レガシートランザクションの領収書：

| Ethereumトランザクション領収書フィールド | Klaytn LegacyTransaction Receipt フィールド | Description                                                                  |
| ------------------------ | -------------------------------------- | ---------------------------------------------------------------------------- |
|                          | input(省略)                              | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。                     |
| to                       | to                                     | :white_check_mark: 受信者のアドレス `null` when its contract creation transaction. |
|                          | 値(省略)                                  | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。                     |

**Klaytn LegacyTransaction Receipt** は以下のようにEthereumトランザクション領収書として提供されています。
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
    "blockNumber": "0x47ef00c",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0xbd4fa032e6afe41cacde8e3292fb129b857bfca8",
    /** "gas": "0x204c8e", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x1c278",
    /** "input": "0xe2b...", omitted */
    "logs": [
      {
        "address": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
        "topics": [
          "0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15",
          "0x000000000000000000000000bd4fa032e6afe41cacde8e3292fb129b857bfca8",
          "0x0000000000000000000000000000000000000000000000000000000000000003"
        ],
        "data": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "blockNumber": "0x47ef00c",
        "transactionHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
        "transactionIndex": "0xe",
        "blockHash": "0x0f5fa35be72c9c49a60c936ccdf0e85210c12ea227e679f32a6dc6c84c3cb859",
        "logIndex": "0xa",
        "removed": false
      }
    ],
    "logsBloom": "0x00...",
    /** "nonce": "0x22aa", omitted */
    /** "senderTxHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058", omitted */
    /** "signatures": [ 
      { 
        "V": "0x4055", 
        "R": "0xcf815d41522d4c95d1b86b956c1101b8fef9d446358e7675e8db467ada6b7549", 
        "S": "0x39b7e32b8d689737f57ef005f13f9c65abaf89d8444b7f286a43d7df6c684d69" 
      } 
    ], omitted */
    "status": "0x1",
    "to": "0x0cddc42b218a109ca4cf93cbef1f8740d72af7b2",
    "transactionHash": "0x6ad3b34e12242a2ef8daadea7ebf538f735d9cad400e1a8745263c877cfb9058",
    "transactionIndex": "0xe",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 0, omitted */
    /** "value": "0x0" omitted */
  }
}
```

#### ValueTransfer Transaction Receipt

| Ethereumトランザクション領収書フィールド | Klaytn ValueTransfer Transaction Receipt Field | Description                                              |
| ------------------------ | ---------------------------------------------- | -------------------------------------------------------- |
| to                       | to                                             | :white_check_mark: 受信者のアドレス                            |
|                          | 値(省略)                                          | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。 |

**Klaytn ValueTransfer Transaction Receipt** は以下のようにイーサリアムのTransaction Receiptとして提供されています。
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xa500c5bc0e0410a60961fca0a4beceb19f1af9a42c5cbcfad7818865eb0ee114",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5994af2bfe0bdaf7f66ec3d7924e5647094718bf",
    "transactionHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 8, omitted */
    /** "value": "0xa5c40c07eb33e87000" omitted */
  }
}
```

#### ValueTransferMemo Transaction Receipt

| Ethereumトランザクション領収書フィールド | Klaytn ValueTransferMemo Transaction Receipt Field | Description                                              |
| ------------------------ | -------------------------------------------------- | -------------------------------------------------------- |
|                          | input(省略)                                          | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。 |
| to                       | to                                                 | :white_check_mark: 受信者のアドレス                            |
|                          | 値(省略)                                              | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。 |

**Klaytn ValueTransferMemo Transaction** は以下のようにイーサリアムトランザクションレシートとして提供されています。
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xa500c5bc0e0410a60961fca0a4beceb19f1af9a42c5cbcfad7818865eb0ee114",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "input": "0x32142912492149122", omitted */
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5994af2bfe0bdaf7f66ec3d7924e5647094718bf",
    "transactionHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 16, omitted */
    /** "value": "0xa5c40c07eb33e87000" omitted */
  }
}
```

#### SmartContractDeploy Transaction Receipt

| Ethereumトランザクション領収書フィールド | Klaytn SmartContractDeploy Transaction Receipt Field | Description                                                                                |
| ------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------ |
|                          | codeFormat(省略)                                       | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。                                   |
|                          | humanReadable(省略)                                    | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。                                   |
|                          | input                                                | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています                                    |
| to                       | to                                                   | :white_check_mark: 受信者のアドレス このトランザクションはコントラクト作成トランザクションであるため、このフィールドは常に値 `null` を持っています。 |
|                          | 値                                                    | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています                                    |

**Klaytn SmartContractDeploy Transaction Receipt** は以下のようにEthereum Transaction Receiptとして提供されます。
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xda357820b1d70922422219dd6d2d3507f4af32588b90a0a7f825ce36887f2de6",
    "blockNumber": "0x487d166",
    /** "codeFormat": "0x0", omitted */
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "humanReadable": false, omitted */
    /** "input": "0x6080...", omitted */
    "logs": [
      {
        "address": "0xf1ac00f758a5baf71507e1d62e2c9dab6aaaf49f",
        "topics": [
          "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          "0x000000000000000000000000760fcf5159263b7cf39b0751e7d2bb008d09147d"
        ],
        "data": "0x",
        "blockNumber": "0x4857712",
        "transactionHash": "0xbf230e13023aad3c3c758b07ee3d2f7eaac45b301972f1bfa49a5bf49a1ccd7c",
        "transactionIndex": "0x6",
        "blockHash": "0x93ec6f013194d4a16453fd17fb98630b89d763532208a7712d12e8fcf3900f3a",
        "logIndex": "0x42",
        "removed": false
      }
    ],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": null,
    "transactionHash": "0x7ef015c30dbe02cf68870a8b740635266e28abe25d68c4f467affe88956729c4",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 40, omitted */
    /** "value": "0x0" omitted */
  }
}
```

#### SmartContractExecution Transaction Receipt

| Ethereumトランザクション領収書フィールド | Klaytn SmartContractExecution Transaction Receipt Field | Description                                              |
| ------------------------ | ------------------------------------------------------- | -------------------------------------------------------- |
|                          | input                                                   | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。 |
| to                       | to                                                      | :white_check_mark: スマートコントラクトのアドレス。                    |
|                          | 値                                                       | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。 |

**Klaytn SmartContractExecution Transaction Receipt** は以下のようにEthereum Transaction Receiptとして提供されます。
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xa500c5bc0e0410a60961fca0a4beceb19f1af9a42c5cbcfad7818865eb0ee114",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "input": "0x32142912492149122", omitted */
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5994af2bfe0bdaf7f66ec3d7924e5647094718bf",
    "transactionHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 48, omitted */
    /** "value": "0xa5c40c07eb33e87000" omitted */
  }
}
```

#### AccountUpdate Transaction Receipt

| Ethereumトランザクション領収書フィールド | Klaytn AccountUpdate Transaction Receipt Field | Description                                                                                                                       |
| ------------------------ | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
|                          | key(省略)                                        | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。                                                                          |
| to                       | (追加)                                           | :warning: このフィールドは常に `の` と同じアドレスを持っています。なぜなら、このフィールドはKlaytn AccountUpdate のトランザクション受領に存在せず、 `の` アドレスからこのフィールドの値を与えることが最も有意義だからです。 |

**Klaytn AccountUpdate Transaction Receipt** は以下のようにイーサリアムのTransaction Receiptとして提供されます。
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xa500c5bc0e0410a60961fca0a4beceb19f1af9a42c5cbcfad7818865eb0ee114",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "key": "0x02a102a288c3fb864a012dbe6ca84fcd2afcd9b390cf473b4d35a0126c3164ac3e7f73", omitted */
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237", /** added */
    "transactionHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 32, omitted */
    /** "value": "0xa5c40c07eb33e87000" omitted */
  }
}
```

#### トランザクション受信をキャンセル

| Ethereumトランザクション領収書フィールド | Klaytn Cancel Transaction Receipt Field | Description                                                                                                         |
| ------------------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| to                       | (追加)                                    | :warning: このフィールドは `の` と常に同じアドレスを持っています。なぜなら、このフィールドは Klaytn に存在しないからです。トランザクションの受領をキャンセルし、 `の` からの値を与えることは最も有意義です。 |

**Klaytn Cancel Transaction Receipt** は以下のようにイーサリアムのTransaction Receiptとして提供されます。
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xda357820b1d70922422219dd6d2d3507f4af32588b90a0a7f825ce36887f2de6",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237", /** added */
    "transactionHash": "0x7ef015c30dbe02cf68870a8b740635266e28abe25d68c4f467affe88956729c4",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 56, omitted */
  }
}
```

#### トランザクション領収書をChainDataAnchoring

| Ethereumトランザクション領収書フィールド | Klaytn ChainDataAnchoring Transaction Receipt Field | Description                                                                                                                            |
| ------------------------ | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
|                          | input(省略)                                           | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。                                                                               |
|                          | inputJSON(省略)                                       | :warning: このフィールドはEthereumトランザクションレシートに存在しないため、省略されています。                                                                               |
| to                       | (追加)                                                | :warning: このフィールドは `の` と常に同じアドレスを持っています。なぜなら、このフィールドは Klaytn ChainDataAnchoring トランザクション受領に存在せず、 `の` アドレスからこのフィールドの値を与えることが最も有意義だからです。 |

**Klaytn ChainDataAnchoring Transaction Receipt** は以下のようにEthereum Transaction Receiptとして提供されます。
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash": "0xda357820b1d70922422219dd6d2d3507f4af32588b90a0a7f825ce36887f2de6",
    "blockNumber": "0x487d166",
    "contractAddress": null,
    "cumulativeGasUsed": "0xa0dbd0", /** added */
    "effectiveGasPrice": "0x143ec7aafa", /** added */
    "from": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237",
    /** "gas": "0x5208", omitted */
    /** "gasPrice": "0x5d21dba00", omitted */
    "gasUsed": "0x5208",
    /** "input": "0xf8...", omitted */
    /** "inputJSON": {
      "blockHash": "0x2b69e9532eddd9a25dc48c53253d8bc93a29770362a8f778fe799e3493cad626",
      "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "parentHash": "0x094084ac3580231708c2a2dcbcf39f712a61dcc070b76a7eaaaf8b6f07a9549c",
      "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "stateRoot": "0x768b8ae0874e4ac5e3ef9bccbeb417b4207d562b85dfb30ecf9cc8344209a5e6",
      "blockNumber": 43372800,
      "blockCount": 86400,
      "txCount": 53777
    }, omitted */
    "logs": [],
    "logsBloom": "0x00...",
    /** "nonce": "0x120", omitted */
    /** "senderTxHash": "0xd1f9019b8ddd8929d0b090d130b2d73df8f2318686782b232d43d9ffb69b26bf", omitted */
    /** "signatures": [
      {
        "V": "0x4056",
        "R": "0xa95c8fcf98c0b43eec70aa7749dd1f8f4f9b54e7aa882c28bb25d72d7ef627b9",
        "S": "0x46e2c676b314fc55f05caf87ad695443b347beb6fac8f6d355201ac2a49c45ec"
      }
    ], omitted */
    "status": "0x1",
    "to": "0x5386d9f21be7034ba3aeadc7bedb5ea4dd538237", /** added */
    "transactionHash": "0x7ef015c30dbe02cf68870a8b740635266e28abe25d68c4f467affe88956729c4",
    "transactionIndex": "0x5",
    "type": "0x0", /** data type converted (string -> hexutil.Uint64(0)) */
    /** "typeInt": 72, omitted */
  }
}
```