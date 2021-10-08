---
description: >-
  노드에서 계정과 개인키를 관리하는 API입니다.
---

# personal <a id="namespace-personal"></a>

`personal` namespace는 키스토어의 개인키를 관리합니다.


## personal_importRawKey <a id="personal_importrawkey"></a>

암호화되지 않은 개인키(접두사 '0x'를 제거한 16진수 문자열) 또는 [Klaytn 지갑 키](../../../klaytn/design/accounts.md#klaytn-wallet-key-format)를 입력 받아 이에 해당하는 키 파일을 새 비밀번호로 암호화합니다.

가져온 계정의 주소를 반환합니다.

| 클라이언트 | 메서드 호출                                                                 |
|:-----:| ---------------------------------------------------------------------- |
|  콘솔   | `personal.importRawKey(keydata, passphrase)`                           |
|  RPC  | `{"method": "personal_importRawKey", "params": [keydata, passphrase]}` |

**매개변수**

| 이름         | 타입     | 설명                                                                                                                      |
| ---------- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| keydata    | string | 암호화되지 않은 개인키 (접두사 '0x'를 제거한 16진수 문자열) 또는 [Klaytn 지갑 키](../../../klaytn/design/accounts.md#klaytn-wallet-key-format)입니다. |
| passphrase | string | 암호화에 사용되는 비밀번호입니다.                                                                                                      |

**리턴값**

| 이름      | 타입     | 설명                 |
| ------- | ------ | ------------------ |
| address | string | 가져온 계정의 주소를 반환합니다. |

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

| 타입     | 설명                   |
| ------ | -------------------- |
| string | Klaytn 계정 주소의 목록입니다. |

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

## personal_listWallets <a id="personal_listwallets"></a>

Returns a list of wallets this node manages.

| 클라이언트 | 메서드 호출                                             |
|:-----:| -------------------------------------------------- |
|  콘솔   | `personal.listWallets`                             |
|  RPC  | `{"method": "personal_listWallets", "params": []}` |

**매개변수**

없음

**리턴값**

| 이름      | 타입     | 설명                             |
| ------- | ------ | ------------------------------ |
| URL     | string | Wallet url                     |
| Status  | string | Locking status                 |
| Failure | string | Error condition                |
| 계정      | string | The list of account addresses. |

**예시**

콘솔
``` javascript
> personal.listWallets
[
  {
    "url":"keystore:///", 
    "status":"Locked",
    "accounts":[{"address":"0x336010a2f91728ffe01414a87ae5d8af55f310c6","url":"keystore://"}]
  },
  ...
]
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_listWallets","params":[],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":[{"url":"keystore:///","status":"Locked","accounts":[{"address":"0x336010a2f91728ffe01414a87ae5d8af55f310c6","url":"keystore://"}]}]}
```

## personal_openWallet <a id="personal_openwallet"></a>

Initiates a hardware wallet opening procedure, establishing a USB connection and attempting to authenticate via the provided passphrase.

{% hint style="success" %}
NOTE: The method may return an extra challenge requiring a second open (e.g., the Trezor PIN matrix challenge).
{% endhint

| 클라이언트 | 메서드 호출                                                           |
|:-----:| ---------------------------------------------------------------- |
|  콘솔   | `personal.openWallet(url, passhrase)`                            |
|  RPC  | `{"method": "personal_openWallet", "params": [url, passphrase]}` |

**매개변수**

| 이름         | 타입     | 설명                    |
| ---------- | ------ | --------------------- |
| URL        | string | Wallet url            |
| Passphrase | string | passphrase for wallet |

**리턴값**

| 이름 | 타입    | 설명              |
| -- | ----- | --------------- |
| 에러 | error | Error condition |

**예시**

콘솔
``` javascript
> personal.openWallet("keystore://", "passphrase")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_openWallet","params":["keystore://", "passphrase"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":null}
```

## personal_deriveAccount <a id="personal_deriveaccount"></a>

Requests a HD wallet to derive a new account, optionally pinning it for later reuse.

| 클라이언트 | 메서드 호출                                                             |
|:-----:| ------------------------------------------------------------------ |
|  콘솔   | `personal.deriveAccount(url, path, pin)`                           |
|  RPC  | `{"method": "personal_deriveAccount", "params": [url, path, pin]}` |

**매개변수**

| 이름   | 타입      | 설명                 |
| ---- | ------- | ------------------ |
| URL  | string  | Wallet url         |
| path | string  | derivation path    |
| pin  | boolean | optionally pinning |

**리턴값**

| 이름          | 타입     | 설명                              |
| ----------- | ------ | ------------------------------- |
| 계정(Account) | string | The address of the new account. |
| 에러          | error  | Error condition                 |

**예시**

콘솔
``` javascript
> personal.deriveAccount(url, path, pin)
"result":"0xed1b12248aee85a32aead06c7789d3fcdcd4dae6"
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_deriveAccount","params":[url, path, pin],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"0xed1b12248aee85a32aead06c7789d3fcdcd4dae6"}
```

## personal_newAccount <a id="personal_newaccount"></a>

Generates a new private key and stores it in the key store directory. The key file is encrypted with the given passphrase. Returns the address of the new account.

At the Klaytn console, `newAccount` will prompt for a passphrase when it is not supplied as the argument.

| 클라이언트 | 메서드 호출                                                      |
|:-----:| ----------------------------------------------------------- |
|  콘솔   | `personal.newAccount(passphrase)`                           |
|  RPC  | `{"method": "personal_newAccount", "params": [passphrase]}` |

**매개변수**

| 이름         | 타입     | 설명                                              |
| ---------- | ------ | ----------------------------------------------- |
| passphrase | string | (optional) the pass phrase used for encryption. |

**리턴값**

| 타입     | 설명                              |
| ------ | ------------------------------- |
| string | The address of the new account. |

**예시**

콘솔
``` javascript
> personal.newAccount()
Passphrase:
Repeat passphrase:
"0x5e97870f263700f46aa00d967821199b9bc5a120"
```

The passphrase can also be supplied as a string.

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

Removes the private key with a given address from memory. The account can no longer be used to send transactions.

| 클라이언트 | 메서드 호출                                                    |
|:-----:| --------------------------------------------------------- |
|  콘솔   | `personal.lockAccount(address)`                           |
|  RPC  | `{"method": "personal_lockAccount", "params": [address]}` |

**매개변수**

| 이름      | 타입     | 설명                           |
| ------- | ------ | ---------------------------- |
| address | string | The account address to lock. |

**리턴값**

| 타입   | 설명                                                                |
| ---- | ----------------------------------------------------------------- |
| bool | `true` if the account was successfully locked, `false` otherwise. |

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

Decrypts the key with the given address from the key store.

Both passphrase and unlock duration are optional when using the JavaScript console. If the passphrase is not supplied as an argument, the console will prompt for the passphrase interactively.

The unencrypted key will be held in memory until the unlock duration expires. If the unlock duration defaults to 300 seconds. An explicit duration of zero seconds unlocks the key until the Klaytn local node exits.

The account can be used with `klay_sign` and `klay_sendTransaction` while it is unlocked.

| 클라이언트 | 메서드 호출                                                                            |
|:-----:| --------------------------------------------------------------------------------- |
|  콘솔   | `personal.unlockAccount(address, passphrase, duration)`                           |
|  RPC  | `{"method": "personal_unlockAccount", "params": [address, passphrase, duration]}` |

**매개변수**

| 이름         | 타입     | 설명                                                       |
| ---------- | ------ | -------------------------------------------------------- |
| address    | string | The account address to unlock.                           |
| passphrase | string | the passphrase used for the encryption.                  |
| duration   | int    | (optional) the unlock duration (default to 300 seconds). |

**리턴값**

| 타입   | 설명                                    |
| ---- | ------------------------------------- |
| bool | `true` if unlocked, `false` otherwise |

**예시**

콘솔
``` javascript
> personal.unlockAccount("0x5e97870f263700f46aa00d967821199b9bc5a120")
Unlock account 0x5e97870f263700f46aa00d967821199b9bc5a120
Passphrase:
true
```

Supplying the passphrase and unlock duration as arguments:

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

Replaces the encrypted key file in the key store with the given unencrypted private key (hex string without leading '0x') or a [Klaytn wallet key](../../../klaytn/design/accounts.md#klaytn-wallet-key-format), encrypting it with the new passphrase. It also receives the old passphrase to decrypt the old private key before replacement. If it is failed to decrypt, or can not find the matching account, it throws an error.

Returns the address of the replaced account if successful.

| 클라이언트 | 메서드 호출                                                                                    |
|:-----:| ----------------------------------------------------------------------------------------- |
|  콘솔   | `personal.replaceRawKey(keydata, oldPassphrase, newPassphrase)`                           |
|  RPC  | `{"method": "personal_replaceRawKey", "params": [keydata, oldPassphrase, newPassphrase]}` |

**매개변수**

| 이름            | 타입     | 설명                                                                                                                      |
| ------------- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| keydata       | string | 암호화되지 않은 개인키 (접두사 '0x'를 제거한 16진수 문자열) 또는 [Klaytn 지갑 키](../../../klaytn/design/accounts.md#klaytn-wallet-key-format)입니다. |
| oldPassphrase | string | The passphrase to decrypt the old private key.                                                                          |
| newPassphrase | string | The passphrase to encrypt the new private key.                                                                          |

**리턴값**

| 이름      | 타입     | 설명                                   |
| ------- | ------ | ------------------------------------ |
| address | string | The address of the replaced account. |

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

Validates the given passphrase and submits a [TxTypeAccountUpdate](../../../klaytn/design/transactions/basic.md#txtypeaccountupdate) transaction. The transaction object must have fields `from` and `key`. Other fields such as `gas`, `gasPrice`, and `nonce` are se internally if unspecified. If the passphrase is able to decrypt the private key belonging to `tx.from` and the transaction is verified, the transaction is signed and submitted onto the network. The account is not unlocked globally in the node and cannot be used in other RPC calls.

| 클라이언트 | 메서드 호출                                                                 |
|:-----:| ---------------------------------------------------------------------- |
|  콘솔   | `personal.sendAccountUpdate(tx, passphrase)`                           |
|  RPC  | `{"method": "personal_sendAccountUpdate", "params": [tx, passphrase]}` |

**매개변수**

| 이름         | 타입     | 설명                                                      |
| ---------- | ------ | ------------------------------------------------------- |
| tx         | string | 트랜잭션 객체입니다. `from` and `key` must be specified.         |
| passphrase | string | The passphrase to decrypt the private key of `tx.from`. |

**리턴값**

| 타입        | 설명                                                              |
| --------- | --------------------------------------------------------------- |
| 32바이트 문자열 | a transaction hash if succeeded. Otherwise, an error is raised. |

**예시**

콘솔
``` javascript
> var tx = {from: "0x391694e7e0b0cce554cb130d723a9d27458f9298", key:"0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8"}
undefined
> personal.sendAccountUpdate(tx, "passphrase")
0x8474441674cdd47b35b875fd1a530b800b51a5264b9975fb21129eeb8c18582f
```
HTTP RPC

**NOTE**: The function `klay.toPeb()` is not executable in HTTP RPC.
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sendAccountUpdate","params":[{"from":"0x1d4e05bb72677cb8fa576149c945b57d13f855e4","key":"0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8"}, "passphrase"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"0x26a7a8ba619a5e3e4d742c217f55f49591a5616b200c976bd58a966a05e294b7"}
```

## personal_sendTransaction <a id="personal_sendtransaction"></a>

Validates the given passphrase and submits a [TxTypeLegacy](../../../klaytn/design/transactions/basic.md#txtypelegacytransaction) transaction. The transaction object must have `from` and `to` except the case of contract deployment. `to` should be omitted if the transaction deploys a smart contract. If `value` is not specified, it will be set to zero internally. Other fields such as `gas`, `gasPrice`, and `nonce` are set to appropriate values internally if unspecified. If the passphrase is able to decrypt the private key belonging to `tx.from` and the transaction is verified, the transaction is signed and submitted onto the network. The account is not unlocked globally in the node and cannot be used in other RPC calls.

| 클라이언트 | 메서드 호출                                                               |
|:-----:| -------------------------------------------------------------------- |
|  콘솔   | `personal.sendTransaction(tx, passphrase)`                           |
|  RPC  | `{"method": "personal_sendTransaction", "params": [tx, passphrase]}` |

**매개변수**

| 이름         | 타입     | 설명                                                                                                        |
| ---------- | ------ | --------------------------------------------------------------------------------------------------------- |
| tx         | string | 트랜잭션 객체입니다. `from` is a required field. `to`, `value`, `gas`, `gasPrice` and `nonce` are optional fields. |
| passphrase | string | The passphrase to decrypt the private key of `tx.from`.                                                   |

**리턴값**

| 타입        | 설명                                                              |
| --------- | --------------------------------------------------------------- |
| 32바이트 문자열 | a transaction hash if succeeded. Otherwise, an error is raised. |

**예시**

콘솔
``` javascript
> var tx = {from: "0x391694e7e0b0cce554cb130d723a9d27458f9298", to: "0xafa3f8684e54059998bc3a7b0d2b0da075154d66", value: klay.toPeb(1.23, "KLAY")}
undefined
> personal.sendTransaction(tx, "passphrase")
0x8474441674cdd47b35b875fd1a530b800b51a5264b9975fb21129eeb8c18582f
```
HTTP RPC

**NOTE**: The function `klay.toPeb()` is not executable in HTTP RPC.
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sendTransaction","params":[{"from":"0x1d4e05bb72677cb8fa576149c945b57d13f855e4","to":"0xafa3f8684e54059998bc3a7b0d2b0da075154d66","value":"0x1230000000"},"passphrase"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"0x26a7a8ba619a5e3e4d742c217f55f49591a5616b200c976bd58a966a05e294b7"}
```

## personal_sendValueTransfer <a id="personal_sendvaluetransfer"></a>

Validates the given passphrase and submits a [TxTypeValueTransfer](../../../klaytn/design/transactions/basic.md#txtypevaluetransfer) transaction. The transaction object must have fields `from`, `to`, and `value`. Other fields such as `gas`, `gasPrice`, and `nonce` are set internally if unspecified. If the passphrase is able to decrypt the private key belonging to `tx.from` and the transaction is verified, the transaction is signed and submitted onto the network. The account is not unlocked globally in the node and cannot be used in other RPC calls.

| 클라이언트 | 메서드 호출                                                                 |
|:-----:| ---------------------------------------------------------------------- |
|  콘솔   | `personal.sendValueTransfer(tx, passphrase)`                           |
|  RPC  | `{"method": "personal_sendValueTransfer", "params": [tx, passphrase]}` |

**매개변수**

| 이름         | 타입     | 설명                                                       |
| ---------- | ------ | -------------------------------------------------------- |
| tx         | string | 트랜잭션 객체입니다. `from`, `to`, and `value` must be specified. |
| passphrase | string | The passphrase to decrypt the private key of `tx.from`.  |

**리턴값**

| 타입        | 설명                                                              |
| --------- | --------------------------------------------------------------- |
| 32바이트 문자열 | a transaction hash if succeeded. Otherwise, an error is raised. |

**예시**

콘솔
``` javascript
> var tx = {from: "0x391694e7e0b0cce554cb130d723a9d27458f9298", to: "0xafa3f8684e54059998bc3a7b0d2b0da075154d66", value: klay.toPeb(1.23, "KLAY")}
undefined
> personal.sendValueTransfer(tx, "passphrase")
0x8474441674cdd47b35b875fd1a530b800b51a5264b9975fb21129eeb8c18582f
```
HTTP RPC

**NOTE**: The function `klay.toPeb()` is not executable in HTTP RPC.
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sendValueTransfer","params":[{"from":"0x1d4e05bb72677cb8fa576149c945b57d13f855e4","to":"0xafa3f8684e54059998bc3a7b0d2b0da075154d66","value":"0x1230000000"},"passphrase"],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"0x26a7a8ba619a5e3e4d742c217f55f49591a5616b200c976bd58a966a05e294b7"}
```

## personal_sign <a id="personal_sign"></a>

The `sign` method calculates a Klaytn-specific signature with: `sign(keccak256("\x19Klaytn Signed Message:\n" + len(message) + message)))`

메시지에 접두사를 붙이면 계산된 서명 값이 Klaytn의 서명임을 알 수 있습니다. This prevents misuse where a malicious DApp can sign arbitrary data (*e.g.*, transaction) and use the signature to impersonate the victim.

See `personal_ecRecover` to verify the signature.

| 클라이언트 | 메서드 호출                                                                |
|:-----:| --------------------------------------------------------------------- |
|  콘솔   | `personal.sign(message, account, password)`                           |
|  RPC  | `{"method": "personal_sign", "params": [message, account, password]}` |

**매개변수**

| 이름       | 타입     | 설명                                           |
| -------- | ------ | -------------------------------------------- |
| 메시지      | string | A message to sign.                           |
| account  | string | 계정 주소.                                       |
| password | string | (optional) the pass phrase used for signing. |

**리턴값**

| 타입     | 설명           |
| ------ | ------------ |
| string | A signature. |

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

## personal_signTransaction <a id="personal_signtransaction"></a>

Sets default configuration and signs the given transaction.

{% hint style="success" %}
NOTE: Sending your account password over an unsecured HTTP RPC connection is highly unsecure. Use [klay_signTransaction](../klay/transaction#klay_signtransaction).
{% endhint %}

**매개변수**

필수적으로 있어야 하는 파라미터들은 트랜잭션 타입에 따라 다릅니다. [Working with Klaytn Transaction Types](./transaction/transaction-type-support.md)에서 적절한 파라미터를 확인하십시오.

**리턴값**

| 타입       | 설명                         |
| -------- | -------------------------- |
| raw      | 서명된 rawTransaction을 반환합니다. |
| tx       | Transaction object         |
| password | Sender's password          |


## personal_ecRecover <a id="personal_ecrecover"></a>

`ecRecover` returns the address associated with the private key that was used to calculate the signature in `personal_sign`.

| 클라이언트 | 메서드 호출                                                             |
|:-----:| ------------------------------------------------------------------ |
|  콘솔   | `personal.ecRecover(message, signature)`                           |
|  RPC  | `{"method": "personal_ecRecover", "params": [message, signature]}` |

**매개변수**

| 이름       | 타입     | 설명             |
| -------- | ------ | -------------- |
| 메시지      | string | A message.     |
| 서명 값입니다. | string | The signature. |

**리턴값**

| 타입     | 설명     |
| ------ | ------ |
| string | 계정 주소. |

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
