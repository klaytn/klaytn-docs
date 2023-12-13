# Hợp đồng đã lập trước

Klaytn cung cấp một số hợp đồng đã lập trước hữu ích. Những hợp đồng này được thực hiện trực tiếp trong nền tảng dưới dạng triển khai gốc trong hệ thống. Các hợp đồng đã lập trước từ địa chỉ 0x01 đến 0x09 giống như các hợp đồng trong Ethereum. Ngoài ra, Klaytn cũng triển khai các hợp đồng đã lập trước từ 0x3fd đến 0x3ff để hỗ trợ các tính năng mới của Klaytn.

:::note

LƯU Ý: Ba địa chỉ hợp đồng đã lập trước đã thay đổi và **blake2F** đã được thêm sau khi nâng cấp giao thức `IstanbulEVM`, hay còn gọi là "hard fork".

Số khối nâng cấp giao thức `IstanbulEVM` như sau.
* Mạng thử nghiệm Baobab: `#75373312`
* Mạng chính thức Cypress: `#86816005`

Các hợp đồng được triển khai trước khi nâng cấp giao thức nên sử dụng địa chỉ ban đầu.
* trường hợp 1) Các hợp đồng được triển khai trên Baobab tại số khối `#75373310` nhận diện 0x09, 0x0a và 0x0b lần lượt là địa chỉ của vmLog, feePayer và validateSender, cũng như không thể sử dụng blake2f.
* trường hợp 2) Các hợp đồng được triển khai trên Baobab tại số khối `#75373314` nhận diện 0x09 là địa chỉ của blake2f và nhận diện 0x3fd, 0x3fe và 0xff lần lượt là địa chỉ của vmLog, feePayer và validateSender.

Nếu bạn muốn đọc tài liệu trước đây, vui lòng tham khảo phần [tài liệu trước đây](precompiled-contracts-previous.md).

:::

| hợp đồng đã lập trước | các địa chỉ được sử dụng trong các hợp đồng được triển khai trước khi kích hoạt cập nhật giao thức v1.7.0 | các địa chỉ được sử dụng trong các hợp đồng được triển khai sau khi kích hoạt cập nhật giao thức v1.7.0 |
|:--------------------- |:--------------------------------------------------------------------------------------------------------- |:------------------------------------------------------------------------------------------------------- |
| vmLog                 | 0x09                                                                                                      | 0x3fd                                                                                                   |
| feePayer              | 0x0a                                                                                                      | 0x3fe                                                                                                   |
| validateSender        | 0x0b                                                                                                      | 0x3ff                                                                                                   |

## Địa chỉ 0x01: ecrecover\(hash, v, r, s\) <a id="address-0x-01-ecrecover-hash-v-r-s"></a>

Địa chỉ 0x01 triển khai hàm ecrecover. Nó trả về địa chỉ từ chữ ký đã cho bằng cách tính toán một hàm phục hồi của ECDSA. Nguyên mẫu hàm như sau:

```text
function ecrecover(bytes32 hash, bytes8 v, bytes32 r, bytes32 s) returns (address);
```

## Địa chỉ 0x02: sha256\(data\) <a id="address-0x-02-sha-256-data"></a>

Địa chỉ 0x02 triển khai hàm băm SHA256. Nó trả về hàm băm SHA256 từ dữ liệu đã cho. Nguyên mẫu hàm như sau:

```text
function sha256(bytes data) returns (bytes32);
```

## Địa chỉ 0x03: ripemd160\(data\) <a id="address-0x-03-ripemd-160-data"></a>

Địa chỉ 0x03 triển khai hàm băm RIPEMD160. Nó trả về hàm băm RIPEMD160 từ dữ liệu đã cho. Nguyên mẫu hàm như sau:

```text
function ripemd160(bytes data) returns (bytes32);
```

## Địa chỉ 0x04: datacopy\(data\) <a id="address-0x-04-datacopy-data"></a>

Địa chỉ 0x04 triển khai hàm datacopy \(tức là hàm đồng nhất\). Nó trả về dữ liệu đầu vào trực tiếp mà không có bất kỳ sửa đổi nào. Hợp đồng đã lập trước này không được hỗ trợ bởi trình biên dịch Solidity. Có thể sử dụng đoạn mã sau với assembly trực tiếp để gọi hợp đồng đã lập trước này.

```text
function callDatacopy(bytes memory data) public returns (bytes memory) {
    bytes memory ret = new bytes(data.length);
    assembly {
        let len := mload(data)
        if iszero(call(gas, 0x04, 0, add(data, 0x20), len, add(ret,0x20), len)) {
            invalid()
        }
    }

    return ret;
}     
```

## Địa chỉ 0x05: bigModExp\(base, exp, mod\) <a id="address-0x05-bigmodexp-base-exp-mod"></a>

Địa chỉ 0x05 triển khai công thức `base**exp % mod`. Nó trả về kết quả từ dữ liệu đã cho. Hợp đồng đã lập trước này không được hỗ trợ bởi trình biên dịch Solidity. Có thể sử dụng đoạn mã sau để gọi hợp đồng đã lập trước này. Lưu ý rằng mặc dù hợp đồng đã lập trước này hỗ trợ độ dài đầu vào tùy ý, nhưng đoạn mã dưới đây sử dụng độ dài đầu vào cố định làm ví dụ.

```text
function callBigModExp(bytes32 base, bytes32 exponent, bytes32 modulus) public returns (bytes32 result) {
    assembly {
        // free memory pointer
        let memPtr := mload(0x40)

        // length of base, exponent, modulus
        mstore(memPtr, 0x20)
        mstore(add(memPtr, 0x20), 0x20)
        mstore(add(memPtr, 0x40), 0x20)

        // assign base, exponent, modulus
        mstore(add(memPtr, 0x60), base)
        mstore(add(memPtr, 0x80), exponent)
        mstore(add(memPtr, 0xa0), modulus)

        // call the precompiled contract BigModExp (0x05)
        let success := call(gas, 0x05, 0x0, memPtr, 0xc0, memPtr, 0x20)
        switch success
        case 0 {
            revert(0x0, 0x0)
        } default {
            result := mload(memPtr)
        }
    }
}
```

## Địa chỉ 0x06: bn256Add\(ax, ay, bx, by\) <a id="address-0x-06-bn-256-add-ax-ay-bx-by"></a>

Địa chỉ 0x06 triển khai chức năng cộng điểm trên đường cong elliptic gốc. Nó trả về một điểm trên đường cong elliptic biểu diễn `(ax, ay) + (bx, by)`, trong đó \(ax, ay\) và \(bx, by\) là các điểm hợp lệ trên đường cong bn256. Hợp đồng đã lập trước này không được hỗ trợ bởi trình biên dịch Solidity. Có thể sử dụng đoạn mã sau để gọi hợp đồng đã lập trước này.

```text
function callBn256Add(bytes32 ax, bytes32 ay, bytes32 bx, bytes32 by) public returns (bytes32[2] memory result) {
    bytes32[4] memory input;
    input[0] = ax;
    input[1] = ay;
    input[2] = bx;
    input[3] = by;
    assembly {
        let success := call(gas, 0x06, 0, input, 0x80, result, 0x40)
        switch success
        case 0 {
            revert(0,0)
        }
    }
}
```

## Địa chỉ 0x07: bn256ScalarMul\(x, y, scalar\) <a id="address-0x-07-bn-256-scalarmul-x-y-scalar"></a>

Địa chỉ 0x07 triển khai phép nhân đường cong elip gốc với giá trị vô hướng. Nó trả về một điểm trên đường cong elliptic biểu diễn `scalar * (x, y)`, trong đó \(x, y\) là một điểm hợp lệ trên đường cong bn256. Hợp đồng đã lập trước này không được hỗ trợ bởi trình biên dịch Solidity. Có thể sử dụng đoạn mã sau để gọi hợp đồng đã lập trước này.

```text
function callBn256ScalarMul(bytes32 x, bytes32 y, bytes32 scalar) public returns (bytes32[2] memory result) {
    bytes32[3] memory input;
    input[0] = x;
    input[1] = y;
    input[2] = scalar;
    assembly {
        let success := call(gas, 0x07, 0, input, 0x60, result, 0x40)
        switch success
        case 0 {
            revert(0,0)
        }
    }
}
```

## Địa chỉ 0x08: bn256Pairing\(a1, b1, a2, b2, a3, b3, ..., ak, bk\) <a id="address-0x-08-bn-256-pairing-a-1-b-1-a-2-b-2-a-3-b-3-ak-bk"></a>

Địa chỉ 0x08 triển khai chức năng ghép đôi trên đường cong elliptic để thực hiện xác minh zkSNARK. Để biết thêm thông tin, vui lòng tham khảo [EIP-197](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-197.md). Hợp đồng đã lập trước này không được hỗ trợ bởi trình biên dịch Solidity. Có thể sử dụng đoạn mã sau để gọi hợp đồng đã lập trước này.

```text
function callBn256Pairing(bytes memory input) public returns (bytes32 result) {
    // input is a serialized bytes stream of (a1, b1, a2, b2, ..., ak, bk) from (G_1 x G_2)^k
    uint256 len = input.length;
    require(len % 192 == 0);
    assembly {
        let memPtr := mload(0x40)
        let success := call(gas, 0x08, 0, add(input, 0x20), len, memPtr, 0x20)
        switch success
        case 0 {
            revert(0,0)
        } default {
            result := mload(memPtr)
        }
    }
}
```

## Địa chỉ 0x09: blake2F\(rounds, h, m, t, f\) <a id="address-0x-3fc-vmlog-str"></a>
Địa chỉ 0x09 triển khai hàm nén BLAKE2b F. Để biết thêm thông tin, vui lòng tham khảo [EIP-152](https://eips.ethereum.org/EIPS/eip-152). Hợp đồng đã lập trước này không được hỗ trợ bởi trình biên dịch Solidity. Có thể sử dụng đoạn mã sau để gọi hợp đồng đã lập trước này.

```text
function callBlake2F(uint32 rounds, bytes32[2] memory h, bytes32[4] memory m, bytes8[2] memory t, bool f) public view returns (bytes32[2] memory) {
    bytes32[2] memory output;

    bytes memory args = abi.encodePacked(rounds, h[0], h[1], m[0], m[1], m[2], m[3], t[0], t[1], f);

    assembly {
        if iszero(staticcall(not(0), 0x09, add(args, 32), 0xd5, output, 0x40)) {
            revert(0, 0)
        }
    }

    return output;
}
```

## Địa chỉ 0x3fd: vmLog\(str\) <a id="address-0x-3fc-vmlog-str"></a>

Địa chỉ 0x3FD được sử dụng để in chuỗi đã chỉ định `str` vào một tập tin cụ thể hoặc chuyển tiếp cho module ghi bản ghi. Để biết thêm thông tin, vui lòng tham khảo [debug\_setVMLogTarget](../../references/json-rpc/debug/logging.md#debug_setvmlogtarget). Lưu ý rằng chỉ nên sử dụng hợp đồng đã lập trước này cho mục đích gỡ lỗi và cần bật tùy chọn `--vmlog` khi khởi động nút Klaytn. Ngoài ra, cấp độ bản ghi của nút Klaytn phải là 4 hoặc cao hơn để xem đầu ra của vmLog. Hợp đồng đã lập trước này không được hỗ trợ bởi trình biên dịch Solidity. Có thể sử dụng đoạn mã sau để gọi hợp đồng đã lập trước này.

```text
function callVmLog(bytes memory str) public {
    address(0x3fd).call(str);
}
```

## Địa chỉ 0x3fe: feePayer\(\) <a id="address-0x-3fd-feepayer"></a>

Địa chỉ 0x3FE trả về người trả phí của giao dịch đang thực thi. Hợp đồng đã lập trước này không được hỗ trợ bởi trình biên dịch Solidity. Có thể sử dụng đoạn mã sau để gọi hợp đồng đã lập trước này.

```text
function feePayer() internal returns (address addr) {
    assembly {
        let freemem := mload(0x40)
        let start_addr := add(freemem, 12)
        if iszero(call(gas, 0x3fe, 0, 0, 0, start_addr, 20)) {
          invalid()
        }
        addr := mload(freemem)
    }
}
```

## Địa chỉ 0x3ff: validateSender\(\) <a id="address-0x-3fe-validatesender"></a>

Địa chỉ 0x3FF xác minh chữ ký của người gửi với thông báo. Vì Klaytn [tách riêng cặp khóa khỏi địa chỉ](../accounts.md#decoupling-key-pairs-from-addresses), nên cần phải xác minh rằng một chữ ký được ký phù hợp bởi người gửi tương ứng. Để làm điều đó, hợp đồng đã lập trước này nhận ba tham số sau:

* Địa chỉ của người gửi để lấy khóa công khai
* Hàm băm thông báo được sử dụng để tạo chữ ký
* Các chữ ký được ký bởi các khóa riêng tư của người gửi với hàm băm thông báo đã cho

Hợp đồng đã lập trước này xác minh rằng chữ ký đã cho được ký đúng bởi các khóa riêng tư của người gửi. Lưu ý rằng Klaytn hỗ trợ đa chữ ký một cách tự nhiên, điều đó có nghĩa là có thể có nhiều chữ ký. Mỗi chữ ký phải có độ dài là 65 byte.

```text
function ValidateSender(address sender, bytes32 msgHash, bytes sigs) public returns (bool) {
    require(sigs.length % 65 == 0);
    bytes memory data = new bytes(20+32+sigs.length);
    uint idx = 0;
    uint i;
    for( i = 0; i < 20; i++) {
        data[idx++] = (bytes20)(sender)[i];
    }
    for( i = 0; i < 32; i++ ) {
        data[idx++] = msgHash[i];
    }
    for( i = 0; i < sigs.length; i++) {
        data[idx++] = sigs[i];
    }
    assembly {
        // skip length header.
        let ptr := add(data, 0x20)
        if iszero(call(gas, 0x3ff, 0, ptr, idx, 31, 1)) {
          invalid()
        }
        return(0, 32)
    }
}
```


