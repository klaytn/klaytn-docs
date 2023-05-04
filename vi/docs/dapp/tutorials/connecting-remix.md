# Kết nối Remix

## Remix là gì <a href="#what-is-remix" id="what-is-remix"></a>

Remix là IDE chạy trên trình duyệt (Môi trường phát triển tích hợp) để phát triển hợp đồng Solidity. Tài liệu này sẽ trình bày việc kết nối Remix với Klaytn. Nếu bạn muốn biết thêm cách sử dụng Remix, vui lòng tham khảo[ **Tài liệu Remix**](https://remix-ide.readthedocs.io/en/latest/) hoặc [**IDE Remix**](https://remix.ethereum.org/).

## Cài đặt phiên bản EVM <a href="#setup-evm-version" id="setup-evm-version"></a>

Klaytn hỗ trợ hợp đồng viết trên Solidity và tương thích với phiên bản **London** của EVM. Tương tự, phiên bản Solidity từ 0.8.x trở về trước cũng được Klaytn hỗ trợ. Vì vậy, để triển khai hợp đồng trên Klaytn, hợp đồng phải được biên dịch với phiên bản EVM **London**.

* Nhấp vào **trình biên dịch Solidity**, rồi chọn phiên bản EVM **London** trong "Cấu hình nâng cao".

![Trình biên dịch Solidity](img/remix-solidity-compiler.png)

## Kết nối với plugin cục bộ <a href="#connect-to-a-local-plugin" id="connect-to-a-local-plugin"></a>

Bạn cần có plugin cục bộ để kết nối mạng Klaytn sử dụng Remix. Quy trình này được mô tả dưới đây:

* Nhấp vào **trình quản lý plugin**, rồi nhấp vào **Kết nối với Plugin cục bộ**.

![Plugin](../../bapp/tutorials/img/remix-environment-plugin.png)

* Nhập https://klaytn-remix-plugin.ozys.net vào **URL**. Dùng bất kỳ tên nào bạn muốn cho **Tên Plugin** and **Tên Hiển thị**.

![Plugin cục bộ](../../bapp/tutorials/img/remix-local-plugin.png)

* Nếu tab \[Klaytn] xuất hiện, bạn đã có thể tương tác với Klaytn.

## Cài đặt Môi trường triển khai<a href="#setting-up-the-deployment-environment" id="setting-up-the-deployment-environment"></a>

* Nhấp vào tab \[Klaytn].
* Chọn \[Environment] phù hợp.
* Bạn có thể chọn **Baobab**, **Cypress**, **Injected Caver**, **Caver Provider** or **Injected Web3**.
  * **\[Baobab]**: Kết nối với mạng lưới Baobab
  * **\[Cypress]**: Kết nối với mạng lưới Cypress
  * **\[Injected Caver]**: Kết nối với mạng lưới tích hợp caver (ví dụ: Kaikas)
  * **\[Caver Provider]**: Kết nối trực tiếp với node Klaytn, có hỗ trợ RPC
  * **\[Injected Web3]**: Kết nối với mạng lưới tích hợp web3 (ví dụ: Metamask)

![Tab Klaytn](../../bapp/tutorials/img/remix-klaytn-tab.png)

## Nhập tài khoản <a href="#import-account" id="import-account"></a>

* Bạn có thể nhập khóa từ **khóa riêng tư** hoặc **Lưu trữ khóa**.
* Nhấp vào nút **dấu cộng** bên cạnh **TÀI KHOẢN**.

![Nhập Khóa](../../bapp/tutorials/img/remix-klaytn-import-account.png)

* Rồi nhập vào khóa riêng tư hoặc Lưu trữ khóa.
* Bạn cũng có thể nhập khóa vào **feePayer**. Hệ thống chỉ hỗ trợ **khóa riêng tư**.

## Kết nối với Klaytn - Remix bằng EN (Nút điểm cuối) <a href="#connecting-klaytn-remix-using-en" id="connecting-klaytn-remix-using-en"></a>

* Cài đặt Nút điểm cuối trong môi trường cục bộ theo hướng dẫn trong [**Tài liệu EN**](https://docs.klaytn.foundation/getting-started/quick-start/launch-an-en).
*   Tạo tài khoản theo hướng dẫn trong [**Quản lý tài khoản**](https://docs.klaytn.foundation/getting-started/account).

    > **Lưu ý:** Nếu bạn sử dụng EN Công khai từ Baobab thay vì môi trường cục bộ, bạn sẽ không kết nối được với tài khoản của mình vì API cá nhân sẽ bị vô hiệu hóa.
* Chọn \[Caver Provider] trong menu Môi trường.

![Nhà cung cấp Caver](img/env-caver-provider.png)

* Nhập địa chỉ RPC của EN trong Điểm cuối Nhà cung cấp Caver. EN cục bộ (mặc định): [http://localhost:8551](http://localhost:8551/)
* Sau khi bạn kết nối thành công với mạng lưới này, bạn sẽ thấy ID chuỗi và Tài khoản của mạng lưới đã kết nối.

## Kết nối với Klaytn - Remix bằng MetaMask <a href="#connecting-klaytn-remix-using-metamask" id="connecting-klaytn-remix-using-metamask"></a>

* Kết nối với Klaytn bằng MetaMask bằng cách tham khảo các bước trong [**Kết nối MetaMask**](https://docs.klaytn.foundation/dapp/tutorials/connecting-metamask).
* Chọn \[Tích hợp Web3] trên menu Môi trường Remix.

![Tích hợp Web3](img/env-injected-web3.png)

* Khi bạn nhìn thấy cửa sổ MetaMask bật lên, nhấp vào đó để chọn tài khoản.
* Khi bạn đã kết nối được với Mạng lưới, bạn sẽ thấy ID chuỗi và Tài khoản của mạng đã kết nối.

## Kết nối với Klaytn - Remix bằng Kaikas <a href="#connecting-klaytn-remix-using-kaikas" id="connecting-klaytn-remix-using-kaikas"></a>

* Chọn \[Tích hợp Caver] trên menu Môi trường Remix.

![Tích hợp Caver](img/env-injected-caver.png)

* Khi bạn thấy cửa sổ Kaikas bật lên, nhấp vào \[Connect].
* Khi bạn đã kết nối được với Mạng lưới, bạn sẽ thấy ID chuỗi và Tài khoản của mạng đã kết nối.

## Hướng dẫn: Hợp đồng KlaytnGreeter <a href="#tutorial-klaytngreeter-contract" id="tutorial-klaytngreeter-contract"></a>

Chúng tôi sẽ sử dụng hợp đồng mẫu [**KlaytnGreeter**](https://docs.klaytn.foundation/smart-contract/sample-contracts/klaytngreeter).

* Thêm KlaytnGreeter.sol và viết mã lệnh chạy thử.

![Thêm KlaytnGreeter](../../bapp/tutorials/img/remix-add-klaytngreeter.png)

* Trên tab Biên dịch Solidity, chọn \[Compile KlaytnGreeter.sol] để biên dịch mã lệnh hợp đồng.

> Bạn nên bật tùy chọn "Tự động biên dịch".

* Trong tab Triển khai & Chạy Giao dịch, nhấp vào \[Deploy] để triển khai hợp đồng đã biên dịch.

![Triển khai hợp đồng](../../bapp/tutorials/img/remix-deploy-run-tx.png)

* Bạn có thể xem hợp đồng đã triển khai. Bạn có thể chạy thử hoặc gỡ lỗi hợp đồng.

![Kiểm tra hợp đồng](../../bapp/tutorials/img/remix-test-or-debug.png)
