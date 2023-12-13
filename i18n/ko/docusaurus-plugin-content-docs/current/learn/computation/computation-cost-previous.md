---
unlisted: true
---

# 계산 비용

클레이튼은 1초의 블록 시간을 유지하는 것을 목표로 하기 때문에 트랜잭션의 실행 시간을 관리해야 합니다. 이를 달성하기 위한 세 가지 접근법이 있습니다:


1. 트랜잭션의 가스 한도 제한 
2. 트랜잭션의 실행 시간 제한 
3. 트랜잭션의 계산 비용 제한

트랜잭션의 가스 한도를 제한하는 것은 가스 개념이 연산, 스토리지, 네트워크 대역폭 등 블록체인 플랫폼의 다양한 자원의 현재 교환 가치를 나타내기 때문에 실현 가능한 해결책이 아니었습니다. 트랜잭션 실행 시간을 측정하는 지표로 적합하지 않습니다.

블록체인 플랫폼의 노드마다 실행 시간이 다를 수 있기 때문에 트랜잭션의 실행 시간을 제한하는 것도 불가능합니다. 예를 들어 트랜잭션의 실행 시간을 100밀리초로 제한하는 경우를 생각해 보겠습니다. 한 노드가 트랜잭션을 90초 만에 실행하고 다른 노드가 110초 만에 실행한다면, 두 노드는 합의에 도달할 수 없습니다. 따라서 이 솔루션은 적절하지 않습니다.

마지막 접근 방식은 트랜잭션의 계산 비용을 제한하는 것입니다. 실제 실행 시간을 기준으로 각 EVM 연산 코드의 계산 비용을 모델링하고 트랜잭션의 계산 비용 합계를 제한합니다. 이 접근 방식을 사용하면 다른 요소를 제거하고 정규화된 실행 시간 단위만 계산할 수 있으며, 노드들도 합의에 도달할 수 있습니다.

따라서 저희는 클레이튼에서 세 번째 옵션을 선택했습니다. 현재 실행 비용의 한도는 100,000,000으로 설정되어 있습니다. 한도는 플랫폼에 의해 결정되므로 개발자는 트랜잭션의 계산 비용을 알고 있어야 합니다. 트랜잭션의 계산 비용을 계산하기 위해 Klaytn은 [klay_estimateComputationCost](../../references/json-rpc/klay/transaction.md#klay_estimatecomputationcost) 함수를 제공합니다. 사용법은 [klay_estimateGas](../../references/json-rpc/klay/transaction.md#klay_estimategas)와 거의 동일합니다.

## 연산 코드의 계산 비용 <a id="computation-cost-of-opcodes"></a>

아래 표는 EVM 옵코드의 계산 비용을 보여줍니다. 계산 비용은 실험을 기반으로 결정되었습니다.

:::note

이 문서에는 프로토콜 업그레이드 활성화 이전에 사용된 계산 비용이 포함되어 있습니다.
최신 문서를 원하시면 [최신 문서](computation-cost.md)를 참조하세요.

:::

| 연산 코드 | 계산 비용 |
| :--- | ---: |
| STOP | 0 |
| ADD | 150 |
| MUL | 200 |
| SUB | 219 |
| DIV | 404 |
| SDIV | 739 |
| MOD | 812 |
| SMOD | 560 |
| ADDMOD | 3349 |
| MULMOD | 4757 |
| EXP | 5000 |
| SIGNEXTEND | 481 |
| LT | 201 |
| GT | 264 |
| SLT | 176 |
| SGT | 222 |
| EQ | 220 |
| ISZERO | 165 |
| AND | 288 |
| OR | 160 |
| XOR | 657 |
| NOT | 1289 |
| BYTE | 589 |
| SHL | 1603 |
| SHR | 1346 |
| SAR | 1815 |
| SHA3 | 2465 |
| ADDRESS | 284 |
| BALANCE | 1407 |
| ORIGIN | 210 |
| CALLER | 188 |
| CALLVALUE | 149 |
| CALLDATALOAD | 596 |
| CALLDATASIZE | 194 |
| CALLDATACOPY | 100 |
| CODESIZE | 145 |
| CODECOPY | 898 |
| GASPRICE | 131 |
| EXTCODESIZE | 1481 |
| EXTCODECOPY | 1000 |
| RETURNDATASIZE | 10 |
| RETURNDATACOPY | 40 |
| EXTCODEHASH | 1000 |
| BLOCKHASH | 500 |
| COINBASE | 189 |
| TIMESTAMP | 265 |
| NUMBER | 202 |
| DIFFICULTY | 180 |
| GASLIMIT | 166 |
| POP | 140 |
| MLOAD | 376 |
| MSTORE | 288 |
| MSTORE8 | 5142 |
| SLOAD | 835 |
| SSTORE | 1548 |
| JUMP | 253 |
| JUMPI | 176 |
| PC | 147 |
| MSIZE | 137 |
| GAS | 230 |
| JUMPDEST | 10 |
| PUSH1 | 120 |
| PUSH2 | 120 |
| PUSH3 | 120 |
| PUSH4 | 120 |
| PUSH5 | 120 |
| PUSH6 | 120 |
| PUSH7 | 120 |
| PUSH8 | 120 |
| PUSH9 | 120 |
| PUSH10 | 120 |
| PUSH11 | 120 |
| PUSH12 | 120 |
| PUSH13 | 120 |
| PUSH14 | 120 |
| PUSH15 | 120 |
| PUSH16 | 120 |
| PUSH17 | 120 |
| PUSH18 | 120 |
| PUSH19 | 120 |
| PUSH20 | 120 |
| PUSH21 | 120 |
| PUSH22 | 120 |
| PUSH23 | 120 |
| PUSH24 | 120 |
| PUSH25 | 120 |
| PUSH26 | 120 |
| PUSH27 | 120 |
| PUSH28 | 120 |
| PUSH29 | 120 |
| PUSH30 | 120 |
| PUSH31 | 120 |
| PUSH32 | 120 |
| DUP1 | 190 |
| DUP2 | 190 |
| DUP3 | 176 |
| DUP4 | 142 |
| DUP5 | 177 |
| DUP6 | 165 |
| DUP7 | 147 |
| DUP8 | 157 |
| DUP9 | 138 |
| DUP10 | 174 |
| DUP11 | 141 |
| DUP12 | 144 |
| DUP13 | 157 |
| DUP14 | 143 |
| DUP15 | 237 |
| DUP16 | 149 |
| SWAP1 | 141 |
| SWAP2 | 156 |
| SWAP3 | 145 |
| SWAP4 | 135 |
| SWAP5 | 115 |
| SWAP6 | 146 |
| SWAP7 | 199 |
| SWAP8 | 130 |
| SWAP9 | 160 |
| SWAP10 | 134 |
| SWAP11 | 147 |
| SWAP12 | 128 |
| SWAP13 | 121 |
| SWAP14 | 114 |
| SWAP15 | 197 |
| SWAP16 | 128 |
| LOG0 | 100 |
| LOG1 | 1000 |
| LOG2 | 1000 |
| LOG3 | 1000 |
| LOG4 | 1000 |
| PUSH | 0 |
| DUP | 0 |
| SWAP | 0 |
| CREATE | 2094 |
| CALL | 5000 |
| CALLCODE | 4000 |
| RETURN | 0 |
| DELEGATECALL | 696 |
| CREATE2 | 10000 |
| STATICCALL | 10000 |
| REVERT | 0 |
| SELFDESTRUCT | 0 |
