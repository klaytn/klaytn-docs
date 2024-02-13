# caver.kct.kip37

`caver.kct.kip37` giúp bạn dễ dàng xử lý hợp đồng thông minh triển khai KIP-37 dưới dạng đối tượng JavaScript trên nền tảng chuỗi khối Klaytn (Klaytn).

`caver.kct.kip37` kế thừa [caver.contract](../caver.contract.md) để triển khai hợp đồng token KIP-37. `caver.kct.kip37` chứa các thuộc tính giống như của `caver.contract` trong khi các phương pháp bổ sung được triển khai cho các tính năng bổ sung. Phần này chỉ giới thiệu các phương pháp mới được thêm vào của `caver.kct.kip37`.

Mã triển khai KIP-37 cho caver-js hiện có trên [Klaytn Contracts Github Repo](https://github.com/klaytn/klaytn-contracts/tree/master/contracts/KIP/token/KIP37). KIP-37 cho caver-js hỗ trợ giao diện Ownable. Sử dụng giao diện này, bạn có thể chỉ định chủ sở hữu hợp đồng khi triển khai hợp đồng

Để biết thêm thông tin về KIP-37, hãy xem [Đề xuất cải tiến Klaytn](https://kips.klaytn.foundation/KIPs/kip-37).

**LƯU Ý** `caver.kct.kip37` được hỗ trợ kể từ caver-js [v1.5.7](https://www.npmjs.com/package/caver-js/v/1.5.7).

## caver.kct.kip37.deploy <a id="caver-klay-kip37-deploy"></a>

```javascript
caver.kct.kip37.deploy(tokenInfo, deployer)
```

Triển khai hợp đồng token KIP-37 cho chuỗi khối Klaytn. Hợp đồng được triển khai bằng cách sử dụng caver.kct.kip37.deploy là một đa token tuân theo tiêu chuẩn KIP-37.

Sau khi triển khai thành công, promise sẽ được giải quyết bằng phiên bản KIP37 mới.

**Tham số**

| Tên       | type      | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenInfo | đối tượng | Thông tin cần thiết để triển khai hợp đồng token KIP-37 trên chuỗi khối Klaytn. Xem bảng dưới đây để biết thông tin chi tiết. trình triển khai                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| chuỗi \\  | đối tượng | Địa chỉ trong phiên bản keyring để triển khai hợp đồng mã thông báo KIP-37. Địa chỉ này phải có đủ KLAY để triển khai. Xem [Keyring](../caver-wallet/keyring.md#caver-wallet-keyring) để biết thêm chi tiết. Nếu bạn muốn xác định các trường của mình sẽ sử dụng khi gửi giao dịch, bạn có thể chuyển loại đối tượng làm tham số. Tương tự, nếu bạn muốn sử dụng Ủy thác phí khi triển khai các hợp đồng KIP-37, bạn có thể xác định các trường liên quan đến ủy thác phí trong đối tượng. Đối với các trường có thể được xác định trong đối tượng, hãy tham khảo mô tả tham số của [tạo](#kip37-create). Đối tượng tokenInfo phải chứa các thông tin sau: Tên Loại Mô tả uri |

chuỗi

| URI cho tất cả các loại token, bằng cách dựa vào [cơ chế thay thế ID loại token](http://kips.klaytn.foundation/KIPs/kip-37#metadata). | **Giá trị trả về** | `PromiEvent`: Bộ phát sự kiện kết hợp promise, được giải quyết bằng một phiên bản KIP37 mới. |
| ------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | -------------------------------------------------------------------------------------------- |
| Ngoài ra, có thể xảy ra các sự kiện sau đây:                                                                                          | Tên                | type                                                                                         |

Mô tả

transactionHash chuỗi

| Được kích hoạt ngay sau khi giao dịch được gửi và có sẵn hàm băm giao dịch.                                                                                                                                                                                                                                                                                                 | biên lai                                          | đối tượng                                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Được kích hoạt khi có biên lai giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên lai, hãy xem [getTransactionReceipt][]. Biên lai từ các phiên bản KIP37 có thuộc tính 'sự kiện' được phân tích cú pháp qua abi thay vì thuộc tính 'bản ghi'. | lỗi                                               | Lỗi                                                                                                                                                                                       |
| Được kích hoạt nếu xảy ra lỗi trong quá trình gửi.                                                                                                                                                                                                                                                                                                                          | **Đăng ký token**                                 | Để đăng ký token trên trình khám phá khối, người tạo hợp đồng phải điền vào biểu mẫu yêu cầu gửi. Ghi lại các thông tin cụ thể được yêu cầu trên biểu mẫu. Môi trường hợp đồng thông minh |
| Loại trình biên dịch: Solidity                                                                                                                                                                                                                                                                                                                                              | Phiên bản trình biên dịch: v0.8.4+commit.c7e474f2 | Loại giấy phép mã nguồn mở: MIT                                                                                                                                                           |

Chi tiết hợp đồng thông minh

1. Tối ưu hóa: --optimize-run 200 Mã nguồn: [Liên kết Github hợp đồng KIP37](https://github.com/klaytn/caver-js/blob/dev/packages/caver-kct/src/kip37Token.sol).

2. Giá trị được mã hóa ABI: [kip37JsonInterface tại dev · klaytn/caver-js · GitHub](https://github.com/klaytn/caver-js/blob/dev/packages/caver-kct/src/kctHelper.js#L1329-L2374)

   - **Ví dụ**

   - caver.kct.kip37.detectInterface <a id="caver-kct-kip37-detectinterface"></a>

   - Trả về thông tin của giao diện được triển khai bởi hợp đồng token.

3. Hàm tĩnh này sẽ sử dụng [kip37.detectInterface](#kip37-detectinterface).

   - **Tham số**

   - Tên

4. Loại

Mô tả

```javascript
// using the promise
> caver.kct.kip37.deploy({
    uri: 'https://caver.example/{id}.json',
}, '0x{address in hex}').then(console.log)
KIP37 {
    ...
    _address: '0x7314B733723AA4a91879b15a6FEdd8962F413CB2',
    _jsonInterface: [
        ...
        {
            anonymous: false,
            inputs: [{ indexed: false, name: 'value', type: 'string' }, { indexed: true, name: 'id', type: 'uint256' }],
            name: 'URI',
            type: 'event',
            signature: '0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b',
        }
    ] 
}

// Send object as second parameter
> caver.kct.kip37.deploy({
    uri: 'https://caver.example/{id}.json',
    },
    {
        from: '0x{address in hex}',
        feeDelegation: true,
        feePayer: '0x{address in hex}',
    }).then(console.log)

// using event emitter and promise
> caver.kct.kip37.deploy({
    uri: 'https://caver.example/{id}.json',
}, '0x{address in hex}')
.on('error', function(error) { ... })
.on('transactionHash', function(transactionHash) { ... })
.on('receipt', function(receipt) {
    console.log(receipt.contractAddress) // contains the new token contract address
})
.then(function(newKIP37Instance) {
    console.log(newKIP37Instance.options.address) // instance with the new token contract address
})
```

## contractAddress

```javascript
caver.kct.kip37.detectInterface(contractAddress)
```

chuỗi Địa chỉ của hợp đồng token KIP-37

**Giá trị trả về**

| `Promise` trả về một `đối tượng` chứa kết quả với các giá trị boolean cho dù từng [giao diện KIP-37](https://kips.klaytn.foundation/KIPs/kip-37#kip-13-identifiers) có được triển khai hay không. | **Ví dụ**                                              | caver.kct.kip37.create <a id="caver-kct-kip37-create"></a>                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Tạo một phiên bản KIP37 mới với các phương pháp và sự kiện liên kết của nó.                                                                                                                       | Hàm này hoạt động tương tự như [ KIP37 mới](#new-kip37). | **LƯU Ý** `caver.kct.kip37.create` được hỗ trợ kể từ caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1). |

**Tham số**

Xem [KIP37 mới](#new-kip37).

**Giá trị trả về**

```javascript
> caver.kct.kip37.detectInterface('0x{address in hex}').then(console.log)
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}
```

## Xem [KIP37 mới](#new-kip37).

```javascript
caver.kct.kip37.create([tokenAddress])
```

**Ví dụ** kIP37 mới <a id="new-kip37"></a>

Tạo một phiên bản KIP37 mới với các phương pháp và sự kiện liên kết của nó.

**Tham số**

Tên

Loại

Mô tả

tokenAddress

```javascript
// Create a KIP37 instance without a parameter
> const kip37 = caver.kct.kip37.create()

// Create a KIP37 instance with a token address
> const kip37 = caver.kct.kip37.create('0x{address in hex}')
```

## chuỗi

```javascript
new caver.kct.kip37([tokenAddress])
```

(tùy chọn) Địa chỉ của hợp đồng mã thông báo KIP-37, có thể được chỉ định sau thông qua `kip37.options.address = '0x1234..'`

**Giá trị trả về**

| Loại                                                           | Mô tả       | đối tượng                            |
| --------------------------------------------------------------- | ----------- | ------------------------------------ |
| Phiên bản KIP37 với các phương pháp và sự kiện liên kết của nó. | **Ví dụ** | kip37.clone <a id="kip37-clone"></a> |

Sao chép phiên bản KIP37 hiện tại.

| **Tham số** | Tên   |
| ----------- | ----- |
| Loại       | Mô tả |

tokenAddress

```javascript
// Create a KIP37 instance without a parameter
> const kip37 = new caver.kct.kip37()

// Create a KIP37 instance with a token address
> const kip37 = new caver.kct.kip37('0x{address in hex}')
```

## chuỗi

```javascript
kip37.clone([tokenAddress])
```

(tùy chọn) Địa chỉ của hợp đồng thông minh đã triển khai token KIP37- khác. Nếu bị bỏ qua, nó sẽ được đặt thành địa chỉ hợp đồng trong trường hợp ban đầu.

**Giá trị trả về**

| Loại                                | Mô tả       | đối tượng                                                                                                                   |
| ------------------------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| Bản sao của phiên bản KIP37 ban đầu. | **Ví dụ** | kip37.detectInterface <a id="kip37-detectinterface"></a> Trả về thông tin của giao diện được triển khai bởi hợp đồng token. |

**Tham số**

| Không có                                                                                                                                                                                          | **Giá trị trả về** |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `Promise` trả về một `đối tượng` chứa kết quả với các giá trị boolean cho dù từng [giao diện KIP-37](https://kips.klaytn.foundation/KIPs/kip-37#kip-13-identifiers) có được triển khai hay không. | **Ví dụ**          |

kip37.supportsInterface <a id="kip37-supportsinterface"></a>

```javascript
> const kip37 = new caver.kct.kip37(address)

// Clone without a parameter
> const cloned = kip37.clone()

// Clone with the address of the new token contract
> const cloned = kip37.clone('0x{address in hex}')
```

## Trả về `true` nếu hợp đồng này triển khai giao diện được xác định bởi `interfaceId`.

```javascript
kip37.detectInterface()
```

**Tham số**

Tên

Loại

Mô tả

interfaceId

chuỗi

```javascript
> kip37.detectInterface().then(console.log)
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}
```

## InterfaceId cần được kiểm tra.

```javascript
kip37.supportsInterface(interfaceId)
```

**Giá trị trả về**

`Promise` trả về `boolean`: `true` nếu hợp đồng này triển khai giao diện được xác định bởi `interfaceId`.

| **Ví dụ**                                                                                                             | kip37.uri <a id="kip37-uri"></a>                                                              | Trả về Mã định danh tài nguyên thống nhất (URI) riêng biệt của token đã cho. |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Nếu chuỗi `{id}` tồn tại trong bất kỳ URI nào, hàm này sẽ thay thế chuỗi này bằng ID token thực ở dạng thập lục phân. | Vui lòng tham khảo [Siêu dữ liệu KIP-34](http://kips.klaytn.foundation/KIPs/kip-37#metadata). | **Tham số**                                                                                     |

Tên

type

Mô tả

```javascript
> kip37.supportsInterface('0x6433ca1f').then(console.log)
true

> kip37.supportsInterface('0x3a2820fe').then(console.log)
false
```

## id

```javascript
BigNumber \
```

chuỗi \\

số
Id token để nhận uri.

**LƯU Ý** Tham số `id` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi.

| Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`. | **Giá trị trả về**                               | `Promise` trả về `chuỗi`: Uri của token.       |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------- |
| **Ví dụ**                                                                                                               | kip37.totalSupply <a id="kip37-totalsupply"></a> | Trả về tổng nguồn cung token của token cụ thể. |

**Tham số** Tên

Loại

Mô tả

id

```javascript
> kip37.uri('0x0').then(console.log)
'https://caver.example/0000000000000000000000000000000000000000000000000000000000000000.json'
```

## BigNumber \\

```javascript
kip37.totalSupply(id)
```

chuỗi \\

số

| Id token để xem tổng nguồn cung. | **LƯU Ý** Tham số `id` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. | Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`. |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Giá trị trả về**               | `Promise` trả về `BigNumber`: Tổng số token.                                                                                                                                                                                              | **Ví dụ**                                                                                                               |

kip37.balanceOf <a id="kip37-balanceof"></a> Trả về số lượng token loại token `id` thuộc sở hữu của `tài khoản`.

**Tham số**

Tên

type

```javascript
> kip37.totalSupply(0).then(console.log)
10000000000
```

## Mô tả

```javascript
kip37.balanceOf(account, id)
```

tài khoản

chuỗi

| Địa chỉ của tài khoản mà bạn muốn xem số dư.                                                                                                                                                                                              | id                                                                                                                        | BigNumber \\           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| chuỗi \\                                                                                                                                                                                                                                  | số                                                                                                                        | Id token để xem số dư. |
| **LƯU Ý** Tham số `id` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. | Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`. | **Giá trị trả về**     |

`Promise` trả về `BigNumber`: Số lượng token mà tài khoản đó có. **Ví dụ**

kip37.balanceOfBatch <a id="kip37-balanceofbatch"></a>

Trả về số dư của nhiều cặp tài khoản/token.

`balanceOfBatch` là hoạt động hàng loạt của [balanceOf](#kip37-balanceof) và độ dài của các mảng có `tài khoản` và `id` phải giống nhau.

```javascript
> kip37.balanceOf('0x{address in hex}', 0).then(console.log)
20
```

## **Tham số**

```javascript
kip37.balanceOfBatch(accounts, ids)
```

Tên Loại

Mô tả

| tài khoản          | Mảng                                                          | Địa chỉ của tài khoản mà bạn muốn xem số dư. |
| ------------------ | ------------------------------------------------------------- | -------------------------------------------- |
| id                 | Mảng                                                          | Một mảng id token để xem số dư.              |
| **Giá trị trả về** | `Promise` trả về `Mảng`: Số dư của nhiều cặp tài khoản/token. | **Ví dụ**                                  |

kip37.isMinter <a id="kip37-isminter"></a>

Trả về `true` nếu tài khoản đã cho là người tạo có thể phát hành token KIP37 mới.

**Tham số**

```javascript
> kip37.balanceOfBatch(['0x{address in hex}', '0x{address in hex}'], [0, 1]).then(console.log)
[ 20, 30 ]
```

## Tên

```javascript
kip37.isMinter(address)
```

Loại

Mô tả

| address            | chuỗi                                                            | Địa chỉ của tài khoản cần kiểm tra xem có quyền tạo hay không. |
| ------------------ | ---------------------------------------------------------------- | -------------------------------------------------------------- |
| **Giá trị trả về** | `Promise` trả về `boolean`: `true` nếu tài khoản là một thợ đào. | **Ví dụ**                                                    |

kip37.isPauser <a id="kip37-ispauser"></a>

Trả về `true` nếu tài khoản đã cho là người tạm dừng có thể tạm dừng chuyển token.

**Tham số**

```javascript
> kip37.isMinter('0x{address in hex}').then(console.log)
true

> kip37.isMinter('0x{address in hex}').then(console.log)
false
```

## Tên

```javascript
kip37.isPauser(address)
```

Loại

Mô tả

| address            | chuỗi                                                               | Địa chỉ của tài khoản đã được kiểm tra để có quyền tạm dừng chuyển token. |
| ------------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **Giá trị trả về** | `Promise` trả về `Boolean`: `true` nếu tài khoản là trình tạm dừng. | **Ví dụ**                                                               |

kip37.paused <a id="kip37-paused"></a>

Trả về liệu giao dịch của hợp đồng token (hoặc token cụ thể) có bị tạm dừng hay không.

Nếu tham số id không được xác định, hãy trả về xem giao dịch của hợp đồng token có bị tạm dừng hay không.

```javascript
> kip37.isPauser('0x{address in hex}').then(console.log)
true

> kip37.isPauser('0x{address in hex}').then(console.log)
false
```

## Nếu tham số id được xác định, hãy trả về xem token cụ thể có bị tạm dừng hay không.

```javascript
kip37.paused()
```

**Tham số**

Tên Loại

Mô tả

| id | BigNumber \\                                                                                                                                                                            | chuỗi \\                                                                                                                                                                                                                                                                                                                                                            |
| -- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| số | (tùy chọn) Id token để kiểm tra thời tiết có bị tạm dừng hay không. Nếu tham số này bị bỏ qua, hàm `paused` trả về liệu hợp đồng có ở trạng thái tạm dừng hay không. | **LƯU Ý** Tham số `id` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`. |

**Giá trị trả về** `Promise` trả về `boolean`: `true` nếu hợp đồng (hoặc mã thông báo cụ thể) bị tạm dừng.

**Ví dụ**

kip37.isApprovedForAll <a id="kip37-isApprovedforall"></a>

Truy vấn trạng thái phê duyệt của một người vận hành cho một chủ sở hữu nhất định.

```javascript
// without token id parameter
> kip37.paused().then(console.log)
true
> kip37.paused().then(console.log)
false

// with token id parameter
> kip37.paused(0).then(console.log)
true
> kip37.paused(1).then(console.log)
false
```

## Trả về `true` nếu người vận hành được chủ sở hữu nhất định chấp thuận.

```javascript
kip37.isApprovedForAll(owner, operator)
```

**Tham số** Tên

type

| Mô tả                       | chủ sở hữu         | chuỗi                                                                         |
| --------------------------- | ------------------ | ----------------------------------------------------------------------------- |
| Địa chỉ của chủ sở hữu.     | người vận hành     | chuỗi                                                                         |
| Địa chỉ của người vận hành. | **Giá trị trả về** | `Promise` trả về `boolean`: Đúng nếu người vận hành chấp thuận, sai nếu không |

**Ví dụ**

kip37.create <a id="kip37-create"></a>

Tạo một loại token mới và chỉ định `initialSupply` cho người tạo.

```javascript
> kip37.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
true

> kip37.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
false
```

## Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi giao dịch.

```javascript
kip37.create(id, initialSupply [, uri] [, sendParam])
```

**Tham số**

Tên

type

| Mô tả         | id                                                        | BigNumber \\     |
| ------------- | --------------------------------------------------------- | ---------------- |
| chuỗi \\      | số                                                        | Id token để tạo. |
| initialSupply | BigNumber \\                                              | chuỗi \\         |
| số            | Số lượng token được tạo.                                  | uri              |
| chuỗi         | (tùy chọn) URI token của token đã tạo. | sendParam        |

đối tượng (tùy chọn) Một đối tượng chứa các tham số cần thiết để gửi giao dịch.

**LƯU Ý** Các tham số `id`, `initialSupply` chấp nhận loại `number` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, nó có thể gây ra lỗi hoặc kết quả không mong muốn.

| Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.                                                                                                                                                                                                                                 | Đối tượng `sendParam` chứa các thông tin sau:                                                                                                     | Tên                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Loại                                                                                                                                                                                                                                                                                                                                                     | Mô tả                                                                                                                                             | từ chuỗi (tùy chọn) Địa chỉ mà giao dịch sẽ được gửi từ đó. Nếu bỏ qua tham số này thì sẽ được thiết lập bởi `kip37.options.from`. Nếu không cung cấp `from` trong đối tượng `sendParam` cũng như `kip37.options.from` thì sẽ xảy ra lỗi.                                                                                                                                                                                           |
| gas                                                                                                                                                                                                                                                                                                                                                       | số \\                                                                                                                                             | chuỗi (tùy chọn) Lượng gas tối đa được cung cấp cho giao dịch này (giới hạn gas). Nếu bị bỏ qua, nó sẽ được thiết lập bởi caver-js bằng cách gọi `kip37.methods.approve(spender,mount).estimateGas({from})`.                                                                                                                                                                                                     |
| giá gas                                                                                                                                                                                                                                                                                                                                                   | số \\                                                                                                                                             | chuỗi (tùy chọn) Giá gas tính bằng peb cho giao dịch này. Nếu bị bỏ qua, nó sẽ được thiết lập bởi caver-js bằng cách gọi `caver.klay.getGasPrice`.                                                                                                                                                                                                                                                                                  |
| giá trị                                                                                                                                                                                                                                                                                                                                                   | Số \\                                                                                                                                             | Chuỗi \\                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| BN \\                                                                                                                                                                                                                                                                                                                                                     | Số lớn                                                                                                                                            | (tùy chọn) Giá trị được chuyển trong peb. feeDelegation boolean                                                                                                                                                                                                                                                                                                                                                                     |
| (tùy chọn, mặc định `sai`) Có sử dụng giao dịch ủy thác phí hay không. Nếu bỏ qua, `kip37.options.feeDelegation` sẽ được sử dụng. Nếu cả hai bị bỏ qua, ủy thác phí không được sử dụng.                                                                                                                                                | feePayer                                                                                                                                          | chuỗi (tùy chọn) Địa chỉ của người trả phí thanh toán phí giao dịch. Khi `feeDelegation` là `đúng`, giá trị sẽ được đặt thành trường `feePayer` trong giao dịch. Nếu bỏ qua, `kip37.options.feePayer` sẽ được sử dụng. Nếu cả hai bị bỏ qua, sẽ đưa ra một lỗi. feeRatio chuỗi                                                                                                                                                      |
| (tùy chọn) Tỷ lệ phí giao dịch mà người trả phí sẽ phải chịu. Nếu `feeDelegation` là `đúng` và `feeRatio` được đặt thành giá trị hợp lệ thì giao dịch ủy thác phí một phần sẽ được sử dụng. Khoảng hợp lệ là từ 1 đến 99. Tỷ lệ không được phép bằng 0 hoặc bằng và cao hơn 100. Nếu bỏ qua, `kip37.options.feeRatio` sẽ được sử dụng. | **LƯU Ý** `feeDelegation`, `feePayer` và `feeRatio` được hỗ trợ kể từ phiên bản caver-js[v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1). | **Giá trị trả về** `Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP37- có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'. **Ví dụ** |

kip37.setApprovalForAll <a id="kip37-setApprovalforall"></a>

Cho phép hoặc không cho phép một người vận hành chuyển tất cả token của chủ sở hữu.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi giao dịch. **Tham số** Tên

Loại

```javascript
// Send via a sendParam object with the from field given 
> kip37.create(2, '1000000000000000000', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xf1cefd8efbde83595742dc88308143dde50e7bee39a3a0cfea92ed5df3529d61',
    blocknumber: 2823,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 2823,
            transactionHash: '0xee8cdaa0089681d90a52c1539e75c6e26b3eb67affd4fbf70033ba010a3f0d26',
            transactionIndex: 0,
            blockHash: '0xf1cefd8efbde83595742dc88308143dde50e7bee39a3a0cfea92ed5df3529d61',
            logIndex: 0,
            id: 'log_ca64e74b',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '3': '2',
                '4': '1000000000000000000',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0x0000000000000000000000000000000000000000',
                to: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                id: '2',
                value: '1000000000000000000',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x...40000',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...f48' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.create(2, '1000000000000000000', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.create(2, '1000000000000000000').then(console.log)
```

## Mô tả

```javascript
kip37.setApprovalForAll(operator, approved [, sendParam])
```

người vận hành

chuỗi

Địa chỉ của tài khoản được phê duyệt/cấm chuyển tất cả các token của chủ sở hữu.

| chấp thuận         | boolean                                                                   | Người vận hành này sẽ được phê duyệt nếu `true`. Người vận hành sẽ không được phép nếu `false`.                                                                                                                                                                                                                                               |
| ------------------ | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam          | đối tượng                                                                 | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [kip37.create](#kip37-create).                                                                                                                                                         |
| **Giá trị trả về** | `Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. | Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP37- có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'. |
| **Ví dụ**        | kip37.safeTransferFrom <a id="kip37-safetransferfrom"></a>                | Chuyển token một cách an toàn `số lượng` đã cho của loại token cụ thể `id` từ `từ` sang `người nhận`. Địa chỉ được ủy quyền để gửi token của chủ sở hữu token (người vận hành) hoặc chính chủ sở hữu token sẽ thực hiện giao dịch chuyển token này.                                                                        |

Do đó, địa chỉ được ủy quyền hoặc chủ sở hữu token phải là người gửi giao dịch này có địa chỉ phải được cung cấp tại `sendParam.from` hoặc `kip37.options.from`.

Trừ khi cả `sendParam.from` và `kip37.options.from` đều được cung cấp, nếu không sẽ xảy ra lỗi. Nếu người nhận là một địa chỉ hợp đồng, thì địa chỉ đó phải triển khai [IKIP37Receiver.onKIP37Received](https://kips.klaytn.foundation/KIPs/kip-37#kip-37-token-receiver). Nếu không, quá trình chuyển sẽ được hoàn nguyên.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi giao dịch.

```javascript
// Send via a sendParam object with the from field given 
> kip37.setApprovalForAll('0x{address in hex}', true, { from: '0x{address in hex}' }).then(console.log)
{
	blockHash: '0x0ee7be40f8b9f4d93d68235acef9fba08fde392a93a1a1743243cb9686943a47',
	blockNumber: 3289,
	contractAddress: null,
	from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
	...
	status: true,
	to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
	...
	events: {
        ApprovalForAll: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 3289,
            transactionHash: '0x5e94aa4af5f7604f1b32129fa8463c43cae4ff118f80645bfabcc6181667b8ab',
            transactionIndex: 0,
            blockHash: '0x0ee7be40f8b9f4d93d68235acef9fba08fde392a93a1a1743243cb9686943a47',
            logIndex: 0,
            id: 'log_b1f9938f',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '2': true,
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                operator: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                approved: true,
            },
            event: 'ApprovalForAll',
            signature: '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31',
            raw: {
                data: '0x00...001',
                topics: [ '0x17307...', '0x00...f48', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.setApprovalForAll('0x{address in hex}', true, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.setApprovalForAll('0x{address in hex}', true).then(console.log)
```

## **Tham số**

```javascript
kip37.safeTransferFrom(from, recipient, id, amount, data [, sendParam])
```

Tên

Loại Mô tả từ

chuỗi Địa chỉ của tài khoản sở hữu token sẽ được gửi với cơ chế trợ cấp.

người nhận

chuỗi

| Địa chỉ tài khoản nhận token.                                                                                                                                                         | id                                                                                                                                                                                                                                                     | BigNumber \\                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| chuỗi \\                                                                                                                                                                              | số                                                                                                                                                                                                                                                     | Id token để chuyển.                                                                                                                          |
| số lượng                                                                                                                                                                              | BigNumber \\                                                                                                                                                                                                                                           | chuỗi \\                                                                                                                                     |
| số                                                                                                                                                                                    | Số lượng token bạn muốn chuyển.                                                                                                                                                                                                                        | data                                                                                                                                         |
| Bộ đệm \\                                                                                                                                                                             | chuỗi \\                                                                                                                                                                                                                                               | số                                                                                                                                           |
| (tùy chọn) Dữ liệu tùy chọn để gửi cùng với cuộc gọi.                                                                                                              | sendParam                                                                                                                                                                                                                                              | đối tượng                                                                                                                                    |
| (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [kip37.create](#kip37-create). | **LƯU Ý** Các tham số `id` và `số lượng` chấp nhận loại `number` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn number.MAX_SAFE_INTEGER, nó có thể gây ra lỗi hoặc kết quả không mong muốn. | Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`. **Giá trị trả về** |

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][].

Biên lai từ các phiên bản KIP37- có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ** kip37.safeBatchTransferFrom <a id="kip37-safebatchtransferfrom"></a> Chuyển hàng loạt an toàn nhiều id và giá trị token từ `từ` sang `người nhận`.

Địa chỉ đã được phê duyệt để gửi token của chủ sở hữu (người vận hành) hoặc chính chủ sở hữu token sẽ thực hiện giao dịch chuyển token này.

```javascript
// Send via a sendParam object with the from field given (without data)
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x7dbe4c5bd916ad1aafef87fe6c8b32083080df4ec07f26b6c7a487bb3cc1cf64',
    blocknumber: 3983,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 3983,
            transactionHash: '0x0efc60b88fc55ef37eafbd18057404334dfd595ce4c2c0ff75f0922b928735e7',
            transactionIndex: 0,
            blockHash: '0x7dbe4c5bd916ad1aafef87fe6c8b32083080df4ec07f26b6c7a487bb3cc1cf64',
            logIndex: 0,
            id: 'log_cddf554f',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': '2',
                '4': '1000',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                id: '2',
                value: '1000',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x00...3e8',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...f48', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000, true, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Send via a sendParam object with the from field given (with data)
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000, 'data' { from: '0x{address in hex}' }).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000).then(console.log)
```

## Do đó, địa chỉ được duyệt hoặc chủ sở hữu token phải là người gửi giao dịch này có địa chỉ phải được cung cấp tại `sendParam.from` hoặc `kip37.options.from`.

```javascript
kip37.safeBatchTransferFrom(from, recipient, ids, amounts, data [, sendParam])
```

Trừ khi cả `sendParam.from` và `kip37.options.from` đều được cung cấp, nếu không sẽ xảy ra lỗi.

Nếu người nhận là một địa chỉ hợp đồng, thì địa chỉ đó phải triển khai [IKIP37Receiver.onKIP37Received](https://kips.klaytn.foundation/KIPs/kip-37#kip-37-token-receiver). Nếu không, quá trình chuyển sẽ được hoàn nguyên. Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi giao dịch.

**Tham số** Tên

Loại

Mô tả

| từ         | chuỗi                                                                                                                                                                                 | Địa chỉ của tài khoản sở hữu token sẽ được gửi với cơ chế trợ cấp.                                                                                                                                                                                                                                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| người nhận | chuỗi                                                                                                                                                                                 | Địa chỉ tài khoản nhận token.                                                                                                                                                                                                                                                                                                                                                                                           |
| id         | Mảng                                                                                                                                                                                  | Một mảng id token để chuyển.                                                                                                                                                                                                                                                                                                                                                                                            |
| số lượng   | Mảng                                                                                                                                                                                  | Một mảng số lượng token bạn muốn chuyển.                                                                                                                                                                                                                                                                                                                                                                                |
| data       | Bộ đệm \\                                                                                                                                                                             | chuỗi \\                                                                                                                                                                                                                                                                                                                                                                                                                |
| số         | (tùy chọn) Dữ liệu tùy chọn để gửi cùng với cuộc gọi.                                                                                                              | sendParam                                                                                                                                                                                                                                                                                                                                                                                                               |
| đối tượng  | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [kip37.create](#kip37-create). | **LƯU Ý** Các tham số mảng `ids` và `số lượng` chấp nhận loại `số` làm phần tử trong mảng, nhưng nếu giá trị được cung cấp là nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều này có thể gây ra lỗi hoặc kết quả không mong muốn. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`. |

**Giá trị trả về** `Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch.

Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][].

Biên lai từ các phiên bản KIP37- có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'. **Ví dụ** kip37.mint <a id="kip37-mint"></a>

Tạo token của loại token cụ thể `id` và chỉ định token theo các biến `đến` và `giá trị`.

```javascript
// Send via a sendParam object with the from field given (without data)
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x9e469494463a02ec4f9e2530e014089d6be3146a5485161a530a8e6373d472a6',
    blocknumber: 4621,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferBatch: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 4621,
            transactionHash: '0x557213eef8ae096bc35f5b3bee0e7cf87ecd87129b4a16d4e35a7356c341dad8',
            transactionIndex: 0,
            blockHash: '0x9e469494463a02ec4f9e2530e014089d6be3146a5485161a530a8e6373d472a6',
            logIndex: 0,
            id: 'log_b050bacc',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': ['1', '2'],
                '4': ['10', '1000'],
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                ids: ['1', '2'],
                values: ['10', '1000'],
            },
            event: 'TransferBatch',
            signature: '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb',
            raw: {
                data: '0x00...3e8',
                topics: [ '0x4a39d...', '0x00...f48', '0x00...f48', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000], {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Send via a sendParam object with the from field given (with data)
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000], 'data', { from: '0x{address in hex}' }).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000]).then(console.log)
```

## Hàm tạo cho phép bạn tạo token cụ thể cho nhiều tài khoản cùng một lúc bằng cách chuyển các mảng đến `đến` và `giá trị` làm tham số.

```javascript
kip37.mint(to, id, value [, sendParam])
```

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi giao dịch. **Tham số**

Tên

Loại

| Mô tả            | đến                                                                        | chuỗi \\                                                                                                                            |
| ---------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Mảng             | Địa chỉ của tài khoản hoặc một dãy địa chỉ mà token tạo sẽ được phát hành. | id                                                                                                                                  |
| BigNumber \\     | chuỗi \\                                                                   | số                                                                                                                                  |
| Id token để tạo. | giá trị                                                                    | BigNumber \ chuỗi \\                                                                                                                |
| số \\            | Mảng                                                                       | Số lượng token sẽ được tạo. Nếu một mảng chứa nhiều địa chỉ được gửi đến tham số `to`, giá trị phải được gửi ở dạng mảng. sendParam |

đối tượng (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [kip37.create](#kip37-create).

**LƯU Ý** Các tham số `id` và `value` chấp nhận loại `number` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn number.MAX_SAFE_INTEGER, nó có thể gây ra lỗi hoặc kết quả không mong muốn.

Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**LƯU Ý** Nếu `sendParam.from` hoặc `kip37.options.from` được cung cấp, thì đó phải là một người tạo với MinterRole. **Giá trị trả về** `Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch.

Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][].

```javascript
// Send via a sendParam object with the from field given (Mint the specific tokens to a account)
> kip37.mint('0x{address in hex}', 2, 1000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xca4489a003dc781645475b7db11106da61b7438d86910920f953d8b2dab4a701',
    blocknumber: 12868,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 12868,
            transactionHash: '0xed25e305904e6efb613a6fe8b7370488554f6508b6701e9a0167c95d341c73dc',
            transactionIndex: 0,
            blockHash: '0xca4489a003dc781645475b7db11106da61b7438d86910920f953d8b2dab4a701',
            logIndex: 0,
            id: 'log_04dffde1',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': '2',
                '4': '1000',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0x0000000000000000000000000000000000000000',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                id: '2',
                value: '1000',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x00...3e8',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...1a6' ],
            },
        },
    },
}

// Send via a sendParam object with the from field given (Mint the specific tokens to the multiple accounts)
> kip37.mint(['0x{address in hex}', '0x{address in hex}'], 2, [1, 2], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x2bf06d039e2e08c611117167df6261d1feebb12afb34fcabdda59fef2298c70f',
    blocknumber: 13378,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: [
            {
                address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
                blockNumber: 13378,
                transactionHash: '0x9b367625572145d27f78c00cd18cf294883f7baced9d495e1004275ba35e0ea9',
                transactionIndex: 0,
                blockHash: '0x2bf06d039e2e08c611117167df6261d1feebb12afb34fcabdda59fef2298c70f',
                logIndex: 0,
                id: 'log_6975145c',
                returnValues: {
                    '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    '1': '0x0000000000000000000000000000000000000000',
                    '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                    '3': '2',
                    '4': '1',
                    operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    from: '0x0000000000000000000000000000000000000000',
                    to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                    id: '2',
                    value: '1',
                },
                event: 'TransferSingle',
                signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
                raw: {
                    data: '0x00...001',
                    topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...1a6' ],
                },
            },
            {
                address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
                blockNumber: 13378,
                transactionHash: '0x9b367625572145d27f78c00cd18cf294883f7baced9d495e1004275ba35e0ea9',
                transactionIndex: 0,
                blockHash: '0x2bf06d039e2e08c611117167df6261d1feebb12afb34fcabdda59fef2298c70f',
                logIndex: 1,
                id: 'log_7fcd4837',
                returnValues: {
                    '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    '1': '0x0000000000000000000000000000000000000000',
                    '2': '0xEc38E4B42c79299bFef43c3e5918Cdef482703c4',
                    '3': '2',
                    '4': '2',
                    operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    from: '0x0000000000000000000000000000000000000000',
                    to: '0xEc38E4B42c79299bFef43c3e5918Cdef482703c4',
                    id: '2',
                    value: '2',
                },
                event: 'TransferSingle',
                signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
                raw: {
                    data: '0x000...002',
                    topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...3c4' ],
                },
            },
        ],
    },
}

// Using FD transaction to execute the smart contract
> kip37.mint('0x{address in hex}', 2, 1000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.mint('0x{address in hex}', 2, 1000).then(console.log)
```

## Biên lai từ các phiên bản KIP37- có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

```javascript
kip37.mintBatch(to, ids, values [, sendParam])
```

**Ví dụ**

kip37.mintBatch <a id="kip37-mintbatch"></a>

Đúc nhiều token KIP-37 của các loại token cụ thể `ids` trong một đợt và gán token theo các biến `thành` và `giá trị`.

| Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi giao dịch. | **Tham số**                                           | Tên                 |
| ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------- |
| type                                                                                                                          | Mô tả                                                 | đến                 |
| chuỗi                                                                                                                         | Địa chỉ của tài khoản mà token tạo sẽ được phát hành. | id                  |
| Mảng                                                                                                                          | Một mảng id token để đào.                             | giá trị             |
| Mảng                                                                                                                          | Một mảng số lượng token sẽ bị đào.                    | sendParam đối tượng |

(tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [kip37.create](#kip37-create). **LƯU Ý** Tham số mảng `ids` và `values` chấp nhận loại `number` làm thành phần trong mảng, nhưng nếu giá trị được cung cấp là nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều này có thể gây ra lỗi hoặc kết quả không mong muốn.

Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**LƯU Ý** Nếu `sendParam.from` hoặc `kip37.options.from` được cung cấp, thì đó phải là một người tạo có vai trò MinterRole.

**Giá trị trả về** `Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][].

Biên lai từ các phiên bản KIP37- có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

```javascript
// Send via a sendParam object with the from field given
> kip37.mintBatch('0x{address in hex}', [1, 2], [100, 200], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xfcfaf73e6b275c173fb699344ddcd6fb39e8f65dbe8dbcfa4123e949c7c6d959',
    blocknumber: 13981,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferBatch: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 13981,
            transactionHash: '0x3e2ddc38210eb3257379a6a59c2e6e341937a4c9e7ef848f1cd0462dfd0b3af6',
            transactionIndex: 0,
            blockHash: '0xfcfaf73e6b275c173fb699344ddcd6fb39e8f65dbe8dbcfa4123e949c7c6d959',
            logIndex: 0,
            id: 'log_d07901ef',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': ['1', '2'],
                '4': ['100', '200'],
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0x0000000000000000000000000000000000000000',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                ids: ['1', '2'],
                values: ['100', '200'],
            },
            event: 'TransferBatch',
            signature: '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb',
            raw: {
                data: '0x00...0c8',
                topics: [ '0x4a39d...', '0x00...f48', '0x00...000', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.mintBatch('0x{address in hex}', [1, 2], [100, 200], {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.mintBatch('0x{address in hex}', [1, 2], [100, 200]).then(console.log)
```

## **Ví dụ**

```javascript
kip37.addMinter(account [, sendParam])
```

kip37.addMinter <a id="kip37-addminter"></a>

Thêm tài khoản với tư cách là người tạo, người được phép tạo token.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi giao dịch.

| **Tham số**                                                     | Tên       | type                                                                                                                                                                                            |
| --------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mô tả                                                           | tài khoản | chuỗi                                                                                                                                                                                           |
| Địa chỉ của tài khoản sẽ được thêm vào trong vai trò người tạo. | sendParam | đối tượng (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [kip37.create](#kip37-create). |

**LƯU Ý** Nếu `sendParam.from` hoặc `kip37.options.from` được cung cấp, thì đó phải là một người tạo.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP37- có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip37.addMinter('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x32db6b56d959a388120507a943930351ba681b3c34d1a3c609e6bc03eabdbbe3',
    blocknumber: 14172,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        MinterAdded:{
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 14172,
            transactionHash: '0xa2c492abde161356d03a23d9ba48e5fd6e69a2e1603dc0286c7c65aac65d0356',
            transactionIndex: 0,
            blockHash: '0x32db6b56d959a388120507a943930351ba681b3c34d1a3c609e6bc03eabdbbe3',
            logIndex: 0,
            id: 'log_712e7c09',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'MinterAdded',
            signature: '0x6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f6',
            raw: {
                data: '0x',
                topics: [ '0x6ae17...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.addMinter('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.addMinter('0x{address in hex}').then(console.log)
```

## kip37.renounceMinter <a id="kip37-renounceminter"></a>

```javascript
kip37.renounceMinter([sendParam])
```

Từ bỏ quyền tạo token. Chỉ một địa chỉ minter mới có thể từ bỏ quyền tạo.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi giao dịch.

**Tham số**

| Tên       | Loại     | Mô tả                                                                                                                                                                                                                                                                                                             |
| --------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | đối tượng | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [kip37.create](#kip37-create). **LƯU Ý** Nếu `sendParam.from` hoặc `kip37.options.from` được cung cấp, thì đó phải là một người tạo có vai trò MinterRole. |

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch.

Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP37- có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'. **Ví dụ**

kip37.burn <a id="kip37-burn"></a>

```javascript
// Send via a sendParam object with the from field given 
> kip37.renounceMinter({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x2122846ede9dac35a6797faf0e8eabd7fd8edf7054df27c97410ae788b6cc329',
    blocknumber: 14174,
    contractAddress: null,
    from: '0xf896c5afd69239722013ad0041ef33b5a2fdb1a6',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        MinterRemoved: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 14174,
            transactionHash: '0x4b06b298f3de6f119901a4444326d21add6fb1b9a5d69c91c998a41af8fd46c9',
            transactionIndex: 0,
            blockHash: '0x2122846ede9dac35a6797faf0e8eabd7fd8edf7054df27c97410ae788b6cc329',
            logIndex: 0,
            id: 'log_9b0f3967',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'MinterRemoved',
            signature: '0xe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb66692',
            raw: {
                data: '0x',
                topics: [ '0xe9447...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.renounceMinter({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.renounceMinter().then(console.log)
```

## Ghi các token KIP-37 cụ thể.

```javascript
kip37.burn(account, id, value [, sendParam])
```

Địa chỉ đã được phê duyệt để vận hành token của chủ sở hữu (người vận hành) hoặc chính chủ sở hữu token sẽ thực hiện giao dịch chuyển token này.

Do đó, địa chỉ được ủy quyền hoặc chủ sở hữu token phải là người gửi giao dịch này có địa chỉ phải được cung cấp tại `sendParam.from` hoặc `kip37.options.from`. Trừ khi cả `sendParam.from` và `kip37.options.from` đều được cung cấp, nếu không sẽ xảy ra lỗi. Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi giao dịch.

**Tham số**

Tên

| Loại                       | Mô tả                                         | tài khoản                               |
| --------------------------- | --------------------------------------------- | --------------------------------------- |
| chuỗi                       | Địa chỉ của tài khoản sở hữu token sẽ bị hủy. | id                                      |
| BigNumber \\                | chuỗi \\                                      | số                                      |
| Id của token sẽ bị phá hủy. | giá trị                                       | BigNumber \\                            |
| chuỗi \\                    | số                                            | Số lượng token sẽ bị phá hủy. sendParam |

đối tượng (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [kip37.create](#kip37-create).

**LƯU Ý** Các tham số `id` và `số lượng` chấp nhận loại `number` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn number.MAX_SAFE_INTEGER, nó có thể gây ra lỗi hoặc kết quả không mong muốn.

Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`. **Giá trị trả về** `Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch.

Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][].

```javascript
// Send via a sendParam object with the from field given 
> kip37.burn('0x{address in hex}', 2, 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xa42a71d838afcf27b02365fd716da4cba542f73540a9482e27c405a8bc47b456',
    blocknumber: 16076,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 16076,
            transactionHash: '0xec16313d00d0dbf34608c84e7563bacbde04e7e9c5fbcfffae54f0161356f19c',
            transactionIndex: 0,
            blockHash: '0xa42a71d838afcf27b02365fd716da4cba542f73540a9482e27c405a8bc47b456',
            logIndex: 0,
            id: 'log_9c9ddbc9',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0x0000000000000000000000000000000000000000',
                '3': '2',
                '4': '10',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0x0000000000000000000000000000000000000000',
                id: '2',
                value: '10',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x00...00a',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...f48', '0x00...000' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.burn('0x{address in hex}', 2, 10, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.burn('0x{address in hex}', 2, 10).then(console.log)
```

## Biên lai từ các phiên bản KIP37- có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

```javascript
kip37.burnBatch(account, ids, values [, sendParam])
```

**Ví dụ**

kip37.burnBatch <a id="kip37-burnbatch"></a> Đốt cháy nhiều token KIP-37. Địa chỉ đã được phê duyệt để ủy quyền token của chủ sở hữu (người vận hành) hoặc chính chủ sở hữu token sẽ thực hiện giao dịch chuyển token này.

Do đó, người được ủy quyền hoặc chủ sở hữu mã thông báo phải là người gửi giao dịch này có địa chỉ phải được cung cấp tại `sendParam.from` hoặc `kip37.options.from`.

Trừ khi cả `sendParam.from` và `kip37.options.from` đều được cung cấp, nếu không sẽ xảy ra lỗi.

| Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi giao dịch. | **Tham số**                                   | Tên                 |
| ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ------------------- |
| Loại                                                                                                                         | Mô tả                                         | tài khoản           |
| chuỗi                                                                                                                         | Địa chỉ của tài khoản sở hữu token sẽ bị hủy. | id                  |
| Mảng                                                                                                                          | Một mảng id token để đốt cháy.                | giá trị             |
| Mảng                                                                                                                          | Một mảng số lượng token sẽ bị đốt cháy.       | sendParam đối tượng |

(tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [kip37.create](#kip37-create). **LƯU Ý** Tham số mảng `ids` và `values` chấp nhận loại `number` làm thành phần trong mảng, nhưng nếu giá trị được cung cấp là nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều này có thể gây ra lỗi hoặc kết quả không mong muốn.

Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về** `Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][].

Biên lai từ các phiên bản KIP37- có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

```javascript
// Send via a sendParam object with the from field given 
> kip37.burnBatch('0x{address in hex}', [1, 2], [100, 200], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xb72521aecd76dc2cde31721d32f2cbd71d8cc244cca9109d4fe2de9fe9b53ec0',
    blocknumber: 16930,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferBatch: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 16930,
            transactionHash: '0xa19ee5c01ad67fd27bb2818b7cbad58ba529d5a7885d79558dea8006e7a760bf',
            transactionIndex: 0,
            blockHash: '0xb72521aecd76dc2cde31721d32f2cbd71d8cc244cca9109d4fe2de9fe9b53ec0',
            logIndex: 0,
            id: 'log_66e4d23e',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0x0000000000000000000000000000000000000000',
                '3': ['1', '2'],
                '4': ['100', '200'],
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0x0000000000000000000000000000000000000000',
                ids: ['1', '2'],
                values: ['100', '200'],
            },
            event: 'TransferBatch',
            signature: '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb',
            raw: {
                data: '0x00...0c8',
                topics: [ '0x4a39d...', '0x00...f48', '0x00...f48', '0x00...000' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.burnBatch('0x{address in hex}', [1, 2], [100, 200], {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.burnBatch('0x{address in hex}', [1, 2], [100, 200]).then(console.log)
```

## **Ví dụ**

```javascript
kip37.addPauser(account [, sendParam])
```

kip37.addPauser <a id="kip37-addpauser"></a>

Thêm một tài khoản làm trình tạm dừng có quyền tạm dừng hợp đồng.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi giao dịch.

| **Tham số**                                       | Tên       | Loại                                                                                                                                                                                           |
| ------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mô tả                                             | tài khoản | chuỗi                                                                                                                                                                                           |
| Địa chỉ của tài khoản sẽ là địa chỉ tạm dừng mới. | sendParam | đối tượng (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [kip37.create](#kip37-create). |

**LƯU Ý** Nếu `sendParam.from` hoặc `kip37.options.from` được cung cấp, thì đó phải là một người tạm dừng có PauserRole.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP37- có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip37.addPauser('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x8267759b768d486e42657216a22c2425455cbf8b12aea9f149bb7ebe3aa2d666',
    blocknumber: 17007,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        PauserAdded: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17007,
            transactionHash: '0xe1d702bbbb44c25b5f4d18cf1e1a1745eb134d6438d5cae77611b1b73944aa93',
            transactionIndex: 0,
            blockHash: '0x8267759b768d486e42657216a22c2425455cbf8b12aea9f149bb7ebe3aa2d666',
            logIndex: 0,
            id: 'log_50e810b0',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'PauserAdded',
            signature: '0x6719d08c1888103bea251a4ed56406bd0c3e69723c8a1686e017e7bbe159b6f8',
            raw: {
                data: '0x',
                topics: [ '0x6719d...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.addPauser('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.addPauser('0x{address in hex}').then(console.log)
```

## kip37.renouncePauser <a id="kip37-renouncepauser"></a>

```javascript
kip37.renouncePauser([sendParam])
```

Từ bỏ quyền tạm dừng hợp đồng. Chỉ một địa chỉ tạm dừng mới có thể từ bỏ quyền tạm dừng của chính nó.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi giao dịch.

**Tham số**

| Tên       | Loại     | Mô tả                                                                                                                                                                                                                                                                                                          |
| --------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | đối tượng | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [kip37.create](#kip37-create). **LƯU Ý** Nếu `sendParam.from` hoặc `kip37.options.from` được cung cấp, thì đó phải là một người tạm dừng có PauserRole. |

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch.

Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP37- có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'. **Ví dụ**

kip37.pause <a id="kip37-pause"></a>

```javascript
// Send via a sendParam object with the from field given 
> kip37.renouncePauser({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x86b189c51df4c9390ddc7bcaefa6b5e78b9e7db645079cff33cc09ab321bc5e6',
    blocknumber: 17010,
    contractAddress: null,
    from: '0x5934a0c01baa98f3457981b8f5ce6e52ac585578',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        PauserRemoved: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17010,
            transactionHash: '0xa0557cf370cdff56ee2f53555da3e816361125a19cc832caa9d7a62808afeda1',
            transactionIndex: 0,
            blockHash: '0x86b189c51df4c9390ddc7bcaefa6b5e78b9e7db645079cff33cc09ab321bc5e6',
            logIndex: 0,
            id: 'log_ebd8d4a4',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'PauserRemoved',
            signature: '0xcd265ebaf09df2871cc7bd4133404a235ba12eff2041bb89d9c714a2621c7c7e',
            raw: {
                data: '0x',
                topics: [ '0xcd265...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.renouncePauser({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.renouncePauser().then(console.log)
```

## Tạm dừng các chức năng liên quan đến hoạt động của token.

```javascript
kip37.pause([id] [, sendParam])
```

Nếu thông số `id` được xác định, hãy tạm dừng token cụ thể. Nếu không thì tạm dừng hợp đồng token. Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi giao dịch.

**Tham số**

Tên

| Loại        | Mô tả     | id                                                                                                                                                                                                                                                                                                             |
| ------------ | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BigNumber \\ | chuỗi \\  | số (tùy chọn) Id token để tạm dừng. Nếu tham số này bị bỏ qua, chức năng `tạm dừng` sẽ tạm dừng hợp đồng token.                                                                                                                                                                             |
| sendParam    | đối tượng | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [kip37.create](#kip37-create). **LƯU Ý** Nếu `sendParam.from` hoặc `kip37.options.from` được cung cấp, thì đó phải là một người tạm dừng có PauserRole. |

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch.

Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP37- có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'. **Ví dụ**

kip37.unpause <a id="kip37-unpause"></a>

```javascript
// Send via a sendParam object with the from field given (pause the token contract)
> kip37.pause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x004960a28a6c5b75963d28c4018d6540d5ad181c5a5f257ec8f78ebb8436be1e',
    blocknumber: 17521,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        Paused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17521,
            transactionHash: '0xc5f3bebe83c86f68d582240f6bb47a8f56867650c9fec3b7caf1cb5861d31af2',
            transactionIndex: 0,
            blockHash: '0x004960a28a6c5b75963d28c4018d6540d5ad181c5a5f257ec8f78ebb8436be1e',
            logIndex: 0,
            id: 'log_55bd1adc',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Paused',
            signature: '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258',
            raw: {
                data: '0x00...f48',
                topics: ['0x62e78...'],
            },
        },
    },
}

// Send via a sendParam object with the from field given (pause the specific token)
> kip37.pause(2, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x36d0618e1e30bca8199ce3bbc3d32e74bd4c25f6326c4c9e2d9292b79605155f',
    blocknumber: 17738,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        Paused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17738,
            transactionHash: '0x437834d4ccb944397607a81abe1bc229c44749d20c2b4f4b73ae1dd5907f79c9',
            transactionIndex: 0,
            blockHash: '0x36d0618e1e30bca8199ce3bbc3d32e74bd4c25f6326c4c9e2d9292b79605155f',
            logIndex: 0,
            id: 'log_b89719ed',
            returnValues: {
                '0': '2',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                tokenId: '2',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Paused',
            signature: '0xabdb1c9133626eb4f8c5f2ec7e3c60a969a2fb148a0c341a3cf6597242c8f8f5',
            raw: {
                data: '0x00...f48',
                topics: ['0xabdb1...'],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.pause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.pause().then(console.log)
```

## Tiếp tục hợp đồng bị tạm dừng hoặc token cụ thể.

```javascript
kip37.unpause([id] [, sendParam])
```

Nếu thông số `id` được xác định, hãy bỏ tạm dừng token cụ thể. Nếu không thì bỏ tạm dừng hợp đồng token. Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi giao dịch.

**Tham số**

Tên

| Loại        | Mô tả    | id                                                                                                                                           |
| ------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| BigNumber \\ | chuỗi \\ | số (tùy chọn) Id token để bỏ tạm dừng. Nếu tham số này bị bỏ qua, chức năng `bỏ tạm dừng` sẽ hủy tạm dừng hợp đồng token. |

**LƯU Ý** Nếu `sendParam.from` hoặc `kip37.options.from` được cung cấp, thì đó phải là một người tạm dừng có PauserRole.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP37- có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given (unpause the token contract)
> kip37.unpause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x71d47d869e6fcf7b56f071e4f3b7b5a6d83e585b36a203248544340cdada8f1d',
    blocknumber: 17524,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        Unpaused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17524,
            transactionHash: '0x5e67040e12297ee85a3464eae406904c32b7f3c7493cbdbc8f73a2e92b10f56d',
            transactionIndex: 0,
            blockHash: '0x71d47d869e6fcf7b56f071e4f3b7b5a6d83e585b36a203248544340cdada8f1d',
            logIndex: 0,
            id: 'log_78d5bc18',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Unpaused',
            signature: '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa',
            raw: {
                data: '0x00...f48',
                topics: ['0x5db9e...'],
            },
        },
    },
}

// Send via a sendParam object with the from field given (unpause the specific token)
> kip37.unpause(2, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x44e2005d6061eeb014889c29cce567d12664e5ef4104faa3426eacd8772790c6',
    blocknumber: 17742,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        Unpaused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17742,
            transactionHash: '0xed920c7b487c3133508cc37f930e4ae3b9c05f01e4ad823909c9b4aacf040f62',
            transactionIndex: 0,
            blockHash: '0x44e2005d6061eeb014889c29cce567d12664e5ef4104faa3426eacd8772790c6',
            logIndex: 0,
            id: 'log_2811c3c5',
            returnValues: {
                '0': '2',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                tokenId: '2',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Unpaused',
            signature: '0xfe9b5e5216db9de81757f43d20f846bea509c040a560d136b8263dd8cd764238',
            raw: {
                data: '0x00...f48',
                topics: ['0xfe9b5...'],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.unpause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.unpause().then(console.log)
```

[getTransactionReceipt]: AAA
