# 시스템 요구사항

Endpoint Node (EN)를 실행하려면 이더리움이나 다른 블록체인에 비해 더 좋은 성능의 하드웨어가 필요합니다. 왜냐하면 엔터프라이즈급 하드웨어가 장착된 완전한 합의 노드가 블록을 생성하면 EN이 그것을 검증해야 하기 때문입니다.

EN에는 다음 사양을 권장합니다.

## 하드웨어 사양

### 클라우드 VM

#### AWS 권장 사양

| 모델명                      | vCPU 수 | 메모리 (GiB) | 스토리지 (GiB) | EBS 대역폭 (Mbps) | 네트워크 대역폭 (Gbps) | 가격 (서울 지역, USD/h) |
|:------------------------ |:------ |:--------- |:---------- |:-------------- |:--------------- |:----------------- |
| m5.2xlarge (recommended) | 8      | 32        | EBS 전용     | 3,500          | 최대 10           | 0.472             |

The information above is from [https://aws.amazon.com/ec2/instance-types/](https://aws.amazon.com/ec2/instance-types/) and [https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/) and may be changed by AWS.

### 베어 머신

EN에 대한 정확한 물리적 명세를 지정하지는 않지만, 클라우드 VM 섹션과 유사한 하드웨어 구성을 가진 시스템이라면 EN을 운용하기에 충분합니다.

## 스토리지 요구사항

Assuming 100 TPS in average,  300 bytes average transaction size, and 1-second block latency, the expected EN daily storage requirement is 2.5 GB/day (=300x100x86400).

## 운영 체제

Recommended environment is [Amazon Linux 2](https://aws.amazon.com/ko/about-aws/whats-new/2017/12/introducing-amazon-linux-2/). Klaytn binaries are fully tested on Amazon Linux 2, but they should work on other linux-based environments as well. macOS binaries are also provided for development purpose. 

