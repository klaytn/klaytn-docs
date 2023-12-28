# Nền kinh tế token

## Tổng quan <a id="overview"></a>

Nền kinh tế token của Klaytn được thiết kế để tạo ra các cấu trúc cấp vốn bền vững để trao quyền cho hệ sinh thái của mình, các sáng kiến tăng trường và các khoản đầu tư chiến lược. Nhiều dự án chuỗi khối công khai có hệ thống tiền tệ chỉ khuyến khích riêng những người vận hành nút của họ \(thợ đào hoặc người tạo khối\), chỉ tập trung vào khía cạnh kỹ thuật hoặc bảo trì mạng lưới. Tuy nhiên, những thiết kế như vậy lại bỏ qua tầm quan trọng của việc khuyến khích những nhóm người tham gia khác cũng đóng góp cho sự tăng trưởng của nền kinh tế token của mạng lưới, hoặc đầu tư vào các triển vọng tăng trưởng dài hạn. Ngược lại, nền kinh tế token của Klaytn lại được thiết kế để bù đắp cho các hình thức đóng góp đa dạng đến từ nhiều người tham gia và ngoài việc duy trì các nút chuỗi khối của mình, chúng tôi còn có một cấu trúc tài trợ được tích hợp sẵn để tận dụng các nguồn lực bền vững, nhằm thúc đẩy các sáng kiến về tăng trưởng trong tương lai và các dự án đầu tư được lấy nguồn một cách chiến lược.

## Cấu trúc cấp vốn <a id="funding-structure"></a>

Cấu trúc cấp vốn của Klaytn chạy liên tục với việc tạo khối của mạng lưới Klaytn. Với mỗi khối mới, KLAY mới được phát hành và tổng phí giao dịch được dùng trong khối \(được gọi chung là “phần thưởng khối”\) được tổng hợp và phân phối cho ba toài khoản đích sau theo tỷ lệ được xác định trước:

* Klaytn Governance Council (GC) Reward:
    * GC Block Proposer Reward: 10%
    * GC Staking Award: 40%
* Klaytn Community Fund \(KCF\): 30%
* Klaytn Foundation Fund \(KFF\): 20%

6,4 KLAY sẽ được tạo cho mỗi khối mới. Điều này ngụ ý rằng khoảng 200 triệu KLAY sẽ được tạo mỗi năm, tương đương với 2% lạm phát hàng năm so với 10 tỷ KLAY được phát hành vào thời điểm khởi nguyên \(tỷ lệ lạm phát hàng năm có thể thay đổi thông qua Quy trình quản trị của Klaytn\). Phí giao dịch được tính theo mỗi OPCODE và được tính theo biểu phí giao dịch. Để biết thông tin chi tiết về biểu phí giao dịch, vui lòng tham khảo phần [Phí giao dịch](./transaction-fees.md).

## Phần thưởng cho Hội đồng quản trị của Klaytn <a id="klaytn-governance-council-reward"></a>

Hội đồng quản trị của Klaytn là nhóm tập thể các Người vận hành Core Cell \(CCO\). Các thành viên hội đồng có trách nhiệm duy trì Core Cell \(CC\), việc này giúp Hội đồng trở thành cơ quan thiết yếu trong hệ sinh thái Klaytn chịu trách nhiệm cung cấp cơ sở hạ tầng cơ sở. Để trở thành thành viên Hội đồng, ứng viên phải trải qua quá trình đánh giá trình độ theo Quy trình quản trị của Klaytn và phải nắm giữ ít nhất 5 triệu KLAY. Phần thưởng của Hội đồng quản trị của Klaytn là một cấu trúc dùng để khuyến khích các thành viên Hội đồng tiếp tục cung cấp nền tảng ổn định cho hệ sinh thái Klaytn.

### Cơ chế phần thưởng cho Hội đồng quản trị của Klaytn <a id="klaytn-governance-council-reward-mechanism"></a>

Đối với mỗi khối, một Ủy ban sẽ được thành lập, bao gồm các thành viên Hội đồng được lựa chọn ngẫu nhiên. Mỗi Ủy ban có một thành viên được giao vai trò là Người đề xuất; tất cả các thành viên khác của Ủy ban sẽ đảm nhận vai trò là Người xác thực. Khi một khối được tạo thành công và được thêm vào chuỗi khối Klaytn, Người đề xuất của khối đó sẽ được thưởng 100% phần thưởng khối. Xác suất thành viên hội đồng được chọn là Người đề xuất tỷ lệ thuận với số lượng KLAY mà thành viên đó nắm giữ; nghĩa là một thành viên nắm giữ càng nhiều KLAY thì càng có nhiều khả năng người đó sẽ được chọn làm Người đề xuất và có khả năng nhận được phần thưởng khối.

