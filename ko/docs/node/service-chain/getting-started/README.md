---
description: >-
  이 튜토리얼을 따라 빠르게 서비스체인을 구성해 볼 수 있습니다. 서비스체인은 Klaytn 메인체인에 연결된 독립된 블록체인입니다.
---

This tutorial provides a step-by-step guide for setting up a service chain and connecting it with Klaytn Baobab network. You will also learn how to enable periodic anchoring and cross-chain value transfer.
- [4-노드 서비스체인 설정](./4nodes-setup-guide.md)
- [Baobab 연결](./en-scn-connection.md)
- [체인 간 밸류 트랜스퍼](value-transfer.md)

{% hint style="info" %}
The simplest form of service chain can be one SCN. This tutorial illustrates 4-node service chain, however, you can set up a single-node service chain as well. Simply pass `--cn-num 1` instead of `4` to homi in 'Step 1:Create genesis.json and nodekeys'.

The minimum number of SCNs to achieve high availability under BFT algorithm is 4. Having 2 SCN nodes is not enough, because if one SCN fails, the other one can not reach a consensus.
{% endhint %}
