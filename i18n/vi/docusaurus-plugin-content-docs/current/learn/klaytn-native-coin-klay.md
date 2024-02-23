# Đồng tiền mặc định của Klaytn - KLAY

## KLAY <a id="klay"></a>

KLAY là loại tiền kỹ thuật số chính và có thể chuyển nhượng nội bộ của Klaytn và được dùng để thanh toán phí giao dịch khi tạo hoặc thực thi hợp đồng thông minh, hoặc khi chuyển khoản KLAY.

KLAY là một phần tử cần thiết – một dạng nhiên liệu – để vận hành nền tảng ứng dụng phân tán Klaytn. Đây là một hình thức thanh toán được khách hàng của nền tảng sử dụng để thanh toán cho các nút đồng thuận (CN) thực thi các hoạt động được yêu cầu. To put it another way, KLAY is an incentive; it ensures that developers write high-quality applications (wasteful code costs more) and that the network remains healthy (CNs are compensated for the resources they contribute).

## Các đơn vị của KLAY <a id="units-of-klay"></a>

Klaytn sử dụng hệ thống đơn vị sau cho KLAY.

- `peb` là đơn vị tiền tệ nhỏ nhất.
- `ston` là một tên cho `Gpeb` và được giới thiệu vì tính thuận tiện.
- Một `KLAY` bằng 10^18 peb.

| Đơn vị | giá trị peb | peb                                       |
| :----- | :---------- | :---------------------------------------- |
| peb    | 1 peb       | 1                                         |
| kpeb   | 10^3 peb    | 1.000                                     |
| Mpeb   | 10^6 peb    | 1.000.000                                 |
| Gpeb   | 10^9 peb    | 1.000.000.000                             |
| ston   | 10^9 peb    | 1.000.000.000                             |
| uKLAY  | 10^12 peb   | 1.000.000.000.000                         |
| mKLAY  | 10^15 peb   | 1.000.000.000.000.000                     |
| KLAY   | 10^18 peb   | 1.000.000.000.000.000.000                 |
| kKLAY  | 10^21 peb   | 1.000.000.000.000.000.000.000             |
| MKLAY  | 10^24 peb   | 1.000.000.000.000.000.000.000.000         |
| GKLAY  | 10^27 peb   | 1.000.000.000.000.000.000.000.000.000     |
| TKLAY  | 10^30 peb   | 1.000.000.000.000.000.000.000.000.000.000 |

#### Các API liên quan đến Đơn vị KLAY <a id="apis-related-to-klay-units"></a>

`klay.toPeb` và `klay.fromPeb` là các API thuận tiện để chuyển đổi giữa các đơn vị KLAY.

```text
$ ./klay attach data/dd/klay.ipc
...
> klay.fromPeb(25, "peb")
"25"
> klay.fromPeb(25, "Gpeb")
"0.000000025"
> klay.fromPeb(25, "ston")
"0.000000025"
> klay.fromPeb(25, "KLAY")
"0.000000000000000025"
> klay.toPeb(25, "peb")
"25"
> klay.toPeb(25, "ston")
"25000000000"
> klay.toPeb(25, "KLAY")
"25000000000000000000"
```

Bạn có thể nhận danh sách tất cả các đơn vị được hỗ trợ bởi `klay.toPeb` và `klay.fromPeb` bằng cách gửi một chuỗi đơn vị không hợp lệ, ví dụ như chuỗi dưới đây.

```text
> klay.toPeb(1, "something-does-not-exist")
Error: This unit doesn't exist, please use one of the following units
"noKLAY": "0"
"peb": "1"
"kpeb": "1000"
"Mpeb": "1000000"
"Gpeb": "1000000000"
"ston": "1000000000"
"uKLAY": "1000000000000"
"mKLAY": "1000000000000000"
"KLAY": "1000000000000000000"
"kKLAY": "1000000000000000000000"
"MKLAY": "1000000000000000000000000"
"GKLAY": "1000000000000000000000000000"
"TKLAY": "1000000000000000000000000000000"

    at web3.js:2170:19
    at web3.js:2255:49
    at <anonymous>:1:1
```
