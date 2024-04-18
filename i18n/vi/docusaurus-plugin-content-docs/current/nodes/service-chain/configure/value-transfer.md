# Giá trị chuyển nhượng

Như đã giải thích trong phần thiết kế Klaytn, Chuỗi dịch vụ hỗ trợ chuyển giá trị (KLAY, ERC-20 và ERC-721) giữa chuỗi mẹ & chuỗi con.
Trang này hiển thị cách bật tính năng chuyển giá trị trong SCN.

Sau khi thiết lập EN và SCN, quy trình sau đây là bắt buộc để có thể chuyển giá trị giữa các chuỗi.

1. Kiểm tra địa chỉ của các tài khoản người vận hành cầu nối và thêm KLAY vào tài khoản người vận hành cầu nối.
2. Triển khai hợp đồng cầu nối cho chuỗi mẹ/con.
3. Triển khai hợp đồng token (ERC-20 or 721) cho chuỗi mẹ/con. (Nếu bạn chỉ cần chuyển KLAY, bạn có thể bỏ qua bước 3 & 4.)
4. Đăng ký hợp đồng token với hợp đồng cầu nối trên chuỗi mẹ/con.
5. Đặt mua hợp đồng cầu nối cho chuỗi mẹ/con.

Trước khi làm theo các bước này, chúng ta hãy xem kiến trúc hệ thống cấp cao để hiểu cơ chế đằng sau đó.

## Kiến trúc hệ thống <a id="system-architecture"></a>

Hình 1 cho thấy kiến trúc hệ thống của Chuỗi dịch vụ với các hợp đồng cầu nối/token và các nút cầu nối.

Các hợp đồng bên dưới giao tiếp với nhau thông qua cầu nối chính/cầu nối con để xử lý các yêu cầu chuyển giá trị của người dùng.

- Hợp đồng cầu nối
- Hợp đồng ERC-20 (nếu cần)
- Hợp đồng ERC-721 (nếu cần)

![Hình 1. Kiến trúc Chuỗi dịch vụ](/img/nodes/sc_arch.png)

## Tài khoản người vận hành cầu nối <a id="bridge-operator-account"></a>

Đối với ServiceChain, có hai tài khoản người vận hành: tài khoản người vận hành cầu nối chuỗi mẹ, tài khoản người vận hành cầu nối chuỗi dịch vụ. Mỗi tài khoản người vận hành được sử dụng để ký kết các giao dịch.
Nếu giao dịch chuyển giá trị sang chuỗi mẹ, tài khoản người vận hành cầu nối chuỗi mẹ sẽ ký giao dịch. Nếu giao dịch chuyển giá trị sang chuỗi con, tài khoản người vận hành cầu nối chuỗi con sẽ được sử dụng.
Nếu người dùng gửi giao dịch "yêu cầu chuyển giá trị", cầu nối con sẽ tạo giao dịch "xử lý chuyển giá trị" được ký bởi tài khoản người vận hành cầu nối.
Do đó, người vận hành cầu nối chuỗi mẹ cần có đủ số dư KLAY để trả phí giao dịch cho chuỗi mẹ.
Nếu giá gas của chuỗi dịch vụ được đặt khác không, người vận hành cầu nối chuỗi dịch vụ cũng phải có KLAY trong số dư của mình.

### Tập tin mật khẩu và lưu trữ khóa <a id="keystore-and-password-file"></a>

Khi SCN được khởi động, các tập tin mật khẩu và lưu trữ khóa cho người vận hành mẹ/con sẽ tự động được tạo nếu khóa của chúng không tồn tại.
Nếu bạn muốn sử dụng một tài khoản cụ thể làm người vận hành, bạn có thể cung cấp khóa. Đặt các tập tin bên dưới vào đường dẫn được chỉ định trước khi khởi động SCN.
Tập tin mật khẩu phải có chuỗi mật khẩu của tập tin lưu trữ khóa.
Tên của tập tin mật khẩu phải có địa chỉ tài khoản của tập tin lưu trữ khóa tương ứng.

**tập tin**

- tập tin lưu trữ khóa : `UTC--2019-10-21T04-05-41.493850000Z--2ed72a9d7fe5da7672fd21567e07302431649b0b`
- tập tin mật khẩu : `0x2eD72a9D7fe5da7672fD21567e07302431649B0B`

**đường dẫn tập tin**

- Người vận hành cầu nối chuỗi mẹ : $datadir/parent_bridge_tài khoản
- Người vận hành cầu nối chuỗi con : $datadir/child_bridge_tài khoản

