# Accounts <a id="accounts"></a>

## Klaytn Accounts <a id="klaytn-accounts"></a>

### Overview of Account, State, and Address <a id="overview-of-account-state-and-address"></a>

An account in Klaytn is a data structure containing information about a person's balance or a smart contract. Klaytn's state is the collection of all its accounts' states - that is, the past and current state of all data stored across Klaytn's accounts. When a transaction is executed on a Klaytn node, the state of Klaytn consequently changes across all its nodes. The state should be the same across all nodes in the Klaytn network if they have processed the same blocks in the same order. State information of each account is associated with a 20-byte address, which is used to identify each account.

### Decoupling Key Pairs From Addresses <a id="decoupling-key-pairs-from-addresses"></a>

An account in a typical blockchain platform is associated with a cryptographically processed address of a certain length that usually looks like this: "0x0fe2e20716753082222b52e753854f40afddffd2". This address is strongly coupled with a key pair. If a key pair is chosen, the address is derived from the public key. This has many disadvantages in terms of user experience. Some of them are the following:

* It is impossible for users to have addresses they want.
* It is impossible for users to use multiple key pairs to increase security of their accounts.
* It is impossible for users to change the account's key pair when the private key is accidentally exposed or when users want to update the private key periodically to increase the account's security.

Those are big hurdles that users cannot think of an address as an identifier in the blockchain platform. To clear this hurdle, Klaytn provides a feature that users can choose their addresses and key pairs. With this feature, users can choose addresses that they want and they can use multiple key pairs to increase security. The number of key pairs can be one or more, and the key pairs can have different roles. For details of multiple key pairs or role-based keys, please refer to [Multiple Key Pairs & Role-Based Keys](accounts.md#multiple-key-pairs-and-role-based-keys).

It is worth noting that Klaytn also supports the old scheme that a key pair and an address are strongly coupled.

### Multiple Key Pairs and Role-Based Keys <a id="multiple-key-pairs-and-role-based-keys"></a>

As described before, when the private key is stolen, exposed, or somehow compromised, there is nothing to do to restore the account’s security: the best option is to generate another key pair to create a new account, and migrate the balance from the old compromised account to the new one. Lack of support for advanced key schemes such as multi-sig or usage-specific key is yet another source of major inconvenience. To address those problems more efficiently, Klaytn accounts provide the following capabilities:

* Klaytn account allows the key pair associated with the account to be changed.
* Klaytn account supports multiple key pairs, along with the ability to assign each key with different purpose.
* Klaytn account maintains compatibility with accounts having a single key that is strongly coupled with the address.

By utilizing Klaytn account’s role-based multi-key support, end-users can better handle real-life security risk situations such as private key mismanagement. For example, when a user realizes that his or her private key has been exposed, the user can simply replace the compromised private key by removing the exposed key pair from his or her account and creating a new key pair to replace them. This could be achieved by using a dedicated key used for updating account information, created in advance and stored separately from the compromised private key.

### Human-Readable Address \(HRA\) <a id="human-readable-address-hra"></a>

Although the address scheme \(e.g., "0x0fe2e20716753082222b52e753854f40afddffd2"\) has its own strengths in that it efficiently protects the privacy of account holders, it also proposes major problems in terms of end-user experience. First, it is very difficult for a human brain to memorize, or even recognize, such addresses, making them prone to input mistakes and various human errors that often lead to non-trivial financial damages. Second, such scheme takes away from end-users the power to choose one’s own preferred identity handle that’s easier to memorize or use. Combined, these problems are among the toughest usability hurdles that cause dApp user experience for typical end-users \(who are more accustomed to the simpler, frictionless user experience offered by legacy mobile apps or services\) to be perceived as alien, incomprehensible, and severely inconvenient. To overcome such challenges without undergoing architectural modifications at large-scale and while preserving backward compatibility, Klaytn opts to provide a mapping between a 20-byte address to a 20-byte length text string that end-users could assign their own preferred values to. This feature in Klaytn is called human-readable address \(HRA\). Currently, this feature is under development, and we will provide more information when it is ready.

### Klaytn Wallet Key Format <a id="klaytn-wallet-key-format"></a>

Klaytn wallet key format is provided to easily handle a private key along with the corresponding address. Việc này sẽ giúp người dùng dễ dàng duy trì khóa riêng tư của mình trong một địa chỉ. Định dạng là `0x{private key}0x{type}0x{address in hex}` ở dạng ký hiệu thập lục phân, trong đó `{type}` phải là `00`. Các giá trị khác giữ nguyên. Ví dụ được nêu dưới đây:

```text
0x45a915e4d060149eb4365960e6a7a45f334393093061116b197e3240065ff2d80x000xa94f5374fce5edbc8e2a8697c15331677e6ebf0b
```

Định dạng này hiện được được hỗ trợ trong [Ví Klaytn](../../toolkit/klaytn-wallet.md).

### Các loại tài khoản Klaytn <a id="klaytn-account-types"></a>

Có hai loại tài khoản trong Klaytn: các tài khoản được sở hữu bên ngoài (\EOA\) và các tài khoản hợp đồng thông minh \(SCA\).

#### Tài khoản sở hữu bên ngoài \(EOAs\) <a id="externally-owned-accounts-eoas"></a>

Tài khoản sở hữu bên ngoài chứa các thông tin như số dư và số dùng một lần. Loại tài khoản này không có mã hoặc hệ thống lưu trữ. EOA được kiểm soát bởi khóa riêng tư và không có mã liên kết với chúng. Một EOA có thể được tạo bằng cặp khóa và nhờ đó, được kiểm soát bởi bất kỳ ai có cặp khóa đó. Khóa của tài khoản được mô tả trong phần [Khóa tài khoản](accounts.md#account-key).

**Các thuộc tính**

| Thuộc tính    | Loại                                  | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                            |
|:------------- |:------------------------------------- |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type          | uint8 \(Go\)                        | Một loại tài khoản sở hữu bên ngoài. Giá trị này phải là **0x1** đối với EOA.                                                                                                                                                                                                                                                                                                                                    |
| nonce         | uint64 \(Go\)                       | Một chuỗi số dùng để xác định thứ tự giao dịch. Giao dịch cần xử lý tiếp theo sẽ có cùng số dùng một lần với giá trị này.                                                                                                                                                                                                                                                                                        |
| balance       | \*big.Int \(Go\)                  | Số lượng KLAY mà tài khoản có.                                                                                                                                                                                                                                                                                                                                                                                   |
| humanReadable | bool \(Go\)                         | Một giá trị boolean cho biết tài khoản được liên kết với một địa chỉ mà con người có thể đọc được. Vì [HRA](accounts.md#human-readable-address-hra) vẫn đang trong quá trình phát triển, giá trị này đối với mọi tài khoản là sai.                                                                                                                                                                               |
| key           | [AccountKey](accounts.md#account-key) | Khóa liên kết với tài khoản này. Trường này có thể là một trong các loại [AccountKeyLegacy](accounts.md#accountkeylegacy), [AccountKeyPublic](accounts.md#accountkeypublic), [AccountKeyFail](accounts.md#accountkeyfail), [AccountKeyWeightedMultisig](accounts.md#accountkeyweightedmultisig), [AccountKeyRoleBased](accounts.md#accountkeyrolebased). Chữ ký trong các giao dịch được xác thực bằng khóa này. |

#### Tài khoản hợp đồng thông minh \(SCA\) <a id="smart-contract-accounts-scas"></a>

Ngược với EOA, SCA có mã liên kết với chung và được kiểm soát bởi mã này. SCA được tạo ra bằng các giao dịch triển khai hợp đồng thông minh; khi đã được triển khai, một SCA không thể tự mình khởi tạo giao dịch mới và phải được một tài khoản khác kích hoạt, một tài khoản EOA hoặc SCA.

**Các thuộc tính**

| Thuộc tính    | Loại                                  | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                 |
|:------------- |:------------------------------------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type          | uint8 \(Go\)                        | Loại tài khoản hợp đồng thông minh. Giá trị này phải là **0x2** đối với SCA.                                                                                                                                                                                                                                                                                                                          |
| nonce         | uint64 \(Go\)                       | A sequence number used to determine the order of transactions. The transaction to be processed next has the same nonce with this value.                                                                                                                                                                                                                                                               |
| balance       | \*big.Int \(Go\)                  | The amount of KLAY the account has.                                                                                                                                                                                                                                                                                                                                                                   |
| humanReadable | bool \(Go\)                         | A boolean value indicating that the account is associated with a human-readable address. Since [HRA](accounts.md#human-readable-address-hra) is under development, this value is false for all accounts.                                                                                                                                                                                              |
| key           | [AccountKey](accounts.md#account-key) | The key associated with this account. This field can be any of [AccountKeyLegacy](accounts.md#accountkeylegacy), [AccountKeyPublic](accounts.md#accountkeypublic), [AccountKeyFail](accounts.md#accountkeyfail), [AccountKeyWeightedMultisig](accounts.md#accountkeyweightedmultisig), [AccountKeyRoleBased](accounts.md#accountkeyrolebased). Signatures in transactions are verified with this key. |
| codeHash      | \[\]byte \(Go\)                   | The hash of the account's smart contract code. This value is immutable, which means it is set only when the smart contract is created.                                                                                                                                                                                                                                                                |
| storageRoot   | \[32\]byte \(Go\)                 | A 256-bit hash of the root of the Merkle Patricia Trie that contains the values of all the storage variables in the account.                                                                                                                                                                                                                                                                          |
| codeFormat    | uint8 \(Go\)                        | Supporting interpreter version. Up to 16 can be set. Currently, it supports EVM\(0x00\) only.                                                                                                                                                                                                                                                                                                       |
| vmVersion     | uint8 \(Go\)                        | The protocol upgrade (hard fork) information at contract deployment time (ex. 0x0(constantinople), 0x1(istanbul,london,...)). Up to 16 can be used. It is automatically created with the contract.                                                                                                                                                                                                    |

{% hint style="success" %}
NOTE: From klaytn v1.7.0 onwards, vmVersion attribute will be added to the Smart Contract Account.
{% endhint %}

### Klaytn Account Type ID <a id="klaytn-account-type-id"></a>
Below are the Account Type ID assigned to each Account Type.

| Account Type                   | Account Type ID |
| ------------------------------ | --------------- |
| Externally Owned Account (EOA) | 0x1             |
| Smart Contract Account (SCA)   | 0x2             |

## Account Key <a id="account-key"></a>

An account key represents the key structure associated with an account.

### AccountKeyNil <a id="accountkeynil"></a>

AccountKeyNil represents an empty key. If an account tries to have an AccountKeyNil object, the transaction will be failed. AccountKeyNil is used only for TxTypeAccountUpdate transactions with role-based keys. For example, if an account tries to update RoleAccountUpdate key only, the key field of the TxTypeAccountUpdate transaction would be:

`[AccountKeyNil, NewKey, AccountKeyNil]`

Sau đó, chỉ có khóa RoleAccountUpdate mới được cập nhật. Các vai trò khác không được cập nhật. Tham khảo [AccountKeyBased](accounts.md#accountkeyrolebased) để biết thêm thông tin.

#### Các thuộc tính <a id="attributes"></a>

Không có thuộc tính cho AccountKeyNil.

#### Mã hóa RLP <a id="rlp-encoding"></a>

`0x80`

### AccountKeyLegacy <a id="accountkeylegacy"></a>

AccountKeyLegacy được dùng cho tài khoản có địa chỉ được lấy từ cặp khóa tương ứng. Nếu một tài khoản có AccountKeyLegacy, quá trình xác thực giao dịch được thực hiện như dưới đây \(như một nền tảng chuỗi khối điển hình đã làm\):

* Lấy khóa công khai từ `ecrecover(txhash, txsig)`.
* Lấy địa chỉ của khóa công khai.
* Địa chỉ là người gửi.

#### Các thuộc tính <a id="attributes"></a>

| Thuộc tính | Loại           | Mô tả                                                |
|:---------- |:-------------- |:---------------------------------------------------- |
| Type       | uint8 \(Go\) | Loại AccountKeyLegacy. Giá trị này phải là **0x01**. |

#### Mã hóa RLP <a id="rlp-encoding"></a>

`0x01c0`

### AccountKeyPublic <a id="accountkeypublic"></a>

AccountKeyPublic được dùng cho các tài khoản dùng một khóa công khai.  
Nếu một tài khoản có một đối tượng AccountKeyPublic, quá trình xác thực giao dịch sẽ được thực hiện như bên dưới:

* Lấy khóa công khai từ `ecrecover(txhash, txsig)`.
* Kiểm tra rằng khóa công khai lấy được giống với khóa tương ứng

  khóa công khai của tài khoản.

#### Các thuộc tính <a id="attributes"></a>

| Thuộc tính | Loại                  | Mô tả                                                 |
|:---------- |:--------------------- |:----------------------------------------------------- |
| Type       | uint8 \(Go\)        | Loại AccountKeyPublic. Giá trị này phải là **0x02**.  |
| Key        | \[33\]byte \(Go\) | Khóa phải là khóa công khai được nén trên S256 curve. |

#### Mã hóa RLP <a id="rlp-encoding"></a>

`0x02 + encode(CompressedPubKey)`

**LƯU Ý**: CompressedPubKey là khóa công khai ở định dạng nén được định nghĩa trong [SEC1](https://www.secg.org/SEC1-Ver-1.0.pdf). Nói ngắn gọn, dùng 0x02{PubkeyX} nếu PubkeyY là số chẵn, hoặc dùng 0x03{PubkeyX} trong trường hợp còn lại.

#### Mã hóa RLP \(Ví dụ\) <a id="rlp-encoding-example"></a>

```javascript
prvkey 0xf8cc7c3813ad23817466b1802ee805ee417001fcce9376ab8728c92dd8ea0a6b
pubkeyX 0xdbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8
pubkeyY 0x906d7170ba349c86879fb8006134cbf57bda9db9214a90b607b6b4ab57fc026e

RLP: 0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8
```

### AccountKeyFail <a id="accountkeyfail"></a>

Nếu một tài khoản có khóa AccountKeyFail, quá trình xác thực giao dịch sẽ luôn thất bại. Nó có thể được sử dụng cho các tài khoản hợp đồng thông minh để một giao dịch được gửi từ một tài khoản hợp đồng thông minh luôn thất bại.

#### Các thuộc tính <a id="attributes"></a>

| Attribute | Type           | Description                                       |
|:--------- |:-------------- |:------------------------------------------------- |
| Type      | uint8 \(Go\) | The type of AcccountKeyFail. It must be **0x03**. |

#### RLP Encoding <a id="rlp-encoding"></a>

`0x03c0`

### AccountKeyWeightedMultiSig <a id="accountkeyweightedmultisig"></a>

AccountKeyWeightedMultiSig is an account key type containing a threshold and WeightedPublicKeys which contains a list consisting of a public key and its weight. In order for a transaction to be valid for an account associated with AccountKeyWeightedMultiSig, the following conditions should be satisfied:
* The weighted sum of the signed public keys should be larger than the threshold.
* The invalid signature should not be included in the transaction.
* The number of signed public keys should be less than the number of weightedPublicKeys.

{% hint style="success" %}
NOTE: The following multiSig validation logic has changed with the `IstanbulEVM` protocol upgrade, or the "hard fork".
* The invalid signature should not be included in the transaction.
* The number of signed public keys should be less than the number of weightedPublicKeys. If you want the previous document, please refer to [previous document](transaction-fees/transaction-fees-previous.md).

`IstanbulEVM` protocol upgrade block number is as follows.
* Baobab Testnet: `#75373312`
* Cypress Mainnet: `#86816005`
{% endhint %}

#### Attributes <a id="attributes"></a>

| Attribute          | Type                                | Description                                                                                                                    |
|:------------------ |:----------------------------------- |:------------------------------------------------------------------------------------------------------------------------------ |
| Type               | uint8 \(Go\)                      | The type of AccountKeyWeightedMultiSig. This must be **0x04**.                                                                 |
| Threshold          | uint \(Go\)                       | Validation threshold. To be a valid transaction, the weight sum of signatures should be larger than or equal to the threshold. |
| WeightedPublicKeys | \[\]{uint, \[33\]byte} \(Go\) | A list of weighted public keys. A weighted public key contains a compressed public key and its weight.                         |

#### RLP Encoding <a id="rlp-encoding"></a>

`0x04 + encode([threshold, [[weight, CompressedPubKey1], [weight2, CompressedPubKey2]]])`

#### RLP Encoding \(Example\) <a id="rlp-encoding-example"></a>

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

### AccountKeyRoleBased <a id="accountkeyrolebased"></a>

AccountKeyRoleBased represents a role-based key. The roles are specified at [Roles](accounts.md#roles).

#### Attributes <a id="attributes"></a>

| Attribute | Type                        | Mô tả                                                                                                                                                            |
|:--------- |:--------------------------- |:---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Type      | uint8 \(Go\)              | Loại AccountKeyRoleBased. Giá trị này phải là **0x05**.                                                                                                          |
| Keys      | \[\]{AccountKey} \(Go\) | Một danh sách các khóa. Khóa có thể là bất kỳ khóa nào trong số AccountKeyNil, AccountKeyLegacy, AccountKeyPublic, AccountKeyFail và AccountKeyWeightedMultiSig. |

#### Các vai trò <a id="roles"></a>

Các vai trò của AccountKeyRoleBased được định nghĩa bên dưới:

| Vai trò           | Mô tả                                                                                                                                                                                                                   |
|:----------------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RoleTransaction   | Index 0. Khóa mặc định. Các giao dịch khác với TxTypeAccountUpdate nên được ký bởi khóa của vai trò này.                                                                                                                |
| RoleAccountUpdate | Index 1. Giao dịch TxTypeAccountUpdate phải được ký bởi khóa này. Nếu khóa này không hiển thị trong tài khoản, giao dịch TxTypeAccountUpdate là không hợp lệ khi dùng khóa RoleTransaction.                             |
| RoleFeePayer      | Index 2. Nếu tài khoản này muốn gửi phí tx thay cho người gửi, giao dịch phải được ký bởi khóa này.  Nếu khóa này không hiển thị trong tài khoản, một giao dịch ủy thác phí sẽ được xác thực bằng khóa RoleTransaction. |

#### Mã hóa RLP <a id="rlp-encoding"></a>

`0x05 + encode([key1, key2, key3])`

Lưu ý rằng key1, key2 và key3 có thể là bất kỳ khóa nào trong số các khóa trên \(AccountKeyNil, AccountKeyLegacy, AccountKeyPublic, AccountKeyFail và AccountKeyWeightedMultiSig\).

#### Các vài trò có thể bỏ qua và có thể mở rộng <a id="omissible-and-expandable-roles"></a>

Các vai trò có thể được bỏ ra khỏi chỉ mục gần nhất, và các vai trò đã bỏ qua được ánh xạ tới vai trò đầu tiên. Tuy nhiên, vai trò ở giữa thì không thể bỏ qua được, có nghĩa là RoleTransaction và RoleFeePayer không thể được đặt mà không có RoleAccountUpdate. Ví dụ, nếu một khóa dựa trên vai trò được đặt là `0x05 + encode([key1, key2])`, RoleFeePayer sẽ hoạt được như thể khóa đó được đặt là `0x05 + encode([key1, key2, key1])`.

Tính năng này cho phép bạn thêm nhiều vai trò hơn trong tương lai. Nếu một vai trò mới được cung cấp, vai trò mới của các tài khoản đã được tạo cùng các vai trò cũ sẽ được ánh xạ tới vai trò đầu tiên.

#### Mã hóa RLP \(Ví dụ\) <a id="rlp-encoding-example"></a>

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

## Mã loại khóa tài khoản <a id="account-key-type-id"></a>
Dưới đây là Mã loại khóa tài khoản được chỉ định cho từng Loại khóa tài khoản.

| Loại khóa tài khoản        | Mã loại khóa tài khoản |
| -------------------------- | ---------------------- |
| AccountKeyLegacy           | 0x01                   |
| AccountKeyPublic           | 0x02                   |
| AccountKeyFail             | 0x03                   |
| AccountKeyWeightedMultiSig | 0x04                   |
| AccountKeyRoleBased        | 0x05                   |

