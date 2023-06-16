# Ví dụ về ERC-721 <a id="erc-721-example"></a>

## Giới thiệu <a id="introduction"></a>

Hướng dẫn này giúp bạn tạo một ví dụ về token tương thích với ERC-721, tuân thủ các [Tiêu chuẩn token Klaytn](../../token-standard.md), đặc biệt là [Tiêu chuẩn token không thể thay thế (ERC-721)](../../token-standard.md#non-fungible-token-standard-kip-17).

[Tiêu chuẩn token không thể thay thế ERC-721](https://eips.ethereum.org/EIPS/eip-721) xác định ba sự kiện và 10 phương pháp như sau. Hàm `supportsInterface` của ERC-721 được kế thừa từ tiêu chuẩn [ERC-165 Standard Interface Detection](https://eips.ethereum.org/EIPS/eip-165) và ERC-165 là một phần của ERC-721. Các token tương thích với ERC-721 là các hợp đồng token triển khai các giao diện ERC-721 và ERC-165 như sau.

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

function balanceOf(address _owner) external view returns (uint256);
function ownerOf(uint256 _tokenId) external view returns (address);
function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
function approve(address _approved, uint256 _tokenId) external payable;
function setApprovalForAll(address _operator, bool _approved) external;
function getApproved(uint256 _tokenId) external view returns (address);
function isApprovedForAll(address _owner, address _operator) external view returns (bool);
function supportsInterface(bytes4 interfaceID) external view returns (bool);
```

Dựa trên giao diện trên đây, các nhà phát triển có thể tùy chỉnh token bằng cách thêm các tính năng và logic mới và triển khai trên mạng lưới Klaytn. Để biết thêm thông tin, hãy tham khảo [tiêu chuẩn kỹ thuật của ERC-721](https://eips.ethereum.org/EIPS/eip-721) chính thức.

Trong hướng dẫn này, bạn sẽ triển khai `MyERC721Card.sol`, sẽ triển khai một token không thể thay thế theo kiểu thẻ, tức là `MyERC721Card`, một token ERC-721. Mỗi `MyERC721Card` có tên và cấp độ, ví dụ: "King" với cấp độ 1, "Queen" với cấp độ 1.

`MyERC721Card.sol` được dựa trên việc triển khai ERC721 của OpenZeppelin. Phần lớn mã trong hướng dẫn này được phân nhánh từ [OpenZeppelin 2.3](https://github.com/OpenZeppelin/openzeppelin-solidity/releases/tag/v2.3.0).

Phần còn lại của hướng dẫn được sắp xếp như sau.

* [1. Soạn hợp đồng thông minh ERC-721](./1-erc721.md)
  - 1.1 Cấu trúc tổng quan của mã `MyERC721Card` với toàn bộ mã `MyERC721Card`
  - 1.2 Tìm hiểu một số hàm quan trọng
* [2. Triển khai hợp đồng thông minh](./2-erc721.md)
  - 2.1 Triển khai hợp đồng thông minh bằng Remix Online IDE
  - 2.2 Triển khai hợp đồng thông minh bằng truffle
