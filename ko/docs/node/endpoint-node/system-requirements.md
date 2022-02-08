# 시스템 요구사항 <a id="system-requirements"></a>

엔드포인트 노드(EN)를 실행하려면 이더리움이나 다른 블록체인에 비해 더 좋은 성능의 하드웨어가 필요합니다. 왜냐하면 엔터프라이즈급 하드웨어가 장착된 완전한 컨센서스 노드가 블록을 생성하면 EN이 그것을 검증해야 하기 때문입니다.

EN에는 다음 사양을 권장합니다.

## 하드웨어 사양 <a id="h-w-specification"></a>

### 클라우드 VM <a id="cloud-vm"></a>

#### Recommended Specification <a id="recommended-specification-based-on-aws"></a>

| vCPU 수 | Memory (GiB) | Storage (GiB) | Disk Bandwidth (Mbps) | Network Bandwidth (Gbps) |
|:------ |:------------ |:------------- |:--------------------- |:------------------------ |
| 8      | 64           | > 3,000       | 3,500                 | Up to 10                 |

### 베어 머신 <a id="bare-metal-machine"></a>

We do not specify the exact physical machine specification for EN, but any physical machine having hardware configuration similar to the one in the Cloud VM section would be sufficient to operate an EN.

## 스토리지 요구사항 <a id="storage-requirements"></a>

Assuming 100 TPS in average,  300 bytes average transaction size, and 1-second block latency, the expected EN daily storage requirement is 2.5 GB/day (=300x100x86400).

## 운영 체제 <a id="operating-system"></a>

[Amazon Linux 2](https://aws.amazon.com/ko/about-aws/whats-new/2017/12/introducing-amazon-linux-2/) 환경을 권장합니다. Klaytn 바이너리는 Amazon Linux 2에서 충분히 테스트 되었고, 리눅스 기반의 다른 환경에서도 가능합니다. 또한 개발 지원을 위해 macOS 용 바이너리도 제공하고 있습니다. 

