# Phí giao dịch

Phí giao dịch của một giao dịch được tính như sau:

```text
Phí giao dịch := (Lượng Gas đã dùng) x (Giá Gas)
```

Có một sự tương đồng dễ hiểu ở đây, giả sử bạn đang đổ xăng ở một trạm xăng. Giá xăng được nhà máy quyết định hàng ngày, và hôm nay giá xăng là $2. Nếu bạn đổ 15 lít xăng thì bạn sẽ cần phải trả $30 = 15L x $2/1L và $30 đó sẽ được thanh toán từ tài khoản ngân hàng của bạn. Ngoài ra, thông tin giao dịch sẽ được lưu lại ở sổ kế toán.

Phí giao dịch hoạt động tương tự như trên. Mạng lưới sẽ xác định phí Gas của mỗi block (khối). Giả sử phí Gas hiện tại là 30 ston cho mỗi block. Nếu mỗi giao dịch được gửi `từ` tài khoản bị tính phí 21000 Gas thì 630000 ston = (21000 Gas \* 30 ston) sẽ được thanh toán `từ` tài khoản. Ngoài ra, giao dịch sẽ được ghi lại trong block (khối) và nó sẽ được áp dụng ở trạng thái của tất cả các nút blockchain (chuỗi khối).

Tóm lại, phí giao dịch đã tính này sẽ được trừ vào tài khoản của người gửi hoặc người trả phí. Tuy nhiên, phí giao dịch chỉ có thể được khấu trừ khỏi số dư nếu giao dịch được tạo bởi klay_sendTransaction/eth_sendTransaction. Bởi vì các giao dịch khác không thể thay đổi trạng thái vì chúng không thể được đưa vào block (khối). Chúng chỉ là một mô phỏng theo một cách nào đó.

Đây là lời giải thích tổng quát về phí giao dịch và từ đây, chúng tôi sẽ đưa ra lời giải thích chi tiết về cách xác định phí Gas và cách tính số Gas.

## Tổng quan về xăng <a id="gas-overview"></a>

Mọi hành động thay đổi trạng thái của blockchain đều cần có gas. Trong khi xử lý các giao dịch trong một block (khối), chẳng hạn như gửi KLAY, sử dụng tokens KIP-7 hoặc thực hiện hợp đồng, người dùng phải trả tiền cho việc tính toán và sử dụng bộ nhớ. Số tiền thanh toán được quyết định bởi lượng `gas` cần thiết.

Lượng `gas` cần thiết được tính bằng cách cộng hai loại gas dưới đây;

- `IntrinsicGas` (Khí nội tại) là một loại khí được tính phí tĩnh dự trên cấu hình của giao dịch, chẳng hạn như kích thước dữ liệu của giao dịch. Để biết thêm chi tiết, vui lòng tham khảo [Intrinsic Gas](intrinsic-gas.md).
- `ExecutionGas` (Khí thực thi) là một loại gas được tính toán một cách linh hoạt hơn khi thực hiện hợp đồng. Để biết thêm chi tiết, vui lòng tham khảo [Execution Gas](execution-gas.md).

## Tổng quan về giá Gas <a id="gas-price-overview"></a>

Không giống như ethereum, Klaytn sử dụng giá gas cố định, ban đầu được gọi là `unitPrice`. Tuy nhiên, kể từ đợt hardfork magma, Klaytn bắt đầu sử dụng giá gas động, khái niệm này mới được thiết kế lại bằng cách sửa đổi basefee (phí tối thiểu) của Ethereum, còn được gọi là `Effective Gas Price (Giá Gas hiệu quả)`. Vì đã có nhiều thay đổi về giá gas nên có thể khá khó hiểu về giá trị đặt cho gasPrice. Vì vậy, chúng tôi đã thực hiện hướng dẫn về cách đặt giá gas bên dưới.

| Mạng lưới | Trước BaseFee                                                                                                                                                                                              | Sau BaseFee                                                                                                                                                                                                                                                                                                                                     |
| :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| klaytn    | tham số tx gasPrice: do mạng lưới xác định. phải được đặt là `unitPrice` <br/> <br/> gasPrice: dùng tham số tx gasPrice                                    | tham số tx gasPrice: do người dùng xác định. Nó có nghĩa là mức giá cao nhất bạn có thể trả.  (ví dụ suggestGasPrice = 2\*latestBlock.baseFee ) <br/> <br/> gasPrice: gasPrice động, `baseFee`, được xác định bởi mạng lưới. |
| Ethereum  | tham số tx gasPrice: do người dùng xác định. Nó có nghĩa là mức giá cao nhất bạn có thể trả. <br/> <br/>gasPrice: dùng tham số tx gasPrice | tham số tx gasPrice: do người dùng xác định. Nó có nghĩa là mức giá cao nhất bạn có thể trả. <br/> <br/> gasPrice: gasPrice động, `baseFee+tip`, được xác định bởi mạng lưới.                                                                                   |

