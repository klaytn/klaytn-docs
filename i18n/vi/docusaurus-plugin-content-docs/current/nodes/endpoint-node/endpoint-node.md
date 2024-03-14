# Nút điểm cuối

## Đối tượng mục tiêu <a id="intended-audience"></a>

- Anyone who wants to send transactions or query the state of Klaytn network using [Klaytn APIs](../../references/json-rpc/klay/account-created) needs to do so via an Endpoint Node.
- Nút điểm cuối là giao diện của Mạng lưới Klaytn.

## Tổng quan về Nút điểm cuối <a id="endpoint-node-overview"></a>

Nút điểm cuối có các vai trò và chức năng như sau.

- Đồng bộ hóa dữ liệu blockchain.
- Xác thực các khối mới nhận được.
- Xử lý các yêu cầu truy vấn.
- Truyền các yêu cầu giao dịch đến các Nút Proxy.

Nhị phân cài đặt Nút điểm cuối đi kèm với các giao diện và tiện ích như sau.

- JSON-RPC APIs: JSON-RPC server runs inside the node, and it exposes [APIs](../../references/json-rpc/klay/account-created) for Blockchain Application development. Nó cũng có API quản lý nút.
- Giao diện dòng lệnh: Cung cấp chức năng quản lý tài khoản và cấu hình nút. Bảng điều khiển JavaScript tương tác cũng được cung cấp và đính kèm nút. Bảng điều khiển JavaScript triển khai hầu hết các [API caver-js](../../references/sdk/caver-js/caver-js.md).
