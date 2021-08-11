---
description: >-
  이 문서는 Klaytn의 주요 설계 원칙을 설명하고, Klaytn이 다른 블록체인 플랫폼들과 어떻게 차별화되는지 설명합니다.
---

# 왜 Klaytn일까요?<a id="why-klaytn"></a>

2009년 첫 비트코인 트랜잭션 이후 수많은 블록체인 애플리케이션이 개발됐지만, 시장에서 의미 있는 주목을 받은 경우는 거의 없습니다. 블록체인의 대중화를 막는 주요한 장애물들은 다음과 같습니다.

- 어려운 사용법: 블록체인 애플리케이션은 사용자들이 암호학적 용어와 시스템의 내부작동 원리를 이해해야 사용할 수 있습니다. 트랜잭션을 보내려면 많은 단계를 거쳐야 하고, 16진법 문자열이 여기저기서 불쑥 나타납니다.
- 형편없는 사용자 경험: 블록체인의 기술적 미성숙함은 사용자에게 부담을 줍니다. 많은 블록체인 시스템에서 트랜잭션은 상당한 시간이 지날때까지 확정되지 않습니다. 애플리케이션을 사용할 때 비밀번호를 반복적으로 입력해야 하는 경우가 많으며 (그런데 패스워드는 분실하면 복구할 수가 없습니다), 상호작용마다 가격 변동이 심한 수수료를 부과합니다.
- 불확실한 지속가능성: 블록체인에서 장기적으로 지속가능한 비즈니스 모델의 부재는 기업들이 블록체인 기술을 채택하는 속도를 지연시킵니다. 블록체인 플랫폼의 운영은 이해관계자들이 지속해서 활동하도록 인센티브를 제공하는 토큰 이코노미에 의존하고 있지만 이 모델은 상업적으로 증명되지 않았습니다.

## Klaytn은 블록체인의 대중화를 목표로 합니다.<a id="klaytn-is-aiming-at-mass-adoption-of-blockchain"></a>

Klaytn은 블록체인 대중화가 목표입니다. 가장 중요한 디자인 원칙은 다음과 같습니다.

{% hint style="success" %}
웹/모바일 애플리케이션과 동일한 수준의 사용자 경험을 제공하여 사용자가 블록체인을 인식하지 못하도록 합니다.
{% endhint %}

이 원칙에 따라 Klaytn은 다음 요구 사항들을 충족하도록 설계되었습니다.

### 우수한 퍼포먼스  <a id="high-performance"></a>

- 메인체인은 최소 4,000 TPS 이상을 처리해야합니다.
- 메인체인은 1초의 블록 생성 시간과 즉각적인 트랜잭션 완결성을 보장합니다.
- [합의 메커니즘](design/consensus-mechanism.md)을 참고하세요.

### 저렴한 비용  <a id="low-cost"></a>

