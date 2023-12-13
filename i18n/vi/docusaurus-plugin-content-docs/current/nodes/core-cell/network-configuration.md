# Cấu hình mạng

Core Cell có thể được tạo thành từ:

* nhiều mạng con (khuyến nghị)
* mạng con đơn lẻ

## Core Cell với nhiều mạng con <a id="a-core-cell-with-multiple-subnets"></a>

Nên dùng mạng con hai lớp được sử dụng trong các dịch vụ web chung như DB + AppServer và Máy chủ Web Proxy. Thiết kế mạng con này có nhiều ưu điểm hơn về bảo mật.

Vì các máy chủ giám sát cũng được yêu cầu để quản lý tất cả các máy chủ như một lớp khác, nên phần sau đây mô tả cách thiết lập một Core Cell với mạng con ba lớp.

Mạng con ba lớp bao gồm những phần sau:

* Mạng con CN
* Mạng con PN
* Mạng con quản lý (QL)

### Mạng con CN <a id="cn-subnet"></a>

Mạng con CN gồm máy chủ CN trong Core Cell. CN hoạt động trong một Core Cell là duy nhất nhưng nên chuẩn bị nút dự phòng để đảm bảo tính sẵn sàng cao. Địa chỉ IP/Cổng của tất cả CN trong Mạng lưới Core Cell (CCN) phải được mở cùng nhau vì chúng kết nối với nhau từ bên ngoài Core Cell. (Có thể nhận thông tin kết nối này từ các nhà vận hành Baobab.) Việc giao tiếp nội bộ với các mạng con khác trong Core Cell yêu cầu mở cổng mặc định (32323: số cổng Klaytn P2P mặc định) để kết nối với các PN của Mạng con PN. Ngoài ra, cần mở các cổng khác như cổng giám sát CN (61001) cho máy chủ giám sát và cổng SSH (22) cho mục đích quản lý. Nếu sử dụng tính năng đa kênh, cần mở thêm cổng khác (32324: cổng đa kênh mặc định).

![Mạng con CN](/img/nodes/cn_subnet.png)

| Mạng con gốc | Mạng con mục tiêu    | Ingress                        | Egress |
|:------------ |:-------------------- |:------------------------------ |:------ |
| Mạng con CN  | Mạng con PN          | P2P: 32323 (32324 cho đa kênh) | Tất cả |
| Mạng con CN  | Mạng con QL          | SSH: 22, Giám sát: 61001       | Tất cả |
| Mạng con CN  | Công khai (Internet) | IP và cổng P2P của mỗi CN      | Tất cả |

### Mạng con PN <a id="pn-subnet"></a>

Mạng con PN bao gồm máy chủ PN để cung cấp dịch vụ nhằm kết nối với EN bên ngoài.

Mạng con PN kết nối với các nút sau:

* CN trong Core Cell
* Một vài PN của Core Cell khác
* Máy chủ quản lý Core Cell (QL, Giám sát)
* Nút EN

![Mạng con PN](/img/nodes/pn_subnet.png)

| Mạng con gốc | Mạng con mục tiêu    | Ingress                        | Egress |
|:------------ |:-------------------- |:------------------------------ |:------ |
| Mạng con PN  | Mạng con CN          | P2P: 32323 (32324 cho đa kênh) | Tất cả |
| Mạng con PN  | Mạng con QL          | SSH: 22, Giám sát: 61001       | Tất cả |
| Mạng con PN  | Công khai (Internet) | P2P: 32323                     | Tất cả |

### Mạng con QL <a id="mgmt-subnet"></a>

Mạng con QL là mạng con cổng cho người vận hành tham gia vào nút Core Cell thông qua ssh. Có thể cần máy chủ VPN để tạo kết nối cùng với máy chủ giám sát và máy chủ quản lý được cài đặt công cụ để quản lý các nút Core Cell.

![Mạng con quản lý](/img/nodes/admin_subnet.png)

| Mạng con gốc | Mạng con mục tiêu    | Ingress                         | Egress |
|:------------ |:-------------------- |:------------------------------- |:------ |
| Mạng con QL  | Mạng con CN          | Tất cả                          | Tất cả |
| Mạng con QL  | Mạng con PN          | Tất cả                          | Tất cả |
| Mạng con QL  | Công khai (Internet) | VPN (tcp): 443, VPN (udp): 1194 | Tất cả |

## Core Cell với mạng con đơn lẻ <a id="a-core-cell-with-a-single-subnet"></a>

Một mạng con đơn lẻ của Core Cell được xây dựng cho mục đích phát triển/thử nghiệm hoặc để tạo nhiều mạng con trong các trường hợp khó khăn.

Tất cả các nút được thiết lập dưới một mạng con CC đơn lẻ. Cần thiết lập tường lửa để kết nối CN với các CN khác trong Mạng lưới CN bằng cổng P2P (32323, 32324 cho tùy chọn đa kênh). Cổng P2P của PN được mở để kết nối với EN trong Mạng lưới nút điểm cuối (ENN) và PN trong Mạng lưới Core Cell (CNN). Ngoài ra, cần có một VPN tùy chọn và các máy chủ giám sát để quản lý từ xa.

![CC với mạng con đơn lẻ](/img/nodes/cc_single_subnet.png)

