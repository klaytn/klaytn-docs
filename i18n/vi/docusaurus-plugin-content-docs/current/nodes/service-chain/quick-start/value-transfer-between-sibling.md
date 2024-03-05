# Chuyển giá trị giữa các chuỗi dịch vụ anh chị em

Phần này sẽ giải thích cách bật tính năng chuyển giá trị giữa các mạng lưới ServiceChain.
Các tính năng chính được cung cấp bởi ServiceChain như neo giữ dữ liệu và chuyển giá trị, có thể sử dụng độc lập. Nghĩa là, bạn chỉ có thể sử dụng tính năng neo dữ liệu hoặc là chuyển giá trị, bất kể bạn có sử dụng tính năng khác hay không.

Như minh họa trong hình bên dưới, nếu có hai ServiceChain (chainID 1002 và 1004) được kết nối với Baobab, vì mỗi servicechain thực hiện neo dữ liệu với Baobab, nên không cần neo dữ liệu giữa các chuỗi với nhau mà chỉ cần chuyển giá trị.

Để chuyển giá trị khi không có cầu nối giữa hai ServiceChain, trước tiên hãy chuyển giá trị từ ServiceChain (chainID 1002) sang Baobab (chainID 1001), rồi chuyển lại giá trị từ Baobab (chainID 1001) sang ServiceChain (chainID 1004). Điều này không hiệu quả bằng chuyển giá trị trực tiếp từ ServiceChain (chainID 1002) sang ServiceChain (chainID 1004) cùng lúc. Do đó, bằng cách tạo cầu nối trực tiếp giữa ServiceChain, chúng ta có thể chuyển giá trị một cách hiệu quả.

![](/img/nodes/sc-vt-between-sibling-arch.png)

## Điều kiện tiên quyết <a id="prerequisites"></a>

- Chúng tôi giả định rằng bạn đã cài đặt hai ServiceChain, mỗi servicechain được kết nối với EN Baobab. Tham khảo [Kết nối với Baobab](en-scn-connection.md).
- Giả định rằng bạn đã thực hiện chuyển giá trị thông qua [Chuyển giá trị chuỗi chéo](value-transfer.md).

Lặp lại [Kết nối với Baobab](en-scn-connection.md) như trong hình trên để cài đặt thêm ServiceChain (chainID 1004).

Mỗi nút chỉ có thể có một cầu nối chính và một cầu nối con. Trong ví dụ này, để tiện giải thích, chúng ta sẽ kết nối một cầu nối với SCN-L2-03 và SCN-L2-07, đây là các nút chưa có cả cầu nối chính và cầu nối con.

![](/img/nodes/sc-vt-between-sibling-bridge.png)

## Bước 1: Kiểm tra KNI của nút SCN-L2-03 <a id="step-1-check-kni-of-scn-node"></a>

Lưu ý KNI của SCN-L2-03 là thông tin được sử dụng để kết nối từ nút SCN. Giá trị này sẽ được sử dụng trong bước tiếp theo khi tạo `main-bridges.json`

```
SCN-L2-03$ kscn attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://...39047242eb86278689...@[::]:50505?discport=0"
```

## Bước 2: Tạo main-bridges.json <a id="step-2-create-main-bridges-json"></a>

Đăng nhập vào SCN-L2-07 (lưu ý: chainID 1004) và tạo `main-bridges.json` trên `~/data`. Thay thế `[::]` nằm sau chữ cái `@` bằng địa chỉ IP của nút EN.

```
$ echo '["kni://...39047242eb86278689...@192.168.0.3:50505?discport=0"]' > ~/data/main-bridges.json
```

## Bước 3: Định cấu hình SCN rồi Khởi động lại <a id="step-3-configure-scn-then-restart"></a>

Từ tập lệnh shell của nút SCN-L2-07, hãy chỉnh sửa `kscn-XXXXX-amd64/conf/kscnd.conf`. Vì mỗi ServiceChain đã được neo với EN Baobab nên không cần phải neo dữ liệu giữa chuỗi dịch vụ kết nối. Vì vậy, chúng ta đặt `SC_ANCHORING` thành 0.

```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1002
...
SC_ANCHORING=0
...
```

Khởi động lại kscnd trên nút SCN-L2-07

```
SCN-L2-07$ kscnd stop
Shutting down kscnd: Killed
SCN-L2-07$ kscnd start
Starting kscnd: OK
```

Kiểm tra xem SCN-L2-07 có được kết nối với SCN-L2-0 hay không bằng cách kiểm tra `subbridge.peers.length`

```
SCN-L2-07$ kscn attach --datadir ~/data
> subbridge.peers.length
1
```

Trong trường hợp chuyển giá trị, nếu thông tin tương ứng với chainID 1002 được sử dụng làm thông tin cầu nối chính và thông tin tương ứng với chainID 1004 được đặt làm cầu nối con thì có thể chuyển giá trị giữa các chuỗi kết nối như trong [Chuyển giá trị chuỗi chéo](value-transfer.md).
