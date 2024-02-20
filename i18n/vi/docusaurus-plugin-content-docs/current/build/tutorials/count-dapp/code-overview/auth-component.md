# Thành phần xác thực

`src/components/Auth.js`:

## Thành phần `Xác thực` <a href="#auth-component" id="auth-component"></a>

1\) Hình nền\
2\) Tổng quan thành phần `Auth`\
3\) Tính năng thành phần `Auth`: Người dùng có thể nhập khóa riêng tư để đăng nhập.\
4\) Tính năng thành phần `Auth`: Người dùng có thể nhập tập tin lưu trữ khóa và nhập mật khẩu để đăng nhập.\
5\) Tính năng thành phần `Auth`: Người dùng có thể đăng xuất và xóa thông tin phiên bản ví khỏi trình duyệt.

### 1. Hình nền <a href="#1-background" id="1-background"></a>

Trong ứng dụng trên nền tảng blockchain, chúng tôi thường tương tác với hợp đồng thông minh.\
Có 2 loại tương tác với hợp đồng.\ `1) Đọc dữ liệu từ hợp đồng.` `2) Ghi dữ liệu vào hợp đồng.`

Không tốn chi phí để đọc dữ liệu từ hợp đồng.\
Tuy nhiên, có chi phí cho việc ghi dữ liệu vào hợp đồng.

cf) `Gửi giao dịch`\
Ghi dữ liệu vào hợp đồng hoặc blockchain được gọi là 'gửi giao dịch'.\ Ví dụ: Nếu bạn gửi 5 KLAY cho bạn của mình, bạn có thể coi là `ghi dữ liệu vào blockchain là tôi đã gửi 5 KLAY cho bạn của mình`.\
Tương tự với cách gọi phương pháp hợp đồng. Bạn có thể coi là `ghi dữ liệu vào hợp đồng là tôi đặt giá trị của biến X bằng 100`. Tất cả các hành động liên quan đến việc ghi dữ liệu vào blockchain hoặc hợp đồng đều được gọi là `gửi giao dịch`.

Để ghi dữ liệu vào hợp đồng, bạn nên có một tài khoản Klaytn có số dư KLAY để thanh toán phí giao dịch.\
Thành phần `Xác thực` sẽ giúp bạn đăng nhập vào ứng dụng.

### 2. Tổng quan thành phần`Auth` <a href="#2-auth-component-overview" id="2-auth-component-overview"></a>

Thành phần `'Auth.js'` là mã lệnh dài nhất trong ứng dụng hướng dẫn của chúng tôi, vì thế chúng tôi sẽ chia nhỏ đoạn mã lệnh ra và thực hiện từng bước một.

Thành phần này cung cấp giao diện người dùng sau đây. ![auth-component](/img/build/tutorials/tutorial-auth-component.png)

Tính năng chính là:\
1\) Người dùng có thể nhập khóa riêng tư để đăng nhập.\ 2) Người dùng có thể nhập tập tin lưu trữ khóa và nhập mật khẩu để đăng nhập.\
3\) Người dùng có thể đăng xuất và xóa thông tin phiên bản của ví từ trình duyệt.

### 3. Tính năng thành phần `Auth`: Người dùng có thể nhập khóa riêng tư để đăng nhập. <a href="#3-auth-component-feature-user-can-input-private-key-to-login" id="3-auth-component-feature-user-can-input-private-key-to-login"></a>

Cần có phương pháp `integrateWallet` để đăng nhập bằng khóa riêng tư.

```javascript
integrateWallet = (privateKey) => {
  const walletInstance = cav.klay.accounts.privateKeyToAccount(privateKey)
  cav.klay.accounts.wallet.add(walletInstance)
  sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance))
  this.reset()
}
```

Hàm `integateWallet` lấy `privateKey` làm tham số để tạo ra một phiên bản ví.

Dòng 1: `const walletInstance = cav.klay.tài khoảns.privateKeyToAccount(privateKey)`\
Nó lưu phiên bản ví do API `privateKeyToAccount` tạo ra vào biến `walletInstance`.

Dòng 2: `cav.klay.tài khoảns.wallet.add(walletInstance)`\
Để gửi giao dịch, bạn nên thêm phiên bản ví vào caver bằng hàm `cav.klay.tài khoảns.wallet.add(walletInstance)`.

Dòng 3: `sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance))`\
`sessionStorage.setItem` là API trình duyệt dùng để lưu trữ giá trị vào nơi lưu trữ phiên của trình duyệt.\
Vì không muốn mất trạng thái đăng nhập cả khi làm mới trang ứng dụng hướng dẫn của mình, chúng tôi đã lưu phiên bản của ví vào nơi lưu trữ phiên bằng chuỗi JSON.
`sessionStorage.setItem` is a browser API used for storing a value to the browser's session storage.\
Since we want not to lose our logged-in status even we refresh our tutorial app page, we stored our wallet instance to the session storage as a JSON string.

cf) Các mục trong phần lưu trữ phiên sẽ mất khi người dùng đóng tab trình duyệt.

Dòng 4: `this.reset()`\
Nó đặt lại trạng thái của thành phần hiện tại về trạng thái khởi tạo ban đầu để xóa dữ liệu bạn nhập.
It resets the current component's state to the initial state to clear your input.

