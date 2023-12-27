# Cài đặt ServiceChain

## Đối tượng mục tiêu <a id="intended-audience"></a>

- Các công ty muốn xây dựng blockchain cho Metaverse, GameFi và NFT
- Nhà phát triển dApp cần TPS cao, phí giao dịch tối thiểu và quyền riêng tư dữ liệu.
- Bất kỳ ai muốn xây dựng mạng lưới riêng tư cục bộ hoặc cơ sở dữ liệu sổ cái để thử nghiệm.

## Tổng quan về ServiceChain <a id="service-chain-overview"></a>

ServiceChain là một blockchain cấp doanh nghiệp để đáp ứng các yêu cầu của công ty như chuyển giá trị, bảo mật, hiệu suất cao và tùy chỉnh. ServiceChain Klaytn cung cấp các tính năng sau:

- Tính hoàn thiện tức thời
- Chuyển token giữa các chuỗi Klaytin
- Neo dữ liệu vào chuỗi chính để đảm bảo tính toàn vẹn của dữ liệu
- Hợp đồng cầu nối đa chữ ký để đáp ứng các yêu cầu bảo mật cấp doanh nghiệp

![](/img/nodes/sc-overview.png)


Đọc [Giải pháp mở rộng Klaytn](../../learn/scaling-solutions.md) để biết thêm chi tiết về ServiceChain. Các video sau đây sẽ giúp bạn hiểu rõ hơn về ServiceChain Klaytn.

