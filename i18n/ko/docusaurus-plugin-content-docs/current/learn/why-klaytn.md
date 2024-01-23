# 왜 클레이튼인가?

주요 설계 원칙에 따라 Klaytn이 어떻게 다른지 설명합니다.

## 메타버스의 신뢰 레이어로서의 클레이튼 <a id="klaytn-as-a-trust-layer-of-metaverse"></a>

클레이튼은 메타버스의 기본 신뢰 레이어가 되어 모든 커뮤니티의 참여와 기여를 존중하고, 새로운 세상에서 힘을 실어주고 하나로 모으기 위해 만들어졌습니다.
가장 중요한 설계 원칙은 다음과 같습니다;

:::note

선구자들이 쉽게 애플리케이션을 구축하고 확장 가능한 방식으로 커뮤니티를 조직할 수 있도록 지원합니다.

:::

이 원칙에 따라 클레이튼은 다음과 같은 요구사항을 충족하도록 설계되었습니다:

### 고성능 <a id="high-performance"></a>

#### 처리량(TPS) 및 완결성 <a id="throughput-and-finality"></a>

- 메인체인은 최소 4,000 TPS를 처리해야 합니다.
- 메인체인은 1초의 블록 생성 시간으로 즉각적인 트랜잭션 완결성을 보장해야 합니다.
- See [Consensus Mechanism].
  ​

#### 확장성 <a id="scalability"></a>

- 서비스체인은 사용자 정의가 가능하고 쉽게 배포할 수 있는 Klaytn 2.0의 기본 L2 솔루션입니다. 서비스체인은 자체 거버넌스를 가질 수 있으며, 클레이튼 메인체인에 연결하여 데이터를 앵커링하거나 자산을 전송할 수 있습니다.
- See [Service Chain]. 기업이나 대규모 네트워크는 종종 자체 전용 실행 환경을 갖고 싶어합니다. 서비스체인을 사용하면 다른 블록체인 애플리케이션의 영향을 받지 않는 격리된 고성능 실행 환경을 유지할 수 있습니다.
- 샤딩이나 롤업과 같은 다른 확장성 솔루션도 가까운 시일 내에 제공될 예정입니다.
  ​

### 저렴한 비용 <a id="low-cost"></a>

- 최종 사용자는 기존 시스템에서 요구하는 것 이상으로 높은 트랜잭션 수수료를 부담해서는 안 됩니다.
- 트랜잭션 수수료는 안정적이어야 하며, 주변 요인이 아닌 트랜잭션 복잡성 자체에 따라 결정되어야 합니다.
- See [Affordable Smart Contract Execution Cost] and [Transaction Fees]. 가스 가격이 250 ston인 경우, KLAY 전송에는 0.00525 KLAY의 고정 비용이 발생합니다. (21,000 KLAY 전송 gas x (250 x 10^-9) == 0.00525 KLAY)

### 빠른 개발 <a id="rapid-development"></a>

#### 이더리움 호환성 <a id="ethereum-compatibility"></a>

- 개발 도구: 이더리움에서 실행할 수 있는 모든 툴은 인터페이스와 실행 관점에서 기존 이더리움의 기술 스택과 클레이튼의 기술 스택을 동등하게 만들어 클레이튼 생태계 내에서 원활하게 실행됩니다. 클레이튼 생태계에서 만들어진 새로운 툴링은 이더리움 생태계 내에서 상호적으로 채택될 수 있습니다.
- EVM과 API: 기존 이더리움 스택을 기반으로 구축함으로써 EVM과 지원 라이브러리의 오픈소스 코드베이스에 대한 모든 개선 사항을 계승합니다. Klaytn EVM 환경에서 이와 동등한 Opcode와 스택 로직을 지원하면 실행 동작이 동등하게 보장되며, 동등한 엔드포인트 페이로드 구문을 가진 JSON-RPC API 세트를 지원하면 완전한 이더리움 인터페이스 동등성이 보장됩니다. See [Solidity-Smart Contract Language], and [Migrating Ethereum App to Klaytn].
- 핵심 개발 기여: 이더리움 동등성을 지원하는 것은 클레이튼과 이더리움 생태계 모두에 상호 이익을 가져다줍니다. 이더리움 개선 제안(EIP)의 대부분은 클레이튼 핵심 개발 아젠다로 마이그레이션되어 채택될 수 있으며, 결과적으로 클레이튼 개선 제안(KIP)은 이더리움과 EVM의 발전에 기여할 수 있습니다. 개발 커뮤니티가 한 생태계에 기여하면 실제로 두 생태계 모두에 기여하는 것입니다.
  ​

