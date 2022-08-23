# Zero Downtime Upgrade

The `SCN` and `EN` nodes make a bridge connection between child and parent chains. As both binaries are being continuously developed to develop a new feature, bugfix, and improve existing features,
their node versions increase by a new release. The release version is very important to check out for backward compatibility.
No every release breaks backward compatibility, but we keep track of the case of broken backward compatibility and add a notice to [here](./compatibility.md).

We deomonstrate with the following environments:
- Parent chain(Cypress or Baobab or ServiceChain): N of `CN`(or N of `SCN`) + 1`EN`(Bridge node) + 1`EN`
- Child chain(ServiceChain): 4`SCN`(Assume that the bridge node is `SCN1`) + 1`SEN`
    - `SEN` node connects with two or more CNs at least.

We call `v1` and `v2` are previous release and new release, respectively in this demonstration.
Assume that all the nodes are parent chain and child chain are now in running with 'v1'.
We tag a names all the entities of each chain as follows:
- Parent chain:
    - `CNN` (e.g., CN1, CN2, and so on), `BEN`(Bridge `EN` node), and `EN`
- Child chain
    - `SCN1`, `SCN2`, `SCN3`, `SCN4`,`BSEN`(Bridge `SEN` node), and `SEN`

First, the `v2` binary should be prepared offline to replace `v1`.
Terminate `v1` of `BSEN` and replace it with `v2`. Restart `BSEN` with the value transfer recovery (VTR) option(`SC_VTRECOVERY=1`).
Every value transfer transactions are not normally mined because of the bridge node's downtime.
After restarting, the unhandled transactions are executed and mined as expected by VTR.
Considering the replacement of `BEN`, it has the same process above.
Note that each chain must be live (i.e., a block is being mined continuously).
In the case above, users can continuously send value transfer transactions to live `EN`(or `SEN`)s.
Thus, no downtime is created, and those transactions are correctly handled again by VTR in the counterpart chain.
Replacing both `BEN` and `SBEN` at the same time is valid too as long as both chains are live.
