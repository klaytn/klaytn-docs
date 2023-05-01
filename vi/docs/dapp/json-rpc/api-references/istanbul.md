---
description: '>- APIs related to the namespace "istanbul".'
---

# Namespace istanbul <a id="namespace-istanbul"></a>

The namespace `istanbul` provides functions related to consensus.

## istanbul_getSnapshot <a id="istanbul_getsnapshot"></a>

Returns the state snapshot at a given block number. The state snapshot contains information such as number/hash, validator set, and governance vote of the snapshot block.

**Parameters**

| Name         | Type                | Description                                                                                                                                      |
| ------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| block number | QUANTITY &#124; TAG | Integer block number, or the string `"earliest"` or `"latest"` as in the [default block parameter](./klay/block.md#the-default-block-parameter). |

**Return Value**

`Đối tượng` - Đối tượng chụp nhanh hoặc thông báo `lỗi` khi không tìm thấy ảnh chụp nhanh:

| Tên | Loại | Mô tả | | Epoch | DỮ LIỆU 64-byte | Số lượng khối mà sau đó để kiểm tra và đặt lại các phiếu đang chờ xử lý | | Số | DỮ LIỆU 64-byte | Số khối nơi ảnh chụp nhanh được tạo | | Số | DỮ LIỆU 64-byte | Số khối nơi ảnh chụp nhanh được tạo | | Giá trị thiết lập | DỮ LIỆU 64-byte | Tập hợp các nút xác thực tại thời điểm này | | Chính sách | DỮ LIỆU 64-byte | | | CommiteeSize | DỮ LIỆU 64-byte | | | Số phiếu | DỮ LIỆU 64-byte | Danh sách bỏ phiếu theo thứ tự thời gian | | Tally | DỮ LIỆU 64-byte | Kiểm phiếu hiện tại để tránh tính toán lại |

**Ví dụ**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_getSnapshot","params":["latest"],"id":1}' https://public-en-baobab.klaytn.net
// Response
{"jsonrpc":"2.0","id":1,"result":{"epoch":604800,"number":3228602,"hash":"0xc03aa058e9e248fee12e12302d0f1ba9a97873765146ae5e2429b78af826a1da","votes":[],"tally":[],"validators":["0x571e53df607be94731a5qqefca1dffe5aek45g3e", ... ],"policy":2,"subgroupsize":22,"rewardAddrs":[...],"votingPower":[1000,1000,1000,1000],"weight":[0,0,0,0],"proposers":["0x5cb1a7dccbd0dc446e3640898ede8820368554c8", ... ],"proposersBlockNum":3225600}}
```

## istanbul_getSnapshotAtHash <a id="istanbul_getsnapshotAtHash"></a>

Trả về ảnh chụp nhanh trạng thái tại một mã băm khối nhất định.

**Tham số**

| Tên         | Loại           | Mô tả                |
| ----------- | --------------- | -------------------- |
| mã băm khối | DỮ LIỆU 32-byte | Mã băm của một khối. |

**Giá trị Trả về**

Xem [istanbul_getSnapshot](#istanbul_getsnapshot)

**Ví dụ**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_getSnapshotAtHash","params":["0xc03aa058e9e248fee12e12302d0f1ba9a97873765146ae5e2429b78af826a1da"],"id":1}' https://public-en-baobab.klaytn.net
// Response
{"jsonrpc":"2.0","id":1,"result":{"epoch":604800,"number":3228602,"hash":"0xc03aa058e9e248fee12e12302d0f1ba9a97873765146ae5e2429b78af826a1da","votes":[],"tally":[],"validators":["0x571e53df607be94731a5qqefca1dffe5aek45g3e", ... ],"policy":2,"subgroupsize":22,"rewardAddrs":[...],"votingPower":[1000,1000,1000,1000],"weight":[0,0,0,0],"proposers":["0x5cb1a7dccbd0dc446e3640898ede8820368554c8", ... ],"proposersBlockNum":3225600}}
```


## istanbul_getValidators <a id="istanbul_getvalidators"></a>

Trả về danh sách nút xác thực tại một số khối nhất định.

