# Config

## gasPriceAt <a id="gaspriceat"></a>

```javascript
caver.klay.gasPriceAt([defaultBlock] [, callback])
```

Trả về đơn giá của gas theo peb có hiệu lực tại chiều cao khối nhất định.

**Tham số**

| Tên                                                                                                                                                                 | type     | Mô tả |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----- |
| defaultBlock                                                                                                                                                        | Số \\    | Chuỗi |
| (tùy chọn) Nếu bạn truyền tham số này, khối mặc định được thiết lập bằng hàm [caver.klay.defaultBlock](./block.md#defaultblock) sẽ được sử dụng. | callback | Hàm   |

(tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.

**Giá trị trả về**

`Promise` trả về `String` - Chuỗi số biểu diễn giá gas theo peb.

```javascript
> caver.klay.gasPriceAt().then(console.log);
0x5d21dba00

> caver.klay.gasPriceAt('latest').then(console.log);
0x5d21dba00
```

## **Ví dụ**

```javascript
caver.klay.getChainId([callback])
```

getChainId <a id="getchainid"></a>

Trả về mã chuỗi của chuỗi.

| **Tham số** | Tên      | Loại |
| ----------- | -------- | ----- |
| Mô tả       | callback | Hàm   |

(tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.

**Giá trị trả về**

`Promise` trả về `Number` - Giá trị nguyên biểu thị mã chuỗi của chuỗi.

```javascript
> caver.klay.getChainId().then(console.log);
1001
```

## **Ví dụ**

```javascript
caver.klay.getGasPrice([callback])
```

getGasPrice <a id="getgasprice"></a>

Trả về đơn giá được xác định trong mạng lưới Klaytn.

| **Tham số** | Tên      | type |
| ----------- | -------- | ---- |
| Mô tả       | callback | Hàm  |

(tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.

**Giá trị trả về**

`Promise` trả về `String` - Chuỗi số biểu thị đơn giá hiện tại theo peb.

```javascript
> caver.klay.getGasPrice().then(console.log);
"25000000000"
```

## **Ví dụ**

```javascript
caver.klay.getNodeInfo([callback])
```

getNodeInfo <a id="getnodeinfo"></a>

Trả về phiên bản máy khách hiện tại của nút Klaytn.

| **Tham số** | Tên      | Loại |
| ----------- | -------- | ----- |
| Mô tả       | callback | Hàm   |

(tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.

**Giá trị trả về**

`Promise` trả về `String` - Phiên bản máy khách hiện tại của nút Klaytn.

```javascript
> caver.klay.getNodeInfo().then(console.log);
Klaytn/v0.10.1+fc5c37064e/linux-amd64/go1.11.2
```

## **Ví dụ**

```javascript
caver.klay.getProtocolVersion([callback])
```

getProtocolVersion <a id="getprotocolversion"></a>
Trả về phiên bản giao thức Klaytn của nút.

Phiên bản hiện tại (kể từ v1.9.0) của Cypress/Baobab là `istanbul/65`.

| **Tham số** | Tên      | Loại |
| ----------- | -------- | ----- |
| Mô tả       | callback | Hàm   |

(tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.

**Giá trị trả về**

`Promise` trả về `String` - Phiên bản giao thức Klaytn của nút.

```javascript
> caver.klay.getProtocolVersion().then(console.log);
0x40
```

## **Ví dụ**

```javascript
caver.klay.isSenderTxHashIndexingEnabled([callback])
```

isSenderTxHashIndexingEnabled <a id="issendertxhashindexingenabled"></a>

Trả về giá trị `true` nếu nút đang lập chỉ mục hàm băm giao dịch của người gửi thành thông tin ánh xạ hàm băm giao dịch.

| **Tham số** | Tên      | type                                                                                                                                                  |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mô tả       | callback | Hàm (tùy chọn) Hàm callback tùy chọn. Hàm callback được gọi với đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Boolean` - Giá trị `true` nghĩa là nút đang lập chỉ mục hàm băm giao dịch của người gửi để tìm kiếm giao dịch người trả phí đã ký. For detailed information, please see [Klaytn Platform API - klay_getTransactionBySenderTxHash](../../../../../json-rpc/klay/get-transaction-by-sender-tx-hash) and [Klaytn Transactions - Fee Delegation and SenderTxHash](../../../../../learn/transactions/transactions.md#fee-delegation).

**Ví dụ**

```javascript
> caver.klay.isSenderTxHashIndexingEnabled().then(console.log);
true
```

## isParallelDBWrite <a id="isparalleldbwrite"></a>

```javascript
caver.klay.isParallelDBWrite([callback])
```

Trả về giá trị `true` nếu nút đang ghi dữ liệu chuỗi khối theo phương pháp song song. Nút được kích hoạt theo mặc định.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                                              |
| -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------- |
| callback | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Boolean` - Giá trị `true` nghĩa là nút đang ghi dữ liệu chuỗi khối theo phương pháp song song. Hàm sẽ trả về giá trị `false` nếu nút đang ghi dữ liệu theo phương pháp nối tiếp.

**Ví dụ**

```javascript
> caver.klay.isParallelDBWrite().then(console.log);
true
```

## rewardbase <a id="rewardbase"></a>

```javascript
caver.klay.rewardbase([callback])
```

Trả về địa chỉ ví rewardbase của nút hiện tại. Rewardbase là địa chỉ của tài khoản mà các phần thưởng khối được chuyển đến. Chỉ có các nút đồng thuận (CN) Klaytn mới có địa chỉ ví rewardbase trong cấu hình của nút. Xem [Tập tin cấu hình](../../../../../misc/operation/configuration.md).

**Tham số**

| Tên      | Loại | Mô tả                                                                                                                              |
| -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------- |
| callback | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `String` - Rewardbase của nút hiện tại.

**Ví dụ**

```javascript
> caver.klay.rewardbase().then(console.log);
0xed9d108be2a9a7ea5f180ace80f31b66ea107283
```
