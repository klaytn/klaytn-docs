# caver.kct.kip17

`caver.kct.kip17` giúp bạn dễ dàng xử lý hợp đồng thông minh triển khai [KIP-17](https://kips.klaytn.foundation/KIPs/kip-17) dưới dạng đối tượng JavaScript trên chuỗi khối Klaytn.

`caver.kct.kip17` kế thừa [caver.contract](../caver.contract.md) để triển khai hợp đồng token KIP-17. `caver.kct.kip17` giữ các thuộc tính giống như `caver.contract` trong khi có các phương pháp bổ sung để triển khai các tính năng bổ sung. Phần này chỉ giới thiệu các phương pháp liên kết mới được thêm vào của `caver.kct.kip17`.

Mã triển khai KIP-17 cho caver-js hiện có trên [Klaytn Contracts Github Repo](https://github.com/klaytn/klaytn-contracts/tree/master/contracts/KIP/token/KIP17). KIP-17 cho caver-js hỗ trợ giao diện Ownable. Sử dụng giao diện này, bạn có thể chỉ định chủ sở hữu hợp đồng khi triển khai hợp đồng

Để biết thêm thông tin về KIP-17, hãy xem [Đề xuất cải tiến Klaytn](https://kips.klaytn.foundation/KIPs/kip-17).

## caver.kct.kip17.deploy <a id="caver-klay-kip17-deploy"></a>

```javascript
caver.kct.kip17.deploy(tokenInfo, deployer)
```
Triển khai hợp đồng token KIP-17 cho chuỗi khối Klaytn. Hợp đồng được triển khai bằng cách sử dụng caver.kct.kip17.deploy là token không thể thay thế tuân theo tiêu chuẩn KIP-17.

Sau khi triển khai thành công, lời hứa sẽ được giải quyết bằng phiên bản KIP17 mới.

**Tham số**

| Tên              | type                   | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| tokenInfo        | đối tượng              | Thông tin cần thiết để triển khai hợp đồng token KIP-17 trên chuỗi khối Klaytn. Xem bảng dưới đây để biết thông tin chi tiết.                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| trình triển khai | chuỗi \| đối tượng | Địa chỉ trong phiên bản keyring để triển khai hợp đồng token KIP-17. Địa chỉ này phải có đủ KLAY để triển khai. Xem [Keyring](../caver-wallet/keyring.md#caver-wallet-keyring) để biết thêm chi tiết. Nếu bạn muốn xác định các trường của mình sẽ sử dụng khi gửi giao dịch, bạn có thể chuyển loại đối tượng làm tham số. Nếu bạn muốn sử dụng Ủy thác phí khi triển khai các hợp đồng KIP-17, bạn có thể xác định các trường liên quan đến ủy thác phí trong đối tượng. Để sử dụng các trường này, hãy tham khảo mô tả tham số của [phê duyệt](#kip17-approve). |

Đối tượng tokenInfo phải chứa các thông tin sau:

| Tên     | Loại | Mô tả              |
| ------- | ----- | ------------------ |
| tên     | chuỗi | Tên của token.     |
| ký hiệu | chuỗi | Ký hiệu của token. |

**Giá trị trả về**

`PromiEvent`: Bộ phát hiệu ứng kết hợp promise, được giải quyết bằng một phiên bản KIP17 mới. Ngoài ra, có thể xảy ra các sự kiện sau đây:

| Tên             | type      | Mô tả                                                                                                                                                                                                                                                               |
| --------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionHash | chuỗi     | Được kích hoạt ngay sau khi giao dịch được gửi và có sẵn hàm băm giao dịch.                                                                                                                                                                                         |
| biên lai        | đối tượng | Được kích hoạt khi có biên lai giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên lai, hãy xem [getTransactionReceipt][]. Biên lai từ các phiên bản KIP17 có thuộc tính 'sự kiện' được phân tích cú pháp qua abi thay vì thuộc tính 'bản ghi'. |
| lỗi             | Lỗi       | Được kích hoạt nếu xảy ra lỗi trong quá trình gửi.                                                                                                                                                                                                                  |


**Đăng ký token**

1. Để đăng ký token trên trình khám phá khối, người tạo hợp đồng phải điền vào biểu mẫu yêu cầu gửi. Ghi lại các thông tin cụ thể được yêu cầu trên biểu mẫu.

2. Môi trường hợp đồng thông minh

   - Loại trình biên dịch: Solidity

   - Phiên bản trình biên dịch: v0.8.4+commit.c7e474f2

   - Loại giấy phép mã nguồn mở: MIT

3. Chi tiết hợp đồng thông minh

   - Tối ưu hóa: --optimize-run 200

   - Mã nguồn: [Liên kết Github hợp đồng KIP17](https://github.com/klaytn/caver-js/blob/dev/packages/caver-kct/src/kip17Token.sol).

4. Giá trị được mã hóa ABI: [kip17JsonInterface tại dev · klaytn/caver-js · GitHub](https://github.com/klaytn/caver-js/blob/dev/packages/caver-kct/src/kctHelper.js#L408-L1319)


**Ví dụ**

```javascript
// using the promise
> caver.kct.kip17.deploy({
    name: 'Jasmine',
    symbol: 'JAS',
}, '0x{address in hex}').then(console.log)
KIP17 {
    ...
    _address: '0xfA7D967f414468083aDAd85257a2cBD6019693C2',
    _jsonInterface: [
        ...
        {
            anonymous: false,
            inputs: [
                { indexed: true, name: 'owner', type: 'address' },
                { indexed: true, name: 'operator', type: 'address' },
                { indexed: false, name: 'approved', type: 'bool' }
            ],
            name: 'ApprovalForAll',
            type: 'event',
            signature: '0x17307...'
        }
    ] 
}

// Send object as second parameter
> caver.kct.kip17.deploy({
        name: 'Jasmine',
        symbol: 'JAS',
    },
    {
        from: '0x{address in hex}',
        feeDelegation: true,
        feePayer: '0x{address in hex}',
    }).then(console.log)

// using event emitter and promise
> caver.kct.kip17.deploy({
    name: 'Jasmine',
    symbol: 'JAS',
}, '0x{address in hex}')
.on('error', function(error) { ... })
.on('transactionHash', function(transactionHash) { ... })
.on('receipt', function(receipt) {
    console.log(receipt.contractAddress) // contains the new token contract address
})
.then(function(newKIP17Instance) {
    console.log(newKIP17Instance.options.address) // instance with the new token contract address
})
```

## caver.kct.kip17.detectInterface <a id="caver-kct-kip17-detectinterface"></a>

```javascript
caver.kct.kip17.detectInterface(contractAddress)
```
Trả về thông tin của giao diện được triển khai bởi hợp đồng token. Hàm tĩnh này sẽ sử dụng [kip17.detectInterface](#kip17-detectinterface).

**Tham số**

| Tên             | Loại | Mô tả                            |
| --------------- | ----- | -------------------------------- |
| contractAddress | chuỗi | Địa chỉ của hợp đồng token KIP-7 |

**Giá trị trả về**

`Promise` trả về một `đối tượng` chứa kết quả với các giá trị boolean cho biếu liệu [giao diện KIP-17](https://kips.klaytn.foundation/KIPs/kip-17#kip-13-identifiers) có được triển khai hay không.

**Ví dụ**

```javascript
> caver.kct.kip17.detectInterface('0x{address in hex}').then(console.log)
{
    IKIP17: true,
    IKIP17Metadata: true,
    IKIP17Enumerable: true,
    IKIP17Mintable: true,
    IKIP17MetadataMintable: true,
    IKIP17Burnable: true,
    IKIP17Pausable: true,
}
```

## caver.kct.kip17.create <a id="caver-kct-kip17-create"></a>

```javascript
caver.kct.kip17.create([tokenAddress])
```
Tạo một phiên bản KIP17 mới với các phương pháp và sự kiện liên kết của nó. Hàm này hoạt động tương tự như [ KIP17 mới](#new-kip17).

**LƯU Ý** `caver.kct.kip17.create` được hỗ trợ kể từ caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

**Tham số**

Xem [KIP17 mới](#new-kip17).

**Giá trị trả về**

Xem [KIP17 mới](#new-kip17).

**Ví dụ**

```javascript
// Create a KIP17 instance without a parameter
> const kip17 = caver.kct.kip17.create()

// Create a KIP17 instance with a token address
> const kip17 = caver.kct.kip17.create('0x{address in hex}')
```


## kIP17 mới <a id="new-kip17"></a>

```javascript
caver.kct.kip17([tokenAddress]) mới
```
Tạo một phiên bản KIP17 mới với các phương pháp và sự kiện liên kết của nó.

**Tham số**

| Tên          | Loại | Mô tả                                                                                                                 |
| ------------ | ----- | --------------------------------------------------------------------------------------------------------------------- |
| tokenAddress | chuỗi | (tùy chọn) Địa chỉ của hợp đồng token KIP-17, có thể được chỉ định sau thông qua `kip17.options.address = '0x1234..'` |

**Giá trị trả về**

| Loại     | Mô tả                                                           |
| --------- | --------------------------------------------------------------- |
| đối tượng | Phiên bản KIP17 với các phương pháp và sự kiện liên kết của nó. |


**Ví dụ**

```javascript
// Create a KIP17 instance without a parameter
> const kip17 = new caver.kct.kip17()

// Create a KIP17 instance with a token address
> const kip17 = new caver.kct.kip17('0x{address in hex}')
```


## kip17.clone <a id="kip17-clone"></a>

```javascript
kip17.clone([tokenAddress])
```
Sao chép phiên bản KIP17 hiện tại.

**Tham số**

| Tên          | Loại | Mô tả                                                                                                                                                      |
| ------------ | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenAddress | chuỗi | (tùy chọn) Địa chỉ của hợp đồng thông minh đã triển khai token KIP-17 khác. Nếu bị bỏ qua, nó sẽ được đặt thành địa chỉ hợp đồng trong trường hợp ban đầu. |

**Giá trị trả về**

| Loại     | Mô tả                                |
| --------- | ------------------------------------ |
| đối tượng | Bản sao của phiên bản KIP17 ban đầu. |


**Ví dụ**

```javascript
> const kip17 = new caver.kct.kip17(address)

// Clone without a parameter
> const cloned = kip17.clone()

// Clone with the address of the new token contract
> const cloned = kip17.clone('0x{address in hex}')
```

## kip17.detectInterface <a id="kip17-detectinterface"></a>

```javascript
kip17.detectInterface()
```
Trả về thông tin của giao diện được triển khai bởi hợp đồng token.

**Tham số**

Không có

**Giá trị trả về**

`Promise` trả về một `đối tượng` chứa kết quả với các giá trị boolean cho biếu liệu [giao diện KIP-17](https://kips.klaytn.foundation/KIPs/kip-17#kip-13-identifiers) có được triển khai hay không.

**Ví dụ**

```javascript
> kip17.detectInterface().then(console.log)
{
    IKIP17: true,
    IKIP17Metadata: true,
    IKIP17Enumerable: true,
    IKIP17Mintable: true,
    IKIP17MetadataMintable: true,
    IKIP17Burnable: true,
    IKIP17Pausable: true,
}
```


## kip17.supportsInterface <a id="kip17-supportsinterface"></a>

```javascript
kip17.supportsInterface(interfaceId)
```
Trả về `true` nếu hợp đồng này triển khai giao diện được xác định bởi `interfaceId`.

**Tham số**

| Tên         | Loại | Mô tả                          |
| ----------- | ----- | ------------------------------ |
| interfaceId | chuỗi | InterfaceId cần được kiểm tra. |

**Giá trị trả về**

`Promise` trả về `boolean`: `true` nếu hợp đồng này triển khai giao diện được xác định bởi `interfaceId`.

**Ví dụ**

```javascript
> kip17.supportsInterface('0x80ac58cd').then(console.log)
true

> kip17.supportsInterface('0xa22cb465').then(console.log)
false
```


## kip17.name <a id="kip17-name"></a>

```javascript
kip17.name()
```
Trả về tên của token.

**Tham số**

Không có

**Giá trị trả về**

`Promise` trả về `chuỗi`: Tên của token.

**Ví dụ**

```javascript
> kip17.name().then(console.log)
Jasmine
```


## kip17.symbol <a id="kip17-symbol"></a>

```javascript
kip17.symbol()
```
Trả về ký hiệu của token.

**Tham số**

Không có

**Giá trị trả về**

`Promise` trả về `chuỗi`: Ký hiệu của token.

**Ví dụ**

```javascript
> kip17.symbol().then(console.log)
JAS
```


## kip17.totalSupply <a id="kip17-totalsupply"></a>

```javascript
kip17.totalSupply()
```
Trả về tổng số token được tạo bởi hợp đồng.

**Tham số**

Không có

**Giá trị trả về**

`Promise` trả về `BigNumber`: Tổng số token.

**Ví dụ**

```javascript
> kip17.totalSupply().then(console.log)
10
```


## kip17.tokenURI <a id="kip17-tokenuri"></a>

```javascript
kip17.tokenURI(tokenId)
```
Trả về URI cho id token đã cho.

**Tham số**

| Tên     | type                             | Mô tả         |
| ------- | -------------------------------- | ------------- |
| tokenId | BigNumber \| chuỗi \| số | Id của token. |

**LƯU Ý** Tham số `tokenId` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `chuỗi`: URI của token đã cho.

**Ví dụ**

```javascript
> kip17.tokenURI(0).then(console.log)
https://kip17.example/uri-ex-caver.json
```


## kip17.tokenOfOwnerByIndex <a id="kip17-tokenofownerbyindex"></a>

```javascript
kip17.tokenOfOwnerByIndex(owner, index)
```
Tìm kiếm danh sách token của `chủ sở hữu` cho chỉ mục đã cho và trả về id token của token được xác định tại chỉ mục phù hợp trong danh sách nếu có kết quả khớp.ù hợp trong danh sách nếu có kết quả khớp.

**Tham số**

| Tên        | Loại                            | Mô tả                                                   |
| ---------- | -------------------------------- | ------------------------------------------------------- |
| chủ sở hữu | chuỗi                            | Địa chỉ của tài khoản sở hữu token.                     |
| chỉ mục    | BigNumber \| chuỗi \| số | Chỉ mục của token trong danh sách token của chủ sở hữu. |

**LƯU Ý** Tham số `index` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `BigNumber`: Id của token.

**Ví dụ**

```javascript
> kip17.tokenOfOwnerByIndex('0x{address in hex}', 5).then(console.log)
5
```


## kip17.tokenByIndex <a id="kip17-tokenbyindex"></a>

```javascript
kip17.tokenByIndex(index)
```
Tìm kiếm danh sách tất cả các token trong hợp đồng này cho chỉ mục đã cho và trả về id token của token được xác định tại chỉ mục phù hợp trong danh sách nếu có kết quả khớp.phù hợp trong danh sách nếu có kết quả khớp. Hoàn nguyên nếu chỉ số lớn hơn hoặc bằng tổng số token.

**Tham số**

| Tên     | type                                  | Mô tả                               |
| ------- | ------------------------------------- | ----------------------------------- |
| chỉ mục | BigNumber \| string \| number | Chỉ mục của token sẽ được truy vấn. |

**LƯU Ý** Tham số `index` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `BigNumber`: Id của token.

**Ví dụ**

```javascript
> kip17.tokenByIndex(1).then(console.log)
1
```


## kip17.balanceOf <a id="kip17-balanceof"></a>

```javascript
kip17.balanceOf(address)
```
Trả về số dư của địa chỉ tài khoản đã cho. Số dư của tài khoản trong KIP-17 là tổng số NFT (Token không thể thay thế) thuộc sở hữu của tài khoản.

**Tham số**

| Tên     | Loại | Mô tả                                         |
| ------- | ----- | --------------------------------------------- |
| address | chuỗi | Địa chỉ của tài khoản sẽ được kiểm tra số dư. |

**Giá trị trả về**

`Promise` trả về `BigNumber`: Số dư tài khoản.

**Ví dụ**

```javascript
> kip17.balanceOf('0x{address in hex}').then(console.log)
9
```


## kip17.ownerOf <a id="kip17-ownerof"></a>

```javascript
kip17.ownerOf(tokenId)
```
Trả về địa chỉ của chủ sở hữu id token đã chỉ định.

**Tham số**

| Tên     | Loại                            | Mô tả         |
| ------- | -------------------------------- | ------------- |
| tokenId | BigNumber \| chuỗi \| số | Id của token. |

**LƯU Ý** Tham số `tokenId` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `chuỗi`: Địa chỉ của tài khoản sở hữu token đã cho.

**Ví dụ**

```javascript
> kip17.ownerOf(8).then(console.log)
0x0e0E95426343d97CC7BB913C7D7DBea065A31814
```


## kip17.getApproved <a id="kip17-getapproved"></a>

```javascript
kip17.getApproved(tokenId)
```
Trả về địa chỉ được phép chuyển token này hoặc địa chỉ 'không' nếu không có địa chỉ nào được phê duyệt. Thao tác sẽ hoàn nguyên nếu id token đã cho không tồn tại.

**Tham số**

| Tên     | Loại                            | Mô tả         |
| ------- | -------------------------------- | ------------- |
| tokenId | BigNumber \| chuỗi \| số | Id của token. |

**LƯU Ý** Tham số `tokenId` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `chuỗi`: Địa chỉ của tài khoản có quyền chuyển token đã cho.

**Ví dụ**

```javascript
// If an approved address exists
> kip17.getApproved(10).then(console.log)
0x23D8E9cae17b22d3DAC65b4F7D2C737C6A7b865d

// If no approved address exists
> kip17.getApproved(3).then(console.log)
0x0000000000000000000000000000000000000000
```


## kip17.isApprovedForAll <a id="kip17-isapprovedforall"></a>

```javascript
kip17.isApprovedForAll(owner, operator)
```
Trả về `true` nếu một `người vận hành` được chấp thuận chuyển tất cả các token thuộc về `chủ sở hữu`.

**Tham số**

| Tên            | Loại | Mô tả                                                                                        |
| -------------- | ----- | -------------------------------------------------------------------------------------------- |
| chủ sở hữu     | chuỗi | Địa chỉ của tài khoản sở hữu token và đã cho phép người vận hành gửi tất cả các token.       |
| người vận hành | chuỗi | Địa chỉ của tài khoản được phê duyệt để gửi tất cả token của chủ sở hữu thay cho chủ sở hữu. |

**Giá trị trả về**

`Promise` trả lại`boolean`: `true` nếu một `người vận hành` được chấp thuận để gửi tất cả các token thuộc về `chủ sở hữu`.

**Ví dụ**

```javascript
> kip17.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
false

> kip17.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
true
```


## kip17.isMinter <a id="kip17-isminter"></a>

```javascript
kip17.isMinter(address)
```
Trả về `true` nếu tài khoản đã cho là người tạo token có thể phát hành token mới trong hợp đồng hiện tại tuân theo KIP-17.

**Tham số**

| Tên     | type  | Mô tả                                                          |
| ------- | ----- | -------------------------------------------------------------- |
| address | chuỗi | Địa chỉ của tài khoản cần kiểm tra xem có quyền tạo hay không. |

**Giá trị trả về**

`Promise` trả về `boolean`: `true` nếu tài khoản là một người tạo.

**Ví dụ**

```javascript
> kip17.isMinter('0x{address in hex}').then(console.log)
true

> kip17.isMinter('0x{address in hex}').then(console.log)
false
```


## kip17.paused <a id="kip17-paused"></a>

```javascript
kip17.paused()
```
Trả về `true` nếu hợp đồng bị tạm dừng hoặc trả về `false`.

**Tham số**

Không có

**Giá trị trả về**

`Promise` trả về `boolean`: `true` nếu hợp đồng bị tạm dừng.

**Ví dụ**

```javascript
> kip17.paused().then(console.log)
true

> kip17.paused().then(console.log)
false
```


## kip17.isPauser <a id="kip17-ispauser"></a>

```javascript
kip17.isPauser(address)
```
Trả về `true` nếu tài khoản đã cho là người tạm dừng có thể tạm dừng chuyển token.

**Tham số**

| Tên     | type  | Mô tả                                                                     |
| ------- | ----- | ------------------------------------------------------------------------- |
| address | chuỗi | Địa chỉ của tài khoản đã được kiểm tra để có quyền tạm dừng chuyển token. |

**Giá trị trả về**

`Promise` trả về `Boolean`: `true` nếu tài khoản là trình tạm dừng.

**Ví dụ**

```javascript
> kip17.isPauser('0x{address in hex}').then(console.log)
true

> kip17.isPauser('0x{address in hex}').then(console.log)
false
```


## kip17.approve <a id="kip17-approve"></a>

```javascript
kip17.approve(to, tokenId [, sendParam])
```
Phê duyệt một địa chỉ khác để chuyển token của id token đã cho. Địa chỉ số 0 cho biết không có địa chỉ nào được phê duyệt. Chỉ có thể có một địa chỉ được phê duyệt cho mỗi token. Phương pháp này chỉ được phép gọi bởi chủ sở hữu token hoặc người vận hành được phê duyệt.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại                            | Mô tả                                                          |
| --------- | -------------------------------- | -------------------------------------------------------------- |
| đến       | chuỗi                            | Địa chỉ của tài khoản sử dụng token thay cho chủ sở hữu.       |
| tokenId   | BigNumber \| chuỗi \| số | Id của token mà người chi tiêu được phép sử dụng.              |
| sendParam | đối tượng                        | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. |

**LƯU Ý** Tham số `tokenId` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

Đối tượng sendParam có thể chứa các thông tin sau:

| Tên           | Loại                                   | Mô tả                                                                                                                                                                                                                                                                                                                                  |
| ------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ            | chuỗi                                   | (tùy chọn) Địa chỉ mà giao dịch sẽ được gửi từ đó. Nếu bỏ qua tham số này thì sẽ được thiết lập bởi `kip17.options.from`. Nếu không cung cấp `from` trong đối tượng `sendParam` cũng như `kip17.options.from` thì sẽ xảy ra lỗi.                                                                                                       |
| gas           | số \| chuỗi                         | (tùy chọn) Lượng gas tối đa được cung cấp cho giao dịch này (giới hạn gas). Nếu bị bỏ qua, nó sẽ được thiết lập bởi caver-js bằng cách gọi `kip17.methods.approve(spender, tokenId).estimateGas({from})`.                                                                                                                              |
| giá gas       | số \| chuỗi                         | (tùy chọn) Giá gas tính bằng peb để sử dụng cho giao dịch này. Nếu bị bỏ qua, nó sẽ được thiết lập bởi caver-js bằng cách gọi `caver.klay.getGasPrice`.                                                                                                                                                                                |
| giá trị       | Số \| Chuỗi \| BN \| Số lớn | (tùy chọn) Giá trị được chuyển trong peb.                                                                                                                                                                                                                                                                                              |
| feeDelegation | boolean                                 | (tùy chọn, mặc định `sai`) Có sử dụng giao dịch ủy thác phí hay không. Nếu bỏ qua, `kip17.options.feeDelegation` sẽ được sử dụng. Nếu cả hai bị bỏ qua, ủy thác phí không được sử dụng.                                                                                                                                                |
| feePayer      | chuỗi                                   | (tùy chọn) Địa chỉ của người trả phí thanh toán phí giao dịch. Khi `feeDelegation` là `đúng`, giá trị sẽ được đặt thành trường `feePayer` trong giao dịch. Nếu bỏ qua, `kip17.options.feePayer` sẽ được sử dụng. Nếu cả hai bị bỏ qua, sẽ đưa ra một lỗi.                                                                              |
| feeRatio      | chuỗi                                   | (tùy chọn) Tỷ lệ phí giao dịch mà người trả phí sẽ phải chịu. Nếu `feeDelegation` là `đúng` và `feeRatio` được đặt thành giá trị hợp lệ thì giao dịch ủy thác phí một phần sẽ được sử dụng. Khoảng hợp lệ là từ 1 đến 99. Tỷ lệ không được phép bằng 0 hoặc bằng và cao hơn 100. Nếu bỏ qua, `kip17.options.feeRatio` sẽ được sử dụng. |

**LƯU Ý** `feeDelegation`, `feePayer` và `feeRatio` được hỗ trợ kể từ phiên bản caver-js[v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP-17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip17.approve('0x{address in hex}', 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x3875c3f3120c1773c3adeb97260808c8a385bf8427bc203d10cbc5d262f67dbc',
    blockNumber: 2650,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    trạng thái: true,
    to: '0x5e0e6f1f0bdf9a263e1b1bb6e9759ba182982377',
    ...
    events: {
        Approval: {
            address: '0x5E0e6F1F0bDf9A263e1B1bB6e9759Ba182982377',
            blockNumber: 2650,
            transactionHash: '0x0ae92570560d64fa103c8be1861c8625d34ac560066398d9ad0d389ad5f7e441',
            transactionIndex: 0,
            blockHash: '0x3875c3f3120c1773c3adeb97260808c8a385bf8427bc203d10cbc5d262f67dbc',
            logIndex: 0,
            id: 'log_55296c9d',
            returnValues: {
                '0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                '1': '0x58746F9D739bC81713E5F5512529876F508a6166',
                '2': '2',
                owner: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                approved: '0x58746F9D739bC81713E5F5512529876F508a6166',
                tokenId: '2',
            },
            event: 'Approval',
            signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
            raw: {
                data: '0x',
                topics: [ '0x8c5be...', '0x00...afd', '0x00...166', '0x00...002' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip17.approve('0x{address in hex}', 10, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.approve('0x{address in hex}', 10).then(console.log)
```


## kip17.setApprovalForAll <a id="kip17-setApprovalforall"></a>

```javascript
kip17.setApprovalForAll(to, approved [, sendParam])
```
Phê duyệt người vận hành đã cho `đến` hoặc không cho phép người vận hành đã cho chuyển tất cả token của chủ sở hữu.

Lưu ý rằng phương pháp setApprovalForAll sẽ gửi giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên        | Loại     | Mô tả                                                                                                                                              |
| ---------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| đến        | chuỗi     | Địa chỉ của tài khoản được phê duyệt/cấm chuyển tất cả các token của chủ sở hữu.                                                                   |
| chấp thuận | Boolean   | Người vận hành này sẽ được phê duyệt nếu `true`. Người vận hành sẽ không được phép nếu `false`.                                                    |
| sendParam  | đối tượng | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt][]. |

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP-17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip17.setApprovalForAll('0x{address in hex}', false, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x34379ac5b71f16f41d5171d021ca2945e02c60d9fb7f85fc0127262c2ce72b47',
    blockNumber: 3340,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    trạng thái: true,
    to: '0x1f15b1a4da5437b29bfb7f248b5e344e6b16b654',
    ...
    events: {
        ApprovalForAll: {
            address: '0x1f15B1A4DA5437b29BfB7f248B5e344E6b16b654',
            blockNumber: 3340,
            transactionHash: '0x72fdf23482b9cf164638e6cbdfdf56541a6189c88639e21f076a8a50ef749a50',
            transactionIndex: 0,
            blockHash: '0x34379ac5b71f16f41d5171d021ca2945e02c60d9fb7f85fc0127262c2ce72b47',
            logIndex: 0,
            id: 'log_1069ad22',
            returnValues: {
                '0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                '1': '0x399bE7034F26feFB5AE683e488903B8bE5ad38b8',
                '2': false,
                owner: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                operator: '0x399bE7034F26feFB5AE683e488903B8bE5ad38b8',
                approved: false,
            },
            event: 'ApprovalForAll',
            signature: '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31',
            raw: {
                data: '0x0000000000000000000000000000000000000000000000000000000000000000',
                topics: [ '0x17307...', '0x00...afd', '0x00...8b8' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip17.setApprovalForAll('0x{address in hex}', false, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.setApprovalForAll('0x{address in hex}', true).then(console.log)
```


## kip17.transferFrom <a id="kip17-transferfrom"></a>

```javascript
kip17.transferFrom(from, to, tokenId [, sendParam])
```
Chuyển token của id token đã cho, `tokenId` từ số dư của chủ sở hữu token sang địa chỉ khác. Địa chỉ được ủy quyền để gửi token của chủ sở hữu token (người vận hành) hoặc chính chủ sở hữu token sẽ thực hiện giao dịch chuyển token này. Do đó, tài khoản được ủy quyền hoặc chủ sở hữu token phải là người gửi giao dịch này và địa chỉ phải được cung cấp tại `sendParam.from` hoặc `kip17Instance.options.from`. Trừ khi cả `sendParam.from` và `kip17Instance.options.from` đều được cung cấp, nếu không sẽ xảy ra lỗi. Bạn nên sử dụng [safeTransferFrom](#kip17-safetransferfrom) bất cứ khi nào có thể thay vì phương pháp này.

Lưu ý rằng việc gửi giao dịch này sẽ tính phí giao dịch cho người gửi giao dịch.

**Tham số**

| Tên       | Loại                            | Mô tả                                                                                                                                              |
| --------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ        | chuỗi                            | Địa chỉ của chủ sở hữu hoặc người vận hành được phê duyệt của token đã cho.                                                                        |
| đến       | chuỗi                            | Địa chỉ tài khoản nhận token.                                                                                                                      |
| tokenId   | BigNumber \| chuỗi \| số | Id của token bạn muốn chuyển.                                                                                                                      |
| sendParam | đối tượng                        | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt][]. |

**LƯU Ý** Tham số `tokenId` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP-17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip17.transferFrom('0x{address in hex}', '0x{address in hex}', 2, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x9cae3aa93d327804f333674a77d5d01d8c7908c49749b0d747b6391faa232b58',
    blockNumber: 3592,
    contractAddress: null,
    from: '0x9c4fc0ab840914a29c7deb5cc5c625a4cec3a9cd',
    ...
    trạng thái: true,
    to: '0x6e611498570bbc8cb127899c4d24e156ec72473a',
    ...
    events: {
        Transfer: {
            address: '0x6e611498570bBc8cb127899C4D24e156ec72473a',
            blockNumber: 3592,
            transactionHash: '0x386af961e5acda2c5bd58ec71ee52f579dc2b07a2e5ec97678453f04cc1b709a',
            transactionIndex: 0,
            blockHash: '0x9cae3aa93d327804f333674a77d5d01d8c7908c49749b0d747b6391faa232b58',
            logIndex: 0,
            id: 'log_c2ba5874',
            returnValues: {
                '0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                '1': '0x045796ABC035001CF50274FcA8A2614Abf5dd6bf',
                '2': '2',
                from: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                to: '0x045796ABC035001CF50274FcA8A2614Abf5dd6bf',
                tokenId: '2',
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x',
                topics: [ '0xddf25...', '0x00...afd', '0x00...6bf', '0x00...002' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip17.transferFrom('0x{address in hex}', '0x{address in hex}', 2, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.transferFrom('0x{address in hex}', '0x{address in hex}', 2).then(console.log)
```


## kip17.safeTransferFrom <a id="kip17-safetransferfrom"></a>

```javascript
kip17.safeTransferFrom(from, to, tokenId [, data] [, sendParam])
```
Chuyển an toàn token của id token đã cho `tokenId` từ số dư của chủ sở hữu token sang địa chỉ khác. Địa chỉ được ủy quyền để gửi token của chủ sở hữu token (người vận hành) hoặc chính chủ sở hữu token sẽ thực hiện giao dịch chuyển token này. Do đó, địa chỉ được ủy quyền hoặc chủ sở hữu token phải là người gửi giao dịch này có địa chỉ phải được cung cấp tại `sendParam.from` hoặc `kip17Instance.options.from`. Trừ khi cả `sendParam.from` và `kip17Instance.options.from` đều được cung cấp, nếu không sẽ xảy ra lỗi.

Nếu `địa chỉ đến` là một địa chỉ hợp đồng, thì nó phải triển khai [IKIP17Receiver.onKIP17Received](https://kips.klaytn.foundation/KIPs/kip-17#wallet-interface).interface">IKIP17Receiver.onKIP17Received. Nếu không, quá trình chuyển sẽ được hoàn nguyên.

Lưu ý rằng việc gửi giao dịch này sẽ tính phí giao dịch cho người gửi giao dịch.

**Tham số**

| Tên       | Loại                            | Mô tả                                                                                                                                              |
| --------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ        | chuỗi                            | Địa chỉ của chủ sở hữu hoặc người vận hành được phê duyệt của token đã cho.                                                                        |
| đến       | chuỗi                            | Địa chỉ tài khoản nhận token.                                                                                                                      |
| tokenId   | BigNumber \| chuỗi \| số | Id của token bạn muốn chuyển.                                                                                                                      |
| data      | Bộ đệm \| chuỗi \| số    | (tùy chọn) Dữ liệu tùy chọn để gửi cùng với cuộc gọi.                                                                                              |
| sendParam | đối tượng                        | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt][]. |

**LƯU Ý** Tham số `tokenId` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP-17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given (without data)
> kip17.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 9, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x14c5bebc2be86081d8375ba11edba0e541be1df24c1beced1a9e82e3083a8035',
    blockNumber: 6260,
    contractAddress: null,
    from: '0x80b88b47361cec0baee1947868fc872b784cf91e',
    ...
    trạng thái: true,
    to: '0xa9066e2b62483bcdf6358874cb87f9e0046e8ad3',
    ...
    events: {
        Transfer: {
            address: '0xA9066e2B62483bcdf6358874CB87f9e0046E8ad3',
            blockNumber: 6260,
            transactionHash: '0x0a92436289e70018f9ebef0df5d3ce87874afd8e5058fcc08fefc6de3e0e9b36',
            transactionIndex: 0,
            blockHash: '0x14c5bebc2be86081d8375ba11edba0e541be1df24c1beced1a9e82e3083a8035',
            logIndex: 0,
            id: 'log_c9c17595',
            returnValues: {
                '0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                '1': '0x0F47Ea1A10B8F7D61c894E392EfaC990A314d313',
                '2': '9',
                from: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                to: '0x0F47Ea1A10B8F7D61c894E392EfaC990A314d313',
                tokenId: '9',
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x',
                topics: [ '0xddf25...', '0x00...afd', '0x00...313', '0x00...009' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip17.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 9, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Send via a sendParam object with the from field given (with data)
> kip17.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11, '0x1234', { from: '0x{address in hex}' }).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11).then(console.log)
```


## kip17.addMinter <a id="kip17-addminter"></a>

```javascript
kip17.addMinter(tài khoản [, sendParam])
```
Thêm tài khoản với tư cách là người tạo, người được phép tạo token.

Lưu ý rằng phương pháp addMinter sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | type      | Mô tả                                                                                                                                              |
| --------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| tài khoản | chuỗi     | Địa chỉ của tài khoản sẽ được thêm vào trong vai trò người tạo.                                                                                    |
| sendParam | đối tượng | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt][]. |

**LƯU Ý** Nếu `sendParam.from` hoặc `kip17.options.from` được cung cấp, thì đó phải là một người tạm dừng có PauserRole.là một người tạo.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP-17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip17.addMinter('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xecd0fb45a32323d5cb14558d1d9299393022d5e7284519598dbd8b14c4c55930',
    blockNumber: 8307,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    trạng thái: true,
    to: '0x1595b5c1027ed36dcb32e4d39766b896d5b97ecb',
    ...
    events: {
        MinterAdded: {
            address: '0x1595b5c1027ed36dCB32e4D39766b896d5B97ecb',
            blockNumber: 8307,
            transactionHash: '0xf8da21958c84aa3ed8bfa5eea0649c5b9a895efa8c7a715196e000bef4f0b8bd',
            transactionIndex: 0,
            blockHash: '0xecd0fb45a32323d5cb14558d1d9299393022d5e7284519598dbd8b14c4c55930',
            logIndex: 0,
            id: 'log_f40a92bf',
            returnValues: {
                '0': '0x90170C1E7E8C14BBf1124f52980372088BA540Dc',
                tài khoản: '0x90170C1E7E8C14BBf1124f52980372088BA540Dc',
            },
            event: 'MinterAdded',
            signature: '0x6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f6',
            raw: {
                data: '0x',
                topics: [ '0x6ae17...', '0x00...0dc' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip17.addMinter('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.addMinter('0x{address in hex}').then(console.log)
```


## kip17.renounceMinter <a id="kip17-renounceminter"></a>

```javascript
kip17.renounceMinter([sendParam])
```

Từ bỏ quyền tạo token. Chỉ một địa chỉ người tạo mới có thể từ bỏ quyền tạo.

Lưu ý rằng phương pháp renounceMinter sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | type      | Mô tả                                                                                                                                              |
| --------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | đối tượng | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt][]. |

Nếu `sendParam.from` hoặc `kip17.options.from` đã được cung cấp, thì đó phải là một minter với MinterRole.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP-17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip17.renounceMinter({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xe130d7ee71a2c55b3cf4e2bce9ea26e7c2cde556c7f8288abac60121b27c26c8',
    blockNumber: 8542,
    contractAddress: null,
    from: '0xb72f5cf2627e6614984d8a9f27ee426b29191831',
    ...
    trạng thái: true,
    to: '0xf9d0663fc29c48495f42c0b061cb06df6df76c34',
    ...
    events: {
        MinterRemoved: {
            address: '0xF9D0663fC29c48495F42c0b061cB06Df6DF76c34',
            blockNumber: 8542,
            transactionHash: '0x557a4e7b9fd6577ffdb14c2e1f00c0009a7bbda2294502fa765250632b5b0f99',
            transactionIndex: 0,
            blockHash: '0xe130d7ee71a2c55b3cf4e2bce9ea26e7c2cde556c7f8288abac60121b27c26c8',
            logIndex: 0,
            id: 'log_04b47645',
            returnValues: {
                '0': '0xB72F5cF2627e6614984D8A9F27eE426b29191831',
                tài khoản: '0xB72F5cF2627e6614984D8A9F27eE426b29191831',
            },
            event: 'MinterRemoved',
            signature: '0xe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb66692',
            raw: {
                data: '0x',
                topics: [ '0xe9447...', '0x00...831' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip17.renounceMinter({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.renounceMinter().then(console.log)
```


## kip17.mintWithTokenURI <a id="kip17-mintwithtokenuri"></a>

```javascript
kip17.mintWithTokenURI(to, tokenId, tokenURI [, sendParam])
```
Tạo token với uri đã cho và gán chúng cho tài khoản đã cho. Phương pháp này làm tăng tổng nguồn cung của token này.

Lưu ý rằng phương pháp mintWithTokenURI sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại                            | Mô tả                                                                                                                                              |
| --------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| đến       | chuỗi                            | Địa chỉ của tài khoản mà token tạo sẽ được phát hành.                                                                                              |
| tokenId   | BigNumber \| chuỗi \| số | Id của token sẽ được tạo.                                                                                                                          |
| tokenURI  | chuỗi                            | Chuỗi uri của token sẽ được tạo.                                                                                                                   |
| sendParam | đối tượng                        | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt][]. |

**LƯU Ý** Tham số `tokenId` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**LƯU Ý** Nếu `sendParam.from` hoặc `kip17.options.from` được cung cấp, thì đó phải là một người tạm dừng có PauserRole.là một người tạo có vai trò MinterRole.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP-17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip17.mintWithTokenURI('0x{address in hex}', 18, tokenURI, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xd2473b9853ad33c5fa0a75187e65733614ed4f8c937d06e239768a5ca32d7c7f',
    blockNumber: 9313,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    trạng thái: true,
    to: '0x7fbf73709054007f5262692f8faf27dee75ab3a6',
    ...
    events: {
        Transfer: {
            address: '0x7FBf73709054007f5262692f8FaF27dEE75Ab3A6',
            blockNumber: 9313,
            transactionHash: '0x17c2eda25c8a817915e3dd77b4fb4838259e8b49ae1c0d8e369167f715a08e7f',
            transactionIndex: 0,
            blockHash: '0xd2473b9853ad33c5fa0a75187e65733614ed4f8c937d06e239768a5ca32d7c7f',
            logIndex: 0,
            id: 'log_d060e77e',
            returnValues: {
                '0': '0x0000000000000000000000000000000000000000',
                '1': '0x203ad91221290901CFDAC9399aCf664499924744',
                '2': '18',
                from: '0x0000000000000000000000000000000000000000',
                to: '0x203ad91221290901CFDAC9399aCf664499924744',
                tokenId: '18',
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x',
                topics: [ '0xddf25...', '0x00...000', '0x00...744', '0x00...012' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip17.mintWithTokenURI('0x{address in hex}', 18, tokenURI, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.mintWithTokenURI('0x{address in hex}', 18, tokenURI).then(console.log)
```


## kip17.burn <a id="kip17-burn"></a>

```javascript
kip17.burn(tokenId [, sendParam])
```
Hủy token của id token đã cho. Nếu không cung cấp `sendParam.from` hoặc `kip17.options.from` thì sẽ xảy ra lỗi.

Lưu ý rằng phương pháp ghi sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại                            | Mô tả                                                                                                                                              |
| --------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenId   | BigNumber \| chuỗi \| số | Id của token sẽ bị phá hủy.                                                                                                                        |
| sendParam | đối tượng                        | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt][]. |

**LƯU Ý** Tham số `tokenId` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP-17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip17.burn(14, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x09d8ed5582fdd1c39b0f19f14f065659fe275a60856d86a1840535f6df1a2d51',
    blockNumber: 18237,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    trạng thái: true,
    to: '0x2032e61c79a951aacef8033adca96fc3b9b747b4',
    ...
    events: {
        Transfer: {
            address: '0x2032e61C79A951AACEf8033AdCa96fC3b9b747b4',
            blockNumber: 18237,
            transactionHash: '0x4e377d8d65c8565c7bc91568bcdcc0fddeb46a02a778725e437f368a8d9c6165',
            transactionIndex: 0,
            blockHash: '0x09d8ed5582fdd1c39b0f19f14f065659fe275a60856d86a1840535f6df1a2d51',
            logIndex: 0,
            id: 'log_5af49695',
            returnValues: {
                '0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '14',
                from: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                to: '0x0000000000000000000000000000000000000000',
                tokenId: '14',
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x',
                topics: [ '0xddf25...', '0x00...afd', '0x00...000', '0x00...00e' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip17.burn(14, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.burn(14).then(console.log)
```


## kip17.pause <a id="kip17-pause"></a>

```javascript
kip17.pause([sendParam])
```
Tạm dừng các chức năng liên quan đến việc gửi token.

Lưu ý rằng phương pháp tạm dừng sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại     | Mô tả                                                                                                                                              |
| --------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | đối tượng | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt][]. |

**LƯU Ý** Nếu `sendParam.from` hoặc `kip17.options.from` được cung cấp, thì đó phải là một người tạm dừng có PauserRole.là một người tạm dừng có vai trò PauserRole.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP-17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip17.pause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xd73c026474b2077a04808ed0ce6713821eaa8afaed476b19d22b28e483747e04',
    blockNumber: 19826,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    trạng thái: true,
    to: '0x601c11f396e92436df8d9bbaff3fbfec906b7f67',
    ...
    events: {
        Paused: {
            address: '0x601C11F396E92436Df8d9bBAFf3fbfEc906B7f67',
            blockNumber: 19826,
            transactionHash: '0x549f7786ca5d2c1877be20126fc51c2418194ecaa8cea536d08f72c2f01919d0',
            transactionIndex: 0,
            blockHash: '0xd73c026474b2077a04808ed0ce6713821eaa8afaed476b19d22b28e483747e04',
            logIndex: 0,
            id: 'log_93d26310',
            returnValues: {
                '0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                tài khoản: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
            },
            event: 'Paused',
            signature: '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258',
            raw: {
                data: '0x0000000000000000000000001147c04b90d1546d76983e19937ad2cdae8b8afd',
                topics: ['0x62e78...'],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip17.pause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.pause().then(console.log)
```


## kip17.unpause <a id="kip17-unpause"></a>

```javascript
kip17.unpause([sendParam])
```
Tiếp tục hợp đồng bị tạm dừng.

Lưu ý rằng phương pháp bỏ tạm dừng sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại     | Mô tả                                                                                                                                              |
| --------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | đối tượng | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt][]. |

**LƯU Ý** Nếu `sendParam.from` hoặc `kip17.options.from` được cung cấp, thì đó phải là một người tạm dừng có PauserRole.là một người tạm dừng có PauserRole.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP-17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip17.unpause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x6a9fc0c70853e696e687b119ba95971a42d91616a040ec17afe1fd4803f5a6cb',
    blockNumber: 19845,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    trạng thái: true,
    to: '0x601c11f396e92436df8d9bbaff3fbfec906b7f67',
    ...
    events: {
        Unpaused: {
            address: '0x601C11F396E92436Df8d9bBAFf3fbfEc906B7f67',
            blockNumber: 19845,
            transactionHash: '0x4f0d2767fc36e5062a34753bc447a2c15b476c304f8e9e013ddf06124db33229',
            transactionIndex: 0,
            blockHash: '0x6a9fc0c70853e696e687b119ba95971a42d91616a040ec17afe1fd4803f5a6cb',
            logIndex: 0,
            id: 'log_364c25d2',
            returnValues: {
                '0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                tài khoản: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
            },
            event: 'Unpaused',
            signature: '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa',
            raw: {
                data: '0x0000000000000000000000001147c04b90d1546d76983e19937ad2cdae8b8afd',
                topics: ['0x5db9e...'],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip17.unpause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.unpause().then(console.log)
```


## kip17.addPauser <a id="kip17-addpauser"></a>

```javascript
kip17.addPauser(tài khoản [, sendParam])
```
Thêm một tài khoản làm trình tạm dừng có quyền tạm dừng hợp đồng.

Lưu ý rằng phương pháp addPauser sẽ gửi giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại     | Mô tả                                                                                                                                              |
| --------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| tài khoản | chuỗi     | Địa chỉ của tài khoản sẽ là địa chỉ tạm dừng mới.                                                                                                  |
| sendParam | đối tượng | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt][]. |

**LƯU Ý** Nếu `sendParam.from` hoặc `kip17.options.from` được cung cấp, thì đó phải là một người tạm dừng có PauserRole.là một người tạm dừng có PauserRole.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP-17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip17.addPauser('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xd9f18912c9666a67a2e7445af0abe5140212955b3d35c491e5475d512fdee7d5',
    blockNumber: 20502,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    trạng thái: true,
    to: '0x4010afbfbf8d94830b226fc5ff311859af806b90',
    ...
    events: {
        PauserAdded: {
            address: '0x4010afbfbF8d94830b226Fc5ff311859AF806B90',
            blockNumber: 20502,
            transactionHash: '0x5f6fef2df70dcbe67e6d74e201005b618da5d53ac2f85ad31fce39226fd1b70b',
            transactionIndex: 0,
            blockHash: '0xd9f18912c9666a67a2e7445af0abe5140212955b3d35c491e5475d512fdee7d5',
            logIndex: 0,
            id: 'log_bf9f8982',
            returnValues: {
                '0': '0xD050b56bB04Da257D144e6b382318A2B8c58b0B2',
                tài khoản: '0xD050b56bB04Da257D144e6b382318A2B8c58b0B2',
            },
            event: 'PauserAdded',
            signature: '0x6719d08c1888103bea251a4ed56406bd0c3e69723c8a1686e017e7bbe159b6f8',
            raw: {
                data: '0x',
                topics: [ '0x6719d...', '0x00...0b2' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip17.addPauser('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.addPauser('0x{address in hex}').then(console.log)
```


## kip17.renouncePauser <a id="kip17-renouncepauser"></a>

```javascript
kip17.renouncePauser([sendParam])
```
Từ bỏ quyền tạm dừng hợp đồng. Chỉ một địa chỉ tạm dừng mới có thể từ bỏ quyền tạm dừng của chính nó.

Lưu ý rằng phương pháp renouncePauser sẽ gửi giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại     | Mô tả                                                                                                                                              |
| --------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | đối tượng | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt][]. |

**LƯU Ý** Nếu `sendParam.from` hoặc `kip17.options.from` được cung cấp, thì đó phải là một người tạm dừng có PauserRole.là một người tạm dừng có PauserRole.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP-17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip17.renouncePauser({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x32bb338ca23846478934416d1b1f4152b69a49411d61b316cff8b3a7d62ca91e',
    blockNumber: 20512,
    contractAddress: null,
    from: '0xe04cb220e94e6595427568c954b5d819392813bc',
    ...
    trạng thái: true,
    to: '0x4010afbfbf8d94830b226fc5ff311859af806b90',
    ...
    events: {
        PauserRemoved: {
            address: '0x4010afbfbF8d94830b226Fc5ff311859AF806B90',
            blockNumber: 20512,
            transactionHash: '0x72982fa8a8de25c961cd19bd91aa7acf0111feb8e9026e607d89843bcd8f783a',
            transactionIndex: 0,
            blockHash: '0x32bb338ca23846478934416d1b1f4152b69a49411d61b316cff8b3a7d62ca91e',
            logIndex: 0,
            id: 'log_0a9d1350',
            returnValues: {
                '0': '0xE04cB220e94E6595427568c954b5D819392813bC',
                tài khoản: '0xE04cB220e94E6595427568c954b5D819392813bC',
            },
            event: 'PauserRemoved',
            signature: '0xcd265ebaf09df2871cc7bd4133404a235ba12eff2041bb89d9c714a2621c7c7e',
            raw: {
                data: '0x',
                topics: [ '0xcd265...', '0x00...3bc' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip17.renouncePauser({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.renouncePauser().then(console.log)
```

[getTransactionReceipt]: ../caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt
[phê duyệt]: #kip17-approve