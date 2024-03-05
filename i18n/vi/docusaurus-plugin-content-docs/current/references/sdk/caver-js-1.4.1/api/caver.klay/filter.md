# Filter

## getFilterChanges <a id="getfilterchanges"></a>

```javascript
caver.klay.getFilterChanges(filterId [, callback])
```

Phương thức truy vấn lần lượt đối với bộ lọc, trả về một mảng các bản ghi kể từ lần truy vấn trước đó.

**Tham số**

| Tên      | type  | Mô tả                                                                                                                              |
| -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------- |
| bộ lọcId | Chuỗi | Id bộ lọc.                                                                                                                         |
| callback | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Array` - Mảng các đối tượng bản ghi hoặc mảng trống nếu không có thay đổi kể từ lần truy vấn trước đó.

Cấu trúc của `Object` bản ghi trả về trong `Array` có dạng như sau:

| Tên              | Loại           | Mô tả                                                                                                                                                                                                                                                                                                |
| ---------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address          | DỮ LIỆU 20 byte | Địa chỉ mà bản ghi này được khởi tạo.                                                                                                                                                                                                                                                                |
| chủ đề           | Mảng DỮ LIỆU    | Mảng gồm 0 đến 4 DỮ LIỆU 32 byte của các đối số được lập chỉ mục trong bản ghi. (Trong Solidity: Chủ đề đầu tiên là hàm băm chữ ký của sự kiện (_ví dụ_: `Deposit(address,bytes32,uint256)`), trừ khi bạn khai báo sự kiện với giá trị chỉ định `anonymous`.). |
| data             | DATA            | Chứa các đối số không được lập chỉ mục của bản ghi.                                                                                                                                                                                                                                                  |
| blockNumber      | SỐ LƯỢNG        | Số khối chứa bản ghi này. Giá trị là `null` nếu giao dịch đang chờ xử lý.                                                                                                                                                                                                                            |
| transactionHash  | DỮ LIỆU 32 byte | Hàm băm của giao dịch mà bản ghi này được tạo từ đó. Giá trị là `null` khi giao dịch đang chờ xử lý, đây là trường hợp đặc biệt khi giao dịch đã được thực thi nhưng khối chứa giao dịch chưa được xác nhận.                                                                                         |
| transactionIndex | SỐ LƯỢNG        | Giá trị nguyên. Chỉ mục của giao dịch nơi bản ghi này được tạo. Giá trị là `null` nếu giao dịch đang chờ xử lý.                                                                                                                                                                                      |
| blockHash        | DỮ LIỆU 32 byte | Hàm băm của khối chứa bản ghi này. Giá trị là `null` nếu giao dịch đang chờ xử lý.                                                                                                                                                                                                                   |
| logIndex         | SỐ LƯỢNG        | Giá trị nguyên chỉ vị trí chỉ mục bản ghi trong khối. Giá trị là Giá trị là `null` khi đó là bản ghi đang chờ xử lý.                                                                                                                                                                                 |
| id               | Chuỗi           | Mã số định danh bản ghi. Mã này được tạo bằng cách nối chuỗi "log_" với `keccak256(blockHash + transactionHash + logIndex).substr(0, 8)`                                                                                                                                        |

**Ví dụ**

```javascript
> caver.klay.getFilterChanges('0xafb8e49bbcba9d61a3c616a3a312533e').then(console.log);
[ 
    { 
        address: '0x71e503935b7816757AA0314d4E7354dab9D39162',
        topics: [ '0xe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9' ],
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        blockNumber: 3525,
        transactionHash: '0x1b28e2c723e45a0d8978890598903f36a74397c9cea8531dc9762c39483e417f',
        transactionIndex: 0,
        blockHash: '0xb7f0bdaba93d3baaa01a5c24517da443207f774e0202f02c298e8e997a540b3d',
        logIndex: 0,
        id: 'log_c1ea867d'
    } 
]
```

## getFilterLogs <a id="getfilterlogs"></a>

```javascript
caver.klay.getFilterLogs(filterId [, callback])
```

Trả về một mảng gồm tất cả các bản ghi khớp với bộ lọc bằng id cho trước. Nên lấy đối tượng bộ lọc bằng cách sử dụng hàm [newFilter](#newfilter).\
Lưu ý rằng không thể sử dụng các id bộ lọc trả về bằng các hàm tạo bộ lọc khác, chẳng hạn như [newBlockFilter](#newblockfilter) hoặc [newPendingTransactionFilter](#newpendingtransactionfilter), với hàm này.
or [newPendingTransactionFilter](#newpendingtransactionfilter), cannot be used with this function.

**Tham số**

| Tên      | type  | Mô tả                                                                                                                              |
| -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------- |
| bộ lọcId | Chuỗi | Id bộ lọc.                                                                                                                         |
| callback | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

Tham khảo [getFilterChanges](#getfilterchanges)

**Ví dụ**

```javascript
> caver.klay.getFilterLogs('0xcac08a7fc32fc625a519644187e9f690').then(console.log);
[
    {
        address: '0x55384B52a9E5091B6012717197887dd3B5779Df3',
        topics: [ '0xe8451a9161f9159bc887328b634789768bd596360ef07c5a5cbfb927c44051f9' ],
        data: '0x0000000000000000000000000000000000000000000000000000000000000001',
        blockNumber: 7217,
        transactionHash: '0xa7436c54e47dafbce696de65f6e890c96ac22c236f50ca1be28b9b568034c3b3',
        transactionIndex: 0,
        blockHash: '0xe4f27c524dacfaaccb36735deccee69b3d6c315e969779784c36bb8e14b89e01',
        logIndex: 0,
        id: 'log_2dd695a8' 
    }
]
```

## getPastLogs <a id="getpastlogs"></a>

```javascript
caver.klay.getPastLogs(options [, callback])
```

Lấy bản ghi trong quá khứ, phù hợp với các tùy chọn đã cho.

**Tham số**

| Tên               | Loại         | Mô tả                                                                                                                                                                                                                                                                                                            |
| ----------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tùy chọn          | Đối tượng     | Các tùy chọn bộ lọc.                                                                                                                                                                                                                                                                                             |
| options.fromBlock | Số \| Chuỗi   | (tùy chọn) Số hiệu của khối lấy bản ghi sớm nhất. (`"mới nhất"` nghĩa là khối gần đây nhất.) Giá trị mặc định là `"latest"`.                                                                                                                                               |
| options.toBlock   | Số \| Chuỗi   | (tùy chọn) Số hiệu của khối lấy bản ghi cuối cùng. (`"mới nhất"` nghĩa là khối gần đây nhất.). Giá trị mặc định là `"latest"`.                                                                                                                                             |
| options.address   | Chuỗi \| Mảng | (tùy chọn) Địa chỉ hoặc danh sách các địa chỉ. Hàm sẽ chỉ trả về các bản ghi liên quan đến (các) tài khoản cụ thể.                                                                                                                                                         |
| options.topics    | Mảng          | (tùy chọn) Mảng các giá trị phải xuất hiện trong bản ghi. Quan trọng là thứ tự. Nếu bạn muốn bỏ qua một số chủ đề, hãy sử dụng `null`, _ví dụ_, `[null, '0x12...']`. Bạn cũng có thể truyền một mảng của mỗi chủ đề với các tùy chọn cho chủ đề đó _ví dụ:_ `[null, ['option1', 'option2']]`. |
| callback          | Hàm           | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                                                                                                                                               |

**Giá trị trả về**

`Promise` trả về `Array` - Mảng các đối tượng bản ghi.

Cấu trúc của `Object` sự kiện trả về trong `Array` có dạng như sau:

| Tên              | Loại         | Mô tả                                                                                                                                                              |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| address          | Chuỗi         | Địa chỉ khởi tạo sự kiện.                                                                                                                                          |
| data             | Chuỗi         | Dữ liệu chứa tham số bản ghi không được lập chỉ mục.                                                                                                               |
| chủ đề           | Mảng          | Một mảng có tối đa 4 chủ đề 32 byte, chủ đề 1-3 chứa các tham số được lập chỉ mục của bản ghi.                                                                     |
| logIndex         | Số            | Giá trị nguyên chỉ vị trí chỉ mục sự kiện trong khối.                                                                                                              |
| transactionIndex | Số            | Giá trị nguyên chỉ vị trí chỉ mục giao dịch nơi sự kiện được tạo.                                                                                                  |
| transactionHash  | Chuỗi 32 byte | Hàm băm của giao dịch mà sự kiện này được tạo.                                                                                                                     |
| blockHash        | Chuỗi 32 byte | Hàm băm của khối nơi sự kiện này được tạo. Giá trị là `null` khi sự kiện vẫn đang chờ xử lý.                                                                       |
| blockNumber      | Số            | Số khối nơi bản ghi này được tạo. Giá trị là `null` khi bản ghi vẫn đang chờ xử lý.                                                                                |
| id               | Chuỗi         | Mã số định danh bản ghi. Mã này được tạo thông qua việc nối chuỗi "log_" với `keccak256(blockHash + transactionHash + logIndex).substr(0, 8)` |

**Ví dụ**

```javascript
> caver.klay.getPastLogs({
    address: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
    topics: ["0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234"]
})
.then(console.log);

