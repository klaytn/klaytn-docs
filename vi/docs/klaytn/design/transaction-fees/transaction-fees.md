# Phí giao dịch <a id="transaction-fees"></a>
Phí giao dịch đối với máy ảo Klaytn hiện tại \(KLVM\) được tính toán như sau:

```text
(Phí giao dịch ) := (Lượng gas sử dụng) * (Phí cơ sở)
```

* `Lượng gas sử dụng` được KLVM tính toán, dựa trên chi phí gas của mã vận hành và chi phí gas nội tại.
* `Phí cơ sở` là giá gas thực tế được dùng cho giao dịch. Phí này có cùng ý nghĩa như `Giá gas hiệu dụng`.

Phí giao dịch tính toán này được trừ từ số dư tài khoản của người gửi hoặc người trả phí, tùy vào giao dịch.

## Tổng quan về gas và phí cơ sở <a id="gas-and-base-fee-overview"></a>
### Gas <a id="gas"></a>
Mọi hành động làm thay đổi trạng thái của chuỗi khối đều cần tới gas. Khi một nút xử lý giao dịch của người dùng, ví dụ như gửi KLAY, dùng token KIP-7, hoặc thực thi một hợp đồng, người dùng phải trả phí cho việc tính toán và sử dụng dung lượng lưu trữ. Số tiền thanh toán được xác định bằng số `gas` cần dùng.

`Gas` là đơn vị đo thể hiện số lượng phép tính cần thiết để xử lý giao dịch của người dùng.

### Cơ chế phí gas động <a id="dynamic-gas-fee-mechanism"></a>
Sau khi nâng cấp căn bản Klaytn v1.9.0, một cơ chế phí gas động đã thay thế chính sách phí cố định hiện có. Chính sách phí gas động cung cấp một dịch vụ ổn định cho người dùng bằng cách ngăn chặn các hành vi lạm dụng mạng lưới và chiếm dụng dung lượng lưu trữ. Phí gas thay đổi tùy theo tình hình của mạng. Có bảy tham số ảnh hưởng tới `phí cơ sở (phí gas)`:

1. PREVIOUS_BASE_FEE: Phí cơ sở của khối trước đó
2. GAS_USED_FOR_THE_PREVIOUS_BLOCK: Lượng gas dùng để xử lý tất cả các giao dịch của khối trước đó
3. GAS_TARGET: Lượng gas quyết định việc tăng hoặc giảm phí cơ sở (hiện tại là 30 triệu)
4. MAX_BLOCK_GAS_USED_FOR_BASE_FEE: Hạn mức gas cho khối ẩn để thực thi tỷ lệ thay đổi phí cơ sở (hiện tại là 60 triệu)
5. BASE_FEE_DELTA_REDUCING_DENOMINATOR: Giá trị để đặt thay đổi phí cơ sở tối đa thành 5% mỗi khối (hiện tại là 20, có thể được nhóm quản trị thay đổi sau)
6. UPPER_BOUND_BASE_FEE: Giá trị tối đa cho phí cơ sở (hiện tại là 750 ston, có thể được nhóm quản trị thay đổi sau)
7. LOWER_BOUND_BASE_FEE: Giá trị tối thiểu cho phí cơ sở (hiện tại là 25 ston, có thể được nhóm quản trị thay đổi sau)

### Phí cơ sở <a id="base-fee"></a>
Ý tưởng cơ bản của thuật toán này là `phí cơ sở` sẽ tăng lên nếu lượng gas sử dụng vượt quá mức gas cơ sở và ngược lại. Nó liên quan chặt chẽ đến số lượng giao dịch trong mạng và gas được sử dụng trong quy trình. Có hạn mức trên và hạn mức dưới đối với `phí cơ sở` để ngăn chặn phí tăng hoặc giảm vô hạn. Ngoài ra còn có giới hạn cho gas và giá trị điều chỉnh đối với khả năng biến động nhằm ngăn chặn những thay đổi đột ngột về `phí cơ sở`. Các giá trị này có thể được nhóm quản trị thay đổi.

```text
(BASE_FEE_CHANGE_RATE) = (GAS_USED_FOR_THE_PREVIOUS_BLOCK - GAS_TARGET)
(ADJUSTED_BASE_FEE_CHANGE_RATE) = (BASE_FEE_CHANGE_RATE) / (GAS_TARGET) / (BASE_FEE_DELTA_REDUCING_DENOMINATOR)
(BASE_FEE_CHANGE_RANGE) = (PREVIOUS_BASE_FEE) * (ADJUSTED_BASE_FEE_CHANGE_RATE)
(BASE_FEE) = (PREVIOUS_BASE_FEE) + (BASE_FEE_CHANGE_RANGE) 
```

