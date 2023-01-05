## 컨트랙트 상호작용<a id="Contract Interaction"></a>

이 섹션에서는 멀티시그 월렛을 사용하여 Baobab에 배포된 단순한 컨트랙트의 트랜잭션을 전송하고 상호작용해볼 것입니다.

**요구 사항**
* [Metamask](https://metamask.io/download/) & [Klaytn Metamask Config](https://docs.klaytn.foundation/dapp/tutorials/connecting-metamask#send-klay)
* [Remix](https://remix.ethereum.org/) & [Klaytn Remix Plugin](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
* [Faucet](https://baobab.wallet.klaytn.foundation/faucet)에서 테스트 KLAY를 받으세요.

**Step 1:** [Remix](https://remix.ethereum.org/)로 이동합니다.

**Step 2:** 예시 **storage contract**를 컴파일하고 배포합니다.

멀티시그 월렛과 상호작용하기 전에 컨트랙트가 이미 배포되어 있어야 합니다. 해당 샘플 컨트랙트는 단순한 uint "number" 변수를 포함하고 있으며, **store** 메서드를 통해 업데이트될 수 있으며, **retrieve** 메서드를 통해 반환될 수 있습니다.

![](../img/klaytn-safe/12_remixDep.gif)

**Step 3:** Initiate a new transaction.

To interact with a smart contract in your safe wallet, click **"New Transaction"** To complete this step, you will need your already deployed contract address and ABI, as illustrated in the previous step.

![](../img/klaytn-safe/13_contractInit.gif)

**Step 4:** Review and submit the transaction. You will need to sign the transaction with your signer wallet, and it will be executed once the confirmation threshold is reached.

![](../img/klaytn-safe/14_contractExec.gif)