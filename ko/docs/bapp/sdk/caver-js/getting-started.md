# 시작하기 <a id="getting-started"></a>

이 문서는 caver-js 1.5.0 또는 상위 버전을 사용하는 개발자를 위해 작성되었습니다. 하위 버전을 사용 중이라면 [Getting Started (~v1.4.1)](v1.4.1/getting-started_1.4.1.md)를 확인하십시오.

## 준비 사항 <a id="prerequisites"></a>

### 의존성 <a id="dependencies"></a>

caver-js 라이브러리를 사용하려면 다음 패키지가 필요합니다.

* [Node.js](https://nodejs.org/en/download/)
* [npm](https://www.npmjs.com/get-npm)
* [gcc-c++](https://gcc.gnu.org/)
* [Solidity compiler](https://solidity.readthedocs.io/en/develop/installing-solidity.html)

**참고** caver-js는 Node.js 버전 12와 14에서 실행 가능합니다. 권장되는 버전은 다음과 같습니다.
- lts/erbium ([12.21.0](https://nodejs.org/dist/latest-v12.x/))
- lts/fermium ([14.16.0](https://nodejs.org/dist/latest-v14.x/))

다른 버전의 Node\(가령 Node v15\)를 사용 중인 경우, Node Version Manager\([NVM](https://github.com/nvm-sh/nvm)\)를 사용해 caver-js가 지원하는 버전을 설치하고 사용합니다.

### 설치 <a id="installation"></a>

다음 명령을 사용해 npm으로 caver-js를 설치하세요:

```text
$ npm install caver-js
```

**참고**: `package.json` 파일이 설치 경로와 동일한 곳에 존재해야 합니다. 만일 존재하지 않으면, `npm init`을 통해 `package.json`가 생성될 수 있습니다.

caver-js의 특정 버전을 설치하려면 다음 명령을 이용하세요:

```text
$ npm install caver-js@X.X.X
```

## 빠른 시작: KLAY 전송하기<a id="sending-klay-at-a-glance"></a>

이 장은 `keystore file`을 사용해 KLAY를 전송하는 간단한 KLAY 전송 트랜잭션 예시를 설명합니다. 키스토어 파일은 [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay)에 생성될 수 있습니다. 테스트를 위해 KLAY가 필요한 경우 [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay)에서 Baobab testnet KLAY를 얻을 수 있습니다.

```javascript
const fs = require('fs')
const Caver = require('./index')
const caver = new Caver('https://your.en.url:8651/')

async function testFunction() {
    // Read keystore json file
    const keystore = fs.readFileSync('./keystore.json', 'utf8')

    // Decrypt keystore
    const keyring = caver.wallet.keyring.decrypt(keystore, 'password')
    console.log(keyring)

    // Add to caver.wallet
    caver.wallet.add(keyring)

    // Create value transfer transaction
    const vt = caver.transaction.valueTransfer.create({
        from: keyring.address,
        to: '0x8084fed6b1847448c24692470fc3b2ed87f9eb47',
        value: caver.utils.toPeb(1, 'KLAY'),
        gas: 25000,
    })

    // Sign to the transaction
    const signed = await caver.wallet.sign(keyring.address, vt)

    // Send transaction to the Klaytn blockchain platform (Klaytn)
    const receipt = await caver.rpc.klay.sendRawTransaction(signed)
    console.log(receipt)
}

testFunction()
```

## caver-js 시작하기<a id="starting-with-caver-js"></a>

caver-js 설치가 끝나면 이제 caver-js를 사용해 Klaytn 노드에 접속할 수 있습니다.

예제를 실습하려면, 먼저 아래처럼 작업 디렉토리에 테스트 파일을 생성하세요.

```bash
$ touch test.js
```
작업 디렉토리에 생성된 `test.js` 파일을 확인할 수 있을 것입니다.

test.js에 다음 코드를 작성하세요.
```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

async function testFunction() {
    const version = await caver.rpc.klay.getClientVersion()
    console.log(version)
}

testFunction()
```

위 코드를 실행하면 아래 결과를 얻습니다.

```bash
$ node ./test.js
Klaytn/v1.4.0/linux-amd64/go1.14.1
```

위와 같이 console.log 출력을 확인했다면, 아래 단계로 진행하세요. 접속한 Klaytn 노드 버전에 따라 버전 넘버가 다를 수 있습니다.

### Klaytn 노드에 접속하기<a id="connecting-to-a-klaytn-node"></a>

아래 예시와 같이 caver-js 모듈을 가져와 Baobab 테스트넷의 Klaytn 노드에 연결할 수 있습니다:

```javascript
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')
```

EN을 실행 중인 경우, 아래와 같이 호스트와 포트를 변경하여 자신의 노드에 연결할 수 있습니다:

```javascript
const Caver = require('caver-js')
const caver = new Caver('http://localhost:8551/')
```

## Keyring 관리 <a id="managing-keyrings"></a>

[Keyring][] is a structure that contains the address of the Klaytn account and the private key(s).

[Keyring][] can be classified into three types depending on the type of key being stored: [SingleKeyring][] to store one address and one private key, [MultipleKeyring][] to store one address and multiple private keys, and [RoleBasedKeyring][] to store one address and one or more private keys for each role.

[SingleKeyring][] defines `key` property inside, and this `key` store one private key.

[MultipleKeyring][] defines `keys` property inside, and this `keys` is implemented as an array to store multiple private keys.

The `keys` property defined in [RoleBasedKeyring][] is implemented as a two-dimensional array (empty `keys` will look like `[ [], [], [] ]`) that can include multiple keys for each [role][]. The first element of the array is filled with the private key(s) to be used for `roleTransactionKey`, the second element the private key(s) to be used for `roleAccountUpdateKey`, and the third element the private key(s) to be used for `roleFeePayerKey`.

### Keyring 생성<a id="creating-a-keyring"></a>

#### SingleKeyring 생성 <a id="generating-a-singlekeyring"></a>

아래와 같이 임의의 값을 사용해 SingleKeyring을 생성할 수 있습니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

async function testFunction() {
    const keyring = caver.wallet.keyring.generate()
    console.log(keyring)
}

testFunction()
```

위 코드를 실행하면 아래 결과를 얻습니다.

```bash
$ node ./test.js
SingleKeyring {
    _address: '0x3d263c3c0df60c5516f932d244531742f45eed5c',
    _key: PrivateKey { _privateKey: '0x{private key}' }
}
```

실행 결과는 아래와 같습니다. 인스턴스 멤버 변수들은 `keyring.address`와 `keyring.key`로 접근 가능합니다.

#### 개인키로 SingleKeyring 생성하기 <a id="creating-a-singlekeyring-from-private-key"></a>

개인키가 있다면, 이 개인키를 사용해 Keyring을 만들 수 있습니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

async function testFunction() {
    // Create a keyring from a private key
    const keyringFromPrivateKey = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    console.log(keyringFromPrivateKey)
}

testFunction()
```

위 코드를 실행하면 아래 결과를 얻습니다.

```bash
$ node ./test.js
SingleKeyring {
    _address: '0xf5a9079f311f9ec55170af351627aff0c5d2e287',
    _key: PrivateKey { _privateKey: '0x{private key}' } 
}
```

The result of `caver.wallet.keyring.createFromPrivateKey`, like the result of `caver.wallet.keyring.generate` above, is a [SingleKeyring][] instance with an address defined inside it and a [PrivateKey] instance in `keyring.key`.

#### 개인키와 계정 주소로 SingleKeyring 생성하기<a id="creating-a-singlekeyring-with-a-private-key-and-an-address"></a>

여러분의 Klaytn 계정 주소가 개인키로부터 생성된 것이 아니라 개인키와 별도로 분리된 것이라면, 주소와 개인키를 사용해 Keyring을 만들 수 있습니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

콘솔에서 아래 코드를 실행하세요.

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

#### 여러 개인키로 MultipleKeyring 생성하기<a id="creating-a-multiplekeyring-with-multiple-private-keys"></a>

If you want to use multiple private keys, you can create a [MultipleKeyring][] using an address and multiple private keys. The below examples show how to create a [MultipleKeyring][] with multiple private keys.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

async function testFunction() {
    // Create a keyring with an address and private keys
    const keyring = caver.wallet.keyring.createWithMultipleKey('0x{address in hex}', [ '0x{private key1}', '0x{private key2}' ])
    console.log(keyring)
}

testFunction()
```

위 코드를 실행하면 아래 결과를 얻습니다.

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

위에서 확인할 수 있듯이 `_keys` 속성은 여러 PrivateKey 인스턴스가 들어있는 배열을 갖고 있습니다. 인스턴스 멤버 변수들은 `keyring.address`와 `keyring.keys`로 접근 가능합니다.


#### 개인키로 RoleBasedKeyring 생성하기<a id="creating-a-rolebasedkeyring-with-role-based-private-keys"></a>

To use different private key(s) for each [role][], `caver.wallet.keyring.createWithRoleBasedKey` is used instead. Each array element represents a role described in [RoleBasedKeyring][]. The example below shows how to create a [RoleBasedKeyring][] instance from different keys for each role.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

위 코드를 실행하면 아래 결과를 얻습니다.

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

위 결과를 살펴보면, keys 배열의 1번째 원소인 `roleTransactionKey`는 PrivateKey 인스턴스 3개를 가지고 있고, 2번째 원소인 `roleAccountUpdateKey`는 PrivateKey 인스턴스 1개를 가지고 있습니다. 그리고 배열의 마지막 원소인 `roleFeePayerKey`는 PrivateKey 인스턴스 2개를 가지고 있습니다.

**Note**: Calling functions related to keyring ([caver.wallet.keyring][]) or wallet ([caver.wallet][]) do not affect the actual Klaytn blockchain platform (Klaytn).

### caver-js에 Keyring 추가하기<a id="adding-keyrings-to-caver-js"></a>

caver-js에서 제공하는 인메모리 지갑을 사용하면 쉽게 Keyring을 사용할 수 있습니다. 다음 예시는 Keyring 인스턴스 및 [Klaytn Wallet](https://wallet.klaytn.com/)이 생성한 키스토어 파일을 사용해 지갑에 Keyring을 추가하는 방법을 보여줍니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

콘솔에서 아래 코드를 실행하세요.

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

위 결과를 살펴보면 `caver.wallet`에 Keyring을 추가하면 `caver.wallet`에서 여러분의 Keyring을 조회할 수 있습니다.

If you have an address and private key(s) to use, you can easily create a keyring and add it directly to [caver.wallet][] via [caver.wallet.newKeyring][].

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

위 코드를 실행하면 아래 결과를 얻습니다. 위 코드 실행 결과는 아래와 같습니다. 개인키를 사용해 `caver.wallet.newKeyring`을 실행하면 개인키 1개를 가진 Keyring 인스턴스 1개가 생성되고 이 인스턴스는 `caver.wallet`에 추가됩니다. 여러 개인키를 사용하면 여러 개인키를 가지는 Keyring 인스턴스 1개가 생성됩니다. When passing one or more private keys for each role as arguments, a Keyring instance with a different private key(s) for each role is created and also added to the `caver.wallet`.

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

`caver.wallet`에 Keyring 인스턴스를 추가하면 `caver.wallet.add` 또는 `caver.wallet.newKeyring`은 Keyring 인스턴스를 반환합니다.

## 트랜잭션 전송<a id="sending-a-transaction"></a>

이 장에서는 Baobab 네트워크에서 caver-js를 사용하여 KLAY를 보내는 방법을 보여줍니다.

### Baobab Faucet을 통해 KLAY 받기 <a id="getting-klay-via-baobab-faucet"></a>

테스트를 위해 KLAY가 필요한 경우 [Klaytn Wallet](../../../toolkit/klaytn-wallet.md#how-to-receive-baobab-testnet-klay)에서 Baobab testnet KLAY를 얻을 수 있습니다. 개인키 또는 키스토어 파일을 사용하여 Klaytn Wallet에 로그인하고 테스트를 위해 faucet을 통해 Baobab 테스트넷 KLAY를 받습니다.

### 송금 트랜잭션 전송 <a id="sending-a-value-transfer-transaction"></a>

트랜잭션 서명은 caver-js 지갑을 통해 할 수 있습니다. 트랜잭션을 네트워크에 보내려면 아래와 같이 2단계를 거쳐야합니다.

1. 트랜잭션 서명하기
    - If the keyring you want to use is added to [caver.wallet][], you can use `caver.wallet.sign` function to sign.
    - `caver.wallet`에 Keyring을 추가하지 않고 따로 관리한다면, `transaction.sign` 함수를 통해 트랜잭션에 서명할 수 있습니다.
2. RLP 인코딩된 서명된 트랜잭션을 `caver.rpc.klay.sendRawTransaction`을 통해 Klaytn에 전송합니다.

**참고:** 발신자의 잔액은 송금하려는 KLAY보다 많아야 합니다.

#### 트랜잭션 서명하기

트랜잭션을 Klaytn에 보내기 전에 트랜잭션에 먼저 서명해야 합니다.

Below is an example of how to sign a transaction if a keyring is added to the [caver.wallet][].

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

위 코드는 Keyring을 `caver.wallet`에 추가하고, 트랜잭션을 생성하고, `caver.wallet.sign`를 통해 이 트랜잭션에 서명합니다.

위 코드를 실행하면 아래 결과를 얻습니다. 위 코드가 실행되었을 때, RLP 인코딩된 트랜잭션 문자열은 아래와 같이 나타납니다. (The RLP-encoded string output you got could be different from the string output shown below.)

```bash
RLP-encoded string: 0x08f87e808505d21dba0082753094176ff0344de49c04be577a3512b6991507647f720194ade4883d092e2a972d70637ca7de9ab5166894a2f847f845824e44a0e1ec99789157e5cb6bc691935c204a23aaa3dc049efafca106992a5d5db2d179a0511c421d5e508fdb335b6048ca7aa84560a53a5881d531644ff178b6aa4c0a41
```

#### RLP 인코딩된 서명된 트랜잭션을 Klaytn에 전송합니다.

이제, 아래와 같이 서명된 트랜잭션을 Klaytn에 전송할 수 있습니다. 아래 예시를 직접 실행하려면 `0x{RLP-encoded string}`를 위 `rlpEncoded` 값으로 대체하십시오 .

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

async function testFunction() {
    const rlpEncoding = `0x{RLP-encoded string}`

    // Send the transaction using `caver.rpc.klay.sendRawTransaction`.
    const receipt = await caver.rpc.klay.sendRawTransaction(rlpEncoding)
    console.log(receipt)
}

testFunction()
```

위 코드를 실행하면 아래 결과를 얻습니다. 위 코드가 실행되었을 때, 트랜잭션에 대한 영수증은 아래와 같이 나타납니다.

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

`caver.wallet` 없이 트랜잭션에 서명하고 Klaytn에 서명된 트랜잭션을 보내려면 아래 예시를 확인하십시오.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

위 코드가 실행 되었을 때, 트랜잭션에 대한 영수증은 앞에서 소개한 예제와 같이 나타납니다.

### 영수증 확인<a id="checking-receipts"></a>

You can use the promise or event emitter to get the receipt of the transaction when you transfer the transaction to the Klaytn by [caver.rpc.klay.sendRawTransaction][].

다음 예시는 프로미스(promise) 및 이벤트 이미터(event emitter)를 사용하여 영수증을 받는 과정입니다.

```javascript
// Using a promise - async/await
const receipt = await caver.rpc.klay.sendRawTransaction(rawTransaction)
console.log(receipt)

// Using a promise
caver.rpc.klay.sendRawTransaction(rawTransaction).then(console.log)

// Using an event emitter
caver.rpc.klay.sendRawTransaction(rawTransaction).on('receipt', console.log)
```

위 예시와 같이 프로미스(promise)와 이벤트 이미터(event emitter)를 통해 트랜잭션을 전송한 결과를 가져올 수 있습니다. `transactionHash` 필드는 영수증 객체 내부에 정의됩니다. You can use [caver.rpc.klay.getTransactionReceipt][] RPC call with `receipt.transactionHash` to query the receipt of a transaction at any time from the network after the transaction is included in a block. The example below shows how to get a receipt using the [caver.rpc.klay.getTransactionReceipt][] RPC call.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

async function testFunction() {
    const receipt = await caver.rpc.klay.getTransactionReceipt('0x40552efbba23347d36f6f5aaba6b9aeb6602e004df62c1988d9b7b1f036e676a')
    console.log(receipt)
}

testFunction()
```

위 코드를 실행하면 아래 결과를 얻습니다. 위 코드가 실행되었을 때, 트랜잭션에 대한 영수증은 아래와 같이 나타납니다.

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

트랜잭션의 실행 결과는 영수증의 `status`를 통하여 확인할 수 있습니다. For the details of the return values, see [caver.rpc.klay.getTransactionReceipt][]. 만약 트랜잭션 실행이 실패한다면 에러에 대한 자세한 내용은 영수증의 `txError`에서 확인할 수 있습니다. For more information about `txError`, see [txError: Detailed Information of Transaction Failures][].

## 다른 트랜잭션 타입 실행하기 <a id="executing-other-transaction-types"></a>

Klaytn은 확장성과 성능을 위한 다양한 트랜잭션 타입을 제공합니다. For more information, see [Transactions](../../../klaytn/design/transactions/README.md). 이 장에서는 caver-js와 함께 사용할 수 있는 예시를 설명합니다.

### 트랜잭션 수수료 위임 <a id="fee-delegation"></a>

Klaytn provides [Fee Delegation][] feature. 여기에서는, 여러분이 트랜잭션 전송자일 때 RLP 인코딩된 트랜잭션을 만드는 예시를 소개합니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

위 코드가 실행되었을 때, RLP 인코딩된 문자열이 출력됩니다. (The RLP-encoded string output you got could be different from the string output shown below.)

```bash
$ node ./test.js
0x09f884028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf080c4c3018080
```

The fee payer can send the transaction to the Klaytn after attaching the `feePayerSignatures` to the RLP-encoded string (`rawTransaction`) signed by the transaction sender. `caver.wallet`에 수수료 납부자 키도 같이 있다면, `caver.wallet.signAsFeePayer(feePayer.address, feeDelegatedTx)`를 호출하여 수수료 납부자 서명을 `feeDelegatedTx`에 넣을 수 있습니다. 그렇지 않다면, 수수료 납부자는 트랜잭션 발신자가 서명한 RLP 인코딩된 문자열에서 `feeDelegatedTx`를 새로 만들고, 자신의 서명을 여기에 추가해야합니다. 아래 예시를 참고하십시오. 아래 예시를 직접 실행하려면 `0x{RLP-encoded string}`를 위 `rlpEncoded` 값으로 대체하십시오 .

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

위 코드가 실행되었을 때, 발신자 서명과 수수료 납부자 서명이 첨부된 RLP 인코딩된 문자열 아래와 같이 나타납니다. (The output you got could be different from the string output shown below.)

```bash
$ node ./test.js
0x09f8dc028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf09417e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24f847f845824e44a0921b7c3be69db96ce14134b306c2ada423613cb66ecc6697ee8067983c268b6ea07b86b255d1c781781315d85d7904226fb2101eb9498c4a03f3fbd30ba3ec5b79
```

이제 트랜잭션 발신자와 수수료 납부자 모두 트랜잭션에 서명했으니, 트랜잭션을 Klaytn에 전송할 수 있습니다. `0x{RLP-encoded string}`을 위 예시 코드의 RLP 인코딩된 문자열 출력값으로 대체하십시오.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

async function testFunction() {
    const rlpEncoded = '0x{RLP-encoded string}'
    const receipt = await caver.rpc.klay.sendRawTransaction(rlpEncoded)
    console.log(receipt)
}

testFunction()
```

위 코드를 실행하면 아래 결과를 얻습니다. 위 예시 코드 실행 결과를 보면, FeeDelegatedValueTransfer 트랜잭션 결과를 알 수 있습니다.

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

### 계정 업데이트 <a id="account-update"></a>

If you want to change the private key(s) for your Klaytn account, there are 3 important things you need to remember:

1. Klaytn은 자신에게 전송되는 모든 트랜잭션을 검증합니다.
2. 트랜잭션을 검증하려면 개인키와 짝을 이루는 공개키가 필요합니다.
3. 따라서, 기존에 사용하던 개인키를 새로운 개인키로 바꾸기 전에, **먼저** 기존 공개키를 새로운 공개키로 바꿔야 합니다. 새로운 공개키는 반드시 새로운 개인키로부터 만들어야 합니다.

Keeping the 3 things above in your mind, you can change your private key(s) by following the steps below:

1. 새로운 Keyring을 만들기 위해 새 개인키(들)을 준비합니다.
2. 필요한 Keyring 타입(SingleKeyring, MultipleKeyring, RoleBasedKeyring)을 골라 Keyring을 만듭니다.
3. 새 Keyring에서 Account 인스턴스를 생성합니다. 이 Account 인스턴스는 여러분의 Klaytn 계정이 사용할 새로운 공개키를 가지고 있습니다.
4. Account 인스턴스를 입력 파라미터로 받는 AccountUpdate 트랜잭션을 Klaytn에 전송합니다.
5. 마지막으로, 기존 Keyring을 2번째 단계에서 만들었던 새 Keyring으로 교체합니다.

Please check [Account Update][] for the details.

To change your AccountKey, you must provide an [Account][] instance for the `account` field in the input argument object of `caver.transaction.accountUpdate`. An [Account][] instance contains the address of the Klaytn account and the AccountKey to be updated.

The code below is an example code that changes the private key(s) you use for your Klaytn account along with changing AccountKey of your Klaytn account to [AccountKeyPublic][]. Don't forget to prepare your new private key(s).

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

If the above code is executed successfully, you no longer are able to use the old private key(s) to sign any transaction with the old keyring. 따라서 여러분은 `caver.wallet.updateKeyring(newKeyring)`을 사용해 기존 Keyring을 `newKeyring`으로 업데이트하셔야 합니다.  Once it is updated, the signing will be done by the newly updated private key(s).

위 코드를 실행하면 아래 결과를 얻습니다. 위 코드를 실행하면, 개인키 업데이트 및 계정 정보 업데이트 결과가 아래와 같이 출력됩니다.

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


Here comes how to update AccountKey of your Klaytn account with multiple [AccountKeys]? The example below explains how to create an [Account][] instance with multiple private keys that what you want to use (You can create an [Account][] instance with multiple public keys via [caver.account.create][]). 여기에서도, 트랜잭션 객체의 `account` 필드에 Account 인스턴스를 입력 파라미터로 넣으면, 나머지 업데이트 과정은 위에서 소개한 AccountKey 1개를 업데이트하는 과정과 동일합니다.

First, let's create an Account instance to update with [AccountKeyWeightedMultiSig][]. For [AccountKeyWeightedMultiSig][], a threshold and a weight for each key must be defined. To do this, use [caver.account.weightedMultiSigOptions][]. 1번째 파라미터는 임계값이고 2번째 파라미터는 Key별 가중치를 담고 있는 배열입니다.

```javascript
// Create an account instance with three private keys using AccountKeyWeightedMultiSig
const newPrivateKeys = caver.wallet.keyring.generateMultipleKeys(3)
const newKeyring = caver.wallet.keyring.createWithMultipleKey(sender.address, newPrivateKeys)

// threshold = 3, the weights of the three keys = [1, 2, 1]
const options = new caver.account.weightedMultiSigOptions(3, [1, 2, 1])

const account = newKeyring.toAccount(options)
```

Now let's update AccountKey using [AccountKeyRoleBased][]. [AccountKeyRoleBased][] is an `AccountKey` type that defines the key to use for each [role][].

```javascript
// Create an account instance with roles using AccountKeyRoleBased. In the account instance created, each role has a public key that corresponds to one private key.
const newPrivateKeys = caver.wallet.keyring.generateRoleBasedKeys([1, 1, 1])
const newKeyring = caver.wallet.keyring.createWithRoleBasedKey(sender.address, newPrivateKeys)

const account = newKeyring.toAccount()
```

위 AccountKeyRoleBased는 Role마다 공개키 1개를 사용하는 예시입니다. 위 코드에서 볼 수 있듯이, 이들 각각은 개인키 1개에 대응됩니다. If you want to use multiple private keys for each role, [caver.account.weightedMultiSigOptions][] must be defined for each role as shown below.

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

If you want to update AccountKey to [AccountKeyLegacy][] or [accountKeyFail][], create an Account instance as shown below and assign it to the `account` field of the transaction.

```javascript
// Create an account with AccountKeyLegacy
const accountWithLegacyKey = caver.account.createWithAccountKeyLegacy(keyringToUpdate.address)

// Create an account with AccountKeyFail
const accountWithFailKey = caver.account.createWithAccountKeyFail(keyringToUpdate.address)
```

### 스마트 컨트랙트 <a id="smart-contract"></a>

The [caver.contract][] package makes it easy to interact with smart contracts on Klaytn. 저수준 ABI\(Application Binary Interface\)가 주어지면 스마트 컨트랙트의 모든 메소드를 자동으로 자바스크립트 호출로 변환합니다. 이를 통해 스마트 컨트랙트가 마치 자바스크립트 객체인 것처럼 스마트 컨트랙트와 상호작용할 수 있습니다.

먼저, 아래와 같이 간단한 솔리디티 코드 예시를 만듭니다. 'test.sol' 파일을 만들고 아래 예시를 작성합니다.

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

이제, 이 스마트 컨트랙트를 컴파일하여 바이트코드와 ABI를 얻습니다.

```text
> solc --abi --bin ./test.sol
======= ./test.sol:KVstore =======
Binary: 
608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029
Contract JSON ABI 
[{"constant":true,"inputs":[{"name":"key","type":"string"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```

**참고**: 스마트 컨트랙트를 컴파일하려면 [솔리디티 컴파일러](https://solidity.readthedocs.io/en/develop/installing-solidity.html) 가 설치되어 있어야 합니다.

For the smart contract deployment, you can use [caver.contract][] to deploy it, or you can deploy it using [caver.transaction.smartContractDeploy][], [caver.transaction.feeDelegatedSmartContractDeploy][] or [caver.transaction.feeDelegatedSmartContractDeployWithRatio][] transaction. Here is an example of using [caver.contract][].

여러분은 아래와 같이 스마트 컨트랙트를 컴파일하여 얻은 결과를 사용해 컨트랙트 인스턴스를 만들 수 있습니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

위 코드를 실행하면 아래 결과를 얻습니다.

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

위 결과를 살펴보면, 스마트 컨트랙트 메서드들이 ABI를 통해 컨트랙트 인스턴스 내부에서 관리됨을 알 수 있습니다. 그리고 아직 컨트랙트가 배포되지 않았으므로 `contractInstance.options.address` 값이 null임을 확인할 수 있습니다.

만약 스마트 컨트랙트가 이미 배포되었고 배포된 컨트랙트의 주소를 알고 있다면, 아래와 같이 컨트랙트 주소를 2번째 파라미터로 넣으십시오.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

위 코드를 실행하면 아래 결과를 얻습니다.

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

이 컨트랙트 인스턴스에 스마트 컨트랙트 주소가 입력되었으므로, 이제 `contractInstance.options.address`에는 이 컨트랙트 주소가 들어있습니다.

컨트랙트 인스턴스가 생성되면, 아래와 같이 바이트코드를 `data` 필드에 전달하는 것으로 배포할 수 있습니다.

Note that [caver.contract][] sends transactions for deployment and execution. 트랜잭션 서명에는 `caver.wallet`에 있는 Keyring을 사용합니다. 사용할 Keyring은 `caver.wallet`에 먼저 추가해야 합니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

위 코드를 보면, `deployer`가 컨트랙트를 Klaytn에 배포하고 배포된 컨트랙트 인스턴스를 받습니다.

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

To deploy a smart contract through fee-delegated transaction, define `feeDelegation` and `feePayer` like the example below:

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

If you want to send a transaction with sender and feePayer signed separately when deploying a smart contract through `caver.contract`, refer to the code below:

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

A smart contract can be executed using one of the followings, depending on the type of contract executing transaction: `Contract` class in `caver.contract` or [caver.transaction.smartContractExecution][], [caver.transaction.feeDelegatedSmartContractExecution][], or [caver.transaction.feeDelegatedSmartContractExecutionWithRatio][]. To send a transaction for executing a smart contract:

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

When the above code is executed, the transaction result from executing `set` arrives as below.

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

To execute a smart contract through fee-delegated transaction, define `feeDelegation` and `feePayer` like the example below:

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

If you want to send a transaction with sender and feePayer signed separately when executing a smart contract through `caver.contract`, refer to the code below:

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

To load a contract instance and call one of its functions:

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

위 코드가 실행되면, 아래와 같은 값을 얻습니다.

```bash
$ node ./test.js
testValue
```

To find more information, see [caver.contract][].

## Sending a Transaction with multiple signers<a id="sending-a-transaction-with-multiple-signers"></a>

If the Klaytn account's AccountKey is AccountKeyMultiSig or AccountKeyRoleBased, the person who manages each key can vary.

이 장에서는 서명하는 사람이 여럿인 경우 서명을 수집하고 트랜잭션을 보내는 방법에 대해 설명합니다.

To run this example, you need to update AccountKey of the Klaytn account you use for testing with [AccountKeyWeightedMultiSig][]. Please refer to [Account Update](#account-update) for how to update your Klaytn account.

### 순차적으로 서명하기<a id="signing-sequentially"></a>

When a transaction is signed using `caver.wallet` or the transaction's `sign` function, signatures (or feePayerSignatures) are defined (or appended) inside the transaction. You can obtain the RLP-encoded string (`rawTransaction`) containing the signatures (and feePayerSignatures) by calling the `transaction.getRLPEncoding()` function of the signed transaction instance.

다음 예제는 여러 개인 키를 사용하여 트랜잭션에 순차적으로 서명하는 방법을 보여줍니다. Let's assume that AccountKey of the account who sends this transaction is AccountKeyWeightedMultiSig of two public keys, which means this Klaytn account can use two private key strings, one private key for each user. This is a case that two users share the same Klaytn account.

In the example below, user1 and user2 create a `Keyring` instances to be used. After that, each uses its own keyring to sign the transaction. The example below uses `transaction.sign` to sign it.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

위 코드를 실행하면 아래 결과를 얻습니다. Looking at the execution result of the code above, if user1 signs, one signature is created. If user2 signs, user2's signature is appended. [SignatureData][] is an object that stores a signature.

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

Then let's see how to sign sequentially without sharing the same transaction object. In the below example, user1 passes RLP-encoded string that is the result of getRLPEncoding function of the signed transaction to user2.

The code below explains how to sign and append signatures with RLP-encoded string.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

위 코드를 실행하면 아래 결과를 얻습니다.

```bash
$ node ./test.js
[ 
    SignatureData { _v: '0x4e43', _r: '0x3f3d3...', _s: '0x24f94...' },
    SignatureData { _v: '0x4e44', _r: '0xd6a94...', _s: '0x72dc8...' }
]
```

If you run the above code, you can see that user2's signature has been appended in `transactionFromRLP.signatures` and a total of two signatures are included in it.

When all users have signed, send a transaction to the network through `await caver.rpc.klay.sendRawTransaction(transactionFromRLP)`.

If you send a fee-delegated transaction, and the fee payer uses multiple keys, you can proceed with the above logic using `caver.wallet.signAsFeePayer`.

### 서명된 raw transaction들을 결합하기<a id="combining-signed-rawtransactions"></a>

If you receive multiple signed RLP-encoded raw transaction strings from several people, you can combine them into a single RLP-encoded raw transaction string that contains all the signatures.

아래 예제는 RLP 인코딩된 트랜잭션들을 하나로 통합하고 전송하는 방법을 보여줍니다.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

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

위 코드를 실행하면 아래 결과를 얻습니다.

```bash
$ node ./test.js
0x08f9010d808505d21dba00830111709445c2a1e3a1c3957a06dae73ad516461c2d2c7ccc01940fa355263f37f5a54d9179452baa8b63b8b2cddef8d5f8458207f5a094ce13c39d25d44ad1d07ba2fd89f476c4dc6eef6071a2ef1f496f9b04d049e5a00f7abddd548998b0a55e53600a48286c38262fffc6c153a64e8f65a77c11c722f8458207f6a0ceeea7287b2670719d8ac15cf3b21b36fcaf74d58cce99935ce17e100064037aa0499067788d5db5e7c09ed7bfe19764d66684abc06b81e8f54ea254377bc81066f8458207f5a05c3ba89336c7d84d4ce08104cfd6f7ef33cd9f29766a1955baae8bcf964fd50fa015accbbce6bb11847a3b0660491775d64ef6d692ea709b768f64f12968c09240
```

Running the code above outputs one RLP-encoded raw transaction string with all the signature information combined.

When executing `combineSignedRawTransactions`, the signed RLP-encoded raw transaction strings to be combined must be exactly the same to each other except the signatures and the optional variables in the transaction instance. Optional variables without any given value in the base transaction instance (the caller of `combineSignedRawTransactions`) will be redeemed with the corresponding ones in the following raw transaction string to be merged right next. If there is any inconsistency among all raw transaction strings including the values of optional variables of them to be merged, an error occurs.

The combineSignedRawTransactions returns an RLP-encoded string containing all signatures (and feePayerSignatures if the transaction is a fee-delegated transaction) as a result. You use this to send a transaction to the network through `await caver.rpc.klay.sendRawTransaction(combined)`.

## Detecting implementation of KCT interfaces <a id="detecting-implementation-of-kct-interfaces"></a>

`caver.kct` provides functions that return information about which interface the given KCT token contract implements. Using this, you can see which interface the KCT token contract deployed on Klaytn implements.

### Detecting KIP-7 interfaces <a id="detecting-kip-7-interfaces"></a>

In order to detect the interfaces implemented by the KIP-7 token contract, you can use `caver.kct.kip7.detectInterface(contractAddress)` or `kip7.detectInterface()`.

Below is a code on how to detect the implemented interfaces for the KIP-7 token contract deployed on Klaytn using static methods provided in `caver.kct.kip7`.
```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

async function testFunction() {
    const result = await caver.kct.kip7.detectInterface('0x{address in hex}')
    console.log(result)
}

testFunction()
```

위 코드를 실행하면 아래 결과를 얻습니다.

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

Below is a code on how to detect the implemented interfaces for the KIP-7 token contract deployed on Klaytn using member method of KIP7.
```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

async function testFunction() {
    const kip7 = new caver.kct.kip7('0x{address in hex}')
    const result = await kip7.detectInterface()
    console.log(result)
}

testFunction()
```

위 코드를 실행하면 아래 결과를 얻습니다.

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

### Detecting KIP-17 interfaces <a id="detecting-kip-17-interfaces"></a>

In order to detect the interfaces implemented by the KIP-17 token contract, you can use `caver.kct.kip17.detectInterface(contractAddress)` or `kip17.detectInterface()`.

Below is a code on how to detect the implemented interfaces for the KIP-17 token contract deployed on Klaytn using static methods provided in `caver.kct.kip17`.
```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

async function testFunction() {
    const result = await caver.kct.kip17.detectInterface('0x{address in hex}')
    console.log(result)
}

testFunction()
```

위 코드를 실행하면 아래 결과를 얻습니다.

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

Below is a code on how to detect the implemented interfaces for the KIP-17 token contract deployed on Klaytn using member method of KIP17.
```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

async function testFunction() {
    const kip17 = new caver.kct.kip17('0x{address in hex}')
    const result = await kip17.detectInterface()
    console.log(result)
}

testFunction()
```

위 코드를 실행하면 아래 결과를 얻습니다.

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

### Detecting KIP-37 interfaces <a id="detect-kip-37-interfaces"></a>

In order to detect the interfaces implemented by the KIP-37 token contract, you can use `caver.kct.kip37.detectInterface(contractAddress)` or `kip37.detectInterface()`.

Below is a code on how to detect the implemented interfaces for the KIP-37 token contract deployed on Klaytn using static methods provided in `caver.kct.kip37`.
```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

async function testFunction() {
    const result = await caver.kct.kip37.detectInterface('0x{address in hex}')
    console.log(result)
}

testFunction()
```

위 코드를 실행하면 아래 결과를 얻습니다.

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

Below is a code on how to detect the implemented interfaces for the KIP-37 token contract deployed on Klaytn using member method of KIP37.
```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')

async function testFunction() {
    const kip37 = new caver.kct.kip37('0x{address in hex}')
    const result = await kip37.detectInterface()
    console.log(result)
}

testFunction()
```

위 코드를 실행하면 아래 결과를 얻습니다.

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

## 샘플 프로젝트 <a id="sample-projects"></a>

caver-js를 사용한 BApp \(Blockchain Application\) 개발 샘플 프로젝트는 다음과 같습니다:

* [Count BApp 개발하기](../../tutorials/count-bapp/README.md)
* [Klaystagram](../../tutorials/klaystagram/README.md)

## 문제 해결 <a id="troubleshooting"></a>

* **Error: Can't resolve 'fs'** occurs during the build with caver-js in a web browser:
   - Add the following webpack configuration.
   ```
   module.exports = {
        ...
        node: {
            fs: 'empty',
        },
        ...
    }
   ```
   If using Next.js web framework, you can add the webpack configuration to your **next.config.json** file as follows:
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

## 링크 <a id="links"></a>

* caver-js [깃허브 레포지토리](https://github.com/klaytn/caver-js)
* caver-js on [npm](https://www.npmjs.com/package/caver-js)



[caver.contract]: api-references/caver.contract.md
[Account]: api-references/caver.account.md
[AccountKeyLegacy]: ../../../klaytn/design/accounts.md#accountkeylegacy
[AccountKeyPublic]: ../../../klaytn/design/accounts.md#accountkeypublic
[accountKeyFail]: ../../../klaytn/design/accounts.md#accountkeyfail
[AccountKeyWeightedMultiSig]: ../../../klaytn/design/accounts.md#accountkeyweightedmultisig
[AccountKeyRoleBased]: ../../../klaytn/design/accounts.md#accountkeyrolebased
[role]: ../../../klaytn/design/accounts.md#roles
[caver.account.weightedMultiSigOptions]: api-references/caver.account.md#weightedmultisigoptions
[caver.account.create]: api-references/caver.account.md#caver-account-create

[caver.wallet]: api-references/caver.wallet/README.md
[caver.wallet.newKeyring]: api-references/caver.wallet/README.md#caver-wallet-newkeyring
[caver.wallet.keyring]: api-references/caver.wallet/keyring.md
[Keyring]: api-references/caver.wallet/keyring.md
[SingleKeyring]: api-references/caver.wallet/keyring.md#singlekeyring
[MultipleKeyring]: api-references/caver.wallet/keyring.md#multiplekeyring
[RoleBasedKeyring]: api-references/caver.wallet/keyring.md#rolebasedkeyring
[SignatureData]: api-references/caver.wallet/keyring.md#signaturedata

[caver.rpc.klay.getTransactionReceipt]: api-references/caver.rpc/klay.md#caver-rpc-klay-gettransactionreceipt
[caver.rpc.klay.sendRawTransaction]: api-references/caver.rpc/klay.md#caver-rpc-klay-sendrawtransaction

[txError: Detailed Information of Transaction Failures]: ../../json-rpc/transaction-error-codes.md

[Fee Delegation]: ../../../klaytn/design/transactions/README.md#fee-delegation
[Account Update]: api-references/caver.transaction/basic.md#accountupdate
[caver.transaction.smartContractDeploy]: api-references/caver.transaction/basic.md#smartcontractdeploy
[caver.transaction.feeDelegatedSmartContractDeploy]: api-references/caver.transaction/fee-delegation.md#feedelegatedsmartcontractdeploy
[caver.transaction.feeDelegatedSmartContractDeployWithRatio]: api-references/caver.transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio
[caver.transaction.smartContractExecution]: api-references/caver.transaction/basic.md#smartcontractexecution
[caver.transaction.feeDelegatedSmartContractExecution]: api-references/caver.transaction/fee-delegation.md#feedelegatedsmartcontractexecution
[caver.transaction.feeDelegatedSmartContractExecutionWithRatio]: api-references/caver.transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio
