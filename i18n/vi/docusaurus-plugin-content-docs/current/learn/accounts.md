# Tài khoản

## Tài khoản Klaytn <a id="klaytn-accounts"></a>

### Tổng quan về tài khoản, trạng thái và địa chỉ <a id="overview-of-account-state-and-address"></a>

Tài khoản trong Klaytn là một cấu trúc dữ liệu chứa thông tin về số dư của một người hoặc một hợp đồng thông minh. Trạng thái của Klaytn là tập hợp của tất cả các trạng thái của tài khoản trong đó - nghĩa là trạng thái trong quá khứ và hiện tại của tất cả các dữ liệu được lưu trữ trong tất cả các tài khoản của Klaytn. Khi một giao dịch được thực thi trên một nút Klaytn, thì kết quả là trạng thái của Klaytn sẽ thay đổi trên khắp tất cả các nút. Trạng thái của các nút trong mạng lưới Klaytn phải giống nhau nếu chúng đã xử lý các khối giống nhau có cùng thứ tự. Thông tin trạng thái của mỗi tài khoản được liên kết với địa chỉ 20 byte, địa chỉ này được dùng để định danh từng tài khoản.

### Tách các cặp khóa khỏi địa chỉ <a id="decoupling-key-pairs-from-addresses"></a>

Một tài khoản là một nền tảng chuỗi khối điển hình liên kết với một địa chỉ đã xử lý mã hóa với độ dài nhất định, thường có dạng: "0x0fe2e20716753082222b52e753854f40afddffd2". Địa chỉ này được gắn chặt với một cặp khóa. Nếu đã chọn một cặp khóa, địa chỉ sẽ được lấy từ mã khóa công khai. Về mặt trải nghiệm người dùng, việc này có nhiều bất lợi. Dưới đây là một số bất lợi đó:

- Người dùng không thể có địa chỉ mong muốn.
- Người dùng không thể dùng nhiều cặp khóa khác nhau để tăng cường bảo mật cho tài khoản của họ.
- Người dùng không thể thay đổi cặp khóa của tài khoản khi mã khóa riêng tư vô tình bị lộ, hoặc khi người dùng muốn cập nhật mã khóa riêng tư định kỳ để tăng cường bảo mật cho tài khoản.

