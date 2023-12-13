---
설명: >-
  계정 관리와 관련된 caver-js API입니다.

---

# caver.klay.accounts

`caver.klay.accounts`에는 클레이튼 계정을 생성하고 트랜잭션과 데이터에 서명하는 함수가 포함되어 있습니다.


## create <a id="create"></a>

```javascript
caver.klay.accounts.create([entropy])
```
개인키와 공개키가 있는 계정 객체를 생성합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| entropy | String | (선택 사항) 엔트로피를 높이기 위한 임의의 문자열입니다. 아무것도 지정하지 않으면 [randomHex](./caver.utils_1.4.1.md#randomhex)를 사용하여 임의의 문자열을 생성합니다. |


**리턴 값**

`Object` - 다음과 같은 구조를 가진 계정 객체입니다:

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| address | String | 계정 주소입니다. |
| privateKey | String | 계정 비공개 키입니다. 절대로 공유하거나 로컬 저장소에 암호화되지 않은 상태로 저장해서는 안 됩니다! 또한 사용 후에는 반드시 메모리를 무효화해야 합니다. |
| signTransaction(tx [, callback]) | Function | 트랜잭션에 서명하는 함수입니다. [caver.klay.accounts.signTransaction](#signtransaction)을 참조하세요. |
| sign(data) | Function | 트랜잭션에 서명하는 함수입니다. [caver.klay.accounts.sign](#sign)을 참조하세요. |
| encrypt | Function | 주어진 비밀번호로 개인키를 암호화하는 함수입니다. |

**예시**

```javascript
> caver.klay.accounts.create();
{
    address: '0x79FF91738661760AC67b3E951c0B4f1F70F80478',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}

> caver.klay.accounts.create('entropy');
{
    address: '0x205fffB1025F4af604fEB1d3a22b46C0D2326585',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}

> caver.klay.accounts.create(caver.utils.randomHex(32));
{ 
    address: '0x62Ca8964610A9D447E1a64753a09fC8b3D40b405',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}
```

## createWithAccountKey <a id="createwithaccountkey"></a>

```javascript
caver.klay.accounts.createWithAccountKey(address, accountKey)
```
주어진 AccountKey로 Account의 인스턴스를 생성합니다. Account는 계정의 주소와 AccountKey를 관리하기 위한 것입니다.

**참고** 이것은 caver-js에서 사용되는 데이터 구조일 뿐입니다. 이 메서드는 Klaytn 네트워크에서 계정을 생성하거나 업데이트하지 않습니다.
**참고** `caver.klay.accounts.createWithAccountKey`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| address | String | 계정 주소. |
| accountKey | String &#124; Array &#124; Object | 계정 키 인스턴스(`AccountKeyPublic`, `AccountKeyMultiSig` 또는 `AccountKeyRoleBased`) 또는 키 정보가 포함된 데이터 구조(개인 키 문자열, 개인 키 문자열 배열 또는 각 역할에 대한 키를 정의하는 객체). |


**리턴 값**

`Object` - 다음 속성을 가진 계정 인스턴스가 반환됩니다:

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| address | String | 계정의 주소입니다. |
| privateKey | String | 계정이 가지고 있는 accountKey의 기본 키 문자열입니다. 이 속성은 이전 버전과의 호환성을 위해 남겨둡니다. privateKey는 accountKey의 기본 키만 나타내므로, 트랜잭션에 서명하거나 전송할 때 privateKey를 사용하는 것은 권장하지 않습니다. 상황에 따라 트랜잭션키, 업데이트키 또는 수수료 납부자키를 사용하는 것이 좋습니다. |
| accountKeyType | String | 계정에 있는 계정키의 유형입니다. 계정키 유형은 `AccountKeyPublic`, `AccountKeyMultiSig` 또는 `AccountKeyRoleBased`가 될 수 있습니다.
| accountKey | Object | 계정의 키입니다. 계정의 키는 AccountKeyPublic, AccountKeyMultiSig 또는 AccountKeyRoleBased입니다. |
| keys | String &#124; Array &#124; Object | 계정이 가지고 있는 accountKey 내의 모든 키입니다. AccountKeyPublic의 경우 단일 개인키 문자열이고, AccountKeyMultiSig의 경우 모든 개인키 문자열이 포함된 배열을 반환합니다. AccountKeyRoleBased의 경우 각 역할에 연결된 키가 있는 객체가 반환됩니다. |
| transactionKey | String &#124; Array | [RoleTransaction](../../../../learn/accounts.md#roles)에 사용된 키입니다. AccountKeyPublic 또는 AccountKeyMultiSig는 역할에 바인딩되지 않으므로 transactionKey는 키와 동일한 값을 보유합니다. |
| updateKey | String &#124; Array | [RoleAccountUpdate](../../../../learn/accounts.md#roles)에 사용되는 키입니다. AccountKeyPublic 또는 AccountKeyMultiSig는 역할에 바인딩되지 않으므로 updateKey는 키와 동일한 값을 보유합니다. |
| feePayerKey | String &#124; Array | [RoleFeePayer](../../../../learn/accounts.md#roles)에 사용되는 키입니다. AccountKeyPublic 또는 AccountKeyMultiSig는 어떤 역할에도 바인딩되지 않으므로 feePayerKey는 키와 동일한 값을 보유합니다. |
| signTransaction(tx [, callback]) | Function | 트랜잭션에 서명하는 함수입니다. [caver.klay.accounts.signTransaction](#signtransaction)을 참조하세요. |
| sign(data) | Function | 트랜잭션에 서명하는 함수입니다. [caver.klay.accounts.sign](#sign)을 참조하세요. |
| encrypt | Function | 주어진 비밀번호로 계정을 암호화하는 함수입니다. |
| getKlaytnWalletKey | Function | [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format)를 가져오는 함수입니다. |

**예시**

```javascript
// Create an Account with AccountKeyPublic
> caver.klay.accounts.createWithAccountKey('0x62ca8964610a9d447e1a64753a09fc8b3d40b405', '0x{private key}')
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}

// Create an Account with AccountKeyMultiSig
> caver.klay.accounts.createWithAccountKey('0x62ca8964610a9d447e1a64753a09fc8b3d40b405', ['0x{private key}', '0x{private key}'])
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}

// Create an Account with AccountKeyRoleBased
> caver.klay.accounts.createWithAccountKey('0x62ca8964610a9d447e1a64753a09fc8b3d40b405', {
    transactionKey: ['0x{private key}', '0x{private key}'], '0x{private key}',
    updateKey: ['0x{private key}', '0x{private key}', '0x{private key}'],
    feePayerKey: ['0x{private key}', '0x{private key}', '0x{private key}']
})
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}
```

## createWithAccountKeyPublic <a id="createwithaccountkeypublic"></a>

```javascript
caver.klay.accounts.createWithAccountKeyPublic(address, accountKey)
```
AccountKeyPublic으로 Account의 인스턴스를 생성합니다.

**참고** `caver.klay.accounts.createWithAccountKeyPublic`은 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| address | String | 계정 주소. |
| accountKey | String &#124; Object | 계정 키 공개 인스턴스 또는 개인 키 문자열입니다.  |


**리턴 값**

`Object` - 계정 인스턴스, [caver.klay.accounts.createWithAccountKey](#createwithaccountkey) 참조.

**예시**

```javascript
> caver.klay.accounts.createWithAccountKeyPublic('0x62ca8964610a9d447e1a64753a09fc8b3d40b405', '0x{private key}')
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}
```

## createWithAccountKeyMultisig <a id="createwithaccountkeymultisig"></a>

```javascript
caver.klay.accounts.createWithAccountKeyMultiSig(address, accountKey)
```
AccountKeyMultiSig로 Account의 인스턴스를 생성합니다.

**참고** `caver.klay.accounts.createWithAccountKeyMultiSig`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| address | String | 계정 주소. |
| accountKey | String &#124; Object | 계정 키 멀티시그 인스턴스 또는 개인 키 문자열 배열.  |


**리턴 값**

`Object` - 계정 인스턴스, [caver.klay.accounts.createWithAccountKey](#createwithaccountkey) 참조.

**예시**

```javascript
> caver.klay.accounts.createWithAccountKeyMultiSig('0x62ca8964610a9d447e1a64753a09fc8b3d40b405', ['0x{private key}', '0x{private key}'])
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}
```

## createWithAccountKeyRoleBased <a id="createwithaccountkeyrolebased"></a>

```javascript
caver.klay.accounts.createWithAccountKeyRoleBased(address, accountKey)
```
AccountKeyRoleBased로 Account의 인스턴스를 생성합니다.

**참고** `caver.klay.accounts.createWithAccountKeyRoleBased`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| address | String | 계정 주소. |
| accountKey | String &#124; Object | 각 역할에 대한 키를 정의하는 AccountKeyRoleBased 인스턴스 또는 개체입니다. |


**리턴 값**

`Object` - 계정 인스턴스, [caver.klay.accounts.createWithAccountKey](#createwithaccountkey) 참조.

**예시**

```javascript
> caver.klay.accounts.createWithAccountKeyRoleBased('0x62ca8964610a9d447e1a64753a09fc8b3d40b405', {
    transactionKey: ['0x{private key}', '0x{private key}', '0x{private key}'],
    updateKey: ['0x{private key}', '0x{private key}', '0x{private key}'],
    feePayerKey: ['0x{private key}', '0x{private key}', '0x{private key}']
})
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}
```

## createAccountKey <a id="createaccountkey"></a>

```javascript
caver.klay.accounts.createAccountKey(key)
```
매개변수 유형에 따라 `AccountKeyPublic`, `AccountKeyMultiSig` 또는 `AccountKeyRoleBased`의 인스턴스를 생성합니다.

AccountKey는 caver-js에서 키를 관리하기 위한 데이터 구조체입니다. 하나의 개인키를 사용하려면 AccountKeyPublic을, 여러 개의 개인키를 사용하려면 AccountKeyMultiSig를, 각 역할마다 다른 키를 사용하려면 AccountKeyRoleBased를 사용하세요.

**참고** `caver.klay.accounts.createAccountKey`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| Key | String &#124; Array &#124; Object | 계정키를 생성하기 위한 키입니다. `key`가 단일 개인키 문자열인 경우 AccountKeyPublic 인스턴스가 생성됩니다. `key`가 여러 개의 개인키 문자열을 포함하는 배열이면 AccountKeyMultiSig 인스턴스가 생성됩니다. `key`가 각 역할에 대한 키(개인 키 문자열 또는 개인 키 문자열의 배열)를 정의하는 객체인 경우 AccountKeyRoleBased 인스턴스가 만들어집니다. AccountKeyRoleBased 인스턴스는 각 역할에 대해 AccountKeyPublic 또는 AccountKeyMultiSig를 가질 수 있습니다. |


**리턴 값**

`Object` - 다음 속성과 함께 AccountKeyPublic, AccountKeyMultiSig 또는 AccountKeyRoleBased 인스턴스가 반환됩니다:

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| type | String | 계정 키 인스턴스의 유형입니다. |
| defaultKey | String | AccountKey의 기본 개인 키입니다. 기본 개인 키는 AccountKeyPublic에 대해 정의된 단일 개인 키 문자열을 나타내며, AccountKeyMultiSig의 경우 배열의 0번째 인덱스에 있는 개인 키 문자열을 나타냅니다. AccountKeyRoleBased의 경우, AccountKey가 트랜잭션키, 업데이트키, 수수료 납부자키 순서로 검색되는 첫 번째로 발견된 AccountKey의 기본키를 나타냅니다.  |
| Key | String &#124; Array &#124; Object | AccountKey 인스턴스 내에 정의된 모든 개인 키. AccountKeyPublic의 경우 단일 개인키 문자열이며, AccountKeyMultiSig의 경우 모든 개인키 문자열이 포함된 배열을 반환합니다. AccountKeyRoleBased의 경우 각 역할에 연결된 키가 있는 객체가 반환됩니다. |
| transactionKey | String &#124; Array | [RoleTransaction](../../../../learn/accounts.md#roles)에 사용된 키입니다. AccountKeyPublic 또는 AccountKeyMultiSig는 역할에 바인딩되지 않으므로 transactionKey는 키와 동일한 값을 보유합니다. |
| updateKey | String &#124; Array | [RoleAccountUpdate](../../../../learn/accounts.md#roles)에 사용되는 키입니다. AccountKeyPublic 또는 AccountKeyMultiSig는 역할에 바인딩되지 않으므로 updateKey는 키와 동일한 값을 보유합니다. |
| feePayerKey | String &#124; Array | [RoleFeePayer](../../../../learn/accounts.md#roles)에 사용되는 키입니다. AccountKeyPublic 또는 AccountKeyMultiSig는 어떤 역할에도 바인딩되지 않으므로 feePayerKey는 키와 동일한 값을 보유합니다. |

**예시**

```javascript
// Create an AccountKeyPublic
> caver.klay.accounts.createAccountKey('0x{private key}')
AccountKeyPublic {
    _key: '0x{private key}'
}

// Create an AccountKeyMultiSig
> caver.klay.accounts.createAccountKey(['0x{private key}', '0x{private key}'])
AccountKeyMultiSig {
    _keys: [ 
      '0x{private key}',
      '0x{private key}'
    ]
}

// Create an AccountKeyRoleBased
> caver.klay.accounts.createAccountKey({
    transactionKey: '0x{private key}',
    updateKey: ['0x{private key}', '0x{private key}'],
    feePayerKey: '0x{private key}'
})
AccountKeyRoleBased {
    _transactionKey:
        AccountKeyPublic {
            _key: '0x{private key}'
        },
    _updateKey:
        AccountKeyMultiSig {
            _keys: [
                '0x{private key}',
                '0x{private key}'
            ] 
        },
    _feePayerKey:
        AccountKeyPublic {
            _key: '0x{private key}' 
        }
}
```

## createAccountKeyPublic <a id="createaccountkeypublic"></a>

```javascript
caver.klay.accounts.createAccountKeyPublic(key)
```
주어진 개인키 문자열로 `AccountKeyPublic` 인스턴스를 생성합니다.

**참고** `caver.klay.accounts.createAccountKeyPublic`은 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| Key | String | AccountKeyPublic 생성을 위한 개인키 문자열입니다. |


**리턴 값**

`Object` - AccountKeyPublic 인스턴스, [caver.klay.accounts.createAccountKey](#createaccountkey) 참조.


**예시**

```javascript
> caver.klay.accounts.createAccountKeyPublic('0x{private key}')
AccountKeyPublic {
    _key: '0x{private key}'
}
```

## createAccountKeyMultisig <a id="createaccountkeymultisig"></a>

```javascript
caver.klay.accounts.createAccountKeyMultiSig(keys)
```
주어진 여러 개인키를 사용하여 `AccountKeyMultiSig` 인스턴스를 생성합니다.

**참고** `caver.klay.accounts.createAccountKeyMultiSig`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| keys | Array | AccountKeyMultiSig을 생성하기 위한 개인키 문자열 배열입니다. |


**리턴 값**

`Object` - AccountKeyMultiSig 인스턴스, [caver.klay.accounts.createAccountKey](#createaccountkey) 참조.


**예시**

```javascript
> caver.klay.accounts.createAccountKeyMultiSig(['0x{private key}', '0x{private key}'])
AccountKeyMultiSig {
    _keys: [ 
      '0x{private key}',
      '0x{private key}'
    ]
}
```

## createAccountKeyRoleBased <a id="createaccountkeyrolebased"></a>

```javascript
caver.klay.accounts.createAccountKeyRoleBased(keyObject)
```
각 역할에 연결된 주어진 키로 `AccountKeyRoleBased` 인스턴스를 생성합니다.

**참고** `caver.klay.accounts.createAccountKeyRoleBased`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| keyObject | Object | 역할 키 쌍이 있는 개체입니다. 각 역할의 키는 개인 키 문자열 또는 개인 키 문자열의 배열일 수 있습니다. |


**리턴 값**

`Object` - 계정키 역할 기반 인스턴스, [caver.klay.accounts.createAccountKey](#createaccountkey) 참조.


**예시**

```javascript
> caver.klay.accounts.createAccountKeyRoleBased({
    transactionKey: '0x{private key}',
    updateKey: ['0x{private key}', '0x{private key}'],
    feePayerKey: '0x{private key}'
})
AccountKeyRoleBased {
    _transactionKey:
        AccountKeyPublic {
            _key: '0x{private key}'
        },
    _updateKey:
        AccountKeyMultiSig {
            _keys: [
                '0x{private key}',
                '0x{private key}'
            ] 
        },
    _feePayerKey:
        AccountKeyPublic {
            _key: '0x{private key}' 
        }
}
```

## accountKeyToPublicKey <a id="accountkeytopublickey"></a>

```javascript
caver.klay.accounts.accountKeyToPublicKey(accountKey)
```
이 함수는 계정키의 개인키를 공개키로 변환합니다.

**참고** `caver.klay.accounts.accountKeyToPublicKey`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| accountKey | String &#124; Array &#124; Object | 계정 키 인스턴스(`AccountKeyPublic`, `AccountKeyMultiSig` 또는 `AccountKeyRoleBased`) 또는 키 정보를 포함하는 데이터 구조(개인 키 문자열, 개인 키 문자열 배열 또는 각 역할에 대한 키를 정의하는 객체)입니다. |

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| String &#124; Array &#124; Object | 매개변수가 AccountKeyPublic 인스턴스이거나 비공개 키 문자열인 경우 공개 키 문자열이 반환됩니다. 매개변수가 AccountKeyMultiSig 인스턴스 또는 비공개 키 문자열 배열인 경우 공개 키 문자열 배열이 반환됩니다. 매개변수가 각 역할에 대한 키(개인 키 문자열 또는 개인 키 문자열의 배열)를 정의하는 객체 또는 AccountKeyRoleBased 인스턴스인 경우에는 역할과 공개 키(공개 키 문자열 또는 공개 키 문자열의 배열) 쌍을 가진 객체가 반환됩니다. |


**예시**

```javascript
// Convert a private key string
> caver.klay.accounts.accountKeyToPublicKey('0x{private key}')
'0x67f20d1198abcdc036a4d8f3ea0cf837527716c90f71d0b0410dfe3e1b405eded9ea818eedd5e8ad79658b2cdf4862ab0956a6f7fd0a4886afe6110b2e9803a4'

// Convert an array of private key strings
> caver.klay.accounts.accountKeyToPublicKey(['0x{private key}', '0x{private key}'])
[
    '0x67f20d1198abcdc036a4d8f3ea0cf837527716c90f71d0b0410dfe3e1b405eded9ea818eedd5e8ad79658b2cdf4862ab0956a6f7fd0a4886afe6110b2e9803a4',
    '0x7c5415f99628618b3fe78e14606c83a22488769b3361e3758c7c98a204a23b615cf07af65490895d70a7b7e7e885fc2f597d65ea69ed586c7ae7cb0241656036'
]

// Convert a role-based key
> caver.klay.accounts.accountKeyToPublicKey({transactionKey: ['0x{private key}', '0x{private key}'], updateKey: '0x{private key}', feePayerKey: ['0x{private key}', '0x{private key}']})
{ 
    transactionKey: [
        '0x67f20d1198abcdc036a4d8f3ea0cf837527716c90f71d0b0410dfe3e1b405eded9ea818eedd5e8ad79658b2cdf4862ab0956a6f7fd0a4886afe6110b2e9803a4',
        '0x7c5415f99628618b3fe78e14606c83a22488769b3361e3758c7c98a204a23b615cf07af65490895d70a7b7e7e885fc2f597d65ea69ed586c7ae7cb0241656036'
    ],
    updateKey: '0x21aa42e0232e6c7607a0028bcbd690400b92574c44b17af8b036f3f4f01b0586f90578976a040debf6aecef4a5d00b5315b8c82e999ed8e5fbacd5fcbee82080',
    feePayerKey: [
        '0xb82bb74e902b1fa3594c7cc8bd33a727eb1c85a9bfc991327a0215fc413eafe0b3723cc7f3c6e79981b409e82b8bf7033fed2d2878c26502bea64f84d592b167',
        '0x39acd887f32ccecd1b13c890854d2dfd0016f0be477155d81a848e971ff59412b0e4c0b5bfc1fd548b971f98cd9ef19367309d0475033fda3c8028ba9df27734'
    ]
}
```

## privateKeyToAccount <a id="privatekeytoaccount"></a>

```javascript
caver.klay.accounts.privateKeyToAccount(privateKey)
```
개인키에서 계정 객체를 생성합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| privateKey | String | 변환할 개인 키입니다. |


**리턴 값**

``object`` - 계정 객체

**예시**

```javascript
> caver.klay.accounts.privateKeyToAccount('0x{private key}');
{ 
    address: '0x62ca8964610a9d447e1a64753a09fc8b3d40b405',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey] 
}
```

## privateKeyToPublicKey <a id="privatekeytopublickey"></a>

```javascript
caver.klay.accounts.privateKeyToPublicKey(privateKey)
```
주어진 개인키에서 공개키를 가져옵니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| privateKey | String | 변환할 개인 키입니다. |


**리턴 값**

`String` - 공개 키(64바이트)

**예시**

```javascript
> caver.klay.accounts.privateKeyToPublicKey('0x{private key}')
'0xbb1846722a4c27e71196e1a44611ee7174276a6c51c4830fb810cac64b0725f217cb8783625a809d1303adeeec2cf036ab74098a77a6b7f1003486e173b29aa7'
```

## createAccountForUpdate <a id="createaccountforupdate"></a>

```javascript
caver.klay.accounts.createAccountForUpdate(address, accountKey, options)
```
`AccountForUpdate`의 인스턴스를 생성합니다. AccountForUpdate에는 계정의 주소와 업데이트할 새 공개키가 포함됩니다.

`AccountForUpdate`는 계정 업데이트 트랜잭션 객체(`ACCOUNT_UPDATE`, `FEE_DELEGATED_ACCOUNT_UPDATE` 또는 `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO`)에서 `key`로 사용할 수 있습니다. 트랜잭션에서 `AccountForUpdate`를 사용하는 방법을 알고 싶으시다면 [AccountForUpdate로 계정 업데이트](../get-started-1.4.1.md#account-update-with-accountforupdate)를 참조하세요.

caver.klay.accounts.createAccountForUpdate의 accountKey 매개변수는 개인 키여야 합니다.

[caver.klay.accounts.createAccountForUpdateWithPublicKey](#createaccountforupdatewithpublickey)로 공개키를 사용하여 AccountForUpdate 인스턴스를 만들 수 있습니다.

[caver.klay.accounts.createAccountForUpdateWithLegacyKey](#createaccountforupdatewithlegacykey)를 사용하여 [AccountKeyLegacy](../../../../learn/accounts.md#accountkeylegacy)로 업데이트하기 위한 AccountForUpdate 인스턴스를 생성하고, [caver.klay.accounts.createAccountForUpdateWithFailKey](#createaccountforupdatewithfailkey)를 사용하여 [AccountKeyFail](../../../../learn/accounts.md#accountkeyfail)로 업데이트할 AccountForUpdate 인스턴스를 생성할 수 있습니다.

**참고** `caver.klay.accounts.createAccountForUpdate`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| address | String | 계정 주소. |
| accountKey | String &#124; Array &#124; Object | 계정 키 인스턴스 (`AccountKeyPublic`, `AccountKeyMultiSig` 또는 `AccountKeyRoleBased`) 또는 동등한 키 정보 (개인 키 문자열, 개인 키 문자열의 배열 또는 역할이 있는 키를 정의하는 객체)를 반환합니다. 계정키가 계정키 인스턴스가 아닌 경우, 이 메서드는 내부적으로 [caver.klay.accounts.createAccountKey](#createaccountkey)를 호출하여 주어진 키 정보로부터 계정키 인스턴스를 생성합니다. |
| options | Object | 임계값과 가중치를 포함하는 선택적 객체입니다. 이 옵션은 AccountKeyMultiSig를 사용할 때 필요합니다. 사용법은 아래 예시에 나와 있습니다. |

**리턴 값**

`Object` - 다음 속성을 가진 AccountForUpdate 인스턴스가 반환됩니다:

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| address | String | 업데이트할 계정의 주소입니다. |
| keyForUpdate | Object | 주어진 계정 키에서 파생된 새 공개키가 포함된 객체입니다. |


**예시**

```javascript
// Create AccountForUpdate for AccountKeyPublic
> caver.klay.accounts.createAccountForUpdate('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', '0x{private key}')
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: { 
        publicKey: '0x24c32ee4f908ceed89e7501de2980fcb1d2add69080d3921f86c49de863eb2d507e24d9aaf91328b7f7cef2a94b538cb33b3f8cdd64925855ce0a4bf6e11f3db'
    }
}

// Create AccountForUpdate for AccountKeyMultiSig with an options object
> caver.klay.accounts.createAccountForUpdate('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', ['0x{private key}', '0x{private key}'], { threshold: 2, weight: [1,1] })
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: {
        multisig: {
            threshold: 2,
            keys: [
                {
                    weight: 1, 
                    publicKey: '0xc89f551ce9c569cf978f4f64833e447f177a83eda4f1883d770360ab35002dbdeb2d502cd33217238add013ea1c4ff5055ceda46473569824e336d0d64e9eeb2'
                },
                {
                    weight: 1, 
                    publicKey: '0xab0837fa3d61cf33dc4f3af4aca692d8c939566e1abbca0036fa3b29cd55b38a387f73baf59510d96680062bd129dd2bb8dcbb5ea5ed16c881f83a3251f73600'
                }
            ]
        }
    }
}

// Create AccountForUpdate for AccountKeyRoleBased with an options object
> caver.klay.accounts.createAccountForUpdate('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', { transactionKey: '0x{private key}', updateKey: ['0x{private key}', '0x{private key}'], feePayerKey: '0x{private key}' }, { updateKey: { threshold: 2, weight: [1,1] } })
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: { 
        roleTransactionKey: { 
            publicKey: '0x2b4a1d4ca1ee828f17e8c4c0ac0c0c46cf08f4b27fafc01e4b3481a4fe0891cacf315ed10b1df85bfd6797ea6c5ebafac437a7564eff355b11ad1e3d6e6c43a7'
        },
        roleAccountUpdateKey: { 
            multisig: { 
                threshold: 2,
                keys: [
                    { 
                        weight: 1,
                        publicKey: '0x26156615c8e503d96cd332a2fba6aab88b6156b983c89f586bcfc0443c0a7f2372d892d73c66d30f726f8269c75920a082eb2e57f6662d855389bb922ee263f3'
                    },
                    {
                        weight: 1,
                        publicKey: '0xafc139d2bcace02fa3d4b12926f976cf672f35a6ea2bc0f7e2e6d2ada0dd28f672acb8dcaedc694d6134a2f6c4aae472c9d67d30f760e16e742e01758c4daf83'
                    }
                ]
            }
        },
        roleFeePayerKey: {
            publicKey: '0xe55d39e147a0d5542d4bb965aeaa01e918c81a332ce47e0d3173179fe5b68c8c9264bec516d50bea0a7da7c3d8f98e124761a9b27434221d138ff8e22d932a0a'
        }
    }
}

// Create AccountForUpdate for AccountKeyRoleBased with legacy key or fail key
// When updating the key used for a specific role in AccountKeyRoleBased to AccountKeyLegacy or AccountKeyFailKey, define the role to update as follows.
> caver.klay.accounts.createAccountForUpdate('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', { transactionKey: 'legacyKey', updateKey: 'failKey' })
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: {
        roleTransactionKey: { legacyKey: true },
        roleAccountUpdateKey: { failKey: true }
    }
}
```

## createAccountForUpdateWithPublicKey <a id="createaccountforupdatewithpublickey"></a>

```javascript
caver.klay.accounts.createAccountForUpdateWithPublicKey(address, keyForUpdate, options)
```
업데이트할 새 키의 공개키를 사용하여 `AccountForUpdate` 인스턴스를 생성합니다.

`AccountForUpdate`는 계정 업데이트 트랜잭션 객체(`ACCOUNT_UPDATE`, `FEE_DELEGATED_ACCOUNT_UPDATE` 또는 `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO`)에서 `key`로 사용할 수 있습니다. 트랜잭션에서 `AccountForUpdate`를 사용하는 방법을 알고 싶으시다면 [AccountForUpdate로 계정 업데이트](../get-started-1.4.1.md#account-update-with-accountforupdate)를 참조하세요.

**참고** `caver.klay.accounts.createAccountForUpdateWithPublicKey`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| address | String | 계정 주소. |
| keyForUpdate | String &#124; Array &#124; Object | 업데이트할 새 키의 공개 키입니다. 이 값은 키가 AccountKeyPublic인 경우 단일 공개 키 문자열이고, AccountKeyMultiSig인 경우 공개 키 문자열 배열이며, 키가 AccountKeyRoleBased인 경우 객체입니다. |
| options | Object | 임계값과 가중치가 포함된 선택적 객체입니다. AccountKeyMultiSig를 사용할 때 필요합니다. AccountKeyMultiSig를 AccountKeyRoleBased의 키 중 하나로 사용하는 경우 임계값 및 가중치의 역할을 지정합니다. 사용법은 아래 예시에 나와 있습니다. |

**리턴 값**

`Object` - 계정 업데이트 인스턴스, [caver.klay.accounts.createAccountForUpdate](#createaccountforupdate)를 참조하세요.


**예시**

```javascript
// Create AccountForUpdate for AccountKeyPublic
> caver.klay.accounts.createAccountForUpdateWithPublicKey('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', '0x24c32ee4f908ceed89e7501de2980fcb1d2add69080d3921f86c49de863eb2d507e24d9aaf91328b7f7cef2a94b538cb33b3f8cdd64925855ce0a4bf6e11f3db')
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: { 
        publicKey: '0x24c32ee4f908ceed89e7501de2980fcb1d2add69080d3921f86c49de863eb2d507e24d9aaf91328b7f7cef2a94b538cb33b3f8cdd64925855ce0a4bf6e11f3db'
    }
}

// Create AccountForUpdate for AccountKeyMultiSig with an options object
> caver.klay.accounts.createAccountForUpdateWithPublicKey('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', ['0xc89f551ce9c569cf978f4f64833e447f177a83eda4f1883d770360ab35002dbdeb2d502cd33217238add013ea1c4ff5055ceda46473569824e336d0d64e9eeb2', '0xab0837fa3d61cf33dc4f3af4aca692d8c939566e1abbca0036fa3b29cd55b38a387f73baf59510d96680062bd129dd2bb8dcbb5ea5ed16c881f83a3251f73600'], { threshold: 2, weight: [1,1] })
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: {
        multisig: {
            threshold: 2,
            keys: [
                {
                    weight: 1, 
                    publicKey: '0xc89f551ce9c569cf978f4f64833e447f177a83eda4f1883d770360ab35002dbdeb2d502cd33217238add013ea1c4ff5055ceda46473569824e336d0d64e9eeb2'
                },
                {
                    weight: 1, 
                    publicKey: '0xab0837fa3d61cf33dc4f3af4aca692d8c939566e1abbca0036fa3b29cd55b38a387f73baf59510d96680062bd129dd2bb8dcbb5ea5ed16c881f83a3251f73600'
                }
            ]
        }
    }
}

// Create AccountForUpdate for AccountKeyRoleBased with an options object
> caver.klay.accounts.createAccountForUpdateWithPublicKey('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef', { transactionKey: '0x2b4a1d4ca1ee828f17e8c4c0ac0c0c46cf08f4b27fafc01e4b3481a4fe0891cacf315ed10b1df85bfd6797ea6c5ebafac437a7564eff355b11ad1e3d6e6c43a7', updateKey: ['0x26156615c8e503d96cd332a2fba6aab88b6156b983c89f586bcfc0443c0a7f2372d892d73c66d30f726f8269c75920a082eb2e57f6662d855389bb922ee263f3', '0xafc139d2bcace02fa3d4b12926f976cf672f35a6ea2bc0f7e2e6d2ada0dd28f672acb8dcaedc694d6134a2f6c4aae472c9d67d30f760e16e742e01758c4daf83'], feePayerKey: '0xe55d39e147a0d5542d4bb965aeaa01e918c81a332ce47e0d3173179fe5b68c8c9264bec516d50bea0a7da7c3d8f98e124761a9b27434221d138ff8e22d932a0a' }, { updateKey: { threshold: 2, weight: [1,1] } })
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: { 
        roleTransactionKey: { 
            publicKey: '0x2b4a1d4ca1ee828f17e8c4c0ac0c0c46cf08f4b27fafc01e4b3481a4fe0891cacf315ed10b1df85bfd6797ea6c5ebafac437a7564eff355b11ad1e3d6e6c43a7'
        },
        roleAccountUpdateKey: { 
            multisig: { 
                threshold: 2,
                keys: [
                    { 
                        weight: 1,
                        publicKey: '0x26156615c8e503d96cd332a2fba6aab88b6156b983c89f586bcfc0443c0a7f2372d892d73c66d30f726f8269c75920a082eb2e57f6662d855389bb922ee263f3'
                    },
                    {
                        weight: 1,
                        publicKey: '0xafc139d2bcace02fa3d4b12926f976cf672f35a6ea2bc0f7e2e6d2ada0dd28f672acb8dcaedc694d6134a2f6c4aae472c9d67d30f760e16e742e01758c4daf83'
                    }
                ]
            }
        },
        roleFeePayerKey: {
            publicKey: '0xe55d39e147a0d5542d4bb965aeaa01e918c81a332ce47e0d3173179fe5b68c8c9264bec516d50bea0a7da7c3d8f98e124761a9b27434221d138ff8e22d932a0a'
        }
    }
}
```

## createAccountForUpdateWithLegacyKey <a id="createaccountforupdatewithlegacykey"></a>

```javascript
caver.klay.accounts.createAccountForUpdateWithLegacyKey(address)
```
계정의 키를 [AccountKeyLegacy](../../../../learn/accounts.md#accountkeylegacy)로 업데이트하기 위해 AccountForUpdate 인스턴스를 만듭니다. 계정 키 레거시로 업데이트하기 전에 계정 주소와 일치하는 개인 키가 있는지 확인하세요.

`AccountForUpdate`는 계정 업데이트 트랜잭션 객체(`ACCOUNT_UPDATE`, `FEE_DELEGATED_ACCOUNT_UPDATE` 또는 `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO`)에서 `key`로 사용할 수 있습니다. 트랜잭션에서 `AccountForUpdate`를 사용하는 방법을 알고 싶으시다면 [AccountForUpdate로 계정 업데이트](../get-started-1.4.1.md#account-update-with-accountforupdate)를 참조하세요.

**참고** `caver.klay.accounts.createAccountForUpdateWithLegacyKey`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| address | String | 계정 주소. |

**리턴 값**

`Object` - 계정 업데이트 인스턴스, [caver.klay.accounts.createAccountForUpdate](#createaccountforupdate)를 참조하세요.


**예시**

```javascript
// Create AccountForUpdate for AccountKeyLegacy
> caver.klay.accounts.createAccountForUpdateWithLegacyKey('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef')
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: { legacyKey: true } 
}
```

## createAccountForUpdateWithFailKey <a id="createaccountforupdatewithfailkey"></a>

```javascript
caver.klay.accounts.createAccountForUpdateWithFailKey(address)
```
[AccountKeyFail](../../../../learn/accounts.md#accountkeyfail)로 계정의 키를 업데이트하기 위해 AccountForUpdate 인스턴스를 생성합니다. AccountKeyFail가 있는 계정에서 보낸 트랜잭션은 항상 유효성 검사 프로세스에서 실패합니다.

`AccountForUpdate`는 계정 업데이트 트랜잭션 객체(`ACCOUNT_UPDATE`, `FEE_DELEGATED_ACCOUNT_UPDATE` 또는 `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO`)에서 `key`로 사용할 수 있습니다. 트랜잭션에서 `AccountForUpdate`를 사용하는 방법을 알고 싶으시다면 [AccountForUpdate로 계정 업데이트](../get-started-1.4.1.md#account-update-with-accountforupdate)를 참조하세요.

**참고** `caver.klay.accounts.createAccountForUpdateWithFailKey`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| address | String | 계정 주소. |

**리턴 값**

`Object` - 계정 업데이트 인스턴스, [caver.klay.accounts.createAccountForUpdate](#createaccountforupdate)를 참조하세요.


**예시**

```javascript
// Create AccountForUpdate for AccountKeyFail
> caver.klay.accounts.createAccountForUpdateWithFailKey('0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef')
AccountForUpdate {
    address: '0x5B4EF8e2417DdE1b9B80BcfC35d1bfeF3D7234ef',
    keyForUpdate: { failKey: true } 
}
```

## signTransaction <a id="signtransaction"></a>

```javascript
caver.klay.accounts.signTransaction(tx [, privateKey] [, callback])
```

주어진 개인키를 사용하여 클레이튼 트랜잭션에 서명합니다.

caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 이후, 이 메서드는 일반 트랜잭션 객체뿐만 아니라 RLP 인코딩된 트랜잭션도 입력으로 받습니다. 다양한 트랜잭션 객체 유형에 대해서는 [caver.klay.sendTransaction](./caver.klay/transaction/transaction.md#sendtransaction)을 참조하세요. 이 메서드는 기본적으로 발신자로 서명합니다.
수수료 납부자로 서명하려면 [caver.klay.accounts.feePayerSignTransaction](#feepayersigntransaction)을 사용하는 것이 좋습니다. 그러나 수수료 납부자는 이 메서드를 사용하여 `{senderRawTransaction: rawTransaction, feePayer: feePayerAddress}` 객체를 `tx`로 전달하여 서명할 수 있습니다. senderRawTransaction은 FEE_DELEGATED_ 유형의 트랜잭션이어야 합니다.

또한 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 이후 signTransaction은 입력 트랜잭션에 기존 서명/수수료 지불자 서명을 유지하고 서명자의 서명을 추가합니다.

여러 사용자의 서명을 하나의 로우 트랜잭션으로 결합하는 방법은 [여러 서명자가 있는 트랜잭션 보내기](../get-started-1.4.1.md#sending-a-transaction-with-multiple-signer)를 참조하세요.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| tx | string &#124; Object | 트랜잭션 객체 또는 RLP 인코딩된 트랜잭션 문자열(rawTransaction). 트랜잭션 개체의 속성은 트랜잭션 유형에 따라 다릅니다. 각 트랜잭션 유형에 대한 설명은 [caver.klay.sendTransaction](./caver.klay/transaction/transaction.md#sendtransaction)을 참조하세요. |
| privateKey | String &#124; Array | (선택 사항) 서명할 개인키입니다. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 파라미터로 오류 객체를 반환하고 두 번째 파라미터로 결과를 반환합니다. |

**참고** `privateKey` 파라미터는 caver-js [v1.2.0-rc.3](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.3) 이후 `옵션 파라미터`로 변경되었습니다. 또한, caver-js [v1.2.0-rc.3](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.3) 부터 privateKey 파라미터는 개인키 문자열의 `array`를 지원합니다. 개인키를 전달하지 않으면 트랜잭션 서명을 위해 caver.klay.accounts.wallet에 `from` 또는 `feePayer` 계정이 존재해야 합니다. 개인키 배열을 제공하면 배열 안의 모든 키로 트랜잭션이 서명됩니다.

**참고** `tx` 매개변수는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 이후 RLP 인코딩된 트랜잭션을 허용합니다.

**리턴 값**

`promise`는 `object`를 반환합니다: RLP 인코딩된 서명된 트랜잭션입니다. 객체 프로퍼티는 다음과 같습니다:

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| messageHash | String | 주어진 메시지의 해시입니다. |
| r | String | ECDSA 서명 r. |
| s | String | ECDSA 서명 s. |
| v | String | ECDSA 복구 ID. |
| rawTransaction | String | caver.klay.sendSignedTransaction을 사용하여 전송할 준비가 된 RLP 인코딩된 트랜잭션입니다. |
| txHash | 32-byte String | 트랜잭션의 해시입니다. |
| senderTxHash | 32-byte String | 발신자만 서명한 트랜잭션의 해시입니다. [SenderTxHash](../../../../learn/transactions/transactions.md#sendertxhash)를 참조하세요.
| signatures | Array | (선택 사항) 발신자의 서명 배열입니다. |
| feePayerSignatures | Array | (선택 사항) 수수료 납부자의 서명 배열입니다. |

**참고** caver-js [v1.2.0-rc.3](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.3) 이후 서명 및 feePayerSignatures 프로퍼티가 추가되었습니다. 발신자가 트랜잭션에 서명하면 서명 배열이 `signatures`로 반환됩니다. 수수료 납부자가 서명하면 서명 배열이 `feePayerSignatures`에 반환됩니다.

**참고** 결과 객체의 `txHash`와 `senderTxHash`는 최종 값이 아닐 수 있습니다. 다른 발신자 서명이 추가되면 txHash와 senderTxHash가 변경됩니다. 수수료 납부자 서명이 추가되면 txHash가 변경됩니다.

**예시**

```javascript
// sign legacy transaction with private key string
> caver.klay.accounts.signTransaction({
    from: '0x72519cf34d9aa14629e7ad0cad5d55a3bb398364',
    to: '0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6',
    value: caver.utils.toPeb(1, `klay`),
    gas: 900000,
}, '0x{private key}').then(console.log)
{ 
    messageHash: '0xc4f3d98b901489c2c6e7bb9a5ddb4bc807b0251c6eac671356f01b66b749141f',
    v: '0x4e44',
    r: '0x2ef0d0c59ad302bcd73823879f6e1550e4bc6e6c38be69724c71ad6e09edde82',
    s: '0x602b1064ff5a6ba4718a493e50cf9e58ca9a9addf6ed4bbbc89fbc040a3c107e',
    rawTransaction: '0xf86f808505d21dba00830dbba094a9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6880de0b6b3a764000080824e44a02ef0d0c59ad302bcd73823879f6e1550e4bc6e6c38be69724c71ad6e09edde82a0602b1064ff5a6ba4718a493e50cf9e58ca9a9addf6ed4bbbc89fbc040a3c107e',
    txHash: '0x87e84bd1d9c512cfabe5ebce10597dd40bc6fe828a10e460b7c01075c76b71a5',
    senderTxHash: '0x87e84bd1d9c512cfabe5ebce10597dd40bc6fe828a10e460b7c01075c76b71a5',
    signatures: [ 
        '0x4e44',
        '0x2ef0d0c59ad302bcd73823879f6e1550e4bc6e6c38be69724c71ad6e09edde82',
        '0x602b1064ff5a6ba4718a493e50cf9e58ca9a9addf6ed4bbbc89fbc040a3c107e' 
    ] 
}

// signTransaction with private key string
> caver.klay.accounts.signTransaction({
    type: 'VALUE_TRANSFER',
    from: '0x72519cf34d9aa14629e7ad0cad5d55a3bb398364',
    to: '0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6',
    value: caver.utils.toPeb(1, `klay`),
    gas: 900000,
}, '0x{private key}').then(console.log)
{ 
    messageHash: '0xf003c68467424eed29b55d3d107167b207adb6bba66f8b9b73b7df824beb144c',
    v: '0x4e43',
    r: '0xea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5c',
    s: '0x5e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924',
    rawTransaction: '0x08f887808505d21dba00830dbba094a9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6880de0b6b3a76400009472519cf34d9aa14629e7ad0cad5d55a3bb398364f847f845824e43a0ea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5ca05e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924',
    txHash: '0x1b5759e8060ac01ba94437bd115ecf471ba05e144f4874dd5b82a8379aa98a63',
    senderTxHash: '0x1b5759e8060ac01ba94437bd115ecf471ba05e144f4874dd5b82a8379aa98a63',
    signatures: [ 
        [ 
            '0x4e43',
            '0xea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5c',
            '0x5e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924' 
        ]
    ]
}

// signTransaction without privateKey parameter
> caver.klay.accounts.signTransaction({
    type: 'VALUE_TRANSFER',
    from: '0x72519cf34d9aa14629e7ad0cad5d55a3bb398364',
    to: '0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6',
    value: caver.utils.toPeb(1, `klay`),
    gas: 900000,
}).then(console.log)
{ 
    messageHash: '0xf003c68467424eed29b55d3d107167b207adb6bba66f8b9b73b7df824beb144c',
    v: '0x4e43',
    r: '0xea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5c',
    s: '0x5e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924',
    rawTransaction: '0x08f887808505d21dba00830dbba094a9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6880de0b6b3a76400009472519cf34d9aa14629e7ad0cad5d55a3bb398364f847f845824e43a0ea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5ca05e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924',
    txHash: '0x1b5759e8060ac01ba94437bd115ecf471ba05e144f4874dd5b82a8379aa98a63',
    senderTxHash: '0x1b5759e8060ac01ba94437bd115ecf471ba05e144f4874dd5b82a8379aa98a63',
    signatures: [ 
        [ 
            '0x4e43',
            '0xea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5c',
            '0x5e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924' 
        ]
    ]
}

// signTransaction with array of private keys
> caver.klay.accounts.signTransaction({
    type: 'VALUE_TRANSFER',
    from: '0x72519cf34d9aa14629e7ad0cad5d55a3bb398364',
    to: '0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6',
    value: caver.utils.toPeb(1, `klay`),
    gas: 900000,
}, ['0x{private key}', '0x{private key}']).then(console.log)
{ 
    messageHash: '0xf003c68467424eed29b55d3d107167b207adb6bba66f8b9b73b7df824beb144c',
    v: '0x4e44',
    r: '0xf9e93c6dc3227a4cde633dc7a9b3c5e81ceb1879bfcf138d6205b2d49cdef60b',
    s: '0x0787d1a42c75d6d708ddb7552c6470ad15e58da6259cdf48e508f577187fad20',
    rawTransaction: '0x08f8ce808505d21dba00830dbba094a9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6880de0b6b3a76400009472519cf34d9aa14629e7ad0cad5d55a3bb398364f88ef845824e44a0f9e93c6dc3227a4cde633dc7a9b3c5e81ceb1879bfcf138d6205b2d49cdef60ba00787d1a42c75d6d708ddb7552c6470ad15e58da6259cdf48e508f577187fad20f845824e43a0ea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5ca05e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924',
    txHash: '0x1dfac8cb1ab9c25de93758652f3cded2537355e2207c45ba39442b7cb700e8fd',
    senderTxHash: '0x1dfac8cb1ab9c25de93758652f3cded2537355e2207c45ba39442b7cb700e8fd',
    signatures: [ 
        [ 
            '0x4e44',
            '0xf9e93c6dc3227a4cde633dc7a9b3c5e81ceb1879bfcf138d6205b2d49cdef60b',
            '0x0787d1a42c75d6d708ddb7552c6470ad15e58da6259cdf48e508f577187fad20' 
        ],
        [ 
            '0x4e43',
            '0xea3bba902857eb58bed048fd1b94c5d99881e4356221d6e1e6e873401abf3a5c',
            '0x5e5d250db3c31a193dbe5289935755461ad78e41c1f60d3ca80ae0a97d2a9924' 
        ]
    ] 
}

// signTransaction with fee payer's private key
> caver.klay.accounts.signTransaction({
    senderRawTransaction: '0x09f886819a8505d21dba00830dbba094d05c5926b0a2f31aadcc9a9cbd3868a50104d834019476d1cc1cdb081de8627cab2c074f02ebc7bce0d0f847f845820fe9a0c5ea5b57f460bbc76101bafa2ed16228af0c0094d31a8a799e430278b4360724a0240afd7cf426e6aababdc59a3935b97aac4e059b59ba85ccedc75c95168abcfb80c4c3018080',
    feePayer: '0x6e75945404daa4130a338af01199244b1eae2a0b'
}, '0x{private key}').then(console.log)
{ 
    messageHash: '0xec121b6f7e2925166bcb1e6f14fd0b078f1168b6feca9340db7bd31998d14043',
    v: '0x4e44',
    r: '0xf68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9',
    s: '0x5146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300',
    rawTransaction: '0x09f8de819a8505d21dba00830dbba094d05c5926b0a2f31aadcc9a9cbd3868a50104d834019476d1cc1cdb081de8627cab2c074f02ebc7bce0d0f847f845820fe9a0c5ea5b57f460bbc76101bafa2ed16228af0c0094d31a8a799e430278b4360724a0240afd7cf426e6aababdc59a3935b97aac4e059b59ba85ccedc75c95168abcfb946e75945404daa4130a338af01199244b1eae2a0bf847f845824e44a0f68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9a05146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300',
    txHash: '0xf31ab04d9ccdb93262a4349afabd68326db0d61452c06259ed8ea91bc09ca295',
    senderTxHash: '0x1b7c0f2fc7548056e90d9690e8c397acf99eb38e622ac91ee22c2085065f8a55',
    feePayerSignatures: [ 
        [ 
            '0x4e44',
            '0xf68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9',
            '0x5146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300' 
        ] 
    ] 
}

// signTransaction without fee payer's private key
> caver.klay.accounts.signTransaction({
    senderRawTransaction: '0x09f886819a8505d21dba00830dbba094d05c5926b0a2f31aadcc9a9cbd3868a50104d834019476d1cc1cdb081de8627cab2c074f02ebc7bce0d0f847f845820fe9a0c5ea5b57f460bbc76101bafa2ed16228af0c0094d31a8a799e430278b4360724a0240afd7cf426e6aababdc59a3935b97aac4e059b59ba85ccedc75c95168abcfb80c4c3018080',
    feePayer: '0x6e75945404daa4130a338af01199244b1eae2a0b'
}).then(console.log)
{ 
    messageHash: '0xec121b6f7e2925166bcb1e6f14fd0b078f1168b6feca9340db7bd31998d14043',
    v: '0x4e44',
    r: '0xf68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9',
    s: '0x5146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300',
    rawTransaction: '0x09f8de819a8505d21dba00830dbba094d05c5926b0a2f31aadcc9a9cbd3868a50104d834019476d1cc1cdb081de8627cab2c074f02ebc7bce0d0f847f845820fe9a0c5ea5b57f460bbc76101bafa2ed16228af0c0094d31a8a799e430278b4360724a0240afd7cf426e6aababdc59a3935b97aac4e059b59ba85ccedc75c95168abcfb946e75945404daa4130a338af01199244b1eae2a0bf847f845824e44a0f68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9a05146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300',
    txHash: '0xf31ab04d9ccdb93262a4349afabd68326db0d61452c06259ed8ea91bc09ca295',
    senderTxHash: '0x1b7c0f2fc7548056e90d9690e8c397acf99eb38e622ac91ee22c2085065f8a55',
    feePayerSignatures: [ 
        [ 
            '0x4e44',
            '0xf68d2c65563baee7a76d5f75aaadbfecf4ae3f55b349013f740159edd38465d9',
            '0x5146c0bbe998a7ba6e7c8f5aef7eb5fea0b4b7429713d65e38b2435f6a575300' 
        ] 
    ] 
}
```

## signTransactionWithHash <a id="signtransactionwithhash"></a>

```javascript
caver.klay.accounts.signTransactionWithHash(txHash, privateKeys [, chainId] [, callback])
```

주어진 트랜잭션 해시와 개인키로 클레이튼 트랜잭션에 서명합니다.

**참고** `caver.klay.accounts.signTransactionWithHash`는 caver-js [v1.3.2-rc.2](https://www.npmjs.com/package/caver-js/v/1.3.2-rc.2) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| txHash | String | 서명할 트랜잭션의 해시입니다. |
| privateKeys | String &#124; Array | 서명할 개인 키입니다. |
| chainId | String &#124; Number | (선택 사항) 체인의 체인아이디입니다. 생략하면 caver-js에서 [caver.klay.getChainId](./caver.klay/config.md#getchainid) 호출을 통해 설정됩니다.
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 파라미터로 오류 객체를 반환하고 두 번째 파라미터로 결과를 반환합니다. |

**리턴 값**

`Promise`를 반환하는 `Array`: 서명의 배열

배열의 각 서명 객체에는 다음과 같은 값이 있습니다:
| 이름 | 유형 | 설명 |
| --- | --- | --- |
| V | String | ECDSA 복구 ID. |
| R | String | ECDSA 서명 r. |
| S | String | ECDSA 서명 s. |

**예시**

```javascript
// sign transaction with single private key and chain id
> caver.klay.accounts.signTransactionWithHash('0x583d887614e1ce674c05fcd050a661f0631c23ed1f95fa43fefcc25e6383bca1', '0x{priavte key}', '0x3e9').then(console.log)
[
    {
        V: '0x07f5',
        R: '0x66eb2dbb90295b7541de72f2d34002bac3f00a94501453b310b25a0da62446a5',
        S: '0x1c7c3aefabc042b055489f5b899df55439fe1851858d61e8eb6c4b44be35c227'
    }
]

// sign transaction with single private key
> caver.klay.accounts.signTransactionWithHash('0x583d887614e1ce674c05fcd050a661f0631c23ed1f95fa43fefcc25e6383bca1', '0x{priavte key}').then(console.log)
[
    {
        V: '0x07f5',
        R: '0x66eb2dbb90295b7541de72f2d34002bac3f00a94501453b310b25a0da62446a5',
        S: '0x1c7c3aefabc042b055489f5b899df55439fe1851858d61e8eb6c4b44be35c227'
    }
]

// sign transaction with mulitple private keys and chain id
> caver.klay.accounts.signTransactionWithHash('0x583d887614e1ce674c05fcd050a661f0631c23ed1f95fa43fefcc25e6383bca1', ['0x{priavte key}', '0x{priavte key}'], '0x3e9').then(console.log)
[
    {
        V: '0x07f5',
        R: '0x66eb2dbb90295b7541de72f2d34002bac3f00a94501453b310b25a0da62446a5',
        S: '0x1c7c3aefabc042b055489f5b899df55439fe1851858d61e8eb6c4b44be35c227'
    },
    {
        V: '0x07f6',
        R: '0x946ce0288ee98b56160fadae8ec38e36828cf764f897f68f93157a2dc286d4aa',
        S: '0x049ab3f5e91cec831124bdb10782e38de3a02a803ca2dd61a50da81cf5c4f8ef'
    }
]

// sign transaction with mulitple private keys
> caver.klay.accounts.signTransactionWithHash('0x583d887614e1ce674c05fcd050a661f0631c23ed1f95fa43fefcc25e6383bca1', ['0x{priavte key}', '0x{priavte key}']).then(console.log)
[
    {
        V: '0x07f5',
        R: '0x66eb2dbb90295b7541de72f2d34002bac3f00a94501453b310b25a0da62446a5',
        S: '0x1c7c3aefabc042b055489f5b899df55439fe1851858d61e8eb6c4b44be35c227'
    },
    {
        V: '0x07f6',
        R: '0x946ce0288ee98b56160fadae8ec38e36828cf764f897f68f93157a2dc286d4aa',
        S: '0x049ab3f5e91cec831124bdb10782e38de3a02a803ca2dd61a50da81cf5c4f8ef'
    }
]
```

## feePayerSignTransaction <a id="feepayersigntransaction"></a>

```javascript
caver.klay.accounts.feePayerSignTransaction(tx, feePayerAddress [, privateKey] [, callback])
```

수수료 납부자로 거래에 서명합니다.

수수료 납부자는 수수료 위임 트랜잭션에 서명할 수 있습니다. 트랜잭션 객체 또는 RLP 인코딩된 트랜잭션을 인수로 전달할 수 있습니다.

privateKay가 제공되지 않으면 caver-js 인메모리 지갑 내 수수료 납부자 계정의 feePayerKey가 사용됩니다.

수수료 납부자 서명 트랜잭션은 입력 트랜잭션에 기존 서명/수수료 납부자 서명을 유지하고 여기에 수수료 납부자 서명을 추가합니다.

여러 사용자의 서명을 하나의 로우 트랜잭션으로 결합하는 방법은 [여러 서명자가 있는 트랜잭션 보내기](../get-started-1.4.1.md#sending-a-transaction-with-multiple-signer)를 참조하세요.

**참고** `caver.klay.accounts.feePayerSignTransaction`은 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 부터 지원됩니다.

**매개변수**


| 이름 | 유형 | 설명 |
| --- | --- | --- |
| tx | string &#124; Object | 트랜잭션 객체 또는 RLP 인코딩된 트랜잭션 문자열(rawTransaction). 트랜잭션 개체의 속성은 트랜잭션 유형에 따라 다릅니다. 각 트랜잭션 유형에 대한 설명은 [caver.klay.sendTransaction](./caver.klay/transaction/transaction.md#sendtransaction)을 참조하세요. |
| feePayerAddress | String | 수수료 납부자의 주소입니다.  |
| privateKey | String &#124; Array | (선택 사항) 서명할 개인키입니다. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`promise`는 `object`를 반환합니다: RLP 인코딩된 서명된 트랜잭션입니다. 객체 프로퍼티는 다음과 같습니다:

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| messageHash | String | 주어진 메시지의 해시입니다. |
| v | String | ECDSA 복구 ID. |
| r | String | ECDSA 서명 r. |
| s | String | ECDSA 서명 s. |
| rawTransaction | String | caver.klay.sendSignedTransaction을 사용하여 전송할 준비가 된 RLP 인코딩된 트랜잭션입니다. |
| txHash | 32-byte String | 트랜잭션의 해시입니다. |
| senderTxHash | 32-byte String | 발신자만 서명한 트랜잭션의 해시입니다. [SenderTxHash](../../../../learn/transactions/transactions.md#sendertxhash) 참조 |
| feePayerSignatures | Array | 수수료 납부자의 서명 배열입니다. |

**참고** 결과 객체의 `txHash`와 `senderTxHash`는 최종 값이 아닐 수 있습니다. 다른 발신자 서명이 추가되면 txHash와 senderTxHash가 변경됩니다. 수수료 납부자 서명이 추가되면 txHash가 변경됩니다.

**예시**

```javascript
// feePayerSignTransaction with transaction object
> caver.klay.accounts.feePayerSignTransaction({
    type: 'FEE_DELEGATED_VALUE_TRANSFER',
    from: '0x9230c09295dd8b9c02b6ae138ffe3133b58b25c1',
    to: '0x715139255d5e300b431722ec9666ac2350cbf523',
    value: 1,
    gas: 900000,
}, '0x2e4351e950d8d43444ac789cc9e87ba35340ad52', '0x90300d268bb2bad69f5b24e2ac1409a9416cc814254b356ce96b3f75c4364716').then(console.log)
{
    messageHash: '0x4cc0a423199d374d412cd3f92777a8f82bfc47b701d0df1f82b0d932802c955e',
    v: '0x4e44',
    r: '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
    s: '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    rawTransaction: '0x09f899808505d21dba00830dbba094715139255d5e300b431722ec9666ac2350cbf52301949230c09295dd8b9c02b6ae138ffe3133b58b25c1c4c3018080942e4351e950d8d43444ac789cc9e87ba35340ad52f847f845824e44a02a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730a04fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    txHash: '0xead2cdf961090d014044de7ac78e3f9522b430edcd0ea4d3299811464ed636ea',
    senderTxHash: '0x5e0bfce81dca4d6ec5ebeaff8a55fe5dd6d77e6292ee0548c12d7a7aaaff1300',
    feePayerSignatures: [
        [
            '0x4e44',
            '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
            '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7'
        ]
    ]
}

// feePayerSignTransaction with transaction object defines signatures
// rawTransaction in result will include signatures
> caver.klay.accounts.feePayerSignTransaction({
    type: 'FEE_DELEGATED_VALUE_TRANSFER',
    from: '0x9230c09295dd8b9c02b6ae138ffe3133b58b25c1',
    to: '0x715139255d5e300b431722ec9666ac2350cbf523',
    value: 1,
    gas: 900000,
    signatures: [['0x4e44', '0xd31041fe47da32fe03cf644186f50f39beaa969f73deb189d1a51706715215ec', '0x335961d9b38027a01d6b97842c036725a8d4781b5010c47ddb85756687c2def9']]
}, '0x2e4351e950d8d43444ac789cc9e87ba35340ad52', '0x90300d268bb2bad69f5b24e2ac1409a9416cc814254b356ce96b3f75c4364716').then(console.log)
{
    messageHash: '0x4cc0a423199d374d412cd3f92777a8f82bfc47b701d0df1f82b0d932802c955e',
    v: '0x4e44',
    r: '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
    s: '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    rawTransaction: '0x09f8dd808505d21dba00830dbba094715139255d5e300b431722ec9666ac2350cbf52301949230c09295dd8b9c02b6ae138ffe3133b58b25c1f847f845824e44a0d31041fe47da32fe03cf644186f50f39beaa969f73deb189d1a51706715215eca0335961d9b38027a01d6b97842c036725a8d4781b5010c47ddb85756687c2def9942e4351e950d8d43444ac789cc9e87ba35340ad52f847f845824e44a02a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730a04fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    txHash: '0x19006aa7228aa50000bab00ecccde8232516b8e1dce6835528d57561a79b5d3d',
    senderTxHash: '0x7aa6d0b4146020ae38c07c2c9efc26030bd667b9256981379b8cbc86acfd5b27',
    feePayerSignatures: [
        [
            '0x4e44',
            '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
            '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7'
        ]
    ]
}

// feePayerSignTransaction with transaction object defines feePayerSignatures
> caver.klay.accounts.feePayerSignTransaction({
    type: 'FEE_DELEGATED_VALUE_TRANSFER',
    from: '0x9230c09295dd8b9c02b6ae138ffe3133b58b25c1',
    to: '0x715139255d5e300b431722ec9666ac2350cbf523',
    value: 1,
    gas: 900000,
    feePayerSignatures: [['0x4e44', '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730', '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7']]
}, '0x2e4351e950d8d43444ac789cc9e87ba35340ad52', ['0xa39599bb66c9f2346f789398d72232e9f218a0ec37e7bcf61cf40e52d860e3f7', '0x8d4c1ffd743faefc711e72f17ff370419ece777c6be2e6a84ac1986806fd57ea']).then(console.log)
{
    messageHash: '0x4cc0a423199d374d412cd3f92777a8f82bfc47b701d0df1f82b0d932802c955e',
    v: '0x4e44',
    r: '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
    s: '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    rawTransaction: '0x09f90127808505d21dba00830dbba094715139255d5e300b431722ec9666ac2350cbf52301949230c09295dd8b9c02b6ae138ffe3133b58b25c1c4c3018080942e4351e950d8d43444ac789cc9e87ba35340ad52f8d5f845824e44a02a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730a04fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7f845824e44a0ec9ab57810b1f02960f2150b7931aefde5d8df9333b436ff11bc9666783358e3a055602d262c0b0ead09359ab0f00138dd7b5754d02694b4ee118bc99c9d8c44adf845824e44a030afe3d18d5a9e2b54d30326de856dbf9cf797e7ade2317d53675913129f863ca0711ab4c6cd60935c0b633679aac55f58443becd4194317f69746d2e829ad881c',
    txHash: '0x2226428e0ca7221ba091d34efbb6e1575e90affc3901550850b479fbfe00f084',
    senderTxHash: '0x5e0bfce81dca4d6ec5ebeaff8a55fe5dd6d77e6292ee0548c12d7a7aaaff1300',
    feePayerSignatures: [
        [
            '0x4e44',
            '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
            '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7'
        ],
        [
            '0x4e44',
            '0xec9ab57810b1f02960f2150b7931aefde5d8df9333b436ff11bc9666783358e3',
            '0x55602d262c0b0ead09359ab0f00138dd7b5754d02694b4ee118bc99c9d8c44ad'
        ],
        [
            '0x4e44',
            '0x30afe3d18d5a9e2b54d30326de856dbf9cf797e7ade2317d53675913129f863c',
            '0x711ab4c6cd60935c0b633679aac55f58443becd4194317f69746d2e829ad881c'
        ]
    ]
}

// feePayerSignTransaction with RLP encoded transaction string(rawTransaction)
> caver.klay.accounts.feePayerSignTransaction('0x09f885808505d21dba00830dbba094715139255d5e300b431722ec9666ac2350cbf52301949230c09295dd8b9c02b6ae138ffe3133b58b25c1f847f845824e44a0d31041fe47da32fe03cf644186f50f39beaa969f73deb189d1a51706715215eca0335961d9b38027a01d6b97842c036725a8d4781b5010c47ddb85756687c2def980c4c3018080', '0x2e4351e950d8d43444ac789cc9e87ba35340ad52', '0x90300d268bb2bad69f5b24e2ac1409a9416cc814254b356ce96b3f75c4364716').then(console.log)
{
    messageHash: '0x4cc0a423199d374d412cd3f92777a8f82bfc47b701d0df1f82b0d932802c955e',
    v: '0x4e44',
    r: '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
    s: '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    rawTransaction: '0x09f8dd808505d21dba00830dbba094715139255d5e300b431722ec9666ac2350cbf52301949230c09295dd8b9c02b6ae138ffe3133b58b25c1f847f845824e44a0d31041fe47da32fe03cf644186f50f39beaa969f73deb189d1a51706715215eca0335961d9b38027a01d6b97842c036725a8d4781b5010c47ddb85756687c2def9942e4351e950d8d43444ac789cc9e87ba35340ad52f847f845824e44a02a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730a04fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7',
    txHash: '0x19006aa7228aa50000bab00ecccde8232516b8e1dce6835528d57561a79b5d3d',
    senderTxHash: '0x7aa6d0b4146020ae38c07c2c9efc26030bd667b9256981379b8cbc86acfd5b27',
    feePayerSignatures: [
        [
            '0x4e44',
            '0x2a2cdce5dd2fea8e717f94457700ca9cfa43fd5b09b57b1c8dc9cd2e73ac2730',
            '0x4fdf1e4483f8c07c5ea180eea1af11fcd7fc32f6b6dded39eb8cb4a1f2e9f5a7'
        ]
    ]
}
```

## recoverTransaction <a id="recovertransaction"></a>

```javascript
caver.klay.accounts.recoverTransaction(rawTransaction)
```
주어진 RLP 인코딩된 트랜잭션에 서명하는 데 사용된 클레이튼 주소를 복구합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| signature | String | RLP 인코딩된 트랜잭션입니다. |

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| string | 이 트랜잭션에 서명하는 데 사용된 클레이튼 주소입니다. |

**예시**

```js
> caver.klay.accounts.recoverTransaction('0xf86180808401ef364594f0109fc8df283027b6285cc889f5aa624eac1f5580801ca031573280d608f75137e33fc14655f097867d691d5c4c44ebe5ae186070ac3d5ea0524410802cdc025034daefcdfa08e7d2ee3f0b9d9ae184b2001fe0aff07603d9');
'0xF0109fC8DF283027b6285cc889F5aA624EaC1F55'
```


## hashMessage <a id="hashmessage"></a>

```javascript
caver.klay.accounts.hashMessage(message)
```

주어진 메시지를 해시 처리하여 [caver.klay.accounts.recover](#recover)로 전달합니다.
데이터는 UTF-8 HEX로 디코딩되어 다음과 같이 인코딩됩니다:
```
"\x19Klaytn Signed Message:\n" + message.length + message
```
를 사용하여 해시됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| message | String | 해시할 메시지입니다.  HEX 문자열인 경우 UTF-8로 먼저 디코딩됩니다. |


**리턴 값**

| 유형 | 설명 |
| --- | --- |
| string | 해시된 메시지 |


**예시**

```javascript
> caver.klay.accounts.hashMessage("Hello World")
'0xf334bf277b674260e85f1a3d2565d76463d63d29549ef4fa6d6833207576b5ba'

// the below results in the same hash
> caver.klay.accounts.hashMessage(caver.utils.utf8ToHex("Hello World"))
'0xf334bf277b674260e85f1a3d2565d76463d63d29549ef4fa6d6833207576b5ba'
```


## sign <a id="sign"></a>

```javascript
caver.klay.accounts.sign(data, privateKey)
```
임의의 데이터에 서명합니다. 이 데이터는 UTF-8 HEX로 디코딩되기 전의 데이터이며 다음과 같이 인코딩됩니다:
```
"\x19Klaytn Signed Message:\n" + message.length + message
```

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| data | String | 서명할 데이터입니다. |
| privateKey | String | 서명할 개인 키입니다. |


**리턴 값**

문자열|`Object``: 서명된 데이터 RLP 인코딩된 서명입니다. 서명 값은 다음과 같습니다:

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| message | String | 주어진 메시지입니다. |
| 메시지 해시 | String | 주어진 메시지의 해시입니다. |
| r | String | ECDSA 서명 r. |
| s | String | ECDSA 서명 s. |
| v | String | ECDSA 복구 ID. |
| signature | String | 생성된 서명입니다. |


**예시**

```javascript
> caver.klay.accounts.sign('Some data', '0x{private key}');
{
    message: 'Some data',
    messageHash: '0x8ed2036502ed7f485b81feaec1c581d236a8b711e55a24077724879c8a263c2a',
    v: '0x1b',
    r: '0x4a57bcff1637346a4323a67acd7a478514d9f00576f42942d50a5ca0e4b0342b',
    s: '0x5914e19a8ebc10ce1450b00a3b9c1bf0ce01909bca3ffdead1aa3a791a97b5ac',
    signature: '0x4a57bcff1637346a4323a67acd7a478514d9f00576f42942d50a5ca0e4b0342b5914e19a8ebc10ce1450b00a3b9c1bf0ce01909bca3ffdead1aa3a791a97b5ac1b'
}
```


## recover <a id="recover"></a>

```javascript
caver.klay.accounts.recover(signatureObject)
caver.klay.accounts.recover(message, signature [, preFixed])
caver.klay.accounts.recover(message, v, r, s [, preFixed])
```
주어진 데이터에 서명하는 데 사용된 클레이튼 주소를 복구합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| message &#124; signatureObject | String &#124; Object | 서명된 메시지 또는 해시. 서명 객체에 대한 자세한 내용은 아래 표를 참조하세요. |
| messageHash | String | 주어진 메시지의 해시입니다. |
| signature | String | Raw RLP 인코딩된 서명, 또는 매개변수 2-4를 v, r, s 값으로 입력합니다. |
| preFixed | Boolean | (선택 사항, 기본값: ``false``) 마지막 매개변수가 ``true``인 경우, 주어진 메시지에 ``"\x19Klaytn 서명된 메시지:\n" + message.length + message``가 자동으로 접두사로 붙지 않으며 이미 접두사가 붙은 것으로 간주합니다. |

서명 객체의 값은 다음과 같습니다:

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| messageHash | String | `"\x19Klaytn Signed Message:\n" + message.length + message`가 이미 접두사로 붙은 지정된 메시지의 해시입니다. |
| r | String | ECDSA 서명 r. |
| s | String | ECDSA 서명 s. |
| v | String | ECDSA 복구 ID. |


**리턴 값**

| 유형 | 설명 |
| --- | --- |
| string | 이 데이터에 서명하는 데 사용된 클레이튼 주소입니다. |


**예시**

```javascript
> caver.klay.accounts.recover({
      messageHash: '0x8ed2036502ed7f485b81feaec1c581d236a8b711e55a24077724879c8a263c2a',
      v: '0x1b',
      r: '0x4a57bcff1637346a4323a67acd7a478514d9f00576f42942d50a5ca0e4b0342b',
      s: '0x5914e19a8ebc10ce1450b00a3b9c1bf0ce01909bca3ffdead1aa3a791a97b5ac',
  })
'0x2c7536E3605D9C16a7a3D7b1898e529396a65c23'

// message, signature
> caver.klay.accounts.recover('Some data', '0x4a57bcff1637346a4323a67acd7a478514d9f00576f42942d50a5ca0e4b0342b5914e19a8ebc10ce1450b00a3b9c1bf0ce01909bca3ffdead1aa3a791a97b5ac1b');
'0x2c7536E3605D9C16a7a3D7b1898e529396a65c23'

// message, v, r, s
> caver.klay.accounts.recover('Some data', '0x1b', '0x4a57bcff1637346a4323a67acd7a478514d9f00576f42942d50a5ca0e4b0342b', '0x5914e19a8ebc10ce1450b00a3b9c1bf0ce01909bca3ffdead1aa3a791a97b5ac');
'0x2c7536E3605D9C16a7a3D7b1898e529396a65c23'
```

## combineSignatures <a id="combinesignatures"></a>

```javascript
caver.klay.accounts.combineSignatures(rawTransactions)
```

RLP 인코딩된 트랜잭션 문자열 배열을 단일 RLP 인코딩된 트랜잭션 문자열로 결합합니다. 결합하려는 RLP 인코딩된 트랜잭션 문자열은 모두 동일한 트랜잭션에 서명해야 합니다.

결합서명은 서명 또는 수수료 지불자 서명에서 중복을 제거합니다.

**참고** `caver.klay.accounts.combineSignatures`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| rawTransactions | Array | RLP 인코딩된 트랜잭션 문자열(rawTransaction)의 배열입니다. |

**리턴 값**

`Promise`가 `object`를 반환합니다: RLP 인코딩된 트랜잭션입니다. 객체 프로퍼티는 다음과 같습니다:

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| rawTransaction | String | caver.klay.sendSignedTransaction을 사용하여 전송할 준비가 된 RLP 인코딩된 트랜잭션입니다. |
| txHash | 32-byte String | 트랜잭션의 해시입니다. |
| senderTxHash | 32-byte String | 발신자만 서명한 트랜잭션의 해시입니다. [SenderTxHash](../../../../learn/transactions/transactions.md#sendertxhash)를 참조하세요.
| signatures | Array | (선택 사항) 결합된 RLP 인코딩된 트랜잭션(rawTransaction)의 모든 서명. 서명이 없는 경우, 결과 객체에서 `signatures` 속성이 반환되지 않습니다. |
| feePayerSignatures | Array | (선택 사항) 결합된 RLP 인코딩 트랜잭션(rawTransaction)의 모든 수수료 지불자 서명. 수수료 지불자 서명이 없는 경우, 결과 객체에서 `feePayerSignatures` 속성이 반환되지 않습니다. |

**참고** 결과 객체의 `txHash`와 `senderTxHash`는 최종 값이 아닐 수 있습니다. 다른 발신자 서명이 추가되면 txHash와 senderTxHash가 변경됩니다. 수수료 납부자 서명이 추가되면 txHash가 변경됩니다.

**예시**

```javascript
> caver.klay.accounts.combineSignatures([
    '0x39f8b6128505d21dba00830dbba094596c3b874dc5775c3969b09a3115f453c20a59abf88ef845824e44a0f530749561d1cf87571b2c3050ded6acc94621eb984335129f4057e843109e30a0738aef5227c29c022167d9e95f4090b9a49ef550d5deaaa25c1f6298ea3a5292f845824e43a01fa5a80bb06f5787b1ac81d8b48578627be7a3b725d2e3722a85b0e31f71a445a003dff23bb2947d1819ec91eb695e8bc8b96bc591a2b855fa1495f5bbf896b91780c4c3018080',
    '0x39f90155128505d21dba00830dbba094596c3b874dc5775c3969b09a3115f453c20a59abf88ef845824e44a0f530749561d1cf87571b2c3050ded6acc94621eb984335129f4057e843109e30a0738aef5227c29c022167d9e95f4090b9a49ef550d5deaaa25c1f6298ea3a5292f845824e44a06a28576af9368a2056ba61d21390f484b487eba2210ee99b76615441a78f375da05d39f38e05d2ea80c2c1150374ca77d46b119d040101ebfc593f2a1963da409694120d8dc88b44fd8aa4dfab82c4078c7a7ee6c1edf88ef845824e44a00ca8405f35535cf82105a0596fcbd5c4cf228ce0d269c760246f9e10d6820566a02f905e44a2db94fe985158f81979cbcb7ba138cb1f2fb82bc9bd043701ec2025f845824e44a0feb42d7ed1519f93ddbc3093834934c6c7a15d843dfc8e7d14f78ecf3aa1d848a0271a2e8caf98d6ab79f9f4f6fdbe1c01e85aeea503b350ec69c6580320d53b06',
]).then(console.log)
{
    rawTransaction: '0x39f9019c128505d21dba00830dbba094596c3b874dc5775c3969b09a3115f453c20a59abf8d5f845824e44a0f530749561d1cf87571b2c3050ded6acc94621eb984335129f4057e843109e30a0738aef5227c29c022167d9e95f4090b9a49ef550d5deaaa25c1f6298ea3a5292f845824e43a01fa5a80bb06f5787b1ac81d8b48578627be7a3b725d2e3722a85b0e31f71a445a003dff23bb2947d1819ec91eb695e8bc8b96bc591a2b855fa1495f5bbf896b917f845824e44a06a28576af9368a2056ba61d21390f484b487eba2210ee99b76615441a78f375da05d39f38e05d2ea80c2c1150374ca77d46b119d040101ebfc593f2a1963da409694120d8dc88b44fd8aa4dfab82c4078c7a7ee6c1edf88ef845824e44a00ca8405f35535cf82105a0596fcbd5c4cf228ce0d269c760246f9e10d6820566a02f905e44a2db94fe985158f81979cbcb7ba138cb1f2fb82bc9bd043701ec2025f845824e44a0feb42d7ed1519f93ddbc3093834934c6c7a15d843dfc8e7d14f78ecf3aa1d848a0271a2e8caf98d6ab79f9f4f6fdbe1c01e85aeea503b350ec69c6580320d53b06',
    txHash: '0x3dac67978ffca834e6ff188e5937d81daab0669a7871f6ffae4ede53fb2a20ac',
    senderTxHash: '0xbb29f73faca65b39b1d33d94e23343f48f22a05531989d031f557460b08f27d4',
    signatures: [
        [
            '0x4e44',
            '0xf530749561d1cf87571b2c3050ded6acc94621eb984335129f4057e843109e30',
            '0x738aef5227c29c022167d9e95f4090b9a49ef550d5deaaa25c1f6298ea3a5292',
        ],
        [
            '0x4e43',
            '0x1fa5a80bb06f5787b1ac81d8b48578627be7a3b725d2e3722a85b0e31f71a445',
            '0x03dff23bb2947d1819ec91eb695e8bc8b96bc591a2b855fa1495f5bbf896b917',
        ],
        [
            '0x4e44',
            '0x6a28576af9368a2056ba61d21390f484b487eba2210ee99b76615441a78f375d',
            '0x5d39f38e05d2ea80c2c1150374ca77d46b119d040101ebfc593f2a1963da4096',
        ],
    ],
    feePayerSignatures: [
        [
            '0x4e44',
            '0x0ca8405f35535cf82105a0596fcbd5c4cf228ce0d269c760246f9e10d6820566',
            '0x2f905e44a2db94fe985158f81979cbcb7ba138cb1f2fb82bc9bd043701ec2025',
        ],
        [
            '0x4e44',
            '0xfeb42d7ed1519f93ddbc3093834934c6c7a15d843dfc8e7d14f78ecf3aa1d848',
            '0x271a2e8caf98d6ab79f9f4f6fdbe1c01e85aeea503b350ec69c6580320d53b06',
        ],
    ],
}
```

## getRawTransactionWithSignatures <a id="getrawtransactionwithsignatures"></a>

```javascript
caver.klay.accounts.getRawTransactionWithSignatures(tx [, callback])
```

지정된 트랜잭션 객체에서 서명된 RLP 인코딩된 트랜잭션 문자열을 반환합니다. 트랜잭션 객체는 서명과 수수료 지불자 서명을 제공해야 합니다.

**참고** `caver.klay.accounts.getRawTransactionWithSignatures`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| tx | Object | 서명 및 수수료 납부자 서명이 포함된 트랜잭션 객체입니다. 트랜잭션 객체의 속성은 트랜잭션 유형에 따라 다릅니다. 각 트랜잭션 유형에 대한 설명은 [caver.klay.sendTransaction](./caver.klay/transaction/transaction.md#sendtransaction)을 참조하세요. |

**리턴 값**

`Promise`가 `object`를 반환합니다: RLP 인코딩된 트랜잭션입니다. 객체 프로퍼티는 다음과 같습니다:

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| rawTransaction | String | caver.klay.sendSignedTransaction을 사용하여 전송할 준비가 된 RLP 인코딩된 트랜잭션입니다. |
| txHash | 32-byte String | 트랜잭션의 해시입니다. |
| senderTxHash | 32-byte String | 발신자만 서명한 트랜잭션의 해시입니다. [SenderTxHash](../../../../learn/transactions/transactions.md#sendertxhash)를 참조하세요.
| signatures | Array | (선택 사항) RLP 인코딩된 트랜잭션(rawTransaction)의 모든 서명. 서명이 없는 경우, 결과 객체에서 `signatures` 속성이 반환되지 않습니다. |
| feePayerSignatures | Array | (선택 사항) RLP 인코딩된 트랜잭션(rawTransaction)의 모든 수수료 지불자 서명. 수수료 지불자 서명이 없는 경우, 결과 객체에서 `feePayerSignatures` 속성이 반환되지 않습니다. |

**참고** 결과 객체에 포함된 `txHash`와 `senderTxHash`는 최종 값이 아닐 수 있습니다. 발신자의 서명이 추가되면 txHash와 senderTxHash가 달라집니다. 수수료 납부자의 서명이 추가되면 txHash가 달라집니다.

**예시**

```javascript
// get rawTransaction with signatures
> caver.klay.accounts.getRawTransactionWithSignatures({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: '0x85fd20bcbd1dcf73073c0abfa72afbde5e8c9a79',
    to: '0x6757d85d8b636044ef3bd2904daf8883cd2e3381',
    data: '0xd14e62b80000000000000000000000000000000000000000000000000000000000000005',
    gas: '0xdbba0',
    chainId: '0x2710',
    gasPrice: '0x5d21dba00',
    nonce: '0xf',
    humanReadable: false,
    signatures: [
        [
            '0x4e43',
            '0x9610d4f6d6f55e44f5f29f1a08538c9871d39c7295834db5a28b7358cf23a8a6',
            '0x6dc41f04c570a08a20aadc8eb4801aa3ee68b11f280e14d0e458f97f8c708175',
        ],
        [
            '0x4e44',
            '0x35cc2637cd68799f9a71c8e79fb5171351dd3cb5402dc0a3f291728527c9db48',
            '0x7e3ac1ac64094ebc49c41ff6cb57b8f8eae18f5d7f2db0900117d816a1e30594',
        ],
        [
            '0x4e44',
            '0xfc4fe6436212d35a2417e3414119608f626400bd265fba0417f80a7cf9694a20',
            '0x7d0f996f41355b18781833a6e227356db03bcec71d0c16a4d7249eaa3fe89507',
        ],
    ],
}).then(console.log)
{
    rawTransaction: '0x31f901380f8505d21dba00830dbba0946757d85d8b636044ef3bd2904daf8883cd2e3381809485fd20bcbd1dcf73073c0abfa72afbde5e8c9a79a4d14e62b80000000000000000000000000000000000000000000000000000000000000005f8d5f845824e43a09610d4f6d6f55e44f5f29f1a08538c9871d39c7295834db5a28b7358cf23a8a6a06dc41f04c570a08a20aadc8eb4801aa3ee68b11f280e14d0e458f97f8c708175f845824e44a035cc2637cd68799f9a71c8e79fb5171351dd3cb5402dc0a3f291728527c9db48a07e3ac1ac64094ebc49c41ff6cb57b8f8eae18f5d7f2db0900117d816a1e30594f845824e44a0fc4fe6436212d35a2417e3414119608f626400bd265fba0417f80a7cf9694a20a07d0f996f41355b18781833a6e227356db03bcec71d0c16a4d7249eaa3fe8950780c4c3018080',
    txHash: '0x94e6edb47fa258671745a433f1a08f5546b18a634f43e854c2bec1a40a7e8df0',
    senderTxHash: '0xcb1138abbef61a42cc846957b72a27329e80395911593f201f49c70c06408385',
    signatures: [
        [
            '0x4e43',
            '0x9610d4f6d6f55e44f5f29f1a08538c9871d39c7295834db5a28b7358cf23a8a6',
            '0x6dc41f04c570a08a20aadc8eb4801aa3ee68b11f280e14d0e458f97f8c708175',
        ],
        [
            '0x4e44',
            '0x35cc2637cd68799f9a71c8e79fb5171351dd3cb5402dc0a3f291728527c9db48',
            '0x7e3ac1ac64094ebc49c41ff6cb57b8f8eae18f5d7f2db0900117d816a1e30594',
        ],
        [
            '0x4e44',
            '0xfc4fe6436212d35a2417e3414119608f626400bd265fba0417f80a7cf9694a20',
            '0x7d0f996f41355b18781833a6e227356db03bcec71d0c16a4d7249eaa3fe89507',
        ],
    ],
}

// get rawTransaction with signatures and feePayerSignatures
> caver.klay.accounts.getRawTransactionWithSignatures({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: '0x85fd20bcbd1dcf73073c0abfa72afbde5e8c9a79',
    to: '0x6757d85d8b636044ef3bd2904daf8883cd2e3381',
    data: '0xd14e62b80000000000000000000000000000000000000000000000000000000000000005',
    gas: '0xdbba0',
    chainId: '0x2710',
    gasPrice: '0x5d21dba00',
    nonce: '0xf',
    humanReadable: false,
    signatures: [
        [
            '0x4e43',
            '0x9610d4f6d6f55e44f5f29f1a08538c9871d39c7295834db5a28b7358cf23a8a6',
            '0x6dc41f04c570a08a20aadc8eb4801aa3ee68b11f280e14d0e458f97f8c708175',
        ],
        [
            '0x4e44',
            '0x35cc2637cd68799f9a71c8e79fb5171351dd3cb5402dc0a3f291728527c9db48',
            '0x7e3ac1ac64094ebc49c41ff6cb57b8f8eae18f5d7f2db0900117d816a1e30594',
        ],
        [
            '0x4e44',
            '0xfc4fe6436212d35a2417e3414119608f626400bd265fba0417f80a7cf9694a20',
            '0x7d0f996f41355b18781833a6e227356db03bcec71d0c16a4d7249eaa3fe89507',
        ],
    ],
    feePayer: '0x918f31cce0d9582882663fe9099226d3912c9d13',
    feePayerSignatures: [
        [
            '0x4e44',
            '0x5991f915a32ad719da138efecdcc3d169ad71fde31eba03be91991681d53f881',
            '0x3653c82d6d99839699c3dfea470fcc777cda5b6185a1678c19d5fd7605c04a97',
        ],
    ],
}).then(console.log)
{
    rawTransaction: '0x31f901900f8505d21dba00830dbba0946757d85d8b636044ef3bd2904daf8883cd2e3381809485fd20bcbd1dcf73073c0abfa72afbde5e8c9a79a4d14e62b80000000000000000000000000000000000000000000000000000000000000005f8d5f845824e43a09610d4f6d6f55e44f5f29f1a08538c9871d39c7295834db5a28b7358cf23a8a6a06dc41f04c570a08a20aadc8eb4801aa3ee68b11f280e14d0e458f97f8c708175f845824e44a035cc2637cd68799f9a71c8e79fb5171351dd3cb5402dc0a3f291728527c9db48a07e3ac1ac64094ebc49c41ff6cb57b8f8eae18f5d7f2db0900117d816a1e30594f845824e44a0fc4fe6436212d35a2417e3414119608f626400bd265fba0417f80a7cf9694a20a07d0f996f41355b18781833a6e227356db03bcec71d0c16a4d7249eaa3fe8950794918f31cce0d9582882663fe9099226d3912c9d13f847f845824e44a05991f915a32ad719da138efecdcc3d169ad71fde31eba03be91991681d53f881a03653c82d6d99839699c3dfea470fcc777cda5b6185a1678c19d5fd7605c04a97',
    txHash: '0xf015dd519c909a80c111219ab2c5139d01a2e4121f801e8f45e519eafd421db6',
    senderTxHash: '0xcb1138abbef61a42cc846957b72a27329e80395911593f201f49c70c06408385',
    signatures: [
        [
            '0x4e43',
            '0x9610d4f6d6f55e44f5f29f1a08538c9871d39c7295834db5a28b7358cf23a8a6',
            '0x6dc41f04c570a08a20aadc8eb4801aa3ee68b11f280e14d0e458f97f8c708175',
        ],
        [
            '0x4e44',
            '0x35cc2637cd68799f9a71c8e79fb5171351dd3cb5402dc0a3f291728527c9db48',
            '0x7e3ac1ac64094ebc49c41ff6cb57b8f8eae18f5d7f2db0900117d816a1e30594',
        ],
        [
            '0x4e44',
            '0xfc4fe6436212d35a2417e3414119608f626400bd265fba0417f80a7cf9694a20',
            '0x7d0f996f41355b18781833a6e227356db03bcec71d0c16a4d7249eaa3fe89507',
        ],
    ],
    feePayerSignatures: [
        [
            '0x4e44',
            '0x5991f915a32ad719da138efecdcc3d169ad71fde31eba03be91991681d53f881',
            '0x3653c82d6d99839699c3dfea470fcc777cda5b6185a1678c19d5fd7605c04a97',
        ],
    ],
}
```

## encrypt <a id="encrypt"></a>

```javascript
caver.klay.accounts.encrypt(encryptTarget, password [, options])
```
클레이튼 키스토어 표준에 따라 계정을 암호화합니다. 자세한 내용은 [KIP-3](https://kips.klaytn.foundation/KIPs/kip-3)을 참고하세요.

**참고** caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 이후, `caver.klay.accounts.encrypt`는 키스토어 v4 표준을 사용하여 다양한 AccountKey 유형(AccountKeyPublic, AccountKeyMultiSig, AccountKeyRoleBased)을 암호화합니다. 키스토어 v3를 사용하여 계정을 암호화하려면 [caver.klay.accounts.encryptV3](#encryptv3)를 사용하세요.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| encryptTarget | String &#124; Array &#124; Object | 개인키 또는 암호화할 클레이튼 지갑 키입니다. caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 이후, encryptTarget은 Account 또는 AccountKey의 인스턴스(AccountKeyPublic, AccountKeyMultiSig 또는 AccountKeyRoleBased), 개인키 문자열의 배열 또는 역할별로 키를 정의하는 객체일 수도 있습니다. |
| password | String | 암호화에 사용되는 비밀번호입니다. |
| options | Object | (선택 사항) `options` 매개변수를 사용하면 암호화를 사용할 때 사용할 값을 지정할 수 있습니다. 옵션 개체를 사용하여 분리된 계정을 암호화할 수도 있습니다.`options`의 사용법은 아래 예시를 참조하세요. |

**참고** encryptTarget에서 계정 주소를 추출할 수 없거나(AccountKeyMultiSig, AccountKeyRoleBased, 개인키 문자열 배열 또는 역할별 키를 정의하는 객체인 경우) 계정의 개인키가 주소에서 분리된 경우 옵션 객체에서 주소를 지정해야 합니다.

**참고**: 계정에 주소와 분리된 개인키가 있는 경우 개인키를 암호화하는 방법에는 두 가지가 있습니다.
1. 개인키 파라미터와 함께 [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format) 형식을 사용하세요.
2. `options.address`를 사용하여 주소를 파라미터로 전송합니다.

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| object | 암호화된 키 저장소 JSON입니다. caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 이후 키스토어 v4가 사용됩니다. 아래 예시는 키스토어 v3와 v4를 모두 보여줍니다. |


**예시**

```javascript
// encrypt to keystore v4 JSON.
// Encrypt with a private key string
> caver.klay.accounts.encrypt('0x{private key}', 'test')
{
    version: 4,
    id: '6b4c9eb2-9dc6-46d4-88b6-bb1fa511ead1',
    address: '0x5aac93bcce8834c02600c2df7f031bc76f37276c',
    keyring: [
        {
            ciphertext: 'eda10e7b55de386aeb212f99644cdbfa52b96bf07747e74e5e60bd6c39fa88aa',
            cipherparams: { iv: 'd626fa3c140c93b27fb995264bee9c4e' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: 'e85fd7a0801ed5221a769844a225a3663886e0e235fbc972c31a129df5cadb6c', n: 4096, r: 8, p: 1 },
            mac: 'bc19774bf5db92919273ca72f8f3137019d658e7850e31ff454635db4a1d5dbe',
        },
    ],
}

// Encrypt with an array of private key strings
> caver.klay.accounts.encrypt(['0x{private key}', '0x{private key}'], 'test', { address: '0xe1d711ee2ac2dfec5b1e6ea583c8270b7575702a' })
{
    version: 4,
    id: 'ae5e94fc-0ab4-4a54-8655-4fab51b92e4a',
    address: '0xe1d711ee2ac2dfec5b1e6ea583c8270b7575702a',
    keyring: [
        {
            ciphertext: 'd84db9f8cd5206cf9dae524fbb15f4c09c93f447352cb3a6ac3ef182f9056686',
            cipherparams: { iv: '7a7bc290306bf39db79b425a5fe7333b' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: '35cc3deab2a096ae1d2d62a2c1cb7d0c5481d9127cae3c35b1540be2b9fc2175', n: 4096, r: 8, p: 1 },
            mac: '87eecd98c857e4c416b63a3731fcf811cb055adf2967d5272e4aa77974dbf2a6',
        },
        {
            ciphertext: '8d6c3036fecbd6976734711ec69068180b4e5ec90e06797d92be8243eae35f19',
            cipherparams: { iv: '191fcc2402b82d7039bd651b29f42cbc' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: 'cbf12acbba50120783aa0ad4ff35f11daa8972dcb728e11445dd1ec38be2e091', n: 4096, r: 8, p: 1 },
            mac: '216b8a04022234d8127eafb9bdb3a72b18f6c94a05469d9bbd76d26e67cb63a2',
        },
    ],
}

// Encrypt with an object
> caver.klay.accounts.encrypt({ transactionKey: ['0x{private key}', '0x{private key}'], updateKey: '0x{private key}', feePayerKey: '0x{private key}'}, 'test', { address: '0xe1d711ee2ac2dfec5b1e6ea583c8270b7575702a' })
{
    version: 4,
    id: '99d27cfe-8e3f-427c-bd4c-e4e3cd43955b',
    address: '0xe1d711ee2ac2dfec5b1e6ea583c8270b7575702a',
    keyring: [
        [
            {
                ciphertext: '07a3d8c1c6a01734e429bb4ea88d282b3547fa422653f9547c0544bfca011af0',
                cipherparams: { iv: '707177c48b5bfc1f88e91f10eb327b1b' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: { dklen: 32, salt: '452f3e41d9e58b42d348b326319fc27b29ed5f5177e063087f8cb272c6b73fe3', n: 4096, r: 8, p: 1 },
                mac: 'bccd141b9056f7ee26b8e9a4ef52d231403162ed2593df8f2e6b2f2d26a737d2',
            },
            {
                ciphertext: 'c94defa5049b910eb57d46125e3dbdb9d32bfb85f3915aa96e25e75d2346970f',
                cipherparams: { iv: 'fae425c4a44c881e629ccdc0fcf53916' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: { dklen: 32, salt: '37302d0a0625321193e482da55e19a0a51ac250cf4857ecb13112b8c88cbdf44', n: 4096, r: 8, p: 1 },
                mac: '04f7b2879b7e9604356fd4db532c981b4eaa95078c25694e591e7cc2a5c613f1',
            },
        ],

        [
            {
                ciphertext: '015ef2deab867b887fa29c866941512af848e4b547d74a39f44cc4c9ef204b5f',
                cipherparams: { iv: '230271676c4501a860b19b325b1850a6' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: { dklen: 32, salt: 'eb73f9cacea4e0b38634679102ab5b8f0e84464c2fa3ca07d11ebcdfb7a95519', n: 4096, r: 8, p: 1 },
                mac: 'd76a0f22b2f5a23dac30be820260b3fc738083b797d5c608b23bce8a69f63256',
            },
        ],

        [
            {
                ciphertext: '70870f4dd813fc7c0c4ef64ebba03f15c81677d2558d646b3d143ab8e0d27ec2',
                cipherparams: { iv: '841be9a25127fca0cc79740763ec3e55' },
                cipher: 'aes-128-ctr',
                kdf: 'scrypt',
                kdfparams: { dklen: 32, salt: '089ef66590b699c347caddafa592c8f074948b0ca6e2957bae45d005cd55a874', n: 4096, r: 8, p: 1 },
                mac: '6e1ad546d9e3ad1f3c3419ace4c9daf34a310001875b1a3228dbfd1891030bff',
            },
        ],
    ],
}

// Encrypt decoupled account - 1. Use the KlaytnWalletKey format with the privateKey parameter.
> caver.klay.accounts.encrypt('0x{private key}0x{type}0x{address in hex}', 'test')
{
    version: 4,
    id: 'f320306e-4d67-4982-b1a9-7b455c744579',
    address: '0x7d46813010aee975946d6ee9c7fb887eef6b318d',
    keyring: [
        {
            ciphertext: '745d306663b7cc09dbe6f3dbbf76d252bd5cb53613c6369e7e481edbf0bb31d1',
            cipherparams: { iv: '0c502b449247166e6f3338346b82ea3d' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: '171efaa9c12aa03d488c547651a3d1b2c745e305dffcaf4ad658ed1ae18882d8', n: 4096, r: 8, p: 1 },
            mac: '8cb52aff70971b9fd2b467b47aa493ae90e8823f4ff5cfafcf7c2e06a5aa2298',
        },
    ],
}

// Encrypt decoupled account - 2. Use the options to send the address as a parameter.
> caver.klay.accounts.encrypt('0x{private key}', 'test', { address: '0x7d46813010aee975946d6ee9c7fb887eef6b318d' })
{
    version: 4,
    id: '2675a321-9054-48ae-97d8-bafa22ec07f5',
    address: '0x7d46813010aee975946d6ee9c7fb887eef6b318d',
    keyring: [
        {
            ciphertext: 'aa51496d861a129c91e2fb92807afb7603156336b4681a6bf1569634fb51d330',
            cipherparams: { iv: 'cc4fda2a72f2904a7bd342318cc9a61f' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: '672160453667bbe34c9a3adf997e92d1bd734ab28f6078807cad902b5b47fd92', n: 4096, r: 8, p: 1 },
            mac: '51ec88d578f94f1307f0d025cac4b0e6c0544498baa05266f0114d06c57155b4',
        },
    ],
}

// Using options objects with encryption option values (scrypt)
> caver.klay.accounts.encrypt('0x{private key}', 'test', {
    salt: '776ad46fde47572c58ba5b9616a661a1fbc4b9ff918300faeba04bb9ff5be04c',
    iv: Buffer.from('b62ef75e39fa396de62c51c4734b69a2', 'hex'),
    kdf: 'scrypt',
    dklen: 32,
    n: 262144,
    r: 8,
    p: 1,
    cipher: 'aes-128-cbc',
    uuid: Buffer.from('f0b40ab7d69fdd9606e2a5242dddd813', 'hex'),
})
{
    version: 4,
    id: 'f0b40ab7-d69f-4d96-86e2-a5242dddd813',
    address: '0x5aac93bcce8834c02600c2df7f031bc76f37276c',
    keyring: [
        {
            ciphertext: 'd73c42f72b6c46c352442db20d04ea7bf571df29a01641e028ab97891069fad191a93b0082650ac4c951c75f400cc545',
            cipherparams: { iv: 'b62ef75e39fa396de62c51c4734b69a2' },
            cipher: 'aes-128-cbc',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: '776ad46fde47572c58ba5b9616a661a1fbc4b9ff918300faeba04bb9ff5be04c', n: 262144, r: 8, p: 1 },
            mac: '9a200c73ef48129a33ffef7c7246e8a08c4bcd308b18e341f25199f4f974dcd0',
        },
    ],
}

// Using options objects with encryption option values (pbkdf2)
> caver.klay.accounts.encrypt('0x{private key}', 'test', {
    salt: '776ad46fde47572c58ba5b9616a661a1fbc4b9ff918300faeba04bb9ff5be04c',
    iv: Buffer.from('b62ef75e39fa396de62c51c4734b69a2', 'hex'),
    kdf: 'pbkdf2',
    dklen: 32,
    c: 262144,
    cipher: 'aes-128-cbc',
    uuid: Buffer.from('f0b40ab7d69fdd9606e2a5242dddd813', 'hex'),
})
{
    version: 4,
    id: 'f0b40ab7-d69f-4d96-86e2-a5242dddd813',
    address: '0x5aac93bcce8834c02600c2df7f031bc76f37276c',
    keyring: [
        {
            ciphertext: '58802ef723041431ec089041c23ae0d4b6b4d8fe56c920f587296b95b7645df439c3917da4f8a119ee0300609f4448d0',
            cipherparams: { iv: 'b62ef75e39fa396de62c51c4734b69a2' },
            cipher: 'aes-128-cbc',
            kdf: 'pbkdf2',
            kdfparams: { dklen: 32, salt: '776ad46fde47572c58ba5b9616a661a1fbc4b9ff918300faeba04bb9ff5be04c', c: 262144, prf: 'hmac-sha256' },
            mac: '2cac2a4dccb9127c6f7335135cfc5a8dda6c58cd4429cd3466b89d5d506f5930',
        },
    ],
}

// encrypt to keystore v3 JSON. (If you want to encrypt to keystore v3, use a version earlier than caver-js v1.2.0.)
// Encrypt with a private key string
> caver.klay.accounts.encrypt('0x{private key}', 'test!')
{
    version: 3,
    id: '04e9bcbb-96fa-497b-94d1-14df4cd20af6',
    address: '2c7536e3605d9c16a7a3d7b1898e529396a65c23',
    crypto: {
        ciphertext: 'a1c25da3ecde4e6a24f3697251dd15d6208520efc84ad97397e906e6df24d251',
        cipherparams: { iv: '2885df2b63f7ef247d753c82fa20038a' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: { dklen: 32, salt: '4531b3c174cc3ff32a6a7a85d6761b410db674807b2d216d022318ceee50be10', n: 262144, r: 8, p: 1 },
        mac: 'b8b010fff37f9ae5559a352a185e86f9b9c1d7f7a9f1bd4e82a5dd35468fc7f6'
    }
}
```

## encryptV3 <a id="encryptv3"></a>

```javascript
caver.klay.accounts.encryptV3(encryptTarget, password [, options])
```
계정을 클레이튼 키스토어 v3 표준으로 암호화합니다.

**참고** `caver.klay.accounts.encryptV3`는 caver-js [v1.3.2-rc.1](https://www.npmjs.com/package/caver-js/v/1.3.2-rc.1) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| encryptTarget | String &#124; Object | 개인키, 클레이튼 지갑 키, 또는 암호화할 계정 또는 계정키퍼블릭의 인스턴스입니다. |
| password | String | 암호화에 사용되는 비밀번호입니다. |
| options | Object | (선택 사항) `options` 매개변수를 사용하면 암호화를 사용할 때 사용할 값을 지정할 수 있습니다. 또한 `options` 개체를 사용하여 분리된 계정을 암호화할 수도 있습니다.`options`의 사용법은 아래 세 번째 예시를 참조하세요. |

**참고**: 계정에 주소와 분리된 개인키가 있는 경우 개인키를 암호화하는 방법에는 두 가지가 있습니다.
1. [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format)를 `encryptTarget` 파라미터로 사용하세요.
2. 옵션을 `options.address` 파라미터로 설정하여 주소를 파라미터 중 하나로 전송합니다. 사용법은 아래 세 번째 예시를 참고하세요.

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| object | 암호화된 키 저장소 v3 JSON입니다. |


**예시**

```javascript
// encrypt to keystore v3 JSON with single private key string.
> caver.klay.accounts.encryptV3('0x{private key}', 'test!')
{
    version: 3,
    id: 'ff07b774-b572-4c76-a925-9e7650fb0488',
    address: '0x4abe737d3c57dce9152988c714e9e4b341647650',
    crypto: {
        ciphertext: '5a1c898fd89a7521e0034d297a46f029def59632416aef724a1f466f3c416958',
        cipherparams: { iv: '8304ad468f10db5529fa480bfc170df7' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: { dklen: 32, salt: '3a98ebac3da3ad0edf7f1f237c86a3dd71a77002e4908991579ed52910c6f082', n: 4096, r: 8, p: 1 },
        mac: 'a5ed79b91ffe30baa22b2622bffbab97ea5cf893ba96249c7854e2d19295cc3d',
    },
}

// encrypt to keystore v3 JSON with KlaytnWalletKey.
> caver.klay.accounts.encryptV3('0x{private key}0x{type}0x{address in hex}', 'test!')
{
    version: 3,
    id: 'ff07b774-b572-4c76-a925-9e7650fb0488',
    address: '0x4abe737d3c57dce9152988c714e9e4b341647650',
    crypto: {
        ciphertext: '5a1c898fd89a7521e0034d297a46f029def59632416aef724a1f466f3c416958',
        cipherparams: { iv: '8304ad468f10db5529fa480bfc170df7' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: { dklen: 32, salt: '3a98ebac3da3ad0edf7f1f237c86a3dd71a77002e4908991579ed52910c6f082', n: 4096, r: 8, p: 1 },
        mac: 'a5ed79b91ffe30baa22b2622bffbab97ea5cf893ba96249c7854e2d19295cc3d',
    },
}

// encrypt to keystore v3 JSON with address field in options.
> caver.klay.accounts.encryptV3('0x{private key}', 'test!', { address: '0x4abe737d3c57dce9152988c714e9e4b341647650' })
{
    version: 3,
    id: 'ff07b774-b572-4c76-a925-9e7650fb0488',
    address: '0x4abe737d3c57dce9152988c714e9e4b341647650',
    crypto: {
        ciphertext: '5a1c898fd89a7521e0034d297a46f029def59632416aef724a1f466f3c416958',
        cipherparams: { iv: '8304ad468f10db5529fa480bfc170df7' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: { dklen: 32, salt: '3a98ebac3da3ad0edf7f1f237c86a3dd71a77002e4908991579ed52910c6f082', n: 4096, r: 8, p: 1 },
        mac: 'a5ed79b91ffe30baa22b2622bffbab97ea5cf893ba96249c7854e2d19295cc3d',
    },
}
```


## decrypt <a id="decrypt"></a>

```javascript
caver.klay.accounts.decrypt(keystoreJsonV3, password)
```
키스토어 v3 또는 v4 JSON을 복호화하고 복호화된 계정 객체를 반환합니다.

**참고** caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 이후, `caver.klay.accounts.decrypt`는 키스토어 v4를 복호화할 수 있습니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| keystoreJson | String | 암호 해독할 암호화된 계정이 포함된 JSON string입니다. |
| password | String | 암호화에 사용되는 비밀번호입니다. |


**리턴 값**

| 유형 | 설명 |
| --- | --- |
| object | 해독된 계정입니다. |


**예시**

```javascript
// Decrypt keystore v4 JSON
> caver.klay.accounts.decrypt({
    version: 4,
    id: '6b4c9eb2-9dc6-46d4-88b6-bb1fa511ead1',
    address: '0x5aac93bcce8834c02600c2df7f031bc76f37276c',
    keyring: [
        {
            ciphertext: 'eda10e7b55de386aeb212f99644cdbfa52b96bf07747e74e5e60bd6c39fa88aa',
            cipherparams: { iv: 'd626fa3c140c93b27fb995264bee9c4e' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { dklen: 32, salt: 'e85fd7a0801ed5221a769844a225a3663886e0e235fbc972c31a129df5cadb6c', n: 4096, r: 8, p: 1 },
            mac: 'bc19774bf5db92919273ca72f8f3137019d658e7850e31ff454635db4a1d5dbe',
        },
    ],
}, 'test')
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey]
}

// Decrypt keystroe v3 JSON
> caver.klay.accounts.decrypt({
     version: 3,
     id: '04e9bcbb-96fa-497b-94d1-14df4cd20af6',
     address: '2c7536e3605d9c16a7a3d7b1898e529396a65c23',
     crypto: {
         ciphertext: 'a1c25da3ecde4e6a24f3697251dd15d6208520efc84ad97397e906e6df24d251',
         cipherparams: { iv: '2885df2b63f7ef247d753c82fa20038a' },
         cipher: 'aes-128-ctr',
         kdf: 'scrypt',
         kdfparams: {
             dklen: 32,
             salt: '4531b3c174cc3ff32a6a7a85d6761b410db674807b2d216d022318ceee50be10',
             n: 262144,
             r: 8,
             p: 1
         },
         mac: 'b8b010fff37f9ae5559a352a185e86f9b9c1d7f7a9f1bd4e82a5dd35468fc7f6'
     }
  }, 'test!')
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey]
}
```

## isDecoupled <a id="isdecoupled"></a>

```javascript
caver.klay.accounts.isDecoupled(key, address)
```
키가 주소에서 분리되었는지 여부를 확인합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| Key | String | 주소에서 분리되었는지 확인할 키입니다. 키는 32-byte string 개인키 또는 [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format)가 될 수 있습니다. |
| address | String | (선택 사항) 분리 여부를 결정하는 데 사용할 주소입니다. 주소가 지정되지 않으면 키에서 주소가 파생됩니다. |


**리턴 값**

| 유형 | 설명 |
| --- | --- |
| bool | 키가 주소에서 분리된 경우 `true`. 분리되지 않은 경우 `false`. |


**예시**

```javascript
> caver.klay.accounts.isDecoupled('0x{private key}', '0x{address in hex}')
true

> caver.klay.accounts.isDecoupled('0x{private key}0x{type}0x{address in hex}')
true

> caver.klay.accounts.isDecoupled('0x{private key}')
false

> caver.klay.accounts.isDecoupled('0x{private key}0x{type}0x{address in hex}')
false
```

## getLegacyAccount <a id="getlegacyaccount"></a>

```javascript
caver.klay.accounts.getLegacyAccount(key)
```
주어진 개인키에서 파생된 주소를 가진 계정을 반환합니다. [AccountKeyLegacy](../../../../learn/accounts.md#accountkeylegacy)를 참조하세요.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| Key | String | 레거시 계정 키가 있는 계정을 가져오는 데 사용되는 매개변수입니다. 키는 32-byte string 개인키 또는 [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format)일 수 있습니다. KlaytnWalletKey에서는 개인키에 해당하는 부분만 사용합니다. |


**리턴 값**

| 유형 | 설명 |
| --- | --- |
| object | 주어진 값의 레거시 계정 키가 있는 계정 객체입니다. 키에서 추출한 주소 정보가 있는 경우 함께 반환됩니다. |


**예시**

```javascript
// getLegacyAccount with raw private key format
> caver.klay.accounts.getLegacyAccount('0x{private key}')
{ 
    legacyAccount: { 
        address: '0xE26D5d4983eD62A99D7D4Bc0cE0e784782fF6B27',
        privateKey: '0x{private key}' 
    },
    klaytnWalletKeyAddress: '' 
}

// getLegacyAccount with KlaytnWalletKey format
> caver.klay.accounts.getLegacyAccount('0x{private key}0x{type}0x{address in hex}')
{ 
    legacyAccount: { 
        address: '0xE26D5d4983eD62A99D7D4Bc0cE0e784782fF6B27',
        privateKey: '0x{private key}'
    },
    klaytnWalletKeyAddress: '0xE26D5d4983eD62A99D7D4Bc0cE0e784782fF6B27'
}

// getLegacyAccount with decoupled KlaytnWalletKey format
> caver.klay.accounts.getLegacyAccount('0x{private key}0x{type}0x{address in hex}')
{ 
    legacyAccount: { 
        address: '0xE26D5d4983eD62A99D7D4Bc0cE0e784782fF6B27',
        privateKey: '0x{private key}' 
    },
    klaytnWalletKeyAddress: '0xd05c5926b0a2f31aadcc9a9cbd3868a50104d834'
}
```


## wallet <a id="wallet"></a>

```javascript
caver.klay.accounts.wallet
```
여러 계정이 있는 인메모리 지갑을 포함합니다.  이러한 계정은
[caver.klay.sendTransaction](./caver.klay/transaction/transaction.md#sendtransaction) 사용 시 사용할 수 있습니다.

**예시**

```javascript
> caver.klay.accounts.wallet;
Wallet {
  '0':
   { address: '0xce3bda34a14415f3bc2bcd5e61c48043857a6451',
     privateKey: '0x{private key}',
     signTransaction: [Function: signTransaction],
     sign: [Function: sign],
     encrypt: [Function: encrypt],
     getKlaytnWalletKey: [Function: getKlaytnWalletKey],
     index: 0 },
  _accounts: Accounts { ... },
  length: 1,
  defaultKeyName: 'caverjs_wallet',
  '0xce3bda34a14415f3bc2bcd5e61c48043857a6451': { ... },
  '0XCE3BDA34A14415F3BC2BCD5E61C48043857A6451': { ... },
  '0xce3bDa34A14415F3BC2bCd5E61C48043857a6451': { ... } 
}
```


## wallet.create <a id="wallet-create"></a>

```javascript
caver.klay.accounts.wallet.create([numberOfAccounts] [, entropy])
```
무작위로 생성된 키 쌍으로 지갑에 하나 이상의 계정을 생성합니다. 지갑이 이미 존재하는 경우 재정의되지 않습니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| numberOfAccounts | Number | (선택 사항) 만들 계정 수입니다. 빈 지갑을 만들려면 비워둡니다. |
| entropy | String | (선택 사항) 엔트로피를 증가시킬 임의의 문자열입니다. 아무것도 지정하지 않으면 [randomHex](./caver.utils_1.4.1.md#randomhex)를 사용하여 임의의 문자열을 생성합니다. |

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| object | 지갑 개체입니다. |


**예시**

```javascript
> caver.klay.accounts.wallet.create(1, 'entropy');
Wallet {
  '0': { ... },
  _accounts: Accounts { ... },
  length: 1,
  defaultKeyName: 'caverjs_wallet',
  '0xc89cdd4258e17471fbaf75283b6a952451eb7f54': { ... },
  '0XC89CDD4258E17471FBAF75283B6A952451EB7F54': { ... },
  '0xC89cDD4258e17471fBaf75283b6A952451Eb7f54': { ... }
```


## wallet.add <a id="wallet-add"></a>

```javascript
caver.klay.accounts.wallet.add(account [, targetAddress])
```
개인키 또는 계정 객체를 사용하여 계정을 지갑에 추가합니다.

**참고**: 지갑 내부에 동일한 주소가 존재하면 오류가 반환됩니다.
지갑에서 계정에 연결된 개인키를 변경하려면 [caver.klay.accounts.wallet.updatePrivateKey](#wallet-updateprivatekey)를 사용하시기 바랍니다.


**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| account | String &#124; Object | [caver.klay.accounts.create](#create)로 만든 개인 키 또는 계정 개체입니다. |
| targetAddress | String | 주어진 개인키와 함께 사용할 대상 주소입니다. |

**참고**: caver-js는 두 가지 유형의 개인키 형식을 지원합니다.
하나는 32-byte string 타입의 Raw 개인키 형식이고, 다른 하나는 [KlaytnWalletKey](../../../../learn/accounts.md#klaytn-wallet-key-format) 형식입니다.

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| object | 추가된 계정입니다. |


**예시**

```javascript
> caver.klay.accounts.wallet.add('0x{private key}');
{ 
    address: '0xdac9f72e27f05eca08df7a2ea2d044b3ed3a6e54',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 4 
}

// Use key '0x{private key}' as a private key
// for address '0xfe9157e180c8f4c229e88d0c1763a746db8b19b4'
> caver.klay.accounts.wallet.add('0x{private key}', '0xfe9157e180c8f4c229e88d0c1763a746db8b19b4');
{ 
    address: '0xfe9157e180c8f4c229e88d0c1763a746db8b19b4',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 5
}

> caver.klay.accounts.wallet.add({
      privateKey: '0x{private key}',
      address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01'
  });
{ 
    address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 6
}

// Add wallet with KlaytnWalletKey format
> caver.klay.accounts.wallet.add('0x{private key}0x{type}0x{address in hex}');
{ 
    address: '0x3bd32d55e64d6cbe54bec4f5200e678ee8d1a990',
    privateKey: '0x{private key}',
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 1 
}
```


## wallet.getAccount <a id="wallet-getaccount"></a>

```javascript
caver.klay.accounts.wallet.getAccount(addressOrIndex)
```
`caver.klay.accounts.wallet`의 주소에 해당하는 계정을 반환합니다.


**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| addressOrIndex | String &#124; Number | 지갑 주소 목록의 인덱스 또는 16진수 주소입니다. 주어진 값은 caver-js 지갑에 존재해야 합니다. |

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| object | 지갑의 계정입니다. |


**예시**

```javascript
> caver.klay.accounts.wallet.getAccount('0x{address in hex}')
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    feePayerSignTransaction: [Function: feePayerSignTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 0
}

> caver.klay.accounts.wallet.getAccount(0)
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    feePayerSignTransaction: [Function: feePayerSignTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 0
}
```


## wallet.remove <a id="wallet-remove"></a>

```javascript
caver.klay.accounts.wallet.remove(account)
```
지갑에서 계정을 제거합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| account | string &#124; number | 지갑의 계정 주소 또는 인덱스입니다. |


**리턴 값**

| 유형 | 설명 |
| --- | --- |
| bool | 지갑이 제거된 경우 ``true``. 찾을 수 없으면 ``false``입니다. |


**예시**

```javascript
> caver.klay.accounts.wallet;
Wallet {
  '0': { ... },
  _accounts: Accounts { ... },
  length: 1,
  defaultKeyName: 'caverjs_wallet',
  '0xce3bda34a14415f3bc2bcd5e61c48043857a6451': { ... },
  '0XCE3BDA34A14415F3BC2BCD5E61C48043857A6451': { ... },
  '0xce3bDa34A14415F3BC2bCd5E61C48043857a6451': { ... } 
}

> caver.klay.accounts.wallet.remove('0xce3bda34a14415f3bc2bcd5e61c48043857a6451');
true

> caver.klay.accounts.wallet.remove(3);
false
```


## wallet.clear <a id="wallet-clear"></a>

```javascript
caver.klay.accounts.wallet.clear()
```
지갑을 안전하게 비우고 모든 계정을 제거합니다.

**매개변수**

없음

**리턴 값**

| 유형 | 설명 |
| --- | --- |
| object | 지갑 개체입니다. |

**예시**

```javascript
> caver.klay.accounts.wallet.clear();
Wallet {
  _accounts: Accounts { ... },
  length: 0,
  defaultKeyName: 'caverjs_wallet' 
}
```


## wallet.encrypt <a id="wallet-encrypt"></a>

```javascript
caver.klay.accounts.wallet.encrypt(password)
```
모든 지갑 계정을 암호화하고 암호화된 키스토어 v3 객체 배열을 반환합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| password | String | 암호화에 사용할 비밀번호입니다. |


**리턴 값**

| 유형 | 설명 |
| --- | --- |
| Array | 암호화된 키스토어 v3 개체입니다. |


**예시**

```javascript
> caver.klay.accounts.wallet.encrypt('test');
[ 
    { 
        version: 3,
        id: '2b334f59-a0bc-446c-9f25-c934e432e832',
        address: '0x57629b4a9dc137f15400a3d96ab9e1e57b7f57c7',
        crypto: { 
            ciphertext: '9ca62a29f0f634ca63dfab40a4631f9fabb689ae60e4bfb475c58c69ad060543',
            cipherparams: { iv: '3d924a71a7b4db0f2f8456068c1c7b8e' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { 
                dklen: 32,
                salt: '42628f28de6aa8b988c425fa97d8f790ac26a6f89b44b0321c56101e7fb8bbcf',
                n: 4096,
                r: 8,
                p: 1 
                },
            mac: 'a35bc8f650aa1ff0d2316de7be1494927851e19b3e817cd16482a442912f133b' 
        } 
    },
    { 
        version: 3,
        id: '9b8b4e4f-e72c-4a28-af57-38b6838b5533',
        address: '0x4fb4006448106831a7c8c8e0d0139e05550f3d3e',
        crypto: { 
            ciphertext: '65b9350969efdfeadb357145c97992b67c4114bd1d24592e8c62dbddfab2a49f',
            cipherparams: { iv: 'b9d19c69a62745b3db409ff0879669a2' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { 
                dklen: 32,
                salt: '914a4628a991f521d547a9da593b5daa63a1a82fcafe0282c09e80967874f36c',
                n: 4096,
                r: 8,
                p: 1 
            },
            mac: 'a9de2c54c4b29807fd21d40fe79f556a7d5b771045cbbda0a943d3ced4cacafc' 
        } 
    } 
]
```


## wallet.decrypt <a id="wallet-decrypt"></a>

```javascript
caver.klay.accounts.wallet.decrypt(keystoreArray, password)
```
키스토어 v3 개체를 복호화합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| keystoreArray | Array | 복호화할 암호화된 키스토어 v3 개체입니다. |
| password | String | 암호화에 사용된 비밀번호입니다. |


**리턴 값**

| 유형 | 설명 |
| --- | --- |
| object | 지갑 개체입니다. |


**예시**

```javascript
> caver.klay.accounts.wallet.decrypt([ 
    { 
        version: 3,
        id: '2b334f59-a0bc-446c-9f25-c934e432e832',
        address: '0x57629b4a9dc137f15400a3d96ab9e1e57b7f57c7',
        crypto: { 
            ciphertext: '9ca62a29f0f634ca63dfab40a4631f9fabb689ae60e4bfb475c58c69ad060543',
            cipherparams: { iv: '3d924a71a7b4db0f2f8456068c1c7b8e' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { 
                dklen: 32,
                salt: '42628f28de6aa8b988c425fa97d8f790ac26a6f89b44b0321c56101e7fb8bbcf',
                n: 4096,
                r: 8,
                p: 1 
                },
            mac: 'a35bc8f650aa1ff0d2316de7be1494927851e19b3e817cd16482a442912f133b' 
        } 
    },
    { 
        version: 3,
        id: '9b8b4e4f-e72c-4a28-af57-38b6838b5533',
        address: '0x4fb4006448106831a7c8c8e0d0139e05550f3d3e',
        crypto: { 
            ciphertext: '65b9350969efdfeadb357145c97992b67c4114bd1d24592e8c62dbddfab2a49f',
            cipherparams: { iv: 'b9d19c69a62745b3db409ff0879669a2' },
            cipher: 'aes-128-ctr',
            kdf: 'scrypt',
            kdfparams: { 
                dklen: 32,
                salt: '914a4628a991f521d547a9da593b5daa63a1a82fcafe0282c09e80967874f36c',
                n: 4096,
                r: 8,
                p: 1 
            },
            mac: 'a9de2c54c4b29807fd21d40fe79f556a7d5b771045cbbda0a943d3ced4cacafc' 
        } 
    } 
], 'test');
Wallet {
  '0': { ... },
  '1': { ... },
  _accounts: Accounts { ... },
  length: 2,
  defaultKeyName: 'caverjs_wallet',
  '0x57629b4a9dc137f15400a3d96ab9e1e57b7f57c7': { ... } ,
  '0X57629B4A9DC137F15400A3D96AB9E1E57B7F57C7': { ... } ,
  '0x57629B4A9DC137F15400A3d96Ab9e1e57B7F57C7': { ... } ,
  '0x4fb4006448106831a7c8c8e0d0139e05550f3d3e': { ... } ,
  '0X4FB4006448106831A7C8C8E0D0139E05550F3D3E': { ... } ,
  '0x4fb4006448106831a7c8C8e0D0139E05550F3D3E': { ... } 
}
```

## wallet.getKlaytnWalletKey <a id="wallet-getklaytnwalletkey"></a>

```javascript
caver.klay.accounts.wallet.getKlaytnWalletKey(index)
caver.klay.accounts.wallet.getKlaytnWalletKey(address)
```
caver-js 지갑에 있는 계정의 클레이튼 지갑키를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| indexOrAddress | Number&#124;String | 지갑 주소 목록의 인덱스, 16진수 주소입니다. 주어진 값은 caver-js 지갑에 존재해야 합니다. |


**리턴 값**

| 유형 | 설명 |
| --- | --- |
| string | 계정과 일치하는 클레이튼 지갑 키입니다. 이 값으로 지갑에 로그인할 수 있습니다. |


**예시**

```javascript
// With non-human-readable address
> caver.klay.accounts.wallet.getKlaytnWalletKey(0)
'0x{private key}0x{type}0x{address in hex}'

// With index of wallet list
> caver.klay.accounts.wallet.getKlaytnWalletKey(1)
'0x{private key}0x{type}0x{address in hex}'

// With an address in hexadecimal
> caver.klay.accounts.wallet.getKlaytnWalletKey('0xa9d40b07a6d06e7b7af6cf9a17fb107c9fc7fe58')
'0x{private key}0x{type}0x{address in hex}'

// If the given account does not exist in the caver-js wallet, returns an error.
> caver.klay.accounts.wallet.getKlaytnWalletKey('0x35170d0c774b8c80e9f802a7af6d0497e621c215')
Error: Failed to find account
```

## wallet.updatePrivateKey <a id="wallet-updateprivatekey"></a>

```javascript
caver.klay.accounts.wallet.updatePrivateKey(privateKey, address)
```
지갑에 저장된 계정의 개인키 정보를 업데이트합니다.

**참고**: 이 함수는 caver-js의 지갑에 저장된 정보만 변경합니다. 이 함수는 클레이튼 네트워크에 저장된 키 정보에는 영향을 미치지 않습니다. 클레이튼 네트워크에 있는 키는 ['ACCOUNT_UPDATE'](./caver.klay/transaction/sendtx-account-update.md#sendtransaction-account_update) 트랜잭션을 전송하여 변경할 수 있습니다.

**참고** `updatePrivateKey`는 계정의 AccountKey가 AccountKeyPublic인 경우에만 작동합니다.
caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0)은 계정키(AccountKeyPublic, AccountKeyMultiSig, AccountKeyRoleBased)를 지원하므로 `privateKey`는 계정키의 defaultKey를 참조하는 읽기 전용 프로퍼티가 됩니다. 이 메서드는 `privateKey`를 직접 업데이트하지 않고 대신 계정키를 업데이트합니다. 이 메서드는 이전 버전과의 호환성을 위해 유지됩니다. 이제 보다 일반적인 [caver.klay.accounts.wallet.updateAccountKey](#wallet-updateaccountkey)를 사용하실 것을 권장합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| privateKey | String | 업데이트에 사용할 새 개인키입니다. |
| address | String | 지갑의 계정 주소입니다. |


**리턴 값**

| 유형 | 설명 |
| --- | --- |
| object | 계정 인스턴스를 새 accountKey로 만듭니다. 계정 인스턴스는 인메모리 caver-js 지갑에 있습니다. |


**예시**

```javascript
> caver.klay.accounts.wallet.updatePrivateKey('0x{private key}', '0xf2e2565629c7763dc0b595e8e531a31371a95f95');
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 0
}
```

## wallet.updateAccountKey <a id="wallet-updateaccountkey"></a>

```javascript
caver.klay.accounts.wallet.updateAccountKey(address, accountKey)
```
지갑에 저장된 계정의 계정 키 정보를 업데이트합니다. 계정의 accountKey를 업데이트하면 privateKey도 새로운 accountKey의 defaultKey로 업데이트됩니다.

accountKey 매개변수가 단일 개인키 문자열인 경우 계정의 accountKey는 `AccountKeyPublic` 인스턴스로 업데이트됩니다. accountKey 매개변수가 여러 개의 개인 키 문자열이 포함된 배열인 경우 계정의 accountKey는 `AccountKeyMultiSig` 인스턴스로 업데이트됩니다. accountKey 매개변수가 역할별로 키가 정의된 객체인 경우 계정의 accountKey는 `AccountKeyRoleBased` 인스턴스로 업데이트됩니다.

**참고**: 이 함수는 caver-js의 지갑에 저장된 정보만 변경합니다. 이 함수는 클레이튼 네트워크에 저장된 키 정보에는 영향을 미치지 않습니다. 클레이튼 네트워크에 있는 키는 ['ACCOUNT_UPDATE'](./caver.klay/transaction/sendtx-account-update.md#sendtransaction-account_update) 트랜잭션을 전송하여 변경할 수 있습니다.

**참고** `caver.klay.accounts.wallet.updateAccountKey`는 caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) 부터 지원됩니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --- | --- | --- |
| address | String | 지갑의 계정 주소입니다. |
| accountKey | String &#124; Array &#124; Object | 계정 키 인스턴스(`AccountKeyPublic`, `AccountKeyMultiSig` 또는 `AccountKeyRoleBased`) 또는 키 정보가 포함된 데이터 구조(개인 키 문자열, 개인 키 문자열 배열 또는 각 역할에 대한 키를 정의하는 객체). |


**리턴 값**

| 유형 | 설명 |
| --- | --- |
| object | 계정 인스턴스를 새 accountKey로 만듭니다. 계정 인스턴스는 인메모리 caver-js 지갑에 있습니다. |


**예시**

```javascript
// Update to AccountKeyPublic with a private key string
> caver.klay.accounts.wallet.updateAccountKey('0xf2e2565629c7763dc0b595e8e531a31371a95f95', '0x{private key}')
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 0
}

// Update to AccountKeyMultiSig with an array of private key strings
> caver.klay.accounts.wallet.updateAccountKey('0xf2e2565629c7763dc0b595e8e531a31371a95f95', ['0x{private key}', '0x{private key}', '0x{private key}'])
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 0
}

// Update to AccountKeyRoleBased with an object that defines keys by roles
> caver.klay.accounts.wallet.updateAccountKey('0x2F66043C35e2389dA0B5401c3C592b2002d60bAc', {
    transactionKey: '0x1e9c7960af2f1ed4b4ceff012b1eb2c1d31e57c9d52c5e9814d35a71726f02ed',
    updateKey: ['0x3ceef924ce849bc243f2df92ae2ac7105182a4ccfcab5df6978280643dad5f3b', '0x655594f750be408b44582d36362e364565644c5974a8eba44e00f91f7274329e'],
    feePayerKey: '0xf0089574637af59838755588f622ac12e7e8c1156aae928e1a1af2cd62736924'
})
Account {
    address: [Getter/Setter],
    accountKey: [Getter/Setter],
    privateKey: [Getter/Setter],
    signTransaction: [Function: signTransaction],
    sign: [Function: sign],
    encrypt: [Function: encrypt],
    getKlaytnWalletKey: [Function: getKlaytnWalletKey],
    index: 0
}
```
