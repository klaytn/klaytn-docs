# Nạp tiền vào tài khoản của bạn <a id="top-up-your-account"></a>

## Đính kèm vào Bảng điều khiển <a id="attaching-to-the-console"></a>

Nút điểm cuối Klaytn đi kèm bảng điều khiển JavaScript. Từ dòng lệnh bảng điều khiển, bạn có thể khởi tạo một phần của các cuộc gọi API Klaytn tới EN của mình. Để đính kèm vào bảng điều khiển JavaScript, hãy thực thi lệnh sau.

```bash
$ ken attach ~/kend_home/klay.ipc
Welcome to the Klaytn JavaScript console

!instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kend_home
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

 >
```

**LƯU Ý**: Bạn phải đợi tới khi tất cả các khối đã được tải về. Nhập `klay.blockNumber` vào bảng điều khiển và kiểm tra xem nó có khớp với số khối hiện tại không ở [đây](https://baobab.scope.klaytn.com/)

**LƯU Ý**: Gõ `klay` hoặc`cá nhân` để nhận danh sách các hàm có sẵn.

## Tạo tài khoản Klaytn mới <a id="creating-a-new-klaytn-account"></a>

Để tạo một tài khoản Klaytn mới từ bảng điều khiển JavaScript, hãy thực thi lệnh sau. Khóa riêng tư của bạn sẽ được mã hóa bằng cụm mật khẩu mà bạn nhập.

```javascript
> personal.newAccount()
Passphrase:  # enter your passphrase
Repeat passphrase:
"0x75a59b94889a05c03c66c3c84e9d2f8308ca4abd" # created account address
```

Tập tin kho khóa sẽ được tạo trong thư mục `keystore` thuộc thư mục dữ liệu EN, `DATA_DIR` đặt trong `kend.conf`. Nếu bạn làm theo hướng dẫn mặc định để bắt đầu nhanh, thư mục đó là `~/kend_home/keystore/`.

```javascript
$ ls ~/kend_home/keystore/
UTC--2019-06-24T11-20-15.590879000Z--75a59b94889a05c03c66c3c84e9d2f8308ca4abd
```

## Mở khóa tài khoản Klaytn <a id="unlocking-the-klaytn-account"></a>

Để mở khóa cho một tài khoản đã tạo, hãy thực thi lệnh sau. Lệnh này sẽ mở khóa tài khoản trong 300 giây. **Lưu ý**: Nếu bạn muốn đặt thời gian mở khóa theo cách thủ công, hãy tham khảo [liên kết](../../dapp/json-rpc/api-references/personal.md#personal_unlockaccount) này. **`CẢNH BÁO`**: Việc mở khóa một tài khoản có thể rất nguy hiểm nếu không được thực hiện cẩn thận. Có khả năng token của bạn sẽ bị hacker lấy mất nếu hacker đã bẻ khóa EN của bạn. Để sử dụng phương pháp an toàn hơn, hãy tham khảo [hướng dẫn triển khai bằng khóa riêng tư](../../dapp/tutorials/count-dapp/6.-deploy-contract.md#deploy-method-1-by-private-key)

```javascript
> personal.unlockAccount('75a59b94889a05c03c66c3c84e9d2f8308ca4abd') # account address to unlock
Unlock account 75a59b94889a05c03c66c3c84e9d2f8308ca4abd
Passphrase: # enter your passphrase
true
```

## Nhận đồng KLAY cho mạng thử nghiệm từ Vòi Baobab <a id="getting-testnet-klay-from-the-baobab-faucet"></a>

* Dùng vòi Baobab trong Ví Klaytn.
* Truy cập [https://baobab.wallet.klaytn.foundation](https://baobab.wallet.klaytn.foundation/).
* Bạn có thể tạo tài khoản mới từ ví, hoặc dùng tập tin kho khóa mà bạn đã tạo từ bảng điều khiển JavaScript EN ở trên để đăng nhập vào ví.
* Đi tới "Vòi KLAY" từ trình đơn nằm bên trái, nhấp vào nút "Mở vòi" để nhận 150 KLAY.

  Bạn có thể mở vòi KLAY mỗi 24 giờ một lần.

* Nếu bạn đã tạo một tài khoản mới để nhận đồng KLAY, hãy gửi khoản KLAY này tới tài khoản được tạo trên EN.

## Kiểm tra số dư trong tài khoản <a id="checking-the-balance-in-your-account"></a>

Để xem số dư của tài khoản, hãy thực thi lệnh sau.

Đơn vị mặc định là peb \(1 KLAY = 10^18 peb\). Bạn có thể tìm hiểu thêm thông tin về các đơn vị của KLAY tại [Các đơn vị của KLAY](../../klaytn/design/klaytn-native-coin-klay.md#units-of-klay).

```javascript
> klay.getBalance('75a59b94889a05c03c66c3c84e9d2f8308ca4abd') # enter your account address
1e+21  # 1000 KLAY
```

## Thoát bảng điều khiển <a id="exiting-the-console"></a>

Để thoát bảng điều khiển javascript, hãy thực thi lệnh sau.

```javascript
> exit
$
```


