# Klaytn 가상머신 <a id="klaytn-virtual-machine"></a>

{% hint style="success" %}
NOTE: This document contains the KLVM used before the activation of the protocol upgrade. If you want the latest document, please refer to [latest document](klaytn-virtual-machine.md).
{% endhint %}

## Overview <a id="overview"></a>

The current version of the Klaytn Virtual Machine \(KLVM\) is derived from the Ethereum Virtual Machine \(EVM\). The content of this chapter is based primarily on the [Ethereum Yellow Paper](https://github.com/ethereum/yellowpaper). KLVM is continuously being improved by the Klaytn team, thus this document could be updated frequently. Please do not regard this document as the final version of the KLVM specification. As described in the Klaytn position paper, the Klaytn team also plans to adopt other virtual machines or execution environments in order to strengthen the capability and performance of the Klaytn platform. This chapter presents a specification of KLVM and the differences between KLVM and EVM.

KLVM is a virtual state machine that formally specifies Klaytn's execution model. The execution model specifies how the system state is altered given a series of bytecode instructions and a small tuple of environmental data. KLVM is a quasi-Turing-complete machine; the _quasi_ qualification stems from the fact that the computation is intrinsically bounded through a parameter, _gas_, which limits the total amount of computation performed.

KLVM executes Klaytn virtual machine code \(or Klaytn bytecode\) which consists of a sequence of KLVM instructions. The KLVM code is the programming language used for accounts on the Klaytn blockchain that contain code. The KLVM code associated with an account is executed every time a message is sent to that account; this code has the ability to read/write from/to storage and send messages.

## KLVM 사양 <a id="klvm-specification"></a>

### 표기 규칙 <a id="conventions"></a>

We use the following notations and conventions in this document.

* `A := B`
  * ` : = ` ` A를 <code> B로 ` 정의하는 데 사용됩니다.</code>
* "스마트 컨트랙트"와 "컨트랙트"라는 용어를 번갈아 사용합니다.
* We use the terms "opcode" as the "operation code/operation"

### 기호 <a id="symbols"></a>

The following tables summarize the symbols used in the KLVM specification.

#### 블록체인 관련 기호 <a id="blockchain-related-symbols"></a>

| 기호         | Description  |
|:---------- |:------------ |
| `BC`       | 블록체인         |
| `B`        | Block        |
| `B_header` | 현재 블록의 블록 헤더 |

#### 상태 관련 기호(State-Related Symbols)<a id="state-related-symbols"></a>

| Symbol           | Description |
|:---------------- |:----------- |
| `S`              | 상태(State)   |
| `S_system`       | 시스템 상태      |
| `S_machine`      | 머신 상태       |
| `P_modify_state` | 상태 수정 권한    |

#### 트랜잭션 관련 기호(Transaction-related symbols)<a id="transaction-related-symbols"></a>

| Symbol    | Description                                                                 |
|:--------- |:--------------------------------------------------------------------------- |
| `T`       | Transaction                                                                 |
| `T_code`  | 실행할 머신 코드를 포함하는 바이트 배열(byte array)                                          |
| `T_data`  | 입력 데이터를 포함하는 바이트 배열. 실행 에이전트(execution agent)가 트랜잭션인 경우, 이것은 트랜잭션 데이터가 됩니다. |
| `T_value` | Pep 단위로 표기된 값이 실행 과정 중에 계정을 전달됩니다. 만약 실행 에이전트가 트랙잭션이라면 이 값은 트랜잭션 값이 됩니다.    |
| `T_depth` | 현재 메시지 호출 또는 컨트랙트 작성 스택의 깊이 \(_즉,_ 현재 `호출` 또는 `실행` 횟수\)                   |

#### 가스 관련 기호(Gas-Related Symbols)<a id="gas-related-symbols"></a>

| Symbol    | Description          |
|:--------- |:-------------------- |
| `G`       | 가스                   |
| `G_rem`   | 연산에 사용하기 위한 남은 잔여 가스 |
| `G_price` | 실행 시작한 트랜잭션의 가스 가격   |

#### 주소 관련 기호(Adress-Related Symbols)<a id="address-related-symbols"></a>

| Symbol            | Description                                                              |
|:----------------- |:------------------------------------------------------------------------ |
| `A`               | Address                                                                  |
| `A_code_owner`    | 실행 코드를 소유한 계정의 주소                                                        |
| `A_tx_sender`     | 현재 실행을 시작한 트랜잭션의 발신자 주소                                                  |
| `A_code_executor` | 코드를 실행한 계정의 주소. 실행 에이전트가 트랜잭션이라면, 이는 트랜잭션 발신자(transaction sender) 가 됩니다. |

#### 함수 <a id="functions"></a>

|  Symbol   | Description                                |
|:---------:|:------------------------------------------ |
| `F_apply` | 주어진 상태에 입력된 트랜잭션을 적용하고 결과 상태 및 출력을 반환하는 함수 |

### 기본 사항 <a id="basics"></a>

KLVM is a simple stack-based architecture. The word size of the machine \(and thus the size of stack items\) is 256-bit. This was chosen to facilitate the Keccak-256 hash scheme and the elliptic-curve computations. The memory model is a simple word-addressed byte array. The stack has a maximum size of 1024. The machine also has an independent storage model; this is similar in concept to the memory but rather than a byte array, it is a word-addressable word array. Unlike memory, which is volatile, storage is nonvolatile and is maintained as part of the system state. All locations in both storage and memory are initially well-defined as zero.

The machine does not follow the standard von Neumann architecture. Rather than storing program code in generally accessible memory or storage, code is stored separately in virtual read-only memory and can be interacted with only through specialized instructions.

The machine can execute exception code for several reasons, including stack underflows and invalid instructions. Similar to an out-of-gas exception, these exceptions do not leave state changes intact. Rather, the virtual machine halts immediately and reports the issue to the execution agent \(either the transaction processor or, recursively, the spawning execution environment\), which will be addressed separately.

### 트랜잭션 수수료 개요 <a id="fees-overview"></a>

Fees \(denominated in gas\) are charged under three distinct circumstances.
* The first and most common is the `constantGas`. It's a fee intrinsic to the computation of the operation.
* Second, gas may be deducted to form the payment for a subordinate message call or contract creation; this forms part of the payment for `CREATE`, `CALL` and `CALLCODE`.
* Finally, gas may be charged due to an increase in memory usage.

Over an account's execution, the total fee payable for memory-usage payable is proportional to the smallest multiple of 32 bytes that are required to include all memory indices \(whether for read or write\) in the range. This fee is paid on a just-in-time basis; consequently, referencing an area of memory at least 32 bytes greater than any previously indexed memory will result in an additional memory usage fee. Due to this fee, it is highly unlikely that addresses will ever exceed the 32-bit bounds. That said, implementations must be able to manage this eventuality.

Storage fees have a slightly nuanced behavior. To incentivize minimization of the use of storage \(which corresponds directly to a larger state database on all nodes\), the execution fee for an operation that clears an entry from storage is not only waived but also elicits a qualified refund; in fact, this refund is effectively paid in advance because the initial usage of a storage location costs substantially more than normal usage.

#### 비용표 <a id="fee-schedule"></a>
The fee schedule `G` is a tuple of 37 scalar values corresponding to the relative costs, in gas, of a number of abstract operations that a transaction may incur. Also, there's gas items to calculate the gas of the precompiled contracts called by `CALL_*` opcodes. For other tables such as `intrinsic gas cost` or `key validation gas cost`, please refer to [this document](./../../transaction-fees/transaction-fees.md)

##### Scalar values representing `constantGas` of an opcode
| Name            |     값 |   Name in code | Opcodes                                                                                                                                                                                                    |
|:--------------- | -----:| --------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `G_base`        |     2 |   GasQuickStep | `ADDRESS`, `ORIGIN`, `CALLER`, `CALLVALUE`, `CALLDATASIZE`, </br> `CODESIZE`, `GASPRICE`, `COINBASE`, `TIMESTAMP`, `NUMBER`, </br> `DIFFICULTY`, `GASLIMIT`, `RETURNDATASIZE`, `POP`, `PC`, `MSIZE`, `GAS` |
| `G_verylow`     |     3 | GasFastestStep | `ADD`, `SUB`, `LT`, `GT`, `SLT`, `SGT`, `EQ`, `ISZERO`, `AND`, </br> `OR`, `XOR`, `NOT`, `BYTE`, `CALLDATALOAD`, </br> `MLOAD`, `MSTORE`, `MSTORE8`, `PUSH`, `DUP`, `SWAP`                                 |
| `G_low`         |     5 |    GasFastStep | `MUL`, `DIV`, `SDIV`, `MOD`, `SMOD`, `SIGNEXTEND`                                                                                                                                                          |
| `G_mid`         |     8 |     GasMidStep | `ADDMOD`, `MULMOD`, `JUMP`                                                                                                                                                                                 |
| `G_high`        |    10 |    GasSlowStep | `JUMPI`                                                                                                                                                                                                    |
| `G_blockhash`   |    20 |     GasExtStep | `BLOCKHASH`                                                                                                                                                                                                |
| `G_balance`     |   400 |     BalanceGas | `BALANCE`                                                                                                                                                                                                  |
| `G_sload`       |   200 |       SloadGas | `SLOAD`                                                                                                                                                                                                    |
| `G_jumpdest`    |     1 |    JumpdestGas | `JUMPDEST`                                                                                                                                                                                                 |
| `G_sha3`        |    30 |        Sha3Gas | `SHA3`                                                                                                                                                                                                     |
| `G_call`        |   700 |        CallGas | `CALL`, `CALLCODE`, `STATICCALL`, `DELEGATECALL`                                                                                                                                                           |
| `G_create`      | 32000 |      CreateGas | `CREATE`, `CREATE2`                                                                                                                                                                                        |
| `G_extcodesize` |   700 | ExtcodeSizeGas | `EXTCODESIZE`                                                                                                                                                                                              |
| `G_extcodehash` |   400 | ExtcodeHashGas | `EXTCODEHASH`                                                                                                                                                                                              |

##### Scalar values used to calculate the gas based on memory and log usage
| Name         | Value | Name in Code | Description                                                                   |
|:------------ | -----:| ------------:|:----------------------------------------------------------------------------- |
| `G_memory`   |     3 |    MemoryGas | Amount of gas paid for every additional word when expanding memory            |
| `G_copy`     |     3 |      CopyGas | Partial payment for `COPY` operations, multiplied by words copied, rounded up |
| `G_log`      |   375 |       LogGas | Partial payment for a `LOG` operation                                         |
| `G_logdata`  |     8 |   LogDataGas | Amount of gas paid for each byte in a `LOG` operation's data                  |
| `G_logtopic` |   375 |  LogTopicGas | Amount of gas paid for each topic of a `LOG` operation                        |

##### Scalar values used to calculate the gas of the particular opcode
| Name             | Value | Name in Code                   | Description                                                                                                                    |
|:---------------- | -----:| ------------------------------ |:------------------------------------------------------------------------------------------------------------------------------ |
| `G_sset`         | 20000 | SstoreSetGas                   | Amount of gas paid when the storage value when set storage                                                                     |
| `G_sreset`       |  5000 | SstoreResetGas, SstoreClearGas | Amount of gas paid when the storage value remains unchanged at zero or is set to zero                                          |
| `R_sclear`       | 15000 | SstoreRefundGas                | Refund Gas given \(added to the refund counter\) when the storage value is set to zero from nonzero                          |
| `G_exp`          |    10 | ExpGas                         | Partial payment                                                                                                                |
| `G_expbyte`      |    50 | ExpByte                        | Partial payment when multiplied by `ceil(log_256(exponent))`                                                                   |
| `G_selfdestruct` |  5000 | SelfdestructGas                | Amount of gas paid for a `SELFDESTRUCT` operation                                                                              |
| `R_selfdestruct` | 24000 | SelfdestructRefundGas          | Refund Gas given \(added to the refund counter\) for self-destructing an account                                             |
| `G_callvalue`    |  9000 | CallValueTransferGas           | Amount of gas paid for a nonzero value transfer                                                                                |
| `G_callstipend`  |  2300 | CallStipend                    | Free gas given at beginning of call for a nonzero value transfer                                                               |
| `G_newaccount`   | 25000 | CallNewAccountGas              | Amount of gas paid when creating an account. It is also be defined as `CreateBySelfdestructGas` with `SELFDESTRUCT` operation. |
| `G_codedeposit`  |   200 | CreateDataGas                  | Amount of gas paid per byte for a creating a contract that succeeds in placing code into state                                 |
| `G_sha3word`     |     6 | Sha3WordGas                    | Amount of gas paid for each word \(rounded up\) for an `SHA3` input data                                                     |

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
| 0x09    | vmLog                 | VMLogBaseGas, VMLogPerByteGas                | 100, 20      |
| 0x10    | feePayer              | FeePayerGas                                  | 300          |
| 0x11    | validateSender        | ValidateSenderGas                            | 5000         |

#### Gas calculation during contract execution <a id="gas-calculation-during-contract-execution"></a>
The gas cost of one transaction is calculated through the methods described below. First, gas is added according to the transaction type and input. Then, if the contract is executed, opcodes are executed one by one until the execution ends or `STOP` operation appears. In the process, the cost is charged according to the `constantGas` defined for each opcode and the additionally defined gas calculation method.

Below is a brief explanation of the gas calculation logic during contract execution using the fee schedule variables defined above. As it assumes a general situation, unusual situations such as revert appears is not considered.

* add `constantGas` defined in each opcode to gas
  * e.g. if an opcode is `MUL`, add `G_low` to gas
  * e.g. if an opcode is `CREATE2`, add `G_create` to gas
* add the gas which is calculated through additionally defined gas calculation method
  * For `LOG'N'`, where N is [0,1,2,3,4], add `G_log + memoryGasCost * g_logdata + N x G_logtopic` to gas
  * For `EXP`, add `G_exp + byteSize(stack.back(1)) x G_expbyte` to gas
  * For `CALLDATACOPY` or `CODECOPY` or `RETURNDATACOPY`, add `wordSize(stack.back(2)) x G_copy` to gas
  * For `EXTCODECOPY`, add `wordSize(stack.back(3)) x G_copy` to gas
  * For `SHA3`, add `G_sha3 + wordSize(stack.back(1)) x G_sha3word` to gas
  * For `RETURN`, `REVERT`, `MLoad`, `MStore8`, `MStore`, add `memoryGasCost` to gas
  * For `CREATE`, add `memoryGasCost + size(contract.code) x G_codedeposit`
  * For `CREATE2`, add `memoryGasCost + size(data) x G_sha3word + size(contract.code) x G_codedeposit` to gas
  * For `SSTORE`,
    * From a zero-value address to a non-zero value (NEW VALUE), add `G_sset` to gas
    * From a non-zero value address to a zero-value address (DELETE), add `G_sreset` to gas and add `R_sclear` to refund
    * From a non-zero to a non-zero (CHANGE), add `G_sreset` to gas
  * For `CALL`, `CALLCODE`, `DELEGATECALL`, `STATICCALL`,
    * if it is `CALL` and `CALLCODE` and if it transfers value, add `G_callvalue` to gas
    * if it is `CALL` and if it transfers value and if it is a new account, add `G_newaccount` to gas
    * if the callee contract is precompiled contracts, calculate precompiled contract gas cost and add it to gas
    * add `memoryGasCost + availableGas - availableGas/64, where availableGas = contract.Gas - gas` to gas
  * For `SELFDESTRUCT`,
    * if it transfers value and if is a new account, add `G_newaccount` to gas
    * if the contract has not suicided yet, add `R_selfdestruct` to refund

### 실행 환경 <a id="execution-environment"></a>

실행 환경은 시스템 상태 `S_system`, 연산을 위해 남은 가스 `G_rem`, 실행 에이전트가 제공하는 정보 `I`으로 이루어져 있습니다. `I`는 다음과 같이 정의된 튜플입니다.

`I := (B_header, T_code, T_depth, T_value, T_data, A_tx_sender, A_code_executor, A_code_owner, G_price, P_modify_state)`

실행 모델은 `F_apply` 함수를 정의하는데, 이로 결과로 나온 상태 `S_system'`, 잔류 가스 `G_rem '` , 발생한 하위 상태 `A` 및 결과적인 출력 `O_result `를 계산할 수 있습니다. 현재는 다음과 같이 정의합니다.

`(S_system', G_rem', A, O_result) = F_apply(S_system, G_rem, I)`

여기서 우리는 발생된 하위 상태인 `A`는 suicides 집합인 `Set_suicide`, 로그 시리즈 `L`, 접근한 계정의 집합 `Set_touched_accounts `, 그리고 환불 `G_refund`의 튜플로 정의된다는 것을 기억해야 합니다.

`A := (Set_suicide, L, Set_touched_accounts, G_refund)`

### 실행 개요 <a id="execution-overview"></a>

대부분의 실제 구현에서 `F_apply`는 전체 시스템 상태 `S_system`과 머신 상태 `S_machine` 쌍의 반복적인 진행으로 모델링됩니다. 형태적으로, 우리는 상태 머신에서 하나의 사이클의 결과값을 정의하는 이터레이터 함수 `O`와 현재 상태가 예외적으로 중단된 머신 상태인지 확인하는 함수 `Z`, 그리고 현재 상태가 정상적으로 중단된 머신 상태일 경우에만 명령어의 출력 데이터를 지정하는 `H`를 사용하는 함수 `X`를 이용하여 재귀적으로 정의합니다.

빈 시퀀스 `()`는 빈 Set을 가리키는 `Set_empty`와는 다릅니다. 이는 `H`의 결과를 해석할 때 중요한데, 실행을 계속해도 된다면 결과가 `Set_empty`이고 실행이 중지되어야 한다면 결과가 (아마도 비어 있을)시퀀스이기 때문입니다.

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

  * 이는 `F_apply`를 계산할 때

    남은 가스 `S_machine,g'`를

    결과로 남은 머신 상태 `S_machine'`에서 차감한다는 의미입니다.

따라서 `Z`가 true 즉 현재 상태에 예외가 발생했으며 머신이 반드시 중지되어야 하고 따라서 모든 상태 변화는 무시되는 상황이 될 때까지, 또는 `H`가 (Set_empty가 아닌) 시퀀스가 될 때 즉 머신이 통제 가능한 중지 상황에 이를 때까지 `X`는 재귀적으로(보통 실제 구현은 단순한 반복 루프 사용) 반복해서 정의됩니다.

#### 머신 상태 <a id="machine-state"></a>

머신 상태 `S_machine`는 튜플 `(g, pc, memory, i, stack)`로 정의됩니다. 이는 사용 가능한 가스량, 프로그램 카운터 `pc` \(64-bit unsigned integer\), 메모리 컨텐츠(memory contents,), 현재 메모리에 있는 단어 수(position 0부터 계속 카운팅), 스택 컨텐츠(stack contents)를 의미합니다. 메모리 컨텐츠 `S_machine,memory`는 사이즈가 2^256이며 0으로 이루어진 series입니다.

For ease of reading, the instruction mnemonics written in small-caps \(_e.g._, `ADD`\) should be interpreted as their numeric equivalents; the full table of instructions and their specifics is given in the [Instruction Set](klaytn-virtual-machine-previous.md#instruction-set) section.

`Z`, `H`와 `O`를 정의하기 위해, `w`를 실행할 현재 연산으로 정의합니다.

* `w := T_code[S_machine,pc]` if `S_machine,pc < len(T_code)`
* `w :=STOP` otherwise

### 명령어 세트(Instruction Set)<a id="instruction-set"></a>

참고: 이 장은 나중에 업데이트 될 예정입니다.

## KLVM과 EVM의 차이점 <a id="how-klvm-differs-from-evm"></a>

앞에서 언급했듯이 현재 KLVM은 EVM을 기반으로합니다. 따라서 현재 사양은 EVM의 사양과 매우 유사합니다. KLVM과 EVM의 몇 가지 차이점은 다음과 같습니다.

* KLVM은 peb, ston 또는 KLAY와 같은 Klaytn의 가스 단위(unit)를 사용합니다.
* KLVM은 사용자로부터 가스 가격을 입력 받지 않습니다. 대신, 플랫폼이 정의한 값을 가스 가격으로 사용합니다.

Klaytn팀은 KLVM과 EVM간의 호환성을 유지하려고 노력하지만 Klaytn이 점차 구현되고 발전함에 따라 KLVM 사양이 업데이트되며, EVM과 비교하여 더 많은 차이가 생겨날 수 있습니다.

참고: 이 장은 나중에 업데이트 될 예정입니다.
