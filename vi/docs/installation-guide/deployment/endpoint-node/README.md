# Nút điểm cuối <a id="endpoint-node"></a>

## Đối tượng mục tiêu <a id="intended-audience"></a>

- Bất kỳ ai muốn gửi giao dịch hoặc truy vấn trạng thái của mạng lưới Klaytn bằng cách sử dụng [API Klaytn](../../../dapp/json-rpc/README.md) đều phải thực hiện điều đó thông qua Nút điểm cuối.
- Nút điểm cuối là giao diện của Mạng lưới Klaytn.

## Tổng quan về Nút điểm cuối <a id="endpoint-node-overview"></a>

Nút điểm cuối có các vai trò và chức năng như sau.

- Đồng bộ hóa dữ liệu blockchain.
- Xác thực các khối mới nhận được.
- Xử lý các yêu cầu truy vấn.
- Truyền các yêu cầu giao dịch đến các Nút Proxy.

Nhị phân cài đặt Nút điểm cuối đi kèm với các giao diện và tiện ích như sau.

- API JSON-RPC: Máy chủ JSON-RPC chạy bên trong nút và cung cấp [API](../../../dapp/json-rpc/README.md) để phát triển Ứng dụng Blockchain. Nó cũng có API quản lý nút.
- Giao diện dòng lệnh: Cung cấp chức năng quản lý tài khoản và cấu hình nút. Bảng điều khiển JavaScript tương tác cũng được cung cấp và đính kèm nút. Bảng điều khiển JavaScript triển khai hầu hết các [API caver-js](../../../dapp/sdk/caver-js/README.md). 





