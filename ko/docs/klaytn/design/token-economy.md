# 토큰 이코노미 <a id="token-economy"></a>

## 개요 <a id="overview"></a>

Klaytn의 토큰 이코노미는 생태계 운영, 성장 전략, 전략적 투자에 동력을 제공할 수 있도록 지속적인 펀딩이 가능한 구조로 설계되었습니다. 많은 퍼블릭 블록체인 프로젝트는 네트워크 유지의 기술적 측면에만 초점을 맞춰서 노드 운영자(채굴자 또는 블록 생산자)에게만 인센티브를 주는 토큰 이코노미를 가지고 있습니다. 그러나, 이러한 디자인은 네트워크의 성장에 기여하거나 장기 성장 가능성에 투자하는 다른 참여자들에게 인센티브를 제공하지 못합니다. 하지만, 클레이튼의 토큰 이코노미는 광범위한 참여자들이 더 다양한 형태의 기여에 대해 보상을 받을 수 있도록 설계되었습니다. 블록체인 노드를 유지하는 것 외에도 전략적으로 투자를 받은 프로젝트들과 그들의 미래 성장 전략에 지속해서 자원을 공급할 수 있는 펀딩 구조가 내장되어있습니다. Klaytn의 토큰 이코노미에 대해 더 자세한 정보를 알고 싶다면, [토큰 이코노미 & 거버넌스 페이퍼](https://www.klaytn.com/technology)를 참고해주세요.

## 펀딩 구조(Funding Structure)<a id="funding-structure"></a>

Klaytn의 펀딩 구조는 Klaytn 네트워크의 블록 생성과 함께 지속적으로 운영됩니다. 모든 신규 블록에서 새로 발행된 KLAY와 블록\(총칭 "블록 보상" \)에 사용된 트랜잭션 수수료 합계는 사전 결정된 비율에 따라 다음 세 개의 대상 계정에 집계 및 배포됩니다.

* Klaytn 거버넌스 카운슬 보상: 34%
* 기여증명 \(PoC\) : 54 %
* Klaytn 개선 준비금 \(KIR\) : 12 %

Klaytn 메인넷 출시 시점에는 블록당 9.6 KLAY가 발행됩니다. 따라서, 매년 약 3억개의 KLAY가 발행될 것으로 예상할 수 있습니다. 이는 처음에 발행된 100억 KLAY 대비 연간 3 %의 인플레이션이 일어나는 것과 같습니다(연간 인플레이션율은 Klaytn Governance Process를 통해 변경 될 수 있습니다). 트랜잭션 수수료는 OPcode당 부과되며, 트랜잭션 수수료 표에 따라 책정됩니다. 트랜잭션 수수료 표에 대해서 더 많은 정보가 필요하면 [트랜잭션 수수료](transaction-fees.md)를 참고해주세요.

## Klaytn 거버넌스 카운슬 보상 <a id="klaytn-governance-council-reward"></a>

Klaytn 거버넌스 카운슬은 코어 셀 운영자\(CCOs\) 들의 그룹입니다. 카운슬 구성원은 코어 셀 \(CCs\)을 유지해야 할 책임이 있으며, 이 카운슬은 Klaytn 생태계에서 기본 인프라 제공을 담당하는 필수 기관이됩니다. 카운슬 멤버가 되려면 Klaytn Governance Process에서 자격 검토를 받아야하며 최소 5백만 KLAY를 스테이크해야합니다. Klaytn 거버넌스 카운슬 보상은 카운슬 멤버들이 Klaytn 생태계의 안정적인 기반이 될 수 있도록 인센티브를 제공하는 구조입니다.

### Klaytn 거버넌스 카운슬 보상 메커니즘 <a id="klaytn-governance-council-reward-mechanism"></a>

모든 블록마다 무작위로 선정된 카운슬 멤버로 이루어진 위원회가 구성됩니다. 각 위원회는 한 멤버가 제안자(Proposer) 역할을 할당받습니다. 다른 모든 위원회 위원은 검증자(Validator)의 역할을 맡습니다. 블록이 성공적으로 생성되어 Klaytn 블록체인에 추가되면, 해당 블록의 제안자에게는 블록 보상의 100%가 제공됩니다. 카운슬 멤버가 제안자로 선정될 확률은 회원이 스테이크한 KLAY의 양에 비례합니다. 즉, 더 많은 KLAY를 스테이크 할수록 멤버가 제안자로 선정되어 블록보상을 받을 가능성이 커집니다.

요구사항인 최소 500만 KLAY 스테이킹이 충족되는 한 Klaytn 거버넌스 카운슬 멤버는 자신의 KLAY를 자유롭게 스테이크하거나 언스테이크(unstake) 할 수 있습니다. 스테이킹 정보는 86,400블록마다 업데이트되며, 새로 스테이크 된 KLAY는 스테이킹이 완료된 후 두 번의 업데이트 주기 이후에 효력이 생깁니다. 스테이크 된 KLAY를 인출하는 일은 악의적인 멤버가 즉시 빠져나가지 못하도록 일주일 정도 지연됩니다.

많이 투자한 소규모 그룹의 카운슬 멤버들이 Klaytn 거버넌스 카운슬 보상을 독점하는 것을 막기 위해 지니 계수(Gini coefficient)가 이용되어 스테이크 된 Klay의 유효 수량을 조정할 수 있습니다. 적용 공식은 다음과 같습니다.

* _조정된 스테이킹 양(Adjusted staking amount) = \(카운슬 멤버의 스테이킹 양\)^\(1/1+G\)_

### 잘못된 행동을 하는 카운슬 멤버에 대한 처벌 <a id="penalty-for-misbehaving-council-members"></a>

카운슬 멤버는 아래와 같은 잘못된 행동을 하면 처벌의 대상이 될 수 있습니다. 앞으로 Klaytn Governance Process를 통해 더 많은 페널티 규칙이 수립되고 수정될 수 있습니다.

Safety Failure를 일으키는 경우:

* 제안자로 선택된 카운슬 멤버는 같은 height에 두 개 이상의 블록을 만들 수 없습니다.
* 제안자로 선정된 카운슬 멤버는 의도적으로 특정 트랜잭션을 제외할 수 없습니다.

Liveness Failure를 일으키는 경우:

* 제안자로 선택된 카운슬 멤버는 유효한 블록을 생성해야 합니다.
* 검증자로 선정된 카운슬 멤버는 제안자가 제안한 블록을 검증해야합니다.

## 기여증명(Proof of Contribution)<a id="proof-of-contribution"></a>

Klaytn의 토큰 이코노미는 경제 활동에 자발적으로 참여하여 가치를 창출하고 시장에서 가치를 교환하는 경제 주체들에 의해 지탱됩니다. 이런 활동들이 모여 자산이 순환하는 경제를 구축하고, 전체 생태계의 경제적인 성장을 이끕니다. Klaytn은 기여도를 평가하고 기여증명 \(PoC\)이라는 투명한 평가 메커니즘을 통해 참여자들을 보상함으로써 이코노미 참여자들에게 인센티브를 제공하고 자극합니다.

기여증명은 의미 있는 기여를 하는 Klaytn 토큰 이코노미의 모든 참가자를 보상하기 위해 디자인되었습니다. 그러나, 현재 PoC는 주로 두 가지 경제 주체에 초점을 두고 있습니다. 하나는 서비스 제공 업체 \(사용자에게 블록체인 응용 프로그램 서비스를 제공하는)이고, 또 다른 하나는 사용자\(서비스 제공 업체의 서비스를 사용하는 소비자\)입니다.

### 서비스 제공자(Service Providers)<a id="service-providers"></a>

블록체인 기술이 대중화되려면 대규모 블록체인 애플리케이션 또는 Killer BApp이 구현되고 널리 활용되는 것이 중요합니다. 그러면 일상생활 속에서 그런 앱들을 통해 가치를 발견하고 즐기는 사용자층이 두터워질 것입니다. 서비스 제공자는 공급측의 주체로서 Klaytn 이코노미에서 핵심적인 역할을 합니다. 서비스 제공자는 사용자를 만족시키는 서비스를 공급할 뿐만 아니라 새로운 사용자 확보 채널 및 사용자 참여의 앵커 역할도 합니다. 서비스 제공자들의 기여를 알기 때문에, Klaytn은 서비스 제공자들이 쉽게 Klaytn 플랫폼으로 유입되고 생태계가 성장함에 따라 지속적인 지원을 받을 수 있도록 인센티브를 제공하는 PoC를 디자인했습니다.

### 사용자(End-Users)<a id="end-users"></a>

수요와 공급 사이의 불균형이 확대되면 경제가 지속 가능하지 않습니다. 따라서, 사용자는 Klaytn 토큰 이코노미 내에서 중요한 위치를 차지합니다. 사용자는 주요한 수요 주체로서 경제적 성장을 이끄는 근본적인 원동력입니다. 사용자는 서비스를 신중하게 선택하고, 사용하며, 리뷰를 공유함으로써 귀중한 시장 신호(Market signal)를 만듭니다. Klaytn은 사용자의 가치를 인식하여, PoC가 Klaytn 생태계 성장에 기여하는 바에 따라 사용자에게 보상하는 인센티브 메커니즘이 될 수 있도록 검토하고 있습니다.

## Proof of Contribution Pilot Test Operation Plan <a id="proof-of-contribution-operation-plan"></a>

Klaytn will further develop the PoC policy through pilot testing so that PoC can be implemented stably for all participants in Klaytn. This pilot test will be conducted on a smaller scale as it will be the first external experiment of PoC, which can affect the early stages of the Klaytn network. The instructions will be updated according to the result of the pilot test.

### 개요 <a id="overview"></a>

The first PoC Pilot test will be implemented as below.

| Phase 1                     |                                                                                                                                                                                             |
|:--------------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Target**                  | Service providers who have applied for this pilot test and passed internal review                                                                                                           |
| **Period**                  | 2020.09 ~ 2020.11                                                                                                                                                                           |
| **Basic Requirements**      | \(1\) Services which have been completed onboarding Cypress (Klaytn Mainnet), \(2\) allow their customer to interact with smart contract \(3\) and are free from illegal issues.      |
| **Resources**               | Maximum 600,000 KLAY will be distributed to service providers.                                                                                                                              |
| **Reward Schedule**         | Service providers will be rewarded after finishing each round which is bi-weekly basis. Specific amount of reward will be calculated based on the blockchain data collected during a round. |
| **Disqualification Policy** | Service providers who performed inappropriate activities such as manipulating data about contribution indicators will be disqualified permanently.                                          |

### 인센티브 프로그램 <a id="incentive-programs"></a>

In this pilot test, service providers’ contribution is measured at each round (2 weeks), and rewards are distributed based on their level of contribution. The contribution metrics and reward distribution process are defined as follows.

#### 1. Contribution metrics

During a round, following data will be collected based on the transaction on Klaytn blockchain(Cypress).
* No. of New Users: The no. of new unique accounts(EOAs) that send at least one transaction to smart contracts(of services) during the corresponding round
* No. of Retained Users: The no. of returning unique accounts(EOAs) that send at least transactions to a smart contracts(of services) during the corresponding round
* No. of Transactions: The no. of transactions that execute a service smart contract during the corresponding round
* KLAY Volume: The total KLAY volume transmitted to a service smart contract during the corresponding round.

#### 2. Reward distribution process

Based on the data collected during a round, a service provider receives the rewards in three steps as shown below.

* 1st step - Passing minimum threshold and calculating service provider’s contribution: To be rewarded, service providers should meet the given minimum threshold. The service providers’ contribution who belong to a specific standard (e.g. inflow of more than 100 new users) will be measured based on the four indicator values ​​mentioned above and the weight for each indicator.

* 2nd step - Calculating aggregate incentive amount per round: The total compensation amount for a particular round varies based on the total number of user (new/existing) inflows. As there is upper limit for total reward amount, the PoC compensation pool is not going to run out of.

* 3rd step - Distributing compensation: Based on the previously calculated contribution, each service provider's contribution rate and ranking are determined. The service providers will eventually receive a reward based on the contribution rate and ranking.

This method of distributing rewards is designed to help service providers get more rewards as they strive to attract users and develop the services.

--------------------------------------------------

Service providers receive rewards through three stages as follows, based on data collected during a round.

1. Applying minimum threshold and calculating contribution: Contribution measurement and compensation payments are made only to service providers that have passed the minimum standard \(e.g. inflow of at least 100 new users\). The contribution is measured based on the four metrics and their weights ​​mentioned above.

2. Calculating the total reward amount of compensation for a round: The total reward amount per round is measured based on the  number of \(new / retained\) user inflows. The total reward amount per round cannot exceed the total reward pool.

3. Distributing compensations: Based on the previously calculated contribution, each service provider's contribution rate and ranking are determined. The service providers will eventually receive a reward based on the contribution rate and ranking.

This system is designed to help service providers get more rewards as they strive to attract users and develop the services.

## Klaytn 개선 준비금(Klaytn Improvement Reserve)<a id="klaytn-improvement-reserve"></a>

As technology continues to improve and the needs of users change over time, our platform must have the ability to quickly adapt to any new circumstance that arises. To respond to such changes, we must not only work on services, but also undergo various activities to maintain Klaytn’s ecosystem. For instance, research and development for better technology, or projects that contribute to the overall growth of the ecosystem may be part of these activities. These activities are necessary for Klaytn to progress continuously. Therefore, the Klaytn Improvement Reserve \(KIR\) will be managed on the platform for the investment and research on the Klaytn ecosystem.

The spending necessary to set up the ecosystem can be categorized as following.

* 플랫폼: 인프라, 연구 개발 및 지속가능한 프로토콜 생성 지원
* 툴: 개발자 경험을 향상시키기 위해 더 나은 개발 환경 조성
* 커뮤니티: Klaytn의 생태계 참여를 장려하는 프로그램 \(커뮤니티 이벤트, 모임, 해커 톤 등\).
* 기타

KIR proposals can be created by any participant in Klaytn’s ecosystem. KIR spending proposals will be processed per KIR Governance Process. Refer to the [Klaytn Improvement Reserve Governance Process](governance.md#klaytn-improvement-reserve-governance-process) section for more information on the procedure. Once a spending proposal has passed, KLAY will be distributed periodically, from a predetermined total amount, based on the project’s level of progress. This process may change based on the project size but is planned to be processed monthly.
