# Nạp tiền vào tài khoản <a id="top-up-your-account"></a>

## Kết nối với Bảng điều khiển <a id="attaching-to-the-console"></a>

Nút điểm cuối Klaytn đi kèm bảng điều khiển JavaScript. Từ dòng lệnh của bảng điều khiển, bạn có thể khởi tạo một phần của các lệnh gọi ra API Klaytn đến EN của mình. Để đính kèm vào bảng điều khiển JavaScript, hãy thực thi lệnh sau.

```bash
$ ken attach ~/kend_home/klay.ipc
Welcome to the Klaytn JavaScript console

!instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kend_home
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

 >
```

**LƯU Ý**: Bạn phải đợi đến khi đã tải về tất cả các khối. Nhập `klay.blockNumber` vào bảng điều khiển và kiểm tra xem nó có khớp với số khối hiện tại hay không [tại đây](https://baobab.scope.klaytn.com/)

**LƯU Ý**: Gõ `klay` hoặc`personal` để nhận danh sách các hàm có sẵn.

## Tạo tài khoản Klaytn mới <a id="creating-a-new-klaytn-account"></a>

Để tạo một tài khoản Klaytn mới từ bảng điều khiển JavaScript, hãy thực thi lệnh sau. Mã khóa riêng tư của bạn sẽ được mã hóa bằng cụm mật khẩu mà bạn nhập.

```javascript
> personal.newAccount()
Passphrase:  # enter your passphrase
Repeat passphrase:
"0x75a59b94889a05c03c66c3c84e9d2f8308ca4abd" # created tài khoản address
```

Tập tin lưu trữ khóa sẽ được tạo trong thư mục `keystore` thuộc thư mục dữ liệu EN, `DATA_DIR` đặt trong `kend.conf`. Nếu bạn làm theo hướng dẫn mặc định bắt đầu nhanh, thư mục đó sẽ là `~/kend_home/keystore/`.

```javascript
$ ls ~/kend_home/keystore/
UTC--2019-06-24T11-20-15.590879000Z--75a59b94889a05c03c66c3c84e9d2f8308ca4abd
```

## Mở khóa tài khoản Klaytn <a id="unlocking-the-klaytn-account"></a>

Để mở khóa một tài khoản đã tạo, hãy thực thi lệnh sau. Lệnh này sẽ mở khóa tài khoản trong 300 giây. **Lưu ý**: Nếu bạn muốn đặt thời gian mở khóa theo cách thủ công, hãy tham khảo [liên kết](../../dapp/json-rpc/api-references/personal.md#personal_unlocktài khoản) này. **`CẢNH BÁO`**: Việc mở khóa một tài khoản có thể rất nguy hiểm nếu không được thực hiện thận trọng. Có khả năng token của bạn sẽ bị hacker lấy mất nếu hacker xâm nhập được EN của bạn. Để sử dụng phương pháp an toàn hơn, hãy tham khảo mục [hướng dẫn triển khai bằng mã khóa riêng tư](../../dapp/tutorials/count-dapp/6.-deploy-contract.md#deploy-method-1-by-private-key)

```javascript
> personal.unlockAccount('75a59b94889a05c03c66c3c84e9d2f8308ca4abd') # tài khoản address to unlock
Unlock tài khoản 75a59b94889a05c03c66c3c84e9d2f8308ca4abd
Passphrase: # enter your passphrase
true
```

## Nhận KLAY cho mạng thử nghiệm từ Vòi Baobab <a id="getting-testnet-klay-from-the-baobab-faucet"></a>

* Sử dụng vòi Baobab trong Ví Klaytn.
* Truy cập [https://baobab.wallet.klaytn.foundation](https://baobab.wallet.klaytn.foundation/).
* Bạn có thể tạo tài khoản mới từ Ví, hoặc dùng tập tin lưu trữ khóa mà bạn đã tạo từ bảng điều khiển JavaScript EN ở trên để đăng nhập vào Ví.
* Đi đến “Vòi KLAY” từ trình đơn ngăn bên trái, nhấp vào nút “Run Faucet” để nhận 150 KLAY.

  Bạn có thể mở vòi KLAY mỗi 24 giờ một lần.

* Nếu bạn đã tạo một tài khoản mới để nhận KLAY, hãy gửi số KLAY đó đến tài khoản đã được tạo trên EN.

## Kiểm tra số dư trong tài khoản <a id="checking-the-balance-in-your-account"></a>

Để xem số dư của tài khoản, hãy thực thi lệnh sau.

Đơn vị mặc định là peb \(1 KLAY = 10^18 peb\). Bạn có thể tìm hiểu thêm thông tin về các đơn vị của KLAY trong phần [Các đơn vị của KLAY](../../klaytn/design/klaytn-native-coin-klay.md#units-of-klay).

```javascript
> klay.getBalance('75a59b94889a05c03c66c3c84e9d2f8308ca4abd') # enter your tài khoản address
1e+21  # 1000 KLAY
```

## Thoát bảng điều khiển <a id="exiting-the-console"></a>

Để thoát bảng điều khiển javascript, hãy thực thi lệnh sau.

```javascript
> exit
$
```


