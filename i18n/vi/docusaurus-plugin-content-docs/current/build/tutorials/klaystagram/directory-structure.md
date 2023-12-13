# Cấu trúc thư mục

```text
|-- contracts
|-- migrations
|-- truffle.js
|-- static
|-- src
    |-- klaytn
      |-- caver.js
      |-- KlaystagramContract.js
    |-- redux
    |-- pages
      |-- AuthPage.js
      |-- FeedPage.js
    |-- components
      |-- UploadPhoto.js
      |-- Feed.js
      |-- TransferOwnership.js
      |-- ...
    |-- styles
    |-- utils
    |-- index.js
    |-- App.js
```

`contracts/`: Chứa tập tin hợp đồng Solidity.

`migrations/`: Chứa tập tin JavaScript xử lý việc triển khai hợp đồng thông minh.

`truffle.js`: Chứa cấu hình Truffle.

`static/`: Chứa tập tin tĩnh như hình ảnh và phông chữ.

`src/index.js`: Tập tin index của ứng dụng. ReactDOM.render logic nằm ở đây.

`src/App.js`: Tập tin thành phần gốc của ứng dụng.

`src/styles`: Định nghĩa kiểu dáng tổng thể liên quan đến stylesheet.

`src/redux`: Tạo các hàm API tương tác với hợp đồng và theo dõi dữ liệu tiếp theo.

`src/klaytn`: Chứa các tập tin hỗ trợ tương tác với Klaytn.

* `src/klaytn/caver.js`: Khởi tạo caver-js trong các cài đặt đã cấu hình.

  cf\) caver-js là thư viện cuộc gọi RPC tạo kết nối với nút Klaytn, tương tác với nút và hợp đồng thông minh được triển khai trên Klaytn.

* `src/klaytn/Klaystagram.js`: Tạo một phiên bản của hợp đồng bằng cách sử dụng API caver-js. Bạn có thể tương tác với hợp đồng thông qua phiên bản.

`src/pages`: Chứa các tập tin hai trang soạn ra ứng dụng Klaystagram.

* `src/pages/AuthPage.js`: Chứa mẫu đăng ký và đăng nhập. Bạn có thể tạo khóa riêng tư trong mẫu đăng ký và sử dụng nó để đăng nhập trên ứng dụng.

* `src/pages/FeedPage.js`: Đọc dữ liệu ảnh từ hợp đồng và hiển thị đến người dùng. Ngoài ra, người dùng có thể tải lên hình ảnh của họ trong FeedPage.

`src/components`: Chứa các tập tin thành phần soạn ra trang.

* `src/components/Feed.js`: Đọc dữ liệu từ hợp đồng và hiển thị ảnh.

* `src/components/UploadPhoto.js`: Tải ảnh lên bằng cách gửi giao dịch đến hợp đồng.

* `src/components/TransferOwnership.js`: Chuyển quyền sở hữu ảnh bằng cách gửi giao dịch.