- [Mở rộng quy mô theo chiều ngang thông qua Chuỗi dịch vụ trên Klaytn | TXGX 2019](https://www.youtube.com/watch?v=8yQc5FQysJc)
- [Kiến trúc có tính khả dụng cao của Chuỗi dịch vụ Klaytn | TXGX 2019](https://www.youtube.com/watch?v=HcdhWtXPuR0)

## Tải xuống <a id="download"></a>

Bạn có thể nhận các gói cho SCN, SPN và SEN tại [trang tải về](../downloads/downloads.md).

## Hướng dẫn cài đặt <a id="installation-guide"></a>

Chương này giải thích về việc cài đặt **Nút đồng thuận chuỗi dịch vụ\(SCN\)**.

### Phân bổ lưu trữ Linux <a id="linux-archive-distribution"></a>

Tập tin lưu trữ cho nút đồng thuận chuỗi dịch vụ có bố cục thư mục như sau.

| Tên tập tin     | Mô tả tập tin                     |
|:--------------- |:--------------------------------- |
| bin/kscn        | Tập tin thực thi SCN              |
| bin/kscnd       | Tập tin lệnh bắt đầu/kết thúc SCN |
| conf/kscnd.conf | Tập tin cấu hình SCN              |

Tập tin lưu trữ cho nhị phân homi có bố cục thư mục như sau.

| Tên tập tin | Mô tả tập tin         |
|:----------- |:--------------------- |
| bin/homi    | Tập tin thực thi HOMI |

Quá trình cài đặt chính là giải nén gói đã tải xuống.

```text
$ tar zxf kscn-vX.X.X-XXXXX-amd64.tar.gz
$ tar zxf homi-vX.X.X-XXXXX-amd64.tar.gz
```

### Phân bổ RPM \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

Bạn có thể cài đặt RPM đã tải về với lệnh `yum` sau đây.

```text
$ yum install kscnd-vX.X.X.el7.x86_64.rpm
$ yum install homi-vX.X.X.el7.x86_64.rpm
```

### Vị trí đã cài đặt <a id="scn-configuration"></a>

Gói Linux Klaytn bao gồm nhị phân thực thi và tập tin cấu hình có cấu trúc như sau.

| Tên tập tin | Vị trí                     |
|:----------- |:-------------------------- |
| kscn        | /usr/bin/kscn              |
| kscnd.conf  | /etc/kscnd/conf/kscnd.conf |
| homi        | /usr/bin/homi              |

## Cấu hình <a id="configuration"></a>

Trang này giải thích cấu hình của SCN để tạo mạng lưới đồng thuận.

Nếu đã cài đặt phân bổ lưu trữ, bạn có thể thấy nhị phân và tập tin cấu hình trong các thư mục mà bạn trích xuất từ kho lưu trữ. Dưới đây là một ví dụ về thực thi lệnh.
```bash
$ homi-darwin-amd64/bin/homi setup ...
$ kscn-darwin-amd64/bin/kscnd start
$ vi kscn-darwin-amd64/conf/kscnd.conf
```

Trong hướng dẫn này, không phải lúc nào chúng ta cũng chỉ định đường dẫn đầy đủ đến lệnh.

### Tạo một tập tin Genesis (Khởi nguyên) <a id="creation-of-a-genesis-file"></a>

Trước tiên, bạn nên tạo tập tin khởi nguyên và tập tin khóa nút cho chuỗi dịch vụ của riêng mình. Bạn có thể tạo thêm bằng cách dùng homi như dưới đây.
```bash
$ homi setup --gen-type local --cn-num 1 --servicechain -o ./homi-output
Created :  homi-output/keys/passwd1
Created :  homi-output/scripts/genesis.json
Created :  homi-output/keys/nodekey1
Created :  homi-output/keys/validator1
Created :  homi-output/scripts/static-nodes.json
Created :  homi-output/Klaytn.json
Created :  homi-output/Klaytn_txpool.json
```

Dưới đây là các ví dụ về tập tin khởi nguyên và khóa nút.
```bash
$ cat homi-output/scripts/genesis.json
{
    "config": {
        "chainId": 1000,
        "istanbul": {
            "epoch": 3600,
            "policy": 0,
            "sub": 22
        },
        "unitPrice": 0,
        "deriveShaImpl": 2,
        "governance": null
    },
    "timestamp": "0x5dca0732",
    "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000f85ad594f8690562c0839c44b17af421f7aaaa9f12dcc62bb8410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0",
    "governanceData": null,
    "blockScore": "0x1",
    "alloc": {
        "f8690562c0839c44b17af421f7aaaa9f12dcc62b": {
            "balance": "0x2540be400"
        }
    },
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}   
```

```bash      
$ cat homi-output/keys/nodekey1                                                                                                                                 
0c28c77ce5c2ca9e495b860f190ed7dfe7bd5c1a2e5f816587eb4d3d9566df44
```

Hãy thay đổi chainID trong tập tin khởi nguyên. Dùng số của chính bạn để đề phòng tấn công phát lại. (Không sử dụng chainID giống nhau với Klaytn Cypress (8217) và Baobab (1001))

Nếu muốn, bạn có thể thay đổi địa chỉ được cấp từ trước bằng cách chỉnh sửa `"alloc"` trong tập tin khởi nguyên. (Bạn có thể xem thêm chi tiết trong [JSON KHỞI NGUYÊN](../service-chain/configure/genesis.md).)

### Tạo thư mục dữ liệu SCN <a id="scn-data-directory-creation"></a>

Kích thước của dữ liệu blockchain Klaytn sẽ luôn tăng lên nên cần sử dụng một dung lượng lưu trữ đủ lớn. Bạn có thể tạo thư mục dữ liệu trên đường dẫn bạn muốn. Trong văn bản này, chúng ta tạo `~/kscnd_home` như một thư mục dữ liệu.

```bash
$ mkdir -p ~/kscnd_home
```

#### Khởi chạy khối khởi nguyên <a id="initialization-of-a-genesis-block"></a>
Sau đó, bạn có thể khởi tạo thư mục dữ liệu với tập tin khởi nguyên. Trước khi bắt đầu một nút chuỗi dịch vụ, cần sử dụng `kscn` và `genesis.json` để khởi chạy khối khởi nguyên của mạng lưới chuỗi dịch vụ.

```bash
$ kscn init --datadir ~/kscnd_home homi-output/scripts/genesis.json
  WARN[11/12,10:13:58 +09] [19] Some input value of genesis.json have been set to default or changed
  INFO[11/12,10:13:58 +09] [18] Setting connection type                   nodetype=cn conntype=0
    ...
  INFO[11/12,10:13:59 +09] [5] Using DeriveShaConcat!
  INFO[11/12,10:13:59 +09] [5] Writing custom genesis block
  INFO[11/12,10:13:59 +09] [5] Using DeriveShaConcat!
  INFO[11/12,10:13:59 +09] [47] Persisted trie from memory database       updated nodes=1 updated nodes size=80.00B time=304.931µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
  INFO[11/12,10:13:59 +09] [19] Successfully wrote genesis state          database=lightchaindata hash=0xc269669079fc8c06ac37435a563b8ed8ef273c1c835f3d823d2e586315319aa8
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/header
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/body
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/receipts
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/0
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/1
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/2
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/statetrie/3
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/txlookup
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/misc
  INFO[11/12,10:13:59 +09] [46] Database closed                           path=/Users/ethan/kscnd_home/klay/lightchaindata/bridgeservice
```

#### Cài đặt khóa nút <a id="install_nodekey"></a>
Sao chép `homi-output/keys/khóa nút1` vào thư mục `klay` trong thư mục dữ liệu SCN như bên dưới.

```bash
$ cp homi-output/keys/nodekey1  ~/kscnd_home/klay/nodekey
```

### Cấu hình của SCN <a id="configuration-of-the-scn"></a>

`kscnd.conf` là tập tin cấu hình cho SCN.

Giả định rằng SCN sử dụng cổng mặc định và liên kết một vùng có quy mô lớn vào `~/kscnd_home`. Trong tập tin `kscnd.conf` mặc định, tùy chọn `SC_SUB_BRIDGE` bị vô hiệu hóa và `DATA_DIR` đang trống.
```
# Tập tin cấu hình cho kscnd
...
SC_SUB_BRIDGE=0
...
DATA_DIR=
...
```

Bạn có thể bật `SC_SUB_BRIDGE` để sử dụng tính năng Neo/ Chuyển giá trị. Bạn cũng nên đặt DATA_DIR như dưới đây.

```
# Tập tin cấu hình cho kscnd
...
SC_SUB_BRIDGE=1
...
DATA_DIR=~/kscnd_home
...
```

Nếu muốn, bạn có thể sửa đổi thêm các tùy chọn khác để tùy chỉnh ServiceChain của mình. Nếu không, bạn có thể hoàn tất cấu hình ngay bây giờ và dùng cấu hình mặc định để chạy chuỗi dịch vụ.

## Bắt đầu/dừng SCN <a id="starting-stopping-scn"></a>

Tùy thuộc vào loại cài đặt của bạn, bạn có thể bắt đầu/dừng dịch vụ Klaytn bằng lệnh `systemctl` hoặc `kscnd` như sau.

**bắt đầu**

```bash
## khi cài đặt từ phân bổ rpm 
$ systemctl start kscnd.service

## khi cài đặt bằng lưu trữ linux
$ kscnd start

```

**dừng**

```bash
## khi cài đặt từ phân bổ rpm 
$ systemctl stop kscnd.service

## khi cài đặt bằng lưu trữ linux
$ kscnd stop

```

**trạng thái**

```bash
## khi cài đặt từ phân bổ rpm 
$ systemctl trạng thái kscnd.service

## khi cài đặt bằng lưu trữ linux
$ kscnd trạng thái

```

## Kiểm tra trạng thái nút <a id="checking-node-status"></a>

### Tình trạng xử lý <a id="process-status"></a>

Có thể kiểm tra trạng thái quy trình của SCN bằng các lệnh trạng thái `systemctl` và `kscnd`.

#### systemctl <a id="systemctl"></a>

`systemctl` được cài đặt cùng với RPM, có thể kiểm tra trạng thái của SCN như sau.

```bash
$ systemctl trạng thái kscnd.service
● kscnd.service - (null)
   Loaded: loaded (/etc/rc.d/init.d/kscnd; bad; vendor preset: disabled)
   Active: active (running) since Wed 2019-01-09 11:42:39 UTC; 1 months 4 days ago
     Docs: man:systemd-sysv-generator(8)
  Process: 29636 ExecStart=/etc/rc.d/init.d/kscnd start (code=exited, trạng thái=0/SUCCESS)
 Main PID: 29641 (kscn)
   CGroup: /system.slice/kscnd.service
           └─29641 /usr/local/bin/kscn --networkid 1000 --datadir ~/kscnd_home --port 32323 --srvtype fasthttp --metrics --prometheus --verbosity 3 --txpool.global...

Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Starting (null)...
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal kscnd[29636]: Starting kscnd: [  OK  ]
Jan 09 11:42:39 ip-10-11-2-101.ap-northeast-2.compute.internal systemd[1]: Started (null).
```

Bạn có thể kiểm tra trạng thái hiện tại như `Active: active (running)` trong ví dụ bên dưới.

#### kscnd <a id="kscnd"></a>

`kscnd` được cài đặt cùng với gói; trạng thái của SCN có thể được kiểm tra như sau.

```bash
$ kscnd trạng thái
kscnd đang chạy
```

### Nhật ký <a id="logs"></a>

Nhật ký được lưu trữ trong tập tin `kscnd.out` được đặt tại đường dẫn xác định trong trường `LOG_DIR` của tập tin `kscnd.conf`. Khi nút hoạt động bình thường, bạn có thể thấy rằng mỗi khối được nhập theo từng giây như sau.

Ví dụ:

```bash
$ tail -F ~/kscnd_home/nhật ký/kscnd.out
  INFO[11/12,10:19:09 +09] [49] Khối đào đã được ghi thành công            num=11 hash=03da06…f194b0 txs=0
  INFO[11/12,10:19:09 +09] [49] Cam kết công việc đào mới                    number=12 txs=0 elapsed=236.972µs
  INFO[11/12,10:19:10 +09] [24] Đã cam kết                                 number=12 hash=470aca…be4fdf address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
  INFO[11/12,10:19:10 +09] [49] Khối mới đã niêm phong thành công             number=12 hash=470aca…be4fdf
  INFO[11/12,10:19:10 +09] [49] Khối đào đã được ghi thành công            num=12 hash=470aca…be4fdf txs=0
  INFO[11/12,10:19:10 +09] [49] Cam kết công việc đào mới                    number=13 txs=0 elapsed=198.221µs
  INFO[11/12,10:19:11 +09] [24] Đã cam kết                                 number=13 hash=95e4a3…14e50f address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
  INFO[11/12,10:19:11 +09] [49] Khối mới đã niêm phong thành công             number=13 hash=95e4a3…14e50f
  INFO[11/12,10:19:11 +09] [49] Khối đào đã được ghi thành công            num=13 hash=95e4a3…14e50f txs=0
  INFO[11/12,10:19:11 +09] [49] Cam kết công việc đào mới                    number=14 txs=0 elapsed=220.004µs
  INFO[11/12,10:19:12 +09] [24] Đã cam kết                                 number=14 hash=dcd2bc…b2aec0 address=0xf8690562c0839C44B17AF421F7AaaA9F12dCc62b
```

### Truy vấn <a id="queries"></a>

#### kscn console <a id="kscn-console"></a>

Klaytn cung cấp một máy khách CLI: `kscn console`. Một cách khác để sử dụng máy khách là kết nối với quy trình thông qua IPC (giao tiếp giữa các quy trình). Tập tin IPC `klay.ipc` được đặt tại thư mục `data` trên một SCN.

Hãy thực hiện lệnh sau và kiểm tra kết quả.

```text
$ kscn attach ~/kscnd_home/klay.ipc
Chào mừng bạn đến với bảng điều khiển Klaytn JavaScript!

phiên bản: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
tại khối: 11573551 (thứ Tư ngày 13/02/2019 lúc 07:12:52 UTC)
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 >
```

Bạn có thể kiểm tra các lệnh có thể sử dụng trên [Tài liệu API](../../references/json-rpc/json-rpc.md)

Các API hữu ích để kiểm tra trạng thái của SCN:

* `klay.blockNumber` (để lấy số khối mới nhất)
* `net.peerCount` (để lấy số nút Klaytn được kết nối hiện tại)

#### klay.blockNumber <a id="klay-blocknumber"></a>

Bạn có thể lấy số khối mới nhất để xem các khối có được truyền đúng cách không.

```text
> klay.blockNumber
11573819
```

#### net.peerCount <a id="net-peercount"></a>

```text
> net.peerCount
4
```

Dòng lệnh trên trả lại số nút mà SCN kết nối, ngoại trừ EN trong chuỗi chính.