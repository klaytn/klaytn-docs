# Mạng lưới Orakl

## Giới thiệu

![](/img/build/tools/klaytnXorakl.png)

[Mạng Orakl](https://docs.orakl.network/docs/developers-guide/readme) là một mạng lưới oracle phi tập trung cho phép các hợp đồng thông minh truy cập dữ liệu ngoài chuỗi và các tài nguyên khác một cách an toàn. Nó tự hào là một oracle gốc Klaytn cung cấp các Nguồn Cấp Dữ Liệu, VRF và Yêu Cầu-Phản Hồi.

Với Mạng Orakl, người dùng có thể tìm nguồn ngẫu nhiên không thể đoán trước và không thiên vị trong hợp đồng thông minh của họ. Mạng Orakl [Verifiable Randon Fuction (VRF)](https://docs.orakl.network/docs/developers-guide/verifiable-random-function-vrf#what-is-verifiable-random-function) cho phép các hợp đồng thông minh sử dụng VRF để tạo ra các giá trị ngẫu nhiên rõ ràng, có thể được sử dụng trong các dApp khác nhau đòi hỏi tính ngẫu nhiên.


Mạng Orakl cung cấp cho các nhà phát triển quyền truy cập vào các dịch vụ VRF với hai phương pháp thanh toán khác nhau, cụ thể là: [Prepayment](https://docs.orakl.network/docs/developers-guide/readme#prepayment) hoặc [Phương thức trực tiếp](https://docs.orakl.network/docs/developers-guide/readme#direct-payment). Trong hướng dẫn này, bạn sẽ sử dụng chức năng VRF từ Mạng lướt Orakl để yêu cầu các số ngẫu nhiên trong hợp đồng thông minh của bạn.


## Điều kiện tiên quyết
* [Kaikas](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=en)
* [Remix IDE](https://remix.ethereum.org/)
* [Plugin Klaytn trên bản phối lại](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
* Kiểm tra KLAY từ [Faucet](https://baobab.wallet.klaytn.foundation/faucet)

## Bắt đầu

Trong các bước sau, bạn sẽ yêu cầu một số ngẫu nhiên trong hợp đồng thông minh của mình bằng Mạng Orakl. Hãy bắt đầu thôi!

### Bước 1: Khởi tạo để thanh toán trực tiếp

Để yêu cầu các số ngẫu nhiên trong hợp đồng thông minh của bạn, bạn cần khởi tạo hợp đồng thông minh [VRFCoordinator](https://github.com/Bisonai-CIC/orakl/blob/master/contracts/src/v0.1/VRFCoordinator.sol).  Bạn nên giao diện VRFCoordInator liên kết với địa chỉ VRFCoordInator được cung cấp thông qua tham số hàm tạo và sử dụng nó cho các yêu cầu từ ngẫu nhiên (requestRandomWordspayment). Hợp đồng VRFCoordinator hiện đang được triển khai trên Mạng thử nghiệm Baobab Klaytn Testnet với địa chỉ hợp đồng [0xfa605ca6dc9414e0f7fa322d3fd76535b33f7a4f](https://baobab.scope.klaytn.com/account/0xfa605ca6dc9414e0f7fa322d3fd76535b33f7a4f)


```solidity
import "@bisonai/orakl-contracts/src/v0.1/VRFConsumerBase.sol";
import "@bisonai/orakl-contracts/src/v0.1/interfaces/VRFCoordinatorInterface.sol";

contract VRFConsumer is VRFConsumerBase {
  VRFCoordinatorInterface COORDINATOR;
  constructor(address coordinator) VRFConsumerBase(coordinator) {
      COORDINATOR = VRFCoordinatorInterface(coordinator);
  }
}
```
### Bước 2: Khởi tạo biến trạng thái hợp đồng

Trong bước này, chúng tôi sẽ khởi tạo các biến trạng thái cần thiết cho chức năng hợp đồng của chúng tôi. Điều này bao gồm biến s_randomResult lưu trữ kết quả số ngẫu nhiên, biến s_owner được sử dụng cho công cụ sửa đổi duy nhất, biến callbackGasLimit, biến keyHash và biến numWord cho số lượng số ngẫu nhiên được trả về.

```solidity
  uint256 public s_randomResult;

  address private sOwner;

   bytes32 keyHash = 0x47ede773ef09e40658e643fe79f8d1a27c0aa6eb7251749b268f829ea49f2024;

   uint32 callbackGasLimit = 500000;

   uint32 numWords = 1;

  error OnlyOwner(address notOwner);
  modifier onlyOwner() {
      if (msg.sender != sOwner) {
          revert OnlyOwner(msg.sender);
      }
      _;
  }
  constructor(address coordinator) VRFConsumerBase(coordinator) {
      COORDINATOR = VRFCoordinatorInterface(coordinator);
      sOwner = msg.sender;
  }
```

### Bước 3: Yêu cầu các từ ngẫu nhiên với thanh toán trực tiếp (người tiêu dùng)

Để yêu cầu các số ngẫu nhiên bằng phương pháp trực tiếp, người dùng cần gửi $KLAY cùng với một cuộc gọi bằng thuộc tính giá trị.

```solidity

receive() external payable {}

function requestRandomWordsDirect(
    bytes32 keyHash,
    uint32 callbackGasLimit,
    uint32 numWords
)
    public
    payable
    onlyOwner
    returns (uint256 requestId)
{
  requestId = COORDINATOR.requestRandomWordsPayment{value: msg.value}(
    keyHash,
    callbackGasLimit,
    numWords
  );
}
```
Mã trên giải thích một hàm gọi hàm `requestRandomWordspayment()` được xác định trong hợp đồng điều phối viên và chuyển Keyhash, callbackGasLimit và NumWords làm đối số. Việc thanh toán cho dịch vụ được gửi qua msg.value cho requestRandomWordsPayment() trong Hợp đồng Điều phối viên. Nếu khoản thanh toán lớn hơn thanh toán dự kiến, vượt quá thanh toán được trả lại cho người gọi của chức năng requestRandomWordsPayment, do đó, nó yêu cầu hợp đồng người dùng để xác định chứ năng [receive()](https://docs.soliditylang.org/en/v0.8.16/contracts.html#receive-ether-function) như được hiển thị ở đầu mã.


### Bước 4: Thực hiện các từ ngẫu nhiên

Chức năng này được gọi bằng hợp đồng VRFCoordinator khi thực hiện yêu cầu số ngẫu nhiên.

```solidity
function fulfillRandomWords(
    uint256 /* requestId */,
    uint256[] memory randomWords
)
    internal
    override
{
    // requestId should be checked if it matches the expected request
    // Generate random value between 1 and 50.
    s_randomResult = (randomWords[0] % 50) + 1;
}
```

Bây giờ chúng ta đã có mã giải pháp Orakl VRF, hãy cũng xem nó hoạt động như thế nào.

## Thực hiện thực tế

Trong ví dụ dưới đây, hợp đồng cung cấp cho chúng tôi quyền truy cập để yêu cầu các số ngẫu nhiên và thực hiện yêu cầu.

### Tạo và Triển Khai Mã Mẫu

**Remix IDE**

* Điều hướng đến [Remix IDE](https://remix.ethereum.org/).
* Nhấp vào tab File Explorer, tạo một tệp mới có tên demoOraklDirectVRF.sol trong thư mục hợp đồng.
* Dán mã bên dưới trong tệp mới được tạo.
* Trong Remix, nhấp vào **Hợp Đồng Biên Dịch**.
* Nhấp vào tab Klaytn bên trái của bạn sau khi cài đặt plugin.
* Chọn **Môi Trường** > **Được Tiêm Caver** - **Kaikas**.
* Trong hợp đồng, chọn hợp đồng của bạn. Ví dụ, VRFConsumer.
* Truyền trong địa chỉ hợp đồng điều phối viên `0xfa605ca6dc9414e0f7fa322d3fd76535b33f7a4f`.
* Nhấp vào **Triển Khai**.

**Mã Mẫu**

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;
import "@bisonai/orakl-contracts/src/v0.1/VRFConsumerBase.sol";
import "@bisonai/orakl-contracts/src/v0.1/interfaces/VRFCoordinatorInterface.sol";
contract VRFConsumer is VRFConsumerBase {
  VRFCoordinatorInterface COORDINATOR;
  // stores random number after request;
  uint256 public s_randomResult;
  // stores owner
  address private sOwner;
   bytes32 keyHash = 0x47ede773ef09e40658e643fe79f8d1a27c0aa6eb7251749b268f829ea49f2024;
   uint32 callbackGasLimit = 500000;
   uint32 numWords = 1;
  error OnlyOwner(address notOwner);
  modifier onlyOwner() {
      if (msg.sender != sOwner) {
          revert OnlyOwner(msg.sender);
      }
      _;
  }
  constructor(address coordinator) VRFConsumerBase(coordinator) {
      COORDINATOR = VRFCoordinatorInterface(coordinator);
      sOwner = msg.sender;
  }
  // https://baobab.scope.klaytn.com/tài khoản/0xfa605ca6dc9414e0f7fa322d3fd76535b33f7a4f
  receive() external payable {}
function requestRandomWordsDirect()
    public
    payable
    onlyOwner
    returns (uint256 requestId)
{
  requestId = COORDINATOR.requestRandomWordsPayment{value: msg.value}(
    keyHash,
    callbackGasLimit,
    numWords
  );
}
function fulfillRandomWords(
    uint256 /* requestId */,
    uint256[] memory randomWords
)
    internal
    override
{
    // requestId should be checked if it matches the expected request
    // Generate random value between 1 and 50.
    s_randomResult = (randomWords[0] % 50) + 1;
}
}
```

![](/img/build/tools/orakl-vrf-deploy.png)

### Tương tác với Hợp Đồng Thông Minh

Để yêu cầu các số ngẫu nhiên trong hợp đồng thông minh của bạn, trước tiên bạn phải thực hiện hàm `requestRandomWordsDirect()`. Để chức năng này thực hiện thành công, người dùng phải gửi KLAY (tối thiểu 1 KLAY) như đã nêu trước đó. Sau đó, một khi yêu cầu đã được đáp ứng, hàm `s_randomResult()` có thể được thực thi. Hàm s_randomResult() này trả về số ngẫu nhiên.

* **requestRandomWordsDirect()**: sẽ gửi 1 KLAY để thực thi chức năng này. Hình ảnh dưới đây minh họa điều này:

![](/img/build/tools/orakl-vrf-request.png)

* **s_randomresult()**: Sau khi VRFCoordinator đã đáp ứng yêu cầu số ngẫu nhiên, phản hồi được lưu trữ trong biến s_randomResult. Để nhận được phản hồi, hãy gọi hàm `s_response()`.


![](/img/build/tools/orakl-vrf-response.png)


Tada 🎉! Bạn chỉ yêu cầu một số ngẫu nhiên trong hợp đồng thông minh của bạn.

## Phần kết luận

Trong hướng dẫn này, bạn đã học cách tạo một số ngẫu nhiên trong hợp đồng thông minh của mình bằng giải pháp Mạng Orakl VRF. Mạng Orakl cung cấp nhiều dịch vụ Oracle hơn như Price-feeds, Phản Hồi Yêu Cầu Dữ Liệu và nhiều hơn nữa. Để biết thêm các hướng dẫn chuyên sâu về Mạng Orakl và cách thức hoạt động, vui lòng tham khảo [Tài liệu Mạng Orakl](https://docs.orakl.network/docs/developers-guide/readme). 
