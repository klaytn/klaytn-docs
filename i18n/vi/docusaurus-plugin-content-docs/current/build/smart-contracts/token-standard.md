# Token tương thích với Klaytn (KCTs)

Token tương với thích Klaytn (KCT) là một loại hợp đồng thông minh đặc biệt tuân thủ một số tiêu chuẩn kỹ thuật nhất định. Tất cả những người muốn phát hành token trên Klaytn đều phải tuân thủ tiêu chuẩn kỹ thuật này.

Các tiêu chuẩn token được xác định trong Klaytn như [KIP-7](https://kips.klaytn.foundation/KIPs/kip-7) và [KIP-17](https://kips.klaytn.foundation/KIPs/kip-17).

Có thể xác định các KCT khác để đáp ứng các tiêu chuẩn kỹ thuật cụ thể. Nếu bạn cần các tiêu chuẩn token khác, vui lòng truy cập [Đề xuất cải tiến Klaytn](https://github.com/klaytn/KIPs) và đề xuất một tiêu chuẩn token mới.

## Tiêu chuẩn Fungible Token (KIP-7) <a id="fungible-token-standard-kip-7"></a>

Fungible token là các token có tính chất đồng nhất và chia được thành nhiều đơn vị. Mỗi fungible token có thể hoán đổi cho nhau do mỗi đơn vị token đều có cùng giá trị. Tương tự như mỗi tờ tiền một USD đều có giá trị như nhau là một USD. Vì khả năng thay thế là một tính năng cần thiết đối với tiền điện tử trong hầu hết các trường hợp, phần lớn các token trên blockchain đều là fungible token.

Để triển khai các thuộc tính này với hợp đồng thông minh, ta có thể sử dụng tiêu chuẩn token KIP-7. Các token tương thích với KIP-7 triển khai giao diện như sau. Lưu ý rằng [KIP-13](https://kips.klaytn.foundation/KIPs/kip-13) cũng phải được triển khai cùng. Đối với ứng dụng ví, có thể triển khai [giao diện ví](https://kips.klaytn.foundation/KIPs/kip-7#wallet-interface).

```solidity
// IKIP7
event Transfer(address indexed from, address indexed to, uint256 value);
event Approval(address indexed owner, address indexed spender, uint256 value);

function totalSupply() external view returns (uint256);
function balanceOf(address account) external view returns (uint256);
function transfer(address recipient, uint256 amount) external returns (bool);
function allowance(address owner, address spender) external view returns (uint256);
function approve(address spender, uint256 amount) external returns (bool);
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
function safeTransfer(address recipient, uint256 amount, bytes data) external;
function safeTransfer(address recipient, uint256 amount) external;
function safeTransferFrom(address sender, address recipient, uint256 amount, bytes data) external;
function safeTransferFrom(address sender, address recipient, uint256 amount) external;

// IKIP7Metadata (optional)
function name() external view returns (string memory);
function symbol() external view returns (string memory);
function decimals() external view returns (uint8);

// IKIP7Mintable (optional)
function mint(address _to, uint256 _amount) external returns (bool);
function isMinter(address _account) external view returns (bool);
function addMinter(address _account) external;
function renounceMinter() external;

// IKIP7Burnable (optional)
function burn(uint256 _amount) external;
function burnFrom(address _account, uint256 _amount) external;

// IKIP7Pausable (optional)
event Paused(address _account);
event Unpaused(address _account);

function paused() external view returns (bool);
function pause() external;
function unpause() external;
function isPauser(address _account) external view returns (bool);
function addPauser(address _account) external;
function renouncePauser() external;
```

Dựa trên giao diện trên đây, các nhà phát triển có thể tùy chỉnh token bằng cách thêm các tính năng và logic mới và triển khai chúng trên mạng lưới Klaytn.

Để biết thêm thông tin, hãy tham khảo [tài liệu KIP-7](https://kips.klaytn.foundation/KIPs/kip-7) chính thức.

- Tham khảo ví dụ triển khai tại [https://github.com/klaytn/klaytn-contracts/blob/main/contracts/KIP/token/KIP7/KIP7.sol](https://github.com/klaytn/klaytn-contracts/blob/main/contracts/KIP/token/KIP7/KIP7.sol).

## Tiêu chuẩn Non-fungible Token (KIP-17) <a id="non-fungible-token-standard-kip-17"></a>

Non-fungible token (NFT) là một loại token đặc biệt đại diện cho một tài sản duy nhất. Như ý nghĩa của cái tên non-fungible (không thể thay thế), mỗi token đều là duy nhất và không thể phân chia thành các đơn vị. Tính duy nhất này của non-fungible token mở ra những chân trời mới cho quá trình số hóa tài sản. Ví dụ: NFT có thể dùng để đại diện cho tác phẩm nghệ thuật số, vật phẩm trò chơi hoặc bất cứ loại tài sản duy nhất nào và cho phép mọi người giao dịch.t nào và cho phép mọi người giao dịch.

Ví dụ, một game sưu tập trên blockchain như [Cryptokitties](https://www.cryptokitties.co/) triển khai non-fungible token để đại diện cho các con mèo với thông tin di truyền khác nhau. Mỗi con mèo đều là duy nhất và không thể hoán đổi, dẫn đến các token của các con mèo khác nhau có giá trị khác nhau.

Để triển khai non-fungible token, có thể sử dụng [KIP-17](https://kips.klaytn.foundation/KIPs/kip-17). Các hợp đồng token KIP-17 triển khai giao diện như sau. Lưu ý rằng [KIP-13](https://kips.klaytn.foundation/KIPs/kip-13) cũng phải được triển khai cùng. Đối với ứng dụng ví, có thể triển khai [giao diện ví](https://kips.klaytn.foundation/KIPs/kip-17#wallet-interface).

```solidity
// IKIP17
event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

function balanceOf(address _owner) external view returns (uint256);
function ownerOf(uint256 _tokenId) external view returns (address);
function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes _data) external payable;
function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
function approve(address _approved, uint256 _tokenId) external payable;
function setApprovalForAll(address _operator, bool _approved) external;
function getApproved(uint256 _tokenId) external view returns (address);
function isApprovedForAll(address _owner, address _operator) external view returns (bool);

// IKIP17Metadata (optional)
function name() external view returns (string _name);
function symbol() external view returns (string _symbol);
function tokenURI(uint256 _tokenId) external view returns (string);

// IKIP17Enumerable (optional)
function totalSupply() external view returns (uint256);
function tokenByIndex(uint256 _index) external view returns (uint256);
function tokenOfOwnerByIndex(address _owner, uint256 _index) external view returns (uint256);

// IKIP17Mintable (optional)
function mint(address _to, uint256 _tokenId) public returns (bool);
function isMinter(address _account) public view returns (bool);
function addMinter(address _account) public;
function renounceMinter() public;

// IKIP17MetadataMintable (optional)
function mintWithTokenURI(address _to, uint256 _tokenId, string memory _tokenURI) public returns (bool);
function isMinter(address _account) public view returns (bool);
function addMinter(address _account) public;
function renounceMinter() public;

// IKIP17Burnable (optional)
function burn(uint256 _tokenId) public;

// IKIP17Pausable (optional)
event Paused(address _account);
event Unpaused(address _account);
function paused() public view returns (bool);
function pause() public;
function unpause() public;
function isPauser(address _account) public view returns (bool);
function addPauser(address _account) public;
function renouncePauser() public;
```

Dựa trên giao diện trên đây, các nhà phát triển có thể tùy chỉnh token bằng cách thêm các tính năng và logic mới và triển khai chúng trên mạng lưới Klaytn.

Để biết thêm thông tin, hãy tham khảo [tài liệu KIP-17](https://kips.klaytn.foundation/KIPs/kip-17) chính thức.

- Tham khảo ví dụ triển khai tại [https://github.com/klaytn/klaytn-contracts/blob/main/contracts/KIP/token/KIP17/KIP17.sol](https://github.com/klaytn/klaytn-contracts/blob/main/contracts/KIP/token/KIP17/KIP17.sol).

## Tiêu chuẩn token cho chuỗi dịch vụ Klaytn <a id="token-standards-for-klaytn-service-chain"></a>

Chuỗi dịch vụ đề cập đến chuỗi con của Klaytn mà neo vào mạng chính blockchain của Klaytn. Khi triển khai một chuỗi dịch vụ, cần sử dụng các loại hợp đồng đặc biệt để hỗ trợ việc chuyển giá trị giữa chuỗi chính và chuỗi dịch vụ. Hiện tại, các hợp đồng này đang được phát triển và khi sẵn sàng, các tiêu chuẩn kỹ thuật về token cho chuỗi dịch vụ Klaytn sẽ được cung cấp trên KlaytnDocs.

## Lưu ý về ERC-20 và ERC-721 <a id="notes-on-erc-20-and-erc-721"></a>

Do Klaytn công bố KIP-7 và KIP-17 là các tiêu chuẩn token được Klaytn sử dụng, chúng tôi khuyến nghị triển khai các hợp đồng fungible và non-fungible token lần lượt theo KIP-7 và KIP-17, thay vì theo ERC-20 và ERC-721.
KIP-7 và KIP-17 dựa trên tiêu chuẩn ERC-20 và ERC-721, nhưng được điều chỉnh cho phù hợp với Klaytn và do đó phù hợp hơn trên hệ sinh thái Klaytn. Tuy ERC-20 và ERC-721 vẫn được hỗ trợ trên mạng lưới Klaytn, nhưng chúng có thể không tương thích với các công cụ khác nhau trong hệ sinh thái Klaytn.
Để biết thêm thông tin về sự khác biệt giữa các tiêu chuẩn token, vui lòng truy cập [KIP-7](https://kips.klaytn.foundation/KIPs/kip-7#differences-with-erc-20) và [KIP-17](https://kips.klaytn.foundation/KIPs/kip-17#differences-from-erc-721).
