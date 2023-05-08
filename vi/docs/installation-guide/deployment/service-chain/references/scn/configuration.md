# Cấu hình <a id="configuration"></a>

Trang này giải thích cấu hình của SCN để tạo mạng lưới đồng thuận.

Nếu đã cài đặt phân bổ lưu trữ, bạn có thể thấy nhị phân và tập tin cấu hình trong các thư mục mà bạn trích xuất từ kho lưu trữ. Dưới đây là một ví dụ về thực thi lệnh.
```bash
$ homi-darwin-amd64/bin/homi setup ...
$ kscn-darwin-amd64/bin/kscnd start
$ vi kscn-darwin-amd64/conf/kscnd.conf
```

Trong hướng dẫn này, không phải lúc nào chúng ta cũng chỉ định đường dẫn đầy đủ đến lệnh.

## Tạo một tập tin Genesis <a id="creation-of-a-genesis-file"></a>

Trước tiên, bạn nên tạo tập tin khởi nguyên và khóa nút cho chuỗi dịch vụ của riêng mình. Bạn có thể tạo thêm bằng cách dùng homi như dưới đây.
```bash
$ homi setup local --cn-num 1 --servicechain -o ./homi-output
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

Hãy thay đổi chainID trong tập tin khởi nguyên. Dùng số của chính bạn để đề phòng tấn công lặp lại. (Đừng sử dụng chainID giống nhau với Klaytn Cypress (8217) và Baobab (1001))

Nếu muốn, bạn có thể thay đổi địa chỉ được cấp từ trước bằng cách chỉnh sửa `"alloc"` trong tập tin khởi nguyên. (Bạn có thể xem thêm chi tiết trong [Genesis JSON](../genesis.md).)

## Tạo thư mục dữ liệu SCN <a id="scn-data-directory-creation"></a>

Kích thước của dữ liệu blockchain Klaytn sẽ luôn tăng lên nên cần sử dụng một dung lượng lưu trữ đủ lớn. Bạn có thể tạo thư mục dữ liệu trên đường dẫn bạn muốn. Trong văn bảo này, chúng tôi tạo `~/kscnd_home` như một thư mục dữ liệu.

```bash
$ mkdir -p ~/kscnd_home
```

### Khởi chạy khối khởi nguyên <a id="initialization-of-a-genesis-block"></a>
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

### Cài đặt khóa nút <a id="install_nodekey"></a>
Sao chép `homi-output/keys/nodekey1` vào thư mục `klay` trong thư mục dữ liệu SCN như bên dưới.

```bash
$ cp homi-output/keys/nodekey1  ~/kscnd_home/klay/nodekey
```

## Cấu hình của SCN <a id="configuration-of-the-scn"></a>

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
# Configuration file for the kscnd
...
SC_SUB_BRIDGE=1
...
DATA_DIR=~/kscnd_home
...
```

If you want, you can further modify other options to customize your Service Chain. Otherwise, now you can finish the configuration and you are ready to run the service chain using the default configuration.


