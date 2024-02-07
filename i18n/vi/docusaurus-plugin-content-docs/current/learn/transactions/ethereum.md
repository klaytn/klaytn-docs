# Các loại giao dịch Ethereum

Klaytn cung cấp các loại giao dịch được bọc nhằm hỗ trợ khả năng tương thích với Ethereum. Các loại giao dịch Ethereum trong Klaytn có cùng các thuộc tính và sơ đồ mã hóa RLP với thiết kể của Ethereum, ngoại trừ dấu phân tách loại một byte có tên là `EthereumTxTypeEnvelope`. Vì thế, người dùng có thể triển khai thành công các giao dịch được tạo bằng công cụ phát triển Ethereum trên Klaytn. Dấu phân tách loại cũng được bỏ qua khi người dùng sử dụng API không gian tên `eth` để họ có thể sử dụng Klaytn như Ethereum. Khi sử dụng các API không gian tên `klay`, người dùng có thể triển khai và truy xuất các giao dịch có định dạng Ethereum như một loại giao dịch Klaytn và không bị nhầm lẫn với các loại giao dịch Klaytn hiện có.

## EthereumTxTypeEnvelope <a id="ethereumtxtypeenvelope"></a>

EthereumTxTypeEnvelope là tiền tố một byte cho các giao dịch thô, biểu thị các loại giao dịch Ethereum. Ethereum đã ứng dụng sơ đồ loại giao dịch có thể mở rộng từ [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) và sử dụng một hệ thống đánh số phân loại có xung đột với Klaytn. Để giải quyết xung đột giữa hai sơ đồ loại giao dịch khác nhau, Klaytn đã giới thiệu `EthereumTxTypeEnvelope`, cho phép phân tách và mở rộng các loại giao dịch Ethereum trong tương lai.

`EthereumTxTypeEnvelope` là một dấu phân tách loại bổ sung và chỉ được sử dụng cho các giao dịch thô và đánh số phân loại. Nó không được sử dụng cho hàm băm giao dịch hoặc hàm băm chữ ký. Vì mục đích đó, `EthereumTransactionType`, như được định nghĩa trong EIP, sẽ được sử dụng.

- EthereumTxTypeEnvelope: `0x78`
- TxHashRLP : EthereumTransactionType || TransactionPayload
- RawTransaction : EthereumTxTypeEnvelope || EthereumTransactionType || TransactionPayload

## TxTypeEthereumAccessList <a id="txtypeethereumaccesslist"></a>

`TxTypeEthereumAccessList` đại diện cho một loại giao dịch Ethereum được chỉ định trong [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930). Loại giao dịch này chứa một danh sách quyền truy cập, một danh sách các địa chỉ và khóa lưu trữ mà giao dịch cần phải truy cập. Vì loại giao dịch này tồn tại để hỗ trợ khả năng tương thích, nó chỉ hoạt động với các EOA liên kết với [AccountKeyLegacy]. Các EOA liên kết với loại khóa tài khoản khác sẽ sử dụng những loại giao dịch khác như `TxTypeValueTransfer`, `TxTypeSmartContractExecution`, v.v. Loại giao dịch này có thể tạo tài khoản, chuyển token, triển khai/thực thi hợp đồng thông minh hoặc kết hợp những hoạt động vừa nêu.

:::note

LƯU Ý: Mạng Klaytn có thể xử lý loại giao dịch này sau `EthTxTypeCompatibleBlock`

:::

:::note

LƯU Ý: Loại giao dịch này chỉ hỗ trợ định dạng của loại giao dịch Ethereum. Khác với [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930), việc sử dụng danh sách quyền truy cập không mang lại lợi ích về mặt phí giao dịch.

:::

### Thuộc tính <a id="attributes"></a>

