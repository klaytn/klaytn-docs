# システム要件 <a id="system-requirements"></a>

## H/W仕様 <a id="h-w-specification"></a>

ネットワーク性能は、ネットワーク内の最悪のハードウェア仕様に基づいて測定されます。 ブロックチェーンのネットワーク構造によれば、縦方向にスケールアップすることが可能です(ハードウェア容量を増やすこと)。 したがって、ネットワーク内のすべてのノードは、少なくともお互いに同様の仕様を持つ最高のハードウェアを持つことをお勧めします。

次のセクションでは、CNとPNの両方について推奨される仕様を示します。

### ベアメタルサーバー <a id="bare-metal-server"></a>

| カテゴリ  | 仕様                                                                                                |
|:----- |:------------------------------------------------------------------------------------------------- |
| サーバー  | インテル® サーバー システム R2312WFTZS                                                                        |
| CPU   | インテル® Xeon 6148 2.40 GHz \(20-core/40-thread\) \* 2EA \(total 40 core/80-thread\)           |
| メモリ   | 256GB \(32GB \* 8\)                                                                           |
| ストレージ | 3TB (またはそれ以上のサイズ) SSD (推奨されるストレージサイズと構成はチェーンデータサイズによって異なる可能性があります。 詳細については、Klaytn チームにお問い合わせください。 |

これは正確な要件ではなく、CNおよびPNの推奨ハードウェア仕様であることに注意してください。 同様のハードウェア構成を持つ物理マシンは、CNまたはPNを操作するのに十分です。

### クラウド VM <a id="cloud-vm"></a>

#### AWSの推奨仕様<a id="recommended-specification-for-aws"></a>

| ノードタイプ |     モデル     | vCPU | Memory \(GiB\) | Storage size \(GiB\) | ストレージ速度 \(IOPS\) | 価格\（ソウル地方、USD/h\） |
|:------:|:-----------:|:----:|:----------------:|:----------------------:|:------------------:|:-------------------:|
|   CN   | c5.18xlarge |  72  |       144        |       3,000 (最小)       |     3,000 (最小)     |        3.456        |
|   PN   | m5.8xlarge  |  32  |       128        |       3,000 (最小)       |     3,000 (最小)     |        1.888        |

このストレージ仕様は、AWS EBS SSD (gp2) 仕様に基づいています。

上記の情報は [https://aws.amazon.com/ec2/instance-types/](https://aws.amazon.com/ec2/instance-types/) および [https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/) から取得しており、AWSによって変更される場合があります。

#### Azure の推奨仕様<a id="recommended-specification-for-azure"></a>

| ノードタイプ |   モデル   | vCPU | Memory \(GiB\) | ストレージタイプ \(GiB\) | ストレージ速度 \(IOPS\) | 価格 \(Korea Central, USD/h\' |
|:------:|:-------:|:----:|:----------------:|:------------------:|:------------------:|:-----------------------------:|
|   CN   | F72s v2 |  72  |       144        |     P50 (4096)     |        7500        |             3.456             |
|   PN   | D32s v5 |  32  |       128        |     P50 (4096)     |        7500        |             1.625             |

このストレージ仕様は、Azure Premium Disk の仕様に基づいています。

The information above is from [https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/) and [https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing](https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing) and may be changed by Microsoft

## ストレージの要件 <a id="storage-requirements"></a>

平均して100TPSを仮定すると、平均300バイトのトランザクションサイズ、および1秒のブロック待ち時間が想定され、1日あたりのストレージ要件は約2.5GB/日 \(=300x100x86400\)です。

## オペレーティング システム <a id="operating-system"></a>

推奨環境はRHEL(7.8以降)と互換性があります。 Klaytn バイナリは Amazon Linux 2 で完全にテストされていますが、他のLinuxベースの環境でも動作するはずです。 macOS バイナリも開発目的で提供されています。
