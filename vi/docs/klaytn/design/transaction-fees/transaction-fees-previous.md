# Phí giao dịch <a id="transaction-fees"></a>

Phí giao dịch đối với máy ảo Klaytn hiện tại \(KLVM\) được tính toán như sau:

```text
Phí giao dịch := (tổng lượng gas sử dụng) x (đơn giá)
```

* `tổng lượng gas sử dụng` được tính toán bởi KLVM, dựa trên chi phí gas của opcode và chi phí gas nội tại.
* `đơn giá` là giá gas do Klaytin xác định.

Phí giao dịch được tính toán này được trừ từ số dư tài khoản của doanh nghiệp hoặc người gửi, tùy vào giao dịch.

## Tổng quan về gas và đơn giá <a id="gas-and-unit-price-overview"></a>

### Gas <a id="gas"></a>

Mọi hành động làm thay đổi trạng thái của chuỗi khối đều cần tới gas. Khi một nút xử lý giao dịch của người dùng, ví dụ như gửi KLAY, dùng token ERC-20, hoặc thực thi một hợp đồng, người dùng phải trả phí cho việc tính toán và sử dụng dung lượng lưu trữ. Số tiền thanh toán được xác định bởi số `gas` cần dùng.

`Gas` là đơn vị đo thể hiện số lượng phép tính cần thiết để xử lý giao dịch của người dùng.

### Đơn giá <a id="unit-price"></a>

`Đơn giá` là giá của một đơn vị gas. Đơn giá \(còn được gọi là `giá gas`\) được nhóm quản trị đặt ra trong hệ thống. Hiện tại, giá gas đang được đặt ở mức 250 ston \(_nghĩa là_ 250 x 10^9 peb\) mỗi đơn vị gas và người dùng không thể thay đổi giá trị này. Bạn có thể lấy giá trị hiện tại của đơn giá bằng cách gọi API `klay.gasPrice`.

Trong Ethereum, người dùng đặt giá gas cho mỗi giao dịch, và thợ đào chọn các giao dịch để đưa vào khối của họ nhằm tối đa hóa phần thưởng của mình. Việc này cũng giống như mang các nguồn lực hạn chế ra để đấu giá. Hướng tiếp cận này đã có hiệu quả vì nó dựa trên thị trường. Tuy nhiên, chi phí giao dịch có thể biến động và thường sẽ trở nên quá cao để đảm bảo cho việc thực thi.

Để giải quyết vấn đề này, Klaytn sử dụng đơn giá cố định và giá có thể được điều chỉnh bởi hội đồng quản trị. Chính sách này đảm bảo rằng mọi giao dịch đều sẽ được xử lý công bằng và chắc chắn sẽ được thực thi. Vì thế, người dùng không cần phải vất vả xác định đơn giá phù hợp.

#### Xác thực giao dịch so với Đơn giá <a id="transaction-validation-against-unit-price"></a>

Klaytn chỉ chấp nhận các giao dịch bằng giá gas, giá này có thể do người dùng đặt, ở mức bằng với đơn giá của Klaytn; Klaytn từ chối các giao dịch với giá gas khác với đơn giá của Klaytn.

#### Lỗi đơn giá <a id="unit-price-error"></a>

Thông báo lỗi `invalid unit price` được trả về khi giá gas của một giao dịch không bằng với đơn giá của Klaytn.

### Thay thế giao dịch <a id="transaction-replacement"></a>

Klaytn hiện không cung cấp phương pháp để thay thế giao dịch bằng đơn giá, nhưng có thể hỗ trợ các phương pháp khác để thay thế giao dịch trong tương lai. Hãy lưu ý rằng trong Ethereum, một giao dịch với một số dùng một lần nhất định có thể được thay thế bằng một giao dịch mới với giá gas cao hơn.

## Bảng giá gas của Klaytn  <a id="klaytns-gas-table"></a>

Về cơ bản, Klaytn luôn duy trì tương thích với Ethereum. Vì thế, bảng giá gas của Klaytn cũng khá tương đồng với bảng của Ethereum. Tuy nhiên, do sự tồn tại của những tính năng độc đáo của Klaytn, có một số hằng số mới cho những tính năng đó.

{% hint style="success" %}
LƯU Ý: Tài liệu này chứa bảng giá gas được sử dụng trước khi kích hoạt nâng cấp giao thức. Nếu bạn muốn nhận tài liệu mới nhất, vui lòng tham khảo [tài liệu mới nhất](transaction-fees.md).
{% endhint %}

### Phí phổ biến <a id="common-fee"></a>

| Mục               | Gas   | Mô tả                                                                                                                         |
|:----------------- |:----- |:----------------------------------------------------------------------------------------------------------------------------- |
| G\_zero         | 0     | Không cần thanh toán cho các hoạt động của bộ Wzero                                                                           |
| G\_base         | 2     | Lượng gas phải trả cho các hoạt động của bộ Wbase                                                                             |
| G\_verylow      | 3     | Lượng gas phải trả cho các hoạt động của bộ Wverylow                                                                          |
| G\_low          | 5     | Lượng gas phải trả cho các hoạt động của bộ Wlow                                                                              |
| G\_mid          | 8     | Lượng gas phải trả cho các hoạt động của bộ Wmid                                                                              |
| G\_high         | 10    | Lượng gas phải trả cho các hoạt động của bộ Whigh                                                                             |
| G\_blockhash    | 20    | Khoản thanh toán cho hoạt động BLOCKHASH                                                                                      |
| G\_extcode      | 700   | Lượng gas phải trả cho các hoạt động của bộ Wextcode                                                                          |
| G\_balance      | 400   | Lượng gas phải trả cho một hoạt động BALANCE                                                                                  |
| G\_sload        | 200   | Được trả cho một hoạt động SLOAD                                                                                              |
| G\_jumpdest     | 1     | Được trả cho một hoạt động JUMPDEST                                                                                           |
| G\_sset         | 20000 | Được trả cho một hoạt động SSTORE khi giá trị lưu trữ được đặt từ số không sang số khác không                                 |
| G\_sreset       | 5000  | Được trả cho một hoạt động SSTORE khi giá trị bằng không của giá trị không đổi, hoặc được đặt thành số không                  |
| G\_sclear       | 15000 | Khoản hoàn tiền đã thực hiện \(được thêm vào quầy hoàn thiền\) khi giá trị lưu trữ được đặt từ số khác không thành số không |
| R\_selfdestruct | 24000 | Khoản hoàn tiền đã thực hiện \(được thêm vào quầy hoàn tiền\) cho hành động tự hủy một tài khoản                            |
| G\_selfdestruct | 5000  | Lượng gas phải trả cho một hoạt động SELFDESTRUCT                                                                             |
| G\_create       | 32000 | Được trả cho một hoạt động CREATE                                                                                             |
| G\_codedeposit  | 200   | Được trả theo byte cho hoạt động CREATE để thành công trong việc đặt mã vào trạng thái                                        |
| G\_call         | 700   | Được trả cho một hoạt động CALL                                                                                               |
| G\_callvalue    | 9000  | Được trả cho một giao dịch chuyển tiền khác không như một phần của hoạt động CALL                                             |
| G\_callstipend  | 2300  | Khoản trợ cấp cho hợp đồng được gọi, được trừ khỏi Gcallvalue đối với giao dịch chuyển tiền khác không                        |
| G\_newaccount   | 25000 | Được trả cho hoạt động CALL hoặc SELFDESTRUCT để tạo một tài khoản                                                            |
| G\_exp          | 10    | Khoản thanh toán một phần cho hoạt động EXP                                                                                   |
| G\_expbyte      | 50    | Khoản thanh toán một phần khi nhân với dlog256\(exponent\)e cho hoạt động EXP                                               |
| G\_memory       | 3     | Được trả cho mỗi một từ bổ sung khi mở rộng bộ nhớ                                                                            |
| G\_txcreate     | 32000 | Được trả bởi tất cả cá giao dịch tạo giao dịch                                                                                |
| G\_transaction  | 21000 | Được trả cho mọi giao dịch                                                                                                    |
| G\_log          | 375   | Khoản thanh toán một phần cho hoạt động LOG                                                                                   |
| G\_logdata      | 8     | Được trả cho mỗi byte trong dữ liệu của hoạt động LOG                                                                         |
| G\_logtopic     | 375   | Được trả cho từng chủ đề của hoạt động LOG                                                                                    |
| G\_sha3         | 30    | Được trả cho mỗi hoạt động SHA3                                                                                               |
| G\_sha3word     | 6     | Được trả cho từng từ \(được làm tròn\) cho dữ liệu nhập vào hoạt động SHA3                                                  |
| G\_copy         | 3     | Thanh toán một phần cho các hoạt động \*COPY, nhân lên theo số từ được sao chép, được làm tròn                              |
| G\_blockhash    | 20    | Khoản thanh toán cho hoạt động BLOCKHASH                                                                                      |
| G\_extcodehash  | 400   | Được trả cho việc nhận hàm băm keccak256 của mã hợp đồng                                                                      |
| G\_create2      | 32000 | Được trả cho mã vận hành CREATE2, hoạt động giống hệt như CREATE nhưng dùng những đối số khác                                 |

### Hợp đồng đã lập trước <a id="precompiled-contracts"></a>

Hợp đồng được lập trước là loại hợp đồng đặc biệt, thường thực hiện các phép tính toán mật mã phức tạp, và được khởi tạo bởi những hợp đồng khác.

