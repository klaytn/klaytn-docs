# Yêu cầu hệ thống

Chạy Nút điểm cuối (EN) yêu cầu thông số kỹ thuật phần cứng tương đối cao hơn so với chạy Ethereum hoặc các blockchain khác, bởi vì EN phải xác thực các khối được tạo bởi Nút đồng thuận chính thức được trang bị phần cứng cấp doanh nghiệp.

Đối với EN, các thông số kỹ thuật sau đây được khuyến nghị.

## Thông số H/W <a id="h-w-specification"></a>

### VM đám mây <a id="cloud-vm"></a>

#### Thông số kỹ thuật khuyến nghị <a id="recommended-specification-based-on-aws"></a>

| vCPU | Bộ nhớ (GiB) | Lưu trữ (GiB) | Băng thông ổ đĩa (Mbps) | Băng thông mạng lưới (Gbps) |
|:---- |:------------ |:------------- |:----------------------- |:--------------------------- |
| 8    | 64           | > 3.000       | 3.500                   | Lên đến 10                  |

### Máy Bare-metal <a id="bare-metal-machine"></a>

Chúng tôi không chỉ định thông số kỹ thuật máy vật lý chính xác cho EN nhưng bất kỳ máy vật lý nào có cấu hình phần cứng tương tự như cấu hình trong phần VM đám mây sẽ đủ để vận hành EN.

## Yêu cầu lưu trữ <a id="storage-requirements"></a>

Giả sử trung bình 100 TPS, kích thước giao dịch trung bình 300 byte và độ trễ khối 1 giây, yêu cầu dung lượng EN dự kiến hàng ngày là khoảng 2,5 GB/ngày (=300x100x86400).

## Hệ điều hành <a id="operating-system"></a>

Môi trường nên dùng là [Amazon Linux 2](https://aws.amazon.com/ko/about-aws/whats-new/2017/12/introducing-amazon-linux-2/). Nhị phân Klaytn đã được thử nghiệm đầy đủ trên Amazon Linux 2 nhưng chúng cũng có thể hoạt động trên các môi trường chạy trên linux khác. nhị phân macOS cũng được cung cấp cho mục đích phát triển. 