[{
    data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
    logIndex: 0,
    transactionIndex: 0,
    transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
    blockNumber: 1234,
    address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    id: 'log_124d61bc',
},{...}]
```

## newBlockFilter <a id="newblockfilter"></a>

```javascript
caver.klay.newBlockFilter([callback])
```

Tạo bộ lọc trong nút để nhận thông tin về sự xuất hiện của khối mới.
Để kiểm tra xem trạng thái có thay đổi hay không, hãy gọi ra [getFilterChanges](#getfilterchanges).

**Tham số**

| Tên      | type | Mô tả                                                                                                                                                     |
| -------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| callback | Hàm  | (tùy chọn) Hàm callback tùy chọn. Hàm callback được gọi với đối tượng lỗi làm tham số thứ nhất của hàm và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `String` - Id bộ lọc.

**Ví dụ**

```javascript
> caver.klay.newBlockFilter().then(console.log);
0x9ca049dc8b0788ee05724e45fc4137f1
```

## newFilter <a id="newfilter"></a>

```javascript
caver.klay.newFilter(options [, callback])
```

Tạo đối tượng bộ lọc sử dụng các tùy chọn bộ lọc nhất định để nhận thông tin thay đổi trạng thái cụ thể (bản ghi).

- Để kiểm tra xem trạng thái có thay đổi hay không, hãy gọi ra [getFilterChanges](#getfilterchanges).
- Để có được tất cả các bản ghi khớp với bộ lọc được tạo bởi `newFilter`, hãy gọi ra [getFilterLogs](#getfilterlogs).

Để biết thông tin chi tiết về các bộ lọc theo chủ đề, hãy tham khảo [API Nền tảng Klaytn - klay_newFilter](../../../../json-rpc/klay/filter.md#klay_newfilter).

**Tham số**

| Tên               | Loại         | Mô tả                                                                                                                                                                                                                                                                                                                                    |
| ----------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tùy chọn          | Đối tượng     | Các tùy chọn bộ lọc.                                                                                                                                                                                                                                                                                                                     |
| options.fromBlock | Số \| Chuỗi   | (tùy chọn) Số hiệu của chiều cao khối truy vấn sự kiện sớm nhất. (Có các thẻ đặc biệt, `"latest"` nghĩa là khối gần đây nhất). Giá trị mặc định là `"latest"`.                                                                                                                                     |
| options.toBlock   | Số \| Chuỗi   | (tùy chọn) Số hiệu của chiều cao khối truy vấn sự kiện cuối cùng (Có các thẻ đặc biệt, `"latest"` nghĩa là khối được xác nhận gần đây nhất). Giá trị mặc định là `"latest"`.                                                                                                                       |
| options.address   | Chuỗi \| Mảng | (tùy chọn) Địa chỉ hoặc danh sách các địa chỉ để lấy bản ghi được tạo ra bên trong (các) hợp đồng đã cho.                                                                                                                                                                                          |
| options.topics    | Mảng          | (tùy chọn) Mảng các giá trị để tìm kiếm trong mục nhập bản ghi. Quan trọng là thứ tự. Nếu bạn muốn khớp với tất cả mọi thứ trong vị trí cho trước, hãy sử dụng `null`, _ví dụ_, `[null, '0x12...']`. Bạn cũng có thể truyền một mảng để khớp một trong số các giá trị đó.  _Ví dụ,_ `[null, ['option1', 'option2']]`. |
| callback          | Hàm           | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai.                                                                                                                                                                                                       |

**Giá trị trả về**

`Promise` trả về `String` - Id bộ lọc.

**Ví dụ**

```javascript
> caver.klay.newFilter({}).then(console.log);
0x40d40cb9758c6f0d99d9c2ce9c0f823

