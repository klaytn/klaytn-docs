# 리믹스(Remix) 연동 <a id="connecting-remix"></a>


## 리믹스(Remix)란? <a id="what-is-remix"></a>

Solidity Contract 개발을 위한 브라우저 기반의 IDE 입니다. Klaytn은 Solidity Contract를 지원하고 있으며, EVM 버전을 Constantinople로 설정 시 호환 가능합니다. 이 문서는 Remix와 Klaytn의 연동에 대해서만 다루고 있습니다. 자세한 사용법은 [ **Remix docs**](https://remix-ide.readthedocs.io/en/latest/) 혹은 Remix에서 파생된 [**Klaytn IDE**](../../smart-contract/ide-and-tools/README.md#klaytn-ide) 사용법을 참고하시기 바랍니다.

## Remix Solidity Compiler 설정 <a id="setting-remix-solidity-compiler"></a>

* Solidity Compiler 탭을 클릭합니다. ![img](./img/remix-solidity-compiler.png)
* EVM Version을 Constantinople로 설정합니다. **참고:** [Porting Ethereum Contract](https://docs.klaytn.com/smart-contract/porting-ethereum-contract#solidity-support) ![img](./img/remix-evm-version.png)

## Remix Deploy 환경 설정 <a id="setting-up-the-remix-deploy-environment"></a>

* Deploy & Run Transactions 탭을 클릭합니다.
* [Environment]를 알맞게 선택합니다. ![img](./img/remix-environment.png)
  * **[JavaScript VM]**: Remix 메모리 상의 가상 네트워크에 연결합니다.
  * **[Injected Web3]**: Mist 브라우저나 MetaMask를 통해 네트워크에 연결합니다.
  * **[Web3 Provider]**: RPC를 지원하는 Klaytn 노드에 직접 연결합니다.

## Case 1. EN(Endpoint Node)을 이용한 Klaytn - Remix 연동 <a id="connecting-klaytn-remix-using-en"></a>

* [**EN 문서**](https://docs.klaytn.com/getting-started/quick-start/launch-an-en)를 참고하여 개인 환경에 EN을 띄웁니다.

* [**계정 관리 문서**](https://docs.klaytn.com/getting-started/account)를 참고하여 Account를 생성합니다.

  > **Note:** 개인 환경의 EN이 아닌 Baobab Public EN으로 연결 시 personal API가 닫혀있기 때문에 Account에 연결되지 않습니다.

* Remix Environment 설정에서 [Web3 Provider]를 선택합니다. ![img](./img/remix-environment-web3provider.png)

* Web3 Provider Endpoint에 위에서 띄운 EN의 RPC 주소를 입력합니다. Local EN(default): [http://localhost:8551](http://localhost:8551/)

* Network에 연결되면 Chain ID가 아래와 같이 표시됩니다. 앞에서 생성한 Account 목록을 Account 항목에서 확인할 수 있습니다. ![img](./img/remix-network-connected.png)

## Case 2. 메타마스크(MetaMask)를 이용한 Klaytn - Remix 연동 <a id="connecting-klaytn-remix-using-metamask"></a>

* [**MetaMask 연동 문서**](https://groundx.atlassian.net/wiki/spaces/~59728130/pages/1880752196/Klaytn+Docs+-+Metamast+Remix)를 참고하여 Klaytn을 연동합니다.
* Remix Environment 설정에서 [Injected Web3]를 선택합니다. ![img](./img/remix-environment-injectedWeb3.png)

* 메타마스크에 연결이 뜨면 연동된 Account를 선택 후 [다음]을 클릭합니다.
* Network(예제에서는 Baobab 테스트넷)에 연결되면 Chain ID가 아래와 같이 표시됩니다. MetaMask 지갑과의 연결 상태를 [Account] 항목에서 확인할 수 있습니다. ![img](./img/remix-connect-with-metamask.png)

## Remix 연동 사용 예제 <a id="tutorial-connecting-remix"></a>

[**KlaytnGreeter**](https://docs.klaytn.com/smart-contract/sample-contracts/klaytngreeter) 샘플 컨트랙트를 이용하여 진행합니다.

* KlaytnGreeter.sol 파일을 추가하고, 테스트할 코드를 작성합니다. ![img](./img/remix-add-klaytngreeter.png)
* Solidity Compile 탭에서 [Compile KlaytnGreeter.sol]을 클릭해 작성한 컨트랙트 코드를 컴파일합니다.
* Deploy & Run Transactions 탭에서 [Deploy]를 클릭해 컴파일된 컨트랙트를 배포합니다. ![img](./img/remix-deploy-run-tx.png)
* 배포된 컨트랙트를 확인합니다. 테스트하거나 디버깅할 수 있습니다. ![img](./img/remix-test-or-debug.png)
