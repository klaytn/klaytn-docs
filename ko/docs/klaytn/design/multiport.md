# 다중 채널<a id="multi-channel"></a>

Klaytn 노드는 **다중 채널**로 운영될 수 있습니다.

노드가 다중 채널로 실행될 경우 커뮤니케이션을 위해 두 개의 포트가 설치됩니다. 단일 채널로 노드가 실행될 시, 하나의 포트만 설치됩니다. 두 다중 채널 노드가 연결될 때 두 개의 포트가 사용됩니다. 그 외의 경우에는 하나의 포트가 사용됩니다.

다중 채널 노드는  `--multichannel` 플래그를 통해 활성화될 수 있습니다. [`kend`](../../node/endpoint-node/operation-guide/starting-stopping-en.md)를 사용할 경우 `MULTICHANNEL=1` in [`kend.conf`](../../node/endpoint-node/operation-guide/configuration.md) 선언문에 의해 다중 채널이 기본값으로 활성화됩니다.  다중 채널을 비활성화하기 위해서는 선언문을 `MULTICHANNEL=0`로 대체하면 됩니다. 특정 포트를 사용해 노드를 운영하고 싶다면 `port`와 `subport` 플래그가 사용될 수 있습니다. 연결되는 피어의 포트 값을 특정하고 싶다면 [KNI](./kni.md)를 확인해세요.

## 구조<a id="architecture"></a>

![Multi-Channel Server](../images/multichannel.png)

위의 그림은 두 다중 채널 노드 간의 연결을 보여줍니다. 메인포트(A)와 서브포트(B) 두 포트는 다른 메시지를 전달합니다.
* **메인포트**(A)는 블록과 합의 프로토콜 관련 메시지 전달에 사용됩니다.
  * 블록 메시지는 해시, 헤더, 바디, 그리고 블록 영수증에 대한 요청과 응답을 포함합니다.
  * 합의 메시지는 Request, Preprepare, Prepare, Commit, 그리고 RoundChange 등을 포함합니다. 이 메시지들의 의미는 [PBFT](./consensus-mechanism.md#pbft-practical-byzantine-fault-tolerance)에서 찾을 수 있습니다.
* **서브포트**(B)는 트랜잭션 메시지 전달을 위한 것입니다.

![Single Channel Server](../images/singlechannel.png)

이 그림은 두 단일 채널 노드 간, 또는 단일 채널 노드와 다중 채널 노드 간의 연결을 나타냅니다. 이 경우, 블록, 트랜잭션, 합의 프로토콜에 관련된 모든 메시지들은 동일한 포트를 통해 전달됩니다.

## 포트<a id="multichannel-port"></a>

KNI에서 포트 번호를 설정하고 싶다면 [KNI 스킴](./kni.md)을 참고하세요.
* 단일 채널 : 단일 채널 노드는 하나의 포트를 사용합니다 (기본값은 32323입니다).
* 다중 채널: 다중 채널 노드는 두 개의 포트를 사용합니다. 이 포트들은 `port`와 `subport`로 특정될 수 있습니다. Klaytn에서는 `port`와 `subport`의 기본값이 각각 32323과 32324입니다.
    * 다중 채널 노드에 연결할 때는 `subport`를 설정하지 않아도 됩니다. 이 경우 처음에 Klaytn 노드는 단일 채널을 사용해 연결을 하려고 할 것입니다. 핸드셰이크 과정에서 실제 피어의 포트 번호가 드러납니다. 피어가 다중 채널 노드라면, 지속 중인 연결은 취소되고 업데이트된 포트로 재연결될 것입니다.
