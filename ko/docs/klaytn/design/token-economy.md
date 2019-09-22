# 토큰 이코노미

## 개요

Klaytn의 토큰 이코노미는 생태계 운영, 성장 전략, 전략적 투자에 동력을 제공할 수 있도록 지속적인 자금 조달이 가능한 구조로 설계되었습니다. 많은 퍼블릭 블록체인 프로젝트는 네트워크 유지의 기술적 측면에만 초점을 맞춰서 노드 운영자(마이너 또는 블록 생산자)에게만 인센티브를 주는 토큰 이코노미를 가지고 있습니다. 그러나, 이러한 디자인은 네트워크의 성장에 기여하거나 장기 성장 가능성에 투자하는 다른 참여자들에게 인센티브를 제공하지 못합니다. 하지만, 클레이튼의 토큰 이코노미는 광범위한 참여자들이 더 다양한 형태의 기여에 대해 보상을 받을 수 있도록 설계되었습니다. 블록체인 노드를 유지하는 것 외에도 전략적으로 투자를 받은 프로젝트들과 그들의 미래 성장 전략에 지속해서 자원을 공급할 수 있는 자금 조달 구조가 내장되어있습니다. Klaytn의 토큰 이코노미에 대해 더 자세한 정보를 알고 싶다면, [Token Economy & Governance Paper](https://www.klaytn.com/technology)를 참고해주세요.

## 자금 조달 구조(Funding Structure)

Klaytn’s funding structure runs continuously with Klaytn network’s block generation. With every new block, newly issued KLAY and the sum of transaction fees used in the block \(collectively called “block reward”\) are aggregated and distributed to the following three destination accounts in accordance to the predetermined ratio:

* Klaytn Governance Council Reward: 34%
* Proof of Contribution \(PoC\): 54%
* Klaytn Improvement Reserve \(KIR\): 12%

Klaytn 메인넷 출시 시점에는 블록당 9.6 KLAY가 발행됩니다. 따라서, 매년 약 3억개의 KLAY가 발행될 것으로 예상할 수 있습니다. 이는 처음에 발행된 100억 KLAY 대비 연간 3 %의 인플레이션이 일어나는 것과 같습니다(연간 인플레이션율은 Klaytn Governance Process를 통해 변경 될 수 있습니다). 트랜잭션 수수료는 연산자(OPCODE)당 부과되며, 트랜잭션 수수료 표에 따라 책정됩니다. 트랜잭션 수수료 표에 대해서 더 많은 정보가 필요하면 Klaytn Docs \(<https://docs.klaytn.com/>\)를 참고해주세요.

## Klaytn Governance Council Reward

Klaytn Governance Council은 코어 셀 운영자\(CCOs\) 들의 그룹입니다. Council 구성원은 코어 셀 \(CCs\)을 유지해야 할 책임이 있으며, 이 Council은 Klaytn 생태계에서 기본 인프라 제공을 담당하는 필수 기관이됩니다. Council 멤버가 되려면 Klaytn Governance Process에서 자격 검토를 받아야하며 최소 5 백만 KLAY를 스테이크해야합니다. Klaytn Governance Council 보상은 Council 멤버들이 Klaytn 생태계의 안정적인 기반이 될 수 있도록 인센티브를 제공하는 구조입니다.

### Klaytn Governance Council 보상 메커니즘

모든 블록마다 무작위로 선정된 Council 멤버로 이루어진 위원회가 구성됩니다. 각 위원회는 한 멤버가 제안자(Proposer) 역할을 할당받습니다. 다른 모든 위원회 위원은 검증자(Validator)의 역할을 맡습니다. 블록이 성공적으로 생성되어 Klaytn 블록체인에 추가되면, 해당 블록의 제안자에게는 블록 보상의 100%가 제공됩니다. Council member가 제안자로 선정될 확률은 회원이 스테이크한 KLAY의 양에 비례합니다. 즉, 더 많은 KLAY를 스테이크 할수록 멤버가 제안자로 선정되어 블록보상을 받을 가능성이 커집니다.

요구사항인 최소 500만 KLAY 스테이킹이 충족되는 한 Klaytn Governance Council 멤버는 자신의 KLAY를 자유롭게 스테이크하거나 언스테이크(unstake) 할 수 있습니다. 스테이킹 정보는 86,400블록마다 업데이트되며, 새로 스테이크 된 KLAY는 스테이킹이 완료된 후 두 번의 업데이트 주기 이후에 효력이 생깁니다. 스테이크 된 KLAY를 인출하는 일은 악의적인 멤버가 즉시 빠져나가지 못하도록 일주일 정도 지연됩니다.

많이 투자한 소규모 그룹의 Council 멤버들이 Klaytn Governance Council 보상을 독점하는 것을 막기 위해 지니 계수(Gini coefficient)가 이용되어 스테이크 된 Klay의 유효 수량을 조정할 수 있습니다. 적용 공식은 다음과 같습니다.

* *조정된 스테이킹 양(Adjusted staking amount) = \(Council 멤버의 스테이킹 양\)^\(1/1+G\)*

### 잘못된 행동을 하는 Council 멤버에 대한 처벌

Council 멤버는 아래와 같은 잘못된 행동을 하면 처벌의 대상이 될 수 있습니다. 앞으로 Klaytn Governance Process를 통해 더 많은 페널티 규칙이 수립되고 수정될 수 있습니다.

Safety Failure를 일으키는 경우:

* 제안자로 선택된 Council 멤버는 같은 height에 두 개 이상의 블록을 만들 수 없습니다.
* 제안자로 선정된 Council 멤버는 의도적으로 특정 트랜잭션을 제외할 수 없습니다.

Liveness Failure를 일으키는 경우:

* 제안자로 선택된 Council 멤버는 유효한 블록을 생성해야 합니다.
* 검증자로 선정된 Council 멤버는 제안자가 제안한 블록을 검증해야합니다.

## 기여 증명(Proof of Contribution)

Klaytn의 토큰 이코노미는 경제 활동에 자발적으로 참여하여 가치를 창출하고 시장에서 가치를 교환하는 경제 주체들에 의해 지탱됩니다. 이런 활동들이 모여 자산이 순환하는 경제를 구축하고, 전체 생태계의 경제적인 성장을 이끕니다. Klaytn은 기여도를 평가하고 기여 증명 \(PoC\)이라는 투명한 평가 메커니즘을 통해 참여자들을 보상함으로써 이코노미 참여자들에게 인센티브를 제공하고 자극합니다.

기여 증명은 의미 있는 기여를 하는 Klaytn 토큰 이코노미의 모든 참가자를 보상하기 위해 디자인되었습니다. 그러나, 현재 PoC는 주로 두 가지 경제 주체에 초점을 두고 있습니다. 하나는 서비스 제공 업체 \(사용자에게 블록체인 응용 프로그램 서비스를 제공하는)이고, 또 다른 하나는 사용자\(서비스 제공 업체의 서비스를 사용하는 소비자\)입니다.

### 서비스 제공자(Service Providers)

블록체인 기술이 대중화되려면 대규모 블록체인 애플리케이션 또는 Killer BApp이 구현되고 널리 활용되는 것이 중요합니다. 그러면 일상생활 속에서 그런 앱들을 통해 가치를 발견하고 즐기는 사용자층이 두터워질 것입니다. 서비스 제공자는 공급측의 주체로서 Klaytn 이코노미에서 핵심적인 역할을 합니다. 서비스 제공자는 사용자를 만족시키는 서비스를 공급할 뿐만 아니라 새로운 사용자 확보 채널 및 사용자 참여의 앵커 역할도 합니다. 서비스 제공자들의 기여를 알기 때문에, Klaytn은 서비스 제공자들이 쉽게 Klaytn 플랫폼으로 유입되고 생태계가 성장함에 따라 지속적인 지원을 받을 수 있도록 인센티브를 제공하는 PoC를 디자인했습니다.

### 사용자(End-Users)

The extended imbalance between supply and demand makes economies unsustainable, an observation which places end-users on a key position within Klaytn token economy. 사용자는 주요한 수요 주체로서 경제적 성장을 이끄는 근본적인 원동력입니다. 사용자는 서비스를 신중하게 선택하고, 사용하며, 리뷰를 공유함으로써 귀중한 시장 신호(Market signal)를 만듭니다. Klaytn은 사용자의 가치를 인식하여, PoC가 Klaytn 생태계 성장에 기여하는 바에 따라 사용자에게 보상할 수 있는 인센티브 메커니즘이 될 수 있도록 검토하고 있습니다.

## Proof of Contribution Operation Plan

### 개요

Only once service onboarding begins can users join the platform. Therefore, we will focus on assessing and rewarding service contributions during the early operation period of the platform.

| Phase 1                |                                                                                                                                                                                                                                                                                                                                                       |
|:---------------------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Application**        | Services who want to participate in Proof of Contribution must file an application. Announcement will be made by email when Proof of Contribution scheme starts. You can register yourself on the [Proof of Contribution waiting list here](https://klaytn.typeform.com/to/uKlY16).                                                                   |
| **Basic Requirements** | \(1\) Services are required to set up fee delegation structure for users. [Checkout Fee Delegation Example here.](../../bapp/tutorials/fee-delegation-example.md) \(2\) Services must be completed onboarding Cypress \(Klaytn Mainnet\). To start onboarding, please [request fee delegation key here](https://klaytn.typeform.com/to/op3xWQ). |
| **Resources**          | Maximum 80,000,000 KLAY will be distributed to service providers. \(Specific fund scale is subject to change based on block-creation and transaction fee collection situations.\)                                                                                                                                                                   |
| **Reward Schedule**    | Service Providers will be rewarded on a weekly basis - every Wednesday. Specific amount of reward will be computed based on the blockchain data collected from last week's Wednesday 00:00 ~ Tuesday 23:59 \(UTC+00:00\).                                                                                                                           |
| **Policy**             | **ON ABUSING** : Services whose performance is found to be fabricated will be disqualified.                                                                                                                                                                                                                                                           |
| **Notice**             | BApp Reward & KLAY BApp Reward will be operated after a significant number of users have flown in. Platform status will be continuously monitored and the announcement will be made when the condition is satisfied.                                                                                                                                  |


### Incentive Programs

|              | 1. BApp Reward                                                                                                                                                      | 2. KLAY BApp Reward                                                                                                                                                                                    |
|:------------ |:------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Requirements | • Implementation of TX fee delegation  
• Smart contract implementation                                                                                             | • Implementation of TX fee delegation  
• Smart contract implementation  
• Accepts KLAY payments                                                                                                      |
| Reward       | Top N services will be rewarded. BApps are ranked based on the following two metrics:  
• Average daily active users \(DAU\)  
• Delegated transaction fee amount | Top M services will be rewarded. KLAY BApps are ranked based on the following three metrics:  
• Average daily active users \(DAU\)  
• Delegated transaction fee amount  
• KLAY transaction volume |


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