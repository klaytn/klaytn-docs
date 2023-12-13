# Tổng quan

Klaytn là một chuỗi khối công khai, dựa trên BFT, được tối ưu hóa cao nhằm đáp ứng độ tin cậy ở cấp doanh nghiệp. Các mục tiêu thiết kế chính là;

- Tính hoàn thiện tức thời.
- TPS cao đáp ứng các trường hợp sử dụng trong thực tế.
- Giảm chi phí chạy các ứng dụng chuỗi khối.
- Giảm thiểu các rào cản tham gia cho người dùng cuối.
- Đơn giản hóa quá trình áp dụng công nghệ trong ngành.

Klaytn khởi chạy mạng chính thức [Cypress](https://scope.klaytn.com/) của mình vào ngày 27 tháng 6 năm 2019 với các thông số kỹ thuật sau.

- Thời gian tạo và xác nhận khối 1 giây.
- 4.000 giao dịch mỗi giây.
- Giá gas thấp, gần bằng 1/10 Ethereum.
- Chạy EVM (Máy ảo Ethereum) và hỗ trợ thực thi các hợp đồng Solidity.
- 19 tập đoàn uy tín trên toàn thế giới đã thành lập Hội đồng quản trị của Klaytn từ ban đầu để vận hành các nút đồng thuận. Số lượng nút đồng thuận hiện tại được nêu trong [Klaytnscope](https://scope.klaytn.com/).
- Hơn 50 đối tác dịch vụ ban đầu đã cam kết khởi chạy các ứng dụng chuỗi khối trên Klaytn.

## Klaytn: Bức tranh toàn cảnh <a id="klaytn-the-big-picture"></a>

Klaytn có thể được phân vùng thành ba mạng con logic dựa trên vai trò và mục đích của chúng. Hình dưới đây hiển thị chế động xem cấp cao của hệ sinh thái Klaytn.

![Hệ sinh thái Klaytn và các mạng con logic (CNN, ENN, SCN)](/img/learn/klaytn_network_overview.png)

### Mạng Core Cell (CCN) <a id="core-cell-network-ccn"></a>

CCN có chứa các Core Cell (CC) xác thực và thực thi các giao dịch được gửi qua các Nút điểm cuối (EN). CCN chịu trách nhiệm tạo và truyền các khối trong mạng.

### Mạng lưới nút điểm cuối (ENN) <a id="endpoint-node-network-enn"></a>

ENN bao gồm các Nút điểm cuối (EN) chủ yếu tạo giao dịch, xử lý các yêu cầu API RPC và xử lý các yêu cầu dữ liệu từ chuỗi dịch vụ.

### Mạng lưới chuỗi dịch vụ (SCN) <a id="service-chain-network-scn"></a>

SCN là các mạng con của Klaytn có chứa các chuỗi khối phụ trợ được vận hành độc lập bởi dApp (Ứng dụng phi tập trung). Các chuỗi dịch vụ được kết nối với chuỗi chính thông qua các EN.

**Mạng Core Cell** và **Mạng lưới nút điểm cuối** tạo nên chuỗi chính của Klaytn, hay mạng chính thức. Các ứng dụng chuỗi khối có thể chạy trên chuỗi chính của Klaytn, Cypress hoặc có thể vận hành trên các chuỗi khối của riêng chúng, được gọi là **Chuỗi dịch vụ**. Nếu bạn muốn có một môi trường thực thi riêng cho ứng dụng của mình, đảm bảo có TPS cao và các chính sách mạng lưới cấu hình được, chúng tôi khuyến khích bạn nên dùng Chuỗi dịch vụ.

> Để thiết lập một Chuỗi dịch vụ cho ứng dụng của mình, hãy đọc phần [hướng dẫn cài đặt và vận hành Chuỗi dịch vụ](../nodes/service-chain/quick-start/quick-start.md).

## Mô hình cấu trúc mạng lưới Klaytn <a id="klaytn-network-topology"></a>

Trong phần này, chúng tôi sẽ mô tả mô hình cấu trúc chuỗi chính của Klaytn. Một kiến trúc mạng theo tầng với các loại nút dựa trên vai trò, được triển khai trong Klaytn nhằm tối ưu hóa hiệu suất mạng.

### Các loại nút dựa trên vai trò <a id="role-based-node-types"></a>

Trước khi tìm hiểu về mô hình cấu trúc chuỗi chính của Klaytn, chúng ta cần làm quen với các loại nút khác nhau của Klaytn.

#### Core Cell (CC): Nút đồng thuận (CN) + Nút Proxy (PN) <a id="core-cell-cc-consensus-node-cn-proxy-node-pn"></a>

Một Core Cell (CC) được tạo thành bởi một **Nút đồng thuận (CN)** duy nhất và hai **Nút proxy (PN)**. Nút đồng thuận tham gia vào quá trình tạo khối, trong khi Nút proxy cung cấp giao diện cho mạng. Nút proxy chuyển yêu cầu giao dịch đến Nút đồng thuận và truyền các khối xuống Nút điểm cuối.

> Nếu bạn muốn trở thành Người vận hành Core Cell, hãy đọc phần [hướng dẫn cài đặt và vận hành Core Cell](../nodes/core-cell/install/before-you-install.md).

#### Nút điểm cuối (EN) <a id="endpoint-node-en"></a>

EN đóng vai trò là điểm cuối cho mạng lưới Klaytn xử lý các yêu cầu API RPC và xử lý dữ liệu gửi đến và từ các chuỗi dịch vụ.

> Để thiết lập Nút điểm cuối cho ứng dụng của bạn, hãy đọc phần [hướng dẫn cài đặt và vận hành Nút điểm cuối](../nodes/endpoint-node/endpoint-node.md).

#### Nút ban đầu <a id="bootnode"></a>

Nút ban đầu là một loại nút đặc biệt được Klaytn vận hành để giúp các nút mới tham gia đăng ký vào mạng lưới và để khám phá các nút khác nhằm kết nối cùng. Nút ban đầu CN nằm trong CNN và không công khai, còn các nút ban đầu PN và EN thì công khai.  Các nút ban đầu PN chỉ cho phép các PN được cấp quyền đăng ký và cho phép các PN đủ điều kiện kết nối với các EN.  Các nút ban đầu EN cung cấp cho EN thông tin về các PN cần kết nối.

### Mạng phân tầng <a id="tiered-networks"></a>

CN, PN và EN lần lượt tạo thành các mạng logic, Mạng nút đồng thuận (CNN), Mạng nút proxy (PNN) và Mạng lưới nút điểm cuối (ENN).

Hình bên dưới hiển thị mô hình cấu trúc tổng thể của mạng chính thức của Klaytn, trong đó mạng Core Cell (CCN) được chia nhỏ thành Mạng nút đồng thuận (CNN) và Mạng nút proxy (PNN). Mạng lưới nút điểm cuối (ENN) cũng được hiển thị dưới dạng mạng xung quanh được kết nối trực tiếp với PNN.

![Klaytn Main Chain Physical Topology and Tiered Architecture (CNN, PNN, and ENN)](/img/learn/klaytn_network_node.png)


#### Mạng nút đồng thuận (CNN) <a id="consensus-node-network-cnn"></a>

CN hình thành một mạng lưới đầy đủ gọi là CNN. CNN áp dụng BFT trên WAN (mạng diện rộng) và cần mỗi CN đáp ứng [các yêu cầu nghiêm ngặt về phần cứng và tài nguyên mạng](./../nodes/core-cell/system-requirements.md) để thực hiện đồng thuận BFT ở mức hiệu suất vừa đủ.

#### Mạng nút proxy (PNN) <a id="proxy-node-network-pnn"></a>

PNN có chứa các PN. Thông thường, các PN chỉ duy trì một kết nối với một PN trong Core Cell lân cận. Số lượng kết nối ngang hàng có thể thay đổi tùy thuộc vào cấu hình mạng.

#### Mạng lưới nút điểm cuối (ENN) <a id="endpoint-node-network-enn"></a>

Mạng con ngoài cùng, ENN, chỉ bao gồm các EN được kết nối.


## Tạo và truyền khối <a id="block-generation-and-propagation"></a>

Thiết kế tạo và truyền khối, cùng với thuật toán đồng thuận được sử dụng, đó một vai trò quan trọng trong việc giảm thiểu độ trễ của một nền tảng chuỗi khối

### Chu kỳ tạo khối <a id="block-generation-cycle"></a>

Trong Klaytn, chu kỳ tạo khối được goi là "vòng". Mỗi vòng tạo ra một khối mới và một vòng mới bắt đầu ngay sau đó. Klaytn đặt mục tiêu mỗi vòng kéo dài khoảng một giây, mặc dù khoảng thời gian tạo khối có thể bị ảnh hưởng bởi lưu lượng mạng và điều kiện hoạt động của nút.

#### Lựa chọn ủy bạn và người đề xuất <a id="proposer-and-committee-selection"></a>

Trong mỗi vòng, Klaytn ngẫu nhiên nhưng chắc chắn chọn một Nút đồng thuận (CN) làm người đề xuất khối được tạo, sau đó chọn một nhóm CN làm ủy ban cho vòng đó. Klaytn không liên quan trực tiếp đến việc chọn người đề xuất hay ủy ban; thay vào đó, mỗi CN sử dụng một con số ngẫu nhiên lấy từ tiêu đề của khối gần đây nhất để chạy một hoạt động mã hóa, tạo bằng chứng rằng CN đã (hoặc chưa) được chọn cho vòng này. Quy mô của ủy ban phải chống lỗi Byzantine; nếu quy mô của CNN ở mức nhỏ, thì tất cả các CN (trừ người đề xuất) sẽ đủ điều kiện để được chọn làm thành viên ủy ban.

#### Đề xuất và xác thực khối <a id="block-proposal-and-validation"></a>

Khi đã được chọn, người đề xuất sẽ phân phối bằng chứng lựa chọn của mình cho vòng đó (nghĩa là bằng chứng mật mã có thể xác thực bằng mã khóa công khai của người đề xuất) cho tất cả các CN. Sau đó, các CN được lựa chọn làm ủy ban cho vòng nhất định sẽ phản hồi người đề xuất bằng những bằng chứng lựa chọn của riêng họ, thông báo cho người đề xuất về việc ai là người sẽ phân phối khối mới sắp được đề xuất. Sau đó, người đề xuất sẽ chọn một tập hợp các giao dịch từ bể giao dịch và tạo khối bằng các sắp xếp chúng. Cuối cùng, người đề xuất thực thi sự đồng thuận với ủy ban để đồng ý và hoàn tất khối mới được tạo. Lưu ý rằng Klaytn có kế hoạch liên tục cải tiến thuật toán đồng thuận để đạt được độ bảo mật và hiệu quả cao hơn.

### Truyền khối <a id="block-propagation"></a>

Một khối phải nhận được chữ ký từ hơn hai phần ba thành viên ủy ban để được hoàn tất thành công. Khi ủy ban đạt được sự đồng thuận, khối mới sẽ được truyền đến tất cả các CN và vòng đồng thuận kết thúc. Khi khối mới được truyền đến tất cả các CN, thông tin của khối mới được tạo có thể được cung cấp cho tất cả những người tham gia mạng lưới Klaytn nhờ cung cấp tiêu đề khối và dữ liệu nội dung cho ENN thông qua PNN.

## Công bố công khai và xác thực mở<a id="public-disclosure-and-open-validation"></a>

Các nhà cung cấp dịch vụ và người dùng cuối trên mạng lưới Klaytn có thể tự do xác thực kết quả tạo khối và kiểm tra xem ủy ban CN có tạo khối đó có theo các thủ tục phù hợp hay không. Việc xác thực như vậy bao gồm kiểm tra xem tiêu đề khối có chứa nhiều hơn hai phần ba chữ ký của thành viên ủy ban hay không. Tất cả các CN phải hỗ trợ việc xác thực mở và bắt buộc phải đăng tải mã khóa công khai của họ (được dùng để ký các khối) trong một không gian có thể truy cập công khai (ví dụ như tiêu đề khối). Việc xác thực mở sẽ thúc đẩy tính minh bạch, ngăn chặn việc cắt bỏ thông tin và ngăn ngừa các hành vi độc hại.

## Các kênh truyền riêng biệt cho các khối và giao dịch (truyền đa kênh) <a id="separated-propagation-channels-for-blocks-and-transactions-multichannel-propagat"></a>

Độ trễ của một mạng chịu ảnh hưởng rất lớn bởi mức độ nghẽn mạng. Giả sử thông lượng của một mạng duy trì không đổi, số lượng giao dịch tăng lên sẽ khiến độ trễ của mạng bị trễ tương ứng. Độ trễ là một vấn đề nghiêm trọng trong các dApp; người dùng thông thường của các ứng dụng di động hoặc dịch vụ web cũ sẽ không chấp nhận thời gian phản hồi mất nhiều hơn vài giây và các dịch vụ chuỗi khối không có lý do gì để cho rằng người dùng có khả năng chấp nhận mức cao hơn.

Klaytn áp dụng hướng tiếp cận đa kênh để xử lý các vấn đề nghẽn mạng. Bằng cách chỉ định các kênh truyền riêng cho giao dịch và khối, mạng lưới Klaytn có thể kịp thời truyền các khối mới tạo, ngay cả khi mạng đang bị nghẽn nghiêm trọng với số lượng giao dịch lớn. Bằng cách này, Klaytn đảm bảo rằng các dApp trên mạng của nó có thể luôn phản hồi các yêu cầu từ người dùng cuối, bất kể lưu lượng truy cập mạng có lúc tăng đột biến.

## Phần thưởng khối <a id="block-rewards"></a>

Đối với mỗi vòng, phần thưởng khối (tổng của 6,4 KLAY mới tạo và phí giao dịch được trả để xử lý khối) sẽ được phân bổ cho những người tham gia mạng theo tỷ lệ phân phối đặt trước. Người đề xuất của khối mới được tạo sẽ nhận được 100% phần thưởng được trao cho các CN, còn ủy ban sẽ không nhận được gì. Lưu ý rằng xác suất của việc được chọn làm người đề xuất chịu ảnh hưởng của số lượng KLAY được nắm giữ bởi CN, nghĩa là một CN có càng nhiều KLAY được đầu tư vào nền tảng thì sẽ có xác suất nhận được nhiều phần thưởng hơn. Bạn có thể xem chi tiết về việc phân phối phần thưởng khối trong phần [Nền kinh tế token của Klay](./token-economy.md).
