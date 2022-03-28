# 미리 컴파일된 컨트랙트(Precompiled Contracts) <a id="precompiled-contracts"></a>

Klaytn은 몇 가지 유용한 미리 컴파일된 컨트랙트를 제공합니다. 이러한 컨트랙트들은 플랫폼 자체에서 기본 구현되어 있습니다. 미리 컴파일된 컨트랙트 중 주소 0x01부터 0x08까지의 컨트랙트는 이더리움에서 구현된 것과 동일합니다. 여기에 추가로 Klaytn은 이더리움에 없는 새로운 기능을 지원하기 위해 주소 0x09부터 0x0B까지의 미리 컴파일된 컨트랙트를 제공합니다.

{% hint style="success" %}
NOTE: Klaytn v1.7.0부터 도입된 프로토콜 업그레이드(하드 포크)로 미리 컴파일된 컨트랙트 주소 세 개가 변경되었으며, **blake2F** 컨트랙트가 추가되었습니다.

v1.7.0 프로토콜 업그레이드 - **Istanbul** 하드포크 및 Klaytn의 자체 사항들을 포함하는 비호환 변경이 적용됩니다. Baobab 네트워크의 경우 블록 번호 `#75373312`부터 적용됩니다. Cypress mainnet will be subject to the same protocol upgrade in the next version.

v1.7.3 프로토콜 업그레이드 - **London** 하드 포크의 Base Fee를 포함한 비호환 변경이 적용됩니다. Baobab 네트워크의 경우 블록 번호 `#80295291`부터 적용됩니다. Cypress mainnet will be subject to the same protocol upgrade in the next version.

프로토콜 업데이트 전에 배포된 컨트랙트는 이전 주소를 써야 합니다.
* case 1) Baobab에서 블록번호 `#75373310`에 배포된 컨트랙트는 0x09, 0x0a와 0x0b를 각각 vmLog, feePayer, and validateSender로 인식하지만,  blake2f는 사용될 수 없습니다.
* case 2) Baobab에서 블록번호 #75373314에 배포된 컨트랙트는 0x09를 blake2f로, 그리고 0x3fd, 0x3fe와 0xff를 각각 vmLog, feePayer와 validateSender로 인식합니다.

이전 문서는 [이전 문서](precompiled-contracts-previous.md)를 참고해주세요.
{% endhint %}

| 미리 컴파일된 컨트랙트   | addresses used in the contracts deployed before v1.7.0 protocol update activation | address used in the contracts deployed after v1.7.0 protocol update activation |
|:-------------- |:--------------------------------------------------------------------------------- |:------------------------------------------------------------------------------ |
| vmLog          | 0x09                                                                              | 0x3fd                                                                          |
| feePayer       | 0x0a                                                                              | 0x3fe                                                                          |
| validateSender | 0x0b                                                                              | 0x3ff                                                                          |

## 주소 0x01: ecrecover\(hash, v, r, s\) <a id="address-0x-01-ecrecover-hash-v-r-s"></a>

0x01 주소는 ecrecover 함수를 구현한 미리 컴파일된 컨트랙트입니다. ecrecover 함수는 어떤 서명을 입력받으면 ECDSA의 recovery 함수를 계산하여 주소를 반환합니다. 함수의 프로토타입은 다음과 같습니다.

```text
function ecrecover(bytes32 hash, bytes8 v, bytes32 r, bytes32 s) returns (address);
```

## 주소 0x02: sha256\(data\) <a id="address-0x-02-sha-256-data"></a>

0x02 주소는 SHA256 함수를 구현한 미리 컴파일된 컨트랙트입니다. SHA256 함수는 어떤 데이터를 입력받으면 SHA256 해시를 반환합니다. 함수의 프로토타입은 다음과 같습니다.

```text
function sha256(bytes data) returns (bytes32);
```

## 주소 0x03: ripemd160\(data\) <a id="address-0x-03-ripemd-160-data"></a>

0x03 주소는 RIPEMD160 함수를 구현한 미리 컴파일된 컨트랙트입니다. RIPEMD160 함수는 어떤 데이터를 입력받으면 SHA256 해시를 반환합니다. 함수의 프로토타입은 다음과 같습니다.

```text
function ripemd160(bytes data) returns (bytes32);
```

## 주소 0x04: datacopy\(data\) <a id="address-0x-04-datacopy-data"></a>

0x04 주소는 datacopy \(즉, 항등함수\)를 구현한 미리 컴파일된 컨트랙트입니다. datacopy 함수는 입력받은 데이터를 그대로 반환합니다. 이 미리 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원하지 않습니다. 대신 인라인 어셈블리가 있는 아래 코드를 사용하여 이 컨트랙트를 호출할 수 있습니다.

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

## 주소 0x05: bigModExp\(base, exp, mod\) <a id="address-0x05-bigmodexp-base-exp-mod"></a>

0x05 주소는 `base**exp % mod`라는 공식을 구현한 미리 컴파일된 컨트랙트입니다. 이 공식에 데이터를 입력하여 얻은 결과를 반환합니다. 이 미리 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원하지 않습니다. 대신 아래 코드를 사용하여 이 컨트랙트를 호출할 수 있습니다. 해당 컨트랙트는 실제로 임의 길이의 입력을 받을 수 있지만, 아래 예제에서는 고정 길이의 입력으로 되어 있습니다.

