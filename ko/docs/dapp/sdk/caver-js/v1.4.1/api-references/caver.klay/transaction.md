## call <a id="call"></a>

```javascript
caver.klay.call(callObject [, defaultBlock] [, callback])
```
메시지 호출 트랜잭션을 실행합니다. 이 트랜잭션은 노드의 Klaytn 가상머신에서 직접 실행되지만 블록체인에 기록되지 않습니다.

**Parameters**

| 이름           | 타입                   | 설명                                                                                                                     |
| ------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| callObject   | Object               | 호출 시 from 속성도 선택 사항인 트랜잭션 객체입니다. [인코딩된 함수 호출](../caver.klay.abi.md#encodefunctioncall)이 반드시 트랜잭션 객체의 데이터 필드에 주어져야 합니다. |
| defaultBlock | Number &#124; String | (선택 사항) 이 파라미터에 값을 전달하면 [caver.klay.defaultBlock](./block.md#defaultblock)에 설정된 기본 블록을 사용하지 않습니다..                     |
| callback     | Function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                   |

**리턴값**

`프로미스`는 `String`을 반환합니다: 스마트 컨트랙트 함수 리턴값과 같이 호출의 결과로 리턴된 값입니다.

**예시**

```javascript
> caver.klay.call({
    to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", // contract address
    data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
})
.then(console.log);

"0x000000000000000000000000000000000000000000000000000000000000000a"
```

## estimateGas <a id="estimategas"></a>

```javascript
caver.klay.estimateGas(callObject [, callback])
```
메세지 호출 혹은 트랜잭션을 실행하고 모의 호출/트랜잭션에 사용된 가스를 반환합니다.

**Parameters**

| 이름         | 타입       | 설명                                                                                                                     |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| callObject | Object   | 호출 시 from 속성도 선택 사항인 트랜잭션 객체입니다. [인코딩된 함수 호출](../caver.klay.abi.md#encodefunctioncall)이 반드시 트랜잭션 객체의 데이터 필드에 주어져야 합니다. |
| callback   | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                   |

**리턴값**

`Promise`는 `Number`를 반환합니다 - 모의 호출/트랜잭션에 사용된 가스.

**예시**

```javascript
> caver.klay.estimateGas({
    to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
    data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
})
.then(console.log);

40
```

## estimateComputationCost <a id="estimatecomputationcost"></a>

```javascript
caver.klay.estimateComputationCost(callObject [, defaultBlock] [, callback])
```
트랜잭션을 실행하는 데에 들 연산 비용의 추정치를 생성하여 반환합니다. Klaytn은 한 트랜잭션을 실행하는 데에 너무 많은 시간이 걸리지 않도록 하기 위해 현재 트랜잭션당 연산 비용을 `100000000`으로 제한합니다. 이때 발생한 트랜잭션은 블록체인에 추가되지 않습니다.

**Parameters**

| 이름           | 타입                   | 설명                                                                                                                     |
| ------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| callObject   | Object               | 호출 시 from 속성도 선택 사항인 트랜잭션 객체입니다. [인코딩된 함수 호출](../caver.klay.abi.md#encodefunctioncall)이 반드시 트랜잭션 객체의 데이터 필드에 주어져야 합니다. |
| defaultBlock | Number &#124; String | (선택 사항) 이 파라미터에 값을 전달하지 않으면 [caver.klay.defaultBlock](./block.md#defaultblock)에 설정된 기본 블록을 사용합니다.                      |
| callback     | Function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                   |

**리턴값**

`프로미스`는 `Number`를 반환합니다 - 사용된 연산 비용(Computation Cost)의 양입니다.

**예시**

```javascript
> caver.klay.estimateComputationCost({
        to: '0xf796b2F18507Ec8F8C19e9F0c03092888093ebAc',
        data : '0xd14e62b80000000000000000000000000000000000000000000000000000000000000022'
    }).then(console.log);
0x5773

// With 'latest' block tag
> caver.klay.estimateComputationCost({
        to: '0xf796b2F18507Ec8F8C19e9F0c03092888093ebAc',
        data : '0xd14e62b80000000000000000000000000000000000000000000000000000000000000022'
    }, 'latest').then(console.log);
0x5773
```

## decodeTransaction <a id="decodetransaction"></a>

```javascript
caver.klay.decodeTransaction(rawTransaction)
```
RLP-encoded 트랜잭션인 주어진 `rawTransaction`의 모든 값을 디코딩한 트랜잭션 객체를 반환합니다. 레거시 트랜잭션을 제외한 모든 트랜잭션 타입이 트랜잭션 발신자와 트랜잭션 수수료 납부자의 다중 서명을 가질 수 있으므로, 기존에 리턴된 v, r, s 필드들과 payerV, payerR, payerS는 발신자외 트랜잭션 수수료 납부자의 0번째 서명입니다.

**참고** caver.klay.decodeTransaction는 **v1.0.1-rc.8**에서 지원됩니다.  이 기능을 사용하려면 [v1.0.1-rc.8](https://www.npmjs.com/package/caver-js/v/8.1.1-rc.8) 또는 그 이상을 설치하세요.

**참고** 다중 서명을 지원하기 위해 `signatures` 및 `feePayerSignatures` 속성이 caver-js [v1.2.0-rc.3](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.3) 부터 추가되었습니다.

**Parameters**

| 이름             | 타입     | 설명                 |
| -------------- | ------ | ------------------ |
| rawTransaction | String | RLP 인코딩된 트랜잭션 데이터. |

**리턴값**

| 타입     | 설명                                                                                                              |
| ------ | --------------------------------------------------------------------------------------------------------------- |
| Object | 트랜잭션 객체입니다. 반환되는 트랜잭션 객체가 가지는 속성은 트랜잭션 타입에 따라 다릅니다. 각 트랜잭션 타입의 속성은 [ SendTransaction](#sendtransaction)을 참조하세요. |

**예시**

```javascript
// Basic Transaction
> caver.klay.decodeTransaction('0xf86b038505d21dba00843b9ac9ff94d03227635c90c7986f0e3a4e551cefbca8c5531685174876e8008026a06fc7412ad1801b4790e7a5a5097fdbef01bc9fe1b970d08232184d110226c221a04665f772edbc4ba4dfbf189d89a9b9cb1e5cdcea0fd5a8b1a497b9c275e5267c')
{ 
    type: 'LEGACY',
    nonce: '0x03',
    gasPrice: '0x05d21dba00',
    gas: '0x3b9ac9ff',
    to: '0xd03227635c90c7986f0e3a4e551cefbca8c55316',
    value: '0x174876e800',
    data: '0x',
    v: '0x26',
    r: '0x6fc7412ad1801b4790e7a5a5097fdbef01bc9fe1b970d08232184d110226c221',
    s: '0x4665f772edbc4ba4dfbf189d89a9b9cb1e5cdcea0fd5a8b1a497b9c275e5267c',
    signatures: [ 
        '0x26',
        '0x6fc7412ad1801b4790e7a5a5097fdbef01bc9fe1b970d08232184d110226c221',
        '0x4665f772edbc4ba4dfbf189d89a9b9cb1e5cdcea0fd5a8b1a497b9c275e5267c' 
    ]
}

// Fee Delegation
> caver.klay.decodeTransaction('0x09f8dd2c8505d21dba00830dbba094a36960d00c9cbf10e80928eead73ff308193bde70194ad8d5b8c7da3746df7de39c41fa572d660aa8e91f847f845824e43a099c0a4c85bb9f2c0be2646b963201680e2f76128e4fd1f54d3f9cf80d1d117e7a069b62aa6640c8aa3606a67869fe062dde1c61a60aea5c5161550ff11ee71c24b946a4b71a6796c2fd376fb0526385e0783da86a039f847f845824e43a0bdfdc50649c8f52930a330b2e44d92f8943b28c7ff7edd8ff7f2f95e617c0d77a06e96bdd983494f6967f1a26d2f0ae991a4e8ebef1ac3c9029251a18c19002ab3')
{ 
    type: 'FEE_DELEGATED_VALUE_TRANSFER',
    nonce: '0x2c',
    gasPrice: '0x05d21dba00',
    gas: '0x0dbba0',
    to: '0xa36960d00c9cbf10e80928eead73ff308193bde7',
    value: '0x01',
    from: '0xad8d5b8c7da3746df7de39c41fa572d660aa8e91',
    v: '0x4e43',
    r: '0x99c0a4c85bb9f2c0be2646b963201680e2f76128e4fd1f54d3f9cf80d1d117e7',
    s: '0x69b62aa6640c8aa3606a67869fe062dde1c61a60aea5c5161550ff11ee71c24b',
    signatures: [
        [ 
            '0x4e43',
            '0x99c0a4c85bb9f2c0be2646b963201680e2f76128e4fd1f54d3f9cf80d1d117e7',
            '0x69b62aa6640c8aa3606a67869fe062dde1c61a60aea5c5161550ff11ee71c24b' 
        ] 
    ],
    feePayer: '0x6a4b71a6796c2fd376fb0526385e0783da86a039',
    payerV: '0x4e43',
    payerR: '0xbdfdc50649c8f52930a330b2e44d92f8943b28c7ff7edd8ff7f2f95e617c0d77',
    payerS: '0x6e96bdd983494f6967f1a26d2f0ae991a4e8ebef1ac3c9029251a18c19002ab3',
    feePayerSignatures: [ 
        [ 
            '0x4e43',
            '0xbdfdc50649c8f52930a330b2e44d92f8943b28c7ff7edd8ff7f2f95e617c0d77',
            '0x6e96bdd983494f6967f1a26d2f0ae991a4e8ebef1ac3c9029251a18c19002ab3' 
        ] 
    ]
}

// Partial Fee Delegation
> caver.klay.decodeTransaction('0x2af902ca0a8505d21dba00843b9ac9ff80809490b3e9a3770481345a7f17f22f16d020bccfd33eb901fe608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029802180f845f84325a0d8cdc1219df8bbca8a00255420a5bec0f602e6266b76ce7dcf5b0b26bd7fe3b9a05557496a3a17f784c3eb40acbb526dfbc20ae6b00c633a0186d804cd9137b13e9433f524631e573329a550296f595c820d6c65213ff845f84325a041a4c4bf0e3039d04472beae4135a14c26ae4c88bad08d5f0acf61f7c0eb60dfa03d1658f38e5c2089d64985fb33cb13db2e41cde6958ba2cfcfaba685a7f565e2')
{ 
    type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO',
    nonce: '0x0a',
    gasPrice: '0x05d21dba00',
    gas: '0x3b9ac9ff',
    to: '0x',
    value: '0x',
    from: '0x90b3e9a3770481345a7f17f22f16d020bccfd33e',
    data: '0x608060405234801561001057600080fd5b506101de806100206000396000f3006080604052600436106100615763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631a39d8ef81146100805780636353586b146100a757806370a08231146100ca578063fd6b7ef8146100f8575b3360009081526001602052604081208054349081019091558154019055005b34801561008c57600080fd5b5061009561010d565b60408051918252519081900360200190f35b6100c873ffffffffffffffffffffffffffffffffffffffff60043516610113565b005b3480156100d657600080fd5b5061009573ffffffffffffffffffffffffffffffffffffffff60043516610147565b34801561010457600080fd5b506100c8610159565b60005481565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604081208054349081019091558154019055565b60016020526000908152604090205481565b336000908152600160205260408120805490829055908111156101af57604051339082156108fc029083906000818181858888f193505050501561019c576101af565b3360009081526001602052604090208190555b505600a165627a7a72305820627ca46bb09478a015762806cc00c431230501118c7c26c30ac58c4e09e51c4f0029',
    humanReadable: false,
    feeRatio: '0x21',
    codeFormat: '0x',
    v: '0x25',
    r: '0xd8cdc1219df8bbca8a00255420a5bec0f602e6266b76ce7dcf5b0b26bd7fe3b9',
    s: '0x5557496a3a17f784c3eb40acbb526dfbc20ae6b00c633a0186d804cd9137b13e',
    signatures: [ 
        [ 
            '0x25',
            '0xd8cdc1219df8bbca8a00255420a5bec0f602e6266b76ce7dcf5b0b26bd7fe3b9',
            '0x5557496a3a17f784c3eb40acbb526dfbc20ae6b00c633a0186d804cd9137b13e' 
        ] 
    ],
    feePayer: '0x33f524631e573329a550296f595c820d6c65213f',
    payerV: '0x25',
    payerR: '0x41a4c4bf0e3039d04472beae4135a14c26ae4c88bad08d5f0acf61f7c0eb60df',
    payerS: '0x3d1658f38e5c2089d64985fb33cb13db2e41cde6958ba2cfcfaba685a7f565e2',
    feePayerSignatures: [ 
        [ 
            '0x25',
            '0x41a4c4bf0e3039d04472beae4135a14c26ae4c88bad08d5f0acf61f7c0eb60df',
            '0x3d1658f38e5c2089d64985fb33cb13db2e41cde6958ba2cfcfaba685a7f565e2' 
        ] 
    ]
}
```

## getTransaction <a id="gettransaction"></a>

```javascript
caver.klay.getTransaction(transactionHash [, callback])
```
주어진 트랜잭션 해시에 대응하는 트랜잭션을 반환합니다.

**Parameters**

| 이름              | 타입       | 설명                                                                   |
| --------------- | -------- | -------------------------------------------------------------------- |
| transactionHash | String   | 트랜잭션 해시.                                                             |
| callback        | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `객체`를 반환합니다 - 트랜잭션 객체를 반환하거나 또는 해당하는 트랜잭션을 찾을 수 없는 경우 `null`을 반환합니다.

| 이름                 | 타입            | 설명                                                                                                                                               |
| ------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| blockHash          | 32바이트 크기 DATA | 트랜잭션이 담긴 블록의 해시입니다. 보류 중인 상태이면 `null`을 반환합니다.                                                                                                    |
| blockNumber        | QUANTITY      | 트랜잭션이 담긴 블록의 번호입니다. 보류 중인 상태이면 `null`을 반환합니다.                                                                                                    |
| codeFormat         | String        | (선택사항) 스마트 컨트랙트 코드의 코드 형식입니다.                                                                                                                    |
| feePayer           | 20바이트 크기 DATA | (선택사항) 트랜잭션 수수료 납부자의 주소입니다.                                                                                                                      |
| feePayerSignatures | Array         | (선택사항) 트랜잭션 수수료 납부자의 서명 객체들로 이루어진 배열입니다. 각 서명 객체에는 (V, R, S) 등 세 필드가 있습니다. V는 ECDSA 복구 ID를 담고 있습니다. R은 ECDSA 서명 r을 담고 있고 S는 ECDSA 서명 s를 담고 있습니다. |
| feeRatio           | QUANTITY      | (선택사항) 트랜잭션 수수료 납부자의 부담 비율입니다. 이 값이 30이면, 트랜잭션 수수료의 30%를 트랜잭션 수수료 납부자가 지불합니다. 나머지 70%는 트랜잭션 발신자가 지불합니다.                                          |
| from               | 20바이트 크기 DATA | 트랜잭션 발신자의 주소입니다.                                                                                                                                 |
| gas                | QUANTITY      | 트랜잭션 발신자에 의해 설정된 가스양입니다.                                                                                                                         |
| 가스 가격              | QUANTITY      | peb에서 트랜잭션 발신자에 의해 설정된 가스 가격입니다.                                                                                                                 |
| 해시                 | 32바이트 크기 DATA | 트랜잭션의 해시입니다.                                                                                                                                     |
| humanReadable      | Boolean       | (선택사항) Human-Readable Address이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.                                                                            |
| key                | String        | (선택사항) 새로 생성된 계정의 키입니다.                                                                                                                          |
| input              | DATA          | (선택사항) 트랜잭션과 함께 전송된 데이터입니다.                                                                                                                      |
| 논스                 | QUANTITY      | 트랜잭션 발신자가 이 트랜잭션 이전까지 전송했던 트랜잭션의 개수입니다.                                                                                                          |
| senderTxHash       | 32바이트 크기 DATA | (선택사항) 트랜잭션 수수료 납부자의 주소와 서명이 없는 트랜잭션 해시입니다. 이 값은 수수료를 위임하지 않은 트랜잭션의 `hash` 값과 항상 동일합니다.                                                          |
| 서명                 | Array         | 서명 객체의 배열입니다. 각 서명 객체에는 (V, R, S) 등 세 필드가 있습니다. V는 ECDSA 복구 ID를 담고 있습니다. R은 ECDSA 서명 r을 담고 있고 S는 ECDSA 서명 s를 담고 있습니다.                            |
| to                 | 20바이트 크기 DATA | 트랜잭션 수신자의 주소입니다. 컨트랙트 생성 트랜잭션이면 `null`을 반환합니다.                                                                                                   |
| transactionIndex   | QUANTITY      | 블록 내 트랜잭션의 인덱스 위치의 정숫값입니다. 보류 중인 상태이면 `null`을 반환합니다.                                                                                             |
| 형식                 | String        | 트랜잭션의 유형을 나타내는 문자열입니다.                                                                                                                           |
| typeInt            | QUANTITY      | 트랜잭션의 유형을 나타내는 정수입니다.                                                                                                                            |
| value              | QUANTITY      | peb로 전송된 값입니다.                                                                                                                                   |


**예시**

```javascript
> caver.klay.getTransaction('0x2d26f602cfbb4c662931592bf2c4ee18d29f09683be5b9e8d589ff935fca0b97')
  .then(console.log);
{ 
    blockHash: '0xd6f3bc2bd7853ed423677766b5332c3e55d900abf4252ede196661cd58e817a6',
    blockNumber: 141766,
    from: '0x8948Ab8526fDA9a7349Ee8FCa5372e46d0268777',
    gas: 20000000,
    gasPrice: '25000000000',
    hash: '0x2d26f602cfbb4c662931592bf2c4ee18d29f09683be5b9e8d589ff935fca0b97',
    input: '0x',
    nonce: 8,
    signatures:[{ 
        V: '0xfe9',
        R: '0x76a0ac07a371fe3849f46a115d62830e611e62fab91714bb66fe18a937557666',
        S: '0x1daace52366434ab11287d4f5ebe9c87f314e45d13f05093bbcdd5862fcf462e' 
    }],
    to: '0x2259cFDae62F9853f84298aAf20C999391B1c6a3',
    transactionIndex: 0,
    type: 'TxTypeLegacyTransaction',
    typeInt: 0,
    value: '1' 
}
```

## getTransactionBySenderTxHash <a id="gettransactionbysendertxhash"></a>

```javascript
caver.klay.getTransactionBySenderTxHash(senderTxHash [, callback])
```
주어진 `senderTxHash`에 대응하는 트랜잭션의 정보를 반환합니다. 이 API는 `--sendertxhashindexing`에 의해 인덱싱 기능이 노드에서 활성화되어 있을 때만 올바른 결과를 반환합니다. [isSenderTxHashIndexingEnabled](./config.md#issendertxhashindexingenabled)을 사용해 인덱싱 기능이 활성화되었는지 아닌지를 확인합니다.

**Parameters**

| 이름           | 타입       | 설명                                                                                                                                   |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| senderTxHash | String   | 트랜잭션 발신자만 서명한 트랜잭션의 해시입니다. 이에 대한 자세한 내용은 [SenderTxHash](../../../../../../klaytn/design/transactions/README.md#sendertxhash)를 참고하세요. |
| callback     | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                 |

**리턴값**

`프로미스`는 `객체`를 반환합니다 - 트랜잭션 객체를 반환하거나 또는 해당하는 트랜잭션을 찾을 수 없는 경우 `null`을 반환합니다.

| 이름                 | 타입            | 설명                                                                                                                                                                               |
| ------------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | 32바이트 크기 DATA | 트랜잭션이 담긴 블록의 해시입니다. 보류 중인 상태이면 `null`을 반환합니다.                                                                                                                                    |
| blockNumber        | QUANTITY      | 트랜잭션이 담긴 블록의 번호입니다. 보류 중인 상태이면 `null`을 반환합니다.                                                                                                                                    |
| codeFormat         | String        | (선택사항) 스마트 컨트랙트 코드의 코드 형식입니다.                                                                                                                                                    |
| feePayer           | 20바이트 크기 DATA | 트랜잭션 수수료 납부자의 주소입니다.                                                                                                                                                             |
| feePayerSignatures | Array         | 트랜잭션 수수료 납부자의 서명 객체들로 이루어진 배열입니다. 각 서명 객체에는 (V, R, S) 등 세 필드가 있습니다. V는 ECDSA 복구 ID를 담고 있습니다. R은 ECDSA 서명 r을 담고 있고 S는 ECDSA 서명 s를 담고 있습니다.                                        |
| feeRatio           | QUANTITY      | (선택사항) 트랜잭션 수수료 납부자의 부담 비율입니다. 이 값이 30이면, 트랜잭션 수수료의 30%를 트랜잭션 수수료 납부자가 지불합니다. 나머지 70%는 트랜잭션 발신자가 지불합니다.                                                                          |
| from               | 20바이트 크기 DATA | 트랜잭션 발신자의 주소입니다.                                                                                                                                                                 |
| gas                | QUANTITY      | 트랜잭션 발신자에 의해 설정된 가스양입니다.                                                                                                                                                         |
| 가스 가격              | QUANTITY      | peb에서 트랜잭션 발신자에 의해 설정된 가스 가격입니다.                                                                                                                                                 |
| 해시                 | 32바이트 크기 DATA | 트랜잭션의 해시입니다.                                                                                                                                                                     |
| humanReadable      | Boolean       | (선택사항) Human-Readable Address이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.                                                                                                            |
| key                | String        | (선택사항) 새로 생성된 계정의 키입니다.                                                                                                                                                          |
| input              | DATA          | (선택사항) 트랜잭션과 함께 전송된 데이터입니다.                                                                                                                                                      |
| 논스                 | QUANTITY      | 트랜잭션 발신자가 이 트랜잭션 이전까지 전송했던 트랜잭션의 개수입니다.                                                                                                                                          |
| senderTxHash       | 32바이트 크기 DATA | 트랜잭션 발신자만 서명한 트랜잭션의 해시입니다. 이에 대한 자세한 내용은 [SenderTxHash](../../../../../../klaytn/design/transactions/README.md#sendertxhash)를 참고하세요. 이 값은 수수료 위임된 트랜잭션이 아닌 경우의 `hash`와 항상 동일합니다. |
| 서명                 | Array         | 서명 객체의 배열입니다. 각 서명 객체에는 (V, R, S) 등 세 필드가 있습니다. V는 ECDSA 복구 ID를 담고 있습니다. R은 ECDSA 서명 r을 담고 있고 S는 ECDSA 서명 s를 담고 있습니다.                                                            |
| to                 | 20바이트 크기 DATA | 트랜잭션 수신자의 주소입니다. 컨트랙트 생성 트랜잭션이면 `null`을 반환합니다.                                                                                                                                   |
| transactionIndex   | QUANTITY      | 블록 내 트랜잭션의 인덱스 위치의 정숫값입니다. 보류 중인 상태이면 `null`을 반환합니다.                                                                                                                             |
| 형식                 | String        | 트랜잭션의 유형을 나타내는 문자열입니다.                                                                                                                                                           |
| typeInt            | QUANTITY      | 트랜잭션의 유형을 나타내는 정수입니다.                                                                                                                                                            |
| value              | QUANTITY      | peb로 전송된 값입니다.                                                                                                                                                                   |


**예시**

```javascript
> caver.klay.getTransactionBySenderTxHash('0x8c0b092fed92a6619666efd582f7d71fbc3d784781072dd26741715b3731ab22').then(console.log);
{
    blockHash: '0x56e950bd9283c11ad2dab7cfcbacd9164aff2f6cbeb99dd2a7b754eb210753af',
    blockNumber: 773,
    codeFormat: '0x0',
    feePayer: '0xabae1fe62aebbfabeff072eb815d54c3359a45f4',
    feePayerSignatures: [
        { 
            V: '0x4e43',
            R: '0x16293eefe0f13228ae47af67ecfe659448d8f80d9667a67a25d82c72b5ee246a',
            S: '0x3c4043324bee41a6cbab905d3b4e740a3a18fde021260fc1196f73d2ab037b91' } ],
    feeRatio: '0x14',
    from: '0x3F0E31836C7AABb4C9e9B19d5D61359a9139E949',
    gas: 900000,
    gasPrice: '25000000000',
    hash: '0x2ab7665d25f8f64969fa03b8d5e40a70485bb56a4e72ca2fe1e467fff904c173',
    humanReadable: false,
    input: '0x6080604052600080556040516020806101fa8339810180604052810190808051906020019092919050505080600081905550506101b9806100416000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd1461006757806342cbb15c14610092578063a87d942c146100bd578063d14e62b8146100e8575b600080fd5b34801561007357600080fd5b5061007c610108565b6040518082815260200191505060405180910390f35b34801561009e57600080fd5b506100a761010e565b6040518082815260200191505060405180910390f35b3480156100c957600080fd5b506100d2610116565b6040518082815260200191505060405180910390f35b6101066004803603810190808035906020019092919050505061014c565b005b60005481565b600043905090565b60007f7197668b8690d2324050bc9ad83b2b5ca0b3f5336cb178ffa2aa07006b51b65160405160405180910390a1600054905090565b7fe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9816040518082815260200191505060405180910390a180600081905550505600a165627a7a723058203cb41ebe3d7128a72c997645693c64789a9b5fdeae26158fb28b55e567e805c700290000000000000000000000000000000000000000000000000000000000000001',
    nonce: 9,
    senderTxHash: '0x8c0b092fed92a6619666efd582f7d71fbc3d784781072dd26741715b3731ab22',
    signatures: [
        { 
            V: '0x4e43',
            R: '0x1b48ee0508d242c9568d7e09212d62137080d68d86c1d067b31b4bb4196c9960',
            S: '0x24982f60b37859d7c39d7bd9c00b446196b3a08b27f80dbc9ceca8ee52513b11' 
        } 
    ],
    to: null,
    transactionIndex: 0,
    type: 'TxTypeFeeDelegatedSmartContractDeployWithRatio',
    typeInt: 42,
    value: '1'
}
```

## getTransactionFromBlock <a id="gettransactionfromblock"></a>

```javascript
caver.klay.getTransactionFromBlock(hashStringOrNumber, indexNumber [, callback])
```

블록 해시 또는 블록 넘버, 그리고 트랜잭션 인덱스 위치를 통해 트랜잭션을 반환합니다.

**Parameters**

| 이름                 | 타입       | 설명                                                                   |
| ------------------ | -------- | -------------------------------------------------------------------- |
| hashStringOrNumber | String   | 블록 번호 또는 해시. 또는 `"genesis"` 아니면 `"latest"`.                          |
| indexNumber        | Number   | 트랜잭션의 인덱스 위치의 정숫값입니다.                                                |
| callback           | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`객체` - 트랜잭션 객체를 반환하며 자세한 내용은  [caver.klay.getTransaction](#gettransaction)를 참고하십시오.

**예제**

```javascript
> caver.klay.getTransactionFromBlock('0x4534534534', 2).then(console.log);
// see caver.klay.getTransaction
```

## getTransactionReceipt <a id="gettransactionreceipt"></a>

```javascript
caver.klay.getTransactionReceipt(transactionHash [, callback])
```
트랜잭션 해시로 조회한 트랜잭션의 영수증을 반환합니다.


**Parameters**

| 이름              | 타입       | 설명                                                                   |
| --------------- | -------- | -------------------------------------------------------------------- |
| transactionHash | String   | 트랜잭션 해시                                                              |
| callback        | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Object`를 반환합니다 - 트랜잭션 영수증 객체를 반환하거나 영수증을 찾을 수 없는 경우 `null`을 반환합니다.

| 이름                 | 타입             | 설명                                                                                                                                                                                        |
| ------------------ | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | 32-byte String | 트랜잭션이 담긴 블록의 해시입니다.                                                                                                                                                                       |
| blockNumber        | Number         | 트랜잭션이 담긴 블록의 번호입니다.                                                                                                                                                                       |
| codeFormat         | String         | (선택사항) 스마트 컨트랙트 코드의 코드 형식입니다.                                                                                                                                                             |
| contractAddress    | DATA           | 컨트랙트 생성 트랜잭션이면 생성된 컨트랙트의 주소를 반환합니다. 컨트랙트 생성 트랜잭션이 아닌 경우 `null`을 반환합니다.                                                                                                                    |
| feePayer           | 20바이트 크기 DATA  | (선택사항) 트랜잭션 수수료 납부자의 주소입니다.                                                                                                                                                               |
| feePayerSignatures | Array          | (선택사항) 트랜잭션 수수료 납부자의 서명 객체들로 이루어진 배열입니다. 각 서명 객체에는 (V, R, S) 등 세 필드가 있습니다. V는 ECDSA 복구 ID를 담고 있습니다. R은 ECDSA 서명 r을 담고 있고 S는 ECDSA 서명 s를 담고 있습니다.                                          |
| feeRatio           | QUANTITY       | (선택사항) 트랜잭션 수수료 납부자의 부담 비율입니다. 이 값이 30이면, 트랜잭션 수수료의 30%를 트랜잭션 수수료 납부자가 지불합니다. 나머지 70%는 트랜잭션 발신자가 지불합니다.                                                                                   |
| from               | 20바이트 크기 DATA  | 트랜잭션 발신자의 주소입니다.                                                                                                                                                                          |
| gas                | QUANTITY       | 트랜잭션 발신자에 의해 설정된 가스양입니다.                                                                                                                                                                  |
| 가스 가격              | QUANTITY       | peb에서 트랜잭션 발신자에 의해 설정된 가스 가격입니다.                                                                                                                                                          |
| gasUsed            | QUANTITY       | 이 트랜잭션에서만 사용된 가스양입니다.                                                                                                                                                                     |
| humanReadable      | Boolean        | (선택사항) Human-Readable Address이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.                                                                                                                     |
| key                | String         | (선택사항) 새로 생성된 계정의 키입니다.                                                                                                                                                                   |
| input              | DATA           | (선택사항) 트랜잭션과 함께 전송된 데이터입니다.                                                                                                                                                               |
| 로그                 | Array          | 이 트랜잭션이 발생시킨 로그 객체들의 배열입니다.                                                                                                                                                               |
| logsBloom          | 256바이트 크기 DATA | 라이트 클라이언트가 관련된 로그를 빠르게 검색할 수 있도록 하는 블룸필터입니다.                                                                                                                                              |
| 논스                 | QUANTITY       | 트랜잭션 발신자가 이 트랜잭션 이전까지 전송했던 트랜잭션의 개수입니다.                                                                                                                                                   |
| senderTxHash       | 32바이트 크기 DATA  | (선택사항) 발신자만 서명한 트랜잭션 해시. 이에 대한 자세한 내용은 [SenderTxHash](../../../../../../klaytn/design/transactions/README.md#sendertxhash)를 참고하세요. 이 값은 수수료를 위임하지 않은 트랜잭션의 `transactionHash` 값과 항상 동일합니다. |
| 서명                 | Array          | 서명 객체의 배열입니다. 각 서명 객체에는 (V, R, S) 등 세 필드가 있습니다. V는 ECDSA 복구 ID를 담고 있습니다. R은 ECDSA 서명 r을 담고 있고 S는 ECDSA 서명 s를 담고 있습니다.                                                                     |
| 상태                 | Boolean        | 트랜잭션이 성공적으로 실행되면 `true`를 반환하며, 만약 Klaytn 가상머신이 트랜잭션을 거부하면 `false`를 반환합니다.                                                                                                                 |
| txError            | QUANTITY       | (선택사항) `status`가 0이면 상세한 오류 코드를 나타냅니다.                                                                                                                                                    |
| to                 | 20바이트 크기 DATA  | 트랜잭션 수신자의 주소입니다. 컨트랙트 생성 트랜잭션이면 `null`을 반환합니다.                                                                                                                                            |
| transactionHash    | 32바이트 크기 DATA  | 트랜잭션의 해시입니다.                                                                                                                                                                              |
| transactionIndex   | QUANTITY       | 블록 내 트랜잭션의 인덱스 위치의 정숫값입니다.                                                                                                                                                                |
| 형식                 | String         | 트랜잭션의 유형을 나타내는 문자열입니다.                                                                                                                                                                    |
| typeInt            | QUANTITY       | 트랜잭션의 유형을 나타내는 정수입니다.                                                                                                                                                                     |
| value              | QUANTITY       | peb로 전송된 값입니다.                                                                                                                                                                            |

**예시**

```javascript
> caver.klay.getTransactionReceipt('0x9108f22693de7b16ece4db2c8d11c004feae31973acc2ecb9dbd61cd57bb0d7b')
  .then(console.log);
{ 
    blockHash: '0x62f0b4e4d2c0fdeda968bf82688a6b4426fb0b75c83ebd39a04633e087060f00',
    blockNumber: 140949,
    contractAddress: null,
    from: '0x8948ab8526fda9a7349ee8fca5372e46d0268777',
    gas: '0x1312d00',
    gasPrice: '0x5d21dba00',
    gasUsed: 21000,
    input: '0x',
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    nonce: '0x6',
    signatures: [{ 
        V:'0xfe9',
        R:'0x95e5fc90a27b4a364f4047072474147fb8885213acbc4ac89902da28ddea3931',
        S:'0xeebe7d37c047f6a7b841da5c6ff2849eb6f99b689666da30f48b60a12028e59' 
    }],
    status: true,
    to: '0x2259cfdae62f9853f84298aaf20c999391b1c6a3',
    transactionHash: '0x9108f22693de7b16ece4db2c8d11c004feae31973acc2ecb9dbd61cd57bb0d7b',
    transactionIndex: 0,
    type: 'TxTypeLegacyTransaction',
    typeInt: 0,
    value: '0x1'
}
```

## getTransactionReceiptBySenderTxHash <a id="gettransactionreceiptbysendertxhash"></a>

```javascript
caver.klay.getTransactionReceiptBySenderTxHash(senderTxHash [, callback])
```
주어진 `senderTxHash`에 대응하는 트랜잭션의 영수증를 반환합니다.

**참고**: 보류 상태의 트랜잭션은 영수증을 확인할 수 없습니다. 이 API는 `--sendertxhashindexing`에 의해 인덱싱 기능이 노드에서 활성화되어 있을 때만 올바른 결과를 반환합니다. [isSenderTxHashIndexingEnabled](./config.md#issendertxhashindexingenabled)를 호출하여 인덱싱 기능이 활성화되어 있는지 확인할 수 있습니다.


**Parameters**

| 이름           | 타입       | 설명                                                                                                                                   |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| senderTxHash | String   | 트랜잭션 발신자만 서명한 트랜잭션의 해시입니다. 이에 대한 자세한 내용은 [SenderTxHash](../../../../../../klaytn/design/transactions/README.md#sendertxhash)를 참고하세요. |
| callback     | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                 |

**리턴값**

`프로미스`는 `Object`를 반환합니다 - 트랜잭션 영수증 객체를 반환하거나 영수증을 찾을 수 없는 경우 `null`을 반환합니다.

| 이름                 | 타입             | 설명                                                                                                                                                                                          |
| ------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash          | 32-byte String | 트랜잭션이 담긴 블록의 해시입니다.                                                                                                                                                                         |
| blockNumber        | Number         | 트랜잭션이 담긴 블록의 번호입니다.                                                                                                                                                                         |
| codeFormat         | String         | (선택사항) 스마트 컨트랙트 코드의 코드 형식입니다.                                                                                                                                                               |
| contractAddress    | DATA           | 컨트랙트 생성 트랜잭션이면 생성된 컨트랙트의 주소를 반환합니다. 컨트랙트 생성 트랜잭션이 아닌 경우 `null`을 반환합니다.                                                                                                                      |
| feePayer           | 20바이트 크기 DATA  | 트랜잭션 수수료 납부자의 주소입니다.                                                                                                                                                                        |
| feePayerSignatures | Array          | 트랜잭션 수수료 납부자의 서명 객체들로 이루어진 배열입니다. 각 서명 객체에는 (V, R, S) 등 세 필드가 있습니다. V는 ECDSA 복구 ID를 담고 있습니다. R은 ECDSA 서명 r을 담고 있고 S는 ECDSA 서명 s를 담고 있습니다.                                                   |
| feeRatio           | QUANTITY       | (선택사항) 트랜잭션 수수료 납부자의 부담 비율입니다. 이 값이 30이면, 트랜잭션 수수료의 30%를 트랜잭션 수수료 납부자가 지불합니다. 나머지 70%는 트랜잭션 발신자가 지불합니다.                                                                                     |
| from               | 20바이트 크기 DATA  | 트랜잭션 발신자의 주소입니다.                                                                                                                                                                            |
| gas                | QUANTITY       | 트랜잭션 발신자에 의해 설정된 가스양입니다.                                                                                                                                                                    |
| 가스 가격              | QUANTITY       | peb에서 트랜잭션 발신자에 의해 설정된 가스 가격입니다.                                                                                                                                                            |
| gasUsed            | QUANTITY       | 이 트랜잭션에서만 사용된 가스양입니다.                                                                                                                                                                       |
| humanReadable      | Boolean        | (선택사항) Human-Readable Address이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.                                                                                                                       |
| key                | String         | (선택사항) 새로 생성된 계정의 키입니다.                                                                                                                                                                     |
| input              | DATA           | (선택사항) 트랜잭션과 함께 전송된 데이터입니다.                                                                                                                                                                 |
| 로그                 | Array          | 이 트랜잭션이 발생시킨 로그 객체들의 배열입니다.                                                                                                                                                                 |
| logsBloom          | 256바이트 크기 DATA | 라이트 클라이언트가 관련된 로그를 빠르게 검색할 수 있도록 하는 블룸필터입니다.                                                                                                                                                |
| 논스                 | QUANTITY       | 트랜잭션 발신자가 이 트랜잭션 이전까지 전송했던 트랜잭션의 개수입니다.                                                                                                                                                     |
| senderTxHash       | 32바이트 크기 DATA  | 트랜잭션 발신자만 서명한 트랜잭션의 해시입니다. 이에 대한 자세한 내용은 [SenderTxHash](../../../../../../klaytn/design/transactions/README.md#sendertxhash)를 참고하세요. 이 값은 수수료를 위임하지 않은 트랜잭션의 `transactionHash` 값과 항상 동일합니다. |
| 서명                 | Array          | 서명 객체의 배열입니다. 각 서명 객체에는 (V, R, S) 등 세 필드가 있습니다. V는 ECDSA 복구 ID를 담고 있습니다. R은 ECDSA 서명 r을 담고 있고 S는 ECDSA 서명 s를 담고 있습니다.                                                                       |
| 상태                 | Boolean        | 트랜잭션이 성공적으로 실행되면 `true`를 반환하며, 만약 Klaytn 가상머신이 트랜잭션을 거부하면 `false`를 반환합니다.                                                                                                                   |
| txError            | QUANTITY       | (선택사항) `status`가 0이면 상세한 오류 코드를 나타냅니다.                                                                                                                                                      |
| to                 | 20바이트 크기 DATA  | 트랜잭션 수신자의 주소입니다. 컨트랙트 생성 트랜잭션이면 `null`을 반환합니다.                                                                                                                                              |
| transactionHash    | 32바이트 크기 DATA  | 트랜잭션의 해시입니다.                                                                                                                                                                                |
| transactionIndex   | QUANTITY       | 블록 내 트랜잭션의 인덱스 위치의 정숫값입니다.                                                                                                                                                                  |
| 형식                 | String         | 트랜잭션의 유형을 나타내는 문자열입니다.                                                                                                                                                                      |
| typeInt            | QUANTITY       | 트랜잭션의 유형을 나타내는 정수입니다.                                                                                                                                                                       |
| value              | QUANTITY       | peb로 전송된 값입니다.                                                                                                                                                                              |

**예시**

```javascript
> caver.klay.getTransactionReceiptBySenderTxHash('0x8c0b092fed92a6619666efd582f7d71fbc3d784781072dd26741715b3731ab22').then(console.log);
{
    blockHash: '0x56e950bd9283c11ad2dab7cfcbacd9164aff2f6cbeb99dd2a7b754eb210753af',
    blockNumber: 773,
    codeFormat: '0x0',
    contractAddress: '0x71163abc3b051bC2Af71e7c68eD0ffeA6182cde1',
    feePayer: '0xabae1fe62aebbfabeff072eb815d54c3359a45f4',
    feePayerSignatures: [
        { 
            V: '0x4e43',
            R: '0x16293eefe0f13228ae47af67ecfe659448d8f80d9667a67a25d82c72b5ee246a',
            S: '0x3c4043324bee41a6cbab905d3b4e740a3a18fde021260fc1196f73d2ab037b91' 
        }
    ],
    feeRatio: '0x14',
    from: '0x3f0e31836c7aabb4c9e9b19d5d61359a9139e949',
    gas: '0xdbba0',
    gasPrice: '0x5d21dba00',
    gasUsed: 235217,
    humanReadable: false,
    input: '0x6080604052600080556040516020806101fa8339810180604052810190808051906020019092919050505080600081905550506101b9806100416000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306661abd1461006757806342cbb15c14610092578063a87d942c146100bd578063d14e62b8146100e8575b600080fd5b34801561007357600080fd5b5061007c610108565b6040518082815260200191505060405180910390f35b34801561009e57600080fd5b506100a761010e565b6040518082815260200191505060405180910390f35b3480156100c957600080fd5b506100d2610116565b6040518082815260200191505060405180910390f35b6101066004803603810190808035906020019092919050505061014c565b005b60005481565b600043905090565b60007f7197668b8690d2324050bc9ad83b2b5ca0b3f5336cb178ffa2aa07006b51b65160405160405180910390a1600054905090565b7fe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9816040518082815260200191505060405180910390a180600081905550505600a165627a7a723058203cb41ebe3d7128a72c997645693c64789a9b5fdeae26158fb28b55e567e805c700290000000000000000000000000000000000000000000000000000000000000001',
    logs: [],
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    nonce: '0x9',
    senderTxHash: '0x8c0b092fed92a6619666efd582f7d71fbc3d784781072dd26741715b3731ab22',
    signatures: [ 
        { 
            V: '0x4e43',
            R: '0x1b48ee0508d242c9568d7e09212d62137080d68d86c1d067b31b4bb4196c9960',
            S: '0x24982f60b37859d7c39d7bd9c00b446196b3a08b27f80dbc9ceca8ee52513b11' 
        }
    ],
    status: true,
    to: null,
    transactionHash: '0x2ab7665d25f8f64969fa03b8d5e40a70485bb56a4e72ca2fe1e467fff904c173',
    transactionIndex: 0,
    type: 'TxTypeFeeDelegatedSmartContractDeployWithRatio',
    typeInt: 42,
    value: '0x1'
}
```


## sendSignedTransaction <a id="sendsignedtransaction"></a>

```javascript
caver.klay.sendSignedTransaction(signedTransactionData [, callback])
```

`caver.klay.accounts.signTransaction`으로 생성된 이미 서명받은 트랜잭션을 보냅니다.

**참고** `caver.klay.sendSignedTransaction`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0)부터 객체를 파라미터로 받을 수 있습니다. 객체는 반드시 RLP 인코딩된 트랜잭션 문자열을 포함하거나 반드시 서명(트랜잭션 발신자 서명 혹은 트랜잭션 수수료 납부자 서명)을 받았으며 인코딩되지 않은 트랜잭션 객체이어야 합니다. caver.klay.accounts.signTransaction, caver.klay.accounts.feePayerSignTransaction, caver.klay.accounts.getRawTransactionWithSignatures 또는 caver.klay.accounts.combineSignatures의 리턴값으로 받는 객체를 전달해도 됩니다.

**Parameters**

| 이름                    | 타입                   | 설명                                                                                                                                                   |
| --------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| signedTransactionData | String &#124; Object | RLP 인코딩된 서명받은 트랜잭션 문자열, 또는 RLP 인코딩된 서명받은 트랜잭션 문자열을 `rawTransaction` 속성값안에 가진 객체, 또는 서명(트랜잭션 발신자 서명 혹은 트랜잭션 수수료 납부자 서명)이 첨부된 인코딩되지 않은 트랜잭션 객체이어야 합니다. |
| callback              | Function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                                 |

**리턴값**

| 타입         | 설명                                                                     |
| ---------- | ---------------------------------------------------------------------- |
| PromiEvent | 프로미스(promise)가 조합된 이벤트 이미터(event emitter). 트랜잭션 영수증이 준비되면 resolve 됩니다. |

PromiEvent에서는 다음 이벤트가 발생할 수 있습니다.

- `"transactionHash"`는 `String`를 반환: 트랜잭션을 보내고 트랜잭션 해시가 준비된 직후에 발생.
- `"receipt"`는 `Object`를 반환: 트랜잭션 영수중이 중비되면 발생.
- `"error"`는 `Error`를 반환: 전송 중 에러가 발생하면 발생. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

**예시**

```javascript
// sendSignedTransaction using promise with RLP encoded signed transaction string
caver.klay.sendSignedTransaction('0xf867808505d21dba0083015f9094247f2b7e9a9c51ebcc9449c7d9e7575f9baac36e0180824e43a02e50f5c4d279e17a80c3fe98327de7e48878e9d8141d26759ef64adcf66e6aa0a02ae9e8beac1ba8d5d215d87c33f9e05263b0bad163706c9dd7a563ee1e028f41').then(function(receipt){
    ...
})

// sendSignedTransaction using promise with returning object from caver.klay.accounts.signTransaction
caver.klay.sendSignedTransaction({
    messageHash: '0x2378aeb6439f43597e30df4937f59eb13c98e502bb03babcebb39bf602cd8d73',
    v: '0x4e43',
    r: '0x9fc6cfd3d7c35794ab373c8d7f15746f1f4fa94c80e31270eea31977f20aaa9a',
    s: '0x762343c55f7c1de87e5877887b9d10ed93b16666f4bdbc525aeee1f23fb53457',
    rawTransaction: '0xf867018505d21dba0083015f9094cdba9992ffd79b12ce68905db40bf5e873b1a43e0180824e43a09fc6cfd3d7c35794ab373c8d7f15746f1f4fa94c80e31270eea31977f20aaa9aa0762343c55f7c1de87e5877887b9d10ed93b16666f4bdbc525aeee1f23fb53457',
    txHash: '0x3d598805e1565ba5c4a1d2b708aff9825562d903bef4301ef22564253c6779bf',
    senderTxHash: '0x3d598805e1565ba5c4a1d2b708aff9825562d903bef4301ef22564253c6779bf',
    signatures: [
        '0x4e43',
        '0x9fc6cfd3d7c35794ab373c8d7f15746f1f4fa94c80e31270eea31977f20aaa9a',
        '0x762343c55f7c1de87e5877887b9d10ed93b16666f4bdbc525aeee1f23fb53457',
    ],
}).then(function(receipt){
    ...
})

// sendSignedTransaction using promise with a transaction object that has signatures
caver.klay.sendSignedTransaction({
    type: 'LEGACY',
    from: '0x73647c5fd1a66fac0dbf2af2e5cc7f593a015441',
    to: '0x82c5b8f3ae5c08eeb64a1af0ce89cb5233b05c6c',
    value: '0x1',
    gas: '0x15f90',
    gasPrice: '0x5d21dba00',
    nonce: '0x2',
    signatures: [
        '0x4e43',
        '0x077b0ec1dd5dd66ffbf7d779b08bed6166ec1b0269d85a3901dbfb55331216de',
        '0x23b7565fa994ba3f88290de9b7f6b6b975f2ad9c19ce1ffc4752ecbc51b6c274',
    ],
}).then(function(receipt){
    ...
})

// sendSignedTransaction using promise with a fee delegated transaction object that has signatures and feePayerSignatures
caver.klay.sendSignedTransaction({
    type: 'FEE_DELEGATED_VALUE_TRANSFER',
    from: '0x73647c5fd1a66fac0dbf2af2e5cc7f593a015441',
    to: '0x73f9b11bd22fde3ec543f3fcbdc39fc40a942bf7',
    value: '0x1',
    gas: '0x15f90',
    gasPrice: '0x5d21dba00',
    chainId: '0x2710',
    nonce: '0x3',
    humanReadable: false,
    feePayer: '0xebcd0271c4f8d2a84a33e073a5c9bcdb6bafc556',
    signatures: [
        [
            '0x4e44',
            '0x41dfab76e0fdcdb5c4cd4dbe39861029d8c7f156f9dd10e8292625492943e689',
            '0x789f1bfc42a96366ea0bdc6727410a661fe8300cdf57889316c25aa873a5b85c',
        ],
    ],
    feePayerSignatures: [
        [
            '0x4e44',
            '0x833031cb1d709a408f1c3b83cea88671d9d86f7550101e4e7221507a39dcd462',
            '0x03f1d8003513b038195c6d798623d5bb132a93e7f2f0a2c302079b92858ea8e7',
        ],
    ],
}).then(function(receipt){
    ...
})

// sendSignedTransaction using event emitter with RLP encoded signed transaction string
> caver.klay.sendSignedTransaction('0xf867068505d21dba0083015f90940fd7697a8b9a46b0f770a3986e8a10b6ad6fffe10180824e44a0e591e4cbf4bdada2e559ce5b9c7b604c50d3b1d7d5a29939091bcc8ad4208aa3a01ef917ec539aa79b32a043b452e81840ea012796895cd5925273fd8df139595f')
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('error', console.error)
```


## sendTransaction <a id="sendtransaction"></a>
- [sendTransaction (Legacy)](./sendtx_legacy.md#sendtransaction-legacy)
- [sendTransaction (VALUE_TRANSFER)](./sendtx_value_transfer.md#sendtransaction-value_transfer)
- [sendTransaction (FEE_DELEGATED_VALUE_TRANSFER)](./sendtx_value_transfer.md#sendtransaction-fee_delegated_value_transfer)
- [sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_WITH_RATIO)](./sendtx_value_transfer.md#sendtransaction-fee_delegated_value_transfer_with_ratio)
- [sendTransaction (VALUE_TRANSFER_MEMO)](./sendtx_value_transfer_memo.md#sendtransaction-value_transfer_memo)
- [sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_MEMO)](./sendtx_value_transfer_memo.md#sendtransaction-fee_delegated_value_transfer_memo)
- [sendTransaction (FEE_DELEGATED_VALUE_TRANSFER_MEMO_WITH_RATIO)](./sendtx_value_transfer_memo.md#sendtransaction-fee_delegated_value_transfer_memo_with_ratio)
- [sendTransaction (ACCOUNT_UPDATE)](./sendtx_account_update.md#sendtransaction-account_update)
- [sendTransaction (FEE_DELEGATED_ACCOUNT_UPDATE)](./sendtx_account_update.md#sendtransaction-fee_delegated_account_update)
- [sendTransaction (FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO)](./sendtx_account_update.md#sendtransaction-fee_delegated_account_update_with_ratio)
- [sendTransaction (SMART_CONTRACT_DEPLOY)](./sendtx_smart_contract_deploy.md#sendtransaction-smart_contract_deploy)
- [sendTransaction (FEE_DELEGATED_SMART_CONTRACT_DEPLOY)](./sendtx_smart_contract_deploy.md#sendtransaction-fee_delegated_smart_contract_deploy)
- [sendTransaction (FEE_DELEGATED_SMART_CONTRACT_DEPLOY_WITH_RATIO)](./sendtx_smart_contract_deploy.md#sendtransaction-fee_delegated_smart_contract_deploy_with_ratio)
- [sendTransaction (SMART_CONTRACT_EXECUTION)](./sendtx_smart_contract_execution.md#sendtransaction-smart_contract_execution)
- [sendTransaction (FEE_DELEGATED_SMART_CONTRACT_EXECUTION)](./sendtx_smart_contract_execution.md#sendtransaction-fee_delegated_smart_contract_execution)
- [sendTransaction (FEE_DELEGATED_SMART_CONTRACT_EXECUTION_WITH_RATIO)](./sendtx_smart_contract_execution.md#sendtransaction-fee_delegated_smart_contract_execution_with_ratio)
- [sendTransaction (CANCEL)](./sendtx_cancel.md#sendtransaction-cancel)
- [sendTransaction (FEE_DELEGATED_CANCEL)](./sendtx_cancel.md#sendtransaction-fee_delegated_cancel)
- [sendTransaction (FEE_DELEGATED_CANCEL_WITH_RATIO)](./sendtx_cancel.md#sendtransaction-fee_delegated_cancel_with_ratio)


## signTransaction <a id="signtransaction"></a>

```javascript
caver.klay.signTransaction(transactionObject [, callback])
```
트랜잭션에 서명합니다. 이 계정은 잠금 해제되어 있어야 합니다.

**Parameters**

| 이름                | 타입       | 설명                                                                   |
| ----------------- | -------- | -------------------------------------------------------------------- |
| transactionObject | Object   | 서명하려는 트랜잭션 데이터.                                                      |
| callback          | Function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`Promise`는 `Object`를 반환: RLP 인코딩된 트랜잭션입니다. `raw` 속성은 [caver.klay.sendSignedTransaction](#sendsignedtransaction)으로 트랜잭션을 보내는 데 사용될 수 있습니다.

**예시**

```javascript
> caver.klay.signTransaction({
    nonce: 0,
    from: "0xEB014f8c8B418Db6b45774c326A0E64C78914dC0",
    gasPrice: '25000000000',
    gas: "21000",
    to: '0x3535353535353535353535353535353535353535',
    value: "1000000000000000000",
    data: ""
}).then(console.log);

{
    raw: '0xf86c808504a817c800825208943535353535353535353535353535353535353535880de0b6b3a76400008025a04f4c17305743700648bc4f6cd3038ec6f6af0df73e31757007b7f59df7bee88da07e1941b264348e80c78c4027afc65a87b0a5e43e86742b8ca0823584c6788fd0',
    tx: {
        nonce: '0x0',
        gasPrice: '25000000000',
        gas: '0x5208',
        to: '0x3535353535353535353535353535353535353535',
        value: '0xde0b6b3a7640000',
        input: '0x',
        v: '0x25',
        r: '0x4f4c17305743700648bc4f6cd3038ec6f6af0df73e31757007b7f59df7bee88d',
        s: '0x7e1941b264348e80c78c4027afc65a87b0a5e43e86742b8ca0823584c6788fd0',
        hash: '0xda3be87732110de6c1354c83770aae630ede9ac308d9f7b399ecfba23d923384'
    }
}
```
