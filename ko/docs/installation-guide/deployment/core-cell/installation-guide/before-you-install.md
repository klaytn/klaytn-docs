# 설치하기 전에 <a id="before-you-install"></a>

Klaytn 패키지를 설치하기 전에, 노드 URI를 등록하기 위해 연관된 노드 정보를 작성해야 합니다. Kgen 패키지가 CC 운영자를 위해 제공됩니다. 아래 순서대로 진행해주세요.

1. `kgen` 패키지 다운로드
2. Node Key & 노드 URI 생성
3. 노드 URI 등록

## `kgen` 패키지 다운로드 <a id="download-kgen-package"></a>

우선, 운영 체제에 따라 [Download](download.md) 페이지에서 최신 버전의 `kgen` 패키지를 다운로드합니다.

`bin` 디렉토리에서 `kgen` 바이너리를 찾을 수 있습니다.

## 노드 키 & 노드 URI 생성 <a id="node-key-node-uri-creation"></a>

노드 키와 노드 URI는 처음에 한 번만 생성됩니다. 노드 URI는 코어 셀 네트워크의 다른 코어 셀과 공유되어야 합니다. CN은 다른 CN에 연결되고 PN은 작성된 노드 URI를 사용하여 CN 및 일부 PN에 연결됩니다. 다운로드 한 `kgen`을 사용하여 노드 키를 기반으로 노드 URI가 생성됩니다. 아래 커맨드라인은 `nodekey`와 `node_info.json`를 생성합니다.

`kgen`는 다음과 같은 관련된 IP 및 포트 번호를 갖습니다.

```text
$ kgen --ip "123.456.789.012" --port 32323 --file
$ ls
nodekey node_info.json
```

`nodekey`는 노드에서 내부적으로 사용되는 개인키인 64바이트 16진수 문자열입니다. 이 개인키는 Klaytn 데이터 디렉토리에 있어야 하며 잃어버리지 않도록 주의해야 합니다.

```text
$ cat nodekey
f08f2118c455a6c9c9b5e035d3571e570a719ea61771e268546e796a264acc2b
$ mv nodekey ~/kcnd_home
```

생성된 `node_info.json` 파일은 다음 내용을 포함합니다.

| 키 이름        | 설명             | 예시                                                                                                                                                                      |
|:----------- |:-------------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NodeAddress | 연관된 노드들의 주소    | 0xc8a23d67f2471066fa1b07270651fea7e5c0cf78                                                                                                                              |
| NodeKey     | 노드 키 \(개인키\) | aaa7248dfdf19418ae9121a0f39db39c5c27a3e404ea7c1b8e020ca8dbe7e71a                                                                                                        |
| NodeURI     | 노드 URI         | kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0 |

`node_info.json`는 다음과 같이 JSON 형식의 노드 정보를 포함합니다.

```text
$ cat node_info.json
{
    "NodeAddress": "0xc8a23d67f2471066fa1b07270651fea7e5c0cf78",
    "NodeKey": "aaa7248dfdf19418ae9121a0f39db39c5c27a3e404ea7c1b8e020ca8dbe7e71a",
    "NodeURI": "kni://4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0"
}
```

## 노드 URI 등록 <a id="node-uri-enrollment"></a>

작성된 노드 URI는 Core Cell Network \(CCN\)에 참여하도록 등록해야 합니다. 등록 절차는 다음과 같습니다.

1. 관련 IP 및 포트 번호를 포함하는 `kgen` \(`node_info.json`\)을 사용하여 노드 URI를 생성합니다.
2. Klaytn 공식 이메일로 정보를 전송합니다. (Cypress에 대해 `bootstrap@klaytn.com` 또는 Baobab에 대해 `baobab@klaytn.com`\).

등록된 정보는 공식 Klaytn 이메일 주소로 보내야 합니다. 양식은 아래와 같습니다.

CN의 경우,

```text
Company: Kakao
CN URI : kni://
4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0
```

PN의 경우,

```text
Company: Kakao
PN URI : kni://
4f2f47f3bf35a2c576d3345e6e9c49b147d510c05832d2458709f63c3c90c76ead205975d944ed65e77dd4c6f63ebe1ef21d60da95952bc1e200e7487f4d9e1b@123.456.789.012:32323?discport=0
```