| Thuộc tính | type                                                                               | Mô tả                                                                                                                                                                                                                                                                                                                                      |
| :--------- | :--------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | uint8 (Go)                                                      | Loại `TxTypeEthereumAccessList` là sự kết nối của `EthereumTxTypeEnvelope` và `EthereumTransactionType`. Thuộc tính này phải là 0x7801.                                                                                                                                                                                                    |
| chainId    | \*big.Int (Go)                                                  | ID chuỗi đích.                                                                                                                                                                                                                                                                                                                             |
| nonce      | uint64 (Go)                                                     | Giá trị dùng để định danh duy nhất cho một giao dịch của người gửi. Nếu hai giao dịch có cùng một giá trị số dùng một lần do người gửi tạo ra, chỉ có một giao dịch sẽ được thực thi.                                                                                                                                                      |
| giá gas    | \*big.Int (Go)                                                  | Hệ số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Lượng token mà người gửi sẽ thanh toán được tính theo công thức `gas` \* `gasPrice`. Ví dụ: Người gửi sẽ thanh toán khoản phí giao dịch là 10 KLAY nếu gas bằng 10 và gasPrice là 10^18. Hãy xem [Đơn vị của KLAY]. |
| gas        | uint64 (Go)                                                     | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                                                                                                                                               |
| đến        | \*common.Address (Go)                                           | Địa chỉ tài khoản sẽ nhận giá trị được chuyển.                                                                                                                                                                                                                                                                                             |
| giá trị    | \*big.Int (Go)                                                  | Số lượng KLAY tính bằng `peb` sẽ được chuyển.                                                                                                                                                                                                                                                                                              |
| data       | []byte (Go) | Dữ liệu được gắn kèm giao dịch, dùng để thực thi giao dịch.                                                                                                                                                                                                                                                                                |
| accessList | type.AccessList (Go)                                            | Một danh sách gồm các địa chỉ và khóa lưu trữ bao gồm [](common.Address, []common.Hash).                                                                                                                        |
| v, r, s    | \*big.Int (Go)                                                  | Chữ ký mật mã được tạo bởi người gửi để cho phép người nhận lấy được địa chỉ của người gửi.                                                                                                                                                                                                                                                |

### Mã hóa RLP cho chữ ký <a id="rlp-encoding-for-signature"></a>

Để tạo chữ ký cho loại giao dịch này, việc tuần tự hóa RLP phải được thực hiện như sau:

:::note

LƯU Ý: Loại giao dịch này phải được ký bằng London Signer

:::

```javascript
SigRLP = EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash, <private key>)
```

### Mã hóa RLP cho SenderTxHash <a id="rlp-encoding-for-sendertxhash"></a>

Để lấy `SenderTxHash` cho loại giao dịch này, việc tuần tự hóa RLP được thực hiện như sau:

```javascript
SenderTxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList, v, r, s])
SenderTxHash = keccak256(SenderTxHashRLP)
Signature = sign(SenderTxHash, <private key>)
```

### Mã hóa RLP cho hàm băm giao dịch <a id="rlp-encoding-for-transaction-hash"></a>

Để tạo một hàm băm giao dịch, việc tuần tự hóa RLP được thực hiện nhu sau:

```javascript
TxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList, v, r, s])
TxHash = keccak256(TxHashRLP)
```

### Giao dịch thô <a id="raw-transaction"></a>

```javascript
RawTx = EthereumTxTypeEnvelope || EthereumTransactionType || encode([chainId, nonce, gasPrice, gasLimit, to, value, data, accessList, v, r, s])
```

### Mã hóa RLP (Ví dụ) <a id="rlp-encoding-example"></a>

Phần dưới đây cho thấy kết quả của quá trình tuần tự hóa RLP và đối tượng giao dịch:

```javascript
    TX(3a3ab67168de40b1f8a2141a70a4e2f551f90d7814b2fbcb3ac99ad8d8d0b641)
    Contract: false
    Chaind:   0x2
    From:     a94f5374fce5edbc8e2a8697c15331677e6ebf0b
    To:       7b65b75d204abed71587c9e519a89277766ee1d0
    Nonce:    1234
    GasPrice: 0x19
    GasLimit  0xf4240
    Value:    0xa
    Data:     0x31323334
    AccessList: [{0000000000000000000000000000000000000001 [0000000000000000000000000000000000000000000000000000000000000000]}]
    V:        0x1
    R:        0xbfc80a874c43b71b67c68fa5927d1443407f31aef4ec6369bbecdb76fc39b0c0
    S:        0x193e62c1dd63905aee7073958675dcb45d78c716a9a286b54a496e82cb762f26
    Hex:      7801f8a1028204d219830f4240947b65b75d204abed71587c9e519a89277766ee1d00a8431323334f838f7940000000000000000000000000000000000000001e1a0000000000000000000000000000000000000000000000000000000000000000001a0bfc80a874c43b71b67c68fa5927d1443407f31aef4ec6369bbecdb76fc39b0c0a0193e62c1dd63905aee7073958675dcb45d78c716a9a286b54a496e82cb762f26
        

```

### Kết quả đầu ra RPC (Example) <a id="rpc-output-example"></a>

