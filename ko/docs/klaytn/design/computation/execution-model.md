# 실행 모델(Execution Model)

이 장에서는 Klaytn 스마트 컨트랙트의 실행 모델, 데이터 구조 및 라이프 사이클에 관해 설명합니다.

## 실행 모델

트랜잭션은 플랫폼의 API(참고: [ Platform API Specification](../../../bapp/json-rpc/api-references/README.md))를 통해 생성될 수 있습니다. 이 트랜잭션들은 저장되기 위해 *합의 노드 \(CNs\)*로 보내집니다. CN은 전송된 각 트랜잭션이 유효한지 검사합니다. 유효한 트랜잭션은 트랜잭션 풀에 저장되고, 그렇지 않다면 버려집니다. CN은 현재 블록의 트랜잭션 풀에서 실행 가능한 트랜잭션을 선택하고, 하나씩 실행합니다.

트랜잭션을 실행하려면 발신자가 일정량의 KLAY를 트랜잭션 비용으로 지불해야합니다. This transaction fee in KLAY is calculated based on gas and a multiplier, *i.e.*, unit price. 가스는 연산의 기본적인 단위입니다. Klaytn 노드에서 실행되는 모든 연산은 미리 정의된 양의 가스를 소모합니다. 트랜잭션에 필요한 정확한 KLAY 양은 [트랜잭션 비용](../transaction-fees.md)에 설명된 공식으로 계산됩니다. 트랜잭션이 충분한 가스와 함께 보내지지 않는다면 트랜잭션은 일어나지 않습니다. 또한, 발신인의 잔고가 부족할 때도 트랜잭션이 보내지지 않습니다. 

트랜잭션이 성공적으로 실행되면, 트랜잭션은 현재 블록에 담기게 됩니다. CN은 블록 가스 한도나 블록 시간 한도에 도달할 때까지 트랜잭션을 모읍니다. 그 후, CN은 트랜잭션이 담긴 블록을 생성합니다. 이 단계에서는 블록의 여러 필드를 채워 넣어야합니다. For example, it must calculate the hash values of transactions, receipts, state, etc. 채워야하는 모든 필드가 채워지면 CN은 블록 해시를 생성합니다.

블록 생성이 끝나면 블록은 다른 모든 CN들로 전파됩니다. 다른 모든 CN들은 전파된 블록을 검증하고 BFT 합의 알고리즘을 이용하여 검증 결과에 대한 합의에 도달합니다. 필요 숫자 이상의 CN이 검증 과정을 성공적으로 마치면 블록인 블록체인에 저장됩니다. BFT합의 알고리즘은 즉각적인 완결성(immediate finality)을 특성으로 가지므로, 블록은 완결되고 절대 삭제되지 않습니다. 블록이 완결되고 나면 블록의 모든 트랜잭션은 되돌릴 수 없고, 트랜잭션 결과는 발신자가 요청시 리턴됩니다.

### 트랜잭션 실행에 관한 제한 사항

Klaytn의 Baobab 및 Cypress 네트워크에는 현재 트랜잭션 실행에 관해 다음과 같은 제한이 있습니다.

