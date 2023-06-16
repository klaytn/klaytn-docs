# API Covalent

[Covalent](https://www.covalenthq.com/?utm_source=klaytn&utm_medium=partner-docs) cung cấp API hợp nhất để mang lại tính minh bạch và khả năng hiển thị hoàn chỉnh nội dung trên tất cả các chuỗi khối bao gồm Mạng chính và Mạng thử nghiệm Klaytn.

Covalent cung cấp API hợp nhất hàng đầu trong ngành mang lại khả năng hiển thị cho hàng tỷ điểm dữ liệu Web3. Các nhà phát triển sử dụng Covalent để xây dựng các ứng dụng đa chuỗi thú vị như ví tiền điện tử, phòng trưng bày NFT và các công cụ bảng điều khiển của nhà đầu tư sử dụng dữ liệu từ hầu hết các chuỗi khối lớn.

## Tạo Khóa API

Để bắt đầu, hãy đăng ký [**Khóa API**](https://www.covalenthq.com/platform/?utm_source=klaytn&utm_medium=partner-docs).

|                                           *Hỗ trợ JSON*                                            |                                        *Hỗ trợ CSV*                                         |
|:--------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------:|
| ![Chế độ nhà phát triển](https://www.covalenthq.com/static/images/partner-docs/developer_mode.png) | ![Chế độ phân tích](https://www.covalenthq.com/static/images/partner-docs/analyst_mode.png) |

API Covalent là RESTful và cung cấp tính năng vượt trội sau đây cho *Klaytn*:

| **API Covalent**                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Định dạng phản hồi**           | JSON và CSV                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Phản hồi theo thời gian thực** | 2 khối                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Phản hồi hàng loạt**           | 30 phút                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Giới hạn số lượng yêu cầu**    | Không có                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Giới hạn tốc độ yêu cầu**      | 5 yêu cầu mỗi giây                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **URL cơ sở**                    | https://api.covalenthq.com/v1/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Mạng & `chain_id`**            | Mạng chính: Cypress - `8217` <br> Mạng thử nghiệm: Baobab - `1001`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Điểm cuối được hỗ trợ**        | **Lớp A phổ dụng** <br>- [Số dư](https://www.covalenthq.com/docs/api/#/0/Get%20token%20balances%20for%20address/USD/8217/?utm_source=klaytn&utm_medium=partner-docs) <br> - [Giao dịch](https://www.covalenthq.com/docs/api/#/0/Get%20transactions%20for%20address/USD/8217/?utm_source=klaytn&utm_medium=partner-docs) <br> - [Chuyển khoản](https://www.covalenthq.com/docs/api/#/0/Get%20ERC20%20token%20transfers%20for%20address/USD/8217/?utm_source=klaytn&utm_medium=partner-docs) <br> - [Người nắm giữ token](https://www.covalenthq.com/docs/api/#/0/Get%20token%20holders%20as%20of%20any%20block%20height/USD/8217/?utm_source=klaytn&utm_medium=partner-docs) <br> - [Ghi bản ghi sự kiện (Địa chỉ hợp đồng)](https://www.covalenthq.com/docs/api/#/0/Get%20log%20events%20by%20contract%20address/USD/8217/?utm_source=klaytn&utm_medium=partner-docs) <br> - [Ghi bản ghi sự kiện (Hàm băm chủ đề)](https://www.covalenthq.com/docs/api/#/0/Get%20log%20events%20by%20topic%20hash(es)/USD/8217/?utm_source=klaytn&utm_medium=partner-docs) |

Hãy thử trực tiếp các điểm cuối được hỗ trợ trong trình duyệt của bạn từ [Tham chiếu API](https://covalenthq.com/docs/api/?utm_source=klaytn&utm_medium=partner-docs) của chúng tôi hoặc sử dụng các mã ví dụ sau đây. **Định dạng phản hồi JSON giống nhau cho tất cả các điểm cuối:**
```
❴ 
    "data": ..., 
    "error": false,
    "error_message": null,
    "error_code": null
❵
```

### Curl
```
curl -X GET "https://api.covalenthq.com/v1/{chain_id}/address/{address}/balances_v2/?key={YOUR API KEY}" -H "Accept: application/json"
```

### JavaScript
```
const APIKEY = 'YOUR API KEY';
const baseURL = 'https://api.covalenthq.com/v1'
const klaytnChainId = '8217'
const demoAddress = '0xFEC4f9D5B322Aa834056E85946A32c35A3f5aDD8'

async function getWalletBalance(chainId, address) {
    const url = new URL(`${baseURL}/${chainId}/address/${address}/balances_v2/?key=${APIKEY}`);
    const response = await fetch(url);
    const result = await response.json();
    const data = result.data;
    console.log(data)
    return data;
}

// Ví dụ yêu cầu địa chỉ
getWalletBalance(klaytnChainId, demoAddress);
```

### Python
```
nhập yêu cầu

API_KEY = 'YOUR API KEY'
base_url = 'https://api.covalenthq.com/v1'
klatyn_chain_id = '8217'
demo_address = '0xFEC4f9D5B322Aa834056E85946A32c35A3f5aDD8'

def get_wallet_balance(chain_id, address):
    endpoint = f'/{chain_id}/address/{address}/balances_v2/?key={API_KEY}'
    url = base_url + endpoint
    result = requests.get(url).json()
    data = result["data"]
    print(data)
    return(data)


# Ví dụ yêu cầu địa chỉ
get_wallet_balance(klatyn_chain_id, demo_address)
```

## Trường hợp ứng dụng
API Covalent hỗ trợ nhiều trường hợp sử dụng dữ liệu Web3 bao gồm:

|                                                                                       |                                                                                          |                                                                                             |                                                                                |
|:-------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------:|
| ![Trò chơi điện tử](https://www.covalenthq.com/static/images/partner-docs/gaming.png) |         ![DeFi](https://www.covalenthq.com/static/images/partner-docs/defi.png)          |            ![KYC](https://www.covalenthq.com/static/images/partner-docs/kyc.png)            |   ![NFT](https://www.covalenthq.com/static/images/partner-docs/nft_icon.png)   |
|                                   Trò chơi điện tử                                    |                                        Thuế DeFi                                         |                                             KYC                                             |                                      NFT                                       |
|       ![Ví](https://www.covalenthq.com/static/images/partner-docs/wallets.png)        | ![Bảng điều khiển](https://www.covalenthq.com/static/images/partner-docs/dashboards.png) | ![Điều tra trên chuỗi](https://www.covalenthq.com/static/images/partner-docs/forensics.png) |     ![DAO](https://www.covalenthq.com/static/images/partner-docs/dao.png)      |
|                                          Ví                                           |                                     Bảng điều khiển                                      |                                     Điều tra trên chuỗi                                     |                                  Dữ liệu DAO                                   |
|    ![Giao dịch](https://www.covalenthq.com/static/images/partner-docs/trading.png)    |   ![Dự đoán](https://www.covalenthq.com/static/images/partner-docs/predictions.png)    |      ![Quản trị](https://www.covalenthq.com/static/images/partner-docs/governance.png)      | ![Định giá](https://www.covalenthq.com/static/images/partner-docs/pricing.png) |
|                                    DEX & Giao dịch                                    |                                    Phân tích dự đoán                                     |                                          Quản trị                                           |                                    Định giá                                    |


Xem bộ sưu tập [**Mẫu mã**](https://covalenthq.notion.site/dbf062042f4a463a950f0047b9df9ec1?v=2f7a0d7267034526a641ce7215dd7512/?utm_source=klaytn&utm_medium=partner-docs) có sẵn của chúng tôi mà bạn có thể sử dụng để xây dựng dApp chạy bằng dữ liệu Web3 của mình.

## Tài nguyên
Dưới đây là một số tài nguyên bổ sung để giúp bạn bắt đầu với API Covalent:
- [Thông tin Mạng Klaytn](https://www.covalenthq.com/docs/networks/klaytn/?utm_source=klaytn&utm_medium=partner-docs)
- [Tham chiếu API Covalent](https://covalenthq.com/docs/api/?utm_source=klaytn&utm_medium=partner-docs)
- [Giới thiệu dự án](https://www.covalenthq.com/docs/project-showcase/?utm_source=klaytn&utm_medium=partner-docs)
- [Câu hỏi thường gặp về API](https://www.covalenthq.com/docs/developer/faq/?utm_source=klaytn&utm_medium=partner-docs)
- [Hỗ trợ Discord](https://www.covalenthq.com/discord/?utm_source=klaytn&utm_medium=partner-docs)

