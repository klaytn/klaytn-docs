# caver.kct.kip37<a id="caver-kct-kip37"></a>

`caver.kct.kip37`은 JavaScript의 객체로서 KIP-37을 구현하는 스마트 컨트랙트를 Klaytn 블록체인 플랫폼에서 쉽게 다룰 수 있도록 도와줍니다.

`caver.kct.kip37`는 KIP-37 토큰 컨트랙트를 구현하기 위해 [caver.contract](../caver.contract.md)를 상속합니다. `caver.kct.kip37`은 `caver.contract`와 동일한 속성값들을 가지며, 추가 기능 구현을 위한 메서드를 더 가지고 있습니다. 이 장은 `caver.kct.kip37` 메서드들 중 오직 새롭게 추가된 것만을 소개합니다.

caver-js에서 KIP-37을 구현한 예시는 [Klaytn Contracts Github Repo](https://github.com/klaytn/klaytn-contracts/tree/master/contracts/token/KIP37)에서 확인할 수 있습니다.

KIP-37에 관한 더 자세한 정보는 [Klaytn Improvement Proposals](https://kips.klaytn.com/KIPs/kip-37)를 참조하십시오.

**참고** `caver.kct.kip37`는 caver-js [v1.5.7](https://www.npmjs.com/package/caver-js/v/1.5.7)부터 지원됩니다.

## caver.kct.kip37.deploy <a id="caver-klay-kip37-deploy"></a>

```javascript
caver.kct.kip37.deploy(tokenInfo, deployer)
```
KIP-37 토큰 컨트랙트를 Klaytn 블록체인에 배포합니다. caver.kct.kip37.deploy를 사용해 배포한 컨트랙트는 KIP-37 표준을 따르는 멀티 토큰입니다.

성공적으로 배포된 후, 프로미스는 새로운 KIP37 인스턴스를 반환할 것입니다.

**Parameters**

| 이름        | 타입                   | 설명                                                                                                                                                                                                                                                                                                                                                         |
| --------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenInfo | object               | Klaytn 블록체인에 KIP-37 토큰 컨트랙트를 배포하는 데 필요한 정보입니다. 자세한 내용은 아래 표를 참조하세요.                                                                                                                                                                                                                                                                                        |
| deployer  | string &#124; object | KIP-37 토큰 컨트랙트를 배포할 keyring 인스턴스의 계정 주소입니다. 이 주소는 반드시 배포를 위해 충분한 KLAY를 가지고 있어야 합니다. 자세한 내용은 [Keyring](../caver.wallet/keyring.md#caver-wallet-keyring)을 참조하세요. 트랜잭션 전송 시 사용할 필드를 자체적으로 정의하고 싶다면 객체 타입을 매개변수로 전달하면 됩니다. KIP-37 컨트랙트 배포 시 수수료 위임을 이용하고 싶다면, 객체 내 수수료 위임과 관련된 필드를 정의할 수 있습니다. 객체에 정의될 수 있는 필드에 대해서는 [create](#kip37-create)의 매개변수 설명을 참고하십시오. |

tokenInfo 객체는 다음을 반드시 포함해야 합니다:

| 이름  | 타입     | 설명                                                                                                         |
| --- | ------ | ---------------------------------------------------------------------------------------------------------- |
| uri | string | [token type ID substitution mechanism](http://kips.klaytn.com/KIPs/kip-37#metadata)에 의거한 모든 토큰 타입의 URI입니다. |

**리턴값**

`PromiEvent`: 이벤트 이미터와 결합된 프로미스이며 새로운 KIP37 인스턴스를 반환합니다. 추가로 다음 이벤트가 발생할 수 있습니다.

| 이름              | 타입     | 설명                                                                                                                                                    |
| --------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| transactionHash | string | 트랜잭션이 전송된 직후 및 트랜잭션 해시를 사용할 수 있을 때 발생합니다.                                                                                                             |
| receipt         | object | 트랜잭션 영수증을 사용할 수 있을 때 발생합니다. 영수증 객체 속성값들에 관한 자세한 정보는 [getTransactionReceipt][]를 참고하십시오. KIP37 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다. |
| error           | 에러     | 전송 중 오류가 나타나면 발생됩니다.                                                                                                                                  |

**예시**

```javascript
// 프로미스 사용
> caver.kct.kip37.deploy({
    uri: 'https://caver.example/{id}.json',
}, '0x{address in hex}').then(console.log)
KIP37 {
    ...
    _address: '0x7314B733723AA4a91879b15a6FEdd8962F413CB2',
    _jsonInterface: [
        ...
        {
            anonymous: false,
            inputs: [{ indexed: false, name: 'value', type: 'string' }, { indexed: true, name: 'id', type: 'uint256' }],
            name: 'URI',
            type: 'event',
            signature: '0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b',
        }
    ] 
}

// 두 번째 파라미터로 객체 전달
> caver.kct.kip37.deploy({
    uri: 'https://caver.example/{id}.json',
    },
    {
        from: '0x{address in hex}',
        feeDelegation: true,
        feePayer: '0x{address in hex}',
    }).then(console.log)

// 이벤트 이미터와 프로미스 사용
> caver.kct.kip37.deploy({
    uri: 'https://caver.example/{id}.json',
}, '0x{address in hex}')
.on('error', function(error) { ... })
.on('transactionHash', function(transactionHash) { ... })
.on('receipt', function(receipt) {
    console.log(receipt.contractAddress) // contains the new token contract address
})
.then(function(newKIP37Instance) {
    console.log(newKIP37Instance.options.address) // instance with the new token contract address
})
```

## caver.kct.kip37.detectInterface <a id="caver-kct-kip37-detectinterface"></a>

```javascript
caver.kct.kip37.detectInterface(contractAddress)
```
토큰 컨트랙트에 의해 구현된 인터페이스 정보를 반환합니다. 이 정적 함수는 [kip37.detectInterface](#kip37-detectinterface)를 사용합니다.

**Parameters**

| 이름              | 타입     | 설명                     |
| --------------- | ------ | ---------------------- |
| contractAddress | string | KIP-37 토큰 컨트랙트의 주소입니다. |

**리턴값**

`Promise`는 각 [KIP-37 interface](https://kips.klaytn.com/KIPs/kip-7#kip-13-identifiers)가 구현되었는지에 대한 boolean 값을 포함한 `object`를 반환합니다.

**예시**

```javascript
> caver.kct.kip37.detectInterface('0x{address in hex}').then(console.log)
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}
```

## caver.kct.kip37.create <a id="caver-kct-kip37-create"></a>

```javascript
caver.kct.kip37.create([tokenAddress])
```
새로운 KIP37 인스턴스를 인스턴스 메소드, 이벤트들과 함께 생성합니다. 이 함수는 [new KIP37](#new-kip37)과 동일하게 작동합니다.

**참고** `caver.kct.kip37.create`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1)부터 지원됩니다.

**Parameters**

[new KIP37](#new-kip37)을 참고하세요.


**리턴값**

[new KIP37](#new-kip37)을 참고하세요.


**예시**

```javascript
// 매개변수 없는 KIP17 인스턴스 생성
> const kip17 = caver.kct.kip37.create()

// 토큰 주소를 가진 KIP37 인스턴스 생성
> const kip17 = caver.kct.kip37.create('0x{address in hex}')
```


## new KIP37 <a id="new-kip37"></a>

```javascript
new caver.kct.kip37([tokenAddress])
```
새로운 KIP37 인스턴스를 인스턴스 메소드, 이벤트들과 함께 생성합니다.

**Parameters**

| 이름           | 타입     | 설명                                                                                   |
| ------------ | ------ | ------------------------------------------------------------------------------------ |
| tokenAddress | string | (선택 사항) KIP-37 토큰 컨트랙트 주소이며 나중에 `kip37.options.address = '0x1234..'`로 값을 설정할 수 있습니다. |


**리턴값**

| 타입     | 설명                                   |
| ------ | ------------------------------------ |
| object | 인스턴스 메소드와 이벤트들을 갖고 있는 KIP37 인스턴스입니다. |


**예시**

```javascript
// 매개변수 없는 KIP37 인스턴스 생성
> const kip37 = new caver.kct.kip37()

// 토큰 주소를 가진 KIP37 인스턴스 생성
> const kip37 = new caver.kct.kip37('0x{address in hex}')
```


## kip37.clone <a id="kip37-clone"></a>

```javascript
kip37.clone([tokenAddress])
```
현재 KIP37 인스턴스를 복제합니다.

**Parameters**

| 이름           | 타입     | 설명                                                                                 |
| ------------ | ------ | ---------------------------------------------------------------------------------- |
| tokenAddress | string | (선택 사항) 다른 KIP37 토큰을 배포했던 스마트 컨트랙트 주소입니다. 입력을 생략하면, 이 주소는 원본 인스턴스의 컨트랙트 주소로 설정됩니다. |

**리턴값**

| 타입     | 설명                          |
| ------ | --------------------------- |
| object | 원본 KIP37 인스턴스를 복제한 인스턴스입니다. |


**예시**

```javascript
> const kip37 = new caver.kct.kip37(address)

// 매개변수 없이 클론
> const cloned = kip37.clone()

// 새 토큰 컨트랙트 주소와 함께 클론
> const cloned = kip37.clone('0x{address in hex}')
```

## kip37.detectInterface <a id="kip37-detectinterface"></a>

```javascript
kip37.detectInterface()
```
토큰 컨트랙트에 의해 구현된 인터페이스 정보를 반환합니다.

**Parameters**

없음

**리턴값**

`Promise`는 각 [KIP-37 interface](https://kips.klaytn.com/KIPs/kip-7#kip-13-identifiers)가 구현되었는지에 대한 boolean 값을 포함한 `object`를 반환합니다.

**예시**

```javascript
> kip37.detectInterface().then(console.log)
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}
```

## kip37.supportsInterface<a id="kip37-supportsinterface"></a>

```javascript
kip37.supportsInterface(interfaceId)
```
이 컨트랙트가 `interfaceId`로 정의된 인터페이스를 구현한다면 `true`를 반환합니다.

**Parameters**

| 이름          | 타입     | 설명                  |
| ----------- | ------ | ------------------- |
| interfaceId | string | 확인할 interfaceId입니다. |

**리턴값**

`프로미스`는 `Boolean`을 반환: 이 컨트랙트가 해당 `interfaceId`를 가진 인터페이스를 구현한다면 `true`를 반환합니다.

**예시**

```javascript
> kip37.supportsInterface('0x6433ca1f').then(console.log)
true

> kip37.supportsInterface('0x3a2820fe').then(console.log)
false
```


## kip37.uri<a id="kip37-uri"></a>

```javascript
kip37.uri(id)
```
주어진 토큰의 고유한 Uniform Resource Identifier (URI)를 반환합니다.

어느 URI에 문자열 "{id}"가 포함된다면, 이 함수는 16진수 형식의 실제 토큰 ID로 이를 대체합니다. [KIP-34 Metadata](http://kips.klaytn.com/KIPs/kip-37#metadata)를 참고하세요.

**Parameters**

| 이름 | 타입                                    | 설명                |
| -- | ------------------------------------- | ----------------- |
| id | BigNumber &#124; string &#124; number | URI를 받을 토큰 ID입니다. |

**참고** `id` 파라미터는 `number` 타입 값을 받지만, 입력된 값이 number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

**리턴값**

`Promise`는 `string`을 반환: 토큰의 URI입니다.

**예시**

```javascript
> kip37.uri('0x0').then(console.log)
'https://caver.example/0000000000000000000000000000000000000000000000000000000000000000.json'
```


## kip37.totalSupply<a id="kip37-totalsupply"></a>

```javascript
kip37.totalSupply(id)
```
특정 토큰의 총 발행량을 반환합니다.

**Parameters**

| 이름 | 타입                                    | 설명                    |
| -- | ------------------------------------- | --------------------- |
| id | BigNumber &#124; string &#124; number | 총 발행량을 확인할 토큰의 ID입니다. |

**참고** `id` 파라미터는 `number` 타입 값을 받지만, 입력된 값이 number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

**리턴값**

`프로미스`는 `BigNumber`를 반환: 토큰의 총 수량입니다.

**예시**

```javascript
> kip37.totalSupply(0).then(console.log)
10000000000
```


## kip37.balanceOf<a id="kip37-balanceof"></a>

```javascript
kip37.balanceOf(account, id)
```
`account`가 소유한, 타입 `id`의 토큰 수량을 반환합니다.

**Parameters**

| 이름      | 타입                                    | 설명                 |
| ------- | ------------------------------------- | ------------------ |
| account | string                                | 잔액을 확인할 계정 주소입니다.  |
| id      | BigNumber &#124; string &#124; number | 잔액을 확인할 토큰의 ID입니다. |

**참고** `id` 파라미터는 `number` 타입 값을 받지만, 입력된 값이 number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

**리턴값**

`Promise`는 `BigNumber`를 반환: 계정이 지닌 토큰의 양입니다.

**예시**

```javascript
> kip37.balanceOf('0x{address in hex}', 0).then(console.log)
20
```


## kip37.balanceOfBatch<a id="kip37-balanceofbatch"></a>

```javascript
kip37.balanceOfBatch(accounts, ids)
```
다수의 계정/토큰쌍의 잔액을 반환합니다. `balanceOfBatch`은 [balanceOf](#kip37-balanceof)의 배치 작업으로, `accounts`와 `ids`의 배열 길이는 동일해야 합니다.

**Parameters**

| 이름       | 타입    | 설명                    |
| -------- | ----- | --------------------- |
| accounts | Array | 잔액을 확인할 계정 주소입니다.     |
| ids      | Array | 잔액을 확인할 토큰 ID의 배열입니다. |

**리턴값**

`Promise`는 `Array`를 반환: 다수의 계정/토큰쌍 잔액입니다.

**예시**

```javascript
> kip37.balanceOfBatch(['0x{address in hex}', '0x{address in hex}'], [0, 1]).then(console.log)
[ 20, 30 ]
```


## kip37.isMinter<a id="kip37-isminter"></a>

```javascript
kip37.isMinter(address)
```
주어진 계정이 새 KIP-37 토큰을 발행할 수 있는 발행자라면 `true`를 반환합니다.

**Parameters**

| 이름      | 타입     | 설명                             |
| ------- | ------ | ------------------------------ |
| address | string | 발행 권한을 가지고 있는지를 확인받을 계정 주소입니다. |

**리턴값**

`프로미스`는 `Boolean`을 반환: 계정이 발행자라면 `true`를 반환합니다.

**예시**

```javascript
kip37.isMinter(address)
```


## kip37.isPauser <a id="kip37-ispauser"></a>

```javascript
kip37.isPauser(address)
```
주어진 계정이 토큰 전송을 멈출 수 있는 pauser라면 `true`를 반환합니다.

**Parameters**

| 이름      | 타입     | 설명                                |
| ------- | ------ | --------------------------------- |
| address | string | 토큰 전송을 멈출 권한이 있는지를 확인받을 계정 주소입니다. |

**리턴값**

`프로미스`는 `Boolean`을 반환: 이 계정이 중지 권한을 가진 계정이라면 `true`를 반환합니다.

**예시**

```javascript
> kip37.isPauser('0x{address in hex}').then(console.log)
true

> kip37.isPauser('0x{address in hex}').then(console.log)
false
```


## kip37.paused<a id="kip37-paused"></a>

```javascript
kip37.pause()
```
토큰 컨트랙트의 트랜잭션(또는 특정 토큰)이 중단되었는지 여부를 반환합니다.

id 파라미터가 정의되지 않은 경우, 토큰 컨트랙트 트랜잭션이 중단되었는지 여부를 반환합니다. id 파라미터가 정의된 경우, 특정 토큰이 중단되었는지 여부를 반환합니다.

**Parameters**

| 이름 | 타입                                    | 설명                                                                                   |
| -- | ------------------------------------- | ------------------------------------------------------------------------------------ |
| id | BigNumber &#124; string &#124; number | (선택 사항) 중단 여부 확인을 위한 토큰 ID입니다. 해당 파라미터 미입력시 `paused` 함수는 컨트랙트가 중단 상태에 있는지 여부를 반환합니다. |

**참고** `id` 파라미터는 `number` 타입 값을 받지만, 입력된 값이 number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

**리턴값**

`Promise`는 `Boolean`을 반환: 이 컨트랙트가 중지되었다면 `true`를 반환합니다.

**예시**

```javascript
// 토큰 ID 매개변수 없이
> kip37.paused().then(console.log)
true
> kip37.paused().then(console.log)
false

// 토큰 ID 매개변수와 함께
> kip37.paused(0).then(console.log)
true
> kip37.paused(1).then(console.log)
false
```


## kip37.isApprovedForAll<a id="kip37-isApprovedforall"></a>

```javascript
kip37.isApprovedForAll(owner, operator)
```
특정 소유자에 대한 operator의 승인 상태를 조회합니다. 특정 소유자가 operator를 승인했을 시 `true`를 반환합니다.

**Parameters**

| 이름       | 타입     | 설명               |
| -------- | ------ | ---------------- |
| owner    | string | 소유자의 주소입니다.      |
| operator | string | Operator의 주소입니다. |

**리턴값**

`Promise`는 `boolean`을 반환: Operator가 승인되었을 시 `true`, 그렇지 않다면 `false`를 반환합니다.

**예시**

```javascript
> kip37.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
true

> kip37.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
false
```


## kip37.create<a id="kip37-create"></a>

```javascript
kip37.create(id, initialSupply [, uri] [, sendParam])
```

새로운 토큰 타입을 생성하며, 발행자에게 `initialSupply`를 할당합니다.

이 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**Parameters**

| 이름            | 타입                                    | 설명                                           |
| ------------- | ------------------------------------- | -------------------------------------------- |
| id            | BigNumber &#124; string &#124; number | 생성할 토큰 ID입니다.                                |
| initialSupply | BigNumber &#124; string &#124; number | 발행할 토큰의 양입니다.                                |
| uri           | string                                | (선택 사항) 생성된 토큰의 URI입니다.                      |
| sendParam     | object                                | (선택 사항) 트랜잭션을 보내는 데 필요한 파라미터들을 가지고 있는 객체입니다. |

**참고** `initialSupply` 파라미터는 `Number` 타입 값을 받지만, 입력된 값이 number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

`sendParam` 객체는 다음을 포함합니다:

| 이름            | 타입                                              | 설명                                                                                                                                                                                                                 |
| ------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| from          | string                                          | (선택 사항) 트랜잭션 발신자 주소입니다. 미입력시 `kip37.options.from`에 의해 지정됩니다. `sendParam`객체의 `from` 또는 `kip37.options.from`가 주어지지 않으면 오류가 발생합니다.                                                                                    |
| gas           | number &#124; string                            | (선택 사항) 이 트랜잭션이 쓸 수 있는 최대 가스량 (가스 제한) 입니다. 미입력시 caver-js가 `kip37.methods.approve(spender, amount).estimateGas({from})`를 호출하여 이 값을 지정합니다.                                                                           |
| gasPrice      | number &#124; string                            | (선택 사항) 이 트랜잭션에 사용할 peb 단위의 가스 가격. 생략하면 `caver.klay.getGasPrice` 값으로 caver-js가 설정합니다.                                                                                                                              |
| value         | number &#124; string &#124; BN &#124; BigNumber | (선택 사항) peb으로 환산한 전송될 토큰 가치.                                                                                                                                                                                       |
| feeDelegation | boolean                                         | (optional, default `false`) 수수료 위임 트랜잭션 사용 여부를 나타냅니다. 미입력시 `kip37.options.feeDelegation`를 사용합니다. 둘 다 미입력시 수수료 위임은 사용되지 않습니다.                                                                                       |
| feePayer      | string                                          | (선택 사항) 트랜잭션 수수료를 부담하는 수수료 납부자의 주소입니다. `feeDelegation`이 `true`일 때, 값은 트랜잭션의 `feePayer` 필드에 설정됩니다. 미입력시 `kip37.options.feePayer`를 사용합니다. 둘 다 미입력시 오류를 반환합니다.                                                        |
| feeRatio      | string                                          | (optional) Fee payer가 부담하게될 트랜잭션 수수료의 비율입니다. `feeDelegation`이 `true`이며, `feeRatio`가 유효한 값으로 설정되었을 경우, 부분 수수료 위임 트랜잭션이 사용됩니다. 유효한 범위는 1에서 99 사이입니다. 0이나 100 이상의 값은 허용되지 않습니다. 미입력시 `kip37.options.feeRatio`를 사용합니다. |

**참고** `feeDelegation`, `feePayer`, 그리고 `feeRatio`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 이후부터 지원됩니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP37 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 필드에서 sendParam 객체를 통해 전송 
> kip37.create(2, '1000000000000000000', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xf1cefd8efbde83595742dc88308143dde50e7bee39a3a0cfea92ed5df3529d61',
    blocknumber: 2823,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 2823,
            transactionHash: '0xee8cdaa0089681d90a52c1539e75c6e26b3eb67affd4fbf70033ba010a3f0d26',
            transactionIndex: 0,
            blockHash: '0xf1cefd8efbde83595742dc88308143dde50e7bee39a3a0cfea92ed5df3529d61',
            logIndex: 0,
            id: 'log_ca64e74b',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '3': '2',
                '4': '1000000000000000000',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0x0000000000000000000000000000000000000000',
                to: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                id: '2',
                value: '1000000000000000000',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x...40000',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...f48' ],
            },
        },
    },
}

// 스마트 컨트랙트 실행을 위해 수수료 대납 트랜잭션 사용
> kip37.create(2, '1000000000000000000', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip37.options.from 사용
// kip37 인스턴스로 트랜잭션을 보낼 때 만약 kip37.options.from 값이 정해져 있는 경우 
// sendParam 객체에 `from`를 명시하지 않는 이상 kip37 인스턴스로 트랜잭션을 보낼 때 그 값을 사용
> kip37.options.from = '0x{address in hex}'
> kip37.create(2, '1000000000000000000').then(console.log)
```

## kip37.setApprovalForAll<a id="kip37-setApprovalforall"></a>

```javascript
kip37.setApprovalForAll(operator, approved [, sendParam])
```
주어진 operator가 소유자의 모든 토큰을 전송하도록 승인하거나 금지합니다.

이 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**Parameters**

| 이름        | 타입      | 설명                                                                                                              |
| --------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| operator  | string  | 토큰 소유자의 모든 토큰을 전송할 권한을 받거나 전송할 권한을 잃게될 계정 주소입니다.                                                                |
| approved  | boolean | `true`이면 이 operator는 전송할 권한을 받습니다. `false`이면 이 operator는 전송할 권한을 잃습니다.                                          |
| sendParam | object  | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [kip37.create](#kip37-create)의 파라미터 설명을 참고하십시오. |

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP37 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 필드에서 sendParam 객체를 통해 전송 
> kip37.setApprovalForAll('0x{address in hex}', true, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x0ee7be40f8b9f4d93d68235acef9fba08fde392a93a1a1743243cb9686943a47',
    blockNumber: 3289,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        ApprovalForAll: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 3289,
            transactionHash: '0x5e94aa4af5f7604f1b32129fa8463c43cae4ff118f80645bfabcc6181667b8ab',
            transactionIndex: 0,
            blockHash: '0x0ee7be40f8b9f4d93d68235acef9fba08fde392a93a1a1743243cb9686943a47',
            logIndex: 0,
            id: 'log_b1f9938f',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '2': true,
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                operator: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                approved: true,
            },
            event: 'ApprovalForAll',
            signature: '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31',
            raw: {
                data: '0x00...001',
                topics: [ '0x17307...', '0x00...f48', '0x00...1a6' ],
            },
        },
    },
}

// 스마트 컨트랙트 실행을 위해 수수료 대납 트랜잭션 사용
> kip37.setApprovalForAll('0x{address in hex}', true, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip37.options.from 사용
// kip37 인스턴스로 트랜잭션을 보낼 때 만약 kip37.options.from 값이 정해져 있는 경우 
// sendParam 객체에 `from`를 명시하지 않는 이상 kip37 인스턴스로 트랜잭션을 보낼 때 그 값을 사용
> kip37.options.from = '0x{address in hex}'
> kip37.setApprovalForAll('0x{address in hex}', true).then(console.log)
```

## kip37.safeTransferFrom<a id="kip37-safetransferfrom"></a>

```javascript
kip37.safeTransferFrom(from, recipient, id, amount, data [, sendParam])
```
타입이 `id`인 특정 토큰의 주어진 `amount`를 `from`으로부터 `recipient`에 안전하게 전송합니다.

The address that was authorized to send the owner's token (the operator) or the token owner him/herself is expected to execute this token transfer transaction. Thus, an authorized address or the token owner should be the sender of this transaction whose address must be given at `sendParam.from` or `kip37.options.from`. Unless both `sendParam.from` and `kip37.options.from` are provided, an error would occur.

만약 수신자 주소가 컨트랙트 주소라면, 컨트랙트는 반드시 [IKIP37Receiver.onKIP37Received](https://kips.klaytn.com/KIPs/kip-37#kip-37-token-receiver)를 구현했어야 합니다. 그렇지 않으면, 전송은 거부됩니다.

이 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**Parameters**

| 이름        | 타입                                    | 설명                                                                                                              |
| --------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| from      | string                                | 토큰을 소유한 계정 주소입니다. 이 계정 주소 잔액에서 allowance(kip7Instance.approve)를 사용해 토큰이 보내집니다.                                  |
| recipient | string                                | 토큰을 받을 계정 주소입니다.                                                                                                |
| id        | BigNumber &#124; string &#124; number | 전송할 토큰 ID입니다.                                                                                                   |
| amount    | BigNumber &#124; string &#124; number | 전송할 토큰 수량입니다.                                                                                                   |
| data      | Buffer &#124; string &#124; number    | (선택 사항) 호출 시 함께 보낼 데이터입니다.                                                                                      |
| sendParam | object                                | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [kip37.create](#kip37-create)의 파라미터 설명을 참고하십시오. |

**참고**  `id`와 `amount` 파라미터는 `number` 타입 값을 받지만, 입력된 값이 number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP37 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 필드에서 sendParam 객체를 통해 전송 (데이터 없이)
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x7dbe4c5bd916ad1aafef87fe6c8b32083080df4ec07f26b6c7a487bb3cc1cf64',
    blocknumber: 3983,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 3983,
            transactionHash: '0x0efc60b88fc55ef37eafbd18057404334dfd595ce4c2c0ff75f0922b928735e7',
            transactionIndex: 0,
            blockHash: '0x7dbe4c5bd916ad1aafef87fe6c8b32083080df4ec07f26b6c7a487bb3cc1cf64',
            logIndex: 0,
            id: 'log_cddf554f',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': '2',
                '4': '1000',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                id: '2',
                value: '1000',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x00...3e8',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...f48', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000, true, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// 주어진 from 필드에서 sendParam 객체를 통해 전송 (데이터와 함께)
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000, 'data' { from: '0x{address in hex}' }).then(console.log)

// kip37.options.from 사용
// kip37 인스턴스로 트랜잭션을 보낼 때 만약 kip37.options.from 값이 정해져 있는 경우 
// sendParam 객체에 `from`를 명시하지 않는 이상 kip37 인스턴스로 트랜잭션을 보낼 때 그 값을 사용
> kip37.options.from = '0x{address in hex}'
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000).then(console.log)
```

## kip37.safeBatchTransferFrom<a id="kip37-safebatchtransferfrom"></a>

```javascript
kip37.safeBatchTransferFrom(from, recipient, ids, amounts, data [, sendParam])
```

`from`에서 `recipient`로 다수의 토큰 ID와 값들의 전송을 안전하게 배치(batch) 합니다.

토큰 소유자의 토큰을 보내도록 허락받은 주소인 operator, 또는 토큰 소유자 자신이 이 토큰 전송 트랜잭션을 실행할 수 있습니다. 따라서 토큰을 보내도록 승인 계정 또는 토큰 소유자가 이 트랜잭션 발신자이어야 하며, 허락받은 계정의 주소는 반드시 `sendParam.from` 또는 `kip37.options.from`에 주어져야 합니다. Unless both `sendParam.from` and `kip37.options.from` are provided, an error would occur.

만약 수신자 주소가 컨트랙트 주소라면, 컨트랙트는 반드시 [IKIP37Receiver.onKIP37Received](https://kips.klaytn.com/KIPs/kip-37#kip-37-token-receiver)를 구현했어야 합니다. 그렇지 않으면, 전송은 거부됩니다.

이 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**Parameters**

| 이름        | 타입                                 | 설명                                                                                                              |
| --------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| from      | string                             | 토큰을 소유한 계정 주소입니다. 이 계정 주소 잔액에서 allowance(kip7Instance.approve)를 사용해 토큰이 보내집니다.                                  |
| recipient | string                             | 토큰을 받을 계정 주소입니다.                                                                                                |
| ids       | Array                              | 전송할 토큰 ID의 배열입니다.                                                                                               |
| amounts   | Array                              | 전송하고자 하는 토큰 수량의 배열입니다.                                                                                          |
| data      | Buffer &#124; string &#124; number | (선택 사항) 호출 시 함께 보낼 데이터입니다.                                                                                      |
| sendParam | object                             | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [kip37.create](#kip37-create)의 파라미터 설명을 참고하십시오. |

**참고**  `id`와 `amount` 파라미터는 `number` 타입 값을 받지만, 입력된 값이 number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP37 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 필드에서 sendParam 객체를 통해 전송 (데이터 없이)
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x9e469494463a02ec4f9e2530e014089d6be3146a5485161a530a8e6373d472a6',
    blocknumber: 4621,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferBatch: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 4621,
            transactionHash: '0x557213eef8ae096bc35f5b3bee0e7cf87ecd87129b4a16d4e35a7356c341dad8',
            transactionIndex: 0,
            blockHash: '0x9e469494463a02ec4f9e2530e014089d6be3146a5485161a530a8e6373d472a6',
            logIndex: 0,
            id: 'log_b050bacc',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': ['1', '2'],
                '4': ['10', '1000'],
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                ids: ['1', '2'],
                values: ['10', '1000'],
            },
            event: 'TransferBatch',
            signature: '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb',
            raw: {
                data: '0x00...3e8',
                topics: [ '0x4a39d...', '0x00...f48', '0x00...f48', '0x00...1a6' ],
            },
        },
    },
}

// 스마트 컨트랙트 실행을 위해 수수료 대납 트랜잭션 사용
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000], {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// 주어진 from 필드에서 sendParam 객체를 통해 전송 (데이터와 함께)
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000], 'data', { from: '0x{address in hex}' }).then(console.log)

// kip37.options.from 사용
// kip37 인스턴스로 트랜잭션을 보낼 때 만약 kip37.options.from 값이 정해져 있는 경우
// sendParam 객체에 `from`을 명시하지 않는 이상 kip37 인스턴스로 트랜잭션을 보낼 때 그 값을 사용
> kip37.options.from = '0x{address in hex}'
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000]).then(console.log)
```

## kip37.mint<a id="kip37-mint"></a>

```javascript
kip37.mint(to, id, value [, sendParam])
```
특정 타입 `id`의 토큰을 발행하며, `to`와 `value` 변수에 맞게 토큰을 할당합니다. 발행 함수를 사용하면 `to`와 `value`에 배열을 파라미터로 전달함으로써 다수의 계정에 한 번에 다양한 토큰을 발행할 수 있습니다.

이 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**Parameters**

| 이름        | 타입                                                 | 설명                                                                                                              |
| --------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| to        | string &#124; Array                                | 토큰이 발행될 계정의 주소 또는 주소들의 배열입니다.                                                                                   |
| id        | BigNumber &#124; string &#124; number              | 발행할 토큰 ID입니다.                                                                                                   |
| value     | BigNumber &#124; string &#124; number &#124; Array | 발행될 토큰 수량입니다. 다수의 주소를 포함한 배열은 배열 형식으로 `to` 파라미터에 전달되어야 합니다.                                                     |
| sendParam | object                                             | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [kip37.create](#kip37-create)의 파라미터 설명을 참고하십시오. |

**참고**  `id`와 `value` 파라미터는 `number` 타입 값을 받지만, 입력된 값이 number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

**참고** 만약 `sendParam.from` 또는 `kip37.options.from`이 주어졌다면, 이 주소는 반드시 MinterRole를 가진 발행자이어야 합니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP37 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 필드에서 sendParam 객체를 통해 전송 (특정 계정에 토큰 발행)
> kip37.mint('0x{address in hex}', 2, 1000, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xca4489a003dc781645475b7db11106da61b7438d86910920f953d8b2dab4a701',
    blocknumber: 12868,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 12868,
            transactionHash: '0xed25e305904e6efb613a6fe8b7370488554f6508b6701e9a0167c95d341c73dc',
            transactionIndex: 0,
            blockHash: '0xca4489a003dc781645475b7db11106da61b7438d86910920f953d8b2dab4a701',
            logIndex: 0,
            id: 'log_04dffde1',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': '2',
                '4': '1000',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0x0000000000000000000000000000000000000000',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                id: '2',
                value: '1000',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x00...3e8',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...1a6' ],
            },
        },
    },
}

// 주어진 from 필드에서 sendParam 객체를 통해 전송 given (다수의 계정에 특정 토큰 발행)
> kip37.mint(['0x{address in hex}', '0x{address in hex}'], 2, [1, 2], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x2bf06d039e2e08c611117167df6261d1feebb12afb34fcabdda59fef2298c70f',
    blocknumber: 13378,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: [
            {
                address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
                blockNumber: 13378,
                transactionHash: '0x9b367625572145d27f78c00cd18cf294883f7baced9d495e1004275ba35e0ea9',
                transactionIndex: 0,
                blockHash: '0x2bf06d039e2e08c611117167df6261d1feebb12afb34fcabdda59fef2298c70f',
                logIndex: 0,
                id: 'log_6975145c',
                returnValues: {
                    '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    '1': '0x0000000000000000000000000000000000000000',
                    '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                    '3': '2',
                    '4': '1',
                    operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    from: '0x0000000000000000000000000000000000000000',
                    to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                    id: '2',
                    value: '1',
                },
                event: 'TransferSingle',
                signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
                raw: {
                    data: '0x00...001',
                    topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...1a6' ],
                },
            },
            {
                address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
                blockNumber: 13378,
                transactionHash: '0x9b367625572145d27f78c00cd18cf294883f7baced9d495e1004275ba35e0ea9',
                transactionIndex: 0,
                blockHash: '0x2bf06d039e2e08c611117167df6261d1feebb12afb34fcabdda59fef2298c70f',
                logIndex: 1,
                id: 'log_7fcd4837',
                returnValues: {
                    '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    '1': '0x0000000000000000000000000000000000000000',
                    '2': '0xEc38E4B42c79299bFef43c3e5918Cdef482703c4',
                    '3': '2',
                    '4': '2',
                    operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                    from: '0x0000000000000000000000000000000000000000',
                    to: '0xEc38E4B42c79299bFef43c3e5918Cdef482703c4',
                    id: '2',
                    value: '2',
                },
                event: 'TransferSingle',
                signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
                raw: {
                    data: '0x000...002',
                    topics: [ '0xc3d58...', '0x00...f48', '0x00...000', '0x00...3c4' ],
                },
            },
        ],
    },
}

// 스마트 컨트랙트 실행을 위해 수수료 대납 트랜잭션 사용
> kip37.mint('0x{address in hex}', 2, 1000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip37.options.from 사용
// kip37 인스턴스로 트랜잭션을 보낼 때 만약 kip37.options.from 값이 정해져 있는 경우
// sendParam 객체에 `from`을 명시하지 않는 이상 kip37 인스턴스로 트랜잭션을 보낼 때 그 값을 사용
> kip37.options.from = '0x{address in hex}'
> kip37.mint('0x{address in hex}', 2, 1000).then(console.log)
```

## kip37.mintBatch kip37.mintBatch<a id="kip37-mintbatch"></a>

```javascript
kip37.mintBatch(to, ids, values [, sendParam])
```
특정 타입 `ids`의 KIP-37 토큰들을 배치(batch)로 발행하며, `to`와 `value` 변수에 맞게 토큰을 할당합니다.

이 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**Parameters**

| 이름        | 타입     | 설명                                                                                                              |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| to        | string | 토큰들이 발행될 계정 주소입니다.                                                                                              |
| ids       | Array  | 발행할 토큰 ID들의 배열입니다.                                                                                              |
| values    | Array  | 발행할 토큰 수량들의 배열입니다.                                                                                              |
| sendParam | object | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [kip37.create](#kip37-create)의 파라미터 설명을 참고하십시오. |

**참고**  `ids`와 `values` 배열 파라미터는 배열 요소로서 `number` 타입 값을 받지만, 입력된 값이 number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

**참고** 만약 `sendParam.from` 또는 `kip37.options.from`이 주어졌다면, 이 주소는 반드시 MinterRole를 가진 발행자이어야 합니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP37 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 필드에서 sendParam 객체를 통해 전송 
> kip37.mintBatch('0x{address in hex}', [1, 2], [100, 200], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xfcfaf73e6b275c173fb699344ddcd6fb39e8f65dbe8dbcfa4123e949c7c6d959',
    blocknumber: 13981,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferBatch: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 13981,
            transactionHash: '0x3e2ddc38210eb3257379a6a59c2e6e341937a4c9e7ef848f1cd0462dfd0b3af6',
            transactionIndex: 0,
            blockHash: '0xfcfaf73e6b275c173fb699344ddcd6fb39e8f65dbe8dbcfa4123e949c7c6d959',
            logIndex: 0,
            id: 'log_d07901ef',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0x0000000000000000000000000000000000000000',
                '2': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                '3': ['1', '2'],
                '4': ['100', '200'],
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0x0000000000000000000000000000000000000000',
                to: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                ids: ['1', '2'],
                values: ['100', '200'],
            },
            event: 'TransferBatch',
            signature: '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb',
            raw: {
                data: '0x00...0c8',
                topics: [ '0x4a39d...', '0x00...f48', '0x00...000', '0x00...1a6' ],
            },
        },
    },
}

// 스마트 컨트랙트 실행을 위해 수수료 대납 트랜잭션 사용 
> kip37.mintBatch('0x{address in hex}', [1, 2], [100, 200], {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip37.options.from 사용
// kip37 인스턴스로 트랜잭션을 보낼 때 만약 kip37.options.from 값이 정해져 있는 경우
// sendParam 객체에 `from`을 명시하지 않는 이상 kip37 인스턴스로 트랜잭션을 보낼 때 그 값을 사용
> kip37.options.from = '0x{address in hex}'
> kip37.mintBatch('0x{address in hex}', [1, 2], [100, 200]).then(console.log)
```


## kip37.addMinter <a id="kip37-addminter"></a>

```javascript
kip37.addMinter(account [, sendParam])
```
계정을 발행자에 추가합니다. 발행자는 토큰을 발행하도록 허락된 계정입니다.

이 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**Parameters**

| 이름        | 타입     | 설명                                                                                                              |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| account   | string | 발행자에 추가될 계정 주소입니다.                                                                                              |
| sendParam | object | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [kip37.create](#kip37-create)의 파라미터 설명을 참고하십시오. |

**참고** 만약 `sendParam.from` 또는 `kip37.options.from`이 주어졌다면, 이 주소는 반드시 발행자이어야 합니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP37 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 필드에서 sendParam 객체를 통해 전송 
> kip37.addMinter('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x32db6b56d959a388120507a943930351ba681b3c34d1a3c609e6bc03eabdbbe3',
    blocknumber: 14172,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        MinterAdded:{
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 14172,
            transactionHash: '0xa2c492abde161356d03a23d9ba48e5fd6e69a2e1603dc0286c7c65aac65d0356',
            transactionIndex: 0,
            blockHash: '0x32db6b56d959a388120507a943930351ba681b3c34d1a3c609e6bc03eabdbbe3',
            logIndex: 0,
            id: 'log_712e7c09',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'MinterAdded',
            signature: '0x6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f6',
            raw: {
                data: '0x',
                topics: [ '0x6ae17...', '0x00...1a6' ],
            },
        },
    },
}

// 스마트 컨트랙트 실행을 위해 수수료 대납 트랜잭션 사용
> kip37.addMinter('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip37.options.from 사용
// kip37 인스턴스로 트랜잭션을 보낼 때 만약 kip37.options.from 값이 정해져 있는 경우
// sendParam 객체에 `from`을 명시하지 않는 이상 kip37 인스턴스로 트랜잭션을 보낼 때 그 값을 사용
> kip37.options.from = '0x{address in hex}'
> kip37.addMinter('0x{address in hex}').then(console.log)
```


## kip37.renounceMinter<a id="kip37-renounceminter"></a>

```javascript
kip37.renounceMinter([sendParam])
```
토큰 발행 권한을 포기합니다. 오직 발행자 주소만이 발행 권한을 포기할 수 있습니다.

이 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**Parameters**

| 이름        | 타입     | 설명                                                                                                              |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| sendParam | object | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [kip37.create](#kip37-create)의 파라미터 설명을 참고하십시오. |

**참고** 만약 `sendParam.from` 또는 `kip37.options.from`이 주어졌다면, 이 주소는 반드시 MinterRole를 가진 발행자이어야 합니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP37 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 필드에서 sendParam 객체를 통해 전송
> kip37.renounceMinter({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x2122846ede9dac35a6797faf0e8eabd7fd8edf7054df27c97410ae788b6cc329',
    blocknumber: 14174,
    contractAddress: null,
    from: '0xf896c5afd69239722013ad0041ef33b5a2fdb1a6',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        MinterRemoved: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 14174,
            transactionHash: '0x4b06b298f3de6f119901a4444326d21add6fb1b9a5d69c91c998a41af8fd46c9',
            transactionIndex: 0,
            blockHash: '0x2122846ede9dac35a6797faf0e8eabd7fd8edf7054df27c97410ae788b6cc329',
            logIndex: 0,
            id: 'log_9b0f3967',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'MinterRemoved',
            signature: '0xe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb66692',
            raw: {
                data: '0x',
                topics: [ '0xe9447...', '0x00...1a6' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.renounceMinter({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip37.options.from 사용
// kip37 인스턴스로 트랜잭션을 보낼 때 만약 kip37.options.from 값이 정해져 있는 경우
// sendParam 객체에 `from`을 명시하지 않는 이상 kip37 인스턴스로 트랜잭션을 보낼 때 그 값을 사용
> kip37.options.from = '0x{address in hex}'
> kip37.renounceMinter().then(console.log)
```


## kip37.burn<a id="kip37-burn"></a>

```javascript
kip37.burn(account, id, value [, sendParam])
```
특정 KIP-37 토큰을 소각합니다.

The address that was approved to operate the owner's token (the operator) or the token owner him/herself is expected to execute this token transfer transaction. Thus, an authorized address or the token owner should be the sender of this transaction whose address must be given at `sendParam.from` or `kip37.options.from`. Unless both `sendParam.from` and `kip37.options.from` are provided, an error would occur.

이 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**Parameters**

| 이름        | 타입                                    | 설명                                                                                                              |
| --------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| account   | string                                | 제거될 토큰을 소유하는 계정의 주소입니다.                                                                                         |
| id        | BigNumber &#124; string &#124; number | 제거할 토큰 ID입니다.                                                                                                   |
| value     | BigNumber &#124; string &#124; number | 제거할 토큰 수량입니다.                                                                                                   |
| sendParam | object                                | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [kip37.create](#kip37-create)의 파라미터 설명을 참고하십시오. |

**참고**  `id`와 `amount` 파라미터는 `number` 타입 값을 받지만, 입력된 값이 number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP37 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 필드에서 sendParam 객체를 통해 전송
> kip37.burn('0x{address in hex}', 2, 10, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xa42a71d838afcf27b02365fd716da4cba542f73540a9482e27c405a8bc47b456',
    blocknumber: 16076,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferSingle: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 16076,
            transactionHash: '0xec16313d00d0dbf34608c84e7563bacbde04e7e9c5fbcfffae54f0161356f19c',
            transactionIndex: 0,
            blockHash: '0xa42a71d838afcf27b02365fd716da4cba542f73540a9482e27c405a8bc47b456',
            logIndex: 0,
            id: 'log_9c9ddbc9',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0x0000000000000000000000000000000000000000',
                '3': '2',
                '4': '10',
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0x0000000000000000000000000000000000000000',
                id: '2',
                value: '10',
            },
            event: 'TransferSingle',
            signature: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
            raw: {
                data: '0x00...00a',
                topics: [ '0xc3d58...', '0x00...f48', '0x00...f48', '0x00...000' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.burn('0x{address in hex}', 2, 10, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip37.options.from 사용
// kip37 인스턴스로 트랜잭션을 보낼 때 만약 kip37.options.from 값이 정해져 있는 경우
// sendParam 객체에 `from`을 명시하지 않는 이상 kip37 인스턴스로 트랜잭션을 보낼 때 그 값을 사용
> kip37.options.from = '0x{address in hex}'
> kip37.burn('0x{address in hex}', 2, 10).then(console.log)
```


## kip37.burnBatch<a id="kip37-burnbatch"></a>

```javascript
kip37.burnBatch(account, ids, values [, sendParam])
```
다수의 KIP-37 토큰을 소각합니다.

토큰 소유자의 토큰을 다루도록 허락받은 주소인 operator, 또는 토큰 소유자 자신이 이 토큰 전송 트랜잭션을 실행할 수 있습니다. 따라서 토큰을 보내도록 승인 계정 또는 토큰 소유자가 이 트랜잭션 발신자이어야 하며, 허락받은 계정의 주소는 반드시 `sendParam.from` 또는 `kip37.options.from`에 주어져야 합니다. Unless both `sendParam.from` and `kip37.options.from` are provided, an error would occur.

이 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**Parameters**

| 이름        | 타입     | 설명                                                                                                              |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| account   | string | 제거될 토큰을 소유하는 계정의 주소입니다.                                                                                         |
| ids       | Array  | 소각할 토큰 ID들의 배열입니다.                                                                                              |
| values    | Array  | 소각할 토큰 수량들의 배열입니다.                                                                                              |
| sendParam | object | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [kip37.create](#kip37-create)의 파라미터 설명을 참고하십시오. |

**참고**  `ids`와 `values` 배열 파라미터는 배열 요소로서 `number` 타입 값을 받지만, 입력된 값이 number.MAX_SAFE_INTEGER 범위를 초과하면 예상치 못한 결과 또는 에러를 일으킬 수 있습니다. 이 경우, `BigNumber` 타입 값 사용이 권장되며, 특히 `uint256` 크기의 숫자 입력은 `BigNumber` 타입 값을 사용하는 것이 좋습니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP37 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 필드에서 sendParam 객체를 통해 전송
> kip37.burnBatch('0x{address in hex}', [1, 2], [100, 200], { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0xb72521aecd76dc2cde31721d32f2cbd71d8cc244cca9109d4fe2de9fe9b53ec0',
    blocknumber: 16930,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        TransferBatch: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 16930,
            transactionHash: '0xa19ee5c01ad67fd27bb2818b7cbad58ba529d5a7885d79558dea8006e7a760bf',
            transactionIndex: 0,
            blockHash: '0xb72521aecd76dc2cde31721d32f2cbd71d8cc244cca9109d4fe2de9fe9b53ec0',
            logIndex: 0,
            id: 'log_66e4d23e',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                '2': '0x0000000000000000000000000000000000000000',
                '3': ['1', '2'],
                '4': ['100', '200'],
                operator: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                from: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                to: '0x0000000000000000000000000000000000000000',
                ids: ['1', '2'],
                values: ['100', '200'],
            },
            event: 'TransferBatch',
            signature: '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb',
            raw: {
                data: '0x00...0c8',
                topics: [ '0x4a39d...', '0x00...f48', '0x00...f48', '0x00...000' ],
            },
        },
    },
}

// Using FD transaction to execute the smart contract
> kip37.burnBatch('0x{address in hex}', [1, 2], [100, 200], {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.burnBatch('0x{address in hex}', [1, 2], [100, 200]).then(console.log)
```


## kip37.addPauser <a id="kip37-addpauser"></a>

```javascript
kip37.addPauser(account [, sendParam])
```
계정에게 컨트랙트를 중지할 권한을 추가합니다.

이 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**Parameters**

| 이름        | 타입     | 설명                                                                                                              |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| account   | string | 컨트랙트 중지 권한을 가질 계정 주소입니다.                                                                                        |
| sendParam | object | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [kip37.create](#kip37-create)의 파라미터 설명을 참고하십시오. |

**참고** 만약 `sendParam.from` 또는 `kip37.options.from`이 주어졌다면, 이 주소는 반드시 PauserRole을 가진 컨트랙트 중지 권한 소유자이어야 합니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP37 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 from 필드에서 sendParam 객체를 통해 전송
> kip37.addPauser('0x{address in hex}', { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x8267759b768d486e42657216a22c2425455cbf8b12aea9f149bb7ebe3aa2d666',
    blocknumber: 17007,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        PauserAdded: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17007,
            transactionHash: '0xe1d702bbbb44c25b5f4d18cf1e1a1745eb134d6438d5cae77611b1b73944aa93',
            transactionIndex: 0,
            blockHash: '0x8267759b768d486e42657216a22c2425455cbf8b12aea9f149bb7ebe3aa2d666',
            logIndex: 0,
            id: 'log_50e810b0',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'PauserAdded',
            signature: '0x6719d08c1888103bea251a4ed56406bd0c3e69723c8a1686e017e7bbe159b6f8',
            raw: {
                data: '0x',
                topics: [ '0x6719d...', '0x00...1a6' ],
            },
        },
    },
}

// 스마트 컨트랙트 실행에 수수료 대납 사용
> kip37.addPauser('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip37.options.from 사용
// kip37 인스턴스로 트랜잭션을 보낼 때 sendParam 객체에서 `from`을 지정하지 않는다면
// kip37.options.from 값이 설정되어 있을 시 기본 값으로 사용
> kip37.options.from = '0x{address in hex}'
> kip37.addPauser('0x{address in hex}').then(console.log)
```


## kip37.renouncePauser <a id="kip37-renouncepauser"></a>

```javascript
kip37.renouncePauser([sendParam])
```
토큰 중지 권한을 포기합니다. 오직 컨트랙트 중지 권한 소유자 주소만이 중지 권한을 포기할 수 있습니다.

이 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**Parameters**

| 이름        | 타입     | 설명                                                                                                              |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| sendParam | object | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [kip37.create](#kip37-create)의 파라미터 설명을 참고하십시오. |

**참고** 만약 `sendParam.from` 또는 `kip37.options.from`이 주어졌다면, 이 주소는 반드시 PauserRole을 가진 컨트랙트 중지 권한 소유자이어야 합니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP37 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 from 필드에서 sendParam 객체를 통해 전송
> kip37.renouncePauser({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x86b189c51df4c9390ddc7bcaefa6b5e78b9e7db645079cff33cc09ab321bc5e6',
    blocknumber: 17010,
    contractAddress: null,
    from: '0x5934a0c01baa98f3457981b8f5ce6e52ac585578',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        PauserRemoved: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17010,
            transactionHash: '0xa0557cf370cdff56ee2f53555da3e816361125a19cc832caa9d7a62808afeda1',
            transactionIndex: 0,
            blockHash: '0x86b189c51df4c9390ddc7bcaefa6b5e78b9e7db645079cff33cc09ab321bc5e6',
            logIndex: 0,
            id: 'log_ebd8d4a4',
            returnValues: {
                '0': '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
                account: '0xF896C5aFD69239722013aD0041EF33B5A2fDB1A6',
            },
            event: 'PauserRemoved',
            signature: '0xcd265ebaf09df2871cc7bd4133404a235ba12eff2041bb89d9c714a2621c7c7e',
            raw: {
                data: '0x',
                topics: [ '0xcd265...', '0x00...1a6' ],
            },
        },
    },
}

// 스마트 컨트랙트 실행에 수수료 대납 사용
> kip37.renouncePauser({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip37.options.from 사용
// kip37 인스턴스로 트랜잭션을 보낼 때 sendParam 객체에서 `from`을 지정하지 않는다면
// kip37.options.from 값이 설정되어 있을 시 기본 값으로 사용
> kip37.options.from = '0x{address in hex}'
> kip37.renouncePauser().then(console.log)
```


## kip37.pause <a id="kip37-pause"></a>

```javascript
kip37.pause([id] [, sendParam])
```
토큰 운영과 관련된 기능들을 중지합니다. `id` 파라미터가 정의된 경우 특정 토큰이 중지됩니다. 그렇지 않은 경우 토큰 컨트랙트가 중지됩니다.

이 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**Parameters**

| 이름        | 타입                                    | 설명                                                                                                              |
| --------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| id        | BigNumber &#124; string &#124; number | (선택 사항) 중지시킬 토큰 ID입니다. 해당 파라미터 미입력시 `pause` 함수는 컨트랙트를 중지시킵니다.                                                   |
| sendParam | object                                | (선택 사항) 트랜잭션 전송을 위해 사용될 파라미터들이 정의된 객체입니다. sendParam에 관한 자세한 정보는 [kip37.create](#kip37-create)의 파라미터 설명을 참고하십시오. |

**참고** 만약 `sendParam.from` 또는 `kip37.options.from`이 주어졌다면, 이 주소는 반드시 PauserRole을 가진 컨트랙트 중지 권한 소유자이어야 합니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP37 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 from 필드에서 sendParam 객체를 통해 전송 (토큰 컨트랙트 중단)
> kip37.pause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x004960a28a6c5b75963d28c4018d6540d5ad181c5a5f257ec8f78ebb8436be1e',
    blocknumber: 17521,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        Paused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17521,
            transactionHash: '0xc5f3bebe83c86f68d582240f6bb47a8f56867650c9fec3b7caf1cb5861d31af2',
            transactionIndex: 0,
            blockHash: '0x004960a28a6c5b75963d28c4018d6540d5ad181c5a5f257ec8f78ebb8436be1e',
            logIndex: 0,
            id: 'log_55bd1adc',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Paused',
            signature: '0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258',
            raw: {
                data: '0x00...f48',
                topics: ['0x62e78...'],
            },
        },
    },
}

// 주어진 from 필드에서 sendParam 객체를 통해 전송 (특정 토큰 중단)
> kip37.pause(2, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x36d0618e1e30bca8199ce3bbc3d32e74bd4c25f6326c4c9e2d9292b79605155f',
    blocknumber: 17738,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        Paused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17738,
            transactionHash: '0x437834d4ccb944397607a81abe1bc229c44749d20c2b4f4b73ae1dd5907f79c9',
            transactionIndex: 0,
            blockHash: '0x36d0618e1e30bca8199ce3bbc3d32e74bd4c25f6326c4c9e2d9292b79605155f',
            logIndex: 0,
            id: 'log_b89719ed',
            returnValues: {
                '0': '2',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                tokenId: '2',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Paused',
            signature: '0xabdb1c9133626eb4f8c5f2ec7e3c60a969a2fb148a0c341a3cf6597242c8f8f5',
            raw: {
                data: '0x00...f48',
                topics: ['0xabdb1...'],
            },
        },
    },
}


// 스마트 컨트랙트 실행에 수수료 대납 사용
> kip37.unpause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip37.options.from 사용
// kip37 인스턴스로 트랜잭션을 보낼 때 sendParam 객체에서 `from`을 지정하지 않는다면
// kip37.options.from 값이 설정되어 있을 시 기본 값으로 사용
> kip37.options.from = '0x{address in hex}'
> kip37.pause().then(console.log)
```


## kip37.unpause <a id="kip37-unpause"></a>

```javascript
kip37.unpause([id] [, sendParam])
```

중지된 컨트랙트나 특정 토큰을 재개합니다. `id` 파라미터가 정의된 경우, 특정 토큰의 중지를 해제합니다. 그렇지 않은 경우 토큰 컨트랙트의 중지를 해제합니다.

이 메서드는 Klaytn 네트워크에 트랜잭션을 전송하며 트랜잭션 수수료가 트랜잭션 발신자에게 부과됨을 참고하시기 바랍니다.

**Parameters**

| 이름 | 타입                                    | 설명                                                                      |
| -- | ------------------------------------- | ----------------------------------------------------------------------- |
| id | BigNumber &#124; string &#124; number | (선택 사항) 중지 해제할 토큰 ID입니다. 해당 파라미터 미입력시 `unpause` 함수는 토큰 컨트랙트의 중지를 해제합니다. |

**참고** 만약 `sendParam.from` 또는 `kip37.options.from`이 주어졌다면, 이 주소는 반드시 PauserRole을 가진 컨트랙트 중지 권한 소유자이어야 합니다.

**리턴값**

`프로미스`는 `Object`를 반환 - 트랜잭션 실행 결과를 담고 있는 영수증입니다. 영수증 객체 속성값에 대한 자세한 정보는 [getTransactionReceipt][]를 참고하세요. KIP37 인스턴스의 영수증은 'logs' 속성 대신에 ABI로 파싱된 'events' 속성을 가지고 있습니다.

**예시**

```javascript
// 주어진 from 필드에서 sendParam 객체를 통해 전송 (토큰 컨트랙트 중단 해제)
> kip37.unpause({ from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x71d47d869e6fcf7b56f071e4f3b7b5a6d83e585b36a203248544340cdada8f1d',
    blocknumber: 17524,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        Unpaused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17524,
            transactionHash: '0x5e67040e12297ee85a3464eae406904c32b7f3c7493cbdbc8f73a2e92b10f56d',
            transactionIndex: 0,
            blockHash: '0x71d47d869e6fcf7b56f071e4f3b7b5a6d83e585b36a203248544340cdada8f1d',
            logIndex: 0,
            id: 'log_78d5bc18',
            returnValues: {
                '0': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Unpaused',
            signature: '0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa',
            raw: {
                data: '0x00...f48',
                topics: ['0x5db9e...'],
            },
        },
    },
}

// 주어진 from 필드에서 sendParam 객체를 통해 전송 (특정 토큰 중단)
> kip37.unpause(2, { from: '0x{address in hex}' }).then(console.log)
{
    blockHash: '0x44e2005d6061eeb014889c29cce567d12664e5ef4104faa3426eacd8772790c6',
    blocknumber: 17742,
    contractAddress: null,
    from: '0xfb8789cd544881f820fbff1728ba7c240a539f48',
    ...
    status: true,
    to: '0x394091d163ebdebcae876cb96cf0e0984c28a1e9',
    ...
    events: {
        Unpaused: {
            address: '0x394091D163eBDEbcAe876cb96CF0E0984C28a1e9',
            blockNumber: 17742,
            transactionHash: '0xed920c7b487c3133508cc37f930e4ae3b9c05f01e4ad823909c9b4aacf040f62',
            transactionIndex: 0,
            blockHash: '0x44e2005d6061eeb014889c29cce567d12664e5ef4104faa3426eacd8772790c6',
            logIndex: 0,
            id: 'log_2811c3c5',
            returnValues: {
                '0': '2',
                '1': '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
                tokenId: '2',
                account: '0xfb8789cD544881F820Fbff1728Ba7c240a539F48',
            },
            event: 'Unpaused',
            signature: '0xfe9b5e5216db9de81757f43d20f846bea509c040a560d136b8263dd8cd764238',
            raw: {
                data: '0x00...f48',
                topics: ['0xfe9b5...'],
            },
        },
    },
}

// 스마트 컨트랙트 실행에 수수료 대납 사용
> kip37.unpause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// kip37.options.from 사용
// kip37 인스턴스로 트랜잭션을 보낼 때 sendParam 객체에서 `from`을 지정하지 않는다면
// kip37.options.from 값이 설정되어 있을 시 기본 값으로 사용
> kip37.options.from = '0x{address in hex}'
> kip37.unpause().then(console.log)
```

[getTransactionReceipt]: ../caver.rpc/klay.md#caver-rpc-klay-gettransactionreceipt
