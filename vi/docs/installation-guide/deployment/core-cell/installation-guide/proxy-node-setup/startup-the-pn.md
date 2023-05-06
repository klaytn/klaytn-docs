# Khởi động NP <a id="startup-the-pn"></a>

## Bắt đầu/Dừng NP  <a id="pn-start-stop"></a>

Bạn có thể bắt đầu/dừng dịch vụ Klaytn bằng lệnh `systemctl` sau đây.

**Lưu ý**: Việc này yêu cầu quyền root.

**bắt đầu**

```bash
$ systemctl start kpnd.service

```

**dừng**

```bash
$ systemctl stop kpnd.service

```

**trạng thái**

```bash
$ systemctl status kpnd.service

```

## Khắc phục sự cố <a id="troubleshooting"></a>

Nếu bạn gặp lỗi sau,

```bash
Không thể bắt đầu kpnd.service: Không tìm thấy đơn vị.
```

tải lại cấu hình trình quản lý hệ thống bằng lệnh sau.

```bash
$ systemctl daemon-reload
```