`Phí cơ sở` được tính cho mọi khối; có thể có thay đổi theo từng giây. Các giao dịch từ một khối đơn lẻ sử dụng cùng một mức `phí cơ sở` để tính toán phí giao dịch. Chỉ các giao dịch với giá gas cao hơn `phí cơ sở` của khối mới có thể được thêm vào khối. Một nửa phí giao dịch đối với mỗi khối sẽ bị đốt (BURN_RATIO = 0,5, nhóm quản trị không thể thay đổi giá trị này).

> LƯU Ý: Một tính năng quan trọng khiến Klaytn trở nên khác biệt với EIP-1559 của Ethereum là nó không có phí trả thêm. Klaytn tuân theo nguyên tắc “Ai đến trước thì được phục vụ trước” (FCFS) đối với các giao dịch của mình.

### Thay thế giao dịch <a id="transaction-replacement"></a>

Klaytn hiện không cung cấp phương thức thay thế giao dịch bằng đơn giá, nhưng có thể hỗ trợ các phương thức thay thế giao dịch khác trong tương lai. Xin lưu ý rằng trong Ethereum, một giao dịch với một số dùng một lần nhất định có thể được thay thế bằng một giao dịch mới với giá gas cao hơn.

## Bảng giá gas của Klaytn  <a id="klaytns-gas-table"></a>

Về cơ bản, Klaytn luôn duy trì khả năng tương thích với Ethereum. Vì thế, bảng giá gas của Klaytn cũng khá tương đồng với bảng của Ethereum. Tuy nhiên, có một số tính năng chỉ Klaytn mới có và cần một vài hằng số mới.

{% hint style="success" %}
LƯU Ý: Bảng gas đã thay đổi cùng với việc nâng cấp giao thức `IstanbulEVM` hay còn gọi là "nâng cấp căn bản". Nếu bạn muốn đọc tài liệu trước đây, vui lòng tham khảo [tài liệu trước đây ](transaction-fees-previous.md).

Số khối nâng cấp giao thức `IstanbulEVM` như sau.
* Mạng thử nghiệm Baobab: `#75373312`
* Mạng chính thức Cypress: `#86816005`
{% endhint %}

### Phí chung <a id="common-fee"></a>

| Mục               | Gas   | Mô tả                                                                                                                  |
|:----------------- |:----- |:---------------------------------------------------------------------------------------------------------------------- |
| G\_zero         | 0     | Không cần thanh toán cho các hoạt động của bộ Wzero                                                                    |
| G\_base         | 2     | Lượng gas phải trả cho các hoạt động của bộ Wbase                                                                      |
| G\_verylow      | 3     | Lượng gas phải trả cho các hoạt động của bộ Wverylow                                                                   |
| G\_low          | 5     | Lượng gas phải trả cho các hoạt động của bộ Wlow                                                                       |
| G\_mid          | 8     | Lượng gas phải trả cho các hoạt động của bộ Wmid                                                                       |
| G\_high         | 10    | Lượng gas phải trả cho các hoạt động của bộ Whigh                                                                      |
| G\_blockhash    | 20    | Khoản thanh toán cho hoạt động BLOCKHASH                                                                               |
| G\_extcode      | 700   | Lượng gas phải trả cho các hoạt động của bộ Wextcode                                                                   |
| G\_balance      | 700   | Lượng gas phải trả cho một hoạt động BALANCE                                                                           |
| G\_sload        | 800   | Được trả cho một hoạt động SLOAD                                                                                       |
| G\_jumpdest     | 1     | Được trả cho một hoạt động JUMPDEST                                                                                    |
| G\_sset         | 20000 | Được trả cho một hoạt động SSTORE khi giá trị lưu trữ được đặt từ số 0 sang số khác 0                                  |
| G\_sreset       | 5000  | Được trả cho một hoạt động SSTORE khi giá trị bằng không của giá trị không đổi, hoặc được đặt thành số 0               |
| G\_sclear       | 15000 | Khoản hoàn tiền đã thực hiện \(được thêm vào bộ đếm hoàn tiền\) khi giá trị lưu trữ được đặt từ số khác 0 thành số 0 |
| R\_selfdestruct | 24000 | Khoản hoàn tiền đã thực hiện \(được thêm vào bộ đếm hoàn tiền\) cho việc tự hủy một tài khoản                        |
| G\_selfdestruct | 5000  | Lượng gas phải trả cho một hoạt động SELFDESTRUCT                                                                      |
| G\_create       | 32000 | Được trả cho một hoạt động CREATE                                                                                      |
| G\_codedeposit  | 200   | Được trả theo byte cho hoạt động CREATE để thành công trong việc đặt mã vào trạng thái                                 |
| G\_call         | 700   | Được trả cho một hoạt động CALL                                                                                        |
| G\_callvalue    | 9000  | Được trả cho một giao dịch chuyển giao giá trị khác 0như một phần của hoạt động CALL                                   |
| G\_callstipend  | 2300  | Khoản trợ cấp cho hợp đồng được gọi ra, được trừ khỏi Gcallvalue đối với giao dịch chuyển giao giá trị khác 0          |
| G\_newaccount   | 25000 | Được trả cho hoạt động CALL hoặc SELFDESTRUCT để tạo tài khoản                                                         |
| G\_exp          | 10    | Khoản thanh toán một phần cho hoạt động EXP                                                                            |
| G\_expbyte      | 50    | Khoản thanh toán một phần khi nhân với dlog256\(exponent\)e cho hoạt động EXP                                        |
| G\_memory       | 3     | Được trả cho mỗi một từ bổ sung khi mở rộng bộ nhớ                                                                     |
| G\_txcreate     | 32000 | Được trả bởi tất cả các giao dịch tạo hợp đồng                                                                         |
| G\_transaction  | 21000 | Được trả cho mọi giao dịch                                                                                             |
| G\_log          | 375   | Khoản thanh toán một phần cho hoạt động LOG                                                                            |
| G\_logdata      | 8     | Được trả cho mỗi byte trong dữ liệu của hoạt động LOG                                                                  |
| G\_logtopic     | 375   | Được trả cho từng chủ đề của hoạt động LOG                                                                             |
| G\_sha3         | 30    | Được trả cho mỗi hoạt động SHA3                                                                                        |
| G\_sha3word     | 6     | Được trả cho từng từ \(được làm tròn\) cho dữ liệu nhập vào hoạt động SHA3                                           |
| G\_copy         | 3     | Thanh toán một phần cho các hoạt động \*COPY, nhân lên theo số từ được sao chép, được làm tròn                       |
| G\_blockhash    | 20    | Khoản thanh toán cho hoạt động BLOCKHASH                                                                               |
| G\_extcodehash  | 700   | Được trả cho việc nhận hàm băm keccak256 của mã hợp đồng                                                               |
| G\_create2      | 32000 | Được trả cho mã vận hành CREATE2, hoạt động giống hệt như CREATE nhưng dùng những đối số khác                          |

