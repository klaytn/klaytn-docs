# 계정

## defaultAccount <a id="defaultaccount"></a>

```javascript
caver.klay.defaultAccount
```

이 기본 주소는 `from` 속성이 지정되지 않은 경우 기본 `from` 속성으로 사용됩니다.
속성이 지정되지 않은 경우 기본 주소로 사용됩니다:

- [caver.klay.sendTransaction()](./transaction/sendtx-legacy.md#sendtransaction-legacy)
- [caver.klay.call()](./transaction/transaction.md#call)
- [new caver.klay.Contract()](../caver.klay.Contract.md#new-contract) -> [myContract.methods.myMethod().call()](../caver.klay.Contract.md#methods-mymethod-call)
- [new caver.klay.Contract()](../caver.klay.Contract.md#new-contract) -> [myContract.methods.myMethod().send()](../caver.klay.Contract.md#methods-mymethod-send)

**속성**

20바이트 `String` - 모든 클레이튼 주소.  노드 또는 키 저장소에 해당 주소의 개인키가
해당 주소에 대한 개인키가 있어야 합니다.  기본값은 `undefined`입니다.

**예시**

```javascript
> caver.klay.defaultAccount;
undefined

// set the default account
> caver.klay.defaultAccount = '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe';
```

## accountCreated <a id="accountcreated"></a>

```javascript
caver.klay.accountCreated(address [, defaultBlock] [, callback])
```

주소와 연결된 계정이 생성되면 `true`를 반환합니다. 그렇지 않으면 `false`를 반환합니다.

**참고** accountCreated는 네트워크에 계정이 존재하는지 확인하므로 키 쌍이 생성되었더라도 주소와 일치하는 계정이 실제 블록체인 네트워크에 존재하지 않으면 false가 반환됩니다.

**매개변수**

| 이름 | 유형 | 설명
| --- | --- | --- |
| address | String | 네트워크에서 생성되었는지 확인하기 위해 쿼리하려는 계정의 주소입니다. |
| defaultBlock | Number \| String | (선택 사항) 이 매개변수를 전달하면 [caver.klay.defaultBlock](./block.md#defaultblock)으로 설정된 기본 블록이 사용되지 않습니다. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 파라미터로 오류 객체를 반환하고 두 번째 파라미터로 결과를 반환합니다.

**리턴 값**

`Promise`는 `boolean` - 입력 주소의 존재 여부를 반환합니다.

**예시**

```javascript
> caver.klay.accountCreated('0x7e6ea9e6f24567cd9edb92e6e2d9b94bdae8a47f').then(console.log);
true

> caver.klay.accountCreated('0x6a616d696e652e6b6c6179746t00000000000000').then(console.log);
false
```

## getAccount <a id="getaccount"></a>

```javascript
caver.klay.getAccount(address[, defaultBlock] [, callback])
```

주어진 주소의 계정 정보를 반환합니다. 클레이튼에는 두 가지 계정 유형이 있습니다: 외부 소유 계정(EOA)과 스마트 컨트랙트 계정입니다. [클레이튼 계정](../../../../../learn/accounts.md#klaytn-accounts)을 참고하세요.

**참고** getAccount는 네트워크에 존재하는 계정을 반환하므로 키 쌍이 생성되더라도 주소와 일치하는 계정이 실제 블록체인 네트워크에 존재하지 않으면 null이 반환됩니다.

**매개변수**

| 이름 | 유형 | 설명
| --- | --- | --- |
| address | String | 계정 정보를 가져올 계정의 주소입니다. |
| defaultBlock | Number \| String | (선택 사항) 이 매개변수를 전달하면 [caver.klay.defaultBlock](./block.md#defaultblock)으로 설정된 기본 블록이 사용되지 않습니다. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 파라미터로 오류 객체를 반환하고 두 번째 파라미터로 결과를 반환합니다.

**리턴 값**

`Promise`는 계정 정보가 포함된 JSON 객체를 반환합니다.

**예시**

```javascript
> caver.klay.getAccount('0x52791fcf7900a64a6bcab8b89a78ae4cc60da01c').then(console.log);
{ 
  accType: 1,
  account:
  { 
     nonce: 3,
     balance: '0x446c3b15f9926687c8e202d20c14b7ffe02e7e3000',
     humanReadable: false,
     key: { keyType: 1, key: {} } 
  } 
}

> caver.klay.getAccount('0x52791fcf7900a64a6bcab8b89a78ae4cc60da01c', 'latest').then(console.log);
{ 
  accType: 1,
  account:
  { 
     nonce: 3,
     balance: '0x446c3b15f9926687c8e202d20c14b7ffe02e7e3000',
     humanReadable: false,
     key: { keyType: 1, key: {} } 
  } 
}
```


## getAccounts <a id="getaccounts"></a>

```javascript
caver.klay.getAccounts([callback])
```

노드가 제어하는 계정 목록을 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| --- | --- | --- |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 객체를 반환하고 두 번째 매개변수로 결과를 반환합니다.

**리턴 값**

`Promise`는 노드가 제어하는 주소의 배열인 `Array`를 반환합니다.

**예시**

```javascript
> caver.klay.getAccounts().then(console.log);
["0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "0xDCc6960376d6C6dEa93647383FfB245CfCed97Cf"]
```


## getAccountKey <a id="getaccountkey"></a>

```javascript
caver.klay.getAccountKey(address [, defaultBlock] [, callback])
```

주어진 주소의 외부 소유 계정(EOA)의 계정 키를 반환합니다. 계정에 AccountKeyLegacy가 있거나 지정한 주소의 계정이 스마트 컨트랙트 계정인 경우 빈 키 값을 반환합니다. [계정 키](../../../../../learn/accounts.md#account-key)를 참조하세요.

**참고** getAccountKey는 계정이 네트워크에 존재할 경우 계정 키를 반환하므로 키 쌍이 생성되더라도 주소와 일치하는 계정이 실제 블록체인 네트워크에 존재하지 않으면 null이 반환됩니다.

**매개변수**

| 이름 | 유형 | 설명
| --- | --- | --- |
| address | String | 계정키를 가져올 계정의 주소입니다. |
| defaultBlock | Number \| String | (선택 사항) 이 매개변수를 전달하면 [caver.klay.defaultBlock](./block.md#defaultblock)으로 설정된 기본 블록이 사용되지 않습니다. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 파라미터로 오류 객체를 반환하고 두 번째 파라미터로 결과를 반환합니다.

**리턴 값**

`promise`는 `object`를 반환합니다. - 계정 키는 공개 키와 키 유형으로 구성됩니다.

**예시**

```javascript
// AccountKey type: AccountKeyLegacy
> caver.klay.getAccountKey('0x7e6ea9e6f24567cd9edb92e6e2d9b94bdae8a47f').then(console.log);
{ keyType: 1, key: {} }

// AccountKey type: AccountKeyPublic
> caver.klay.getAccountKey('0xe1be6edd35b68cbf69fe9376ed7320476cf18b5c').then(console.log);
{
  keyType: 2,
  key:{
    x:'0xb9a4b266083c05deb3ce95055510c34c84b8bb2ad1e0a687fafaf15118511e59',
    y:'0x7a28526d3d076d019f8856a56f1fefff33c6100e9f3a190e85d9c754aae7513d'
  }
}

// AccountKey type: AccountKeyFail
> caver.klay.getAccountKey('0xf6d69a7a006d7ab2dcef79195698f6c30895e7d5').then(console.log);
{
  keyType: 3,
  key:{}
}

// AccountKey type: AccountKeyWeightedMultiSig
> caver.klay.getAccountKey('0x676b02b1cb59bd86577f15ff17fb0d59d8ca1ab6').then(console.log);
{
  keyType: 4,
  key: {
    threshold: 2,
    keys: [
      {
        weight: 1,
        key: {
          x: '0xae6b72d7ce2c11520ac00cbd1c4da216171a96eae1ae3a0a1f979a554c9063ae',
          y: '0x79ddf38c8717030512f3ca6f304408a3beb51519b918b8d62a55ff4a8c165fea'
        }
      },
      {
        weight: 1,
        key: {
          x: '0xd4256fc43f42b3313b7204e42a82893a8d9b562f6c9b39456ee989339949c67c',
          y: '0xfc5e78e71b26f5a93b5bec454e4d63947576ffd23b4df624579ff4eb67a2a29b'
        }
      },
      {
        weight: 1,
        key: {
          x: '0xd653eae5f0e9cd6bfe4c3929f4c4f28c94f3bd183eafafee2d73db38a020d9d8',
          y: '0xe974e859b5be80755dedaebe937ac49800cbac483ca304179050a177e9ca0270'
        }
      }
    ]
  }
}

// AccountKey type: AccountKeyRoleBased
> caver.klay.getAccountKey('0x73436db2404853b41e4398d3cf094f1cce57f3bd').then(console.log);
{
  keyType: 5,
  key: [
      {
        key: {
          x: '0x819659d4f08e08d4bd97c6ce5ed2c2eb914201a5b3731eb9d208128df24b97dd',
          y: '0x1824267ab9e55f5a3fb1030f0299fa73fc0037305d5b1d90100e2131af41c010'
        },
        keyType: 2
      },
      {
        key: {
          x: '0x73363604ca8776a2883b02046361b7eb6bd11f4fc10700ee51c525bcded134c1',
          y: '0xfc3e3cb3f4f5b709df5a2075107bc73c8618440c08456bafc44ee6f27f9e6326'
        },
        keyType: 2
      },
      {
        key: {
          x: '0x95c920eb2571dff37baecdbbee32897e6e448c6725c5ab73569cc6f659684307',
          y: '0xef7839023c48acf710ad322356c12b7c5b7f475515ba7d5834f41a993f42b8f9'
        },
        keyType: 2
      }
  ]
}
```

## getBalance <a id="getbalance"></a>

```javascript
caver.klay.getBalance(address [, defaultBlock] [, callback])
```
주어진 블록에 있는 주소의 잔액을 가져옵니다.

**매개변수**

| 이름 | 유형 | 설명
| --- | --- | --- |
| address | String | 잔액을 가져올 주소입니다.
| defaultBlock | Number \| String | (선택 사항) 이 매개변수를 전달하면 [caver.klay.defaultBlock](./block.md#defaultblock)으로 설정된 기본 블록이 사용되지 않습니다. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 파라미터로 오류 객체를 반환하고 두 번째 파라미터로 결과를 반환합니다.

**리턴 값**

`Promise`는 `String`을 반환합니다 - 주어진 주소의 현재 잔액을 peb 단위로 표시합니다.

**예시**

```javascript
> caver.klay.getBalance("0x407d73d8a49eeb85d32cf465507dd71d507100c1").then(console.log);
"1000000000000"
```



## getCode <a id="getcode"></a>

```javascript
caver.klay.getCode(address [, defaultBlock] [, callback])
```
특정 주소의 코드를 가져옵니다.

**매개변수**

| 이름 | 유형 | 설명
| --- | --- | --- |
| address | String | 코드를 가져올 주소입니다.
| defaultBlock | Number \| String | (선택 사항) 이 매개변수를 전달하면 [caver.klay.defaultBlock](./block.md#defaultblock)으로 설정된 기본 블록이 사용되지 않습니다. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 파라미터로 오류 객체를 반환하고 두 번째 파라미터로 결과를 반환합니다.

**리턴 값**

`Promise`는 `String`을 반환합니다 - 주어진 주소 `address`의 데이터입니다.

**예시**

```javascript
> caver.klay.getCode("0xd5677cf67b5aa051bb40496e68ad359eb97cfbf8").then(console.log);
"0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"

```



## getTransactionCount <a id="gettransactioncount"></a>

```javascript
caver.klay.getTransactionCount(address [, blockNumber] [, callback])
```
이 주소에서 전송된 트랜잭션의 수를 가져옵니다.

**매개변수**

| 이름 | 유형 | 설명
| --- | --- | --- |
| address | String | 트랜잭션 수를 가져올 주소입니다.
| blockNumber | Number \| String | (선택 사항) 블록 번호, 보류 중인 nonce에 대한 문자열 `pending` 또는 [기본 블록 매개변수](./block.md#defaultblock)에서와 같이 `earliest` 또는 `latest` 문자열입니다. 생략하면 `latest`이 사용됩니다. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개 변수로 오류 객체를 반환하고 두 번째 매개 변수로 결과를 반환합니다.

**리턴 값**

| 유형 | 설명
| --- | --- |
| number | 주어진 주소에서 전송된 트랜잭션 수 |

**예시**

```javascript
> caver.klay.getTransactionCount("0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe")
  .then(console.log);
1
```

## isContractAccount <a id="iscontractaccount"></a>

```javascript
caver.klay.isContractAccount(address [, defaultBlock] [, callback])
```

입력 계정이 특정 블록 번호 시점에 비어 있지 않은 코드해시를 가지고 있으면 `true`를 반환합니다. 계정이 코드해시가 없는 EOA 또는 스마트 컨트랙트 계정인 경우 `false`를 반환합니다.

**매개변수**

| 이름 | 유형 | 설명
| --- | --- | --- |
| address | String | 확인하려는 계정의 주소는 isContractAccount입니다. |
| defaultBlock | Number \| String | (선택 사항) 이 매개변수를 전달하면 [caver.klay.defaultBlock](./block.md#defaultblock)으로 설정된 기본 블록이 사용되지 않습니다. |
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 파라미터로 오류 객체를 반환하고 두 번째 파라미터로 결과를 반환합니다.

**리턴 값**

`Promise`는 `boolean`을 반환합니다 - `true`는 입력 파라미터가 기존 스마트 컨트랙트 주소임을 의미합니다.

**예시**

```javascript
> caver.klay.isContractAccount('0x7e6ea9e6f24567cd9edb92e6e2d9b94bdae8a47f').then(console.log);
true

> caver.klay.isContractAccount('0x407d73d8a49eeb85d32cf465507dd71d507100c1').then(console.log);
false
```

## sign <a id="sign"></a>

```javascript
caver.klay.sign(message, address [, callback])
```

클레이튼 네트워크에 특화된 서명된 데이터를 생성합니다. 서명이 어떻게 생성되는지 알고 싶으시다면 [Klaytn 플랫폼 API - klay_sign](../../../../../references/json-rpc/klay/account.md#klay_sign)을 참고하세요.

**참고**: 이 API는 노드에 존재하는 계정을 사용하여 메시지에 서명하는 기능을 제공합니다. 메시지에 서명하려면 노드에 있는 계정의 잠금이 해제되어 있어야 합니다. 트랜잭션에 서명하려면 [caver.klay.signTransaction](./transaction/transaction.md#signtransaction)을 사용하세요.

**매개변수**

| 이름 | 유형 | 설명
| --- | --- | --- |
| message | String | 서명할 메시지입니다.
| address | String | 메시지에 서명할 계정의 주소입니다.
| callback | Function | (선택 사항) 선택적 콜백으로, 첫 번째 매개변수로 오류 개체를 반환하고 두 번째 매개변수로 결과를 반환합니다.

**리턴 값**

`Promise`는 계정의 비공개 키로 서명된 메시지 서명인 `String`을 반환합니다.

**예시**

```javascript
> caver.klay.sign('Message to sign', '0x1427ac5d0f1c3174ee6ea05d29a9b05fd31d7579').then(console.log)
0xde8bd2f5a45de6b1baea57ed0219735ab60f0ef55c5e31a4b774824abea31bfc34c8bdbca43ed4155e8e6a8e0d11d7aba191ba025e0487ada2bcc422252b81591b
```

