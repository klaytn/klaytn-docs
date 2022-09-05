# Binary update on sustained service

The `SCN` and `EN` nodes make a bridge connection between child and parent chains. As both binaries are being continuously developed to add features, fix bugs, and make improvements,
their node versions will go up with every new release. It is very important to check for the backward compatibility of the release versions.
Not every release breaks backward compatibility, but we keep track of cases of broken backward compatibility and add notice [here](./compatibility.md).


## Example
We demonstrate with the following environments:
- Parent chain (Cypress or Baobab or ServiceChain): N of `CN`(or N of `SCN`) + 1`EN`(Bridge node) + 1`EN`
- Child chain (ServiceChain): 4`SCN`(Assume that the bridge node is `SCN1`) + 1`SEN`
    - `SEN` node connects with two or more CNs at least.

In this example, we call the previous and the new release `v1` and `v2` respectively.
We tag names all the entities of each chain as follows and they are currently running with `v1`.
- Parent chain:
    - `CNN` (e.g., CN1, CN2, and so on), `BEN`(Bridge `EN` node), and `EN`
- Child chain
    - `SCN1`, `SCN2`, `SCN3`, `SCN4`,`BSEN`(Bridge `SEN` node), and `SEN`

0. The `v2` binary should be prepared offline to replace `v1`.
1. Terminate `v1` of `BSEN` and replace it with `v2`.
2. Restart `BSEN` with the value transfer recovery (VTR) option(`SC_VTRECOVERY=1`).

Note that every value transfer transactions are not normally mined because of the bridge node's downtime.
After restarting, the unhandled transactions are executed and mined as expected by VTR.
Considering the replacement of `BEN`, it has the same process above.
Note that each chain must be live (i.e., a block is being mined continuously).
In the case above, users can continuously send value transfer transactions to live `EN`(or `SEN`)s.
Thus, no missing value transfer transactions and those are correctly handled by VTR in the counterpart chain.
Replacing both `BEN` and `SBEN` at the same time is valid too as long as both chains are live.


## Alternative
Another way to replace with a new release is by adjusting the validators with governance vote. Please refer to [guide](https://forum.klaytn.foundation/t/scn-servicechain-consensus-node/98).
Note that this guide was not written for the binary update for sustained service, as explained above. You can take an idea for binary update with sustained service.
To upgrade using governance votes, you may reduce the current number of validators to only one and the other validators nodes can be upgraded at a time if a governance mode is a single mode.
You should add the upgraded nodes to validators again by voting.