> caver.klay.newFilter({address: "0x55384B52a9E5091B6012717197887dd3B5779Df3"}).then(console.log);
0xd165cbf31b9d60346aada33dbefe01b
```

## newPendingTransactionFilter <a id="newpendingtransactionfilter"></a>

```javascript
caver.klay.newPendingTransactionFilter([callback])
```

Tạo bộ lọc trong nút để nhận thông tin về sự xuất hiện của khối đang chờ xử lý mới.
Để kiểm tra xem trạng thái có thay đổi hay không, hãy gọi ra [getFilterChanges](#getfilterchanges).

**Tham số**

| Tên      | Loại | Mô tả                                                                                                                              |
| -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------- |
| callback | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `String` - Id bộ lọc.

**Ví dụ**

```javascript
> caver.klay.newPendingTransactionFilter().then(console.log);
0x1426438ffdae5abf43edf4159c5b013b
```

## uninstallFilter <a id="uninstallfilter"></a>

```javascript
caver.klay.uninstallFilter(filterId [, callback])
```

Gỡ bỏ bộ lọc với id cho trước. Bạn nên xóa ngay bộ lọc nếu việc giám sát không còn cần thiết nữa.
Bộ lọc sẽ bị xóa nếu không được gọi ra thông qua [getFilterChanges](#getfilterchanges) trong thời gian lớn hơn giá trị thời gian chờ được thiết lập trong nút. Cấu hình mặc định là 5 phút.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                                              |
| -------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------- |
| bộ lọcId | Chuỗi | Id bộ lọc.                                                                                                                         |
| callback | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số thứ nhất và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Boolean` - Giá trị là `true` nếu bộ lọc đã được gỡ cài đặt thành công, ngược lại, giá trị sẽ là `false`.

**Ví dụ**

```javascript
> caver.klay.uninstallFilter('0x1426438ffdae5abf43edf4159c5b013b').then(console.log);
true
```
