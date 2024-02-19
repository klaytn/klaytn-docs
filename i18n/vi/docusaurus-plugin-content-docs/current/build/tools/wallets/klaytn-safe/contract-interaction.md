# Tương tác hợp đồng

Trong phần này, bạn sẽ tương tác và gửi giao dịch đến một hợp đồng đơn giản được triển khai trên Baobab bằng cách sử dụng ví đa chữ ký mới được tạo của chúng tôi.

**Điều kiện tiên quyết**

- [Metamask](https://metamask.io/download/) & [Cấu hình Klaytn Metamask](../../../tutorials/connecting-metamask#send-klay)
- [Remix](https://remix.ethereum.org/) & [Plugin Klaytn Remix](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
- Kiểm tra KLAY từ [Faucet](https://baobab.wallet.klaytn.foundation/faucet)

**Bước 1:** Điều hướng đến [Remix](https://remix.ethereum.org/)

**Bước 2:** Lập và triển khai **hợp đồng lưu trữ** mẫu.

Trước tiên, hợp đồng phải được triển khai trước khi bạn có thể tương tác với nó trong ví nhiều chữ ký của mình. Hợp đồng mẫu này chứa một biến “number” uint đơn giản có thể được cập nhật bằng cách gọi ra phương pháp **lưu trữ** và được truy xuất bằng cách gọi ra phương pháp **truy xuất**.

![](/img/build/tools/12_remixDep.gif)

**Bước 3:** Bắt đầu một giao dịch mới.

Để tương tác với hợp đồng thông minh trong ví safe của bạn, hãy nhấp vào **“New Transaction”**. Để hoàn tất bước này, bạn sẽ cần địa chỉ hợp đồng đã được triển khai và ABI của mình như được minh họa trong bước trước.

![](/img/build/tools/13_contractInit.gif)

**Bước 4:** Xem lại và gửi giao dịch. Bạn sẽ cần ký giao dịch bằng ví người ký của mình và sẽ được thực hiện sau khi đạt đến ngưỡng xác nhận.

![](/img/build/tools/14_contractExec.gif)