```javascript
> pwd
/$dataDIR/child_bridge_account

> ls
0x2eD72a9D7fe5da7672fD21567e07302431649B0B
UTC--2019-10-21T04-05-41.493850000Z--2ed72a9d7fe5da7672fd21567e07302431649b0b

> cat 0x2eD72a9D7fe5da7672fD21567e07302431649B0B
%S~f5qqM38cB47jL%

> cat UTC--2019-10-21T04-05-41.493850000Z--2ed72a9d7fe5da7672fd21567e07302431649b0b
{"address":"2ed72a9d7fe5da7672fd21567e07302431649b0b","crypto":{"cipher":"aes-128-ctr","ciphertext":"6486509e8158bf4984608cbc5562cf2c9a27cd988a98e543731b39251144e633","cipherparams":{"iv":"96d7e5b6a936278c0797faae6cb3d903"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"8928ba41b8228af19390ec881c51452fa3ea973ad2c253ca0f5bc9197a8b24c4"},"mac":"9c8ec63694c20a473e0ea33840e7d16e9f1a20afc52b3244b703a3ac0a66cfa3"},"id":"9ae10527-7fd3-4aae-a4eb-316af211494e","version":3}
```

### Kiểm tra địa chỉ người vận hành cầu nối <a id="check-bridge-operator-addresses"></a>

Nếu bạn chạy SCN thành công, bạn có thể kiểm tra địa chỉ người vận hành cầu nối chuỗi mẹ/con bằng API RPC như sau.

```
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0

> subbridge.parentOperator
"0xA057995175B93Ee0D1bdfA54f078Ad0F0116130b"
> subbridge.childOperator
"0x5C1C757a6Cb6c6FcEFE398674D8209FDA2A74Df4"
```

You can refer to the [subbridge API](../../../references/json-rpc/subbridge/parent-operator) for more details.

### Gửi KLAY đến Người vận hành cầu nối <a id="send-klay-to-bridge-operators"></a>

Giống như việc neo, người vận hành cầu nối chuỗi mẹ cần KLAY để thực hiện giao dịch chuyển giá trị.
Nếu giá gas của chuỗi dịch vụ được đặt khác không, người vận hành cầu nối chuỗi dịch vụ cũng phải có KLAY trong số dư của mình.

Sau khi nạp tiền vào tài khoản người vận hành, bạn có thể kiểm tra số dư như bên dưới.

**Người vận hành cầu nối chuỗi mẹ**

```
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

 instance: Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> subbridge.parentOperatorBalance
1e+50
```

**Người vận hành cầu nối chuỗi con**

```
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

 instance: Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> subbridge.childOperatorBalance
1e+50
```

## Hợp đồng cầu nối <a id="bridge-contract"></a>

Đối với việc chuyển giá trị chuỗi chéo, nên triển khai một hợp đồng cầu nối cho các chuỗi mẹ/con.
Người dùng có thể yêu cầu chuyển KLAY sang hợp đồng cầu nối để gửi KLAY của họ sang chuỗi khác.
Ngoài ra, nếu hợp đồng token được đăng ký trong hợp đồng cầu nối, hợp đồng cầu nối có thể xử lý việc chuyển token giữa chuỗi mẹ và chuỗi con.

### Triển khai <a id="deployment"></a>

Cầu nối con cung cấp API triển khai hợp đồng cầu nối. Bạn có thể triển khai các hợp đồng cầu nối cho cả hai chuỗi bằng một lệnh gọi RPC như bên dưới.
Trước khi làm vậy, bạn cần kết nối cầu nối chính và cầu nối con. Vui lòng tham chiếu [Cấu hình cầu nối](bridge-configuration.md) để biết hướng dẫn chi tiết.

```javascript
$ kscn attach ~/kscnd_home/klay.ipc
Welcome to the Klaytn JavaScript console!

instance: Klaytn/vvX.X.X/XXXX-XXXX/goX.X.X

 datadir: ~/kscnd_home
 modules: admin:1.0 subbridge:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 servicechain:1.0 txpool:1.0

> subbridge.deployBridge()
["0x27caeba831d98b5fbb1d81ce0ed20801702f443a", "0x22c41ae528627b790233d2e59ea520be12350eb5"]

> subbridge.listBridge
[{
    localAddress: "0x27caeba831d98b5fbb1d81ce0ed20801702f443a",
    remoteAddress: "0x22c41ae528627b790233d2e59ea520be12350eb5",
    subscribed: false
}]
```

