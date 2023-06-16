# Ghi bản ghi hoạt động

## Định cấu hình Quay vòng bản ghi

```bash
export LOG_DIR=$(cat /etc/k*nd/conf/k*nd.conf | grep LOG_DIR | cut -d '=' -f 2)
cat <<EOF > /etc/logrotate.d/klaytn
$LOG_DIR/*.out {
    daily
    copytruncate
    compress
    rotate 7
    dateext
    create 0644 root root
}
EOF
```

## Trạng thái bản ghi thông thường

| Loại                                           | Thông báo                                                                                                          | Mô tả                                                                                                                                                                                                                                                                                              |      |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| Lỗi                                             | FastWebsocketHandler fail to upgrade message                                                                       | Vấn đề về phiên bản của kết nối WebSocket                                                                                                                                                                                                                                                          | thấp |
| Lỗi                                             | invalid index of the proposer                                                                                      | Lỗi phát sinh khi nút EN nhận giao dịch từ nút CN                                                                                                                                                                                                                                                  | thấp |
| WARN                                            | ProtocolManager failed to read msg                                                                                 |                                                                                                                                                                                                                                                                                                    | thấp |
| WARN                                            | Failed doConnTypeHandshake                                                                                         |                                                                                                                                                                                                                                                                                                    | thấp |
| ERRORErro                                       | Protocol istanbul/64 failed                                                                                        | Máy ngang hàng mất kết nối                                                                                                                                                                                                                                                                         | thấp |
| Lỗi                                             | Fasthttp Err                                                                                                       | Lỗi khi kết nối: hết thời gian đọc nhưng không đọc được gì                                                                                                                                                                                                                                         | thấp |
| Lỗi                                             | Fasthttp Err                                                                                                       | Lỗi khi kết nối: lỗi khi đọc tiêu đề yêu cầu: không tìm thấy phương pháp yêu cầu http trong "\x16…                                                                                                                                                                                                | thấp |
| Warn                                            | hash=b1b26c…6b220a err="insufficient balance for transfer"                                                         | Lỗi này xảy ra khi giao dịch cần xử lý (thường là khai thác) không thể thực hiện được do không đủ số dư trong "tài khoản gửi”(Về mặt lý thuyết, lỗi này xảy ra khi số dư vẫn đủ vào thời điểm giao dịch được tạo và nhập vào txpool, nhưng lại không đủ vào thời điểm thực thi giao dịch thực tế.) | thấp |
| LỖI                                             | ERROR\[06/06,23:23:46 Z] \[7] decode anchor payload err="rlp: expected input list for types.AnchoringDataLegacy" | Bất kỳ loại giá trị nào cũng có thể đưa vào trường dữ liệu Anchoring tx. Tuy nhiên, đầu ra của nút là bản ghi lỗi khi nhập sai loại giá trị                                                                                                                                                        |      |
| Người đề xuất: `Successfully wrote mined block` |                                                                                                                    |                                                                                                                                                                                                                                                                                                    |      |

Không phải người đề xuất `Inserted a new block`

## Ghi bản ghi thay đổi cấp độ (0\~5)

Chuyển đến Bảng điều khiển Klaytn

```
#default Value
> debug.verbosity(3)
# hight detail nhật ký Value
> debug.verbosity(5)
# No Logs Value
> debug.verbosity(0)

# Default Value for Blockchain log
> debug.vmodule("blockchain=3")
# High detail Value for Blockchain Log
> debug.vmodule("blockchain=5")

```
