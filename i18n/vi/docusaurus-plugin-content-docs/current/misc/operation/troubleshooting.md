# Khắc phục sự cố

## Tôi có thể tìm tập tin bản ghi cho nút Klaytn đang chạy bằng gói nhị phân Klaytn ở đâu? <a id="where-can-i-find-a-log-file-for-the-running-klaytn-node-using-the-klaytn-binary"></a>

**Trả lời**

Bạn có thể tìm thấy tập tin bản ghi trong thư mục dữ liệu. Ví dụ: Vị trí mặc định của bản ghi cho `kcnd` là `/var/log/kcnd/kcnd.out` khi bạn cài đặt gói RPM `kcnd`.

## Nút Klaytn không kết nối được với mạng nếu có thông báo lỗi `Giao thức istanbul/64 failed` và `Genesis block mismatch` như bên dưới. <a id="klaytn-node-can-not-connect-to-network-with-protocol-istanbul-64-failed-and-gene"></a>

```
ERROR[01/27,17:11:33 +09] [33] Protocol istanbul/64 failed               id=b10697e43d4f8e30 conn=staticdial err="Genesis block mismatch - 81cf117d44f99b21 (!= 74647b98b9f06cb4)"
```

**Trả lời**

Lỗi này có thể phát sinh khi `genesis.json` thay đổi. Vui lòng dừng nút Klaytn và xóa thư mục dữ liệu. Sau đó, chạy lại `ken init` bằng cách sử dụng đúng `genesis.json` như bên dưới.

Ví dụ: Khi thư mục dữ liệu là `/var/kend/data`.
```
sudo kend stop
sudo rm -rf /var/kend/data
sudo ken init --datadir /var/kend/data genesis.json
sudo kend start
```


## Không thể triển khai hợp đồng thông minh bằng cách sử dụng Truffle nếu có thông báo lỗi như sau. <a id="can-t-deploy-smart-contract-using-truffle-with-following-error-message"></a>

```
Error: Returned error: The method net_version does not exist/is not available
    at Object.ErrorResponse (/usr/local/lib/node_modules/truffle/build/webpack:/~/web3-eth/~/web3-core-helpers/src/errors.js:29:1)
    at /usr/local/lib/node_modules/truffle/build/webpack:/~/web3-eth/~/web3-core-requestmanager/src/index.js:140:1
    at /usr/local/lib/node_modules/truffle/build/webpack:/packages/truffle-provider/wrapper.js:112:1
    at XMLHttpRequest.request.onreadystatechange (/usr/local/lib/node_modules/truffle/build/webpack:/~/web3/~/web3-providers-http/src/index.js:96:1)
    at XMLHttpRequestEventTarget.dispatchEvent (/usr/local/lib/node_modules/truffle/build/webpack:/~/xhr2-cookies/dist/xml-http-request-event-target.js:34:1)
    at XMLHttpRequest._setReadyState (/usr/local/lib/node_modules/truffle/build/webpack:/~/xhr2-cookies/dist/xml-http-request.js:208:1)
    at XMLHttpRequest._onHttpResponseEnd (/usr/local/lib/node_modules/truffle/build/webpack:/~/xhr2-cookies/dist/xml-http-request.js:318:1)
    at IncomingMessage.<anonymous> (/usr/local/lib/node_modules/truffle/build/webpack:/~/xhr2-cookies/dist/xml-http-request.js:289:47)
    at IncomingMessage.emit (events.js:194:15)
    at endReadableNT (_stream_readable.js:1125:12)
    at process._tickCallback (internal/process/next_tick.js:63:19)
```

**Trả lời**

Kích hoạt `net` và API khác cho bảng điều khiển RPC bằng cách chỉnh sửa tập tin `kend.conf` như dưới đây.

```
RPC_API="admin,debug,klay,miner,net,personal,rpc,txpool,web3" # available apis: admin,debug,klay,miner,net,personal,rpc,txpool,web3
```
Sau khi cập nhật `kend.conf`, khởi động lại nút Klaytn.


## Không khởi động được nút Klaytn nếu có lỗi `Unit not found` như dưới đây sau khi cài đặt gói nhị phân. <a id="can-t-start-klaytn-node-with-unit-not-found-error-as-below-after-installing-bina"></a>

```
Không thể bắt đầu kcnd.service: Không tìm thấy đơn vị.
```

**Trả lời**

Vui lòng tải lại daemon như dưới đây.

```
sudo systemctl daemon-reload
```

## CN không kết nối được với mạng nếu có thông báo bản ghi `Add dial candidate from static nodes`. <a id="cn-can-t-connect-to-network-with-add-dial-candidate-from-static-nodes-log-messag"></a>

```
INFO[02/20,12:35:34 Z] [21] [Dial] Add dial candidate from static nodes  id=7eaa1e3136fd16a3 addr=13.209.225.108:32323
...
INFO[02/20,12:35:38 Z] [21] [Dial] Add dial candidate from static nodes  id=7eaa1e3136fd16a3 addr=13.209.225.108:32323
```

**Trả lời**

Điều này có thể xảy ra khi `genesis.json` và thông tin khóa nút/nút xác thực khác nhau. Vui lòng kiểm tra lại khóa nút/nút xác thực và tập tin `genesis.json`.

## Không thể khởi động nút Klaytn nếu có thông báo bản ghi lỗi như sau. <a id="klaytn-node-can-t-start-with-following-error-log-message"></a>

```
Fatal: Error starting protocol stack: listen unix /Users/username/some_directory/more_directories/klaytn/klaytn_client/my_test_klaytn/data/dd/klay.ipc: bind: invalid argument
```

**Trả lời**

Nếu bạn thấy thông báo lỗi tập hợp giao thức ở trên trong tập tin bản ghi, điều đó có nghĩa là Klaytn không khởi động được do tên đường dẫn đầy đủ đến thư mục hiện tại quá dài. Vui lòng khởi chạy nút Klaytn với thư mục dữ liệu đầy đủ ngắn hơn. Độ dài tối đa cho phép của tên đường dẫn phụ thuộc vào hệ điều hành.


## EN không thể kết nối với CC nếu có thông báo bản ghi như sau. <a id="en-can-t-connect-to-cc-with-following-log-message"></a>

```
ERROR[01/28,06:20:07 Z] [23] Protocol istanbul/64 failed id=845f596536450bad conn=staticdial err="InvalidPeerHierarchy - (PeerIsOnParentChain:false) == (OnChildChain:false)"
```

**Trả lời**

Điều này có thể xảy ra khi khối khởi tạo của chuỗi chính và chuỗi dịch vụ khác nhau. Vui lòng đảm bảo khối khởi tạo của hai chuỗi giống nhau.

## Lỗi thiếu trạng thái tiêu đề <a id="head-state-missing-error"></a>

```
"ERROR[06/21,14:35:16 +09] [5] Head state missing, repairing chain       number=2955620 hash=66bba2…e15f8d
Fatal: Error starting protocol stack: rewound to block number 0, but repair failed"
```

**Trả lời** Do vấn đề tương thích, chúng tôi khuyên bạn nên cập nhật nhị phân của EN lên v0.9.6 nếu bạn vẫn đang chạy EN ở các phiên bản cũ (`<=` v0.8.2). Nếu đây là lần đầu bạn cập nhật EN lên v0.9.x và muốn di chuyển dữ liệu từ phiên bản cũ hơn, bạn phải chỉ định tùy chọn `ADDITIONAL="--db.num-statetrie-partitions 1"` trong tập tin cấu hình khi cài đặt phiên bản mới hơn.