You can refer to the [subbridge API](../../..references/json-rpc/subbridge/deploy-bridge) for more details.

`subbridge_listBridge` thể hiện địa chỉ hợp đồng cầu nối và trạng thái đăng ký của chúng.
Cầu nối con lưu danh sách các địa chỉ hợp đồng cầu nối trong một tập tin. Khi khởi động lại hệ thống, cầu nối con tải lại danh sách hợp đồng cầu nối từ tập tin đó.

### Đăng ký <a id="subscribing"></a>

Sau khi triển khai hợp đồng cầu nối, bạn nên đăng ký cầu nối con với các hợp đồng cầu nối đã triển khai để kích hoạt tính năng chuyển giá trị. Bạn có thể làm việc này bằng cách sử dụng một lệnh gọi RPC API khác, `subbridge_subscribeBridge`.

```javascript
> subbridge.subscribeBridge("0x27caeba831d98b5fbb1d81ce0ed20801702f443a", "0x22c41ae528627b790233d2e59ea520be12350eb5")
null

> subbridge.listBridge
[{
    localAddress: "0x27caeba831d98b5fbb1d81ce0ed20801702f443a",
    remoteAddress: "0x22c41ae528627b790233d2e59ea520be12350eb5",
    subscribed: true
}]
```

### Kiểm tra trạng thái <a id="checking-status"></a>

Sau khi đăng ký, SCN sẽ tự động xử lý các giao dịch "yêu cầu chuyển giá trị" của người dùng.
Phần này giải thích cách để kiểm tra trạng thái hợp đồng cầu nối.

Trong một hợp đồng cầu nối có hai số dùng một lần, `requestNonce` và `handleNonce`.
Không giống như các giao dịch theo chuỗi, cầu nối con có thể xử lý yêu cầu số dùng một lần cao hơn trước những yêu cầu số dùng một lần thấp hơn.

- requestNonce : số lượng yêu cầu "chuyển giá trị chuỗi chéo" của người dùng với hợp đồng cầu nối này.
- handleNonce : số dùng một lần cao nhất mà cầu nối con đã xử lý.
- lowerHandleNonce : số dùng một lần thấp nhất mà cầu nối con sẽ xử lý.

Do đó, nếu số dùng một lần được cập nhật như dưới đây, chúng ta có thể nói việc chuyển giá trị chuỗi chéo đang được xử lý chính xác.

- "handleNonce" và "lowerHandleNonce" của hợp đồng cầu nối chuỗi mẹ liên tục tiến dần đến "requestNonce" của hợp đồng cầu nối chuỗi con.
- "handleNonce" và "lowerHandleNonce" liên tục tiến dần đến "requestNonce" của hợp đồng cầu nối chuỗi mẹ.

Nếu "handleNonce" bằng với "requestNonce" của hợp đồng cầu nối đối ứng và "lowerHandleNonce" lớn hơn "handleNonce" 1 đơn vị, khi đó tất cả các yêu cầu của người dùng đều đã được xử lý.

### Nhật ký <a id="log"></a>

Dưới đây là đầu ra bản ghi điển hình từ SCN trong quá trình hoạt động thông thường.
Trạng thái của các hợp đồng cầu nối được in ra mỗi giây.

```
INFO[10/16,19:37:40 +09] [45] VT : Parent -> Child Chain                request=8699 handle=4826 lowerHandle=4826 pending=3873
INFO[10/16,19:37:40 +09] [45] VT : Child -> Parent Chain                request=7894 handle=4207 lowerHandle=4207 pending=3687
```

Nhật ký này hiển thị request, handle, lowerHandle, và pending nonces.
Mỗi giá trị có ý nghĩa như sau

- request : tổng số dùng một lần yêu cầu chuyển giá trị của tất cả (các) hợp đồng cầu nối đã đăng ký.
- handle : tổng số dùng một lần xử lý tối đa của tất cả (các) hợp đồng cầu nối đã đăng ký.
- lowerHandle : tổng số dùng một lần xử lý tối thiểu của tất cả (các) hợp đồng cầu nối đã đăng ký.
- pending : chênh lệch số lượng giữa `request` và `lowerHandle`.

### RPC API <a id="rpc-api"></a>

Bạn có thể kiểm tra trạng thái của hợp đồng cầu nối như sau.
You can refer to the [subbridge API](../../../references/json-rpc/subbridge/get-bridge-information) for more details.

