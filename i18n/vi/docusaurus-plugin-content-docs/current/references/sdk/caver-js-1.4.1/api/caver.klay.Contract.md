---
description: Một đối tượng caver-js được sử dụng để tương tác với một hợp đồng thông minh.

---

# caver.klay.Contract

Đối tượng `caver.klay.Contract` giúp dễ dàng tương tác với các hợp đồng thông minh trên blockchain Klaytn. Khi tạo một phiên bản hợp đồng mới, bạn cung cấp cho hợp đồng này giao diện JSON của hợp đồng thông minh tương ứng và caver sẽ tự động chuyển đổi tất cả lệnh gọi thành lệnh gọi ABI cấp thấp qua RPC cho bạn.

Điều này cho phép bạn tương tác với các hợp đồng thông minh như thể chúng là các đối tượng JavaScript.

## hợp đồng mới <a id="new-contract"></a>

```javascript
caver.klay.Contract mới(jsonInterface [, address] [, options])
```

Tạo một phiên bản hợp đồng mới với tất cả các phương pháp và sự kiện được xác định trong đối tượng giao diện JSON của hợp đồng đó.

**Tham số**

| Tên           | type      | Mô tả                                                                                                                                  |
|:------------- |:--------- |:-------------------------------------------------------------------------------------------------------------------------------------- |
| jsonInterface | Đối tượng | Giao diện JSON để khởi tạo hợp đồng                                                                                                    |
| address       | Chuỗi     | \(tùy chọn\) Địa chỉ của hợp đồng thông minh cần gọi ra. Có thể thêm sau bằng cách sử dụng `myContract.options.address = '0x1234..'` |
| tùy chọn      | Đối tượng | \(tùy chọn\) Các tùy chọn của hợp đồng.  Xem bảng dưới đây để biết thông tin chi tiết.                                               |

Đối tượng tùy chọn chứa các mục sau:

| Tên     | Loại | Mô tả                                                                              |
|:------- |:----- |:---------------------------------------------------------------------------------- |
| từ      | Chuỗi | \(tùy chọn\) Địa chỉ mà từ đó các giao dịch sẽ được thực hiện.                   |
| giá gas | Chuỗi | \(tùy chọn\) Giá gas tính bằng peb để sử dụng cho giao dịch.                     |
| gas     | Số    | \(tùy chọn\) Lượng gas tối đa được cung cấp cho một giao dịch \(hạn mức gas\). |
| data    | Chuỗi | \(tùy chọn\) Mã byte của hợp đồng. Được sử dụng khi hợp đồng được triển khai.    |

**Giá trị trả về**

| Loại     | Mô tả                                                            |
|:--------- |:---------------------------------------------------------------- |
| Đối tượng | Đối tượng hợp đồng với tất cả các phương pháp và sự kiện của nó. |

**Ví dụ**

```javascript
var myContract = new caver.klay.Contract([...], '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
      from: '0x1234567890123456789012345678901234567891', // default from address
      gasPrice: '25000000000' // default gas price in peb, 25 Gpeb in this case
});

var myContract = new caver.klay.Contract([...], 'myContract', {
      from: '0x1234567890123456789012345678901234567891', // default from address
      gasPrice: '25000000000' // default gas price in peb, 25 Gpeb in this case
});
```

## tùy chọn <a id="options"></a>

```javascript
myContract.options
```

Đối tượng `options` cho phiên bản hợp đồng. `from`, `gas` và `gasPrice` được sử dụng làm giá trị dự phòng khi gửi giao dịch.

**Thuộc tính**

