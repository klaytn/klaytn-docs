# Multichannel <a id="multichannel"></a>

A Klaytn node can be run with **Multichannel**.

If a node is executed with multichannel configuration, 2 ports are set up for communication. On the otherhand, if a node is executed with single channel configuration, 1 port is set up.
If 2 multichannel nodes are trying to connect, a connection is established using 2 ports. Otherwise, they will use 1 port for communication.

A multichannel node can be enabled through the flag `--multichannel`. If you use [`kend`](../../node/endpoint-node/operation-guide/starting-stopping-en.md), multichannel is enabled by default due to the statement `MULTICHANNEL=1` in [`kend.conf`](../../node/endpoint-node/operation-guide/configuration.md). To disable multichannel, please replace the statement with `MULTICHANNEL=0`.
If you want to run a node with specific ports, flags `port` and `subport` can be used. If you want to specify ports values of a connecting peer, check out [KNI](./kni.md).

## Architecture <a id="multichannel-architecture"></a>

![Multichannel server](../images/multichannel.png)

The picture above shows a connection between two multichannel nodes.
Two ports, mainport (A) and subport (B), transfer different messages.
* **Mainport**(A) is used to transfer messages related to blocks and consensus protocols.
  * Block messages include requests and responses of the hash, header, body and receipt of a block.
  * Consensus messages include Request, Preprepare, Prepare, Commit and RoundChange. The meaning of the messages can be found in [PBFT](./consensus-mechanism.md#pbft-practical-byzantine-fault-tolerance).
* **Subport**(B) is for transferring transaction messages.

![Singlechannel server](../images/singlechannel.png)

The picture shows a connection between two single channel nodes or between a single channel node and a multi channel node.
In this case, all messages including Blocks, Transactions, Consensus are transported via the same port.

## Ports  <a id="multichannel-port"></a>

* Single Channel : a single-channel node uses one port. The port is placed at the end of hostname
* Multi Channel: a multi-channel node uses two ports. The ports can be specified in `port` and `subport`. In Klaytn, the default values of `port` and `subport` are 32323 and 32324, respectively.
    * You might not set `subport` when connecting to multi-channel node. In this case, at first, a Klaytn node tries to connect using a single-channel. In handshake process, the actual peer's port numbers are revealed. If the peer is a multi-channel node, the ongoing connection will be canceled and a reconnection will be made with the updated ports.
