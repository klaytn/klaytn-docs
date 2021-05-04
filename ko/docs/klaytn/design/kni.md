# KNI <a id="KNI"></a>

**KNI (Klaytn Network Identifier)**는 Klaytn 노드를 식별하기 위한 URL 스킴입니다. 신택스는 다음과 같습니다.
```
kni://<nodeID>@<hostname>:<port>?subport=<subport>&discport=<discport>
```
![KNI scheme](../images/kni_scheme.png)

**nodeID**는 노드의 개인키에 상응하는 512비트 공개키입니다. P2P 네트워크에서 피어들과의 소통을 검증하는 데 사용됩니다.

**hostname**은 `@`와 `:` 사이에 위치한 노드의 주소를 나타냅니다. 주소 형식은 다음 중 하나를 취합니다.
* IPv4 dotted decimal (`192.0.2.1`)
* IPv6 (`[2001:db8::68]`)
* IPv4-mapped IPv6 (`[2001:db8:3c4d:15::abcd:ef12]`)
* 도메인명 (`your.node.com`)

**port**는 TCP를 통해 피어 노드들과 연결하기 위해 사용됩니다. Klaytn의 경우 `port`의 기본값은 `32323`이며, `subport`의 기본값은 `32324`입니다. `subport`의 기본값은 `kend.conf`에 `port + 1`라고 설정되어 있습니다. Depending on the number of TCP listening ports, Klaytn offers two [types of connections](./multiport.md).

**discport** is used for checking if the known neighbors are reachable klaytn nodes and fetching their neighbors' addresses for new connections. 이것은 UDP port라는 점을 유의하십시오. 기본값으로 UDP port, 또는 `discport`는 TCP port와 같은 port를 사용합니다. 노드가 `discport`에 다른 port를 사용한다면, `discport` 쿼리 파라미터를 통해 지정될 수 있습니다.

이하의 두 URL은 IP 주소가 `10.0.0.1`, TCP listening port가 `32323`와 `32324`인 KNI 예시입니다. `discport`가 생략될 시 UDP port `32323`로 지정되며, 이는 `port` 값과 동일합니다.
```
kni://a979...163c@10.0.0.1:32323                 # either single-channel or multi-channel peer with omitted subport
kni://a979...163c@10.0.0.1:32323?subport=32324   # multi-channel peer
```

이하의 두 URL은 `discport`가 `30301`인 노드의 KNI의 예시입니다.
```
kni://a979...163c@10.0.0.1:32323?discport=30301                 # either single-channel or multi-channel peer with omitted subport
kni://a979...163c@10.0.0.1:32323?subport=32324&discport=30301   # multi-channel peer
```

노드의 KNI 생성에 대해 더 알고 싶으시다면, [Node Key & Node URI Creation](../../node/core-cell/installation-guide/before-you-install.md#node-key-node-uri-creation)를 참고하세요. 노드 발견 프로토콜에는 KNI 스킴이 사용되며, [`static-nodes.json` file](../../node/core-cell/installation-guide/proxy-node-setup/configuration.md#install-static-nodes-json), [addPeer API](../../bapp/json-rpc/api-references/admin.md#admin_addpeer), [bootnodes option](../../node/endpoint-node/operation-guide/configuration.md#properties) 등을 설정합니다.