```text
function callBigModExp(bytes32 base, bytes32 exponent, bytes32 modulus) public returns (bytes32 result) {
    assembly {
        // 사용 가능한 메모리 포인터
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

0x06 주소는 타원 곡선 점 덧셈 연산(elliptic curve point addition)을 구현한 미리 컴파일된 컨트랙트입니다. 해당 연산은 타원 곡선 bn256 상의 유효한 두 점 \(ax, ay\)와 \(bx, by\)를 입력받아 타원 곡선 위의 점 `(ax, ay) + (bx, by)`를 결과로 반환합니다. 이 미리 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원하지 않습니다. 대신 아래 코드를 사용하여 이 컨트랙트를 호출할 수 있습니다.

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

0x07 주소는 스칼라값의 타원 곡선 점 곱셈 연산을 구현한 미리 컴파일된 컨트랙트입니다. 해당 연산은 타원 곡선 bn256 상의 유효한 점 \(x, y\)을 입력받아 타원 곡선 위의 점 `scalar * (x, y)`를 결과로 반환합니다. 이 미리 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원하지 않습니다. 대신 아래 코드를 사용하여 이 컨트랙트를 호출할 수 있습니다.

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

0x08 주소는 zkSNARK 검증을 하기 위해 타원 곡선 페어링 연산을 구현한 미리 컴파일된 컨트랙트입니다. 자세한 내용은 [EIP-197](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-197.md)를 참고해주세요. 이 미리 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원하지 않습니다. 대신 아래 코드를 사용하여 이 컨트랙트를 호출할 수 있습니다.

```text
function callBn256Pairing(bytes memory input) public returns (bytes32 result) {
    // 입력은 (G_1 x G_2)^k로부터 나온 (a1, b1, a2, b2, ..., ak, bk)의 일련화된 바이트 스트림입니다.
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

## Address 0x09: blake2F\(rounds, h, m, t, f\) <a id="address-0x-3fc-vmlog-str"></a>
0x09 주소는 BLAKE2b F 압축 함수(compression function)를 구현합니다. 자세한 내용은 [EIP-152](https://eips.ethereum.org/EIPS/eip-152)를 참고해주세요. 이 미리 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원하지 않습니다. 대신 아래 코드를 사용하여 이 컨트랙트를 호출할 수 있습니다.

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

## 0x3fd 주소: vmLog\(str\) <a id="address-0x-3fc-vmlog-str"></a>

0x3FD 주소는 특정 문자열 `str`을 특정 파일로 출력하거나 로깅 모듈에 전달하는 미리 컴파일된 컨트랙트입니다. For more information, see [debug\_setVMLogTarget](../../../dapp/json-rpc/api-references/debug/logging.md#debug_setvmlogtarget). 이 컨트랙트는 오직 디버깅을 목적으로 사용되어야 하며, Klaytn 노드를 시작할 때 `--vmlog` 옵션을 활성화해야 사용할 수 있습니다. 또한 vmLog의 출력을 보려면 Klaytn 노드의 로깅 수준이 4 이상이어야 합니다. 이 미리 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원하지 않습니다. 대신 아래 코드를 사용하여 이 컨트랙트를 호출할 수 있습니다.

```text
function callVmLog(bytes memory str) public {
    address(0x3fd).call(str);
}
```

## 0x3fe 주소: feePayer\(\) <a id="address-0x-3fd-feepayer"></a>

0x3FE  주소는 실행 트랜잭션 비용 납부 계정을 반환합니다. 이 미리 컴파일된 컨트랙트는 솔리디티 컴파일러에서 지원하지 않습니다. 대신 아래 코드를 사용하여 이 컨트랙트를 호출할 수 있습니다.

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

## 0x3ff 주소: validateSender\(\) <a id="address-0x-3fe-validatesender"></a>

0x3FF는 주소의 미리 컴파일된 컨트랙트는 메세지 발신자의 서명을 검증합니다. Klaytn은 [주소로부터 키 쌍\(key pairs\) 분리하기](../../../klaytn/design/accounts.md#decoupling-key-pairs-from-addresses) 때문에 해당 발신자가 올바르게 서명했는지 검증해야 합니다. 이를 위해 이 컨트랙트는 세 개의 매개 변수를 입력받습니다.

* 공개키를 가져오는 데에 사용되는 발신자의 주소
* 서명을 생성하는 데에 사용된 메세지의 해시
* 메세지의 해시를 발신자의 개인키로 서명한 서명 값

이 컨트랙트는 주어진 서명 값이 발신자의 개인키로 올바르게 서명된 것인지 검증합니다. Klaytn은 기본적으로 다중 서명을 지원하기 때문에 여러 개의 서명이 있을 수도 있습니다. 각 서명의 길이는 65바이트입니다.

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
        // 길이를 나타내는 헤더는 건너뜁니다
        let ptr := add(data, 0x20)
        if iszero(call(gas, 0x3ff, 0, ptr, idx, 31, 1)) {
          invalid()
        }
        return(0, 32)
    }
}
```


