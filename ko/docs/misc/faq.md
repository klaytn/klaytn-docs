# FAQ

## Why do we use BFT?

Byzantine fault-tolerance (BFT) consensus algorithm has long been studied to address failures in synchronized distributed computing systems. By design, a system or a network that can prevent Byzantine failure can reach an agreement if at least two-thirds of nodes are not malicious.

Recall that a blockchain is a network of nodes agreeing on the history of blocks; nodes in a blockchain can be faulty or (deliberately) malicious and cause Byzantine failure to delay or falsify blocks. BFT in the blockchain, thus, resolves risks of failed consensus, preventing unreliable nodes from hindering the block generation.

Using BFT is advantageous over PoW-based consensus in cases where the number of nodes is fixed and small; it has better throughput and does not waste energy to solve cryptographic puzzles. Although it is not the most efficient algorithm allowing multiple nodes to agree on one value, it is clear that BFT is one of the practical approaches to ensure the order of transactions among many nodes connected via a synchronous network without sacrificing much performance.

## What if there are many CNs?

Since Klaytn uses a BFT-based consensus algorithm, having many nodes in consensus is disadvantageous. Studies show having more than 16 nodes running PBFT delays consensus significantly, hindering block generation.

However, it is our goal to increase the number of CNs for decentralizing data and trust further, possibly to hundreds of nodes. We address this problem by randomly but verifiably selecting a subset of CNs for each consensus round. A known technique such as verifiable random function (VRF) enables us to choose a random subset of nodes while proving that the selection is indeed correct.

By limiting the number of CNs per consensus round (e.g., between 7 to 16), the platform can perform consensus swiftly while giving fair chances to all participating CNs. As a result, Klaytn keeps the network decentralized while retaining performance improvement promised by the BFT algorithm.

## What are the differences between Klaytn and Ethereum?

Klaytn runs similar to Ethereum except for the consensus algorithm. It even keeps compatibility with Ethereum Byzantium in RPC/API interfaces and executes smart contracts written in Solidity. In a sense, one may refer to Klaytn as a faster version of Ethereum. However, such an effort of making compatibility with Ethereum is meant to help developers who are used to Ethereum join Klaytn with less friction, enabling their soft-landing on a new blockchain platform.

We plan to provide much more than Ethereum; the additions that Klaytn offers to clients include (but not limited) to various execution environments for smart contracts written in traditional programming languages and enterprise-friendly features enabling companies to integrate business intelligence and security systems. The primary goal of Klaytn is to provide a blockchain platform that is usable for enterprises and blockchain-based applications. Ultimately, what makes Klaytn truly different from Ethereum is the way we find and offer essential features of the blockchain for those applications trying to disrupt the traditional market using blockchain technologies.

There are a few clear differences between Klaytn and Ethereum.

1. **Affordable execution cost** One of the reasons that blockchains charge fees on smart contract executions is mostly to prevent various attacks from outside. As a result, Ethereum decided to intentionally increase the financial cost of running smart contracts to prevent any form of attacks. However, it can also dampen ordinary smart contract executions due to high gas prices on opcodes. To encourage people to use smart contract with an affordable fee, Klaytn uses a different opcode-based fee model with low unit cost per opcode and a step-wise pricing policy.
2. **High Performance** A widely used approach to estimate the performance of a public blockchain is measuring the transactions per second (TPS). As of May 2018, the performance of Bitcoin was 7 TPS, while that of its direct competitor, Ethereum, was 25 TPS. It is hard to expect their service to be widely used when you consider the average TPS of VisaNet is approximately 2,000 (designed to handle up to 56,000). Klaytn aims to offer much more efficient and faster blockchain platform by having fewer nodes and deploying the network to relatively closer nodes.
3. **Co-governed by Klaytn contributors** We all know that the ideal governance model for a blockchain platform is the one that allows all the participants of the network to involve and enables a swift decision-making process for the benefit of the platform. But the reality is, ordinary users of a blockchain have neither enough interest to be involved in a decision-making process nor the knowledge to make a right decision. Thus, Klaytn believes that platform contributors should be the entity taking governance since their interests are precisely aligned with that of the platform. In other words, platform contributors will take a serious look before making any decisions and there is a high possibility they would make beneficial decisions for all of us including themselves.

## What is EP?

EP stands for enterprise proxy. And this feature differentiates Klaytn from other blockchain platforms. EP is made to satisfy the business requirements of enterprise blockchain users and service providers while still containing the essential quality of public blockchain.

EP is designed with two main purposes for BApp service providers. First, **blockchain enabler** to ease inevitable tasks related to blockchain technology. Second, **legacy system integrator** by supporting to integrate traditional security systems, such as ACLs (access control layers) and FDSs (fraud detection systems), which are thought to be difficult to have on a blockchain.

Basically, EP will be provided as a framework that could be positioned on the legacy back-end system in front of Klaytn. EP allows users, who rarely have profound blockchain knowledge, to sync blockchain data and to relay transactions to Klaytn easily with single configuration.

EP provides the following features:

* Blockchain Enabler
  * Event handler : if users deploy smart contracts through EP, event subscriber will be generated automatically with abi of them
  * Transaction manager: 서비스 제공자는 트랜잭션 쓰로틀링(throttling), nonce 증가, 계정 인증 등 트랜잭션과 계정 관리 기능을 이용할 수 있습니다.
  * Chain router: BApp에 사용되는 multi-Klaytn clients 구성을 설정합니다.
* Legacy System Integrator
  * Requests transcoder : gRPC, RESTful API 요청을 포함한 다양한 유형의 API 지원
  * Request gateway : 분석을위한 클라이언트 메트릭 수집

By adding EP concept on our platform, we are expecting to offer more practical service and enterprise-friendly platform which can help users to improve UX and increase the quality of services on Klaytn network as well.


## How can we implement the fee-delegation scheme as a service provider?

Fee-delegated transaction types require at least two signatures: one from the sender and the other from the fee payer. The service provider usually takes a role of the fee payer, and the user takes a role of the sender. In this scenario, the user creates a transaction and signs the transaction. Then, the user sends the RLP-encoded transaction to the service provider. Note that the service provider is responsible for the transaction transfer between the user and the service provider. The Klaytn network is not involved in this transfer.

The transaction RLP-encoding scheme is defined in the description of each transaction type. For more details, see [Transactions](../klaytn/design/transactions/README.md). This transaction is not complete since the fee payer's address and signatures are not set properly. If this transaction is submitted into the Klaytn network, this transaction will be rejected because the fee payer's signature is invalid. Although this transaction is incomplete, the sender can track the transaction via [SenderTxHash](../bapp/json-rpc/api-references/klay/transaction.md#klay_gettransactionbysendertxhash).

When the service provider receives the transaction, it attaches the fee payer's address and signatures into the transaction after validation of the transaction. If the fee payer's address and signatures are filled properly, it is ready to be submitted into the Klaytn network. When the Klaytn network receives the transaction, it will charge the transaction fee to the fee payer.

