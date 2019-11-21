# Startup the PN <a id="startup-the-pn"></a>

## PN Start/Stop  <a id="pn-start-stop"></a>

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

## Troubleshooting <a id="troubleshooting"></a>

If you meet the following error,

```bash
Failed to start kpnd.service: Unit not found.
```

reload the systemd manager configuration with the following command.

```bash
$ systemctl daemon-reload
```


