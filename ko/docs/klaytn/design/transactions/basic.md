# 일반 트랜잭션 <a id="basic"></a>

## TxTypeLegacyTransaction <a id="txtypelegacytransaction"></a>

TxTypeLegacyTransaction은 이전에 Klaytn에 존재했던 트랜잭션 유형을 의미합니다. 이 트랜잭션 유형은 호환성을 위해 존재하므로 [AccountKeyLegacy](../accounts.md#accountkeylegacy)와 연결된 EOA와만 사용할 수 있습니다. 다른 계정 키 유형과 연결된 EOA는 TxTypeValueTransfer, TxTypeSmartContractExecution 같은 다른 트랜잭션 유형을 사용해야 합니다. 이 유형의 트랜잭션은 계정 생성, 토큰 전송, 스마트 컨트랙트 배포, 스마트 컨트랙트 실행 또는 앞에서 언급한 것들을 혼합하여 실행할 수 있습니다. 이 트랜잭션 유형은 다음과 같은 변경 사항을 만듭니다.

1. 발신자의 잔고는 트랜잭션 수수료만큼 줄어듭니다.
2. 발신자의 논스가 1 증가합니다.
3. 만약 `to`가 Klaytn에 존재하지 않으면 [AccountKeyLegacy](../accounts.md#accountkeylegacy)와 연결된 EOA를 만듭니다.
4. `value` KLAY가 발신자로부터 수신자로 전송됩니다.
5. `to`가 nil이라면 스마트컨 트랙트 배포를 위한 트랜잭션으로 간주됩니다. 스마트 컨트랙트 코드는 `input`을 통해 전달되어야 합니다.
6. `to`가 스마트 컨트랙트라면 `input`에 명시된 스마트 컨트랙트 함수가 실행됩니다.

### 속성 <a id="attributes"></a>

| 속성       | 타입                          | 설명                                                                                                                                                                                                                               |
|:-------- |:--------------------------- |:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value    | \*big.Int \(Go\)        | 명시된 양의 KLAY(단위: peb)가 전송됩니다.                                                                                                                                                                                                     |
| to       | \*common.Address \(Go\) | 전송되는 KLAY를 받을 계정 주소입니다.                                                                                                                                                                                                          |
| input    | \[\]byte \(Go\)         | 트랜잭션에 첨부되어 트랜잭션을 실행할 때 이용되는 데이터입니다.                                                                                                                                                                                              |
| v, r, s  | \*big.Int \(Go\)        | 수신자가 발신자의 주소를 받을 수 있게 발신자에 의해 발생된 암호학적 서명입니다.                                                                                                                                                                                    |
| nonce    | uint64 \(Go\)             | 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 발신자가 동일한 논스를 가진 두 개의 트랜잭션을 생성하면 하나만 실행됩니다.                                                                                                                                                    |
| gas      | uint64 \(Go\)             | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                                                                                                                                 |
| gasPrice | \*big.Int \(Go\)        | 발신자가 얼마나 가스비를 지급해야하는지 알 수 있도록 곱하는 값입니다. 발신자가 지급해야할 비용은 `gas` \* `gasPrice`로 계산됩니다. 예를 들어, 만약 가스가 10이 필요하고 gasPrice가 10^18이라면 발신자는 트랜잭션을 위해 10 KLAY를 지급해야 합니다. [KLAY의 단위](../klaytn-native-coin-klay.md#units-of-klay)를 참고해주세요. |

### 서명 RLP 인코딩 <a id="rlp-encoding-for-signature"></a>

이 트랜잭션 유형의 서명을 만들려면 다음과 같이 RLP 직렬화를 수행해야합니다.

```javascript
SigRLP = encode([nonce, gasPrice, gas, to, value, input, chainid, 0, 0])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash, <private key>)
```

### SenderTxHash를 위한 RLP 인코딩 <a id="rlp-encoding-for-sendertxhash"></a>

SenderTxHash를 만들려면 다음과 같이 RLP 직렬화를 수행해야합니다.

```javascript
SenderTxHashRLP = encode([nonce, gasPrice, gas, to, value, input, v, r, s])
SenderTxHash = keccak256(SenderTxHashRLP)
```

### 트랜잭션 해시를 위한 RLP 인코딩 <a id="rlp-encoding-for-transaction-hash"></a>

트랜잭션 해시를 만들려면 다음과 같이 RLP 직렬화를 수행해야합니다.

```javascript
TxHashRLP = encode([nonce, gasPrice, gas, to, value, input, v, r, s])
TxHash = keccak256(TxHashRLP)
```

### RLP 인코딩 \(예시\) <a id="rlp-encoding-example"></a>

다음은 RLP 직렬화의 결과와 트랜잭션 오브젝트를 보여줍니다.

```javascript
ChainID 0x1
PrivateKey 0x45a915e4d060149eb4365960e6a7a45f334393093061116b197e3240065ff2d8
PublicKey.X 0x3a514176466fa815ed481ffad09110a2d344f6c9b78c1d14afc351c3a51be33d
PublicKey.Y 0x8072e77939dc03ba44790779b7a1025baf3003f6732430e20cd9b76d953391b3
SigRLP 0xe68204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a8431323334018080
SigHash 0x40e73366650cddb7affcf5af39efa864b2c68c42b5329044fc86a12b26c4edc7
Signature f845f84325a0b2a5a15550ec298dc7dddde3774429ed75f864c82caeb5ee24399649ad731be9a029da1014d16f2011b3307f7bbe1035b6e699a4204fc416c763def6cefd976567
TxHashRLP 0xf8668204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a843132333425a0b2a5a15550ec298dc7dddde3774429ed75f864c82caeb5ee24399649ad731be9a029da1014d16f2011b3307f7bbe1035b6e699a4204fc416c763def6cefd976567
TxHash e434257753bf31a130c839fec0bd34fc6ea4aa256b825288ee82db31c2ed7524
SenderTxHashRLP 0xf8668204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a843132333425a0b2a5a15550ec298dc7dddde3774429ed75f864c82caeb5ee24399649ad731be9a029da1014d16f2011b3307f7bbe1035b6e699a4204fc416c763def6cefd976567
SenderTxHash e434257753bf31a130c839fec0bd34fc6ea4aa256b825288ee82db31c2ed7524

    TX(e434257753bf31a130c839fec0bd34fc6ea4aa256b825288ee82db31c2ed7524)
    Contract: false
    From:     a94f5374fce5edbc8e2a8697c15331677e6ebf0b
    To:       7b65b75d204abed71587c9e519a89277766ee1d0
    Nonce:    1234
    GasPrice: 0x19
    GasLimit  0xf4240
    Value:    0xa
    Data:     0x31323334
    V:        0x25
    R:        0xb2a5a15550ec298dc7dddde3774429ed75f864c82caeb5ee24399649ad731be9
    S:        0x29da1014d16f2011b3307f7bbe1035b6e699a4204fc416c763def6cefd976567
    Hex:      f8668204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a843132333425a0b2a5a15550ec298dc7dddde3774429ed75f864c82caeb5ee24399649ad731be9a029da1014d16f2011b3307f7bbe1035b6e699a4204fc416c763def6cefd976567
```

### RPC Output \(예시\) <a id="rpc-output-example"></a>

다음은 JSON RPC를 통해 반환된 트랜잭션 오브젝트를 보여줍니다.

```javascript
{
  "blockHash": "0xeff95d8c57d668aa274a0eaeff942ecc2cfca4c71f71ae9fdaba92735cd79b9e",
  "blockNumber": "0x1",
  "contractAddress": null,
  "from": "0x33c97827c33d8c5e07eb263ed6ec5c229e8b4752",
  "gas": "0x174876e800",
  "gasPrice": "0x5d21dba00",
  "gasUsed": "0x5208",
  "input": "0x",
  "logs": [],
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "nonce": "0x0",
  "senderTxHash": "0xff0e9a45aa8741d528baf84069cd3b52c43a51bf7cf69d896672c3c909507888",
  "signatures": [
    {
      "V": "0x25",
      "R": "0xed8aa552324101a99792860d479cd488b7f67af0b9205968748bddcda52da6de",
      "S": "0x524dbf481ea1d77c20f4d4354cc208c3149ddfa06f7ab53a03ad82d2d7fed3"
    }
  ],
  "status": "0x1",
  "to": "0xd03227635c90c7986f0e3a4e551cefbca8c55316",
  "transactionHash": "0xff0e9a45aa8741d528baf84069cd3b52c43a51bf7cf69d896672c3c909507888",
  "transactionIndex": "0x0",
  "type": "TxTypeLegacyTransaction",
  "typeInt": 0,
  "value": "0x174876e800"
}
```

## TxTypeValueTransfer <a id="txtypevaluetransfer"></a>

TxTypeValueTransfer는 사용자가 KLAY를 전송할 때 사용됩니다. Klaytn은 각 목적에 맞는 여러가지 트랜잭션 유형들을 제공하는데, TxTypeValueTransfer는 KLAY를 EOA에 전송할 때 사용하는 기능입니다. 따라서 TxTypeValueTransfer는 `to`가 EOA일때만 작동합니다. KLAY를 스마트 컨트랙트로 전송하려면 [TxTypeSmartContractExecution](basic.md#txtypesmartcontractexecution)를 대신 사용하여야 합니다. 이 트랜잭션 유형은 다음과 같은 변경 사항을 만듭니다.

1. 발신자의 잔고는 트랜잭션 수수료만큼 줄어듭니다.
2. 발신자의 논스가 1 증가합니다.
3. `value` KLAY가 발신자로부터 수신자로 전송됩니다.

### 속성 <a id="attributes"></a>

| 속성           | 타입                                                     | 설명                                                                                                                                                                                                                           |
|:------------ |:------------------------------------------------------ |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type         | uint8 \(Go\)                                         | TxTypeValueTransfer의 유형입니다. 이는 0x08이어야 합니다.                                                                                                                                                                                  |
| nonce        | uint64 \(Go\)                                        | 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 발신자가 동일한 논스를 가진 두 개의 트랜잭션을 생성하면 하나만 실행됩니다.                                                                                                                                                |
| gasPrice     | \*big.Int \(Go\)                                   | 발신자가 트랜잭션 수수료로 지불하는 가스의 단가입니다(단위는 peb). 트랜잭션 수수료는 `gas` \* `gasPrice`으로 계산됩니다. 예를 들어, 만약 가스가 10이 필요하고 gasPrice가 10^18이라면 발신자는 트랜잭션을 위해 10 KLAY를 지급해야 합니다. [KLAY의 단위](../klaytn-native-coin-klay.md#units-of-klay)를 참고해주세요. |
| gas          | uint64 \(Go\)                                        | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                                                                                                                             |
| to           | common.Address \(Go\)                                | 전송되는 KLAY를 받을 계정 주소입니다.                                                                                                                                                                                                      |
| value        | \*big.Int \(Go\)                                   | 명시된 양의 KLAY(단위: peb)가 전송됩니다.                                                                                                                                                                                                 |
| from         | common.Address \(Go\)                                | 발신자의 주소입니다. 자세한 내용은 [트랜잭션의 서명 검증](README.md#signature-validation-of-transactions)을 참고해주세요.                                                                                                                                   |
| txSignatures | \[\]{\*big.Int, \*big.Int, \*big.Int} \(Go\) | 발신자의 서명입니다. 자세한 내용은 [트랜잭션의 서명 검증](README.md#signature-validation-of-transactions)을 참고해주세요.                                                                                                                                   |

### 서명 RLP 인코딩 <a id="rlp-encoding-for-signature"></a>

트랜잭션 서명을 만들려면 다음과 같이 RLP 직렬화를 수행해야합니다.

```javascript
SigRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from]), chainid, 0, 0])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash, <private key>)
```

### SenderTxHash를 위한 RLP 인코딩 <a id="rlp-encoding-for-sendertxhash"></a>

SenderTxHash를 만들려면 다음과 같이 RLP 직렬화를 수행해야합니다.

```javascript
txSignatures (a single signature) = [[v, r, s]]
txSignatures (two signatures) = [[v1, r1, s1], [v2, r2, s2]]
SenderTxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, txSignatures])
SenderTxHash = keccak256(SenderTxHashRLP)
```

### 트랜잭션 해시를 위한 RLP 인코딩 <a id="rlp-encoding-for-transaction-hash"></a>

트랜잭션 해시를 만들려면 다음과 같이 RLP 직렬화를 수행해야합니다.

```javascript
txSignatures (a single signature) = [[v, r, s]]
txSignatures (two signatures) = [[v1, r1, s1], [v2, r2, s2]]
TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, txSignatures])
TxHash = keccak256(TxHashRLP)
```

### RLP 인코딩 \(예시\) <a id="rlp-encoding-example"></a>

다음은 주어진 인수에 대한 RLP 직렬화의 결과와 트랜잭션 오브젝트의 정보를 보여줍니다.

```javascript
ChainID 0x1
PrivateKey 0x45a915e4d060149eb4365960e6a7a45f334393093061116b197e3240065ff2d8
PublicKey.X 0x3a514176466fa815ed481ffad09110a2d344f6c9b78c1d14afc351c3a51be33d
PublicKey.Y 0x8072e77939dc03ba44790779b7a1025baf3003f6732430e20cd9b76d953391b3
SigRLP 0xf839b5f4088204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0b018080
SigHash 0xaa7665566c9508140bb91e36a948fc8f61c4518400a69562432d17e064f3ce43
Signature f845f84325a0f3d0cd43661cabf53425535817c5058c27781f478cb5459874feaa462ed3a29aa06748abe186269ff10b8100a4b7d7fea274b53ea2905acbf498dc8b5ab1bf4fbc
TxHashRLP 0x08f87a8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0bf845f84325a0f3d0cd43661cabf53425535817c5058c27781f478cb5459874feaa462ed3a29aa06748abe186269ff10b8100a4b7d7fea274b53ea2905acbf498dc8b5ab1bf4fbc
TxHash 762f130342569e9669a4d8547f1248bd2554fbbf3062d63a97ce28bfa97aa9d7
SenderTxHashRLP 0x08f87a8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0bf845f84325a0f3d0cd43661cabf53425535817c5058c27781f478cb5459874feaa462ed3a29aa06748abe186269ff10b8100a4b7d7fea274b53ea2905acbf498dc8b5ab1bf4fbc
SenderTxHash 762f130342569e9669a4d8547f1248bd2554fbbf3062d63a97ce28bfa97aa9d7

    TX(762f130342569e9669a4d8547f1248bd2554fbbf3062d63a97ce28bfa97aa9d7)
    Type:          TxTypeValueTransfer
    From:          0xa94f5374Fce5edBC8E2a8697C15331677e6EbF0B
    To:            0x7b65B75d204aBed71587c9E519a89277766EE1d0
    Nonce:         1234
    GasPrice:      0x19
    GasLimit:      0xf4240
    Value:         0xa
    Signature:     [{"V":"0x25","R":"0xf3d0cd43661cabf53425535817c5058c27781f478cb5459874feaa462ed3a29a","S":"0x6748abe186269ff10b8100a4b7d7fea274b53ea2905acbf498dc8b5ab1bf4fbc"}]
    Hex:           08f87a8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0bf845f84325a0f3d0cd43661cabf53425535817c5058c27781f478cb5459874feaa462ed3a29aa06748abe186269ff10b8100a4b7d7fea274b53ea2905acbf498dc8b5ab1bf4fbc
```

### RPC Output \(예시\) <a id="rpc-output-example"></a>

다음은 JSON RPC를 통해 반환된 트랜잭션 오브젝트를 보여줍니다.

```javascript
{
  "blockHash": "0xeff95d8c57d668aa274a0eaeff942ecc2cfca4c71f71ae9fdaba92735cd79b9e",
  "blockNumber": "0x1",
  "contractAddress": null,
  "from": "0x33c97827c33d8c5e07eb263ed6ec5c229e8b4752",
  "gas": "0x174876e800",
  "gasPrice": "0x5d21dba00",
  "gasUsed": "0x5208",
  "logs": [],
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "nonce": "0x1",
  "senderTxHash": "0x8c18c9a609d2b22c921ce0b282e64924bf073e84f7c3850d99ec71da4054f79d",
  "signatures": [
    {
      "V": "0x25",
      "R": "0x94e059980bce9f3ba5f09e5021ad4f32d7d9cfda938c2d38c989cd4a406e7ba",
      "S": "0x3ca52ee9d23954a278e6a30f3ec40951b26fb8b3f784c236c5bb1d5c9a8b2c82"
    }
  ],
  "status": "0x1",
  "to": "0x75c3098be5e4b63fbac05838daaee378dd48098d",
  "transactionHash": "0x8c18c9a609d2b22c921ce0b282e64924bf073e84f7c3850d99ec71da4054f79d",
  "transactionIndex": "0x1",
  "type": "TxTypeValueTransfer",
  "typeInt": 8,
  "value": "0x21e19e0c9bab2400000"
}
```

## TxTypeValueTransferMemo <a id="txtypevaluetransfermemo"></a>

TxTypeValueTransferMemo는 사용자가 특정 메시지와 함께 KLAY를 보내려고 할 때 사용됩니다. 따라서 TxTypeValueTransferMemo는 `to`가 EOA일때만 작동합니다. KLAY를 스마트 컨트랙트로 전송하려면 [TxTypeSmartContractExecution](basic.md#txtypesmartcontractexecution)를 대신 사용하여야 합니다. 이 트랜잭션 유형은 다음과 같은 변경 사항을 만듭니다.

1. 발신자의 잔고는 트랜잭션 수수료만큼 줄어듭니다.
2. 발신자의 논스가 1 증가합니다.
3. `value` KLAY가 발신자로부터 수신자로 전송됩니다.

### 속성 <a id="attributes"></a>

| 속성           | 타입                                                     | 설명                                                                                                                                                                                                                           |
|:------------ |:------------------------------------------------------ |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type         | uint8 \(Go\)                                         | TxTypeValueTransferMemo의 유형입니다. 이는 0x10이어야 합니다.                                                                                                                                                                              |
| nonce        | uint64 \(Go\)                                        | 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 발신자가 동일한 논스를 가진 두 개의 트랜잭션을 생성하면 하나만 실행됩니다.                                                                                                                                                |
| gasPrice     | \*big.Int \(Go\)                                   | 발신자가 트랜잭션 수수료로 지불하는 가스의 단가입니다(단위는 peb). 트랜잭션 수수료는 `gas` \* `gasPrice`으로 계산됩니다. 예를 들어, 만약 가스가 10이 필요하고 gasPrice가 10^18이라면 발신자는 트랜잭션을 위해 10 KLAY를 지급해야 합니다. [KLAY의 단위](../klaytn-native-coin-klay.md#units-of-klay)를 참고해주세요. |
| gas          | uint64 \(Go\)                                        | 트랜잭션에서 사용하도록 허락된 최대 가스양입니다.                                                                                                                                                                                                  |
| to           | common.Address \(Go\)                                | 전송되는 KLAY를 받을 계정 주소입니다.                                                                                                                                                                                                      |
| value        | \*big.Int \(Go\)                                   | 명시된 양의 Klay(단위: peb)가 전송됩니다.                                                                                                                                                                                                 |
| from         | common.Address \(Go\)                                | 발신자의 주소입니다. 자세한 내용은 [트랜잭션의 서명 검증](README.md#signature-validation-of-transactions)을 참고해주세요.                                                                                                                                   |
| input        | \[\]byte \(Go\)                                    | 트랜잭션에 첨부되는 데이터입니다. 메시지는 이 속성으로 전달되어야 합니다.                                                                                                                                                                                    |
| txSignatures | \[\]{\*big.Int, \*big.Int, \*big.Int} \(Go\) | 발신자의 서명입니다. 자세한 내용은 [트랜잭션의 서명 검증](README.md#signature-validation-of-transactions)을 참고해주세요.                                                                                                                                   |

### 서명 RLP 인코딩 <a id="rlp-encoding-for-signature"></a>

트랜잭션 서명을 만들려면 다음과 같이 RLP 직렬화를 수행해야 합니다.

```javascript
SigRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from, input]), chainid, 0, 0])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash, <private key>)
```

### SenderTxHash를 위한 RLP 인코딩 <a id="rlp-encoding-for-sendertxhash"></a>

SenderTxHash를 만들려면 다음과 같이 RLP 직렬화를 수행해야 합니다.

```javascript
txSignatures (a single signature) = [[v, r, s]]
txSignatures (two signatures) = [[v1, r1, s1], [v2, r2, s2]]
SenderTxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, txSignatures])
SenderTxHash = keccak256(SenderTxHashRLP)
```

### 트랜잭션 해시를 위한 RLP 인코딩 <a id="rlp-encoding-for-transaction-hash"></a>

트랜잭션 해시를 만들려면 다음과 같이 RLP 직렬화를 수행해야 합니다.

```javascript
txSignatures (a single signature) = [[v, r, s]]
txSignatures (two signatures) = [[v1, r1, s1], [v2, r2, s2]]
TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, txSignatures])
TxHash = keccak256(TxHashRLP)
```

### RLP 인코딩 \(예시\) <a id="rlp-encoding-example"></a>

다음은 RLP 직렬화의 결과와 트랜잭션 오브젝트를 보여줍니다.

```javascript
ChainID 0x1
PrivateKey 0x45a915e4d060149eb4365960e6a7a45f334393093061116b197e3240065ff2d8
PublicKey.X 0x3a514176466fa815ed481ffad09110a2d344f6c9b78c1d14afc351c3a51be33d
PublicKey.Y 0x8072e77939dc03ba44790779b7a1025baf3003f6732430e20cd9b76d953391b3
SigRLP 0xf841b83cf83a108204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0b8568656c6c6f018080
SigHash 0x23dd6ca2c023a152cad636ac8ed0a1a7962d3eb4cb7f3c50e34c0cc42e37d48a
Signature f845f84325a07d2b0c89ee8afa502b3186413983bfe9a31c5776f4f820210cffe44a7d568d1ca02b1cbd587c73b0f54969f6b76ef2fd95cea0c1bb79256a75df9da696278509f3
TxHashRLP 0x10f8808204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0b8568656c6c6ff845f84325a07d2b0c89ee8afa502b3186413983bfe9a31c5776f4f820210cffe44a7d568d1ca02b1cbd587c73b0f54969f6b76ef2fd95cea0c1bb79256a75df9da696278509f3
TxHash 6c7ee543c24e5b928b638a9f4502c1eca69103f5467ed4b6a2ed0ea5aede2e6b
SenderTxHashRLP 0x10f8808204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0b8568656c6c6ff845f84325a07d2b0c89ee8afa502b3186413983bfe9a31c5776f4f820210cffe44a7d568d1ca02b1cbd587c73b0f54969f6b76ef2fd95cea0c1bb79256a75df9da696278509f3
SenderTxHash 6c7ee543c24e5b928b638a9f4502c1eca69103f5467ed4b6a2ed0ea5aede2e6b

    TX(6c7ee543c24e5b928b638a9f4502c1eca69103f5467ed4b6a2ed0ea5aede2e6b)
    Type:          TxTypeValueTransferMemo
    From:          0xa94f5374Fce5edBC8E2a8697C15331677e6EbF0B
    To:            0x7b65B75d204aBed71587c9E519a89277766EE1d0
    Nonce:         1234
    GasPrice:      0x19
    GasLimit:      0xf4240
    Value:         0xa
    Signature:     [{"V":"0x25","R":"0x7d2b0c89ee8afa502b3186413983bfe9a31c5776f4f820210cffe44a7d568d1c","S":"0x2b1cbd587c73b0f54969f6b76ef2fd95cea0c1bb79256a75df9da696278509f3"}]
    Data:          36383635366336633666
    Hex:           10f8808204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0b8568656c6c6ff845f84325a07d2b0c89ee8afa502b3186413983bfe9a31c5776f4f820210cffe44a7d568d1ca02b1cbd587c73b0f54969f6b76ef2fd95cea0c1bb79256a75df9da696278509f3
```

### RPC Output \(예시\) <a id="rpc-output-example"></a>

다음은 JSON RPC를 통해 반환된 트랜잭션 오브젝트를 보여줍니다.

```javascript
{
  "blockHash": "0x7ad6ed1f9955be00db8fb5452125f0e9a3c0856abb5b4cc4aed91ffc134321da",
  "blockNumber": "0x1",
  "contractAddress": null,
  "from": "0x0fcda0f2efbe1b4e61b487701ce4f2f8abc3723d",
  "gas": "0x174876e800",
  "gasPrice": "0x5d21dba00",
  "gasUsed": "0x53fc",
  "input": "0x68656c6c6f",
  "logs": [],
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "nonce": "0x4",
  "senderTxHash": "0x7311ef305064f2a6997c16cc8b5fc3fdf301549e7b7d0baa3a995a8e79479e5e",
  "signatures": [
    {
      "V": "0x25",
      "R": "0xd63673e1be7919e7ca42de64931c853fc568557b151e9b335df94b22de3a600f",
      "S": "0x57bc916a50856b4d197f6856f16370f72f3bb0ac411b1da793fdb5bb7066966f"
    }
  ],
  "status": "0x1",
  "to": "0x75c3098be5e4b63fbac05838daaee378dd48098d",
  "transactionHash": "0x7311ef305064f2a6997c16cc8b5fc3fdf301549e7b7d0baa3a995a8e79479e5e",
  "transactionIndex": "0x4",
  "type": "TxTypeValueTransferMemo",
  "typeInt": 16,
  "value": "0x989680"
}
```

## TxTypeSmartContractDeploy <a id="txtypesmartcontractdeploy"></a>

TxTypeSmartContractDeploy는 지정된 주소에 스마트 컨트랙트를 배포합니다. 이 트랜잭션 타입은 다음과 같은 변경 사항을 만듭니다.

1. 발신자의 잔고는 트랜잭션 수수료만큼 줄어듭니다.
2. 발신자의 논스가 1 증가합니다.
3. `input`에 기입된 코드로 스마트 컨트랙트가 배포됩니다. 배포된 주소는 영수증의 `contractAddress`를 통해 반환됩니다.
4. `value` KLAY가 발신자로부터 수신자로 전송됩니다.

### 속성 <a id="attributes"></a>

| 속성            | 타입                                                     | 설명                                                                                                                                                                                                                           |
|:------------- |:------------------------------------------------------ |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type          | uint8 \(Go\)                                         | TxTypeSmartContractDeploy의 유형입니다. 이는 0x28이어야 합니다.                                                                                                                                                                            |
| nonce         | uint64 \(Go\)                                        | 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 발신자가 동일한 논스를 가진 두 개의 트랜잭션을 생성하면 하나만 실행됩니다.                                                                                                                                                |
| gasPrice      | \*big.Int \(Go\)                                   | 발신자가 트랜잭션 수수료로 지불하는 가스의 단가입니다(단위는 peb). 트랜잭션 수수료는 `gas` \* `gasPrice`으로 계산됩니다. 예를 들어, 만약 가스가 10이 필요하고 gasPrice가 10^18이라면 발신자는 트랜잭션을 위해 10 KLAY를 지급해야 합니다. [KLAY의 단위](../klaytn-native-coin-klay.md#units-of-klay)를 참고해주세요. |
| gas           | uint64 \(Go\)                                        | 트랜잭션에서 사용하도록 허락된 최대 가스양입니다.                                                                                                                                                                                                  |
| to            | \*common.Address \(Go\)                            | 전송되는 KLAY를 받을 계정 주소입니다. 현재 이 값은 nil이어야합니다. 특정 주소를 지정하는 기능은 향후 지원될 예정입니다.                                                                                                                                                     |
| value         | \*big.Int \(Go\)                                   | 명시된 양의 Klay(단위: peb)가 전송됩니다.                                                                                                                                                                                                 |
| from          | common.Address \(Go\)                                | 발신자의 주소입니다. 자세한 내용은 [트랜잭션의 서명 검증](README.md#signature-validation-of-transactions)을 참고해주세요.                                                                                                                                   |
| input         | \[\]byte \(Go\)                                    | 트랜잭션 실행에 이용되며 트랜잭션에 첨부되는 데이터입니다.                                                                                                                                                                                             |
| humanReadable | bool \(Go\)                                          | Human-readable address는 아직 지원되지 않으므로 이 값은 false여야 합니다. 이 값이 true라면 트랜잭션은 실패합니다.                                                                                                                                              |
| codeFormat    | uint8 \(Go\)                                         | 스마트 컨트랙트 코드의 코드 형식입니다. 현재는 오직 EVM\(0x00\)만 지원됩니다.                                                                                                                                                                          |
| txSignatures  | \[\]{\*big.Int, \*big.Int, \*big.Int} \(Go\) | 발신자의 서명입니다. 자세한 내용은 [트랜잭션의 서명 검증](README.md#signature-validation-of-transactions)을 참고해주세요.                                                                                                                                   |

### 서명 RLP 인코딩 <a id="rlp-encoding-for-signature"></a>

이 트랜잭션 유형의 서명을 만들려면 다음과 같이 RLP 직렬화를 수행해야 합니다.

```javascript
SigRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from, input, humanReadable, codeFormat]), chainid, 0, 0])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash, <private key>)
```

### SenderTxHash를 위한 RLP 인코딩 <a id="rlp-encoding-for-sendertxhash"></a>

SenderTxHash를 만들려면 다음과 같이 RLP 직렬화를 수행해야 합니다.

```javascript
txSignatures (a single signature) = [[v, r, s]]
txSignatures (two signatures) = [[v1, r1, s1], [v2, r2, s2]]
SenderTxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, humanReadable, codeFormat, txSignatures])
SenderTxHash = keccak256(SenderTxHashRLP)
```

### 트랜잭션 해시를 위한 RLP 인코딩 <a id="rlp-encoding-for-transaction-hash"></a>

수수료 납부자의 서명을 만들려면 RLP 직렬화를 다음과 같이 수행해야합니다.

```javascript
txSignatures (a single signature) = [[v, r, s]]
txSignatures (two signatures) = [[v1, r1, s1], [v2, r2, s2]]
TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, humanReadable, codeFormat, txSignatures])
TxHash = keccak256(TxHashRLP)
```

### RLP 인코딩 \(예시\) <a id="rlp-encoding-example"></a>

다음은 RLP 직렬화의 결과와 트랜잭션 오브젝트를 보여줍니다.

```javascript
ChainID 0x1
PrivateKey 0x45a915e4d060149eb4365960e6a7a45f334393093061116b197e3240065ff2d8
PublicKey.X 0x3a514176466fa815ed481ffad09110a2d344f6c9b78c1d14afc351c3a51be33d
PublicKey.Y 0x8072e77939dc03ba44790779b7a1025baf3003f6732430e20cd9b76d953391b3
SigRLP 0xf90240b9023af90237288204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0bb901fe608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f00290180018080
SigHash 0xa921fa892d5dec0837bd32c1fb77fc3b2df57ec0b0c4eea79192c79883ed543c
Signature f845f84325a0fcd107738fb47750ba727610aefd6d5f51ac8163d62ce500e7ab7e15defe7088a0383d68220d0266490ea4173c1d7847f22fcbe22f8c8125e1c0589189845c902a
TxHashRLP 0x28f9027d8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0bb901fe608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f00290180f845f84325a0fcd107738fb47750ba727610aefd6d5f51ac8163d62ce500e7ab7e15defe7088a0383d68220d0266490ea4173c1d7847f22fcbe22f8c8125e1c0589189845c902a
TxHash e983f38b814891990f3ca57028c2230dc7e907eb313c827e7c99fadcc9b4c58b
SenderTxHashRLP 0x28f9027d8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0bb901fe608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f00290180f845f84325a0fcd107738fb47750ba727610aefd6d5f51ac8163d62ce500e7ab7e15defe7088a0383d68220d0266490ea4173c1d7847f22fcbe22f8c8125e1c0589189845c902a
SenderTxHash e983f38b814891990f3ca57028c2230dc7e907eb313c827e7c99fadcc9b4c58b

    TX(e983f38b814891990f3ca57028c2230dc7e907eb313c827e7c99fadcc9b4c58b)
    Type:          TxTypeSmartContractDeploy
    From:          0xa94f5374Fce5edBC8E2a8697C15331677e6EbF0B
    To:            0x7b65B75d204aBed71587c9E519a89277766EE1d0
    Nonce:         1234
    GasPrice:      0x19
    GasLimit:      0xf4240
    Value:         0xa
    Signature:     [{"V":"0x25","R":"0xfcd107738fb47750ba727610aefd6d5f51ac8163d62ce500e7ab7e15defe7088","S":"0x383d68220d0266490ea4173c1d7847f22fcbe22f8c8125e1c0589189845c902a"}]
    Data:          363038303630343035323334383031353631303031303537363030303830666435623530363130316465383036313030323036303030333936303030663330303630383036303430353236303034333631303631303036313537363366666666666666663763303130303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303030303630303033353034313636333161333964386566383131343631303038303537383036333633353335383662313436313030613735373830363337306130383233313134363130306361353738303633666436623765663831343631303066383537356233333630303039303831353236303031363032303532363034303831323038303534333439303831303139303931353538313534303139303535303035623334383031353631303038633537363030303830666435623530363130303935363130313064353635623630343038303531393138323532353139303831393030333630323030313930663335623631303063383733666666666666666666666666666666666666666666666666666666666666666666666666666666663630303433353136363130313133353635623030356233343830313536313030643635373630303038306664356235303631303039353733666666666666666666666666666666666666666666666666666666666666666666666666666666663630303433353136363130313437353635623334383031353631303130343537363030303830666435623530363130306338363130313539353635623630303035343831353635623733666666666666666666666666666666666666666666666666666666666666666666666666666666663136363030303930383135323630303136303230353236303430383132303830353433343930383130313930393135353831353430313930353535363562363030313630323035323630303039303831353236303430393032303534383135363562333336303030393038313532363030313630323035323630343038313230383035343930383239303535393038313131313536313031616635373630343035313333393038323135363130386663303239303833393036303030383138313831383538383838663139333530353035303530313536313031396335373631303161663536356233333630303039303831353236303031363032303532363034303930323038313930353535623530353630306131363536323761376137323330353832303632376361343662623039343738613031353736323830366363303063343331323330353031313138633763323663333061633538633465303965353163346630303239
    HumanReadable: true
    CodeFormat:    CodeFormatEVM
    Hex:           28f9027d8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0bb901fe608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f00290180f845f84325a0fcd107738fb47750ba727610aefd6d5f51ac8163d62ce500e7ab7e15defe7088a0383d68220d0266490ea4173c1d7847f22fcbe22f8c8125e1c0589189845c902a
```

### RPC Output \(예시\) <a id="rpc-output-example"></a>

다음은 JSON RPC를 통해 반환된 트랜잭션 오브젝트를 보여줍니다.

```javascript
{
  "blockHash": "0x82983fe294d286e76486760e6904369285554e1744af16786c2393a956fb4ec4",
  "blockNumber": "0x2",
  "codeFormat": "0x0",
  "contractAddress": "0x636f6e74726163742e6b6c6179746e0000000000",
  "from": "0x0fcda0f2efbe1b4e61b487701ce4f2f8abc3723d",
  "gas": "0x174876e800",
  "gasPrice": "0x0",
  "gasUsed": "0xee6e343d",
  "humanReadable": true,
  "input": "0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029",
  "logs": [],
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "nonce": "0xa",
  "senderTxHash": "0x78a5633ee5b453ed2f00937e65945a3b76e96623634e1555e2f15d44930168af",
  "signatures": [
    {
      "V": "0x25",
      "R": "0x369d892dc24786111fd8f0308e8a6518708727257e95b3281865508faa0a768b",
      "S": "0x12fc22c390a89484d1cb70e1f19c4fa8a203b1406044ee9c263264876f0dd724"
    }
  ],
  "status": "0x1",
  "to": "0x636f6e74726163742e6b6c6179746e0000000000",
  "transactionHash": "0x78a5633ee5b453ed2f00937e65945a3b76e96623634e1555e2f15d44930168af",
  "transactionIndex": "0x3",
  "type": "TxTypeSmartContractDeploy",
  "typeInt": 40,
  "value": "0x0"
}
```

## TxTypeSmartContractExecution <a id="txtypesmartcontractexecution"></a>

TxTypeSmartContractExecution는 스마트 컨트랙트를 실행하고, `input`에 입력된 데이터를 이용합니다. TxTypeSmartContractExecution는 `to`가 스마트 컨트랙트 계정일 때만 실행됩니다. KLAY를 외부 소유 계정으로 전송하려면 [TxTypeValueTransfer](basic.md#txtypevaluetransfer)를 대신 사용하십시오. 이 트랜잭션 타입은 다음과 같은 변경 사항을 만듭니다.

1. `to`가 스마트 컨트랙트라면 `input`을 이용하여 코드가 실행됩니다. 그렇지 않으면 트랜잭션은 거절됩니다.
2. 발신자의 잔고는 트랜잭션 수수료만큼 줄어듭니다.
3. 발신자의 논스가 1 증가합니다.
4. `value`에 값이 입력되었으면 발신자에서 `to`로`value` KLAY가 전송됩니다. 컨트랙트가 KLAY를 받기 위해서는 컨트랙트는 payable fallback function을 가져야 합니다.

### 속성 <a id="attributes"></a>

| 속성           | 타입                                                     | 설명                                                                                                                                                                                                                           |
|:------------ |:------------------------------------------------------ |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type         | uint8 \(Go\)                                         | TxTypeSmartContractExecution의 유형입니다. 이는 0x30이어야 합니다.                                                                                                                                                                         |
| nonce        | uint64 \(Go\)                                        | 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 발신자가 동일한 논스를 가진 두 개의 트랜잭션을 생성하면 하나만 실행됩니다.                                                                                                                                                |
| gasPrice     | \*big.Int \(Go\)                                   | 발신자가 트랜잭션 수수료로 지불하는 가스의 단가입니다(단위는 peb). 트랜잭션 수수료는 `gas` \* `gasPrice`으로 계산됩니다. 예를 들어, 만약 가스가 10이 필요하고 gasPrice가 10^18이라면 발신자는 트랜잭션을 위해 10 KLAY를 지급해야 합니다. [KLAY의 단위](../klaytn-native-coin-klay.md#units-of-klay)를 참고해주세요. |
| gas          | uint64 \(Go\)                                        | 트랜잭션에서 사용하도록 허락된 최대 가스양입니다.                                                                                                                                                                                                  |
| to           | common.Address \(Go\)                                | 실행할 스마트 컨트랙트 계정의 주소입니다.                                                                                                                                                                                                      |
| value        | \*big.Int \(Go\)                                   | 명시된 양의 Klay(단위: peb)가 전송됩니다.                                                                                                                                                                                                 |
| from         | common.Address \(Go\)                                | 발신자의 주소입니다. 자세한 내용은 [트랜잭션의 서명 검증](README.md#signature-validation-of-transactions)을 참고해주세요.                                                                                                                                   |
| input        | \[\]byte \(Go\)                                    | 트랜잭션 실행에 이용되며 트랜잭션에 첨부되는 데이터입니다.                                                                                                                                                                                             |
| txSignatures | \[\]{\*big.Int, \*big.Int, \*big.Int} \(Go\) | 발신자의 서명입니다. 자세한 내용은 [트랜잭션의 서명 검증](README.md#signature-validation-of-transactions)을 참고해주세요.                                                                                                                                   |

### 서명 RLP 인코딩 <a id="rlp-encoding-for-signature"></a>

이 트랜잭션 유형의 서명을 만들려면 다음과 같이 RLP 직렬화를 수행해야 합니다.

```javascript
SigRLP = encode([encode([type, nonce, gasPrice, gas, to, value, from, input]), chainid, 0, 0])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash, <private key>)
```

### SenderTxHash를 위한 RLP 인코딩 <a id="rlp-encoding-for-sendertxhash"></a>

SenderTxHash를 만들려면 다음과 같이 RLP 직렬화를 수행해야 합니다.

```javascript
txSignatures (a single signature) = [[v, r, s]]
txSignatures (two signatures) = [[v1, r1, s1], [v2, r2, s2]]
SenderTxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, txSignatures])
SenderTxHash = keccak256(SenderTxHashRLP)
```

### 트랜잭션 해시를 위한 RLP 인코딩 <a id="rlp-encoding-for-transaction-hash"></a>

트랜잭션 해시를 만들려면 다음과 같이 RLP 직렬화를 수행해야 합니다.

```javascript
txSignatures (a single signature) = [[v, r, s]]
txSignatures (two signatures) = [[v1, r1, s1], [v2, r2, s2]]
TxHashRLP = type + encode([nonce, gasPrice, gas, to, value, from, input, txSignatures])
TxHash = keccak256(TxHashRLP)
```

### RLP 인코딩 \(예시\) <a id="rlp-encoding-example"></a>

다음은 RLP 직렬화의 결과와 트랜잭션 오브젝트를 보여줍니다.

```javascript
ChainID 0x1
PrivateKey 0x45a915e4d060149eb4365960e6a7a45f334393093061116b197e3240065ff2d8
PublicKey.X 0x3a514176466fa815ed481ffad09110a2d344f6c9b78c1d14afc351c3a51be33d
PublicKey.Y 0x8072e77939dc03ba44790779b7a1025baf3003f6732430e20cd9b76d953391b3
SigRLP 0xf860b85bf859308204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0ba46353586b000000000000000000000000bc5951f055a85f41a3b62fd6f68ab7de76d299b2018080
SigHash 0x197ea7d262f74489934d6cbcf8baa3bec169c16ad672fef4a9f8148864c9cdce
Signature f845f84326a0e4276df1a779274fbb04bc18a0184809eec1ce9770527cebb3d64f926dc1810ba04103b828a0671a48d64fe1a3879eae229699f05a684d9c5fd939015dcdd9709b
TxHashRLP 0x30f89f8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0ba46353586b000000000000000000000000bc5951f055a85f41a3b62fd6f68ab7de76d299b2f845f84326a0e4276df1a779274fbb04bc18a0184809eec1ce9770527cebb3d64f926dc1810ba04103b828a0671a48d64fe1a3879eae229699f05a684d9c5fd939015dcdd9709b
TxHash 23bb192bd58d56527843eb63225c5213f3aded95e4c9776f1ff0bdd8ee0b6826
SenderTxHashRLP 0x30f89f8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0ba46353586b000000000000000000000000bc5951f055a85f41a3b62fd6f68ab7de76d299b2f845f84326a0e4276df1a779274fbb04bc18a0184809eec1ce9770527cebb3d64f926dc1810ba04103b828a0671a48d64fe1a3879eae229699f05a684d9c5fd939015dcdd9709b
SenderTxHash 23bb192bd58d56527843eb63225c5213f3aded95e4c9776f1ff0bdd8ee0b6826

    TX(23bb192bd58d56527843eb63225c5213f3aded95e4c9776f1ff0bdd8ee0b6826)
    Type:          TxTypeSmartContractExecution
    From:          0xa94f5374Fce5edBC8E2a8697C15331677e6EbF0B
    To:            0x7b65B75d204aBed71587c9E519a89277766EE1d0
    Nonce:         1234
    GasPrice:      0x19
    GasLimit:      0xf4240
    Value:         0xa
    Signature:     [{"V":"0x26","R":"0xe4276df1a779274fbb04bc18a0184809eec1ce9770527cebb3d64f926dc1810b","S":"0x4103b828a0671a48d64fe1a3879eae229699f05a684d9c5fd939015dcdd9709b"}]
    Data:          363335333538366230303030303030303030303030303030303030303030303062633539353166303535613835663431613362363266643666363861623764653736643239396232
    Hex:           30f89f8204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a94a94f5374fce5edbc8e2a8697c15331677e6ebf0ba46353586b000000000000000000000000bc5951f055a85f41a3b62fd6f68ab7de76d299b2f845f84326a0e4276df1a779274fbb04bc18a0184809eec1ce9770527cebb3d64f926dc1810ba04103b828a0671a48d64fe1a3879eae229699f05a684d9c5fd939015dcdd9709b
```

### RPC Output \(예시\) <a id="rpc-output-example"></a>

다음은 JSON RPC를 통해 반환된 트랜잭션 오브젝트를 보여줍니다.

```javascript
{
  "blockHash": "0x82983fe294d286e76486760e6904369285554e1744af16786c2393a956fb4ec4",
  "blockNumber": "0x2",
  "contractAddress": null,
  "from": "0x0fcda0f2efbe1b4e61b487701ce4f2f8abc3723d",
  "gas": "0x174876e800",
  "gasPrice": "0x5d21dba00",
  "gasUsed": "0xfedc",
  "input": "0x6353586b0000000000000000000000000fcda0f2efbe1b4e61b487701ce4f2f8abc3723d",
  "logs": [],
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "nonce": "0xd",
  "senderTxHash": "0xe216873dedd72d8d67a9f5e51eb5a7ed2b5f34bca334adff7a3601d6d3e2e132",
  "signatures": [
    {
      "V": "0x26",
      "R": "0x68fe3dfd1ff3ea14427f157b5837cb6eb0b00fd0497e1c80897de1935200f0",
      "S": "0x6b84fbedcb4ff785120890596fad3f797c178cda8908f3b02ee0a4442fbf4189"
    }
  ],
  "status": "0x1",
  "to": "0x636f6e74726163742e6b6c6179746e0000000000",
  "transactionHash": "0xe216873dedd72d8d67a9f5e51eb5a7ed2b5f34bca334adff7a3601d6d3e2e132",
  "transactionIndex": "0x6",
  "type": "TxTypeSmartContractExecution",
  "typeInt": 48,
  "value": "0xa"
}
```

## TxTypeAccountUpdate <a id="txtypeaccountupdate"></a>

TxTypeAccountUpdate는 해당 계정의 키를 업데이트합니다. 이 트랜잭션 유형은 다음과 같은 변경 사항을 만듭니다.

1. 발신자의 잔고는 트랜잭션 수수료만큼 줄어듭니다.
2. 발신자의 논스가 1 증가합니다.
3. 계정의 키는 `key`로 업데이트됩니다.
4. 이 유형의 트랜잭션이 실행되고 나면 계정에서 전송된 트랜잭션은 새 `key`로 검증됩니다.

### 속성 <a id="attributes"></a>

| 속성           | 타입                                                     | 설명                                                                                                                                                                                                                               |
|:------------ |:------------------------------------------------------ |:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type         | uint8 \(Go\)                                         | TxTypeAccountUpdate의 유형입니다. 이는 0x20이어야 합니다.                                                                                                                                                                                      |
| nonce        | uint64 \(Go\)                                        | 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 발신자가 동일한 논스를 가진 두 개의 트랜잭션을 생성하면 하나만 실행됩니다.                                                                                                                                                    |
| gasPrice     | \*big.Int \(Go\)                                   | 발신자가 얼마나 가스비를 지급해야하는지 알 수 있도록 곱하는 값입니다. 발신자가 지급해야할 비용은 `gas` \* `gasPrice`로 계산됩니다. 예를 들어, 만약 가스가 10이 필요하고 gasPrice가 10^18이라면 발신자는 트랜잭션을 위해 10 KLAY를 지급해야 합니다. [KLAY의 단위](../klaytn-native-coin-klay.md#units-of-klay)를 참고해주세요. |
| gas          | uint64 \(Go\)                                        | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                                                                                                                                 |
| from         | common.Address \(Go\)                                | 발신자의 주소입니다. 자세한 내용은 [Signature Validation of Transactions](README.md#signature-validation-of-transactions)을 참고해주세요.                                                                                                              |
| key          | AccountKey \(Go\)                                    | 업데이트 될 [AccountKey](../accounts.md#account-key)입니다.                                                                                                                                                                              |
| txSignatures | \[\]{\*big.Int, \*big.Int, \*big.Int} \(Go\) | 발신자의 서명입니다. 자세한 내용은 [Signature Validation of Transactions](README.md#signature-validation-of-transactions)을 참고해주세요.                                                                                                              |

### 서명 RLP 인코딩 <a id="rlp-encoding-for-signature"></a>

이 트랜잭션 유형의 서명을 만들려면 다음과 같이 RLP 직렬화를 수행해야합니다.

```javascript
SigRLP = encode([encode([type, nonce, gasPrice, gas, from, rlpEncodedKey]), chainid, 0, 0])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash, <private key>)
```

### SenderTxHash를 위한 RLP 인코딩 <a id="rlp-encoding-for-sendertxhash"></a>

SenderTxHash를 만들려면 다음과 같이 RLP 직렬화를 수행해야합니다.

```javascript
txSignatures (a single signature) = [[v, r, s]]
txSignatures (two signatures) = [[v1, r1, s1], [v2, r2, s2]]
SenderTxHashRLP = type + encode([nonce, gasPrice, gas, from, rlpEncodedKey, txSignatures])
SenderTxHash = keccak256(SenderTxHashRLP)
```

### 트랜잭션 해시를 위한 RLP 인코딩 <a id="rlp-encoding-for-transaction-hash"></a>

트랜잭션 해시를 만들려면 다음과 같이 RLP 직렬화를 수행해야합니다.

```javascript
txSignatures (a single signature) = [[v, r, s]]
txSignatures (two signatures) = [[v1, r1, s1], [v2, r2, s2]]
TxHashRLP = type + encode([nonce, gasPrice, gas, from, rlpEncodedKey, txSignatures])
TxHash = keccak256(TxHashRLP)
```

### RLP 인코딩 \(예시\) <a id="rlp-encoding-example"></a>

다음은 RLP 직렬화의 결과와 트랜잭션 오브젝트를 보여줍니다.

```javascript
ChainID 0x1
PrivateKey 0x45a915e4d060149eb4365960e6a7a45f334393093061116b197e3240065ff2d8
PublicKey.X 0x3a514176466fa815ed481ffad09110a2d344f6c9b78c1d14afc351c3a51be33d
PublicKey.Y 0x8072e77939dc03ba44790779b7a1025baf3003f6732430e20cd9b76d953391b3
SigRLP 0xf849b844f842208204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0ba302a1033a514176466fa815ed481ffad09110a2d344f6c9b78c1d14afc351c3a51be33d018080
SigHash 0xa0d3f1d2b4f061c3a5d9c22c7bb621aa821162b42b4db6cf1888defc2473e0ab
Signature f845f84325a0f7d479628f05f51320f0842193e3f7ae55a5b49d3645bf55c35bee1e8fd2593aa04de8eab5338fdc86e96f8c49ed516550f793fc2c4007614ce3d2a6b33cf9e451
TxHashRLP 0x20f8888204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0ba302a1033a514176466fa815ed481ffad09110a2d344f6c9b78c1d14afc351c3a51be33df845f84325a0f7d479628f05f51320f0842193e3f7ae55a5b49d3645bf55c35bee1e8fd2593aa04de8eab5338fdc86e96f8c49ed516550f793fc2c4007614ce3d2a6b33cf9e451
TxHash 8c70627d6b637c7d033ead083fc5e43e5cad10c704a86dd9bda7ac104a0e5ad0
SenderTxHashRLP 0x20f8888204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0ba302a1033a514176466fa815ed481ffad09110a2d344f6c9b78c1d14afc351c3a51be33df845f84325a0f7d479628f05f51320f0842193e3f7ae55a5b49d3645bf55c35bee1e8fd2593aa04de8eab5338fdc86e96f8c49ed516550f793fc2c4007614ce3d2a6b33cf9e451
SenderTxHash 8c70627d6b637c7d033ead083fc5e43e5cad10c704a86dd9bda7ac104a0e5ad0

    TX(8c70627d6b637c7d033ead083fc5e43e5cad10c704a86dd9bda7ac104a0e5ad0)
    Type:          TxTypeAccountUpdate
    From:          0xa94f5374Fce5edBC8E2a8697C15331677e6EbF0B
    Nonce:         1234
    GasPrice:      0x19
    GasLimit:      0xf4240
    Key:           AccountKeyPublic: S256Pubkey:{"x":"0x3a514176466fa815ed481ffad09110a2d344f6c9b78c1d14afc351c3a51be33d","y":"0x8072e77939dc03ba44790779b7a1025baf3003f6732430e20cd9b76d953391b3"}
    Signature:     [{"V":"0x25","R":"0xf7d479628f05f51320f0842193e3f7ae55a5b49d3645bf55c35bee1e8fd2593a","S":"0x4de8eab5338fdc86e96f8c49ed516550f793fc2c4007614ce3d2a6b33cf9e451"}]
    Hex:           20f8888204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0ba302a1033a514176466fa815ed481ffad09110a2d344f6c9b78c1d14afc351c3a51be33df845f84325a0f7d479628f05f51320f0842193e3f7ae55a5b49d3645bf55c35bee1e8fd2593aa04de8eab5338fdc86e96f8c49ed516550f793fc2c4007614ce3d2a6b33cf9e451
```

### RPC Output \(예시\) <a id="rpc-output-example"></a>

다음은 JSON RPC를 통해 반환된 트랜잭션 오브젝트를 보여줍니다.

```javascript
{
  "blockHash": "0x82983fe294d286e76486760e6904369285554e1744af16786c2393a956fb4ec4",
  "blockNumber": "0x2",
  "contractAddress": null,
  "from": "0x636f6c696e2e6b6c6179746e0000000000000000",
  "gas": "0x174876e800",
  "gasPrice": "0x5d21dba00",
  "gasUsed": "0xa028",
  "key": "0x02a1034ef27ba4b7d1ae09b166744c5b7ee4a7a0cc5c76b2e5d74523a0a4fb56db3191",
  "logs": [],
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "nonce": "0x0",
  "senderTxHash": "0x3f154903f92a179007b45b807af2d971ada9a23657e80bf5c18a75ac6516fd0b",
  "signatures": [
    {
      "V": "0x25",
      "R": "0x757827ec43eafdc150ecb35423699ceaea41b13dd07f8620e2231a7b0e278149",
      "S": "0x59d43ed3e0ed0f9d69d0c08ccca29913a8b138c000029f878f61337220a1ca1b"
    }
  ],
  "status": "0x1",
  "transactionHash": "0x3f154903f92a179007b45b807af2d971ada9a23657e80bf5c18a75ac6516fd0b",
  "transactionIndex": "0x0",
  "type": "TxTypeAccountUpdate",
  "typeInt": 32
}
```

## TxTypeCancel <a id="txtypecancel"></a>

TxTypeCancel는 트랜잭션 풀에서 같은 논스를 가진 트랜잭션을 취소합니다. 이 트랜잭션 유형은 제출된 트랜잭션이 일정 시간 동안 처리되지 않은 것으로 보일 때 유용합니다. 트랜잭션이 처리되지 않은 것처럼 보이는 경우가 몇 가지 있습니다: 1. 트랜잭션이 어딘가에서 손실되어 컨센서스 노드에 도달하지 못하는 경우 2. 어떤 컨센서스 노드에서도 아직 트랜잭션이 처리되지 않은 경우 3. 트랜잭션이 처리되었지만 트랜잭션이 포함된 블록이 전달되지 않은 경우

클라이언트 쪽에서는 정확한 원인을 파악하기가 매우 어렵습니다. 이유를 파악하려면 모든 컨센서스 노드를 살펴봐야 합니다. 단, 일반 사람들이 컨센서스 노드에 연결하는 것은 금지됩니다. 이러한 상황에서 일반적인 블록체인 플랫폼에서는 사용자가 이전 트랜잭션을 대체하기 위해 다른 트랜잭션을 더 높은 가스 가격으로 제출하는 경우가 많습니다. 다만, Klaytn에서는 가스 가격이 고정돼 있기 때문에, 기존 트랜잭션을 더 높은 가스 가격으로 대체하는 것은 불가능합니다.

트랜잭션이 처리되지 않은 상태로 유지되는 경우, 더 높은 논스를 가진 다른 트랜잭션이 처리될 수 없습니다. 논스로 트랜잭션 실행 순서가 결정되기 때문입니다.

이 문제를 해결하기 위해 Klaytn은 트랜잭션 유형 TxTypeCancel을 제공합니다. 사용자는 이러한 상황에 직면하면 TxTypeCancel 트랜잭션을 전송할 수 있습니다.

위의 각 상황은 다음과 같이 처리됩니다. 1. 이전 트랜잭션이 손실된 경우 TxTypeCancel 트랜잭션이 실행되어 블록에 포함됩니다. 2. 이전 트랜잭션이 아직 처리되지 않은 경우 TxTypeCancel은 이전 트랜잭션을 대체합니다. 그런 다음 실행되어 블록에 포함됩니다. 3. 이전 트랜잭션이 이미 실행된 경우, 논스가 증가했으므로 TxTypeCancel 트랜잭션은 논스가 낮아서 삭제됩니다.

TxTypeCancel 트랜잭션은 동일한 논스의 트랜잭션을 대체 할 수 있는 유일한 트랜잭션입니다. 다른 트랜잭션 유형은동일한 논스의 트랜잭션으로 바꿀 수 없습니다.

이 트랜잭션 유형은 다음과 같은 변경 사항을 만듭니다. 1. 발신자의 잔고는 트랜잭션 수수료만큼 줄어듭니다. 2. 발신자의 논스가 1 증가합니다.

### 속성 <a id="attributes"></a>

| 속성           | 형식                                                     | 설명                                                                                                                                                                                                                           |
|:------------ |:------------------------------------------------------ |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 형식           | uint8 \(Go\)                                         | TxTypeCancel의 유형입니다. 이는 0x38이어야 합니다.                                                                                                                                                                                         |
| 논스           | uint64 \(Go\)                                        | 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 발신자가 동일한 논스를 가진 두 개의 트랜잭션을 생성하면 하나만 실행됩니다.  `TxTypeCancel`을 사용할 때 이 값은 취소할 타겟 트랜잭션의 논스 값과 같아야 합니다.                                                                                        |
| gasPrice     | \*big.Int \(Go\)                                   | 발신자가 트랜잭션 수수료로 지불하는 가스의 단가입니다(단위는 peb). 트랜잭션 수수료는 `gas` \* `gasPrice`으로 계산됩니다. 예를 들어, 만약 가스가 10이 필요하고 gasPrice가 10^18이라면 발신자는 트랜잭션을 위해 10 KLAY를 지급해야 합니다. [KLAY의 단위](../klaytn-native-coin-klay.md#units-of-klay)를 참고해주세요. |
| gas          | uint64 \(Go\)                                        | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                                                                                                                             |
| from         | common.Address \(Go\)                                | 발신자의 주소입니다. 자세한 내용은 [트랜잭션의 서명 검증](README.md#signature-validation-of-transactions)을 참고해주세요.                                                                                                                                   |
| txSignatures | \[\]{\*big.Int, \*big.Int, \*big.Int} \(Go\) | 발신자의 서명입니다. 자세한 내용은 [트랜잭션의 서명 검증](README.md#signature-validation-of-transactions)을 참고해주세요.                                                                                                                                   |

결과:

1. 같은 논스를 가진 트랜잭션이 있으면, 이 취소 트랜잭션으로 대체됩니다.
2. 만약 같은 논스가 없으면 이 트랜잭션은 보통 트랜잭션으로 삽입됩니다.
3. 취소 트랜잭션은 다른 트랜잭션 유형으로 대체되지 않습니다.

### 서명 RLP 인코딩 <a id="rlp-encoding-for-signature"></a>

트랜잭션 서명을 만들려면 다음과 같이 RLP 직렬화를 수행해야합니다.

```javascript
SigRLP = encode([encode([type, nonce, gasPrice, gas, from]), chainid, 0, 0])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash, <private key>)
```

### SenderTxHash를 위한 RLP 인코딩 <a id="rlp-encoding-for-sendertxhash"></a>

SenderTxHash를 만들려면 다음과 같이 RLP 직렬화를 수행해야 합니다.

```javascript
txSignatures (a single signature) = [[v, r, s]]
txSignatures (two signatures) = [[v1, r1, s1], [v2, r2, s2]]
SenderTxHashRLP = type + encode([nonce, gasPrice, gas, from, txSignatures])
SenderTxHash = keccak256(SenderTxHashRLP)
```

### 트랜잭션 해시를 위한 RLP 인코딩 <a id="rlp-encoding-for-transaction-hash"></a>

트랜잭션 해시를 만들려면 다음과 같이 RLP 직렬화를 수행해야 합니다.

```javascript
txSignatures (a single signature) = [[v, r, s]]
txSignatures (two signatures) = [[v1, r1, s1], [v2, r2, s2]]
TxHashRLP = type + encode([nonce, gasPrice, gas, from, txSignatures])
TxHash = keccak256(TxHashRLP)
```

### RLP 인코딩 \(예시\) <a id="rlp-encoding-example"></a>

다음은 RLP 직렬화의 결과와 트랜잭션 오브젝트를 보여줍니다.

```javascript
ChainID 0x1
PrivateKey 0x45a915e4d060149eb4365960e6a7a45f334393093061116b197e3240065ff2d8
PublicKey.X 0x3a514176466fa815ed481ffad09110a2d344f6c9b78c1d14afc351c3a51be33d
PublicKey.Y 0x8072e77939dc03ba44790779b7a1025baf3003f6732430e20cd9b76d953391b3
SigRLP 0xe39fde388204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0b018080
SigHash 0xaaac6d71ad921e8a12e92c47d0b0654a20d8d9a4ff70d83f78661ccdf062ce9a
Signature f845f84325a0fb2c3d53d2f6b7bb1deb5a09f80366a5a45429cc1e3956687b075a9dcad20434a05c6187822ee23b1001e9613d29a5d6002f990498d2902904f7f259ab3358216e
TxHashRLP 0x38f8648204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0bf845f84325a0fb2c3d53d2f6b7bb1deb5a09f80366a5a45429cc1e3956687b075a9dcad20434a05c6187822ee23b1001e9613d29a5d6002f990498d2902904f7f259ab3358216e
TxHash 10d135d590cb587cc45c1f94f4a0e3b8c24d24a6e4243f09ca395fb4e2450413
SenderTxHashRLP 0x38f8648204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0bf845f84325a0fb2c3d53d2f6b7bb1deb5a09f80366a5a45429cc1e3956687b075a9dcad20434a05c6187822ee23b1001e9613d29a5d6002f990498d2902904f7f259ab3358216e
SenderTxHash 10d135d590cb587cc45c1f94f4a0e3b8c24d24a6e4243f09ca395fb4e2450413

    TX(10d135d590cb587cc45c1f94f4a0e3b8c24d24a6e4243f09ca395fb4e2450413)
    Type:          TxTypeCancel
    From:          0xa94f5374Fce5edBC8E2a8697C15331677e6EbF0B
    Nonce:         1234
    GasPrice:      0x19
    GasLimit:      0xf4240
    Signature:     [{"V":"0x25","R":"0xfb2c3d53d2f6b7bb1deb5a09f80366a5a45429cc1e3956687b075a9dcad20434","S":"0x5c6187822ee23b1001e9613d29a5d6002f990498d2902904f7f259ab3358216e"}]
    Hex:           38f8648204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0bf845f84325a0fb2c3d53d2f6b7bb1deb5a09f80366a5a45429cc1e3956687b075a9dcad20434a05c6187822ee23b1001e9613d29a5d6002f990498d2902904f7f259ab3358216e
```

### RPC Output \(예시\) <a id="rpc-output-example"></a>

다음은 JSON RPC를 통해 반환된 트랜잭션 오브젝트를 보여줍니다.

```javascript
{
  "blockHash": "0x82983fe294d286e76486760e6904369285554e1744af16786c2393a956fb4ec4",
  "blockNumber": "0x2",
  "contractAddress": null,
  "from": "0x0fcda0f2efbe1b4e61b487701ce4f2f8abc3723d",
  "gas": "0x174876e800",
  "gasPrice": "0x5d21dba00",
  "gasUsed": "0x5208",
  "logs": [],
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "nonce": "0x10",
  "senderTxHash": "0x0370adf89b2463d3d1fd894d6328929c931ef0cc3a8f1481affedd2e9c88d9d6",
  "signatures": [
    {
      "V": "0x26",
      "R": "0xad73f30acfb80090cba8d3f4be4696e65f8eb7c36b85aac06a9bea350d10578f",
      "S": "0x7ec2d6f052d8f916d12db2e0310381201888cb12d3a3696da80cab5195833706"
    }
  ],
  "status": "0x1",
  "transactionHash": "0x0370adf89b2463d3d1fd894d6328929c931ef0cc3a8f1481affedd2e9c88d9d6",
  "transactionIndex": "0x9",
  "type": "TxTypeCancel",
  "typeInt": 56
}
```

## TxTypeChainDataAnchoring <a id="txtypechaindataanchoring"></a>

TxTypeChainDataAnchoringTransaction는 서비스체인 데이터를 Klaytn 메인체인에 앵커링하는 트랜잭션입니다. 서비스체인은 주기적으로 이러한 종류의 트랜잭션을 Klaytn 메인체인에 보내어 자신의 데이터 보안과 신뢰성을 검증받습니다. 데이터 앵커링에 관한 더 자세한 내용은 [Anchoring](../../../node/service-chain/references/anchoring.md)을 참조하시기 바랍니다. 이 트랜잭션은 RPC 호출로 전송하시면 안 된다는 점을 유의하시기 바랍니다. 현재 이 트랜잭션은 보안상의 이유로 비공개 p2p 채널을 통해 실행됩니다. 이 트랜잭션은 발신자의 논스를 1씩 증가시키는 것을 제외하고는 Klaytn 블록 체인의 상태를 변경하지 않습니다.

### 속성 <a id="attributes"></a>

| 속성           | 타입                                                     | 설명                                                                                                                                                                                                                           |
|:------------ |:------------------------------------------------------ |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type         | uint8 \(Go\)                                         | TxTypeChainDataAnchoringTransaction의 유형입니다. 이는 0x48이어야 합니다.                                                                                                                                                                  |
| nonce        | uint64 \(Go\)                                        | 발신자의 트랜잭션을 고유하게 식별하기 위해 사용되는 값입니다. 발신자가 동일한 논스를 가진 두 개의 트랜잭션을 생성하면 하나만 실행됩니다.                                                                                                                                                |
| gasPrice     | \*big.Int \(Go\)                                   | 발신자가 트랜잭션 수수료로 지불하는 가스의 단가입니다(단위는 peb). 트랜잭션 수수료는 `gas` \* `gasPrice`으로 계산됩니다. 예를 들어, 만약 가스가 10이 필요하고 gasPrice가 10^18이라면 발신자는 트랜잭션을 위해 10 KLAY를 지급해야 합니다. [KLAY의 단위](../klaytn-native-coin-klay.md#units-of-klay)를 참고해주세요. |
| gas          | uint64 \(Go\)                                        | 트랜잭션에서 사용하도록 허락된 최대 트랜잭션 수수료입니다.                                                                                                                                                                                             |
| from         | common.Address \(Go\)                                | 발신자의 주소입니다. 자세한 내용은 [트랜잭션의 서명 검증](README.md#signature-validation-of-transactions)을 참고해주세요.                                                                                                                                   |
| input        | \[\]byte \(Go\)                                    | 서비스체인의 데이터입니다.                                                                                                                                                                                                               |
| txSignatures | \[\]{\*big.Int, \*big.Int, \*big.Int} \(Go\) | 발신자의 서명입니다. 자세한 내용은 [트랜잭션의 서명 검증](README.md#signature-validation-of-transactions)을 참고해주세요.                                                                                                                                   |

### 서명 RLP 인코딩 <a id="rlp-encoding-for-signature"></a>

이 트랜잭션 유형의 서명을 만들려면 다음과 같이 RLP 직렬화를 수행해야합니다.

```javascript
SigRLP = encode([encode([type, nonce, gasPrice, gas, from, anchoredData]), chainid, 0, 0])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash, <private key>)
```

### SenderTxHash를 위한 RLP 인코딩 <a id="rlp-encoding-for-sendertxhash"></a>

SenderTxHash를 만들려면 다음과 같이 RLP 직렬화를 수행해야 합니다.

```javascript
txSignatures (a single signature) = [[v, r, s]]
txSignatures (two signatures) = [[v1, r1, s1], [v2, r2, s2]]
SenderTxHashRLP = type + encode([nonce, gasPrice, gas, from, anchoredData, txSignatures])
SenderTxHash = keccak256(SenderTxHashRLP)
```

### 트랜잭션 해시를 위한 RLP 인코딩 <a id="rlp-encoding-for-transaction-hash"></a>

트랜잭션 해시를 만들려면 다음과 같이 RLP 직렬화를 수행해야 합니다.

```javascript
txSignatures (a single signature) = [[v, r, s]]
txSignatures (two signatures) = [[v1, r1, s1], [v2, r2, s2]]
TxHashRLP = type + encode([nonce, gasPrice, gas, from, anchoredData, txSignatures])
TxHash = keccak256(TxHashRLP)
```

### RLP 인코딩 \(예시\) <a id="rlp-encoding-example"></a>

다음은 RLP 직렬화의 결과와 트랜잭션 오브젝트를 보여줍니다.

```javascript
ChainID 0x1
PrivateKey 0x45a915e4d060149eb4365960e6a7a45f334393093061116b197e3240065ff2d8
PublicKey.X 0x3a514176466fa815ed481ffad09110a2d344f6c9b78c1d14afc351c3a51be33d
PublicKey.Y 0x8072e77939dc03ba44790779b7a1025baf3003f6732430e20cd9b76d953391b3
SigRLP 0xf8cfb8caf8c8488204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0bb8a8f8a6a00000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000405018080
SigHash 0x07e07c69a12e384c16d94157c99d0a6fbae1d99f5d54501bfdc5937bbee7c792
Signature f845f84325a0e58b9abf9f33a066b998fccaca711553fb4df425c9234bbb3577f9d9775bb124a02c409a6c5d92277c0a812dd0cc553d7fe1d652a807274c3786df3292cd473e09
TxHashRLP 0x48f9010e8204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0bb8a8f8a6a00000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000405f845f84325a0e58b9abf9f33a066b998fccaca711553fb4df425c9234bbb3577f9d9775bb124a02c409a6c5d92277c0a812dd0cc553d7fe1d652a807274c3786df3292cd473e09
TxHash 4aad85735e777795d24aa3eab51be959d8ebdf9683083d85b66f70b7170f2ea3
SenderTxHashRLP 0x48f9010e8204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0bb8a8f8a6a00000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000405f845f84325a0e58b9abf9f33a066b998fccaca711553fb4df425c9234bbb3577f9d9775bb124a02c409a6c5d92277c0a812dd0cc553d7fe1d652a807274c3786df3292cd473e09
SenderTxHash 4aad85735e777795d24aa3eab51be959d8ebdf9683083d85b66f70b7170f2ea3

    TX(4aad85735e777795d24aa3eab51be959d8ebdf9683083d85b66f70b7170f2ea3)
    Type:          TxTypeChainDataAnchoring
    From:          0xa94f5374Fce5edBC8E2a8697C15331677e6EbF0B
    Nonce:         1234
    GasPrice:      0x19
    GasLimit:      0xf4240
    Signature:     [{"V":"0x25","R":"0xe58b9abf9f33a066b998fccaca711553fb4df425c9234bbb3577f9d9775bb124","S":"0x2c409a6c5d92277c0a812dd0cc553d7fe1d652a807274c3786df3292cd473e09"}]
    Hex:           48f9010e8204d219830f424094a94f5374fce5edbc8e2a8697c15331677e6ebf0bb8a8f8a6a00000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000405f845f84325a0e58b9abf9f33a066b998fccaca711553fb4df425c9234bbb3577f9d9775bb124a02c409a6c5d92277c0a812dd0cc553d7fe1d652a807274c3786df3292cd473e09
    AnchoredData:  f8a6a00000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000405
```

### RPC Output \(예시\) <a id="rpc-output-example"></a>

다음은 JSON RPC를 통해 반환된 트랜잭션 오브젝트를 보여줍니다.

```javascript
{
  "blockHash": "0x82983fe294d286e76486760e6904369285554e1744af16786c2393a956fb4ec4",
  "blockNumber": "0x2",
  "contractAddress": null,
  "from": "0x0fcda0f2efbe1b4e61b487701ce4f2f8abc3723d",
  "gas": "0x174876e800",
  "gasPrice": "0x5d21dba00",
  "gasUsed": "0x93a8",
  "input": "0xf8a6a00000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001a00000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000000405",
  "logs": [],
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "nonce": "0x13",
  "senderTxHash": "0x28b56268d18b116b08b1673caad80212f271d6e36ceef225b44c6d2a1f0413db",
  "signatures": [
    {
      "V": "0x26",
      "R": "0x7049656869a9442d26ed0c2cbf15812dc486580d03f1cc6373104410225e1e7b",
      "S": "0x3c58fd9ae9390e6484e965572821846445983d9b5eb7866aa4113c56a5bf253e"
    }
  ],
  "status": "0x1",
  "transactionHash": "0x28b56268d18b116b08b1673caad80212f271d6e36ceef225b44c6d2a1f0413db",
  "transactionIndex": "0xc",
  "type": "TxTypeChainDataAnchoring",
  "typeInt": 72
}
```
