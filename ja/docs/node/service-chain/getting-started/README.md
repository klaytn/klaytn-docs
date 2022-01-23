---
description: >-
  Following this chapter, you will quickly set up and run a Service Chain, an independent blockchain connected to the Klaytn main chain.
---

This tutorial provides a step-by-step guide for setting up a service chain and connecting it with Klaytn Baobab network. You will also learn how to enable periodic anchoring and cross-chain value transfer.
- [Setting up a 4-node Service Chain](./4nodes-setup-guide.md)
- [Connecting to Baobab](./en-scn-connection.md)
- [Cross-chain Value Transfer](value-transfer.md)

{% hint style="info" %}
The simplest form of service chain can be one SCN. This tutorial illustrates 4-node service chain, however, you can set up a single-node service chain as well. Simply pass `--cn-num 1` instead of `4` to homi in 'Step 1:Create genesis.json and nodekeys'.

The minimum number of SCNs to achieve high availability under BFT algorithm is 4. Having 2 SCN nodes is not enough, because if one SCN fails, the other one can not reach a consensus.
{% endhint %}
