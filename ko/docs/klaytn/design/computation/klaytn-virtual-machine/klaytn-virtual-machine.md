# Klaytn 가상머신 <a id="klaytn-virtual-machine"></a>

## 개요 <a id="overview"></a>

Klaytn 가상머신\(KLVM\)의 현재 버전은 이더리움 가상머신\(EVM\)에서 파생되었습니다. 이 장의 내용은 주로 [이더리움 Yellow Paper](https://github.com/ethereum/yellowpaper)를 기반으로 합니다. Klaytn팀은 KLVM을 지속적으로 개선하고 있으므로, 이 문서도 자주 업데이트 될 수 있습니다. 이 문서는 KLVM 사양의 최종 버전이 아닙니다. Klaytn 포지션 페이퍼에서 설명한 것처럼 Klaytn 팀은 Klaytn 플랫폼의 기능과 성능을 향상하기 위해 다른 가상 머신이나 실행 환경도 쓸 수 있도록 할 계획입니다. 이 장에서는 KLVM과 EVM의 차이점 그리고 KLVM 사양에 대해 설명합니다.

KLVM은 공식적으로 Klaytn의 실행 모델을 지칭합니다. 실행 모델은 일련의 바이트 코드 명령어와 작은 튜플 환경 데이터가 제공될 때, 시스템 상태가 어떻게 변경될지 지정합니다. KLVM은 준 튜링 완전 머신(quasi-Turing-complete machine)입니다. '준(quasi)'은 KLVM에서의 연산이 총 연산의 양을 제한할 수 있는 가스라는 매개변수의 제한을 받기 때문에 붙입니다.

KLVM은 일련의 KLVM 명령어(또는 Klaytn bytecode)로 이루어진 Klaytn 가상 머신 코드를 실행합니다. KLVM 코드는 Klaytn 블록체인 상에 코드를 가지고 있는 계정을 위해 사용되는 프로그래밍 언어입니다. 계정과 연결된 KLVM 코드는 메시지가 해당 계정으로 전송될 때마다 실행되며, 이 코드는 스토리지 읽고 쓰기가 가능하고 메세지를 보낼 수 있습니다.

## KLVM 사양 <a id="klvm-specification"></a>

### 표기 규칙 <a id="conventions"></a>

이 문서에서는 다음과 같은 표기법과 규칙을 사용합니다.

* `A := B`
  * ` : = ` ` A를 <code> B로 ` 정의하는 데 사용됩니다.</code>
* "스마트 컨트랙트"와 "컨트랙트"라는 용어를 번갈아 사용합니다.

### 기호 <a id="symbols"></a>

다음 표는 KLVM 사양에 사용된 기호를 요약한 것입니다.

#### 블록체인 관련 기호 <a id="blockchain-related-symbols"></a>

| 기호         | 설명           |
|:---------- |:------------ |
| `BC`       | 블록체인         |
| `B`        | Block        |
| `B_header` | 현재 블록의 블록 헤더 |

#### 상태 관련 기호(State-Related Symbols)<a id="state-related-symbols"></a>

| 기호               | 설명        |
|:---------------- |:--------- |
| `S`              | 상태(State) |
| `S_system`       | 시스템 상태    |
| `S_machine`      | 머신 상태     |
| `P_modify_state` | 상태 수정 권한  |

#### 트랜잭션 관련 기호(Transaction-related symbols)<a id="transaction-related-symbols"></a>

| 기호        | 설명                                                                          |
|:--------- |:--------------------------------------------------------------------------- |
| `T`       | Transaction                                                                 |
| `T_code`  | 실행할 머신 코드를 포함하는 바이트 배열(byte array)                                          |
| `T_data`  | 입력 데이터를 포함하는 바이트 배열. 실행 에이전트(execution agent)가 트랜잭션인 경우, 이것은 트랜잭션 데이터가 됩니다. |
| `T_value` | Pep 단위로 표기된 값이 실행 과정 중에 계정을 전달됩니다. 만약 실행 에이전트가 트랙잭션이라면 이 값은 트랜잭션 값이 됩니다.    |
| `T_depth` | 현재 메시지 호출 또는 컨트랙트 작성 스택의 깊이 \(_즉,_ 현재 `호출` 또는 `실행` 횟수\)                   |

#### 가스 관련 기호(Gas-Related Symbols)<a id="gas-related-symbols"></a>

| 기호        | 설명                   |
|:--------- |:-------------------- |
| `G`       | 가스                   |
| `G_rem`   | 연산에 사용하기 위한 남은 잔여 가스 |
| `G_price` | 실행 시작한 트랜잭션의 가스 가격   |

#### 주소 관련 기호(Adress-Related Symbols)<a id="address-related-symbols"></a>

| 기호                | 설명                                                                       |
|:----------------- |:------------------------------------------------------------------------ |
| `A`               | 주소입니다.                                                                   |
| `A_code_owner`    | 실행 코드를 소유한 계정의 주소                                                        |
| `A_tx_sender`     | 현재 실행을 시작한 트랜잭션의 발신자 주소                                                  |
| `A_code_executor` | 코드를 실행한 계정의 주소. 실행 에이전트가 트랜잭션이라면, 이는 트랜잭션 발신자(transaction sender) 가 됩니다. |

#### 함수 <a id="functions"></a>

|    기호     | 설명                                         |
|:---------:|:------------------------------------------ |
| `F_apply` | 주어진 상태에 입력된 트랜잭션을 적용하고 결과 상태 및 출력을 반환하는 함수 |

### 기본 사항 <a id="basics"></a>

KLVM은 간단한 스택 기반 아키텍처입니다. 머신의 워드 크기(또는 스택 항목의 크기)는 256 비트입니다. 이것은 Keccak-256 해시 체계와 타원 곡선 계산을 쉽게 하기 위해 선택되었습니다. 메모리 모델은 간단한 word-addressed byte array입니다. 스택의 최대 크기는 1024입니다. 머신에는 독립 스토리지 모델도 있습니다. 이것은 개념적으로 메모리와 유사하지만 byte array가 아니라 word-addressable word array입니다. 휘발성인 메모리와 달리 스토리지는 비휘발성이며 시스템 상태의 일부로 유지됩니다. 스토리지와 메모리의 모든 위치는 처음에 0으로 정의되어 있습니다.

머신은 표준 폰 노이만 아키텍처를 따르지 않습니다. 일반적으로 액세스 가능한 메모리나 스토리지에 프로그램 코드를 저장하는 대신 코드는 가상 읽기 전용 메모리(virtual read-only memory)에 별도로 저장되며 특수한 명령을 통해서만 상호 작용할 수 있습니다.

머신은 스택 언더 플로우와 유효하지 않은 명령어를 포함하여 몇 가지 이유로 예외 코드를 실행할 수 있습니다. Out-of-gas exception과 유사하게, 이런 예외는 상태가 변경된 채로 두지 않습니다. 오히려, 가상 머신이 즉시 정지되고 실행 에이전트 \(트랜잭션 프로세서 또는 재귀적으로 실행 환경에\)에 문제를 보고합니다.

### 트랜잭션 수수료 개요 <a id="fees-overview"></a>

세 가지 상황에서 비용(가스로 표시)이 부과되며, 세 가지 모두 연산 실행을 위한 필수 조건입니다. 첫 번째이자 가장 일반적인 비용은 연산 자체에 부과되는 비용입니다. 두 번째로, subordinate 메시지 호출이나 컨트랙트 생성 시 부과될 수 있습니다. 이러한 형태는 `CREATE`, `CALL`과 `CALLCODE`를 위한 비용 지불입니다. 마지막으로, 가스는 메모리 사용이 늘었을 때 부과될 수 있습니다.

계정 실행시 메모리 사용 가능 지불(memory-usage payable)에 대해 지불해야하는 총 비용은 해당 범위의 모든 메모리 인덱스(읽기 또는 쓰기)를 포함하는데 필요한 32 바이트의 최소 배수에 비례합니다. 이 수수료는 실행 시점에 지불됩니다. 따라서 이전에 색인된 메모리보다 최소 32 바이트 더 큰 메모리 영역을 참조하면 추가 메모리 사용 요금이 발생합니다. 이 수수료 때문에, 주소가 32비트 범위를 초과할 가능성은 거의 없습니다. 즉, 구현할 때 이러한 만일의 사태를 관리할 수 있도록 고려하여야 합니다.

스토리지 수수료에는 약간의 차이가 있습니다. 스토리지 사용을 최소화하는 것을 장려하기 위해 (스토리지를 많이 사용한다는 것은 모든 노드에 더 큰 상태 데이터베이스가 있어야 한다는 뜻) 스토리지에서 항목을 지우는 작업으로 실행 수수료를 면제 뿐 아니라 정책에 따라 환불을 받을 수도 있습니다. 저장 위치를  최초 사용하는 것이 일반적인 사용보다 실질적으로 많은 비용이 들기 때문에 이 환불은 사실상 사전에 지불됩니다.

#### 비용표 <a id="fee-schedule"></a>

비용표 `G`는 트랜잭션에서 발생할 수 있는 연산의 가스값 정보를 가지고 있는 37개 스칼라값을 가진 튜플(tuple)입니다. `Precompiled contracts`와 `accounts` 같은 다른 표에 대해서는 이 [문서](../../../transaction-fees.md#klaytns-gas-table)를 참고하세요.

{% hint style="success" %}
참고: 연산 비용은 프로토콜 업그레이드(하드포크)와 함께 변경되었습니다. 이전 문서는 [이전 문서](klaytn-virtual-machine-previous.md)를 참고해주세요.

v1.7.0 프로토콜 업그레이드 - **Istanbul** 하드포크 및 Klaytn의 자체 사항들을 포함하는 비호환 변경이 적용됩니다. Baobab 네트워크의 경우 블록 번호 `#75373312`부터 적용됩니다. Cypress mainnet will be subject to the same protocol upgrade in the next version.

v1.7.3 프로토콜 업그레이드 - **London** 하드 포크의 Base Fee를 포함한 비호환 변경이 적용됩니다. Baobab 네트워크의 경우 블록 번호 `#80295291`부터 적용됩니다. Cypress mainnet will be subject to the same protocol upgrade in the next version.
{% endhint %}

| 이름                |     값 | 설명                                                          |
|:----------------- | -----:|:----------------------------------------------------------- |
| `G_zero`          |     0 | Set `W_zero` 연산을 위해 지불할 금액은 없음                              |
| `G_base`          |     2 | Set `W_base` 연산을 위해 지불하는 가스량                                |
| `G_verylow`       |     3 | Set `W_verylow` 연산을 위해 지불하는 가스량                             |
| `G_low`           |     5 | Set `W_low` 연산을 위해 지불하는 가스량                                 |
| `G_mid`           |     8 | Set `W_mid` 연산을 위해 지불하는 가스량                                 |
| `G_high`          |    10 | Set `W_high` 연산을 위해 지불하는 가스량                                |
| `G_blockhash`     |    20 | `BLOCKHASH` 연산을 위해 지불하는 가스량                                 |
| `G_extcode`       |   700 | Set `W_extcode` 연산을 위해 지불하는 가스량                             |
| `G_balance`       |   700 | `BALANCE` 연산을 위해 지불하는 가스량                                   |
| `G_sload`         |   800 | `SLOAD` 연산을 위해 지불하는 가스량                                     |
| `G_jumpdest`      |     1 | `JUMPDEST` 연산을 위해 지불하는 가스량                                  |
| `G_sset`          | 20000 | Storage value가 0에서 0이 아니도록 변경된 경우 `SSTORE` 연산을 위해 지불하는 가스량  |
| `G_sreset`        |  5000 | Storage value가 0으로 남거나 0으로 바뀐 경우 `SSTORE` 연산을 위해 지불하는 가스량   |
| `R_sclear`        | 15000 | 스토리지 값이 0이 아닌 경우에서 0으로 설정된 경우 반환되는 양(반환 카운터가 추가됨)           |
| `R_selfdestruct`  | 24000 | 계정 self-destructing시 반환되는 가스량(반환 카운터가 추가됨)                  |
| `G_selfdestruct`  |  5000 | `SELFDESTRUCT` 연산을 위해 지불하는 가스량                              |
| `G_create`        | 32000 | `CREATE` 연산을 위해 지불하는 가스량                                    |
| `G_codedeposit`   |   200 | 상태에 코드를 삽입하는 `CREATE` 연산 시 바이트당 지불되는 가스량입니다.                |
| `G_call`          |   700 | `CALL` 연산을 위해 지불하는 가스량                                      |
| `G_callvalue`     |  9000 | 0가 아닌 값을 전송할 때 `CALL` 연산의 일부로 지불되는 가스량                      |
| `G_callstipend`   |  2300 | 0이 아닌 값 전송을 위해 호출된 컨트랙트에 지불하는 비용으로 `G_callvalue`에서 차감된 금액   |
| `G_newaccount`    | 25000 | 계정을 생성하는 `SELFDESTRUCT`나 `CALL` 연산을 위해 지불하는 가스량             |
| `G_exp`           |    10 | `EXP` 연산에 대한 부분 지불                                          |
| `G_expbyte`       |    50 | `ceil(log_256(exponent))`가 곱해졌을 때 `EXP` 연산에 대한 부분 지불        |
| `G_memory`        |     3 | 메모리를 확장하는 모든 추가적인 단어를 위해 지불하는 가스량                           |
| `G_txcreate`      | 32000 | 모든 컨트랙트 생성 트랜잭션을 위해 지불하는 가스량                                |
| `G_txdatazero`    |     4 | 0바이트의 데이터 또는 트랜잭션 코드를 위해 지불하는 가스량                           |
| `G_txdatanonzero` |    68 | 0바이트가 아닌 데이터 또는 트랜잭션 코드를 위해 지불하는 가스량                        |
| `G_transaction`   | 21000 | 모든 트랜잭션에 지불하는 가스량                                           |
| `G_log`           |   375 | `LOG` 연산에 대한 부분 지불하는 가스량                                    |
| `G_logdata`       |     8 | `LOG` 연산의 데이터의 각 바이트마다 지불되는 가스량                             |
| `G_logtopic`      |   375 | `LOG` 연산의 각 topic마다 지불되는 가스량                                |
| `G_sha3`          |    30 | `SHA3` 연산 각각에 대해 지불하는 가스량                                   |
| `G_sha3word`      |     6 | `SHA3` 연산에 대한 입력 데이터의 각 단어(반올림)에 대해 지불하는 가스량                |
| `G_copy`          |     3 | `COPY` 연산에 대한 부분 지불량. 복사된 단어에 곱하고, 반올림 됨.                   |
| `G_extcodehash`   |   700 | 컨트랙트 코드의 `keccak256` 해시를 얻기 위해 지불하는 가스량                     |
| `G_create2`       | 32000 | CREATE와 똑같이 작동하지만 다른 인수를 사용하는 `CREATE2` Opcode를 위해 지불하는 가스량 |

다음과 같이 명령어의 subset을 정의합니다.

* `W_zero` = {`STOP`, `RETURN`, `REVERT`}
* `W_base` = {`ADDRESS`, `ORIGIN`, `CALLER`, `CALLVALUE`, `CALLDATASIZE`, `CODESIZE`, `GASPRICE`, `COINBASE`, `TIMESTAMP`, `NUMBER`, `DIFFICULTY`, `GASLIMIT`, `RETURNDATASIZE`, `POP`, `PC`, `MSIZE`, `GAS`, `CHAINID`, `BASEFEE`}
* `W_verylow` = {`ADD`, `SUB`, `LT`, `GT`, `SLT`, `SGT`, `EQ`, `ISZERO`, `AND`, `OR`, `XOR`, `NOT`, `BYTE`, `CALLDATALOAD`, `MLOAD`, `MSTORE`, `MSTORE8`, `PUSH`, `DUP`, `SWAP`}
* `W_low` = {`MUL`, `DIV`, `SDIV`, `MOD`, `SMOD`, `SIGNEXTEND`, `SELFBALANCE`}
* `W_mid` = {`ADDMOD`, `MULMOD`, `JUMP`}
* `W_high` = {`JUMPI`}
* `W_extcode` = {`EXTCODESIZE`}

#### 가스 비용 <a id="gas-cost"></a>

일반적인 가스 비용 함수, `C`는 다음과 같이 정의됩니다.

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

`C_CALL`, `C_SELFDESTRUCT` 그리고 `C_SSTORE`는 앞으로 설명이 추가될 예정입니다.

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

읽기 쉽도록 작은 대문자로 작성된 명령어 니모닉\(_eg_, `ADD`\)은 동등한 숫자로 해석되어야 합니다. 전체 명령어과 세부 사항은 [명령어 세트(Instruction Set)](klaytn-virtual-machine.md#instruction-set)에 나와 있습니다.

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

