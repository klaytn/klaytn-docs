# Klaytn Virtual Machine <a id="klaytn-virtual-machine"></a>

## Overview <a id="overview"></a>

The current version of the Klaytn Virtual Machine \(KLVM\) is derived from the Ethereum Virtual Machine \(EVM\). The content of this chapter is based primarily on the [Ethereum Yellow Paper](https://github.com/ethereum/yellowpaper). KLVM is continuously being improved by the Klaytn team, thus this document could be updated frequently. Please do not regard this document as the final version of the KLVM specification. As described in the Klaytn position paper, the Klaytn team also plans to adopt other virtual machines or execution environments in order to strengthen the capability and performance of the Klaytn platform. This chapter presents a specification of KLVM and the differences between KLVM and EVM.

KLVM is a virtual state machine that formally specifies Klaytn's execution model. The execution model specifies how the system state is altered given a series of bytecode instructions and a small tuple of environmental data. KLVM is a quasi-Turing-complete machine; the _quasi_ qualification stems from the fact that the computation is intrinsically bounded through a parameter, _gas_, which limits the total amount of computation performed.

KLVM executes Klaytn virtual machine code \(or Klaytn bytecode\) which consists of a sequence of KLVM instructions. The KLVM code is the programming language used for accounts on the Klaytn blockchain that contain code. The KLVM code associated with an account is executed every time a message is sent to that account; this code has the ability to read/write from/to storage and send messages.

## KLVM Specification <a id="klvm-specification"></a>

### Conventions <a id="conventions"></a>

We use the following notations and conventions in this document.

* `A := B`
  * `:=` is used to define `A` as `B`.
* We use the terms "smart contract" and "contract" interchangeably.

### Symbols <a id="symbols"></a>

The following tables summarize the symbols used in the KLVM specification.

#### Blockchain-Related Symbols <a id="blockchain-related-symbols"></a>

| Symbol     | Description                           |
|:---------- |:------------------------------------- |
| `BC`       | Blockchain                            |
| `B`        | Block                                 |
| `B_header` | The block header of the present block |

#### State-Related Symbols <a id="state-related-symbols"></a>

| Symbol           | Description                                |
|:---------------- |:------------------------------------------ |
| `S`              | State                                      |
| `S_system`       | System state                               |
| `S_machine`      | Machine state                              |
| `P_modify_state` | The permission to make state modifications |

#### Transaction-Related Symbols <a id="transaction-related-symbols"></a>

| Symbol    | Description                                                                                                                                              |
|:--------- |:-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `T`       | Transaction                                                                                                                                              |
| `T_code`  | A byte array containing machine code to be executed                                                                                                      |
| `T_data`  | A byte array containing the input data to the execution; if the execution agent is a transaction, this would be the transaction data.                    |
| `T_value` | A value, in peb, passed to the account as part of the execution procedure; if the execution agent is a transaction, this would be the transaction value. |
| `T_depth` | The depth of the present message-call or contract-creation stack \(_i.e._, the number of `CALL`s or `CREATE`s being executed at present\)              |

#### Gas-Related Symbols <a id="gas-related-symbols"></a>

| Symbol    | Description                                                       |
|:--------- |:----------------------------------------------------------------- |
| `G`       | Gas                                                               |
| `G_rem`   | Remaining gas for computation                                     |
| `G_price` | The price of gas in the transaction that originated the execution |

#### Address-Related Symbols <a id="address-related-symbols"></a>

| Symbol            | Description                                                                                                                              |
|:----------------- |:---------------------------------------------------------------------------------------------------------------------------------------- |
| `A`               | Address                                                                                                                                  |
| `A_code_owner`    | The address of the account that owns the executing code                                                                                  |
| `A_tx_sender`     | The sender address of the transaction that originated the current execution                                                              |
| `A_code_executor` | the address of the account that initiated code execution; if the execution agent is a transaction, this would be the transaction sender. |

#### Functions <a id="functions"></a>

|  Symbol   | Description                                                                                                   |
|:---------:|:------------------------------------------------------------------------------------------------------------- |
| `F_apply` | A function that applies a transaction with input to a given state and returns the resultant state and outputs |

### Basics <a id="basics"></a>

KLVM is a simple stack-based architecture. The word size of the machine \(and thus the size of stack items\) is 256-bit. This was chosen to facilitate the Keccak-256 hash scheme and the elliptic-curve computations. The memory model is a simple word-addressed byte array. The stack has a maximum size of 1024. The machine also has an independent storage model; this is similar in concept to the memory but rather than a byte array, it is a word-addressable word array. Unlike memory, which is volatile, storage is nonvolatile and is maintained as part of the system state. All locations in both storage and memory are initially well-defined as zero.

The machine does not follow the standard von Neumann architecture. Rather than storing program code in generally accessible memory or storage, code is stored separately in virtual read-only memory and can be interacted with only through specialized instructions.

The machine can execute exception code for several reasons, including stack underflows and invalid instructions. Similar to an out-of-gas exception, these exceptions do not leave state changes intact. Rather, the virtual machine halts immediately and reports the issue to the execution agent \(either the transaction processor or, recursively, the spawning execution environment\), which will be addressed separately.

### Fees Overview <a id="fees-overview"></a>

Fees \(denominated in gas\) are charged under three distinct circumstances, all three are prerequisite to operation execution. The first and most common is the fee intrinsic to the computation of the operation. Second, gas may be deducted to form the payment for a subordinate message call or contract creation; this forms part of the payment for `CREATE`, `CALL` and `CALLCODE`. Finally, gas may be charged due to an increase in memory usage.

Over an account's execution, the total fee payable for memory-usage payable is proportional to the smallest multiple of 32 bytes that are required to include all memory indices \(whether for read or write\) in the range. This fee is paid on a just-in-time basis; consequently, referencing an area of memory at least 32 bytes greater than any previously indexed memory will result in an additional memory usage fee. Due to this fee, it is highly unlikely that addresses will ever exceed the 32-bit bounds. That said, implementations must be able to manage this eventuality.

Storage fees have a slightly nuanced behavior. To incentivize minimization of the use of storage \(which corresponds directly to a larger state database on all nodes\), the execution fee for an operation that clears an entry from storage is not only waived but also elicits a qualified refund; in fact, this refund is effectively paid in advance because the initial usage of a storage location costs substantially more than normal usage.

#### Fee Schedule <a id="fee-schedule"></a>

The fee schedule `G` is a tuple of 37 scalar values corresponding to the relative costs, in gas, of a number of abstract operations that a transaction may incur. For other tables such as `Precompiled contracts` and `accounts`, please refer to [this document](../../../transaction-fees.md#klaytns-gas-table)

{% hint style="success" %}
NOTE: Fee has been changed after the protocol upgrade, or the hard fork. If you want the previous document, please refer to [previous document](klaytn-virtual-machine-previous.md).

v1.7.0 Protocol Upgrade - incompatible changes including **Istanbul** hard fork items and Klaytn's own items. It has been enabled from block number `#75373312` in case of Baobab network. Cypress mainnet will be subject to the same protocol upgrade in the next version.

v1.7.3 Protocol Upgrade - incompatible changes including BaseFee **London** Hard-Fork item. It has been enabled from block number `#80295291` in case of Baobab network. Cypress mainnet will be subject to the same protocol upgrade in the next version.
{% endhint %}

| Name              | Value | Description                                                                                                     |
|:----------------- | -----:|:--------------------------------------------------------------------------------------------------------------- |
| `G_zero`          |     0 | Nothing paid for operations of the set `W_zero`                                                                 |
| `G_base`          |     2 | Amount of gas paid for operations of the set `W_base`                                                           |
| `G_verylow`       |     3 | Amount of gas paid for operations of the set `W_verylow`                                                        |
| `G_low`           |     5 | Amount of gas paid for operations of the set `W_low`                                                            |
| `G_mid`           |     8 | Amount of gas paid for operations of the set `W_mid`                                                            |
| `G_high`          |    10 | Amount of gas paid for operations of the set `W_high`                                                           |
| `G_blockhash`     |    20 | Payment for a `BLOCKHASH` operation                                                                             |
| `G_extcode`       |   700 | Amount of gas paid for operations of the set `W_extcode`                                                        |
| `G_balance`       |   700 | Amount of gas paid for a `BALANCE` operation                                                                    |
| `G_sload`         |   800 | Amount of gas paid for an `SLOAD` operation                                                                     |
| `G_jumpdest`      |     1 | Amount of gas paid for a `JUMPDEST` operation                                                                   |
| `G_sset`          | 20000 | Amount of gas paid for an `SSTORE` operation when the storage value is set to nonzero from zero                 |
| `G_sreset`        |  5000 | Amount of gas paid for an `SSTORE` operation when the storage value remains unchanged at zero or is set to zero |
| `R_sclear`        | 15000 | Refund given \(added to the refund counter\) when the storage value is set to zero from nonzero               |
| `R_selfdestruct`  | 24000 | Refund given \(added to the refund counter\) for self-destructing an account                                  |
| `G_selfdestruct`  |  5000 | Amount of gas paid for a `SELFDESTRUCT` operation                                                               |
| `G_create`        | 32000 | Amount of gas paid for a `CREATE` operation                                                                     |
| `G_codedeposit`   |   200 | Amount of gas paid per byte for a `CREATE` operation that succeeds in placing code into state                   |
| `G_call`          |   700 | Amount of gas paid for a `CALL` operation                                                                       |
| `G_callvalue`     |  9000 | Amount of gas paid for a nonzero value transfer as part of a `CALL` operation                                   |
| `G_callstipend`   |  2300 | A stipend for the called contract subtracted from `G_callvalue` for a nonzero value transfer                    |
| `G_newaccount`    | 25000 | Amount of gas paid for a `CALL` or `SELFDESTRUCT` operation that creates an account                             |
| `G_exp`           |    10 | Partial payment for an `EXP` operation                                                                          |
| `G_expbyte`       |    50 | Partial payment when multiplied by `ceil(log_256(exponent))` for an `EXP` operation                             |
| `G_memory`        |     3 | Amount of gas paid for every additional word when expanding memory                                              |
| `G_txcreate`      | 32000 | Amount of gas paid by all contract-creating transactions                                                        |
| `G_txdatazero`    |     4 | Amount of gas paid for every zero byte of data or code for a transaction                                        |
| `G_txdatanonzero` |    68 | Amount of gas paid for every nonzero byte of data or code for a transaction                                     |
| `G_transaction`   | 21000 | Amount of gas paid for every transaction                                                                        |
| `G_log`           |   375 | Partial payment for a `LOG` operation                                                                           |
| `G_logdata`       |     8 | Amount of gas paid for each byte in a `LOG` operation's data                                                    |
| `G_logtopic`      |   375 | Amount of gas paid for each topic of a `LOG` operation                                                          |
| `G_sha3`          |    30 | Amount of gas paid for each `SHA3` operation                                                                    |
| `G_sha3word`      |     6 | Amount of gas paid for each word \(rounded up\) for input data to a `SHA3` operation                          |
| `G_copy`          |     3 | Partial payment for `COPY` operations, multiplied by words copied, rounded up                                   |
| `G_extcodehash`   |   700 | Paid for getting `keccak256` hash of a contract's code                                                          |
| `G_create2`       | 32000 | Paid for opcode `CREATE2` which bahaves identically with CREATE but use different arguments                     |

We define the following subsets of instructions:

* `W_zero` = {`STOP`, `RETURN`, `REVERT`}
* `W_base` = {`ADDRESS`, `ORIGIN`, `CALLER`, `CALLVALUE`, `CALLDATASIZE`, `CODESIZE`, `GASPRICE`, `COINBASE`, `TIMESTAMP`, `NUMBER`, `DIFFICULTY`, `GASLIMIT`, `RETURNDATASIZE`, `POP`, `PC`, `MSIZE`, `GAS`, `CHAINID`, `BASEFEE`}
* `W_verylow` = {`ADD`, `SUB`, `LT`, `GT`, `SLT`, `SGT`, `EQ`, `ISZERO`, `AND`, `OR`, `XOR`, `NOT`, `BYTE`, `CALLDATALOAD`, `MLOAD`, `MSTORE`, `MSTORE8`, `PUSH`, `DUP`, `SWAP`}
* `W_low` = {`MUL`, `DIV`, `SDIV`, `MOD`, `SMOD`, `SIGNEXTEND`, `SELFBALANCE`}
* `W_mid` = {`ADDMOD`, `MULMOD`, `JUMP`}
* `W_high` = {`JUMPI`}
* `W_extcode` = {`EXTCODESIZE`}

#### Gas Cost <a id="gas-cost"></a>

The general gas cost function, `C`, is defined as follows:

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

with `C_CALL`, `C_SELFDESTRUCT` and `C_SSTORE` which will be described in the future.

### Execution Environment <a id="execution-environment"></a>

The execution environment consists of the system state `S_system`, the remaining gas for computation `G_rem`, and the information `I` that the execution agent provides. `I` is a tuple defined as shown below:

`I := (B_header, T_code, T_depth, T_value, T_data, A_tx_sender, A_code_executor, A_code_owner, G_price, P_modify_state)`

The execution model defines the function `F_apply`, which can compute the resultant state `S_system'`, the remaining gas `G_rem'`, the accrued substate `A` and the resultant output `O_result` when given these definitions. For the present context, we will define it as follows:

`(S_system', G_rem', A, O_result) = F_apply(S_system, G_rem, I)`

where we must remember that `A`, the accrued substate, is defined as the tuple of the suicides set `Set_suicide`, the log series `L`, the touched accounts `Set_touched_accounts` and the refunds `G_refund`:

`A := (Set_suicide, L, Set_touched_accounts, G_refund)`

### Execution Overview <a id="execution-overview"></a>

In most practical implementations, `F_apply` will be modeled as an iterative progression of the pair comprising the full system state `S_system` and the machine state `S_machine`. Formally, we define it recursively with a function `X` that uses an iterator function `O` \(which defines the result of a single cycle of the state machine\) together with functions `Z`, which determines if the present state is an exceptional halted machine state, and `H`, which specifies the output data of an instruction if and only if the present state is a normal halted machine state.

The empty sequence, denoted as `()`, is not equal to the empty set, denoted as `Set_empty`; this is important when interpreting the output of `H`, which evaluates to `Set_empty` when execution is to continue but to a series \(potentially empty\) when execution should halt.

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

  * This means that when we evaluate `F_apply`, we

    extract the remaining gas `S_machine,g'` from the

    resultant machine state `S_machine'`.

`X` is thus cycled \(recursively here, but implementations are generally expected to use a simple iterative loop\) until either `Z` becomes true, indicating that the present state is exceptional and that the machine must be halted and any changes are discarded, or until `H` becomes a series \(rather than the empty set\), indicating that the machine has reached a controlled halt.

#### Machine State <a id="machine-state"></a>

The machine state `S_machine` is defined as a tuple `(g, pc, memory, i, stack)`, which represent the available gas, the program counter `pc` \(64-bit unsigned integer\), the memory contents, the active number of words in memory \(counting continuously from position 0\), and the stack contents. The memory contents `S_machine,memory` are a series of zeroes of size 2^256.

For ease of reading, the instruction mnemonics written in small-caps \(_e.g._, `ADD`\) should be interpreted as their numeric equivalents; the full table of instructions and their specifics is given in the [Instruction Set](klaytn-virtual-machine.md#instruction-set) section.

To define `Z`, `H` and `O`, we define `w` as the current operation to be executed:

* `w := T_code[S_machine,pc]` if `S_machine,pc < len(T_code)`
* `w :=STOP` otherwise

### Instruction Set <a id="instruction-set"></a>

NOTE: This section will be filled in the future.

## How KLVM Differs From EVM <a id="how-klvm-differs-from-evm"></a>

As mentioned earlier, the current KLVM is based on EVM; thus, its specification currently is very similar to that of EVM. Some differences between KLVM and EVM are listed below.

* KLVM uses Klaytn's gas units, such as peb, ston, or KLAY.
* KLVM does not accept a gas price from the user; instead, it uses a platform-defined value as the gas price.

The Klaytn team will try to maintain compatibility between KLVM and EVM, but as Klaytn becomes increasingly implemented and evolves, the KLVM specification will be updated, and there will probably be more differences compared to EVM.

NOTE: This section will be updated in the future.

