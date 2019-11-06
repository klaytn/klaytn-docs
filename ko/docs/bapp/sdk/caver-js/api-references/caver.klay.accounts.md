---
description: >-
  계정 관리와 관련된 caver-js API.
---

# caver.klay.accounts <a id="caver-klay-accounts"></a>

`caver.klay.accounts`는 Klaytn 계정과 서명 트랜잭션과 데이터를 생성하는 함수를 포함합니다.


## create <a id="create"></a>

```javascript
caver.klay.accounts.create([entropy])
```
개인키와 공개키를 사용하여 계정 개체를 생성합니다.

**매개변수**

| 명칭      | 형식  | 설명                                                                                                        |
| ------- | --- | --------------------------------------------------------------------------------------------------------- |
| entropy | 문자열 | (선택 사항) 엔트로피를 증가시키는 임의의 문자열. 아무 것도 지정하지 않으면 [randomHex](./caver.utils.md#randomhex)를 사용하여 임의의 문자열이 생성됩니다. |


**리턴값**

` Object` - 다음 구조의 계정 객체:

| 명칭                               | 형식       | 설명                                                                             |
| -------------------------------- | -------- | ------------------------------------------------------------------------------ |
| address                          | 문자열      | 계정 주소.                                                                         |
| privateKey                       | 문자열      | 계정 개인키. 로컬 저장소에 암호화되지 않은 상태로 공유하거나 저장해서는 안 됩니다! 또한 사용 후에는 메모리를 null로 설정하세요.    |
| signTransaction(tx [, callback]) | Function | 트랜잭션에 서명하는 함수. [caver.klay.accounts.signTransaction](#signtransaction)를 참조하세요. |
| sign(data)                       | Function | 트랜잭션에 서명하는 함수. [caver.klay.accounts.sign](#sign)를 참조하세요.                       |
| encrypt                          | Function | 주어진 비밀번호로 개인키를 암호화하는 함수입니다.                                                    |

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
Creates an instance of Account with the given AccountKey. Account is for managing an account's address and AccountKey.

**NOTE** This is merely a data structure used in caver-js. This method does not create or update an account in the Klaytn network. **NOTE** `caver.klay.accounts.createWithAccountKey` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**매개변수**

| 명칭         | 형식                                | 설명                                                                                                                                                                                                                                                 |
| ---------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address    | 문자열                               | Address of an Account.                                                                                                                                                                                                                             |
| accountKey | String &#124; Array &#124; Object | An AccountKey instance (`AccountKeyPublic`, `AccountKeyMultiSig` or `AccountKeyRoleBased`) or a data structure that contains the key info (a private key string, an array of private key strings or an object that defines the key for each role). |


**리턴값**

`Object` - An Account instance is returned, with the following properties:

| 명칭                               | 형식                                | 설명                                                                                                                                                                                                                                                                                               |
| -------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| address                          | 문자열                               | 계정 주소.                                                                                                                                                                                                                                                                                           |
| privateKey                       | 문자열                               | 계정에 있는 accountKey의 기본 키 문자열. 이 속성은 이전 버전과의 호환성을 위해 남겨졌습니다. privateKey는 accountKey의 기본 키만 나타내므로, privateKey를 사용하여 서명하거나 트랜잭션을 보내지 않는 편이 좋습니다. transactionKey, updateKey 또는 feePayerKey를 사용하는 것이 좋습니다.                                                                                             |
| accountKeyType                   | 문자열                               | 계정이 가진 accountKey의 유형. `AccountKeyPublic`, `AccountKeyMultiSig`, 또는 `AccountKeyRoleBased`일 수 있습니다.                                                                                                                                                                                               |
| accountKey                       | 객체                                | 계정의 키. AccountKeyPublic, AccountKeyMultiSig 또는 AccountKeyRoleBased입니다.                                                                                                                                                                                                                           |
| keys                             | String &#124; Array &#124; Object | All keys inside accountKey that the Account has. For AccountKeyPublic, this is a single private key string; for AccountKeyMultiSig, this returns an array containing all the private key strings. In the case of AccountKeyRoleBased, an object with keys associated with each role is returned. |
| transactionKey                   | String &#124; Array               | Key used for the [RoleTransaction](../../../../klaytn/design/accounts.md#roles). AccountKeyPublic 또는 AccountKeyMultiSig는 어떤 역할에도 묶이지 않으므로, transactionKey는 키와 동일한 값을 가집니다.                                                                                                                       |
| updateKey                        | String &#124; Array               | Key used for the [RoleAccountUpdate](../../../../klaytn/design/accounts.md#roles). AccountKeyPublic 또는 AccountKeyMultiSig는 어떤 역할에도 묶이지 않으므로, updateKey는 키와 동일한 값을 가집니다.                                                                                                                          |
| feePayerKey                      | String &#124; Array               | Key used for [RoleFeePayer](../../../../klaytn/design/accounts.md#roles). AccountKeyPublic 또는 AccountKeyMultiSig는 어떤 역할에도 묶이지 않으므로, feePayerKey는 키와 동일한 값을 가집니다.                                                                                                                                 |
| signTransaction(tx [, callback]) | Function                          | 트랜잭션에 서명하는 함수. [caver.klay.accounts.signTransaction](#signtransaction)를 참조하세요.                                                                                                                                                                                                                   |
| sign(data)                       | Function                          | 트랜잭션에 서명하는 함수. [caver.klay.accounts.sign](#sign)를 참조하세요.                                                                                                                                                                                                                                         |
| encrypt                          | Function                          | The function to encrypt an Account with given password.                                                                                                                                                                                                                                          |
| getKlaytnWalletKey               | Function                          | The function to get [Klaytn Wallet Key](../../../../klaytn/design/accounts.md#klaytn-wallet-key-format).                                                                                                                                                                                         |

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
Creates an instance of Account with AccountKeyPublic.

**NOTE** `caver.klay.accounts.createWithAccountKeyPublic` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**매개변수**

| 명칭         | 형식                   | 설명                                                    |
| ---------- | -------------------- | ----------------------------------------------------- |
| address    | 문자열                  | Address of an Account.                                |
| accountKey | String &#124; Object | An AccountKeyPublic instance or a private key string. |


**리턴값**

`Object` - An Account instance, see [caver.klay.accounts.createWithAccountKey](#createwithaccountkey).

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

## createWithAccountKeyMultiSig <a id="createwithaccountkeymultisig"></a>

```javascript
caver.klay.accounts.createWithAccountKeyMultiSig(address, accountKey)
```
Creates an instance of Account with AccountKeyMultiSig.

**NOTE** `caver.klay.accounts.createWithAccountKeyMultiSig` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**매개변수**

| 명칭         | 형식                   | 설명                                                                 |
| ---------- | -------------------- | ------------------------------------------------------------------ |
| address    | 문자열                  | Address of an Account.                                             |
| accountKey | String &#124; Object | An AccountKeyMultiSig instance or an array of private key strings. |


**리턴값**

`Object` - An Account instance, see [caver.klay.accounts.createWithAccountKey](#createwithaccountkey).

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
Creates an instance of Account with AccountKeyRoleBased.

**NOTE** `caver.klay.accounts.createWithAccountKeyRoleBased` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**매개변수**

| 명칭         | 형식                   | 설명                                                                               |
| ---------- | -------------------- | -------------------------------------------------------------------------------- |
| address    | 문자열                  | Address of an Account.                                                           |
| accountKey | String &#124; Object | An AccountKeyRoleBased instance or an object that defines the key for each role. |


**리턴값**

`Object` - An Account instance, see [caver.klay.accounts.createWithAccountKey](#createwithaccountkey).

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
Creates an instance of `AccountKeyPublic`, `AccountKeyMultiSig`, or `AccountKeyRoleBased` depending on the type of parameter.

AccountKey is a data structure for managing keys in caver-js. Use AccountKeyPublic if you want to use a single private key, AccountKeyMultiSig if you want to use multiple private keys, or AccountKeyRoleBased if you want to use a different key for each role.

**NOTE** `caver.klay.accounts.createAccountKey` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**매개변수**

| 명칭  | 형식                                | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key | String &#124; Array &#124; Object | Key for generating AccountKey. If `key` is a single private key string, an AccountKeyPublic instance is created. If `key` is an array containing multiple private key strings, an AccountKeyMultiSig instance is created. If `key` is an object defining a key (a private key string or an array of private key strings) for each role, an AccountKeyRoleBased instance is created. AccountKeyRoleBased instance can have AccountKeyPublic or AccountKeyMultiSig for each role. |


**리턴값**

`Object` - An AccountKeyPublic, AccountKeyMultiSig or AccountKeyRoleBased instance is returned with the following properties:

| 명칭             | 형식                                | 설명                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| type           | 문자열                               | The type of AccountKey instance.                                                                                                                                                                                                                                                                                                                                                                       |
| defaultKey     | 문자열                               | Default private key of AccountKey. The default private key represents a single private key string defined for AccountKeyPublic, and a private key string in the zeroth index of the array if AccountKeyMultiSig. For AccountKeyRoleBased, it represents the defaultKey of the first found AccountKey, where the AccountKey is searched in the following order: transactionkey, updateKey, feePayerKey. |
| keys           | String &#124; Array &#124; Object | All private keys defined inside the AccountKey instance. For AccountKeyPublic, this is a single private key string; for AccountKeyMultiSig, this returns an array containing all the private key strings. In the case of AccountKeyRoleBased, an object with keys associated with each role is returned.                                                                                               |
| transactionKey | String &#124; Array               | Key used for the [RoleTransaction](../../../../klaytn/design/accounts.md#roles). AccountKeyPublic 또는 AccountKeyMultiSig는 어떤 역할에도 묶이지 않으므로, transactionKey는 키와 동일한 값을 가집니다.                                                                                                                                                                                                                             |
| updateKey      | String &#124; Array               | Key used for the [RoleAccountUpdate](../../../../klaytn/design/accounts.md#roles). AccountKeyPublic 또는 AccountKeyMultiSig는 어떤 역할에도 묶이지 않으므로, updateKey는 키와 동일한 값을 가집니다.                                                                                                                                                                                                                                |
| feePayerKey    | String &#124; Array               | Key used for [RoleFeePayer](../../../../klaytn/design/accounts.md#roles). AccountKeyPublic 또는 AccountKeyMultiSig는 어떤 역할에도 묶이지 않으므로, feePayerKey는 키와 동일한 값을 가집니다.                                                                                                                                                                                                                                       |

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
Creates an instance of `AccountKeyPublic` with the given private key string.

**NOTE** `caver.klay.accounts.createAccountKeyPublic` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**매개변수**

| 명칭  | 형식  | 설명                                                       |
| --- | --- | -------------------------------------------------------- |
| key | 문자열 | A string of private key for generating AccountKeyPublic. |


**리턴값**

`Object` - An AccountKeyPublic instance, see [caver.klay.accounts.createAccountKey](#createaccountkey).


**예시**

```javascript
> caver.klay.accounts.createAccountKeyPublic('0x{private key}')
AccountKeyPublic {
    _key: '0x{private key}'
}
```

## createAccountKeyMultiSig <a id="createaccountkeymultisig"></a>

```javascript
caver.klay.accounts.createAccountKeyMultiSig(keys)
```
Creates an instance of `AccountKeyMultiSig` with the given multiple private keys.

**NOTE** `caver.klay.accounts.createAccountKeyMultiSig` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**매개변수**

| 명칭   | 형식 | 설명                                                                 |
| ---- | -- | ------------------------------------------------------------------ |
| keys | 배열 | An array of private key strings for generating AccountKeyMultiSig. |


**리턴값**

`Object` - An AccountKeyMultiSig instance, see [caver.klay.accounts.createAccountKey](#createaccountkey).


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
Creates an instance of `AccountKeyRoleBased` with the given keys associated with each role.

**NOTE** `caver.klay.accounts.createAccountKeyRoleBased` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**매개변수**

| 명칭        | 형식 | 설명                                                                                                                 |
| --------- | -- | ------------------------------------------------------------------------------------------------------------------ |
| keyObject | 객체 | An object with role-key pairs. A key for each role can be a private key string or an array of private key strings. |


**리턴값**

`Object` - An AccountKeyRoleBased instance, see [caver.klay.accounts.createAccountKey](#createaccountkey).


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
This function converts the private key of AccountKey to public key.

**NOTE** `caver.klay.accounts.accountKeyToPublicKey` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**매개변수**

| 명칭         | 형식                                | 설명                                                                                                                                                                                                                                                 |
| ---------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accountKey | String &#124; Array &#124; Object | An AccountKey instance (`AccountKeyPublic`, `AccountKeyMultiSig` or `AccountKeyRoleBased`) or a data structure that contains the key info (a private key string, an array of private key strings or an object that defines the key for each role). |

**리턴값**

| 형식                                | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| String &#124; Array &#124; Object | If the parameter is an AccountKeyPublic instance or a private key string, a public key string is returned. If the parameter is an AccountKeyMultiSig instance or an array of private key strings, an array of public-key strings is returned. If the parameter is an AccountKeyRoleBased instance or an object defining a key (a private key string or an array of private key strings) for each role, an object with role and public-key (a public-key string or an array of public-key strings) pairs is returned. |


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
Creates an account object from a private key.

**매개변수**

| 명칭         | 형식  | 설명                          |
| ---------- | --- | --------------------------- |
| privateKey | 문자열 | The private key to convert. |


**리턴값**

`Object` - The account object

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
Gets public key from a given private key

**매개변수**

| 명칭         | 형식  | 설명                          |
| ---------- | --- | --------------------------- |
| privateKey | 문자열 | The private key to convert. |


**리턴값**

`String` - The public key (64 bytes)

**예시**

```javascript
> caver.klay.accounts.privateKeyToPublicKey('0x{private key}')
'0xbb1846722a4c27e71196e1a44611ee7174276a6c51c4830fb810cac64b0725f217cb8783625a809d1303adeeec2cf036ab74098a77a6b7f1003486e173b29aa7'
```

## createAccountForUpdate <a id="createaccountforupdate"></a>

```javascript
caver.klay.accounts.createAccountForUpdate(address, accountKey, options)
```
Creates an instance of `AccountForUpdate`. AccountForUpdate contains the address of the account and the new public key to update.

`AccountForUpdate` can be used in the account update transaction object (`ACCOUNT_UPDATE`, `FEE_DELEGATED_ACCOUNT_UPDATE`, or `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO`) as a `key`. If you want to know how to use `AccountForUpdate` in the transaction, see [Account update with AccountForUpdate](../getting-started.md#account-update-with-accountforupdate).

**NOTE** `caver.klay.accounts.createAccountForUpdate` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**매개변수**

| 명칭         | 형식                                | 설명                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address    | 문자열                               | Address of an Account.                                                                                                                                                                                                                                                                                                                                                                                              |
| accountKey | String &#124; Array &#124; Object | AccountKey instance (`AccountKeyPublic`, `AccountKeyMultiSig` or `AccountKeyRoleBased`) or the equivalent key info (a private key string, an array of private key strings or an object defining key(s) with role(s)). If accountKey is not an AccountKey instance, this method internally calls [caver.klay.accounts.createAccountKey](#createaccountkey) to create an AccountKey instance from the given key info. |
| options    | 객체                                | An optional object containing the threshold and weight. This is required when using AccountKeyMultiSig. The usage is shown in the example below.                                                                                                                                                                                                                                                                    |

**리턴값**

`Object` - An AccountForUpdate instance is returned, with the following properties:

| 명칭           | 형식  | 설명                                                                         |
| ------------ | --- | -------------------------------------------------------------------------- |
| address      | 문자열 | Address of the account to be updated.                                      |
| keyForUpdate | 객체  | An object containing the new public key derived from the given accountKey. |


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
Creates an instance of `AccountForUpdate` with the public key of the new key to update.

`AccountForUpdate` can be used in the account update transaction object (`ACCOUNT_UPDATE`, `FEE_DELEGATED_ACCOUNT_UPDATE`, or `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO`) as a `key`. If you want to know how to use `AccountForUpdate` in the transaction, see [Account update with AccountForUpdate](../getting-started.md#account-update-with-accountforupdate).

**NOTE** `caver.klay.accounts.createAccountForUpdateWithPublicKey` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**매개변수**

| 명칭           | 형식                                | 설명                                                                                                                                                                                                                                                                      |
| ------------ | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address      | 문자열                               | Address of an Account.                                                                                                                                                                                                                                                  |
| keyForUpdate | String &#124; Array &#124; Object | The public-key of the new key to update. This value is a single public-key string when the key is AccountKeyPublic, an array of public-key strings when AccountKeyMultiSig, an object when the key is AccountKeyRoleBased.                                              |
| options      | 객체                                | An optional object containing the threshold and weight. This is required when using AccountKeyMultiSig. If you use AccountkeyMultiSig as one of the keys in AccountKeyRoleBased, specify the role of the threshold and weight. The usage is shown in the example below. |

**리턴값**

`Object` - An AccountForUpdate instance, see [caver.klay.accounts.createAccountForUpdate](#createaccountforupdate).


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
Creates an AccountForUpdate instance to update the account's key with [AccountKeyLegacy](../../../../klaytn/design/accounts.md#accountkeylegacy). Make sure you have a private key that matches your account address before updating to AccountKeyLegacy.

`AccountForUpdate` can be used in the account update transaction object (`ACCOUNT_UPDATE`, `FEE_DELEGATED_ACCOUNT_UPDATE`, or `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO`) as a `key`. If you want to know how to use `AccountForUpdate` in the transaction, see [Account update with AccountForUpdate](../getting-started.md#account-update-with-accountforupdate).

**NOTE** `caver.klay.accounts.createAccountForUpdateWithLegacyKey` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**매개변수**

| 명칭      | 형식  | 설명                     |
| ------- | --- | ---------------------- |
| address | 문자열 | Address of an Account. |

**리턴값**

`Object` - An AccountForUpdate instance, see [caver.klay.accounts.createAccountForUpdate](#createaccountforupdate).


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
Creates an AccountForUpdate instance to update the account's key with [AccountKeyFail](../../../../klaytn/design/accounts.md#accountkeyfail). Transactions sent by an account with AccountKeyFail always fail in the validation process.

`AccountForUpdate` can be used in the account update transaction object (`ACCOUNT_UPDATE`, `FEE_DELEGATED_ACCOUNT_UPDATE`, or `FEE_DELEGATED_ACCOUNT_UPDATE_WITH_RATIO`) as a `key`. If you want to know how to use `AccountForUpdate` in the transaction, see [Account update with AccountForUpdate](../getting-started.md#account-update-with-accountforupdate).

**NOTE** `caver.klay.accounts.createAccountForUpdateWithFailKey` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**매개변수**

| 명칭      | 형식  | 설명                     |
| ------- | --- | ---------------------- |
| address | 문자열 | Address of an Account. |

**리턴값**

`Object` - An AccountForUpdate instance, see [caver.klay.accounts.createAccountForUpdate](#createaccountforupdate).


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
caver.klay.accounts.signTransaction(tx, privateKey [, callback])
```
Signs a Klaytn transaction with a given private key.

**매개변수**

| 명칭         | 형식                  | 설명                                                                                                                                                                                                                           |
| ---------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tx         | 객체                  | The transaction object.  The fields of the transaction object are different for each transaction type. For a description of each transaction, see [caver.klay.sendTransaction](./caver.klay/transaction.md#sendtransaction). |
| privateKey | String &#124; Array | (optional) The private key to sign with.                                                                                                                                                                                     |
| callback   | Function            | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                                                                                                         |

**NOTE** The `privateKey` parameter has been changed to an `optional parameter` since caver-js [v1.2.0-rc.3](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.3). Also, privateKey parameter supports `array` of private key strings since caver-js [v1.2.0-rc.3](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.3). If you do not pass a privateKey, either `from` or `feePayer` account must exist in caver.klay.accounts.wallet to sign the transaction. If an array of privateKeys are provided, the transaction is signed with all the keys inside the array.

**리턴값**

`Promise` returning `Object`: The RLP encoded signed transaction. The object properties are as follows:

| 명칭                 | 형식             | 설명                                                                                                           |
| ------------------ | -------------- | ------------------------------------------------------------------------------------------------------------ |
| messageHash        | 문자열            | The hash of the given message.                                                                               |
| r                  | 문자열            | First 32 bytes of the signature.                                                                             |
| s                  | 문자열            | Next 32 bytes of the signature.                                                                              |
| v                  | 문자열            | Recovery value + 27.                                                                                         |
| rawTransaction     | 문자열            | The RLP encoded transaction, ready to be send using caver.klay.sendSignedTransaction.                        |
| txHash             | 32-byte String | 트랜잭션의 해시입니다.                                                                                                 |
| senderTxHash       | 32-byte String | 트랜잭션 발신자만 서명한 트랜잭션의 해시입니다. See [SenderTxHash](../../../../klaytn/design/transactions/README.md#sendertxhash) |
| signatures         | 배열             | (optional) An array of the sender's signature(s).                                                            |
| feePayerSignatures | 배열             | (optional) An array of the fee payer's signature(s).                                                         |

**NOTE** The signatures and feePayerSignatures properties have been added since caver-js [v1.2.0-rc.3](https://www.npmjs.com/package/caver-js/v/1.2.0-rc.3). If the sender signs the transaction, the signature array is returned in `signatures`. If the fee payer signs, the signature array is returned in `feePayerSignatures`.

**예시**

```javascript
// sign legacy transaction with private key string
> caver.klay.accounts.signTransaction({
    from: '0x72519cf34d9aa14629e7ad0cad5d55a3bb398364',
    to: '0xa9d2cc2bb853163b6eadfb6f962d72f7e00bc2e6',
    value: caver.utils.toPeb(1, 'KLAY'),
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
    value: caver.utils.toPeb(1, 'KLAY'),
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
    value: caver.utils.toPeb(1, 'KLAY'),
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
    value: caver.utils.toPeb(1, 'KLAY'),
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


## recoverTransaction <a id="recovertransaction"></a>

```javascript
caver.klay.accounts.recoverTransaction(rawTransaction)
```
Recovers the Klaytn address that was used to sign the given RLP encoded transaction.

**매개변수**

| 명칭        | 형식  | 설명                           |
| --------- | --- | ---------------------------- |
| signature | 문자열 | The RLP encoded transaction. |

**리턴값**

| 형식  | 설명                                                |
| --- | ------------------------------------------------- |
| 문자열 | The Klaytn address used to sign this transaction. |

**예시**

```js
> caver.klay.accounts.recoverTransaction('0xf86180808401ef364594f0109fc8df283027b6285cc889f5aa624eac1f5580801ca031573280d608f75137e33fc14655f097867d691d5c4c44ebe5ae186070ac3d5ea0524410802cdc025034daefcdfa08e7d2ee3f0b9d9ae184b2001fe0aff07603d9');
'0xF0109fC8DF283027b6285cc889F5aA624EaC1F55'
```


## hashMessage <a id="hashmessage"></a>

```javascript
caver.klay.accounts.hashMessage(message)
```

Hashes the given message in order for it to be passed to [caver.klay.accounts.recover](#recover). The data will be UTF-8 HEX decoded and enveloped as follows:
```
"\x19Klaytn Signed Message:\n" + message.length + message
```
and hashed using keccak256.

**매개변수**

| 명칭      | 형식  | 설명                                                                         |
| ------- | --- | -------------------------------------------------------------------------- |
| message | 문자열 | A message to hash.  If it is a HEX string, it will be UTF-8 decoded first. |


**리턴값**

| 형식  | 설명                 |
| --- | ------------------ |
| 문자열 | The hashed message |


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
Signs arbitrary data. This data is before UTF-8 HEX decoded and enveloped as follows:
```
"\x19Klaytn Signed Message:\n" + message.length + message
```

**매개변수**

| 명칭         | 형식  | 설명                            |
| ---------- | --- | ----------------------------- |
| data       | 문자열 | The data to sign.             |
| privateKey | 문자열 | The private key to sign with. |


**리턴값**

`String|Object`: The signed data RLP encoded signature. The signature values as follows:

| 명칭          | 형식  | 설명                               |
| ----------- | --- | -------------------------------- |
| message     | 문자열 | The given message.               |
| messageHash | 문자열 | The hash of the given message.   |
| r           | 문자열 | First 32 bytes of the signature. |
| s           | 문자열 | Next 32 bytes of the signature.  |
| v           | 문자열 | Recovery value + 27              |
| signature   | 문자열 | The generated signature.         |


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
Recovers the Klaytn address that was used to sign the given data.

**매개변수**

| 명칭                             | 형식                   | 설명                                                                                                                                                                                                                         |
| ------------------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| message &#124; signatureObject | String &#124; Object | Either signed message or hash. For the details of the signature object, see the table below.                                                                                                                               |
| messageHash                    | 문자열                  | The hash of the given message.                                                                                                                                                                                             |
| signature                      | 문자열                  | The raw RLP encoded signature, OR parameter 2-4 as v, r, s values.                                                                                                                                                         |
| preFixed                       | 불리언                  | (optional, default: `false`) If the last parameter is `true`, the given message will NOT automatically be prefixed with `"\x19Klaytn Signed Message:\n" + message.length + message`, and assumed to be already prefixed. |

The signature object has following values:

| 명칭          | 형식  | 설명                                                                                                                 |
| ----------- | --- | ------------------------------------------------------------------------------------------------------------------ |
| messageHash | 문자열 | The hash of the given message already prefixed with `"\x19Klaytn Signed Message:\n" + message.length + message`. |
| r           | 문자열 | First 32 bytes of the signature.                                                                                   |
| s           | 문자열 | Next 32 bytes of the signature.                                                                                    |
| v           | 문자열 | Recovery value + 27                                                                                                |


**리턴값**

| 형식  | 설명                                         |
| --- | ------------------------------------------ |
| 문자열 | The Klaytn address used to sign this data. |


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


## encrypt <a id="encrypt"></a>

```javascript
caver.klay.accounts.encrypt(encryptTarget, password [, options])
```
Encrypts an account to the Klaytn keystore standard.

**NOTE** Since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0), `caver.klay.accounts.encrypt` encrypts using the keystore v4 standard to encrypt various AccountKey types (AccountKeyPublic, AccountKeyMultiSig, AccountKeyRoleBased).

**매개변수**

| 명칭            | 형식                                | 설명                                                                                                                                                                                                                                                                                                                                   |
| ------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| encryptTarget | String &#124; Array &#124; Object | A private key or a Klaytn wallet key to encrypt. Since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0), encryptTarget also can be an instance of Account or AccountKey (AccountKeyPublic, AccountKeyMultiSig, or AccountKeyRoleBased), an array of private key strings or an object that defines the keys by role. |
| password      | 문자열                               | The password used for encryption.                                                                                                                                                                                                                                                                                                    |
| options       | 객체                                | (optional) The `options` parameter allows you to specify the values to use when using encrypt. You can also use the options object to encrypt decoupled accounts. See the example below for usage of `options`.                                                                                                                      |

**NOTE** If account address cannot be extracted from encryptTarget (when AccountKeyMultiSig, AccountKeyRoleBased, an array of private key strings or an object that defines the keys by role) or if the account's private key is decoupled from address, you must specify the address in the options object.

**NOTE**: There are two ways to encrypt the private key when an account has a decoupled private key from the address.
1. privateKey 매개변수와 함께 [KlaytnWalletKey](../../../../klaytn/design/accounts.md#klaytn-wallet-key-format) 포맷을 사용하세요.
2. 주소를 매개변수로 보내기 위해 `options.address`를 사용하세요.

**리턴값**

| 형식 | 설명                                                                                                                                                                                |
| -- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 객체 | The encrypted keystore JSON. Since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0), keystore v4 is used. The example below illustrates both keystore v3 and v4. |


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


## decrypt <a id="decrypt"></a>

```javascript
caver.klay.accounts.decrypt(keystoreJsonV3, password)
```
Decrypts a keystore v3 or v4 JSON and returns the decrypted account object.

**NOTE** Since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0), `caver.klay.accounts.decrypt` can decrypt the keystore v4.

**매개변수**

| 명칭           | 형식  | 설명                                                       |
| ------------ | --- | -------------------------------------------------------- |
| keystoreJson | 문자열 | JSON string containing the encrypted account to decrypt. |
| password     | 문자열 | The password used for encryption.                        |


**리턴값**

| 형식 | 설명                     |
| -- | ---------------------- |
| 객체 | The decrypted account. |


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
Determines if the key is decoupled from the address.

**매개변수**

| 명칭      | 형식  | 설명                                                                                                                                                                          |
| ------- | --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key     | 문자열 | Key to determine if decoupled from address. Key can be a 32-byte string private key or a [KlaytnWalletKey](../../../../klaytn/design/accounts.md#klaytn-wallet-key-format). |
| address | 문자열 | (optional) Address to be used to determine if decoupled. If no address is given, the address is derived from the key.                                                       |


**리턴값**

| 형식  | 설명                                                                               |
| --- | -------------------------------------------------------------------------------- |
| 불리언 | `true` if the key is decoupled from the address. `false` if it is not decoupled. |


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
Returns an account that has an address derived from the given private key. See [AccountKeyLegacy](../../../../klaytn/design/accounts.md#accountkeylegacy).

**매개변수**

| 명칭  | 형식  | 설명                                                                                                                                                                                                                                                                                 |
| --- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key | 문자열 | The parameter used to get an account that has a legacy account key. Key can be a 32-byte string private key or a [KlaytnWalletKey](../../../../klaytn/design/accounts.md#klaytn-wallet-key-format). In KlaytnWalletKey, only the portion corresponding to the private key is used. |


**리턴값**

| 형식 | 설명                                                                                                                                               |
| -- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 객체 | An account object with a legacy account key of the given value. If there is address information extracted from the key, it is returned together. |


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
Contains an in-memory wallet with multiple accounts.  These accounts can be used when using [caver.klay.sendTransaction](./caver.klay/transaction.md#sendtransaction).

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


## wallet.create  <a id="wallet-create"></a>

```javascript
caver.klay.accounts.wallet.create([numberOfAccounts] [, entropy])
```
Generates one or more accounts in the wallet with randomly generated key pairs. If wallets already exist, they will not be overridden.

**매개변수**

| 명칭               | 형식     | 설명                                                                                                        |
| ---------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| numberOfAccounts | Number | (optional) The number of accounts to create. Leave empty to create an empty wallet.                       |
| entropy          | 문자열    | (선택 사항) 엔트로피를 증가시키는 임의의 문자열. 아무 것도 지정하지 않으면 [randomHex](./caver.utils.md#randomhex)를 사용하여 임의의 문자열이 생성됩니다. |

**리턴값**

| 형식 | 설명                 |
| -- | ------------------ |
| 객체 | The wallet object. |


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
Adds an account using a private key or account object to the wallet.

**NOTE**: If the same address exists inside the wallet, an error is returned. If you want to change the private key associated to an account in the wallet, please use [caver.klay.accounts.wallet.updatePrivateKey](#wallet-updateprivatekey).


**매개변수**

| 명칭            | 형식                   | 설명                                                                                  |
| ------------- | -------------------- | ----------------------------------------------------------------------------------- |
| 계정 (Account)  | String &#124; Object | A private key or account object created with [caver.klay.accounts.create](#create). |
| targetAddress | 문자열                  | A target address which will be used with a given private key.                       |

**NOTE**: caver-js supports two types of private key formats. One is a raw private key format of a 32-byte string type and the other is the [KlaytnWalletKey](../../../../klaytn/design/accounts.md#klaytn-wallet-key-format).

**리턴값**

| 형식 | 설명                 |
| -- | ------------------ |
| 객체 | The added account. |


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


## wallet.remove <a id="wallet-remove"></a>

```javascript
caver.klay.accounts.wallet.remove(account)
```
Removes an account from the wallet.

**매개변수**

| 명칭           | 형식                   | 설명                                              |
| ------------ | -------------------- | ----------------------------------------------- |
| 계정 (Account) | String &#124; Number | The account address or the index in the wallet. |


**리턴값**

| 형식  | 설명                                                                  |
| --- | ------------------------------------------------------------------- |
| 불리언 | `true` if the wallet was removed. `false` if it could not be found. |


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
Securely empties the wallet and removes all its accounts.

**매개변수**

없음

**리턴값**

| 형식 | 설명                 |
| -- | ------------------ |
| 객체 | The wallet object. |

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
Encrypts all wallet accounts and returns an array of encrypted keystore v3 objects.

**매개변수**

| 명칭       | 형식  | 설명                                             |
| -------- | --- | ---------------------------------------------- |
| password | 문자열 | The password that will be used for encryption. |


**리턴값**

| 형식 | 설명                                 |
| -- | ---------------------------------- |
| 배열 | The encrypted keystore v3 objects. |


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
Decrypts keystore v3 objects.

**매개변수**

| 명칭            | 형식  | 설명                                            |
| ------------- | --- | --------------------------------------------- |
| keystoreArray | 배열  | The encrypted keystore v3 objects to decrypt. |
| password      | 문자열 | The password that was used for encryption.    |


**리턴값**

| 형식 | 설명                 |
| -- | ------------------ |
| 객체 | The wallet object. |


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
Return the Klaytn wallet key for the account on the wallet of caver-js.

**매개변수**

| 명칭             | 형식                 | 설명                                                                                                                   |
| -------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| indexOrAddress | Number&#124;String | An index in the wallet address list, an address in hexadecimal. The given value should exist in the caver-js wallet. |


**리턴값**

| 형식  | 설명                                                                                       |
| --- | ---------------------------------------------------------------------------------------- |
| 문자열 | KlaytnWalletKey that matches the account. This value allows you to log in to the wallet. |


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
Update the account's private key information stored in the wallet.

**NOTE**: This function only changes the information stored in the wallet of caver-js. This function has no effect on the key information stored on the Klaytn network. Keys in the Klaytn network can be changed by sending a ['ACCOUNT_UPDATE'](./caver.klay/sendtx_account_update.md#sendtransaction-account_update) transaction.

**NOTE** `updatePrivateKey` only works if the account's accountKey is AccountKeyPublic. Since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0) supports AccountKeys (AccountKeyPublic, AccountKeyMultiSig, AccountKeyRoleBased), `privateKey` becomes a read-only property referencing the defaultKey of the accountKey. This method does not directly update the `privateKey`, instead update the accountKey. This method is maintained for backward-compatibility. It is now recommended to use more generic [caver.utils.updateAccountKey](#wallet-updateaccountkey).

**매개변수**

| 명칭         | 형식  | 설명                                      |
| ---------- | --- | --------------------------------------- |
| privateKey | 문자열 | New private key to be used for updates. |
| address    | 문자열 | The account address in the wallet.      |


**리턴값**

| 형식 | 설명                                                                                              |
| -- | ----------------------------------------------------------------------------------------------- |
| 객체 | Account instance with the new accountKey. The Account instance lives in-memory caver-js wallet. |


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
Update the account's account key information stored in the wallet. When you update your account's accountKey, privateKey is updated as well to the defaultKey of the new accountKey.

If the accountKey parameter is a single private key string, the account's accountKey is updated with an `AccountKeyPublic` instance. If the accountKey parameter is an array with multiple private key strings, the account's accountKey is updated with an `AccountKeyMultiSig` instance. If the accountKey parameter is an object whose keys are defined by roles, the account's accountKey is updated with an `AccountKeyRoleBased` instance.

**NOTE**: This function only changes the information stored in the wallet of caver-js. This function has no effect on the key information stored on the Klaytn network. Keys in the Klaytn network can be changed by sending a ['ACCOUNT_UPDATE'](./caver.klay/sendtx_account_update.md#sendtransaction-account_update) transaction.

**NOTE** `caver.klay.accounts.wallet.updateAccountKey` is supported since caver-js [v1.2.0](https://www.npmjs.com/package/caver-js/v/1.2.0).

**매개변수**

| 명칭         | 형식                                | 설명                                                                                                                                                                                                                                                 |
| ---------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address    | 문자열                               | The account address in the wallet.                                                                                                                                                                                                                 |
| accountKey | String &#124; Array &#124; Object | An AccountKey instance (`AccountKeyPublic`, `AccountKeyMultiSig` or `AccountKeyRoleBased`) or a data structure that contains the key info (a private key string, an array of private key strings or an object that defines the key for each role). |


**리턴값**

| 형식 | 설명                                                                                              |
| -- | ----------------------------------------------------------------------------------------------- |
| 객체 | Account instance with the new accountKey. The Account instance lives in-memory caver-js wallet. |


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
