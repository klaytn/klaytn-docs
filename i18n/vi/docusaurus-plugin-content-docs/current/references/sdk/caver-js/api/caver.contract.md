# caver.contract

Đối tượng `caver.contract` giúp tương tác dễ dàng hơn với các hợp đồng thông minh trên nền tảng chuỗi khối Klaytn. Khi bạn tạo một phiên bản hợp đồng mới, bạn phải cung cấp giao diện JSON cho hợp đồng thông minh đó và caver-js sẽ tự động chuyển đổi tất cả lệnh gọi với phiên bản hợp đồng trong javascript thành lệnh gọi ABI cấp độ thấp qua RPC cho bạn.

Điều này cho phép bạn tương tác với các hợp đồng thông minh như thể chúng là các đối tượng JavaScript.

## caver.contract.create <a href="#caver-contract-create" id="caver-contract-create"></a>

```javascript
caver.contract.create(jsonInterface [, address] [, options])
```

Tạo một phiên bản hợp đồng mới với tất cả các phương pháp và sự kiện được xác định trong đối tượng giao diện JSON của hợp đồng đó. Hàm này hoạt động tương tự như [caver.contract mới](#new-contract).

**LƯU Ý** `caver.contract.create` được hỗ trợ kể từ đối tượng caver-js [v1.6.1](#mycontract-deploy).

**Tham số**

Xem [new caver.contract](#new-contract).

**Giá trị trả về**

Xem [new caver.contract](#new-contract).

**Ví dụ**

```javascript
const contract = caver.contract.create([
    {
        constant: true,
        inputs: [{ name: 'interfaceId', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    ...
  ], '0x{address in hex}')
```

## caver.contract <a href="#new-contract" id="new-contract"></a>

```javascript
new caver.contract(jsonInterface [, address] [, options])
```

Tạo một phiên bản hợp đồng mới với tất cả các phương pháp và sự kiện được xác định trong đối tượng giao diện JSON của hợp đồng đó.

**Tham số**

| Tên           | type      | Mô tả                                                                                                                                             |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| jsonInterface | đối tượng | Giao diện JSON để khởi tạo hợp đồng                                                                                                               |
| address       | chuỗi     | (tùy chọn) Địa chỉ của hợp đồng thông minh để gọi. Có thể thêm sau bằng cách sử dụng `myContract.options.address = '0x1234..'` |
| tùy chọn      | đối tượng | (tùy chọn) Các tùy chọn của hợp đồng. Xem bảng dưới đây để biết thông tin chi tiết.                                            |

Đối tượng tùy chọn chứa các mục sau:

| Tên           | Loại   | Mô tả                                                                                                                                                                                                                                                                      |
| ------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ            | chuỗi   | (tùy chọn) Địa chỉ mà các giao dịch sẽ được thực hiện.                                                                                                                                                                                                  |
| giá gas       | chuỗi   | (tùy chọn) Giá gas tính bằng peb để sử dụng cho giao dịch.                                                                                                                                                                                              |
| gas           | số      | (tùy chọn) Lượng gas tối đa được cung cấp cho một giao dịch (giới hạn gas).                                                                                                                                                          |
| data          | chuỗi   | (tùy chọn) Mã byte của hợp đồng. Được sử dụng khi hợp đồng được triển khai.                                                                                                                                                                             |
| feeDelegation | boolean | (tùy chọn) Có sử dụng giao dịch ủy thác phí hay không.                                                                                                                                                                                                  |
| feePayer      | chuỗi   | (tùy chọn) Địa chỉ của người trả phí thanh toán phí giao dịch. Khi `feeDelegation` là `đúng`, giá trị sẽ được đặt thành trường `feePayer` trong giao dịch.                                                                                              |
| feeRatio      | chuỗi   | (tùy chọn) Tỷ lệ phí giao dịch mà người trả phí sẽ phải chịu. Nếu `feeDelegation` là `đúng` và `feeRatio` được đặt thành giá trị hợp lệ thì giao dịch ủy thác phí một phần sẽ được sử dụng. phí một phần sẽ được sử dụng. Khoảng hợp lệ là từ 1 đến 99. |

Tỷ lệ không được phép bằng 0 hoặc bằng và cao hơn 100.

| **Giá trị trả về** | Loại     |
| ------------------ | --------- |
| Mô tả              | đối tượng |

Đối tượng hợp đồng với tất cả các phương pháp và sự kiện của nó.

```javascript
const myContract = new caver.contract([...], '0x{address in hex}', { gasPrice: '25000000000' })
```

## **Ví dụ**

```javascript
myContract.options
```

myContract.options <a href="#mycontract-options" id="mycontract-options"></a> Đối tượng `options` cho phiên bản hợp đồng.

`from`, `gas`, `gasPrice`, `feePayer` và `feeRatio` được sử dụng làm giá trị dự phòng khi gửi giao dịch.

| **Thuộc tính**                                                                                                   | Tên           | Loại                                                                                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mô tả                                                                                                            | address       | chuỗi                                                                                                                                                                                                                                              |
| Địa chỉ triển khai hợp đồng.                                                                                     | jsonInterface | Mảng                                                                                                                                                                                                                                               |
| Giao diện JSON của hợp đồng.                                                                                     | từ            | chuỗi Địa chỉ mặc định mà giao dịch triển khai/thực thi hợp đồng được gửi đi.                                                                                                                                                                      |
| Nếu không xác định địa chỉ `from` khi tạo giao dịch thì `myContract.options.from` sẽ luôn dùng để tạo giao dịch. | giá gas       | chuỗi                                                                                                                                                                                                                                              |
| Giá gas tính bằng peb để sử dụng cho giao dịch.                                                                  | gas           | số                                                                                                                                                                                                                                                 |
| Lượng gas tối đa được cung cấp cho một giao dịch (giới hạn gas).                              | data          | chuỗi Mã byte của hợp đồng.                                                                                                                                                                                                                        |
| Được sử dụng khi hợp đồng được triển khai.                                                                       | feeDelegation | boolean                                                                                                                                                                                                                                            |
| (tùy chọn) Có sử dụng giao dịch ủy thác phí hay không.                                        | feePayer      | chuỗi (tùy chọn) Địa chỉ của người trả phí thanh toán phí giao dịch.                                                                                                                                                            |
| Khi `feeDelegation` là `đúng`, giá trị sẽ được đặt thành trường `feePayer` trong giao dịch.                      | feeRatio      | chuỗi (tùy chọn) Tỷ lệ phí giao dịch mà người trả phí sẽ phải chịu. Nếu `feeDelegation` là `đúng` và `feeRatio` được đặt thành giá trị hợp lệ thì giao dịch ủy thác phí một phần sẽ được sử dụng. phí một phần sẽ được sử dụng. |

Khoảng hợp lệ là từ 1 đến 99.

Tỷ lệ không được phép bằng 0 hoặc bằng và cao hơn 100.

```javascript
> myContract.options
{
  address: [Getter/Setter],
  jsonInterface: [Getter/Setter],
  from: [Getter/Setter],
  feePayer: [Getter/Setter],
  feeDelegation: [Getter/Setter],
  feeRatio: [Getter/Setter],
  gasPrice: [Getter/Setter],
  gas: [Getter/Setter],
  data: [Getter/Setter]
}

> myContract.options.from = '0x1234567890123456789012345678901234567891' // default from address
> myContract.options.gasPrice = '25000000000000' // default gas price in peb
> myContract.options.gas = 5000000 // provide as fallback always 5M gas
> myContract.options.feeDelegation = true // use fee delegation transaction
> myContract.options.feePayer = '0x1234567890123456789012345678901234567891' // default fee payer address
> myContract.options.feeRatio = 20 // default fee ratio when send partial fee delegation transaction
```

## **LƯU Ý** `feeDelegation`, `feePayer` và `feeRatio` được hỗ trợ kể từ phiên bản caver-js[v1.6.1](#mycontract-deploy).

```javascript
myContract.options.address
```

tượng caver-js[v1.6.1](#mycontract-deploy). **Ví dụ**

myContract.options.address <a href="#mycontract-options-address" id="mycontract-options-address"></a>

| Địa chỉ được sử dụng cho phiên bản hợp đồng này `myContract`. | Tất cả các giao dịch do caver-js tạo ra từ hợp đồng này sẽ chứa địa chỉ này dưới dạng `to` của giao dịch. | **Thuộc tính** |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------- |
| Tên                                                           | Loại                                                                                                     | Mô tả          |

address

```javascript
>  myContract.options.address
'0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'

// set a contract address
>  myContract.options.address = '0x1234FFDD...'
```

## chuỗi | `null`

```javascript
myContract.options.jsonInterface
```

Địa chỉ cho hợp đồng này hoặc `null` nếu nó chưa được đặt.

**Ví dụ**

| myContract.options.jsonInterface <a href="#mycontract-options-jsoninterface" id="mycontract-options-jsoninterface"></a> | Đối tượng giao diện JSON bắt nguồn từ ABI của hợp đồng này `myContract`. | **Thuộc tính**      |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------- |
| Tên                                                                                                                     | type                                                                     | Mô tả jsonInterface |

Mảng

```javascript
> myContract.options.jsonInterface
[
  {
    constant: true,
    inputs: [ { name: 'interfaceId', type: 'bytes4' } ],
    name: 'supportsInterface',
    outputs: [ { name: '', type: 'bool' } ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x01ffc9a7',
  },
  ...
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'owner', type: 'address' },
      { indexed: true, name: 'spender', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' }
    ],
    name: 'Approval',
    type: 'event',
    signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
  },
]

// set a new jsonInterface
> myContract.options.jsonInterface = [...]
```

## Giao diện JSON cho hợp đồng này.

```javascript
myContract.clone([contractAddress])
```

Đặt lại điều này sẽ tạo lại các phương pháp và sự kiện của phiên bản hợp đồng.

**Ví dụ**

| myContract.clone <a href="#mycontract-clone" id="mycontract-clone"></a> | Sao chép phiên bản hợp đồng hiện tại. | **Tham số**           |
| ----------------------------------------------------------------------- | ------------------------------------- | --------------------- |
| Tên                                                                     | Loại                                 | Mô tả contractAddress |

Chuỗi

| (tùy chọn) Địa chỉ của hợp đồng mới. | Nếu bỏ qua, địa chỉ này sẽ được đặt thành địa chỉ trong đối tượng gốc (e.g., `myContract.options.address`). |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Giá trị trả về**                                      | Loại                                                                                                                          |

Mô tả

```javascript
> myContract.clone()
Contract {
  currentProvider: [Getter/Setter],
  ...
  _keyrings: KeyringContainer { ... }
}
```

## đối tượng

```javascript
myContract.deploy(options, byteCode [, param1 [, param2 [, ...]]])
```

Đối tượng hợp đồng được sao chép mới. **Ví dụ** myContract.deploy <a href="#mycontract-deploy2" id="mycontract-deploy2"></a> Triển khai hợp đồng cho mạng lưới Klaytn.

Sau khi triển khai thành công, promise sẽ được xử lý bằng một phiên bản hợp đồng mới.

Không giống cách hoạt động của hàm [myContract.deploy](#methods-methodname-send) hiện tại, hàm này gửi giao dịch trực tiếp đến mạng lưới Klaytn.

Bạn không cần lệnh gọi `send()` với đối tượng được trả về.

| **LƯU Ý** `caver.wallet` phải chứa các đối tượng keyring tương ứng với `from` và `feePayer` trong `options` hoặc `myContract.options` để tạo chữ ký. | **LƯU Ý** `myContract.deploy` được hỗ trợ kể từ caver-js phiên bản [v1.6.1](#mycontract-deploy). | **Tham số**                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Tên                                                                                                                                                  | Loại                                                                                            | Mô tả tùy chọn                                                                                                     |
| đối tượng                                                                                                                                            | Các tùy chọn được sử dụng để gửi.                                                                | Xem bảng trong [methods.methodName.send](caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) để biết chi tiết. |
| byteCode                                                                                                                                             | chuỗi                                                                                            | Mã byte của hợp đồng.                                                                                              |

Tham số

Hỗn hợp

| (tùy chọn) Các tham số được chuyển đến hàm tạo khi triển khai. | **Giá trị trả về**     |
| --------------------------------------------------------------------------------- | ---------------------- |
| `Promise` trả về `PromiEvent`: Promise sẽ được xử lý với phiên bản hợp đồng mới.  | Loại Mô tả PromiEvent |

Trình phát sự kiện kết hợp promise.

- Nó sẽ được xử lý khi có biên lai giao dịch. Nếu `send()` được gọi từ `myContract.deploy()` thì promise sẽ được xử lý với phiên bản hợp đồng mới.
- Đối với PromiEvent, sẽ có các sự kiện sau đây: `transactionHash`: nó được kích hoạt ngay sau khi giao dịch được gửi và có sẵn hàm băm giao dịch. Loại của nó là `string`.
- `receipt`: Nó được kích hoạt khi có sẵn biên lai giao dịch. Xem [caver.rpc.klay.getTransactionReceipt](#methods-methodname-send) để biết thêm chi tiết. Loại của nó là `object`.

`error`: Nó được kích hoạt nếu xảy ra lỗi trong khi gửi.

```javascript
// Deploy a smart contract without constructor arguments
> myContract.deploy({
      from: '0x{address in hex}',
      gas: 1500000,
  }, '0x{byte code}')
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress) // contains the new contract address
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address) // instance with the new contract address
  })

// Deploy a smart contract with constructor arguments
> myContract.deploy({
      from: '0x{address in hex}',
      gas: 1500000,
  }, '0x{byte code}', 'keyString', ...)
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress) 
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address)
  })

// Deploy a smart contract with fee delegation transaction (TxTypeFeeDelegatedSmartContractDeploy)
> myContract.deploy({
      from: '0x{address in hex}',
      feeDelegation: true,
      feePayer: '0x{address in hex}',
      gas: 1500000,
  }, '0x{byte code}')
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress)
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address)
  })

// Deploy a smart contract with partial fee delegation transaction (TxTypeFeeDelegatedSmartContractDeployWithRatio)
> myContract.deploy({
      from: '0x{address in hex}',
      feeDelegation: true,
      feePayer: '0x{address in hex}',
      feeRatio: 30,
      gas: 1500000,
  }, '0x{byte code}')
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress)
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address)
  })
```

## Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

```javascript
myContract.deploy(options)
```

Loại của nó là `Error`. **Ví dụ** myContract.deploy <a href="#mycontract-deploy" id="mycontract-deploy"></a>

Trả về đối tượng được sử dụng khi triển khai hợp đồng thông minh cho Klaytn.

| Bạn có thể gửi giao dịch triển khai hợp đồng thông minh bằng cách gọi lệnh `myContract.deploy({ data, arguments }).send(options)`. | Sau khi triển khai thành công, promise sẽ được xử lý bằng một phiên bản hợp đồng mới. | **Tham số**    |
| ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | -------------- |
| Tên                                                                                                                                | Loại                                                                                 | Mô tả tùy chọn |

đối tượng

| Đối tượng tùy chọn dùng để triển khai. | Xem bảng dưới đây để tìm phần thông tin mô tả. | Đối tượng tùy chọn có thể chứa các thông tin sau: |
| -------------------------------------- | ---------------------------------------------- | ------------------------------------------------- |
| Tên                                    | type                                           | Mô tả                                             |
| data                                   | chuỗi                                          | Mã byte của hợp đồng.                             |

đối số

| Mảng               | (tùy chọn) Các đối số được chuyển đến hàm tạo khi triển khai. |
| ------------------ | -------------------------------------------------------------------------------- |
| **Giá trị trả về** | type Mô tả                                                                       |

đối tượng

| Một đối tượng trong đó các đối số và hàm để phân phối hợp đồng được xác định. | Xem bảng dưới đây để tìm phần thông tin mô tả.                                   | Đối tượng chứa các mục sau:                                                                                       |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Tên                                                                           | Loại                                                                            | Mô tả                                                                                                             |
| đối số                                                                        | Mảng                                                                             | Các đối số được chuyển vào `options.arguments`. [send](caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt)    |
| hàm                                                                           | Hàm sẽ triển khai hợp đồng đến Klaytn.                                           | Promise là kết quả của hàm sẽ được xử lý với phiên bản hợp đồng mới. [sign](#methods-methodname-signasfeepayer)   |
| hàm                                                                           | Hàm sẽ ký giao dịch triển khai hợp đồng thông minh với tư cách là người gửi.     | Hàm ký sẽ trả về giao dịch đã ký. [signAsFeePayer](#methods-methodname-estimategas)                               |
| hàm                                                                           | Hàm sẽ ký giao dịch triển khai hợp đồng thông minh với tư cách là người trả phí. | Hàm signAsFeePayer sẽ trả về giao dịch đã ký. [estimateGas](#methods-methodname-encodeabi)                        |
| hàm                                                                           | Hàm sẽ ước tính lượng gas sử dụng cho việc triển khai.                           | Việc thực thi hàm này không triển khai hợp đồng. [encodeABI](./caver-transaction/basic.md#smartcontractexecution) |

hàm

Hàm mã hóa ABI của quá trình triển khai là dữ liệu hợp đồng + tham số hàm tạo.

```javascript
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My string']
  })
  .send({
      from: '0x1234567890123456789012345678901234567891',
      gas: 1500000,
      value: 0,
  }, function(error, transactionHash) { ... })
  .on('error', function(error) { ... })
  .on('transactionHash', function(transactionHash) { ... })
  .on('receipt', function(receipt) {
     console.log(receipt.contractAddress) // contains the new contract address
   })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address) // instance with the new contract address
  })

// When the data is already set as an option to the contract itself
> myContract.options.data = '0x12345...'

> myContract.deploy({
        arguments: [123, 'My string']
  })
  .send({
      from: '0x1234567890123456789012345678901234567891',
      gas: 1500000,
      value: 0,
  })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address) // instance with the new contract address
  })

// Simply encoding
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My string']
  })
  .encodeABI()
'0x12345...0000012345678765432'

// Gas estimation
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My string']
  })
  .estimateGas(function(err, gas) {
      console.log(gas)
  })
```

## Việc thực thi hàm này không triển khai hợp đồng.

```javascript
myContract.send(options, methodName [, param1 [, param2 [, ...]]])
```

**LƯU Ý** `myContract.deploy({ data, arguments }).sign(options)` và `myContract.deploy({ data, arguments }).signAsFeePayer(options)` được hỗ trợ kể từ caver-js phiên bản [v1.6.1](#mycontract-deploy). **Ví dụ**

myContract.send <a href="#mycontract-send" id="mycontract-send"></a> Gửi một giao dịch để thực hiện hàm của hợp đồng thông minh.

- Điều này có thể thay đổi trạng thái hợp đồng thông minh.
- Loại giao dịch được sử dụng cho hàm này tùy thuộc vào `options` hoặc giá trị được xác định trong `myContract.options`.
- Nếu bạn muốn sử dụng giao dịch có phí ủy thác thông qua `myContract.send` thì phải đặt `feeDelegation` và `feePayer` đúng cách.
- `feeDelegation` không được xác định hoặc được xác định là `false`: [SmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)

`feeDelegation` được xác định là `true` nhưng `feePayer` không được xác định : Thông báo lỗi.

`feeDelegation` được xác định là `true` và `feePayer` được xác định nhưng `feeRatio` không được xác định: [FeeDelegatedSmartContractExecution](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

`feeDelegation` được xác định là `true` và `feePayer` và `feeRatio` được xác định: [FeeDelegatedSmartContractExecutionWithRatio](#methods-methodname-send)

| **LƯU Ý** `caver.wallet` phải chứa các đối tượng keyring tương ứng với `from` và `feePayer` trong `options` hoặc `myContract.options` để tạo chữ ký. | **LƯU Ý** `myContract.send` được hỗ trợ kể từ caver-js phiên bản [v1.6.1](#mycontract-deploy). | **Tham số**                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Tên                                                                                                                                                  | Loại                                                                                          | Mô tả tùy chọn                                                                                                     |
| đối tượng                                                                                                                                            | Các tùy chọn được sử dụng để gửi.                                                              | Xem bảng trong [methods.methodName.send](caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) để biết chi tiết. |
| methodName                                                                                                                                           | chuỗi                                                                                          | Tên phương pháp của hàm hợp đồng để thực thi.                                                                      |

Tham số

Hỗn hợp

| (tùy chọn) Các tham số được chuyển đến hàm hợp đồng thông minh. | **Giá trị trả về**     |
| ---------------------------------------------------------------------------------- | ---------------------- |
| `Promise` trả về `PromiEvent`                                                      | Loại Mô tả PromiEvent |

Trình phát sự kiện kết hợp promise.

- Nó sẽ được xử lý khi có biên lai giao dịch. Promise sẽ được xử lý với phiên bản hợp đồng mới.
- Đối với PromiEvent, sẽ có các sự kiện sau đây: `transactionHash`: Nó được kích hoạt ngay sau khi giao dịch được gửi và có sẵn hàm băm giao dịch. Loại của nó là `string`.
- `receipt`: Nó được kích hoạt khi có sẵn biên lai giao dịch. Xem [caver.rpc.klay.getTransactionReceipt](#methods-methodname-send) để biết thêm chi tiết. Loại của nó là `object`.

`error`: Nó được kích hoạt nếu xảy ra lỗi trong khi gửi.

```javascript
// Send a SmartContractExecution and use the promise
> myContract.send({ from: '0x{address in hex}', gas: 1000000 }, 'methodName', 123).then(console.log)
{
  blockHash: '0x294202dcd1d3c422880e2a209b9cd70ce7036300536c78ab74130c5717cb90da',
  blockNumber: 16342,
  contractAddress: null,
  from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  gas: '0xf4240',
  gasPrice: '0x5d21dba00',
  gasUsed: 47411,
  input: '0x983b2...',
  logsBloom: '0x00800...',
  nonce: '0x1cd',
  senderTxHash: '0xe3f50d2bab2c462ef99379860d2b634d85a0c9fba4e2b189daf1d96bd4bbf8ff',
  signatures: [ { V: '0x4e43', R: '0x2ba27...', S: '0x50d37...' } ],
  status: true,
  to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  transactionHash: '0xe3f50d2bab2c462ef99379860d2b634d85a0c9fba4e2b189daf1d96bd4bbf8ff',
  transactionIndex: 0,
  type: 'TxTypeSmartContractExecution',
  typeInt: 48,
  value: '0x0',
  events: {...}
}

// Send a SmartContractExecution and use the event emitter
> myContract.send({ from: '0x{address in hex}', gas: 1000000 }, 'methodName', 123)
  .on('transactionHash', function(hash) {
    ...
  })
  .on('receipt', function(receipt) {
    console.log(receipt)
  })
  .on('error', console.error)

// Send a FeeDelegatedSmartContractExecution
> myContract.send({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
    feePayer: '0x{address in hex}',
  }, 'methodName', 123).then(console.log)
{
  blockHash: '0x149e36f279577c306fccb9779a0274e802501c32f7054c951f592778bd5c168a',
  blockNumber: 16458,
  contractAddress: null,
  feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  feePayerSignatures: [ { V: '0x4e43', R: '0x48c28...', S: '0x18413...' } ],
  from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  gas: '0xf4240',
  gasPrice: '0x5d21dba00',
  gasUsed: 57411,
  input: '0x983b2d5600000000000000000000000022bb89bd35e7b12bd25bea4165cf0f9330032f8c',
  logsBloom: '0x00800...',
  nonce: '0x1f5',
  senderTxHash: '0x5b06ca5046229e066c11dfc0c74fcbc98509294370981f9b142378a8f2bd5fe8',
  signatures: [ { V: '0x4e44', R: '0xfb707...', S: '0x641c6...' } ],
  status: true,
  to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  transactionHash: '0x0e04be479ad06ec87acbf49abd44f16a56390c736f0a7354860ebc7fc0f92e13',
  transactionIndex: 1,
  type: 'TxTypeFeeDelegatedSmartContractExecution',
  typeInt: 49,
  value: '0x0',
  events: {...}
}

// Send a FeeDelegatedSmartContractExecutionWithRatio
> myContract.send({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
    feePayer: '0x{address in hex}',
    feeRatio: 30,
  }, 'methodName', 123).then(console.log)
{
  blockHash: '0x8f0a0137cf7e0fea503c818910140246437db36121871bc54b2ebc688873b3f3',
  blockNumber: 16539,
  contractAddress: null,
  feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  feePayerSignatures: [ { V: '0x4e43', R: '0x80db0...', S: '0xf8c7c...' } ],
  feeRatio: '0x1e',
  from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  gas: '0xf4240',
  gasPrice: '0x5d21dba00',
  gasUsed: 62411,
  input: '0x983b2d560000000000000000000000007ad1a538041fa3ba1a721f87203cb1a3822b8eaa',
  logsBloom: '0x00800...',
  nonce: '0x219',
  senderTxHash: '0x14c7b674a0e253b31c85c7be8cbfe4bf9d86e66e940fcae34b854e25eab1ce15',
  signatures: [ { V: '0x4e43', R: '0xd57ef...', S: '0xe14f3...' } ],
  status: true,
  to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  transactionHash: '0xfbf00ec189aeb0941d554384f1660ffdac7768b3af2bb1526bcb3983215c1183',
  transactionIndex: 0,
  type: 'TxTypeFeeDelegatedSmartContractExecutionWithRatio',
  typeInt: 50,
  value: '0x0',
  events: {...}
}
```

## Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

```javascript
myContract.sign(options, methodName [, param1 [, param2 [, ...]]])
```

Loại của nó là `Error`.

**Ví dụ** myContract.sign <a href="#mycontract-sign" id="mycontract-sign"></a>

Ký một giao dịch hợp đồng thông minh với tư cách là người gửi để triển khai hợp đồng thông minh hoặc thực thi hàm của hợp đồng thông minh. Nếu hợp đồng thông minh được triển khai, 'constructor' có thể được nhập vào methodName, chẳng hạn như `myContract.sign({ from, ... }, 'constructor', byteCode, ...)`.

- Loại giao dịch được sử dụng cho hàm này tùy thuộc vào `options` hoặc giá trị được xác định trong `myContract.options`.
- Nếu bạn muốn sử dụng giao dịch có phí ủy thác thông qua `myContract.sign` thì `feeDelegation` phải được xác định là `true`.
- `feeDelegation` không được xác định hoặc được xác định là `false`: [SmartContractDeploy](./caver-transaction/basic.md#smartcontractexecution) / [SmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)

`feeDelegation` được xác định là `true` nhưng `feeRatio` không được xác định: [FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution) / [FeeDelegatedSmartContractExecution](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

`feeDelegation` được xác định là `true` và `feeRatio` được xác định: [FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio) / [FeeDelegatedSmartContractExecutionWithRatio](#methods-methodname-send)

**LƯU Ý** `caver.wallet` phải chứa các đối tượng keyring tương ứng với `from` trong `options` hoặc `myContract.options` để tạo chữ ký.

| **LƯU Ý** `myContract.sign` được hỗ trợ kể từ caver-js phiên bản [v1.6.1](#mycontract-deploy). | **Tham số**                                                                                                               | Tên                |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| type                                                                                           | Mô tả                                                                                                                     | tùy chọn đối tượng |
| Các tùy chọn được sử dụng để gửi.                                                              | Xem bảng trong [methods.methodName.send](caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) để biết chi tiết.        | methodName chuỗi   |
| Tên phương pháp của hàm hợp đồng để thực thi.                                                  | Nếu bạn muốn ký một giao dịch để triển khai hợp đồng thông minh, hãy sử dụng chuỗi 'constructor' thay vì tên phương pháp. | Tham số Hỗn hợp    |

(tùy chọn) Các tham số được chuyển đến hàm hợp đồng thông minh.

Nếu bạn muốn ký một giao dịch triển khai hợp đồng thông minh, hãy thông qua byteCode và các tham số hàm tạo.

**Giá trị trả về**

```javascript
// Sign a SmartContractDeploy
> myContract.sign({ from: '0x{address in hex}', gas: 1000000 }, 'constructor', byteCode, 123).then(console.log)
SmartContractDeploy {
  _type: 'TxTypeSmartContractDeploy',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e43', _r: '0xeb6b5...', _s: '0x5e4f9...' } ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2a5'
}

// Sign a FeeDelegatedSmartContractDeploy
> myContract.sign({ from: '0x{address in hex}', feeDelegation: true, gas: 1000000 }, 'constructor', byteCode, 123).then(console.log)
FeeDelegatedSmartContractDeploy {
  _type: 'TxTypeFeeDelegatedSmartContractDeploy',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e43', _r: '0xee0f5...', _s: '0x31cbf...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x320'
}

// Sign a FeeDelegatedSmartContractDeployWithRatio
> myContract.sign({ from: keyring.address, feeDelegation: true, feeRatio: 30, gas: 1000000 }, 'constructor', byteCode, 123).then(console.log)
FeeDelegatedSmartContractDeployWithRatio {
  _type: 'TxTypeFeeDelegatedSmartContractDeployWithRatio',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e44', _r: '0x4c2b0...', _s: '0x47df8...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feeRatio: '0x1e',
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x306'
}

// Sign a SmartContractExecution
> myContract.sign({ from: '0x{address in hex}', gas: 1000000 }, 'methodName', 123).then(console.log)
SmartContractExecution {
  _type: 'TxTypeSmartContractExecution',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e44', _r: '0xb2846...', _s: '0x422c1...' } ],
  _to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  _value: '0x0',
  _input: '0x983b2...',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x23b'
}

// Sign a FeeDelegatedSmartContractExecution
> myContract.sign({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
  }, 'methodName', 123).then(console.log)
FeeDelegatedSmartContractExecution {
  _type: 'TxTypeFeeDelegatedSmartContractExecution',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e43', _r: '0xf7676...', _s: '0x42673...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  _value: '0x0',
  _input: '0x983b2...',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x254'
}

// Sign a FeeDelegatedSmartContractExecutionWithRatio
> myContract.sign({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
    feeRatio: 30,
  }, 'methodName', 123).then(console.log)
FeeDelegatedSmartContractExecutionWithRatio {
  _type: 'TxTypeFeeDelegatedSmartContractExecutionWithRatio',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x4e44', _r: '0x58b06...', _s: '0x637ff...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feeRatio: '0x1e',
  _to: '0x361870b50834a6afc3358e81a3f7f1b1eb9c7e55',
  _value: '0x0',
  _input: '0x983b2...',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x262'
}
```

## `Promise` trả về [Giao dịch](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) - Giao dịch hợp đồng thông minh đã ký.

```javascript
myContract.signAsFeePayer(options, methodName [, param1 [, param2 [, ...]]])
```

**Ví dụ**

myContract.signAsFeePayer <a href="#mycontract-signasfeepayer" id="mycontract-signasfeepayer"></a> Ký một giao dịch hợp đồng thông minh với tư cách là người trả phí để triển khai hợp đồng thông minh hoặc thực thi hàm của hợp đồng thông minh.

Nếu hợp đồng thông minh được triển khai, 'constructor' có thể được nhập vào methodName, chẳng hạn như `myContract.signAsFeePayer({ from, feeDelegation: true, feePayer, ... }, 'constructor', byteCode, ...)`. Loại giao dịch được sử dụng cho hàm này tùy thuộc vào `options` hoặc giá trị được xác định trong `myContract.options`. `signAsFeePayer` là một hàm ký với tư cách là người trả phí giao dịch nên trường `feeDelegation` phải được xác định là `true`.

- Ngoài ra, địa chỉ của người trả phí phải được xác định trong trường `feePayer`.
- `feeDelegation` không được xác định : Thông báo lỗi.
- `feeDelegation` được xác định nhưng `feePayer` không được xác định : Thông báo lỗi.
- `feeDelegation` được xác định là `true` và `feePayer` được xác định nhưng `feeRatio` không được xác định: [FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution) / [FeeDelegatedSmartContractExecution](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

`feeDelegation` được xác định là `true` và `feePayer` và `feeRatio` được xác định: [FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio) / [FeeDelegatedSmartContractExecutionWithRatio](#methods-methodname-send)

**LƯU Ý** `caver.wallet` phải chứa các đối tượng keyring tương ứng với `feePayer` trong `options` hoặc `myContract.options` để tạo chữ ký.

**LƯU Ý** `myContract.signAsFeePayer` được hỗ trợ kể từ caver-js phiên bản [v1.6.1](#mycontract-deploy).

| **Tham số**                                                                                                               | Tên        | type                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------ |
| Mô tả                                                                                                                     | tùy chọn   | đối tượng Các tùy chọn được sử dụng để gửi.                                                |
| Xem bảng trong [methods.methodName.send](caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) để biết chi tiết.        | methodName | chuỗi Tên phương pháp của hàm hợp đồng để thực thi.                                        |
| Nếu bạn muốn ký một giao dịch để triển khai hợp đồng thông minh, hãy sử dụng chuỗi 'constructor' thay vì tên phương pháp. | Tham số    | Hỗn hợp (tùy chọn) Các tham số được chuyển đến hàm hợp đồng thông minh. |

Nếu bạn muốn ký một giao dịch triển khai hợp đồng thông minh, hãy thông qua byteCode và các tham số hàm tạo.

**Giá trị trả về**

`Promise` trả về [Giao dịch](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) - Giao dịch hợp đồng thông minh đã ký.

```javascript
// Sign a FeeDelegatedSmartContractDeploy
> myContract.signAsFeePayer({ from: '0x{address in hex}', feeDelegation: true, feePayer: '0x{address in hex}', gas: 1000000 }, 'constructor', byteCode, 123).then(console.log)
FeeDelegatedSmartContractDeploy {
  _type: 'TxTypeFeeDelegatedSmartContractDeploy',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _feePayerSignatures: [ SignatureData { _v: '0x4e43', _r: '0xe0641...', _s: '0x1d21e...' } ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x32a'
}

// Sign a FeeDelegatedSmartContractDeployWithRatio
> myContract.signAsFeePayer({ from: keyring.address, feeDelegation: true, feePayer: '0x{address in hex}', feeRatio: 30, gas: 1000000 }, 'constructor', byteCode, 123).then(console.log)
FeeDelegatedSmartContractDeployWithRatio {
  _type: 'TxTypeFeeDelegatedSmartContractDeployWithRatio',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _feePayerSignatures: [ SignatureData { _v: '0x4e44', _r: '0x307bd...', _s: '0x75110...' } ],
  _feeRatio: '0x1e',
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x359'
}

// Sign a FeeDelegatedSmartContractExecution
> myContract.signAsFeePayer({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
    feePayer: '0x{address in hex}',
  }, 'methodName', 123).then(console.log)
FeeDelegatedSmartContractExecution {
  _type: 'TxTypeFeeDelegatedSmartContractExecution',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _feePayerSignatures: [ SignatureData { _v: '0x4e43', _r: '0xc58ba...', _s: '0x76fdb...' } ],
  _to: '0x4a9d979707aede18fa674711f3b2fe110fac4e7e',
  _value: '0x0',
  _input: '0x983b2...',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x36c'
}

// Sign a FeeDelegatedSmartContractExecutionWithRatio
> myContract.signAsFeePayer({
    from: '0x{address in hex}',
    gas: 1000000,
    feeDelegation: true,
    feePayer: '0x{address in hex}',
    feeRatio: 30,
  }, 'methodName', 123).then(console.log)
FeeDelegatedSmartContractExecutionWithRatio {
  _type: 'TxTypeFeeDelegatedSmartContractExecutionWithRatio',
  _from: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x69c3a6e3485446118d8081063dcef2e65b69ae91',
  _feePayerSignatures: [ SignatureData { _v: '0x4e44', _r: '0xeb78d...', _s: '0x2864d...' } ],
  _feeRatio: '0x1e',
  _to: '0x4a9d979707aede18fa674711f3b2fe110fac4e7e',
  _value: '0x0',
  _input: '0x983b2...',
  _chainId: '0x2710',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x37b'
}
```

## **Ví dụ**

```javascript
myContract.call('methodName', [param1 [, param2 [, ...]]])
myContract.call(options, 'methodName', [param1 [, param2 [, ...]]])
```

myContract.call <a href="#mycontract-call" id="mycontract-call"></a> Sẽ gọi một phương pháp hằng số và thực thi phương pháp hợp đồng thông minh của nó trong Máy ảo Klaytn mà không gửi bất kỳ giao dịch nào.

Lưu ý rằng việc gọi không thể thay đổi trạng thái hợp đồng thông minh.

**LƯU Ý** `myContract.call` được hỗ trợ kể từ caver-js phiên bản [v1.6.1](#mycontract-deploy).

| **Tham số**                                                                          | Tên        | Loại                                                             |
| ------------------------------------------------------------------------------------ | ---------- | ----------------------------------------------------------------- |
| Mô tả                                                                                | tùy chọn   | đối tượng (tùy chọn) Các tùy chọn dùng để gọi. |
| Xem bảng trong [methods.methodName.call](#methods-methodname-call) để biết chi tiết. | methodName | chuỗi                                                             |
| Tên phương pháp của hàm hợp đồng để gọi.                                             | Tham số    | Hỗn hợp                                                           |

(tùy chọn) Các tham số được chuyển đến hàm hợp đồng thông minh.

**Giá trị trả về** `Promise` trả về `Mixed` - (Các) giá trị trả về của phương pháp hợp đồng thông minh. Nếu trả về một giá trị duy nhất, nó sẽ được trả về như cũ.

Nếu nó có nhiều giá trị trả về, nó sẽ trả về một đối tượng có thuộc tính và chỉ số.

```javascript
> myContract.call('methodName').then(console.log)
Jasmine

> myContract.call({ from: '0x{address in hex}' }, 'methodName', 123).then(console.log)
Test Result
```

## **Ví dụ**

```javascript
myContract.decodeFunctionCall(functionCall)
```

myContract.decodeFunctionCall <a href="#mycontract-decodefunctioncall" id="mycontract-decodefunctioncall"></a>

Giải mã lệnh gọi hàm và trả về tham số.

**LƯU Ý** `myContract.decodeFunctionCall` được hỗ trợ kể từ caver-js phiên bản [v1.6.3](#methods-methodname-call).

| **Tham số** | Tên          | Loại |
| ----------- | ------------ | ----- |
| Mô tả       | functionCall | chuỗi |

Chuỗi lệnh gọi hàm được mã hóa.

| **Giá trị trả về** | Loại                                                 |
| ------------------ | ----------------------------------------------------- |
| Mô tả              | đối tượng Một đối tượng bao gồm các tham số đơn giản. |

Bạn có thể sử dụng `result[0]` được cung cấp để có thể truy cập giống như một mảng theo thứ tự của các tham số.

```javascript
// The myContract variable is instantiated with the below abi.
// [
//   {
//     constant: true,
//     inputs: [{ name: 'key', type: 'string' }],
//     name: 'get',
//     outputs: [{ name: '', type: 'string' }],
//     payable: false,
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     constant: false,
//     inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
//     name: 'set',
//     outputs: [],
//     payable: false,
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
// ]
> myContract.decodeFunctionCall('0xe942b5160000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000036b65790000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000576616c7565000000000000000000000000000000000000000000000000000000')
Result {
  '0': '2345675643',
  '1': 'Hello!%',
  __length__: 2,
  myNumber: '2345675643',
  mystring: 'Hello!%'
}
```

## **Ví dụ**

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]])
myContract.methods['methodName']([param1 [, param2 [, ...]]])
```

myContract.methods <a href="#mycontract-methods" id="mycontract-methods"></a>

Tạo một đối tượng giao dịch cho phương pháp đó, sau đó có thể gọi, gửi, ước tính hoặc mã hóa dưới dạng ABI.

- Các phương pháp của hợp đồng thông minh này có sẵn thông qua:
- Tên phương pháp: `myContract.methods.methodName(123)` hoặc `myContract.methods[methodName](#methods-methodname-call)`
- Nguyên mẫu phương pháp: `myContract.methods['methodName(uint256)'](#methods-methodname-call)`

Chữ ký phương pháp: `myContract.methods['0x58cf5f10'](#methods-methodname-call)`

## Điều này cho phép gọi các hàm có cùng tên nhưng khác tham số từ phiên bản hợp đồng JavaScript.

cf) \*function signature (function selector) <a href="#cf-function-signature-function-selector" id="cf-function-signature-function-selector"></a>
It is the first (left, high-order in big-endian) four bytes of the Keccak-256 (SHA-3) hash of the signature of the function.

Bốn byte đầu tiên của dữ liệu lệnh gọi cho lệnh gọi hàm chỉ định chức năng sẽ được gọi.\
Đây là bốn byte đầu tiên (left, high-order in big-endian) của hàm băm Keccak-256 (SHA-3) của chữ ký của hàm.
`1. caver.abi.encodefunctionSignature('funcName(paramType1,paramType2,...)')`\
`2. caver.utils.sha3('funcName(paramType1,paramType2,...)').substr(0, 10)`

Chữ ký hàm có thể được cung cấp thông qua 2 phương pháp khác nhau.\
`1. caver.abi.encodefunctionSignature('funcName(paramType1,paramType2,...)')`\
`2. caver.utils.sha3('funcName(paramType1,paramType2,...)').substr(0, 10)`

```javascript
caver.abi.encodefunctionSignature('methodName(uint256)')
> 0x58cf5f10

caver.utils.sha3('methodName(uint256)').substr(0, 10)
> 0x58cf5f10
```

ex)

**Tham số**

Các tham số của bất kỳ phương pháp nào thuộc về hợp đồng thông minh này, được xác định trong giao diện JSON.

**Giá trị trả về**

| `Promise` trả về `object` - Một đối tượng trong đó các đối số và hàm để thực thi hợp đồng được xác định. | :                                                                                                                                                                                                   | Tên                                                                  |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Loại                                                                                                    | Mô tả                                                                                                                                                                                               | đối số                                                               |
| Mảng                                                                                                     | Các đối số được đưa vào phương pháp này.                                                                                                                                                            | [call](#methods-methodname-call)                                     |
| hàm                                                                                                      | Hàm sẽ gọi và thực thi một phương pháp không đổi trong hợp đồng thông minh của nó trên Máy ảo Klaytn mà không gửi giao dịch (không thể thay đổi trạng thái hợp đồng thông minh). | [send](caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt)       |
| hàm                                                                                                      | Hàm sẽ gửi giao dịch đến Klaytn và thực hiện phương pháp của nó (có thể thay đổi trạng thái hợp đồng thông minh).                                                                | [sign](#methods-methodname-signasfeepayer) hàm                       |
| Hàm sẽ ký một giao dịch với tư cách là người gửi.                                                        | Hàm ký sẽ trả về giao dịch đã ký.                                                                                                                                                                   | [signAsFeePayer](#methods-methodname-estimategas) hàm                |
| Hàm sẽ ký một giao dịch với tư cách là người trả phí.                                                    | Hàm signAsFeePayer sẽ trả về giao dịch đã ký.                                                                                                                                                       | [estimateGas](#methods-methodname-encodeabi)                         |
| hàm                                                                                                      | Hàm đó sẽ ước tính lượng gas dùng để thực thi.                                                                                                                                                      | [encodeABI](./caver-transaction/basic.md#smartcontractexecution) hàm |

Hàm mã hóa ABI cho phương pháp này.

Nó có thể được gửi bằng cách sử dụng một giao dịch, gọi phương pháp hoặc chuyển sang một phương pháp hợp đồng thông minh khác làm đối số của nó.

```javascript
// Calling a method
> myContract.methods.methodName(123).call({ ... }, function(error, result) { ... })
> myContract.methods.methodName(123).call({ ... }).then((result) => { ... })

// Sending basic transaction and using the promise
> myContract.methods.methodName(123).send({
    from: '0x{address in hex}',
    ...
  }).then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  })

// Sending basic transaction and using the eventEmitter
> myContract.methods.methodName(123).send({
    from: '0x{address in hex}',
    ...
  }).on('transactionHash', function(hash) {
      ...
  })
  .on('receipt', function(receipt) {
      ...
  })
  .on('error', console.error)

// Sending fee delegation transaction and using the promise
> myContract.methods.methodName(123).send({
    from: '0x{address in hex}',
    feePayer: '0x{fee-payer address}',
    feeDelegation: true,f
    ...
  }).then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  })

// Sending partial fee delegation transaction and using the promise
> myContract.methods.methodName(123).send({
    from: '0x{address in hex}',
    feePayer: '0x{fee-payer address}',
    feeDelegation: true,
    feeRatio: 30,
    ...
  }).then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  })

// sign the basic transaction
> myContract.methods.methodName(123).sign({
    from: '0x{address in hex}',
    feeDelegation: true,
    ...
  }).then(function(signedTx) { ... })

// sign the fee delegation transaction
> myContract.methods.methodName(123).sign({
    from: '0x{address in hex}',
    feeDelegation: true,
    ...
  }).then(function(signedTx) { ... })

// sign the partial fee delegation transaction
> myContract.methods.methodName(123).sign({
    from: '0x{address in hex}',
    feeDelegation: true,
    feeRatio: 30,
    ...
  }).then(function(signedTx) { ... })

// sign the fee delegation transaction as a fee payer
> myContract.methods.methodName(123).signAsFeePayer({
    from: '0x{address in hex}',
    feePayer: '0x{fee-payer address}',
    feeDelegation: true,
    ...
  }).then(function(signedTx) { ... })

// sign the partial fee delegation transaction as a fee payer
> myContract.methods.methodName(123).signAsFeePayer({
    from: '0x{address in hex}',
    feePayer: '0x{fee-payer address}',
    feeDelegation: true,
    feeRatio: 30,
    ...
  }).then(function(signedTx) { ... })
```

## **LƯU Ý** `sign` và `signAsFeePayer` được hỗ trợ kể từ caver-js phiên bản [v1.6.1](#mycontract-deploy).

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).call(options [, callback])
myContract.methods['methodName']([param1 [, param2 [, ...]]]).call(options [, callback])
```

**Ví dụ** methods.methodName.call <a href="#methods-methodname-call" id="methods-methodname-call"></a> Sẽ gọi một phương pháp hằng số và thực thi phương pháp hợp đồng thông minh của nó trong Máy ảo Klaytn mà không gửi bất kỳ giao dịch nào.

Lưu ý rằng việc gọi không thể thay đổi trạng thái hợp đồng thông minh.

| Bạn nên sử dụng [myContract.call](#mycontract-send) được cung cấp dưới dạng hàm rút gọn. | **Tham số**                                   | Tên                |
| ---------------------------------------------------------------------------------------- | --------------------------------------------- | ------------------ |
| Loại                                                                                    | Mô tả                                         | tùy chọn đối tượng |
| (tùy chọn) Các tùy chọn dùng để gọi.                                  | Xem bảng dưới đây để biết thông tin chi tiết. | callback           |

hàm

| (tùy chọn) Lệnh gọi lại này sẽ được kích hoạt với kết quả thực thi phương pháp hợp đồng thông minh làm đối số thứ hai hoặc với một đối tượng lỗi làm đối số đầu tiên. | Đối tượng tùy chọn có thể chứa các thông tin sau:                                              | Tên     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------- |
| type                                                                                                                                                                                     | Mô tả                                                                                          | từ      |
| chuỗi                                                                                                                                                                                    | (tùy chọn) Địa chỉ mà các phương pháp hợp đồng gọi sẽ được thực hiện từ đó. | giá gas |
| chuỗi                                                                                                                                                                                    | (tùy chọn) Giá gas tính bằng peb để sử dụng cho lệnh gọi này.               | gas     |

số

(tùy chọn) Lượng gas tối đa được cung cấp cho lệnh gọi này (giới hạn gas). **Giá trị trả về** `Promise` trả về `Mixed` - (Các) giá trị trả về của phương pháp hợp đồng thông minh.

Nếu trả về một giá trị duy nhất, nó sẽ được trả về như cũ.

```javascript
// using the promise
> myContract.methods.methodName(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(result) {
      ...
  })
```

```solidity
// Solidity: MULTIPLE RETURN VALUES
contract MyContract {
    function myFunction() public returns(uint256 myNumber, string memory myString) {
        return (23456, "Hello!%");
    }
}
```

```javascript
> var MyContract = new caver.contract(abi, address)
> MyContract.methods.myfunction().call().then(console.log)
Result {
      mynumber: '23456',
      mystring: 'Hello!%',
      0: '23456',
      1: 'Hello!%'
}
```

```solidity
// Solidity: SINGLE RETURN VALUE
contract MyContract {
    function myfunction() public returns(string memory mystring) {
        return "Hello!%";
    }
}
```

```javascript
> var MyContract = new caver.contract(abi, address)
> MyContract.methods.myfunction().call().then(console.log)
"Hello!%"
```

## Nếu nó có nhiều giá trị trả về, nó sẽ trả về một đối tượng có thuộc tính và chỉ số.

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).send(options [, callback])
myContract.methods['methodName']([param1 [, param2 [, ...]]]).send(options [, callback])
```

**Ví dụ** methods.methodName.send <a href="#methods-methodname-send" id="methods-methodname-send"></a> Sẽ gửi một giao dịch để triển khai hợp đồng thông minh hoặc thực hiện hàm của hợp đồng thông minh.

Điều này có thể thay đổi trạng thái hợp đồng thông minh.

Bạn nên sử dụng [myContract.send](#mycontract-deploy2) được cung cấp dưới dạng hàm rút gọn. Nếu hợp đồng thông minh được triển khai, 'constructor' có thể được nhập vào methodName như `myContract.methods.constructor` hoặc `myContract.methods['constructor']`, tuy nhiên nên sử dụng hàm [myContract.deploy](./caver-transaction/basic.md#smartcontractdeploy).

- Loại giao dịch được sử dụng cho hàm này tùy thuộc vào `options` hoặc giá trị được xác định trong `myContract.options`.
- Nếu bạn muốn sử dụng giao dịch có phí ủy thác thông qua `methods.methodName.send` thì phải đặt `feeDelegation` và `feePayer` đúng cách.
- `feeDelegation` không được xác định hoặc được xác định là `false`: [SmartContractDeploy](./caver-transaction/basic.md#smartcontractexecution) / [SmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)
- `feeDelegation` được xác định là `true` nhưng `feePayer` không được xác định : Thông báo lỗi.

`feeDelegation` được xác định là `true` và `feePayer` được xác định nhưng `feeRatio` không được xác định: [FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution) / [FeeDelegatedSmartContractExecution](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

`feeDelegation` được xác định là `true` và `feePayer` và `feeRatio` được xác định: [FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio) / [FeeDelegatedSmartContractExecutionWithRatio](#methods-methodname-send)

| **LƯU Ý** `caver.wallet` phải chứa các đối tượng keyring tương ứng với `from` và `feePayer` trong `options` hoặc `myContract.options` để tạo chữ ký. | **Tham số**                                   | Tên                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ------------------ |
| type                                                                                                                                                 | Mô tả                                         | tùy chọn đối tượng |
| Các tùy chọn được sử dụng để gửi.                                                                                                                    | Xem bảng dưới đây để biết thông tin chi tiết. | callback           |

hàm

| (tùy chọn) Lệnh gọi lại này sẽ được kích hoạt trước với "transactionHash" hoặc với một đối tượng lỗi làm đối số đầu tiên. | Đối tượng tùy chọn có thể chứa các thông tin sau:                                                                     | Tên                                                                                                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Loại                                                                                                                                        | Mô tả                                                                                                                 | từ chuỗi                                                                                                                                                                                                                                                    |
| Địa chỉ mà từ đó giao dịch sẽ được gửi.                                                                                                      | Nếu bỏ qua, `myContract.options.from` sẽ được sử dụng.                                                                | gas                                                                                                                                                                                                                                                         |
| số                                                                                                                                           | Lượng gas tối đa được cung cấp cho giao dịch này (giới hạn gas).                                   | giá gas                                                                                                                                                                                                                                                     |
| chuỗi                                                                                                                                        | (tùy chọn) Giá gas tính bằng peb để sử dụng cho giao dịch này.                                     | giá trị                                                                                                                                                                                                                                                     |
| số \| chuỗi \| BN \| Bignumber                                                                                                               | (tùy chọn) Giá trị bằng peb sẽ được chuyển đến địa chỉ của hợp đồng thông minh bằng giao dịch này. | feeDelegation boolean                                                                                                                                                                                                                                       |
| (tùy chọn, mặc định `sai`) Có sử dụng giao dịch ủy thác phí hay không.                                                    | Nếu bỏ qua, `myContract.options.feeDelegation` sẽ được sử dụng.                                                       | feePayer chuỗi (tùy chọn) Địa chỉ của người trả phí thanh toán phí giao dịch.                                                                                                                                                            |
| Khi `feeDelegation` là `đúng`, giá trị sẽ được đặt thành trường `feePayer` trong giao dịch.                                                  | Nếu bỏ qua, `myContract.options.feePayer` sẽ được sử dụng.                                                            | feeRatio chuỗi (tùy chọn) Tỷ lệ phí giao dịch mà người trả phí sẽ phải chịu. Nếu `feeDelegation` là `đúng` và `feeRatio` được đặt thành giá trị hợp lệ thì giao dịch ủy thác phí một phần sẽ được sử dụng. phí một phần sẽ được sử dụng. |

Khoảng hợp lệ là từ 1 đến 99.

Tỷ lệ không được phép bằng 0 hoặc bằng và cao hơn 100.

Nếu bỏ qua, `myContract.options.feeRatio` sẽ được sử dụng.

| **LƯU Ý** `feeDelegation`, `feePayer` và `feeRatio` được hỗ trợ kể từ phiên bản caver-js[v1.6.1](#mycontract-deploy). | tượng caver-js[v1.6.1](#mycontract-deploy). |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| **Giá trị trả về**                                                                                                    | `Promise` trả về `PromiEvent` Loại Mô tả   |

PromiEvent

- Trình phát sự kiện kết hợp promise. Nó sẽ được xử lý khi có biên lai giao dịch.
- Promise sẽ được xử lý với phiên bản hợp đồng mới. Đối với PromiEvent, sẽ có các sự kiện sau đây: `transactionHash`: Nó được kích hoạt ngay sau khi giao dịch được gửi và có sẵn hàm băm giao dịch.
- Loại của nó là `string`. `receipt`: Nó được kích hoạt khi có sẵn biên lai giao dịch. Xem [caver.rpc.klay.getTransactionReceipt](#methods-methodname-send) để biết thêm chi tiết.

Loại của nó là `object`.

```javascript
// using the promise
> myContract.methods.methodName(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  })


// using the event emitter
> myContract.methods.methodName(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .on('transactionHash', function(hash) {
    ...
  })
  .on('receipt', function(receipt) {
    console.log(receipt)
  })
  .on('error', console.error) // If there is an out-of-gas error, the second parameter is the receipt.

// receipt example
{
   "transactionHash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
   "transactionIndex": 0,
   "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
   "blocknumber": 3,
   "contractAddress": "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
   "gasUsed": 30234,
   "events": {
     "eventName": {
       returnValues: {
         myIndexedParam: 20,
         myOtherIndexedParam: '0x123456789...',
         myNonIndexParam: 'My string'
       },
       raw: {
         data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
         topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
       },
       event: 'eventName',
       signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
       logIndex: 0,
       transactionIndex: 0,
       transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
       blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
       blocknumber: 1234,
       address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
    },
    "MyOtherEvent": {
      ...
    },
    "MyMultipleEvent":[{...}, {...}] // If there are multiples of the same events, they will be in an array.
  }
}

// Deploy the contract
> myContract.methods.constructor('0x{byte code}', 123).send({ from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', gas: 1000000 })
> myContract.methods['constructor']('0x{byte code}', 123).send({ from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', gas: 1000000 })
```

## `error`: Nó được kích hoạt nếu xảy ra lỗi trong khi gửi.

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).sign(options)
myContract.methods['methodName']([param1 [, param2 [, ...]]]).sign(options)
```

Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai. Loại của nó là `Error`.

**Ví dụ**

methods.methodName.sign <a href="#methods-methodname-sign" id="methods-methodname-sign"></a> Ký một giao dịch hợp đồng thông minh với tư cách là người gửi để triển khai hợp đồng thông minh hoặc thực thi hàm của hợp đồng thông minh.

- Bạn nên sử dụng [myContract.sign](./caver-transaction/basic.md#smartcontractexecution) được cung cấp dưới dạng hàm rút gọn.
- Nếu một hợp đồng thông minh được triển khai, 'constructor' có thể được nhập vào methodName chẳng hạn như `myContract.methods.constructor` hoặc `myContract.methods['constructor']`.
- Loại giao dịch được sử dụng cho hàm này tùy thuộc vào `options` hoặc giá trị được xác định trong `myContract.options`.

Nếu bạn muốn sử dụng giao dịch có phí ủy thác thông qua `methods.methodName.sign` thì `feeDelegation` phải được xác định là `true`.

`feeDelegation` không được xác định hoặc được xác định là `false`: [SmartContractDeploy](./caver-transaction/basic.md#smartcontractexecution) / [SmartContractExecution](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution)

`feeDelegation` được xác định là `true` nhưng `feeRatio` không được xác định: [FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution) / [FeeDelegatedSmartContractExecution](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

| `feeDelegation` được xác định là `true` và `feeRatio` được xác định: [FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio) / [FeeDelegatedSmartContractExecutionWithRatio](#methods-methodname-send) | **LƯU Ý** `caver.wallet` phải chứa các đối tượng keyring tương ứng với `from` trong `options` hoặc `myContract.options` để tạo chữ ký. | **LƯU Ý** `methods.methodName.sign` được hỗ trợ kể từ caver-js phiên bản [v1.6.1](#mycontract-deploy). |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Tham số**                                                                                                                                                                                                                                                                          | Tên                                                                                                                                    | Loại Mô tả                                                                                            |

tùy chọn

đối tượng

Các tùy chọn dùng để tạo giao dịch.

```javascript
// Sign a SmartContractDeploy transaction
> myContract.methods.constructor(byteCode, 123).sign({ from: '0x{address in hex}', gas: 1000000 }).then(console.log)
SmartContractDeploy {
  _type: 'TxTypeSmartContractDeploy',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [
    SignatureData {
      _v: '0x07f6',
      _r: '0x26a05...',
      _s: '0x3e3e4...'
    }
  ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}
> myContract.methods['constructor'](byteCode, 123).sign({ from: '0x{address in hex}', gas: 1000000 }).then(console.log)

// Sign a FeeDelegatedSmartContractDeploy transaction
> myContract.methods.constructor(byteCode, 123).sign({ from: '0x{address in hex}', feeDelegation: true, gas: 1000000 }).then(console.log)
FeeDelegatedSmartContractDeploy {
  _type: 'TxTypeFeeDelegatedSmartContractDeploy',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x07f5', _r: '0xa74f7...', _s: '0x0991e...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}
> myContract.methods['constructor'](byteCode, 123).sign({ from: '0x{address in hex}', feeDelegation: true, gas: 1000000 }).then(console.log)

// Sign a SmartContractExecution transaction
> myContract.methods.methodName('0x...').sign({ from: '0x{address in hex}', gas: 1000000 }).then(console.log)
SmartContractExecution {
  _type: 'TxTypeSmartContractExecution',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x07f5', _r: '0xafbf9...', _s: '0x10ea0...' } ],
  _to: '0xbc6723431a57abcacc4016ae664ee778d313ca6e',
  _value: '0x0',
  _input: '0x983b2d5600000000000000000000000060498fefbf1705a3db8d7bb5c80d5238956343e5',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}

> myContract.methods['methodName']('0x...').sign({ from: '0x{address in hex}', gas: 1000000 }).then(console.log)

// Sign a FeeDelegatedSmartContractExecution transaction
> myContract.methods.methodName('0x...').sign({ from: '0x{address in hex}', feeDelegation: true, gas: 1000000 }).then(console.log)
FeeDelegatedSmartContractExecution {
  _type: 'TxTypeFeeDelegatedSmartContractExecution',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x07f6', _r: '0xdfc14...', _s: '0x38b9c...' } ],
  _feePayer: '0x0000000000000000000000000000000000000000',
  _feePayerSignatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _to: '0xbc6723431a57abcacc4016ae664ee778d313ca6e',
  _value: '0x0',
  _input: '0x983b2d5600000000000000000000000060498fefbf1705a3db8d7bb5c80d5238956343e5',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}
> myContract.methods['methodName']('0x...').sign({ from: '0x{address in hex}', feeDelegation: true, gas: 1000000 }).then(console.log)
```

## Xem bảng tham số trong [methods.methodName.send](caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) để biết chi tiết.

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).signAsFeePayer(options)
myContract.methods['methodName']([param1 [, param2 [, ...]]]).signAsFeePayer(options)
```

**Giá trị trả về** `Promise` trả về [Giao dịch](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) - Giao dịch hợp đồng thông minh đã ký.

**Ví dụ**

methods.methodName.signAsFeePayer <a href="#methods-methodname-signasfeepayer" id="methods-methodname-signasfeepayer"></a> Ký một giao dịch hợp đồng thông minh với tư cách là người trả phí để triển khai hợp đồng thông minh hoặc thực thi hàm của hợp đồng thông minh. Bạn nên sử dụng [myContract.signAsFeePayer](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution) được cung cấp dưới dạng hàm rút gọn.

- Nếu một hợp đồng thông minh được triển khai, 'constructor' có thể được nhập vào methodName chẳng hạn như `myContract.methods.constructor` hoặc `myContract.methods['constructor']`.
- Loại giao dịch được sử dụng cho hàm này tùy thuộc vào `options` hoặc giá trị được xác định trong `myContract.options`.
- `signAsFeePayer` là một hàm ký với tư cách là người trả phí giao dịch nên trường `feeDelegation` phải được xác định là `true`.
- Ngoài ra, địa chỉ của người trả phí phải được xác định trong trường `feePayer`.

`feeDelegation` không được xác định : Thông báo lỗi.

`feeDelegation` được xác định nhưng `feePayer` không được xác định : Thông báo lỗi.

`feeDelegation` được xác định là `true` và `feePayer` được xác định nhưng `feeRatio` không được xác định: [FeeDelegatedSmartContractDeploy](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution) / [FeeDelegatedSmartContractExecution](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio)

| `feeDelegation` được xác định là `true` và `feePayer` và `feeRatio` được xác định: [FeeDelegatedSmartContractDeployWithRatio](./caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio) / [FeeDelegatedSmartContractExecutionWithRatio](#methods-methodname-send) | **LƯU Ý** `caver.wallet` phải chứa các đối tượng keyring tương ứng với `feePayer` trong `options` hoặc `myContract.options` để tạo chữ ký. | **LƯU Ý** `methods.methodName.signAsFeePayer` được hỗ trợ kể từ caver-js phiên bản [v1.6.1](#mycontract-deploy). |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| **Tham số**                                                                                                                                                                                                                                                                                        | Tên                                                                                                                                        | Loại Mô tả                                                                                                      |

tùy chọn

đối tượng

Các tùy chọn dùng để tạo giao dịch.

```javascript
// Sign a FeeDelegatedSmartContractDeploy transaction
> myContract.methods.constructor(byteCode, 123).signAsFeePayer({ from: '0x{address in hex}', feeDelegation: true, feePayer: '0x{address in hex}', gas: 1000000 }).then(console.log)
> FeeDelegatedSmartContractDeploy {
  _type: 'TxTypeFeeDelegatedSmartContractDeploy',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _feePayerSignatures: [ SignatureData { _v: '0x07f6', _r: '0x2c385...', _s: '0x7fa79...' } ],
  _to: '0x',
  _value: '0x0',
  _input: '0x60806...',
  _humanReadable: false,
  _codeFormat: '0x0',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}
> myContract.methods['constructor'](byteCode, 123).signAsFeePayer({ from: '0x{address in hex}', feeDelegation: true, feePayer: '0x{address in hex}', gas: 1000000 }).then(console.log)

// Sign a FeeDelegatedSmartContractExecution transaction
> myContract.methods.methodName(123).signAsFeePayer({ from: '0x{address in hex}', feeDelegation: true, feePayer: '0x{address in hex}', gas: 1000000 }).then(console.log)
> FeeDelegatedSmartContractExecution {
  _type: 'TxTypeFeeDelegatedSmartContractExecution',
  _from: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _gas: '0xf4240',
  _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
  _feePayer: '0x60498fefbf1705a3db8d7bb5c80d5238956343e5',
  _feePayerSignatures: [ SignatureData { _v: '0x07f6', _r: '0x793eb...', _s: '0x0f776...' } ],
  _to: '0x294b2618f29714732cfc202d7be53bf5efee90dd',
  _value: '0x0',
  _input: '0x983b2d5600000000000000000000000060498fefbf1705a3db8d7bb5c80d5238956343e5',
  _chainId: '0x3e9',
  _gasPrice: '0x5d21dba00',
  _nonce: '0x2f6'
}
> myContract.methods['methodName'](123).signAsFeePayer({ from: '0x{address in hex}', feeDelegation: true, feePayer: '0x{address in hex}', gas: 1000000 }).then(console.log)
```

## Xem bảng tham số trong [methods.methodName.send](caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) để biết chi tiết.

```javascript
myContract.methods.methodName([param1 [, param2 [, ...]]]).estimateGas(options [, callback])
```

**Giá trị trả về** `Promise` trả về [Giao dịch](./caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) - Giao dịch hợp đồng thông minh đã ký.

**Ví dụ**

| methods.methodName.estimateGas <a href="#methods-methodname-estimategas" id="methods-methodname-estimategas"></a> | Sẽ ước tính mức gas mà việc thực thi phương pháp sẽ sử dụng khi được thực thi trong Máy ảo Klaytn. | Ước tính có thể khác với gas thực tế được sử dụng khi gửi giao dịch sau này, vì trạng thái của hợp đồng thông minh có thể khác vào thời điểm đó. |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Tham số**                                                                                                       | Tên                                                                                                | Loại Mô tả                                                                                                                                      |
| tùy chọn                                                                                                          | đối tượng                                                                                          | (tùy chọn) Các tùy chọn dùng để gọi.                                                                                          |

Xem bảng dưới đây để biết thông tin chi tiết.

| callback                                          | hàm                                                                                                              | (tùy chọn) Lệnh gọi lại này sẽ được kích hoạt với kết quả ước tính gas làm đối số thứ hai hoặc với một đối tượng lỗi làm đối số đầu tiên. |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Đối tượng tùy chọn có thể chứa các thông tin sau: | Tên                                                                                                              | Loại                                                                                                                                                        |
| Mô tả                                             | từ                                                                                                               | chuỗi (tùy chọn) Địa chỉ mà từ đó việc gọi phương pháp hợp đồng sẽ được thực hiện. gas                                                    |
| số                                                | (tùy chọn) Lượng gas tối đa được cung cấp cho lệnh gọi này (giới hạn gas). | Đặt một giá trị cụ thể giúp phát hiện lỗi hết gas.                                                                                                           |

Nếu dùng hết gas sẽ về số như cũ.

giá trị

| số \| chuỗi \| BN \| Bignumber | (tùy chọn) Giá trị trong peb sẽ được chuyển đến địa chỉ của hợp đồng thông minh nếu giao dịch để thực thi hàm hợp đồng này được gửi đến Klaytn. |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Giá trị trả về**             | `Promise` trả về `số`                                                                                                                                              |

Loại

```javascript
> myContract.methods.methodName(123).estimateGas({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(gasAmount) {
    ...
  })
  .catch(function(error) {
    ...
  })
```

## Mô tả

```javascript
myContract.methods.methodName([param1 [, param2[, ...]]]).encodeABI()
```

số Gas được sử dụng cho lệnh gọi/giao dịch mô phỏng.

**Ví dụ**

methods.methodName.encodeABI <a href="#methods-methodname-encodeabi" id="methods-methodname-encodeabi"></a>

Mã hóa ABI cho phương pháp này.

| Nó có thể dùng để gửi một giao dịch hoặc gọi một phương pháp hoặc chuyển nó vào một phương pháp hợp đồng thông minh khác làm đối số. | **Tham số**        |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| Các tham số của bất kỳ phương pháp nào thuộc về hợp đồng thông minh này, được xác định trong giao diện JSON.                         | **Giá trị trả về** |

Loại

```javascript
> myContract.methods.methodName(123).encodeABI()
'0x58cf5f1000000000000000000000000000000000000000000000000000000000000007B'
```

## Mô tả

```javascript
myContract.once(event [, options], callback)
```

chuỗi Mã byte ABI được mã hóa để gửi qua giao dịch hoặc cuộc gọi.

**Ví dụ**

| myContract.once <a href="#mycontract-once" id="mycontract-once"></a> | Đăng ký một sự kiện và hủy đăng ký ngay sau sự kiện hoặc lỗi đầu tiên. | Sẽ chỉ kích hoạt cho một sự kiện duy nhất.                                                                |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Tham số**                                                          | Tên                                                                    | Loại                                                                                                     |
| Mô tả                                                                | sự kiện                                                                | chuỗi Tên của sự kiện trong hợp đồng hoặc `allEvents` để nhận tất cả các sự kiện.                         |
| tùy chọn                                                             | đối tượng                                                              | (tùy chọn) Các tùy chọn dùng để đăng ký. Xem bảng dưới đây để biết thông tin chi tiết. |

callback

| hàm                                               | Lệnh gọi lại này sẽ được kích hoạt cho sự kiện đầu tiên làm đối số thứ hai hoặc lỗi làm đối số thứ nhất. | Xem [myContract.getPastEvents](#mycontract-events) để biết chi tiết về cấu trúc sự kiện.                                                                                                                        |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Đối tượng tùy chọn có thể chứa các thông tin sau: | Tên                                                                                                      | Loại                                                                                                                                                                                                           |
| Mô tả                                             | bộ lọc                                                                                                   | đối tượng (tùy chọn) Cho phép bạn lọc các sự kiện theo các tham số được lập chỉ mục, _vd:_ `{bộ lọc: {mynumber: [12,13]}}` có nghĩa là tất cả các sự kiện trong đó "mynumber" là 12 hoặc 13. |

chủ đề

Mảng (tùy chọn) Điều này cho phép bạn đặt chủ đề cho bộ lọc sự kiện theo cách thủ công.

Nếu được cung cấp thuộc tính bộ lọc và chữ ký sự kiện, `topic[0]` sẽ không được đặt tự động.

```javascript
> myContract.once('eventName', {
    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
  }, function(error, event) { console.log(event) })

// event output example
{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My string'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'eventName',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blocknumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
}
```

## **Giá trị trả về**

```javascript
myContract.subscribe(event [, options], callback)
```

`Promise` trả về `object` - Đối tượng sự kiện. Để biết thêm chi tiết về đối tượng sự kiện, vui lòng tham khảo [myContract.getPastEvents](#mycontract-events).

**Ví dụ**

myContract.subscribe <a href="#mycontract-subscribe" id="mycontract-subscribe"></a>

Đăng ký một sự kiện.

| Hàm này hoạt động giống như [myContract.events.eventName](#getpastevents). | Bạn có thể hủy đăng ký một sự kiện bằng cách gọi hàm `unsubscribe` của đối tượng đăng ký được trả về bởi hàm `subscribe`. | **LƯU Ý** `myContract.subscribe` được hỗ trợ kể từ caver-js phiên bản [v1.9.1-rc.1](#getpastevents).      |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Tham số**                                                                | Tên                                                                                                                       | Loại                                                                                                     |
| Mô tả                                                                      | sự kiện                                                                                                                   | chuỗi Tên của sự kiện trong hợp đồng hoặc `allEvents` để nhận tất cả các sự kiện.                         |
| tùy chọn                                                                   | đối tượng                                                                                                                 | (tùy chọn) Các tùy chọn dùng để đăng ký. Xem bảng dưới đây để biết thông tin chi tiết. |

callback

| hàm                                               | Lệnh gọi lại này sẽ được kích hoạt cho sự kiện đầu tiên làm đối số thứ hai hoặc lỗi làm đối số thứ nhất. | Xem [myContract.getPastEvents](#mycontract-events) để biết chi tiết về cấu trúc sự kiện.                                                                                                                        |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Đối tượng tùy chọn có thể chứa các thông tin sau: | Tên                                                                                                      | Loại                                                                                                                                                                                                           |
| Mô tả                                             | bộ lọc                                                                                                   | đối tượng (tùy chọn) Cho phép bạn lọc các sự kiện theo các tham số được lập chỉ mục, _vd:_ `{bộ lọc: {mynumber: [12,13]}}` có nghĩa là tất cả các sự kiện trong đó "mynumber" là 12 hoặc 13. |

chủ đề

Mảng (tùy chọn) Điều này cho phép bạn đặt chủ đề cho bộ lọc sự kiện theo cách thủ công.

Nếu được cung cấp thuộc tính bộ lọc và chữ ký sự kiện, `topic[0]` sẽ không được đặt tự động.

```javascript
> const subscription = myContract.subscribe('eventName', {
    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
  }, function(error, event) { console.log(event) })
{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My string'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43a...', '0x7f9fa...']
    },
    event: 'eventName',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blocknumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
}
> subscription.unsubscribe() // unsubscribe the event
```

## **Giá trị trả về**

```javascript
myContract.events.eventName([options][, callback])
```

`Promise` trả về `object` - Đối tượng sự kiện.

Để biết thêm chi tiết về đối tượng sự kiện, vui lòng tham khảo [myContract.getPastEvents](#mycontract-events).

| **Ví dụ** | myContract.events <a href="#mycontract-events" id="mycontract-events"></a> | Đăng ký một sự kiện.                                        |
| ----------- | -------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Tham số** | Tên                                                                        | Loại Mô tả                                                 |
| tùy chọn    | đối tượng                                                                  | (tùy chọn) Các tùy chọn dùng để đăng ký. |

Xem bảng dưới đây để biết thông tin chi tiết.

| callback                                                                                                                                                                                              | hàm       | (tùy chọn) Lệnh gọi lại này sẽ được kích hoạt cho từng sự kiện làm đối số thứ hai hoặc lỗi làm đối số thứ nhất. |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Đối tượng tùy chọn có thể chứa các thông tin sau:                                                                                                                                                     | Tên       | Loại                                                                                                                              |
| Mô tả                                                                                                                                                                                                 | bộ lọc    | đối tượng                                                                                                                          |
| (tùy chọn) Cho phép bạn lọc các sự kiện theo các tham số được lập chỉ mục, _vd:_ `{bộ lọc: {mynumber: [12,13]}}` có nghĩa là tất cả các sự kiện trong đó "mynumber" là 12 hoặc 13. | fromBlock | số (tùy chọn) Số khối bắt đầu các sự kiện.                                                                      |

chủ đề

Mảng

| (tùy chọn) Điều này cho phép bạn đặt chủ đề cho bộ lọc sự kiện theo cách thủ công. | Nếu được cung cấp thuộc tính bộ lọc và chữ ký sự kiện, `topic[0]` sẽ không được đặt tự động. | **Giá trị trả về**                                                     |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `EventEmitter`: Trình phát sự kiện có các sự kiện sau:                                                | Tên                                                                                          | Loại                                                                  |
| Mô tả                                                                                                 | data                                                                                         | đối tượng Kích hoạt từng sự kiện đến với đối tượng sự kiện làm đối số. |
| connected                                                                                             | chuỗi                                                                                        | Kích hoạt một lần sau khi đăng ký được kết nối thành công.             |

Nó sẽ trả về ID đăng ký.

lỗi

| đối tượng                                                                      | Kích hoạt khi xảy ra lỗi trong đăng ký. | **LƯU Ý** `connected` khả dụng với caver-js phiên bản [v1.5.7](https://www.npmjs.com/package/caver-js/v/1.5.7). |
| ------------------------------------------------------------------------------ | --------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Cấu trúc của sự kiện trả về `Đối tượng` sẽ có dạng như sau:                    | Tên                                     | type                                                                                                            |
| Mô tả                                                                          | sự kiện                                 | chuỗi                                                                                                           |
| Tên sự kiện.                                                                   | chữ ký                                  | chuỗi \| `null`                                                                                                 |
| Chữ ký sự kiện, `null` nếu đó là sự kiện ẩn danh.                              | address                                 | chuỗi                                                                                                           |
| Địa chỉ bắt nguồn từ sự kiện này.                                              | returnValues                            | đối tượng                                                                                                       |
| Các giá trị trả về đến từ sự kiện, _ví dụ:_, `{myVar: 1, myVar2: '0x234...'}`. | logIndex                                | số                                                                                                              |
| Số nguyên của vị trí chỉ mục sự kiện trong khối.                               | transactionIndex                        | số Số nguyên của vị trí chỉ mục giao dịch nơi sự kiện được tạo ra.                                              |
| transactionHash                                                                | chuỗi 32 byte                           | Hàm băm của giao dịch mà sự kiện này được tạo. `null` khi nó vẫn đang chờ xử lý.                                |
| blockHash                                                                      | chuỗi 32 byte                           | Hàm băm của khối mà sự kiện này đã được tạo. `null` khi nó vẫn đang chờ xử lý.                                  |
| blocknumber                                                                    | số                                      | Số khối mà bản ghi này đã được tạo.                                                                             |
| Giá trị là `null` khi bản ghi vẫn đang chờ xử lý.                              | raw\.data                               | chuỗi                                                                                                           |
| Dữ liệu chứa tham số bản ghi không được lập chỉ mục.                           | raw\.topics                             | Mảng Một mảng có tối đa bốn chủ đề 32 byte và chủ đề 1-3 chứa các tham số được lập chỉ mục của sự kiện.         |

id

```javascript
> myContract.events.eventName({
    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0
  }, function(error, event) { console.log(event) })
  .on('connected', function(subscriptionId){
      console.log(subscriptionId)
  })
  .on('data', function(event){
      console.log(event) // same results as the optional callback above
  })
  .on('error', console.error)

// event output example
{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My string'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'eventName',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blocknumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    id: 'log_41d221bc',
}
```

## chuỗi

```javascript
myContract.events.allEvents([options] [, callback])
```

Mã số định danh bản ghi. Mã định danh được tạo thông qua việc nối chuỗi "log_" với `keccak256(blockHash + transactionHash + logIndex).substr(0, 8)`e>

## **Ví dụ**

```javascript
myContract.getPastEvents(event [, options] [, callback])
```

events.allEvents <a href="#events-allevents" id="events-allevents"></a>

Tương tự như [myContract.events](#getpastevents) nhưng nhận tất cả các sự kiện từ hợp đồng thông minh này.

| Theo tùy chọn, thuộc tính bộ lọc có thể lọc các sự kiện đó. | getPastEvents <a href="#getpastevents" id="getpastevents"></a> | Nhận các sự kiện trong quá khứ cho hợp đồng này.                                    |
| ----------------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Tham số**                                                 | Tên                                                            | Loại                                                                               |
| Mô tả                                                       | sự kiện                                                        | chuỗi Tên của sự kiện trong hợp đồng hoặc `"allEvents"` để nhận tất cả các sự kiện. |
| tùy chọn                                                    | đối tượng                                                      | (tùy chọn) Các tùy chọn dùng để đăng ký.                         |

Xem bảng dưới đây để biết thông tin chi tiết.

| callback                                                                                                                                                                                              | hàm       | (tùy chọn) Lệnh gọi lại này sẽ được kích hoạt với một mảng bản ghi sự kiện làm đối số thứ hai hoặc một lỗi làm đối số thứ nhất. |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Đối tượng tùy chọn có thể chứa các thông tin sau:                                                                                                                                                     | Tên       | Loại                                                                                                                                              |
| Mô tả                                                                                                                                                                                                 | bộ lọc    | đối tượng                                                                                                                                          |
| (tùy chọn) Cho phép bạn lọc các sự kiện theo các tham số được lập chỉ mục, _vd:_ `{bộ lọc: {mynumber: [12,13]}}` có nghĩa là tất cả các sự kiện trong đó "mynumber" là 12 hoặc 13. | fromBlock | số                                                                                                                                                 |
| (tùy chọn) Số khối bắt đầu các sự kiện.                                                                                                                                            | toBlock   | số (tùy chọn) Số khối để nhận các sự kiện lên đến (mặc định là `"latest"`).                                  |

chủ đề

Mảng

(tùy chọn) Điều này cho phép đặt chủ đề cho bộ lọc sự kiện theo cách thủ công.

| Nếu được cung cấp thuộc tính bộ lọc và chữ ký sự kiện, `topic[0]` sẽ không được đặt tự động. | **Giá trị trả về**              | `Promise` trả về `Array`: - Một mảng chứa các đối tượng sự kiện trong quá khứ, khớp với tên sự kiện và bộ lọc đã cho. |
| -------------------------------------------------------------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Một đối tượng sự kiện có thể chứa những thông tin sau đây:                                   | Tên                             | Loại                                                                                                                 |
| Mô tả                                                                                        | sự kiện                         | chuỗi                                                                                                                 |
| Tên sự kiện.                                                                                 | chữ ký                          | chuỗi \| `null`                                                                                                       |
| Chữ ký sự kiện, `null` nếu đó là sự kiện ẩn danh.                                            | address                         | chuỗi                                                                                                                 |
| Địa chỉ bắt nguồn sự kiện.                                                                   | returnValues                    | đối tượng                                                                                                             |
| Các giá trị trả về đến từ sự kiện, ví dụ: `{myVar: 1, myVar2: '0x234...'}`.                  | logIndex                        | số                                                                                                                    |
| Vị trí chỉ mục sự kiện trong khối.                                                           | transactionIndex                | số                                                                                                                    |
| Vị trí chỉ mục của giao dịch nơi sự kiện được tạo.                                           | transactionHash                 | chuỗi                                                                                                                 |
| Hàm băm của giao dịch mà sự kiện này được tạo.                                               | blockHash                       | chuỗi                                                                                                                 |
| Hàm băm của khối mà sự kiện này đã được tạo in.                                              | null khi nó vẫn đang chờ xử lý. | blockNumber số Số khối mà bản ghi này đã được tạo in.                                                                 |

null khi vẫn đang chờ xử lý.

```javascript
> myContract.getPastEvents('eventName', {
      filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
      fromBlock: 0,
      toBlock: 'latest'
  }, function(error, events) { console.log(events) })
  .then(function(events) {
      console.log(events) // same results as the optional callback above
  })

[{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My string'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'eventName',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blocknumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
},{
      ...
}]
```
