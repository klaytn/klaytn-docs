# Tại sao nên chọn Klaytn

Tài liệu này giải thích về sự khác biệt của Klaytn dựa trên các nguyên tắc thiết kế chủ đạo của nó.

## Klaytn với vai trò là lớp tin cậy của vũ trụ ảo <a id="klaytn-as-a-trust-layer-of-metaverse"></a>

Klaytn được xây dựng để trở thành lớp tin cậy căn bản cho vũ trụ ảo, hoạt động tham gia và đóng góp đến từ tất cả các cộng đồng, trao quyền và gắn kết họ với nhau trong thế giới mới.
Klaytn is built to be the fundamental trust layer for the metaverse, respecting the participation and contribution from all communities, empowering and bringing them together in the new world.
Nguyên tắc thiết kế ưu tiên hàng đầu là:
The foremost design principle is;

:::note

Giúp những người tiên phong dễ dàng xây dựng ứng dụng và tổ chức cộng đồng theo cách có thể mở rộng.

:::

Theo nguyên tắc này, Klaytn đã được thiết kế để đáp ứng những yêu cầu sau:
​

### Hiệu suất cao <a id="high-performance"></a>

#### Thông lượng (TPS) và Tính hoàn thiện <a id="throughput-and-finality"></a>

- Chuỗi chính cần xử lý tối thiểu 4.000 TPS.
- Chuỗi chính cần đảm bảo tính hoàn thiện giao dịch tức thời với thời gian tạo khối là một giây.
- Xem phần [Cơ chế đồng thuận](./consensus-mechanism.md).
  ​

#### Khả năng mở rộng <a id="scalability"></a>

