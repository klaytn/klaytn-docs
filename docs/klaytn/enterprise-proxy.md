## Necessity of Enterprise Proxy <a id="necessity-of-enterprise-proxy"></a>
Klaytn Enterprise Proxy (EP) is an off-chain proxy that communicates with underlying Klaytn blockchain on behalf of businesses that operate blockchain applications (BApp) on Klaytn. EP offers a layer of managed convenience for its client in order to improve the Enterprise Experience (EX) aspect of Klaytn, handling the managerial complexities in communicating with the blockchain - including transaction preprocessing, injection of necessitated data, and running the smart contracts requested by the transaction.

EP is designed as an add-on service for enterprise users and larger application providers who can benefit more from seamless integration with key legacy assets and tools without negatively impacting one of the most important quality of blockchain - decentralization. In this regard, EP is a differentiation feature for Klaytn as it encompasses various offerings of useful tools for enterprise users, including Oracle, an application-specific dashboard. Further, EP enables enterprise users to use Klaytn blockchain with traditional database and security systems typically believed to be difficult to integrate with decentralized systems, such as access control layers (ACL), firewalls (FW), and fraud detection systems (FDS). At its onset, EP will be offered as a software framework that stands between the legacy backend systems and Klaytn. In this way, EP allows users without extensive knowledge about blockchain to easily sync blockchain data and relay transactions via a single configuration.

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
