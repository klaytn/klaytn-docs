# 오라클

블록체인 오라클은 블록체인과 다른 외부 데이터 소스 간의 연결고리 역할을 합니다. 실제 블록체인은 폐쇄형 시스템으로, 외부 시스템(오프체인 데이터)에서 데이터를 가져오거나 내보낼 수 없으며, 블록체인 내에 이미 존재하는 데이터에만 액세스할 수 있습니다. 이로 인해 블록체인이 실제 발생한 데이터를 얻을 수 없는 블록체인-오라클 문제가 발생합니다. 그러나 스마트 컨트랙트는 여러 가지 유용한 기능을 수행하기 위해 광범위한 외부 데이터 소스에 연결해야 합니다. 예를 들어, 오라클을 사용하여 금융 서비스에는 자산 가격을, 보험 서비스에는 날씨 데이터를, 게임에는 무작위성을, 공급망 관리에는 IoT 센서 등을 제공하는 [하이브리드 스마트 컨트랙트](https://chain.link/education-hub/hybrid-smart-contracts)가 있습니다.

외부 데이터 소스, 레거시 시스템, 고급 연산을 블록체인에서 사용하고 연결하기 위해 오라클이 등장했습니다. 블록체인 업계에서 오라클의 이점이 크기 때문에, 하이브리드 스마트 컨트랙트를 만들 때 충분히 조사한 후 오라클을 선택하는 것이 중요합니다. 가령 탈중앙화된 앱을 개발하려면 중앙화된 오라클이 아닌 탈중앙화된 오라클을 선택하는 것이 맞습니다. 중앙화된 오라클은 단일 주체에 의해 제어되므로 단일 장애 지점이 있어 스마트 컨트랙트가 공격에 취약할 수 있습니다. 반면에 분산형 오라클은 단일 장애 지점을 제거하여 중앙화된 오라클의 한계를 뛰어넘도록 설계되었습니다. 탈중앙화된 오라클은 P2P 네트워크의 여러 참여자로 구성되며 이들은 스마트 컨트랙트로 전송하기 전에 오프체인 데이터에 대해 합의합니다.

다음과 같은 프로젝트가 Klaytn과 통합하여 탈중앙화된 오라클 서비스를 제공하고 있습니다:

* [Orakl Network](https://docs.orakl.network/docs/developers-guide/readme)
* [Witnet](https://docs.witnet.io/)
* [SupraOracles](https://supraoracles.com/docs/overview)
* [KlayOracle](https://klayoracle.gitbook.io/v1.0.0/)