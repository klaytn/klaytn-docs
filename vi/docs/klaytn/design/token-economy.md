# Token Economy <a id="token-economy"></a>

## Overview <a id="overview"></a>

Klaytn’s token economy is designed to create sustainable funding structures for empowering its ecosystem, growth initiatives, and strategic investments. Many public blockchain projects have monetary systems that solely incentivize their node operators \(miners or block producers\), focusing only on the technical aspect of network maintenance. However, such designs miss out on the importance of incentivizing other types of participants who contribute to the growth of the network’s token economy or invest in long-term growth prospects. In contrast, Klaytn’s token economy is designed to compensate more diverse forms of contributions from a wider range of participants, and has built-in funding structure to procure sustained resources to fuel future growth initiatives and strategically sourced investment projects in addition to maintaining its blockchain nodes.

## Funding Structure <a id="funding-structure"></a>

Cấu trúc tài trợ của Klaytn chạy liên tục với việc tạo khối của mạng Klaytn. Với mỗi khối mới, KLAY mới được phát hành và tổng phí giao dịch được dùng trong khối \(được gọi chung là "phần thưởng khối"\) được tổng hợp và phân phối cho ba toài khoản đích sau theo tỷ lệ được xác định trước:

* Phần thưởng cho Hội đồng quản trị Klaytn: 50%
* Quỹ tăng trưởng Klaytn \(KGF\): 40%
* Khoản dự trữ cải tiến của Klaytn \(KIR\): 10%

6,4 KLAY sẽ được đúc cho mỗi khối mới. Điều này ngụ ý rằng khoảng 200 triệu KLAY sẽ được đúc mỗi năm, tương đương với 2% lạm phát hàng năm so với 10 tỷ KLAY được phát hành vào thời điểm khởi nguyên \(tỷ lệ lạm phát hàng năm có thể thay đổi thông qua Quy trình quản trị Klaytn\). Phí giao dịch được tính theo mỗi OPCODE và được tính theo bảng phí giao dịch. Để biết thông tin chi tiết về bảng phí giao dịch, vui lòng tham khảo [Phí giao dịch](transaction-fees/transaction-fees.md).

## Phần thưởng cho Hội đồng quản trị Klaytn <a id="klaytn-governance-council-reward"></a>

Hội đồng quản trị Klaytn là nhóm tập thể các Nhà điều hành Core Cell \(CCO\). Các thành viên hội đồng có trách nhiệm duy trì Core Cell \(CC\), việc này giúp Hội đồng trở thành cơ quan thiết yếu trong hệ sinh thái Klaytn chịu trách nhiệm cung cấp cơ sở hạ tầng cơ bản. Để trở thành thành viên Hội đồng, ứng viên phải trải qua quá trình đánh giá trình độ theo Quy trình quản trị Klaytn và phải nắm giữ ít nhất 5 triệu KLAY. Phần thưởng của Hội đồng quản trị Klaytn là một cấu trúc dùng để khuyến khích các thành viên Hội đồng tiếp tục cung cấp nền tảng ổn định cho hệ sinh thái Klaytn.

### Cơ chế phần thưởng cho Hội đồng quản trị Klaytn <a id="klaytn-governance-council-reward-mechanism"></a>

Đối với mỗi khối, một Ủy ban sẽ được thành lập, bao gồm các thành viên Hội đồng được lựa chọn ngẫu nhiên. Mỗi Ủy ban có một thành viên được giao vai trò là Người đề xuất; tất cả các thành viên Ủy bạn khác sẽ đảm nhận vai trò là Người xác thực. Khi một khối được tạo thành công và được thêm vào chuỗi khối Klaytn, Người đề xuất của khối đó sẽ được thưởng 100% phần thưởng khối. Xác suất thành viên hội đồng được chọn là Người đề xuất tỷ lệ thuận với số lượng KLAY mà thành viên đó nắm giữ; nghĩa là một thành viên nắm giữ càng nhiều KLAY thì càng có nhiều khả năng người đó sẽ được chọn làm Người đề xuất, và có khả năng nhận được phần thưởng khối.

Miễn là họ đáp ứng được yêu cầu về mức nắm giữ tối thiểu là 5 triệu KLAY, các thành viên Hội đồng quản trị KLAY có thể tự do nắm giữ hoặc hủy nắm giữ KLAY của mình. Thông tin nắm giữ sẽ được cập nhật sau mỗi 86.400 khối, và KLAY mới được nắm giữ sẽ có hiệu lực sau hai chu kỳ cập nhật kể từ thời điểm quá trình nắm giữ hoàn tất. Việc rút phần KLAY đã nắm giữ cần đến một tuần chờ đợi để ngăn việc các thành viên tiêu cực thoát ra ngay lập tức.

Để ngăn chặn tình trạng các nhóm nhỏ gồm các thành viên Hội đồng có mức đầu tư cao độc quyền nhận phần thưởng cho Hội đồng quản trị Klaytn, hệ số Gini có thể được sử dụng để điều chỉnh số tiền KLAY thực tế được nắm giữ. Công thức áp dụng như sau, trong đó G là viết tắt của hệ số Gini trong việc phân phối phần KLAY được nắm giữ của Hội đồng quản trị:

* _Số lượng nắm giữ đã điều chỉnh = \(Số lượng nắm giữ của thành viên hội đồng quản trị\)^\(1/1+G\)_


