## getFilterChanges <a id="getfilterchanges"></a>

```javascript
caver.klay.getFilterChanges(filterId [, callback])
```

Phương thức truy vấn lần lượt đối với bộ lọc, trả về một mảng các nhật ký kể từ lần truy vấn lần lượt trước đó.

**Tham số**

| Tên      | Loại  | Mô tả                                                                                                           |
| -------- | ----- | --------------------------------------------------------------------------------------------------------------- |
| filterId | Chuỗi | Id bộ lọc.                                                                                                      |
| callback | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số đầu tiên và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Array` - Mảng các đối tượng nhật ký, hoặc mảng trống nếu không có thay đổi kể từ lần truy vấn lần lượt trước đó.

Cấu trúc của `Object` nhật ký trả về trong `Array` là như sau:

| Tên              | Loại           | Mô tả                                                                                                                                                                                                                                                    |
| ---------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address          | DỮ LIỆU 20 byte | Địa chỉ mà nhật ký này được khởi tạo.                                                                                                                                                                                                                    |
| topics           | Mảng DỮ LIỆU    | Mảng gồm 0 đến 4 DỮ LIỆU 32 byte của các đối số nhật ký được lập chỉ mục. (Trong Solidity: Chủ đề đầu tiên là hàm băm chữ ký của sự kiện (*ví dụ*: `Deposit(address,bytes32,uint256)`), trừ khi bạn khai báo sự kiện với giá trị chỉ định `anonymous`.). |
| data             | DỮ LIỆU         | Chứa các đối số không được lập chỉ mục của nhật ký.                                                                                                                                                                                                      |
| blockNumber      | SỐ LƯỢNG        | Số khối chứa nhật ký này. `null` nếu đang chờ xử lý.                                                                                                                                                                                                     |
| transactionHash  | DỮ LIỆU 32 byte | Hàm băm của giao dịch nơi nhật ký này được tạo. Giá trị là `null` khi giao dịch đang chờ xử lý, trường hợp đặc biệt khi giao dịch đã được thực thi nhưng khối chứa giao dịch chưa được xác nhận.                                                         |
| transactionIndex | SỐ LƯỢNG        | Số nguyên. Chỉ mục của giao dịch nơi nhật ký này được tạo. Giá trị là `null` nếu giao dịch đang chờ xử lý.                                                                                                                                               |
| blockHash        | DỮ LIỆU 32 byte | Hàm băm của khối chứa nhật ký này. Giá trị là `null` nếu giao dịch đang chờ xử lý.                                                                                                                                                                       |
| logIndex         | SỐ LƯỢNG        | Số nguyên chỉ vị trí chỉ mục nhật ký trong khối. Giá trị là `null` khi đó là nhật ký đang chờ xử lý.                                                                                                                                                     |
| id               | Chuỗi           | Mã số định danh nhật ký. Nó được tạo bằng cách nối chuỗi "log_" với `keccak256(blockHash + transactionHash + logIndex).substr(0, 8)`                                                                                                                     |

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

Trả về một mảng gồm tất cả các nhật ký khớp với bộ lọc với id cho trước. Đối tượng bộ lọc nên được lấy bằng cách sử dụng hàm [newFilter](#newfilter).  
Lưu ý rằng các id bộ lọc trả về bằng các hàm tạo bộ lọc khác, chẳng hạn như [newBlockFilter](#newblockfilter) hoặc [newPendingTransactionFilter](#newpendingtransactionfilter), không thể sử dụng được với hàm này.

**Tham số**

| Tên      | Loại  | Mô tả                                                                                                           |
| -------- | ----- | --------------------------------------------------------------------------------------------------------------- |
| filterId | Chuỗi | Id bộ lọc.                                                                                                      |
| callback | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số đầu tiên và kết quả làm tham số thứ hai. |

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

Lấy nhật ký quá khứ, phù hợp với các tùy chọn đã cho.

**Tham số**

| Tên               | Loại             | Mô tả                                                                                                                                                                                                                                                                                                |
| ----------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options           | Đối tượng         | Các tùy chọn bộ lọc.                                                                                                                                                                                                                                                                                 |
| options.fromBlock | Số &#124; Chuỗi   | (tùy chọn) Số hiệu của khối sớm nhất để lấy nhật ký. (`"latest"` nghĩa là khối gần đây nhất.) Giá trị mặc định là `"latest"`.                                                                                                                                                                        |
| options.toBlock   | Số &#124; Chuỗi   | (tùy chọn) Số hiệu của khối cuối cùng để lấy nhật ký. (`"latest"` nghĩa là khối gần đây nhất.). Giá trị mặc định là `"latest"`.                                                                                                                                                                      |
| options.address   | Chuỗi &#124; Mảng | (tùy chọn) Địa chỉ hoặc danh sách các địa chỉ. Sẽ chỉ trả về các nhật ký liên quan đến (các) tài khoản cụ thể.                                                                                                                                                                                       |
| options.topics    | Mảng              | (tùy chọn) Mảng các giá trị phải xuất hiện trong bản ghi sự kiện. Thứ tự có vai trò quan trong. Nếu bạn muốn bỏ qua một số chủ đề, sử dụng `null`, *ví dụ*, `[null, '0x12...']`. Bạn có thể truyền một mảng của mỗi chủ đề với các tùy chọn cho chủ đề đó *ví dụ:* `[null, ['option1', 'option2']]`. |
| callback          | Hàm               | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số đầu tiên và kết quả làm tham số thứ hai.                                                                                                                                                                                      |

**Giá trị trả về**

`Promise` trả về `Array` - Mảng các đối tượng nhật ký.

Cấu trúc của `Object` sự kiện trả về trong `Array` là như sau:

| Tên              | Loại         | Mô tả                                                                                                                                     |
| ---------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| address          | Chuỗi         | Địa chỉ bắt nguồn cho sự kiện.                                                                                                            |
| data             | Chuỗi         | Dữ liệu chứa tham số nhật ký không được lập chỉ mục.                                                                                      |
| topics           | Mảng          | Một mảng có tối đa 4 chủ đề 32 byte, chủ đề 1-3 chứa các tham số được lập chỉ mục của nhật ký.                                            |
| logIndex         | Số            | Số nguyên chỉ vị trí chỉ mục sự kiện trong khối.                                                                                          |
| transactionIndex | Số            | Số nguyên biểu thị vị trí chỉ mục giao dịch nơi sự kiện được tạo ra.                                                                      |
| transactionHash  | Chuỗi 32 byte | Hàm băm của giao dịch mà sự kiện này được tạo.                                                                                            |
| blockHash        | Chuỗi 32 byte | Hàm băm của khối nơi mà sự kiện này đã được tạo. `null` khi nó vẫn đang chờ xử lý.                                                        |
| blockNumber      | Số            | Số khối nơi mà nhật ký này đã được tạo. `null` khi vẫn đang chờ xử lý.                                                                    |
| id               | Chuỗi         | Mã số định danh nhật ký. Nó được tạo thông qua việc nối chuỗi "log_" với `keccak256(blockHash + transactionHash + logIndex).substr(0, 8)` |

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

Tạo bộ lọc trong nút để nhận thông tin về sự xuất hiện của khối mới. Để kiểm tra thay đổi trạng thái, hãy gọi [getFilterChanges](#getfilterchanges).

**Tham số**

| Tên      | Loại | Mô tả                                                                                                                                  |
| -------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------- |
| callback | Hàm  | (tùy chọn) Hàm callback tùy chọn. Hàm callback được gọi với đối tượng lỗi làm tham số đầu tiên của hàm và kết quả làm tham số thứ hai. |

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
Tạo đối tượng bộ lọc sử dụng các tùy chọn bộ lọc nhất định để nhận thông tin thay đổi trạng thái cụ thể (nhật ký).
- Để kiểm tra thay đổi trạng thái, hãy gọi [getFilterChanges](#getfilterchanges).
- Để có được tất cả các bản ghi khớp với bộ lọc được tạo bởi `newFilter`, hãy gọi [getFilterLogs](#getfilterlogs).

Để biết thông tin chi tiết về các bộ lọc chủ đề, vui lòng tham khảo [API Nền tảng Klaytn - klay_newFilter](../../../../../json-rpc/api-references/klay/filter.md#klay_newfilter).



**Tham số**

| Tên               | Loại             | Mô tả                                                                                                                                                                                                                                                                                                                     |
| ----------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| options           | Đối tượng         | Các tùy chọn bộ lọc.                                                                                                                                                                                                                                                                                                      |
| options.fromBlock | Số &#124; Chuỗi   | (tùy chọn) Số hiệu của chiều cao khối sớm nhất để truy vấn sự kiện. (Có các thẻ đặc biệt, `"latest"` nghĩa là khối gần đây nhất). Giá trị mặc định là `"latest"`.                                                                                                                                                         |
| options.toBlock   | Số &#124; Chuỗi   | (tùy chọn) Số hiệu của chiều cao khối cuối cùng để truy vấn sự kiện (Có các thẻ đặc biệt, `"latest"` nghĩa là khối được xác nhận gần đây nhất). Giá trị mặc định là `"latest"`.                                                                                                                                           |
| options.address   | Chuỗi &#124; Mảng | (tùy chọn) Địa chỉ hoặc danh sách các địa chỉ để lấy nhật ký được tạo ra bên trong (các) hợp đồng đã cho.                                                                                                                                                                                                                 |
| options.topics    | Mảng              | (tùy chọn) Mảng các giá trị để tìm kiếm trong các bản ghi nhật ký. Thứ tự có vai trò quan trọng. Nếu bạn muốn khớp với tất cả mọi thứ trong vị trí cho trước, sử dụng `null`, *ví dụ*, `[null, '0x12...']`. Bạn cũng có thể truyền một mảng để khớp một trong số các giá trị.  *Ví dụ,* `[null, ['option1', 'option2']]`. |
| callback          | Hàm               | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số đầu tiên và kết quả làm tham số thứ hai.                                                                                                                                                                                                           |


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

Tạo bộ lọc trong nút để nhận thông tin về sự xuất hiện của khối đang chờ xử lý mới. Để kiểm tra thay đổi trạng thái, hãy gọi [getFilterChanges](#getfilterchanges).

**Tham số**

| Tên      | Loại | Mô tả                                                                                                           |
| -------- | ----- | --------------------------------------------------------------------------------------------------------------- |
| callback | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số đầu tiên và kết quả làm tham số thứ hai. |

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

Gỡ bỏ bộ lọc với id cho trước. Chúng tôi khuyến cáo mạnh mẽ rằng nếu không còn cần theo dõi nữa thì nên ngay lập tức gỡ bỏ bộ lọc. Bộ lọc sẽ bị gỡ bỏ nếu bộ lọc không được kích hoạt thông qua [getFilterChanges](#getfilterchanges) trong thời gian lớn hơn giá trị thời gian chờ được thiết lập trong nút. Cấu hình mặc định là 5 phút.

**Tham số**

| Tên      | Loại | Mô tả                                                                                                           |
| -------- | ----- | --------------------------------------------------------------------------------------------------------------- |
| filterId | Chuỗi | Id bộ lọc.                                                                                                      |
| callback | Hàm   | (tùy chọn) Hàm callback tùy chọn, trả về một đối tượng lỗi làm tham số đầu tiên và kết quả làm tham số thứ hai. |

**Giá trị trả về**

`Promise` trả về `Boolean` - `true` nếu bộ lọc đã được gỡ cài đặt thành công, nếu không giá trị là `false`.

**Ví dụ**

```javascript
> caver.klay.uninstallFilter('0x1426438ffdae5abf43edf4159c5b013b').then(console.log);
true
```
