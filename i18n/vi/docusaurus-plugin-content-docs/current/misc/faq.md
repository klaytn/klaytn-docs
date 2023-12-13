# Câu hỏi thường gặp

- [Klaytn là gì?](#what-is-klaytn)
- [Klaytn 2.0 là gì?](#what-is-klaytn-2.0)
- [Klaytn hỗ trợ khả năng tương thích với Ethereum như thế nào?](#how-ethereum-equivalence)
- [Chính sách gas của Klaytn là gì?](#klaytn-gas-policy)
- [Cấu trúc tài khoản của Klaytn có điểm gì đặc biệt?](#klaytn-account-structure)
- [Tôi có thể bắt đầu phát triển dApp với Klaytn ở đâu?](#dapp-development)
- [Klaytn có phải là mã nguồn mở không?](#is-klaytn-open-source)
- [Tôi có thể nạp tiền lần đầu vào tài khoản của mình bằng cách nào?](#fund-my-acconut)
- [Klaytn có nhà cung cấp nút mạng công khai nào để kiểm thử và phát triển không?](#node-providers)
- [Có trang web faucet nào để kiểm thử KLAY không?](#are-there-faucets)
- [Làm thế nào để kiểm tra trạng thái của điểm cuối RPC công khai?](#rpc-endpoint-status)
- [Những ví nào hỗ trợ Klaytn?](#which-wallets)
- [Cypress là gì, Baobab là gì?](#what-is-cypress-what-is-baobab)
- [Có SDK Klaytn nào không? Bằng những ngôn ngữ nào?](#klaytn-sdks)
- [Tôi có phải cài đặt và chạy Endpoint Node (EN) để sử dụng Klaytn không?](#must-i-install-and-run-en)
- [Tôi đang chạy EN và quá trình đồng bộ hóa dữ liệu nút diễn ra quá chậm.](#node-data-sync-is-too-slow)
- [Tôi có thể sử dụng hợp đồng ERC-20 và ERC-721 trên Klaytn không?](#can-i-use-erc-20-and-erc-721)
- [Tôi có thể sử dụng Truffle để phát triển hợp đồng thông minh trên Klaytn không?](#can-i-use-truffle)
- [Tôi có thể lấy ví tiện ích của trình duyệt giống như Metamask ở đâu?](#where-can-i-get-a-browser-extension-wallet)
- [Tại sao địa chỉ tài khoản người trả phí của tôi không được lấy từ khóa được cung cấp?](#account-address-is-not-derived-from-the-key)
- [Tôi có thể tìm các ví dụ hoàn chỉnh về ủy thác phí ở đâu?](#fee-delegation-samples)


## Klaytn là gì? <a id="what-is-klaytn"></a>
Klaytn là một nền tảng chuỗi khối Lớp 1 có độ trễ thấp, giao dịch trên giây (TPS) và độ xác nhận tức thời cao. Klaytn là chuỗi khối tối ưu cho việc xây dựng trò chơi và thực hiện [metaverse](../learn/klaytn2/metaverse-package).


## Klaytn 2.0 là gì? <a id="what-is-klaytn-2.0"></a>
Klaytn 2.0 đánh dấu quá trình chuyển đổi trọng tâm của Klaytn sang metaverse, hỗ trợ khả năng tương thích với Ethereum và Gói metaverse toàn diện để tạo điều kiện cho trải nghiệm xây dựng chuỗi khối. Để hiểu rõ hơn về Klaytn 2.0, vui lòng tham khảo [Tài liệu tóm tắt](https://klaytn.foundation/wp-content/uploads/Lightpaper.pdf) của chúng tôi.


## Klaytn hỗ trợ khả năng tương thích với Ethereum như thế nào? <a id="how-ethereum-equivalence"></a>
Klaytn tương thích với Máy ảo Ethereum (EVM) và hỗ trợ tất cả các tính năng EVM của Ethereum London. Không gian tên `eth` của chúng tôi đã được chỉnh sửa để tương thích với không gian tên của Ethereum. Các công cụ của Ethereum có thể được sử dụng một cách liền mạch và việc di chuyển các dApp Ethereum cũng có thể thực hiện dễ dàng. Loại giao dịch và trường giao dịch cũng tương thích với của Ethereum.


## Chính sách gas của Klaytn là gì? <a id="klaytn-gas-policy"></a>
Klaytn đã chuyển đổi từ chính sách phí gas cố định sang áp dụng cơ chế phí gas linh hoạt nhằm chống lại các bot hỗ trợ giao dịch chênh lệch giá. Vui lòng tham khảo [bài viết](https://medium.com/klaytn/dynamic-gas-fee-pricing-mechanism-1dac83d2689) này để biết thêm thông tin.


## Cấu trúc tài khoản của Klaytn có điểm gì đặc biệt? <a id="klaytn-account-structure"></a>
Để thuận tiện nhất cho nhà phát triển ứng dụng phi tập trung (dApp), Klaytn đã đưa ra cách thức để [tách các khóa riêng tư khỏi địa chỉ](https://klaytn-tech.medium.com/klaytn-usability-improvement-series-1-separating-keys-and-addresses-dd5e367a0744). Nhờ đó, bạn có thể dễ dàng triển khai phương pháp [đa chữ ký](https://medium.com/klaytn/klaytn-usability-improvement-series-2-introducing-multisig-on-the-platform-level-85141893db01), trong đó bạn tạo nhiều khóa riêng tư cho một tài khoản duy nhất, với mỗi khóa có trọng số khác nhau. Mỗi khóa cũng có thể được gán [các vai trò khác nhau](https://medium.com/klaytn/klaytn-usability-improvement-series-4-supporting-role-based-keys-on-the-platform-level-e2c912672b7b).


## Tôi có thể bắt đầu phát triển dApp với Klaytn ở đâu? <a id="dapp-development"></a>
Cho dù bạn đang di chuyển từ Ethereum sang Klaytn hay xây dựng trên Klaytn từ đầu, chúng tôi đều hỗ trợ tất cả các công cụ và hạ tầng cần thiết. Bạn có thể kiểm thử hợp đồng thông minh của bạn trên [Remix IDE](../build//tutorials/connecting-remix) bằng cách sử dụng Klaytn Plugin hoặc kết nối với ví [MetaMask](../build/tutorials/connecting-metamask) và [Kaikas](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi). Sdk `caver` của Klaytn khả dụng dưới dạng [caver-js](https://github.com/klaytn/caver-js) Bạn có thể tham khảo [tài liệu hướng dẫn](../build/tutorials/tutorials.md) của chúng tôi để thử xây dựng dApp trên Klaytn.


## Klaytn có phải là mã nguồn mở không? <a id="is-klaytn-open-source"></a>
Klaytn chắc chắn là mã nguồn mở! Hãy xem qua [Tổ chức Github](https://github.com/klaytn) của chúng tôi và bạn có thể bắt đầu [đóng góp](https://github.com/klaytn/klaytn-docs/blob/master/CONTRIBUTING.md) cho Hệ thống tài liệu Klaytn của chúng tôi. Đọc thêm về các chính sách mã nguồn mở của chúng tôi [tại đây](opensource).


## Tôi có thể nạp tiền lần đầu vào tài khoản của mình bằng cách nào? <a id="fund-my-acconut"></a>
Bạn có thể mua KLAY trên sàn giao dịch. Danh sách các sàn giao dịch đang hoạt động được cung cấp tại đây: [Coinmarketcap](https://coinmarketcap.com/currencies/klaytn/markets/) hoặc [Coingecko](https://www.coingecko.com/en/coins/klay#markets)


## Klaytn có nhà cung cấp nút mạng công khai nào để kiểm thử và phát triển không? <a id="node-providers"></a>
Tham khảo [danh sách](../references/service-providers/public-en#public-json-rpc-endpoint-providers) này để biết các nhà cung cấp nút mạng công khai của Klaytn và các miền mạng tương ứng.


## Có trang web faucet nào để kiểm thử KLAY không? <a id="are-there-faucets"></a>
Bạn có thể kiểm thử KLAY cho các mục đích phát triển và kiểm thử tại đây: [Klay Faucet](https://baobab.wallet.klaytn.foundation/faucet) [AllThatNode Faucet](https://www.allthatnode.com/faucet/klaytn.dsrv)


## Làm thế nào để kiểm tra trạng thái của điểm cuối RPC công khai? <a id="rpc-endpoint-status"></a>
Vì chúng tôi không thể đảm bảo thời gian hoạt động và tính ổn định của các điểm cuối, bạn luôn có thể kiểm tra trạng thái của nhà cung cấp nút mạng [tại đây](https://www.allthatnode.com/klaytn.dsrv).


## Những ví nào hỗ trợ Klaytn? <a id="which-wallets"></a>
Klaytn được hỗ trợ bởi ví lạnh D’cent, cũng như một số ví nóng như Kaikas, MetaMask và nhiều ví khác. Vui lòng tham khảo danh sách [tại đây](http://klaytn.foundation/ecosystem).


## Cypress là gì, Baobab là gì? <a id="what-is-cypress-what-is-baobab"></a>

Cypress là mạng chính thức của Klaytn, Baobab là mạng thử nghiệm. Dưới đây là thông tin liên quan đến mỗi mạng lưới.

Mạng chính thức Cypress:
- Tải xuống EN : Chọn gói Cypress từ [trang tải xuống](../nodes/downloads/downloads.md).
- Klaytnscope : https://scope.klaytn.com
- Ví Klaytn : https://wallet.klaytn.com

Mạng thử nghiệm Baobab:
- Tải xuống EN : Chọn gói Baobab từ [trang tải xuống](../nodes/downloads/downloads.md).
- Klaytnscope : https://baobab.scope.klaytn.com
- Ví Klaytn : https://baobab.wallet.klaytn.foundation
- Baobab Faucet : https://baobab.wallet.klaytn.foundation/faucet


## Có SDK Klaytn nào không? Bằng những ngôn ngữ nào? <a id="klaytn-sdks"></a>

SDK Klaytn chính thức được cung cấp bằng ngôn ngữ JavaScript và Java. Tham khảo [caver-js](../references/sdk/caver-js/caver-js.md) và [caver-java](../references/sdk/caver-java/caver-java.md). Chúng tôi luôn hoan ngênh mọi đóng góp của cộng đồng để cung cấp [các API của Klaytn](../references/json-rpc/json-rpc.md) bằng các ngôn ngữ khác.

Để tìm hiểu về cách xây dựng dApp bằng cách sử dụng SDK Klaytn, tham khảo [Tài liệu hướng dẫn](../build/tutorials/tutorials.md).

Ngoài ra, bạn có thể xem hướng dẫn chuyển đổi [từ web3.js](../references/sdk/caver-js-1.4.1/porting-from-web3.js.md) và [từ web3j](../references/sdk/caver-java-1.4.0/porting-from-web3j.md). Bởi vì cú pháp của caver-js và caver-java rất giống với web3.js và web3j, quá trình chuyển đổi rất ít và rất dễ thực hiện. Tuy nhiên, bạn không thể sử dụng web3.js hoặc web3j để đưa ra yêu cầu đối với Klaytn.


## Tôi có phải cài đặt và chạy Endpoint Node (EN) để sử dụng Klaytn không? <a id="must-i-install-and-run-en"></a>

Có và Không. Endpoint Node xác thực các khối và cung cấp các API RPC ra bên ngoài. Endpoint Node luôn cần thiết cho ứng dụng của bạn để tương tác với mạng lưới Klaytn. Nếu bạn chỉ muốn thử API Klaytn, bạn có thể thử [KAS (Dịch vụ API của Klaytn)](https://www.klaytnapi.com). KAS cung cấp dịch vụ API Nút Klaytn, cho phép tiếp cận các API RPC của các mạng lưới Klaytn (cả Baobab và Cypress), cùng các dịch vụ API hữu ích khác. Lưu ý rằng KAS cung cấp các yêu cầu API miễn phí sau khi người dùng đăng ký. Để biết các gói giá, vui lòng tham khảo trang [Bảng giá KAS](https://www.klaytnapi.com/landing/pricing).


## Tôi đang chạy EN và quá trình đồng bộ hóa dữ liệu nút diễn ra quá chậm. <a id="node-data-sync-is-too-slow"></a>

Trước tiên, kiểm tra xem tiêu chuẩn kỹ thuật HW của bạn có đáp ứng [yêu cầu của hệ thống](../nodes/endpoint-node/system-requirements.md) hay không.

Kiểm tra tính năng [đồng bộ nhanh](../nodes/endpoint-node/install-endpoint-nodes.md#fast-sync-optional). Klaytn công bố dữ liệu chuỗi hàng ngày. Dữ liệu chuỗi là một bản thu thập cơ sở dữ liệu lưu trữ tất cả các khối được tạo từ khối khởi tạo cho đến hiện tại. Tải xuống dữ liệu chuỗi mới nhất để đồng bộ nhanh.


## Tôi có thể sử dụng hợp đồng ERC-20 và ERC-721 trên Klaytn không? <a id="can-i-use-erc-20-and-erc-721"></a>

Có. Klaytn hỗ trợ Solidity, đây là ngôn ngữ hợp đồng thông minh. Có thể triển khai và thực thi [ERC-20](../build/smart-contracts/samples/erc-20.md) và [ERC-721](../build/smart-contracts/samples/erc-721.md) được viết bằng ngôn ngữ Solidity cho Etherem trên Klaytn.

Có thể xác định thêm các tiêu chuẩn token cụ thể cho Klaytn. Theo dõi [KIP (Đề xuất cải tiến Klaytn)](http://kips.klaytn.foundation) và tham gia thảo luận.


## Tôi có thể sử dụng Truffle để phát triển hợp đồng thông minh trên Klaytn không? <a id="can-i-use-truffle"></a>

Có. Có thể sử dụng Truffle để phát triển hợp đồng thông minh trên Klaytn với [truffle-hdwallet-provider-klaytn](https://www.npmjs.com/package/truffle-hdwallet-provider-klaytn). Xem [Truffle](../build/smart-contracts/ide-and-tools/truffle.md) và làm theo hướng dẫn cấu hình.

Nếu bạn mới bắt đầu sử dụng Truffle, hãy xem [Hướng dẫn kiểm thử](../build/smart-contracts/testing-guide.md) và [Hướng dẫn triển khai](../build/smart-contracts/deploy/deploy.md) để có cái nhìn tổng quan về những gì bạn có thể làm với Truffle.


## Tôi có thể lấy ví tiện ích của trình duyệt giống như Metamask ở đâu? <a id="where-can-i-get-a-browser-extension-wallet"></a>

[Kaikas](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=en) - ví tiện ích của trình duyệt web của Klaytn. Kaikas là ví không lưu ký, cho phép bạn thực hiện giao dịch KLAY và tạo tài khoản.



## Tại sao địa chỉ tài khoản người trả phí của tôi không được lấy từ khóa được cung cấp? <a id="account-address-is-not-derived-from-the-key"></a>

Trong Klaytn, [địa chỉ tài khoản có thể được tách riêng khỏi cặp khóa](../learn/accounts.md#decoupling-key-pairs-from-addresses).

Các trường hợp sử dụng phổ biến như dưới đây.
- Chủ tài khoản muốn thay đổi khóa vì lý do bảo mật.
- Tài khoản có một hệ thống khóa đa chữ ký có trọng số hoặc khóa theo vai trò, cho phép sử dụng nhiều cặp khóa để kiểm soát tài khoản.

Tài khoản người trả phí thường có [khóa theo vai trò](../learn/accounts.md#accountkeyrolebased). Trong hầu hết các trường hợp, địa chỉ tài khoản không được lấy từ khóa RoleFeePayer.


## Tôi có thể tìm các ví dụ hoàn chỉnh về ủy thác phí ở đâu? <a id="fee-delegation-samples"></a>

Hãy xem phần [ví dụ về ủy thác phí](../build/tutorials/fee-delegation-example.md) để có một đoạn mã hoàn chỉnh về chuyển giá trị.

Xem [đoạn mã mẫu JavaScript](https://gist.github.com/w3kim/64a3cf5da58250474f046d4dd7f85cc8) để triển khai một hợp đồng với tính năng ủy thác phí. Lưu ý rằng bạn không thể sử dụng Truffle để triển khai hợp đồng với tính năng ủy thác phí.

Tham khảo [Gửi giao dịch với nhiều người ký](../references/sdk/caver-js-1.4.1/get-started-1.4.1.md#sending-a-transaction-with-multiple-signer) để hiểu rõ về hai cách thức thu thập chữ ký khác nhau. Các API caver-js liên quan như dưới đây. Hãy xem ví dụ về mã trong phần mô tả API.
- [caver.klay.tài khoảns.signTransaction](../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#signtransaction)
- [caver.klay.tài khoảns.feePayerSignTransaction](../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#feepayersigntransaction)
- [caver.klay.tài khoảns.combinesignatures](../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#combinesignatures)
- [caver.klay.sendSignedTransaction](../references/sdk/caver-js-1.4.1/api/caver.klay/transaction/transaction.md#sendsignedtransaction)
