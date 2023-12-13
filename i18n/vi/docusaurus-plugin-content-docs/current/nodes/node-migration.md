# Di chuyển nút

## Thay đổi dữ liệu chuỗi <a id="disk-management-1"></a>

<aside>
💡 HƯỚNG DẪN NÀY DỰA TRÊN Amazon Linux 2

</aside>

###  **BƯỚC di chuyển** nút CN

#### Tạo ổ đĩa mới

1. Chuẩn bị ổ đĩa mới (dung lượng 3.500GB) hoặc tạo đường dẫn mới trên ổ đĩa hiện tại (Dung lượng khả dụng của ổ đĩa phải bằng 3.500GB.)

<aside>
💡 Giả sử đường dẫn mới là `/var/kcnd2`

</aside>

##### Phương án 1 - Ổ đĩa mới (dung lượng trên 2500GB)

1. Đính kèm ổ đĩa vào EC2 và chạy lệnh dưới đây

```bash
$ lsblk
NAME          MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
nvme2n1       259:0    0  3500G  0 disk **# New Disk**
nvme1n1       259:0    0  4000G  0 disk /var/kcnd
nvme0n1       259:2    0    8G  0 disk
├─nvme0n1p1   259:3    0    8G  0 part /
└─nvme0n1p128 259:4    0    1M  0 part
```

2. Gắn ổ đĩa theo quy trình bên dưới

```bash
$ sudo e2fsck -f /dev/nvme2n1
$ sudo mkfs -t ext4 /dev/nvme2n1
$ sudo mkdir /var/kcnd2
$ sudo mount /dev/nvme2n1 /var/kcnd2
$ sudo mkdir /var/kcnd2/data
$ sudo mkdir /var/kcnd2/log
```

##### Phương án 2 - Ổ đĩa hiện tại (không khuyến nghị)

1. Tạo thư mục mới

```bash
$ sudo mkdir /var/kcnd2/data
$ sudo mkdir /var/kcnd2/log
```

#### Tải xuống dữ liệu chuỗi mới nhất

Tải xuống dữ liệu chuỗi vào dữ liệu của thư mục Klaytn Data DIR mới. (Bạn có thể kiểm tra chi tiết trên dữ liệu chuỗi tại [https://packages.klaytn.net/cypress/chaindata/](https://packages.klaytn.net/cypress/chaindata/))

1. Tải xuống bằng lệnh dưới đây

```bash
# (Phương án 1: khuyến nghị) curl 
$ curl -o klaytn-cypress-chaindata-2021???????????.tar.gz "https://s3.ap-northeast-2.amazonaws.com/klaytn-chaindata/cypress/klaytn-cypress-chaindata-2021???????????.tar.gz"

# (Phương án 2) lệnh aws s3
$ aws s3 cp s3://klaytn-chaindata/cypress/klaytn-cypress-chaindata-2021???????????.tar.gz klaytn-cypress-chaindata-20211113011111.tar.gz 

# (Phương án 3) axel (cần cài đặt axel)
sudo amazon-linux-extras install epel -y
sudo yum install axel pigz
$ axel -n8 https://s3.ap-northeast-2.amazonaws.com/klaytn-chaindata/cypress/klaytn-cypress-chaindata-2021???????????.tar.gz
```

2. Giải nén

```bash
# (Phương án 1: khuyến nghị) tar
$ tar -xvf klaytn-cypress-chaindata-2021???????????.tar.gz

# (Phương án 2) pigz (cần cài đặt pigz)
$ tar -I pigz -xvf klaytn-cypress-chaindata-2021???????????.tar.gz
```



### Cấu hình DATA_DIR & LOG_DIR

#### Phương án 1 - Hoán đổi đường dẫn cũ & mới

<aside>
🚨 TBD

</aside>

1. Dừng quá trình daemon klaytn trước khi hoán đổi
    1. ***LƯU Ý*** Nếu loại nút là CN, bạn có thể xóa nút CN khỏi Hội đồng Klaytn

    💡 Bạn có thể nhận gói cho nút EN trong phần [Khởi động CN](core-cell/install/install-consensus-nodes.md).


2. Hoán đổi đường dẫn cũ và mới
    1. Ổ đĩa mới

        ```bash
        umount /var/kcnd # old path
        umount /var/kcnd2 # new path
        mount /dev/nvme2n1 /var/kcnd
        ```
   💡 Các lệnh này nên được thực thi với các đặc quyền thích hợp.

    2. Ổ đĩa hiện tại

        ```bash
        sudo mv /var/kcnd /var/kcnd_old # old_path
        sudo mv /var/kcnd2 /var/kcnd # new path
        ```

3. (Tùy chọn) Xóa đường dẫn cũ nếu không còn cần thiết

#### Phương án 2 - Cập nhật DATA_DIR & LOG_DIR trong tập tin cấu hình Klaytn

1. Thay đổi đường dẫn Klaytn DIR
    - Phương án 1 - Ổ đĩa mới
        - Thay đổi giá trị `fstab` từ ổ đĩa cũ sang ổ đĩa mới
    - Phương án 2 - Ổ đĩa hiện tại
        - thay đổi đường dẫn DIR từ `kcnd.conf`

### Khởi động lại quy trình (hoặc khởi động lại đối tượng)

<aside>
💡 Nếu cần khởi động lại để thêm ổ đĩa khác, hãy khởi động lại đối tượng.

</aside>

1. ***LƯU Ý*** Nếu loại nút là CN, bạn có thể xóa nút CN khỏi Hội đồng Klaytn
2. Khởi động lại quy trình hoặc khởi động lại đối tượng

## Di chuyển dữ liệu chuỗi

<aside>
💡 Chỉ chạy lệnh di chuyển cho các nút PN và EN (không áp dụng với nút CN)

</aside>

### Lưu ý trước khi bắt đầu <a id="things-to-know-before-this-job"></a>
- Thông số kỹ thuật yêu cầu là m6i.8xlarge (32 lõi với dung lượng bộ nhớ 128GB) hoặc cao hơn
- 7 ngày để chạy toàn bộ quy trình (Quá trình di chuyển được chia làm 2 phần)
    - Phần 1 - Di chuyển DB sang thư mục mới (Xuất hiện thông báo “Quá trình di chuyển trạng thái đã hoàn tất”)
    - Phần 2 - Tạo khối mới trên thư mục mới (thư mục cũ sẽ bị xóa sau bước này)
- Cần có 500GB dung lượng trống

### Chuyển đến Bảng điều khiển Klaytn

```bash
$ kpn attach klay.ipc

#bắt đầu di chuyển dữ liệu chuỗi
> admin.startStateMigration()
null

# Kiểm tra trạng thái
> admin.stateMigrationStatus

#ngừng di chuyển
> admin.stopStateMigration()

```