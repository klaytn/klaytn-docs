# Nhà cung cấp JSON-RPC

## Điểm cuối JSON RPC công khai

Điểm cuối JSON-RPC công khai cho phép bản thử nghiệm và chạy các sản phẩm blockchain của mình bằng cách cho bạn tương tác với mạng lưới Klaytn mà không phải chạy nút riêng.

Chạy nút điểm cuối (EN) Klaytn của bạn không đơn giản. Việc này yêu cầu chuyên môn kỹ thuật cũng như tài nguyên giám sát và tính toán. Việc này làm phát sinh chi phí duy trì lưu trữ, băng thông mạng cũng như phải chuyển hướng thời gian và tài nguyên kỹ thuật; các nút phải luôn được cập nhật và kiểm tra tình trạng thường xuyên. Do đó, lợi ích chính khi sử dụng EN công khai hiện có là nó cho phép bạn chỉ cần tập trung vào xây dựng và thử nghiệm sản phẩm blockchain của mình, không bị phân tâm bởi việc duy trì hạ tầng để kết nối và tương tác với mạng lưới Klaytn.

### Những điều cần cân nhắc

- Các nhà cung cấp nút không chịu trách nhiệm cho bất cứ tổn thất hay mất mát nào xảy ra do lưu lượng hoặc việc tương tác với các nút.
- Nếu lưu lượng được tập trung trên những nút nhất định, dịch vụ của bạn có thể bị trì hoãn.
- Để ngăn ngừa việc có quá nhiều yêu cầu, các giới hạn tỷ lệ có thể áp dụng với từng nút. Những giới hạn này có thể thay đổi mà không có thông báo trước.

### Nhà cung cấp điểm cuối JSON-RPC công khai

Dưới đây là danh sách các nhà cung cấp nút công khai của Klaytn và các tên miền mạng.

#### Mainnet (Cybress) điểm cuối JSON-RPC công khai

Hãy nhớ, những điểm cuối này được cung cấp cho cộng đồng vì mục đích thử nghiệm và phát triển. Không sử dụng điểm cuối vì mục đích thương mại do chúng tôi không thể đảm bảo uptime và độ ổn định của chúng.

**HTTPS**

| Nhà cung cấp dịch vụ                        | Điểm cuối                                         | Namespace    | Loại   |
| ------------------------------------------- | ------------------------------------------------- | ------------ | ------- |
| [Quỹ Klaytn](https://www.klaytn.foundation) | `https://public-en-cypress.klaytn.net`            | klay,eth,net | Đầy đủ  |
|                                             | `https://archive-en.cypress.klaytn.net`           | klay,eth,net | Lưu trữ |
| [All That Node](www.allthatnode.com)        | `https://klaytn-mainnet-rpc.allthatnode.com:8551` | klay,eth,net | Đầy đủ  |
| [Mạng lưới BlockPI](https://blockpi.io/)    | `https://klaytn.blockpi.network/v1/rpc/public`    | klay,eth,net | Đầy đủ  |

**WebSocket**

| Nhà cung cấp dịch vụ                        | Điểm cuối                                | Namespace    | Loại   |
| ------------------------------------------- | ---------------------------------------- | ------------ | ------- |
| [Quỹ Klaytn](https://www.klaytn.foundation) | `wss://public-en-cypress.klaytn.net/ws`  | klay,eth,net | Đầy đủ  |
|                                             | `wss://archive-en.cypress.klaytn.net/ws` | klay,eth,net | Lưu trữ |


### Testnet (Baobab) điểm cuối JSON-RPC công khai

**HTTPS**

| Nhà cung cấp dịch vụ                        | Điểm cuối                                             | Namespace    | Loại   |
| ------------------------------------------- | ----------------------------------------------------- | ------------ | ------- |
| [Quỹ Klaytn](https://www.klaytn.foundation) | `https://public-en-baobab.klaytn.net`                 | klay,eth,net | Đầy đủ  |
|                                             | `https://archive-en.baobab.klaytn.net/`               | klay,eth,net | Lưu trữ |
| Fantrie                                     | `https://baobab01.fautor.app/`                        | klay,eth,net | Đầy đủ  |
|                                             | `https://baobab02.fautor.app/`                        | klay,eth,net | Đầy đủ  |
|                                             | `https://baobab.fautor.app/archive`                   | klay,eth,net | Lưu trữ |
| [All That Node](www.allthatnode.com)        | `https://klaytn-baobab-rpc.allthatnode.com:8551`      | klay,eth,net | Đầy đủ  |
| [Mạng lưới BlockPI](https://blockpi.io/)    | `https://klaytn-baobab.blockpi.network/v1/rpc/public` | klay,eth,net | Đầy đủ  |

**WebSocket**

| Nhà cung cấp dịch vụ                        | Điểm cuối                               | Namespace    | Loại   |
| ------------------------------------------- | --------------------------------------- | ------------ | ------- |
| [Quỹ Klaytn](https://www.klaytn.foundation) | `wss://public-en-baobab.klaytn.net/ws`  | klay,eth,net | Đầy đủ  |
|                                             | `wss://archive-en.baobab.klaytn.net/ws` | klay,eth,net | Lưu trữ |
| Fantrie                                     | `wss://baobab01.fautor.app/ws/`         | klay,eth,net | Đầy đủ  |
|                                             | `wss://baobab02.fautor.app/ws/`         | klay,eth,net | Đầy đủ  |
|                                             | `wss://baobab.fautor.app/archive/ws`    | klay,eth,net | Lưu trữ |

### Tài nguyên hữu ích

- Ví: Kaikas là ví tiện ích của trình duyệt cho mạng lưới Klaytn. [Kaikas](https://docs.klaytn.foundation/dapp/developer-tools/kaikas)

- Faucet: Bạn có thể nhận được KLAY thử cho mạng lưới thử nghiệm Baobab. [Faucet](https://docs.klaytn.foundation/dapp/developer-tools/klaytn-wallet#how-to-receive-baobab-testnet-klay)

- Trình khám phá: Klaytnscope là trình khám phá khối cho mạng lưới Klaytn. [Klaytnscope](https://docs.klaytn.foundation/dapp/developer-tools/klaytnscope)

- ChainID : Baobab: 1001 (0x3E9), Cypress: 8217 (0x2019)

- Giá gas: được điều chỉnh linh hoạt trong khoảng [25, 750]. Phạm vi có thể được thay đổi qua quản trị trên chuỗi. Để biết thêm thông tin, hãy tham chiếu [governance](https://docs.klaytn.foundation/content/dapp/json-rpc/api-references/governance). [Transaction Fees](https://docs.klaytn.com/klaytn/design/transaction-fees)