#### 오픈 소스 인프라 및 패키지 <a id="open-source-infrastructure-and-package"></a>

- 기본 인프라: 엔드투엔드 블록체인 통합 및 구축을 위한 도구 세트입니다. 여기에는 SDK와 스마트 컨트랙트 라이브러리, 지갑과 체인 탐색기, 분산 스토리지 솔루션, 오라클 지원 및 브릿지가 포함됩니다.
- 보조 인프라: 제품 및 서비스 지원을 위한 에코시스템입니다. 여기에는 통합/추상화 서비스, 스테이블코인 통합, DAO, NFT 마켓플레이스, DEX 및 DeFi, 전통 금융 인터페이스가 포함됩니다.
  ​

### 향상된 사용자 경험 <a id="enhanced-user-experience"></a>

#### 트랜잭션 사용성 <a id="usability-in-transaction"></a>

- 사용자의 트랜잭션 수수료를 애플리케이션으로 이체하는 기능
- See [Fee Delegation]. 애플리케이션 운영자는 각 트랜잭션에 대한 보조금 금액을 조정하고 부분 유료화 또는 구독과 같은 보다 유연한 비즈니스 모델을 구현할 수 있습니다. 수수료 위임은 사용자 확보 장벽을 효과적으로 낮출 수 있습니다.
  ​
  ​

### 풀-스위트, 프로토콜 수준의 에코 펀드 <a id="contribution-reward"></a>

- 클레이튼은 생태계를 지원하는 인센티브가 온체인 프로토콜 토큰노믹스로 인코딩된 최초이자 최대 규모의 사례입니다. 새로 발행되는 토큰의 50%는 생태계에 재투자됩니다.
- [클레이튼 커뮤니티 기금](token-economy.md#klaytn-community-fund) 및 [클레이튼 재단 기금](token-economy.md#klaytn-foundation-fund)을 참고하세요.
  ​
  ​

### 커뮤니티 공동 구축 <a id="community-co-building"></a>

- In addition to the protocol design, Klaytn will expand its territory through community co-building; it includes kinds of communities such as game guilds, investment DAOs, community DAOs, alliance with global players, etc.
  ​
  Lastly, the ground rules:
  ​
  :::note

클레이튼은 위에서 언급한 개선점을 달성하기 위해 블록체인의 핵심 특성을 희생하지 않으며, 강력한 이해관계자들과 함께 프로토콜을 안정적으로 유지합니다.

:::

### 투명성, 보안 및 탈중앙화 <a id="transparency-security-and-decentralization"></a>

- 누구나 블록체인 상에서 트랜잭션을 요청하고, 트랜잭션 결과를 조회하고 확인할 수 있습니다.
- 클레이튼은 탈중앙화된 네트워크이기 때문에 어떤 악의적인 노드도 데이터 무결성을 깨뜨릴 수 없습니다.
  ​

### 안정성을 갖춘 탈중앙화를 실현하는 DAO, 빌더, 기업의 거버넌스 <a id="governance-by-trusted-entities"></a>

- 현재 클레이튼 거버넌스 카운슬(GC)의 기존 기업들 외에도 DAO, 빌더 등 더 많은 탈중앙화 주체들을 GC에 참여시킴으로써 수백 명의 거버넌스 참여자들과 함께 전례 없는 방식으로 전체 클레이튼 거버넌스 구조를 재구축할 수 있는 가능성을 열어가고 있습니다.

[Decoupling of Key Pairs from Addresses]: ./accounts.md#decoupling-key-pairs-from-addresses

[Multiple Key Pairs and Role-Based Keys]: ./accounts.md#multiple-key-pairs-and-role-based-keys

[Human-Readable Address]: ./accounts.md#human-readable-address-hra

[Consensus Mechanism]: ./consensus-mechanism.md

[Affordable Smart Contract Execution Cost]: computation/klaytn-smart-contract.md#affordable-smart-contract-execution-cost

[Transaction Fees]: transaction-fees/transaction-fees.md

[Fee Delegation]: ./transactions/transactions.md#fee-delegation

[Service Chain]: ./scaling-solutions.md#service-chain

[Solidity-Smart Contract Language]: ../build/smart-contracts/solidity-smart-contract-language.md

[Truffle]: ../build/smart-contracts/ide-and-tools/truffle.md

[Migrating Ethereum App to Klaytn]: ../build/tutorials/migrating-ethereum-app-to-klaytn.md

[Incentive Program]: ./token-economy.md

[Klaytn Improvement Reserve]: ./token-economy.md#klaytn-improvement-reserve

[Klaytn Growth Fund]: ./token-economy.md#klaytn-growth-fund
