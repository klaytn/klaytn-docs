# Configuration

본 문서는 Endpoint Node 속성의 환경 설정에 대해 안내합니다. Klaytn node package ships with good defaults and requires very little configuration. If you changed any settings of a running node, you must restart the node to reflect the changes.

## 환경 설정 파일 위치

* Proxy Node 환경 설정 시 `kend.conf`

The configuration file is located in the `conf` directory, whose default location depends on whether or not the installation is from an archive distribution \(`tar.gz`\) or a package distribution \(RPM\).

* 아카이브 배포의 경우 환경 설정 디렉토리의 위치가 `$INSTALL_PATH/ken-linux-amd64/conf/`으로 기본 설정되어 있습니다.
* 패키지 배포의 경우 환경 설정 디렉토리의 위치가 `/etc/kend/conf/`으로 기본 설정되어 있습니다.

## Configuration File Format

다음은 EN의 환경설정 파일 샘플로, `cypress`네트워크에 참여하고 블록체인 데이터를 기본 설정 위치에 저장하게 되어 있습니다. 이때 기본으로 설정된 블록체인 데이터 저장 위치는 아카이브 배포의 경우 `~/kend_home`, 패키지 배포의 경우 `/var/kend/data`입니다.

```text
# kend의 환경 설정 파일입니다.

# NETWORK_ID를 지정하지 않으면 cypress와 baobab만을 사용할 수 있습니다.
NETWORK="cypress"
# if you specify NETWORK_ID, a private network is created.
NETWORK_ID=
PORT=32323
SERVER_TYPE="fasthttp"
SYNCMODE="full"
VERBOSITY=3
MAXCONNECTIONS=10
# LDBCACHESIZE=10240

...

DATA_DIR=
LOG_DIR=$DATA_DIR/logs
```

아래와 같이 EN의 txpool 크기를 권장합니다.

```text
TXPOOL_EXEC_SLOTS_ALL=4096
TXPOOL_NONEXEC_SLOTS_ALL=4096
TXPOOL_EXEC_SLOTS_ACCOUNT=4096
TXPOOL_NONEXEC_SLOTS_ACCOUNT=4096
```

## Properties

The configuration file has the following configurable properties. 

