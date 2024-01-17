# 시작하기

이 문서는 caver-js v1.5.0 이상을 사용하는 개발자를 위한 문서입니다. 이전 버전을 사용하는 경우 [시작하기(\~v1.4.1)](../caver-js-1.4.1/get-started-1.4.1.md)를 참조하세요.

## 전제 조건 <a href="#prerequisites" id="prerequisites"></a>

### 종속성 <a href="#dependencies" id="dependencies"></a>

caver-js 라이브러리를 사용하려면 다음 패키지가 필요합니다.

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)
- [gcc-c++](https://gcc.gnu.org/)
- [Solidity 컴파일러](https://solidity.readthedocs.io/en/develop/installing-solidity.html)

**참고** caver-js는 Node.js 버전 12 및 14에서 실행할 수 있습니다. 권장 버전은 다음과 같습니다:

- lts/erbium ([12.21.0](https://nodejs.org/dist/latest-v12.x/))
- lts/fermium ([14.16.0](https://nodejs.org/dist/latest-v14.x/))

다른 버전의 노드(예: 노드 v15)를 사용하는 경우, 노드 버전 관리자([nvm](https://github.com/nvm-sh/nvm))를 활용하여 caver-js에서 지원하는 버전을 설치 및 사용하세요.

### 설치 <a href="#installation" id="installation"></a>

사용해 보려면 다음 명령을 사용하여 npm으로 caver-js를 설치하세요:

```
$ npm install caver-js
```

**참고**: `package.json` 파일은 동일한 설치 경로에 존재해야 합니다. 존재하지 않는 경우, `npm init`을 통해 `package.json`을 생성할 수 있습니다.

특정 버전의 caver-js를 설치하려면 다음 명령을 사용해 보세요:

```
$ npm install caver-js@X.X.X
```

## caver-js로 시작하기 <a href="#starting-with-caver-js" id="starting-with-caver-js"></a>

caver-js 설치를 완료했다면, 이제 caver-js를 사용하여 Klaytn 노드에 연결할 수 있습니다.

아래 예제를 연습하려면 먼저 작업 디렉터리에 테스트 파일을 생성합니다.

```bash
$ touch test.js
```

작업 디렉터리에 생성된 `test.js` 파일을 확인할 수 있습니다.

test.js에 다음 코드를 작성합니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const version = await caver.rpc.klay.getClientVersion()
	console.log(version)
}

testFunction()
```

위 코드를 실행하면 다음과 같은 결과가 표시됩니다.

```bash
$ node ./test.js
Klaytn/v1.4.0/linux-amd64/go1.14.1
```

위와 같은 콘솔 로그의 출력이 확인되면 아래 단계를 진행합니다. 버전 번호는 연결된 클레이튼 노드의 버전에 따라 다를 수 있습니다.

### 클레이튼 노드에 연결하기 <a href="#connecting-to-a-klaytn-node" id="connecting-to-a-klaytn-node"></a>

아래 예시와 같이 caver-js 모듈을 가져와서 Baobab 테스트넷의 Klaytn 노드에 연결할 수 있습니다:

```javascript
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')
```

EN을 실행 중인 경우 아래와 같이 호스트와 포트를 변경하여 자체 노드에 연결할 수 있습니다:

```javascript
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')
```

## Keyring 관리하기 <a href="#managing-keyrings" id="managing-keyrings"></a>

[Keyring](api/caver-wallet/caver-wallet.md)은 클레이튼 계정의 주소와 개인키가 포함된 구조입니다.

[Keyring](api/caver-wallet/caver-wallet.md)은 저장하는 키의 종류에 따라 하나의 주소와 하나의 개인키를 저장하는 [SingleKeyring](../../../learn/accounts.md#roles), 하나의 주소와 하나의 개인키를 저장하는 [MultipleKeyring](../../../learn/accounts.md#roles), 하나의 주소와 여러 개의 개인키를 저장하는 [RoleBasedKeyring](../../../learn/accounts.md#roles), 각 역할에 대해 하나의 주소와 하나 이상의 개인키를 저장하는 [RoleBasedKeyring](../../../learn/accounts.md#roles)을 사용하세요.

[SingleKeyring](../../../learn/accounts.md#roles)은 내부에 `key` 속성을 정의하며, 이 `key`는 하나의 개인키를 저장합니다.

[MultipleKeyring](../../../learn/accounts.md#roles)은 내부에 `keys` 속성을 정의하며, 이 `keys`는 여러 개인키를 저장하기 위해 배열로 구현됩니다.

[RoleBasedKeyring](../../../learn/accounts.md#roles)에 정의된 `key` 속성은 2차원 배열(빈 `key`는 `[ [], [], [] ]`처럼 보입니다)로 구현되며 각 [role](../../../learn/accounts.md#roles)에 대한 여러 키를 포함할 수 있습니다. 배열의 첫 번째 요소는 `roleTransactionKey`에 사용할 개인 키로 채워지고, 두 번째 요소는 `roleAccountUpdateKey`에 사용할 개인 키로 채워지며, 세 번째 요소는 `roleFeePayerKey`에 사용할 개인 키로 채워집니다.

### Keyring 만들기 <a href="#creating-a-keyring" id="creating-a-keyring"></a>

#### SingleKeyring 생성하기 <a href="#generating-a-singlekeyring" id="generating-a-singlekeyring"></a>

아래와 같이 하나의 열쇠고리를 무작위로 생성할 수 있습니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const keyring = caver.wallet.keyring.generate()
	console.log(keyring)
}

testFunction()
```

위 코드를 실행하면 다음과 같은 결과가 표시됩니다.

```bash
$ node ./test.js
SingleKeyring {
	_address: '0x3d263c3c0df60c5516f932d244531742f45eed5c',
	_key: PrivateKey { _privateKey: '0x{private key}' }
}
```

실행 결과는 위와 같습니다. 인스턴스 내부에 정의된 멤버 변수는 `keyring.address`와 `keyring.key`를 통해 접근할 수 있습니다.

#### 개인키에서 SingleKeyring 만들기 <a href="#creating-a-singlekeyring-from-private-key" id="creating-a-singlekeyring-from-private-key"></a>

또한 특정 개인키를 소유하고 있는 경우 이를 사용하여 아래와 같이 Keyring을 만들 수 있습니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	// Create a keyring from a private key
	const keyringFromPrivateKey = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	console.log(keyringFromPrivateKey)
}

testFunction()
```

위 코드를 실행하면 다음과 같은 결과가 표시됩니다.

```bash
$ node ./test.js
SingleKeyring {
	_address: '0xf5a9079f311f9ec55170af351627aff0c5d2e287',
	_key: PrivateKey { _privateKey: '0x{private key}' } 
}
```

`caver.wallet.keyring.createFromPrivateKey`의 결과는 위의 `caver.wallet.keyring.generate`의 결과와 마찬가지로 내부에 주소가 정의된 [SingleKeyring](../../../learn/accounts.md#roles) 인스턴스와 `keyring.key`의 [PrivateKey] 인스턴스가 됩니다.

#### 개인키와 주소로 SingleKeyring 만들기 <a href="#creating-a-singlekeyring-with-a-private-key-and-an-address" id="creating-a-singlekeyring-with-a-private-key-and-an-address"></a>

클레이튼 계정의 개인키가 주소와 분리되어 있는 경우, 아래와 같이 주어진 주소와 개인키를 사용하여 Keyring을 만들 수 있습니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	// Create a keyring with an address and a private key
	const keyring = caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key}')
	console.log(keyring)

	// Create a keyring from a KlaytnWalletKey
	const keyringFromKlaytnWalletKey = caver.wallet.keyring.createFromKlaytnWalletKey('0x{private key}0x{type}0x{address in hex}')
	console.log(keyringFromKlaytnWalletKey)
}

testFunction()
```

콘솔에서 아래와 같이 코드를 실행합니다.

```bash
$ node ./test.js
SingleKeyring {
	_address: '0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
	_key: PrivateKey { _privateKey: '0x{private key}' }
}
SingleKeyring {
	_address: '0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
	_key: PrivateKey { _privateKey: '0x{private key}' }
}
```

#### 여러 개의 개인 키가 있는 MultipleKeyring 만들기 <a href="#creating-a-multiplekeyring-with-multiple-private-keys" id="creating-a-multiplekeyring-with-multiple-private-keys"></a>

여러 개의 개인키를 사용하려면 주소와 여러 개의 개인키를 사용하여 [MultipleKeyring](../../../learn/accounts.md#roles)을 생성하면 됩니다. 아래 예시는 여러 개의 개인키를 사용하여 [MultipleKeyring](../../../learn/accounts.md#roles)을 생성하는 방법을 설명합니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	// Create a keyring with an address and private keys
	const keyring = caver.wallet.keyring.createWithMultipleKey('0x{address in hex}', [ '0x{private key1}', '0x{private key2}' ])
	console.log(keyring)
}

testFunction()
```

위 코드를 실행하면 다음과 같은 결과가 표시됩니다.

```bash
$ node ./test.js
MultipleKeyring {
	_address: '0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
	_keys: [
		PrivateKey { _privateKey: '0x{private key1}' },
		PrivateKey { _privateKey: '0x{private key2}' } 
	]
}
```

보시다시피 `_keys`에는 배열에 여러 개의 PrivateKey 인스턴스가 있습니다. 인스턴스 내부에 정의된 멤버 변수는 `keyring.address`와 `keyring.keys`를 통해 액세스할 수 있습니다.

#### 개인 키를 사용하여 RoleBasedKeyring 만들기 <a href="#creating-a-rolebasedkeyring-with-role-based-private-keys" id="creating-a-rolebasedkeyring-with-role-based-private-keys"></a>

각 [role](api/caver-wallet/caver-wallet.md)에 대해 다른 개인키를 사용하려면 `caver.wallet.keyring.createWithRoleBasedKey`가 대신 사용됩니다. 각 배열 요소는 [RoleBasedKeyring](../../../learn/accounts.md#roles)에 설명된 역할을 나타냅니다. 아래 예시는 각 역할에 대해 서로 다른 키로 [RoleBasedKeyring](../../../learn/accounts.md#roles) 인스턴스를 생성하는 방법을 보여줍니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	// Create a keyring with an address and private keys defined by each roles
	const keyring = caver.wallet.keyring.createWithRoleBasedKey('0x{address in hex}', [
		[ '0x{private key1}', '0x{private key2}', '0x{private key3}' ],
		[ '0x{private key4}'],
		[ '0x{private key5}', '0x{private key6}' ],
	])
	console.log(keyring)
}

testFunction()
```

위의 코드를 실행하면 다음과 같은 결과가 표시됩니다.

```bash
$ node ./test.js
RoleBasedKeyring {
	_address: '0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
	_keys: [ 
		[ 
			PrivateKey { _privateKey: '0x{private key1}' },
			PrivateKey { _privateKey: '0x{private key2}' },
			PrivateKey { _privateKey: '0x{private key3}' }
		],
		[ PrivateKey { _privateKey: '0x{private key4}' } ],
		[ 
			PrivateKey { _privateKey: '0x{private key5}' },
			PrivateKey { _privateKey: '0x{private key6}' }
		]
	]
}
```

위의 출력을 보면 키 배열의 첫 번째 요소인 `roleTransactionKey`에는 세 개의 PrivateKey 인스턴스가 있고, 두 번째 요소인 `roleAccountUpdateKey`에는 하나의 PrivateKey 인스턴스가 있습니다. 그리고 배열의 마지막 요소인 `roleFeePayerKey`에는 두 개의 PrivateKey 인스턴스가 있습니다.

**참고**: Keyring([caver.wallet.keyring](api/caver-wallet/caver-wallet.md)) 또는 지갑([caver.wallet](api/caver-wallet/caver-wallet.md)) 관련 함수 호출은 실제 클레이튼 블록체인 플랫폼(Klaytn)에 영향을 미치지 않습니다.

### caver-js에 Keyring 추가하기 <a href="#adding-keyrings-to-caver-js" id="adding-keyrings-to-caver-js"></a>

caver-js에서 제공하는 인메모리 지갑을 이용하면 쉽게 Keyring을 사용할 수 있습니다. 아래 예시는 [클레이튼 지갑](api/caver-wallet/caver-wallet.md)에서 생성한 Keyring 인스턴스와 키스토어 파일을 이용해 지갑에 Keyring을 추가하는 방법을 설명합니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	// Using a keyring instance
	const keyring = caver.wallet.keyring.generate()
	caver.wallet.add(keyring)
	console.log(caver.wallet.getKeyring(keyring.address))

	// Using a keystore file
	const decrypted = caver.wallet.keyring.decrypt({ 
		version: 4,
		id: '9c12de05-0153-41c7-a8b7-849472eb5de7',
		address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
		keyring: [
			{ 
				ciphertext: 'eacf496cea5e80eca291251b3743bf93cdbcf7072efc3a74efeaf518e2796b15',
				cipherparams: { iv: 'd688a4319342e872cefcf51aef3ec2da' },
				cipher: 'aes-128-ctr',
				kdf: 'scrypt',
				kdfparams: {
					dklen: 32,
					salt: 'c3cee502c7157e0faa42386c6d666116ffcdf093c345166c502e23bc34e6ba40',
					n: 4096,
					r: 8,
					p: 1
				},
				mac: '4b49574f3d3356fa0d04f73e07d5a2a6bbfdd185bedfa31f37f347bc98f2ef26'
			}
		]
	}, 'password')

	caver.wallet.add(decrypted)
	console.log(caver.wallet.getKeyring(decrypted.address))
}

testFunction()
```

콘솔에서 실행합니다.

```bash
$ node ./test.js
SingleKeyring {
	_address: '0x66391720b488a3fb2c7c69d99cd4cd6e23ca18e3',
	_key: PrivateKey { _privateKey: '0x{private key}' }
}
SingleKeyring {
	_address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
	_key: PrivateKey { _privateKey: '0x{private key}' }
}
```

위의 출력을 보면, `caver.wallet`에 Keyring을 추가한 후 `caver.wallet`에서 Keyring을 조회할 수 있습니다.

사용할 주소와 개인키가 있는 경우, Keyring을 쉽게 생성하여 [caver.wallet](api/caver-wallet/caver-wallet.md)에서 [caver.wallet.newKeyring](api/caver-wallet/caver-wallet.md)을 통해 바로 추가할 수 있습니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	// Add to wallet with an address and a private key
	const addedSingle = caver.wallet.newKeyring('0x{address in hex}', '0x{private key1}')
	console.log(caver.wallet.getKeyring(addedSingle.address))

	// Add to wallet with an address and private keys
	const addedMultiple = caver.wallet.newKeyring('0x{address in hex}', ['0x{private key2}', '0x{private key3}', '0x{private key4}'])
	console.log(caver.wallet.getKeyring(addedMultiple.address))

	// Add to wallet with an address and private keys defined by each roles
	const addedRoleBased = caver.wallet.newKeyring('0x{address in hex}', [
		['0x{private key5}', '0x{private key6}', '0x{private key7}'],
		['0x{private key8}', '0x{private key9}'],
		['0x{private key10}', '0x{private key11}']
	])
	console.log(caver.wallet.getKeyring(addedRoleBased.address))
}

testFunction()
```

위 코드를 실행하면 다음과 같은 결과를 얻을 수 있습니다. 위 코드 실행 결과는 아래와 같습니다. 개인키가 하나인 경우 `caver.wallet.newKeyring`을 실행하면 개인키가 하나인 Keyring 인스턴스가 생성되어 `caver.wallet`에 추가됩니다. 개인키가 여러 개인키일 경우, 여러 개인키를 가진 Keyring 인스턴스가 생성됩니다. 역할별로 하나 이상의 개인키를 인자로 전달하면 역할별로 다른 개인키를 가진 Keyring 인스턴스가 생성되어 `caver.wallet`에 추가됩니다.

```bash
$ node ./test.js
SingleKeyring {
	_address: '0x651f6ae6b45750082b22805583acc989399c6552',
	_key: PrivateKey { _privateKey: '0x{private key1}' }
}
MultipleKeyring {
	_address: '0xce3ee92aeb4d600a41c98bdf92e8b337e186bf58',
	_keys: [ 
		PrivateKey { _privateKey: '0x{private key2}' },
		PrivateKey { _privateKey: '0x{private key3}' },
		PrivateKey { _privateKey: '0x{private key4}' }
    ]
}
RoleBasedKeyring {
	_address: '0x626d5b94ec76a105c5afa370bb7e59050a22b8b5',
	_keys: [ 
		[ 
			PrivateKey { _privateKey: '0x{private key5}' },
			PrivateKey { _privateKey: '0x{private key6}' },
			PrivateKey { _privateKey: '0x{private key7}' }
		],
		[ 
			PrivateKey { _privateKey: '0x{private key8}' },
			PrivateKey { _privateKey: '0x{private key9}' }
		],
		[ 
			PrivateKey { _privateKey: '0x{private key10}' },
			PrivateKey { _privateKey: '0x{private key11}' }
		]
	]
}
```

`caver.wallet.add` 또는 `caver.wallet.newKeyring`은 `caver.wallet`에 추가한 후 Keyring 인스턴스를 반환합니다.

## 트랜잭션 보내기 <a href="#sending-a-transaction" id="sending-a-transaction"></a>

이 섹션에서는 Baobab 네트워크에서 caver-js를 사용하여 KLAY를 전송하는 방법을 보여드리겠습니다.

### Baobab Faucet를 통해 KLAY받기 <a href="#getting-klay-via-baobab-faucet" id="getting-klay-via-baobab-faucet"></a>

테스트를 위해 KLAY가 필요한 경우, [Klaytn 지갑](api/caver-wallet/caver-wallet.md)에서 Baobab 테스트넷 KLAY를 받을 수 있습니다. 개인키 또는 키스토어 파일을 사용하여 클레이튼 지갑에 로그인하고 테스트용 Faucet를 통해 Baobab 테스트넷 KLAY를 받습니다.

### 밸류 전송 트랜잭션 보내기 <a href="#sending-a-value-transfer-transaction" id="sending-a-value-transfer-transaction"></a>

caver-js 지갑을 사용하여 트랜잭션의 서명을 생성할 수 있습니다. 트랜잭션을 네트워크에 전송하려면 아래의 두 단계를 거쳐야 합니다.

1. 트랜잭션 서명하기
   - 사용하고자 하는 Keyring이 [caver.wallet](api/caver-wallet/caver-wallet.md)에 추가되어 있는 경우 `caver.wallet.sign` 함수를 사용하여 서명할 수 있습니다.
   - `caver.wallet`에 추가하지 않고 Keyring을 별도로 관리할 경우 `transaction.sign` 함수를 통해 트랜잭션에 서명할 수 있습니다.
2. 서명된 트랜잭션의 RLP 인코딩된 문자열을 `caver.rpc.klay.sendRawTransaction`을 통해 클레이튼에 전송합니다.

**참고:** 발신자는 충분한 KLAY를 보유하고 있어야 합니다.

#### 트랜잭션 체결

트랜잭션을 클레이튼에 보내기 전에 먼저 트랜잭션에 서명해야 합니다.

아래는 Keyring이 [caver.wallet](api/caver-wallet/caver-wallet.md)에 추가된 경우 트랜잭션에 서명하는 방법의 예시입니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	// Add a keyring to caver.wallet
	const keyring = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	caver.wallet.add(keyring)

	// Create a value transfer transaction
	const valueTransfer = caver.transaction.valueTransfer.create({
		from: keyring.address,
		to: '0x176ff0344de49c04be577a3512b6991507647f72',
		value: 1,
		gas: 30000,
	})

	// Sign the transaction via caver.wallet.sign
	await caver.wallet.sign(keyring.address, valueTransfer)

	const rlpEncoded = valueTransfer.getRLPEncoding()
	console.log(`RLP-encoded string: ${rlpEncoded}`)
}

testFunction()
```

위 코드는 `caver.wallet`에 Keyring을 추가하고 트랜잭션을 생성한 후 `caver.wallet.sign`을 통해 트랜잭션에 서명합니다.

위의 코드를 실행하면 다음과 같은 결과가 표시됩니다. 위 코드가 실행되면 트랜잭션의 RLP 인코딩된 문자열이 아래와 같이 출력됩니다. (출력되는 RLP 인코딩된 문자열은 아래 표시된 문자열 출력과 다를 수 있습니다).

```bash
RLP-encoded string: 0x08f87e808505d21dba0082753094176ff0344de49c04be577a3512b6991507647f720194ade4883d092e2a972d70637ca7de9ab5166894a2f847f845824e44a0e1ec99789157e5cb6bc691935c204a23aaa3dc049efafca106992a5d5db2d179a0511c421d5e508fdb335b6048ca7aa84560a53a5881d531644ff178b6aa4c0a41
```

#### 서명된 트랜잭션의 RLP 인코딩된 문자열을 Klaytn으로 전송

이제 아래와 같이 서명된 트랜잭션을 네트워크에 전송할 수 있습니다. 아래 예시를 실행하려면 위의 `0x{RLP 인코딩된 문자열}`을 `rlpEncoded` 값으로 바꾸세요.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const rlpEncoding = `0x{RLP-encoded string}`

	// Send the transaction using `caver.rpc.klay.sendRawTransaction`.
	const receipt = await caver.rpc.klay.sendRawTransaction(rlpEncoding)
	console.log(receipt)
}

testFunction()
```

위의 코드를 실행하면 다음과 같은 결과가 표시됩니다. 위 코드가 실행되면 트랜잭션 영수증은 아래와 같이 표시됩니다.

```bash
$ node ./test.js
{ 
	blockHash: '0xd20066b448da77a41a46fbf0856792b85b60c42213126f661f6434b5b1263072',
	blockNumber: '0x1efb',
	contractAddress: null,
	from: '0x09a08f2289d3eb3499868908f1c84fd9523fe11b',
	gas: '0x7530',
	...
	signatures: [
		{ 
			V: '0x4e43',
			R: '0x5737aa8c88f019a3ee184faed6d34d103f77773bd5434cb0328c11738c8d9755',
			S: '0x578b118f4400999e5232bd0860cfbdbf89622f6e11cc6bd9722a86767d2723b7'
		}
	],
	status: '0x1',
	to: '0x176ff0344de49c04be577a3512b6991507647f72',
	transactionHash: '0x43e8ab1a2365ad598448b4402c1cfce6a71b3a103fce3a69905613e50b978113',
	transactionIndex: 0,
	type: 'TxTypeValueTransfer',
	typeInt: 8,
	value: '0x1'
}
```

`caver.wallet` 없이 트랜잭션에 서명하고 네트워크에 전송하려면 아래 예시를 참조하세요.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	// Create a value transfer transaction
	const keyring = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	const valueTransfer = caver.transaction.valueTransfer.create({
		from: keyring.address,
		to: '0x176ff0344de49c04be577a3512b6991507647f72',
		value: 1,
		gas: 30000,
	})

	// Sign the transaction via transaction.sign
	await valueTransfer.sign(keyring)

	// Send the transaction to the Klaytn using `caver.rpc.klay.sendRawTransaction`.
	const receipt = await caver.rpc.klay.sendRawTransaction(valueTransfer)
	console.log(receipt)
}

testFunction()
```

위의 코드를 실행하면 이전 예제처럼 트랜잭션 영수증이 인쇄됩니다.

### 영수증 확인 <a href="#checking-receipts" id="checking-receipts"></a>

[caver.rpc.klay.sendRawTransaction](api/caver-wallet/caver-wallet.md)을 통해 트랜잭션을 클레이튼에 전송할 때 프로미스나 이벤트 이미터를 사용하여 트랜잭션 영수증을 받을 수 있습니다.

다음 예는 프로미스와 이벤트 이미터를 사용하여 영수증을 받는 방법을 보여줍니다.

```javascript
// Using a promise - async/await
const receipt = await caver.rpc.klay.sendRawTransaction(rawTransaction)
console.log(receipt)

// Using a promise
caver.rpc.klay.sendRawTransaction(rawTransaction).then(console.log)

// Using an event emitter
caver.rpc.klay.sendRawTransaction(rawTransaction).on('receipt', console.log)
```

위의 예에서 설명한 것처럼 프로미스 및 이벤트 이미터를 통해 트랜잭션을 전송한 결과를 얻을 수 있습니다. `transactionHash` 필드는 영수증 객체 내부에 정의되어 있습니다. [caver.rpc.klay.getTransactionReceipt](api/caver-rpc/klay.md#caver-rpc-klay-sendrawtransaction) RPC 호출에 `receipt.transactionHash`를 사용하여 트랜잭션이 블록에 포함된 후 네트워크에서 언제든지 트랜잭션의 영수증을 조회할 수 있습니다. 아래 예시는 [caver.rpc.klay.getTransactionReceipt](api/caver-rpc/klay.md#caver-rpc-klay-sendrawtransaction) RPC 호출을 사용하여 영수증을 가져오는 방법을 보여줍니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const receipt = await caver.rpc.klay.getTransactionReceipt('0x40552efbba23347d36f6f5aaba6b9aeb6602e004df62c1988d9b7b1f036e676a')
	console.log(receipt)
}

testFunction()
```

위 코드를 실행하면 다음과 같은 결과가 표시됩니다. 위 코드가 실행되면 트랜잭션 영수증은 아래와 같이 표시됩니다.

```bash
$ node ./test.js
{ 
	blockHash: '0x65d041011440e04643c546eb8bbb1dcabb659c3b3216e01473cb0712e47b5f69',
	blockNumber: '0x20db',
	contractAddress: null,
	from: '0x09a08f2289d3eb3499868908f1c84fd9523fe11b',
	gas: '0x7530',
	...
	signatures: [
		{ 
			V: '0x4e43',
			R: '0xfabe48071a8b72f0c340b2ee9d948a496cce467aebe027159d66a175e6b4b5b4',
			S: '0x1d4e503f1b084cda15edeba6b7b8eba15057b9d2484f7f3d095c980c2d98f13'
		}
	],
	status: '0x1',
	to: '0x176ff0344de49c04be577a3512b6991507647f72',
	transactionHash: '0x40552efbba23347d36f6f5aaba6b9aeb6602e004df62c1988d9b7b1f036e676a',
	transactionIndex: 0,
	type: 'TxTypeValueTransfer',
	typeInt: 8,
	value: '0x1'
}
```

트랜잭션의 결과는 영수증의 `status`를 통해 확인할 수 있습니다. 반환 값에 대한 자세한 내용은 [caver.rpc.klay.getTransactionReceipt](api/caver-rpc/klay.md#caver-rpc-klay-sendrawtransaction)를 참고하세요. 트랜잭션이 실패한 경우, 영수증의 `txError`에서 오류에 대한 자세한 내용을 확인할 수 있습니다. 자세한 내용은 [Transaction](../../transaction-error-codes.md)을 참고하세요.

## 다른 트랜잭션 유형 실행하기 <a href="#executing-other-transaction-types" id="executing-other-transaction-types"></a>

클레이튼은 확장성과 성능을 위해 다양한 트랜잭션 유형을 제공합니다. 자세한 내용은 [Transaction](../../../learn/transactions.md)을 참고하세요. 이 섹션에서는 caver-js와 함께 사용할 수 있는 몇 가지 예제를 설명합니다.

### 수수료 위임 <a href="#fee-delegation" id="fee-delegation"></a>

클레이튼은 [수수료 위임](../../../learn/transactions/) 기능을 제공합니다. 다음은 이러한 트랜잭션의 발신자가 RLP로 인코딩된 트랜잭션을 만드는 예시입니다:

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const sender = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	caver.wallet.add(sender)

	const feeDelegatedTx = caver.transaction.feeDelegatedValueTransfer.create({
		from: sender.address,
		to: '0x176ff0344de49c04be577a3512b6991507647f72',
		value: 5,
		gas: 50000,
	})

	await caver.wallet.sign(sender.address, feeDelegatedTx)

	const rlpEncoded = feeDelegatedTx.getRLPEncoding()
	console.log(rlpEncoded)
}

testFunction()
```

위 코드를 실행하면 RLP로 인코딩된 문자열이 출력됩니다. (실제로 받은 RLP 인코딩된 문자열 출력은 아래 표시된 문자열 출력과 다를 수 있습니다.)

```bash
$ node ./test.js
0x09f884028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf080c4c3018080
```

수수료 납부자는 트랜잭션 발신자가 서명한 RLP 인코딩 문자열(`rawTransaction`)에 `feePayerSignatures`를 첨부한 후 트랜잭션을 Klaytn에 전송할 수 있습니다. `caver.wallet`에 수수료 납부자의 키가 있는 경우, `caver.wallet.signAsFeePayer(feePayer.address, feeDelegatedTx)`를 호출하여 수수료 납부자의 서명을 `feeDelegatedTx`에 주입할 수 있습니다. 그렇지 않으면, 수수료 납부자는 아래 그림과 같이 발신자가 서명한 RLP 인코딩된 문자열에서 `feeDelegatedTx`를 생성하고 여기에 수수료 납부자의 서명을 추가해야 합니다. 아래 예제를 실행하려면 위의 `0x{RLP 인코딩된 문자열}`을 `rlpEncoded` 값으로 바꾸면 됩니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const feePayer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	caver.wallet.add(feePayer)

	const rlpEncoded = '0x{RLP-encoded string}'

	const feeDelegateTxFromRLPEncoding = caver.transaction.feeDelegatedValueTransfer.create(rlpEncoded)

	// Set the fee payer address.
	feeDelegateTxFromRLPEncoding.feePayer = feePayer.address
	await caver.wallet.signAsFeePayer(feePayer.address, feeDelegateTxFromRLPEncoding)

	console.log(feeDelegateTxFromRLPEncoding.getRLPEncoding())
}

testFunction()
```

위 코드를 실행하면 발신자의 서명과 수수료 납부자의 서명이 포함된 RLP 인코딩된 문자열이 아래와 같이 출력됩니다. (실제 출력되는 문자열은 아래 표시된 문자열 출력과 다를 수 있습니다.)

```bash
$ node ./test.js
0x09f8dc028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf09417e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24f847f845824e44a0921b7c3be69db96ce14134b306c2ada423613cb66ecc6697ee8067983c268b6ea07b86b255d1c781781315d85d7904226fb2101eb9498c4a03f3fbd30ba3ec5b79
```

이제 트랜잭션에 발신자와 수수료 납부자가 모두 서명했으며 네트워크를 통해 전송할 수 있습니다. 위 예제 코드의 `0x{RLP 인코딩된 문자열}`을 RLP 인코딩된 문자열 출력으로 바꿉니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const rlpEncoded = '0x{RLP-encoded string}'
	const receipt = await caver.rpc.klay.sendRawTransaction(rlpEncoded)
	console.log(receipt)
}

testFunction()
```

위의 코드를 실행하면 다음과 같은 결과가 표시됩니다. 위 코드의 실행 결과를 통해 수수료 위임 밸류 전송 트랜잭션 결과를 확인할 수 있습니다.

```bash
$ node ./test.js
{ 
	blockHash: '0xb6a76163c4c558f50bdae77968a0f35dcfececf78b5cb780c3514a30a1c0a864',
	blockNumber: '0xede',
	contractAddress: null,
	feePayer: '0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
	feePayerSignatures: [
		{
			V: '0x4e44',
			R: '0x921b7c3be69db96ce14134b306c2ada423613cb66ecc6697ee8067983c268b6e',
			S: '0x7b86b255d1c781781315d85d7904226fb2101eb9498c4a03f3fbd30ba3ec5b79'
		}
	],
	from: '0xf5a9079f311f9ec55170af351627aff0c5d2e287',
	gas: '0xc350',
	...
	signatures: [
		{
			V: '0x4e43',
			R: '0xf4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cc',
			S: '0x35b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf0'
		}
	],
	status: '0x1',
	to: '0x176ff0344de49c04be577a3512b6991507647f72',
	transactionHash: '0x1878cc27b7f259a98d3248b41bffb6158640b4a07c503095deac1913fb3856c2',
	transactionIndex: 0,
	type: 'TxTypeFeeDelegatedValueTransfer',
	typeInt: 9,
	value: '0x5'
}
```

### 계정 업데이트 <a href="#account-update" id="account-update"></a>

클레이튼 계정의 개인키를 변경하려면 3가지 중요한 사항을 기억해야 합니다:

1. 클레이튼은 여러분이 보내는 모든 트랜잭션의 유효성을 검사합니다.
2. 유효성 검사에는 여러분의 개인키와 정확히 일치하는 공개키가 필요합니다.
3. 따라서 개인키를 새 키로 변경하려면 기존 공개키를 새 키로 변경하는 것이 **항상 전제**되어야 합니다. 새 공개 키는 새 개인 키에서 파생되어야 합니다.

위의 세 가지 사항을 염두에 두고 아래 단계에 따라 개인키를 변경할 수 있습니다:

1. 새 Keyring을 만들 새 개인키를 준비합니다.
2. 필요한 유형(SingleKeyring, MultipleKeyring 또는 RoleBasedKeyring)에 따라 Keyring을 만듭니다.
3. 새 Keyring에서 계정 인스턴스를 생성합니다. 이 계정 인스턴스는 클레이튼 계정의 새 공개키를 보관합니다.
4. 계정 인스턴스를 포함한 계정 업데이트 트랜잭션을 클레이튼에 전송합니다.
5. 마지막으로 기존 Keyring을 2단계에서 생성한 새 Keyring으로 교체합니다.

자세한 내용은 [AccountUpdate](../../../learn/transactions/transactions.md#fee-delegation)에서 확인하시기 바랍니다.

AccountKey를 변경하려면 `caver.transaction.accountUpdate`의 입력 인자 객체에서 `account` 필드에 [Account](api/caver-transaction/basic.md#accountupdate) 인스턴스를 제공해야 합니다. [Account](api/caver-transaction/basic.md#accountupdate) 인스턴스에는 업데이트할 클레이튼 계정의 주소와 계정키가 포함되어 있습니다.

아래 코드는 클레이튼 계정에 사용하는 개인키를 변경하는 예시 코드로, 클레이튼 계정의 AccountKey를 [AccountKeyPublic](../../../learn/accounts.md#accountkeypublic)으로 변경합니다. 새 개인키를 준비하는 것을 잊지 마세요.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	let sender = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	caver.wallet.add(sender)

	const newPrivateKey = caver.wallet.keyring.generateSingleKey()
	console.log(`new private key string: ${newPrivateKey}`)
	const newKeyring = caver.wallet.keyring.createWithSingleKey(sender.address, newPrivateKey)

	// create an Account instance
	const account = newKeyring.toAccount()

	const updateTx = caver.transaction.accountUpdate.create({
		from: sender.address,
		account: account,
		gas: 50000,
	})
	await caver.wallet.sign(sender.address, updateTx)
	const receipt = await caver.rpc.klay.sendRawTransaction(updateTx)
	console.log(receipt)

	// Update the keyring in caver.wallet for signing afterward.
	sender = caver.wallet.updateKeyring(newKeyring)
}

testFunction()
```

위 코드가 성공적으로 실행되면 더 이상 이전 Keyring으로 트랜잭션에 서명할 때 이전 개인키를 사용할 수 없습니다. 따라서 `caver.wallet.updateKeyring(newKeyring)`을 통해 기존 Keyring을 `newKeyring`으로 업데이트해야 합니다. 업데이트가 완료되면 새로 업데이트된 개인 키로 서명이 수행됩니다.

위 코드를 실행하면 다음과 같은 결과가 표시됩니다. 위 코드의 실행 결과에는 아래와 같이 새로 사용해야 하는 개인키와 계정 업데이트 결과가 출력됩니다.

```bash
$ node ./test.js
new private key string: 0x{private key}
{ 
	blockHash: '0x4c0221245e7c810cc19b05257e8d7cd34f24cc829f8787a832c08682640173f5',
	blockNumber: '0x26d6',
	contractAddress: null,
	from: '0xeec694a4143e05945823b216d0c62ab91c192a63',
	gas: '0xc350',
	gasPrice: '0x5d21dba00',
	gasUsed: 41000,
	key: '0x02a1024cc461670797071be16c34b22df1a3588653da5c1e9279b1d9e4b24fbcba07d8',
	...
	signatures: [
		{
			V: '0x4e43',
			R: '0xd0fa2d25711de4bfc3a7a6a660d307264fa3b2cacbb7eb71ab68f47661ebcfaf',
			S: '0x4652102241e61968988a22f9fa2d5d38d4e654d1f4b193fba5627c0856c9da7b'
		} 
	],
	status: '0x1',
	transactionHash: '0x4efdeeb1bb1e52ace11d64a19f564a973b36c29a0d85899a215621659b793665',
	transactionIndex: 0,
	type: 'TxTypeAccountUpdate',
	typeInt: 32
}
```

클레이튼 계정의 계정키를 여러 개의 [AccountKey]로 업데이트하는 방법은 어떻게 하나요? 아래 예시는 사용하고자 하는 여러 개의 개인키를 가진 [Account](api/caver-transaction/basic.md#accountupdate) 인스턴스를 생성하는 방법을 설명합니다 ([caver.account.create](api/caver.account.md)를 통해 여러 개의 공개키를 가진 [Account](api/caver-transaction/basic.md#accountupdate) 인스턴스를 생성할 수 있습니다). 생성한 계정 인스턴스를 트랜잭션 오브젝트 내부의 `account` 필드에 입력한 후 나머지 업데이트 과정은 위 예시와 동일합니다.

먼저, [AccountKeyWeightedMultiSig](api/caver.account.md#caver-account-create)로 업데이트할 계정 인스턴스를 만들어 보겠습니다. [AccountKeyWeightedMultiSig](api/caver.account.md#caver-account-create)의 경우 각 키에 대한 임계값과 가중치를 정의해야 합니다. 이렇게 하려면 [caver.account.weightedMultiSigOptions](api/caver.contract.md)을 사용합니다. 첫 번째 매개변수는 임계값이고, 두 번째 매개변수는 각 키의 가중치를 포함하는 배열입니다.

```javascript
// Create an account instance with three private keys using AccountKeyWeightedMultiSig
const newPrivateKeys = caver.wallet.keyring.generateMultipleKeys(3)
const newKeyring = caver.wallet.keyring.createWithMultipleKey(sender.address, newPrivateKeys)

// threshold = 3, the weights of the three keys = [1, 2, 1]
const options = new caver.account.weightedMultiSigOptions(3, [1, 2, 1])

const account = newKeyring.toAccount(options)
```

이제 [AccountKeyRoleBased](api/caver.account.md#weightedmultisigoptions)를 사용하여 AccountKey를 업데이트해 보겠습니다. [AccountKeyRoleBased](../../../learn/accounts.md#accountkeyrolebased)는 각 [role](../../../learn/accounts.md#accountkeyrolebased)에 사용할 키를 정의하는 `AccountKey` 타입입니다.

```javascript
// Create an account instance with roles using AccountKeyRoleBased. In the account instance created, each role has a public key that corresponds to one private key.
const newPrivateKeys = caver.wallet.keyring.generateRoleBasedKeys([1, 1, 1])
const newKeyring = caver.wallet.keyring.createWithRoleBasedKey(sender.address, newPrivateKeys)

const account = newKeyring.toAccount()
```

위의 AccountKeyRoleBased는 각 역할에 대해 하나의 공개 키를 사용하는 예시입니다. 위 코드에서 볼 수 있듯이 각 공개 키는 하나의 개인 키에 해당합니다. 각 역할마다 여러 개의 개인키를 사용하려면 아래와 같이 각 역할에 대해 [caver.account.weightedMultisigOptions](api/caver.contract.md)을 정의해야 합니다.

```javascript
// Create an account instance with [3, 2, 3] keys for each role using AccountKeyRoleBased
const newPrivateKeys = caver.wallet.keyring.generateRoleBasedKeys([3, 2, 3])
const newKeyring = caver.wallet.keyring.createWithRoleBasedKey(sender.address, newPrivateKeys)

const options = [
	// thresold = 4, weights of keys = [2, 2, 4] for roleTransactionKey
	new caver.account.weightedMultiSigOptions(4, [2, 2, 4]),
	// threshold = 2, weights of keys = [1, 1]
	new caver.account.weightedMultiSigOptions(2, [1, 1]),
	// threshold = 3, weights of keys = [1, 1, 1]
	new caver.account.weightedMultiSigOptions(3, [1, 1, 1]),
]

const account = newKeyring.toAccount(options)
```

AccountKey를 [AccountKeyLegacy](api/caver.account.md#weightedmultisigoptions) 또는 [accountKeyFail](../../../learn/accounts.md#accountkeylegacy)로 업데이트하려면 아래와 같이 계정 인스턴스를 생성하고 트랜잭션의 `account` 필드에 할당합니다.

```javascript
// Create an account with AccountKeyLegacy
const accountWithLegacyKey = caver.account.createWithAccountKeyLegacy(keyringToUpdate.address)

// Create an account with AccountKeyFail
const accountWithFailKey = caver.account.createWithAccountKeyFail(keyringToUpdate.address)
```

### 스마트 컨트랙트 <a href="#smart-contract" id="smart-contract"></a>

[caver.contract](../../../learn/accounts.md#accountkeyfail) 패키지는 클레이튼에서 스마트 컨트랙트와 쉽게 상호작용할 수 있게 해줍니다. 이 패키지는 스마트 컨트랙트의 로우레벨 ABI(애플리케이션 바이너리 인터페이스)가 주어지면 스마트 컨트랙트의 모든 메서드를 JavaScript 호출로 자동 변환합니다. 이를 통해 스마트 컨트랙트를 마치 JavaScript 객체처럼 상호작용할 수 있습니다.

먼저 아래와 같은 간단한 Solidity 예제를 만듭니다. 'test.sol' 파일을 생성하고 아래 예제를 작성합니다.

```
pragma solidity ^0.5.6;

contract KVstore {
    mapping(string=>string) store;
    function get(string memory key) public view returns (string memory) {
        return store[key];
    }
    function set(string memory key, string memory value) public {
        store[key] = value;
    }
}
```

이제 스마트 컨트랙트를 컴파일하여 바이트코드와 ABI를 가져올 수 있습니다.

```
> solc --abi --bin ./test.sol
======= ./test.sol:KVstore =======
Binary: 
608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029
Contract JSON ABI 
[{"constant":true,"inputs":[{"name":"key","type":"string"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```

**참고**: 스마트 컨트랙트를 컴파일하려면 [Solidity 컴파일러](https://solidity.readthedocs.io/en/develop/installing-solidity.html)가 설치되어 있어야 합니다.

스마트 컨트랙트 배포는 [caver.contract](../../../learn/accounts.md#accountkeyfail)를 사용하여 배포하거나, [caver.transaction.smartContractDeploy](api/caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio), [caver.transaction.feeDelegatedSmartContractDeploy](api/caver-transaction/basic.md#smartcontractdeploy) 또는 [caver.transaction.feeDelegatedSmartContractDeployWithRatio](api/caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) 트랜잭션을 사용하여 배포할 수 있습니다. 다음은 [caver.contract](../../../learn/accounts.md#accountkeyfail) 사용 예시입니다.

스마트 컨트랙트를 컴파일한 결과를 사용하여 아래와 같이 컨트랙트 인스턴스를 생성할 수 있습니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]

	const contractInstance = caver.contract.create(abi)
	console.log(contractInstance)
	console.log(contractInstance.options.address)
}

testFunction()
```

위 코드를 실행하면 다음과 같은 결과가 표시됩니다.

```bash
$ node ./test.js
Contract {
	...
  methods: {
		get: [Function: bound _createTxObject],
		'0x693ec85e': [Function: bound _createTxObject],
		'get(string)': [Function: bound _createTxObject],
		set: [Function: bound _createTxObject],
		'0xe942b516': [Function: bound _createTxObject],
		'set(string,string)': [Function: bound _createTxObject]
	},
  events: { allEvents: [Function: bound ] },
  _address: null,
  _jsonInterface: [ ... ],
  _keyrings: KeyringContainer { ... }
}
null
```

위의 출력을 보면, 메서드가 Contract 인스턴스 내부의 abi를 통해 관리되는 것을 확인할 수 있습니다. 그리고 아직 배포되지 않았기 때문에 `contractInstance.options.address`의 결과가 null로 출력되는 것을 볼 수 있습니다.

스마트 컨트랙트가 이미 배포되었고 스마트 컨트랙트가 배포된 컨트랙트 주소를 알고 있는 경우, 아래와 같이 두 번째 파라미터에 컨트랙트 주소를 전달해 주세요.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]
	
	const contractInstance = caver.contract.create(abi, '0x3466D49256b0982E1f240b64e097FF04f99Ed4b9')

	console.log(contractInstance)
	console.log(contractInstance.options.address)
}

testFunction()
```

위의 코드를 실행하면 다음과 같은 결과가 표시됩니다.

```bash
$ node ./test.js
Contract {
	...
  methods: {
		get: [Function: bound _createTxObject],
		'0x693ec85e': [Function: bound _createTxObject],
		'get(string)': [Function: bound _createTxObject],
		set: [Function: bound _createTxObject],
		'0xe942b516': [Function: bound _createTxObject],
		'set(string,string)': [Function: bound _createTxObject]
	},
  events: { allEvents: [Function: bound ] },
  _address: '0x3466D49256b0982E1f240b64e097FF04f99Ed4b9',
  _jsonInterface: [ ... ],
  _keyrings: KeyringContainer { ... }
}
0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

이 컨트랙트 인스턴스는 스마트 컨트랙트의 주소를 받았기 때문에, 컨트랙트 주소를 `contractInstance.options.address`에 저장합니다.

컨트랙트 인스턴스가 생성되면 아래와 같이 `data` 필드에 바이트코드를 전달하여 배포할 수 있습니다.

[caver.contract](../../../learn/accounts.md#accountkeyfail)는 배포 및 실행을 위해 트랜잭션을 전송합니다. 트랜잭션 서명을 위해 `caver.wallet`의 Keyring을 사용합니다. 사용할 Keyring은 `caver.wallet`에 미리 추가해야 합니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const deployer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	caver.wallet.add(deployer)
	
	const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]

    const byteCode =
        '608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029'

	const contractInstance = caver.contract.create(abi)
	
	const deployedInstance = await contractInstance.deploy({
		from: deployer.address,
		gas: 1500000,
	}, byteCode)

	console.log(deployedInstance)
	console.log(deployedInstance.options.address)
}

testFunction()
```

위 코드에서 `deployer`는 컨트랙트를 클레이튼에 배포하고 배포된 컨트랙트 인스턴스를 반환합니다.

```bash
$ node ./test.js
Contract {
	...
  methods: {
		get: [Function: bound _createTxObject],
		'0x693ec85e': [Function: bound _createTxObject],
		'get(string)': [Function: bound _createTxObject],
		set: [Function: bound _createTxObject],
		'0xe942b516': [Function: bound _createTxObject],
		'set(string,string)': [Function: bound _createTxObject]
	},
  events: { allEvents: [Function: bound ] },
  _address: '0x3466D49256b0982E1f240b64e097FF04f99Ed4b9',
  _jsonInterface: [ ... ],
  _keyrings: KeyringContainer { ... }
}
0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

수수료 위임 트랜잭션을 통해 스마트 컨트랙트를 배포하려면 아래 예시와 같이 `feeDelegation`과 `feePayer`를 정의합니다:

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function deployWithFeeDelegation() {
    const deployer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(deployer)

    const feePayer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(feePayer)

    const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]

    const byteCode =
        '608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029'

	const contractInstance = caver.contract.create(abi)

	const deployedInstance = await contractInstance.deploy({
		from: deployer.address,
		feeDelegation: true,
		feePayer: feePayer.address,
		gas: 1500000,
	}, byteCode)
	
	console.log(deployedInstance)
	console.log(deployedInstance.options.address)
}
```

`caver.contract`를 통해 스마트 컨트랙트를 배포할 때 발신자와 수수료 납부자가 별도로 서명한 트랜잭션을 전송하려면 아래 코드를 참고하세요:

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function deployWithFeeDelegation() {
    const deployer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(deployer)

    const feePayer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(feePayer)

    const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]

    const byteCode =
        '608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029'

	const contractInstance = caver.contract.create(abi)

	const signed = await contractInstance.sign({
		from: deployer.address,
		feeDelegation: true,
		gas: 1500000,
	}, 'constructor', byteCode)
	
	await caver.wallet.signAsFeePayer(feePayer.address, signed)

	const receipt = await caver.rpc.klay.sendRawTransaction(signed)

	const deployed = caver.contract.create(abi, receipt.contractAddress)
}
```

스마트 컨트랙트는 트랜잭션을 실행하는 컨트랙트 유형에 따라 다음 중 하나를 사용하여 실행할 수 있습니다: `caver.contract`의 `Contract` 클래스 또는 [caver.transaction.smartContractExecution](api/caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio), [caver.transaction.feeDelegatedSmartContractExecution](api/caver-transaction/basic.md#smartcontractexecution), 또는 [caver.transaction.feeDelegatedSmartContractExecutionWithRatio](api/caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution) 중 하나입니다. 스마트 컨트랙트 실행을 위한 트랜잭션을 전송합니다:

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const keyring = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	caver.wallet.add(keyring)

	const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]
	
	const contractInstance = caver.contract.create(abi, '0x{address in hex}')
	const receipt = await contractInstance.send({ from: keyring.address, gas: '0x4bfd200' }, 'set', 'testKey', 'testValue')
	console.log(receipt)
}

testFunction()
```

위 코드를 실행하면 `set`을 실행한 트랜잭션 결과가 아래와 같이 도착합니다.

```bash
$ node ./test.js
{ 
	blockHash: '0x610336d43644abc5ab71156f7334ff67deabdd8de27778faa9dec99d225927e6',
  blockNumber: 4724,
  contractAddress: null,
  from: '0xbbfa9e3f76ddafedc28197e0f893366dd3c5c74a',
  gas: '0x4bfd200',
  gasPrice: '0x5d21dba00',
  gasUsed: 62351,
  input: '0xe942b...',
  ...
  status: true,
  to: '0x3466d49256b0982e1f240b64e097ff04f99ed4b9',
  transactionHash: '0x3a354703ab4a7b32492edab454b446dd3e92eec81ecbdaf2c3d84ffdd5cf9948',
  transactionIndex: 0,
  type: 'TxTypeSmartContractExecution',
  typeInt: 48,
  value: '0x0',
  events: {}
}
```

수수료 위임 트랜잭션을 통해 스마트 컨트랙트를 실행하려면 아래 예시와 같이 `feeDelegation`과 `feePayer`를 정의합니다:

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function executionWithFeeDelegation() {
    const executor = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(executor)

    const feePayer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(feePayer)

    const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]

    // Pass contract address as a second parameter
    const contractInstance = caver.contract.create(abi, '0x{address in hex}')

	const receipt = await contractInstance.send({
        from: executor.address,
		gas: 1000000,
		feeDelegation: true,
		feePayer: feePayer.address,
	}, 'set', 'testKey', 'testValue')
    console.log(receipt)
}
```

`caver.contract`을 통해 스마트 컨트랙트를 실행할 때 발신자와 수수료 납부자가 별도로 서명된 트랜잭션을 전송하려면 아래 코드를 참고하세요:

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function deployWithFeeDelegation() {
    const deployer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(deployer)

    const feePayer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(feePayer)

    const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]

	const contractInstance = caver.contract.create(abi)

	const signed = await contractInstance.sign({
		from: deployer.address,
		feeDelegation: true,
		gas: 1500000,
	}, 'set', 'testKey', 'testValue')
	
	await caver.wallet.signAsFeePayer(feePayer.address, signed)

	const receipt = await caver.rpc.klay.sendRawTransaction(signed)
    console.log(receipt)
}
```

컨트랙트 인스턴스를 로드하고 해당 함수 중 하나를 호출합니다:

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]
	const contractInstance = caver.contract.create(abi, '0x{smart contract address}')

	const value = await contractInstance.call('get', 'testKey')
	console.log(value)
}

testFunction()
```

위 코드를 실행하면 아래와 같이 값이 출력됩니다.

```bash
$ node ./test.js
testValue
```

자세한 내용은 [caver.contract](../../../learn/accounts.md#accountkeyfail)를 참조하세요.

## 서명자가 여러 명인 트랜잭션 보내기<a id="sending-a-transaction-with-multiple-signer"></a>

클레이튼 계정의 계정키가 AccountKeyMultiSig 또는 AccountKeyRoleBased인 경우, 각 키를 관리하는 사람은 다를 수 있습니다.

이 섹션에서는 서명자가 여러 명인 경우 서명을 수집하고 트랜잭션을 전송하는 방법을 설명합니다.

이 예제를 실행하기 위해서는 테스트에 사용하는 클레이튼 계정의 AccountKey를 [AccountKeyWeightedMultisig](api/caver.account.md#caver-account-create)로 업데이트해야 합니다. 클레이튼 계정을 업데이트하는 방법은 [AccountUpdate](../../../learn/accounts.md#accountkeyweightedmultisig)를 참고하세요.

### 순차적으로 서명하기 <a href="#signing-sequentially" id="signing-sequentially"></a>

`caver.wallet` 또는 트랜잭션의 `sign` 함수를 사용하여 트랜잭션에 서명하면 트랜잭션 내부에 서명(또는 수수료 지불자 서명)이 정의(또는 추가)됩니다. 서명된 트랜잭션 인스턴스의 `transaction.getRLPEncoding()` 함수를 호출하면 서명(및 feePayerSignatures)이 포함된 RLP 인코딩된 문자열(`rawTransaction`)을 얻을 수 있습니다.

다음 예시는 여러 개인키를 사용하여 트랜잭션에 순차적으로 서명하는 방법을 보여줍니다. 트랜잭션을 전송하는 계정의 AccountKey가 두 개의 공개키를 가진 AccountKeyWeightedMultiSig라고 가정하면, 이 클레이튼 계정은 각 사용자마다 하나의 개인키 문자열 두 개를 사용할 수 있습니다. 두 명의 사용자가 동일한 클레이튼 계정을 공유하는 경우입니다.

아래 예시에서는 사용자1과 사용자2가 사용할 `Keyring` 인스턴스를 생성합니다. 그런 다음 각각 고유한 Keyring을 사용하여 트랜잭션에 서명합니다. 아래 예시에서는 `transaction.sign`을 사용하여 서명합니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const user1 = caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key1}')
	const user2 = caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key2}')

	const transaction = caver.transaction.valueTransfer.create({
		from: user1.address,
		to: '0x45c2a1e3a1c3957a06dae73ad516461c2d2c7ccc',
		value: 1,
		gas: 70000,
	})

	await transaction.sign(user1)
	console.log(transaction.signatures)

	await transaction.sign(user2)
	console.log(transaction.signatures)
}

testFunction()
```

위 코드를 실행하면 다음과 같은 결과가 표시됩니다. 위 코드의 실행 결과를 살펴보면, 사용자1이 서명하면 하나의 서명이 생성됩니다. 사용자2가 서명하면 사용자2의 서명이 추가됩니다. [SignatureData](#account-update)는 서명을 저장하는 객체입니다.

```bash
$ node ./test.js
[ 
	SignatureData { _v: '0x4e43', _r: '0x3f3d3...', _s: '0x24f94...' }
]
[ 
	SignatureData { _v: '0x4e43', _r: '0x3f3d3...', _s: '0x24f94...' },
	SignatureData { _v: '0x4e44', _r: '0xd6a94...', _s: '0x72dc8...' }
]
```

그럼 동일한 트랜잭션 객체를 공유하지 않고 순차적으로 서명하는 방법을 살펴보겠습니다. 아래 예시에서는 사용자1이 서명된 트랜잭션의 getRLPEncoding 함수의 결과인 RLP 인코딩된 문자열을 사용자2에게 전달합니다.

아래 코드는 RLP 인코딩된 문자열로 서명하고 서명을 추가하는 방법을 설명합니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	// Create user1's keyring
	const user1 = caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key1}')
	
	// Create a value transfer transaction
	const transaction = caver.transaction.valueTransfer.create({
		from: user1.address,
		to: '0x45c2a1e3a1c3957a06dae73ad516461c2d2c7ccc',
		value: 1,
		gas: 70000,
	})
	
	// Sign the transaction
	await transaction.sign(user1)

	// Create user2's keyring
	const user2 = caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key2}')

	// Create a value transfer transaction from the RLP-encoded string
	const rlpEncoding = transaction.getRLPEncoding()
	const transactionFromRLP = caver.transaction.valueTransfer.create(rlpEncoding)

	await transactionFromRLP.sign(user2)
	console.log(transactionFromRLP.signatures)
}

testFunction()
```

위의 코드를 실행하면 다음과 같은 결과가 표시됩니다.

```bash
$ node ./test.js
[ 
	SignatureData { _v: '0x4e43', _r: '0x3f3d3...', _s: '0x24f94...' },
	SignatureData { _v: '0x4e44', _r: '0xd6a94...', _s: '0x72dc8...' }
]
```

위 코드를 실행하면 `transactionFromRLP.signatures`에 user2의 서명이 추가되어 총 2개의 서명이 포함되어 있는 것을 확인할 수 있습니다.

모든 사용자가 서명하면 `await caver.rpc.klay.sendRawTransaction(transactionFromRLP)`을 통해 네트워크에 트랜잭션을 전송합니다.

수수료 위임 트랜잭션을 전송하고 수수료 납부자가 여러 키를 사용하는 경우, `caver.wallet.signAsFeePayer`를 사용하여 위의 로직을 진행할 수 있습니다.

### 서명된 Raw 트랜잭션 결합하기 <a href="#combining-signed-rawtransactions" id="combining-signed-rawtransactions"></a>

여러 사람으로부터 여러 개의 서명된 RLP 인코딩된 Raw 트랜잭션 문자열을 받는 경우, 모든 서명이 포함된 단일 RLP 인코딩된 Raw 트랜잭션 문자열로 결합할 수 있습니다.

아래 예시는 RLP 인코딩된 트랜잭션을 결합하여 전송하는 방법을 보여줍니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const vt = caver.transaction.valueTransfer.create({
		from: '0x0fa355263f37f5a54d9179452baa8b63b8b2cdde',
		to: '0x45c2a1e3a1c3957a06dae73ad516461c2d2c7ccc',
		value: 1,
		gas: 70000,
	})
	const rlpEncodedStrings = [
		'0x08f87f018505d21dba00830111709445c2a1e3a1c3957a06dae73ad516461c2d2c7ccc01940fa355263f37f5a54d9179452baa8b63b8b2cddef847f845824e44a01aa72b883ca540c8a63de244cd061ec4f9efb139541e8db304c07ec27bc9d272a06a4ca54f6269f2ddfe3648eb9ed57b0c5739f0077e1a38449f3ae3cc0b20dc3e',
		'0x08f8c6018505d21dba00830111709445c2a1e3a1c3957a06dae73ad516461c2d2c7ccc01940fa355263f37f5a54d9179452baa8b63b8b2cddef88ef845824e44a01aa72b883ca540c8a63de244cd061ec4f9efb139541e8db304c07ec27bc9d272a06a4ca54f6269f2ddfe3648eb9ed57b0c5739f0077e1a38449f3ae3cc0b20dc3ef845824e43a0fd76dfc53c812ec6aa860076f731e3913936088a1518cc34f2d176bcbe0ac772a071491c938458fffe106dde485fc8b26cbebe8a517c46bd185b126930f480d773',
		'0x08f8c6018505d21dba00830111709445c2a1e3a1c3957a06dae73ad516461c2d2c7ccc01940fa355263f37f5a54d9179452baa8b63b8b2cddef88ef845824e44a01aa72b883ca540c8a63de244cd061ec4f9efb139541e8db304c07ec27bc9d272a06a4ca54f6269f2ddfe3648eb9ed57b0c5739f0077e1a38449f3ae3cc0b20dc3ef845824e43a021e84a4740b374cdcf0cc38f93225f6d2f77388a9d90302d47b4f3ed84e4db5fa072ff5e77d2506d5222081c4d2a341c6ee5d258500030564f985951472f247b7d',
	]
	const combined = vt.combineSignedRawTransactions(rlpEncodedStrings)
	console.log(combined)
}

testFunction()
```

위 코드를 실행하면 다음과 같은 결과가 표시됩니다.

```bash
$ node ./test.js
0x08f9010d808505d21dba00830111709445c2a1e3a1c3957a06dae73ad516461c2d2c7ccc01940fa355263f37f5a54d9179452baa8b63b8b2cddef8d5f8458207f5a094ce13c39d25d44ad1d07ba2fd89f476c4dc6eef6071a2ef1f496f9b04d049e5a00f7abddd548998b0a55e53600a48286c38262fffc6c153a64e8f65a77c11c722f8458207f6a0ceeea7287b2670719d8ac15cf3b21b36fcaf74d58cce99935ce17e100064037aa0499067788d5db5e7c09ed7bfe19764d66684abc06b81e8f54ea254377bc81066f8458207f5a05c3ba89336c7d84d4ce08104cfd6f7ef33cd9f29766a1955baae8bcf964fd50fa015accbbce6bb11847a3b0660491775d64ef6d692ea709b768f64f12968c09240
```

위의 코드를 실행하면 모든 서명 정보가 결합된 하나의 RLP 인코딩된 Raw 트랜잭션 문자열이 출력됩니다.

`combineSignedRawTransactions`를 실행할 때 결합할 서명된 RLP 인코딩된 Raw 트랜잭션 문자열은 트랜잭션 인스턴스의 서명과 선택적 변수를 제외하고 서로 정확히 동일해야 합니다. 기본 트랜잭션 인스턴스에 지정된 값이 없는 선택적 변수(`combineSignedRawTransactions`의 호출자)는 바로 다음에 병합할 Raw 트랜잭션 문자열에서 해당 변수로 교환됩니다. 병합할 Raw 트랜잭션 문자열의 선택적 변수 값을 포함하여 모든 Raw 트랜잭션 문자열에 불일치가 있는 경우 오류가 발생합니다.

결합 서명된 Raw 트랜잭션은 결과적으로 모든 서명(트랜잭션이 수수료 위임 트랜잭션인 경우 수수료 납부자 서명)을 포함하는 RLP 인코딩된 문자열을 반환합니다. 이 문자열을 사용하여 `await caver.rpc.klay.sendRawTransaction(combined)`을 통해 트랜잭션을 네트워크에 전송합니다.

## KCT 인터페이스 구현 감지하기 <a href="#detecting-implementation-of-kct-interfaces" id="detecting-implementation-of-kct-interfaces"></a>

`caver.kct`는 주어진 KCT 토큰 컨트랙트가 어떤 인터페이스를 구현하는지에 대한 정보를 반환하는 함수를 제공합니다. 이 함수를 사용하면 클레이튼에 배포된 KCT 토큰 컨트랙트가 어떤 인터페이스를 구현하는지 확인할 수 있습니다.

### KIP-7 인터페이스 감지하기 <a href="#detecting-kip-7-interfaces" id="detecting-kip-7-interfaces"></a>

KIP-7 토큰 컨트랙트가 구현한 인터페이스를 감지하려면 `caver.kct.kip7.detectInterface(contractAddress)` 또는 `kip7.detectInterface()`를 사용하면 됩니다.

아래는 `caver.kct.kip7`에 제공된 정적 메서드를 사용하여 Klaytn에 배포된 KIP-7 토큰 컨트랙트의 구현된 인터페이스를 감지하는 방법에 대한 코드입니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const result = await caver.kct.kip7.detectInterface('0x{address in hex}')
	console.log(result)
}

