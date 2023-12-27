# 공개 JSON RPC 엔드포인트

공개적으로 노출된 JSON-RPC 엔드포인트를 사용하면 자체 노드를 실행하지 않고도 클레이튼 네트워크와의 상호작용을 제공하여 블록체인 제품을 테스트하고 실행할 수 있습니다.

자체 클레이튼 엔드포인트 노드(EN)를 운영하는 것은 간단하지 않으며, 기술 전문 지식, 모니터링 및 컴퓨팅 리소스가 필요합니다. 스토리지, 네트워크 대역폭을 유지하는 데 드는 비용과 엔지니어링 시간과 리소스를 투입해야 하며, 노드를 최신 상태로 유지하고 정기적으로 상태를 점검해야 합니다. 따라서 기존 퍼블릭 엔진 사용의 가장 큰 장점은 클레이튼 네트워크와 연결하고 상호작용하기 위한 인프라 유지에 신경 쓰지 않고 블록체인 제품을 구축하고 테스트하는 데에만 집중할 수 있다는 것입니다.
 
## 고려해야 할 사항

- 노드 제공자는 트래픽 또는 노드와의 상호 작용과 관련하여 발생하는 어떠한 손해나 손실에 대해서도 책임을 지지 않습니다.
- 특정 노드에 트래픽이 집중될 경우 서비스 지연이 발생할 수 있습니다.
- 너무 많은 요청을 방지하기 위해 노드별로 속도 제한이 적용될 수 있으며, 이는 사전 통지 없이 변경될 수 있습니다.

## 공용 JSON-RPC 엔드포인트 공급자

아래는 클레이튼의 퍼블릭 노드 공급자 목록과 네트워크 도메인입니다.

### 메인넷(Cypress) 퍼블릭 JSON-RPC 엔드포인트

이러한 엔드포인트는 테스트 및 개발 목적으로 커뮤니티에 제공된다는 점을 유념해 주세요.
엔드포인트의 가동 시간과 안정성을 보장할 수 없으므로 상업적 목적으로 사용하지 마세요.

**HTTPS**

|서비스 공급자|엔드포인트|네임스페이스|유형|
|---|---|---|---|
|[Klaytn 재단](https://www.klaytn.foundation)|`https://public-en-cypress.klaytn.net`|klay,eth,net|Full|
||`https://archive-en.cypress.klaytn.net`|klay,eth,net|Archive|
|[AllThatNode](www.allthatnode.com)|`https://klaytn-mainnet-rpc.allthatnode.com:8551`|klay,eth,net|Full|
|[BlockPI Network](https://blockpi.io/)|`https://klaytn.blockpi.network/v1/rpc/public`|klay,eth,net|Full|
|[OnFinality](https://onfinality.io/)|`https://klaytn.api.onfinality.io/public`|klay,eth,net|Full|
|[Pokt Network](https://pokt.network/)|`https://klaytn-rpc.gateway.pokt.network/`|klay,eth,net|Full|

**웹소켓**

|서비스 공급자|엔드포인트|네임스페이스|유형|
|---|---|---|---|
|[Klaytn 재단](https://www.klaytn.foundation)|`wss://public-en-cypress.klaytn.net/ws`|klay,eth,net|Full|
||`wss://archive-en.cypress.klaytn.net/ws`|klay,eth,net|Archive|
|[OnFinality](https://onfinality.io/)|`wss://klaytn.api.onfinality.io/public-ws`|klay,eth,net|Full|

## 테스트넷(Baobab) 퍼블릭 JSON-RPC 엔드포인트

**HTTPS**

|서비스 공급자|엔드포인트|네임스페이스|유형|
|---|---|---|---|
|[Klaytn 재단](https://www.klaytn.foundation)|`https://public-en-baobab.klaytn.net`|klay,eth,net|Full|
||`https://archive-en.baobab.klaytn.net/`|klay,eth,net|아카이브|
|[AllThatNode](www.allthatnode.com)|`https://klaytn-baobab-rpc.allthatnode.com:8551`|klay,eth,net|Full|
|[BlockPI Network](https://blockpi.io/)|`https://klaytn-baobab.blockpi.network/v1/rpc/public`|klay,eth,net|Full|

**웹소켓**

|서비스 공급자|엔드포인트|네임스페이스|유형|
|---|---|---|---|
|[Klaytn 재단](https://www.klaytn.foundation)|`wss://public-en-baobab.klaytn.net/ws`|klay,eth,net|Full|
||`wss://archive-en.baobab.klaytn.net/ws`|klay,eth,net|아카이브|

## 유용한 리소스

- 월렛: Kaikas는 클레이튼 네트워크의 브라우저 확장 지갑입니다.
[Kaikas](../../build/tools/wallets/kaikas.md)

- Faucet: Baobab 테스트 네트워크에 대한 테스트 KLAY를 얻을 수 있습니다.
[Faucet](../../build/tools/wallets/klaytn-wallet.md#how-to-receive-baobab-testnet-klay)

- 탐색기: Klaytnscope는 클레이튼 네트워크의 블록 탐색기입니다.
[Klaytnscope](../../build/tools/block-explorers/klaytnscope.md)

- ChainID : Baobab: 1001 (0x3E9), Cypress: 8217 (0x2019)

- 가스 가격: [25, 750] 범위 내에서 동적으로 조정됩니다. 범위는 온체인 거버넌스를 통해 변경할 수 있습니다. 자세한 내용은 [Governance](../json-rpc/governance.md)를 참조하세요.
[트랜잭션 수수료](../../learn/transaction-fees.md)

