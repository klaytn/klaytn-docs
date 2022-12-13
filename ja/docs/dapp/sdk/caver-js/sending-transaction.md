## 初心者向けにKLAYを送る <a id="sending-klay-at-a-glance"></a>

簡単なウォームアップとしてトランザクションを送信してみましょう。 この短い例では、Klaytn ノードに接続するキーストアを作成します。 caver-jsを使用してトランザクションを作成するだけでなく、これらのすべて!

これがcaver-jsを使用するのは初めてであるかどうか心配しないでください。 以下の簡単な手順に従ってください。

### 前提条件

まず、以下のパッケージをインストールします。
* [Node.js](https://nodejs.org/en/download/) バージョン ([14.16.0](https://nodejs.org/dist/latest-v14.x/))
* [npm](https://www.npmjs.com/get-npm)
* [nvm](https://github.com/nvm-sh/nvm)
* [Solidity compiler](https://solidity.readthedocs.io/en/develop/installing-solidity.html)

*Note:* If you get an `nvm: command not found` error after installing nvm, refer to this [troubleshooting guide](https://github.com/nvm-sh/nvm/issues/2060).

### 1. アカウントを作成してキーストアをダウンロード <a id="1.-create-an-account-and-download-keystore"></a>
アカウントを作成する最も簡単な方法は、 [Klaytn Online Toolkit](https://toolkit.klaytn.foundation/misc/generateKeystore) を使用することです。

![Klaytn Online Toolkit](../images/keystore.png)

keystore ファイルをダウンロードして、 `keystore.json` のように、もっとシンプルな名前に変更しましょう。

**トランザクションを送信するにはKLAYが必要です。** [Faucet](https://baobab.wallet.klaytn.foundation/faucet) からBaobab testnetのKLAYテストを受けることができます。 詳細な手順については、 [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay) を参照してください。

### 2. プロジェクトを初期化 <a id="2.-initialize-project"></a>

まず、プロジェクトのフォルダを作成しましょう。 単純に `test` と呼びます。 コマンドラインに移動し、次のように入力します。

```
mkdir test
```

次に、フォルダに移動しましょう。

```
cd test
```

私たちは、私たちのフォルダにあります, 私たちは、caver-jsをダウンロードします. しかしその前に、 `node.js` のバージョンを確認する必要があります。なぜなら、12 または 14 を使用する必要があるからです。

以下のようにバージョンを確認できます。

```
node --version
```

バージョンが 12 または 14 でない場合は、 **必ず変更してください**。 ここでは、バージョン([14.16.0](https://nodejs.org/dist/latest-v14.x/) ) を使用します。 ノードのバージョンを変更するには、 `nvm use 14.16.0` を入力しましょう。

では、プロジェクトを初期化しましょう。

```
npm init
```

私たちは単純なテストをしているだけなので、質問に答える方法は重要ではありません。 `を押し続けて` を入力します。

```

package name: (test) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: 
license: (ISC) 
About to write to /Users/terri.k/test/package.json:

{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (はい)
```

あるいは、以下のコマンドを入力するだけで、 `Enter` をスキップすることができます。

```
npm init -y
```

### 3. caver-jsをダウンロード <a id="3.-download-caver-js"></a>

今、私たちはcaver-jsをインストールする準備ができています。


```
npm install caver-js
```

また、以下のモジュールを追加する必要があります:

```
npm I read
```

### 4. テストファイルを作成 <a id="4.-create-test-file"></a>

以下のように、 `testcaver.js` という名前のテストファイルを作成しましょう。

``` 
タッチtestcaver.js
```

KLAYを転送するトランザクションを送信するために、このファイルにコードを記述します。


### 5. Klaytn ノードに接続 <a id="5.-connect-to-klaytn-node"></a>

ブロックチェーンネットワークにトランザクションを送信しているので、Klaytnノードに接続する必要があります。 Klaytnのtestnet Baobabを使用します。

`caver-js` と `` モジュールをインポートし、Baobab ネットワーク内の Klaytn ノードに接続します:

```javascript
const Caver = require('caver-js')
const read = require('read')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')
```

### 6. キーストアを提供し、キーリングを作成し、Caverウォレットに追加 <a id="6.-add-keystore-create-keyring-and-add-to-caver-wallet"></a>

ブロックチェーンで取引を行うにはアカウントが必要です。 そのアカウント情報はキーストアに含まれています。 `loadPassword()` 関数を使って、ターミナルにパスワードプロンプトを実装できます。 関数は次のようになります。

```
async function loadPassword() {
    return new Promise((resolve, reject)=> {
        read({ prompt: 'Password: ', silent: true }, function(er, password) {
            if(er) {
                reject(er)
                return
            }
            resolve(password)
        })

    })

}
```

同じディレクトリに存在するキーストアファイルとともに、プロンプトから入力されたパスワード。 復号化され、 `キーリング` として保存されます。

その後、 `キーリング` がウォレットに保存されます。 以下の行を追加します。

```
async function sendKlay() {
// Read keystore json file
  const fs = require('fs')
    const keystore = fs.readFileSync('./keystore.json', 'utf8')
    const password = await loadPassword()

    // Decrypt keystore and create
    const keyring = caver.wallet.keyring.decrypt(keystore, password)
    console.log(keyring)

    // Add to caver.wallet
    caver.wallet.add(keyring)

    }
```

### 7. トランザクションを送信 <a id="7.-send-transaction"></a>

これで、KLAYを転送するためのトランザクションを作成します。 このタイプのトランザクションは「値転送トランザクション」と呼ばれます。 それぞれのパラメータを分解しましょう。

`の` アドレスは、アップロードしたキーストアに由来します。 `宛の` アドレスは、KLAYの受信者であり、任意のアドレスを使用することができます。 `値`の場合は、便利に `caver.utils.toPeb()` を使用してKLAYをpebに変換できます。 ここでは10KLAYをお送りします。 `ガス` 用

```

    // Create value transfer transaction
    const vt = caver.transaction.valueTransfer.create({
        from: keyring.address,
        to: '0x8084fed6b1847448c24692470fc3b2ed87f9eb47',
        value: caver.utils.toPeb(10, 'KLAY'),
        gas: 25000,
    })

    // Sign to the transaction
    const signed = await caver.wallet.sign(keyring.address, vt)

    // Send transaction to the Klaytn blockchain platform (Klaytn)
    const receipt = await caver.rpc.klay.sendRawTransaction(signed)
    console.log(receipt)
}
```

最後に追加することを忘れないでください：

```
sendKlay()
```

### 8. コードを実行する <a id="8.-run-the-code"></a>

今書いたコードを実行してみましょう。

```
node testcaver.js
```

![パスワードを入力してください](../images/prompt.png)


結果は次のようになります。

```
SingleKeyring {
  _address: '0x658750eaa5d4db896d9ad0de79e00d551e0bf808',
  _key: PrivateKey {
    _privateKey: '0xea296e1bc67ba18a9ca87161c9e4fe486bb805ffff4f7a453f621a45e341e076'
  }
}
{
  blockHash: '0x0c29221072f049cf08ec2112755cbc0bc55289de5337faf2911147a4d8229693',
  blockNumber: '0x64e399d',
  contractAddress: null,
  effectiveGasPrice: '0x5d21dba00',
  from: '0x658750eaa5d4db896d9ad0de79e00d551e0bf808',
  gas: '0x61a8',
  gasPrice: '0xba43b7400',
  gasUsed: '0x5208',
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  nonce: '0x0',
  senderTxHash: '0xdef371f3b194de1d6b6b678a3181e0e961549f2bc8f6391f97f48c8ea995225e',
  signatures: [
    {
      V: '0x7f6',
      R: '0x6425f98285f8e680a9cbfe32de824cceedd7fdca91ba9f7fa513898bc0d01ea8',
      S: '0x37718277df2a7a940212c9adb411f52d79d8cced784177c41224dca1a1ef122c'
    }
  ],
  status: '0x1',
  to: '0x7f1d6235b79688169fd6e15c4e8f540d6799dc75',
  transactionHash: '0xdef371f3b194de1d6b6b678a3181e0e961549f2bc8f6391f97f48c8ea995225e',
  transactionIndex: '0x2',
  type: 'TxTypeValueTransfer',
  typeInt: 8,
  value: '0x8ac7230489e80000'
}
```

トランザクションの詳細は [Klaytnfinder](https://baobab.klaytnfinder.io/) または [Klaytnscope](https://scope.klaytn.com) で `transactionHash` を使用して確認できます。

### 9. コード全体 <a id="9.-run-the-code"></a>

```
const Caver = require('caver-js')
const read = require('read')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')

async function sendKLAY() {
    // Read keystore json file
        const fs = require('fs')
    const keystore = fs.readFileSync('./keystore.json', 'utf8')
    const password = await loadPassword()

    // Decrypt keystore and create
    const keyring = caver.wallet.keyring.decrypt(keystore, password)
    console.log(keyring)

    // Add to caver.wallet
    caver.wallet.add(keyring)

    // Create value transfer transaction
    const vt = caver.transaction.valueTransfer.create({
        from: keyring.address,
        to: '0x7f1D6235B79688169fd6e15C4E8f540d6799dC75',
        value: caver.utils.toPeb(10, 'KLAY'),
        gas: 25000,
    })

    // Sign to the transaction
    const signed = await caver.wallet.sign(keyring.address, vt)

    // Send transaction to the Klaytn blockchain platform (Klaytn)
    const receipt = await caver.rpc.klay.sendRawTransaction(signed)
    console.log(receipt)
}

async function loadPassword() {
    var read = require('read')

    return new Promise((resolve, reject)=> {
        read({ prompt: 'Password: ', silent: true }, function(er, password) {
            if(er) {
                reject(er)
                return
            }
            resolve(password)
        })

    })

}

sendKLAY()
```

あなたがcaver-jsを使ってtransacionを提出したことに自信を持っていることを願っています。 ご不明な点がございましたら、お気軽に [Klaytn Forum](https://forum.klaytn.foundation/) をご覧ください。