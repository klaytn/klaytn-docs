# Cấu trúc thư mục

```
|-- contracts
|-- migrations
|-- truffle-config.js
|-- static  
|-- src  
    |-- styles
    |-- klaytn
      |-- caver.js
    |-- components
      |-- BlockNumber.js
      |-- Auth.js
      |-- Count.js
    |-- index.js
    |-- App.js
    |-- routes.js
```

`contracts/`: Chứa tập tin nguồn Solidity của hợp đồng thông minh.

`migrations/`: Chứa tập tin JavaScript thực hiện việc triển khai hợp đồng thông minh.

`truffle-config.js`: Tập tin cấu hình Truffle.

`static/`: Chứa các tập tin tĩnh như tập tin ảnh.

`src/styles`: Tập tin định nghĩa CSS.

`src/index.js`: Tập tin index của ứng dụng hướng dẫn của chúng tôi. Logic ReactDOM.render nằm ở đây.

`src/App.js`: Tập tin thành phần gốc của ứng dụng hướng dẫn của chúng tôi.

`src/routes.js`: Chứa các định nghĩa định tuyến.

`src/components`: Chứa các tập tin thành phần frontend.

* `src/components/BlockNumber.js`: Hiển thị số khối hiện tại.

* `src/components/Auth.js`: Xử lý quá trình đăng nhập của người dùng bằng khóa riêng tư hoặc lưu trữ khóa với mật khẩu.

* `src/components/Count.js`: Xử lý tương tác với hợp đồng Count đã triển khai. Gọi các hàm hợp đồng bằng caver.js.

`src/klaytn`: Chứa các tập tin hỗ trợ tương tác với Klaytn.

* `src/klaytn/caver.js`: Tạo caver-js. caver-js là thư viện gọi RPC Javascript giúp cho việc kết nối với nút Klaytn và tương tác với nút hoặc hợp đồng thông minh được triển khai trên Klaytn.


