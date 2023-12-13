# ERC-20

## Giới thiệu <a id="introduction"></a>

Hướng dẫn này giúp bạn tạo một ví dụ về token tương thích với ERC-20, tuân thủ các [Tiêu chuẩn token Klaytn](../token-standard.md), đặc biệt là [Tiêu chuẩn token có thể thay thế \(ERC-20)](../token-standard.md#fungible-token-standard-kip-7).

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

## 1. Soạn hợp đồng thông minh ERC-20 <a id="1-writing-erc-20-smart-contract"></a>

### 1.1 Cấu trúc tổng thể của MyERC20 <a id="1-1-overall-structure-of-myerc20"></a>

Dưới đây là mã nguồn đầy đủ của tập tin `MyERC20.sol`. Trong lần triển khai này, hàm `constructor` gọi `_mint` để tạo một số lượng token định trước khi triển khai hợp đồng.

```text
pragma solidity ^0.5.0;

/**
 * @dev Giao diện của chuẩn ERC20 theo định nghĩa trong EIP. Không chứa
 * các hàm tùy chọn; xem `ERC20Detailed` để truy cập.
 */
interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address tài khoản) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);
}

library SafeMath {
    /**
     * @dev Trả lại tổng của hai số nguyên không dấu, hoàn ngược nếu có
     * tràn số.
     *
     * Tương đương với toán tử `+` trong Solidity.
     *
     * Yêu cầu:
     * - Phép cộng không được tràn số.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: phép cộng tràn số");

        return c;
    }

    /**
     * @dev Trả về hiệu của hai số nguyên không dấu, hoàn ngược nếu có
     * tràn số (khi kết quả là số âm).
     *
     * Tương đương với toán tử `-` trong Solidity.
     *
     * Yêu cầu:
     * - Phép trừ không được tràn số.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: phép trừ tràn số");
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Trả về tích của hai số nguyên không dấu, hoàn ngược nếu có
     * tràn số.
     *
     * Tương đương với toán tử `*` trong Solidity.
     *
     * Yêu cầu:
     * - Phép nhân không được tràn số.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Tối ưu hóa phí ga: cách này rẻ hơn yêu cầu 'a' thay vì 0, nhưng
        // lợi ích sẽ mất nếu 'b' cũng kiểm thử.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: phép nhân tràn số");

        return c;
    }

    /**
     * @dev Trả về giá trị nguyên của phép chia hai số nguyên không dấu. Hoàn ngược nếu
     * chia cho 0. Kết quả được làm tròn về 0.
     *
     * Tương đương với toán tử `/` trong Solidity. Lưu ý: hàm này sử dụng một
     * mã vận hành `revert` (giữ lại toàn bộ gas còn lại) trong khi Solidity
     *  sử dụng một mã vận hành không hợp lệ để hoàn ngược (tiêu thụ toàn bộ gas còn lại).
     *
     * Yêu cầu:
     * - Số chia không được bằng 0.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // Solidity chỉ tự động kiểm tra khi chia cho 0
        require(b > 0, "SafeMath: số chia bằng 0");
        uint256 c = a / b;
        // assert(a == b * c + a % b); // Không có trường hợp nào mà điều này không đúng

        return c;
    }

    /**
     * @dev Trả về phần dư của phép chia hai số nguyên không dấu. (unsigned integer modulo),
     * Hoàn ngược khi chia cho 0.
     *
     * Tương đương với toán tử `%` trong Solidity. Hàm này sử dụng một
     * mã vận hành `revert` (giữ lại toàn bộ gas còn lại) trong khi Solidity
     *  sử dụng một mã vận hành không hợp lệ để hoàn ngược (tiêu thụ toàn bộ gas còn lại).
     *
     * Yêu cầu:
     * - Số chia không được bằng 0.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0, "SafeMath: số chia bằng 0");
        return a % b;
    }
}

/**
 * @dev Triển khai giao diện `IERC20`.
 *
 * Lần triển khai này không phụ thuộc vào cách tạo token. Điều này có nghĩa là
 * cơ chế cung cấp phải được thêm vào một hợp đồng phái sinh thông qua `_mint`.
 * Để biết cơ chế tổng quát, xem `ERC20Mintable`.
 *
 * *Để biết thêm chi tiết, hãy xem hướng dẫn của chúng tôi [Cách triển khai
 * cơ chế cung cấp](https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226).*
 *
 * Chúng tôi đã tuân thủ các hướng dẫn tổng quát của OpenZeppelin: các hàm hoàn ngược thay vì
 * trả về `false` khi thất bại. Tuy nhiên, hành vi này khá phổ biến
 * và không xung đột với các kỳ vọng của ứng dụng ERC20.
 *
 * Ngoài ra, sự kiện `Approval` được kích hoạt khi gọi `transferFrom`.
 * Điều này cho phép ứng dụng xây dựng lại ủy quyền cho tất cả các tài khoản
 * chỉ bằng cách nghe các sự kiện này. Các lần triển khai khác của EIP có thể không phát ra
 * các sự kiện này vì không yêu cầu trong tiêu chuẩn kỹ thuật.
 *
 * Cuối cùng, hai hàm không chuẩn `decreaseAllowance` và `increaseAllowance`
 * đã được thêm vào để giảm thiểu các vấn đề phổ biến liên quan đến việc
 * thiết lập ủy quyền. Xem `IERC20.approve`.
 */
contract MyERC20 is IERC20 {
    using SafeMath for uint256;

    mapping (address => uint256) private _balances;

    mapping (address => mapping (address => uint256)) private _allowances;

    // NOTE Start of https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol
    string private _name;
    string private _symbol;
    uint8 private _decimals;

    constructor (string memory name, string memory symbol, uint8 decimals) public {
        _name = name;
        _symbol = symbol;
        _decimals = decimals;

        _mint(msg.sender, 100000 * 10 ** uint256(decimals)); // CAUTION!
    }

    /**
     * @dev Trả về tên của token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Trả về ký hiệu của token, thường là phiên bản ngắn gọn của
     * tên.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Trả về số chữ số thập phân được sử dụng để hiển thị cho người dùng.
     * Ví dụ, nếu `decimals` là `2`, số dư của token `505` sẽ
     * được hiển thị cho người dùng dưới dạng `5,05` (`505 / 10 ** 2`).
     *
     * Các token thường chọn giá trị 18, tương tự mối quan hệ giữa
     * Ether và Wei.
     *
     * > Lưu ý rằng thông tin này chỉ được sử dụng cho _mục đích_ hiển thị: nó
     * không ảnh hưởng đến bất kỳ phép tính nào của hợp đồng, bao gồm
     * `IERC20.balanceOf` và `IERC20.transfer`.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
    // NOTE End of https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol

    uint256 private _totalSupply;

    /**
     * @dev Xem `IERC20.totalSupply`.
     */
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev Xem `IERC20.balanceOf`.
     */
    function balanceOf(address tài khoản) public view returns (uint256) {
        return _balances[tài khoản];
    }

    /**
     * @dev Xem `IERC20.transfer`.
     *
     * Yêu cầu:
     *
     * - `recipient` không được là địa chỉ không hợp lệ.
     * - người gọi phải có số dư tối thiểu là `amount`.
     */
    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    /**
     * @dev Xem `IERC20.allowance`.
     */
    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     * @dev Xem `IERC20.approve`.
     *
     * Yêu cầu:
     *
     * - `spender` không được là địa chỉ không hợp lệ.
     */
    function approve(address spender, uint256 value) public returns (bool) {
        _approve(msg.sender, spender, value);
        return true;
    }

    /**
     * @dev Xem `IERC20.transferFrom`.
     *
     * Kích hoạt sự kiện `Approval` để chỉ thị phân quyền cập nhật. Điều này không
     * bắt buộc theo EIP. Xem phần lưu ý ở đầu mục ERC20`;
     *
     * Yêu cầu:
     * - `sender` và `recipient` không được là địa chỉ không hợp lệ.
     * - `sender` phải có số dư tối thiểu là `value`.
     * - Người gọi phải có phân quyền cho token của `sender` ít nhất là
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, _allowances[sender][msg.sender].sub(amount));
        return true;
    }

    /**
     * @dev Tăng không đáng kể tỷ lệ phân quyền được người gọi cấp cho `spender`.
     *
     * Đây là một phương pháp thay thế cho `approve` có thể được sử dụng để giảm thiểu
     * các vấn đề được mô tả trong `IERC20.approve`.
     *
     * Kích hoạt sự kiện `Approval` để chỉ thị phân quyền cập nhật.
     *
     * Yêu cầu:
     *
     * - `spender` không được là địa chỉ không hợp lệ.
     */
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender].add(addedValue));
        return true;
    }

    /**
     * @dev Tăng tỷ lệ phân quyền được người gọi cấp cho `spender` một cách an toàn.
     *
     * Đây là một phương pháp thay thế cho `approve` có thể được sử dụng để giảm thiểu
     * các vấn đề được mô tả trong `IERC20.approve`.
     *
     * Kích hoạt sự kiện `Approval` để chỉ thị phân quyền cập nhật.
     *
     * Yêu cầu:
     *
     * - `spender` không được là địa chỉ không hợp lệ.
     * - `spender` phải có giá trị phân quyền cho người gọi ít nhất là
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender].sub(subtractedValue));
        return true;
    }

    /**
     * @dev Di chuyển `amount` token từ `sender` sang `recipient`.
     *
     * Đây là hàm nội bộ tương đương với `transfer` và có thể được dùng để
     * ví dụ, triển khai phí tự động cho token, các cơ chế xử phạt, v.v.
     *
     * Kích hoạt sự kiện `Transfer`.
     *
     * Yêu cầu:
     *
     * - `sender` không được là địa chỉ không hợp lệ.
     * - `recipient` không được là địa chỉ không hợp lệ.
     * - `sender` phải có số dư tối thiểu là `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: chuyển từ địa chỉ không hợp lệ");
        require(recipient != address(0), "ERC20: chuyển đến địa chỉ không hợp lệ");

        _balances[sender] = _balances[sender].sub(amount);
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }

    /** @dev Tạo `amount` token và gán chúng cho `tài khoản`, tăng
     * tổng cung.
     *
     * Kích hoạt sự kiện `Transfer` với `from` được đặt thành địa chỉ không hợp lệ.
     *
     * Yêu cầu:
     *
     * - `to` không được là địa chỉ không hợp lệ.
     */
    function _mint(address tài khoản, uint256 amount) internal {
        require(tài khoản != address(0), "ERC20: tạo đến địa chỉ không hợp lệ");

        _totalSupply = _totalSupply.add(amount);
        _balances[tài khoản] = _balances[tài khoản].add(amount);
        emit Transfer(address(0), tài khoản, amount);
    }

     /**
     * @dev Hủy `amount` token từ `tài khoản`, giảm
     * tổng cung.
     *
     * Kích hoạt sự kiện `Transfer` với `to` được thiết lập thành địa chỉ không hợp lệ.
     *
     * Yêu cầu:
     *
     * - `tài khoản` không được là địa chỉ không hợp lệ.
     * - `tài khoản` phải có ít nhất `amount` token.
     */
    function _burn(address tài khoản, uint256 value) internal {
        require(tài khoản != address(0), "ERC20: đốt từ địa chỉ không hợp lệ");

    _balances[tài khoản] = _balances[tài khoản].sub(value);
        _totalSupply = _totalSupply.sub(value);
        emit Transfer(tài khoản, address(0), value);
    }

    /**
     * @dev Thiết lập `amount` làm giá trị phân quyền của `spender` cho token của `owner`.
     *
     * Đây là hàm nội bộ tương đương với `approve` và có thể được dùng để
     * ví dụ, thiết lập cơ chế phân quyền tự động cho các hệ thống phụ nhất định, v.v.
     *
     * Kích hoạt sự kiện `Approval`.
     *
     * Yêu cầu:
     *
     * - `owner` không được là địa chỉ không hợp lệ.
     * - `spender` không được là địa chỉ không hợp lệ.
     */
    function _approve(address owner, address spender, uint256 value) internal {
        require(owner != address(0), "ERC20: duyệt đến địa chỉ không hợp lệ");
        require(spender != address(0), "ERC20: duyệt đến địa chỉ không hợp lệ");

        _allowances[owner][spender] = value;
        emit Approval(owner, spender, value);
    }

    /**
     * @dev Hủy `amount` token từ `tài khoản`.`amount` sau đó được trừ khỏi
     * giá trị phân quyền của người gọi.
     *
     * Xem `_burn` và `_approve`.
     */
    function _burnFrom(address tài khoản, uint256 amount) internal {
        _burn(tài khoản, amount);
        _approve(tài khoản, msg.sender, _allowances[tài khoản][msg.sender].sub(amount));
    }
}
```

`MyERC20.sol` bao gồm một giao diện `IERC20`, một thư viện `SafeMath` và một hợp đồng `MyERC20`, triển khai giao diện `IERC20`.

* Giao diện `IERC20` xác định giao diện bắt buộc được mô tả trong [tiêu chuẩn kỹ thuật của ERC-20](https://eips.ethereum.org/EIPS/eip-20).
* Thư viện `SafeMath` xác định các lớp bọc (wrapper) cho các phép toán số học trong Solidity, kèm theo kiểm tra tràn số để đảm bảo tính toàn vẹn của phép tính với kiểu `uint256` trong Solidity.
* `MyERC20` triển khai các giao diện `IERC20` và cũng xác định ba phương pháp tùy chọn được mô tả trong [tiêu chuẩn kỹ thuật của ERC-20](https://eips.ethereum.org/EIPS/eip-20).
  * Ngoài ERC20, hàm `constructor` cũng được xác định và hàm tạo này được sử dụng để đặt tên và ký hiệu cho một token ERC20 mới và để tạo một số lượng token định trước. `constructor` được gọi một lần trong lần triển khai đầu tiên.

### 1.2 Tìm hiểu một số phương pháp quan trọng <a id="1-2-take-a-look-at-important-methods"></a>

Hãy tìm hiểu chi tiết một số phương pháp quan trọng.

#### \(1\) `function balanceOf(address tài khoản) external view returns (uint256);` <a id="1-function-balanceof-address-account-external-view-returns-uint256"></a>

`balanceOf` là phương pháp bắt buộc của ERC-20. `balanceOf` trả về số dư của địa chỉ đã cho.

```text
    function balanceOf(address tài khoản) public view returns (uint256) {
        return _balances[tài khoản];
    }
