# Bắt đầu/dừng SCN <a id="starting-stopping-scn"></a>

Tùy thuộc vào loại cài đặt của bạn, bạn có thể bắt đầu/dừng dịch vụ Klaytn bằng lệnh `systemctl` hoặc `kscnd` như sau.

**bắt đầu**

```bash
## khi cài đặt từ phân bổ rpm 
$ systemctl start kscnd.service

## khi cài đặt bằng lưu trữ linux
$ kscnd start

```

**dừng**

```bash
## khi cài đặt từ phân bổ rpm 
$ systemctl stop kscnd.service

## khi cài đặt bằng lưu trữ linux
$ kscnd stop

```

**trạng thái**

```bash
## khi cài đặt từ phân bổ rpm 
$ systemctl trạng thái kscnd.service

## khi cài đặt bằng lưu trữ linux
$ kscnd trạng thái

```