### Hợp đồng đã lập trước <a id="precompiled-contracts"></a>

Hợp đồng đã lập trước là loại hợp đồng đặc biệt, thường thực hiện các phép tính toán mã hóa phức tạp và được khởi tạo bởi những hợp đồng khác.

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
| Bn256AddGas             | 150                 | Thực hiện hoạt động đường cong elliptic Bn256                  |
| Bn256ScalarMulGas       | 6000                |                                                                |
| Bn256PairingBaseGas     | 45000               |                                                                |
| Bn256PairingPerPointGas | 34000               |                                                                |
| VMLogBaseGas            | 100                 | Ghi nhật ký vào tập tin nhật ký của nút - chỉ dành cho Klaytn  |
| VMLogPerByteGas         | 20                  | Chỉ dành cho Klaytn                                            |
| FeePayerGas             | 300                 | Nhận địa chỉ của feePayer - chỉ dành cho Klaytn                |
| ValidateSenderGas       | 5000 cho mỗi chữ ký | Xác thực địa chỉ và chữ ký của người gửi - chỉ dành cho Klaytn |

Tổng lượng gas của các mục có XXXBaseGas và XXXPerWordGas \(ví dụ: Sha256BaseGas, Sha256PerWordGas\) được tính như sau

```text
TotalGas = XXXBaseGas + (số từ * XXXPerWordGas)
```

ValidateSenderGas phải được trả trên cơ sở từng chữ ký.

```text
TotalGas = số lượng chữ ký * ValidateSenderGas
```

Chi phí gas Blake2f được tính dựa trên công thức dưới đây. `input` là đầu vào của lệnh gọi blake2f.
```text
Gas = uint64(binary.BigEndian.Uint32(input[0:4]))
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
| TxDataGas                  | 100   | Lượng gas cần cho mỗi byte đơn lẻ của giao dịch                  |

Lượng gas cần cho dữ liệu tải tin được tính toán như dưới đây

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
| MultiSig  | \(số lượng chữ ký - 1\) \* GasValidationPerKey \(15000\)        |
| RoleBased | Dựa theo các khóa trong vai trò được sử dụng trong quá trình xác thực |

Dựa theo loại khóa, KeyCreationGas được định nghĩa như sau,

| Loại khóa | Gas                                                                                                                                                                                                                               |
|:--------- |:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nil       | Không có                                                                                                                                                                                                                          |
| Legacy    | 0                                                                                                                                                                                                                                 |
| Fail      | 0                                                                                                                                                                                                                                 |
| Public    | GasCreationPerKey \(20000\)                                                                                                                                                                                                     |
| MultiSig  | \(khóa\) \* GasCreationPerKey                                                                                                                                                                                                 |
| RoleBased | Phí gas được tính toán dựa trên các khóa trong từng vai trò. ví dụ: GasRoleTransaction = \(khóa\) _GasCreationPerKey_ _GasRoleAccountUpdate = \(khóa\)_ GasCreationPerKey GasRoleFeePayer = \(khóa\) \* GasCreationPerKey |

