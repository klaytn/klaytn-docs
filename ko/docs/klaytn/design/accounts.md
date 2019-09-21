# 계정

## Klaytn 계정

### 계정(account), 상태(state), 주소(adress)에 대한 개요

Klaytn의 계정(account)은 개인의 잔액이나 스마트 계약에 관한 정보를 포함하는 데이터 구조입니다. Klaytn의 상태(state)는 모든 계정의 상태, 즉 Klaytn의 계정들에 저장된 모든 데이터의 과거와 현재 상태를 의미합니다. Klaytn 노드에서 트랜잭션이 실행되면, Klaytn의 상태는 모든 노드에서 변경됩니다. Klaytn의 노드들이 같은 블록들을 같은 순서대로 처리했다면 Klaytn의 상태는 Klaytn 네트워크의 모든 노드에서 동일해야 합니다. 각 계정의 상태 정보는 각 계정의 식별에 사용되는 20바이트 주소로 참조할 수 있습니다. 

### 주소로부터 키 쌍(key pairs) 분리하기

일반적인 블록체인 플랫폼의 계정은 다음과 같은 특정 길이의 암호화된 주소와 연결되어있습니다 "0x0fe2e20716753082222b52e753854f40afddffd2". 이 주소는 키 쌍(key pair)과 강하게 결합되어 있습니다. 이 주소는 키 쌍(key pair)과 강하게 결합되어 있습니다. 키 쌍이 선택된 경우, 주소는 공개 키에서 파생됩니다. 이는 사용자 경험 측면에서 많은 단점을 가지고 있습니다. 몇가지 단점의 예시는 다음과 같습니다.

* 사용자가 원하는 주소를 가질 수 없습니다.
* 보안성을 향상하기 위해 여러 키 쌍을 사용할 수 없습니다.
* 개인키가 노출되었을 때나 사용자가 주기적으로 보안성 향상을 위해 개인키를 변경하고 싶을 때 키 쌍을 변경할 수 없습니다.

