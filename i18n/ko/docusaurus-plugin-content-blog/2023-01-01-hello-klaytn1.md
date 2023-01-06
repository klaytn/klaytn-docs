---
title: Klaytn SDK caver-js/java v1.10.0 출시
description: This is the test1 description
authors:
  name: Klaytn Knight
  title: Media Team
  url: https://klaytn.foundation/contact-us/
  image_url: https://s2.coinmarketcap.com/static/img/coins/64x64/4256.png
  email: media@klaytn.foundation
tags: [클레이튼, sdk, 출시]
---

![text for image](https://miro.medium.com/max/1400/0*Zol0ss3r_1Fwt0G1.webp)

# [공지] Klaytn SDK caver-js v1.10.0 출시

Klaytn v1.10.0 이 릴리즈 됨에 따라 노드에서 변경된 내용을 caver-js에서도 지원하기 위해 변경사항들이 반영되었습니다. 이번 Klaytn v1.10.0 릴리즈에는 Kore Hardfork가 포함되어 있는데요, 이중 블록 보상과 관련된 정보(kip82Ratio)를 확인할 수 있는 API가 추가되었습니다. 또한 RPC 서비스의 governance namespace에서 활용도가 높은 API가 klay namespace 에서도 지원되도록 추가되었습니다.

<!--truncate-->

## v1.10.0의 신규 기능 (#719, #721)

- [KIP-82](https://kips.klaytn.foundation/KIPs/kip-82) Gini계수 사용 종료로 새로운 GC보상 구조가 도입됨에 따라서 각 블록별로 보상 관련된 정보를 조회할 수 있는 klay.getRewards API가 추가되었습니다.

- 특정 블럭에서의 체인정보를 확인하는 governance.getChainConfigAt API가 추가되었습니다.

- governance namespace에만 있던 getStakingInfo, getNodeAddress, getChainConfig, getChainConfigAt API가 klay namespace에서도 사용될 수 있도록 추가되었습니다.

- klay.getGovParams, klay.getGovParamsAt API가 추가되었으며 기존 governance.getItemsAt과 기능적으로 동일합니다.