Miễn đáp ứng được yêu cầu về mức nắm giữ tối thiểu là 5 triệu KLAY, các thành viên Hội đồng quản trị KLAY có thể tự do nắm giữ hoặc hủy nắm giữ KLAY của mình. Thông tin nắm giữ sẽ được cập nhật sau mỗi 86.400 khối và KLAY mới được nắm giữ sẽ có hiệu lực sau hai chu kỳ cập nhật kể từ thời điểm hoàn tất quá trình nắm giữ. Việc rút phần KLAY đã nắm giữ cần đến một tuần chờ đợi để ngăn chặn việc các thành viên ác ý rút lui ngay lập tức.

Để ngăn chặn tình trạng các nhóm nhỏ gồm các thành viên Hội đồng có mức đầu tư cao độc quyền nhận phần thưởng cho Hội đồng quản trị của Klaytn, hệ số Gini có thể được sử dụng để điều chỉnh số tiền KLAY thực tế được nắm giữ. Công thức áp dụng như sau, trong đó G là viết tắt của hệ số Gini trong việc phân phối phần KLAY được nắm giữ của Hội đồng quản trị:

* _Số lượng nắm giữ đã điều chỉnh = \(Số lượng nắm giữ của thành viên hội đồng quản trị\)^\(1/1+G\)_


### Hình phạt cho các Thành viên hội đồng có hành vi sai trái <a id="penalty-for-misbehaving-council-members"></a>

Thành viên hội đồng có thể bị phạt nếu thực hiện các hành vi sai trái theo định nghĩa dưới đây. Trong tương lai, nhiều quy tắc phạt hơn có thể sẽ được thiết lập và hoàn thiện thông qua Quy trình quản trị của Klaytn.

Gây ra lỗi về an toàn:

* Một thành viên hội đồng được chọn làm Người đề xuất không được tạo ra nhiều hơn một khối với cùng một số khối
* Một thành viên hội đồng được chọn làm Người đề xuất không được bỏ qua các giao dịch nhất định một cách có chủ ý

Gây ra lỗi về xác định thực thể sống:

* Một thành viên hội đồng được chọn làm Người đề xuất phải tạo ra một khối hợp lệ
* Một thành viên hội đồng được chọn làm Người xác thực phải xác thực nút được đề xuất bởi Người đề xuất

## Klaytn Community Fund <a id="klaytn-community-fund"></a>
The Klaytn Community Fund (KCF) was established to support Klaytn's mission of enabling greater transparency and verifiability. It's important to keep in mind that the former Klaytn Growth Fund (KGF) and Klaytn Improvement Reserve (KIR) have merged to become the new Klaytn Community Fund (KCF).

The Klaytn Community Fund will be used to fund activities that improves the Klaytn ecosystem, such as:

1. **Rewarding Proof of Contribution**: The KCF will provide follow-up support, such as gas fee support to projects that have made significant on-chain contributions to the Klaytn ecosystem among services that have already been developed.
2. **Building our Developer Community**: The KCF will support various initiatives including hackathons, development education programs, collaborative research with the industry, and collaboration with various DAOs to foster and grow the Klaytn developer community.
3. **Fostering Ecosystem Services and Infrastructure**: The KCF will support essential ecosystem infrastructure, alongside the development of services with clear utility and provide marketing support.
4. **Klaytn Eco Fund Indirect Investment**: The KCF will make indirect mid-to long-term investments by entrusting specialized crypto VCs, and most of the profits generated upon subsequent investment recovery will be returned to the Klaytn ecosystem.

The administration of the Klaytn Community Fund follows a process in which the GC reviews and approves the use of funds in public forums on [Klaytn Square](https://square.klaytn.foundation/Home). The Foundation will submit a budget proposal for each category to the GC for approval. Within the approved budget, each specific use will be reviewed and approved again by the GC. In the meantime, the KCF is currently being run as a [pilot program](https://klaytn.foundation/kcf-grant-pilot/) and interested parties can visit the [Klaytn Governance Forum](https://govforum.klaytn.foundation/t/operational-procedures-of-the-kcf-grant-program-pilot/288) for more details about the program.

## Klaytn Foundation Fund <a id="klaytn-foundation-fund"></a>

Klaytn Foundation Fund (KFF) is an operational fund that will focus on this two main categories:

1. **Ecosystem Support**: This includes providing minor financial assistance, securing new GC members, liquidity provisions, and developing / funding services led by the Foundation.
2. **Foundation Operations**: This includes operating expenses such as development, accounting, infrastructure operations, marketing, and labor, as well as financial management and investment attraction costs.

Similar to KCF, KFF will be executed autonomously and transparently after obtaining approval from the GC via on-chain voting.

For more information, kindly read this [article](https://medium.com/klaytn/klaytn-tokenomics-optimization-governance-proposal-securing-a-sustainable-verifiable-token-1efd2a49b04e).
