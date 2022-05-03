# Public JSON-RPC Endpoints

Publicly exposed JSON-RPC endpoints allow you to test and run your blockchain products by providing interaction with the Klaytn network without running your own node.

Running your own Klaytn Endpoint Node (EN) is not simple, it requires technical expertise, monitoring and computing resources. It comes with a cost of maintaining storage, network bandwidth as well as having to divert engineering time and resources; nodes must be kept up to date and health checked regularly. Hence, the main benefit of using an existing Public EN is that it allows you to solely focus on building and testing your blockchain product without the distraction of maintaining infrastructure to connect and interact with the Klaytn network.
 
## Things to Consider

- The node providers are not responsible for any damage or losses caused in relation to traffic or interaction with the nodes.
- If traffic is concentrated on certain nodes, you may experience service delay.
- To prevent too many requests, rate limits may apply on a per-node basis, which are subject to change without prior notification.

## Public JSON-RPC Endpoint Providers

Below is the list of Klaytn’s Public Node Providers and the network domains. (03.23.2022)

### Mainnet (Cypress) Public JSON-RPC Endpoints

#### Service Provider: Klaytn API Service

Please keep in mind that these endpoints are provided to the community for testing purposes, and will not support commercial use.

**HTTPS**

- `https://public-node-api.klaytnapi.com/v1/cypress`

**WebSocket** 

- `wss://public-node-api.klaytnapi.com/v1/cypress/ws`

#### Service Provider: Fantrie

These public endpoints are provided to the community by third party services and can take commercial service traffic. However, as a third party service we cannot guarantee uptime and stability.

**HTTPS**

- `https://klaytn01.fandom.finance/`

- `https://klaytn02.fandom.finance/`

- `https://klaytn03.fandom.finance/`

- `https://klaytn04.fandom.finance/`

- `https://klaytn05.fandom.finance/`

**WebSocket**

- `wss://klaytn01.fandom.finance/ws/`

- `wss://klaytn02.fandom.finance/ws/`

- `wss://klaytn03.fandom.finance/ws/`

- `wss://klaytn04.fandom.finance/ws/`

- `wss://klaytn05.fandom.finance/ws/`


### Testnet (Baobab) Public JSON-RPC Endpoints

#### Service Provider: Klaytn API Service

**HTTPS** 

- `https://public-node-api.klaytnapi.com/v1/baobab`

**WebSocket**

- `wss://public-node-api.klaytnapi.com/v1/baobab/ws`

#### Service Provider: Klaytn Foundation

**HTTPS**

- `https://api.baobab.klaytn.net:8651`

**WebSocket**

- `wss://api.baobab.klaytn.net:8652`


## Useful Resources 

- Wallet: Kaikas is a browser extension wallet for the Klaytn Network.
[Kaikas](https://docs.klaytn.com/dapp/developer-tools/kaikas)

- Faucet: You can obtain test KLAY for the Baobab test network. 
[Faucet](https://docs.klaytn.com/dapp/developer-tools/klaytn-wallet#how-to-receive-baobab-testnet-klay)

- Explorer: Klaytnscope is the block explorer for the Klaytn Network.
[Klaytnscope](https://docs.klaytn.com/dapp/developer-tools/klaytnscope)

- ChainID : Baobab: 1001 (0x3E9), Cypress: 8217 (0x2019)

- Gas price: Fixed at 250 ston
[Transaction Fees](https://docs.klaytn.com/klaytn/design/transaction-fees)

