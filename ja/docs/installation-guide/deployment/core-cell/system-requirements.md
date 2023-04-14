# システム要件 <a id="system-requirements"></a>

## H/W仕様 <a id="h-w-specification"></a>

ネットワーク性能は、ネットワーク内の最悪のハードウェア仕様に基づいて測定されます。 ブロックチェーンのネットワーク構造によれば、縦方向にスケールアップすることが可能です(ハードウェア容量を増やすこと)。 したがって、ネットワーク内のすべてのノードは、少なくともお互いに同様の仕様を持つ最高のハードウェアを持つことをお勧めします。

If you're curious about the rationale of this hardware spec, the medium article [Determining optimal hardware specs for Klaytn node operators](https://klaytn.foundation/node-operator-optimal-specs/) would help you understand.

次のセクションでは、CNとPNの両方について推奨される仕様を示します。

### ベアメタルサーバー <a id="bare-metal-server"></a>

| Category | 仕様                                                                                                                                                   |
|:-------- |:---------------------------------------------------------------------------------------------------------------------------------------------------- |
| サーバー     | Intel® Server System [M50CYP1UR212](https://www.intel.sg/content/www/xa/en/products/sku/214842/intel-server-system-m50cyp1ur212/specifications.html) |
| CPU      | Intel® Xeon 8358 2.60 GHz \(32-core/64-thread\)                                                                                                    |
| メモリ      | 128GB \(32GB \* 4\)                                                                                                                              |
| Storage  | 3TB (またはそれ以上のサイズ) SSD (推奨されるストレージサイズと構成はチェーンデータサイズによって異なる可能性があります。 詳細については、Klaytn チームにお問い合わせください。                                                    |

これは正確な要件ではなく、CNおよびPNの推奨ハードウェア仕様であることに注意してください。 同様のハードウェア構成を持つ物理マシンは、CNまたはPNを操作するのに十分です。

### クラウド VM <a id="cloud-vm"></a>

#### AWSの推奨仕様<a id="recommended-specification-for-aws"></a>

| ノードタイプ |     モデル     | vCPU | Memory \(GiB\) | Storage size \(GiB\) | ストレージ速度 \(IOPS\) | 価格\（ソウル地方、USD/h\） |
|:------:|:-----------:|:----:|:----------------:|:----------------------:|:------------------:|:-------------------:|
|   CN   | m6i.8xlarge |  32  |       128        |       3,000 (最小)       |       9,000        |        1.888        |
|   PN   | m6i.4xlarge |  16  |        64        |    3,000 (Minimum)     |       9,000        |        0.944        |

This storage specification is derived from AWS EBS SSD (gp3) specification.

上記の情報は [https://aws.amazon.com/ec2/instance-types/](https://aws.amazon.com/ec2/instance-types/) および [https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/) から取得しており、AWSによって変更される場合があります。

#### Azure の推奨仕様<a id="recommended-specification-for-azure"></a>

| Node Type |  Model  | vCPU | Memory \(GiB\) | ストレージタイプ \(GiB\) | Storage speed \(IOPS\) | 価格 \(Korea Central, USD/h\' |
|:---------:|:-------:|:----:|:----------------:|:------------------:|:------------------------:|:-----------------------------:|
|    CN     | D32s v5 |  32  |       128        |     P50 (4096)     |           7500           |             1.888             |
|    PN     | D16s v5 |  16  |        64        |     P50 (4096)     |           7500           |             0.944             |

このストレージ仕様は、Azure Premium Disk の仕様に基づいています。

The information above is from [https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/) and [https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing](https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing) and may be changed by Microsoft

## ストレージの要件 <a id="storage-requirements"></a>

平均して100TPSを仮定すると、平均300バイトのトランザクションサイズ、および1秒のブロック待ち時間が想定され、1日あたりのストレージ要件は約2.5GB/日 \(=300x100x86400\)です。

## オペレーティング システム <a id="operating-system"></a>

推奨環境はRHEL(7.8以降)と互換性があります。 Klaytn バイナリは Amazon Linux 2 で完全にテストされていますが、他のLinuxベースの環境でも動作するはずです。 macOS バイナリも開発目的で提供されています。
