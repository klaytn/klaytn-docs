---
description: |-
  description: >-
    API liên quan đến chuỗi dịch vụ EN.
---

# Không gian tên subbridge

Không gian tên `subbridge` cung cấp các hàm liên quan đến Chuỗi dịch vụ.
Để sử dụng các hàm trong không gian tên này, tùy chọn `subbridge` phải được kích hoạt trong SEN được kết nối với chuỗi dịch vụ.

## subbridge_nodeInfo <a id="subbridge_nodeInfo"></a>

Trả về thông tin nút cầu nối bao gồm KNI (Mã định danh mạng lưới Klaytn) ​​của nút.
Một nút cầu nối con có thể kết nối với một nút cầu nối chính thông qua KNI.

**Tham số**

Không có

**Giá trị trả về**

| Loại      | Mô tả                  |
| ---------- | ---------------------- |
| Chuỗi JSON | thông tin nút cầu nối. |

**Ví dụ**

```javascript
> subbridge.nodeInfo
{
  kni: "kni://f8a1f0cd1e2bebeece571e4fda16e215218fd4b9bc2eddd924f7cd5b5f950fcec8f4b8cd3851390d1d0bacf1b15e1c4a38c882252e429a28d16eeb6edbacd726@[::]:50505?discport=0",
  id: "f8a1f0cd1e2bebeece571e4fda16e215218fd4b9bc2eddd924f7cd5b5f950fcec8f4b8cd3851390d1d0bacf1b15e1c4a38c882252e429a28d16eeb6edbacd726",
  ip: "::",
  listenAddr: "[::]:50505",
  name: "-2",
  ports: {
    discovery: 0,
    listener: 50505
  },
  protocols: {
    servicechain: {
      config: {
        chainId: 2018,
        deriveShaImpl: 0,
        isBFT: true,
        istanbul: {...},
        unitPrice: 0
      },
      difficulty: 87860,
      genesis: "0x711ce9865492659977abb2758d29f68c2b0c82862d9376f25953579f64f95b58",
      head: "0x0d4b130731f1e7560e4531ac73d55ac8c6daccb178abd86af0d96b7aafded7c5",
      network: 1
    }
  }
}
```

## subbridge_addPeer <a id="subbridge_addPeer"></a>

Trả về `true` nếu thêm thành công một máy ngang hàng cầu nối chính.

Phương thức `addPeer` thêm một nút từ xa mới vào danh sách máy ngang hàng.
Nút đó sẽ cố gắng duy trì kết nối liên tục với các nút này, thỉnh thoảng kết nối lại nếu kết nối từ xa gặp sự cố.
once in a while if the remote connection goes down.

Phương thức này chấp nhận một đối số duy nhất, URL `kni` của máy ngang hàng từ xa để bắt đầu theo dõi và trả về `BOOL` cho biết máy ngang hàng đó có được chấp nhận hay không để theo dõi hoặc thông báo một số lỗi xảy ra.
for tracking or some error occurred.

**Tham số**

| Tên | Loại | Mô tả                         |
| --- | ----- | ----------------------------- |
| url | chuỗi | URL `kni` của máy ngang hàng. |

**Giá trị trả về**

| Loại | Mô tả                                                              |
| ----- | ------------------------------------------------------------------ |
| bool  | `true` nếu máy ngang hàng được chấp nhận, ngược lại sẽ là `false`. |

**Ví dụ**

Bảng điều khiển

