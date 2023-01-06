---
title: How to use oracles on Klaytn — VRF’s Explained
description: This is the test2 description
authors:
  name: Klaytn Security
  title: Eco Team
  url: https://klaytn.foundation/contact-us/
  image_url: https://s2.coinmarketcap.com/static/img/coins/64x64/4256.png
  email: media@klaytn.foundation
tags: [klaytn, oracle]
---

![text for image](https://miro.medium.com/max/1400/0*cbm7dgSu27jTnQPk.webp)

With the advent of Verifiable Random Functions (VRFs) provided by decentralized oracles, getting random numbers has never been more easy and secure. VRFs are essential to many blockchain applications, as having access to tamper-proof randomization enables exciting blockchain games, rare NFTs, and efficient unbiased outcomes.

<!--truncate-->

In this article, you will create a subscription, add a consumer contract programmatically and get random values using Chainlink VRF v2 on the Klaytn Blockchain.

Why VRFs
Before VRFs, getting random numbers on-chain was a major problem and has played a part in major protocol exploits. The following are the malicious or risky traditional random number generators (RNG) methods previously used and their shortcomings:

Using block variables

Using block variables such as block.number, block.timestamp, or block.difficulty to simulate randomness is risky as it can be predicted to some degree.
