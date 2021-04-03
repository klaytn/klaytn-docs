# caver.rpc.klay <a id="caver-rpc-klay"></a>

`caver.rpc.klay`는 `klay` 네임 스페이스를 가진 JSON-RPC API를 호출합니다.

## caver.rpc.klay.accountCreated <a id="caver-rpc-klay-accountcreated"></a>

```javascript
caver.rpc.klay.accountCreated(address [, blockNumber] [, callback])
```

입력된 주소의 계정이 Klaytn 블록체인 플랫폼(Klaytn)에 존재하는 경우 `true`를 반환합니다. 해당 주소의 계정이 존재하지 않으면 `false`를 반환합니다.

**매개변수**

| 명칭          | 타입                   | 설명                                                                                                |
| ----------- | -------------------- | ------------------------------------------------------------------------------------------------- |
| address     | 문자열                  | 네트워크에 존재하는지 확인하고 싶은 계정 주소입니다.                                                                     |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest` or `earliest`. 이 값을 생략하면 `latest`가 기본값으로 사용됩니다. |
| callback    | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                              |

**리턴값**

`프로미스`는 `boolean`을 반환합니다.

| 타입      | 설명                                   |
| ------- | ------------------------------------ |
| boolean | 입력으로 받은 주소가 Klaytn에 존재하는지 여부를 반환합니다. |

**예시**

```javascript
> caver.rpc.klay.accountCreated('0x{address in hex}').then(console.log)
true
```

## caver.rpc.klay.getAccount <a id="caver-rpc-klay-getaccount"></a>

```javascript
caver.rpc.klay.getAccount(address [, blockNumber] [, callback])
```

입력으로 받은 Klaytn 계정 주소의 계정 정보를 반환합니다. Klaytn 계정 타입에 관한 자세한 내용은 [Klaytn Account Types](../../../../../klaytn/design/accounts.md#klaytn-account-types)를 확인하십시오.

**참고** `caver.rpc.klay.getAccount` 는 계정이 Klaytn에 있는 경우에만 계정을 반환하므로 주소와 일치하는 계정이 Klaytn 상에 존재하지 않으면 `null` 이 반환됩니다.

**매개변수**

| 명칭          | 타입                   | 설명                                                                                                |
| ----------- | -------------------- | ------------------------------------------------------------------------------------------------- |
| address     | 문자열                  | 계정 정보를 알고 싶은 계정 주소입니다.                                                                            |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest` or `earliest`. 이 값을 생략하면 `latest`가 기본값으로 사용됩니다. |
| callback    | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                              |

**리턴값**

`프로미스`는 `Object`를 반환합니다.

| 타입     | 설명                                          |
| ------ | ------------------------------------------- |
| object | 계정 정보를 담고 있는 객체입니다. 계정 유형에 따라 다른 속성을 반환합니다. |

**예시**

```javascript
// Get account with EOA
> caver.rpc.klay.getAccount('0x{address in hex}').then(console.log)
{
    accType: 1,
    account: {
        nonce: 0,
        balance: '0x',
        humanReadable: false,
        key: { keyType: 1, key: {} }
    }
}

// Get account with SCA
> caver.rpc.klay.getAccount('0x{address in hex}').then(console.log)
{
    accType: 2,
    account: {
        nonce: 1,
        balance: '0x0',
        humanReadable: false,
        key: { keyType: 3, key: {} },
        storageRoot: '0xd0ce6b9ba63cf727d48833bcaf69f398bb353e9a5b6235ac5bb3a8e95ff90ecf',
        codeHash: '7pemrmP8fcguH/ut/SYHJoUSecfUIcUyeCpMf0sBYVI=',
        codeFormat: 0
    }
}
```

## caver.rpc.klay.getAccountKey <a id="caver-rpc-klay-getaccountkey"></a>

```javascript
caver.rpc.klay.getAccountKey(address [, blockNumber] [, callback])
```