testFunction()
```

위 코드를 실행하면 다음과 같은 결과가 나타납니다.

```bash
$ node ./test.js
{
    IKIP7: true,
    IKIP7Metadata: true,
    IKIP7Mintable: true,
    IKIP7Burnable: true,
    IKIP7Pausable: true,
}
```

아래는 클레이튼에 배포된 KIP7 토큰 컨트랙트의 구현된 인터페이스를 KIP7의 멤버 메서드를 사용하여 감지하는 코드입니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const kip7 = new caver.kct.kip7('0x{address in hex}')
	const result = await kip7.detectInterface()
	console.log(result)
}

testFunction()
```

위 코드를 실행하면 다음과 같은 결과가 표시됩니다.

```bash
$ node ./test.js
{
    IKIP7: true,
    IKIP7Metadata: true,
    IKIP7Mintable: true,
    IKIP7Burnable: true,
    IKIP7Pausable: true,
}
```

### KIP-17 인터페이스 감지하기 <a href="#detecting-kip-17-interfaces" id="detecting-kip-17-interfaces"></a>

KIP-17 토큰 컨트랙트가 구현한 인터페이스를 감지하려면 `caver.kct.kip17.detectInterface(contractAddress)` 또는 `kip17.detectInterface()`를 사용하면 됩니다.

