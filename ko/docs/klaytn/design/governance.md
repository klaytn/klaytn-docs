# 거버넌스 (Governance)

## 개요

### Klaytn Governance Council: Klaytn 기여자와 함께 거버넌스를 운영

Klaytn 플랫폼의 장기 개발 계획에 따라 자신의 이익을 고려하여 플랫폼을 구축하고 확장하는 기여자들이 Klaytn 거버넌스에 참여하기에 가장 적합한 주체라고 생각합니다. Klaytn에 새로운 서비스를 제공하여 블록체인 서비스 대중화를 지원하는 서비스 제공자, Klaytn을 세계에 소개하고 홍보하는 생태계 빌더 또는 다른 종류의 기여자는 Klaytn Governance Council의 잠재적인 멤버입니다. 즉, Klaytn Governance Council은 Klaytn의 장기적인 성장을 이끄는 의사결정 그룹입니다. 거버넌스에 대한 자세한 내용은 토큰 이코노미&거버넌스 페이퍼 \(<https://www.klaytn.com/technology>\)를 참조해주세요.

### 부트스트래핑

초기 단계에서 신뢰할 수 있는 플랫폼을 만들기 위해, 오직 신뢰할 수 있는 주체들만 Klaytn Governance Council의 잠재적인 멤버로 간주됩니다. 개발 및 안정화 단계에서 프로토콜이 신속하게 개선될 수 있도록 설계되었습니다.

## 거버넌스 사항

거버넌스 구조를 통해 결정할 수 있는 주요 사항은 다음과 같은 3가지이며, 추가 의사결정이 필요한 제안은 정기 회의나 임시 회의에서 검토될 수 있습니다. Klaytn Governance Council은 Klaytn의 성장에 가장 적합한 결정을 내려야 합니다.

1. **기술**: 플랫폼의 기술 업데이트와 관련된 사항입니다. 여기에는 블록체인 기본 구조 \(예: Account Structure\), 새 기능 \(예: L2 Solution\) 또는 소프트웨어 업데이트 일정에 대한 사항이 포함됩니다.
2. **이코노미**: KLAY 유통구조의 추가발행, 트래잭션 비용의 변경, 기여 증명 서비스 평가 방법의 변경, Klaytn 개선 준비금(Improvement Reserve) 지출 승인 등의 이슈들이 여기에 포함됩니다.
3. **거버넌스 규칙**: 거버넌스 사항 및 프로세스, 거버넌스 기관의 책임과 권리 등에 대한 규칙이 이 범주에 포함됩니다.

## 거버넌스 프로세스

거버넌스 프로세스의 목표는 제안 상정부터 투표까지 의사결정 과정을 함께 정의하는 것입니다. 거버넌스 프로세스는 제안의 종류에 따라서 세부사항이 달라질 수 있습니다. Klaytn 거버넌스 프로세스는 투표 과정과 결과가 Klaytn 생태계 참여자에게 투명하게 공개될 수 있도록 온체인에서 이루어지는 것을 목표로 합니다. 그러나 처음에는 Klaytn 거버넌스 프로세스가 오프체인 환경에서 운영되며, 토론 및 결정 결과를 투명하게 공개하는 방식으로 운영될 수 있습니다.

Klaytn은 주로 프로토콜 내\(온 체인\)에서 거버넌스 프로세스가 수행되는 것을 목표로 합니다. 이 과정에서 투표는 블록체인상에 기록되고, 결과는 투표에 따라 실행될 것입니다. 플랫폼이 성장하면서 온체인 거버넌스를 통해 더 많은 사항들이 다루어 질 것입니다.

### 일반 거버넌스 프로세스

거버넌스 프로세스는 '제안 소개, 자문위원들의 의견서 제출, Council 멤버들의 투표, 투표 결과에 따른 후속 절차 진행'의 순서로 진행됩니다.

제안을 상정할 권리를 가진 사람들은 제안을 상정하고 각 제안을 투표에 부칠 수 있습니다. 제안이 상정되면 자문위원들은 전문가 분석을 하고 그 결과와 함께 의견서를 제출해야 합니다.

Klaytn Governance Council 멤버들은 상정된 제안에 대해 투표할 권리가 있으며, 자문위원들의 의견서를 참고하여 최선이라고 생각되는 선택에 투표할 것입니다. 득표수가 기준 득표수를 넘으면 제안은 통과되고, 그렇지 않으면 기각됩니다. 승인된 제안에 대한 후속 조치는 의장(chairman)이 주도하게 되며, 의장은 임기 내에 의회에서 통과된 모든 안건을 수행할 책임이 있습니다. 구체적인 제안 투표와 후속 조치는 아래에 설명된 절차를 따릅니다.

* **코어 업데이트**: Klaytn의 핵심 코드 업데이트 관련 제안입니다. 투표는 온라인에서 이루어집니다. However, even if the code update is passed, software update must take place on a set date for this code to be implemented. As such, the software update will also be proposed, and if it is passed, the core update will take place on the set schedule of software update.
* **Parameter Change**: This concerns the proposals that will be applied on the blockchain without any code updates. Currently, matters such as gas price, block reward amount, block reward distribution ratio, voting period, number of committee members, and more can be decided without code updates. The proposer may initiate the voting process, and the vote will take place on-chain during a predetermined voting period. Each voter’s choice will be saved in the block header, and the vote will automatically be closed once the voting period is over. Once the same length of time as the voting period passes after the vote, the decision will be automatically implemented to the platform. Therefore, no specific follow-up procedure is necessary. 
* **Standard Proposal**: This concerns proposals that request the approval of new standards for Klaytn, and the vote takes place online. As there is nothing to be changed in the platform, an approved proposal will only see an official announcement that Klaytn has officially approved a standard change.

### Klaytn Improvement Reserve Governance Process

Unlike usual governance processes, the KIR governance process takes a series of steps composed of introduction of a proposal, spending approval, and follow-up procedures to implement an approved proposal.

KIR’s proposal introduction methods are the following two.

1. The financial commission, which votes on Klaytn’s financial issues and is composed of the finance commission members, can introduce a new proposal.
2. A proposal passed by the House of Representatives, a system that evaluates different proposals through the votes of all users, is automatically introduced as a new proposal.

The KIR’s final spending proposal will be determined through the votes of the Klaytn Financial Commision members. The goal is to automatically implement approved proposals on-chain as soon as it is passed, but in the early days following Klaytn’s launch, this process may be handled manually.

## Duties and Rights of the Governing Body

**Duties**

Klaytn Governance Council is required to actively participate in Klaytn Governance Process and vote for the long-term growth of Klaytn.

**Voting Rights**

Each of the Klaytn Governance Council members can cast one vote. This was decided as it is important to make sure one body cannot hold monopolistic power over Klaytn. However, the number of votes each council member has may increase later on depending on their level of contribution to the platform and governance structure as well as on their amount of staked KLAY. Each governance council member will have their number of votes determined using the following formula. The maximum value that can be given by the following formula is capped at two, and thus each governance council member’s number of votes will be a real number between one and two.

* *1+α×f\(governance contribution\)+\(1-α\)×g\(staking contribution\), where 0&lt;a&lt;1*

governance contribution may be calculated using the number of new proposals introduced and whether the proposals were passed, voting participation rate for all proposals, etc.

## Governance Roadmap

The bodies participating in governance must act in consideration of Klaytn’s long-term benefits rather than just for their personal interests, and they must actively participate in the voting process. Additionally, all participants that contribute to the network as Klaytn Governance Council members must secure computing resources that are greater than the platform requirements and stake a set amount KLAY of their own or from third parties. For the smooth operations in development and stabilization of the platform, Klaytn. Pte. Ltd. will take many roles in governance related matters in the initial development phase. In the future, however, other bodies will gradually take greater roles in the decision-making process, and they will have the right to participate independently.

* **Development Phase**: The initial development phase after the mainnet launch must quickly see parameter adjustments, new feature developments, etc. For this to be possible, many issues will be decided through gathering the opinions of the Klaytn Governance Council members, service providers, and community members. To secure initial stabilization, Klaytn. Pte. Ltd. may assist in the decision-making process. Additionally, all decided matters will be transparently shared with the public.
* **Stabilization Phase**: The Klaytn Governance Council has voting rights on most proposals. For special matters such as those concerning platform development, the opinion of Klaytn. Pte. Ltd. may be taken into consideration. For specific topics with the possibility of conflict of interest \(rewards for CCOs, etc.\), separate entities such as foundations will advise the council.
* **Decentralization Phase**: Following the stabilization period, to gather additional opinions, more service providers and other bodies may additionally be brought into the decision-making process.