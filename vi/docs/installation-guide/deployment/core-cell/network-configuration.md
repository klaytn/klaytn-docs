# Cấu hình mạng lưới <a id="network-configuration"></a>

Core Cell có thể được tạo thành từ:

* nhiều mạng con (khuyến nghị)
* mạng con đơn lẻ

## Core Cell với nhiều mạng con <a id="a-core-cell-with-multiple-subnets"></a>

Nên dùng mạng con hai lớp được sử dụng trong các dịch vụ web chung như DB + AppServer và Máy chủ Web Proxy. Thiết kế mạng con này có nhiều ưu điểm hơn về bảo mật.

Vì các máy chủ giám sát cũng được yêu cầu để quản lý tất cả các máy chủ như một lớp khác, nên phần sau đây mô tả cách thiết lập một Core Cell với mạng con ba lớp.

Mạng con ba lớp bao gồm những phần sau:

* Mạng con NĐT
* Mạng con NP
* Mạng con quản lý (QL)

### Mạng con NĐT <a id="cn-subnet"></a>

Mạng con NĐT gồm máy chủ NĐT trong Core Cell. NĐT hoạt động trong một Core Cell là duy nhất nhưng nên chuẩn bị nút dự phòng để đảm bảo tính sẵn sàng cao. Ip/Cổng của tất cả NĐT trong Mạng lưới Core Cell (MLCC) phải được mở cùng nhau vì chúng kết nối với nhau từ bên ngoài Core Cell. (Có thể nhận thông tin kết nối này từ các nhà vận hành Baobab.) Việc giao tiếp nội bộ với các mạng con khác trong Core Cell yêu cầu mở cổng mặc định (32323: số cổng Klaytn P2P mặc định) để kết nối với các NP của Mạng con NP. Ngoài ra, cần mở các cổng khác như cổng giám sát NĐT (61001) cho máy chủ giám sát và cổng SSH (22) cho mục đích quản lý. Nếu sử dụng tính năng đa kênh, cần mở thêm cổng khác (32324: cổng đa kênh mặc định).

![Mạng con NĐT](images/cn_subnet.png)

| Mạng con gốc | Mạng con mục tiêu    | Ingress                        | Egress |
|:------------ |:-------------------- |:------------------------------ |:------ |
| Mạng con NĐT | Mạng con NP          | P2P: 32323 (32324 cho đa kênh) | Tất cả |
| Mạng con NĐT | Mạng con QL          | SSH: 22, Giám sát: 61001       | Tất cả |
| Mạng con NĐT | Công khai (Internet) | iP và cổng P2P của mỗi NĐT     | Tất cả |

### Mạng con NP <a id="pn-subnet"></a>

Mạng con NP bao gồm máy chủ NP để cung cấp dịch vụ nhằm kết nối với NĐC bên ngoài.

Mạng con NP kết nối với các nút sau:

* NĐT trong Core Cell
* Một vài NP của Core Cell khác
* Máy chủ quản lý Core Cell (QL, Giám sát)
* NĐC

![Mạng con NP](images/pn_subnet.png)

| Mạng con gốc | Mạng con mục tiêu    | Ingress                        | Egress |
|:------------ |:-------------------- |:------------------------------ |:------ |
| Mạng con NP  | Mạng con NĐT         | P2P: 32323 (32324 cho đa kênh) | Tất cả |
| Mạng con NP  | Mạng con QL          | SSH: 22, Giám sát: 61001       | Tất cả |
| Mạng con NP  | Công khai (Internet) | P2P: 32323                     | Tất cả |

### Mạng con QL <a id="mgmt-subnet"></a>

Mạng con QL là mạng con cổng cho nhà vận hành tham gia vào nút Core Cell thông qua ssh. Có thể cần máy chủ VPN để tạo kết nối cùng với máy chủ giám sát và máy chủ quản lý được cài đặt công cụ để quản lý các nút Core Cell.

![Mạng con quản lý](images/admin_subnet.png)

| Mạng con gốc | Mạng con mục tiêu    | Ingress                         | Egress |
|:------------ |:-------------------- |:------------------------------- |:------ |
| Mạng con QL  | Mạng con NĐT         | Tất cả                          | Tất cả |
| Mạng con QL  | Mạng con NP          | Tất cả                          | Tất cả |
| Mạng con QL  | Công khai (Internet) | VPN (tcp): 443, VPN (udp): 1194 | Tất cả |

## Core Cell với mạng con đơn lẻ <a id="a-core-cell-with-a-single-subnet"></a>

Một mạng con đởn lẻ của Core Cell được xây dựng cho mục đích phát triển/thử nghiệm hoặc để tạo nhiều mạng con trong các trường hợp khó khăn.

Tất cả các nút được thiết lập dưới một mạng con CC đơn lẻ. Cần thiết lập tường lửa để kết nối NĐT với các NĐT khác trong Mạng lưới NĐT bằng cổng P2P (32323, 32324 cho tùy chọn đa kênh). Cổng P2P của NP được mở để kết nối với NĐC trong Mạng lưới nút điểm cuối (MLNĐC) và NP trong Mạng lưới Core Cell (MLCC). Ngoài ra, cần có một VPN tùy chọn và các máy chủ giám sát để quản lý từ xa.

![CC với mạng con đơn lẻ](images/cc_single_subnet.png)

