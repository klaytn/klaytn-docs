Given a bridge, consist of child and parent chains, a user on child chain can transfer his/her assets to parent chain thorugh bridge service.
The operators of parent chain pay the fee of handle value transfer transacion as well as the reuqested amount of tokens or KLAY.
As the service operator pay the operation cost of value transfer service, its service fee may be introduced to not have deficit.
There is no limit of fee setting and its decision is entirly up to the service operators.
ServiceChain provides an API(`subbridge.suggestLeastFee`) for a suggestion of its service fee.
The API returns a fee by consideration of current gas price and required number of gas to be injected for value transfer transaction.
Therefore, its return value is the suggestion of least fee to not have deficit.

First of all, clone the example repository
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
> ------------------------- klay-deploy START -------------------------
> sender blaance: 5708990770823839524233142806.585073695530986494
> Child bridge's blaance: 10
> info.bridge: 0x13E25Eda46876F12Cb6b64557D7B0C461c08F72C
> info.bridge: 0x27Ce2b75d42834Bc4AE795035954C8687A334C12
> registering bridges to the child node
> subscribing bridges to the child node
> set fee of KLAY value transfer fee to child bridge
> ------------------------- klay-deploy END -------------------------

Type `subbridge.suggestLeastFee` on your IPC. The API takes bridge address and a type of asset (`"KLAY"` | `"ERC20"` | `"ERC721"`)
> subbridge.suggestLeastFee("0x13E25Eda46876F12Cb6b64557D7B0C461c08F72C", "KLAY")
{
  SumOfCost: 4984284619100000,
  SumOfGasUsed: 472295,
  handleKLAYTransfer: {
    gasPrice: 123450000,
    requiredGas: 274278,
    totalCost(requiredGas * gasPrice): 33859619100000
  },
  removeRefundLedger: {
    gasPrice: 25000000000,
    requiredGas: 198017,
    totalCost(requiredGas * gasPrice): 4950425000000000
  }
}


> subbridge.suggestLeastFee("0x27Ce2b75d42834Bc4AE795035954C8687A334C12", "KLAY")
{
  SumOfCost: 6881395198650000,
  SumOfGasUsed: 472295,
  handleKLAYTransfer: {
    gasPrice: 25000000000,
    requiredGas: 274278,
    totalCost(requiredGas * gasPrice): 6856950000000000
  },
  removeRefundLedger: {
    gasPrice: 123450000,
    requiredGas: 198017,
    totalCost(requiredGas * gasPrice): 24445198650000
  }
}

Let's set the transfer fee for both bridge contracts.
[child]
> subbridge.setKLAYFee("0x13E25Eda46876F12Cb6b64557D7B0C461c08F72C", 4984284619100000)
"0xee9d79d084f015b3f6cadac4e842efb8fd6a160a885259b4b3d1b1e6a64800cb"
[parent]
> subbridge.setKLAYFee("0x27Ce2b75d42834Bc4AE795035954C8687A334C12", 6881395198650000)
"0x13cc26527eac35ad5764dea4f0e8cb21aafc60a302f09ba7aee86e08f1c0d179"

Now, the remaining one we should is to put a fee receiver's address through:
[child]
> subbridge.setFeeReceiver("0x13E25Eda46876F12Cb6b64557D7B0C461c08F72C", "0x1111111111111111111111111111111111111111")
"0xbdb37eafd688e62af5879357ab6e654872343d1abb579955c8a781844ad9bf8c"
[parent]
> subbridge.setFeeReceiver("0x27Ce2b75d42834Bc4AE795035954C8687A334C12", "0x2222222222222222222222222222222222222222")
"0xd4f6e4c7c74a814f11802b20560e0c666aa52ed64cef5c020af5aa56c04d6d57"

The example below sends KLAY from child to parent chain.
❯ node klay-transfer
------------------------- klay-transfer START -------------------------
[before] receiver's balance 0
[before] sender's balance 5708990770823839524233142796.411171795530986494
fee: 0.0049842846191 KLAY
want to send: 3 KLAY
minimum klay: 3.0049842846191 KLAY
Send 1 KLAY from child chain to parent chain
[after] receiver's balance 0
[after] sender's balance 5708990770823839524233142796.396840626292786494
------------------------- klay-transfer END -------------------------

Let's see the balance of the child chain's receiver.
> klay.getBalance("0x1111111111111111111111111111111111111111")
4984284619100000

You can see the balance of the parent chain's receiver if you run the value transfer from parent to child direction. We leave it as practice.
> klay.getBalance("0x2222222222222222222222222222222222222222")
6881395198650000
