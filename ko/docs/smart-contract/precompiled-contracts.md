# 사전 컴파일된 컨트랙트 \(Precompiled Contracts\) 

Klaytn은 몇 가지 유용한 사전 컴파일된 컨트랙트를 제공합니다. 이러한 컨트랙트들은 플랫폼 자체에서 기본 구현되어 있습니다. 사전 컴파일된 컨트랙트 중 주소 0x01부터 0x08까지의 컨트랙트는 이더리움에서 구현된 것과 동일합니다. 여기에 추가로 Klaytn은 이더리움에 없는 새로운 기능을 지원하기 위해 주소 0x09부터 0x0B까지의 사전 컴파일된 컨트랙트를 제공합니다.

## 주소 0x01: ecrecover\(hash, v, r, s\) <a id="address-0x-01-ecrecover-hash-v-r-s"></a>

0x01 주소는 ecrecover 함수를 구현한 사전 컴파일된 컨트랙트입니다. ecrecover 함수는 어떤 서명을 입력받으면 ECDSA의 recovery 함수를 계산하여 주소를 반환합니다. 함수의 프로토타입은 다음과 같습니다.

```text
function ecrecover(bytes32 hash, bytes8 v, bytes32 r, bytes32 s) returns (address);
```

## 주소 0x02: sha256\(data\) <a id="address-0x-02-sha-256-data"></a>

0x02 주소는 SHA256 함수를 구현한 사전 컴파일된 컨트랙트입니다. SHA256 함수는 어떤 데이터를 입력받으면 SHA256 해시를 반환합니다. 함수의 프로토타입은 다음과 같습니다.

```text
function sha256(bytes data) returns (bytes32);
```

## 주소 0x03: ripemd160\(data\) <a id="address-0x-03-ripemd-160-data"></a>

0x03 주소는 RIPEMD160 함수를 구현한 사전 컴파일된 컨트랙트입니다. RIPEMD160 함수는 어떤 데이터를 입력받으면 SHA256 해시를 반환합니다. 함수의 프로토타입은 다음과 같습니다.

```text
function ripemd160(bytes data) returns (bytes32);
```

## 주소 0x04: datacopy\(data\) <a id="address-0x-04-datacopy-data"></a>

0x04 주소는 datacopy \(즉, 항등 함수\)를 구현한 사전 컴파일된 컨트랙트입니다. datacopy 함수는 입력받은 데이터를 그대로 반환합니다. 이 사전 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원하지 않습니다. 대신 인라인 어셈블리가 있는 아래 코드를 사용하여 이 컨트랙트를 호출할 수 있습니다.

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

## 주소 0x05: bigModExp\(base, exp, mod\)

0x05 주소는 `base**exp % mod`라는 공식을 구현한 사전 컴파일된 컨트랙트입니다. 이 공식에 데이터를 입력하여 얻은 결과를 반환합니다. 이 사전 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원하지 않습니다. 대신 아래 코드를 사용하여 이 컨트랙트를 호출할 수 있습니다. 해당 컨트랙트는 실제로 임의의 길이의 입력을 받을 수 있지만, 아래 예제에서는 고정 길이의 입력으로 되어 있습니다.

