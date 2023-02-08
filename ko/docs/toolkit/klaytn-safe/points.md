# 참고 사항<a id="Points to Note"></a>

Klaytn Safe를 사용하면서 염두에 둘 사항들이 있습니다.

# Transaction Fees <a id="Transaction Fees"></a>

자금 전송이나 컨트랙트 호출 등 Klaytn Safe 트랜잭션들은 수수료를 발생시키는데, 이는 트랜잭션을 실행시키는 서명인(signer)에 의해 부담됩니다(요구 임계치를 최종 도달시키는 마지막 서명인).

# Safe 논스<a id="Safe Nonce"></a>

![](../img/klaytn-safe/21_safeNounce.png)

보안 상의 이유로 Safe로 생성된 트랜잭션들은 순서대로 실행되어야 합니다. 이를 위해 각 트랜잭션이 한 번만 실행되게끔 **nonce**라 불리는 숫자가 트랜잭션에 부여됩니다.

_마지막 실행 트랜잭션 +1_의 논스를 가진 트랜잭션들이 실행될 수 있습니다. 논스가 더 높은 트랜잭션들은 실행 대기 상태가 됩니다. 트랜잭션이 완료되면, 대기 중인 다음 트랜잭션이 충분한 서명을 모았다는 전제 하에 실행 가능해집니다.


# 체인별 주소<a id="Chain-specific addresses"></a>

![](../img/klaytn-safe/22_chainSpec.png)


주소 앞에 체인 이름을 붙일 수 있습니다.

* 주소 앞에 체인 이름 붙이기: 첫 번째 박스에 체크 하고, 주소 앞에 “baobab”을 붙일 수 있습니다.

![](../img/klaytn-safe/23_acctPrepend.png)

* 체인 이름이 붙은 주소를 복사합니다.

![](../img/klaytn-safe/24_chainAddrError.png)

위와 같이 대시보드에서 Safe 주소를 복사해서 붙여넣기 할 때, 체크박스 선택을 통해 체인 이름 추가 여부를 선택할 수 있습니다. 위와 같은 에러를 방지하려면 체크하지 않는 것을 권장합니다.

![](../img/klaytn-safe/25_copyAcctPrepend.png)