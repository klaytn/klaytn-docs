# caver.kct.kip17

`caver.kct.kip17`은 클레이튼 블록체인에서 [KIP-17](https://kips.klaytn.foundation/KIPs/kip-17)을 JavaScript 객체로 구현한 스마트 컨트랙트를 쉽게 처리할 수 있도록 도와줍니다.

`caver.kct.kip17`은 [caver.contract](../caver.contract.md)를 상속하여 KIP-17 토큰 컨트랙트를 구현합니다. `caver.kct.kip17`은 `caver.contract`과 동일한 속성을 가지지만 추가 기능을 구현하기 위한 메서드가 추가되었습니다. 여기서는 `caver.kct.kip17`에 새로 추가된 바인딩 메서드만 소개합니다.

caver-js용 KIP-17을 구현하는 코드는 [Klaytn 컨트랙트 GitHub 리포지토리](https://github.com/klaytn/klaytn-contracts/tree/master/contracts/KIP/token/KIP17)에서 확인할 수 있습니다. caver-js용 KIP-17은 오너블 인터페이스를 지원합니다. Using this, you can designate a contract owner when deploying a contract

KIP-17에 대한 자세한 내용은 [클레이튼 개선 제안](https://kips.klaytn.foundation/KIPs/kip-17)을 참고하세요.

## caver.kct.kip17.deploy <a id="caver-klay-kip17-deploy"></a>

```javascript
caver.kct.kip17.deploy(tokenInfo, deployer)
```

KIP-17 토큰 컨트랙트를 Klaytn 블록체인에 배포합니다. caver.kct.kip17.deploy를 사용하여 배포된 컨트랙트는 KIP-17 표준을 따르는 대체 불가능한 토큰입니다.

배포가 성공적으로 완료되면 새로운 KIP17 인스턴스로 프로미스가 해결됩니다.

**파라미터**

| 이름        | 유형               | Description                                                                                                                                                                                                                                                                                                                       |
| --------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tokenInfo | Object           | 클레이튼 블록체인에 KIP-17 토큰 컨트랙트를 배포하는 데 필요한 정보입니다. 자세한 내용은 아래 표를 참조하세요.                                                                                                                                                                                                                                                                 |
| deployer  | String \| Object | KIP-17 토큰 컨트랙트를 배포할 Keyring 인스턴스의 주소입니다. 이 주소에는 배포하기에 충분한 KLAY가 있어야 합니다. 자세한 내용은 [Keyring](../caver-wallet/keyring.md#caver-wallet-keyring)을 참조하세요. 트랜잭션을 전송할 때 사용할 필드를 정의하려면 객체 유형을 파라미터로 전달할 수 있습니다. KIP-17 컨트랙트를 배포할 때 수수료 위임을 사용하려면 오브젝트에서 수수료 위임과 관련된 필드를 정의할 수 있습니다. 해당 필드의 사용법은 [approve](#kip17-approve)의 파라미터 설명을 참조하세요. |

토큰 정보 객체에는 다음이 포함되어야 합니다:

| 이름     | 유형     | 설명         |
| ------ | ------ | ---------- |
| name   | String | 토큰의 이름입니다. |
| symbol | String | 토큰의 기호입니다. |

**리턴 값**

`PromiEvent`: 새로운 KIP17 인스턴스로 해결되는 프로미스 결합 이벤트 이미터입니다. 또한 다음과 같은 이벤트가 발생할 수 있습니다:

| Name            | Type   | 설명                                                                                                                                                     |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| transactionHash | String | 트랜잭션이 전송되고 트랜잭션 해시를 사용할 수 있는 직후에 실행됩니다.                                                                                                                |
| receipt         | object | 트랜잭션 영수증을 사용할 수 있을 때 발생합니다. 영수증 객체 내부의 프로퍼티에 대해 알고 싶으시다면 [getTransactionReceipt]를 참조하세요. KIP17 인스턴스의 영수증에는 'logs' 속성 대신 abi를 통해 파싱된 'events' 속성이 있습니다. |
| error           | Error  | 전송 중 오류가 발생하면 발생합니다.                                                                                                                                   |

**토큰 등록**

1. 블록 탐색기에 토큰을 등록하려면 컨트랙트 생성자가 제출 요청 양식을 작성해야 합니다. 양식에 명시된 필수 정보를 기록해 두세요.

2. 스마트 컨트랙트 환경

   - 컴파일러 유형: Solidity

   - 컴파일러 버전: v0.8.4+commit.c7e474f2

   - 오픈 소스 라이선스 유형: MIT

3. 스마트 컨트랙트 세부 정보

   - 최적화: --optimize-run 200

   - 소스 코드: [KIP17 컨트랙트 GitHub 링크](https://github.com/klaytn/caver-js/blob/dev/packages/caver-kct/src/kip17Token.sol).

4. ABI 인코딩된 값: [kip17JsonInterface at dev - klaytn/caver-js - GitHub](https://github.com/klaytn/caver-js/blob/dev/packages/caver-kct/src/kctHelper.js#L408-L1319)

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

// Send object as second parameter
> caver.kct.kip17.deploy({
        name: 'Jasmine',
        symbol: 'JAS',
    },
    {
        from: '0x{address in hex}',
        feeDelegation: true,
        feePayer: '0x{address in hex}',
    }).then(console.log)

// using event emitter and promise
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

토큰 컨트랙트에 의해 구현된 인터페이스의 정보를 반환합니다. 이 정적 함수는 [kip17.detectInterface](#kip17-detectinterface)를 사용합니다.

**파라미터**

| Name            | Type   | 설명                |
| --------------- | ------ | ----------------- |
| contractAddress | String | KIP-7 토큰 컨트랙트의 주소 |

**리턴 값**

`Promise`는 각 [KIP-17 인터페이스](https://kips.klaytn.foundation/KIPs/kip-17#kip-13-identifiers)의 구현 여부가 포함된 결과를 부울 값으로 반환하는 `object`를 반환합니다.

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

바인딩된 메서드와 이벤트가 있는 새 KIP17 인스턴스를 생성합니다. 이 함수는 [new KIP17](#new-kip17)과 동일하게 작동합니다.

**참고** `caver.kct.kip17.create`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

**매개변수**

[new KIP17](#new-kip17)을 참조하세요.

**Return Value**

[new KIP17](#new-kip17)을 참조하세요.

**예시**

```javascript
// Create a KIP17 instance without a parameter
> const kip17 = caver.kct.kip17.create()

// Create a KIP17 instance with a token address
> const kip17 = caver.kct.kip17.create('0x{address in hex}')
```

## new KIP17 <a id="new-kip17"></a>

```javascript
new caver.kct.kip17([tokenAddress])
```

바인딩된 메서드와 이벤트가 포함된 새 KIP17 인스턴스를 생성합니다.

**매개변수**

| 이름           | 유형     | Description                                                                                              |
| ------------ | ------ | -------------------------------------------------------------------------------------------------------- |
| tokenAddress | String | (선택 사항) KIP-17 토큰 컨트랙트의 주소로, 나중에 `kip17.options.address = '0x1234..'`를 통해 할당할 수 있습니다. |

**리턴 값**

| Type   | 설명                                |
| ------ | --------------------------------- |
| Object | 바인딩된 메서드 및 이벤트가 있는 KIP17 인스턴스입니다. |

**예제**

```javascript
// Create a KIP17 instance without a parameter
> const kip17 = new caver.kct.kip17()

// Create a KIP17 instance with a token address
> const kip17 = new caver.kct.kip17('0x{address in hex}')
```

## kip17.clone <a id="kip17-clone"></a>

```javascript
kip17.clone([tokenAddress])
```

현재 KIP17 인스턴스를 복제합니다.

**매개변수**

| 이름           | Type   | Description                                                                                 |
| ------------ | ------ | ------------------------------------------------------------------------------------------- |
| tokenAddress | String | (선택 사항) 다른 KIP-17 토큰을 배포한 스마트 컨트랙트의 주소입니다. 생략하면 원래 인스턴스의 컨트랙트 주소로 설정됩니다. |

**리턴 값**

| 유형     | 설명                     |
| ------ | ---------------------- |
| Object | 원본 KIP17 인스턴스의 복제본입니다. |

**예시**

```javascript
> const kip17 = new caver.kct.kip17(address)

// Clone without a parameter
> const cloned = kip17.clone()

// Clone with the address of the new token contract
> const cloned = kip17.clone('0x{address in hex}')
```

## kip17.detectInterface <a id="kip17-detectinterface"></a>

```javascript
kip17.detectInterface()
```

토큰 컨트랙트가 구현한 인터페이스의 정보를 반환합니다.

**Parameters**

None

**리턴 값**

`Promise`는 각 [KIP-17 인터페이스](https://kips.klaytn.foundation/KIPs/kip-17#kip-13-identifiers)의 구현 여부를 부울 값과 함께 결과를 포함하는 `object`를 반환합니다.

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

이 컨트랙트가 `interfaceId`로 정의된 인터페이스를 구현하면 `true`를 반환합니다.

**Parameters**

| 이름          | Type   | 설명               |
| ----------- | ------ | ---------------- |
| interfaceId | String | 검사할 인터페이스아이디입니다. |

**리턴 값**

이 컨트랙트가 `interfaceId`로 정의된 인터페이스를 구현하는 경우 `Promise`는 `boolean`: `true`를 반환합니다.

**Example**

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

토큰의 이름을 반환합니다.

**파라미터**

None

**리턴 값**

`Promise`는 `string`을 반환합니다: 토큰의 이름입니다.

**예제**

```javascript
> kip17.name().then(console.log)
Jasmine
```

## kip17.symbol <a id="kip17-symbol"></a>

```javascript
kip17.symbol()
```

토큰의 심볼을 반환합니다.

**파라미터**

None

**리턴 값**

`Promise`는 `string`을 반환합니다: 토큰의 심볼입니다.

**예제**

```javascript
> kip17.symbol().then(console.log)
JAS
```

## kip17.totalSupply <a id="kip17-totalsupply"></a>

```javascript
kip17.totalSupply()
```

컨트랙트에서 발행한 총 토큰 수를 반환합니다.

**파라미터**

None

**리턴 값**

`Promise`는 `BigNumber`를 반환합니다: 토큰의 총 개수입니다.

**예시**

```javascript
> kip17.totalSupply().then(console.log)
10
```

## kip17.tokenURI <a id="kip17-tokenuri"></a>

```javascript
kip17.tokenURI(tokenId)
```

일시 중지된 컨트랙트를 재개합니다.

**파라미터**

| 이름      | 유형                            | 설명          |
| ------- | ----------------------------- | ----------- |
| tokenId | BigNumber \| string \| number | 토큰의 아이디입니다. |

**참고** `tokenId` 파라미터는 `number` 타입을 허용하지만, 전달된 값이 number.MAX_SAFE_INTEGER로 제한되는 범위를 벗어날 경우 예기치 않은 결과나 오류가 발생할 수 있습니다. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**리턴 값**

발행할 토큰의 URI 문자열입니다.

**예시**

```javascript
> kip17.tokenURI(0).then(console.log)
https://kip17.example/uri-ex-caver.json
```

## kip17.tokenOfOwnerByIndex <a id="kip17-tokenofownerbyindex"></a>

```javascript
kip17.tokenOfOwnerByIndex(owner, index)
```

주어진 인덱스에 대해 `owner`의 토큰 목록을 검색하고, 일치하는 항목이 있으면 목록에서 일치하는 인덱스에 위치한 토큰의 토큰 ID를 반환합니다.

**파라미터**

| 이름    | 유형                            | 설명                         |
| ----- | ----------------------------- | -------------------------- |
| owner | string                        | 토큰을 소유한 계정의 주소입니다.         |
| index | BigNumber \| string \| number | 소유자의 토큰 목록에 있는 토큰의 인덱스입니다. |

**참고** `index` 파라미터는 `number` 타입을 허용하지만, 입력된 값이 number.MAX_SAFE_INTEGER로 제한되는 범위를 벗어날 경우 예기치 않은 결과나 오류가 발생할 수 있습니다. 이 경우, 특히 `uint256` 크기의 숫자 입력값의 경우 `BigNumber` 타입을 사용하는 것을 권장합니다.

**리턴 값**

`Promise`는 `BigNumber`를 반환합니다: 토큰의 ID입니다.

**예시**

```javascript
> kip17.tokenOfOwnerByIndex('0x{address in hex}', 5).then(console.log)
5
```

## kip17.tokenByIndex <a id="kip17-tokenbyindex"></a>

```javascript
kip17.tokenByIndex(index)
```

주어진 인덱스에 대해 이 컨트랙트의 모든 토큰 목록을 검색하고, 일치하는 항목이 있으면 목록에서 일치하는 인덱스에 위치한 토큰의 토큰 ID를 반환합니다. 인덱스가 토큰의 총 개수보다 크거나 같으면 반환합니다.

**Parameters**

| 이름    | 유형                            | 설명                                  |
| ----- | ----------------------------- | ----------------------------------- |
| index | BigNumber \| string \| number | The index of a token to be queried. |

**참고** `index` 파라미터는 `number` 타입을 허용하지만, 입력된 값이 number.MAX_SAFE_INTEGER로 제한되는 범위를 벗어날 경우 예기치 않은 결과나 오류가 발생할 수 있습니다. 이 경우, 특히 `uint256` 크기의 숫자 입력값의 경우 `BigNumber` 타입을 사용하는 것을 권장합니다.

**리턴 값**

`Promise`는 `BigNumber`를 반환합니다: 토큰의 ID입니다.

**Example**

```javascript
> kip17.tokenByIndex(1).then(console.log)
1
```

## kip17.balanceOf <a id="kip17-balanceof"></a>

```javascript
kip17.balanceOf(address)
```

주어진 계정 주소의 잔액을 반환합니다. KIP-17 계정의 잔액은 해당 계정이 소유한 대체 불가능한 토큰(NFT)의 총 개수입니다.

**매개변수**

| 이름      | 유형     | Description        |
| ------- | ------ | ------------------ |
| address | String | 잔액을 확인할 계정의 주소입니다. |

**리턴 값**

`Promise`는 `BigNumber`를 반환합니다: 계정 잔액입니다.

**Example**

```javascript
> kip17.balanceOf('0x{address in hex}').then(console.log)
9
```

## kip17.ownerOf <a id="kip17-ownerof"></a>

```javascript
kip17.ownerOf(tokenId)
```

지정된 토큰 ID의 소유자 주소를 반환합니다.

**매개변수**

| 이름      | 유형                            | 설명          |
| ------- | ----------------------------- | ----------- |
| tokenId | BigNumber \| string \| number | 토큰의 아이디입니다. |

**참고** `tokenId` 파라미터는 `number` 타입을 허용하지만, 전달된 값이 number.MAX_SAFE_INTEGER로 제한되는 범위를 벗어날 경우 예기치 않은 결과나 오류가 발생할 수 있습니다. 이 경우, 특히 `uint256` 크기의 숫자 입력값의 경우 `BigNumber` 타입을 사용하는 것을 권장합니다.

**리턴 값**

`Promise`는 `string`을 반환합니다: 주어진 토큰을 소유한 계정의 주소입니다.

**예시**

```javascript
> kip17.ownerOf(8).then(console.log)
0x0e0E95426343d97CC7BB913C7D7DBea065A31814
```

## kip17.getApproved <a id="kip17-getapproved"></a>

```javascript
kip17.getApproved(tokenId)
```

이 토큰을 전송하도록 승인된 주소를 반환하거나, 승인된 주소가 없는 경우 '0' 주소를 반환합니다. 주어진 토큰 ID가 존재하지 않으면 되돌아갑니다.

**파라미터**

| Name    | 유형                            | 설명          |
| ------- | ----------------------------- | ----------- |
| tokenId | BigNumber \| string \| number | 토큰의 아이디입니다. |

**참고** `tokenId` 파라미터는 `number` 타입을 허용하지만, 전달된 값이 number.MAX_SAFE_INTEGER로 제한되는 범위를 벗어날 경우 예기치 않은 결과나 오류가 발생할 수 있습니다. 이 경우, 특히 `uint256` 크기의 숫자 입력값의 경우 `BigNumber` 타입을 사용하는 것을 권장합니다.

**리턴 값**

`Promise`는 `string`을 반환합니다: 주어진 토큰을 전송할 수 있는 권한이 있는 계정의 주소입니다.

**예시**

```javascript
// If an approved address exists
> kip17.getApproved(10).then(console.log)
0x23D8E9cae17b22d3DAC65b4F7D2C737C6A7b865d

// If no approved address exists
> kip17.getApproved(3).then(console.log)
0x0000000000000000000000000000000000000000
```

## kip17.isApprovedForAll <a id="kip17-isapprovedforall"></a>

```javascript
kip17.isApprovedForAll(owner, operator)
```

`operator`가 `owner`에 속한 모든 토큰을 전송할 수 있도록 승인된 경우 `true`를 반환합니다.

**매개변수**

| Name     | 유형     | 설명                                            |
| -------- | ------ | --------------------------------------------- |
| owner    | string | 토큰을 소유하고 있으며 운영자가 모든 토큰을 전송하도록 허용한 계정의 주소입니다. |
| operator | string | 소유자 대신 소유자의 모든 토큰을 보내도록 승인된 계정의 주소입니다.        |

**리턴 값**

`operator`가 `owner`의 모든 토큰을 전송할 수 있도록 승인된 경우 `Promise`는 `Boolean`: `true`를 반환합니다.

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

주어진 계정이 KIP-17을 준수하는 현재 컨트랙트에서 새로운 토큰을 발행할 수 있는 채굴자인 경우 `true`를 반환합니다.

**Parameters**

| 이름      | 유형     | 설명                        |
| ------- | ------ | ------------------------- |
| address | string | 채굴 권한이 있는지 확인할 계정의 주소입니다. |

**리턴 값**

`Promise`는 해당 계정이 채굴자인 경우 `Boolean`: `true`를 반환합니다.

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

컨트랙트가 일시 중지되면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.

**매개변수**

None

**리턴 값**

`Promise`는 컨트랙트가 일시정지된 경우 `Boolean`: `true`를 반환합니다.

**Example**

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

주어진 계정이 토큰 전송을 일시 중지할 수 있는 일시 중지자일 경우 `true`를 반환합니다.

**Parameters**

| 이름      | Type   | 설명                                        |
| ------- | ------ | ----------------------------------------- |
| address | String | 토큰 전송을 일시 중지할 수 있는 권한이 있는지 확인할 계정의 주소입니다. |

**리턴 값**

`Promise`는 계정이 일시 정지 상태인 경우 `Boolean`: `true`를 반환합니다.

**Example**

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

주어진 토큰 ID의 토큰을 전송할 다른 주소를 승인합니다. 0 주소는 승인된 주소가 없음을 나타냅니다. 채굴자 주소만 발행 권한을 포기할 수 있습니다. 이 메서드는 토큰 소유자 또는 승인된 운영자만 호출할 수 있습니다.

소각 메서드는 트랜잭션을 Klaytn 네트워크에 제출하며, 트랜잭션 수수료는 발신자에게 청구됩니다.

**파라미터**

| 이름        | 유형                            | 설명                                                           |
| --------- | ----------------------------- | ------------------------------------------------------------ |
| to        | string                        | 소유자 대신 토큰을 소비하는 계정의 주소입니다.                                   |
| tokenId   | BigNumber \| string \| number | 지출자가 사용할 수 있는 토큰의 아이디입니다.                                    |
| sendParam | Object                        | (선택 사항) 트랜잭션을 전송하기 위해 정의된 매개변수가 있는 객체입니다. |

**참고** `tokenId` 매개변수는 `number` 타입을 허용하지만, 입력된 값이 number.MAX_SAFE_INTEGER로 제한되는 범위를 벗어날 경우 예기치 않은 결과 또는 오류가 발생할 수 있습니다. 이 경우, 특히 `uint256` 크기의 숫자 입력값의 경우 `BigNumber` 타입을 사용하는 것을 권장합니다.

sendParam 객체에는 다음이 포함될 수 있습니다:

| Object        | 유형                                  | 설명                                                                                                                                                                                                                                                                        |
| ------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from          | String                              | (선택 사항) 트랜잭션을 전송할 주소입니다. 생략하면 `kip17.options.from`으로 설정됩니다. `sendParam` 오브젝트의 `from`과 `kip17.options.from` 중 어느 것도 제공되지 않으면 오류가 발생합니다.                                                                                                                 |
| gas           | Number \| String                    | (선택 사항) 이 트랜잭션에 제공되는 최대 가스(가스 한도). 생략할 경우, `kip17.methods.approve(spender, tokenId).estimateGas({from})` 호출을 통해 caver-js에서 설정합니다.                                                                                                   |
| gasPrice      | Number \| String                    | (선택 사항) 이 트랜잭션에 사용할 peb 단위의 가스 가격입니다. 생략할 경우, `caver.klay.getGasPrice` 호출을 통해 caver-js가 설정합니다.                                                                                                                                                         |
| value         | number \| string \| BN \| BigNumber | (선택 사항) peb 단위로 전송할 값입니다.                                                                                                                                                                                                                              |
| feeDelegation | boolean                             | (선택 사항, 기본값 `false`) 수수료 위임 트랜잭션 사용 여부. 생략하면 `kip17.options.feeDelegation`이 사용됩니다. 둘 다 생략하면 수수료 위임이 사용되지 않습니다.                                                                                                                                         |
| feePayer      | String                              | (선택 사항) 트랜잭션 수수료를 지불하는 수수료 납부자의 주소입니다. `feeDelegation`이 `true`인 경우, 이 값은 트랜잭션의 `feePayer` 필드에 설정됩니다. 생략하면 `kip17.options.feePayer`가 사용됩니다. 둘 다 생략하면 오류가 발생합니다.                                                                                         |
| feeRatio      | String                              | (선택 사항) 수수료 납부자가 부담하게 될 트랜잭션 수수료의 비율입니다. `feeDelegation`이 `true`이고 `feeRatio`가 유효한 값으로 설정되면 부분 수수료 위임 트랜잭션이 사용됩니다. The valid range of this is between 1 and 99. 유효한 범위는 1에서 99 사이이며, 0 또는 100 이상의 비율은 허용되지 않습니다. 생략하면 `kip17.options.feeRatio`가 사용됩니다. |

**참고** `feeDelegation`, `feePayer`, `feeRatio`는 caver-js [v1.6.1](https://www.npmjs.com/package/caver-js/v/1.6.1) 부터 지원됩니다.

**Return Value**

`Promise`는 트랜잭션 실행 결과가 담긴 영수증인 `object`를 반환합니다. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt]. KIP-17 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given 
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

// Using FD transaction to execute the smart contract
> kip17.approve('0x{address in hex}', 10, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.approve('0x{address in hex}', 10).then(console.log)
```

## kip17.setApprovalForAll <a id="kip17-setApprovalforall"></a>

```javascript
kip17.setApprovalForAll(to, approved [, sendParam])
```

주어진 연산자 `to`가 소유자의 모든 토큰을 전송할 수 있도록 승인하거나 승인하지 않습니다.

setApprovalForAll 메서드는 트랜잭션을 Klaytn 네트워크에 제출하며, 트랜잭션 수수료는 발신자에게 부과됩니다.

**파라미터**

| 이름        | 유형      | 설명                                                                                    |
| --------- | ------- | ------------------------------------------------------------------------------------- |
| to        | String  | 소유자의 모든 토큰을 전송하도록 승인/금지할 계정의 주소입니다.                                                   |
| approved  | Boolean | 이 연산자가 `true`이면 승인됩니다. `false`이면 연산자가 허용되지 않습니다.                                      |
| sendParam | Object  | (선택 사항) 트랜잭션 전송을 위한 파라미터가 정의된 객체입니다. sendParam에 대한 자세한 내용은 [approve]의 매개변수 설명을 참조하세요. |

**리턴 값**

`Promise` returns `object` - The receipt containing the result of the transaction execution. If you want to know about the properties inside the receipt object, see the description of [getTransactionReceipt]. KIP-17 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given 
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

// Using FD transaction to execute the smart contract
> kip17.setApprovalForAll('0x{address in hex}', false, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.setApprovalForAll('0x{address in hex}', true).then(console.log)
```

## kip17.transferFrom <a id="kip17-transferfrom"></a>

```javascript
kip17.transferFrom(from, to, tokenId [, sendParam])
```

토큰 소유자의 잔고에서 주어진 토큰 아이디 `tokenId`의 토큰을 다른 주소로 전송합니다. 토큰 소유자의 토큰을 전송할 권한이 있는 주소(운영자) 또는 토큰 소유자 본인이 이 토큰 전송 트랜잭션을 실행할 것으로 예상됩니다. 따라서 승인된 계정 또는 토큰 소유자가 이 트랜잭션의 발신자이어야 하며, 이 주소는 `sendParam.from` 또는 `kip17Instance.options.from`에 제공되어야 합니다. `sendParam.from`과 `kip17Instance.options.from`이 모두 제공되지 않으면 오류가 발생합니다. 가능하면 이 메서드 대신 [safeTransferFrom](#kip17-safetransferfrom)을 사용하는 것이 좋습니다.

이 트랜잭션을 전송하면 트랜잭션 발신자에게 트랜잭션 수수료가 부과된다는 점에 유의하세요.

**파라미터**

| 이름        | 유형                            | 설명                                                                                    |
| --------- | ----------------------------- | ------------------------------------------------------------------------------------- |
| from      | String                        | 주어진 토큰의 소유자 또는 승인된 운영자의 주소입니다.                                                        |
| to        | String                        | 토큰을 받을 계정의 주소입니다.                                                                     |
| tokenId   | BigNumber \| string \| number | 전송하려는 토큰의 아이디입니다.                                                                     |
| sendParam | object                        | (선택 사항) 트랜잭션 전송을 위한 파라미터가 정의된 객체입니다. sendParam에 대한 자세한 내용은 [approve]의 매개변수 설명을 참조하세요. |

**NOTE** The `tokenId` parameter accepts `number` type but if the fed value were out of the range capped by number.MAX_SAFE_INTEGER, it might cause an unexpected result or error. 이 경우, 특히 `uint256` 크기의 숫자 입력값의 경우 `BigNumber` 타입을 사용하는 것을 권장합니다.

**Return Value**

`Promise`는 `object`를 반환합니다 - 트랜잭션 실행 결과가 포함된 영수증입니다. 영수증 객체 내부의 속성에 대해 알고 싶다면, [getTransactionReceipt] 설명을 참고하세요. KIP-17 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**Example**

```javascript
// Send via a sendParam object with the from field given 
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

// Using FD transaction to execute the smart contract
> kip17.transferFrom('0x{address in hex}', '0x{address in hex}', 2, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.transferFrom('0x{address in hex}', '0x{address in hex}', 2).then(console.log)
```

## kip17.safeTransferFrom <a id="kip17-safetransferfrom"></a>

```javascript
kip17.safeTransferFrom(from, to, tokenId [, data] [, sendParam])
```

토큰 소유자의 잔고에서 주어진 토큰 ID `tokenId`의 토큰을 다른 주소로 안전하게 전송합니다. 토큰 소유자의 토큰을 전송할 권한이 있는 주소(운영자) 또는 토큰 소유자 본인이 이 토큰 전송 트랜잭션을 실행할 것으로 예상됩니다. 따라서 승인된 주소 또는 토큰 소유자가 이 트랜잭션의 발신자이어야 하며, 이 주소는 `sendParam.from` 또는 `kip17Instance.options.from`에 제공되어야 합니다. `sendParam.from`과 `kip17Instance.options.from`이 모두 제공되지 않으면 오류가 발생합니다.

`to`가 컨트랙트 주소인 경우, [IKIP17Receiver.onKIP17Received](https://kips.klaytn.foundation/KIPs/kip-17#wallet-interface)를 구현해야 하며, 그렇지 않으면 전송이 되돌려집니다. otherwise, the transfer is reverted.

이 트랜잭션을 전송하면 트랜잭션 발신자에게 트랜잭션 수수료가 부과된다는 점에 유의하세요.

**Parameters**

| Object    | 유형                            | 설명                                                                                    |
| --------- | ----------------------------- | ------------------------------------------------------------------------------------- |
| from      | string                        | 주어진 토큰의 소유자 또는 승인된 운영자의 주소입니다.                                                        |
| to        | String                        | 토큰을 받을 계정의 주소입니다.                                                                     |
| tokenId   | BigNumber \| string \| number | 전송하려는 토큰의 아이디입니다.                                                                     |
| data      | Buffer \| string \| number    | (선택 사항) 호출과 함께 전송할 선택적 데이터입니다.                                     |
| sendParam | Object                        | (선택 사항) 트랜잭션 전송을 위한 파라미터가 정의된 객체입니다. sendParam에 대한 자세한 내용은 [approve]의 매개변수 설명을 참조하세요. |

**NOTE** The `tokenId` parameter accepts `number` type but if the fed value were out of the range capped by number.MAX_SAFE_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**리턴 값**

`Promise`는 트랜잭션 실행 결과가 담긴 영수증인 `object`를 반환합니다. 영수증 객체 내부의 속성에 대해 알고 싶다면, [getTransactionReceipt] 설명을 참고하세요. KIP-17 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**Example**

```javascript
// Send via a sendParam object with the from field given (without data)
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

// Using FD transaction to execute the smart contract
> kip17.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 9, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Send via a sendParam object with the from field given (with data)
> kip17.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11, '0x1234', { from: '0x{address in hex}' }).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.safeTransferFrom('0x{address in hex}', '0x{address in hex}', 11).then(console.log)
```

## kip17.addMinter <a id="kip17-addminter"></a>

```javascript
kip17.addMinter(account [, sendParam])
```

토큰을 채굴할 수 있는 채굴자로 계정을 추가합니다.

addMinter 메서드는 트랜잭션을 Klaytn 네트워크에 제출하며, 트랜잭션 수수료는 발신자에게 부과됩니다.

**파라미터**

| 이름        | 유형     | 설명                                                                                       |
| --------- | ------ | ---------------------------------------------------------------------------------------- |
| account   | String | miner로 추가할 계정의 주소입니다.                                                                    |
| sendParam | Object | (선택 사항) 트랜잭션 전송을 위해 정의된 매개변수가 있는 객체입니다. sendParam에 대한 자세한 내용은 [approve]의 매개변수 설명을 참조하세요. |

**참고** `sendParam.from` 또는 `kip17.options.from`이 주어진 경우, miner이어야 합니다.

**Return Value**

`Promise`는 트랜잭션 실행 결과가 포함된 영수증인 `object`를 반환합니다. 영수증 객체 내부의 속성에 대해 알고 싶다면 [getTransactionReceipt] 설명을 참고하세요. KIP-17 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given 
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

// Using FD transaction to execute the smart contract
> kip17.addMinter('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.addMinter('0x{address in hex}').then(console.log)
```

## kip17.renounceMinter <a id="kip17-renounceminter"></a>

```javascript
kip17.renounceMinter([sendParam])
```

토큰을 발행할 권리를 포기합니다. 컨트랙트를 일시 중지할 수 있는 권한을 포기합니다.

renounceMinter 메서드는 트랜잭션을 Klaytn 네트워크에 제출하며, 트랜잭션 수수료는 발신자에게 부과됩니다.

**파라미터**

| 이름        | 유형     | 설명                                                                                       |
| --------- | ------ | ---------------------------------------------------------------------------------------- |
| sendParam | object | (선택 사항) 트랜잭션 전송을 위해 정의된 매개변수가 있는 객체입니다. sendParam에 대한 자세한 내용은 [approve]의 매개변수 설명을 참조하세요. |

`sendParam.from` 또는 `kip17.options.from`이 주어진 경우, MinterRole이 있는 miner이어야 합니다.

**Return Value**

`Promise`는 트랜잭션 실행 결과가 포함된 영수증인 `object`를 반환합니다. 영수증 객체 내부의 속성에 대해 알고 싶다면 [getTransactionReceipt] 설명을 참고하세요. KIP-17 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given 
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

// Using FD transaction to execute the smart contract
> kip17.renounceMinter({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.renounceMinter().then(console.log)
```

## kip17.mintWithTokenURI <a id="kip17-mintwithtokenuri"></a>

```javascript
kip17.mintWithTokenURI(to, tokenId, tokenURI [, sendParam])
```

주어진 URI로 토큰을 생성하고 지정된 계정에 할당합니다. 이 메서드는 이 토큰의 총 공급량을 증가시킵니다.

mintWithTokenURI 메서드는 트랜잭션을 Klaytn 네트워크에 제출하며, 트랜잭션 수수료는 발신자에게 청구됩니다.

**파라미터**

| 이름        | 유형                            | Description                                                                                                              |
| --------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| to        | String                        | 발행된 토큰이 발행될 계정의 주소입니다.                                                                                                   |
| tokenId   | BigNumber \| string \| number | 발행할 토큰의 아이디입니다.                                                                                                          |
| tokenURI  | String                        | 쿼리할 토큰의 인덱스입니다.                                                                                                          |
| sendParam | object                        | (optional) An object with defined parameters for sending a transaction. sendParam에 대한 자세한 내용은 [approve]의 매개변수 설명을 참조하세요. |

**NOTE** The `tokenId` parameter accepts `number` type but if the fed value were out of the range capped by number.MAX_SAFE_INTEGER, it might cause an unexpected result or error. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**참고** `sendParam.from` 또는 `kip17.options.from`이 전달된 경우, MinterRole이 있는 miner이어야 합니다.

**리턴 값**

`Promise`는 트랜잭션 실행 결과가 포함된 영수증인 `object`를 반환합니다. 영수증 객체 내부의 속성에 대해 알고 싶다면 [getTransactionReceipt] 설명을 참고하세요. KIP-17 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given 
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

// Using FD transaction to execute the smart contract
> kip17.mintWithTokenURI('0x{address in hex}', 18, tokenURI, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.mintWithTokenURI('0x{address in hex}', 18, tokenURI).then(console.log)
```

## kip17.burn <a id="kip17-burn"></a>

```javascript
kip17.burn(tokenId [, sendParam])
```

주어진 토큰 ID의 토큰을 소각합니다. `sendParam.from` 또는 `kip17.options.from`이 제공되지 않으면 오류가 발생합니다.

Note that the burn method will submit a transaction to the Klaytn network, which will charge the transaction fee to the sender.

**파라미터**

| 이름        | 유형                            | 설명                                                                                    |
| --------- | ----------------------------- | ------------------------------------------------------------------------------------- |
| tokenId   | BigNumber \| string \| number | 소멸할 토큰의 아이디입니다.                                                                       |
| sendParam | Object                        | (선택 사항) 트랜잭션 전송을 위한 파라미터가 정의된 객체입니다. sendParam에 대한 자세한 내용은 [approve]의 매개변수 설명을 참조하세요. |

**참고** `tokenId` 파라미터는 `number` 타입을 허용하지만, 전달된 값이 number.MAX_SAFE_INTEGER로 제한되는 범위를 벗어날 경우 예기치 않은 결과나 오류가 발생할 수 있습니다. In this case, it is recommended to use the `BigNumber` type, especially for a `uint256` sized numeric input value.

**Return Value**

`Promise`는 트랜잭션 실행 결과가 담긴 영수증인 `object`를 반환합니다. 영수증 오브젝트 내부의 속성에 대해 알고 싶으시다면, [getTransactionReceipt] 설명을 참고하세요. Receipts from KIP-17 instances have an 'events' attribute parsed via ABI instead of a 'logs' attribute.

**예시**

```javascript
// Send via a sendParam object with the from field given 
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

// Using FD transaction to execute the smart contract
> kip17.burn(14, {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.burn(14).then(console.log)
```

## kip17.pause <a id="kip17-pause"></a>

```javascript
kip17.pause([sendParam])
```

토큰 전송과 관련된 함수를 일시 중단합니다.

일시정지 메서드는 트랜잭션을 Klaytn 네트워크에 제출하여 트랜잭션 수수료를 발신자에게 부과한다는 점에 유의하세요.

**Parameters**

| 이름        | Type   | 설명                                                                                       |
| --------- | ------ | ---------------------------------------------------------------------------------------- |
| sendParam | Object | (선택 사항) 트랜잭션 전송을 위해 정의된 매개변수가 있는 객체입니다. sendParam에 대한 자세한 내용은 [approve]의 매개변수 설명을 참조하세요. |

**참고** `sendParam.from` 또는 `kip17.options.from`이 전달된 경우, PauserRole이 있는 일시 중지자여야 합니다.

**Return Value**

`Promise`는 트랜잭션 실행 결과가 포함된 영수증인 `object`를 반환합니다. 영수증 객체 내부의 속성에 대해 알고 싶다면 [getTransactionReceipt] 설명을 참고하세요. KIP-17 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given 
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

// Using FD transaction to execute the smart contract
> kip17.pause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.pause().then(console.log)
```

## kip17.unpause <a id="kip17-unpause"></a>

```javascript
kip17.unpause([sendParam])
```

Resumes the paused contract.

일시정지 해제 메서드를 사용하면 트랜잭션이 클레이튼 네트워크에 제출되며, 트랜잭션 수수료가 발신자에게 부과됩니다.

**파라미터**

| 이름        | Type   | 설명                                                                                       |
| --------- | ------ | ---------------------------------------------------------------------------------------- |
| sendParam | Object | (선택 사항) 트랜잭션 전송을 위해 정의된 매개변수가 있는 객체입니다. sendParam에 대한 자세한 내용은 [approve]의 매개변수 설명을 참조하세요. |

**참고** `sendParam.from` 또는 `kip17.options.from`이 전달된 경우, PauserRole이 있는 일시 중지자여야 합니다.

**리턴 값**

`Promise`는 트랜잭션 실행 결과가 포함된 영수증인 `object`를 반환합니다. 영수증 오브젝트 내부의 속성에 대해 알고 싶으시다면, [getTransactionReceipt] 설명을 참고하세요. KIP-17 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given 
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

// Using FD transaction to execute the smart contract
> kip17.unpause({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.unpause().then(console.log)
```

## kip17.addPauser <a id="kip17-addpauser"></a>

```javascript
kip17.addPauser(account [, sendParam])
```

컨트랙트를 일시 정지할 수 있는 권한이 있는 계정을 일시 정지자로 추가합니다.

addPauser 메서드는 트랜잭션을 Klaytn 네트워크에 제출하여 트랜잭션 수수료를 발신자에게 부과한다는 점에 유의하세요.

**Parameters**

| 이름        | 유형     | 설명                                                                                                                             |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| account   | string | 새로운 일시정지자가 될 계정의 주소입니다.                                                                                                        |
| sendParam | object | (선택 사항) 트랜잭션 전송을 위해 정의된 매개변수가 있는 객체입니다. For more information about sendParam, refer to the parameter description of [approve]. |

**참고** `sendParam.from` 또는 `kip17.options.from`이 전달된 경우, PauserRole이 있는 일시 중지자여야 합니다.

**리턴 값**

`Promise`는 트랜잭션 실행 결과가 포함된 영수증인 `object`를 반환합니다. 영수증 오브젝트 내부의 속성에 대해 알고 싶다면 [getTransactionReceipt] 설명을 참고하세요. KIP-17 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given 
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

// Using FD transaction to execute the smart contract
> kip17.addPauser('0x{address in hex}', {
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.addPauser('0x{address in hex}').then(console.log)
```

## kip17.renouncePauser <a id="kip17-renouncepauser"></a>

```javascript
kip17.renouncePauser([sendParam])
```

Renounces the right to pause the contract. 일시 중지 주소만 자신의 일시 중지 권한을 포기할 수 있습니다.

renouncePauser 메서드는 트랜잭션을 Klaytn 네트워크에 제출하고, 트랜잭션 수수료를 발신자에게 부과한다는 점에 유의하세요.

**파라미터**

| 없음        | 유형     | 설명                                                                                                                       |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| sendParam | object | (optional) An object with defined parameters for sending a transaction. sendParam에 대한 자세한 내용은 [approve]의 매개변수 설명을 참조하세요. |

**참고** `sendParam.from` 또는 `kip17.options.from`이 전달된 경우, PauserRole이 있는 일시 중지자여야 합니다.

**리턴 값**

`Promise`는 트랜잭션 실행 결과가 포함된 영수증인 `object`를 반환합니다. 영수증 객체 내부의 속성에 대해 알고 싶다면, [getTransactionReceipt] 설명을 참고하세요. KIP-17 인스턴스의 영수증에는 'logs' 속성 대신 ABI를 통해 파싱된 'events' 속성이 있습니다.

**예시**

```javascript
// Send via a sendParam object with the from field given 
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

// Using FD transaction to execute the smart contract
> kip17.renouncePauser({
    from: '0x{address in hex}'
    feeDelegation: true,
    feePayer: '0x{address in hex}'
}).then(console.log)

// Using kip17.options.from
// If the value of kip17.options.from is set, this value is used as the default value 
// unless you specify `from` in the sendParam object when sending a transaction with a kip17 instance.
> kip17.options.from = '0x{address in hex}'
> kip17.renouncePauser().then(console.log)
```

[getTransactionReceipt]: ../caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt

[approve]: #kip17-approve
