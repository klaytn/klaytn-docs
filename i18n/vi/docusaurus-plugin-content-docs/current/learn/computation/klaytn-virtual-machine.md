# Máy ảo Klaytn

:::note

NOTE: KLVM has changed with the `Kore` hardfork. If you want the previous document, please refer to [previous document](klaytn-virtual-machine-previous.md).

`Kore` hardfork block numbers are as follows.
* Baobab Testnet: `#111736800`
* Cypress Mainnet: `#119750400`

:::

## Tổng quan <a id="overview"></a>

The current version of the Klaytn Virtual Machine \(KLVM\) is derived from the Ethereum Virtual Machine \(EVM\). The content of this chapter is based primarily on the [Ethereum Yellow Paper](https://github.com/ethereum/yellowpaper). KLVM is continuously being improved by the Klaytn team, thus this document could be updated frequently. Please do not regard this document as the final version of the KLVM specification. As described in the Klaytn position paper, the Klaytn team also plans to adopt other virtual machines or execution environments in order to strengthen the capability and performance of the Klaytn platform. This chapter presents a specification of KLVM and the differences between KLVM and EVM.

KLVM is a virtual state machine that formally specifies Klaytn's execution model. The execution model specifies how the system state is altered given a series of bytecode instructions and a small tuple of environmental data. KLVM is a quasi-Turing-complete machine; the _quasi_ qualification stems from the fact that the computation is intrinsically bounded through a parameter, _gas_, which limits the total amount of computation performed.

KLVM executes Klaytn virtual machine code \(or Klaytn bytecode\) which consists of a sequence of KLVM instructions. The KLVM code is the programming language used for accounts on the Klaytn blockchain that contain code. The KLVM code associated with an account is executed every time a message is sent to that account; this code has the ability to read/write from/to storage and send messages.

## Thông số kỹ thuật của KLVM <a id="klvm-specification"></a>

### Các quy tắc <a id="conventions"></a>

We use the following notations and conventions in this document.

* `A := B`
  * `:=` is used to define `A` as `B`.
* We use the terms "smart contract" and "contract" interchangeably.
* We use the terms "opcode" as the "operation code/operation"

### Ký hiệu <a id="symbols"></a>

The following tables summarize the symbols used in the KLVM specification.

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

KLVM is a simple stack-based architecture. The word size of the machine \(and thus the size of stack items\) is 256-bit. This was chosen to facilitate the Keccak-256 hash scheme and the elliptic-curve computations. The memory model is a simple word-addressed byte array. The stack has a maximum size of 1024. The machine also has an independent storage model; this is similar in concept to the memory but rather than a byte array, it is a word-addressable word array. Unlike memory, which is volatile, storage is nonvolatile and is maintained as part of the system state. All locations in both storage and memory are initially well-defined as zero.

The machine does not follow the standard von Neumann architecture. Rather than storing program code in generally accessible memory or storage, code is stored separately in virtual read-only memory and can be interacted with only through specialized instructions.

The machine can execute exception code for several reasons, including stack underflows and invalid instructions. Similar to an out-of-gas exception, these exceptions do not leave state changes intact. Rather, the virtual machine halts immediately and reports the issue to the execution agent \(either the transaction processor or, recursively, the spawning execution environment\), which will be addressed separately.

### Tổng quan về phí <a id="fees-overview"></a>

Fees \(denominated in gas\) are charged under three distinct circumstances. Sometimes, some policies may be omitted.
* The first and most common is the `constantGas`. It's a fee intrinsic to the computation of the operation.
* Second, gas may be deducted to form the payment for a subordinate message call or contract creation; this forms part of the payment for `CREATE`, `CALL` and `CALLCODE`.
* Finally, gas may be charged due to an increase in memory usage.

Over an account's execution, the total fee payable for memory-usage payable is proportional to the smallest multiple of 32 bytes that are required to include all memory indices \(whether for read or write\) in the range. This fee is paid on a just-in-time basis; consequently, referencing an area of memory at least 32 bytes greater than any previously indexed memory will result in an additional memory usage fee. Due to this fee, it is highly unlikely that addresses will ever exceed the 32-bit bounds. That said, implementations must be able to manage this eventuality.

Storage fees have a slightly nuanced behavior. To incentivize minimization of the use of storage \(which corresponds directly to a larger state database on all nodes\), the execution fee for an operation that clears an entry from storage is not only waived but also elicits a qualified refund; in fact, this refund is effectively paid in advance because the initial usage of a storage location costs substantially more than normal usage.

#### Biểu phí <a id="fee-schedule"></a>
The fee schedule `G` is a tuple of 37 scalar values corresponding to the relative costs, in gas, of a number of abstract operations that a transaction may incur. Also, there's gas items to calculate the gas of the precompiled contracts called by `CALL_*` opcodes. For other tables such as `intrinsic gas cost` or `key validation gas cost`, please refer to [this document](../transaction-fees.md)

##### Scalar values representing `constantGas` of an opcode
| Tên                           | Giá trị |                                                    Name in code | Opcodes                                                                                                                                                                                                                                                                                                                                                                           |
|:----------------------------- | -------:| ---------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `G_base`                      |       2 |                                                    GasQuickStep | `ADDRESS`, `ORIGIN`, `CALLER`, `CALLVALUE`, `CALLDATASIZE`, `CODESIZE`, `GASPRICE`, `COINBASE`, `TIMESTAMP`, `NUMBER`,  `PREVRANDAO(originally it was difficulty)`, `GASLIMIT`, `RETURNDATASIZE`, `POP`, `PC`, `MSIZE`, `GAS`, `CHAINID(added at istanbul hardfork)`, `BASEFEE(added at london Hardfork)`, `PUSH0(added at shanghai Hardfork)` |
| `G_verylow`                   |       3 |                                                  GasFastestStep | `ADD`, `SUB`, `LT`, `GT`, `SLT`, `SGT`, `EQ`, `ISZERO`, `AND`, `OR`, `XOR`, `NOT`, `BYTE`, `CALLDATALOAD`, `MLOAD`, `MSTORE`, `MSTORE8`, `PUSH`, `DUP`, `SWAP`                                                                                                                                                                                                        |
| `G_low`                       |       5 |                                                     GasFastStep | `MUL`, `DIV`, `SDIV`, `MOD`, `SMOD`, `SIGNEXTEND`, `SELFBALANCE(added at istanbul hardfork)`                                                                                                                                                                                                                                                                                |
| `G_mid`                       |       8 |                                                      GasMidStep | `ADDMOD`, `MULMOD`, `JUMP`                                                                                                                                                                                                                                                                                                                                                        |
| `G_high`                      |      10 |                                                     GasSlowStep | `JUMPI`                                                                                                                                                                                                                                                                                                                                                                           |
| `G_selfdestruct`              |    5000 |                                                 SelfdestructGas | `SELFDESTRUCT`                                                                                                                                                                                                                                                                                                                                                                    |
| `G_warmStorageReadCost` |     100 | WarmStorageReadCostEIP2929 (newly added at Kore hardfork) | `EXTCODECOPY`, `EXTCODESIZE`, `EXTCODEHASH`, `BALANCE`, `CALL`, `CALLCODE`, `STATICCALL`, `DELEGATECALL`                                                                                                                                                                                                                                                                    |
| `G_blockhash`                 |      20 |                                                      GasExtStep | `BLOCKHASH`                                                                                                                                                                                                                                                                                                                                                                       |
| `G_jumpdest`                  |       1 |                                                     JumpdestGas | `JUMPDEST`                                                                                                                                                                                                                                                                                                                                                                        |
| `G_sha3`                      |      30 |                                                         Sha3Gas | `SHA3`                                                                                                                                                                                                                                                                                                                                                                            |
| `G_create`                    |   32000 |                                                       CreateGas | `CREATE`, `CREATE2`                                                                                                                                                                                                                                                                                                                                                               |

##### Scalar values used to calculate the gas based on memory and log usage
| Name         | Value | Name in Code | Description                                                                   |
|:------------ | -----:| ------------:|:----------------------------------------------------------------------------- |
| `G_memory`   |     3 |    MemoryGas | Amount of gas paid for every additional word when expanding memory            |
| `G_copy`     |     3 |      CopyGas | Partial payment for `COPY` operations, multiplied by words copied, rounded up |
| `G_log`      |   375 |       LogGas | Partial payment for a `LOG` operation                                         |
| `G_logdata`  |     8 |   LogDataGas | Amount of gas paid for each byte in a `LOG` operation's data                  |
| `G_logtopic` |   375 |  LogTopicGas | Amount of gas paid for each topic of a `LOG` operation                        |

##### Scalar values used to calculate the gas of the particular opcode
| Name              | Value | Name in Code                      | Description                                                                                                                    |
|:----------------- | -----:| --------------------------------- |:------------------------------------------------------------------------------------------------------------------------------ |
| `G_sset`          | 20000 | SstoreSetGas                      | Amount of gas paid when the storage value when set storage                                                                     |
| `G_sreset`        |  5000 | SstoreResetGas                    | Amount of gas paid when the storage value remains unchanged at zero or is set to zero                                          |
| `G_coldSloadCost` |  2100 | ColdSloadCostEIP2929              | Amount of gas paid when the storage value is not in accessList                                                                 |
| `R_sclear`        | 15000 | SstoreClearsScheduleRefundEIP3529 | `G_sreset` - `G_coldSloadCost` + `TxAccessListStorageKeyGas (1900)`                                                            |
| `G_exp`           |    10 | ExpGas                            | Partial payment                                                                                                                |
| `G_expbyte`       |    50 | ExpByte                           | Partial payment when multiplied by `ceil(log_256(exponent))`                                                                   |
| `G_selfdestruct`  |  5000 | SelfdestructGas                   | Amount of gas paid for a `SELFDESTRUCT` operation                                                                              |
| `G_callvalue`     |  9000 | CallValueTransferGas              | Amount of gas paid for a nonzero value transfer                                                                                |
| `G_callstipend`   |  2300 | CallStipend                       | Free gas given at beginning of call for a nonzero value transfer                                                               |
| `G_newaccount`    | 25000 | CallNewAccountGas                 | Amount of gas paid when creating an account. It is also be defined as `CreateBySelfdestructGas` with `SELFDESTRUCT` operation. |
| `G_codedeposit`   |   200 | CreateDataGas                     | Amount of gas paid per byte for a creating a contract that succeeds in placing code into state                                 |
| `G_sha3word`      |     6 | Sha3WordGas                       | Amount of gas paid for each word \(rounded up\) for an `SHA3` input data                                                     |

##### Items to calculate the precompiled contracts gas
Precompiled contracts are special kind of contracts which usually perform complex cryptographic computations and are initiated by other contracts.

For example, gas cost can be calculated simply like below, but some gas cost calculation functions are very complex. So I would not explain the exact gas cost calculation function here.

```text
# ecrecover, sha256hash, ripemd160hash, dataCopy
Gas = XXXBaseGas + (number of words * XXXPerWordGas)

# validateSender
Gas = number of signatures * ValidateSenderGas
```

| Address | Precompiled contracts | Item                                         | Value        |
|:------- |:--------------------- |:-------------------------------------------- |:------------ |
| 0x01    | ecrecover             | EcrecoverGas                                 | 3000         |
| 0x02    | sha256hash            | Sha256BaseGas, Sha256PerWordGas              | 60, 12       |
| 0x03    | ripemd160hash         | Ripemd160BaseGas, Ripemd160PerWordGas        | 600, 120     |
| 0x04    | dataCopy              | IdentityBaseGas, IdentityPerWordGas          | 15, 3        |
| 0x05    | bigModExp             | ModExpQuadCoeffDiv                           | 20 | ​       |
| 0x06    | bn256Add              | Bn256AddGas                                  | 150          |
| 0x07    | bn256ScalarMul        | Bn256ScalarMulGas                            | 6000         |
| 0x08    | bn256Pairing          | Bn256PairingBaseGas, Bn256PairingPerPointGas | 45000, 34000 |
| 0x09    | blake2f               | -                                            | -            |
| 0xFD    | vmLog                 | VMLogBaseGas, VMLogPerByteGas                | 100, 20      |
| 0xFE    | feePayer              | FeePayerGas                                  | 300          |
| 0xFF    | validateSender        | ValidateSenderGas                            | 5000         |

#### Gas calculation during contract execution <a id="gas-calculation-during-contract-execution"></a>
The gas cost of one transaction is calculated through the methods described below. First, gas is added according to the transaction type and input. Then, if the contract is executed, opcodes are executed one by one until the execution ends or `STOP` operation appears. In the process, the cost is charged according to the `constantGas` defined for each opcode and the additionally defined gas calculation method.

Here, I will briefly explain the gas calculation logic during contract execution using the fee schedule variables defined above. As this explanation assumes a general situation, the unusual situations such as revert appears is not considered.

* add `constantGas` defined in each opcode to gas
  * e.g. if an opcode is `MUL`, add `G_low` to gas
  * e.g. if an opcode is `CREATE2`, add `G_create` to gas
* add the gas which is calculated through additionally defined gas calculation method
  * For `LOG'N'`, where N is [0,1,2,3,4], add `G_log + memoryGasCost * g_logdata + N x G_logtopic` to gas
  * For `EXP`, add `G_exp + byteSize(stack.back(1)) x G_expbyte` to gas
  * For `CALLDATACOPY` or `CODECOPY` or `RETURNDATACOPY`, add `wordSize(stack.back(2)) x G_copy` to gas
  * For `EXTCODECOPY`,
    * add `wordSize(stack.back(3)) x G_copy` to gas
    * [**_eip2929_**] If an address is not in AccessList, add it to accessList and add `G_coldSloadCost - G_warmStorageReadCost` to gas
  * For `EXTCODESIZE` or `EXTCODEHASH` or `BALANCE`,
    * [**_eip2929_**] If an address is not in AccessList, add it to accessList and add `G_coldSloadCost - G_warmStorageReadCost` to gas
  * For `SHA3`, add `G_sha3 + wordSize(stack.back(1)) x G_sha3word` to gas
  * For `RETURN`, `REVERT`, `MLoad`, `MStore8`, `MStore`, add `memoryGasCost` to gas
  * For `CREATE`, add `memoryGasCost + size(contract.code) x G_codedeposit` to gas
  * For `CREATE2`, add `memoryGasCost + size(data) x G_sha3word + size(contract.code) x G_codedeposit` to gas
  * For `SSTORE`,
    * [**_eip2929_**]  If a slot(contractAddr, slot) is not in AccessList, add it to accessList and add `G_coldSloadCost` to gas
    * If it just reads the slot (no-op), add `G_warmStorageReadCost` to gas
    * If it creates a new slot, add `G_sset` to gas
    * If it deletes the slot, add `G_sreset-G_coldSloadCost` to gas and add `R_sclear` to refund
    * If it recreates the slot once exists before, add `G_warmStorageReadCost` to gas and subtract `R_sclear` from refund
    * If it deletes the slot once exists before, add `R_sclear` to refund
    * If it resets to the original inexistent slot, add `G_warmStorageReadCost` to gas and add `G_sset - G_warmStorageReadCost` to refund
    * IF it resets to the original existing slot, add `G_warmStorageReadCost` to gas and add `G_sreset - G_coldSloadCost - G_warmStorageReadCost` to refund
  * For `SLOAD`,
    * [**_eip2929_**] If a slot(contractAddr, slot) is not in AccessList, add it to accessList and add `G_coldSloadCost` to gas
    * [**_eip2929_**] If a slot(contractAddr, slot) is in AccessList, add `G_warmStorageReadCost` to gas
  * For `CALL`, `CALLCODE`, `DELEGATECALL`, `STATICCALL`,
    * [**_eip2929_**] If an address is not in AccessList, add it to accessList and add `G_coldSloadCost` to gas
    * if it is `CALL` and `CALLCODE` and if it transfers value, add `G_callvalue` to gas
    * if it is `CALL` and if it transfers value and if it is a new account, add `G_newaccount` to gas
    * if the callee contract is precompiled contracts, calculate precompiled contract gas cost and add it to gas
    * add `memoryGasCost + availableGas - availableGas/64, where availableGas = contract.Gas - gas` to gas
  * For `SELFDESTRUCT`,
    * [**_eip2929_**] If an address is not in AccessList, add it to accessList and add `G_coldSloadCost` to gas
    * if it transfers value and if is a new account, add `G_newaccount` to gas

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

For ease of reading, the instruction mnemonics written in small-caps \(_e.g._, `ADD`\) should be interpreted as their numeric equivalents; the full table of instructions and their specifics is given in the [Instruction Set](klaytn-virtual-machine#instruction-set) section.

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