<table>
  <thead>
    <tr>
      <th style="text-align:left">Name</th>
      <th style="text-align:left">설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">Name</td>
      <td style="text-align:left">설명</td>
    </tr>
    <tr>
      <td style="text-align:left">NETWORK</td>
      <td style="text-align:left">
        <p>Network name that this node will join.</p>
        <p>This value is used when NETWORK_ID is not defined.</p>
        <p>(&quot;cypress&quot;, &quot;baobab&quot;)</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">NETWORK_ID</td>
      <td style="text-align:left">
        <p>Klaytn network ID.</p>
        <p>If you create a local private network, you will define the network ID
          for your own.</p>
        <p>Following IDs are reserved for pre-configured networks.</p>
        <p>8217 : Cypress (Main network)</p>
        <p>1000 : Aspen test network</p>
        <p>1001 : Baobab test network</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">PORT</td>
      <td style="text-align:left">P2P port.</td>
    </tr>
    <tr>
      <td style="text-align:left">SERVER_TYPE</td>
      <td style="text-align:left">
        <p>JSON RPC server type.</p>
        <p>(&quot;http&quot;, &quot;fasthttp&quot;)</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">SYNCMODE</td>
      <td style="text-align:left">
        <p>Blockchain sync mode.</p>
        <p>(&quot;fast&quot;, &quot;full&quot;)</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">VERBOSITY</td>
      <td style="text-align:left">
        <p>Logging verbosity.</p>
        <p>(0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail)</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">MAXCONNECTIONS</td>
      <td style="text-align:left">
        <p>Maximum number of physical connections.</p>
        <p>All single-channel peers can have up to <code>MAXCONNECTIONS</code> peers.</p>
        <p>All multi-channel peers can have up to <code>MAXCONNECTIONS</code>/2 peers.</p>
        <p>Network connection is disabled if it is set to 0.</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">LDBCACHESIZE</td>
      <td style="text-align:left">Size of in-memory cache in LevelDB (MiB).</td>
    </tr>
    <tr>
      <td style="text-align:left">TXPOOL_EXEC_SLOTS_ALL</td>
      <td style="text-align:left">Maximum number of executable transaction slots for all accounts.</td>
    </tr>
    <tr>
      <td style="text-align:left">TXPOOL_NONEXEC_SLOTS_ALL</td>
      <td style="text-align:left">Maximum number of non-executable transaction slots for all accounts.</td>
    </tr>
    <tr>
      <td style="text-align:left">TXPOOL_EXEC_SLOTS_ACCOUNT</td>
      <td style="text-align:left">Number of executable transaction slots guaranteed per account.</td>
    </tr>
    <tr>
      <td style="text-align:left">TXPOOL_NONEXEC_SLOTS_ACCOUNT</td>
      <td style="text-align:left">Maximum number of non-executable transaction slots guaranteed per account.</td>
    </tr>
    <tr>
      <td style="text-align:left">TXPOOL_LIFE_TIME</td>
      <td style="text-align:left">Maximum amount of time non-executable transactions is queued.</td>
    </tr>
    <tr>
      <td style="text-align:left">RPC_ENABLE</td>
      <td style="text-align:left">Enable the HTTP-RPC server if it is set to 1.</td>
    </tr>
    <tr>
      <td style="text-align:left">RPC_API</td>
      <td style="text-align:left">
        <p>Comma-separated list of APIs offered over the HTTP-RPC interface.</p>
        <p>(admin, debug, klay, miner, net, personal, rpc, txpool, web3)</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">RPC_PORT</td>
      <td style="text-align:left">HTTP-RPC server listening port.</td>
    </tr>
    <tr>
      <td style="text-align:left">RPC_ADDR</td>
      <td style="text-align:left">HTTP-RPC server listening interface.</td>
    </tr>
    <tr>
      <td style="text-align:left">RPC_CORSDOMAIN</td>
      <td style="text-align:left">Comma-separated list of domains from which to accept cross-origin requests
        (browser enforced)</td>
    </tr>
    <tr>
      <td style="text-align:left">RPC_VHOSTS</td>
      <td style="text-align:left">Comma-separated list of virtual hostnames from which to accept requests
        (server enforced). Accepts &apos;*&apos; wildcard.</td>
    </tr>
    <tr>
      <td style="text-align:left">WS_ENABLE</td>
      <td style="text-align:left">Enable the WS-RPC server if it is set to 1.</td>
    </tr>
    <tr>
      <td style="text-align:left">WS_API</td>
      <td style="text-align:left">
        <p>APIs offered over the WS-RPC interface.</p>
        <p>(admin, debug, klay, miner, net, personal, rpc, txpool, web3)</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">WS_ADDR</td>
      <td style="text-align:left">WS-RPC server listening interface.</td>
    </tr>
    <tr>
      <td style="text-align:left">WS_PORT</td>
      <td style="text-align:left">WS-RPC server listening port.</td>
    </tr>
    <tr>
      <td style="text-align:left">WS_ORIGINS</td>
      <td style="text-align:left">Origins from which to accept websockets requests.</td>
    </tr>
    <tr>
      <td style="text-align:left">SC_MAIN_BRIDGE</td>
      <td style="text-align:left">Enable main bridge service if it is set to 1. Used for service chain configuration.</td>
    </tr>
    <tr>
      <td style="text-align:left">SC_MAIN_BRIDGE_PORT</td>
      <td style="text-align:left">Main bridge listens on this port.</td>
    </tr>
    <tr>
      <td style="text-align:left">SC_MAIN_BRIDGE_INDEXING</td>
      <td style="text-align:left">Enable storing transaction hash of child chain transactions for fast access
        to child chain data if it is set to 1.</td>
    </tr>
    <tr>
      <td style="text-align:left">METRICS</td>
      <td style="text-align:left">Enable metrics collection and reporting if it is set to 1.</td>
    </tr>
    <tr>
      <td style="text-align:left">PROMETHEUS</td>
      <td style="text-align:left">Enable prometheus exporter if it is set to 1.</td>
    </tr>
    <tr>
      <td style="text-align:left">DB_NO_PARALLEL_WRITE</td>
      <td style="text-align:left">Disable parallel writes of block data to persistent database if it is
        set to 1.</td>
    </tr>
    <tr>
      <td style="text-align:left">MULTICHANNEL</td>
      <td style="text-align:left">Create a dedicated channel for block propagation if it is set to 1.</td>
    </tr>
    <tr>
      <td style="text-align:left">SUBPORT</td>
      <td style="text-align:left">Listening sub port number if multichannel option is enabled.</td>
    </tr>
    <tr>
      <td style="text-align:left">NO_DISCOVER</td>
      <td style="text-align:left">Turn off the discovery option if it is set to 1.</td>
    </tr>
    <tr>
      <td style="text-align:left">BOOTNODES</td>
      <td style="text-align:left">Comma-separated kni addresses of bootstrap nodes.</td>
    </tr>
    <tr>
      <td style="text-align:left">ADDITIONAL</td>
      <td style="text-align:left">For additional command-line options. e.g) --txpool.nolocals</td>
    </tr>
    <tr>
      <td style="text-align:left">DATA_DIR</td>
      <td style="text-align:left">Klaytn blockchain data folder path.</td>
    </tr>
    <tr>
      <td style="text-align:left">LOG_DIR</td>
      <td style="text-align:left">Log folder path.</td>
    </tr>
  </tbody>
</table>