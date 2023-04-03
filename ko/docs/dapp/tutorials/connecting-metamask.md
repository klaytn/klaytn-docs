# 메타마스크 연동하기

> **참고**: 메타마스크는 이더리움 지갑으로 사용되지만, 동일한 주소 구조를 지닌 Klaytn과도 호환 가능합니다. Klaytn은 브라우저 익스텐션 지갑 [Kaikas](../developer-tools/#kaikas)도 지원합니다. 따라서 Remix를 제외하면 MetaMask와 거의 동일한 기능을 제공합니다.

## 1단계: 메타마스크 설치하기 <a href="#install-metamask" id="install-metamask"></a>

* 이 예시에서는 Chrome 웹브라우저를 사용하겠습니다. ([**Chrome 설치하기**](https://www.google.com/intl/en\_us/chrome/))
*   Chrome 확장 프로그램 탭에서 [**MetaMask 확장 프로그램**](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)을 추가합니다.

    > **참고:** 다른 브라우저를 사용하는 경우 별도 설치가 필요할 수 있습니다.
* Chrome 검색 바 오른쪽 아이콘을 클릭하면 메타마스크를 실행시킬 수 있습니다.

## 2단계: 메타마스크 지갑 생성 <a href="#generate-a-metamask" id="generate-a-metamask"></a>

![Create a Wallet](../../bapp/tutorials/img/new-to-metamask.png)

* [지갑 생성] 버튼을 클릭합니다.
* 암호를 생성합니다.
*   12개의 단어로 구성된 시드 구문이 주어지면 이를 안전한 곳에 적습니다.

    > **참고:** 해당 구문을 알아야만 지갑 복구가 가능합니다. 타인에게 노출 시 계정의 자금을 모두 잃을 수 있습니다. 그렇기에 시드 구문은 수기로 적어두거나 외부 연결이 차단된 장치에 기록하기를 권장합니다.

![Seed phrase and Wallet](../../bapp/tutorials/img/metamask-secret-backup.png)

## 3단계: Klaytn Cypress 네트워크(메인넷)에 연결하기 <a href="#connect-to-klaytn-cypress-network-mainnet" id="connect-to-klaytn-cypress-network-mainnet"></a>

> 간단한 방법도 있습니다. [Klaytn Cypress 네트워크에 지갑을 연결하세요(Mainnet)](https://chainlist.org/chain/8217).

* 이더리움 메인넷 상태인 네트워크 탭을 클릭해 [Add network]를 선택합니다.
* 연결할 Klaytn 체인의 EN 정보를 입력합니다.
  * Cypress
    * 네트워크 이름: Klaytn Cypress
    * New RPC URL: (Default: [https://public-en-cypress.klaytn.net](https://public-en-cypress.klaytn.net))
    * 블록 탐색기 URL: [https://scope.klaytn.com/](https://scope.klaytn.com/)
    * 체인 ID: 8217
    * 화폐 심볼: KLAY
* [Save]를 클릭하면 Klaytn Cypress 네트워크가 추가됩니다.

![Network Setup and Custom RPC](../../bapp/tutorials/img/metamask-add-cypress-1.png) ![Network Setup and Custom RPC](../../bapp/tutorials/img/metamask-add-cypress-2.png)

## 4단계: KLAY 보내기 <a href="#send-klay" id="send-klay"></a>

**주의:** 다음 단계들은 KLAY를 필요로 합니다.

* 메인 페이지에서 [Send]를 누르고 수신자 주소 및 전송할 KLAY 수량을 입력합니다.

![Send KLAY 1](img/metamask-send-klay-1.png)

**NOTE:** KLAY를 보내기 위해서는 트랜잭션을 발생시켜야 하며, 이 과정에서 KLAY가 소진됩니다.

* Klaytn v1.9.0 이후로는 a [동적 가스비](https://medium.com/klaytn/dynamic-gas-fee-pricing-mechanism-1dac83d2689)가 기존의 고정 가격 정책을 대체합니다.
* 따라서 고정 가스비를 직접 설정할 필요가 없습니다.
* 전송할 수량과 수수료를 확인한 후 [Confirm] 버튼을 누르면 KLAY 전송이 완료되고 메인 화면으로 돌아갑니다.
* 메인 화면에서 [Activity] 버튼을 클릭하면, 방금 전송한 트랜잭션을 조회할 수 있습니다.

![Send KLAY 2](img/metamask-send-klay-2.png)

## Klaytn Baobab 네트워크(테스트넷)에 연결하기<a href="#connect-to-klaytn-baobab-network-testnet" id="connect-to-klaytn-baobab-network-testnet"></a>

### 송금에 필요한 KLAY 획득하기

> **참고:** 예제는 테스트넷(Baobab)의 Public EN으로 네트워크에 연결하였습니다. 테스트 시에는 Baobab을 사용하세요.

> Here's a simple way. [Klaytn Baobab 네트워크에 지갑을 연결하세요(Testnet)](https://chainlist.org/chain/1001).

* Baobab
  * 네트워크 이름: Klaytn Baobab
  * New RPC URL: [https://public-en-baobab.klaytn.net](https://public-en-baobab.klaytn.net)
  * 블록 탐색기 URL: [https://baobab.scope.klaytn.com/](https://baobab.scope.klaytn.com/)
  * 체인 ID: 1001
  * Currency Symbol: KLAY
* [Save]을 클릭하면 Klaytn Baobab 네트워크가 추가됩니다.

![Network Setup](img/connect-testnet-1.png)

* Klaytn Wallet의 연동 상태를 확인하기 위해서는 송금에 사용될 KLAY가 필요합니다.
* 우측 상단 아이콘 아래 탭에서 [Account details]를 클릭합니다.
* [Export Private Key]를 클릭하여 개인 키를 획득합니다.

![Export Private Key](img/connect-testnet-2.png)

* Baobab 테스트넷에서는 [**Klaytn Faucet**](https://baobab.wallet.klaytn.foundation/access?next=faucet)을 이용하여 테스트에 필요한 KLAY를 받을 수 있습니다.
* Klaytn Wallet에서 개인 키를 입력한 후 [Access] 버튼을 클릭해 로그인합니다. (개인 키 앞에 0x를 기입합니다.)
* [Run Faucet] 버튼을 클릭하세요. 150 테스트넷 KLAY가 전송되고 잔액이 업데이트됩니다. Faucet 기능은 계정당 1일 1회, 24시간마다 한 번씩 실행할 수 있습니다.

![Obtain KLAY from Faucet](img/connect-testnet-3.png)

* 메타마스크로 돌아와 보유 KLAY를 확인합니다.

![Check your balance](img/connect-testnet-4.png)