```javascript
> subbridge.getBridgeInformation("0x27caeba831d98b5fbb1d81ce0ed20801702f443a")
{
  counterPart: "0x22c41ae528627b790233d2e59ea520be12350eb5",
  handleNonce: 0,
  lowerHandleNonce: 0,
  isRunning: true,
  isSubscribed: true,
  onServiceChain: true,
  pendingEventSize: 0,
  requestNonce: 0
}
```

## Hợp đồng token (ERC-20/721) <a id="token-contract-erc-20-721"></a>

ServiceChain cũng hỗ trợ chuyển giá trị ERC-20/721.
Để hỗ trợ, chuỗi dịch vụ tương thích với các hợp đồng token ERC-20/721 nên được triển khai trên cả chuỗi mẹ và chuỗi con.
Đối với mã hợp đồng token ERC-20/721, bạn có thể tham chiếu [Tiêu chuẩn token](../../../build/smart-contracts/token-standard.md).
you can refer to the [Token standard](../../../build/smart-contracts/token-standard.md).

### Triển khai  <a id="deployment"></a>

SCN hiện chưa hỗ trợ API triển khai các token ERC-20/721. Bạn cần triển khai các token này qua caver-js.
Khi bạn triển khai hợp đồng ERC-20/721, bạn nên sử dụng đúng tài khoản người vận hành cầu nối. Sử dụng tài khoản toán tử mẹ để triển khai chuỗi chính và tài khoản người vận hành con để triển khai chuỗi dịch vụ.
Nếu bạn dùng sai tài khoản để triển khai hợp đồng token, việc chuyển giá trị sẽ không hoạt động và bạn cần dùng đúng tài khoản để triển khai lại hợp đồng token.

### Đăng ký  <a id="register"></a>

Sau khi triển khai hợp đồng token, bạn nên đăng ký hợp đồng đó với hợp đồng cầu nối trên các chuỗi mẹ/con như dưới đây.

```javascript
> subbridge.registerToken("0x27caeba831d98b5fbb1d81ce0ed20801702f443a", "0x22c41ae528627b790233d2e59ea520be12350eb5", "0x376b72abe1b29cace831bd3f5acdfa967814c9cd", "0x53160735f7cc6ff75e48619f368bb94daff66a1b")
null
```

Lệnh này đăng ký token chuỗi con ("0x376b72abe1b29cace831bd3f5acdfa967814c9cd") với hợp đồng cầu nối chuỗi con ("0x27caeba831d98b5fbb1d81ce0ed20801702f443a"). Và token chuỗi mẹ ("0x53160735f7cc6ff75e48619f368bb94daff66a1b") với hợp đồng cầu nối chuỗi mẹ ("0x22c41ae528627b790233d2e59ea520be12350eb5").

You can refer to the [Service Chain API](../../../references/json-rpc/subbridge/register-token) for more details.

## Yêu cầu chuyển giá trị <a id="request-value-transfer"></a>

Phần này giải thích về các phương pháp hợp đồng sẽ được người dùng gọi để yêu cầu chuyển giá trị.
Yêu cầu giao dịch không cho phép giá trị bằng 0 (KLAY/ERC-20).

### Chuyển KLAY <a id="klay-transfer"></a>

Người dùng có thể thực hiện giao dịch "yêu cầu chuyển giá trị" sang **hợp đồng cầu nối** bằng cách sử dụng các phương pháp sau.

#### dự phòng <a id="fallback"></a>

Nếu người dùng gọi hàm dự phòng của cầu nối, lệnh này yêu cầu chuyển KLAY đến cùng địa chỉ tài khoản của người dùng đưa ra yêu cầu trong chuỗi đối ứng.

```solidity
function () external payable;
```

#### requestKLAYTransfer <a id="requestklaytransfer"></a>

Nếu người dùng gọi hàm này với `_to`, lệnh này yêu cầu chuyển KLAY đến `_to` địa chỉ trong chuỗi đối ứng.

```solidity
function requestKLAYTransfer(address _to, uint256 _value, bytes calldata _extraData) external payable
```

### Chuyển ERC-20 <a id="erc-20-transfer"></a>

#### Yêu cầu 2 bước qua hợp đồng cầu nối <a id="2-step-request-via-bridge-contract"></a>

