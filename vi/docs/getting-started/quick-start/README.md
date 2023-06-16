# Bắt đầu nhanh <a id="quick-start"></a>

![](../images/klaytnXken.png)

Trước khi bắt đầu, hãy làm quen với một số thuật ngữ riêng của Klaytn.

* **Nút điểm cuối \(EN\)**: Nút xử lý các yêu cầu API JSON-RPC gửi đến mạng lưới Klaytn. Nút điểm cuối không tham gia vào thuật toán đồng thuận.
* **KLAY**: đồng tiền mặc định của Klaytn.
* **caver-js**: Triển khai JavaScript của API JSON-RPC của Klaytn.
* **Baobab**: mạng thử nghiệm của Klaytn
* **Cypress**: mạng chính thức của Klaytn

Hướng dẫn từng bước này sẽ hỗ trợ bạn trong quá trình khởi chạy Nút điểm cuối \(EN\) của mạng thử nghiệm Baobab và xây dựng hợp đồng thông minh cơ bản bằng tài khoản mới của bạn. Hướng dẫn này bao gồm hai phần, thiết lập một EN và triển khai một hợp đồng thông mình qua EN của bạn.

> Hướng dẫn này sử dụng mạng thử nghiệm **Baobab** bởi vì việc triển khai hợp đồng thông minh và gửi giao dịch sẽ cần đến phí giao dịch tính bằng KLAY. Vì mục đích phát triển, bạn có thể nhận KLAY cho mạng thử nghiệm từ [vòi Baobab](https://baobab.wallet.klaytn.foundation/faucet).

## 1. Khởi chạy Nút điểm cuối và thêm KLAY của mạng thử nghiệm Baobab vào Tài khoản của bạn \(Linux, Mac\) <a id="1-launch-an-endpoint-node-and-add-baobab-testnet-klay-to-your-account-linux-mac"></a>

Phần đầu tiên của hướng dẫn này giải thích cách khởi chạy một EN, tạo một tài khoản mới, và nạp tiền cho tài khoản của bạn bằng vòi trong ví Klaytn Baobab.

* [Khởi chạy nút điểm cuối](launch-an-en.md)
* [Nạp tiền vào tài khoản](top-up-your-account.md)

## 2. Triển khai hợp đồng thông minh: KlaytnGreeter <a id="2-deploying-a-smart-contract-klaytngreeter"></a>

Phần thứ hai của hướng dẫn này chỉ ra các tạo hợp đồng thông minh và triển khai chúng trên mạng thử nghiệm Baobab. Trước khi tiến hành phát triển hợp đồng thông minh, bạn cần thiết lập các công cụ phát triển, cài đặt caver-js và Truffle.

* [Cài đặt các công cụ phát triển](install-development-tools.md)
* [Triển khai hợp đồng thông minh](deploy-a-smart-contract.md)
* [Kiểm tra quy trình triển khai](check-the-deployment.md)

