# Managing Accounts <a id="managing-accounts"></a>

## List Your Accounts <a id="list-your-accounts"></a>

This will return the list of all accounts created under the data directory.

### ken <a id="ken"></a>

From the command line, call the CLI with:

```bash
$ ken account list --datadir <DATADIR>
$ ken account list --datadir ~/kend_home
Account #0: {bfc22a57999459b0c2ce6337deb9287e7a970e02} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-02-58.524962000Z--bfc22a57999459b0c2ce6337deb9287e7a970e02
Account #1: {47bd2e9565cbe1789454718d6cf1778d7ea557aa} keystore:///Users/username/kend_home/keystore/UTC--2019-03-26T07-04-44.840061000Z--47bd2e9565cbe1789454718d6cf1778d7ea557aa
```

**NOTE**: This order of returned account list can change if you copy keystore files from other nodes or remove the files. Therefore, make sure you either do not rely on the index or make sure if you copy or remove keystore files you check and update your account indexes in your scripts.

### JavaScript Console <a id="javascript-console"></a>

Khi sử dụng bảng điều khiển:

```javascript
> klay.accounts
["bfc22a57999459b0c2ce6337deb9287e7a970e02", "47bd2e9565cbe1789454718d6cf1778d7ea557aa"]
```

## Mở khóa tài khoản <a id="unlock-accounts"></a>

Nếu bạn muốn sử dụng một tài khoản theo cách không có tương tác, bạn cần phải mở khóa tài khoản.

### ken <a id="ken"></a>

Bạn có thể mở khóa các tài khoản và bắt đầu EN trên dòng lệnh bằng tùy chọn `--unlock "{address},{address}"`, dòng lệnh này sẽ nhận danh sách tài khoản được phân tách bằng dấu phẩy \(ở dạng hex hoặc chỉ mục\) làm đối số để có thể mở khóa tài khoản theo chương trình cho một phiên. Việc này rất hữu ích nếu bạn muốn dùng tài khoản của mình từ dApp thông qua RPC. `--unlock` sẽ mở khóa tài khoản đầu tiên trong danh sách. Việc này rất hữu ích khi bạn đã tạo tài khoản của mình theo chương trình, bạn không cần biết tài khoản thực để có thể mở khóa.

Tạo một tài khoản và bắt đầu một nút với tài khoản đã mở khóa:

```bash
$ ken account new --password <(echo this is not secret) --datadir <DATADIR>
$ ken --password <(echo "this is not secret") --unlock primary --datadir <DATADIR> --rpccorsdomain localhost --verbosity 6 2>> log.log
```

Nếu bạn muốn bắt đầu một nút với một tài khoản đã mở khóa cụ thể, bạn có thể dùng một địa chỉ hoặc chỉ mục đề cập tới vị trí địa chỉ trong danh sách tài khoản \(và tương ứng với thứ tự được tạo ra\).

```bash
$ ken --unlock "0" --datadir <DATADIR>
$ ken --unlock "2" --datadir <DATADIR>
$ ken --unlock "bfc22a57999459b0c2ce6337deb9287e7a970e02" --datadir <DATADIR>
```

Dòng lệnh này cho phép bạn mở khóa nhiều tài khoản khác nhau. Trong trường hợp này, đối số để mở khóa là danh sách địa chỉ hoặc chỉ mục tài khoản được phân tách bằng dấu phẩy.

```bash
$ ken --unlock "0x407d73d8a49eeb85d32cf465507dd71d507100c1,0,5,e470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32" --datadir <DATADIR>
```

Nếu cấu trúc này được sử dụng theo cách không có tương tác, tập tin mật khẩu của bạn sẽ phải chứa mật khẩu tương ứng cho các tài khoản cần dùng, mỗi mật khẩu một dòng.

### Bảng điều khiển JavaScript <a id="javascript-console"></a>

Trên bảng điều khiển, bạn cũng có thể mở khóa các tài khoản \(từng tài khoản một\) trong một khoảng thời gian \(bằng giây\).

```javascript
> personal.unlockAccount(address, "password", 300)
```

Hãy lưu ý là chúng tôi KHÔNG khuyến khích việc sử dụng đối số mật khẩu ở đây, vì lịch sử của bảng điều khiển được ghi lại, tài khoản của bạn có thể gặp rủi ro. Bạn đã được cảnh báo.

## Kiểm tra số dư tài khoản <a id="check-account-balance"></a>

### ken <a id="ken"></a>

n/a

### Bảng điều khiển JavaScript <a id="javascript-console"></a>

Để kiểm tra số dư tài khoản:

```javascript
> klay.fromPeb(klay.getBalance("{account}"), "KLAY")
6.5
```

In tất cả số dư bằng hàm JavaScript:

```javascript
function checkAllBalances() {
    var totalBal = 0;
    for (var acctNum in klay.accounts) {
        var acct = klay.accounts[acctNum];

        var acctBal = klay.fromPeb(klay.getBalance(acct), "KLAY");
        totalBal += parseFloat(acctBal);

        console.log("klay.accounts[" + acctNum + "]: \t" + acct + " \tbalance: " + acctBal + "KLAY");

    }

    console.log("Total balance: " + totalBal + " KLAY");
};
```

Sau đó lệnh này có thể được thực thi kèm:

```javascript
> checkAllBalances();
klay.accounts[0]: 0xd1ade25ccd3d550a7eb532ac759cac7be09c2719  balance: 63.11848 KLAY
klay.accounts[1]: 0xda65665fc30803cb1fb7e6d86691e20b1826dee0  balance: 0 KLAY
klay.accounts[2]: 0xe470b1a7d2c9c5c6f03bbaa8fa20db6d404a0c32  balance: 1 KLAY
klay.accounts[3]: 0xf4dd5c3794f1fd0cdc0327a83aa472609c806e99  balance: 6 KLAY
```

Vì hàm này sẽ biến mất sau khi khởi động lại `ken`, có thể sẽ hữu ích nếu bạn lưu trữ các hàm thường dùng để sử dụng sau này.

Đầu tiên, hãy lưu định nghĩa hàm `checkAllBalances()` vào một tập tin trên máy tính. Ví dụ: `/Users/username/klayload.js`. Sau đó tải tập tin này từ bảng điều khiển tương tác:

```javascript
> loadScript("/Users/username/klayload.js")
true
```

The file will modify your JavaScript environment as if you have typed the commands manually. Feel free to experiment!

