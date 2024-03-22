# Yêu cầu hệ thống

## Thông số H/W <a id="h-w-specification"></a>

Hiệu suất mạng lưới được đo lường dựa trên thông số kỹ thuật phần cứng kém nhất trong mạng lưới. Theo cấu trúc mạng lưới blockchain, chỉ có thể mở rộng quy mô theo chiều dọc (tăng dung lượng phần cứng). Do đó, tất cả các nút trong mạng lưới nên có phần cứng tốt nhất và ít nhất là có thông số kỹ thuật tương tự với nhau.

Nếu bạn tò mò về cơ sở của thông số kỹ thuật phần cứng này thì bài viết [Xác định thông số kỹ thuật phần cứng tối ưu cho người vận hành nút Klaytn](https://klaytn.foundation/node-operator-optimal-specs/) sẽ giúp bạn hiểu rõ hơn.

Các phần sau đây thể hiện các thông số kỹ thuật được đề xuất cho cả CN và PN.

### Máy chủ Bare-metal <a id="bare-metal-server"></a>

| Danh mục | Thông số kỹ thuật                                                                                                                                                                                                          |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Máy chủ  | Hệ thống máy chủ Intel® [M50CYP1UR212](https://www.intel.sg/content/www/xa/en/products/sku/214842/intel-server-system-m50cyp1ur212/specifications.html)                                                                    |
| CPU      | Intel® Xeon 8358 2.60 GHz (32-core/64-thread)                                                                                                                                                           |
| Bộ nhớ   | 128GB (32GB \* 4)                                                                                                                                                                                       |
| Lưu trữ  | 4TB (or larger size) SSD (The preferred storage size and configuration could differ depending on the chain data size. Vui lòng tham khảo với Đội ngũ Klaytn để biết thêm thông tin.) |

Lưu ý rằng đây là thông số kỹ thuật phần cứng được đề xuất cho CN và PN, không phải là yêu cầu chính xác. Bất kỳ máy móc vật lý nào có cấu hình phần cứng tương tự đều có thể vận hành CN hoặc PN.

You can use and apply a live-pruning option to use live-pruning DB. For more details, please refer https\://docs.klaytn.foundation/docs/learn/storage/live-pruning/. However, note that live-pruning spec is not recommended for CNs but this may change in the future.

### VM đám mây <a id="cloud-vm"></a>

#### Thông số kỹ thuật khuyến nghị cho AWS<a id="recommended-specification-for-aws"></a>

|                   Kiểu nút                   |     Mẫu     | vCPU | Bộ nhớ (GiB) | Dung lượng lưu trữ (GiB) | Tốc độ lưu trữ (IOPS) | Giá (Seoul, USD/giờ) |
| :------------------------------------------: | :---------: | :--: | :-----------------------------: | :-----------------------------------------: | :--------------------------------------: | :-------------------------------------: |
|                      CN                      | m6i.8xlarge |  32  |               128               |      4,000 (Minimum)     |                   9.000                  |                  1,888                  |
|                      PN                      | m6i.4xlarge |  16  |                64               |      4,000 (Minimum)     |                   9.000                  |                  0,944                  |
| PN (with Live Pruning DB) | m6i.2xlarge |   8  |                32               |      3,500 (Minimum)     |                   9,000                  |                  0.472                  |

Thông số lưu trữ này bắt nguồn từ thông số của AWS EBS SSD (gp3).

Thông tin trên được lấy từ [https://aws.amazon.com/ec2/instance-types/](https://aws.amazon.com/ec2/instance-types/) và [https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/) và có thể được AWS thay đổi.

#### Thông số kỹ thuật khuyến nghị cho Azure<a id="recommended-specification-for-azure"></a>

|                   Kiểu nút                   |   Mẫu   | vCPU | Bộ nhớ (GiB) | Loại lưu trữ (GiB) | Tốc độ lưu trữ (IOPS) | Giá (Trung tâm Hàn Quốc, USD/giờ) |
| :------------------------------------------: | :-----: | :--: | :-----------------------------: | :-----------------------------------: | :--------------------------------------: | :--------------------------------------------------: |
|                      CN                      | D32s v5 |  32  |               128               |     P50 (4096)     |                   7500                   |                         1,888                        |
|                      PN                      | D16s v5 |  16  |                64               |     P50 (4096)     |                   7500                   |                         0,944                        |
| PN (with Live Pruning DB) |  D8s v5 |   8  |                32               |     P50 (4096)     |                   7500                   |                         0.472                        |

Thông số lưu trữ này bắt nguồn từ thông số của Ổ Đĩa Azure Cao Cấp.

Thông tin trên được lấy từ [https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/) và [https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing](https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing) và có thể được Microsoft thay đổi.

#### Recommended Specification for GCP<a id="recommended-specification-for-gcp"></a>

|                   Node Type                  |      Model     | vCPU | Memory (GiB) | Storage type (GiB) | Storage speed (IOPS) | Price (asia-northeast3, USD/h) |
| :------------------------------------------: | :------------: | :--: | :-----------------------------: | :-----------------------------------: | :-------------------------------------: | :-----------------------------------------------: |
|                      CN                      | n2-standard-32 |  32  |               128               |   4,000 (Minimum)  |                   7500                  |                      2.032486                     |
|                      PN                      | n2-standard-16 |  16  |                64               |   4,000 (Minimum)  |                   7500                  |                      1.016243                     |
| PN (with Live Pruning DB) |  n2-standard-8 |   8  |                32               |   3,500 (Minimum)  |                   7500                  |                      0.508121                     |

The information above is from [https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/](https://cloud.google.com/compute/vm-instance-pricing#general-purpose_machine_type_family/) and [https://cloud.google.com/storage/pricing#asia](https://cloud.google.com/storage/pricing#asia) and may be changed by Google.

## Yêu cầu lưu trữ <a id="storage-requirements"></a>

Giả sử trung bình 100 TPS, kích thước giao dịch trung bình 300 byte và độ trễ khối 1 giây, yêu cầu dung lượng dự kiến hàng ngày là khoảng 2,5 GB/ngày (=300x100x86400).

## Hệ điều hành <a id="operating-system"></a>

Nên dùng môi trường tương thích với RHEL (7.8 trở lên).
Nhị phân Klaytn đã được thử nghiệm đầy đủ trên Amazon Linux 2 nhưng chúng cũng có thể hoạt động trên các môi trường chạy trên linux khác. nhị phân macOS cũng được cung cấp cho mục đích phát triển.