- Service chain is the default <LinkWithTooltip tooltip="L2 (level 2) blockchains act as an additional<br />  layer that helps the main blockchain handle<br />  more transactions more efficiently.">L2</LinkWithTooltip> solution for Klaytn 2.0 that is customizable and easily deployable. Chuỗi dịch vụ có thể được quản trị riêng và kết nối với chuỗi chính của Klaytn để neo dữ liệu hoặc chuyển giao tài sản.
- Xem phần [Chuỗi dịch vụ](./scaling-solutions.md#service-chain). Các doanh nghiệp hoặc mạng lưới quy mô lớn thường muốn có môi trường thực thi của riêng họ. Với chuỗi dịch vụ, họ có thể duy trì một môi trường thực thi hiệu suất cao và biệt lập, không bị ảnh hưởng bởi các ứng dụng chuỗi khối khác.
- Các giải pháp khác về khả năng mở rộng sẽ được ra mắt trong tương lai gần, chẳng hạn như sharding (phân đoạn) hoặc rollup (cuộn).
  ​

### Chi phí thấp  <a id="low-cost"></a>

- Người dùng cuối không cần phải gánh bất kỳ khoản phí giao dịch nào cao hơn những gì hệ thống truyền thống yêu cầu.
- Phí giao dịch phải ổn định và được xác định bởi chính độ phức tạp của giao dịch, không phải bởi các yếu tố xung quanh.
- Xem phần [Chi phí thực thi hợp đồng thông minh hợp lý](computation/klaytn-smart-contract.md#affordable-smart-contract-execution-cost) và [Phí giao dịch](transaction-fees/transaction-fees.md). For a gas price of 250 ston, a <LinkWithTooltip tooltip="The native token of the Klaytn blockchain.">KLAY</LinkWithTooltip> transfer would incur a fixed cost of 0.00525 KLAY. (21.000 gas cho giao dịch chuyển KLAY x (250 x 10^-9) == 0.00525 KLAY)
  ​

### Phát triển nhanh chóng <a id="rapid-development"></a>

#### Tương thích với Ethereum <a id="ethereum-compatibility"></a>

- Các công cụ phát triển: Bất kỳ công cụ nào có thể chạy trên Ethereum cũng sẽ chạy trơn thu trong hệ sinh thái Klaytn bằng cách làm cho tập hợp kỹ thuật của Klaytn trở nên tương đương với tập hợp kỹ thuật hiện có của Ethereum, từ góc độ giao dịch cho đến thực thi.
  perspective, to the existing Ethereum stack. Công cụ mới được tạo ra trong hệ sinh thái Klaytn có thể được áp dụng đối ứng trong hệ sinh thái Ethereum.
- EVM và API: Bằng cách xây dựng trên các tập hợp kỹ thuật có sẵn của Etherum, chúng tôi được thừa hưởng các cải tiến được thực hiện đối với cơ sở mã nguồn mở của EVM và các thư viện hỗ trợ. Bằng việc hỗ trợ các Mã vận hành và logic tập hợp kỹ thuật tương đương như vậy trong môi trường EVM Klaytn, ta sẽ thấy hoạt động thực thi cũng được đảm bảo tương đương; và bằng việc hỗ trợ một tập hợp API JSON-RPC với cú pháp vận chuyển điểm cuối tương đương cũng sẽ đảm bảo tính tương đương của giao diện Ethereum đầy đủ. Xem phần [Solidity-Ngôn ngữ hợp đồng thông minh](../build/smart-contracts/solidity-smart-contract-language.md) và [Chuyển ứng dụng Ethereum sang Klaytn](../build/tutorials/migrating-ethereum-app-to-klaytn.md).
- Đóng góp phát triển cốt lõi: Việc hỗ trợ tính tương đương với Ethereum sẽ chuyển đồi hầu hết các giao dịch chung đến cả hai hệ sinh thái Klaytn và Ethereum. Hầu hết các Đề xuất cải tiến Ethereum (EIP) đều có thể được chuyển và áp dụng vào chương trình phát triển cốt lõi của Klaytn, ngược lại, các Đề xuất cải tiến Klaytn (KIP) cũng có thể đóng góp vào sự tiến bộ của Ethereum và EVM. Khi cộng đồng phát triển đóng góp cho một hệ sinh thái, họ thực sự đang đóng góp cho cả hai.
  ​

#### Cơ sở hạ tầng nguồn mở và gói <a id="open-source-infrastructure-and-package"></a>

- Cơ sở hạ tầng chính: bộ công cụ để tích hợp và xây dựng chuỗi khối toàn diện. Cơ sở hạ tầng này bao gồm SDK và thư viện hợp đồng thông minh, Ví và trình khám phá chuỗi, các giải pháp lưu trữ phân tán, hỗ trợ Oracle và Cầu nối.
- Cơ sở hạ tầng phụ: hệ sinh thái hỗ trợ các sản phẩm và dịch vụ. Cơ sở hạ tầng này bao gồm các dịch vụ Tích hợp/trừu tượng, tích hợp Stablecoin, DAO, Thị trường NFT, DEX và DeFi, cũng như các giao dịch tài chính truyền thống.
  ​

### Trải nghiềm người dùng nâng cao <a id="enhanced-user-experience"></a>

#### Khả năng sử dụng trong giao dịch <a id="usability-in-transaction"></a>

- Khả năng chuyển phí giao dịch của người dùng vào ứng dụng
- Xem phần [Ủy thác phí](./transactions/transactions.md#fee-delegation). Người vận hành ứng dụng có thể điều chỉnh số tiền tài trợ cho mỗi giao dịch và triển khai các mô hình kinh doanh linh hoạt hơn, ví dụ như freemium (chỉ miễn phí các tính năng cơ bản) hoặc đăng ký trả phí định kỳ. Việc ủy thác phí sẽ gỡ bỏ bớt các rào cản thu hút người dùng một cách hiệu quả.
  ​
  ​
  ​

### Quỹ sinh thái cấp giao thức trọn bộ <a id="contribution-reward"></a>

- Klaytn là ví dụ đầu tiên và lớn nhất trong đó các ưu đãi hỗ trợ hệ sinh thái được mã hóa trong một tokenomics giao thức trên chuỗi. 50% các mã thông báo mới được đúc được tái đầu tư vào hệ sinh thái.
- Xem [Quỹ cộng đồng Klaytn](token-economy.md#klaytn-community-fund) và [Quỹ Quỹ Klaytn](token-economy.md#klaytn-foundation-fund).
  ​
  ​
  ​

### Cùng xây dựng cộng đồng <a id="community-co-building"></a>

- Ngoài thiết kế giao thức, Klaytn sẽ mở rộng lĩnh vực của mình thông việc cùng xây dựng cộng đồng; trong đó bao gồm các loại cộng đồng như hội nhóm trò chơi, DAO đầu tư, DAO cộng đồng, liên minh với người chơi toàn cầu, v.v.
  ​
Lastly, the ground rules.

:::note

Cuối cùng là các quy tắc cơ bản:

:::

### Klaytn không đánh đổi các đặc tính cốt lõi của chuỗi khối để đạt được những điểm cải tiến nêu trên và giao thức vẫn sẽ ổn định với các bên liên quan có cam kết bền chặt.

- Minh bạch, bảo mật và phi tập trung <a id="transparency-security-and-decentralization"></a>
- Ai cũng có thể yêu cầu giao dịch, cũng như truy xuất và xác nhận kết quả giao dịch trên chuỗi khối.
  Klaytn là một mạng phi tập trung, tại đó không có bất kỳ nút độc hại nào có thể phá vỡ tính toàn vẹn của dữ liệu.

### Quản trị bởi DAO, các nhà xây dựng và doanh nghiệp thực hiện phi tập trung với khả năng ổn định <a id="governance-by-trusted-entities"></a>

- Ngoài các doanh nghiệp truyền thống hiện tại đang đóng vai trò Hội đồng quản trị của Klaytn (GC), nhờ việc đưa nhiều thực thể phi tập trung hơn như DAO và các nhà xây dựng vào GC, chúng tôi đang mở ra tiềm năng xây dựng lại toàn bộ cấu trúc quản trị của Klaytn một cách chưa từng có tiền lệ với hàng trăm người tham gia vào hoạt động quản trị.

[Decoupling of Key Pairs from Addresses]: ./accounts.md#decoupling-key-pairs-from-addresses

[Multiple Key Pairs and Role-Based Keys]: ./accounts.md#multiple-key-pairs-and-role-based-keys

[Human-Readable Address]: ./accounts.md#human-readable-address-hra

[Consensus Mechanism]: ./consensus-mechanism.md

[Affordable Smart Contract Execution Cost]: computation/klaytn-smart-contract.md#affordable-smart-contract-execution-cost

[Transaction Fees]: transaction-fees/transaction-fees.md

[Fee Delegation]: ./transactions/transactions.md#fee-delegation

[Service Chain]: ./scaling-solutions.md#service-chain

[Solidity-Smart Contract Language]: ../build/smart-contracts/solidity-smart-contract-language.md

[Truffle]: ../build/smart-contracts/ide-and-tools/truffle.md

[Migrating Ethereum App to Klaytn]: ../build/tutorials/migrating-ethereum-app-to-klaytn.md

[Incentive Program]: ./token-economy.md

[Klaytn Improvement Reserve]: ./token-economy.md#klaytn-improvement-reserve

[Klaytn Growth Fund]: ./token-economy.md#klaytn-growth-fund