Để biết thêm thông tin về API `privateKeyToAccount` của caver-js, hãy xem [caver.klay.tài khoảns.privateKeyToAccount](../../../../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#privatekeytoaccount)

### 4. Tính năng thành phần `Auth`: Người dùng có thể nhập tập tin lưu trữ khóa và nhập mật khẩu để đăng nhập. <a href="#4-auth-component-feature-user-can-import-keystore-file-and-input-password-to-log" id="4-auth-component-feature-user-can-import-keystore-file-and-input-password-to-log"></a>

Cần phương pháp `handleImport` và `handleLogin` để đăng nhập bằng lưu trữ khóa và mật khẩu.

```javascript
/**
 * handleImport method takes a file, read
 */
handleImport = (e) => {
  const keystore = e.target.files[0]
  // 'FileReader' is used for reading contents of file.
  // We would use 'onload' handler and 'readAsText' method.
  // * FileReader.onload
  // - This event is triggered each time the reading operation is completed.
  // * FileReader.readAsText()
  // - Starts reading the contents.
  const fileReader = new FileReader()
  fileReader.onload = (e) => {
    try {
      if (!this.checkValidKeystore(e.target.result)) {
        // If key store file is invalid, show message "Invalid keystore file."
        this.setState({ keystoreMsg: 'Invalid keystore file.' })
        return
      }

      // If key store file is valid,
      // 1) set e.target.result keystore
      // 2) show message "It is valid keystore. input your password."
      this.setState({
        keystore: e.target.result,
        keystoreMsg: 'It is valid keystore. input your password.',
      }, () => document.querySelector('#input-password').focus())
    } catch (e) {
      this.setState({ keystoreMsg: 'Invalid keystore file.' })
      return
    }
  }
  fileReader.readAsText(keystore)
}
```

Để nhập tập tin từ người dùng, chúng tôi sử dụng API trình duyệt `FileReader`.\
`e.target.files[0]` chứa thông tin meta cho tập tin.
`e.target.files[0]` contains meta information for the file. Để đọc nội dung của tập tin, chúng tôi gọi API `fileReader.readAsText(keystore)`.\
Sau khi gọi hàm `fileReader.readAsText(keystore)`, hàm `fileReader.onload` sẽ chạy để lấy nội dung của tập tin vào `e.target.result`.\
Sau khi nhập tập tin lưu trữ khóa, chúng tôi nhập mật khẩu.
After calling `fileReader.readAsText(keystore)`, `fileReader.onload` function fires to take the content of the file as `e.target.result`.\
After importing the keystore file, we get password input.

cf) Lưu trữ khóa chứa khóa riêng tư được mã hóa. Chúng tôi cần mật khẩu trùng khớp để giải mã Lưu trữ khóa, từ đó lấy được khóa riêng tư thực.\
_CẢNH BÁO Không để lộ tập tin lưu trữ khóa của mình cho người khác!_
_WARNING Don't expose your keystore file to another person!_

Điền mật khẩu vào phần `<input>`. Giá trị nhập vào sẽ được lưu trữ là trạng thái `password` bằng phương pháp `handleChange`.

```markup
<input
  id="input-password"
  className="Auth__passwordInput"
  name="password"
  type="password"
  onChange={this.handleChange}
/>
```

Cả tập tin lưu trữ khóa và mật khẩu của tập tin đã sẵn sàng để sử dụng. Giờ đây chúng tôi có thể giải mã tập tin lưu trữ khóa để trích xuất khóa riêng tư bằng API `cav.klay.tài khoảns.decrypt(keystore, password)`.\
API này trả về một phiên bản ví chứa khóa riêng tư.
This API returns a wallet instance containing the private key. Sau khi nhập khóa riêng tư, chúng ta có thể sử dụng phương pháp `integrateWallet` đã truy cập trước đó.

```javascript
handleLogin = () => {
  const { accessType, keystore, password, privateKey } = this.state

  // Access type2: access through private key
  if (accessType == 'privateKey') {
    this.integrateWallet(privateKey)
    return
  }

  // Access type1: access through keystore + password
  try {
    const { privateKey: privateKeyFromKeystore } = cav.klay.accounts.decrypt(keystore, password)
    this.integrateWallet(privateKeyFromKeystore)
  } catch (e) {
    this.setState({ keystoreMsg: `Password doesn't match.` })
  }
}
```

Để biết thêm thông tin về mã hóa tập tin lưu trữ khóa bằng mật khẩu, hãy xem [caver.klay.tài khoảns.decrypt](../../../../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#decrypt)

### 5. Tính năng thành phần `Auth`: Người dùng có thể đăng xuất, xóa thông tin phiên bản ví từ trình duyệt. <a href="#5-auth-component-feature-user-can-logout-remove-wallet-instance-information-from" id="5-auth-component-feature-user-can-logout-remove-wallet-instance-information-from"></a>

'logout' nghĩa là gỡ bỏ phiên bản ví từ trình duyệt và caver.\
`cav.klay.tài khoảns.wallet.clear()` gỡ bỏ tất cả các phiên bản ví từ caver.\
`sessionStorage.removeItem('walletInstance')` gỡ bỏ phiên bản ví từ phần lưu trữ phiên trình duyệt.
`cav.klay.accounts.wallet.clear()` removes all wallet instances from caver.\
`sessionStorage.removeItem('walletInstance')` removes the wallet instance from the browser's session storage.

```javascript
/**
 * removeWallet method removes
 * 1) wallet instance from caver.klay.accounts
 * 2) 'walletInstance' value from session storage.
 */
removeWallet = () => {
  cav.klay.accounts.wallet.clear()
  sessionStorage.removeItem('walletInstance')
  this.reset()
}
```

Để biết thêm thông tin về xóa phiên bản ví khỏi caver-js, hãy xem [caver.klay.tài khoảns.wallet.clear](../../../../references/sdk/caver-js-1.4.1/api/caver.klay.accounts.md#wallet-clear)
