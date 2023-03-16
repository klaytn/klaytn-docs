# Overview <a id="overview"></a>

클레이튼은 엔터프라이즈급 안정성을 목표로 고도로 최적화된, BFT 알고리즘 기반 퍼블릭 블록체인입니다. 주요 디자인 목표는 다음과 같습니다.

- 즉각적인 완결성
- 실제 사용 사례에서 문제 없는 높은 TPS
- Blockchain 애플리케이션 실행 비용 절감
- 사용자의 진입 장벽을 낮춤
- 산업계의 블록체인 기술 도입 촉진

클레이튼은 2019년 6월 27일에 다음과 같은 사양으로 메인넷 [Cypress](https://scope.klaytn.com/)을 출시했습니다.

- 1초의 블록 생성 및 확인(Confirm) 시간
- 초당 4,000 건의 트랜잭션
- 이더리움 1/10 수준의 낮은 가스비
- EVM(이더리움 가상머신)을 구동하여 솔리디티 컨트랙트 실행을 지원함
- 세계적으로 평판이 높은 19개 기업이 모여 최초의 클레이튼 거버넌스 카운슬을 결성하고 컨센서스 노드 운영을 시작함. 컨센서스에 참여하는 노드 개수 현황은 [Klaytnscope](https://scope.klaytn.com/)에서 볼 수 있습니다.
- 50개 이상의 초기 서비스 파트너가 클레이튼에서 블록체인 애플리케이션을 출시하려고 준비

## 클레이튼: 개관 <a id="klaytn-the-big-picture"></a>

Klaytn은 역할 및 목적에 따라 세 개의 논리적 서브네트워크로 분할할 수 있습니다. 아래 그림은 Klaytn 생태계의 대략적인 구조를 보여줍니다.

![클레이튼 생태계 및 논리적 서브 네트워크 (CCN, ENN, SCN)](images/klaytn_network_overview.png)

### 코어 셀 네트워크(CCN) <a id="core-cell-network-ccn"></a>

CCN은 엔드포인트 노드(EN)를 통해 제출된 트랜잭션을 확인하고 실행하는 코어 셀(CC, Core Cell)로 구성됩니다. CCN은 네트워크 전체에서 블록을 생성하고 전파합니다.

### 엔드포인트 노드 네트워크(ENN) <a id="endpoint-node-network-enn"></a>

ENN은 주로 트랜잭션을 생성하고, RPC API 요청을 처리하며, 서비스체인의 데이터 요청을 처리하는 엔드포인트 노드(EN)로 구성됩니다.

### 서비스체인 네트워크(SCN) <a id="service-chain-network-scn"></a>

SCN은 탈중앙화 애플리케이션(dApp)에 의해 독립적으로 운영되는 보조 블록체인들로 구성된 클레이튼 서브네트워크입니다. 서비스 체인은 EN을 통해 메인 체인에 연결됩니다.

**코어 셀 네트워크**와 **엔드포인트 노드 네트워크**은 클레이튼 메인체인과 메인넷을 구성합니다. 블록체인 애플리케이션은 클레이튼 메인 체인인 Cypress에서 실행하거나 자체적인 블록체인인 **서비스체인**에서 작동할 수 있습니다. 높은 TPS와 설정 변경이 가능한 네트워크 정책을 가진 전용 실행 환경을 원한다면 서비스체인을 사용하는 것을 추천합니다.

> To set up a Service Chain for your application, read the [installation and operation guide of Service Chain](./../installation-guide/deployment/service-chain/getting-started/README.md).

## 클레이튼 네트워크 토폴로지 <a id="klaytn-network-topology"></a>

이 장에서는 클레이튼 메인체인의 네트워크 토폴로지에 대해 설명합니다. 네트워크 성능을 최적화하기 위해 역할 기반 노드 유형에 따라 계층화된 네트워크 아키텍처가 구현되었습니다.

### 역할 기반 노드 유형 <a id="role-based-node-types"></a>

클레이튼 메인체인 네트워크 토폴로지를 살펴보기 전에 다양한 유형의 클레이튼 노드를 알아보겠습니다.

#### 코어 셀(CC): 컨센서스 노드(CN) + 프록시 노드(PN) <a id="core-cell-cc-consensus-node-cn-proxy-node-pn"></a>
A Core Cell (CC) is composed of a single <strong>Consensus Node (CN)<strong> and two <strong>Proxy Nodes (PNs)<strong>. 합의 노드는 블록 생성 프로세서에 참여하고, 프록시 노드는 네트워크에 인터페이스를 제공합니다. PN은 트랜잭션 요청을 합의 노드로 전송하고 블록을 엔드포인트 노드로 전파합니다.

> If you are interested in being a Core Cell Operator, read the [installation and operation guide of Core Cell](./../installation-guide/deployment/core-cell/installation-guide/before-you-install.md).

#### Endpoint Node (EN) <a id="endpoint-node-en"></a>

ENs serve as endpoints for Klaytn network handling RPC API requests and processing data sent to and from service chains.

> To set up an Endpoint Node for your application, read the [installation and operation guide of Endpoint Node](./../installation-guide/deployment/endpoint-node/README.md).

#### Bootnode <a id="bootnode"></a>

Bootnodes are special-type nodes operated by Klaytn to help newly joining nodes register to the network and to discover other nodes to connect with. CN bootnodes reside within the CNN and are not exposed to the public, while PN and EN bootnodes are publicly visible.  PN bootnodes only allow permitted PNs to be registered, and let eligible PNs connect with ENs.  EN bootnodes provide ENs with information on which PNs to connect to.

### Tiered Networks <a id="tiered-networks"></a>

CNs, PNs, and ENs form logical networks, Consensus Node Network (CNN), Proxy Node Network (PNN), and Endpoint Node Network (ENN), respectively.

Below figure shows the overall topology of Klaytn mainnet, where Core Cell Network (CCN) is further broken down into Consensus Node Network (CNN) and Proxy Node Network (PNN). Endpoint Node Network (ENN) is also shown as the surrounding network connected directly to PNN.

![Klaytn Main Chain Physical Topology and Tiered Architecture (CNN, PNN, and ENN)](images/klaytn_network_node.png)


#### Consensus Node Network (CNN) <a id="consensus-node-network-cnn"></a>

CNs form a full-mesh network among themselves called CNN. CNN applies BFT over a WAN (wide area network) and requires each CN to satisfy [stringent hardware and network resource requirements](./../installation-guide/deployment/core-cell/system-requirements.md) to carry out BFT consensus at a sufficient performance level.

#### Proxy Node Network (PNN) <a id="proxy-node-network-pnn"></a>

PNN consists of PNs. Typically, PNs maintain just one connection with a PN in a neighboring Core Cell. The number of peer connections is subject to change depending on the network configuration.

#### Endpoint Node Network (ENN) <a id="endpoint-node-network-enn"></a>

The outermost subnetwork, ENN, is solely composed of ENs connected to each other and also to a number of PNs.


## Block Generation and Propagation <a id="block-generation-and-propagation"></a>

Block generation and propagation design, along with the consensus algorithm used, plays an important role in reducing the latency of a blockchain platform.

### Block Generation Cycle <a id="block-generation-cycle"></a>

A 'round' is a block generation cycle in Klaytn. Each round generates a new block, and is immediately followed by the start of a new round. Klaytn targets each round to be approximately one second, although block generation interval may be influenced by network traffic and node operation conditions.

#### Proposer and Committee Selection <a id="proposer-and-committee-selection"></a>

In each round, Klaytn randomly but deterministically selects a Consensus Node (CN) as the proposer for the block to be created, and then selects a group of CNs as the committee for the given round. Klaytn is not directly involved in the selection of either the proposer or committee; instead, each CN uses a random number derived from the most recent block header to run a cryptographic operation which yields proof that the CN has (or has not) been selected for this round. The committee size should be Byzantine resistant; if the size of the CNN is small, all CNs (except the proposer) are eligible to be selected as committee members.

#### Block Proposal and Validation <a id="block-proposal-and-validation"></a>

Once selected, the proposer broadcasts its proof of selection for the round (i.e., a cryptographic proof verifiable by the public key of the proposer) to all CNs. Thereafter, the CNs selected as committee for the given round responds to the proposer with their own proofs of selection, notifying the proposer to whom to broadcast the new block to be proposed. The proposer then selects a set of transactions from its transaction pool and creates a block by ordering them. Lastly, the proposer executes consensus with the committee to agree upon and finalize the newly created block. Note that Klaytn plans to continuously improve its consensus algorithm to achieve higher security and efficiency.

### Block Propagation <a id="block-propagation"></a>

A proposed block must receive signatures from more than two-thirds of the committee members to be successfully finalized. When the committee reaches consensus, the new block is propagated to all CNs and the consensus round ends. Once the new block is propagated to all CNs, the information of the newly created block can be made available to all Klaytn network participants by delivering block header and body data to ENN through PNN.

## Public Disclosure and Open Validation <a id="public-disclosure-and-open-validation"></a>

Service providers and end-users on Klaytn network can freely validate block generation results and check if the CN committee have generated the block according to proper procedures. Such validation includes checking if the block header contains more than two-thirds of the committee signatures. All CNs must support open validation and are required to post their public keys (used to sign blocks) in a publicly accessible space (e.g., block headers). Open validation promotes transparency, deter censorship, and prevent malicious behaviors.

## Separated Propagation Channels for Blocks and Transactions (Multichannel Propagation) <a id="separated-propagation-channels-for-blocks-and-transactions-multichannel-propagat"></a>

A network's latency is heavily affected by its degree of congestion. Assuming the network's throughput remains constant, increased number of transactions will cause the network's latency to be proportionately delayed. Latency delay is a critical issue in dApps; typical users of legacy mobile apps or web services will not tolerate response time that takes more than a few seconds, and blockchain services have no reason to assume a higher user tolerance.

Klaytn adopts a multichannel approach in order to handle network congestion issues. By assigning separate propagation channels for transactions and blocks, Klaytn network is able to propagate newly created blocks in a timely manner even when the network faces heavy congestion with high number of transactions. In this way, Klaytn ensures that dApps on its network can stay responsive to end-user requests regardless of intermittent network traffic spikes.

## Block Rewards <a id="block-rewards"></a>

For each round, block reward (which is the sum of 6.4 newly minted KLAY and transaction fees paid to process the block) will be distributed to the network participants according to preset distribution ratios. The proposer of the newly created block will receive 100% of the reward to be awarded to CNs, whereas the committee will receive none. Note that the probability of being selected as the proposer is influenced by the amount of KLAY staked by the CN, implying that a CN with more KLAY invested in the platform will probabilistically receive more rewards. Details of block reward distribution can be found in the [Klaytn Token Economy](design/token-economy.md) section.
