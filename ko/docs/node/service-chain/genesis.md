This page describes the details of `genesis.json` file.

# Genesis JSON File Structure

The `genesis.json` file structure is described in the following table.

| Field Name | 설명                                                                                                                                           |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| config     | The blokchain configuration. See the section [Config](#config).                                                                              |
| nonce      | (deprecated) This field is derived from the Ethereum, but not used in Klaytn.                                                                |
| timestamp  | The unix time when a block is created.                                                                                                       |
| extraData  | The data combined field for signer vanity and RLP-encoded istanbul extra data that contains validator list, proposer seal, and commit seals. |
| gasLimit   | The maximum gas amount that used in a block.                                                                                                 |
| difficulty | (deprecated) This field is derived from the Ethereum, but not used in Klaytn.                                                                |
| mixhash    | (deprecated) This field is derived from the Ethereum, but not used in Klaytn.                                                                |
| coinbase   | An address to which miner receives the reward. This field is only used for Clique consensus engine.                                          |
| alloc      | The predefined accounts.                                                                                                                     |
| number     | The block number field.                                                                                                                      |
| gasUsed    | The amount of the gas which used for a block.                                                                                                |
| parentHash | The hash value of the previous block.                                                                                                        |

## Config

The `config` field stores the information related to the chain.

| Field Name       | 설명                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------- |
| chainId          | It identifies the current chain and is used for prevention from the replay attack. |
| istanbul, clique | The type of consensus engine.                                                      |
| unitPrice        | Unit price.                                                                        |
| deriveShaImpl    | Defines a method to generate transaction hash and receipt hash.                    |
| governance       | Governance information of the network. See the section [Governance](#governance)   |


## extraData

The field `extraData` is a concatenation of the proposer vanity and the RLP-encoded istanbul extra data:

  - The proposer vanity is 32-byte data which contains arbitrary proposer vanity data.
  - The rest of the data is RLP-encoded istanbul extra data containing:
     - Validators: the list of validators in ascending order.
     - Seal: the proposer signature of the header. For `genesis.json`, it is a byte array initialized with 65 `0x0`.
     - CommittedSeal: the list of commitment signature seals as consensus proof. For `genesis.json`, it is an empty array.

**예시**
| Field         | 형식                        | 값                                                                                       |
| ------------- | ------------------------- | --------------------------------------------------------------------------------------- |
| Vanity        | 32-byte hex string        | 0x0000000000000000000000000000000000000000000000000000000000000000                      |
| Validators    | []주소                      | [0x48009b4e20ec72aadf306577cbe2eaf54b0ebb16,0x089fcc42fd83baeee4831319375413b8bae3aceb] |
| Seal          | byte array of 65 elements | [0x0,...,0x0]                                                                           |
| CommittedSeal | [][]byte                  | []                                                                                      |

`extraData` with the above data is created by
```
concat('0x',Vanity,RLPEncode({Validators,Seal,CommittedSeal}))
```
where `concat` is a string concatenation function, and `RLPEncode` is a function to convert a given structure to an RLP-encoded string.

With this function, the output `extraData` for this example is 0x0000000000000000000000000000000000000000000000000000000000000000f86fea9448009b4e20ec72aadf306577cbe2eaf54b0ebb1694089fcc42fd83baeee4831319375413b8bae3acebb8410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0.


# Consensus Engine

The available consensus engines for Klaytn network are Clique and Istanbul. Each engine is explained as follows.

## Clique

The `clique` field stores the configuration for Proof-Of-Authority (POA) based sealing.

| Fields | 설명                                                                       |
| ------ | ------------------------------------------------------------------------ |
| period | The minimum time interval between the consecutive blocks (unit: second). |
| epoch  | The number of blocks to reset votes and marked as a checkpoint.          |

## Istanbul

The `istanbul` field stores the configuration for Istanbul based sealing.

| Fields | 설명                                                                                   |
| ------ | ------------------------------------------------------------------------------------ |
| epoch  | The number of blocks to reset votes to be a checkpoint.                              |
| 정책     | The block proposer selection policy. [0: Round Robin, 1: Sticky, 2: Weighted Random] |
| sub    | Committee size.                                                                      |

# 거버넌스 (Governance)

The `governance` field stores governance information for a network.

| Fields         | 설명                                                                                     |
| -------------- | -------------------------------------------------------------------------------------- |
| governingNode  | One of three governance modes. [`none`, `single`, `ballot`]                            |
| governanceMode | Designated governing node's address. It only works if the governance mode is `single`. |
| 보상             | It stores the reward configuration. See the section [Reward](#reward).                 |

## 보상

The `reward` field stores the information about the network's token economy.

| Fields                 | 설명                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| mintingAmount          | Amount of peb minted when a block is generated. Double quotation marks are needed for a value. |
| ratio                  | Distribution rate for a `CN/KIR/PoC` separated by `/`. The sum of all values has to be 100.    |
| useGiniCoeff           | Use GINI coefficient or not.                                                                   |
| deferredTxFee          | A way to distribute TX fee for a block.                                                        |
| stakingUpdateInterval  | Time interval in block height to update staking information.                                   |
| proposerUpdateInterval | Time interval in block height to update proposer information.                                  |
| minimumStake           | Minimum amount of peb to join Core Cell Operators.                                             |

# 예시

```
{
    "config": {
        "chainId": 2019,
        "istanbul": {
            "epoch": 604800,
            "policy": 2,
            "sub": 13
        },
        "unitPrice": 25000000000,
        "deriveShaImpl": 2,
        "governance": {
            "governingNode": "0x46b0bd6380005952759f605d02a6365552c776f3",
            "governanceMode": "single",
            "reward": {
                "mintingAmount": 9600000000000000000,
                "ratio": "34/54/12",
                "useGiniCoeff": true,
                "deferredTxFee": true,
                "stakingUpdateInterval": 86400,
                "proposerUpdateInterval": 3600,
                "minimumStake": 5000000
            }
        }
    },
    "nonce": "0x0",
    "timestamp": "0x5c9af60e",
    "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000f89af85494aeae0ab623d4118ac62a2decc386949b5ce67ce29446b0bd6380005952759f605d02a6365552c776f394699b607851c878e29499672f42a769b71f74be8e94e67598eb5831164574c876994d53f63eab4f36d7b8410000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c0",
    "gasLimit": "0xe8d4a50fff",
    "difficulty": "0x1",
    "mixHash": "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
    "coinbase": "0x0000000000000000000000000000000000000000",
    "alloc": {
        "0000000000000000000000000000000000000400": {
            "code": "0x6080604052600436106101505763ffffffff60e00a165627a7a7230582093756fe617053766b158f7c64998c746eb38f0d5431cc50231cc9fb2cd1fd9950029",
            "balance": "0x0"
        },
        "46b0bd6380005952759f605d02a6365552c776f3": {
            "balance": "0x446c3b15f9926687d2c40534fdb564000000000000"
        },
        "699b607851c878e29499672f42a769b71f74be8e": {
            "balance": "0x446c3b15f9926687d2c40534fdb564000000000000"
        },
        "aeae0ab623d4118ac62a2decc386949b5ce67ce2": {
            "balance": "0x446c3b15f9926687d2c40534fdb564000000000000"
        },
        "e67598eb5831164574c876994d53f63eab4f36d7": {
            "balance": "0x446c3b15f9926687d2c40534fdb564000000000000"
        }
    },
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```
