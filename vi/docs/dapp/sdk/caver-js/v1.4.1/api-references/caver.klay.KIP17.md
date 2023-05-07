---
description: Một đối tượng caver-js được sử dụng để tương tác với một hợp đồng thông minh cho KIP17.
---

# caver.klay.KIP17

`caver.klay.KIP17` giúp bạn dễ dàng xử lý hợp đồng thông minh triển khai [KIP-17](https://kips.klaytn.foundation/KIPs/kip-17) như một đối tượng JavaScript trên chuỗi khối Klaytn.

`caver.klay.KIP17` kế thừa [caver.klay.Contract](caver.klay.Contract.md) để triển khai hợp đồng mã thông báo KIP-17. `caver.klay.KIP17` giữ các thuộc tính giống như của `caver.klay.Contract` trong khi có các phương pháp bổ sung để triển khai các tính năng bổ sung. Phần này chỉ giới thiệu các phương thức liên kết mới được thêm vào của `caver.klay.KIP17`.

Mã triển khai KIP-17 cho caver-js hiện có trên [Klaytn Contracts Github Repo](https://github.com/klaytn/klaytn-contracts/tree/main/contracts/token/KIP17).

Để biết thêm thông tin về KIP-17, hãy xem [Đề xuất cải tiến Klaytn](https://kips.klaytn.foundation/KIPs/kip-17).

**LƯU Ý** `caver.klay.KIP17` được hỗ trợ kể từ phiên bản caver-js [v1.4.1](https://www.npmjs.com/package/caver-js/v/1.4.1).

## caver.klay.KIP17.deploy <a id="caver-klay-kip17-deploy"></a>

```javascript
caver.klay.KIP17.deploy(tokenInfo, deployer)
```

Triển khai hợp đồng token KIP-17 cho blockchain Klaytn. Hợp đồng được triển khai bằng cách sử dụng caver.klay.KIP17.deploy là token không thể thay thế tuân theo tiêu chuẩn KIP-17.

Sau khi triển khai thành công, lời hứa sẽ được giải quyết bằng phiên bản KIP17 mới.

**Tham số**

| Tên              | Loại      | Mô tả                                                                                                               |
|:---------------- |:--------- |:------------------------------------------------------------------------------------------------------------------- |
| tokenInfo        | Đối tượng | Thông tin cần thiết để triển khai hợp đồng token KIP-17 trên blockchain Klaytn. Xem bảng dưới đây để biết chi tiết. |
| trình triển khai | Chuỗi     | Địa chỉ của tài khoản để triển khai hợp đồng token KIP-17. Tài khoản này phải có đủ KLAY để triển khai.             |

Đối tượng tokenInfo phải chứa các thông tin sau:

| Tên        | Loại | Mô tả                 |
|:---------- |:----- |:--------------------- |
| tiêu đề    | Chuỗi | Tên của token.        |
| biểu tượng | Chuỗi | Biểu tượng của token. |

**Giá trị trả về**

`PromiEvent`: Bộ phát hiệu ứng kết hợp promise, được giải quyết bằng một phiên bản KIP17 mới. Ngoài ra, các sự kiện sau đây có thể xảy ra:

| Tên             | Loại      | Mô tả                                                                                                                                                                                                                                                                                                                |
|:--------------- |:--------- |:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionHash | Chuỗi     | Được kích hoạt ngay sau khi giao dịch được gửi và có sẵn hàm băm giao dịch.                                                                                                                                                                                                                                          |
| biên lai        | Đối tượng | Được kích hoạt khi có biên lai giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Biên nhận từ các phiên bản KIP17 có thuộc tính 'sự kiện' được phân tích cú pháp qua abi thay vì thuộc tính 'nhật ký'. |
| lỗi             | Lỗi       | Được kích hoạt nếu xảy ra lỗi trong quá trình gửi.                                                                                                                                                                                                                                                                   |

**Ví dụ**

```javascript
// sử dụng promise
> caver.klay.KIP17.deploy({
    name: 'Jasmine',
    symbol: 'JAS',
}, '0x{address in hex}').then(console.log)
KIP17 {
    ...
    _địa chỉ: '0xfA7D967f414468083aDAd85257a2cBD6019693C2',
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

// sử dụng trình phát sự kiện và promise
> caver.klay.KIP17.deploy({
    name: 'Jasmine',
    symbol: 'JAS',
}, '0x{address in hex}')
.on('error', function(error) { ... })
.on('transactionHash', function(transactionHash) { ... })
.on('receipt', function(receipt) {
    console.log(receipt.contractAddress) // chứa địa chỉ hợp đồng token
})
.then(function(newKIP17Instance) {
    console.log(newKIP17Instance.options.address) // ví dụ với địa chỉ hợp đồng token mới
})
```

## KIP17 mới <a id="new-kip17"></a>

```javascript
new caver.klay.KIP17([tokenAddress])
```

Tạo một phiên bản KIP17 mới với các phương thức và sự kiện liên kết của nó.

**Tham số**

| Tên          | Loại | Mô tả                                                                                                                             |
|:------------ |:----- |:--------------------------------------------------------------------------------------------------------------------------------- |
| tokenAddress | Chuỗi | \(tùy chọn\) Địa chỉ của hợp đồng token KIP-17, có thể được chỉ định sau thông qua `kip17Instance.options.address = '0x1234..'` |

**Giá trị trả về**

| Loại     | Mô tả                                                           |
|:--------- |:--------------------------------------------------------------- |
| Đối tượng | Phiên bản KIP17 với các phương thức và sự kiện liên kết của nó. |

**Ví dụ**

```javascript
// Tạo một thể hiện KIP17 không có tham số
> const kip17Instance = new caver.klay.KIP17()

// Tạo một phiên bản KIP17 có địa chỉ token
> const kip17Instance = new caver.klay.KIP17('0x{address in hex}')
```

## kip17Instance.clone <a id="kip17instance-clone"></a>

```javascript
kip17Instance.clone([tokenAddress])
```

Sao chép phiên bản KIP17 hiện tại.

**Tham số**

| Tên          | Loại  | Mô tả                                                                                                                                                          |
|:------------ |:----- |:-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenAddress | Chuỗi | \(tùy chọn\) Địa chỉ của hợp đồng thông minh đã triển khai token KIP-17 khác. Nếu bị bỏ qua, nó sẽ được đặt thành địa chỉ hợp đồng trong trường hợp ban đầu. |

**Giá trị trả về**

| Loại      | Mô tả                                |
|:--------- |:------------------------------------ |
| Đối tượng | Bản sao của phiên bản KIP17 ban đầu. |

**Ví dụ**

```javascript
> const kip17Instance = new caver.klay.KIP17(address)

// Sao chép không có tham số
> const cloned = kip17Instance.clone()

// Sao chép có địa chỉ của hợp đồng token mới
> const cloned = kip17Instance.clone('0x{address in hex}')
```

## kip17Instance.supportsInterface <a id="kip17instance-supportsinterface"></a>

```javascript
kip17Instance.supportsInterface(interfaceId)
```

Returns `true` if this contract implements the interface defined by `interfaceId`.

**Parameters**

| Name        | Type   | Description                    |
|:----------- |:------ |:------------------------------ |
| interfaceId | String | The interfaceId to be checked. |

**Return Value**

`Promise` returns `Boolean`: `true` if this contract implements the interface defined by `interfaceId`.

**Example**

```javascript
> kip17Instance.supportsInterface('0x80ac58cd').then(console.log)
true

> kip17Instance.supportsInterface('0xa22cb465').then(console.log)
false
```

## kip17Instance.name <a id="kip17instance-name"></a>

```javascript
kip17Instance.name()
```

Returns the name of the token.

**Parameters**

None

**Return Value**

`Promise` returns `String`: The name of the token.

**Example**

```javascript
> kip17Instance.name().then(console.log)
Jasmine
```

## kip17Instance.symbol <a id="kip17instance-symbol"></a>

```javascript
kip17Instance.symbol()
```

Returns the symbol of the token.

**Parameters**

None

**Return Value**

`Promise` returns `String`: The symbol of the token.

**Example**

```javascript
> kip17Instance.symbol().then(console.log)
JAS
```

## kip17Instance.totalSupply <a id="kip17instance-totalsupply"></a>

```javascript
kip17Instance.totalSupply()
```

Returns the total number of tokens minted by the contract.

**Parameters**

None

**Return Value**

`Promise` returns `BigNumber`: The total number of tokens.

**Example**

```javascript
> kip17Instance.totalSupply().then(console.log)
10
```

## kip17Instance.tokenURI <a id="kip17instance-tokenuri"></a>

```javascript
kip17Instance.tokenURI(tokenId)
```

Returns the URI for a given token id.

**Parameters**

| Name    | Type         | Description                              |
|:------- |:------------ |:---------------------------------------- |
| tokenId | BigNumber \ | String \| Number | The id of the token. |

**NOTE** The `tokenId` parameter accepts `Number` type but if the fed value were out of the range capped by Number.MAX\_SAFE\_INTEGER, it might cause an unexpected result or error. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `Chuỗi`: URI của token đã cho.

**Ví dụ**

```javascript
> kip17Instance.tokenURI(0).then(console.log)
https://kip17.example/uri-ex-caver.json
```

## kip17Instance.tokenOfOwnerByIndex <a id="kip17instance-tokenofownerbyindex"></a>

```javascript
kip17Instance.tokenOfOwnerByIndex(owner, index)
```

Tìm kiếm danh sách token của `chủ sở hữu` cho chỉ mục đã cho và trả về id token của token được định vị tại chỉ mục phù hợp trong danh sách nếu có kết quả khớp.

**Tham số**

| Tên        | Loại         | Mô tả                                                                  |
|:---------- |:------------ |:---------------------------------------------------------------------- |
| chủ sở hữu | Chuỗi        | Địa chỉ của tài khoản sở hữu token.                                    |
| chỉ số     | BigNumber \ | Chuỗi \| Số | Chỉ mục của token trong danh sách token của chủ sở hữu. |

**LƯU Ý** Tham số `index` chấp nhận loại `Number` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi Number.MAX \_SAFE\_INTEGER, nó có thể gây ra lỗi hoặc kết quả không mong muốn. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `BigNumber`: Id của token.

**Ví dụ**

```javascript
> kip17Instance.tokenOfOwnerByIndex('0x{address in hex}', 5).then(console.log)
5
```

## kip17Instance.tokenByIndex <a id="kip17instance-tokenbyindex"></a>

```javascript
kip17Instance.tokenByIndex(index)
```

Tìm kiếm danh sách tất cả các token trong hợp đồng này cho chỉ mục đã cho và trả về id token của token được định vị tại chỉ mục phù hợp trong danh sách nếu có kết quả khớp. Hoàn nguyên nếu chỉ số lớn hơn hoặc bằng tổng số token.

**Tham số**

| Tên    | Loại        | Mô tả                                              |
|:------ |:------------ |:-------------------------------------------------- |
| chỉ số | BigNumber \ | Chuỗi \| Số | Chỉ mục của token sẽ được truy vấn. |

**LƯU Ý** Tham số `index` chấp nhận loại `Number` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi Number.MAX \_SAFE\_INTEGER, nó có thể gây ra lỗi hoặc kết quả không mong muốn. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `BigNumber`: Id của token.

**Ví dụ**

```javascript
> kip17Instance.tokenByIndex(1).then(console.log)
1
```

## kip17Instance.balanceOf <a id="kip17instance-balanceof"></a>

```javascript
kip17Instance.balanceOf(address)
```

Trả về số dư của địa chỉ tài khoản đã cho. Số dư của tài khoản trong KIP-17 là tổng số NFT \(Token không thể thay thế\) thuộc sở hữu của tài khoản.

**Tham số**

| Tên     | Loại  | Mô tả                                                |
|:------- |:----- |:---------------------------------------------------- |
| địa chỉ | Chuỗi | Địa chỉ của tài khoản sẽ được kiểm tra số dư của nó. |

**Giá trị trả về**

`Promise` trả về `BigNumber`: Số dư tài khoản.

**Ví dụ**

```javascript
> kip17Instance.balanceOf('0x{address in hex}').then(console.log)
9
```

## kip17Instance.ownerOf <a id="kip17instance-ownerof"></a>

```javascript
kip17Instance.ownerOf(tokenId)
```

Returns the address of the owner of the specified token id.

**Parameters**

| Name    | Type         | Description                              |
|:------- |:------------ |:---------------------------------------- |
| tokenId | BigNumber \ | String \| Number | The id of the token. |

**NOTE** The `tokenId` parameter accepts `Number` type but if the fed value were out of the range capped by Number.MAX\_SAFE\_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**Return Value**

`Promise` returns `String`: The address of the account that owns the given token.

**Example**

```javascript
> kip17Instance.ownerOf(8).then(console.log)
0x0e0E95426343d97CC7BB913C7D7DBea065A31814
```

## kip17Instance.getApproved <a id="kip17instance-getapproved"></a>

```javascript
kip17Instance.getApproved(tokenId)
```

Returns the address who was permitted to transfer this token, or 'zero' address, if no address was approved. It reverts if the given token id does not exist.

**Parameters**

| Name    | Type         | Description                              |
|:------- |:------------ |:---------------------------------------- |
| tokenId | BigNumber \ | String \| Number | The id of the token. |

**NOTE** The `tokenId` parameter accepts `Number` type but if the fed value were out of the range capped by Number.MAX\_SAFE\_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**Return Value**

`Promise` returns `String`: The address of the account that has the right to transfer the given token.

**Example**

```javascript
// If an approved address exists
> kip17Instance.getApproved(10).then(console.log)
0x23D8E9cae17b22d3DAC65b4F7D2C737C6A7b865d

// If no approved address exists
> kip17Instance.getApproved(3).then(console.log)
0x0000000000000000000000000000000000000000
```

## kip17Instance.isApprovedForAll <a id="kip17instance-isapprovedforall"></a>

```javascript
kip17Instance.isApprovedForAll(owner, operator)
```

Returns `true` if an `operator` is approved to transfer all tokens that belong to the `owner`.

**Parameters**

| Name     | Type   | Description                                                                                     |
|:-------- |:------ |:----------------------------------------------------------------------------------------------- |
| owner    | String | The address of an account that owns tokens and has allowed the operator to send all its tokens. |
| operator | Chuỗi  | Địa chỉ của tài khoản được phê duyệt để gửi tất cả token của chủ sở hữu thay cho chủ sở hữu.    |

**Giá trị trả về**

`Promise` trả lại`Boolean`: `true` nếu một `toán tử` được chấp thuận để gửi tất cả các token thuộc về `chủ sở hữu`.

**Ví dụ**

```javascript
> kip17Instance.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
false

> kip17Instance.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
true
```

## kip17Instance.isMinter <a id="kip17instance-isminter"></a>

```javascript
kip17Instance.isMinter(address)
```

Trả về `true` nếu tài khoản đã cho là người khai thác có thể phát hành token mới trong hợp đồng hiện tại tuân theo KIP-17.

**Tham số**

| Tên     | Loại | Mô tả                                                |
|:------- |:----- |:---------------------------------------------------- |
| địa chỉ | Chuỗi | Địa chỉ của tài khoản được kiểm tra để có quyền đúc. |

**Giá trị trả về**

`Promise` trả về `Boolean`: `true` nếu tài khoản là một thợ đào.

**Ví dụ**

```javascript
> kip17Instance.isMinter('0x{address in hex}').then(console.log)
true

> kip17Instance.isMinter('0x{address in hex}').then(console.log)
false
```

## kip17Instance.paused <a id="kip17instance-paused"></a>

```javascript
kip17Instance.paused()
```

Trả về `true` nếu hợp đồng bị tạm dừng hoặc trả về `false`.

**Tham số**

Không có

**Giá trị trả về**

`Promise` trả về `Boolean`: `true` nếu hợp đồng bị tạm dừng.

**Ví dụ**

```javascript
> kip17Instance.paused().then(console.log)
true

> kip17Instance.paused().then(console.log)
false
```

## kip17Instance.isPauser <a id="kip17instance-ispauser"></a>

```javascript
kip17Instance.isPauser(address)
```

Trả về `true` nếu tài khoản đã cho là người tạm dừng có thể tạm dừng chuyển token.

**Tham số**

| Tên     | Loại  | Mô tả                                                                     |
|:------- |:----- |:------------------------------------------------------------------------- |
| địa chỉ | Chuỗi | Địa chỉ của tài khoản đã được kiểm tra để có quyền tạm dừng chuyển token. |

**Giá trị trả về**

`Promise` trả về `Boolean`: `true` nếu tài khoản là tạm dừng.

**Ví dụ**

```javascript
> kip17Instance.isPauser('0x{address in hex}').then(console.log)
true

> kip17Instance.isPauser('0x{address in hex}').then(console.log)
false
```

## kip17Instance.approve <a id="kip17instance-approve"></a>

```javascript
kip17Instance.approve(to, tokenId [, sendParam])
```

Phê duyệt một địa chỉ khác để chuyển token của id token đã cho. Địa chỉ số 0 cho biết không có địa chỉ nào được phê duyệt. Chỉ có thể có một địa chỉ được phê duyệt cho mỗi token. Phương pháp này chỉ được phép gọi bởi chủ sở hữu token hoặc nhà điều hành được phê duyệt.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Parameters**

| Name      | Type         | Description                                                                 |
|:--------- |:------------ |:--------------------------------------------------------------------------- |
| to        | String       | The address of the account who spends tokens in place of the owner.         |
| tokenId   | BigNumber \ | String \| Number | The id of the token the spender is allowed to use.      |
| sendParam | Object       | \(optional\) An object with defined parameters for sending a transaction. |

**NOTE** The `tokenId` parameter accepts `Number` type but if the fed value were out of the range capped by Number.MAX\_SAFE\_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

The sendParam object can contain the following:

| Name     | Type      | Description                                                                                                                                                                                                                          |
|:-------- |:--------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| from     | String    | \(optional\) The address from which the transaction should be sent. If omitted, it will be set by `this.options.from`. If neither of `from` in `sendParam` object nor `this.options.from` were not provided, an error would occur. |
| gas      | Number \ | String | \(optional\) The maximum gas provided for this transaction \(gas limit\). If omitted, it will be set by caver-js via calling `this.methods.approve(spender, tokenId).estimateGas({from})`.                              |
| gasPrice | Number \ | String | \(optional\) The gas price in peb to use for this transaction. If omitted, it will be set by caver-js via calling `caver.klay.getGasPrice`.                                                                               |
| value    | Number \ | String \| BN \| BigNumber | \(optional\) The value to be transferred in peb.                                                                                                                                                     |

**Return Value**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP-17 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
> kip17Instance.approve('0x{address in hex}', 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x3875c3f3120c1773c3adeb97260808c8a385bf8427bc203d10cbc5d262f67dbc',
    blockNumber: 2650,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    status: true,
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

// Using kip17Instance.options.from
// If the value of kip17Instance.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17Instance instance.
> kip17Instance.options.from = '0x{address in hex}'
> kip17Instance.approve('0x{address in hex}', 10).then(console.log)
```

## kip17Instance.setApprovalForAll <a id="kip17instance-setApprovalforall"></a>

```javascript
kip17Instance.setApprovalForAll(to, approved [, sendParam])
```

Approves the given operator `to`, or disallow the given operator, to transfer all tokens of the owner.

Note that the setApprovalForAll method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name       | Loại     | Mô tả                                                                                                                                                                                           |
|:---------- |:--------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tới        | Chuỗi     | Địa chỉ của tài khoản được phê duyệt/cấm chuyển tất cả các token của chủ sở hữu.                                                                                                                |
| chấp thuận | Boolean   | Toán tử này sẽ được phê duyệt nếu `true`. Toán tử sẽ không được phép nếu `false`.                                                                                                               |
| sendParam  | Đối tượng | \(tùy chọn\) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt](caver.klay.KIP17.md#kip17instance-approve). |

**Giá trị trả về**

`Promise` trả về `Object` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Biên nhận từ các phiên bản KIP-17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'nhật ký'.

**Ví dụ**

```javascript
// Gửi qua một đối tượng sendParam với trường từ đã cho
> kip17Instance.setApprovalForAll('0x{address in hex}', false, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x34379ac5b71f16f41d5171d021ca2945e02c60d9fb7f85fc0127262c2ce72b47',
    blockNumber: 3340,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    status: true,
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

// Sử dụng kip17Instance.options.from
// Nếu giá trị của kip17Instance.options.from được đặt, giá trị này được sử dụng làm giá trị mặc định
// trừ khi bạn chỉ định `từ` trong đối tượng sendParam khi gửi giao dịch với phiên bản kip17Instance.
> kip17Instance.options.from = '0x{address in hex}'
> kip17Instance.setApprovalForAll('0x{address in hex}', true).then(console.log)
```

## kip17Instance.transferFrom <a id="kip17instance-transferfrom"></a>

```javascript
kip17Instance.transferFrom(from, to, tokenId [, sendParam])
```

Chuyển token của id token đã cho `tokenId` từ số dư của chủ sở hữu token sang địa chỉ khác. Địa chỉ đã được phê duyệt để gửi token của chủ sở hữu token \(nhà điều hành\) hoặc chính chủ sở hữu token sẽ thực hiện giao dịch chuyển token này. Do đó, người được phê duyệt hoặc chủ sở hữu token phải là người gửi giao dịch này có địa chỉ phải được cung cấp tại `sendParam.from` hoặc `kip7Instance.options.from`. Nếu không cung cấp `sendParam.from` hoặc `kip7Instance.options.from` thì sẽ xảy ra lỗi. Bạn nên sử dụng [safeTransferFrom](caver.klay.KIP17.md#kip17instance-safetransferfrom) bất cứ khi nào có thể thay vì phương pháp này.

Lưu ý rằng việc gửi giao dịch này sẽ tính phí giao dịch cho người gửi giao dịch.

**Tham số**

| Tên       | Loại        | Mô tả                                                                                                                                                                                           |
|:--------- |:------------ |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ        | Chuỗi        | Địa chỉ của chủ sở hữu hoặc nhà điều hành được phê duyệt của token đã cho.                                                                                                                      |
| tới       | Chuỗi        | Địa chỉ tài khoản nhận token.                                                                                                                                                                   |
| tokenId   | BigNumber \ | Chuỗi \| Số | Id của token bạn muốn chuyển.                                                                                                                                                    |
| sendParam | Đối tượng    | \(tùy chọn\) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt](caver.klay.KIP17.md#kip17instance-approve). |

**LƯU Ý** Tham số `token` chấp nhận loại `Number` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi Number.MAX \_SAFE\_INTEGER, nó có thể gây ra lỗi hoặc kết quả không mong muốn. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP-17 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
> kip17Instance.transferFrom('0x{address in hex}', '0x{address in hex}', 2, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x9cae3aa93d327804f333674a77d5d01d8c7908c49749b0d747b6391faa232b58',
    blockNumber: 3592,
    contractAddress: null,
    from: '0x9c4fc0ab840914a29c7deb5cc5c625a4cec3a9cd',
    ...
    status: true,
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

// Using kip17Instance.options.from
// If the value of kip17Instance.options.from is set, this value is used as the default value 
// unless you specify `from` in sendParam object when sending a transaction with a kip17Instance instance.
> kip17Instance.options.from = '0x{address in hex}'
> kip17Instance.transferFrom('0x{address in hex}', '0x{address in hex}', 2).then(console.log)
```

## kip17Instance.safeTransferFrom <a id="kip17instance-safetransferfrom"></a>

```javascript
kip17Instance.safeTransferFrom(from, to, tokenId [, data] [, sendParam])
```

Safely transfers the token of the given token id `tokenId` from the token owner's balance to another address. The address who was approved to send the token owner's token \(the operator\) or the token owner itself is expected to execute this token transferring transaction. Thus, the approved one or the token owner should be the sender of this transaction whose address must be given at `sendParam.from` or `kip7Instance.options.from`. Without `sendParam.from` nor `kip7Instance.options.from` being provided, an error would occur.

If the `to` is a contract address, it must implement [IKIP17Receiver.onKIP17Received](https://kips.klaytn.foundation/KIPs/kip-17#wallet-interface). otherwise, the transfer is reverted.

Note that sending this transaction will charge the transaction fee to the transaction sender.

**Parameters**

| Name      | Type         | Description                                                                                                                                                                                                   |
|:--------- |:------------ |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from      | String       | The address of the owner or the approved operator of the given token.                                                                                                                                         |
| to        | String       | The address of the account to receive the token.                                                                                                                                                              |
| tokenId   | BigNumber \ | String \| Number | The id of the token you want to transfer.                                                                                                                                                 |
| data      | Buffer \    | String \| Number | \(optional\) The optional data to send along with the call.                                                                                                                             |
| sendParam | Object       | \(optional\) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [approve](caver.klay.KIP17.md#kip17instance-approve). |

**NOTE** The `tokenId` parameter accepts `Number` type but if the fed value were out of the range capped by Number.MAX\_SAFE\_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP-17 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given (without data)
> kip17Instance.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 9, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x14c5bebc2be86081d8375ba11edba0e541be1df24c1beced1a9e82e3083a8035',
    blockNumber: 6260,
    contractAddress: null,
    from: '0x80b88b47361cec0baee1947868fc872b784cf91e',
    ...
    status: true,
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

// Send via a sendParam object with the from field given (with data)
> kip17Instance.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11, '0x1234', { from: '0x{address in hex}' }).then(console.log)

// Using kip17Instance.options.from
// If the value of kip17Instance.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17Instance instance.
> kip17Instance.options.from = '0x{address in hex}'
> kip17Instance.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11).then(console.log)
```

## kip17Instance.addMinter <a id="kip17instance-addminter"></a>

```javascript
kip17Instance.addMinter(account [, sendParam])
```

Thêm tài khoản với tư cách là minter, người được phép đúc token.

Lưu ý rằng phương thức addMinter sẽ gửi một giao dịch đến mạng Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại     | Mô tả                                                                                                                                                                                           |
|:--------- |:--------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tài khoản | Chuỗi     | Địa chỉ của tài khoản sẽ được thêm vào như minter.                                                                                                                                              |
| sendParam | Đối tượng | \(tùy chọn\) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt](caver.klay.KIP17.md#kip17instance-approve). |

**LƯU Ý** Nếu `sendParam.from` hoặc `KIP17Instance.options.from` đã được cung cấp, thì đó phải là một minter nhỏ.

**Giá trị trả về**

`Promise` trả về `Object` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Biên nhận từ các phiên bản KIP-17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'nhật ký'.

**Ví dụ**

```javascript
// Gửi qua một đối tượng sendParam với trường từ đã cho
> kip17Instance.addMinter('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xecd0fb45a32323d5cb14558d1d9299393022d5e7284519598dbd8b14c4c55930',
    blockNumber: 8307,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    status: true,
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
                account: '0x90170C1E7E8C14BBf1124f52980372088BA540Dc',
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

// Sử dụng kip17Instance.options.from
// Nếu giá trị của kip17Instance.options.from được đặt, giá trị này được sử dụng làm giá trị mặc định
// trừ khi bạn chỉ định `từ` trong đối tượng sendParam khi gửi giao dịch với phiên bản kip17Instance.
> kip17Instance.options.from = '0x{address in hex}'
> kip17Instance.addMinter('0x{address in hex}').then(console.log)
```

## kip17Instance.renounceMinter <a id="kip17instance-renounceminter"></a>

```javascript
kip17Instance.renounceMinter([sendParam])
```

Từ bỏ quyền đúc token. Chỉ một địa chỉ minter mới có thể từ bỏ quyền đúc.

Lưu ý rằng phương thức renounceMinter sẽ gửi một giao dịch đến mạng Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại      | Mô tả                                                                                                                                                                                           |
|:--------- |:--------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | Đối tượng | \(tùy chọn\) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt](caver.klay.KIP17.md#kip17instance-approve). |

Nếu `sendParam.from` hoặc `KIP17Instance.options.from` đã được cung cấp, thì đó phải là một minter với MinterRole.

**Giá trị trả về**

`Promise` trả về `Object` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Biên nhận từ các phiên bản KIP-17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'nhật ký'.

**Ví dụ**

```javascript
// Gửi qua một đối tượng sendParam với trường từ đã cho
> kip17Instance.renounceMinter({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xe130d7ee71a2c55b3cf4e2bce9ea26e7c2cde556c7f8288abac60121b27c26c8',
    blockNumber: 8542,
    contractAddress: null,
    from: '0xb72f5cf2627e6614984d8a9f27ee426b29191831',
    ...
    status: true,
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
                account: '0xB72F5cF2627e6614984D8A9F27eE426b29191831',
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

// Sử dụng kip17Instance.options.from
// Nếu giá trị của kip17Instance.options.from được đặt, giá trị này được sử dụng làm giá trị mặc định
// trừ khi bạn chỉ định `từ` trong đối tượng sendParam khi gửi giao dịch với phiên bản kip17Instance.
> kip17Instance.options.from = '0x{address in hex}'
> kip17Instance.renounceMinter().then(console.log)
```

## kip17Instance.mintWithTokenURI <a id="kip17instance-mintwithtokenuri"></a>

```javascript
kip17Instance.mintWithTokenURI(to, tokenId, tokenURI [, sendParam])
```

Tạo token với uri đã cho và gán chúng cho tài khoản đã cho. Phương pháp này làm tăng tổng nguồn cung của token này.

Note that the mintWithTokenURI method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name      | Type         | Description                                                                                                                                                                                                   |
|:--------- |:------------ |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| to        | String       | The address of the account to which the minted token will be issued.                                                                                                                                          |
| tokenId   | BigNumber \ | String \| Number | The id of the token to be minted.                                                                                                                                                         |
| tokenURI  | String       | The uri string of the token to be minted.                                                                                                                                                                     |
| sendParam | Object       | \(optional\) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [approve](caver.klay.KIP17.md#kip17instance-approve). |

**NOTE** The `tokenId` parameter accepts `Number` type but if the fed value were out of the range capped by Number.MAX\_SAFE\_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**NOTE** If `sendParam.from` or `KIP17Instance.options.from` were given, it should be a minter with MinterRole.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP-17 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
> kip17Instance.mintWithTokenURI('0x{address in hex}', 18, tokenURI, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xd2473b9853ad33c5fa0a75187e65733614ed4f8c937d06e239768a5ca32d7c7f',
    blockNumber: 9313,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    status: true,
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

// Using kip17Instance.options.from
// If the value of kip17Instance.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17Instance instance.
> kip17Instance.options.from = '0x{address in hex}'
> kip17Instance.mintWithTokenURI('0x{address in hex}', 18, tokenURI).then(console.log)
```

## kip17Instance.burn <a id="kip17instance-burn"></a>

```javascript
kip17Instance.burn(tokenId [, sendParam])
```

Destroys the token of the given token id. Without `sendParam.from` nor `KIP17Instance.options.from` being provided, an error would occur.

Note that the burn method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name      | Type         | Description                                                                                                                                                                                                   |
|:--------- |:------------ |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenId   | BigNumber \ | String \| Number | The id of the token to be destroyed.                                                                                                                                                      |
| sendParam | Object       | \(optional\) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [approve](caver.klay.KIP17.md#kip17instance-approve). |

**NOTE** The `tokenId` parameter accepts `Number` type but if the fed value were out of the range capped by Number.MAX\_SAFE\_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Biên nhận từ các phiên bản KIP-17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'nhật ký'.

**Ví dụ**

```javascript
// Gửi qua một đối tượng sendParam với trường từ đã cho
> kip17Instance.burn(14, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x09d8ed5582fdd1c39b0f19f14f065659fe275a60856d86a1840535f6df1a2d51',
    blockNumber: 18237,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    status: true,
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

// Sử dụng kip17Instance.options.from
// Nếu giá trị của kip17Instance.options.from được đặt, giá trị này được sử dụng làm giá trị mặc định
// trừ khi bạn chỉ định `từ` trong đối tượng sendParam khi gửi giao dịch với phiên bản kip17Instance.
> kip17Instance.options.from = '0x{address in hex}'
> kip17Instance.burn(14).then(console.log)
```

## kip17Instance.pause <a id="kip17instance-pause"></a>

```javascript
kip17Instance.pause([sendParam])
```

Tạm dừng các chức năng liên quan đến việc gửi token.

Lưu ý rằng phương thức tạm dừng sẽ gửi một giao dịch đến mạng Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại     | Mô tả                                                                                                                                                                                           |
|:--------- |:--------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | Đối tượng | \(tùy chọn\) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt](caver.klay.KIP17.md#kip17instance-approve). |

**LƯU Ý** Nếu `sendParam.from` hoặc `KIP17Instance.options.from` được cung cấp, thì đó phải là một trình tạm dừng có PauserRole.

**Giá trị trả về**

`Promise` trả về `Object` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Biên nhận từ các phiên bản KIP-17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'nhật ký'.

**Ví dụ**

```javascript
// Gửi qua một đối tượng sendParam với trường từ đã cho 
> kip17Instance.pause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xd73c026474b2077a04808ed0ce6713821eaa8afaed476b19d22b28e483747e04',
    blockNumber: 19826,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    status: true,
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
                account: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
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

// Sử dụng kip17Instance.options.from
// Nếu giá trị của kip17Instance.options.from được đặt, giá trị này được sử dụng làm giá trị mặc định
// trừ khi bạn chỉ định `từ` trong đối tượng sendParam khi gửi giao dịch với phiên bản kip17Instance.
> kip17Instance.options.from = '0x{address in hex}'
> kip17Instance.pause().then(console.log)
```

## kip17Instance.unpause <a id="kip17instance-unpause"></a>

```javascript
kip17Instance.unpause([sendParam])
```

Tiếp tục hợp đồng bị tạm dừng.

Lưu ý rằng phương thức bỏ tạm dừng sẽ gửi một giao dịch đến mạng Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại     | Mô tả                                                                                                                                                                                           |
|:--------- |:--------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | Đối tượng | \(tùy chọn\) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt](caver.klay.KIP17.md#kip17instance-approve). |

**LƯU Ý** Nếu `sendParam.from` hoặc `KIP17Instance.options.from` được cung cấp, thì đó phải là một trình tạm dừng có PauserRole.

**Giá trị trả về**

`Promise` trả về `Object` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Biên nhận từ các phiên bản KIP-17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'nhật ký'.

**Ví dụ**

```javascript
// Gửi qua một đối tượng sendParam với trường từ đã cho
> kip17Instance.unpause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x6a9fc0c70853e696e687b119ba95971a42d91616a040ec17afe1fd4803f5a6cb',
    blockNumber: 19845,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    status: true,
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
                account: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
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

// Sử dụng kip17Instance.options.from
// Nếu giá trị của kip17Instance.options.from được đặt, giá trị này được sử dụng làm giá trị mặc định
// trừ khi bạn chỉ định `từ` trong đối tượng sendParam khi gửi giao dịch với phiên bản kip17Instance.
> kip17Instance.options.from = '0x{address in hex}'
> kip17Instance.unpause().then(console.log)
```

## kip17Instance.addPauser <a id="kip17instance-addpauser"></a>

```javascript
kip17Instance.addPauser(account [, sendParam])
```

Adds an account as a pauser that has the right to suspend the contract.

Note that the addPauser method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name      | Type   | Description                                                                                                                                                                                                   |
|:--------- |:------ |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| account   | String | The address of the account to be a new pauser.                                                                                                                                                                |
| sendParam | Object | \(optional\) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [approve](caver.klay.KIP17.md#kip17instance-approve). |

**NOTE** If `sendParam.from` or `KIP17Instance.options.from` were given, it should be a pauser with PauserRole.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP-17 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
> kip17Instance.addPauser('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xd9f18912c9666a67a2e7445af0abe5140212955b3d35c491e5475d512fdee7d5',
    blockNumber: 20502,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    status: true,
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
                account: '0xD050b56bB04Da257D144e6b382318A2B8c58b0B2',
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

// Using kip17Instance.options.from
// If the value of kip17Instance.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17Instance instance.
> kip17Instance.options.from = '0x{address in hex}'
> kip17Instance.addPauser('0x{address in hex}').then(console.log)
```

## kip17Instance.renouncePauser <a id="kip17instance-renouncepauser"></a>

```javascript
kip17Instance.renouncePauser([sendParam])
```

Renounces the right to pause the contract. Only a pauser address can renounce its own pausing right.

Note that the renouncePauser method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**Parameters**

| Name      | Type   | Description                                                                                                                                                                                                   |
|:--------- |:------ |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | Object | \(optional\) An object with defined parameters for sending a transaction. For more information about sendParam, refer to the parameter description of [approve](caver.klay.KIP17.md#kip17instance-approve). |

**NOTE** If `sendParam.from` or `KIP17Instance.options.from` were given, it should be a pauser with PauserRole.

**Return Value**

`Promise` returns `Object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt](caver.klay/transaction.md#gettransactionreceipt). Receipts from KIP-17 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**Example**

```javascript
// Send via a sendParam object with the from field given 
> kip17Instance.renouncePauser({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x32bb338ca23846478934416d1b1f4152b69a49411d61b316cff8b3a7d62ca91e',
    blockNumber: 20512,
    contractAddress: null,
    from: '0xe04cb220e94e6595427568c954b5d819392813bc',
    ...
    status: true,
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
                account: '0xE04cB220e94E6595427568c954b5D819392813bC',
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

// Using kip17Instance.options.from
// If the value of kip17Instance.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17Instance instance.
> kip17Instance.options.from = '0x{address in hex}'
> kip17Instance.renouncePauser().then(console.log)
```