Người dùng có thể thực hiện giao dịch "yêu cầu chuyển giá trị" đến hợp đồng cầu nối bằng cách sử dụng phương pháp dưới đây sau khi [phê duyệt](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#approve) token sang hợp đồng cầu nối.

```solidity
function requestERC20Transfer(address _tokenAddress, address _to, uint256 _value,uint256 _feeLimit,bytes memory _extraData) external
```

#### Yêu cầu 1 bước qua hợp đồng ERC-20 <a id="1-step-request-via-erc-20-contract"></a>

Người dùng có thể thực hiện giao dịch "yêu cầu chuyển giá trị" trực tiếp sang **hợp đồng ERC-20** bằng cách sử dụng phương pháp sau mà không cần phê duyệt.
Sau đó, hợp đồng ERC-20 sẽ triển khai lệnh.

```solidity
function requestValueTransfer(uint256 _amount, address _to, uint256 _feeLimit, bytes calldata _extraData) external
```

### Chuyển ERC-721 <a id="erc-721-transfer"></a>

#### Yêu cầu 2 bước qua hợp đồng cầu nối <a id="2-step-request-via-bridge-contract"></a>

Người dùng có thể thực hiện giao dịch "yêu cầu chuyển giá trị" đến hợp đồng cầu nối bằng cách sử dụng phương pháp dưới đây sau khi [phê duyệt](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#approve) token sang hợp đồng cầu nối.

```solidity
function requestERC721Transfer(address _tokenAddress, address _to, uint256 _tokenId, bytes memory _extraData) external
```

#### Yêu cầu 1 bước qua hợp đồng ERC-721 <a id="1-step-request-via-erc-721-contract"></a>

Người dùng có thể thực hiện giao dịch "yêu cầu chuyển giá trị" trực tiếp sang **hợp đồng ERC-721** bằng cách sử dụng phương pháp sau mà không cần phê duyệt.
Sau đó, hợp đồng ERC-721 sẽ triển khai lệnh.

```solidity
function requestValueTransfer(uint256 _uid, address _to) external
```

### onERC721Received() <a id="unsupported-onERC721Received"></a>

The ERC-721 standard has the [onERC721Received](https://eips.ethereum.org/EIPS/eip-721) callback function.
The `onERC721Received()` works with `safeTransferFrom()` function, but the current bridge contract implementation uses `transferFrom()`, which means the `onERC721Recieved()` is not expected to be called.

Alternatively, a further action like `onERC721Recieved()` should be implemented in another way such as event listening (e.g., `event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId)`).

## Khôi phục chuyển giá trị

Yêu cầu chuyển giá trị có thể không thành công vì nhiều lý do. Ví dụ, bạn đã yêu cầu chuyển KLAY từ cầu nối phụ đến cầu nối chính hoặc từ cầu nối chính đến cầu nối phụ.
Trong trường hợp đó, hợp đồng cầu nối ở bên nhận phải có đủ KLAY hơn số lượng KLAY được yêu cầu. Nếu không, lệnh chuyển sẽ thất bại mà không có thông báo lỗi về giá trị trả về.
Một tính năng của lệnh khôi phục chuyển giá trị là lệnh này tìm ra những sự kiện chưa được xử lý, đồng thời thêm chúng vào bể sự kiện trong một khoảng thời gian nhất định, nghĩa là giao dịch không thành công có thể được thực hiện lại thành công khi cầu nối đối ứng có thể thành công xử lý sự kiện đó.
Trong trường hợp như ở ví dụ trên, giao dịch không thành công cuối cùng sẽ được xử lý bởi lệnh khôi phục chuyển giá trị khi cầu nối đối ứng có đủ KLAY.
Để thiết lập lệnh khôi phục chuyển giá trị làm mặc định, bạn cần thiết lập hai thuộc tính:

```
SC_VTRECOVERY=1
SC_VTRECOVERY_INTERVAL=5
```

Lệnh khôi phục chuyển giá trị sẽ tự động chạy bằng cách thiết lập `SC_VTRECOVERY=1`. `SC_VTRECOVERY_INTERVAL` là khoảng thời gian mỗi lần lệnh khôi phục chuyển giá trị được thực hiện.

## Thu phí cho lệnh chuyển KLAY/ERC-20 <a id="collecting-fee-for-klay-erc-20-transfer"></a>

Trong Service Chain có tính năng thu phí cho các lệnh chuyển KLAY/ERC-20.

**Sẽ sớm được cập nhật.**

## Tuỳ chỉnh hợp đồng cầu nối của bạn  <a id="customizing-your-bridge-contract"></a>

Trong ServiceChain, bạn có thể sử dụng hợp đồng cầu nối tuỳ chỉnh mà bạn kế thừa từ hợp đồng cầu nối gốc cho dịch vụ của riêng bạn.
Phần này giải thích cách để tuỳ chỉnh hợp đồng cầu nối và đưa ra mã ví dụ.

**Sẽ sớm được cập nhật.**
