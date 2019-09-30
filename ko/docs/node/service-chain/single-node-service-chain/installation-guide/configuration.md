# 환경 설정

This page explains the configuration of a single Service Chain Node (SCN).

## Creation of SCSigner Keystore / Password Files

When you run a service chain node, you need a keystore file and the associated password file for the scsigner. You can generate the files like the following.

### Create Your Password File

First you can generate the password file simply like below. This password file will be used to generate a keystore file and run the service chain node.

```bash
$ echo passwordString >> passwd
```

### Create Your Keystore File

You can create the keystore file with your password file like below.

```bash
$ kscn account new --datadir "./" --password ./passwd
Address: {c04ae62e6a8e084e8f00030d637380792db3dc26}
```

_You should use the generated address for the scsigner in the genesis file._

Now, you can have the keystore file and password file like below.

```bash
$ tree
.
├── keystore
│   └── UTC--2019-03-28T06-10-39.102092000Z--c04ae62e6a8e084e8f00030d637380792db3dc26
└── passwd
```

After [Initialization of a Genesis Block](#initialization-of-a-genesis-block), you will copy these files to the data directory.

## Creation of a Genesis File

First, you should create new genesis file for your own service chain and initialize all service chain nodes with the same genesis file. The genesis file of the service chain is different with main chain. To create new genesis file, you should write the scsigner address of your service chain in `governingnode`, `extraData` and `alloc` field. The `unitPrice` is set to `0` in the example below, but you can change it to the value you want.

The `genesis.json` examples follow. You can find more details in [Genesis JSON](../../genesis.md).

* `geneis.json` example for a consensus node.
  * The consensus node's scsigner is `c04ae62e6a8e084e8f00030d637380792db3dc26`.

```javascript
{
     "config": {
         "chainId": 3000,
         "clique": {
             "period": 1,
             "epoch": 604800
         },
         "unitPrice": 0
     },
     "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000c04ae62e6a8e084e8f00030d637380792db3dc260000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
     "alloc": {
         "c04ae62e6a8e084e8f00030d637380792db3dc26": {
             "balance": "0x446c3b15f9926687d2c40534fdb564000000000000"
         }
     },
     "number": "0x0",
     "gasUsed": "0x0",
     "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

## SCN Data Directory Creation

Considering the fact that the size of Klaytn blockchain data is always increased, it is recommended to use a big enough storage. You may need to create the directory on your specific path.

```bash
$ mkdir -p ~/kscnd_home
```

### Initialization of a Genesis Block

Before starting an service chain node, it is necessary to initialize the genesis block of the service chain network using `kscn` and `genesis.json`.

```bash
$ kscn init --datadir ~/kscnd_home genesis.json
...
```

All required steps are done for launching an SCN.

### **Install SCSigner Key / Password Files**

To set scsigner for the service chain node, we need the right pair of scsigner keystore and password file. Copy the files like below. Keystore file needs a password file to unlock the account.

```bash
$ cp ./keystore/UTC--2019-...--ef28e51ef33fe0f487289c1c6e1ccdf5e571366b ~/kscnd_home/keystore
$ cp ./passwd ~/kscnd_home/
```



