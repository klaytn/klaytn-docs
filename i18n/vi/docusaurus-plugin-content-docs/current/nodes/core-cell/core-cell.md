# Core Cell

## Đối tượng mục tiêu  <a id="intended-audience"></a>

- Người vận hành Core Cell
- Nếu bạn muốn tạo và chạy Ứng dụng Blockchain trên Klaytn, bạn không cần phải duy trì Core Cell. Thay vào đó, bạn chỉ cần chạy [Nút điểm cuối](../endpoint-node/endpoint-node.md) để ứng dụng của bạn có thể tương tác với mạng lưới Klaytn.


## Tổng quan về Core Cell <a id="core-cell-overview"></a>

Core Cell (CC) là một thực thể tham gia vào quá trình đồng thuận đồng thời chịu trách nhiệm thực hiện các giao dịch và tạo khối. Core Cell (CC) của Klaytn bao gồm các thành phần sau.

-  Nút đồng thuận (CN): Nút đồng thuận tham gia vào quá trình tạo khối.
-  Nút proxy (PN): Nút proxy cung cấp giao diện cho mạng lưới. Nút proxy chuyển yêu cầu giao dịch đến Nút đồng thuận và truyền các khối xuống Nút điểm cuối.

Core Cell được khuyến nghị nên bao gồm 1 CN và hai PN hoặc nhiều hơn. Một CN kết nối với những CN khác trong Mạng lưới Core Cell để thực hiện đồng thuận. CN chỉ chấp nhận kết nối từ PN của nó trong cùng Core Cell để nhận yêu cầu giao dịch và truyền các khối đến mạng lưới. PN chỉ chấp nhận kết nối từ EN trong Mạng lưới nút điểm cuối.

![Tổng quan về Core Cell](/img/nodes/cn_set.png)

| Tên | Mô tả                                                                                                                                                                                                                                                                   | Bảo mật mạng lưới                                                                                                                                                                                                                                                                                               | Số lượng                                                |
|:--- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:------------------------------------------------------- |
| CN  | Nút tạo khối mới với Nút đồng thuận khác trong Mạng lưới Core Cell                                                                                                                                                                                                      | Một mạng lưới bao gồm các CN được cấp quyền. (Yêu cầu kiểm soát truy cập IP).                                                                                                                                                                                                                                   | 1 đơn vị                                                |
| PN  | - Một nút gửi giao dịch nhận được từ Mạng lưới nút điểm cuối Klaytn đến CN. <br/>- Nút này truyền các khối đã tạo đến Mạng lưới nút điểm cuối Klaytn. <br/>- Nút này có thể mở rộng theo chiều ngang tùy thuộc vào số lượng EN trong Mạng lưới nút điểm cuối. | - Nút này được kết nối với CN trong Core Cell. IP và Cổng của nó được yêu cầu công khai để chấp nhận kết nối từ các nút Klaytn khác trên mạng Internet. <br/>- Nút này có thể kết nối với các PN trong Core Cell khác thông qua bootnode. <br/>- Nút này có thể kết nối với EN thông qua bootnode EN. | Cần ít nhất 1 PN. 2 PN hoặc nhiều hơn được khuyến nghị. |



