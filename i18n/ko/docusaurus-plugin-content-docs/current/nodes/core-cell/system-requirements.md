# 시스템 요구 사항

## H/W 사양 <a id="h-w-specification"></a>

네트워크 성능은 네트워크 내 최악의 하드웨어 사양을 기준으로 측정됩니다. 블록체인 네트워크 구조상 수직적 확장(하드웨어 용량 증가)만이 가능합니다. 따라서 네트워크 내 모든 노드는 최소한 서로 비슷한 사양의 최고급 하드웨어를 보유하는 것이 좋습니다.

이 하드웨어 사양의 근거가 궁금하신 분들은 미디엄 글 [클레이튼 노드 운영자를 위한 최적의 하드웨어 사양 결정하기](https://klaytn.foundation/node-operator-optimal-specs/)를 참고하시면 이해에 도움이 될 것입니다.

다음 섹션에서는 CN과 PN 모두에 대한 권장 사양을 보여줍니다.

### 베어메탈 서버 <a id="bare-metal-server"></a>

| 카테고리 | 사양 |
| :--- | :--- |
| 서버 | 인텔® 서버 시스템 [M50CYP1UR212](https://www.intel.sg/content/www/xa/en/products/sku/214842/intel-server-system-m50cyp1ur212/specifications.html) |
| CPU | 인텔® 제온 8358 2.60GHz \(32코어/64스레드\) |
| 메모리 | 128GB \(32GB \* 4\) |
| 스토리지 | 3TB (또는 그 이상의 크기) SSD (선호하는 스토리지 크기와 구성은 체인 데이터 크기에 따라 다를 수 있습니다. 자세한 내용은 Klaytn 팀에 문의하시기 바랍니다.) |

이는 CN과 PN에 권장되는 하드웨어 사양이며, 정확한 요구 사항은 아닙니다. 유사한 하드웨어 구성을 가진 모든 물리적 컴퓨터는 CN 또는 PN을 작동하기에 충분합니다.

### 클라우드 VM <a id="cloud-vm"></a>

#### AWS용 권장 사양<a id="recommended-specification-for-aws"></a>

| 노드 유형 | 모델 | vCPU | 메모리 \(GiB\) | 스토리지 크기 \(GiB\) | 스토리지 속도 \(IOPS\) | 가격 \(서울 지역, USD/h\) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| CN | m6i.8xlarge | 32 | 128 | 3,000 (최소) | 9,000 | 1.888 |
| PN | m6i.4xlarge | 16 | 64 | 3,000 (최소) | 9,000 | 0.944 |

이 스토리지 사양은 AWS EBS SSD(gp3) 사양에서 파생되었습니다.

위의 정보는 [https://aws.amazon.com/ec2/instance-types/](https://aws.amazon.com/ec2/instance-types/) 및 [https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/)에서 가져온 것으로, AWS에 의해 변경될 수 있습니다.

#### Azure용 권장 사양<a id="recommended-specification-for-azure"></a>

| 노드 유형 | 모델 | vCPU | 메모리 \(GiB\) | 스토리지 유형 \(GiB\) | 스토리지 속도 \(IOPS\) | 가격 \(한국 중앙, USD/h\) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| CN | D32s v5 | 32 | 128 | P50 (4096) | 7500 | 1.888 |
| PN | D16s v5 | 16 | 64 | P50 (4096) | 7500 | 0.944 |

이 스토리지 사양은 Azure 프리미엄 디스크 사양에서 파생되었습니다.

위의 정보는 [https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/) 및 [https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing](https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing)에서 가져온 것이며 Microsoft에서 변경할 수 있습니다.

## 스토리지 요구 사항 <a id="storage-requirements"></a>

평균 100 TPS, 평균 트랜잭션 크기 300바이트, 블록 지연 시간 1초를 가정할 때, 예상되는 일일 스토리지 요구량은 약 2.5GB/일 \(=300x100x86400\)입니다.

## 운영 체제 <a id="operating-system"></a>

권장 환경은 RHEL(7.8 이상)과 호환됩니다.
Klaytn 바이너리는 Amazon Linux 2에서 완벽하게 테스트되었지만 다른 리눅스 기반 환경에서도 작동해야 합니다. 개발 목적으로 macOS 바이너리도 제공됩니다.
