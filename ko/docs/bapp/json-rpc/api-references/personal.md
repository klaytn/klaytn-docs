---
description: >-
  노드에서 계정과 개인키를 관리하는 API입니다.
---

# Namespace personal <a id="namespace-personal"></a>

`personal` namespace는 키스토어의 개인키를 관리합니다.


## personal_importRawKey <a id="personal_importrawkey"></a>

암호화되지 않은 개인키(접두사 '0x'를 제거한 16진수 문자열) 또는 [Klaytn 지갑 키](../../../klaytn/design/accounts.md#klaytn-wallet-key-format)를 입력 받아 이에 해당하는 키 파일을 새 패스프레이즈로 암호화합니다.

가져온 계정의 주소를 반환합니다.

| 클라이언트 | 메서드 호출                                                                 |
|:-----:| ---------------------------------------------------------------------- |
|  콘솔   | `personal.importRawKey(keydata, passphrase)`                           |
|  RPC  | `{"method": "personal_importRawKey", "params": [keydata, passphrase]}` |

**매개변수**

| 명칭         | 형식  | 설명                                                                                                                      |
| ---------- | --- | ----------------------------------------------------------------------------------------------------------------------- |
| keydata    | 문자열 | 암호화되지 않은 개인키 (접두사 '0x'를 제거한 16진수 문자열) 또는 [Klaytn 지갑 키](../../../klaytn/design/accounts.md#klaytn-wallet-key-format)입니다. |
| passphrase | 문자열 | 암호화에 사용되는 패스프레이즈입니다.                                                                                                    |

**리턴값**

| 명칭      | 형식  | 설명                 |
| ------- | --- | ------------------ |
| address | 문자열 | 가져온 계정의 주소를 반환합니다. |

**예시**

콘솔
```javascript
> personal.importRawKey('{private key}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"

// Using a Klaytn wallet key
> personal.importRawKey('{private key}0x000x{address}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_importRawKey","params":["{private key}", "mypassword"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_importRawKey","params":["{private key}0x000x{address}", "mypassword"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
```

## personal_listAccounts <a id="personal_listaccounts"></a>

키스토어에 있는 모든 키에 대해서 Klaytn 계정 주소를 반환합니다.

| 클라이언트 | 메서드 호출                                              |
|:-----:| --------------------------------------------------- |
|  콘솔   | `personal.listAccounts`                             |
|  RPC  | `{"method": "personal_listAccounts", "params": []}` |

**매개변수**

없음

**리턴값**

| 형식  | 설명                   |
| --- | -------------------- |
| 문자열 | Klaytn 계정 주소의 목록입니다. |

없음

**예시**

콘솔
```javascript
> personal.listAccounts
["0x5e97870f263700f46aa00d967821199b9bc5a120", "0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"]
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_listAccounts","params":[],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":["0xd8d81f52b595cc6135177c9c34ae6130ecad4636","0xda04fb00e2cb5745cef7d8c4464378202a1673ef"]}
```


## personal_newAccount <a id="personal_newaccount"></a>

새 개인키를 생성하여 키스토어 디렉토리에 저장합니다. 입력으로 받은 패스프레이즈로 키 파일을 암호화합니다. 새로 생성된 계정의 주소를 반환합니다.

Klaytn 콘솔에서 패스프레이즈가 매개변수로 주어지지 않으면 `newAccount`가 패스프레이즈를 입력하도록 요구할 것입니다.

| 클라이언트 | 메서드 호출                                                      |
|:-----:| ----------------------------------------------------------- |
|  콘솔   | `personal.newAccount(passphrase)`                           |
|  RPC  | `{"method": "personal_newAccount", "params": [passphrase]}` |

**매개변수**

| 명칭         | 형식  | 설명                           |
| ---------- | --- | ---------------------------- |
| passphrase | 문자열 | (선택 사항) 암호화에 사용되는 패스프레이즈입니다. |

**리턴값**

| 형식  | 설명                    |
| --- | --------------------- |
| 문자열 | 새로 생성된 계정의 주소를 반환합니다. |

**예시**

콘솔
``` javascript
> personal.newAccount()
Passphrase:
Repeat passphrase:
"0x5e97870f263700f46aa00d967821199b9bc5a120"
```

패스프레이즈는 하나의 문자열로 입력할 수도 있습니다.

``` javascript
> personal.newAccount("h4ck3r")
"0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_newAccount","params":["helloWorld"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"0xed1b12248aee85a32aead06c7789d3fcdcd4dae6"}
```


## personal_lockAccount <a id="personal_lockaccount"></a>

입력으로 받은 주소에 해당하는 개인키를 메모리에서 제거합니다. 이후 해당 계정을 사용하여 트랜잭션을 전송할 수 없습니다.

| 클라이언트 | 메서드 호출                                                    |
|:-----:| --------------------------------------------------------- |
|  콘솔   | `personal.lockAccount(address)`                           |
|  RPC  | `{"method": "personal_lockAccount", "params": [address]}` |

**매개변수**

| 명칭      | 형식  | 설명            |
| ------- | --- | ------------- |
| address | 문자열 | 잠글 계정의 주소입니다. |

**리턴값**

| 형식   | 설명                                                  |
| ---- | --------------------------------------------------- |
| bool | 계정이 성공적으로 잠기면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. |

**예시**

콘솔
```javascript
> personal.lockAccount("0xfa415bb3e6231f488ff39eb2897db0ef3636dd32")
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_lockAccount","params":["0xda04fb00e2cb5745cef7d8c4464378202a1673ef"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```


## personal_unlockAccount <a id="personal_unlockaccount"></a>

입력으로 받은 주소에 해당하는 키를 키스토어로부터 복호화합니다.

패스프레이즈와 duration 매개변수는 자바스트립트 콘솔일 때 사용하는 선택사항입니다. If the passphrase is not supplied as an argument, the console will prompt for the passphrase interactively.

잠금 해제 기간이 만료될 때까지 암호화되지 않은 키가 메모리에 남습니다. 잠금 해제 기간은 300초로 기본 설정되어 있습니다. An explicit duration of zero seconds unlocks the key until the Klaytn local node exits.

계정의 잠금이 해제된 동안 `klay_sign`와 `klay_sendTransaction`를 사용할 수 있습니다.

| 클라이언트 | 메서드 호출                                                                            |
|:-----:| --------------------------------------------------------------------------------- |
|  콘솔   | `personal.unlockAccount(address, passphrase, duration)`                           |
|  RPC  | `{"method": "personal_unlockAccount", "params": [address, passphrase, duration]}` |

**매개변수**

| 명칭         | 형식  | 설명                                    |
| ---------- | --- | ------------------------------------- |
| address    | 문자열 | 잠금 해제할 계정의 주소입니다.                     |
| passphrase | 문자열 | 암호화에 사용되는 패스프레이즈입니다.                  |
| duration   | int | (선택사항) 잠금 해제 기간입니다. (기본 설정은 300초입니다.) |

**리턴값**

| 형식   | 설명                                            |
| ---- | --------------------------------------------- |
| bool | 잠금 해제되면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. |

**예시**

콘솔
``` javascript
> personal.unlockAccount("0x5e97870f263700f46aa00d967821199b9bc5a120")
Unlock account 0x5e97870f263700f46aa00d967821199b9bc5a120
Passphrase:
true
```

다음과 같이 패스프레이즈와 잠금 해제 기간을 매개변수로 제공할 수 있습니다.

``` javascript
> personal.unlockAccount("0x5e97870f263700f46aa00d967821199b9bc5a120", "foo", 30)
true
```

If you want to type in the passphrase and still override the default unlock duration, pass `null` as the passphrase.

```
> personal.unlockAccount("0x5e97870f263700f46aa00d967821199b9bc5a120", null, 30)
Unlock account 0x5e97870f263700f46aa00d967821199b9bc5a120
Passphrase:
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_unlockAccount","params":["0xda04fb00e2cb5745cef7d8c4464378202a1673ef","mypassword"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":true}
```

## personal_replaceRawKey <a id="personal_replacerawkey"></a>

암호화되지 않은 개인키(접두사 '0x'를 제거한 16진수 문자열) 또는 [Klaytn 지갑 키](../../../klaytn/design/accounts.md#klaytn-wallet-key-format)를 받아 키 스토어의 암호화된 키 파일을 대체하며, 새 패스프레이즈로 암호화합니다. 또한 변경하기 전에 이전 패스프레이즈를 입력하여 이전 개인키를 복호화합니다. 복호화에 실패하거나 일치하는 계정을 찾을 수 없는 경우 오류가 발생합니다.

성공적으로 변경되면 변경된 계정의 주소를 반환합니다.

| 클라이언트 | 메서드 호출                                                                                    |
|:-----:| ----------------------------------------------------------------------------------------- |
|  콘솔   | `personal.replaceRawKey(keydata, oldPassphrase, newPassphrase)`                           |
|  RPC  | `{"method": "personal_replaceRawKey", "params": [keydata, oldPassphrase, newPassphrase]}` |

**매개변수**

| 명칭            | 형식  | 설명                                                                                                                      |
| ------------- | --- | ----------------------------------------------------------------------------------------------------------------------- |
| keydata       | 문자열 | 암호화되지 않은 개인키 (접두사 '0x'를 제거한 16진수 문자열) 또는 [Klaytn 지갑 키](../../../klaytn/design/accounts.md#klaytn-wallet-key-format)입니다. |
| oldPassphrase | 문자열 | 이전 개인키를 복호화하기 위한 패스프레이즈입니다.                                                                                             |
| newPassphrase | 문자열 | 새 개인키를 암호화하기 위한 패스프레이즈입니다.                                                                                              |

**리턴값**

| 명칭      | 형식  | 설명                 |
| ------- | --- | ------------------ |
| address | 문자열 | 변경된 계정의 주소를 반환합니다. |

**예시**

콘솔
```javascript
> personal.replaceRawKey('{private key}', 'myoldpassword', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
> personal.replaceRawKey('{private key}0x000x{address}', 'myoldpassword', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_replaceRawKey","params":["{private key}", "myoldpassword", mypassword"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_replaceRawKey","params":["{private key}0x000x{address}", "myoldpassword", mypassword"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
```

## personal_sendAccountUpdate <a id="personal_sendaccountupdate"></a>

입력으로 받은 패스프레이즈를 검증하고 [TxTypeAccountUpdate](../../../klaytn/design/transactions/basic.md#txtypeaccountupdate) 트랜잭션을 제출합니다. 이 트랜잭션 객체의 `from`와 `key` 필드는 필수적으로 값을 입력해야 합니다. `gas`, `gasPrice`, `논스`와 같은 다른 필드는 값이 지정되지 않으면 내부적으로 설정이 됩니다. 패스프레이즈로 `tx.from`의 개인키를 복호화할 수 있고 트랜잭션이 유효하면, 트랜잭션을 서명하여 네트워크에 제출합니다. 이때 계정은 노드에서 전역적으로 잠금 해제되지 않으며 다른 RPC 호출에 사용될 수도 없습니다.

| 클라이언트 | 메서드 호출                                                                 |
|:-----:| ---------------------------------------------------------------------- |
|  콘솔   | `personal.sendAccountUpdate(tx, passphrase)`                           |
|  RPC  | `{"method": "personal_sendAccountUpdate", "params": [tx, passphrase]}` |

**매개변수**

| 명칭         | 형식  | 설명                                             |
| ---------- | --- | ---------------------------------------------- |
| tx         | 문자열 | 트랜잭션 객체입니다. `from`과 `key` 필드는 반드시 값을 입력해야 합니다. |
| passphrase | 문자열 | `tx.from`의 개인키를 복호화하기 위한 패스프레이즈입니다.            |

**리턴값**

| 형식        | 설명                                   |
| --------- | ------------------------------------ |
| 32바이트 문자열 | 성공하면 트랜잭션 해시를 반환합니다. 실패하면 오류가 발생합니다. |

**예시**

콘솔
``` javascript
> var tx = {from: "0x391694e7e0b0cce554cb130d723a9d27458f9298", key:"0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8"}
undefined
> personal.sendAccountUpdate(tx, "passphrase")
0x8474441674cdd47b35b875fd1a530b800b51a5264b9975fb21129eeb8c18582f
```
HTTP RPC

**참고**: `klay.toPeb()` 함수는 HTTP RPC를 통해 실행할 수 없습니다.
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sendAccountUpdate","params":[{"from":"0x1d4e05bb72677cb8fa576149c945b57d13f855e4","key":"0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8"}, "passphrase"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"0x26a7a8ba619a5e3e4d742c217f55f49591a5616b200c976bd58a966a05e294b7"}
```

## personal_sendTransaction <a id="personal_sendtransaction"></a>

입력으로 받은 패스프레이즈를 검증하고 [TxTypeLegacy](../../../klaytn/design/transactions/basic.md#txtypelegacytransaction) 트랜잭션을 제출합니다. 컨트랙트 배포를 제외하고는 트랜잭션 오브젝트는 언제나 `from`과 `to`가 있어야 합니다. 스마트 컨트랙트를 배포하는 트랜잭션에서는 `to`가 비워져 있어야 합니다. `value`가 주어지지 않으면, 내부적으로 0으로 설정합니다. `gas`, `gasPrice`, `nonce`와 같은 필드는 값이 지정되지 않으면 내부적으로 적절한 값으로 설정합니다. 입력받은 패스프레이즈로 `tx.from`의 개인키를 복호화할 수 있고 트랜잭션이 유효하면, 트랜잭션을 서명하여 네트워크에 제출합니다. 이때 계정은 노드에서 전역적으로 잠금 해제되지 않으며 다른 RPC 호출에 사용될 수도 없습니다.

| 클라이언트 | 메서드 호출                                                               |
|:-----:| -------------------------------------------------------------------- |
|  콘솔   | `personal.sendTransaction(tx, passphrase)`                           |
|  RPC  | `{"method": "personal_sendTransaction", "params": [tx, passphrase]}` |

**매개변수**

| 명칭         | 형식  | 설명                                                                                                  |
| ---------- | --- | --------------------------------------------------------------------------------------------------- |
| tx         | 문자열 | 트랜잭션 객체입니다. `from`은 반드시 입력해야 하는 필드입니다. `to`, `value`, `gas`, `gasPrice`, `nonce`는 선택적으로 입력하는 필드입니다. |
| passphrase | 문자열 | `tx.from`의 개인키를 복호화하기 위한 패스프레이즈입니다.                                                                 |

**리턴값**

| 형식        | 설명                                   |
| --------- | ------------------------------------ |
| 32바이트 문자열 | 성공하면 트랜잭션 해시를 반환합니다. 실패하면 오류가 발생합니다. |

**예시**

콘솔
``` javascript
> var tx = {from: "0x391694e7e0b0cce554cb130d723a9d27458f9298", to: "0xafa3f8684e54059998bc3a7b0d2b0da075154d66", value: klay.toPeb(1.23, "KLAY")}
undefined
> personal.sendTransaction(tx, "passphrase")
0x8474441674cdd47b35b875fd1a530b800b51a5264b9975fb21129eeb8c18582f
```
HTTP RPC

**참고**: `klay.toPeb()` 함수는 HTTP RPC를 통해 실행할 수 없습니다.
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sendTransaction","params":[{"from":"0x1d4e05bb72677cb8fa576149c945b57d13f855e4","to":"0xafa3f8684e54059998bc3a7b0d2b0da075154d66","value":"0x1230000000"},"passphrase"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"0x26a7a8ba619a5e3e4d742c217f55f49591a5616b200c976bd58a966a05e294b7"}
```

## personal_sendValueTransfer <a id="personal_sendvaluetransfer"></a>

입력으로 받은 패스프레이즈를 검증하고 [TxTypeValueTransfer](../../../klaytn/design/transactions/basic.md#txtypevaluetransfer) 트랜잭션을 제출합니다. 이 트랜잭션 객체의 `from`, `to`, `value` 필드는 필수적으로 값을 입력해야 합니다. `gas`, `gasPrice`, `논스`와 같은 다른 필드는 값이 지정되지 않으면 내부적으로 설정이 됩니다. 패스프레이즈로 `tx.from`의 개인키를 복호화할 수 있고 트랜잭션이 유효하면, 트랜잭션을 서명하여 네트워크에 제출합니다. 이때 계정은 노드에서 전역적으로 잠금 해제되지 않으며 다른 RPC 호출에 사용될 수도 없습니다.

| 클라이언트 | 메서드 호출                                                                 |
|:-----:| ---------------------------------------------------------------------- |
|  콘솔   | `personal.sendValueTransfer(tx, passphrase)`                           |
|  RPC  | `{"method": "personal_sendValueTransfer", "params": [tx, passphrase]}` |

**매개변수**

| 명칭         | 형식  | 설명                                                     |
| ---------- | --- | ------------------------------------------------------ |
| tx         | 문자열 | 트랜잭션 객체입니다. `from`, `to`, `value` 필드는 반드시 값을 입력해야 합니다. |
| passphrase | 문자열 | `tx.from`의 개인키를 복호화하기 위한 패스프레이즈입니다.                    |

**리턴값**

| 형식        | 설명                                   |
| --------- | ------------------------------------ |
| 32바이트 문자열 | 성공하면 트랜잭션 해시를 반환합니다. 실패하면 오류가 발생합니다. |

**예시**

콘솔
``` javascript
> var tx = {from: "0x391694e7e0b0cce554cb130d723a9d27458f9298", to: "0xafa3f8684e54059998bc3a7b0d2b0da075154d66", value: klay.toPeb(1.23, "KLAY")}
undefined
> personal.sendValueTransfer(tx, "passphrase")
0x8474441674cdd47b35b875fd1a530b800b51a5264b9975fb21129eeb8c18582f
```
HTTP RPC

**참고**: `klay.toPeb()` 함수는 HTTP RPC를 통해 실행할 수 없습니다.
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sendValueTransfer","params":[{"from":"0x1d4e05bb72677cb8fa576149c945b57d13f855e4","to":"0xafa3f8684e54059998bc3a7b0d2b0da075154d66","value":"0x1230000000"},"passphrase"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"0x26a7a8ba619a5e3e4d742c217f55f49591a5616b200c976bd58a966a05e294b7"}
```

## personal_sign <a id="personal_sign"></a>

`sign` 메서드는 다음과 같이 Klaytn만의 서명을 계산합니다. `sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))`

메시지에 접두사를 붙이면 계산된 서명 값이 Klaytn의 서명임을 알 수 있습니다. 이는 악성 DApp이 트랜잭션과 같은 임의의 데이터를 서명하여 누군가를 사칭하는 것을 방지합니다.

서명 검증에 대한 자세한 내용은 `personal_ecRecover`를 참고하세요.

| 클라이언트 | 메서드 호출                                                                |
|:-----:| --------------------------------------------------------------------- |
|  콘솔   | `personal.sign(message, account, password)`                           |
|  RPC  | `{"method": "personal_sign", "params": [message, account, password]}` |

**매개변수**

| 명칭       | 형식  | 설명                           |
| -------- | --- | ---------------------------- |
| message  | 문자열 | 서명할 메시지입니다.                  |
| Account  | 문자열 | 계정의 주소입니다.                   |
| password | 문자열 | (선택 사항) 암호화에 사용되는 패스프레이즈입니다. |

**리턴값**

| 형식  | 설명        |
| --- | --------- |
| 문자열 | 서명 결과입니다. |

**예시**

콘솔
``` javascript
> personal.sign("0xdeadbeaf", "0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "")
"0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sign","params":["0xdead","0xda04fb00e2cb5745cef7d8c4464378202a1673ef","mypassword"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"0xccb8cce176b01fdc8f7ac3c101b8eb3b9005e938a60800e517624419dd8b7fba0e4598bdf1c4fa1743e1288e89b8b7090cc11f4b3640aafcbc71896ec73eec241b"}
```


## personal_ecRecover <a id="personal_ecrecover"></a>

`ecRecover`는 `personal_sign`에서 서명을 계산하는 데에 사용된 개인키에 해당하는 주소를 반환합니다.

| 클라이언트 | 메서드 호출                                                             |
|:-----:| ------------------------------------------------------------------ |
|  콘솔   | `personal.ecRecover(message, signature)`                           |
|  RPC  | `{"method": "personal_ecRecover", "params": [message, signature]}` |

**매개변수**

| 명칭       | 형식  | 설명          |
| -------- | --- | ----------- |
| message  | 문자열 | 서명한 메시지입니다. |
| 서명 값입니다. | 문자열 | 서명입니다.      |

**리턴값**

| 형식  | 설명     |
| --- | ------ |
| 문자열 | 계정 주소. |

**예시**

콘솔

``` javascript
> personal.sign("0xdeadbeaf", "0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "")
"0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
> personal.ecRecover("0xdeadbeaf", "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b")
"0x9b2055d370f73ec7d8a03e965129118dc8f5bf83"
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sign","params":["0xdead","0xda04fb00e2cb5745cef7d8c4464378202a1673ef","mypassword"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"0xccb8cce176b01fdc8f7ac3c101b8eb3b9005e938a60800e517624419dd8b7fba0e4598bdf1c4fa1743e1288e89b8b7090cc11f4b3640aafcbc71896ec73eec241b"}

$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_ecRecover","params":["0xdead","0xccb8cce176b01fdc8f7ac3c101b8eb3b9005e938a60800e517624419dd8b7fba0e4598bdf1c4fa1743e1288e89b8b7090cc11f4b3640aafcbc71896ec73eec241b"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
```
