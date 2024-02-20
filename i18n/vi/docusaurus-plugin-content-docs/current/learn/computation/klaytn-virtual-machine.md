# Máy ảo Klaytn

## Tổng quan <a id="overview"></a>

The current version of the Klaytn Virtual Machine (KLVM) is derived from the Ethereum Virtual Machine (EVM). The content of this chapter is based primarily on the [Ethereum Yellow Paper](https://github.com/ethereum/yellowpaper). KLVM is continuously being improved by the Klaytn team, thus this document could be updated frequently. Please do not regard this document as the final version of the KLVM specification. As described in the Klaytn position paper, the Klaytn team also plans to adopt other virtual machines or execution environments in order to strengthen the capability and performance of the Klaytn platform. This chapter presents a specification of KLVM and the differences between KLVM and EVM.

KLVM is a virtual state machine that formally specifies Klaytn's execution model. The execution model specifies how the system state is altered given a series of bytecode instructions and a small tuple of environmental data. KLVM is a quasi-Turing-complete machine; the _quasi_ qualification stems from the fact that the computation is intrinsically bounded through a parameter, _gas_, which limits the total amount of computation performed.

KLVM executes Klaytn virtual machine code (or Klaytn bytecode) which consists of a sequence of KLVM instructions. The KLVM code is the programming language used for accounts on the Klaytn blockchain that contain code. The KLVM code associated with an account is executed every time a message is sent to that account; this code has the ability to read/write from/to storage and send messages.

## Thông số kỹ thuật của KLVM <a id="klvm-specification"></a>

### Các quy tắc <a id="conventions"></a>

We use the following notations and conventions in this document.

- `A := B`
  - `:=` is used to define `A` as `B`.
- We use the terms "smart contract" and "contract" interchangeably.
- We use the terms "opcode" as the "operation code/operation"

### Ký hiệu <a id="symbols"></a>

The following tables summarize the symbols used in the KLVM specification.

#### Các ký hiệu liên quan đến chuỗi khối <a id="blockchain-related-symbols"></a>

| Ký hiệu    | Mô tả                          |
| :--------- | :----------------------------- |
| `BC`       | Chuỗi khối                     |
| `B`        | Khối                           |
| `B_header` | Tiêu đề khối của khối hiện tại |

#### Các ký hiệu liên quan đến trạng thái <a id="state-related-symbols"></a>

| Ký hiệu          | Mô tả                                         |
| :--------------- | :-------------------------------------------- |
| `S`              | Trạng thái                                    |
| `S_system`       | Trạng thái của hệ thống                       |
| `S_machine`      | Trạng thái của máy                            |
| `P_modify_state` | Quyền được phép thực hiện thay đổi trạng thái |

#### Các ký hiệu liên quan đến giao dịch <a id="transaction-related-symbols"></a>

| Ký hiệu   | Mô tả                                                                                                                                                                 |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `T`       | Giao dịch                                                                                                                                                             |
| `T_code`  | Một mảng byte chứa mã máy cần thực thi                                                                                                                                |
| `T_data`  | Một mảng byte chứa dữ liệu đầu vào để thực thi; nếu tác nhân thực thi là một giao dịch, dữ liệu này sẽ là dữ liệu giao dịch.                                          |
| `T_value` | Một giá trị tình bằng peb được đưa vào tài khoản như một phần của quy trình thực thi; nếu tác nhân thực thi là một giao dịch, giá trị này sẽ là giá trị giao dịch.    |
| `T_depth` | Độ sâu của ngăn xếp dữ liệu tin nhắn-cuộc gọi hoặc tạo hợp đồng (_nghĩa là_ số lượng `CALL` hoặc `CREATE` đang được thực thi ở thời điểm hiện tại) |

#### Các ký hiệu liên quan đến gas <a id="gas-related-symbols"></a>

| Ký hiệu   | Mô tả                                              |
| :-------- | :------------------------------------------------- |
| `G`       | Gas                                                |
| `G_rem`   | Lượng gas còn lại để tính toán                     |
| `G_price` | Giá gas trong giao dịch phát sinh từ việc thực thi |

#### Các ký hiệu liên quan đến địa chỉ <a id="address-related-symbols"></a>

| Ký hiệu           | Mô tả                                                                                                                              |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `A`               | Địa chỉ                                                                                                                            |
| `A_code_owner`    | Địa chỉ của tài khoản sở hữu mã thực thi                                                                                           |
| `A_tx_sender`     | Địa chỉ người gửi của giao dịch phát sinh từ việc thực thi hiện tại                                                                |
| `A_code_executor` | địa chỉ của tài khoản bắt đầu việc thực thi mã; nếu tác nhân thực thi là một giao dịch, địa chỉ này sẽ là của người gửi giao dịch. |

#### Hàm <a id="functions"></a>

|  Ký hiệu  | Mô tả                                                                                                                           |
| :-------: | :------------------------------------------------------------------------------------------------------------------------------ |
| `F_apply` | Một hàm áp dụng một giao dịch kèm dữ liệu đầu vào cho một trạng thái cho trước và trả về trạng thái tổng hợp kèm dữ liệu đầu ra |

### Cơ bản <a id="basics"></a>

KLVM is a simple stack-based architecture. The word size of the machine (and thus the size of stack items) is 256-bit. This was chosen to facilitate the Keccak-256 hash scheme and the elliptic-curve computations. The memory model is a simple word-addressed byte array. The stack has a maximum size of 1024. The machine also has an independent storage model; this is similar in concept to the memory but rather than a byte array, it is a word-addressable word array. Unlike memory, which is volatile, storage is nonvolatile and is maintained as part of the system state. All locations in both storage and memory are initially well-defined as zero.

The machine does not follow the standard von Neumann architecture. Rather than storing program code in generally accessible memory or storage, code is stored separately in virtual read-only memory and can be interacted with only through specialized instructions.

The machine can execute exception code for several reasons, including stack underflows and invalid instructions. Similar to an out-of-gas exception, these exceptions do not leave state changes intact. Rather, the virtual machine halts immediately and reports the issue to the execution agent (either the transaction processor or, recursively, the spawning execution environment), which will be addressed separately.

### Môi trường thực thi <a id="execution-environment"></a>

Môi trường thực thi có chứa trạng thái hệ thống `S_system`, lượng gas còn lại để tính toán `G_rem` và thông tin `I` mà tác nhân thực thi cung cấp. `I` là một tuple được định nghĩa như dưới đây:

`I := (B_header, T_code, T_depth, T_value, T_data, A_tx_sender, A_code_executor, A_code_owner, G_price, P_modify_state)`

Mô hình thực thi xác định hàm `F_apply`, hàm này có thể tính toán trạng thái tổng hợp `S_system`, lượng gas còn lại `G_rem`, trạng thái con tích lũy `A` và dữ liệu đầu ra tổng hợp `O_result` khi đưa ra các định nghĩa này. Với bối cảnh hiện tại, chúng tôi sẽ định nghĩa như sau:

`(S_system', G_rem', A, O_result) = F_apply(S_system, G_rem, I)`

trong đó, chúng ta phải nhớ rằng `A`, trạng thái con tích lũy, được định nghĩa như một tuple gồm các tập loại bỏ `Set_suicide`, chuỗi bản ghi `L`, các tài khoản chịu ảnh hưởng `Set_touched_tài khoảns` và khoản hoàn tiền `G_refund`:

`A := (Set_suicide, L, Set_touched_tài khoảns, G_refund)`

### Tổng quan về thực thi <a id="execution-overview"></a>

Trong hầu hết những lần triển khai thực tế, `F_apply` sẽ đóng vai trò tiến trình lặp mẫu của cặp trạng thái hệ thống đầy đủ `S_system` và trạng thái máy `S_machine`. Chúng tôi chính thức định nghĩa theo cách đệ quy bằng hàm `X`, hàm này sử dụng hàm lặp `O` (xác định kết quả của một chu kỳ duy nhất của máy trạng thái) cùng với các hàm `Z`, hàm này xác định xem trạng thái hiện tại có phải là trạng máy tạm dừng ngoại lệ hay không và `H` chỉ định dữ liệu đầu ra của một chỉ thị nếu và chỉ nếu trạng thái hiện tại là trạng thái máy tạm dừng bình thường.

Dãy rỗng, được ký hiệu là `()`, không tương đương với tập hợp rỗng, được ký hiệu là `Set_empty`; điều này rất quan trọng khi diễn giải dữ liệu đầu ra của `H`, dữ liệu đầu ra này sẽ ước lượng thành `Set_empty` khi quá trình thực thi tiếp tục, nhưng nó sẽ trở thành chuỗi (có khả năng rỗng) khi quá trình thực thi tạm dừng.

`F_apply(S_machine, G_rem, I, T) := (S_system', S_machine,g', A, o)`

- `(S_system', S_machine,g', A, ..., o) := X((S_system, S_machine, A^0, I))`
- `S_machine,g := G_rem`
- `S_machine,pc := 0`
- `S_machine,memory := (0, 0, ...)`
- `S_machine,i := 0`
- `S_machine,stack := ()`
- `S_machine,o := ()`
- `X((S_system, S_machine, A, I)) :=`
  - `(Set_empty, S_machine, A^0, I, Set_empty)` if `Z(S_system, S_machine, I)`
  - `(Set_empty, S_machine', A^0, I, o)` if `w = REVERT`
  - `O(S_system, S_machine, A, I) · o` if `o != Set_empty`
  - `X(O(S_system, S_machine, A, I))` otherwise

where

- `o := H(S_machine, I)`
- `(a, b, c, d) · e := (a, b, c, d, e)`
- `S_machine' := S_machine` except

  `S_machine,g' := S_machine,g - C(S_system, S_machine, I)`

  - Điều này có nghĩa là khi chúng ta ước tính `F_apply`, chúng ta

    trích phần gas còn lại `S_machine,g'` từ

    trạng thái máy tổng hợp `S_machine'`.

Do đó, `X` được quay vòng (ở đây là đệ quy, nhưng việc triển khai thường phải sử dụng một vòng lặp đơn giản) cho đến khi `Z` trở thành đúng, cho biết trạng thái hiện tại là ngoại lệ, rằng máy phải tạm dừng và mọi thay đổi sẽ bị hủy hoặc cho đến khi `H` trở thành một chuỗi (thay vì một tập hợp rỗng), cho biết máy đã đạt đến trạng thái tạm dừng có kiểm soát.

#### Trạng thái của máy <a id="machine-state"></a>

Trạng thái của máy `S_machine` được định nghĩa là một tuple `(g, pc, memory, i, stack)`, thể hiện lượng gas khả dụng, bộ đếm chương trình `pc` (số nguyên không dấu 64 bit), nội dung bộ nhớ, số lượng từ đang hoạt động trong bộ nhớ (đếm liên tục từ vị trí 0) và nội dung của ngăn xếp dữ liệu. Nội dung bộ nhớ `S_machine,memory` là một chuỗi các số 0 có kích thước 2^256.

For ease of reading, the instruction mnemonics written in small-caps (_e.g._, `ADD`) should be interpreted as their numeric equivalents; the full table of instructions and their specifics is given in the [Instruction Set](klaytn-virtual-machine#instruction-set) section.

Để xác định `Z`, `H` và `O`, chúng tôi xác định `w` là hoạt động hiện tại cần được thực thi:

- `w := T_code[S_machine,pc]` if `S_machine,pc < len(T_code)`
- `w :=STOP` otherwise

### Bộ chỉ thị <a id="instruction-set"></a>

LƯU Ý: Mục này sẽ được bổ sung sau.

## KLVM khác với EVM như thế nào <a id="how-klvm-differs-from-evm"></a>

Như đã đề cập từ trước, KLVM hiện tại dựa theo EVM; vì thế, thông số kỹ thuật của nó hiện rất giống với EVM. Một số điểm khác nhau giữa KLVM và EVM được liệt kê dưới đây.

- KLVM dùng đơn vị gas của Klaytn, ví dụ như peb, ston hoặc KLAY.
- KLVM không chấp nhận giá gas từ người dùng; thay vào đó, nó dùng một giá trị được nền tảng xác định làm giá gas.

Đội ngũ Klaytn sẽ cố gắng duy trì khả năng tương thích giữa KLVM và EVM, nhưng khi Klaytn được triển khai ngày càng nhiều và phát triển, thông số kỹ thuật của KLVM sẽ được cập nhật và có thể sẽ có nhiều điểm khác biệt hơn so với EVM.

LƯU Ý: Mục này sẽ được cập nhật trong tương lai.
