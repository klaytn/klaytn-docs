# Điểm cuối JSON RPC công khai

Điểm cuối JSON-RPC công khai cho phép bạn thử nghiệm và chạy các sản phẩm blockchain của mình thông qua việc tương tác với mạng lưới Klaytn mà không phải chạy nút riêng.

Chạy nút điểm cuối (EN) Klaytn không đơn giản. Việc này yêu cầu chuyên môn kỹ thuật cũng như nguồn lực theo dõi và tính toán. Việc này làm phát sinh chi phí duy trì lưu trữ, băng thông mạng cũng như vấn đề phải chuyển hướng thời gian và tài nguyên kỹ thuật; các nút phải luôn được cập nhật và kiểm tra tình trạng thường xuyên. Do đó, lợi ích chính khi sử dụng EN công khai hiện có là bạn chỉ cần tập trung vào việc xây dựng và thử nghiệm sản phẩm blockchain của mình, không bị phân tâm bởi việc duy trì hạ tầng để kết nối và tương tác với mạng lưới Klaytn.

## Những điều cần cân nhắc

- Các nhà cung cấp nút không chịu trách nhiệm cho bất cứ tổn thất hay mất mát nào xảy ra do lưu lượng hoặc việc tương tác với các nút.
- Nếu lưu lượng được tập trung trên những nút nhất định, dịch vụ của bạn có thể bị trì hoãn.
- Để ngăn ngừa việc có quá nhiều yêu cầu, các giới hạn tỷ lệ có thể áp dụng với từng nút. Những giới hạn này có thể thay đổi mà không có thông báo trước.

## Nhà cung cấp điểm cuối JSON-RPC công khai

Dưới đây là danh sách các nhà cung cấp nút công khai của Klaytn và các miền mạng.

### Mainnet (Cybress) điểm cuối JSON-RPC công khai

Hãy nhớ rằng những điểm cuối này được cung cấp cho cộng đồng vì mục đích thử nghiệm và phát triển.
Không sử dụng điểm cuối vì mục đích thương mại do chúng tôi không thể đảm bảo thời gian hoạt động và độ ổn định của nút.

**HTTPS**

| Nhà cung cấp dịch vụ                        | Điểm cuối                                         | Không gian tên | Loại   |
| ------------------------------------------- | ------------------------------------------------- | -------------- | ------- |
| [Quỹ Klaytn](https://www.klaytn.foundation) | `https://public-en-cypress.klaytn.net`            | klay,eth,net   | Đầy đủ  |
|                                             | `https://archive-en.cypress.klaytn.net`           | klay,eth,net   | Lưu trữ |
| [All That Node](www.allthatnode.com)        | `https://klaytn-mainnet-rpc.allthatnode.com:8551` | klay,eth,net   | Đầy đủ  |
| [Mạng lưới BlockPI](https://blockpi.io/)    | `https://klaytn.blockpi.network/v1/rpc/public`    | klay,eth,net   | Đầy đủ  |
| [OnFinality](https://onfinality.io/)        | `https://klaytn.api.onfinality.io/public`         | klay,eth,net   | Full    |
| [Pokt Network](https://pokt.network/)       | `https://klaytn-rpc.gateway.poktnetwork/)`        | klay,eth,net   | Đầy đủ  |

**WebSocket**

| Nhà cung cấp dịch vụ                        | Điểm cuối                                  | Không gian tên | Loại   |
| ------------------------------------------- | ------------------------------------------ | -------------- | ------- |
| [Quỹ Klaytn](https://www.klaytn.foundation) | `wss://public-en-cypress.klaytn.net/ws`    | klay,eth,net   | Đầy đủ  |
|                                             | `wss://archive-en.cypress.klaytn.net/ws`   | klay,eth,net   | Lưu trữ |
| [OnFinality](https://onfinality.io/)        | `wss://klaytn.api.onfinality.io/public-ws` | klay,eth,net   | Full    |

## Testnet (Baobab) điểm cuối JSON-RPC công khai

**HTTPS**

| Nhà cung cấp dịch vụ                        | Điểm cuối                                             | Không gian tên | Loại   |
| ------------------------------------------- | ----------------------------------------------------- | -------------- | ------- |
| [Quỹ Klaytn](https://www.klaytn.foundation) | `https://public-en-baobab.klaytn.net`                 | klay,eth,net   | Đầy đủ  |
|                                             | `https://archive-en.baobab.klaytn.net/`               | klay,eth,net   | Lưu trữ |
| [All That Node](www.allthatnode.com)        | `https://klaytn-baobab-rpc.allthatnode.com:8551`      | klay,eth,net   | Full    |
| [Mạng lưới BlockPI](https://blockpi.io/)    | `https://klaytn-baobab.blockpi.network/v1/rpc/public` | klay,eth,net   | Đầy đủ  |

**WebSocket**

| Nhà cung cấp dịch vụ                        | Điểm cuối                               | Không gian tên | Loại   |
| ------------------------------------------- | --------------------------------------- | -------------- | ------- |
| [Quỹ Klaytn](https://www.klaytn.foundation) | `wss://public-en-baobab.klaytn.net/ws`  | klay,eth,net   | Full    |
|                                             | `wss://archive-en.baobab.klaytn.net/ws` | klay,eth,net   | Lưu trữ |

## Tài nguyên hữu ích

- Ví: Kaikas là ví tiện ích của trình duyệt cho Mạng lưới Klaytn.
  [Kaikas](../../build/tools/wallets/kaikas.md)

- Faucet: Bạn có thể nhận được KLAY thử cho mạng lưới thử nghiệm Baobab.
  [Faucet](../../build/tools/wallets/klaytn-wallet.md#how-to-receive-baobab-testnet-klay)

- Trình khám phá: Klaytnscope là trình khám phá khối của mạng lưới Klaytn.
  [Klaytnscope](../../build/tools/block-explorers/klaytnscope.md)

- ChainID : Baobab: 1001 (0x3E9), Cypress: 8217 (0x2019)

- Giá gas: được điều chỉnh linh hoạt trong khoảng [25, 750]. Phạm vi có thể được thay đổi qua quản trị trên chuỗi. Để biết thêm thông tin, hãy tham khảm [governance](../json-rpc/governance.md).
  [Phí giao dịch](../../learn/transaction-fees.md)
