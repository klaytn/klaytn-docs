# Ví Klaytn

Ví Klaytn là một công cụ quản lý tài khoản dựa trên trình duyệt dành cho các nhà phát triển dApp (ứng dụng phi tập trung) trên Klaytn. Ví này giúp các nhà phát triển tạo tài khoản mới hoặc xem thông tin tài khoản hiện có trực tiếp thông qua trình duyệt web mà không cần phải chạy nút Klaytn cục bộ. Ví Klaytn cũng cho phép người dùng chuyển token KLAY hoặc Klaytn sang các tài khoản khác để thử nghiệm.

#### Thông báo quan trọng về bảo mật <a id="important-notice-on-security"></a>

> **Xin lưu ý:** Chỉ nên sử dụng Ví Klaytn cho mục đích phát triển và thử nghiệm. KHÔNG sử dụng Ví Klaytn cho mục đích thương mại hoặc cá nhân, kể cả việc lưu trữ hoặc chuyển KLAY hoặc token Klaytn. Ví Klaytn CHƯA được thử nghiệm về bảo mật ở cấp độ thương mại và có thể dễ bị tấn công bằng mã độc. Ví Klaytn lưu trữ khóa riêng tư của người dùng vào bộ nhớ cục bộ của trình duyệt, bộ nhớ này có thể dễ bị tấn công khai thác các lỗ hổng bảo mật của trình duyệt.

