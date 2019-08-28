# Startup the CN

## CN Start/Stop <a id="cn-start-stop-status"></a>

You can start/stop the Klaytn service with the following `systemctl` command.

**Note**: the root access is required to control the installed files.

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

you might need to take the changed configuration with the following command.

```bash
$ systemctl daemon-reload
```

[  
](https://docs.klaytn.com/node/cc/installation/rpm/cnrpminstall)