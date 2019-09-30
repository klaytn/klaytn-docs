# Starting/Stopping Core Cell

## CN Start/Stop

You can start/stop the Klaytn service with the following `systemctl` command.

**Note**: This requires root privileges.

**start**

```bash
$ systemctl start kcnd.service

```

**stop**

```bash
$ systemctl stop kcnd.service

```

**status**

```bash
$ systemctl status kcnd.service

```

## PN Start/Stop

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

## 문제 해결

If you meet the following error,

```bash
Failed to start kcnd.service: Unit not found.
Failed to start kpnd.service: Unit not found.
```

reload the systemd manager configuration with the following command.

```bash
$ systemctl daemon-reload
```


