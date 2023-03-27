# JSON-RPC Providers

## Public JSON RPC Endpoints

Publicly exposed JSON-RPC endpoints allow you to test and run your blockchain products by providing interaction with the Klaytn network without running your own node.

Running your own Klaytn Endpoint Node (EN) is not simple, it requires technical expertise, monitoring and computing resources. It comes with a cost of maintaining storage, network bandwidth as well as having to divert engineering time and resources; nodes must be kept up to date and health checked regularly. Hence, the main benefit of using an existing Public EN is that it allows you to solely focus on building and testing your blockchain product without the distraction of maintaining infrastructure to connect and interact with the Klaytn network.
 
### Things to Consider

- The node providers are not responsible for any damage or losses caused in relation to traffic or interaction with the nodes.
- If traffic is concentrated on certain nodes, you may experience service delay.
- To prevent too many requests, rate limits may apply on a per-node basis, which are subject to change without prior notification.

### Public JSON-RPC Endpoint Providers

Below is the list of Klaytn’s Public Node Providers and the network domains. (06.23.2022)

#### Mainnet (Cypress) Public JSON-RPC Endpoints

Please keep in mind that these endpoints are provided to the community for testing and development purposes.
Since we cannot guarantee uptime and stability of the endpoints, do not use them for commercial purposes.

**HTTPS**

