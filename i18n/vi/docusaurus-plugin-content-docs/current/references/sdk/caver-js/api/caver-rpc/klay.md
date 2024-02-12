# caver.rpc.klay

`caver.rpc.klay` cung cấp lệnh gọi JSON-RPC với không gian tên `klay`.

## caver.rpc.klay.tài khoảnCreated <a href="#caver-rpc-klay-accountcreated" id="caver-rpc-klay-accountcreated"></a>

```javascript
caver.rpc.klay.accountCreated(address [, blockNumber] [, callback])
```

Trả về `true` nếu tài khoản được liên kết với địa chỉ được tạo trong nền tảng chuỗi khối Klaytn. Nếu không sẽ trả về `false`.

**Tham số**

| Tên         | type        | Mô tả                                                                                                                             |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| address     | chuỗi       | Địa chỉ của tài khoản mà bạn muốn truy vấn nếu tài khoản đã được tạo trong mạng.                                                  |
| blockNumber | số \| chuỗi | (tùy chọn) Số khối hoặc chuỗi `mới nhất` hoặc `cũ nhất`. Nếu bị bỏ qua, chuỗi `mới nhất` sẽ được sử dụng.      |
| callback    | hàm         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `boolean`

| type    | Mô tả                            |
| ------- | -------------------------------- |
| boolean | Có địa chỉ đầu vào trong Klaytn. |

**Ví dụ**

```javascript
> caver.rpc.klay.accountCreated('0x{address in hex}').then(console.log)
true
```

## caver.rpc.klay.getAccount <a href="#caver-rpc-klay-getaccount" id="caver-rpc-klay-getaccount"></a>

```javascript
caver.rpc.klay.getAccount(address [, blockNumber] [, callback])
```

