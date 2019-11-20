# Startup the Service Chain <a id="startup-the-service-chain"></a>

Depending on your installation type, you can start/stop the Klaytn service with the following `systemctl`  or `kscnd` command.

**start**

```bash
## when installed from rpm distribution 
$ systemctl start kscnd.service

## when installed using linux archive
$ cd <install_path>/bin
$ ./kscnd start
```

**stop**

```bash
## when installed from rpm distribution 
$ systemctl stop kscnd.service

## when installed using linux archive
$ cd <install_path>/bin
$ ./kscnd stop
```


