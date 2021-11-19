# 계정 생성 <a id="creating-accounts"></a>

## 새로운 계정 생성 <a id="creating-a-new-account"></a>

이렇게 하면 새 계정이 만들어지고 화면에 주소가 인쇄됩니다. 키스토어(keystore) 파일은 데이터 디렉토리 아래에 작성됩니다.

**Klaytn 키스토어 파일**

계정을 생성하면 키스토어 파일이 생성됩니다. 키스토어 파일은 트랜잭션을 서명하는 데 사용할 고유한 Klaytn 개인키의 암호화 버전입니다. 키스토어 파일 이름의 형식은 다음과 같습니다.

* `UTC--<created_at UTC ISO8601>-<address hex>`

Klaytn 노드들 간에 전체 디렉토리 또는 개별 키스토어 파일을 전송하는 것은 안전합니다. 다른 노드에서 노드에 키들을 추가하는 경우 계정 순서가 변경 될 수 있음에 주의하세요. 따라서 스크립트 또는 코드 조각의 인덱스(index)에 의존하지 않아야 합니다.

### ken <a id="ken"></a>

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --password <passwordfile> --datadir <DATADIR>
$ ken account new --password <(echo $mypassword) --datadir <DATADIR>
```

**`경고`**: 암호 파일은 테스트 목적으로만 사용되어야 합니다. 암호를 파일에 저장하거나 다른 방법으로 노출시키는 것은 추천하지 않습니다. 비밀번호 파일에 비밀번호 플래그(flag)를 사용하는 경우, 파일을 본인 이외의 사람이 읽을 수 없고 나열할 수 없는지 확인하는 것이 좋습니다. 다음을 이용하면 이를 달성할 수 있습니다:

```bash
$ touch /path/to/password
$ chmod 700 /path/to/password
$ cat > /path/to/password
I type my pass here
^D
```

### 자바스크립트 콘솔 <a id="javascript-console"></a>

콘솔에서 다음 함수를 호출하여 계정을 만들 수 있습니다:

```javascript
> personal.newAccount("passphrase")
```

계정은 암호화된 형식으로 저장됩니다. 앞으로 계정을 잠금 해제하려면 **반드시** 이 패스프레이즈를 기억하세요.

## 계정 가져오기 <a id="importing-an-account"></a>

키파일(keyfile)을 사용하여 계정을 가져올 수 있습니다. 키파일은 16진법으로 인코딩된 표준 EC raw 바이트이며 암호화되지 않은 개인키를 포함한다고 가정됩니다. 간단히 말해서, `0x`로 시작하지 않는 일반 텍스트의 개인키입니다.

지정된 키파일에서 암호화되지 않은 개인키를 가져오고, 새 계정을 만들고, 데이터 디렉토리 아래에 키스토어 파일을 생성한 다음, 콘솔에서 주소를 보여줍니다. 앞으로 계정을 잠금 해제하려면 반드시 암호를 기억하세요.

**참고**: 키스토어 파일을 다른 Klaytn 인스턴스에 직접 복사 할 수 있으면, 이 가져오기/내보내기 메커니즘이 필요하지 않습니다.

### ken <a id="ken-1"></a>

```bash
$ ken account import <keyfile> --datadir <DATADIR>
$ ken account import --password <passwordfile> <keyfile> --datadir <DATADIR>
```

### 자바스크립트 콘솔 <a id="javascript-console-1"></a>

```bash
> personal.importRawKey('{private key}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"​

// Klaytn 지갑 키 사용
> personal.importRawKey('{private key}0x000x{address}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"
```



