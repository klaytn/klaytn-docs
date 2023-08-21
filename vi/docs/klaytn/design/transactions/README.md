# Giao dịch <a id="transactions"></a>

## Tổng quan về giao dịch <a id="transactions-overview"></a>

Một giao dịch trong nền tảng chuỗi khối là một thông điệp mà các nút gửi cho nhau, làm thay đổi trạng thái của chuỗi khối. Ví dụ: khi thực thi một giao dịch gửi 10 KLAY từ tài khoản của Alice đến tài khoản của Bob, số dư của Alice sẽ giảm 10 KLAY và số dư của Bob tăng 10 KLAY. Lưu ý rằng một giao dịch không thể xen kẽ với một giao dịch khác vì giao dịch là một hoạt động nguyên tử. Một giao dịch chuỗi khối điển hình có các thành phần như dưới đây:

| Thành phần | Mô tả                                                                                                                                                                                                                                                                                                                                                      |
|:---------- |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| giá trị    | Số lượng KLAY tính bằng `peb` sẽ được chuyển.                                                                                                                                                                                                                                                                                                              |
| đến        | Địa chỉ tài khoản sẽ nhận giá trị được chuyển.                                                                                                                                                                                                                                                                                                             |
| nhập       | Dữ liệu được gắn kèm giao dịch, dùng để thực thi giao dịch.                                                                                                                                                                                                                                                                                                |
| v, r, s    | Chữ ký mật mã được tạo bởi người gửi để cho phép người nhận lấy được địa chỉ của người gửi.                                                                                                                                                                                                                                                                |
| nonce      | Giá trị dùng để định danh duy nhất cho một giao dịch của người gửi. Nếu hai giao dịch có cùng một giá trị số dùng một lần do người gửi tạo ra, chỉ có một giao dịch sẽ được thực thi.                                                                                                                                                                      |
| gas        | Giá trị phí giao dịch tối đa mà giao dịch được phép sử dụng.                                                                                                                                                                                                                                                                                               |
| giá gas    | Hệ số nhân để tính toán số lượng token mà người gửi sẽ thanh toán. Lượng token mà người gửi sẽ thanh toán được tính theo công thức `gas` \* `gasPrice`. Ví dụ: Người gửi sẽ thanh toán khoản phí giao dịch là 10 KLAY nếu gas bằng 10 và gasPrice là 10^18. Đơn vị của KLAY được mô tả [tại đây](../../design/klaytn-native-coin-klay.md#units-of-klay). |

## Các giao dịch của Klaytn <a id="klaytn-transactions"></a>

Khi các nền tảng chuỗi khối thông thường cung cấp một loại giao dịch duy nhất, Klaytn cung cấp nhiều loại giao dịch, thúc đẩy các giao dịch nhờ những khả năng mới và tối ưu hóa vùng phủ bộ nhớ và hiệu suất.

### Xác thực chữ ký của giao dịch <a id="signature-validation-of-transactions"></a>

Trong các nền tảng chuỗi khối thông thường, địa chỉ được lấy khóa công khai, sau đó khóa này được lấy lại từ chữ ký giao dịch. Điều này chỉ có thể xảy ra nếu địa chỉ và cặp khóa được gắn chặt chẽ với nhau.

Vì trong Klaytn, một cặp khóa được tách khỏi địa chỉ, địa chỉ của người gửi không thể lấy được bằng cách sử dụng chữ ký giao dịch. Đây là lí do khiến các loại giao dịch của Klaytn, trừ TxTypeLegacyTransaction có trường `from`. Trong Klaytn, để xác thực một giao dịch, [AccountKey](../tài khoảns.md#tài khoản-key) của `from` sẽ được lấy, và khóa lấy được sẽ dùng để xác thực chữ ký của giao dịch.

### Ủy thác phí <a id="fee-delegation"></a>

Để mang lại cho các doanh nghiệp sự linh hoạt cần thiết trong thiết kế mô hình kinh doanh của họ, Klaytn cung cấp một số phiên bản ủy thác phí dành cho các loại giao dịch cơ bản. Những biến số này cho phép các nhà cung cấp dịch vụ trợ cấp cho các hoạt động của người dùng cuối bằng cách thanh toán phí giao dịch cho người dùng. Việc trợ cấp phí giao dịch có thể được diễn giải chi tiết hơn bằng cách sử dụng các giao dịch có tham số Tỷ lệ, cho phép các nhà cung cấp dịch vụ chỉ định tỷ lệ phần trăm phí mà họ sẽ chi trả. Các giao dịch ủy thác phí cần ít nhất hai chữ ký: một chữ ký từ người gửi và một chữ ký từ người trả phí.

### SenderTxHash <a id="sendertxhash"></a>

SenderTxHash là hàm băm của một giao dịch không chứa địa chỉ và chữ ký của người trả phí. Hàm băm giao dịch của một giao dịch có phí ủy thác chưa được xác định cho đến khi người trả phí ký giao dịch. Để theo dõi một giao dịch có phí ủy thác, người gửi phải gửi hàm băm giao dịch lấy từ giao dịch hoàn thiện, trong đó có chứa các chữ ký từ cả người gửi và người trả phí. Bởi vì người gửi rất khó lấy được hàm băm giao dịch, Klaytn cung cấp SenderTxHash và hàm băm giao dịch. Để tìm giao dịch có phí ủy thác hoàn thiện trong mạng lưới Klaytn, người gửi tạo một SenderTxHash và yêu cầu một đối tượng giao dịch qua [klay_getTransactionBySenderTxHash](../../../bapp/json-rpc/api-references/klay/transaction.md#klay_gettransactionbysendertxhash). Cách để lấy SenderTxHash tùy thuộc vào từng loại giao dịch, thông tin có trong phần mô tả của từng loại giao dịch.

Từng loại giao dịch được mô tả chi tiết:

|                        | Cơ bản                                                                | Ủy thác phí                                                                                            | Ủy thác phí một phần                                                                                                             |
|:---------------------- |:--------------------------------------------------------------------- |:------------------------------------------------------------------------------------------------------ |:-------------------------------------------------------------------------------------------------------------------------------- |
| Legacy                 | [TxTypeLegacyTransaction](basic.md#txtypelegacytransaction)           | Không có                                                                                               | Không có                                                                                                                         |
| ValueTransfer          | [TxTypeValueTransfer](basic.md#txtypevaluetransfer)                   | [TxTypeFeeDelegatedValueTransfer](fee-delegation.md#txtypefeedelegatedvaluetransfer)                   | [TxTypeFeeDelegatedValueTransferWithRatio](partial-fee-delegation.md#txtypefeedelegatedvaluetransferwithratio)                   |
| ValueTransferMemo      | [TxTypeValueTransferMemo](basic.md#txtypevaluetransfermemo)           | [TxTypeFeeDelegatedValueTransferMemo](fee-delegation.md#txtypefeedelegatedvaluetransfermemo)           | [TxTypeFeeDelegatedValueTransferMemoWithRatio](partial-fee-delegation.md#txtypefeedelegatedvaluetransfermemowithratio)           |
| SmartContractDeploy    | [TxTypeSmartContractDeploy](basic.md#txtypesmartcontractdeploy)       | [TxTypeFeeDelegatedSmartContractDeploy](fee-delegation.md#txtypefeedelegatedsmartcontractdeploy)       | [TxTypeFeeDelegatedSmartContractDeployWithRatio](partial-fee-delegation.md#txtypefeedelegatedsmartcontractdeploywithratio)       |
| SmartContractExecution | [TxTypeSmartContractExecution](basic.md#txtypesmartcontractexecution) | [TxTypeFeeDelegatedSmartContractExecution](fee-delegation.md#txtypefeedelegatedsmartcontractexecution) | [TxTypeFeeDelegatedSmartContractExecutionWithRatio](partial-fee-delegation.md#txtypefeedelegatedsmartcontractexecutionwithratio) |
| AccountUpdate          | [TxTypeAccountUpdate](basic.md#txtypeaccountupdate)                   | [TxTypeFeeDelegatedAccountUpdate](fee-delegation.md#txtypefeedelegatedaccountupdate)                   | [TxTypeFeeDelegatedAccountUpdateWithRatio](partial-fee-delegation.md#txtypefeedelegatedaccountupdatewithratio)                   |
| Cancel                 | [TxTypeCancel](basic.md#txtypecancel)                                 | [TxTypeFeeDelegatedCancel](fee-delegation.md#txtypefeedelegatedcancel)                                 | [TxTypeFeeDelegatedCancelWithRatio](partial-fee-delegation.md#txtypefeedelegatedcancelwithratio)                                 |
| ChainDataAnchoring     | [TxTypeChainDataAnchoring](basic.md#txtypechaindataanchoring)         | [TxTypeFeeDelegatedChainDataAnchoring](fee-delegation.md#txtypefeedelegatedchaindataanchoring)         | [TxTypeFeeDelegatedChainDataAnchoringWithRatio](partial-fee-delegation.md#txtypefeedelegatedchaindataanchoringwithratio)         |

