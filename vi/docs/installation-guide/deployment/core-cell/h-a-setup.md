# Thiết lập H/A <a id="h-a-setup"></a>

Định cấu hình NĐT để đạt được tính sẵn có cao là rất quan trọng trong việc vận hành hiệu quả Core Cell. Tính sẵn có cao được khuyến nghị tùy thuộc vào Core Cell được triển khai trên cơ sở hạ tầng thực tế hay trên đám mây.

## Hoạt động-chờ \(khuyến nghị cho bare-metal\) <a id="active-standby-recommended-for-bare-metal"></a>

Trong cấu hình này, hai NĐT được cài đặt cấu hình hoạt động-chờ. Trong quá trình hoạt động thông thường, nút hoạt động tham gia tạo khối, trong khi nút chờ chỉ đồng bộ hóa dữ liệu chuỗi từ mạng lưới. Cấu hình này đảm bảo rằng NĐT chờ có bản sao mới của dữ liệu chuỗi trong trường hợp nút hoạt động không thành công.

### Thiết lập <a id="setup"></a>

1. Tạo bản sao lưu của `nodekey` của NĐT hoạt động.
2. Cái đặt NĐT chờ. Cấu hình này giống với NĐT hoạt động ngoại trừ:
   * Nút chờ sử dụng `nodekey` khác
   * Thêm địa chỉ của NP vào `$DATA_DIR/static-nodes.json`

### Dự phòng <a id="failover"></a>

1. Dừng NĐT chờ: `sudo systemctl stop kcnd`
2. Thay thế `nodekey` của nút chờ bằng `nodekey` của NĐT hoạt động không thành công.
3. Gán lại địa chỉ IP của NĐT hoạt động cho NĐT chờ.
4. Bắt đầu NĐT chờ và xác minh nó đã đồng bộ với mạng lưới: `sudo systemctl start kcnd`

## Bản sao lưu máy ảo & Thu thập dữ liệu \(khuyến nghị cho đám mây\) <a id="machine-image-snapshot-recommended-for-cloud"></a>

Cơ sở hạ tầng đám mây cho phép nhà vận hành thay thế các nút không thành công nhanh chóng hơn mà không cần phải chạy NĐT chờ thứ 2. Thay vào đó, nó đảm bảo một NĐT mới có thể được cung cấp nhanh chóng và đi kèm bản sao cập nhật của dữ liệu chuỗi.

Thuật ngữ và quy trình chính xác có thể khác nhau giữa các môi trường đám mây khác nhau. Quy trình bên dưới dựa trên AWS \(cụ thể là EC2 và EBS\) nhưng có thể được điều chỉnh theo các nền tảng đám mây khác.

### Thiết lập <a id="setup"></a>

1. Tạo bản sao lưu của `nodekey` của NĐT hoạt động.
2. Mỗi lần cấu hình và phần mềm NĐT được cập nhật, một bản sao lưu máy ảo sẽ được tạo ra \(ví dụ: AMI\). Không bao gồm khối lượng chứa `DATA_DIR` trong ảnh này mà sẽ tách riêng ra.

### Dự phòng <a id="failover"></a>

Sử dụng bất kỳ nút NP của CC nào để thu thập dữ liệu chuỗi:

1. Kết nối với bất kỳ NP nào và dừng kpnd: `sudo systemctl stop kpnd`. Cần phải dừng kpnd trước để đảm bảo tính nhất quán của dữ liệu.
2. Sử dụng bảng điều khiển AWS, tạo bản thu thập dữ liệu của khối lượng chứa `DATA_DIR` của NP.
3. Bắt đầu kpnd: `sudo systemctl start kpnd`

Tạo một NĐT mới sử dụng bản sao NĐT hoặc dữ liệu chuỗi:

1. Tạo một phiên bản bằng bản sao NĐT \(tạo trong phần "Thiết lập" phía trên\).
2. Đính kèm khối lượng được tạo từ bản thu thập dữ liệu `$DATA_DIR` của NP.
3. Xóa tất cả các tập tin trong khối lượng ngoại trừ `$DATA_DIR/klay/chaindata`. Xác nhận rằng `DATA_DIR` trong `kcnd.conf` khớp với thư mục chứa dữ liệu chuỗi. Có thể sẽ cần đổi tên thư mục nếu tên khác nhau.
4. Sao chép `nodekey` của NĐT không thành công vào `$DATA_DIR/klay/nodekey`.
5. Gán lại địa chỉ IP của NĐT không thành công vào nút thay thế.
6. Bắt đầu kpnd: `sudo systemctl start kpnd`
7. Xác minh NĐT đã đồng bộ với mạng lưới.

## Cân nhắc bổ sung <a id="additional-considerations"></a>

Gán lại IP công khai của NĐT không thành công cho NĐT thay thế sẽ giúp nút thay thế có thể kết nối ngay lập tức với các NĐT khác. Nếu IP thay đổi, NĐT mới sẽ không thể kết nối với mạng lưới cho đến khi tất cả các CCO khác cập nhật cấu hình tường lửa của mình.

