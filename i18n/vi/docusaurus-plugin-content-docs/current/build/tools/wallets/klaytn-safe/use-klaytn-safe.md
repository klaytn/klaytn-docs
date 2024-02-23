# Sử dụng Klaytn Safe

## Tạo két an toàn

Tại đây, bạn sẽ thấy cách tạo Safe và đánh giá lợi ích của nó trên Mạng Klaytn.

**Bước 1:** Điều hướng đến [Ứng dụng Klaytn Safe](https://safe.klaytn.foundation/). Bằng cách điều hướng đến ứng dụng trên trình duyệt web của mình, bạn có thể khám phá chức năng của Klaytn Safe.

**Bước 2:** Kết nối [ví](https://docs.ethhub.io/using-ethereum/wallets/intro-to-ethereum-wallets/) của bạn. Hiện tại, Klaytn Safe có hỗ trợ ví [MetaMask](../../../tutorials/connecting-metamask). Đảm bảo bạn đã thêm mạng lưới Klaytn([Cypress](../../../tutorials/connecting-metamask#connect-to-klaytn-cypress-network-mainnet) hoặc [Baobab](../../../tutorials/connecting-metamask#connect-to-klaytn-baobab-network-testnet)) vào ví MetaMask để có thể kết nối thành công.

![](/img/build/tools/1_safeConnect.gif)

**Bước 3:** Sau khi ví của bạn được kết nối, hãy nhấp vào **“Create New Safe”** và đặt **tên** cho Safe mới của bạn. Tên này được liên kết với tài khoản Safe của bạn, đây là ví đa chữ ký cho phép giữ và lưu trữ tất cả tiền của bạn.

![](/img/build/tools/2_safeName.gif)

**Bước 4:** Thêm chủ sở hữu/người ký bằng cách nhập địa chỉ có quyền gửi và phê duyệt giao dịch. Bạn có thể thêm bao nhiêu người ký tùy thích và xóa hoặc thay thế bất kỳ người nào trong số họ bất kỳ lúc nào.

**Bước 5:** Chọn số lượng người ký xác nhận giao dịch trong tài khoản Safe của bạn cần được phê duyệt. Điều quan trọng cần lưu ý là, theo mặc định, ứng dụng của chúng tôi cho phép một người ký xác nhận. Tuy nhiên, bạn nên sử dụng ngưỡng cao hơn 1 để đảm bảo tính an toàn cho tài khoản Safe. Tốt nhất nên sử dụng ngưỡng 51% tổng số chủ sở hữu, ví dụ như 2 trên 3, 3 trên 5, v.v. như minh họa bên dưới:

![](/img/build/tools/3_safeOwners.png)

**Bước 6:** Xem xét và triển khai Safe: Sau khi hoàn toàn hài lòng với tất cả các tham số Safe, bạn có thể gửi yêu cầu tạo tài khoản Safe và tiếp tục với các hướng dẫn trên màn hình để hoàn tất quá trình tạo tài khoản.

![](/img/build/tools/4_deploySafe.gif)

Chúc mừng bạn đã tạo thành công tài khoản Klaytn Safe!

## Thêm tài sản

Trong phần này, chúng ta sẽ xem cách thêm tài sản (KLAY, FT, NFT) vào tài khoản Safe của bạn và bảo đảm an toàn cho tiền của bạn.

### Nạp KLAY

Dưới đây là các bước để thêm **‘KLAY’** vào tài khoản Safe của bạn

**Bước 1:** Sao chép địa chỉ Safe từ bảng điều khiển tài khoản của bạn.

![](/img/build/tools/f1_copyAddr.png)

**Bước 2:** Mở ví Metamask của bạn và nhấp vào **“send”** để gửi tài sản vào tài khoản Safe của bạn. Lưu ý rằng có nhiều cách khác nhau để gửi tài sản vào tài khoản Safe của bạn. Bạn có thể gửi từ [ví phần cứng](https://docs.ethhub.io/using-ethereum/wallets/hardware/), [ví web](https://docs.ethhub.io/using-ethereum/wallets/web/) hoặc thậm chí là hợp đồng thông minh. Trong trường hợp này, chúng tôi đang sử dụng ví web có tên là MetaMask.

![](/img/build/tools/f2_sendBtn.png)

**Bước 3:** Dán địa chỉ Safe của bạn vào trường tìm kiếm như bên dưới.

![](/img/build/tools/f3_searchAddr.png)

**Bước 4:** Nhập **số tiền** và nhấp vào **next**.

![](/img/build/tools/f4_amountNext.png)

**Bước 5:** Xác nhận giao dịch và kiểm tra trang tổng quan nội dung của bạn. Bạn có thể thấy số tiền được từ tài khoản metamask sang tài khoản Klaytn Safe của mình.

![](/img/build/tools/f5_sendDone.png)

### Nạp KIP-7

Đến đây, chúng ta sẽ xem cách gửi KIP7 (token có thể thay thế) vào Safe bằng cách thực hiện theo các bước bên dưới.

**Bước 1:** Sao chép địa chỉ Safe từ bảng điều khiển tài khoản của bạn.

![](/img/build/tools/f1_copyAddr.png)

**Bước 2:** Mở Ví Metamask của bạn và điều hướng đến tab **“asset”**.

![](/img/build/tools/ft2_assetTst.png)

**Bước 3:** Chọn token mà bạn muốn gửi và nhấp vào **“send”**.

Bước 4: Lặp lại bước **3**, **4**, **5** của quy trình Nạp **KLAY**.

Bước 5: Xem bảng điều khiển tài sản của bạn, bạn có thể thấy token KIP7 được chuyển vào tài khoản Safe của mình. Tương tự, bạn có thể chuyển token Fungible bất kỳ vào tài khoản Safe.

![](/img/build/tools/ft3_tstDone.png)

### Token KIP-17 (NFT)

Bây giờ chúng ta sẽ xem cách nạp KIP17 (token Non Fungible) vào safe của mình bằng cách làm theo các bước dưới đây.

Bạn có thể chuyển NFT vào tài khoản Safe theo nhiều cách khác nhau. Dưới đây là ví dụ về cách chuyển NFT sang tài khoản Safe bằng [OpenSea](https://opensea.io/about).

1. Điều hướng đến trang hồ sơ [Tài khoản OpenSea](https://testnets.opensea.io/account) của bạn
2. Điều hướng đến một NFT mà bạn muốn chuyển. Đảm bảo chọn một NFT trên Mạng Klaytn (Cypress hoặc Baobab)
3. Trên trang tiếp theo, nhấp vào nút Transfer.
4. Dán địa chỉ Safe vào hộp văn bản và chuyển đến safe
5. Trong phần Tài sản trong Klaytn Safe, bạn có thể tìm thấy NFT từ OpenSea.

![](/img/build/tools/sendNFTOpensea.gif)

Vui lòng tham khảo [hướng dẫn](https://support.opensea.io/hc/en-us/articles/5183126109715-How-can-I-transfer-an-NFT-using-OpenSea-#:~:text=Go%20to%20the%20MetaMask%20app,see%20the%20Estimated%20gas%20fee) này từ OpenSea để biết thêm thông tin chi tiết về cách chuyển NFT.

## Gửi tài sản

Trong phần này, bạn sẽ tìm hiểu cách gửi token KLAY và KIP-7 từ tài khoản Klaytn Safe.

### Gửi KLAY <a id="Send KLAY from Safe"></a>

**Bước 1:** Nhấp vào nút **“New Transaction”** trong menu bên và chọn **“Send funds”** để bắt đầu chuyển tài sản mới.

![](/img/build/tools/5_safeSendInit.gif)

**Bước 2:** Chọn tài sản cần chuyển.

- **KLAY** Lưu ý: Thêm **địa chỉ người nhận** và **số lượng** KLAY để gửi chuyển KLAY.
  Note: Add the **recipient address** and the **amount** of KLAY to send the transfer KLAY.

![](/img/build/tools/6_safeSendKlay.gif)

- **Token KIP-7** Lưu ý: Thêm địa chỉ người nhận và số lượng token để chuyển token KIP7.
  Note: Add the recipient address and the number of tokens to transfer KIP7 tokens.

![](/img/build/tools/7_safeSendKIP7.gif)

**Bước 3:** Xem lại và gửi giao dịch. Bạn sẽ cần ký giao dịch bằng ví người ký của mình và sẽ được thực hiện sau khi đạt đến ngưỡng xác nhận.

![](/img/build/tools/8_safeExecKlay.gif)

### Gửi NFT <a id="Send NFTs from Safe"></a>

Trong phần này, bạn sẽ tìm hiểu cách gửi token non-fungible từ tài khoản Klaytn Safe.

**Bước 1:** Nhấp vào nút **“New Transaction”** trong menu bên và chọn **“Send NFT”** để bắt đầu chuyển tài sản mới.

![](/img/build/tools/9_safeNFTInit.gif)

**Bước 2:** Chọn tài sản cần chuyển.

![](/img/build/tools/10_safeChooseNFT.gif)

**Bước 3:** Xem lại và gửi giao dịch. Bạn sẽ cần ký giao dịch bằng ví người ký của mình và sẽ được thực hiện sau khi đạt đến ngưỡng xác nhận.

![](/img/build/tools/11_safeNftExec.gif)

## Ghi chú thêm <a id="Points to Note"></a>

Sau đây là những điều bạn cần lưu ý khi sử dụng Klaytn Safe:

### Phí giao dịch <a id="Transaction Fees"></a>

Các giao dịch Klaytn Safe, dù là chuyển giao tài sản hay tương tác hợp đồng, đều phát sinh một khoản phí do người ký thực hiện giao dịch thanh toán (thường là người ký cuối cùng đạt đến ngưỡng chữ ký bắt buộc).

### Số dùng một lần của Safe <a id="Safe Nonce"></a>

![](/img/build/tools/21_safeNounce.png)

Vì lý do bảo mật, các giao dịch được thực hiện với Safe cần được thực hiện theo thứ tự. Để đạt được điều này, một số được gọi là **số dùng một lần** được chỉ định cho một giao dịch để đảm bảo rằng mỗi giao dịch chỉ có thể được thực hiện một lần.

Tại bất kỳ thời điểm nào, chỉ các giao dịch có _giao dịch được thực hiện lần cuối +1_ mới có thể được thực hiện. Các giao dịch có số dùng một lần cao hơn được xếp vào hàng đợi để thực hiện. Vì vậy, bất cứ khi nào một giao dịch được hoàn thành, giao dịch tiếp theo trong hàng đợi sẽ sẵn sàng để thực hiện, miễn là nó đã thu thập đủ chữ ký.

### Địa chỉ dành riêng cho chuỗi <a id="Chain-specific addresses"></a>

![](/img/build/tools/22_chainSpec.png)

Bạn có thể chọn có thêm tên chuỗi rút gọn vào trước các Safe hay không.

- Thêm trước địa chỉ với tiền tố chuỗi: Bạn có thể thêm tên chuỗi “baobab” vào trước địa chỉ bằng cách nhấp vào hộp kiểm đầu tiên hoặc dùng cách khác.

![](/img/build/tools/23_acctPrepend.png)

- Sao chép địa chỉ với tiền tố chuỗi:

![](/img/build/tools/24_chainAddrError.png)

Khi sao chép địa chỉ Safe từ bảng điều khiển để dán vào ví như trên, bạn có thể chọn thêm tên chuỗi hoặc bằng cách nhấp vào hộp kiểm. Bạn cần bỏ chọn để tránh lỗi trên.

![](/img/build/tools/25_copyAcctPrepend.png)
