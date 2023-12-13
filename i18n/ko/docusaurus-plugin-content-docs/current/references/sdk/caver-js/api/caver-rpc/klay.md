# caver.rpc.klay

`caver.rpc.klay`는 `klay` 네임스페이스가 있는 JSON-RPC 호출을 제공합니다.

## caver.rpc.klay.accountCreated <a href="#caver-rpc-klay-accountcreated" id="caver-rpc-klay-accountcreated"></a>

```javascript
caver.rpc.klay.accountCreated(address [, blockNumber] [, callback])
```

주소와 연결된 계정이 클레이튼 블록체인 플랫폼에서 생성된 경우 `true`를 반환합니다. 그렇지 않으면 `false`를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| address | String | 네트워크에서 생성되었는지 확인하기 위해 쿼리하려는 계정의 주소입니다.                 |
| blockNumber | number \| string | (선택 사항) 블록 번호 또는 `latest` 또는 `earliest` 문자열입니다. 생략하면 `latest`이 사용됩니다.        |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `boolean`을 반환합니다.

| 유형 | 설명 |
| ------- | ------------------------------------------------ |
| bool | 클레이튼에 입력 주소가 있는지 여부입니다. |

**예시**

```javascript
> caver.rpc.klay.accountCreated('0x{address in hex}').then(console.log)
true
```

## caver.rpc.klay.getAccount <a href="#caver-rpc-klay-getaccount" id="caver-rpc-klay-getaccount"></a>

```javascript
caver.rpc.klay.getAccount(address [, blockNumber] [, callback])
```

클레이튼에서 주어진 주소의 계정 정보를 반환합니다. 클레이튼의 계정 유형에 대한 자세한 내용은 [클레이튼 계정 유형](../../../../../learn/accounts.md#klaytn-account-types)을 참고하시기 바랍니다.

**참고** `caver.rpc.klay.getAccount`는 네트워크에 존재하는 계정을 반환하므로 주소와 일치하는 계정이 실제 블록체인 네트워크에 존재하지 않는 경우 `null`이 반환됩니다.

**매개변수**

| 이름 | 유형 | 설명
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| address | String | 계정 정보를 가져올 계정의 주소입니다.                                  |
| blockNumber | number \| string | (선택 사항) 블록 번호 또는 `latest` 또는 `earliest` 문자열입니다. 생략하면 `latest`이 사용됩니다.        |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`promise`는 `object`를 반환합니다.

| 유형 | 설명 |
| ------ | -------------------------------------------------------------------------------------------- |
| object | 계정 정보가 포함된 개체입니다. 각 계정 유형에는 서로 다른 속성이 있습니다. |

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

## caver.rpc.klay.getAccountKey <a href="#caver-rpc-klay-getaccountkey" id="caver-rpc-klay-getaccountkey"></a>

```javascript
caver.rpc.klay.getAccountKey(address [, blockNumber] [, callback])
```

주어진 주소의 계정 키를 반환합니다. 계정에 [AccountKeyLegacy](../../../../../learn/accounts.md#accountkeylegacy)가 있거나 주어진 주소의 계정이 [스마트 컨트랙트 계정](../../../../../learn/accounts.md#smart-contract-accounts-scas)인 경우 빈 키값을 반환합니다. 자세한 내용은 [계정 키](../../../../../learn/accounts.md#account-key)를 참조하세요.

**참고** `caver.rpc.klay.getAccountKey`는 계정키 유형에 따라 다른 객체를 반환합니다. 주어진 주소와 일치하는 클레이튼 계정이 네트워크에 존재하지 않으면 `null`이 반환됩니다.

**매개변수**

| 이름 | 유형 | 설명
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| address | String | 계정키 정보의 객체를 가져올 클레이튼 계정의 주소입니다.              |
| blockNumber | number \| string | (선택 사항) 블록 번호 또는 `latest` 또는 `earliest` 문자열입니다. 생략하면 `latest`이 사용됩니다.        |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`promise`는 `object`를 반환합니다.

| 유형 | 설명 |
| ------ | ---------------------------------------------------------------------------------------------- |
| object | 계정키 정보가 포함된 개체입니다. 각 AccountKey 유형에는 서로 다른 속성이 있습니다. |

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

## caver.rpc.klay.encodeAccountKey <a href="#caver-rpc-klay-encodeaccountkey" id="caver-rpc-klay-encodeaccountkey"></a>

```javascript
caver.rpc.klay.encodeAccountKey(accountKey [, callback])
```

재귀적 길이 접두사(RLP) 인코딩 체계를 사용하여 AccountKey 정보가 포함된 개체를 인코딩합니다. 또한 [account.getRLPEncodingAccountKey](../caver.account.md#account-getrlpencodingaccountkey)를 사용하여 RLP로 인코딩된 AccountKey를 가져올 수도 있습니다.

**매개변수**

| 이름 | 유형 | 설명
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AccountKey | Object | 개체는 `keyType` 및 `key` 내부 또는 `AccountKey`의 인스턴스를 정의합니다 ([AccountKeyLegacy](../caver.account.md#accountkeylegacy), [AccountKeyPublic](../caver.account.md#accountkeypublic), [AccountKeyFail](../caver.account.md#accountkeyfail), [AccountKeyWeightedMultiSig](../caver.account.md#accountkeyweightedmultisig) 또는 [AccountKeyRoleBased](../caver.account.md#accountkeyrolebased)). |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다.                                                                                                                                                                                                                                                                                              |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | ------------------------- |
| string | RLP로 인코딩된 계정 키입니다. |

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

## caver.rpc.klay.decodeAccountKey <a href="#caver-rpc-klay-decodeaccountkey" id="caver-rpc-klay-decodeaccountkey"></a>

```javascript
caver.rpc.klay.decodeAccountKey(encodedKey [, callback])
```

RLP로 인코딩된 계정키를 디코딩합니다. 또한 [caver.account.accountKey.decode](../caver.account.md#caver-account-accountkey-decode)를 사용하여 RLP로 인코딩된 AccountKey를 디코딩할 수도 있습니다.

**매개변수**

| 이름 | 유형 | 설명
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| encodedKey | String | RLP로 인코딩된 계정 키입니다.                                                                                  |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`promise`는 `object`를 반환합니다.

| 유형 | 설명 |
| ------ | --------------------------------------------- |
| object | 객체는 내부에 `keyType`과 `key`를 정의합니다. |

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

## caver.rpc.klay.getBalance <a href="#caver-rpc-klay-getbalance" id="caver-rpc-klay-getbalance"></a>

```javascript
caver.rpc.klay.getBalance(address [, blockNumber] [, callback])
```

클레이튼에서 주어진 주소의 계정 잔액을 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| address | String | 잔액을 받으려는 계정의 주소입니다.                                              |
| blockNumber | number \| string | (선택 사항) 블록 번호 또는 `latest` 또는 `earliest` 문자열입니다. 생략하면 `latest`이 사용됩니다.        |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | ------------------------------------------------- |
| string | 주어진 주소의 현재 잔액(단위: peb)입니다. |

**예시**

```javascript
> caver.rpc.klay.getBalance('0x{address in hex}').then(console.log)
0xde0b6b3a7640000
```

## caver.rpc.klay.getCode <a href="#caver-rpc-klay-getcode" id="caver-rpc-klay-getcode"></a>

```javascript
caver.rpc.klay.getCode(address [, blockNumber] [, callback])
```

지정된 주소의 코드를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| address | String | 코드를 가져올 주소입니다.                                                                          |
| blockNumber | number \| string | (선택 사항) 블록 번호 또는 `latest` 또는 `earliest` 문자열입니다. 생략하면 `latest`이 사용됩니다.        |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | -------------------------------- |
| string | 주어진 주소의 코드입니다. |

**예시**

```javascript
> caver.rpc.klay.getCode('0x{address in hex}').then(console.log)
0x60806...
```

## caver.rpc.klay.getTransactionCount <a href="#caver-rpc-klay-gettransactioncount" id="caver-rpc-klay-gettransactioncount"></a>

```javascript
caver.rpc.klay.getTransactionCount(address [, blockNumber] [, callback])
```

주소에서 보낸 총 트랜잭션 수를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| ----------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| address | String | 트랜잭션 수를 가져올 주소입니다.                                                                                                                                                                                                                |
| blockNumber | number \| string | (선택 사항) 블록 번호, 보류 중인 nonce에 대한 문자열 `pending` 또는 [기본 블록 매개변수](../../../../json-rpc/klay/block.md#the-default-block-parameter)에서처럼 `earliest` 또는 `latest` 문자열입니다. 생략하면 `latest`이 사용됩니다. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다.                                                                                                                                                         |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | -------------------------------------------------------------- |
| string | 주어진 주소에서 전송된 트랜잭션 수(16진수)입니다. |

**예시**

```javascript
> caver.rpc.klay.getTransactionCount('0x{address in hex}').then(console.log)
0x5f
```

## caver.rpc.klay.isContractAccount <a href="#caver-rpc-klay-iscontractaccount" id="caver-rpc-klay-iscontractaccount"></a>

```javascript
caver.rpc.klay.isContractAccount(address [, blockNumber] [, callback])
```

입력 계정이 특정 블록 번호 시점에 비어 있지 않은 코드해시를 가지고 있으면 `true`를 반환합니다. 계정이 코드해시가 없는 EOA 또는 스마트 컨트랙트 계정인 경우 `false`를 반환합니다. 자세한 내용은 [스마트 컨트랙트 계정](../../../../../learn/accounts.md#smart-contract-accounts-scas)을 참고하시기 바랍니다.

**매개변수**

| 이름 | 유형 | 설명
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| address | String | 확인하려는 주소는 isContractAccount입니다.                                                       |
| blockNumber | number \| string | (선택 사항) 블록 번호 또는 `latest` 또는 `earliest` 문자열입니다. 생략하면 `latest`이 사용됩니다.        |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개 변수로 오류 객체를 반환하고 두 번째 매개 변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `boolean`을 반환합니다.

| 유형 | 설명 |
| ------- | --------------------------------------------------------------------- |
| bool | true는 입력 파라미터가 기존 스마트 컨트랙트 주소임을 의미합니다. |

**예시**

```javascript
> caver.rpc.klay.isContractAccount('0x{address in hex}').then(console.log)
false

> caver.rpc.klay.isContractAccount('0x{address in hex}').then(console.log)
true
```

## caver.rpc.klay.sign <a href="#caver-rpc-klay-sign" id="caver-rpc-klay-sign"></a>

```javascript
caver.rpc.klay.sign(address, message [, blockNumber] [, callback])
```

클레이튼에 특화된 서명된 데이터를 생성합니다. 서명이 어떻게 생성되는지 알고 싶으시다면 [Klaytn 플랫폼 API - klay_sign](../../../../json-rpc/klay/account.md#klay_sign)을 참고하세요.

**참고**: 이 API는 클레이튼 노드에서 [가져온 계정](../../../../json-rpc/personal.md#personal_importrawkey)을 사용하여 메시지에 서명하는 기능을 제공합니다. 노드에서 가져온 계정은 [잠금해제](../../../../json-rpc/personal.md#personal_unlockaccount) 상태여야 메시지에 서명할 수 있습니다. 클레이튼 노드에서 가져온 계정으로 트랜잭션에 서명하려면 [caver.rpc.klay.signTransaction](#caver-rpc-klay-signtransaction)을 사용하세요.

**매개변수**

| 이름 | 유형 | 설명
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| address | String | 메시지에 서명할 가져온 계정의 주소입니다.                                                   |
| message | String | 서명할 메시지입니다.                                                                                           |
| blockNumber | number \| string | (선택 사항) 블록 번호 또는 `latest` 또는 `earliest` 문자열입니다. 생략하면 `latest`이 사용됩니다.        |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | -------------------------------------------- |
| string | 가져온 계정에서 만든 서명입니다. |

**예시**

```javascript
> caver.rpc.klay.sign('0x{address in hex}', '0xdeadbeaf').then(console.log)
0x1066e052c4be821daa4d0a0cd1e9e75ccb200bb4001c2e38853ba41b712a5a226da2acd67c86a13b266e0d75d0a6e7d1551c8924af413267615a5948617c746c1c
```

## caver.rpc.klay.getAccounts <a href="#caver-rpc-klay-getaccounts" id="caver-rpc-klay-getaccounts"></a>

```javascript
caver.rpc.klay.getAccounts([callback])
```

클레이튼 노드가 소유한 주소 목록을 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `Array`를 반환합니다.

| 유형 | 설명 |
| ----- | ----------------------------------------------- |
| Array | 클레이튼 노드가 소유한 주소의 배열입니다. |

**예시**

```javascript
> caver.rpc.klay.getAccounts().then(console.log)
[
    '0xe1531e916857d1b3a7db92f9187b96a7b43813bf',
    '0x75331c25535052157ff5110ba7d0cf940d3a9ca6'
]
```

## caver.rpc.klay.getBlockNumber <a href="#caver-rpc-klay-getblocknumber" id="caver-rpc-klay-getblocknumber"></a>

```javascript
caver.rpc.klay.getBlockNumber([callback])
```

가장 최근 블록의 번호를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | ------------------------------------------- |
| string | 가장 최근 블록의 번호(헥사)입니다. |

**예시**

```javascript
> caver.rpc.klay.getBlockNumber().then(console.log)
0x5d39
```

## caver.rpc.klay.getHeader <a href="#caver-rpc-klay-getheader" id="caver-rpc-klay-getheader"></a>

```javascript
caver.rpc.klay.getHeader(blockNumberOrHash [, callback])
```

블록 해시 또는 블록 번호로 블록 헤더를 반환합니다. 사용자가 블록 해시를 파라미터로 전달하면 [caver.rpc.klay.getHeaderByHash](#caver-rpc-klay-getheaderbyhash)가 호출되고, 블록 번호를 파라미터로 전달하면 [caver.rpc.klay.getHeaderByNumber](#caver-rpc-klay-getheaderbynumber)가 호출됩니다.

**매개변수**

| 이름 | 유형 | 설명
| ----------------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| blockNumberOrHash | number \| string | 블록 해시, 숫자 또는 블록 태그 문자열입니다.                                                            |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`promise`는 `object`를 반환합니다.

| 유형 | 설명 |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | 블록 헤더 객체. 반환 값에 대한 자세한 설명은 [caver.rpc.klay.getHeaderByHash](#caver-rpc-klay-getheaderbyhash)를 참조하세요. |

**예시**

```javascript
> caver.rpc.klay.getHeader(1).then(console.log)
{
  baseFeePerGas: '0x0',
  blockScore: '0x1',
  extraData: '0xd8830...',
  gasUsed: '0x0',
  governanceData: '0x',
  hash: '0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3',
  logsBloom: '0x00000...',
  number: '0xbacd3',
  parentHash: '0xd6e36611a6722b94b8e4bb4d164755445409cf43aa5db0a5d4ae01e621c81ce7',
  receiptsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  reward: '0x30be91c80566da777d30e659b6746174ecc61576',
  stateRoot: '0xe75d808889451b1dac3d209e8cfbb2159ea6b2a080ce6081be775fb426f047a8',
  timestamp: '0x62201975',
  timestampFoS: '0x0',
  transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
}
```

## caver.rpc.klay.getHeaderByNumber <a href="#caver-rpc-klay-getheaderbynumber" id="caver-rpc-klay-getheaderbynumber"></a>

```javascript
caver.rpc.klay.getHeaderByNumber(blockNumber [, returnTransactionObjects] [, callback])
```

블록 번호별로 블록 헤더를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| blockNumber | number \| string | 블록 번호 또는 블록 태그 문자열입니다.                                                                  |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`promise`는 `object`를 반환합니다.

| 유형 | 설명 |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | 블록 헤더 객체. 반환 값에 대한 자세한 설명은 [caver.rpc.klay.getHeaderByHash](#caver-rpc-klay-getheaderbyhash)를 참조하세요. |

**예시**

```javascript
> caver.rpc.klay.getHeaderByNumber(765139).then(console.log)
{
  baseFeePerGas: '0x0',
  blockScore: '0x1',
  extraData: '0xd8830...',
  gasUsed: '0x0',
  governanceData: '0x',
  hash: '0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3',
  logsBloom: '0x00000...',
  number: '0xbacd3',
  parentHash: '0xd6e36611a6722b94b8e4bb4d164755445409cf43aa5db0a5d4ae01e621c81ce7',
  receiptsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  reward: '0x30be91c80566da777d30e659b6746174ecc61576',
  stateRoot: '0xe75d808889451b1dac3d209e8cfbb2159ea6b2a080ce6081be775fb426f047a8',
  timestamp: '0x62201975',
  timestampFoS: '0x0',
  transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
}
```

## caver.rpc.klay.getHeaderByHash <a href="#caver-rpc-klay-getheaderbyhash" id="caver-rpc-klay-getheaderbyhash"></a>

```javascript
caver.rpc.klay.getHeaderByHash(blockHash [, returnTransactionObjects] [, callback])
```

`blockHash`를 사용하여 가장 최근 블록의 블록 번호를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| --------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| blockHash | String | 블록 해시입니다.                                                                                            |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`promise`는 `object`를 반환합니다 - 객체에는 블록 헤더가 포함됩니다:

| 이름 | 유형 | 설명
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| baseFeePerGas | String | 가스당 기본 수수료입니다. 이 값은 해당 블록 번호에 대해 EthTxTypeCompatibleBlock이 활성화된 경우에만 반환됩니다.                                          |
| blockScore | String | 블록체인 네트워크에서 채굴 난이도입니다. `blockScore`의 사용은 네트워크의 컨센서스와 다릅니다. BFT 합의 엔진에서는 항상 1입니다. |
| extraData | String | 이 블록의 "추가 데이터" 필드입니다.                                                                                                                        |
| gasUsed | String | 이 블록의 모든 트랜잭션에서 사용한 총 가스 양입니다.                                                                                            |
| governanceData | String | RLP로 인코딩된 거버넌스 구성 |
| hash | String | 블록의 해시. 보류 중인 블록인 경우 `null`.                                                                                                        |
| logsBloom | String | 블록의 로그에 대한 블룸 필터. 보류 중인 블록인 경우 `null`.                                                                               |
| number | String | 블록 번호입니다. 보류 중인 블록인 경우 `null`.                                                                                                         |
| parentHash | String | 부모 블록의 해시입니다.                                                                                                                                    |
| receiptsRoot | String | 블록의 영수증 시도 루트입니다.                                                                                                                  |
| reward | String | 블록 보상을 받은 수혜자의 주소입니다.                                                                                         |
| stateRoot | String | 블록의 최종 상태 검증 루트의 루트입니다.                                                                                                               |
| timestamp | String | 블록이 콜레이트된 시점의 유닉스 타임스탬프입니다.                                                                                                          |
| timestampFoS | String | 블록이 콜레이션된 시점에 대한 타임스탬프의 초 단위입니다.                                                                                   |
| transactionsRoot | String | 블록의 트랜잭션 시도 루트입니다.                                                                                                               |

**예시**

```javascript
> caver.rpc.klay.getHeaderByHash('0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3').then(console.log)
{
  baseFeePerGas: '0x0',
  blockScore: '0x1',
  extraData: '0xd8830...',
  gasUsed: '0x0',
  governanceData: '0x',
  hash: '0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3',
  logsBloom: '0x00000...',
  number: '0xbacd3',
  parentHash: '0xd6e36611a6722b94b8e4bb4d164755445409cf43aa5db0a5d4ae01e621c81ce7',
  receiptsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  reward: '0x30be91c80566da777d30e659b6746174ecc61576',
  stateRoot: '0xe75d808889451b1dac3d209e8cfbb2159ea6b2a080ce6081be775fb426f047a8',
  timestamp: '0x62201975',
  timestampFoS: '0x0',
  transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
}
```

## caver.rpc.klay.getBlock <a href="#caver-rpc-klay-getblock" id="caver-rpc-klay-getblock"></a>

```javascript
caver.rpc.klay.getBlock(blockNumberOrHash [, returnTransactionObjects] [, callback])
```

블록 해시 또는 블록 번호로 블록에 대한 정보를 반환합니다. 사용자가 블록 해시를 파라미터로 전달하면 [caver.rpc.klay.getBlockByHash](#caver-rpc-klay-getblockbyhash)가 호출되고, 블록 번호를 파라미터로 전달하면 [caver.rpc.klay.getBlockByNumber](#caver-rpc-klay-getblockbynumber)가 호출됩니다.

**매개변수**

| 이름 | 유형 | 설명
| ------------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockNumberOrHash | number \| string | 블록 해시, 숫자 또는 블록 태그 문자열입니다.                                                                                                                  |
| returnTransactionObjects | Boolean | (선택 사항, 기본값 `false`) `true`이면 반환된 블록에 모든 트랜잭션이 오브젝트로 포함되고, `false`이면 트랜잭션 해시만 포함됩니다. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다.                                                       |

**리턴 값**

`promise`는 `object`를 반환합니다.

| 유형 | 설명 |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | 블록 객체. 반환 값에 대한 자세한 설명은 [caver.rpc.klay.getBlockByHash](#caver-rpc-klay-getblockbyhash)를 참조하세요. |

**예시**

```javascript
> caver.rpc.klay.getBlock(1).then(console.log)
{
    baseFeePerGas: '0x0',
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
    voteData: '0x',
}
```

## caver.rpc.klay.getBlockByNumber <a href="#caver-rpc-klay-getblockbynumber" id="caver-rpc-klay-getblockbynumber"></a>

```javascript
caver.rpc.klay.getBlockByNumber(blockNumber [, returnTransactionObjects] [, callback])
```

블록 번호별로 블록에 대한 정보를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| ------------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockNumber | number \| string | 블록 번호 또는 문자열(`genesis` 또는 `latest`)로 태그된 블록입니다.                                                                             |
| returnTransactionObjects | Boolean | (선택 사항, 기본값 `false`) `true`이면 반환된 블록에 모든 트랜잭션이 오브젝트로 포함되고, `false`이면 트랜잭션 해시만 포함됩니다. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 파라미터로 오류 객체를 반환하고 두 번째 파라미터로 결과를 반환합니다.                                                       |

**리턴 값**

`promise`는 `object`를 반환합니다.

| 유형 | 설명 |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| object | 블록 오브젝트. 반환값에 대한 자세한 설명은 [caver.rpc.klay.getBlockByHash](#caver-rpc-klay-getblockbyhash)를 참고하세요. |

**예시**

```javascript
> caver.rpc.klay.getBlockByNumber(1).then(console.log)
{
    baseFeePerGas: '0x0',
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

## caver.rpc.klay.getBlockByHash <a href="#caver-rpc-klay-getblockbyhash" id="caver-rpc-klay-getblockbyhash"></a>

```javascript
caver.rpc.klay.getBlockByHash(blockHash [, returnTransactionObjects] [, callback])
```

`blockHash`를 사용하여 가장 최근 블록의 블록 번호를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| ------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash | String | 블록 해시입니다.                                                                                                                                                  |
| returnTransactionObjects | Boolean | (선택 사항, 기본값 `false`) `true`이면 반환된 블록에 모든 트랜잭션이 오브젝트로 포함되고, `false`이면 트랜잭션 해시만 포함됩니다. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 파라미터로 오류 객체를 반환하고 두 번째 파라미터로 결과를 반환합니다.                                                       |

**리턴 값**

`promise`는 `object`를 반환합니다 - 객체에는 블록이 포함됩니다:

| 이름 | 유형 | 설명
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| baseFeePerGas | String | 가스당 기본 수수료입니다. 이 값은 해당 블록 번호에 대해 EthTxTypeCompatibleBlock이 활성화된 경우에만 반환됩니다.                                          |
| blockScore | String | 블록체인 네트워크에서 채굴 난이도입니다. `blockScore`의 사용은 네트워크의 컨센서스와 다릅니다. BFT 합의 엔진에서는 항상 1입니다. |
| extraData | String | 이 블록의 "추가 데이터" 필드입니다.                                                                                                                        |
| gasUsed | String | 이 블록의 모든 트랜잭션에서 사용한 총 가스 양입니다.                                                                                            |
| governanceData | String | RLP로 인코딩된 거버넌스 구성 |
| hash | String | 블록의 해시. 보류 중인 블록인 경우 `null`.                                                                                                        |
| logsBloom | String | 블록의 로그에 대한 블룸 필터. 보류 중인 블록인 경우 `null`.                                                                               |
| number | String | 블록 번호입니다. 보류 중인 블록인 경우 `null`.                                                                                                         |
| parentHash | String | 부모 블록의 해시입니다.                                                                                                                                    |
| receiptsRoot | String | 블록의 영수증 시도 루트입니다.                                                                                                                  |
| reward | String | 블록 보상을 받은 수혜자의 주소입니다.                                                                                         |
| size | String | 이 블록의 크기(바이트)를 정수로 입력합니다.                                                                                                                     |
| stateRoot | String | 블록의 최종 상태 확인 시도 루트입니다.                                                                                                               |
| timestamp | String | 블록이 콜레이션된 시점의 유닉스 타임스탬프입니다.                                                                                                          |
| timestampFoS | String | 블록이 콜레이션된 시점에 대한 타임스탬프의 초 단위입니다.                                                                                   |
| totalBlockScore | String | 이 블록까지 체인의 총 블록스코어의 정수입니다.                                                                                               |
| transactions | Array | 트랜잭션 오브젝트 배열 또는 `returnTransactionObjects` 매개변수에 따라 32바이트 트랜잭션 해시입니다.                                           |
| transactionsRoot | String | 블록의 트랜잭션 시도 루트입니다.                                                                                                               |
| voteData | String | 제안자의 RLP 인코딩된 거버넌스 투표입니다.                                                                                                                 |

**예시**

```javascript
> caver.rpc.klay.getBlockByHash('0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b').then(console.log)
{
    baseFeePerGas: '0x0',
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

## caver.rpc.klay.getBlockReceipts <a href="#caver-rpc-klay-getblockreceipts" id="caver-rpc-klay-getblockreceipts"></a>

```javascript
caver.rpc.klay.getBlockReceipts(blockHash [, callback])
```

블록 해시로 식별된 블록에 포함된 영수증을 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| --------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| blockHash | String | 블록 해시입니다.                                                                                            |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `Array`를 반환합니다.

| 유형 | 설명 |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Array | 블록에 포함된 트랜잭션 영수증입니다. 대상 블록에 트랜잭션이 없는 경우 빈 배열 `[]`이 반환됩니다. 트랜잭션 영수증에 대한 자세한 설명은 [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt)를 참고하세요. |

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

## caver.rpc.klay.getBlockTransactionCountByNumber <a href="#caver-rpc-klay-getblocktransactioncountbynumber" id="caver-rpc-klay-getblocktransactioncountbynumber"></a>

```javascript
caver.rpc.klay.getBlockTransactionCountByNumber(blockNumber [, callback])
```

주어진 블록 번호와 일치하는 블록의 트랜잭션 수를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| blockNumber | number \| string | 블록 번호 또는 블록 태그 문자열(`genesis` 또는 `latest`).                                          |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | ----------------------------------------------------- |
| string | 주어진 블록의 트랜잭션 수(16진수)입니다. |

**예시**

```javascript
> caver.rpc.klay.getBlockTransactionCountByNumber(21249).then(console.log)
0x1
```

## caver.rpc.klay.getBlockTransactionCountByHash <a href="#caver-rpc-klay-getblocktransactioncountbyhash" id="caver-rpc-klay-getblocktransactioncountbyhash"></a>

```javascript
caver.rpc.klay.getBlockTransactionCountByHash(blockHash [, callback])
```

주어진 블록 해시와 일치하는 블록의 트랜잭션 수를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| --------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| blockHash | String | 블록 해시입니다.                                                                                            |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | ----------------------------------------------------- |
| string | 주어진 블록의 트랜잭션 수(16진수)입니다. |

**예시**

```javascript
> caver.rpc.klay.getBlockTransactionCountByHash('0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0').then(console.log)
0x1
```

## caver.rpc.klay.getBlockWithConsensusInfoByNumber <a href="#caver-rpc-klay-getblockwithconsensusinfobynumber" id="caver-rpc-klay-getblockwithconsensusinfobynumber"></a>

```javascript
caver.rpc.klay.getBlockWithConsensusInfoByNumber(blockNumber [, callback])
```

주어진 블록 번호와 일치하는 합의 정보가 포함된 블록을 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| blockNumber | number \| string | 블록 번호 또는 블록 태그 문자열(`genesis` 또는 `latest`).                                          |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`promise`는 `object`를 반환합니다.

| 유형 | 설명 |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| string | 합의 정보가 있는 블록을 포함하는 오브젝트입니다. 반환값에 대한 자세한 설명은 [caver.rpc.klay.getBlockWithConsensusInfoByHash](#caver-rpc-klay-getblockwithconsensusinfobyhash)를 참고하세요. |

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

## caver.rpc.klay.getBlockWithConsensusInfoByHash <a href="#caver-rpc-klay-getblockwithconsensusinfobyhash" id="caver-rpc-klay-getblockwithconsensusinfobyhash"></a>

```javascript
caver.rpc.klay.getBlockWithConsensusInfoByHash(blockHash [, callback])
```

주어진 해시와 일치하는 합의 정보가 포함된 블록을 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| --------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| blockHash | String | 블록 해시입니다.                                                                                            |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `object`를 반환합니다 - 합의 정보(제안자 및 위원회 멤버 목록)가 있는 블록 객체를 반환하거나 블록을 찾을 수 없는 경우 null을 반환합니다:

| 이름 | 유형 | 설명
| ---------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockScore | String | 이전 난이도. BFT 합의 엔진에서는 항상 1입니다.
| committee | Array | 이 블록의 위원회 멤버 주소 배열입니다. 위원회는 이 블록의 합의 프로토콜에 참여한 검증자의 하위 집합입니다. |
| extraData | String | 이 블록의 "추가 데이터" 필드입니다.                                                                                                                     |
| gasUsed | String | 이 블록의 모든 트랜잭션에서 사용한 가스 총량입니다.                                                                                         |
| governanceData | String | RLP로 인코딩된 거버넌스 구성 |
| hash | String | 블록의 해시. 보류 중인 블록인 경우 `null`.                                                                                                     |
| logsBloom | String | 블록의 로그에 대한 블룸 필터. 보류 중인 블록인 경우 `null`.                                                                            |
| number | String | 블록 번호입니다. 보류 중인 블록인 경우 `null`.                                                                                                      |
| originProposer | String | 동일한 블록 번호에서 0 라운드의 제안입니다.                                                                                                         |
| parentHash | String | 부모 블록의 해시입니다.                                                                                                                                 |
| proposer | String | 블록 제안자의 주소입니다.                                                                                                                        |
| receiptsRoot | String | 블록의 영수증 시도 루트입니다.                                                                                                               |
| reward | String | 블록 보상을 받은 수혜자의 주소입니다.                                                                                      |
| round | Number | 라운드 번호입니다.                                                                                                                                         |
| size | String | 이 블록의 크기(바이트)를 정수로 표시합니다.                                                                                                                  |
| stateRoot | String | 블록의 최종 상태 트라이의 루트입니다.                                                                                                            |
| timestamp | String | 블록이 콜레이션된 시점의 유닉스 타임스탬프입니다.                                                                                                       |
| timestampFoS | String | 블록이 콜레이션된 시점에 대한 타임스탬프의 초 단위입니다.                                                                                |
| totalBlockScore | String | 이 블록까지 체인의 총 블록스코어의 정수입니다.                                                                                            |
| transactions | Array | 트랜잭션 개체의 배열입니다.                                                                                                                             |
| transactionsRoot | String | 블록의 트랜잭션 시도 루트입니다.                                                                                                            |
| voteData | String | 제안자의 RLP 인코딩된 거버넌스 투표 |

**예시**

```javascript
> caver.rpc.klay.getBlockWithConsensusInfoByHash('0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0').then(console.log)
{
    blockscore: '0x1',
    committee: [ '0x571e5...', '0x5cb1a...', '0x99fb1...', '0xb74ff...' ],
    extraData: '0xd8830...',
    gasUsed: '0x3ea49',
    governanceData: '0x',
    hash: '0x188d4531d668ae3da20d70d4cb4c5d96a0cc5190771f0920c56b461c4d356566',
    logsBloom: '0x00000...',
    number: '0x3f79aa7',
    originProposer: '0x99fb17d324fa0e07f23b49d09028ac0919414db6',
    parentHash: '0x777d344c8c59c4d8d0041bb4c2ee66e95ec110303fb59d3e329f80e7a9c9c617',
    proposer: '0x99fb17d324fa0e07f23b49d09028ac0919414db6',
    receiptsRoot: '0xffbae3190f858531ff785bcbdc70278d91c3d9becdd8b134b0ab7974b9ef3641',
    reward: '0xb2bd3178affccd9f9f5189457f1cad7d17a01c9d',
    round: 0,
    size: '0x507',
    stateRoot: '0xa60d0868bd41b63b4fd67e5a8f801c5949e89a8994a13426747890b77d6bc0c4',
    timestamp: '0x610b3164',
    timestampFoS: '0xc',
    totalBlockScore: '0x3f79aa8',
    transactions: [
        {
            blockHash: '0x188d4531d668ae3da20d70d4cb4c5d96a0cc5190771f0920c56b461c4d356566',
            blockNumber: '0x3f79aa7',
            contractAddress: null,
            feePayer: '0xfee998d423d5bd2bf5b5c0f0acb4e3aae2bd2286',
            feePayerSignatures: [
                {
                    V: '0x7f5',
                    R: '0xf9aff6f39feb7a18d3e1b8ab9f590f0227e465c72cfe05e8d7c9e390cbf1d349',
                    S: '0x6e7317d121a3951a8cbca110be8cc86c5314349f8fb1c37f9af4cadf72fe89ec',
                },
            ],
            from: '0x11eb23f57151a88d4bb53cc9c27355437138c278',
            gas: '0x2dc6c0',
            gasPrice: '0x5d21dba00',
            gasUsed: '0x3ea49',
            input: '0x850ba...',
            logs: [
                {
                    address: '0x78ca9a1105c3392b56625f3fcfd149b29322c56f',
                    topics: [ '0xddf25...', '0x00000...', '0x00000...', '0x00000...' ],
                    data: '0x',
                    blockNumber: '0x3f79aa7',
                    transactionHash: '0x109d2836d9fde9d8081a27dd6ac545fd7a53530a56bdc40f2a11e5d6dbc2a09f',
                    transactionIndex: '0x0',
                    blockHash: '0x188d4531d668ae3da20d70d4cb4c5d96a0cc5190771f0920c56b461c4d356566',
                    logIndex: '0x0',
                    removed: false,
                },
            ],
            logsBloom: '0x00000...',
            nonce: '0x0',
            senderTxHash: '0xeca2d3650403a1e27af0bbe9878dcbb248d764fc88751f35a6e05636d2ad9e78',
            signatures: [
                {
                    V: '0x7f6',
                    R: '0x9ea78985b004afa86acd455c017da374ec1aec885f963ec8134a38f7ede451b0',
                    S: '0xfac0e417f7f7b15023e3f5ac95f1fb5b3280746a2eff04394ddedbdd259fc1',
                },
            ],
            status: '0x1',
            to: '0x78ca9a1105c3392b56625f3fcfd149b29322c56f',
            transactionHash: '0x109d2836d9fde9d8081a27dd6ac545fd7a53530a56bdc40f2a11e5d6dbc2a09f',
            transactionIndex: '0x0',
            type: 'TxTypeFeeDelegatedSmartContractExecution',
            typeInt: 49,
            value: '0x0',
        },
    ],
    transactionsRoot: '0x109d2836d9fde9d8081a27dd6ac545fd7a53530a56bdc40f2a11e5d6dbc2a09f',
    voteData: '0x',
}
```

## caver.rpc.klay.getCommittee <a href="#caver-rpc-klay-getcommittee" id="caver-rpc-klay-getcommittee"></a>

```javascript
caver.rpc.klay.getCommittee([blockNumber] [, callback])
```

지정된 블록에 있는 위원회의 모든 유효성 검사자 목록을 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| blockNumber | number \| string | (선택 사항) 블록 번호 또는 `latest` 또는 `earliest` 문자열입니다. 생략하면 `latest`이 사용됩니다.        |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `Array`를 반환합니다.

| 유형 | 설명 |
| ----- | ---------------------------------------------------------------- |
| Array | 주어진 블록에 있는 위원회의 모든 검증자 주소입니다. |

**예시**

```javascript
> caver.rpc.klay.getCommittee().then(console.log)
[
    '0xddc2002b729676dfd906484d35bb02a8634d7040',
    '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e'
]
```

## caver.rpc.klay.getCommitteeSize <a href="#caver-rpc-klay-getcommitteesize" id="caver-rpc-klay-getcommitteesize"></a>

```javascript
caver.rpc.klay.getCommitteeSize([blockNumber] [, callback])
```

지정된 블록에서 위원회의 크기를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| blockNumber | number \| string | (선택 사항) 블록 번호 또는 `latest` 또는 `earliest` 문자열입니다. 생략하면 `latest`이 사용됩니다.        |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `number`를 반환합니다.

| 유형 | 설명 |
| ------ | --------------------------------------------- |
| number | 주어진 블록의 위원회 규모입니다. |

**예시**

```javascript
> caver.rpc.klay.getCommitteeSize().then(console.log)
2
```

## caver.rpc.klay.getCouncil <a href="#caver-rpc-klay-getcouncil" id="caver-rpc-klay-getcouncil"></a>

```javascript
caver.rpc.klay.getCouncil([blockNumber] [, callback])
```

지정된 블록에 있는 카운슬의 모든 검증자 목록을 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| blockNumber | number \| string | (선택 사항) 블록 번호 또는 `latest` 또는 `earliest` 문자열입니다. 생략하면 `latest`이 사용됩니다.        |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `Array`를 반환합니다.

| 유형 | 설명 |
| ----- | ----------------------------------------------------------------------------------------------------- |
| Array | 지정된 블록에 있는 협의체의 유효성 검사기 주소 배열 또는 협의체를 찾을 수 없는 경우 null입니다. |

**예시**

```javascript
> caver.rpc.klay.getCouncil().then(console.log)
[
    '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e',
    '0xddc2002b729676dfd906484d35bb02a8634d7040'
]
```

## caver.rpc.klay.getCouncilSize <a href="#caver-rpc-klay-getcouncilsize" id="caver-rpc-klay-getcouncilsize"></a>

```javascript
caver.rpc.klay.getCouncilSize([blockNumber] [, callback])
```

지정된 블록에서 카운슬의 크기를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| blockNumber | number \| string | (선택 사항) 블록 번호 또는 `latest` 또는 `earliest` 문자열입니다. 생략하면 `latest`이 사용됩니다.        |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `number`를 반환합니다.

| 유형 | 설명 |
| ------ | ------------------------------------------- |
| number | 주어진 블록에서 카운슬의 크기입니다. |

**예시**

```javascript
> caver.rpc.klay.getCouncilSize().then(console.log)
2
```

## caver.rpc.klay.getStorageAt <a href="#caver-rpc-klay-getstorageat" id="caver-rpc-klay-getstorageat"></a>

```javascript
caver.rpc.klay.getStorageAt(address, position [, blockNumber] [, callback])
```

지정된 주소의 저장 위치에서 값을 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| ----------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address | String | 저장소를 가져올 주소입니다.                                                                                                                                                        |
| location | Number | 스토리지의 인덱스 위치입니다. '위치 계산'에 대한 자세한 내용은 [klay_getStorageAt](../../../../json-rpc/klay/block.md#klay_getstorageat)를 참고하세요. |
| blockNumber | number \| string | (선택 사항) 블록 번호 또는 `latest` 또는 `earliest` 문자열입니다. 생략하면 `latest`이 사용됩니다.                                                                                         |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개 변수로 오류 객체를 반환하고 두 번째 매개 변수로 결과를 반환합니다.                                                                                  |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | ----------------------------------- |
| string | 이 저장 위치의 값입니다. |

**예시**

```javascript
> caver.rpc.klay.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 0).then(console.log)
0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234
```

## caver.rpc.klay.isMinting <a href="#caver-rpc-klay-isminting" id="caver-rpc-klay-isminting"></a>

```javascript
caver.rpc.klay.isMinting([callback])
```

클라이언트가 새 블록을 활발하게 채굴하고 있으면 `true`를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| -------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환하는 선택적 콜백입니다. |

**리턴 값**

`Promise`는 `boolean`을 반환합니다 - 클라이언트가 마이닝 중이면 `true`을, 그렇지 않으면 `false`을 반환합니다.

**예시**

```javascript
> caver.rpc.klay.isMinting().then(console.log)
true
```

## caver.rpc.klay.isSyncing <a href="#caver-rpc-klay-issyncing" id="caver-rpc-klay-issyncing"></a>

```javascript
caver.rpc.klay.isSyncing([callback])
```

동기화 상태에 대한 데이터가 포함된 객체를 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 클레이튼 노드가 동기화되지 않는 경우 `object|boolean` - `false`를 반환합니다. 그렇지 않으면 동기화 객체가 반환됩니다:

| 이름 | 유형 | 설명 |
| ------------- | ------ | ----------------------------------------------------------- |
| startingBlock | String | 동기화가 시작된 블록 번호(16진수).             |
| currentBlock | String | 노드가 현재 동기화된 블록 번호(16진수)입니다. |
| highestBlock | String | 동기화할 예상 블록 번호(헥사)입니다.               |
| knownStates | String | 다운로드할 것으로 예상되는 상태(16진수)입니다.                    |
| pulledStates | String | 이미 다운로드한 상태(헥사)입니다.                       |

**예제**

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

## caver.rpc.klay.call <a href="#caver-rpc-klay-call" id="caver-rpc-klay-call"></a>

```javascript
caver.rpc.klay.call(callObject [, blockNumber] [, callback])
```

블록체인에 트랜잭션을 보내지 않고 즉시 새 메시지 호출을 실행합니다. 에러가 발생하면 데이터 또는 JSON RPC의 에러 객체를 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| callObject | Object | 트랜잭션 호출 오브젝트입니다. 객체의 속성은 다음 표를 참조하세요.                                 |
| blockNumber | number \| string | (선택 사항) 블록 번호 또는 `latest` 또는 `earliest` 문자열입니다. 생략하면 `latest`이 사용됩니다.        |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개 변수로 오류 객체를 반환하고 두 번째 매개 변수로 결과를 반환합니다. |

`callObject`에는 다음과 같은 속성이 있습니다:

| 이름 | 유형 | 설명 |
| -------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| to | String | (새 컨트랙트 배포를 테스트할 때 선택 사항) 트랜잭션이 전달되는 주소입니다.                                                |
| input | String | (선택 사항) 메서드 서명 및 인코딩된 매개변수의 해시입니다. [caver.abi.encodeFunctionCall](../caver.abi.md#encodefunctioncall)을 사용할 수 있습니다. |
| from | String | (선택 사항) 트랜잭션이 전송되는 주소입니다.                                                                                                |
| gas | String | (선택 사항) 트랜잭션 실행을 위해 제공되는 가스입니다. `klay_call`은 가스를 전혀 소비하지 않지만 일부 실행에는 이 매개변수가 필요할 수 있습니다.      |
| gasPrice | String | (선택 사항) 각 유료 가스에 사용되는 가스 가격입니다.                                                                                                     |
| value | String | (선택 사항) 이 트랜잭션과 함께 `peb`로 전송된 값입니다.                                                                                           |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | ------------------------------------------------------------------------------------- |
| string | 호출의 반환 데이터. 예: 스마트 컨트랙트 함수의 반환값. |

**예시**

```javascript
> caver.rpc.klay.call({ 
        to: '0x5481a10a47C74f800BDF4955BD77550881bde91C', // contract address
        input: '0x70a08231000000000000000000000000ddc2002b729676dfd906484d35bb02a8634d7040'
    }).then(console.log)
0x0000000000000000000000000000000000000000000000000de0b6b3a7640000
```

## caver.rpc.klay.estimateGas <a href="#caver-rpc-klay-estimategas" id="caver-rpc-klay-estimategas"></a>

```javascript
caver.rpc.klay.estimateGas(callObject [, blockNumber] [, callback])
```

트랜잭션을 완료하는 데 필요한 `gas`의 양에 대한 추정치를 생성하고 반환합니다. 이 메서드의 트랜잭션은 블록체인에 추가되지 않습니다.

**매개변수**

[caver.rpc.klay.call](#caver-rpc-klay-call) 매개변수 참조, 모든 속성은 선택 사항으로 예상됩니다.

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | ----------------------- |
| string | 사용된 가스 양입니다. |

**예시**

```javascript
> caver.rpc.klay.estimateGas({ 
        to: '0x5481a10a47C74f800BDF4955BD77550881bde91C', // contract address
        input: '0x095ea7b300000000000000000000000028e4e077686d1aeaf54a1313ff4841181056fe32000000000000000000000000000000000000000000000000000000000000000a'
    }).then(console.log)
0xb2a0
```

## caver.rpc.klay.estimateComputationCost <a href="#caver-rpc-klay-estimatecomputationcost" id="caver-rpc-klay-estimatecomputationcost"></a>

```javascript
caver.rpc.klay.estimateComputationCost(callObject [, blockNumber] [, callback])
```

트랜잭션을 실행하는 데 소요될 `계산 비용`의 추정치를 생성하고 반환합니다. 클레이튼은 한 트랜잭션에 너무 많은 시간이 걸리지 않도록 현재 트랜잭션의 계산 비용을 `100000000`으로 제한하고 있습니다. 해당 트랜잭션은 [caver.rpc.klay.estimateGas](#caver-rpc-klay-estimategas)처럼 블록체인에 추가되지 않습니다.

**매개변수**

[caver.rpc.klay.call](#caver-rpc-klay-call) 매개변수 참조, 모든 속성은 선택 사항으로 예상됩니다.

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | ------------------------------------ |
| string | 사용된 계산 비용의 양입니다. |

**예시**

```javascript
> caver.rpc.klay.estimateComputationCost({ 
        to: '0x5481a10a47C74f800BDF4955BD77550881bde91C', // contract address
        input: '0x095ea7b300000000000000000000000028e4e077686d1aeaf54a1313ff4841181056fe32000000000000000000000000000000000000000000000000000000000000000a'
    }).then(console.log)
0xd761
```

## caver.rpc.klay.getTransactionByBlockHashAndIndex <a href="#caver-rpc-klay-gettransactionbyblockhashandindex" id="caver-rpc-klay-gettransactionbyblockhashandindex"></a>

```javascript
caver.rpc.klay.getTransactionByBlockHashAndIndex(blockHash, index [, callback])
```

트랜잭션에 대한 정보를 `블록 해시`와 `트랜잭션 `index` 위치별로 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| blockHash | String | 블록 해시입니다.                                                                                            |
| index | Number | 블록 내 트랜잭션 인덱스 위치입니다.                                                             |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 파라미터로 오류 객체를 반환하고 두 번째 파라미터로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `object`를 반환합니다.

| 유형 | 설명 |
| ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| object | 트랜잭션 객체, 자세한 내용은 [caver.rpc.klay.getTransactionByHash](#caver-rpc-klay-gettransactionbyhash)를 참조하세요. |

**예제**

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

## caver.rpc.klay.getTransactionByBlockNumberAndIndex <a href="#caver-rpc-klay-gettransactionbyblocknumberandindex" id="caver-rpc-klay-gettransactionbyblocknumberandindex"></a>

```javascript
caver.rpc.klay.getTransactionByBlockNumberAndIndex(blockNumber, index [, callback])
```

트랜잭션의 `블록 번호`와 `트랜잭션 `index` 위치별 정보를 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| blockNumber | number \| string | 블록 번호 또는 블록 태그 문자열(`genesis` 또는 `latest`).                                          |
| index | Number | 블록 내 트랜잭션 인덱스 위치입니다.                                                             |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `object`를 반환합니다.

| 유형 | 설명 |
| ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| object | 트랜잭션 객체, 자세한 내용은 [caver.rpc.klay.getTransactionByHash](#caver-rpc-klay-gettransactionbyhash)를 참조하세요. |

**예제**

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

## caver.rpc.klay.getTransactionByHash <a href="#caver-rpc-klay-gettransactionbyhash" id="caver-rpc-klay-gettransactionbyhash"></a>

```javascript
caver.rpc.klay.getTransactionByHash(transactionHash [, callback])
```

트랜잭션 해시로 요청된 트랜잭션의 정보를 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| --------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transactionHash | String | 트랜잭션 해시입니다.                                                                                        |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 트랜잭션 객체인 `object`를 반환하거나 트랜잭션을 찾을 수 없는 경우 `null`을 반환합니다:

| 이름 | 유형 | 설명 |
| ------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| blockHash | String | 이 트랜잭션이 있던 블록의 해시입니다.                                                                                                                                                             |
| blockNumber | String | 이 트랜잭션이 있던 블록 번호입니다.                                                                                                                                                                  |
| codeFormat | String | (선택 사항) 스마트 컨트랙트 코드의 코드 형식입니다.                                                                                                                                                           |
| feePayer | String | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                                                                                         |
| feePayerSignatures | Array | (선택 사항) 수수료 납부자의 서명 객체 배열입니다. 서명 객체에는 세 개의 필드(V, R, S)가 포함됩니다. V에는 ECDSA 복구 ID가 포함됩니다. R에는 ECDSA 서명 r이 포함되고 S에는 ECDSA 서명 s가 포함됩니다. |
| feeRatio | String | (선택 사항) 수수료 납부자의 수수료 비율입니다. 30이면 수수료의 30%는 수수료 납부자가 지불합니다. 70이면 발신자가 70%를 지불합니다.                                                                            |
| from | String | 발신자의 주소입니다.                                                                                                                                                                                       |
| gas | String | 발신자가 제공한 가스.                                                                                                                                                                                  |
| gasPrice | String | 발신자가 제공한 가스 가격(단위: 원화).                                                                                                                                                                     |
| hash | String | 트랜잭션의 해시입니다.                                                                                                                                                                                     |
| humanReadable | Boolean | (선택 사항) 주소가 사람이 읽을 수 있는 경우 `true`, 주소가 사람이 읽을 수 없는 경우 `false`.                                                                                                              |
| key | String | (선택 사항) 클레이튼 계정의 계정키를 업데이트하는 데 사용되는 RLP 인코딩된 계정키입니다. 자세한 내용은 [AccountKey](../../../../../learn/accounts.md#account-key)를 참고하세요.                               |
| input | String | (선택 사항) 트랜잭션과 함께 전송된 데이터입니다.                                                                                                                                                         |
| nonce | String | 이 트랜잭션 이전에 발신자가 수행한 트랜잭션의 수입니다.                                                                                                                                             |
| senderTxHash | String | (선택 사항) 수수료 납부자의 주소와 서명이 없는 트랜잭션의 해시입니다. 이 값은 수수료 위임이 아닌 트랜잭션의 `hash` 값과 항상 동일합니다.                                            |
| signatures | Array | 서명 객체의 배열입니다. 서명 객체에는 세 개의 필드(V, R, S)가 포함됩니다. V에는 ECDSA 복구 ID가 포함됩니다. R에는 ECDSA 서명 r이 포함되고 S에는 ECDSA 서명 s가 포함됩니다.                        |
| to | String | 수신자의 주소. 컨트랙트 배포 트랜잭션인 경우 `null`.                                                                                                                                 |
| transactionIndex | String | 블록에서 트랜잭션 인덱스 위치의 정수입니다.                                                                                                                                                      |
| type | String | 트랜잭션의 유형을 나타내는 문자열입니다.                                                                                                                                                           |
| typeInt | Number | 트랜잭션 유형을 나타내는 정수입니다.                                                                                                                                                         |
| value | String | peb로 전송된 값입니다.                                                                                                                                                                                    |

트랜잭션이 아직 처리되지 않은 `pending` 상태인 경우, `blockHash`, `blockNumber`, `transactionIndex`에 대한 기본값이 반환됩니다. 아래 예시를 참조하세요.

**예제**

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

## caver.rpc.klay.getTransactionBySenderTxHash <a href="#caver-rpc-klay-gettransactionbysendertxhash" id="caver-rpc-klay-gettransactionbysendertxhash"></a>

```javascript
caver.rpc.klay.getTransactionBySenderTxHash(senderTxHash [, callback])
```

발신자 트랜잭션 해시로 요청한 트랜잭션에 대한 정보를 반환합니다.

이 API는 노드에서 인덱싱 기능이 `--sendertxhashindexing`으로 활성화된 경우에만 올바른 결과를 반환한다는 점에 유의하시기 바랍니다. [caver.rpc.klay.isSenderTxHashIndexingEnabled](#caver-rpc-klay-issendertxhashindexingenabled)를 사용하여 인덱싱 기능 활성화 여부를 확인하시기 바랍니다.

**파라미터**

| 이름 | 유형 | 설명 |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| senderTxHash | String | 발신자 트랜잭션 해시입니다. 자세한 내용은 [SenderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash)를 참조하세요. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다.                |

**리턴 값**

`Promise`는 `object`를 반환합니다.

| 유형 | 설명 |
| ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| object | 트랜잭션 객체, 자세한 내용은 [caver.rpc.klay.getTransactionByHash](#caver-rpc-klay-gettransactionbyhash)를 참조하세요. |

**예제**

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

## caver.rpc.klay.getTransactionReceipt <a href="#caver-rpc-klay-gettransactionreceipt" id="caver-rpc-klay-gettransactionreceipt"></a>

```javascript
caver.rpc.klay.getTransactionReceipt(transactionHash [, callback])
```

트랜잭션 해시별로 트랜잭션 영수증을 반환합니다.

**참고** 트랜잭션이 아직 처리되지 않은 `pending` 트랜잭션은 영수증을 사용할 수 없습니다.

**매개변수**

| 이름 | 유형 | 설명 |
| --------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transactionHash | String | 트랜잭션 해시입니다.                                                                                        |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `object`를 반환합니다 - 트랜잭션 영수증 객체를 반환하거나, 영수증을 찾을 수 없는 경우 `null`을 반환합니다:

| 이름 | 유형 | 설명 |
| ------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash | String | 이 트랜잭션이 있던 블록의 해시입니다.                                                                                                                                                                                        |
| blockNumber | String | 트랜잭션이 있던 블록 번호입니다.                                                                                                                                                                                             |
| codeFormat | String | (선택 사항) 스마트 컨트랙트 코드의 코드 형식입니다.                                                                                                                                                                                      |
| contractAddress | String | 트랜잭션이 컨트랙트 생성인 경우 생성된 컨트랙트 주소, 그렇지 않으면 `null`입니다.                                                                                                                                             |
| effectiveGasPrice | String | 발신자에게서 공제된 가스당 실제 값입니다. 마그마 하드포크 이전에는 이 값이 트랜잭션의 가스 가격과 같았습니다. 마그마 하드포크 이후에는 블록 헤더의 `baseFee` 값과 동일합니다.               |
| feePayer | String | (선택 사항) 수수료 납부자의 주소입니다.                                                                                                                                                                                                    |
| feePayerSignatures | Array | (선택 사항) 수수료 납부자의 서명 객체 배열입니다. 서명 객체에는 세 개의 필드(V, R, S)가 포함됩니다. V에는 ECDSA 복구 ID가 포함됩니다. R에는 ECDSA 서명 r이 포함되고 S에는 ECDSA 서명 s가 포함됩니다.                            |
| feeRatio | String | (선택 사항) 수수료 납부자의 수수료 비율입니다. 30이면 수수료의 30%는 수수료 납부자가 지불합니다. 70이면 발신자가 70%를 지불합니다.                                                                                                       |
| from | String | 발신자의 주소입니다.                                                                                                                                                                                                                  |
| gas | String | 발신자가 제공한 가스.                                                                                                                                                                                                             |
| gasPrice | String | 발신자가 제공한 가스 가격(단위: 원화).                                                                                                                                                                                                |
| gasUsed | String | 이 특정 트랜잭션에서만 사용한 가스 양입니다.                                                                                                                                                                              |
| humanReadable | Boolean | (선택 사항) 주소가 사람이 읽을 수 있는 주소인 경우 `true`, 사람이 읽을 수 없는 주소인 경우 `false`.                                                                                                                                         |
| key | String | (선택 사항) 클레이튼 계정의 계정키를 업데이트하는 데 사용되는 RLP 인코딩된 계정키입니다.                                                                                                                                                    |
| input | String | (선택 사항) 트랜잭션과 함께 전송된 데이터입니다.                                                                                                                                                                                    |
| logs | Array | 이 트랜잭션이 생성한 로그 객체의 배열입니다.                                                                                                                                                                                 |
| logsBloom | String | 라이트 클라이언트가 관련 로그를 빠르게 검색할 수 있는 블룸 필터입니다.                                                                                                                                                                        |
| nonce | String | 이 트랜잭션 이전에 발신자가 만든 트랜잭션의 수입니다.                                                                                                                                                                        |
| senderTxHash       | string| 보낸 사람만 서명한 트랜잭션의 해시(선택 사항). [SenderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash)를 참조하세요. 이 값은 수수료 위임이 아닌 트랜잭션의 경우 항상 '트랜잭션 해시'와 동일합니다. |
| signatures | Array | 서명 개체의 배열입니다. 서명 객체에는 세 개의 필드(V, R, S)가 포함됩니다. V에는 ECDSA 복구 ID가 포함됩니다. R에는 ECDSA 서명 r이 포함되고 S에는 ECDSA 서명 s가 포함됩니다.                                                   |
| status | String | 트랜잭션이 성공했다면 `0x1`, Klaytn 가상 머신이 트랜잭션을 되돌렸다면 `0x0`입니다.                                                                                                                                  |
| txError | String | (선택 사항) `status`가 `0x0`일 경우 상세 오류 코드.                                                                                                                                                                           |
| to | String | 수신자의 주소. 컨트랙트 생성 트랜잭션인 경우 `null`.                                                                                                                                                             |
| transactionHash | String | 트랜잭션의 해시입니다.                                                                                                                                                                                                                |
| transactionIndex | String | 블록에서 트랜잭션 인덱스 위치의 정수입니다.                                                                                                                                                                                 |
| type | String | 트랜잭션의 유형을 나타내는 문자열입니다.                                                                                                                                                                                      |
| typeInt | Number | 트랜잭션 유형을 나타내는 정수입니다.                                                                                                                                                                                    |
| value | String | peb로 전송된 값입니다.                                                                                                                                                                                                               |

**참고** `effectiveGasPrice`는 caver-js [v1.9.0](https://www.npmjs.com/package/caver-js/v/1.9.0) 부터 지원됩니다.

**예제**

```javascript
// Before the Magma hard fork
> caver.rpc.klay.getTransactionReceipt('0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898').then(console.log)
{
    blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
    blockNumber: '0xb7',
    contractAddress: null,
    effectiveGasPrice: '0x5d21dba00',
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

// After the Magma hard fork
> caver.rpc.klay.getTransactionReceipt('0xf0554493c273352eac667eb30a1b70fffa8e8a0f682928b31baaceccc17c64b9').then(console.log)
{
  blockHash: '0xaa358681023db9d967ff44577a34aea487c37433ebf6ef349baee50f9d1d2f03',
  blockNumber: '0x99',
  contractAddress: null,
  effectiveGasPrice: '0x5d21dba00',
  from: '0xca7a99380131e6c76cfa622396347107aeedca2d',
  gas: '0x61a8',
  gasPrice: '0xba43b7400',
  gasUsed: '0x5208',
  logs: [],
  logsBloom: '0x00000...',
  nonce: '0x2',
  senderTxHash: '0xf0554493c273352eac667eb30a1b70fffa8e8a0f682928b31baaceccc17c64b9',
  signatures: [ { V: '0x1cb4c6', R: '0x1605e...', S: '0x459cf...' } ],
  status: '0x1',
  to: '0x08ef5d2def29ff4384dd93a73e076d959abbd2f4',
  transactionHash: '0xf0554493c273352eac667eb30a1b70fffa8e8a0f682928b31baaceccc17c64b9',
  transactionIndex: '0x0',
  type: 'TxTypeValueTransfer',
  typeInt: 8,
  value: '0xde0b6b3a7640000'
}
```

## caver.rpc.klay.getTransactionReceiptBySenderTxHash <a href="#caver-rpc-klay-gettransactionreceiptbysendertxhash" id="caver-rpc-klay-gettransactionreceiptbysendertxhash"></a>

```javascript
caver.rpc.klay.getTransactionReceiptBySenderTxHash(senderTxHash [, callback])
```

발신자 트랜잭션 해시별 트랜잭션 영수증을 반환합니다.

이 API는 노드에서 인덱싱 기능이 `--sendertxhashindexing`으로 활성화된 경우에만 올바른 결과를 반환한다는 점에 유의하시기 바랍니다. [caver.rpc.klay.isSenderTxHashIndexingEnabled](#caver-rpc-klay-issendertxhashindexingenabled)를 통해 인덱싱 기능의 활성화 여부를 확인하시기 바랍니다.

**참고** 트랜잭션이 아직 처리되지 않은 `pending` 트랜잭션은 영수증을 받을 수 없습니다.

**매개변수**

| 이름 | 유형 | 설명 |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| senderTxHash | String | 발신자 트랜잭션 해시입니다. 자세한 내용은 [SenderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash)를 참조하세요. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다.                |

**리턴 값**

`Promise`는 `object`를 반환합니다.

| 유형 | 설명 |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| object | 트랜잭션 영수증 객체, 자세한 내용은 [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt)를 참조하세요. |

**예시**

```javascript
> caver.rpc.klay.getTransactionReceiptBySenderTxHash('0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898').then(console.log)
{
    blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
    blockNumber: '0xb7',
    contractAddress: null,
    effectiveGasPrice: '0x5d21dba00',
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

## caver.rpc.klay.sendRawTransaction <a href="#caver-rpc-klay-sendrawtransaction" id="caver-rpc-klay-sendrawtransaction"></a>

```javascript
caver.rpc.klay.sendRawTransaction(signedTransaction [, callback])
```

`서명된 트랜잭션`을 클레이튼에 보냅니다.

`signedTransaction` 매개변수는 "RLP 인코딩된 서명된 트랜잭션"이 될 수 있습니다. 서명된 트랜잭션의 RLP 인코딩된 트랜잭션은 `transaction.getRLPEncoding`을 사용하여 얻을 수 있습니다. 편의를 위해 `caver.rpc.klay.sendRawTransaction`은 "서명된 트랜잭션 인스턴스"를 파라미터로 받습니다.

**파라미터**

| 이름 | 유형 | 설명 |
| ----------------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| signedTransaction | string \| object | RLP 인코딩된 서명된 트랜잭션 또는 서명된 트랜잭션의 인스턴스입니다.                                     |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

| 유형 | 설명 |
| ---------- | ---------------------------------------------------------------------------------------------- |
| PromiEvent | 프로미스 결합 이벤트 이미터입니다. 트랜잭션 영수증을 사용할 수 있을 때 해결됩니다. |

PromiEvent의 경우 다음 이벤트를 사용할 수 있습니다:

* `transactionHash`는 `string`을 반환합니다: 트랜잭션이 전송되고 트랜잭션 해시를 사용할 수 있는 직후에 발생합니다.
* `receipt`은 `object`를 반환합니다: 트랜잭션 영수증을 사용할 수 있을 때 발생합니다. 자세한 내용은 [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt)를 참고하세요.
* `error`는 `Error`를 반환합니다: 전송 중 에러가 발생하면 발생합니다. 가스 부족 에러의 경우 두 번째 파라미터는 영수증입니다.

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

## caver.rpc.klay.sendTransaction <a href="#caver-rpc-klay-sendtransaction" id="caver-rpc-klay-sendtransaction"></a>

```javascript
caver.rpc.klay.sendTransaction(transaction [, callback])
```

클레이튼 노드에서 "가져온 계정의 개인키"를 사용하여 트랜잭션 `sender`로 트랜잭션에 서명하고 트랜잭션을 클레이튼에 전파합니다.

각 트랜잭션 유형에 대한 자세한 내용은 [트랜잭션](../caver-transaction/caver-transaction.md#class)을 참고하세요.

**참고**: 이 API는 클레이튼 노드에서 [가져온 계정](../../../../json-rpc/personal.md#personal_importrawkey)을 사용하여 트랜잭션에 서명하는 기능을 제공합니다. 트랜잭션에 서명하려면 노드에서 가져온 계정이 [잠금해제](../../../../json-rpc/personal.md#personal_unlockaccount) 상태여야 합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transaction | Object | 클레이튼에 전송할 트랜잭션의 인스턴스입니다.                                                     |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 파라미터로 에러 객체를 반환하고 두 번째 파라미터로 결과를 반환합니다. |

**리턴 값**

| 유형 | 설명 |
| ---------- | ---------------------------------------------------------------------------------------------- |
| PromiEvent | 프로미스 결합 이벤트 이미터입니다. 트랜잭션 영수증을 사용할 수 있을 때 해결됩니다. |

PromiEvent의 경우 다음 이벤트를 사용할 수 있습니다:

* `transactionHash`는 `string`을 반환합니다: 트랜잭션이 전송되고 트랜잭션 해시를 사용할 수 있는 직후에 발생합니다.
* `receipt`은 `object`를 반환합니다: 트랜잭션 영수증을 사용할 수 있을 때 발생합니다. 자세한 내용은 [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt)를 참고하세요.
* `error`는 `Error`를 반환합니다: 전송 중 에러가 발생하면 발생합니다. 가스 부족 에러의 경우 두 번째 파라미터는 영수증입니다.

**예시**

```javascript
> const tx = caver.transaction.valueTransfer.create({
    from: '0x{address in hex}', // The address of imported account in Klaytn Node
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    value: caver.utils.convertToPeb(10, 'KLAY'),
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

## caver.rpc.klay.sendTransactionAsFeePayer <a href="#caver-rpc-klay-sendtransactionasfeepayer" id="caver-rpc-klay-sendtransactionasfeepayer"></a>

```javascript
caver.rpc.klay.sendTransactionAsFeePayer(transaction [, callback])
```

클레이튼 노드에서 '가져온 계정의 개인키'로 수수료 위임 트랜잭션을 트랜잭션 `fee payer`로 서명하고 트랜잭션을 클레이튼에 전파합니다.

수수료 납부자로 `sendTransaction`을 사용하기 전에 트랜잭션 발신자가 유효한 서명으로 서명해야 하며 `nonce`가 정의되어 있어야 합니다.

각 트랜잭션 유형에 대한 자세한 내용은 [트랜잭션](../caver-transaction/caver-transaction.md#class)을 참조하세요.

**참고**: 이 API는 클레이튼 노드에서 [가져온 계정](../../../../json-rpc/personal.md#personal_importrawkey)을 사용하여 트랜잭션에 서명하는 기능을 제공합니다. 트랜잭션에 서명하려면 노드에서 가져온 계정이 [잠금해제](../../../../json-rpc/personal.md#personal_unlockaccount) 상태여야 합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transaction | Object | 클레이튼에 전송할 수수료 위임 트랜잭션의 인스턴스입니다.                                            |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

| 유형 | 설명 |
| ---------- | ---------------------------------------------------------------------------------------------- |
| PromiEvent | 프로미스 결합 이벤트 이미터입니다. 트랜잭션 영수증을 사용할 수 있을 때 해결됩니다. |

PromiEvent의 경우 다음 이벤트를 사용할 수 있습니다:

* `transactionHash`는 `string`을 반환합니다: 트랜잭션이 전송되고 트랜잭션 해시를 사용할 수 있는 직후에 발생합니다.
* `receipt`은 `object`를 반환합니다: 트랜잭션 영수증을 사용할 수 있을 때 발생합니다. 자세한 내용은 [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt)를 참고하세요.
* `error`는 `Error`를 반환합니다: 전송 중 에러가 발생하면 발생합니다. 가스 부족 에러의 경우 두 번째 파라미터는 영수증입니다.

**예시**

```javascript
> const tx = caver.transaction.feeDelegatedValueTransfer.create({
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

## caver.rpc.klay.signTransaction <a href="#caver-rpc-klay-signtransaction" id="caver-rpc-klay-signtransaction"></a>

```javascript
caver.rpc.klay.signTransaction(transaction [, callback])
```

클레이튼 노드에서 "가져온 계정의 개인키"를 사용하여 트랜잭션 발신자로 트랜잭션에 서명합니다.

각 트랜잭션 유형에 대한 자세한 내용은 [트랜잭션](../caver-transaction/caver-transaction.md#class)을 참고하세요.

**참고**: 이 API는 클레이튼 노드에서 [가져온 계정](../../../../json-rpc/personal.md#personal_importrawkey)을 사용하여 트랜잭션에 서명하는 기능을 제공합니다. 트랜잭션에 서명하려면 노드에서 가져온 계정이 [잠금해제](../../../../json-rpc/personal.md#personal_unlockaccount) 상태여야 합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transaction | Object | 서명할 트랜잭션의 인스턴스입니다.                                                                      |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `object`를 반환합니다 - 객체에는 서명된 트랜잭션이 포함됩니다:

| 이름 | 유형 | 설명 |
| ---- | ------ | -------------------------------------------------------- |
| raw | String | RLP 인코딩된 서명된 트랜잭션입니다.                        |
| tx | Object | 발신자의 서명을 포함한 트랜잭션 객체입니다. |

**예시**

```javascript
> const tx = caver.transaction.valueTransfer.create({
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

## caver.rpc.klay.signTransactionAsFeePayer <a href="#caver-rpc-klay-signtransactionasfeepayer" id="caver-rpc-klay-signtransactionasfeepayer"></a>

```javascript
caver.rpc.klay.signTransactionAsFeePayer(transaction [, callback])
```

클레이튼 노드에서 "가져온 계정의 개인키"를 사용하여 트랜잭션 수수료 납부자로 트랜잭션에 서명합니다.

각 트랜잭션 유형에 대한 자세한 내용은 [트랜잭션](../caver-transaction/caver-transaction.md#class)을 참고하세요.

**참고**: 이 API는 클레이튼 노드에서 [가져온 계정](../../../../json-rpc/personal.md#personal_importrawkey)을 사용하여 트랜잭션에 서명하는 기능을 제공합니다. 트랜잭션에 서명하려면 노드에서 가져온 계정이 [잠금해제](../../../../json-rpc/personal.md#personal_unlockaccount) 상태여야 합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transaction | Object | 서명할 트랜잭션의 인스턴스입니다.                                                                      |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `object`를 반환합니다 - 객체에는 서명된 트랜잭션이 포함됩니다:

| 이름 | 유형 | 설명 |
| ---- | ------ | -------------------------------------------- |
| raw | String | RLP 인코딩된 서명된 트랜잭션입니다.            |
| tx | Object | 수수료 납부자로 서명할 트랜잭션 객체입니다. |

**예시**

```javascript
> const tx = caver.transaction.feeDelegatedValueTransfer.craete({
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

## caver.rpc.klay.getDecodedAnchoringTransactionByHash <a href="#caver-rpc-klay-getdecodedanchoringtransactionbyhash" id="caver-rpc-klay-getdecodedanchoringtransactionbyhash"></a>

```javascript
caver.rpc.klay.getDecodedAnchoringTransactionByHash(transactionHash [, callback])
```

주어진 트랜잭션 해시에 대해 트랜잭션에서 디코딩된 앵커링 데이터를 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| --------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| transactionHash | String | 트랜잭션 해시입니다.                                                                                        |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `object`를 반환합니다 - 객체에는 디코딩된 앵커 데이터가 포함됩니다:

| 이름 | 유형 | 설명 |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash | String | 이 앵커링 트랜잭션이 수행된 자식 체인 블록의 해시입니다.                                                                                                                                                           |
| blockNumber | Number | 앵커링 트랜잭션이 수행된 차일드 체인 블록 번호입니다.                                                                                                                                                            |
| ParentHash | String | 부모 블록의 해시입니다.                                                                                                                                                                                                              |
| TxHash | String | 블록의 트랜잭션 시도 루트입니다.                                                                                                                                                                                         |
| StateRootHash | String | 블록의 최종 상태 시도 루트의 해시입니다.                                                                                                                                                                                         |
| ReceiptHash | String | 블록의 영수증 트라이의 루트입니다.                                                                                                                                                                                            |
| BlockCount | Number | 이 앵커링 기간 동안 생성된 블록의 수입니다. 이 트랜잭션이 앵커링을 켠 후 첫 번째 앵커링 트랜잭션인 경우를 제외하고 대부분의 경우 이 숫자는 차일드 체인의 `SC_TX_PERIOD`와 동일합니다. |
| TxCount | Number | 이 앵커링 기간 동안 자식 체인에서 생성된 트랜잭션의 수입니다.                                                                                                                                                  |

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

## caver.rpc.klay.getChainId <a href="#caver-rpc-klay-getchainid" id="caver-rpc-klay-getchainid"></a>

```javascript
caver.rpc.klay.getChainId([callback])
```

체인의 체인 ID를 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 파라미터로 오류 객체를 반환하고 두 번째 파라미터로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | -------------------------- |
| string | 체인의 체인 ID입니다. |

**예시**

```javascript
> caver.rpc.klay.getChainId().then(console.log)
0x2710
```

## caver.rpc.klay.getClientVersion <a href="#caver-rpc-klay-getclientversion" id="caver-rpc-klay-getclientversion"></a>

```javascript
caver.rpc.klay.getClientVersion([callback])
```

클레이튼 노드의 현재 클라이언트 버전을 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 파라미터로 오류 객체를 반환하고 두 번째 파라미터로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | -------------------------------------------- |
| string | 클레이튼 노드의 현재 클라이언트 버전입니다. |

**예시**

```javascript
> caver.rpc.klay.getClientVersion().then(console.log)
Klaytn/v1.3.0+144494d2aa/linux-amd64/go1.13.1
```

## caver.rpc.klay.getGasPrice <a href="#caver-rpc-klay-getgasprice" id="caver-rpc-klay-getgasprice"></a>

```javascript
caver.rpc.klay.getGasPrice([callback])
```

현재 가스당 가격을 peb 단위로 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | ----------------------------- |
| string | 현재 가스 가격(peb)입니다. |

**예시**

```javascript
> caver.rpc.klay.getGasPrice().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getGasPriceAt <a href="#caver-rpc-klay-getgaspriceat" id="caver-rpc-klay-getgaspriceat"></a>

```javascript
caver.rpc.klay.getGasPriceAt([blockNumber] [, callback])
```

주어진 블록의 현재 가스당 가격을 peb 단위로 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| blockNumber | Number | (선택 사항) 블록 번호입니다. 생략하면 최신 단가가 반환됩니다.                           |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | ----------------------------- |
| string | 현재 가스 가격(peb)입니다. |

**예시**

```javascript
> caver.rpc.klay.getGasPriceAt().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getMaxPriorityFeePerGas <a href="#caver-rpc-klay-getmaxpriorityfeepergas" id="caver-rpc-klay-getmaxpriorityfeepergas"></a>

```javascript
caver.rpc.klay.getMaxPriorityFeePerGas([callback])
```

동적 수수료 트랜잭션에 대해 제안된 가스 팁 상한을 peb 단위로 반환합니다. 클레이튼은 가스 가격이 고정되어 있으므로 클레이튼에서 설정한 가스 가격을 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | --------------------------------- |
| string | 제안된 가스 팁 상한(peb 단위)입니다. |

**예시**

```javascript
> caver.rpc.klay.getMaxPriorityFeePerGas().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getLowerBoundGasPrice <a href="#caver-rpc-klay-getlowerboundgasprice" id="caver-rpc-klay-getlowerboundgasprice"></a>

```javascript
caver.rpc.klay.getLowerBoundGasPrice([callback])
```

하한 가스 가격을 peb 단위로 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | --------------------------------- |
| string | 하한 가스 가격(peb)입니다. |

**예시**

```javascript
> caver.rpc.klay.getLowerBoundGasPrice().then(console.log)
0x5d21dba00
```

## caver.rpc.klay.getUpperBoundGasPrice <a href="#caver-rpc-klay-getupperboundgasprice" id="caver-rpc-klay-getupperboundgasprice"></a>

```javascript
caver.rpc.klay.getUpperBoundGasPrice([callback])
```

상한 가스 가격을 peb 단위로 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | --------------------------------- |
| string | 상한 가스 가격(peb)입니다. |

**예시**

```javascript
> caver.rpc.klay.getUpperBoundGasPrice().then(console.log)
0xae9f7bcc00
```

## caver.rpc.klay.getFeeHistory <a href="#caver-rpc-klay-getfeehistory" id="caver-rpc-klay-getfeehistory"></a>

```javascript
caver.rpc.klay.getFeeHistory(blockCount, lastBlock, rewardPercentiles [, callback])
```

반환된 블록 범위에 대한 수수료 내역을 반환합니다. 모든 블록을 사용할 수 없는 경우 요청된 범위의 하위 섹션이 될 수 있습니다.

**파라미터**

| 이름 | 유형 | 설명 |
| ----------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockCount | number\|BigNumber\|BN\|string | 요청된 범위의 블록 수입니다. 한 번의 쿼리로 1~1024개의 블록을 요청할 수 있습니다. 모든 블록을 사용할 수 없는 경우 요청된 것보다 적은 블록이 반환될 수 있습니다.                                                                     |
| lastBlock | number\|BigNumber\|BN\|string | 요청된 범위에서 가장 높은 번호의 블록(또는 블록 태그 문자열).                                                                                                                                                                              |
| rewardPercentiles | Array | 각 블록의 가스당 유효 우선권 수수료에서 오름차순으로 샘플링할 백분위수 값의 단조롭게 증가하는 목록으로, 사용된 가스에 따라 가중치를 부여합니다. (예: `['0', '25', '50', '75', '100']` 또는 `['0', '0.5', '1', '1.5', '3', '80']`) |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다.                                                                                                                                      |

**리턴 값**

`Promise`는 `object`를 반환합니다 - 객체에는 수수료 내역이 포함됩니다:

| 이름 | 유형 | 설명 |
| ------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| oldestBlock | String | 반환된 범위의 가장 낮은 숫자 블록.                                                                                                                                                                          |
| reward | Array | 요청된 블록 백분위수에서 가스당 유효 우선순위 수수료의 2차원 배열입니다.                                                                                                                  |
| baseFeePerGas | Array | 가스당 블록 기본 수수료의 배열입니다. 이 값은 최신 블록에서 파생될 수 있으므로 반환된 범위 중 가장 최신 블록 이후의 다음 블록이 포함됩니다. EIP-1559 이전 블록에 대해서는 0이 반환됩니다. |
| gasUsedRatio | Array | 블록의 가스 사용량/가스 한도의 배열입니다.                                                                                                                                                                      |

**예제**

```javascript
> caver.rpc.klay.getFeeHistory(3, 'latest', [0.1, 0.2, 0.3]).then(console.log)
{
  oldestBlock: '0xbb701',
  reward: [
    [ '0x0', '0x0', '0x0' ],
    [ '0x5d21dba00', '0x5d21dba00', '0x5d21dba00' ],
    [ '0x0', '0x0', '0x0' ]
  ],
  baseFeePerGas: [ '0x0', '0x0', '0x0', '0x0' ],
  gasUsedRatio: [ 0, 2.1000000000021e-8, 0 ]
}
```

## caver.rpc.klay.createAccessList <a href="#caver-rpc-klay-createaccesslist" id="caver-rpc-klay-createaccesslist"></a>

```javascript
caver.rpc.klay.createAccessList(txCallObject [, callback])
```

이 메서드는 주어진 트랜잭션을 기반으로 accessList를 생성합니다. 액세스 리스트에는 발신자 계정과 사전 컴파일을 제외한 트랜잭션이 읽고 쓴 모든 스토리지 슬롯과 주소가 포함됩니다. 이 메서드는 `caver.rpc.klay.call`과 동일한 트랜잭션 호출 객체와 블록넘버오르태그 객체를 사용합니다. 가스비 증가로 인해 접근이 불가능해진 스테이킹된 컨트랙트를 해제하는 데 accessList를 사용할 수 있습니다. 트랜잭션에 액세스 목록을 추가한다고 해서 액세스 목록이 없는 트랜잭션에 비해 가스 사용량이 감소하는 것은 아닙니다.

**매개변수**

| 이름 | 유형 | 설명 |
| -------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| callObject | Object | 트랜잭션 호출 오브젝트. [caver.rpc.klay.call](#caver-rpc-klay-call) 파라미터를 참조하세요.                      |
| blockParameter | number\|BigNumber\|BN\|string | (선택 사항) 블록 번호, 블록 해시 또는 블록 태그 문자열(`latest` 또는 `earliest`). 생략하면 `latest`이 사용됩니다. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다.                |

**리턴 값**

`Promise`는 `object`를 반환합니다 - 객체에는 액세스 목록이 포함됩니다:

| 이름 | 유형 | 설명 |
| ------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| oldestBlock | String | 반환된 범위의 최하위 숫자 블록.                                                                                                                                                                          |
| reward | Array | 요청된 블록 백분위수에서 가스당 유효 우선순위 수수료의 2차원 배열입니다.                                                                                                                  |
| baseFeePerGas | Array | 가스당 블록 기본 수수료의 배열입니다. 이 값은 최신 블록에서 파생될 수 있으므로 반환된 범위 중 가장 최신 블록 이후의 다음 블록이 포함됩니다. EIP-1559 이전 블록에 대해서는 0이 반환됩니다. |
| gasUsedRatio | Array | 블록의 가스 사용량/가스 한도의 배열입니다.                                                                                                                                                                      |

**예제**

```javascript
> caver.rpc.klay.createAccessList({
        from: '0x3bc5885c2941c5cda454bdb4a8c88aa7f248e312',
        data: '0x20965255',
        gasPrice: '0x3b9aca00',
        gas: '0x3d0900',
        to: '0x00f5f5f3a25f142fafd0af24a754fafa340f32c7'
    }, 'latest').then(console.log)
{ accessList: [], gasUsed: '0x0' }
```

## caver.rpc.klay.isParallelDBWrite <a href="#caver-rpc-klay-isparalleldbwrite" id="caver-rpc-klay-isparalleldbwrite"></a>

```javascript
caver.rpc.klay.isParallelDBWrite([callback])
```

노드가 블록체인 데이터를 병렬로 쓰고 있으면 `true`를 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 파라미터로 오류 객체를 반환하고 두 번째 파라미터로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `boolean`을 반환합니다.

| 유형 | 설명 |
| ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Boolean | `true`는 노드가 블록체인 데이터를 병렬로 쓰고 있음을 의미합니다. 노드가 데이터를 순차적으로 쓰고 있다면 `false`입니다. |

**예시**

```javascript
> caver.rpc.klay.isParallelDBWrite().then(console.log)
true
```

## caver.rpc.klay.isSenderTxHashIndexingEnabled <a href="#caver-rpc-klay-issendertxhashindexingenabled" id="caver-rpc-klay-issendertxhashindexingenabled"></a>

```javascript
caver.rpc.klay.isSenderTxHashIndexingEnabled([callback])
```

노드가 발신자 트랜잭션 해시를 트랜잭션 해시 매핑 정보에 인덱싱하는 경우 `true`를 반환합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 파라미터로 오류 객체를 반환하고 두 번째 파라미터로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `boolean`을 반환합니다.

| 유형 | 설명 |
| ------- | -------------------------------------------------------------------------------------------------- |
| boolean | `true`는 노드가 발신자 트랜잭션 해시를 트랜잭션 해시 매핑 정보에 인덱싱하고 있음을 의미합니다. |

**예시**

```javascript
> caver.rpc.klay.isSenderTxHashIndexingEnabled().then(console.log)
true
```

## caver.rpc.klay.getProtocolVersion <a href="#caver-rpc-klay-getprotocolversion" id="caver-rpc-klay-getprotocolversion"></a>

```javascript
caver.rpc.klay.getProtocolVersion([callback])
```

노드의 클레이튼 프로토콜 버전을 반환합니다. Cypress/Baobab의 현재 버전(v1.9.0 기준)은 `istanbul/65`입니다.

**파라미터**

| 이름 | 유형 | 설명 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 파라미터로 오류 객체를 반환하고 두 번째 파라미터로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | ---------------------------------------- |
| string | 노드의 클레이튼 프로토콜 버전입니다. |

**예시**

```javascript
> caver.rpc.klay.getProtocolVersion().then(console.log)
0x40
```

## caver.rpc.klay.getRewardbase <a href="#caver-rpc-klay-getrewardbase" id="caver-rpc-klay-getrewardbase"></a>

```javascript
caver.rpc.klay.getRewardbase([callback])
```

현재 노드의 보상베이스를 반환합니다. 리워드베이스는 블록 보상이 지급되는 계정의 주소입니다. CN에만 필요합니다.

**파라미터**

| 이름 | 유형 | 설명 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 파라미터로 오류 객체를 반환하고 두 번째 파라미터로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | ----------------------- |
| string | 리워드베이스 주소입니다. |

**예시**

```javascript
> caver.rpc.klay.getRewardbase().then(console.log)
0xa9b3a93b2a9fa3fdcc31addd240b04bf8db3414c
```

## caver.rpc.klay.getFilterChanges <a href="#caver-rpc-klay-getfilterchanges" id="caver-rpc-klay-getfilterchanges"></a>

```javascript
caver.rpc.klay.getFilterChanges(filterId [, callback])
```

마지막 폴링 이후의 로그 배열을 반환하는 필터의 폴링 메서드입니다.

**매개변수**

| 이름 | 유형 | 설명 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| filterId | String | 필터 아이디입니다.                                                                                             |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `Array`를 반환합니다 - 로그 객체의 배열을 반환하거나, 마지막 폴링 이후 변경된 사항이 없는 경우 빈 배열을 반환합니다.

* [caver.rpc.klay.newBlockFilter](#caver-rpc-klay-newblockfilter)로 생성한 필터의 경우, 반환값은 블록 해시, _예: `["0x3454645634534..."]`입니다.
* [caver.rpc.klay.newPendingTransactionFilter](#caver-rpc-klay-newpendingtransactionfilter)로 생성된 필터의 경우, 반환값은 트랜잭션 해시, _e.g._, `["0x6345343454645..."]`입니다.
* [caver.rpc.klay.newFilter](#caver-rpc-klay-newfilter)로 생성된 필터의 경우, 로그는 다음 파라미터가 포함된 객체입니다:

| 이름 | 유형 | 설명 |
| ---------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| logIndex | String | 블록 내 로그 인덱스 위치.                                                                                                                                                                                                         |
| transactionIndex | String | 이 로그가 생성된 트랜잭션의 인덱스 위치입니다.                                                                                                                                                                          |
| transactionHash | String | 이 로그가 생성된 트랜잭션의 해시입니다. 보류 중일 때는 `null`입니다.                                                                                                                                                                     |
| blockHash | String | 이 로그가 있는 블록의 해시입니다. 보류 중일 때는 `null`입니다.                                                                                                                                                                                |
| blockNumber | String | 이 로그가 있던 블록 번호입니다. 보류 중일 때는 `null`입니다.                                                                                                                                                                                 |
| address | String | 이 로그가 발생한 주소입니다.                                                                                                                                                                                                      |
| data | String | 로그의 인덱싱되지 않은 인수를 포함합니다.                                                                                                                                                                                               |
| topics | Array | 인덱싱된 로그 인수의 0~4개의 32바이트 DATA 배열입니다. (솔리디티에서: `anonymous` 지정자를 사용하여 이벤트를 선언한 경우를 제외하고 첫 번째 항목은 이벤트 서명의 해시입니다(_예: `Deposit(주소,바이트32,uint256)`). |

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

## caver.rpc.klay.getFilterLogs <a href="#caver-rpc-klay-getfilterlogs" id="caver-rpc-klay-getfilterlogs"></a>

```javascript
caver.rpc.klay.getFilterLogs(filterId [, callback])
```

주어진 아이디로 필터와 일치하는 모든 로그의 배열을 반환합니다. 필터 객체는 [newFilter](#caver-rpc-klay-newfilter)를 사용하여 가져와야 합니다.

[caver.rpc.klay.newBlockFilter](#caver-rpc-klay-newblockfilter) 또는 [caver.rpc.klay.newPendingTransactionFilter](#caver-rpc-klay-newpendingtransactionfilter)와 같은 다른 필터 생성 함수에서 반환된 필터 ID는 이 함수와 함께 사용할 수 없음을 유의하세요.

**파라미터**

| 이름 | 유형 | 설명 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| filterId | String | 필터 아이디입니다.                                                                                             |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

[caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges) 참조

**예제**

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

## caver.rpc.klay.getLogs <a href="#caver-rpc-klay-getlogs" id="caver-rpc-klay-getlogs"></a>

```javascript
caver.rpc.klay.getLogs(options [, callback])
```

지정된 필터 객체와 일치하는 모든 로그의 배열을 반환합니다.

**매개변수**

| 이름 | 유형 | 설명 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| options  | object   | 필터 옵션입니다. 아래 표에서 설명을 확인하세요.                                           |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

옵션 객체에는 다음이 포함될 수 있습니다:

| 이름 | 유형 | 설명 |
| --------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromBlock | number \| string | (선택 사항) 로그를 가져오는 가장 빠른 블록의 블록 번호입니다. (`"latest"`는 가장 최근 블록을 의미합니다.) 기본값은 `"latest"`입니다.                                                                                                                                         |
| toBlock | number \| string | (선택 사항) 로그를 가져올 마지막 블록의 블록 번호입니다. (`"latest"`는 가장 최근 블록을 의미합니다.) 기본값은 `"latest"`입니다.                                                                                                                                            |
| address | string \| Array | (선택 사항) 주소 또는 주소 목록입니다. 특정 계정과 관련된 로그만 반환됩니다.                                                                                                                                                                    |
| topics | Array | (선택 사항) 로그 항목에 표시되어야 하는 값의 배열입니다. 순서가 중요합니다. 토픽을 생략하려면 `null`, _예: `[null, '0x12...']`을 사용하세요. 각 토픽에 대한 옵션이 포함된 배열을 전달할 수도 있습니다(예: `[null, ['option1', 'option2']]`). |

**리턴 값**

[caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges) 참조

**예제**

```javascript
> caver.rpc.klay.getLogs({
        fromBlock: '0x1',
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

## caver.rpc.klay.newBlockFilter <a href="#caver-rpc-klay-newblockfilter" id="caver-rpc-klay-newblockfilter"></a>

```javascript
caver.rpc.klay.newBlockFilter([callback])
```

노드에 필터를 생성하여 새 블록이 도착하면 알립니다. 상태가 변경되었는지 확인하려면 [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges)를 호출하세요.

**파라미터**

| 이름 | 유형 | 설명 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | ------------ |
| string | 필터 ID. |

**예시**

```javascript
> caver.rpc.klay.newBlockFilter().then(console.log)
0xf90906914486a9c22d620e50022b38d5
```

## caver.rpc.klay.newFilter <a href="#caver-rpc-klay-newfilter" id="caver-rpc-klay-newfilter"></a>

```javascript
caver.rpc.klay.newFilter(options [, callback])
```

특정 상태 변경(로그)을 수신하기 위해 주어진 필터 옵션을 사용하여 필터 객체를 생성합니다.

* 상태가 변경되었는지 확인하려면 [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges)를 호출합니다.
* `newFilter`로 생성한 필터와 일치하는 모든 로그를 얻으려면 [caver.rpc.klay.getFilterLogs](#caver-rpc-klay-getfilterlogs)를 호출합니다.

필터 오브젝트의 항목에 대한 자세한 내용은 [Klaytn 플랫폼 API - klay_newFilter](../../../../json-rpc/klay/filter.md#klay_newfilter)를 참고하시기 바랍니다.

**파라미터**

| 이름 | 유형 | 설명 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| options  | object   | 필터 옵션입니다. 아래 표에서 설명을 확인하세요.                                           |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

옵션 객체에는 다음이 포함될 수 있습니다:

| 이름 | 유형 | 설명 |
| --------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fromBlock | number \| string | (선택 사항) 로그를 가져오는 가장 빠른 블록의 블록 번호입니다. (`"latest"`는 가장 최근 블록을 의미합니다.) 기본값은 `"latest"`입니다.                                                                                                                                         |
| toBlock | number \| string | (선택 사항) 로그를 가져올 마지막 블록의 블록 번호입니다. (`"latest"`는 가장 최근 블록을 의미합니다.) 기본값은 `"latest"`입니다.                                                                                                                                            |
| address | string \| Array | (선택 사항) 주소 또는 주소 목록입니다. 특정 계정과 관련된 로그만 반환됩니다.                                                                                                                                                                    |
| topics | Array | (선택 사항) 로그 항목에 표시되어야 하는 값의 배열입니다. 순서가 중요합니다. 토픽을 생략하려면 `null`, _예: `[null, '0x12...']`을 사용하세요. 각 토픽에 대한 옵션이 포함된 배열을 전달할 수도 있습니다(예: `[null, ['option1', 'option2']]`). |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | ------------ |
| string | 필터 ID. |

**예시**

```javascript
> caver.rpc.klay.newFilter({}).then(console.log)
0x40d40cb9758c6f0d99d9c2ce9c0f823

> caver.rpc.klay.newFilter({ address: '0x55384B52a9E5091B6012717197887dd3B5779Df3' }).then(console.log)
0xd165cbf31b9d60346aada33dbefe01b
```

## caver.rpc.klay.newPendingTransactionFilter <a href="#caver-rpc-klay-newpendingtransactionfilter" id="caver-rpc-klay-newpendingtransactionfilter"></a>

```javascript
caver.rpc.klay.newPendingTransactionFilter([callback])
```

노드에 필터를 생성하여 새로운 보류 트랜잭션 도착에 대한 정보를 수신합니다. 상태가 변경되었는지 확인하려면 [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges)를 호출하세요.

**파라미터**

| 이름 | 유형 | 설명 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | ------------ |
| string | 필터 ID. |

**예시**

```javascript
> caver.rpc.klay.newPendingTransactionFilter().then(console.log)
0xe62da1b2a09efcd4168398bdbf586db0
```

## caver.rpc.klay.uninstallFilter <a href="#caver-rpc-klay-uninstallfilter" id="caver-rpc-klay-uninstallfilter"></a>

```javascript
caver.rpc.klay.uninstallFilter(filterId [, callback])
```

지정된 아이디를 가진 필터를 제거합니다. 감시가 더 이상 필요하지 않을 때 항상 호출해야 합니다. 또한 필터는 일정 기간 동안 [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges)로 호출되지 않으면 시간 초과됩니다.

**파라미터**

| 이름 | 유형 | 설명 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| filterId | String | 필터 아이디입니다.                                                                                             |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `boolean`을 반환합니다.

| 유형 | 설명 |
| ------- | --------------------------------------------------------------------- |
| boolean | 필터가 성공적으로 제거되면 `true`, 그렇지 않으면 `false`를 반환합니다. |

**예시**

```javascript
> caver.rpc.klay.uninstallFilter('0x1426438ffdae5abf43edf4159c5b013b').then(console.log)
true
```

## caver.rpc.klay.sha3 <a href="#caver-rpc-klay-sha3" id="caver-rpc-klay-sha3"></a>

```javascript
caver.rpc.klay.sha3(data[, callback])
```

주어진 데이터의 Keccak-256(표준화된 SHA3-256이 아님)을 반환합니다. 이 대신 [caver.utils.sha3](../caver.utils.md#sha3)를 사용할 수 있습니다.

**파라미터**

| 이름 | 유형 | 설명 |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| data | String | SHA3 해시로 변환할 데이터입니다.                                                                 |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다. |

**리턴 값**

`Promise`는 `string`을 반환합니다.

| 유형 | 설명 |
| ------ | ---------------------------------- |
| string | 주어진 데이터의 SHA3 결과입니다. |

**예시**

```javascript
> caver.rpc.klay.sha3('0x11223344').then(console.log)
0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70dd73
```
