# Lệnh Klaytn thường dùng

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