* 트랜잭션은 가스 가격을 Klaytn의 [단위 가격](../klaytn-native-coin-klay.md/#units-of-klay)으로 설정해야 합니다. *즉*, 25 Gpeb
* 연산 비용 한도보다 실행 비용이 큰 트랜잭션은 버려집니다. [연산 비용](computation-cost.md)을 참고해주세요.

## 데이터 구조 (Data Structures)

### 계정 (Account)

Klaytn의 계정(account)은 개인의 잔액이나 스마트 컨트랙트에 관한 정보를 포함하는 데이터 구조입니다. Klaytn은 계정 모델을 재설계하여 더 나은 DX 및 UX를 제공하도록 만들었습니다. 계정 모델에 대한 자세한 정보는 [여기](../accounts.md)서 찾을 수 있습니다.

### 트랜잭션 (Transaction)

블록체인 플랫폼의 트랜잭션은 블록체인의 상태를 변경하는 노드간 전송되는 메시지입니다. Klaytn은 트랜잭션 모델 또한 재설계했습니다. 트랜잭션은 성능 최적화하고, 새로 설계된 계정 모델을 지원할 수 있도록 트랜잭션의 목적에 따라 여러 종류로 분류되었습니다. 계정 모델에 대한 자세한 정보는 [여기](../transactions/)서 찾을 수 있습니다.

### 상태 (State)

Klaytn의 **상태**는 계정 상태를 모은 것입니다. Klaytn의 노드들이 같은 블록들을 같은 순서대로 처리했다면 상태는 Klaytn 네트워크의 모든 노드에서 동일해야 합니다. 상태는 Klaytn 노드에서 트랜잭션이 실행될 때 변경됩니다.

아래 표는 상태에 저장된 계정 데이터를 보여줍니다.

| 구성요소        | 설명                                                                                                     |
|:----------- |:------------------------------------------------------------------------------------------------------ |
| Nonce       | 계정에서 실행한 트랜잭션의 숫자를 나타내는 정숫값입니다. 계정에서 트랜잭션을 보낼려면 트랜잭션의 nonce가 계정의 nonce보다 하나 커야합니다.                     |
| Balance     | 계정이 현재 가지고 있는 KLAY의 양을 나타내는 정숫값입니다.                                                                    |
| StorageRoot | 계정에 저장된 모든 변수들의 값을 포함하는 Merkle Patricia trie의 루트의 256비트 해시값입니다.                                        |
| CodeHash    | 계정의 바이트코드의 해시값입니다. 이 값은 변경할 수 없으며, 스마트 컨트랙트가 생성 될 때만 설정됩니다. 계정이 EOA 또는 EA인 경우, 이 값은 null의 해시값으로 설정됩니다. |


### 블록 (Block)

블록체인은 문자 그대로 블록을 체인으로 연결한 것이기 때문에 블록은 Klaytn 블록체인의 아주 중요한 요소입니다. 아래 표는 블록의 구성 요소를 보여줍니다.

| 구성요소         | 설명                                                                                                 |
|:------------ |:-------------------------------------------------------------------------------------------------- |
| ParentHash   | 부모 블록의 해시값                                                                                         |
| Rewardbase   | 블록 보상을 받는 계정 주소                                                                                    |
| Root         | 블록체인 상태의 Merkle Patricia Trie 루트의 해시값                                                              |
| TxHash       | 블록에 포함된 트랜잭션들의 해시값                                                                                 |
| ReceiptHash  | The hash of the receipts of transactions included in the block.                                    |
| Bloom        | The Bloom filter value of the receipts.                                                            |
| Number       | 이전 블록 수와 동일한 정숫값                                                                                   |
| GasUsed      | 블록에서 트랜잭션을 처리하는 데 사용된 가스                                                                           |
| Time         | 블록 생성시 Unix 타임스탬프와 동일한 정숫값                                                                         |
| Extra        | RLP encoded string which includes validators list, proposer's seal and committed validators' seals |
| Transactions | 블록에 포함된 트랜잭션들                                                                                      |


## 스마트 컨트랙트 (Smart Contract)

A *smart contract* consists of a collection of code \(functions\) and data \(state\) that resides at a specific address on the Klaytn blockchain. Contract accounts are able to pass messages between each other as well as perform practically Turing complete computation. Contracts exist on the blockchain in Klaytn-specific binary formats. Currently, Klaytn supports one binary format --Ethereum Virtual Machine \(EVM\) bytecode; however, other formats will be supported in the future.

### Creating Smart Contracts

A smart contract can be created in the Klaytn blockchain by sending a transaction to an empty address with the binary as data. The binary can be in various formats; however, Klaytn currently supports one binary format, EVM bytecode. It is worth pointing out that this transaction requires a payment for execution. The account balance on the sender's account will be reduced according to the transaction fee model after the transaction has been stored in a block. After some time, the transaction should appear in a block, which confirms that the state it entails reached a consensus. At this point, the smart contract now exists in the Klaytn blockchain.

### Executing Smart Contracts

A function of a smart contract can be called and executed either by sending a transaction to the smart contract or by calling the function locally in the node. When a function is called by sending a transaction, the function is executed by processing a transaction. This entails a cost in KLAY for sending the transaction, and the call will be recorded forever on the blockchain. The return value of calls made in this manner is the hash of the transaction. When the function is invoked locally, it is executed locally in the Klaytn Virtual Machine \(KLVM\), and the call returns the return value of the function. Calls made in this manner are not recorded on the blockchain; thus, they cannot modify the internal state of the contract. This type of call is referred to as a constant function call. Calls made in this manner do not cost any KLAY. Constant function calls should be used when only the return value is of interest, while a transaction should be used when side effects on the contract state are of interest.

### Disabling Smart Contracts

Because smart contracts exist in the Klaytn blockchain, they cannot be deleted; they can only be disabled. For now, Klaytn has adopted the same process for disabling a Klaytn smart contract as is used for disabling smart contracts in Ethereum. For example, the Klaytn smart contract for KLVM can be disabled by using the [`selfdestruct(address recipient)`](https://solidity.readthedocs.io/en/v0.4.24/introduction-to-smart-contracts.html#self-destruct) call in Solidity \(or the KLVM opcode `SELFDESTRUCT`\). The Klaytn team will also provide ways to disable smart contracts for other execution environments.

### Upgrading Smart Contracts

Klaytn will provide ways to upgrade a deployed smart contract to address the inconvenient user experience with existing blockchains. For example, deployed services on blockchains are difficult to upgrade. Klaytn will provide frameworks and smart contract libraries to enable service providers \(SPs\) to upgrade deployed services and migrate service information. Klaytn will provide this feature carefully by considering the following requirements.

* Only authorized accounts or the owner of a smart contract should be able to upgrade the smart contract.
* Upgraded smart contracts should be able to manipulate existing data maintained by the old smart contract.
* Other smart contracts that refer to the old smart contracts should be able to determine whether to use newer, upgraded versions of those smart contracts.