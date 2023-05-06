# Nền kinh tế token <a id="token-economy"></a>

## Tổng quan <a id="overview"></a>

Nền kinh tế token của Klaytn được thiết kế để tạo ra các cấu trúc tài trợ bền vững để trao quyền cho hệ sinh thái của mình, các sáng kiến tăng trường và các khoản đầu tư chiến lược. Nhiều dự án chuỗi khối công khai có hệ thống tiền tệ chỉ khuyến khích riêng những người vận hành nút của họ \(thợ đào hoặc người sản xuất khối\), chỉ tập trung vào khía cạnh kỹ thuật hoặc bảo trì mạng lưới. Tuy nhiên, những thiết kế như vậy lại bỏ qua tầm quan trọng của việc khuyến khích những nhóm người tham gia khác cũng đóng góp cho sự tăng trưởng của nền kinh tế token của mạng lưới, hoặc đầu tư vào các triển vọng tăng trưởng dài hạn. Ngược lại, nền kinh tế token của Klaytn lại được thiết kế để bù đắp cho các hình thức đóng góp đa dạng đến từ nhiều người tham gia, và ngoài việc duy trì các nút chuỗi khối của mình, chúng tôi còn có một cấu trúc tài trợ được tích hợp sẵn để tận dụng các nguồn lực bền vững, nhằm thúc đẩy các sáng kiến về tăng trưởng trong tương lai và các dự án đầu tư được lấy nguồn một cách chiến lược.

## Cấu trúc tài trợ <a id="funding-structure"></a>

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

Khi công nghệ tiếp tục được cải tiến và nhu cầu của người dùng thay đổi theo thời gian, nền tảng của chúng tôi phải có khả năng thích ứng nhanh chóng với mọi tình huống mới phát sinh. Để đáp ứng những thay đổi như vậy, chúng tôi không chỉ phải cải thiện dịch vụ mà còn phải thực hiện nhiều hoạt động khác nhau để duy trì hệ sinh thái của Klaytn. Ví dụ: việc nghiên cứu và phát triển để có được công nghệ tốt hơn, hoặc các dự án đóng góp vào sự phát triển chung của hệ sinh thái có thể là một phần của các hoạt động này. Các hoạt động này là rất cần thiết để Klaytn có thể phát triển không ngừng nghỉ. Khoản dự trữ cải tiến của Klaytn (KIR) sẽ được triển khai cho các hoạt động cải thiện hệ sinh thái của Klaytn, ví dụ như:



| Phân loại                          | Chi tiết                                                                                                                           |
|:---------------------------------- |:---------------------------------------------------------------------------------------------------------------------------------- |
| **Phát triển**                     | <ul><li>IDE & Các trình biên tập</li><li>Oracle</li><li>Thư viện hợp đồng</li>                             |
| **Cơ sở hạ tầng**                  | <ul><li>Mạng thử nghiệm cục bộ</li><li>Hệ thống tập tin phi tập trung</li><li>Đa VM</li>                           |
| **Thử nghiệm, Gỡ lỗi, Triển khai** | <ul><li>Các công cụ thử nghiệm & triển khai</li><li>Các công cụ kiểm toán & bảo mật</li>                                                     |
| **Giám sát & Phân tích**           | <ul><li>Giám sát</li><li>Phân tích</li>                                                     |
| **Giáo dục & Hoạt động**           | <ul><li>Tài liệu</li><li>Tài liệu giáo dục</li><li>Xây dựng cộng đồng</li><li>Hoạt động nguồn mở (bao gồm hoạt động săn lỗi nhận thưởng)</li> |
| **Nghiên cứu**                     | <ul><li>Bảo mật, khả năng mở rộng, mật mã, v.v.</li></ul>                                                                                                         |


Các đề xuất KIR có thể được tạo ra bởi bất kỳ người tham gia nào trong hệ sinh thái Klaytn. Các đề xuất chi tiêu KIR sẽ được xử lý theo Quy trình quản trị KIR. Hãy tham khảo phần [Quy trình đánh giá Khoản dự trữ cải tiến Klaytn](governance.md#klaytn-improvement-reserve-review-process) để biết thêm thông tin về thử tục này. Khi một đề xuất chi tiêu đã được thông qua, đồng KLAY sẽ được phân phối định kỳ, từ tổng số tiền được xác định trước, dựa trên mức tiến độ của dự án. Quy trình này có thể thay đổi dựa theo kích cỡ của dự án, tuy nhiên theo kế hoạch, quy trình này sẽ diễn ra hàng tháng.

Để biết thêm thông tin, hãy truy cập [Diễn đàn Khoản dự trữ cải tiến Klaytn](https://kir.klaytn.foundation/).