Phần dưới đây cho thấy một đối tượng giao dịch được trả về qua JSON RPC.

Kết quả trả về của `eth_getTransactionByHash`

```javascript
{
  "blockHash": "0x7bd7e8a92ecaa5781a15a8b6fff589f8ac8a79325b517a1ba5d5f2f3d7af1b00",
  "blockNumber": "0x1c8f4b",
  "from": "0x5618e15ec2916bbe6cf2cce20ce31e61d6062cac",
  "gas": "0x174876e800",
  "gasPrice": "0x5d21dba00",
  "hash": "0x3f67e48c2090f560234f555cd4edf7853b6327aa9a6a795be1efe3f360dac118",
  "input": "0x1122",
  "nonce": "0x11",
  "to": "0x5dce87b5bfcde54023811b168dc97a9f10913957",
  "transactionIndex": "0x0",
  "value": "0x186a0",
  "type": "0x1",
  "accessList": [
      {
          "address": "0x0000000000000000000000000000000000000001",
          "storageKeys": [
              "0x0000000000000000000000000000000000000000000000000000000000000000"
          ]
      }
  ],
  "chainId": "0x2710",
  "v": "0x1",
  "r": "0xebb2d2144293c257e27aaa1d22156f322b0d2d7385257f186c117899d791f174",
  "s": "0x5cea970287c9f0f9754050a552c458c066d8f3b3e4639f561b22ce4cb7553ac0"
}
```

Kết quả trả về của `klay_getTransactionByHash`

```javascript
{
  "accessList": [
      {
          "address": "0x0000000000000000000000000000000000000001",
          "storageKeys": [
              "0x0000000000000000000000000000000000000000000000000000000000000000"
          ]
      }
  ],
  "blockHash": "0x7bd7e8a92ecaa5781a15a8b6fff589f8ac8a79325b517a1ba5d5f2f3d7af1b00",
  "blockNumber": "0x1c8f4b",
  "chainID": "0x2710",
  "from": "0x5618e15ec2916bbe6cf2cce20ce31e61d6062cac",
  "gas": "0x174876e800",
  "gasPrice": "0x5d21dba00",
  "hash": "0x3f67e48c2090f560234f555cd4edf7853b6327aa9a6a795be1efe3f360dac118",
  "input": "0x1122",
  "nonce": "0x11",
  "senderTxHash": "0x3f67e48c2090f560234f555cd4edf7853b6327aa9a6a795be1efe3f360dac118",
  "signatures": [
      {
          "V": "0x1",
          "R": "0xebb2d2144293c257e27aaa1d22156f322b0d2d7385257f186c117899d791f174",
          "S": "0x5cea970287c9f0f9754050a552c458c066d8f3b3e4639f561b22ce4cb7553ac0"
      }
  ],
  "to": "0x5dce87b5bfcde54023811b168dc97a9f10913957",
  "transactionIndex": "0x0",
  "type": "TxTypeEthereumAccessList",
  "typeInt": 30721,
  "value": "0x186a0"
}
```

## TxTypeEthereumDynamicFee <a id="txtypeethereumdynamicfee"></a>

`TxTypeEthereumDynamicFee` đại diện cho một loại giao dịch Ethereum được chỉ định trong [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). Loại giao dịch này chứa `gasTipCap` và `gasFeeCap` thay vì `gasPrice`. Vì loại giao dịch này tồn tại để hỗ trợ khả năng tương thích, nó chỉ hoạt động với các EOA liên kết với [AccountKeyLegacy]. Các EOA liên kết với loại khóa tài khoản khác sẽ sử dụng những loại giao dịch khác như `TxTypeValueTransfer`, `TxTypeSmartContractExecution`, v.v. Loại giao dịch này có thể tạo tài khoản, chuyển token, triển khai/thực thi hợp đồng thông minh hoặc kết hợp những hoạt động vừa nêu.

:::note

LƯU Ý: Mạng Klaytn có thể xử lý loại giao dịch này sau `EthTxTypeCompatibleBlock`

:::

:::note

LƯU Ý: Hiện tại, loại giao dịch này chỉ hỗ trợ định dạng của loại giao dịch Ethereum. Khác với [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930), việc sử dụng danh sách quyền truy cập không mang lại lợi ích về mặt phí giao dịch.

:::

:::note

LƯU Ý: Vì Klaytn có giá gas cố định, `gasTipCap` và `gasFeeCap` nên lấy giá gas cho mạng lưới tương ứng, mức giá này là 250 ston vào thời điểm viết bài.

