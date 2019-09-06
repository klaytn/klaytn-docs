# Endpoint Node

## Intended Audience

- Anyone who wants to send transactions or query the state of Klaytn network using [Klaytn APIs](../bapp/json-rpc/README.md) needs to do so via an Endpoint Node.
- Endpoint Nodes are the interface to the Klaytn Network.  

## Endpoint Node Overview

An Endpoint Node has the following roles and functions.

- Synchronize the blockchain data. 
- Validate the blocks newly received.
- Handles query requests.
- Transmits transaction requests to the Proxy Nodes.

The Endpoint Node install binary comes with the following interfaces and utilities.

- JSON-RPC APIs: JSON-RPC server runs inside the node, and it exposes [APIs](../bapp/json-rpc/README.md) for Blockchain Appication development. It has several node management APIs as well.
- Command-line Interface: Provides account management and node configuration functions. An interactive JavaScript console is also provided, that is attached to the node. JavaScript console implements most of the [caver-js APIs](../bapp/sdk/caver-js/README.md). 





