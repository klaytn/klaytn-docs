# Trước khi bạn cài đặt <a id="before-you-install"></a>

Trước khi cài đặt gói Klaytn, bạn cần tạo thông tin nút liên kết để đăng ký URI nút. Gói Kgen được cung cấp bởi CCO, vui lòng làm theo tuần tự các bước bên dưới.

1. Tải về gói `kgen`
2. Khóa nút & Tạo URI nút
3. Đăng ký URI nút

## Tải về gói `kgen` <a id="download-kgen-package"></a>

Đầu tiên, bạn cần tải về phiên bản mới nhất của gói `kgen` tùy thuộc vào hệ điều hành của bạn ở trang [Download](download.md).

Bạn có thể tìm tập tin nhị phân `kgen`trong thư mục `bin`.

## Khóa nút & Tạo URI nút <a id="node-key-node-uri-creation"></a>

Khóa nút và URI nút được tạo chỉ một lần khi bắt đầu. URI nút phải được chia sẻ với các Core Cell khác trong Mạng lưới Core Cell. Một NĐT kết nối với các NĐT khác còn một NP thì kết nối với một NĐT và vài NP bằng URI nút đã tạo. URI nút được tạo dựa trên khóa nút bằng `kgen`. đã tải về. Dòng lệnh dưới đây tạo `nodekey` và `node_info.json`.

`kgen` lấy IP và số Cổng liên kết như sau.

```text
$ kgen --ip "123.456.789.012" --port 32323 --file
$ ls
nodekey node_info.json
```

`Khóa nút` là chuỗi thập lục phân 64 byte, cũng là khóa riêng tư được sử dụng nội bộ trong nút. Khóa riêng tư phải có trong thư mục dữ liệu Klaytn và bạn nên cẩn thận, đừng để làm mất nó.

```text
$ cat nodekey
f08f2118c455a6c9c9b5e035d3571e570a719ea61771e268546e796a264acc2b
$ mv nodekey ~/kcnd_home
```

`node_info.json` tập tin được tạo bao gồm các nội dung sau.

| Tên khoá      | Mô tả                            | Ví dụ                                                                                                                                                                 |
|:------------- |:-------------------------------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Địa_chỉ_nút | địa chỉ của một nút liên kết     | 0xc8a23d67f2471066fa1b07270651fea7e5c0cf78                                                                                                                              |
| NodeKey       | khóa nút \(hay khóa riêng tư\) | aaa7248dfdf19418ae9121a0f39db39c5c27a3e404ea7c1b8e020ca8dbe7e71a                                                                                                        |
| NodeURI       | URI nút                          | kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0 |

`node_info.json` chứa thông tin nút trong định dạng JSON như sau.

```text
$ cat node_info.json
{
    "NodeAddress": "0xc8a23d67f2471066fa1b07270651fea7e5c0cf78",
    "NodeKey": "aaa7248dfdf19418ae9121a0f39db39c5c27a3e404ea7c1b8e020ca8dbe7e71a",
    "NodeURI": "kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0"
}
```

## Đăng ký URI nút <a id="node-uri-enrollment"></a>

URI nút được tạo nên được đăng ký để tham gia Mạng lưới Core Cell \(CCN\). Quá trình đăng ký sẽ diễn ra như sau.

1. Tạo một URI nút bằng`kgen` \(`node_info.json`\) có chứa IP và số Cổng liên kết.
2. Gửi thông tin tới địa chỉ email chính thức của Klaytn \(`bootstrap@klaytn.com` cho Cypress hoặc `baobab@klaytn.com` cho Baobab\).

Thông tin đăng ký cần được gửi đến địa chỉ email chính thức của Klaytn. Định dạng sẽ như sau.

Trong trường hợp NĐT,

```text
Công ty: Kakao
URI NĐT : kni://
4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0
```

Trong trường hợp NP,

```text
Công ty: Kakao
URI NP : kni://
4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0
```

