## Enterprise Proxy의 필요성
Klaytn Enterprise Proxy(EP)는 Klaytn에서 블록체인 어플리케이션(BApp)을 운영하는 사업체를 대신하여 Klaytn 블록체인과 통신하는 오프체인 프록시입니다. EP는 Klaytn의 기업 경험(Enterprise Experience, EX)을 개선하기 위해 만들어졌습니다. EP는 트랜잭션 전처리, 필수 데이터 입력, 트랜잭션에서 요청한 스마트 컨트랙트 실행 등 블록체인과의 커뮤니케이션에서 관리상 복잡한 부분을 해결합니다.

EP는 주요 기존 자산과 툴의 원활한 결합을 통해 더 많은 혜택을 누릴 수 있는 엔터프라이즈 사용자 및 대규모 어플리케이션 공급자를 위한 애드온 서비스로 디자인되었습니다. 또한, 편의를 제공하면서도 블록체인의 가장 중요한 특징 중 하나인 '탈중앙화'에 부정적인 영향을 끼치지 않도록 설계되었습니다. In this regard, EP is a differentiation feature for Klaytn as it encompasses various offerings of useful tools for enterprise users, including Oracle, an application-specific dashboard. Further, EP enables enterprise users to use Klaytn blockchain with traditional database and security systems typically believed to be difficult to integrate with decentralized systems, such as access control layers (ACL), firewalls (FW), and fraud detection systems (FDS). At its onset, EP will be offered as a software framework that stands between the legacy backend systems and Klaytn. In this way, EP allows users without extensive knowledge about blockchain to easily sync blockchain data and relay transactions via a single configuration.

EP provides BApp service providers with two main usages. First, EP functions as a **blockchain enabler** reduce the technical hurdles in tasks inevitable for using blockchain technology. Second, EP serves as a **legacy system integrator** that supports Klaytn blockchain integration with traditional database and security systems

1. Blockchain Enabler
 - Event handler (WIP) : if users deploy smart contracts through EP, event subscriber will be generated automatically with abi of them
 - Transaction manager : the service providers will be able to manage transactions and accounts such as transaction throttling, nonce increasing and account authentication
 - Chain router : configuring multi-Klaytn clients used for BApp


2. Legacy System Integrator
 - Requests transcoder : supporting various type of API including gRPC, RESTful API request
 - Request gateway : collecting client metrics for analytics



 ## Blockchain Enabler

 From a service provider's perspective, blockchain can be a very unfamiliar technology unlike any other commercial solutions. For these groups of users, even the simplest value transfers or smart contract executions may require prohibitive amount of complexities and business logic considerations. To address this problem, Klaytn will address the fundamental complexity through provisioning of tools that make it easier to apply blockchain as easy-to-use essential elements readily applicable to existing services.


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
