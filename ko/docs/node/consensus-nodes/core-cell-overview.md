# Core Cell Overview

\[What is it\]

\[Why / when it is needed - intended audience\]

A Klaytn Core Cell \(CC\) consists of the following components.

* Klaytn Consensus Node \(CN\)
* Klaytn Proxy Node \(PN\)

![Core Cell Overview](images/cn_set.png)

| Name      | Description                                                                                                                                                                                                                                                                                                    | Network Security                                                                                                                                                                                                                                                                                                                                | Quantity                                          |
|:--------- |:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:------------------------------------------------- |
| Klaytn CN | A node which creates a new block with other CN participants of the Core Cell Network                                                                                                                                                                                                                           | A network is comprised of the permissioned CNs \(Required IP access control\).                                                                                                                                                                                                                                                                | 1 unit                                            |
| Klaytn PN | - A node which submits transactions received from the Klaytn Endpoint Node Network to a CN or CNs. - It propagates the created blocks from a CN or CNs to Klaytn Endpoint Node Network. - It may be required to be scaled out horizontally depending on the number of ENs in the Klaytn Endpoint Node Network. | - It is connected with CNs internally in a Core Cell, and its IP and Ports are required to be public to be connected with other Klaytn nodes on the Internet. - It can connect to some PNs in the other CCs via a PN bootnode \(not implemented yet\). - It supports connections to an EN or ENs via a EN bootnode \(not yet implemented.\) | At least 1, but recommended 2 or more for spares. |


It is recommended that a Core Cell consists of a CN with 2 or more PNs. A CN is able to be connected to the other CNs within the Core Cell Network, or to PNs in the same Core Cell. A PN is able to be connected to all the ENs within the Klaytn Endpoint Node Network.