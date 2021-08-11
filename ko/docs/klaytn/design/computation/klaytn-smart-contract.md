# Klaytn 스마트 컨트랙트 <a id="klaytn-smart-contract"></a>

Klaytn 스마트 컨트랙트는 비즈니스 로직, 게임, 라이브러리, 토큰 전송 등 Klaytn 블록체인과 상호 작용하는 모든 유형의 코드를 실행하는 프로그램입니다. 스마트 컨트랙트에 쓰여있는 조건이 충족되면 컨트랙트는 즉시 실행됩니다. 스마트 컨트랙트 내의 조건은 프로그래밍 언어로 쓰여있습니다. 컨트랙트의 데이터는 상태(state)로 저장되어 있습니다.

Klaytn은 Klaytn 네트워크에서 스마트 컨트랙트를 작성하고 실행하는 몇 가지 방법을 제공합니다. 첫째, Klaytn은 솔리디티(solidity)를 지원하고 Remix 또는 트러플과 같은 이더리움 개발 툴킷과의 상호운용성을 가지고 있습니다. 솔리디티로 작성된 스마트 컨트랙트는 기존 솔리디티 컴파일러를 사용하여 컴파일하고 추가 작업없이 Klaytn에서 실행할 수 있습니다. Solidity는 이더리움의 사실상 표준 컨트랙트 프로그래밍 언어이며 활발한 커뮤니티를 가지고 있습니다. 따라서, Klaytn은 개발자에게 가장 친숙한 개발 환경을 제공하여 이더리움 Dapp 개발자들이 쉽게 그들의 작업을 Klaytn으로 마이그레이션 할 수 있도록 솔리디티를 지원합니다.

미래에 Klaytn은 다양한 프로그래밍 언어로 작성된 스마트 컨트랙트를 수용할 예정입니다. 그래서 더 광범위한 개발자를 지원하고, 그들이 가장 친숙한 개발 환경에서 개발할 수 있도록 만들 예정입니다. 앞으로 Klaytn은 개발자가 흥미로워하는 다양한 프로그래밍 언어를 계속 찾아나갈 것입니다.

## 경제적인 스마트 컨트랙트 실행 비용 <a id="affordable-smart-contract-execution-cost"></a>

스마트 컨트랙트 실행에 수수료를 청구하는 이유 중 한 가지는 잘못되었거나 악의적으로 작성된 컨트랙트가 실행되지 않도록 만들어 제한된 자원을 효율적으로 활용하기 위해서입니다. 즉, 블록체인은 \(1\)개발자들이 효율적으로 코드를 작성하게 만들고, \(2\) 악의적인 공격자가 공격했을 때 얻을 수 있는 경제적 이득을 줄이기 위해서 스마트 컨트랙트를 실행하는 데 소모되는 비용을 고의로 늘립니다. 이에 알맞는 전략은 정상적인 실행에는 비용을 적게 청구하고 악의적인 실행에는 많이 청구해야 합니다. 이더리움의 Opcode 기반 수수료 모델은 자원 낭비를 방지하는 데 유용하지만, 일부 Opcode\(예: state write\)의 높은 가스 가격 때문에 일반적인 스마트 컨트랙트도 실행하기 힘들게 만들 수 있습니다. 이는 블록체인 기술의 대중화를 막습니다. To address this problem, Klaytn plans to use an opcode-based fixed fee model with low unit cost per opcode. This is made possible by dramatically increasing scalability of blockchain protocol.

Opcode cost is directly related to the amount of resources that the platform can use. The Ethereum state write cost is high since the storage, and the network bandwidth required to record and propagate the changed states are limited. Conversely, if a blockchain has abundant resources \(e.g., CPU time, storage, network bandwidth\), then the unit cost per opcode can be substantially lower than that of Ethereum, and the cost difference between opcodes can be minimized. Klaytn aims to lower opcode unit cost by vertically scaling each CN node \(i.e., acquiring high-end hardware\), parallelizing computation \(i.e., logical scaling via service chain\), and horizontally scaling physical clusters.