```

`balanceOf` chỉ trả về giá trị khóa `tài khoản` được lưu trong `_balances` là kiểu `mapping (address => uint256)` như dưới đây.

```text
    mapping (address => uint256) private _balances;
```

Nếu không có khóa `tài khoản` trong `_balances` thì giá trị trả về chỉ là `0`.

#### \(2\) `function transfer(address recipient, uint256 amount) external returns (bool);` <a id="2-function-transfer-address-recipient-uint256-amount-external-returns-bool"></a>

`transfer` là phương pháp bắt buộc của ERC-20. `transfer` chuyển `amount` token cho `recipient` và hàm MUST kích hoạt sự kiện `Transfer`. Hàm SHOULD thông báo lỗi ngoại lệ nếu số dư tài khoản của người gọi thông báo không có đủ token để chi tiêu.

`transfer` chỉ gọi phương pháp nội bộ `_transfer` thực hiện việc chuyển giao thực tế và tạo sự kiện như sau.

```text
    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }
```

`_transfer` triển khai hành vi thực tế của phương pháp `transfer` trong tiêu chuẩn ERC-20.

Ngoài ra, hàm này ngăn chặn việc gửi token từ hoặc đến địa chỉ không hợp lệ bằng cách sử dụng lệnh `require` như sau.

```text
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _balances[sender] = _balances[sender].sub(amount);
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }
```

#### \(3\) `function approve(address spender, uint256 amount) external returns (bool);` <a id="3-function-approve-address-spender-uint256-amount-external-returns-bool"></a>

`approve` là phương pháp bắt buộc của ERC-20. Hàm `approve` cho phép `spender` được rút tiền nhiều lần từ tài khoản của bạn, với giá trị lên đến `amount`. Nếu hàm này được gọi nhiều lần, hàm sẽ đơn giản là đặt lại giới hạn ủy quyền với giá trị `amount`.

`approve` gọi phương pháp nội bộ `_approve` để thực hiện hành vi `approve` thực tế. `msg.sender` được truyền dưới dạng tài khoản `owner`.

```text
    function approve(address spender, uint256 value) public returns (bool) {
        _approve(msg.sender, spender, value);
        return true;
    }

    function _approve(address owner, address spender, uint256 value) internal {
        require(owner != address(0), "ERC20: duyệt từ địa chỉ không hợp lệ");
        require(spender != address(0), "ERC20: duyệt đến địa chỉ không hợp lệ");

        _allowances[owner][spender] = value;
        emit Approval(owner, spender, value);
    }
