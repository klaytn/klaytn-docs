# Startup the CN <a id="startup-the-cn"></a>

## CN Start/Stop  <a id="cn-start-stop"></a>

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

## Troubleshooting <a id="troubleshooting"></a>

If you meet the following error,

```bash
Failed to start kcnd.service: Unit not found.
```

reload the systemd manager configuration with the following command.

```bash
$ systemctl daemon-reload
```

## Export BLS public key info <a id="export-bls-public-key-info"></a>

If the network has activated or will activate the Randao hardfork, each CN maintainer must submit its BLS public key info to the [KIP-113 smart contract](https://kips.klaytn.foundation/KIPs/kip-113).

The BLS public key info can be calculated from the nodekey. To extract it, first start the node. Then use the command:

```
$ kcn account bls-info --datadir /var/kcnd/data
```

As a result, `bls-publicinfo-NODEID.json` file will be created.
