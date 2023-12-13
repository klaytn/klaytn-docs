# caver.transaction

`caver.transaction` là một gói cung cấp các chức năng liên quan đến Giao dịch.

## Lớp <a href="#class" id="class"></a>

Mỗi lớp giao dịch được mô tả chi tiết trong bảng dưới đây:

|                        | Cơ bản                                                    | Ủy thác phí                                                                                | Ủy thác phí một phần                                                                                                 |
| ---------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| LegacyTransaction      | [LegacyTransaction](./basic.md#legacytransaction)           | Không có                                                                                   | Không có                                                                                                             |
| ValueTransfer          | [ValueTransfer](./basic.md#valuetransfer)                   | [FeeDelegatedValueTransfer](./fee-delegation.md#feedelegatedvaluetransfer)                   | [FeeDelegatedValueTransferWithRatio](./partial-fee-delegation.md#feedelegatedvaluetransferwithratio)                   |
| ValueTransferMemo      | [ValueTransferMemo](./basic.md#valuetransfermemo)           | [FeeDelegatedValueTransferMemo](./fee-delegation.md#feedelegatedvaluetransfermemo)           | [FeeDelegatedValueTransferMemoWithRatio](./partial-fee-delegation.md#feedelegatedvaluetransfermemowithratio)           |
| SmartContractDeploy    | [SmartContractDeploy](./basic.md#smartcontractdeploy)       | [FeeDelegatedSmartContractDeploy](./fee-delegation.md#feedelegatedsmartcontractdeploy)       | [FeeDelegatedSmartContractDeployWithRatio](./partial-fee-delegation.md#feedelegatedsmartcontractdeploywithratio)       |
| SmartContractExecution | [SmartContractExecution](./basic.md#smartcontractexecution) | [FeeDelegatedSmartContractExecution](./fee-delegation.md#feedelegatedsmartcontractexecution) | [FeeDelegatedSmartContractExecutionWithRatio](./partial-fee-delegation.md#feedelegatedsmartcontractexecutionwithratio) |
| AccountUpdate          | [AccountUpdate](./basic.md#accountupdate)                   | [FeeDelegatedAccountUpdate](./fee-delegation.md#feedelegatedaccountupdate)                   | [FeeDelegatedAccountUpdateWithRatio](./partial-fee-delegation.md#feedelegatedaccountupdatewithratio)                   |
| Cancel                 | [Cancel](./basic.md#cancel)                                 | [FeeDelegatedCancel](./fee-delegation.md#feedelegatedcancel)                                 | [FeeDelegatedCancelWithRatio](./partial-fee-delegation.md#feedelegatedcancelwithratio)                                 |
| ChainDataAnchoring     | [ChainDataAnchoring](./basic.md#chaindataanchoring)         | [FeeDelegatedChainDataAnchoring](./fee-delegation.md#feedelegatedchaindataanchoring)         | [FeeDelegatedChainDataAnchoringWithRatio](./partial-fee-delegation.md#feedelegatedchaindataanchoringwithratio)         |
| EthereumAccessList     | [EthereumAccessList](./basic.md#ethereumaccesslist)         | Không có                                                                                   | Không có                                                                                                             |
| EthereumDynamicFee     | [EthereumDynamicFee](./basic.md#ethereumdynamicfee)         | Không có                                                                                   | Không có                                                                                                             |

## caver.transaction.decode <a href="#caver-transaction-decode" id="caver-transaction-decode"></a>

```javascript
caver.transaction.decode(rlpEncoded)
```

Giải mã chuỗi giao dịch được mã hóa RLP, giao dịch thô và trả về một đối tượng [Giao dịch](#class).

**Tham số**

| Tên        | Loại | Mô tả                                       |
| ---------- | ----- | ------------------------------------------- |
| rlpEncoded | chuỗi | Chuỗi giao dịch được mã hóa RLP để giải mã. |

**Giá trị trả về**

| Loại     | Mô tả                                                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------------------------- |
| đối tượng | Một đối tượng [Giao dịch](#class). Để biết thông tin chi tiết về mỗi giao dịch, vui lòng tham khảo mục [Giao dịch](#class). |

**Ví dụ**

```javascript
> caver.transaction.decode('0x08f87...')
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
    _gas: '0xf4240',
    _nonce: '0x4d2',
    _gasPrice: '0x19',
    _signatures: [ 
        SignatureData { _v: '0x25', _r: '0xf3d0c...', _s: '0x6748a...' }
    ],
    _to: '0x7b65b75d204abed71587c9e519a89277766ee1d0',
    _value: '0xa'
}
```

## caver.transaction.getTransactionByHash <a href="#caver-transaction-gettransactionbyhash" id="caver-transaction-gettransactionbyhash"></a>

```javascript
caver.transaction.getTransactionByHash('0x{transaction hash}')
```

Truy vấn một giao dịch từ Klaytn và chuyển đổi thành một đối tượng giao dịch của thư viện caver.

**LƯU Ý** `caver.transaction.getTransactionByHash` được hỗ trợ kể từ phiên bản caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3).

**Tham số**

| Tên             | Loại | Mô tả                                          |
| --------------- | ----- | ---------------------------------------------- |
| transactionHash | chuỗi | Chuỗi hàm băm giao dịch để truy vấn từ Klaytn. |

**Giá trị trả về**

`Promise` trả về `object`: Một đối tượng [Giao dịch](#class). Xảy ra lỗi nếu không nhận được đối tượng giao dịch từ Klaytn.

| Loại     | Mô tả                                                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------------------------- |
| đối tượng | Một đối tượng [Giao dịch](#class). Để biết thông tin chi tiết về mỗi giao dịch, vui lòng tham khảo mục [Giao dịch](#class). |

**Ví dụ**

```javascript
> caver.transaction.getTransactionByHash('0x30575f5a76a4477502aa1e5e707e47f05b92c3450132529cf55764cc94f780b0').then(console.log)
LegacyTransaction {
  _type: 'TxTypeLegacyTransaction',
  _from: '0x9ce618d097ea54c00d1562cb060576ff64139f10',
  _gas: '0x81b320',
  _nonce: '0x1de',
  _gasPrice: '0x5d21dba00',
  _signatures: SignatureData {
    _v: '0x07f5',
    _r: '0x359a09ebd2842cfc9cad6fd93c299da8629292bb3a69410c73837f7ca15cfd51',
    _s: '0x6f348cc656b90e79cfc1e748c3371fbd0128b83b787a110622f3aa5143a017f8'
  },
  _to: '0x',
  _input: '0x60806...',
  _value: '0x0'
}
```

## caver.transaction.recoverPublicKeys <a href="#caver-transaction-recoverpublickeys" id="caver-transaction-recoverpublickeys"></a>

```javascript
caver.transaction.recoverPublicKeys('0x{RLP-encoded transaction}')
```

Khôi phục các chuỗi khóa công khai từ trường `signatures` của giao dịch đã cho.

**LƯU Ý** `caver.transaction.recoverPublicKeys` được hỗ trợ kể từ phiên bản caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3).

**Tham số**

| Tên   | Loại | Mô tả                                                                        |
| ----- | ----- | ---------------------------------------------------------------------------- |
| rawTx | chuỗi | Chuỗi giao dịch được mã hóa RLP để khôi phục khóa công khai từ `signatures`. |

**Giá trị trả về**

| type | Mô tả                                                    |
| ---- | -------------------------------------------------------- |
| Mảng | Mảng chứa khóa công khai được khôi phục từ `signatures`. |

**Ví dụ**

```javascript
> caver.transaction.recoverPublicKeys('0x08f9010e808505d21dba008402faf0809459177716c34ac6e49e295a0e78e33522f14d61ee0194f21460730845e3652aa3cc9bc13b345e4f53984af8d5f845820feaa02b5934c6d26bb3e65edf099d79c57c743d2f70744ca09d3ba9a1099edff9f173a00797886edff4b449c1a599943e3a6003ae9e46b3f3f34862ced327e43fba3a6af845820fe9a063177648732ef855f800eb9f80f68501abb507f84c0d660286a6e0801334a1d2a0620a996623c114f2df35b11ec8ac4f3758d3ad89cf81ba13614e51908cfe9218f845820fe9a086c8ecbfd892be41d48443a2243274beb6daed3f72895045965a3baede4c350ea069ea748aff6e4c106d3a8ba597d8f134745b76f12dacb581318f9da07351511a')
[
  '0x8bb6aaeb2d96d024754d3b50babf116cece68977acbe8ba6a66f14d5217c60d96af020a0568661e7c72e753e80efe084a3aed9f9ac87bf44d09ce67aad3d4e01',
  '0xc7751c794337a93e4db041fb5401c2c816cf0a099d8fd4b1f3f555aab5dfead2417521bb0c03d8637f350df15ef6a6cb3cdb806bd9d10bc71982dd03ff5d9ddd',
  '0x3919091ba17c106dd034af508cfe00b963d173dffab2c7702890e25a96d107ca1bb4f148ee1984751e57d2435468558193ce84ab9a7731b842e9672e40dc0f22'
]
```

## caver.transaction.recoverFeePayerPublicKeys <a href="#caver-transaction-recoverfeepayerpublickeys" id="caver-transaction-recoverfeepayerpublickeys"></a>

```javascript
caver.transaction.recoverFeePayerPublicKeys('0x{RLP-encoded transaction}')
```

Khôi phục các chuỗi khóa công khai từ trường `feePayerSignatures` của giao dịch đã cho.

**LƯU Ý** `caver.transaction.recoverFeePayerPublicKeys` được hỗ trợ kể từ phiên bản caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3).

**Tham số**

| Tên   | Loại | Mô tả                                                                                                                                                                                                                     |
| ----- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rawTx | chuỗi | Chuỗi giao dịch được mã hóa RLP để khôi phục khóa công khai từ `feePayerSignatures`. Để khôi phục khóa công khai của người trả phí, giao dịch phải là giao dịch có phí ủy thác với trường `feePayerSignatures` bên trong. |

**Giá trị trả về**

| Loại | Mô tả                                                            |
| ----- | ---------------------------------------------------------------- |
| Mảng  | Mảng chứa khóa công khai được khôi phục từ `feePayerSignatures`. |

**Ví dụ**

```javascript
> caver.transaction.recoverFeePayerPublicKeys('0x09f901fa808505d21dba008402faf0809459177716c34ac6e49e295a0e78e33522f14d61ee019407a9a76ef778676c3bd2b334edcf581db31a85e5f8d5f845820feaa0cb2bbf04a12ec3a06163c30ce8782739ec4745a53e265aa9443f1c0d678bb871a07dd348c7d8fce6be36b661f116973d1c36cc92a389ad4a1a4053bd486060a083f845820fe9a06d5dfca992d6833c0da272578bc6ea941be45f44fb2fa114310ebe18d673ed52a04dc5cd7985c9ce7d44d46d65e65c995a4a8c97159a1eed8b2efb0510b981ab7cf845820feaa0945151edf556fbcebf832092d4534b9a3b1f3d46f85bce09e7d7211070cb57bea01617c8f918f96970baddd12f240a9824eca6b29d91eb7333adacb987f2dcd8dd94b5db72925b1b6b79299a1a49ae226cd7861083acf8d5f845820feaa086fd17d788e89a6e0639395b3c0a04f916103debd6cbe639d6f4ff5034dde3e8a00795551c551d9096234c290689767f34f2d409c95166ab18d216dbc93845ba16f845820feaa00653b6d1cdb90462094b089ce8e2fed0e3b8ec2c44125965e1a5af286644c758a0259b10e3bf594d48535fd0d95e15d095897c8d075c01dd56e7417d5943b0d53af845820fe9a0ce8d051427adab10d1dc93de49123aeab18ba8aadedce0d57ef5b7fa451b1f4fa04fe2a845d92ff48abca3e1d59637fab5f4a4e3172d91772d9bfce60760edc506')
[
  '0x2b557d80ddac3a0bbcc8a7861773ca7434c969e2721a574bb94a1e3aa5ceed3819f08a82b31682c038f9f691fb38ee4aaf7e016e2c973a1bd1e48a51f60a54ea',
  '0x1a1cfe1e2ec4b15520c57c20c2460981a2f16003c8db11a0afc282abf929fa1c1868f60f91b330c423aa660913d86acc2a0b1b15e7ba1fe571e5928a19825a7e',
  '0xdea23a89dbbde1a0c26466c49c1edd32785432389641797038c2b53815cb5c73d6cf5355986fd9a22a68bb57b831857fd1636362b383bd632966392714b60d72'
]
```

## transaction.sign <a href="#transaction-sign" id="transaction-sign"></a>

```javascript
transaction.sign(keyring [, index] [, hasher])
```

Ký giao dịch bằng (các) khóa riêng tư của người gửi giao dịch trong `keyring` và thêm chữ ký vào đối tượng giao dịch với trường `signatures`.

Đối với giao dịch [Cập nhật tài khoản](./basic.md#accountupdate), sử dụng [roleAccountUpdateKey](../../../../../learn/accounts.md#roles), nếu không, sử dụng [roleTransactionKey](../../../../../learn/accounts.md#roles) trong [RoleBasedKeyring](../caver-wallet/keyring.md#rolebasedkeyring). Nếu người dùng chưa xác định `index`, `transaction.sign` sẽ ký giao dịch bằng cách sử dụng tất cả các khóa riêng tư được sử dụng cho vai trò đó. Nếu đã xác định `index`, `transaction.sign` sẽ ký giao dịch chỉ bằng một khóa riêng tư tại chỉ mục đã cho.

**Tham số**

| Tên     | type         | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| keyring | đối tượng \ | chuỗi | Chuỗi khóa riêng tư (cho phép định dạng [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format)) hoặc phiên bản Keyring ([SingleKeyring](../caver-wallet/keyring.md#singlekeyring), [MultipleKeyring](../caver-wallet/keyring.md#multiplekeyring) hoặc [RoleBasedKeyring](../caver-wallet/keyring.md#rolebasedkeyring)). Nếu một chuỗi khóa riêng tư hoặc [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) được truyền vào làm tham số, thì đối tượng keyring được tạo bên trong hàm. |
| chỉ số  | number       | (tùy chọn) Chỉ mục khóa riêng tư bạn muốn sử dụng. Chỉ mục phải nhỏ hơn độ dài của mảng các khóa riêng tư được định rõ cho mỗi vai trò. Nếu không định rõ chỉ mục, phương pháp này sẽ sử dụng tất cả các khóa riêng tư.                                                                                                                                                                                                                                                                                                                                            |
| hasher  | Hàm          | (tùy chọn) Hàm băm để tính giá trị băm của giao dịch.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

**Giá trị trả về**

`Promise` trả về `object`: Giao dịch đã ký.

| Loại     | Mô tả                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------ |
| đối tượng | Một đối tượng [Giao dịch](#class) đã ký. Chữ ký được thêm vào trường `transaction.signatures`. |

**Ví dụ**

```javascript
// Ví dụ này sử dụng giao dịch ValueTransfer.
> const transaction = caver.transaction.valueTransfer.create({
    from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    value: 1,
    gas: 30000,
})

> const customHasher = () => { ... }

// Ký một giao dịch bằng roleBasedKeyring sử dụng hai khóa riêng tư cho roleTransactionKey
> transaction.sign(roleBasedKeyring).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e43', _r: '0xd78a2...', _s: '0x379e9...' },
        SignatureData { _v: '0x4e43', _r: '0x70a58...', _s: '0x2ab28...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Ký một giao dịch bằng roleBasedKeyring sử dụng hai khóa riêng tư cho roleTransactionKey và chỉ mục
> transaction.sign(roleBasedKeyring, 1).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e43', _r: '0x70a58...', _s: '0x2ab28...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Ký một giao dịch bằng roleBasedKeyring sử dụng hai khóa riêng tư cho roleTransactionKey và hàm băm
> transaction.sign(roleBasedKeyring, customHasher).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e44', _r: '0x7a8b6...', _s: '0x17139...' },
        SignatureData { _v: '0x4e43', _r: '0x7f978...', _s: '0x1a532...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Ký một giao dịch bằng roleBasedKeyring sử dụng hai khóa riêng tư cho roleTransactionKey, chỉ mục và hàm băm
> transaction.sign(roleBasedKeyring, 1, customHasher).then(console.log)
ValueTransfer {
    _type: 'TxTypeValueTransfer',
    _from: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _gas: '0x7530',
    _signatures: [
        SignatureData { _v: '0x4e43', _r: '0x7f978...', _s: '0x1a532...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}
```

## transaction.signAsFeePayer <a href="#transaction-signasfeepayer" id="transaction-signasfeepayer"></a>

```javascript
transaction.signAsFeePayer(keyring [, index] [, hasher])
```

Ký giao dịch với vai trò là `fee payer` giao dịch và thêm `feePayerSignatures` vào đối tượng giao dịch với (các) khóa riêng tư trong `keyring`.

Để ký giao dịch với vai trò là người trả phí, hãy sử dụng [roleFeePayerKey](../../../../../learn/accounts.md#roles) trong `keyring`. Nếu người dùng chưa xác định `index`, `transaction.signAsFeePayer` sẽ ký giao dịch bằng cách sử dụng tất cả các khóa riêng tư được sử dụng cho vai trò đó. Nếu đã xác định `index`, `transaction.signAsFeePayer` sẽ ký giao dịch chỉ bằng một khóa riêng tư tại chỉ mục đã cho.

Nếu không xác định `transaction.feePayer`, địa chỉ của keyring đã cho được đặt thành `transaction.feePayer`.

Nếu `keyring` được sử dụng để ký giao dịch được thêm vào `caver.wallet`, bạn có thể dùng [caver.wallet.signAsFeePayer](../caver-wallet/caver-wallet.md#caver-wallet-signasfeepayer).

**LƯU Ý** Hàm này chỉ hoạt động cho các giao dịch "có phí ủy thác" hoặc giao dịch "có phí ủy thác theo tỷ lệ".

**Tham số**

| Tên     | type         | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyring | đối tượng \ | chuỗi | Chuỗi khóa riêng tư (cho phép định dạng [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format)) hoặc phiên bản Keyring ([SingleKeyring](../caver-wallet/keyring.md#singlekeyring), [MultipleKeyring](../caver-wallet/keyring.md#multiplekeyring) hoặc [RoleBasedKeyring](../caver-wallet/keyring.md#rolebasedkeyring)). Nếu chuỗi khóa riêng tư hoặc [KlaytnWalletKey](../../../../../learn/accounts.md#klaytn-wallet-key-format) được truyền vào làm tham số, thì đối tượng keyring được tạo bên trong hàm. |
| chỉ số  | number       | (tùy chọn) Chỉ mục khóa riêng tư bạn muốn sử dụng. Chỉ mục phải nhỏ hơn độ dài của mảng các khóa riêng tư được định rõ cho mỗi vai trò. Nếu không định rõ chỉ mục, phương pháp này sẽ sử dụng tất cả các khóa riêng tư.                                                                                                                                                                                                                                                                                                                                        |
| hasher  | Hàm          | (tùy chọn) Hàm băm để tính giá trị băm của giao dịch.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

**Giá trị trả về**

`Promise` trả về `object`: Giao dịch đã ký.

| type      | Mô tả                                                                                                    |
| --------- | -------------------------------------------------------------------------------------------------------- |
| đối tượng | Một đối tượng [Giao dịch](#class) đã ký. Chữ ký được thêm vào trường `transaction.feePayerSignatures`. |

**Ví dụ**

```javascript
// Ví dụ này sử dụng giao dịch FeeDelegatedValueTransfer.
> const transaction = caver.transaction.feeDelegatedValueTransfer.create({
    from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    value: 1,
    gas: 30000,
})

> const customHasher = () => { ... }

// Ký một giao dịch bằng địa chỉ RoleBasedKeyring sử dụng hai khóa riêng tư cho roleFeePayerKey
> transaction.signAsFeePayer(roleBasedKeyring).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e44', _r: '0x7010e...', _s: '0x65d6b...' },
        SignatureData { _v: '0x4e43', _r: '0x96ef2...', _s: '0x77f34...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Ký một giao dịch bằng địa chỉ RoleBasedKeyring sử dụng hai khóa riêng tư cho roleFeePayerKey và chỉ mục
> transaction.signAsFeePayer(roleBasedKeyring, 1).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e43', _r: '0x96ef2...', _s: '0x77f34...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Ký một giao dịch bằng địa chỉ RoleBasedKeyring sử dụng hai khóa riêng tư cho roleFeePayerKey và hàm băm
> transaction.signAsFeePayer(roleBasedKeyring, customHasher).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e43', _r: '0xe48bf...', _s: '0x1cf36...' },
        SignatureData { _v: '0x4e43', _r: '0x82976...', _s: '0x3c5e0...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}

// Ký một giao dịch bằng địa chỉ RoleBasedKeyring sử dụng hai khóa riêng tư cho roleFeePayerKey, chỉ mục và hàm băm
> transaction.signAsFeePayer(roleBasedKeyring, 1, customHasher).then(console.log)
FeeDelegatedValueTransfer {
    _type: 'TxTypeFeeDelegatedValueTransfer',
    _from: '0x6fddbcb99d31b8755c2b840a367f53eea4b4f45c',
    _gas: '0x7530',
    _signatures: [ SignatureData { _v: '0x01', _r: '0x', _s: '0x' } ],
    _feePayer: '0xe7e9184c125020af5d34eab7848bab799a1dcba9',
    _feePayerSignatures: [
        SignatureData { _v: '0x4e43', _r: '0x82976...', _s: '0x3c5e0...' }
    ],
    _to: '0x3424b91026bdc5ec55df4548e6ebf0f28b60abd7',
    _value: '0x1',
    _chainId: '0x2710',
    _gasPrice: '0x5d21dba00',
    _nonce: '0x0'
}
```

## transaction.appendSignatures <a href="#transaction-appendsignatures" id="transaction-appendsignatures"></a>

```javascript
transaction.appendSignatures(signatures)
```

Thêm chữ ký vào giao dịch với trường `signatures`.

**Tham số**

| Tên    | type         | Mô tả                                                                                                                                                                                                                                                                                                                                                        |
| ------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| chữ ký | đối tượng \ | Mảng | Chữ ký được thêm vào giao dịch. Đối tượng [SignatureData](../caver-wallet/keyring.md#signaturedata) hoặc mảng chứa các đối tượng [SignatureData](../caver-wallet/keyring.md#signaturedata). Một mảng trong đó mỗi 'v', 'r' và 's' được xác định theo định dạng chuỗi tuần tự hoặc một mảng 2D chứa những mảng đó cũng có thể được chuyển làm tham số. |

**Ví dụ**

```javascript
> transaction.appendSignatures([ '0x4e44', '0x7010e...', '0x65d6b...' ])
```

## transaction.appendFeePayerSignatures <a href="#transaction-appendfeepayersignatures" id="transaction-appendfeepayersignatures"></a>

```javascript
transaction.appendFeePayerSignatures(signatures)
```

Thêm chữ ký người trả phí vào giao dịch với trường `feePayerSignatures`.

**LƯU Ý** Hàm này chỉ hoạt động cho các giao dịch "có phí ủy thác" hoặc giao dịch "có phí ủy thác theo tỷ lệ".

**Tham số**

| Tên                | Loại        | Mô tả                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| feePayerSignatures | đối tượng \ | Mảng | Chữ ký của người trả phí được thêm vào giao dịch. Đối tượng [SignatureData](../caver-wallet/keyring.md#signaturedata) hoặc mảng chứa các đối tượng [SignatureData](../caver-wallet/keyring.md#signaturedata). Một mảng trong đó mỗi 'v', 'r' và 's' được xác định theo định dạng chuỗi tuần tự hoặc một mảng 2D chứa những mảng đó cũng có thể được chuyển làm tham số. |

**Ví dụ**

```javascript
> transaction.appendFeePayerSignatures([ '0x4e44', '0x7010e...', '0x65d6b...' ])
```

## transaction.combineSignedRawTransactions <a href="#transaction-combinesignatures" id="transaction-combinesignatures"></a>

```javascript
transaction.combineSignedRawTransactions(rlpEncodedTxs)
```

Thu thập chữ ký trong mỗi chuỗi giao dịch được mã hóa RLP trong mảng cho trước, kết hợp chúng với đối tượng giao dịch và trả về một chuỗi giao dịch được mã hóa RLP bao gồm tất cả các chữ ký. Lưu ý rằng không nhất thiết phải ký trước đối tượng giao dịch. Nếu giao dịch là giao dịch "có phí ủy thác" hoặc "có phí ủy thác theo tỷ lệ", `feePayerSignatures` cũng được hợp nhất và bao gồm trong chuỗi giao dịch được mã hóa RLP đầu ra.

**Tham số**

| Tên           | Loại | Mô tả                                                |
| ------------- | ----- | ---------------------------------------------------- |
| rlpEncodedTxs | Mảng  | Mảng chứa các chuỗi giao dịch đã ký được mã hóa RLP. |

**Giá trị trả về**

| Loại | Mô tả                                                                                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| chuỗi | Một chuỗi giao dịch được mã hóa RLP bao gồm tất cả `signatures` (và `feePayerSignatures` nếu giao dịch là giao dịch "có phí ủy thác" hoặc "có phí ủy thác theo tỷ lệ"). |

**Ví dụ**

```javascript
> transaction.combineSignedRawTransactions(['0x09f88...'])
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a068c29c057055f68a7860b54184bba7967bcf42b6aae12beaf9f30933e6e730c280c4c3018080'
```

## transaction.getRLPEncoding <a href="#transaction-getrlpencoding" id="transaction-getrlpencoding"></a>

```javascript
transaction.getRLPEncoding()
```

Trả về chuỗi giao dịch được mã hóa RLP.

Để biết thông tin về cách tạo chuỗi mã hóa RLP cho mỗi loại giao dịch, hãy xem [Thiết kế Klaytn - Giao dịch](../../../../../learn/transactions/transactions.md).

**Giá trị trả về**

| Loại | Mô tả                            |
| ----- | -------------------------------- |
| chuỗi | Chuỗi giao dịch được mã hóa RLP. |

**Ví dụ**

```javascript
> transaction.getRLPEncoding()
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a068c29c057055f68a7860b54184bba7967bcf42b6aae12beaf9f30933e6e730c280c4c3018080'
```

## transaction.getRawTransaction <a href="#transaction-getrawtransaction" id="transaction-getrawtransaction"></a>

```javascript
transaction.getRawTransaction()
```

Trả về một chuỗi `rawTransaction` (chuỗi giao dịch mã hóa RLP). Hàm này giống như hàm [transaction.getRLPEncoding](#transaction-getrlpencoding).

**Giá trị trả về**

| Loại | Mô tả                            |
| ----- | -------------------------------- |
| chuỗi | Chuỗi giao dịch được mã hóa RLP. |

**Ví dụ**

```javascript
> transaction.getRawTransaction()
'0x09f885018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0f847f845820feaa068e56f3da7fbe7a86543eb4b244ddbcb13b2d1cb9adb3ee8a4c8b046821bc492a068c29c057055f68a7860b54184bba7967bcf42b6aae12beaf9f30933e6e730c280c4c3018080'
```

## transaction.getTransactionHash <a href="#transaction-gettransactionhash" id="transaction-gettransactionhash"></a>

```javascript
transaction.getTransactionHash()
```

Trả về một `transactionHash`.

Để biết thông tin về cách tạo hàm băm giao dịch cho mỗi loại giao dịch, hãy xem [Thiết kế Klaytn - Giao dịch](../../../../../learn/transactions/transactions.md).

**Giá trị trả về**

| Loại | Mô tả                  |
| ----- | ---------------------- |
| chuỗi | Một hàm băm giao dịch. |

**Ví dụ**

```javascript
> transaction.getTransactionHash()
'0x8ac53afbba014201b02398545653683fe0536c49707fe302c59423012c0e8697'
```

## transaction.getSenderTxHash <a href="#transaction-getsendertxhash" id="transaction-getsendertxhash"></a>

```javascript
transaction.getSenderTxHash()
```

Trả về [senderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash) của giao dịch.

[senderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash) là hàm băm của giao dịch trừ địa chỉ và chữ ký của người trả phí, do đó [transactionHash](#transaction-gettransactionhash) và [senderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash) sẽ giống nhau đối với các giao dịch cơ bản.

Để biết thông tin về cách tạo [senderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash) cho mỗi loại giao dịch, hãy xem [Thiết kế Klaytn - Giao dịch](../../../../../learn/transactions/transactions.md).

**Giá trị trả về**

| Loại | Mô tả         |
| ----- | ------------- |
| chuỗi | SenderTxHash. |

**Ví dụ**

```javascript
> transaction.getSenderTxHash()
'0xb61cc1ddadb6f2ec34c9f9e6a7b6cf0a606422654d649d998587c77daa3c31fe'
```

## transaction.getRLPEncodingForSignature <a href="#transaction-getrlpencodingforsignature" id="transaction-getrlpencodingforsignature"></a>

```javascript
transaction.getRLPEncodingForSignature()
```

Trả về một chuỗi giao dịch được mã hóa RLP để tạo chữ ký của người gửi giao dịch. Lưu ý rằng chuỗi giao dịch được mã hóa RLP trả về không được thêm vào chữ ký và thay vào đó được sử dụng để tạo chữ ký này.

Để biết thông tin về cách tạo chuỗi giao dịch được mã hóa RLP để tạo chữ ký của người gửi giao dịch cho mỗi loại giao dịch, hãy xem [Thiết kế Klaytn - Giao dịch](../../../../../learn/transactions/transactions.md).

**Giá trị trả về**

| type  | Mô tả                                                   |
| ----- | ------------------------------------------------------- |
| chuỗi | Chuỗi giao dịch được mã hóa RLP không có chữ ký đi kèm. |

**Ví dụ**

```javascript
> transaction.getRLPEncodingForSignature()
'0xf83fb838f709018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d08207e38080'
```

## transaction.getRLPEncodingForFeePayerSignature <a href="#transaction-getrlpencodingforfeepayersignature" id="transaction-getrlpencodingforfeepayersignature"></a>

```javascript
transaction.getRLPEncodingForFeePayerSignature()
```

Trả về một chuỗi giao dịch được mã hóa RLP để tạo chữ ký của người trả phí. Lưu ý rằng chuỗi giao dịch được mã hóa RLP trả về không được thêm vào chữ ký và thay vào đó được sử dụng để tạo chữ ký này.

Để biết thông tin về cách tạo chuỗi giao dịch được mã hóa RLP để tạo chữ ký của người trả phí cho mỗi loại giao dịch, hãy xem [Thiết kế Klaytn - Giao dịch](../../../../../learn/transactions/transactions.md).

**LƯU Ý** Hàm này chỉ hoạt động cho các giao dịch "có phí ủy thác" hoặc giao dịch "có phí ủy thác theo tỷ lệ".

**Giá trị trả về**

| type  | Mô tả                                                   |
| ----- | ------------------------------------------------------- |
| chuỗi | Chuỗi giao dịch được mã hóa RLP không có chữ ký đi kèm. |

**Ví dụ**

```javascript
> transaction.getRLPEncodingForFeePayerSignature()
'0xf840b838f709018505d21dba00830f4240947b65b75d204abed71587c9e519a89277766ee1d00a9404bb86a1b16113ebe8f57071f839b002cbcbf7d0808207e38080'
```

## transaction.fillTransaction <a href="#transaction-filltransaction" id="transaction-filltransaction"></a>

```javascript
transaction.fillTransaction()
```

Điền các biến tùy chọn vào giao dịch.

Nếu `gasPrice`, `nonce` hoặc `chainId` của giao dịch không được xác định, phương pháp này sẽ yêu cầu các giá trị mặc định cho các biến tùy chọn này và thiết lập chúng bằng cách gửi lệnh gọi RPC JSON đến nút Klaytn đã kết nối.

Sử dụng lệnh gọi [caver.rpc.klay.getGasPrice](../caver-rpc/klay.md#caver-rpc-klay-getgasprice) để lấy `gasPrice`, [caver.rpc.klay.getTransactionCount](../caver-rpc/klay.md#caver-rpc-klay-gettransactioncount) để lấy `nonce` và [caver.rpc.klay.getChainId](../caver-rpc/klay.md#caver-rpc-klay-getchainid) để lấy `chainId`.

**Giá trị trả về**

`Promise` trả về `void`

**Ví dụ**

```javascript
> transaction.fillTransaction()
```

## transaction.recoverPublicKeys <a href="#transaction-recoverpublickeys" id="transaction-recoverpublickeys"></a>

```javascript
transaction.recoverPublicKeys()
```

Khôi phục các chuỗi khóa công khai từ trường `signatures`.

**LƯU Ý** `transaction.recoverPublicKeys` được hỗ trợ kể từ phiên bản caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3).

**Giá trị trả về**

| Loại | Mô tả                                                    |
| ----- | -------------------------------------------------------- |
| Mảng  | Mảng chứa khóa công khai được khôi phục từ `signatures`. |

**Ví dụ**

```javascript
> transaction.recoverPublicKeys()
[
  '0x8bb6aaeb2d96d024754d3b50babf116cece68977acbe8ba6a66f14d5217c60d96af020a0568661e7c72e753e80efe084a3aed9f9ac87bf44d09ce67aad3d4e01',
  '0xc7751c794337a93e4db041fb5401c2c816cf0a099d8fd4b1f3f555aab5dfead2417521bb0c03d8637f350df15ef6a6cb3cdb806bd9d10bc71982dd03ff5d9ddd',
  '0x3919091ba17c106dd034af508cfe00b963d173dffab2c7702890e25a96d107ca1bb4f148ee1984751e57d2435468558193ce84ab9a7731b842e9672e40dc0f22'
]
```

## transaction.recoverFeePayerPublicKeys <a href="#transaction-recoverfeepayerpublickeys" id="transaction-recoverfeepayerpublickeys"></a>

```javascript
transaction.recoverFeePayerPublicKeys()
```

Khôi phục các chuỗi khóa công khai từ trường `feePayerSignatures`.

**LƯU Ý** `transaction.recoverFeePayerPublicKeys` được hỗ trợ kể từ phiên bản caver-js [v1.6.3](https://www.npmjs.com/package/caver-js/v/1.6.3).

**Giá trị trả về**

| Loại | Mô tả                                                            |
| ----- | ---------------------------------------------------------------- |
| Mảng  | Mảng chứa khóa công khai được khôi phục từ `feePayerSignatures`. |

**Ví dụ**

```javascript
> transaction.recoverFeePayerPublicKeys()
[
  '0x2b557d80ddac3a0bbcc8a7861773ca7434c969e2721a574bb94a1e3aa5ceed3819f08a82b31682c038f9f691fb38ee4aaf7e016e2c973a1bd1e48a51f60a54ea',
  '0x1a1cfe1e2ec4b15520c57c20c2460981a2f16003c8db11a0afc282abf929fa1c1868f60f91b330c423aa660913d86acc2a0b1b15e7ba1fe571e5928a19825a7e',
  '0xdea23a89dbbde1a0c26466c49c1edd32785432389641797038c2b53815cb5c73d6cf5355986fd9a22a68bb57b831857fd1636362b383bd632966392714b60d72'
]
```

## transaction.suggestGasPrice <a href="#transaction-suggestgasprice" id="transaction-suggestgasprice"></a>

```javascript
transaction.suggestGasPrice()
```

Trả về giá gas đề xuất. Hàm này được sử dụng để thiết lập trường giá gas trong [fillTransaction](#transaction-fillTransaction).

Trước khi Magma hard fork diễn ra, `suggestGasPrice` trả về đơn giá của mạng. Sau đợt Magma hard fork, `suggestGasPrice` trả về `baseFee * 2` được khuyến nghị sử dụng như là giá gas.

**LƯU Ý** `transaction.suggestGasPrice` được hỗ trợ kể từ phiên bản caver-js [v1.9.0](https://www.npmjs.com/package/caver-js/v/1.9.0).

**Giá trị trả về**

`Promise` trả về `string`: Giá gas đề xuất trong chuỗi thập lục phân.

| Loại | Mô tả            |
| ----- | ---------------- |
| chuỗi | Giá gas đề xuất. |

**Ví dụ**

```javascript
> tx.suggestGasPrice().then(console.log)
0xba43b7400
```
