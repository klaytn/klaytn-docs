# Token Economy <a id="token-economy"></a>

## Overview <a id="overview"></a>

Klaytn’s token economy is designed to create sustainable funding structures for powering its ecosystem operations, growth initiatives, and strategic investments. Many public blockchain projects have monetary systems that solely incentivize their node operators \(miners or block producers\), focusing only on the technical aspect of network maintenance. However, such designs miss out on the importance of incentivizing other types of participants who contribute to the growth of the network’s token economy or invest in long-term growth prospects. In contrast, Klaytn’s token economy is designed to compensate more diverse forms of contributions from a wider range of participants, and has built-in funding structure to procure sustained resources to fuel future growth initiatives and strategically sourced investment projects in addition to maintaining its blockchain nodes.

## Funding Structure <a id="funding-structure"></a>

Klaytn’s funding structure runs continuously with Klaytn network’s block generation. With every new block, newly issued KLAY and the sum of transaction fees used in the block \(collectively called “block reward”\) are aggregated and distributed to the following three destination accounts in accordance to the predetermined ratio:

* Klaytn Governance Council Reward: 34%
* Klaytn Growth Fund \(KGF\): 54%
* Klaytn Improvement Reserve \(KIR\): 12%

On every block created, 9.6 KLAY will be minted. This implies that approximately 300 million KLAY will be minted annually, which is equivalent to 3% annual inflation against the 10 billion KLAY issued at genesis \(the annual inflation rate is subject to change through the Klaytn Governance Process\). Transaction fee is charged per OPCODE and is metered according to the transaction fee table. For detailed information on the transaction fee table, please refer to [Transaction Fees](transaction-fees/transaction-fees.md).

## Klaytn Governance Council Reward <a id="klaytn-governance-council-reward"></a>

Klaytn Governance Council is the collective group of Core Cell Operators \(CCOs\). Council members are responsible for maintaining Core Cells \(CCs\), which makes the Council an essential body in the Klaytn ecosystem responsible for providing the underlying infrastructure. To become a Council member, the candidate must undergo a qualification review by the Klaytn Governance Process and must stake at least 5 million KLAY. The Klaytn Governance Council Reward is a structure for incentivizing Council members to continue to provide a stable foundation for the Klaytn ecosystem.

### Klaytn Governance Council Reward Mechanism <a id="klaytn-governance-council-reward-mechanism"></a>

For every block, a Committee composed of randomly selected Council members is formed. Each Committee has one member assigned the role of Proposer; all other Committee members assume the role of Validators. When a block is successfully created and added to the Klaytn blockchain, the Proposer of the said block is rewarded with 100% of the block reward. The probability of a Council member being selected a Proposer is proportional to the amount of KLAY staked by the member; that is, the more KLAY a member stakes, the more likely that the member will be selected as a Proposer and potentially claim the block reward.

As long as the minimum 5 million KLAY staking requirement is met, Klaytn Governance Council members can freely stake or unstake his or her own KLAY. Staking information is updated every 86,400 blocks, and newly staked KLAY comes info effect two update cycles later from when the staking is completed. Withdrawing staked KLAY requires one week of delay to prevent malicious members from immediately exiting.

To prevent monopolized claiming of Klaytn Governance Council Reward by small groups of highly invested Council members, Gini coefficient may be used to adjust the effective amount of staked KLAY. The application formula is as follows, where G stands for gini coefficient of Governance Council's KLAY staking distribution:

* _Adjusted staking amount = \(Council member's staking amount\)^\(1/1+G\)_


### Penalty for Misbehaving Council Members <a id="penalty-for-misbehaving-council-members"></a>

A Council member may be subject to penalties for conducting misbehaviors defined below. In the future, more penalty rules can be established and refined through the Klaytn Governance Process.

Causing Safety Failure:

* A Council member selected as Proposer may not create more than one block in the same height
* A Council member selected as Proposer may not intentionally omit certain transactions

Causing Liveness Failure:

* A Council member selected as Proposer must create a valid block
* A Council member selected as Validator must validate the block proposed by the Proposer

## Klaytn Growth Fund <a id="klaytn-growth-fund"></a>

### Background

Klaytn's token economy operates and develops through the activities of Klaytn's economic entities. The growth of the economy will help improve the stability of the platform and help the ecosystem last. Therefore, Klaytn has an incentive system that fosters the economic entities' activities in order to help maintain and strengthen the economic growth of Klaytn.


### General Concept
The Klaytn Growth Fund (KGF) aims to bring Klaytn economy forward by providing grants and investing in various organizations and individuals that contribute to the Klaytn economy. Klaytn's technology provides enormous opportunities for people to store, transfer, and exchange data and value globally with ease and at minimal cost. And since it is an open network, anyone can join to build an application without obtaining any permissions. However, a wider adoption of blockchain has been hindered because the technology is still in its early phase, and most of the values and data are still being managed in traditional ways in the form of legal contracts, local storage, etc.  And KGF is intended to solve these problems. KGF will support various programs for promoting the adoption of Klaytn across all industries, such as rewarding those who show proof-of-contribution on-chain and investing in early-stage dapps. It will be constantly financed through a certain percentage of the block rewards (refer to [Funding Structure](token-economy.md#funding-structure)). 


## Klaytn Improvement Reserve <a id="klaytn-improvement-reserve"></a>

As technology continues to improve and the needs of users change over time, our platform must have the ability to quickly adapt to any new circumstance that arises. To respond to such changes, we must not only work on services, but also undergo various activities to maintain Klaytn’s ecosystem. For instance, research and development for better technology, or projects that contribute to the overall growth of the ecosystem may be part of these activities. These activities are necessary for Klaytn to progress continuously. Klaytn Improvement Reserve (KIR) will be deployed for activities that improve the Klaytn ecosystem such as the following.



| Category | Details |
| :--- | :--- |
| **Development** | <ul><li>IDE & Editors</li><li>Oracle</li><li>Contract Library</li> |
| **Infrastructure** | <ul><li>Local Testnet</li><li>Decentralized File System</li><li>Multi-VM</li> |
| **Test, Debugging, Deployment** | <ul><li>Testing & Deployment Tools</li><li>Security & Audit Tools</li> |
| **Monitoring & Analytics** | <ul><li>Monitoring</li><li>Analytics</li> |
| **Education & Activity** | <ul><li>Documentation</li><li>Educational Materials</li><li>Community Building</li><li>Open Source Activity(Including Bug Bounty)</li> |
| **Research** | <ul><li>Security, Scalability, Cryptography, etc.</li></ul> |


KIR proposals can be created by any participant in Klaytn’s ecosystem. KIR spending proposals will be processed per KIR Governance Process. Refer to the [Klaytn Improvement Reserve Review Process](governance.md#klaytn-improvement-reserve-review-process) section for more information on the procedure. Once a spending proposal has passed, KLAY will be distributed periodically, from a predetermined total amount, based on the project’s level of progress. This process may change based on the project size but is planned to be processed monthly.

For more information, please visit [Klaytn Improvement Reserve Forum](https://kir.klaytn.com/).
