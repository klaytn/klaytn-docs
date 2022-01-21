# 토큰 이코노미 <a id="token-economy"></a>

## 개요 <a id="overview"></a>

Klaytn의 토큰 이코노미는 플랫폼의 생태계 운영, 성장 계획, 전략적 투자를 지속가능하게 지원하기 위한 구조를 갖추도록 설계되었습니다. 많은 공개 블록체인 프로젝트들의 토큰 이코노미는 네트워크 유지라는 기술적 측면에만 초점을 맞추면서 노드 운영자(채굴자 또는 블록 생산자)에게만 유인을 제공합니다. 그러나 이는 네트워크의 확장에 기여하거나 장기 성장에 투자하는 다른 참여자들에게 유인을 제공하는 중요성을 간과하는 것입니다. Klaytn의 토큰 이코노미는 폭넒은 영역의 참여자들의 더 다양한 형태로 기여하고 이에 대해 보상을 받을 수 있도록 설계되었습니다. 또한, 블록체인 노드 운영 외에도 외에도 미래 성장 계획이나 전략적으로 기획된 투자 프로젝트를 지원하기 위해 지속적으로 재원을 공급할 수 있는 구조를 가지고 있습니다.

## 펀딩 구조(Funding Structure)<a id="funding-structure"></a>

Klaytn의 펀딩 구조는 Klaytn 네트워크의 블록 생성과 함께 지속적으로 운영됩니다. 모든 신규 블록에서 발행된 KLAY, 그리고 블록\(총칭 "블록 보상" \)에 사용된 트랜잭션 수수료의 합계는 사전 결정된 비율에 따라 다음 세 개의 계정에 집계 및 배포됩니다.

* Klaytn 거버넌스 카운슬 보상: 34%
* Klaytn Growth Fund \(KGF\): 54%
* Klaytn 개선 준비금 \(KIR\) : 12 %

For every block created, 9.6 KLAY will be minted. 따라서 매년 약 3억개의 KLAY가 발행될 것으로 예상할 수 있습니다. 최초 발행된 100억 KLAY 대비 연간 인플레이션율은 3 %인 것입니다(연간 인플레이션율은 Klaytn Governance Process를 통해 변경 될 수 있습니다). 트랜잭션 수수료는 OPcode당 부과되며, 트랜잭션 수수료 표에 따라 책정됩니다. 트랜잭션 수수료 표에 대해서 더 자세한 정보를 알고 싶으시다면 [트랜잭션 수수료](transaction-fees/transaction-fees.md)를 참고해주세요.

## Klaytn 거버넌스 카운슬 보상 <a id="klaytn-governance-council-reward"></a>

Klaytn 거버넌스 카운슬은 코어 셀 운영자\(CCOs\)들의 집단입니다. 카운슬 구성원은 코어 셀 \(CCs\)을 유지해야 할 책임이 있으며, 이 카운슬은 Klaytn 생태계에서 기본 인프라 제공을 담당하는 필수 기관이됩니다. 카운슬 멤버가 되려면 Klaytn Governance Process에서 자격 검토를 받아야하며, 5백만 KLAY라는 최소 스테이킹 조건을 충족해야 합니다. Klaytn 거버넌스 카운슬 보상은 카운슬 멤버들이 Klaytn 생태계의 안정적인 기반이 될 수 있도록 유인을 제공하는 구조입니다.

### Klaytn 거버넌스 카운슬 보상 메커니즘 <a id="klaytn-governance-council-reward-mechanism"></a>

모든 블록마다 무작위로 선정된 카운슬 멤버로 이루어진 위원회가 구성됩니다. 각 위원회는 한 멤버가 제안자(Proposer) 역할을 할당받습니다. 다른 모든 위원회 위원은 검증자(Validator)의 역할을 맡습니다. 블록이 성공적으로 생성되어 Klaytn 블록체인에 추가되면, 해당 블록의 제안자에게는 블록 보상의 100%가 제공됩니다. 카운슬 멤버가 제안자로 선정될 확률은 회원이 스테이크한 KLAY의 양에 비례합니다. 즉, 더 많은 KLAY를 스테이크 할수록 멤버가 제안자로 선정되어 블록보상을 받을 가능성이 커집니다.

요구사항인 최소 500만 KLAY 스테이킹이 충족되는 한 Klaytn 거버넌스 카운슬 멤버는 자신의 KLAY를 자유롭게 스테이크하거나 언스테이크(unstake) 할 수 있습니다. 스테이킹 정보는 86,400블록마다 업데이트되며, 새로 스테이크 된 KLAY는 스테이킹이 완료된 후 두 번의 업데이트 주기 이후에 효력이 생깁니다. 스테이크 된 KLAY를 인출하는 일은 악의적인 멤버가 즉시 빠져나가지 못하도록 일주일 정도 지연됩니다.

