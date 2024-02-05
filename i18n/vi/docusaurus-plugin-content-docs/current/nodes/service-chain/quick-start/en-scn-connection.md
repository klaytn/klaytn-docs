# Kết nối với Baobab

Phần này trình bày cách kết nối mạng lưới ServiceChain 4 nút của bạn với mạng lưới Baobab.
Bạn sẽ thiết lập EN Baobab và kết nối EN đó với một trong các SCN của bạn. Sau đó, bạn sẽ kích hoạt tính năng neo để đưa thông tin khối ServiceChain vào mạng lưới Baobab.

![](/img/nodes/sc-en-scn-arch.png)

## Điều kiện tiên quyết <a id="prerequisites"></a>

- 1 máy chủ Linux hoặc MacOS cho EN
- Yêu cầu phần cứng tối thiểu cho việc thử nghiệm
  - CPU: 4 nhân (Intel Xeon hoặc tương đương), RAM: 16GB, HDD: 50GB
  - Vui lòng tham khảo [Yêu cầu hệ thống](../system-requirements.md) để biết thêm chi tiết.
- Tải xuống tập tin thực thi EN Baobab. Để biết danh sách đầy đủ các tập tin nhị phân có thể tải về, hãy xem [Tải xuống](../../downloads/downloads.md).
- Giả định và hạn chế
  - Một mạng lưới ServiceChain đã được cài đặt và đang chạy. Vui lòng tham khảo [Thiết lập ServiceChain 4 nút](4nodes-setup-guide.md) để thiết lập mạng lưới.
  - Một EN Baobab.
  - Một EN chỉ có thể kết nối với một SCN vì hệ thống chỉ hỗ trợ kết nối một-một.
  - Mọi SCN không cần phải kết nối với EN.

## Bước 0: Cài đặt EN Baobab <a id="install-baobab-en"></a>

Quá trình cài đặt chính là giải nén gói đã tải xuống. Giải nén tập tin lưu trữ trên mỗi máy chủ EN.

```bash
EN-01$ tar xvf ken-baobab-vX.X.X-XXXXX-amd64.tar.gz
```

## Bước 1: Chuẩn bị genesis.json <a id="step-1-preparing-genesis-json"></a>

Từ máy chủ EN, tải về `genesis.json` cho mạng lưới `Baobab`.

```
EN-01$ curl -X GET https://packages.klaytn.net/baobab/genesis.json -o ~/genesis.json
```

## Bước 2: Khởi tạo nút EN <a id="step-2-en-node-initialization"></a>

Bây giờ, chúng ta sẽ khởi tạo nút EN bằng tệp khởi nguyên. Thực thi các lệnh sau.
Điều này sẽ tạo thư mục dữ liệu lưu trữ dữ liệu chuỗi và bản ghi trên thư mục chủ của bạn.
Bạn có thể thay đổi thư mục dữ liệu bằng lệnh dẫn hướng `--datadir`.

```
EN-01$ ken init --datadir ~/data ~/genesis.json
```

## Bước 3: Định cấu hình nút EN <a id="step-3-configure-the-en-node"></a>

Chuyển đến thư mục cài đặt ken và đổi tên `mv kend_baobab.conf kend.conf`, rồi chỉnh sửa `conf/kend.conf` như sau.

```
...
NETWORK="baobab"
...
SC_MAIN_BRIDGE=1
...
DATA_DIR=~/data
...
```

## Bước 4: Bắt đầu nút EN <a id="step-4-start-the-en-node"></a>

```
EN-01$ kend start
Starting kscnd: OK
```

