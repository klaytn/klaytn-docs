# Máy ảo Klaytn <a id="klaytn-virtual-machine"></a>

## Tổng quan <a id="overview"></a>

Phiên bản hiện tại của Máy ảo Klaytn \(KLVM\) có nguồn gốc từ Máy ảo Ethereum \(EVM\). Nội dung của chương này chủ yếu dựa theo [Ethereum Yellow Paper](https://github.com/ethereum/yellowpaper). KLVM liên tục được cải thiện bởi đội ngũ Klaytn, vì thế, tài liệu này có thể được cập nhật thường xuyên. Vui lòng không coi tài liệu này là phiên bản cuối cùng về thông số kỹ thuật của KLVM. Như đã được mô tả trong tuyên bố lập trường, đội ngũ Klaytn cũng có dự định áp dụng các máy ảo khác hoặc môi trường thực thi khác nhằm củng cố khả năng và hiệu suất của nền tảng Klaytn. Chương này đề cập đến thông số kỹ thuật của KLVM và sự khác biệt giữa KLVM và EVM.

KLVM là một cỗ máy trạng thái ảo, chính thức chỉ định mô hình thực thi của Klaytn. Mô hình thực thi này chỉ định cách thay đổi trạng thái hệ thống dựa trên một loạt chỉ thị bytecode và một tuple dữ liệu môi trường nhỏ. KLVM là một cỗ máy gần giống với Turing Complete, tính chất _gần giống_ này bắt nguồn từ một thực tế là việc tính toán chịu sự ràng buộc nội tại qua một tham số, _gas_, tham số này hạn chế tổng lượng tính toán được thực hiện.

KLVM thực thi mã máy ảo Klaytn \(hoặc bytecode Klaytn\), trong đó có chứa một chuỗi các hướng dẫn KLVM. Mã KLVM là ngôn ngữ lập trình được dùng cho các tài khoản trên chuỗi khối Klaytn có chứa mã. Mã KLVM liên kết với một tài khoản được thực thi mỗi lần có một tin nhắn được gửi đến tài khoản đó; mã này có khả năng đọc/viết dữ liệu từ/vào lưu trữ và gửi tin nhắn.

## Thông số kỹ thuật của KLVM <a id="klvm-specification"></a>

### Các quy tắc <a id="conventions"></a>

Trong tài liệu này, chúng tôi sử dụng các ký hiệu và quy tắc sau.

* `A := B`
  * `:=` được dùng để xác định `A` là `B`.
* Chúng tôi sử dụng thuật ngữ "hợp đồng thông minh" và "hợp đồng" thay thế lẫn nhau.

### Ký hiệu <a id="symbols"></a>

Bảng dưới đây tóm tắt các ký hiệu được dùng trong thông số kỹ thuật của KLVM.

#### Các ký hiệu liên quan đến chuỗi khối <a id="blockchain-related-symbols"></a>

| Ký hiệu    | Mô tả                          |
|:---------- |:------------------------------ |
| `BC`       | Chuỗi khối                     |
| `B`        | Khối                           |
| `B_header` | Tiêu đề khối của khối hiện tại |

#### Các ký hiệu liên quan đến trạng thái <a id="state-related-symbols"></a>

| Ký hiệu          | Mô tả                                         |
|:---------------- |:--------------------------------------------- |
| `S`              | Trạng thái                                    |
| `S_system`       | Trạng thái của hệ thống                       |
| `S_machine`      | Trạng thái của máy                            |
| `P_modify_state` | Quyền được phép thực hiện thay đổi trạng thái |

#### Các ký hiệu liên quan đến giao dịch <a id="transaction-related-symbols"></a>

| Ký hiệu   | Mô tả                                                                                                                                                              |
|:--------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `T`       | Giao dịch                                                                                                                                                          |
| `T_code`  | Một mảng byte chứa mã máy cần thực thi                                                                                                                             |
| `T_data`  | Một mảng byte chứa dữ liệu đầu vào để thực thi; nếu tác nhân thực thi là một giao dịch, dữ liệu này sẽ là dữ liệu giao dịch.                                       |
| `T_value` | Một giá trị tình bằng peb được đưa vào tài khoản như một phần của quy trình thực thi; nếu tác nhân thực thi là một giao dịch, giá trị này sẽ là giá trị giao dịch. |
| `T_depth` | Độ sâu của ngăn xếp dữ liệu tin nhắn-cuộc gọi hoặc tạo hợp đồng \(_nghĩa là_ số lượng `CALL` hoặc `CREATE` đang được thực thi ở thời điểm hiện tại\)             |

#### Các ký hiệu liên quan đến gas <a id="gas-related-symbols"></a>

| Ký hiệu   | Mô tả                                              |
|:--------- |:-------------------------------------------------- |
| `G`       | Gas                                                |
| `G_rem`   | Lượng gas còn lại để tính toán                     |
| `G_price` | Giá gas trong giao dịch phát sinh từ việc thực thi |

#### Các ký hiệu liên quan đến địa chỉ <a id="address-related-symbols"></a>

| Ký hiệu           | Mô tả                                                                                                                              |
|:----------------- |:---------------------------------------------------------------------------------------------------------------------------------- |
| `A`               | Địa chỉ                                                                                                                            |
| `A_code_owner`    | Địa chỉ của tài khoản sở hữu mã thực thi                                                                                           |
| `A_tx_sender`     | Địa chỉ người gửi của giao dịch phát sinh từ việc thực thi hiện tại                                                                |
| `A_code_executor` | địa chỉ của tài khoản bắt đầu việc thực thi mã; nếu tác nhân thực thi là một giao dịch, địa chỉ này sẽ là của người gửi giao dịch. |

#### Hàm <a id="functions"></a>

|  Ký hiệu  | Mô tả                                                                                                                           |
|:---------:|:------------------------------------------------------------------------------------------------------------------------------- |
| `F_apply` | Một hàm áp dụng một giao dịch kèm dữ liệu đầu vào cho một trạng thái cho trước và trả về trạng thái tổng hợp kèm dữ liệu đầu ra |

### Cơ bản <a id="basics"></a>

KLVM là một kiến trúc dựa trên ngăn xếp dữ liệu đơn giản. Kích thước từ của máy \(cũng là kích thước của các mục trong ngăn xếp dữ liệu\) là 256 bit. Con số này được chọn để tạo điều kiện thuận lợi cho hệ thống hàm băm Keccak-256 và các tính toán đường cong elip. Mô hình bộ nhớ là một mảng byte chứa từ có gắn địa chỉ đơn giản. Ngăn xếp dữ liệu có kích thước tối đa là 1024. Máy cũng có một mô hình lưu trữ độc lập; về khái niệm thì nó cũng giống như bộ nhớ, nhưng thay vì một mảng byte, nó là một mảng từ với khả năng xác định địa chỉ từ. Khác với bộ nhớ mang tính biến động, lưu trữ không biến động và được duy trì như một phần của trạng thái hệ thống. Tất cả các vị trí trong lưu trữ và bộ nhớ đều được xác định bằng 0 ngay từ đầu.

Máy không tuân theo kiến trúc von Neumann tiêu chuẩn. Thay vì lưu trữ mã chương trình trong một bộ nhớ hoặc lưu trữ dễ truy cập, mã được lữu trữ riêng trong một bộ nhớ ảo chỉ đọc và chỉ có thể được tương tác qua các chỉ thị chuyên biệt.

Máy có thể thực thi mã ngoại lệ vì một số lí do, bao gồm hiện tượng tràn dưới ngăn xếp và chỉ thị không hợp lệ. Tương tự như trường hợp ngoại lệ hết gas, những ngoại lệ này không giữ nguyên các thay đổi về trạng thái. Thay vào đó, máy ảo sẽ tạm dừng ngay lập tức và báo cáo vấn đề cho tác nhân thực thi \(trình xử lý giao dịch hoặc theo cách đệ quy, môi trường thực thi phát sinh\), việc này sẽ được xử lý riêng biệt.

### Tổng quan về phí <a id="fees-overview"></a>

Phí \(được ghi bằng gas\) được tính trong ba trường hợp riêng biệt, cả ba trường hợp đều là điều kiện tiên quyết để thực thi hoạt động. Trường hợp đầu tiên và phổ biến nhất là phí nội tại để tính toán hoạt động. Trường hợp thứ hai, gas có thể được trừ để hình thành một khoản thanh toán cho một cuộc gọi tin nhắn phụ thuộc hoặc tạo hợp đồng; đây là một phần trong khoản thanh toán dành cho `CREATE`, `CALL` và `CALLCODE`. Cuối cùng, gas có thể được tính do có sự tăng lên trong việc sử dụng bộ nhớ.

Trong quá trình thực thi tài khoản, tổng phí phải trả cho việc sử dụng bộ nhớ phải trả tỷ lệ thuận với bội số nhỏ nhất của 32 byte cần có để bao gồm tất cả các chỉ báo bộ nhớ \(dù là để đọc hay để ghi\) trong phạm vi. Phí này được thanh toán dựa trên cơ sở kịp thời; do đó, việc tham chiếu một vùng bộ nhớ có kích thước lớn hơn ít nhất 32 byte so với bất kỳ bộ nhớ nào khác được lập chỉ mục trước đó sẽ dẫn đến phí sử dụng bộ nhớ bổ sung. Do phí này, các địa chỉ ít có khả năng vượt quá giới hạn 32 bit. Như vậy nghĩa là việc triển khai phải có khả năng kiểm soát được tình huống này.

Phí lưu trữ có cách vận hành hơi khác biệt. Để khuyến khích việc giảm thiểu sử dụng bộ nhớ \(tương ứng trực tiếp với một cơ sở dữ liệu trạng thái lớn hơn trên tất cả các nút\), phí thực thi cho một hoạt động xóa mục nhập khỏi lưu trữ sẽ được miễn phí và đủ điều kiện để nhận hoàn phí; trên thực tế, khoản hoàn phí này được thanh toán trước vì chi phí sử dụng ban đầu của một vị trí lưu trữ lại cao hơn đáng kể so với việc sử dụng thông thường.

#### Biểu phí <a id="fee-schedule"></a>

Biểu phí `G` là một tuple gồm 37 giá trị vô hướng, tương ứng với chi phí tương đối tính bằng gas của một số hoạt động trừu tượng mà một giao dịch có thể làm phát sinh. Để xem các bảng khác như `Precompiled contracts` và `tài khoảns`, vui lòng tham khảo [tài liệu này](./../../transaction-fees/transaction-fees.md#klaytns-gas-table)

{% hint style="success" %}
LƯU Ý: Tài liệu này chứa biểu phí được sử dụng trước khi kích hoạt nâng cấp giao thức. Nếu bạn muốn nhận tài liệu mới nhất, vui lòng tham khảo [tài liệu mới nhất](klaytn-virtual-machine.md).
{% endhint %}

| Tên               | Giá trị | Mô tả                                                                                                                      |
|:----------------- | -------:|:-------------------------------------------------------------------------------------------------------------------------- |
| `G_zero`          |       0 | Không cần thanh toán cho các hoạt động của bộ `W_zero`                                                                     |
| `G_base`          |       2 | Lượng gas thanh toán cho các hoạt động của bộ `W_base`                                                                     |
| `G_verylow`       |       3 | Lượng gas thanh toán cho các hoạt động của bộ `W_verylow`                                                                  |
| `G_low`           |       5 | Lượng gas thanh toán cho các hoạt động của bộ `W_low`                                                                      |
| `G_mid`           |       8 | Lượng gas thanh toán cho các hoạt động của bộ `W_mid`                                                                      |
| `G_high`          |      10 | Lượng gas thanh toán cho các hoạt động của bộ `W_high`                                                                     |
| `G_blockhash`     |      20 | Khoản thanh toán cho một hoạt động `BLOCKHASH`                                                                             |
| `G_extcode`       |     700 | Lượng gas thanh toán cho các hoạt động của bộ `W_extcode`                                                                  |
| `G_balance`       |     400 | Lượng gas thanh toán cho một hoạt động `BALANCE`                                                                           |
| `G_sload`         |     200 | Lượng gas thanh toán cho một hoạt động `SLOAD`                                                                             |
| `G_jumpdest`      |       1 | Lượng gas thanh toán cho một hoạt động `JUMPDEST`                                                                          |
| `G_sset`          |   20000 | Lượng gas thanh toán cho một hoạt động `SSTORE` khi giá trị lưu trữ được đặt từ số khác 0 sang số 0                        |
| `G_sreset`        |    5000 | Lượng gas thanh toán cho một hoạt động `SSTORE` khi giá trị lưu trữ giữ nguyên không đổi ở mức 0 hoặc được đặt thành 0     |
| `R_sclear`        |   15000 | Khoản hoàn tiền đã được thực hiện \(được thêm vào bộ đếm hoàn tiền\) khi giá trị lưu trữ được đặt từ số khác 0 sang số 0 |
| `R_selfdestruct`  |   24000 | Khoản hoàn tiền đã thực hiện \(được thêm vào bộ đếm hoàn tiền\) cho việc tự hủy một tài khoản                            |
| `G_selfdestruct`  |    5000 | Lượng gas thanh toán cho một hoạt động `SELFDESTRUCT`                                                                      |
| `G_create`        |   32000 | Lượng gas thanh toán cho một hoạt động `CREATE`                                                                            |
| `G_codedeposit`   |     200 | Lượng gas thanh toán cho mỗi byte cho một hoạt động `CREATE` thành công trong việc đặt mã vào trạng thái                   |
| `G_call`          |     700 | Lượng gas thanh toán cho một hoạt động `CALL`                                                                              |
| `G_callvalue`     |    9000 | Lượng gas thanh toán một giao dịch chuyển giá trị khác 0 như một phần của hoạt động `CALL`                                 |
| `G_callstipend`   |    2300 | Khoản trợ cấp cho hợp đồng được gọi ra, được trừ khỏi `G_callvalue` đối với giao dịch chuyển giá trị khác 0                |
| `G_newtài khoản`  |   25000 | Lượng gas thanh toán cho một hoạt động `CALL` hoặc `SELFDESTRUCT` tạo ra một tài khoản                                     |
| `G_exp`           |      10 | Khoản thanh toán một phần cho một hoạt động `EXP`                                                                          |
| `G_expbyte`       |      50 | Khoản thanh toán một phần khi nhân với `ceil(log_256(exponent))` cho một hoạt động `EXP`                                   |
| `G_memory`        |       3 | Lượng gas thanh toán cho mỗi một từ bổ sung khi mở rộng bộ nhớ                                                             |
| `G_txcreate`      |   32000 | Lượng gas được trả bởi tất cả các giao dịch tạo hợp đồng                                                                   |
| `G_txdatazero`    |       4 | Lượng gas thanh toán cho mỗi byte 0 của dữ liệu hoặc mã cho một giao dịch                                                  |
| `G_txdatanonzero` |      68 | Lượng gas thanh toán cho mỗi byte khác 0 của dữ liệu hoặc mã cho một giao dịch                                             |
| `G_transaction`   |   21000 | Lượng gas thanh toán cho mỗi giao dịch                                                                                     |
| `G_log`           |     375 | Khoản thanh toán một phần cho một hoạt động `LOG`                                                                          |
| `G_logdata`       |       8 | Lượng gas thanh toán cho mỗi byte trong dữ liệu của một hoạt động `LOG`                                                    |
| `G_logtopic`      |     375 | Lượng gas thanh toán cho mỗi chủ đề của một hoạt động `LOG`                                                                |
| `G_sha3`          |      30 | Lượng gas thanh toán cho từng hoạt động `SHA3`                                                                             |
| `G_sha3word`      |       6 | Lượng gas thanh toán cho từng từ \(được làm tròn\) cho dữ liệu nhập vào một hoạt động `SHA3`                             |
| `G_copy`          |       3 | Thanh toán một phần cho các hoạt động `COPY`, nhân lên theo số từ được sao chép, được làm tròn                             |
| `G_extcodehash`   |     400 | Được trả cho việc nhận hàm băm `keccak256` của mã hợp đồng                                                                 |
| `G_create2`       |   32000 | Được trả cho mã vận hành `CREATE2`, hoạt động giống hệt như CREATE nhưng dùng những đối số khác                            |

Chúng tôi xác định những tập hợp con gồm những chỉ thị sau:

* `W_zero` = {`STOP`, `RETURN`, `REVERT`}
* `W_base` = {`ADDRESS`, `ORIGIN`, `CALLER`, `CALLVALUE`, `CALLDATASIZE`, `CODESIZE`, `GASPRICE`, `COINBASE`, `TIMESTAMP`, `NUMBER`, `DIFFICULTY`, `GASLIMIT`, `RETURNDATASIZE`, `POP`, `PC`, `MSIZE`, `GAS`}
* `W_verylow` = {`ADD`, `SUB`, `LT`, `GT`, `SLT`, `SGT`, `EQ`, `ISZERO`, `AND`, `OR`, `XOR`, `NOT`, `BYTE`, `CALLDATALOAD`, `MLOAD`, `MSTORE`, `MSTORE8`, `PUSH`, `DUP`, `SWAP`}
* `W_low` = {`MUL`, `DIV`, `SDIV`, `MOD`, `SMOD`, `SIGNEXTEND`}
* `W_mid` = {`ADDMOD`, `MULMOD`, `JUMP`}
* `W_high` = {`JUMPI`}
* `W_extcode` = {`EXTCODESIZE`}

#### Chi phí gas <a id="gas-cost"></a>

Hàm chi phí gas chung, `C`, được xác định như sau:

`C(S_system, S_machine, I) := C_mem(S_machine,i') - C_mem(S_machine, i) +`

* `C_SSTORE(S_system, S_machine)`, if `w == SSTORE`
* `G_exp`, if `(w == EXP) && (S_machine[1] == 0)`
* `G_exp + G_expbyte x (1 + floor(log_256(S_machine,sp[1])))`,

  if `(w == EXP) && (S_machine,sp[1] > 0)`

* `G_verylow + G_copy x ceil(S_machine,sp[2] / 32)`,

  if `w == CALLDATACOPY || CODECOPY || RETURNDATACOPY`

* `G_extcode + G_copy x ceil(S_machine,sp[3] / 32)`,

  if `w == EXTCODECOPY`

* `G_log + G_logdata x S_machine,sp[1]`,

  if `w == LOG0`

* `G_log + G_logdata x S_machine,sp[1] + G_logtopic`,

  if `w == LOG1`

* `G_log + G_logdata x S_machine,sp[1] + 2 x G_logtopic`,

  if `w == LOG2`

* `G_log + G_logdata x S_machine,sp[1] + 3 x G_logtopic`,

  if `w == LOG3`

* `G_log + G_logdata x S_machine,sp[1] + 4 x G_logtopic`,

  if `w == LOG4`

* `C_CALL(S_system, S_machine)`,

  if `w == CALL || CALLCODE || DELEGATECALL`

* `C_SELFDESTRUCT(S_system, S_machine)`,

  if `w == SELFDESTRUCT`

* `G_create`, if `w == CREATE`
* `G_sha3 + G_sha3word x ceil(s[1] / 32)`,

  if `w == SHA3`

* `G_jumpdest`, if `w == JUMPDEST`
* `G_sload`, if `w == SLOAD`
* `G_zero`, if `w` in `W_zero`
* `G_base`, if `w` in `W_base`
* `G_verylow`, if `w` in `W_verylow`
* `G_low`, if `w` in `W_low`
* `G_mid`, if `w` in `W_mid`
* `G__high</sub>`, if `w` in `W_high`
* `G_extcode`, if `w` in `W_extcode`
* `G_balance`, if `w == BALANCE`
* `G_blockhash`, if `w == BLOCKHASH`
* where `w` is
  * `T_code[S_machine,pc]`,

    if `S_machine,pc < length(T_code)`

  * `STOP`, otherwise
* where `C_mem(a) := G_memory x a + floor(a^2 / 512)`

với `C_CALL`, `C_SELFDESTRUCT` và `C_SSTORE` sẽ được mô tả trong tương lai.

### Môi trường thực thi <a id="execution-environment"></a>

Môi trường thực thi có chứa trạng thái hệ thống `S_system`, lượng gas còn lại để tính toán `G_rem` và thông tin `I` mà tác nhân thực thi cung cấp. `I` là một tuple được định nghĩa như dưới đây:

`I := (B_header, T_code, T_depth, T_value, T_data, A_tx_sender, A_code_executor, A_code_owner, G_price, P_modify_state)`

Mô hình thực thi xác định hàm `F_apply`, hàm này có thể tính toán trạng thái tổng hợp `S_system`, lượng gas còn lại `G_rem`, trạng thái con tích lũy `A` và dữ liệu đầu ra tổng hợp `O_result` khi đưa ra các định nghĩa này. Với bối cảnh hiện tại, chúng tôi sẽ định nghĩa như sau:

`(S_system', G_rem', A, O_result) = F_apply(S_system, G_rem, I)`

trong đó, chúng ta phải nhớ rằng `A`, trạng thái con tích lũy, được định nghĩa như một tuple gồm các tập loại bỏ `Set_suicide`, chuỗi bản ghi `L`, các tài khoản chịu ảnh hưởng `Set_touched_tài khoảns` và khoản hoàn tiền `G_refund`:

`A := (Set_suicide, L, Set_touched_tài khoảns, G_refund)`

### Tổng quan về thực thi <a id="execution-overview"></a>

Trong hầu hết những lần triển khai thực tế, `F_apply` sẽ đóng vai trò tiến trình lặp mẫu của cặp trạng thái hệ thống đầy đủ `S_system` và trạng thái máy `S_machine`. Chúng tôi chính thức định nghĩa theo cách đệ quy bằng hàm `X`, hàm này sử dụng hàm lặp `O` \(xác định kết quả của một chu kỳ duy nhất của máy trạng thái\) cùng với các hàm `Z`, hàm này xác định xem trạng thái hiện tại có phải là trạng máy tạm dừng ngoại lệ hay không và `H` chỉ định dữ liệu đầu ra của một chỉ thị nếu và chỉ nếu trạng thái hiện tại là trạng thái máy tạm dừng bình thường.

Dãy rỗng, được ký hiệu là `()`, không tương đương với tập hợp rỗng, được ký hiệu là `Set_empty`; điều này rất quan trọng khi diễn giải dữ liệu đầu ra của `H`, dữ liệu đầu ra này sẽ ước lượng thành `Set_empty` khi quá trình thực thi tiếp tục, nhưng nó sẽ trở thành chuỗi \(có khả năng rỗng\) khi quá trình thực thi tạm dừng.

`F_apply(S_machine, G_rem, I, T) := (S_system', S_machine,g', A, o)`

* `(S_system', S_machine,g', A, ..., o) := X((S_system, S_machine, A^0, I))`
* `S_machine,g := G_rem`
* `S_machine,pc := 0`
* `S_machine,memory := (0, 0, ...)`
* `S_machine,i := 0`
* `S_machine,stack := ()`
* `S_machine,o := ()`
* `X((S_system, S_machine, A, I)) :=`
  * `(Set_empty, S_machine, A^0, I, Set_empty)` if `Z(S_system, S_machine, I)`
  * `(Set_empty, S_machine', A^0, I, o)` if `w = REVERT`
  * `O(S_system, S_machine, A, I) · o` if `o != Set_empty`
  * `X(O(S_system, S_machine, A, I))` otherwise

where

* `o := H(S_machine, I)`
* `(a, b, c, d) · e := (a, b, c, d, e)`
* `S_machine' := S_machine` except

  `S_machine,g' := S_machine,g - C(S_system, S_machine, I)`

  * Điều này có nghĩa là khi chúng ta ước tính `F_apply`, chúng ta

    trích phần gas còn lại `S_machine,g'` từ

    trạng thái máy tổng hợp `S_machine'`.

Do đó, `X` được quay vòng \(ở đây là đệ quy, nhưng việc triển khai thường phải sử dụng một vòng lặp đơn giản\) cho đến khi `Z` trở thành đúng, cho biết trạng thái hiện tại là ngoại lệ, rằng máy phải tạm dừng và mọi thay đổi sẽ bị hủy hoặc cho đến khi `H` trở thành một chuỗi \(thay vì một tập hợp rỗng\), cho biết máy đã đạt đến trạng thái tạm dừng có kiểm soát.

#### Trạng thái của máy <a id="machine-state"></a>

Trạng thái của máy `S_machine` được định nghĩa là một tuple `(g, pc, memory, i, stack)`, thể hiện lượng gas khả dụng, bộ đếm chương trình `pc` \(số nguyên không dấu 64 bit\), nội dung bộ nhớ, số lượng từ đang hoạt động trong bộ nhớ \(đếm liên tục từ vị trí 0\) và nội dung của ngăn xếp dữ liệu. Nội dung bộ nhớ `S_machine,memory` là một chuỗi các số 0 có kích thước 2^256.

Để dễ đọc, phần thủ thuật ghi nhớ chỉ thị ghi bằng chữ hoa nhỏ \(_ví dụ_: `ADD`\) nên được hiểu là chỉ số đương lượng của chúng; bảng chỉ thị đầy đủ và chi tiết cụ thể của chúng được nêu trong phần [Bộ chỉ thị](klaytn-virtual-machine.md#instruction-set).

Để xác định `Z`, `H` và `O`, chúng tôi xác định `w` là hoạt động hiện tại cần được thực thi:

* `w := T_code[S_machine,pc]` if `S_machine,pc < len(T_code)`
* `w :=STOP` otherwise

### Bộ chỉ thị <a id="instruction-set"></a>

LƯU Ý: Mục này sẽ được bổ sung sau.

## KLVM khác với EVM như thế nào <a id="how-klvm-differs-from-evm"></a>

Như đã đề cập từ trước, KLVM hiện tại dựa theo EVM; vì thế, thông số kỹ thuật của nó hiện rất giống với EVM. Một số điểm khác nhau giữa KLVM và EVM được liệt kê dưới đây.

* KLVM dùng đơn vị gas của Klaytn, ví dụ như peb, ston hoặc KLAY.
* KLVM không chấp nhận giá gas từ người dùng; thay vào đó, nó dùng một giá trị được nền tảng xác định làm giá gas.

Đội ngũ Klaytn sẽ cố gắng duy trì khả năng tương thích giữa KLVM và EVM, nhưng khi Klaytn được triển khai ngày càng nhiều và phát triển, thông số kỹ thuật của KLVM sẽ được cập nhật và có thể sẽ có nhiều điểm khác biệt hơn so với EVM.

LƯU Ý: Mục này sẽ được cập nhật trong tương lai.
