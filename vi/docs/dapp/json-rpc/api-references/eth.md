---
description: >-
  API không gian tên eth.
---

# Không gian tên eth <a id="namespace-eth"></a>

Không gian tên `eth` cung cấp các hàm liên quan đến tài khoản, khối, giao dịch, cấu hình của mạng hoặc nút, bộ lọc, v.v.

Klaytn hiện hỗ trợ không gian tên `eth` của [API JSON-RPC của Ethereum](https://eth.wiki/json-rpc/API). Xin lưu ý rằng một số giá trị trả về đã được điều chỉnh để phù hợp với nội dung phản hồi API của Ethereum.

Và do sự khác biệt cơ bản về thiết kế giữa Klaytn và Ethereum, nên Cấu trúc dữ liệu của Klaytn (Giao dịch, Chặn và Biên lai giao dịch) sẽ không được hỗ trợ hoàn chỉnh thông qua API không gian tên `eth`.

Vui lòng kiểm tra [Tổng quan về sự khác biệt với Ethereum](#differences_overview_from_ethereum) trong tài liệu này.

**LƯU Ý**: API không gian tên `eth` được hỗ trợ từ Klaytn v1.8.0.

Danh sách dưới đây liệt kê các hàm API. Tất cả các API không gian tên `eth` được hỗ trợ trên Klaytn.

### [Tài khoản](./eth/tài khoản.md) <a id="account"></a>
- [eth_tài khoảns](./eth/account.md#eth_accounts)
- [eth_getBalance](./eth/account.md#eth_getbalance)
- [eth_getCode](./eth/account.md#eth_getcode)
- [eth_getTransactionCount](./eth/account.md#eth_gettransactioncount)
- [eth_sign](./eth/account.md#eth_sign)

### [Khối](./eth/block.md) <a id="block"></a>
- [eth_blockNumber](./eth/block.md#eth_blocknumber)
- [eth_getHeaderByNumber](./eth/block.md#eth_getheaderbynumber)
- [eth_getHeaderByHash](./eth/block.md#eth_getheaderbyhash)
- [eth_getBlockByNumber](./eth/block.md#eth_getblockbynumber)
- [eth_getBlockByHash](./eth/block.md#eth_getblockbyhash)
- [eth_getUncleByBlockHashAndIndex](./eth/block.md#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](./eth/block.md#eth_getunclebyblocknumberandindex)
- [eth_getBlockTransactionCountByNumber](./eth/block.md#eth_getblocktransactioncountbynumber)
- [eth_getBlockTransactionCountByHash](./eth/block.md#eth_getblocktransactioncountbyhash)
- [eth_getUncleCountByBlockNumber](./eth/block.md#eth_getunclecountbyblocknumber)
- [eth_getUncleCountByBlockHash](./eth/block.md#eth_getunclecountbyblockhash)
- [eth_getStorageAt](./eth/block.md#eth_getstorageat)
- [eth_mining](./eth/block.md#eth_mining)
- [eth_syncing](./eth/block.md#eth_syncing)


### [Giao dịch](./eth/transaction.md) <a id="transaction"></a>
- [eth_call](./eth/transaction.md#eth_call)
- [eth_estimateGas](./eth/transaction.md#eth_estimategas)
- [eth_getTransactionByBlockHashAndIndex](./eth/transaction.md#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](./eth/transaction.md#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionByHash](./eth/transaction.md#eth_gettransactionbyhash)
- [eth_getTransactionReceipt](./eth/transaction.md#eth_gettransactionreceipt)
- [eth_sendRawTransaction](./eth/transaction.md#eth_sendrawtransaction)
- [eth_sendTransaction](./eth/transaction.md#eth_sendtransaction)
- [eth_signTransaction](./eth/transaction.md#eth_signtransaction)
- [eth_fillTransaction](./eth/transaction.md#eth_filltransaction)
- [eth_pendingTransactions](./eth/transaction.md#eth_pendingtransactions)
- [eth_resend](./eth/transaction.md#eth_resend)

### [Cấu hình](./eth/config.md) <a id="configuration"></a>
- [eth_coinbase](./eth/config.md#eth_coinbase)
- [eth_etherbase](./eth/config.md#eth_etherbase)
- [eth_chainId](./eth/config.md#eth_chainid)
- [eth_gasPrice](./eth/config.md#eth_gasprice)


### [Bộ lọc](./eth/bộ lọc.md) <a id="filter"></a>
- [eth_getFilterChanges](./eth/filter.md#eth_getfilterchanges)
- [eth_getFilterLogs](./eth/filter.md#eth_getfilterlogs)
- [eth_getLogs](./eth/filter.md#eth_getlogs)
- [eth_newBlockFilter](./eth/filter.md#eth_newblockfilter)
- [eth_newFilter](./eth/filter.md#eth_newfilter)
- [eth_newPendingTransactionFilter](./eth/filter.md#eth_newpendingtransactionfilter)
- [eth_subscribe](./eth/filter.md#eth_subscribe)
- [eth_uninstallFilter](./eth/filter.md#eth_uninstallfilter)
- [eth_unsubscribe](./eth/filter.md#eth_unsubscribe)


### [Gas](./eth/gas.md) <a id="gas"></a>
- [eth_feeHistory](./eth/gas.md#eth_feehistory)
- [eth_maxPriorityFeePerGas](./eth/gas.md#eth_maxpriorityfeepergas)

### [Khác](./eth/misc.md) <a id="miscellaneous"></a>
- [eth_hashrate](./eth/misc.md#eth_hashrate)
- [eth_getWork](./eth/misc.md#eth_getwork)
- [eth_submitWork](./eth/misc.md#eth_submitwork)
- [eth_submitHashrate](./eth/misc.md#eth_submithashrate)

## Tổng quan về sự khác biệt so với Ethereum <a id="differences_overview_from_ethereum">

> Vui lòng xem phần [Cảnh báo](./eth/caution.md) mô tả chi tiết về sự khác biệt giữa Klaytn và Ethereum khi thực thi API không gian tên eth.

### Khối <a id="block"></a>

API liên quan: [eth_getHeaderByNumber](./eth/block/#eth_getHeaderByNumber), [eth_getHeaderByHash](./eth/block/#eth_getHeaderByHash), [eth_getBlockByHash](./eth/block/#eth_getBlockByHash), [eth_getBlockByNumber](./eth/block/#eth_getBlockByNumber), [eth_getUncleByBlockHashAndIndex](./eth/block/#eth_getUncleByBlockHashAndIndex), [eth_getUncleByBlockNumberAndIndex](./eth/block/#eth_getUncleByBlockNumberAndIndex).

| Trường          | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| baseFeePerGas   | Trường này luôn có giá trị `0x0` vì Klaytn không có chế độ baseFeePerGas.                                                                                                                                                                                                                                                                                                                                                                |
| độ khó          | Trường này tương ứng với `blockScore` trong tiêu đề Klaytn, được cố định thành `0x1`. Lý do là vì cơ chế đồng thuận của Klaytn không dựa trên PoW (bằng chứng xử lý) nhằm biểu thị khái niệm kỹ thuật về độ khó của khối không áp dụng cho nhân Klaytn.                                                                                                                                                                                  |
| extraData       | Trường này luôn có giá trị là `0x` biểu thị giá trị rỗng. Do `extraData` của Klaytn chứa dữ liệu đồng thuận như địa chỉ của người xác thực, chữ ký của người xác thực và chữ ký của người đề xuất nên dữ liệu này không thể áp dụng cho API không gian tên `eth`.                                                                                                                                                                        |
| gasLimit        | Trường này luôn có giá trị là `0xe8d4a50fff`(=`999999999999` ở dạng thập phân), đây là một con số bất kỳ vì Klaytn không có GasLimit. Tại thời điểm tạo bài viết này, con số này cao gấp 30 lần so với [giới hạn gas khối của Ethereum](https://ethereum.org/en/developers/docs/gas/#block-size). Vui lòng tham khảo [Chi phí tính toán](../../../klaytn/design/computation/computation-cost/computation-cost.md) để biết thêm chi tiết. |
| miner           | Trường này trả về địa chỉ của người đề xuất khối, vì [cơ chế đồng thuận](../../../klaytn/design/consensus-mechanism.md) của Klaytn là [PBFT](../../../klaytn/design/consensus-mechanism.md#pbft-practical-byzantine-fault-tolerance), trong đó có một người đề xuất khối thay vì thợ đào.                                                                                                                                                |
| mixHash         | Trường này luôn có giá trị là zeroHash (`0x00...`) vì cơ chế đồng thuận của Klaytn không dựa trên PoW.                                                                                                                                                                                                                                                                                                                                   |
| số dùng một lần | Trường này luôn có giá trị là zeroNonce (`0x00...`) do cơ chế đồng thuận của Klaytn không dựa trên PoW.                                                                                                                                                                                                                                                                                                                                  |
| sha3Uncles      | Trường này luôn có giá trị `0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347`, là mã băm Keccak256 của các byte được mã hóa RLP của danh sách chứa tiêu đề khối trống vì không có khối chú trên Klaytn.                                                                                                                                                                                                                |
| totalDifficulty | Tổng độ khó của chuỗi cho đến khối truy vấn.                                                                                                                                                                                                                                                                                                                                                                                             |
| uncles          | Trường này luôn có giá trị `[]` vì không có khái niệm kỹ thuật về khối chú trong Klaytn core.                                                                                                                                                                                                                                                                                                                                            |

Các trường không được đề cập ở đây sẽ gán vào các trường khối của Ethereum.

### Giao dịch <a id="transaction"></a>

API liên quan: [eth_getTransactionByHash](./eth/transaction/#eth_getTransactionByHash), [eth_getTransactionByBlockHashAndIndex](./eth/transaction/#eth_getTransactionByBlockHashAndIndex), [eth_getTransactionByBlockNumberAndIndex](./eth/transaction/#eth_getTransactionByBlockNumberAndIndex), [eth_pendingTransactions](./eth/transaction/#eth_pendingTransactions).

> Do sự khác biệt cơ bản về thiết kế giữa Klaytn và Ethereum, Các giao dịch Klaytn không thể được hỗ trợ đầy đủ thông qua các API không gian tên `eth`.

| Trường  | Mô tả                                                                                                                                                                                                                                           |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| giá gas | Còn được gọi là [Đơn giá](../../../klaytn/design/transaction-fees/transaction-fees.md#unit-price) trong bối cảnh của Klaytn, giá trị này được xác định trong hệ thống thông qua các quy trình quản trị.                                         |
| loại   | Trong Klaytn, `loại` trả về loại giao dịch theo chuỗi (ví dụ: `"LegacyTransaction"`), nhưng đã được chuyển đổi sang hệ thập lục phân (ví dụ: `0x0`) để khớp với Ethereum. Các loại giao dịch chỉ hợp lệ trong Klaytn luôn trả về giá trị `0x0`. |

Các giao dịch Klaytn có thể có nhiều hơn một chữ ký vì Klaytn hỗ trợ MultiSig (các giao dịch Ethereum chỉ có một trường chữ ký (= v, r, s)) ngay cả ở cấp độ giao thức. Trong ngữ cảnh đó, các trường liên quan đến chữ ký (v, r, s) sẽ khớp với `tx.signatures[0].V`, `tx.signatures[0].R` và `tx.signatures[0].S`.

Các trường không được đề cập ở đây sẽ gán vào các trường giao dịch của Ethereum.

### Biên lai giao dịch <a id="transaction_receipt"></a>

API liên quan: [eth_getTransactionReceipt](./eth/transaction/#eth_getTransactionReceipt).

> Do sự khác biệt thiết kế cơ bản tồn tại giữa Klaytn và Ethereum, Biên lai giao dịch Klaytn không thể được hỗ trợ đầy đủ khi được cung cấp qua API không gian tên Ethereum.

| Trường            | Mô tả                                                                                                                                                                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| effectiveGasPrice | Giá trị gasPrice được trả về do Klaytn áp dụng chính sách giá gas cố định. gasPrice (còn được gọi là [Đơn giá](../../../klaytn/design/transaction-fees/transaction-fees.md#unit-price)) được cơ chế quản trị thiết lập trong hệ thống. |
| transactionIndex  | Gần giống như Ethereum nhưng khác với Ethereum ở chỗ Klaytn trả về số nguyên như khi giao dịch đang chờ xử lý.                                                                                                                         |

Các trường không được đề cập ở đây sẽ gán vào các trường giao dịch_receipt được đề xuất của Ethereum.
