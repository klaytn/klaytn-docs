---
description: >-
  This document explains the key design principles of Klaytn and illustrates how Klaytn differentiates itself from others. 
---

# Why Klaytn <a id="why-klaytn"></a>

Ever since the first bitcoin transaction in 2009, numerous blockchain applications have been developed, but few of them have gained meaningful traction in the market. The major roadblocks to blockchain adoption are: 

- Complexity: Blockchain applications force end-users to understand cryptographic terminology and the inner workings of the system. There are too many steps involved in making the transactions, and all those hex-strings can be pretty overwhelming.
- Poor user experience: The burden of familiarizing with the technology is simply passed on to the users. In many blockchain systems, it is not until a considerable amount of time has passed that a transaction is confirmed. And using the applications often requires repeatedly typing passwords (while there are no password recoveries), and there is a fee for each interaction (the amount being subject to fluctuations each time). 
- Uncertain sustainability: The lack of long-term sustainable business models for public blockchains slows down enterprise adoption. The operation heavily relies on a token economy that incentivizes its stakeholders to act in a sustainable manner, but the model has not been proven in commercial areas yet.

## Klaytn Aims for Mass-Adoption of Blockchain <a id="klaytn-is-aiming-at-mass-adoption-of-blockchain"></a>

The goal of Klaytn is blockchain mass adoption. The foremost design principle is:

{% hint style="success" %}
Giving the same user experience that corresponds to the expectations for web/mobile applications, eventually making the technology invisible to the users.
{% endhint %}

Adhering to this principle, Klaytn has been designed to meet the following requirements:

### High Performance  <a id="high-performance"></a>

- Main chain should handle at least 4,000 TPS. 
- Main chain should guarantee immediate transaction finality with one-second block generation time.
- See [Consensus Mechanism].

### Low Cost  <a id="low-cost"></a>

- End-users should not be burdened with high transaction fees which are beyond the cost required by the traditional system.
- Transaction fees should be stable and be determined by the transaction complexity itself, not by any surrounding factors.
- See [Affordable Smart Contract Execution Cost] and [Transaction Fees]. At the time of writing, sending KLAY requires a fixed fee of 0.000625 KLAY. 

### Usability in User Account Management <a id="usability-in-user-account-management"></a>

- Users should be able to choose their own account address in a human-readable format.
- Users can change the private key of an account without changing the address. 
- See [Human-Readable Address] and [Decoupling of Key Pairs from Addresses].

### Usability in Transaction <a id="usability-in-transaction"></a>

- Ability to delegate the user's transaction fee to the application operator. 
- See [Fee Delegation]. Application operator can decide the amount of subsidy for each transaction and can implement more flexible business models such as freemium or subscription. Fee delegation can effectively lower the user acquisition barrier. 

***

Removing usability hurdles on the platform layer is not enough to drive a mass-adoption. To discover attractive blockchain applications, fostering global developer communities in addition to strategic partnerships with businesses is crucial. 

{% hint style="success" %}
Making a business-friendly environment to promote the development of compelling applications.
{% endhint %}

This entails the following requirements to support application development. 

### Rapid Development <a id="rapid-development"></a>

- The development of application on Klaytn must be straightforward, and the technologies used must follow the open standard to reduce the learning curve.
- See [Solidity-Smart Contract Language], [Truffle], and [Migrating Ethereum App to Klaytn]. As Klaytn Virtual Machine (KLVM) supports Ethereum’s Solidity contract, it becomes much easier to port PoC products on Ethereum to Klaytn for commercial use. Searching development tools and seeking help from a well-established developer community are also much easier. 

### Service-specific Private Chains with Data Anchoring <a id="service-specific-private-chains-with-data-anchoring"></a>

- Klaytn should provide a dedicated solution for private blockchain. The private chain can have its own governance and connect to the Klaytn main chain for data anchoring and asset transfer. 
- See [Service Chain]. Enterprises often want to have their own dedicated execution environment to meet the SLA. With the service chain, an enterprise can maintain an isolated high-performing execution environment that is not affected by other blockchain applications, and also keep their business-sensitive data private. 

### Application Service Layer <a id="application-service-layer"></a>

- Klaytn provides an additional off-chain service layer called Enterprise Proxy (EP) to make blockchain application development and operation easier. Enterprise Proxy will reduce the technical hurdles in using blockchain, and support seamless integration with traditional database and security systems. 
- One of the first EP products will launch in early 2020. It will provide APIs that can be used without much blockchain knowledge and provide business intelligence insights through data analysis. 
- See [Enterprise Proxy] to learn about its strategic direction and the problems it aims to address. 

### Contribution Reward <a id="contribution-reward"></a>

- Applications that contribute to growing Klaytn ecosystem should be fairly rewarded.
- See [Incentive Program]. 

***

Lastly, the ground rules: 

{% hint style="success" %}
Klaytn does not compromise blockchain’s core characteristics to achieve the above-mentioned enhancements, and the platform will stay stable with its strongly committed stakeholders.
{% endhint %}

### Transparency, Security and Decentralization <a id="transparency-security-and-decentralization"></a>

- Everyone can request transactions and retrieve and validate every transaction execution result on the blockchain.
- Klaytn is a decentralized network and no single malicious node breaks the data integrity.

### Governance by Enterprises <a id="governance-by-enterprises"></a>

- The development and the utilization of Klaytn is backed by Kakao, Korea's messaging giant. Trusted entities, globally listed enterprises that manage business whose values range from hundreds of thousands to billions of dollars, together operate the Klaytn nodes and participate in decision making for the development of Klaytn. 



[Decoupling of Key Pairs from Addresses]: design/accounts.md#decoupling-key-pairs-from-addresses
[Multiple Key Pairs and Role-Based Keys]: design/accounts.md#multiple-key-pairs-and-role-based-keys
[Human-Readable Address]: design/accounts.md#human-readable-address-hra
[Consensus Mechanism]: design/consensus-mechanism.md
[Affordable Smart Contract Execution Cost]: design/computation/klaytn-smart-contract.md#affordable-smart-contract-execution-cost
[Transaction Fees]: design/transaction-fees.md
[Fee Delegation]: design/transactions/README.md#fee-delegation
[Service Chain]: scaling-solutions.md#service-chain
[Solidity-Smart Contract Language]: ../smart-contract/solidity-smart-contract-language.md
[Truffle]: ../toolkit/truffle.md
[Migrating Ethereum App to Klaytn]: ../bapp/tutorials/migrating-ethereum-app-to-klaytn.md
[Incentive Program]: design/token-economy.md#incentive-programs
[Enterprise Proxy]: enterprise-proxy.md
