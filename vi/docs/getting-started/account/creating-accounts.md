# Tạo tài khoản <a id="creating-accounts"></a>

## Tạo tài khoản mới <a id="creating-a-new-account"></a>

Việc này sẽ tạo một tài khoản mới và in địa chỉ lên màn hình. Một tập tin kho khóa sẽ được bảo ra bên dưới thư mục dữ liệu.

**Tập tin kho khóa Klaytn**

Khi bạn tạo một tài khoản, một tập tin kho khóa sẽ được tạo ra. Tập tin kho khóa là phiên bản được mã hóa của khóa riêng tư Klaytn của bạn mà bạn sẽ dùng để ký các giao dịch của mình. Tên của tập tin kho khóa có định dạng sau:

* `UTC--<created_at UTC ISO8601>-<address hex>`

Việc chuyển toàn bộ thư mục hoặc tập tin kho khóa riêng lẻ trong đó giữa các nút Klaytn là an toàn. Hãy lưu ý rằng trong trường hợp bạn đang thêm khóa vào nút của mình từ một nút khác, thứ tự của các tài khoản có thể thay đổi. Vì thế, hãy đảm bảo là bạn không dựa vào chỉ mục trong đoạn mã hoặc tập lệnh của mình.

### ken <a id="ken"></a>

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --password <passwordfile> --datadir <DATADIR>
$ ken account new --password <(echo $mypassword) --datadir <DATADIR>
```

**`WARNING`**: Note that using a password file is meant for testing only; it is a bad idea to save your password in a file or expose it in any other way. If you use the password flag with a password file, best to make sure the file is not readable or even listable for anyone but you. You achieve this with:

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

You can import an account using a keyfile. The keyfile is assumed to contain an unencrypted private key as canonical EC raw bytes encoded into hex. In simpler terms, it is a private key in plain text without the leading `0x`.

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