**Tham số**

| Tên     | Loại                | Mô tả                                                                                                                                      |
| ------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| số khối | SỐ LƯỢNG &#124; THẺ | Số khối số nguyên hoặc chuỗi `"cũ nhất"` hoặc `"mới nhất"` như trong [tham số khối mặc định](./klay/block.md#the-default-block-parameter). |

**Giá trị Trả về**

| Tên          | Loại           | Mô tả                           |
| ------------ | --------------- | ------------------------------- |
| nút xác thực | DỮ LIỆU 20-byte | Danh sách địa chỉ nút xác thực. |

**Ví dụ**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_getValidators","params":["latest"],"id":1}' https://public-en-baobab.klaytn.net
// Response
{"jsonrpc":"2.0","id":1,"result":["0x571e53df607be94731a5qqefca1dffe5aek45g3e", ... ]}
```

## istanbul_getValidatorsAtHash <a id="istanbul_getvalidatorsathash"></a>

Trả về danh sách các nút xác thực được ủy quyền tại một mã băm khối nhất định.

**Tham số**

| Tên         | Loại           | Mô tả                |
| ----------- | --------------- | -------------------- |
| mã băm khối | DỮ LIỆU 32-byte | Mã băm của một khối. |

**Giá trị Trả về**

Xem [istanbul_getValidators](#istanbul_getvalidators)

**Ví dụ**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_getValidatorsAtHash","params":["0xc03aa058e9e248fee12e12302d0f1ba9a97873765146ae5e2429b78af826a1da"],"id":1}' https://public-en-baobab.klaytn.net
// Response
{"jsonrpc":"2.0","id":1,"result":["0x571e53df607be94731a5qqefca1dffe5aek45g3e", ... ]}
```

## istanbul_candidates <a id="istanbul_candidates"></a>

Trả về các ứng cử viên hiện tại mà nút tán thành và bỏ phiếu.

**Parameters**

none

**Return Value**

| account | 20-byte DATA | Address of candidate. | | auth | boolean | A value indicating the authorization status of the candidate. |

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_candidates","params":[],"id":1}' https://public-en-baobab.klaytn.net           
// Response
{"jsonrpc":"2.0","id":1,"result":{"0x571e53df607be94731a5qqefca1dffe5aek45g3e":true}}
```

## istanbul_propose <a id="istanbul_propose"></a>

Injects a new authorization candidate that the validator will attempt to push through.

**Parameters**

| Name    | Type         | Description                                                   |
| ------- | ------------ | ------------------------------------------------------------- |
| account | 20-byte DATA | Address of candidate.                                         |
| auth    | boolean      | A value indicating the authorization status of the candidate. |

**Return Value**

none

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_propose","params":["0x571e53df607be94731a5qqefca1dffe5aek45g3e", true],"id":1}' https://public-en-baobab.klaytn.net 
// Response
{"jsonrpc":"2.0","id":1,"result":null}
```

## istanbul_discard <a id="istanbul_discard"></a>

Drops a currently running candidate, stopping the validator from casting further votes (either for or against).

**Parameters**

| Name    | Type         | Description           |
| ------- | ------------ | --------------------- |
| account | 20-byte DATA | Address of candidate. |

**Return Value**

none

**Example**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_discard","params":["0x571e53df607be94731a5qqefca1dffe5aek45g3e"],"id":1}' https://public-en-baobab.klaytn.net 
// Response
{"jsonrpc":"2.0","id":1,"result":null}
```

## istanbul_getTimeout <a id="istanbul_getTimeout"></a>

Returns istanbul config timeout. Default value is 10000ms, and if over, timeoutEvent is sent. In case of CN, the timeoutEvent contains information such as currentRound, preparesSize and commitsSize to log.


**Parameters**

None

**Return Value**

| Name    | Type | Description    |
| ------- | ---- | -------------- |
| timeout | int  | config timeout |

**Ví dụ**

```shell
// Request
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"istanbul_getTimeout","params":[],"id":1}' https://public-en-baobab.klaytn.net 
// Response
{"jsonrpc":"2.0","id":1,"result":10000}
```