Đây là những rào cản lớn khiến người dùng không thể coi địa chỉ là mã định danh trong nền tảng chuỗi khối. Để gỡ bỏ rào cản này, Klaytn hỗ trợ một tính năng cho phép người dùng chọn địa chỉ và cặp khóa của họ. Với tính năng này, người dùng có thể chọn địa chỉ mong muốn và họ có thể dùng nhiều cặp khóa khác nhau để tăng cường bảo mật. Số lượng cặp khóa có thể là một hoặc nhiều hơn và các cặp khóa có thể giữ các vai trò khác nhau. Để biết thêm thông tin chi tiết về nhiều cặp khóa hoặc các mã khóa theo vai trò, vui lòng tham khảo phần [Nhiều cặp khóa & khóa theo vai trò](#multiple-key-pairs-and-role-based-keys).

Bạn cũng nên lưu ý rằng Klaytn còn hỗ trợ phiên bản cũ, trong đó một cặp khóa và một địa chỉ được liên kết chặt chẽ với nhau.

### Nhiều cặp khóa và khóa theo vai trò <a id="multiple-key-pairs-and-role-based-keys"></a>

Như đã mô tả ở trên, khi một mã khóa riêng tư bị đánh cắp, bị lộ hoặc bị xâm phạm theo cách nào đó, bạn không thể làm gì để khôi phục tính bảo mật của tài khoản: tùy chọn tốt nhất là tạo một cặp khóa khác để tạo một tài khoản mới, rồi chuyển số dư từ tài khoản cũ bị xâm nhập sang tài khoản mới đó. Việc thiếu sự hỗ trợ cho các phương án dùng khóa nâng cao, ví dụ như đa chữ ký hoặc khóa dành riêng cho từng trường hợp sử dụng lại là một sự bất tiện đáng kể khác. Để giải quyết các vấn đề đó theo cách hiệu quả hơn, tài khoản Klaytn mang đến những khả năng sau:

- Tài khoản Klaytn cho phép thay đổi cặp khóa được liên kết với tài khoản.
- Tài khoản Klaytn hỗ trợ nhiều cặp khóa, cùng với khả năng chỉ định từng khóa cho các mục đích khác nhau.
- Tài khoản Klaytn duy trì khả năng tương thích với các tài khoản chỉ có một khóa được liên kết chặt chẽ với địa chỉ.

Bằng cách tận dụng khả năng hỗ trợ nhiều khóa theo vai trò của tài khoản Klaytn, người dùng cuối có thể xử lý tốt hơn các tình huống rủi ro về bảo mật trong thực tế, ví dụ như quản lý sai cách mã khóa riêng. Ví dụ, khi một người dùng nhận thấy mã khóa riêng tư của mình đã bị lộ, người dùng này chỉ cần thay thế mã khóa riêng tư bị lộ bằng cách xóa cặp khóa bị lộ khỏi tài khoản của mình và tạo một cặp khóa mới thay thế. Để thực hiện được điều này, chúng ta có thể dùng khóa dành riêng được dùng để cập nhật thông tin tài khoản, được tạo trước và lưu trữ riêng biệt với khóa riêng tư bị xâm phạm.

### Địa chỉ mà con người đọc được (HRA) <a id="human-readable-address-hra"></a>

Mặc dù mô hình địa chỉ (ví dụ: "0x0fe2e20716753082222b52e753854f40afddffd2") có điểm mạnh riêng ở chỗ mô hình này bảo vệ hiệu quả quyền riêng tư của chủ tài khoản nhưng cũng gây ra vấn đề lớn về trải nghiệm của người dùng cuối. Trước tiên, não bộ con người rất khó ghi nhớ hoặc thậm chí là nhận ra những địa chỉ như vậy, do đó, lỗi nhập địa chỉ cũng như nhiều lỗi chủ quan khác nhau rất dễ xảy ra, dẫn đến thiệt hại tài chính không nhỏ. Thứ hai, mô hình địa chỉ như vậy sẽ tước mất quyền lựa chọn cách xử lý danh tính theo cách riêng của người dùng cuối để họ có thể dễ ghi nhớ hoặc sử dụng. Kết hợp lại, những vấn đề này là một trong những rào cản khiến người dùng cuối thông thường (những người đã quen với trải nghiệm người dùng đơn giản và mượt mà hơn do các ứng dụng hoặc dịch vụ di động cũ mang đến) coi trải nghiệm người dùng dApp là xa lạ, khó hiểu và vô cùng bất tiện. Để vượt qua các thách thức như vậy mà không cần thay đổi kiến trúc ở quy mô lớn, đồng thời vẫn duy trì khả năng tương thích ngược, Klaytn đã chọn cung cấp tính năng ánh xạ giữa địa chỉ 20 byte với chuỗi văn bản có độ dài 20 byte, nhờ đó, người dùng cuối có thể chỉ định các giá trị mà họ mong muốn. Tính năng này trong Klaytn được gọi là địa chỉ mà con người đọc được (HRA). Hiện tại, tính năng này vẫn đang trong giai đoạn phát triển và chúng tôi sẽ cung cấp thêm thông tin khi tính năng này sẵn sàng cho việc sử dụng.

### Định dạng khóa của ví Klaytn <a id="klaytn-wallet-key-format"></a>

Định dạng khóa của ví Klaytn được cung cấp giúp dễ dàng xử lý mã khóa riêng tư kèm theo địa chỉ tương ứng. Điều này sẽ giúp người dùng dễ dàng hơn trong việc duy trì mã khóa riêng tư của mình cùng địa chỉ. Định dạng là `0x{private key}0x{type}0x{address in hex}` ở dạng ký hiệu thập lục phân, trong đó `{type}` phải là `00`. Các giá trị khác giữ nguyên. Dưới đây là ví dụ:

```text
0x45a915e4d060149eb4365960e6a7a45f334393093061116b197e3240065ff2d80x000xa94f5374fce5edbc8e2a8697c15331677e6ebf0b
```

Định dạng này hiện được hỗ trợ trong [Ví Klaytn](../build/tools/wallets/klaytn-wallet.md).

### Các loại tài khoản Klaytn <a id="klaytn-account-types"></a>

There are two types of accounts in Klaytn: <LinkWithTooltip to="../glossary#externally-owned-account-eoa" tooltip="User-controlled blockchain accounts for transactions,<br /> secured by a private key.">externally owned accounts</LinkWithTooltip> (EOAs), and <LinkWithTooltip to="../glossary#smart-contract-account-sca" tooltip="Blockchain account with programmable logic <br />for automated transactions.">smart contract accounts</LinkWithTooltip> (SCAs).

#### Tài khoản sở hữu bên ngoài (EOAs) <a id="externally-owned-accounts-eoas"></a>

Tài khoản sở hữu bên ngoài chứa các thông tin như số dư và số dùng một lần. Loại tài khoản này không có mã hoặc hệ thống lưu trữ. EOA được kiểm soát bằng khóa riêng tư và không có mã liên kết với chúng. EOA có thể được tạo bằng cặp khóa và nhờ đó, được kiểm soát bởi bất kỳ ai có cặp khóa đó. Khóa tài khoản được mô tả trong phần [Khóa tài khoản](#account-key).

**Thuộc tính**

| Thuộc tính      | type                              | Mô tả                                                                                                                                                                                                                                                                                                                                                           |
| :-------------- | :-------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type            | uint8 (Go)     | Loại tài khoản sở hữu bên ngoài. Giá trị này phải là **0x1** đối với EOA.                                                                                                                                                                                                                                                                                       |
| số dùng một lần | uint64 (Go)    | Một chuỗi số dùng để xác định thứ tự giao dịch. Giao dịch cần xử lý tiếp theo sẽ có cùng số dùng một lần với giá trị này.                                                                                                                                                                                                                                       |
| số dư           | \*big.Int (Go) | Số lượng KLAY có trong tài khoản.                                                                                                                                                                                                                                                                                                                               |
| humanReadable   | bool (Go)      | Giá trị boolean cho biết tài khoản được liên kết với một địa chỉ mà con người đọc được. Vì [HRA](#human-readable-address-hra) vẫn đang trong quá trình phát triển nên giá trị này đối với mọi tài khoản sẽ là false.                                                                                                                                            |
| khóa            | [AccountKey](#account-key)        | Khóa liên kết với tài khoản này. Trường này có thể là bất kỳ khóa nào trong số [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultisig](#accountkeyweightedmultisig), [AccountKeyRoleBased](#accountkeyrolebased). Chữ ký trong các giao dịch được xác thực bằng khóa này. |

#### Tài khoản hợp đồng thông minh (SCA) <a id="smart-contract-accounts-scas"></a>

Trái ngược với EOA, SCA có mã liên kết với chung và được kiểm soát bằng mã này. SCA được tạo ra bằng các giao dịch triển khai hợp đồng thông minh; khi đã được triển khai, SCA không thể tự mình khởi tạo giao dịch mới và phải được một tài khoản khác kích hoạt, tài khoản EOA hoặc SCA.

**Thuộc tính**

| Thuộc tính      | type                                                                                 | Mô tả                                                                                                                                                                                                                                                                                                                                                           |
| :-------------- | :----------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type            | uint8 (Go)                                                        | Loại tài khoản hợp đồng thông minh. Giá trị này phải là **0x2** đối với SCA.                                                                                                                                                                                                                                                                                    |
| số dùng một lần | uint64 (Go)                                                       | Một chuỗi số dùng để xác định thứ tự giao dịch. Giao dịch cần xử lý tiếp theo sẽ có cùng số dùng một lần với giá trị này.                                                                                                                                                                                                                                       |
| số dư           | \*big.Int (Go)                                                    | Số lượng KLAY có trong tài khoản.                                                                                                                                                                                                                                                                                                                               |
| humanReadable   | bool (Go)                                                         | Giá trị boolean cho biết tài khoản được liên kết với một địa chỉ mà con người đọc được. Vì [HRA](#human-readable-address-hra) vẫn đang trong quá trình phát triển nên giá trị này đối với mọi tài khoản sẽ là false.                                                                                                                                            |
| khóa            | [AccountKey](#account-key)                                                           | Khóa liên kết với tài khoản này. Trường này có thể là bất kỳ khóa nào trong số [AccountKeyLegacy](#accountkeylegacy), [AccountKeyPublic](#accountkeypublic), [AccountKeyFail](#accountkeyfail), [AccountKeyWeightedMultisig](#accountkeyweightedmultisig), [AccountKeyRoleBased](#accountkeyrolebased). Chữ ký trong các giao dịch được xác thực bằng khóa này. |
| codeHash        | []byte (Go)   | Hàm băm của mã hợp đồng thông minh của tài khoản. Giá trị này là bất biến, nghĩa là nó chỉ được đặt khi hợp đồng thông minh được tạo.                                                                                                                                                                                                                           |
| storageRoot     | [32]byte (Go) | Hàm băm 256 bit của gốc của Merkle Patricia Trie có chứa các giá trị của tất cả các biến về lưu trữ trong tài khoản.                                                                                                                                                                                                                                            |
| codeFormat      | uint8 (Go)                                                        | Hỗ trợ phiên bản trình thông dịch. Có thể đặt tối đa 16. Hiện tại chỉ hỗ trợ EVM(0x00).                                                                                                                                                                                                                                                      |
| vmVersion       | uint8 (Go)                                                        | Thông tin nâng cấp giao thức (nâng cấp căn bản) vào thời điểm triển khai hợp đồng (ví dụ: 0x0(constantinople), 0x1(istanbul,london,...)). Có thể sử dụng tối đa 16. Có thể được tạo tự động cùng với hợp đồng.                                                                      |

:::note

LƯU Ý: Kể từ klaytn v1.7.0 trở đi, thuộc tính vmVersion sẽ được thêm vào tài khoản hợp đồng thông minh.

:::

### Mã loại tài khoản Klaytn <a id="klaytn-account-type-id"></a>

Dưới đây là mã loại tài khoản được chỉ định cho từng loại tài khoản.

| Loại tài khoản                                         | Mã loại tài khoản |
| ------------------------------------------------------ | ----------------- |
| Tài khoản sở hữu bên ngoài (EOA)    | 0x1               |
| Tài khoản hợp đồng thông minh (SCA) | 0x2               |

## Khóa tài khoản <a id="account-key"></a>

Khóa tài khoản tương ứng với cấu trúc khóa liên kết với một tài khoản.

### AccountKeyNil <a id="accountkeynil"></a>

AccountKeyNil tương ứng với một khóa trống. Nếu một tài khoản cố sử dụng đối tượng AccountKeyNil, thì giao dịch sẽ không thành công. AccountKeyNil chỉ được dùng cho các giao dịch TxTypeAccountUpdate với các khóa theo vai trò. Ví dụ, nếu một tài khoản chỉ muốn cập nhật khóa RoleAccountUpdate, thì trường khóa của giao dịch TxTypeAccountUpdate sẽ là:

`[AccountKeyNil, NewKey, AccountKeyNil]`

Sau đó, chỉ có khóa RoleAccountUpdate mới được cập nhật. Các vai trò khác không được cập nhật. Tham khảo [AccountKeyRoleBased](#accountkeyrolebased) để biết thêm thông tin.

#### Thuộc tính <a id="attributes"></a>

Không có thuộc tính cho AccountKeyNil.

#### Mã hóa RLP <a id="rlp-encoding"></a>

`0x80`

### AccountKeyLegacy <a id="accountkeylegacy"></a>

AccountKeyLegacy được dùng cho tài khoản có địa chỉ được lấy từ cặp khóa tương ứng. Nếu một tài khoản có AccountKeyLegacy, quy trình xác thực giao dịch sẽ được thực hiện như dưới đây (như một nền tảng chuỗi khối điển hình đã thực hiện):

- Lấy mã khóa công khai từ `ecrecover(txhash, txsig)`.
- Lấy địa chỉ của mã khóa công khai.
- Địa chỉ là người gửi.

#### Thuộc tính <a id="attributes"></a>

| Thuộc tính | type                          | Mô tả                                                |
| :--------- | :---------------------------- | :--------------------------------------------------- |
| Type       | uint8 (Go) | Loại AccountKeyLegacy. Giá trị này phải là **0x01**. |

#### Mã hóa RLP <a id="rlp-encoding"></a>

`0x01c0`

### AccountKeyPublic <a id="accountkeypublic"></a>

AccountKeyPublic được dùng cho các tài khoản dùng một khóa công khai.\
Nếu tài khoản có một đối tượng AccountKeyPublic, thì quy trình xác thực giao dịch sẽ được thực hiện như bên dưới:

- Lấy mã khóa công khai từ `ecrecover(txhash, txsig)`.
- Kiểm tra đảm bảo mã khóa công khai lấy được giống với khóa tương ứng

  mã khóa công khai của tài khoản.

#### Thuộc tính <a id="attributes"></a>

| Thuộc tính | type                                                                                 | Mô tả                                                 |
| :--------- | :----------------------------------------------------------------------------------- | :---------------------------------------------------- |
| type       | uint8 (Go)                                                        | Loại AccountKeyPublic. Giá trị này phải là **0x02**.  |
| Khóa       | [33]byte (Go) | Khóa phải là khóa công khai được nén trên S256 curve. |

#### Mã hóa RLP <a id="rlp-encoding"></a>

`0x02 + encode(CompressedPubKey)`

**LƯU Ý**: CompressedPubKey là mã khóa công khai ở định dạng nén được định nghĩa trong [SEC1](https://www.secg.org/SEC1-Ver-1.0.pdf). Tóm lại, dùng 0x02`{PubkeyX}` nếu PubkeyY là số chẵn, hoặc dùng 0x03`{PubkeyX}` trong trường hợp còn lại.

#### Mã hóa RLP (Ví dụ) <a id="rlp-encoding-example"></a>

```javascript
prvkey 0xf8cc7c3813ad23817466b1802ee805ee417001fcce9376ab8728c92dd8ea0a6b
pubkeyX 0xdbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8
pubkeyY 0x906d7170ba349c86879fb8006134cbf57bda9db9214a90b607b6b4ab57fc026e

RLP: 0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8
```

### AccountKeyFail <a id="accountkeyfail"></a>

Nếu tài khoản có khóa AccountKeyFail, thì quy trình xác thực giao dịch sẽ luôn thất bại. Khóa này có thể được sử dụng cho các tài khoản hợp đồng thông minh để một giao dịch được gửi từ một tài khoản hợp đồng thông minh luôn thất bại.

#### Thuộc tính <a id="attributes"></a>

| Thuộc tính | type                          | Mô tả                                              |
| :--------- | :---------------------------- | :------------------------------------------------- |
| Loại      | uint8 (Go) | Loại AccountKeyFail. Giá trị này phải là **0x03**. |

#### Mã hóa RLP <a id="rlp-encoding"></a>

`0x03c0`

### AccountKeyWeightedMultiSig <a id="accountkeyweightedmultisig"></a>

AccountKeyWeightedMultiSig là loại khóa tài khoản có chứa ngưỡng và WeightedPublicKeys có chứa một danh sách gồm một mã khóa công khai và trọng số của nó.
Để một giao dịch được coi là hợp lệ cho một tài khoản liên kết với AccountKeyWeightedMultiSig, thì cần phải thỏa mã các điều kiện sau:

- Tổng trọng số của các mã khóa công khai đã ký phải lớn hơn ngưỡng.
- Giao dịch không được có chữ ký không hợp lệ.
- Số lượng mã khóa công khai đã ký phải ít hơn số lượng weightedPublicKey.

:::note

LƯU Ý: Logic xác thực multiGig sau đây đã thay đổi với quá trình nâng cấp giao thức `IstanbulEVM`, hay còn gọi là "nâng cấp căn bản".

- Giao dịch không được có chữ ký không hợp lệ.
- Số lượng mã khóa công khai đã ký phải ít hơn số lượng weightedPublicKey.

:::

#### Thuộc tính <a id="attributes"></a>

| Thuộc tính         | Loại                                                                                                                                              | Mô tả                                                                                                                           |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| Loại              | uint8 (Go)                                                                                                                      | Loại AccountKeyWeightedMultiSig. Giá trị này phải là **0x04**.                                                                  |
| Ngưỡng             | uint (Go)                                                                                                                       | Ngưỡng xác thực. Để được coi là giao dịch hợp lệ thì tổng trọng số của các chữ ký phải lớn hơn hoặc bằng ngưỡng này.            |
| WeightedPublicKeys | []\{uint, [33]byte} (Go) | Một danh sách khóa công khai có trọng số. Một khóa công khai có trọng số có chứa khóa công khai đã được nén và trọng số của nó. |

#### Mã hóa RLP <a id="rlp-encoding"></a>

`0x04 + encode([threshold, [[weight, CompressedPubKey1], [weight2, CompressedPubKey2]]])`

#### Mã hóa RLP (Ví dụ) <a id="rlp-encoding-example"></a>

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

AccountKeyRoleBased tương ứng với một khóa theo vai trò. Các vai trò được nêu rõ trong phần [Các vai trò](#roles).

#### Thuộc tính <a id="attributes"></a>

| Thuộc tính | Loại                                                                                      | Mô tả                                                                                                                                                            |
| :--------- | :----------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Loại      | uint8 (Go)                                                              | Loại AccountKeyRoleBased. Giá trị này phải là **0x05**.                                                                                                          |
| Khóa       | []`{AccountKey}` (Go) | Một danh sách các khóa. Khóa có thể là bất kỳ khóa nào trong số AccountKeyNil, AccountKeyLegacy, AccountKeyPublic, AccountKeyFail và AccountKeyWeightedMultiSig. |

#### Vai trò <a id="roles"></a>

Các vai trò của AccountKeyRoleBased được định nghĩa bên dưới:

| Vai trò           | Mô tả                                                                                                                                                                                                                            |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RoleTransaction   | Chỉ mục 0. Khóa mặc định. Các giao dịch khác với TxTypeAccountUpdate cần được ký bởi khóa của vai trò này.                                                                                                                       |
| RoleAccountUpdate | Chỉ mục 1. Giao dịch TxTypeAccountUpdate phải được ký bởi khóa này. Nếu khóa này không hiển thị trong tài khoản, giao dịch TxTypeAccountUpdate là không hợp lệ khi dùng khóa RoleTransaction.                                    |
| RoleFeePayer      | Chỉ mục 2. Nếu tài khoản này muốn gửi phí tx thay cho người gửi, thì giao dịch phải được ký bởi khóa này.  Nếu khóa này không hiển thị trong tài khoản, một giao dịch có phí ủy thác sẽ được xác thực bằng khóa RoleTransaction. |

#### Mã hóa RLP <a id="rlp-encoding"></a>

`0x05 + encode([key1, key2, key3])`

Lưu ý rằng key1, key2 và key3 có thể là bất kỳ khóa nào trong số các khóa trên (AccountKeyNil, AccountKeyLegacy, AccountKeyPublic, AccountKeyFail và AccountKeyWeightedMultiSig).

#### Các vài trò có thể bỏ qua và có thể mở rộng <a id="omissible-and-expandable-roles"></a>

Các vai trò có thể được bỏ ra khỏi chỉ mục gần nhất và các vai trò đã bỏ qua được ánh xạ đến vai trò đầu tiên. Tuy nhiên, vai trò ở giữa thì không thể bỏ qua được, có nghĩa là không thể đặt RoleTransaction và RoleFeePayer khi không có RoleAccountUpdate. Ví dụ, nếu một khóa dựa trên vai trò được đặt là `0x05 + encode([key1, key2])`, thì RoleFeePayer sẽ có vai trò như thể khóa đó được đặt là `0x05 + encode([key1, key2, key1])`.

Tính năng này cho phép bạn thêm nhiều vai trò hơn trong tương lai. Nếu một vai trò mới được cung cấp, vai trò mới của các tài khoản đã được tạo cùng các vai trò cũ sẽ được ánh xạ đến vai trò đầu tiên.

#### Mã hóa RLP (Ví dụ) <a id="rlp-encoding-example"></a>

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
