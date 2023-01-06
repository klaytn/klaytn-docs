---
title: Klaytn SDK caver-js/java v1.10.0 Release
description: This is the test1 description
authors:
  name: Klaytn Knight
  title: Media Team
  url: https://klaytn.foundation/contact-us/
  image_url: https://s2.coinmarketcap.com/static/img/coins/64x64/4256.png
  email: media@klaytn.foundation
tags: [klaytn, sdk, release]
---

![text for image](https://miro.medium.com/max/1400/0*Zol0ss3r_1Fwt0G1.webp)

# [Notice] Klaytn SDK caver-js v1.10.0 Release

With the release of Klaytn v1.10.0, some changes have been applied to caver-js. Klaytn v1.10.0 includes Kore hardfork, with the addition of an API to request data regarding double block reward (kip82Ratio). For RPC service, some frequently used APIs from the governance name are now supported in klay namespace as well.

<!--truncate-->

## What’s New in v.1.10.0 (#719, #721)

- Added klay.getRewards API to retrieve reward related information by block with the new GC reward structure following the abolishment of the Gini coefficient KIP-82

- Added governance.getChainConfigAt API to retrieve chain information for a certain block

- getStakingInfo, getNodeAddress, getChainConfig, getChainConfigAt APIs, previously only available from governance namespace, is supported for klay namespace

- Added klay.getGovParams, klay.getGovParamsAt APIs, which are functionally identical to governance.getItemsAt