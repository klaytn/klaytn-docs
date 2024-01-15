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
- [합의 메커니즘](./consensus-mechanism.md)을 참조하세요.
  ​

#### 확장성 <a id="scalability"></a>

- 서비스체인은 사용자 정의가 가능하고 쉽게 배포할 수 있는 Klaytn 2.0의 기본 L2 솔루션입니다. 서비스체인은 자체 거버넌스를 가질 수 있으며, 클레이튼 메인체인에 연결하여 데이터를 앵커링하거나 자산을 전송할 수 있습니다.
- See [Service Chain](./scaling-solutions.md#service-chain). Enterprises or large networks often want to have their own dedicated execution environment. With the service chain, they can maintain an isolated high-performing execution environment that is not affected by other blockchain applications.
- Other scalability solutions will be available in the near future, such as sharding or rollups.
  ​

### 저렴한 비용 <a id="low-cost"></a>

- 최종 사용자는 기존 시스템에서 요구하는 것 이상으로 높은 트랜잭션 수수료를 부담해서는 안 됩니다.
- 트랜잭션 수수료는 안정적이어야 하며, 주변 요인이 아닌 트랜잭션 복잡성 자체에 따라 결정되어야 합니다.
- See [Affordable Smart Contract Execution Cost](computation/klaytn-smart-contract.md#affordable-smart-contract-execution-cost) and [Transaction Fees](./transaction-fees.md). For a gas price of 250 ston, a KLAY transfer would incur a fixed cost of 0.00525 KLAY. (21,000 Gas for KLAY transfer x (250 x 10^-9) == 0.00525 KLAY)
  ​

### 빠른 개발 <a id="rapid-development"></a>

#### 이더리움 호환성 <a id="ethereum-compatibility"></a>

- Development Tools: Any tooling that can run on Ethereum will run seamlessly within the Klaytn ecosystem by making Klaytn’s technical stack equivalent, from an interfacing and execution
  perspective, to the existing Ethereum stack. New tooling created in the Klaytn ecosystem could be reciprocally adopted within the Ethereum ecosystem.
- EVM and API: By building on top of existing Ethereum stacks we inherit any improvements made to the open-source codebases of EVM and supporting libraries. Supporting such equivalent Opcodes and stack logic in the Klaytn EVM environment would see execution behaviour is guaranteed equivalent; and supporting a set of JSON-RPC APIs with equivalent endpoint payload syntax guarantees full Ethereum interfacing equivalence. See [Solidity-Smart Contract Language](../build/smart-contracts/solidity-smart-contract-language.md), and [Migrating Ethereum App to Klaytn](../build/tutorials/migrating-ethereum-app-to-klaytn.md).
- Core Development Contribution: Supporting Ethereum equivalence translates most to the mutual benefit to both the Klaytn and Ethereum ecosystems. The majority of Ethereum Improvement Proposals (EIPs) could be migrated and adopted to the Klaytn core development agenda, and in turn Klaytn Improvement Proposals (KIPs) could contribute to the advancement of Ethereum and EVM. When the development community contributes to one ecosystem, they are indeed contributing to both.
  ​

#### 오픈 소스 인프라 및 패키지 <a id="open-source-infrastructure-and-package"></a>

- Primary Infrastructure: tool sets for end-to-end blockchain integration and building. It includes SDKs and smart contract libraries, Wallets and chain explorers, distributed storage solutions, Oracle support and Bridges.
- Secondary Infrastructure: ecosystem for supporting products and services. It includes Integration/abstraction services, Stablecoin integrations, DAOs, NFT Marketplaces, DEX and DeFi and Traditional finance interfaces.
  ​

### 향상된 사용자 경험 <a id="enhanced-user-experience"></a>

#### 트랜잭션 사용성 <a id="usability-in-transaction"></a>

- 사용자의 트랜잭션 수수료를 애플리케이션으로 이체하는 기능
- See [Fee Delegation](./transactions/transactions.md#fee-delegation). Application operator can adjust the amount of subsidy for each transaction and implement more flexible business models such as freemium or subscription. Fee delegation will effectively lower user acquisition barriers.
  ​
  ​

### 풀-스위트, 프로토콜 수준의 에코 펀드 <a id="contribution-reward"></a>

- Klaytn is the first and the largest example in which the incentives supporting the ecosystem are encoded in an on-chain protocol tokenomics. 50% of the newly minted tokens are reinvested in the ecosystem.
- See [Klaytn Community Fund](token-economy.md#klaytn-community-fund) and [Klaytn Foundation Fund](token-economy.md#klaytn-foundation-fund).
  ​
  ​

### 커뮤니티 공동 구축 <a id="community-co-building"></a>

- In addition to the protocol design, Klaytn will expand its territory through community co-building; it includes kinds of communities such as game guilds, investment DAOs, community DAOs, alliance with global players, etc. Lastly, the ground rules.

:::note

클레이튼은 위에서 언급한 개선점을 달성하기 위해 블록체인의 핵심 특성을 희생하지 않으며, 강력한 이해관계자들과 함께 프로토콜을 안정적으로 유지합니다.

:::

### 투명성, 보안 및 탈중앙화 <a id="transparency-security-and-decentralization"></a>

- 누구나 블록체인 상에서 트랜잭션을 요청하고, 트랜잭션 결과를 조회하고 확인할 수 있습니다.
- Klaytn is a decentralized network where no single malicious node can break the data integrity.
  ​

### 안정성을 갖춘 탈중앙화를 실현하는 DAO, 빌더, 기업의 거버넌스 <a id="governance-by-trusted-entities"></a>

- 현재 클레이튼 거버넌스 카운슬(GC)의 기존 기업들 외에도 DAO, 빌더 등 더 많은 탈중앙화 주체들을 GC에 참여시킴으로써 수백 명의 거버넌스 참여자들과 함께 전례 없는 방식으로 전체 클레이튼 거버넌스 구조를 재구축할 수 있는 가능성을 열어가고 있습니다.
