---
description: Một đối tượng caver-js được sử dụng để tương tác với một hợp đồng thông minh cho KIP7.

---

# caver.klay.KIP7

`caver.klay.KIP7` giúp bạn dễ dàng xử lý hợp đồng thông minh triển khai KIP-7 dưới dạng đối tượng JavaScript trên chuỗi khối Klaytn.

`caver.klay.KIP7` kế thừa [caver.klay.Contract](caver.klay.Contract.md) để triển khai hợp đồng token KIP-7. `caver.klay.KIP7` duy trì các thuộc tính giống như của `caver.klay.Contract` trong khi các phương pháp bổ sung để triển khai các tính năng bổ sung. Phần này chỉ giới thiệu các phương pháp liên kết mới được thêm vào của `caver.klay.KIP7`.

Abi và mã byte được sử dụng trong caver.klay.KIP7 đã được triển khai bằng cách sử dụng ví dụ về [openzeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).

Để biết thêm thông tin về KIP-7, hãy xem [Đề xuất cải tiến Klaytn](https://kips.klaytn.foundation/KIPs/kip-7).

**LƯU Ý** `caver.klay.KIP7` được hỗ trợ kể từ phiên bản caver-js [v1.4.0](https://www.npmjs.com/package/caver-js/v/1.4.0).

## caver.klay.KIP7.deploy <a id="caver-klay-kip7-deploy"></a>

```javascript
caver.klay.KIP7.deploy(tokenInfo, deployer)
```

Triển khai hợp đồng token KIP-7 cho chuỗi khối Klaytn. Hợp đồng được triển khai bằng cách sử dụng caver.klay.KIP7.deploy là token có thể thay thế tuân theo tiêu chuẩn KIP-7.

Sau khi triển khai thành công, promise sẽ được giải quyết bằng phiên bản KIP7 mới.

**Tham số**

| Tên              | type      | Mô tả                                                                                                                        |
|:---------------- |:--------- |:---------------------------------------------------------------------------------------------------------------------------- |
| tokenInfo        | Đối tượng | Thông tin cần thiết để triển khai hợp đồng token KIP-7 trên blockchain Klaytn. Xem bảng dưới đây để biết thông tin chi tiết. |
| trình triển khai | Chuỗi     | Địa chỉ của tài khoản để triển khai hợp đồng token KIP-7. Tài khoản này phải có đủ KLAY để triển khai.                       |

Đối tượng tokenInfo phải chứa các thông tin sau:

| Tên           | Loại        | Mô tả                                                        |
|:------------- |:------------ |:------------------------------------------------------------ |
| tên           | Chuỗi        | Tên của token.                                               |
| ký hiệu       | Chuỗi        | Ký hiệu của token.                                           |
| thập phân     | Số           | Số vị trí thập phân mà token sử dụng.                        |
| initialSupply | BigNumber \ | Chuỗi \| Số | Tổng số lượng token sẽ được cung cấp ban đầu. |

**LƯU Ý** Tham số `initialSupply` chấp nhận loại `Number` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi Number.MAX \_SAFE\_INTEGER thì nó có thể gây ra lỗi hoặc kết quả không mong muốn. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`PromiEvent`: Bộ phát hiệu ứng kết hợp promise, được giải quyết bằng một phiên bản KIP7 mới. Ngoài ra, có thể xảy ra các sự kiện sau đây:

| Tên             | type      | Mô tả                                                                                                                                                                                                                                                                                                             |
|:--------------- |:--------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionHash | Chuỗi     | Được kích hoạt ngay sau khi giao dịch được gửi và có sẵn hàm băm giao dịch.                                                                                                                                                                                                                                       |
| biên lai        | Đối tượng | Được kích hoạt khi có biên lai giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên lai, hãy xem [getTransactionReceipt](./caver.klay/transaction/transaction.md#gettransactionreceipt). Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua abi thay vì thuộc tính 'bản ghi'. |
| lỗi             | Lỗi       | Được kích hoạt nếu xảy ra lỗi trong quá trình gửi.                                                                                                                                                                                                                                                                |

**Ví dụ**

```javascript
// sử dụng promise
> caver.klay.KIP7.deploy({
    name: 'Jasmine',
    symbol: 'JAS',
    decimals: 18,
    initialSupply: '100000000000000000000',
}, '0x{address in hex}').then(console.log)
KIP7 {
    ...
    _address: '0x598367e443D8a2b644Fec69a2C12aF44BC283f23',
    _jsonInterface: [
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
            signature:  '0x8c5be...'
        }
    ] 
}

// sử dụng bộ phát hiệu ứng and promise
> caver.klay.KIP7.deploy({
    name: 'Jasmine',
    symbol: 'JAS',
    decimals: 18,
    initialSupply: '100000',
}, '0x{address in hex}')
.on('error', function(error) { ... })
.on('transactionHash', function(transactionHash) { ... })
.on('receipt', function(receipt) {
    console.log(receipt.contractAddress) // chứa địa chỉ hợp đồng token mới
})
.then(function(newKIP7Instance) {
    console.log(newKIP7Instance.options.address) // ví dụ với địa chỉ hợp đồng token mới
})
```

## new KIP7 <a id="new-kip7"></a>

```javascript
caver.klay.KIP7([tokenAddress]) mới
```

Tạo một phiên bản KIP7 mới với các phương pháp và sự kiện liên kết của nó.

**Tham số**

| Tên          | Loại | Mô tả                                                                                                                           |
|:------------ |:----- |:------------------------------------------------------------------------------------------------------------------------------- |
| tokenAddress | Chuỗi | \(tùy chọn\) Địa chỉ của hợp đồng token KIP-7, có thể được chỉ định sau thông qua `kip7Instance.options.address = '0x1234..'` |

**Giá trị trả về**

| Loại     | Mô tả                                                          |
|:--------- |:-------------------------------------------------------------- |
| Đối tượng | Phiên bản KIP7 với các phương pháp và sự kiện liên kết của nó. |

**Ví dụ**

```javascript
// Tạo một phiên bản KIP7 không có tham số
> const kip7Instance = new caver.klay.KIP7()

// Tạo một phiên bản KIP7 với địa chỉ token
> const kip7Instance = new caver.klay.KIP7('0x{address in hex}')
```

## kip7Instance.clone <a id="kip7instance-clone"></a>

```javascript
kip7Instance.clone([tokenAddress])
```

Sao chép phiên bản KIP7 hiện tại.

**Tham số**

| Tên          | type  | Mô tả                                                                                                                                                         |
|:------------ |:----- |:------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenAddress | Chuỗi | \(tùy chọn\) Địa chỉ của hợp đồng thông minh đã triển khai token KIP7- khác. Nếu bị bỏ qua, nó sẽ được đặt thành địa chỉ hợp đồng trong trường hợp ban đầu. |

**Giá trị trả về**

| type      | Mô tả                               |
|:--------- |:----------------------------------- |
| Đối tượng | Bản sao của phiên bản KIP7 ban đầu. |

**Ví dụ**

```javascript
> const kip7Instance = new caver.klay.KIP7(address)

// Sao chép không có tham số
> const cloned = kip7Instance.clone()

// Sao chép với địa chỉ của hợp đồng token mới
> const cloned = kip7Instance.clone('0x{address in hex}')
```

## kip7Instance.supportsInterface <a id="kip7instance-supportsinterface"></a>

```javascript
kip7Instance.supportsInterface(interfaceId)
```

Trả về `true` nếu hợp đồng này triển khai giao diện được xác định bởi `interfaceId`.

**Tham số**

| Tên         | Loại | Mô tả                          |
|:----------- |:----- |:------------------------------ |
| interfaceId | Chuỗi | InterfaceId cần được kiểm tra. |

**Giá trị trả về**

`Promise` trả về `Boolean`: `true` nếu hợp đồng này triển khai giao diện được xác định bởi `interfaceId`.

**Ví dụ**

```javascript
> kip7Instance.supportsInterface('0x65787371').then(console.log)
true
> kip7Instance.supportsInterface('0x3a2820fe').then(console.log)
false
```

## kip7Instance.name <a id="kip7instance-name"></a>

```javascript
kip7Instance.name()
```

Trả về tên của token.

**Tham số**

Không có

**Giá trị trả về**

`Promise` trả về `Chuỗi`: Tên của token.

**Ví dụ**

```javascript
> kip7Instance.name().then(console.log)
Jasmine
```

## kip7Instance.symbol <a id="kip7instance-symbol"></a>

```javascript
kip7Instance.symbol()
```

Trả về ký hiệu của token.

**Tham số**

Không có

**Giá trị trả về**

`Promise` trả về `Chuỗi`: Ký hiệu của token.

**Ví dụ**

```javascript
> kip7Instance.symbol().then(console.log)
JAS
```

## kip7Instance.decimals <a id="kip7instance-decimals"></a>

```javascript
kip7Instance.decimals()
```

Trả về số vị trí thập phân mà token sử dụng.

**Tham số**

Không có

**Giá trị trả về**

`Promise` trả về `Số`: Số vị trí thập phân mà token sử dụng.

**Ví dụ**

```javascript
> kip7Instance.decimals().then(console.log)
18
```

## kip7Instance.totalSupply <a id="kip7instance-totalsupply"></a>

```javascript
kip7Instance.totalSupply()
```

Trả về tổng nguồn cung token.

**Tham số**

Không có

**Giá trị trả về**

`Promise` trả về `BigNumber`: Tổng số token.

**Ví dụ**

```javascript
> kip7Instance.totalSupply().then(console.log)
100000000000000000000
```

## kip7Instance.balanceOf <a id="kip7instance-balanceof"></a>

```javascript
kip7Instance.balanceOf(address)
```

Trả về số dư của địa chỉ tài khoản đã cho.

**Tham số**

| Tên     | Loại | Mô tả                                         |
|:------- |:----- |:--------------------------------------------- |
| address | Chuỗi | Địa chỉ của tài khoản sẽ được kiểm tra số dư. |

**Giá trị trả về**

`Promise` trả về `BigNumber`: Số dư tài khoản.

**Ví dụ**

```javascript
> kip7Instance.balanceOf('0x{address in hex}').then(console.log)
100000
```

## kip7Instance.allowance <a id="kip7instance-allowance"></a>

```javascript
kip7Instance.allowance(owner, spender)
```

Trả về số lượng token mà `người chi tiêu` được phép rút từ `chủ sở hữu`.

**Tham số**

| Tên            | type  | Mô tả                                                    |
|:-------------- |:----- |:-------------------------------------------------------- |
| chủ sở hữu     | Chuỗi | Địa chỉ tài khoản của chủ sở hữu token.                  |
| người chi tiêu | Chuỗi | Địa chỉ của tài khoản sử dụng token thay cho chủ sở hữu. |

**Giá trị trả về**

`Promise` trả về `BigNumber`: Số lượng token còn lại mà người chi tiêu được phép chi tiêu thay cho chủ sở hữu.

**Ví dụ**

```javascript
> kip7Instance.allowance('0x{address in hex}', '0x{address in hex}').then(console.log)
0

> kip7Instance.allowance('0x{address in hex}', '0x{address in hex}').then(console.log)
10
```

## kip7Instance.isMinter <a id="kip7instance-isminter"></a>

```javascript
kip7Instance.isMinter(address)
```

Trả về `true` nếu tài khoản đã cho là người tạo token có thể phát hành token KIP7 mới.

**Tham số**

| Tên     | Loại | Mô tả                                                          |
|:------- |:----- |:-------------------------------------------------------------- |
| address | Chuỗi | Địa chỉ của tài khoản cần kiểm tra xem có quyền tạo hay không. |

**Giá trị trả về**

`Promise` trả về `Boolean`: `true` nếu tài khoản là một người tạo token.

**Ví dụ**

```javascript
> kip7Instance.isMinter('0x{address in hex}').then(console.log)
true

> kip7Instance.isMinter('0x{address in hex}').then(console.log)
false
```

## kip7Instance.isPauser <a id="kip7instance-ispauser"></a>

```javascript
kip7Instance.isPauser(address)
```

Trả về `true` nếu tài khoản đã cho là người tạm dừng có thể tạm dừng chuyển token.

**Tham số**

| Tên     | type  | Mô tả                                                                     |
|:------- |:----- |:------------------------------------------------------------------------- |
| address | Chuỗi | Địa chỉ của tài khoản đã được kiểm tra để có quyền tạm dừng chuyển token. |

**Giá trị trả về**

`Promise` trả về `Boolean`: `true` nếu tài khoản là trình tạm dừng.

**Ví dụ**

```javascript
> kip7Instance.isPauser('0x{address in hex}').then(console.log)
true

> kip7Instance.isPauser('0x{address in hex}').then(console.log)
false
```

## kip7Instance.paused <a id="kip7instance-paused"></a>

```javascript
kip7Instance.paused()
```

Trả về `true` nếu hợp đồng bị tạm dừng hoặc trả về `false`.

**Tham số**

Không có

**Giá trị trả về**

`Promise` trả về `Boolean`: `true` nếu hợp đồng bị tạm dừng.

**Ví dụ**

```javascript
> kip7Instance.paused().then(console.log)
true

> kip7Instance.paused().then(console.log)
false
```

## kip7Instance.approve <a id="kip7instance-approve"></a>

```javascript
kip7Instance.approve(spender, amount [, sendParam])
```

Đặt `số lượng` token của chủ sở hữu token sẽ được chi tiêu bởi `trình chi tiêu`.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch từ chủ sở hữu đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho chủ sở hữu.

**Tham số**

| Tên            | Loại        | Mô tả                                                                     |
|:-------------- |:------------ |:------------------------------------------------------------------------- |
| người chi tiêu | Chuỗi        | Địa chỉ của tài khoản sử dụng token thay cho chủ sở hữu.                  |
| số lượng       | BigNumber \ | Chuỗi \| Số | Số lượng token mà người chi tiêu được phép sử dụng.        |
| sendParam      | Đối tượng    | \(tùy chọn\) Một đối tượng chứa các tham số cần thiết để gửi giao dịch. |

**LƯU Ý** Tham số `amount` chấp nhận `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi Number.MAX \_SAFE\_INTEGER thì nó có thể gây ra lỗi hoặc kết quả không mong muốn. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

Đối tượng `sendParam` chứa các thông tin sau:

| Tên     | Loại | Mô tả                                                                                                                                                                                                                            |
|:------- |:----- |:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ      | Chuỗi | \(tùy chọn\) Địa chỉ nơi giao dịch sẽ được gửi đi. Nếu bỏ qua tham số này thì sẽ được thiết lập bởi `this.options.from`. Nếu không cung cấp `from` trong đối tượng `sendParam` cũng như `this.options.from` thì sẽ xảy ra lỗi. |
| gas     | Số \ | Chuỗi | \(tùy chọn\) Số gas tối đa được cung cấp cho giao dịch này \(hạn mức gas\). Nếu bị bỏ qua, giá trị này sẽ được caver-js thiết lập bằng cách gọi ra `this.methods.approve(spender,mount).estimateGas({from})`.        |
| giá gas | Số \ | Chuỗi | \(tùy chọn\) Giá gas tính bằng peb để sử dụng cho giao dịch này. Nếu bị bỏ qua, nó sẽ được thiết lập bởi caver-js bằng cách gọi `caver.klay.getGasPrice`.                                                              |
| giá trị | Số \ | Chuỗi \| BN \| BigNumber | \(tùy chọn\) Giá trị sẽ được chuyển tính bằng peb.                                                                                                                                                |

**Giá trị trả về**

`Promise` trả về `Đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên lai, hãy xem mô tả về [getTransactionReceipt](./caver.klay/transaction/transaction.md#gettransactionreceipt). Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Gửi qua một đối tượng sendParam với trường from đã cho
> kip7Instance.approve('0x{address in hex}', 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xf010a98f66b6b36943175cd5b249da54e84abed551cfa02846a2900ddab968c7',
    blockNumber: 2098,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    trạng thái: true,
    to: '0x8ca777e464a83b939ae131ca037f0d8728c6929e',
    ...
    events: {
        Approval: {
            address: '0x8CA777e464a83b939AE131CA037F0d8728C6929e',
            blockNumber: 2098,
            transactionHash: '0xf7469c0420cb5ebb0fbf64a314bd0c9ee7517ea64dd72eefa59bc8005bbc0f99',
            transactionIndex: 0,
            blockHash: '0xf010a98f66b6b36943175cd5b249da54e84abed551cfa02846a2900ddab968c7',
            logIndex: 0,
            id: 'log_c6ec61aa',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0xe36ffD7bc4D588c480B5925B9622881F9d85ea30',
                '2': '10',
                owner: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                spender: '0xe36ffD7bc4D588c480B5925B9622881F9d85ea30',
                value: '10'
            },
            event: 'Approval',
            signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
            raw: {
                data: '0x000000000000000000000000000000000000000000000000000000000000000a',
                topics: [ '0x8c5be...', '0x00...676', '0x00...a30' ]
            },
        },
    },
}

// Sử dụng kip7Instance.options.from
// Nếu giá trị của kip7Instance.options.from được đặt, giá trị này được sử dụng làm giá trị mặc định
// trừ khi bạn chỉ định `từ` trong đối tượng sendParam khi gửi một giao dịch với phiên bản kip7Instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.approve('0x{address in hex}', 10).then(console.log)
```

## kip7Instance.transfer <a id="kip7instance-transfer"></a>

```javascript
kip7Instance.transfer(recipient, amount [, sendParam])
```

Chuyển `số lượng` token đã cho từ số dư của chủ sở hữu token sang `người nhận`. Chủ sở hữu token phải tự mình thực hiện chuyển token này. Do đó, chủ sở hữu token là người gửi giao dịch này có địa chỉ phải được cung cấp tại `sendParam.from` hoặc `kip7Instance.options.from`. Nếu không cung cấp `sendParam.from` hoặc `kip7Instance.options.from` thì sẽ xảy ra lỗi.

Lưu ý rằng việc gửi giao dịch này sẽ tính phí giao dịch cho người gửi giao dịch.

**Tham số**

| Tên        | Loại        | Mô tả                                                                                                                                                                                       |
|:---------- |:------------ |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| người nhận | Chuỗi        | Địa chỉ tài khoản nhận token.                                                                                                                                                               |
| số lượng   | BigNumber \ | Chuỗi \| Số | Số lượng token sẽ được chuyển.                                                                                                                                               |
| sendParam  | Đối tượng    | \(tùy chọn\) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả của tham số [approve](#kip7instance-approve). |

**LƯU Ý** Tham số `amount` chấp nhận `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi Number.MAX \_SAFE\_INTEGER thì nó có thể gây ra lỗi hoặc kết quả không mong muốn. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `Đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên lai, hãy xem mô tả về [getTransactionReceipt](./caver.klay/transaction/transaction.md#gettransactionreceipt). Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Gửi qua một đối tượng sendParam với trường from đã cho
> kip7Instance.transfer('0x{address in hex}', 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x8a078c3a73d678cdd85d471eb21e9ed7d695f8b96fc7315cfa59c1f68be3d2bf',
    blockNumber: 1353,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    trạng thái: true,
    to: '0x05871c21664e18b2906545f8831695650a8f4056',
    ...
    events: {
        Transfer: {
            address: '0x05871c21664E18b2906545f8831695650a8f4056',
            blockNumber: 1353,
            transactionHash: '0x8bd2b21a06241e4cfc0af1ec40e7b15444f730c7529440648aa4ed6b697f08f4',
            transactionIndex: 0,
            blockHash: '0x8a078c3a73d678cdd85d471eb21e9ed7d695f8b96fc7315cfa59c1f68be3d2bf',
            logIndex: 0,
            id: 'log_82ef7705',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0xE411cb0B61FDcC06497794fE3f49F65D5dE41f59',
                '2': '10',
                from: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                to: '0xE411cb0B61FDcC06497794fE3f49F65D5dE41f59',
                value: '10'
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x000000000000000000000000000000000000000000000000000000000000000a',
                topics: [ '0xddf25...', '0x00...676', '0x00...f59' ]
            },
        },
    },
}

// Sử dụng kip7Instance.options.from
// Nếu giá trị của kip7Instance.options.from được đặt, giá trị này được sử dụng làm giá trị mặc định
// trừ khi bạn chỉ định `từ` trong đối tượng sendParam khi gửi một giao dịch với phiên bản kip7Instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.transfer('0x{address in hex}', 10).then(console.log)
```

## kip7Instance.safeTransfer <a id="kip7instance-safetransfer"></a>

```javascript
kip7Instance.safeTransfer(recipient, amount [, data] [, sendParam])
```

Chuyển an toàn `số lượng` token từ số dư của chủ sở hữu token sang `người nhận`. Chủ sở hữu token phải tự mình thực hiện chuyển token này. Do đó, chủ sở hữu token là người gửi giao dịch này có địa chỉ phải được cung cấp tại `sendParam.from` hoặc `kip7Instance.options.from`. Nếu không cung cấp `sendParam.from` hoặc `kip7Instance.options.from` thì sẽ xảy ra lỗi.

Nếu người nhận là một địa chỉ hợp đồng, thì địa chỉ đó phải triển khai [IKIP7Receiver.onKIP7Received](https://kips.klaytn.foundation/KIPs/kip-7#wallet-interface). Nếu không, quá trình chuyển sẽ được hoàn nguyên.

Lưu ý rằng việc gửi giao dịch này sẽ tính phí giao dịch cho người gửi giao dịch.

**Tham số**

| Tên        | Loại        | Mô tả                                                                                                                                                                                       |
|:---------- |:------------ |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| người nhận | Chuỗi        | Địa chỉ tài khoản nhận token.                                                                                                                                                               |
| số lượng   | BigNumber \ | Chuỗi \| Số | Số lượng token bạn muốn chuyển.                                                                                                                                              |
| data       | Bộ đệm \    | Chuỗi \| Số | \(tùy chọn\) Dữ liệu tùy chọn để gửi cùng với lệnh gọi.                                                                                                                    |
| sendParam  | Đối tượng    | \(tùy chọn\) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả của tham số [approve](#kip7instance-approve). |

**LƯU Ý** Tham số `amount` chấp nhận `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi Number.MAX \_SAFE\_INTEGER thì nó có thể gây ra lỗi hoặc kết quả không mong muốn. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `Đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên lai, hãy xem mô tả về [getTransactionReceipt](./caver.klay/transaction/transaction.md#gettransactionreceipt). Biên lai từ các phiên bản KIP17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Gửi qua một đối tượng sendParam với trường from đã cho (không có dữ liệu)
> kip7Instance.safeTransfer('0x{address in hex}', 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x208cd64b95bbd91420fc6b1a7b514a8d3051d09333d79244b6b74ff2f7f3eee4',
    blockNumber: 2384,
    contractAddress: null,
    from: '0xc2c84328845a36fe0c4dcef370d24ec80cf85221',
    ...
    trạng thái: true,
    to: '0xe4aeba6306b0df023aa4b765960fa59dbe925950',
    ...
    events: {
            Transfer: {
                    address: '0xe4AeBa6306b0Df023AA4b765960fA59dbE925950',
                    blockNumber: 2384,
                    transactionHash: '0x47bb085947c282722c1ceab1f4f0380d911ce464a47a19f1e7bddfe08a13563d',
                    transactionIndex: 0,
                    blockHash: '0x208cd64b95bbd91420fc6b1a7b514a8d3051d09333d79244b6b74ff2f7f3eee4',
                    logIndex: 0,
                    id: 'log_58e5e06d',
                    returnValues: {
                            '0': '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            '1': '0x67B092d09B5e94fed58609777cc7Ac9193553B73',
                            '2': '10',
                            from: '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            to: '0x67B092d09B5e94fed58609777cc7Ac9193553B73',
                            value: '10',
                    },
                    event: 'Transfer',
                    signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                    raw: {
                            data: '0x000000000000000000000000000000000000000000000000000000000000000a',
                            topics: [ '0xddf25...', '0x00...221', '0x00...b73' ],
                    },
            },
    },
}

// Gửi qua một đối tượng sendParam với trường from đã cho (có dữ liệu)
> kip7Instance.safeTransfer('0x{address in hex}', 11, '0x1234', { from: '0x{address in hex}' }).then(console.log)

// Sử dụng kip7Instance.options.from
// Nếu giá trị của kip7Instance.options.from được đặt, giá trị này được sử dụng làm giá trị mặc định
// trừ khi bạn chỉ định `từ` trong đối tượng sendParam khi gửi một giao dịch với phiên bản kip7Instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.safeTransfer('0x{address in hex}', 11).then(console.log)
```

## kip7Instance.transferFrom <a id="kip7instance-transferfrom"></a>

```javascript
kip7Instance.transferFrom(sender, recipient, amount [, sendParam])
```

Chuyển `số lượng` token đã cho từ số dư của chủ sở hữu token sang `người nhận`. Địa chỉ đã được phê duyệt để gửi token của chủ sở hữu token dự kiến ​​sẽ thực hiện giao dịch chuyển token này. Do đó, người được phê duyệt phải là người gửi giao dịch này có địa chỉ phải được cung cấp tại `sendParam.from` hoặc `kip7Instance.options.from`. Nếu không cung cấp `sendParam.from` hoặc `kip7Instance.options.from` thì sẽ xảy ra lỗi.

Lưu ý rằng việc gửi giao dịch này sẽ tính phí giao dịch cho người gửi giao dịch.

**Tham số**

| Tên        | type         | Mô tả                                                                                                                                                                                       |
|:---------- |:------------ |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| người gửi  | Chuỗi        | Địa chỉ của tài khoản sở hữu token sẽ được gửi với cơ chế khấu trừ.                                                                                                                         |
| người nhận | Chuỗi        | Địa chỉ tài khoản nhận token.                                                                                                                                                               |
| số lượng   | BigNumber \ | Chuỗi \| Số | Số lượng token bạn muốn chuyển.                                                                                                                                              |
| sendParam  | Đối tượng    | \(tùy chọn\) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả của tham số [approve](#kip7instance-approve). |

**LƯU Ý** Tham số `amount` chấp nhận `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi Number.MAX \_SAFE\_INTEGER thì nó có thể gây ra lỗi hoặc kết quả không mong muốn. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `Đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên lai, hãy xem mô tả về [getTransactionReceipt](./caver.klay/transaction/transaction.md#gettransactionreceipt). Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Gửi qua một đối tượng sendParam với trường from đã cho
> kip7Instance.transferFrom('0x{address in hex}', '0x{address in hex}', 10000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x3adec238e06a9e8d5fa09fc1e1d7c8748b64d07e89678d27e8a379a12a34974f',
    blockNumber: 2331,
    contractAddress: null,
    from: '0x01958c62ab4aec7fc282bec9491da0ef7f830ac2',
    ...
    trạng thái: true,
    to: '0x3d5eb40665d25aaa4160023c4278fa6a94ba4acb',
    ...
    events: {
        Transfer: {
            address: '0x3D5EB40665D25aAa4160023C4278FA6A94BA4aCb',
            blockNumber: 2331,
            transactionHash: '0x5b2232b68681f19d9b6fcd6fb03964ef105912fecb772c11c8ec9fc906be4cbf',
            transactionIndex: 0,
            blockHash: '0x3adec238e06a9e8d5fa09fc1e1d7c8748b64d07e89678d27e8a379a12a34974f',
            logIndex: 0,
            id: 'log_ae57b7a0',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0x49ff9cb8BB8CA10D7f6E1094b2Ba56c3C2DBA231',
                '2': '10000',
                from: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                to: '0x49ff9cb8BB8CA10D7f6E1094b2Ba56c3C2DBA231',
                value: '10000'
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x0000000000000000000000000000000000000000000000000000000000002710',
                topics: [ '0xddf25...', '0x00...676', '0x00...231' ]
            },
        },
        Approval: {
            address: '0x3D5EB40665D25aAa4160023C4278FA6A94BA4aCb',
            blockNumber: 2331,
            transactionHash: '0x5b2232b68681f19d9b6fcd6fb03964ef105912fecb772c11c8ec9fc906be4cbf',
            transactionIndex: 0,
            blockHash: '0x3adec238e06a9e8d5fa09fc1e1d7c8748b64d07e89678d27e8a379a12a34974f',
            logIndex: 1,
            id: 'log_cee37d26',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0x01958c62aB4aEC7fC282bEc9491dA0EF7F830AC2',
                '2': '0',
                owner: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                spender: '0x01958c62aB4aEC7fC282bEc9491dA0EF7F830AC2',
                value: '0'
            },
            event: 'Approval',
            signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
            raw: {
                data: '0x0000000000000000000000000000000000000000000000000000000000000000',
                topics: [ '0x8c5be...', '0x00...676', '0x00...ac2' ]
            },
        },
    },
}

// Sử dụng kip7Instance.options.from
// Nếu giá trị của kip7Instance.options.from được đặt, giá trị này được sử dụng làm giá trị mặc định
// trừ khi bạn chỉ định `từ` trong đối tượng sendParam khi gửi một giao dịch với phiên bản kip7Instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.transferFrom('0x{address in hex}', '0x{address in hex}', 10000).then(console.log)
```

## kip7Instance.safeTransferFrom <a id="kip7instance-safetransferfrom"></a>

```javascript
kip7Instance.safeTransferFrom(sender, recipient, amount [, data] [, sendParam])
```

Chuyển an toàn `số lượng` token từ số dư của chủ sở hữu token sang `người nhận`. Địa chỉ đã được phê duyệt để gửi token của chủ sở hữu token dự kiến ​​sẽ thực hiện giao dịch chuyển token này. Do đó, người được phê duyệt phải là người gửi giao dịch này có địa chỉ phải được cung cấp tại `sendParam.from` hoặc `kip7Instance.options.from`. Nếu không cung cấp `sendParam.from` hoặc `kip7Instance.options.from` thì sẽ xảy ra lỗi.

Nếu người nhận là một địa chỉ hợp đồng, thì địa chỉ đó phải triển khai [IKIP7Receiver.onKIP7Received](https://kips.klaytn.foundation/KIPs/kip-7#wallet-interface). Nếu không, quá trình chuyển sẽ được hoàn nguyên.

Lưu ý rằng việc gửi giao dịch này sẽ tính phí giao dịch cho người gửi giao dịch.

**Tham số**

| Tên        | type         | Mô tả                                                                                                                                                                                       |
|:---------- |:------------ |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| người gửi  | Chuỗi        | Địa chỉ của tài khoản sở hữu token sẽ được gửi với cơ chế khấu trừ.                                                                                                                         |
| người nhận | Chuỗi        | Địa chỉ tài khoản nhận token.                                                                                                                                                               |
| số lượng   | BigNumber \ | Chuỗi \| Số | Số lượng token bạn muốn chuyển.                                                                                                                                              |
| data       | Bộ đệm \    | Chuỗi \| Số | \(tùy chọn\) Dữ liệu tùy chọn để gửi cùng với lệnh gọi.                                                                                                                    |
| sendParam  | Đối tượng    | \(tùy chọn\) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả của tham số [approve](#kip7instance-approve). |

**LƯU Ý** Tham số `amount` chấp nhận `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi Number.MAX \_SAFE\_INTEGER thì nó có thể gây ra lỗi hoặc kết quả không mong muốn. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `Đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên lai, hãy xem mô tả về [getTransactionReceipt](./caver.klay/transaction/transaction.md#gettransactionreceipt). Biên lai từ các phiên bản KIP17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Gửi qua một đối tượng sendParam với trường from đã cho (không có dữ liệu)
> kip7Instance.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 10000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x0d641b9cebb032f10348288623898f8aa319faa0845c5b3b7a59ac397a6a218b',
    blockNumber: 2404,
    contractAddress: null,
    from: '0x090937f5c9b83d961da29149a3c37104bc5e71b3',
    ...
    trạng thái: true,
    to: '0xe4aeba6306b0df023aa4b765960fa59dbe925950',
    ...
    events: {
            Transfer: {
                    address: '0xe4AeBa6306b0Df023AA4b765960fA59dbE925950',
                    blockNumber: 2404,
                    transactionHash: '0xed8c33facaea963f57c268134aaab48fa765e7298fd70d4bc796b1e93c12ad45',
                    transactionIndex: 0,
                    blockHash: '0x0d641b9cebb032f10348288623898f8aa319faa0845c5b3b7a59ac397a6a218b',
                    logIndex: 0,
                    id: 'log_5eaef2c3',
                    returnValues: {
                            '0': '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            '1': '0x67B092d09B5e94fed58609777cc7Ac9193553B73',
                            '2': '10000',
                            from: '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            to: '0x67B092d09B5e94fed58609777cc7Ac9193553B73',
                            value: '10000',
                    },
                    event: 'Transfer',
                    signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
                    raw: {
                            data: '0x0000000000000000000000000000000000000000000000000000000000002710',
                            topics: [ '0xddf25...', '0x00...221', '0x00...b73' ],
                    },
            },
            Approval: {
                    address: '0xe4AeBa6306b0Df023AA4b765960fA59dbE925950',
                    blockNumber: 2404,
                    transactionHash: '0xed8c33facaea963f57c268134aaab48fa765e7298fd70d4bc796b1e93c12ad45',
                    transactionIndex: 0,
                    blockHash: '0x0d641b9cebb032f10348288623898f8aa319faa0845c5b3b7a59ac397a6a218b',
                    logIndex: 1,
                    id: 'log_3f3aedf8',
                    returnValues: {
                            '0': '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            '1': '0x090937f5C9B83d961da29149a3C37104Bc5e71B3',
                            '2': '0',
                            owner: '0xC2C84328845A36Fe0c4DcEf370d24ec80cF85221',
                            spender: '0x090937f5C9B83d961da29149a3C37104Bc5e71B3',
                            value: '0',
                    },
                    event: 'Approval',
                    signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
                    raw: {
                            data: '0x0000000000000000000000000000000000000000000000000000000000000000',
                            topics: [ '0x8c5be...', '0x00...221', '0x00...1b3' ],
                    },
            },
    },
}

// Gửi qua đối tượng sendParam với trường from đã cho (có dữ liệu)
> kip7Instance.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11, '0x1234', { from: '0x{address in hex}' }).then(console.log)

// Sử dụng kip7Instance.options.from
// Nếu giá trị của kip7Instance.options.from được đặt, giá trị này được sử dụng làm giá trị mặc định
// trừ khi bạn chỉ định `từ` trong đối tượng sendParam khi gửi một giao dịch với phiên bản kip7Instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11).then(console.log)
```

## kip7Instance.mint <a id="kip7instance-mint"></a>

```javascript
kip7Instance.mint(tài khoản, amount [, sendParam])
```

Tạo `số lượng` token và cấp token đó cho `tài khoản`, tăng tổng nguồn cung token.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại        | Mô tả                                                                                                                                                                                       |
|:--------- |:------------ |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tài khoản | Chuỗi        | Địa chỉ của tài khoản mà token đã tạo sẽ được phát hành.                                                                                                                                    |
| số lượng  | BigNumber \ | Chuỗi \| Số | Số lượng token sẽ được tạo.                                                                                                                                                  |
| sendParam | Đối tượng    | \(tùy chọn\) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả của tham số [approve](#kip7instance-approve). |

**LƯU Ý** Tham số `amount` chấp nhận `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi Number.MAX \_SAFE\_INTEGER thì nó có thể gây ra lỗi hoặc kết quả không mong muốn. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**LƯU Ý** Nếu `sendParam.from` hoặc `kip7Instance.options.from` được cung cấp, thì đó phải là một người tạo token với MinterRole.

**Giá trị trả về**

`Promise` trả về `Đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên lai, hãy xem mô tả về [getTransactionReceipt](./caver.klay/transaction/transaction.md#gettransactionreceipt). Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Gửi qua một đối tượng sendParam với trường from đã cho
> kip7Instance.mint('0x{address in hex}', 10000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x71e1c7c9de471ed9eb9ec2aca09beb63a654e21514b2b8d25ec93f34b810a709',
    blockNumber: 8466,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    trạng thái: true,
    to: '0x54e9ad10ffcbcc2384863157c851a75a31c1e925',
    ...
    events: {
        Transfer: {
            address: '0x54e9Ad10FFcBCc2384863157c851A75a31C1E925',
            blockNumber: 8466,
            transactionHash: '0xef1db1544d0ba70aa06b77599a8421cee2270703cff7d0233bd09ab3561ab49a',
            transactionIndex: 0,
            blockHash: '0x71e1c7c9de471ed9eb9ec2aca09beb63a654e21514b2b8d25ec93f34b810a709',
            logIndex: 0,
            id: 'log_151f8e90',
            returnValues: {
                '0': '0x0000000000000000000000000000000000000000',
                '1': '0x4756D3c2A3DC61450D949BD9bF702b4209Fc15a0',
                '2': '10000',
                from: '0x0000000000000000000000000000000000000000',
                to: '0x4756D3c2A3DC61450D949BD9bF702b4209Fc15a0',
                value: '10000',
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x0000000000000000000000000000000000000000000000000000000000002710',
                topics: [ '0xddf25...', '0x00...000', '0x00...5a0' ],
            },
        },
    },
}

// Sử dụng kip7Instance.options.from
// Nếu giá trị của kip7Instance.options.from được đặt, giá trị này được sử dụng làm giá trị mặc định
// trừ khi bạn chỉ định `từ` trong đối tượng sendParam khi gửi một giao dịch với phiên bản kip7Instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.mint('0x{address in hex}', 10000).then(console.log)
```

## kip7Instance.addMinter <a id="kip7instance-addminter"></a>

```javascript
kip7Instance.addMinter(tài khoản [, sendParam])
```

Thêm tài khoản với tư cách là người tạo token, là người được phép tạo token.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại     | Mô tả                                                                                                                                                                                       |
|:--------- |:--------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tài khoản | Chuỗi     | Địa chỉ của tài khoản sẽ được thêm vào với vai trò là người tạo token.                                                                                                                      |
| sendParam | Đối tượng | \(tùy chọn\) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả của tham số [approve](#kip7instance-approve). |

**LƯU Ý** Nếu `sendParam.from` hoặc `kip7Instance.options.from` được cung cấp, thì đó phải là một người tạo token.

**Giá trị trả về**

`Promise` trả về `Đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên lai, hãy xem mô tả về [getTransactionReceipt](./caver.klay/transaction/transaction.md#gettransactionreceipt). Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Gửi qua một đối tượng sendParam với trường from đã cho
> kip7Instance.addMinter('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x169db7e80c954f7d95bbb6a5ef3065190e842d515485e1679f8f3027d1b2975f',
    blockNumber: 9593,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    trạng thái: true,
    to: '0x9e2851aff794e69c58e112a3beacbf0de6587f6b',
    ...
    events: {
        MinterAdded: {
            address: '0x9E2851Aff794E69C58E112a3beacbF0De6587f6b',
            blockNumber: 9593,
            transactionHash: '0x11c86fe739ce3f8e6f93f5de87c9626c7cd032dd5e119171f9ec821292cd68e9',
            transactionIndex: 0,
            blockHash: '0x169db7e80c954f7d95bbb6a5ef3065190e842d515485e1679f8f3027d1b2975f',
            logIndex: 0,
            id: 'log_d93efbcd',
            returnValues: {
                '0': '0x823EA6Eb41985218D478C07E77cFBdAd233569C5',
                tài khoản: '0x823EA6Eb41985218D478C07E77cFBdAd233569C5',
            },
            event: 'MinterAdded',
            signature: '0x6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f6',
            raw: {
                data: '0x',
                topics: [ '0x6ae17...', '0x00...9c5' ],
            },
        },
    },
}

// Sử dụng kip7Instance.options.from
// Nếu giá trị của kip7Instance.options.from được đặt, giá trị này được sử dụng làm giá trị mặc định
// trừ khi bạn chỉ định `từ` trong đối tượng sendParam khi gửi một giao dịch với phiên bản kip7Instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.addMinter('0x{address in hex}').then(console.log)
```

## kip7Instance.renounceMinter <a id="kip7instance-renounceminter"></a>

```javascript
kip7Instance.renounceMinter([sendParam])
```

Từ bỏ quyền tạo token. Chỉ một địa chỉ người tạo token mới có thể từ bỏ quyền tạo.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại     | Mô tả                                                                                                                                                                                       |
|:--------- |:--------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | Đối tượng | \(tùy chọn\) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả của tham số [approve](#kip7instance-approve). |

**LƯU Ý** Nếu `sendParam.from` hoặc `kip7Instance.options.from` được cung cấp, thì đó phải là một người tạo token với MinterRole.

**Giá trị trả về**

`Promise` trả về `Đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên lai, hãy xem mô tả về [getTransactionReceipt](./caver.klay/transaction/transaction.md#gettransactionreceipt). Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Gửi qua một đối tượng sendParam với trường from đã cho
> kip7Instance.renounceMinter({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xc1d96a519d9a31a1dab77111af0de73241aa212722859062a96dc3115a2eca23',
    blockNumber: 9996,
    contractAddress: null,
    from: '0x34b91db0f4c7d1381fdf054cc3d0c433b19fca16',
    ...
    trạng thái: true,
    to: '0xeba808dcd0fdbfc21a99961be42665f351487f52',
    ...
    events: {
        MinterRemoved: {
            address: '0xebA808dCD0Fdbfc21a99961BE42665f351487F52',
            blockNumber: 9996,
            transactionHash: '0x52328e3cfb8061915d000dc308ffd67650fa36cf4560f1fb12fdb28a7c903ac9',
            transactionIndex: 0,
            blockHash: '0xc1d96a519d9a31a1dab77111af0de73241aa212722859062a96dc3115a2eca23',
            logIndex: 0,
            id: 'log_bd3a8e46',
            returnValues: {
                '0': '0x34b91Db0F4c7D1381FdF054cc3D0c433B19fCa16',
                tài khoản: '0x34b91Db0F4c7D1381FdF054cc3D0c433B19fCa16',
            },
            event: 'MinterRemoved',
            signature: '0xe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb66692',
            raw: {
                data: '0x',
                topics: [ '0xe9447...', '0x00...a16' ],
            },
        },
    },
}

// Sử dụng kip7Instance.options.from
// Nếu giá trị của kip7Instance.options.from được đặt, giá trị này được sử dụng làm giá trị mặc định
// trừ khi bạn chỉ định `từ` trong đối tượng sendParam khi gửi một giao dịch với phiên bản kip7Instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.renounceMinter().then(console.log)
```

## kip7Instance.burn <a id="kip7instance-burn"></a>

```javascript
kip7Instance.burn(amount [, sendParam])
```

Hủy `số lượng` token trong số dư của người gửi. Nếu không cung cấp `sendParam.from` hoặc `kip7Instance.options.from` thì sẽ xảy ra lỗi.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại        | Mô tả                                                                                                                                                                                       |
|:--------- |:------------ |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| số lượng  | BigNumber \ | Chuỗi \| Số | Số lượng token sẽ bị phá hủy.                                                                                                                                                |
| sendParam | Đối tượng    | \(tùy chọn\) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả của tham số [approve](#kip7instance-approve). |

**LƯU Ý** Tham số `amount` chấp nhận `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi Number.MAX \_SAFE\_INTEGER thì nó có thể gây ra lỗi hoặc kết quả không mong muốn. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `Đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên lai, hãy xem mô tả về [getTransactionReceipt](./caver.klay/transaction/transaction.md#gettransactionreceipt). Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Gửi qua một đối tượng sendParam với trường from đã cho
> kip7Instance.burn(1000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x7cf9e982510d17a2fd5fca3e7a6f9ce5a25a9da6ba81d51b33129fb7fb93e0ae',
    blockNumber: 10495,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    trạng thái: true,
    to: '0x0f681dbc120d9d3be997565626cd87f049f5c405',
    ...
    events: {
        Transfer: {
            address: '0x0f681Dbc120D9d3BE997565626CD87F049f5C405',
            blockNumber: 10495,
            transactionHash: '0x4f2de0b4310c40eeef20ae8e8d129d209195975792de86e1cd00f2345789c9f7',
            transactionIndex: 0,
            blockHash: '0x7cf9e982510d17a2fd5fca3e7a6f9ce5a25a9da6ba81d51b33129fb7fb93e0ae',
            logIndex: 0,
            id: 'log_20f6c253',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '1000',
                from: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                to: '0x0000000000000000000000000000000000000000',
                value: '1000',
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x00000000000000000000000000000000000000000000000000000000000003e8',
                topics: [ '0xddf25...', '0x00...676', '0x00...000' ],
            },
        },
    },
}

// Sử dụng kip7Instance.options.from
// Nếu giá trị của kip7Instance.options.from được đặt, giá trị này được sử dụng làm giá trị mặc định
// trừ khi bạn chỉ định `từ` trong đối tượng sendParam khi gửi một giao dịch với phiên bản kip7Instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.burn(1000).then(console.log)
```

## kip7Instance.burnFrom <a id="kip7instance-burnfrom"></a>

```javascript
kip7Instance.burnFrom(tài khoản, amount [, sendParam])
```

Hủy số lượng token đã cho khỏi `tài khoản`. Hạn mức của người gửi được chỉ định trong `sendParam.from` hoặc `kip7Instance.options.from` bị giảm cùng với số dư của `tài khoản`.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại        | Mô tả                                                                                                                                                                                       |
|:--------- |:------------ |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tài khoản | Chuỗi        | Địa chỉ của tài khoản sở hữu token sẽ bị tiêu đốt bằng cơ chế khấu trừ.                                                                                                                     |
| số lượng  | BigNumber \ | Chuỗi \| Số | Số lượng token sẽ bị phá hủy.                                                                                                                                                |
| sendParam | Đối tượng    | \(tùy chọn\) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả của tham số [approve](#kip7instance-approve). |

**LƯU Ý** Tham số `amount` chấp nhận `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi Number.MAX \_SAFE\_INTEGER thì nó có thể gây ra lỗi hoặc kết quả không mong muốn. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `Đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên lai, hãy xem mô tả về [getTransactionReceipt](./caver.klay/transaction/transaction.md#gettransactionreceipt). Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Gửi qua một đối tượng sendParam với trường from đã cho
> kip7Instance.burnFrom('0x{address in hex}', 1000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xcd9f3d00856a056e54697cde2621d8af779c11378c422700510d6ebf65bea0a8',
    blockNumber: 11371,
    contractAddress: null,
    from: '0x1b7bdfcfb0008d0c958da13f2dc30388271e9ef0',
    ...
    trạng thái: true,
    to: '0x50fafa2b059d26c47d26c35ccb3cd3b856ecc852',
    ...
    events: {
        Transfer: {
            address: '0x50fAFa2B059d26C47D26c35Ccb3Cd3b856Ecc852',
            blockNumber: 11371,
            transactionHash: '0xed37eafc35272bd7c45695b4b94c578c681a1800b1612ca82d0e4e595e947f27',
            transactionIndex: 0,
            blockHash: '0xcd9f3d00856a056e54697cde2621d8af779c11378c422700510d6ebf65bea0a8',
            logIndex: 0,
            id: 'log_a7263788',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '10000',
                from: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                to: '0x0000000000000000000000000000000000000000',
                value: '10000',
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x0000000000000000000000000000000000000000000000000000000000002710',
                topics: [ '0xddf25...', '0x00...676', '0x00...000' ],
            },
        },
        Approval: {
            address: '0x50fAFa2B059d26C47D26c35Ccb3Cd3b856Ecc852',
            blockNumber: 11371,
            transactionHash: '0xed37eafc35272bd7c45695b4b94c578c681a1800b1612ca82d0e4e595e947f27',
            transactionIndex: 0,
            blockHash: '0xcd9f3d00856a056e54697cde2621d8af779c11378c422700510d6ebf65bea0a8',
            logIndex: 1,
            id: 'log_4ca1aac4',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                '1': '0x1B7BdfCFb0008D0C958dA13F2dc30388271E9eF0',
                '2': '0',
                owner: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                spender: '0x1B7BdfCFb0008D0C958dA13F2dc30388271E9eF0',
                value: '0',
            },
            event: 'Approval',
            signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
            raw: {
                data: '0x0000000000000000000000000000000000000000000000000000000000000000',
                topics: [ '0x8c5be...', '0x00...676', '0x00...ef0' ],
            },
        },
    },
}

// Sử dụng kip7Instance.options.from
// Nếu giá trị của kip7Instance.options.from được đặt, giá trị này được sử dụng làm giá trị mặc định
// trừ khi bạn chỉ định `từ` trong đối tượng sendParam khi gửi một giao dịch với phiên bản kip7Instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.burnFrom('0x{address in hex}', 1000).then(console.log)
```

## kip7Instance.addPauser <a id="kip7instance-addpauser"></a>

```javascript
kip7Instance.addPauser(tài khoản [, sendParam])
```

Thêm một tài khoản làm trình tạm dừng có quyền tạm dừng hợp đồng.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | type      | Mô tả                                                                                                                                                                                       |
|:--------- |:--------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tài khoản | Chuỗi     | Địa chỉ của tài khoản sẽ là địa chỉ tạm dừng mới.                                                                                                                                           |
| sendParam | Đối tượng | \(tùy chọn\) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả của tham số [approve](#kip7instance-approve). |

**LƯU Ý** Nếu `sendParam.from` hoặc `kip7Instance.options.from` được cung cấp, thì đó phải là một trình tạm dừng có PauserRole.

**Giá trị trả về**

`Promise` trả về `Đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên lai, hãy xem mô tả về [getTransactionReceipt](./caver.klay/transaction/transaction.md#gettransactionreceipt). Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Gửi qua một đối tượng sendParam với trường from đã cho
> kip7Instance.addPauser('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x14bcefa90f95f5db03ed9c43a77ae910b57960f4f44c786e3a650a8ad163f67a',
    blockNumber: 16524,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    trạng thái: true,
    to: '0x31fee792a85ff4d714f47a151975b4979cb47308',
    ...
    events: {
        PauserAdded: {
            address: '0x31fee792A85ff4D714F47A151975b4979CB47308',
            blockNumber: 16524,
            transactionHash: '0x9bd0cba9f5fdc3fdae4b9f40f46f11bf42314ca2518724e78be266d46a8a9f96',
            transactionIndex: 0,
            blockHash: '0x14bcefa90f95f5db03ed9c43a77ae910b57960f4f44c786e3a650a8ad163f67a',
            logIndex: 0,
            id: 'log_d847b043',
            returnValues: {
                '0': '0x6610B93bAE66F89716C3b010ad39DF476Da9234b',
                tài khoản: '0x6610B93bAE66F89716C3b010ad39DF476Da9234b',
            },
            event: 'PauserAdded',
            signature: '0x6719d08c1888103bea251a4ed56406bd0c3e69723c8a1686e017e7bbe159b6f8',
            raw: {
                data: '0x',
                topics: [ '0x6719d...', '0x00...34b' ],
            },
        },
    },
}

// Sử dụng kip7Instance.options.from
// Nếu giá trị của kip7Instance.options.from được đặt, giá trị này được sử dụng làm giá trị mặc định
// trừ khi bạn chỉ định `từ` trong đối tượng sendParam khi gửi một giao dịch với phiên bản kip7Instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.addPauser('0x{address in hex}').then(console.log)
```

## kip7Instance.renouncePauser <a id="kip7instance-renouncepauser"></a>

```javascript
kip7Instance.renouncePauser([sendParam])
```

Từ bỏ quyền tạm dừng hợp đồng. Chỉ một địa chỉ tạm dừng mới có thể từ bỏ quyền tạm dừng của chính chúng.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | type      | Mô tả                                                                                                                                                                                       |
|:--------- |:--------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | Đối tượng | \(tùy chọn\) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả của tham số [approve](#kip7instance-approve). |

**LƯU Ý** Nếu `sendParam.from` hoặc `kip7Instance.options.from` được cung cấp, thì đó phải là một trình tạm dừng có PauserRole.

**Giá trị trả về**

`Promise` trả về `Đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên lai, hãy xem mô tả về [getTransactionReceipt](./caver.klay/transaction/transaction.md#gettransactionreceipt). Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Gửi qua một đối tượng sendParam với trường from đã cho
> kip7Instance.renouncePauser({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xc0b1b4914ddc8d74e8034fe86ede1b5b88a2c16ee4d678e58fac325c589713f6',
    blockNumber: 16567,
    contractAddress: null,
    from: '0x5934a0c01baa98f3457981b8f5ce6e52ac585578',
    ...
    trạng thái: true,
    to: '0x31fee792a85ff4d714f47a151975b4979cb47308',
    ...
    events: {
        PauserRemoved: {
            address: '0x31fee792A85ff4D714F47A151975b4979CB47308',
            blockNumber: 16567,
            transactionHash: '0xefc93382f5609531dd16f644cf6a3b8e086c623a9fb8038984662f7260482df6',
            transactionIndex: 0,
            blockHash: '0xc0b1b4914ddc8d74e8034fe86ede1b5b88a2c16ee4d678e58fac325c589713f6',
            logIndex: 0,
            id: 'log_e9518d2f',
            returnValues: {
                '0': '0x5934a0c01baA98F3457981b8f5ce6E52ac585578',
                tài khoản: '0x5934a0c01baA98F3457981b8f5ce6E52ac585578',
            },
            event: 'PauserRemoved',
            signature: '0xcd265ebaf09df2871cc7bd4133404a235ba12eff2041bb89d9c714a2621c7c7e',
            raw: {
                data: '0x',
                topics: [ '0xcd265...', '0x00...578' ],
            },
        },
    },
}

// Sử dụng kip7Instance.options.from
// Nếu giá trị của kip7Instance.options.from được đặt, giá trị này được sử dụng làm giá trị mặc định
// trừ khi bạn chỉ định `từ` trong đối tượng sendParam khi gửi một giao dịch với phiên bản kip7Instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.renouncePauser().then(console.log)
```

## kip7Instance.pause <a id="kip7instance-pause"></a>

```javascript
kip7Instance.pause([sendParam])
```

Tạm dừng các chức năng liên quan đến việc gửi token.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại     | Mô tả                                                                                                                                                                                       |
|:--------- |:--------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | Đối tượng | \(tùy chọn\) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả của tham số [approve](#kip7instance-approve). |

**LƯU Ý** Nếu `sendParam.from` hoặc `kip7Instance.options.from` được cung cấp, thì đó phải là một trình tạm dừng có PauserRole.

**Giá trị trả về**

`Promise` trả về `Đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên lai, hãy xem mô tả về [getTransactionReceipt](./caver.klay/transaction/transaction.md#gettransactionreceipt). Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Gửi qua một đối tượng sendParam với trường from đã cho
> kip7Instance.pause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xcd5e787e738a6197df871f0d651f2a9149d5ed03fdf62e918c4eed03003ea539',
    blockNumber: 18218,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    trạng thái: true,
    to: '0xfc83abf47d232739dab9610c46b3f10c8022b3ef',
    ...
    events: {
        Paused: {
            address: '0xFc83ABF47d232739dAb9610C46B3F10C8022b3eF',
            blockNumber: 18218,
            transactionHash: '0x0e660b8c49e8212a69f2d68324e105b4295b534d22ac0b70263d3e54d429d1bb',
            transactionIndex: 0,
            blockHash: '0xcd5e787e738a6197df871f0d651f2a9149d5ed03fdf62e918c4eed03003ea539',
            logIndex: 0,
            id: 'log_2ab0db96',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                tài khoản: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
            },
            event: 'Paused',
            signature: '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258',
            raw: {
                data: '0x0000000000000000000000002f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
                topics: ['0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258'],
            },
        },
    },
}

// Sử dụng kip7Instance.options.from
// Nếu giá trị của kip7Instance.options.from được đặt, giá trị này được sử dụng làm giá trị mặc định
// trừ khi bạn chỉ định `từ` trong đối tượng sendParam khi gửi một giao dịch với phiên bản kip7Instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.pause().then(console.log)
```

## kip7Instance.unpause <a id="kip7instance-unpause"></a>

```javascript
kip7Instance.unpause([sendParam])
```

Tiếp tục hợp đồng bị tạm dừng.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại     | Mô tả                                                                                                                                                                                       |
|:--------- |:--------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | Đối tượng | \(tùy chọn\) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả của tham số [approve](#kip7instance-approve). |

**LƯU Ý** Nếu `sendParam.from` hoặc `kip7Instance.options.from` được cung cấp, thì đó phải là một trình tạm dừng có PauserRole.

**Giá trị trả về**

`Promise` trả về `Đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên lai, hãy xem mô tả về [getTransactionReceipt](./caver.klay/transaction/transaction.md#gettransactionreceipt). Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Gửi qua một đối tượng sendParam với trường from đã cho
> kip7Instance.unpause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xa45194ba608a0a00152f974fb1388ced326522979f4b8f19c3fab3083f1339ac',
    blockNumber: 18239,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    trạng thái: true,
    to: '0xfc83abf47d232739dab9610c46b3f10c8022b3ef',
    ...
    events: {
        Unpaused: {
            address: '0xFc83ABF47d232739dAb9610C46B3F10C8022b3eF',
            blockNumber: 18239,
            transactionHash: '0x449dff9d7970bfe326091516ebb22aeaefb0bda59bc4e2577467618863e36c99',
            transactionIndex: 0,
            blockHash: '0xa45194ba608a0a00152f974fb1388ced326522979f4b8f19c3fab3083f1339ac',
            logIndex: 0,
            id: 'log_9c5a3823',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                tài khoản: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
            },
            event: 'Unpaused',
            signature: '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa',
            raw: {
                data: '0x0000000000000000000000002f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
                topics: ['0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa'],
            },
        },
    },
}

// Sử dụng kip7Instance.options.from
// Nếu giá trị của kip7Instance.options.from được đặt, giá trị này được sử dụng làm giá trị mặc định
// trừ khi bạn chỉ định `từ` trong đối tượng sendParam khi gửi một giao dịch với phiên bản kip7Instance.
> kip7Instance.options.from = '0x{address in hex}'
> kip7Instance.unpause().then(console.log)
```

