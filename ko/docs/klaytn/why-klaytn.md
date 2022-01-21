---
description: >-
  This document explains the key design principles of Klaytn and illustrates how Klaytn differentiates itself from others.
---

​
# 왜 Klaytn일까요?<a id="why-klaytn"></a>
​
## Klaytn as a trust layer of metaverse <a id="klaytn-as-a-trust-layer-of-metaverse"></a>
​ Klaytn is built to be the fundamental trust layer for the metaverse that respects the participation and contributions of all communities, bringing them together in the new world and empowering them. ​ The foremost design principle is; ​
{% hint style="success" %}
Helping the pioneers to easily build the applications and organize the community, in scalable way.
{% endhint %}
​ As per this principle, Klaytn has been designed to meet the following requirements. ​
### High Performance <a id="high-performance"></a>
​ **Throughput(TPS) and Finality**
- Main chain should handle at least 4,000 TPS.
- Main chain should guarantee immediate transaction finality with one-second block generation time.
- See [Consensus Mechanism](design/consensus-mechanism.md). ​ **Scalability**
- Service chain is the default L2 solution for Klaytn 2.0 which is easily customizable and deployable. The service chain can have its own governance and connect to the Klaytn main chain for data anchoring and asset transfer.
- See [Service Chain](scaling-solutions.md#service-chain). Enterprises or large networks often want to have their own dedicated execution environment. With the service chain, they can maintain an isolated high-performing execution environment that is not affected by other blockchain applications.
- Other scalability solutions will be available in the near future, such as sharding or rollups. ​
### 저렴한 비용  <a id="low-cost"></a>
​ - End-users should not be burdened with any higher transaction fee that is beyond the cost that the traditional systems require. - Transaction fee should be stable and be determined by the transaction complexity itself, not by surrounding factors. - See [Affordable Smart Contract Execution Cost](design/computation/klaytn-smart-contract.md#affordable-smart-contract-execution-cost) and [Transaction Fees](design/transaction-fees/transaction-fees.md). At the time of writing, sending KLAY requires a fixed fee of 0.000625 KLAY. ​
### Rapid Development <a id="rapid-development"></a>
​ **Ethereum Compatibility** - Development Tools: Any tooling that can run on Ethereum will run seamlessly within the Klaytn ecosystem by making Klaytn’s technical stack equivalent, from an interfacing and execution perspective, to the existing Ethereum stack. - EVM and API: By building on top of existing Ethereum stacks; we inherit any improvements made to the open-source codebases of EVM and supporting libraries. See [Solidity-Smart Contract Language](../smart-contract/solidity-smart-contract-language.md), and [Migrating Ethereum App to Klaytn](../dapp/tutorials/migrating-ethereum-app-to-klaytn.md). - Core Development Contribution: Supporting Ethereum equivalence translates most to the mutual benefit to both the Klaytn and Ethereum ecosystems. The majority of Ethereum Improvement Proposals (EIPs) could be migrated and adopted to the Klaytn core development agenda, and in turn Klaytn Improvement Proposals (KIPs) could contribute to the advancement of Ethereum and EVM. ​ **Open Source Infrastructure and Package** - Primary Infrastructure: tool sets for end-to-end blockchain integration and building. It includes SDKs and smart contract libraries, Wallets and chain explorers, Distributed storage solutions, Oracle support and Bridges. - Secondary Infrastructure: ecosystem for supporting products and services. It includes Integration/abstraction services, Stablecoin integrations, DAOs, NFT Marketplaces, DEX and DeFi and Traditional finance interfaces. ​ ​
### Enhanced User Experience <a id="usability-in-transaction"></a>
​ **Usability in Transaction** - Ability to delegate the user's transaction fee to the application operator. - See [Fee Delegation](design/transactions/README.md#fee-delegation). Application operator can decide the amount of subsidy for each transaction and can implement more flexible business models such as freemium or subscription. Fee delegation can effectively lower the user acquisition barrier. ​ ​
### A Full-suite, Protocol-level Eco Fund <a id="contribution-reward"></a>
- Klaytn is the first and the largest example in which the incentives supporting the ecosystem are encoded in an on-chain protocol tokenomics. 66% of the newly minted tokens are reinvested in the ecosystem.
- See [Klaytn Improvement Reserve](design/token-economy#klaytn-improvement-reserve.md) and [Klaytn Growth Fund](design/token-economy#klaytn-growth-fund.md). ​ ​
### Community Co-Building <a id="community-co-building"></a>
- In addition to the protocol design, Klaytn will expands its territory through community co-building; it includes a various kinds of communities such as game guilds, investment DAOs, community DAOs, alliance with global players, etc. ​
***
​ Lastly, the grounding rules, ​
{% hint style="success" %}
Klaytn does not sacrifice blockchain’s core characteristics to achieve the above-mentioned enhancement, and the protocol stays stable with strongly committed stakeholders.
{% endhint %}
​
### Transparency, Security and Decentralization <a id="transparency-security-and-decentralization"></a>
​ - Everyone can request transactions and retrieve and validate every transaction execution result on the blockchain. - Klaytn is a decentralized network and no single malicious node breaks the data integrity. ​
### Governance by DAOs, Builders and Enterprises Realizes Decentralization with Stability <a id="governance-by-trusted-entities"></a>
​ - In addition to the current traditional enterprises as Klaytn Governance Council (GC), by bringing more decentralized entities such as DAOs and builders into the GC, we are opening up the potential to rebuild the entire Klaytn governance structure in an unprecedented way with hundreds of governance participants. ​ ​ ​ ​
