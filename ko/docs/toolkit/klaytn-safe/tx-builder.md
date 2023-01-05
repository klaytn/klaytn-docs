
## 트랜잭션 빌더<a id="Transaction Builder"></a>

트랜잭션 빌더는 트랜잭션 배치화를 위한 Klaytn Safe 내의 커스텀 앱입니다.  배치화라는 것은 여러 개의 트랜잭션을 하나하나 검증하는 대신 하나로 모을 수 있다는 것입니다. 단 한번만 검증하고 실행하면 됩니다.

트랜잭션 빌더를 사용하면 토큰 전송이나 복잡한 컨트랙트 사용까지 트랜잭션들을 생성하여 하나의 트랜잭션으로 배치화할 수 있습니다.

**예시**

여러 개의 일련의 주소들에 토큰을 에어드랍 하는 상황을 생각해봅시다. 예를 들어 10개의 주소에 100 DRIP 토큰이라고 해보겠습니다. 트랜잭션 10개를 생성하여 하나하나 검증, 실행하는 대신 트랜잭션 빌더를 사용하여 이 모든 전송 거래들을 단일 트랜잭션 하나에 담을 수 있습니다.

이 예시에서는 DRIP 토큰을 Safe 주소에 민팅했습니다.

트랜잭션 빌더를 사용해 예시를 들어보겠습니다.



**Step 1:** Safe App을 열어주세요.

![](../img/klaytn-safe/15_safeApps.png)

**Step 2:** 트랜잭션 빌더 Safe 앱을 열어주세요.

![](../img/klaytn-safe/16_safeTxBuilder.png)

**Step 3:** 토큰 컨트랙트 주소와 ABI를 입력합니다. 이 예시에서는 DRIP 컨트랙트 주소와 ABI를 사용합니다. ABI를 “Enter ABI” 필드에 붙여 넣습니다.

![](../img/klaytn-safe/17_safeTxBatchAddrAbi.gif)

**Step 4:** 메서드를 선택하고 트랜잭션 정보를 기입합니다.

드랍다운에서 메서드를 선택할 수 있습니다. 여기에서는 **transfer** 메서드를 사용하겠습니다. 이 단계가 완료되기 위해서는 **to(address)**와 **amount(uint256)** 같은 트랜잭션 정보를 기입해야 합니다.


참고: 소수점이 없는 unsigned interger입니다. 이 예시에서는 DRIP 토큰의 소수점은 18자리입니다. 따라서 1 DRIP을 보내고 싶다면, 1000000000000000000을 입력해야 합니다.

![](../img/klaytn-safe/18_safeTxBatchTxInfo.gif)

**Step 5:** **Add transaction**을 클릭합니다.

각 수신자 주소에 대해 **4**, **5**, **6**을 반복합니다.

**Step 7:** 이 모든 작업을 추가한 뒤 **Create Batch**를 클릭합니다.

![](../img/klaytn-safe/19_safeTxBatch.gif)

**Step 8:** 트랜잭션을 검토하고 전송합니다

전체 배치를 확인할 수 있습니다. 준비가 되었으면, 다른 Safe 트랜잭션과 마찬가지로 **Send Batch**를 클릭하여 트랜잭션을 전송하고 실행해주세요.

![](../img/klaytn-safe/20_safeTxBuildExec.gif)