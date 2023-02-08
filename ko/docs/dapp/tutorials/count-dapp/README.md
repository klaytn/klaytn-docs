# Count DApp

## 목차 <a href="#table-of-contents" id="table-of-contents"></a>

* [1. Environment Setup](1.-environment-setup.md)
* [2. Clone Count DApp](2.-clone-count-dapp.md)
* [3. 디렉토리 구조](3.-directory-structure.md)
* [4. Write Smart Contract](4.-write-smart-contract.md)
* [5. Frontend Code Overview](5.-frontend-code-overview/)
  * [5-1. BlockNumber 컴포넌트](5.-frontend-code-overview/5-1.-blocknumber-component.md)
  * [5-2. Auth Component](5.-frontend-code-overview/5-2.-auth-component.md)
  * [5-3. Count Component](5.-frontend-code-overview/5-3.-count-component.md)
* [6. Deploy Contract](6.-deploy-contract.md)
* [7. Run App](7.-run-app.md)

## Testing Environment <a href="#testing-environment" id="testing-environment"></a>

Count DApp is tested in the following environment.

* MacOS Mojave 10.14.5
* Node 10.16.0 (LTS)
* npm 6.9.0
* Python 2.7.10

## Introduction <a href="#introduction" id="introduction"></a>

![intro](../../../bapp/tutorials/count-bapp/images/tutorial-1intro.gif)

This tutorial is intended to give a step by step guide to build a Klaytn dApp. No previous Klaytn experience is needed. We will make a simple web app interacting with a basic smart contract, `Count`.\
Any user who has a Klaytn account can increase and decrease the current value as shown in the above gif.

> **Source Code**\
  Complete source code can be found on GitHub at [https://github.com/klaytn/countbapp](https://github.com/klaytn/countbapp)

## Intended Audience <a href="#intended-audience" id="intended-audience"></a>

Anyone who wants to learn how to build a Blockchain Application on Klaytn. 다만 스마트 컨트랙트와 상호작용하는 웹 애플리케이션을 구축할 것이기 때문에 다음의 개념들에 대해서 익숙하신 분들께 권장드립니다.

* 본 튜토리얼은 [React](https://reactjs.org/)와 [Redux](https://redux.js.org/)에 대한 기본 지식이 있다고 가정하고 진행합니다. 이 과정은 초보자를 위한 기본적인 설명이 없습니다.
* Basic knowledge and experience in Solidity development are recommended. 만약 솔리디티에 대해 잘 모르시더라도 소프트웨어 개발 경험이 어느 정도 있으시다면 튜토리얼의 단계별 가이드라인을 따라 수월하게 완료하실 수 있을 것입니다.
