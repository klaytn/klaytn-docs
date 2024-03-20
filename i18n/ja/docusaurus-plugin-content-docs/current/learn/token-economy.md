# Token Economy

## Overview <a id="overview"></a>

Klaytn’s token economy is designed to create sustainable funding structures for empowering its ecosystem, growth initiatives, and strategic investments. Many public blockchain projects have monetary systems that solely incentivize their node operators (miners or block producers), focusing only on the technical aspect of network maintenance. However, such designs miss out on the importance of incentivizing other types of participants who contribute to the growth of the network’s token economy or invest in long-term growth prospects. In contrast, Klaytn’s token economy is designed to compensate more diverse forms of contributions from a wider range of participants, and has built-in funding structure to procure sustained resources to fuel future growth initiatives and strategically sourced investment projects in addition to maintaining its blockchain nodes.

## Funding Structure <a id="funding-structure"></a>

Klaytn’s funding structure runs continuously with Klaytn network’s block generation. With every new block, newly issued KLAY and the sum of transaction fees used in the block (collectively called “block reward”) are aggregated and distributed to the following three destination accounts in accordance to the predetermined ratio:

- Klaytn Governance Council (GC) Reward:
  - GC Block Proposer Reward: 10%
  - GC Staking Award: 40%
- Klaytn Community Fund (KCF): 30%
- Klaytn Foundation Fund (KFF): 20%

6.4 KLAY will be minted for every new block. This implies that approximately 200 million KLAY will be minted annually, which is equivalent to 2% annual inflation against the 10 billion KLAY issued at genesis (the annual inflation rate is subject to change through the Klaytn Governance Process). Transaction fee is charged and metered according to the pre-determined fee tables. For detailed information about the transaction fees, please refer to [Transaction Fees](transaction-fees/transaction-fees.md).

## Klaytn Governance Council Reward <a id="klaytn-governance-council-reward"></a>

Klaytn Governance Council is the collective group of Core Cell Operators (CCOs). Council members are responsible for maintaining Core Cells (CCs), which makes the Council an essential body in the Klaytn ecosystem responsible for providing the underlying infrastructure. To become a Council member, the candidate must undergo a qualification review by the Klaytn Governance Process and must stake at least 5 million KLAY. The Klaytn Governance Council Reward is a structure for incentivizing Council members to continue to provide a stable foundation for the Klaytn ecosystem.

### Klaytn Governance Council Reward Mechanism <a id="klaytn-governance-council-reward-mechanism"></a>

For each block in the Klaytn blockchain, a Committee is formed by randomly selecting members from the Klaytn Governance Council (GC). This Committee consists of a single member who is assigned the role of Proposer, while the remaining Committee members take on the role of Validators. Once a block is successfully created and appended to the Klaytn blockchain, the block reward is distributed among the Council members and various funds according to the previously mentioned ratios.

All Council members have an equal probability of being selected as the Proposer for a given block, and the block proposer reward is distributed evenly among them. However, the GC staking reward is allocated proportionally based on the amount of KLAY staked by each member, minus the minimum requirement of 5 million KLAY. This means that Council members who stake a larger amount of KLAY beyond the minimum threshold will receive a greater share of the staking reward compared to those who stake less. As a result, Council members are incentivized to stake more KLAY to maximize their potential rewards from the GC staking award portion of the block reward distribution.

As long as the minimum 5 million KLAY staking requirement is met, Klaytn Governance Council members can freely stake or unstake his or her own KLAY. Staking information is updated every 86,400 blocks, and newly staked KLAY comes info effect two update cycles later from when the staking is completed. Withdrawing staked KLAY requires one week of delay to prevent malicious members from immediately exiting.

### Penalty for Misbehaving Council Members <a id="penalty-for-misbehaving-council-members"></a>

A Council member may be subject to penalties for conducting misbehaviors defined below. In the future, more penalty rules can be established and refined through the Klaytn Governance Process.

Causing Safety Failure:

- A Council member selected as Proposer may not create more than one block in the same height
- A Council member selected as Proposer may not intentionally omit certain transactions

Causing Liveness Failure:

- A Council member selected as Proposer must create a valid block
- A Council member selected as Validator must validate the block proposed by the Proposer

## Klaytn Community Fund <a id="klaytn-community-fund"></a>

The Klaytn Community Fund (KCF) was established to support Klaytn's mission of enabling greater transparency and verifiability. It's important to keep in mind that the former Klaytn Growth Fund (KGF) and Klaytn Improvement Reserve (KIR) have merged to become the new Klaytn Community Fund (KCF).

The Klaytn Community Fund will be used to fund activities that improves the Klaytn ecosystem, such as:

1. **Rewarding Proof of Contribution**: The KCF will provide follow-up support, such as gas fee support to projects that have made significant on-chain contributions to the Klaytn ecosystem among services that have already been developed.
2. **Building our Developer Community**: The KCF will support various initiatives including hackathons, development education programs, collaborative research with the industry, and collaboration with various DAOs to foster and grow the Klaytn developer community.
3. **Fostering Ecosystem Services and Infrastructure**: The KCF will support essential ecosystem infrastructure, alongside the development of services with clear utility and provide marketing support.
4. **Klaytn Eco Fund Indirect Investment**: The KCF will make indirect mid-to long-term investments by entrusting specialized crypto VCs, and most of the profits generated upon subsequent investment recovery will be returned to the Klaytn ecosystem.

The administration of the Klaytn Community Fund follows a process in which the GC reviews and approves the use of funds in public forums on [Klaytn Square](https://square.klaytn.foundation/Home). The Foundation will submit a budget proposal for each category to the GC for approval. Within the approved budget, each specific use will be reviewed and approved again by the GC. In the meantime, the KCF is currently being run as a [pilot program](https://klaytn.foundation/kcf-grant-pilot/) and interested parties can visit the [Klaytn Governance Forum](https://govforum.klaytn.foundation/t/operational-procedures-of-the-kcf-grant-program-pilot/288) for more details about the program.

## Klaytn Foundation Fund <a id="klaytn-foundation-fund"></a>

Klaytn Foundation Fund (KFF) is an operational fund that will focus on this two main categories:

1. **Ecosystem Support**: This includes providing minor financial assistance, securing new GC members, liquidity provisions, and developing / funding services led by the Foundation.
2. **Foundation Operations**: This includes operating expenses such as development, accounting, infrastructure operations, marketing, and labor, as well as financial management and investment attraction costs.

Similar to KCF, KFF will be executed autonomously and transparently after obtaining approval from the GC via on-chain voting.

For more information, kindly read this [article](https://medium.com/klaytn/klaytn-tokenomics-optimization-governance-proposal-securing-a-sustainable-verifiable-token-1efd2a49b04e).
