# Endpoint Node

## Intended Audience <a id="intended-audience"></a>

- Anyone who wants to send transactions or query the state of Klaytn network using [Klaytn APIs](../../references/json-rpc/json-rpc.md) needs to do so via an Endpoint Node.
- Endpoint Nodes are the interface to the Klaytn Network.

## Endpoint Node Overview <a id="endpoint-node-overview"></a>

An Endpoint Node has the following roles and functions.

- Synchronize the blockchain data.
- Validate the blocks newly received.
- Handles query requests.
- Transmits transaction requests to the Proxy Nodes.

The Endpoint Node install binary comes with the following interfaces and utilities.

- JSON-RPC APIs: JSON-RPC server runs inside the node, and it exposes [APIs](../../references/json-rpc/json-rpc.md) for Blockchain Application development. It has several node management APIs as well.
- Command-line Interface: Provides account management and node configuration functions. An interactive JavaScript console is also provided, that is attached to the node. JavaScript console implements most of the [caver-js APIs](../../references/sdk/caver-js/caver-js.md).
