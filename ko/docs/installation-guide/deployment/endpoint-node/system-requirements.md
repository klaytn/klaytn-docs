# 시스템 요구사항 <a id="system-requirements"></a>

엔드포인트 노드(EN)를 실행하려면 이더리움이나 다른 블록체인에 비해 더 좋은 성능의 하드웨어가 필요합니다. 엔터프라이즈급 하드웨어가 장착된 완전한 컨센서스 노드가 블록을 생성하면 EN이 그것을 검증해야 하기 때문입니다.

EN에는 다음 사양을 권장합니다.

## 하드웨어 사양 <a id="h-w-specification"></a>

### 클라우드 VM <a id="cloud-vm"></a>

#### 권장 사양<a id="recommended-specification-based-on-aws"></a>

| vCPU 수 | 메모리(GiB) | 스토리지(GiB) | 디스크 대역폭(Mbps) | 네트워크 대역폭(Gbps) |
|:------ |:-------- |:--------- |:------------- |:-------------- |
| 8      | 64       | > 3,000   | 3,500         | 최대 10          |

### 베어 머신 <a id="bare-metal-machine"></a>

EN에 대한 정확한 물리적 사양을 지정하지는 않지만, 클라우드 VM 장과 유사한 하드웨어 구성을 가진 시스템이라면 EN을 운용하기에 충분합니다.

## 스토리지 요구사항 <a id="storage-requirements"></a>

평균 100 TPS, 평균 트랜잭션 크기 300 바이트, 그리고 1초의 블록 생성 시간을 가정 할 때 예상되는 EN 스토리지 요구 사항은 2.5GB/1일(= 300x100x86400)입니다.

## 운영 체제 <a id="operating-system"></a>

[Amazon Linux 2](https://aws.amazon.com/ko/about-aws/whats-new/2017/12/introducing-amazon-linux-2/) 환경을 권장합니다. Klaytn 바이너리는 Amazon Linux 2에서 충분히 테스트 되었고, 리눅스 기반의 다른 환경에서도 동작합니다. 또한 개발 지원을 위해 macOS 용 바이너리도 제공하고 있습니다. 

