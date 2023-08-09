# 토큰 이코노미 <a id="token-economy"></a>

## Overview <a id="overview"></a>

클레이튼의 토큰 이코노미는 플랫폼의 생태계 운영, 성장 계획, 전략적 투자를 지속가능하게 지원하기 위한 구조를 갖추도록 설계되었습니다. 많은 공개 블록체인 프로젝트들의 토큰 이코노미는 네트워크 유지라는 기술적 측면에만 초점을 맞추면서 노드 운영자(채굴자 또는 블록 생산자)에게만 유인을 제공합니다. 그러나 이는 네트워크의 확장에 기여하거나 장기 성장에 투자하는 다른 참여자들에게 유인을 제공하는 중요성을 간과하는 것입니다. 클레이튼의 토큰 이코노미는 폭넒은 영역의 참여자들의 더 다양한 형태로 기여하고 이에 대해 보상을 받을 수 있도록 설계되었습니다. 또한, 블록체인 노드 운영 외에도 외에도 미래 성장 계획이나 전략적으로 기획된 투자 프로젝트를 지원하기 위해 지속적으로 재원을 공급할 수 있는 구조를 가지고 있습니다.

## 펀딩 구조(Funding Structure)<a id="funding-structure"></a>

클레이튼의 펀딩 구조는 클레이튼 네트워크의 블록 생성과 함께 지속적으로 운영됩니다. 모든 신규 블록에서 발행된 KLAY, 그리고 블록\(총칭 "블록 보상" \)에 사용된 트랜잭션 수수료의 합계는 사전 결정된 비율에 따라 다음 세 개의 계정에 집계 및 배포됩니다.

* Klaytn Governance Council (GC) Reward:
    * GC Block Proposer Reward: 10%
    * GC Staking Award: 40%
* Klaytn Community Fund \(KCF\): 30%
* Klaytn Foundation Fund \(KFF\): 20%

6.4 KLAY will be minted for every new block. This implies that approximately 200 million KLAY will be minted annually, which is equivalent to 2% annual inflation against the 10 billion KLAY issued at genesis \(the annual inflation rate is subject to change through the Klaytn Governance Process\). 트랜잭션 수수료는 OPcode당 부과되며, 트랜잭션 수수료 표에 따라 책정됩니다. 트랜잭션 수수료 표에 대해서 더 자세한 정보를 알고 싶으시다면 [트랜잭션 수수료](transaction-fees/transaction-fees.md)를 참고해주세요.

## 클레이튼 거버넌스 카운슬 보상 <a id="klaytn-governance-council-reward"></a>

클레이튼 거버넌스 카운슬은 코어 셀 운영자\(CCOs\)들의 집단입니다. 카운슬 구성원은 코어 셀 \(CCs\)을 유지해야 할 책임이 있으며, 이 카운슬은 클레이튼 생태계에서 기본 인프라 제공을 담당하는 필수 기관이됩니다. 카운슬 멤버가 되려면 클레이튼 거버넌스 프로세스에서 자격 검토를 받아야하며, 5백만 KLAY라는 최소 스테이킹 조건을 충족해야 합니다. Klaytn 거버넌스 카운슬 보상은 카운슬 멤버들이 Klaytn 생태계의 안정적인 기반이 될 수 있도록 유인을 제공하는 구조입니다.

### 클레이튼 거버넌스 카운슬 보상 메커니즘 <a id="klaytn-governance-council-reward-mechanism"></a>

모든 블록마다 무작위로 선정된 카운슬 멤버로 이루어진 위원회가 구성됩니다. 각 위원회는 한 멤버가 제안자(Proposer) 역할을 할당받습니다. 다른 모든 위원회 위원은 검증자(Validator)의 역할을 맡습니다. 블록이 성공적으로 생성되어 클레이튼 블록체인에 추가되면, 해당 블록의 제안자에게는 블록 보상의 100%가 제공됩니다. 카운슬 멤버가 제안자로 선정될 확률은 회원이 스테이크한 KLAY의 양에 비례합니다. 즉, 더 많은 KLAY를 스테이크 할수록 멤버가 제안자로 선정되어 블록보상을 받을 가능성이 커집니다.