| Mục                     | Gas                 | Mô tả                                                          |
|:----------------------- |:------------------- |:-------------------------------------------------------------- |
| EcrecoverGas            | 3000                | Thực hiện hoạt động ECRecover                                  |
| Sha256BaseGas           | 60                  | Thực hiện hoạt động hàm băm sha256                             |
| Sha256PerWordGas        | 12                  |                                                                |
| Ripemd160BaseGas        | 600                 | Thực hiện hoạt động Ripemd160                                  |
| Ripemd160PerWordGas     | 120                 |                                                                |
| IdentityBaseGas         | 15                  |                                                                |
| IdentityPerWordGas      | 3                   |                                                                |
| ModExpQuadCoeffDiv      | 20                  |                                                                |
| Bn256AddGas             | 500                 | Thực hiện hoạt động đường cong elliptic Bn256                  |
| Bn256ScalarMulGas       | 40000               |                                                                |
| Bn256PairingBaseGas     | 100000              |                                                                |
| Bn256PairingPerPointGas | 80000               |                                                                |
| VMLogBaseGas            | 100                 | Ghi nhật ký vào tập tin nhật ký của nút - chỉ dành cho Klaytn  |
| VMLogPerByteGas         | 20                  | Chỉ dành cho Klaytn                                            |
| FeePayerGas             | 300                 | Nhận địa chỉ của feePayer - chỉ dành cho Klaytn                |
| ValidateSenderGas       | 5000 cho mỗi chữ ký | Xác minh địa chỉ và chữ ký của người gửi - chỉ dành cho Klaytn |

Tổng lượng gas của các mục có XXXBaseGas and XXXPerWordGas \(ví dụ: Sha256BaseGas, Sha256PerWordGas\) được tính như sau

```text
TotalGas = XXXBaseGas + (số từ * XXXPerWordGas)
```

ValidateSenderGas phải được trả trên cơ sở từng chữ ký.

```text
TotalGas = số lượng chữ ký * ValidateSenderGas
```

### Bảng gas liên quan tới tài khoản <a id="account-related-gas-table"></a>

| Mục                        | Gas   | Mô tả                                                            |
|:-------------------------- |:----- |:---------------------------------------------------------------- |
| TxAccountCreationGasPerKey | 20000 | Lượng gas cần thiết để tạo một cặp khóa                          |
| TxValidationGasPerKey      | 15000 | Lượng gas cần thiết để xác thực khóa                             |
| TxGasAccountUpdate         | 21000 | Lượng gas cần thiết để cập nhật một tài khoản                    |
| TxGasFeeDelegated          | 10000 | Lượng gas cần thiết cho một lượt ủy thác phí                     |
| TxGasFeeDelegatedWithRatio | 15000 | Lượng gas cần thiết để ủy thác phí kèm tỷ lệ                     |
| TxGasCancel                | 21000 | Lượng gas cần thiết để hủy một giao dịch có cùng số dùng một lần |
| TxGasValueTransfer         | 21000 | Lượng gas cần thiết để chuyển KLAY                               |
| TxGasContractExecution     | 21000 | Lượng gas cơ sở để thực thi hợp đồng                             |
| TxDataGas                  | 100   | Mức gas cần cho mỗi byte đơn lẻ của giao dịch                    |

Mức gas cho dữ liệu vận chuyển được tính toán như dưới đây

```text
GasPayload = number_of_bytes * TxDataGas
```

### Công thức gas cho các loại giao dịch <a id="gas-formula-for-transaction-types"></a>

| TxType                 | Gas                                                    |
|:---------------------- |:------------------------------------------------------ |
| LegacyTransaction      | TxGas + PayloadGas + KeyValidationGas                  |
| ValueTransfer          | TxGasValueTransfer + KeyValidationGas                  |
| ValueTransferMemo      | TxGasValueTransfer + PayloadGas + KeyValidationGas     |
| AccountUpdate          | TxGasAccountUpdate + KeyCreationGas + KeyValidationGas |
| SmartContractDeploy    | TxGasContractCreation + PayloadGas + KeyValidationGas  |
| SmartContractExecution | TxGasContractExecution + PayloadGas + KeyValidationGas |
| Cancel                 | TxGasCancel + KeyValidationGas                         |

Dựa theo loại khóa, KeyValidationGas được định nghĩa như sau,

| Loại khóa | Gas                                                                   |
|:--------- |:--------------------------------------------------------------------- |
| Nil       | Không có                                                              |
| Legacy    | 0                                                                     |
| Fail      | 0                                                                     |
| Public    | 0                                                                     |
| MultiSig  | \(keys-1\) \* GasValidationPerKey \(15000\)                     |
| RoleBased | Dựa theo các khóa trong vai trò được sử dụng trong quá trình xác thực |

Dựa theo loại khóa, KeyCreationGas được định nghĩa như sau,

| Loại khóa | Gas                                                                                                                                                                                                                              |
|:--------- |:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nil       | Không có                                                                                                                                                                                                                         |
| Legacy    | 0                                                                                                                                                                                                                                |
| Fail      | 0                                                                                                                                                                                                                                |
| Public    | GasCreationPerKey \(20000\)                                                                                                                                                                                                    |
| MultiSig  | \(keys\) \* GasCreationPerKey                                                                                                                                                                                                |
| RoleBased | Phí gas được tính toán dựa trên các khóa trong mỗi vai trò. ví dụ: GasRoleTransaction = \(keys\) _GasCreationPerKey_ _GasRoleAccountUpdate = \(keys\)_ GasCreationPerKey GasRoleFeePayer = \(keys\) \* GasCreationPerKey |
