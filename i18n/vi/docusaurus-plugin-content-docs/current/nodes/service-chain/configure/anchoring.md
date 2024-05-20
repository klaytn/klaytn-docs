# Dữ liệu neo

Như đã giải thích trong phần thiết kế, Chuỗi dịch vụ hỗ trợ tính năng neo dữ liệu.
Trang này hiển thị cách bật chức năng neo.
Nếu bật chức năng này, SCN sẽ định kỳ neo dữ liệu khối chuỗi con vào chuỗi mẹ làm bằng chứng về sự tồn tại và tính bất biến.
Điều này đảm bảo tính bảo mật và uy tín của chuỗi dịch vụ.

## Bật chức năng Neo <a id="enable-anchoring"></a>

### Kiểm tra người vận hành mẹ của SCN <a id="check-parent-operator-of-scn"></a>

Nếu bạn đã cài đặt và chạy SCN thành công, tài khoản người vận hành chuỗi mẹ sẽ được tạo.
Bạn có thể cung cấp tập tin lưu trữ khóa mà bạn muốn sử dụng làm người vận hành mẹ. Nếu bạn không cung cấp, SCN sẽ tạo khóa cho bạn.
Bạn có thể kiểm tra địa chỉ của người vận hành mẹ thông qua API RPC, `subbridge_parentOperator`.

```
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0
 > subbridge.parentOperator
 "0x726e5C8705892989DAB1E9982FBE0B0A92eC84Bf"

```

_Địa chỉ tài khoản người vận hành được lấy từ tập tin lưu trữ khóa trong thư mục `$dataDIR/parent_bridge_tài khoản`._

### Thêm KLAY vào tài khoản người vận hành mẹ<a id="add-klay-to-parent-operator-account"></a>

Khi SCN neo dữ liệu khối, SCN thực hiện giao dịch neo với tư cách là người vận hành mẹ.
Do đó, tài khoản cần có KLAY để thanh toán phí giao dịch. Bạn nên thêm đủ KLAY vào tài khoản người vận hành mẹ.

### Bật chức năng Neo <a id="enable-anchoring"></a>

Sau khi gửi KLAY, bạn có thể kiểm tra số dư như bên dưới.

```javascript
> subbridge.parentOperatorBalance
1e+50
```

Sau đó, bạn có thể kích hoạt neo thông qua API RPC, `subbridge.anchoring`, như bên dưới.
You can refer to [subbridge APIs](../../../references/json-rpc/subbridge/anchoring) for more details.

```
> subbridge.anchoring(true)
true
```

## Kiểm tra dữ liệu neo <a id="check-anchoring-data"></a>

Nếu tính năng neo được bật, SCN sẽ định kỳ neo dữ liệu khối vào chuỗi chính.
Bạn có thể kiểm tra dữ liệu được neo như bên dưới.

### Cầu nối con <a id="sub-bridge"></a>

Trong cầu nối con, bạn có thể kiểm tra số khối được neo mới nhất như bên dưới.
You can refer to [subbridge APIs](../../../references/json-rpc/subbridge/latest-anchored-block-number) for more details.

```javascript
> subbridge.latestAnchoredBlockNumber
71025
```

Ngoài ra, bạn có thể tìm thấy hàm băm giao dịch neo theo số khối chuỗi dịch vụ như bên dưới.

```javascript
> subbridge.getAnchoringTxHashByBlockNumber(1055)
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

### Cầu nối chính <a id="sub-bridge"></a>

Trong Cầu nối chính, nếu tùy chọn lập chỉ mục chuỗi được bật, bạn có thể tìm hàm băm giao dịch neo bằng hàm băm khối chuỗi dịch vụ như bên dưới.
You can refer to [mainbridge APIs](../../../references/json-rpc/mainbridge/convert-child-chain-block-hash-to-parent-chain-tx-hash) for more details.

```javascript
> mainbridge.convertChildChainBlockHashToParentChainTxHash("0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a4f2792aac8a6e0d1880")
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

Bạn có thể lấy dữ liệu neo được giải mã bằng cách neo hàm băm giao dịch như bên dưới.

```javascript
> klay.getDecodedAnchoringTransactionByHash("0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51")
{
  BlockCount: 1,
  BlockHash: "0xcf5f591836d70a1da8e6bb8e5b2c5739329ca0e535b91e239b332af2e1b7f1f4",
  BlockNumber: 1055,
  ParentHash: "0x70f6115a5b597f29791d3b5e3f129df54778f69ae669842cc81ec8c432fee37c",
  ReceiptHash: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
  StateRootHash: "0x654773348f77a6788c76c93946340323c9b39399d0aa173f6b23fe082848d056",
  TxCount: 0,
  TxHash: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
}
```
