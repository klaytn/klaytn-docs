# Đa kênh

Nút Klaytn có thể chạy **Đa kênh**.

Nếu một nút được thực thi với cấu hình đa kênh thì 2 cổng sẽ được thiết lập để giao tiếp. Mặt khác, nếu một nút được thực thi bằng cấu hình đơn kênh, 1 cổng sẽ được thiết lập.
Nếu 2 nút đa kênh đều cố kết nối, thì một kết nối sẽ được thiết lập bằng 2 cổng. Nếu không, chúng sẽ dùng 1 cổng để giao tiếp.

Có thể kích hoạt nút đa kênh bằng cờ báo `--multichannel`. Nếu bạn sử dụng [`kend`](../nodes/endpoint-node/install-endpoint-nodes.md), cấu hình đa kênh sẽ được kích hoạt theo mặc định do chỉ lệnh `MULTICHANNEL=1` trong [`kend.conf`](../nodes/endpoint-node/install-endpoint-nodes.md). Để tắt chế độ đa kênh, vui lòng thay thế chỉ lệnh bằng `MULTICHANNEL=0`.
Nếu muốn chạy một nút bằng các cổng cụ thể, bạn có thể sử dụng cờ báo `port` và `subport`. Nếu bạn muốn chỉ định các giá trị cổng của một nút ngang hàng đang kết nối, hãy xem [KNI](./kni.md).

## Kiến trúc <a id="architecture"></a>

![Multi-Channel Server](/img/learn/multichannel.png)

Hình trên cho thấy kết nối giữa hai nút đa kênh.
Hai cổng, cổng chính (A) và cổng phụ (B), truyền tải các thông điệp khác nhau.

- **Cổng chính**(A) được dùng để truyền tải thông điệp liên quan đến khối và giao thức đồng thuận.
  - Các thông điệp về khối bao gồm các yêu cầu và phản hồi của hàm băm, tiêu đề, phần nội dung và biên lai của một khối.
  - Các thông điệp đồng thuận bao gồm Request, Preprepare, Prepare, Commit và RoundChange. Bạn có thể tìm thấy ý nghĩa của các thông điệp này tại [PBFT](./consensus-mechanism.md#pbft-practical-byzantine-fault-tolerance).
- **Cổng phụ**(B) được dùng để truyền tải các thông báo về giao dịch.

![Single Channel Server](/img/learn/singlechannel.png)

Hình ảnh thể hiện kết nối giữa hai nút đơn kênh hoặc giữa một nút đơn kênh và một nút đa kênh.
Trong trường hợp này, tất cả các thông báo liên quan đến khối, giao dịch và giao thức đồng thuận sẽ được chuyển qua cùng một cổng.

## Cổng  <a id="multichannel-port"></a>

Để đặt số lượng cổng trong KNI, vui lòng tham khảo [lược đồ KNI](./kni.md).

- Đơn kênh: Một nút đơn kênh sử dụng một cổng (mặc định là 32323).
- Đa kênh: Một nút đa kênh sử dụng hai cổng. Bạn có thể chỉ định các cổng này tại `port` và `subport`. Trong Klaytn, các giá trị mặc định của `port` và `subport` lần lượt là 32323 và 32324.
  - Bạn có thể không đặt `subport` khi kết nối với nút đa kênh. Trong trường hợp này, ban đầu, một nút Klaytn cố kết nối bằng đơn kênh. Trong quá trình tạo kết nối, số lượng cổng thực tế của nút ngang hàng sẽ được tiết lộ. Nếu nút ngang hàng là một nút đa kênh, kết nối hiện hành sẽ bị hủy và một kệt nối khác sẽ được tạo ra với các cổng đã cập nhật.
