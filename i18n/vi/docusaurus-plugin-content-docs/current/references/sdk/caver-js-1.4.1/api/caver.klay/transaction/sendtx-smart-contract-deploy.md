# Giao dịch triển khai hợp đồng thông minh

## sendTransaction (SMART_CONTRACT_DEPLOY) <a id="sendtransaction-smart_contract_deploy"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Gửi giao dịch [Triển khai hợp đồng thông minh](../../../../../../learn/transactions/basic.md#txtypesmartcontractdeploy) đến mạng.

**Tham số**

Các tham số của hàm sendTransaction bao gồm một đối tượng giao dịch và một hàm callback.

| Tên               | type      | Mô tả                                                                                                           |
| ----------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| transactionObject | Đối tượng | Đối tượng giao dịch cần gửi.                                                                                    |
| callback          | Hàm       | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

Một đối tượng giao dịch thuộc loại `SMART_CONTRACT_DEPLOY` có cấu trúc như sau:

| Tên        | Loại                                   | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | Chuỗi                                   | Loại giao dịch. "SMART_CONTRACT_DEPLOY"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| từ         | Chuỗi                                   | Địa chỉ của người gửi giao dịch này.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| gas        | Số                                      | Lượng gas tối đa sẵn sàng trả cho giao dịch (sẽ hoàn lại số gas chưa được dùng đến).                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| giá gas    | Số                                      | (tùy chọn) Giá gas được người gửi cung cấp theo đơn vị peb. Tham số gasPrice phải giống với tham số unitPrice được thiết lập trong nút Klaytn.                                                                                                                                                                                                                                                                                                                                                                                      |
| nonce      | Số                                      | (tùy chọn) Giá trị nguyên của số dùng một lần. Nếu bị bỏ qua, số lượng giao dịch sẽ được caver-js thiết lập bằng cách gọi ra `caver.klay.getTransactionCount`.                                                                                                                                                                                                                                                                                                                                                                      |
| data       | Chuỗi                                   | Một bytecode của hợp đồng thông minh sẽ được triển khai. Nếu bạn cần truyền đối số cho hàm khởi tạo của hợp đồng thông minh, bạn phải thiết lập dữ liệu ở định dạng "mã byte đã lập + các đối số". Nếu mã byte đã lập là '0x123 ... 321' và bạn cần truyền 1 đến hàm khởi tạo, bạn phải đặt là '0x123 ... 321' + '00000000000000000000000000000000000000000000000000000000000001'. Sử dụng hàm [caver.klay.abi.encodeContractDeploy](../../caver.klay.abi.md#encodecontractdeploy) để nhận giá trị mã hóa của mã byte với các tham số. |
| giá trị    | Số &#124; Chuỗi &#124; BN &#124; Số lớn | Giá trị sẽ được chuyển cho hợp đồng trong lần triển khai này. Để chấp nhận chuyển giá trị, hàm khởi tạo của hợp đồng phải được khai báo là 'payable'. Nếu hàm khởi tạo của hợp đồng không được khai báo là payable, giá trị sẽ phải là 0.                                                                                                                                                                                                                                                                                           |
| codeFormat | Chuỗi                                   | (tùy chọn, mặc định: `"EVM"`) Định dạng mã của hợp đồng thông minh.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

**Giá trị trả về**

Hàm `callback` sẽ trả về hàm băm giao dịch 32 byte.

`PromiEvent`: Bộ phát hiệu ứng sự kiện kết hợp promise. Sẽ được xử lý khi có biên lai giao dịch. Ngoài ra còn có các sự kiện sau đây:

- `"transactionHash"` trả về `String`: Được kích hoạt ngay sau khi gửi giao dịch và có hàm băm giao dịch.
- `"receipt"` trả về `Object`: Được kích hoạt khi có sẵn biên lai giao dịch.
- `"error"` trả về `Error`: Được kích hoạt nếu có lỗi phát sinh trong quá trình gửi. Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

**Ví dụ**

```javascript
const tài khoản = caver.klay.tài khoảns.wallet.add('0x{private key}')

// Trường hợp 1: Triển khai hợp đồng thông minh

// sử dụng promise
caver.klay.sendTransaction({
    type: 'SMART_CONTRACT_DEPLOY',
    from: tài khoản.address,
    data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: '300000',
    value: '0x174876e800',
})
.then(function(receipt){
    ...
});

// sử dụng bộ phát tín hiệu sự kiện
caver.klay.sendTransaction({
    type: 'SMART_CONTRACT_DEPLOY',
    from: tài khoản.address,
    data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    gas: '300000',
    value: '0x174876e800',
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.


// Trường hợp 2: Triển khai hợp đồng thông minh bằng các đối số của hàm khởi tạo (sử dụng caver.klay.abi.encodeContractDeploy).

// sử dụng promise
caver.klay.sendTransaction({
    type: 'SMART_CONTRACT_DEPLOY',
    from: tài khoản.address,
    data: caver.klay.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" }, { "name": "_b", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee0029', 1, 2),
    gas: '300000',
    value: 0,
})
.then(function(receipt){
    ...
});

// sử dụng bộ phát hiệu ứng sự kiện
caver.klay.sendTransaction({
    type: 'SMART_CONTRACT_DEPLOY',
    from: tài khoản.address,
    data: caver.klay.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" }, { "name": "_b", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee0029', 1, 2),
    gas: '300000',
    value: 0,
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.
```


## sendTransaction (FEE_DELEGATED_SMART_CONTRACT_DEPLOY) <a id="sendtransaction-fee_delegated_smart_contract_deploy"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Gửi giao dịch [Triển khai hợp đồng thông minh có ủy thác phí](../../../../../../learn/transactions/fee-delegation.md#txtypefeedelegatedsmartcontractdeploy) đến mạng.

**Tham số**

Các tham số của hàm sendTransaction bao gồm một đối tượng giao dịch và một hàm callback.

| Tên               | type      | Mô tả                                                                                                           |
| ----------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| transactionObject | Đối tượng | Đối tượng giao dịch cần gửi.                                                                                    |
| callback          | Hàm       | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

Một đối tượng giao dịch thuộc loại `FEE_DELEGATED_SMART_CONTRACT_DEPLOY` có cấu trúc như sau:

| Tên        | Loại                                   | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | Chuỗi                                   | Loại giao dịch. "FEE_DELEGATED_SMART_CONTRACT_DEPLOY"                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| từ         | Chuỗi                                   | Địa chỉ của người gửi giao dịch này.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| gas        | Số                                      | Lượng gas tối đa sẵn sàng trả cho giao dịch (sẽ hoàn lại số gas chưa được dùng đến).                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| giá gas    | Số                                      | (tùy chọn) Giá gas được người gửi cung cấp theo đơn vị peb. Tham số gasPrice phải giống với tham số unitPrice được thiết lập trong nút Klaytn.                                                                                                                                                                                                                                                                                                                                                                                      |
| nonce      | Số                                      | (tùy chọn) Giá trị nguyên của số dùng một lần. Nếu bị bỏ qua, số lượng giao dịch sẽ được caver-js thiết lập bằng cách gọi ra `caver.klay.getTransactionCount`.                                                                                                                                                                                                                                                                                                                                                                      |
| data       | Chuỗi                                   | Một bytecode của hợp đồng thông minh sẽ được triển khai. Nếu bạn cần truyền đối số cho hàm khởi tạo của hợp đồng thông minh, bạn phải thiết lập dữ liệu ở định dạng "mã byte đã lập + các đối số". Nếu mã byte đã lập là '0x123 ... 321' và bạn cần truyền 1 đến hàm khởi tạo, bạn phải đặt là '0x123 ... 321' + '00000000000000000000000000000000000000000000000000000000000001'. Sử dụng hàm [caver.klay.abi.encodeContractDeploy](../../caver.klay.abi.md#encodecontractdeploy) để nhận giá trị mã hóa của mã byte với các tham số. |
| giá trị    | Số &#124; Chuỗi &#124; BN &#124; Số lớn | Giá trị sẽ được chuyển cho hợp đồng trong lần triển khai này. Để chấp nhận chuyển giá trị, hàm khởi tạo của hợp đồng phải được khai báo là 'payable'. Nếu hàm khởi tạo của hợp đồng không được khai báo là payable, giá trị sẽ phải là 0.                                                                                                                                                                                                                                                                                           |
| codeFormat | Chuỗi                                   | (tùy chọn, mặc định: `"EVM"`) Định dạng mã của hợp đồng thông minh.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

Một đối tượng giao dịch thuộc loại `FEE_DELEGATED_SMART_CONTRACT_DEPLOY` với cấu trúc như trên hoặc giao dịch `RLP-encoded transaction` thuộc loại `FEE_DELEGATED_SMART_CONTRACT_DEPLOY` có thể được sử dụng làm tham số trong [caver.klay.tài khoảns.signTransaction](../../caver.klay.accounts.md#signtransaction) đối với người gửi hoặc trong [caver.klay.tài khoảns.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) đối với người trả phí.

Để người trả phí ký một giao dịch mã hóa RLP mà người gửi đã ký và gửi đến mạng, hãy xác định một đối tượng có cấu trúc như sau và gọi ra hàm `caver.klay.sendTransaction`.

| Tên                  | Loại | Mô tả                                    |
| -------------------- | ----- | ---------------------------------------- |
| feePayer             | Chuỗi | Địa chỉ người trả phí của giao dịch.     |
| senderRawTransaction | Chuỗi | Giao dịch mã hóa RLP mà người gửi đã ký. |

**Giá trị trả về**

Hàm `callback` sẽ trả về hàm băm giao dịch 32 byte.

`PromiEvent`: Bộ phát hiệu ứng sự kiện kết hợp promise. Sẽ được xử lý khi có biên lai giao dịch. Ngoài ra còn có các sự kiện sau đây:

- `"transactionHash"` trả về `String`: Được kích hoạt ngay sau khi gửi giao dịch và có hàm băm giao dịch.
- `"receipt"` trả về `Object`: Được kích hoạt khi có sẵn biên lai giao dịch.
- `"error"` trả về `Error`: Được kích hoạt nếu có lỗi phát sinh trong quá trình gửi. Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

**Ví dụ**

```javascript
const sender = caver.klay.tài khoảns.wallet.add('0x{private key}')
const feePayer = caver.klay.tài khoảns.wallet.add('0x{private key}')

// sử dụng promise
const { rawTransaction: senderRawTransaction } = await caver.klay.tài khoảns.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY',
  from: sender.address,
  data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
  gas:  '300000',
  value: caver.utils.toPeb('1', 'KLAY'),
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.then(function(receipt){
    ...
});

// sử dụng bộ phát hiệu ứng sự kiện
const { rawTransaction: senderRawTransaction } = await caver.klay.tài khoảns.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY',
  from: sender.address,
  data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
  gas:  '300000',
  value: caver.utils.toPeb('1', 'KLAY'),
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

// Triển khai hợp đồng thông minh bằng các đối số của hàm khởi tạo (sử dụng caver.klay.abi.encodeContractDeploy).

const { rawTransaction: senderRawTransaction } = await caver.klay.tài khoảns.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY',
  from: sender.address,
  data: caver.klay.abi.encodeContractDeploy([ 
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, 
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, 
        { "inputs": [ { "name": "_a", "type": "uint256" }, { "name": "_b", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } 
    ],'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee0029', 1, 2),
  gas:  '300000',
  value: 0,
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.then(function(receipt){
    ...
});
```

## sendTransaction (FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO) <a id="sendtransaction-fee_delegated_smart_contract_deploy_with_ratio"></a>

```javascript
caver.klay.sendTransaction(transactionObject [, callback])
```
Gửi giao dịch [Triển khai hợp đồng thông minh có ủy thác phí theo tỷ lệ](../../../../../../learn/transactions/partial-fee-delegation.md#txtypefeedelegatedsmartcontractdeploywithratio) đến mạng.

**Tham số**

Các tham số của hàm sendTransaction bao gồm một đối tượng giao dịch và một hàm callback.

| Tên               | type      | Mô tả                                                                                                           |
| ----------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| transactionObject | Đối tượng | Đối tượng giao dịch cần gửi.                                                                                    |
| callback          | Hàm       | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

Một đối tượng giao dịch thuộc loại `FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO` có cấu trúc như sau:

| Tên        | Loại                                   | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | Chuỗi                                   | Loại giao dịch. "FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO"                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| từ         | Chuỗi                                   | Địa chỉ của người gửi giao dịch này.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| gas        | Số                                      | Lượng gas tối đa sẵn sàng trả cho giao dịch (sẽ hoàn lại số gas chưa được dùng đến).                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| giá gas    | Số                                      | (tùy chọn) Giá gas được người gửi cung cấp theo đơn vị peb. Tham số gasPrice phải giống với tham số unitPrice được thiết lập trong nút Klaytn.                                                                                                                                                                                                                                                                                                                                                                                      |
| nonce      | Số                                      | (tùy chọn) Giá trị nguyên của số dùng một lần. Nếu bị bỏ qua, số lượng giao dịch sẽ được caver-js thiết lập bằng cách gọi ra `caver.klay.getTransactionCount`.                                                                                                                                                                                                                                                                                                                                                                      |
| data       | Chuỗi                                   | Một bytecode của hợp đồng thông minh sẽ được triển khai. Nếu bạn cần truyền đối số cho hàm khởi tạo của hợp đồng thông minh, bạn phải thiết lập dữ liệu ở định dạng "mã byte đã lập + các đối số". Nếu mã byte đã lập là '0x123 ... 321' và bạn cần truyền 1 đến hàm khởi tạo, bạn phải đặt là '0x123 ... 321' + '00000000000000000000000000000000000000000000000000000000000001'. Sử dụng hàm [caver.klay.abi.encodeContractDeploy](../../caver.klay.abi.md#encodecontractdeploy) để nhận giá trị mã hóa của mã byte với các tham số. |
| giá trị    | Số &#124; Chuỗi &#124; BN &#124; Số lớn | Giá trị sẽ được chuyển cho hợp đồng trong lần triển khai này. Để chấp nhận chuyển giá trị, hàm khởi tạo của hợp đồng phải được khai báo là 'payable'. Nếu hàm khởi tạo của hợp đồng không được khai báo là payable, giá trị sẽ phải là 0.                                                                                                                                                                                                                                                                                           |
| codeFormat | Chuỗi                                   | (tùy chọn, mặc định: `"EVM"`) Định dạng mã của hợp đồng thông minh.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| feeRatio   | Số                                      | Tỷ lệ phí của người trả phí. Nếu tỷ lệ là 30 thì người trả phí phải trả 30% phí. 70% còn lại sẽ được trả bởi người gửi. Phạm vi của tỷ lệ phí là 1 ~ 99, nếu nằm ngoài phạm vi, giao dịch sẽ không được chấp nhận.                                                                                                                                                                                                                                                                                                                  |

Một đối tượng giao dịch thuộc loại `FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO` với cấu trúc như trên hoặc giao dịch `RLP-encoded transaction` thuộc loại `FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO` có thể được sử dụng làm tham số trong [caver.klay.tài khoảns.signTransaction](../../caver.klay.accounts.md#signtransaction) đối với người gửi hoặc trong [caver.klay.tài khoảns.feePayerSignTransaction](../../caver.klay.accounts.md#feepayersigntransaction) đối với người trả phí.

Để người trả phí ký một giao dịch mã hóa RLP mà người gửi đã ký và gửi đến mạng, hãy xác định một đối tượng có cấu trúc như sau và gọi ra hàm `caver.klay.sendTransaction`.

| Tên                  | Loại | Mô tả                                    |
| -------------------- | ----- | ---------------------------------------- |
| feePayer             | Chuỗi | Địa chỉ người trả phí của giao dịch.     |
| senderRawTransaction | Chuỗi | Giao dịch mã hóa RLP mà người gửi đã ký. |

**Giá trị trả về**

Hàm `callback` sẽ trả về hàm băm giao dịch 32 byte.

`PromiEvent`: Bộ phát hiệu ứng sự kiện kết hợp promise. Sẽ được xử lý khi có biên lai giao dịch. Ngoài ra còn có các sự kiện sau đây:

- `"transactionHash"` trả về `String`: Được kích hoạt ngay sau khi gửi giao dịch và có hàm băm giao dịch.
- `"receipt"` trả về `Object`: Được kích hoạt khi có sẵn biên lai giao dịch.
- `"error"` trả về `Error`: Được kích hoạt nếu có lỗi phát sinh trong quá trình gửi. Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

**Ví dụ**

```javascript
const sender = caver.klay.tài khoảns.wallet.add('0x{private key}')
const feePayer = caver.klay.tài khoảns.wallet.add('0x{private key}')

// sử dụng promise
const { rawTransaction: senderRawTransaction } = await caver.klay.tài khoảns.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO',
  from: sender.address,
  data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
  gas:  '300000',
  value: caver.utils.toPeb('1', 'KLAY'),
  feeRatio: 30,
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.then(function(receipt){
    ...
});

// using the event emitter
const { rawTransaction: senderRawTransaction } = await caver.klay.tài khoảns.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO',
  from: sender.address,
  data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
  gas:  '300000',
  value: caver.utils.toPeb('1', 'KLAY'),
  feeRatio: 30,
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error); // Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

// Triển khai hợp đồng thông minh bằng các đối số của hàm khởi tạo (sử dụng caver.klay.abi.encodeContractDeploy).

const { rawTransaction: senderRawTransaction } = await caver.klay.tài khoảns.signTransaction({
  type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO',
  from: sender.address,
  data: caver.klay.abi.encodeContractDeploy([
        { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" },
        { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" },
        { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" },
        { "inputs": [ { "name": "_a", "type": "uint256" }, { "name": "_b", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }
    ],'0x60806040526000805534801561001457600080fd5b5060405160408061016883398101806040528101908080519060200190929190805190602001909291905050505050610116806100526000396000f3006080604052600436106053576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd14605857806342cbb15c146080578063d14e62b81460a8575b600080fd5b348015606357600080fd5b50606a60d2565b6040518082815260200191505060405180910390f35b348015608b57600080fd5b50609260d8565b6040518082815260200191505060405180910390f35b34801560b357600080fd5b5060d06004803603810190808035906020019092919050505060e0565b005b60005481565b600043905090565b80600081905550505600a165627a7a72305820f85b40d5ad70d0b3599200515915dca3074bcf609f27660845ecbfe882d3eeee0029', 1, 2),
  gas:  '300000',
  value: 0,
  feeRatio: 30,
}, sender.privateKey)

caver.klay.sendTransaction({
  senderRawTransaction: senderRawTransaction,
  feePayer: feePayer.address,
})
.then(function(receipt){
    ...
});
```


