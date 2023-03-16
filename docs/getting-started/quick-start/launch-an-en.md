# Launch an Endpoint Node

## Download and Initialize an Endpoint Node (EN) <a href="#download-and-initialize-an-endpoint-node-en" id="download-and-initialize-an-endpoint-node-en"></a>

Unzip the provided [ken binary package](../../installation-guide/download/#get-the-packages) and copy the files into the klaytn folder.\
**Note**: Please download appropriate package starting with `ken`.

For Mac users, unzip the downloaded file with the following command.

```bash
$ tar zxf ken-baobab-vX.X.X-X-darwin-amd64.tar.gz
$ export PATH=$PATH:$PWD/ken-darwin-amd64/bin
```

For Linux users, unzip the downloaded file with the following command.

```bash
$ tar zxf ken-baobab-vX.X.X-X-linux-amd64.tar.gz
$ export PATH=$PATH:$PWD/ken-linux-amd64/bin
```

You should create a data directory to store the blockchain data. In this tutorial, we will create a `kend_home` folder in the home directory.

```bash
$ mkdir -p ~/kend_home
```

## Configuring the EN <a href="#configuring-the-en" id="configuring-the-en"></a>

The configuration file, `kend.conf`, is located under `ken-xxxxx-amd64/conf/`. For the details of configurable parameters, you can refer to the [EN Configuration Guide](../../operation-guide/configuration.md). To launch an EN of Baobab testnet, please update the `kend.conf` file accordingly as follows.

```
# cypress, baobab is only available if you don't specify NETWORK_ID.
NETWORK="baobab"
# if you specify NETWORK_ID, a private network is created.
NETWORK_ID=
...
RPC_API="klay,net" # net module should be opened for truffle later on.
...
DATA_DIR=~/kend_home
```

## Launching the EN <a href="#launching-the-en" id="launching-the-en"></a>

To launch the EN, execute the following command.

```bash
$ kend start
 Starting kend: OK
```

## Checking the EN <a href="#checking-the-en" id="checking-the-en"></a>

To check if the EN is running, execute the following command.

```bash
$ kend status
kend is running
```

## Checking the log of the EN <a href="#checking-the-log-of-the-en" id="checking-the-log-of-the-en"></a>

To check the log of the EN, execute the following command.

```bash
$ tail -f ~/kend_home/logs/kend.out
...
INFO[03/26,15:37:49 +09] [5] Imported new chain segment                blocks=1    txs=0  mgas=0.000  elapsed=2.135ms   mgasps=0.000    number=71340 hash=f15511…c571da cache=155.56kB
...
```

## Troubleshooting <a href="#troubleshooting" id="troubleshooting"></a>

Please refer to the [Troubleshooting](../../operation-guide/errors-and-troubleshooting.md) if you have trouble in launching the Klaytn Endpoint Node.
