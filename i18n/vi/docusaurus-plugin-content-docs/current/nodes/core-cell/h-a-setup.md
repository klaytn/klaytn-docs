# Thiết lập H/A

Định cấu hình CN để đạt được tính sẵn có cao là rất quan trọng trong việc vận hành hiệu quả Core Cell. Sơ đồ tính sẵn có cao được khuyến nghị tùy thuộc vào việc Core Cell được triển khai trên cơ sở hạ tầng vật lý hay trên đám mây.

## Hoạt động-chờ (khuyến nghị cho bare-metal) <a id="active-standby-recommended-for-bare-metal"></a>

Trong cấu hình này, hai nút CN được cài đặt cấu hình hoạt động-chờ. Trong quá trình hoạt động thông thường, nút hoạt động tham gia tạo khối, trong khi nút chờ chỉ đồng bộ hóa dữ liệu chuỗi từ mạng lưới. Cấu hình này đảm bảo rằng CN chờ có bản sao mới của dữ liệu chuỗi trong trường hợp nút hoạt động không thành công.

### Thiết lập <a id="setup"></a>

1. Tạo bản sao lưu của `khóa nút` của CN hoạt động.
2. Cài đặt CN chờ. Cấu hình này giống với CN hoạt động, ngoại trừ:
   - Nút chờ sử dụng `khóa nút` khác
   - Thêm địa chỉ của PN vào `$DATA_DIR/static-nodes.json`

### Dự phòng <a id="failover"></a>

1. Dừng CN chờ: `sudo systemctl stop kcnd`
2. Thay thế `khóa nút` của nút chờ bằng `khóa nút` của CN hoạt động không thành công.
3. Gán lại địa chỉ IP của CN hoạt động cho CN chờ.
4. Khởi chạy CN chờ và xác minh nó đã đồng bộ với mạng lưới: `sudo systemctl start kcnd`

## Bản sao lưu máy ảo & Thu thập dữ liệu (khuyến nghị cho đám mây) <a id="machine-image-snapshot-recommended-for-cloud"></a>

Cơ sở hạ tầng đám mây cho phép người vận hành thay thế các nút không thành công nhanh chóng hơn mà không cần phải chạy CN chờ thứ 2. Thay vào đó, nó đảm bảo một CN mới có thể được cung cấp nhanh chóng và đi kèm bản sao cập nhật của dữ liệu chuỗi.

Thuật ngữ và quy trình chính xác có thể khác nhau giữa các môi trường đám mây khác nhau. Quy trình bên dưới dựa trên AWS (cụ thể là EC2 và EBS) nhưng có thể được điều chỉnh theo các nền tảng đám mây khác.

### Thiết lập <a id="setup"></a>

1. Tạo bản sao lưu của `khóa nút` của CN hoạt động.
2. Mỗi lần cấu hình và phần mềm CN được cập nhật, một bản sao lưu máy ảo sẽ được tạo ra (ví dụ: AMI). Đừng thêm khối lượng chứa `DATA_DIR` trong bản sao lưu này, nó sẽ được tách riêng ra.

### Dự phòng <a id="failover"></a>

Sử dụng bất kỳ nút PN của CC nào để thu thập dữ liệu chuỗi:

1. Kết nối với bất kỳ PN nào và dừng kpnd: `sudo systemctl stop kpnd`. Cần phải dừng kpnd trước để đảm bảo tính nhất quán của dữ liệu.
2. Sử dụng bảng điều khiển AWS, tạo bản thu thập dữ liệu của khối lượng chứa `DATA_DIR` của PN.
3. Bắt đầu kpnd: `sudo systemctl start kpnd`

Tạo một CN mới sử dụng bản sao CN hoặc dữ liệu chuỗi:

1. Tạo một phiên bản bằng bản sao CN (tạo trong phần "Thiết lập" phía trên).
2. Đính kèm khối lượng được tạo từ bản thu thập dữ liệu `$DATA_DIR` của PN.
3. Xóa tất cả các tập tin trong khối lượng ngoại trừ `$DATA_DIR/klay/chaindata`. Xác nhận rằng `DATA_DIR` trong `kcnd.conf` khớp với thư mục chứa dữ liệu chuỗi. Có thể sẽ cần đổi tên thư mục nếu tên khác nhau.
4. Sao chép `khóa nút` của CN không thành công vào `$DATA_DIR/klay/nodekey`.
5. Gán lại địa chỉ IP của CN không thành công vào nút thay thế.
6. Bắt đầu kcnd: `sudo systemctl start kcnd`
7. Xác minh CN đã đồng bộ với mạng lưới.

## Cân nhắc bổ sung <a id="additional-considerations"></a>

Gán lại IP công khai của CN không thành công cho CN thay thế sẽ giúp nút thay thế có thể kết nối ngay lập tức với các CN khác. Nếu IP thay đổi, CN mới sẽ không thể kết nối với mạng lưới cho đến khi tất cả các CCO khác cập nhật cấu hình tường lửa của mình.