| Tên           | Loại | Mô tả                                                                                   |
|:------------- |:----- |:--------------------------------------------------------------------------------------- |
| address       | Chuỗi | Địa chỉ triển khai hợp đồng.  Xem thêm [options.address](#options-address).             |
| jsonInterface | Mảng  | Giao diện JSON của hợp đồng.  Xem thêm [options.jsonInterface](#options-jsoninterface). |
| data          | Chuỗi | Mã byte của hợp đồng. Được sử dụng khi hợp đồng được triển khai.                        |
| từ            | Chuỗi | Địa chỉ mà từ đó các giao dịch sẽ được thực hiện.                                       |
| giá gas       | Chuỗi | Giá gas tính bằng peb để sử dụng cho giao dịch.                                         |
| gas           | Số    | Lượng gas tối đa được cung cấp cho một giao dịch \(hạn mức gas\).                     |

**Ví dụ**

```javascript
> myContract.options;
{
    address: '0x1234567890123456789012345678901234567891',
    jsonInterface: [...],
    from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    gasPrice: '10000000000000',
    gas: 1000000
}

> myContract.options.from = '0x1234567890123456789012345678901234567891'; // default from address
> myContract.options.gasPrice = '25000000000000'; // default gas price in peb
> myContract.options.gas = 5000000; // provide as fallback always 5M gas
```

## options.address <a id="options-address"></a>

```javascript
myContract.options.address
```

Địa chỉ được sử dụng cho phiên bản hợp đồng `myContract` này. Tất cả các giao dịch do caver-js tạo ra từ hợp đồng này sẽ chứa địa chỉ này dưới dạng "địa chỉ đến". Địa chỉ được lưu trữ ở dạng chữ thường.

**Thuộc tính**

| Tên     | Loại    | Mô tả                                                                    |
|:------- |:-------- |:------------------------------------------------------------------------ |
| address | Chuỗi \ | `null` | Địa chỉ cho hợp đồng này hoặc `null` nếu địa chỉ chưa được đặt. |

**Ví dụ**

```javascript
> myContract.options.address;
'0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'

// đặt địa chỉ mới
> myContract.options.address = '0x1234FFDD...';
```

## options.jsonInterface <a id="options-jsoninterface"></a>

```javascript
myContract.options.jsonInterface
```

Đối tượng giao diện JSON bắt nguồn từ ABI của hợp đồng này `myContract`.

**Thuộc tính**

| Tên           | type | Mô tả                                                                                                           |
|:------------- |:---- |:--------------------------------------------------------------------------------------------------------------- |
| jsonInterface | Mảng | Giao diện JSON cho hợp đồng này. Đặt lại điều này sẽ tạo lại các phương pháp và sự kiện của đối tượng hợp đồng. |

**Ví dụ**

```javascript
> myContract.options.jsonInterface;
[{
      "type":"function",
      "name":"foo",
      "inputs": [{"name":"a","type":"uint256"}],
      "outputs": [{"name":"b","type":"address"}]
 },{
      "type":"event",
      "name":"Event"
      "inputs": [{"name":"a","type":"uint256","indexed":true},{"name":"b","type":"bytes32","indexed":false}],
 }]

// đặt giao diện mới
> myContract.options.jsonInterface = [...];
```

## sao chép <a id="clone"></a>

```javascript
myContract.clone()
```

Sao chép phiên bản hợp đồng hiện tại.

**Tham số**

Không có

**Giá trị trả về**

| type      | Mô tả                                 |
|:--------- |:------------------------------------- |
| Đối tượng | Phiên bản hợp đồng được sao chép mới. |

**Ví dụ**

```javascript
> var contract1 = new caver.klay.Contract(abi, address, {gasPrice: '12345678', from: fromAddress});
> var contract2 = contract1.clone();
> contract2.options.address = address2;
> (contract1.options.address !== contract2.options.address);
true
```

## triển khai <a id="deploy"></a>

```javascript
myContract.deploy(options)
```

Triển khai hợp đồng cho blockchain Klaytn. Sau khi triển khai thành công, promise sẽ được giải quyết bằng một phiên bản hợp đồng mới.

**Tham số**

`options`: đối tượng tùy chọn được sử dụng cho việc triển khai:

| Tên    | Loại | Mô tả                                                             |
|:------ |:----- |:----------------------------------------------------------------- |
| data   | Chuỗi | Mã byte của hợp đồng.                                             |
| đối số | Mảng  | \(tùy chọn\) Các đối số được chuyển đến hàm tạo khi triển khai. |

**Giá trị trả về**

`Đối tượng`: Đối tượng giao dịch:

| Loại | Mô tả                                                                                                                            |
|:----- |:-------------------------------------------------------------------------------------------------------------------------------- |
| Mảng  | đối số: Các đối số được chuyển cho phương pháp trước đó. Chúng có thể được thay đổi.                                             |
| Hàm   | [send](#methods-mymethod-send): Sẽ triển khai hợp đồng. Promise sẽ được giải quyết với phiên bản hợp đồng mới, thay vì biên lai. |
| Hàm   | [estimateGas](#methods-mymethod-estimategas): Sẽ ước tính lượng gas sử dụng cho việc triển khai.                                 |
| Hàm   | [encodeABI](#methods-mymethod-encodeabi): Mã hóa ABI của quá trình triển khai, là dữ liệu hợp đồng + tham số hàm tạo.            |

**Ví dụ**

```javascript
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My String']
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
  });

// Khi dữ liệu đã được đặt làm tùy chọn cho chính hợp đồng
> myContract.options.data = '0x12345...';

> myContract.deploy({
        arguments: [123, 'My String']
  })
  .send({
      from: '0x1234567890123456789012345678901234567891',
      gas: 1500000,
      value: 0,
  })
  .then(function(newContractInstance) {
      console.log(newContractInstance.options.address) // instance with the new contract address
  });

// Mã hóa đơn giản
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My String']
  })
  .encodeABI();
'0x12345...0000012345678765432'

// Ước tính gas
> myContract.deploy({
      data: '0x12345...',
      arguments: [123, 'My String']
  })
  .estimateGas(function(err, gas) {
      console.log(gas);
  });
```

## phương pháp <a id="methods"></a>

```javascript
myContract.methods.myMethod([param1 [, param2 [, ...]]])
```

Tạo một đối tượng giao dịch cho phương pháp đó, sau đó có thể gọi, gửi, ước tính hoặc mã hóa dưới dạng ABI.

Các phương pháp của hợp đồng thông minh này có sẵn thông qua:

* Tên: `myContract.methods.myMethod(123)`
* Tên có tham số: `myContract.methods['myMethod(uint256)'](123)`
* Chữ ký\*: `myContract.methods['0x58cf5f10'](123)`

Điều này cho phép gọi ra các hàm có cùng tên nhưng khác tham số từ phiên bản hợp đồng JavaScript.

## cf\) \*Chữ ký hàm \(Bộ chọn hàm\) <a id="cf-function-signature-function-selector"></a>

Bốn byte đầu tiên của dữ liệu lệnh gọi cho một lệnh gọi hàm chỉ định hàm sẽ được gọi ra.  
Đây là bốn byte \(left, high-order in big-endian\) đầu tiên của hàm băm Keccak-256 \(SHA-3\) của chữ ký của hàm.

Chữ ký hàm có thể được tạo bằng 2 phương pháp khác nhau.  
`1. caver.klay.abi.encodeFunctionSignature('funcName(paramType1,paramType2,...)')`  
`2. caver.utils.sha3('funcName(paramType1,paramType2,...)').substr(0, 10)`

ex\)

```javascript
caver.klay.abi.encodeFunctionSignature('myMethod(uint256)')
> 0x58cf5f10

caver.utils.sha3('myMethod(uint256)').substr(0, 10)
> 0x58cf5f10
```

**Tham số**

Các tham số của bất kỳ phương pháp nào phụ thuộc vào các phương pháp hợp đồng thông minh, được xác định trong giao diện JSON.

**Giá trị trả về**

`Đối tượng`: Đối tượng giao dịch:

| Loại | Mô tả                                                                                                                                                                                                                        |
|:----- |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mảng  | đối số: Các đối số được chuyển cho phương pháp trước đó. Chúng có thể được thay đổi.                                                                                                                                         |
| Hàm   | [gọi](#methods-mymethod-call): Sẽ gọi ra phương pháp "hằng số" và thực thi phương pháp hợp đồng thông minh của nó trong Máy ảo Klaytn mà không gửi giao dịch \(không thể thay đổi trạng thái hợp đồng thông minh\).        |
| Hàm   | [send](#methods-mymethod-send): Sẽ gửi một giao dịch đến hợp đồng thông minh và thực hiện phương pháp \(có thể thay đổi trạng thái hợp đồng thông minh\).                                                                  |
| Hàm   | [estimateGas](#methods-mymethod-estimategas): Sẽ ước tính lượng gas được sử dụng khi phương pháp sẽ được thực thi trên blockchain.                                                                                           |
| Hàm   | [encodeABI](#methods-mymethod-encodeabi): Mã hóa ABI cho phương pháp này. Điều này có thể được gửi bằng cách sử dụng một giao dịch, gọi ra phương pháp hoặc chuyển sang một phương pháp hợp đồng thông minh khác làm đối số. |

**Ví dụ**

```javascript
// gọi ra một phương pháp
> myContract.methods.myMethod(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, function(error, result) {
      ...
  });

// hoặc gửi và sử dụng promise
> myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(receipt) {
    // biên lai cũng có thể là một phiên bản hợp đồng mới, khi đến từ một "contract.deploy({...}).send()"
  });

// hoặc gửi và sử dụng các sự kiện
> myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .on('transactionHash', function(hash) {
      ...
  })
  .on('receipt', function(receipt) {
      ...
  })
  .on('error', console.error);
```

## methods.myMethod.call <a id="methods-mymethod-call"></a>

```javascript
myContract.methods.myMethod([param1 [, param2 [, ...]]]).call(options [, callback])
```

Sẽ gọi ra một phương pháp "hằng số" và thực thi phương pháp hợp đồng thông minh của nó trong Máy ảo Klaytn mà không gửi bất kỳ giao dịch nào. Lưu ý rằng việc gọi không thể thay đổi trạng thái hợp đồng thông minh.

**Tham số**

| Tên      | Loại     | Mô tả                                                                                                                                                                    |
|:-------- |:--------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| tùy chọn | Đối tượng | \(tùy chọn\) Các tùy chọn được sử dụng để gọi.  Xem bảng dưới đây để biết thông tin chi tiết.                                                                          |
| callback | Hàm       | \(tùy chọn\) Lần gọi lại này sẽ được kích hoạt với kết quả thực thi phương pháp hợp đồng thông minh làm đối số thứ hai hoặc với một đối tượng lỗi làm đối số thứ nhất. |

Đối tượng tùy chọn có thể chứa các thông tin sau:

| Tên     | type  | Mô tả                                                                                         |
|:------- |:----- |:--------------------------------------------------------------------------------------------- |
| từ      | Chuỗi | \(tùy chọn\) Địa chỉ nơi lệnh gọi “giao dịch” được thực hiện.                               |
| giá gas | Chuỗi | \(tùy chọn\) Giá gas tính bằng peb để sử dụng cho lệnh gọi "giao dịch" này.                 |
| gas     | Số    | \(tùy chọn\) Lượng gas tối đa được cung cấp cho lệnh gọi "giao dịch" này \(hạn mức gas\). |

**Giá trị trả về**

`Promise` trả về `Mixed`: Giá trị trả về\(s\) của phương pháp hợp đồng thông minh. Nếu trả về một giá trị duy nhất, nó sẽ được trả về như cũ. Nếu có nhiều giá trị trả về, chúng sẽ được trả về dưới dạng một đối tượng có thuộc tính và chỉ số.

**Ví dụ**

```javascript
// sử dụng hàm callback
> myContract.methods.myMethod(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, function(error, result) {
      ...
  });

// sử dụng promise
> myContract.methods.myMethod(123).call({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(result) {
      ...
  });
```

```text
// Tính vững chắc: TRẢ LẠI MULTI-ARGUMENT
contract MyContract {
    function myFunction() returns(uint256 myNumber, string myString) {
        return (23456, "Hello!%");
    }
}
```

```javascript
> var MyContract = new caver.klay.Contract(abi, address);
> MyContract.methods.myFunction().call().then(console.log);
Result {
      myNumber: '23456',
      myString: 'Hello!%',
      0: '23456', // these are here as fallbacks if the name is not known or given
      1: 'Hello!%'
}
```

```text
// Tính vững chắc: TRẢ LẠI MỘT ĐỐI SỐ
contract MyContract {
    function myFunction() returns(string myString) {
        return "Hello!%";
    }
}
```

```javascript
> var MyContract = new caver.klay.Contract(abi, address);
> MyContract.methods.myFunction().call().then(console.log);
"Hello!%"
```

## methods.myMethod.send <a id="methods-mymethod-send"></a>

```javascript
myContract.methods.myMethod([param1 [, param2 [, ...]]]).send(options [, callback])
```

Sẽ gửi một giao dịch đến hợp đồng thông minh và thực hiện phương pháp của nó. Lưu ý rằng điều này có thể thay đổi trạng thái hợp đồng thông minh.

**Tham số**

| Tên      | Loại     | Mô tả                                                                                                                         |
|:-------- |:--------- |:----------------------------------------------------------------------------------------------------------------------------- |
| tùy chọn | Đối tượng | Các tùy chọn được sử dụng để gửi.  Xem bảng dưới đây để biết thông tin chi tiết.                                              |
| callback | Hàm       | \(tùy chọn\) Hàm callback này sẽ được kích hoạt trước với "transactionHash" hoặc với một đối tượng lỗi làm đối số thứ nhất. |

Đối tượng tùy chọn có thể chứa các thông tin sau:

| Tên     | Loại | Mô tả                                                                                        |
|:------- |:----- |:-------------------------------------------------------------------------------------------- |
| từ      | Chuỗi | Địa chỉ mà từ đó giao dịch sẽ được gửi.                                                      |
| giá gas | Chuỗi | \(tùy chọn\) Giá gas tính bằng peb để sử dụng cho giao dịch này.                           |
| gas     | Số    | Lượng gas tối đa được cung cấp cho giao dịch này \(hạn mức gas\).                          |
| giá trị | Số \ | Chuỗi \| BN \| BigNumber | \(tùy chọn\) Giá trị được chuyển cho giao dịch tính bằng peb. |

**Giá trị trả về**

`callback` sẽ trả về hàm băm giao dịch 32 byte.

`PromiEvent`: Bộ phát hiệu ứng sự kiện kết hợp promise. Sẽ được giải quyết khi có biên lai giao dịch hoặc nếu `send()` này được gọi ra từ `someContract.deploy()`, thì promise sẽ được giải quyết với phiên bản hợp đồng mới. Ngoài ra, các sự kiện sau đây có sẵn:

| Tên             | Loại     | Mô tả                                                                                                                                                                                                                                                                                                            |
|:--------------- |:--------- |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionHash | Chuỗi     | Được kích hoạt ngay sau khi giao dịch được gửi và có sẵn hàm băm giao dịch.                                                                                                                                                                                                                                      |
| biên lai        | Đối tượng | Được kích hoạt khi biên lai giao dịch có sẵn.  Biên lai từ hợp đồng sẽ không có thuộc tính `nhật ký` mà thay vào đó là thuộc tính `events` với tên sự kiện là khóa và sự kiện là thuộc tính. Xem [giá trị trả về của getPastEvents](#getpastevents) để biết thông tin chi tiết về đối tượng sự kiện được trả về. |
| lỗi             | Lỗi       | Được kích hoạt nếu xảy ra lỗi trong quá trình gửi. Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.                                                                                                                                                                                                       |

**Ví dụ**

```javascript
// sử dụng hàm callback
> myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}, function(error, transactionHash) {
    ...
  });

// sử dụng promise
> myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(receipt) {
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
  });


// sử dụng bộ phát sự kiện
> myContract.methods.myMethod(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .on('transactionHash', function(hash) {
    ...
  })
  .on('receipt', function(receipt) {
    console.log(receipt);
  })
  .on('error', console.error); // Nếu bị lỗi hết gas thì thông số thứ 2 là hóa đơn.

// mẫu hóa đơn
{
   "transactionHash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
   "transactionIndex": 0,
   "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
   "blockNumber": 3,
   "contractAddress": "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
   "gasUsed": 30234,
   "events": {
     "MyEvent": {
       returnValues: {
         myIndexedParam: 20,
         myOtherIndexedParam: '0x123456789...',
         myNonIndexParam: 'My String'
       },
       raw: {
         data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
         topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
       },
       event: 'MyEvent',
       signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
       logIndex: 0,
       transactionIndex: 0,
       transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
       blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
       blockNumber: 1234,
       address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
    },
    "MyOtherEvent": {
      ...
    },
    "MyMultipleEvent":[{...}, {...}] // Nếu có nhiều sự kiện giống nhau, chúng sẽ nằm trong một mảng.
  }
}
```

## methods.myMethod.estimateGas <a id="methods-mymethod-estimategas"></a>

```javascript
myContract.methods.myMethod([param1 [, param2 [, ...]]]).estimateGas(options [, callback])
```

Sẽ ước tính mức gas mà việc thực thi phương pháp sẽ sử dụng khi được thực thi trong Máy ảo Klaytn. Ước tính có thể khác với gas thực tế được sử dụng khi gửi giao dịch sau này, vì trạng thái của hợp đồng thông minh có thể khác vào thời điểm đó.

**Tham số**

| Tên      | Loại     | Mô tả                                                                                                                                         |
|:-------- |:--------- |:--------------------------------------------------------------------------------------------------------------------------------------------- |
| tùy chọn | Đối tượng | \(tùy chọn\) Các tùy chọn được sử dụng để gọi.  Xem bảng dưới đây để biết thông tin chi tiết.                                               |
| callback | Hàm       | \(tùy chọn\) Hàm callback này sẽ được kích hoạt với kết quả ước tính gas làm đối số thứ hai hoặc với một đối tượng lỗi làm đối số thứ nhất. |

Đối tượng tùy chọn có thể chứa các thông tin sau:

| Tên     | type  | Mô tả                                                                                                                                                                              |
|:------- |:----- |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ      | Chuỗi | \(tùy chọn\) Địa chỉ nơi lệnh gọi "giao dịch" sẽ được thực hiện.                                                                                                                 |
| gas     | Số    | \(tùy chọn\) Lượng gas tối đa được cung cấp cho lệnh gọi "giao dịch" này \(hạn mức gas\). Đặt một giá trị cụ thể giúp phát hiện lỗi hết gas. Nếu dùng hết gas sẽ về số như cũ. |
| giá trị | Số \ | Chuỗi \| BN \| BigNumber | \(tùy chọn\) Giá trị được chuyển cho lệnh gọi "giao dịch" tính bằng peb.                                                                            |

**Giá trị trả về**

`Promise` trả về `Number` - đơn vị gas đã sử dụng cho lệnh gọi/giao dịch mô phỏng.

**Ví dụ**

```javascript
// sử dụng promise
> myContract.methods.myMethod(123).estimateGas({gas: 5000000}, function(error, gasAmount) {
    if(gasAmount == 5000000)
      console.log('Method ran out of gas');
  });

// sử dụng promise
> myContract.methods.myMethod(123).estimateGas({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  .then(function(gasAmount) {
    ...
  })
  .catch(function(error) {
    ...
  });
```

## methods.myMethod.encodeABI <a id="methods-mymethod-encodeabi"></a>

```javascript
myContract.methods.myMethod([param1 [, param2[, ...]]]).encodeABI()
```

Mã hóa ABI cho phương pháp này. Điều này có thể được sử dụng để gửi một giao dịch, gọi ra một phương pháp hoặc chuyển nó vào một phương pháp hợp đồng thông minh khác làm đối số.

**Tham số**

Không có

**Giá trị trả về**

| Loại | Mô tả                                                       |
|:----- |:----------------------------------------------------------- |
| Chuỗi | Mã byte ABI được mã hóa để gửi qua giao dịch hoặc cuộc gọi. |

**Ví dụ**

```javascript
> myContract.methods.myMethod(123).encodeABI();
'0x58cf5f1000000000000000000000000000000000000000000000000000000000000007B'
```

## một lần <a id="once"></a>

```javascript
myContract.once(event [, options], callback)
```

Đăng ký một sự kiện và hủy đăng ký ngay sau sự kiện hoặc lỗi đầu tiên. Sẽ chỉ kích hoạt cho một sự kiện duy nhất.

**Tham số**

| Tên      | Loại     | Mô tả                                                                                                                                                                                                                       |
|:-------- |:--------- |:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sự kiện  | Chuỗi     | Tên của sự kiện trong hợp đồng hoặc `"allEvents"` để nhận tất cả các sự kiện.                                                                                                                                               |
| tùy chọn | Đối tượng | \(tùy chọn\) Các tùy chọn được sử dụng cho việc triển khai.  Xem bảng dưới đây để biết thông tin chi tiết.                                                                                                                |
| callback | Hàm       | Lệnh gọi lại này sẽ được kích hoạt cho sự kiện đầu tiên làm đối số thứ hai hoặc lỗi làm đối số thứ nhất. Xem [giá trị trả về của getPastEvents](#getpastevents) để biết thông tin chi tiết về cấu trúc sự kiện được trả về. |

Đối tượng tùy chọn có thể chứa các thông tin sau:

| Tên    | Loại     | Mô tả                                                                                                                                                                                  |
|:------ |:--------- |:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bộ lọc | Đối tượng | \(tùy chọn\) Cho phép bạn lọc các sự kiện theo thông số được lập chỉ mục, _ví dụ_, `{bộ lọc: {myNumber: [12,13]}}` có nghĩa là tất cả các sự kiện trong đó "myNumber" là 12 hoặc 13. |
| chủ đề | Mảng      | \(tùy chọn\) Điều này cho phép bạn đặt chủ đề cho bộ lọc sự kiện theo cách thủ công. Nếu được cung cấp thuộc tính bộ lọc và chữ ký sự kiện, `topic[0]` sẽ không được đặt tự động.    |

**Giá trị trả về**

`không xác định`

**Ví dụ**

```javascript
> myContract.once('MyEvent', {
    bộ lọc: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
  }, function(error, event) { console.log(event); });

// ví dụ đầu ra sự kiện
{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My String'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'MyEvent',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blockNumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
}
```

## sự kiện <a id="events"></a>

```javascript
myContract.events.MyEvent([options][, callback])
```

Đăng ký một sự kiện.

**Tham số**

| Tên      | Loại     | Mô tả                                                                                                                   |
|:-------- |:--------- |:----------------------------------------------------------------------------------------------------------------------- |
| tùy chọn | Đối tượng | \(tùy chọn\) Các tùy chọn được sử dụng cho việc triển khai.  Xem bảng dưới đây để biết thông tin chi tiết.            |
| callback | Hàm       | \(tùy chọn\) Lệnh gọi lại này sẽ được kích hoạt cho sự kiện đầu tiên làm đối số thứ hai hoặc lỗi làm đối số thứ nhất. |

Đối tượng tùy chọn có thể chứa các thông tin sau:

| Tên       | Loại     | Mô tả                                                                                                                                                                                  |
|:--------- |:--------- |:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bộ lọc    | Đối tượng | \(tùy chọn\) Cho phép bạn lọc các sự kiện theo thông số được lập chỉ mục, _ví dụ_, `{bộ lọc: {myNumber: [12,13]}}` có nghĩa là tất cả các sự kiện trong đó "myNumber" là 12 hoặc 13. |
| fromBlock | Số        | \(tùy chọn\) Số khối để bắt đầu sự kiện.                                                                                                                                             |
| chủ đề    | Mảng      | \(tùy chọn\) Điều này cho phép đặt chủ đề cho bộ lọc sự kiện theo cách thủ công. Nếu được cung cấp thuộc tính bộ lọc và chữ ký sự kiện, `topic[0]` sẽ không được đặt tự động.        |

**Giá trị trả về**

`EventEmitter`: Trình phát sự kiện có các sự kiện sau:

| Tên  | Loại     | Mô tả                                                        |
|:---- |:--------- |:------------------------------------------------------------ |
| data | Đối tượng | Kích hoạt từng sự kiện đến với đối tượng sự kiện làm đối số. |
| lỗi  | Đối tượng | Kích hoạt khi xảy ra lỗi trong đăng ký.                      |

Cấu trúc của sự kiện trả về `Đối tượng` sẽ có dạng như sau:

| Tên              | type          | Mô tả                                                                                                                                                  |
|:---------------- |:------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------ |
| sự kiện          | Chuỗi         | Tên sự kiện.                                                                                                                                           |
| chữ ký           | Chuỗi \      | `null` | Chữ ký sự kiện, `null` nếu đó là sự kiện ẩn danh.                                                                                             |
| address          | Chuỗi         | Địa chỉ bắt nguồn từ sự kiện này.                                                                                                                      |
| returnValues     | Đối tượng     | Các giá trị trả về đến từ sự kiện, _ví dụ:_, `{myVar: 1, myVar2: '0x234...'}`.                                                                         |
| logIndex         | Số            | Giá trị nguyên chỉ vị trí chỉ mục sự kiện trong khối.                                                                                                  |
| transactionIndex | Số            | Số nguyên của vị trí chỉ mục giao dịch nơi sự kiện được tạo ra.                                                                                        |
| transactionHash  | Chuỗi 32 byte | Hàm băm của khối mà sự kiện này đã được tạo. `null` khi nó vẫn đang chờ xử lý.                                                                         |
| blockHash        | Chuỗi 32 byte | Hàm băm của khối mà sự kiện này đã được tạo. `null` khi nó vẫn đang chờ xử lý.                                                                         |
| blockNumber      | Số            | Số khối mà bản ghi này đã được tạo. Giá trị là `null` khi bản ghi vẫn đang chờ xử lý.                                                                  |
| raw.data         | Chuỗi         | Dữ liệu chứa tham số bản ghi không được lập chỉ mục.                                                                                                   |
| raw.topics       | Mảng          | Một mảng có tối đa 4 chủ đề 32 byte, chủ đề 1-3 chứa các tham số được lập chỉ mục của sự kiện.                                                         |
| id               | Chuỗi         | Mã số định danh bản ghi. Mã định danh được tạo thông qua việc nối chuỗi "log\_" với `keccak256(blockHash + transactionHash + logIndex).substr(0, 8)` |

**Ví dụ**

```javascript
> myContract.events.MyEvent({
    bộ lọc: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0
  }, function(error, event) { console.log(event); })
  .on('data', function(event){
      console.log(event); // same results as the optional callback above
  })
  .on('error', console.error);

// ví dụ đầu ra sự kiện
{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My String'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'MyEvent',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blockNumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    id: 'log_41d221bc',
}
```

## events.allEvents <a id="events-allevents"></a>

```javascript
myContract.events.allEvents([options] [, callback])
```

Tương tự như [sự kiện](#events) nhưng nhận tất cả các sự kiện từ hợp đồng thông minh này. Theo tùy chọn, thuộc tính bộ lọc có thể lọc các sự kiện đó.

## getPastEvents <a id="getpastevents"></a>

```javascript
myContract.getPastEvents(event [, options] [, callback])
```

Nhận các sự kiện trong quá khứ cho hợp đồng này.

**Tham số**

| Tên      | type      | Mô tả                                                                                                                               |
|:-------- |:--------- |:----------------------------------------------------------------------------------------------------------------------------------- |
| sự kiện  | Chuỗi     | Tên của sự kiện trong hợp đồng hoặc `"allEvents"` để nhận tất cả các sự kiện.                                                       |
| tùy chọn | Đối tượng | \(tùy chọn\) Các tùy chọn được sử dụng cho việc triển khai.  Xem bảng dưới đây để biết thông tin chi tiết.                        |
| callback | Hàm       | \(tùy chọn\) Hàm callback này sẽ được kích hoạt với một mảng bản ghi sự kiện làm đối số thứ hai hoặc một lỗi làm đối số thứ nhất. |

Đối tượng tùy chọn có thể chứa các thông tin sau:

| Tên       | Loại     | Mô tả                                                                                                                                                                                  |
|:--------- |:--------- |:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bộ lọc    | Đối tượng | \(tùy chọn\) Cho phép bạn lọc các sự kiện theo thông số được lập chỉ mục, _ví dụ_, `{bộ lọc: {myNumber: [12,13]}}` có nghĩa là tất cả các sự kiện trong đó "myNumber" là 12 hoặc 13. |
| fromBlock | Số        | \(tùy chọn\) Số khối để bắt đầu sự kiện.                                                                                                                                             |
| toBlock   | Số        | \(tùy chọn\) Số khối để nhận các sự kiện lên đến \(mặc định là `"latest"`\).                                                                                                       |
| chủ đề    | Mảng      | \(tùy chọn\) Điều này cho phép đặt chủ đề cho bộ lọc sự kiện theo cách thủ công. Nếu được cung cấp thuộc tính bộ lọc và chữ ký sự kiện, `topic[0]` sẽ không được đặt tự động.        |

**Giá trị trả về**

`Promise` trả về `Mảng`: Một mảng chứa các đối tượng sự kiện trong quá khứ, khớp với tên sự kiện và bộ lọc đã cho.

**Ví dụ**

```javascript
> myContract.getPastEvents('MyEvent', {
      bộ lọc: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
      fromBlock: 0,
      toBlock: 'latest'
  }, function(error, events) { console.log(events); })
  .then(function(events) {
      console.log(events) // same results as the optional callback above
  });

[{
    returnValues: {
        myIndexedParam: 20,
        myOtherIndexedParam: '0x123456789...',
        myNonIndexParam: 'My String'
    },
    raw: {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    },
    event: 'MyEvent',
    signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blockNumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
},{
      ...
}]
```

