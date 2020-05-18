# 시스템 요구사항 <a id="system-requirements"></a>

## 하드웨어 사양 <a id="h-w-specification"></a>

네트워크 성능은 네트워크 내 가장 성능이 떨어지는 하드웨어 사양에 따라 측정됩니다. 블록체인 네트워크 구조에서는 수직적 확장\(하드웨어 용량 증가\)만 가능합니다. 따라서 네트워크 내의 모든 노드는 적어도 최상 수준의 서로 비슷한 사양을 가진 하드웨어로 구성하는 것을 추천합니다.

다음 장에서는 CN 및 PN 권장 사양을 보여줍니다.

### 베어메탈 서버 <a id="bare-metal-server"></a>

| 카테고리          | 사양                                                                                                                                                                               |
|:------------- |:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 서버            | Intel® Server System R2312WFTZS                                                                                                                                                  |
| CPU           | Intel® Xeon 6148 2.40 GHz \(20-core/40-thread\) \* 2EA \(total 40-core/80-thread\)                                                                                         |
| 메모리           | 256GB \(32GB \* 8\)                                                                                                                                                          |
| 스토리지(Storage) | 1TB (or larger size) SSD (The preferred storage size and configuration could differ depending on the chain data size. Please consult with the Klaytn team for more information.) |

이는 CN 및 PN에 권장되는 하드웨어 사양이며, 정확히 필요한 요구 사항은 아닙니다. 하드웨어 환경설정이 비슷하면 어떤 물리적 시스템이라도 CN 또는 PN을 작동시키기에 충분합니다.

### 클라우드 VM <a id="cloud-vm"></a>

#### AWS 권장 사양 <a id="recommended-specification-based-on-aws"></a>

| Node Type |     모델명     | vCPU 수 | Memory \(GiB\) | Storage size \(GiB\) | Storage speed \(IOPS\) | 가격 \(서울 지역, USD/h\) |
|:---------:|:-----------:|:------:|:----------------:|:----------------------:|:------------------------:|:---------------------:|
|    CN     | c5.18xlarge |   72   |       144        |    1,000 (Minimum)     |     3,000 (Minimum)      |         3.456         |
|    PN     | m5.8xlarge  |   32   |       128        |    1,000 (Minimum)     |     3,000 (Minimum)      |         1.888         |

This storage specification is derived from AWS EBS SSD (gp2) specification.

위 정보의 출처는 [https://aws.amazon.com/ec2/instance-types/](https://aws.amazon.com/ec2/instance-types/)과 [https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/)이며, AWS에 의해 변경될 수도 있습니다.

## 스토리지 요구사항 <a id="storage-requirements"></a>

Assuming 100 TPS in average,  300 bytes average transaction size, and 1-second block latency, the expected daily storage requirement is 2.5 GB/day \(=300x100x86400\).

## 운영 체제 <a id="operating-system"></a>

[Amazon Linux 2](https://aws.amazon.com/ko/about-aws/whats-new/2017/12/introducing-amazon-linux-2/) 환경을 권장합니다. Klaytn 바이너리는 Amazon Linux 2에서 충분히 테스트 되었고, 리눅스 기반의 다른 환경에서도 가능합니다. 또한 개발 지원을 위해 macOS 용 바이너리도 제공하고 있습니다.
