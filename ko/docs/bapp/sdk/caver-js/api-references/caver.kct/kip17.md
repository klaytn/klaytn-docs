# caver.kct.kip17 <a id="caver-kct-kip17"></a>

`caver.kct.kip17`은 [KIP-17](https://kips.klaytn.com/KIPs/kip-17) 표준을 구현한 스마트 컨트랙트를 JavaScript 객체 형태로 Klaytn 블록체인에서 손쉽게 다룰 수 있도록 돕습니다.

`caver.kct.kip17`는 KIP-17 토큰 컨트랙트를 구현하기 위해 [caver.contract](../caver.contract.md)를 상속합니다. `caver.kct.kip17`은 `caver.contract`와 동일한 속성값들을 가지며, 추가 기능 구현을 위해 메서드를 더 가지고 있습니다. 이 장은 `caver.kct.kip17` 메서드들 중 오직 새롭게 추가된 것만을 소개합니다.

caver-js에서 KIP-17을 구현한 예시는 [Klaytn Contracts Github Repo](https://github.com/klaytn/klaytn-contracts/tree/master/contracts/token/KIP17)에서 확인할 수 있습니다.

KIP-17에 관한 자세한 정보는 [Klaytn Improvement Proposals](https://kips.klaytn.com/KIPs/kip-17)를 참조하십시오.

## caver.kct.kip17.deploy <a id="caver-klay-kip17-deploy"></a>

```javascript
caver.kct.kip17.deploy(tokenInfo, deployer)
```
KIP-17 토큰 컨트랙트를 Klaytn 블록체인에 배포합니다. caver.kct.kip17.deploy를 사용해 배포한 컨트랙트는 KIP-17 표준을 따르는 대체 불가 토큰입니다.

성공적으로 배포된 후, 프로미스는 새로운 KIP17 인스턴스를 반환할 것입니다.

**매개변수**

| 이름        | 타입                   | 설명                                                                                                                                                                                                                                                                                                                                                                  |
| --------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenInfo | object               | Klaytn 블록체인에 KIP-17 토큰 컨트랙트를 배포하는 데 필요한 정보입니다. 자세한 내용은 아래 표를 참조하세요.                                                                                                                                                                                                                                                                                                 |
| deployer  | string &#124; object | keyring 인스턴스에 있는 계정 주소입니다. 이 주소가 KIP-17 토큰 컨트랙트를 배포합니다. 이 주소는 반드시 배포를 위해 충분한 KLAY를 가지고 있어야 합니다. 자세한 내용은 [Keyring](../caver.wallet/keyring.md#caver-wallet-keyring)을 참조하세요. 트랜잭션 전송 시 사용할 필드를 자체적으로 정의하고 싶다면 객체 타입을 매개변수로 전달하면 됩니다. KIP-17 컨트랙트 배포 시 수수료 위임을 이용하고 싶다면, 객체 내 수수료 위임과 관련된 필드를 정의할 수 있습니다. 이 필드의 사용에 관한 내용은 [approve](#kip17-approve)의 매개변수 설명을 참고하십시오. |

tokenInfo 객체는 다음을 반드시 포함해야 합니다:

| 이름 | 타입     | 설명        |
| -- | ------ | --------- |
| 명칭 | string | 토큰 이름입니다. |
| 기호 | string | 토큰 심볼입니다. |

**리턴값**

`PromiEvent`: 이벤트 이미터와 결합된 프로미스이며 새로운 KIP17 인스턴스를 반환합니다. 추가로 다음 이벤트가 발생할 수 있습니다.

| 이름              | 타입     | 설명                                                                                                                                                    |
| --------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionHash | string | 트랜잭션이 전송된 직후 및 트랜잭션 해시를 사용할 수 있을 때 발생합니다.                                                                                                             |
| receipt         | object | 트랜잭션 영수증을 사용할 수 있을 때 발생합니다. 영수증 객체 속성값들에 관한 자세한 정보는 [getTransactionReceipt][]를 참고하십시오. KIP17 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다. |
| error           | 에러     | 전송 중 오류가 나타나면 발생됩니다.                                                                                                                                  |

**예시**

```javascript
// using the promise
> caver.kct.kip17.deploy({
    name: 'Jasmine',
    symbol: 'JAS',
}, '0x{address in hex}').then(console.log)
KIP17 {
    ...
    _address: '0xfA7D967f414468083aDAd85257a2cBD6019693C2',
    _jsonInterface: [
        ...
        {
            anonymous: false,
            inputs: [
                { indexed: true, name: 'owner', type: 'address' },
                { indexed: true, name: 'operator', type: 'address' },
                { indexed: false, name: 'approved', type: 'bool' }
            ],
            name: 'ApprovalForAll',
            type: 'event',
            signature: '0x17307...'
        }
    ] 
}

// 객체를 두 번째 매개변수로 전달
> caver.kct.kip17.deploy({
        name: 'Jasmine',
        symbol: 'JAS',
    },
    {
        from: '0x{address in hex}',
        feeDelegation: true,
        feePayer: '0x{address in hex}',
    }).then(console.log)

// 이벤트 이미터와 프로미스 사용
> caver.kct.kip17.deploy({
    name: 'Jasmine',
    symbol: 'JAS',
}, '0x{address in hex}')
.on('error', function(error) { ... })
.on('transactionHash', function(transactionHash) { ... })
.on('receipt', function(receipt) {
    console.log(receipt.contractAddress) // contains the new token contract address
})
.then(function(newKIP17Instance) {
    console.log(newKIP17Instance.options.address) // instance with the new token contract address
})
```

## caver.kct.kip17.detectInterface <a id="caver-kct-kip17-detectinterface"></a>

```javascript
caver.kct.kip17.detectInterface(contractAddress)
```
토큰 컨트랙트에 의해 구현된 인터페이스 정보를 반환합니다. 이 정적 함수는 [kip7.detectInterface](#kip17-detectinterface)를 사용합니다.

**매개변수**

| 이름              | 타입     | 설명                    |
| --------------- | ------ | --------------------- |
| contractAddress | string | KIP-7 토큰 컨트랙트의 주소입니다. |

**리턴값**

`Promise`는 각 [KIP-17 interface](https://kips.klaytn.com/KIPs/kip-7#kip-13-identifiers)가 구현되었는지에 대한 boolean 값을 포함한 `object`를 반환합니다.

**예시**

```javascript
> caver.kct.kip17.detectInterface('0x{address in hex}').then(console.log)
{
    IKIP17: true,
    IKIP17Metadata: true,
    IKIP17Enumerable: true,
    IKIP17Mintable: true,
    IKIP17MetadataMintable: true,
    IKIP17Burnable: true,
    IKIP17Pausable: true,
}
```

## caver.kct.kip17.create <a id="caver-kct-kip17-create"></a>

```javascript
caver.kct.kip17.create([tokenAddress])
```
새로운 KIP17 인스턴스를 인스턴스 메서드, 이벤트들과 함께 생성합니다. 이 함수는 [new KIP17](#new-kip17)과 동일하게 작동합니다.

**NOTE** `caver.kct.kip17.create` caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)부터 지원됩니다.

**매개변수**

[new KIP17](#new-kip17)를 참고하세요.

**리턴값**

[new KIP17](#new-kip17)를 참고하세요.

**예시**

```javascript
// 매개변수 없는 KIP17 인스턴스 생성
> const kip17 = caver.kct.kip17.create()

// 토큰 주소를 가진 KIP17 인스턴스 생성
> const kip17 = caver.kct.kip17.create('0x{address in hex}')
```


## new KIP17 <a id="new-kip17"></a>

```javascript
new caver.kct.kip17([tokenAddress])
```
새로운 KIP17 인스턴스를 인스턴스 메소드, 이벤트들과 함께 생성합니다.

**매개변수**

| 이름           | 타입     | 설명                                                                                   |
| ------------ | ------ | ------------------------------------------------------------------------------------ |
| tokenAddress | string | (선택 사항) KIP-17 토큰 컨트랙트 주소이며 나중에 `kip17.options.address = '0x1234..'`로 값을 설정할 수 있습니다. |

**리턴값**

| 타입     | 설명                                   |
| ------ | ------------------------------------ |
| object | 인스턴스 메소드와 이벤트들을 갖고 있는 KIP17 인스턴스입니다. |


**예시**

```javascript
// 매개변수 없는 KIP17 인스턴스 생성
> const kip17 = caver.kct.kip17()

// 토큰 주소를 가진 KIP17 인스턴스 생성
> const kip17 = caver.kct.kip17('0x{address in hex}')
```


## kip17.clone <a id="kip17-clone"></a>

```javascript
kip17.clone([tokenAddress])
```
현재 KIP17 인스턴스를 복제합니다.

**매개변수**

| 이름           | 타입     | 설명                                                                                 |
| ------------ | ------ | ---------------------------------------------------------------------------------- |
| tokenAddress | string | (선택 사항) 다른 KIP17 토큰을 배포했던 스마트 컨트랙트 주소입니다. 입력을 생략하면, 이 주소는 원본 인스턴스의 컨트랙트 주소로 설정됩니다. |

**리턴값**

| 타입     | 설명                          |
| ------ | --------------------------- |
| object | 원본 KIP17 인스턴스를 복제한 인스턴스입니다. |


**예시**

```javascript
> const kip17 = new caver.kct.kip17(address)

// 매개변수 없이 클론
> const cloned = kip17.clone()

// 새로운 토큰 컨트랙트 주소를 가지고 클론
> const cloned = kip17.clone('0x{address in hex}')
```

## kip17.detectInterface <a id="kip17-detectinterface"></a>

```javascript
kip17.detectInterface 
```
토큰 컨트랙트에 의해 구현된 인터페이스 정보를 반환합니다.

**매개변수**

없음

**리턴값**

`Promise`는 각 [KIP-17 interface](https://kips.klaytn.com/KIPs/kip-7#kip-13-identifiers)가 구현되었는지에 대한 boolean 값을 포함한 `object`를 반환합니다.

**예시**

```javascript
> kip17.detectInterface().then(console.log)
{
    IKIP17: true,
    IKIP17Metadata: true,
    IKIP17Enumerable: true,
    IKIP17Mintable: true,
    IKIP17MetadataMintable: true,
    IKIP17Burnable: true,
    IKIP17Pausable: true,
}
```


## kip17.supportsInterface <a id="kip17-supportsinterface"></a>

```javascript
kip17.supportsInterface(interfaceId)
```
이 컨트랙트가 `interfaceId`로 정의된 인터페이스를 구현한다면 `true`를 반환합니다.

**매개변수**

| 이름          | 타입     | 설명                  |
| ----------- | ------ | ------------------- |
| interfaceId | string | 확인할 interfaceId입니다. |

**리턴값**

`프로미스`는 `Boolean`을 반환: 이 컨트랙트가 해당 `interfaceId`를 가진 인터페이스를 구현한다면 `true`를 반환합니다.

**예시**

```javascript
> kip17.supportsInterface('0x80ac58cd').then(console.log)
true

> kip17.supportsInterface('0xa22cb465').then(console.log)
false
```


## kip17.name <a id="kip17-name"></a>

```javascript
kip17.name()
```
토큰 이름을 반환합니다.

**매개변수**

없음

**리턴값**

`프로미스`는 `String`을 반환: 토큰의 이름입니다.

**예시**

```javascript
> kip17.name().then(console.log)
Jasmine
```


## kip17.symbol<a id="kip17-symbol"></a>

```javascript
kip17.symbol()
```
토큰 심볼을 반환합니다.

**매개변수**

없음

**리턴값**

`프로미스`는 `String`을 반환: 토큰의 심볼입니다.

**예시**

```javascript
> kip17.symbol().then(console.log)
JAS
```


## kip17.totalSupply <a id="kip17-totalsupply"></a>

```javascript
kip17.totalSupply()
```
컨트랙트가 발행한 토큰 총 개수를 반환합니다.

**매개변수**

없음

**리턴값**

`프로미스`는 `BigNumber`를 반환: 토큰의 총 수량입니다.

**예시**

```javascript
> kip17.totalSupply().then(console.log)
10
```


## kip17.tokenURI <a id="kip17-tokenuri"></a>

```javascript
kip17.tokenURI(tokenId)
```
주어진 토큰 ID에 대한 URI를 반환합니다.

**매개변수**

| 이름      | 타입                                    | 설명        |
| ------- | ------------------------------------- | --------- |
| tokenId | BigNumber &#124; string &#124; number | 토큰 ID입니다. |

**참고** `tokenId` 파라미터는 `Number` 타입 값을 받지만, 입력된 값이 Number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

**리턴값**

`Promise`는 `String`을 반환: 주어진 토큰의 URI입니다.

**예시**

```javascript
> kip17.tokenURI(0).then(console.log)
https://kip17.example/uri-ex-caver.json
```


## kip17.tokenOfOwnerByIndex <a id="kip17-tokenofownerbyindex"></a>

```javascript
kip17.tokenOfOwnerByIndex(owner, index)
```
`owner`의 토큰 목록에서 주어진 인덱스에 위치한 토큰의 ID를 반환합니다.

**매개변수**

| 이름    | 타입                                    | 설명                                       |
| ----- | ------------------------------------- | ---------------------------------------- |
| owner | string                                | 토큰을 소유한 계정 주소입니다.                        |
| index | BigNumber &#124; string &#124; number | 토큰 소유자가 가지고 있는 토큰 목록 중 특정 토큰의 위치 인덱스입니다. |

**참고** `index` 파라미터는 `number` 타입 값을 받지만, 입력된 값이 Number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

**리턴값**

`프로미스`는 `BigNumber`를 반환: 토큰의 Id입니다.

**예시**

```javascript
> kip17.tokenOfOwnerByIndex('0x{address in hex}', 5).then(console.log)
5
```


## kip17.tokenByIndex <a id="kip17-tokenbyindex"></a>

```javascript
kip17.tokenByIndex(index)
```
이 컨트랙트에 있는 모든 토큰들의 목록에서 주어진 인덱스에 위치한 토큰의 ID를 반환합니다. 인덱스 값이 토큰의 총 개수보다 크거나 같다면 실행이 거부됩니다.

**매개변수**

| 이름    | 타입                                    | 설명              |
| ----- | ------------------------------------- | --------------- |
| index | BigNumber &#124; string &#124; number | 검색할 토큰의 인덱스입니다. |

**참고** `index` 파라미터는 `number` 타입 값을 받지만, 입력된 값이 Number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

**리턴값**

`프로미스`는 `BigNumber`를 반환: 토큰의 Id입니다.

**예시**

```javascript
> kip17.tokenByIndex(1).then(console.log)
1
```


## kip17.balanceOf <a id="kip17-balanceof"></a>

```javascript
kip17.balanceOf(address)
```
주어진 계정 주소의 잔액을 반환합니다. 계정의 KIP-17 토큰 잔액이란 이 계정이 소유한 대체 불가 토큰(NFT)의 총 개수입니다.

**매개변수**

| 이름      | 타입     | 설명                |
| ------- | ------ | ----------------- |
| address | string | 잔액을 확인할 계정 주소입니다. |

**리턴값**

`프로미스`는 `BigNumber`를 반환: 계정 잔고입니다.

**예시**

```javascript
> kip17.balanceOf('0x{address in hex}').then(console.log)
9
```


## kip17.ownerOf <a id="kip17-ownerof"></a>

```javascript
kip17.ownerOf(tokenId)
```
특정 토큰 ID를 소유한 계정의 주소를 반환합니다.

**매개변수**

| 이름      | 타입                                    | 설명        |
| ------- | ------------------------------------- | --------- |
| tokenId | BigNumber &#124; string &#124; number | 토큰 ID입니다. |

**참고** `tokenId` 파라미터는 `Number` 타입 값을 받지만, 입력된 값이 Number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

**리턴값**

`promise`는 `string`을 반환: 주어진 토큰을 소유한 계정의 주소입니다.

**예시**

```javascript
> kip17.ownerOf(8).then(console.log)
0x0e0E95426343d97CC7BB913C7D7DBea065A31814
```


## kip17.getApproved <a id="kip17-getapproved"></a>

```javascript
kip17.getApproved(tokenId)
```
이 토큰을 전송할 권한이 있는 계정 주소를 반환합니다. 권한 있는 계정이 없다면 ''zero" 주소를 반환합니다. 주어진 토큰 ID가 존재하지 않으면 실행이 거부됩니다.

**매개변수**

| 이름      | 타입                                    | 설명        |
| ------- | ------------------------------------- | --------- |
| tokenId | BigNumber &#124; string &#124; number | 토큰 ID입니다. |

**참고** `tokenId` 파라미터는 `Number` 타입 값을 받지만, 입력된 값이 Number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

**리턴값**

`Promise`는 `String`을 반환: 주어진 토큰을 전송할 권한이 있는 계정 주소입니다.

**예시**

```javascript
// 권한 있는 계정 주소가 존재할 경우
> kip17.getApproved(10).then(console.log)
0x23D8E9cae17b22d3DAC65b4F7D2C737C6A7b865d

//권한 있는 계정 주소가 존재하지 않을 경우
> kip17.getApproved(3).then(console.log)
0x0000000000000000000000000000000000000000
```


## kip17.isApprovedForAll <a id="kip17-isapprovedforall"></a>

```javascript
kip17.isApprovedForAll(owner, operator)
```
`operator`에게 `owner` 소유한 모든 토큰을 전송할 권한이 있다면 `true`를 반환합니다.

**매개변수**

| 이름       | 타입     | 설명                                                             |
| -------- | ------ | -------------------------------------------------------------- |
| owner    | string | 토큰을 소유한 계정 주소입니다. 이 계정은 operator에게 자신의 모든 토큰을 전송하도록 허락한 계정입니다. |
| operator | string | 토큰 소유자를 대신해 토큰 소유자의 모든 토큰을 전송하도록 허락받은 계정 주소입니다.                |

**리턴값**

`프로미스`는 `boolean`을 반환: `operator`에게 `owner`가 소유한 모든 토큰을 전송할 권한이 있다면 `true` 를 반환합니다.

**예시**

```javascript
> kip17.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
false

> kip17.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
true
```


## kip17.isMinter <a id="kip17-isminter"></a>

```javascript
kip17.isMinter(address)
```
주어진 계정이 KIP-17을 준수하는 현재 컨트랙트에서 새 토큰을 발행할 수 있는 발행자라면 `true`를 반환합니다.

**매개변수**

| 이름      | 타입     | 설명                             |
| ------- | ------ | ------------------------------ |
| address | string | 발행 권한을 가지고 있는지를 확인받을 계정 주소입니다. |

**리턴값**

`프로미스`는 `Boolean`을 반환: 계정이 발행자라면 `true`를 반환합니다.

**예시**

```javascript
> kip17.isMinter('0x{address in hex}').then(console.log)
true

> kip17.isMinter('0x{address in hex}').then(console.log)
false
```


## kip17.paused <a id="kip17-paused"></a>

```javascript
kip17.paused()
```
컨트랙트가 작동을 멈추었다면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.

**매개변수**

없음

**리턴값**

`Promise`는 `Boolean`을 반환: 이 컨트랙트가 중지되었다면 `true`를 반환합니다.

**예시**

```javascript
> kip17.paused().then(console.log)
true

> kip17.paused().then(console.log)
false
```


## kip17.isPauser <a id="kip17-ispauser"></a>

```javascript
kip17.isPauser(address)
```
주어진 계정이 토큰 전송을 멈출 수 있는 pauser라면 `true`를 반환합니다.

**매개변수**

| 이름      | 타입     | 설명                                |
| ------- | ------ | --------------------------------- |
| address | string | 토큰 전송을 멈출 권한이 있는지를 확인받을 계정 주소입니다. |

**리턴값**

`프로미스`는 `Boolean`을 반환: 이 계정이 중지 권한을 가진 계정이라면 `true`를 반환합니다.

**예시**

```javascript
> kip17.isPauser('0x{address in hex}').then(console.log)
true

> kip17.isPauser('0x{address in hex}').then(console.log)
false
```


## kip17.approve <a id="kip17-approve"></a>

```javascript
kip17.approve(to, tokenId [, sendParam])
```
주어진 토큰 ID를 가진 토큰을 다른 계정에게 전송할 권한을 줍니다. "zero" 주소는 전송 권한을 가진 주소가 없음을 의미합니다. 토큰 1개마다 승인된 주소 1개만 있습니다. 이 메서드는 오직 토큰 소유자나 승인된 operator만 호출할 수 있습니다.

이 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**매개변수**

| 이름        | 타입                                    | 설명                                        |
| --------- | ------------------------------------- | ----------------------------------------- |
| to        | string                                | 토큰 소유자를 대신해 토큰을 사용하는 계정 주소입니다.            |
| tokenId   | BigNumber &#124; string &#124; number | 토큰 사용자가 사용을 허락받은 토큰의 ID입니다.               |
| sendParam | object                                | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. |

**참고** `tokenId` 파라미터는 `Number` 타입 값을 받지만, 입력된 값이 Number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

sendParam 객체는 다음을 포함할 수 있습니다:

| 이름            | 타입                                              | 설명                                                                                                                                                                                                              |
| ------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from          | string                                          | (선택 사항) 트랜잭션 발신자 주소입니다. 미입력시 `kip17.options.from`에 의해 지정됩니다. `sendParam`객체의 `from` 또는 `kip17.options.from`가 주어지지 않으면 오류가 발생합니다.                                                                                 |
| gas           | number &#124; string                            | (선택 사항) 트랜잭션에 규정된 최대 가스입니다 (가스 제한). 미입력시 caver-js가 `kip17.methods.approve(spender, tokenId).estimateGas({from})`를 호출하여 이 값을 지정합니다.                                                                              |
| gasPrice      | number &#124; string                            | (선택 사항) 트랜잭션에 사용할 peb 단위의 가스 가격. 생략하면 `caver.klay.getGasPrice` 값으로 caver-js가 설정합니다.                                                                                                                             |
| value         | number &#124; string &#124; BN &#124; BigNumber | (선택 사항) peb으로 환산한 전송될 토큰 가치.                                                                                                                                                                                    |
| feeDelegation | boolean                                         | (optional, default `false`) 수수료 위임 트랜잭션 사용 여부를 나타냅니다. 미입력시 `kip17.options.feeDelegation`를 사용합니다. 둘 다 미입력시 수수료 위임은 사용되지 않습니다.                                                                                    |
| feePayer      | string                                          | (선택 사항) 트랜잭션 수수료를 부담하는 fee payer의 주소입니다. `feeDelegation`이 `true`일 때, 값은 트랜잭션의 `feePayer` 필드에 설정됩니다. 미입력시 `kip17.options.feePayer`를 사용합니다. 둘 다 미입력시 오류를 반환합니다.                                                   |
| feeRatio      | string                                          | (선택 사항) Fee payer가 부담하게될 트랜잭션 수수료의 비율입니다. `feeDelegation`이 `true`이며, `feeRatio`가 유효한 값으로 설정되었을 경우, 부분 수수료 위임 트랜잭션이 사용됩니다. 유효한 범위는 1에서 99 사이입니다. 0이나 100 이상의 값은 허용되지 않습니다. 미입력시 `kip17.options.feeRatio`를 사용합니다. |

**참고** `feeDelegation`, `feePayer`, 그리고 `feeRatio`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 이후부터 지원됩니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP-17 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 from 필드에서 sendParam 객체를 통해 전송
> kip17.approve('0x{address in hex}', 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x3875c3f3120c1773c3adeb97260808c8a385bf8427bc203d10cbc5d262f67dbc',
    blockNumber: 2650,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    status: true,
    to: '0x5e0e6f1f0bdf9a263e1b1bb6e9759ba182982377',
    ...
    events: {
        Approval: {
            address: '0x5E0e6F1F0bDf9A263e1B1bB6e9759Ba182982377',
            blockNumber: 2650,
            transactionHash: '0x0ae92570560d64fa103c8be1861c8625d34ac560066398d9ad0d389ad5f7e441',
            transactionIndex: 0,
            blockHash: '0x3875c3f3120c1773c3adeb97260808c8a385bf8427bc203d10cbc5d262f67dbc',
            logIndex: 0,
            id: 'log_55296c9d',
            returnValues: {
                '0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                '1': '0x58746F9D739bC81713E5F5512529876F508a6166',
                '2': '2',
                owner: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                approved: '0x58746F9D739bC81713E5F5512529876F508a6166',
                tokenId: '2',
            },
            event: 'Approval',
            signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
            raw: {
                data: '0x',
                topics: [ '0x8c5be...', '0x00...afd', '0x00...166', '0x00...002' ],
            },
        },
    },
}

// 스마트 컨트랙트 실행에 대납 트랜잭션 사용
> kip17.approve('0x{address in hex}', 10, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip17.options.from 사용
// kip17 인스턴스로 트랜잭션을 보낼 때 sendParam 객체에서 `from`을 지정하지 않는다면
// kip17.options.from 값이 설정되어 있을 시 기본 값으로 사용
> kip17.options.from = '0x{address in hex}'
> kip17.approve('0x{address in hex}', 10).then(console.log)
```


## kip17.setApprovalForAll <a id="kip17-setApprovalforall"></a>

```javascript
kip17.setApprovalForAll(to, approved [, sendParam])
```
주어진 operator `to`가 토큰 소유자의 모든 토큰을 전송하도록 허락하거나 전송을 금지합니다.

setApprovalForAll 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**매개변수**

| 이름        | 타입      | 설명                                                                                            |
| --------- | ------- | --------------------------------------------------------------------------------------------- |
| to        | string  | 토큰 소유자의 모든 토큰을 전송할 권한을 받거나 전송할 권한을 잃게될 계정 주소입니다.                                              |
| approved  | Boolean | `true`이면 이 operator는 전송할 권한을 받습니다. `false`이면 이 operator는 전송할 권한을 잃습니다.                        |
| sendParam | object  | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [approve][]의 파라미터 설명을 참고하십시오. |

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP-17 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 from 필드에서 sendParam 객체를 통해 전송
> kip17.setApprovalForAll('0x{address in hex}', false, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x34379ac5b71f16f41d5171d021ca2945e02c60d9fb7f85fc0127262c2ce72b47',
    blockNumber: 3340,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    status: true,
    to: '0x1f15b1a4da5437b29bfb7f248b5e344e6b16b654',
    ...
    events: {
        ApprovalForAll: {
            address: '0x1f15B1A4DA5437b29BfB7f248B5e344E6b16b654',
            blockNumber: 3340,
            transactionHash: '0x72fdf23482b9cf164638e6cbdfdf56541a6189c88639e21f076a8a50ef749a50',
            transactionIndex: 0,
            blockHash: '0x34379ac5b71f16f41d5171d021ca2945e02c60d9fb7f85fc0127262c2ce72b47',
            logIndex: 0,
            id: 'log_1069ad22',
            returnValues: {
                '0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                '1': '0x399bE7034F26feFB5AE683e488903B8bE5ad38b8',
                '2': false,
                owner: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                operator: '0x399bE7034F26feFB5AE683e488903B8bE5ad38b8',
                approved: false,
            },
            event: 'ApprovalForAll',
            signature: '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31',
            raw: {
                data: '0x0000000000000000000000000000000000000000000000000000000000000000',
                topics: [ '0x17307...', '0x00...afd', '0x00...8b8' ],
            },
        },
    },
}

// 스마트 컨트랙트 실행에 수수료 대납 트랜잭션 사용
> kip17.setApprovalForAll('0x{address in hex}', false, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip17.options.from 사용
// kip17 인스턴스로 트랜잭션을 보낼 때 sendParam 객체에서 `from`을 지정하지 않는다면
// kip17.options.from 값이 설정되어 있을 시 기본 값으로 사용
> kip17.options.from = '0x{address in hex}'
> kip17.setApprovalForAll('0x{address in hex}', true).then(console.log)
```


## kip17.transferFrom <a id="kip17-transferfrom"></a>

```javascript
kip17.transferFrom(from, to, tokenId [, sendParam])
```
Transfers the token of the given token id, `tokenId` from the token owner's balance to another address. The address that was authorized to send the token owner's token (the operator) or the token owner him/herself is expected to execute this token transfer transaction. Thus, an authorized account or the token owner should be the sender of this transaction whose address must be given at `sendParam.from` or `kip17Instance.options.from`. Unless both `sendParam.from` and `kip17Instance.options.from` are provided, an error would occur. 가능하다면 이 메서드 대신 [safeTransferFrom](#kip17-safetransferfrom)를 사용하십시오.

트랜잭션 전송은 트랜잭션 발신자에게 트랜잭션 수수료를 부과함을 유의하십시오.

**매개변수**

| 이름        | 타입                                    | 설명                                                                                            |
| --------- | ------------------------------------- | --------------------------------------------------------------------------------------------- |
| from      | string                                | 주어진 토큰 소유자 주소 또는 주어진 토큰을 전송하도록 승인받은 operator 주소입니다.                                           |
| to        | string                                | 토큰을 받을 계정 주소입니다.                                                                              |
| tokenId   | BigNumber &#124; string &#124; number | 전송하고 싶은 토큰의 토큰 ID입니다.                                                                         |
| sendParam | object                                | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [approve][]의 파라미터 설명을 참고하십시오. |

**참고** `tokenId` 파라미터는 `Number` 타입 값을 받지만, 입력된 값이 Number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP-17 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 from 필드에서 sendParam 객체를 통해 전송
> kip17.transferFrom('0x{address in hex}', '0x{address in hex}', 2, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x9cae3aa93d327804f333674a77d5d01d8c7908c49749b0d747b6391faa232b58',
    blockNumber: 3592,
    contractAddress: null,
    from: '0x9c4fc0ab840914a29c7deb5cc5c625a4cec3a9cd',
    ...
    status: true,
    to: '0x6e611498570bbc8cb127899c4d24e156ec72473a',
    ...
    events: {
        Transfer: {
            address: '0x6e611498570bBc8cb127899C4D24e156ec72473a',
            blockNumber: 3592,
            transactionHash: '0x386af961e5acda2c5bd58ec71ee52f579dc2b07a2e5ec97678453f04cc1b709a',
            transactionIndex: 0,
            blockHash: '0x9cae3aa93d327804f333674a77d5d01d8c7908c49749b0d747b6391faa232b58',
            logIndex: 0,
            id: 'log_c2ba5874',
            returnValues: {
                '0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                '1': '0x045796ABC035001CF50274FcA8A2614Abf5dd6bf',
                '2': '2',
                from: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                to: '0x045796ABC035001CF50274FcA8A2614Abf5dd6bf',
                tokenId: '2',
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x',
                topics: [ '0xddf25...', '0x00...afd', '0x00...6bf', '0x00...002' ],
            },
        },
    },
}

// 스마트 컨트랙트 실행에 수수료 대납 트랜잭션 사용
> kip17.transferFrom('0x{address in hex}', '0x{address in hex}', 2, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip17.options.from 사용
// kip17 인스턴스로 트랜잭션을 보낼 때 sendParam 객체에서 `from`을 지정하지 않는다면
// kip17.options.from 값이 설정되어 있을 시 기본 값으로 사용
> kip17.options.from = '0x{address in hex}'
> kip17.transferFrom('0x{address in hex}', '0x{address in hex}', 2).then(console.log)
```


## kip17.safeTransferFrom <a id="kip17-safetransferfrom"></a>

```javascript
kip17.safeTransferFrom(from, to, tokenId [, data] [, sendParam])
```
더 안전한 방법으로 주어진 토큰 ID `tokenId`를 가진 토큰을 토큰 소유자 잔액에서 다른 계정으로 전송합니다. The address that was authorized to send the token owner's token (the operator) or the token owner him/herself is expected to execute this token transfer transaction. Thus, an authorized address or the token owner should be the sender of this transaction whose address must be given at `sendParam.from` or `kip17Instance.options.from`. Unless both `sendParam.from` and `kip17Instance.options.from` are provided, an error would occur.

`to`이 컨트랙트 주소라면, 이 컨트랙트는 반드시 [IKIP17Receiver.onKIP17Received](https://kips.klaytn.com/KIPs/kip-17#wallet-interface)를 구현했어야 합니다. 그렇지 않으면, 전송은 거부됩니다.

트랜잭션 전송은 트랜잭션 발신자에게 트랜잭션 수수료를 부과함을 유의하십시오.

**매개변수**

| 이름        | 타입                                    | 설명                                                                                            |
| --------- | ------------------------------------- | --------------------------------------------------------------------------------------------- |
| from      | string                                | 주어진 토큰 소유자 주소 또는 주어진 토큰을 전송하도록 승인받은 operator 주소입니다.                                           |
| to        | string                                | 토큰을 받을 계정 주소입니다.                                                                              |
| tokenId   | BigNumber &#124; string &#124; number | 전송하고 싶은 토큰의 토큰 ID입니다.                                                                         |
| data      | Buffer &#124; string &#124; number    | (선택 사항) 호출 시 함께 보낼 데이터입니다.                                                                    |
| sendParam | object                                | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [approve][]의 파라미터 설명을 참고하십시오. |

**참고** `tokenId` 파라미터는 `Number` 타입 값을 받지만, 입력된 값이 Number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP-17 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// (데이터 없이) 주어진 from 필드에서 sendParam 객체를 통해 전송
> kip17.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 9, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x14c5bebc2be86081d8375ba11edba0e541be1df24c1beced1a9e82e3083a8035',
    blockNumber: 6260,
    contractAddress: null,
    from: '0x80b88b47361cec0baee1947868fc872b784cf91e',
    ...
    status: true,
    to: '0xa9066e2b62483bcdf6358874cb87f9e0046e8ad3',
    ...
    events: {
        Transfer: {
            address: '0xA9066e2B62483bcdf6358874CB87f9e0046E8ad3',
            blockNumber: 6260,
            transactionHash: '0x0a92436289e70018f9ebef0df5d3ce87874afd8e5058fcc08fefc6de3e0e9b36',
            transactionIndex: 0,
            blockHash: '0x14c5bebc2be86081d8375ba11edba0e541be1df24c1beced1a9e82e3083a8035',
            logIndex: 0,
            id: 'log_c9c17595',
            returnValues: {
                '0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                '1': '0x0F47Ea1A10B8F7D61c894E392EfaC990A314d313',
                '2': '9',
                from: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                to: '0x0F47Ea1A10B8F7D61c894E392EfaC990A314d313',
                tokenId: '9',
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x',
                topics: [ '0xddf25...', '0x00...afd', '0x00...313', '0x00...009' ],
            },
        },
    },
}

// 스마트 컨트랙트 실행에 수수료 대납 트랜잭션 사용
> kip17.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 9, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

//  주어진 from 필드(데이터 있음)에서 sendParam 객체를 통해 전송
> kip17.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11, '0x1234', { from: '0x{address in hex}' }).then(console.log)

// kip17.options.from 사용
// kip17 인스턴스로 트랜잭션을 보낼 때 sendParam 객체에서 `from`을 지정하지 않는다면
// kip17.options.from 값이 설정되어 있을 시 기본 값으로 사용
> kip17.options.from = '0x{address in hex}'
> kip17.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11).then(console.log)
```


## kip17.addMinter <a id="kip17-addminter"></a>

```javascript
kip17.addMinter(account [, sendParam])
```
계정을 발행자에 추가합니다. 발행자는 토큰을 발행하도록 허락된 계정입니다.

addMinter 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**매개변수**

| 이름        | 타입     | 설명                                                                                            |
| --------- | ------ | --------------------------------------------------------------------------------------------- |
| account   | string | 발행자에 추가될 계정 주소입니다.                                                                            |
| sendParam | object | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [approve][]의 파라미터 설명을 참고하십시오. |

**참고** 만약 `sendParam.from` 또는 `kip17.options.from`이 주어졌다면, 이 주소는 반드시 발행자여야 합니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP-17 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 from 필드에서 sendParam 객체를 통해 전송
> kip17.addMinter('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xecd0fb45a32323d5cb14558d1d9299393022d5e7284519598dbd8b14c4c55930',
    blockNumber: 8307,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    status: true,
    to: '0x1595b5c1027ed36dcb32e4d39766b896d5b97ecb',
    ...
    events: {
        MinterAdded: {
            address: '0x1595b5c1027ed36dCB32e4D39766b896d5B97ecb',
            blockNumber: 8307,
            transactionHash: '0xf8da21958c84aa3ed8bfa5eea0649c5b9a895efa8c7a715196e000bef4f0b8bd',
            transactionIndex: 0,
            blockHash: '0xecd0fb45a32323d5cb14558d1d9299393022d5e7284519598dbd8b14c4c55930',
            logIndex: 0,
            id: 'log_f40a92bf',
            returnValues: {
                '0': '0x90170C1E7E8C14BBf1124f52980372088BA540Dc',
                account: '0x90170C1E7E8C14BBf1124f52980372088BA540Dc',
            },
            event: 'MinterAdded',
            signature: '0x6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f6',
            raw: {
                data: '0x',
                topics: [ '0x6ae17...', '0x00...0dc' ],
            },
        },
    },
}

// 스마트 컨트랙트 실행에 수수료 대납 사용
> kip17.addMinter('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip17.options.from 사용
// kip17 인스턴스로 트랜잭션을 보낼 때 sendParam 객체에서 `from`을 지정하지 않는다면
// kip17.options.from 값이 설정되어 있을 시 기본 값으로 사용
> kip17.options.from = '0x{address in hex}'
> kip17.addMinter('0x{address in hex}').then(console.log)
```


## kip17.renounceMinter <a id="kip17-renounceminter"></a>

```javascript
kip17.renounceMinter([sendParam])
```

토큰 발행 권한을 포기합니다. 오직 발행자 주소만이 발행 권한을 포기할 수 있습니다.

renounceMinter 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**매개변수**

| 이름        | 타입     | 설명                                                                                            |
| --------- | ------ | --------------------------------------------------------------------------------------------- |
| sendParam | object | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [approve][]의 파라미터 설명을 참고하십시오. |

`sendParam.from` 또는 `kip17.options.from`이 주어졌다면, 이 주소는 반드시 MinterRole를 가진 발행자여야 합니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP-17 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 from 필드에서 sendParam 객체를 통해 전송
> kip17.renounceMinter({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xe130d7ee71a2c55b3cf4e2bce9ea26e7c2cde556c7f8288abac60121b27c26c8',
    blockNumber: 8542,
    contractAddress: null,
    from: '0xb72f5cf2627e6614984d8a9f27ee426b29191831',
    ...
    status: true,
    to: '0xf9d0663fc29c48495f42c0b061cb06df6df76c34',
    ...
    events: {
        MinterRemoved: {
            address: '0xF9D0663fC29c48495F42c0b061cB06Df6DF76c34',
            blockNumber: 8542,
            transactionHash: '0x557a4e7b9fd6577ffdb14c2e1f00c0009a7bbda2294502fa765250632b5b0f99',
            transactionIndex: 0,
            blockHash: '0xe130d7ee71a2c55b3cf4e2bce9ea26e7c2cde556c7f8288abac60121b27c26c8',
            logIndex: 0,
            id: 'log_04b47645',
            returnValues: {
                '0': '0xB72F5cF2627e6614984D8A9F27eE426b29191831',
                account: '0xB72F5cF2627e6614984D8A9F27eE426b29191831',
            },
            event: 'MinterRemoved',
            signature: '0xe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb66692',
            raw: {
                data: '0x',
                topics: [ '0xe9447...', '0x00...831' ],
            },
        },
    },
}

// 스마트 컨트랙트 실행에 수수료 대납 사용
> kip17.renounceMinter({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip17.options.from 사용
// kip17 인스턴스로 트랜잭션을 보낼 때 sendParam 객체에서 `from`을 지정하지 않는다면
// kip17.options.from 값이 설정되어 있을 시 기본 값으로 사용
> kip17.options.from = '0x{address in hex}'
> kip17.renounceMinter().then(console.log)
```


## kip17.mintWithTokenURI <a id="kip17-mintwithtokenuri"></a>

```javascript
kip17.mintWithTokenURI(to, tokenId, tokenURI [, sendParam])
```
주어진 URI와 토큰 ID로 토큰을 만들고 주어진 계정에 발행합니다. 이 토큰에는 주어진 URI값이 저장됩니다. 이 메서드는 이 토큰의 총 발행량을 증가시킵니다.

mintWithTokenURI 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**매개변수**

| 이름        | 타입                                    | 설명                                                                                            |
| --------- | ------------------------------------- | --------------------------------------------------------------------------------------------- |
| to        | string                                | 토큰이 발행될 계정 주소입니다.                                                                             |
| tokenId   | BigNumber &#124; string &#124; number | 발행될 토큰 ID입니다.                                                                                 |
| tokenURI  | string                                | 발행될 토큰 URI입니다.                                                                                |
| sendParam | object                                | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [approve][]의 파라미터 설명을 참고하십시오. |

**참고** `tokenId` 파라미터는 `Number` 타입 값을 받지만, 입력된 값이 Number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

**참고** 만약 `sendParam.from` 또는 `kip17.options.from`이 주어졌다면, 이 주소는 반드시 MinterRole를 가진 발행자여야 합니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP-17 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 from 필드에서 sendParam 객체를 통해 전송
> kip17.mintWithTokenURI('0x{address in hex}', 18, tokenURI, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xd2473b9853ad33c5fa0a75187e65733614ed4f8c937d06e239768a5ca32d7c7f',
    blockNumber: 9313,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    status: true,
    to: '0x7fbf73709054007f5262692f8faf27dee75ab3a6',
    ...
    events: {
        Transfer: {
            address: '0x7FBf73709054007f5262692f8FaF27dEE75Ab3A6',
            blockNumber: 9313,
            transactionHash: '0x17c2eda25c8a817915e3dd77b4fb4838259e8b49ae1c0d8e369167f715a08e7f',
            transactionIndex: 0,
            blockHash: '0xd2473b9853ad33c5fa0a75187e65733614ed4f8c937d06e239768a5ca32d7c7f',
            logIndex: 0,
            id: 'log_d060e77e',
            returnValues: {
                '0': '0x0000000000000000000000000000000000000000',
                '1': '0x203ad91221290901CFDAC9399aCf664499924744',
                '2': '18',
                from: '0x0000000000000000000000000000000000000000',
                to: '0x203ad91221290901CFDAC9399aCf664499924744',
                tokenId: '18',
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x',
                topics: [ '0xddf25...', '0x00...000', '0x00...744', '0x00...012' ],
            },
        },
    },
}

// 스마트 컨트랙트 실행에 수수료 대납 사용
> kip17.mintWithTokenURI('0x{address in hex}', 18, tokenURI, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip17.options.from 사용
// kip17 인스턴스로 트랜잭션을 보낼 때 sendParam 객체에서 `from`을 지정하지 않는다면
// kip17.options.from 값이 설정되어 있을 시 기본 값으로 사용
> kip17.options.from = '0x{address in hex}'
> kip17.mintWithTokenURI('0x{address in hex}', 18, tokenURI).then(console.log)
```


## kip17.burn <a id="kip17-burn"></a>

```javascript
kip17.burn(tokenId [, sendParam])
```
주어진 토큰 ID를 가진 토큰을 제거합니다. `sendParam.from` 또는 `kip17.options.from`가 주어지지 않는다면 에러가 발생합니다.

burn 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**매개변수**

| 이름        | 타입                                    | 설명                                                                                            |
| --------- | ------------------------------------- | --------------------------------------------------------------------------------------------- |
| tokenId   | BigNumber &#124; string &#124; number | 제거할 토큰 ID입니다.                                                                                 |
| sendParam | object                                | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [approve][]의 파라미터 설명을 참고하십시오. |

**참고** `tokenId` 파라미터는 `Number` 타입 값을 받지만, 입력된 값이 Number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP-17 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 from 필드에서 sendParam 객체를 통해 전송
> kip17.burn(14, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x09d8ed5582fdd1c39b0f19f14f065659fe275a60856d86a1840535f6df1a2d51',
    blockNumber: 18237,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    status: true,
    to: '0x2032e61c79a951aacef8033adca96fc3b9b747b4',
    ...
    events: {
        Transfer: {
            address: '0x2032e61C79A951AACEf8033AdCa96fC3b9b747b4',
            blockNumber: 18237,
            transactionHash: '0x4e377d8d65c8565c7bc91568bcdcc0fddeb46a02a778725e437f368a8d9c6165',
            transactionIndex: 0,
            blockHash: '0x09d8ed5582fdd1c39b0f19f14f065659fe275a60856d86a1840535f6df1a2d51',
            logIndex: 0,
            id: 'log_5af49695',
            returnValues: {
                '0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '14',
                from: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                to: '0x0000000000000000000000000000000000000000',
                tokenId: '14',
            },
            event: 'Transfer',
            signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
            raw: {
                data: '0x',
                topics: [ '0xddf25...', '0x00...afd', '0x00...000', '0x00...00e' ],
            },
        },
    },
}

// 스마트 컨트랙트 실행에 수수료 대납 사용
> kip17.burn(14, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip17.options.from 사용
// kip17 인스턴스로 트랜잭션을 보낼 때 sendParam 객체에서 `from`을 지정하지 않는다면
// kip17.options.from 값이 설정되어 있을 시 기본 값으로 사용
> kip17.options.from = '0x{address in hex}'
> kip17.burn(14).then(console.log)
```


## kip17.pause <a id="kip17-pause"></a>

```javascript
kip17.pause([sendParam])
```
토큰 전송과 관련된 기능들을 중지합니다.

pause 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**매개변수**

| 이름        | 타입     | 설명                                                                                            |
| --------- | ------ | --------------------------------------------------------------------------------------------- |
| sendParam | object | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [approve][]의 파라미터 설명을 참고하십시오. |

**참고** 만약 `sendParam.from` 또는 `kip17.options.from`이 주어졌다면, 이 주소는 반드시 PauserRole을 가진 컨트랙트 중지 권한 소유자이어야 합니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP-17 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 from 필드에서 sendParam 객체를 통해 전송
> kip17.pause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xd73c026474b2077a04808ed0ce6713821eaa8afaed476b19d22b28e483747e04',
    blockNumber: 19826,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    status: true,
    to: '0x601c11f396e92436df8d9bbaff3fbfec906b7f67',
    ...
    events: {
        Paused: {
            address: '0x601C11F396E92436Df8d9bBAFf3fbfEc906B7f67',
            blockNumber: 19826,
            transactionHash: '0x549f7786ca5d2c1877be20126fc51c2418194ecaa8cea536d08f72c2f01919d0',
            transactionIndex: 0,
            blockHash: '0xd73c026474b2077a04808ed0ce6713821eaa8afaed476b19d22b28e483747e04',
            logIndex: 0,
            id: 'log_93d26310',
            returnValues: {
                '0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                account: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
            },
            event: 'Paused',
            signature: '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258',
            raw: {
                data: '0x0000000000000000000000001147c04b90d1546d76983e19937ad2cdae8b8afd',
                topics: ['0x62e78...'],
            },
        },
    },
}

// 스마트 컨트랙트 실행에 수수료 대납 사용
> kip17.pause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip17.options.from 사용
// kip17 인스턴스로 트랜잭션을 보낼 때 sendParam 객체에서 `from`을 지정하지 않는다면
// kip17.options.from 값이 설정되어 있을 시 기본 값으로 사용
> kip17.options.from = '0x{address in hex}'
> kip17.pause().then(console.log)
```


## kip17.unpause <a id="kip17-unpause"></a>

```javascript
kip17.unpause([sendParam])
```
중지된 컨트랙트를 재개합니다.

unpause 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**매개변수**

| 이름        | 타입     | 설명                                                                                            |
| --------- | ------ | --------------------------------------------------------------------------------------------- |
| sendParam | object | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [approve][]의 파라미터 설명을 참고하십시오. |

**참고** 만약 `sendParam.from` 또는 `kip17.options.from`이 주어졌다면, 이 주소는 반드시 PauserRole을 가진 컨트랙트 중지 권한 소유자이어야 합니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP-17 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 from 필드에서 sendParam 객체를 통해 전송
> kip17.unpause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x6a9fc0c70853e696e687b119ba95971a42d91616a040ec17afe1fd4803f5a6cb',
    blockNumber: 19845,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    status: true,
    to: '0x601c11f396e92436df8d9bbaff3fbfec906b7f67',
    ...
    events: {
        Unpaused: {
            address: '0x601C11F396E92436Df8d9bBAFf3fbfEc906B7f67',
            blockNumber: 19845,
            transactionHash: '0x4f0d2767fc36e5062a34753bc447a2c15b476c304f8e9e013ddf06124db33229',
            transactionIndex: 0,
            blockHash: '0x6a9fc0c70853e696e687b119ba95971a42d91616a040ec17afe1fd4803f5a6cb',
            logIndex: 0,
            id: 'log_364c25d2',
            returnValues: {
                '0': '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
                account: '0x1147c04b90D1546d76983e19937aD2cDAE8b8afD',
            },
            event: 'Unpaused',
            signature: '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa',
            raw: {
                data: '0x0000000000000000000000001147c04b90d1546d76983e19937ad2cdae8b8afd',
                topics: ['0x5db9e...'],
            },
        },
    },
}

// 스마트 컨트랙트 실행에 수수료 대납 사용
> kip17.unpause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip17.options.from 사용
// kip17 인스턴스로 트랜잭션을 보낼 때 sendParam 객체에서 `from`을 지정하지 않는다면
// kip17.options.from 값이 설정되어 있을 시 기본 값으로 사용
> kip17.options.from = '0x{address in hex}'
> kip17.unpause().then(console.log)
```


## kip17.addPauser <a id="kip17-addpauser"></a>

```javascript
kip17.addPauser(account [, sendParam])
```
계정에게 컨트랙트를 중지할 권한을 추가합니다.

addPauser 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**매개변수**

| 이름        | 타입     | 설명                                                                                            |
| --------- | ------ | --------------------------------------------------------------------------------------------- |
| account   | string | 컨트랙트 중지 권한을 가질 계정 주소입니다.                                                                      |
| sendParam | object | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [approve][]의 파라미터 설명을 참고하십시오. |

**참고** 만약 `sendParam.from` 또는 `kip17.options.from`이 주어졌다면, 이 주소는 반드시 PauserRole을 가진 컨트랙트 중지 권한 소유자이어야 합니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP-17 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 from 필드에서  sendParam 객체를 통해 전송
> kip17.addPauser('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xd9f18912c9666a67a2e7445af0abe5140212955b3d35c491e5475d512fdee7d5',
    blockNumber: 20502,
    contractAddress: null,
    from: '0x1147c04b90d1546d76983e19937ad2cdae8b8afd',
    ...
    status: true,
    to: '0x4010afbfbf8d94830b226fc5ff311859af806b90',
    ...
    events: {
        PauserAdded: {
            address: '0x4010afbfbF8d94830b226Fc5ff311859AF806B90',
            blockNumber: 20502,
            transactionHash: '0x5f6fef2df70dcbe67e6d74e201005b618da5d53ac2f85ad31fce39226fd1b70b',
            transactionIndex: 0,
            blockHash: '0xd9f18912c9666a67a2e7445af0abe5140212955b3d35c491e5475d512fdee7d5',
            logIndex: 0,
            id: 'log_bf9f8982',
            returnValues: {
                '0': '0xD050b56bB04Da257D144e6b382318A2B8c58b0B2',
                account: '0xD050b56bB04Da257D144e6b382318A2B8c58b0B2',
            },
            event: 'PauserAdded',
            signature: '0x6719d08c1888103bea251a4ed56406bd0c3e69723c8a1686e017e7bbe159b6f8',
            raw: {
                data: '0x',
                topics: [ '0x6719d...', '0x00...0b2' ],
            },
        },
    },
}

// 스마트 컨트랙트 실행에 수수료 대납 사용
> kip17.addPauser('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip17.options.from 사용
// kip17 인스턴스로 트랜잭션을 보낼 때 sendParam 객체에서 `from`을 지정하지 않는다면
// kip17.options.from 값이 설정되어 있을 시 기본 값으로 사용
> kip17.options.from = '0x{address in hex}'
> kip17.addPauser('0x{address in hex}').then(console.log)
```


## kip17.renouncePauser <a id="kip17-renouncepauser"></a>

```javascript
kip17.renouncePauser([sendParam])
```
토큰 중지 권한을 포기합니다. 오직 컨트랙트 중지 권한 소유자 주소만이 중지 권한을 포기할 수 있습니다.

renouncePauser 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**매개변수**

| 이름        | 타입     | 설명                                                                                            |
| --------- | ------ | --------------------------------------------------------------------------------------------- |
| sendParam | object | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [approve][]의 파라미터 설명을 참고하십시오. |

**참고** 만약 `sendParam.from` 또는 `kip17.options.from`이 주어졌다면, 이 주소는 반드시 PauserRole을 가진 컨트랙트 중지 권한 소유자이어야 합니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP-17 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 from 필드에서 sendParam 객체를 통해 전송
> kip17.renouncePauser({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x32bb338ca23846478934416d1b1f4152b69a49411d61b316cff8b3a7d62ca91e',
    blockNumber: 20512,
    contractAddress: null,
    from: '0xe04cb220e94e6595427568c954b5d819392813bc',
    ...
    status: true,
    to: '0x4010afbfbf8d94830b226fc5ff311859af806b90',
    ...
    events: {
        PauserRemoved: {
            address: '0x4010afbfbF8d94830b226Fc5ff311859AF806B90',
            blockNumber: 20512,
            transactionHash: '0x72982fa8a8de25c961cd19bd91aa7acf0111feb8e9026e607d89843bcd8f783a',
            transactionIndex: 0,
            blockHash: '0x32bb338ca23846478934416d1b1f4152b69a49411d61b316cff8b3a7d62ca91e',
            logIndex: 0,
            id: 'log_0a9d1350',
            returnValues: {
                '0': '0xE04cB220e94E6595427568c954b5D819392813bC',
                account: '0xE04cB220e94E6595427568c954b5D819392813bC',
            },
            event: 'PauserRemoved',
            signature: '0xcd265ebaf09df2871cc7bd4133404a235ba12eff2041bb89d9c714a2621c7c7e',
            raw: {
                data: '0x',
                topics: [ '0xcd265...', '0x00...3bc' ],
            },
        },
    },
}

// 스마트 컨트랙트 실행에 수수료 대납 사용
> kip17.renouncePauser({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip17.options.from 사용
// kip17 인스턴스로 트랜잭션을 보낼 때 sendParam 객체에서 `from`을 지정하지 않는다면
// kip17.options.from 값이 설정되어 있을 시 기본 값으로 사용
> kip17.options.from = '0x{address in hex}'
> kip17.renouncePauser().then(console.log)
```

[getTransactionReceipt]: ../caver.rpc/klay.md#caver-rpc-klay-gettransactionreceipt
[approve]: #kip17-approve
