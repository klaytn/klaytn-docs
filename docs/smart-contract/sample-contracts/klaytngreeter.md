# KlaytnGreeter

`KlaytnGreeter` is a simple contract that returns a greeting message. Greeting message is set when the contract is deployed. 

## Writing KlaytnGreeter

```text
pragma solidity 0.4.24;
contract Mortal {
    /* Define variable owner of the type address */
    address owner;
    /* This function is executed at initialization and sets the owner of the contract */
    function Mortal() { owner = msg.sender; }
    /* Function to recover the funds on the contract */
    function kill() { if (msg.sender == owner) selfdestruct(owner); }
}

contract KlaytnGreeter is Mortal {
    /* Define variable greeting of the type string */
    string greeting;
    /* This runs once when the contract is created */
    function KlaytnGreeter(string _greeting) public {
        greeting = _greeting;
    }
    /* Main function */
    function greet() constant returns (string) {
        return greeting;
    }
}
```

## Deploying KlaytnGreeter using Klaytn IDE

* Please visit the [Klaytn IDE website](https://ide.klaytn.com) and create a `KlaytnGreeter` contract. The complete source code was given in the above.
* Prepare your account which will be used to deploy the contract. 
  * If you do not have an account yet, create one at [https://baobab.wallet.klaytn.com/create](https://baobab.wallet.klaytn.com/create)
  * Get some test KLAY from the faucet - [https://baobab.wallet.klaytn.com/faucet](https://baobab.wallet.klaytn.com/faucet)
* Deploy the contract with initial parameter, a greeting message. 
* After deploying, you can invoke `greet` from the IDE.

## References

For the details of contract deployment and the Klaytn IDE usage guideline, please refer to the following documents. 

* [Klaytn IDE](../ide-and-tools/README.md#klaytn-ide)
* [Truffle](../ide-and-tools/README.md#truffle)
* [Deploy Guide](../deploy-guide.md)