- Ví Klaytn dành cho mạng chính Cypress: [https://wallet.klaytn.com](https://wallet.klaytn.com)
- Ví Klaytn dành cho mạng thử nghiệm Baobab: [https://baobab.wallet.klaytn.foundation](https://baobab.wallet.klaytn.foundation)

![](/img/build/tools/00-main.png)

## Chức năng của Ví Klaytn <a id="klaytn-wallet-functions"></a>

Ví Klaytn hỗ trợ danh sách các tính năng sau đây.

- Quản lý tài khoản và khóa
  - Tạo tài khoản mới
  - Tải tài khoản hiện có bằng khóa riêng tư hoặc tệp lưu trữ khóa
  - Tải xuống tệp lưu trữ khóa mới
- Quản lý tài sản
  - Xem số dư tài khoản
  - Thêm token vào ví
  - Chuyển token KLAY và Klaytn
- Mạng thử nghiệm và Vòi KLAY Baobab

## Tạo tài khoản mới <a id="create-a-new-account"></a>

> Nếu đã có tài khoản Klaytn, bạn có thể chọn bỏ qua quy trình này và chuyển đến mục [Access tài khoản hiện có](#access-existing-account).

Bạn có thể sử dụng Ví Klaytn để tạo tài khoản Klaytn mới. Để tạo tài khoản mới, hãy nhấp vào nút `Create Account` trên thanh menu ở bên trái, sau đó thực hiện theo các bước bên dưới.

- Bước 1. Thiết lập mật khẩu cho tệp lưu trữ khóa tài khoản mới của bạn
- Bước 2. Tải tệp lưu trữ khóa xuống bộ nhớ cục bộ của bạn
- Bước 3. Lưu Khóa ví Klaytn cho tài khoản mới của bạn

### Trước khi tiếp tục, hãy lưu ý: <a id="before-continuing-a-few-words-of-caution"></a>

- TUYỆT ĐỐI KHÔNG chia sẻ 'Khóa ví' hoặc 'khóa riêng tư' của bạn với bất kỳ ai. Cung cấp thông tin về 'Khóa ví' hoặc 'khóa riêng tư' của bạn có nghĩa là cung cấp quyền truy cập toàn diện và vĩnh viễn vào tài khoản của bạn.
- Không lưu giữ thông tin này trên thiết bị được kết nối Internet. Tin tặc có thể đánh cắp thông tin đăng nhập của bạn từ bộ nhớ cục bộ.
- Chọn một mật khẩu mạnh và lưu trữ thông tin quan trọng ở nhiều vị trí.
- Klaytn KHÔNG THỂ khôi phục 'Khóa ví' hoặc 'khóa riêng tư' trong trường hợp bạn làm mất khóa. Hãy hết sức cẩn thận để không làm mất thông tin quan trọng của bạn.

### Bước 1. Thiết lập mật khẩu cho tệp lưu trữ khóa của bạn <a id="step-1-set-password-for-your-keystore-file"></a>

Bước đầu tiên trong việc tạo tài khoản mới là bạn cần tạo mật khẩu cho tệp lưu trữ khóa. Tệp lưu trữ khóa là một tệp JSON lưu trữ an toàn thông tin tài khoản Klaytn của bạn, bao gồm địa chỉ của tài khoản và khóa riêng tư được liên kết với tài khoản. Mật khẩu của tệp lưu trữ khóa phải đủ mạnh để đáp ứng tiêu chuẩn bảo mật của Klaytn do mật khẩu bảo vệ khóa riêng tư được lưu trữ trong tệp.

![](/img/build/tools/01-create-new-1.png)

Khi bạn nhấp vào biểu mẫu nhập mật khẩu, một chú giải công cụ sẽ xuất hiện phía trên và nó sẽ cho bạn biết mật khẩu đã nhập có đáp ứng các yêu cầu bảo mật hay không. Nếu mật khẩu của bạn đáp ứng tất cả các yêu cầu, nút `Next Step` sẽ được kích hoạt. !

### Bước 2. Tải xuống tệp lưu trữ khóa <a id="step-2-download-the-keystore-file"></a>

Ở bước thứ hai này, bạn tải xuống tệp lưu trữ khóa đã được mã hóa bằng mật khẩu đã gửi. Nhấp vào nút `Download & Next Step` để tải ngay tệp lưu trữ khóa xuống và chuyển sang bước cuối cùng. (Lưu ý rằng nếu tệp lưu trữ khóa đã tải xuống bị mất, bạn có thể tải xuống tệp lưu trữ khóa mới trong menu `View Account Info`.)

![](/img/build/tools/01-create-new-4.png)

### Bước 3. Lưu khóa Ví Klaytn và Khóa riêng tư của bạn <a id="step-3-save-your-klaytn-wallet-key-and-private-key"></a>

Ở bước cuối cùng, bạn sẽ thấy Khóa ví và khóa riêng tư tương ứng với tài khoản mới tạo của mình. Bạn nên lưu trữ khóa vào một bộ lưu trữ riêng biệt, không được kết nối.

Để biết thêm thông tin chi tiết về tài khoản Klaytn, vui lòng truy cập Tài liệu Klaytn và xem lại phần [Tài khoản](../../../learn/accounts.md).

![](/img/build/tools/01-create-new-5.png)

## Truy cập tài khoản hiện có <a id="access-existing-account"></a>

Để kiểm tra số dư KLAY hoặc token Klay trong tài khoản hoặc để chuyển token sang tài khoản khác, bạn cần truy cập vào tài khoản của mình. Ví Klaytn cung cấp hai cách để truy cập vào tài khoản của bạn.

- **Sử dụng Khóa ví Klaytn hoặc Khóa riêng tư** Khóa ví Klaytn là một chuỗi gồm 110 ký tự thập lục phân được liên kết với một tài khoản, trong khi khóa riêng tư là một chuỗi gồm 64 ký tự thập lục phân (Số ký tự không bao gồm "0x" cho biết số thập lục phân. Nếu được tính, Khóa ví Klaytn dài 112 ký tự và khóa riêng tư dài 66 ký tự). Việc sử dụng khóa riêng tư để truy cập nên là phương cách cuối cùng, chỉ sử dụng khi tất cả các cách khác đều không thành công. Đây không phải là cách truy cập tài khoản đúng đắn. Khóa riêng tư là thông tin nhạy cảm nhất vì khóa này cho phép truy cập toàn diện vào tài khoản. Do đó, bạn cần giữ khóa riêng của bạn an toàn, bảo mật và bí mật.
- **Tệp lưu trữ khóa và mật khẩu** Tệp lưu trữ khóa là tệp JSON lưu trữ khóa riêng tư được mã hóa và thông tin địa chỉ tài khoản. Tệp này được mã hóa bằng mật khẩu do người dùng cung cấp.

### Truy cập tài khoản hiện có bằng Khóa ví Klaytn hoặc Khóa riêng tư <a id="access-existing-account-using-klaytn-wallet-key-or-private-key"></a>

#### Bước 1. Nhập Khóa ví hoặc Khóa riêng tư <a id="step-1-enter-the-wallet-key-or-private-key"></a>

Để truy cập tài khoản của bạn, hãy nhấp vào nút `View Account Info` từ thanh menu bên trái và chuyển đến tab `Private Key` trên màn hình. Nhập Khóa ví Klaytn hoặc khóa riêng tư cho tài khoản bạn muốn truy cập vào ô nhập dữ liệu.

![](/img/build/tools/03-access-1pk-1.png)

#### Bước 2. Tích vào Hộp kiểm và nhấp vào nút 'Access' <a id="step-2-check-the-checkbox-and-click-access-button"></a>

Nhấp vào nút `Access` để chuyển đến trang tài khoản của bạn. Nếu thông tin khóa bạn cung cấp không phù hợp với bất kỳ định dạng khóa nào, nút `Access` sẽ không hoạt động.

![](/img/build/tools/03-access-1pk-2.png)

### Truy cập tài khoản hiện có bằng tệp lưu trữ khóa và mật khẩu <a id="access-existing-account-using-keystore-file-and-password"></a>

#### Bước 1. Chuyển đến tab Keystore File <a id="step-1-go-to-the-keystore-file-tab"></a>

Chuyển đến tab `Keystore File` trên màn hình.

![](/img/build/tools/03-access-2ks-1.png)

#### Bước 2. Chọn Tệp lưu trữ khóa cần sử dụng <a id="step-2-select-the-keystore-file-to-use"></a>

Nhấp vào nút `Upload` và tìm tệp lưu trữ khóa của bạn.

![](/img/build/tools/03-access-2ks-2.png)

#### Bước 3. Nhập Mật khẩu tệp lưu trữ khóa <a id="step-3-enter-keystore-file-password"></a>

Nhập mật khẩu tương ứng với tệp lưu trữ khóa đã chọn và nhấp vào nút `Access` để chuyển đến trang tài khoản của bạn.

![](/img/build/tools/03-access-2ks-3.png)

### Xem thông tin tài khoản <a id="view-account-info"></a>

Tại trang này, bạn có thể kiểm tra địa chỉ tài khoản, khóa riêng tư và thông tin Khóa ví Klaytn của mình. Ở phía bên phải của trang, bạn có thể kiểm tra số dư KLAY của mình và các token Klaytn khác. Việc sử dụng Ví Klaytn để kiểm tra số dư tài khoản được khuyến nghị cho các nhà phát triển ứng dụng blockchain không muốn mở khóa tài khoản của họ mỗi khi cần kiểm tra số dư vì lý do bảo mật.

![](/img/build/tools/04-balance-3.png)

## Cách thêm token Klaytn <a id="how-to-add-klaytn-tokens"></a>

Ví Klaytn hỗ trợ đăng ký token KLAY và Klaytn để có thể kiểm tra số dư của chúng. Để đăng ký token Klaytn vào Ví Klaytn, vui lòng làm theo các bước bên dưới.

### Bước 1. Truy cập thông tin tài khoản hiện có <a id="step-1-access-existing-account-s-information"></a>

Truy cập trang tài khoản của bạn bằng cách thực hiện theo các bước [Truy cập tài khoản hiện có](#access-existing-account).

### Bước 2. Nhấp vào nút Add Token trong phần Số dư <a id="step-2-click-the-add-token-button-in-the-balance-section"></a>

Nhấp vào nút '+' ở dưới cùng bên phải màn hình trong mục `Số dư`.

![](/img/build/tools/05-addtoken-3.png)

### Bước 3. Nhập thông tin token <a id="step-3-enter-token-information"></a>

Nhập `Mã token`, `Địa chỉ hợp đồng token` và `Số thập phân`. Sau khi nhấp vào nút `Save`, bạn sẽ thấy token được liệt kê trong phần số dư tài khoản của mình.

![](/img/build/tools/05-addtoken-4.png)

## Cách gửi KLAY và token <a id="how-to-send-klay-and-tokens"></a>

Bạn có thể gửi token KLAY hoặc Klaytn đến các tài khoản khác bằng Ví Klaytn. Khi gửi KLAY hoặc token, bạn phải có số lượng KLAY tối thiểu trong tài khoản của mình để trả phí giao dịch.

### Bước 1. Chuyển đến menu 'Send KLAY & Token' <a id="step-1-go-to-send-klay-tokens-menu"></a>

Nhấp vào nút `Send KLAY & Token` từ thanh menu bên trái hoặc nút tương tự trên trang chính.

![](/img/build/tools/06-send-1.png)

### Bước 2. Truy cập tài khoản <a id="step-2-access-your-account"></a>

Trong trường hợp bạn chưa thêm tài khoản của mình vào ví, hãy làm theo các bước trong phần [Truy cập tài khoản hiện có](#access-existing-account).

### Bước 3. Chọn token cần gửi <a id="step-3-select-the-token-to-send"></a>

Chọn token để chuyển trong `Bước 1. Chọn phần token`.

![](/img/build/tools/06-send-3.png)

### Bước 4. Chọn thông tin chuyển token <a id="step-4-select-token-transfer-information"></a>

Sau khi chọn token cần gửi, hãy chuyển sang `Bước 2. Nhập phần thông tin` và điền thông tin cần thiết (`Địa chỉ đến` và `Số lượng cần gửi`), sau đó nhấp vào nút `Send Transaction`.

![](/img/build/tools/06-send-4.png)

### Bước 5. Xác nhận giao dịch chuyển <a id="step-5-confirm-the-transfer"></a>

Một trang xác nhận sẽ xuất hiện. Kiểm tra kỹ số lượng cần chuyển và địa chỉ người nhận. Nếu mọi thứ đã chính xác, hãy nhấp vào `Có, tôi chắc chắn`. Nếu không, bạn có thể quay lại trang trước để chỉnh sửa thông tin chuyển token.

![](/img/build/tools/06-send-9.png)

### Bước 6. Xem lại thông tin chuyển khoản chi tiết <a id="step-6-review-transfer-details"></a>

Yêu cầu giao dịch của bạn đã hoàn tất. Bạn có thể kiểm tra trạng thái của giao dịch trên Klaytnscope. Nhấp vào `Xem thông tin giao dịch` sẽ khởi chạy Klaytnscope để hiển thị chi tiết giao dịch.

![](/img/build/tools/06-send-10.png)

## Cách nhận KLAY qua mạng thử nghiệm Baobab <a id="how-to-receive-baobab-testnet-klay"></a>

Vòi KLAY dùng cho mạng thử nghiệm chạy trên mạng Baobab. Vòi này có thể được truy cập từ [Ví Klaytn trên Baobab](https://baobab.wallet.klaytn.foundation).

Để nhận được KLAY dùng cho mạng thử nghiệm, bạn cần phải có tài khoản Klaytn hợp lệ.

- Nếu bạn chưa có tài khoản, vui lòng tạo một tài khoản bằng cách thực hiện theo các bước trong phần [Create Account mới](#create-a-new-account).
- Thêm tài khoản của bạn vào ví bằng cách thực hiện theo các bước trong phần [Truy cập tài khoản hiện có](#access-existing-account). Đồng KLAY dùng cho mạng thử nghiệm sẽ được gửi đến tài khoản được tải.

### Bước 1. Truy cập Vòi KLAY mạng thử nghiệm <a id="step-1-go-to-the-testnet-klay-faucet"></a>

Từ menu [Baobab Klaytn Wallet](https://baobab.wallet.klaytn.foundation), `Vòi KLAY` ở thanh bên trái sẽ đưa bạn đến trang yêu cầu KLAY testnet.

Trang được yêu cầu sẽ hiển thị địa chỉ của bạn và số dư KLAY mạng thử nghiệm hiện tại trong tài khoản của bạn.

![](/img/build/tools/test_klay_faucet.png)

### Bước 2. Chạy Vòi <a id="step-2-run-faucet"></a>

Nhấp vào nút `Run Faucet` bạn sẽ nhận được 5 KLAY dùng cho mạng thử nghiệm và số dư của bạn sẽ được cập nhật. Xin lưu ý rằng bạn có thể mở vòi cho mỗi tài khoản 24 giờ một lần.
