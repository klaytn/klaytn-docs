# Di chuyển trạng thái

Khi càng có nhiều khối được thêm vào chuỗi khối, dữ liệu chuỗi sẽ càng tăng lên. Dữ liệu chuỗi rất cần thiết cho việc vận hành nút, vì thế chúng được lưu trữ trong kho lưu trữ nút dưới dạng cấu trúc dữ liệu, được gọi là trie và sau cùng sẽ đi vào cơ sở dữ liệu, được gọi là LevelDB. Vì thế, với nhiều khối hơn thì sẽ có nhiều dữ liệu chuỗi trong kho lữu trữ hơn, kèm theo đó là chi phí tăng lên. Vì thế, Klaytn hỗ trợ một tính năng gọi là Di chuyển trạng thái cho phép bạn giảm dung lượng lưu trữ cần thiết.

Di chuyển trạng thái nhắm đến các trie trạng thái, trong đó bao gồm hầu hết dữ liệu chuỗi. Tính năng này sẽ xóa các nút trie trạng thái không cần thiết cho việc xử lý các khối mới. Nó chỉ để lại các nút trie trạng thái có thể tiếp cận được từ gốc trie trạng thái của một khối cụ thể. Sau khi Di chuyển trạng thái, bạn chỉ còn lại những dữ liệu mới nhất cần thiết cho việc đồng bộ hóa nút, trong đó có chưa các nút trie trạng thái của khối đích và các khối mới được thêm vào.

Lưu ý rằng một nút không thể đọc được các trạng thái cũ từ các khối xuất hiện trước khối đích sau khi Di chuyển trạng thái. Nói cách khác, bạn không thể quay về số dư từ một số khối cũ bằng API klay_getBalance nữa.

Bạn có thể đọc thêm thông tin chi tiết về cơ chế của tính năng Di chuyển trạng thái tại:
[Di chuyển trạng thái Klaytn v1.5.0: Thiết kiệm dung lượng lưu trữ nút](https://medium.com/klaytn/klaytn-v1-5-0-state-migration-saving-node-storage-1358d87e4a7a)
[Di chuyển trạng thái Klaytn: Cách hiệu quả để giảm dữ liệu chuỗi khối](https://medium.com/klaytn/klaytn-state-migration-an-efficient-way-to-reduce-blockchain-data-6615a3b36523)

To use State Migration, please refer to [`Chaindata Migration`](../../misc/operation/chaindata-migration.md) page of Operation Guide.
