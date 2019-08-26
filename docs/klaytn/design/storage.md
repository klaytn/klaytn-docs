# Storage Layer

## Block archiving

The high throughput of Klaytn should result in high storage costs. Klaytn plans
to perform block-archiving to ease storage burdens of participating nodes. With
block archiving enabled, ENs may remove bodies of stale blocks, maintaining only
a certain number of the last blocks. Only a subgroup of Klaytn network nodes will
keep all the blocks in cost-effective storage and they will serve read requests
by verifying older transactions no longer stored in ENs. However, even block
archiving ENs will still have to keep the headers from all archived blocks in
order to allow clients to securely verify the contents of the archived blocks.

This process can effectively reduce the storage cost of ENs, encouraging
diverse participants to join the ENN. Assuming 100 TPS in average and
1-second block latency, the size of data that an EN must replicate can be
significant. If the average transaction size is 300 bytes, the expected EN daily
storage requirement is 2.5 GB/day (=300x100x86400). While this does not hinder
servers and desktops (where storage space is more easily expandable and less expensive),
certain ENs running their nodes on lighter machines such as laptops could find
this storage requirement a burden. By allowing ENs to only keep a fixed number
of blocks, block archiving will extend its benefits to a broad spectrum of audiences
on the network, fortifying data redundancy and security without requiring ENs to
replicate an ever-growing ledger of blocks.

Whereas removing block bodies may be perceived as weakening decentralization as
block archiving nodes cannot independently verify all historical transactions
without the help of other nodes. Nonetheless, not all applications need
constant access to the complete history of transactions, and we believe that
block archiving is a welcome feature strongly preferred by certain groups of
services --- services that require only the latest states of applications.
Serving all blocks in this context is inefficient and less desirable. We
believe that block archiving will benefit many applications requiring high
replication levels and the security of blockchain technology.
