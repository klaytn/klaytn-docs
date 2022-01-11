# 계정 관리 <a id="managing-accounts"></a>

## 계정 나열하기 <a id="list-your-accounts"></a>

다음은 데이터 디렉토리에 생성된 모든 계정 목록을 반환합니다.

### ken <a id="ken"></a>

명령행에서, 다음을 사용하여 CLI를 호출하세요:

```bash
$ ken account list --datadir <DATADIR>
$ ken account list --datadir ~/kend_home
Account #0: {bfc22a57999459b0c2ce6337deb9287e7a970e02} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-02-58.524962000Z--bfc22a57999459b0c2ce6337deb9287e7a970e02
Account #1: {47bd2e9565cbe1789454718d6cf1778d7ea557aa} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-04-44.840061000Z--47bd2e9565cbe1789454718d6cf1778d7ea557aa
```

**참고**: 키스토어 파일을 다른 노드에서 복사하거나 파일을 제거하면 이 반환된 계정 목록의 순서가 달라질 수 있습니다. 따라서 인덱스에 의존하지 않도록 하거나, 키스토어 파일을 복사하거나 제거하는 경우에는 스크립트의 계정 인덱스들을 확인하고 업데이트하세요.

### 자바스크립트 콘솔 <a id="javascript-console"></a>

콘솔을 사용하는 경우:

```javascript
> klay.accounts
["bfc22a57999459b0c2ce6337deb9287e7a970e02", "47bd2e9565cbe1789454718d6cf1778d7ea557aa"]
```

## 계정 잠금 해제 <a id="unlock-accounts"></a>

비상호적으로 계정을 사용하려면, 잠금을 해제해야 합니다.

### ken <a id="ken"></a>

명령 행에서 쉼표로 구분된 계정(16진수 또는 인덱스) 목록인 `--unlock "{address},{address}"` 옵션을 인수로 사용하여 프로그래밍 방식으로 한 세션에 대해 계정을 잠금 해제하고 EN을 시작할 수 있습니다. This is useful if you want to use your account from dApps via RPC. `--unlock`은 목록에서 첫 번째 계정을 잠금 해제합니다. 이는 프로그래밍 방식으로 계정을 생성할 때 유용합니다. 잠금을 해제하기 위해 실제 계정을 알 필요는 없습니다.

계정을 생성하고 잠금이 해제된 계정과 함께 노드를 시작하세요.

```bash
$ ken account new --password <(echo this is not secret) --datadir <DATADIR>
$ ken --password <(echo "this is not secret") --unlock primary --datadir <DATADIR> --rpccorsdomain localhost --verbosity 6 2>> log.log
```

특정 계정이 잠금 해제 된 상태에서 노드를 시작하려면, 계정 목록의 주소 위치를 나타내는 주소 또는 인덱스를 사용할 수 있습니다\(생성 순서에 해당\).

```bash
$ ken --unlock "0" --datadir <DATADIR>
$ ken --unlock "2" --datadir <DATADIR>
$ ken --unlock "bfc22a57999459b0c2ce6337deb9287e7a970e02" --datadir <DATADIR>
```

명령행을 사용하면 여러 계정을 잠금 해제 할 수 있습니다. 이 경우 잠금 해제할 인수는 쉼표로 구분된 계정 주소 또는 인덱스 목록입니다.

```bash
$ ken --unlock "0x407d73d8a49eeb85d32cf465507dd71d507100c1,0,5,e470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32" --datadir <DATADIR>
```

이 구성을 비상호적으로 사용하는 경우, 비밀번호 파일에는 해당 계정의 대응되는 비밀번호가 한 줄에 하나씩 포함되어야 합니다.

### 자바스크립트 콘솔 <a id="javascript-console"></a>

콘솔에서 \(초를 단위로\) 기간 동안 \(한 번에 하나씩\) 계정을 잠금 해제할 수도 있습니다.

```javascript
> personal.unlockAccount(address, "password", 300)
```

콘솔 히스토리가 기록되므로 암호 인자를 사용하지 않는 것이 좋습니다. 계정의 보안이 위협 받을 수 있습니다. 주의해주세요.

## 계정 잔액 확인 <a id="check-account-balance"></a>

### ken <a id="ken"></a>

n/a

### 자바스크립트 콘솔 <a id="javascript-console"></a>

계정 잔액을 확인하려면 다음 단계를 따르십시오:

```javascript
> klay.fromPeb(klay.getBalance("{account}"), "KLAY")
6.5
```

자바스크립트 함수로 모든 잔액을 출력하세요:

```javascript
function checkAllBalances() {
    var totalBal = 0;
    for (var acctNum in klay.accounts) {
        var acct = klay.accounts[acctNum];

        var acctBal = klay.fromPeb(klay.getBalance(acct), "KLAY");
        totalBal += parseFloat(acctBal);

        console.log("klay.accounts[" + acctNum + "]: \t" + acct + " \tbalance: " + acctBal + "KLAY");

    }

    console.log("Total balance: " + totalBal + " KLAY");
};
```

다음으로 실행할 수 있습니다:

```javascript
> checkAllBalances();
klay.accounts[0]: 0xd1ade25ccd3d550a7eb532ac759cac7be09c2719  balance: 63.11848 KLAY
klay.accounts[1]: 0xda65665fc30803cb1fb7e6d86691e20b1826dee0  balance: 0 KLAY
klay.accounts[2]: 0xe470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32  balance: 1 KLAY
klay.accounts[3]: 0xf4dd5c3794f1fd0cdc0327a83aa472609c806e99  balance: 6 KLAY
```

`ken`을 다시 시작하면 이 함수가 사라지기 때문에, 자주 사용할 함수를 저장해놓으면 도움이 됩니다.

우선, `checkAllBalances()` 함수를 파일로 저장하세요. 예를 들면 `/Users/username/klayload.js`입니다. 그런 다음 대화식 콘솔에서 파일을 로드(load)합니다:

```javascript
> loadScript("/Users/username/klayload.js")
true
```

이 파일은 명령을 수동으로 입력한 것처럼 자바스크립트 환경을 수정할 것입니다. 자유롭게 시도해 보세요!

