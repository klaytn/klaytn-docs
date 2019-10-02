## Enterprise Proxy의 필요성
Klaytn Enterprise Proxy(EP)는 Klaytn에서 블록체인 어플리케이션(BApp)을 운영하는 사업체를 대신하여 Klaytn 블록체인과 통신하는 오프체인 프록시입니다. EP는 Klaytn의 기업 경험(Enterprise Experience, EX)을 개선하기 위해 만들어졌습니다. EP는 트랜잭션 전처리, 필수 데이터 입력, 트랜잭션에서 요청한 스마트 컨트랙트 실행 등 블록체인과의 커뮤니케이션에서 관리상 복잡한 부분을 해결합니다.

EP는 주요 기존 자산과 툴의 원활한 결합을 통해 더 많은 혜택을 누릴 수 있는 엔터프라이즈 사용자 및 대규모 어플리케이션 공급자를 위한 애드온 서비스로 디자인되었습니다. 또한, 편의를 제공하면서도 블록체인의 가장 중요한 특징 중 하나인 '탈중앙화'에 부정적인 영향을 끼치지 않도록 설계되었습니다. EP는 엔터프라이즈 사용자들을 위해 오라클이나 어플리케이션별 대시보드 등을 제공하는 다른 플랫폼과 차별되는 기능입니다. 더욱이 EP를 통해 엔터프라이즈 사용자는 액세스 제어 계층(ACL), 방화벽(FW), 이상 거래 탐지 시스템(FDS)과 같이 탈중앙화 시스템과 결합이 어렵다고 여겨지는 기존 데이터베이스 및 보안 시스템과 함께 Klaytn Blockchain을 사용할 수 있습니다. 시작 시 EP는 기존 백엔드 시스템과 Klaytn 사이에 있는 소프트웨어 프레임워크로 제공됩니다. 이러한 방식으로 EP를 사용하면 블록체인에 대한 지식이 많지 않아도 single configuration을 통해 블록체인 데이터 및 릴레이 트랜잭션을 쉽게 동기화할 수 있습니다.

BApp 서비스 제공자는 EP를 크게 두 가지 용도로 사용할 수 있습니다. 첫째, EP 기능은 **blockchain enabler**로써 블록체인 기술을 사용할 때 피할 수 없는 기술적 장애를 줄여줍니다. 둘째, EP는 Klaytn 블록체인과 기존 데이터 베이스 및 보안 시스템을 통합하는 **legacy system integrator** 역할을 합니다.

1. Blockchain Enabler
 - Event handler (WIP) : 사용자가 EP를 통해 스마트 컨트랙트를 배포할 경우 event subscriber는 해당 컨트랙트의 abi와 함께 자동으로 생성됩니다.
 - Transaction manager: 서비스 제공자는 트랜잭션 쓰로틀링(throttling), nonce 증가, 계정 인증 등 트랜잭션과 계정 관리 기능을 이용할 수 있습니다.
 - Chain router: BApp에 사용되는 multi-Klaytn clients 구성을 설정합니다.


2. Legacy System Integrator
 - Requests transcoder : gRPC, RESTful API 요청을 포함한 다양한 유형의 API 지원
 - Request gateway : 분석을위한 클라이언트 메트릭 수집



 ## Blockchain Enabler

 서비스 제공자의 관점에서 블록체인은 다른 상용 솔루션들에 비해 낯선 기술일 수 있습니다. 이러한 사용자 그룹의 경우 가장 단순한 토큰 전송이나 스마트한 컨트랙트 실행도 엄청나게 복잡하고 비즈니스 로직 상 고려할 것이 많다고 느껴질 수 있습니다. 이 문제를 해결하기 위해, Klaytn은 블록체인을 쉽게 기존 서비스에 적용할 수 있도록 만들어 주는 툴 프로비져닝을 통해 기본적인 복잡성 줄였습니다.


 ### Event handler

 The event handler feature aims to address the innate complexities that comes with managing smart contracts deployed on the blockchain. Smart contracts are critically important elements of a BApp's business logic that are made publicly accessible and executable once deployed. Further complicating the problem is the fact that tracking who executed the smart contract to what end is a non-trivial task in decentralized environment such as blockchain. Event handler alleviates this challenge by automatically creating event subscribers that track any following events that affect the deployed smart contract. This feature is achieved through utilizing the application binary interface (ABI) that is created at the time the smart contract is deployed.


 ### Transaction manager

 Sending transactions is a frequently occurring portion of work that is surprisingly complicated for BApps to manage properly. Often, a BApp is composed of multiple accounts which are assigned different roles, where each account can have a separate history of transactions. On each account, the nonce must be separately managed and coordinated with exact accuracy to avoid inconvenient transaction failures. The receipts resulting from each transaction are also important data that must be managed with a clear organization scheme for efficient retrieval that happens inevitably and frequently during the course of service operation. The transaction manager feature automates most of the heavy lifting of transaction delivery, including account management for applying the correct account to send transactions with, authenticating transaction transfers with the correctly corresponding identities and intentions, and managing transaction receipts in a well-organized manner. In overall, the transaction manager can be a tremendous help for enterprise users yet unfamiliar with organizing blockchain transactions.


 ### Chain router

 Klaytn is an easily-scaleable blockchain solution where enterprises could compose a separate blockchain network using Klaytn's native scalability solution Service Chain. This may lead to the existence of multiple private Service Chain instances operated by partner enterprises alongside the public Klaytn network. In such case, a BApp collaborating with multiple Klaytn networks may need to state to which network it is sending a transaction. The chain router features handles the identification, configuration, and management of multiple Klaytn network information for BApp service providers.


 ## Legacy System Integrator

 Compatibility and integrability with existing processes and assets are key evaluation criteria used by businesses when they consider new technologies for adoption. As a distributed system with numerous points of access and without a unified authority to singlehandedly control access privileges, blockchain technology propose a unique challenge for enterprise in terms of business backend system integration which corporates typically expect to be centrally controllable. Klaytn aims to solve this non-trivial challenge using a newly designed approach applied to Enterprise Proxy, incorporating legacy system integrator features into the offerings.


 ### Request Transcoder

 Request transcoder can be compared to a communication translator among heterogeneous systems. This feature receives requests from legacy systems in their native contexts, for example in REST API calls or gRPC calls, and converts them to transactions that can be processed by the underlying Klaytn blockchain network in an efficient manner.


 ### Request Gateway

 Collecting user behavior metrics and controlling contract execution request privileges per individual user is notoriously complex in distributed systems with multiple points of access. EP handles this challenge by providing a feature that enables service providers to require contract execution calls by users to be signed by an EP designated by the business. Through this scheme, users must send their contract execution requests to the EP in order to run the desired contracts, effectively turning the EP into a request gateway with which the business can collect user behavior metrics and enforce security measures to authorize user requests.

 As aforementioned, collecting metrics in a decentralized environment is a non-trivial task. Using the request gateway feature, however, businesses can monitor all user requests that go through the EP and collects meaningful metrics, including the number of DApp users,  estimated DApp memory usage, TPS, service latency, and the average gas price for running contracts. The service provider can then project the collected metrics on a dashboard to display the status of the BApp, or trigger other functions or systems to respond to events observed from the metrics. Klaytn will provide a software framework to help service providers implement business intelligence dashboard systems that run request gateway to collect metrics and visualize the collected metrics.
