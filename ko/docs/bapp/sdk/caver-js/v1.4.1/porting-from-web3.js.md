# web3.js에서 포팅하기 <a id="porting-from-web-3js"></a>

caver-js가 [web3.js](https://github.com/ethereum/web3.js/)에서 발전했기 때문에, caver-js의 사용 패턴은 web3.js의 사용 패턴과 매우 유사합니다. 이는 web3.js를 사용하여 개발된 소프트웨어를 caver-js로 쉽게 변환할 수 있음을 의미합니다. 다음 예제는 각각 web3.js 및 caver-js에서 사용되는 코드 패턴입니다.

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