:::

### Thuộc tính <a id="attributes"></a>

| Thuộc tính | Loại                                                                              | Mô tả                                                                                                                                                                                                                                                                                                      |
| :--------- | :--------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | uint8 (Go)                                                      | Loại `TxTypeEthereumDynamicFee` là sự kết nối của `EthereumTxTypeEnvelope` và `EthereumTransactionType`. Thuộc tính này phải là `0x7802`.                                                                                                                                                                  |
| chainId    | \*big.Int (Go)                                                  | ID chuỗi đích.                                                                                                                                                                                                                                                                                             |
| nonce      | uint64 (Go)                                                     | Giá trị dùng để định danh duy nhất cho một giao dịch của người gửi. Nếu hai giao dịch có cùng một giá trị số dùng một lần do người gửi tạo ra, chỉ có một giao dịch sẽ được thực thi.                                                                                                                      |
| gasTipCap  | \*big.Int (Go)                                                  | Hệ số nhân để biết mức phí người gửi phải thanh toán ngoài `baseFee`. Vì Klaytn có giá gas cố định, `gasTipCap` và `gasFeeCap` nên lấy giá gas cho mạng lưới tương ứng, mức giá này là 250 ston vào thời điểm viết bài.                                                                                    |
| gasFeeCap  | \*big.Int (Go)                                                  | Hệ số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Lượng token mà người gửi sẽ thanh toán được tính theo công thức `gas` \* `gasFeeCap`. Vì Klaytn có giá gas cố định, `gasTipCap` và `gasFeeCap` nên lấy giá gas cho mạng lưới tương ứng, mức giá này là 250 ston vào thời điểm viết bài. |
| gas        | uint64 (Go)                                                     | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                                                                                                               |
| đến        | \*common.Address (Go)                                           | Địa chỉ tài khoản sẽ nhận giá trị được chuyển.                                                                                                                                                                                                                                                             |
| giá trị    | \*big.Int (Go)                                                  | Số lượng KLAY tính bằng `peb` sẽ được chuyển.                                                                                                                                                                                                                                                              |
| data       | []byte (Go) | Dữ liệu được gắn kèm giao dịch, dùng để thực thi giao dịch.                                                                                                                                                                                                                                                |
| accessList | type.AccessList (Go)                                            | Một danh sách gồm các địa chỉ và khóa lưu trữ bao gồm [](common.Address, []common.Hash).                                                                                        |
| v, r, s    | \*big.Int (Go)                                                  | Chữ ký mật mã được tạo bởi người gửi để cho phép người nhận lấy được địa chỉ của người gửi.                                                                                                                                                                                                                |

### Mã hóa RLP cho chữ ký <a id="rlp-encoding-for-signature"></a>

Để tạo chữ ký cho loại giao dịch này, việc tuần tự hóa RLP phải được thực hiện như sau:

:::note

LƯU Ý: Loại giao dịch này phải được ký bằng London Signer

:::

```javascript
SigRLP = EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList])
SigHash = keccak256(SigRLP)
Signature = sign(SigHash, <private key>)
```

### Mã hóa RLP cho SenderTxHash <a id="rlp-encoding-for-sendertxhash"></a>

Để lấy `SenderTxHash` cho loại giao dịch này, việc tuần tự hóa RLP được thực hiện như sau:

```javascript
SenderTxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList, v, r, s])
SenderTxHash = keccak256(SenderTxHashRLP)
Signature = sign(SenderTxHash, <private key>)
```

### Mã hóa RLP cho hàm băm giao dịch <a id="rlp-encoding-for-transaction-hash"></a>

Để lấy một hàm băm giao dịch, việc tuần tự hóa RLP được thực hiện nhu sau:

```javascript
TxHashRLP = EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList, v, r, s])
TxHash = keccak256(TxHashRLP)
```

### Giao dịch thô <a id="raw-transaction"></a>

```javascript
RawTx = EthereumTxTypeEnvelope || EthereumTransactionType || encode([chainId, nonce, gasTipCap, gasFeeCap, gasLimit, to, value, data, accessList, v, r, s])
```

### Mã hóa RLP (Ví dụ) <a id="rlp-encoding-example"></a>

Phần dưới đây cho thấy kết quả của quá trình tuần tự hóa RLP và đối tượng giao dịch:

