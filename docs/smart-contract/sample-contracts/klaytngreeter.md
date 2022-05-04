# KlaytnGreeter <a id="klaytngreeter"></a>

`KlaytnGreeter` is a simple contract that returns a greeting message. Greeting message is set when the contract is deployed. 

## Writing KlaytnGreeter <a id="writing-klaytngreeter"></a>

```text
pragma solidity 0.5.6;
contract Mortal {
    /* Define variable owner of the type address */
    address payable owner;
    /* This function is executed at initialization and sets the owner of the contract */
    constructor () public { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() public { if (msg.sender == owner) selfdestruct(owner); }
}

contract KlaytnGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting;
    /* This runs once when the contract is created */
    constructor (string memory _greeting) public {
        greeting = _greeting;
    }
    /* Main function */
    function greet() public view returns (string memory) {
        return greeting;
    }
}
```

## Deploying KlaytnGreeter using Klaytn IDE <a id="deploying-klaytngreeter-using-klaytn-ide"></a>

* Please visit the [Klaytn IDE website](https://ide.klaytn.foundation) and create a `KlaytnGreeter` contract. The complete source code was given in the above.
* Prepare your account which will be used to deploy the contract. 
  * If you do not have an account yet, create one at [https://baobab.wallet.klaytn.com/create](https://baobab.wallet.klaytn.com/create)
  * Get some test KLAY from the faucet - [https://baobab.wallet.klaytn.com/faucet](https://baobab.wallet.klaytn.com/faucet)
* Deploy the contract with initial parameter, a greeting message. 
* After deploying, you can invoke `greet` from the IDE.

## References <a id="references"></a>

For the details of contract deployment and the Klaytn IDE usage guideline, please refer to the following documents. 

* [Klaytn IDE](../ide-and-tools/README.md#klaytn-ide)
* [Truffle](../ide-and-tools/README.md#truffle)
* [Deploy Guide](../deploy-guide.md)