- 사용자는 기존 시스템을 사용할 때 필요한 비용 이상의 높은 트랜잭션 수수료를 부담해서는 안됩니다.
- 트랜잭션 수수료는 안정적이어야 하고, 주변 요인이 아니라 트랜잭션의 복잡성 자체에 의해 결정되어야 합니다.
- [저렴한 스마트 컨트랙트 실행 비용](design/computation/klaytn-smart-contract.md#affordable-smart-contract-execution-cost) 및 [트랜잭션 수수료](design/transaction-fees.md)을 참고하세요. 현재 KLAY를 보내려면 고정 비용으로 0.000625 KLAY가 필요합니다.

### 사용자 계정 관리의 사용성 <a id="usability-in-user-account-management"></a>

- 사용자는 사람이 읽을 수 있는 형식의 주소를 자신의 계정 주소로 선택할 수 있어야합니다.
- 사용자는 주소를 변경하지 않고 계정의 개인키를 변경할 수 있습니다.
- [Human-Readable Address](design/accounts.md#human-readable-address-hra) 및 [주소로부터 키 쌍(key pairs) 분리하기](design/accounts.md#decoupling-key-pairs-from-addresses)를 참고해주세요.

### 트랜잭션의 사용성 <a id="usability-in-transaction"></a>

- 사용자의 트랜잭션 수수료를 애플리케이션 운영자가 대신 지불하는 기능이 있어야 합니다.
- [수수료 위임](design/transactions/README.md#fee-delegation)을 참조해주세요. 애플리케이션 운영자는 각 트랜잭션에 대한 보조금의 양을 설정할 수 있어서 프리미엄(freemium)이나 구독 모델 같이 더욱 유연한 비즈니스 모델을 사용할 수 있습니다. 수수료 위임은 사용자가 쉽게 유입될 수 있도록 합니다.

***

플랫폼 레이어에서 사용성을 저하하는 요인을 제거하는 것만으로는 블록체인 플랫폼의 대중화를 이룰 수 없습니다. 매력적인 블록체인 애플리케이션을 찾기 위해서는 서비스 제공자와의 전략적 제휴를 통해 글로벌 개발자 커뮤니티를 육성하는 것이 매우 중요합니다.

{% hint style="success" %}
매력적인 애플리케이션이 많이 만들어질 수 있도록 비즈니스 친화적인 환경 만들기.
{% endhint %}

이를 위해 애플리케이션 개발을 지원하기 위한 다음과 같은 요구 사항이 있습니다.

### 쾌속 개발(Rapid Development)<a id="rapid-development"></a>

- Klaytn의 애플리케이션 개발은 간단해야 하며, 사용되는 기술은 개방형 표준을 따라서 학습이 쉬워야 합니다.
- [Solidity - Smart Contract Language](../smart-contract/solidity-smart-contract-language.md), [Truffle](../toolkit/truffle.md)과 [Migrating Ethereum App to Klaytn](../bapp/tutorials/migrating-ethereum-app-to-klaytn.md)을 참고해주세요. Klaytn 가상머신(KLVM)은 이더리움의 솔리디티 컨트랙트를 지원하므로 이더리움의 PoC 제품을 Klaytn에 훨씬 쉽게 포팅(porting)하여 상업적으로 사용할 수 있습니다. 또한, 잘 구축된 개발자 커뮤니티에서 개발 도구를 찾고 도움을 쉽게 받을 수 있습니다.

### 데이터 앵커링을 사용하는 서비스별 프라이빗 체인 <a id="service-specific-private-chains-with-data-anchoring"></a>

- Klaytn은 프라이빗 블록체인 전용 솔루션을 제공해야합니다. 프라이빗 체인은 자체 거버넌스를 보유하고 데이터 앵커링 및 자산 전송을 위해 Klaytn 메인체인에 연결할 수 있습니다.
- [서비스체인](scaling-solutions.md#service-chain)을 참고해주세요. 기업은 종종 SLA를 충족하기 위해 자체적인 전용 실행 환경을 원합니다. 서비스체인을 통해 기업은 다른 블록체인 애플리케이션의 영향을 받지 않는 격리된 고성능 실행 환경을 유지하고 비즈니스에서 민감한 데이터를 비공개로 유지할 수 있습니다.

### Contribution Reward <a id="contribution-reward"></a>

- Applications that contribute to growing Klaytn ecosystem should be fairly rewarded.
- See [Incentive Program](design/token-economy.md).

***

마지막으로, 중요한 규칙은

{% hint style="success" %}
Klaytn은 위에서 언급한 개선 사항을 달성하되 블록체인의 핵심적인 특징을 희생하지 않으며, 적극적으로 헌신하는 참여자들과 함께 안정적으로 플랫폼을 유지합니다.
{% endhint %}

### Transparency, Security and Decentralization <a id="transparency-security-and-decentralization"></a>

- Everyone can request transactions and retrieve and validate every transaction execution result on the blockchain.
- Klaytn is a decentralized network and no single malicious node breaks the data integrity.

### Governance by Trusted Entities <a id="governance-by-trusted-entities"></a>

- At its initial phase, trusted entities, global listed enterprises that manage the business of hundreds of thousands to billions of dollars, operate Klaytn node and participate in decision making for the development of Klaytn.
