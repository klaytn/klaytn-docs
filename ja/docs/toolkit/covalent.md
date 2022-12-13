# Covalent API

[共有値](https://www.covalenthq.com/?utm_source=klaytn&utm_medium=partner-docs) は、Klaytn Mainnet や Testnet を含むすべてのブロックチェーンの資産に完全な透明性と可視性をもたらす統一された API を提供します。

Covantalは業界をリードするUnified APIを提供し、何十億ものWeb3データポイントを可視化します。 開発者はCovaluesを使用して、暗号ウォレット、NFTギャラリー、投資家ダッシュボードツールなどのエキサイティングなマルチチェーンアプリケーションを構築し、ほとんどの主要なブロックチェーンからのデータを利用します。

## API キーの生成

開始するには、 [**API Key**](https://www.covalenthq.com/platform/?utm_source=klaytn&utm_medium=partner-docs) にサインアップしてください。

|                                    *JSON のサポート*                                     |                                      *CSVサポート*                                      |
|:-----------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------:|
| ![開発者モード](https://www.covalenthq.com/static/images/partner-docs/developer_mode.png) | ![アナリストモード](https://www.covalenthq.com/static/images/partner-docs/analyst_mode.png) |

Covent APIはRESTfulで、 *Klaytn* のために次のようなすぐに利用できるものを提供しています:

| **Covalent API**        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **応答形式**                | JSON と CSV                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **リアルタイム応答**            | 2ブロック                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **一括返信**                | 30分                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **リクエストの音量制限**          | なし                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **リクエストレート制限**          | 1 秒あたり 5 リクエスト                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **ベースURL**              | https://api.covalenthq.com/v1/                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **ネットワーク & `chain_id`** | Mainnet: Cypress - `8217` <br> Testnet: Boabab - `1001`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **サポートされるエンドポイント**      | **Class A Universal** <br>- [Balances](https://www.covalenthq.com/docs/api/#/0/Get%20token%20balances%20for%20address/USD/8217/?utm_source=klaytn&utm_medium=partner-docs) <br> - [Transactions](https://www.covalenthq.com/docs/api/#/0/Get%20transactions%20for%20address/USD/8217/?utm_source=klaytn&utm_medium=partner-docs) <br> - [Transfers](https://www.covalenthq.com/docs/api/#/0/Get%20ERC20%20token%20transfers%20for%20address/USD/8217/?utm_source=klaytn&utm_medium=partner-docs) <br> - [Token Holders](https://www.covalenthq.com/docs/api/#/0/Get%20token%20holders%20as%20of%20any%20block%20height/USD/8217/?utm_source=klaytn&utm_medium=partner-docs) <br> - [Log Events (Contract Address)](https://www.covalenthq.com/docs/api/#/0/Get%20log%20events%20by%20contract%20address/USD/8217/?utm_source=klaytn&utm_medium=partner-docs) <br> - [Log Events (Topic Hash)](https://www.covalenthq.com/docs/api/#/0/Get%20log%20events%20by%20topic%20hash(es)/USD/8217/?utm_source=klaytn&utm_medium=partner-docs) |

[API リファレンス](https://covalenthq.com/docs/api/?utm_source=klaytn&utm_medium=partner-docs) からブラウザで直接サポートされているエンドポイントを試すか、以下のコード例を使用してください。 **JSON 応答フォーマットは、すべてのエンドポイントで同じです:**
```
<unk> 
    "data": ..., 
    "error": false,
    "error_message": null,
    "error_code": null
 <unk>
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

## ユースケース
Covant API は、以下を含む幅広いWeb3 データ使用事例をサポートしています。

|                                                                               |                                                                                  |                                                                                        |                                                                            |
|:-----------------------------------------------------------------------------:|:--------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------:|
|   ![ゲーム](https://www.covalenthq.com/static/images/partner-docs/gaming.png)    |     ![DeFi](https://www.covalenthq.com/static/images/partner-docs/defi.png)      |         ![KYC](https://www.covalenthq.com/static/images/partner-docs/kyc.png)          | ![NFT](https://www.covalenthq.com/static/images/partner-docs/nft_icon.png) |
|                                      ゲーム                                      |                                       デFi税                                       |                                          KYC                                           |                                    NFT                                     |
| ![Wallets](https://www.covalenthq.com/static/images/partner-docs/wallets.png) | ![ダッシュボード](https://www.covalenthq.com/static/images/partner-docs/dashboards.png) | ![オンチェーンフォレンシックス](https://www.covalenthq.com/static/images/partner-docs/forensics.png) |   ![DAO](https://www.covalenthq.com/static/images/partner-docs/dao.png)    |
|                                    Wallets                                    |                                     ダッシュボード                                      |                                     オンチェーンフォレンシックス                                     |                                  DAO データ                                   |
|   ![取引](https://www.covalenthq.com/static/images/partner-docs/trading.png)    |   ![予測](https://www.covalenthq.com/static/images/partner-docs/predictions.png)   |  ![Governance](https://www.covalenthq.com/static/images/partner-docs/governance.png)   |  ![価格](https://www.covalenthq.com/static/images/partner-docs/pricing.png)  |
|                                   DEXs & 取引                                   |                                       予測分析                                       |                                       Governance                                       |                                     価格                                     |


Web3データ駆動のdAppを構築するために使用できる [**コード・テンプレート**](https://covalenthq.notion.site/dbf062042f4a463a950f0047b9df9ec1?v=2f7a0d7267034526a641ce7215dd7512/?utm_source=klaytn&utm_medium=partner-docs) </a> をご覧ください。

## リソース
Covant API を始めるのに役立つ追加リソースをいくつか紹介します。
- [Klaytn ネットワークの詳細](https://www.covalenthq.com/docs/networks/klaytn/?utm_source=klaytn&utm_medium=partner-docs)
- [共有APIリファレンス](https://covalenthq.com/docs/api/?utm_source=klaytn&utm_medium=partner-docs)
- [プロジェクトショー ケース](https://www.covalenthq.com/docs/project-showcase/?utm_source=klaytn&utm_medium=partner-docs)
- [API FAQs](https://www.covalenthq.com/docs/developer/faq/?utm_source=klaytn&utm_medium=partner-docs)
- [Discord サポート](https://www.covalenthq.com/discord/?utm_source=klaytn&utm_medium=partner-docs)

