# Nâng cấp & Nâng cấp căn bản

Klaytn và ServiceChain của nền tảng đã liên tục phát hành các phiên bản mới để phát triển các tính năng mới và sửa lỗi. Trang này là hướng dẫn nâng cấp nhị phân ServiceChain và đặt số khối hard fork cho ServiceChain của bạn.

## Nâng cấp <a href="#upgrade" id="upgrade"></a>

Phần này cho biết cách nâng cấp nhị phân ServiceChain.

**LƯU Ý** Việc nâng cấp nhị phân ServiceChain có thể không thể đảo ngược và không tương thích ngược, nghĩa là bạn không thể hạ về phiên bản cũ hơn. Tham khảo lưu ý cho bản phát hành để biết thêm chi tiết. Ví dụ: [lưu ý cho bản phát hành Klaytn v1.9.0](https://medium.com/klaytn/klaytn-v1-9-0-release-notes-medium-58e4644f7544) cho biết:

> LƯU Ý: Phiên bản này cập nhật phiên bản cơ sở dữ liệu để hỗ trợ việc đồng bộ thu thập dữ liệu. Bạn không thể quay lại các phiên bản cũ hơn với dữ liệu hiện có sau khi cập nhật lên v1.9.0.

Bạn có thể tải phiên bản mới nhất của nhị phân Klaytn và ServiceChain bằng một trong các liên kết bên dưới:

* [Tài liệu của Klaytn](../downloads/downloads.md)
* [Kho lưu trữ Github Klaytn](https://github.com/klaytn/klaytn/releases)

Để nâng cấp nhị phân ServiceChain, hãy dừng nút ServiceChain và thay thế nhị phân. Ví dụ: bạn có thể sử dụng các lệnh bên dưới để dừng nút SCN và thay thế bằng nhị phân mới hơn.

```bash
$ kscnd stop
Shutting down kscnd: OK
$ cp /path/to/new/kscn /path/to/original/kscn
```

Bạn có thể khởi động lại nút ServiceChain sau khi nâng cấp. Tuy nhiên, nếu bạn dự định kích hoạt hard fork trong ServiceChain, bạn phải giữ các nút ServiceChain ở trạng thái ngừng hoạt động. Tham khảo [Hard Fork](#hard-fork) để tìm hiểu hướng dẫn về Hard Fork ServiceChain.

```bash
$ kscnd start
```

## Hard Fork <a href="#hard-fork" id="hard-fork"></a>

Phần này mô tả các bước áp dụng [hard fork](../../misc/klaytn-history.md) Klaytn cho ServiceChain.

Để áp dụng Hard Fork cho ServiceChain, bạn cần:

1. Chọn một số khối thích hợp cho hard fork
2. Nâng cấp nhị phân ServiceChain lên phiên bản hỗ trợ hard fork
3. Đặt số khối Hard Fork trong ServiceChain

### 1. Chọn một số khối thích hợp cho hard fork <a href="#1-pick-an-appropriate-block-number-for-the-hard-fork" id="1-pick-an-appropriate-block-number-for-the-hard-fork"></a>

Trong bảng điều khiển Javascript của ServiceChain, bạn có thể kiểm tra số khối hiện tại như ở bên dưới.

```bash
$ kscn attach ~/kscnd_home/klay.ipc
Chào mừng bạn đến với bảng điều khiển Klaytn JavaScript!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> klay.blockNumber
1234
```

Bây giờ, bạn phải chọn một số khối thích hợp để kích hoạt hard fork. Đảm bảo có đủ số khối (được tạo ra mỗi giây) giữa khối hiện tại và khối hard fork.

### 2. Nâng cấp nhị phân ServiceChain <a href="#2-upgrade-the-servicechain-binary" id="2-upgrade-the-servicechain-binary"></a>

Tham khảo phần [Nâng cấp](#upgrade) trong trang này để xem hướng dẫn nâng cấp nhị phân ServiceChain. Đảm bảo giữ cho các nút ServiceChain tạm ngừng hoạt động (hoặc tắt) vào thời điểm này. Bạn sẽ khởi động lại chúng sau khi đã đặt số khối hard fork.

### 3. Đặt số khối hard fork <a href="#3-set-the-hard-fork-block-number" id="3-set-the-hard-fork-block-number"></a>

Nếu bạn đã nâng cấp nhị phân ServiceChain với phiên bản hỗ trợ hard fork mà bạn muốn, bạn có thể đặt số khối hard fork trong ServiceChain bằng cách khởi tạo lại cấu hình chuỗi với khởi nguyên được cập nhật.

#### Cập nhật khởi nguyên và khởi tạo lại cấu hình chuỗi cho tất cả các nút ServiceChain <a href="#update-genesis-and-re-initialize-chain-config-for-all-servicechain-nodes" id="update-genesis-and-re-initialize-chain-config-for-all-servicechain-nodes"></a>

Đầu tiên, chỉ định số hard fork trong trường `config` của `genesis.json`. Ví dụ: nếu bạn đang cố gắng kích hoạt hard fork Magma trong ServiceChain của mình, bạn nên chỉ định trường `magmaCompatibleBlock` trong `config` của khởi nguyên, như bên dưới.

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    ...
    "magmaCompatibleBlock": 1500,
    ...
  },
  ...
}
```

Để kích hoạt hard fork trong cấu hình chuỗi, các hard fork trước đó phải được kích hoạt. Nghĩa là, để kích hoạt hard fork Magma, bạn phải kích hoạt hard fork EthTxType từ trước đó. Nếu các trường cho số khối tương thích của các hard fork trước đó trong cấu hình chuỗi bị thiếu, bạn cũng phải thêm vào.

Ví dụ: nếu bạn muốn đặt số khối hard fork Magma và nếu `genesis.json` của bạn không có `ethTxTypeCompatibleBlock` trong trường `config` như bên dưới:

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    "londonCompatibleBlock": 0,
    "istanbul": {
      "epoch": 3600,
      "policy":0,
      "sub":21
    },
    ...
  }
}
```

Bạn cũng phải thêm cả `ethTxTypeCompatibleBlock` khi thêm `magmaCompatibleBlock` vào trường `config`, như bên dưới.

```json
{
  "config": {
    "chainId": 1000,
    "istanbulCompatibleBlock": 0,
    "londonCompatibleBlock": 0,
    "ethTxTypeCompatibleBlock": 1500,
    "magmaCompatibleBlock": 1500,
    "istanbul": {
      "epoch": 3600,
      "policy":0,
      "sub":21
    },
    ...
  }
}
```

Bạn có thể tìm thấy lịch sử hard fork của Klaytn trong [Tài liệu Klaytn](../../misc/klaytn-history.md).

Nếu bạn đã cập nhật `genesis.json` với các hard fork mà bạn muốn, hãy khởi tạo lại cấu hình chuỗi và áp dụng thay đổi.

```bash
$ kscn --datadir /path/to/data/directory init /path/to/genesis.json
```

**LƯU Ý** Nhật ký lỗi sau được in khi bạn khởi tạo lại cấu hình chuỗi là điều bình thường.

```
ERROR[08/02,09:12:39 Z] [48] The same or more recent governance index exist. Skip writing governance index  newIdx=0 govIdxes=[0]
```

#### Xác nhận cấu hình chuỗi đã cập nhật <a href="#confirm-the-updated-chain-config" id="confirm-the-updated-chain-config"></a>

Bây giờ, hãy khởi động lại nút ServiceChain. Ví dụ: bạn có thể khởi động lại nút SCN bằng lệnh sau.

```bash
$ kscnd start
```

Sau đó, trong bảng điều khiển Javascript của SCN, bạn có thể kiểm tra cấu hình chuỗi đã cập nhật.

```bash
$ kscn attach ~/kscnd_home/klay.ipc
Chào mừng bạn đến với bảng điều khiển Klaytn JavaScript!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> governance.chainConfig.magmaCompatibleBlock
1500
```

## Một số thông số về hard fork <a href="#some-hard-fork-specifics" id="some-hard-fork-specifics"></a>

Phần này mô tả một số thông số cho một hard fork cụ thể.

### Magma <a href="#magma" id="magma"></a>

Hard fork Magma giới thiệu KIP-71, phí gas linh động. Bao gồm giới hạn trên và dưới của giá gas.

Theo mặc định, giới hạn trên được đặt là `750000000000` và giới hạn dưới là `25000000000`. Bạn có thể thay đổi các giới hạn đó trong bảng điều khiển Javascript của các nút SCN bằng cách sử dụng [API quản trị](../../references/json-rpc/governance.md). Hiển nhiên, giới hạn dưới không thể vượt quá giới hạn trên.

Để đặt giá gas thành một giá trị tĩnh, bạn phải đặt giới hạn trên và dưới của giá gas thành cùng một giá trị. Ví dụ: bạn có thể đặt giá gas thành `0` bằng cách sử dụng API `governance.vote` trong bảng điều khiển Javascript của các nút SCN.

```bash
$ kscn attach ~/kscnd_home/klay.ipc
Chào mừng bạn đến với bảng điều khiển Klaytn JavaScript!

instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 debug:1.0 eth:1.0 governance:1.0 istanbul:1.0 klay:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> governance.vote("kip71.lowerboundbasefee", 0)
"Phiếu bầu của bạn đã được chuẩn bị. Thông số này sẽ được đưa vào tiêu đề khối hoặc được áp dụng khi nút của bạn tạo một khối với tư cách là người đề xuất. Lưu ý rằng phiếu bầu của bạn có thể trùng lặp."
> governance.vote("kip71.upperboundbasefee", 0)
"Phiếu bầu của bạn đã được chuẩn bị. Thông số này sẽ được đưa vào tiêu đề khối hoặc được áp dụng khi nút của bạn tạo một khối với tư cách là người đề xuất. Lưu ý rằng phiếu bầu của bạn có thể trùng lặp."
```

**LƯU Ý** Biểu quyết quản trị và bản cập nhật của nó sẽ có sẵn bất kể có kích hoạt hard fork Magma hay không. Nghĩa là việc biểu quyết quản trị cũng có thể được thực hiện trước khi kích hoạt hard fork Magma.

Nếu các phiếu bầu để cập nhật giới hạn trên và dưới của giá gas thành công, những thay đổi đó sẽ có hiệu lực sau 2 epoch istanbul (Một epoch có giá trị bằng số khối).

Ví dụ: nếu epoch là 3600 và các phiếu bầu để cập nhật giới hạn trên và dưới của giá gas đã được đặt trong khối #4000, những thay đổi đó sẽ có hiệu lực bắt đầu từ khối #10800. Cụ thể, các phiếu bầu sẽ được hoàn tất khi epoch đầu tiên đạt đến khối #7200 và các thay đổi được áp dụng ở epoch thứ hai (khối #10800).

Để kiểm tra epoch, bạn có thể sử dụng API `governanace.itemsAt` như bên dưới.

```javascript
> governance.itemsAt(klay.blockNumber)
{
  governance.governancemode: "none",
  governance.governingnode: "0x05ad406f31e22b74f18c9ed65ed1ccd349bbbee0",
  governance.unitprice: 0,
  istanbul.committeesize: 21,
  istanbul.epoch: 3600,
  istanbul.policy: 0,
  kip71.basefeedenominator: 20,
  kip71.gastarget: 30000000,
  kip71.lowerboundbasefee: 25000000000,
  kip71.maxblockgasusedforbasefee: 60000000,
  kip71.upperboundbasefee: 750000000000,
  reward.deferredtxfee: false,
  reward.minimumstake: "2000000",
  reward.mintingamount: "9600000000000000000",
  reward.proposerupdateinterval: 3600,
  reward.useginicoeff: false
}
```

Bạn có thể thấy rằng `istanbul.epoch` có giá trị là 3600 khối, thường mất một giờ để vượt qua.

Bạn cũng có thể thay đổi giai đoạn bằng cách sử dụng API `governance.vote`.

```javascript
> governance.vote("istanbul.epoch", 60)
"Phiếu bầu của bạn đã được chuẩn bị. Thông số này sẽ được đưa vào tiêu đề khối hoặc được áp dụng khi nút của bạn tạo một khối với tư cách là người đề xuất. Lưu ý rằng phiếu bầu của bạn có thể trùng lặp."
```
