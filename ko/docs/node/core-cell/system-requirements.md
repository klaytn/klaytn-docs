# 시스템 요구사항 <a id="system-requirements"></a>

## 하드웨어 사양 <a id="h-w-specification"></a>

네트워크 성능은 네트워크 내 가장 성능이 떨어지는 하드웨어 사양에 따라 측정됩니다. 블록체인 네트워크 구조에서는 수직적 확장\(하드웨어 용량 증가\)만 가능합니다. 따라서 네트워크 내의 모든 노드는 적어도 최상 수준의 서로 비슷한 사양을 가진 하드웨어로 구성하는 것을 추천합니다.

다음 장에서는 CN 및 PN 권장 사양을 보여줍니다.

### 베어메탈 서버 <a id="bare-metal-server"></a>

| 카테고리          | 사양                                                                                                                                                                          |
|:------------- |:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 서버            | Intel® Server System R2312WFTZS                                                                                                                                             |
| CPU           | Intel® Xeon 6148 2.40 GHz \(20-core/40-thread\) \* 2EA \(total 40-core/80-thread\)                                                                                    |
| 메모리           | 256GB \(32GB \* 8\)                                                                                                                                                     |
| 스토리지(Storage) | 3TB (or larger size) SSD (The preferred storage size and configuration could differ depending on the chain data size. Please consult the Klaytn Team for more information.) |

이는 CN 및 PN에 권장되는 하드웨어 사양이며, 정확히 필요한 요구 사항은 아닙니다. Any physical machine with similar hardware configurations would be sufficient to operate a CN or a PN.

### 클라우드 VM <a id="cloud-vm"></a>

#### Recommended Specification for AWS<a id="recommended-specification-for-aws"></a>

| 노드 타입 |     모델명     | vCPU 수 | 메모리 \(GiB\) | 스토리지 크기 \(GiB\) | 스토리지 속도 \(IOPS\) | 가격 \(서울 지역, USD/h\) |
|:-----:|:-----------:|:------:|:-------------:|:-----------------:|:------------------:|:---------------------:|
|  CN   | c5.18xlarge |   72   |      144      |    3,000 (최소)     |     3,000 (최소)     |         3.456         |
|  PN   | m5.8xlarge  |   32   |      128      |    3,000 (최소)     |     3,000 (최소)     |         1.888         |

이 스토리지 스펙은 AWS EBS SSD (gp2) 스펙을 참조했습니다.

위 정보의 출처는 [https://aws.amazon.com/ec2/instance-types/](https://aws.amazon.com/ec2/instance-types/)과 [https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/)이며, AWS에 의해 변경될 수도 있습니다.

#### Recommended Specification for Azure<a id="recommended-specification-for-azure"></a>

| 노드 타입 |   모델명   | vCPU 수 | 메모리 \(GiB\) | Storage type \(GiB\) | 스토리지 속도 \(IOPS\) | Price \(Korea Central, USD/h\) |
|:-----:|:-------:|:------:|:-------------:|:----------------------:|:------------------:|:--------------------------------:|
|  CN   | F72s v2 |   72   |      144      |       P50 (4096)       |        7500        |              3.456               |
|  PN   | D32s v5 |   32   |      128      |       P50 (4096)       |        7500        |              1.625               |

This storage specification is derived from Azure Premium Disk specification.

The information above is from [https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/) and [https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing](https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing) and may be changed by Microsoft.

## 스토리지 요구사항 <a id="storage-requirements"></a>

Assuming 100 TPS in average, 300 bytes average transaction size, and 1-second block latency, the expected daily storage requirement is about 2.5 GB/day \(=300x100x86400\).

## 운영 체제 <a id="operating-system"></a>

Recommended environment is compatible with RHEL (7.8 or later). Klaytn 바이너리는 Amazon Linux 2에서 충분히 테스트 되었고, 리눅스 기반의 다른 환경에서도 가능합니다. 또한 개발 지원을 위해 macOS 용 바이너리도 제공하고 있습니다.