```

Hàm `_approve` cập nhật `_allowances`, đây là một từ điển 2 chiều giữ  `value` được ủy quyền cho `spender` từ `address` cụ thể.

```text
    mapping (address => mapping (address => uint256)) private _allowances;
```

#### \(4\) `function _mint(address tài khoản, uint256 amount) internal` <a id="4-function-_mint-address-account-uint256-amount-internal"></a>

`_mint` không phải là một phần của tiêu chuẩn ERC-20. Tuy nhiên, chúng tôi cần một cách để tạo ra các token ERC-20 mới và đã áp dụng `_mint` để tạo ra các token mới trong lần triển khai này như sau.

```text
    function _mint(address tài khoản, uint256 amount) internal {
        require(tài khoản != address(0), "ERC20: mint to the zero address");

        _totalSupply = _totalSupply.add(amount);
        _balances[tài khoản] = _balances[tài khoản].add(amount);
        emit Transfer(address(0), tài khoản, amount);
    }
```

`_mint` là một phương pháp nội bộ và có thể được gọi bên trong hợp đồng này.

Trong tiêu chuẩn `MyERC20.sol`, `_mint` được gọi chỉ một lần từ `constructor` khi triển khai hợp đồng thông minh để tạo một số lượng token định trước.

Nếu bạn muốn phát hành thêm token sau khi triển khai hợp đồng thông minh, bạn phải giới thiệu một phương pháp công khai mới như `mint`. Cần CẨN TRỌNG khi triển khai phương pháp này vì chỉ những người dùng được ủy quyền mới có thể tạo token.

Vui lòng xem ví dụ [ERC20Mintable.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Mintable.sol) của OpenZeppelin để biết thêm chi tiết.

## 2. Triển khai hợp đồng thông minh

Bạn có thể sử dụng Remix Online IDE hoặc Truffle để triển khai hợp đồng thông minh `MyERC20`.

### 2.1 Triển khai hợp đồng thông minh bằng Remix Online IDE <a href="#2-1-deploying-smart-contract-using-klaytn-ide" id="2-1-deploying-smart-contract-using-klaytn-ide"></a>

* Vui lòng truy cập [Klaytn Plugin for Remix](https://ide.klaytn.foundation) và tạo hợp đồng `MyERC20`. Toàn bộ mã nguồn đã được cung cấp tại mục [Soạn hợp đồng thông minh ERC-20](#1-writing-erc-20-smart-contract).
* Chuẩn bị tài khoản của bạn để triển khai hợp đồng.
  * Nếu bạn chưa có tài khoản, hãy tạo một tài khoản tại [https://baobab.wallet.klaytn.foundation/create](https://baobab.wallet.klaytn.foundation/create) hoặc [https://toolkit.klaytn.foundation/tài khoản/tài khoảnKeyLegacy](https://toolkit.klaytn.foundation/account/accountKeyLegacy).
  * Nhận một số KLAY thử nghiệm từ faucet - [https://baobab.wallet.klaytn.foundation/faucet](https://baobab.wallet.klaytn.foundation/faucet)
* Hãy triển khai `MyERC20.sol` với các tham số triển khai là `BAOBABTOKEN`, `BAO` và `8`.

![ERC20-1-deploy](/img/build/smart-contracts/erc20-1-deploy.png)

Sau khi triển khai, bạn có thể gọi hàm `balanceOf` với tài khoản của bạn đã được dùng để triển khai hợp đồng. Bạn sẽ thấy có `10000000000000` token có sẵn trong tài khoản của bạn như dưới đây. Vì bạn đã đặt `decimal` là `8` khi triển khai hợp đồng ở trên, nó đã tạo ra một số cố định là `100000` token trong hàm khởi tạo, với mỗi token có giá trị thập phân là `10^8`. Phương thức `totalSupply` sẽ trả về tổng cung của các token đã tạo, cũng bằng `10000000000000`.

![ERC20-2-owner-token](/img/build/smart-contracts/erc20-2-owner_token.png)

`MyERC20` hiện đang hoạt động !

### 2.2 Triển khai hợp đồng thông minh bằng truffle <a id="2-2-deploying-smart-contract-using-truffle"></a>

Bạn nên cài đặt xong [node.js](https://nodejs.org/) trong môi trường của mình. Hãy xem [Hướng dẫn cài đặt Node.js qua trình quản lý gói](https://nodejs.org/en/download/package-manager/) để cài đặt node.js bằng trình quản lý gói trong các môi trường khác nhau.

```
$ mkdir klaytn
$ cd klaytn
$ npm init # initialize npm at the erc20token directory
$ npm install truffle@4.1.15
$ npm install caver-js@latest # installing caver-js
$ ln -s node_modules/truffle/build/cli.bundled.js truffle
$ export PATH=`pwd`:$PATH
```

Giờ đây, bạn đã cài đặt truffle và caver-js, hai công cụ cần thiết để triển khai hợp đồng thông minh.

Hãy chuẩn bị `truffle` và một hợp đồng thông minh `MyERC20.sol`.

```
$ mkdir myerc20
$ cd myerc20
$ truffle init
```

Giờ bạn sẽ có các cấu trúc thư mục như sau.

```
.
├── contracts
│   ├── Migrations.sol
├── migrations
│   └── 1_initial_migration.js
└── truffle-config.js
```

Giờ hãy soạn `MyERC20.sol` và đặt nó vào thư mục `contracts`.

Bạn cũng cần chỉnh sửa tập tin `1_initial_migration.js` như sau để triển khai hợp đồng `MyERC20` với các tham số ban đầu là `BAOBABTOKEN`, `BAO` và `8`. Tên của đồng token được đặt là `BAOBABTOKEN` và ký hiệu token là `BAO`. Token có giá trị thập phân là `10^8`. Lưu ý rằng ví dụ, khi bạn truy vấn `totalSupply` của `BAOBABTOKEN`, nó sẽ trả về `10^13`, không phải `10^5`, vì Solidity không hỗ trợ số thực dấu phẩy động, số lượng token luôn được biểu diễn dưới dạng số tự nhiên ở đơn vị nhỏ nhất.

```javascript
const Migrations = artifacts.require("./Migrations.sol");
const MyERC20 = artifacts.require("./MyERC20.sol");
module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(MyERC20, 'BAOBABTOKEN', 'BAO', 8);
};
```

Bạn cũng phải chỉnh sửa tập tin `truffle-config.js` như dưới đây để triển khai hợp đồng thông minh lên mạng lưới Klaytn. Bước này giống như bước được mô tả trong [Triển khai Hợp đồng thông minh bằng Truffle](../deploy/ken.md#deploying-a-smart-contract-using-truffle).

```
// truffle-config.js
module.exports = {
    networks: {
        baobab: {
            host: '127.0.0.1',
            port: 8551,
            from: '0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd', // nhập địa chỉ hợp đồng của bạn
            network_id: '1001', // id mạng Baobab
            gas: 20000000, // giới hạn gas của giao dịch
            gasPrice: 250000000000, // gasPrice của Baobab là 250 ston
        },
    },
    compilers: {
      solc: {
        version: "0.5.12"    // Chỉ định phiên bản trình biên dịch là 0.5.12
      }
  }
};
```

Giờ bạn đã sẵn sàng và có thể triển khai `MyERC20.sol` như dưới đây.

```
$ truffle deploy --network baobab --reset
Compiling ./contracts/MyERC20.sol...
Soạn các tập tin artifact trong thư mục ./build/contracts

