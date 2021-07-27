# Glossary

| Term | Description |
| :--- | :--- |
| BApp | Blockchain application |
| Block reward | Newly issued KLAY and the sum of transaction fees used in the block |
| Bootnode | Bootnodes that helps PNs and ENs to register themselves in the network and to discover other nodes to connect to. |
| caver-js | [caver-js](../bapp/sdk/caver-js/) is a JavaScript API library that allows developers to interact with a Klaytn node. |
| caver-java | [caver-java](../bapp/sdk/caver-java/) is a Java API library that allows developers to interact with a Klaytn node. |
| CC | [Core Cell](../node/core-cell/). Core Cell plays a role of generating blocks in the Klaytn blockchain network. |
| CCN | Core Cell Network. The network consists of Core Cells \(CCs\) that verify and execute submitted transactions.  CCN is also responsible for the creation and propagation of blocks with the transactions. |
| CN | Klaytn Consensus Node. A node which creates a new block with other CN participants of the Core Cell Network. Details at [Core Cell](../node/core-cell/) |
| CNN | Consensus Node Network. CNN is a full-mesh network of CNs. |
| Committee | A group of selected consensus nodes participating in Byzantine fault-tolerant \(BFT\) consensus. Committee consists of a proposer and validators. |
| Council | All consensus nodes which can be a member of committee |
| EN | [Endpoint Node](../node/endpoint-node/). Endpoint Nodes play a role of an endpoint of the blockchain network to handle RPC API requests. |
| ENN | Endpoint Node Network. The network consists of the Endpoint Nodes \(ENs\), which mainly create transactions, handle RPC API requests, or process the data from service chains. |
| EOA | Externally Owned Account. See [Klaytn Account Types](../klaytn/design/accounts.md#klaytn-account-types) |
| Full node | A node containing all the blocks generated from a blockchain |
| KIR | Klaytn Improvement Reserve. See [Token Economy - Klaytn Improvement Reserve](../klaytn/design/token-economy.md#klaytn-improvement-reserve). |
| KLAY | [KLAY](../klaytn/design/klaytn-native-coin-klay.md) is the main internal transferable cryptocurrency of Klaytn and is used to pay transaction fees when creating or executing smart contracts or when transferring KLAY. Also currency unit of KLAY and 1 KLAY is 10^18 peb. |
| KLVM | [Klaytn Virtual Machine](../klaytn/design/computation/klaytn-virtual-machine.md) |
| peb | The smallest currency unit of KLAY. See [Unit of KLAY](../klaytn/design/klaytn-native-coin-klay.md#units-of-klay). |
| PN | Klaytn Proxy Node. A node which submits transactions received from the Klaytn Endpoint Node Network to a CN or CNs. Details at [Core Cell](../node/core-cell/) |
| PNN | Proxy Node Network. PNN is the network consisting of PNs in CCN. |
| Proposer | A consensus node proposing a new block |
| Proposer reward | Amount of KLAY which a proposer receives from block reward |
| SCN | Service Chain Network. This network is an auxiliary blockchain network specialized for the services that require higher performance, different node configurations, or security levels compared to the main chain. Details at SCN Operation Guide |
| Service Chain | A service-provider-owned blockchain capable of running more than one blockchain-based service |
| Unit price | A fixed price of gas maintained by Klaytn. Details at [Unit Price](../klaytn/design/transaction-fees.md#unit-price). |
| Validator | A consensus node validating a new block proposed by a proposer |
| Validator reward | Total amount of KLAY that validators receive from block reward |

