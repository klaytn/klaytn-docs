# KNI <a id="KNI"></a>

**KNI (Klaytn Network Identifier)** is a URL scheme to identify a Klaytn node. Its syntax is shown below:
```
kni://<nodeID>@<hostname>:<port>?subport=<subport>&discport=<discport>
```
![KNI scheme](../images/kni_scheme.png)

**nodeID** is a 512-bit public key corresponding to the node's private key. It is used to verify communication with peers on p2p network.

**hostname** describes the address of a node, located between `@` and `:`. The address format can be one of the following:
* IPv4 dotted decimal (`192.0.2.1`)
* IPv6 (`[2001:db8::68]`)
* IPv4-mapped IPv6 (`[2001:db8:3c4d:15::abcd:ef12]`)
* Domain name (`your.node.com`)

**port** is used to make connections with peer nodes through TCP. In Klaytn, the default `port` number is `32323` and the default `subport` number is `32324`. (The default `subport` number is `port + 1` in `kend.conf`) Depending on the number of TCP listening ports, Klaytn offers two [types of connections](./multiport.md).

**discport** is used for checking if known neighbors are reachable klaytn nodes and fetching their neighbors' addresses for new connections. Note that this is a UDP port.
By default, the UDP port uses the same port with the TCP port.
If the UDP port differs from TCP port, the UDP port can be set using `discport` query parameter.

The following two URLs shows a KNI example of a node having IP address `10.0.0.1` and TCP listening port `32323` and `32324`.
If `discport` is omitted, it is set to the UDP port of `32323`, same as the value of `port`.
```
kni://a979...163c@10.0.0.1:32323                 # either single-channel or multi-channel peer with omitted subport
kni://a979...163c@10.0.0.1:32323?subport=32324   # multi-channel peer
```

The next two shows KNI examples of nodes having `discport` of `30301`.
```
kni://a979...163c@10.0.0.1:32323?discport=30301                 # either single-channel or multi-channel peer with omitted subport
kni://a979...163c@10.0.0.1:32323?subport=32324&discport=30301   # multi-channel peer
```

If you want to know how to generate a KNI of a node, please refer to [Node Key & Node URI Creation](../../node/core-cell/installation-guide/before-you-install.md#node-key-node-uri-creation).
The kni scheme is used in node discovery protocol, [setting `static-nodes.json` file](../../node/core-cell/installation-guide/proxy-node-setup/configuration.md#install-static-nodes-json), [addPeer API](../../bapp/json-rpc/api-references/admin.md#admin_addpeer), [bootnodes option](../../node/endpoint-node/operation-guide/configuration.md#properties) and etc.
