# Quản lý tài khoản <a id="account-management"></a>

**`CẢNH BÁO`**: Hãy ghi nhớ mật khẩu của nj. Nếu bạn quên mật khẩu của tài khoản, bạn sẽ không thể truy cập tài khoản đó nữa. **Không có**_**tùy chọn quên mật khẩu**_ **ở đây. Đừng bao giờ quên mật khẩu. **

Klaytn cung cấp hai công cụ tạo dòng lệnh hữu ích, `ken` và `bảng điều khiển JavaScript`, để các nhà phát triển có thể quản lý tài khoản. Lưu ý rằng chúng tôi KHÔNG hỗ trợ việc xuất khóa riêng tư của bạn dưới định dạng không được mã hóa.

## ken <a id="ken"></a>

Mã nhị phân nút điểm cuối Klaytn `ken` cung cấp khả năng quản lý tài khoản thông qua lệnh `account`. Lệnh `account` cho phép bạn tạo ra các tài khoản mới, liệt kê tất cả các tài khoản hiện có, nhập một khóa riêng tư vào một tài khoản mới, chuyển sang định dạng khóa mới nhất và thay đổi mật khẩu của bạn.

### Sử dụng <a id="usage"></a>

```bash
$ ken account <command> [options...] [arguments...]
```

**Lệnh**

```bash
$ ken account -help...
CÁC LỆNH:
     list    In tóm tắt về các tài khoản hiện có
     new     Tạo một tài khoản mới
     update  Cập nhật một tài khoản hiện có
     import  Nhập một khóa riêng tư vào một tài khoản mới...
```

Bạn có thể nhận thông tin về các lệnh con từ trợ giúp</code> của `tài khoản ken&lt;command&gt;.</p>

<pre><code class="text">$ danh sách tài khoản ken --danh sách
trợ giúp [các tùy chọn lệnh] [arguments...]

In một danh sách ngắn liệt kê toàn bộ các tài khoản

TÙY CHỌN KLAY:
  --dbtype value                        Loại cơ sở dữ liệu lưu trữ chuỗi khối ("leveldb", "badger") (default: "leveldb")
  --datadir "/Users/ethan/Library/KEN"  Thư mục dữ liệu dành cho cơ sở dữ liệu và kho khóa
  --keystore                            Thư mục dành cho kho khóa (mặc định = bên trong datadir)

TÙY CHỌN CƠ SỞ DỮ LIỆU:
  --db.no-partitioning  Vô hiệu hóa cơ sở dữ liệu được phân vùng để lưu trữ liên tục
`</pre>

### Danh mục dữ liệu <a id="data-directory"></a>

Các tập tin kho khóa được lưu trữ dưới `<DATADIR>/kho khóa`. Bạn có thể chỉ định thư mục dữ liệu như dưới đây. Chúng tôi khuyên bạn nên thực thi lệnh `tài khoản ken` với tùy chọn `--datadir`. Chỉ dẫn thư mục dữ liệu tới `DATA_DIR` đặt trong `kend.conf` để chia sẻ các tài khoản của bạn một cách suôn sẻ với Nút điểm cuối.

```bash
$ tài khoản ken mới --datadir <DATADIR>
$ tài khoản ken mới --datadir "~/kend_home"
```

Nếu bạn không chỉ định thư mục dữ liệu, vị trí mặc định là như sau.

* Mac: `~/Library/KEN`
* Linux: `~/.ken`

## Bảng điều khiển JavaScript <a id="javascript-console"></a>

Để điều khiển bảng điều khiển JavaScript, EN phải có trạng thái đang chạy. Để biết thêm thông tin, hãy xem [Khởi chạy một EN](../quick-start/launch-an-en.md). Khởi chạy một EN và đính kèm vào bảng điều khiển như dưới đây.

### Sử dụng <a id="usage"></a>

```bash
$ kend start
Đang bắt đầu kend: OK

$ ken attach ~/kend_home/klay.ipc
Chào mừng bạn đến với bảng điều khiển JavaScript của Klaytn!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kend_home
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

>
```

**Lệnh**

Gõ `personal` hoặc `klay` để xem danh sách các chức năng có sẵn. Trong bài hướng dẫn này, chúng ta sẽ cùng nghiên cứu các chức năng sau.

```bash
> personal.newAccount()
> personal.importRawKey()
> personal.unlockAccount()
> klay.accounts
> klay.getBalance()
```

### Danh mục dữ liệu <a id="data-directory"></a>

Khi bạn tạo một tài khoản, tập tin kho khóa được lưu trữ trong `<DATADIR>keystore`. `<DATADIR>` là `DATA_DIR` đặt trong `kend.conf`. Nếu bạn làm theo hướng dẫn bắt đầu nhanh với ví dụ đã cho, thư mục đó sẽ là `~/kend_home`.

