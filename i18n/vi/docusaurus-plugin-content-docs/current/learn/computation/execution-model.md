# Mô hình thực thi

Trang này mô tả mô hình thực thi, cấu trúc dữ liệu và vòng đời của hợp đồng thông minh Klaytn.

## Mô hình thực thi <a id="execution-model"></a>

Giao dịch có thể được tạo ra bởi các API của nền tảng như được mô tả trong [Chi tiết về API của nền tảng](../../references/json-rpc/json-rpc.md). Các giao dịch này được gửi đến _Consensus Nodes \(CN\)_ để được lưu trữ trong một khối. Các CN kiểm tra xem từng giao dịch nhận được có hợp lệ không. Các giao dịch hợp lệ được lưu trữ trong bể giao dịch; nếu không hợp lệ, chúng sẽ bị loại bỏ. Một CN chọn các giao dịch có thể thực thi được trong khối hiện tại thuộc bể giao dịch của nó, sau đó, thực thi từng giao dịch một.

Để thực thi một giao dịch, người gửi phải trả một khoản KLAY dưới dạng phí giao dịch. Phí giao dịch tính bằng KLAY này được tính toán dựa trên gas và hệ số nhân, _nghĩa là_ đơn giá. Gas là đơn vị tính toán cơ bản. Mỗi hoạt động được thực thi trên một nút Klaytn tiêu thụ một lượng gas được xác định trước. Lượng KLAY chính xác cần dùng cho giao dịch được tính toán theo công thức được minh họa trong [Phí giao dịch](../transaction-fees.md). Giao dịch có thể thất bại nếu người gửi gửi đi một giao dịch mà không kèm theo đủ gas. Một giao dịch cũng có thể thất bại nếu tài khoản của người gửi không có đủ số dư.

Khi một giao dịch được thực thi thành công, nó sẽ được đưa vào khối hiện tại. Một CN thu thập các giao dịch cho đến khi nó đạt đến giới hạn gas cho một khối hoặc giới hạn thời gian thực hiện một khối. Sau đó, CN sẽ tạo ra một khối với các giao dịch này. Bước này bắt buộc phải điền một số trường trong khối. Ví dụ: nó phải tính toán các giá trị hàm băm của giao dịch, biên lai, trạng thái, v.v. Sau khi tất cả các trường bắt buộc đã được hoàn tất, CN tạo ra một hàm băm của khối.

Khi quá trình tạo khối đã hoàn tất, khối sẽ được truyền đến tất cả các CN khác. Tất cả các CN khác đều xác minh khối được truyền và đạt đến sự đồng thuận về kết quả xác minh bằng cách dùng thuật toán đồng thuận BFT. Khi quá trình xác minh hoàn tất thành công bởi phần lớn các CN, khối này sẽ được lưu trữ trong chuỗi khối. Vì thuật toán đồng thuận BFT thỏa mãn thuộc tính hoàn thiện tức thời, khối này là khối được chốt và sẽ không bao giờ bị loại bỏ. Sau khi một khối đã được hoàn thiện, việc thực thi tất cả các giao dịch trong khối đó sẽ được đảm bảo không thể hoàn tác và kết quả thực thi có thể được trả về người gửi nếu có yêu cầu.

### Các hạn chế đối với việc thực thi giao dịch <a id="restrictions-on-transaction-execution"></a>

Các mạng lưới Baobab và Cypress của Klaytn hiện có các hạn chế sau đối với việc thực thi giao dịch:

