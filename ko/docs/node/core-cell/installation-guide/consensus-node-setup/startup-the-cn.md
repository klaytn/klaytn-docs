# Startup the CN

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

## Troubleshooting

If you meet the following error,

```bash
Failed to start kcnd.service: Unit not found.
```

reload the systemd manager configuration with the following command.

```bash
$ systemctl daemon-reload
```