주어진 주소의 AccountKey를 반환합니다. 입력으로 받은 주소 계정이 [AccountKeyLegacy](../../../../../klaytn/design/accounts.md#accountkeylegacy)를 AccountKey로 갖고 있거나 계정이 [스마트 컨트랙트 계정](../../../../../klaytn/design/accounts.md#smart-contract-accounts-scas)이면 빈 키 값을 반환합니다. 더 자세한 내용은 [Account Key](../../../../../klaytn/design/accounts.md#account-key)를 확인하십시오.

**참고** `caver.rpc.klay.getAccountKey`는 각 AccountKey 타입에 따라 다른 객체를 반환합니다. 주어진 주소를 가진 계정이 Klaytn에 존재하지 않는다면 `null`을 반환합니다.

**매개변수**

| 명칭          | 타입                   | 설명                                                                                                |
| ----------- | -------------------- | ------------------------------------------------------------------------------------------------- |
| address     | 문자열                  | Klaytn 계정 주소입니다. 이 메서드를 실행하면 이 계정 주소의 AccountKey 정보가 담긴 객체를 얻습니다.                                 |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest` or `earliest`. 이 값을 생략하면 `latest`가 기본값으로 사용됩니다. |
| callback    | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                              |

**리턴값**

`프로미스`는 `Object`를 반환합니다.

| 타입     | 설명                                                          |
| ------ | ----------------------------------------------------------- |
| object | AccountKey 정보를 담고 있는 객체입니다. AccountKey 유형에 따라 다른 속성을 반환합니다. |

**예시**

```javascript
// AccountKey type: AccountKeyLegacy
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{ keyType: 1, key: {} }

// AccountKey type: AccountKeyPublic
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{
    keyType: 2,
    key: { x:'0xb9a4b...', y:'0x7a285...' }
}

// AccountKey type: AccountKeyFail
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{ keyType: 3, key:{} }

// AccountKey type: AccountKeyWeightedMultiSig
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{
    keyType: 4,
    key: {
        threshold: 2,
        keys: [
            {
                weight: 1,
                key: { x: '0xae6b7...', y: '0x79ddf...' }
            },
            {
                weight: 1,
                key: { x: '0xd4256...', y: '0xfc5e7...' }
            },
            {
                weight: 1,
                key: { x: '0xd653e...', y: '0xe974e...' }
            }
        ]
    }
}

// AccountKey type: AccountKeyRoleBased
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{
    keyType: 5,
    key: [
            {
                key: { x: '0x81965...', y: '0x18242...' },
                keyType: 2
            },
            {
                key: { x: '0x73363...', y: '0xfc3e3...' },
                keyType: 2
            },
            {
                key: { x: '0x95c92...', y: '0xef783...' },
                keyType: 2
            }
    ]
}
```

## caver.rpc.klay.encodeAccountKey <a id="caver-rpc-klay-encodeaccountkey"></a>

```javascript
caver.rpc.klay.encodeAccountKey(accountKey [, callback])
```

Encodes an object that contains AccountKey information using the Recursive Length Prefix (RLP) encoding scheme. [account.getRLPEncodingAccountKey](../caver.account.md#account-getrlpencodingaccountkey)를 사용해도 RLP 인코딩된 AccountKey를 얻습니다.

**매개변수**

| 명칭         | 타입       | 설명                                                                                                                                                                                                       |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accountKey | object   | An object defines `keyType` and `key` inside or an instance of `AccountKey` ([AccountKeyLegacy][], [AccountKeyPublic][], [AccountKeyFail][], [AccountKeyWeightedMultiSig][] or [AccountKeyRoleBased][]). |
| callback   | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                                                                                     |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명                    |
| --- | --------------------- |
| 문자열 | RLP로 인코딩된 AccountKey. |

**예시**

```javascript
// AccountKey type: AccountKeyLegacy
> caver.rpc.klay.encodeAccountKey({ keyType: 1, key: {} }).then(console.log)
0x01c0

// AccountKey type: AccountKeyPublic
> caver.rpc.klay.encodeAccountKey({
        keyType: 2,
        key: {
            x: '0xdbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8',
            y: '0x906d7170ba349c86879fb8006134cbf57bda9db9214a90b607b6b4ab57fc026e',
        },
    }).then(console.log)
0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8

// AccountKey type: AccountKeyFail
> caver.rpc.klay.encodeAccountKey({ keyType: 3, key: {} }).then(console.log)
0x03c0

// AccountKey type: AccountKeyWeightedMultiSig
> caver.rpc.klay.encodeAccountKey({
        keyType: 4,
        key: {
            threshold: 2,
            keys: [
                {
                    weight: 1,
                    key: {
                        x: '0xc734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e',
                        y: '0x61a443ac3ffff164d1fb3617875f07641014cf17af6b7dc38e429fe838763712',
                    },
                },
                {
                    weight: 1,
                    key: {
                        x: '0x12d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb',
                        y: '0x8ef355a8d524eb444eba507f236309ce08370debaa136cb91b2f445774bff842',
                    },
                },
            ],
        },
    }).then(console.log)
0x04f84b02f848e301a102c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110ee301a10212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb

// AccountKey type: AccountKeyRoleBased
> caver.rpc.klay.encodeAccountKey({
        keyType: 5,
        key: [
            {
                keyType: 2,
                key: {
                    x: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d',
                    y: '0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
                },
            },
            {
                keyType: 4,
                key: {
                    threshold: 2,
                    keys: [
                        {
                            weight: 1,
                            key: {
                                x: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d',
                                y: '0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
                            },
                        },
                        {
                            weight: 1,
                            key: {
                                x: '0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06',
                                y: '0x6fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d',
                            },
                        },
                    ],
                },
            },
            {
                keyType: 2,
                key: {
                    x: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447',
                    y: '0x94c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
                },
            },
        ],
    }).then(console.log)
0x05f898a302a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512db84e04f84b02f848e301a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512de301a10336f6355f5b532c3c160

// Use an AccountKey instance
> const accountKey = caver.account.create('0x{address in hex}', '0xf1d2e...').accountKey
> caver.rpc.klay.encodeAccountKey(accountKey).then(console.log)
0x02a102f1d2e558cfa07151534cd406b1ac5c25d99e9c1cf925328d14fd15c6fe50df27
```

## caver.rpc.klay.decodeAccountKey <a id="caver-rpc-klay-decodeaccountkey"></a>

```javascript
caver.rpc.klay.decodeAccountKey(encodedKey [, callback])
```

RLP 인코딩된 AccountKey를 디코딩 합니다. [caver.account.accountKey.decode](../caver.account.md#caver-account-accountkey-decode)를 사용해도 RLP 인코딩된 AccountKey를 디코딩합니다.

**매개변수**

| 명칭         | 타입       | 설명                                                                   |
| ---------- | -------- | -------------------------------------------------------------------- |
| encodedKey | 문자열      | RLP로 인코딩된 AccountKey.                                                |
| callback   | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Object`를 반환합니다.

| 타입     | 설명                               |
| ------ | -------------------------------- |
| object | 내부에 `keyType`과 `key`가 정의된 객체입니다. |

**예시**

```javascript
// AccountKey type: AccountKeyLegacy
> caver.rpc.klay.decodeAccountKey('0x01c0').then(console.log)
{ keyType: 1, key: {} }

// AccountKey type: AccountKeyPublic
> caver.rpc.klay.decodeAccountKey('0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8').then(console.log)
{
    keyType: 2,
    key: {
        x: '0xdbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8',
        y: '0x906d7170ba349c86879fb8006134cbf57bda9db9214a90b607b6b4ab57fc026e',
    },
}

// AccountKey type: AccountKeyFail
> caver.rpc.klay.decodeAccountKey('0x03c0').then(console.log)
{ keyType: 3, key: {} }

// AccountKey type: AccountKeyWeightedMultiSig
> caver.rpc.klay.decodeAccountKey('0x04f84b02f848e301a102c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110ee301a10212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb').then(console.log)
{
    keyType: 4,
    key: {
        threshold: 2,
        keys: [
            {
                weight: 1,
                key: {
                    x: '0xc734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e',
                    y: '0x61a443ac3ffff164d1fb3617875f07641014cf17af6b7dc38e429fe838763712',
                },
            },
            {
                weight: 1,
                key: {
                    x: '0x12d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb',
                    y: '0x8ef355a8d524eb444eba507f236309ce08370debaa136cb91b2f445774bff842',
                },
            },
        ],
    },
}


// AccountKey type: AccountKeyRoleBased
> caver.rpc.klay.decodeAccountKey('0x05f898a302a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512db84e04f84b02f848e301a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512de301a10336f6355f5b532c3c160').then(console.log)
{
    keyType: 5,
    key: [
        {
            keyType: 2,
            key: {
                x: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d',
                y: '0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
            },
        },
        {
            keyType: 4,
            key: {
                threshold: 2,
                keys: [
                    {
                        weight: 1,
                        key: {
                            x: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d',
                            y: '0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
                        },
                    },
                    {
                        weight: 1,
                        key: {
                            x: '0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06',
                            y: '0x6fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d',
                        },
                    },
                ],
            },
        },
        {
            keyType: 2,
            key: {
                x: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447',
                y: '0x94c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
            },
        },
    ],
}
```

## caver.rpc.klay.getBalance <a id="caver-rpc-klay-getbalance"></a>

```javascript
caver.rpc.klay.getBalance(address [, blockNumber] [, callback])
```

입력으로 받은 Klaytn 계정 주소의 잔액을 반환합니다.

**매개변수**

| 명칭          | 타입                   | 설명                                                                                                |
| ----------- | -------------------- | ------------------------------------------------------------------------------------------------- |
| address     | 문자열                  | 잔액을 알고 싶은 계정 주소입니다.                                                                               |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest` or `earliest`. 이 값을 생략하면 `latest`가 기본값으로 사용됩니다. |
| callback    | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                              |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명                       |
| --- | ------------------------ |
| 문자열 | 주어진 주소의 peb 단위 현재 잔액입니다. |

**예시**

```javascript
> caver.rpc.klay.getBalance('0x{address in hex}').then(console.log)
0xde0b6b3a7640000
```

## caver.rpc.klay.getCode <a id="caver-rpc-klay-getcode"></a>

```javascript
caver.rpc.klay.getCode(address [, blockNumber] [, callback])
```

입력으로 받은 주소의 코드를 반환합니다.

**매개변수**

| 명칭          | 타입                   | 설명                                                                                                |
| ----------- | -------------------- | ------------------------------------------------------------------------------------------------- |
| address     | 문자열                  | 코드를 알고 싶은 주소입니다.                                                                                  |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest` or `earliest`. 이 값을 생략하면 `latest`가 기본값으로 사용됩니다. |
| callback    | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                              |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명                 |
| --- | ------------------ |
| 문자열 | 입력으로 받은 주소의 코드입니다. |

**예시**

```javascript
> caver.rpc.klay.getCode('0x{address in hex}').then(console.log)
0x60806...
```

## caver.rpc.klay.getTransactionCount <a id="caver-rpc-klay-gettransactioncount"></a>

```javascript
caver.rpc.klay.getTransactionCount(address [, blockNumber] [, callback])
```

어떤 주소의 계정에서 발신된 트랜잭션의 총 개수를 반환합니다.

**매개변수**

| 명칭          | 타입                   | 설명                                                                                                                                                                                                                                                               |
| ----------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address     | 문자열                  | 발신한 트랜잭션 개수를 확인할 주소입니다.                                                                                                                                                                                                                                          |
| blockNumber | number &#124; string | (optional) A block number, the string `pending` for the pending nonce, or the string `earliest` or `latest` as in the [default block parameter](../../../../json-rpc/api-references/klay/block.md#the-default-block-parameter). 이 값을 생략하면 `latest`가 기본값으로 사용됩니다. |
| callback    | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |[]                                                                                                                                                                                         |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명                                        |
| --- | ----------------------------------------- |
| 문자열 | 주어진 주소에서 발신된 트랜잭션의 개수입니다. 이 값은 16진수 값입니다. |

**예시**

```javascript
> caver.rpc.klay.getTransactionCount('0x{address in hex}').then(console.log)
0x5f
```

## caver.rpc.klay.isContractAccount <a id="caver-rpc-klay-iscontractaccount"></a>

```javascript
caver.rpc.klay.isContractAccount(address [, blockNumber] [, callback])
```

특정 번호의 블록 시간에서 입력으로 받은 계정의 codeHash가 비어 있지 않은 경우 `true`를 반환합니다. 해당 계정이 EOA이거나 codeHash가 비어 있는 스마트 컨트랙트 계정이면 `false`를 반환합니다. 더 자세한 내용은 [Smart Contract Account](../../../../../klaytn/design/accounts.md#smart-contract-accounts-scas)를 확인하십시오.

**매개변수**

| 명칭          | 타입                   | 설명                                                                                                |
| ----------- | -------------------- | ------------------------------------------------------------------------------------------------- |
| address     | 문자열                  | isContractAccount로 확인할 주소입니다.                                                                     |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest` or `earliest`. 이 값을 생략하면 `latest`가 기본값으로 사용됩니다. |
| callback    | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                              |

**리턴값**

`프로미스`는 `boolean`을 반환합니다.

| 타입      | 설명                               |
| ------- | -------------------------------- |
| boolean | true이면 매개변수가 스마트 컨트랙트 계정의 주소입니다. |

**예시**

```javascript
> caver.rpc.klay.isContractAccount('0x{address in hex}').then(console.log)
false

> caver.rpc.klay.isContractAccount('0x{address in hex}').then(console.log)
true
```

## caver.rpc.klay.sign <a id="caver-rpc-klay-sign"></a>

```javascript
caver.rpc.klay.sign(address, message [, blockNumber] [, callback])
```

Klaytn에서 사용하는 서명된 데이터를 생성합니다. Refer to [Klaytn Platform API - klay_sign](../../../../json-rpc/api-references/klay/account.md#klay_sign) to know how the signature is generated.

**참고**: 이 API는 당신의 Klaytn 노드에 [가져온 계정](../../../../json-rpc/api-references/personal.md#personal_importrawkey)으로 메시지에 서명하는 기능을 제공합니다. 메시지에 서명하려면 노드에 불러온 당신의 계정은 반드시 [unlocked](../../../../json-rpc/api-references/personal.md#personal_unlockaccount) 상태이어야 합니다. To sign a transaction with imported account in your Klaytn node, use [caver.rpc.klay.signTransaction](#caver-rpc-klay-signtransaction).

**매개변수**

| 명칭          | 타입                   | 설명                                                                                                |
| ----------- | -------------------- | ------------------------------------------------------------------------------------------------- |
| address     | String               | 메시지에 서명할 불러온 계정 주소입니다.                                                                            |
| 메시지         | String               | 서명하려는 메시지입니다.                                                                                     |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest` or `earliest`. 이 값을 생략하면 `latest`가 기본값으로 사용됩니다. |
| callback    | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                              |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명                    |
| --- | --------------------- |
| 문자열 | 노드에 불러온 계정이 만든 서명입니다. |

**예시**

```javascript
> caver.rpc.klay.sign('0x{address in hex}', '0xdeadbeaf').then(console.log)
0x1066e052c4be821daa4d0a0cd1e9e75ccb200bb4001c2e38853ba41b712a5a226da2acd67c86a13b266e0d75d0a6e7d1551c8924af413267615a5948617c746c1c
```

## caver.rpc.klay.getAccounts <a id="caver-rpc-klay-getaccounts"></a>

```javascript
caver.rpc.klay.getAccounts([callback])
```

Klaytn 노드가 가진 주소 목록을 반환합니다.

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Array`를 반환합니다.

| 타입 | 설명                      |
| -- | ----------------------- |
| 배열 | Klaytn 노드가 가진 주소 목록입니다. |

**예시**

```javascript
> caver.rpc.klay.getAccounts().then(console.log)
[
    '0xe1531e916857d1b3a7db92f9187b96a7b43813bf',
    '0x75331c25535052157ff5110ba7d0cf940d3a9ca6'
]
```

## caver.rpc.klay.getBlockNumber <a id="caver-rpc-klay-getblocknumber"></a>

```javascript
caver.rpc.klay.getBlockNumber([callback])
```

가장 최근의 블록 번호를 반환합니다.

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명                               |
| --- | -------------------------------- |
| 문자열 | 가장 최근의 블록 번호입니다. 이 값은 16진수 값입니다. |

**예시**

```javascript
> caver.rpc.klay.getBlockNumber().then(console.log)
0x5d39
```

## caver.rpc.klay.getBlockByNumber <a id="caver-rpc-klay-getblockbynumber"></a>

```javascript
caver.rpc.klay.getBlockByNumber(blockNumber [, returnTransactionObjects] [, callback])
```

블록 번호로 조회한 블록의 정보를 반환합니다. 이 API는 RPC 호출로만 작동하며 자바스크립트 콘솔을 통해서는 작동하지 않습니다.

**매개변수**

| 명칭                       | 타입                   | 설명                                                                                                                                                               |
| ------------------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockNumber              | number &#124; string | The block number or the block which is tagged with a string (`genesis` or `latest`).                                                                             |
| returnTransactionObjects | boolean              | (optional, default `false`) If `true`, the returned block will contain all transactions as objects, and if `false`, it will only contain the transaction hashes. |
| callback                 | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                                             |

**리턴값**

`프로미스`는 `Object`를 반환합니다.

| 타입  | 설명                                                                                                                                   |
| --- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 문자열 | 블록 객체입니다. For detailed description of return value, please refer to [caver.rpc.klay.getBlockByHash](#caver-rpc-klay-getblockbyhash). |

**예시**

```javascript
> caver.rpc.klay.getBlockByNumber(1).then(console.log)
{
    blockscore: '0x1',
    extraData: '0xd8830...',
    gasUsed: '0x0',
    governanceData: '0x',
    hash: '0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b',
    logsBloom: '0x00000...',
    number: '0x1',
    parentHash: '0x6b7c0a49f445d39b6d7dc9ba5b593b326f3a953e75ff1fcf64b9a5fa51c2725b',
    receiptsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    reward: '0xddc2002b729676dfd906484d35bb02a8634d7040',
    size: '0x285',
    stateRoot: '0xb88b6110e6f73b732714bb346e6ff24beb480c0dc901a55be24e38ad1c6d5fa9',
    timestamp: '0x5ee7fe9f',
    timestampFoS: '0xd',
    totalBlockScore: '0x2',
    transactions: [],
    transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    voteData: '0x'
}
```

## caver.rpc.klay.getBlockByHash <a id="caver-rpc-klay-getblockbyhash"></a>

```javascript
caver.rpc.klay.getBlockByHash(blockHash [, returnTransactionObjects] [, callback])
```

`blockHash`를 사용해 가장 최근의 블록 번호를 반환합니다.

**매개변수**

| 명칭                       | 타입       | 설명                                                                                                                                                               |
| ------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash                | 문자열      | 블록 해시입니다.                                                                                                                                                        |
| returnTransactionObjects | boolean  | (optional, default `false`) If `true`, the returned block will contain all transactions as objects, and if `false`, it will only contain the transaction hashes. |
| callback                 | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                                             |

**리턴값**

`프로미스`는 `Object`를 반환 - 블록을 포함하는 객체입니다.

| 명칭               | 타입  | 설명                                                                             |
| ---------------- | --- | ------------------------------------------------------------------------------ |
| blockScore       | 문자열 | 블록체인 네트워크의 채굴 난이도입니다. `blockScore` 사용은 네트워크 합의에 따라 다릅니다. BFT 합의 엔진에서는 항상 1입니다. |
| extraData        | 문자열 | 블록의 "추가 데이터"를 위한 필드입니다.                                                        |
| gasUsed          | 문자열 | 이 블록에 있는 모든 트랜잭션에서 사용된 가스양의 총합입니다.                                             |
| governanceData   | 문자열 | RLP 인코딩된 거버넌스 설정입니다.                                                           |
| 해시               | 문자열 | 블록의 해시입니다. 아직 보류 중인 블록이면 `null`입니다.                                            |
| logsBloom        | 문자열 | 블록의 로그를 위한 블룸필터입니다. 아직 보류 중인 블록이면 `null`입니다.                                   |
| number           | 문자열 | 블록 번호입니다. 아직 보류 중인 블록이면 `null`입니다.                                             |
| parentHash       | 문자열 | 이전 블록의 해시입니다.                                                                  |
| receiptsRoot     | 문자열 | 블록의 영수증 트라이의 루트 해시입니다.                                                         |
| reward           | 문자열 | 블록 보상을 받을 수혜자의 주소입니다.                                                          |
| size             | 문자열 | 블록의 바이트 크기의 정수 형태입니다.                                                          |
| stateRoot        | 문자열 | 블록의 상태 트라이의 루트 해시입니다.                                                          |
| timestamp        | 문자열 | 블록이 생성되었을 때의 Unix 타임스탬프입니다.                                                    |
| timestampFoS     | 문자열 | 블록이 생성되었을 때의 타임스탬프 중 초 단위 부분입니다.                                               |
| totalBlockScore  | 문자열 | 본 블록까지 체인 내 모든 블록의 blockScore 값의 합입니다.                                         |
| transactions     | 배열  | 트랜잭션 객체의 배열이거나 또는 `returnTransactionObjects` 매개변수에 따라 32바이트 크기의 트랜잭션 해시입니다.    |
| transactionsRoot | 문자열 | 블록의 트랜잭션 트라이의 루트 해시입니다.                                                        |
| voteData         | 문자열 | 제안자의 RLP 인코딩된 거버넌스 투표입니다.                                                      |

**예시**

```javascript
> caver.rpc.klay.getBlockByHash('0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b').then(console.log)
{
    blockscore: '0x1',
    extraData: '0xd8830...',
    gasUsed: '0x0',
    governanceData: '0x',
    hash: '0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b',
    logsBloom: '0x00000...',
    number: '0x1',
    parentHash: '0x6b7c0a49f445d39b6d7dc9ba5b593b326f3a953e75ff1fcf64b9a5fa51c2725b',
    receiptsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    reward: '0xddc2002b729676dfd906484d35bb02a8634d7040',
    size: '0x285',
    stateRoot: '0xb88b6110e6f73b732714bb346e6ff24beb480c0dc901a55be24e38ad1c6d5fa9',
    timestamp: '0x5ee7fe9f',
    timestampFoS: '0xd',
    totalBlockScore: '0x2',
    transactions: [],
    transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    voteData: '0x'
}
```

## caver.rpc.klay.getBlockReceipts <a id="caver-rpc-klay-getblockreceipts"></a>

```javascript
caver.rpc.klay.getBlockReceipts(blockHash [, callback])
```

블록 해시로 조회한 블록에 포함된 영수증을 반환합니다.

**매개변수**

| 명칭        | 타입       | 설명                                                                   |
| --------- | -------- | -------------------------------------------------------------------- |
| blockHash | 문자열      | 블록 해시입니다.                                                            |
| callback  | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Array`를 반환합니다.

| 타입 | 설명                                                                                                                                                                                                                       |
| -- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 배열 | 조회한 블록에 포함된 트랜잭션 영수증들입니다. 조회하고자 하는 블록이 트랜잭션을 담고 있지 않으면 빈 배열 `[]`이 반환됩니다. For detailed description of transaction receipt, please refer to [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt). |

**예시**

```javascript
> caver.rpc.klay.getBlockReceipts('0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0').then(console.log)
[ 
    {
        blockHash: '0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0',
        blockNumber: '0x5301',
        contractAddress: null,
        from: '0xddc2002b729676dfd906484d35bb02a8634d7040',
        gas: '0x61a8',
        gasPrice: '0x5d21dba00',
        gasUsed: '0x5208',
        logs: [],
        logsBloom: '0x00000...',
        nonce: '0x5e',
        senderTxHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
        signatures: [
            { 
                V: '0x4e44',
                R: '0x98583ffa8d9a6d5f9e60e4daebb33f18e8ad4d32653c4a2fa7f12ce025af763d',
                S: '0x9b9e5257293e3b986842b6a203dd16ce46f16ed42dd3e9592fcaab9ea2696cb'
            }    
        ],
        status: '0x1',
        to: '0xc0aabc441129991dd3a9363a9a43b745527ea4e7',
        transactionHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
        transactionIndex: '0x0',
        type: 'TxTypeValueTransfer',
        typeInt: 8,
        value: '0xde0b6b3a7640000'
    }
]
```

## caver.rpc.klay.getBlockTransactionCountByNumber <a id="caver-rpc-klay-getblocktransactioncountbynumber"></a>

```javascript
caver.rpc.klay.getBlockTransactionCountByNumber(blockNumber [, callback])
```

블록 번호로 조회한 블록에 담긴 트랜잭션의 개수를 반환합니다.

**매개변수**

| 명칭          | 타입                   | 설명                                                                   |
| ----------- | -------------------- | -------------------------------------------------------------------- |
| blockNumber | number &#124; string | The block number or the block tag string (`genesis` or `latest`).    |
| callback    | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명                                       |
| --- | ---------------------------------------- |
| 문자열 | 주어진 블록에 기록된 트랜잭션의 개수입니다. 이 값은 16진수 값입니다. |

**예시**

```javascript
> caver.rpc.klay.getBlockTransactionCountByNumber(21249).then(console.log)
0x1
```

## caver.rpc.klay.getBlockTransactionCountByHash <a id="caver-rpc-klay-getblocktransactionCountbyhash"></a>

```javascript
caver.rpc.klay.getBlockTransactionCountByHash(blockHash [, callback])
```

블록 해시로 조회한 블록에 담긴 트랜잭션의 개수를 반환합니다.

**매개변수**

| 명칭        | 타입       | 설명                                                                   |
| --------- | -------- | -------------------------------------------------------------------- |
| blockHash | 문자열      | 블록 해시입니다.                                                            |
| callback  | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명                                       |
| --- | ---------------------------------------- |
| 문자열 | 주어진 블록에 기록된 트랜잭션의 개수입니다. 이 값은 16진수 값입니다. |

**예시**

```javascript
> caver.rpc.klay.getBlockTransactionCountByHash('0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0').then(console.log)
0x1
```

## caver.rpc.klay.getBlockWithConsensusInfoByNumber <a id="caver-rpc-klay-getblockwithconsensusinfobynumber"></a>

```javascript
caver.rpc.klay.getBlockWithConsensusInfoByNumber(blockNumber [, callback])
```

블록 번호로 조회한 블록을 합의에 대한 정보와 함께 반환합니다.

**매개변수**

| 명칭          | 타입                   | 설명                                                                   |
| ----------- | -------------------- | -------------------------------------------------------------------- |
| blockNumber | number &#124; string | The block number or the block tag string (`genesis` or `latest`).    |
| callback    | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Object`를 반환합니다.

| 타입  | 설명                                                                                                                                                                                            |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 문자열 | 컨센서스 정보를 포함해 블록 정보를 담고 있는 객체입니다. For detailed description of return value, please refer to [caver.rpc.klay.getBlockWithConsensusInfoByHash](#caver-rpc-klay-getblockwithconsensusinfobyhash). |

**예시**

```javascript
> caver.rpc.klay.getBlockWithConsensusInfoByNumber(21249).then(console.log)
{
    blockscore: '0x1',
    committee: ['0xddc2002b729676dfd906484d35bb02a8634d7040', '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e'],
    extraData: '0xd8830...',
    gasUsed: '0x5208',
    governanceData: '0x',
    hash: '0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0',
    logsBloom: '0x00000...',
    number: '0x5301',
    parentHash: '0x024f05c0e7428e33331104bedbfc453d481ce6a2f5e57f7fd68a4391ba6c2619',
    proposer: '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e',
    receiptsRoot: '0xe38e5532717f12f769b07ea016014bd39b74fb72def4de8442114cc2728609f2',
    reward: '0xb74837f495060f3f794dcae8fa3e0c5d3cf99d9f',
    size: '0x313',
    stateRoot: '0x9964b2d8f23da7383a32ec33c9700a76ebf4a36315c9067c2fef7568d97e1d55',
    timestamp: '0x5ee851dd',
    timestampFoS: '0x0',
    totalBlockScore: '0x5302',
    transactions: [
        {
            blockHash: '0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0',
            blockNumber: '0x5301',
            contractAddress: null,
            from: '0xddc2002b729676dfd906484d35bb02a8634d7040',
            gas: '0x61a8',
            gasPrice: '0x5d21dba00',
            gasUsed: '0x5208',
            logs: [],
            logsBloom: '0x00000...',
            nonce: '0x5e',
            senderTxHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
            signatures: {
                V: '0x4e44',
                R: '0x98583ffa8d9a6d5f9e60e4daebb33f18e8ad4d32653c4a2fa7f12ce025af763d',
                S: '0x9b9e5257293e3b986842b6a203dd16ce46f16ed42dd3e9592fcaab9ea2696cb'
            },
            status: '0x1',
            to: '0xc0aabc441129991dd3a9363a9a43b745527ea4e7',
            transactionHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
            transactionIndex: '0x0',
            type: 'TxTypeValueTransfer',
            typeInt: 8,
            value: '0xde0b6b3a7640000',
        },
    ],
    transactionsRoot: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
    voteData: '0x',
}
```

## caver.rpc.klay.getBlockWithConsensusInfoByHash <a id="caver-rpc-klay-getblockwithconsensusinfobyhash"></a>

```javascript
caver.rpc.klay.getBlockWithConsensusInfoByHash(blockHash [, callback])
```

블록 해시로 조회한 블록을 합의에 대한 정보와 함께 반환합니다.

**매개변수**

| 명칭        | 타입       | 설명                                                                   |
| --------- | -------- | -------------------------------------------------------------------- |
| blockHash | 문자열      | 블록 해시입니다.                                                            |
| callback  | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`Promise` returns `object` - A block object with consensus information (a proposer and a list of committee members), or null when no block was found:

| 명칭               | 타입  | 설명                                                                      |
| ---------------- | --- | ----------------------------------------------------------------------- |
| blockScore       | 문자열 | 이전 난이도입니다. BFT 합의 엔진에서는 항상 1입니다.                                        |
| committee        | 배열  | 블록 생성에 관여한 위원회 멤버들의 주소의 배열입니다. 위원회란 블록 생성을 위한 합의 프로토콜에 참여한 검증자 중 일부입니다. |
| extraData        | 문자열 | 블록의 "추가 데이터"를 위한 필드입니다.                                                 |
| gasUsed          | 문자열 | 이 블록에 있는 모든 트랜잭션에서 사용된 가스양의 총합입니다.                                      |
| governanceData   | 문자열 | RLP 인코딩된 거버넌스 설정입니다.                                                    |
| 해시               | 문자열 | 블록의 해시입니다. 아직 보류 중인 블록이면 `null`입니다.                                     |
| logsBloom        | 문자열 | 블록의 로그를 위한 블룸필터입니다. 아직 보류 중인 블록이면 `null`입니다.                            |
| number           | 문자열 | 블록 번호입니다. 아직 보류 중인 블록이면 `null`입니다.                                      |
| parentHash       | 문자열 | 이전 블록의 해시입니다.                                                           |
| proposer         | 문자열 | 블록 제안자의 주소입니다.                                                          |
| receiptsRoot     | 문자열 | 블록의 영수증 트라이의 루트 해시입니다.                                                  |
| reward           | 문자열 | 블록 보상을 받을 수혜자의 주소입니다.                                                   |
| size             | 문자열 | 블록의 바이트 크기의 정수 형태입니다.                                                   |
| stateRoot        | 문자열 | 블록의 상태 트라이의 루트 해시입니다.                                                   |
| timestamp        | 문자열 | 블록이 생성되었을 때의 Unix 타임스탬프입니다.                                             |
| timestampFoS     | 문자열 | 블록이 생성되었을 때의 타임스탬프 중 초 단위 부분입니다.                                        |
| totalBlockScore  | 문자열 | 본 블록까지 체인 내 모든 블록의 blockScore 값의 합입니다.                                  |
| transactions     | 배열  | 트랜잭션 객체의 배열입니다.                                                         |
| transactionsRoot | 문자열 | 블록의 트랜잭션 트라이의 루트 해시입니다.                                                 |
| voteData         | 문자열 | 제안자의 RLP 인코딩된 거버넌스 투표입니다.                                               |

**예시**

```javascript
> caver.rpc.klay.getBlockWithConsensusInfoByHash('0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0').then(console.log)
{
    blockscore: '0x1',
    committee: ['0xddc2002b729676dfd906484d35bb02a8634d7040', '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e'],
    extraData: '0xd8830...',
    gasUsed: '0x5208',
    governanceData: '0x',
    hash: '0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0',
    logsBloom: '0x00000...',
    number: '0x5301',
    parentHash: '0x024f05c0e7428e33331104bedbfc453d481ce6a2f5e57f7fd68a4391ba6c2619',
    proposer: '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e',
    receiptsRoot: '0xe38e5532717f12f769b07ea016014bd39b74fb72def4de8442114cc2728609f2',
    reward: '0xb74837f495060f3f794dcae8fa3e0c5d3cf99d9f',
    size: '0x313',
    stateRoot: '0x9964b2d8f23da7383a32ec33c9700a76ebf4a36315c9067c2fef7568d97e1d55',
    timestamp: '0x5ee851dd',
    timestampFoS: '0x0',
    totalBlockScore: '0x5302',
    transactions: [
        {
            blockHash: '0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0',
            blockNumber: '0x5301',
            contractAddress: null,
            from: '0xddc2002b729676dfd906484d35bb02a8634d7040',
            gas: '0x61a8',
            gasPrice: '0x5d21dba00',
            gasUsed: '0x5208',
            logs: [],
            logsBloom: '0x00000...',
            nonce: '0x5e',
            senderTxHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
            signatures: {
                V: '0x4e44',
                R: '0x98583ffa8d9a6d5f9e60e4daebb33f18e8ad4d32653c4a2fa7f12ce025af763d',
                S: '0x9b9e5257293e3b986842b6a203dd16ce46f16ed42dd3e9592fcaab9ea2696cb'
            },
            status: '0x1',
            to: '0xc0aabc441129991dd3a9363a9a43b745527ea4e7',
            transactionHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
            transactionIndex: '0x0',
            type: 'TxTypeValueTransfer',
            typeInt: 8,
            value: '0xde0b6b3a7640000',
        },
    ],
    transactionsRoot: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
    voteData: '0x',
}
```

## caver.rpc.klay.getCommittee <a id="caver-rpc-klay-getcommittee"></a>

```javascript
caver.rpc.klay.getCommittee([blockNumber] [, callback])
```

어떤 블록 시간에서 위원회에 속한 검증자 목록을 반환합니다.

**매개변수**

| 명칭          | 타입                   | 설명                                                                                                |
| ----------- | -------------------- | ------------------------------------------------------------------------------------------------- |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest` or `earliest`. 이 값을 생략하면 `latest`가 기본값으로 사용됩니다. |
| callback    | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                              |

**리턴값**

`프로미스`는 `Array`를 반환합니다.

| 타입 | 설명                               |
| -- | -------------------------------- |
| 배열 | 주어진 블록에서 위원회에 속한 모든 검증자의 주소들입니다. |

**예시**

```javascript
> caver.rpc.klay.getCommittee().then(console.log)
[
    '0xddc2002b729676dfd906484d35bb02a8634d7040',
    '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e'
]
```

## caver.rpc.klay.getCommitteeSize <a id="caver-rpc-klay-getcommitteesize"></a>

```javascript
caver.rpc.klay.getCommitteeSize([blockNumber] [, callback])
```

어떤 블록 시간에서 위원회의 구성원 수를 반환합니다.

**매개변수**

| 명칭          | 타입                   | 설명                                                                                                |
| ----------- | -------------------- | ------------------------------------------------------------------------------------------------- |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest` or `earliest`. 이 값을 생략하면 `latest`가 기본값으로 사용됩니다. |
| callback    | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                              |

**리턴값**

`프로미스`는 `Number`을 반환합니다.

| 타입     | 설명                    |
| ------ | --------------------- |
| number | 주어진 블록의 위원회 구성원 수입니다. |

**예시**

```javascript
> caver.rpc.klay.getCommitteeSize().then(console.log)
2
```

## caver.rpc.klay.getCouncil <a id="caver-rpc-klay-getcouncil"></a>

```javascript
caver.rpc.klay.getCouncil([blockNumber] [, callback])
```

어떤 블록 시간에서 council에 속한 검증자 목록을 반환합니다.

**매개변수**

| 명칭          | 타입                   | 설명                                                                                                |
| ----------- | -------------------- | ------------------------------------------------------------------------------------------------- |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest` or `earliest`. 이 값을 생략하면 `latest`가 기본값으로 사용됩니다. |
| callback    | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                              |

**리턴값**

`프로미스`는 `Array`를 반환합니다.

| 타입 | 설명                                                                |
| -- | ----------------------------------------------------------------- |
| 배열 | 주어진 블록에서 카운슬에 속한 검증자들의 주소가 담긴 배열입니다. 카운슬을 찾을 수 없는 경우 null을 반환합니다. |

**예시**

```javascript
> caver.rpc.klay.getCouncil().then(console.log)
[
    '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e',
    '0xddc2002b729676dfd906484d35bb02a8634d7040'
]
```

## caver.rpc.klay.getCouncilSize <a id="caver-rpc-klay-getcouncilsize"></a>

```javascript
caver.rpc.klay.getCouncilSize([blockNumber] [, callback])
```

어떤 블록 시간에서 council의 구성원 수를 반환합니다.

**매개변수**

| 명칭          | 타입                   | 설명                                                                                                |
| ----------- | -------------------- | ------------------------------------------------------------------------------------------------- |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest` or `earliest`. 이 값을 생략하면 `latest`가 기본값으로 사용됩니다. |
| callback    | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                              |

**리턴값**

`프로미스`는 `Number`을 반환합니다.

| 타입     | 설명                    |
| ------ | --------------------- |
| number | 주어진 블록의 카운슬 구성원 수입니다. |

**예시**

```javascript
> caver.rpc.klay.getCouncilSize().then(console.log)
2
```

## caver.rpc.klay.getStorageAt <a id="caver-rpc-klay-getstorageat"></a>

```javascript
caver.rpc.klay.getStorageAt(address, position [, blockNumber] [, callback])
```

입력으로 받은 주소의 스토리지 위치에서 값을 반환합니다.

**매개변수**

| 명칭          | 타입                   | 설명                                                                                                                                                                     |
| ----------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address     | 문자열                  | 스토리지를 얻고 싶은 주소입니다.                                                                                                                                                     |
| position    | number               | 스토리지 인덱스 위치입니다. For more information on `calculating the position`, refer to [klay_getStorageAt](../../../../json-rpc/api-references/klay/block.md#klay_getstorageat). |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest` or `earliest`. 이 값을 생략하면 `latest`가 기본값으로 사용됩니다.                                                                      |
| callback    | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                                                                                   |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명                         |
| --- | -------------------------- |
| 문자열 | 입력으로 받은 스토리지 위치의 값을 반환합니다. |

**예시**

```javascript
> caver.rpc.klay.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 0).then(console.log)
0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234
```

## caver.rpc.klay.isSyncing <a id="caver-rpc-klay-issyncing"></a>

```javascript
caver.rpc.klay.isSyncing([callback])
```

동기화 상태에 대한 데이터가 있는 객체를 반환하거나 false를 반환합니다.

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `object|boolean`을 반환: Klaytn 노드가 동기화중이 아니라면 `false`를 반환합니다. 동기화중이라면 동기화 객체를 반환합니다.

| 명칭            | 타입  | 설명                                     |
| ------------- | --- | -------------------------------------- |
| startingBlock | 문자열 | 16진수로 표현된 싱크가 시작된 블록의 블록 번호입니다.        |
| currentBlock  | 문자열 | 16진수로 표현된 현재 노드가 싱크한 상태인 블록의 블록 번호입니다. |
| highestBlock  | 문자열 | 16진수로 표현된 싱크해야 할 블록 번호 추정값입니다.         |
| knownStates   | 문자열 | 16진수로 표현된 앞으로 다운로드할 상태(state) 추정값입니다.  |
| pulledStates  | 문자열 | 16진수로 표현된 이미 다운로드한 상태(state)입니다.       |

**예시**

```javascript
> caver.rpc.klay.isSyncing().then(console.log)
{
        startingBlock: 100,
        currentBlock: 312,
        highestBlock: 512,
        knownStates: 234566,
        pulledStates: 123455
}

> caver.rpc.klay.isSyncing().then(console.log)
false
```

## caver.rpc.klay.call <a id="caver-rpc-klay-call"></a>

```javascript
caver.rpc.klay.call(callObject [, blockNumber] [, callback])
```

블록체인에 트랜잭션을 보내지 않고 즉시 새 메시지 호출을 합니다. 결과 데이터를 반환하거나 또는 에러가 발생하면 JSON RPC의 에러 객체를 반환합니다.

**매개변수**

| 명칭          | 타입                   | 설명                                                                                                   |
| ----------- | -------------------- | ---------------------------------------------------------------------------------------------------- |
| callObject  | object               | 트랜잭션 호출 객체입니다. 객체 속성은 다음의 표를 참고해주세요.                                                                 |
| blockNumber | number &#124; string | (optional) A block number, or the string `latest` or `earliest`. 이 값을 생략하면 `latest`가 기본값으로 사용됩니다. |s |
| callback    | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.                                 |

`callObject`에는 다음의 속성이 있습니다.

| 명칭       | 타입  | 설명                                                                                                                                                  |
| -------- | --- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| to       | 문자열 | (새 트랜잭션 배포 테스트 시 선택 사항) 트랜잭션을 수신하는 주소입니다.                                                                                                           |
| input    | 문자열 | (optional) The hash of the method signature and encoded parameters. [caver.abi.encodeFunctionCall](../caver.abi.md#encodefunctioncall)를 사용할 수 있습니다. |
| from     | 문자열 | (선택 사항) 트랜잭션을 발신한 주소입니다.                                                                                                                            |
| gas      | 문자열 | (optional) The gas provided for the transaction execution. `klay_call`은 가스를 소비하지 않지만 트랜잭션 실행 중 일부에서 이 매개변수가 필요할 수 있습니다.                             |
| gasPrice | 문자열 | (optional) The gasPrice used for each paid gas.                                                                                                     |
| value    | 문자열 | (optional) The value sent with this transaction in `peb`.                                                                                           |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명                                                                        |
| --- | ------------------------------------------------------------------------- |
| 문자열 | 호출 결과로 리턴된 데이터입니다. *e.g.*, the return value of a smart contract function. |

**예시**

```javascript
> caver.rpc.klay.call({ 
        to: '0x5481a10a47C74f800BDF4955BD77550881bde91C', // contract address
        input: '0x70a08231000000000000000000000000ddc2002b729676dfd906484d35bb02a8634d7040'
    }).then(console.log)
0x0000000000000000000000000000000000000000000000000de0b6b3a7640000
```

## caver.rpc.klay.estimateGas <a id="caver-rpc-klay-estimategas"></a>

```javascript
caver.rpc.klay.estimateGas(callObject [, blockNumber] [, callback])
```

트랜잭션 실행을 완료하는 데에 필요한 `가스양`의 추정치를 생성하여 반환합니다. 이때 이 메서드가 발생시킨 트랜잭션은 블록체인에 추가되지 않습니다.

**매개변수**

See [caver.rpc.klay.call](#caver-rpc-klay-call) parameters, expect that all properties are optional.

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명                                                                        |
| --- | ------------------------------------------------------------------------- |
| 문자열 | 호출 결과로 리턴된 데이터입니다. *e.g.*, the return value of a smart contract function. |

**예시**

```javascript
> caver.rpc.klay.estimateGas({ 
        to: '0x5481a10a47C74f800BDF4955BD77550881bde91C', // contract address
        input: '0x095ea7b300000000000000000000000028e4e077686d1aeaf54a1313ff4841181056fe32000000000000000000000000000000000000000000000000000000000000000a'
    }).then(console.log)
0xb2a0
```

## caver.rpc.klay.estimateComputationCost <a id="caver-rpc-klay-estimatecomputationcost"></a>

```javascript
caver.rpc.klay.estimateComputationCost(callObject [, blockNumber] [, callback])
```

트랜잭션을 실행하는 데에 드는 `연산 비용의 추정치`를 생성하여 반환합니다. Klaytn은 한 트랜잭션을 실행하는 데에 너무 많은 시간이 걸리지 않도록 하기 위해 현재 트랜잭션당 연산 비용을 `100000000`으로 제한합니다. The transaction will not be added to the blockchain like [caver.rpc.klay.estimateGas](#caver-rpc-klay-estimategas).

**매개변수**

See [caver.rpc.klay.call](#caver-rpc-klay-call) parameters, expect that all properties are optional.

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명            |
| --- | ------------- |
| 문자열 | 사용된 연산 비용입니다. |

**예시**

```javascript
> caver.rpc.klay.estimateComputationCost({ 
        to: '0x5481a10a47C74f800BDF4955BD77550881bde91C', // contract address
        input: '0x095ea7b300000000000000000000000028e4e077686d1aeaf54a1313ff4841181056fe32000000000000000000000000000000000000000000000000000000000000000a'
    }).then(console.log)
0xd761
```

## caver.rpc.klay.getTransactionByBlockHashAndIndex <a id="caver-rpc-klay-gettransactionbyblockhashandindex"></a>

```javascript
caver.rpc.klay.getTransactionByBlockHashAndIndex(blockHash, index [, callback])
```

`블록 해시`와 `트랜잭션 인덱스 위치`로 조회한 트랜잭션의 정보를 반환합니다.

**매개변수**

| 명칭        | 타입       | 설명                                                                   |
| --------- | -------- | -------------------------------------------------------------------- |
| blockHash | 문자열      | 블록 해시입니다.                                                            |
| index     | number   | 블록 내에 트랜잭션 인덱스 위치입니다.                                                |
| callback  | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Object`를 반환합니다.

| 타입     | 설명                                                                                 |
| ------ | ---------------------------------------------------------------------------------- |
| object | A transaction object, see [caver.rpc.klay.getTransactionByHash][] for more detail. |

**예시**

```javascript
> caver.rpc.klay.getTransactionByBlockHashAndIndex('0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576', 0).then(console.log)
{
    blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
    blockNumber: '0xb7',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    hash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    nonce: '0x0',
    senderTxHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    signatures: [ { V: '0x4e44', R: '0xf1a9a...', S: '0x9116c...' } ],
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000'
}
```

## caver.rpc.klay.getTransactionByBlockNumberAndIndex <a id="caver-rpc-klay-gettransactionbyblocknumberandindex"></a>

```javascript
caver.rpc.klay.getTransactionByBlockNumberAndIndex(blockNumber, index [, callback])
```

`블록 번호`와 `트랜잭션 인덱스 위치`로 조회한 트랜잭션의 정보를 반환합니다.

**매개변수**

| 명칭          | 타입                   | 설명                                                                   |
| ----------- | -------------------- | -------------------------------------------------------------------- |
| blockNumber | number &#124; string | The block number or the block tag string (`genesis` or `latest`).    |
| index       | number               | 블록 내에 트랜잭션 인덱스 위치입니다.                                                |
| callback    | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Object`를 반환합니다.

| 타입     | 설명                                                                                 |
| ------ | ---------------------------------------------------------------------------------- |
| object | A transaction object, see [caver.rpc.klay.getTransactionByHash][] for more detail. |

**예시**

```javascript
> caver.rpc.klay.getTransactionByBlockNumberAndIndex(183, 0).then(console.log)
{
    blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
    blockNumber: '0xb7',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    hash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    nonce: '0x0',
    senderTxHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    signatures: [ { V: '0x4e44', R: '0xf1a9a...', S: '0x9116c...' } ],
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000'
}
```

## caver.rpc.klay.getTransactionByHash <a id="caver-rpc-klay-gettransactionbyhash"></a>

```javascript
caver.rpc.klay.getTransactionByHash(transactionHash [, callback])
```

트랜잭션 해시로 조회한 트랜잭션의 정보를 반환합니다.

**매개변수**

| 명칭              | 타입       | 설명                                                                   |
| --------------- | -------- | -------------------------------------------------------------------- |
| transactionHash | 문자열      | 트랜잭션 해시입니다.                                                          |
| callback        | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `객체`를 반환합니다 - 트랜잭션 객체를 반환하거나 또는 해당하는 트랜잭션을 찾을 수 없는 경우 `null`을 반환합니다.

| 명칭                 | 타입      | 설명                                                                                                                                               |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| blockHash          | 문자열     | 트랜잭션이 담긴 블록의 해시입니다.                                                                                                                              |
| blockNumber        | 문자열     | 트랜잭션이 담긴 블록의 번호입니다.                                                                                                                              |
| codeFormat         | 문자열     | (선택사항) 스마트 컨트랙트 코드의 코드 형식입니다.                                                                                                                    |
| feePayer           | 문자열     | (선택사항) 트랜잭션 수수료 납부자의 주소입니다.                                                                                                                      |
| feePayerSignatures | 배열      | (선택사항) 트랜잭션 수수료 납부자의 서명 객체들로 이루어진 배열입니다. 각 서명 객체에는 (V, R, S) 등 세 필드가 있습니다. V는 ECDSA 복구 ID를 담고 있습니다. R은 ECDSA 서명 r을 담고 있고 S는 ECDSA 서명 s를 담고 있습니다. |
| feeRatio           | 문자열     | (선택사항) 트랜잭션 수수료 납부자의 부담 비율입니다. 이 값이 30이면, 트랜잭션 수수료의 30%를 트랜잭션 수수료 납부자가 지불합니다. 나머지 70%는 트랜잭션 발신자가 지불합니다.                                          |
| from               | 문자열     | 트랜잭션 발신자의 주소입니다.                                                                                                                                 |
| gas                | 문자열     | 트랜잭션 발신자에 의해 설정된 가스양입니다.                                                                                                                         |
| gasPrice           | 문자열     | peb에서 트랜잭션 발신자에 의해 설정된 가스 가격입니다.                                                                                                                 |
| 해시                 | 문자열     | 트랜잭션의 해시입니다.                                                                                                                                     |
| humanReadable      | Boolean | (선택사항) Human-Readable Address이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.                                                                            |
| key                | 문자열     | (optional) The RLP-encoded AccountKey used to update AccountKey of an Klaytn account. See [AccountKey][] for more details.                       |
| input              | 문자열     | (선택사항) 트랜잭션과 함께 전송된 데이터입니다.                                                                                                                      |
| 논스                 | 문자열     | 트랜잭션 발신자가 이 트랜잭션 이전까지 전송했던 트랜잭션의 개수입니다.                                                                                                          |
| senderTxHash       | 문자열     | (선택사항) 트랜잭션 수수료 납부자의 주소와 서명이 없는 트랜잭션 해시입니다. 이 값은 수수료를 위임하지 않은 트랜잭션의 `hash` 값과 항상 동일합니다.                                                          |
| signatures         | 배열      | 서명 객체의 배열입니다. 각 서명 객체에는 (V, R, S) 등 세 필드가 있습니다. V는 ECDSA 복구 ID를 담고 있습니다. R은 ECDSA 서명 r을 담고 있고 S는 ECDSA 서명 s를 담고 있습니다.                            |
| to                 | 문자열     | 트랜잭션 수신자의 주소입니다. 컨트랙트 배포 트랜잭션이면 `null`을 반환합니다.                                                                                                   |
| transactionIndex   | 문자열     | 블록 내 트랜잭션의 인덱스 위치의 정숫값입니다.                                                                                                                       |
| 형식                 | 문자열     | 트랜잭션의 유형을 나타내는 문자열입니다.                                                                                                                           |
| typeInt            | number  | 트랜잭션의 유형을 나타내는 정수입니다.                                                                                                                            |
| value              | 문자열     | peb로 전송된 값입니다.                                                                                                                                   |

트랜잭션이 아직 처리되지 않은 상태인 `pending` 상태라면, `blockHash`, `blockNumber` 그리고 `transactionIndex`의 기본값이 반환됩니다. 아래 예제를 참조하세요.

**예시**

```javascript
> caver.rpc.klay.getTransactionByHash('0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa').then(console.log)
{
    blockHash: '0xb273976bad5f3d40ba46839c020f61b1629e2362d351e3c9cb32268afc7cb477',
    blockNumber: '0x74c',
    codeFormat: '0x0',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x3d0900',
    gasPrice: '0x5d21dba00',
    hash: '0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa',
    humanReadable: false,
    input: '0x60806...',
    nonce: '0xa',
    senderTxHash: '0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa',
    signatures: [ { V: '0x4e44', R: '0xe4ac3...', S: '0x5374f...' } ],
    to: null,
    transactionIndex: '0x0',
    type: 'TxTypeSmartContractDeploy',
    typeInt: 40,
    value: '0x0',
}

// When transaction is in pending, default values for `blockHash`, `blockNumber` and `trasnactionIndex` are returned.
> caver.rpc.klay.getTransactionByHash('0x72e3838a42fbe75724a685ca03e50ff25ebc564e32d06dadf41be2190e5b11d1').then(console.log)
{
    blockHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    blockNumber: '0x0',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    hash: '0x72e3838a42fbe75724a685ca03e50ff25ebc564e32d06dadf41be2190e5b11d1',
    nonce: '0xd',
    senderTxHash: '0x72e3838a42fbe75724a685ca03e50ff25ebc564e32d06dadf41be2190e5b11d1',
    signatures: [ { V: '0x4e44', R: '0x73634...', S: '0x479be...' } ],
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000',
}
```

## caver.rpc.klay.getTransactionBySenderTxHash <a id="caver-rpc-klay-gettransactionbysendertxhash"></a>

```javascript
caver.rpc.klay.getTransactionBySenderTxHash(senderTxHash [, callback])
```

SenderTxHash로 조회한 트랜잭션의 정보를 반환합니다.

이 API는 `--sendertxhashindexing`에 의해 인덱싱 기능이 노드에서 활성화되어 있을 때만 올바른 결과를 반환합니다. Use [caver.rpc.klay.isSenderTxHashIndexingEnabled](#caver-rpc-klay-issendertxhashindexingenabled) to check if the indexing feature is enabled or not.

**매개변수**

| 명칭           | 타입       | 설명                                                                   |
| ------------ | -------- | -------------------------------------------------------------------- |
| senderTxHash | 문자열      | 발신자 트랜잭션 해시입니다. See [SenderTxHash][] for more detail.                |
| callback     | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Object`를 반환합니다.

| 타입     | 설명                                                                                  |
| ------ | ----------------------------------------------------------------------------------- |
| object | A transaction object, see [caver.rpc.klay.getTransactionByHash][] for more details. |

**예시**

```javascript
> caver.rpc.klay.getTransactionBySenderTxHash('0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa').then(console.log)
{
    blockHash: '0xb273976bad5f3d40ba46839c020f61b1629e2362d351e3c9cb32268afc7cb477',
    blockNumber: '0x74c',
    codeFormat: '0x0',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x3d0900',
    gasPrice: '0x5d21dba00',
    hash: '0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa',
    humanReadable: false,
    input: '0x60806...',
    nonce: '0xa',
    senderTxHash: '0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa',
    signatures: [ { V: '0x4e44', R: '0xe4ac3...', S: '0x5374f...' } ],
    to: null,
    transactionIndex: '0x0',
    type: 'TxTypeSmartContractDeploy',
    typeInt: 40,
    value: '0x0',
}
```

## caver.rpc.klay.getTransactionReceipt <a id="caver-rpc-klay-gettransactionreceipt"></a>

```javascript
caver.rpc.klay.getTransactionReceipt(transactionHash [, callback])
```

트랜잭션 해시로 조회한 트랜잭션의 영수증을 반환합니다.

**참고** 트랜잭션이 아직 처리되지 않은 상태인 `pending` 상태의 트랜잭션은 영수증을 확인할 수 없습니다.

**매개변수**

| 명칭              | 타입       | 설명                                                                   |
| --------------- | -------- | -------------------------------------------------------------------- |
| transactionHash | 문자열      | 트랜잭션 해시입니다.                                                          |
| callback        | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Object`를 반환합니다 - 트랜잭션 영수증 객체를 반환하거나 영수증을 찾을 수 없는 경우 `null`을 반환합니다.

| 명칭                 | 타입      | 설명                                                                                                                                               |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| blockHash          | 문자열     | 트랜잭션이 담긴 블록의 해시입니다.                                                                                                                              |
| blockNumber        | 문자열     | 트랜잭션이 담긴 블록의 번호입니다.                                                                                                                              |
| codeFormat         | 문자열     | (선택사항) 스마트 컨트랙트 코드의 코드 형식입니다.                                                                                                                    |
| contractAddress    | 문자열     | 컨트랙트 생성 트랜잭션이면 생성된 컨트랙트의 주소를 반환합니다. 컨트랙트 생성 트랜잭션이 아닌 경우 `null`을 반환합니다.                                                                           |
| feePayer           | 문자열     | (선택사항) 트랜잭션 수수료 납부자의 주소입니다.                                                                                                                      |
| feePayerSignatures | 배열      | (선택사항) 트랜잭션 수수료 납부자의 서명 객체들로 이루어진 배열입니다. 각 서명 객체에는 (V, R, S) 등 세 필드가 있습니다. V는 ECDSA 복구 ID를 담고 있습니다. R은 ECDSA 서명 r을 담고 있고 S는 ECDSA 서명 s를 담고 있습니다. |
| feeRatio           | 문자열     | (선택사항) 트랜잭션 수수료 납부자의 부담 비율입니다. 이 값이 30이면, 트랜잭션 수수료의 30%를 트랜잭션 수수료 납부자가 지불합니다. 나머지 70%는 트랜잭션 발신자가 지불합니다.                                          |
| from               | 문자열     | 트랜잭션 발신자의 주소입니다.                                                                                                                                 |
| gas                | 문자열     | 트랜잭션 발신자에 의해 설정된 가스양입니다.                                                                                                                         |
| gasPrice           | 문자열     | peb에서 트랜잭션 발신자에 의해 설정된 가스 가격입니다.                                                                                                                 |
| gasUsed            | 문자열     | 이 트랜잭션에서만 사용된 가스양입니다.                                                                                                                            |
| humanReadable      | Boolean | (선택사항) Human-Readable Address이면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다.                                                                            |
| key                | 문자열     | (optional) The RLP-encoded AccountKey used to update AccountKey of a Klaytn account.                                                             |
| input              | 문자열     | (선택사항) 트랜잭션과 함께 전송된 데이터입니다.                                                                                                                      |
| 로그                 | 배열      | 이 트랜잭션이 발생시킨 로그 객체들의 배열입니다.                                                                                                                      |
| logsBloom          | 문자열     | 라이트 클라이언트가 관련된 로그를 빠르게 검색할 수 있도록 하는 블룸필터입니다.                                                                                                     |
| 논스                 | 문자열     | 트랜잭션 발신자가 이 트랜잭션 이전까지 전송했던 트랜잭션의 개수입니다.                                                                                                          |
| senderTxHash       | 문자열     | (선택사항) 발신자만 서명한 트랜잭션 해시. See [SenderTxHash][]. 이 값은 수수료를 위임하지 않은 트랜잭션의 `transactionHash` 값과 항상 동일합니다.                                            |
| signatures         | 배열      | 서명 객체의 배열입니다. 각 서명 객체에는 (V, R, S) 등 세 필드가 있습니다. V는 ECDSA 복구 ID를 담고 있습니다. R은 ECDSA 서명 r을 담고 있고 S는 ECDSA 서명 s를 담고 있습니다.                            |
| 상태                 | 문자열     | 트랜잭션이 성공적으로 실행되면 `0x1`를 반환하며, 만약 Klaytn 가상머신이 트랜잭션을 거부하면 `0x0`를 반환합니다.                                                                           |
| txError            | 문자열     | (optional) detailed error code if `status` is equal to `0x0`.                                                                                    |
| to                 | 문자열     | 트랜잭션 수신자의 주소입니다. 컨트랙트 생성 트랜잭션이면 `null`을 반환합니다.                                                                                                   |
| transactionHash    | 문자열     | 트랜잭션의 해시입니다.                                                                                                                                     |
| transactionIndex   | 문자열     | 블록 내 트랜잭션의 인덱스 위치의 정숫값입니다.                                                                                                                       |
| 형식                 | 문자열     | 트랜잭션의 유형을 나타내는 문자열입니다.                                                                                                                           |
| typeInt            | number  | 트랜잭션의 유형을 나타내는 정수입니다.                                                                                                                            |
| value              | 문자열     | peb로 전송된 값입니다.                                                                                                                                   |

**예시**

```javascript
> caver.rpc.klay.getTransactionReceipt('0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898').then(console.log)
{
    blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
    blockNumber: '0xb7',
    contractAddress: null,
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    gasUsed: '0x5208',
    logs: [],
    logsBloom: '0x00000...',
    nonce: '0x0',
    senderTxHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    signatures: [ { V: '0x4e44', R: '0xf1a9a...', S: '0x9116c...' } ],
    status: '0x1',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000',
}
```

## caver.rpc.klay.getTransactionReceiptBySenderTxHash <a id="caver-rpc-klay-gettransactionreceiptbysendertxhash"></a>

```javascript
caver.rpc.klay.getTransactionReceiptBySenderTxHash(senderTxHash [, callback])
```

SenderTxHash로 조회한 트랜잭션의 영수증을 반환합니다.

이 API는 `--sendertxhashindexing`에 의해 인덱싱 기능이 노드에서 활성화되어 있을 때만 올바른 결과를 반환합니다. Use [caver.rpc.klay.isSenderTxHashIndexingEnabled](#caver-rpc-klay-issendertxhashindexingenabled) to check if the indexing feature is enabled or not.

**참고** 트랜잭션이 아직 처리되지 않은 상태인 `pending` 상태의 트랜잭션은 영수증을 확인할 수 없습니다.

**매개변수**

| 명칭           | 타입       | 설명                                                                   |
| ------------ | -------- | -------------------------------------------------------------------- |
| senderTxHash | 문자열      | 발신자 트랜잭션 해시입니다. See [SenderTxHash][] for more detail.                |
| callback     | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Object`를 반환합니다.

| 타입     | 설명                                                                                                                               |
| ------ | -------------------------------------------------------------------------------------------------------------------------------- |
| object | A transaction receipt object, see [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) for more detail. |

**예시**

```javascript
> caver.rpc.klay.getTransactionReceiptBySenderTxHash('0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898').then(console.log)
{
    blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
    blockNumber: '0xb7',
    contractAddress: null,
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    gasUsed: '0x5208',
    logs: [],
    logsBloom: '0x00000...',
    nonce: '0x0',
    senderTxHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    signatures: [ { V: '0x4e44', R: '0xf1a9a...', S: '0x9116c...' } ],
    status: '0x1',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000',
}
```

## caver.rpc.klay.sendRawTransaction <a id="caver-rpc-klay-sendrawtransaction"></a>

```javascript
caver.rpc.klay.sendRawTransaction(signedTransaction [, callback])
```

`서명된 트랜잭션`을 Klaytn에 보냅니다.

`signedTransaction` 파라미터로 "RLP 인코딩된 서명된 트랜잭션"을 사용할 수 있습니다. 서명된 트랜잭션의 RLP 인코딩값을 얻으려면 `transaction.getRLPEncoding`을 사용하십시오. 사용자 편의를 위해 `caver.rpc.klay.sendRawTransaction`는 "서명된 트랜잭션 인스턴스"도 파라미터로 받습니다.

**매개변수**

| 명칭                | 타입                   | 설명                                                                     |
| ----------------- | -------------------- | ---------------------------------------------------------------------- |
| signedTransaction | string &#124; object | A RLP-encoded signed transaction or an instance of signed transaction. |
| callback          | function             | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다.   |

**리턴값**

| 타입         | 설명                                                                     |
| ---------- | ---------------------------------------------------------------------- |
| PromiEvent | 프로미스(promise)가 조합된 이벤트 이미터(event emitter). 트랜잭션 영수증이 준비되면 resolve 됩니다. |

PromiEvent에서는 다음 이벤트가 발생할 수 있습니다.

- `transactionHash`는 `String`를 반환: 트랜잭션을 보내고 트랜잭션 해시가 준비된 직후에 발생합니다.
- `receipt`는 `Object`를 반환: 트랜잭션 영수중이 중비되면 발생합니다. See [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) for more detail.
- `error`는 `Error`를 반환: 전송 중 에러가 발생하면 발생합니다. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

**예시**

```javascript
// Using promise
> caver.rpc.klay.sendRawTransaction('0x08f88...').then(console.log)
{
    blockHash: '0x8bff3eb5444711f53707c1c006dac54164af6f873c0f012aff98479155de3c46',
    blockNumber: '0x18a6',
    contractAddress: null,
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    gasUsed: '0x5208',
    logs: [],
    logsBloom: '0x00000...',
    nonce: '0xc',
    senderTxHash: '0x72ea9179350cf2943e966eaf1e1e651d4e1b50ead4b6e6a574a4297c9f0f7017',
    signatures: [ { V: '0x4e43', R: '0x3bee4...', S: '0x101a1...' } ],
    status: '0x1',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionHash: '0x72ea9179350cf2943e966eaf1e1e651d4e1b50ead4b6e6a574a4297c9f0f7017',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000',
}

// Using event emitter
> caver.rpc.klay.sendRawTransaction('0x08f88...').on('transactionHash', h => {...}).on('receipt', r => {...}).on('error', console.error)
```

## caver.rpc.klay.sendTransaction <a id="caver-rpc-klay-sendtransaction"></a>

```javascript
caver.rpc.klay.sendTransaction(transaction [, callback])
```

트랜잭션 `발신자`로서 "Klaytn 노드에 임포트한 계정의 개인키"로 트랜잭션에 서명하고, 트랜잭션을 Klaytn에 전송합니다.

For more information about each transaction type, refer to [Transaction][].

**참고**: 이 API는 당신의 Klaytn 노드에 [가져온 계정](../../../../json-rpc/api-references/personal.md#personal_importrawkey)으로 트랜잭션에 서명하는 기능을 제공합니다. 트랜잭션에 서명하려면 노드에 불러온 당신의 계정은 반드시 [unlocked](../../../../json-rpc/api-references/personal.md#personal_unlockaccount) 상태이어야 합니다.

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| 트랜잭션     | object   | Klaytn에 전송할 트랜잭션 인스턴스입니다.                                            |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

| 타입         | 설명                                                                     |
| ---------- | ---------------------------------------------------------------------- |
| PromiEvent | 프로미스(promise)가 조합된 이벤트 이미터(event emitter). 트랜잭션 영수증이 준비되면 resolve 됩니다. |

PromiEvent에서는 다음 이벤트가 발생할 수 있습니다.

- `transactionHash`는 `String`를 반환: 트랜잭션을 보내고 트랜잭션 해시가 준비된 직후에 발생합니다.
- `receipt`는 `Object`를 반환: 트랜잭션 영수중이 중비되면 발생합니다. See [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) for more detail.
- `error`는 `Error`를 반환: 전송 중 에러가 발생하면 발생합니다. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

**예시**

```javascript
> const tx = new caver.transaction.valueTransfer({
    from: '0x{address in hex}', // The address of imported account in Klaytn Node
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    value: caver.utils.toPeb(10, 'KLAY'),
    gas: 25000
})
// Using promise
> caver.rpc.klay.sendTransaction(tx).then(console.log)
{
    blockHash: '0xbfce3abcad0204e363ee9e3b94d15a20c1a4b86ac6cf51dd74db2226ab5b9e99',
    blockNumber: '0x1d18',
    contractAddress: null,
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    gasUsed: '0x5208',
    logs: [],
    logsBloom: '0x00000...',
    nonce: '0x13',
    senderTxHash: '0x2c001a776290ac55ac53a82a70a0b71e07c985fe57fd9d8e422b919d4317002e',
    signatures: [ { V: '0x4e43', R: '0xeac91...', S: '0xa0aa4...' } ],
    status: '0x1',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionHash: '0x2c001a776290ac55ac53a82a70a0b71e07c985fe57fd9d8e422b919d4317002e',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000',
}

// Using event emitter
> caver.rpc.klay.sendTransaction(tx).on('transactionHash', h => {...}).on('receipt', r => {...}).on('error', console.error)
```

## caver.rpc.klay.sendTransactionAsFeePayer <a id="caver-rpc-klay-sendtransactionasfeepayer"></a>

```javascript
caver.rpc.klay.sendTransactionAsFeePayer(transaction [, callback])
```

수수료 위임 트랜잭션 `트랜잭션 수수료 납부자`로서 `Klaytn 노드에 임포트한 계정의 개인키<code>로 트랜잭션에 서명하고, 트랜잭션을 Klaytn에 전송합니다.</p>

<p spaces-before="0">Before using <code>sendTransaction` as a fee payer, the transaction sender must have signed with valid signature(s) and the `nonce` must have been defined.

For more information about each transaction type, refer to [Transaction][].

**참고**: 이 API는 당신의 Klaytn 노드에 [가져온 계정](../../../../json-rpc/api-references/personal.md#personal_importrawkey)으로 트랜잭션에 서명하는 기능을 제공합니다. 트랜잭션에 서명하려면 노드에 불러온 당신의 계정은 반드시 [unlocked](../../../../json-rpc/api-references/personal.md#personal_unlockaccount) 상태이어야 합니다.

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| 트랜잭션     | object   | Klaytn에 전송할 수수료 위임 트랜잭션 인스턴스입니다.                                     |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

| 타입         | 설명                                                                     |
| ---------- | ---------------------------------------------------------------------- |
| PromiEvent | 프로미스(promise)가 조합된 이벤트 이미터(event emitter). 트랜잭션 영수증이 준비되면 resolve 됩니다. |

PromiEvent에서는 다음 이벤트가 발생할 수 있습니다.

- `transactionHash`는 `String`를 반환: 트랜잭션을 보내고 트랜잭션 해시가 준비된 직후에 발생합니다.
- `receipt`는 `Object`를 반환: 트랜잭션 영수중이 중비되면 발생합니다. See [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) for more detail.
- `error`는 `Error`를 반환: 전송 중 에러가 발생하면 발생합니다. 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.

**예시**

```javascript
> const tx = new caver.transaction.feeDelegatedValueTransfer({
    from: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 50000,
    nonce: 1,
    signatures: [
        [
            '0x4e43',
            '0x873e9db6d055596a8f79a6a2761bfb464cbc1b352ac1ce53770fc23bb16d929c',
            '0x15d206781cc8ac9ffb02c08545cb832e1f1700b46b886d72bb0cfeb4a230871e',
        ],
    ],
    feePayer: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e', // The address of imported account in Klaytn Node
})
// Using promise
> caver.rpc.klay.signTransaction(tx).then(console.log)
{
    blockHash: '0x3be2f5b17eb35d0cf83b493ddfaa96d44cba40d1839778b4a8267f4c0aa61449',
    blockNumber: '0x23ef',
    contractAddress: null,
    feePayer: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    feePayerSignatures: [ { V: '0x4e43', R: '0x7a9ec...', S: '0x22be3...' } ],
    from: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    gas: '0xc350',
    gasPrice: '0x5d21dba00',
    gasUsed: '0x7918',
    logs: [],
    logsBloom: '0x00000...',
    nonce: '0x1',
    senderTxHash: '0x71ca2e169a9c6c7b5bfdfa68e584314978f2abef955f8a2666325b860e2c9df5',
    signatures: [ { V: '0x4e43', R: '0x873e9...', S: '0x15d20...' } ],
    status: '0x1',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionHash: '0x04fa82ce10168e05db04a235f025e5b8bc004ab36710798a512fab75a95bfc52',
    transactionIndex: '0x0',
    type: 'TxTypeFeeDelegatedValueTransfer',
    typeInt: 9,
    value: '0xde0b6b3a7640000',
}

// Using event emitter
> caver.rpc.klay.sendTransactionAsFeePayer(tx).on('transactionHash', h => {...}).on('receipt', r => {...}).on('error', console.error)
```

## caver.rpc.klay.signTransaction <a id="caver-rpc-klay-signtransaction"></a>

```javascript
caver.rpc.klay.signTransaction(transaction [, callback])
```

트랜잭션 발신자로서 "Klaytn 노드에 임포트한 계정의 개인키"로 트랜잭션에 서명합니다.

For more information about each transaction type, refer to [Transaction][].

**참고**: 이 API는 당신의 Klaytn 노드에 [가져온 계정](../../../../json-rpc/api-references/personal.md#personal_importrawkey)으로 트랜잭션에 서명하는 기능을 제공합니다. 트랜잭션에 서명하려면 노드에 불러온 당신의 계정은 반드시 [unlocked](../../../../json-rpc/api-references/personal.md#personal_unlockaccount) 상태이어야 합니다.

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| 트랜잭션     | object   | 서명할 트랜잭션 인스턴스입니다.                                                    |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Object`를 반환 - 서명된 트랜잭션이 담긴 객체입니다:

| 명칭  | 타입     | 설명                      |
| --- | ------ | ----------------------- |
| raw | 문자열    | RLP 인코딩된 서명된 트랜잭션.      |
| tx  | object | 발신자 서명을 포함한 트랜잭션 객체입니다. |

**예시**

```javascript
> const tx = new caver.transaction.valueTransfer({
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e', // The address of imported account in Klaytn Node
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    value: caver.utils.toPeb(10, 'KLAY'),
    gas: 25000
})

> caver.rpc.klay.signTransaction(tx).then(console.log)
{
    raw: '0x08f88...',
    tx: {
        typeInt: 8,
        type: 'TxTypeValueTransfer',
        nonce: '0x16',
        gasPrice: '0x5d21dba00',
        gas: '0x61a8',
        to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
        value: '0x8ac7230489e80000',
        from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
        signatures: [ { V: '0x4e43', R: '0x52d64...', S: '0x1371e...' } ],
        hash: '0xe816952761caccf86ab281a00e10a36da6579c425041906a235f10959b2960b1'
    }
}
```

## caver.rpc.klay.signTransactionAsFeePayer <a id="caver-rpc-klay-signtransactionasfeepayer"></a>

```javascript
caver.rpc.klay.signTransactionAsFeePayer(transaction [, callback])
```

트랜잭션 수수료 납부자로서 "Klaytn 노드에 임포트한 계정의 개인키"로 트랜잭션에 서명합니다.

For more information about each transaction type, refer to [Transaction][].

**참고**: 이 API는 당신의 Klaytn 노드에 [가져온 계정](../../../../json-rpc/api-references/personal.md#personal_importrawkey)으로 트랜잭션에 서명하는 기능을 제공합니다. 트랜잭션에 서명하려면 노드에 불러온 당신의 계정은 반드시 [unlocked](../../../../json-rpc/api-references/personal.md#personal_unlockaccount) 상태이어야 합니다.

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| 트랜잭션     | object   | 서명할 트랜잭션 인스턴스입니다.                                                    |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Object`를 반환 - 서명된 트랜잭션이 담긴 객체입니다:

| 명칭  | 타입     | 설명                         |
| --- | ------ | -------------------------- |
| raw | 문자열    | RLP 인코딩된 서명된 트랜잭션.         |
| tx  | object | 수수료 납부자로서 서명하는 트랜잭션 객체입니다. |

**예시**

```javascript
> const tx = new caver.transaction.feeDelegatedValueTransfer({
    from: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 50000,
    nonce: 0,
    signatures: [
        [
            '0x4e43',
            '0xe87291c7311534c3e451c6f6b8cafdf7454970f98504e9af6cfdeb29757ba458',
            '0x26dcf6f3702110230b806628165e28771e1152ea864ee4c69557faccd4d3dae8',
        ],
    ],
    feePayer: '0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122', // The address of imported account in Klaytn Node
})

> caver.rpc.klay.signTransactionAsFeePayer(tx).then(console.log)
{
    raw: '0x09f8e...',
    tx: {
        typeInt: 9,
        type: 'TxTypeFeeDelegatedValueTransfer',
        nonce: '0x0',
        gasPrice: '0x5d21dba00',
        gas: '0xc350',
        to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
        value: '0xde0b6b3a7640000',
        from: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
        signatures: [ { V: '0x4e43', R: '0xe8729...', S: '0x26dcf...' } ],
        feePayer: '0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122',
        feePayerSignatures: [ { V: '0x4e43', R: '0x5cce8...', S: '0x32907...' } ],
        hash: '0xdb89281f3a44a2370d73b389bbcfb9a597f558219145cf269a0b1480f8e778cc',
    },
}
```

## caver.rpc.klay.getDecodedAnchoringTransactionByHash <a id="caver-rpc-klay-getdecodedanchoringtransactionbyhash"></a>

```javascript
caver.rpc.klay.getDecodedAnchoringTransactionByHash(transactionHash [, callback])
```

주어진 트랜잭션 해시에 대응하는 트랜잭션의 앵커링 데이터를 디코딩하여 반환합니다.

**매개변수**

| 명칭              | 타입       | 설명                                                                   |
| --------------- | -------- | -------------------------------------------------------------------- |
| transactionHash | 문자열      | 트랜잭션 해시입니다.                                                          |
| callback        | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `Object`를 반환 - 앵커링된 데이터를 디코딩한 값을 담고 있는 객체입니다.

| 명칭            | 타입     | 설명                                                                                                             |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| BlockHash     | 문자열    | 이 앵커링 트랜잭션이 수행된 자식 체인의 블록 해시입니다.                                                                               |
| BlockNumber   | number | 이 앵커링 트랜잭션이 수행된 자식 체인의 블록 번호입니다.                                                                               |
| ParentHash    | 문자열    | 이전 블록의 해시입니다.                                                                                                  |
| TxHash        | 문자열    | 블록의 트랜잭션 트라이의 루트 해시입니다.                                                                                        |
| StateRootHash | 문자열    | 블록의 상태 트라이의 루트 해시입니다.                                                                                          |
| ReceiptHash   | 문자열    | 블록의 영수증 트라이의 루트 해시입니다.                                                                                         |
| BlockCount    | number | 이 앵커링 주기 동안 생성된 블록 수입니다. 대부분의 경우 이 숫자는 자식 체인의 `SC_TX_PERIOD`와 같은데, 다만 이 트랜잭션이 앵커링을 활성화한 후 첫번째 트랜잭션인 경우만 예외입니다. |
| TxCount       | number | 이 앵커링 주기 동안 자식 체인에서 생성된 트랜잭션 수 입니다.                                                                            |

**예시**

```javascript
> caver.rpc.klay.getDecodedAnchoringTransactionByHash('0x59831a092a9f0b48018848f5dd88a457efdbfabec13ea07cd769686741a1cd13').then(console.log)
{
    BlockCount: 86400,
    BlockHash: '0x3c44b2ed491be7264b9f6819c67427642447716576b6702a72f6fdc40c41abde',
    BlockNumber: 23414400,
    ParentHash: '0x735468bb091a296c45553c8f67a8d0d39ac428cbe692b1b6c494d336351477f3',
    ReceiptHash: '0x6a908d319b6f6ab4414da1afd6763d70ecc8037ec167aa8a942bc0c2af12b4ab',
    StateRootHash: '0x4a664227fb2508a2952a4695cabb88b433522af2a5dee50cc6dd4036d85bf1d3',
    TxCount: 50895,
    TxHash: '0x753a85d2c53fc34cb9108301f1cf8ff8d78dde13d42d80958e47e388008319cd',
}
```

## caver.rpc.klay.getChainId <a id="caver-rpc-klay-getchainid"></a>

```javascript
caver.rpc.klay.getChainId([callback])
```

체인 ID를 반환합니다.

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명            |
| --- | ------------- |
| 문자열 | 체인의 체인 ID입니다. |

**예시**

```javascript
> caver.rpc.klay.getChainId().then(console.log)
0x2710
```

## caver.rpc.klay.getClientVersion <a id="caver-rpc-klay-getclientversion"></a>

```javascript
caver.rpc.klay.getClientVersion([callback])
```

Klaytn 노드의 현재 클라이언트 버전을 반환합니다.

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명                             |
| --- | ------------------------------ |
| 문자열 | Klaytn 노드의 현재 클라이언트 버전을 반환합니다. |

**예시**

```javascript
> caver.rpc.klay.getClientVersion().then(console.log)
Klaytn/v1.3.0+144494d2aa/linux-amd64/go1.13.1
```

## caver.rpc.klay.getGasPrice <a id="caver-rpc-klay-getgasprice"></a>

```javascript
caver.rpc.klay.getGasPrice([callback])
```

peb의 현재 가스 가격을 반환합니다.

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명                     |
| --- | ---------------------- |
| 문자열 | peb으로 환산된 현재 가스 가격입니다. |

**예시**

```javascript
> caver.rpc.klay.getGasPrice().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getGasPriceAt <a id="caver-rpc-klay-getgaspriceat"></a>

```javascript
caver.rpc.klay.getGasPriceAt([blockNumber] [, callback])
```

주어진 블록에서 peb으로 환산된 현재 가스 가격을 반환합니다.

**매개변수**

| 명칭          | 타입       | 설명                                                                   |
| ----------- | -------- | -------------------------------------------------------------------- |
| blockNumber | number   | (optional) The block number. 이를 생략하면 최신 단가가 반환됩니다.                   |
| callback    | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명                     |
| --- | ---------------------- |
| 문자열 | peb으로 환산된 현재 가스 가격입니다. |

**예시**

```javascript
> caver.rpc.klay.getGasPriceAt().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.isParallelDBWrite <a id="caver-rpc-klay-isparalleldbwrite"></a>

```javascript
caver.rpc.klay.isParallelDBWrite([callback])
```

노드가 병렬로 블록체인 데이터를 쓰고 있으면 true를 반환합니다.

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `boolean`을 반환합니다.

| 타입      | 설명                                                                                |
| ------- | --------------------------------------------------------------------------------- |
| boolean | true이면 노드가 블록체인 데이터를 병렬로 기록하고 있음을 의미합니다. 노드가 블록체인 데이터를 순차적으로 쓰고 있으면 false를 반환합니다. |

**예시**

```javascript
> caver.rpc.klay.isParallelDBWrite().then(console.log)
true
```

## caver.rpc.klay.isSenderTxHashIndexingEnabled <a id="caver-rpc-klay-issendertxhashindexingenabled"></a>

```javascript
caver.rpc.klay.isSenderTxHashIndexingEnabled([callback])
```

노드가 트랜잭션 해시 맵핑 정보를 SenderTxHash로 색인화하고 있으면 true를 반환합니다.

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `boolean`을 반환합니다.

| 타입      | 설명                                                      |
| ------- | ------------------------------------------------------- |
| boolean | true이면 노드가 트랜잭션 해시 맵핑 정보를 SenderTxHash로 색인화하고 있다는 것입니다. |

**예시**

```javascript
> caver.rpc.klay.isSenderTxHashIndexingEnabled().then(console.log)
true
```

## caver.rpc.klay.getProtocolVersion <a id="caver-rpc-klay-getprotocolversion"></a>

```javascript
caver.rpc.klay.getProtocolVersion([callback])
```

노드의 Klaytn 프로토콜 버전을 반환합니다.

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명                     |
| --- | ---------------------- |
| 문자열 | 노드의 Klaytn 프로토콜 버전입니다. |

**예시**

```javascript
> caver.rpc.klay.getProtocolVersion().then(console.log)
0x40
```

## caver.rpc.klay.getRewardbase <a id="caver-rpc-klay-getrewardbase"></a>

```javascript
caver.rpc.klay.getRewardbase([callback])
```

현재 노드의 Rewardbase를 반환합니다. Rewardbase는 블록 보상을 받은 계정의 주소입니다. 컨센서스 노드(CN)의 경우에만 해당합니다.

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명                               |
| --- | -------------------------------- |
| 문자열 | Rewardbase는 블록 보상을 받은 계정의 주소입니다. |

**예시**

```javascript
> caver.rpc.klay.getRewardbase().then(console.log)
0xa9b3a93b2a9fa3fdcc31addd240b04bf8db3414c
```

## caver.rpc.klay.isWriteThroughCaching <a id="caver-rpc-klay-iswritethroughcaching"></a>

```javascript
caver.rpc.klay.isWriteThroughCaching([callback])
```

노드가 writeThroughCaching을 사용하고 있으면 true를 반환합니다.

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `boolean`을 반환합니다.

| 타입      | 설명                                        |
| ------- | ----------------------------------------- |
| boolean | true이면 노드가 write-through 캐싱을 하고 있다는 것입니다. |

**예시**

```javascript
> caver.rpc.klay.isWriteThroughCaching().then(console.log)
false
```

## caver.rpc.klay.getFilterChanges <a id="caver-rpc-klay-getfilterchanges"></a>

```javascript
caver.rpc.klay.getFilterChanges(filterId [, callback])
```

필터에 대한 폴링 방법으로, 마지막 폴링 이후 발생한 로그를 배열의 형태로 반환합니다.

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| filterId | String   | 필터 ID입니다.                                                            |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `배열`을 반환합니다 - 로그 객체의 배열을 반환하거나 또는 최근 폴링 이후 변화가 없는 경우 빈 배열을 반환합니다.

- For filters created with [caver.rpc.klay.newBlockFilter](#caver-rpc-klay-newblockfilter), the returns are block hashes, *e.g.*, `["0x3454645634534..."]`.
- For filters created with [caver.rpc.klay.newPendingTransactionFilter](#caver-rpc-klay-newpendingtransactionfilter), the returns are transaction hashes, *e.g.*, `["0x6345343454645..."]`.
- For filters created with [caver.rpc.klay.newFilter](#caver-rpc-klay-newfilter), logs are objects with the following parameters:

| 명칭               | 타입  | 설명                                                                                                                                                                                  |
| ---------------- | --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| logIndex         | 문자열 | 블록에서 로그 인덱스 위치입니다.                                                                                                                                                                  |
| transactionIndex | 문자열 | 이 로그가 생성된 트랜잭션의 인덱스 위치입니다.                                                                                                                                                          |
| transactionHash  | 문자열 | 로그가 생성된 트랜잭션의 해시입니다. 보류 중인 경우 `null`을 반환합니다.                                                                                                                                        |
| blockHash        | 문자열 | 로그가 생성된 블록의 해시입니다. 보류 중인 경우 `null`을 반환합니다.                                                                                                                                          |
| blockNumber      | 문자열 | 로그가 속한 블록의 번호입니다. 보류 중인 경우 `null`을 반환합니다.                                                                                                                                           |
| address          | 문자열 | 로그를 발생시킨 주소입니다.                                                                                                                                                                     |
| data             | 문자열 | 로그 중 인덱스화되지 않은 인수를 담고 있습니다.                                                                                                                                                         |
| topics           | 배열  | 길이가 0부터 4까지인 배열로, 배열의 각 원소는 32바이트 크기 DATA 형태의 인덱스화된 로그 인수들입니다. (솔리디티의 경우 `anonymous` 지정자로 이벤트를 선언하지 않았다면 첫 번째 토픽은 이벤트에 대한 서명의 해시입니다. (*예를 들어*, `Deposit(address,bytes32,uint256)`)) |

**예시**

```javascript
> caver.rpc.klay.getFilterChanges('0xafb8e49bbcba9d61a3c616a3a312533e').then(console.log)
[ 
    { 
        address: '0x71e503935b7816757AA0314d4E7354dab9D39162',
        topics: [ '0xe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9' ],
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        blockNumber: '0xdc5',
        transactionHash: '0x1b28e2c723e45a0d8978890598903f36a74397c9cea8531dc9762c39483e417f',
        transactionIndex: '0x0',
        blockHash: '0xb7f0bdaba93d3baaa01a5c24517da443207f774e0202f02c298e8e997a540b3d',
        logIndex: '0x0'
    } 
]
```

## caver.rpc.klay.getFilterLogs <a id="caver-rpc-klay-getfilterlogs"></a>

```javascript
caver.rpc.klay.getFilterLogs(filterId [, callback])
```

입력으로 받은 필터 ID값을 가진 필터 객체를 찾고, 이 필터 객체에 해당하는 모든 로그를 배열 형태로 반환합니다. The filter object should be obtained by using [newFilter](#caver-rpc-klay-newfilter).

Note that filter ids returned by other filter creation functions, such as [caver.rpc.klay.newBlockFilter](#caver-rpc-klay-newblockfilter) or [caver.rpc.klay.newPendingTransactionFilter](#caver-rpc-klay-newpendingtransactionfilter), cannot be used with this function.


**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| filterId | 문자열      | 필터 ID입니다.                                                            |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

See [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges)

**예시**

```javascript
> caver.rpc.klay.getFilterLogs('0xcac08a7fc32fc625a519644187e9f690').then(console.log);
[
    {
        address: '0x55384B52a9E5091B6012717197887dd3B5779Df3',
        topics: [ '0xe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9' ],
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        blockNumber: '0x1c31',
        transactionHash: '0xa7436c54e47dafbce696de65f6e890c96ac22c236f50ca1be28b9b568034c3b3',
        transactionIndex: '0x0',
        blockHash: '0xe4f27c524dacfaaccb36735deccee69b3d6c315e969779784c36bb8e14b89e01',
        logIndex: '0x0'
    }
]
```

## caver.rpc.klay.getLogs <a id="caver-rpc-klay-getlogs"></a>

```javascript
caver.rpc.klay.getLogs(options [, callback])
```

입력으로 받은 필터 객체와 일치하는 모든 로그를 배열 형태로 반환합니다.

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| options  | object   | 필터 옵션. 자세한 내용은 아래 표를 참조하세요.                                          |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

옵션 개체에는 다음이 포함됩니다:

| 명칭        | 타입                   | 설명                                                                                                                                                                                                                                                                           |
| --------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromBlock | number &#124; string | (optional) The block number of the earliest block to get the logs. (`"latest"` means the most recent block.) 기본값은 `"latest"`입니다.                                                                                                                                             |
| toBlock   | number &#124; string | (optional) The block number of the last block to get the logs. (`"latest"` means the most recent block.). 기본값은 `"latest"`입니다.                                                                                                                                                |
| address   | string &#124; Array  | (optional) An address or a list of addresses. Only the logs related to the particular account(s) will be returned.                                                                                                                                                           |
| topics    | 배열                   | (optional) An array of values that must appear in the log entries. 값들의 순서는 중요합니다. If you want to leave topics out, use `null`, *e.g.*, `[null, '0x12...']`. You can also pass an array for each topic with options for that topic, *e.g.,* `[null, ['option1', 'option2']]`. |

**리턴값**

See [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges)

**예시**

```javascript
> caver.rpc.klay.getLogs({
        fromBlock: '0x1'
        toBlock: 'latest',
        address:'0x87ac99835e67168d4f9a40580f8f5c33550ba88b'
    }).then(console.log)
[
    {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: [
            '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385
        ]
        logIndex: '0x0',
        transactionIndex: '0x0',
        transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
        blockNumber: '0x4d2',
        address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
    },
    {...}
]
```

## caver.rpc.klay.newBlockFilter <a id="caver-rpc-klay-newblockfilter"></a>

```javascript
caver.rpc.klay.newBlockFilter([callback])
```

노드에 필터를 생성하여 새로운 블록이 도착하였음을 알립니다. To check if the state has changed, call [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges).

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명        |
| --- | --------- |
| 문자열 | 필터 ID입니다. |

**예시**

```javascript
> caver.rpc.klay.newBlockFilter().then(console.log)
0xf90906914486a9c22d620e50022b38d5
```

## caver.rpc.klay.newFilter <a id="caver-rpc-klay-newfilter"></a>

```javascript
caver.rpc.klay.newFilter(options [, callback])
```

Creates a filter object using the given filter options, to receive the specific state changes (logs).
- To check if the state has changed, call [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges).
- To obtain all logs matching the filter created by `newFilter`, call [caver.rpc.klay.getFilterLogs](#caver-rpc-klay-getfilterlogs).

For detailed information about the topics in the filter object, please see [Klaytn Platform API - klay_newFilter](../../../../json-rpc/api-references/klay/filter.md#klay_newfilter).

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| options  | object   | 필터 옵션. 자세한 내용은 아래 표를 참조하세요.                                          |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

옵션 개체에는 다음이 포함됩니다:

| 명칭        | 타입                   | 설명                                                                                                                                                                                                                                                                           |
| --------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromBlock | number &#124; string | (optional) The block number of the earliest block to get the logs. (`"latest"` means the most recent block.) 기본값은 `"latest"`입니다.                                                                                                                                             |
| toBlock   | number &#124; string | (optional) The block number of the last block to get the logs. (`"latest"` means the most recent block.). 기본값은 `"latest"`입니다.                                                                                                                                                |
| address   | string &#124; Array  | (optional) An address or a list of addresses. Only the logs related to the particular account(s) will be returned.                                                                                                                                                           |
| topics    | 배열                   | (optional) An array of values that must appear in the log entries. 값들의 순서는 중요합니다. If you want to leave topics out, use `null`, *e.g.*, `[null, '0x12...']`. You can also pass an array for each topic with options for that topic, *e.g.,* `[null, ['option1', 'option2']]`. |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명        |
| --- | --------- |
| 문자열 | 필터 ID입니다. |

**예시**

```javascript
> caver.rpc.klay.newFilter({}).then(console.log)
0x40d40cb9758c6f0d99d9c2ce9c0f823

> caver.rpc.klay.newFilter({ address: '0x55384B52a9E5091B6012717197887dd3B5779Df3' }).then(console.log)
0xd165cbf31b9d60346aada33dbefe01b
```

## caver.rpc.klay.newPendingTransactionFilter <a id="caver-rpc-klay-newpendingtransactionfilter"></a>

```javascript
caver.rpc.klay.newPendingTransactionFilter([callback])
```

보류 상태의 트랜잭션이 새롭게 도착했다는 정보를 받기 위해 노드에 필터를 만듭니다. To check if the state has changed, call [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges).

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명        |
| --- | --------- |
| 문자열 | 필터 ID입니다. |

**예시**

```javascript
> caver.rpc.klay.newPendingTransactionFilter().then(console.log)
0xe62da1b2a09efcd4168398bdbf586db0
```

## caver.rpc.klay.uninstallFilter <a id="caver-rpc-klay-uninstallfilter"></a>

```javascript
caver.rpc.klay.uninstallFilter(filterId [, callback])
```

입력으로 받은 ID를 가진 필터를 제거합니다. 더는 모니터링을 하지 않으면 호출해야 합니다. Additionally, filters time out when they are not being called with [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges) for a period of time.

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| filterId | 문자열      | 필터 ID입니다.                                                            |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `boolean`을 반환합니다.

| 타입      | 설명                                               |
| ------- | ------------------------------------------------ |
| boolean | 필터가 성공적으로 제거되면 true를 반환하고, 그렇지 않으면 false를 반환합니다. |

**예시**

```javascript
> caver.rpc.klay.uninstallFilter('0x1426438ffdae5abf43edf4159c5b013b').then(console.log)
true
```

## caver.rpc.klay.sha3 <a id="caver-rpc-klay-sha3"></a>

```javascript
caver.rpc.klay.sha3(data[, callback])
```

입력된 데이터의 Keccak-256(이 해시 함수는 표준 SHA3-256가 아닙니다) 해시를 반환합니다. 이 메서드 대신 [caver.utils.sha3](../caver.utils.md#sha3)도 사용하실 수 있습니다.

**매개변수**

| 명칭       | 타입       | 설명                                                                   |
| -------- | -------- | -------------------------------------------------------------------- |
| data     | String   | SHA3 해시로 변환할 데이터입니다.                                                 |
| callback | function | (선택 사항) 선택적 콜백(callback)은 오류 객체를 첫 번째 매개 변수로, 결과를 두 번째 매개 변수로 반환합니다. |

**리턴값**

`프로미스`는 `String`를 반환합니다.

| 타입  | 설명                          |
| --- | --------------------------- |
| 문자열 | 입력으로 받은 데이터의 SHA3 해시 결과입니다. |

**예시**

```javascript
> caver.rpc.klay.sha3('0x11223344').then(console.log)
0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70dd73
```

[AccountKey]: ../../../../../klaytn/design/accounts.md#account-key
[AccountKeyLegacy]: ../caver.account.md#accountkeylegacy
[AccountKeyPublic]: ../caver.account.md#accountkeypublic
[AccountKeyFail]: ../caver.account.md#accountkeyfail
[AccountKeyWeightedMultiSig]: ../caver.account.md#accountkeyweightedmultisig
[AccountKeyRoleBased]: ../caver.account.md#accountkeyrolebased
[SenderTxHash]: ../../../../../klaytn/design/transactions/README.md#sendertxhash
[caver.rpc.klay.getTransactionByHash]: #caver-rpc-klay-gettransactionbyhash
[Transaction]: ../caver.transaction/README.md#class
