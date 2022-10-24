# 리믹스(Remix) 연동 <a id="connecting-remix"></a>


## 리믹스(Remix)란? <a id="what-is-remix"></a>

Solidity Contract 개발을 위한 브라우저 기반의 IDE 입니다. 이 문서는 리믹스와 클레이튼의 연동에 대해서만 다루고 있습니다. 리믹스에 대한 자세한 사용법은 [ **Remix docs**](https://remix-ide.readthedocs.io/en/latest/) 혹은 리믹스에서 파생된 [**Klaytn IDE**](../../smart-contract/ide-and-tools/README.md#klaytn-ide) 사용법을 참고하시기 바랍니다.

> Remix IDE : [https://remix.ethereum.org/](https://remix.ethereum.org/)

## EVM 버전 설정하기 <a id="setup-EVM-version"></a>
클레이튼은 솔리디티로 작성된 컨트랙트를 지원하며, EVM의 **London** 버전과 호환됩니다. 클레이튼은 솔리디티 버전 0.8.x 이하를 지원합니다. 클레이튼에 컨트랙트를 배포하기 위해서는 컨트랙트가  **London** EVM 버전으로 컴파일되어야 합니다.

* Click **solidity compiler**, and then choose **London** EVM version in 'Advanced Configurations'.

![Solidity Complier](./img/remix-solidity-compiler.png)

## 로컬 플러그인 연동하기 <a id="connect-to-a-local-plugin"></a>

리믹스를 사용해 클레이튼 네트워크에 연결하기 위해서는 로컬 플러그인이 필요합니다. 그 프로세스는 아래와 같이 설명됩니다.

* **plugin manager**를 클릭한 뒤 **Connect to a Local Plugin**를 클릭하세요.

![Plugin](./img/remix-environment-plugin.png)

* **URL**에 https://klaytn-remix-plugin.ozys.net를 입력하세요. **Plugin Name**과 **Display Name**에 원하는 아무 이름이나 사용할 수 있습니다.

![Local Plugin](./img/remix-local-plugin.png)

* [Klaytn] 탭이 보이면 이제 클레이튼과 연결할 준비가 완료된 것입니다.

## 배포 환경 설정하기<a id="setting-up-the-deployment-environment"></a>

* [Klaytn] 탭을 클릭하세요.
* Select the appropriate [Environment].
* You can select **Baobab**, **Cypress**, **Injected Caver**, **Caver Provider** or **Injected Web3**.
  * **[Baobab]**: Connects to the Baobab network
  * **[Cypress]**: Connects to the Cypress network
  * **[Injected Caver]**: Connects to injected caver(e.g., Kaikas)
  * **[Caver Provider]**: Connects directly to Klaytn node, which supports RPC
  * **[Injected Web3]**: Connects to injected web3(e.g., Metamask)

![Klaytn Tab](./img/remix-klaytn-tab.png)

## 계정 가져오기<a id="import-account"></a>

* **private key** 나 **Keystore**에서 키를 가져올 수 있습니다.
* **ACCOUNT** 옆 **plus** 버튼을 클릭합니다.

![Import Keys](./img/remix-klaytn-import-account.png)

* private key나 keystore를 입력하세요.
* **feePayer**를 위해 키를 가져올 수도 있습니다. **private key**만 지원합니다.

## EN(Endpoint Node)을 이용한 클레이튼 - 리믹스 연동<a id="connecting-klaytn-remix-using-en"></a>

* Set up an Endpoint Node in the local environment by following the instructions in [**the EN documents**](https://docs.klaytn.foundation/getting-started/quick-start/launch-an-en).

* Create an account by following the instructions in [**Account Management**](https://docs.klaytn.foundation/getting-started/account).

  > **Note:** 개인 환경의 EN이 아닌 Baobab Public EN으로 연결 시 personal API가 닫혀있기 때문에 Account에 연결되지 않습니다.

* 환경 설정에서 [Caver Provider]를 선택합니다.

![Caver Provider](./img/env-caver-provider.png)

* Caver Provider Endpoint에 위에서 띄운 EN의 RPC 주소를 입력합니다. Local EN(default): [http://localhost:8551](http://localhost:8551/)

* Once you are successfully connected to the Network, you will see the Chain ID and Account of the connected network.

## 메타마스크를 사용하여 클레이튼 - 리믹스 연동하기<a id="connecting-klaytn-remix-using-metamask"></a>

* Connect Klaytn with MetaMask by referring to the [**Connecting to MetaMask**](https://docs.klaytn.foundation/dapp/tutorials/connecting-metamask).
* Remix 환경 설정에서 [Injected Web3]를 선택합니다.

![Injected Web3](./img/env-injected-web3.png)

* When you see the MetaMask pop-up, select the account by clicking it.
* Once you are successfully connected to the Network, you will see the Chain ID and Account of the connected network.

## Connecting Klaytn - Remix using Kaikas <a id="connecting-klaytn-remix-using-kaikas"></a>

* Select [Injected Caver] on the Remix Environment menu.

![Injected Caver](./img/env-injected-caver.png)

* When you see the Kaikas pop-up, click [Connect].
* Once you are successfully connected to the Network, you will see the Chain ID and Account of the connected network.

## Tutorial: KlaytnGreeter Contract <a id="tutorial-KlaytnGreeter-contract"></a>

We will be using the [**KlaytnGreeter**](https://docs.klaytn.foundation/smart-contract/sample-contracts/klaytngreeter) sample contract.

* Add KlaytnGreeter.sol and write the testing code.

![Add KlaytnGreeter](./img/remix-add-klaytngreeter.png)

* On the Solidity Compile tab, select [Compile KlaytnGreeter.sol] to compile the contract code.
> It is better to turn on the 'Auto compile' option.
* In the Deploy & Run Transactions tab, click [Deploy] to deploy the compiled contract.

![Deploy the Contract](./img/remix-deploy-run-tx.png)

* You can view the deployed contract. You can test or debug it.

![Check the Contract](./img/remix-test-or-debug.png)
