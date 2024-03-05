# Di chuyển dữ liệu chuỗi

<aside>
💡 Chỉ chạy lệnh di chuyển cho các nút PN và EN (không áp dụng với nút CN)

</aside>

## Lưu ý trước khi bắt đầu <a id="things-to-know-before-this-job"></a>

- Thông số kỹ thuật yêu cầu là m6i.8xlarge (32 lõi với dung lượng bộ nhớ 128GB) hoặc cao hơn
- 7 ngày để chạy toàn bộ quy trình (Quá trình di chuyển được chia làm 2 phần)
  - Phần 1 - Di chuyển DB sang thư mục mới (Xuất hiện thông báo “Quá trình di chuyển trạng thái đã hoàn tất”)
  - Phần 2 - Tạo khối mới trên thư mục mới (thư mục cũ sẽ bị xóa sau bước này)
- Cần có 500GB dung lượng trống

## Chuyển đến Bảng điều khiển Klaytn

```bash
$ kpn attach klay.ipc

#start chain data Migration
> admin.startStateMigration()
null

# Check Status
> admin.stateMigrationStatus

#stop Migration
> admin.stopStateMigration()

```
