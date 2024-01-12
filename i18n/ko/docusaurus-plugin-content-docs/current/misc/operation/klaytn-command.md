# 자주 쓰는 명령어

## 클레이튼 디렉터리(일반적으로 "클레이튼 DIR") 찾는 방법

***

클레이튼 디렉터리는 `kcn` 또는 `kpn` 설정에서 확인할 수 있습니다. 설정 파일은 `/etc/kcnd/conf` 또는 `/etc/kpnd/conf` 아래에 있습니다.

```bash
cat /etc/kcnd/conf/kcnd.conf (or /etc/kpnd/conf/kpnd.conf)

# Find DATA_DIR and LOG_DIR path as below example
DATA_DIR=/var/kcnd/data/
LOG_DIR=/var/kcnd/logs/
```

## 클레이튼 콘솔에 접속하는 방법

***

클레이튼 API에 연결하여 노드 및 네트워크 상태를 확인합니다.

```bash
# execute the command below in the Klaytn DATA_DIR Path
$ sudo kcn attach klay.ipc
> 
```

## 유용한 API

```bash
# Check current block Number
  > klay.blockNumber

# Check my kni address
  > admin.nodeInfo

# Check my dode address
  > governance.nodeAddress

# Check other connected nodes
  > admin.peers

# Add or remove nodes
  > admin.addPeer("kni")
  > admin.removePeer("kni")
```

## API 결과만 가져오기

```jsx
# execute the command below in the Klaytn DATA_DIR Path
$ sudo kcn attach --exec <statement> klay.ipc

e.g.
# Check my dode address
$ sudo kcn attach --exec "governance.nodeAddress" klay.ipc
"0xda23978e6e354fbf25dd87aaf1d1bb4ed112753f"
```
