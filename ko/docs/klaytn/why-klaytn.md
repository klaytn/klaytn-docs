---
description: >-
  이 문서는 클레이튼의 핵심 설계 원칙을 기반으로 클레이튼의 차별점을 설명합니다.
---

# 왜 클레이튼일까요?<a id="why-klaytn"></a>

## 클레이튼, 메타버스의 신뢰 레이어<a id="klaytn-as-a-trust-layer-of-metaverse"></a>
​오픈소스 퍼블릭 블록체인 프로젝트 클레이튼은 모든 커뮤니티의 참여와 기여를 존중하고, 이들을 지지하며, 새로운 세상에 결집시키는 메타버스를 위한 근본적 신뢰 레이어로서 구상되었습니다. 가장 중요한 디자인 원칙은 다음과 같습니다.
{% hint style="success" %}
선구자들이 확장 가능한 방식으로 어플리케이션을 만들고 커뮤니티를 조직할 수 있도록 도와줍니다.
{% endhint %}
​이 원칙에 따라 클레이튼은 다음 요구 사항들을 충족하도록 설계되었습니다​
### 우수한 성능<a id="high-performance"></a>
#### 처리량(TPS)과 완결성<a id="throughput-and-finality"></a>
- 메인체인은 최소 4,000 TPS 이상을 처리해야 합니다.
- 메인체인은 1초의 블록 생성 시간과 즉각적인 트랜잭션 완결성을 보장해야 합니다.
- See [Consensus Mechanism][]. ​
#### 확장성 <a id="scalability"></a>
- 서비스 체인은 맞춤형으로 쉽게 배포될 수 있는 Klaytn 2.0의 기본 L2 솔루션입니다. 서비스 체인은 자체 거버넌스를 보유할 수 있으며, 데이터 앵커링 및 자산 전송을 위해 클레이튼 메인체인에 연동될 수 있습니다.
- See [Service Chain][]. 기업들이나 대규모 네트워크들은 자체적 실행 환경을 필요로 하는 경우가 많습니다. 서비스 체인을 이용하면 다른 블록체인 어플리케이션에 영향 받지 않는 분리된 고성능 실행 환경을 유지할 수 있습니다.
- 샤딩이나 롤업 등 기타 확장성 솔루션도 근시일 내에 출시될 예정입니다. ​
### 저렴한 비용  <a id="low-cost"></a>
- 사용자는 기존 시스템을 사용할 때에 비해 높은 트랜잭션 수수료를 부담해서는 안 됩니다.
- 트랜잭션 수수료는 안정적이어야 하고, 주변 요인이 아니라 트랜잭션의 복잡성 자체에 의해 결정되어야 합니다.
- See [Affordable Smart Contract Execution Cost][] and [Transaction Fees][]. For a gas price of 750 ston, a KLAY transfer would incur a fixed cost of 0.01575 KLAY. (21,000 Gas for KLAY transfer x (750 x 10^-9) == 0.01575 KLAY) ​
### 빠른 개발<a id="rapid-development"></a>
#### 이더리움 동일성<a id="ethereum-compatibility"></a>
- 개발 도구: 클레이튼 스택을 인터페에스와 실행 관점에서 기존의 이더리움 스택과 동일하게 보장함으로써 이더리움의 어떤 도구든 클레이튼 생태계에서 문제없이 동작할 수 있습니다. 클레이튼 생태계에서 만들어진 모든 도구는 이더리움 생태계에서도 상호적으로 도입될 수 있습니다.
- EVM과 API: 기존 이더리움 스택에 개발함으로써 EVM과 라이브러리의 오픈소스 코드 베이스에 추가된 모든 개선 사항들을 상속합니다. 클레이튼 EVM 환경과 동일한 옵코드와 스택 로직을 지원함으로써 실행 동작도 호환됩니다. 또한 동일한 엔드포인트 페이로드 구문을 지닌 JSON-RPC API를 지원하여 완전한 이더리움 인터페이스 호환성이 보장됩니다. See [Solidity-Smart Contract Language][], and [Migrating Ethereum App to Klaytn][].
- Core Development Contribution: Supporting Ethereum equivalence translates most to the mutual benefit to both the Klaytn and Ethereum ecosystems. 대부분의 이더리움 개선 제안(EIP)은 클레이튼 코어 개발 어젠다에 이전, 적용될 수 있을 것이며 클레이튼 개선 제안(KIP) 또한 이더리움과 EVM의 발전에 기여할 수 있을 것입니다. 한 생태계에 대한 개발 커뮤니티의 기여는 두 생태계 모두에 대한 기여로 이어집니다. ​
#### 오픈소스 인프라 및 패키지<a id="open-source-infrastructure-and-package"></a>
- 일차적 인프라: 종단간(end-to-end) 블록체인 결합 및 개발을 위한 툴셋입니다. 여기에는 SDK와 스마트 컨트랙트 라이브러리, 월렛, 체인 탐색기, 분산 저장 솔루션, 오라클 지원, 브릿지가 포함됩니다.
- 이차적 인프라: 제품과 서비스 지원을 위한 생태계에 해당합니다. 여기에는 통합/추상화 서비스, 스테이블 코인 연동, DAO, NFT 마켓플레이스, DEX, DeFi, 전통 금융 인터페이스 등이 포함됩니다. ​
### 우수한 사용자 경험<a id="enhanced-user-experience"></a>
#### 트랜잭션의 사용성 <a id="usability-in-transaction"></a>
- 사용자의 트랜잭션 수수료를 서비스 운영자가 대신 지불할 수 있습니다.
- See [Fee Delegation][]. 애플리케이션 운영자는 각 트랜잭션에 대한 보조금의 양을 설정할 수 있어서 프리미엄(freemium)이나 구독 모델 같이 더욱 유연한 비즈니스 모델을 사용할 수 있습니다. 수수료 위임 기능은 사용자 유입 장벽을 낮출 수 있습니다. ​ ​
### 프로토콜 수준의 전체 포괄 에코 펀드<a id="contribution-reward"></a>
- 클레이튼은 생태계를 지원하는 인센티브들이 온체인 프로토콜 토크노믹스에 인코딩된 최초이자 최대 규모의 사례입니다. 신규 발행 토큰의 66%가 생태계에 재투자됩니다.
- See [Klaytn Improvement Reserve][] and [Klaytn Growth Fund][]. ​ ​
### 커뮤니티 공동 구축<a id="community-co-building"></a>
- In addition to the protocol design, Klaytn will expand its territory through community co-building; it includes kinds of communities such as game guilds, investment DAOs, community DAOs, alliance with global players, etc. ​ Lastly, the ground rules: ​
{% hint style="success" %}
클레이튼은 위에서 언급한 개선 사항을 달성하되 블록체인의 핵심적인 특징을 희생하지 않으며, 적극적으로 헌신하는 참여자들과 함께 안정적으로 프로토콜 유지합니다.
{% endhint %}

