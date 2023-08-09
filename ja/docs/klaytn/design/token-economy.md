# トークン経済 <a id="token-economy"></a>

## Overview <a id="overview"></a>

Klaytnのトークンエコノミーは、エコシステム、成長イニシアチブ、および戦略的投資を可能にする持続可能な資金調達構造を作成するように設計されています。 多くのパブリックブロックチェーンプロジェクトには、ノードのオペレータを単にインセンティブとする金銭システムがあります。\(鉱夫またはブロック生成者\) ネットワークメンテナンスの技術的側面だけに焦点を当てています ただし、 そのようなデザインは、ネットワークのトークン経済の成長に貢献したり、長期的な成長見通しに投資する他のタイプの参加者にインセンティブを与えることの重要性を見逃しています。 対照的に、Klaytnのトークンエコノミーは、より広い範囲の参加者からのより多様な貢献を補うように設計されています。 そして、将来の成長イニシアチブやブロックチェーンノードの維持に加えて戦略的に調達された投資プロジェクトを促進するために持続的なリソースを調達するための資金構造を内蔵しています。

## 資金調達構造 <a id="funding-structure"></a>

Klaytnの資金調達構造は、Klaytnネットワークのブロック生成によって継続的に実行されます。 すべての新しいブロックで 新しく発行されたKLAYとブロック\（総称して「ブロック報酬」と呼ばれる）で使用される取引手数料の合計は、所定の比率に従って、以下の3つの宛先口座に集約され、分配されます。

* Klaytn Governance Council (GC) Reward:
    * GC Block Proposer Reward: 10%
    * GC Staking Award: 40%
* Klaytn Community Fund \(KCF\): 30%
* Klaytn Foundation Fund \(KFF\): 20%

6.4 KLAYは新しいブロックごとに発行されます。 これは、年間約2億KLAYが鋳造されることを意味します。 これは、発生時に発行される100億KLAYに対して2%の年間インフレに相当します(クラインガバナンスプロセスを通じて年間インフレ率が変化する可能性があります)。 トランザクション手数料はOPCODEごとに課金され、トランザクション手数料表に従って課金されます。 取引手数料表の詳細については、 [取引手数料](transaction-fees/transaction-fees.md) を参照してください。

## Klaytn Governance Council 報酬 <a id="klaytn-governance-council-reward"></a>

Klaytn Governance Councilは、コアセル演算子\(CCOs\)の集団グループです。 評議会メンバーはコアセル\(CCs\)を維持する責任があります。 これにより、協議会は、基盤となるインフラストラクチャを提供する責任を負うKlaytnエコシステムの不可欠な機関になります。 理事会のメンバーになるには、候補者は、Klaytn Governance Process によって資格審査を受け、少なくとも500万KLAYを投資する必要があります。 Klaytn Governance Council Rewardは、評議会のメンバーがKlaytnエコシステムの安定した基盤を提供し続けるように奨励するための構造です。

### Klaytn Governance Council 報酬メカニズム <a id="klaytn-governance-council-reward-mechanism"></a>

各ブロックについて、ランダムに選択された評議会メンバーで構成された委員会が形成されます。 各委員会には提案者の役割を1名ずつ割り当てられており、他の委員はすべて検証者の役割を担っています。 ブロックが正常に作成され、Klaytnブロックチェーンに追加された場合 上記のブロックの提案には、ブロック報酬の100%が付与されます。 理事会メンバーが提案者を選択する確率は、メンバーが投資したKLAYの金額に比例します。 つまりKLAYが加入すればするほど メンバーが提案者として選択され、ブロック報酬を受け取る可能性が高くなります。

最小5百万KLAYステーキング要件が満たされている限り、 Klaytnガバナンス評議会のメンバーは自由に自らのKLAYを賭けたり、解除したりすることができます。 ステーキング情報は86,400ブロックごとに更新され、新たにステークされたKLAYはステーキングが完了した時点から2回のアップデートサイクル後に情報効果をもたらします。 ステークされたKLAYの撤回には、悪意のあるメンバーが直ちに終了するのを防ぐために1週間の遅延が必要です。

高く投資された評議会メンバーの少人数グループによるKlaytnガバナンス評議会報酬の主張の独占を防ぐため。 ジニ係数は、ステークKLAYの有効量を調整するために使用することができます。 Gはガバナンス協議会のKLAYステーキングディストリビューションのジニ係数を表しています。

* _ステーキング量を調整する = \(理事会メンバーのステーキング金額\)^\(1/1+G\)_


### 不正行為評議会のメンバーに対するペナルティ <a id="penalty-for-misbehaving-council-members"></a>

評議会のメンバーは、以下に定義された誤った行為を行うための罰則の対象となることができます。 将来的には、Klaytnガバナンスプロセスを通じて、より多くのペナルティルールを確立し、改善することができます。

安全の原因:

* 提案者として選択された評議会メンバーは、同じ高さで複数のブロックを作成することはできません
* 提案者として選択された評議会メンバーは、意図的に特定の取引を省略してはいけません。

生存率の失敗原因:

* 提案者として選択された評議会メンバーは有効なブロックを作成する必要があります
* 検証者として選択された評議会メンバーは、提案者によって提案されたブロックを検証しなければなりません

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