많이 투자한 소규모 그룹의 카운슬 멤버들이 Klaytn 거버넌스 카운슬 보상을 독점하는 것을 막기 위해 지니 계수(Gini coefficient)가 이용되어 스테이크 된 Klay의 유효 수량을 조정할 수 있습니다. The application formula is as follows, where G stands for gini coefficient of Governance Council's KLAY staking distribution:

* _조정된 스테이킹 양(Adjusted staking amount) = \(카운슬 멤버의 스테이킹 양\)^\(1/1+G\)_


### 잘못된 행동을 하는 카운슬 멤버에 대한 처벌 <a id="penalty-for-misbehaving-council-members"></a>

카운슬 멤버는 아래와 같은 잘못된 행동을 하면 처벌의 대상이 될 수 있습니다. 앞으로 Klaytn Governance Process를 통해 더 많은 페널티 규칙이 수립되고 수정될 수 있습니다.

Safety Failure를 일으키는 경우:

* 제안자로 선택된 카운슬 멤버는 같은 height에 두 개 이상의 블록을 만들 수 없습니다.
* 제안자로 선정된 카운슬 멤버는 의도적으로 특정 트랜잭션을 제외할 수 없습니다.

Liveness Failure를 일으키는 경우:

* 제안자로 선택된 카운슬 멤버는 유효한 블록을 생성해야 합니다.
* 검증자로 선정된 카운슬 멤버는 제안자가 제안한 블록을 검증해야합니다.

## Klaytn Growth Fund <a id="klaytn-growth-fund"></a>

### Background

Klaytn's token economy operates and develops through the activities of Klaytn's economic entities. The growth of the economy will help improve the stability of the platform and help the ecosystem last. Therefore, Klaytn has an incentive system that fosters the economic entities' activities in order to help maintain and strengthen the economic growth of Klaytn.


### General Concept
The Klaytn Growth Fund (KGF) aims to bring Klaytn economy forward by providing grants and investing in various organizations and individuals that contribute to the Klaytn economy. Klaytn's technology provides enormous opportunities for people to store, transfer, and exchange data and value globally with ease and at minimal cost. And since it is an open network, anyone can join to build an application without obtaining any permissions. However, a wider adoption of blockchain has been hindered because the technology is still in its early phase, and most of the values and data are still being managed in traditional ways in the form of legal contracts, local storage, etc. And KGF is intended to solve these problems. KGF will support various programs for promoting the adoption of Klaytn across all industries, such as rewarding those who show proof-of-contribution on-chain and investing in early-stage dApps. It will be constantly financed through a certain percentage of block rewards (refer to [Funding Structure](token-economy.md#funding-structure)).


## Klaytn Improvement Reserve <a id="klaytn-improvement-reserve"></a>

As technology continues to improve and the needs of users change over time, our platform must have the ability to quickly adapt to any new circumstance that arises. To respond to such changes, we must not only work on services, but also undergo various activities to maintain Klaytn’s ecosystem. For instance, research and development for better technology, or projects that contribute to the overall growth of the ecosystem may be part of these activities. These activities are necessary for Klaytn to progress continuously. Klaytn Improvement Reserve (KIR) will be deployed for activities that improve the Klaytn ecosystem such:



| 카테고리                            | Details                                                                                                                            |
|:------------------------------- |:---------------------------------------------------------------------------------------------------------------------------------- |
| **Development**                 | <ul><li>IDE & Editors</li><li>Oracle</li><li>Contract Library</li>                             |
| **Infrastructure**              | <ul><li>Local Testnet</li><li>Decentralized File System</li><li>Multi-VM</li>                           |
| **Test, Debugging, Deployment** | <ul><li>Testing & Deployment Tools</li><li>Security & Audit Tools</li>                                                     |
| **Monitoring & Analytics**      | <ul><li>Monitoring</li><li>Analytics</li>                                                     |
| **Education & Activity**        | <ul><li>Documentation</li><li>Educational Materials</li><li>Community Building</li><li>Open Source Activity(Including Bug Bounty)</li> |
| **Research**                    | <ul><li>Security, Scalability, Cryptography, etc.</li></ul>                                                                                                         |


KIR proposals can be created by any participant in Klaytn’s ecosystem. KIR spending proposals will be processed per KIR Governance Process. Refer to the [Klaytn Improvement Reserve Review Process](governance.md#klaytn-improvement-reserve-review-process) section for more information on the procedure. Once a spending proposal has passed, KLAY will be distributed periodically, from a predetermined total amount, based on the project’s level of progress. This process may change based on the project size but is planned to be processed monthly.

For more information, please visit [Klaytn Improvement Reserve Forum](https://kir.klaytn.com/).
