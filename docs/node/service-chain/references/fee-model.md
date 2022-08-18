Given a bridge, consist of child and parent chains, a user on child chain can transfer his/her assets to parent chain thorugh bridge service.
The operators of parent chain pay the fee of handle value transfer transacion as well as the reuqested amount of tokens or KLAY.
As the service operator pay the operation cost of value transfer service, its service fee can be introduced to not have deficit.
There is no limit of fee setting and its decision is entirly up to the service operators.
ServiceChain provides an API(`subbridge.suggestLeastFee`) for a suggestion of its service fee.
The API returns a fee by consideration of current gas price and required number of gas to be injected for value transfer transaction.
Therefore, its return value is the suggestion of least fee to not have operation cost loss.

First of all, clone the example repository.
```bash
$ git clone https://github.com/klaytn/servicechain-value-transfer-examples
$ cd servicechain-value-transfer-examples
$ npm install
$ cd fee-model
```

Check out the current gas price of both chain. The `gasPrice` value may be different depends on your chain's governance setting.

[child]
> klay.gasPrice
> 25000000000

[parent]
> klay.gasPrice
> 123450000

Run `klay-deploy.js` to deploy bridge contracts on both chains.
> ------------------------- klay-deploy START -----------------------
> sender blaance: 5708990770823839524233131853.297607010911886487
> Child bridge's blaance: 10
> info.bridge: 0x447095424060994F1E91a8D0713b54BE9e12dAC1
> info.bridge: 0x65c6366fFCaC3c3912Bf6E43249337aCF7979281
> registering bridges to the child node
> subscribing bridges to the child node
> ------------------------- klay-deploy END -------------------------

Type `subbridge.suggestLeastFee` on your IPC. The API takes bridge address and a type of asset (`"KLAY"` | `"ERC20"` | `"ERC721"`)

> subbridge.suggestLeastFee("0x447095424060994F1E91a8D0713b54BE9e12dAC1", "KLAY")
{
  SumOfCost: 5730238310350000,
  SumOfGasUsed: 911029,
  handleKLAYTransfer: {
    gasPrice: 123450000,
    requiredGas: 274344,
    totalCost(requiredGas * gasPrice): 33867766800000
  },
  handleRefund: {
    gasPrice: 25000000000,
    requiredGas: 27693,
    totalCost(requiredGas * gasPrice): 692325000000000
  },
  removeRefundLedger: {
    gasPrice: 25000000000,
    requiredGas: 198133,
    totalCost(requiredGas * gasPrice): 4953325000000000
  },
  requestRefund: {
    gasPrice: 123450000,
    requiredGas: 174427,
    totalCost(requiredGas * gasPrice): 21533013150000
  },
  updateHandleStatus: {
    gasPrice: 123450000,
    requiredGas: 236432,
    totalCost(requiredGas * gasPrice): 29187530400000
  }
}

> subbridge.suggestLeastFee("0x65c6366fFCaC3c3912Bf6E43249337aCF7979281", "KLAY")
{
  SumOfCost: 17157953219700000,
  SumOfGasUsed: 911029,
  handleKLAYTransfer: {
    gasPrice: 25000000000,
    requiredGas: 274344,
    totalCost(requiredGas * gasPrice): 6858600000000000
  },
  handleRefund: {
    gasPrice: 123450000,
    requiredGas: 27693,
    totalCost(requiredGas * gasPrice): 3418700850000
  },
  removeRefundLedger: {
    gasPrice: 123450000,
    requiredGas: 198133,
    totalCost(requiredGas * gasPrice): 24459518850000
  },
  requestRefund: {
    gasPrice: 25000000000,
    requiredGas: 174427,
    totalCost(requiredGas * gasPrice): 4360675000000000
  },
  updateHandleStatus: {
    gasPrice: 25000000000,
    requiredGas: 236432,
    totalCost(requiredGas * gasPrice): 5910800000000000
  }
}

The `SumOfCost` is a total estimated cost in Peb unit. Each property names represent contract calls to be transacted by operators for value transfer service.

There is no limitation of fee setting. You can set your desired amount of fee or the suggested fee by API..
Let's set the transfer fee with 1 KLAY for both bridge contracts.
[child]
> subbridge.setKLAYFee("0x447095424060994F1E91a8D0713b54BE9e12dAC1", Number(web3.toPeb(1, "KLAY")))
"0x8708854fe69c09c41beb287f78f260ce7b8592d137c814c16bc624f0fe6feb84"
[parent]
> subbridge.setKLAYFee("0x65c6366fFCaC3c3912Bf6E43249337aCF7979281", Number(web3.toPeb(1, "KLAY")))
"0x3b065e7daf60e6adb2cdb68e3dca35d9b7e8f924845542b5fb46d93a8e04c215"

The returned strings are transaction hash of the contract call.
Now, the remaining one we should is to put a fee receiver's address through:
[child]
> subbridge.setFeeReceiver("0x447095424060994F1E91a8D0713b54BE9e12dAC1", "0x8888888888888888888888888888888888888888")
"0x59156e8500bcb344132b04884eb23ed6746e4e7fdb40c540c57213b7e0353c62"
[parent]
> subbridge.setFeeReceiver("0x65c6366fFCaC3c3912Bf6E43249337aCF7979281", "0x9999999999999999999999999999999999999999")
"0x43da2ee679edcd11ea1856c3fbc32282692c73754423e781f039eaeebcec0ae0"

The example below sends KLAY from parent to child chain.
❯ node klay-transfer
------------------------- klay-transfer START -------------------------
[before] receiver's balance 0
[before] sender's balance 99999999999999999999999999998877.89517602230564425
fee: 1 KLAY
want to send: 3 KLAY
minimum klay: 4 KLAY
Send 1 KLAY from parent chain to child chain
[after] fee receiver's balance 1
[after] receiver's balance 3
[after] sender's balance 99999999999999999999999999998873.89515849981264425
------------------------- klay-transfer END -------------------------
