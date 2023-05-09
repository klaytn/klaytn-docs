# Bắt đầu nhanh <a id="quick-start"></a>

![](../images/klaytnXken.png)

Before you start, let's get familiar with several Klaytn-specific terms.

* **Nút điểm cuối \(EN\)**: Nút xử lý các yêu cầu API JSON-RPC gửi tới mạng Klaytn. Nút điểm cuối không tham gia vào thuật toán đồng thuận.
* **KLAY**: đồng tiền mặc định của Klaytn.
* **caver-js**: Triển khai JavaScript của API JSON-RPC của Klaytn.
* **Baobab**: mạng thử nghiệm của Klaytn
* **Cypress**: mạng chính thức của Klaytn

This step by step guide will walk you through the process of launching an Endpoint Node \(EN\) of Baobab testnet and building a basic smart contract with your new account. The tutorial consists of two parts, setting up an EN and deploying a smart contract through your EN.

> Hướng dẫn này sử dụng mạng thử nghiệm **Baobab** bởi vì việc triển khai hợp đồng thông minh và gửi giao dịch sẽ cần tới phí giao dịch tính bằng KLAY. Vì mục đích phát triển, bạn có thể nhận KLAY cho mạng thử nghiệm từ [vòi Baobab](https://baobab.wallet.klaytn.foundation/faucet).

## 1. Khởi chạy Nút điểm cuối và thêm đồng KLAY của mạng thử nghiệm Baobab vào Tài khoản của bạn \(Linux, Mac\) <a id="1-launch-an-endpoint-node-and-add-baobab-testnet-klay-to-your-account-linux-mac"></a>

The first part of this tutorial explains how to launch an EN, create a new account, and top up your account with the faucet in the Baobab Klaytn Wallet.

* [Khởi chạy nút điểm cuối](launch-an-en.md)
* [Nạp tiền vào tài khoản](top-up-your-account.md)

## 2. Triển khai hợp đồng thông minh: KlaytnGreeter <a id="2-deploying-a-smart-contract-klaytngreeter"></a>

The second of this guide shows how to create smart contracts and deploy them on the Klaytn Baobab network. Before getting into developing smart contracts, you need to set up the development tools, install caver-js and Truffle.

* [Cài đặt các công cụ phát triển](install-development-tools.md)
* [Triển khai hợp đồng thông minh](deploy-a-smart-contract.md)
* [Kiểm tra quy trình triển khai](check-the-deployment.md)

