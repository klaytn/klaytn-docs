# ERC-20 <a id="erc-20"></a>

## Giới thiệu <a id="introduction"></a>

Hướng dẫn này giúp bạn tạo một ví dụ về token tương thích với ERC-20, tuân thủ các [Tiêu chuẩn token Klaytn](../../token-standard.md), đặc biệt là [Tiêu chuẩn token có thể thay thế \(ERC-20)](../../token-standard.md#fungible-token-standard-kip-7).

[Tiêu chuẩn token ERC-20](https://eips.ethereum.org/EIPS/eip-20) xác định hai sự kiện và 9 phương pháp \(bao gồm 3 phương pháp tùy chọn\) như sau. Các token tương thích với ERC-20 là các hợp đồng token triển khai giao diện sau đây.

```text
function name() public view returns (string) //optional
function symbol() public view returns (string) //optional
function decimals() public view returns (uint8) //optional
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)

event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

Dựa trên giao diện trên đây, các nhà phát triển có thể tùy chỉnh token bằng cách thêm các tính năng và logic mới và triển khai trên mạng lưới Klaytn. Để biết thêm thông tin, hãy tham khảo [tài liệu ERC-20](https://eips.ethereum.org/EIPS/eip-20) chính thức.

Trong hướng dẫn này, bạn sẽ triển khai `MyERC20.sol`, một token tương thích với ERC-20. Token này sẽ phát hành một số lượng token định trước và gửi tất cả các token đó cho chủ sở hữu hợp đồng khi triển khai.

`MyERC20.sol` được dựa trên việc triển khai ERC20 của OpenZeppelin. Phần lớn mã trong hướng dẫn này được phân nhánh từ [OpenZeppelin 2.3](https://github.com/OpenZeppelin/openzeppelin-solidity/releases/tag/v2.3.0) và các tập tin Solidity sau được sử dụng để triển khai `MyERC20.sol`.

* [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/IERC20.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/IERC20.sol)
* [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20.sol)
* [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol)
* [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/math/SafeMath.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/math/SafeMath.sol)

Phần còn lại của hướng dẫn được sắp xếp như sau.

* [1. Soạn hợp đồng thông minh ERC-20](1-erc20.md)
  * 1.1 Cấu trúc tổng quan của mã `MyERC20` với toàn bộ mã `MyERC20`
  * 1.2 Tìm hiểu một số hàm quan trọng
* [2. Triển khai hợp đồng thông minh](2-erc20.md)
  * 2.1 Triển khai hợp đồng thông minh bằng Klaytn IDE
  * 2.2 Triển khai hợp đồng thông minh bằng truffle
* [3. Tương tác giữa token ERC-20 và ví Klaytn](3-erc20.md)

