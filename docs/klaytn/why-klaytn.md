---
description: >-
  This document explains how Klaytn is different based on its the key design principles. 
---

# Why Klaytn <a id="why-klaytn"></a>

## Klaytn as a trust layer of metaverse <a id="klaytn-as-a-trust-layer-of-metaverse"></a>
​
Klaytn is built to be the fundamental trust layer for the metaverse, respecting the participation and contribution from all communities, empowering and bringing them together in the new world.
​
The foremost design principle is;
​
{% hint style="success" %}
Helping the pioneers to easily build the applications and organize the community in scalable way. 
{% endhint %}
​
As per this principle, Klaytn has been designed to meet the following requirements:
​
### High Performance <a id="high-performance"></a>
#### Throughput(TPS) and Finality <a id="throughput-and-finality"></a>
- Main chain should handle at least 4,000 TPS. 
- Main chain should guarantee immediate transaction finality with one-second block generation time.
- See [Consensus Mechanism].
​
#### Scalability <a id="scalability"></a>
- Service chain is the default L2 solution for Klaytn 2.0 that is customizable and easily deployable. The service chain can have its own governance and connect to the Klaytn main chain to anchor data or transfer assets. 
- See [Service Chain]. Enterprises or large networks often want to have their own dedicated execution environment. With the service chain, they can maintain an isolated high-performing execution environment that is not affected by other blockchain applications.
- Other scalability solutions will be available in the near future, such as sharding or rollups.
​
### Low Cost  <a id="low-cost"></a>
- End-users should not be burdened with any higher transaction fee beyond what the traditional systems require.
- Transaction fee should be stable and be determined by the transaction complexity itself, and not the surrounding factors.
- See [Affordable Smart Contract Execution Cost] and [Transaction Fees]. For a gas price of 750 ston, a KLAY transfer would incur a fixed cost of 0.01575 KLAY. (21,000 Gas for KLAY transfer x (750 x 10^-9) == 0.01575 KLAY) 
​
### Rapid Development <a id="rapid-development"></a>
#### Ethereum Compatibility <a id="ethereum-compatibility"></a>
- Development Tools: Any tooling that can run on Ethereum will run seamlessly within the Klaytn ecosystem by making Klaytn’s technical stack equivalent, from an interfacing and execution
perspective, to the existing Ethereum stack. New tooling created in the Klaytn ecosystem could be reciprocally adopted within the Ethereum ecosystem.
- EVM and API: By building on top of existing Ethereum stacks we inherit any improvements made to the open-source codebases of EVM and supporting libraries. Supporting such equivalent Opcodes and stack logic in the Klaytn EVM environment would see execution behaviour is guaranteed equivalent; and supporting a set of JSON-RPC APIs with equivalent endpoint payload syntax guarantees full Ethereum interfacing equivalence. See [Solidity-Smart Contract Language], and [Migrating Ethereum App to Klaytn].
- Core Development Contribution: Supporting Ethereum equivalence translates most to the mutual benefit to both the Klaytn and Ethereum ecosystems. The majority of Ethereum Improvement Proposals (EIPs) could be migrated and adopted to the Klaytn core development agenda, and in turn Klaytn Improvement Proposals (KIPs) could contribute to the advancement of Ethereum and EVM. When the development community contributes to one ecosystem, they are indeed contributing to both.
​
#### Open Source Infrastructure and Package <a id="open-source-infrastructure-and-package"></a>
- Primary Infrastructure: tool sets for end-to-end blockchain integration and building. It includes SDKs and smart contract libraries, Wallets and chain explorers, distributed storage solutions, Oracle support and Bridges.
- Secondary Infrastructure: ecosystem for supporting products and services. It includes Integration/abstraction services, Stablecoin integrations, DAOs, NFT Marketplaces, DEX and DeFi and Traditional finance interfaces.
​
### Enhanced User Experience <a id="enhanced-user-experience"></a>
#### Usability in Transaction <a id="usability-in-transaction"></a>
- Ability to transfer user's transaction fee to the application 
- See [Fee Delegation]. Application operator can adjust the amount of subsidy for each transaction and implement more flexible business models such as freemium or subscription. Fee delegation will effectively lower user acquisition barriers.
​
​
### A Full-suite, Protocol-level Eco Fund <a id="contribution-reward"></a>
- Klaytn is the first and the largest example in which the incentives supporting the ecosystem are encoded in an on-chain protocol tokenomics. 66% of the newly minted tokens are reinvested in the ecosystem.
- See [Klaytn Improvement Reserve] and [Klaytn Growth Fund].
​
​
### Community Co-Building <a id="community-co-building"></a>
- In addition to the protocol design, Klaytn will expand its territory through community co-building; it includes kinds of communities such as game guilds, investment DAOs, community DAOs, alliance with global players, etc. 
​
Lastly, the ground rules:
​
{% hint style="success" %}
Klaytn does not sacrifice blockchain’s core characteristics to achieve the above-mentioned enhancements, and the protocol stays stable with strongly committed stakeholders.
{% endhint %}

### Transparency, Security and Decentralization <a id="transparency-security-and-decentralization"></a>
- Anyone can request transactions as well as retrieve and confirm transactions results on the blockchain.
- Klaytn is a decentralized network where no single malicious node can break the data integrity.
​
### Governance by DAOs, Builders and Enterprises Realizes Decentralization with Stability <a id="governance-by-trusted-entities"></a>
- In addition to the current traditional enterprises as Klaytn Governance Council (GC), by bringing more decentralized entities such as DAOs and builders into the GC, we are opening up the potential to rebuild the entire Klaytn governance structure in an unprecedented way with hundreds of governance participants. 

[Decoupling of Key Pairs from Addresses]: design/accounts.md#decoupling-key-pairs-from-addresses
[Multiple Key Pairs and Role-Based Keys]: design/accounts.md#multiple-key-pairs-and-role-based-keys
[Human-Readable Address]: design/accounts.md#human-readable-address-hra
[Consensus Mechanism]: design/consensus-mechanism.md
[Affordable Smart Contract Execution Cost]: design/computation/klaytn-smart-contract.md#affordable-smart-contract-execution-cost
[Transaction Fees]: design/transaction-fees/transaction-fees.md
[Fee Delegation]: design/transactions/README.md#fee-delegation
[Service Chain]: scaling-solutions.md#service-chain
[Solidity-Smart Contract Language]: ../smart-contract/solidity-smart-contract-language.md
[Truffle]: ../toolkit/truffle.md
[Migrating Ethereum App to Klaytn]: ../dapp/tutorials/migrating-ethereum-app-to-klaytn.md
[Incentive Program]: design/token-economy.md
[Klaytn Improvement Reserve]: design/token-economy.md#klaytn-improvement-reserve
[Klaytn Growth Fund]: design/token-economy.md#klaytn-growth-fund
