# caver.rpc.governance

`caver.rpc.governance` cung cấp lệnh gọi JSON-RPC với không gian tên `governance`.

## caver.rpc.governance.vote <a id="caver-rpc-governance-vote"></a>

```javascript
caver.rpc.governance.vote(key, value [, callback])
```

Gửi một phiếu bầu mới. Nếu nút có quyền biểu quyết dựa trên chế độ quản trị thì có thể gửi phiếu bầu. Nếu không, một thông báo lỗi sẽ được trả về và phiếu bầu sẽ bị bỏ qua.

**Tham số**

| Tên      | type                           | Mô tả                                                                                                          |
| -------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| khóa     | chuỗi                          | Tên của tùy chọn cài đặt cấu hình sẽ được thay đổi. Khóa có dạng "domain.field".                               |
| giá trị  | chuỗi \| số \| boolean | Các loại giá trị khác nhau cho từng khóa.                                                                      |
| callback | hàm                            | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

Để biết thêm chi tiết về `khóa` và `giá trị` cho `caver.rpc.governance.vote`, vui lòng tham khảo [governance_vote](../../../../json-rpc/governance.md#governance_vote).


**Giá trị trả về**

`Promise` trả về `chuỗi`

| type  | Mô tả                  |
| ----- | ---------------------- |
| chuỗi | Kết quả gửi phiếu bầu. |

**Ví dụ**

```javascript
> caver.rpc.governance.vote('governance.governancemode', 'ballot').then(console.log)
Phiếu bầu của bạn đã được đặt thành công.
```

## caver.rpc.governance.showTally <a id="caver-rpc-governance-showtally"></a>

```javascript
caver.rpc.governance.showTally([callback])
```

Cung cấp số phiếu bầu quản trị hiện tại. Thông tin này sẽ hiển thị tỷ lệ tán thành tổng hợp theo tỷ lệ phần trăm. Thay đổi được đề xuất sẽ được thông qua khi tỷ lệ trên 50%.

**Tham số**

| Tên      | type | Mô tả                                                                                                          |
| -------- | ---- | -------------------------------------------------------------------------------------------------------------- |
| callback | hàm  | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Mảng`

| Loại | Mô tả                                                              |
| ----- | ------------------------------------------------------------------ |
| Mảng  | Một mảng chứa giá trị phiếu bầu và tỷ lệ tán thành theo phần trăm. |

**Ví dụ**

```javascript
> caver.rpc.governance.showTally().then(console.log)
[
  {
    Key: 'governance.unitprice',
    Value: 25000000000,
    ApprovalPercentage: 33.33333333333333
  }
]
```

## caver.rpc.governance.getTotalVotingPower <a id="caver-rpc-governance-gettotalvotingpower"></a>

```javascript
caver.rpc.governance.getTotalVotingPower([callback])
```

Cung cấp tổng của tất cả quyền biểu quyết mà CN có. Mỗi CN có 1.0 ~ 2.0 quyền biểu quyết. Trong chế độ quản trị "không" và "duy nhất", totalVotingPower không cung cấp bất kỳ thông tin nào.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                          |
| -------- | ----- | -------------------------------------------------------------------------------------------------------------- |
| callback | hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `số`

| Loại | Mô tả                  |
| ----- | ---------------------- |
| số    | Tổng quyền biểu quyết. |

**Ví dụ**

```javascript
> caver.rpc.governance.getTotalVotingPower().then(console.log)
3
```

## caver.rpc.governance.getMyVotingPower <a id="caver-rpc-governance-getmyvotingpower"></a>

```javascript
caver.rpc.governance.getMyVotingPower([callback])
```

Cung cấp quyền biểu quyết của nút. Quyền biểu quyết có thể nằm trong khoảng từ 1,0 ~ 2,0. Trong chế độ quản trị "không" và "duy nhất", totalVotingPower không cung cấp bất kỳ thông tin nào.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                          |
| -------- | ----- | -------------------------------------------------------------------------------------------------------------- |
| callback | hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `số`

| Loại | Mô tả                     |
| ----- | ------------------------- |
| số    | Quyền biểu quyết của nút. |

**Ví dụ**

```javascript
> caver.rpc.governance.getMyVotingPower().then(console.log)
1
```

## caver.rpc.governance.getMyVotes <a id="caver-rpc-governance-getmyvotes"></a>

```javascript
caver.rpc.governance.getMyVotes([callback])
```

Cung cấp thông tin phiếu bầu của tôi trong một giai đoạn. Mỗi phiếu bầu được lưu trữ trong một khối khi nút của người dùng tạo một khối mới. Sau khi giai đoạn hiện tại kết thúc, thông tin này sẽ bị xóa.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                          |
| -------- | ----- | -------------------------------------------------------------------------------------------------------------- |
| callback | hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Mảng`

| Loại | Mô tả                                            |
| ----- | ------------------------------------------------ |
| Mảng  | Trạng thái Bỏ phiếu của nút trong một giai đoạn. |

**Ví dụ**

```javascript
> caver.rpc.governance.getMyVotes().then(console.log)
[
  {
    Key: 'governance.unitprice',
    Value: 25000000000,
    Casted: true,
    BlockNum: 76899
  }
]
```

## caver.rpc.governance.getChainConfig <a id="caver-rpc-governance-getchainconfig"></a>

```javascript
caver.rpc.governance.getChainConfig([callback])
```

Cung cấp cấu hình chuỗi gốc. Vì hàm này chỉ lưu trữ cấu hình gốc, nên nếu có thay đổi trong chế độ quản trị được thực hiện thông qua biểu quyết thì kết quả của chainConfig sẽ thay đổi so với trạng thái hiện tại. Để xem thông tin hiện tại, vui lòng sử dụng itemsAt.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                          |
| -------- | ----- | -------------------------------------------------------------------------------------------------------------- |
| callback | hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `đối tượng`

| Loại     | Mô tả              |
| --------- | ------------------ |
| đối tượng | Cấu hình chuỗi gốc |

**Ví dụ**

```javascript
> caver.rpc.governance.getChainConfig().then(console.log)
{
  chainId: 10000,
  istanbul: { epoch: 30, policy: 2, sub: 22 },
  unitPrice: 25000000000,
  deriveShaImpl: 2,
  governance: {
    governingNode: '0xbeafcca672100a88a953fcf5e882cb763f9e3de9',
    governanceMode: 'single',
    reward: {
      mintingAmount: 6400000000000000000,
      ratio: '50/40/10',
      useGiniCoeff: true,
      deferredTxFee: true,
      stakingUpdateInterval: 60,
      proposerUpdateInterval: 30,
      minimumStake: 5000000
    },
    kip71: {
      lowerboundbasefee: 25000000000,
      upperboundbasefee: 750000000000,
      gastarget: 30000000,
      maxblockgasusedforbasefee: 60000000,
      basefeedenominator: 20
    }
  }
}
```

## caver.rpc.governance.getNodeAddress <a id="caver-rpc-governance-getnodeaddress"></a>

```javascript
caver.rpc.governance.getNodeAddress([callback])
```

Cung cấp địa chỉ của nút mà người dùng đang sử dụng. Nó được lấy từ nodekey và được sử dụng để ký các thông báo đồng thuận. Và giá trị "governingnode" phải là một trong những địa chỉ nút của nút xác thực.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                          |
| -------- | ----- | -------------------------------------------------------------------------------------------------------------- |
| callback | hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `chuỗi`

| Loại | Mô tả            |
| ----- | ---------------- |
| chuỗi | Địa chỉ của nút. |

**Ví dụ**

```javascript
> caver.rpc.governance.getNodeAddress().then(console.log)
0xbeafcca672100a88a953fcf5e882cb763f9e3de9
```

## caver.rpc.governance.getItemsAt <a id="caver-rpc-governance-getitemsat"></a>

```javascript
caver.rpc.governance.getItemsAt([blockNumberOrTag] [, callback])
```

Trả về các mục quản trị tại một khối cụ thể. Đây là kết quả của việc biểu quyết trước đó của khối và được sử dụng làm cấu hình cho chuỗi ở số khối đã cho.

**Tham số**

| Tên              | Loại           | Mô tả                                                                                                          |
| ---------------- | --------------- | -------------------------------------------------------------------------------------------------------------- |
| blockNumberOrTag | số \| chuỗi | (tùy chọn) Số khối hoặc chuỗi `mới nhất` hoặc `cũ nhất`. Nếu bị bỏ qua, chuỗi `mới nhất` sẽ được sử dụng.      |
| callback         | hàm             | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `đối tượng`

| Loại     | Mô tả         |
| --------- | ------------- |
| đối tượng | Mục quản trị. |

**Ví dụ**

```javascript
> caver.rpc.governance.getItemsAt().then(console.log)
{
  'governance.governancemode': 'ballot',
  'governance.governingnode': '0xbeafcca672100a88a953fcf5e882cb763f9e3de9',
  'governance.unitprice': 25000000000,
  'istanbul.committeesize': 22,
  'istanbul.epoch': 30,
  'istanbul.policy': 2,
  'kip71.basefeedenominator': 20,
  'kip71.gastarget': 30000000,
  'kip71.lowerboundbasefee': 25000000000,
  'kip71.maxblockgasusedforbasefee': 60000000,
  'kip71.upperboundbasefee': 750000000000,
  'reward.deferredtxfee': true,
  'reward.minimumstake': '5000000',
  'reward.mintingamount': '6400000000000000000',
  'reward.proposerupdateinterval': 30,
  'reward.ratio': '50/40/10',
  'reward.stakingupdateinterval': 60,
  'reward.useginicoeff': true
}

> caver.rpc.governance.getItemsAt('latest').then(console.log)
```

## caver.rpc.governance.getPendingChanges <a id="caver-rpc-governance-getpendingchanges"></a>

```javascript
caver.rpc.governance.getPendingChanges([callback])
```

Trả về danh sách các mục đã nhận đủ số phiếu nhưng chưa hoàn tất. Vào cuối giai đoạn hiện tại, những thay đổi này sẽ được hoàn tất và kết quả sẽ có hiệu lực từ giai đoạn này đến giai đoạn tiếp theo.

**Tham số**

| Tên      | type | Mô tả                                                                                                          |
| -------- | ---- | -------------------------------------------------------------------------------------------------------------- |
| callback | hàm  | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `đối tượng`

| Loại     | Mô tả                                                         |
| --------- | ------------------------------------------------------------- |
| đối tượng | Các thay đổi hiện đang chờ xử lý bao gồm các khóa và giá trị. |

**Ví dụ**

```javascript
> caver.rpc.governance.getPendingChanges().then(console.log)
{ 'governance.governancemode': 'single' }
```

## caver.rpc.governance.getIdxCache <a id="caver-rpc-governance-getidxcache"></a>

```javascript
caver.rpc.governance.getIdxCache([callback])
```

Trả về một mảng idxCache hiện tại trong bộ nhớ đệm. idxCache chứa số khối nơi diễn ra thay đổi quản trị. Theo mặc định, bộ đệm có thể có tối đa 1000 số khối trong bộ nhớ.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                          |
| -------- | ----- | -------------------------------------------------------------------------------------------------------------- |
| callback | hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `đối tượng`

| Loại | Mô tả                                       |
| ----- | ------------------------------------------- |
| Mảng  | Số khối nơi diễn ra việc thay đổi quản trị. |

**Ví dụ**

```javascript
> caver.rpc.governance.getIdxCache().then(console.log)
[ 0, 60, 321180 ]
```

## caver.rpc.governance.getIdxCacheFromDb <a id="caver-rpc-governance-getidxcachefromdb"></a>

```javascript
caver.rpc.governance.getIdxCacheFromDb([callback])
```

Trả về một mảng chứa tất cả các số khối mà tại đó mọi thay đổi quản trị đã từng diễn ra. Kết quả của idxCacheFromDb giống hoặc dài hơn kết quả của [idxCache](#caver-rpc-governance-getidxcache).

**Tham số**

| Tên      | Loại | Mô tả                                                                                                          |
| -------- | ----- | -------------------------------------------------------------------------------------------------------------- |
| callback | hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `đối tượng`

| type | Mô tả                                       |
| ---- | ------------------------------------------- |
| Mảng | Số khối nơi diễn ra việc thay đổi quản trị. |

**Ví dụ**

```javascript
> caver.rpc.governance.getIdxCacheFromDb().then(console.log)
[ 0, 60, 321180 ]
```

## caver.rpc.governance.getItemCacheFromDb <a id="caver-rpc-governance-getitemcachefromdb"></a>

```javascript
caver.rpc.governance.getItemCacheFromDb([callback])
```

Trả về thông tin quản trị được lưu trữ trên khối đã cho. Nếu không có thay đổi nào được lưu trữ trong khối đã cho, hàm sẽ trả về null.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                          |
| -------- | ----- | -------------------------------------------------------------------------------------------------------------- |
| callback | hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Tham số**

| Tên         | type            | Mô tả                                                                             |
| ----------- | --------------- | --------------------------------------------------------------------------------- |
| blockNumber | số \| chuỗi | Số khối hoặc chuỗi số hex để truy vấn thay đổi quản trị được thực hiện trên khối. |

**Giá trị trả về**

`Promise` trả về `đối tượng`

| Loại     | Mô tả                                                   |
| --------- | ------------------------------------------------------- |
| đối tượng | Thông tin quản trị được lưu trữ tại một khối nhất định. |

**Ví dụ**

```javascript
> caver.rpc.governance.getItemCacheFromDb(540).then(console.log)
{
  'governance.governancemode': 'single',
  'governance.governingnode': '0xbeafcca672100a88a953fcf5e882cb763f9e3de9',
  'governance.unitprice': 25000000000,
  'istanbul.committeesize': 22,
  'istanbul.epoch': 30,
  'istanbul.policy': 2,
  'kip71.basefeedenominator': 30,
  'kip71.gastarget': 30000000,
  'kip71.lowerboundbasefee': 25000000000,
  'kip71.maxblockgasusedforbasefee': 60000000,
  'kip71.upperboundbasefee': 750000000000,
  'reward.deferredtxfee': true,
  'reward.minimumstake': '5000000',
  'reward.mintingamount': '6400000000000000000',
  'reward.proposerupdateinterval': 30,
  'reward.ratio': '50/40/10',
  'reward.stakingupdateinterval': 60,
  'reward.useginicoeff': true
}

> caver.rpc.governance.getItemCacheFromDb(1).then(console.log)
null
```

## caver.rpc.governance.getVotes <a id="caver-rpc-governance-getvotes"></a>

```javascript
caver.rpc.governance.getVotes([callback])
```

Trả về số phiếu bầu từ tất cả các nút trong một giai đoạn. Những phiếu bầu này được thu thập từ tiêu đề của mỗi khối.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                          |
| -------- | ----- | -------------------------------------------------------------------------------------------------------------- |
| callback | hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `đối tượng`

| Loại | Mô tả                                                        |
| ----- | ------------------------------------------------------------ |
| Mảng  | Phiếu bầu hiện tại bao gồm các khóa, giá trị và địa chỉ nút. |

**Ví dụ**

```javascript
> caver.rpc.governance.getVotes().then(console.log)
[{
    key: 'reward.minimumstake',
    validator: '0xe733cb4d279da696f30d470f8c04decb54fcb0d2',
    value: '5000000'
}, {
    key: 'reward.useginicoeff',
    validator: '0xa5bccb4d279419abe2d470f8c04dec0789ac2d54',
    value: false
}]
```

## caver.rpc.governance.getStakingInfo <a id="caver-rpc-governance-getstakinginfo"></a>

```javascript
caver.rpc.governance.getStakingInfo([blockNumberOrTag] [, callback])
```

Trả về thông tin nắm giữ tại một khối cụ thể.

**Tham số**

| Tên              | Loại           | Mô tả                                                                                                          |
| ---------------- | --------------- | -------------------------------------------------------------------------------------------------------------- |
| blockNumberOrTag | số \| chuỗi | (tùy chọn) Số khối hoặc chuỗi `mới nhất` hoặc `cũ nhất`. Nếu bị bỏ qua, chuỗi `mới nhất` sẽ được sử dụng.      |
| callback         | hàm             | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `đối tượng`

| Loại     | Mô tả                                                                                                                                                                  |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| đối tượng | Thông tin nắm giữ. Tham khảo [governance_getStakingInfo](../../../../json-rpc/governance.md#governance_getstakinginfo) để biết mô tả về kết quả trả về. |

**Ví dụ**

```javascript
> caver.rpc.governance.getStakingInfo().then(console.log)
{
  BlockNum: 321600,
  CouncilNodeAddrs: [],
  CouncilStakingAddrs: [],
  CouncilRewardAddrs: [],
  KIRAddr: '0x0000000000000000000000000000000000000000',
  PoCAddr: '0x0000000000000000000000000000000000000000',
  UseGini: false,
  Gini: -1,
  CouncilStakingAmounts: []
}
```
