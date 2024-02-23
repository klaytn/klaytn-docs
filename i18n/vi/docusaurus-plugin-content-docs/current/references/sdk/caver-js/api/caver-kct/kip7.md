# caver.kct.kip7

`caver.kct.kip7` giúp bạn dễ dàng xử lý hợp đồng thông minh triển khai KIP-7 dưới dạng đối tượng JavaScript trên nền tảng chuỗi khối Klaytn (Klaytn).

`caver.kct.kip7` kế thừa [caver.contract](../caver.contract.md) để triển khai hợp đồng token KIP-7. `caver.kct.kip7` giữ các thuộc tính giống như của `caver.contract` trong khi các phương pháp bổ sung để triển khai các tính năng bổ sung. Phần này chỉ giới thiệu các phương pháp liên kết mới được thêm vào của `caver.kct.kip7`.

Abi và bytecode được sử dụng trong caver.kct.kip7 đã được triển khai bằng cách sử dụng ví dụ về [openzeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).

Mã triển khai KIP-7 cho caver-js hiện có trên [Klaytn Contracts Github Repo](https://github.com/klaytn/klaytn-contracts/tree/main/contracts/KIP/token/KIP7).

Để biết thêm thông tin về KIP-7, hãy xem [Đề xuất cải tiến Klaytn](https://kips.klaytn.foundation/KIPs/kip-7).

## caver.kct.kip7.deploy <a id="caver-klay-kip7-deploy"></a>

```javascript
caver.kct.kip7.deploy(tokenInfo, deployer)
```

Triển khai hợp đồng token KIP-7 cho chuỗi khối Klaytn. Hợp đồng được triển khai bằng cách sử dụng caver.kct.kip7.deploy là token có thể thay thế tuân theo tiêu chuẩn KIP-7.

Sau khi triển khai thành công, promise sẽ được giải quyết bằng phiên bản KIP7 mới.

**Tham số**

| Tên              | type               | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenInfo        | đối tượng          | Thông tin cần thiết để triển khai hợp đồng token KIP-7 trên chuỗi khối Klaytn. Xem bảng dưới đây để biết thông tin chi tiết.                                                                                                                                                                                                                                                                                                                                                                            |
| trình triển khai | chuỗi \| đối tượng | Địa chỉ của keyring để triển khai hợp đồng token KIP-7. Keyring này phải có đủ KLAY để triển khai. Nếu bạn muốn xác định các trường của mình sẽ sử dụng khi gửi giao dịch, bạn có thể chuyển loại đối tượng làm tham số. Tương tự, nếu bạn muốn sử dụng Ủy quyền phí khi triển khai các hợp đồng KIP-7, bạn có thể xác định các trường liên quan đến ủy quyền phí trong đối tượng. Đối với các trường có thể được xác định trong đối tượng, hãy tham khảo mô tả tham số của [phê duyệt](#kip7-approve). |

Đối tượng tokenInfo phải chứa các thông tin sau:

| Tên           | Loại                    | Mô tả                                         |
| ------------- | ------------------------ | --------------------------------------------- |
| tên           | chuỗi                    | Tên của token.                                |
| ký hiệu       | chuỗi                    | Ký hiệu của token.                            |
| thập phân     | số                       | Số vị trí thập phân mà token sử dụng.         |
| initialSupply | BigNumber \| chuỗi \| số | Tổng số lượng token sẽ được cung cấp ban đầu. |

**LƯU Ý** Tham số `initialSupply` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`PromiEvent`: Bộ phát hiệu ứng kết hợp promise, được giải quyết bằng một phiên bản KIP7 mới. Ngoài ra, có thể xảy ra các sự kiện sau đây:

| Tên             | type      | Mô tả                                                                                                                                                                                                                                                              |
| --------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| transactionHash | chuỗi     | Được kích hoạt ngay sau khi giao dịch được gửi và có sẵn hàm băm giao dịch.                                                                                                                                                                                        |
| biên lai        | đối tượng | Được kích hoạt khi có biên lai giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên lai, hãy xem [getTransactionReceipt][]. Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua abi thay vì thuộc tính 'bản ghi'. |
| lỗi             | Lỗi       | Được kích hoạt nếu xảy ra lỗi trong quá trình gửi.                                                                                                                                                                                                                 |

**Ví dụ**

```javascript
// using the promise
> caver.kct.kip7.deploy({
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

// Send object as second parameter
> caver.kct.kip7.deploy({
        name: 'Jasmine',
        symbol: 'JAS',
        decimals: 18,
        initialSupply: '100000000000000000000',
    },
    {
        from: '0x{address in hex}',
        feeDelegation: true,
        feePayer: '0x{address in hex}',
    }).then(console.log)

// using event emitter and promise
> caver.kct.kip7.deploy({
    name: 'Jasmine',
    symbol: 'JAS',
    decimals: 18,
    initialSupply: '100000',
}, '0x{address in hex}')
.on('error', function(error) { ... })
.on('transactionHash', function(transactionHash) { ... })
.on('receipt', function(receipt) {
    console.log(receipt.contractAddress) // contains the new token contract address
})
.then(function(newKIP7Instance) {
    console.log(newKIP7Instance.options.address) // instance with the new token contract address
})
```

## caver.kct.kip7.detectInterface <a id="caver-kct-kip7-detectinterface"></a>

```javascript
caver.kct.kip7.detectInterface(contractAddress)
```

Trả về thông tin của giao diện được triển khai bởi hợp đồng token. Hàm tĩnh này sẽ sử dụng [kip7.detectInterface](#kip7-detectinterface).

**Tham số**

| Tên             | Loại | Mô tả                            |
| --------------- | ----- | -------------------------------- |
| contractAddress | chuỗi | Địa chỉ của hợp đồng token KIP-7 |

**Giá trị trả về**

`Promise` trả về một `đối tượng` chứa kết quả với các giá trị boolean cho dù từng [giao diện KIP-7](https://kips.klaytn.foundation/KIPs/kip-7#kip-13-identifiers) có được triển khai hay không.

**Ví dụ**

```javascript
> caver.kct.kip7.detectInterface('0x{address in hex}').then(console.log)
{
    IKIP7: true,
    IKIP7Metadata: true,
    IKIP7Mintable: true,
    IKIP7Burnable: true,
    IKIP7Pausable: true,
}
```

## caver.kct.kip7.create <a id="caver-kct-kip7-create"></a>

```javascript
caver.kct.kip7.create([tokenAddress])
```

Tạo một phiên bản KIP7 mới với các phương pháp và sự kiện liên kết của nó. Hàm này hoạt động tương tự như [ KIP7 mới](#new-kip7).

**LƯU Ý** `caver.kct.kip7.create` được hỗ trợ kể từ caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

**Tham số**

Xem [KIP7 mới](#new-kip7).

**Giá trị trả về**

Xem [KIP7 mới](#new-kip7).

**Ví dụ**

```javascript
// Create a KIP7 instance without a parameter
> const kip7 = caver.kct.kip7.create()

// Create a KIP7 instance with a token address
> const kip7 = caver.kct.kip7.create('0x{address in hex}')
```

## KIP7 mới <a id="new-kip7"></a>

```javascript
new caver.kct.kip7([tokenAddress])
```

Tạo một phiên bản KIP7 mới với các phương pháp và sự kiện liên kết của nó.

**Tham số**

| Tên          | Loại | Mô tả                                                                                                                                         |
| ------------ | ----- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenAddress | chuỗi | (tùy chọn) Địa chỉ của hợp đồng mã thông báo KIP-7, có thể được chỉ định sau thông qua `kip7.options.address = '0x1234..'` |

**Giá trị trả về**

| Loại     | Mô tả                                                          |
| --------- | -------------------------------------------------------------- |
| đối tượng | Phiên bản KIP7 với các phương pháp và sự kiện liên kết của nó. |

**Ví dụ**

```javascript
// Create a KIP7 instance without a parameter
> const kip7 = new caver.kct.kip7()

// Create a KIP7 instance with a token address
> const kip7 = new caver.kct.kip7('0x{address in hex}')
```

## kip7.clone <a id="kip7-clone"></a>

```javascript
kip7.clone([tokenAddress])
```

Sao chép phiên bản KIP7 hiện tại.

**Tham số**

| Tên          | Loại | Mô tả                                                                                                                                                                        |
| ------------ | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenAddress | chuỗi | (tùy chọn) Địa chỉ của hợp đồng thông minh đã triển khai token KIP7- khác. Nếu bị bỏ qua, nó sẽ được đặt thành địa chỉ hợp đồng trong trường hợp ban đầu. |

**Giá trị trả về**

| Loại     | Mô tả                               |
| --------- | ----------------------------------- |
| đối tượng | Bản sao của phiên bản KIP7 ban đầu. |

**Ví dụ**

```javascript
> const kip7 = new caver.kct.kip7(address)

// Clone without a parameter
> const cloned = kip7.clone()

// Clone with the address of the new token contract
> const cloned = kip7.clone('0x{address in hex}')
```

## kip7.detectInterface <a id="kip7-detectinterface"></a>

```javascript
kip7.detectInterface()
```

Trả về thông tin của giao diện được triển khai bởi hợp đồng token.

**Tham số**

Không có

**Giá trị trả về**

`Promise` trả về một `đối tượng` chứa kết quả với các giá trị boolean cho dù từng [giao diện KIP-7](https://kips.klaytn.foundation/KIPs/kip-7#kip-13-identifiers) có được triển khai hay không.

**Ví dụ**

```javascript
> kip7.detectInterface().then(console.log)
{
    IKIP7: true,
    IKIP7Metadata: true,
    IKIP7Mintable: true,
    IKIP7Burnable: true,
    IKIP7Pausable: true,
}
```

## kip7.supportsInterface <a id="kip7-supportsinterface"></a>

```javascript
kip7.supportsInterface(interfaceId)
```

Trả về `true` nếu hợp đồng này triển khai giao diện được xác định bởi `interfaceId`.

**Tham số**

| Tên         | Loại | Mô tả                          |
| ----------- | ----- | ------------------------------ |
| interfaceId | chuỗi | InterfaceId cần được kiểm tra. |

**Giá trị trả về**

`Promise` trả về `Boolean`: `true` nếu hợp đồng này triển khai giao diện được xác định bởi `interfaceId`.

**Ví dụ**

```javascript
> kip7.supportsInterface('0x65787371').then(console.log)
true

> kip7.supportsInterface('0x3a2820fe').then(console.log)
false
```

## kip7.name <a id="kip7-name"></a>

```javascript
kip7.name()
```

Trả lại tên của token.

**Tham số**

Không có

**Giá trị trả về**

`Promise` trả về `chuỗi`: Tên của token.

**Ví dụ**

```javascript
> kip7.name().then(console.log)
Jasmine
```

## kip7.symbol <a id="kip7-symbol"></a>

```javascript
kip7.symbol()
```

Trả về ký hiệu của token.

**Tham số**

Không có

**Giá trị trả về**

`Promise` trả về `chuỗi`: Ký hiệu của token.

**Ví dụ**

```javascript
> kip7.symbol().then(console.log)
JAS
```

## kip7.decimals <a id="kip7-decimals"></a>

```javascript
kip7.decimals()
```

Trả về số vị trí thập phân mà token sử dụng.

**Tham số**

Không có

**Giá trị trả về**

`Promise` trả về `Số`: Số vị trí thập phân mà token sử dụng.

**Ví dụ**

```javascript
> kip7.decimals().then(console.log)
18
```

## kip7.totalSupply <a id="kip7-totalsupply"></a>

```javascript
kip7.totalSupply()
```

Trả về tổng nguồn cung token.

**Tham số**

Không có

**Giá trị trả về**

`Promise` trả về `BigNumber`: Tổng số token.

**Ví dụ**

```javascript
> kip7.totalSupply().then(console.log)
100000000000000000000
```

## kip7.balanceOf <a id="kip7-balanceof"></a>

```javascript
kip7.balanceOf(address)
```

Trả về số dư của địa chỉ tài khoản đã cho.

**Tham số**

| Tên     | type  | Mô tả                                         |
| ------- | ----- | --------------------------------------------- |
| address | chuỗi | Địa chỉ của tài khoản sẽ được kiểm tra số dư. |

**Giá trị trả về**

`Promise` trả về `BigNumber`: Số dư tài khoản.

**Ví dụ**

```javascript
> kip7.balanceOf('0x{address in hex}').then(console.log)
100000
```

## kip7.allowance <a id="kip7-allowance"></a>

```javascript
kip7.allowance(owner, spender)
```

Trả về số lượng token mà `người chi tiêu` được phép rút từ `chủ sở hữu`.

**Tham số**

| Tên            | Loại | Mô tả                                                    |
| -------------- | ----- | -------------------------------------------------------- |
| chủ sở hữu     | chuỗi | Địa chỉ tài khoản của chủ sở hữu token.                  |
| người chi tiêu | chuỗi | Địa chỉ của tài khoản sử dụng token thay cho chủ sở hữu. |

**Giá trị trả về**

`Promise` trả về `BigNumber`: Số lượng token còn lại mà người chi tiêu được phép chi tiêu thay cho chủ sở hữu.

**Ví dụ**

```javascript
> kip7.allowance('0x{address in hex}', '0x{address in hex}').then(console.log)
0

> kip7.allowance('0x{address in hex}', '0x{address in hex}').then(console.log)
10
```

## kip7.isMinter <a id="kip7-isminter"></a>

```javascript
kip7.isMinter(address)
```

Trả về `true` nếu tài khoản đã cho là người tạo có thể phát hành token KIP7 mới.

**Tham số**

| Tên     | type  | Mô tả                                                          |
| ------- | ----- | -------------------------------------------------------------- |
| address | chuỗi | Địa chỉ của tài khoản cần kiểm tra xem có quyền tạo hay không. |

**Giá trị trả về**

`Promise` trả về `Boolean`: `true` nếu tài khoản là một thợ đào.

**Ví dụ**

```javascript
> kip7.isMinter('0x{address in hex}').then(console.log)
true

> kip7.isMinter('0x{address in hex}').then(console.log)
false
```

## kip7.isPauser <a id="kip7-ispauser"></a>

```javascript
kip7.isPauser(address)
```

Trả về `true` nếu tài khoản đã cho là người tạm dừng có thể tạm dừng chuyển token.

**Tham số**

| Tên     | Loại | Mô tả                                                                     |
| ------- | ----- | ------------------------------------------------------------------------- |
| address | chuỗi | Địa chỉ của tài khoản đã được kiểm tra để có quyền tạm dừng chuyển token. |

**Giá trị trả về**

`Promise` trả về `Boolean`: `true` nếu tài khoản là tạm dừng.

**Ví dụ**

```javascript
> kip7.isPauser('0x{address in hex}').then(console.log)
true

> kip7.isPauser('0x{address in hex}').then(console.log)
false
```

## kip7.paused <a id="kip7-paused"></a>

```javascript
kip7.paused()
```

Trả về `true` nếu hợp đồng bị tạm dừng hoặc trả về `false`.

**Tham số**

Không có

**Giá trị trả về**

`Promise` trả về `Boolean`: `true` nếu hợp đồng bị tạm dừng.

**Ví dụ**

```javascript
> kip7.paused().then(console.log)
true

> kip7.paused().then(console.log)
false
```

## kip7.approve <a id="kip7-approve"></a>

```javascript
kip7.approve(spender, amount [, sendParam])
```

Đặt `số tiền` của token của chủ sở hữu token sẽ được chi tiêu bởi `trình chi tiêu`.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch từ chủ sở hữu đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho chủ sở hữu.

**Tham số**

| Tên            | Loại                    | Mô tả                                                                                    |
| -------------- | ------------------------ | ---------------------------------------------------------------------------------------- |
| người chi tiêu | chuỗi                    | Địa chỉ của tài khoản sử dụng token thay cho chủ sở hữu.                                 |
| số lượng       | BigNumber \| chuỗi \| số | Số lượng token mà người chi tiêu được phép sử dụng.                                      |
| sendParam      | đối tượng                | (tùy chọn) Một đối tượng chứa các tham số cần thiết để gửi giao dịch. |

**LƯU Ý** Tham số `số tiền` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

Đối tượng `sendParam` chứa các thông tin sau:

| Tên           | Loại                       | Mô tả                                                                                                                                                                                                                                                                                                                                                    |
| ------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| từ            | chuỗi                       | (tùy chọn) Địa chỉ mà giao dịch sẽ được gửi từ đó. Nếu bỏ qua tham số này thì sẽ được thiết lập bởi `kip7.options.from`. Nếu không cung cấp `from` trong đối tượng `sendParam` cũng như `kip7.options.from` thì sẽ xảy ra lỗi.                                                                                                        |
| gas           | số \| chuỗi                 | (tùy chọn) Lượng gas tối đa được cung cấp cho giao dịch này (giới hạn gas). Nếu bị bỏ qua, nó sẽ được thiết lập bởi caver-js bằng cách gọi `kip7.methods.approve(spender,mount).estimateGas({from})`.                                                                                                              |
| giá gas       | số \| chuỗi                 | (tùy chọn) Giá gas tính bằng peb cho giao dịch này. Nếu bị bỏ qua, nó sẽ được thiết lập bởi caver-js bằng cách gọi `caver.klay.getGasPrice`.                                                                                                                                                                                          |
| giá trị       | Số \| Chuỗi \| BN \| Số lớn | (tùy chọn) Giá trị được chuyển trong peb.                                                                                                                                                                                                                                                                                             |
| feeDelegation | boolean                     | (tùy chọn, mặc định `sai`) Có sử dụng giao dịch ủy thác phí hay không. Nếu bỏ qua, `kip7.options.feeDelegation` sẽ được sử dụng. Nếu cả hai bị bỏ qua, ủy thác phí không được sử dụng.                                                                                                                                                |
| feePayer      | chuỗi                       | (tùy chọn) Địa chỉ của người trả phí thanh toán phí giao dịch. Khi `feeDelegation` là `đúng`, giá trị sẽ được đặt thành trường `feePayer` trong giao dịch. Nếu bỏ qua, `kip7.options.feePayer` sẽ được sử dụng. Nếu cả hai bị bỏ qua, sẽ đưa ra một lỗi.                                                                              |
| feeRatio      | chuỗi                       | (tùy chọn) Tỷ lệ phí giao dịch mà người trả phí sẽ phải chịu. Nếu `feeDelegation` là `đúng` và `feeRatio` được đặt thành giá trị hợp lệ thì giao dịch ủy thác phí một phần sẽ được sử dụng. Khoảng hợp lệ là từ 1 đến 99. Tỷ lệ không được phép bằng 0 hoặc bằng và cao hơn 100. Nếu bỏ qua, `kip7.options.feeRatio` sẽ được sử dụng. |

**LƯU Ý** `feeDelegation`, `feePayer` và `feeRatio` được hỗ trợ kể từ phiên bản caver-js[v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1).

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua abi thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip7.approve('0x{address in hex}', 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xf010a98f66b6b36943175cd5b249da54e84abed551cfa02846a2900ddab968c7',
    blocknumber: 2098,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0x8ca777e464a83b939ae131ca037f0d8728c6929e',
    ...
    events: {
        Approval: {
            address: '0x8CA777e464a83b939AE131CA037F0d8728C6929e',
            blocknumber: 2098,
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

// Using FD transaction to execute the smart contract
> kip7.approve('0x{address in hex}', 10, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.approve('0x{address in hex}', 10).then(console.log)
```

## kip7.transfer <a id="kip7-transfer"></a>

```javascript
kip7.transfer(recipient, amount [, sendParam])
```

Chuyển `số tiền` đã cho của token từ số dư của chủ sở hữu token sang `người nhận`. Chủ sở hữu token phải thực hiện chuyển token này bằng chính tay của mình. Do đó, chủ sở hữu token phải là người gửi giao dịch này có địa chỉ phải được cung cấp tại `sendParam.from` hoặc `kip7.options.from`. Nếu không cung cấp `sendParam.from` hoặc `kip7.options.from` thì sẽ xảy ra lỗi.

Lưu ý rằng việc gửi giao dịch này sẽ tính phí giao dịch cho người gửi giao dịch.

**Tham số**

| Tên        | Loại                    | Mô tả                                                                                                                                                                              |
| ---------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| người nhận | chuỗi                    | Địa chỉ tài khoản nhận token.                                                                                                                                                      |
| số lượng   | BigNumber \| chuỗi \| số | Số lượng mã thông báo sẽ được chuyển.                                                                                                                                              |
| sendParam  | đối tượng                | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt](#kip7-approve). |

**LƯU Ý** Tham số `số tiền` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua abi thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip7.transfer('0x{address in hex}', 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x8a078c3a73d678cdd85d471eb21e9ed7d695f8b96fc7315cfa59c1f68be3d2bf',
    blocknumber: 1353,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0x05871c21664e18b2906545f8831695650a8f4056',
    ...
    events: {
        Transfer: {
            address: '0x05871c21664E18b2906545f8831695650a8f4056',
            blocknumber: 1353,
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

// Using FD transaction to execute the smart contract
> kip7.transfer('0x{address in hex}', 10, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.transfer('0x{address in hex}', 10).then(console.log)
```

## kip7.safeTransfer <a id="kip7-safetransfer"></a>

```javascript
kip7.safeTransfer(recipient, amount [, data] [, sendParam])
```

Chuyển một cách an toàn `số tiền` của token từ số dư của chủ sở hữu token sang `người nhận`. Chủ sở hữu token phải thực hiện chuyển token này bằng chính tay của mình. Do đó, chủ sở hữu token phải là người gửi giao dịch này có địa chỉ phải được cung cấp tại `sendParam.from` hoặc `kip7.options.from`. Nếu không cung cấp `sendParam.from` hoặc `kip7.options.from` thì sẽ xảy ra lỗi.

Nếu người nhận là một địa chỉ hợp đồng, thì địa chỉ đó phải triển khai [IKIP7Receiver.onKIP7Received](https://kips.klaytn.foundation/KIPs/kip-7#wallet-interface). Nếu không, quá trình chuyển sẽ được hoàn nguyên.

Lưu ý rằng việc gửi giao dịch này sẽ tính phí giao dịch cho người gửi giao dịch.

**Tham số**

| Tên        | type                     | Mô tả                                                                                                                                                                              |
| ---------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| người nhận | chuỗi                    | Địa chỉ tài khoản nhận token.                                                                                                                                                      |
| số lượng   | BigNumber \| chuỗi \| số | Số lượng token bạn muốn chuyển.                                                                                                                                                    |
| data       | Bộ đệm \| chuỗi \| số    | (tùy chọn) Dữ liệu tùy chọn để gửi cùng với cuộc gọi.                                                                                                           |
| sendParam  | đối tượng                | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt](#kip7-approve). |

**LƯU Ý** Tham số `số tiền` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given (without data)
> kip7.safeTransfer('0x{address in hex}', 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x208cd64b95bbd91420fc6b1a7b514a8d3051d09333d79244b6b74ff2f7f3eee4',
    blocknumber: 2384,
    contractAddress: null,
    from: '0xc2c84328845a36fe0c4dcef370d24ec80cf85221',
    ...
    status: true,
    to: '0xe4aeba6306b0df023aa4b765960fa59dbe925950',
    ...
    events: {
            Transfer: {
                    address: '0xe4AeBa6306b0Df023AA4b765960fA59dbE925950',
                    blocknumber: 2384,
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

// Using FD transaction to execute the smart contract
> kip7.safeTransfer('0x{address in hex}', 10, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Send via a sendParam object with the from field given (with data)
> kip7.safeTransfer('0x{address in hex}', 11, '0x1234', { from: '0x{address in hex}' }).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.safeTransfer('0x{address in hex}', 11).then(console.log)
```

## kip7.transferFrom <a id="kip7-transferfrom"></a>

```javascript
kip7.transferFrom(sender, recipient, amount [, sendParam])
```

Chuyển `số tiền` đã cho của token từ số dư của chủ sở hữu token sang `người nhận`. Địa chỉ đã được phê duyệt để gửi token của chủ sở hữu token dự kiến ​​sẽ thực hiện giao dịch chuyển token này. Do đó, người được phê duyệt phải là người gửi giao dịch này có địa chỉ phải được cung cấp tại `sendParam.from` hoặc `kip7.options.from`. Nếu không cung cấp `sendParam.from` hoặc `kip7.options.from` thì sẽ xảy ra lỗi.

Lưu ý rằng việc gửi giao dịch này sẽ tính phí giao dịch cho người gửi giao dịch.

**Tham số**

| Tên        | type                     | Mô tả                                                                                                                                                                              |
| ---------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| người gửi  | chuỗi                    | Địa chỉ của tài khoản sở hữu token sẽ được gửi với cơ chế trợ cấp.                                                                                                                 |
| người nhận | chuỗi                    | Địa chỉ tài khoản nhận token.                                                                                                                                                      |
| số lượng   | BigNumber \| chuỗi \| số | Số lượng token bạn muốn chuyển.                                                                                                                                                    |
| sendParam  | đối tượng                | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt](#kip7-approve). |

**LƯU Ý** Tham số `số tiền` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua abi thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given
> kip7.transferFrom('0x{address in hex}', '0x{address in hex}', 10000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x3adec238e06a9e8d5fa09fc1e1d7c8748b64d07e89678d27e8a379a12a34974f',
    blocknumber: 2331,
    contractAddress: null,
    from: '0x01958c62ab4aec7fc282bec9491da0ef7f830ac2',
    ...
    status: true,
    to: '0x3d5eb40665d25aaa4160023c4278fa6a94ba4acb',
    ...
    events: {
        Transfer: {
            address: '0x3D5EB40665D25aAa4160023C4278FA6A94BA4aCb',
            blocknumber: 2331,
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
            blocknumber: 2331,
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

// Using FD transaction to execute the smart contract
> kip7.transferFrom('0x{address in hex}', '0x{address in hex}', 10000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.transferFrom('0x{address in hex}', '0x{address in hex}', 10000).then(console.log)
```

## kip7.safeTransferFrom <a id="kip7-safetransferfrom"></a>

```javascript
kip7.safeTransferFrom(sender, recipient, amount [, data] [, sendParam])
```

Chuyển một cách an toàn `số tiền` của token từ số dư của chủ sở hữu token sang `người nhận`. Địa chỉ đã được phê duyệt để gửi token của chủ sở hữu token dự kiến ​​sẽ thực hiện giao dịch chuyển token này. Do đó, người được phê duyệt phải là người gửi giao dịch này có địa chỉ phải được cung cấp tại `sendParam.from` hoặc `kip7.options.from`. Nếu không cung cấp `sendParam.from` hoặc `kip7.options.from` thì sẽ xảy ra lỗi.

Nếu người nhận là một địa chỉ hợp đồng, thì địa chỉ đó phải triển khai [IKIP7Receiver.onKIP7Received](https://kips.klaytn.foundation/KIPs/kip-7#wallet-interface). Nếu không, quá trình chuyển sẽ được hoàn nguyên.

Lưu ý rằng việc gửi giao dịch này sẽ tính phí giao dịch cho người gửi giao dịch.

**Tham số**

| Tên        | Loại                    | Mô tả                                                                                                                                                                              |
| ---------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| người gửi  | chuỗi                    | Địa chỉ của tài khoản sở hữu token sẽ được gửi với cơ chế trợ cấp.                                                                                                                 |
| người nhận | chuỗi                    | Địa chỉ tài khoản nhận token.                                                                                                                                                      |
| số lượng   | BigNumber \| chuỗi \| số | Số lượng token bạn muốn chuyển.                                                                                                                                                    |
| data       | Bộ đệm \| chuỗi \| số    | (tùy chọn) Dữ liệu tùy chọn để gửi cùng với cuộc gọi.                                                                                                           |
| sendParam  | đối tượng                | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt](#kip7-approve). |

**LƯU Ý** Tham số `số tiền` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP17 có thuộc tính 'sự kiện' được phân tích cú pháp qua ABI thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given (without data)
> kip7.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 10000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x0d641b9cebb032f10348288623898f8aa319faa0845c5b3b7a59ac397a6a218b',
    blocknumber: 2404,
    contractAddress: null,
    from: '0x090937f5c9b83d961da29149a3c37104bc5e71b3',
    ...
    status: true,
    to: '0xe4aeba6306b0df023aa4b765960fa59dbe925950',
    ...
    events: {
            Transfer: {
                    address: '0xe4AeBa6306b0Df023AA4b765960fA59dbE925950',
                    blocknumber: 2404,
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
                    blocknumber: 2404,
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

// Using FD transaction to execute the smart contract
> kip7.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 10000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Send via a sendParam object with the from field given (with data)
> kip7.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11, '0x1234', { from: '0x{address in hex}' }).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11).then(console.log)
```

## kip7.mint <a id="kip7-mint"></a>

```javascript
kip7.mint(account, amount [, sendParam])
```

Tạo `số lượng` token và cấp token đó cho `tài khoản`, tăng tổng nguồn cung cấp token.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại                    | Mô tả                                                                                                                                                                              |
| --------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tài khoản | chuỗi                    | Địa chỉ của tài khoản mà token tạo sẽ được phát hành.                                                                                                                              |
| số lượng  | BigNumber \| chuỗi \| số | Số lượng token sẽ được tạo.                                                                                                                                                        |
| sendParam | đối tượng                | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt](#kip7-approve). |

**LƯU Ý** Tham số `số tiền` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**LƯU Ý** Nếu `sendParam.from` hoặc `kip7.options.from` được cung cấp, thì đó phải là một người tạo có vai trò MinterRole.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua abi thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip7.mint('0x{address in hex}', 10000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x71e1c7c9de471ed9eb9ec2aca09beb63a654e21514b2b8d25ec93f34b810a709',
    blocknumber: 8466,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0x54e9ad10ffcbcc2384863157c851a75a31c1e925',
    ...
    events: {
        Transfer: {
            address: '0x54e9Ad10FFcBCc2384863157c851A75a31C1E925',
            blocknumber: 8466,
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

// Using FD transaction to execute the smart contract
> kip7.mint('0x{address in hex}', 10000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.mint('0x{address in hex}', 10000).then(console.log)
```

## kip7.addMinter <a id="kip7-addminter"></a>

```javascript
kip7.addMinter(account [, sendParam])
```

Thêm tài khoản với tư cách là người tạo, người được phép tạo token.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại     | Mô tả                                                                                                                                                                              |
| --------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tài khoản | chuỗi     | Địa chỉ của tài khoản sẽ được thêm vào như minter.                                                                                                                                 |
| sendParam | đối tượng | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt](#kip7-approve). |

**LƯU Ý** Nếu `sendParam.from` hoặc `kip7.options.from` được cung cấp, thì đó phải là một minter.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua abi thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip7.addMinter('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x169db7e80c954f7d95bbb6a5ef3065190e842d515485e1679f8f3027d1b2975f',
    blocknumber: 9593,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0x9e2851aff794e69c58e112a3beacbf0de6587f6b',
    ...
    events: {
        MinterAdded: {
            address: '0x9E2851Aff794E69C58E112a3beacbF0De6587f6b',
            blocknumber: 9593,
            transactionHash: '0x11c86fe739ce3f8e6f93f5de87c9626c7cd032dd5e119171f9ec821292cd68e9',
            transactionIndex: 0,
            blockHash: '0x169db7e80c954f7d95bbb6a5ef3065190e842d515485e1679f8f3027d1b2975f',
            logIndex: 0,
            id: 'log_d93efbcd',
            returnValues: {
                '0': '0x823EA6Eb41985218D478C07E77cFBdAd233569C5',
                account: '0x823EA6Eb41985218D478C07E77cFBdAd233569C5',
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

// Using FD transaction to execute the smart contract
> kip7.addMinter('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.addMinter('0x{address in hex}').then(console.log)
```

## kip7.renounceMinter <a id="kip7-renounceminter"></a>

```javascript
kip7.renounceMinter([sendParam])
```

Từ bỏ quyền tạo token. Chỉ một địa chỉ minter mới có thể từ bỏ quyền tạo.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại     | Mô tả                                                                                                                                                                              |
| --------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | đối tượng | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt](#kip7-approve). |

**LƯU Ý** Nếu `sendParam.from` hoặc `kip7.options.from` được cung cấp, thì đó phải là một người tạo có vai trò MinterRole.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua abi thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip7.renounceMinter({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xc1d96a519d9a31a1dab77111af0de73241aa212722859062a96dc3115a2eca23',
    blocknumber: 9996,
    contractAddress: null,
    from: '0x34b91db0f4c7d1381fdf054cc3d0c433b19fca16',
    ...
    status: true,
    to: '0xeba808dcd0fdbfc21a99961be42665f351487f52',
    ...
    events: {
        MinterRemoved: {
            address: '0xebA808dCD0Fdbfc21a99961BE42665f351487F52',
            blocknumber: 9996,
            transactionHash: '0x52328e3cfb8061915d000dc308ffd67650fa36cf4560f1fb12fdb28a7c903ac9',
            transactionIndex: 0,
            blockHash: '0xc1d96a519d9a31a1dab77111af0de73241aa212722859062a96dc3115a2eca23',
            logIndex: 0,
            id: 'log_bd3a8e46',
            returnValues: {
                '0': '0x34b91Db0F4c7D1381FdF054cc3D0c433B19fCa16',
                account: '0x34b91Db0F4c7D1381FdF054cc3D0c433B19fCa16',
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

// Using FD transaction to execute the smart contract
> kip7.renounceMinter({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.renounceMinter().then(console.log)
```

## kip7.burn <a id="kip7-burn"></a>

```javascript
kip7.burn(amount [, sendParam])
```

Hủy `số lượng` của token trong số dư của người gửi. Nếu không cung cấp `sendParam.from` hoặc `kip7.options.from` thì sẽ xảy ra lỗi.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại                    | Mô tả                                                                                                                                                                              |
| --------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| số lượng  | BigNumber \| chuỗi \| số | Số lượng token sẽ bị phá hủy.                                                                                                                                                      |
| sendParam | đối tượng                | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt](#kip7-approve). |

**LƯU Ý** Tham số `số tiền` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua abi thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip7.burn(1000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x7cf9e982510d17a2fd5fca3e7a6f9ce5a25a9da6ba81d51b33129fb7fb93e0ae',
    blocknumber: 10495,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0x0f681dbc120d9d3be997565626cd87f049f5c405',
    ...
    events: {
        Transfer: {
            address: '0x0f681Dbc120D9d3BE997565626CD87F049f5C405',
            blocknumber: 10495,
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

// Using FD transaction to execute the smart contract
> kip7.burn(1000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.burn(1000).then(console.log)
```

## kip7.burnFrom <a id="kip7-burnfrom"></a>

```javascript
kip7.burnFrom(account, amount [, sendParam])
```

Hủy số lượng token đã cho từ `tài khoản`. Hạn mức của người gửi được chỉ định trong `sendParam.from` hoặc `kip7.options.from` bị giảm cùng với số dư của `tài khoản`.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | type                     | Mô tả                                                                                                                                                                              |
| --------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tài khoản | chuỗi                    | Địa chỉ của tài khoản sở hữu token sẽ bị đốt cháy với cơ chế trợ cấp.                                                                                                              |
| số lượng  | BigNumber \| chuỗi \| số | Số lượng token sẽ bị phá hủy.                                                                                                                                                      |
| sendParam | đối tượng                | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt](#kip7-approve). |

**LƯU Ý** Tham số `số tiền` chấp nhận loại `số` nhưng nếu giá trị được cung cấp nằm ngoài phạm vi được giới hạn bởi number.MAX_SAFE_INTEGER, điều đó có thể gây ra kết quả không mong muốn hoặc lỗi. Trong trường hợp này, bạn nên sử dụng loại `BigNumber`, đặc biệt đối với giá trị đầu vào dạng số có kích thước `uint256`.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua abi thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip7.burnFrom('0x{address in hex}', 1000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xcd9f3d00856a056e54697cde2621d8af779c11378c422700510d6ebf65bea0a8',
    blocknumber: 11371,
    contractAddress: null,
    from: '0x1b7bdfcfb0008d0c958da13f2dc30388271e9ef0',
    ...
    status: true,
    to: '0x50fafa2b059d26c47d26c35ccb3cd3b856ecc852',
    ...
    events: {
        Transfer: {
            address: '0x50fAFa2B059d26C47D26c35Ccb3Cd3b856Ecc852',
            blocknumber: 11371,
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
            blocknumber: 11371,
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

// Using FD transaction to execute the smart contract
> kip7.burnFrom('0x{address in hex}', 1000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.burnFrom('0x{address in hex}', 1000).then(console.log)
```

## kip7.addPauser <a id="kip7-addpauser"></a>

```javascript
kip7.addPauser(account [, sendParam])
```

Thêm một tài khoản làm trình tạm dừng có quyền tạm dừng hợp đồng.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | type      | Mô tả                                                                                                                                                                              |
| --------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tài khoản | chuỗi     | Địa chỉ của tài khoản sẽ là địa chỉ tạm dừng mới.                                                                                                                                  |
| sendParam | đối tượng | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt](#kip7-approve). |

**LƯU Ý** Nếu `sendParam.from` hoặc `kip7.options.from` được cung cấp, thì đó phải là một người tạm dừng có PauserRole.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua abi thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip7.addPauser('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x14bcefa90f95f5db03ed9c43a77ae910b57960f4f44c786e3a650a8ad163f67a',
    blocknumber: 16524,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0x31fee792a85ff4d714f47a151975b4979cb47308',
    ...
    events: {
        PauserAdded: {
            address: '0x31fee792A85ff4D714F47A151975b4979CB47308',
            blocknumber: 16524,
            transactionHash: '0x9bd0cba9f5fdc3fdae4b9f40f46f11bf42314ca2518724e78be266d46a8a9f96',
            transactionIndex: 0,
            blockHash: '0x14bcefa90f95f5db03ed9c43a77ae910b57960f4f44c786e3a650a8ad163f67a',
            logIndex: 0,
            id: 'log_d847b043',
            returnValues: {
                '0': '0x6610B93bAE66F89716C3b010ad39DF476Da9234b',
                account: '0x6610B93bAE66F89716C3b010ad39DF476Da9234b',
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

// Using FD transaction to execute the smart contract
> kip7.addPauser('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.addPauser('0x{address in hex}').then(console.log)
```

## kip7.renouncePauser <a id="kip7-renouncepauser"></a>

```javascript
kip7.renouncePauser([sendParam])
```

Từ bỏ quyền tạm dừng hợp đồng. Chỉ một địa chỉ tạm dừng mới có thể từ bỏ quyền tạm dừng của chính nó.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại     | Mô tả                                                                                                                                                                              |
| --------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | đối tượng | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt](#kip7-approve). |

**LƯU Ý** Nếu `sendParam.from` hoặc `kip7.options.from` được cung cấp, thì đó phải là một người tạm dừng có PauserRole.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua abi thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip7.renouncePauser({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xc0b1b4914ddc8d74e8034fe86ede1b5b88a2c16ee4d678e58fac325c589713f6',
    blocknumber: 16567,
    contractAddress: null,
    from: '0x5934a0c01baa98f3457981b8f5ce6e52ac585578',
    ...
    status: true,
    to: '0x31fee792a85ff4d714f47a151975b4979cb47308',
    ...
    events: {
        PauserRemoved: {
            address: '0x31fee792A85ff4D714F47A151975b4979CB47308',
            blocknumber: 16567,
            transactionHash: '0xefc93382f5609531dd16f644cf6a3b8e086c623a9fb8038984662f7260482df6',
            transactionIndex: 0,
            blockHash: '0xc0b1b4914ddc8d74e8034fe86ede1b5b88a2c16ee4d678e58fac325c589713f6',
            logIndex: 0,
            id: 'log_e9518d2f',
            returnValues: {
                '0': '0x5934a0c01baA98F3457981b8f5ce6E52ac585578',
                account: '0x5934a0c01baA98F3457981b8f5ce6E52ac585578',
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

// Using FD transaction to execute the smart contract
> kip7.renouncePauser({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.renouncePauser().then(console.log)
```

## kip7.pause <a id="kip7-pause"></a>

```javascript
kip7.pause([sendParam])
```

Tạm dừng các chức năng liên quan đến việc gửi token.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại     | Mô tả                                                                                                                                                                              |
| --------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | đối tượng | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt](#kip7-approve). |

**LƯU Ý** Nếu `sendParam.from` hoặc `kip7.options.from` được cung cấp, thì đó phải là một người tạm dừng có PauserRole.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua abi thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip7.pause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xcd5e787e738a6197df871f0d651f2a9149d5ed03fdf62e918c4eed03003ea539',
    blocknumber: 18218,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0xfc83abf47d232739dab9610c46b3f10c8022b3ef',
    ...
    events: {
        Paused: {
            address: '0xFc83ABF47d232739dAb9610C46B3F10C8022b3eF',
            blocknumber: 18218,
            transactionHash: '0x0e660b8c49e8212a69f2d68324e105b4295b534d22ac0b70263d3e54d429d1bb',
            transactionIndex: 0,
            blockHash: '0xcd5e787e738a6197df871f0d651f2a9149d5ed03fdf62e918c4eed03003ea539',
            logIndex: 0,
            id: 'log_2ab0db96',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                account: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
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

// Using FD transaction to execute the smart contract
> kip7.pause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.pause().then(console.log)
```

## kip7.unpause <a id="kip7-unpause"></a>

```javascript
kip7.unpause([sendParam])
```

Tiếp tục hợp đồng bị tạm dừng.

Lưu ý rằng phương pháp này sẽ gửi một giao dịch đến mạng lưới Klaytn, mạng này sẽ tính phí giao dịch cho người gửi.

**Tham số**

| Tên       | Loại     | Mô tả                                                                                                                                                                              |
| --------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendParam | đối tượng | (tùy chọn) Một đối tượng có tham số xác định để gửi giao dịch. Để biết thêm thông tin về sendParam, hãy tham khảo mô tả tham số của [phê duyệt](#kip7-approve). |

**LƯU Ý** Nếu `sendParam.from` hoặc `kip7.options.from` được cung cấp, thì đó phải là một người tạm dừng có PauserRole.

**Giá trị trả về**

`Promise` trả về `đối tượng` - Biên lai chứa kết quả thực hiện giao dịch. Nếu bạn muốn biết về các thuộc tính bên trong đối tượng biên nhận, hãy xem mô tả của [getTransactionReceipt][]. Biên lai từ các phiên bản KIP7 có thuộc tính 'sự kiện' được phân tích cú pháp qua abi thay vì thuộc tính 'bản ghi'.

**Ví dụ**

```javascript
// Send via a sendParam object with the from field given 
> kip7.unpause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xa45194ba608a0a00152f974fb1388ced326522979f4b8f19c3fab3083f1339ac',
    blocknumber: 18239,
    contractAddress: null,
    from: '0x2f7dc98bd93a0544b03d6ff428a6f4ae04b32676',
    ...
    status: true,
    to: '0xfc83abf47d232739dab9610c46b3f10c8022b3ef',
    ...
    events: {
        Unpaused: {
            address: '0xFc83ABF47d232739dAb9610C46B3F10C8022b3eF',
            blocknumber: 18239,
            transactionHash: '0x449dff9d7970bfe326091516ebb22aeaefb0bda59bc4e2577467618863e36c99',
            transactionIndex: 0,
            blockHash: '0xa45194ba608a0a00152f974fb1388ced326522979f4b8f19c3fab3083f1339ac',
            logIndex: 0,
            id: 'log_9c5a3823',
            returnValues: {
                '0': '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
                account: '0x2f7Dc98Bd93A0544B03d6ff428a6f4ae04b32676',
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

// Using FD transaction to execute the smart contract
> kip7.unpause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip7.options.from
// If the value of kip7.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip7 instance.
> kip7.options.from = '0x{address in hex}'
> kip7.unpause().then(console.log)
```

[getTransactionReceipt]: ../caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt
