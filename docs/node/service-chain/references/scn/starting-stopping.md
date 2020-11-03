# Starting/Stopping SCN

Depending on your installation type, you can start/stop the Klaytn service with the following `systemctl` or `kscnd` command.

**start**

```bash
## when installed from rpm distribution 
$ systemctl start kscnd.service

## when installed using linux archive
$ kscnd start
```

**stop**

```bash
## when installed from rpm distribution 
$ systemctl stop kscnd.service

## when installed using linux archive
$ kscnd stop
```

**status**

```bash
## when installed from rpm distribution 
$ systemctl status kscnd.service

## when installed using linux archive
$ kscnd status
```