* Một giao dịch phải đặt giá gas theo [đơn giá](../klaytn-native-coin-klay.md#units-of-klay) của Klaytn, _nghĩa là_ 250 ston.
* Một giao dịch có chi phí thực thi lớn hơn giới hạn chi phí tính toán sẽ bị loại bỏ. Vui lòng tham khảo [chi phí tính toán](./computation-cost.md)

## Cấu trúc dữ liệu <a id="data-structures"></a>

### Tài khoản <a id="account"></a>

Tài khoản trong nền tảng chuỗi khối Klaytn là một cấu trúc dữ liệu chứa thông tin về số dư của một người hoặc một hợp đồng thông minh. Klaytn tái thiết kế mô hình tài khoản của mình để cung cấp DX và UX tốt hơn. Bạn có thể tìm thấy thông tin chi tiết về mô hình tài khoản [tại đây](../accounts.md).

### Giao dịch <a id="transaction"></a>

Một giao dịch trong nền tảng chuỗi khối là một thông điệp mà các nút gửi cho nhau, làm thay đổi trạng thái của chuỗi khối. Klaytn cũng tái thiết kế mô hình giao dịch. Các giao dịch được phân tách thành nhiều loại khác nhau tùy theo mục đích riêng của chúng để tìm ra các cơ hội tối ưu hóa hiệu suất và nhằm hỗ trợ mô hình tài khoản đã được tái thiết kế. Bạn có thể tìm thấy thông tin chi tiết về mô hình giao dịch [tại đây](../transactions/transactions.md).

### Trạng thái <a id="state"></a>

**Trạng thái** của Klaytn là một tập hợp các trạng thái của tài khoản. Trạng thái của các nút trên Klaytn phải giống nhau nếu chúng đã xử lý các khối giống nhau theo cùng thứ tự. Trạng thái thay đổi khi một giao dịch được thực thi trên một nút Klaytn.

Bảng dưới đây cho thấy dữ liệu tài khoản được lưu trữ trong trạng thái.

| Thành phần  | Mô tả                                                                                                                                                                                                |
|:----------- |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| nonce       | Một giá trị số nguyên cho biết số lượng giao dịch được thực thi bởi tài khoản này. Khi gửi đi một giao dịch, số dùng một lần của giao dịch phải bằng số dùng một lần của tài khoản.                  |
| số dư       | Một giá trị số nguyên cho thấy lượng KLAY mà tài khoản này đang có.                                                                                                                                  |
| storageRoot | Hàm băm 256 bit của gốc của Merkle Patricia Trie có chứa các giá trị của tất cả các biến về lưu trữ trong tài khoản.                                                                                 |
| codeHash    | Hàm băm của bytecode của tài khoản.  Giá trị này là bất biến, nghĩa là nó chỉ được đặt khi hợp đồng thông minh được tạo.  Nếu tài khoản là một EOA hoặc EA, giá trị này được đặt thành hàm băm null. |

### Khối <a id="block"></a>

Khối là một yếu tố quan trọng của chuỗi khối Klaytn vì theo đúng nghĩa đen, chuỗi khối được tạo thành bởi một chuỗi gồm nhiều khối. Bảng dưới đây cho thấy các thành phần của một khối.

| Thành phần       | Mô tả                                                                                                                   |
|:---------------- |:----------------------------------------------------------------------------------------------------------------------- |
| baseFeePerGas    | Phí cơ bản trên mỗi đơn vị gas. Giá trị này chỉ được trả về khi EthTxTypeCompatibleBlock được kích hoạt cho số khối đó. |
| blockScore       | Độ khó trước đây. Giá trị luôn là 1 trong công cụ đồng thuận BFT                                                        |
| extraData        | Trường "dữ liệu bổ sung" của khối này.                                                                                  |
| gasUsed          | Tổng số gas đã được sử dụng bởi tất cả các giao dịch trong khối này.                                                    |
| governanceData   | Cấu hình quản trị được mã hóa RLP                                                                                       |
| nhật kýBloom     | Bộ lọc Bloom cho các bản ghi của khối. `null` khi đó là khối đang chờ xử lý.                                            |
| number           | Số khối. `null` khi đó là khối đang chờ xử lý.                                                                          |
| parentHash       | Hàm băm của khối cha của một khối.                                                                                      |
| người đề xuất    | Địa chỉ của người đề xuất khối.                                                                                         |
| receiptsRoot     | Gốc của trie biên lai giao dịch của khối.                                                                               |
| phần thưởng      | Địa chỉ nhận phần thưởng khối.                                                                                          |
| size             | Giá trị nguyên chỉ kích thước của khối này theo byte.                                                                   |
| stateRoot        | Gốc của trie trạng thái cuối của khối.                                                                                  |
| totalBlockScore  | Tổng số blockScore bằng giá trị nguyên của chuỗi cho đến khối này.                                                      |
| transactionsRoot | Gốc của trie giao dịch trong khối.                                                                                      |
| dấu thời gian    | Dấu thời gian Unix khi khối được đối chiếu.                                                                             |
| timestampFoS     | Phần giây của dấu thời gian khi khối được đối chiếu.                                                                    |
| giao dịch        | Mảng đối tượng giao dịch hoặc hàm băm giao dịch 32 byte tùy thuộc vào tham số đã cho gần nhất.                          |
| voteData         | Phiếu bầu quản trị được mã hóa RLP của người đề xuất                                                                    |

## Hợp đồng thông minh <a id="smart-contract"></a>

Một _hợp đồng thông minh_ bao gồm một tập hợp các mã \(hàm\) và dữ liệu \(trạng thái\) nằm tại một địa chỉ cụ thể trên chuỗi khối Klaytn. Các tài khoản hợp đồng có thể truyền thông điệp cho nhau cũng như thực hiện tính toán tương đương với Turing Complete. Các hợp đồng tồn tại trên chuỗi khối dưới định dạng nhị phân của riêng Klaytn. Hiện tại, Klaytn hỗ trợ một định dạng nhị phân --bytecode của Máy ảo Ethereum \(EVM)\; tuy nhiên, các định dạng khác cũng sẽ được hỗ trợ trong tương lai.

### Tạo hợp đồng thông minh <a id="creating-smart-contracts"></a>

Một hợp đồng thông minh có thể được tạo ra trong chuỗi khối Klaytn bằng cách gửi một giao dịch đến một địa chỉ trống với dữ liệu ở dạng nhị phân. Dữ liệu nhị phân có thể có nhiều định dạng; tuy nhiên, hiện tại Klaytn hỗ trợ một định dạng nhị phân là bytecode EVM. Bạn cần lưu ý rằng giao dịch này bắt buộc phải trả phí thực thi. Số dư tài khoản của tài khoản người gửi sẽ bị khấu trừ dựa trên mô hình phí giao dịch sau khi giao dịch được lưu trữ vào một khối. Sau một thời gian, giao dịch sẽ xuất hiện trong một khối, điều này xác nhận rằng trạng thái mà nó cần có đã đạt được sự đồng thuận. Tại thời điểm này, hợp đồng thông minh đã tồn tại trong chuỗi khối Klaytn. As [eip-3541](https://eips.ethereum.org/EIPS/eip-3541) is brought at the Kore hardfork, deployment of a new code starting with the 0xEF byte is not allowed.

### Thực thi hợp đồng thông minh <a id="executing-smart-contracts"></a>

Hàm của một hợp đồng thông minh có thể được gọi và thực thi bằng cách gửi một giao dịch đến hợp đồng thông minh hoặc bằng cách gọi hàm trong nút theo cách cục bộ. Khi một hàm được gọi theo cách gửi một giao dịch, hàm này sẽ được thực thi bằng cách xử lý một giao dịch. Cách này cần có chi phí tính bằng KLAY để gửi giao dịch, và cuộc gọi sẽ được ghi lại vĩnh viễn trên chuỗi khối. Giá trị trả về của các cuộc gọi được thực hiện theo cách này chính là hàm băm của giao dịch. Khi hàm được gọi cục bộ, nó sẽ được thực thi cục bộ trong Máy ảo Klaytn \(KLVM\) và cuộc gọi này sẽ trả về giá trị trả về của hàm. Các cuộc gọi được thực hiện theo cách này sẽ không được ghi lại trên chuỗi khối; vì thế, chúng không thể thay đổi trạng thái nội bộ của hợp đồng. Loại cuộc gọi này được đặt tên là cuộc gọi hàm hằng. Các cuộc gọi được thực hiện bằng cách này không tốn KLAY. Các cuộc gọi hàm hằng nên được sử dụng khi mối quan tâm duy nhất là giá trị trả về, tuy nhiên, giao dịch nên được sử dụng khi mối quan tâm là các phản ứng phụ đối với trạng thái của hợp đồng.

### Vô hiệu hóa hợp đồng thông minh <a id="disabling-smart-contracts"></a>

Vì hợp đồng thông minh tồn tại trong chuỗi khối Klaytn, chúng không thể bị xóa mà chỉ có thể bị vô hiệu hóa. Hiện tại, Klaytn đã áp dụng quy trình tương tự để vô hiệu hóa hợp đồng thông minh Klaytn, giống cách vô hiệu hóa hợp đồng thông minh trong Ethereum. Ví dụ: hợp đồng thông minh Klaytn cho KLVM có thể bị vô hiệu hóa bằng cách dùng cuộc gọi [`selfdestruct(address recipient)`](https://solidity.readthedocs.io/en/v0.5.6/introduction-to-smart-contracts.html#self-destruct) bằng ngôn ngữ Solidity \(hoặc mã vận hành KLVM `SELFDESTRUCT`\). Đội ngũ Klaytn cũng sẽ cung cấp các phương pháp để vô hiệu hóa hợp đồng thông minh dành cho các môi trường thực thi khác.

### Nâng cấp hợp đồng thông minh <a id="upgrading-smart-contracts"></a>

Klaytn sẽ cung cấp các phương pháp để nâng cấp một hợp đồng thông minh đã triển khai để giải quyết vấn đề về trải nghiệm bất tiện của người dùng với các chuỗi khối hiện có. Ví dụ: các dịch vụ đã triển khai trên chuỗi khối rất khó nâng cấp. Klaytn sẽ cung cấp các khuôn khổ và thư viện hợp đồng thông minh để cho phép các nhà cung cấp dịch vụ \(SP\) nâng cấp các dịch vụ đã triển khai và di chuyển thông tin dịch vụ. Klaytn sẽ cung cấp tính năng này với sự cẩn trọng bằng cách xem xét các yêu cầu sau đây.

* Chỉ những tài khoản được cấp phép hoặc người sở hữu hợp đồng thông minh mới có thể nâng cấp hợp đồng thông minh.
* Những hợp đồng thông minh đã được nâng cấp sẽ có thể sửa đổi dữ liệu sẵn có vốn được hợp đồng thông minh cũ lưu giữ.
* Các hợp đồng thông minh khác có liên quan đến những hợp đồng thông minh cũ sẽ có thể quyết định về việc có dùng các phiên bản mới hơn, đã nâng cấp của những hợp đồng thông minh đó hay không.

