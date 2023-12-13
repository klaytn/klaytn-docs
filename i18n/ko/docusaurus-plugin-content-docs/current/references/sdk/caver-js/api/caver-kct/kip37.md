# caver.kct.kip37

`caver.kct.kip37`은 클레이튼 블록체인 플랫폼(Klaytn)에서 KIP-37을 JavaScript 객체로 구현한 스마트 컨트랙트를 쉽게 처리할 수 있도록 도와줍니다.

`caver.kct.kip37`은 [caver.contract](../caver.contract.md)를 상속하여 KIP-37 토큰 컨트랙트를 구현합니다. `caver.kct.kip37`은 `caver.contract`과 동일한 속성을 가지지만 추가 기능을 위해 추가 메서드가 구현되어 있습니다. 여기서는 `caver.kct.kip37`에 새로 추가된 메서드만 소개합니다.

caver-js용 KIP-37을 구현하는 코드는 [Klaytn 컨트랙트 GitHub 리포지토리](https://github.com/klaytn/klaytn-contracts/tree/master/contracts/KIP/token/KIP37)에서 확인할 수 있습니다. caver-js용 KIP-37은 오너블 인터페이스를 지원합니다. 이를 사용하여 컨트랙트를 배포할 때 컨트랙트 소유자를 지정할 수 있습니다.

KIP-37에 대한 자세한 내용은 [클레이튼 개선 제안](https://kips.klaytn.foundation/KIPs/kip-37)을 참고하세요.

**참고** `caver.kct.kip37`은 caver-js [v1.5.7](https://www.npmjs.com/package/caver-js/v/1.5.7) 부터 지원됩니다.

## caver.kct.kip37.deploy <a id="caver-klay-kip37-deploy"></a>

```javascript
caver.kct.kip37.deploy(tokenInfo, deployer)
```
KIP-37 토큰 컨트랙트를 Klaytn 블록체인에 배포합니다. caver.kct.kip37.deploy를 사용하여 배포된 컨트랙트는 KIP-37 표준을 따르는 멀티토큰입니다.

배포가 성공적으로 완료되면 새로운 KIP37 인스턴스로 프로미스가 해결됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| tokenInfo | Object | 클레이튼 블록체인에 KIP-37 토큰 컨트랙트를 배포하는 데 필요한 정보입니다. 자세한 내용은 아래 표를 참조하세요. |
| deployer | String &#124; Object | KIP-37 토큰 컨트랙트를 배포할 Keyring 인스턴스의 주소입니다. 이 주소에는 배포하기에 충분한 KLAY가 있어야 합니다. 자세한 내용은 [Keyring](../caver-wallet/keyring.md#caver-wallet-keyring)을 참조하세요. 트랜잭션을 보낼 때 사용할 필드를 직접 정의하고 싶다면 객체 타입을 파라미터로 전달할 수 있습니다. 또한 KIP-37 컨트랙트를 배포할 때 수수료 위임을 사용하려면 오브젝트에서 수수료 위임과 관련된 필드를 정의할 수 있습니다. 오브젝트에서 정의할 수 있는 필드는 [create](#kip37-create)의 파라미터 설명을 참조하세요. |

토큰 정보 객체에는 다음이 포함되어야 합니다:

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| uri | String | [토큰 유형 ID 대체 메커니즘](http://kips.klaytn.foundation/KIPs/kip-37#metadata)에 의존하여 모든 토큰 유형에 대한 URI입니다. |

**리턴 값**

`PromiEvent`: 프로미스 결합 이벤트 이미터로, 새로운 KIP37 인스턴스로 해결됩니다. 또한 다음과 같은 이벤트가 발생할 수 있습니다:

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| transactionHash | String | 트랜잭션이 전송되고 트랜잭션 해시를 사용할 수 있는 직후에 실행됩니다. |
| receipt | Object | 트랜잭션 영수증을 사용할 수 있을 때 발생합니다. 영수증 객체 내부의 프로퍼티에 대해 알고 싶다면 [getTransactionReceipt]을 참조하세요. KIP37 인스턴스의 영수증에는 'logs' 속성 대신 abi를 통해 파싱된 'events' 속성이 있습니다. |
| error | Error | 전송 중 오류가 발생하면 발생합니다. |

**토큰 등록**

1. 블록 탐색기에 토큰을 등록하려면 컨트랙트 생성자가 제출 요청 양식을 작성해야 합니다. 양식에 명시된 필수 정보를 기록해 두세요.

2. 스마트 컨트랙트 환경

   - 컴파일러 유형: Solidity

   - 컴파일러 버전: v0.8.4+commit.c7e474f2

   - 오픈 소스 라이선스 유형: MIT

3. 스마트 컨트랙트 세부 정보

   - 최적화: --optimize-run 200

   - 소스 코드: [KIP37 컨트랙트 GitHub 링크](https://github.com/klaytn/caver-js/blob/dev/packages/caver-kct/src/kip37Token.sol).

4. ABI 인코딩된 값: [kip37JsonInterface at dev - klaytn/caver-js - GitHub](https://github.com/klaytn/caver-js/blob/dev/packages/caver-kct/src/kctHelper.js#L1329-L2374)


**예시**

```javascript
// using the promise
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

// Send object as second parameter
> caver.kct.kip37.deploy({
    uri: 'https://caver.example/{id}.json',
    },
    {
        from: '0x{address in hex}',
        feeDelegation: true,
        feePayer: '0x{address in hex}',
    }).then(console.log)

// using event emitter and promise
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
토큰 컨트랙트가 구현한 인터페이스의 정보를 반환합니다. 이 정적 함수는 [kip37.detectInterface](#kip37-detectinterface)를 사용합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| contractAddress | String | KIP-37 토큰 컨트랙트의 주소 |

**리턴 값**

`Promise`는 각 [KIP-37 인터페이스](https://kips.klaytn.foundation/KIPs/kip-37#kip-13-identifiers)의 구현 여부가 포함된 결과를 부울 값으로 반환하는 `object`를 반환합니다.

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
바인딩된 메서드와 이벤트가 있는 새 KIP37 인스턴스를 생성합니다. 이 함수는 [new KIP37](#new-kip37)과 동일하게 작동합니다.

**참고** `caver.kct.kip37.create`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

**매개변수**

[new KIP37](#new-kip37)을 참조하세요.


**리턴 값**

[new KIP37](#new-kip37)을 참조하세요.


**예시**

```javascript
// Create a KIP37 instance without a parameter
> const kip37 = caver.kct.kip37.create()

// Create a KIP37 instance with a token address
> const kip37 = caver.kct.kip37.create('0x{address in hex}')
```


## new KIP37 <a id="new-kip37"></a>

```javascript
new caver.kct.kip37([tokenAddress])
```
바인딩된 메서드와 이벤트가 있는 새 KIP37 인스턴스를 생성합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| tokenAddress | String | (선택 사항) KIP-37 토큰 컨트랙트의 주소로, 나중에 `kip37.options.address = '0x1234..'`를 통해 할당할 수 있습니다.


**리턴 값**

| 유형 | 설명 |
| --- | --- |
| object | 바인딩된 메서드 및 이벤트가 있는 KIP37 인스턴스입니다. |


**예시**

```javascript
// Create a KIP37 instance without a parameter
> const kip37 = new caver.kct.kip37()

// Create a KIP37 instance with a token address
> const kip37 = new caver.kct.kip37('0x{address in hex}')
```


## kip37.clone <a id="kip37-clone"></a>

```javascript
kip37.clone([tokenAddress])
```
현재 KIP37 인스턴스를 복제합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| tokenAddress | String | (선택 사항) 다른 KIP37 토큰을 배포한 스마트 컨트랙트의 주소입니다. 생략하면 원래 인스턴스의 컨트랙트 주소로 설정됩니다. |

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| object | 원본 KIP37 인스턴스의 복제본입니다. |


**예시**

```javascript
> const kip37 = new caver.kct.kip37(address)

// Clone without a parameter
> const cloned = kip37.clone()

// Clone with the address of the new token contract
> const cloned = kip37.clone('0x{address in hex}')
```

## kip37.detectInterface <a id="kip37-detectinterface"></a>

```javascript
kip37.detectInterface()
```
토큰 컨트랙트에 의해 구현된 인터페이스의 정보를 반환합니다.

**매개변수**

없음

**리턴 값**

`Promise`는 각 [KIP-37 인터페이스](https://kips.klaytn.foundation/KIPs/kip-37#kip-13-identifiers)의 구현 여부가 포함된 결과를 부울 값으로 반환하는 `object`를 반환합니다.

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

## kip37.supportsInterface <a id="kip37-supportsinterface"></a>

```javascript
kip37.supportsInterface(interfaceId)
```
이 컨트랙트가 `interfaceId`로 정의된 인터페이스를 구현하면 `true`를 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| interfaceId | String | 검사할 인터페이스아이디입니다. |

**리턴 값**

이 컨트랙트가 `interfaceId`로 정의된 인터페이스를 구현하는 경우 `Promise`는 `boolean`: `true`를 반환합니다.

**예시**

```javascript
> kip37.supportsInterface('0x6433ca1f').then(console.log)
true

> kip37.supportsInterface('0x3a2820fe').then(console.log)
false
```


## kip37.uri <a id="kip37-uri"></a>

```javascript
kip37.uri(id)
```
주어진 토큰의 고유한 고유 리소스 식별자(URI)를 반환합니다.

문자열 "{id}"가 URI에 존재하는 경우, 이 함수는 이 문자열을 16진수 형식의 실제 토큰 ID로 대체합니다.
[KIP-34 메타데이터](http://kips.klaytn.foundation/KIPs/kip-37#metadata)를 참고하세요.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| id | BigNumber &#124; string &#124; number | uri를 가져올 토큰 아이디입니다. |

**참고** `id` 파라미터는 `number` 타입을 허용하지만, 입력된 값이 number.MAX_SAFE_INTEGER로 제한되는 범위를 벗어날 경우 예기치 않은 결과나 오류가 발생할 수 있습니다. 이 경우, 특히 `uint256` 크기의 숫자 입력값의 경우 `BigNumber` 타입을 사용하는 것을 권장합니다.

**리턴 값**

`Promise`는 `string`을 반환합니다: 토큰의 URI입니다.

**예제**

```javascript
> kip37.uri('0x0').then(console.log)
'https://caver.example/0000000000000000000000000000000000000000000000000000000000000000.json'
```


## kip37.totalSupply <a id="kip37-totalsupply"></a>

```javascript
kip37.totalSupply(id)
```
특정 토큰의 총 토큰 공급량을 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| id | BigNumber &#124; string &#124; number | 총 공급량을 확인할 토큰 ID입니다. |

**참고** `id` 매개변수는 `number` 타입을 허용하지만, 입력된 값이 number.MAX_SAFE_INTEGER로 제한되는 범위를 벗어날 경우 예기치 않은 결과나 오류가 발생할 수 있습니다. 이 경우, 특히 `uint256` 크기의 숫자 입력값의 경우 `BigNumber` 타입을 사용하는 것을 권장합니다.

**리턴 값**

`Promise`는 `BigNumber`를 반환합니다: 토큰의 총 개수입니다.

**예제**

```javascript
> kip37.totalSupply(0).then(console.log)
10000000000
```


## kip37.balanceOf <a id="kip37-balanceof"></a>

```javascript
kip37.balanceOf(account, id)
```
`account`가 소유한 토큰 유형 `id`의 토큰 수량을 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| account | String | 잔액을 확인하려는 계정의 주소입니다. |
| id | BigNumber &#124; string &#124; number | 잔액을 확인할 토큰 ID입니다. |

**참고** `id` 파라미터는 `number` 타입을 허용하지만, 입력된 값이 number.MAX_SAFE_INTEGER로 제한되는 범위를 벗어날 경우 예기치 않은 결과나 오류가 발생할 수 있습니다. 이 경우, 특히 `uint256` 크기의 숫자 입력값의 경우 `BigNumber` 타입을 사용하는 것을 권장합니다.

**리턴 값**

`Promise`는 `BigNumber`를 반환합니다: 해당 계정이 보유한 토큰의 양입니다.

**예시**

```javascript
> kip37.balanceOf('0x{address in hex}', 0).then(console.log)
20
```

## kip37.balanceOfBatch <a id="kip37-balanceofbatch"></a>

```javascript
kip37.balanceOfBatch(accounts, ids)
```
여러 계정/토큰 쌍의 잔액을 반환합니다. `balanceOfBatch`는 [balanceOf](#kip37-balanceof)의 일괄 연산이며, `accounts`와 `ids`가 포함된 배열의 길이는 동일해야 합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| account | Array | 잔액을 확인하려는 계정의 주소입니다. |
| id | Array | 잔액을 확인할 토큰 아이디의 배열입니다. |

**리턴 값**

`Promise`는 `Array`를 반환합니다: 여러 계정/토큰 쌍의 잔액입니다.

**예시**

```javascript
> kip37.balanceOfBatch(['0x{address in hex}', '0x{address in hex}'], [0, 1]).then(console.log)
[ 20, 30 ]
```


## kip37.isMinter <a id="kip37-isminter"></a>

```javascript
kip37.isMinter(address)
```
주어진 계정이 새로운 KIP37 토큰을 발행할 수 있는 채굴자인 경우 `true`를 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| address | String | 채굴 권한이 있는지 확인할 계정의 주소입니다. |

**리턴 값**

`Promise`는 해당 계정이 채굴자인 경우 `boolean`: `true`를 반환합니다.

**예시**

```javascript
> kip37.isMinter('0x{address in hex}').then(console.log)
true

> kip37.isMinter('0x{address in hex}').then(console.log)
false
```


## kip37.isPauser <a id="kip37-ispauser"></a>

```javascript
kip37.isPauser(address)
```
주어진 계정이 토큰 전송을 일시 중지할 수 있는 일시 중지자일 경우 `true`를 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| address | String | 토큰 전송을 일시 중지할 수 있는 권한이 있는지 확인할 계정의 주소입니다. |

**리턴 값**

`Promise`는 계정이 일시 정지 상태인 경우 `boolean`: `true`를 반환합니다.

예시** **예시

```javascript
> kip37.isPauser('0x{address in hex}').then(console.log)
true

> kip37.isPauser('0x{address in hex}').then(console.log)
false
```


## kip37.paused <a id="kip37-paused"></a>

```javascript
kip37.paused()
```
토큰 컨트랙트의 트랜잭션(또는 특정 토큰)이 일시 중지되었는지 여부를 반환합니다.

id 매개변수가 정의되지 않은 경우 토큰 컨트랙트의 트랜잭션이 일시 중지되었는지 여부를 반환합니다. id 파라미터가 정의된 경우 특정 토큰이 일시 정지되었는지 여부를 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| id | BigNumber &#124; string &#124; number | (선택 사항) 일시 중지 여부를 확인할 토큰 아이디입니다. 이 파라미터를 생략하면 `paused` 함수는 컨트랙트가 일시 중지 상태인지 여부를 반환합니다. |

**참고** `id` 파라미터는 `Number` 타입을 허용하지만, 입력된 값이 number.MAX_SAFE_INTEGER로 제한되는 범위를 벗어날 경우 예기치 않은 결과나 에러가 발생할 수 있습니다. 이 경우, 특히 `uint256` 크기의 숫자 입력값의 경우 `BigNumber` 타입을 사용하는 것을 권장합니다.

**리턴 값**

`Promise`는 컨트랙트(또는 특정 토큰)가 일시정지된 경우 `boolean`: `true`를 반환합니다.

**예제**

```javascript
// without token id parameter
> kip37.paused().then(console.log)
true
> kip37.paused().then(console.log)
false

// with token id parameter
> kip37.paused(0).then(console.log)
true
> kip37.paused(1).then(console.log)
false
```


## kip37.isApprovedForAll <a id="kip37-isApprovedforall"></a>

```javascript
kip37.isApprovedForAll(owner, operator)
```
주어진 소유자에 대한 운영자의 승인 상태를 조회합니다. 연산자가 주어진 소유자에 의해 승인된 경우 `true`를 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| owner | String | 소유자의 주소입니다. |
| operator | String | 운영자의 주소입니다. |

**리턴 값**

`Promise`는 `boolean`을 반환합니다: 운영자가 승인되면 true, 승인되지 않으면 false입니다.

**예제**

```javascript
> kip37.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
true

> kip37.isApprovedForAll('0x{address in hex}', '0x{address in hex}').then(console.log)
false
```


## kip37.create <a id="kip37-create"></a>

```javascript
kip37.create(id, initialSupply [, uri] [, sendParam])
```

새 토큰 유형을 생성하고 마이너에게 `initialSupply`를 할당합니다.

이 메서드는 트랜잭션을 Klaytn 네트워크에 전송하며, 트랜잭션 발신자에게 트랜잭션 수수료가 부과됩니다.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| id | BigNumber &#124; string &#124; number | 생성할 토큰 아이디입니다. |
| initialSupply | BigNumber &#124; string &#124; number | 발행되는 토큰의 양입니다. |
| uri | String | (선택 사항) 생성된 토큰의 토큰 URI입니다. |
| sendParam | Object | (선택 사항) 트랜잭션을 전송하는 데 필요한 매개변수가 포함된 객체입니다. |

**참고** `id`, `initialSupply` 파라미터는 `number` 타입을 허용하지만, 입력된 값이 number.MAX_SAFE_INTEGER로 제한되는 범위를 벗어날 경우 예기치 않은 결과나 오류가 발생할 수 있습니다. 이 경우, 특히 `uint256` 크기의 숫자 입력 값의 경우 `BigNumber` 타입을 사용하는 것이 좋습니다. 

`sendParam` 객체에는 다음이 포함됩니다:

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| from | String | (선택 사항) 트랜잭션을 전송할 주소입니다. 생략하면 `kip37.options.from`으로 설정됩니다. `sendParam` 객체의 `from`이나 `kip37.options.from` 중 어느 것도 제공되지 않으면 오류가 발생합니다. |
| gas | Number &#124; String | (선택 사항) 이 트랜잭션에 제공되는 최대 가스 개수(가스 한도). 생략할 경우, `kip37.methods.approve(spender, amount).estimateGas({from})`를 호출하여 caver-js에서 설정합니다. |
| gasPrice | Number &#124; String | (선택 사항) 이 트랜잭션의 가스 가격(peb 단위)입니다. 생략할 경우, `caver.klay.getGasPrice` 호출을 통해 caver-js에서 설정합니다. |
| value | number &#124; string &#124; BN &#124; BigNumber | (선택 사항) peb 단위로 전송할 값입니다. |
| feeDelegation | boolean | (선택 사항, 기본값 `false`) 수수료 대납 트랜잭션 사용 여부. 생략하면 `kip37.options.feeDelegation`이 사용됩니다. 둘 다 생략하면 수수료 위임이 사용되지 않습니다. |
| feePayer | String | (선택 사항) 트랜잭션 수수료를 지불하는 수수료 납부자의 주소입니다. `feeDelegation`이 `true`인 경우, 이 값은 트랜잭션의 `feePayer` 필드에 설정됩니다. 생략하면 `kip37.options.feePayer`가 사용됩니다. 둘 다 생략하면 오류가 발생합니다. |
| feeRatio | String | (선택 사항) 수수료 납부자가 부담하게 될 트랜잭션 수수료의 비율입니다. `feeDelegation`이 `true`이고 `feeRatio`가 유효한 값으로 설정되면 부분 수수료 위임 트랜잭션이 사용됩니다. 유효한 범위는 1에서 99 사이이며, 0 또는 100 이상의 비율은 허용되지 않습니다. 생략하면 `kip37.options.feeRatio`가 사용됩니다. |

**참고** `feeDelegation`, `feePayer`, `feeRatio`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

**리턴 값**

`Promise`는 트랜잭션 실행 결과가 포함된 영수증인 `object`를 반환합니다. 영수증 객체 내부의 속성에 대해 알고 싶다면 [getTransactionReceipt]의 설명을 참조하세요. KIP37 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given 
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

// Using FD transaction to execute the smart contract
> kip37.create(2, '1000000000000000000', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.create(2, '1000000000000000000').then(console.log)
```

## kip37.setApprovalForAll <a id="kip37-setApprovalforall"></a>

```javascript
kip37.setApprovalForAll(operator, approved [, sendParam])
```
지정된 오퍼레이터가 소유자의 모든 토큰을 전송할 수 있도록 승인하거나, 지정된 오퍼레이터를 허용하지 않습니다.

이 메서드는 트랜잭션을 클레이튼 네트워크에 전송하며, 트랜잭션 발신자에게 트랜잭션 수수료가 부과된다는 점에 유의하세요.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| operator | String | 소유자의 모든 토큰을 전송할 수 있도록 승인/금지할 계정의 주소입니다. |
| approved | boolean | 이 연산자가 `true`이면 승인됩니다. `false`이면 연산자가 허용되지 않습니다. |
| sendParam | Object | (선택 사항) 트랜잭션 전송을 위해 정의된 매개변수가 있는 객체입니다. sendParam에 대한 자세한 내용은 [kip37.create](#kip37-create)의 파라미터 설명을 참조하세요. |

**리턴 값**

`Promise`는 `object`를 반환합니다 - 트랜잭션 실행 결과가 포함된 영수증입니다. 영수증 오브젝트 내부의 속성에 대해 알고 싶다면 [getTransactionReceipt] 설명을 참고하세요. KIP37 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given 
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

// Using FD transaction to execute the smart contract
> kip37.setApprovalForAll('0x{address in hex}', true, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.setApprovalForAll('0x{address in hex}', true).then(console.log)
```

## kip37.safeTransferFrom <a id="kip37-safetransferfrom"></a>

```javascript
kip37.safeTransferFrom(from, recipient, id, amount, data [, sendParam])
```
특정 토큰 유형 `id`의 지정된 `amount` 토큰을 `from`에서 `recipient`로 안전하게 전송합니다. 

토큰 소유자의 토큰을 전송할 수 있는 권한이 있는 주소(운영자) 또는 토큰 소유자 본인이 직접 토큰 전송 트랜잭션을 실행할 것으로 예상됩니다. 따라서 승인된 주소 또는 토큰 소유자가 이 트랜잭션의 발신자이어야 하며, 이 주소는 `sendParam.from` 또는 `kip37.options.from`에 제공되어야 합니다. `sendParam.from`과 `kip37.options.from`이 모두 제공되지 않으면 오류가 발생합니다.

수신자가 컨트랙트 주소인 경우, [IKIP37Receiver.onKIP37Received](https://kips.klaytn.foundation/KIPs/kip-37#kip-37-token-receiver)를 구현해야 합니다. 그렇지 않으면 전송이 되돌려집니다.  

이 메서드는 트랜잭션을 클레이튼 네트워크에 전송하며, 트랜잭션 발신자에게 트랜잭션 수수료가 부과된다는 점에 유의하세요.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| from | String | 허용 메커니즘으로 전송할 토큰을 소유한 계정의 주소입니다. |
| recipient | String | 토큰을 받을 계정의 주소입니다. |
| id | BigNumber &#124; string &#124; number | 전송할 토큰 ID입니다. |
| amount | BigNumber &#124; string &#124; number | 송금할 토큰의 금액입니다. |
| data | Buffer &#124; string &#124; number | (선택 사항) 호출과 함께 전송할 선택적 데이터입니다. |
| sendParam | Object | (선택 사항) 트랜잭션 전송을 위해 정의된 매개변수가 있는 객체입니다. sendParam에 대한 자세한 내용은 [kip37.create](#kip37-create)의 매개변수 설명을 참조하세요. |

**참고** `id`와 `amount` 파라미터는 `number` 타입을 허용하지만, 전달된 값이 number.MAX_SAFE_INTEGER로 제한되는 범위를 벗어날 경우 예기치 않은 결과나 오류가 발생할 수 있습니다. 이 경우, 특히 `uint256` 크기의 숫자 입력값의 경우 `BigNumber` 타입을 사용하는 것을 권장합니다.

**리턴 값**

`Promise`는 트랜잭션 실행 결과가 담긴 영수증인 `object`를 반환합니다. 영수증 객체 내부의 속성을 알고 싶다면 [getTransactionReceipt] 설명을 참고하세요. KIP37 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given (without data)
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

// Send via a sendParam object with the from field given (with data)
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000, 'data' { from: '0x{address in hex}' }).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 2, 10000).then(console.log)
```

## kip37.safeBatchTransferFrom <a id="kip37-safebatchtransferfrom"></a>

```javascript
kip37.safeBatchTransferFrom(from, recipient, ids, amounts, data [, sendParam])
```

`from`에서 `recipient`로 여러 토큰 아이디와 값을 안전하게 일괄 전송합니다.

소유자의 토큰을 보내도록 승인된 주소(운영자) 또는 토큰 소유자 본인이 이 토큰 전송 트랜잭션을 실행할 것으로 예상됩니다. 따라서 승인된 주소 또는 토큰 소유자가 이 트랜잭션의 발신자이어야 하며, 발신자 주소는 `sendParam.from` 또는 `kip37.options.from`에 입력해야 합니다. `sendParam.from`과 `kip37.options.from`이 모두 제공되지 않으면 오류가 발생합니다.

수신자가 컨트랙트 주소인 경우, [IKIP37Receiver.onKIP37Received](https://kips.klaytn.foundation/KIPs/kip-37#kip-37-token-receiver)를 구현해야 합니다. 그렇지 않으면 전송이 되돌려집니다.  

이 메서드는 트랜잭션을 클레이튼 네트워크에 전송하며, 트랜잭션 발신자에게 트랜잭션 수수료가 부과된다는 점에 유의하세요.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| from | String | 허용 메커니즘으로 전송할 토큰을 소유한 계정의 주소입니다. |
| recipient | String | 토큰을 받을 계정의 주소입니다. |
| id | Array | 전송할 토큰 아이디의 배열입니다. |
| amount | Array | 전송할 토큰 금액의 배열입니다. |
| data | Buffer &#124; string &#124; number | (선택 사항) 호출과 함께 전송할 데이터(선택 사항)입니다. |
| sendParam | Object | (선택 사항) 트랜잭션 전송을 위해 정의된 매개변수가 있는 객체입니다. sendParam에 대한 자세한 내용은 [kip37.create](#kip37-create)의 매개변수 설명을 참조하세요. |

**참고** `ids` 및 `amounts` 배열 매개변수는 배열의 요소로 `number` 타입을 허용하지만, 전달된 값이 number.MAX_SAFE_INTEGER로 제한되는 범위를 벗어날 경우 예기치 않은 결과나 오류가 발생할 수 있습니다. 이 경우, 특히 `uint256` 크기의 숫자 입력값의 경우 `BigNumber` 타입을 사용하는 것을 권장합니다.

**리턴 값**

`Promise`는 트랜잭션 실행 결과가 담긴 영수증인 `object`를 반환합니다. 영수증 객체 내부의 속성을 알고 싶다면 [getTransactionReceipt] 설명을 참고하세요. KIP37 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given (without data)
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

// Using FD transaction to execute the smart contract
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000], {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Send via a sendParam object with the from field given (with data)
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000], 'data', { from: '0x{address in hex}' }).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.safeBatchTransferFrom('0x{address in hex}', '0x{address in hex}', [1, 2], [10, 1000]).then(console.log)
```

## kip37.mint <a id="kip37-mint"></a>

```javascript
kip37.mint(to, id, value [, sendParam])
```
특정 토큰 유형 `id`의 토큰을 발행하고 `to` 및 `value` 변수에 따라 토큰을 할당합니다. 발행 함수를 사용하면 `to`와 `value`에 배열을 매개변수로 전달하여 특정 토큰을 여러 계정에 한 번에 발행할 수 있습니다.

이 메서드는 트랜잭션을 클레이튼 네트워크에 전송하며, 트랜잭션 발신자에게 트랜잭션 수수료가 부과된다는 점에 유의하세요.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| to | String &#124; Array | 발행된 토큰이 발행될 계정의 주소 또는 주소 배열입니다. |
| id | BigNumber &#124; string &#124; number | 발행할 토큰 ID입니다. |
| value | BigNumber &#124; string &#124; number &#124; Array | 발행할 토큰의 수량입니다. 여러 주소가 포함된 배열을 `to` 파라미터로 전달할 경우, 값을 배열 형태로 전달해야 합니다. |
| sendParam | Object | (선택 사항) 트랜잭션 전송을 위해 정의된 매개변수가 있는 객체입니다. sendParam에 대한 자세한 내용은 [kip37.create](#kip37-create)의 파라미터 설명을 참조하세요. |

**참고** 'id'와 'value' 파라미터는 'number' 타입을 허용하지만, 전달된 값이 number.MAX_SAFE_INTEGER로 제한되는 범위를 벗어날 경우 예기치 않은 결과나 오류가 발생할 수 있습니다. 이 경우, 특히 `uint256` 크기의 숫자 입력값의 경우 `BigNumber` 타입을 사용하는 것을 권장합니다.

**참고** `sendParam.from` 또는 `kip37.options.from`이 전달된 경우, MinterRole이 있는 miner이어야 합니다.

**리턴 값**

`Promise`는 트랜잭션 실행 결과가 포함된 영수증인 `object`를 반환합니다. 영수증 오브젝트 내부의 속성에 대해 알고 싶으시다면, [getTransactionReceipt] 설명을 참고하세요. KIP37 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given (Mint the specific tokens to a account)
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

// Send via a sendParam object with the from field given (Mint the specific tokens to the multiple accounts)
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

// Using FD transaction to execute the smart contract
> kip37.mint('0x{address in hex}', 2, 1000, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.mint('0x{address in hex}', 2, 1000).then(console.log)
```

## kip37.mintBatch <a id="kip37-mintbatch"></a>

```javascript
kip37.mintBatch(to, ids, values [, sendParam])
```
특정 토큰 유형 'id'의 여러 KIP-37 토큰을 일괄적으로 발행하고 변수 'to'와 'values'에 따라 토큰을 할당합니다.

이 메서드는 트랜잭션을 Klaytn 네트워크에 제출하며, 트랜잭션 발신자에게 트랜잭션 수수료가 부과됩니다.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| to | String | 발행된 토큰이 발행될 계정의 주소입니다. |
| id | Array | 발행할 토큰 아이디의 배열입니다. |
| values | Array | 발행할 토큰 금액의 배열입니다. |
| sendParam | Object | (선택 사항) 트랜잭션 전송을 위해 정의된 매개변수가 있는 객체입니다. sendParam에 대한 자세한 내용은 [kip37.create](#kip37-create)의 파라미터 설명을 참조하세요. |

**참고** `ids` 및 `values` 배열 매개변수는 배열의 요소로 `number` 타입을 허용하지만, 전달된 값이 number.MAX_SAFE_INTEGER로 제한되는 범위를 벗어날 경우 예기치 않은 결과나 오류가 발생할 수 있습니다. 이 경우, 특히 `uint256` 크기의 숫자 입력값의 경우 `BigNumber` 타입을 사용하는 것을 권장합니다.

**참고** `sendParam.from` 또는 `kip37.options.from`이 전달된 경우, MinterRole이 있는 miner이어야 합니다.

**리턴 값**

`Promise`는 트랜잭션 실행 결과가 포함된 영수증인 `object`를 반환합니다. 영수증 오브젝트 내부의 속성에 대해 알고 싶으시다면, [getTransactionReceipt] 설명을 참고하세요. KIP37 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given
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

// Using FD transaction to execute the smart contract
> kip37.mintBatch('0x{address in hex}', [1, 2], [100, 200], {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.mintBatch('0x{address in hex}', [1, 2], [100, 200]).then(console.log)
```


## kip37.addMinter <a id="kip37-addminter"></a>

```javascript
kip37.addMinter(account [, sendParam])
```
토큰을 발행할 수 있는 채굴자로 계정을 추가합니다.

이 메서드는 트랜잭션을 Klaytn 네트워크에 제출하며, 트랜잭션 발신자에게 트랜잭션 수수료가 부과됩니다.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| account | String | 마이너로 추가할 계정의 주소입니다. |
| sendParam | Object | (선택 사항) 트랜잭션 전송을 위해 정의된 매개변수가 있는 객체입니다. sendParam에 대한 자세한 내용은 [kip37.create](#kip37-create)의 파라미터 설명을 참조하세요. |

**참고** `sendParam.from` 또는 `kip37.options.from`이 주어진 경우, 이는 miner이어야 합니다.

**리턴 값**

`Promise`는 트랜잭션 실행 결과가 포함된 영수증인 `object`를 반환합니다. 영수증 오브젝트 내부의 속성에 대해 알고 싶다면 [getTransactionReceipt] 설명을 참고하세요. KIP37 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given 
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

// Using FD transaction to execute the smart contract
> kip37.addMinter('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.addMinter('0x{address in hex}').then(console.log)
```


## kip37.renounceMinter <a id="kip37-renounceminter"></a>

```javascript
kip37.renounceMinter([sendParam])
```
토큰을 발행할 권리를 포기합니다. 채굴자 주소만 발행 권한을 포기할 수 있습니다. 

이 메서드는 트랜잭션을 Klaytn 네트워크에 제출하여 트랜잭션 발신자에게 트랜잭션 수수료를 부과한다는 점에 유의하세요.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| sendParam | Object | (선택 사항) 트랜잭션 전송을 위한 파라미터가 정의된 객체입니다. sendParam에 대한 자세한 내용은 [kip37.create](#kip37-create)의 파라미터 설명을 참조하세요. |

**참고** `sendParam.from` 또는 `kip37.options.from`이 전달된 경우, MinterRole이 있는 miner이어야 합니다.

**리턴 값**

`Promise`는 트랜잭션 실행 결과가 포함된 영수증인 `object`를 반환합니다. 영수증 오브젝트 내부의 속성에 대해 알고 싶으시다면, [getTransactionReceipt] 설명을 참고하세요. KIP37 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given 
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

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.renounceMinter().then(console.log)
```


## kip37.burn <a id="kip37-burn"></a>

```javascript
kip37.burn(account, id, value [, sendParam])
```
특정 KIP-37 토큰을 소각합니다.

토큰 소유자의 토큰을 운영하도록 승인된 주소(운영자) 또는 토큰 소유자 본인이 이 토큰 전송 트랜잭션을 실행할 것으로 예상됩니다. 따라서 승인된 주소 또는 토큰 소유자가 이 트랜잭션의 발신자이어야 하며, 이 주소는 `sendParam.from` 또는 `kip37.options.from`에 제공되어야 합니다. `sendParam.from`과 `kip37.options.from`이 모두 제공되지 않으면 오류가 발생합니다.

이 메서드는 트랜잭션을 클레이튼 네트워크에 전송하며, 트랜잭션 발신자에게 트랜잭션 수수료가 부과됩니다.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| account | String | 소멸할 토큰을 소유한 계정의 주소입니다. |
| id | BigNumber &#124; string &#124; number | 파기할 토큰의 ID입니다. |
| value | BigNumber &#124; string &#124; number | 파기할 토큰의 금액입니다. |
| sendParam | Object | (선택 사항) 트랜잭션 전송을 위해 정의된 매개변수가 있는 객체입니다. sendParam에 대한 자세한 내용은 [kip37.create](#kip37-create)의 파라미터 설명을 참조하세요. |

**참고** `id`와 `amount` 파라미터는 `number` 타입을 허용하지만, 전달된 값이 number.MAX_SAFE_INTEGER로 제한되는 범위를 벗어날 경우 예기치 않은 결과나 오류가 발생할 수 있습니다. 이 경우, 특히 `uint256` 크기의 숫자 입력값의 경우 `BigNumber` 타입을 사용하는 것을 권장합니다.

**리턴 값**

`Promise`는 트랜잭션 실행 결과가 담긴 영수증인 `object`를 반환합니다. 영수증 객체 내부의 속성을 알고 싶다면 [getTransactionReceipt] 설명을 참고하세요. KIP37 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given 
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

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.burn('0x{address in hex}', 2, 10).then(console.log)
```


## kip37.burnBatch <a id="kip37-burnbatch"></a>

```javascript
kip37.burnBatch(account, ids, values [, sendParam])
```
여러 개의 KIP-37 토큰을 소각합니다.

소유자의 토큰을 운영할 권한이 있는 주소(운영자) 또는 토큰 소유자 본인이 이 토큰 전송 트랜잭션을 실행할 것으로 예상됩니다. 따라서 권한이 있는 사람 또는 토큰 소유자가 이 트랜잭션의 발신자이어야 하며, 발신자 주소는 `sendParam.from` 또는 `kip37.options.from`으로 지정해야 합니다. `sendParam.from`과 `kip37.options.from`이 모두 제공되지 않으면 오류가 발생합니다.

이 메서드는 트랜잭션을 클레이튼 네트워크에 전송하며, 트랜잭션 발신자에게 트랜잭션 수수료가 부과됩니다.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| account | String | 소멸할 토큰을 소유한 계정의 주소입니다. |
| id | Array | 소각할 토큰 아이디의 배열입니다. |
| values | Array | 소각할 토큰 금액의 배열입니다. |
| sendParam | Object | (선택 사항) 트랜잭션 전송을 위해 정의된 매개변수가 있는 객체입니다. sendParam에 대한 자세한 내용은 [kip37.create](#kip37-create)의 매개변수 설명을 참조하세요. |

**참고** `ids` 및 `values` 배열 매개변수는 배열의 요소로 `number` 타입을 허용하지만, 전달된 값이 number.MAX_SAFE_INTEGER로 제한되는 범위를 벗어날 경우 예기치 않은 결과나 오류가 발생할 수 있습니다. 이 경우, 특히 `uint256` 크기의 숫자 입력값의 경우 `BigNumber` 타입을 사용하는 것을 권장합니다.

**리턴 값**

`Promise`는 트랜잭션 실행 결과가 담긴 영수증인 `object`를 반환합니다. 영수증 객체 내부의 속성을 알고 싶다면, [getTransactionReceipt] 설명을 참고하세요. KIP37 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given 
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
컨트랙트를 일시 정지할 권한이 있는 계정을 일시 정지자로 추가합니다.

이 메서드는 트랜잭션을 Klaytn 네트워크에 제출하여 트랜잭션 발신자에게 트랜잭션 수수료를 부과한다는 점에 유의하세요.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| account | String | 새로운 일시정지자가 될 계정의 주소입니다. |
| sendParam | Object | (선택 사항) 트랜잭션 전송을 위해 정의된 매개변수가 있는 객체입니다. sendParam에 대한 자세한 내용은 [kip37.create](#kip37-create)의 매개변수 설명을 참조하세요. |

**참고** `sendParam.from` 또는 `kip37.options.from`이 전달된 경우, PauserRole이 있는 일시정지자이어야 합니다.

**리턴 값**

`Promise`는 트랜잭션 실행 결과가 포함된 영수증인 `object`를 반환합니다. 영수증 객체 내부의 속성에 대해 알고 싶다면 [getTransactionReceipt] 설명을 참조하세요. KIP37 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given 
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

// Using FD transaction to execute the smart contract
> kip37.addPauser('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.addPauser('0x{address in hex}').then(console.log)
```


## kip37.renouncePauser <a id="kip37-renouncepauser"></a>

```javascript
kip37.renouncePauser([sendParam])
```
컨트랙트를 일시 중지할 수 있는 권한을 포기합니다. 일시 중지 주소만 일시 중지 권한을 포기할 수 있습니다. 

이 메서드는 트랜잭션을 Klaytn 네트워크에 제출하여 트랜잭션 발신자에게 트랜잭션 수수료를 부과한다는 점에 유의하세요.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| sendParam | Object | (선택 사항) 트랜잭션 전송을 위한 파라미터가 정의된 객체입니다. sendParam에 대한 자세한 내용은 [kip37.create](#kip37-create)의 파라미터 설명을 참조하세요. |

**참고** `sendParam.from` 또는 `kip37.options.from`이 전달된 경우, PauserRole이 있는 일시정지자이어야 합니다.

**리턴 값**

`Promise`는 트랜잭션 실행 결과가 포함된 영수증인 `object`를 반환합니다. 영수증 객체 내부의 속성에 대해 알고 싶다면 [getTransactionReceipt] 설명을 참조하세요. KIP37 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given 
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

// Using FD transaction to execute the smart contract
> kip37.renouncePauser({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.renouncePauser().then(console.log)
```


## kip37.pause <a id="kip37-pause"></a>

```javascript
kip37.pause([id] [, sendParam])
```
토큰 작업과 관련된 함수를 일시 중단합니다. `id` 매개변수가 정의된 경우 특정 토큰을 일시 중지합니다. 그렇지 않으면 토큰 컨트랙트를 일시 중지합니다.

이 메서드는 트랜잭션을 Klaytn 네트워크에 제출하며, 트랜잭션 발신자에게 트랜잭션 수수료가 부과됩니다.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| id | BigNumber &#124; string &#124; number | (선택 사항) 일시 중지할 토큰 아이디입니다. 이 매개변수를 생략하면 `pause` 함수가 토큰 컨트랙트를 일시 중지합니다. |
| sendParam | Object | (선택 사항) 트랜잭션 전송을 위해 정의된 매개변수가 있는 객체입니다. sendParam에 대한 자세한 내용은 [kip37.create](#kip37-create)의 파라미터 설명을 참조하세요. |

**참고** `sendParam.from` 또는 `kip37.options.from`이 전달된 경우, PauserRole이 있는 일시정지자이어야 합니다.

**리턴 값**

`Promise`는 트랜잭션 실행 결과가 포함된 영수증인 `object`를 반환합니다. 영수증 객체 내부의 속성에 대해 알고 싶다면 [getTransactionReceipt] 설명을 참조하세요. KIP37 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given (pause the token contract)
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

// Send via a sendParam object with the from field given (pause the specific token)
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

// Using FD transaction to execute the smart contract
> kip37.pause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.pause().then(console.log)
```


## kip37.unpause <a id="kip37-unpause"></a>

```javascript
kip37.unpause([id] [, sendParam])
```

일시 중지된 컨트랙트 또는 특정 토큰을 재개합니다. `id` 매개변수가 정의된 경우 특정 토큰의 일시정지를 해제합니다. 그렇지 않으면 토큰 컨트랙트를 일시 정지 해제합니다.

이 메서드는 트랜잭션을 Klaytn 네트워크에 제출하며, 트랜잭션 발신자에게 트랜잭션 수수료가 부과됩니다.

**파라미터**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| id | BigNumber &#124; string &#124; number | (선택 사항) 일시정지를 해제할 토큰 아이디입니다. 이 매개변수를 생략하면 `unpause` 함수가 토큰 컨트랙트의 일시정지를 해제합니다. |

**참고** `sendParam.from` 또는 `kip37.options.from`이 전달된 경우, PauserRole이 있는 일시정지자이어야 합니다.

**리턴 값**

`Promise`는 트랜잭션 실행 결과가 포함된 영수증인 `object`를 반환합니다. 영수증 객체 내부의 속성에 대해 알고 싶다면 [getTransactionReceipt]의 설명을 참조하세요. KIP37 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given (unpause the token contract)
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

// Send via a sendParam object with the from field given (unpause the specific token)
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

// Using FD transaction to execute the smart contract
> kip37.unpause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip37.options.from
// If the value of kip37.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip37 instance.
> kip37.options.from = '0x{address in hex}'
> kip37.unpause().then(console.log)
```

[getTransactionReceipt]: ../caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt
