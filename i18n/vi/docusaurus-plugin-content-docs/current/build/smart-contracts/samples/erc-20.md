# ERC-20

## Giới thiệu <a id="introduction"></a>

Hướng dẫn này giúp bạn tạo một ví dụ về token tương thích với ERC-20, tuân thủ các [Tiêu chuẩn token Klaytn](../token-standard.md), đặc biệt là [Tiêu chuẩn token có thể thay thế (ERC-20)](../token-standard.md#fungible-token-standard-kip-7).

[Tiêu chuẩn token ERC-20](https://eips.ethereum.org/EIPS/eip-20) xác định hai sự kiện và 9 phương pháp (bao gồm 3 phương pháp tùy chọn) như sau. Các token tương thích với ERC-20 là các hợp đồng token triển khai giao diện sau đây.

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

- [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/IERC20.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/IERC20.sol)
- [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20.sol)
- [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol)
- [https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/math/SafeMath.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/math/SafeMath.sol)

## 1. Soạn hợp đồng thông minh ERC-20 <a id="1-writing-erc-20-smart-contract"></a>

### 1.1 Cấu trúc tổng thể của MyERC20 <a id="1-1-overall-structure-of-myerc20"></a>

Dưới đây là mã nguồn đầy đủ của tập tin `MyERC20.sol`. Trong lần triển khai này, hàm `constructor` gọi `_mint` để tạo một số lượng token định trước khi triển khai hợp đồng.

```text
pragma solidity ^0.5.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP. Does not include
 * the optional functions; to access them see `ERC20Detailed`.
 */
interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);
}

library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, "SafeMath: division by zero");
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0, "SafeMath: modulo by zero");
        return a % b;
    }
}

/**
 * @dev Implementation of the `IERC20` interface.
 *
 * This implementation is agnostic to the way tokens are created. This means
 * that a supply mechanism has to be added in a derived contract using `_mint`.
 * For a generic mechanism see `ERC20Mintable`.
 *
 * *For a detailed writeup see our guide [How to implement supply
 * mechanisms](https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226).*
 *
 * We have followed general OpenZeppelin guidelines: functions revert instead
 * of returning `false` on failure. This behavior is nonetheless conventional
 * and does not conflict with the expectations of ERC20 applications.
 *
 * Additionally, an `Approval` event is emitted on calls to `transferFrom`.
 * This allows applications to reconstruct the allowance for all accounts just
 * by listening to said events. Other implementations of the EIP may not emit
 * these events, as it isn't required by the specification.
 *
 * Finally, the non-standard `decreaseAllowance` and `increaseAllowance`
 * functions have been added to mitigate the well-known issues around setting
 * allowances. See `IERC20.approve`.
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
     * @dev Returns the name of the token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5,05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei.
     *
     * > Note that this information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * `IERC20.balanceOf` and `IERC20.transfer`.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
    // NOTE End of https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Detailed.sol

    uint256 private _totalSupply;

    /**
     * @dev See `IERC20.totalSupply`.
     */
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See `IERC20.balanceOf`.
     */
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev See `IERC20.transfer`.
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    /**
     * @dev See `IERC20.allowance`.
     */
    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     * @dev See `IERC20.approve`.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 value) public returns (bool) {
        _approve(msg.sender, spender, value);
        return true;
    }

    /**
     * @dev See `IERC20.transferFrom`.
     *
     * Emits an `Approval` event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of `ERC20`;
     *
     * Requirements:
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `value`.
     * - the caller must have allowance for `sender`'s tokens of at least
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, _allowances[sender][msg.sender].sub(amount));
        return true;
    }

    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to `approve` that can be used as a mitigation for
     * problems described in `IERC20.approve`.
     *
     * Emits an `Approval` event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender].add(addedValue));
        return true;
    }

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to `approve` that can be used as a mitigation for
     * problems described in `IERC20.approve`.
     *
     * Emits an `Approval` event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender].sub(subtractedValue));
        return true;
    }

    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * This is internal function is equivalent to `transfer`, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a `Transfer` event.
     *
     * Requirements:
     *
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _balances[sender] = _balances[sender].sub(amount);
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }

    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a `Transfer` event with `from` set to the zero address.
     *
     * Requirements
     *
     * - `to` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");

        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }

     /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a `Transfer` event with `to` set to the zero address.
     *
     * Requirements
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(address account, uint256 value) internal {
        require(account != address(0), "ERC20: burn from the zero address");

	_balances[account] = _balances[account].sub(value);
        _totalSupply = _totalSupply.sub(value);
        emit Transfer(account, address(0), value);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner`s tokens.
     *
     * This is internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an `Approval` event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(address owner, address spender, uint256 value) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = value;
        emit Approval(owner, spender, value);
    }

    /**
     * @dev Destoys `amount` tokens from `account`.`amount` is then deducted
     * from the caller's allowance.
     *
     * See `_burn` and `_approve`.
     */
    function _burnFrom(address account, uint256 amount) internal {
        _burn(account, amount);
        _approve(account, msg.sender, _allowances[account][msg.sender].sub(amount));
    }
}
```

`MyERC20.sol` bao gồm một giao diện `IERC20`, một thư viện `SafeMath` và một hợp đồng `MyERC20`, triển khai giao diện `IERC20`.

- Giao diện `IERC20` xác định giao diện bắt buộc được mô tả trong [tiêu chuẩn kỹ thuật của ERC-20](https://eips.ethereum.org/EIPS/eip-20).
- Thư viện `SafeMath` xác định các lớp bọc (wrapper) cho các phép toán số học trong Solidity, kèm theo kiểm tra tràn số để đảm bảo tính toàn vẹn của phép tính với kiểu `uint256` trong Solidity.
- `MyERC20` triển khai các giao diện `IERC20` và cũng xác định ba phương pháp tùy chọn được mô tả trong [tiêu chuẩn kỹ thuật của ERC-20](https://eips.ethereum.org/EIPS/eip-20).
  - Ngoài ERC20, hàm `constructor` cũng được xác định và hàm tạo này được sử dụng để đặt tên và ký hiệu cho một token ERC20 mới và để tạo một số lượng token định trước. `constructor` được gọi một lần trong lần triển khai đầu tiên.

### 1.2 Tìm hiểu một số phương pháp quan trọng <a id="1-2-take-a-look-at-important-methods"></a>

Hãy tìm hiểu chi tiết một số phương pháp quan trọng.

#### (1) `function balanceOf(address account) external view returns (uint256);` <a id="1-function-balanceof-address-account-external-view-returns-uint256"></a>

`balanceOf` là phương pháp bắt buộc của ERC-20. `balanceOf` trả về số dư của địa chỉ đã cho.

```text
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }
```

`balanceOf` chỉ trả về giá trị khóa `tài khoản` được lưu trong `_balances` là kiểu `mapping (address => uint256)` như dưới đây.

```text
    mapping (address => uint256) private _balances;
```

Nếu không có khóa `tài khoản` trong `_balances` thì giá trị trả về chỉ là `0`.

#### (2) `function transfer(address recipient, uint256 amount) external returns (bool);` <a id="2-function-transfer-address-recipient-uint256-amount-external-returns-bool"></a>

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

#### (3) `function approve(address spender, uint256 amount) external returns (bool);` <a id="3-function-approve-address-spender-uint256-amount-external-returns-bool"></a>

`approve` là phương pháp bắt buộc của ERC-20. Hàm `approve` cho phép `spender` được rút tiền nhiều lần từ tài khoản của bạn, với giá trị lên đến `amount`. Nếu hàm này được gọi nhiều lần, hàm sẽ đơn giản là đặt lại giới hạn ủy quyền với giá trị `amount`.

`approve` gọi phương pháp nội bộ `_approve` để thực hiện hành vi `approve` thực tế. `msg.sender` được truyền dưới dạng tài khoản `owner`.

```text
    function approve(address spender, uint256 value) public returns (bool) {
        _approve(msg.sender, spender, value);
        return true;
    }

    function _approve(address owner, address spender, uint256 value) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = value;
        emit Approval(owner, spender, value);
    }
```

Hàm `_approve` cập nhật `_allowances`, đây là một từ điển 2 chiều giữ  `value` được ủy quyền cho `spender` từ `address` cụ thể.

```text
    mapping (address => mapping (address => uint256)) private _allowances;
```

#### (4) `function _mint(address account, uint256 amount) internal` <a id="4-function-_mint-address-account-uint256-amount-internal"></a>

`_mint` không phải là một phần của tiêu chuẩn ERC-20. Tuy nhiên, chúng tôi cần một cách để tạo ra các token ERC-20 mới và đã áp dụng `_mint` để tạo ra các token mới trong lần triển khai này như sau.

```text
    function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ERC20: mint to the zero address");

        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

