# Klaytn Virtual Machine

:::note

NOTE: KLVM has changed with the `Kore` hardfork. If you want the previous document, please refer to [previous document](klaytn-virtual-machine-previous.md).

`Kore` hardfork block numbers are as follows.

- Baobab Testnet: `#111736800`
- Cypress Mainnet: `#119750400`

:::

## Overview <a id="overview"></a>

The current version of the Klaytn Virtual Machine (KLVM) is derived from the Ethereum Virtual Machine (EVM). The content of this chapter is based primarily on the [Ethereum Yellow Paper](https://github.com/ethereum/yellowpaper). KLVM is continuously being improved by the Klaytn team, thus this document could be updated frequently. Please do not regard this document as the final version of the KLVM specification. As described in the Klaytn position paper, the Klaytn team also plans to adopt other virtual machines or execution environments in order to strengthen the capability and performance of the Klaytn platform. This chapter presents a specification of KLVM and the differences between KLVM and EVM.

KLVM is a virtual state machine that formally specifies Klaytn's execution model. The execution model specifies how the system state is altered given a series of bytecode instructions and a small tuple of environmental data. KLVM is a quasi-Turing-complete machine; the _quasi_ qualification stems from the fact that the computation is intrinsically bounded through a parameter, _gas_, which limits the total amount of computation performed.

KLVM executes Klaytn virtual machine code (or Klaytn bytecode) which consists of a sequence of KLVM instructions. The KLVM code is the programming language used for accounts on the Klaytn blockchain that contain code. The KLVM code associated with an account is executed every time a message is sent to that account; this code has the ability to read/write from/to storage and send messages.

## KLVM Specification <a id="klvm-specification"></a>

### Conventions <a id="conventions"></a>

We use the following notations and conventions in this document.

- `A := B`
  - `:=` is used to define `A` as `B`.
- We use the terms "smart contract" and "contract" interchangeably.
- We use the terms "opcode" as the "operation code/operation"

### Symbols <a id="symbols"></a>

The following tables summarize the symbols used in the KLVM specification.

#### Blockchain-Related Symbols <a id="blockchain-related-symbols"></a>

| Symbol     | Description                           |
| :--------- | :------------------------------------ |
| `BC`       | Blockchain                            |
| `B`        | Block                                 |
| `B_header` | The block header of the present block |

#### State-Related Symbols <a id="state-related-symbols"></a>

| Symbol           | Description                                |
| :--------------- | :----------------------------------------- |
| `S`              | State                                      |
| `S_system`       | System state                               |
| `S_machine`      | Machine state                              |
| `P_modify_state` | The permission to make state modifications |

#### Transaction-Related Symbols <a id="transaction-related-symbols"></a>

| Symbol    | Description                                                                                                                                                |
| :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `T`       | Transaction                                                                                                                                                |
| `T_code`  | A byte array containing machine code to be executed                                                                                                        |
| `T_data`  | A byte array containing the input data to the execution; if the execution agent is a transaction, this would be the transaction data.                      |
| `T_value` | A value, in peb, passed to the account as part of the execution procedure; if the execution agent is a transaction, this would be the transaction value.   |
| `T_depth` | The depth of the present message-call or contract-creation stack (_i.e._, the number of `CALL`s or `CREATE`s being executed at present) |

#### Gas-Related Symbols <a id="gas-related-symbols"></a>

| Symbol    | Description                                                       |
| :-------- | :---------------------------------------------------------------- |
| `G`       | Gas                                                               |
| `G_rem`   | Remaining gas for computation                                     |
| `G_price` | The price of gas in the transaction that originated the execution |

#### Address-Related Symbols <a id="address-related-symbols"></a>

| Symbol            | Description                                                                                                                              |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `A`               | Address                                                                                                                                  |
| `A_code_owner`    | The address of the account that owns the executing code                                                                                  |
| `A_tx_sender`     | The sender address of the transaction that originated the current execution                                                              |
| `A_code_executor` | the address of the account that initiated code execution; if the execution agent is a transaction, this would be the transaction sender. |

#### Functions <a id="functions"></a>

|   Symbol  | Description                                                                                                   |
| :-------: | :------------------------------------------------------------------------------------------------------------ |
| `F_apply` | A function that applies a transaction with input to a given state and returns the resultant state and outputs |

### Basics <a id="basics"></a>

KLVM is a simple stack-based architecture. The word size of the machine (and thus the size of stack items) is 256-bit. This was chosen to facilitate the Keccak-256 hash scheme and the elliptic-curve computations. The memory model is a simple word-addressed byte array. The stack has a maximum size of 1024. The machine also has an independent storage model; this is similar in concept to the memory but rather than a byte array, it is a word-addressable word array. Unlike memory, which is volatile, storage is nonvolatile and is maintained as part of the system state. All locations in both storage and memory are initially well-defined as zero.

The machine does not follow the standard von Neumann architecture. Rather than storing program code in generally accessible memory or storage, code is stored separately in virtual read-only memory and can be interacted with only through specialized instructions.

The machine can execute exception code for several reasons, including stack underflows and invalid instructions. Similar to an out-of-gas exception, these exceptions do not leave state changes intact. Rather, the virtual machine halts immediately and reports the issue to the execution agent (either the transaction processor or, recursively, the spawning execution environment), which will be addressed separately.

### Fees Overview <a id="fees-overview"></a>

Fees (denominated in gas) are charged under three distinct circumstances. Sometimes, some policies may be omitted.

- The first and most common is the `constantGas`. It's a fee intrinsic to the computation of the operation.
- Second, gas may be deducted to form the payment for a subordinate message call or contract creation; this forms part of the payment for `CREATE`, `CALL` and `CALLCODE`.
- Finally, gas may be charged due to an increase in memory usage.

Over an account's execution, the total fee payable for memory-usage payable is proportional to the smallest multiple of 32 bytes that are required to include all memory indices (whether for read or write) in the range. This fee is paid on a just-in-time basis; consequently, referencing an area of memory at least 32 bytes greater than any previously indexed memory will result in an additional memory usage fee. Due to this fee, it is highly unlikely that addresses will ever exceed the 32-bit bounds. That said, implementations must be able to manage this eventuality.

Storage fees have a slightly nuanced behavior. To incentivize minimization of the use of storage (which corresponds directly to a larger state database on all nodes), the execution fee for an operation that clears an entry from storage is not only waived but also elicits a qualified refund; in fact, this refund is effectively paid in advance because the initial usage of a storage location costs substantially more than normal usage.

#### Fee Schedule <a id="fee-schedule"></a>

The fee schedule `G` is a tuple of 37 scalar values corresponding to the relative costs, in gas, of a number of abstract operations that a transaction may incur. Also, there's gas items to calculate the gas of the precompiled contracts called by `CALL_*` opcodes. For other tables such as `intrinsic gas cost` or `key validation gas cost`, please refer to [this document](../transaction-fees.md)

##### Scalar values representing `constantGas` of an opcode

| Name                    | Value |                                                                  Name in code | Opcodes                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :---------------------- | ----: | ----------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `G_base`                |     2 |                                                                  GasQuickStep | `ADDRESS`, `ORIGIN`, `CALLER`, `CALLVALUE`, `CALLDATASIZE`,  `CODESIZE`, `GASPRICE`, `COINBASE`, `TIMESTAMP`, `NUMBER`,   `PREVRANDAO`(originally it was difficulty), `GASLIMIT`, `RETURNDATASIZE`, `POP`, `PC`, `MSIZE`, `GAS`,  `CHAINID`(added at istanbul hardfork),  `BASEFEE`(added at london Hardfork),  `PUSH0`(added at shanghai Hardfork) |
| `G_verylow`             |     3 |                                                                GasFastestStep | `ADD`, `SUB`, `LT`, `GT`, `SLT`, `SGT`, `EQ`, `ISZERO`, `AND`,  `OR`, `XOR`, `NOT`, `BYTE`, `CALLDATALOAD`,  `MLOAD`, `MSTORE`, `MSTORE8`, `PUSH`, `DUP`, `SWAP`                                                                                                                                                                                                                                                                |
| `G_low`                 |     5 |                                                                   GasFastStep | `MUL`, `DIV`, `SDIV`, `MOD`, `SMOD`, `SIGNEXTEND`,  `SELFBALANCE`(added at istanbul hardfork)                                                                                                                                                                                                                                                                                                                |
| `G_mid`                 |     8 |                                                                    GasMidStep | `ADDMOD`, `MULMOD`, `JUMP`                                                                                                                                                                                                                                                                                                                                                                                                      |
| `G_high`                |    10 |                                                                   GasSlowStep | `JUMPI`                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `G_selfdestruct`        |  5000 |                                                               SelfdestructGas | `SELFDESTRUCT`                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `G_warmStorageReadCost` |   100 | WarmStorageReadCostEIP2929  (newly added at Kore hardfork) | `EXTCODECOPY`, `EXTCODESIZE`, `EXTCODEHASH`, `BALANCE`,  `CALL`, `CALLCODE`, `STATICCALL`, `DELEGATECALL`                                                                                                                                                                                                                                                                                                                       |
| `G_blockhash`           |    20 |                                                                    GasExtStep | `BLOCKHASH`                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `G_jumpdest`            |     1 |                                                                   JumpdestGas | `JUMPDEST`                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `G_sha3`                |    30 |                                                                       Sha3Gas | `SHA3`                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `G_create`              | 32000 |                                                                     CreateGas | `CREATE`, `CREATE2`                                                                                                                                                                                                                                                                                                                                                                                                             |

##### Scalar values used to calculate the gas based on memory and log usage

| Name         | Value | Name in Code | Description                                                                   |
| :----------- | ----: | -----------: | :---------------------------------------------------------------------------- |
| `G_memory`   |     3 |    MemoryGas | Amount of gas paid for every additional word when expanding memory            |
| `G_copy`     |     3 |      CopyGas | Partial payment for `COPY` operations, multiplied by words copied, rounded up |
| `G_log`      |   375 |       LogGas | Partial payment for a `LOG` operation                                         |
| `G_logdata`  |     8 |   LogDataGas | Amount of gas paid for each byte in a `LOG` operation's data                  |
| `G_logtopic` |   375 |  LogTopicGas | Amount of gas paid for each topic of a `LOG` operation                        |

##### Scalar values used to calculate the gas of the particular opcode

| Name              | Value | Name in Code                      | Description                                                                                                                    |
| :---------------- | ----: | --------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
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
| `G_sha3word`      |     6 | Sha3WordGas                       | Amount of gas paid for each word (rounded up) for an `SHA3` input data                                      |

##### Items to calculate the precompiled contracts gas

Precompiled contracts are special kind of contracts which usually perform complex cryptographic computations and are initiated by other contracts.

For example, gas cost can be calculated simply like below, but some gas cost calculation functions are very complex. So I would not explain the exact gas cost calculation function here.

```text
# ecrecover, sha256hash, ripemd160hash, dataCopy
Gas = XXXBaseGas + (number of words * XXXPerWordGas)

# validateSender
Gas = number of signatures * ValidateSenderGas
```

| Address | Precompiled contracts | Item                                         | Value        |   |
| :------ | :-------------------- | :------------------------------------------- | :----------- | - |
| 0x01    | ecrecover             | EcrecoverGas                                 | 3000         |   |
| 0x02    | sha256hash            | Sha256BaseGas, Sha256PerWordGas              | 60, 12       |   |
| 0x03    | ripemd160hash         | Ripemd160BaseGas, Ripemd160PerWordGas        | 600, 120     |   |
| 0x04    | dataCopy              | IdentityBaseGas, IdentityPerWordGas          | 15, 3        |   |
| 0x05    | bigModExp             | ModExpQuadCoeffDiv                           | 20           | ​ |
| 0x06    | bn256Add              | Bn256AddGas                                  | 150          |   |
| 0x07    | bn256ScalarMul        | Bn256ScalarMulGas                            | 6000         |   |
| 0x08    | bn256Pairing          | Bn256PairingBaseGas, Bn256PairingPerPointGas | 45000, 34000 |   |
| 0x09    | blake2f               | -                                            | *            |   |
| 0xFD    | vmLog                 | VMLogBaseGas, VMLogPerByteGas                | 100, 20      |   |
| 0xFE    | feePayer              | FeePayerGas                                  | 300          |   |
| 0xFF    | validateSender        | ValidateSenderGas                            | 5000         |   |

#### Gas calculation during contract execution <a id="gas-calculation-during-contract-execution"></a>

The gas cost of one transaction is calculated through the methods described below. First, gas is added according to the transaction type and input. Then, if the contract is executed, opcodes are executed one by one until the execution ends or `STOP` operation appears. In the process, the cost is charged according to the `constantGas` defined for each opcode and the additionally defined gas calculation method.

Here, I will briefly explain the gas calculation logic during contract execution using the fee schedule variables defined above. As this explanation assumes a general situation, the unusual situations such as revert appears is not considered.

- add `constantGas` defined in each opcode to gas
  - e.g. if an opcode is `MUL`, add `G_low` to gas
  - e.g. if an opcode is `CREATE2`, add `G_create` to gas
- add the gas which is calculated through additionally defined gas calculation method
  - For `LOG'N'`, where N is [0,1,2,3,4], add `G_log + memoryGasCost * g_logdata + N x G_logtopic` to gas
  - For `EXP`, add `G_exp + byteSize(stack.back(1)) x G_expbyte` to gas
  - For `CALLDATACOPY` or `CODECOPY` or `RETURNDATACOPY`, add `wordSize(stack.back(2)) x G_copy` to gas
  - For `EXTCODECOPY`,
    - add `wordSize(stack.back(3)) x G_copy` to gas
    - [**_eip2929_**] If an address is not in AccessList, add it to accessList and add `G_coldSloadCost - G_warmStorageReadCost` to gas
  - For `EXTCODESIZE` or `EXTCODEHASH` or `BALANCE`,
    - [**_eip2929_**] If an address is not in AccessList, add it to accessList and add `G_coldSloadCost - G_warmStorageReadCost` to gas
  - For `SHA3`, add `G_sha3 + wordSize(stack.back(1)) x G_sha3word` to gas
  - For `RETURN`, `REVERT`, `MLoad`, `MStore8`, `MStore`, add `memoryGasCost` to gas
  - For `CREATE`, add `memoryGasCost + size(contract.code) x G_codedeposit` to gas
  - For `CREATE2`, add `memoryGasCost + size(data) x G_sha3word + size(contract.code) x G_codedeposit` to gas
  - For `SSTORE`,
    - [**_eip2929_**]  If a slot(contractAddr, slot) is not in AccessList, add it to accessList and add `G_coldSloadCost` to gas
    - If it just reads the slot (no-op), add `G_warmStorageReadCost` to gas
    - If it creates a new slot, add `G_sset` to gas
    - If it deletes the slot, add `G_sreset-G_coldSloadCost` to gas and add `R_sclear` to refund
    - If it recreates the slot once exists before, add `G_warmStorageReadCost` to gas and subtract `R_sclear` from refund
    - If it deletes the slot once exists before, add `R_sclear` to refund
    - If it resets to the original inexistent slot, add `G_warmStorageReadCost` to gas and add `G_sset - G_warmStorageReadCost` to refund
    - IF it resets to the original existing slot, add `G_warmStorageReadCost` to gas and add `G_sreset - G_coldSloadCost - G_warmStorageReadCost` to refund
  - For `SLOAD`,
    - [**_eip2929_**] If a slot(contractAddr, slot) is not in AccessList, add it to accessList and add `G_coldSloadCost` to gas
    - [**_eip2929_**] If a slot(contractAddr, slot) is in AccessList, add `G_warmStorageReadCost` to gas
  - For `CALL`, `CALLCODE`, `DELEGATECALL`, `STATICCALL`,
    - [**_eip2929_**] If an address is not in AccessList, add it to accessList and add `G_coldSloadCost` to gas
    - if it is `CALL` and `CALLCODE` and if it transfers value, add `G_callvalue` to gas
    - if it is `CALL` and if it transfers value and if it is a new account, add `G_newaccount` to gas
    - if the callee contract is precompiled contracts, calculate precompiled contract gas cost and add it to gas
    - add `memoryGasCost + availableGas - availableGas/64, where availableGas = contract.Gas - gas` to gas
  - For `SELFDESTRUCT`,
    - [**_eip2929_**] If an address is not in AccessList, add it to accessList and add `G_coldSloadCost` to gas
    - if it transfers value and if is a new account, add `G_newaccount` to gas

### Execution Environment <a id="execution-environment"></a>

The execution environment consists of the system state `S_system`, the remaining gas for computation `G_rem`, and the information `I` that the execution agent provides. `I` is a tuple defined as shown below:

`I := (B_header, T_code, T_depth, T_value, T_data, A_tx_sender, A_code_executor, A_code_owner, G_price, P_modify_state)`

The execution model defines the function `F_apply`, which can compute the resultant state `S_system`, the remaining gas `G_rem`, the accrued substate `A` and the resultant output `O_result` when given these definitions. For the present context, we will define it as follows:

`(S_system', G_rem', A, O_result) = F_apply(S_system, G_rem, I)`

where we must remember that `A`, the accrued substate, is defined as the tuple of the suicides set `Set_suicide`, the log series `L`, the touched accounts `Set_touched_accounts` and the refunds `G_refund`:

`A := (Set_suicide, L, Set_touched_accounts, G_refund)`

### Execution Overview <a id="execution-overview"></a>

In most practical implementations, `F_apply` will be modeled as an iterative progression of the pair comprising the full system state `S_system` and the machine state `S_machine`. Formally, we define it recursively with a function `X` that uses an iterator function `O` (which defines the result of a single cycle of the state machine) together with functions `Z`, which determines if the present state is an exceptional halted machine state, and `H`, which specifies the output data of an instruction if and only if the present state is a normal halted machine state.

The empty sequence, denoted as `()`, is not equal to the empty set, denoted as `Set_empty`; this is important when interpreting the output of `H`, which evaluates to `Set_empty` when execution is to continue but to a series (potentially empty) when execution should halt.

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

  - This means that when we evaluate `F_apply`, we

    extract the remaining gas `S_machine,g'` from the

    resultant machine state `S_machine'`.

`X` is thus cycled (recursively here, but implementations are generally expected to use a simple iterative loop) until either `Z` becomes true, indicating that the present state is exceptional and that the machine must be halted and any changes are discarded, or until `H` becomes a series (rather than the empty set), indicating that the machine has reached a controlled halt.

#### Machine State <a id="machine-state"></a>

The machine state `S_machine` is defined as a tuple `(g, pc, memory, i, stack)`, which represent the available gas, the program counter `pc` (64-bit unsigned integer), the memory contents, the active number of words in memory (counting continuously from position 0), and the stack contents. The memory contents `S_machine,memory` are a series of zeroes of size 2^256.

For ease of reading, the instruction mnemonics written in small-caps (_e.g._, `ADD`) should be interpreted as their numeric equivalents; the full table of instructions and their specifics is given in the [Instruction Set](klaytn-virtual-machine#instruction-set) section.

To define `Z`, `H` and `O`, we define `w` as the current operation to be executed:

- `w := T_code[S_machine,pc]` if `S_machine,pc < len(T_code)`
- `w :=STOP` otherwise

### Instruction Set <a id="instruction-set"></a>

NOTE: This section will be filled in the future.

## How KLVM Differs From EVM <a id="how-klvm-differs-from-evm"></a>

As mentioned earlier, the current KLVM is based on EVM; thus, its specification currently is very similar to that of EVM. Some differences between KLVM and EVM are listed below.

- KLVM uses Klaytn's gas units, such as peb, ston, or KLAY.
- KLVM does not accept a gas price from the user; instead, it uses a platform-defined value as the gas price.

The Klaytn team will try to maintain compatibility between KLVM and EVM, but as Klaytn becomes increasingly implemented and evolves, the KLVM specification will be updated, and there will probably be more differences compared to EVM.

NOTE: This section will be updated in the future.
