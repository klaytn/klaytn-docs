# Trình tạo giao dịch

Đây là một ứng dụng tùy chỉnh trong Klaytn Safe đảm nhận việc thực hiện các giao dịch theo lô. Điều này có nghĩa là bạn có thể gộp nhiều giao dịch lại với nhau, thay vì phải xác nhận lần lượt các giao dịch này. Bạn chỉ cần xác nhận và thực hiện một lần.

Với trình tạo giao dịch, bạn có thể soạn các giao dịch từ chuyển token đến các tương tác hợp đồng phức tạp và nhóm chúng thành một giao dịch duy nhất.

**Hình minh họa**

Giả sử bạn muốn airdrop token đến một danh sách dài các địa chỉ, chẳng hạn như 100 token DRIP đến 10 địa chỉ. Thay vì phải tạo 10 giao dịch mà chủ sở hữu Safe của bạn phải xác nhận và thực hiện lần lượt từng giao dịch, trình tạo giao dịch đặt tất cả các giao dịch này vào một giao dịch duy nhất.

Trong hướng dẫn này, chúng tôi đã tạo token DRIP đến địa chỉ Safe để phục vụ cho mục đích minh họa.

Hãy bắt đầu với ví dụ này bằng Trình tạo giao dịch!



**Bước 1:** Mở Ứng dụng Safe.

![](/img/build/tools/15_safeApps.png)

**Bước 2:** Mở ứng dụng Safe Trình tạo giao dịch

![](/img/build/tools/16_safeTxBuilder.png)

**Bước 3:** Nhập địa chỉ hợp đồng token và ABI của bạn. Trong ví dụ này, địa chỉ hợp đồng DRIP và ABI sẽ được sử dụng. Bạn có thể sao chép và dán ABI của mình vào trường “Enter ABI”.

![](/img/build/tools/17_safeTxBatchAddrAbi.gif)

**Bước 4:** Chọn phương pháp và điền thông tin giao dịch

Từ danh sách thả xuống, bạn có thể chọn một phương pháp. Trong trường hợp này, chúng tôi chọn phương pháp **chuyển**. Để hoàn thành bước này, bạn phải điền thông tin giao dịch, chẳng hạn như **đến(địa chỉ)** và **số lượng(uint256)**.


Lưu ý: Giá trị là một số nguyên không dấu không có bất kỳ số thập phân nào. Trong ví dụ này, token DRIP có 18 số thập phân. Vì vậy, nếu muốn gửi 1 DRIP, bạn phải nhập 1000000000000000000.

![](/img/build/tools/18_safeTxBatchTxInfo.gif)

**Bước 5:** Nhấp vào **Add transaction**

**Bước 6:** Lặp lại các bước **4**, **5** và **6** cho mọi địa chỉ người nhận.

**Bước 7:** Khi bạn đã thêm tất cả các thao tác vào lô, hãy nhấp vào **Create Batch**

![](/img/build/tools/19_safeTxBatch.gif)

**Bước 8:** Xem lại và gửi giao dịch

Bạn sẽ có thể xem lại toàn bộ lô. Khi đã sẵn sàng, hãy nhấp vào **Send Batch** để gửi và thực hiện giao dịch giống như bất kỳ giao dịch Safe nào khác.

![](/img/build/tools/20_safeTxBuildExec.gif)