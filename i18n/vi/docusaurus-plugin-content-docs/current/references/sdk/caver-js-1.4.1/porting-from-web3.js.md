---
sidebar_label: Di chuyển từ web.3js
---

# Di chuyển từ web.3js

Vì caver-js được phát triển từ [web3.js](https://github.com/ethereum/web3.js/), mô thức sử dụng của caver-js khá tương đồng với web3.js. Điều này nghĩa là một phần mềm được phát triển bằng web3.js có thể dễ dàng được chuyển đổi sang caver-js. Các ví dụ sau lần lượt là các mô thức mã được dùng trong web3.js và caver-js.

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
