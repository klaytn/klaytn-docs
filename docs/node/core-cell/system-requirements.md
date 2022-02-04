# System Requirements <a id="system-requirements"></a>

## H/W Specification <a id="h-w-specification"></a>

The network performance is measured based on the worst hardware specification within the network. According to the blockchain network structure, it is only possible to be scaled up vertically \(increasing hardware capacity\). Hence, it is recommended that all the nodes within the network should have the best hardwares having the similar specifications with each other at least.

The following sections show the recommended specifications for both CNs and PNs.

### Bare-metal Server <a id="bare-metal-server"></a>

| Category | Specification |
| :--- | :--- |
| Server | Intel® Server System R2312WFTZS |
| CPU | Intel® Xeon 6148 2.40 GHz \(20-core/40-thread\) \* 2EA \(total 40-core/80-thread\) |
| Memory | 256GB \(32GB \* 8\) |
| Storage | 3TB (or larger size) SSD (The preferred storage size and configuration could differ depending on the chain data size. Please consult with the Klaytn team for more information.) |

Note that this is a recommended hardware specification for CNs and PNs, not an exact requirement. Any physical machine having similar hardware configuration would be sufficient to operate a CN or a PN.

### Cloud VM <a id="cloud-vm"></a>

#### Recommended Specification for AWS<a id="recommended-specification-for-aws"></a>

| Node Type | Model | vCPU | Memory \(GiB\) | Storage size \(GiB\) | Storage speed \(IOPS\) | Price \(Seoul region, USD/h\) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| CN | c5.18xlarge  | 72 | 144 | 3,000 (Minimum) | 3,000 (Minimum) | 3.456 |
| PN | m5.8xlarge  | 32 | 128 | 3,000 (Minimum) | 3,000 (Minimum)  | 1.888 |

This storage specification is derived from AWS EBS SSD (gp2) specification. 

The information above is from [https://aws.amazon.com/ec2/instance-types/](https://aws.amazon.com/ec2/instance-types/) and [https://aws.amazon.com/ec2/pricing/on-demand/](https://aws.amazon.com/ec2/pricing/on-demand/) and may be changed by AWS.

#### Recommended Specification for Azure<a id="recommended-specification-for-azure"></a>

| Node Type | Model | vCPU | Memory \(GiB\) | Storage type \(GiB\) | Storage speed \(IOPS\) | Price \(Seoul region, USD/h\) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| CN | F72sv2  | 72 | 144 | P50 (4096) | 7500 | 3.456 |
| PN | D32sv5  | 32 | 128 | P50 (4096) | 7500 | 1.625 |

This storage specification is derived from Azure Premium Disk specification. 

The information above is from [https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/series/) and [https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing](https://azure.microsoft.com/en-us/pricing/details/managed-disks/#pricing) and may be changed by Microsoft.

## Storage Requirements <a id="storage-requirements"></a>

Assuming 100 TPS in average, 300 bytes average transaction size, and 1-second block latency, the expected daily storage requirement is 2.5 GB/day \(=300x100x86400\).

## Operating System <a id="operating-system"></a>

Recommended environment is compatible with RHEL (7.8 or later).
Klaytn binaries are fully tested on Amazon Linux 2, but they should work on other linux-based environments as well. macOS binaries are also provided for development purpose.