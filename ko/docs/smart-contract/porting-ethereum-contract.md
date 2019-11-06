# 이더리움 컨트랙트 이식 <a id="porting-ethereum-contract"></a>

대부분의 경우 Klaytn에서 이더리움 컨트랙트를 수정 없이 사용할 수 있습니다. 그러나 다음 두 가지 문제에 유의하세요.

## 솔리디티 버전 <a id="solidity-version"></a>

Klaytn은 공식적으로 솔리디티 v0.4.24 및 v0.5.6을 지원합니다. 이 두 버전은 철저한 테스트를 거쳤습니다. 다른 버전에서도 문제 없이 실행될 것으로 기대하지만, 이 두 버전을 사용하는 것을 강하게 추천합니다.

## 분리된 키 쌍 <a id="decoupled-key-pairs"></a>

Klaytn은 [키 쌍을 주소에서부터 분리합니다](../klaytn/design/accounts.md#decoupling-key-pairs-from-addresses). 사용자가 [계정을 업데이트](../klaytn/design/transactions/basic.md#txtypeaccountupdate)할 경우, 특정 계정의 개인키는 다른 것으로 대체됩니다. 대부분의 경우 이는 비즈니스 로직에 영향을 미치지 않습니다. 그러나 비즈니스 로직에 ecrecover가 포함될 경우, validateSender를 고려해야 합니다. 자세한 내용은 [여기](./precompiled-contracts.md)를 참조하세요.