|Service Provider|Endpoints|Namespaces|Type|
|---|---|---|---|
|[Klaytn Foundation](https://www.klaytn.foundation)|`https://public-en-cypress.klaytn.net`|klay,eth,net|Full|
||`https://archive-en.cypress.klaytn.net`|klay,eth,net|Archive|
|[All That Node](www.allthatnode.com)|`https://klaytn-mainnet-rpc.allthatnode.com:8551`|klay,eth,net|Full|
|[BlockPI Network](https://blockpi.io/)|`https://klaytn.blockpi.network/v1/rpc/public`|klay,eth,net|Full|

**WebSocket** 

|Service Provider|Endpoints|Namespaces|Type|
|---|---|---|---|
|[Klaytn Foundation](https://www.klaytn.foundation)|`wss://public-en-cypress.klaytn.net/ws`|klay,eth,net|Full|
||`wss://archive-en.cypress.klaytn.net/ws`|klay,eth,net|Archive|


### Testnet (Baobab) Public JSON-RPC Endpoints

**HTTPS**

|Service Provider|Endpoints|Namespaces|Type|
|---|---|---|---|
|[Klaytn Foundation](https://www.klaytn.foundation)|`https://api.baobab.klaytn.net:8651`|klay,eth,net|Full|
||`https://archive-en.baobab.klaytn.net/`|klay,eth,net|Archive|
|Fantrie|`https://baobab01.fautor.app/`|klay,eth,net|Full|
||`https://baobab02.fautor.app/`|klay,eth,net|Full|
||`https://baobab.fautor.app/archive`|klay,eth,net|Archive|
|[All That Node](www.allthatnode.com)|`https://klaytn-baobab-rpc.allthatnode.com:8551`|klay,eth,net|Full|
|[BlockPI Network](https://blockpi.io/)|`https://klaytn-baobab.blockpi.network/v1/rpc/public`|klay,eth,net|Full|

**WebSocket** 

|Service Provider|Endpoints|Namespaces|Type|
|---|---|---|---|
|[Klaytn Foundation](https://www.klaytn.foundation)|`wss://api.baobab.klaytn.net:8652`|klay,eth,net|Full|
||`wss://archive-en.baobab.klaytn.net/ws`|klay,eth,net|Archive|
|Fantrie|`wss://baobab01.fautor.app/ws/`|klay,eth,net|Full|
||`wss://baobab02.fautor.app/ws/`|klay,eth,net|Full|
||`wss://baobab.fautor.app/archive/ws`|klay,eth,net|Archive|

### Useful Resources 

- Wallet: Kaikas is a browser extension wallet for the Klaytn Network.
[Kaikas](https://docs.klaytn.foundation/dapp/developer-tools/kaikas)

- Faucet: You can obtain test KLAY for the Baobab test network. 
[Faucet](https://docs.klaytn.foundation/dapp/developer-tools/klaytn-wallet#how-to-receive-baobab-testnet-klay)

- Explorer: Klaytnscope is the block explorer for the Klaytn Network.
[Klaytnscope](https://docs.klaytn.foundation/dapp/developer-tools/klaytnscope)

- ChainID : Baobab: 1001 (0x3E9), Cypress: 8217 (0x2019)

- Gas price: Fixed at 250 ston
[Transaction Fees](https://docs.klaytn.com/klaytn/design/transaction-fees)

## Subscription-based JSON-RPC providers

By using node services, you can focus on developing your application or product on Klaytn instead of spending your resources on node operation. Below is a list of node providers.

### Klaytn API Service (KAS)

KAS provides various APIs to support easier and quicker blockchain application development. You can dramatically reduce development time, operate a stable service, and save costs.

#### Features

* 10,000 requests per day (100 requests per second) for the free plan
* Community support for the free plan, and ticket support for paid plans (Starter, Pro, and Pro Plus)
* Klaytn Node API, Token History API, Wallet API, Anchor API, KIP-7, 17, 37 API and Metadata API

#### References

* [Docs](https://www.klaytnapi.com/en/resource/docs/readme)
* [Subscription](https://www.klaytnapi.com/en/landing/pricings)
* [Website](https://www.klaytnapi.com/en/landing/main)

### Tatum

Tatum is the fastest way to build, test and run blockchain apps. We offer the most flexible platform for developers to turn their blockchain ideas into reality fast.

#### Features

* 5 requests per second for the free plan, and 200 requests per second for the paid plans (Start, Basic)
* Community support

#### References

* [Docs](https://apidoc.tatum.io/tag/Klaytn?\_gl=1\*1dhfv8u\*\_ga\*MzY5NDMyNzg5LjE2NDQ1NTk1MzA.\*\_ga\_BH6F6RKJW6\*MTY2MjAxNDQ0OS4xNy4xLjE2NjIwMTQ2MTQuMjQuMC4w)
* [Pricing](https://tatum.io/pricing)
* [Website](https://tatum.io/)

### BlockPI

BlockPI Network aims to provide high-quality, robust, and efficient RPC service. To avoid the single-point failure and limitation of scalability, the network is designed to be a distributed structure with expandable RPC nodes.

BlockPI provides free public endpoints to the Klaytn community and advanced features to paid users.  BlockPI designed two paid packages, and support Pay As You Go to fulfill flexible user needs. You can check the pricing details for each package (https://docs.blockpi.io/documentations/pricing) and the individual method cost for Klaytn  (https://docs.blockpi.io/documentations/request-unit-ru)

#### Features

* 20 requests per second on free services, and unlimited for paid packages.
* Choice of Klaytn archive node and endpoint node
* Whitelisting possible for endpoint nodes
* Supports WSS (including subscription)
* Supports tracing

#### References

* [Docs](https://docs.blockpi.io/)
* [Subscription](https://dashboard.blockpi.io/wallet/overview)
* [Website](https://blockpi.io/)

### Pocket Network

Pocket Network is the TCP/IP of Web3 node infrastructure – a multi-chain relay protocol that incentivizes RPC nodes to provide DApps and their users with unstoppable Web3 access.

Pocket supports dozens of blockchains, with more being added all the time.

#### Features

* Decentralized RPC Protocol and Marketplace
* 250,000 Requests Per Day Free Tier (up to two applications, with unlimited endpoints)
* Public Endpoints
* Pay-As-You-Go-plan (if you need more than 250,000 requests per day)
* 30+ Blockchains Supported
* 25,000 + Nodes earning POKT for serving applications
* Archival Node, Archival Node w/ Tracing, & Testnet Node Support
* No Single Point of Failure
* Zero Downtime
* Cost-Effective Near-Zero Tokenomics (stake POKT once for network bandwidth)
* No monthly sunk costs, turn your infrastructure into an asset
* Load-Balancing built into the Protocol
* Infinitely scale the number of requests per day and nodes per hour as you go
* The most private, censorship-resistant option
* Hands-on developer support

#### References

* [Docs](https://docs.pokt.network/api-docs/klaytn-evm/#/)
* [Website](https://docs.pokt.network/)
* [Pocket Portal](https://bit.ly/ETHorg\_POKTportal) dashboard and analytics

### ANKR

Ankr's distributed node network creates a powerful synergy, allowing developers to connect easily and securely to public endpoints. With fine-tuned caching that optimizes resource usage, Ankr guarantees fast RPC requests together with low latency performance for superior efficiency when building decentralized applications.

#### Features

* 500 requests per second on the free plan, and 1,500 on the premium. It is upgradable on request.
* Discord and Support Portal for the free plan, and dedicated support for the premium.
* WebSocket is available for the premium plan.

#### References

* [Docs](https://www.ankr.com/docs/build-blockchain/overview)
* [Subscription](https://www.ankr.com/rpc/pricing/)
* [Website](https://www.ankr.com/rpc/)

### NodeReal

NodeReal is a blockchain infrastructure and services provider. NodeReal helps developers and investors to explore blockchains with the most reliable solutions.

#### Features

- Free Tier, 3 API keys, 350 Million Compute Units(CU) monthly , 300 Compute Units Per Seconds(CUPS) monthly, Archive data
- Growth Tier, 15 API keys, 500 Million Compute Units(CU) monthly , 700 Compute Units Per Seconds(CUPS) monthly, Archive data, Debug & Trace API
- Enterprise Tier, Custom number of API Keys, Custom monthly usage, Dedicated support, Service-Level Agreement(SLA) and other requirements
- 50 Queries Per Seconds (QPS)/method

#### References

* [Docs](https://docs.nodereal.io/docs/getting-started)
* [Subscription](https://nodereal.io/api-marketplace/klaytn-rpc)
* [Website](https://nodereal.io)

