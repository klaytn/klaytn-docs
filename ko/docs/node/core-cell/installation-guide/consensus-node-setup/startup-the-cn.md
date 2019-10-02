# Startup the CN

## CN Start/Stop

You can start/stop the Klaytn service with the following `systemctl` command.

**Note**: This requires root privileges.

**실행**

```bash
$ systemctl start kcnd.service

```

**중지**

```bash
$ systemctl stop kcnd.service

```

## 문제 해결

If you meet the following error,

```bash
Failed to start kcnd.service: Unit not found.
```

reload the systemd manager configuration with the following command.

```bash
$ systemctl daemon-reload
```