```javascript
    TX(be74e122acf00c2f257e8698ecf01140b58b2880de3f24d0875730425eccb45a)
    Contract: false
    Chaind:   0x2
    From:     a94f5374fce5edbc8e2a8697c15331677e6ebf0b
    To:       7b65b75d204abed71587c9e519a89277766ee1d0
    Nonce:    1234
    GasTipCap: 0x19
    GasFeeCap: 0x19
    GasLimit  0xf4240
    Value:    0xa
    Data:     0x31323334
    AccessList: [{0000000000000000000000000000000000000001 [0000000000000000000000000000000000000000000000000000000000000000]}]
    V:        0x0
    R:        0xca14aa0bada2da7ca1b143c16e2dd4a69f2a1e77ce54c7f6d440fe828a777f4f
    S:        0x117f0f78aed398b2995b5ee7c67ace25d52be3c72c1384c2aaa9683b351556
    Hex:      7802f8a1028204d21919830f4240947b65b75d204abed71587c9e519a89277766ee1d00a8431323334f838f7940000000000000000000000000000000000000001e1a0000000000000000000000000000000000000000000000000000000000000000080a0ca14aa0bada2da7ca1b143c16e2dd4a69f2a1e77ce54c7f6d440fe828a777f4f9f117f0f78aed398b2995b5ee7c67ace25d52be3c72c1384c2aaa9683b351556
```

### Kết quả đầu ra RPC (Example) <a id="rpc-output-example"></a>

Phần dưới đây cho thấy một đối tượng giao dịch được trả về qua JSON RPC.

Kết quả trả về của `eth_getTransactionByHash`

```javascript
{
  "blockHash": "0x55792fe186e3d1515fe35a68c2c8d7977b2d7db184d80526f906c53222b77833",
  "blockNumber": "0x1c944d",
  "from": "0x5618e15ec2916bbe6cf2cce20ce31e61d6062cac",
  "gas": "0x174876e800",
  "gasPrice": "0x5d21dba00",
  "maxFeePerGas": "0x5d21dba00",
  "maxPriorityFeePerGas": "0x5d21dba00",
  "hash": "0x5db239963029ad9ef6c3331b10ae455638316e330b0efdae2cc1f8e86884e66e",
  "input": "0x1122",
  "nonce": "0x13",
  "to": "0xa0f1633f4c666d7fe5ba912bd5caf03d3655ac31",
  "transactionIndex": "0x0",
  "value": "0x186a0",
  "type": "0x2",
  "accessList": [
      {
          "address": "0x0000000000000000000000000000000000000001",
          "storageKeys": [
              "0x0000000000000000000000000000000000000000000000000000000000000000"
          ]
      }
  ],
  "chainId": "0x2710",
  "v": "0x1",
  "r": "0x27e007cbe79fd8cc9b89dd798bdd5aa62d038273bf006c7c3b40e13a938ab807",
  "s": "0x6209bb328855f02fa2671fecb41efd9f191b03ecab5e580227fa2a0674879384"
}
```

Kết quả trả về của `klay_getTransactionByHash`

```javascript
{
  "accessList": [
      {
          "address": "0x0000000000000000000000000000000000000001",
          "storageKeys": [
              "0x0000000000000000000000000000000000000000000000000000000000000000"
          ]
      }
  ],
  "blockHash": "0x55792fe186e3d1515fe35a68c2c8d7977b2d7db184d80526f906c53222b77833",
  "blockNumber": "0x1c944d",
  "chainId": "0x2710",
  "from": "0x5618e15ec2916bbe6cf2cce20ce31e61d6062cac",
  "gas": "0x174876e800",
  "hash": "0x5db239963029ad9ef6c3331b10ae455638316e330b0efdae2cc1f8e86884e66e",
  "input": "0x1122",
  "maxFeePerGas": "0x5d21dba00",
  "maxPriorityFeePerGas": "0x5d21dba00",
  "nonce": "0x13",
  "senderTxHash": "0x5db239963029ad9ef6c3331b10ae455638316e330b0efdae2cc1f8e86884e66e",
  "signatures": [
      {
          "V": "0x1",
          "R": "0x27e007cbe79fd8cc9b89dd798bdd5aa62d038273bf006c7c3b40e13a938ab807",
          "S": "0x6209bb328855f02fa2671fecb41efd9f191b03ecab5e580227fa2a0674879384"
      }
  ],
  "to": "0xa0f1633f4c666d7fe5ba912bd5caf03d3655ac31",
  "transactionIndex": "0x0",
  "type": "TxTypeEthereumDynamicFee",
  "typeInt": 30722,
  "value": "0x186a0"
}
```
