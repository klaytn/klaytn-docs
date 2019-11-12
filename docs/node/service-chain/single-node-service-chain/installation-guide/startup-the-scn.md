# Startup the Service Chain <a id="startup-the-service-chain"></a>

Depending on your installation type, you can start/stop the Klaytn service with the following `systemctl`  or `kscnd` command.

**start**

```bash
## when installed from rpm distribution 
$ systemctl start kscnd.service

## when installed using linux archive
$ kscnd start

## when installed the uncompression of the downloaded package.
$ cd bin
$ ./kscnd start
```

**stop**

```bash
## when installed from rpm distribution 
$ systemctl stop kscnd.service

## when installed using linux archive
$ kscnd stop

## when installed the uncompression of the downloaded package.
$ cd bin
$ ./kscnd stop
```


