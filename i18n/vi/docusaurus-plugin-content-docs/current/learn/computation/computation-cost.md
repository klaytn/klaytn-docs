# Chi phí tính toán

Vì Klaytn hướng đến việc duy trì khoảng thời gian xử lý khối là 1 giây, thời gian thực thi giao dịch cần phải được kiểm soát. Dưới đây là ba hướng tiếp cận để đạt được điều đó:

1. Hạn chế giới hạn gas của một giao dịch
2. Hạn chế thời gian thực thi của một giao dịch
3. Hạn chế chi phí tính toán của một giao dịch

Việc hạn chế giới hạn gas của một giao dịch không phải là một giải pháp khả thi do khái niệm về gas đại diện cho giá trị trao đổi hiện tại của nhiều nguồn tài nguyên khác nhau trên nền tảng chuỗi khối, chẳng hạn như tính toán, lưu trữ, băng thông mạng lưới, v.v. Hướng tiếp cận này không phù hợp để làm chỉ số cho thời gian thực thi giao dịch.

Việc hạn chế thời gian thực thi giao dịch cũng không khả thi vì thời gian thực thi có thể khác nhau giữa các nút trên nền tảng chuỗi khối. Ví dụ: hãy xem xét trường hợp chúng ta hạn chế thời gian thực thi một giao dịch ở mức 100 mili-giây. Nếu một nút thực thi một giao dịch trong 90 mili-giây và một nút khác thực thi trong 110 mili-giây, hai nút này sẽ không thể đạt được sự đồng thuận. Vì thế, giải pháp này không phù hợp.

Hướng tiếp cận cuối cùng là giới hạn chi phí tính toán của một giao dịch. Chúng tôi đã lập mô hình chi phí tính toán của từng mã vận hành EVM dựa trên thời gian thực thi thật và hạn chế tổng chi phí tính toán của một giao dịch. Với hướng tiếp cận này, chúng tôi loại trừ các yếu tố khác, chỉ tính đơn vị thời gian thực thi chuẩn hóa và các nút cũng có thể đạt được sự đồng thuận.ể đạt được sự đồng thuận.

