# Overview <a id="overview"></a>

Klaytn is a highly optimized, BFT-based public blockchain that aims to meet the enterprise-grade reliability. Key design goals are;

- Immediate finality.
- High TPS that meets real-world use cases.
- Lower the cost of running Blockchain Applications.
- Lower the barriers to entry for end-users.
- Ease the technology adoption process for industry.

Klaytn launched its mainnet, [Cypress](https://scope.klaytn.com/), on Jun/27/2019 with the following specifications.

- 1-second block generation and confirmation time.
- 4,000 transactions per second.
- Low gas price that is almost 1/10 of Ethereum.
- Runs EVM (Ethereum Virtual Machine) and supports the execution of Solidity contracts.
- 19 reputable corporations worldwide initially formed Klaytn Governance Council to operate consensus nodes. The current number of consensus nodes is shown in the [Klaytnscope](https://scope.klaytn.com/).
- More than 50 initial service partners have committed to launch Blockchain Applications on Klaytn.

## Klaytn: Bức tranh toàn cảnh <a id="klaytn-the-big-picture"></a>

Klaytn có thể được phân vùng thành ba mạng con hợp logic dựa trên vai trò và mục đích của chúng. Hình dưới đây hiển thị chế động xem cấp cao của hệ sinh thái Klaytn.

![Hệ sinh thái Klaytn và các mạng con logic (CNN, ENN, SCN)](images/klaytn_network_overview.png)

### Mạng lưới Core Cell (CCN) <a id="core-cell-network-ccn"></a>

CCn có chứa các Core Cell (CC) xác thực và thực thi các giao dịch được gửi qua các Nút điểm cuối (EN). CCN chịu trách nhiệm tạo và truyền các khối xuyên suốt mạng lưới.

### Mạng lưới nút điểm cuối (ENN) <a id="endpoint-node-network-enn"></a>

ENN bao gồm các Nút điểm cuối (EN) chủ yếu tạo giao dịch, xử lý các yêu cầu API RPC và xử lý các yêu cầu dữ liệu từ chuỗi dịch vụ.

### Mạng lưới chuỗi dịch vụ (SCN) <a id="service-chain-network-scn"></a>

SCN là các mạng con của Klaytn có chứa các chuỗi khối phụ trợ được vận hành độc lập bởi dApp (Ứng dụng phi tập trung). Các chuỗi dịch vụ được kết nối với chuỗi chính thông qua các EN.

**Mạng lưới Core Cell** và **Mạng lưới nút điểm cuối** tạo nên chuỗi chính của Klaytn, hay mạng lưới chính thức. Các ứng dụng chuỗi khối có thể chạy trên chuỗi chính của Klaytn, Cypress hoặc có thể vận hành trên các chuỗi khối của riêng chúng, được gọi là **Chuỗi dịch vụ**. Nếu bạn muốn có một môi trường thực thi riêng cho ứng dụng của mình, đảm bảo có TPS cao và các chính sách mạng lưới cấu hình được, chúng tôi khuyến khích bạn dùng Chuỗi dịch vụ.

> Để thiết lập một Chuỗi dịch vụ cho ứng dụng của mình, hãy đọc [hướng dẫn cài đặt và vận hành Chuỗi dịch vụ](./../installation-guide/deployment/service-chain/getting-started/README.md).

## Mô hình cấu trúc mạng Klaytn <a id="klaytn-network-topology"></a>

Trong phần này, chúng tôi sẽ mô tả mô hình cấu trúc chuỗi chính của Klaytn. Một kiến trúc mạng theo tầng với các loại nút dựa trên vai trò, được triển khai trong Klaytn nhằm tối ưu hóa hiệu suất mạng.

### Các loại nút dựa trên vai trò <a id="role-based-node-types"></a>

Trước khi tìm hiểu về mô hình cấu trúc chuỗi chính của Klaytn, chúng ta cần làm quen với các loại nút Klaytn khác nhau.

#### Core Cell (CC): Nút đồng thuận (CN) + Nút Proxy (PN) <a id="core-cell-cc-consensus-node-cn-proxy-node-pn"></a>
Một Core Cell (CC) được tạo thành bởi một <strong>Nút đồng thuận (CN)<strong> duy nhất và hai <strong>Nút proxy (PN)<strong>. Nút đồng thuận tham gia vào quá trình tạo khối, trong khi Nút proxy cung cấp giao diện cho mạng lưới. PN truyền yêu cầu giao dịch tới các Nút đồng thuận, và đưa các khối xuống các Nút điểm cuối.

> Nếu bạn muốn trở thành Người vận hành Core Cell, hãy đọc[hướng dẫn cài đặt và vận hành Core Cell](./../installation-guide/deployment/core-cell/installation-guide/before-you-install.md).

#### Nút điểm cuối (EN) <a id="endpoint-node-en"></a>

EN đóng vai trò là điểm cuối cho mạng Klaytn xử lý các yêu cầu API RPC và xử lý dữ liệu gửi tới và từ các chuỗi dịch vụ.

> Để thiết lập một Nút điểm cuối cho ứng dụng của bạn, hãy đọc [hướng dẫn cài đặt và vận hành Nút điểm cuối](./../installation-guide/deployment/endpoint-node/README.md).

#### Nút ban đầu <a id="bootnode"></a>

Nút ban đầu là một loại nút đặc biệt được Klaytn vận hành để giúp các nút mới tham gia đăng ký vào mạng lưới, và để khám phá các nút khác nhằm kết nối cùng. Nút ban đầu CN nằm trong CNN và không công khai, còn các nút ban đầu PN và EN thì công khai.  Các nút ban đầu PN chỉ cho phép các PN được cấp quyền đăng ký, và cho phép các PN đủ điều kiện kết nối với các EN.  Các nút ban đầu EN cung cấp cho các EN thông tin về các PN cần kết nối.

### Mạng phân tầng <a id="tiered-networks"></a>

CN, PN và EN lần lượt tạo thành các mạng logic, Mạng nút đồng thuận (CNN), Mạng nút proxy (PNN) và Mạng nút điểm cuối (ENN).

Hình bên dưới hiển thị mô hình cấu trúc tổng thể của mạng lưới chính thức của Klaytn, trong đó mạng Core Cell (CCN) được chia nhỏ thành Mạng nút đồng thuận (CNN) và Mạng nút proxy (PNN).

![Klaytn Main Chain Physical Topology and Tiered Architecture (CNN, PNN, and ENN)](images/klaytn_network_node.png)


#### Mạng nút đồng thuận (CNN) <a id="consensus-node-network-cnn"></a>

CN hình thành một mạng mesh đầy đủ gọi là CNN. CNN áp dụng BFT trên WAN (mạng diện rộng) và cần mỗi CN đáp ứng [các yêu cầu nghiêm ngặt về phần cứng và tài nguyên mạng](./../installation-guide/deployment/core-cell/system-requirements.md) để thực hiện sự đồng thuận BFT ở mức hiệu suất vừa đủ.

#### Mạng nút proxy (PNN) <a id="proxy-node-network-pnn"></a>

PNN có chứa các PN. Thông thường, các PN chỉ duy trì một kết nối với một PN trong Core Cell lân cận. Số lượng kết nối ngang hàng có thể thay đổi tùy thuộc vào cấu hình mạng.

#### Mạng nút điểm cuối (ENN) <a id="endpoint-node-network-enn"></a>

Mạng con ngoài cùng, ENN, chỉ bao gồm các EN được kết nối.


## Tạo và truyền khối <a id="block-generation-and-propagation"></a>

Thiết kế của việc tạo và truyền khối, cùng với thuật toán đồng thuận được sử dụng, đó một vai trò quan trọng trong việc giảm thiểu độ trễ của một nền tảng chuỗi khối

### Chu kỳ tạo khối <a id="block-generation-cycle"></a>

Trong Klaytn, chu kỳ tạo khối được goi là "vòng". Mỗi vòng tạo ra một khối mới và một vòng mới bắt đầu ngay sau đó. Klaytn đặt mục tiêu mỗi vòng kéo dài khoảng một giây, mặc dùng khoảng thời gian tạo khối có thể bị ảnh hưởng bởi lưu lượng mạng và điều kiện hoạt động của nút.

#### Lựa chọn Ủy bạn và Người đề xuất <a id="proposer-and-committee-selection"></a>

Trong mỗi vòng, Klaytn ngẫu nhiên nhưng chắc chắn chọn một Nút đồng thuận (CN) làm người đề xuất khối được tạo, sau đó chọn một nhóm CN làm ủy ban cho vòng đó. Klaytn không liên quan trực tiếp tới việc chọn người đề xuất hay ủy ban; thay vào đó, mỗi CN sử dụng một con số ngẫu nhiên lấy từ tiêu đề của khối gần đây nhất để chạy một hoạt động mã hóa, tạo bằng chứng rằng CN đã (hoặc chưa) được chọn cho vòng này. Quy mô của ủy ban phải chống lỗi Byzantine; nếu quy mô của CNN ở mức nhỏ, tất cả các CN (trừ người đề xuất) sẽ đủ điều kiện để được chọn làm thành viên ủy ban.

#### Đề xuất và xác thực khối <a id="block-proposal-and-validation"></a>

Khi đã được chọn, người đề xuất sẽ phân phối bằng chứng lựa chọn của mình cho vòng đó (nghĩa là bằng chứng mật mã có thể xác thực bằng khóa công khai của người đề xuất) cho tất cả các CN. Sau đó, các CN được lựa chọn làm ủy ban cho vòng nhất định sẽ phản hồi người đề xuất bằng những bằng chứng lựa chọn của riêng họ, thông báo cho người đề xuất về việc ai là người sẽ phân phối khối mới sắp được đề xuất. Sau đó, người đề xuất sẽ chọn một tập hợp các giao dịch từ bể giao dịch và tạo một khối bằng các sắp xếp chúng. Cuối cùng, người đề xuất thực thi sự đồng thuận với ủy ban để đồng ý và hoàn tất khối mới được tạo. Hãy lưu ý rằng Klaytn có kế hoạch liên tục cải tiến thuật toán đồng thuận để đạt được độ bảo mật và hiệu quả cao hơn.

### Truyền khối <a id="block-propagation"></a>

Một khối phải nhận được chữ ký từ hơn hai phần ba thành viên ủy ban để được hoàn tất thành công. Khi ủy ban đạt được sự đồng thuận, khối mới sẽ được truyền tới tất cả các CN và vòng đồng thuận kết thúc. Khi khối mới được truyền tới tất cả các CN, thông tin của khối mới được tạo có thể được cung cấp cho tất cả những người tham gia mạng Klaytn nhờ cung cấp tiêu đề khối và dữ liệu nội dung cho ENN thông quan PNN.

## Tiết lộ công khai và xác thực mở<a id="public-disclosure-and-open-validation"></a>

Các nhà cung cấp dịch vụ và người dùng cuối trên mạng Klaytn có thể tự do xác thực kết quả tạo khối và kiểm tra xem ủy ban CN có tạo khối đó theo các thủ tục phù hợp không. Việc xác thực như vậy bao gồm kiểm tra xem tiêu đề khối có chứa nhiều hơn hai phần ba chữ ký của thành viên ủy ban không. Tất cả các CN phải hỗ trợ việc xác thực mở và bắt buộc phải đăng tải khóa công khai của họ (được dùng để ký các khối) trong một không gian có thể truy cập công khai (ví dụ như tiêu đề khối). Việc xác thực mở sẽ thúc đẩy tính minh bạch, ngăn chặn việc cắt bỏ thông tin và ngăn ngừa các hành vi độc hại.

## Các kênh lan truyền riêng biệt cho các khối và giao dịch (truyền đa kênh) <a id="separated-propagation-channels-for-blocks-and-transactions-multichannel-propagat"></a>

Độ trễ của một mạng chịu ảnh hưởng nặng nề từ mức độ tắc nghẽn. Giả sử thông lượng của một mạng duy trì không đổi, số lượng giao dịch tăng lên sẽ khiến độ trễ của mạng bị trễ tương ứng. Latency delay is a critical issue in dApps; typical users of legacy mobile apps or web services will not tolerate response time that takes more than a few seconds, and blockchain services have no reason to assume a higher user tolerance.

Klaytn adopts a multichannel approach in order to handle network congestion issues. By assigning separate propagation channels for transactions and blocks, Klaytn network is able to propagate newly created blocks in a timely manner even when the network faces heavy congestion with high number of transactions. In this way, Klaytn ensures that dApps on its network can stay responsive to end-user requests regardless of intermittent network traffic spikes.

## Block Rewards <a id="block-rewards"></a>

For each round, block reward (which is the sum of 6.4 newly minted KLAY and transaction fees paid to process the block) will be distributed to the network participants according to preset distribution ratios. The proposer of the newly created block will receive 100% of the reward to be awarded to CNs, whereas the committee will receive none. Note that the probability of being selected as the proposer is influenced by the amount of KLAY staked by the CN, implying that a CN with more KLAY invested in the platform will probabilistically receive more rewards. Details of block reward distribution can be found in the [Klaytn Token Economy](design/token-economy.md) section.