### Hình phạt cho các Thành viên hội đồng có hành vi sai trái <a id="penalty-for-misbehaving-council-members"></a>

Thành viên hội đồng có thể bị phạt nếu thực hiện các hành vi sai trái được định nghĩa dưới đây. Trong tương lai, nhiều quy tắc phạt hơn có thể sẽ được thiết lập và hoàn thiện thông qua Quy trình quản trị Klaytn.

Gây ra lỗi về an toàn:

* Một thành viên hội đồng được chọn làm Người đề xuất không được tạo ra nhiều hơn một khối với cùng một số khối
* Một thành viên hội đồng được chọn làm Người đề xuất không được bỏ qua các giao dịch nhất định một cách có chủ ý

Gây ra lỗi về xác định thực thể sống:

* Một thành viên hội đồng được chọn làm Người đề xuất phải tạo ra một khối hợp lệ
* Một thành viên hội đồng được chọn làm Người xác thực phải xác thực nút được đề xuất bởi Người đề xuất

## Quỹ tăng trưởng Klaytn <a id="klaytn-growth-fund"></a>

### Nguồn gốc

Nền kinh tế token của Klaytn vận hành và phát triển thông qua hoạt động của các thực thể kinh tế Klaytn. Sự tăng trưởng của nền kinh tế sẽ giúp cải thiện tính bền vững của nền tảng và giúp hệ sinh thái tồn tại. Vì thế, Klaytn có một hệ thống khuyến khích nhằm thúc đẩy hoạt động của các chủ thể kinh tế nhằm giúp duy trì và củng cố cho sự tăng trưởng kinh tế của Klaytn.


### Khái niệm chung
Quỹ tăng trưởng của Klaytn (KGF) nhắm tới việc giúp nền kinh tế Klaytn tăng trưởng bằng cách cung cấp các khoản tài trợ và đầu tư vào các tổ chức và cá nhân có đóng góp cho nền kinh tế Klaytin. Công nghệ của Klaytin mang đến những cơ hội to lớn để mọi người có thể lưu trữ, chuyển giao và trao đổi dữ liệu và giá trị trên toàn cầu một cách dễ dàng với chi phí tối thiểu. Và vì đây là một mạng lưới mở, ai cũng có thể tham gia để xây dựng một ứng dụng mà không cần xin phép. Tuy nhiên, việc áp dụng chuỗi khối rộng rãi hơn đã bị cản trở do công nghệ này vẫn còn đang ở giai đoạn đầu, và hầu hết các giá trị và dữ liệu vẫn đang được quản lý theo cách truyền thống dưới dạng hợp đồng pháp lý, lưu trữ cục bộ, v.v. Và KGF được dùng với mục đích giải quyết các vấn đề này. KGF sẽ hỗ trợ các chương trình khác nhau nhằm thúc đẩy việc áp dụng Klaytn trên khắp các ngành, ví dụ như tặng thưởng cho những người đưa ra bằng chứng đóng góp trên chuỗi và đầu tư vào các dApp giai đoạn đầu. Quỹ này sẽ liên tục được tài trợ thông qua một tỷ lệ phần thưởng khối nhất định (tham khảo [Cơ cấu tài trợ](token-economy.md#funding-structure)).


## Khoản dự trữ cải tiến của Klaytn <a id="klaytn-improvement-reserve"></a>

Khi công nghệ tiếp tục được cải tiến và nhu cầu của người dùng thay đổi theo thời gian, nền tảng của chúng tôi phải có khả năng thích ứng nhanh chóng với mọi tình huống mới phát sinh. Để đáp ứng những thay đổi như vậy, chúng tôi không chỉ phải cải thiện dịch vụ mà còn phải thực hiện nhiều hoạt động khác nhau để duy trì hệ sinh thái của Klaytn. For instance, research and development for better technology, or projects that contribute to the overall growth of the ecosystem may be part of these activities. These activities are necessary for Klaytn to progress continuously. Klaytn Improvement Reserve (KIR) will be deployed for activities that improve the Klaytn ecosystem such as:



| Category                        | Details                                                                                                                            |
|:------------------------------- |:---------------------------------------------------------------------------------------------------------------------------------- |
| **Development**                 | <ul><li>IDE & Editors</li><li>Oracle</li><li>Contract Library</li>                             |
| **Infrastructure**              | <ul><li>Local Testnet</li><li>Decentralized File System</li><li>Multi-VM</li>                           |
| **Test, Debugging, Deployment** | <ul><li>Testing & Deployment Tools</li><li>Security & Audit Tools</li>                                                     |
| **Monitoring & Analytics**      | <ul><li>Monitoring</li><li>Analytics</li>                                                     |
| **Education & Activity**        | <ul><li>Documentation</li><li>Educational Materials</li><li>Community Building</li><li>Open Source Activity(Including Bug Bounty)</li> |
| **Research**                    | <ul><li>Security, Scalability, Cryptography, etc.</li></ul>                                                                                                         |


KIR proposals can be created by any participant in Klaytn’s ecosystem. KIR spending proposals will be processed per KIR Governance Process. Refer to the [Klaytn Improvement Reserve Review Process](governance.md#klaytn-improvement-reserve-review-process) section for more information on the procedure. Once a spending proposal has passed, KLAY will be distributed periodically, from a predetermined total amount, based on the project’s level of progress. This process may change based on the project size but is planned to be processed monthly.

For more information, please visit [Klaytn Improvement Reserve Forum](https://kir.klaytn.foundation/).
