# Covalent API

[Covalent](https://www.covalenthq.com/?utm_source=klaytn&utm_medium=partner-docs) provides a unified API to bring full transparency and visibility to assets across all blockchains including Klaytn Mainnet and Testnet.

Covalent provides the industry-leading Unified API bringing visibility to billions of Web3 data points. Developers use Covalent to build exciting multi-chain applications like crypto wallets, NFT galleries, and investor dashboard tools utilizing data from most major blockchains.

## Generating API Keys

To get started, sign up for an [**API Key**](https://www.covalenthq.com/platform/?utm_source=klaytn&utm_medium=partner-docs). 

|   *JSON support*    | *CSV support* |
| :-----------: | :-----------: |
| ![Developer Mode](https://www.covalenthq.com/static/images/partner-docs/developer_mode.png) | ![Analyst Mode](https://www.covalenthq.com/static/images/partner-docs/analyst_mode.png)|

The Covalent API is RESTful and offers the following out-of-the-box for *Klaytn*:

| **Covalent API** |         |
| ----------- | ----------- |
| **Response formats** | JSON and CSV |
| **Real time response** | 2 blocks |
| **Batch response** | 30 minutes |
| **Request volume limit** | None |
| **Request rate limit** | 5 requests per second |
| **Base URL** | https://api.covalenthq.com/v1/|
| **Networks & `chain_id`** | Mainnet: Cypress - `8217` <br> Testnet: Boabab - `1001`|
| **Supported Endpoints** | **Class A Universal** <br>- [Balances](https://www.covalenthq.com/docs/api/#/0/Get%20token%20balances%20for%20address/USD/8217/?utm_source=klaytn&utm_medium=partner-docs) <br> - [Transactions](https://www.covalenthq.com/docs/api/#/0/Get%20transactions%20for%20address/USD/8217/?utm_source=klaytn&utm_medium=partner-docs) <br> - [Transfers](https://www.covalenthq.com/docs/api/#/0/Get%20ERC20%20token%20transfers%20for%20address/USD/8217/?utm_source=klaytn&utm_medium=partner-docs) <br> - [Token Holders](https://www.covalenthq.com/docs/api/#/0/Get%20token%20holders%20as%20of%20any%20block%20height/USD/8217/?utm_source=klaytn&utm_medium=partner-docs) <br> - [Log Events (Contract Address)](https://www.covalenthq.com/docs/api/#/0/Get%20log%20events%20by%20contract%20address/USD/8217/?utm_source=klaytn&utm_medium=partner-docs) <br> - [Log Events (Topic Hash)](https://www.covalenthq.com/docs/api/#/0/Get%20log%20events%20by%20topic%20hash(es)/USD/8217/?utm_source=klaytn&utm_medium=partner-docs)

Try the supported endpoints directly in your browser from our [API Reference](https://covalenthq.com/docs/api/?utm_source=klaytn&utm_medium=partner-docs) or use the following code examples. **The JSON response format is the same for all endpoints:**
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

// Example address request
getWalletBalance(klaytnChainId, demoAddress);
```

### Python
```
import requests

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


# Example address request
get_wallet_balance(klatyn_chain_id, demo_address)
```

## Use Cases
The Covalent API supports a broad range of Web3 data use cases including:

| | | | |
| :-----------: | :-----------: | :-----------: | :-----------: |
| ![Gaming](https://www.covalenthq.com/static/images/partner-docs/gaming.png) | ![DeFi](https://www.covalenthq.com/static/images/partner-docs/defi.png) | ![KYC](https://www.covalenthq.com/static/images/partner-docs/kyc.png)| ![NFT](https://www.covalenthq.com/static/images/partner-docs/nft_icon.png)|
| Gaming| DeFi Taxes | KYC | NFTs |
| ![Wallets](https://www.covalenthq.com/static/images/partner-docs/wallets.png) | ![Dashboards](https://www.covalenthq.com/static/images/partner-docs/dashboards.png) | ![On-Chain Forensics](https://www.covalenthq.com/static/images/partner-docs/forensics.png)| ![DAO](https://www.covalenthq.com/static/images/partner-docs/dao.png)|
| Wallets| Dashboards | On-Chain Forensics | DAO Data |
| ![Trading](https://www.covalenthq.com/static/images/partner-docs/trading.png) | ![Predictions](https://www.covalenthq.com/static/images/partner-docs/predictions.png) | ![Governance](https://www.covalenthq.com/static/images/partner-docs/governance.png)| ![Pricing](https://www.covalenthq.com/static/images/partner-docs/pricing.png)|
| DEXs & Trading| Predictive Analytics| Governance | Pricing |


Check out our collection of ready-to-ship [**Code Templates**](https://covalenthq.notion.site/dbf062042f4a463a950f0047b9df9ec1?v=2f7a0d7267034526a641ce7215dd7512/?utm_source=klaytn&utm_medium=partner-docs) that you can use to build your Web3 data-powered dApps.

## Resources
Here are some additional resources to help you get started with the Covalent API:
- [Klaytn Network Details](https://www.covalenthq.com/docs/networks/klaytn/?utm_source=klaytn&utm_medium=partner-docs)
- [Covalent API Reference](https://covalenthq.com/docs/api/?utm_source=klaytn&utm_medium=partner-docs)
- [Project Showcase](https://www.covalenthq.com/docs/project-showcase/?utm_source=klaytn&utm_medium=partner-docs)
- [API FAQs](https://www.covalenthq.com/docs/developer/faq/?utm_source=klaytn&utm_medium=partner-docs)
- [Discord Support](https://www.covalenthq.com/discord/?utm_source=klaytn&utm_medium=partner-docs)

