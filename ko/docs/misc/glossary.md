# 용어집 <a id="glossary"></a>

| 용어                   | 설명                                                                                                                                                                      |
|:-------------------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BApp                 | 블록체인 애플리케이션(Blockchain application)                                                                                                                                     |
| 블록 보상(Block Rewards) | 블록생성시 새로 발행한 KLAY와 사용한 수수료 총합                                                                                                                                           |
| 부트노드(Bootnode)       | 부트노드는 PN 및 EN이 네트워크에 자신을 등록하고 다른 노드에 연결하는 것을 도와주는 노드입니다.                                                                                                                |
| caver-js             | [caver-js](../bapp/sdk/caver-js/README.md)는 JavaScript API 라이브러리로 개발자가 Klaytn node와 상호작용하도록 합니다.                                                                        |
| caver-java           | [caver-java](../bapp/sdk/caver-java/README.md)는 Java API 라이브러리로 개발자가 Klaytn 노드와 상호작용하도록 합니다.                                                                            |
| CC                   | [코어 셀(Core Cell)](../node/core-cell/README.md). 코어 셀은 Klaytn 블록체인 네트워크에서 블록을 생성하는 역할을 합니다.                                                                              |
| CCN                  | 코어 셀 네트워크(CCN). 네트워크는 제출된 트랜잭션를 검증하고 실행하는 코어 셀(CC)로 구성됩니다.  CCN은 또한 트랜잭션을 포함한 블록을 생성하고 전파하는 역할을 합니다.                                                                    |
| CN                   | Klaytn 컨센서스 노드(Consensus Node). 코어 셀 네트워크에서 다른 CN과 새로운 블록을 생성하는 노드. [코어 셀(Core Cell)](../node/core-cell/README.md) 참조.                                                  |
| CNN                  | 컨센서스 노드 네트워크(Consensus Node Network, CNN). CNN은 CN으로 구성된 완전 메시형 (full mesh) 네트워크입니다.                                                                                    |
| 위원회(Committee)       | 비잔틴 장애 허용 Byzantine fault-tolerant (BFT) 컨센서스에 참여하는 선택된 컨센서스 노드 그룹.  위원회는 하나의 proposer와 여러 validator로 구성됩니다.                                                            |
| 카운슬(Council)         | 위원회(commitee)가 될 수 있는 모든 컨센서스 노드.                                                                                                                                       |
| EN                   | [엔드포인트 노드(Endpoint Node)](../node/endpoint-node/README.md). 엔드포인트 노드는 블록체인 네트워크의 말단지점 노드로  RPC API 요청을 처리하는 역할을 합니다.                                                    |
| ENN                  | 엔드포인트 노드 네트워크. ENN은 주로 트랜잭션을 생성하고, RPC API 요청을 처리하며, 서비스체인의 데이터 요청을 처리하는 엔드포인트 노드(EN)로 구성됩니다.                                                                           |
| EOA                  | 외부 소유 계정(EOA, Externally Owned Account). [Klaytn Account Types](../klaytn/design/accounts.md#klaytn-account-types) 참조.                                                  |
| 풀노드(Full node)       | 블록체인에서 생성된 모든 블록을 가지고 있는 노드.                                                                                                                                            |
| KGF                  | Klaytn Growth Fund. [Token Economy - Klaytn Growth Fund] 참조.                                                                                                            |
| KIR                  | Klaytn 개선 준비금(Klaytn Improvement Reserve). [Token Economy - Klaytn Improvement Reserve] 참조.                                                                             |
| KLAY                 | [KLAY](../klaytn/design/klaytn-native-coin-klay.md)는 Klaytn 내부에서 통용되는 주요 암호화폐로, 스마트 컨트랙트 생성/실행 및 KLAY 전송시 트랜잭션 수수료를 지불하는데 사용됩니다. 또한 KLAY의 통화 단위이며 1 KLAY는 10^18 peb입니다. |
| KLVM                 | [Klaytn 가상머신](../klaytn/design/computation/klaytn-virtual-machine/klaytn-virtual-machine.md)                                                                            |
| peb                  | KLAY의 가장 작은 통화 단위. [KLAY의 단위](../klaytn/design/klaytn-native-coin-klay.md#units-of-klay)를 참고해주세요.                                                                       |
| PN                   | Klaytn 프록시 노드. Klaytn 엔드포인트 노드 네트워크에서 받은 트랜잭션을 CN에 제출하는 노드. [코어 셀(Core Cell)](../node/core-cell/README.md) 참조.                                                          |
| PNN                  | 프록시 노드 네트워크(Proxy Node Network). PNN은 CCN의 PN들로만 구성된 네트워크입니다.                                                                                                           |
| 제안자(Proposer)        | 새로운 블록을 제안하는 컨센서스 노드.                                                                                                                                                   |
| Proposer reward      | 블록 제안자(Proposer)가 블록 보상(Block rewards)으로부터 받아가는 KLAY 금액.                                                                                                                |
| SCN                  | 서비스체인 네트워크(Service Chain Network). 이 네트워크는 메인체인 대비 높은 성능, 독자적 노드 구성 또는 별개의 보안 수준이 필요한 서비스에 특화된 보조 블록 체인 네트워크입니다. SCN Operation Guide 참조.                                |
| 서비스체인                | 하나 이상의 블록체인 기반 서비스를 실행할 수 있는 서비스 제공 업체 소유 블록체인.                                                                                                                         |
| 단가(Unit Price)       | Klaytn이 유지하는 고정된 가스 가격. [Unit Price](../klaytn/design/transaction-fees/transaction-fees.md#klaytn-growth-fund) 참조.                                                      |
| Validator            | 블록 제안자(Proposer)가 제안한 새로운 블록을 검증하는 컨센서스 노드.                                                                                                                             |
| Validator reward    | 블록 검증자(validator)가 블록 보상(Block rewards)으로부터 받아가는 KLAY 금액                                                                                                                |