### 투명성, 보안 및 탈중앙화<a id="transparency-security-and-decentralization"></a>
- 누구나 블록체인에서 트랜잭션을 요청, 조회, 확인할 수 있습니다.
- 클레이튼은 탈중앙화된 네트워크이므로 하나의 악성 노드가 데이터 무결성을 손상시키지 않습니다. ​
### DAO, 빌더, 기업들의 거버넌스로 안정적인 탈중앙화 실현<a id="governance-by-trusted-entities"></a>
- 클레이튼 거버넌스 카운슬(GC)에 기존의 전통적 기업들에 더해 DAO 및 빌더들을 영입함으로써 클레이튼의 거버넌스 구조를 수백 개의 주체들이 참여하는 포함한 유례없는 방식으로 재정립할 가능성이 열립니다.

[Consensus Mechanism]: design/consensus-mechanism.md
[Affordable Smart Contract Execution Cost]: design/computation/klaytn-smart-contract.md#affordable-smart-contract-execution-cost
[Transaction Fees]: design/transaction-fees/transaction-fees.md
[Fee Delegation]: design/transactions/README.md#fee-delegation
[Service Chain]: scaling-solutions.md#service-chain
[Solidity-Smart Contract Language]: ../smart-contract/solidity-smart-contract-language.md
[Migrating Ethereum App to Klaytn]: ../dapp/tutorials/migrating-ethereum-app-to-klaytn.md
[Klaytn Improvement Reserve]: design/token-economy.md#klaytn-improvement-reserve
[Klaytn Growth Fund]: design/token-economy.md#klaytn-growth-fund
