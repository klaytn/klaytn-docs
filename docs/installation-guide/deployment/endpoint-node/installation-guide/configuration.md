# Configuration <a id="configuration"></a>

The EN configuration is to create a data directory and to set up the environment variables on the configuration file `kend.conf`.

1. Create the EN data directory.
2. Configure the EN with `kend.conf`.

## EN Data Directory Creation <a id="en-data-directory-creation"></a>

Considering the fact that the size of Klaytn blockchain data keeps increasing, it is recommended to use a big enough storage. You need to create the directory on your desired path.

```text
$ sudo mkdir -p /var/kend/data
```

## Update the Configuration File <a id="update-the-configuration-file"></a>

Configuration File Location:

* For the archive distribution, the config directory location defaults to `$INSTALL_PATH/ken-linux-amd64/conf/`.
* For the package distribution, the config directory defaults to `/etc/kend/conf/`.

### Add Data Directory  <a id="add-data-directory"></a>

You should update the data directory environment variable `$DATA_DIR` on the configuration file `kend.conf`.

```text
DATA_DIR=/var/kend/data
```

## Fast Sync \(Optional\) <a id="fast-sync-optional"></a>

Each EN maintains a copy of the network's chain data. If a node is out of sync, it can obtain this data from other nodes in the network -- a process known as syncing. When a new EN is first started, it must download the entire chain data from the network.

To accelerate this process, you may perform a fast sync by downloading a snapshot of the chain data before starting the EN. This can dramatically reduce the time the EN will spend syncing on first start.

Download the latest chaindata snapshot from the [Cypress snapshot archive](http://packages.klaytn.net/cypress/chaindata/) or [Baobab snapshot archive](http://packages.klaytn.net/baobab/chaindata/). Before starting `kend`, extract the snapshot inside the DATA\_DIR you configured in `kend.conf`.

For example:

```bash
$ tar -C ~/kend_home -xvf klaytn-cypress-chaindata-latest.tar.gz
```

Or,

```bash
$ tar -C ~/kend_home -xvf klaytn-baobab-chaindata-latest.tar.gz
```

After the data is extracted, you may start the EN normally.

You can refer to detailed information in the [Chaindata change](../../../../operation-guide/chaindata-change.md)

##  <a id="en-start-stop-status"></a>

