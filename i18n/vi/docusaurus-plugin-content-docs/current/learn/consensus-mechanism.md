# Cơ chế đồng thuận

Cơ chế đồng thuận (thuật toán) là cách để đạt được sự đồng thuận giữa các thực thể mà không cần đến sự tin tưởng. Trong công nghệ chuỗi khối, cơ chế này được sử dụng để đạt được sự đồng thuận về việc một khối có hợp lệ hay không. Hiệu suất của các mạng chuỗi khối phụ thuộc vào hiệu suất của các cơ chế đồng thuận đã được thông qua và nó có tác động đáng kể đến khả năng sử dụng cảm nhận của các Ứng dụng chuỗi khối.

Mạng chính thức Cypress của Klaytn có hiệu suất như sau.
- Xử lý hơn 4.000 giao dịch mỗi giây.
- Hoàn thiện giao dịch tức thời.
- Thời gian tạo khối một giây.
- Hơn 50 nút đồng thuận có thể tham gia vào quá trình đồng thuận.

Trong tài liệu này, chúng ta sẽ tìm hiểu cách áp dụng quy trình đồng thuận hiệu suất cao của Klaytn.

## Thông tin cơ bản <a id="background"></a>

[Bitcoin](https://en.wikipedia.org/wiki/Bitcoin) đang sử dụng [PoW](https://en.wikipedia.org/wiki/Proof_of_work) (Bằng chứng công việc), trong khi Ethereum gần đây đã chuyển qua [PoS](https://en.wikipedia.org/wiki/Proof_of_stake) (Bằng chứng cổ phần), cơ chế này sẽ quyết định về các nút tạo khối bằng cổ phần của nút. Thông thường, các thuật toán này không cần đến hoạt động giao tiếp giữa các nút trong việc quyết định về tính hợp lệ của các khối.

Vì thế, trong các hệ thống này, một phân nhánh có thể phát sinh, nghĩa là có thể có từ hai khối khác nhau trở lên được tạo ra với cùng một chiều cao. Thông thường, quy tắc "chuỗi nào dài nhất sẽ là chuỗi hợp lệ" được áp dụng để xử lý tình trạng phân nhánh. Điều này có nghĩa là các phân nhánh này cuối cùng sẽ được hợp nhất thành một chuỗi chính tắc duy nhất, nhưng điều này cũng có nghĩa là danh sách các khối có thể được hoàn nguyên sau một khoảng thời gian nào đó khi nó thuộc về chuỗi ngắn hơn. Vì thế, trong các thuật toán này, không có gì đảm bảo được tính hoàn thiện của các khối và giao dịch. Tính hoàn thiện chỉ có thể đạt được theo xác suất sau một khoảng thời gian, điều này vẫn không thể được đảm bảo 100%.

Tình trạng thiếu tính hoàn thiện này là một vấn đề khó khăn đối với các dịch vụ lấy khách hàng làm trọng tâm có sử dụng nền tảng chuỗi khối. Điều này xảy ra là vì cần phải đợi cho đến khi các phân nhánh được giải quyết và có đủ khối được tạo ra sau giao dịch chuyển tiền để tin rằng giao dịch không thể đảo ngược. Điều này có tác động tiêu cực đến cả người dùng và nhà cung cấp dịch vụ.

Các dịch vụ tài chính có thể làm ví dụ minh họa đơn giản cho vấn đề này. Giả sử một người dùng chuyển tiền cho người khác và dịch vụ này không thể xác minh rằng giao dịch chuyển tiền đó là hợp lệ trong 30 đến 60 phút. Điều này xảy ra là vì cần phải đợi cho đến khi các phân nhánh đã được hợp nhất thành một chuỗi duy nhất và có một số khối đã được tạo ra sau giao dịch chuyển tiền để đảm bảo rằng giao dịch đó không thể đảo ngược.

### PBFT (Hệ thống chịu lỗi Byzantine thiết thực)  <a id="pbft-practical-byzantine-fault-tolerance"></a>
Để ngăn ngừa các vấn đề trên, chúng ta cần các thuật toán khác, đảm bảo được tính hoàn thiện. Thuật toán BFT là một trong số đó, được [ra mắt](https://dl.acm.org/citation.cfm?doid=357172.357176) lần đầu vào năm 1982 bởi Lamport, Shostak, Pease. Vào năm 1999, Miguel Castro và Barbara Liskov giới thiệu "Hệ thống chịu lỗi Byzantine thiết thực"([PBFT](http://www.pmg.csail.mit.edu/papers/bft-tocs.pdf)) cung cấp tính năng nhân bản máy trạng thái hiệu suất cao.

Trong thuật toán PoW được nêu ở trên, mặc dù mỗi nút đều nhận và xác thực các khối, không có sự trao đổi thông báo giữa các nút để đạt được sự đồng thuận. Tuy nhiên, trong PBFT, mỗi nút đều giao tiếp với các nút tham gia khác để đạt được sự đồng thuận và tính hoàn thiện của khối cũng có thể được đảm bảo ngay khi các nút có thể đạt được sự đồng thuận.

Hoạt động giao tiếp giữa các nút về cơ bản diễn ra như sau. Tuy nhiên, có một số biến thể phản ánh đặc điểm của từng hệ thống.

![Luồng thông báo của PBFT](/img/learn/pbft.png)

Như đã nêu ở trên, về cơ bản, một nút tham gia trong PBFT giao tiếp với tất cả các nút trong mạng tại một số giai đoạn. Đặc tính này giới hạn số lượng nút vì khối lượng giao tiếp tăng theo cấp số nhân khi số lượng nút tăng lên.

## Cơ chế đồng thuận trong Klaytn <a id="consensus-mechanism-in-klaytn"></a>
Klaytn mong muốn trở thành một nền tảng lấy dịch vụ làm trọng tâm và sẵn sàng cho doanh nghiệp. Do đó, chúng ta cần giải quyết vấn đề về tính hoàn thiện đã nêu ở trên và mạng sẽ có thể cho phép nhiều nút tham gia vào mạng. Để thực hiện được điều này, Klaytn đang sử dụng phiên bản tối ưu hóa của Istanbul BFT, phiên bản này triển khai PBFT với một số sửa đổi để xử lý các đặc tính của mạng chuỗi khối.

Trong Klaytn, có ba loại nút, CN (Nút đồng thuận), ON (Nút proxy) và EN (Nút điểm cuối). CN được quản lý bởi các CCO (Người vận hành Core Cell) và chịu trách nhiệm tạo khối. Các khối này được xác minh bởi tất cả các nút trong mạng. Vui lòng tham khảo [ở đây](./learn.md#klaytn-network-topology) để tìm hiểu thêm về mô hình cấu trúc mạng này.

![Cấu trúc liên kết mạng](/img/learn/klaytn_network_node.png)

Klaytn đạt được tính hoàn thiện nhanh nhờ việc áp dụng và cải thiện Istanbul BFT. Do việc xác thực và đồng thuận được thực hiện cho mỗi khối nên sẽ không phát sinh hiện tượng phân nhánh, đồng thời, tính hoàn thiện của khối được đảm bảo ngay lập tức sau khi đạt được sự đồng thuận.

Ngoài ra, vấn đề về việc tăng khối lượng giao tiếp trong thuật toán BFT cũng được giải quyết bằng cách sử dụng `Ủy ban` được chọn ngẫu nhiên. Các CN cùng nhau tạo thành một `Hội đồng` và với mỗi lần tạo khối, một phần trong số này được chọn làm thành viên của `Ủy ban` bằng cách sử dụng VRF (Chức năng ngẫu nhiên có thể xác minh).

![Khái niệm về hội đồng và ủy ban](/img/learn/council-committee.png)

Do các thông báo về đồng thuận chỉ được trao đổi giữa các thành viên ủy ban, nên khối lượng giao tiếp có thể bị giới hạn dưới mức thiết kế, mặc dù tổng số các CN tăng lên.

Hiện tại, mạng chính thức của Klaytn, Cypress, có thể cung cấp thông lượng cao ở mức 4000 giao dịch mỗi giây, với khoảng thời gian tạo khối là một giây. Hiện tại, hơn 50 nút đồng thuận có thể tham gia vào CNN (Mạng nút đồng thuận) và con số này sẽ liên tục tăng lên khi Klaytn tiếp tục tích cực tối ưu hóa thuật toán.