```text
function callBigModExp(bytes32 base, bytes32 exponent, bytes32 modulus) public returns (bytes32 result) {
    assembly {
        // 사용가능한 메모리 포인터
        let memPtr := mload(0x40)

        // base, exponent, modulus의 길이
        mstore(memPtr, 0x20)
        mstore(add(memPtr, 0x20), 0x20)
        mstore(add(memPtr, 0x40), 0x20)

        // base, exponent, modulus 할당
        mstore(add(memPtr, 0x60), base)
        mstore(add(memPtr, 0x80), exponent)
        mstore(add(memPtr, 0xa0), modulus)

        // 사전 컴파일된 컨트랙트 BigModExp (0x05) 호출
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

## 주소 0x06: bn256Add\(ax, ay, bx, by\) <a id="address-0x-06-bn-256-add-ax-ay-bx-by"></a>

0x06 주소는 타원 곡선 점 덧셈 연산을 구현한 사전 컴파일된 컨트랙트입니다. 해당 연산은 타원 곡선 bn256 상의 유효한 두 점 \(ax, ay\)와 \(bx, by\)를 입력받아 타원 곡선 위의 점 `(ax, ay) + (bx, by)`를 결과로 반환합니다. 이 사전 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원하지 않습니다. 대신 아래 코드를 사용하여 이 컨트랙트를 호출할 수 있습니다.

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

## 주소 0x07: bn256ScalarMul\(x, y, scalar\) <a id="address-0x-07-bn-256-scalarmul-x-y-scalar"></a>

0x07 주소는 스칼라 값의 타원 곡선 점 곱셈 연산을 구현한 사전 컴파일된 컨트랙트입니다. 해당 연산은 타원 곡선 bn256 상의 유효한 점 \(x, y\)을 입력받아 타원 곡선 위의 점 `scalar * (x, y)`를 결과로 반환합니다. 이 사전 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원하지 않습니다. 대신 아래 코드를 사용하여 이 컨트랙트를 호출할 수 있습니다.

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

## 주소 0x08: bn256Pairing\(a1, b1, a2, b2, a3, b3, ..., ak, bk\) <a id="address-0x-08-bn-256-pairing-a-1-b-1-a-2-b-2-a-3-b-3-ak-bk"></a>

0x08 주소는 zkSNARK 검증을 하기 위해 타원 곡선 페어링 연산을 구현한 사전 컴파일된 컨트랙트입니다. 자세한 내용은 [EIP-197](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-197.md)를 참고해주세요. 이 사전 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원하지 않습니다. 대신 아래 코드를 사용하여 이 컨트랙트를 호출할 수 있습니다.

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

## 주소 0x09: vmLog\(str\) <a id="address-0x-09-vmlog-str"></a>

The address 0x09 prints the specified string `str` to a specific file or passes it to the logger module. For more information, see [debug\_setVMLogTarget](../bapp/json-rpc/api-references/debug/logging.md#debug_setvmlogtarget). Note that this precompiled contract should be used only for debugging purposes, and it is required to enable the `--vmlog` option when the Klaytn node starts. Also, the log level of the Klaytn node should be 4 or more to see the output of vmLog. 이 사전 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원하지 않습니다. 대신 아래 코드를 사용하여 이 컨트랙트를 호출할 수 있습니다.

```text
function callVmLog(bytes memory str) public {
    address(0x09).call(str);
}
```

## 주소 0x0A: feePayer\(\) <a id="address-0x-0-a-feepayer"></a>

The address 0x0A returns a fee payer of the executing transaction. 이 사전 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원하지 않습니다. 대신 아래 코드를 사용하여 이 컨트랙트를 호출할 수 있습니다.

```text
function feePayer() internal returns (address addr) {
    assembly {
        let freemem := mload(0x40)
        let start_addr := add(freemem, 12)
        if iszero(call(gas, 0x0a, 0, 0, 0, start_addr, 20)) {
          invalid()
        }
        addr := mload(freemem)
    }
}
```

## 주소 0x0B: validateSender\(\) <a id="address-0x-0-b-validatesender"></a>

The address 0x0B validates the sender's signature with the message. Since Klaytn [decouples key pairs from addresses](../klaytn/design/accounts.md#decoupling-key-pairs-from-addresses), it is required to validate that a signature is properly signed by the corresponding sender. To do that, this precompiled contract receives three parameters:

* The sender's address to get the public keys
* The message hash that is used to generate the signature
* The signatures that are signed by the sender's private keys with the given message hash

The precompiled contract validates that the given signature is properly signed by the sender's private keys. Note that Klaytn natively support multi signatures, the signatures can be multiple. The length of a signature must be 65 byte long.

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
        if iszero(call(gas, 0x0b, 0, ptr, idx, 31, 1)) {
          invalid()
        }
        return(0, 32)
    }
}
```