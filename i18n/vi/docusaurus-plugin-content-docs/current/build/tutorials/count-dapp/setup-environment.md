# Thiết lập môi trường

> \*\*[MUST] For this tutorial, you must follow the versions specified on the [first page](count-dapp.md#testing-environment) when you are setting up the environment. Please change the node version to 10.16.0 by using nvm before downloading caver-js.

## 1. 1.

- Cài đặt Node.js (npm) <a id="1-install-node-js-npm"></a>
- Tải xuống Node.js (npm) từ trang web chính thức: https\://nodejs.org/
- Cài đặt gói bằng cách nhấp vào tập tin tải xuống.
  ```
  Gõ lệnh `$ node --version` trong cửa sổ lệnh để xác minh `node` đã được cài đặt thành công.
  ```

⚠ Tại thời điểm viết, phiên bản LTS mới nhất tương thích với `caver-js` là 10.16.0. Nếu bạn dùng phiên bản Node cao hơn, `caver-js` sẽ không cài đặt được. Cài đặt lại Node hoặc sử dụng [NVM (Trình quản lý phiên bản Node)](https://github.com/nvm-sh/nvm) để cài đặt môi trường ổn định.

## 2. Cài đặt Truffle <a id="2-install-truffle"></a>

Truffle là công cụ tuyệt vời để biên dịch và triển khai các tập tin hợp đồng.

> Sử dụng `nvm` để đặt phiên bản cho nút thành 12.0.0 chỉ khi bạn sử dụng truffle.

- Gõ lệnh `$ nvm install 12.0.0`
- Gõ lệnh `$ nvm use 12.0.0`
- Gõ lệnh `$ sudo npm install -g truffle` trong cửa sổ lệnh để cài đặt truffle.
- Gõ lệnh `$ truffle --version` trong cửa sổ lệnh để xác minh `truffle` đã được cài đặt thành công.
- (**Triển khai hợp đồng thông minh của bạn bằng truffle**)
- Gõ lệnh `$ nvm use 10.16.0` để quay về nút v10.16.0 sau khi sử dụng truffle.

⚠ Nếu phiên bản thấp hơn 5, cài đặt truffle phiên bản 5.\
`$ sudo npm install -g truffle@5`