아래는 `caver.kct.kip17`에 제공된 정적 메서드를 사용하여 Klaytn에 배포된 KIP-17 토큰 컨트랙트의 구현된 인터페이스를 감지하는 방법에 대한 코드입니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const result = await caver.kct.kip17.detectInterface('0x{address in hex}')
	console.log(result)
}

testFunction()
```

위 코드를 실행하면 다음과 같은 결과를 확인할 수 있습니다.

```bash
$ node ./test.js
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

아래는 클레이튼에 배포된 KIP17 토큰 컨트랙트의 구현된 인터페이스를 KIP17의 멤버 메서드를 사용하여 감지하는 방법에 대한 코드입니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const kip17 = new caver.kct.kip17('0x{address in hex}')
	const result = await kip17.detectInterface()
	console.log(result)
}

testFunction()
```

위의 코드를 실행하면 다음과 같은 결과가 표시됩니다.

```bash
$ node ./test.js
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

### KIP-37 인터페이스 감지하기 <a href="#detect-kip-37-interfaces" id="detect-kip-37-interfaces"></a>

KIP-37 토큰 컨트랙트가 구현한 인터페이스를 감지하려면 `caver.kct.kip37.detectInterface(contractAddress)` 또는 `kip37.detectInterface()`를 사용하면 됩니다.

