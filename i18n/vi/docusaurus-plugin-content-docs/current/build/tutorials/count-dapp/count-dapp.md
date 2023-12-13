# Count DApp

## Mục lục <a href="#table-of-contents" id="table-of-contents"></a>

* [Thiết lập môi trường](./setup-environment.md)
* [Triển khai hợp đồng](./deploy-contracts.md)
* [Cấu trúc thư mục](./directory-structure.md)
* [Tổng quan về mã Frontend](./code-overview/blocknumber-component.md)
  * [Thành phần số khối](./code-overview/blocknumber-component.md)
  * [Thành phần xác thực](./code-overview/auth-component.md)
  * [Thành phần Count](./code-overview/count-component.md)

## Môi trường thử nghiệm <a href="#testing-environment" id="testing-environment"></a>

Count DApp được thử nghiệm trong môi trường sau đây.

* MacOS Mojave 10.14.5
* Nút 10.16.0 (LTS)
* npm 6.9.0
* Python 2.7.10

## Giới thiệu <a href="#introduction" id="introduction"></a>

![giới thiệu](/img/build/tutorials/tutorial-1intro.gif)

Hướng dẫn này cung cấp chỉ dẫn từng bước để xây dựng ứng dụng Klaytn. Với Klaytn, bạn không cần có kinh nghiệm từ trước. Chúng ta sẽ tạo một ứng dụng web đơn giản tương tác với hợp đồng thông minh cơ bản `Count`.\
Bất kỳ người dùng nào có tài khoản Klaytn đều có thể tăng và giảm giá trị hiện tại như trong gif trên.

> **Source Code**\
  Mã nguồn hoàn chỉnh có ở GitHub, tại đây [https://github.com/klaytn/countbapp](https://github.com/klaytn/countbapp)

## Đối tượng mục tiêu <a href="#intended-audience" id="intended-audience"></a>

Bất kỳ ai muốn tìm hiểu cách xây dựng ứng dụng chuỗi khối trên Klaytn. Chúng ta sẽ xây dựng một ứng dụng web tương tác với các hợp đồng thông minh. Để hiểu trọn vẹn hướng dẫn này, người xem phải làm quen với các khái niệm sau.

* Chúng tôi sẽ xem như bạn đã có kiến thức cơ bản về [React](https://reactjs.org/) và [Redux](https://redux.js.org/).x. Khóa học này không dành cho những người mới bắt đầu.
* Bạn nên có kiến thức và kinh nghiệm cơ bản về phát triển Solidity. Tuy nhiên, một nhà phát triển SW có kinh nghiệm cũng có thể hoàn thành tác vụ nếu làm theo chỉ dẫn từng bước trong hướng dẫn này.
