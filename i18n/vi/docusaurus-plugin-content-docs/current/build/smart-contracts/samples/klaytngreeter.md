# KlaytnGreeter

`KlaytnGreeter` là hợp đồng đơn giản thực hiện trả về thông báo chào mừng. Thông báo chào mừng được thiết lập khi hợp đồng được triển khai.

## Soạn KlaytnGreeter <a href="#writing-klaytngreeter" id="writing-klaytngreeter"></a>

```
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

## Triển khai hợp đồng KlaytnGreeter bằng Remix Online IDE <a href="#deploying-klaytngreeter-using-klaytn-ide" id="deploying-klaytngreeter-using-klaytn-ide"></a>

* Vui lòng truy cập [Klaytn Plugin for Remix](https://ide.klaytn.foundation) và tạo hợp đồng `KlaytnGreeter`. Mã nguồn hoàn chỉnh được cung cấp trên đây.
* Chuẩn bị tài khoản của bạn để triển khai hợp đồng.
  * Nếu bạn chưa có tài khoản, hãy tạo một tài khoản tại [https://baobab.wallet.klaytn.foundation/create](https://baobab.wallet.klaytn.foundation/create) hoặc [https://toolkit.klaytn.foundation/tài khoản/tài khoảnKeyLegacy](https://toolkit.klaytn.foundation/account/accountKeyLegacy).
  * Nhận một số KLAY thử nghiệm từ faucet - [https://baobab.wallet.klaytn.foundation/faucet](https://baobab.wallet.klaytn.foundation/faucet)
* Triển khai hợp đồng bằng tham số ban đầu, một thông báo chào mừng.
* Sau khi triển khai, bạn có thể gọi `greet` từ IDE.

## Tài liệu tham khảo <a href="#references" id="references"></a>

Để biết thông tin chi tiết về việc triển khai hợp đồng và hướng dẫn sử dụng Remix Online IDE, vui lòng tham khảo các tài liệu sau đây.

* [Remix Online IDE](../../smart-contracts/ide-and-tools/ide-and-tools.md#klaytn-ide)
* [Truffle](../../smart-contracts/ide-and-tools/ide-and-tools.md##truffle)
* [Hướng dẫn triển khai](../deploy/deploy.md)