## Cơ chế phí Gas động <a id="dynamic-gas-fee-mechanism"></a>

Kể từ hard fork magma, cơ chế phí gas động đã thay thế chính sách phí cố định hiện có. Chính sách phí gas động cung cấp dịch vụ ổn định cho người dùng bằng cách ngăn chặn việc lạm dụng mạng lưới và sử dụng quá mức dung lượng lưu trữ. Phí gas thay đổi tùy theo tình hình mạng lưới. Đây là bảy thông số ảnh hưởng đến `base fee (phí gas)`:

1. PREVIOUS_BASE_FEE: Base fee (phí tối thiểu) của block trước đó
2. GAS_USED_FOR_THE_PREVIOUS_BLOCK: Gas được sử dụng để xử lý tất cả các giao dịch của block trước đó
3. GAS_TARGET: Lượng gas quyết định mức tăng hoặc giảm base fee (hiện tại là 30 triệu)
4. MAX_BLOCK_GAS_USED_FOR_BASE_FEE: Giới hạn block gas ngầm định để thực thi được tỷ lệ thay đổi tối đa basefee (hiện tại là 60 triệu)
5. BASE_FEE_DELTA_REDUCING_DENOMINATOR: Giá trị để đặt basefee tối đa thay đổi thành 5% mỗi block (hiện tại là 20, có thể được quản trị thay đổi sau)
6. UPPER_BOUND_BASE_FEE: Giá trị tối đa của basefee (hiện tại là 750 ston, có thể được quản trị thay đổi sau)
7. LOWER_BOUND_BASE_FEE: Giá trị tối thiểu của basefee (hiện tại là 25 ston, có thể được quản trị thay đổi sau)

## Base Fee (Phí tối thiểu) <a id="base-fee"></a>

Ý tưởng cơ bản của thuật toán này là `base fee (phí tối thiểu)` sẽ tăng lên nếu lượng gas được sử dụng vượt quá lượng gas cơ bản và ngược lại. Nó liên quan chặt chẽ đến số lượng giao dịch trong mạng lưới và gas được sử dụng trong quy trình. Có giới hạn trên và dưới cho `base fee` để ngăn phí tăng hoặc giảm vô thời hạn. Ngoài ra còn có giới hạn gas và giá trị điều chỉnh biến động để ngăn chặn những thay đổi đột ngột của `base fee`. Các giá trị này có thể được thay đổi bởi quản trị.

```text
(BASE_FEE_CHANGE_RATE) = (GAS_USED_FOR_THE_PREVIOUS_BLOCK - GAS_TARGET)
(ADJUSTED_BASE_FEE_CHANGE_RATE) = (BASE_FEE_CHANGE_RATE) / (GAS_TARGET) / (BASE_FEE_DELTA_REDUCING_DENOMINATOR)
(BASE_FEE_CHANGE_RANGE) = (PREVIOUS_BASE_FEE) * (ADJUSTED_BASE_FEE_CHANGE_RATE)
(BASE_FEE) = (PREVIOUS_BASE_FEE) + (BASE_FEE_CHANGE_RANGE) 
```

`Base fee (phí tối thiểu)` được tính cho mỗi block; có thể có những thay đổi mỗi giây. Các giao dịch từ một block duy nhất sử dụng cùng một khoản `base fee` để tính phí giao dịch. Chỉ những giao dịch có giá gas cao hơn `base fee` của block mới có thể được đưa vào block. Một nửa phí giao dịch cho mỗi block sẽ bị đốt cháy (BURN_RATIO = 0,5, quản trị không thể thay đổi).

> LƯU Ý: Một tính năng quan trọng khiến Klaytn khác biệt với EIP-1559 của Ethereum là nó không có tips (mẹo). Klaytn tuân theo nguyên tắc Đến trước được phục vụ trước (FCFS) cho các giao dịch của mình.
