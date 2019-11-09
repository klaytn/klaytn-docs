# Klaytn 자체 코인 - KLAY <a id="klaytn-native-coin-klay"></a>

## KLAY <a id="klay"></a>

KLAY는 Klaytn에서 전송 가능한 주요 내부 암호화폐입니다. Klay는 스마트 컨트랙트 작성 및 실행 또는 KLAY를 전송할 때 트랜잭션 수수료를 지불하기 위해 사용됩니다.

KLAY는 Klaytn이라는 분산형 애플리케이션 플랫폼을 작동시키기 위해 필수적인 연료 역할을 합니다. Klay는 요청된 연산을 처리하는 컨센서스 노드\(CNs\)에 플랫폼의 클라이언트가 비용을 지불할 때 사용하는 수단입니다. 다시 말해, KLAY는 인센티브입니다. 이는 개발자가 우수한 애플리케이션 \(낭비적인 코드는 비용을 증가 시킴\)을 만들고, 네트워크가 양호한 상태(CN 및 RN은 기여한 리소스에 대해 보상받음\)로 유지되도록 만듭니다.

## KLAY의 단위 <a id="units-of-klay"></a>

Klaytn은 KLAY에 다음과 같은 단위 시스템을 사용합니다.

* `peb`는 가장 작은 화폐 단위입니다.
* `ston`은 `Gpeb`의 별명으로 편의를 위해 만들어졌습니다.
* `KLAY`는 10^18 peb입니다.

| 단위    | peb 가치    | peb                                       |
|:----- |:--------- |:----------------------------------------- |
| peb   | 1 peb     | 1                                         |
| kpeb  | 10^3 peb  | 1,000                                     |
| Mpeb  | 10^6 peb  | 1,000,000                                 |
| Gpeb  | 10^9 peb  | 1,000,000,000                             |
| ston  | 10^9 peb  | 1,000,000,000                             |
| uKLAY | 10^12 peb | 1,000,000,000,000                         |
| mKLAY | 10^15 peb | 1,000,000,000,000,000                     |
| KLAY  | 10^18 peb | 1,000,000,000,000,000,000                 |
| kKLAY | 10^21 peb | 1,000,000,000,000,000,000,000             |
| MKLAY | 10^24 peb | 1,000,000,000,000,000,000,000,000         |
| GKLAY | 10^27 peb | 1,000,000,000,000,000,000,000,000,000     |
| TKLAY | 10^30 peb | 1,000,000,000,000,000,000,000,000,000,000 |

#### KLAY 단위와 관련된 API <a id="apis-related-to-klay-units"></a>

`klay.toPeb`와 `klay.fromPeb`은 KLAY 단위 변환을 위해 사용되는 편리한 API입니다.

```text
$ ./klay attach data/dd/klay.ipc
...
> klay.fromPeb(25, "peb")
"25"
> klay.fromPeb(25, "Gpeb")
"0.000000025"
> klay.fromPeb(25, "ston")
"0.000000025"
> klay.fromPeb(25, "KLAY")
"0.000000000000000025"
> klay.toPeb(25, "peb")
"25"
> klay.toPeb(25, "ston")
"25000000000"
> klay.toPeb(25, "KLAY")
"25000000000000000000"
```

`klay.toPeb`이나 `klay.fromPeb`에 아래와 같이 부적합한 단위를 기입하면 지원되는 KLAY 단위의 목록을 볼 수 있습니다.

```text
> klay.toPeb(1, "something-does-not-exist")
Error: This unit doesn't exist, please use one of the following units
(이 단위는 존재하지 않습니다. 아래의 목록 중에 하나를 사용해 주세요.)
"noKLAY": "0"
"peb": "1"
"kpeb": "1000"
"Mpeb": "1000000"
"Gpeb": "1000000000"
"ston": "1000000000"
"uKLAY": "1000000000000"
"mKLAY": "1000000000000000"
"KLAY": "1000000000000000000"
"kKLAY": "1000000000000000000000"
"MKLAY": "1000000000000000000000000"
"GKLAY": "1000000000000000000000000000"
"TKLAY": "1000000000000000000000000000000"

    at web3.js:2170:19
    at web3.js:2255:49
```



