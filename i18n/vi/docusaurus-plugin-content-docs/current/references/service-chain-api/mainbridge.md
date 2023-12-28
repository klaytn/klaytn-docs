---
description: >-
  API liên quan đến EN chuỗi chính được kết nối với chuỗi dịch vụ.
---

# Không gian tên mainbridge

Không gian tên `mainbridge` cung cấp các hàm liên quan đến Chuỗi Dịch vụ. Để sử dụng các hàm trong không gian tên này, tùy chọn `cầu nối chính` phải được kích hoạt trong EN được kết nối với chuỗi chính (Mạng chính hoặc mạng thử nghiệm Baobab).

## mainbridge_nodeInfo <a id="mainbridge_nodeInfo"></a>

Trả về thông tin nút cầu nối bao gồm KNI (Mã định danh mạng lưới Klaytn) ​​của nút. Một nút cầu nối chính có thể kết nối với một nút cầu nối con thông qua KNI.

**Tham số**

Không có

**Giá trị trả về**

| Loại      | Mô tả                  |
| ---------- | ---------------------- |
| Chuỗi JSON | thông tin nút cầu nối. |

**Ví dụ**

```javascript
> mainbridge.nodeInfo
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

## mainbridge_addPeer  <a id="mainbridge_addPeer"></a>
Trả về `true` nếu thêm thành công một máy ngang hàng cầu nối con.

Nó sẽ thêm một nút từ xa mới vào danh sách máy ngang hàng. Nút đó sẽ cố gắng duy trì kết nối liên tục với các nút này, thỉnh thoảng kết nối lại nếu kết nối từ xa gặp sự cố. Phương thức này chấp nhận một đối số duy nhất, URL `kni` của máy ngang hàng từ xa để bắt đầu theo dõi và trả về `BOOL` cho biết máy ngang hàng đó có được chấp nhận hay không để theo dõi hoặc thông báo một số lỗi xảy ra.

**Tham số**

| Tên | Loại | Mô tả                         |
| --- | ----- | ----------------------------- |
| url | chuỗi | URL `kni` của máy ngang hàng. |

**Giá trị trả về**

| Loại | Mô tả                                                              |
| ----- | ------------------------------------------------------------------ |
| bool  | `true` nếu máy ngang hàng được chấp nhận, ngược lại sẽ là `false`. |

**Ví dụ**

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

## mainbridge_removePeer <a id="mainbridge_removePeer"></a>
Trả về `true` khi máy ngang hàng được xóa thành công.

Phương thức `removePeer` ngắt kết nối và xóa nút từ xa trong danh sách các nút tĩnh được theo dõi. Phương thức này chấp nhận một đối số duy nhất, URL `kni` của máy ngang hàng từ xa để bắt đầu theo dõi và trả về `BOOL` cho biết máy ngang hàng đó có được chấp nhận hay không để theo dõi hoặc thông báo một số lỗi xảy ra.

**Tham số**

| Tên | Loại | Mô tả                         |
| --- | ----- | ----------------------------- |
| url | chuỗi | URL `kni` của máy ngang hàng. |

**Giá trị trả về**

| Loại | Mô tả                                                         |
| ----- | ------------------------------------------------------------- |
| bool  | `true` nếu máy ngang hàng đã bị xóa, ngược lại sẽ là `false`. |

**Ví dụ**

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

## mainbridge_getChildChainIndexingEnabled <a id="mainbridge_getChildChainIndexingEnabled"></a>

`mainbridge_getChildChainIndexingEnabled` trả về nếu giao dịch neo chỉ mục được kích hoạt hay không.

**Tham số**

không có

**Giá trị trả về**

| Loại | Mô tả                                                                     |
| ----- | ------------------------------------------------------------------------- |
| bool  | `true` nếu tính năng lập chỉ mục được kích hoạt, ngược lại sẽ là `false`. |

**Ví dụ**

```javascript
> mainbridge.getChildChainIndexingEnabled()
true
```

## mainbridge_convertChildChainBlockHashToParentChainTxHash <a id="mainbridge_convertChildChainBlockHashToParentChainTxHash"></a>

Trả về hàm băm giao dịch neo của hàm băm khối chuỗi con đã cho.

**Tham số**

| type            | Mô tả                   |
| --------------- | ----------------------- |
| DỮ LIỆU 32 byte | Hàm băm khối chuỗi con. |

**Giá trị trả về**

| Loại           | Mô tả                                                   |
| --------------- | ------------------------------------------------------- |
| DỮ LIỆU 32 byte | Hàm băm giao dịch neo bao gồm thông tin khối chuỗi con. |

**Ví dụ**

Bảng điều khiển

```javascript
> mainbridge.convertChildChainBlockHashToParentChainTxHash("0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a4f2792aac8a6e0d1880")
"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"
```

HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"mainbridge_convertChildChainBlockHashToParentChainTxHash","params":["0xeadc6a3a29a20c13824b5df1ba05cca1ed248d046382a4f2792aac8a6e0d1880"],"id":1}' https://public-en-baobab.klaytn.net
{"jsonrpc":"2.0","id":1,"result":"0x9a68591c0faa138707a90a7506840c562328aeb7621ac0561467c371b0322d51"}
```

