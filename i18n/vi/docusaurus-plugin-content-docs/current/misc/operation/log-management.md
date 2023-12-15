# Ghi bản ghi hoạt động

## Định cấu hình Quay vòng bản ghi

You can enable the log rotation by setting the `--log.rotate` flag, and configure the log rotation settings by the following flags.

- `--log.rotate`: By setting this flag, it enables the log rotation and applies the other log rotation options
- `--log.maxsize`: Specifies the file size in MB that triggers backup file creation
- `--log.maxbackups`: Determines the maximum number of backup files that can be stored. Once this limit is reached, older logs will be deleted.
- `--log.maxage`: Represents the maximum number of days to retain a log file. For example, if set to 30, a backup file will be deleted after 30 days.
- `--log.compress`: By setting this flag, it compresses the backup logs in gz format.

Example
```
./bin/ken ... --log.rotate --log.maxsize 100 --log.maxbackups 10 --log.maxage 30 --log.compress
```
You can also enable and configure the log rotation by setting following options in configuration file (e.g., `kend.conf`).
```
# log rotation related options
LOG_ROTATE=1 # setting 1 to enable the log rotation related options
LOG_MAXSIZE=100 # the unit is MB
LOG_MAXBACKUPS=10
LOG_MAXAGE=30 # maximum number of days to retain a log file
LOG_COMPRESS=1 # setting 1 to compress the backup logs in gz format
```
It is recommended to download and use the package which version is v1.11.0 or higher. You can download it in Binaries section of the release note(e.g., [v1.11.0 release note](https://github.com/klaytn/klaytn/releases/tag/v1.11.0)). Make sure next three files are v1.11.0 or higher: configuration file, daemon, and binary. Otherwise, it won't work.

## Trạng thái bản ghi thông thường

| Loại                                           | Thông báo                                                                                                          | Mô tả                                                                                                                                                                                                                                                                                              |      |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| Lỗi                                             | FastWebsocketHandler fail to upgrade message                                                                       | Vấn đề về phiên bản của kết nối WebSocket                                                                                                                                                                                                                                                          | thấp |
| Lỗi                                             | invalid index of the proposer                                                                                      | Lỗi phát sinh khi nút EN nhận giao dịch từ nút CN                                                                                                                                                                                                                                                  | thấp |
| WARN                                            | ProtocolManager failed to read msg                                                                                 |                                                                                                                                                                                                                                                                                                    | thấp |
| WARN                                            | Failed doConnTypeHandshake                                                                                         |                                                                                                                                                                                                                                                                                                    | low  |
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
