# Thiết lập môi trường

> **\[MUST\] For this tutorial, you must follow the versions specified on the [first page](klaystagram.md#testing-environment) when you are setting up the environment. Please change the node version to 10.16.0 by using nvm before downloading caver-js.**


## 1. Cài đặt Node.js \(npm\) <a id="1-install-node-js-npm"></a>

* Tải xuống Node.js \(npm\) từ trang chính thức: [https://nodejs.org/](https://nodejs.org/)
* Cài đặt gói bằng cách nhấp vào tập tin tải xuống.
* Gõ lệnh `$ node --version` trong cửa sổ lệnh để xác minh `node` đã được cài đặt thành công.

  ```text
    v10.16.0
  ```

⚠ Tại thời điểm viết, phiên bản LTS mới nhất tương thích với `caver-js` là 10.16.0. Nếu bạn dùng phiên bản Node cao hơn, `caver-js` sẽ không cài đặt được. Hãy cài đặt lại nút hoặc sử dụng [NVM \(Trình quản lý phiên bản nút\)](https://github.com/nvm-sh/nvm) để thiết lập môi trường ổn định.

## 2. Cài đặt Truffle <a id="2-install-truffle"></a>

Truffle là công cụ tuyệt vời để biên dịch và triển khai các tập tin hợp đồng.

> **Use `nvm` to set the node version to 12.0.0 only if you are using truffle.**

- Gõ lệnh `$ nvm install 12.0.0`
- Gõ lệnh `$ nvm use 12.0.0`
- Gõ `$ sudo npm install -g truffle` vào cửa sổ lệnh của bạn để cài đặt truffle.
- Gõ lệnh `$ truffle --version` trong cửa sổ lệnh để xác minh `truffle` đã được cài đặt thành công.
- (**Triển khai hợp đồng thông minh của bạn bằng truffle**)
- Gõ `$ nvm use 10.16.0` để quay lại nút v10.16.0 sau khi dùng truffle.

⚠ Nếu phiên bản dưới 5, hãy cài đặt truffle phiên bản 5. `$ sudo npm install -g truffle@5`

