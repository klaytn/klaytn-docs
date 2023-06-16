# Kiểm tra quy trình triển khai <a id="check-the-deployment"></a>

## Kiểm tra chỉ thị biên dịch đã triển khai bằng caver-js <a id="checking-the-deployed-byte-code-using-caver-js"></a>

Sử dụng `getCode` để kiểm tra chỉ thị biên dịch của hợp đồng thông minh đã triển khai.

Trước tiên, hãy tạo và mở một tệp thử nghiệm.

```bash
$ touch test-klaytn.js
$ open test-klaytn.js
```

Viết mã kiểm tra sau. Đảm bảo bạn nhập địa chỉ hợp đồng mà bạn vừa triển khai.

```javascript
// test-klaytn.js
const Caver = require('caver-js');
const caver = new Caver('http://127.0.0.1:8551');
// enter your smart contract address
const contractAddress = '0x65ca27ed42abeef230a37317a574058ff1372b34'
caver.klay.getCode(contractAddress).then(console.log);
```

Chạy mã.

```bash
$ node test-klaytn.js
0x60806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610051578063cfae321714610068575b600080fd5b34801561005d57600080fd5b506100666100f8565b005b34801561007457600080fd5b5061007d610189565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100bd5780820151818401526020810190506100a2565b50505050905090810190601f1680156100ea5780820380516001836020036101000a031916815260200191505b509250505060405180...
```

## Gọi ra các hàm trong Hợp đồng thông minh đã triển khai <a id="calling-functions-in-the-deployed-smart-contract"></a>

Dùng JavaScript để gọi ra`greet()` trong hợp đồng.

**LƯU Ý**: Để gọi ra các hàm cụ thể trong hợp đồng thông minh, bạn cần tập tin ABI \(Giao dịch nhị phân ứng dụng\). Khi triển khai hợp đồng của bạn, Truffle sẽ tự động tạo một tập tin .json tại `./build/contracts/` trong đó có chứa thuộc tính `abi`.

Nối các dòng sau vào mã kiểm tra được viết ở trên.

```javascript
// test-klaytn.js
const Caver = require('caver-js');
const caver = new Caver('http://127.0.0.1:8551');
// enter your smart contract address
const contractAddress = '0x65ca27ed42abeef230a37317a574058ff1372b34'

caver.klay.getCode(contractAddress).then(console.log);
// add lines
const KlaytnGreeter = require('./build/contracts/KlaytnGreeter.json');
// enter your smart contract address
const klaytnGreeter = new caver.klay.Contract(KlaytnGreeter.abi, contractAddress);
klaytnGreeter.methods.greet().call().then(console.log);
```

Chạy mã kiểm tra.

```bash
$ node test-klaytn.js
0x60806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610051578063cfae321714610068575b600080fd5b34801561005d57600080fd5b506100666100f8565b005b34801561007457600080fd5b5061007d610189565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100bd5780820151... # This is from caver.klay.getCode
Hello, Klaytn # This is from KlyatnGreeter.methods.greet()
```

**Nếu nhận được dòng "Hello, Klaytn", bạn đã hoàn thành nhiệm vụ. Xin chúc mừng!**

