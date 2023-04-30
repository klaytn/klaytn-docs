# Count DApp

## Mục lục <a href="#table-of-contents" id="table-of-contents"></a>

* [1. Thiết lập môi trường](1.-environment-setup.md)
* [2. Clone Count DApp](2.-clone-count-dapp.md)
* [3. Cấu trúc thư mục](3.-directory-structure.md)
* [4. Viết hợp đồng thông minh](4.-write-smart-contract.md)
* [5. Tổng quan về mã Frontend](5.-frontend-code-overview/)
  * [5-1. Thành phần BlockNumber](5.-frontend-code-overview/5-1.-blocknumber-component.md)
  * [5-2. Thành phần xác thực](5.-frontend-code-overview/5-2.-auth-component.md)
  * [5-3. Thành phần Count](5.-frontend-code-overview/5-3.-count-component.md)
* [6. Triển khai hợp đồng](6.-deploy-contract.md)
* [7. Chạy ứng dụng](7.-run-app.md)

## Kiểm tra môi trường <a href="#testing-environment" id="testing-environment"></a>

Count DApp được thử nghiệm trong môi trường sau đây.

* MacOS Mojave 10.14.5
* Nút10.16.0 (LTS)
* npm 6.9.0
* Python 2.7.10

## Giới thiệu <a href="#introduction" id="introduction"></a>

![giới thiệu](../../../bapp/tutorials/count-bapp/images/tutorial-1intro.gif)

Hướng dẫn này cung cấp chỉ dẫn từng bước để xây dựng ứng dụng Klaytn. Bạn không cần có kinh nghiệm từ trước với Klaytn. Chúng ta sẽ tạo một ứng dụng web đơn giản tương tác với hợp đồng thông minh cơ bản `Count`.\
Bất kỳ người dùng nào có tài khoản Klaytn đều có thể tăng và giảm giá trị hiện tại như trong gif trên.

> **Source Code**\
  Mã nguồn hoàn chỉnh có ở GitHub, tại đây [https://github.com/klaytn/countbapp](https://github.com/klaytn/countbapp)

## Đối tượng mục tiêu <a href="#intended-audience" id="intended-audience"></a>

Bất kỳ ai muốn tìm hiểu cách xây dựng ứng dụng chuỗi khối trên Klaytn. Chúng ta sẽ xây dựng một ứng dụng web tương tác với các hợp đồng thông minh. Để hiểu trọn vẹn hướng dẫn này, người xem phải làm quen với các khái niệm sau.

* Chúng tôi coi như bạn đã có kiến thức cơ bản về [React](https://reactjs.org/) và [Redux](https://redux.js.org/). Khóa học này không dành cho những người mới hoàn toàn.
* Bạn nên có kiến thức và kinh nghiệm cơ bản về phát triển Solidity. Tuy nhiên, một nhà phát triển SW có kinh nghiệm cũng có thể hoàn thành tác vụ nếu làm theo chỉ dẫn từng bước trong hướng dẫn này.
