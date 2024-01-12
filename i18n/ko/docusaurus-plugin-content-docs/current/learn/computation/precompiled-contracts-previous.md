# Precompiled Contracts

Klaytn은 몇 가지 유용한 사전 컴파일된 컨트랙트를 제공합니다. 이러한 컨트랙트는 플랫폼 자체에서 네이티브 구현으로 구현됩니다. 주소 0x01부터 0x08까지의 사전 컴파일된 컨트랙트는 이더리움의 컨트랙트와 동일합니다. Klaytn은 추가로 0x09부터 0x0B까지 사전 컴파일된 컨트랙트를 구현하여 새로운 Klaytn 기능을 지원합니다.

:::note

이 문서에는 프로토콜 업그레이드 활성화 이전에 사용된 가스 요금표가 포함되어 있습니다.
최신 문서를 원하시면 [최신 문서](precompiled-contracts.md)를 참조하세요.

:::

## 주소 0x01: ecrecover(hash, v, r, s) <a id="address-0x-01-ecrecover-hash-v-r-s"></a>

0x01 주소는 ecrecover를 구현합니다. 이 함수는 ECDSA의 복구 함수를 계산하여 주어진 서명에서 주소를 반환합니다. 함수 프로토타입은 다음과 같습니다:

```text
function ecrecover(bytes32 hash, bytes8 v, bytes32 r, bytes32 s) returns (address);
```

## 주소 0x02: sha256(data) <a id="address-0x-02-sha-256-data"></a>

주소 0x02는 SHA256 해시를 구현합니다. 이 함수는 주어진 데이터에서 SHA256 해시를 반환합니다. 함수 프로토타입은 다음과 같습니다:

```text
function sha256(bytes data) returns (bytes32);
```

## 주소 0x03: ripemd160(data) <a id="address-0x-03-ripemd-160-data"></a>

0x03 주소는 RIPEMD160 해시를 구현합니다. 이 함수는 주어진 데이터에서 RIPEMD160 해시를 반환합니다. 함수 프로토타입은 다음과 같습니다:

```text
function ripemd160(bytes data) returns (bytes32);
```

## 주소 0x04: datacopy(data) <a id="address-0x-04-datacopy-data"></a>

주소 0x04는 데이터 복사 (즉, 신원 함수)를 구현합니다. 이 함수는 수정 없이 입력 데이터를 직접 반환합니다. 이 사전 컴파일된 컨트랙트는 Solidity 컴파일러에서 지원되지 않습니다. 인라인 어셈블리가 포함된 다음 코드를 사용하여 이 사전 컴파일된 컨트랙트를 호출할 수 있습니다.

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

## 주소 0x05: bigModExp(base, exp, mod) <a id="address-0x05-bigmodexp-base-exp-mod"></a>

0x05 주소는 `base**exp % mod` 수식을 구현합니다. 주어진 데이터의 결과를 반환합니다. 이 사전 컴파일된 컨트랙트는 Solidity 컴파일러에서 지원되지 않습니다. 다음 코드를 사용하여 이 사전 컴파일된 컨트랙트를 호출할 수 있습니다. 이 사전 컴파일된 컨트랙트는 임의의 길이의 입력을 지원하지만, 아래 코드에서는 고정된 길이의 입력을 예로 사용합니다.

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

## 주소 0x06: bn256Add(ax, ay, bx, by) <a id="address-0x-06-bn-256-add-ax-ay-bx-by"></a>

주소 0x06은 네이티브 타원 커브 점 덧셈을 구현합니다. 이 주소는 커브 bn256에서 (ax, ay) 및 (bx, by)가 유효한 점이 되도록 `(ax, ay) + (bx, by)`를 나타내는 타원 커브 점을 반환합니다. 이 사전 컴파일된 컨트랙트는 Solidity 컴파일러에서 지원되지 않습니다. 다음 코드를 사용하여 이 사전 컴파일된 컨트랙트를 호출할 수 있습니다.

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

