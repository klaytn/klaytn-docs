# 시스템 요구사항

## 하드웨어 사양

The network performance is measured based on the worst hardware specification within the network. According to the blockchain network structure, it is only possible to be scaled up vertically \(increasing hardware capacity\). Hence, it is recommended that all the nodes within the network should have the best hardwares having the similar specifications with each other at least.

The following sections show the recommended specifications for both CNs and PNs.

### Bare-metal Server

| Category | Specification                                                                            |
|:-------- |:---------------------------------------------------------------------------------------- |
| Server   | Intel® Server System R2312WFTZS                                                          |
| CPU      | Intel® Xeon 6148 2.40 GHz \(20-core/40-thread\) \* 2EA \(total 40-core/80-thread\) |
| Memory   | 256GB \(32GB \* 8\)                                                                  |
| Storage  | 12TB \(1.92TB SSD \* 6, RAID 5\)                                                     |

Note that this is a recommended hardware specification for CNs and PNs, not an exact requirement. Any physical machine having similar hardware configuration would be sufficient to operate a CN or a PN.

### 클라우드 VM

#### AWS 권장 사양

| 모델명                           | vCPU 수 | Memory \(GiB\) | Storage \(GiB\)       | EBS Bandwidth \(Mbps\) | Network Bandwidth \(Gbps\) | Price \(Seoul region, USD/h\) |
|:----------------------------- |:------ |:---------------- |:----------------------- |:------------------------ |:---------------------------- |:------------------------------- |
| c5.18xlarge \(recommended\) | 72     | 144              | 500 (Minimum, EBS-Only) | 14,000                   | 25                           | 3.456                           |

위 정보의 출처는 [https://aws.amazon.com/ec2/instance-types/](https://aws.amazon.com/ec2/instance-types/)과 [https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/)이며, AWS에 의해 변경될 수도 있습니다.

## 스토리지 요구사항

Assuming 100 TPS in average,  300 bytes average transaction size, and 1-second block latency, the expected daily storage requirement is 2.5 GB/day \(=300x100x86400\).

## 운영 체제

[Amazon Linux 2](https://aws.amazon.com/ko/about-aws/whats-new/2017/12/introducing-amazon-linux-2/) 환경을 권장합니다. Klaytn 바이너리는 Amazon Linux 2에서 충분히 테스트 되었고, 리눅스 기반의 다른 환경에서도 가능합니다. 또한 개발 지원을 위해 macOS 용 바이너리도 제공하고 있습니다.
