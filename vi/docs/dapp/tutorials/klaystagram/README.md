# Klaystagram

## Mục lục <a href="#table-of-contents" id="table-of-contents"></a>

* [1. Thiết lập môi trường](1.-environment-setup.md)
* [2. Sao y Klaystagram DApp](2.-clone-klaystagram-dapp.md)
* [3. Cấu trúc thư mục](3.-directory-structure.md)
* [4. Soạn hợp đồng thông minh Klaystagram](4.-write-klaystagram-smart-contract.md)
* [5. Triển khai hợp đồng](5.-deploy-contract.md)
* [6. Tổng quan về mã Frontend](6.-frontend-code-overview.md)
* [7. Trang thông tin](7.-feedpage/)
  * [7-1. Kết nối hợp đồng với Frontend](7.-feedpage/7-1.-connect-contract-to-frontend.md)
  * [7-2. Thành phần UploadPhoto](7.-feedpage/7-2.-uploadphoto-component.md)
  * [7-3. Thành phần Feed](7.-feedpage/7-3.-feed-component.md)
  * [7-4. Thành phần TransferOwnership](7.-feedpage/7-4.-transferownership-component.md)
* [8. Chạy ứng dụng](8.-run-app.md)

## Môi trường thử nghiệm <a href="#testing-environment" id="testing-environment"></a>

DApp Klaystagram được thử nghiệm trong môi trường sau đây.

* MacOS Mojave 10.14.5
* Nút 10.16.0 (LTS)
* npm 6.9.0
* Python 2.7.10

## Giới thiệu <a href="#introduction" id="introduction"></a>

[![Video giới thiệu về Klaystagram](../../../bapp/tutorials/klaystagram/images/klaystagram-video-poster.png)](https://vimeo.com/327033594)

Trong hướng dẫn này, ta sẽ tìm hiểu cách tạo `Klaystagram`, ứng dụng cấp phép ảnh NFT dựa trên Klaytn. Ứng dụng web đơn giản này yêu cầu kiến thức cơ bản về Solidity, JavaScript và React.

NFT là non-fungible token, một loại token đặc biệt đại diện cho một tài sản duy nhất. Như ý nghĩa của cái tên non-fungible, mỗi token đều là duy nhất. Tính duy nhất này của NFT mở ra những chân trời mới cho việc số hóa tài sản. Ví dụ: NFT có thể được dùng để đại diện cho nghệ thuật số, vật phẩm trò chơi hoặc bất cứ loại tài sản duy nhất nào và cho phép mọi người giao dịch. Để biết thêm thông tin, hãy tham chiếu [article](https://coincentral.com/nfts-non-fungible-tokens/) này.

Trong `Klaystagram`, mỗi token đều đại diện cho những bức ảnh duy nhất của người dùng. Khi người dùng tải ảnh lên, một token duy nhất sẽ được tạo và có chứa dữ liệu cũng như quyền sở hữu ảnh. Tất cả giao dịch được ghi lại trên blockchain. Vì vậy, ngay cả nhà cung cấp dịch vụ cũng không thể kiểm soát những ảnh được tải lên. Cân nhắc tới mục đích của hướng dẫn này, sẽ chỉ có những chức năng chính được thực hiện. Sau khi xem xong hướng dẫn này, hãy thử thêm một số tính năng hay ho hơn và tạo ra dịch vụ sáng tạo của riêng bạn.

Có ba tính năng chính.

1. **Photo upload** Người dùng có thể tải ảnh cùng mô tả lên blockchain Klaytn. Ảnh sẽ được token hóa.
2. **Feed** Người dùng có thể xem tất cả ảnh được tải lên trên blockchain.
3. **Transfer ownership** Chủ sở hữu ảnh có thể chuyển quyền sở hữu ảnh cho một người dùng khác, đồng thời giao dịch sẽ được thể hiện trong lịch sử quyền sở hữu.

> **Source Code**\
  Mã nguồn hoàn chỉnh có ở GitHub, tại đây [https://github.com/klaytn/klaystagram](https://github.com/klaytn/klaystagram)

## Đối tượng mục tiêu <a href="#intended-audience" id="intended-audience"></a>

Chúng ta sẽ xây dựng một ứng dụng web tương tác với các hợp đồng thông minh. Để hiểu trọn vẹn hướng dẫn này, người xem phải làm quen với các khái niệm sau.

* Chúng tôi coi như bạn đã có kiến thức cơ bản về [React](https://reactjs.org/) và [Redux](https://redux.js.org/). Khóa học này không dành cho những người mới hoàn toàn.
* Bạn nên có kinh nghiệm và kiến thức cơ bản về việc phát triển [Solidity](https://solidity.readthedocs.io/en/v0.5.10/). Tuy nhiên, một nhà phát triển SW có kinh nghiệm cũng có thể hoàn thành tác vụ nếu làm theo chỉ dẫn từng bước trong hướng dẫn này.
* Bất cứ ai quan tâm tới [ERC-721 Tokens](http://erc721.org/).
