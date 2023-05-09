# Kết nối Remix

![](./img//klaytnXremix.png)

## Remix là gì <a href="#what-is-remix" id="what-is-remix"></a>

Remix is a browser-based IDE (Integrated Development Environment) for developing Solidity contracts. This document will cover connecting Remix with Klaytn. If you want to know more about how to use Remix, please refer to[ **Remix docs**](https://remix-ide.readthedocs.io/en/latest/) or [**Remix IDE**](https://remix.ethereum.org/).

## Cài đặt phiên bản EVM <a href="#setup-evm-version" id="setup-evm-version"></a>

Klaytn supports contracts written in Solidity, and is compatible with the **London** version of EVM. Also, Solidity version 0.8.x and lower are supported in Klaytn. Therefore, to deploy the contract on Klaytn, the contract must be compiled with the **London** EVM version.

* Nhấp vào **trình biên dịch Solidity**, rồi chọn phiên bản EVM **London** trong "Cấu hình nâng cao".

![Solidity Complier](img/remix-solidity-compiler.png)

## Kết nối với plugin cục bộ <a href="#connect-to-a-local-plugin" id="connect-to-a-local-plugin"></a>

You need a local plugin to connect to the Klaytn network using Remix. The process is described in the following:

* Nhấp vào **trình quản lý plugin**, rồi nhấp vào **Kết nối với Plugin cục bộ**.

![Plugin](../../bapp/tutorials/img/remix-environment-plugin.png)

* Nhập https://klaytn-remix-plugin.ozys.net vào **URL**. Dùng bất kỳ tên nào bạn muốn cho **Tên Plugin** and **Tên Hiển thị**.

![Local Plugin](../../bapp/tutorials/img/remix-local-plugin.png)

* Nếu tab \[Klaytn] xuất hiện, bạn đã có thể tương tác với Klaytn.

## Cài đặt Môi trường triển khai<a href="#setting-up-the-deployment-environment" id="setting-up-the-deployment-environment"></a>

* Nhấp vào tab \[Klaytn].
* Chọn \[Environment] phù hợp.
* Bạn có thể chọn **Baobab**, **Cypress**, **Injected Caver**, **Caver Provider** or **Injected Web3**.
  * **\[Baobab]**: Kết nối với mạng lưới Baobab
  * **\[Cypress]**: Kết nối với mạng lưới Cypress
  * **\[Injected Caver]**: Kết nối với mạng lưới tích hợp caver (ví dụ: Kaikas)
  * **\[Caver Provider]**: Kết nối trực tiếp với nút Klaytn, có hỗ trợ RPC
  * **\[Injected Web3]**: Kết nối với mạng lưới tích hợp web3 (ví dụ: Metamask)

![Klaytn Tab](../../bapp/tutorials/img/remix-klaytn-tab.png)

## Nhập tài khoản <a href="#import-account" id="import-account"></a>

* Bạn có thể nhập khóa từ **khóa riêng tư** hoặc **Lưu trữ khóa**.
* Nhấp vào nút **dấu cộng** bên cạnh **TÀI KHOẢN**.

![Import Keys](../../bapp/tutorials/img/remix-klaytn-import-account.png)

* Rồi nhập vào khóa riêng tư hoặc Lưu trữ khóa.
* Bạn cũng có thể nhập khóa vào **feePayer**. Hệ thống chỉ hỗ trợ **khóa riêng tư**.

## Kết nối với Klaytn - Remix bằng EN (Nút điểm cuối) <a href="#connecting-klaytn-remix-using-en" id="connecting-klaytn-remix-using-en"></a>

* Cài đặt Nút điểm cuối trong môi trường cục bộ theo hướng dẫn trong [**Tài liệu EN**](https://docs.klaytn.foundation/getting-started/quick-start/launch-an-en).
*   Tạo tài khoản theo hướng dẫn trong [**Quản lý tài khoản**](https://docs.klaytn.foundation/getting-started/account).

    > **Lưu ý:** Nếu bạn sử dụng EN Công khai từ Baobab thay vì môi trường cục bộ, bạn sẽ không kết nối được với tài khoản của mình vì API cá nhân sẽ bị vô hiệu hóa.
* Chọn \[Caver Provider] trong menu Môi trường.

![Caver Provider](img/env-caver-provider.png)

* Nhập địa chỉ RPC của EN trong Điểm cuối Nhà cung cấp Caver. EN cục bộ (mặc định): [http://localhost:8551](http://localhost:8551/)
* Sau khi bạn kết nối thành công với mạng lưới này, bạn sẽ thấy ID chuỗi và Tài khoản của mạng lưới đã kết nối.

## Kết nối với Klaytn - Remix bằng MetaMask <a href="#connecting-klaytn-remix-using-metamask" id="connecting-klaytn-remix-using-metamask"></a>

* Kết nối với Klaytn bằng MetaMask bằng cách tham khảo các bước trong [**Kết nối MetaMask**](https://docs.klaytn.foundation/dapp/tutorials/connecting-metamask).
* Chọn \[Tích hợp Web3] trên menu Môi trường Remix.

![Injected Web3](img/env-injected-web3.png)

* Khi bạn nhìn thấy cửa sổ MetaMask bật lên, nhấp vào đó để chọn tài khoản.
* Khi bạn đã kết nối được với Mạng lưới, bạn sẽ thấy ID chuỗi và Tài khoản của mạng đã kết nối.

## Kết nối với Klaytn - Remix bằng Kaikas <a href="#connecting-klaytn-remix-using-kaikas" id="connecting-klaytn-remix-using-kaikas"></a>

* Chọn \[Tích hợp Caver] trên menu Môi trường Remix.

![Injected Caver](img/env-injected-caver.png)

* Khi bạn thấy cửa sổ Kaikas bật lên, nhấp vào \[Connect].
* Khi bạn đã kết nối được với Mạng lưới, bạn sẽ thấy ID chuỗi và Tài khoản của mạng đã kết nối.

## Hướng dẫn: Hợp đồng KlaytnGreeter <a href="#tutorial-klaytngreeter-contract" id="tutorial-klaytngreeter-contract"></a>

We will be using the [**KlaytnGreeter**](https://docs.klaytn.foundation/smart-contract/sample-contracts/klaytngreeter) sample contract.

* Thêm KlaytnGreeter.sol và viết mã lệnh chạy thử.

![Add KlaytnGreeter](../../bapp/tutorials/img/remix-add-klaytngreeter.png)

* Trên tab Biên dịch Solidity, chọn \[Compile KlaytnGreeter.sol] để biên dịch mã lệnh hợp đồng.

> Bạn nên bật tùy chọn "Tự động biên dịch".

* Trong tab Triển khai & Chạy Giao dịch, nhấp vào \[Deploy] để triển khai hợp đồng đã biên dịch.

![Deploy the Contract](../../bapp/tutorials/img/remix-deploy-run-tx.png)

* Bạn có thể xem hợp đồng đã triển khai. Bạn có thể chạy thử hoặc gỡ lỗi hợp đồng.

![Check the Contract](../../bapp/tutorials/img/remix-test-or-debug.png)
