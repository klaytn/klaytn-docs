---
title: Klaytn에서 오라클 사용하기 — VRF를 통한 난수 생성
description: This is the test2 description
authors:
  name: Klaytn Security
  title: Eco Team
  url: https://klaytn.foundation/contact-us/
  image_url: https://s2.coinmarketcap.com/static/img/coins/64x64/4256.png
  email: media@klaytn.foundation
tags: [클레이튼, 오라클]
---

![text for image](https://miro.medium.com/max/1400/0*cbm7dgSu27jTnQPk.webp)

탈중앙 오라클이 제공하는 VRF(Verifiable Random Functions)을 사용하면 쉽고 안전하게 난수를 생성할 수 있습니다. VRF는 변조 방지 난수 생성을 통해 다양한 블록체인 게임 및 희귀한 NFT를 구현할 수 있게 해줌으로써 많은 블록체인 애플리케이션에 필수적인 기능이 되었습니다.

<!--truncate-->

이 튜토리얼에서는 Klaytn 블록체인에서 Chainlink VRF v2를 사용하여 구독(subscription)을 생성하고 프로그래밍 방식으로 consumer 컨트랙트를 추가하고 난수를 생성해 보겠습니다.

VRF가 필요한 이유
이전에는 온체인에서 난수를 얻는 것이 까다로운 일이었으며, 프로토콜 갈취가 종종 발생하는 부분이기도 했습니다. 기존의 난수 생성(RNG) 방법들과 그 단점들을 간략히 알아보겠습니다.

블록 변수 사용

block.number, block.timestamp 또는 block.difficulty와 같은 블록 변수를 사용하여 임의성을 생성하는 것은 어느 정도 예측 가능성이 있으므로 위험합니다.
