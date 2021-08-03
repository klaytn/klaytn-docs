# 연산 비용(Computation Cost)<a id="computation-cost"></a>

Since Klaytn aims to maintain 1-second block time, the execution time of transactions have to be managed. Here are three approaches to achieve that:

1. Limiting the gas limit of a transaction 2. Limiting the execution time of a transaction 3. Limiting the computation cost of a transaction

Limiting the gas limit of a transaction was not a feasible solution because the concept of the gas represents the current exchange value of the various resources in the blockchain platform such as computation, storage, network bandwidth, and so on. 따라서, 트랜잭션 실행 시간을 관리하기 위한 방법으로는 적합하지 않습니다.

Limiting the execution time of a transaction was not feasible either because the execution time can vary between nodes on the blockchain platform. For example, consider the case in which we limit the execution time of a transaction to be 100 milli-second. 만약 한 노드에서 트랜잭션 실행 시간이 90ms고, 다른 노드에서 110ms라면 두 노드는 합의에 도달 할 수 없습니다. Hence, this solution is not appropriate.

The last approoach is to limit the computation cost of a transaction. We modelled the computation cost of each EVM opcode based on its actual execution time and limit the sum of computation cost of a transaction. 이 접근 방식을 사용하면 다른 요소들을 제거하고, 정규화된 실행 시간만 계산하여 노드들이 합의에 도달 할 수 있습니다.

Therefore, we chose the third option for Klaytn. 현재는 실행 비용 한도는 100,000,000으로 설정되어 있습니다. Since the limit is determined by the platform, developers should be aware of the computation cost of a transaction. To calculate the computation cost of a transaction, Klaytn provides [klay_estimateComputationCost](../../../bapp/json-rpc/api-references/klay/transaction.md#klay_estimatecomputationcost). 사용법은 [klay_estimateGas](../../../bapp/json-rpc/api-references/klay/transaction.md#klay_estimategas)와 거의 같습니다.

## Opcode의 연산 비용 <a id="computation-cost-of-opcodes"></a>

아래 표는 EVM Opcode의 연산 비용을 보여줍니다. 연산 비용은 시뮬레이션을 통해 결정되었습니다.

| Opcode         | 연산 비용 |
|:-------------- | -----:|
| STOP           |     0 |
| ADD            |   150 |
| MUL            |   200 |
| SUB            |   219 |
| DIV            |   404 |
| SDIV           |   739 |
| MOD            |   812 |
| SMOD           |   560 |
| ADDMOD         |  3349 |
| MULMOD         |  4757 |
| EXP            |  5000 |
| SIGNEXTEND     |   481 |
| LT             |   201 |
| GT             |   264 |
| SLT            |   176 |
| SGT            |   222 |
| EQ             |   220 |
| ISZERO         |   165 |
| AND            |   288 |
| OR             |   160 |
| XOR            |   657 |
| NOT            |  1289 |
| BYTE           |   589 |
| SHL            |  1603 |
| SHR            |  1346 |
| SAR            |  1815 |
| SHA3           |  2465 |
| ADDRESS        |   284 |
| BALANCE        |  1407 |
| ORIGIN         |   210 |
| CALLER         |   188 |
| CALLVALUE      |   149 |
| CALLDATALOAD   |   596 |
| CALLDATASIZE   |   194 |
| CALLDATACOPY   |   100 |
| CODESIZE       |   145 |
| CODECOPY       |   898 |
| GASPRICE       |   131 |
| EXTCODESIZE    |  1481 |
| EXTCODECOPY    |  1000 |
| RETURNDATASIZE |    10 |
| RETURNDATACOPY |    40 |
| EXTCODEHASH    |  1000 |
| BLOCKHASH      |   500 |
| COINBASE       |   189 |
| TIMESTAMP      |   265 |
| NUMBER         |   202 |
| DIFFICULTY     |   180 |
| GASLIMIT       |   166 |
| POP            |   140 |
| MLOAD          |   376 |
| MSTORE         |   288 |
| MSTORE8        |  5142 |
| SLOAD          |   835 |
| SSTORE         |  1548 |
| JUMP           |   253 |
| JUMPI          |   176 |
| PC             |   147 |
| MSIZE          |   137 |
| GAS            |   230 |
| JUMPDEST       |    10 |
| PUSH1          |   120 |
| PUSH2          |   120 |
| PUSH3          |   120 |
| PUSH4          |   120 |
| PUSH5          |   120 |
| PUSH6          |   120 |
| PUSH7          |   120 |
| PUSH8          |   120 |
| PUSH9          |   120 |
| PUSH10         |   120 |
| PUSH11         |   120 |
| PUSH12         |   120 |
| PUSH13         |   120 |
| PUSH14         |   120 |
| PUSH15         |   120 |
| PUSH16         |   120 |
| PUSH17         |   120 |
| PUSH18         |   120 |
| PUSH19         |   120 |
| PUSH20         |   120 |
| PUSH21         |   120 |
| PUSH22         |   120 |
| PUSH23         |   120 |
| PUSH24         |   120 |
| PUSH25         |   120 |
| PUSH26         |   120 |
| PUSH27         |   120 |
| PUSH28         |   120 |
| PUSH29         |   120 |
| PUSH30         |   120 |
| PUSH31         |   120 |
| PUSH32         |   120 |
| DUP1           |   190 |
| DUP2           |   190 |
| DUP3           |   176 |
| DUP4           |   142 |
| DUP5           |   177 |
| DUP6           |   165 |
| DUP7           |   147 |
| DUP8           |   157 |
| DUP9           |   138 |
| DUP10          |   174 |
| DUP11          |   141 |
| DUP12          |   144 |
| DUP13          |   157 |
| DUP14          |   143 |
| DUP15          |   237 |
| DUP16          |   149 |
| SWAP1          |   141 |
| SWAP2          |   156 |
| SWAP3          |   145 |
| SWAP4          |   135 |
| SWAP5          |   115 |
| SWAP6          |   146 |
| SWAP7          |   199 |
| SWAP8          |   130 |
| SWAP9          |   160 |
| SWAP10         |   134 |
| SWAP11         |   147 |
| SWAP12         |   128 |
| SWAP13         |   121 |
| SWAP14         |   114 |
| SWAP15         |   197 |
| SWAP16         |   128 |
| LOG0           |   100 |
| LOG1           |  1000 |
| LOG2           |  1000 |
| LOG3           |  1000 |
| LOG4           |  1000 |
| PUSH           |     0 |
| DUP            |     0 |
| SWAP           |     0 |
| CREATE         |  2094 |
| CALL           |  5000 |
| CALLCODE       |  4000 |
| RETURN         |     0 |
| DELEGATECALL   |   696 |
| CREATE2        | 10000 |
| STATICCALL     | 10000 |
| REVERT         |     0 |
| SELFDESTRUCT   |     0 |

