# Creating Accounts

## 새 계정 만들기 <a id="creating-a-new-account"></a>

이렇게 하면 새 계정이 만들어지고 화면에 주소가 인쇄됩니다. 키스토어(keystore) 파일은 데이터 디렉토리 아래에 작성됩니다.

**Klaytn 키스토어 파일**

계정을 생성하면, 키스토어 파일이 생성됩니다. 키스토어 파일은 거래를 서명하는 데 사용할 고유한 Klaytn 개인키의 암호화 버전입니다. 키스토어 파일 이름의 형식은 다음과 같습니다.

* `UTC--<created_at UTC ISO8601>-<address hex>`

Klaytn 노드들 간에 전체 디렉토리 또는 개별 키스토어 파일을 전송하는 것이 안전합니다. 다른 노드에서 노드에 키들을 추가하는 경우 계정 순서가 변경 될 수 있음에 주의하세요. 따라서 스크립트 또는 코드 조각의 인덱스(index)에 의존하지 않아야 합니다.

### ken <a id="ken"></a>

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --password <passwordfile> --datadir <DATADIR>
$ ken account new --password <(echo $mypassword) --datadir <DATADIR>
```

**`WARNING`**: Note that using a password file is meant to be used for testing only, it is a bad idea to save your password to a file or expose it in any other way. If you use the password flag with a password file, best to make sure the file is not readable or even listable for anyone but you. You achieve this with:

```bash
$ touch /path/to/password
$ chmod 700 /path/to/password
$ cat > /path/to/password
I type my pass here
^D
```

### JavaScript Console <a id="javascript-console"></a>

On the console, you can call the following function to create an account:

```javascript
> personal.newAccount("passphrase")
```

The account is saved in an encrypted format. You **must** remember this passphrase to unlock your account in the future.

## Importing an Account <a id="importing-an-account"></a>

You can import an account using a keyfile. The keyfile is assumed to contain an unencrypted private key as canonical EC raw bytes encoded into hex. In a simpler term, it is a private key in a plain text without leading `0x`.

This imports an unencrypted private key from the given keyfile, creates a new account, generates a keystore file under the data directory, and prints the address in the console. You must remember the passphrase to unlock your account in the future.

**NOTE**: If you can directly copy your keystore files to another Klaytn instance, this import/export mechanism is not needed.

### ken <a id="ken-1"></a>

```bash
$ ken account import <keyfile> --datadir <DATADIR>
$ ken account import --password <passwordfile> <keyfile> --datadir <DATADIR>
```

### JavaScript Console <a id="javascript-console-1"></a>

```bash
> personal.importRawKey('{private key}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"​

// Using a Klaytn wallet key
> personal.importRawKey('{private key}0x000x{address}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```