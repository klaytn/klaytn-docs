# Klaytnscope

Klaytnscope là trình khám phá khối cho mạng lưới Klaytn. Klaytnscope cung cấp cho bạn thông tin chi tiết về mạng lưới Klaytn bằng cách theo dõi tình trạng mạng và cung cấp các số liệu thống kê khác nhau về mạng lưới Klaytn. Bạn cũng có thể khám phá dữ liệu khối và giao dịch cũng như danh sách các hợp đồng thông minh trên mạng lưới Klaytn.

- For the Baobab network, visit [https://baobab.klaytnscope.com](https://baobab.klaytnscope.com)
- For the Mainnet, visit [https://klaytnscope.com/](https://klaytnscope.com/)

![](/img/build/tools/scope_01_main.png)

## Các tính năng chính <a id="major-features"></a>

Xin lưu ý rằng một số tính năng đang được phát triển.

- Tổng quan về mạng
- Tìm kiếm khối
- Tìm kiếm giao dịch
- Tìm kiếm tài khoản
- Tìm kiếm bản ghi sự kiện
- Thông tin người đề xuất khối

Trong các phần tiếp theo, chúng ta sẽ khám phá các chức năng chính và ảnh chụp màn hình của Klaytnscope. Các chức năng được nhóm theo bốn danh mục - bảng điều khiển, chế độ xem danh sách, chế độ xem chi tiết và tìm kiếm.

## Bảng điều khiển <a id="dashboard"></a>

Thông tin mạng được biểu thị trong bảng điều khiển. Thông tin bao gồm thời gian tạo khối trung bình, số lượng giao dịch trung bình trong một khối, số nút đồng thuận và các xu hướng mới nhất trong giao dịch.

![](/img/build/tools/scope_02_main_indicator.png)

- Chiều cao khối: Chiều cao khối mới nhất. Thông tin này cho biết số lượng khối đã được tạo từ thời điểm khởi nguyên.
- Hiệu suất mạng: Cho biết hiệu suất mạng của Klaytn với bốn chỉ số.
  - Nút đồng thuận: Hình trên cho thấy 15 nút được tham gia vào quá trình đồng thuận.
  - Thời gian tạo khối trung bình \(1 giờ\): Hiển thị thời gian tạo khối trung bình trong một giờ qua.
  - Thời gian tạo khối trung bình \(24 giờ\): Hiển thị thời gian tạo khối trung bình trong 24 giờ qua.
  - TX trung bình trên mỗi khối \(24 giờ\): Số lượng giao dịch trung bình được đưa vào một khối trong 24 giờ qua.
- Lịch sử giao dịch \(14 ngày\): Biểu đồ hiển thị số lượng giao dịch hàng ngày trong 14 ngày qua. Bạn có thể xem xu hướng về khối lượng giao dịch trong hai tuần qua.

### Khối & giao dịch gần đây <a id="recent-blocks-transactions"></a>

Các danh sách này lần lượt hiển thị các khối và giao dịch được tạo gần đây. Bạn có thể nhận thông tin mới nhất bằng cách nhấp vào nút refresh ở góc trên bên phải trong bảng. Ở cuối danh sách, nhấp vào nút “view all” sẽ đưa bạn đến [chế độ xem danh sách](#list-view).

![](/img/build/tools/scope_03_main_list.png)

### Trạng thái mạng & bộ chọn mạng <a id="network-status-network-selector"></a>

![](/img/build/tools/network_status.gif)

Ở góc trên bên phải của trang web có chỉ báo trạng thái mạng và trình chọn mạng thả xuống.

- Chỉ báo trạng thái mạng
  - Mạng hoạt động ổn định: Klaytnscope ổn định và hoạt động đầy đủ. Trạng thái mạng là bình thường.
  - Độ trễ dữ liệu: Klaytnscope đang bảo trì hệ thống. Dữ liệu ở trạng thái trễ.
  - Độ chính xác của dữ liệu: Klaytnscope đang đồng bộ hóa dữ liệu, vui lòng đợi.
- Danh sách trình chọn mạng thả xuống
  - Bạn có thể chọn mạng chính Klaytn và mạng thử nghiệm Baobab từ menu này.

## Xem danh sách <a id="list-view"></a>

Nếu muốn xem kỹ hơn trạng thái của mạng lưới Klaytn, bạn có thể kiểm tra danh sách các khối và giao dịch được tạo gần đây. Để truy cập trang danh sách, hãy nhấp vào nút trên thanh điều hướng nằm ở bên trái màn hình.

### Khối <a id="blocks"></a>

![](/img/build/tools/scope_04_block_list.png)

Danh sách các khối được tạo gần đây. Để cập nhật thông tin, vui lòng nhấp vào refresh.

- Khối: Số duy nhất của khối. Bắt đầu từ số không \(khối khởi nguyên\), nó được đưa ra tuần tự mỗi khi một khối được tạo.
- Thời gian: Khoảng thời gian kể từ khi khối được tạo. Bạn có thể kiểm tra ngày giờ chính xác bằng cách di chuột vào đây.
- Tổng số TX: Tổng số giao dịch có trong khối.
- Người đề xuất khối: Nút đồng thuận được chọn ngẫu nhiên nhưng có tính quyết định đã đề xuất khối. Bằng cách nhấp vào địa chỉ, bạn có thể dễ dàng đi đến trang thông tin chi tiết.
- Phần thưởng: Tổng hợp KLAY \(6,4 KLAY\) mới được tạo và phí giao dịch được sử dụng trong khối. Danh sách này chỉ hiển thị tổng Phần thưởng của Hội đồng quản trị của Klaytn, Bằng chứng đóng góp và Khoản dự trữ cải tiến của Klaytn. Di chuột vào mục phần thưởng khối trên trang thông tin chi tiết khối để xem thông tin chi tiết. Bạn có thể tìm thêm thông tin chi tiết về hệ thống phân phối phần thưởng khối trong \[Nền kinh tế token Klaytn]\[].
- Kích thước: Kích thước của các khối được đo bằng Byte. Giao dịch được đưa vào càng nhiều, kích thước khối càng lớn.

### Giao dịch <a id="transactions"></a>

![](/img/build/tools/scope_05_tx_list.png)

Danh sách các giao dịch được thực hiện gần đây. Để cập nhật thông tin, vui lòng nhấp vào refresh.

- Hàm băm TX: Mã định danh duy nhất của giao dịch. Để biết thêm thông tin, hãy nhấp vào hàm băm để chuyển đến trang thông tin chi tiết. Nếu giao dịch không thành công, một dấu chấm than màu đỏ sẽ xuất hiện bên cạnh nó.
- Khối \#: Số khối chứa giao dịch này. Nhấp vào số khối sẽ đưa bạn đến trang thông tin chi tiết của khối.
- Thời gian: Khoảng thời gian kể từ khi giao dịch được thực hiện. Bạn có thể kiểm tra ngày giờ chính xác bằng cách di chuột vào đây.
- Từ -&gt; Đến: Địa chỉ của người gửi và người nhận. Bằng cách nhấp vào địa chỉ, bạn có thể dễ dàng đi đến trang thông tin chi tiết. Nếu biểu tượng tệp hiển thị bên cạnh một địa chỉ, điều đó có nghĩa là địa chỉ đó là một hợp đồng.
- Loại TX: Loại giao dịch. Bạn có thể áp dụng bộ lọc để nhận các giao dịch thuộc một loại cụ thể. Để biết thêm thông tin, vui lòng xem phần \[Giao dịch]\[].
- Số lượng: Lượng giá trị được chuyển qua giao dịch.
- Phí TX: Chi phí thực tế được sử dụng để xử lý giao dịch.

## Chế độ xem chi tiết <a id="detail-view"></a>

Có thể tìm thông tin chi tiết về Khối, Giao dịch, Tài khoản và Hợp đồng trên trang này. Để chuyển đến chế độ xem chi tiết, bạn có thể tìm kiếm thực thể từ thanh tìm kiếm hoặc nhấp vào mục chế độ xem danh sách.

### Khối <a id="block"></a>

![](/img/build/tools/scope_08_block_detail.png)

#### Tổng quan <a id="overview"></a>

Thông tin tổng quan về khối.

- Thời gian: Thời gian đã trôi qua kể từ khi tạo khối. Ngày giờ chính xác cũng được hiển thị bên cạnh.
- Hàm băm: Mã định danh duy nhất của khối. Bằng cách nhấn nút Copy, bạn có thể dễ dàng sao chép hàm băm.
- Hàm băm cha: Mã định danh duy nhất của khối trước đó. Nhấp vào hàm băm sẽ đưa bạn đến chế độ xem chi tiết của hàm băm cha.
- Tổng số TX: Tổng số giao dịch có trong khối.
- Phần thưởng khối: Tổng hợp KLAY \(6,4 KLAY\) mới được tạo và phí giao dịch thu được trong khối. Nếu di chuột, bạn sẽ tìm thấy thông tin chi tiết về Phần thưởng của Hội đồng quản trị của Klaytn, Bằng chứng đóng góp và Khoản dự trữ cải tiến của Klaytn. Bạn có thể tìm thêm thông tin chi tiết về hệ thống phân phối phần thưởng khối trong \[Nền kinh tế token Klaytn]\[].
- Kích thước khối: Kích thước của khối được đo bằng Byte. Giao dịch được đưa vào càng nhiều, kích thước khối càng lớn.

#### Uỷ ban <a id="committee"></a>

Danh sách các nút đồng thuận đã đề xuất và xác thực khối.

- Người đề xuất khối: Nút đồng thuận được chọn ngẫu nhiên nhưng có tính quyết định đã đề xuất khối. Bằng cách nhấp vào địa chỉ, bạn có thể dễ dàng chuyển đến chế độ xem chi tiết của nút.
- Nút xác thực: Các nút đồng thuận đã xác thực khối. Bằng cách nhấp vào địa chỉ, bạn có thể dễ dàng chuyển đến chế độ xem chi tiết của nút.

#### Giao dịch <a id="transactions"></a>

Danh sách các giao dịch có trong khối.

### Giao dịch <a id="transaction"></a>

![](/img/build/tools/scope_09_tx_detail.png)

#### Tổng quan <a id="overview"></a>

Thông tin tổng quan về giao dịch.

- Chỉ báo trạng thái: Ở góc trên bên phải. Chỉ báo báo giao dịch có thành công hay không.
- Loại TX: Loại giao dịch. Để biết thêm thông tin, vui lòng xem phần \[Giao dịch]\[].
- Khối \#: Số khối chứa giao dịch này. Nhấp vào số khối sẽ đưa bạn đến chế độ xem chi tiết khối.
- Từ -&gt; Đến: Địa chỉ của người gửi và người nhận. Bằng cách nhấp vào địa chỉ, bạn có thể chuyển đến chế độ xem chi tiết tài khoản. Nếu biểu tượng tệp hiển thị bên cạnh địa chỉ, điều đó có nghĩa là địa chỉ đó là hợp đồng.
- Người trả phí: Được hiển thị khi loại TX là Phí được ủy thác hoặc Phí được ủy thác theo tỷ lệ. Khi nhấp vào địa chỉ của người trả phí, bạn có thể chuyển đến chế độ xem chi tiết tài khoản.
- Thời gian: Thời gian đã trôi qua kể từ khi giao dịch được thực hiện.
- Số dùng một lần: Số giao dịch được gửi từ địa chỉ của người gửi. Bắt đầu từ 0, nó sẽ tăng lên liên tục mỗi khi một giao dịch được gửi đi.
- Số lượng: Lượng giá trị được chuyển trong giao dịch này.
- Giá gas: Chi phí cho mỗi loại gas được đo bằng KLAY. Trong mạng lưới Klaytn, Giá gas là cố định.
- Gas đã sử dụng: Lượng gas chính xác đã được sử dụng để thực hiện giao dịch.
- Giới hạn gas: Lượng gas tối đa mà người gửi sẵn sàng trả cho giao dịch này.
- Phí TX: Chi phí thực tế được sử dụng để xử lý giao dịch. Được tính bằng cách nhân Giá gas với Lượng gas sử dụng.
- Phí TX theo người gửi: Hiển thị khi loại TX là Phí được ủy thác theo tỷ lệ. Phần phí TX do người gửi thanh toán.
- Phí TX theo người trả phí: Hiển thị khi loại TX là Phí được ủy thác theo tỷ lệ. Phần phí TX do người trả phí thanh toán.

#### Dữ liệu đầu vào <a id="input-data"></a>

Dữ liệu bổ sung do người gửi hoặc hợp đồng cung cấp.

### Tài khoản <a id="account"></a>

![](/img/build/tools/scope_10_account_detail.png)

#### Tổng quan <a id="overview"></a>

Thông tin tổng quan về tài khoản.

- Địa chỉ \(Hex\): Địa chỉ duy nhất của tài khoản.
- Số dư: Tổng số KLAY mà tài khoản này có.
- Tổng số TX: Tổng số giao dịch mà tài khoản này đã gửi hoặc nhận.
- HRA: Cho biết loại tài khoản này có phải là HRA hay không. \(TBD\)

#### Giao dịch <a id="transactions"></a>

Danh sách các giao dịch liên quan đến tài khoản này. Màu của mũi tên cho biết tài khoản là người gửi hay người nhận.

### Hợp đồng <a id="contract"></a>

![](/img/build/tools/scope_11_contract_detail.png)

#### Tổng quan <a id="overview"></a>

Thông tin tổng quan về hợp đồng.

- Tài khoản \(Hex\): Địa chỉ duy nhất của hợp đồng.
- Số dư: Tổng số KLAY mà hợp đồng này có.
- Người tạo hợp đồng: Tài khoản đã triển khai hợp đồng này. Bằng cách nhấp vào địa chỉ, bạn có thể chuyển đến chế độ xem chi tiết tài khoản.
- Tổng số TX: Tổng số giao dịch mà hợp đồng này đã nhận.
- Hợp đồng đã tạo TX: Giao dịch đã triển khai hợp đồng này. Nhấp vào hàm băm sẽ đưa bạn đến chế độ xem chi tiết giao dịch.
- HRA: Cho biết loại tài khoản hợp đồng có phải là HRA hay không. \(TBD\)

#### Giao dịch <a id="transactions"></a>

Danh sách các giao dịch liên quan đến hợp đồng này.

## Tìm kiếm <a id="search"></a>

Thông qua Klaytnscope, bạn có thể tìm kiếm thông tin về tài khoản, hợp đồng, giao dịch và khối. Thanh tìm kiếm được đặt trên mọi trang, giúp bạn dễ dàng truy cập. Việc nhập từ khóa hợp lệ sẽ đưa bạn đến chế độ xem chi tiết của thực thể.

![](/img/build/tools/scope_06_search.png)

### Từ khóa tìm kiếm <a id="search-keyword"></a>

Trong phiên bản mạng chính, các từ khóa có thể tìm kiếm như sau:

- Khối \#
- Hàm băm TX
- Địa chỉ \(Tài khoản, Hợp đồng\)
- Địa chỉ mà con người đọc được \(.klaytn\) \(TBD\)

### Định dạng từ khóa <a id="keyword-format"></a>

Các đặc điểm duy nhất giúp phân biệt từng từ khóa như sau:

#### Khối <a id="block"></a>

- Chỉ các số thập phân \[0~9\]

#### Hàm băm TX <a id="tx-hash"></a>

- dài 66 ký tự
- Bắt đầu bằng tiền tố `0x`
- Chỉ số thập lục phân \[0~9, a~f\]

#### Địa chỉ <a id="address"></a>

- dài 42 ký tự
- Bắt đầu bằng tiền tố `0x`
- Chỉ số thập lục phân \[0~9, a~f\]

#### Địa chỉ mà con người đọc được \(TBD\) <a id="human-readable-address-tbd"></a>

- dài 12~20 ký tự
- Kết thúc bằng `.klaytn`

### Lỗi tìm kiếm <a id="search-errors"></a>

![](/img/build/tools/scope_07_noresult.png)

Nếu bạn tìm kiếm một từ khóa không phù hợp với định dạng được chỉ định hoặc thông tin chưa được tạo thì sẽ không xuất hiện trang kết quả nào.

#### Sai định dạng \(Hàm băm TX / Địa chỉ\) <a id="wrong-format-tx-hash-address"></a>

- Sai số ký tự
- Không bắt đầu bằng tiền tố `0x`
- Chứa các ký tự đặc biệt hoặc ký tự không phải hệ thập lục phân \[g~z\]

#### Không tồn tại <a id="doesn-t-exist"></a>

- Các khối chưa được tạo \(nếu số khối đã nhập cao hơn số khối được tạo gần đây\)
- Hàm băm TX không tồn tại

[Transactions]: ../../../learn/transactions/transactions.md
[Klaytn Token Economy]: ../../../learn/token-economy.md
