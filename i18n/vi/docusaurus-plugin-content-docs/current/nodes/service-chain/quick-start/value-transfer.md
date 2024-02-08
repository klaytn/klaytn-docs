# Chuyển giá trị xuyên chuỗi

Phần này sẽ giải thích cách bật tính năng chuyển giá trị ERC-20 giữa mạng lưới Baobab và ServiceChain của bạn bằng mã thử nghiệm được cung cấp.
Bạn sẽ thêm KLAY vào tài khoản người vận hành và triển khai các hợp đồng cầu nối và ERC-20.
Sau đó, bạn sẽ đăng ký địa chỉ hợp đồng trên SCN. Bạn sẽ thử chuyển giá trị ERC-20.

## Điều kiện tiên quyết <a id="prerequisites"></a>

- Giả định rằng bạn đã cài đặt ServiceChain và kết nối ServiceChain với EN Baobab theo hướng dẫn trong [Kết nối với Baobab](en-scn-connection.md).
- Sao chép kho lưu trữ [servicechain-value-transfer-examples](https://github.com/klaytn/servicechain-value-transfer-examples).
- Cài đặt `Node.js` (v14) và `npm` ([Cách cài đặt](https://nodejs.org/en/download/package-manager/))
  - Ví dụ này sử dụng hai gói, axios và caver-js.

## Cả hai gói này đều hỗ trợ v14.

### Chuyển token ERC-20 (một bước) <a id="erc-20-token-transfer-onestep"></a> Bước 1: Thêm KLAY vào tài khoản người vận hành.

<a id="step-1-add-klay-to-the-operator-accounts"></a>

```
$ kscn attach --datadir ~/data
> subbridge.childOperator
"0x10221f7f9355017cd0c11444e7eecb99621bacce"
> subbridge.parentOperator
"0x3ce216beeafc62d20547376396e89528e1d778ca"
```

![](/img/nodes/sc-vt-add-klay.png)

Kết nối với SCN và kiểm tra địa chỉ tài khoản bằng cách thực thi `subbridge.parentOperator` và `subbridge.childOperator`. `subbridge.parentOperator` và `subbridge.childOperator` phải có đủ KLAY để gửi giao dịch.
Lưu ý rằng `subbridge.parentOperator` là tài khoản trên mạng lưới Baobab và `subbridge.childOperator` là tài khoản trên mạng lưới ServiceChain. Tạo tài khoản thử nghiệm trên [Ví Baobab](https://baobab.wallet.klaytn.foundation/) và lấy KLAY để thử từ vòi. Sau đó, gửi một số KLAY đến `parentOperator`.

```
$ kscn account import ~/homi-output/keys_test/testkey1
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {80119c31cdae67c42c8296929bb4f89b2a52cec4}
```

```
$ kscn attach --datadir ~/data
> personal.unlockAccount("80119c31cdae67c42c8296929bb4f89b2a52cec4")
Unlock account 80119c31cdae67c42c8296929bb4f89b2a52cec4
Passphrase:
True
> klay.sendTransaction({from:"80119c31cdae67c42c8296929bb4f89b2a52cec4", to:subbridge.childOperator, value: web3.toPeb(1000, "KLAY")})
"0x84caab84ebf0c4bb4ecf0a7849f1de3e479f1863a95f70c51047a7ca7bc64b33"
```

`childOperator` phải lấy KLAY từ tài khoản thử nghiệm do `homi` tạo ([Tham khảo Hướng dẫn thiết lập EN và kết nối SCN](en-scn-connection.md)). Kiểm tra xem các tài khoản của người vận hành có đủ số dư không.

```
> klay.getBalance(subbridge.childOperator)
1e+21
> subbridge.childOperatorBalance
1e+21
> subbridge.parentOperatorBalance
1e+18
```

### Bạn có thể truy vấn từ bảng điều khiển của nút SCN nơi cài đặt cầu nối con như sau:

- Bước 2: Triển khai hợp đồng <a id="step-2-deploy-contracts"></a>
  Kết nối với SCN và chuẩn bị môi trường nút để triển khai hợp đồng.

![](/img/nodes/sc-vt-deploy.png)

Sao chép kho lưu trữ [servicechain-value-transfer-examples](https://github.com/klaytn/servicechain-value-transfer-examples).
Trong bước này, chúng ta sẽ triển khai cả hợp đồng cầu nối và hợp đồng token trong chuỗi mẹ cũng như chuỗi con.

```bash
$ git clone https://github.com/klaytn/servicechain-value-transfer-examples
$ cd servicechain-value-transfer-examples
$ npm install
$ cd erc20
```

Hợp đồng token dành cho việc thử nghiệm tạo/chuyển và hợp đồng cầu nối được sử dụng để lắng nghe/xử lý các yêu cầu chuyển giá trị.

- Trên trình chỉnh sửa văn bản, hãy chỉnh sửa `bridge_info.json` như bên dưới.
- Thay thế `url` trong phần `child` (nút SCN trên mạng lưới ServiceChain) bằng IP nút SCN của bạn và số cổng thích hợp từ `RPC_PORT` trong ` kscnd.conf`.
- Thay thế `child.key` bằng `testkey1` được tạo bởi `homi`.
- Đặt `child.operator` thành địa chỉ `subbridge.childOperator` đã kiểm tra ở bước trước.
- Thay thế `url` trong phần `parent` (nút EN trên mạng lưới Baobab) bằng IP nút EN của bạn và số cổng thích hợp từ `RPC_PORT` trong ` kend.conf`.
- Thay thế `parent.key` bằng khóa riêng tư của tài khoản thử nghiệm được tạo từ [Ví Baobab](https://baobab.wallet.klaytn.foundation/) ở bước trước.

```
{
     "child" : {
         "url": "http://192.168.0.1:7551",
         "key": "0x66cb283353589a10866b58d388e9d956e5a9c873a8c78fa4411d460c19c494ea",
         "operator": "0x10221f7f9355017cd0c11444e7eecb99621bacce"
     },
     "parent" : {
         "url": "http://192.168.0.5:8551",
         "key": "0x26f4b5ac42ceabcfd3b23a991fdbfc792d10ce700a99582fdf9185a8f163b790",
         "operator": "0x3ce216beeafc62d20547376396e89528e1d778ca"
     }
 }
```

Đặt `parent.operator` làm `subbridge.parentOperator` trong bước trước đó. Thực hiện triển khai token bằng cách chạy lệnh `node erc20-deploy.js`.

```
$ node erc20-deploy.js
------------------------- erc20-deploy START -------------------------
> info.bridge: 0xEa024d8101E112330f2d7B1a7e7932034E206721
> info.token: 0xbE641028610F628835C36F12bE62d54d74308D70
> info.bridge: 0xA5af6Ffe13b367626B5AdF827DdE7438E3Db4463
> info.token: 0x52F8Fa79Fa6D37b18b7AC8f9Ca835373f3C9270f
> subbridge.registerBridge("0xEa024d8101E112330f2d7B1a7e7932034E206721", "0xA5af6Ffe13b367626B5AdF827DdE7438E3Db4463")
> subbridge.subscribeBridge("0xEa024d8101E112330f2d7B1a7e7932034E206721", "0xA5af6Ffe13b367626B5AdF827DdE7438E3Db4463")
> subbridge.registerToken("0xEa024d8101E112330f2d7B1a7e7932034E206721", "0xA5af6Ffe13b367626B5AdF827DdE7438E3Db4463", "0xbE641028610F628835C36F12bE62d54d74308D70", "0x52F8Fa79Fa6D37b18b7AC8f9Ca835373f3C9270f")
------------------------- erc20-deploy END -------------------------
```

### Tập lệnh này triển khai cả hợp đồng cầu nối và hợp đồng token, đồng thời xuất ra sử dụng API để khởi tạo cặp cầu nối.

![](/img/nodes/sc-vt-transfer.png)

Bước 3: Chuyển token <a id="step-3-token-transfer"></a> Thực hiện chuyển token bằng lệnh `node erc20-transfer-1step.js`. Quá trình chuyển token một bước này yêu cầu sửa đổi việc triển khai token ERC-20.

```
$ node erc20-transfer-1step.js
------------------------- erc20-transfer-1step START -------------------------
alice balance: 0
requestValueTransfer..
alice balance: 100
------------------------- erc20-transfer-1step END -------------------------
```

Nếu bạn không muốn sửa đổi hợp đồng token hoặc bạn đã triển khai hợp đồng token khác, vui lòng tham khảo [Chuyển token ERC-20 (hai bước)](#erc-20-token-transfer-twostep).

## Nếu kết quả là `alice balance: 100` thì việc chuyển token đã được thực thi thành công.

Chuyển token ERC-20 (hai bước) <a id="erc-20-token-transfer-twostep"></a> Chạy erc20-transfer-2step.js để xem ví dụ về chuyển hai bước.
Với ví dụ chuyển token hai bước này, có thể sử dụng hợp đồng token ERC-20 chưa sửa đổi.
Quá trình chuyển hai bước bao gồm hai lệnh gọi hàm: (1) trước tiên hãy phê duyệt hợp đồng cầu nối, rồi (2) gọi hàm hợp đồng `requestERC20Transfer()`. Chúng ta không triển khai hợp đồng trong phần này vì đã triển khai cả hợp đồng cầu nối và hợp đồng token. Bạn phải triển khai trước nếu bạn chưa triển khai chúng.

```
$ node erc20-transfer-2step.js
> ------------------------- erc20-transfer-2step START -------------------------
> alice balance: 100
> requestValueTransfer..
> alice balance: 200
------------------------- erc20-transfer-2step END -------------------------
```

## Bạn có thể triển khai hợp đồng bằng cách sử dụng `node erc20-deploy.js`.

Chuyển token KIP-7 qua giao diện ERC-20 (hai bước) <a id="kip-7-token-transfer-via-erc-20-interface-two-step"></a> [KIP-7](https://kips.klaytn.foundation/KIPs/kip-7) là tiêu chuẩn token tương thích với ERC-20.
Chúng ta có thể gọi hàm `requestERC20Transfer()` cho hợp đồng token KIP-7 để chuyển token KIP-7 giữa chuỗi mẹ và chuỗi con. Trong trường hợp gửi token KIP-7 qua giao diện ERC-20, chúng ta gọi hàm `approve()` để cho phép cầu nối gửi token thay mặt cho người gửi giao dịch.
Sau đó, gọi hàm `requestERC20Transfer()`.

```
$ node kip7-deploy.js
> ------------------------- kip7-deploy START -------------------------
> info.bridge: 0x04e929Cd2A08acd28a210369407D8Ca237Edd8FE
> info.token: 0xE0E2fC6C7d1eB069153E0c12a4C87B01586b39e7
> info.bridge: 0xEb502159A4B4E876B1cb423f250DCC0d276e01b6
> info.token: 0xd4f02Ca1d49674056A9ec78fbBDc9e1e97726A4F
> subbridge.registerBridge("0x04e929Cd2A08acd28a210369407D8Ca237Edd8FE", "0xEb502159A4B4E876B1cb423f250DCC0d276e01b6")
> subbridge.subscribeBridge("0x04e929Cd2A08acd28a210369407D8Ca237Edd8FE", "0xEb502159A4B4E876B1cb423f250DCC0d276e01b6")
> subbridge.registerToken("0x04e929Cd2A08acd28a210369407D8Ca237Edd8FE", "0xEb502159A4B4E876B1cb423f250DCC0d276e01b6", "0xE0E2fC6C7d1eB069153E0c12a4C87B01586b39e7", "0xd4f02Ca1d49674056A9ec78fbBDc9e1e97726A4F")
------------------------- kip7-deploy END -------------------------
```

Lệnh dưới đây triển khai hợp đồng cầu nối và hợp đồng KIP-7.

```
$ node kip7-transfer-2step-erc20-interface.js
> ------------------------- kip7-transfer-2step-erc20-interface START -------------------------
> alice balance: 0
> requestValueTransfer..
> alice balance: 100
> ------------------------- kip7-transfer-2step-erc20-interface END -------------------------
```

Lệnh dưới đây là một ví dụ về việc gửi token KIP-7 bằng giao diện ERC-20 với `requestERC20Transfer()`.

## Vui lòng tham khảo [service-chain-value-transfer-example](https://github.com/klaytn/servicechain-value-transfer-examples) cho các trường hợp khác.

Hỗ trợ riêng cho KIP-7 và KIP-17 (Sẽ được triển khai) <a id="native-support-for-kip-7-and-kip-17-to-be-implemented"></a> Hiện tại, hợp đồng cầu nối do đội ngũ Klaytn cung cấp chỉ hỗ trợ `requestERC20Transfer()` và `requestERC721Transfer()` để chuyển token. Các chức năng yêu cầu tương ứng cho KIP-7 và KIP-17 sẽ sớm được hỗ trợ.

## Trước khi hoàn tất triển khai, như bạn có thể thấy ở trên, bạn có thể chuyển token KIP-7 bằng giao diện ERC-20.

Chuyển giá trị cho ERC-721, KIP-17 và KLAY <a id="value-transfer-for-erc721-kip17-and-klay"></a> Quy trình làm việc cho ERC-721, KIP-17 và KLAY giống như ở trên.
