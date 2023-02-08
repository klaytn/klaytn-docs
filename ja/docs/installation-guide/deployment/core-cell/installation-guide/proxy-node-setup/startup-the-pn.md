# Startup the PN <a id="startup-the-pn"></a>

## プッシュ通知の開始/停止  <a id="pn-start-stop"></a>

You can start/stop the Klaytn service with the following `systemctl` command.

**Note**: This requires root privileges.

**start**

```bash
$ systemctl start kpnd.service

```

**stop**

```bash
$ systemctl stop kpnd.service

```

**status**

```bash
$ systemctl status kpnd.service

```

## Troubleshooting <a id="troubleshooting"></a>

If you meet the following error,

```bash
kpnd.serviceの開始に失敗しました: ユニットが見つかりません。
```

reload the systemd manager configuration with the following command.

```bash
$ systemctl daemon-reload
```


