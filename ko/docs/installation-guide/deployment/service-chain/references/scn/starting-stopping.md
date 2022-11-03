# SCN 실행 및 중지<a id="starting-stopping-scn"></a>

설치 유형에 따라 다음 `systemctl`  또는 `kscnd` 명령을 사용하여 Klaytn 서비스를 시작/중지할 수 있습니다.

**실행**

```bash
## when installed from rpm distribution 
$ systemctl start kscnd.service

## when installed using linux archive
$ kscnd start

```

**중지**

```bash
## when installed from rpm distribution 
$ systemctl stop kscnd.service

## when installed using linux archive
$ kscnd stop

```

**상태**

```bash
## when installed from rpm distribution 
$ systemctl status kscnd.service

## when installed using linux archive
$ kscnd status

```