Trả về thông tin tài khoản của một địa chỉ nhất định trong Klaytn. Để biết thêm chi tiết về các loại tài khoản trong Klaytn, vui lòng tham khảo [Các loại tài khoản Klaytn](../../../../../learn/accounts.md#klaytn-account-types).

**LƯU Ý** `caver.rpc.klay.getAccount` trả về tài khoản tồn tại trên mạng, nếu tài khoản khớp với địa chỉ không tồn tại trên mạng chuỗi khối thực tế, hàm sẽ trả về `null`.

**Tham số**

| Tên         | type        | Mô tả                                                                                                                             |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| address     | chuỗi       | Địa chỉ của tài khoản mà bạn muốn có thông tin tài khoản.                                                                         |
| blockNumber | số \| chuỗi | (tùy chọn) Số khối hoặc chuỗi `mới nhất` hoặc `cũ nhất`. Nếu bị bỏ qua, chuỗi `mới nhất` sẽ được sử dụng.      |
| callback    | hàm         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `đối tượng`

| Loại     | Mô tả                                                                                      |
| --------- | ------------------------------------------------------------------------------------------ |
| đối tượng | Một đối tượng chứa thông tin tài khoản. Mỗi loại tài khoản sẽ có các thuộc tính khác nhau. |

**Ví dụ**

```javascript
// Get account with EOA
> caver.rpc.klay.getAccount('0x{address in hex}').then(console.log)
{
    accType: 1,
    account: {
        nonce: 0,
        balance: '0x',
        humanReadable: false,
        key: { keyType: 1, key: {} }
    }
}

// Get account with SCA
> caver.rpc.klay.getAccount('0x{address in hex}').then(console.log)
{
    accType: 2,
    account: {
        nonce: 1,
        balance: '0x0',
        humanReadable: false,
        key: { keyType: 3, key: {} },
        storageRoot: '0xd0ce6b9ba63cf727d48833bcaf69f398bb353e9a5b6235ac5bb3a8e95ff90ecf',
        codeHash: '7pemrmP8fcguH/ut/SYHJoUSecfUIcUyeCpMf0sBYVI=',
        codeFormat: 0
    }
}
```

## caver.rpc.klay.getAccountKey <a href="#caver-rpc-klay-getaccountkey" id="caver-rpc-klay-getaccountkey"></a>

```javascript
caver.rpc.klay.getAccountKey(address [, blockNumber] [, callback])
```

Trả về AccountKey của một địa chỉ đã cho. Nếu tài khoản có [AccountKeyLegacy](../../../../../learn/accounts.md#accountkeylegacy) hoặc tài khoản của địa chỉ đã cho là [Tài khoản hợp đồng thông minh](../../../../../learn/accounts.md#smart-contract-accounts-scas), tài khoản đó sẽ trả về một giá trị khóa trống. Vui lòng tham khảo [Khóa tài khoản](../../../../../learn/accounts.md#account-key) để biết thêm thông tin chi tiết.

**LƯU Ý** `caver.rpc.klay.getAccountKey` trả về một đối tượng khác nhau theo từng loại AccountKey. Nếu tài khoản Klaytn khớp với địa chỉ đã cho không tồn tại trong mạng thì sẽ trả về `null`.

**Tham số**

| Tên         | Loại       | Mô tả                                                                                                                             |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| address     | chuỗi       | Địa chỉ của tài khoản Klaytn mà bạn muốn lấy một đối tượng của thông tin AccountKey.                                              |
| blockNumber | số \| chuỗi | (tùy chọn) Số khối hoặc chuỗi `mới nhất` hoặc `cũ nhất`. Nếu bị bỏ qua, chuỗi `mới nhất` sẽ được sử dụng.      |
| callback    | hàm         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `đối tượng`

| Loại     | Mô tả                                                                                        |
| --------- | -------------------------------------------------------------------------------------------- |
| đối tượng | Một đối tượng chứa thông tin AccountKey. Mỗi loại AccountKey sẽ có các thuộc tính khác nhau. |

**Ví dụ**

```javascript
// AccountKey type: AccountKeyLegacy
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{ keyType: 1, key: {} }

// AccountKey type: AccountKeyPublic
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{
    keyType: 2,
    key: { x:'0xb9a4b...', y:'0x7a285...' }
}

// AccountKey type: AccountKeyFail
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{ keyType: 3, key:{} }

// AccountKey type: AccountKeyWeightedMultiSig
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{
    keyType: 4,
    key: {
        threshold: 2,
        keys: [
            {
                weight: 1,
                key: { x: '0xae6b7...', y: '0x79ddf...' }
            },
            {
                weight: 1,
                key: { x: '0xd4256...', y: '0xfc5e7...' }
            },
            {
                weight: 1,
                key: { x: '0xd653e...', y: '0xe974e...' }
            }
        ]
    }
}

// AccountKey type: AccountKeyRoleBased
> caver.rpc.klay.getAccountKey('0x{address in hex}').then(console.log)
{
    keyType: 5,
    key: [
            {
                key: { x: '0x81965...', y: '0x18242...' },
                keyType: 2
            },
            {
                key: { x: '0x73363...', y: '0xfc3e3...' },
                keyType: 2
            },
            {
                key: { x: '0x95c92...', y: '0xef783...' },
                keyType: 2
            }
    ]
}
```

## caver.rpc.klay.encodeAccountKey <a href="#caver-rpc-klay-encodeaccountkey" id="caver-rpc-klay-encodeaccountkey"></a>

```javascript
caver.rpc.klay.encodeAccountKey(accountKey [, callback])
```

Mã hóa một đối tượng chứa thông tin AccountKey bằng sơ đồ mã hóa Tiền tố độ dài đệ quy (RLP). Ngoài ra, bạn có thể sử dụng [tài khoản.getRLPEncodingAccountKey](../caver.account.md#account-getrlpencodingaccountkey) để lấy AccountKey được mã hóa bằng RLP.

**Tham số**

| Tên          | Loại     | Mô tả                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tài khoảnKey | đối tượng | Một đối tượng xác định `keyType` và `khóa` bên trong hoặc một phiên bản của `AccountKey` ([AccountKeyLegacy](../caver.account.md#accountkeylegacy), [AccountKeyPublic](../caver.account.md#accountkeypublic), [AccountKeyFail](../caver.account.md#accountkeyfail), [AccountKeyWeightedMultiSig](../caver.account.md#accountkeyweightedmultisig) hoặc [AccountKeyRoleBased](../caver.account.md#accountkeyrolebased)). |
| callback     | hàm       | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                                                                                                                                                                                                                                                                         |

**Giá trị trả về**

`Promise` trả về `chuỗi`

| Loại | Mô tả                       |
| ----- | --------------------------- |
| chuỗi | AccountKey được mã hóa RLP. |

**Ví dụ**

```javascript
// AccountKey type: AccountKeyLegacy
> caver.rpc.klay.encodeAccountKey({ keyType: 1, key: {} }).then(console.log)
0x01c0

// AccountKey type: AccountKeyPublic
> caver.rpc.klay.encodeAccountKey({
        keyType: 2,
        key: {
            x: '0xdbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8',
            y: '0x906d7170ba349c86879fb8006134cbf57bda9db9214a90b607b6b4ab57fc026e',
        },
    }).then(console.log)
0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8

// AccountKey type: AccountKeyFail
> caver.rpc.klay.encodeAccountKey({ keyType: 3, key: {} }).then(console.log)
0x03c0

// AccountKey type: AccountKeyWeightedMultiSig
> caver.rpc.klay.encodeAccountKey({
        keyType: 4,
        key: {
            threshold: 2,
            keys: [
                {
                    weight: 1,
                    key: {
                        x: '0xc734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e',
                        y: '0x61a443ac3ffff164d1fb3617875f07641014cf17af6b7dc38e429fe838763712',
                    },
                },
                {
                    weight: 1,
                    key: {
                        x: '0x12d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb',
                        y: '0x8ef355a8d524eb444eba507f236309ce08370debaa136cb91b2f445774bff842',
                    },
                },
            ],
        },
    }).then(console.log)
0x04f84b02f848e301a102c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110ee301a10212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb

// AccountKey type: AccountKeyRoleBased
> caver.rpc.klay.encodeAccountKey({
        keyType: 5,
        key: [
            {
                keyType: 2,
                key: {
                    x: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d',
                    y: '0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
                },
            },
            {
                keyType: 4,
                key: {
                    threshold: 2,
                    keys: [
                        {
                            weight: 1,
                            key: {
                                x: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d',
                                y: '0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
                            },
                        },
                        {
                            weight: 1,
                            key: {
                                x: '0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06',
                                y: '0x6fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d',
                            },
                        },
                    ],
                },
            },
            {
                keyType: 2,
                key: {
                    x: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447',
                    y: '0x94c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
                },
            },
        ],
    }).then(console.log)
0x05f898a302a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512db84e04f84b02f848e301a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512de301a10336f6355f5b532c3c160

// Use an AccountKey instance
> const accountKey = caver.account.create('0x{address in hex}', '0xf1d2e...').accountKey
> caver.rpc.klay.encodeAccountKey(accountKey).then(console.log)
0x02a102f1d2e558cfa07151534cd406b1ac5c25d99e9c1cf925328d14fd15c6fe50df27
```

## caver.rpc.klay.decodeAccountKey <a href="#caver-rpc-klay-decodeaccountkey" id="caver-rpc-klay-decodeaccountkey"></a>

```javascript
caver.rpc.klay.decodeAccountKey(encodedKey [, callback])
```

Giải mã AccountKey được mã hóa RLP. Ngoài ra, bạn có thể sử dụng [caver.tài khoản.tài khoảnKey.decode](../caver.account.md#caver-account-accountkey-decode) để giải mã AccountKey được mã hóa bằng RLP.

**Tham số**

| Tên        | Loại | Mô tả                                                                                                                             |
| ---------- | ----- | --------------------------------------------------------------------------------------------------------------------------------- |
| encodedKey | chuỗi | AccountKey được mã hóa RLP.                                                                                                       |
| callback   | hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `đối tượng`

| Loại     | Mô tả                                                |
| --------- | ---------------------------------------------------- |
| đối tượng | Một đối tượng xác định `keyType` và `Key` bên trong. |

**Ví dụ**

```javascript
// AccountKey type: AccountKeyLegacy
> caver.rpc.klay.decodeAccountKey('0x01c0').then(console.log)
{ keyType: 1, key: {} }

// AccountKey type: AccountKeyPublic
> caver.rpc.klay.decodeAccountKey('0x02a102dbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8').then(console.log)
{
    keyType: 2,
    key: {
        x: '0xdbac81e8486d68eac4e6ef9db617f7fbd79a04a3b323c982a09cdfc61f0ae0e8',
        y: '0x906d7170ba349c86879fb8006134cbf57bda9db9214a90b607b6b4ab57fc026e',
    },
}

// AccountKey type: AccountKeyFail
> caver.rpc.klay.decodeAccountKey('0x03c0').then(console.log)
{ keyType: 3, key: {} }

// AccountKey type: AccountKeyWeightedMultiSig
> caver.rpc.klay.decodeAccountKey('0x04f84b02f848e301a102c734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110ee301a10212d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb').then(console.log)
{
    keyType: 4,
    key: {
        threshold: 2,
        keys: [
            {
                weight: 1,
                key: {
                    x: '0xc734b50ddb229be5e929fc4aa8080ae8240a802d23d3290e5e6156ce029b110e',
                    y: '0x61a443ac3ffff164d1fb3617875f07641014cf17af6b7dc38e429fe838763712',
                },
            },
            {
                weight: 1,
                key: {
                    x: '0x12d45f1cc56fbd6cd8fc877ab63b5092ac77db907a8a42c41dad3e98d7c64dfb',
                    y: '0x8ef355a8d524eb444eba507f236309ce08370debaa136cb91b2f445774bff842',
                },
            },
        ],
    },
}


// AccountKey type: AccountKeyRoleBased
> caver.rpc.klay.decodeAccountKey('0x05f898a302a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512db84e04f84b02f848e301a103e4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512de301a10336f6355f5b532c3c160').then(console.log)
{
    keyType: 5,
    key: [
        {
            keyType: 2,
            key: {
                x: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d',
                y: '0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
            },
        },
        {
            keyType: 4,
            key: {
                threshold: 2,
                keys: [
                    {
                        weight: 1,
                        key: {
                            x: '0xe4a01407460c1c03ac0c82fd84f303a699b210c0b054f4aff72ff7dcdf01512d',
                            y: '0xa5735a23ce1654b14680054a993441eae7c261983a56f8e0da61280758b5919',
                        },
                    },
                    {
                        weight: 1,
                        key: {
                            x: '0x36f6355f5b532c3c1606f18fa2be7a16ae200c5159c8031dd25bfa389a4c9c06',
                            y: '0x6fdf9fc87a16ac359e66d9761445d5ccbb417fb7757a3f5209d713824596a50d',
                        },
                    },
                ],
            },
        },
        {
            keyType: 2,
            key: {
                x: '0xc8785266510368d9372badd4c7f4a94b692e82ba74e0b5e26b34558b0f081447',
                y: '0x94c27901465af0a703859ab47f8ae17e54aaba453b7cde5a6a9e4a32d45d72b2',
            },
        },
    ],
}
```

## caver.rpc.klay.getBalance <a href="#caver-rpc-klay-getbalance" id="caver-rpc-klay-getbalance"></a>

```javascript
caver.rpc.klay.getBalance(address [, blockNumber] [, callback])
```

Trả về số dư tài khoản của địa chỉ đã cho trong Klaytn.

**Tham số**

| Tên         | Loại       | Mô tả                                                                                                                             |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| address     | chuỗi       | Địa chỉ của tài khoản mà bạn muốn lấy số dư.                                                                                      |
| blockNumber | số \| chuỗi | (tùy chọn) Số khối hoặc chuỗi `mới nhất` hoặc `cũ nhất`. Nếu bị bỏ qua, chuỗi `mới nhất` sẽ được sử dụng.      |
| callback    | hàm         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `chuỗi`

| Loại | Mô tả                                       |
| ----- | ------------------------------------------- |
| chuỗi | Số dư hiện tại cho địa chỉ đã cho bằng peb. |

**Ví dụ**

```javascript
> caver.rpc.klay.getBalance('0x{address in hex}').then(console.log)
0xde0b6b3a7640000
```

## caver.rpc.klay.getCode <a href="#caver-rpc-klay-getcode" id="caver-rpc-klay-getcode"></a>

```javascript
caver.rpc.klay.getCode(address [, blockNumber] [, callback])
```

Trả về mã ở địa chỉ đã cho.

**Tham số**

| Tên         | Loại       | Mô tả                                                                                                                             |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| address     | chuỗi       | Địa chỉ nơi để nhận mã.                                                                                                           |
| blockNumber | số \| chuỗi | (tùy chọn) Số khối hoặc chuỗi `mới nhất` hoặc `cũ nhất`. Nếu bị bỏ qua, chuỗi `mới nhất` sẽ được sử dụng.      |
| callback    | hàm         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `chuỗi`

| Loại | Mô tả                 |
| ----- | --------------------- |
| chuỗi | Mã từ địa chỉ đã cho. |

**Ví dụ**

```javascript
> caver.rpc.klay.getCode('0x{address in hex}').then(console.log)
0x60806...
```

## caver.rpc.klay.getTransactionCount <a href="#caver-rpc-klay-gettransactioncount" id="caver-rpc-klay-gettransactioncount"></a>

```javascript
caver.rpc.klay.getTransactionCount(address [, blockNumber] [, callback])
```

Trả về tổng số lượng giao dịch đã gửi từ một địa chỉ.

**Tham số**

| Tên         | Loại       | Mô tả                                                                                                                                                                                                                                                                                               |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address     | chuỗi       | Địa chỉ nơi để nhận số lượng giao dịch.                                                                                                                                                                                                                                                             |
| blockNumber | số \| chuỗi | (tùy chọn) Số khối, chuỗi `đang chờ xử lý` để lấy số dùng một lần đang chờ xử lý, hoặc chuỗi `cũ nhất` hoặc `mới nhất` giống như trong [tham số khối mặc định](../../../../json-rpc/klay/block.md#the-default-block-parameter). Nếu bị bỏ qua, chuỗi `mới nhất` sẽ được sử dụng. |
| callback    | hàm         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                                                                                                                                   |

**Giá trị trả về**

`Promise` trả về `chuỗi`

| Loại | Mô tả                                                      |
| ----- | ---------------------------------------------------------- |
| chuỗi | Số lượng giao dịch đã gửi từ địa chỉ nhất định ở dạng hex. |

**Ví dụ**

```javascript
> caver.rpc.klay.getTransactionCount('0x{address in hex}').then(console.log)
0x5f
```

## caver.rpc.klay.isContractAccount <a href="#caver-rpc-klay-iscontractaccount" id="caver-rpc-klay-iscontractaccount"></a>

```javascript
caver.rpc.klay.isContractAccount(address [, blockNumber] [, callback])
```

Trả về `true` nếu tài khoản đầu vào có codeHash không trống vào thời điểm có số khối cụ thể. Trả về `false` nếu tài khoản là EOA hoặc tài khoản hợp đồng thông minh không có codeHash. Vui lòng tham khảo [Tài khoản hợp đồng thông minh](../../../../../learn/accounts.md#smart-contract-accounts-scas) để biết thêm thông tin chi tiết.

**Tham số**

| Tên         | type        | Mô tả                                                                                                                             |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| address     | chuỗi       | Địa chỉ mà bạn muốn kiểm tra isContractAccount.                                                                                   |
| blockNumber | số \| chuỗi | (tùy chọn) Số khối hoặc chuỗi `mới nhất` hoặc `cũ nhất`. Nếu bị bỏ qua, chuỗi `mới nhất` sẽ được sử dụng.      |
| callback    | hàm         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `boolean`

| Loại   | Mô tả                                                                        |
| ------- | ---------------------------------------------------------------------------- |
| boolean | true có nghĩa là tham số đầu vào là một địa chỉ hợp đồng thông minh hiện có. |

**Ví dụ**

```javascript
> caver.rpc.klay.isContractAccount('0x{address in hex}').then(console.log)
false

> caver.rpc.klay.isContractAccount('0x{address in hex}').then(console.log)
true
```

## caver.rpc.klay.sign <a href="#caver-rpc-klay-sign" id="caver-rpc-klay-sign"></a>

```javascript
caver.rpc.klay.sign(address, message [, blockNumber] [, callback])
```

Tạo dữ liệu đã ký dành riêng cho Klaytn. Tham khảo [API Nền tảng Klaytn - klay_sign](../../../../json-rpc/klay/account.md#klay_sign) để biết cách tạo chữ ký.

**LƯU Ý**: API này cung cấp chức năng ký thông báo bằng cách sử dụng [tài khoản đã nhập](../../../../json-rpc/personal.md#personal_importrawkey) trong nút Klaytn của bạn. Tài khoản đã nhập trong nút của bạn phải được [mở khóa](../../../../json-rpc/personal.md#personal_unlockaccount) để ký thông báo. Để ký giao dịch bằng tài khoản đã nhập trong nút Klaytn của bạn, hãy sử dụng [caver.rpc.klay.signTransaction](#caver-rpc-klay-signtransaction).

**Tham số**

| Tên         | Loại       | Mô tả                                                                                                                             |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| address     | Chuỗi       | Địa chỉ của tài khoản đã nhập để ký thông báo.                                                                                    |
| thông báo   | Chuỗi       | Tin nhắn có thể ký.                                                                                                               |
| blockNumber | số \| chuỗi | (tùy chọn) Số khối hoặc chuỗi `mới nhất` hoặc `cũ nhất`. Nếu bị bỏ qua, chuỗi `mới nhất` sẽ được sử dụng.      |
| callback    | hàm         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `chuỗi`

| Loại | Mô tả                                           |
| ----- | ----------------------------------------------- |
| chuỗi | Chữ ký được thực hiện từ một tài khoản đã nhập. |

**Ví dụ**

```javascript
> caver.rpc.klay.sign('0x{address in hex}', '0xdeadbeaf').then(console.log)
0x1066e052c4be821daa4d0a0cd1e9e75ccb200bb4001c2e38853ba41b712a5a226da2acd67c86a13b266e0d75d0a6e7d1551c8924af413267615a5948617c746c1c
```

## caver.rpc.klay.getAccounts <a href="#caver-rpc-klay-getaccounts" id="caver-rpc-klay-getaccounts"></a>

```javascript
caver.rpc.klay.getAccounts([callback])
```

Trả về danh sách các địa chỉ thuộc sở hữu của Nút Klaytn.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                                             |
| -------- | ----- | --------------------------------------------------------------------------------------------------------------------------------- |
| callback | hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Mảng`

| type | Mô tả                                             |
| ---- | ------------------------------------------------- |
| Mảng | Một mảng các địa chỉ thuộc sở hữu của Nút Klaytn. |

**Ví dụ**

```javascript
> caver.rpc.klay.getAccounts().then(console.log)
[
    '0xe1531e916857d1b3a7db92f9187b96a7b43813bf',
    '0x75331c25535052157ff5110ba7d0cf940d3a9ca6'
]
```

## caver.rpc.klay.getBlockNumber <a href="#caver-rpc-klay-getblocknumber" id="caver-rpc-klay-getblocknumber"></a>

```javascript
caver.rpc.klay.getBlockNumber([callback])
```

Trả về số của khối gần đây nhất.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                                             |
| -------- | ----- | --------------------------------------------------------------------------------------------------------------------------------- |
| callback | hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `chuỗi`

| Loại | Mô tả                            |
| ----- | -------------------------------- |
| chuỗi | Số của khối mới nhất ở dạng hex. |

**Ví dụ**

```javascript
> caver.rpc.klay.getBlockNumber().then(console.log)
0x5d39
```

## caver.rpc.klay.getHeader <a href="#caver-rpc-klay-getheader" id="caver-rpc-klay-getheader"></a>

```javascript
caver.rpc.klay.getHeader(blockNumberOrHash [, callback])
```

Trả về tiêu đề khối theo hàm băm khối hoặc số khối. Nếu người dùng chuyển hàm băm khối dưới dạng tham số, [caver.rpc.klay.getHeaderByHash](#caver-rpc-klay-getheaderbyhash) sẽ được gọi ra và nếu số khối được gọi dưới dạng tham số thì [caver.rpc.klay.getHeaderByNumber](#caver-rpc-klay-getheaderbynumber) sẽ được gọi ra.

**Tham số**

| Tên               | type        | Mô tả                                                                                                                             |
| ----------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| blockNumberOrHash | số \| chuỗi | Hàm băm khối, số hoặc chuỗi thẻ khối.                                                                                             |
| callback          | hàm         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `đối tượng`

| Loại     | Mô tả                                                                                                                                                       |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| đối tượng | Một đối tượng tiêu đề khối. Để biết mô tả chi tiết về giá trị trả về, vui lòng tham khảo [caver.rpc.klay.getHeaderByHash](#caver-rpc-klay-getheaderbyhash). |

**Ví dụ**

```javascript
> caver.rpc.klay.getHeader(1).then(console.log)
{
  baseFeePerGas: '0x0',
  blockScore: '0x1',
  extraData: '0xd8830...',
  gasUsed: '0x0',
  governanceData: '0x',
  hash: '0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3',
  logsBloom: '0x00000...',
  number: '0xbacd3',
  parentHash: '0xd6e36611a6722b94b8e4bb4d164755445409cf43aa5db0a5d4ae01e621c81ce7',
  receiptsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  reward: '0x30be91c80566da777d30e659b6746174ecc61576',
  stateRoot: '0xe75d808889451b1dac3d209e8cfbb2159ea6b2a080ce6081be775fb426f047a8',
  timestamp: '0x62201975',
  timestampFoS: '0x0',
  transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
}
```

## caver.rpc.klay.getHeaderByNumber <a href="#caver-rpc-klay-getheaderbynumber" id="caver-rpc-klay-getheaderbynumber"></a>

```javascript
caver.rpc.klay.getHeaderByNumber(blockNumber [, returnTransactionObjects] [, callback])
```

Trả về tiêu đề khối theo số khối.

**Tham số**

| Tên         | Loại       | Mô tả                                                                                                                             |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| blockNumber | số \| chuỗi | Số khối hoặc chuỗi thẻ khối.                                                                                                      |
| callback    | hàm         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `đối tượng`

| Loại     | Mô tả                                                                                                                                                       |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| đối tượng | Một đối tượng tiêu đề khối. Để biết mô tả chi tiết về giá trị trả về, vui lòng tham khảo [caver.rpc.klay.getHeaderByHash](#caver-rpc-klay-getheaderbyhash). |

**Ví dụ**

```javascript
> caver.rpc.klay.getHeaderByNumber(765139).then(console.log)
{
  baseFeePerGas: '0x0',
  blockScore: '0x1',
  extraData: '0xd8830...',
  gasUsed: '0x0',
  governanceData: '0x',
  hash: '0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3',
  logsBloom: '0x00000...',
  number: '0xbacd3',
  parentHash: '0xd6e36611a6722b94b8e4bb4d164755445409cf43aa5db0a5d4ae01e621c81ce7',
  receiptsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  reward: '0x30be91c80566da777d30e659b6746174ecc61576',
  stateRoot: '0xe75d808889451b1dac3d209e8cfbb2159ea6b2a080ce6081be775fb426f047a8',
  timestamp: '0x62201975',
  timestampFoS: '0x0',
  transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
}
```

## caver.rpc.klay.getHeaderByHash <a href="#caver-rpc-klay-getheaderbyhash" id="caver-rpc-klay-getheaderbyhash"></a>

```javascript
caver.rpc.klay.getHeaderByHash(blockHash [, returnTransactionObjects] [, callback])
```

Trả về số khối của khối mới nhất bằng cách sử dụng `blockHash`.

**Tham số**

| Tên       | Loại | Mô tả                                                                                                                             |
| --------- | ----- | --------------------------------------------------------------------------------------------------------------------------------- |
| blockHash | chuỗi | Hàm băm khối.                                                                                                                     |
| callback  | hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `đối tượng` - Một đối tượng bao gồm tiêu đề khối:

| Tên              | Loại | Mô tả                                                                                                                                                  |
| ---------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| baseFeePerGas    | chuỗi | Phí cơ bản trên mỗi đơn vị gas. Giá trị này chỉ được trả về khi EthTxTypeCompatibleBlock được kích hoạt cho số khối đó.                                |
| blockScore       | chuỗi | Độ khó khai thác trong mạng blockchain. Việc sử dụng `blockScore` khác với cơ chế đồng thuận của mạng. Giá trị luôn là 1 trong công cụ đồng thuận BFT. |
| extraData        | chuỗi | Trường "dữ liệu bổ sung" của khối này.                                                                                                                 |
| gasUsed          | chuỗi | Tổng lượng gas đã được sử dụng bởi tất cả các giao dịch trong khối này.                                                                                |
| governanceData   | chuỗi | Cấu hình quản trị được mã hóa RLP                                                                                                                      |
| hash             | chuỗi | Hàm băm của một khối. `null` khi đó là khối đang chờ xử lý.                                                                                            |
| nhật kýBloom     | chuỗi | Bộ lọc Bloom cho các bản ghi của khối. `null` khi đó là khối đang chờ xử lý.                                                                           |
| số               | chuỗi | Số khối. `null` khi đó là khối đang chờ xử lý.                                                                                                         |
| parentHash       | chuỗi | Hàm băm của khối cha mẹ.                                                                                                                               |
| receiptsRoot     | chuỗi | Gốc của trie biên lai giao dịch của khối.                                                                                                              |
| phần thưởng      | chuỗi | Địa chỉ của người thụ hưởng đã được trao phần thưởng khối.                                                                                             |
| stateRoot        | chuỗi | Gốc của trie trạng thái cuối trong khối.                                                                                                               |
| dấu thời gian    | chuỗi | Dấu thời gian unix khi khối được đối chiếu.                                                                                                            |
| timestampFoS     | chuỗi | Phần giây của dấu thời gian khi khối được đối chiếu.                                                                                                   |
| transactionsRoot | chuỗi | Gốc của trie giao dịch trong khối.                                                                                                                     |

**Ví dụ**

```javascript
> caver.rpc.klay.getHeaderByHash('0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3').then(console.log)
{
  baseFeePerGas: '0x0',
  blockScore: '0x1',
  extraData: '0xd8830...',
  gasUsed: '0x0',
  governanceData: '0x',
  hash: '0x1b6582f0908add2221317288482aada596551e9f9d779a2aebc55d81d3149ba3',
  logsBloom: '0x00000...',
  number: '0xbacd3',
  parentHash: '0xd6e36611a6722b94b8e4bb4d164755445409cf43aa5db0a5d4ae01e621c81ce7',
  receiptsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
  reward: '0x30be91c80566da777d30e659b6746174ecc61576',
  stateRoot: '0xe75d808889451b1dac3d209e8cfbb2159ea6b2a080ce6081be775fb426f047a8',
  timestamp: '0x62201975',
  timestampFoS: '0x0',
  transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
}
```

## caver.rpc.klay.getBlock <a href="#caver-rpc-klay-getblock" id="caver-rpc-klay-getblock"></a>

```javascript
caver.rpc.klay.getBlock(blockNumberOrHash [, returnTransactionObjects] [, callback])
```

Trả về thông tin của một khối theo hàm băm khối hoặc số khối. Nếu người dùng chuyển hàm băm khối dưới dạng tham số, [caver.rpc.klay.getBlockByHash](#caver-rpc-klay-getblockbyhash) sẽ được gọi ra và nếu số khối được gọi dưới dạng tham số thì [caver.rpc.klay.getBlockByNumber](#caver-rpc-klay-getblockbynumber) sẽ được gọi ra.

**Tham số**

| Tên                      | Loại       | Mô tả                                                                                                                                                                                   |
| ------------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockNumberOrHash        | số \| chuỗi | Hàm băm khối, số hoặc chuỗi thẻ khối.                                                                                                                                                   |
| returnTransactionObjects | boolean     | (tùy chọn, mặc định `false`) Nếu `true`, khối được trả về sẽ chứa tất cả giao dịch dưới dạng đối tượng và khối sẽ chỉ chứa các hàm băm giao dịch nếu trả về `false`. |
| callback                 | hàm         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                       |

**Giá trị trả về**

`Promise` trả về `đối tượng`

| Loại     | Mô tả                                                                                                                                             |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| đối tượng | Một đối tượng khối. Để biết mô tả chi tiết về giá trị trả về, vui lòng tham khảo [caver.rpc.klay.getBlockByHash](#caver-rpc-klay-getblockbyhash). |

**Ví dụ**

```javascript
> caver.rpc.klay.getBlock(1).then(console.log)
{
    baseFeePerGas: '0x0',
    blockscore: '0x1',
    extraData: '0xd8830...',
    gasUsed: '0x0',
    governanceData: '0x',
    hash: '0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b',
    logsBloom: '0x00000...',
    number: '0x1',
    parentHash: '0x6b7c0a49f445d39b6d7dc9ba5b593b326f3a953e75ff1fcf64b9a5fa51c2725b',
    receiptsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    reward: '0xddc2002b729676dfd906484d35bb02a8634d7040',
    size: '0x285',
    stateRoot: '0xb88b6110e6f73b732714bb346e6ff24beb480c0dc901a55be24e38ad1c6d5fa9',
    timestamp: '0x5ee7fe9f',
    timestampFoS: '0xd',
    totalBlockScore: '0x2',
    transactions: [],
    transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    voteData: '0x',
}
```

## caver.rpc.klay.getBlockByNumber <a href="#caver-rpc-klay-getblockbynumber" id="caver-rpc-klay-getblockbynumber"></a>

```javascript
caver.rpc.klay.getBlockByNumber(blockNumber [, returnTransactionObjects] [, callback])
```

Trả về thông tin của một khối theo số khối.

**Tham số**

| Tên                      | Loại       | Mô tả                                                                                                                                                                                   |
| ------------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockNumber              | số \| chuỗi | Số khối hoặc khối được gắn thẻ bằng một chuỗi (`khởi nguyên` hoặc `mới nhất`).                                                                                       |
| returnTransactionObjects | boolean     | (tùy chọn, mặc định `false`) Nếu `true`, khối được trả về sẽ chứa tất cả giao dịch dưới dạng đối tượng và khối sẽ chỉ chứa các hàm băm giao dịch nếu trả về `false`. |
| callback                 | hàm         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                       |

**Giá trị trả về**

`Promise` trả về `đối tượng`

| Loại     | Mô tả                                                                                                                                        |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| đối tượng | Một đối tượng khối. Để biết mô tả chi tiết về giá trị trả về, hãy tham khảo [caver.rpc.klay.getBlockByHash](#caver-rpc-klay-getblockbyhash). |

**Ví dụ**

```javascript
> caver.rpc.klay.getBlockByNumber(1).then(console.log)
{
    baseFeePerGas: '0x0',
    blockscore: '0x1',
    extraData: '0xd8830...',
    gasUsed: '0x0',
    governanceData: '0x',
    hash: '0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b',
    logsBloom: '0x00000...',
    number: '0x1',
    parentHash: '0x6b7c0a49f445d39b6d7dc9ba5b593b326f3a953e75ff1fcf64b9a5fa51c2725b',
    receiptsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    reward: '0xddc2002b729676dfd906484d35bb02a8634d7040',
    size: '0x285',
    stateRoot: '0xb88b6110e6f73b732714bb346e6ff24beb480c0dc901a55be24e38ad1c6d5fa9',
    timestamp: '0x5ee7fe9f',
    timestampFoS: '0xd',
    totalBlockScore: '0x2',
    transactions: [],
    transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    voteData: '0x'
}
```

## caver.rpc.klay.getBlockByHash <a href="#caver-rpc-klay-getblockbyhash" id="caver-rpc-klay-getblockbyhash"></a>

```javascript
caver.rpc.klay.getBlockByHash(blockHash [, returnTransactionObjects] [, callback])
```

Trả về số khối của khối mới nhất bằng cách sử dụng `blockHash`.

**Tham số**

| Tên                      | Loại   | Mô tả                                                                                                                                                                                   |
| ------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockHash                | chuỗi   | Hàm băm khối.                                                                                                                                                                           |
| returnTransactionObjects | boolean | (tùy chọn, mặc định `false`) Nếu `true`, khối được trả về sẽ chứa tất cả giao dịch dưới dạng đối tượng và khối sẽ chỉ chứa các hàm băm giao dịch nếu trả về `false`. |
| callback                 | hàm     | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                       |

**Giá trị trả về**

`Promise` trả về `đối tượng` - Một đối tượng bao gồm khối:

| Tên              | Loại | Mô tả                                                                                                                                                  |
| ---------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| baseFeePerGas    | chuỗi | Phí cơ bản trên mỗi đơn vị gas. Giá trị này chỉ được trả về khi EthTxTypeCompatibleBlock được kích hoạt cho số khối đó.                                |
| blockScore       | chuỗi | Độ khó khai thác trong mạng blockchain. Việc sử dụng `blockScore` khác với cơ chế đồng thuận của mạng. Giá trị luôn là 1 trong công cụ đồng thuận BFT. |
| extraData        | chuỗi | Trường "dữ liệu bổ sung" của khối này.                                                                                                                 |
| gasUsed          | chuỗi | Tổng lượng gas đã được sử dụng bởi tất cả các giao dịch trong khối này.                                                                                |
| governanceData   | chuỗi | Cấu hình quản trị được mã hóa RLP                                                                                                                      |
| hash             | chuỗi | Hàm băm của một khối. `null` khi đó là khối đang chờ xử lý.                                                                                            |
| nhật kýBloom     | chuỗi | Bộ lọc Bloom cho các bản ghi của khối. `null` khi đó là khối đang chờ xử lý.                                                                           |
| số               | chuỗi | Số khối. `null` khi đó là khối đang chờ xử lý.                                                                                                         |
| parentHash       | chuỗi | Hàm băm của khối cha mẹ.                                                                                                                               |
| receiptsRoot     | chuỗi | Gốc của trie biên lai giao dịch của khối.                                                                                                              |
| phần thưởng      | chuỗi | Địa chỉ của người thụ hưởng đã được trao phần thưởng khối.                                                                                             |
| kích thước       | chuỗi | Số nguyên chỉ kích thước của khối này theo byte.                                                                                                       |
| stateRoot        | chuỗi | Gốc của trie trạng thái cuối trong khối.                                                                                                               |
| dấu thời gian    | chuỗi | Dấu thời gian unix khi khối được đối chiếu.                                                                                                            |
| timestampFoS     | chuỗi | Phần giây của dấu thời gian khi khối được đối chiếu.                                                                                                   |
| totalBlockScore  | chuỗi | Giá trị nguyên chỉ tổng số blockScore của chuỗi cho đến khối này.                                                                                      |
| giao dịch        | Mảng  | Mảng đối tượng giao dịch hoặc hàm băm giao dịch 32 byte tùy thuộc vào tham số `returnTransactionObjects`.                                              |
| transactionsRoot | chuỗi | Gốc của trie giao dịch trong khối.                                                                                                                     |
| voteData         | chuỗi | Phiếu bầu quản trị được mã hóa RLP của người đề xuất.                                                                                                  |

**Ví dụ**

```javascript
> caver.rpc.klay.getBlockByHash('0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b').then(console.log)
{
    baseFeePerGas: '0x0',
    blockscore: '0x1',
    extraData: '0xd8830...',
    gasUsed: '0x0',
    governanceData: '0x',
    hash: '0x58482921af951cf42a069436ac9338de50fd963bdbea40e396f416f9ac96a08b',
    logsBloom: '0x00000...',
    number: '0x1',
    parentHash: '0x6b7c0a49f445d39b6d7dc9ba5b593b326f3a953e75ff1fcf64b9a5fa51c2725b',
    receiptsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    reward: '0xddc2002b729676dfd906484d35bb02a8634d7040',
    size: '0x285',
    stateRoot: '0xb88b6110e6f73b732714bb346e6ff24beb480c0dc901a55be24e38ad1c6d5fa9',
    timestamp: '0x5ee7fe9f',
    timestampFoS: '0xd',
    totalBlockScore: '0x2',
    transactions: [],
    transactionsRoot: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    voteData: '0x'
}
```

## caver.rpc.klay.getBlockReceipts <a href="#caver-rpc-klay-getblockreceipts" id="caver-rpc-klay-getblockreceipts"></a>

```javascript
caver.rpc.klay.getBlockReceipts(blockHash [, callback])
```

Trả về các biên lai được gộp vào khối được xác định bằng hàm băm khối.

**Tham số**

| Tên       | Loại | Mô tả                                                                                                                             |
| --------- | ----- | --------------------------------------------------------------------------------------------------------------------------------- |
| blockHash | chuỗi | Hàm băm khối.                                                                                                                     |
| callback  | hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Mảng`

| type | Mô tả                                                                                                                                                                                                                                                               |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mảng | Biên lai giao dịch được đưa vào một khối. Nếu khối mục tiêu không chứa giao dịch, thì hàm sẽ trả về một mảng trống `[]`. Để biết mô tả chi tiết về biên lai giao dịch, hãy tham khảo [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt). |

**Ví dụ**

```javascript
> caver.rpc.klay.getBlockReceipts('0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0').then(console.log)
[ 
    {
        blockHash: '0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0',
        blockNumber: '0x5301',
        contractAddress: null,
        from: '0xddc2002b729676dfd906484d35bb02a8634d7040',
        gas: '0x61a8',
        gasPrice: '0x5d21dba00',
        gasUsed: '0x5208',
        logs: [],
        logsBloom: '0x00000...',
        nonce: '0x5e',
        senderTxHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
        signatures: [
            { 
                V: '0x4e44',
                R: '0x98583ffa8d9a6d5f9e60e4daebb33f18e8ad4d32653c4a2fa7f12ce025af763d',
                S: '0x9b9e5257293e3b986842b6a203dd16ce46f16ed42dd3e9592fcaab9ea2696cb'
            }    
        ],
        status: '0x1',
        to: '0xc0aabc441129991dd3a9363a9a43b745527ea4e7',
        transactionHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
        transactionIndex: '0x0',
        type: 'TxTypeValueTransfer',
        typeInt: 8,
        value: '0xde0b6b3a7640000'
    }
]
```

## caver.rpc.klay.getBlockTransactionCountByNumber <a href="#caver-rpc-klay-getblocktransactioncountbynumber" id="caver-rpc-klay-getblocktransactioncountbynumber"></a>

```javascript
caver.rpc.klay.getBlockTransactionCountByNumber(blockNumber [, callback])
```

Trả về số lượng giao dịch trong một khối khớp với số khối đã cho.

**Tham số**

| Tên         | Loại       | Mô tả                                                                                                                             |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| blockNumber | số \| chuỗi | Số khối hoặc chuỗi thẻ khối (`khởi nguyên` hoặc `mới nhất`).                                                   |
| callback    | hàm         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `chuỗi`

| Loại | Mô tả                                               |
| ----- | --------------------------------------------------- |
| chuỗi | Số lượng giao dịch trong khối nhất định ở dạng hex. |

**Ví dụ**

```javascript
> caver.rpc.klay.getBlockTransactionCountByNumber(21249).then(console.log)
0x1
```

## caver.rpc.klay.getBlockTransactionCountByHash <a href="#caver-rpc-klay-getblocktransactioncountbyhash" id="caver-rpc-klay-getblocktransactioncountbyhash"></a>

```javascript
caver.rpc.klay.getBlockTransactionCountByHash(blockHash [, callback])
```

Trả về số lượng giao dịch trong một khối khớp với hàm băm khối đã cho.

**Tham số**

| Tên       | type  | Mô tả                                                                                                                             |
| --------- | ----- | --------------------------------------------------------------------------------------------------------------------------------- |
| blockHash | chuỗi | Hàm băm khối.                                                                                                                     |
| callback  | hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `chuỗi`

| type  | Mô tả                                               |
| ----- | --------------------------------------------------- |
| chuỗi | Số lượng giao dịch trong khối nhất định ở dạng hex. |

**Ví dụ**

```javascript
> caver.rpc.klay.getBlockTransactionCountByHash('0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0').then(console.log)
0x1
```

## caver.rpc.klay.getBlockWithConsensusInfoByNumber <a href="#caver-rpc-klay-getblockwithconsensusinfobynumber" id="caver-rpc-klay-getblockwithconsensusinfobynumber"></a>

```javascript
caver.rpc.klay.getBlockWithConsensusInfoByNumber(blockNumber [, callback])
```

Trả về một khối có thông tin đồng thuận khớp với số khối đã cho.

**Tham số**

| Tên         | Loại       | Mô tả                                                                                                                             |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| blockNumber | số \| chuỗi | Số khối hoặc chuỗi thẻ khối (`khởi nguyên` hoặc `mới nhất`).                                                   |
| callback    | hàm         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `đối tượng`

| Loại | Mô tả                                                                                                                                                                                                           |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| chuỗi | Một đối tượng bao gồm khối với thông tin đồng thuận. Để biết mô tả chi tiết về giá trị trả về, hãy tham khảo [caver.rpc.klay.getBlockWithConsensusInfoByHash](#caver-rpc-klay-getblockwithconsensusinfobyhash). |

**Ví dụ**

```javascript
> caver.rpc.klay.getBlockWithConsensusInfoByNumber(21249).then(console.log)
{
    blockscore: '0x1',
    committee: ['0xddc2002b729676dfd906484d35bb02a8634d7040', '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e'],
    extraData: '0xd8830...',
    gasUsed: '0x5208',
    governanceData: '0x',
    hash: '0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0',
    logsBloom: '0x00000...',
    number: '0x5301',
    parentHash: '0x024f05c0e7428e33331104bedbfc453d481ce6a2f5e57f7fd68a4391ba6c2619',
    proposer: '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e',
    receiptsRoot: '0xe38e5532717f12f769b07ea016014bd39b74fb72def4de8442114cc2728609f2',
    reward: '0xb74837f495060f3f794dcae8fa3e0c5d3cf99d9f',
    size: '0x313',
    stateRoot: '0x9964b2d8f23da7383a32ec33c9700a76ebf4a36315c9067c2fef7568d97e1d55',
    timestamp: '0x5ee851dd',
    timestampFoS: '0x0',
    totalBlockScore: '0x5302',
    transactions: [
        {
            blockHash: '0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0',
            blockNumber: '0x5301',
            contractAddress: null,
            from: '0xddc2002b729676dfd906484d35bb02a8634d7040',
            gas: '0x61a8',
            gasPrice: '0x5d21dba00',
            gasUsed: '0x5208',
            logs: [],
            logsBloom: '0x00000...',
            nonce: '0x5e',
            senderTxHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
            signatures: {
                V: '0x4e44',
                R: '0x98583ffa8d9a6d5f9e60e4daebb33f18e8ad4d32653c4a2fa7f12ce025af763d',
                S: '0x9b9e5257293e3b986842b6a203dd16ce46f16ed42dd3e9592fcaab9ea2696cb'
            },
            status: '0x1',
            to: '0xc0aabc441129991dd3a9363a9a43b745527ea4e7',
            transactionHash: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
            transactionIndex: '0x0',
            type: 'TxTypeValueTransfer',
            typeInt: 8,
            value: '0xde0b6b3a7640000',
        },
    ],
    transactionsRoot: '0x413f080a498ae3973490c2f80e75e6a492cfcdac8be8051220bb7a964768d28c',
    voteData: '0x',
}
```

## caver.rpc.klay.getBlockWithConsensusInfoByHash <a href="#caver-rpc-klay-getblockwithconsensusinfobyhash" id="caver-rpc-klay-getblockwithconsensusinfobyhash"></a>

```javascript
caver.rpc.klay.getBlockWithConsensusInfoByHash(blockHash [, callback])
```

Trả về một khối có thông tin đồng thuận khớp với hàm băm đã cho.

**Tham số**

| Tên       | Loại | Mô tả                                                                                                                             |
| --------- | ----- | --------------------------------------------------------------------------------------------------------------------------------- |
| blockHash | chuỗi | Hàm băm khối.                                                                                                                     |
| callback  | hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `đối tượng` - Một đối tượng khối có thông tin đồng thuận (người đề xuất và danh sách thành viên ủy ban) hoặc null khi không tìm thấy bất kỳ khối nào:

| Tên              | Loại | Mô tả                                                                                                                                                    |
| ---------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| blockScore       | chuỗi | Độ khó trước đây. Giá trị luôn là 1 trong công cụ đồng thuận BFT                                                                                         |
| uỷ ban           | Mảng  | Mảng địa chỉ của các thành viên ủy ban của khối này. Ủy ban là một tập hợp con của những nút xác thực đã tham gia vào giao thức đồng thuận cho khối này. |
| extraData        | chuỗi | Trường "dữ liệu bổ sung" của khối này.                                                                                                                   |
| gasUsed          | chuỗi | Tổng lượng gas đã được sử dụng bởi tất cả các giao dịch trong khối này.                                                                                  |
| governanceData   | chuỗi | Cấu hình quản trị được mã hóa RLP                                                                                                                        |
| hash             | chuỗi | Hàm băm của một khối. `null` khi đó là khối đang chờ xử lý.                                                                                              |
| nhật kýBloom     | chuỗi | Bộ lọc Bloom cho các bản ghi của khối. `null` khi đó là khối đang chờ xử lý.                                                                             |
| số               | chuỗi | Số khối. `null` khi đó là khối đang chờ xử lý.                                                                                                           |
| originProposer   | chuỗi | Đề xuất 0 vòng ở cùng một số khối.                                                                                                                       |
| parentHash       | chuỗi | Hàm băm của khối cha mẹ.                                                                                                                                 |
| người đề xuất    | chuỗi | Địa chỉ của người đề xuất khối.                                                                                                                          |
| receiptsRoot     | chuỗi | Gốc của trie biên lai giao dịch của khối.                                                                                                                |
| phần thưởng      | chuỗi | Địa chỉ của người thụ hưởng đã được trao phần thưởng khối.                                                                                               |
| vòng             | số    | Số vòng.                                                                                                                                                 |
| kích thước       | chuỗi | Số nguyên chỉ kích thước của khối này theo byte.                                                                                                         |
| stateRoot        | chuỗi | Gốc của trie trạng thái cuối trong khối.                                                                                                                 |
| dấu thời gian    | chuỗi | Dấu thời gian unix khi khối được đối chiếu.                                                                                                              |
| timestampFoS     | chuỗi | Phần giây của dấu thời gian khi khối được đối chiếu.                                                                                                     |
| totalBlockScore  | chuỗi | Giá trị nguyên chỉ tổng số blockScore của chuỗi cho đến khối này.                                                                                        |
| giao dịch        | Mảng  | Mảng đối tượng giao dịch.                                                                                                                                |
| transactionsRoot | chuỗi | Gốc của trie giao dịch trong khối.                                                                                                                       |
| voteData         | chuỗi | Phiếu bầu quản trị được mã hóa RLP của người đề xuất                                                                                                     |

**Ví dụ**

```javascript
> caver.rpc.klay.getBlockWithConsensusInfoByHash('0x4584bea6b8b2abe7f024d1e63dd0571cfd28cd5157b4f6cb2ac4160a7b0057e0').then(console.log)
{
    blockscore: '0x1',
    committee: [ '0x571e5...', '0x5cb1a...', '0x99fb1...', '0xb74ff...' ],
    extraData: '0xd8830...',
    gasUsed: '0x3ea49',
    governanceData: '0x',
    hash: '0x188d4531d668ae3da20d70d4cb4c5d96a0cc5190771f0920c56b461c4d356566',
    logsBloom: '0x00000...',
    number: '0x3f79aa7',
    originProposer: '0x99fb17d324fa0e07f23b49d09028ac0919414db6',
    parentHash: '0x777d344c8c59c4d8d0041bb4c2ee66e95ec110303fb59d3e329f80e7a9c9c617',
    proposer: '0x99fb17d324fa0e07f23b49d09028ac0919414db6',
    receiptsRoot: '0xffbae3190f858531ff785bcbdc70278d91c3d9becdd8b134b0ab7974b9ef3641',
    reward: '0xb2bd3178affccd9f9f5189457f1cad7d17a01c9d',
    round: 0,
    size: '0x507',
    stateRoot: '0xa60d0868bd41b63b4fd67e5a8f801c5949e89a8994a13426747890b77d6bc0c4',
    timestamp: '0x610b3164',
    timestampFoS: '0xc',
    totalBlockScore: '0x3f79aa8',
    transactions: [
        {
            blockHash: '0x188d4531d668ae3da20d70d4cb4c5d96a0cc5190771f0920c56b461c4d356566',
            blockNumber: '0x3f79aa7',
            contractAddress: null,
            feePayer: '0xfee998d423d5bd2bf5b5c0f0acb4e3aae2bd2286',
            feePayerSignatures: [
                {
                    V: '0x7f5',
                    R: '0xf9aff6f39feb7a18d3e1b8ab9f590f0227e465c72cfe05e8d7c9e390cbf1d349',
                    S: '0x6e7317d121a3951a8cbca110be8cc86c5314349f8fb1c37f9af4cadf72fe89ec',
                },
            ],
            from: '0x11eb23f57151a88d4bb53cc9c27355437138c278',
            gas: '0x2dc6c0',
            gasPrice: '0x5d21dba00',
            gasUsed: '0x3ea49',
            input: '0x850ba...',
            logs: [
                {
                    address: '0x78ca9a1105c3392b56625f3fcfd149b29322c56f',
                    topics: [ '0xddf25...', '0x00000...', '0x00000...', '0x00000...' ],
                    data: '0x',
                    blockNumber: '0x3f79aa7',
                    transactionHash: '0x109d2836d9fde9d8081a27dd6ac545fd7a53530a56bdc40f2a11e5d6dbc2a09f',
                    transactionIndex: '0x0',
                    blockHash: '0x188d4531d668ae3da20d70d4cb4c5d96a0cc5190771f0920c56b461c4d356566',
                    logIndex: '0x0',
                    removed: false,
                },
            ],
            logsBloom: '0x00000...',
            nonce: '0x0',
            senderTxHash: '0xeca2d3650403a1e27af0bbe9878dcbb248d764fc88751f35a6e05636d2ad9e78',
            signatures: [
                {
                    V: '0x7f6',
                    R: '0x9ea78985b004afa86acd455c017da374ec1aec885f963ec8134a38f7ede451b0',
                    S: '0xfac0e417f7f7b15023e3f5ac95f1fb5b3280746a2eff04394ddedbdd259fc1',
                },
            ],
            status: '0x1',
            to: '0x78ca9a1105c3392b56625f3fcfd149b29322c56f',
            transactionHash: '0x109d2836d9fde9d8081a27dd6ac545fd7a53530a56bdc40f2a11e5d6dbc2a09f',
            transactionIndex: '0x0',
            type: 'TxTypeFeeDelegatedSmartContractExecution',
            typeInt: 49,
            value: '0x0',
        },
    ],
    transactionsRoot: '0x109d2836d9fde9d8081a27dd6ac545fd7a53530a56bdc40f2a11e5d6dbc2a09f',
    voteData: '0x',
}
```

## caver.rpc.klay.getCommittee <a href="#caver-rpc-klay-getcommittee" id="caver-rpc-klay-getcommittee"></a>

```javascript
caver.rpc.klay.getCommittee([blockNumber] [, callback])
```

Trả về danh sách tất cả các nút xác thực của ủy ban tại khối được chỉ định.

**Tham số**

| Tên         | Loại       | Mô tả                                                                                                                             |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| blockNumber | số \| chuỗi | (tùy chọn) Số khối hoặc chuỗi `mới nhất` hoặc `cũ nhất`. Nếu bị bỏ qua, chuỗi `mới nhất` sẽ được sử dụng.      |
| callback    | hàm         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Mảng`

| Loại | Mô tả                                                           |
| ----- | --------------------------------------------------------------- |
| Mảng  | Địa chỉ của tất cả các nút xác thực của ủy ban tại khối đã cho. |

**Ví dụ**

```javascript
> caver.rpc.klay.getCommittee().then(console.log)
[
    '0xddc2002b729676dfd906484d35bb02a8634d7040',
    '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e'
]
```

## caver.rpc.klay.getCommitteeSize <a href="#caver-rpc-klay-getcommitteesize" id="caver-rpc-klay-getcommitteesize"></a>

```javascript
caver.rpc.klay.getCommitteeSize([blockNumber] [, callback])
```

Trả về quy mô của ủy ban tại khối được chỉ định.

**Tham số**

| Tên         | Loại       | Mô tả                                                                                                                             |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| blockNumber | số \| chuỗi | (tùy chọn) Số khối hoặc chuỗi `mới nhất` hoặc `cũ nhất`. Nếu bị bỏ qua, chuỗi `mới nhất` sẽ được sử dụng.      |
| callback    | hàm         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `số`

| Loại | Mô tả                              |
| ----- | ---------------------------------- |
| số    | Quy mô của ủy ban tại khối đã cho. |

**Ví dụ**

```javascript
> caver.rpc.klay.getCommitteeSize().then(console.log)
2
```

## caver.rpc.klay.getCouncil <a href="#caver-rpc-klay-getcouncil" id="caver-rpc-klay-getcouncil"></a>

```javascript
caver.rpc.klay.getCouncil([blockNumber] [, callback])
```

Trả về danh sách tất cả các nút xác thực của hội đồng tại khối được chỉ định.

**Tham số**

| Tên         | Loại       | Mô tả                                                                                                                             |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| blockNumber | số \| chuỗi | (tùy chọn) Số khối hoặc chuỗi `mới nhất` hoặc `cũ nhất`. Nếu bị bỏ qua, chuỗi `mới nhất` sẽ được sử dụng.      |
| callback    | hàm         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Mảng`

| Loại | Mô tả                                                                                                 |
| ----- | ----------------------------------------------------------------------------------------------------- |
| Mảng  | Một mảng địa chỉ nút xác thực của hội đồng tại khối đã cho hoặc null khi không tìm thấy hội đồng nào. |

**Ví dụ**

```javascript
> caver.rpc.klay.getCouncil().then(console.log)
[
    '0xa1d2665c4c9f77410844dd4c22ed11aabbd4033e',
    '0xddc2002b729676dfd906484d35bb02a8634d7040'
]
```

## caver.rpc.klay.getCouncilSize <a href="#caver-rpc-klay-getcouncilsize" id="caver-rpc-klay-getcouncilsize"></a>

```javascript
caver.rpc.klay.getCouncilSize([blockNumber] [, callback])
```

Trả về quy mô của hội đồng tại khối được chỉ định.

**Tham số**

| Tên         | Loại       | Mô tả                                                                                                                             |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| blockNumber | số \| chuỗi | (tùy chọn) Số khối hoặc chuỗi `mới nhất` hoặc `cũ nhất`. Nếu bị bỏ qua, chuỗi `mới nhất` sẽ được sử dụng.      |
| callback    | hàm         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `số`

| Loại | Mô tả                                |
| ----- | ------------------------------------ |
| số    | Quy mô của hội đồng tại khối đã cho. |

**Ví dụ**

```javascript
> caver.rpc.klay.getCouncilSize().then(console.log)
2
```

## caver.rpc.klay.getStorageAt <a href="#caver-rpc-klay-getstorageat" id="caver-rpc-klay-getstorageat"></a>

```javascript
caver.rpc.klay.getStorageAt(address, position [, blockNumber] [, callback])
```

Trả về giá trị từ vị trí lưu trữ tại một địa chỉ đã cho.

**Tham số**

| Tên         | Loại       | Mô tả                                                                                                                                                                                          |
| ----------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address     | chuỗi       | Địa chỉ nơi để nhận bộ nhớ lưu trữ.                                                                                                                                                            |
| vị trí      | số          | Vị trí chỉ mục của bộ nhớ lưu trữ. Để biết thêm thông tin về `tính toán vị trí`, hãy tham khảo [klay_getStorageAt](../../../../json-rpc/klay/block.md#klay_getstorageat). |
| blockNumber | số \| chuỗi | (tùy chọn) Số khối hoặc chuỗi `mới nhất` hoặc `cũ nhất`. Nếu bị bỏ qua, chuỗi `mới nhất` sẽ được sử dụng.                                                                   |
| callback    | hàm         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                              |

**Giá trị trả về**

`Promise` trả về `chuỗi`

| Loại | Mô tả                           |
| ----- | ------------------------------- |
| chuỗi | Giá trị tại vị trí lưu trữ này. |

**Ví dụ**

```javascript
> caver.rpc.klay.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 0).then(console.log)
0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234
```

## caver.rpc.klay.isMinting <a href="#caver-rpc-klay-isminting" id="caver-rpc-klay-isminting"></a>

```javascript
caver.rpc.klay.isMinting([callback])
```

Giá trị trả về là `true` nếu máy khách đang tích cực khai thác các khối mới.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                                             |
| -------- | ----- | --------------------------------------------------------------------------------------------------------------------------------- |
| callback | hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `boolean` - giá trị là `true` nếu máy khách đang khai thác, nếu không sẽ là `false`.

**Ví dụ**

```javascript
> caver.rpc.klay.isMinting().then(console.log)
true
```

## caver.rpc.klay.isSyncing <a href="#caver-rpc-klay-issyncing" id="caver-rpc-klay-issyncing"></a>

```javascript
caver.rpc.klay.isSyncing([callback])
```

Trả về đối tượng có dữ liệu về trạng thái đồng bộ hóa hoặc false.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                                             |
| -------- | ----- | --------------------------------------------------------------------------------------------------------------------------------- |
| callback | hàm   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `object boolean` - `false` nếu Nút Klaytn không đồng bộ hóa.

| Nếu không, một đối tượng đồng bộ sẽ được trả về:         | Tên           | Loại |
| -------------------------------------------------------- | ------------- | ----- |
| Mô tả                                                    | startingBlock | chuỗi |
| Số khối ở dạng hex nơi mà quy trình đồng bộ hóa bắt đầu. | currentBlock  | chuỗi |
| Số khối ở dạng hex nơi nút hiện được đồng bộ hóa đến.    | highestBlock  | chuỗi |
| Số khối ước tính dạng hex để đồng bộ hóa đến.            | knownStates   | chuỗi |
| Các trạng thái ước tính dạng hex cần tải xuống.          | pulledStates  | chuỗi |

Các trạng thái đã tải xuống dạng hex.

```javascript
> caver.rpc.klay.isSyncing().then(console.log)
{
        startingBlock: 100,
        currentBlock: 312,
        highestBlock: 512,
        knownStates: 234566,
        pulledStates: 123455
}

> caver.rpc.klay.isSyncing().then(console.log)
false
```

## **Ví dụ**

```javascript
caver.rpc.klay.call(callObject [, blockNumber] [, callback])
```

caver.rpc.klay.call <a href="#caver-rpc-klay-call" id="caver-rpc-klay-call"></a> Thực thi lệnh gọi thông báo ngay mà không gửi giao dịch trên chuỗi khối.

Trả về dữ liệu hoặc đối tượng lỗi của JSON RPC nếu xảy ra lỗi.

| **Tham số**                                          | Tên         | Loại                                                                                   |
| ---------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------- |
| Mô tả                                                | callObject  | đối tượng Đối tượng lệnh gọi giao dịch.                                                 |
| Xem bảng tiếp theo để biết thuộc tính của đối tượng. | blockNumber | số \| chuỗi (tùy chọn) Số khối hoặc chuỗi `mới nhất` hoặc `cũ nhất`. |
| Nếu bị bỏ qua, chuỗi `mới nhất` sẽ được sử dụng.     | callback    | hàm                                                                                     |

(tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.

| `callObject` có các thuộc tính như sau:                                                                    | Tên     | Loại                                                                                 |
| ---------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------- |
| Mô tả                                                                                                      | đến     | chuỗi                                                                                 |
| (tùy chọn khi thử nghiệm triển khai hợp đồng mới) Địa chỉ mà giao dịch được chuyển đến. | nhập    | chuỗi (tùy chọn) Hàm băm của chữ ký phương pháp và tham số mã hóa. |
| Bạn có thể sử dụng [caver.abi.encodeFunctionCall](../caver.abi.md#encodefunctioncall).                     | từ      | chuỗi                                                                                 |
| (tùy chọn) Địa chỉ nơi giao dịch được gửi đi.                                           | gas     | chuỗi (tùy chọn) Gas được cung cấp để thực hiện giao dịch.         |
| `klay_call` không sử dụng gas, nhưng một số lần thực thi có thể cần tham số này.                           | giá gas | chuỗi                                                                                 |
| (tùy chọn) gasPrice được sử dụng cho mỗi loại gas đã thanh toán.                        | giá trị | chuỗi                                                                                 |

(tùy chọn) Giá trị được gửi cùng với giao dịch này bằng `peb`.

**Giá trị trả về**

| `Promise` trả về `chuỗi` | Loại                              |
| ------------------------ | ---------------------------------- |
| Mô tả                    | chuỗi Dữ liệu trả về của lệnh gọi. |

_ví dụ_: giá trị trả về của hàm hợp đồng thông minh.

```javascript
> caver.rpc.klay.call({ 
        to: '0x5481a10a47C74f800BDF4955BD77550881bde91C', // contract address
        input: '0x70a08231000000000000000000000000ddc2002b729676dfd906484d35bb02a8634d7040'
    }).then(console.log)
0x0000000000000000000000000000000000000000000000000de0b6b3a7640000
```

## **Ví dụ**

```javascript
caver.rpc.klay.estimateGas(callObject [, blockNumber] [, callback])
```

caver.rpc.klay.estimateGas <a href="#caver-rpc-klay-estimategas" id="caver-rpc-klay-estimategas"></a> Tạo và trả về giá trị lượng `gas` ước tính cần thiết để cho phép hoàn tất giao dịch.

Giao dịch từ phương pháp này sẽ không được thêm vào chuỗi khối.

**Tham số**

Xem các tham số [caver.rpc.klay.call](#caver-rpc-klay-call), ngoại trừ việc tất cả các thuộc tính đều là tùy chọn.

**Giá trị trả về**

| `Promise` trả về `chuỗi` | Loại |
| ------------------------ | ----- |
| Mô tả                    | chuỗi |

Lượng gas được sử dụng.

```javascript
> caver.rpc.klay.estimateGas({ 
        to: '0x5481a10a47C74f800BDF4955BD77550881bde91C', // contract address
        input: '0x095ea7b300000000000000000000000028e4e077686d1aeaf54a1313ff4841181056fe32000000000000000000000000000000000000000000000000000000000000000a'
    }).then(console.log)
0xb2a0
```

## **Ví dụ**

```javascript
caver.rpc.klay.estimateComputationCost(callObject [, blockNumber] [, callback])
```

caver.rpc.klay.estimateComputationCost <a href="#caver-rpc-klay-estimatecomputationcost" id="caver-rpc-klay-estimatecomputationcost"></a> Tạo và trả về `chi phí tính toán` ước tính sẽ được sử dụng để thực thi giao dịch. Klaytn giới hạn chi phí tính toán của một giao dịch ở mức `100000000`, hiện không mất quá nhiều thời gian cho một giao dịch.

Giao dịch sẽ không được thêm vào chuỗi khối như [caver.rpc.klay.estimateGas](#caver-rpc-klay-estimategas).

**Tham số**

Xem các tham số [caver.rpc.klay.call](#caver-rpc-klay-call), ngoại trừ việc tất cả các thuộc tính đều là tùy chọn.

**Giá trị trả về**

| `Promise` trả về `chuỗi` | Loại |
| ------------------------ | ----- |
| Mô tả                    | chuỗi |

Lượng chi phí tính toán được sử dụng.

```javascript
> caver.rpc.klay.estimateComputationCost({ 
        to: '0x5481a10a47C74f800BDF4955BD77550881bde91C', // contract address
        input: '0x095ea7b300000000000000000000000028e4e077686d1aeaf54a1313ff4841181056fe32000000000000000000000000000000000000000000000000000000000000000a'
    }).then(console.log)
0xd761
```

## **Ví dụ**

```javascript
caver.rpc.klay.getTransactionByBlockHashAndIndex(blockHash, index [, callback])
```

caver.rpc.klay.getTransactionByBlockHashAndIndex <a href="#caver-rpc-klay-gettransactionbyblockhashandindex" id="caver-rpc-klay-gettransactionbyblockhashandindex"></a>

Trả về thông tin về giao dịch của khối theo hàm băm và vị trí chỉ mục của giao dịch.

| **Tham số**                                  | Tên       | Loại |
| -------------------------------------------- | --------- | ----- |
| Mô tả                                        | blockHash | chuỗi |
| Hàm băm khối.                                | chỉ mục   | số    |
| Một vị trí chỉ mục giao dịch bên trong khối. | callback  | hàm   |

(tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.

**Giá trị trả về**

| `Promise` trả về `đối tượng` | Loại     |
| ---------------------------- | --------- |
| Mô tả                        | đối tượng |

Một đối tượng giao dịch, hãy xem [caver.rpc.klay.getTransactionByHash](#caver-rpc-klay-gettransactionbyhash) để biết thêm thông tin chi tiết.

```javascript
> caver.rpc.klay.getTransactionByBlockHashAndIndex('0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576', 0).then(console.log)
{
    blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
    blockNumber: '0xb7',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    hash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    nonce: '0x0',
    senderTxHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    signatures: [ { V: '0x4e44', R: '0xf1a9a...', S: '0x9116c...' } ],
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000'
}
```

## **Ví dụ**

```javascript
caver.rpc.klay.getTransactionByBlockNumberAndIndex(blockNumber, index [, callback])
```

caver.rpc.klay.getTransactionByBlockNumberAndIndex <a href="#caver-rpc-klay-gettransactionbyblocknumberandindex" id="caver-rpc-klay-gettransactionbyblocknumberandindex"></a>

Trả về thông tin về giao dịch theo `số khối` và vị trí `chỉ mục giao dịch`.

| **Tham số**                                                                     | Tên         | Loại       |
| ------------------------------------------------------------------------------- | ----------- | ----------- |
| Mô tả                                                                           | blockNumber | số \| chuỗi |
| Số khối hoặc chuỗi thẻ khối (`khởi nguyên` hoặc `mới nhất`). | chỉ mục     | số          |
| Một vị trí chỉ mục giao dịch bên trong khối.                                    | callback    | hàm         |

(tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.

**Giá trị trả về**

| `Promise` trả về `đối tượng` | Loại     |
| ---------------------------- | --------- |
| Mô tả                        | đối tượng |

Một đối tượng giao dịch, hãy xem [caver.rpc.klay.getTransactionByHash](#caver-rpc-klay-gettransactionbyhash) để biết thêm thông tin chi tiết.

```javascript
> caver.rpc.klay.getTransactionByBlockNumberAndIndex(183, 0).then(console.log)
{
    blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
    blockNumber: '0xb7',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    hash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    nonce: '0x0',
    senderTxHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    signatures: [ { V: '0x4e44', R: '0xf1a9a...', S: '0x9116c...' } ],
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000'
}
```

## **Ví dụ**

```javascript
caver.rpc.klay.getTransactionByHash(transactionHash [, callback])
```

caver.rpc.klay.getTransactionByHash <a href="#caver-rpc-klay-gettransactionbyhash" id="caver-rpc-klay-gettransactionbyhash"></a>

Trả về thông tin về một giao dịch được yêu cầu theo hàm băm giao dịch.

| **Tham số**            | Tên             | Loại |
| ---------------------- | --------------- | ----- |
| Mô tả                  | transactionHash | chuỗi |
| Hàm băm của giao dịch. | callback        | hàm   |

(tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.

**Giá trị trả về**

| `Promise` trả về `đối tượng` - Một đối tượng giao dịch hoặc `null` khi không tìm thấy giao dịch:     | Tên                | Loại                                                                                                                                                                          |
| ---------------------------------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Mô tả                                                                                                | blockHash          | chuỗi                                                                                                                                                                          |
| Hàm băm của khối chứa giao dịch này.                                                                 | blockNumber        | chuỗi                                                                                                                                                                          |
| Số khối chứa giao dịch này.                                                                          | codeFormat         | chuỗi                                                                                                                                                                          |
| (tùy chọn) Định dạng mã của mã hợp đồng thông minh.                               | feePayer           | chuỗi                                                                                                                                                                          |
| (tùy chọn) Địa chỉ của người trả phí.                                             | feePayerSignatures | Mảng (tùy chọn) Mảng các đối tượng chữ ký của người trả phí. Một đối tượng chữ ký chứa ba trường (V, R và S). V chứa mã khôi phục ECDSA. |
| R chứa chữ ký ECDSA r trong khi S chứa chữ ký ECDSA s.                                               | feeRatio           | chuỗi (tùy chọn) Tỷ lệ phí của người trả phí. Nếu tỷ lệ là 30 thì người trả phí phải trả 30% phí.                                                           |
| 70% còn lại sẽ được trả bởi người gửi.                                                               | từ                 | chuỗi                                                                                                                                                                          |
| Địa chỉ của người gửi.                                                                               | gas                | chuỗi                                                                                                                                                                          |
| Gas được người gửi cung cấp.                                                                         | giá gas            | chuỗi                                                                                                                                                                          |
| Giá gas được người gửi cung cấp theo đơn vị peb.                                                     | hash               | chuỗi                                                                                                                                                                          |
| Hàm băm của giao dịch.                                                                               | humanReadable      | Boolean                                                                                                                                                                        |
| (tùy chọn) `true` nếu địa chỉ con người có thể đọc được, ngược lại sẽ là `false`. | khóa               | chuỗi (tùy chọn) AccountKey được mã hóa RLP được sử dụng để cập nhật AccountKey của tài khoản Klaytn.                                                       |
| Xem [AccountKey](../../../../../learn/accounts.md#account-key) để biết thêm thông tin chi tiết.      | nhập               | chuỗi                                                                                                                                                                          |
| (tùy chọn) Dữ liệu được gửi cùng với giao dịch.                                   | số dùng một lần    | chuỗi                                                                                                                                                                          |
| Số lượng giao dịch được người gửi thực hiện trước giao dịch này.                                     | senderTxHash       | chuỗi (tùy chọn) Hàm băm của tx mà không có địa chỉ và chữ ký của người trả phí.                                                                            |
| Giá trị này luôn giống với giá trị của `hàm băm` đối với các giao dịch không ủy thác phí.            | chữ ký             | Mảng Một mảng các đối tượng chữ ký. Một đối tượng chữ ký chứa ba trường (V, R và S). V chứa mã khôi phục ECDSA.                                             |
| R chứa chữ ký ECDSA r trong khi S chứa chữ ký ECDSA s.                                               | đến                | chuỗi Địa chỉ của người nhận.                                                                                                                                                  |
| `null` nếu đó là giao dịch triển khai hợp đồng.                                                      | transactionIndex   | chuỗi                                                                                                                                                                          |
| Giá trị nguyên biểu thị vị trí chỉ mục của giao dịch trong khối.                                     | loại              | chuỗi                                                                                                                                                                          |
| Chuỗi biểu thị loại giao dịch.                                                                       | typeInt            | số                                                                                                                                                                             |
| Giá trị nguyên biểu thị loại giao dịch.                                                              | giá trị            | chuỗi                                                                                                                                                                          |

Giá trị được chuyển tính bằng đơn vị peb. Nếu giao dịch ở trạng thái `đang chờ xử lý` chưa được xử lý, các giá trị mặc định cho `blockHash`, `blockNumber` và `transactionIndex` sẽ được trả về.

Xem ví dụ bên dưới.

```javascript
> caver.rpc.klay.getTransactionByHash('0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa').then(console.log)
{
    blockHash: '0xb273976bad5f3d40ba46839c020f61b1629e2362d351e3c9cb32268afc7cb477',
    blockNumber: '0x74c',
    codeFormat: '0x0',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x3d0900',
    gasPrice: '0x5d21dba00',
    hash: '0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa',
    humanReadable: false,
    input: '0x60806...',
    nonce: '0xa',
    senderTxHash: '0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa',
    signatures: [ { V: '0x4e44', R: '0xe4ac3...', S: '0x5374f...' } ],
    to: null,
    transactionIndex: '0x0',
    type: 'TxTypeSmartContractDeploy',
    typeInt: 40,
    value: '0x0',
}

// When transaction is in pending, default values for `blockHash`, `blockNumber` and `trasnactionIndex` are returned.
> caver.rpc.klay.getTransactionByHash('0x72e3838a42fbe75724a685ca03e50ff25ebc564e32d06dadf41be2190e5b11d1').then(console.log)
{
    blockHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
    blockNumber: '0x0',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    hash: '0x72e3838a42fbe75724a685ca03e50ff25ebc564e32d06dadf41be2190e5b11d1',
    nonce: '0xd',
    senderTxHash: '0x72e3838a42fbe75724a685ca03e50ff25ebc564e32d06dadf41be2190e5b11d1',
    signatures: [ { V: '0x4e44', R: '0x73634...', S: '0x479be...' } ],
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000',
}
```

## **Ví dụ**

```javascript
caver.rpc.klay.getTransactionBySenderTxHash(senderTxHash [, callback])
```

caver.rpc.klay.getTransactionBySenderTxHash <a href="#caver-rpc-klay-gettransactionbysendertxhash" id="caver-rpc-klay-gettransactionbysendertxhash"></a>

Trả về thông tin về một giao dịch được yêu cầu theo hàm băm giao dịch của người gửi. Xin lưu ý rằng API này chỉ trả về kết quả chính xác nếu tính năng lập chỉ mục được bật trong nút mạng bởi `--sendertxhashindexing`.

Sử dụng thuộc tính [caver.rpc.klay.isSenderTxHashIndexingEnabled](#caver-rpc-klay-issendertxhashindexingenabled) để kiểm tra xem tính năng lập chỉ mục đã được bật hay chưa.

| **Tham số**                                                                                                               | Tên          | Loại                                  |
| ------------------------------------------------------------------------------------------------------------------------- | ------------ | -------------------------------------- |
| Mô tả                                                                                                                     | senderTxHash | chuỗi Hàm băm giao dịch của người gửi. |
| Tham khảo [SenderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash) để biết thêm thông tin chi tiết. | callback     | hàm                                    |

(tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.

**Giá trị trả về**

| `Promise` trả về `đối tượng` | Loại     |
| ---------------------------- | --------- |
| Mô tả                        | đối tượng |

Một đối tượng giao dịch, hãy xem [caver.rpc.klay.getTransactionByHash](#caver-rpc-klay-gettransactionbyhash) để biết thêm thông tin chi tiết.

```javascript
> caver.rpc.klay.getTransactionBySenderTxHash('0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa').then(console.log)
{
    blockHash: '0xb273976bad5f3d40ba46839c020f61b1629e2362d351e3c9cb32268afc7cb477',
    blockNumber: '0x74c',
    codeFormat: '0x0',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x3d0900',
    gasPrice: '0x5d21dba00',
    hash: '0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa',
    humanReadable: false,
    input: '0x60806...',
    nonce: '0xa',
    senderTxHash: '0x991d2e63b91104264d2886fb2ae2ccdf90551377af4e334b313abe123a5406aa',
    signatures: [ { V: '0x4e44', R: '0xe4ac3...', S: '0x5374f...' } ],
    to: null,
    transactionIndex: '0x0',
    type: 'TxTypeSmartContractDeploy',
    typeInt: 40,
    value: '0x0',
}
```

## **Ví dụ**

```javascript
caver.rpc.klay.getTransactionReceipt(transactionHash [, callback])
```

caver.rpc.klay.getTransactionReceipt <a href="#caver-rpc-klay-gettransactionreceipt" id="caver-rpc-klay-gettransactionreceipt"></a>

Trả về biên lai của một giao dịch theo hàm băm giao dịch.

**LƯU Ý** Biên lai không khả dụng cho các giao dịch `đang chờ xử lý` có các giao dịch chưa được xử lý.

| **Tham số**            | Tên             | Loại |
| ---------------------- | --------------- | ----- |
| Mô tả                  | transactionHash | chuỗi |
| Hàm băm của giao dịch. | callback        | hàm   |

(tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.

**Giá trị trả về**

| `Promise` trả về `đối tượng` - Đối tượng biên lai giao dịch hoặc `null` khi không tìm thấy biên lai:               | Tên                                                                            | Loại                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mô tả                                                                                                              | blockHash                                                                      | chuỗi                                                                                                                                                                                 |
| Hàm băm của khối chứa giao dịch này.                                                                               | blockNumber                                                                    | chuỗi                                                                                                                                                                                 |
| Số khối chứa giao dịch này.                                                                                        | codeFormat                                                                     | chuỗi                                                                                                                                                                                 |
| (tùy chọn) Định dạng mã của mã hợp đồng thông minh.                                             | contractAddress                                                                | chuỗi                                                                                                                                                                                 |
| Địa chỉ hợp đồng được tạo nếu giao dịch là giao dịch tạo hợp đồng, nếu không, giá trị sẽ là `null`.                | effectiveGasPrice                                                              | chuỗi Giá trị thực tế trên mỗi gas được khấu trừ từ người gửi. Trước khi nâng cấp căn bản Magma, giá trị này bằng với giá gas của giao dịch.                                          |
| Sau nâng cấp căn bản Magma, giá trị này bằng với giá trị của `baseFee` trong tiêu đề khối.                         | feePayer                                                                       | chuỗi                                                                                                                                                                                 |
| (tùy chọn) Địa chỉ của người trả phí.                                                           | feePayerSignatures                                                             | Mảng (tùy chọn) Mảng các đối tượng chữ ký của người trả phí. Một đối tượng chữ ký chứa ba trường (V, R và S). V chứa mã khôi phục ECDSA.        |
| (tùy chọn) Mảng các đối tượng chữ ký của người trả phí.                                         | Một đối tượng chữ ký chứa ba trường (V, R và S).            | V chứa mã khôi phục ECDSA. R chứa chữ ký ECDSA r trong khi S chứa chữ ký ECDSA s. feeRatio                                                                                            |
| chuỗi                                                                                                              | (tùy chọn) Tỷ lệ phí của người trả phí.                     | Nếu tỷ lệ là 30 thì người trả phí phải trả 30% phí.                                                                                                                                   |
| 70% còn lại sẽ được trả bởi người gửi.                                                                             | từ                                                                             | chuỗi                                                                                                                                                                                 |
| Địa chỉ của người gửi.                                                                                             | gas                                                                            | chuỗi                                                                                                                                                                                 |
| Gas được người gửi cung cấp.                                                                                       | giá gas                                                                        | chuỗi                                                                                                                                                                                 |
| Giá gas được người gửi cung cấp theo đơn vị peb.                                                                   | gasUsed                                                                        | chuỗi                                                                                                                                                                                 |
| Lượng gas được sử dụng bởi riêng giao dịch cụ thể này.                                                             | humanReadable                                                                  | Boolean                                                                                                                                                                               |
| (tùy chọn) `true` nếu địa chỉ con người có thể đọc được, ngược lại sẽ là `false`.               | khóa                                                                           | chuỗi                                                                                                                                                                                 |
| (tùy chọn) AccountKey được mã hóa RLP được sử dụng để cập nhật AccountKey của tài khoản Klaytn. | nhập                                                                           | chuỗi                                                                                                                                                                                 |
| (tùy chọn) Dữ liệu được gửi cùng với giao dịch.                                                 | bản ghi                                                                        | Mảng                                                                                                                                                                                  |
| Mảng đối tượng bản ghi mà giao dịch này tạo ra.                                                                    | nhật kýBloom                                                                   | chuỗi                                                                                                                                                                                 |
| Bộ lọc Bloom dành cho các ứng dụng khách nhẹ giúp truy xuất nhanh các bản ghi liên quan.                           | số dùng một lần                                                                | chuỗi Số lượng giao dịch được người gửi thực hiện trước giao dịch này. senderTxHash                                                                                                   |
| chuỗi                                                                                                              | (tùy chọn) Hàm băm của một giao dịch chỉ được người gửi ký. | Xem [SenderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash). Giá trị này luôn giống với `transactionHash` đối với các giao dịch không ủy thác phí. chữ ký Mảng |
| Một mảng các đối tượng chữ ký.                                                                                     | Một đối tượng chữ ký chứa ba trường (V, R và S).            | V chứa mã khôi phục ECDSA.                                                                                                                                                            |
| R chứa chữ ký ECDSA r trong khi S chứa chữ ký ECDSA s.                                                             | trạng thái                                                                     | chuỗi                                                                                                                                                                                 |
| `0x1` nếu giao dịch thành công, `0x0` nếu Máy ảo Klaytn đặt lại giao dịch.                                         | txError                                                                        | chuỗi (tùy chọn) mã lỗi chi tiết nếu `trạng thái` bằng `0x0`.                                                                                                      |
| đến                                                                                                                | chuỗi                                                                          | Địa chỉ của người nhận.                                                                                                                                                               |
| `null` nếu đó là giao dịch tạo hợp đồng.                                                                           | transactionHash                                                                | chuỗi                                                                                                                                                                                 |
| Hàm băm của giao dịch.                                                                                             | transactionIndex                                                               | chuỗi                                                                                                                                                                                 |
| Giá trị nguyên biểu thị vị trí chỉ mục của giao dịch trong khối.                                                   | loại                                                                          | chuỗi                                                                                                                                                                                 |
| Chuỗi biểu thị loại giao dịch.                                                                                     | typeInt                                                                        | số                                                                                                                                                                                    |

Giá trị nguyên biểu thị loại giao dịch.

giá trị

```javascript
// Before the Magma hard fork
> caver.rpc.klay.getTransactionReceipt('0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898').then(console.log)
{
    blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
    blockNumber: '0xb7',
    contractAddress: null,
    effectiveGasPrice: '0x5d21dba00',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    gasUsed: '0x5208',
    logs: [],
    logsBloom: '0x00000...',
    nonce: '0x0',
    senderTxHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    signatures: [ { V: '0x4e44', R: '0xf1a9a...', S: '0x9116c...' } ],
    status: '0x1',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000',
}

// After the Magma hard fork
> caver.rpc.klay.getTransactionReceipt('0xf0554493c273352eac667eb30a1b70fffa8e8a0f682928b31baaceccc17c64b9').then(console.log)
{
  blockHash: '0xaa358681023db9d967ff44577a34aea487c37433ebf6ef349baee50f9d1d2f03',
  blockNumber: '0x99',
  contractAddress: null,
  effectiveGasPrice: '0x5d21dba00',
  from: '0xca7a99380131e6c76cfa622396347107aeedca2d',
  gas: '0x61a8',
  gasPrice: '0xba43b7400',
  gasUsed: '0x5208',
  logs: [],
  logsBloom: '0x00000...',
  nonce: '0x2',
  senderTxHash: '0xf0554493c273352eac667eb30a1b70fffa8e8a0f682928b31baaceccc17c64b9',
  signatures: [ { V: '0x1cb4c6', R: '0x1605e...', S: '0x459cf...' } ],
  status: '0x1',
  to: '0x08ef5d2def29ff4384dd93a73e076d959abbd2f4',
  transactionHash: '0xf0554493c273352eac667eb30a1b70fffa8e8a0f682928b31baaceccc17c64b9',
  transactionIndex: '0x0',
  type: 'TxTypeValueTransfer',
  typeInt: 8,
  value: '0xde0b6b3a7640000'
}
```

## chuỗi

```javascript
caver.rpc.klay.getTransactionReceiptBySenderTxHash(senderTxHash [, callback])
```

Giá trị được chuyển tính bằng đơn vị peb.

**LƯU Ý** `effectiveGasPrice` được hỗ trợ kể từ caver-js phiên bản [v1.9.0](https://www.npmjs.com/package/caver-js/v/1.9.0). **Ví dụ**

caver.rpc.klay.getTransactionReceiptBySenderTxHash <a href="#caver-rpc-klay-gettransactionreceiptbysendertxhash" id="caver-rpc-klay-gettransactionreceiptbysendertxhash"></a>

Trả về biên lai của một giao dịch theo hàm băm giao dịch của người gửi.

| Xin lưu ý rằng API này chỉ trả về kết quả chính xác nếu tính năng lập chỉ mục được bật trong nút mạng bởi `--sendertxhashindexing`. | Sử dụng thuộc tính [caver.rpc.klay.isSenderTxHashIndexingEnabled](#caver-rpc-klay-issendertxhashindexingenabled) để kiểm tra xem tính năng lập chỉ mục đã được bật hay chưa. | **LƯU Ý** Biên lai không khả dụng cho các giao dịch `đang chờ xử lý` có các giao dịch chưa được xử lý. |
| ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Tham số**                                                                                                                         | Tên                                                                                                                                                                          | Loại Mô tả                                                                                            |
| senderTxHash                                                                                                                        | chuỗi                                                                                                                                                                        | Hàm băm giao dịch của người gửi.                                                                       |

ham khảo [SenderTxHash](../../../../../learn/transactions/transactions.md#sendertxhash) để biết thêm thông tin chi tiết.

callback

| hàm                | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Giá trị trả về** | `Promise` trả về `đối tượng`                                                                                                      |

Loại

```javascript
> caver.rpc.klay.getTransactionReceiptBySenderTxHash('0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898').then(console.log)
{
    blockHash: '0xc9f643c0ebe84932c10695cbc9eb75228af09516931b58952de3e12c21a50576',
    blockNumber: '0xb7',
    contractAddress: null,
    effectiveGasPrice: '0x5d21dba00',
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    gasUsed: '0x5208',
    logs: [],
    logsBloom: '0x00000...',
    nonce: '0x0',
    senderTxHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    signatures: [ { V: '0x4e44', R: '0xf1a9a...', S: '0x9116c...' } ],
    status: '0x1',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionHash: '0xdb63fb385e51fbfd84a98873c994aef622c5f1c72c5760a9ff95c55bbfd99898',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000',
}
```

## Mô tả

```javascript
caver.rpc.klay.sendRawTransaction(signedTransaction [, callback])
```

đối tượng

Một đối tượng biên lai giao dịch, hãy xem [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) để biết thêm thông tin chi tiết. **Ví dụ** caver.rpc.klay.sendRawTransaction <a href="#caver-rpc-klay-sendrawtransaction" id="caver-rpc-klay-sendrawtransaction"></a>

Gửi một `giao dịch đã ký` đến Klaytn.

| Tham số `signedTransaction` có thể là "Giao dịch đã ký được mã hóa RLP". | Bạn có thể nhận giao dịch được mã hóa RLP của giao dịch đã ký bằng cách sử dụng `transaction.getRLPEncoding`. | Để thuận tiện, `caver.rpc.klay.sendRawTransaction` cũng chấp nhận "phiên bản giao dịch đã ký" làm tham số. |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Tham số**                                                              | Tên                                                                                                           | Loại                                                                                                      |
| Mô tả                                                                    | signedTransaction                                                                                             | chuỗi \| đối tượng                                                                                         |

Giao dịch đã ký được mã hóa RLP hoặc một phiên bản của giao dịch đã ký.

| callback                                                                                                                          | hàm                      |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. | **Giá trị trả về** Loại |

Mô tả

- PromiEvent
- Trình phát sự kiện kết hợp promise. Bộ phát này sẽ được xử lý khi có biên lai giao dịch.
- Đối với PromiEvent, sẽ có các sự kiện sau đây: `transactionHash` trả về `chuỗi`: Được kích hoạt ngay sau khi gửi giao dịch và có hàm băm giao dịch.

`biên lai` trả về `đối tượng`: Được kích hoạt khi có sẵn biên lai giao dịch.

```javascript
// Using promise
> caver.rpc.klay.sendRawTransaction('0x08f88...').then(console.log)
{
    blockHash: '0x8bff3eb5444711f53707c1c006dac54164af6f873c0f012aff98479155de3c46',
    blockNumber: '0x18a6',
    contractAddress: null,
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    gasUsed: '0x5208',
    logs: [],
    logsBloom: '0x00000...',
    nonce: '0xc',
    senderTxHash: '0x72ea9179350cf2943e966eaf1e1e651d4e1b50ead4b6e6a574a4297c9f0f7017',
    signatures: [ { V: '0x4e43', R: '0x3bee4...', S: '0x101a1...' } ],
    status: '0x1',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionHash: '0x72ea9179350cf2943e966eaf1e1e651d4e1b50ead4b6e6a574a4297c9f0f7017',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000',
}

// Using event emitter
> caver.rpc.klay.sendRawTransaction('0x08f88...').on('transactionHash', h => {...}).on('receipt', r => {...}).on('error', console.error)
```

## Xem [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) để biết thêm thông tin chi tiết.

```javascript
caver.rpc.klay.sendTransaction(transaction [, callback])
```

`lỗi` trả về `Lỗi`: Được kích hoạt nếu có lỗi phát sinh trong quá trình gửi.

Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

**Ví dụ** caver.rpc.klay.sendTransaction <a href="#caver-rpc-klay-sendtransaction" id="caver-rpc-klay-sendtransaction"></a>

Ký giao dịch với tư cách là `người gửi` giao dịch bằng "khóa riêng tư của tài khoản đã nhập" trong Nút Klaytn của bạn và gửi giao dịch đến Klaytn.

| Để biết thêm thông tin về từng loại giao dịch, hãy tham khảo [Giao dịch](../caver-transaction/caver-transaction.md#class). | **LƯU Ý**: API này cung cấp hàm để ký một giao dịch bằng [tài khoản đã nhập](../../../../json-rpc/personal.md#personal_importrawkey) trong nút Klaytn của bạn. | Tài khoản đã nhập trong nút của bạn phải được [mở khóa](../../../../json-rpc/personal.md#personal_unlockaccount) để ký giao dịch. |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Tham số**                                                                                                                | Tên                                                                                                                                                            | Loại                                                                                                                             |
| Mô tả                                                                                                                      | giao dịch                                                                                                                                                      | đối tượng                                                                                                                         |

Một phiên bản của một giao dịch được gửi đến Klaytn.

| callback                                                                                                                          | hàm                      |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. | **Giá trị trả về** Loại |

Mô tả

- PromiEvent
- Trình phát sự kiện kết hợp promise. Bộ phát này sẽ được xử lý khi có biên lai giao dịch.
- Đối với PromiEvent, sẽ có các sự kiện sau đây: `transactionHash` trả về `chuỗi`: Được kích hoạt ngay sau khi gửi giao dịch và có hàm băm giao dịch.

`biên lai` trả về `đối tượng`: Được kích hoạt khi có sẵn biên lai giao dịch.

```javascript
> const tx = caver.transaction.valueTransfer.create({
    from: '0x{address in hex}', // The address of imported account in Klaytn Node
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    value: caver.utils.convertToPeb(10, 'KLAY'),
    gas: 25000
})
// Using promise
> caver.rpc.klay.sendTransaction(tx).then(console.log)
{
    blockHash: '0xbfce3abcad0204e363ee9e3b94d15a20c1a4b86ac6cf51dd74db2226ab5b9e99',
    blockNumber: '0x1d18',
    contractAddress: null,
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    gas: '0x61a8',
    gasPrice: '0x5d21dba00',
    gasUsed: '0x5208',
    logs: [],
    logsBloom: '0x00000...',
    nonce: '0x13',
    senderTxHash: '0x2c001a776290ac55ac53a82a70a0b71e07c985fe57fd9d8e422b919d4317002e',
    signatures: [ { V: '0x4e43', R: '0xeac91...', S: '0xa0aa4...' } ],
    status: '0x1',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionHash: '0x2c001a776290ac55ac53a82a70a0b71e07c985fe57fd9d8e422b919d4317002e',
    transactionIndex: '0x0',
    type: 'TxTypeValueTransfer',
    typeInt: 8,
    value: '0x8ac7230489e80000',
}

// Using event emitter
> caver.rpc.klay.sendTransaction(tx).on('transactionHash', h => {...}).on('receipt', r => {...}).on('error', console.error)
```

## Xem [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) để biết thêm thông tin chi tiết.

```javascript
caver.rpc.klay.sendTransactionAsFeePayer(transaction [, callback])
```

`lỗi` trả về `Lỗi`: Được kích hoạt nếu có lỗi phát sinh trong quá trình gửi.

Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

**Ví dụ**

caver.rpc.klay.sendTransactionAsFeePayer <a href="#caver-rpc-klay-sendtransactionasfeepayer" id="caver-rpc-klay-sendtransactionasfeepayer"></a> Ký giao dịch ủy thác phí với tư cách là `người trả phí` giao dịch bằng `khóa riêng tư của tài khoản đã nhập` trong Nút Klaytn của bạn và gửi giao dịch đến Klaytn.

Trước khi sử dụng `sendTransaction` với tư cách người trả phí, người gửi giao dịch phải ký bằng (các) chữ ký hợp lệ và `số dùng một lần` phải được xác định.

| Để biết thêm thông tin về từng loại giao dịch, hãy tham khảo [Giao dịch](../caver-transaction/caver-transaction.md#class). | **LƯU Ý**: API này cung cấp hàm để ký một giao dịch bằng [tài khoản đã nhập](../../../../json-rpc/personal.md#personal_importrawkey) trong nút Klaytn của bạn. | Tài khoản đã nhập trong nút của bạn phải được [mở khóa](../../../../json-rpc/personal.md#personal_unlockaccount) để ký giao dịch. |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Tham số**                                                                                                                | Tên                                                                                                                                                            | Loại                                                                                                                             |
| Mô tả                                                                                                                      | giao dịch                                                                                                                                                      | đối tượng                                                                                                                         |

Một phiên bản giao dịch có ủy thác phí để gửi đến Klaytn.

| callback                                                                                                                          | hàm                      |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. | **Giá trị trả về** Loại |

Mô tả

- PromiEvent
- Trình phát sự kiện kết hợp promise. Bộ phát này sẽ được xử lý khi có biên lai giao dịch.
- Đối với PromiEvent, sẽ có các sự kiện sau đây: `transactionHash` trả về `chuỗi`: Được kích hoạt ngay sau khi gửi giao dịch và có hàm băm giao dịch.

`biên lai` trả về `đối tượng`: Được kích hoạt khi có sẵn biên lai giao dịch.

```javascript
> const tx = caver.transaction.feeDelegatedValueTransfer.create({
    from: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 50000,
    nonce: 1,
    signatures: [
        [
            '0x4e43',
            '0x873e9db6d055596a8f79a6a2761bfb464cbc1b352ac1ce53770fc23bb16d929c',
            '0x15d206781cc8ac9ffb02c08545cb832e1f1700b46b886d72bb0cfeb4a230871e',
        ],
    ],
    feePayer: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e', // The address of imported account in Klaytn Node
})
// Using promise
> caver.rpc.klay.signTransaction(tx).then(console.log)
{
    blockHash: '0x3be2f5b17eb35d0cf83b493ddfaa96d44cba40d1839778b4a8267f4c0aa61449',
    blockNumber: '0x23ef',
    contractAddress: null,
    feePayer: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
    feePayerSignatures: [ { V: '0x4e43', R: '0x7a9ec...', S: '0x22be3...' } ],
    from: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    gas: '0xc350',
    gasPrice: '0x5d21dba00',
    gasUsed: '0x7918',
    logs: [],
    logsBloom: '0x00000...',
    nonce: '0x1',
    senderTxHash: '0x71ca2e169a9c6c7b5bfdfa68e584314978f2abef955f8a2666325b860e2c9df5',
    signatures: [ { V: '0x4e43', R: '0x873e9...', S: '0x15d20...' } ],
    status: '0x1',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    transactionHash: '0x04fa82ce10168e05db04a235f025e5b8bc004ab36710798a512fab75a95bfc52',
    transactionIndex: '0x0',
    type: 'TxTypeFeeDelegatedValueTransfer',
    typeInt: 9,
    value: '0xde0b6b3a7640000',
}

// Using event emitter
> caver.rpc.klay.sendTransactionAsFeePayer(tx).on('transactionHash', h => {...}).on('receipt', r => {...}).on('error', console.error)
```

## Xem [caver.rpc.klay.getTransactionReceipt](#caver-rpc-klay-gettransactionreceipt) để biết thêm thông tin chi tiết.

```javascript
caver.rpc.klay.signTransaction(transaction [, callback])
```

`lỗi` trả về `Lỗi`: Được kích hoạt nếu có lỗi phát sinh trong quá trình gửi.

Khi xảy ra lỗi hết gas, tham số thứ hai sẽ là biên lai.

**Ví dụ** caver.rpc.klay.signTransaction <a href="#caver-rpc-klay-signtransaction" id="caver-rpc-klay-signtransaction"></a>

Ký giao dịch với tư cách là người gửi giao dịch bằng "khóa riêng tư của tài khoản đã nhập" trong Nút Klaytn của bạn.

| Để biết thêm thông tin về từng loại giao dịch, hãy tham khảo [Giao dịch](../caver-transaction/caver-transaction.md#class). | **LƯU Ý**: API này cung cấp hàm để ký một giao dịch bằng [tài khoản đã nhập](../../../../json-rpc/personal.md#personal_importrawkey) trong nút Klaytn của bạn. | Tài khoản đã nhập trong nút của bạn phải được [mở khóa](../../../../json-rpc/personal.md#personal_unlockaccount) để ký giao dịch. |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Tham số**                                                                                                                | Tên                                                                                                                                                            | Loại                                                                                                                             |
| Mô tả                                                                                                                      | giao dịch                                                                                                                                                      | đối tượng                                                                                                                         |

Phiên bản của một giao dịch dùng để ký.

callback

| hàm                                                                   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. | **Giá trị trả về** |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `Promise` trả về `đối tượng` - Một đối tượng bao gồm giao dịch đã ký: | Tên                                                                                                                               | Loại              |
| Mô tả                                                                 | raw                                                                                                                               | chuỗi              |

Giao dịch đã ký được mã hóa RLP.

```javascript
> const tx = caver.transaction.valueTransfer.create({
    from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e', // The address of imported account in Klaytn Node
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    value: caver.utils.toPeb(10, 'KLAY'),
    gas: 25000
})

> caver.rpc.klay.signTransaction(tx).then(console.log)
{
    raw: '0x08f88...',
    tx: {
        typeInt: 8,
        type: 'TxTypeValueTransfer',
        nonce: '0x16',
        gasPrice: '0x5d21dba00',
        gas: '0x61a8',
        to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
        value: '0x8ac7230489e80000',
        from: '0x3af68ad73f45a1e7686e8fcd23e910625ef2186e',
        signatures: [ { V: '0x4e43', R: '0x52d64...', S: '0x1371e...' } ],
        hash: '0xe816952761caccf86ab281a00e10a36da6579c425041906a235f10959b2960b1'
    }
}
```

## tx

```javascript
caver.rpc.klay.signTransactionAsFeePayer(transaction [, callback])
```

đối tượng

Đối tượng giao dịch bao gồm cả chữ ký của người gửi.

**Ví dụ** caver.rpc.klay.signTransactionAsFeePayer <a href="#caver-rpc-klay-signtransactionasfeepayer" id="caver-rpc-klay-signtransactionasfeepayer"></a>

Ký giao dịch với tư cách là người trả phí giao dịch bằng "khóa riêng tư của tài khoản đã nhập" trong Nút Klaytn của bạn.

| Để biết thêm thông tin về từng loại giao dịch, hãy tham khảo [Giao dịch](../caver-transaction/caver-transaction.md#class). | **LƯU Ý**: API này cung cấp hàm để ký một giao dịch bằng [tài khoản đã nhập](../../../../json-rpc/personal.md#personal_importrawkey) trong nút Klaytn của bạn. | Tài khoản đã nhập trong nút của bạn phải được [mở khóa](../../../../json-rpc/personal.md#personal_unlockaccount) để ký giao dịch. |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Tham số**                                                                                                                | Tên                                                                                                                                                            | type                                                                                                                              |
| Mô tả                                                                                                                      | giao dịch                                                                                                                                                      | đối tượng                                                                                                                         |

Phiên bản của một giao dịch dùng để ký.

callback

| hàm                                                                   | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. | **Giá trị trả về** |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `Promise` trả về `đối tượng` - Một đối tượng bao gồm giao dịch đã ký: | Tên                                                                                                                               | Loại              |
| Mô tả                                                                 | raw                                                                                                                               | chuỗi              |

Giao dịch đã ký được mã hóa RLP.

```javascript
> const tx = caver.transaction.feeDelegatedValueTransfer.craete({
    from: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
    value: caver.utils.toPeb(1, 'KLAY'),
    gas: 50000,
    nonce: 0,
    signatures: [
        [
            '0x4e43',
            '0xe87291c7311534c3e451c6f6b8cafdf7454970f98504e9af6cfdeb29757ba458',
            '0x26dcf6f3702110230b806628165e28771e1152ea864ee4c69557faccd4d3dae8',
        ],
    ],
    feePayer: '0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122', // The address of imported account in Klaytn Node
})

> caver.rpc.klay.signTransactionAsFeePayer(tx).then(console.log)
{
    raw: '0x09f8e...',
    tx: {
        typeInt: 9,
        type: 'TxTypeFeeDelegatedValueTransfer',
        nonce: '0x0',
        gasPrice: '0x5d21dba00',
        gas: '0xc350',
        to: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
        value: '0xde0b6b3a7640000',
        from: '0x1637a2fc3ef9a391b2d8411854167ab3912a2fcc',
        signatures: [ { V: '0x4e43', R: '0xe8729...', S: '0x26dcf...' } ],
        feePayer: '0xe8b3a6ef12f9506e1df9fd445f9bb4488a482122',
        feePayerSignatures: [ { V: '0x4e43', R: '0x5cce8...', S: '0x32907...' } ],
        hash: '0xdb89281f3a44a2370d73b389bbcfb9a597f558219145cf269a0b1480f8e778cc',
    },
}
```

## tx

```javascript
caver.rpc.klay.getDecodedAnchoringTransactionByHash(transactionHash [, callback])
```

đối tượng

Đối tượng giao dịch để ký với tư cách là người trả phí.

| **Ví dụ** | caver.rpc.klay.getDecodedAnchoringTransactionByHash <a href="#caver-rpc-klay-getdecodedanchoringtransactionbyhash" id="caver-rpc-klay-getdecodedanchoringtransactionbyhash"></a> | Trả về dữ liệu neo đã được giải mã trong giao dịch cho hàm băm giao dịch đã cho. |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Tham số** | Tên                                                                                                                                                                              | Loại                                                                            |
| Mô tả       | transactionHash                                                                                                                                                                  | chuỗi                                                                            |

Hàm băm của giao dịch.

callback

| hàm                                                                            | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. | **Giá trị trả về**                               |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `Promise` trả về `đối tượng` - Một đối tượng bao gồm dữ liệu neo được giải mã: | Tên                                                                                                                               | Loại                                            |
| Mô tả                                                                          | BlockHash                                                                                                                         | chuỗi                                            |
| Hàm băm của khối chuỗi con mà giao dịch neo này đã được thực hiện.             | BlockNumber                                                                                                                       | số                                               |
| Số khối chuỗi con mà giao dịch neo này đã được thực hiện.                      | ParentHash                                                                                                                        | chuỗi                                            |
| Hàm băm của khối cha mẹ.                                                       | TxHash                                                                                                                            | chuỗi                                            |
| Gốc của trie giao dịch trong khối.                                             | StateRootHash                                                                                                                     | chuỗi                                            |
| Gốc của trie trạng thái cuối trong khối.                                       | ReceiptHash                                                                                                                       | chuỗi Gốc của trie biên lai giao dịch của khối.  |
| BlockCount                                                                     | số                                                                                                                                | Số khối được tạo trong khoảng thời gian neo này. |

Trong hầu hết các trường hợp, số này bằng với `SC_TX_PERIOD` của chuỗi con ngoại trừ trường hợp giao dịch này là tx neo đầu tiên sau khi bật tính năng neo.

```javascript
> caver.rpc.klay.getDecodedAnchoringTransactionByHash('0x59831a092a9f0b48018848f5dd88a457efdbfabec13ea07cd769686741a1cd13').then(console.log)
{
    BlockCount: 86400,
    BlockHash: '0x3c44b2ed491be7264b9f6819c67427642447716576b6702a72f6fdc40c41abde',
    BlockNumber: 23414400,
    ParentHash: '0x735468bb091a296c45553c8f67a8d0d39ac428cbe692b1b6c494d336351477f3',
    ReceiptHash: '0x6a908d319b6f6ab4414da1afd6763d70ecc8037ec167aa8a942bc0c2af12b4ab',
    StateRootHash: '0x4a664227fb2508a2952a4695cabb88b433522af2a5dee50cc6dd4036d85bf1d3',
    TxCount: 50895,
    TxHash: '0x753a85d2c53fc34cb9108301f1cf8ff8d78dde13d42d80958e47e388008319cd',
}
```

## TxCount

```javascript
caver.rpc.klay.getChainId([callback])
```

số

Số lượng giao dịch được tạo trong chuỗi con trong khoảng thời gian neo này.

| **Ví dụ** | caver.rpc.klay.getChainId <a href="#caver-rpc-klay-getchainid" id="caver-rpc-klay-getchainid"></a> | Trả về mã chuỗi của chuỗi. |
| ----------- | -------------------------------------------------------------------------------------------------- | -------------------------- |
| **Tham số** | Tên                                                                                                | Loại                      |

Mô tả

callback

| hàm                | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Giá trị trả về** | `Promise` trả về `chuỗi`                                                                                                          |

Loại

```javascript
> caver.rpc.klay.getChainId().then(console.log)
0x2710
```

## Mô tả

```javascript
caver.rpc.klay.getClientVersion([callback])
```

chuỗi

ID chuỗi của chuỗi.

| **Ví dụ** | caver.rpc.klay.getClientVersion <a href="#caver-rpc-klay-getclientversion" id="caver-rpc-klay-getclientversion"></a> | Trả về phiên bản máy khách hiện tại của nút Klaytn. |
| ----------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| **Tham số** | Tên                                                                                                                  | Loại                                               |

Mô tả

callback

| hàm                | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Giá trị trả về** | `Promise` trả về `chuỗi`                                                                                                          |

Loại

```javascript
> caver.rpc.klay.getClientVersion().then(console.log)
Klaytn/v1.3.0+144494d2aa/linux-amd64/go1.13.1
```

## Mô tả

```javascript
caver.rpc.klay.getGasPrice([callback])
```

chuỗi

Phiên bản máy khách hiện tại của nút Klaytn.

| **Ví dụ** | caver.rpc.klay.getGasPrice <a href="#caver-rpc-klay-getgasprice" id="caver-rpc-klay-getgasprice"></a> | Trả về mức giá hiện tại cho mỗi gas tính bằng peb. |
| ----------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **Tham số** | Tên                                                                                                   | Loại                                              |

Mô tả

callback

| hàm                | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Giá trị trả về** | `Promise` trả về `chuỗi`                                                                                                          |

Loại

```javascript
> caver.rpc.klay.getGasPrice().then(console.log)
0x5d21dba00
```

## Mô tả

```javascript
caver.rpc.klay.getGasPriceAt([blockNumber] [, callback])
```

chuỗi

Giá gas hiện tại tính bằng peb.

| **Ví dụ** | caver.rpc.klay.getGasPriceAt <a href="#caver-rpc-klay-getgaspriceat" id="caver-rpc-klay-getgaspriceat"></a> | Trả về giá hiện tại cho mỗi gas tính bằng peb cho khối đã cho. |
| ----------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Tham số** | Tên                                                                                                         | Loại Mô tả                                                    |
| blockNumber | số                                                                                                          | (tùy chọn) Số khối.                         |

Nếu bị bỏ qua, hệ thống sẽ trả về đơn giá mới nhất.

callback

| hàm                | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Giá trị trả về** | `Promise` trả về `chuỗi`                                                                                                          |

Loại

```javascript
> caver.rpc.klay.getGasPriceAt().then(console.log)
0x5d21dba00
```

## Mô tả

```javascript
caver.rpc.klay.getMaxPriorityFeePerGas([callback])
```

chuỗi Giá gas hiện tại tính bằng peb.

**Ví dụ**

| caver.rpc.klay.getMaxPriorityFeePerGas <a href="#caver-rpc-klay-getmaxpriorityfeepergas" id="caver-rpc-klay-getmaxpriorityfeepergas"></a> | Trả về đề xuất giới hạn tối đa phí gas trả thêm cho giao dịch có mức phí thay đổi tính bằng peb. | Vì Klaytn có giá gas cố định, nó sẽ trả về giá gas do Klaytn đặt. |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| **Tham số**                                                                                                                               | Tên                                                                                              | Loại                                                             |

Mô tả

callback

| hàm                | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Giá trị trả về** | `Promise` trả về `chuỗi`                                                                                                          |

Loại

```javascript
> caver.rpc.klay.getMaxPriorityFeePerGas().then(console.log)
0x5d21dba00
```

## Mô tả

```javascript
caver.rpc.klay.getLowerBoundGasPrice([callback])
```

chuỗi

Đề xuất về giới hạn tối đa phí gas trả thêm tính theo peb.

| **Ví dụ** | caver.rpc.klay.getLowerBoundGasPrice <a href="#caver-rpc-klay-getlowerboundgasprice" id="caver-rpc-klay-getlowerboundgasprice"></a> | Trả về giá gas giới hạn dưới tính bằng peb. |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| **Tham số** | Tên                                                                                                                                 | Loại                                       |

Mô tả

callback

| hàm                | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Giá trị trả về** | `Promise` trả về `chuỗi`                                                                                                          |

Loại

```javascript
> caver.rpc.klay.getLowerBoundGasPrice().then(console.log)
0x5d21dba00
```

## Mô tả

```javascript
caver.rpc.klay.getUpperBoundGasPrice([callback])
```

chuỗi

Giá gas giới hạn dưới tính bằng peb.

| **Ví dụ** | caver.rpc.klay.getUpperBoundGasPrice <a href="#caver-rpc-klay-getupperboundgasprice" id="caver-rpc-klay-getupperboundgasprice"></a> | Trả về giá gas giới hạn trên tính bằng peb. |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| **Tham số** | Tên                                                                                                                                 | Loại                                       |

Mô tả

callback

| hàm                | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Giá trị trả về** | `Promise` trả về `chuỗi`                                                                                                          |

Loại

```javascript
> caver.rpc.klay.getUpperBoundGasPrice().then(console.log)
0xae9f7bcc00
```

## Mô tả

```javascript
caver.rpc.klay.getFeeHistory(blockCount, lastBlock, rewardPercentiles [, callback])
```

chuỗi Giá gas giới hạn trên bằng peb.

**Ví dụ**

| caver.rpc.klay.getFeeHistory <a href="#caver-rpc-klay-getfeehistory" id="caver-rpc-klay-getfeehistory"></a> | Trả về lịch sử phí cho phạm vi khối được trả về. | Đây có thể là một phần phụ của phạm vi được yêu cầu nếu không có sẵn tất cả các khối.                                                                                                         |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tham số**                                                                                                 | Tên                                              | Loại Mô tả blockCount                                                                                                                                                                        |
| số\|BigNumber\|BN\|string                                                                                   | Số khối trong phạm vi được yêu cầu.              | Có thể yêu cầu từ 1 đến 1024 khối trong một yêu cầu truy vấn duy nhất.                                                                                                                        |
| Nếu không có đủ các khối cần truy vấn, thì số lượng khối trả về có thể ít hơn số lượng khối yêu cầu.        | lastBlock                                        | số\|BigNumber\|BN\|string Khối số cao nhất (hoặc chuỗi thẻ khối) của phạm vi được yêu cầu.                                                                                 |
| rewardPercentiles                                                                                           | Mảng                                             | Một danh sách các giá trị phần trăm tăng dần đơn điệu để lấy mẫu từ phí ưu tiên hiệu quả của mỗi khối cho mỗi loại gas theo thứ tự tăng dần, được tính khối lượng theo loại gas được sử dụng. |

(Ví dụ, `['0', '25', '50', '75', '100']` hoặc `['0', '0.5', '1', '1.5', '3', '80']`)

callback

| hàm                                                               | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. | **Giá trị trả về**                                                                                                         |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `Promise` trả về `đối tượng` - Một đối tượng bao gồm lịch sử phí: | Tên                                                                                                                               | Loại                                                                                                                      |
| Mô tả                                                             | oldestBlock                                                                                                                       | chuỗi                                                                                                                      |
| Khối số thấp nhất của phạm vi được trả về.                        | phần thưởng                                                                                                                       | Mảng Một mảng hai chiều của các khoản phí ưu tiên hiệu quả cho mỗi loại gas ở phần trăm khối được yêu cầu. baseFeePerGas   |
| Mảng                                                              | Mảng phí cơ bản của khối trên mỗi gas.                                                                                            | Mảng này bao gồm khối tiếp theo sau khối mới nhất trong khoảng trả về, vì giá trị này có thể được suy ra từ khối mới nhất. |

Trả về các giá trị 0 cho các khối trước EIP-1559.

```javascript
> caver.rpc.klay.getFeeHistory(3, 'latest', [0.1, 0.2, 0.3]).then(console.log)
{
  oldestBlock: '0xbb701',
  reward: [
    [ '0x0', '0x0', '0x0' ],
    [ '0x5d21dba00', '0x5d21dba00', '0x5d21dba00' ],
    [ '0x0', '0x0', '0x0' ]
  ],
  baseFeePerGas: [ '0x0', '0x0', '0x0', '0x0' ],
  gasUsedRatio: [ 0, 2.1000000000021e-8, 0 ]
}
```

## gasUsedRatio

```javascript
caver.rpc.klay.createAccessList(txCallObject [, callback])
```

Mảng Một mảng gasUsed/gasLimit trong khối. **Ví dụ** caver.rpc.klay.createAccessList <a href="#caver-rpc-klay-createaccesslist" id="caver-rpc-klay-createaccesslist"></a> Phương thức sẽ này tạo một accessList dựa trên một Giao dịch nhất định.

accessList chứa tất cả các vị trí lưu trữ và địa chỉ được đọc và ghi bởi giao dịch, ngoại trừ tài khoản người gửi và các phần biên dịch trước.

| Phương thức này sử dụng cùng một đối tượng lệnh gọi giao dịch và đối tượng blockNumberOrTag như `caver.rpc.klay.call`. | Một accessList có thể được sử dụng để giải phóng các hợp đồng bị kẹt không thể truy cập được do chi phí gas tăng. | Việc thêm một accessList vào giao dịch của bạn không nhất thiết dẫn đến việc sử dụng gas thấp hơn so với giao dịch không có danh sách truy cập. |
| ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tham số**                                                                                                            | Tên                                                                                                               | Loại Mô tả                                                                                                                                     |
| callObject                                                                                                             | đối tượng                                                                                                         | Đối tượng lệnh gọi giao dịch. Vui lòng xem các tham số [caver.rpc.klay.call](#caver-rpc-klay-call).                                             |
| blockParameter                                                                                                         | số\|BigNumber\|BN\|chuỗi                                                                                          | (tùy chọn) Số khối, blockhash hoặc chuỗi thẻ khối (`mới nhất` hoặc `cũ nhất`).                            |

Nếu bị bỏ qua, chuỗi `mới nhất` sẽ được sử dụng.

callback

| hàm                                                                      | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. | **Giá trị trả về**                                                                                                         |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `Promise` trả về `đối tượng` - Một đối tượng bao gồm danh sách truy cập: | Tên                                                                                                                               | Loại                                                                                                                      |
| Mô tả                                                                    | oldestBlock                                                                                                                       | chuỗi                                                                                                                      |
| Khối số thấp nhất của phạm vi được trả về.                               | phần thưởng                                                                                                                       | Mảng Một mảng hai chiều của các khoản phí ưu tiên hiệu quả cho mỗi loại gas ở phần trăm khối được yêu cầu. baseFeePerGas   |
| Mảng                                                                     | Mảng phí cơ bản của khối trên mỗi gas.                                                                                            | Mảng này bao gồm khối tiếp theo sau khối mới nhất trong khoảng trả về, vì giá trị này có thể được suy ra từ khối mới nhất. |

Trả về các giá trị 0 cho các khối trước EIP-1559.

```javascript
> caver.rpc.klay.createAccessList({
        from: '0x3bc5885c2941c5cda454bdb4a8c88aa7f248e312',
        data: '0x20965255',
        gasPrice: '0x3b9aca00',
        gas: '0x3d0900',
        to: '0x00f5f5f3a25f142fafd0af24a754fafa340f32c7'
    }, 'latest').then(console.log)
{ accessList: [], gasUsed: '0x0' }
```

## gasUsedRatio

```javascript
caver.rpc.klay.isParallelDBWrite([callback])
```

Mảng

Một mảng gasUsed/gasLimit trong khối.

| **Ví dụ** | caver.rpc.klay.isParallelDBWrite <a href="#caver-rpc-klay-isparalleldbwrite" id="caver-rpc-klay-isparalleldbwrite"></a> | Trả về giá trị `true` nếu nút đang ghi dữ liệu chuỗi khối theo một phương pháp song song. |
| ----------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Tham số** | Tên                                                                                                                     | Loại                                                                                     |

Mô tả

callback

| hàm                | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Giá trị trả về** | `Promise` trả về `boolean` Loại                                                                                                  |

Mô tả

```javascript
> caver.rpc.klay.isParallelDBWrite().then(console.log)
true
```

## boolean

```javascript
caver.rpc.klay.isSenderTxHashIndexingEnabled([callback])
```

Giá trị `true` có nghĩa là nút đang ghi dữ liệu chuỗi khối theo một phương pháp song song.

Trả về giá trị `false` nếu nút đang ghi dữ liệu theo chuỗi.

| **Ví dụ** | caver.rpc.klay.isSenderTxHashIndexingEnabled <a href="#caver-rpc-klay-issendertxhashindexingenabled" id="caver-rpc-klay-issendertxhashindexingenabled"></a> | Trả về giá trị `true` nếu nút đang lập chỉ mục hàm băm giao dịch của người gửi thành thông tin ánh xạ hàm băm giao dịch. |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Tham số** | Tên                                                                                                                                                         | Loại                                                                                                                    |

Mô tả

callback

| hàm                | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Giá trị trả về** | `Promise` trả về `boolean`                                                                                                        |

Loại

```javascript
> caver.rpc.klay.isSenderTxHashIndexingEnabled().then(console.log)
true
```

## Mô tả

```javascript
caver.rpc.klay.getProtocolVersion([callback])
```

boolean Giá trị `true` có nghĩa là nút đang lập chỉ mục hàm băm giao dịch của người gửi thành thông tin ánh xạ hàm băm giao dịch.

**Ví dụ**

| caver.rpc.klay.getProtocolVersion <a href="#caver-rpc-klay-getprotocolversion" id="caver-rpc-klay-getprotocolversion"></a> | Trả về phiên bản giao thức Klaytn của nút. | Phiên bản hiện tại (kể từ v1.9.0) của Cypress/Baobab là `istanbul/65`. |
| -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------- |
| **Tham số**                                                                                                                | Tên                                        | Loại                                                                                     |

Mô tả

callback

| hàm                | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Giá trị trả về** | `Promise` trả về `chuỗi`                                                                                                          |

Loại

```javascript
> caver.rpc.klay.getProtocolVersion().then(console.log)
0x40
```

## Mô tả

```javascript
caver.rpc.klay.getRewardbase([callback])
```

chuỗi Phiên bản giao thức Klaytn của nút. **Ví dụ**

caver.rpc.klay.getRewardbase <a href="#caver-rpc-klay-getrewardbase" id="caver-rpc-klay-getrewardbase"></a>

| Trả về địa chỉ ví rewardbase của nút hiện tại. | Rewardbase là địa chỉ của tài khoản nơi phần thưởng khối được chuyển đến. | Chỉ yêu cầu đối với CN. |
| ---------------------------------------------- | ------------------------------------------------------------------------- | ----------------------- |
| **Tham số**                                    | Tên                                                                       | Loại                   |

Mô tả

callback

| hàm                | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Giá trị trả về** | `Promise` trả về `chuỗi`                                                                                                          |

Loại

```javascript
> caver.rpc.klay.getRewardbase().then(console.log)
0xa9b3a93b2a9fa3fdcc31addd240b04bf8db3414c
```

## Mô tả

```javascript
caver.rpc.klay.getFilterChanges(filterId [, callback])
```

chuỗi

Địa chỉ rewardbase.

| **Ví dụ** | caver.rpc.klay.getFilterChanges <a href="#caver-rpc-klay-getfilterchanges" id="caver-rpc-klay-getfilterchanges"></a> | Phương thức truy vấn lần lượt đối với bộ lọc, trả về một mảng các bản ghi kể từ lần truy vấn trước đó. |
| ----------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Tham số** | Tên                                                                                                                  | Loại                                                                                                  |
| Mô tả       | bộ lọcId                                                                                                             | Chuỗi                                                                                                  |

Id bộ lọc.

callback

- hàm
- (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.
- **Giá trị trả về**

| `Promise` trả về `Mảng` - Mảng các đối tượng bản ghi hoặc mảng trống nếu không có thay đổi kể từ lần truy vấn cuối cùng.             | Đối với các bộ lọc được tạo bằng [caver.rpc.klay.newBlockFilter](#caver-rpc-klay-newblockfilter), kết quả trả về là các hàm băm khối, _ví dụ_: `["0x3454645634534..."]`. | Đối với các bộ lọc được tạo bằng [caver.rpc.klay.newPendingTransactionFilter](#caver-rpc-klay-newpendingtransactionfilter), kết quả trả về là các giá trị băm giao dịch, _ví dụ_: `["0x6345343454645..."]`. |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Đối với các bộ lọc được tạo bằng [caver.rpc.klay.newFilter](#caver-rpc-klay-newfilter), bản ghi là các đối tượng có tham số như sau: | Tên                                                                                                                                                                      | Loại                                                                                                                                                                                                       |
| Mô tả                                                                                                                                | logIndex                                                                                                                                                                 | chuỗi                                                                                                                                                                                                       |
| Vị trí chỉ mục bản ghi trong khối.                                                                                                   | transactionIndex                                                                                                                                                         | chuỗi Vị trí chỉ mục của các giao dịch nơi bản ghi này được tạo.                                                                                                                                            |
| transactionHash                                                                                                                      | chuỗi                                                                                                                                                                    | Hàm băm của giao dịch mà bản ghi này được tạo từ đó. Giá trị là `null` nếu giao dịch đang chờ xử lý.                                                                                                        |
| blockHash                                                                                                                            | chuỗi                                                                                                                                                                    | Hàm băm của khối chứa bản ghi này. Giá trị là `null` nếu giao dịch đang chờ xử lý.                                                                                                                          |
| blockNumber                                                                                                                          | chuỗi                                                                                                                                                                    | Số khối chứa bản ghi này.                                                                                                                                                                                   |
| Giá trị là `null` nếu giao dịch đang chờ xử lý.                                                                                      | address                                                                                                                                                                  | chuỗi                                                                                                                                                                                                       |
| Địa chỉ mà bản ghi này được khởi tạo.                                                                                                | data                                                                                                                                                                     | chuỗi Chứa các đối số không được lập chỉ mục của bản ghi.                                                                                                                                                   |

chủ đề

```javascript
> caver.rpc.klay.getFilterChanges('0xafb8e49bbcba9d61a3c616a3a312533e').then(console.log)
[ 
    { 
        address: '0x71e503935b7816757AA0314d4E7354dab9D39162',
        topics: [ '0xe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9' ],
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        blockNumber: '0xdc5',
        transactionHash: '0x1b28e2c723e45a0d8978890598903f36a74397c9cea8531dc9762c39483e417f',
        transactionIndex: '0x0',
        blockHash: '0xb7f0bdaba93d3baaa01a5c24517da443207f774e0202f02c298e8e997a540b3d',
        logIndex: '0x0'
    } 
]
```

## Mảng

```javascript
caver.rpc.klay.getFilterLogs(filterId [, callback])
```

Mảng gồm 0 đến 4 DỮ LIỆU 32 byte của các đối số được lập chỉ mục trong bản ghi. (Trong Solidity: Chủ đề đầu tiên là hàm băm chữ ký của sự kiện (_ví dụ_: `Deposit(address,bytes32,uint256)`), trừ khi bạn khai báo sự kiện với giá trị chỉ định `anonymous`.).

**Ví dụ**

caver.rpc.klay.getFilterLogs <a href="#caver-rpc-klay-getfilterlogs" id="caver-rpc-klay-getfilterlogs"></a>

| Trả về một mảng gồm tất cả các bản ghi khớp với bộ lọc bằng id cho trước. | Đối tượng bộ lọc phải được lấy bằng cách sử dụng [newFilter](#caver-rpc-klay-newfilter). | Lưu ý rằng id bộ lọc được trả về bởi các hàm tạo bộ lọc khác như [caver.rpc.klay.newBlockFilter](#caver-rpc-klay-newblockfilter) hoặc [caver.rpc.klay.newPendingTransactionFilter](#caver-rpc-klay-newpendingtransactionfilter) không thể được sử dụng với hàm này. |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tham số**                                                               | Tên                                                                                      | Loại                                                                                                                                                                                                                                                               |
| Mô tả                                                                     | bộ lọcId                                                                                 | chuỗi                                                                                                                                                                                                                                                               |

Id bộ lọc.

callback

hàm

```javascript
> caver.rpc.klay.getFilterLogs('0xcac08a7fc32fc625a519644187e9f690').then(console.log);
[
    {
        address: '0x55384B52a9E5091B6012717197887dd3B5779Df3',
        topics: [ '0xe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9' ],
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        blockNumber: '0x1c31',
        transactionHash: '0xa7436c54e47dafbce696de65f6e890c96ac22c236f50ca1be28b9b568034c3b3',
        transactionIndex: '0x0',
        blockHash: '0xe4f27c524dacfaaccb36735deccee69b3d6c315e969779784c36bb8e14b89e01',
        logIndex: '0x0'
    }
]
```

## (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.

```javascript
caver.rpc.klay.getLogs(options [, callback])
```

**Giá trị trả về**

Xem [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges)

| **Ví dụ** | caver.rpc.klay.getLogs <a href="#caver-rpc-klay-getlogs" id="caver-rpc-klay-getlogs"></a> | Trả về một mảng gồm tất cả bản ghi khớp với một đối tượng bộ lọc đã cho. |
| ----------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Tham số** | Tên                                                                                       | Loại Mô tả                                                              |
| tùy chọn    | đối tượng                                                                                 | Các tùy chọn bộ lọc.                                                     |

Xem bảng dưới đây để tìm phần thông tin mô tả.

| callback                                                                     | hàm                                                                         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                               |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Đối tượng tùy chọn có thể chứa các thông tin sau:                            | Tên                                                                         | Loại Mô tả fromBlock                                                                                                                                                           |
| số \| chuỗi                                                                  | (tùy chọn) Số khối của khối cũ nhất dùng để lấy bản ghi. | (`"mới nhất"` nghĩa là khối gần đây nhất.) Giá trị mặc định là `"mới nhất"`. toBlock số \| chuỗi                                                             |
| (tùy chọn) Số khối của khối mới nhất dùng để lấy bản ghi. | (`"mới nhất"` nghĩa là khối gần đây nhất.).              | Giá trị mặc định là `"mới nhất"`. address                                                                                                                                       |
| chuỗi \| Mảng                                                                | (tùy chọn) Địa chỉ hoặc danh sách các địa chỉ.           | Hàm sẽ chỉ trả về các bản ghi liên quan đến (các) tài khoản cụ thể. chủ đề Mảng (tùy chọn) Mảng các giá trị phải xuất hiện trong bản ghi. |

Quan trọng là thứ tự.

Nếu bạn muốn loại bỏ các chủ đề, hãy sử dụng `null`, _vd_: `[null, '0x12...']`.

Bạn có thể truyền một mảng của mỗi chủ đề với các tùy chọn cho chủ đề đó _ví dụ:_ `[null, ['option1', 'option2']]`.

```javascript
> caver.rpc.klay.getLogs({
        fromBlock: '0x1',
        toBlock: 'latest',
        address:'0x87ac99835e67168d4f9a40580f8f5c33550ba88b'
    }).then(console.log)
[
    {
        data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        topics: [
            '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385
        ]
        logIndex: '0x0',
        transactionIndex: '0x0',
        transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
        blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
        blockNumber: '0x4d2',
        address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
    },
    {...}
]
```

## **Giá trị trả về**

```javascript
caver.rpc.klay.newBlockFilter([callback])
```

Xem [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges) **Ví dụ**

caver.rpc.klay.newBlockFilter <a href="#caver-rpc-klay-newblockfilter" id="caver-rpc-klay-newblockfilter"></a>

| Tạo một bộ lọc trong nút để thông báo khi có khối mới. | Để kiểm tra xem trạng thái đã thay đổi hay chưa, hãy gọi ra [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges). | **Tham số** |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Tên                                                    | Loại                                                                                                                            | Mô tả       |

callback

hàm

| (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. | **Giá trị trả về** |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `Promise` trả về `chuỗi`                                                                                                          | Loại              |

Mô tả

```javascript
> caver.rpc.klay.newBlockFilter().then(console.log)
0xf90906914486a9c22d620e50022b38d5
```

## chuỗi

```javascript
caver.rpc.klay.newFilter(options [, callback])
```

Id bộ lọc.

- **Ví dụ**
- caver.rpc.klay.newFilter <a href="#caver-rpc-klay-newfilter" id="caver-rpc-klay-newfilter"></a>

Tạo đối tượng bộ lọc sử dụng các tùy chọn bộ lọc nhất định để nhận thông tin thay đổi trạng thái cụ thể (bản ghi).

Để kiểm tra xem trạng thái đã thay đổi hay chưa, hãy gọi ra [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges).

| Để có được tất cả các bản ghi khớp với bộ lọc được tạo bởi `newFilter`, hãy gọi [caver.rpc.klay.getFilterLogs](#caver-rpc-klay-getfilterlogs). | Để biết thông tin chi tiết về các chủ đề trong đối tượng bộ lọc, vui lòng tham khảo [API nền tảng Klaytn - klay_newFilter](../../../../json-rpc/klay/filter.md#klay_newfilter). | **Tham số**                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Tên                                                                                                                                            | Loại                                                                                                                                                                                                | Mô tả tùy chọn                                 |
| đối tượng                                                                                                                                      | Các tùy chọn bộ lọc.                                                                                                                                                                                 | Xem bảng dưới đây để tìm phần thông tin mô tả. |

callback

| hàm                                                                         | (tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. | Đối tượng tùy chọn có thể chứa các thông tin sau:                                                              |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Tên                                                                         | Loại                                                                                                                             | Mô tả fromBlock số \| chuỗi                                                                                    |
| (tùy chọn) Số khối của khối cũ nhất dùng để lấy bản ghi. | (`"mới nhất"` nghĩa là khối gần đây nhất.) Giá trị mặc định là `"mới nhất"`.                                   | toBlock số \| chuỗi (tùy chọn) Số khối của khối mới nhất dùng để lấy bản ghi.               |
| (`"mới nhất"` nghĩa là khối gần đây nhất.).              | Giá trị mặc định là `"mới nhất"`.                                                                                                 | address chuỗi \| Mảng                                                                                          |
| (tùy chọn) Địa chỉ hoặc danh sách các địa chỉ.           | Hàm sẽ chỉ trả về các bản ghi liên quan đến (các) tài khoản cụ thể.                                            | chủ đề Mảng (tùy chọn) Mảng các giá trị phải xuất hiện trong bản ghi. Quan trọng là thứ tự. |

Nếu bạn muốn loại bỏ các chủ đề, hãy sử dụng `null`, _vd_: `[null, '0x12...']`.

Bạn có thể truyền một mảng của mỗi chủ đề với các tùy chọn cho chủ đề đó _ví dụ:_ `[null, ['option1', 'option2']]`.

| **Giá trị trả về** | `Promise` trả về `chuỗi` |
| ------------------ | ------------------------ |
| Loại              | Mô tả                    |

chuỗi

```javascript
> caver.rpc.klay.newFilter({}).then(console.log)
0x40d40cb9758c6f0d99d9c2ce9c0f823

> caver.rpc.klay.newFilter({ address: '0x55384B52a9E5091B6012717197887dd3B5779Df3' }).then(console.log)
0xd165cbf31b9d60346aada33dbefe01b
```

## Id bộ lọc.

```javascript
caver.rpc.klay.newPendingTransactionFilter([callback])
```

**Ví dụ** caver.rpc.klay.newPendingTransactionFilter <a href="#caver-rpc-klay-newpendingtransactionfilter" id="caver-rpc-klay-newpendingtransactionfilter"></a>

Tạo bộ lọc trong nút để nhận thông tin về sự xuất hiện của khối đang chờ xử lý mới.

| Để kiểm tra xem trạng thái đã thay đổi hay chưa, hãy gọi ra [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges). | **Tham số** | Tên      |
| -------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------- |
| Loại                                                                                                                            | Mô tả       | callback |

hàm

(tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.

| **Giá trị trả về** | `Promise` trả về `chuỗi` |
| ------------------ | ------------------------ |
| Loại              | Mô tả                    |

chuỗi

```javascript
> caver.rpc.klay.newPendingTransactionFilter().then(console.log)
0xe62da1b2a09efcd4168398bdbf586db0
```

## Id bộ lọc.

```javascript
caver.rpc.klay.uninstallFilter(filterId [, callback])
```

**Ví dụ** caver.rpc.klay.uninstallFilter <a href="#caver-rpc-klay-uninstallfilter" id="caver-rpc-klay-uninstallfilter"></a> Gỡ cài đặt bộ lọc với id đã cho.

Luôn phải được gọi ra khi không còn cần theo dõi.

| Ngoài ra, các bộ lọc sẽ hết thời gian chờ nếu lệnh [caver.rpc.klay.getFilterChanges](#caver-rpc-klay-getfilterchanges) không được gọi ra trong một khoảng thời gian. | **Tham số** | Tên      |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------- |
| Loại                                                                                                                                                                | Mô tả       | bộ lọcId |
| chuỗi                                                                                                                                                                | Id bộ lọc.  | callback |

hàm

(tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.

| **Giá trị trả về** | `Promise` trả về `boolean` |
| ------------------ | -------------------------- |
| Loại              | Mô tả                      |

boolean

```javascript
> caver.rpc.klay.uninstallFilter('0x1426438ffdae5abf43edf4159c5b013b').then(console.log)
true
```

## `true` nếu gỡ cài đặt bộ lọc thành công, nếu không sẽ là `false`.

```javascript
caver.rpc.klay.sha3(data[, callback])
```

**Ví dụ** caver.rpc.klay.sha3 <a href="#caver-rpc-klay-sha3" id="caver-rpc-klay-sha3"></a>

Trả về Keccak-256 (không phải SHA3-256 đã chuẩn hóa) của dữ liệu đã cho.

| Bạn có thể sử dụng [caver.utils.sha3](../caver.utils.md#sha3) thay thế. | **Tham số**                                 | Tên      |
| ----------------------------------------------------------------------- | ------------------------------------------- | -------- |
| Loại                                                                   | Mô tả                                       | data     |
| Chuỗi                                                                   | Dữ liệu được chuyển đổi thành hàm băm SHA3. | callback |

hàm

(tùy chọn) Hàm callback tùy chọn trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.

| **Giá trị trả về** | `Promise` trả về `chuỗi` |
| ------------------ | ------------------------ |
| Loại              | Mô tả                    |

chuỗi

```javascript
> caver.rpc.klay.sha3('0x11223344').then(console.log)
0x36712aa4d0dd2f64a9ae6ac09555133a157c74ddf7c079a70c33e8b4bf70dd73
```