```javascript
> mainbridge.addPeer("kni://a979fb...1163c@10.0.0.1:50505") // or 'subbridge.addPeer'
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"mainbridge_addPeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:50505"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## subbridge_removePeer <a id="subbridge_removePeer"></a>

Trả về `true` khi máy ngang hàng được xóa thành công.

Phương thức `removePeer` ngắt kết nối và xóa nút từ xa trong danh sách các nút tĩnh được theo dõi.
Phương thức này chấp nhận một đối số duy nhất, URL `kni` của máy ngang hàng từ xa để bắt đầu theo dõi và trả về `BOOL` cho biết máy ngang hàng đó có được chấp nhận hay không để theo dõi hoặc thông báo một số lỗi xảy ra.
for tracking or some error occurred.

**Tham số**

| Tên | Loại | Mô tả                         |
| --- | ----- | ----------------------------- |
| url | chuỗi | URL `kni` của máy ngang hàng. |

**Giá trị trả về**

| Loại | Mô tả                                                         |
| ----- | ------------------------------------------------------------- |
| bool  | `true` nếu máy ngang hàng đã bị xóa, ngược lại sẽ là `false`. |

**Ví dụ**

Bảng điều khiển

```javascript
> mainbridge.removePeer("kni://a979fb...1163c@10.0.0.1:50505") // or 'subbridge.removePeer'
true
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"mainbridge_removePeer","params":["kni://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@10.0.0.1:50505"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
```

## subbridge_parentOperator <a id="subbridge_parentOperator"></a>

`subbridge_parentOperator` trả về địa chỉ tài khoản của toán tử mẹ.

**Tham số**

không có

**Giá trị trả về**

| Loại     | Mô tả                               |
| --------- | ----------------------------------- |
| Tài khoản | Địa chỉ tài khoản toán tử chuỗi mẹ. |

**Ví dụ**

```javascript
> subbridge.parentOperator
"0xA057995175B93Ee0D1bdfA54f078Ad0F0116130b"
```

## subbridge_childOperator <a id="subbridge_childOperator"></a>

`subbridge_childOperator` trả về địa chỉ tài khoản toán tử con.

**Tham số**

không có

**Giá trị trả về**

| type      | Mô tả                                |
| --------- | ------------------------------------ |
| Tài khoản | Địa chỉ tài khoản toán tử chuỗi con. |

**Ví dụ**

```javascript
> subbridge.childOperator
"0x5C1C757a6Cb6c6FcEFE398674D8209FDA2A74Df4"
```

## subbridge_parentOperatorNonce <a id="subbridge_parentOperatorNonce"></a>

`subbridge_parentOperatorNonce` trả về số dùng một lần của địa chỉ tài khoản toán tử mẹ.

**Tham số**

không có

**Giá trị trả về**

| Loại    | Mô tả                                                               |
| -------- | ------------------------------------------------------------------- |
| SỐ LƯỢNG | Số lượng giao dịch bằng số nguyên được gửi từ tài khoản toán tử mẹ. |

**Ví dụ**

```javascript
> subbridge.parentOperatorNonce
1348
```

## subbridge_childOperatorNonce <a id="subbridge_childOperatorNonce"></a>

`subbridge_childOperator` trả về địa chỉ tài khoản toán tử con.

**Tham số**

không có

**Giá trị trả về**

| Loại    | Mô tả                                                                |
| -------- | -------------------------------------------------------------------- |
| SỐ LƯỢNG | Số lượng giao dịch bằng số nguyên được gửi từ tài khoản toán tử con. |

**Ví dụ**

```javascript
> subbridge.childOperatorNonce
1024
```

## subbridge_parentOperatorBalance <a id="subbridge_parentOperatorBalance"></a>

`subbridge_parentOperatorBalance` trả về số dư của tài khoản toán tử mẹ.

**Tham số**

không có

**Giá trị trả về**

| Loại    | Mô tả                                                   |
| -------- | ------------------------------------------------------- |
| SỐ LƯỢNG | Số dư hiện tại bằng số nguyên của tài khoản toán tử mẹ. |

**Ví dụ**

```javascript
> subbridge.parentOperatorBalance
1e+50
```

## subbridge_childOperatorBalance <a id="subbridge_childOperatorBalance"></a>

`subbridge_childOperatorBalance` trả về số dư của tài khoản toán tử con.

**Tham số**

không có

**Giá trị trả về**

| Loại    | Mô tả                                                    |
| -------- | -------------------------------------------------------- |
| SỐ LƯỢNG | Số dư hiện tại bằng số nguyên của tài khoản toán tử con. |

**Ví dụ**

```javascript
> subbridge.childOperatorBalance
1e+50
```

## subbridge_sendChainTxslimit <a id="subbridge_sendChainTxslimit"></a>

`sendChainTxslimit` lấy số lượng giao dịch đang chờ xử lý tối đa để gửi đồng thời.

**Tham số**

Không có

**Giá trị trả về**

| Loại  | Mô tả                                                      |
| ------ | ---------------------------------------------------------- |
| Uint64 | số lượng giao dịch đang chờ xử lý tối đa để gửi đồng thời. |

**Ví dụ**

```javascript
> subbridge.sendChainTxslimit
100
```

## subbridge_anchoring <a id="subbridge_anchoring"></a>

`subbridge_anchoring` có thể bật/tắt tính năng neo của chuỗi dịch vụ.

**Tham số**

| Tên | type | Mô tả                                                   |
| --- | ---- | ------------------------------------------------------- |
| bật | Bool | `true` bật tính năng neo, `false` sẽ tắt tính năng này. |

**Giá trị trả về**

| Loại | Mô tả                                             |
| ----- | ------------------------------------------------- |
| bool  | `true` nếu neo được bật, ngược lại sẽ là `false`. |

**Ví dụ**

Bảng điều khiển

```javascript
> subbridge.anchoring(true)
true
> subbridge.anchoring(false)
false
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"subbridge_anchoring","params":[true],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":true}
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"subbridge_anchoring","params":[false],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":false}
```

## subbridge_latestAnchoredBlockNumber <a id="subbridge_latestAnchoredBlockNumber"></a>

`subbridge_latestAnchoredBlockNumber` trả về số khối được neo latest của chuỗi dịch vụ.

**Tham số**

Không có

**Giá trị trả về**

| Loại  | Mô tả               |
| ------ | ------------------- |
| Uint64 | Số khối neo latest. |

**Ví dụ**

```javascript
> subbridge.latestAnchoredBlockNumber
71025
```

## subbridge_getReceiptFromParentChain <a id="subbridge_getReceiptFromParentChain"></a>

`subbridge_getReceiptFromParentChain` trả về biên lai của giao dịch neo.

**Tham số**

| Loại           | Mô tả                                               |
| --------------- | --------------------------------------------------- |
| DỮ LIỆU 32 byte | Hàm băm khối chuỗi con được bao gồm hàm băm tx neo. |

**Giá trị trả về**

`Đối tượng` - Đối tượng biên lai giao dịch, hoặc `null` khi không tìm thấy biên lai.

| Tên             | type             | Mô tả                                                                                                                                         |
| --------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| contractAddress | DATA             | Địa chỉ hợp đồng được tạo nếu giao dịch là giao dịch tạo hợp đồng, nếu không, giá trị sẽ là `null`. (sẽ sớm ngừng sử dụng) |
| gasUsed         | SỐ LƯỢNG         | Lượng gas được sử dụng bởi riêng giao dịch cụ thể này.                                                                                        |
| bản ghi         | Mảng             | Mảng đối tượng bản ghi mà giao dịch này tạo ra.                                                                                               |
| nhật kýBloom    | DỮ LIỆU 256 byte | Bộ lọc Bloom dành cho các ứng dụng khách nhẹ giúp truy xuất nhanh các nhật ký liên quan.                                                      |
| trạng thái      | SỐ LƯỢNG         | `1` (thành công) hoặc `0` (thất bại).                                                                   |
| transactionHash | DỮ LIỆU 32 byte  | Hàm băm của giao dịch.                                                                                                                        |

**Ví dụ**

```javascript
> subbridge.getReceiptFromParentChain("0x4f300d6574e71d7940c88fe08f27d9ac45cbc7b81d45c17e848d3772f64377b5")
{
  contractAddress: "0x0000000000000000000000000000000000000000",
  gasUsed: "0x9470",
  logs: [],
  logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  status: "0x1",
  transactionHash: "0x3641f52359f44ef2a9941ea840aed4befbace5cac28d5cc8cacd94eae211fd1e"
}
```

## subbridge_deployBridge <a id="subbridge_deployBridge"></a>

`subbridge_deployBridge` triển khai hợp đồng cầu nối cho chuỗi mẹ và chuỗi con đồng thời trả về địa chỉ của các hợp đồng cầu nối đã triển khai. Phương thức này cũng đăng ký hợp đồng cầu nối với cầu nối con.

**Tham số**

không có

**Giá trị trả về**

| Tên       | type            | Mô tả                                    |
| --------- | --------------- | ---------------------------------------- |
| tài khoản | DỮ LIỆU 20 byte | Địa chỉ hợp đồng cầu nối trên chuỗi con. |
| tài khoản | DỮ LIỆU 20 byte | Địa chỉ hợp đồng cầu nối trên chuỗi mẹ.  |

**Ví dụ**

```javascript
> subbridge.deployBridge()
["0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4"]
```

## subbridge_registerBridge <a id="subbridge_registerBridge"></a>

`subbridge_registerBridge` đăng ký đã triển khai các hợp đồng cầu nối trong chuỗi mẹ và chuỗi con.

**Tham số**

| Tên       | Loại           | Mô tả                                    |
| --------- | --------------- | ---------------------------------------- |
| tài khoản | DỮ LIỆU 20 byte | Địa chỉ hợp đồng cầu nối trên chuỗi con. |
| tài khoản | DỮ LIỆU 20 byte | Địa chỉ hợp đồng cầu nối trên chuỗi mẹ.  |

**Giá trị trả về**

| Tên | type | Mô tả                                                |
| --- | ---- | ---------------------------------------------------- |
| lỗi | Lỗi  | `null` nếu đăng ký thành công, ngược lại sẽ báo Lỗi. |

**Ví dụ**

```javascript
> subbridge.registerBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null

> subbridge.registerBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
Error: bridge already exists
```

## subbridge_deregisterBridge <a id="subbridge_deregisterBridge"></a>

`subbridge.deregisterBridge` hủy đăng ký các hợp đồng cầu nối đã đăng ký trong chuỗi mẹ/chuỗi con.

**Tham số**

| Tên       | Loại           | Mô tả                                    |
| --------- | --------------- | ---------------------------------------- |
| tài khoản | DỮ LIỆU 20 byte | Địa chỉ hợp đồng cầu nối trên chuỗi con. |
| tài khoản | DỮ LIỆU 20 byte | Địa chỉ hợp đồng cầu nối trên chuỗi mẹ.  |

**Giá trị trả về**

| Tên | type | Mô tả                                                    |
| --- | ---- | -------------------------------------------------------- |
| lỗi | Lỗi  | `null` nếu hủy đăng ký thành công, ngược lại sẽ báo Lỗi. |

**Ví dụ**

```javascript
> subbridge.deregisterBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null

> subbridge.deregisterBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
Error: invalid bridge pair
```

## subbridge_subscribeBridge <a id="subbridge_subscribeBridge"></a>

`subbridge_subscribeBridge` đăng ký hợp đồng cầu nối đã đăng ký trong chuỗi mẹ và chuỗi con.
Nếu nút cầu nối con được đăng ký với cặp hợp đồng cầu nối, thì các yêu cầu chuyển giá trị chuỗi chéo sẽ được cầu nối con xử lý tự động.

**Tham số**

| Tên       | Loại           | Mô tả                                    |
| --------- | --------------- | ---------------------------------------- |
| tài khoản | DỮ LIỆU 20 byte | Địa chỉ hợp đồng cầu nối trên chuỗi con. |
| tài khoản | DỮ LIỆU 20 byte | Địa chỉ hợp đồng cầu nối trên chuỗi mẹ.  |

**Giá trị trả về**

| Tên | type | Mô tả                                                |
| --- | ---- | ---------------------------------------------------- |
| lỗi | Lỗi  | `null` nếu đăng ký thành công, ngược lại sẽ báo Lỗi. |

**Ví dụ**

```javascript
> subbridge.subscribeBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null
> subbridge.subscribeBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
Error: already subscribed
```

## subbridge_unsubscribeBridge <a id="subbridge_unsubscribeBridge"></a>

`subbridge_unsubscribeBridge` hủy đăng ký cầu nối con khỏi hợp đồng cầu nối trong chuỗi mẹ và chuỗi con.
Nếu cầu nối con bị hủy đăng ký khỏi các hợp đồng cầu nối thì cầu nối con này không thể xử lý các yêu cầu chuyển giá trị chuỗi chéo.

**Tham số**

| Tên       | type            | Mô tả                                    |
| --------- | --------------- | ---------------------------------------- |
| tài khoản | DỮ LIỆU 20 byte | Địa chỉ hợp đồng cầu nối trên chuỗi con. |
| tài khoản | DỮ LIỆU 20 byte | Địa chỉ hợp đồng cầu nối trên chuỗi mẹ.  |

**Giá trị trả về**

| Tên | Loại | Mô tả                                                     |
| --- | ----- | --------------------------------------------------------- |
| lỗi | Lỗi   | `null` nếu hủy theo dõi thành công, ngược lại sẽ báo Lỗi. |

**Ví dụ**

```javascript
> subbridge.unsubscribeBridge("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4")
null
```

## subbridge_registerToken <a id="subbridge_registerToken"></a>

`subbridge_registerToken` đăng ký một cặp token ERC-20 hoặc 721 với hợp đồng cầu nối.

**Tham số**

| Tên       | type            | Mô tả                                      |
| --------- | --------------- | ------------------------------------------ |
| tài khoản | DỮ LIỆU 20 byte | Địa chỉ hợp đồng cầu nối trên chuỗi con.   |
| tài khoản | DỮ LIỆU 20 byte | Địa chỉ hợp đồng cầu nối trên chuỗi mẹ.    |
| tài khoản | DỮ LIỆU 20 byte | Địa chỉ của hợp đồng token trên chuỗi con. |
| tài khoản | DỮ LIỆU 20 byte | Địa chỉ của hợp đồng token trên chuỗi mẹ.  |

**Giá trị trả về**

| Tên | Loại | Mô tả                                                |
| --- | ----- | ---------------------------------------------------- |
| lỗi | Lỗi   | `null` nếu đăng ký thành công, ngược lại sẽ báo Lỗi. |

**Ví dụ**

```javascript
> subbridge.registerToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
null
> subbridge.registerToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
Error: token already exists
```

## subbridge_deregisterToken <a id="subbridge_deregisterToken"></a>

`subbridge_deregisterBridge` hủy đăng ký cặp token đã đăng ký khỏi hợp đồng cầu nối.

**Tham số**

| Tên       | Loại           | Mô tả                                      |
| --------- | --------------- | ------------------------------------------ |
| tài khoản | DỮ LIỆU 20 byte | Địa chỉ hợp đồng cầu nối trên chuỗi con.   |
| tài khoản | DỮ LIỆU 20 byte | Địa chỉ hợp đồng cầu nối trên chuỗi mẹ.    |
| tài khoản | DỮ LIỆU 20 byte | Địa chỉ của hợp đồng token trên chuỗi con. |
| tài khoản | DỮ LIỆU 20 byte | Địa chỉ của hợp đồng token trên chuỗi mẹ.  |

**Giá trị trả về**

| Tên | type | Mô tả                                                    |
| --- | ---- | -------------------------------------------------------- |
| lỗi | Lỗi  | `null` nếu hủy đăng ký thành công, ngược lại sẽ báo Lỗi. |

**Ví dụ**

```javascript
> subbridge.deregisterToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
null
> subbridge.deregisterToken("0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a", "0x23dab942822021bbd6d551ef51003208924877e4","0xA4b0c6e12346426a09FaD70dAE0651E6Dbdd5198","0x865Cca53828C91663BFf0Ca9808827Bac552BAec")
Error: invalid token pair
```

## subbridge_convertRequestTxHashToHandleTxHash <a id="subbridge_convertRequestTxHashToHandleTxHash"></a>

`subbridge_convertRequestTxHashToHandleTxHash` trả về hàm băm "xử lý giao dịch chuyển giá trị" tương ứng trong chuỗi đối nghịch cho hàm băm "giao dịch chuyển giá trị yêu cầu" cụ thể.
"Yêu cầu giao dịch chuyển giá trị" là giao dịch do người dùng bắt đầu, yêu cầu chuyển giá trị chuỗi chéo.
"Xử lý giao dịch chuyển giá trị" là giao dịch được tạo bởi cầu nối con để xử lý yêu cầu chuyển giá trị từ người dùng.

**Tham số**

| Tên  | Loại           | Mô tả                                           |
| ---- | --------------- | ----------------------------------------------- |
| Hash | DỮ LIỆU 32 byte | Hàm băm của giao dịch "yêu cầu chuyển giá trị". |

**Giá trị trả về**

| Tên  | Loại           | Mô tả                                                                                                                             |
| ---- | --------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Hash | DỮ LIỆU 32 byte | Hàm băm của giao dịch "xử lý chuyển giá trị". hàm băm bằng không có nghĩa là không có giao dịch "xử lý chuyển giá trị" tương ứng. |

**Ví dụ**

```javascript
> subbridge.convertRequestTxHashToHandleTxHash("0xae5604f8673098436ee4eaf1b453f1a395afccd6e8eb674c60edd63ebb047622")
"0x97493d1a91d65c149763209be6535efdacf8f1b50c99daa22abf06502010b2ee"
> subbridge.convertRequestTxHashToHandleTxHash("0xc585cfd1e7047b4faae69e62e77db192d8a339701b40d6ab4adb58453b934bec")
"0x0000000000000000000000000000000000000000000000000000000000000000"
```

## subbridge_listBridge <a id="subbridge_listBridge"></a>

`subbridge_listBridge` trả về danh sách tất cả các cặp hợp đồng cầu được đăng ký (lưu trữ) trong cầu nối con.

**Tham số**

số dùng một lần

**Giá trị trả về**

| Tên          | Loại     | Mô tả                                                                     |                                                                           |
| ------------ | --------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| localAddress | tài khoản | DỮ LIỆU 20 byte                                                           | Địa chỉ của hợp đồng cầu nối trên chuỗi (dịch vụ) con. |
| localAddress | tài khoản | DỮ LIỆU 20 byte                                                           | Địa chỉ của hợp đồng cầu nối trên chuỗi (chính) mẹ.    |
| đã đăng ký   | bool      | `true` nếu cặp hợp đồng cầu nối đã được đăng ký, ngược lại sẽ là `false`. |                                                                           |

**Ví dụ**

```javascript
> subbridge.listBridge
[{
    localAddress: "0x27caeba831d98b5fbb1d81ce0ed20801702f443a",
    remoteAddress: "0x22c41ae528627b790233d2e59ea520be12350eb5",
    subscribed: true
}, {
    localAddress: "0x376b72abe1b29cace831bd3f5acdfa967814c9cd",
    remoteAddress: "0x53160735f7cc6ff75e48619f368bb94daff66a1b",
    subscribed: false
}, {
    localAddress: "0x87d6b9c567e5b84cd00e03bfbe6d20d88209c33a",
    remoteAddress: "0x23dab942822021bbd6d551ef51003208924877e4",
    subscribed: false
}]
```

## subbridge_getBridgeInformation <a id="subbridge_getBridgeInformation"></a>

`subbridge_getBridgeInformation` trả về thông tin của hợp đồng cầu nối đã cho.

**Tham số**

| Tên       | Loại           | Mô tả                    |
| --------- | --------------- | ------------------------ |
| tài khoản | DỮ LIỆU 20 byte | Địa chỉ hợp đồng cầu nối |

**Giá trị trả về**

| Tên              | Loại           | Mô tả                                                                                                                  |
| ---------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| counterPart      | DỮ LIỆU 20 byte | Địa chỉ hợp đồng cầu nối đối ứng. (Chưa được hỗ trợ)                                                |
| isRunning        | bool            | `true` nếu hợp đồng cầu nối đang chạy, ngược lại sẽ là `false`.                                                        |
| isSubscribed     | bool            | `true` nếu hợp đồng cầu nối đã được đăng ký, ngược lại sẽ là `false`.                                                  |
| onServiceChain   | bool            | `true` nếu hợp đồng cầu nối nằm trên chuỗi (dịch vụ) con, ngược lại sẽ là `false`.                  |
| pendingEventSize | SỐ LƯỢNG        | Số sự kiện "yêu cầu chuyển giá trị" đang chờ xử lý được tạo bởi các hợp đồng cầu nối, chưa được xử lý bởi cầu nối con. |
| requestNonce     | SỐ LƯỢNG        | Yêu cầu số dùng một lần của hợp đồng cầu nối.                                                                          |
| handleNonce      | SỐ LƯỢNG        | Số dùng một lần trên của hợp đồng cầu nối.                                                                             |
| lowerHandleNonce | SỐ LƯỢNG        | Số dùng một lần dưới của hợp đồng cầu nối.                                                                             |

**Ví dụ**

```javascript
> subbridge.getBridgeInformation("0x27caeba831d98b5fbb1d81ce0ed20801702f443a")
{
  counterPart: "0x0000000000000000000000000000000000000000",
  handleNonce: 0,
  lowerHandleNonce: 0,
  isRunning: true,
  isSubscribed: true,
  onServiceChain: true,
  pendingEventSize: 0,
  requestNonce: 0
}
```

## subbridge_txPendingCount <a id="subbridge_txPendingCount"></a>

`subbridge_txPendingCount` trả về số lượng giao dịch đang chờ xử lý trong bể giao dịch cầu nối.

**Tham số**

Không có

**Giá trị trả về**

| Loại  | Mô tả                                                         |
| ------ | ------------------------------------------------------------- |
| Uint64 | Số lượng giao dịch đang chờ xử lý trong bể giao dịch cầu nối. |

**Ví dụ**

```javascript
> subbridge.txPendingCount
2
```

## subbridge_txPending <a id="subbridge_txPending"></a>

`subbridge_txPending` trả về danh sách các giao dịch đang chờ xử lý trong bể giao dịch cầu nối.

**Tham số**

Không có

**Giá trị trả về**

| type       | Mô tả                                                              |
| ---------- | ------------------------------------------------------------------ |
| Chuỗi JSON | Danh sách các giao dịch đang chờ xử lý trong bể giao dịch cầu nối. |

**Ví dụ**

```javascript
> subbridge.txPending
{
  0xa057995175b93ee0d1bdfa54f078ad0f0116130b: [{
      from: "0xa057995175b93ee0d1bdfa54f078ad0f0116130b",
      gas: "0x186a0",
      gasPrice: "0x5d21dba00",
      hash: "0x284c8f5bc82ef987c3a14fc8dac7933beb528777745987ff790014441f26ca03",
      input: "0xf8a9a063f41a6ec8e2f8074c30fccf11f2b8479e7ebd8a0e5aa0c171623bc1f3812e33a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a0f845557d8dc2175974f29c2e9d12b1a57f634acaafdf56ae7033201a0796bedea056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a09109530b191b47ca3d91012faba70fcf307f13b030f19d932cab38f2c1ece7b78304157c",
      nonce: "0x41589",
      signatures: [{...}],
      type: "TxTypeChainDataAnchoring",
      typeInt: 72
  }, {
      from: "0xa057995175b93ee0d1bdfa54f078ad0f0116130b",
      gas: "0x186a0",
      gasPrice: "0x5d21dba00",
      hash: "0x4dd093916a419608091da28b5d7ffc6e34d894ddaac96328f1904bfef93a4ad0",
      input: "0xf8a9a05b0dd6cc938916e37b17b602690399987b4e8540a14a494626d85e947f721a10a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a063f41a6ec8e2f8074c30fccf11f2b8479e7ebd8a0e5aa0c171623bc1f3812e33a056e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421a09109530b191b47ca3d91012faba70fcf307f13b030f19d932cab38f2c1ece7b78304157d",
      nonce: "0x4158a",
      signatures: [{...}],
      type: "TxTypeChainDataAnchoring",
      typeInt: 72
  }]
}
```
