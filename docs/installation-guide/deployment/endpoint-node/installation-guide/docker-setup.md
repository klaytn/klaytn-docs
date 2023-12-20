# Serving a node with docker container <a id="docker-setup"></a>

## In this tutorial, you learn how to setup EN node via docker container. Follow the each steps.

### Run the klytn dokcer image with the following command.
`docker run -it -p 8551:8551 -v /opt/klaytn:/klaytn-docker-pkg/data klaytn/klaytn /bin/bash`
Chaindata directory is mounted from host `/opt/klaytn` to container `/klaytn-docker-pkg/data`.

### Edit a configuration file
```
cd /klaytn-docker-pkg
open `conf/kend,conf` (e.g., vi conf/kend.conf)
edit the `DATA_DIR` line as follows
DATA_DIR=/klaytn-docker-pkg/data
```

### Chain initialization
Download a genesis confgiuration of Cypress network.
`wget https://packages.klaytn.net/cypress/genesis.json` (For baobab network, replace the URL with `https://packages.klaytn.net/cypress/genesis.json`)

Now you that fetched it, intiailization can be fired by the following command.
`cd bin; ./ken init --datadir ../data ../genesis.json`

All the prepration is done. You can sync the Cypress network blocks.
```
./ken attach --datadir ../data
> klay.blockNumber
384
```

### (Optional) Chaindata snapshot
Synching from genesis block is time-consuming. Klaytn officially provides a chaindata snapshot.
1. Go `https://packages.klaytn.net/cypress/chaindata/` and download chaindata.
2. Decompress the downloded one
3. Replace the decompressed one with `/klaytn-docker-pkg/data`
