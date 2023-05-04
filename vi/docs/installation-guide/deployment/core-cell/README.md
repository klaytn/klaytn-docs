# Tổng quan về Core Cell <a id="core-cell-overview"></a>

## Đối tượng mục tiêu  <a id="intended-audience"></a>

- Nhà vận hành Core Cell
- Nếu bạn muốn tạo và chạy Ứng dụng Blockchain trên Klaytn, bạn không cần phải duy trì Core Cell. Thay vào đó, bạn chỉ cần chạy [Endpoint Node](../endpoint-node/README.md) để ứng dụng của bạn có thể tương tác với mạng lưới Klaytn.


## Tổng quan về Core Cell <a id="core-cell-overview"></a>

Core Cell (CC) là một thực thể tham gia vào quá trình đồng thuận đồng thời chịu trách nhiệm thực hiện các giao dịch và tạo khối. Core Cell (CC) của Klaytn bao gồm các thành phần sau.

-  Nút đồng thuận (CN): Nút đồng thuận tham gia vào quá trình tạo khối.
-  Nút proxy (NP): Nút proxy cung cấp giao diện cho mạng lưới. Nút proxy chuyển yêu cầu giao dịch tới Nút đồng thuận và truyền các khối xuống Nút điểm cuối.

Core Cell được khuyến nghị nên bao gồm 1 NĐT và hai NP hoặc nhiều hơn. Một NĐT kết nối với một NĐT khác trong Mạng lưới Core Cell để thực hiện đồng thuận. NĐT chỉ chấp nhận kết nối từ NP của nó trong cùng Core Cell để nhận yêu cầu giao dịch và truyền các khối tới mạng lưới. NP chỉ chấp nhận kết nối từ NĐC trong Mạng lưới nút điểm cuối.

![Tổng quan về Core Cell](images/cn_set.png)

| Tên | Mô tả                                                                                                                                                                                                                                                                     | Bảo mật mạng lưới                                                                                                                                                                                                                                                                                                  | Số lượng                                                |
|:--- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |:------------------------------------------------------- |
| NĐT | Nút tạo khối mới với Nút đồng thuận khác trong Mạng lưới Core Cell                                                                                                                                                                                                        | Một mạng lưới bao gồm các NĐT được cấp quyền. (Yêu cầu kiểm soát truy cập IP).                                                                                                                                                                                                                                     | 1 đơn vị                                                |
| NP  | - Một nút gửi giao dịch nhận được từ Mạng lưới nút điểm cuối Klaytn tới NĐT. <br>- Nút này truyền các khối đã tạo tới Mạng lưới nút điểm cuối Klaytn. <br>- Nút này có thể mở rộng theo chiều ngang tùy thuộc vào số lượng NĐC trong Mạng lưới nút điểm cuối. | - Nút này được kết nối với NĐT trong Core Cell. IP và Cổng của nó được yêu cầu công khai để chấp nhận kết nối từ các nút Klaytn khác trên mạng Internet. <br>- Nút này có thể kết nối với các NP trong Core Cell khác thông qua bootnode. <br>- Nút này có thể kết nối với NĐC thông qua bootnode NĐC. | Cần ít nhất 1 NP. 2 NP hoặc nhiều hơn được khuyến nghị. |



