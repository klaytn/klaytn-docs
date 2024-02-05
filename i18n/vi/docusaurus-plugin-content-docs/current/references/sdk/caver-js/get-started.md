# Bắt đầu

Tài liệu này dành cho các nhà phát triển dùng caver-js v1.5.0 trở lên. Nếu bạn đang sử dụng phiên bản cũ hơn, hãy xem [Bắt đầu (\~v1.4.1)](../caver-js-1.4.1/get-started-1.4.1.md  ../caver-js-1.4.1/get-started-1.4.1.md).

## Điều kiện tiên quyết <a href="#prerequisites" id="prerequisites"></a>

### Phần phụ thuộc <a href="#dependencies" id="dependencies"></a>

Cần có các gói sau đây để dùng thư viện caver-js.

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)
- [gcc-c++](https://gcc.gnu.org/)
- [Trình biên dịch Solidity](https://solidity.readthedocs.io/en/develop/installing-solidity.html)

**Lưu ý** caver-js có thể chạy trên Node.js phiên bản 12 và 14. Chúng tôi khuyến nghị sử dụng các phiên bản sau:

- lts/erbium ([12.21.0](https://nodejs.org/dist/latest-v12.x/))
- lts/fermium ([14.16.0](https://nodejs.org/dist/latest-v14.x/))

Nếu bạn dùng một phiên bản khác của Node (ví dụ như Node v15), hãy dùng Trình quản lý phiên bản Node ([nvm](https://github.com/nvm-sh/nvm)) để cài đặt và sử dụng phiên bản được caver-js hỗ trợ.

### Cài đặt <a href="#installation" id="installation"></a>

Để thử dùng, hãy cài đặt caver-js với npm bằng cách dùng lệnh sau:

```
$ npm install caver-js
```

**Lưu ý**: tập tin `package.json` phải tồn tại trên cùng một đường dẫn cài đặt. Nếu nó không tồn tại, `package.json` có thể được tạo qua `npm init`.

Để cài đặt một phiên bản caver-js cụ thể, hãy thử lệnh sau:

```
$ npm install caver-js@X.X.X
```

## Bắt đầu với caver-js <a href="#starting-with-caver-js" id="starting-with-caver-js"></a>

Khi đã cài xong caver-js, bạn có thể kết nối với một nút Klaytn bằng caver-js.

Để thực hành các ví dụ dưới đây, trước tiên, hãy tạo một tập tin thử nghiệm trong thư mục làm việc.

```bash
$ touch test.js
```

Bạn có thể thấy tập tin `test.js` được tạo ra trong thư mục làm việc.

Viết mã sau trong test.js.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const version = await caver.rpc.klay.getClientVersion()
	console.log(version)
}

testFunction()
```

Khi chạy mã trên, bạn sẽ nhận được kết quả sau.

```bash
$ node ./test.js
Klaytn/v1.4.0/linux-amd64/go1.14.1
```

Nếu bạn thấy kết quả đầu ra của console.log như trên, hãy tiếp tục với các bước dưới đây. Số phiên bản có thể sẽ khác theo phiên bản của nút Klaytn được kết nối.

### Kết nối với một Nút Klaytn <a href="#connecting-to-a-klaytn-node" id="connecting-to-a-klaytn-node"></a>

Bạn có thể nhập mô-đun caver-js và kết nối nó với một Nút Klaytn trong mạng thử nghiệm Baobab như trong ví dụ dưới đây:

```javascript
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')
```

Nếu bạn đang chạy một EN, bạn có thể kết nối nó với nút của riêng mình bằng cách thay đổi máy chủ và cổng như dưới đây:

```javascript
const Caver = require('caver-js')
const caver = new Caver('https://your.en.url:8651/')
```

## Quản lý Keyring <a href="#managing-keyrings" id="managing-keyrings"></a>

[Keyring](api/caver-wallet/keyring.md) là một cấu trúc chứa địa chỉ của một tài khoản Klaytn và (các) khóa riêng tư.

[Keyring](api/caver-wallet/keyring.md) có thể được phân thành ba loại tùy thuộc vào loại khóa được lưu trữ: [SingleKeyring](api/caver-wallet/keyring.md#singlekeyring) chứa một địa chỉ và một khóa riêng tư, [MultipleKeyring](api/caver-wallet/keyring.md#multiplekeyring) chứa một địa chỉ và nhiều khóa riêng tư và [RoleBasedKeyring](api/caver-wallet/keyring.md#rolebasedkeyring) chứa một địa chỉ và một hoặc nhiều khóa riêng tư cho từng vai trò.

[SingleKeyring](api/caver-wallet/keyring.md#singlekeyring) xác định thuộc tính `key` bên trong, và `key` này chứa một khóa riêng tư.

[MultipleKeyring](api/caver-wallet/keyring.md#multiplekeyring) xác định thuộc tính `keys` bên trong, và `keys` này được triển khai dưới dạng một mảng để chứa nhiều khóa riêng tư.

Thuộc tính `keys` được xác định trong [RoleBasedKeyring](api/caver-wallet/keyring.md#rolebasedkeyring) được triển khai dưới dạng một mảng hai chiều (`keys` trống có dạng `[ [], [], [] ]`) có thể bao gồm nhiều khóa cho từng [role](../../../learn/accounts.md#roles). Phần tử đầu tiên của mảng này chứa (các) khóa riêng tư để sử dụng cho `roleTransactionKey`, phần tử thứ hai là (các) khóa riêng tư để sử dụng cho `roleAccountUpdateKey`, và phần tử thứ ba là (các) khóa riêng tư để sử dụng cho `roleFeePayerKey`.

### Tạo một Keyring <a href="#creating-a-keyring" id="creating-a-keyring"></a>

#### Tạo một SingleKeyring <a href="#generating-a-singlekeyring" id="generating-a-singlekeyring"></a>

Bạn có thể tạo ngẫu nhiên một keyring đơn lẻ như dưới đây.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const keyring = caver.wallet.keyring.generate()
	console.log(keyring)
}

testFunction()
```

Khi chạy mã trên, bạn sẽ nhận được kết quả sau.

```bash
$ node ./test.js
SingleKeyring {
	_address: '0x3d263c3c0df60c5516f932d244531742f45eed5c',
	_key: PrivateKey { _privateKey: '0x{private key}' }
}
```

Kết quả thực thi được hiển thị ở trên. Các biến thành viên được xác định bên trong đối tượng cụ thể có thể được truy cập qua `keyring.address` và `keyring.key`.

#### Tạo một SingleKeyring từ khóa riêng tư <a href="#creating-a-singlekeyring-from-private-key" id="creating-a-singlekeyring-from-private-key"></a>

Ngoài ra, nếu bạn sở hữu một khóa riêng tư cụ thể, bạn có thể sử dụng khóa này để tạo một keyring như bên dưới.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	// Create a keyring from a private key
	const keyringFromPrivateKey = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	console.log(keyringFromPrivateKey)
}

testFunction()
```

Khi chạy mã trên, bạn sẽ nhận được kết quả sau.

```bash
$ node ./test.js
SingleKeyring {
	_address: '0xf5a9079f311f9ec55170af351627aff0c5d2e287',
	_key: PrivateKey { _privateKey: '0x{private key}' } 
}
```

Kết quả của `caver.wallet.keyring.createFromPrivateKey`, cũng như kết quả của `caver.wallet.keyring.generate` ở trên, là một đối tượng [SingleKeyring](api/caver-wallet/keyring.md#singlekeyring) cụ thể với một địa chỉ được xác định bên trong nó, và một đối tượng [PrivateKey] cụ thể trong `keyring.key`.

#### Tạo một SingleKeyring bằng một khóa riêng tư và một địa chỉ <a href="#creating-a-singlekeyring-with-a-private-key-and-an-address" id="creating-a-singlekeyring-with-a-private-key-and-an-address"></a>

Nếu khóa riêng tư cho tài khoản Klaytn của bạn tách rời khỏi địa chỉ, bạn có thể tạo một keyring bằng địa chỉ đã cho và khóa riêng tư đã cho như dưới đây.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	// Create a keyring with an address and a private key
	const keyring = caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key}')
	console.log(keyring)

	// Create a keyring from a KlaytnWalletKey
	const keyringFromKlaytnWalletKey = caver.wallet.keyring.createFromKlaytnWalletKey('0x{private key}0x{type}0x{address in hex}')
	console.log(keyringFromKlaytnWalletKey)
}

testFunction()
```

Chạy mã này trong bảng điều khiển như dưới đây.

```bash
$ node ./test.js
SingleKeyring {
	_address: '0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
	_key: PrivateKey { _privateKey: '0x{private key}' }
}
SingleKeyring {
	_address: '0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
	_key: PrivateKey { _privateKey: '0x{private key}' }
}
```

#### Tạo một MultipleKeyring bằng nhiều khóa riêng tư <a href="#creating-a-multiplekeyring-with-multiple-private-keys" id="creating-a-multiplekeyring-with-multiple-private-keys"></a>

Nếu bạn muốn dùng nhiều khóa riêng tư, bạn có thể tạo một [MultipleKeyring](api/caver-wallet/keyring.md#multiplekeyring) bằng một địa chỉ và nhiều khóa riêng tư. Các ví dụ dưới đây cho thấy cách để tạo ra một [MultipleKeyring](api/caver-wallet/keyring.md#multiplekeyring) bằng nhiều khóa riêng tư.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	// Create a keyring with an address and private keys
	const keyring = caver.wallet.keyring.createWithMultipleKey('0x{address in hex}', [ '0x{private key1}', '0x{private key2}' ])
	console.log(keyring)
}

testFunction()
```

Khi chạy mã trên, bạn sẽ nhận được kết quả sau.

```bash
$ node ./test.js
MultipleKeyring {
	_address: '0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
	_keys: [
		PrivateKey { _privateKey: '0x{private key1}' },
		PrivateKey { _privateKey: '0x{private key2}' } 
	]
}
```

Như bạn có thể thấy, `_keys` có nhiều đối tượng PrivateKey cụ thể trong mảng. Các biến thành viên được xác định bên trong đối tượng cụ thể có thể được truy cập qua `keyring.address` và `keyring.keys`.

#### Tạo một RoleBasedKeyring bằng các khóa riêng tư <a href="#creating-a-rolebasedkeyring-with-role-based-private-keys" id="creating-a-rolebasedkeyring-with-role-based-private-keys"></a>

Để sử dụng (các) khóa riêng tư cho từng [role](../../../learn/accounts.md#roles), `caver.wallet.keyring.createWithRoleBasedKey` sẽ được dùng. Mỗi phần tử trong mảng tương ứng với một vai trò được mô tả trong [RoleBasedKeyring](api/caver-wallet/keyring.md#rolebasedkeyring). Ví dụ dưới đây hướng dẫn cách tạo ra một đối tượng [RoleBasedKeyring](api/caver-wallet/keyring.md#rolebasedkeyring) cụ thể từ các khóa khác nhau cho từng vai trò.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	// Create a keyring with an address and private keys defined by each roles
	const keyring = caver.wallet.keyring.createWithRoleBasedKey('0x{address in hex}', [
		[ '0x{private key1}', '0x{private key2}', '0x{private key3}' ],
		[ '0x{private key4}'],
		[ '0x{private key5}', '0x{private key6}' ],
	])
	console.log(keyring)
}

testFunction()
```

Khi chạy mã trên, bạn sẽ nhận được kết quả sau.

```bash
$ node ./test.js
RoleBasedKeyring {
	_address: '0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
	_keys: [ 
		[ 
			PrivateKey { _privateKey: '0x{private key1}' },
			PrivateKey { _privateKey: '0x{private key2}' },
			PrivateKey { _privateKey: '0x{private key3}' }
		],
		[ PrivateKey { _privateKey: '0x{private key4}' } ],
		[ 
			PrivateKey { _privateKey: '0x{private key5}' },
			PrivateKey { _privateKey: '0x{private key6}' }
		]
	]
}
```

Nhìn vào kết quả trên, phần tử đầu tiên của mảng khóa `roleTransactionKey` có ba đối tượng PrivateKey cụ thể, và phần tử thứ hai, `roleAccountUpdateKey` có một đối tượng PrivateKey cụ thể. Và phần tử cuối cùng của mảng, `roleFeePayerKey`, có hai đối tượng PrivateKey cụ thể.

**Lưu ý**: Việc gọi các hàm liên quan đến keyring ([caver.wallet.keyring](api/caver-wallet/keyring.md)) hoặc ví ([caver.wallet](api/caver-wallet/caver-wallet.md)) không làm ảnh hưởng đến nền tảng chuỗi khối Klaytn thực tế (Klaytn).

### Thêm Keyring vào caver-js <a href="#adding-keyrings-to-caver-js" id="adding-keyrings-to-caver-js"></a>

Bạn có thể dễ dàng dùng một keyring bằng cách sử dụng ví trong bộ nhớ mà caver-js cung cấp. Các ví dụ dưới đây minh họa cách để thêm một keyring vào ví bằng một đối tượng keyring cụ thể và một tập tin lưu trữ khóa được tạo ra bởi [Ví Klaytn](https://wallet.klaytn.com/).

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	// Using a keyring instance
	const keyring = caver.wallet.keyring.generate()
	caver.wallet.add(keyring)
	console.log(caver.wallet.getKeyring(keyring.address))

	// Using a keystore file
	const decrypted = caver.wallet.keyring.decrypt({ 
		version: 4,
		id: '9c12de05-0153-41c7-a8b7-849472eb5de7',
		address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
		keyring: [
			{ 
				ciphertext: 'eacf496cea5e80eca291251b3743bf93cdbcf7072efc3a74efeaf518e2796b15',
				cipherparams: { iv: 'd688a4319342e872cefcf51aef3ec2da' },
				cipher: 'aes-128-ctr',
				kdf: 'scrypt',
				kdfparams: {
					dklen: 32,
					salt: 'c3cee502c7157e0faa42386c6d666116ffcdf093c345166c502e23bc34e6ba40',
					n: 4096,
					r: 8,
					p: 1
				},
				mac: '4b49574f3d3356fa0d04f73e07d5a2a6bbfdd185bedfa31f37f347bc98f2ef26'
			}
		]
	}, 'password')

	caver.wallet.add(decrypted)
	console.log(caver.wallet.getKeyring(decrypted.address))
}

testFunction()
```

Chạy trong bảng điều kiển của bạn.

```bash
$ node ./test.js
SingleKeyring {
	_address: '0x66391720b488a3fb2c7c69d99cd4cd6e23ca18e3',
	_key: PrivateKey { _privateKey: '0x{private key}' }
}
SingleKeyring {
	_address: '0xc02cec4d0346bf4124deeb55c5216a4138a40a8c',
	_key: PrivateKey { _privateKey: '0x{private key}' }
}
```

Nhìn vào kết quả đầu ra ở trên, bạn có thể truy vấn keyring của mình từ `caver.wallet` sau khi thêm nó vào `caver.wallet`.

Nếu bạn có một địa chỉ và (các) khóa riêng tư để dùng, bạn có thể dễ dàng tạo ra một keyring và trực tiếp thêm nó vào [caver.wallet](api/caver-wallet/caver-wallet.md) thông qua [caver.wallet.newKeyring](api/caver-wallet/caver-wallet.md#caverwalletgetkeyring).

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	// Add to wallet with an address and a private key
	const addedSingle = caver.wallet.newKeyring('0x{address in hex}', '0x{private key1}')
	console.log(caver.wallet.getKeyring(addedSingle.address))

	// Add to wallet with an address and private keys
	const addedMultiple = caver.wallet.newKeyring('0x{address in hex}', ['0x{private key2}', '0x{private key3}', '0x{private key4}'])
	console.log(caver.wallet.getKeyring(addedMultiple.address))

	// Add to wallet with an address and private keys defined by each roles
	const addedRoleBased = caver.wallet.newKeyring('0x{address in hex}', [
		['0x{private key5}', '0x{private key6}', '0x{private key7}'],
		['0x{private key8}', '0x{private key9}'],
		['0x{private key10}', '0x{private key11}']
	])
	console.log(caver.wallet.getKeyring(addedRoleBased.address))
}

testFunction()
```

Khi chạy mã trên, bạn sẽ nhận được kết quả sau. Kết quả của việc thực thi mã trên được hiển thị dưới đây. Khi `caver.wallet.newKeyring` được thực thi với một khóa riêng tư, một đối tượng Keyring cụ thể với một khóa riêng tư sẽ được tạo ra và thêm vào `caver.wallet`. Đối với nhiều khóa riêng tư, một đối tượng Keyring cụ thể với nhiều khóa riêng tư sẽ được tạo ra. Khi dùng một hoặc nhiều khóa riêng tư làm đối số cho từng vai trò, một phiên bản Keyring với (các) khóa riêng tư khác nhau cho từng vai trò sẽ được tạo ra và thêm vào `caver.wallet`.

```bash
$ node ./test.js
SingleKeyring {
	_address: '0x651f6ae6b45750082b22805583acc989399c6552',
	_key: PrivateKey { _privateKey: '0x{private key1}' }
}
MultipleKeyring {
	_address: '0xce3ee92aeb4d600a41c98bdf92e8b337e186bf58',
	_keys: [ 
		PrivateKey { _privateKey: '0x{private key2}' },
		PrivateKey { _privateKey: '0x{private key3}' },
		PrivateKey { _privateKey: '0x{private key4}' }
    ]
}
RoleBasedKeyring {
	_address: '0x626d5b94ec76a105c5afa370bb7e59050a22b8b5',
	_keys: [ 
		[ 
			PrivateKey { _privateKey: '0x{private key5}' },
			PrivateKey { _privateKey: '0x{private key6}' },
			PrivateKey { _privateKey: '0x{private key7}' }
		],
		[ 
			PrivateKey { _privateKey: '0x{private key8}' },
			PrivateKey { _privateKey: '0x{private key9}' }
		],
		[ 
			PrivateKey { _privateKey: '0x{private key10}' },
			PrivateKey { _privateKey: '0x{private key11}' }
		]
	]
}
```

`caver.wallet.add` hoặc `caver.wallet.newKeyring` trả về một đối tượng Keyring cụ thể sau khi đã thêm nó vào `caver.wallet`.

## Gửi giao dịch <a href="#sending-a-transaction" id="sending-a-transaction"></a>

Phần này sẽ hướng dẫn bạn các để gửi KLAY bằng caver-js trên mạng Baobab.

### Nhận KLAY qua Vòi Baobab <a href="#getting-klay-via-baobab-faucet" id="getting-klay-via-baobab-faucet"></a>

Nếu bạn cần KLAY để thử nghiệm, bạn có thể nhận KLAY dùng trong mạng thử nghiệm Baobab từ [Ví Klaytn](../../../build/tools/wallets/klaytn-wallet.md#how-to-receive-baobab-testnet-klay). Hãy đăng nhập vào Ví Wallet bằng khóa riêng tư hoặc tập tin lưu trữ khóa, và nhận KLAY dùng cho mạng thử nghiệm Baobab qua vòi để thử nghiệm.

### Gửi một giao dịch chuyển giá trị <a href="#sending-a-value-transfer-transaction" id="sending-a-value-transfer-transaction"></a>

Bạn có thể sử dụng ví caver-js để tạo chữ ký của giao dịch. Bạn sẽ phải thực hiện hai bước dưới đây để gửi giao dịch đến mạng lưới.

1. Ký giao dịch
   - Nếu keyring mà bạn muốn dùng đã được thêm vào [caver.wallet](api/caver-wallet/caver-wallet.md), bạn có thể dùng hàm `caver.wallet.sign` để ký.
   - Nếu bạn quản ký keyring riêng biệt và không thêm nó vào `caver.wallet`, bạn có thể ký giao dịch thông qua hàm `transaction.sign`.
2. Gửi chuỗi mã hóa RLP của giao dịch đã ký đến Klaytn qua `caver.rpc.klay.sendRawTransaction`.

**Lưu ý:** Người gửi phải có đủ lượng KLAY.

#### Ký giao dịch

Trước khi gửi một giao dịch đến Klaytn, bạn phải ký giao dịch trước.

Dưới đây là ví dụ về cách ký một giao dịch trong trường hợp một keyring đã được thêm vào [caver.wallet](api/caver-wallet/caver-wallet.md).

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	// Add a keyring to caver.wallet
	const keyring = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	caver.wallet.add(keyring)

	// Create a value transfer transaction
	const valueTransfer = caver.transaction.valueTransfer.create({
		from: keyring.address,
		to: '0x176ff0344de49c04be577a3512b6991507647f72',
		value: 1,
		gas: 30000,
	})

	// Sign the transaction via caver.wallet.sign
	await caver.wallet.sign(keyring.address, valueTransfer)

	const rlpEncoded = valueTransfer.getRLPEncoding()
	console.log(`RLP-encoded string: ${rlpEncoded}`)
}

testFunction()
```

Mã trên thêm một keyring vào `caver.wallet`, tạo ra một giao dịch và ký giao dịch đó qua `caver.wallet.sign`.

Khi chạy mã trên, bạn sẽ nhận được kết quả sau. Khi mã trên đã được thực thi, chuỗi mã hóa RLP của giao dịch sẽ hiển thị dưới đây. (Kết quả chuỗi mã hóa RLP mà bạn nhận được có thể khác với kết quả chuỗi hiển thị dưới đây).

```bash
RLP-encoded string: 0x08f87e808505d21dba0082753094176ff0344de49c04be577a3512b6991507647f720194ade4883d092e2a972d70637ca7de9ab5166894a2f847f845824e44a0e1ec99789157e5cb6bc691935c204a23aaa3dc049efafca106992a5d5db2d179a0511c421d5e508fdb335b6048ca7aa84560a53a5881d531644ff178b6aa4c0a41
```

#### Gửi chuỗi mã hóa RLP của giao dịch đã ký đến Klaytn

Giờ bạn có thể gửi một giao dịch đã ký đến mạng lưới như dưới đây. Nếu bạn muốn chạy thử ví dụ bên dưới, hãy thay thế `0x{RLP-encoded string}` bằng giá trị của `rlpEncoded` ở trên.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const rlpEncoding = `0x{RLP-encoded string}`

	// Send the transaction using `caver.rpc.klay.sendRawTransaction`.
	const receipt = await caver.rpc.klay.sendRawTransaction(rlpEncoding)
	console.log(receipt)
}

testFunction()
```

Khi chạy mã trên, bạn sẽ nhận được kết quả sau. Khi mã trên đã được thực thi, biên lai của giao dịch sẽ hiển thị dưới đây.

```bash
$ node ./test.js
{ 
	blockHash: '0xd20066b448da77a41a46fbf0856792b85b60c42213126f661f6434b5b1263072',
	blockNumber: '0x1efb',
	contractAddress: null,
	from: '0x09a08f2289d3eb3499868908f1c84fd9523fe11b',
	gas: '0x7530',
	...
	signatures: [
		{ 
			V: '0x4e43',
			R: '0x5737aa8c88f019a3ee184faed6d34d103f77773bd5434cb0328c11738c8d9755',
			S: '0x578b118f4400999e5232bd0860cfbdbf89622f6e11cc6bd9722a86767d2723b7'
		}
	],
	status: '0x1',
	to: '0x176ff0344de49c04be577a3512b6991507647f72',
	transactionHash: '0x43e8ab1a2365ad598448b4402c1cfce6a71b3a103fce3a69905613e50b978113',
	transactionIndex: 0,
	type: 'TxTypeValueTransfer',
	typeInt: 8,
	value: '0x1'
}
```

Nếu bạn muốn ký một giao dịch và gửi nó đến mạng lưới mà không cần `caver.wallet`, hãy xem ví dụ bên dưới.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	// Create a value transfer transaction
	const keyring = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	const valueTransfer = caver.transaction.valueTransfer.create({
		from: keyring.address,
		to: '0x176ff0344de49c04be577a3512b6991507647f72',
		value: 1,
		gas: 30000,
	})

	// Sign the transaction via transaction.sign
	await valueTransfer.sign(keyring)

	// Send the transaction to the Klaytn using `caver.rpc.klay.sendRawTransaction`.
	const receipt = await caver.rpc.klay.sendRawTransaction(valueTransfer)
	console.log(receipt)
}

testFunction()
```

Khi mã trên được triển khai, biên lai của giao dịch sẽ hiển thị ra màn hình như ví dụ trước đó.

### Kiểm tra biên lai <a href="#checking-receipts" id="checking-receipts"></a>

Bạn có thể dùng đối tượng promise hoặc lớp phát sinh sự kiện để nhận biên lai của giao dịch khi chuyển giao dịch đó đến Klaytn bằng [caver.rpc.klay.sendRawTransaction](api/caver-rpc/klay.md#caver-rpc-klay-sendrawtransaction).

Ví dụ dưới đây cho thấy cách để nhận biên lai bằng các đối tượng promise và lớp phát sinh sự kiện.

```javascript
// Using a promise - async/await
const receipt = await caver.rpc.klay.sendRawTransaction(rawTransaction)
console.log(receipt)

// Using a promise
caver.rpc.klay.sendRawTransaction(rawTransaction).then(console.log)

// Using an event emitter
caver.rpc.klay.sendRawTransaction(rawTransaction).on('receipt', console.log)
```

Như mô tả trong ví dụ trên, bạn có thể nhận được kết quả của việc gửi giao dịch thông qua đối tượng promise hoặc lớp phát sinh sự kiện. Trường `transactionHash` được xác định bên trong đối tượng biên lai. Bạn có thể dùng phương pháp gọi RPC [caver.rpc.klay.getTransactionReceipt](api/caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt) kèm theo `receipt.transactionHash` để truy vấn biên lai của một giao dịch vào bất kỳ lúc nào từ mạng lưới sau khi giao dịch đã được đưa vào một khối. Ví dụ dưới đây cho thấy cách để lấy biên lai bằng cách gọi RPC [caver.rpc.klay.getTransactionReceipt](api/caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt).

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const receipt = await caver.rpc.klay.getTransactionReceipt('0x40552efbba23347d36f6f5aaba6b9aeb6602e004df62c1988d9b7b1f036e676a')
	console.log(receipt)
}

testFunction()
```

Khi chạy mã trên, bạn sẽ nhận được kết quả sau. Khi mã trên đã được thực thi, biên lai của giao dịch sẽ hiển thị dưới đây.

```bash
$ node ./test.js
{ 
	blockHash: '0x65d041011440e04643c546eb8bbb1dcabb659c3b3216e01473cb0712e47b5f69',
	blockNumber: '0x20db',
	contractAddress: null,
	from: '0x09a08f2289d3eb3499868908f1c84fd9523fe11b',
	gas: '0x7530',
	...
	signatures: [
		{ 
			V: '0x4e43',
			R: '0xfabe48071a8b72f0c340b2ee9d948a496cce467aebe027159d66a175e6b4b5b4',
			S: '0x1d4e503f1b084cda15edeba6b7b8eba15057b9d2484f7f3d095c980c2d98f13'
		}
	],
	status: '0x1',
	to: '0x176ff0344de49c04be577a3512b6991507647f72',
	transactionHash: '0x40552efbba23347d36f6f5aaba6b9aeb6602e004df62c1988d9b7b1f036e676a',
	transactionIndex: 0,
	type: 'TxTypeValueTransfer',
	typeInt: 8,
	value: '0x1'
}
```

Bạn có thể tìm thấy kết quả của giao dịch qua `trạng thái` của biên lai. Để biết thêm chi tiết về các giá trị trả về, hãy xem [caver.rpc.klay.getTransactionReceipt](api/caver-rpc/klay.md#caver-rpc-klay-gettransactionreceipt). Nếu một giao dịch thất bại, bạn có thể kiểm tra thêm thông tin về lỗi tại `txError` của biên lai. Để biết thêm thông tin về `txError`, hãy xem [txError: Thông tin chi tiết về các lỗi giao dịch](../../transaction-error-codes.md).

## Thực thi các loại giao dịch khác <a href="#executing-other-transaction-types" id="executing-other-transaction-types"></a>

Klaytn cung cấp nhiều loại giao dịch đa dạng để đẩy mạnh khả năng mở rộng và hiệu suất. Để biết thêm thông tin, hãy xem [Giao dịch](../../../learn/transactions/). Mục này mô tả một số ví dụ mà bạn có thể sử dụng với caver-js.

### Ủy thác phí <a href="#fee-delegation" id="fee-delegation"></a>

Klaytn cung cấp tính năng [Ủy thác phí](../../../learn/transactions/transactions.md#fee-delegation). Đây là một ví dụ về việc thực hiện một giao dịch mã hóa RLP khi bạn là người gửi loại giao dịch này:

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const sender = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	caver.wallet.add(sender)

	const feeDelegatedTx = caver.transaction.feeDelegatedValueTransfer.create({
		from: sender.address,
		to: '0x176ff0344de49c04be577a3512b6991507647f72',
		value: 5,
		gas: 50000,
	})

	await caver.wallet.sign(sender.address, feeDelegatedTx)

	const rlpEncoded = feeDelegatedTx.getRLPEncoding()
	console.log(rlpEncoded)
}

testFunction()
```

Khi mã trên được thực thi, chuỗi mã hóa RLP sẽ được hiển thị ra màn hình. (Kết quả chuỗi mã hóa RLP mà bạn nhận được có thể khác với kết quả chuỗi hiển thị dưới đây).

```bash
$ node ./test.js
0x09f884028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf080c4c3018080
```

Người trả phí có thể gửi giao dịch đến Klaytn sau khi đính kèm `feePayerSignatures` vào chuỗi mã hóa RLP (`rawTransaction`) được ký bởi người gửi giao dịch. Nếu `caver.wallet` cũng có khóa của người trả phí, chữ ký của người trả phí có thể được đưa vào `feeDelegatedTx` bằng cách gọi `caver.wallet.signAsFeePayer(feePayer.address, feeDelegatedTx)`. Nếu không, người trả phí sẽ phải tạo `feeDelegatedTx` từ chuỗi mã hóa RLP được người gửi ký, sau đó thêm chữ ký của người trả phí vào đó như được minh họa dưới đây. Nếu bạn muốn chạy thử ví dụ bên dưới, hãy thay thế `0x{RLP-encoded string}` bằng giá trị của `rlpEncoded` ở trên.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const feePayer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	caver.wallet.add(feePayer)

	const rlpEncoded = '0x{RLP-encoded string}'

	const feeDelegateTxFromRLPEncoding = caver.transaction.feeDelegatedValueTransfer.create(rlpEncoded)

	// Set the fee payer address.
	feeDelegateTxFromRLPEncoding.feePayer = feePayer.address
	await caver.wallet.signAsFeePayer(feePayer.address, feeDelegateTxFromRLPEncoding)

	console.log(feeDelegateTxFromRLPEncoding.getRLPEncoding())
}

testFunction()
```

Khi mã trên được thực thi, chuỗi mã hóa RLP bao gồm cả chữ ký của người gửi và người trả phí sẽ hiển thị ra màn hình như dưới đây. (Kết quả mà bạn nhận được có thể khác với kết quả chuỗi hiển thị dưới đây).

```bash
$ node ./test.js
0x09f8dc028505d21dba0082c35094176ff0344de49c04be577a3512b6991507647f720594f5a9079f311f9ec55170af351627aff0c5d2e287f847f845824e43a0f4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cca035b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf09417e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24f847f845824e44a0921b7c3be69db96ce14134b306c2ada423613cb66ecc6697ee8067983c268b6ea07b86b255d1c781781315d85d7904226fb2101eb9498c4a03f3fbd30ba3ec5b79
```

Lúc này, giao dịch đã được cả người gửi và người trả phí ký tên, và giờ nó có thể được gửi đến mạng lưới. Thay thế `0x{RLP-encoded string}` bằng kết quả đầu ra chuỗi mã hóa RLP của mã ví dụ ở trên.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const rlpEncoded = '0x{RLP-encoded string}'
	const receipt = await caver.rpc.klay.sendRawTransaction(rlpEncoded)
	console.log(receipt)
}

testFunction()
```

Khi chạy mã trên, bạn sẽ nhận được kết quả sau. Qua kết quả thực thi của mã trên, bạn có thể kiểm tra kết quả của giao dịch FeeDelegatedValueTransfer.

```bash
$ node ./test.js
{ 
	blockHash: '0xb6a76163c4c558f50bdae77968a0f35dcfececf78b5cb780c3514a30a1c0a864',
	blockNumber: '0xede',
	contractAddress: null,
	feePayer: '0x17e7531b40ad5d7b5fa7b4ec78df64ce1cb36d24',
	feePayerSignatures: [
		{
			V: '0x4e44',
			R: '0x921b7c3be69db96ce14134b306c2ada423613cb66ecc6697ee8067983c268b6e',
			S: '0x7b86b255d1c781781315d85d7904226fb2101eb9498c4a03f3fbd30ba3ec5b79'
		}
	],
	from: '0xf5a9079f311f9ec55170af351627aff0c5d2e287',
	gas: '0xc350',
	...
	signatures: [
		{
			V: '0x4e43',
			R: '0xf4b53dbd4c915cb73b9c7fa17e22106ee9640155a06ab4a7ed8661f846d2a5cc',
			S: '0x35b5bba6a26d4ccd20c65e8f31cce265c193f1c874806f9fae6b0ee9df0addf0'
		}
	],
	status: '0x1',
	to: '0x176ff0344de49c04be577a3512b6991507647f72',
	transactionHash: '0x1878cc27b7f259a98d3248b41bffb6158640b4a07c503095deac1913fb3856c2',
	transactionIndex: 0,
	type: 'TxTypeFeeDelegatedValueTransfer',
	typeInt: 9,
	value: '0x5'
}
```

### Cập nhật tài khoản <a href="#account-update" id="account-update"></a>

Nếu bạn muốn thay đổi (các) khóa riêng tư cho tài khoản Klaytn của mình, có 3 điều quan trọng mà bạn cần ghi nhớ:

1. Klaytn xác thực mọi giao dịch mà bạn gửi đến.
2. Quy trình xác thực yêu cầu sử dụng các khóa công khai tương ứng chính xác với (các) khóa riêng tư của bạn.
3. Vì thế, việc thay đổi (các) khóa riêng tư thành (các) khóa riêng tư mới sẽ **luôn** **kéo theo** việc thay đổi (các) khóa công khai cũ thành (các) khóa mới. (Các) khóa công khai mới phải được lấy từ (các) khóa riêng tư mới.

Khi đã ghi nhớ 3 điều trên, bạn có thể thay đổi (các) khóa riêng tư của mình bằng cách thực hiện những bước sau:

1. Chuẩn bị (các) khóa riêng tư mới để tạo một keyring mới.
2. Tạo một keyring theo loại (Single keyring, Multiple keyring hoặc Role-based keyring) mà bạn cần.
3. Tạo một đối tượng Tài khoản cụ thể từ keyring mới. Đối tượng Tài khoản cụ thể này giữ (các) khóa công khai mới cho tài khoản Klaytn của bạn.
4. Gửi giao dịch AccountUpdate bao gồm cả đối tượng Tài khoản cụ thể đến Klaytn.
5. Cuối cùng, thay thế keyring cũ bằng keyring mới mà bạn tạo ở Bước 2.

Vui lòng xem [Cập nhật tài khoản](api/caver-transaction/basic.md#accountupdate) để biết thêm chi tiết.

Để thay đổi AccountKey của mình, bạn phải cung cấp một đối tượng [Tài khoản](api/caver.account.md) cụ thể cho trường `tài khoản` trong đối tượng đối số đầu vào của `caver.transaction.tài khoảnUpdate`. Một đối tượng [Account](api/caver.account.md) cu thể có chứa địa chỉ của tài khoản Klaytn và AccountKey cần được cập nhật.

Mã dưới đây là một mã ví dụ dùng để thay đổi (các) khóa riêng tư mà bạn dùng cho tài khoản Klaytn của mình, kèm theo việc thay đổi AccountKey của tài khoản Klaytn thành [AccountKeyPublic](../../../learn/accounts.md#accountkeypublic). Đừng quên chuẩn bị (các) khóa riêng tư mới.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	let sender = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	caver.wallet.add(sender)

	const newPrivateKey = caver.wallet.keyring.generateSingleKey()
	console.log(`new private key string: ${newPrivateKey}`)
	const newKeyring = caver.wallet.keyring.createWithSingleKey(sender.address, newPrivateKey)

	// create an Account instance
	const account = newKeyring.toAccount()

	const updateTx = caver.transaction.accountUpdate.create({
		from: sender.address,
		account: account,
		gas: 50000,
	})
	await caver.wallet.sign(sender.address, updateTx)
	const receipt = await caver.rpc.klay.sendRawTransaction(updateTx)
	console.log(receipt)

	// Update the keyring in caver.wallet for signing afterward.
	sender = caver.wallet.updateKeyring(newKeyring)
}

testFunction()
```

Nếu mã trên được thực thi thành công, bạn sẽ không còn có thể dùng (các) khóa riêng tư cũ để ký bất kỳ giao dịch nào với keyring cũ nữa. Vì thế, bạn phải cập nhật keyring cũ bằng `newKeyring` thông qua `caver.wallet.updateKeyring(newKeyring)`. Khi đã được cập nhật, (các) khóa riêng tư mới được cập nhật sẽ được dùng để ký.

Khi chạy mã trên, bạn sẽ nhận được kết quả sau. Trong kết quả thực thi của mã trên, kết quả của khóa riêng tư và cập nhật tài khoản mà bạn cần dùng thay thế được hiển thị ra màn hình như dưới đây.

```bash
$ node ./test.js
new private key string: 0x{private key}
{ 
	blockHash: '0x4c0221245e7c810cc19b05257e8d7cd34f24cc829f8787a832c08682640173f5',
	blockNumber: '0x26d6',
	contractAddress: null,
	from: '0xeec694a4143e05945823b216d0c62ab91c192a63',
	gas: '0xc350',
	gasPrice: '0x5d21dba00',
	gasUsed: 41000,
	key: '0x02a1024cc461670797071be16c34b22df1a3588653da5c1e9279b1d9e4b24fbcba07d8',
	...
	signatures: [
		{
			V: '0x4e43',
			R: '0xd0fa2d25711de4bfc3a7a6a660d307264fa3b2cacbb7eb71ab68f47661ebcfaf',
			S: '0x4652102241e61968988a22f9fa2d5d38d4e654d1f4b193fba5627c0856c9da7b'
		} 
	],
	status: '0x1',
	transactionHash: '0x4efdeeb1bb1e52ace11d64a19f564a973b36c29a0d85899a215621659b793665',
	transactionIndex: 0,
	type: 'TxTypeAccountUpdate',
	typeInt: 32
}
```

Sau đây là hướng dẫn về cách cập nhật AccountKey của tài khoản Klayt có nhiều [AccountKeys]? Ví dụ dưới đây giải thích về cách để tạo một đối tượng [Account](api/caver.account.md) cụ thể với nhiều khóa riêng tư mà bạn muốn sử dụng (Bạn có thể tạo một đối tượng [Account](api/caver.account.md) cụ thể với nhiều khóa công khai qua [caver.tài khoản.create](api/caver.account.md#caver-account-create)). Tương tự như trên, sau khi nạp đối tượng tài khoản cụ thể vừa tạo ra vào trường `tài khoản` bên trong đối tượng giao dịch, phần còn lại của quá trình cập nhật cũng giống như ví dụ ở trên.

Trước tiên, hãy dùng tạo một đối tượng Tài khoản cụ thể để cập nhật bằng [AccountKeyWeightedMultiSig](../../../learn/accounts.md#accountkeyweightedmultisig). Đối với [AccountKeyWeightedMultiSig](../../../learn/accounts.md#accountkeyweightedmultisig), phải xác định ngưỡng và trọng số của từng khóa. Để thực hiện điều này, hãy dùng [caver.tài khoản.weightedMultiSigOptions](api/caver.account.md#weightedmultisigoptions). Tham số đầu tiên là ngưỡng, và tham số thứ hai là mảng có chứa trọng số cho từng khóa.

```javascript
// Create an account instance with three private keys using AccountKeyWeightedMultiSig
const newPrivateKeys = caver.wallet.keyring.generateMultipleKeys(3)
const newKeyring = caver.wallet.keyring.createWithMultipleKey(sender.address, newPrivateKeys)

// threshold = 3, the weights of the three keys = [1, 2, 1]
const options = new caver.account.weightedMultiSigOptions(3, [1, 2, 1])

const account = newKeyring.toAccount(options)
```

Bây giờ, hãy cập nhật AccountKey bằng [AccountKeyRoleBased](../../../learn/accounts.md#accountkeyrolebased). [AccountKeyRoleBased](../../../learn/accounts.md#accountkeyrolebased) là một loại `AccountKey` xác định khóa để dùng cho từng [role](../../../learn/accounts.md#roles).

```javascript
// Create an account instance with roles using AccountKeyRoleBased. In the account instance created, each role has a public key that corresponds to one private key.
const newPrivateKeys = caver.wallet.keyring.generateRoleBasedKeys([1, 1, 1])
const newKeyring = caver.wallet.keyring.createWithRoleBasedKey(sender.address, newPrivateKeys)

const account = newKeyring.toAccount()
```

AccountKeyRoleBased ở trên là một ví dụ về việc sử dụng một khóa công khai cho từng vai trò. Như có thể thấy từ mã trên, từng vai trò tương ứng với một khóa riêng tư. Nếu bạn muốn dùng nhiều khóa riêng tư cho từng vai trò, [caver.tài khoản.weightedMultiSigOptions](api/caver.account.md#weightedmultisigoptions) phải được xác định cho từng vai trò như minh họa dưới đây.

```javascript
// Create an account instance with [3, 2, 3] keys for each role using AccountKeyRoleBased
const newPrivateKeys = caver.wallet.keyring.generateRoleBasedKeys([3, 2, 3])
const newKeyring = caver.wallet.keyring.createWithRoleBasedKey(sender.address, newPrivateKeys)

const options = [
	// thresold = 4, weights of keys = [2, 2, 4] for roleTransactionKey
	new caver.account.weightedMultiSigOptions(4, [2, 2, 4]),
	// threshold = 2, weights of keys = [1, 1]
	new caver.account.weightedMultiSigOptions(2, [1, 1]),
	// threshold = 3, weights of keys = [1, 1, 1]
	new caver.account.weightedMultiSigOptions(3, [1, 1, 1]),
]

const account = newKeyring.toAccount(options)
```

Nếu bạn muốn cập nhật AccountKey thành [AccountKeyLegacy](../../../learn/accounts.md#accountkeylegacy) hoặc [tài khoảnKeyFail](../../../learn/accounts.md#accountkeyfail), hãy tạo một đối tượng Tài khoản cụ thể như minh họa dưới đây, và gán nó vào trường `tài khoản` của giao dịch.

```javascript
// Create an account with AccountKeyLegacy
const accountWithLegacyKey = caver.account.createWithAccountKeyLegacy(keyringToUpdate.address)

// Create an account with AccountKeyFail
const accountWithFailKey = caver.account.createWithAccountKeyFail(keyringToUpdate.address)
```

### Hợp đồng thông minh <a href="#smart-contract" id="smart-contract"></a>

Gói [caver.contract](api/caver.contract.md) giúp việc tương tác với hợp đồng thông minh trên Klaytn trở nên dễ dàng hơn. Nó tự động chuyển đổi tất cả các phương pháp của hợp đồng thông minh thành những cuộc gọi javascript khi ABI mức độ thấp (Giao diện nhị phân ứng dụng) được đưa ra. Điều này cho phép bạn tương tác với các hợp đồng thông minh như thể chúng là các đối tượng JavaScript.

Trước tiên, chúng ta sẽ tạo một ví dụ đơn giản bằng ngôn ngữ solidity như dưới đây. Tạo tập tin "test.sol" và viết vào đó ví dụ dưới đây.

```
pragma solidity ^0.5.6;

contract KVstore {
    mapping(string=>string) store;
    function get(string memory key) public view returns (string memory) {
        return store[key];
    }
    function set(string memory key, string memory value) public {
        store[key] = value;
    }
}
```

Bây giờ, chúng ta có thể lập một hợp đồng thông minh để lấy chỉ thị biên dịch và ABI của nó.

```
> solc --abi --bin ./test.sol
======= ./test.sol:KVstore =======
Binary: 
608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029
Contract JSON ABI 
[{"constant":true,"inputs":[{"name":"key","type":"string"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"value","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
```

**LƯU Ý**: Để lập một hợp đồng thông minh, bạn phải cài đặt trước [trình biên dịch solidity](https://solidity.readthedocs.io/en/develop/installing-solidity.html).

Đối với việc triển khai hợp đồng thông minh, bạn có thể dùng [caver.contract](api/caver.contract.md) để triển khai, hoặc bạn có thể triển khai bằng cách sử dụng [caver.transaction.smartContractDeploy](api/caver-transaction/basic.md#smartcontractdeploy), [caver.transaction.feeDelegatedSmartContractDeploy](api/caver-transaction/fee-delegation.md#feedelegatedsmartcontractdeploy) hoặc [caver.transaction.feeDelegatedSmartContractDeployWithRatio](api/caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio) transaction. Dưới đây là một ví dụ về việc sử dụng [caver.contract](api/caver.contract.md).

Bạn có thể tạo một đối tượng tài khoản cụ thể như dưới đây bằng cách sử dụng kết quả từ việc lập hợp đồng thông minh.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]

	const contractInstance = caver.contract.create(abi)
	console.log(contractInstance)
	console.log(contractInstance.options.address)
}

testFunction()
```

Khi chạy mã trên, bạn sẽ nhận được kết quả sau.

```bash
$ node ./test.js
Contract {
	...
  methods: {
		get: [Function: bound _createTxObject],
		'0x693ec85e': [Function: bound _createTxObject],
		'get(string)': [Function: bound _createTxObject],
		set: [Function: bound _createTxObject],
		'0xe942b516': [Function: bound _createTxObject],
		'set(string,string)': [Function: bound _createTxObject]
	},
  events: { allEvents: [Function: bound ] },
  _address: null,
  _jsonInterface: [ ... ],
  _keyrings: KeyringContainer { ... }
}
null
```

Nhìn vào kết quả đầu ra ở trên, bạn có thể thấy rằng các phương pháp được quản lý thông quan abi bên trong đối tượng Hợp đồng cụ thể. Và vì nó vẫn chưa được triển khai, bạn có thể thấy rằng kết quả của `contractInstance.options.address` có đầu ra là null.

Nếu hợp đồng thông minh đã được triển khai và bạn biết địa chỉ hợp đồng mà tại đó hợp đồng thông minh được triển khai, hãy dùng địa chỉ hợp đồng đó làm tham số thứ hai như dưới đây.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]
	
	const contractInstance = caver.contract.create(abi, '0x3466D49256b0982E1f240b64e097FF04f99Ed4b9')

	console.log(contractInstance)
	console.log(contractInstance.options.address)
}

testFunction()
```

Khi chạy mã trên, bạn sẽ nhận được kết quả sau.

```bash
$ node ./test.js
Contract {
	...
  methods: {
		get: [Function: bound _createTxObject],
		'0x693ec85e': [Function: bound _createTxObject],
		'get(string)': [Function: bound _createTxObject],
		set: [Function: bound _createTxObject],
		'0xe942b516': [Function: bound _createTxObject],
		'set(string,string)': [Function: bound _createTxObject]
	},
  events: { allEvents: [Function: bound ] },
  _address: '0x3466D49256b0982E1f240b64e097FF04f99Ed4b9',
  _jsonInterface: [ ... ],
  _keyrings: KeyringContainer { ... }
}
0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

Vì phiên bản hợp đồng cụ thể này nhận được địa chỉ của hợp đồng thông minh, nó lưu trữ địa chỉ hợp đồng trong `contractInstance.options.address`.

Nếu phiên bản hợp đồng cụ thể được tạo ra, bạn có thể triển khai nó bằng cách đưa chỉ thị biên dịch vào trường `data` như dưới đây.

Lưu ý rằng [caver.contract](api/caver.contract.md) gửi các giao dịch để triển khai và thực thi. Nó dùng các keyring trong `caver.wallet` để ký các giao dịch. Keyring cần dùng phải được thêm vào `caver.wallet` từ trước.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const deployer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	caver.wallet.add(deployer)
	
	const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]

    const byteCode =
        '608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029'

	const contractInstance = caver.contract.create(abi)
	
	const deployedInstance = await contractInstance.deploy({
		from: deployer.address,
		gas: 1500000,
	}, byteCode)

	console.log(deployedInstance)
	console.log(deployedInstance.options.address)
}

testFunction()
```

Trong mã trên, `deployer` triển khai hợp đồng trên Klaytn và trả lại đối tượng contract cụ thể đã được triển khai.

```bash
$ node ./test.js
Contract {
	...
  methods: {
		get: [Function: bound _createTxObject],
		'0x693ec85e': [Function: bound _createTxObject],
		'get(string)': [Function: bound _createTxObject],
		set: [Function: bound _createTxObject],
		'0xe942b516': [Function: bound _createTxObject],
		'set(string,string)': [Function: bound _createTxObject]
	},
  events: { allEvents: [Function: bound ] },
  _address: '0x3466D49256b0982E1f240b64e097FF04f99Ed4b9',
  _jsonInterface: [ ... ],
  _keyrings: KeyringContainer { ... }
}
0x3466D49256b0982E1f240b64e097FF04f99Ed4b9
```

Để triển khai một hợp đồng thông minh qua giao dịch có phí ủy thác, hãy xác định `feeDelegation` và `feePayer` như ví dụ dưới đây:

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function deployWithFeeDelegation() {
    const deployer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(deployer)

    const feePayer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(feePayer)

    const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]

    const byteCode =
        '608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029'

	const contractInstance = caver.contract.create(abi)

	const deployedInstance = await contractInstance.deploy({
		from: deployer.address,
		feeDelegation: true,
		feePayer: feePayer.address,
		gas: 1500000,
	}, byteCode)
	
	console.log(deployedInstance)
	console.log(deployedInstance.options.address)
}
```

Nếu bạn muốn gửi một giao dịch trong đó người gửi và người trả phí ký riêng biệt nhau khi triển khai một hợp đồng thông minh qua `caver.contract`, hãy tham khảo mã dưới đây:

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function deployWithFeeDelegation() {
    const deployer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(deployer)

    const feePayer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(feePayer)

    const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]

    const byteCode =
        '608060405234801561001057600080fd5b5061051f806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a723058203ffebc792829e0434ecc495da1b53d24399cd7fff506a4fd03589861843e14990029'

	const contractInstance = caver.contract.create(abi)

	const signed = await contractInstance.sign({
		from: deployer.address,
		feeDelegation: true,
		gas: 1500000,
	}, 'constructor', byteCode)
	
	await caver.wallet.signAsFeePayer(feePayer.address, signed)

	const receipt = await caver.rpc.klay.sendRawTransaction(signed)

	const deployed = caver.contract.create(abi, receipt.contractAddress)
}
```

Một hợp đồng thông minh có thể được thực thi bằng một trong những phương pháp sau, tùy thuộc vào loại giao dịch thực thi hợp động: lớp `Contract` trong `caver.contract` hoặc [caver.transaction.smartContractExecution](api/caver-transaction/basic.md#smartcontractexecution), [caver.transaction.feeDelegatedSmartContractExecution](api/caver-transaction/fee-delegation.md#feedelegatedsmartcontractexecution) hoặc [caver.transaction.feeDelegatedSmartContractExecutionWithRatio](api/caver-transaction/partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio). Để gửi một giao dịch cho việc thực thi hợp đồng thông minh:

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const keyring = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
	caver.wallet.add(keyring)

	const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]
	
	const contractInstance = caver.contract.create(abi, '0x{address in hex}')
	const receipt = await contractInstance.send({ from: keyring.address, gas: '0x4bfd200' }, 'set', 'testKey', 'testValue')
	console.log(receipt)
}

testFunction()
```

Khi mã trên được triển khai, kết quả giao dịch từ việc triển khai `set` xuất hiện như bên dưới.

```bash
$ node ./test.js
{ 
	blockHash: '0x610336d43644abc5ab71156f7334ff67deabdd8de27778faa9dec99d225927e6',
  blockNumber: 4724,
  contractAddress: null,
  from: '0xbbfa9e3f76ddafedc28197e0f893366dd3c5c74a',
  gas: '0x4bfd200',
  gasPrice: '0x5d21dba00',
  gasUsed: 62351,
  input: '0xe942b...',
  ...
  status: true,
  to: '0x3466d49256b0982e1f240b64e097ff04f99ed4b9',
  transactionHash: '0x3a354703ab4a7b32492edab454b446dd3e92eec81ecbdaf2c3d84ffdd5cf9948',
  transactionIndex: 0,
  type: 'TxTypeSmartContractExecution',
  typeInt: 48,
  value: '0x0',
  events: {}
}
```

Để thực thi một hợp đồng thông minh qua giao dịch có phí ủy thác, hãy xác định `feeDelegation` và `feePayer` như ví dụ dưới đây:

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function executionWithFeeDelegation() {
    const executor = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(executor)

    const feePayer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(feePayer)

    const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]

    // Pass contract address as a second parameter
    const contractInstance = caver.contract.create(abi, '0x{address in hex}')

	const receipt = await contractInstance.send({
        from: executor.address,
		gas: 1000000,
		feeDelegation: true,
		feePayer: feePayer.address,
	}, 'set', 'testKey', 'testValue')
    console.log(receipt)
}
```

Nếu bạn muốn gửi một giao dịch trong đó người gửi và người trả phí ký riêng biệt nhau khi thực thi một hợp đồng thông minh qua `caver.contract`, hãy tham khảo mã dưới đây:

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function deployWithFeeDelegation() {
    const deployer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(deployer)

    const feePayer = caver.wallet.keyring.createFromPrivateKey('0x{private key}')
    caver.wallet.add(feePayer)

    const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]

	const contractInstance = caver.contract.create(abi)

	const signed = await contractInstance.sign({
		from: deployer.address,
		feeDelegation: true,
		gas: 1500000,
	}, 'set', 'testKey', 'testValue')
	
	await caver.wallet.signAsFeePayer(feePayer.address, signed)

	const receipt = await caver.rpc.klay.sendRawTransaction(signed)
    console.log(receipt)
}
```

Để tải một đối tương hợp đồng cụ thể và gọi một trong các hàm của nó:

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const abi = [
        {
            constant: true,
            inputs: [{ name: 'key', type: 'string' }],
            name: 'get',
            outputs: [{ name: '', type: 'string' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
        },
        {
            constant: false,
            inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }],
            name: 'set',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ]
	const contractInstance = caver.contract.create(abi, '0x{smart contract address}')

	const value = await contractInstance.call('get', 'testKey')
	console.log(value)
}

testFunction()
```

Khi mã trên được thực thi, giá trị sẽ được hiển thị dưới dạng kết quả đầu ra như dưới đây.

```bash
$ node ./test.js
testValue
```

Để tìm hiểu thêm thông tin, hãy xem [caver.contract](api/caver.contract.md).

## Gửi một giao dịch có nhiều người ký <a href="#sending-a-transaction-with-multiple-signers" id="sending-a-transaction-with-multiple-signers"></a>

Nếu AccountKey của tài khoản Klaytn là AccountKeyMultiSig hoặc AccountKeyRoleBased, có thể có nhiều người khác nhau quản lý từng khóa.

Phần này mô tả cách để thu thập nhiều chữ ký và gửi giao dịch nếu có nhiều người ký.

Để chạy ví dụ này, bạn cần cập nhật AccountKey của tài khoản Klaytn mà bạn dùng để thử nghiệm với [AccountKeyWeightedMultiSig](../../../learn/accounts.md#accountkeyweightedmultisig). Vui lòng tham khảo [Cập nhật tài khoản](#account-update) để xem cách cập nhật tài khoản Klaytn.

### Ký tuần sự <a href="#signing-sequentially" id="signing-sequentially"></a>

Khi một giao dịch được ký bằng `caver.wallet` hoặc hàm `sign` của giao dịch, các chữ ký (hoặc feePayerSignatures) được xác định (hoặc thêm vào) bên trong giao dịch. Bạn có thể lấy chuỗi mã hóa RLP (`rawTransaction`) có chứa các chữ ký (và feePayerSignatures) bằng cách gọi hàm `transaction.getRLPEncoding()` của đối tượng giao dịch cụ thể được ký.

Ví dụ sau đây cho thấy cách để tuần tự ký một giao dịch với nhiều khóa riêng tư. Giả sử rằng AccountKey của tài khoản gửi giao dịch này là AccountKeyWeightedMultiSig của hai khóa công khai, điều này có nghĩa là tài khoản Klaytn này có thể dùng hai chuỗi khóa riêng tư, một khóa riêng tư cho từng người dùng. Đây là trường hợp có hai người dùng chia sẻ cùng một tài khoảng Klaytn.

Trong ví dụ dưới đây, user1 và user2 tạo ra các đối tượng `Keyring` cụ thể để sử dụng. Sau đó, mỗi người dùng keyring của riêng mình để ký giao dịch. Ví dụ dưới đây sử dụng `transaction.sign` để ký.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const user1 = caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key1}')
	const user2 = caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key2}')

	const transaction = caver.transaction.valueTransfer.create({
		from: user1.address,
		to: '0x45c2a1e3a1c3957a06dae73ad516461c2d2c7ccc',
		value: 1,
		gas: 70000,
	})

	await transaction.sign(user1)
	console.log(transaction.signatures)

	await transaction.sign(user2)
	console.log(transaction.signatures)
}

testFunction()
```

Khi chạy mã trên, bạn sẽ nhận được kết quả sau. Nhìn vào kết quả thực thi của mã trên, nếu user1 ký, một chữ ký sẽ được tạo ra. Nếu user2 ký, chữ ký của user2 sẽ được thêm vào. [SignatureData](api/caver-wallet/keyring.md#signaturedata) là một đối tượng chứa một chữ ký.

```bash
$ node ./test.js
[ 
	SignatureData { _v: '0x4e43', _r: '0x3f3d3...', _s: '0x24f94...' }
]
[ 
	SignatureData { _v: '0x4e43', _r: '0x3f3d3...', _s: '0x24f94...' },
	SignatureData { _v: '0x4e44', _r: '0xd6a94...', _s: '0x72dc8...' }
]
```

Hãy cùng xem cách để ký tuần tự mà không cần chia sẻ cùng một đối tượng giao dịch. Trong ví dụ dưới đây, user1 gửi cho user2 chuỗi mã hóa RLP, chính là kết quả của hàm getRLPEncoding của giao dịch đã ký.

Mã dưới đây giải thích cách để ký và bổ sung chữ ký vào bằng chuỗi mã hóa RLP.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	// Create user1's keyring
	const user1 = caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key1}')
	
	// Create a value transfer transaction
	const transaction = caver.transaction.valueTransfer.create({
		from: user1.address,
		to: '0x45c2a1e3a1c3957a06dae73ad516461c2d2c7ccc',
		value: 1,
		gas: 70000,
	})
	
	// Sign the transaction
	await transaction.sign(user1)

	// Create user2's keyring
	const user2 = caver.wallet.keyring.createWithSingleKey('0x{address in hex}', '0x{private key2}')

	// Create a value transfer transaction from the RLP-encoded string
	const rlpEncoding = transaction.getRLPEncoding()
	const transactionFromRLP = caver.transaction.valueTransfer.create(rlpEncoding)

	await transactionFromRLP.sign(user2)
	console.log(transactionFromRLP.signatures)
}

testFunction()
```

Khi chạy mã trên, bạn sẽ nhận được kết quả sau.

```bash
$ node ./test.js
[ 
	SignatureData { _v: '0x4e43', _r: '0x3f3d3...', _s: '0x24f94...' },
	SignatureData { _v: '0x4e44', _r: '0xd6a94...', _s: '0x72dc8...' }
]
```

Nếu chạy mã trên, bạn có thể thấy rằng chữ ký của user2 đã được đưa vào `transactionFromRLP.signatures` và trong đó có tổng cộng hai chữ ký.

Khi tất cả người dùng đã ký, hãy gửi giao dịch đến mạng lưới qua `await caver.rpc.klay.sendRawTransaction(transactionFromRLP)`.

Nếu bạn gửi một giao dịch có phí ủy thác, và người trả phí dùng nhiều khóa, bạn có thể tiếp tục với logic trên bằng `caver.wallet.signAsFeePayer`.

### Kết hợp các giao dịch thô đã ký <a href="#combining-signed-rawtransactions" id="combining-signed-rawtransactions"></a>

Nếu bạn nhận được nhiều chuỗi giao dịch thô mã hóa RLP đã ký từ nhiều người, bạn có thể kết hợp chúng thành một chuỗi giao dịch thô mã hóa RLP duy nhất có chứa tất cả các chữ ký.

Ví dụ dưới đây cho thấy cách để kết hợp và gửi các giao dịch mã hóa RLP.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const vt = caver.transaction.valueTransfer.create({
		from: '0x0fa355263f37f5a54d9179452baa8b63b8b2cdde',
		to: '0x45c2a1e3a1c3957a06dae73ad516461c2d2c7ccc',
		value: 1,
		gas: 70000,
	})
	const rlpEncodedStrings = [
		'0x08f87f018505d21dba00830111709445c2a1e3a1c3957a06dae73ad516461c2d2c7ccc01940fa355263f37f5a54d9179452baa8b63b8b2cddef847f845824e44a01aa72b883ca540c8a63de244cd061ec4f9efb139541e8db304c07ec27bc9d272a06a4ca54f6269f2ddfe3648eb9ed57b0c5739f0077e1a38449f3ae3cc0b20dc3e',
		'0x08f8c6018505d21dba00830111709445c2a1e3a1c3957a06dae73ad516461c2d2c7ccc01940fa355263f37f5a54d9179452baa8b63b8b2cddef88ef845824e44a01aa72b883ca540c8a63de244cd061ec4f9efb139541e8db304c07ec27bc9d272a06a4ca54f6269f2ddfe3648eb9ed57b0c5739f0077e1a38449f3ae3cc0b20dc3ef845824e43a0fd76dfc53c812ec6aa860076f731e3913936088a1518cc34f2d176bcbe0ac772a071491c938458fffe106dde485fc8b26cbebe8a517c46bd185b126930f480d773',
		'0x08f8c6018505d21dba00830111709445c2a1e3a1c3957a06dae73ad516461c2d2c7ccc01940fa355263f37f5a54d9179452baa8b63b8b2cddef88ef845824e44a01aa72b883ca540c8a63de244cd061ec4f9efb139541e8db304c07ec27bc9d272a06a4ca54f6269f2ddfe3648eb9ed57b0c5739f0077e1a38449f3ae3cc0b20dc3ef845824e43a021e84a4740b374cdcf0cc38f93225f6d2f77388a9d90302d47b4f3ed84e4db5fa072ff5e77d2506d5222081c4d2a341c6ee5d258500030564f985951472f247b7d',
	]
	const combined = vt.combineSignedRawTransactions(rlpEncodedStrings)
	console.log(combined)
}

testFunction()
```

Khi chạy mã trên, bạn sẽ nhận được kết quả sau.

```bash
$ node ./test.js
0x08f9010d808505d21dba00830111709445c2a1e3a1c3957a06dae73ad516461c2d2c7ccc01940fa355263f37f5a54d9179452baa8b63b8b2cddef8d5f8458207f5a094ce13c39d25d44ad1d07ba2fd89f476c4dc6eef6071a2ef1f496f9b04d049e5a00f7abddd548998b0a55e53600a48286c38262fffc6c153a64e8f65a77c11c722f8458207f6a0ceeea7287b2670719d8ac15cf3b21b36fcaf74d58cce99935ce17e100064037aa0499067788d5db5e7c09ed7bfe19764d66684abc06b81e8f54ea254377bc81066f8458207f5a05c3ba89336c7d84d4ce08104cfd6f7ef33cd9f29766a1955baae8bcf964fd50fa015accbbce6bb11847a3b0660491775d64ef6d692ea709b768f64f12968c09240
```

Sau khi chạy mã trên, kết quả đầu ra sẽ là một chuỗi giao dịch thô mã hóa RLP có tất cả thông tin chữ ký được kết hợp.

Khi thực thi `combineSignedRawTransactions`, các chuỗi giao dịch thô mã hóa RLP đã ký cần được kết hợp phải giống hệt nhau, ngoại trừ các chữ ký và biến tùy chọn trong đối tượng giao dịch cụ thể. Các biến tùy chọn không có giá trị cho trước trong đối tượng giao dịch cơ sở cụ thể (đối tượng gọi của `combineSignedRawTransactions`) sẽ được quy đổi sang những biến tương ứng trong chuỗi giao dịch thô dưới đây để được hợp nhất ngay sau đó. Nếu phát sinh hiện tượng không nhất quán giữa các chuỗi giao dịch thô, bao gồm giá trị của các biến tùy chọn cần được hợp nhất, sẽ có lỗi xảy ra.

combineSignedRawTransactions trả về kết quả là một chuỗi mã hóa RLP có chứa tất cả các chữ ký (và feePayerSignatures nếu giao dịch là loại có phí ủy thác). Bạn dùng kết quả này để gửi một giao dịch đến mạng lưới qua `await caver.rpc.klay.sendRawTransaction(combined)`.

## Phát hiện sự triển khai các giao diện KCT <a href="#detecting-implementation-of-kct-interfaces" id="detecting-implementation-of-kct-interfaces"></a>

`caver.kct` cung cấp các hàm trả lại thông tin về giao diện mà hợp đồng token KCT nhất định triển khai. Với phương pháp này, bạn có thể thấy hợp đồng token KCT đã triển khai trên Klaytn áp dụng giao diện nào.

### Phát hiện các giao diện KIP-7 <a href="#detecting-kip-7-interfaces" id="detecting-kip-7-interfaces"></a>

Để phát hiện các giao diện được áp dụng bởi hợp đồng token KIP-7, bạn có thể dùng `caver.kct.kip7.detectInterface(contractAddress)` hoặc `kip7.detectInterface()`.

Dưới đây là mã về cách để phát hiện các giao diện được áp dụng cho hợp đồng token KIP-7 được triển khai trên Klaytn nhờ các phương pháp tĩnh được cung cấp trong `caver.kct.kip7`.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const result = await caver.kct.kip7.detectInterface('0x{address in hex}')
	console.log(result)
}

testFunction()
```

Khi chạy mã trên, bạn sẽ nhận được kết quả sau.

```bash
$ node ./test.js
{
    IKIP7: true,
    IKIP7Metadata: true,
    IKIP7Mintable: true,
    IKIP7Burnable: true,
    IKIP7Pausable: true,
}
```

Dưới đây là mã về cách để phát hiện các giao diện được áp dụng cho hợp đồng token KIP-7 được triển khai trên Klaytn nhờ phương pháp thành viên của KIP7.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const kip7 = new caver.kct.kip7('0x{address in hex}')
	const result = await kip7.detectInterface()
	console.log(result)
}

testFunction()
```

Khi chạy mã trên, bạn sẽ nhận được kết quả sau.

```bash
$ node ./test.js
{
    IKIP7: true,
    IKIP7Metadata: true,
    IKIP7Mintable: true,
    IKIP7Burnable: true,
    IKIP7Pausable: true,
}
```

### Phát hiện các giao diện KIP-17 <a href="#detecting-kip-17-interfaces" id="detecting-kip-17-interfaces"></a>

Để phát hiện các giao diện được áp dụng bởi hợp đồng token KIP-17, bạn có thể dùng `caver.kct.kip17.detectInterface(contractAddress)` hoặc `kip17.detectInterface()`.

Dưới đây là mã về cách để phát hiện các giao diện được áp dụng cho hợp đồng token KIP-17 được triển khai trên Klaytn nhờ các phương pháp tĩnh được cung cấp trong `caver.kct.kip17`.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const result = await caver.kct.kip17.detectInterface('0x{address in hex}')
	console.log(result)
}

testFunction()
```

Khi chạy mã trên, bạn sẽ nhận được kết quả sau.

```bash
$ node ./test.js
{
	IKIP17: true,
	IKIP17Metadata: true,
	IKIP17Enumerable: true,
	IKIP17Mintable: true,
	IKIP17MetadataMintable: true,
	IKIP17Burnable: true,
	IKIP17Pausable: true,
}
```

Dưới đây là mã về cách để phát hiện các giao diện được áp dụng cho hợp đồng token KIP-17 được triển khai trên Klaytn nhờ phương pháp thành viên của KIP17.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const kip17 = new caver.kct.kip17('0x{address in hex}')
	const result = await kip17.detectInterface()
	console.log(result)
}

testFunction()
```

Khi chạy mã trên, bạn sẽ nhận được kết quả sau.

```bash
$ node ./test.js
{
	IKIP17: true,
	IKIP17Metadata: true,
	IKIP17Enumerable: true,
	IKIP17Mintable: true,
	IKIP17MetadataMintable: true,
	IKIP17Burnable: true,
	IKIP17Pausable: true,
}
```

### Phát hiện các giao diện KIP-37 <a href="#detect-kip-37-interfaces" id="detect-kip-37-interfaces"></a>

Để phát hiện các giao diện được áp dụng bởi hợp đồng token KIP-37, bạn có thể dùng `caver.kct.kip37.detectInterface(contractAddress)` hoặc `kip37.detectInterface()`.

Dưới đây là mã về cách để phát hiện các giao diện được áp dụng cho hợp đồng token KIP-37 được triển khai trên Klaytn nhờ các phương pháp tĩnh được cung cấp trong `caver.kct.kip37`.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const result = await caver.kct.kip37.detectInterface('0x{address in hex}')
	console.log(result)
}

testFunction()
```

Khi chạy mã trên, bạn sẽ nhận được kết quả sau.

```bash
$ node ./test.js
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}
```

Dưới đây là mã về cách để phát hiện các giao diện được áp dụng cho hợp đồng token KIP-37 được triển khai trên Klaytn nhờ phương pháp thành viên của KIP37.

```javascript
// test.js
const Caver = require('caver-js')
const caver = new Caver('https://public-en-baobab.klaytn.net/')

async function testFunction() {
	const kip37 = new caver.kct.kip37('0x{address in hex}')
	const result = await kip37.detectInterface()
	console.log(result)
}

testFunction()
```

Khi chạy mã trên, bạn sẽ nhận được kết quả sau.

```bash
$ node ./test.js
{
    IKIP37: true,
    IKIP37Metadata: true,
    IKIP37Mintable: true,
    IKIP37Burnable: true,
    IKIP37Pausable: true,
}
```

## Dự án mẫu <a href="#sample-projects" id="sample-projects"></a>

Các dự án mẫu phát triển DApp (Ứng dụng chuỗi khối) sử dụng caver-js bao gồm:

- [Count DApp](../../../build/tutorials/count-dapp/count-dapp.md)
- [Klaystagram](../../../build/tutorials/klaystagram/klaystagram.md)

## Khắc phục sự cố <a href="#troubleshooting" id="troubleshooting"></a>

- **Lỗi: không thể khắc phục 'fs'** phát sinh trong khi xây dựng với caver-js trong một trình duyệt web:

  - Hãy thêm cấu hình webpack sau.

  ```
  module.exports = {
   	...
   	node: {
   		fs: 'empty',
   	},
   	...
   }
  ```

  Nếu sử dụng khuôn khổ web Next.js, bạn có thể thêm cấu hình webpack vào tập tin **next.config.json** như dưới đây:

  ```
  module.exports = {
   	webpack: (config, { isServer }) => {
   		if (!isServer) {
   			config.node = {
   				fs: 'empty'
   			}
   		}
   		return config
   	}
   }
  ```

## Liên kết <a href="#links" id="links"></a>

- caver-js [Kho GitHub](https://github.com/klaytn/caver-js)
- caver-js trên [npm](https://www.npmjs.com/package/caver-js)