## 주소 0x07: bn256ScalarMul(x, y, scalar) <a id="address-0x-07-bn-256-scalarmul-x-y-scalar"></a>

주소 0x07은 스칼라 값으로 네이티브 타원 커브 곱셈을 구현합니다. 이 주소는 `scalar * (x, y)`를 나타내는 타원 커브 점을 반환하므로 (x, y)는 커브 bn256에서 유효한 커브 점입니다. 이 사전 컴파일된 컨트랙트는 Solidity 컴파일러에서 지원되지 않습니다. 다음 코드를 사용하여 이 사전 컴파일된 컨트랙트를 호출할 수 있습니다.

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

## 주소 0x08: bn256Pairing(a1, b1, a2, b2, a3, b3, ..., ak, bk) <a id="address-0x-08-bn-256-pairing-a-1-b-1-a-2-b-2-a-3-b-3-ak-bk"></a>

0x08 주소는 타원 곡선 파싱 연산을 구현하여 zkSNARK 검증을 수행합니다. 자세한 내용은 [EIP-197](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-197.md)을 참조하세요. 이 사전 컴파일된 컨트랙트는 Solidity 컴파일러에서 지원되지 않습니다. 다음 코드를 사용하여 이 사전 컴파일된 컨트랙트를 호출할 수 있습니다.

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

## 주소 0x09: vmLog(str) <a id="address-0x-09-vmlog-str"></a>

0x09 주소는 지정된 문자열 `str`을 특정 파일에 인쇄하거나 로거 모듈에 전달합니다. 자세한 내용은 [debug_setVMLogTarget](../../references/json-rpc/debug/logging.md#debug_setvmlogtarget)을 참조하세요. 이 사전 컴파일된 컨트랙트는 디버깅 목적으로만 사용해야 하며, Klaytn 노드가 시작될 때 `--vmlog` 옵션을 활성화해야 합니다. 또한, Klaytn 노드의 로그 레벨이 4 이상이어야 vmLog의 출력을 볼 수 있습니다. 이 사전 컴파일된 컨트랙트는 Solidity 컴파일러에서 지원되지 않습니다. 다음 코드를 사용하여 이 사전 컴파일된 컨트랙트를 호출할 수 있습니다.

```text
function callVmLog(bytes memory str) public {
    address(0x09).call(str);
}
```

## 주소 0x0A: feePayer() <a id="address-0x-0-a-feepayer"></a>

0x0A 주소는 실행 중인 트랜잭션의 수수료 납부자를 반환합니다. 이 사전 컴파일된 컨트랙트는 Solidity 컴파일러에서 지원되지 않습니다. 다음 코드를 사용하여 이 사전 컴파일된 컨트랙트를 호출할 수 있습니다.

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

## 주소 0x0B: validateSender() <a id="address-0x-0-b-validatesender"></a>

0x0B 주소는 메시지와 함께 발신자의 서명을 검증합니다. Klaytn은 [주소에서 키 쌍을 분리](../accounts.md#decoupling-key-pairs-from-addresses)하기 때문에, 서명이 해당 발신자가 제대로 서명했는지 검증해야 합니다. 이를 위해 이 사전 컴파일된 계약은 세 가지 매개변수를 받습니다:

- 공개 키를 받기 위한 발신자의 주소
- The message hash that is used to generate the signature
- 서명을 생성하는 데 사용되는 메시지 해시
  발신자의 개인 키가 주어진 메시지 해시로 서명한 서명 \* 발신자의 개인 키가 서명한 서명

사전 컴파일된 컨트랙트는 주어진 서명이 발신자의 개인키에 의해 올바르게 서명되었는지 검증합니다. 클레이튼은 기본적으로 다중 서명을 지원하므로 서명은 여러 개가 될 수 있습니다. 서명의 길이는 65바이트여야 합니다.

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
