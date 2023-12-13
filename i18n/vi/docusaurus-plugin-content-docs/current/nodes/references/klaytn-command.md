# Lệnh Klaytn

## Cách tìm Thư mục Klaytn (Thường gọi là “Klaytn DIR”)

---
Bạn có thể kiểm tra thư mục Klaytn tại cấu hình `kcn` hoặc `kpn`. Tập tin cấu hình nằm tại `/etc/kcnd/conf` hoặc `/etc/kpnd/conf`.

```bash
cat /etc/kcnd/conf/kcnd.conf (or /etc/kpnd/conf/kpnd.conf)

# Find DATA_DIR and LOG_DIR path as below example
DATA_DIR=/var/kcnd/data/
LOG_DIR=/var/kcnd/nhật ký/
```

## Cách kết nối đến Bảng điều khiển Klaytn

---
Kết nối đến API Klaytn để kiểm tra trạng thái nút và mạng.

```bash
# execute the command below in the Klaytn DATA_DIR Path
$ sudo kcn attach klay.ipc
> 
```

## Các API hữu ích

```bash
# Check current block Number
  > klay.blockNumber

# Check my kni address
  > admin.nodeInfo

# Check my dode address
  > governance.nodeAddress

# Check other connected nodes
  > admin.peers

# Add or remove nodes
  > admin.addPeer("kni")
  > admin.removePeer("kni")
```

## Cách để chỉ lấy Kết quả API

```jsx
# execute the command below in the Klaytn DATA_DIR Path
$ sudo kcn attach --exec <statement> klay.ipc

e.g.
# Check my dode address
$ sudo kcn attach --exec "governance.nodeAddress" klay.ipc
"0xda23978e6e354fbf25dd87aaf1d1bb4ed112753f"
```

## các lệnh CLI ken <a id="ken-cli-commands"></a>

`ken` là giao dịch dòng lệnh cho Nút điểm cuối Klaytn.

```bash
CÁCH SỬ DỤNG:
   lệnh ken [options] [tùy chọn lệnh] [arguments...]
```

### Lệnh <a id="commands"></a>

`ken` có các lệnh sau.

```bash
LỆNH:
   tài khoản     Quản lý tài khoản
   attach      Bắt đầu một môi trường JavaScript tương tác (kết nối với nút)
   console     Bắt đầu một môi trường JavaScript tương tác
   dumpconfig  Hiển thị giá trị cấu hình
   dumpgenesis Kết xuất cấu hình JSON của khối khởi nguyên sang stdout (Lệnh này được hỗ trợ từ Klaytn v1.7.0.)
   init        Bootstrap và khởi tạo một khối khởi nguyên mới
   snapshot    Một tập hợp các lệnh dựa trên thu thập dữ liệu
   version     Hiển thị số phiên bản
   help, h     Hiển thị danh sách các lệnh hoặc trợ giúp cho một lệnh
```

Để xem hướng dẫn sử dụng chi tiết cho từng lệnh, hãy chọn tùy chọn `-h`.

```bash
$ ken tài khoản -h
Quản lý tài khoản, liệt kê tất cả các tài khoản hiện có, nhập khóa riêng tư vào tài khoản mới,
tạo tài khoản mới hoặc cập nhật tài khoản hiện có.
 ...
Khóa được lưu trữ dưới <DATADIR>/keystore.
Việc chuyển toàn bộ thư mục hoặc khóa riêng lẻ trong đó
giữa các nút Klaytn chỉ là sao chép đơn thuần.

Đảm bảo bạn sao lưu khóa thường xuyên.

CÁCH SỬ DỤNG:
   lệnh tài khoản ken [tùy chọn lệnh] [arguments...]

LỆNH:
     list    In tóm tắt các tài khoản hiện có
     new     Tạo tài khoản mới
     update  Cập nhật tài khoản hiện có
     import  Nhập khóa riêng tư vào tài khoản mới
```

```bash
$ ken init -h
init [tùy chọn lệnh] [arguments...]

Lệnh init khởi tạo một khối khởi nguyên mới và định nghĩa cho mạng lưới.
Đây là một hành động phá hoại và làm thay đổi mạng lưới mà bạn sẽ
tham gia vào.
 ...
```

### Bảng điều khiển JavaScript <a id="javascript-console"></a>

Nút điểm cuối Klaytn đi kèm bảng điều khiển JavaScript. Từ dòng lệnh của bảng điều khiển, bạn có thể khởi tạo một phần của các lệnh gọi ra API Klaytn đến EN của mình. Để đính kèm vào bảng điều khiển JavaScript, hãy thực thi lệnh sau.

```bash
$ ken attach ~/kend_home/klay.ipc
Welcome to the Klaytn JavaScript console

!instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kend_home
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

 >
```

Lệnh `attach` kết nối với nút đang chạy, trong khi lệnh `console` khởi chạy một nút và kết nối với nút đó.

```bash
   attach      Bắt đầu một môi trường JavaScript tương tác (kết nối với nút)
   console     Bắt đầu một môi trường JavaScript tương tác
```

#### API mô-đun <a id="module-apis"></a>

Nếu bạn nhập tên mô-đun trên dấu nhắc bảng điều khiển, bạn sẽ thấy các thuộc tính và chức năng có sẵn của mô-đun. Để biết chi tiết các chức năng, vui lòng tham khảo [API Klaytn](../../references/json-rpc/json-rpc.md).

```javascript
> personal
{
  listAccounts: [...],
  listWallets: [...],
  deriveAccount: function(),
  ecRecover: function(),
  getListAccounts: function(callback),
  getListWallets: function(callback),
  importRawKey: function(),
  lockAccount: function(),
  ...
}

> personal.listAccounts
["0x960dba2500ab529693ef8e299210768aa0d55ec8", "0x09a04dc9ac3cd92de5ff0d45ae50ff1b618305d9", "0x36662211c072dadbf5fc1e087ddebd36df986abd", "0xbf9683cf04520eeba6d936a3478de29437c5d048"]
> 
```  
