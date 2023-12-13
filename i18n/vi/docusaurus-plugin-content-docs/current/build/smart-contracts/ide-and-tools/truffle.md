# Truffle

## Khả năng tương thích với Truffle <a id="compatibility-with-truffle"></a>

Trong Klaytn, một hợp đồng thông minh được viết bằng Solidity có thể được biên dịch và triển khai thông qua Truffle. Hiện tại, Klaytn hỗ trợ đến Truffle v5.0.26, phiên bản mới nhất vào thời điểm tạo bài viết này. Vui lòng tìm thông tin chi tiết về Truffle trên các trang web bên dưới.

- [Tổng quan về Truffle](https://trufflesuite.com/docs/truffle/overview)
- [Kho lưu trữ Truffle](https://github.com/trufflesuite/truffle)

Bạn có thể cài đặt Truffle như sau:

```text
$ sudo npm install -g truffle
```

Nếu bạn có EN cục bộ đang chạy, bạn có thể triển khai hợp đồng trực tiếp với khung truffle. Để biết thêm chi tiết, hãy tham khảo [liên kết](../deploy/ken.md#deploying-a-smart-contract-using-truffle) này.

Nếu bạn muốn triển khai với nút EN từ xa, bạn nên sử dụng [truffle-hdwallet-provider-klaytn](https://www.npmjs.com/package/truffle-hdwallet-provider-klaytn).

## Định cấu hình truffle-hdwallet-provider-klaytn <a id="configuring-truffle-hdwallet-provider-klaytn"></a>

truffle-hdwallet-provider-klaytn là một nhà cung cấp ví JavaScript HD được rẽ nhánh từ truffle-hdwallet-provider.

Cài đặt như sau:

```text
$ nvm use 10
$ yarn install truffle-hdwallet-provider-klaytn@1.0.18
```

```text
$ nvm use 12 # for node v12 and higher
$ yarn install truffle-hdwallet-provider-klaytn@1.4.1
```

Thiết lập `truffle-config.js` như bên dưới.

### Sử dụng thuật ghi nhớ <a id="using-a-mnemonic"></a>

```javascript
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const mnemonic = "mountains supernatural bird ...";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8551,
      network_id: "*", // Match any network id
    },
    klaytn: {
      provider: () => {
        const mnemonic = JSON.parse(
          fs.readFileSync(path.resolve(__dirname) + "/mnemonics.js")
        );

        return new HDWalletProvider(
          mnemonic,
          "https://public-en-baobab.klaytn.net",
          0,
          mnemonic.length
        );
      },
      network_id: "1001", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: null,
    },
    kasBaobab: {
      provider: () => {
        const option = {
          headers: [
            {
              name: "Authorization",
              value:
                "Basic " +
                Buffer.from(accessKeyId + ":" + secretAccessKey).toString(
                  "base64"
                ),
            },
            { name: "x-chain-id", value: "1001" },
          ],
          keepAlive: false,
        };
        return new HDWalletProvider(
          mnemonic,
          new Caver.providers.HttpProvider(
            "https://node-api.klaytnapi.com/v1/klaytn",
            option
          )
        );
      },
      network_id: "1001", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: "25000000000",
    },
    kasCypress: {
      provider: () => {
        const option = {
          headers: [
            {
              name: "Authorization",
              value:
                "Basic " +
                Buffer.from(accessKeyId + ":" + secretAccessKey).toString(
                  "base64"
                ),
            },
            { name: "x-chain-id", value: "8217" },
          ],
          keepAlive: false,
        };
        return new HDWalletProvider(
          cypressMnemonic,
          new Caver.providers.HttpProvider(
            "https://node-api.klaytnapi.com/v1/klaytn",
            option
          )
        );
      },
      network_id: "8217", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: "25000000000",
    },
    baobab: {
      provider: () => {
        return new HDWalletProvider(mnemonic, "http://your.baobab.en:8551");
      },
      network_id: "1001", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: null,
    },
    cypress: {
      provider: () => {
        return new HDWalletProvider(mnemonic, "http://your.cypress.en:8551");
      },
      network_id: "8217", //Klaytn mainnet's network id
      gas: "8500000",
      gasPrice: null,
    },
  },
};
```

### Sử dụng khóa riêng tư <a id="using-a-private-key"></a>

```javascript
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const privateKey = "0x123 ...";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8551,
      network_id: "*", // Match any network id
    },
    klaytn: {
      provider: () => {
        const pks = JSON.parse(
          fs.readFileSync(path.resolve(__dirname) + "/privateKeys.js")
        );

        return new HDWalletProvider(
          pks,
          "https://public-en-baobab.klaytn.net",
          0,
          pks.length
        );
      },
      network_id: "1001", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: null,
    },
    kasBaobab: {
      provider: () => {
        const option = {
          headers: [
            {
              name: "Authorization",
              value:
                "Basic " +
                Buffer.from(accessKeyId + ":" + secretAccessKey).toString(
                  "base64"
                ),
            },
            { name: "x-chain-id", value: "1001" },
          ],
          keepAlive: false,
        };
        return new HDWalletProvider(
          privateKey,
          new Caver.providers.HttpProvider(
            "https://node-api.klaytnapi.com/v1/klaytn",
            option
          )
        );
      },
      network_id: "1001", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: "25000000000",
    },
    kasCypress: {
      provider: () => {
        const option = {
          headers: [
            {
              name: "Authorization",
              value:
                "Basic " +
                Buffer.from(accessKeyId + ":" + secretAccessKey).toString(
                  "base64"
                ),
            },
            { name: "x-chain-id", value: "8217" },
          ],
          keepAlive: false,
        };
        return new HDWalletProvider(
          cypressPrivateKey,
          new Caver.providers.HttpProvider(
            "https://node-api.klaytnapi.com/v1/klaytn",
            option
          )
        );
      },
      network_id: "8217", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: "25000000000",
    },
    baobab: {
      provider: () => {
        return new HDWalletProvider(privateKey, "http://api.baobab.klaytn.net:8651");
      },
      network_id: "1001", //Klaytn baobab testnet's network id
      gas: "8500000",
      gasPrice: null,
    },
    cypress: {
      provider: () => {
        return new HDWalletProvider(privateKey, "https://public-en-cypress.klaytn.net");
      },
      network_id: "8217", //Klaytn mainnet's network id
      gas: "8500000",
      gasPrice: null,
    },
  },
};
```

**CẢNH BÁO: Đặc biệt cẩn trọng không để lộ mã ghi nhớ hoặc khóa riêng tư của bạn.**

Triển khai trên Klaytn:

```bash
$ truffle deploy --network baobab  # testnet
$ truffle deploy --network cypress # mainnet
```

Thực hiện giao dịch trên Klaytn : (sử dụng ví dụ từ [Bắt đầu nhanh Tài liệu Truffle - Tạo dự án](https://www.trufflesuite.com/docs/truffle/quickstart#creating-a-project))

```bash
$ truffle console --network baobab
truffle(baobab)> Migrations.deployed().then(function(instance) {return instance.setCompleted(3)}) // making transaction
{
  tx: '0x734676311194c1ab8e004e2990e414b7b47a9d0a8506682707f5db03fa6dcee0',
  receipt: {
    blockHash: '0xdf9d77ef893a70b3a3f073525cdf5b2ee36620a3ac81815437788e4cf121678d',
    blockNumber: 65284860,
    contractAddress: null,
    from: '0x50c82047a414d2aad88ae67a5f02c311d2d86e69',
    gas: '0x500000',
    gasPrice: '0x5d21dba00',
    gasUsed: 27001,
    input: '0xfdacd5760000000000000000000000000000000000000000000000000000000000000003',
    nhật ký: [],
    nhật kýBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    nonce: '0x1047',
    senderTxHash: '0x734676311194c1ab8e004e2990e414b7b47a9d0a8506682707f5db03fa6dcee0',
    signatures: [ [Object] ],
    trạng thái: true,
    to: '0x69527b5f0078ae1757b631af155fa9be21ef6a85',
    transactionHash: '0x734676311194c1ab8e004e2990e414b7b47a9d0a8506682707f5db03fa6dcee0',
    transactionIndex: 0,
    type: 'TxTypeLegacyTransaction',
    typeInt: 0,
    value: '0x0',
    cumulativeGasUsed: undefined,
    rawLogs: []
  },
  nhật ký: []
}

truffle(baobab)> Migrations.deployed().then(function(instance) {return instance.last_completed_migration.call()}) // read public variable
BN { negative: 0, words: [ 3, <1 empty item> ], length: 1, red: null }
```
