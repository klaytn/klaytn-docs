# Giải pháp mở rộng

## Chuỗi dịch vụ <a id="service-chain"></a>
Chuỗi dịch vụ trong Klaytn là các chuỗi khối phụ trợ độc lập với chuỗi chính Klaytn, được điều chỉnh cho từng dApp cần đến cấu hình nút đặc biệt, mức độ bảo mật tùy chỉnh hoặc thông lượng cao đặc biệt khiến việc triển khai dApp đó trên chuỗi chính trở nên bất tiện hoặc không khả thi về mặt kinh tế.

Mặc dù có các giải pháp mở rộng quy mô phi tập trung hoàn toàn, do các giao diện khó dùng, ví dụ như phát sinh thách thức hoặc thoát và hoàn thiện không tức thời, chúng tôi có hướng tiếp cận khác đối với Chuỗi dịch vụ của Klaytn bằng cách đánh đổi khả năng phi tập trung hoàn toàn để nâng cao khả năng sử dụng, hoàn thiện tức thời, hiệu suất cao và tính sẵn có cao.

Chuỗi dịch vụ của Klaytn có thể được sử dụng cho các mục tiêu dịch vụ cụ thể khác nhau và có thể kết nối với chuỗi chính vì nhiều lý do, bao gồm neo dữ liệu (lưu trữ định kỳ các hàm băm khối từ chuỗi dịch vụ lên chuỗi chính để bù cho tính bảo mật của chuỗi dịch vụ bị giảm do số lượng nút ít đi) hoặc chuyển giá trị (chuyển KLAY liên chuỗi, đơn vị giá trị gốc của Klaytn và token do các dApp phát hành).

## Mạng <a id="network"></a>
Các chuỗi dịch vụ kết nối với chuỗi chính của Klaytn đều cùng được gọi là Mạng chuỗi dịch vụ. Lưu ý rằng phương pháp kết nối giữa các chuỗi dịch vụ và chuỗi chính có thể thay đổi trong các lần lặp lại trong tương lai của Klaytn.

![Hình 1. Chuỗi chính và Chuỗi dịch vụ của Klaytn](/img/learn/mainchain_servicechain.png)

Hình 1 minh họa mô hình cấu trúc liên kết mạng của các chuỗi dịch vụ đang được sử dụng để đáp ứng nhiều nhu cầu hoạt động kinh doanh khác nhau, được kết nối với chuỗi chính của Klaytn để mở rộng mạng của Klaytn.

![Hình 2. Kết nối giữa Chuỗi chính và Chuỗi dịch vụ sử dụng Mô hình cầu nối chính/cầu nối con](/img/learn/sc_connection.png)

Hình 2 minh họa một ví dụ về SCN (Nút đồng thuận chuỗi dịch vụ) được kết nối trực tiếp với EN (Nút điểm cuối) của chuỗi chính của Klaytn bằng mô hình cầu nối con/cầu nối chính trong việc sử dụng các tính năng của chuỗi dịch vụ.

## Tính năng <a id="features"></a>
Chuỗi dịch vụ mở rộng và tăng cường Klaytn bằng cách cung cấp một cơ chế toàn vẹn dữ liệu và hỗ trợ chuyển token giữa các chuỗi khác nhau.

### Neo dữ liệu <a id="data-anchoring"></a>
Đối với tính toàn vẹn của dữ liệu, Chuỗi dịch vụ có thể tự động neo từng hàm băm của khối chuỗi dịch vụ vào chuỗi chính như một giao dịch đặc biệt. Việc neo dữ liệu này có thể đảm bảo với người dùng dịch vụ rằng dữ liệu trong chuỗi dịch vụ không thể bị thay đổi sau khi được tạo.

### Chuyển giá trị <a id="value-transfer"></a>
Để giúp các nhà cung cấp dịch vụ (SP) dễ dàng di chuyển người dùng dịch vụ và giá trị trên khắp chuỗi, có thể kích hoạt hoạt động chuyển các token như KLAY (đơn vị giá trị mặc định của Klaytn) và các token Klaytn do các dApp phát hành giữa nhiều chuỗi khác nhau. Người dùng có thể dễ dàng yêu cầu chuyển token đến các chuỗi khác bằng cách gửi một giao dịch đến một hợp đồng đặc biệt, được gọi là hợp đồng bắc cầu.