`_mint` là một phương pháp nội bộ và có thể được gọi bên trong hợp đồng này.

Trong tiêu chuẩn `MyERC20.sol`, `_mint` được gọi chỉ một lần từ `constructor` khi triển khai hợp đồng thông minh để tạo một số lượng token định trước.

Nếu bạn muốn phát hành thêm token sau khi triển khai hợp đồng thông minh, bạn phải giới thiệu một phương pháp công khai mới như `mint`. Cần CẨN TRỌNG khi triển khai phương pháp này vì chỉ những người dùng được ủy quyền mới có thể tạo token.

Vui lòng xem ví dụ [ERC20Mintable.sol](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.3.0/contracts/token/ERC20/ERC20Mintable.sol) của OpenZeppelin để biết thêm chi tiết.

## 2. Triển khai hợp đồng thông minh

Bạn có thể sử dụng Remix Online IDE hoặc Truffle để triển khai hợp đồng thông minh `MyERC20`.

### 2.1 Triển khai hợp đồng thông minh bằng Remix Online IDE <a href="#2-1-deploying-smart-contract-using-klaytn-ide" id="2-1-deploying-smart-contract-using-klaytn-ide"></a>

- Vui lòng truy cập [Klaytn Plugin for Remix](https://ide.klaytn.foundation) và tạo hợp đồng `MyERC20`. Toàn bộ mã nguồn đã được cung cấp tại mục [Soạn hợp đồng thông minh ERC-20](#1-writing-erc-20-smart-contract).
- Chuẩn bị tài khoản của bạn để triển khai hợp đồng.
  - Nếu bạn chưa có tài khoản, hãy tạo một tài khoản tại [https://baobab.wallet.klaytn.foundation/create](https://baobab.wallet.klaytn.foundation/create) hoặc [https://toolkit.klaytn.foundation/tài khoản/tài khoảnKeyLegacy](https://toolkit.klaytn.foundation/account/accountKeyLegacy).
  - Nhận một số KLAY thử nghiệm từ faucet - [https://baobab.wallet.klaytn.foundation/faucet](https://baobab.wallet.klaytn.foundation/faucet)
- Hãy triển khai `MyERC20.sol` với các tham số triển khai là `BAOBABTOKEN`, `BAO` và `8`.

![ERC20-1-deploy](/img/build/smart-contracts/erc20-1-deploy.png)

Sau khi triển khai, bạn có thể gọi hàm `balanceOf` với tài khoản của bạn đã được dùng để triển khai hợp đồng. Bạn sẽ thấy có `10000000000000` token có sẵn trong tài khoản của bạn như dưới đây. Vì bạn đã đặt `decimal` là `8` khi triển khai hợp đồng ở trên, nó đã tạo ra một số cố định là `100000` token trong hàm khởi tạo, với mỗi token có giá trị thập phân là `10^8`. Phương thức `totalSupply` sẽ trả về tổng cung của các token đã tạo, cũng bằng `10000000000000`.

![ERC20-2-owner-token](/img/build/smart-contracts/erc20-2-owner_token.png)

`MyERC20` hiện đang hoạt động !

## 3. Tương tác với token ERC-20 từ Ví Klaytn <a id="3-interacting-with-erc-20-token-from-klaytn-wallet"></a>

Bạn có thể sử dụng [Ví Baobab Klaytn](https://baobab.wallet.klaytn.foundation) để truy vấn số dư và chuyển `BAOBABTOKEN` tương thích với ERC-20 mà bạn vừa triển khai.

Bạn có thể thêm token tương thích với ERC-20 vào ví của bạn bằng cách sử dụng địa chỉ của hợp đồng `MyERC20` đã triển khai như dưới đây.

![ERC20-3-Add\_token](/img/build/smart-contracts/erc20-3-add_token.png)

Sau khi thêm token ERC-20 vào ứng dụng ví, số dư `BAOBABTOKEN` của bạn sẽ được hiển thị cùng với số dư KLAY như sau. Bạn có thể thấy có `100000` token `BAO` trong tài khoản.

![ERC20-4-wallet-token](/img/build/smart-contracts/erc20-4-wallet-token.png)
