# SupraOracles

## Giới thiệu

![](/img/build/tools/klaytnXsupraOracles.png)

[SupraOracles](https://supraoracles.com/) là một oracle\&amp thông lượng cao &; IntraLayer: Một bộ công cụ tích hợp theo chiều dọc của các giải pháp chuỗi chéo (dữ liệu oracle, cầu nối tài sản, mạng tự động hóa, v.v.) liên kết với tất cả các chuỗi khối, công khai (L1S và L2S) hoặc tư nhân (doanh nghiệp). Nó cung cấp các hợp đồng thông minh với một chuỗi chéo Oracle thế hệ tiếp theo có độ chính xác dữ liệu, tốc độ, khả năng mở rộng và bảo mật vượt trội.

Với SupraOracles, hợp đồng thông minh của bạn có thể có quyền truy cập vào các nguồn cấp dữ liệu giá để xây dựng các trường hợp sử dụng tài chính phi tập trung (DeFi) khác nhau của bạn. Trong chỉ dẫn này, bạn sẽ sử dụng SupraOracles để nhận nguồn cấp dữ liệu giá dễ dàng trên chuỗi khối Klaytn bằng cách sử dụng Remix IDE.

## Điều kiện tiên quyết

- [Kaikas](https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=en)
- [Remix IDE](https://remix.ethereum.org/)
- [Plugin Klaytn trên Remix](https://klaytn.foundation/using-klaytn-plugin-on-remix/)
- Kiểm tra KLAY từ [Faucet](https://baobab.wallet.klaytn.foundation/faucet)

## Bắt đầu

Trong các bước sau, bạn sẽ yêu cầu nguồn cấp dữ liệu giá ETH/USD trong hợp đồng thông minh của bạn bằng cách sử dụng SupraOracles. Bắt đầu nào!

### Bước 1: Tạo Giao Diện S-Value

Điều này tạo ra giao diện sẽ được sử dụng để lấy giá từ SupraOracles. Thêm mã sau vào hợp đồng thông minh solidity mà bạn muốn truy xuất S-Value.

```solidity
interface ISupraSValueFeed {
function checkPrice(string memory marketPair) external view returns (int256 price, uint256 timestamp);
}
```

### Bước 2: Định Cấu Hình Địa Chỉ Nguồn Cấp Dữ Liệu S-Value

Để tìm kiếm S-Value từ hợp đồng thông minh SupraOracles, trước tiên hãy tìm địa chỉ nguồn cấp S-Value cho chuỗi bạn chọn. Khi bạn có đúng địa chỉ, hãy tạo một phiên bản của nguồn cấp giá trị S bằng giao diện mà chúng tôi đã xác định trước đây như sau:

```solidity
contract ISupraSValueFeedExample {
    ISupraSValueFeed internal sValueFeed;
    constructor() {
        sValueFeed = ISupraSValueFeed(0x7f003178060af3904b8b70fEa066AEE28e85043E);
    }
}
```

Trong ví dụ này, chúng tôi đang triển khai nguồn cấp giá trị S trên Mạng thử nghiệm Baobab Klaytn. Bạn có thể xác minh địa chỉ nguồn cấp dữ liệu Baobab Klaytn S-Value [tại đây](https://supraoracles.com/docs/get-started/networks/).

### Bước 3: Nhận Giá Tiền Mã Hóa S-Value

Giờ bạn có thể dễ dàng truy cập giá Tiền Mã Hóa S-Value của các cặp thị trường được hỗ trợ của chúng tôi. Trong bước này, bạn sẽ nhận được giá của ETH/USDT (eth_usdt) bằng cách áp dụng mã sau vào hợp đồng thông minh của bạn.

```solidity
function getEthUsdtPrice() external view returns (int) {
(
int price,
/* uint timestamp */
) = sValueFeed.checkPrice("eth_usdt");
return price;
}
```

## Thực hiện thực tế

Trong ví dụ dưới đây, chúng tôi sẽ triển khai hợp đồng nguồn cấp dữ liệu giá S-Value và cũng thực hiện chức năng getEthUsdtPrice() để có được các cặp giá ETH/USDT.

### Tạo và Triển Khai Mã Mẫu

**Remix IDE**

- Điều hướng đến [Remix IDE](https://remix.ethereum.org/)
- Nhấp vào tab File Explorer, tạo một tệp mới có tên `demosuprapricefeed.sol` trong thư mục hợp đồng
- Dán mã sau vào tệp vừa tạo
- Trong Remix, nhấp vào **Hợp Đồng Biên Dịch**.
- Nhấp vào tab Klaytn bên trái sau khi đã cài đặt plugin
- Chọn **Môi Trường** > **Được Tiêm Caver** - **Kaikas**.
- Trong **Hợp đồng**, chọn hợp đồng của bạn. Ví dụ, ISupraSValueFeedExample.
- Nhấp vào **Triển Khai**.

**Mã Mẫu**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
interface ISupraSValueFeed {
    function checkPrice(string memory marketPair) external view returns (int256 price, uint256 timestamp);
}
contract ISupraSValueFeedExample {
    ISupraSValueFeed internal sValueFeed;
    constructor() {
        sValueFeed = ISupraSValueFeed(0x7f003178060af3904b8b70fEa066AEE28e85043E);
    }
    function getEthUsdtPrice() external view returns (int) {
        (
            int price,
            /* uint timestamp */
        ) = sValueFeed.checkPrice("eth_usdt");
        return price;
    }
}
```

### Tương tác với Hợp Đồng Thông Minh

Để nhận nguồn cấp dữ liệu giá cho cặp tiền tệ đã chọn, bạn cần thực thi hàm `getEthUsdtPrice()`.

![](/img/build/tools/sPriceFeed.png)

Tada 🎉! Bạn vừa yêu cầu một nguồn cấp dữ liệu giá tiền tệ (ETH/USDT) trong hợp đồng thông minh của bạn.

Tính đến thời điểm viết, getEthUsdtPrice() trả về "185795966200", một con số chính xác có 8 chữ số thập phân. Để có được giá trị ETH/USD thực tế, bạn cần chia số trên cho 10^8, tương đương với $1857.95966200.

## Những Cách Sử Dụng Các Nguồn Cấp Dữ Liệu Về Giá Tiền Mã Hóa SupraOracles Khác

### Nguồn Cấp Dữ Liệu S-Value Với Web3.js

```javascript
// example assumes that the web3 library has been imported and is accessible within your scope
const getEthUsdtPrice = async () => {
const abi = [{ "inputs": [ { "internalType": "string", "name": "marketPair", "type": "string" } ], "name": "checkPrice", "outputs": [ { "internalType": "int256", "name": "price", "type": "int256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]
const address = '0x7f003178060af3904b8b70fEa066AEE28e85043E'
const web3 = new Web3('https://public-en-baobab.klaytn.net')
const sValueFeed = new web3.eth.Contract(abi, address)
const price = (await sValueFeed.methods.checkPrice('eth_usdt').call()).price
console.log(`The price is: ${price}`)
}
getEthUsdtPrice()
```

### Nguồn Cấp Dữ Liệu S-Value Với ether.js

```javascript
// example assumes that the ethers library has been imported and is accessible within your scope
const getEthUsdtPrice = async () => {
////for ethers version 6.0
const provider = new ethers.JsonRpcProvider("https://klaytn-baobab-rpc.allthatnode.com:8551")
////for ethers version <= 5.7.2
//const provider = new ethers.providers.JsonRpcProvider('https://public-en-baobab.klaytn.net')
const abi = [{ "inputs": [ { "internalType": "string", "name": "marketPair", "type": "string" } ], "name": "checkPrice", "outputs": [ { "internalType": "int256", "name": "price", "type": "int256" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]
const address = '0x7f003178060af3904b8b70fEa066AEE28e85043E'
const sValueFeed = new ethers.Contract(address, abi, provider)
const price = (await sValueFeed.checkPrice('eth_usdt')).price
console.log(`The price is: ${price.toString()}`)
}
getEthUsdtPrice()
```

## Phần kết luận

Trong chỉ dẫn này, bạn đã học được cách yêu cầu giá ETH/USD bằng cách sử dụng giải pháp cấp dữ liệu giá SupraOracle. Với SupraOracle, bạn cũng có thể tạo ra các số ngẫu nhiên trong hợp đồng thông minh của mình. Nếu bạn muốn tìm hiểu về quá trình này, hãy truy cập [chỉ dẫn](https://metaverse-knowledge-kit.klaytn.foundation/docs/decentralized-oracle/oracle-providers/supraOracles-tutorial) về việc tích hợp SupraVRF trên Klaytn. Để biết thêm các hướng dẫn chuyên sâu về SupraOracles, vui lòng tham khảo [Tài liệu SupraOraces](https://supraoracles.com/docs/development-guides).
