# Cấu hình cầu nối

Trong trang này, chúng ta sẽ mô tả các bước để kết nối Chuỗi dịch vụ với Chuỗi chính.

## Cấu hình EN - Kích hoạt Cầu nối chính <a id="en-configuration-enable-main-bridge"></a>

Bạn nên kích hoạt cầu nối chính bằng cách định cấu hình `kend.conf`.

### Cập nhật Tập tin cấu hình <a id="update-the-configuration-file"></a>

`kend.conf` có các thuộc tính cầu nối chính sau đây.

| Tên                                                            | Mô tả                                                                                                                                             |
| :------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| MAIN_BRIDGE                               | Kích hoạt dịch vụ cầu nối làm cầu nối chính cho chuỗi dịch vụ. 1 để kích hoạt.                                    |
| MAIN_BRIDGE_PORT     | Cổng nghe cầu nối. Mặc định: 50505                                                                                |
| MAIN_BRIDGE_INDEXING | Cho phép lập chỉ mục hàm băm giao dịch chuỗi dịch vụ để truy cập nhanh vào dữ liệu chuỗi dịch vụ. 1 để kích hoạt. |

Để kích hoạt cầu nối chính trên EN, bạn hãy thực hiện như bên dưới.

- xác định `MAIN_BRIDGE`
- bật RPC/WS.
- thêm API `mainbridge` cho RPC như ví dụ bên dưới.

```text
# Configuration file for the kend

...

# rpc options setting
RPC_ENABLE=1 # if this is set, the following options will be used
RPC_API="klay,mainbridge" # available apis: admin,debug,klay,miner,net,personal,rpc,txpool,web3,mainbridge,subbridge
RPC_PORT=8551
RPC_ADDR="0.0.0.0"
RPC_CORSDOMAIN="*"
RPC_VHOSTS="*"

# ws options setting
WS_ENABLE=1 # if this is set, the following options will be used
WS_API="klay" 
WS_ADDR="0.0.0.0"
WS_PORT=8552
WS_ORIGINS="*"

...

# service chain options setting
MAIN_BRIDGE=1
MAIN_BRIDGE_PORT=50505
MAIN_BRIDGE_INDEXING=1

...
```

## Kết nối SCN với Chuỗi chính <a id="connect-scn-to-the-main-chain"></a>

Bạn cần chạy EN của chuỗi chính như cầu nối chính. Đồng thời, bạn cũng nên xác định SCN (Nút đồng thuận chuỗi dịch vụ) nào sẽ được dùng làm cầu nối con để kết nối với EN.

### Kiểm tra thông tin EN (Cầu nối chính) <a id="check-en-(main-bridge)-information"></a>

#### Mở Bảng điều khiển EN <a id="open-en-console"></a>

Có nhiều cách khác nhau để gắn vào quy trình EN. Bạn có thể kiểm tra các lệnh có thể sử dụng trên [lệnh ken CLI](../../../nodes/endpoint-node/ken-cli-commands.md). Trang này giải thích cách gắn vào quy trình thông qua IPC (giao tiếp giữa các quy trình). Tập tin IPC `klay.ipc` được đặt tại thư mục dữ liệu trên nút.

Hãy thực hiện lệnh sau và kiểm tra kết quả. (Nếu bạn đã thêm API `mainbridge` cho RPC, bạn có thể kiểm tra API cầu nối như bên dưới. Nếu không có API `mainbridge`, bạn nên kiểm tra lại [Cấu hình EN - Kích hoạt cầu nối chính](#en-configuration-enable-main-bridge). )

```bash
$ ken attach ~/kend_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
at block: 11573551 (Wed, 13 Feb 2019 07:12:52 UTC)
 datadir: ~/kend_home
 modules: admin:1.0 mainbridge:1.0 debug:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0
 >
```

#### Lấy KNI của EN <a id="get-the-ens-kni"></a>

Sau khi gắn với quy trình qua IPC, bạn có thể kiểm tra KNI cầu nối chính của EN như bên dưới. You can refer to [Service Chain API](../../../references/json-rpc/subbridge/add-peer).

```javascript
> mainbridge.nodeInfo
{
  kni: "kni://08b99d2297e0a27ddeb33f3a81b59ea1c065b9adbaff9fefab0d16f65b1a8db22939a104c24447e9aca521c158922ca912476b544baf48995a382d88886e0a37@[::]:50505?discport=0",
  id: "08b99d2297e0a27ddeb33f3a81b59ea1c065b9adbaff9fefab0d16f65b1a8db22939a104c24447e9aca521c158922ca912476b544baf48995a382d88886e0a37",
  ip: "::",
  listenAddr: "[::]:50505",
  name: "-2",
  ports: {
    discovery: 0,
    listener: 50505
  },
  protocols: {
    servicechain: {
      config: {
        chainId: 2018,
        deriveShaImpl: 0,
        isBFT: true,
        istanbul: {...},
        unitPrice: 0
      },
      difficulty: 87860,
      genesis: "0x711ce9865492659977abb2758d29f68c2b0c82862d9376f25953579f64f95b58",
      head: "0x0d4b130731f1e7560e4531ac73d55ac8c6daccb178abd86af0d96b7aafded7c5",
      network: 1
    }
  }
}
```

Bạn nên ghi lại `kni` cầu nối chính.

### Kết nối với Chuỗi chính <a id="connect-to-the-main-chain"></a>

#### Mở Bảng điều khiển SCN <a id="open-scn-console"></a>

Gắn với quy trình SCN như bên dưới. Bạn nên bật sẵn API `subbridge` cho RPC, bạn có thể tìm thấy mô-đun cầu nối con trong đầu ra. Nếu không có API `subbridge`, bạn nên kiểm tra lại [Cấu hình SCN](../install-service-chain.md#configuration-of-the-scn).

```bash
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0
 >
```

#### Kết nối SCN với EN <a id="connect-scn-with-en"></a>

Bạn có thể thêm EN ngang hàng trên SCN thông qua IPC như bên dưới. kni là KNI của EN mà bạn đã ghi lại trước đó.

```javascript
 > subbridge.addPeer("kni://08b99d2297e0a27ddeb33f3a81b59ea1c065b9adbaff9fefab0d16f65b1a8db22939a104c24447e9aca521c158922ca912476b544baf48995a382d88886e0a37@[::]:50505?discport=0")
 true
```

Sau đó, bạn có thể kiểm tra các nút ngang hàng được kết nối như bên dưới.

```javascript
 > subbridge.peers
 [{
     caps: ["servicechain/1"],
     id: "08b99d2297e0a27ddeb33f3a81b59ea1c065b9adbaff9fefab0d16f65b1a8db22939a104c24447e9aca521c158922ca912476b544baf48995a382d88886e0a37",
     name: "-1",
     networks: [{
         inbound: false,
         localAddress: "[::1]:56834",
         remoteAddress: "[::1]:50505",
         static: true,
         trusted: false
     }],
     protocols: {
       servicechain: {
         head: "0x47be444be87daaee2989998559049ee8a859540807824dd1db4a80ea6cb42293",
         version: 1
       }
     }
 }]
```
