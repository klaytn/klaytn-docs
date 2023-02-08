---
description: >-
  ノードのアカウントと秘密鍵を管理するためのAPI。
---

# ネームスペース個人 <a id="namespace-personal"></a>

名前空間 `個人用` はキーストアの秘密鍵を管理します。


## personal_importRawKey <a id="personal_importrawkey"></a>

Imports the given unencrypted private key (hex string without leading '0x') or a [Klaytn wallet key](../../../klaytn/design/accounts.md#klaytn-wallet-key-format) into the key store, encrypting it with the passphrase.

インポートされたアカウントのアドレスを返します。

| Client  | Method invocation                                                      |
|:-------:| ---------------------------------------------------------------------- |
| Console | `personal.importRawKey(keydata, passsphrase)`                          |
|   RPC   | `{"method": "personal_importRawKey", "params": [keydata, passphrase]}` |

**Parameters**

| Name    | Type   | Description                                                                                                       |
| ------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| keydata | string | 暗号化されていない秘密鍵('0x'を先頭に置かずの16進文字列)または [Klaytnウォレットキー](../../../klaytn/design/accounts.md#klaytn-wallet-key-format)。 |
| パスワード   | string | 暗号化のパスフレーズ。                                                                                                       |

**Return Value**

| Name    | Type   | Description        |
| ------- | ------ | ------------------ |
| address | string | インポートされたアカウントのアドレス |

**Example**

Console
```javascript
> personal.importRawKey('{private key}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"

// Klaytnウォレットキーの使用
> personal.importRawKey('{private key}0x000x{address}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef36d32"
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_importRawKey","params":["{private key}", "mypassword"],"id":1}) https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c44464378a1673ef"}
$ curl -H "Content-Type: application/json" ---data '{"jsonr ","method":"personal_importRawKey","params":["{private key}0x000x{address}", "mypassword"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":2.0","id":1,"result":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673"}
```

## 個人用リストアカウント <a id="personal_listaccounts"></a>

キーストアのすべてのキー のすべての Klaytn アカウントアドレスを返します。

| Client  | Method invocation                                   |
|:-------:| --------------------------------------------------- |
| Console | `personal.listAccounts`                             |
|   RPC   | `{"method": "personal_listAccounts", "params": []}` |

**Parameters**

None

**Return Value**

| Type   | Description             |
| ------ | ----------------------- |
| string | すべてのKlaytnアカウントアドレスのリスト |

None

**Example**

Console
```javascript
> personal.listAccounts
["0x5e97870f263700f46aa00d967821199b9bc5a120", "0x3d80b31a78c30fc628f20b2c89d7ddbf6e53ced"]
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_listAccounts","params":[],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":["0xd8d81f52b595cc6135177c9c34ae6130ecad46",36","0xda04fb00e2cb5745cef7d8c4464378202a167ef"]}
```

## 個人用リストウォレット(_L) <a id="personal_listwallets"></a>

このノードが管理するウォレットのリストを返します。

| Client  | Method invocation                                  |
|:-------:| -------------------------------------------------- |
| Console | `personal.listWallets`                             |
|   RPC   | `{"method": "personal_listWallets", "params": []}` |

**Parameters**

None

**Return Value**

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| URL      | string | ウォレットURL    |
| ステータス    | string | ロック状態にする    |
| 失敗       | string | エラーの条件      |
| Accounts | string | 口座住所のリストです。 |

**Example**

Console
``` javascript
> personal.listWallets
[
  {
    "url":"keystore://", 
    "status":"Locked",
    "accounts":"0x336010a2f91728ffe01414a87ae5d8af55f310c6","url":"keystore://"}]
  },
...
]
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_listWallets","params":[],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":[{"url":"keystore:///","status":"ロックされている","accounts":[{"accounts":"0x336010a2f91728ffe014a87ae5d8af55f310c6",",
```

## Personal_openWallet <a id="personal_openwallet"></a>

USB接続を確立し、提供されたパスフレーズを介して 認証を試みるハードウェアウォレットを開く手順を開始します。

{% hint style="success" %}
注意: このメソッドは、2回目のオープンを必要とする追加のチャレンジを返す場合があります(例: Trezor PINマトリクスチャレンジ)。
{% endhint %}

| Client  | Method invocation                                                |
|:-------:| ---------------------------------------------------------------- |
| Console | `personal.openWallet(url, passhrase)`                            |
|   RPC   | `{"method": "personal_openWallet", "params": [url, passphrase]}` |

**Parameters**

| Name  | Type   | Description |
| ----- | ------ | ----------- |
| URL   | string | Wallet url  |
| パスワード | string | ウォレットのパスワード |

**Return Value**

| Name  | Type | Description     |
| ----- | ---- | --------------- |
| Error | エラー  | Error condition |

**Example**

Console
``` javascript
> personal.openWallet("keystore://", "passphrase")
null
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_openWallet","params":["keystore://", "pasphrase"],"id":1}) https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":null}
```

## personal_deriveAccount <a id="personal_deriveaccount"></a>

HDウォレットに新しいアカウントを作成するよう要求し、後で再利用するために必要に応じてピン留めします。

| Client  | Method invocation                                                  |
|:-------:| ------------------------------------------------------------------ |
| Console | `personal.deriveAccount(url, path, pin)`                           |
|   RPC   | `{"method": "personal_deriveAccount", "params": [url, path, pin]}` |

**Parameters**

| Name | Type    | Description |
| ---- | ------- | ----------- |
| URL  | string  | Wallet url  |
| 小道   | string  | 派生パス        |
| ピン   | boolean | 任意で固定する     |

**Return Value**

| Name    | Type   | Description     |
| ------- | ------ | --------------- |
| Account | string | 新しいアカウントのアドレス   |
| Error   | error  | Error condition |

**Example**

Console
``` javascript
> personal.deriveAccount(url, path, pin)
"result":"0xed1b12248aee85a32aead06c7789d3fcd4dae6"
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_deriveAccount","params":[url, path, pin],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":"0xed1b12248aee85a32aead06c7789d3fcd4dae6}
```

## personal_newAccount <a id="personal_newaccount"></a>

新しい秘密鍵を生成し、キーストアディレクトリに保存します。 キーファイルは、与えられたパスフレーズで暗号化されます。 新しいアカウントのアドレスを返します。

At the Klaytn console, `newAccount` will prompt for a passphrase when it is not supplied as the argument.

| Client  | Method invocation                                           |
|:-------:| ----------------------------------------------------------- |
| Console | `personal.newAccount(passphrase)`                           |
|   RPC   | `{"method": "personal_newAccount", "params": [passphrase]}` |

**Parameters**

| Name       | Type   | Description              |
| ---------- | ------ | ------------------------ |
| passphrase | string | (オプション) 暗号化に使用されるパスフレーズ。 |

**Return Value**

| Type   | Description                     |
| ------ | ------------------------------- |
| string | The address of the new account. |

**Example**

Console
``` javascript
> personal.newAccount()
Passphrase:
Repeat passphrase:
"0x5e97870f263700f46aa00d967821199b9bc5a120"
```

パスフレーズは文字列として入力することもできます。

``` javascript
> personal.newAccount("h4ck3r")
"0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedced"
```
HTTP RPC

```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_newAccount","params":["helloWorld"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":"0xed1b12248aee85ae32aead06c7789d3fcd4dae6}
```


## personal_lockAccount <a id="personal_lockaccount"></a>

メモリから指定されたアドレスの秘密鍵を削除します。 取引を送信するためにアカウントを使用することはできません。

| Client  | Method invocation                                         |
|:-------:| --------------------------------------------------------- |
| Console | `personal.lockAccount(address)`                           |
|   RPC   | `{"method": "personal_lockAccount", "params": [address]}` |

**Parameters**

| Name    | Type   | Description     |
| ------- | ------ | --------------- |
| address | string | ロックするアカウントのアドレス |

**Return Value**

| Type | Description                                        |
| ---- | -------------------------------------------------- |
| bool | `アカウントが正常にロックされていれば` true `、それ以外の場合は` false になります。 |

**Example**

Console
```javascript
> personal.lockAccount("0xfa415bb3e6231f488ff39eb2897db0ef36dd32")
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_lockAccount","params":["0xda04fb00e2cb5745cef7d8c4464378202a167ef"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":true}
```


## personal_unlockAccount <a id="personal_unlockaccount"></a>

キーストアから指定されたアドレスでキーを復号します。

JavaScript コンソールを使用する場合は、パスフレーズとロック解除の両方の期間が任意です。 パスフレーズが引数として指定されていない場合は、コンソールは パスフレーズをインタラクティブに入力します。

ロック解除の有効期限が切れるまで暗号化されていないキーはメモリに保持されます。 ロック解除時間がデフォルトで300秒に設定されている場合。 ゼロ秒の明示的な長さ は、Klaytn ローカルノードが終了するまでキーをロック解除します。

`klay_sign` および `klay_sendTransaction` でロック解除中にアカウントを使用できます。

| Client  | Method invocation                                                                 |
|:-------:| --------------------------------------------------------------------------------- |
| Console | `personal.unlockAccount(アドレス、パスフレーズ、期間)`                                          |
|   RPC   | `{"method": "personal_unlockAccount", "params": [address, passphrase, duration]}` |

**Parameters**

| Name       | Type   | Description                    |
| ---------- | ------ | ------------------------------ |
| address    | string | ロックを解除するアカウントのアドレス             |
| passphrase | string | 暗号化に使われるパスフレーズです               |
| 期間         | int    | (オプション) ロック解除時間 (デフォルトでは300秒)。 |

**Return Value**

| Type | Description                  |
| ---- | ---------------------------- |
| bool | `ロック解除された場合は true` 、 `false` |

**Example**

Console
``` javascript
> personal.unlockAccount("0x5e97870f263700f46aa00d967821199b9bc5a120")
Unlock account 0x5e97870f263700f46aa00d967821199b9bc5a120
Passphrase:
true
```

パスフレーズを提供し、引数としてのロック解除期間:

``` javascript
> personal.unlockAccount("0x5e97870f263700f46aa00d967821199b9bc5a120", "foo", 30)
true
```

パスフレーズを入力し、デフォルトのロック解除期間を上書きしたい場合は、 パスフレーズとして `null` を渡します。

```
> personal.unlockAccount("0x5e97870f263700f46aa00d967821199b9bc5a120", null, 30)
Unlock account 0x5e97870f263700f46aa00d967821199b9bc5a120
Passphrase:
true
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_unlockAccount","params":["0xda04fb00e2cb5745cef7d8c4464378202a167ef","mypassword"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0",","id":1,"result":true}
```

## personal_replaceRawKey <a id="personal_replacerawkey"></a>

Replaces the encrypted key file in the key store with the given unencrypted private key (hex string without leading '0x') or a [Klaytn wallet key](../../../klaytn/design/accounts.md#klaytn-wallet-key-format), encrypting it with the new passphrase. また、交換前に古い秘密鍵を復号するための古いパスフレーズを受け取ります。 復号に失敗した場合、または一致するアカウントが見つからない場合、エラーが発生します。

成功した場合は、置き換えられたアカウントのアドレスを返します。

| Client  | Method invocation                                                                         |
|:-------:| ----------------------------------------------------------------------------------------- |
| Console | `personal.replaceRawKey(keydata, oldPassphrase, newPassphrase)`                           |
|   RPC   | `{"method": "personal_replaceRawKey", "params": [keydata, oldPassphrase, newPassphrase]}` |

**Parameters**

| Name          | Type   | Description                                                                                                                                          |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| keydata       | string | The unencrypted private key (hex string without leading '0x') or a [Klaytn wallet key](../../../klaytn/design/accounts.md#klaytn-wallet-key-format). |
| oldPassphrase | string | 古い秘密鍵を復号するためのパスフレーズ。                                                                                                                                 |
| newPassphrase | string | 新しい秘密鍵を暗号化するためのパスフレーズ。                                                                                                                               |

**Return Value**

| Name    | Type   | Description        |
| ------- | ------ | ------------------ |
| address | string | 置き換えられたアカウントのアドレス。 |

**Example**

Console
```javascript
> personal.replaceRawKey('{private key}', 'myoldpassword', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
> personal.replaceRawKey('{private key}0x000x{address}', 'myoldpassword', 'mypassword')
"0xfa415b3e6231f488ff39eb2897db0ef3636d32"
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_replaceRawKey","params":[]{private key}", "myoldpassword", mypassword"],"id":1}) https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378a1673ef"}
$ curl -H "Content-Type: application/json" --json" ","method":"personal_replaceRawKey","params":["{private key}0x000x{address}", "myoldpassword", mypassword"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
```

## personal_sendAccountUpdate <a id="personal_sendaccountupdate"></a>

与えられたパスフレーズを検証し、 [TxTypeAccountUpdate](../../../klaytn/design/transactions/basic.md#txtypeaccountupdate) トランザクションを送信します。 The transaction object must have fields `from` and `key`. `gas`, `gasPrice`, and `nonce` のような他のフィールドは、指定されていない場合は内部的に se です。 If the passphrase is able to decrypt the private key belonging to `tx.from` and the transaction is verified, the transaction is signed and submitted onto the network. このアカウントはノードでグローバルにロック解除されておらず、他のRPC呼び出しでは使用できません。

| Client  | Method invocation                                                      |
|:-------:| ---------------------------------------------------------------------- |
| Console | `personal.sendAccountUpdate(tx, passphrase)`                           |
|   RPC   | `{"method": "personal_sendAccountUpdate", "params": [tx, passphrase]}` |

**Parameters**

| Name       | Type   | Description                              |
| ---------- | ------ | ---------------------------------------- |
| tx         | string | トランザクションオブジェクト `から` と `キー` を指定する必要があります。 |
| passphrase | string | `tx.from` の秘密鍵を復号するためのパスフレーズ。            |

**Return Value**

| Type     | Description                                   |
| -------- | --------------------------------------------- |
| 32バイト文字列 | 成功した場合はトランザクションハッシュを入力します。 そうでなければ、エラーが発生します。 |

**Example**

Console
``` javascript
> var tx = {from: "0x391694e7e0b0cce554cb130d723a9d27458f9298", key:"0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8"}
undefined
> personal.sendAccountUpdate(tx, "pasphrase")
0x847441674cd47b35b875fd1a530b800b51a5264b99fb75fb129e8c18582f
```
HTTP RPC

**注**: 関数 `klay.toPeb()` は HTTP RPCでは実行できません。
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sendAccountUpdate","params":[{"from":"0x1d4e05bb72677cb8fa576149c945b57d13f855e4","key":"0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8"}, "passphrase"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":"0x26a7a8ba619a5e3e4d742c217f55f49591a5616b200c976bd58a966a05e294b7"}
```

## personal_sendTransaction <a id="personal_sendtransaction"></a>

与えられたパスフレーズを検証し、 [TxTypeLegacy](../../../klaytn/design/transactions/basic.md#txtypelegacytransaction) トランザクションを送信します。 The transaction object must have `from` and `to` except the case of contract deployment. `to` は、トランザクションがスマートコントラクトを展開する場合は省略する必要があります。 `値` が指定されていない場合、内部的に 0 に設定されます。 `ガス`、 `gasPrice`、 `nonce` などの他のフィールドは、未指定の場合、内部で適切な値に設定されます。 パスフレーズが `txに属する秘密鍵を復号できる場合。 ROM<code>` とトランザクションが検証され、トランザクションが署名され、ネットワークに送信されます。 The account is not unlocked globally in the node and cannot be used in other RPC calls.

| Client  | Method invocation                                                     |
|:-------:| --------------------------------------------------------------------- |
| Console | `personal.sendTransaction(tx, passsphrase)`                           |
|   RPC   | `{"method": "personal_sendTransaction", "params": [tx, passsphrase]}` |

**Parameters**

| Name       | Type   | Description                                                                                   |
| ---------- | ------ | --------------------------------------------------------------------------------------------- |
| tx         | string | A transaction object. `の` は必須フィールドです。 `to`, `value`, `gas`, `gasPrice` と `nonce` は任意のフィールドです。 |
| passphrase | string | The passphrase to decrypt the private key of `tx.from`.                                       |

**Return Value**

| Type           | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| 32-byte string | a transaction hash if succeeded. Otherwise, an error is raised. |

**Example**

Console
``` javascript
> var tx = {from: "0x391694e7e0b0cce554cb130d723a9d27458f9298", to: "0xafa3f8684e54059998bc3a7b0d2b0da075154d66", value: klay.toPeb(1.23, KLAY")}
undefined
> personal.sendTransaction(tx, "passphrase")
0x8474441674cd47b35b875fd1a530b800b51a5264b9975fb21129eeb8c582f
```
HTTP RPC

**NOTE**: The function `klay.toPeb()` is not executable in HTTP RPC.
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sendTransaction","params":[{"from":"0x1d4e05bb72677cb8fa576149c945b57d13f855e4","to","to":":"0xafa3f8684e54059998bc3a7b0d2b0da015475d66","value":"0x1230000000},"sphrase"],"id":1}) https://api.baab.klaynet:8651
{
```

## personal_sendValueTransfer <a id="personal_sendvaluetransfer"></a>

与えられたパスフレーズを検証し、 [TxTypeValueTransfer](../../../klaytn/design/transactions/basic.md#txtypevaluetransfer) トランザクションを送信します。 トランザクションオブジェクトには、フィールド ``、 `から`、および `値` が必要です。 `ガス`、 `gasPrice`、および `nonce` などの他のフィールドは、指定されていない場合に内部的に設定されます。 If the passphrase is able to decrypt the private key belonging to `tx.from` and the transaction is verified, the transaction is signed and submitted onto the network. The account is not unlocked globally in the node and cannot be used in other RPC calls.

| Client  | Method invocation                                                       |
|:-------:| ----------------------------------------------------------------------- |
| Console | `personal.sendValueTransfer(tx, passphrase)`                            |
|   RPC   | `{"method": "personal_sendValueTransfer", "params": [tx, passsphrase]}` |

**Parameters**

| Name       | Type   | Description                                             |
| ---------- | ------ | ------------------------------------------------------- |
| tx         | string | A transaction object. ``, `,`, `の値` を指定する必要があります。       |
| passphrase | string | The passphrase to decrypt the private key of `tx.from`. |

**Return Value**

| Type           | Description                                                     |
| -------------- | --------------------------------------------------------------- |
| 32-byte string | a transaction hash if succeeded. Otherwise, an error is raised. |

**Example**

Console
``` javascript
> var tx = {from: "0x391694e7e0b0cce554cb130d723a9d27458f9298", to: "0xafa3f8684e54059998bc3a7b0d2b0da075154d66", value: klay.toPeb(1.23, KLAY")}
undefined
> personal.sendValueTransfer(tx, "passphrase")
0x8474441674cd47b35b875fd1a530b800b51a5264b9975fb21129eeb8c18582f
```
HTTP RPC

**NOTE**: The function `klay.toPeb()` is not executable in HTTP RPC.
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sendValueTransfer","params":[{"from":"0x1d4e05bb72677cb8fa576149c945b57d13f855e4","to":"0xafa3f8684e54059998bc3a7b0d2b0da075154d66","value":"0x1230000000"},"passphrase"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":"0x26a7a8ba619a5e3e4d742c217f55f49591a5616b200c976bd58a966a05e294b7"}
```

## 個人の署名 <a id="personal_sign"></a>

`sign` メソッドは Klaytn 固有の署名を計算します: `sign(keccak256("\x19Klaytn 署名されたメッセージ:\n" + len(message) + message)))`

Adding a prefix to the message makes the calculated signature recognizable as a Klaytn-specific signature. This prevents misuse where a malicious DApp can sign arbitrary data (*e.g.*, transaction) and use the signature to impersonate the victim.

`personal_ecRecover` を参照して署名を検証してください。

| Client  | Method invocation                                                     |
|:-------:| --------------------------------------------------------------------- |
| Console | `personal.sign(message, account, password)`                           |
|   RPC   | `{"method": "personal_sign", "params": [message, account, password]}` |

**Parameters**

| Name    | Type   | Description     |
| ------- | ------ | --------------- |
| message | string | 署名するメッセージ。      |
| account | string | アカウントのアドレス      |
| パスワード   | string | 署名に使用されるパスフレーズ。 |

**Return Value**

| Type   | Description |
| ------ | ----------- |
| string | 署名          |

**Example**

Console
``` javascript
> personal.sign("0xdeadbeaf", "0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "")
"0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sign","params":["0xdead","0xda04fb00e2cb5745cef7d8c4464378202a167ef","mypassword"],"id":1}' https://apbaobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":"0xccb8cce176b01fdc8f7ac3c101b8eb3900b5e938a60800e5
```

## personal_signTransaction <a id="personal_signtransaction"></a>

デフォルトの設定と指定されたトランザクションに署名します。

{% hint style="success" %}
注意: 安全でないHTTPRPC接続を介してアカウントパスワードを送信することは非常に安全ではありません。 [klay_signTransaction](./klay/transaction.md#klay_signtransaction) を使用してください。
{% endhint %}

**Parameters**

The required parameters depend on the transaction type. [Klaytn Transaction Types](./klay/transaction/transaction-type-support.md) で適切なパラメータを確認してください。

**Return Value**

| Type     | Description            |
| -------- | ---------------------- |
| raw      | Signed raw transaction |
| tx       | トランザクションオブジェクト         |
| password | 送付者のパスワード              |


## personal_ecRecover <a id="personal_ecrecover"></a>

`ecRecover` は、 `personal_sign` で署名を計算するために使用された秘密鍵に関連付けられたアドレスを返します。

| Client  | Method invocation                                                  |
|:-------:| ------------------------------------------------------------------ |
| Console | `personal.ecRecover(メッセージ、署名)`                                     |
|   RPC   | `{"method": "personal_ecRecover", "params": [message, signature]}` |

**Parameters**

| Name      | Type   | Description |
| --------- | ------ | ----------- |
| message   | string | メッセージ。      |
| signature | string | 署名。         |

**Return Value**

| Type   | Description          |
| ------ | -------------------- |
| string | The account address. |

**Example**

Console

``` javascript
> personal.sign("0xdeadbeaf", "0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "")
"0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
> personal.ecRecover("0xdeadbeaf", "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b")
"0x9b2055d370f73ec7d8a03e965129118dc8f5bf83"
```
HTTP RPC
```shell
$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_sign","params":["0xdead","0xda04fb00e2cb5745cef7d8c4464378202a1673ef","mypassword"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":"0xccb8cce176b01fdc8f7ac3c101b8eb3b9005e938a60800e517624419dd8b7fba0e4598bdf1c4fa1743e1288e89b8b7090cc11f4b3640aafcbc71896ec73eec241b"}

$ curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_ecRecover","params":["0xdead","0xccb8cce176b01fdc8f7ac3c101b8eb3b9005e938a60800e517624419dd8b7fba0e4598bdf1c4fa1743e1288e89b8b7090cc11f4b3640aafcbc71896ec73eec241b"],"id":1}' https://api.baobab.klaytn.net:8651
{"jsonrpc":"2.0","id":1,"result":"0xda04fb00e2cb5745cef7d8c4464378202a1673ef"}
```
