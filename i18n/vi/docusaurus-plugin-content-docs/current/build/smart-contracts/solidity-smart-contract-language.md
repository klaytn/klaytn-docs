# Solidity - Ngôn ngữ của hợp đồng thông minh

Chương này chỉ mô tả các khái niệm bậc cao, quy trình phát triển và các ví dụ được viết bằng Solidity vì tài liệu tham khảo về Solidity đã được cung cấp đầy đủ trang web chính thức của ngôn ngữ lập trình này. Về tiêu chuẩn kỹ thuật hoặc triển khai ngôn ngữ, vui lòng tham khảo các [Tài liệu tham khảo](#references) dưới đây. Nội dung của chương này được lấy từ nhiều trang web khác nhau được liệt kê trong phần [Tài liệu tham khảo](#references).

## Solidity và Klaytn <a id="solidity-and-klaytn"></a>

[Solidity](https://github.com/ethereum/solidity) là một ngôn ngữ lập trình bậc cao kiểu tĩnh, hướng đến hợp đồng, được sử dụng để triển khai các hợp đồng thông minh trên nền tảng Ethereum. Mặc dù Solidity ban đầu được thiết kế cho Ethereum nhưng ngôn ngữ này cũng đủ tổng quát để viết các hợp đồng thông minh. Do đó, có thể sử dụng ngôn ngữ này trên các nền tảng blockchain khác, chẳng hạn như Klaytn.

Klaytn có khả năng tương thích chính thức với Máy ảo Ethereum (EVM) phiên bản **London**. Không đảm bảo tính tương thích ngược với các phiên bản EVM khác trên Klaytn. Do đó, chúng tôi khuyến nghị nên biên dịch mã Solidity với phiên bản mục tiêu Istanbul. Vui lòng tham khảo [cách thiết lập phiên bản EVM của solc](https://solidity.readthedocs.io/en/latest/using-the-compiler.html#setting-the-evm-version-to-target).

:::note

Nâng cấp giao thức v1.7.0 - thay đổi không tương thích bao gồm các mục liên quan đến lần hard fork **Istanbul** và các mục riêng của Klaytn. Nó đã được kích hoạt từ số khối `#75,373,312` đối với mạng lưới Baobab và `#86,816,005` đối với mạng lưới Cypress.

Nâng cấp giao thức v1.7.3 - thay đổi không tương thích bao gồm Base Fee từ lần hard fork **London**. Nó đã được kích hoạt từ số khối `#80,295,291` đối với mạng lưới Baobab và `#86,816,005` đối với mạng lưới Cypress.

Nâng cấp giao thức v1.8.0 - thay đổi không tương thích bao gồm Base Fee từ lần hard fork **London**. Nó đã được kích hoạt từ số khối `#86,513,895` đối với mạng lưới Baobab và `#86,816,005` đối với mạng lưới Cypress.

:::

Có thể sử dụng các công cụ phát triển như [Remix](https://remix.ethereum.org/) \(IDE hoạt động trên trình duyệt\) và [Truffle](https://github.com/trufflesuite/truffle) \(công cụ phát triển\) khi phát triển các hợp đồng thông minh cho Klaytn. Nhóm phát triển Klaytn sẽ cố gắng duy trì tính tương thích giữa các công cụ phát triển của Ethereum và Klaytn nhưng cũng có thể lựa chọn cung cấp cho các nhà phát triển hợp đồng thông minh trên Klaytn các phiên bản cải tiến hoặc cập nhật của các công cụ đó khi cần thiết.

Việc sử dụng Remix hoặc Truffle để phát triển hợp đồng thông minh rất tiện lợi nhưng ta cũng có thể sử dụng trình biên dịch Solidity cục bộ bằng cách xây dựng hoặc cài đặt nó theo hướng dẫn được mô tả trong trang web dưới đây:

* [Cài đặt Trình biên dịch Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html)

Lưu ý rằng có hai trình biên dịch Solidity dòng lệnh:

* _solc_: trình biên dịch với đầy đủ tính năng
  * Được đề cập trong tài liệu Solidity
* _solcjs_: liên kết JavaScript cho _solc_
  * Được duy trì như một dự án riêng [solc-js](https://github.com/ethereum/solc-js)
  * Các tùy chọn dòng lệnh của _solcjs_ không tương thích với các tùy chọn của _solc_.

Có thể tham khảo những tài liệu sau đây để bắt đầu sử dụng Solidity:

* [Tài liệu hướng dẫn sử dụng Solidity hàng đầu](https://medium.com/coinmonks/top-solidity-tutorials-4e7adcacced8)

## Cách viết hợp đồng thông minh <a id="how-to-write-a-smart-contract"></a>

Phần này trình bày một ví dụ về mã nguồn Solidity để cung cấp cho người đọc ý tưởng về giao diện của hợp đồng thông minh và cách viết hợp đồng. Lưu ý rằng mã nguồn đưa ra trong ví dụ này chỉ nhằm mục đích giải thích và không dành cho mục đích sản xuất. Trong mã nguồn này, `(require)` có nghĩa là dòng này là bắt buộc đối với bất kỳ tập tin nguồn Solidity nào trong khi `(optional)` có nghĩa là dòng này không phải lúc nào cũng cần thiết. Ký hiệu `Ln:` không phải là một phần của mã nguồn Solidity và được đưa ra trong ví dụ chỉ để thể hiện số thứ tự dòng. Không thêm các ký hiệu này vào mã nguồn khi sử dụng trong thực tế.

```text
L01: pragma solidity 0.5.12;   // (required) version pragma
L02:
L03: import "filename";        // (optional) importing other source files
L04:
L05: // (optional) smart contract definition
L06: contract UserStorage {
L07:    mapping(address => uint) userData;  // state variable
L08:
L09:    function set(uint x) public {
L10:       userData[msg.sender] = x;
L11:    }
L12:
L13:    function get() public view returns (uint) {
L14:       return userData[msg.sender];
L15:    }
L16:
L17:    function getUserData(address user) public view returns (uint) {
L18:       return userData[user];
L19:    }
L20: }
```

Mã trên khá là dễ hiểu nên nếu bạn đã quen thuộc với bất kỳ ngôn ngữ lập trình nào, bạn có thể bỏ qua phần giải thích dưới đây và chuyển đến phần tiếp theo. Tuy nhiên, đối với những người không hiểu rõ mã trên dùng để làm gì hoặc đối với những người lần đầu biết đến ngôn ngữ lập trình, chúng tôi xin đưa ra một mô tả ngắn về mã nguồn ở bên dưới:

* Các phần nằm trong mã nguồn bắt đầu bằng hai dấu gạch chéo \(`//`\) là phần ghi chú chứ không phải mã; chúng được sử dụng để chú thích và giải thích mã.  Trình biên dịch sẽ bỏ qua phần ghi chú này.
* Câu lệnh `pragma` ở dòng `L01` xác định phiên bản tối thiểu của trình biên dịch.  - Câu lệnh `import` ở dòng `L03` nhập tất cả các ký hiệu toàn cục từ "`filename`".  `filename` phải là tên một tập tin có thực.
* `L05` - `L20` xác định hợp đồng thông minh có tên là `UserStorage`.  Từ khóa `contract` được đặt trước tên hợp đồng và khai báo rằng mã này đại diện cho một hợp đồng thông minh.  Các hợp đồng trong Solidity tương tự như các lớp trong các ngôn ngữ hướng đối tượng.  Mỗi hợp đồng có thể chứa các khai báo về biến trạng thái, hàm, mã điều chỉnh hàm, sự kiện, kiểu dữ liệu cấu trúc và kiểu dữ liệu enum.  Ngoài ra, các hợp đồng có thể kế thừa từ các hợp đồng khác.  Đoạn mã trong ví dụ chứa một định nghĩa hợp đồng nhưng một tập tin Solidity có thể chứa nhiều hơn một định nghĩa hợp đồng.
* Ở dòng `L07`, `userData` là biến trạng thái thuộc loại ánh xạ.  Biến trạng thái được lưu trữ vĩnh viễn trong bộ nhớ lưu trữ hợp đồng.  Biến trạng thái `userData` duy trì một ánh xạ giữa `address` và một giá trị `uint`.  Kiểu `address` chứa địa chỉ 20 byte \(Klaytn sử dụng địa chỉ 20 byte tương tự như Ethereum\).
* Ở dòng `L09`, hàm public `set` được xác định để lưu giá trị `x` vào `userData` cho người gửi thông báo.  Biến `msg.sender` là biến đặc biệt được xác định trong Solidity và đại diện cho địa chỉ của người gửi thông báo \(_tức là_ lệnh gọi hiện tại\).  Từ khóa `public` có nghĩa là hàm này là một phần của giao diện hợp đồng và có thể được gọi từ bên ngoài hoặc bên trong.
* Các hàm `get` ở dòng `L13` và `getUserData` ở dòng `L17` được khai báo với từ khóa `view`, điều này có nghĩa là các hàm cam kết không thay đổi bất kỳ biến trạng thái nào.  Khai báo của các hàm bao gồm `returns (uint)`, có nghĩa là hàm trả về giá trị `uint`.

Để biết thêm thông tin về cú pháp và ngữ nghĩa của ngôn ngữ Solidity, vui lòng tham khảo [Tài liệu Solidity](https://docs.soliditylang.org/).

## Cách biên dịch, triển khai và thực thi hợp đồng <a id="how-to-compile-deploy-and-execute"></a>

Một cách để biên dịch mã Solidity là sử dụng trình biên dịch dòng lệnh _solc_. Trình biên dịch này có thể tạo các đầu ra khác nhau, từ các tập tin nhị phân và mã assembly đến cây cú pháp trừu tượng \(parse tree\). Giả sử rằng mã trên đã được lưu trong tập tin `UserStorage.sol` \(dòng `L03` không được bao gồm trong tập tin nguồn được hiển thị trên đây\), dưới đây là một số ví dụ về cách biên dịch tập tin `UserStorage.sol`.

```bash
$ solc --bin UserStorage.sol
```

* Lệnh này sẽ in kết quả biên dịch dưới dạng mã nhị phân, _tức là_ bytecode.

```bash
solc -o output --bin --ast --asm UserStorage.sol
```

* Trình biên dịch tạo một tập tin nhị phân \(sử dụng `--bin`\), cây cú pháp trừu tượng \(sử dụng `--ast`\) và mã assembly \(sử dụng `--asm`\) là các tập tin riêng biệt trong thư mục `output`.

```bash
solc --optimize --bin UserStorage.sol
```

* Để đạt hiệu suất tốt hơn, có thể kích hoạt trình tối ưu hóa trong quá trình biên dịch bằng cách sử dụng cờ `--optimize`.

Dưới đây là một số tài liệu tham khảo để biên dịch, triển khai và thực thi các hợp đồng thông minh.

* [Sử dụng trình biên dịch dòng lệnh Solidity](https://docs.soliditylang.org/en/latest/using-the-compiler.html)
* [Biên dịch hợp đồng bằng Remix](https://remix-ide.readthedocs.io/en/stable/compile.html)
* [Chạy giao dịch với Remix](https://remix-ide.readthedocs.io/en/stable/run.html)
* [Tài liệu hướng dẫn Remix Learneth](https://remix-ide.readthedocs.io/en/latest/remix_tutorials_learneth.html)
* [Biên dịch hợp đồng bằng Truffle](https://trufflesuite.com/docs/truffle/getting-started/compiling-contracts)
* [Triển khai hợp đồng bằng Truffle](https://trufflesuite.com/docs/truffle/getting-started/running-migrations)

LƯU Ý: Mục này sẽ được cập nhật trong tương lai.

## Gỡ lỗi hợp đồng thông minh <a id="debugging-smart-contracts"></a>

Việc gỡ lỗi mã Solidity khó hơn so với việc gỡ lỗi mã viết bằng các ngôn ngữ lập trình khác do thiếu các công cụ gỡ lỗi hiệu quả. Dưới đây là một số tài liệu tham khảo về việc gỡ lỗi Solidity.

* [Gỡ lỗi giao dịch bằng Remix](https://remix-ide.readthedocs.io/en/latest/debugger.html)
* [Hướng dẫn về cách gỡ lỗi giao dịch bằng Remix](https://remix-ide.readthedocs.io/en/latest/tutorial_debug.html)
* [Gỡ lỗi hợp đồng bằng Truffle](https://trufflesuite.com/docs/truffle/getting-started/using-the-truffle-debugger/)

LƯU Ý: Mục này sẽ được cập nhật trong tương lai.

## Thực hành tốt nhất về hợp đồng thông minh <a id="smart-contract-best-practices"></a>

Việc nghiên cứu và tuân thủ các thực hành tốt nhất trong lập trình Solidity đóng vai trò rất quan trọng để loại bỏ các vấn đề về bảo mật và chất lượng mã trong hợp đồng thông minh của bạn. Dưới đây là một số tài liệu tham khảo về thực hành tốt nhất đối với Solidity.

* [Thực hành bảo mật hợp đồng thông minh](https://github.com/ConsenSys/smart-contract-best-practices)

LƯU Ý: Mục này sẽ được cập nhật trong tương lai.

## Tài liệu tham khảo <a id="references"></a>

* [Trang Solidity GitHub](https://github.com/ethereum/solidity)
* [Bộ tài liệu Solidity](https://solidity.readthedocs.io/en/latest/index.html)
* [Bộ tài liệu Remix](https://remix-ide.readthedocs.io/en/latest/)
* [Bộ tài liệu Truffle](https://trufflesuite.com/docs/truffle/)
