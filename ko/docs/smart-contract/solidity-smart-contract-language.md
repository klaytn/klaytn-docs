# 솔리디티 - 스마트 컨트랙트 언어 <a id="solidity-smart-contract-language"></a>

솔리디티가 공식 웹 사이트에 이미 문서화되어 있으므로 이 장에서는 상위 개념, 개발 프로세스, 솔리디티로 작성된 예제만을 설명토록 하겠습니다. 솔리디티 언어 스펙과 구현에 대해서는 아래 [참조](#references)를 참고해주세요. 이 장의 내용은 [참조](#references)의 웹 사이트들을 기반으로 합니다.

## 솔리디티와 Klaytn <a id="solidity-and-klaytn"></a>

[솔리디티](https://github.com/ethereum/solidity)는 이더리움 플랫폼의 스마트 컨트랙트를 구현하기 위한 언어로, 고수준이고 정적인 컨트랙트 지향 언어입니다. 솔리디티는 원래 이더리움을 위해 설계되었지만 스마트 컨트랙트 작성을 위한 일반적인 언어로도 적합합니다. 따라서 Klaytn과 같은 블록체인 플랫폼에서도 사용할 수 있습니다.

Klaytn is officially compatible with **Constantinople** Ethereum Virtual Machine (EVM) version. Backward compatibility is not guaranteed with other EVM versions on Klaytn. Thus, it is highly recommended to compile Solidity code with the Constantinople target option. Please refer to [how to set the EVM version of solc](https://solidity.readthedocs.io/en/latest/using-the-compiler.html#setting-the-evm-version-to-target).

 Development tools such as [Remix](https://remix.ethereum.org/) \(a browser-based IDE\) and [Truffle](https://github.com/trufflesuite/truffle) \(a development framework\) can be utilized when developing smart contracts for Klaytn. The Klaytn team will attempt to maintain compatibility between Ethereum's development tools and Klaytn's but may elect to provide the Klaytn smart contract developers with enhanced or updated versions of those tools when necessary.

It is convenient to exploit Remix or Truffle to develop smart contracts, but the Solidity compiler can be used locally, by building or installing it by following the instructions described in the web page below:

* [Installing the Solidity Compiler](https://docs.soliditylang.org/en/latest/installing-solidity.html)

Note that there are two command-line Solidity compilers:

* _solc_: 모든 기능을 갖춘 컴파일러입니다.
  * 솔리디티 문서에서도 안내하고 있습니다.
* _solcjs_: _solc_의 자바스크립트 버전입니다.
  * [solc-js](https://github.com/ethereum/solc-js)라는 별도의 프로젝트로 있습니다.
  * _solcjs_의 커맨드라인 옵션은 _solc_의 옵션과 호환되지 않습니다.

Other materials that are useful for getting started with Solidity include the following:

* [최고의 솔리디티 튜토리얼들](https://medium.com/coinmonks/top-solidity-tutorials-4e7adcacced8)

## 스마트 컨트랙트 작성하기 <a id="how-to-write-a-smart-contract"></a>

This section presents an example of Solidity source code to provide readers with an idea of how smart contracts look and how to write a contract. Note that the code included here is provided solely for explanatory purposes; it is not intended for production purposes. In the code, `(require)` means that the line is required for any Solidity source file while `(optional)` indicates that the line is not always needed. The symbol `Ln:` is not part of the Solidity code and is included here only to show the line numbers. Please do not include these symbols in source code intended for real use.

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

The above code should be self-explanatory; thus people familiar with any other programming language can skip the following explanation in this section and jump to the next section. However, for those who do not gain a clear understanding of what the code does or those for whom Solidity is a first programming language, we include a short description of the source code below:

* 이중 슬래시 \(`//`\)로 시작하는 부분은 코드가 아니라 주석입니다. 코드의 특정 부분에 주석을 달아 설명을 첨부하는 데에 사용됩니다.  컴파일러는 이러한 주석을 무시합니다.
* `L01`의 `pragma`는 최소 컴파일러 버전을 나타냅니다.  - `L03`의 `import`는 "`filename`"으로부터 모든 전역 심볼을 임포트합니다.  `filename`은 실제 파일 이름이어야 합니다.
* `L05` - `L20`은 `UserStorage`라는 스마트 컨트랙트를 정의하는 부분입니다.  `contract` 키워드는 컨트랙트의 이름 앞에 위치하여 이 코드가 스마트 컨트랙트임을 나타냅니다.  솔리디티의 컨트랙트는 객체 지향 언어의 클래스와 유사합니다.  컨트랙트는 상태 변수, 함수, 함수 변경자(modifier), 이벤트, 구조체 자료형, 열거식 자료형에 대한 선언을 포함할 수 있습니다.  또한 컨트랙트는 다른 컨트랙트로부터 상속될 수도 있습니다.  위 예제 코드에는 하나의 컨트랙트만 있지만, 한 솔리디티 파일에 여러 개의 컨트랙트가 정의될 수도 있습니다.
* `L07`의 `userData`는 맵핑 자료형의 상태 변수입니다.  상태 변수는 컨트랙트 스토리지에 영구적으로 저장됩니다.  상태 변수 `userData`는 `address`와 `uint` 값을 맵핑합니다.  `address` 자료형은 20바이트 길이의 주소입니다 \(Klaytn은 이더리움과 같이 20바이트 길이의 주소를 사용합니다\).
* `L09`에서는 `x`를 메세지 발신자의 `userData`에 저장하는 퍼블릭 함수 `set`를 정의합니다.  `msg.sender` 변수는 솔리디티에서 정의된 특별한 변수로 메세지 \(_즉_ current call\) 발신자의 주소를 나타냅니다.  `public` 키워드는 이 함수가 컨트랙트 인터페이스의 일부이며 내외부적으로\(externally or internally\) 호출될 수 있음을 나타냅니다.
* `L13`의 `get` 함수와 `L17`의 `getUserData` 함수는 `view`로 선언되었습니다. 이는 이 함수들의 상태 변수가 수정되면 안 된다는 것을 의미합니다.  이 함수들의 선언부에는 `returns (uint)`가 있습니다. 이는 함수가 반환하는 값의 자료형이 `uint`임을 의미합니다.

For more information concerning the syntax and semantics of the Solidity language, please refer to the [Solidity documentation](https://docs.soliditylang.org/).

## 컴파일, 배포, 실행하기 <a id="how-to-compile-deploy-and-execute"></a>

One way to compile Solidity code is to use the command-line compiler _solc_. This compiler can produce various outputs, ranging from simple binaries and assembly to an abstract syntax tree \(parse tree\). Assuming that the code above is saved in `UserStorage.sol` \(`L03` is excluded in the source file shown above\), some examples of compiling the file `UserStorage.sol` are as follows.

```bash
$ solc --bin UserStorage.sol
```

* 이 명령은 컴파일 결과를 바이너리 _즉_, 바이트코드로 출력합니다.

```bash
solc -o output --bin --ast --asm UserStorage.sol
```

* 컴파일러는\(`--bin`에 의해\) 바이너리, \(`--ast`에 의해\) 추상 구문트리, \(`--asm`에 의해\) 어셈블리 코드를 각각 별도의 파일로 `output` 디렉토리에 생성합니다.

```bash
solc --optimize --bin UserStorage.sol
```

* 더 나은 성능을 위해 `--optimize` 플래그를 사용하여 컴파일 과정을 최적화할 수도 있습니다.

Some resources for compiling, deploying, and executing smart contracts are listed below.

* [Using the Solidity command-line compiler](https://docs.soliditylang.org/en/latest/using-the-compiler.html)
* [Compiling contracts using Remix](https://remix-ide.readthedocs.io/en/stable/compile.html)
* [Running transactions with Remix](https://remix-ide.readthedocs.io/en/stable/run.html)
* [Remix Github Tutorials](https://remix-ide.readthedocs.io/en/latest/remix_tutorials_github.html)
* [Compiling contracts with Truffle](https://trufflesuite.com/docs/truffle/getting-started/compiling-contracts)
* [Deploying contracts with Truffle](https://trufflesuite.com/docs/truffle/getting-started/running-migrations)

참고: 이 장은 나중에 업데이트 될 예정입니다.

## 스마트 컨트랙트 디버깅 <a id="debugging-smart-contracts"></a>

It is more difficult to debug Solidity code than to debug code written in other programming languages due to the lack of mature debugging tools. Below, we list some resources for Solidity debugging.

* [Remix로 트랜잭션 디버깅하기](https://remix-ide.readthedocs.io/en/latest/debugger.html)
* [Remix 트랜잭션 디버깅 튜토리얼](https://remix-ide.readthedocs.io/en/latest/tutorial_debug.html)
* [트러플로 컨트랙트 디버깅하기](https://trufflesuite.com/docs/truffle/getting-started/debugging-your-contracts)

참고: 이 장은 나중에 업데이트 될 예정입니다.

## 스마트 컨트랙트 모범 사례 <a id="smart-contract-best-practices"></a>

To eliminate security concerns and code quality issues from your smart contract, it is important to study and follow best practices in Solidity programming. Here, we show a reference for Solidity best practices.

* [스마트 컨트랙트 보안 모범 사례](https://github.com/ConsenSys/smart-contract-best-practices)

참고: 이 장은 나중에 업데이트 될 예정입니다.

## 참고 <a id="references"></a>

* [Solidity GitHub page](https://github.com/ethereum/solidity)
* [Solidity documentation](https://solidity.readthedocs.io/en/latest/index.html)
* [Remix documentation](https://remix-ide.readthedocs.io/en/latest/)
* [Truffle documentation](https://trufflesuite.com/docs/truffle/overview)
