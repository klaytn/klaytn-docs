# Khởi động CN <a id="startup-the-cn"></a>

## Bắt đầu/Dừng CN  <a id="cn-start-stop"></a>

Bạn có thể bắt đầu/dừng dịch vụ Klaytn bằng lệnh `systemctl` sau đây.

**Lưu ý**: Việc này yêu cầu quyền root.

**bắt đầu**

```bash
$ systemctl start kcnd.service

```

**dừng**

```bash
$ systemctl stop kcnd.service

```

**trạng thái**

```bash
$ systemctl trạng thái kcnd.service

```

## Khắc phục sự cố <a id="troubleshooting"></a>

Nếu bạn gặp lỗi sau,

```bash
Không thể bắt đầu kcnd.service: Không tìm thấy đơn vị.
```

tải lại cấu hình trình quản lý hệ thống bằng lệnh sau.

```bash
$ systemctl daemon-reload
```


