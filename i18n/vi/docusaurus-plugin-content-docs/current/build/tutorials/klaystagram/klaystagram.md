# Klaystagram

## Mục lục <a href="#table-of-contents" id="table-of-contents"></a>

- [Thiết lập môi trường](./setup-environment.md)
- [Triển khai hợp đồng](./deploy-contracts.md)
- [Cấu trúc thư mục](./directory-structure.md)
- [Tổng quan về mã Frontend](./code-overview.md)
- [Trang thông tin](./feedpage.md)
  - [Kết nối hợp đồng với Frontend](./feedpage.md#1-connect-contract-to-frontend)
  - [Thành phần UploadPhoto](./feedpage.md#2-uploadphoto-component)
  - [Thành phần nguồn cấp dữ liệu](./feedpage.md#3-feed-component)
  - [Thành phần TransferOwnership](./feedpage.md#4-transferownership-component)

## Môi trường thử nghiệm <a href="#testing-environment" id="testing-environment"></a>

DApp Klaystagram được thử nghiệm trong môi trường sau đây.

- MacOS Mojave 10.14.5
- Nút 10.16.0 (LTS)
- npm 6.9.0
- Python 2.7.10

## Giới thiệu <a href="#introduction" id="introduction"></a>

[![Klaystagram Introduction Video](/img/build/tutorials/klaystagram-video-poster.png)](https://vimeo.com/327033594)

Trong hướng dẫn này, ta sẽ tìm hiểu cách tạo `Klaystagram`, ứng dụng cấp phép ảnh NFT dựa trên Klaytn. Ứng dụng web đơn giản này yêu cầu kiến thức cơ bản về Solidity, JavaScript và React.

NFT là non-fungible token (token không thể thay thế), một loại token đặc biệt đại diện cho một tài sản duy nhất. Như ý nghĩa của cái tên non-fungible (không thể thay thế), mỗi token đều là duy nhất. Tính duy nhất này của NFT mở ra những chân trời mới cho quá trình số hóa tài sản. Ví dụ: NFT có thể dùng để đại diện cho tác phẩm nghệ thuật số, vật phẩm trò chơi hoặc bất cứ loại tài sản duy nhất nào và cho phép mọi người giao dịch. Để biết thêm thông tin, hãy tham khảo [bài viết](https://coincentral.com/nfts-non-fungible-tokens/) này.

Trong `Klaystagram`, mỗi token đều đại diện cho những bức ảnh duy nhất của người dùng. Khi người dùng tải ảnh lên, một token duy nhất sẽ được tạo ra, token này chứa dữ liệu ảnh cùng quyền sở hữu kèm theo. Tất cả giao dịch được ghi vào blockchain. Vì vậy, ngay cả nhà cung cấp dịch vụ cũng không thể kiểm soát những ảnh được tải lên. Khi xem xét mục đích của hướng dẫn này, sẽ chỉ có những chức năng chính được triển khai. Sau khi xem xong hướng dẫn này, hãy thử bổ sung một số tính năng thú vị hơn và tạo ra dịch vụ sáng tạo của riêng bạn.

Có ba tính năng chính.

1. **Photo upload** Người dùng có thể tải ảnh kèm mô tả lên blockchain Klaytn. Ảnh sẽ được token hóa.
2. **Feed** Người dùng có thể xem tất cả ảnh được tải lên trên blockchain.
3. **Transfer ownership** Chủ sở hữu ảnh có thể chuyển quyền sở hữu ảnh cho một người dùng khác, đồng thời giao dịch sẽ hiển thị trong phần lịch sử quyền sở hữu.

> **Source Code**\
> Mã nguồn hoàn chỉnh có trên GitHub tại [https://github.com/klaytn/klaystagram](https://github.com/klaytn/klaystagram)

## Đối tượng mục tiêu <a href="#intended-audience" id="intended-audience"></a>

Chúng ta sẽ xây dựng một ứng dụng web tương tác với các hợp đồng thông minh. Để hiểu trọn vẹn hướng dẫn này, người xem phải làm quen với các khái niệm sau.

- Chúng tôi sẽ xem như bạn đã có kiến thức cơ bản về [React](https://reactjs.org/) và [Redux](https://redux.js.org/). Khóa học này không dành cho những người mới bắt đầu.
- Bạn nên có kiến thức và kinh nghiệm cơ bản về phát triển [Solidity](https://solidity.readthedocs.io/en/v0.5.10/). Tuy nhiên, một nhà phát triển SW có kinh nghiệm cũng có thể hoàn thành tác vụ nếu làm theo chỉ dẫn từng bước trong hướng dẫn này.
- Bất cứ ai quan tâm đến [Token ERC-721](http://erc721.org/).