Vì thế, chúng tôi đã chọn phương án thứ ba cho Klaytn. Hiện tại, giới hạn chi phí thực thi được đặt ở mức 100.000.000. Vì giới hạn này là do nền tảng quyết định, các nhà phát triển nên lưu ý đến chi phí tính toán của giao dịch. Để tính chi phí tính toán của một giao dịch, Klaytn cung cấp [klay_estimateComputationCost](../../references/json-rpc/klay/transaction.md#klay_estimatecomputationcost). Cách sử dụng gần giống như [klay_estimateGas](../../references/json-rpc/klay/transaction.md#klay_estimategas).

## Chi phí tính toán của mã vận hành <a id="computation-cost-of-opcodes"></a>

Bảng dưới đây cho thấy chi phí tính toán của các mã vận hành EVM. Chi phí tính toán được xác định dựa trên các thử nghiệm.

:::note

NOTE: Computation costs have changed with the `Kore` hardfork. Nếu bạn muốn đọc tài liệu trước đây, vui lòng tham khảo phần [tài liệu trước đây](computation-cost-previous.md).

`Kore` hardfork block numbers are as follows.
* Baobab Testnet: `#111736800`
* Cypress Mainnet: `#119750400`

:::

| Mã vận hành    | ComputationCost |
|:-------------- | ---------------:|
| STOP           |               0 |
| ADD            |             150 |
| MUL            |             200 |
| SUB            |             219 |
| DIV            |             404 |
| SDIV           |             739 |
| MOD            |             812 |
| SMOD           |             560 |
| ADDMOD         |            1410 |
| MULMOD         |            1760 |
| EXP            |            5000 |
| SIGNEXTEND     |             481 |
| LT             |             201 |
| GT             |             264 |
| SLT            |             176 |
| SGT            |             222 |
| EQ             |             220 |
| ISZERO         |             165 |
| AND            |             288 |
| OR             |             160 |
| XOR            |             454 |
| NOT            |             364 |
| BYTE           |             589 |
| SHL            |             478 |
| SHR            |             498 |
| SAR            |             834 |
| SHA3           |            2465 |
| ADDRESS        |             284 |
| SỐ DƯ          |            1407 |
| ORIGIN         |             210 |
| CALLER         |             188 |
| CALLVALUE      |             149 |
| CALLDATALOAD   |             596 |
| CALLDATASIZE   |             194 |
| CALLDATACOPY   |             100 |
| CODESIZE       |             145 |
| CODECOPY       |             898 |
| GASPRICE       |             131 |
| EXTCODESIZE    |            1481 |
| EXTCODECOPY    |            1000 |
| RETURNDATASIZE |              10 |
| RETURNDATACOPY |              40 |
| EXTCODEHASH    |            1000 |
| BLOCKHASH      |             500 |
| COINBASE       |             189 |
| TIMESTAMP      |             265 |
| NUMBER         |             202 |
| PREVRANDAO     |            1498 |
| GASLIMIT       |             166 |
| CHAINID        |             120 |
| SELFBALANCE    |             374 |
| POP            |             140 |
| MLOAD          |             376 |
| MSTORE         |             288 |
| MSTORE8        |            5142 |
| SLOAD          |             835 |
| SSTORE         |            1548 |
| JUMP           |             253 |
| JUMPI          |             176 |
| PC             |             147 |
| MSIZE          |             137 |
| GAS            |             230 |
| JUMPDEST       |              10 |
| PUSH0          |              80 |
| PUSH1          |             120 |
| PUSH2          |             120 |
| PUSH3          |             120 |
| PUSH4          |             120 |
| PUSH5          |             120 |
| PUSH6          |             120 |
| PUSH7          |             120 |
| PUSH8          |             120 |
| PUSH9          |             120 |
| PUSH10         |             120 |
| PUSH11         |             120 |
| PUSH12         |             120 |
| PUSH13         |             120 |
| PUSH14         |             120 |
| PUSH15         |             120 |
| PUSH16         |             120 |
| PUSH17         |             120 |
| PUSH18         |             120 |
| PUSH19         |             120 |
| PUSH20         |             120 |
| PUSH21         |             120 |
| PUSH22         |             120 |
| PUSH23         |             120 |
| PUSH24         |             120 |
| PUSH25         |             120 |
| PUSH26         |             120 |
| PUSH27         |             120 |
| PUSH28         |             120 |
| PUSH29         |             120 |
| PUSH30         |             120 |
| PUSH31         |             120 |
| PUSH32         |             120 |
| DUP1           |             190 |
| DUP2           |             190 |
| DUP3           |             176 |
| DUP4           |             142 |
| DUP5           |             177 |
| DUP6           |             165 |
| DUP7           |             147 |
| DUP8           |             157 |
| DUP9           |             138 |
| DUP10          |             174 |
| DUP11          |             141 |
| DUP12          |             144 |
| DUP13          |             157 |
| DUP14          |             143 |
| DUP15          |             237 |
| DUP16          |             149 |
| SWAP1          |             141 |
| SWAP2          |             156 |
| SWAP3          |             145 |
| SWAP4          |             135 |
| SWAP5          |             115 |
| SWAP6          |             146 |
| SWAP7          |             199 |
| SWAP8          |             130 |
| SWAP9          |             160 |
| SWAP10         |             134 |
| SWAP11         |             147 |
| SWAP12         |             128 |
| SWAP13         |             121 |
| SWAP14         |             114 |
| SWAP15         |             197 |
| SWAP16         |             128 |
| LOG0           |             100 |
| LOG1           |            1000 |
| LOG2           |            1000 |
| LOG3           |            1000 |
| LOG4           |            1000 |
| PUSH           |               0 |
| DUP            |               0 |
| SWAP           |               0 |
| CREATE         |            2094 |
| CALL           |            5000 |
| CALLCODE       |            4000 |
| RETURN         |               0 |
| DELEGATECALL   |             696 |
| CREATE2        |           10000 |
| STATICCALL     |           10000 |
| REVERT         |               0 |
| SELFDESTRUCT   |               0 |
| BASEFEE        |             198 |
