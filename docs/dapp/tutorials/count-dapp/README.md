# Count BApp <a id="count-bapp"></a>

## Table of Contents <a id="table-of-contents"></a>

* [1. Environment Setup](1.-environment-setup.md)
* [2. Clone Count BApp](2.-clone-count-bapp.md)
* [3. Directory Structure](3.-directory-structure.md)
* [4. Write Smart Contract](4.-write-smart-contract.md)
* [5. Frontend Code Overview](5.-frontend-code-overview/README.md)
  * [5-1. BlockNumber Component](5.-frontend-code-overview/5-1.-blocknumber-component.md)
  * [5-2. Auth Component](5.-frontend-code-overview/5-2.-auth-component.md)
  * [5-3. Count Component](5.-frontend-code-overview/5-3.-count-component.md)
* [6. Deploy Contract](6.-deploy-contract.md)
* [7. Run App](7.-run-app.md)

## Testing Environment <a id="testing-environment"></a>

Count BApp is tested in the following environment.

* MacOS Mojave 10.14.5
* Node 10.16.0 \(LTS\)
* npm 6.9.0
* Python 2.7.10

## Introduction <a id="introduction"></a>

![intro](images/tutorial-1intro.gif)

This tutorial is intended to give a step by step guide to build a Klaytn dApp. No previous Klaytn experience is needed. We will make a simple web app interacting with a basic smart contract, `Count`.  
Any user who has a Klaytn account can increase and decrease the current value as shown in the above gif.

> **Source Code**  
> Complete source code can be found on GitHub at [https://github.com/klaytn/countbapp](https://github.com/klaytn/countbapp)

## Intended Audience <a id="intended-audience"></a>

Anyone who wants to learn how to build a Blockchain Application on Klaytn. We will build a web application that interacts with smart contracts. To complete this tutorial, the audience is expected to be familiar with the following concepts.

* We assume that you have basic knowledge on [React](https://reactjs.org/) and [Redux](https://redux.js.org/). This course is not for absolute beginners.
* Basic knowledge and experience in Solidity development are recommended. However, any experienced SW developer should be able to complete the task by following the step-by-step guideline of this tutorial.

