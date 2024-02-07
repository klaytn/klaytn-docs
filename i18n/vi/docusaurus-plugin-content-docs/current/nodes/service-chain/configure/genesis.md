# Tệp Genesis

Trang này mô tả chi tiết tập tin `genesis.json`.

## Cấu trúc tập tin Genesis JSON <a id="genesis-json-file-structure"></a>

Cấu trúc tập tin `genesis.json` được mô tả trong bảng dưới đây.

| Tên trường      | Mô tả                                                                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| config          | Cấu hình blokchain. Xem phần [Config](#config).                                                                                                                      |
| số dùng một lần | (không dùng) Trường này được lấy từ Ethereum nhưng không được sử dụng trong Klaytn.                                                               |
| dấu thời gian   | Thời gian Unix khi tạo ra khối.                                                                                                                                      |
| extraData       | Trường kết hợp dữ liệu cho vanity người ký và dữ liệu bổ sung istanbul được mã hóa RLP có chứa danh sách nút xác thực, con dấu của người đề xuất và con dấu cam kết. |
| gasLimit        | Lượng gas tối đa dùng trong một khối.                                                                                                                                |
| độ khó          | (không dùng) Trường này được lấy từ Ethereum nhưng không được sử dụng trong Klaytn.                                                               |
| mixhash         | (không dùng) Trường này được lấy từ Ethereum nhưng không được sử dụng trong Klaytn.                                                               |
| coinbase        | Địa chỉ để thợ đào nhận phần thưởng. Trường này chỉ sử dụng cho công cụ đồng thuận Clique.                                                                           |
| alloc           | Các tài khoản được xác định trước.                                                                                                                                   |
| số              | Trường số khối.                                                                                                                                                      |
| gasUsed         | Lượng gas đã sử dụng cho một khối.                                                                                                                                   |
| parentHash      | Giá trị hàm băm của khối trước đó.                                                                                                                                   |

### Config <a id="config"></a>

Trường `config` lưu trữ thông tin liên quan đến chuỗi.

| Tên trường              | Mô tả                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------ |
| chainId                 | Trường này xác định chuỗi hiện tại và được dùng để ngăn chặn việc tấn công phát lại. |
| istanbulCompatibleBlock | Số khối có áp dụng thay đổi istanbul.                                                |
| istanbul, clique        | Loại công cụ đồng thuận.                                                             |
| unitPrice               | Đơn giá.                                                                             |
| deriveShaImpl           | Xác định phương pháp mới để tạo hàm băm giao dịch và hàm băm biên lai.               |
| governance              | Thông tin quản trị về mạng lưới. Xem phần [Governance](#governance)                  |

### extraData <a id="extradata"></a>

Trường `extraData` là sự kết hợp giữa vanity người đề xuất và dữ liệu bổ sung istanbul mã hóa RLP:

- Vanity người đề xuất là dữ liệu 32 byte chứa dữ liệu vanity người đề xuất tùy ý.
- Phần còn lại của dữ liệu là dữ liệu bổ sung istanbul mã hóa RLP có chứa:
  - Nút xác thực: danh sách các nút xác thực theo thứ tự tăng dần.
  - Con dấu: chữ ký của người đề xuất tiêu đề. Về `genesis.json`, đó là một mảng byte được khởi tạo với 65 `0x0`.
  - CommittedSeal: danh sách các con dấu chữ ký cam kết chứng tỏ sự đồng thuận. Đối với `genesis.json`, đó là một mảng trống.

**Ví dụ**

| Trường        | type                                                                                                             | Giá trị                                                                                                                                     |
| ------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Vanity        | Chuỗi số thập lục phân 32-byte                                                                                   | 0x0000000000000000000000000000000000000000000000000000000000000000                                                                          |
| Nút xác thực  | []address                                                    | [0x48009b4e20ec72aadf306577cbe2eaf54b0ebb16,0x089fcc42fd83baeee4831319375413b8bae3aceb] |
| Con dấu       | mảng byte gồm 65 phần tử                                                                                         | [0x0,...,0x0]                                                                           |
| CommittedSeal | [][]byte | []                                                                                      |

`extraData` với dữ liệu trên được tạo bởi

```
concat('0x',Vanity,RLPEncode({Validators,Seal,CommittedSeal}))
```

khi `concat` là hàm ghép chuỗi và `RLPEncode` là một hàm để chuyển đổi một cấu trúc đã cho thành chuỗi mã hóa RLP.

Với hàm này, kết quả đầu ra `extraData` cho ví dụ này là 0x0000000000000000000000000000000000000000000000000000000000000000f86fea9448009b4e20ec72aadf306577cbe2eaf54b0ebb1694089fcc42fd83baeee4831319375413b8bae3acebb8410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0.

## Công cụ đồng thuận <a id="consensus-engine"></a>

Các công cụ đồng thuận dành cho mạng lưới Klaytn là Clique và Istanbul. Mỗi công cụ được giải thích như sau.

### Clique <a id="clique"></a>

Trường `clique` lưu trữ cấu hình cho niêm phong dựa trên Bằng chứng ủy quyền (POA).

| Các trường | Mô tả                                                                                 |
| ---------- | ------------------------------------------------------------------------------------- |
| thời kỳ    | Khoảng thời gian tối thiểu giữa các khối liên tiếp (đơn vị: giây). |
| epoch      | Số khối để đặt lại phiếu và được đánh dấu là điểm xác minh.                           |

### Istanbul <a id="istanbul"></a>

Trường `istanbul` lưu trữ cấu hình cho niêm phong dựa trên Istanbul.

| Các trường | Mô tả                                                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| epoch      | Số khối để đặt lại phiếu là một điểm xác minh.                                                                                              |
| chính sách | Chính sách lựa chọn người đề xuất khối. [0: Round Robin, 1: Sticky, 2: Weighted Random] |
| sub        | Quy mô của Ủy ban.                                                                                                                          |

## Quản trị <a id="governance"></a>

Trường `governance` lưu trữ thông tin quản trị cho một mạng lưới.

| Các trường     | Mô tả                                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| governanceMode | Một trong ba chế độ quản trị. [`none`, `single`, `ballot`] |
| governingNode  | Địa chỉ của nút quản trị được chỉ định. Chỉ hoạt động nếu chế độ quản trị là `single`.                         |
| phần thưởng    | Trường này lưu trữ cấu hình phần thưởng. Xem phần [Phần thưởng](#reward).                                      |

### Phần thưởng <a id="reward"></a>

Trường `reward` lưu trữ thông tin về nền kinh tế token của mạng lưới.

| Các trường             | Mô tả                                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| mintingAmount          | Số lượng peb được tạo khi tạo ra một khối. Giá trị phải ở trong dấu ngoặc kép.                       |
| ratio                  | Tỷ lệ phân phối cho `CN/KIR/PoC` được phân tách bằng `/`. Tổng của tất cả các giá trị phải bằng 100. |
| useGiniCoeff           | Sử dụng hệ số GINI hoặc không.                                                                       |
| deferredTxFee          | Cách phân phối phí TX cho một khối.                                                                  |
| stakingUpdateInterval  | Khoảng thời gian tính bằng chiều cao khối để cập nhật thông tin nắm giữ.                             |
| proposerUpdateInterval | Khoảng thời gian tính bằng chiều cao khối để cập nhật thông tin người đề xuất.                       |
| minimumStake           | Lượng peb tối thiểu để tham gia Người vận hành Core Cell.                                            |

## Ví dụ <a id="example"></a>

```
{
    "config": {
        "chainId": 2019,
        "istanbulCompatibleBlock": 0,
        "istanbul": {
            "epoch": 604800,
            "policy": 2,
            "sub": 13
        },
        "unitPrice": 25000000000,
        "deriveShaImpl": 2,
        "governance": {
            "governingNode": "0x46b0bd6380005952759f605d02a6365552c776f3",
            "governanceMode": "single",
            "reward": {
                "mintingAmount": 6400000000000000000,
                "ratio": "50/40/10",
                "useGiniCoeff": true,
                "deferredTxFee": true,
                "stakingUpdateInterval": 86400,
                "proposerUpdateInterval": 3600,
                "minimumStake": 5000000
            }
        }
    },
    "nonce": "0x0",
    "timestamp": "0x5c9af60e",
    "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000f89af85494aeae0ab623d4118ac62a2decc386949b5ce67ce29446b0bd6380005952759f605d02a6365552c776f394699b607851c878e29499672f42a769b71f74be8e94e67598eb5831164574c876994d53f63eab4f36d7b8410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0",
    "gasLimit": "0xe8d4a50fff",
    "difficulty": "0x1",
    "mixHash": "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
    "coinbase": "0x0000000000000000000000000000000000000000",
    "alloc": {
        "0000000000000000000000000000000000000400": {
            "code": "0x6080604052600436106101505763ffffffff60e00a165627a7a7230582093756fe617053766b158f7c64998c746eb38f0d5431cc50231cc9fb2cd1fd9950029",
            "balance": "0x0"
        },
        "46b0bd6380005952759f605d02a6365552c776f3": {
            "balance": "0x446c3b15f9926687d2c40534fdb564000000000000"
        },
        "699b607851c878e29499672f42a769b71f74be8e": {
            "balance": "0x446c3b15f9926687d2c40534fdb564000000000000"
        },
        "aeae0ab623d4118ac62a2decc386949b5ce67ce2": {
            "balance": "0x446c3b15f9926687d2c40534fdb564000000000000"
        },
        "e67598eb5831164574c876994d53f63eab4f36d7": {
            "balance": "0x446c3b15f9926687d2c40534fdb564000000000000"
        }
    },
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```
