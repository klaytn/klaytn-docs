# Overview <a id="overview"></a>

Klaytn is a highly optimized, BFT-based public blockchain that aims to meet the enterprise-grade reliability. Key design goals are;

- Immediate finality.
- High TPS that meets real-world use cases.
- Lower the cost of running Blockchain Applications.
- Lower the barriers to entry for end-users.
- Ease the technology adoption process for industry.

Klaytn launched its mainnet, [Cypress](https://scope.klaytn.com/), on Jun/27/2019 with the following specifications.

- 1-second block generation and confirmation time.
- 4,000 transactions per second.
- Low gas price that is almost 1/10 of Ethereum.
- Runs EVM (Ethereum Virtual Machine) and supports the execution of Solidity contracts.
- 19 reputable corporations worldwide initially formed Klaytn Governance Council to operate consensus nodes. The current number of consensus nodes is shown in the [Klaytnscope](https://scope.klaytn.com/).
- More than 50 initial service partners have committed to launch Blockchain Applications on Klaytn.

## Klaytn: Bức tranh toàn cảnh <a id="klaytn-the-big-picture"></a>

Klaytn có thể được phân vùng thành ba mạng con hợp logic dựa trên vai trò và mục đích của chúng. Hình dưới đây hiển thị chế động xem cấp cao của hệ sinh thái Klaytn.

![Hệ sinh thái Klaytn và các mạng con logic (CNN, ENN, SCN)](images/klaytn_network_overview.png)

### Mạng lưới Core Cell (CCN) <a id="core-cell-network-ccn"></a>

CCn có chứa các Core Cell (CC) xác thực và thực thi các giao dịch được gửi qua các Nút điểm cuối (EN). CCN chịu trách nhiệm tạo và truyền các khối xuyên suốt mạng lưới.

### Mạng lưới nút điểm cuối (ENN) <a id="endpoint-node-network-enn"></a>

ENN bao gồm các Nút điểm cuối (EN) chủ yếu tạo giao dịch, xử lý các yêu cầu API RPC và xử lý các yêu cầu dữ liệu từ chuỗi dịch vụ.

### Mạng lưới chuỗi dịch vụ (SCN) <a id="service-chain-network-scn"></a>

SCN là các mạng con của Klaytn có chứa các chuỗi khối phụ trợ được vận hành độc lập bởi dApp (Ứng dụng phi tập trung). Các chuỗi dịch vụ được kết nối với chuỗi chính thông qua các EN.

**Mạng lưới Core Cell** và **Mạng lưới nút điểm cuối** tạo nên chuỗi chính của Klaytn, hay mạng lưới chính thức. Các ứng dụng chuỗi khối có thể chạy trên chuỗi chính của Klaytn, Cypress hoặc có thể vận hành trên các chuỗi khối của riêng chúng, được gọi là **Chuỗi dịch vụ**. Nếu bạn muốn có một môi trường thực thi riêng cho ứng dụng của mình, đảm bảo có TPS cao và các chính sách mạng lưới cấu hình được, chúng tôi khuyến khích bạn dùng Chuỗi dịch vụ.

> Để thiết lập một Chuỗi dịch vụ cho ứng dụng của mình, hãy đọc [hướng dẫn cài đặt và vận hành Chuỗi dịch vụ](./../installation-guide/deployment/service-chain/getting-started/README.md).

## Mô hình cấu trúc mạng Klaytn <a id="klaytn-network-topology"></a>

Trong phần này, chúng tôi sẽ mô tả mô hình cấu trúc chuỗi chính của Klaytn. Một kiến trúc mạng theo tầng với các loại nút dựa trên vai trò, được triển khai trong Klaytn nhằm tối ưu hóa hiệu suất mạng.

### Các loại nút dựa trên vai trò <a id="role-based-node-types"></a>

Trước khi tìm hiểu về mô hình cấu trúc chuỗi chính của Klaytn, chúng ta cần làm quen với các loại nút Klaytn khác nhau.

#### Core Cell (CC): Nút đồng thuận (CN) + Nút Proxy (PN) <a id="core-cell-cc-consensus-node-cn-proxy-node-pn"></a>
Một Core Cell (CC) được tạo thành bởi một <strong>Nút đồng thuận (CN)<strong> duy nhất và hai <strong>Nút proxy (PN)<strong>. Nút đồng thuận tham gia vào quá trình tạo khối, trong khi Nút proxy cung cấp giao diện cho mạng lưới. PN truyền yêu cầu giao dịch tới các Nút đồng thuận, và đưa các khối xuống các Nút điểm cuối.

> Nếu bạn muốn trở thành Người vận hành Core Cell, hãy đọc[hướng dẫn cài đặt và vận hành Core Cell](./../installation-guide/deployment/core-cell/installation-guide/before-you-install.md).

#### Nút điểm cuối (EN) <a id="endpoint-node-en"></a>

EN đóng vai trò là điểm cuối cho mạng Klaytn xử lý các yêu cầu API RPC và xử lý dữ liệu gửi tới và từ các chuỗi dịch vụ.

> Để thiết lập một Nút điểm cuối cho ứng dụng của bạn, hãy đọc [hướng dẫn cài đặt và vận hành Nút điểm cuối](./../installation-guide/deployment/endpoint-node/README.md).

#### Nút ban đầu <a id="bootnode"></a>

Nút ban đầu là một loại nút đặc biệt được Klaytn vận hành để giúp các nút mới tham gia đăng ký vào mạng lưới, và để khám phá các nút khác nhằm kết nối cùng. Nút ban đầu CN nằm trong CNN và không công khai, còn các nút ban đầu PN và EN thì công khai.  Các nút ban đầu PN chỉ cho phép các PN được cấp quyền đăng ký, và cho phép các PN đủ điều kiện kết nối với các EN.  Các nút ban đầu EN cung cấp cho các EN thông tin về các PN cần kết nối.

### Mạng phân tầng <a id="tiered-networks"></a>

CN, PN và EN lần lượt tạo thành các mạng logic, Mạng nút đồng thuận (CNN), Mạng nút proxy (PNN) và Mạng nút điểm cuối (ENN).

Hình bên dưới hiển thị mô hình cấu trúc tổng thể của mạng lưới chính thức của Klaytn, trong đó mạng Core Cell (CCN) được chia nhỏ thành Mạng nút đồng thuận (CNN) và Mạng nút proxy (PNN).

![Klaytn Main Chain Physical Topology and Tiered Architecture (CNN, PNN, and ENN)](images/klaytn_network_node.png)


#### Mạng nút đồng thuận (CNN) <a id="consensus-node-network-cnn"></a>

CN hình thành một mạng mesh đầy đủ gọi là CNN. CNN applies BFT over a WAN (wide area network) and requires each CN to satisfy [stringent hardware and network resource requirements](./../installation-guide/deployment/core-cell/system-requirements.md) to carry out BFT consensus at a sufficient performance level.

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
