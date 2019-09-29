# 개요

Klaytn은 엔터프라이즈급 안정성을 충족하는 것을 목표로 하는 최적화된 BFT 기반 퍼블릭 블록체인입니다. 주요 디자인 목표는 다음과 같습니다.

- 즉각적인 완결성
- 실제 사용 사례에서 문제 없는 높은 TPS
- Blockchain 어플리케이션 실행 비용 절감
- 사용자의 진입 장벽을 낮춤
- 산업계에 블록체인 기술 도입 촉진

Klaytn은 2019년 6월 27일에 다음과 같은 사양을 가지는 메인넷 [Cypress](https://scope.klaytn.com/)을 출시했습니다.

- 1초의 블록 생성 및 확인(Confirm) 시간
- 초당 4,000 건의 트랜잭션
- 이더리움의 1/10 수준의 낮은 가스비
- EVM(Ethereum 가상머신)을 실행하고, 솔리디티 컨트랙트 실행을 지원함 
- 처음에는 전세계 평판이 좋은 19개 기업이 Klaytn Governance Council을 결성하여 컨센서스 노드를 운영함. 현재 합의 노드 수는 [Klaytnscope](https://scope.klaytn.com/)에서 볼 수 있습니다.
- 50개 이상의 초기 서비스 파트너가 Klaytn에서 Blockchain 어플리케이션 출시 계획이 있음

## Klaytn: 개관

Klaytn은 역할 및 목적에 따라 세 개의 논리적 서브네트워크로 분할할 수 있습니다. 아래 그림은 Klaytn 생태계의 대략적인 구조를 보여줍니다.

![Klaytn Ecosystem and its Logical Subnetworks (CCN, ENN, SCN)](images/klaytn_network_overview.png)

### 코어 셀 네트워크(CCN)

CCN은 엔드포인트 노드(EN)를 통해 제출된 트랜잭션을 확인하고 실행하는 CC (Core Cell) 로 구성됩니다. CCN은 네트워크 전체에서 블록을 생성하고 전파합니다.

### 엔드포인트 노드 네트워크 (ENN)

ENN은 주로 트랜잭션을 생성하고, RPC API 요청을 처리하며, 서비스체인의 데이터 요청을 처리하는 Endpoint Node(EN)로 구성됩니다.

### 서비스체인 네트워크 (SCN)

SCN은 블록체인 어플리케이션(BApp)에 의해 독립적으로 운영되는 보조 블록체인들로 구성된 Klaytn 서브네트워크입니다. 서비스 체인은 EN을 통해 메인 체인에 연결됩니다.

**코어 셀 네트워크**와 **엔드포인트 노드 네트워크**은 Klaytn 메인체인과 메인넷을 구성합니다. 블록체인 어플리케이션은 Klaytn 메인 체인인 Cypress에서 실행하거나 자체적인 블록체인인 **서비스 체인**에서 작동할 수 있습니다. 높은 TPS와 설정 변경이 가능한 네트워크 정책을 가진 전용 실행 환경을 원한다면 서비스체인을 사용하는 것을 추천합니다.

> 어플리케이션을 위한 서비스체인을 구축하려면, [서비스체인의 설치 및 운영 가이드](../node/service-chain/README.md)를 읽어주세요.

## Klaytn 네트워크 토폴로지

이 장에서는 Klaytn 메인체인의 네트워크 토폴로지에 대해 설명합니다. 네트워크 성능을 최적화하기 위해 역할 기반 노드 유형에 따라 계층화된 네트워크 아키텍처가 구현되었습니다.

### 역할 기반 노드 유형

Klaytn 메인체인 네트워크 토폴로지를 살펴보기 전에 다양한 유형의 Klaytn 노드를 알아보겠습니다.

#### 코어 셀 (CC): 합의 노드 (CN) + 프록시 노드(PN)

코어 셀(CC)은 하나의 **합의 노드(CN)**과 두 개의 **프록시 노드(PNs)**로 이루어집니다. 합의 노드는 블록 생성 프로세서에 참여하고, 프록시 노드는 네트워크에 인터페이스를 제공합니다. PN은 트랜잭션 요청을 합의 노드로 전송하고 블록을 엔드포인트 노드로 전파합니다.

> 만약 코어 셀 오퍼레이터가 되는 것에 관심이 있으시면 [코어 셀 설치 및 운영 가이드](../node/core-cell/README.md)를 참고해주세요.

#### 엔드포인트 노드(EN)

EN은 Klaytn 네트워크상에서 RPC API 요청을 처리하고, 서비스 체인으로 송수신되는 데이터를 처리하는 엔드포인트 역할을 합니다.

> 어플리케이션을 위한 엔드포인트 노드를 구축하려면, [엔드포인트 노드의 설치 및 운영 가이드](../node/endpoint-node/README.md)를 읽어주세요.

#### 부트노드(Bootnode)

부트노드는 Klaytn에서 운영하는 특수 유형의 노드입니다. 새로 참여하는 노드가 네트워크에 등록하고 연결할 다른 노드를 검색하는 것을 돕습니다. CN 부트노드는 CNN 내에 있으며 대중에게 노출되지 않고, PN 및 EN 부트노드는 공개적으로 표시됩니다. PN 부트노드는 허용된 PN만 등록할 수 있도록 허용하며, 적합한 PN을 EN과 연결할 수 있도록 합니다. EN 부트노드는 연결할 PN에 대한 정보를 EN에게 제공합니다.

### 계층화된 네트워크(Tiered Networks)

CN, PN 및 EN은 각각 논리적 네트워크, 합의 노드 네트워크(CNN), 프록시 노드 네트워크(PNN) 및 엔드포인트 노드 네트워크(ENN)을 구성합니다.

아래 그림은 Klaytn 메인넷의 전반적인 토폴로지를 보여줍니다. 여기서 CCN(Core Cell Network)은 CNN(Consensus Node Network)과 PNN(Proxy Node Network)으로 더욱 세분됩니다. Endpoint Node Network (ENN) is also shown as the surrounding network connected directly to PNN.

![Klaytn Main Chain Physical Topology and Tiered Architecture (CNN, PNN, and ENN)](images/klaytn_network_node.png)

#### Consensus Node Network (CNN)

CNs form a full-mesh network among themselves called CNN. CNN applies BFT over a WAN (wide area network) and requires each CN to satisfy [stringent hardware and network resource requirements](../node/core-cell/system-requirements.md) to carry out BFT consensus at a sufficient performance level.

#### Proxy Node Network (PNN)

PNN consists of PNs. Typically, PNs maintain just one connection with a PN in a neighboring Core Cell. The number of peer connections is subject to change depending on the network configuration.

#### 엔드포인트 노드 네트워크 (ENN)

The outermost subnetwork, ENN, is solely composed of ENs connected to each other and also to a number of PNs.

## Block Generation and Propagation

Block generation and propagation design, along with the consensus algorithm used, plays an important role in reducing the latency of a blockchain platform.

### Block Generation Cycle

A 'round' is a block generation cycle in Klaytn. Each round generates a new block, and is immediately followed by the start of a new round. Klaytn targets each round to be approximately one second, although block generation interval may be influenced by network traffic and node operation conditions.

#### Proposer and Committee Selection

In each round, Klaytn randomly but deterministically selects a Consensus Node (CN) as the proposer for the block to be created, and then selects a group of CNs as the committee for the given round. Klaytn is not directly involved in the selection of either the proposer or committee; instead, each CN uses a random number derived from the most recent block header to run a cryptographic operation which yields proof that the CN has (or has not) been selected for this round. The committee size should be Byzantine resistant; if the size of the CNN is small, all CNs (except the proposer) are eligible to be selected as committee members.

#### Block Proposal and Validation

Once selected, the proposer broadcasts its proof of selection for the round (i.e., a cryptographic proof verifiable by the public key of the proposer) to all CNs. Thereafter, the CNs selected as committee for the given round responds to the proposer with their own proofs of selection, notifying the proposer to whom to broadcast the new block to be proposed. The proposer then selects a set of transactions from its transaction pool and creates a block by ordering them. Lastly, the proposer executes consensus with the committee to agree upon and finalize the newly created block. Note that Klaytn plans to continuously improve its consensus algorithm to achieve higher security and efficiency.

### Block Propagation

A proposed block must receive signatures from more than two-thirds of the committee members to be successfully finalized. When the committee reaches consensus, the new block is propagated to all CNs and the consensus round ends. Once the new block is propagated to all CNs, the information of the newly created block can be made available to all Klaytn network participants by delivering block header and body data to ENN through PNN.

## Public Disclosure and Open Validation

Service providers and end-users on Klaytn network can freely validate block generation results and check if the CN committee have generated the block according to proper procedures. Such validation includes checking if the block header contains more than two-thirds of the committee signatures. All CNs must support open validation and are required to post their public keys (used to sign blocks) in a publicly accessible space (e.g., block headers). Open validation promotes transparency, deter censorship, and prevent malicious behaviors.

## Separated Propagation Channels for Blocks and Transactions (Multichannel Propagation)

A network's latency is heavily affected by its degree of congestion. Assuming the network's throughput remains constant, increased number of transactions will cause the network's latency to be proportionately delayed. Latency delay is a critical issue in BApps; typical users of legacy mobile apps or web services will not tolerate response time that takes more than a few seconds, and blockchain services have no reason to assume a higher user tolerance.

Klaytn adopts a multichannel approach in order to handle network congestion issues. By assigning separate propagation channels for transactions and blocks, Klaytn network is able to propagate newly created blocks in a timely manner even when the network faces heavy congestion with high number of transactions. In this way, Klaytn ensures that BApps on its network can stay responsive to end-user requests regardless of intermittent network traffic spikes.

## 블록 보상 (Block Rewards)

각 라운드 마다 블록 보상 (새로 발행된 Klay 9.6개와 트랜잭션 비용의 합계)은 사전 설정된 분배 비율에 따라 네트워크 참가자에게 분배됩니다. The proposer of the newly created block will receive 100% of the reward to be awarded to CNs, whereas the committee will receive none. Note that the probability of being selected as the proposer is influenced by the amount of KLAY staked by the CN, implying that a CN with more KLAY invested in the platform will probabilistically receive more rewards. Details of block reward distribution can be found in the [Klaytn Token Economy](design/token-economy.md) section.