Bạn có thể kiểm tra trạng thái đồng bộ bằng cách xem `klay.blockNumber`. Nếu số này không phải là 0 thì nút đang hoạt động bình thường. Việc tải về tất cả các khối trên mạng lưới Baobab có thể mất nhiều thời gian tùy thuộc vào điều kiện mạng lưới và hiệu suất phần cứng, vì vậy chúng tôi khuyên bạn nên sử dụng [Đồng bộ nhanh](../../endpoint-node/install-endpoint-nodes.md#fast-sync-optional) để đồng bộ hóa các khối.

```
EN-01$ ken attach --datadir ~/data
> klay.blockNumber
21073
```

Nếu bạn muốn dừng một nút, bạn có thể sử dụng lệnh `kend stop`

## Bước 5: Kiểm tra KNI của nút EN <a id="step-5-check-kni-of-en-node"></a>

Lưu ý KNI của EN-01 là thông tin được sử dụng để kết nối từ nút SCN-L2-01. Giá trị này sẽ được sử dụng trong bước tiếp theo khi tạo `main-bridges.json`.

```
EN-01$ ken attach --datadir ~/data
> mainbridge.nodeInfo.kni
"kni://0f7aa6499553...25bae@[::]:50505?discport=0"
```

![](/img/nodes/sc-en-scn-nodeInfo.png)

## Bước 6: Tạo main-bridges.json <a id="step-6-create-main-bridges-json"></a>

Đăng nhập vào SCN-L2-01 (lưu ý: không phải nút EN-01) và tạo `main-bridges.json` trên `~/data`. Thay thế `[::]` nằm sau chữ cái `@` bằng địa chỉ IP của nút EN-01.

```
SCN-L2-01$ echo '["kni://0f7aa6499553...25bae@192.168.1.1:50505?discport=0"]' > ~/data/main-bridges.json
```

## Bước 7: Định cấu hình SCN rồi Khởi động lại kscn <a id="step-7-configure-scn-then-restart-kscn"></a>

Từ tập lệnh shell của nút SCN-L2-01, hãy chỉnh sửa `kscn-XXXXX-amd64/conf/kscnd.conf`.
Nếu `SC_SUB_BRIDGE` được đặt thành 1, quá trình neo dữ liệu sẽ tự động bắt đầu khi nút SCN-L2-01 bắt đầu. Trong ví dụ này, `SC_PARENT_CHAIN_ID` được đặt thành 1001 vì `chainID` của chuỗi gốc, Baobab, là 1001.
`SC_ANCHORING_PERIOD` là tham số quyết định khoảng thời gian gửi giao dịch neo đến chuỗi chính. Bằng cách đặt giá trị thành 10, bạn đã định cấu hình nút để thực hiện việc neo sau mỗi 10 khối. Giá trị mặc định là 1.

```
...
SC_SUB_BRIDGE=1
...
SC_PARENT_CHAIN_ID=1001
...
SC_ANCHORING_PERIOD=10
...
```

Khởi động lại kscn bằng cách thực hiện lệnh sau:

```
SCN-L2-01$ kscnd stop
Shutting down kscnd: Killed
SCN-L2-01$ kscnd start
Starting kscnd: OK
```

Kiểm tra xem SCN-L2-01 có được kết nối với EN-01 hay không bằng cách kiểm tra `subbridge.peers.length`

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.peers.length
1
```

## Neo  <a id="anchoring"></a>

Sau khi kết thúc kết nối EN-01 và SCN-L2-01, bạn có thể ghi lại thông tin khối ServiceChain trên chuỗi mẹ thông qua Neo.
Trong phần này, bạn sẽ nạp tiền vào tài khoản người vận hành mẹ, bật Neo và kiểm tra số khối được neo.

### Bước 1: Lấy KLAY để thử neo <a id="step-1-get-klay-to-test-anchoring"></a>

Việc neo yêu cầu SCN-L2-01 thực hiện giao dịch neo với Baobab. Vì vậy, tài khoản `subbridge.parentOperator` phải có đủ KLAY để thanh toán phí giao dịch. Lấy KLAY từ [Vòi Ví Baobab](https://baobab.wallet.klaytn.foundation/) và chuyển một số KLAY cho `parentOperator`. Để neo dữ liệu vào dịch vụ thực, `parentOperator` cần có đủ KLAY để thanh toán phí giao dịch.

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.parentOperator
"0x3ce216beeafc62d20547376396e89528e1d778ca"
```

![](/img/nodes/sc-en-scn-faucet.png)

### Bước 2: Bắt đầu neo <a id="step-2-start-anchoring"></a>

Để bắt đầu neo, hãy thực hiện lệnh sau:

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.anchoring(true)
true
```

Sau khi bắt đầu neo, bạn có thể kiểm tra khối mới nhất được neo vào Baobab bằng cách sử dụng `subbridge.latestAnchoredBlockNumber`. Xin lưu ý rằng chỉ có thể làm điều này sau khi EN đã gắn với khối Baobab mới nhất. Theo mặc định, SCN-L2-01 sẽ thử neo trên mọi khối từ khối mà tính năng neo được bật. Có thể đặt khoảng thời gian neo bằng cách thay đổi `SC_ANCHORING_PERIOD`. Nếu giá trị được đặt thành 10, nút sẽ thử neo khi số khối là bội số của 10.

```
SCN-L2-01$ kscn attach --datadir ~/data
> subbridge.latestAnchoredBlockNumber
100
```

![](/img/nodes/sc-en-scn-anchoring.png)
