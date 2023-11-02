# StateDB Live Pruning <a id="state-pruning"></a>

StateDB Live Pruning is a technology created to solve the same problem as [State Migration](state-migration.md) (data in the state trie keeps accumulating).

In StateDB, data is stored in a StateTrie structure. Every time a block changes state information, multiple nodes in the Trie also change, and newly created or moified data is stored. As the Klaytn network continues to grow, the amount of data is increasing significantly. We have solved this problem by continuously deleting past data through State Migration, thereby saving storage. However, there are disadvantages in that the entire Trie must be traversed and must be run manually. To compensate for this, StateDB Live Pruning technology was introduced.

In order to efficiently delete past data without traversing the entire StateTrie, it is necessary to determine whether TrieNode is used based on a specific point (block) in time. However, in the existing StateTrie structure, one TrieNode can be included in multiple StateTries. Therefore, even if the state of a specific block changes at a specific point in time, some TrieNodes can be used redundantly and cannot be easily deleted. This is referred to as the hash duplication problem.

StateDB Live Pruning resolves the internal hash duplication problem of State Trie by adding a unique 7-byte serial index after the 32-byte Hash, thus solving this challenge. This ensures that all nodes are unique and can safely delete StateTrie before a specific point in time.

```
Hash: Keccak256 - 32-byte Hash key
ExtHash: Keccak256 - 32-byte Hash Key + 7-byte Serial index
```

Furthermore, the StateRoot is not be changed in a block since we still calculate origianl hash value from extended hash. In order to obtain the State Root value, the 7-byte Serial index added to ExtHash is removed, and the Hash is recalculated to obtain the same State Root value as before, making it backward compatible. 

For more information, see [https://medium.com/klaytn/strong-efficient-management-of-blockchain-data-capacity-with-statedb-live-pruning-strong-6aaa09b05f91].

StateDB Live Pruning deletes data 48 hours (default) after the information has changed, so features related to querying StateDB are not supported such as account balance, contract execution in the past, etc. Please carefully consider the purpose of the node you are operating before deciding to activate the StateDB Live Pruning feature.

To use StateDB Live Pruning, the following environment must be set up:

1. Use a binary of klaytn v1.12.0 or higher.
2. Only the method of downloading and syncing the DB with the ExtHash structure exists. Please download the DB from the following link.
3. (Optional) Add the flag `--state.live-pruning-retention <value>` for how long recent states are retained. Default value is 172800 (48 hours)
3. Refer to the following link to set the DB location and restart the node with `--state.live-pruning` added [https://ko.docs.klaytn.foundation/content/operation-guide/chaindata-change].


