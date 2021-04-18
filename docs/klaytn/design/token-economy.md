# Token Economy <a id="token-economy"></a>

## Overview <a id="overview"></a>

Klaytn’s token economy is designed to create sustainable funding structures for powering its ecosystem operations, growth initiatives, and strategic investments. Many public blockchain projects have monetary systems that solely incentivize their node operators \(miners or block producers\), focusing only on the technical aspect of network maintenance. However, such designs miss out on the importance of incentivizing other types of participants who contribute to the growth of the network’s token economy or invest in long-term growth prospects. In contrast, Klaytn’s token economy is designed to compensate more diverse forms of contributions from a wider range of participants, and has built-in funding structure to procure sustained resources to fuel future growth initiatives and strategically sourced investment projects in addition to maintaining its blockchain nodes. For detailed information on Klaytn token economy, please refer to [Token Economy & Governance Paper](https://www.klaytn.com/Klaytn_Token_Economics_and_Governance_Paper_V1.01.pdf).

## Funding Structure <a id="funding-structure"></a>

Klaytn’s funding structure runs continuously with Klaytn network’s block generation. With every new block, newly issued KLAY and the sum of transaction fees used in the block \(collectively called “block reward”\) are aggregated and distributed to the following three destination accounts in accordance to the predetermined ratio:

* Klaytn Governance Council Reward: 34%
* Proof of Contribution \(PoC\): 54%
* Klaytn Improvement Reserve \(KIR\): 12%

At the time of Klaytn mainnet launch, 9.6 KLAY will be minted per block. This implies that approximately 300 million KLAY will be minted annually, which is equivalent to 3% annual inflation against the 10 billion KLAY issued at genesis \(the annual inflation rate is subject to change through the Klaytn Governance Process\). Transaction fee is charged per OPCODE and is metered according to the transaction fee table. For detailed information on the transaction fee table, please refer to [Transaction Fees](transaction-fees.md).

## Klaytn Governance Council Reward <a id="klaytn-governance-council-reward"></a>

Klaytn Governance Council is the collective group of Core Cell Operators \(CCOs\). Council members are responsible for maintaining Core Cells \(CCs\), which makes the Council an essential body in the Klaytn ecosystem responsible for providing the underlying infrastructure. To become a Council member, the candidate must undergo a qualification review by the Klaytn Governance Process and must stake at least 5 million KLAY. The Klaytn Governance Council Reward is a structure for incentivizing Council members to continue to provide a stable foundation for the Klaytn ecosystem.

### Klaytn Governance Council Reward Mechanism <a id="klaytn-governance-council-reward-mechanism"></a>

For every block, a Committee composed of randomly selected Council members is formed. Each Committee has one member assigned the role of Proposer; all other Committee members assume the role of Validators. When a block is successfully created and added to the Klaytn blockchain, the Proposer of the said block is rewarded with 100% of the block reward. The probability of a Council member being selected a Proposer is proportional to the amount of KLAY staked by the member; that is, the more KLAY a member stakes, the more likely that the member will be selected as a Proposer and potentially claim the block reward.

As long as the minimum 5 million KLAY staking requirement is met, Klaytn Governance Council members can freely stake or unstake his or her own KLAY. Staking information is updated every 86,400 blocks, and newly staked KLAY comes info effect two update cycles later from when the staking is completed. Withdrawing staked KLAY requires one week of delay to prevent malicious members from immediately exiting.

To prevent monopolized claiming of Klaytn Governance Council Reward by small groups of highly invested Council members, Gini coefficient may be used to adjust the effective amount of staked KLAY. The application formula is as follows:

* _Adjusted staking amount = \(Council member's staking amount\)^\(1/1+G\)_

### Penalty for Misbehaving Council Members <a id="penalty-for-misbehaving-council-members"></a>

A Council member may be subject to penalties for conducting misbehaviors defined below. In the future, more penalty rules can be established and refined through the Klaytn Governance Process.

Causing Safety Failure:

* A Council member selected as Proposer may not create more than one block in the same height
* A Council member selected as Proposer may not intentionally omit certain transactions

Causing Liveness Failure:

* A Council member selected as Proposer must create a valid block
* A Council member selected as Validator must validate the block proposed by the Proposer

## Proof of Contribution <a id="proof-of-contribution"></a>

Klaytn’s token economy depends on economic entities to spontaneously engage in economic activities, creating value and exchanging them with each other in the market. Such activities collectively build up an economy of circulating wealth that drives the economic growth of the entire ecosystem. Klaytn incentivizes and stimulates participants in its economy by evaluating their contributions and compensating them via a transparent evaluation mechanism called Proof of Contribution \(PoC\).

Proof of Contribution is designed to compensate all participants in the Klaytn token economy that makes meaningful contributions. However, currently, PoC primarily focuses on two types of economic entities: service providers \(providing blockchain application services to end-users\) and end-users \(consumers of service provider’s offerings\).

### Service Providers <a id="service-providers"></a>

In order to achieve mass adoption of blockchain technology, it is important to implement and leverage widely popular, massive blockchain applications - or Killer BApps - to create a solid foundation of end-users who discover and enjoy value from such apps in their daily lives. Service providers play a key role in Klaytn economy as entities on the supply-side; they not only create supply of services to satisfy end-users, but they also serve as channels of new user acquisition and as anchors of user engagement. Acknowledging their contributions, Klaytn is designing PoC as an incentivizing mechanism for service providers to effortlessly onboard the Klaytn platform and enjoy sustained support as they continue to grow in its ecosystem.

### End-Users <a id="end-users"></a>

The extended imbalance between supply and demand makes economies unsustainable, an observation which places end-users on a key position within Klaytn token economy. End-users are the fundamental driving force behind economic growth as the primary demand-side entities, creating valuable market signals by carefully selecting and using services and sharing reviews with each other. Recognizing the value of end-users, Klaytn is reviewing designs to make PoC an incentivizing mechanism for their contributions to growing the Klaytn ecosystem.

## Proof of Contribution Pilot Test Operation Plan <a id="proof-of-contribution-operation-plan"></a>

Klaytn will further develop the PoC policy through pilot testing so that PoC can be implemented stably for all participants in Klaytn. This pilot test will be conducted on a smaller scale as it will be the first external experiment of PoC, which can affect the early stages of the Klaytn network. The instructions will be updated according to the result of the pilot test.

### Overview <a id="overview"></a>

The first PoC Pilot test will be implemented as below.

| Phase 1 |  |
| :--- | :--- |
| **Target** | Service providers who have applied for this pilot test and passed internal review |
| **Period** | 2020.09 ~ 2020.11 |
| **Basic Requirements** | \(1\) Services which have been completed onboarding Cypress (Klaytn Mainnet), \(2\) allow their customer to interact with smart contract \(3\) and are free from illegal issues. |
| **Resources** | Maximum 600,000 KLAY will be distributed to service providers. |
| **Reward Schedule** | Service providers will be rewarded after finishing each round which is bi-weekly basis. Specific amount of reward will be calculated based on the blockchain data collected during a round. |
| **Disqualification Policy** | Service providers who performed inappropriate activities such as manipulating data about contribution indicators will be disqualified permanently. |

### Incentive Programs <a id="incentive-programs"></a>

In this pilot test, service providers’ contribution is measured at each round (2 weeks), and rewards are distributed based on their level of contribution. The contribution metrics and reward distribution process are defined as follows.

#### 1. Contribution metrics

During a round, following data will be collected based on the transaction on Klaytn blockchain(Cypress).
* No. of New Users: The no. of new unique accounts(EOAs) that send at least one transaction to smart contracts(of services) during the corresponding round
* No. of Retained Users: The no. of returning unique accounts(EOAs) that send at least transactions to a smart contracts(of services) during the corresponding round
* No. of Transactions: The no. of transactions that execute a service smart contract during the corresponding round
* KLAY Volume: The total KLAY volume transmitted to a service smart contract during the corresponding round.

#### 2. Reward distribution process

Service providers receive rewards through three stages as follows, based on data collected during a round.

1. Applying minimum threshold and calculating contribution: Contribution measurement and compensation payments are made only to service providers that have passed the minimum standard \(e.g. inflow of at least 100 new users\). The contribution is measured based on the four metrics and their weights ​​mentioned above.

2. Calculating the total reward amount of compensation for a round: The total reward amount per round is measured based on the  number of \(new / retained\) user inflows. The total reward amount per round cannot exceed the total reward pool.

3. Distributing compensations: Based on the previously calculated contribution, each service provider's contribution rate and ranking are determined. The service providers will eventually receive a reward based on the contribution rate and ranking.

This system is designed to help service providers get more rewards as they strive to attract users and develop the services.

## Klaytn Improvement Reserve <a id="klaytn-improvement-reserve"></a>

As technology continues to improve and the needs of users change over time, our platform must have the ability to quickly adapt to any new circumstance that arises. To respond to such changes, we must not only work on services, but also undergo various activities to maintain Klaytn’s ecosystem. For instance, research and development for better technology, or projects that contribute to the overall growth of the ecosystem may be part of these activities. These activities are necessary for Klaytn to progress continuously. Therefore, the Klaytn Improvement Reserve \(KIR\) will be managed on the platform for the investment and research on the Klaytn ecosystem.

The spending necessary to set up the ecosystem can be categorized as following.



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