이런 단점들은 블록체인 플랫폼에서 사용자가 주소를 식별자로 생각할 수 없게 만드는 큰 장애물입니다. 이 문제를 해결하기 위해 클레이튼은 사용자가 자신의 주소와 키 쌍을 선택할 수 있도록 하는 기능을 제공합니다. 이 기능으로 사용자는 원하는 주소를 선택할 수 있고, 다중 키 쌍을 사용하여 보안을 강화할 수 있습니다. 키 쌍의 수는 하나 이상이 될 수 있으며, 키 쌍은 각기 다른 역할을 할 수 있습니다. 다중 키 쌍과 역할기반 키에 대한 상세 내용은 [Multiple Key Pairs & Role-Based Keys를 참고해주세요.](accounts.md#multiple-key-pairs-and-role-based-keys)

Klatn은 키 쌍과 주소가 강하게 결합되어 있는 전통적인 방식 또한 지원한다는 사실도 기억해주세요.

### 다중 키 쌍과 역할기반 키 

앞에서 설명한 것처럼 개인 키를 도난당하거나, 개인 키가 노출된 경우 다시 계정을 안전한 상태로 되돌릴 방법이 없습니다. 가장 좋은 방법은 다른 키 쌍을 생성하여 새 계정을 만들고 기존 계정에서 잔액을 옮기는 것입니다. 다중 서명 또는 용도별 키와 같은 고급 키 체계가 지원되지 않으면 매우 불편합니다. 이러한 문제를 더욱 효율적으로 해결하기 위해 Klaytn 계정은 다음 기능을 제공합니다.

* Klaytn 계정은 키 쌍과 연결되는데, 이 키 쌍은 변경될 수 있습니다.
* Klaytn 계정은 다중 키 쌍을 지원하며, 각 키는 다른 목적을 가지도록 할 수 있습니다.
* Klaytn account maintains compatibility with accounts having a single key that is strongly coupled with the address.

Klaytn 계정의 역할 기반 키나 다중 키 기능을 이용하여, 사용자는 실생활에서 일어날 수 있는 개인키 노출 등 여러 보안 위협에 더욱 잘 대처할 수 있습니다. 예를 들어, 사용자가 자신의 개인키가 노출되었다는 것을 알게 되면 사용자는 자신의 계정에서 노출된 키 쌍을 제거하고 새키 쌍을 만들어 노출된 개인키와 간단히 교체 할 수 있습니다. 키 교체 작업을 위해서 미리 생성된 계정 정보 업데이트용 키를 이용할 수 있습니다. 이 키는 노출된 개인키와 따로 저장되어있어서 노출되지 않았어야 안전하게 이용할 수 있습니다.

### Human-Readable Address \(HRA\)

블록체인 플랫폼의 주소 체계 \(예 : "0x0fe2e20716753082222b52e753854f40afddffd2"\)는 계정 소유자의 개인 정보를 효율적으로 보호한다는 점에서 장점이 있지만, 사용자 경험 측면에서는 매우 불편합니다. 첫째, 인간의 두뇌는 이런 주소를 암기하거나 인식하기 어려워하기 때문에, 이런 주소 체계는 입력 실수 같은 다양한 인적 오류를 유발하여 중대한 재정적 손해를 입힐 수도 있습니다. 둘째, 이런 주소 체계는 사용자가 선호하는 사용하거나 기억하기 쉬운 주소를 선택할 기회를 뺏어갑니다. 이런 문제들은 더욱 간단하고, 쉬운 기존의 모바일 앱이나 서비스에 익숙한 사용자들이 BApp을 낯설고, 이해할 수 없으며, 불편하다고 생각하게 할 수 있습니다. 따라서 사용성에 큰 문제가 됩니다. 이전 버전과의 호환성을 제공하고, 대규모 아키텍쳐 변경 없이 이런 문제를 해결하기 위해 Klaytn은 20바이트 주소와 20바이트 문자열 매핑을 제공합니다. 이 문자열은 사용자가 지정할 수 있습니다. 이 기능은 human-readable address \(HRA\)라고 불립니다. 이 기능은 현재 개발 중이며 준비가 되면 더 많은 정보가 제공될 것입니다.

#### Klaytn Wallet 키 형식

Klaytn wallet 키 형식은 해당 주소와 함께 개인키를 쉽게 다룰 수 있도록 만들어졌습니다. 이는 사용자가 개인키를 주소와 함께 관리하기 쉽게 만듭니다. 이 형식은 `0x{private key}0x{type}0x{address in hex}`입니다. 16진법을 따르며, `{type}`은 `00`여야 합니다. 다른 값은 예약되어 있습니다. 예시는 다음과 같습니다.

```text
0x45a915e4d060149eb4365960e6a7a45f334393093061116b197e3240065ff2d80x000xa94f5374fce5edbc8e2a8697c15331677e6ebf0b
```

이 형식은 현재 [Klaytn Wallet](../../toolkit/klaytn-wallet.md)에서 지원됩니다.

### Klaytn 계정 유형

Klaytn에는 두 가지 유형의 계정이 있습니다 : 외부 소유 계정 \(EOAs\) 및 스마트 컨트랙트 계정\(SCAs\)

#### 외부 소유 계정 \(EOAs\)

외부 소유 계정에는 논스(nonce) 및 잔고와 같은 정보가 있습니다. 이 유형의 계정에는 코드 또는 스토리지가 없습니다. EOA는 개인키로 제어되며 관련 코드를 가지지 않습니다. EOA는 키 페어를 사용하여 생성되고, 키 페어를 가진 어떤 사람이든 EOA를 제어 할 수 있습니다. 계정키는 [Account Key](accounts.md#account-key) 섹션에 설명되어있습니다.

**속성**

| 속성            | 형식                                    | 설명                                                                                                                                                                                                                                                                                                                                          |
|:------------- |:------------------------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type          | uint8 \(Go\)                        | EOA의 Type. EOA의 경우 Type은 **0x1**이어야 합니다.                                                                                                                                                                                                                                                                                                    |
| nonce         | uint64 \(Go\)                       | 트랜잭션의 순서를 정하기 위한 시퀀스 번호(Sequence number). 다음 처리 될 트랜잭션은 이 값과 같은 Nonce값을 가집니다.                                                                                                                                                                                                                                                               |
| balance       | \*big.Int \(Go\)                  | 계정이 가지고 있는 Klay의 양                                                                                                                                                                                                                                                                                                                          |
| humanReadable | bool \(Go\)                         | 계정이 Human-readable address와 연결되어있는지 알려주는 Boolean 값 [HRA](accounts.md#human-readable-address-hra)은 현재 개발중이므로, 이 값은 모든 계정에서 false로 지정되어있습니다.                                                                                                                                                                                                  |
| key           | [AccountKey](accounts.md#account-key) | 이 계정과 연결된 키. 이 필드는 [AccountKeyLegacy](accounts.md#accountkeylegacy), [AccountKeyPublic](accounts.md#accountkeypublic), [AccountKeyFail](accounts.md#accountkeyfail), [AccountKeyWeightedMultisig](accounts.md#accountkeyweightedmultisig), [AccountKeyRoleBased](accounts.md#accountkeyrolebased) 중 어떤 것이라도 될 수 있습니다. 트랜잭션의 서명은 이 키로 검증됩니다. |


#### 스마트 컨트랙트 계정 \(SCAs\)

EOA와 달리 SCA에는 관련 코드가 있으며 해당 코드로 제어됩니다. SCA는 스마트 컨트랙트 배포(deployment) 트랜잭션에 의해 생성됩니다. 일단 배포되면 SCA는 자체적으로 새 트랜잭션을 시작할 수 없으며, EOA 또는 다른 SCA나 다른 계정에 의해 작동되어야합니다.

**속성**

| 속성            | 형식                                    | 설명                                                                                                                                                                                                                                                                                                                                          |
|:------------- |:------------------------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type          | uint8 \(Go\)                        | 스마트 컨트랙트 계정의 type입니다. SCA의 경우 Type은 **0x2**이어야 합니다.                                                                                                                                                                                                                                                                                         |
| nonce         | uint64 \(Go\)                       | 트랜잭션의 순서를 정하기 위한 시퀀스 번호(Sequence number). 다음 처리 될 트랜잭션은 이 값과 같은 Nonce값을 가집니다.                                                                                                                                                                                                                                                               |
| balance       | \*big.Int \(Go\)                  | 계정이 가지고 있는 Klay의 양                                                                                                                                                                                                                                                                                                                          |
| humanReadable | bool \(Go\)                         | 계정이 Human-readable address와 연결되어있는지 알려주는 Boolean 값 [HRA](accounts.md#human-readable-address-hra)은 현재 개발중이므로, 이 값은 모든 계정에서 false로 지정되어있습니다.                                                                                                                                                                                                  |
| key           | [AccountKey](accounts.md#account-key) | 이 계정과 연결된 키. 이 필드는 [AccountKeyLegacy](accounts.md#accountkeylegacy), [AccountKeyPublic](accounts.md#accountkeypublic), [AccountKeyFail](accounts.md#accountkeyfail), [AccountKeyWeightedMultisig](accounts.md#accountkeyweightedmultisig), [AccountKeyRoleBased](accounts.md#accountkeyrolebased) 중 어떤 것이라도 될 수 있습니다. 트랜잭션의 서명은 이 키로 검증됩니다. |
| codeHash      | \[\]byte \(Go\)                   | 계정의 스마트 컨트랙트 코드의 해시값. 이 값은 변경할 수 없으며, 스마트 컨트랙트가 생성 될 때만 설정됩니다.                                                                                                                                                                                                                                                                              |
| storageRoot   | \[32\]byte \(Go\)                 | 계정에 저장된 모든 변수들의 값을 포함하는 Merkle Patricia trie 루트의 256비트 해시값입니다.                                                                                                                                                                                                                                                                              |
| codeFormat    | uint8 \(Go\)                        | 이 계정의 코드 형식입니다. 현재는 EVM\(0x00\)만 지원합니다.                                                                                                                                                                                                                                                                                                   |


### Klaytn 계정 유형 ID

아래는 각 계정 유형에 할당된 계정 유형 ID입니다.

| 계정 유형                | 계정 유형 ID |
| -------------------- | -------- |
| 외부 소유 계정 \(EOAs)    | 0x1      |
| 스마트 컨트랙트 계정 \(SCAs) | 0x2      |


## 계정 키

계정 키는 계정과 연결된 키 구조를 나타냅니다.

### AccountKeyNil

AccountKeyNil은 빈(empty) 키를 나타냅니다. 계정이 AccountKeyNil object를 가지려고 하면 트랜잭션은 실패합니다. AccountKeyNil은 역할기반 키(role-based keys)를 이용하는 TxTypeAccountUpdate 트랜잭션에만 사용됩니다. 예를 들어, 계정이 RoleAccountUpdate 키만 업데이트하려고 할 때TxTypeAccountUpdate 트랜잭션의 키 필드는 다음과 같습니다.

`[AccountKeyNil, NewKey, AccountKeyNil]`

그런 다음 RoleAccountUpdate 키만 업데이트됩니다. 다른 역할은 업데이트되지 않습니다. 상세사항을 알고 싶으시면 [AccountKeyRoleBased](accounts.md#accountkeyrolebased)를 참고해주세요.

#### 속성

No attributes for AccountKeyNil.

#### RLP 인코딩

`0x80`

### AccountKeyLegacy

AccountKeyLegacy는 해당 키 쌍에서 파생된 주소를 가진 계정에 사용됩니다. 계정이 AccountKeyLegacy를 가지고 있는 경우, 트랜잭션 유효성 검사 절차는 다음과 같이 수행됩니다. 일반적인 블록체인 플랫폼의 절차와 같습니다.

* 공개키를 `ecrecover(txhash, txsig)`로부터 얻습니다.
* 공개키의 주소를 얻습니다.
* 주소는 발신자입니다.

#### 속성

| 속성   | 형식             | 설명                                             |
|:---- |:-------------- |:---------------------------------------------- |
| Type | uint8 \(Go\) | AccountKeyLegacy의 type입니다. 이는 **0x01**이어야 합니다. |


#### RLP 인코딩

`0x01c0`

### AccountKeyPublic

AccountKeyPublic은 하나의 공개키를 가진 계정이 사용할 수 있습니다. 계정이 AccountKeyPublic object를 가지고 있다면, 트랜잭션 유효성 검사 절차는 아래와 같이 진행됩니다.

* `ecrecover(txhash, txsig)`로부터 파생된 공개키를 얻습니다.
* 파생된 공개키가 해당 계정의 공개키와 같은지 확인합니다.
    
    

#### 속성

| 속성   | 형식                    | 설명                                            |
|:---- |:--------------------- |:--------------------------------------------- |
| Type | uint8 \(Go\)        | AccountKeyPublic의 type. 이는 **0x02**가 되어야 합니다. |
| Key  | \[33\]byte \(Go\) | 키는 S256 곡선에서 압축된 공개키여야 합니다.                   |


#### RLP 인코딩

`0x02 + encode(CompressedPubKey)`

**참고**: CompressedPubKey는 [SEC1](https://www.secg.org/SEC1-Ver-1.0.pdf)에 정의된 압축된 형식의 공개키입니다. 즉, PubkeyY가 짝수이면 0x02{PubkeyX} 이고, 그렇지 않으면 0x03{PubkeyX} 입니다.

#### RLP 인코딩 \(예시\)

```javascript
prvkey 0xf8cc7c3813ad23817466b1802ee805ee417001fcce9376ab8728c92dd8ea0a6b
pubkeyX 0xdbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8
pubkeyY 0x906d7170ba349c86879fb8006134cbf57bda9db9214a90b607b6b4ab57fc026e

RLP: 0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8
```

### AccountKeyFail

계정에 AccountKeyFail 키가 있으면 트랜잭션 유효성 검증 프로세스는 항상 실패하게 됩니다. 특정 스마트 컨트랙트 계정에서 전송된 트랜잭션이 항상 실패하도록 사용될 수 있습니다.

#### 속성

| 속성   | 형식             | 설명                                     |
|:---- |:-------------- |:-------------------------------------- |
| Type | uint8 \(Go\) | AcccountKeyFail의 type. 이는 0x03이어야 합니다. |


#### RLP 인코딩

`0x03c0`

### AccountKeyWeightedMultiSig

AccountKeyWeightedMultiSig is an account key type containing a threshold and WeightedPublicKeys which contains a list whose item is composed of a public key and its weight. To be a valid transaction for an account associated with AccountKeyWeightedMultiSig, the weighted sum of signed public keys should be larger than the threshold.

#### 속성

| 속성                 | Type                                | Description                                                                                                                    |
|:------------------ |:----------------------------------- |:------------------------------------------------------------------------------------------------------------------------------ |
| Type               | uint8 \(Go\)                      | The type of AccountKeyWeightedMultiSig. This must be **0x04**.                                                                 |
| Threshold          | uint \(Go\)                       | Validation threshold. To be a valid transaction, the weight sum of signatures should be larger than or equal to the threshold. |
| WeightedPublicKeys | \[\]{uint, \[33\]byte} \(Go\) | A list of weighted public keys. A weighted public key contains a compressed public key and its weight.                         |


#### RLP 인코딩

`0x04 + encode([threshold, [[weight, CompressedPubKey1], [weight2, CompressedPubKey2]]])`

#### RLP 인코딩 \(예시\)

```javascript
Threshold 3
Key0 Weight: 1
PubkeyX 0xc734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e
PubkeyY 0x61a443ac3ffff164d1fb3617875f07641014cf17af6b7dc38e429fe838763712
Key1 Weight: 1
PubkeyX 0x12d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb
PubkeyY 0x8ef355a8d524eb444eba507f236309ce08370debaa136cb91b2f445774bff842
Key2 Weight: 1
PubkeyX 0xea9a9f85065a00d7b9ffd3a8532a574035984587fd08107d8f4cbad6b786b0cd
PubkeyY 0xb95ebb02d9397b4a8faceb58d485d612f0379a923ec0ddcf083378460a56acca
Key3 Weight: 1
PubkeyX 0x8551bc489d62fa2e6f767ba87fe93a62b679fca8ff3114eb5805e6487b51e8f6
PubkeyY 0x4206aa84bc8955fcbfcc396854228aa63ebacd81b7311a31ab9d71d90b7ec3d7

RLP: 0x04f89303f890e301a102c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110ee301a10212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfbe301a102ea9a9f85065a00d7b9ffd3a8532a574035984587fd08107d8f4cbad6b786b0cde301a1038551bc489d62fa2e6f767ba87fe93a62b679fca8ff3114eb5805e6487b51e8f6
```

### AccountKeyRoleBased

AccountKeyRoleBased represents a role-based key. The roles are specified at [Roles](accounts.md#roles).

#### 속성

| 속성   | Type                        | Description                                                                                                                            |
|:---- |:--------------------------- |:-------------------------------------------------------------------------------------------------------------------------------------- |
| Type | uint8 \(Go\)              | The type of AccountKeyRoleBased. It must be **0x05**.                                                                                  |
| Keys | \[\]{AccountKey} \(Go\) | A list of keys. A key can be any of AccountKeyNil, AccountKeyLegacy, AccountKeyPublic, AccountKeyFail, and AccountKeyWeightedMultiSig. |


#### Roles

Roles of AccountKeyRoleBased are defined as below:

| Role              | Description                                                                                                                                                                                                                       |
|:----------------- |:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RoleTransaction   | Index 0. Default key. Transactions other than TxTypeAccountUpdate should be signed by the key of this role.                                                                                                                       |
| RoleAccountUpdate | Index 1. TxTypeAccountUpdate transaction should be signed by this key. If this key is not present in the account, TxTypeAccountUpdate transaction is validated using RoleTransaction key.                                         |
| RoleFeePayer      | Index 2. If this account wants to send tx fee instead of the sender, the transaction should be signed by this key. If this key is not present in the account, a fee-delegated transaction is validated using RoleTransaction key. |


#### RLP 인코딩

`0x05 + encode([key1, key2, key3])`

Note that key1, key2, and key3 can be any of above keys \(AccountKeyNil, AccountKeyLegacy, AccountKeyPublic, AccountKeyFail, and AccountKeyWeightedMultiSig\).

#### Omissible and Extendable Roles

The roles can be omitted from the last, and the omitted roles are mapped to the first role. However, a role in the middle cannot be omitted, which means RoleTransaction and RoleFeePayer cannot be set without RoleAccountUpdate. For example, if a role-based key is set to `0x05 + encode([key1, key2])`, RoleFeePayer works as if the key is set like `0x05 + encode([key1, key2, key1])`.

This feature is provided to extend more roles in the future. If a new role is provided, the new role of accounts already created with old roles is mapped to the first role.

#### RLP 인코딩 \(예시\)

```javascript
RoleTransaction Key
PubkeyX 0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d
PubkeyY 0x0a5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919
RoleAccountUpdate Key
Threshold: 2
Key0 Weight:1
PubkeyX 0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d
PubkeyY 0x0a5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919
Key1 Weight:1
PubkeyX 0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06
PubkeyY 0x6fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d
RoleFeePayer Key
PubkeyX 0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447
PubkeyY 0x94c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2

RLP: 0x05f898a302a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512db84e04f84b02f848e301a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512de301a10336f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06a302a102c8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447
```

## Account Key Type ID

Below are the Account Key Type ID assigned to each Account Key Type.

| Account Key Type           | Account Key Type ID |
| -------------------------- | ------------------- |
| AccountKeyLegacy           | 0x01                |
| AccountKeyPublic           | 0x02                |
| AccountKeyFail             | 0x03                |
| AccountKeyWeightedMultiSig | 0x04                |
| AccountKeyRoleBased        | 0x05                |