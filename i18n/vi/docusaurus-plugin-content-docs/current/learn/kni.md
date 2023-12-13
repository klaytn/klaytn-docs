# KNI

**KNI (Mã định danh mạng lưới Klaytn)** là một lược đồ URL dùng để xác định nút Klaytn. Cú pháp của mã này như sau:
```
kni://<nodeID>@<hostname>:<port>?subport=<subport>&discport=<discport>
```
![Lược đồ KNI](/img/learn/kni_scheme.png)

**nodeID** là khóa công khai 512 bit tương ứng với khóa riêng tư của nút. Khóa này được dùng để xác thực giao tiếp với các nút ngang hàng trên mạng p2p.

**hostname** mô tả địa chỉ của một nút, nằm giữa `@` và `:`. Định dạng địa chỉ có thể là một trong những định dạng sau:
* IPv4 phân định bằng dấu chấm thập phân (`192.0.2.1`)
* IPv6 (`[2001:db8::68]`)
* IPv4-mapped IPv6 (`[2001:db8:3c4d:15::abcd:ef12]`)
* Tên miền (`your.node.com`)

**port** được sử dụng để tạo kết nối với các nút ngang hàng thông qua TCP. Trong Klaytn, `port` mặc định là `32323` và `subport` mặc định là `32324`. Lưu ý rằng `subport` mặc định được cấu hình là `port + 1` trong `kend.conf`. Tùy thuộc vào số lượng cổng lắng nghe TCP, Klaytn hỗ trợ hai [loại kết nối](./multiport.md).

**discport** được dùng để kiểm tra xem những nút lân cận xác định có thể tiếp cận các nút Klaytn hay không và tìm địa chỉ của các nút lân cận để tạo các kết nối mới. Lưu ý rằng đây là cổng UDP. Theo mặc định, cổng UDP hay `discport`, sử dụng cùng một cổng với cổng TCP. Nếu nút sử dụng một cổng khác cho `discport`, thì cổng đó có thể được chỉ định bởi tham số truy vấn `discport`.

Hai URL sau đây hiển thị ví dụ về KNI của một nút có địa chỉ IP `10.0.0.1` và cổng lắng nghe TCP `32323` và `32324`. Nếu `discport` bị bỏ qua thì nó được đặt thành cổng UDP `32323`, giống với giá trị của `port`.
```
kni://a979...163c@10.0.0.1:32323                 # either single-channel or multi-channel peer with omitted subport
kni://a979...163c@10.0.0.1:32323?subport=32324   # multi-channel peer
```

Hai URL tiếp theo hiển thị các ví dụ KNI về các nút có `discport` là `30301`.
```
kni://a979...163c@10.0.0.1:32323?discport=30301                 # either single-channel or multi-channel peer with omitted subport
kni://a979...163c@10.0.0.1:32323?subport=32324&discport=30301   # multi-channel peer
```

Nếu bạn muốn biết cách tạo KNI của một nút, vui lòng tham khảo phần [Tạo khóa nút & nút URI](../nodes/core-cell/install/before-you-install.md#node-key-node-uri-creation). Lược đồ KNI được dùng trong giao thức khám phá nút, [thiết lập `static-nodes.json`](../nodes/core-cell/install/install-proxy-nodes.md#install-static-nodes-json), [API addPeer](../references/json-rpc/admin.md#admin_addpeer), [tùy chọn nút ban đầu](../nodes/references/configuration-files.md#properties), v.v.
