# Deploy a Smart Contract

Now we are ready to develop and deploy Klaytn smart contracts!

## Creating a Project Directory <a id="creating-a-project-directory"></a>

First of all, create a directory where the source code locates.

```bash
$ mkdir klaytn-testboard
$ cd klaytn-testboard
```

## Initializing Truffle <a id="initializing-truffle"></a>

Initialize Truffle for contract deployment.

```bash
$ truffle init
```

## Writing a Simple Smart Contract in Solidity <a id="writing-a-simple-smart-contract-in-solidity"></a>

Create `KlaytnGreeter.sol` at `klaytn-testboard/contracts` directory.

```bash
$ cd contracts
$ touch KlaytnGreeter.sol
$ vi KlaytnGreeter.sol
```

Write the following code in KlaytnGreeter.sol.

```text
pragma solidity 0.5.6;
contract Mortal {
    /* Define variable owner of the type address */
    address payable owner;
    /* This function is executed at initialization and sets the owner of the contract */
    constructor () public { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() public payable { if (msg.sender == owner) selfdestruct(owner); }
}

contract KlaytnGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting;
    /* This runs when the contract is executed */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

## Modifying the Migration Script <a id="modifying-the-migration-script"></a>

```bash
$ cd ..
$ cd migrations
$ vi 1_initial_migration.js
```

Modify `1_initial_migration.js` as the following.

```javascript
const Migrations = artifacts.require("./Migrations.sol");
const KlaytnGreeter = artifacts.require("./KlaytnGreeter.sol");
module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(KlaytnGreeter, 'Hello, Klaytn');
};
```

## Deploying a Smart Contract using Truffle <a id="deploying-a-smart-contract-using-truffle"></a>

Enter Klaytn's network information into truffle.js.

**`WARNING`**: Currently Klaytn Baobab network's gasPrice is fixed to 25 Gpeb \(**It returns an error if you attempt to use any other number**\).

```bash
$ cd ..
$ vi truffle-config.js
```

Modify configuration as below

```javascript
// truffle-config.js
module.exports = {
    networks: {
        klaytn: {
            host: '127.0.0.1',
            port: 8551,
            from: '0x75a59b94889a05c03c66c3c84e9d2f8308ca4abd', // enter your account address
            network_id: '1001', // Baobab network id
            gas: 20000000, // transaction gas limit
            gasPrice: 25000000000, // gasPrice of Baobab is 25 Gpeb
        },
    },
    compilers: {
      solc: {
        version: "0.5.6"    // Specify compiler's version to 0.5.6
      }
  }
};
```

Deploy the contract using the following command.

**NOTE**: Use `--network` to select which network to deploy and `--reset` to overwrite.

**NOTE**: Make sure that your Klaytn node is running.

Your contract address is displayed followed \`KlaytnGreeter:

```bash
$ truffle deploy --network klaytn --reset
Using network 'klaytn'.
Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x0f5108bd9e51fe6bf71dfc472577e3f55519e0b5d140a99bf65faf26830acfca
  Migrations: 0x97b1b3735c8f2326a262dbbe6c574a8ea1ba0b7d
  Deploying KlaytnGreeter...
  ... 0xcba53b6090cb4a118359b27293ba95116a8f35f66ae50fbd23ae1081ce9ffb9e
  KlaytnGreeter: [SAVE THIS ADDRESS!!] # this is your smart contract address
Saving successful migration to network...
  ... 0x14eb68727ca5a0ac767441c9b7ab077336f9311f71e9854d42c617aebceeec72
Saving artifacts...
```

**`WARNING`**: It returns an error when your account is locked.

```bash
Running migration: 1_initial_migration.js
  Replacing Migrations...
  ... undefined
Error encountered, bailing. Network state unknown. Review successful transactions manually.
Error: authentication needed: password or unlock
```

This is how you unlock your account.

```javascript
> personal.unlockAccount('0x775a59b94889a05c03c66c3c84e9d2f8308ca4abd')
Unlock account 0x75a59b94889a05c03c66c3c84e9d2f8308ca4abd
Passphrase:
true
```

And then you are ready to go. Try deploy again.

