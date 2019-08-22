# Token Economy

## Overview

Klaytn’s token economy is designed to create sustainable funding structures for powering its ecosystem operations, growth initiatives, and strategic investments. Many public blockchain projects have monetary systems that solely incentivize their node operators \(miners or block producers\), focusing only on the technical aspect of network maintenance. However, such designs miss out on the importance of incentivizing other types of participants who contribute to the growth of the network’s token economy or invest in long-term growth prospects. In contrast, Klaytn’s token economy is designed to compensate more diverse forms of contributions from a wider range of participants, and has built-in funding structure to procure sustained resources to fuel future growth initiatives and strategically sourced investment projects in addition to maintaining its blockchain nodes. For detailed information on Klaytn token economy, please refer to [Token Economy & Governance Paper](https://www.klaytn.com/technology).

## Funding Structure

Klaytn’s funding structure runs continuously with Klaytn network’s block generation. With every new block, newly issued KLAY and the sum of transaction fees used in the block \(collectively called “block reward”\) are aggregated and distributed to the following three destination accounts in accordance to the predetermined ratio:

* Klaytn Governance Council Reward: 34%
* Proof of Contribution \(PoC\): 54%
* Klaytn Improvement Reserve \(KIR\): 12%

At the time of Klaytn mainnet launch, 9.6 KLAY will be minted per block. This implies that approximately 300 million KLAY will be minted annually, which is equivalent to 3% annual inflation against the 10 billion KLAY issued at genesis \(the annual inflation rate is subject to change through the Klaytn Governance Process\). Transaction fee is charged per OPCODE and is metered according to the transaction fee table. For detailed information on the transaction fee table, please refer to Klaytn Docs \(to be made available on [https://docs.klaytn.com/](https://docs.klaytn.com/)\).

## Klaytn Governance Council Reward

Klaytn Governance Council is the collective group of Core Cell Operators \(CCOs\). Council members are responsible for maintaining Core Cells \(CCs\), which makes the Council an essential body in the Klaytn ecosystem responsible for providing the underlying infrastructure. To become a Council member, the candidate must undergo a qualification review by the Klaytn Governance Process and must stake at least 5 million KLAY. The Klaytn Governance Council Reward is a structure for incentivizing Council members to continue to provide a stable foundation for the Klaytn ecosystem.

### Klaytn Governance Council Reward Mechanism

For every block, a Committee composed of randomly selected Council members is formed. Each Committee has one member assigned the role of Proposer; all other Committee members assume the role of Validators. When a block is successfully created and added to the Klaytn blockchain, the Proposer of the said block is rewarded with 100% of the block reward. The probability of a Council member being selected a Proposer is proportional to the amount of KLAY staked by the member; that is, the more KLAY a member stakes, the more likely that the member will be selected as a Proposer and potentially claim the block reward.

As long as the minimum 5 million KLAY staking requirement is met, Klaytn Governance Council members can freely stake or unstake his or her own KLAY. Staking information is updated every 86,400 blocks, and newly staked KLAY comes info effect two update cycles later from when the staking is completed. Withdrawing staked KLAY requires one week of delay to prevent malicious members from immediately exiting.

To prevent monopolized claiming of Klaytn Governance Council Reward by small groups of highly invested Council members, Gini coefficient may be used to adjust the effective amount of staked KLAY. The application formula is as follows:

* _Adjusted staking amount = \(Council member's staking amount\)^\(1/1+G\)_

### Penalty for Misbehaving Council Members

A Council member may be subject to penalties for conducting misbehaviors defined below. In the future, more penalty rules can be established and refined through the Klaytn Governance Process.

Causing Safety Failure:

* A Council member selected as Proposer may not create more than one block in the same height
* A Council member selected as Proposer may not intentionally omit certain transactions

Causing Liveness Failure:

* A Council member selected as Proposer must create a valid block
* A Council member selected as Validator must validate the block proposed by the Proposer

## Proof of Contribution

Klaytn’s token economy depends on economic entities to spontaneously engage in economic activities, creating value and exchanging them with each other in the market. Such activities collectively build up an economy of circulating wealth that drives the economic growth of the entire ecosystem. Klaytn incentivizes and stimulates participants in its economy by evaluating their contributions and compensating them via a transparent evaluation mechanism called Proof of Contribution \(PoC\).

Proof of Contribution is designed to compensate all participants in the Klaytn token economy that makes meaningful contributions. However, currently, PoC primarily focuses on two types of economic entities: service providers \(providing blockchain application services to end-users\) and end-users \(consumers of service provider’s offerings\).

### Service Providers

In order to achieve mass adoption of blockchain technology, it is important to implement and leverage widely popular, massive blockchain applications - or Killer BApps - to create a solid foundation of end-users who discover and enjoy value from such apps in their daily lives. Service providers play a key role in Klaytn economy as entities on the supply-side; they not only create supply of services to satisfy end-users, but they also serve as channels of new user acquisition and as anchors of user engagement. Acknowledging their contributions, Klaytn is designing PoC as an incentivizing mechanism for service providers to effortlessly onboard the Klaytn platform and enjoy sustained support as they continue to grow in its ecosystem.

### End-Users

The extended imbalance between supply and demand makes economies unsustainable, an observation which places end-users on a key position within Klaytn token economy. End-users are the fundamental driving force behind economic growth as the primary demand-side entities, creating valuable market signals by carefully selecting and using services and sharing reviews with each other. Recognizing the value of end-users, Klaytn is reviewing designs to make PoC an incentivizing mechanism for their contributions to growing the Klaytn ecosystem.

## Proof of Contribution Operation Plan

### Overview

Only once service onboarding begins can users join the platform. Therefore, we will focus on assessing and rewarding service contributions during the early operation period of the platform.

| Phase 1 |  |
| :--- | :--- |
| **Application** | Services who want to participate in Proof of Contribution must file an application.  Announcement will be made by email when Proof of Contribution scheme starts.  You can register yourself on the [Proof of Contribution waiting list here](https://klaytn.typeform.com/to/uKlY16). |
| **Basic Requirements** | \(1\) Services are required to set up fee delegation structure for users. [Checkout Fee Delegation Example here.](../../bapp/tutorials/fee-delegation-example.md)   \(2\) Services must be completed onboarding Cypress \(Klaytn Mainnet\). To start onboarding, please [request fee delegation key here](https://klaytn.typeform.com/to/op3xWQ). |
| **Resources** | Maximum 80,000,000 KLAY will be distributed to service providers. \(Specific fund scale is subject to change based on block-creation and transaction fee collection situations.\) |
| **Reward Schedule** | Service Providers will be rewarded on a weekly basis - every Wednesday. Specific amount of reward will be computed based on the blockchain data collected from last week's Wednesday 00:00 ~ Tuesday 23:59 \(UTC+00:00\). |
| **Policy** | **ON ABUSING** : Services whose performance is found to be fabricated will be disqualified. |
| **Notice** | BApp Reward & KLAY BApp Reward will be operated after a significant number of users have flown in. Platform status will be continuously monitored and the announcement will be made when the condition is satisfied. |

### Incentive Programs

|  | 1. BApp Reward | 2. KLAY BApp Reward |
| :--- | :--- | :--- |
| Requirements | • Implementation of TX fee delegation • Smart contract implementation | • Implementation of TX fee delegation • Smart contract implementation • Accepts KLAY payments |
| Reward | Top N services will be rewarded. BApps are ranked based on the following two metrics: • Average daily active users \(DAU\) • Delegated transaction fee amount | Top M services will be rewarded. KLAY BApps are ranked based on the following three metrics: • Average daily active users \(DAU\) • Delegated transaction fee amount • KLAY transaction volume |

#### 1. BApp Reward

Incentive scheme for Services which are implemented on Klaytn in the form of smart contracts. Service providers whose services are rank above a certain watermark as set by the criteria listed below will receive additional rewards each week. All services must meet minimum requirements to receive rewards.

* Average daily active users \(DAU\): average of daily distinct number of accounts that sent at least 1 transaction to smart contracts of the service.
* Delegated transaction fee amount: total amount of transaction fee that service provider paid for the user.

The total reward amount as well as the number of beneficiaries are designed to grow proportionally on a step-by-step basis along with the overall growth of Klaytn.

#### 2. KLAY BApp Reward

Additional incentive scheme only for KLAY BApps, namely those that accept KLAY as a direct means of using their services. Since those who use KLAY as the payment method contribute more directly to the token economy, service providers whose services are rank above a certain watermark as set by the criteria listed below will receive additional rewards each week. Note that only transactions with KLAY value transfer are subject to evaluation. All services must meet minimum requirements to receive rewards.

* Average daily active users \(DAU\): average of daily distinct number of accounts that sent at least 1 transaction with KLAY value transfer to smart contracts of the service.
* Delegated transaction fee amount: total amount of transaction fee that service provider paid for the user.
* KLAY transaction volume: total amount of KLAY that has been sent to smart contracts of the service.

The total reward amount as well as the number of beneficiaries are designed to grow proportionally on a step-by-step basis along with the overall growth of Klaytn.

## Klaytn Improvement Reserve

As technology continues to improve and the needs of users change over time, our platform must have the ability to quickly adapt to any new circumstance that arises. To respond to such changes, we must not only work on services, but also undergo various activities to maintain Klaytn’s ecosystem. For instance, research and development for better technology, or projects that contribute to the overall growth of the ecosystem may be part of these activities. These activities are necessary for Klaytn to progress continuously. Therefore, the Klaytn Improvement Reserve \(KIR\) will be managed on the platform for the investment and research on the Klaytn ecosystem.

The spending necessary to set up the ecosystem can be categorized as following.

* Platform: Support for infrastructure, research and development, and the creation of a durable protocol
* Tools: Create a better development environment to enhance developer experience
* Community: Create programs to encourage participation in Klaytn’s ecosystem \(community events, meetups, hackathons, etc.\)
* Others

KIR proposals can be created by any participant in Klaytn’s ecosystem. KIR spending proposals will be processed per KIR Governance Process. Refer to the [Klaytn Improvement Reserve Governance Process](governance.md#klaytn-improvement-reserve-governance-process) section for more information on the procedure. Once a spending proposal has passed, KLAY will be distributed periodically, from a predetermined total amount, based on the project’s level of progress. This process may change based on the project size but is planned to be processed monthly.

