# Transaction

## call <a id="call"></a>

```javascript
caver.klay.call(callObject [, defaultBlock] [, callback])
```

Thực thi một giao dịch lệnh gọi thông điệp, được thực thi trực tiếp trên máy ảo Klaytn của nút mạng, nhưng không bao giờ được đào vào chuỗi khối.
Virtual Machine of the node, but never mined into the blockchain.

**Tham số**

| Tên          | type        | Mô tả                                                                                                                                                                                                                          |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| callObject   | Đối tượng   | Một đối tượng giao dịch khác biệt ở chỗ đối với các lệnh gọi, thuộc tính "from" là tùy chọn. [Một lệnh gọi hàm mã hóa](../../caver.klay.abi.md#encodefunctioncall) phải được đặt trong trường dữ liệu của đối tượng giao dịch. |
| defaultBlock | Số \| Chuỗi | (tùy chọn) Nếu bạn truyền tham số này thì tham số này sẽ không sử dụng khối mặc định được thiết lập bằng hàm [caver.klay.defaultBlock](../block.md#defaultblock).                                           |
| callback     | Hàm         | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                                                             |

**Giá trị trả về**

`Promise` trả về `String`: Dữ liệu trả về của lệnh gọi, _ví dụ_, giá trị trả về của một hàm trong hợp đồng thông minh.

**Ví dụ**

```javascript
> caver.klay.call({
    to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", // contract address
    data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
})
.then(console.log);

"0x000000000000000000000000000000000000000000000000000000000000000a"
```

## estimateGas <a id="estimategas"></a>

```javascript
caver.klay.estimateGas(callObject [, callback])
```

Thực thi một lệnh gọi thông điệp hoặc giao dịch và trả về số lượng gas đã sử dụng cho lệnh gọi/giao dịch mô phỏng.

**Tham số**

| Tên        | Loại     | Mô tả                                                                                                                                                                                                                          |
| ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| callObject | Đối tượng | Một đối tượng giao dịch khác biệt ở chỗ đối với các lệnh gọi, thuộc tính "from" là tùy chọn. [Một lệnh gọi hàm mã hóa](../../caver.klay.abi.md#encodefunctioncall) phải được đặt trong trường dữ liệu của đối tượng giao dịch. |
| callback   | Hàm       | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                                                             |

**Giá trị trả về**

`Promise` trả về `Number` - đơn vị gas đã sử dụng cho lệnh gọi/giao dịch mô phỏng.

**Ví dụ**

```javascript
> caver.klay.estimateGas({
    to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
    data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
})
.then(console.log);

40
```

## estimateComputationCost <a id="estimatecomputationcost"></a>

```javascript
caver.klay.estimateComputationCost(callObject [, defaultBlock] [, callback])
```

Tạo và trả về chi phí tính toán ước tính sẽ được sử dụng để thực hiện giao dịch.
Klaytn giới hạn chi phí tính toán của một giao dịch ở mức `100000000`, hiện không mất quá nhiều thời gian cho một giao dịch.g mất quá nhiều.
Giao dịch sẽ không được thêm vào chuỗi khối.

**Tham số**

| Tên          | type        | Mô tả                                                                                                                                                                                                                          |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| callObject   | Đối tượng   | Một đối tượng giao dịch khác biệt ở chỗ đối với các lệnh gọi, thuộc tính "from" là tùy chọn. [Một lệnh gọi hàm mã hóa](../../caver.klay.abi.md#encodefunctioncall) phải được đặt trong trường dữ liệu của đối tượng giao dịch. |
| defaultBlock | Số \| Chuỗi | (tùy chọn) Nếu bạn truyền tham số này, khối mặc định được thiết lập bằng hàm [caver.klay.defaultBlock](../block.md#defaultblock) sẽ được sử dụng.                                                           |
| callback     | Hàm         | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                                                             |

**Giá trị trả về**

`Promise` trả về `Number` - Lượng chi phí tính toán được sử dụng.

**Ví dụ**

```javascript
> caver.klay.estimateComputationCost({
        to: '0xf796b2F18507Ec8F8C19e9F0c03092888093ebAc',
        data : '0xd14e62b80000000000000000000000000000000000000000000000000000000000000022'
    }).then(console.log);
0x5773

// With 'latest' block tag
> caver.klay.estimateComputationCost({
        to: '0xf796b2F18507Ec8F8C19e9F0c03092888093ebAc',
        data : '0xd14e62b80000000000000000000000000000000000000000000000000000000000000022'
    }, 'latest').then(console.log);
0x5773
```

## decodeTransaction <a id="decodetransaction"></a>

```javascript
caver.klay.decodeTransaction(rawTransaction)
```

Trả về một đối tượng giao dịch chứa tất cả các giá trị giải mã từ giao dịch `rawTransaction` cho trước, đây là giao dịch mã hóa RLP.
Do tất cả các loại giao dịch ngoại trừ giao dịch cũ đều có thể có nhiều chữ ký của người gửi và người trả phí, các trường trả về hiện có bao gồm v, r, s và payerV, payerR, payerS là chữ ký đầu tiên (thứ tự 0) của người gửi và người trả phí.

**LƯU Ý** caver.klay.decodeTransaction được hỗ trợ kể từ phiên bản **v1.0.1-rc.8**.  Để sử dụng tính năng này, hãy cài đặt từ phiên bản [v1.0.1-rc.8](https://www.npmjs.com/package/caver-js/v/1.0.1-rc.8) trở lên.

**LƯU Ý** Để hỗ trợ chế độ đa chữ ký, các thuộc tính `signatures` và `feePayerSignatures` đã được thêm vào kể từ phiên bản caver-js [v1.2.0-rc.3](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.3).

**Tham số**

| Tên            | Loại | Mô tả                             |
| -------------- | ----- | --------------------------------- |
| rawTransaction | Chuỗi | Dữ liệu của giao dịch mã hóa RLP. |

**Giá trị trả về**

| Loại     | Mô tả                                                                                                                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Đối tượng | Đối tượng giao dịch. Đối tượng giao dịch trả về sẽ có các thuộc tính khác nhau tùy thuộc vào loại giao dịch. Để biết danh sách các thuộc tính có trong mỗi loại giao dịch, tham khảo [SendTransaction](#sendtransaction). |

**Ví dụ**

```javascript
// Basic Transaction
> caver.klay.decodeTransaction('0xf86b038505d21dba00843b9ac9ff94d03227635c90c7986f0e3a4e551cefbca8c5531685174876e8008026a06fc7412ad1801b4790e7a5a5097fdbef01bc9fe1b970d08232184d110226c221a04665f772edbc4ba4dfbf189d89a9b9cb1e5cdcea0fd5a8b1a497b9c275e5267c')
{ 
    type: 'LEGACY',
    nonce: '0x03',
    gasPrice: '0x05d21dba00',
    gas: '0x3b9ac9ff',
    to: '0xd03227635c90c7986f0e3a4e551cefbca8c55316',
    value: '0x174876e800',
    data: '0x',
    v: '0x26',
    r: '0x6fc7412ad1801b4790e7a5a5097fdbef01bc9fe1b970d08232184d110226c221',
    s: '0x4665f772edbc4ba4dfbf189d89a9b9cb1e5cdcea0fd5a8b1a497b9c275e5267c',
    signatures: [ 
        '0x26',
        '0x6fc7412ad1801b4790e7a5a5097fdbef01bc9fe1b970d08232184d110226c221',
        '0x4665f772edbc4ba4dfbf189d89a9b9cb1e5cdcea0fd5a8b1a497b9c275e5267c' 
    ]
}

// Fee Delegation
> caver.klay.decodeTransaction('0x09f8dd2c8505d21dba00830dbba094a36960d00c9cbf10e80928eead73ff308193bde70194ad8d5b8c7da3746df7de39c41fa572d660aa8e91f847f845824e43a099c0a4c85bb9f2c0be2646b963201680e2f76128e4fd1f54d3f9cf80d1d117e7a069b62aa6640c8aa3606a67869fe062dde1c61a60aea5c5161550ff11ee71c24b946a4b71a6796c2fd376fb0526385e0783da86a039f847f845824e43a0bdfdc50649c8f52930a330b2e44d92f8943b28c7ff7edd8ff7f2f95e617c0d77a06e96bdd983494f6967f1a26d2f0ae991a4e8ebef1ac3c9029251a18c19002ab3')
{ 
    type: 'FEE_DELEGATED_VALUE_TRANSFER',
    nonce: '0x2c',
    gasPrice: '0x05d21dba00',
    gas: '0x0dbba0',
    to: '0xa36960d00c9cbf10e80928eead73ff308193bde7',
    value: '0x01',
    from: '0xad8d5b8c7da3746df7de39c41fa572d660aa8e91',
    v: '0x4e43',
    r: '0x99c0a4c85bb9f2c0be2646b963201680e2f76128e4fd1f54d3f9cf80d1d117e7',
    s: '0x69b62aa6640c8aa3606a67869fe062dde1c61a60aea5c5161550ff11ee71c24b',
    signatures: [
        [ 
            '0x4e43',
            '0x99c0a4c85bb9f2c0be2646b963201680e2f76128e4fd1f54d3f9cf80d1d117e7',
            '0x69b62aa6640c8aa3606a67869fe062dde1c61a60aea5c5161550ff11ee71c24b' 
        ] 
    ],
    feePayer: '0x6a4b71a6796c2fd376fb0526385e0783da86a039',
    payerV: '0x4e43',
    payerR: '0xbdfdc50649c8f52930a330b2e44d92f8943b28c7ff7edd8ff7f2f95e617c0d77',
    payerS: '0x6e96bdd983494f6967f1a26d2f0ae991a4e8ebef1ac3c9029251a18c19002ab3',
    feePayerSignatures: [ 
        [ 
            '0x4e43',
            '0xbdfdc50649c8f52930a330b2e44d92f8943b28c7ff7edd8ff7f2f95e617c0d77',
            '0x6e96bdd983494f6967f1a26d2f0ae991a4e8ebef1ac3c9029251a18c19002ab3' 
        ] 
    ]
}

// Partial Fee Delegation
> caver.klay.decodeTransaction('0x2af902ca0a8505d21dba00843b9ac9ff80809490b3e9a3770481345a7f17f22f16d020bccfd33eb901fe608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029802180f845f84325a0d8cdc1219df8bbca8a00255420a5bec0f602e6266b76ce7dcf5b0b26bd7fe3b9a05557496a3a17f784c3eb40acbb526dfbc20ae6b00c633a0186d804cd9137b13e9433f524631e573329a550296f595c820d6c65213ff845f84325a041a4c4bf0e3039d04472beae4135a14c26ae4c88bad08d5f0acf61f7c0eb60dfa03d1658f38e5c2089d64985fb33cb13db2e41cde6958ba2cfcfaba685a7f565e2')
{ 
    type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO',
    nonce: '0x0a',
    gasPrice: '0x05d21dba00',
    gas: '0x3b9ac9ff',
    to: '0x',
    value: '0x',
    from: '0x90b3e9a3770481345a7f17f22f16d020bccfd33e',
    data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    humanReadable: false,
    feeRatio: '0x21',
    codeFormat: '0x',
    v: '0x25',
    r: '0xd8cdc1219df8bbca8a00255420a5bec0f602e6266b76ce7dcf5b0b26bd7fe3b9',
    s: '0x5557496a3a17f784c3eb40acbb526dfbc20ae6b00c633a0186d804cd9137b13e',
    signatures: [ 
        [ 
            '0x25',
            '0xd8cdc1219df8bbca8a00255420a5bec0f602e6266b76ce7dcf5b0b26bd7fe3b9',
            '0x5557496a3a17f784c3eb40acbb526dfbc20ae6b00c633a0186d804cd9137b13e' 
        ] 
    ],
    feePayer: '0x33f524631e573329a550296f595c820d6c65213f',
    payerV: '0x25',
    payerR: '0x41a4c4bf0e3039d04472beae4135a14c26ae4c88bad08d5f0acf61f7c0eb60df',
    payerS: '0x3d1658f38e5c2089d64985fb33cb13db2e41cde6958ba2cfcfaba685a7f565e2',
    feePayerSignatures: [ 
        [ 
            '0x25',
            '0x41a4c4bf0e3039d04472beae4135a14c26ae4c88bad08d5f0acf61f7c0eb60df',
            '0x3d1658f38e5c2089d64985fb33cb13db2e41cde6958ba2cfcfaba685a7f565e2' 
        ] 
    ]
}
```

## getTransaction <a id="gettransaction"></a>

```javascript
caver.klay.getTransaction(transactionHash [, callback])
```

Trả về giao dịch khớp với hàm băm giao dịch đã cho.

**Tham số**

| Tên             | type  | Mô tả                                                                                                                              |
| --------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------- |
| transactionHash | Chuỗi | Hàm băm của giao dịch.                                                                                                             |
| callback        | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `đối tượng` - Một đối tượng giao dịch hoặc `null` khi không tìm thấy giao dịch:

| Tên                | Loại           | Mô tả                                                                                                                                                                                                                            |
| ------------------ | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | DỮ LIỆU 32 byte | Hàm băm của khối chứa giao dịch này. `null` nếu đó là giao dịch đang chờ xử lý.                                                                                                                                                  |
| blockNumber        | SỐ LƯỢNG        | Số khối chứa giao dịch này. `null` nếu đó là giao dịch đang chờ xử lý.                                                                                                                                                           |
| codeFormat         | Chuỗi           | (tùy chọn) Định dạng mã của mã hợp đồng thông minh.                                                                                                                                                           |
| feePayer           | DỮ LIỆU 20 byte | (tùy chọn) Địa chỉ của người trả phí.                                                                                                                                                                         |
| feePayerSignatures | Mảng            | (tùy chọn) Mảng các đối tượng chữ ký của người trả phí. Một đối tượng chữ ký chứa ba trường (V, R và S). V chứa mã khôi phục ECDSA. R chứa chữ ký ECDSA r trong khi S chứa chữ ký ECDSA s. |
| feeRatio           | SỐ LƯỢNG        | (tùy chọn) Tỷ lệ phí của người trả phí. Nếu tỷ lệ là 30 thì người trả phí phải trả 30% phí. 70% còn lại sẽ được trả bởi người gửi.                                                                            |
| từ                 | DỮ LIỆU 20 byte | Địa chỉ của người gửi.                                                                                                                                                                                                           |
| gas                | SỐ LƯỢNG        | Gas được người gửi cung cấp.                                                                                                                                                                                                     |
| giá gas            | SỐ LƯỢNG        | Giá gas được người gửi cung cấp theo đơn vị peb.                                                                                                                                                                                 |
| hash               | DỮ LIỆU 32 byte | Hàm băm của giao dịch.                                                                                                                                                                                                           |
| humanReadable      | Boolean         | (tùy chọn) `true` nếu địa chỉ con người có thể đọc được, ngược lại sẽ là `false`.                                                                                                                             |
| khóa               | Chuỗi           | (tùy chọn) Mã khóa của tài khoản mới tạo.                                                                                                                                                                     |
| nhập               | DATA            | (tùy chọn) Dữ liệu được gửi cùng với giao dịch.                                                                                                                                                               |
| nonce              | SỐ LƯỢNG        | Số lượng giao dịch được người gửi thực hiện trước giao dịch này.                                                                                                                                                                 |
| senderTxHash       | DỮ LIỆU 32 byte | (tùy chọn) Hàm băm của tx mà không có địa chỉ và chữ ký của người trả phí. Giá trị này luôn giống với giá trị của `hash` đối với các giao dịch không ủy thác trả phí.                                         |
| chữ ký             | Mảng            | Một mảng các đối tượng chữ ký. Một đối tượng chữ ký chứa ba trường (V, R và S). V chứa mã khôi phục ECDSA. R chứa chữ ký ECDSA r trong khi S chứa chữ ký ECDSA s.                                             |
| đến                | DỮ LIỆU 20 byte | Địa chỉ của người nhận. `null` nếu đó là giao dịch tạo hợp đồng.                                                                                                                                                                 |
| transactionIndex   | SỐ LƯỢNG        | Giá trị nguyên biểu thị vị trí chỉ mục của giao dịch trong khối. `null` nếu đó là giao dịch đang chờ xử lý.                                                                                                                      |
| type               | Chuỗi           | Chuỗi biểu thị loại giao dịch.                                                                                                                                                                                                   |
| typeInt            | SỐ LƯỢNG        | Giá trị nguyên biểu thị loại giao dịch.                                                                                                                                                                                          |
| giá trị            | SỐ LƯỢNG        | Giá trị được chuyển tính bằng đơn vị peb.                                                                                                                                                                                        |

**Ví dụ**

```javascript
> caver.klay.getTransaction('0x2d26f602cfbb4c662931592bf2c4ee18d29f09683be5b9e8d589ff935fca0b97')
  .then(console.log);
{ 
    blockHash: '0xd6f3bc2bd7853ed423677766b5332c3e55d900abf4252ede196661cd58e817a6',
    blockNumber: 141766,
    from: '0x8948Ab8526fDA9a7349Ee8FCa5372e46d0268777',
    gas: 20000000,
    gasPrice: '25000000000',
    hash: '0x2d26f602cfbb4c662931592bf2c4ee18d29f09683be5b9e8d589ff935fca0b97',
    input: '0x',
    nonce: 8,
    signatures:[{ 
        V: '0xfe9',
        R: '0x76a0ac07a371fe3849f46a115d62830e611e62fab91714bb66fe18a937557666',
        S: '0x1daace52366434ab11287d4f5ebe9c87f314e45d13f05093bbcdd5862fcf462e' 
    }],
    to: '0x2259cFDae62F9853f84298aAf20C999391B1c6a3',
    transactionIndex: 0,
    type: 'TxTypeLegacyTransaction',
    typeInt: 0,
    value: '1' 
}
```

## getTransactionBySenderTxHash <a id="gettransactionbysendertxhash"></a>

```javascript
caver.klay.getTransactionBySenderTxHash(senderTxHash [, callback])
```

Trả về thông tin về giao dịch được xác định bởi giá trị `senderTxHash` cho trước.
Xin lưu ý rằng API này chỉ trả về kết quả chính xác nếu tính năng lập chỉ mục được bật trong nút mạng bởi `--sendertxhashindexing`.
Sử dụng thuộc tính [isSenderTxHashIndexingEnabled](../config.md#issendertxhashindexingenabled) để kiểm tra xem tính năng lập chỉ mục đã được bật hay chưa.

**Tham số**

| Tên          | Loại | Mô tả                                                                                                                                         |
| ------------ | ----- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| senderTxHash | Chuỗi | Hàm băm của một giao dịch chỉ được người gửi ký. Tham khảo [SenderTxHash](../../../../../../learn/transactions/transactions.md#sendertxhash). |
| callback     | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.            |

**Giá trị trả về**

`Promise` trả về `đối tượng` - Một đối tượng giao dịch hoặc `null` khi không tìm thấy giao dịch:

| Tên                | Loại           | Mô tả                                                                                                                                                                                                                        |
| ------------------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | DỮ LIỆU 32 byte | Hàm băm của khối chứa giao dịch này. `null` nếu đó là giao dịch đang chờ xử lý.                                                                                                                                              |
| blockNumber        | SỐ LƯỢNG        | Số khối chứa giao dịch này. `null` nếu đó là giao dịch đang chờ xử lý.                                                                                                                                                       |
| codeFormat         | Chuỗi           | (tùy chọn) Định dạng mã của mã hợp đồng thông minh.                                                                                                                                                       |
| feePayer           | DỮ LIỆU 20 byte | Địa chỉ của người trả phí.                                                                                                                                                                                                   |
| feePayerSignatures | Mảng            | Mảng các đối tượng chữ ký của người trả phí. Một đối tượng chữ ký chứa ba trường (V, R và S). V chứa mã khôi phục ECDSA. R chứa chữ ký ECDSA r trong khi S chứa chữ ký ECDSA s.                           |
| feeRatio           | SỐ LƯỢNG        | (tùy chọn) Tỷ lệ phí của người trả phí. Nếu tỷ lệ là 30 thì người trả phí phải trả 30% phí. 70% còn lại sẽ được trả bởi người gửi.                                                                        |
| từ                 | DỮ LIỆU 20 byte | Địa chỉ của người gửi.                                                                                                                                                                                                       |
| gas                | SỐ LƯỢNG        | Gas được người gửi cung cấp.                                                                                                                                                                                                 |
| giá gas            | SỐ LƯỢNG        | Giá gas được người gửi cung cấp theo đơn vị peb.                                                                                                                                                                             |
| hash               | DỮ LIỆU 32 byte | Hàm băm của giao dịch.                                                                                                                                                                                                       |
| humanReadable      | Boolean         | (tùy chọn) `true` nếu địa chỉ con người có thể đọc được, ngược lại sẽ là `false`.                                                                                                                         |
| khóa               | Chuỗi           | (tùy chọn) Mã khóa của tài khoản mới tạo.                                                                                                                                                                 |
| nhập               | DATA            | (tùy chọn) Dữ liệu được gửi cùng với giao dịch.                                                                                                                                                           |
| nonce              | SỐ LƯỢNG        | Số lượng giao dịch được người gửi thực hiện trước giao dịch này.                                                                                                                                                             |
| senderTxHash       | DỮ LIỆU 32 byte | Hàm băm của một giao dịch chỉ được người gửi ký. Tham khảo [SenderTxHash](../../../../../../learn/transactions/transactions.md#sendertxhash). Giá trị này luôn giống với `hàm băm` đối với các giao dịch không phải trả phí. |
| chữ ký             | Mảng            | Một mảng các đối tượng chữ ký. Một đối tượng chữ ký chứa ba trường (V, R và S). V chứa mã khôi phục ECDSA. R chứa chữ ký ECDSA r trong khi S chứa chữ ký ECDSA s.                                         |
| đến                | DỮ LIỆU 20 byte | Địa chỉ của người nhận. `null` nếu đó là giao dịch tạo hợp đồng.                                                                                                                                                             |
| transactionIndex   | SỐ LƯỢNG        | Giá trị nguyên biểu thị vị trí chỉ mục của giao dịch trong khối. `null` nếu đó là giao dịch đang chờ xử lý.                                                                                                                  |
| type               | Chuỗi           | Chuỗi biểu thị loại giao dịch.                                                                                                                                                                                               |
| typeInt            | SỐ LƯỢNG        | Giá trị nguyên biểu thị loại giao dịch.                                                                                                                                                                                      |
| giá trị            | SỐ LƯỢNG        | Giá trị được chuyển tính bằng đơn vị peb.                                                                                                                                                                                    |

**Ví dụ**

```javascript
> caver.klay.getTransactionBySenderTxHash('0x8c0b092fed92a6619666efd582f7d71fbc3d784781072dd26741715b3731ab22').then(console.log);
{
    blockHash: '0x56e950bd9283c11ad2dab7cfcbacd9164aff2f6cbeb99dd2a7b754eb210753af',
    blockNumber: 773,
    codeFormat: '0x0',
    feePayer: '0xabae1fe62aebbfabeff072eb815d54c3359a45f4',
    feePayerSignatures: [
        { 
            V: '0x4e43',
            R: '0x16293eefe0f13228ae47af67ecfe659448d8f80d9667a67a25d82c72b5ee246a',
            S: '0x3c4043324bee41a6cbab905d3b4e740a3a18fde021260fc1196f73d2ab037b91' } ],
    feeRatio: '0x14',
    from: '0x3F0E31836C7AABb4C9e9B19d5D61359a9139E949',
    gas: 900000,
    gasPrice: '25000000000',
    hash: '0x2ab7665d25f8f64969fa03b8d5e40a70485bb56a4e72ca2fe1e467fff904c173',
    humanReadable: false,
    input: '0x6080604052600080556040516020806101fa8339810180604052810190808051906020019092919050505080600081905550506101b9806100416000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd1461006757806342cbb15c14610092578063a87d942c146100bd578063d14e62b8146100e8575b600080fd5b34801561007357600080fd5b5061007c610108565b6040518082815260200191505060405180910390f35b34801561009e57600080fd5b506100a761010e565b6040518082815260200191505060405180910390f35b3480156100c957600080fd5b506100d2610116565b6040518082815260200191505060405180910390f35b6101066004803603810190808035906020019092919050505061014c565b005b60005481565b600043905090565b60007f7197668b8690d2324050bc9ad83b2b5ca0b3f5336cb178ffa2aa07006b51b65160405160405180910390a1600054905090565b7fe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9816040518082815260200191505060405180910390a180600081905550505600a165627a7a723058203cb41ebe3d7128a72c997645693c64789a9b5fdeae26158fb28b55e567e805c700290000000000000000000000000000000000000000000000000000000000000001',
    nonce: 9,
    senderTxHash: '0x8c0b092fed92a6619666efd582f7d71fbc3d784781072dd26741715b3731ab22',
    signatures: [
        { 
            V: '0x4e43',
            R: '0x1b48ee0508d242c9568d7e09212d62137080d68d86c1d067b31b4bb4196c9960',
            S: '0x24982f60b37859d7c39d7bd9c00b446196b3a08b27f80dbc9ceca8ee52513b11' 
        } 
    ],
    to: null,
    transactionIndex: 0,
    type: 'TxTypeFeeDelegatedSmartContractDeployWithRatio',
    typeInt: 42,
    value: '1'
}
```

## getTransactionFromBlock <a id="gettransactionfromblock"></a>

```javascript
caver.klay.getTransactionFromBlock(hashStringOrNumber, indexNumber [, callback])
```

Trả về một giao dịch dựa trên hàm băm hoặc số khối và vị trí chỉ mục của giao dịch.

**Tham số**

| Tên                | type  | Mô tả                                                                                                                              |
| ------------------ | ----- | ---------------------------------------------------------------------------------------------------------------------------------- |
| hashStringOrNumber | Chuỗi | Số khối hoặc hàm băm. Hoặc chuỗi `"genesis"` hoặc `"latest"`.                                                                      |
| indexNumber        | Số    | Vị trí chỉ mục của giao dịch.                                                                                                      |
| callback           | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Object` - Đối tượng giao dịch, tham khảo [caver.klay.getTransaction](#gettransaction)

**Ví dụ**

```javascript
> caver.klay.getTransactionFromBlock('0x4534534534', 2).then(console.log);
// see caver.klay.getTransaction
```

## getTransactionReceipt <a id="gettransactionreceipt"></a>

```javascript
caver.klay.getTransactionReceipt(transactionHash [, callback])
```

Trả về biên lai của một giao dịch theo hàm băm giao dịch.

**Tham số**

| Tên             | Loại | Mô tả                                                                                                                              |
| --------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------- |
| transactionHash | Chuỗi | Hàm băm của giao dịch                                                                                                              |
| callback        | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `đối tượng` - Đối tượng biên lai giao dịch hoặc `null` khi không tìm thấy biên lai:i:

| Tên                | type             | Mô tả                                                                                                                                                                                                                                                                 |
| ------------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | Chuỗi 32 byte    | Hàm băm của khối chứa giao dịch này.                                                                                                                                                                                                                                  |
| blockNumber        | Số               | Số khối chứa giao dịch này.                                                                                                                                                                                                                                           |
| codeFormat         | Chuỗi            | (tùy chọn) Định dạng mã của mã hợp đồng thông minh.                                                                                                                                                                                                |
| contractAddress    | DATA             | Địa chỉ hợp đồng được tạo nếu giao dịch là giao dịch tạo hợp đồng, nếu không, giá trị sẽ là `null`.                                                                                                                                                                   |
| feePayer           | DỮ LIỆU 20 byte  | (tùy chọn) Địa chỉ của người trả phí.                                                                                                                                                                                                              |
| feePayerSignatures | Mảng             | (tùy chọn) Mảng các đối tượng chữ ký của người trả phí. Một đối tượng chữ ký chứa ba trường (V, R và S). V chứa mã khôi phục ECDSA. R chứa chữ ký ECDSA r trong khi S chứa chữ ký ECDSA s.                                      |
| feeRatio           | SỐ LƯỢNG         | (tùy chọn) Tỷ lệ phí của người trả phí. Nếu tỷ lệ là 30 thì người trả phí phải trả 30% phí. 70% còn lại sẽ được trả bởi người gửi.                                                                                                                 |
| từ                 | DỮ LIỆU 20 byte  | Địa chỉ của người gửi.                                                                                                                                                                                                                                                |
| gas                | SỐ LƯỢNG         | Gas được người gửi cung cấp.                                                                                                                                                                                                                                          |
| giá gas            | SỐ LƯỢNG         | Giá gas được người gửi cung cấp theo đơn vị peb.                                                                                                                                                                                                                      |
| gasUsed            | SỐ LƯỢNG         | Lượng gas được sử dụng bởi riêng giao dịch cụ thể này.                                                                                                                                                                                                                |
| humanReadable      | Boolean          | (tùy chọn) `true` nếu địa chỉ con người có thể đọc được, ngược lại sẽ là `false`.                                                                                                                                                                  |
| khóa               | Chuỗi            | (tùy chọn) Mã khóa của tài khoản mới tạo.                                                                                                                                                                                                          |
| nhập               | DATA             | (tùy chọn) Dữ liệu được gửi cùng với giao dịch.                                                                                                                                                                                                    |
| nhật ký            | Mảng             | Mảng đối tượng bản ghi mà giao dịch này tạo ra.                                                                                                                                                                                                                       |
| nhật kýBloom       | DỮ LIỆU 256 byte | Bộ lọc Bloom dành cho các ứng dụng khách nhẹ giúp truy xuất nhanh các bản ghi liên quan.                                                                                                                                                                              |
| nonce              | SỐ LƯỢNG         | Số lượng giao dịch được người gửi thực hiện trước giao dịch này.                                                                                                                                                                                                      |
| senderTxHash       | DỮ LIỆU 32 byte  | (tùy chọn) Hàm băm của một giao dịch chỉ được người gửi ký. Tham khảo [SenderTxHash](../../../../../../learn/transactions/transactions.md#sendertxhash). Giá trị này luôn giống với `transactionHash` đối với các giao dịch không ủy thác trả phí. |
| chữ ký             | Mảng             | Một mảng các đối tượng chữ ký. Một đối tượng chữ ký chứa ba trường (V, R và S). V chứa mã khôi phục ECDSA. R chứa chữ ký ECDSA r trong khi S chứa chữ ký ECDSA s.                                                                                  |
| trạng thái         | Boolean          | `true` nếu giao dịch thành công, `false` nếu Máy ảo Klaytn đặt lại giao dịch.                                                                                                                                                                                         |
| txError            | SỐ LƯỢNG         | (tùy chọn) mã lỗi chi tiết nếu `trạng thái` bằng 0.                                                                                                                                                                                                |
| đến                | DỮ LIỆU 20 byte  | Địa chỉ của người nhận. `null` nếu đó là giao dịch tạo hợp đồng.                                                                                                                                                                                                      |
| transactionHash    | DỮ LIỆU 32 byte  | Hàm băm của giao dịch.                                                                                                                                                                                                                                                |
| transactionIndex   | SỐ LƯỢNG         | Giá trị nguyên biểu thị vị trí chỉ mục của giao dịch trong khối.                                                                                                                                                                                                      |
| type               | Chuỗi            | Chuỗi biểu thị loại giao dịch.                                                                                                                                                                                                                                        |
| typeInt            | SỐ LƯỢNG         | Giá trị nguyên biểu thị loại giao dịch.                                                                                                                                                                                                                               |
| giá trị            | SỐ LƯỢNG         | Giá trị được chuyển tính bằng đơn vị peb.                                                                                                                                                                                                                             |

**Ví dụ**

```javascript
> caver.klay.getTransactionReceipt('0x9108f22693de7b16ece4db2c8d11c004feae31973acc2ecb9dbd61cd57bb0d7b')
  .then(console.log);
{ 
    blockHash: '0x62f0b4e4d2c0fdeda968bf82688a6b4426fb0b75c83ebd39a04633e087060f00',
    blockNumber: 140949,
    contractAddress: null,
    from: '0x8948ab8526fda9a7349ee8fca5372e46d0268777',
    gas: '0x1312d00',
    gasPrice: '0x5d21dba00',
    gasUsed: 21000,
    input: '0x',
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    nonce: '0x6',
    signatures: [{ 
        V:'0xfe9',
        R:'0x95e5fc90a27b4a364f4047072474147fb8885213acbc4ac89902da28ddea3931',
        S:'0xeebe7d37c047f6a7b841da5c6ff2849eb6f99b689666da30f48b60a12028e59' 
    }],
    status: true,
    to: '0x2259cfdae62f9853f84298aaf20c999391b1c6a3',
    transactionHash: '0x9108f22693de7b16ece4db2c8d11c004feae31973acc2ecb9dbd61cd57bb0d7b',
    transactionIndex: 0,
    type: 'TxTypeLegacyTransaction',
    typeInt: 0,
    value: '0x1'
}
```

## getTransactionReceiptBySenderTxHash <a id="gettransactionreceiptbysendertxhash"></a>

```javascript
caver.klay.getTransactionReceiptBySenderTxHash(senderTxHash [, callback])
```

Trả về biên lai giao dịch được xác định bởi giá trị `senderTxHash` cho trước.

**LƯU Ý**: Biên lai không khả dụng với giao dịch đang chờ xử lý.
Xin lưu ý rằng API này chỉ trả về kết quả chính xác nếu tính năng lập chỉ mục được bật trong nút mạng bởi `--sendertxhashindexing`.
Có thể kiểm tra điều này bằng lệnh gọi [isSenderTxHashIndexingEnabled](../config.md#issendertxhashindexingenabled).

**Tham số**

| Tên          | Loại | Mô tả                                                                                                                                         |
| ------------ | ----- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| senderTxHash | Chuỗi | Hàm băm của một giao dịch chỉ được người gửi ký. Tham khảo [SenderTxHash](../../../../../../learn/transactions/transactions.md#sendertxhash). |
| callback     | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.            |

**Giá trị trả về**

`Promise` trả về `đối tượng` - Đối tượng biên lai giao dịch hoặc `null` khi không tìm thấy biên lai:i:

| Tên                | Loại            | Mô tả                                                                                                                                                                                                                                   |
| ------------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | Chuỗi 32 byte    | Hàm băm của khối chứa giao dịch này.                                                                                                                                                                                                    |
| blockNumber        | Số               | Số khối chứa giao dịch này.                                                                                                                                                                                                             |
| codeFormat         | Chuỗi            | (tùy chọn) Định dạng mã của mã hợp đồng thông minh.                                                                                                                                                                  |
| contractAddress    | DATA             | Địa chỉ hợp đồng được tạo nếu giao dịch là giao dịch tạo hợp đồng, nếu không, giá trị sẽ là `null`.                                                                                                                                     |
| feePayer           | DỮ LIỆU 20 byte  | Địa chỉ của người trả phí.                                                                                                                                                                                                              |
| feePayerSignatures | Mảng             | Mảng các đối tượng chữ ký của người trả phí. Một đối tượng chữ ký chứa ba trường (V, R và S). V chứa mã khôi phục ECDSA. R chứa chữ ký ECDSA r trong khi S chứa chữ ký ECDSA s.                                      |
| feeRatio           | SỐ LƯỢNG         | (tùy chọn) Tỷ lệ phí của người trả phí. Nếu tỷ lệ là 30 thì người trả phí phải trả 30% phí. 70% còn lại sẽ được trả bởi người gửi.                                                                                   |
| từ                 | DỮ LIỆU 20 byte  | Địa chỉ của người gửi.                                                                                                                                                                                                                  |
| gas                | SỐ LƯỢNG         | Gas được người gửi cung cấp.                                                                                                                                                                                                            |
| giá gas            | SỐ LƯỢNG         | Giá gas được người gửi cung cấp theo đơn vị peb.                                                                                                                                                                                        |
| gasUsed            | SỐ LƯỢNG         | Lượng gas được sử dụng bởi riêng giao dịch cụ thể này.                                                                                                                                                                                  |
| humanReadable      | Boolean          | (tùy chọn) `true` nếu địa chỉ con người có thể đọc được, ngược lại sẽ là `false`.                                                                                                                                    |
| khóa               | Chuỗi            | (tùy chọn) Mã khóa của tài khoản mới tạo.                                                                                                                                                                            |
| nhập               | DATA             | (tùy chọn) Dữ liệu được gửi cùng với giao dịch.                                                                                                                                                                      |
| nhật ký            | Mảng             | Mảng đối tượng bản ghi mà giao dịch này tạo ra.                                                                                                                                                                                         |
| nhật kýBloom       | DỮ LIỆU 256 byte | Bộ lọc Bloom dành cho các ứng dụng khách nhẹ giúp truy xuất nhanh các bản ghi liên quan.                                                                                                                                                |
| nonce              | SỐ LƯỢNG         | Số lượng giao dịch được người gửi thực hiện trước giao dịch này.                                                                                                                                                                        |
| senderTxHash       | DỮ LIỆU 32 byte  | Hàm băm của một giao dịch chỉ được người gửi ký. Tham khảo [SenderTxHash](../../../../../../learn/transactions/transactions.md#sendertxhash). Giá trị này luôn giống với `transactionHash` đối với các giao dịch không ủy thác trả phí. |
| chữ ký             | Mảng             | Một mảng các đối tượng chữ ký. Một đối tượng chữ ký chứa ba trường (V, R và S). V chứa mã khôi phục ECDSA. R chứa chữ ký ECDSA r trong khi S chứa chữ ký ECDSA s.                                                    |
| trạng thái         | Boolean          | `true` nếu giao dịch thành công, `false` nếu Máy ảo Klaytn đặt lại giao dịch.                                                                                                                                                           |
| txError            | SỐ LƯỢNG         | (tùy chọn) mã lỗi chi tiết nếu `trạng thái` bằng 0.                                                                                                                                                                  |
| đến                | DỮ LIỆU 20 byte  | Địa chỉ của người nhận. `null` nếu đó là giao dịch tạo hợp đồng.                                                                                                                                                                        |
| transactionHash    | DỮ LIỆU 32 byte  | Hàm băm của giao dịch.                                                                                                                                                                                                                  |
| transactionIndex   | SỐ LƯỢNG         | Giá trị nguyên biểu thị vị trí chỉ mục của giao dịch trong khối.                                                                                                                                                                        |
| type               | Chuỗi            | Chuỗi biểu thị loại giao dịch.                                                                                                                                                                                                          |
| typeInt            | SỐ LƯỢNG         | Giá trị nguyên biểu thị loại giao dịch.                                                                                                                                                                                                 |
| giá trị            | SỐ LƯỢNG         | Giá trị được chuyển tính bằng đơn vị peb.                                                                                                                                                                                               |

**Ví dụ**

```javascript
> caver.klay.getTransactionReceiptBySenderTxHash('0x8c0b092fed92a6619666efd582f7d71fbc3d784781072dd26741715b3731ab22').then(console.log);
{
    blockHash: '0x56e950bd9283c11ad2dab7cfcbacd9164aff2f6cbeb99dd2a7b754eb210753af',
    blockNumber: 773,
    codeFormat: '0x0',
    contractAddress: '0x71163abc3b051bC2Af71e7c68eD0ffeA6182cde1',
    feePayer: '0xabae1fe62aebbfabeff072eb815d54c3359a45f4',
    feePayerSignatures: [
        { 
            V: '0x4e43',
            R: '0x16293eefe0f13228ae47af67ecfe659448d8f80d9667a67a25d82c72b5ee246a',
            S: '0x3c4043324bee41a6cbab905d3b4e740a3a18fde021260fc1196f73d2ab037b91' 
        }
    ],
    feeRatio: '0x14',
    from: '0x3f0e31836c7aabb4c9e9b19d5d61359a9139e949',
    gas: '0xdbba0',
    gasPrice: '0x5d21dba00',
    gasUsed: 235217,
    humanReadable: false,
    input: '0x6080604052600080556040516020806101fa8339810180604052810190808051906020019092919050505080600081905550506101b9806100416000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd1461006757806342cbb15c14610092578063a87d942c146100bd578063d14e62b8146100e8575b600080fd5b34801561007357600080fd5b5061007c610108565b6040518082815260200191505060405180910390f35b34801561009e57600080fd5b506100a761010e565b6040518082815260200191505060405180910390f35b3480156100c957600080fd5b506100d2610116565b6040518082815260200191505060405180910390f35b6101066004803603810190808035906020019092919050505061014c565b005b60005481565b600043905090565b60007f7197668b8690d2324050bc9ad83b2b5ca0b3f5336cb178ffa2aa07006b51b65160405160405180910390a1600054905090565b7fe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9816040518082815260200191505060405180910390a180600081905550505600a165627a7a723058203cb41ebe3d7128a72c997645693c64789a9b5fdeae26158fb28b55e567e805c700290000000000000000000000000000000000000000000000000000000000000001',
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    nonce: '0x9',
    senderTxHash: '0x8c0b092fed92a6619666efd582f7d71fbc3d784781072dd26741715b3731ab22',
    signatures: [ 
        { 
            V: '0x4e43',
            R: '0x1b48ee0508d242c9568d7e09212d62137080d68d86c1d067b31b4bb4196c9960',
            S: '0x24982f60b37859d7c39d7bd9c00b446196b3a08b27f80dbc9ceca8ee52513b11' 
        }
    ],
    status: true,
    to: null,
    transactionHash: '0x2ab7665d25f8f64969fa03b8d5e40a70485bb56a4e72ca2fe1e467fff904c173',
    transactionIndex: 0,
    type: 'TxTypeFeeDelegatedSmartContractDeployWithRatio',
    typeInt: 42,
    value: '0x1'
}
```

## sendSignedTransaction <a id="sendsignedtransaction"></a>

```javascript
caver.klay.sendSignedTransaction(signedTransactionData [, callback])
```

Gửi giao dịch đã ký trước đó, được tạo bằng hàm `caver.klay.tài khoảns.signTransaction`.

**LƯU Ý** `caver.klay.sendSignedTransaction` có thể nhận một đối tượng làm tham số kể từ phiên bản caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0). Đối tượng nên bao gồm một chuỗi giao dịch được mã hóa RLP hoặc nên là một đối tượng giao dịch chưa được mã hóa có chữ ký / chữ ký của người trả phí. Bạn có thể truyền đối tượng trả về từ caver.klay.tài khoảns.signTransaction, caver.klay.tài khoảns.feePayerSignTransaction, caver.klay.tài khoảns.getRawTransactionWithSignatures hoặc caver.klay.tài khoảns.combineSignatures.

**Tham số**

| Tên                   | Loại              | Mô tả                                                                                                                                                                                                                      |
| --------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| signedTransactionData | Chuỗi \| Đối tượng | Một chuỗi giao dịch đã ký được mã hóa RLP, một đối tượng có chuỗi giao dịch đã ký được mã hóa RLP nằm trong thuộc tính `rawTransaction` hoặc một đối tượng giao dịch chưa mã hóa chữ ký/chữ ký của người trả phí đính kèm. |
| callback              | Hàm                | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                                                         |

**Giá trị trả về**

| Loại      | Mô tả                                                                        |
| ---------- | ---------------------------------------------------------------------------- |
| PromiEvent | Trình phát sự kiện kết hợp promise. Sẽ được xử lý khi có biên lai giao dịch. |

Đối với PromiEvent, sẽ có các sự kiện sau đây:

- `"transactionHash"` trả về `String`: Được kích hoạt ngay sau khi gửi giao dịch và có hàm băm giao dịch.
- `"receipt"` trả về `Object`: Được kích hoạt khi có sẵn biên lai giao dịch.
- `"error"` trả về `Error`: Được kích hoạt nếu có lỗi phát sinh trong quá trình gửi. Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

**Ví dụ**

```javascript
// sendSignedTransaction using promise with RLP encoded signed transaction string
caver.klay.sendSignedTransaction('0xf867808505d21dba0083015f9094247f2b7e9a9c51ebcc9449c7d9e7575f9baac36e0180824e43a02e50f5c4d279e17a80c3fe98327de7e48878e9d8141d26759ef64adcf66e6aa0a02ae9e8beac1ba8d5d215d87c33f9e05263b0bad163706c9dd7a563ee1e028f41').then(function(receipt){
    ...
})

// sendSignedTransaction using promise with returning object from caver.klay.accounts.signTransaction
caver.klay.sendSignedTransaction({
    messageHash: '0x2378aeb6439f43597e30df4937f59eb13c98e502bb03babcebb39bf602cd8d73',
    v: '0x4e43',
    r: '0x9fc6cfd3d7c35794ab373c8d7f15746f1f4fa94c80e31270eea31977f20aaa9a',
    s: '0x762343c55f7c1de87e5877887b9d10ed93b16666f4bdbc525aeee1f23fb53457',
    rawTransaction: '0xf867018505d21dba0083015f9094cdba9992ffd79b12ce68905db40bf5e873b1a43e0180824e43a09fc6cfd3d7c35794ab373c8d7f15746f1f4fa94c80e31270eea31977f20aaa9aa0762343c55f7c1de87e5877887b9d10ed93b16666f4bdbc525aeee1f23fb53457',
    txHash: '0x3d598805e1565ba5c4a1d2b708aff9825562d903bef4301ef22564253c6779bf',
    senderTxHash: '0x3d598805e1565ba5c4a1d2b708aff9825562d903bef4301ef22564253c6779bf',
    signatures: [
        '0x4e43',
        '0x9fc6cfd3d7c35794ab373c8d7f15746f1f4fa94c80e31270eea31977f20aaa9a',
        '0x762343c55f7c1de87e5877887b9d10ed93b16666f4bdbc525aeee1f23fb53457',
    ],
}).then(function(receipt){
    ...
})

// sendSignedTransaction using promise with a transaction object that has signatures
caver.klay.sendSignedTransaction({
    type: 'LEGACY',
    from: '0x73647c5fd1a66fac0dbf2af2e5cc7f593a015441',
    to: '0x82c5b8f3ae5c08eeb64a1af0ce89cb5233b05c6c',
    value: '0x1',
    gas: '0x15f90',
    gasPrice: '0x5d21dba00',
    nonce: '0x2',
    signatures: [
        '0x4e43',
        '0x077b0ec1dd5dd66ffbf7d779b08bed6166ec1b0269d85a3901dbfb55331216de',
        '0x23b7565fa994ba3f88290de9b7f6b6b975f2ad9c19ce1ffc4752ecbc51b6c274',
    ],
}).then(function(receipt){
    ...
})

// sendSignedTransaction using promise with a fee delegated transaction object that has signatures and feePayerSignatures
caver.klay.sendSignedTransaction({
    type: 'FEE_DELEGATED_VALUE_TRANSFER',
    from: '0x73647c5fd1a66fac0dbf2af2e5cc7f593a015441',
    to: '0x73f9b11bd22fde3ec543f3fcbdc39fc40a942bf7',
    value: '0x1',
    gas: '0x15f90',
    gasPrice: '0x5d21dba00',
    chainId: '0x2710',
    nonce: '0x3',
    humanReadable: false,
    feePayer: '0xebcd0271c4f8d2a84a33e073a5c9bcdb6bafc556',
    signatures: [
        [
            '0x4e44',
            '0x41dfab76e0fdcdb5c4cd4dbe39861029d8c7f156f9dd10e8292625492943e689',
            '0x789f1bfc42a96366ea0bdc6727410a661fe8300cdf57889316c25aa873a5b85c',
        ],
    ],
    feePayerSignatures: [
        [
            '0x4e44',
            '0x833031cb1d709a408f1c3b83cea88671d9d86f7550101e4e7221507a39dcd462',
            '0x03f1d8003513b038195c6d798623d5bb132a93e7f2f0a2c302079b92858ea8e7',
        ],
    ],
}).then(function(receipt){
    ...
})

// sendSignedTransaction using event emitter with RLP encoded signed transaction string
> caver.klay.sendSignedTransaction('0xf867068505d21dba0083015f90940fd7697a8b9a46b0f770a3986e8a10b6ad6fffe10180824e44a0e591e4cbf4bdada2e559ce5b9c7b604c50d3b1d7d5a29939091bcc8ad4208aa3a01ef917ec539aa79b32a043b452e81840ea012796895cd5925273fd8df139595f')
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error)
```

## sendTransaction <a id="sendtransaction"></a>

- [sendTransaction (Legacy)](./sendtx-legacy.md#sendtransaction-legacy)
- [sendTransaction (VALUE_TRANSFER)](./sendtx-value-transfer.md#sendtransaction-value_transfer)
- [sendTransaction (FEE_DELEGATED_VALUE_TRANSFER)](./sendtx-value-transfer.md#sendtransaction-fee_delegated_value_transfer)
- [sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO)](./sendtx-value-transfer.md#sendtransaction-fee_delegated_value_transfer_with_ratio)
- [sendTransaction (VALUE_TRANSFER_MEMO)](./sendtx-value-transfer-memo.md#sendtransaction-value_transfer_memo)
- [sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_MEMO)](./sendtx-value-transfer-memo.md#sendtransaction-fee_delegated_value_transfer_memo)
- [sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO)](./sendtx-value-transfer-memo.md#sendtransaction-fee_delegated_value_transfer_memo_with_ratio)
- [sendTransaction (ACCOUNT_UPDATE)](./sendtx-account-update.md#sendtransaction-account_update)
- [sendTransaction (FEE_DELEGATED_ACCOUNT_UPDATE)](./sendtx-account-update.md#sendtransaction-fee_delegated_account_update)
- [sendTransaction (FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO)](./sendtx-account-update.md#sendtransaction-fee_delegated_account_update_with_ratio)
- [sendTransaction (SMART_CONTRACT_DEPLOY)](./sendtx-smart-contract-deploy.md#sendtransaction-smart_contract_deploy)
- [sendTransaction (FEE_DELEGATED_SMART_CONTRACT_DEPLOY)](./sendtx-smart-contract-deploy.md#sendtransaction-fee_delegated_smart_contract_deploy)
- [sendTransaction (FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO)](./sendtx-smart-contract-deploy.md#sendtransaction-fee_delegated_smart_contract_deploy_with_ratio)
- [sendTransaction (SMART_CONTRACT_EXECUTION)](./sendtx-smart-contract-execution.md#sendtransaction-smart_contract_execution)
- [sendTransaction (FEE_DELEGATED_SMART_CONTRACT_EXECUTION)](./sendtx-smart-contract-execution.md#sendtransaction-fee_delegated_smart_contract_execution)
- [sendTransaction (FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO)](./sendtx-smart-contract-execution.md#sendtransaction-fee_delegated_smart_contract_execution_with_ratio)
- [sendTransaction (CANCEL)](./sendtx-cancel.md#sendtransaction-cancel)
- [sendTransaction (FEE_DELEGATED_CANCEL)](./sendtx-cancel.md#sendtransaction-fee_delegated_cancel)
- [sendTransaction (FEE_DELEGATED_CANCEL_WITH_RATIO)](./sendtx-cancel.md#sendtransaction-fee_delegated_cancel_with_ratio)

## signTransaction <a id="signtransaction"></a>

```javascript
caver.klay.signTransaction(transactionObject [, callback])
```

Ký giao dịch. Tài khoản này cần ở trạng thái mở khóa.

**Tham số**

| Tên               | type      | Mô tả                                                                                                                              |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| transactionObject | Đối tượng | Dữ liệu giao dịch cần ký.                                                                                                          |
| callback          | Hàm       | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Object` - Giao dịch được mã hóa RLP. Có thể sử dụng thuộc tính `raw` để gửi giao dịch bằng cách sử dụng hàm [caver.klay.sendSignedTransaction](#sendsignedtransaction).

**Ví dụ**

```javascript
> caver.klay.signTransaction({
    nonce: 0,
    from: "0xEB014f8c8B418Db6b45774c326A0E64C78914dC0",
    gasPrice: '25000000000',
    gas: "21000",
    to: '0x3535353535353535353535353535353535353535',
    value: "1000000000000000000",
    data: ""
}).then(console.log);

{
    raw: '0xf86c808504a817c800825208943535353535353535353535353535353535353535880de0b6b3a76400008025a04f4c17305743700648bc4f6cd3038ec6f6af0df73e31757007b7f59df7bee88da07e1941b264348e80c78c4027afc65a87b0a5e43e86742b8ca0823584c6788fd0',
    tx: {
        nonce: '0x0',
        gasPrice: '25000000000',
        gas: '0x5208',
        to: '0x3535353535353535353535353535353535353535',
        value: '0xde0b6b3a7640000',
        input: '0x',
        v: '0x25',
        r: '0x4f4c17305743700648bc4f6cd3038ec6f6af0df73e31757007b7f59df7bee88d',
        s: '0x7e1941b264348e80c78c4027afc65a87b0a5e43e86742b8ca0823584c6788fd0',
        hash: '0xda3be87732110de6c1354c83770aae630ede9ac308d9f7b399ecfba23d923384'
    }
}
```
