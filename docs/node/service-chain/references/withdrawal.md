# Bridge Withdrawal

With the [value trasnfer service fee](./fee-model.md), the bridge provider can assign the fee receiver and the service fee is immediately transferred to the receiver.
While the number of assets to be transferred to the bridge contract is held by the bridge contract.
The stacked assets can be debitable by bridge operators to make a further counterpart chain's assets.
The example below demonstrates how operators can make a withdrawal transaction.
Currently, the withdrawal amount is equally distributed to the N of operators. Also, the total amount of debitable is the difference between the total assets of bridge contract holds and the number of locked assets.
The locked assets are the assets that are currently being transferred (i.e., not confirmed for now).
For example, assume that the total assets the contract holds are 10 KLAY and 3 KLAY are being locked. Then, the total debitable amount is 7 KLAY. And if the number of operators is two, each operator gets 3.5 KLAY.

Clone the example repository.
```bash
$ git clone https://github.com/klaytn/servicechain-value-transfer-examples
$ cd servicechain-value-transfer-examples
$ npm install
$ cd withdrawal
```

Run `klay-deploy.js` to deploy bridge contracts on both chains.
> node klay-deploy.js
> ------------------------- klay-deploy START -----------------------
> sender blaance: 5708990770823839524233129939.626387810911886487
> Child bridge's blaance: 100
> info.bridge: 0x24e9Debe83b950a451dF68Bd513ed6CC1b569C4E
> info.bridge: 0xB7C10794852581AdA928E006e8e06Ea3B400Fa4C
> registering bridges to the child node
> subscribing bridges to the child node
> ------------------------- klay-deploy END -------------------------


The script `klay-transfer.js` sends 15 KLAY from parent to child chain and calls withdrawal transaction.
> node klay-transfer.js
> ------------------------- klay-transfer START -------------------------
> Send 3 KLAY from parent chain to child chain
> Send 3 KLAY from parent chain to child chain
> Send 3 KLAY from parent chain to child chain
> Send 3 KLAY from parent chain to child chain
> Send 3 KLAY from parent chain to child chain
> Alice's            balance in the parent chain : 0
>   Bob's            balance in the child chain  : 15
> Parent bridge's    balance in the paretnchain  : 15
> Child bridge's     balance in the childchain   : 85
> Parent operator1's balance in the parent chain : 1169.975472561182100048
> Parent operator2's balance in the parent chain : 99999999999999999999999999998508.876050153051744298
> Unlock the parent bridge operator's account
> Try withdraw KLAY which parent bridge contract holds
> Alice's            balance in the parent chain : 0
>   Bob's            balance in the child chain  : 15
> Parent bridge's    balance in the paretnchain  : 0
> Child bridge's     balance in the childchain   : 85
> Parent operator1's balance in the parent chain : 1177.475457268196100048
> Parent operator2's balance in the parent chain : 99999999999999999999999999998516.376050153051744298
> operator1 received 7.5
> operator2 received 7.5
> total withdraw: 15
> ------------------------- klay-transfer END -------------------------
