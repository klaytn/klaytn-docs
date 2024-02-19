# Di chuyển hợp đồng Ethereum

Trong hầu hết các trường hợp, bạn có thể dùng hợp đồng Ethereum trên Klaytn mà không cần sửa đổi.
Tuy nhiên, bạn cần lưu ý hai vấn đề sau.

## Hỗ trợ Solidity <a id="solidity-support"></a>

- Mạng lưới Baobab hiện tương thích với Máy ảo Ethereum (EVM) phiên bản **London**.
- Mạng lưới Cypress hiện tương thích với Máy ảo Ethereum (EVM) phiên bản **London**.

:::note

Nâng cấp giao thức v1.7.0 - thay đổi không tương thích bao gồm các mục liên quan đến hard fork **Istanbul** và các mục riêng của Klaytn.
Nó đã được kích hoạt từ số khối `#75,373,312` đối với mạng lưới Baobab và `#86,816,005` đối với mạng lưới Cypress.

Nâng cấp giao thức v1.7.3 - thay đổi không tương thích bao gồm Base Fee từ lần hard fork **London**.
Nó đã được kích hoạt từ số khối `#80,295,291` đối với mạng lưới Baobab và `#86,816,005` đối với mạng lưới Cypress.

Nâng cấp giao thức v1.8.0 - thay đổi không tương thích bao gồm Base Fee từ lần hard fork **London**.
Nó đã được kích hoạt từ số khối `#86,513,895` đối với mạng lưới Baobab và `#86,816,005` đối với mạng lưới Cypress.

:::

Không đảm bảo tính tương thích ngược với các phiên bản EVM khác trên Klaytn.
Do đó, chúng tôi đặc biệt khuyến nghị biên dịch mã Solidity với tùy chọn mục tiêu chính xác theo trạng thái nâng cấp giao thức.

- Baobab: --evm-version london
- Cypress: --evm-version london
- Baobab: --evm-version london

Cypress: --evm-version london

Khác (chuỗi riêng/dịch vụ): được xác định theo trạng thái nâng cấp giao thức

```
$ solc --evm-version london contract.sol
```

## Vui lòng tham khảo [cách thiết lập phiên bản EVM của solc](https://solidity.readthedocs.io/en/latest/using-the-compiler.html#setting-the-evm-version-to-target).

Dưới đây là một lệnh ví dụ: Cặp khóa tách rời <a id="decoupled-key-pairs"></a> Klaytn [tách riêng cặp khóa khỏi địa chỉ](../../learn/accounts.md#decoupling-key-pairs-from-addresses). Nếu người dùng [cập nhật tài khoản](../../learn/transactions/basic.md#txtypeaccountupdate), khóa riêng tư cho tài khoản cụ thể sẽ được thay thế bằng một khóa khác. Trong hầu hết các trường hợp, điều này sẽ không ảnh hưởng đến logic kinh doanh của bạn.
