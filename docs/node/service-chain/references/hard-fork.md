Klaytn has introduced several [hard forks](../../../klaytn-history/README.md) to provide new features.
In accordance with the Klaytn hard forks, new versions of ServiceChain binaries are also released to support the hard forks. However you need to activate the hard fork in order to use their new features in the ServiceChain.

**NOTE** Upgrading ServiceChain binaries may be irreversible and backward-incompatible, meaning you cannot downgrade to an older version.

# Bringing Klaytn Hard Fork to ServiceChain <a id="bringing-klaytn-hard-fork-to-servicechain"></a>

To apply the hard fork to the ServiceChain, you need to:
1. Pick an appropriate block number for the hard fork
2. Upgrade the ServiceChain binary to a version that supports the hard fork
3. Activate the hard fork in the ServiceChain

## 1. Pick an appropriate block number for the hard fork <a id="1-pick-an-appropriate-block-number-for-the-hard-fork"></a>

In the Javascript console of the ServiceChain, you can check the current block number as shown below.
```bash
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> klay.blockNumber
1234
```
Now, you have to decide an appropriate block number to activate the hard fork. Make sure to have enough number of blocks (which is produced every second) between the current block and the block of hard fork.

## 2. Upgrade the ServiceChain binary <a id="2-upgrade-the-servicechain-binary"></a>

You can get the latest version of Klaytn binaries in one of the below links:
- [Klaytn Docs](../../download/README.md)
- [Klaytn Github Repository](https://github.com/klaytn/klaytn/releases)

To upgrade the ServiceChain binary, stop the ServiceChain node and replace the binary.
For example, you can use below commands to stop an SCN node and replace the binary to a newer one.

```bash
$ kscnd stop
Shutting down kscnd: OK
$ cp /path/to/new/kscn /path/to/original/kscn
```

**NOTE** After you have replaced all ServiceChain nodes' binaries, keep the ServiceChain nodes down (or stopped). You will restart them after you have activated the hard fork.

## 3. Activate Hard Fork <a id="3-activate-hard-fork"></a>

If you have upgraded the ServiceChain binaries with a version that supports desired hard fork, you can activate the hard fork in the ServiceChain by re-initializing the chain config with updated genesis.

### Update genesis and re-initialize chain config for all ServiceChain nodes <a id="update-genesis-and-re-initialize-chain-config-for-all-servicechain-nodes"></a>

First, specify the hard fork number in the `config` field of `genesis.json`.
For example, if you are trying to activate the Magma hard fork in your ServiceChan, you should specify the `magmaCompatibleBlock` in `config` field of the genesis, like below.

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    ...
    "magmaCompatibleBlock": 1500,
    ...
  },
  ...
}
```

To enable a hard fork in the chain config, the previous hard fork should be enabled.
That is, to enable Magma hard fork, the EthTxType hard fork should be already enabled.
If there are missing hard forks in the chain config, you have to add them too.

For example, if you want to activate Magma hard fork and if your `genesis.json` does not have `ethTxTypeCompatibleBlock` in its `config` field like below:

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    "londonCompatibleBlock": 0,
    "istanbul": {
      "epoch": 3600,
      "policy":0,
      "sub":21
    },
    ...
  }
}
```

You have to add `ethTxTypeCompatibleBlock` too, when you add `magmaCompatibleBlock` in the `config` field, like below.

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    "londonCompatibleBlock": 0,
    "ethTxTypeCompatibleBlock": 1500,
    "magmaCompatibleBlock": 1500,
    "istanbul": {
      "epoch": 3600,
      "policy":0,
      "sub":21
    },
    ...
  }
}
```

You can find the history of Klaytn hard forks in the [Klaytn Docs](../../../klaytn-history/README.md).

If you have updated your `genesis.json` with desired hard forks, re-initialize the chain config and apply your change.

```bash
$ kscn --datadir /path/to/data/directory init /path/to/genesis.json
```

**NOTE** It is normal that the following error log is printed when you re-initialize chain config.

```text
ERROR[08/02,09:12:39 Z] [48] The same or more recent governance index exist. Skip writing governance index  newIdx=0 govIdxes=[0]
```

### Confirm the updated chain config <a id="confirm-the-updated-chain-config"></a>

Now, restart the ServiceChain node.
For example, you can restart a SCN node with the following command.

```bash
$ kscnd start
```

Then, in the Javascript console of SCN, you can check the updated chain config.

```bash
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> governance.chainConfig.magmaCompatibleBlock
1500
```

# Some Hard Fork specifics <a id="some-hard-fork-specifics"></a>

This section describes some details for a specific hard fork.

## Magma <a id="magma"></a>

The Magma hard fork introduces the KIP-71, dynamic gas fee. It includes the upper and lower bound of the gas price.

By default, the upper bound is set to `750000000000` and the lower bound is set to `25000000000`. You can change those bounds in the Javascript console of SCN nodes using the [governance APIs](../../../dapp/json-rpc/api-references/governance.md).
Obviously, lower bound cannot exceed the upper bound.

To set the gas price to a static value, you have to set the upper and lower bound of the gas price to the same value. For example, you can set gas price to `0`, using `governance.vote` API in the Javascript console of the SCN nodes.

```bash
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> governance.vote("kip71.lowerboundbasefee", 0)
"Your vote is prepared. It will be put into the block header or applied when your node generates a block as a proposer. Note that your vote may be duplicate."
> governance.vote("kip71.upperboundbasefee", 0)
"Your vote is prepared. It will be put into the block header or applied when your node generates a block as a proposer. Note that your vote may be duplicate."
```

If the votes for updating the upper and lower bound of the gas price were successful, those changes will take effect after 2 istanbul epochs (An epoch has the value in block numbers).

For example, if the epoch is 3600, and the votes for updating the upper and lower bounds of gas price has been placed in the block #4000, those changes will take effect starting from the block #10800.
In detail, the votes will be finalized when their first epoch was encounted in the block #7200, and the changes are applied when their second epoch was encountered in the block #10800.

To check the epoch, you can use the `governanace.itemsAt` API, like below.

```javascript
> governance.itemsAt(klay.blockNumber)
{
  governance.governancemode: "none",
  governance.governingnode: "0x05ad406f31e22b74f18c9ed65ed1ccd349bbbee0",
  governance.unitprice: 0,
  istanbul.committeesize: 21,
  istanbul.epoch: 3600,
  istanbul.policy: 0,
  kip71.basefeedenominator: 20,
  kip71.gastarget: 30000000,
  kip71.lowerboundbasefee: 25000000000,
  kip71.maxblockgasusedforbasefee: 60000000,
  kip71.upperboundbasefee: 750000000000,
  reward.deferredtxfee: false,
  reward.minimumstake: "2000000",
  reward.mintingamount: "9600000000000000000",
  reward.proposerupdateinterval: 3600,
  reward.useginicoeff: false
}
```

You can see that the `istanbul.epoch` has a value of 3600 blocks, which would normally take an hour to pass.

You can change the epoch too, using the `governance.vote` API.

```javascript
> governance.vote("istanbul.epoch", 60)
"Your vote is prepared. It will be put into the block header or applied when your node generates a block as a proposer. Note that your vote may be duplicate."
```
