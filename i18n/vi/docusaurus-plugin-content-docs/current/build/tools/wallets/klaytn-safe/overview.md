# Thiết kế két Klaytn

Hiện tại, Klaytn Safe là tập hợp các công cụ để tạo và quản lý ví đa chữ ký, cụ thể là:

* **Safe React:** Đây là ứng dụng web phản ứng để tạo và tương tác với ví đa chữ ký.

* **Dịch vụ giao dịch Safe:** Dịch vụ này theo dõi các giao dịch được gửi qua các hợp đồng an toàn và lắng nghe các sự kiện từ các khối gần đây trong Cypress và Baobab. Các giao dịch cũng có thể được gửi đến dịch vụ để cho phép thu thập chữ ký ngoài chuỗi hoặc để thông báo cho chủ sở hữu về một giao dịch đang chờ gửi đến chuỗi khối.

* **Dịch vụ cấu hình Safe:** Dịch vụ này cung cấp thông tin cấu hình của môi trường máy khách Klaytn Safe, ví dụ như cấu hình tất cả chi tiết chuỗi và API.

* **Cổng máy khách Safe:** Đây là cổng kết nối giữa máy khách Klaytn Safe và các dịch vụ phụ trợ (dịch vụ giao dịch và Nút Klaytn)

* **Cơ sở hạ tầng Safe:** Đây là thiết lập cụm để triển khai các dịch vụ phụ trợ (Giao dịch Safe, Cấu hình Safe, Cổng máy khách Safe).

Vui lòng tham khảo [liên kết](https://github.com/klaytn/klaytn-safe-react) này để biết thêm thông tin.