# Kết nối MetaMask

![](/img/build/tutorials/klaytnXmetamask.png)

> **Lưu ý**: MetaMask chủ yếu được dùng làm ví cho Ethereum nhưng cũng tương thích với Klaytn vì có cấu trúc địa chỉ giống hệt. Klaytn cũng có ví dạng tiện ích mở rộng của trình duyệt với tên gọi là [Kaikas](../tools/wallets/kaikas.md) nên về cơ bản nó cũng cung cấp các tính năng giống với MetaMask, ngoại trừ Remix.

## Bước 1. Cài đặt MetaMask <a href="#install-metamask" id="install-metamask"></a>

- Chúng tôi sẽ sử dụng trình duyệt Chrome trong ví dụ này. ([**Cài đặt Chrome**](https://www.google.com/intl/en_us/chrome/))
- Thêm [**Tiện ích mở rộng MetaMask**](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) vào Chrome.

  > **Lưu ý:** Bạn có thể cần cài đặt thêm nếu đang sử dụng trình duyệt khác.
- Bạn có thể khởi động MetaMask bằng cách nhấp vào biểu tượng ở góc trên bên phải của trình duyệt Chrome.

## Bước 2. Tạo Ví MetaMask <a href="#generate-a-metamask" id="generate-a-metamask"></a>

![Create a Wallet](/img/build/tutorials/new-to-metamask.png)

- Nhấp vào \[Create a Wallet].
- Đặt mật khẩu.
- Bạn sẽ nhận được một cụm từ khôi phục gồm 12 từ; lưu dự phòng nó ở nơi an toàn.

  > **Lưu ý:** Bạn chỉ có thể khôi phục lại ví của mình bằng cụm từ ghi nhớ. Nếu chia sẻ cụm từ ghi nhớ với người khác, bạn có thể bị mất toàn bộ số tiền của mình. Vì vậy, bạn nên viết ra cụm từ này hoặc lưu giữ trên một thiết bị không kết nối mạng.

![Seed phrase and Wallet](/img/build/tutorials/metamask-secret-backup.png)

## Bước 3. Kết nối với Mạng lưới Klaytn Cypress (Mainet) <a href="#connect-to-klaytn-cypress-network-mainnet" id="connect-to-klaytn-cypress-network-mainnet"></a>

> Có một cách dễ làm. [Kết nối ví của bạn với Mạng lưới Klaytn Cypress (Mainnet)](https://chainlist.org/chain/8217).

- Nhấp vào tab Mạng lưới phía trên, tab này mặc định có trên Mainnet Ethereum, rồi chọn \[Add network].
- Nhập dữ liệu Nút điểm cuối (EN) của chuỗi Klaytn.

### Cypress Network Configuration

| Network Config Item | Value                                  |
| ------------------- | -------------------------------------- |
| Network Name        | Klaytn Cypress                         |
| New RPC URL         | `https://public-en-cypress.klaytn.net` |
| Block Explorer URL  | `https://klaytnscope.com`              |
| Chain ID            | 8217                                   |
| Currency Symbol     | KLAY                                   |

- Nhấp vào \[Save] để thêm Mạng lưới Klaytn Cypress.

![Network Setup and Custom RPC](/img/build/tutorials/metamask-add-cypress-1.png) ![Network Setup and Custom RPC](/img/build/tutorials/metamask-add-cypress-2.png)

## Bước 4. Send KLAY <a href="#send-klay" id="send-klay"></a>

**Lưu ý:** Các bước tiếp theo yêu cầu phải có KLAY.

- Nhấp vào \[Send] trên trang chính, rồi nhập địa chỉ người nhận và số lượng KLAY.

![Send KLAY 1](/img/build/tutorials/metamask-send-klay-1.png)

**LƯU Ý:** Gửi KLAY yêu cầu có một giao dịch nên bạn cần KLAY cho giao dịch đó.

- Vì Klaytn v1.9.0, một [cơ chế phí gas động](https://medium.com/klaytn/dynamic-gas-fee-pricing-mechanism-1dac83d2689) đã thay thế chính sách giá cố định hiện có.
- Vậy nên bạn không phải đặt phí gas cố định thủ công.
- Kiểm tra số lượng sẽ gửi đi và phí giao dịch, rồi nhấp vào \[Confirm] để hoàn tất việc chuyển KLAY. Sau đó, bạn sẽ được chuyển đến trang chính.
- Nhấp vào \[Activity] trên trang chính để xác nhận lịch sử giao dịch.

![Send KLAY 2](/img/build/tutorials/metamask-send-klay-2.png)

## Kết nối với mạng lưới Klaytn Baobab (Testnet)<a href="#connect-to-klaytn-baobab-network-testnet" id="connect-to-klaytn-baobab-network-testnet"></a>

### Nhận KLAY để thực hiện giao dịch

> **Lưu ý:** Hướng dẫn này sử dụng EN công khai của Testnet (Baobab) để kết nối với mạng lưới này. Hãy nhớ sử dụng Baobab khi bạn chạy thử.

> Có một cách dễ làm. [Kết nối ví của bạn với mạng lưới Klaytn Baobab (Testnet)](https://chainlist.org/chain/1001).

### Baobab Network Configuration

| Network Config Item | Value                                 |
| ------------------- | ------------------------------------- |
| Network Name        | Klaytn Baobab                         |
| New RPC URL         | `https://public-en-baobab.klaytn.net` |
| Block Explorer URL  | `https://baobab.klaytnscope.com `     |
| Chain ID            | 1001                                  |
| Currency Symbol     | KLAY                                  |

- Nhấp vào \[Save] để thêm Mạng lưới Klaytn Baobab.

![Network Setup](/img/build/tutorials/connect-testnet-1.png)

- Để thử kết nối của Ví Klaytn, bạn sẽ cần thực hiện giao dịch có yêu cầu KLAY.
- Nhấp vào menu kebab (dấu ba chấm) ở góc trên bên phải và chọn \[Account details].
- Nhấp vào \[Export Private Key] để lấy khóa riêng tư của bạn.

![Export Private Key](/img/build/tutorials/connect-testnet-2.png)

- Khi sử dụng Testnet Baobab, bạn có thể nhận được Klay Thử nghiệm trong [**Faucet Klaytn**](https://baobab.wallet.klaytn.foundation/access?next=faucet).
- Nhập khóa riêng tư của bạn vào Ví Klaytn và nhấp vào \[Access] để đăng nhập. (Gắn 0x vào trước khóa riêng tư.)
- Nhấp vào \[Run Faucet]. 150 KLAY Testnet sẽ được gửi vào tài khoản của bạn và số dư sẽ được cập nhật tương ứng. Với mỗi tài khoản, bạn có thể nhận KLAY Testnet từ Faucet một lần trong vòng 24 giờ.

![Obtain KLAY from Faucet](/img/build/tutorials/connect-testnet-3.png)

- Quay lại MetaMask và xác nhận KLAY bạn đã nhận được.

![Check your balance](/img/build/tutorials/connect-testnet-4.png)
