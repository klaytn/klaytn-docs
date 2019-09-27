# 솔리디티 - 스마트 컨트랙트 언어

솔리디티가 공식 웹 사이트에 이미 문서화되어 있으므로 이 장에서는 추상적인 개념, 개발 프로세스, 솔리디티로 작성된 예제만을 설명토록 하겠습니다. 솔리디티에 대한 스펙과 구현에 대해서는 아래 [참조](#references)를 참고해주세요. 이 장의 내용은 [참조](#references)의 웹 사이트들을 기반으로 합니다.

## 솔리디티와 Klaytn

[솔리디티](https://github.com/ethereum/solidity)는 이더리움 플랫폼의 스마트 컨트랙트를 구현하기 위한 언어로, 고수준이고 정적인 컨트랙트 지향 언어입니다. 원래 솔리디티가 이더리움을 위해 설계되었지만 일반적인 스마트 컨트랙트를 작성하기에도 적합합니다. 따라서 Klaytn과 같은 블록체인 플랫폼에서도 사용할 수 있습니다.

공식적으로 Klaytn은 솔리디티 [v0.4.24](https://github.com/ethereum/solidity/releases/tag/v0.4.24) 버전과 [v0.5.6](https://github.com/ethereum/solidity/releases/tag/v0.5.6) 버전을 지원합니다. 이는 v0.4.24 또는 v0.5.6의 솔리디티 컴파일러로 생성된 바이트코드는 Klaytn 네트워크에서 배포되고 실행될 수 있다는 것입니다. 또한 Klaytn의 스마트 컨트랙트를 개발할 때 [Remix](https://remix.ethereum.org/) \(브라우저 기반 IDE\)와 [Truffle](https://github.com/trufflesuite/truffle) \(개발 프레임워크\)을 활용할 수 있습니다. Klaytn 팀은 이더리움 개발 도구와 Klaytn 개발 도구의 호환성을 유지하고자 하지만, 필요에 따라 이더리움 도구보다 향상되거나 업데이트된 버전의 도구를 Klaytn 스마트 컨트랙트 개발자들에게 제공할 수도 있습니다.

스마트 컨트랙트를 개발할 때 Remix 또는 Truffle을 활용하는 것이 편리하지만, 아래 웹 페이지들의 안내에 따라 솔리디티 컴파일러를 빌드하거나 설치하여 로컬로 사용할 수도 있습니다.

* [Installing the Solidity Compiler v0.4.24](https://solidity.readthedocs.io/en/v0.4.24/installing-solidity.html)
* [Installing the Solidity Compiler v0.5.6](https://solidity.readthedocs.io/en/v0.5.6/installing-solidity.html)

명령 줄 솔리디티 컴파일러는 두 가지가 있습니다.

* *solc*: 모든 기능을 갖춘 컴파일러입니다. 
  * 솔리디티 문서에서도 안내하고 있습니다.
* *solcjs*: *solc*의 자바스크립트 버전입니다. 
  * [solc-js](https://github.com/ethereum/solc-js)라는 별도의 프로젝트로 있습니다.
  * *solcjs*의 명령 줄 옵션은 *solc*의 옵션과 호환되지 않습니다.

솔리디티를 시작하는 데에 유용한 기타 안내는 아래를 참고해주세요.

* [Top Solidity tutorials](https://medium.com/coinmonks/top-solidity-tutorials-4e7adcacced8)

## 스마트 컨트랙트 작성하기

이 섹션에서는 솔리디티 소스 코드의 예제를 통해 스마트 컨트랙트가 어떤 형태이고 이를 어떻게 작성할 수 있는지 보여드릴게요. 여기서 제시된 코드는 실제로 사용되기보다는 단순히 설명을 목적으로 제공된 코드입니다. 코드 중 `(require)`라고 주석이 달려있는 행은 솔리디티 파일에서 필수로 포함되어야 하는 부분이고, `(optional)`라고 주석이 있는 행은 항상 필요한 것이 아님을 의미합니다. `Ln:`은 실제 솔리디티 코드가 아니라 행 번호를 표시하기 위해 편의상 추가한 심볼입니다. 실제 사용 시에는 이 심볼들은 제외하세요.

```text
L01: pragma solidity 0.5.6;   // (required) 버전 pragma
L02:
L03: import "filename";        // (optional) 다른 소스 파일을 임포트
L04:
L05: // (optional) 스마트 컨트랙트 정의
L06: contract UserStorage {
L07:    mapping(address => uint) userData;  // 상태 변수
L08:
L09:    function set(uint x) public {
L10:       userData[msg.sender] = x;
L11:    }
L12:
L13:    function get() public view returns (uint) {
L14:       return userData[msg.sender];
L15:    }
L16:
L17:    function getUserData(address user) public view returns (uint) {
L18:       return userData[user];
L19:    }
L20: }
```

위 코드는 별도의 설명이 필요치 않으므로 다른 프로그래밍 언어에 익숙한 분들은 아래의 설명을 건너뛰어 다음 섹션으로 이동하셔도 됩니다. 혹시 위 코드가 어떤 작업을 하는지 명확한 이해가 어려우시거나 솔리디티가 첫 프로그래밍 언어이신 분들을 위해 아래와 같이 간단한 설명을 드립니다.

* 이중 슬래시 \(`//`\)로 시작하는 부분은 코드가 아니라 주석입니다. 코드의 특정 부분에 주석을 달아 설명을 첨부하는 데에 사용됩니다. 컴파일러는 이러한 주석을 무시합니다.
* `L01`의 `pragma`는 최소 컴파일러 버전을 나타냅니다. - `L03`의 `import`는 "`filename`"으로부터 모든 전역 심볼을 임포트합니다. `filename`은 실제 파일 이름이어야 합니다.
* `L05` - `L20`은 `UserStorage`라는 스마트 컨트랙트를 정의하는 부분입니다. `contract` 키워드는 컨트랙트의 이름 앞에 위치하여 이 코드가 스마트 컨트랙트임을 나타냅니다. 솔리디티의 컨트랙트는 객체 지향 언어의 클래스와 유사합니다. 컨트랙트는 상태 변수, 함수, 함수 변경자(modifier), 이벤트, 구조체 자료형, 열거식 자료형에 대한 선언을 포함할 수 있습니다. 또한 컨트랙트는 다른 컨트랙트로부터 상속될 수도 있습니다. 위 예제 코드에는 하나의 컨트랙트만 있지만, 한 솔리디티 파일에 여러 개의 컨트랙트가 정의될 수도 있습니다.
* `L07`의 `userData` 맵핑 자료형의 상태 변수입니다. 상태 변수는 컨트랙트 스토리지에 영구적으로 저장됩니다. 상태 변수 `userData`는 `address`와 `uint` 값을 맵핑합니다. `address` 자료형은 20바이트 길이의 주소입니다 \(Klaytn은 이더리움과 같이 20바이트 길이의 주소를 사용합니다\).
* `L09`에서는 `x`를 메세지 발신자의 `userData`에 저장하는 퍼블릭 함수 `set`를 정의합니다. `msg.sender` 변수는 솔리디티에서 정의된 특별한 변수로 메세지 \(*즉* current call\) 발신자의 주소를 나타냅니다. `public` 키워드는 이 함수가 컨트랙트 인터페이스의 일부이며 내외부적으로\(externally or internally\) 호출될 수 있음을 나타냅니다.
* `L13`의 `get` 함수와 `L17`의 `getUserData` 함수는 `view`로 선언되었습니다. 이는 이 함수들의 상태 변수가 수정되면 안 된다는 것을 의미합니다. 이 함수들의 선언 부에는 `returns (uint)`가 있습니다. 이는 함수가 반환하는 값의 자료형이 `uint` 임을 의미합니다.

솔리디티 언어의 구문과 문법에 대한 자세한 내용은 [Solidity documentation v0.4.24](https://solidity.readthedocs.io/en/v0.4.24/solidity-in-depth.html) 또는 [Solidity documentation v0.5.6](https://solidity.readthedocs.io/en/v0.5.6/solidity-in-depth.html)을 참고해주세요.

## 컴파일, 배포, 실행하기

솔리디티 코드를 컴파일하는 방법 중 하나는 명령 줄 컴파일러인 *solc*를 사용하는 것입니다. 이 컴파일러는 간단한 바이너리와 어셈블리부터 추상 구문 트리 \(파스 트리\)에 이르기까지 다양한 결과물을 생성합니다. 위의 코드를 `UserStorage.sol`라고 저장한다고 할 때 \(위 예제에서 `L03`는 제외하였습니다\), `UserStorage.sol`을 컴파일하는 예제는 다음과 같습니다.

```bash
$ solc --bin UserStorage.sol
```

* 이 명령은 컴파일 결과를 바이너리 *즉*, 바이트코드로 출력합니다.

```bash
solc -o output --bin --ast --asm UserStorage.sol
```

* 컴파일러는\(`--bin`에 의해\) 바이너리, \(`--ast`에 의해\) 추상 구문트리, \(`--asm`에 의해\) 어셈블리 코드를 각각 별도의 파일로 `output` 디렉토리에 생성합니다.

```bash
solc --optimize --bin UserStorage.sol
```

* 더 나은 성능을 위해 `--optimize` 플래그를 사용하여 컴파일 과정을 최적화할 수도 있습니다.

스마트 컨트랙트를 컴파일, 배포, 실행하는 데에 참고할 수 있는 자료는 아래와 같습니다.

* [Using the Solidity command-line compiler v0.4.24](https://solidity.readthedocs.io/en/v0.4.24/using-the-compiler.html)
* [Using the Solidity command-line compiler v0.5.6](https://solidity.readthedocs.io/en/v0.5.6/using-the-compiler.html)
* [Compiling contracts using Remix](https://remix.readthedocs.io/en/latest/compile_tab.html)
* [Running transactions with Remix](https://remix.readthedocs.io/en/latest/run_tab.html)
* [Building smart contracts with Remix](https://remix.readthedocs.io/en/latest/workshop_Building_smart_contracts_with_Remix.html)
* [Compiling contracts with Truffle](https://truffleframework.com/docs/truffle/getting-started/compiling-contracts)
* [Deploying contracts with Truffle](https://truffleframework.com/docs/truffle/getting-started/running-migrations)

참고: 이 장은 나중에 업데이트될 예정입니다.

## 스마트 컨트랙트 디버깅

완성도 높은 디버깅 도구가 별로 없기 때문에 다른 프로그래밍 언어로 작성된 코드보다 솔리디티로 작성된 코드를 디버깅 하는 것이 더 까다롭습니다. 솔리디티 디버깅에 대한 참고 자료는 아래와 같습니다.

* [Debugging a transaction with Remix](https://remix-ide.readthedocs.io/en/latest/debugger.html)
* [Tutorial on debugging transactions with Remix](https://remix-ide.readthedocs.io/en/latest/tutorial_debug.html)
* [Debugging contracts with Truffle](https://truffleframework.com/docs/truffle/getting-started/debugging-your-contracts)

참고: 이 장은 나중에 업데이트 될 예정입니다.

## 스마트 컨트랙트 모범 사례

스마트 컨트랙트의 보안 문제와 코드 품질 문제를 해결하려면 솔리디티 프로그래밍의 모범 사례를 연구하고 참고하는 것이 중요합니다. 솔리디티 모범 사례에 대한 참고 자료는 아래와 같습니다.

* [Smart Contract Security Best Practices](https://github.com/ConsenSys/smart-contract-best-practices)

참고: 이 장은 나중에 업데이트될 예정입니다.

## 참고

* [Solidity GitHub site](https://github.com/ethereum/solidity)
* [Solidity v0.4.24 documentation](https://solidity.readthedocs.io/en/v0.4.24/index.html)
* [Solidity v0.5.6 documentation](https://solidity.readthedocs.io/en/v0.5.6/index.html)
* [Remix documentation](https://remix-ide.readthedocs.io/en/latest/)
* [Truffle documentation](https://truffleframework.com/docs/truffle/overview)