아래는 `caver.kct.kip37`에 제공된 정적 메서드를 사용하여 Klaytn에 배포된 KIP-37 토큰 컨트랙트의 구현된 인터페이스를 감지하는 방법에 대한 코드입니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const result = await caver.kct.kip37.detectInterface('0x{address in hex}')
	console.log(result)
}

testFunction()
```

위 코드를 실행하면 다음과 같은 결과를 얻을 수 있습니다.

```bash
$ node ./test.js
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}
```

아래는 클레이튼에 배포된 KIP37 토큰 컨트랙트의 구현된 인터페이스를 KIP37의 멤버 메서드를 사용하여 감지하는 코드입니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const kip37 = new caver.kct.kip37('0x{address in hex}')
	const result = await kip37.detectInterface()
	console.log(result)
}

testFunction()
```

위 코드를 실행하면 다음과 같은 결과가 표시됩니다.

```bash
$ node ./test.js
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}
```

## 샘플 프로젝트 <a href="#sample-projects" id="sample-projects"></a>

caver-js를 사용한 dApp(블록체인 애플리케이션) 개발 샘플 프로젝트는 다음과 같습니다:

- [Count dApp](api/caver-wallet/keyring.md#signaturedata)
- [Klaystagram](../../../build/tutorials/count-dapp/count-dapp.md)

## 문제 해결 <a href="#troubleshooting" id="troubleshooting"></a>

- 웹 브라우저에서 caver-js를 사용하여 빌드하는 동안 **Error: Can't resolve 'fs'** 라는 오류가 발생합니다.

  - 다음 웹팩 구성을 추가합니다.

  ```
  module.exports = {
   	...
   	node: {
   		fs: 'empty',
   	},
   	...
   }
  ```

  Next.js 웹 프레임워크를 사용하는 경우 다음과 같이 **next.config.json** 파일에 웹팩 구성을 추가할 수 있습니다:

  ```
  module.exports = {
   	webpack: (config, { isServer }) => {
   		if (!isServer) {
   			config.node = {
   				fs: 'empty'
   			}
   		}
   		return config
   	}
   }
  ```

## 링크 <a href="#links" id="links"></a>

- caver-js [GitHub 리포지토리](../../../build/tutorials/klaystagram/klaystagram.md)
- caver-js [npm](https://github.com/klaytn/caver-js)
