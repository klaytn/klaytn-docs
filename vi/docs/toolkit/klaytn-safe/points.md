# Điểm lưu ý <a id="Points to Note"></a>

Sau đây là những điều bạn cần lưu ý khi sử dụng Klaytn Safe:

# Phí giao dịch <a id="Transaction Fees"></a>

Các giao dịch Klaytn Safe, dù là chuyển giao tài sản hay tương tác hợp đồng, đều phát sinh một khoản phí do người ký thực hiện giao dịch thanh toán (thường là người ký cuối cùng đạt đến ngưỡng chữ ký bắt buộc).

# Số dùng một lần của Safe <a id="Safe Nonce"></a>

![](../img/klaytn-safe/21_safeNounce.png)

Vì lý do bảo mật, các giao dịch được thực hiện với Safe cần được thực hiện theo thứ tự. Để đạt được điều này, một số được gọi là **số dùng một lần** được chỉ định cho một giao dịch để đảm bảo rằng mỗi giao dịch chỉ có thể được thực hiện một lần.

Tại bất kỳ thời điểm nào, chỉ các giao dịch có _giao dịch được thực hiện lần cuối +1_ mới có thể được thực hiện. Các giao dịch có số dùng một lần cao hơn được xếp vào hàng đợi để thực hiện. Vì vậy, bất cứ khi nào một giao dịch được hoàn thành, giao dịch tiếp theo trong hàng đợi sẽ sẵn sàng để thực hiện, miễn là nó đã thu thập đủ chữ ký.


# Địa chỉ dành riêng cho chuỗi <a id="Chain-specific addresses"></a>

![](../img/klaytn-safe/22_chainSpec.png)


Bạn có thể chọn có thêm tên chuỗi rút gọn vào trước các Safe hay không.

* Thêm trước địa chỉ với tiền tố chuỗi: Bạn có thể thêm tên chuỗi “baobab” vào trước địa chỉ bằng cách nhấp vào hộp kiểm đầu tiên hoặc dùng cách khác.

![](../img/klaytn-safe/23_acctPrepend.png)

* Sao chép địa chỉ với tiền tố chuỗi:

![](../img/klaytn-safe/24_chainAddrError.png)

Khi sao chép địa chỉ Safe từ bảng điều khiển để dán vào ví như trên, bạn có thể chọn thêm tên chuỗi hoặc bằng cách nhấp vào hộp kiểm. Bạn cần bỏ chọn để tránh lỗi trên.

![](../img/klaytn-safe/25_copyAcctPrepend.png)