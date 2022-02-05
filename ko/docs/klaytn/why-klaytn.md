---
description: >-
  This document explains how Klaytn is different based on its the key design principles.
---

# 왜 클레이튼일까요?<a id="why-klaytn"></a>

## 클레이튼, 메타버스의 신뢰 레이어<a id="klaytn-as-a-trust-layer-of-metaverse"></a>
​ Klaytn is built to be the fundamental trust layer for the metaverse, respecting the participation and contribution from all communities, empowering and bringing them together in the new world. 가장 중요한 디자인 원칙은 다음과 같습니다.
{% hint style="success" %}
Helping the pioneers to easily build the applications and organize the community in scalable way.
{% endhint %}
​ As per this principle, Klaytn has been designed to meet the following requirements: ​
### 우수한 성능<a id="high-performance"></a>
#### 처리량(TPS)과 완결성<a id="throughput-and-finality"></a>
- 메인체인은 최소 4,000 TPS 이상을 처리해야 합니다.
- 메인체인은 1초의 블록 생성 시간과 즉각적인 트랜잭션 완결성을 보장해야 합니다.
- [합의 메커니즘](design/consensus-mechanism.md)을 참고하세요. ​
#### 확장성 <a id="scalability"></a>
- Service chain is the default L2 solution for Klaytn 2.0 that is customizable and easily deployable. The service chain can have its own governance and connect to the Klaytn main chain to anchor data or transfer assets.
- [서비스체인](scaling-solutions.md#service-chain)을 참고해주세요. 기업들이나 대규모 네트워크들은 자체적 실행 환경을 필요로 하는 경우가 많습니다. 서비스 체인을 이용하면 다른 블록체인 어플리케이션에 영향 받지 않는 분리된 고성능 실행 환경을 유지할 수 있습니다.
- 샤딩이나 롤업 등 기타 확장성 솔루션도 근시일 내에 출시될 예정입니다. ​
### 저렴한 비용  <a id="low-cost"></a>
- End-users should not be burdened with any higher transaction fee beyond what the traditional systems require.
- Transaction fee should be stable and be determined by the transaction complexity itself, and not the surrounding factors.
- [저렴한 스마트 컨트랙트 실행 비용](design/computation/klaytn-smart-contract.md#affordable-smart-contract-execution-cost) 및 [트랜잭션 수수료](design/transaction-fees/transaction-fees.md)를 참고하세요. For a gas price of 25 ston, a KLAY transfer would incur a fixed cost of 0.000525 KLAY. (21,000 Gas for KLAY transfer x (25 x 10^9) == 0.000525 KLAY) ​
### 빠른 개발<a id="rapid-development"></a>
#### 이더리움 호환성<a id="ethereum-compatibility"></a>
- Development Tools: Any tooling that can run on Ethereum will run seamlessly within the Klaytn ecosystem by making Klaytn’s technical stack equivalent, from an interfacing and execution perspective, to the existing Ethereum stack. New tooling created in the Klaytn ecosystem could be reciprocally adopted within the Ethereum ecosystem.
- EVM and API: By building on top of existing Ethereum stacks we inherit any improvements made to the open-source codebases of EVM and supporting libraries. Supporting such equivalent Opcodes and stack logic in the Klaytn EVM environment would see execution behaviour is guaranteed equivalent; and supporting a set of JSON-RPC APIs with equivalent endpoint payload syntax guarantees full Ethereum interfacing equivalence. See [Solidity-Smart Contract Language](../smart-contract/solidity-smart-contract-language.md), and [Migrating Ethereum App to Klaytn](../dapp/tutorials/migrating-ethereum-app-to-klaytn.md).
- Core Development Contribution: Supporting Ethereum equivalence translates most to the mutual benefit to both the Klaytn and thereum ecosystems. 대부분의 이더리움 개선 제안(EIP)은 클레이튼 코어 개발 어젠다에 이전, 적용될 수 있을 것이며 클레이튼 개선 제안(KIP) 또한 이더리움과 EVM의 발전에 기여할 수 있을 것입니다. When the development community contributes to one ecosystem, they are indeed contributing to both. ​
#### 오픈소스 인프라 및 패키지<a id="open-source-infrastructure-and-package"></a>
- 일차적 인프라: 종단간(end-to-end) 블록체인 결합 및 개발을 위한 툴셋입니다. It includes SDKs and smart contract libraries, Wallets and chain explorers, distributed storage solutions, Oracle support and Bridges.
- 이차적 인프라: 제품과 서비스 지원을 위한 생태계에 해당합니다. 여기에는 통합/추상화 서비스, 스테이블 코인 연동, DAO, NFT 마켓플레이스, DEX, DeFi, 전통 금융 인터페이스 등이 포함됩니다. ​
### 우수한 사용자 경험<a id="enhanced-user-experience"></a>
#### 트랜잭션의 사용성 <a id="usability-in-transaction"></a>
- Ability to transfer user's transaction fee to the application
- [수수료 위임](design/transactions/README.md#fee-delegation)을 참조해주세요. Application operator can adjust the amount of subsidy for each transaction and implement more flexible business models such as freemium or subscription. Fee delegation will effectively lower user acquisition barriers. ​ ​
### 프로토콜 수준의 전체 포괄 에코 펀드<a id="contribution-reward"></a>
- 클레이튼은 생태계를 지원하는 인센티브들이 온체인 프로토콜 토크노믹스에 인코딩된 최초이자 최대 규모의 사례입니다. 신규 발행 토큰의 66%가 생태계에 재투자됩니다.
- [Klaytn Improvement Reserve](design/token-economy.md#klaytn-improvement-reserve)와 [Klaytn Growth Fund](design/token-economy.md#klaytn-growth-fund)를 참고하세요. ​ ​
### 커뮤니티 공동 구축<a id="community-co-building"></a>
- In addition to the protocol design, Klaytn will expand its territory through community co-building; it includes kinds of communities such as game guilds, investment DAOs, community DAOs, alliance with global players, etc. ​ Lastly, the ground rules: ​
{% hint style="success" %}
Klaytn does not sacrifice blockchain’s core characteristics to achieve the above-mentioned enhancements, and the protocol stays stable with strongly committed stakeholders.
{% endhint %}

### 투명성, 보안 및 탈중앙화<a id="transparency-security-and-decentralization"></a>
- Anyone can request transactions as well as retrieve and confirm transactions results on the blockchain.
- Klaytn is a decentralized network where no single malicious node can break the data integrity. ​
### DAO, 빌더, 기업들의 거버넌스로 안정적인 탈중앙화 실현<a id="governance-by-trusted-entities"></a>
- 클레이튼 거버넌스 카운슬(GC)에 기존의 전통적 기업들에 더해 DAO 및 빌더들을 영입함으로써 클레이튼의 거버넌스 구조를 수백 개의 주체들이 참여하는 포함한 유례없는 방식으로 재정립할 가능성이 열립니다.
