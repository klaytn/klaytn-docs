# Klaytn Safe

Trong một nền tảng blockchain điển hình như Klaytn, hầu hết người dùng đều quen thuộc với các hệ thống ví khóa duy nhất như Kaikas và MetaMask, còn được gọi là tài khoản sở hữu bên ngoài (EOA). Các tài khoản này sử dụng các cặp khóa truyền thống, tức là khóa công khai và khóa riêng tư, điều này không phải là giải pháp lý tưởng vì khóa riêng tư tạo ra một điểm lỗi duy nhất.

Điều này làm cho các EOA không phù hợp để sử dụng trong tổ chức vì khóa riêng tư bị xâm phạm có thể dẫn đến việc tổ chức mất tất cả tiền điện tử của mình—chẳng hạn như trường hợp trong [vụ tấn công Wintermute](https://www.certik.com/resources/blog/uGiY0j3hwOzQOMcDPGoz9-wintermute-hack-) làm mất 162,5 triệu USD.

Đây là lý do ra đời của các ví đa chữ ký như Klaytn Safe. Không giống như ví khóa duy nhất, ví đa chữ ký cần khóa riêng tư của nhiều bên để ký và thực hiện giao dịch, loại bỏ điểm lỗi duy nhất và cung cấp bảo mật cao hơn cho các trường hợp sử dụng của tổ chức.

## Ví đa chữ ký là gì? <a id="What are Multisig Wallets"></a>

Đúng như tên gọi, ví đa chữ ký là ví kỹ thuật số yêu cầu hai, ba hoặc nhiều khóa riêng tư từ các nguồn khác nhau để xác nhận và thực hiện giao dịch tiền điện tử.

Ví dụ, bạn có thể tưởng tượng ví đa chữ ký giống như một chiếc két an toàn có ba ổ khóa. Ba chìa khóa cần thiết để mở két là của ba cá nhân khác nhau, do đó cần có sự đồng thuận của họ để có thể mở.

Dưới đây là những lợi ích chính của ví đa chữ ký:

- **Lưu trữ tài sản/tiền một cách an toàn:** Các công ty và giao thức có thể lưu trữ tiền của họ một cách an toàn mà không phải lo lắng về việc rò rỉ khóa riêng tư hoặc một kẻ xấu chuyển tiền mà không được phép.

- **Cho phép ra quyết định phi tập trung:** Các công ty và giám đốc điều hành doanh nghiệp có thể đưa ra quyết định trực tuyến về những giao dịch sẽ thực hiện.

- **Xác thực hai yếu tố:** Với sự trợ giúp của ví đa chữ ký, các doanh nghiệp và cá nhân có thể đảm bảo rằng chỉ những người có quyền truy cập vào các khóa cần thiết mới có thể thực hiện giao dịch.

Tiếp theo, chúng ta sẽ đi sâu vào Klaytn Safe, ví đa chữ ký dành cho Klatyn và cách sử dụng ví này để quản lý tiền và giao dịch của bạn.

## Klaytn Safe là gì? <a id="What is Klaytn Safe"></a>

Klaytn Safe là ví đa chữ ký dành cho hệ sinh thái Klaytn. Đây là một nhánh của ví đa chữ ký được nhiều người biết đến [Gnosis Safe](https://gnosis-safe.io/).

## Lợi ích <a id="Benefits of Klaytn Safe"></a>

- **Lưu trữ và chuyển KLAY và KCT (KIP7, KIP17)**: Người dùng có thể gửi và chuyển tiền điện tử (KLAY) và token (fungible hoặc non-fungible).

- **Linh hoạt và bảo mật:** Ngưỡng xác nhận mang đến cho người dùng khả năng kiểm soát và linh hoạt hơn đối với các giao dịch sẽ được thực hiện, đồng thời loại bỏ điểm lỗi duy nhất.

- **Ứng dụng Safe:** Chức năng của Klaytn Safe được mở rộng bằng cách bổ sung các ứng dụng tùy chỉnh cho phép giao dịch hàng loạt và tương tác với các dApp khác. Một ví dụ về ứng dụng Safe này là **Trình tạo giao dịch** kết hợp và thực hiện nhiều giao dịch dưới dạng giao dịch theo lô.

- **Khôi phục tài khoản:** Trong trường hợp mất khóa, tài khoản Klaytn Safe có thể được khôi phục miễn là các khóa còn lại vẫn có thể đáp ứng ngưỡng xác nhận.
