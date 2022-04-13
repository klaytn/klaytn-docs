# 계정에 토큰 채우기<a id="top-up-your-account"></a>

## 콘솔에 연결하기 <a id="attaching-to-the-console"></a>

Klaytn 엔드포인트 노드는 자바스크립트 콘솔과 함께 제공됩니다. 콘솔 명령행에서 EN을 향한 Klaytn API 호출 중 일부를 시작할 수 있습니다. 자바스크립트 콘솔에 연결하려면 다음 명령을 실행하세요.

```bash
$ ken attach ~/kend_home/klay.ipc
Welcome to the Klaytn JavaScript console

!instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kend_home
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

 >
```

**참고**: 모든 블록을 다운로드 할 때까지 기다려야 합니다. 콘솔에 `klay.blockNumber`를 입력하고 [여기](https://baobab.scope.klaytn.com/)의 현재 블록 번호와 일치하는지 확인하세요.

**참고**: `klay` 또는 `personal`을 입력해 사용 가능한 함수 목록을 가져옵니다.

## 새로운 Klaytn 계정 생성 <a id="creating-a-new-klaytn-account"></a>

자바스크립트 콘솔에서 새 Klaytn 계정을 생성하려면 다음 명령을 실행하세요. 개인키는 입력한 패스프레이즈로 암호화됩니다.

```javascript
> personal.newAccount()
Passphrase:  # 암호를 입력하세요
Repeat passphrase:
"0x75a59b94889a05c03c66c3c84e9d2f8308ca4abd" # 생성된 계정 주소
```

키스토어 파일은 `kend.conf`에서 설정한 `DATA_DIR`인 EN 데이터 디렉토리의 `keystore` 폴더 아래에 생성될 것입니다. 만일 빠른 시작 기본 가이드라인을 따를 경우, 이는`~/kend_home/keystore/`이어야 합니다.

```javascript
$ ls ~/kend_home/keystore/
UTC--2019-06-24T11-20-15.590879000Z--75a59b94889a05c03c66c3c84e9d2f8308ca4abd
```

## Klaytn 계정 잠금 해제 <a id="unlocking-the-klaytn-account"></a>

생성된 계정을 잠금 해제하려면, 다음 명령을 실행합니다. 이는 300초 동안 계정을 잠금 해제합니다. **참고**: 잠금 해제 기간을 수동으로 설정하려면, 다음 [링크](../../dapp/json-rpc/api-references/personal.md#personal_unlockaccount)를 참조하세요. **`경고`**: 계정 잠금 해제는 조심해서 하지 않으면 매우 위험할 수 있습니다. EN이 해커에 의해 해킹되면, 해커가 토큰을 빼앗을 가능성이 있습니다. 보다 안전한 방법을 사용하려면, 다음의 [개인키를 사용하는 배포 가이드](../../dapp/tutorials/count-bapp/6.-deploy-contract.md#deploy-method-1-by-private-key)를 참조하세요.

```javascript
> personal.unlockAccount('75a59b94889a05c03c66c3c84e9d2f8308ca4abd') # 잠금을 해제할 계정 주소
Unlock account 75a59b94889a05c03c66c3c84e9d2f8308ca4abd
Passphrase: # 암호를 입력하세요
true
```

## Baobab Faucet에서 테스트넷 KLAY 받기 <a id="getting-testnet-klay-from-the-baobab-faucet"></a>

* KlaytnWallet의 Baobab Faucet 사용하기
* [https://baobab.wallet.klaytn.com](https://baobab.wallet.klaytn.com/) 접근하기
* 지갑에 로그인하기 위하여 지갑에서 새 계정을 만들거나 위의 EN 자바스크립트 콘솔에서 생성한 키스토어 파일을 사용할 수 있습니다.
* 왼쪽 창 메뉴에서 "KLAY Faucet"으로 이동하고, "Run Faucet" 버튼을 클릭해 150 KLAY를 얻습니다.

  KLAY Faucet를 24시간마다 한 번씩 실행할 수 있습니다.

* KLAY를 얻기 위해 새 계정을 만들었다면 EN의 생성된 계정으로 KLAY 보냅니다.

## 계정 잔액 확인 <a id="checking-the-balance-in-your-account"></a>

계정의 잔액을 확인하려면, 다음 명령을 실행합니다.

기본 단위는 peb \(1 KLAY = 10 ^ 18 peb\)입니다. KLAY 단위에 대한 자세한 내용은 [KLAY의 단위](../../klaytn/design/klaytn-native-coin-klay.md#units-of-klay)에서 확인할 수 있습니다.

```javascript
> klay.getBalance('75a59b94889a05c03c66c3c84e9d2f8308ca4abd') # 계정 주소를 입력하세요
1e+21  # 1000 KLAY
```

## 콘솔 종료 <a id="exiting-the-console"></a>

자바스크립트 콘솔을 떠나려면, 다음 명령을 실행하세요.

```javascript
> exit
$
```


