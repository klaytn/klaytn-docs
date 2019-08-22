# Glossary

| Term | Description |
| :--- | :--- |
| BApp | Blockchain application |
| Block reward | Newly issued KLAY and the sum of transaction fees used in the block |
| Bootnode | Bootnodes that helps PNs and ENs to register themselves in the network and to discover other nodes to connect to. [CC Operation Guide] |
| caver-js | caver-js is a JavaScript API library that allows developers to interact with a Klaytn node. [caver-js](../bapp/sdk/caver-js/README.md) |
| CC | Core Cell. Core Cell plays a role of generating blocks in the Klaytn blockchain network. Details at [CC Operation Guide] |
| CCN | Core Cell Network. The network consists of Core Cells \(CCs\) that verify and execute submitted transactions.  CCN is also responsible for the creation and propagation of blocks with the transactions. Details at [CC Operation Guide] |
| CN | Klaytn Consensus Node. A node which creates a new block with other CN participants of the Core Cell Network. Details at [Consensus Nodes] |
| CNN | Consensus Node Network. CNN is a full-mesh network of CNs. [Consensus Nodes] |
| Committee | A group of selected consensus nodes participating in Byzantine fault-tolerant \(BFT\) consensus. Committee consists of a proposer and validators. |
| Council | All consensus nodes which can be a member of committee |
| EN | Endpoint Node. Endpoint Nodes play a role of an endpoint of the blockchain network to handle RPC API requests.  Details at [Endpoint Node] |
| ENN | Endpoint Node Network. The network consists of the Endpoint Nodes \(ENs\), which mainly create transactions, handle RPC API requests, or process the data from service chains. Details at [Endpoint Node] |
| EOA | Externally owned account. [Execution Model](../klaytn/klaytn-design/computation/execution-model.md#account) |
| Full node | A node containing all the blocks generated from a blockchain |
| KIR | Klaytn Improvement Reserve. [Token Economy](../klaytn/klaytn-design/token-economy.md#klaytn-improvement-reserve) |
| KLAY | KLAY is the main internal transferable cryptocurrency of Klaytn and is used to pay transaction fees when creating or executing smart contracts or when transferring KLAY. Also currency unit of KLAY and 1 KLAY is 10^18 peb. [Klaytn native coin - KLAY](../klaytn/klaytn-design/klaytn-native-coin-klay.md) |
| KLVM | Klaytn Virtual Machine. Details at [Klaytn Virtual Machine](../klaytn/klaytn-design/computation/klaytn-virtual-machine.md) |
| peb | The smallest currency unit of KLAY. [Klaytn native coin - KLAY](../klaytn/klaytn-design/klaytn-native-coin-klay.md#units-of-klay) |
| PN | Klaytn Proxy Node. A node which submits transactions received from the Klaytn Endpoint Node Network to a CN or CNs. Details at Core Cell System Requirements |
| PNN | Proxy Node Network. PNN is the network consisting of PNs in CCN. [CC Operation Guide] |
| PoC | Proof of Contribution is a transparent evaluation mechanism that incentivizes and stimulates participants in its economy by evaluating their contributions and compensating them. [Token Economy](../klaytn/klaytn-design/token-economy.md#proof-of-contribution) |
| Proposer | A consensus node proposing a new block |
| Proposer reward | Amount of KLAY which a proposer receives from block reward |
| SCN | Service Chain Network. This network is an auxiliary blockchain network specialized for the services that require higher performance, different node configurations, or security levels compared to the main chain. Details at SCN Operation Guide |
| Service Chain | A service-provider-owned blockchai capable of running more than one blockchain-based service |
| Unit price | A fixed price of gas maintained by Klaytn. Details at [Unit Price](../klaytn/klaytn-design/transaction-fees.md#unit-price) |
| Validator | A consensus node validating a new block proposed by a proposer |
| Validator reward | Total amount of KLAY which validators receive from block reward |


[Consensus Nodes]: ../node/consensus-nodes/README.md
[CC Operation Guide]: ../node/consensus-nodes/README.md
[Core Cell System Requirements]: ../node/consensus-nodes/system-requirements.md
[Endpoint Nodes]: ../node/endpoint-node/README.md
[EN Operation Guide]: ../node/endpoint-node/README.md
[SCN Operation Guide]: ../node/service-chain/README.md
[caver-js] ../bapp/sdk/caver-js/README.md