요구사항인 최소 500만 KLAY 스테이킹이 충족되는 한 클레이튼 거버넌스 카운슬 멤버는 자신의 KLAY를 자유롭게 스테이크하거나 언스테이크(unstake) 할 수 있습니다. 스테이킹 정보는 86,400블록마다 업데이트되며, 새로 스테이크 된 KLAY는 스테이킹이 완료된 후 두 번의 업데이트 주기 이후에 효력이 생깁니다. 스테이크 된 KLAY를 인출하는 일은 악의적인 멤버가 즉시 빠져나가지 못하도록 일주일 정도 지연됩니다.

많이 투자한 소규모 그룹의 카운슬 멤버들이 클레이튼 거버넌스 카운슬 보상을 독점하는 것을 막기 위해 지니 계수(Gini coefficient)가 이용되어 스테이크 된 Klay의 유효 수량을 조정할 수 있습니다. 적용 공식은 다음과 같습니다. G가 거버넌스 카운슬의 KLAY 스테이킹 배분의 지니 계수를 나타냅니다.

* _조정된 스테이킹 양(Adjusted staking amount) = \(카운슬 멤버의 스테이킹 양\)^\(1/1+G\)_


### 잘못된 행동을 하는 카운슬 멤버에 대한 처벌 <a id="penalty-for-misbehaving-council-members"></a>

카운슬 멤버는 아래와 같은 잘못된 행동을 하면 처벌의 대상이 될 수 있습니다. 앞으로 클레이튼 거버넌스 프로세스를 통해 더 많은 페널티 규칙이 수립되고 수정될 수 있습니다.

Safety Failure를 일으키는 경우:

* 제안자로 선택된 카운슬 멤버는 같은 높이에 두 개 이상의 블록을 만들 수 없습니다.
* 제안자로 선정된 카운슬 멤버는 의도적으로 특정 트랜잭션을 제외할 수 없습니다.

Liveness Failure를 일으키는 경우:

* 제안자로 선택된 카운슬 멤버는 유효한 블록을 생성해야 합니다.
* 검증자로 선정된 카운슬 멤버는 제안자가 제안한 블록을 검증해야합니다.

## Klaytn Community Fund <a id="klaytn-community-fund"></a>
The Klaytn Community Fund (KCF) was established to support Klaytn's mission of enabling greater transparency and verifiability. It's important to keep in mind that the former Klaytn Growth Fund (KGF) and Klaytn Improvement Reserve (KIR) have merged to become the new Klaytn Community Fund (KCF).

The Klaytn Community Fund will be used to fund activities that improves the Klaytn ecosystem, such as:

1. **Rewarding Proof of Contribution**: The KCF will provide follow-up support, such as gas fee support to projects that have made significant on-chain contributions to the Klaytn ecosystem among services that have already been developed.
2. **Building our Developer Community**: The KCF will support various initiatives including hackathons, development education programs, collaborative research with the industry, and collaboration with various DAOs to foster and grow the Klaytn developer community.
3. **Fostering Ecosystem Services and Infrastructure**: The KCF will support essential ecosystem infrastructure, alongside the development of services with clear utility and provide marketing support.
4. **Klaytn Eco Fund Indirect Investment**: The KCF will make indirect mid-to long-term investments by entrusting specialized crypto VCs, and most of the profits generated upon subsequent investment recovery will be returned to the Klaytn ecosystem.

The administration of the Klaytn Community Fund follows a process in which the GC reviews and approves the use of funds in public forums on [Klaytn Square](https://square.klaytn.foundation/Home). The Foundation will submit a budget proposal for each category to the GC for approval. Within the approved budget, each specific use will be reviewed and approved again by the GC. In the meantime, the KCF is currently being run as a [pilot program](https://klaytn.foundation/kcf-grant-pilot/) and interested parties can visit the [Klaytn Governance Forum](https://govforum.klaytn.foundation/t/operational-procedures-of-the-kcf-grant-program-pilot/288) for more details about the program.

## Klaytn Foundation Fund <a id="klaytn-foundation-fund"></a>

Klaytn Foundation Fund (KFF) is an operational fund that will focus on this two main categories:

1. **Ecosystem Support**: This includes providing minor financial assistance, securing new GC members, liquidity provisions, and developing / funding services led by the Foundation.
2. **Foundation Operations**: This includes operating expenses such as development, accounting, infrastructure operations, marketing, and labor, as well as financial management and investment attraction costs.

Similar to KCF, KFF will be executed autonomously and transparently after obtaining approval from the GC via on-chain voting.

For more information, kindly read this [article](https://medium.com/klaytn/klaytn-tokenomics-optimization-governance-proposal-securing-a-sustainable-verifiable-token-1efd2a49b04e).
