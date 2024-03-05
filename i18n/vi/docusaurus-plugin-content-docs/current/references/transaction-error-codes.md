# Mã lỗi giao dịch

Klaytn cung cấp trường `txError` trong biên lai giao dịch để cung cấp cho các nhà phát triển thêm thông tin về lý do thực hiện giao dịch không thành công. Trường này chỉ tồn tại nếu việc thực hiện giao dịch không thành công. Để tiết kiệm bộ nhớ và băng thông mạng, `txError` chứa một giá trị số nguyên. Bảng dưới đây cho biết ý nghĩa của giá trị trong `txError`.

| Mã lỗi | Mô tả                                                                                    |
| :----- | :--------------------------------------------------------------------------------------- |
| 0x02   | Xảy ra lỗi VM khi chạy hợp đồng thông minh                                               |
| 0x03   | vượt quá độ sâu lệnh gọi tối đa                                                          |
| 0x04   | xung đột địa chỉ hợp đồng                                                                |
| 0x05   | lưu trữ mã tạo hợp đồng hết gas                                                          |
| 0x06   | evm: đã vượt quá kích thước mã tối đa                                                    |
| 0x07   | hết gas                                                                                  |
| 0x08   | evm: chống ghi                                                                           |
| 0x09   | evm: đã hoàn nguyên việc thực hiện                                                       |
| 0x0a   | đã đạt đến giới hạn chi phí tính toán mã vận hành (100000000) cho tx  |
| 0x0b   | tài khoản đã tồn tại                                                                     |
| 0x0c   | không phải tài khoản chương trình (ví dụ: tài khoản có mã và lưu trữ) |
| 0x0d   | Địa chỉ mà con người đọc được hiện không được hỗ trợ                                     |
| 0x0e   | tỷ lệ phí nằm ngoài phạm vi [1, 99]  |
| 0x0f   | Không thể cập nhật AccountKeyFail                                                        |
| 0x10   | loại khóa tài khoản khác                                                                 |
| 0x11   | Không thể khởi tạo AccountKeyNil cho một tài khoản                                       |
| 0x12   | khóa công khai không nằm trên đường cong                                                 |
| 0x13   | trọng số khóa bằng không                                                                 |
| 0x14   | khóa không thể tuần tự hóa                                                               |
| 0x15   | khóa trùng lặp                                                                           |
| 0x16   | tràn tổng trọng số                                                                       |
| 0x17   | ngưỡng không thỏa mãn. Tổng trọng số của các khóa nhỏ hơn ngưỡng.                        |
| 0x18   | chiều dài bằng không                                                                     |
| 0x19   | chiều dài quá dài                                                                        |
| 0x1a   | loại tổ hợp lồng nhau                                                                    |
| 0x1b   | giao dịch cũ phải có khóa tài khoản cũ                                                   |
| 0x1c   | tính năng không dùng được nữa                                                            |
| 0x1d   | không được hỗ trợ                                                                        |
| 0x1e   | định dạng mã hợp đồng thông minh không hợp lệ                                            |
