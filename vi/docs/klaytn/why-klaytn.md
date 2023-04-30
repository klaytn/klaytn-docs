---
description: >-
  Tài liệu này giải thích về sự khác biệt của Klaytn dựa trên các nguyên tắc thiết kế chủ đạo của nó.
---

# Vì sao nên chọn Klaytn <a id="why-klaytn"></a>

## Klaytn với vai trò là lớp tin cậy của vũ trụ ảo <a id="klaytn-as-a-trust-layer-of-metaverse"></a>
Klaytn được xây dựng để trở thành lớp tin cậy căn bản cho vũ trụ ảo, tôn trọng sự tham gia và đóng góp đến từ tất cả các cộng đồng, trao quyền và gắn kết họ với nhau trong thế giới mới. Nguyên tắc thiết kế đứng đầu là
{% hint style="success" %}
Giúp những người tiên phong dễ dàng xây dựng các ứng dụng và tổ chức cộng đồng theo cách có thể mở rộng.
{% endhint %}
Theo nguyên tắc này, Klaytn đã được thiết kế để đáp ứng những yêu cầu sau:
### Hiệu suất cao <a id="high-performance"></a>
#### Thông lượng (TPS) và Tính hoàn thiện <a id="throughput-and-finality"></a>
- Chuỗi chính nên xử lý tối thiểu 4.000 TPS.
- Chuỗi chính nên đảm bảo tính hoàn thiện giao dịch tức thời với thời gian tạo khối là một giây.
- Hãy xem [Cơ chế đồng thuận][].
#### Khả năng mở rộng <a id="scalability"></a>
- Chuỗi dịch vụ là giải pháp L2 mặc định dành cho Klaytn 2.0, có thể tùy chỉnh và dễ dàng triển khai. Chuỗi dịch vụ có thể được quản trị riêng và kết nối với chuỗi chính của Klaytn để neo dữ liệu hoặc chuyển giao tài sản.
- Hãy xem [Chuỗi dịch vụ][]. Các doanh nghiệp hoặc mạng lưới lớn thường muốn có môi trường thực thi của riêng họ. With the service chain, they can maintain an isolated high-performing execution environment that is not affected by other blockchain applications.
- Other scalability solutions will be available in the near future, such as sharding or rollups. ​
### Low Cost  <a id="low-cost"></a>
- End-users should not be burdened with any higher transaction fee beyond what the traditional systems require.
- Transaction fee should be stable and be determined by the transaction complexity itself, and not the surrounding factors.
- See [Affordable Smart Contract Execution Cost][] and [Transaction Fees][]. For a gas price of 250 ston, a KLAY transfer would incur a fixed cost of 0.00525 KLAY. (21,000 Gas for KLAY transfer x (250 x 10^-9) == 0.00525 KLAY) ​
### Rapid Development <a id="rapid-development"></a>
#### Ethereum Compatibility <a id="ethereum-compatibility"></a>
- Development Tools: Any tooling that can run on Ethereum will run seamlessly within the Klaytn ecosystem by making Klaytn’s technical stack equivalent, from an interfacing and execution perspective, to the existing Ethereum stack. New tooling created in the Klaytn ecosystem could be reciprocally adopted within the Ethereum ecosystem.
- EVM and API: By building on top of existing Ethereum stacks we inherit any improvements made to the open-source codebases of EVM and supporting libraries. Supporting such equivalent Opcodes and stack logic in the Klaytn EVM environment would see execution behaviour is guaranteed equivalent; and supporting a set of JSON-RPC APIs with equivalent endpoint payload syntax guarantees full Ethereum interfacing equivalence. See [Solidity-Smart Contract Language][], and [Migrating Ethereum App to Klaytn][].
- Core Development Contribution: Supporting Ethereum equivalence translates most to the mutual benefit to both the Klaytn and Ethereum ecosystems. The majority of Ethereum Improvement Proposals (EIPs) could be migrated and adopted to the Klaytn core development agenda, and in turn Klaytn Improvement Proposals (KIPs) could contribute to the advancement of Ethereum and EVM. When the development community contributes to one ecosystem, they are indeed contributing to both. ​
#### Open Source Infrastructure and Package <a id="open-source-infrastructure-and-package"></a>
- Primary Infrastructure: tool sets for end-to-end blockchain integration and building. It includes SDKs and smart contract libraries, Wallets and chain explorers, distributed storage solutions, Oracle support and Bridges.
- Secondary Infrastructure: ecosystem for supporting products and services. It includes Integration/abstraction services, Stablecoin integrations, DAOs, NFT Marketplaces, DEX and DeFi and Traditional finance interfaces. ​
### Enhanced User Experience <a id="enhanced-user-experience"></a>
#### Usability in Transaction <a id="usability-in-transaction"></a>
- Ability to transfer user's transaction fee to the application
- See [Fee Delegation][]. Application operator can adjust the amount of subsidy for each transaction and implement more flexible business models such as freemium or subscription. Fee delegation will effectively lower user acquisition barriers. ​ ​
### A Full-suite, Protocol-level Eco Fund <a id="contribution-reward"></a>
- Klaytn is the first and the largest example in which the incentives supporting the ecosystem are encoded in an on-chain protocol tokenomics. 66% of the newly minted tokens are reinvested in the ecosystem.
- See [Klaytn Improvement Reserve][] and [Klaytn Growth Fund][]. ​ ​
### Community Co-Building <a id="community-co-building"></a>
- In addition to the protocol design, Klaytn will expand its territory through community co-building; it includes kinds of communities such as game guilds, investment DAOs, community DAOs, alliance with global players, etc. ​ Lastly, the ground rules: ​
{% hint style="success" %}
Klaytn does not sacrifice blockchain’s core characteristics to achieve the above-mentioned enhancements, and the protocol stays stable with strongly committed stakeholders.
{% endhint %}

### Transparency, Security and Decentralization <a id="transparency-security-and-decentralization"></a>
- Anyone can request transactions as well as retrieve and confirm transactions results on the blockchain.
- Klaytn is a decentralized network where no single malicious node can break the data integrity. ​
### Governance by DAOs, Builders and Enterprises Realizes Decentralization with Stability <a id="governance-by-trusted-entities"></a>
- In addition to the current traditional enterprises as Klaytn Governance Council (GC), by bringing more decentralized entities such as DAOs and builders into the GC, we are opening up the potential to rebuild the entire Klaytn governance structure in an unprecedented way with hundreds of governance participants.

[Cơ chế đồng thuận]: design/consensus-mechanism.md
[Affordable Smart Contract Execution Cost]: design/computation/klaytn-smart-contract.md#affordable-smart-contract-execution-cost
[Transaction Fees]: design/transaction-fees/transaction-fees.md
[Fee Delegation]: design/transactions/README.md#fee-delegation
[Chuỗi dịch vụ]: scaling-solutions.md#service-chain
[Solidity-Smart Contract Language]: ../smart-contract/solidity-smart-contract-language.md
[Migrating Ethereum App to Klaytn]: ../dapp/tutorials/migrating-ethereum-app-to-klaytn.md
[Klaytn Improvement Reserve]: design/token-economy.md#klaytn-improvement-reserve
[Klaytn Growth Fund]: design/token-economy.md#klaytn-growth-fund
