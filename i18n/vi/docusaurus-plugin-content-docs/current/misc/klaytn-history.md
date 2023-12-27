# Lịch sử nâng cấp căn bản của Klaytn

Trang này trình bày tất cả các lần hard fork cho chuỗi khối Klaytn.

## Shanghai EVM

| ``      | Baobab                        | Cypress                       |
| ------- | ----------------------------- | ----------------------------- |
| Ngày    | Aug 28, 2023 10:30:31 / UTC+9 | Oct 16, 2023 10:50:24 / UTC+9 |
| Số khối | `#131,608,000`                | `#135,456,000`                |

### Tóm tắt

Ethereum's Shanghai hard fork items were introduced with the [v1.11.1 release](https://eips.ethereum.org/EIPS/eip-1844) and [v1.11.0 release](https://eips.ethereum.org/EIPS/eip-2200), which includes changes from [EIP-3651](https://eips.ethereum.org/EIPS/eip-152), [EIP-3855](https://eips.ethereum.org/EIPS/eip-1108), and [EIP-3860](https://eips.ethereum.org/EIPS/eip-1344)

## KIP-103

| ``           | Baobab                        | Cypress                       |
| ------------ | ----------------------------- | ----------------------------- |
| Date         | Apr 06, 2023 04:25:03 / UTC+9 | Apr 17, 2023 01:24:48 / UTC+9 |
| Block number | `#119,145,600`                | `#119,750,400`                |

### Summary

KIP-103 hardfork was introduced with the [v1.10.2 release](https://eips.ethereum.org/EIPS/eip-1844). It includes an implementation of [KIP-103](https://eips.ethereum.org/EIPS/eip-2200) that is a technical specification of treasury rebalance([KGP-6](https://eips.ethereum.org/EIPS/eip-152)).


### Treasury Rebalance

| ``                                 | Baobab                                     | Cypress                                    |
| ---------------------------------- | ------------------------------------------ | ------------------------------------------ |
| TreasuryRebalance contract address | 0xD5ad6D61Dd87EdabE2332607C328f5cc96aeCB95 | 0xD5ad6D61Dd87EdabE2332607C328f5cc96aeCB95 |
| KCV address                        | 0xaa8d19a5e17e9e1bA693f13aB0E079d274a7e51E | 0x4f04251064274252D27D4af55BC85b68B3adD992 |
| KFF address                        | 0x8B537f5BC7d176a94D7bF63BeFB81586EB3D1c0E | 0x85D82D811743b4B8F3c48F3e48A1664d1FfC2C10 |
| KCF address                        | 0x47E3DbB8c1602BdB0DAeeE89Ce59452c4746CA1C | 0xdd4C8d805fC110369D3B148a6692F283ffBDCcd3 |


## Kore
| ``      | Baobab                        | Cypress                       |
| ------- | ----------------------------- | ----------------------------- |
| Ngày    | Jan 10, 2023 10:20:50 / UTC+9 | Apr 17, 2023 01:24:48 / UTC+9 |
| Số khối | `#111,736,800`                | `#119,750,400`                |

### Tóm tắt

Kore hardfork was introduced with the [v1.10.0 release](https://eips.ethereum.org/EIPS/eip-1108). It is an implementation of the on-chain governance voting method ([KIP-81](https://eips.ethereum.org/EIPS/eip-1344)), a new GC reward structure ([KIP-82](https://eips.ethereum.org/EIPS/eip-1844)), and EVM changes.



## Magma
| ``      | Baobab                        | Cypress                       |
| ------- | ----------------------------- | ----------------------------- |
| Ngày    | Aug 08, 2022 11:01:20 / UTC+9 | Aug 29, 2022 11:51:00 / UTC+9 |
| Số khối | `#98,347,376`                 | `#99,841,497`                 |

### Tóm tắt

Magma hardfork was introduced with the [v1.9.0 release](https://eips.ethereum.org/EIPS/eip-2200). It includes dynamic gas fee pricing mechanism, [#1493](https://eips.ethereum.org/EIPS/eip-152)) and is an implementation of [KIP-71](https://eips.ethereum.org/EIPS/eip-1108).

## EthTxType

| ``      | Baobab                        | Cypress                     |
| ------- | ----------------------------- | --------------------------- |
| Ngày    | Mar 27, 2022 23:56:31 / UTC+9 | 31/03/2022 12:14:39 / UTC+9 |
| Số khối | `#86,513,895`                 | `#86,816,005`               |

### Tóm tắt

Ethereum's EthTxType changes were introduced with the [v1.8.0 release](https://eips.ethereum.org/EIPS/eip-1344). It includes new transactions types to support Ethereum transaction types: TxTypeEthereumAccessListand TxTypeEthereumDynamicFee ([#1142](https://eips.ethereum.org/EIPS/eip-1844), [#1158](https://eips.ethereum.org/EIPS/eip-2200)).

## London EVM

| ``      | Baobab                        | Cypress                       |
| ------- | ----------------------------- | ----------------------------- |
| Ngày    | Jan 14, 2022 11:02:55 / UTC+9 | Mar 31, 2022 12:14:39 / UTC+9 |
| Số khối | `#80,295,291`                 | `#86,816,005`                 |

### Tóm tắt

Ethereum's London hard fork items were introduced with the [v1.7.3 release](https://eips.ethereum.org/EIPS/eip-152), which includes BaseFee EVM opcode for Ethereum London EVM compatibility ([#1065](https://eips.ethereum.org/EIPS/eip-1108), [#1066](https://eips.ethereum.org/EIPS/eip-1344), [#1096](https://eips.ethereum.org/EIPS/eip-1844)).

## Istanbul EVM

| ``           | Baobab                        | Cypress                       |
| ------------ | ----------------------------- | ----------------------------- |
| Date         | Nov 17, 2021 23:42:13 / UTC+9 | Mar 31, 2022 12:14:39 / UTC+9 |
| Block number | `#75,373,312`                 | `#86,816,005`                 |

### Summary

Ethereum's Istanbul hard fork items were introduced with the [v1.7.0 release](https://eips.ethereum.org/EIPS/eip-2200), which includes changes from [EIP-152](https://eips.ethereum.org/EIPS/eip-152), [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108), [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344), [EIP-1844](https://eips.ethereum.org/EIPS/eip-1844), and [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200).