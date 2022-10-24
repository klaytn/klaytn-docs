# Public JSON-RPC Endpoints

Publicly exposed JSON-RPC endpoints allow you to test and run your blockchain products by providing interaction with the Klaytn network without running your own node.

Running your own Klaytn Endpoint Node (EN) is not simple, it requires technical expertise, monitoring and computing resources. It comes with a cost of maintaining storage, network bandwidth as well as having to divert engineering time and resources; nodes must be kept up to date and health checked regularly. Hence, the main benefit of using an existing Public EN is that it allows you to solely focus on building and testing your blockchain product without the distraction of maintaining infrastructure to connect and interact with the Klaytn network.
 
## Things to Consider

- The node providers are not responsible for any damage or losses caused in relation to traffic or interaction with the nodes.
- If traffic is concentrated on certain nodes, you may experience service delay.
- To prevent too many requests, rate limits may apply on a per-node basis, which are subject to change without prior notification.

## Public JSON-RPC Endpoint Providers

Below is the list of Klaytn’s Public Node Providers and the network domains. (06.23.2022)

### Mainnet (Cypress) Public JSON-RPC Endpoints

Please keep in mind that these endpoints are provided to the community for testing and development purposes.
Since we cannot guarantee uptime and stability of the endpoints, do not use them for commercial purposes.

**HTTPS**

|Service Provider|Endpoints|Namespaces|Type|
|---|---|---|---|
|[Klaytn API Service](https://www.klaytnapi.com/)| `https://public-node-api.klaytnapi.com/v1/cypress`|klay,eth,net,debug|Full|
|[Klaytn Foundation](https://www.klaytn.foundation)|`https://public-en-cypress.klaytn.net`|klay,eth,net,debug|Full|
|Fantrie|`https://klaytn01.fandom.finance/`|klay,eth,net,debug|Full|
||`https://klaytn02.fandom.finance/`|klay,eth,net,debug|Full|
||`https://klaytn03.fandom.finance/`|klay,eth,net,debug|Full|
||`https://klaytn04.fandom.finance/`|klay,eth,net,debug|Full|
||`https://klaytn05.fandom.finance/`|klay,eth,net,debug|Full|
||`https://cypress.fandom.finance/archive`|klay,eth,net,debug|Archive|
|[All That Node](www.allthatnode.com)|`https://klaytn-mainnet-rpc.allthatnode.com:8551`|klay,eth,net|Full|

**WebSocket** 

|Service Provider|Endpoints|Namespaces|Type|
|---|---|---|---|
|[Klaytn API Service](https://www.klaytnapi.com/)| `wss://public-node-api.klaytnapi.com/v1/cypress/ws`|klay,eth,net,debug|Full|
|[Klaytn Foundation](https://www.klaytn.foundation)|`wss://public-en-cypress.klaytn.net/ws`|klay,eth,net,debug|Full|
|Fantrie|`wss://klaytn01.fandom.finance/ws/`|klay,eth,net,debug|Full|
||`wss://klaytn02.fandom.finance/ws/`|klay,eth,net,debug|Full|
||`wss://klaytn03.fandom.finance/ws/`|klay,eth,net,debug|Full|
||`wss://klaytn04.fandom.finance/ws/`|klay,eth,net,debug|Full|
||`wss://klaytn05.fandom.finance/ws/`|klay,eth,net,debug|Full|
||`wss://cypress.fandom.finance/archive/ws`|klay,eth,net,debug|Archive|


## Testnet (Baobab) Public JSON-RPC Endpoints

**HTTPS**

|Service Provider|Endpoints|Namespaces|Type|
|---|---|---|---|
|[Klaytn API Service](https://www.klaytnapi.com/)| `https://public-node-api.klaytnapi.com/v1/baobab`|klay,eth,net,debug|Full|
|[Klaytn Foundation](https://www.klaytn.foundation)|`https://api.baobab.klaytn.net:8651`|klay,eth,net|Full|
|Fantrie|`https://baobab01.fandom.finance/`|klay,eth,net,debug|Full|
||`https://baobab02.fandom.finance/`|klay,eth,net,debug|Full|
||`https://baobab.fandom.finance/archive`|klay,eth,net,debug|Archive|
|[All That Node](www.allthatnode.com)|`https://klaytn-baobab-rpc.allthatnode.com:8551`|klay,eth,net|Full|

**WebSocket** 

|Service Provider|Endpoints|Namespaces|Type|
|---|---|---|---|
|[Klaytn API Service](https://www.klaytnapi.com/)| `wss://public-node-api.klaytnapi.com/v1/baobab/ws`|klay,eth,net,debug|Full|
|[Klaytn Foundation](https://www.klaytn.foundation)|`wss://api.baobab.klaytn.net:8652`|klay,eth,net|Full|
|Fantrie|`wss://baobab01.fandom.finance/ws/`|klay,eth,net,debug|Full|
||`wss://baobab02.fandom.finance/ws/`|klay,eth,net,debug|Full|
||`wss://baobab.fandom.finance/archive/ws`|klay,eth,net,debug|Archive|

## Useful Resources 

- Wallet: Kaikas is a browser extension wallet for the Klaytn Network.
[Kaikas](https://docs.klaytn.foundation/dapp/developer-tools/kaikas)

- Faucet: You can obtain test KLAY for the Baobab test network. 
[Faucet](https://docs.klaytn.foundation/dapp/developer-tools/klaytn-wallet#how-to-receive-baobab-testnet-klay)

- Explorer: Klaytnscope is the block explorer for the Klaytn Network.
[Klaytnscope](https://docs.klaytn.foundation/dapp/developer-tools/klaytnscope)

- ChainID : Baobab: 1001 (0x3E9), Cypress: 8217 (0x2019)

- Gas price: Fixed at 250 ston
[Transaction Fees](https://docs.klaytn.com/klaytn/design/transaction-fees)

