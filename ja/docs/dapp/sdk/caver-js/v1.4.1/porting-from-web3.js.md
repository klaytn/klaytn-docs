# web.3jsからのエクスポート <a id="porting-from-web-3js"></a>

caver-js は [web3.js](https://github.com/ethereum/web3.js/)から進化してきたので、 cave-js の利用パターンは web3.js と非常に似ています。 つまり、web3.jsを使って開発されたソフトウェアは、簡単にcaver-jsに変換できます。 以下の例は、web3.jsとcaver-jsでそれぞれ使用されているコードパターンです。

```text
const Web3 = require('web3');
const web3 = new Web3(new web3.providers.HttpProvider('http://localhost:8545'));

web3.eth.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1').then(console.log)
```

```text
const Caver = require('caver-js');
const caver = new Caver(new Caver.providers.HttpProvider('http://localhost:8545'));

caver.klay.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1').then(console.log)
```