Sử dụng mạng lưới 'baobab'.

Running migration: 1_initial_migration.js
  Replacing Migrations...
  ... 0x5a947f076f4570dff8ff18b1ae3557e27dd69c92ce38a3c97fad8f5355914066
  Migrations: 0x0d737e9865e5fc4c1ff53744fd2c13c52a44b9bc
  Deploying MyERC20...
  ... 0x1571e80552dab1d67260e8914e06d9b16ccae16fb698c750f6a09aab12517bc1
  MyERC20: 0xc4c8257ED9B4eB6422fDe29B1eCe5Ce301e637e1
Lưu quá trình di chuyển thành công lên mạng...
  ... 0x5b984b3f79c425d80470a96d5badb857fc05e7f31d94423044ae3119c639aa77
Lưu các tập tin artifact...
```

Nó hiển thị hàm băm giao dịch để triển khai hợp đồng `MyERC20` là `0x1571e80552dab1d67260e8914e06d9b16ccae16fb698c750f6a09aab12517bc1` và địa chỉ của `MyERC20` là `0xc4c8257ED9B4eB6422fDe29B1eCe5Ce301e637e1`.

Hiện `MyERC20` đang hoạt động !

## 3. Tương tác với token ERC-20 từ Ví Klaytn <a id="3-interacting-with-erc-20-token-from-klaytn-wallet"></a>

Bạn có thể sử dụng [Ví Baobab Klaytn](https://baobab.wallet.klaytn.foundation) để truy vấn số dư và chuyển `BAOBABTOKEN` tương thích với ERC-20 mà bạn vừa triển khai.

Bạn có thể thêm token tương thích với ERC-20 vào ví của bạn bằng cách sử dụng địa chỉ của hợp đồng `MyERC20` đã triển khai như dưới đây.

![ERC20-3-Add\_token](/img/build/smart-contracts/erc20-3-add_token.png)

Sau khi thêm token ERC-20 vào ứng dụng ví, số dư `BAOBABTOKEN` của bạn sẽ được hiển thị cùng với số dư KLAY như sau. Bạn có thể thấy có `100000` token `BAO` trong tài khoản.

![ERC20-4-wallet-token](/img/build/smart-contracts/erc20-4-wallet-token.png)

