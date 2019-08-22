# Klaytnscope

Klaytnscope is the block explorer for the Klaytn Network. Klaytnscope gives you an insight about the Klaytn network by monitoring the network health and providing various statistics of Klaytn network. You can also explore the block and transaction data and the list of smart contracts on the Klaytn network.

* For the Baobab network, visit [https://baobab.scope.klaytn.com](https://baobab.scope.klaytn.com)
* For the Mainnet, visit [https://scope.klaytn.com](https://scope.klaytn.com)

![](img/scope_01_main.png)

## Major Features

Please note that some of the features are under development.

* Overview of the network
* Block search
* Transaction search
* Account search 
* Event logs search
* Block proposer information

In the subsequent sections, we will visit the major functions and screenshots of Klaytnscope. Functions are grouped by four categories - dashboard, list view, detail view, and search.

## Dashboard

Network information is presented in the dashboard. The information includes average block generation time, average number of transactions in a block, number of consensus nodes, and the latest trends in transactions.

![](img/scope_02_main_indicator.png)

* Block Height: The latest block height. It shows that how many blocks have been generated since the genesis. 
* Network Performance: It shows Klaytn's network performance with four indicators.
  * Consensus Nodes: Above picture shows that 15 nodes are participated in the consensus process. 
  * Avg Block Time \(1 hour\): It shows the average block generation time over the last hour.
  * Avg Block Time \(24 hours\): It shows the average block generation time over the last 24 hours.
  * Avg TX Per Block \(24 hours\): The average number of transactions included in one block over the last 24 hours.
* Transaction History \(14 days\): The graphs show the number of daily transactions over the last 14 days. You can see the trend in the transaction volume over the last two weeks.

### Recent Blocks & Transactions

These lists show recently created blocks and transactions respectively. You can get the latest information by clicking the refresh button on the upper-right corner in the pane. In the bottom of the list, clicking the ‘view all’ button will take you to the [list view](klaytnscope.md#list-view).

![](img/scope_03_main_list.png)

### Network Status & Network Selector

![](img/network_status.gif)

On the upper-right corner of the site, there are network status indicator and the network selector drop down.

* Network Status Indicator
  * Network is healthy: Klaytnscope is healthy and fully operational. The network status is normal.
  * Data latency: Klaytnscope is undergoing system maintenance. Data is in a delayed state.
  * Data accuracy: Klaytnscope is synchronizing data, please wait.
* Network Selector Drop Down
  * You can choose Klaytn mainnet and Baobab testnet from the menu.

## List View

If you want to get a closer look at the status of the Klaytn network, you can check the list of recently generated blocks and transactions. To access the list page, click the button on the navigation bar which located on the left of the screen.

### Blocks

![](img/scope_04_block_list.png)

A list of recently generated blocks. To update the information, please click the refresh.

* Block: The unique number of the block. Starting from zero \(the genesis block\), it is given sequentially each time a block is generated.
* Time: Duration of time since the block was generated. You can check the exact date and time by hovering this.
* Total TXs: The total number of transactions included in the block.
* Block Proposer: Randomly but deterministically selected Consensus Node that proposed the block. By clicking the address, you can easily go to the details page.
* Reward: Aggregation of newly minted KLAY \(9.6 KLAY\) and transaction fees used in the block. The list displays only the sum of Klaytn Governance Council Reward, Proof of Contribution, and Klaytn Improvement Reserve. Hover the block reward section on the block detail page to see detailed information. More details about the block reward distribution system can be found in the [Klaytn Token Economy].
* Size: The size of blocks measured in Byte. The more transactions are included, the larger the block size.

### Transactions

![](img/scope_05_tx_list.png)

A list of recently executed transactions. To update the information, please click the refresh.

* TX Hash: The unique identifier of the transaction. For more information, click the hash to go to the detail page. If the transaction fails, a red exclamation mark appears next to it.
* Block \#: Number of the block which contains this transaction. Clicking on the number takes you to the details page of the block.
* Time: Duration of time since the transaction was executed. You can check the exact date and time by hovering this.
* From -&gt; To: The addresses of sender and receiver. By clicking the address, you can easily go to the details page. If the file icon displays next to an address, it means that the address is a contract.
* TX Type: Type of the transaction. You can apply a filter to get the transactions of a specific type. For more information, please visit [Transactions].
* Amount: The amount of value transferred through the transaction.
* TX Fee: The actual cost used to process transaction.

## Detail View

Detailed information about single Block, Transaction, Account, and Contract can be found on this page. To go to the details view, you can search for the entity from the search bar or click the item from the list view.

### Block

![](img/scope_08_block_detail.png)

#### Overview

Overall information about the block.

* Time: Elapsed time since the block generation. Exact datetime is also displayed next to it.
* Hash: The unique identifier of the block. By pressing the copy button, you can easily copy the hash.
* Parent Hash: The unique identifier of the previous block. Clicking on the hash takes you to the detail view of the parent hash.
* Total TXs: The total number of transactions included in the block.
* Block Reward: Aggregation of the newly minted KLAY \(9.6 KLAY\) and the transaction fees collected in the block. If you hover, you will find detailed information on Klaytn Governance Council Reward, Proof of Contribution and Klaytn Improvement Reserve. More details about block reward distribution system can be found in the [Klaytn Token Economy].
* Block Size: The size of block measured in Byte. The more transactions are included, the larger the block size.

#### Committee

List of consensus nodes that proposed and validated the block.

* Block Proposer: Randomly but deterministically selected consensus node that proposed the block. By clicking the address, you can easily go to the detail view of the node.
* Validators: Consensus nodes that validated the block. By clicking the address, you can easily go to the detail view of the node.

#### Transactions

List of transactions included in the block.

### Transaction

![](img/scope_09_tx_detail.png)

#### Overview

Overall information about the transaction.

* Status indicator: On the upper-right corner. The indicator whether the transaction succeeded or not.
* TX Type: Type of the transaction. For more information, please see [Transactions].
* Block \#: Number of the block which contains this transaction. Clicking on the number takes you to the detail view of the block.
* From -&gt; To: The addresses of sender and receiver. By clicking the address, you can go to the detail view of the account. If a file icon displays next to the address, it means that address is contract.
* Fee Payer: Displayed when TX type is either Fee Delegated or Fee Delegated with Ratio. When you click the address of fee payer you can go to the detailed view of the account.
* Time: Elapsed time since the transaction was executed.
* Nonce: Number of the transaction sent from the sender's address. Starting from zero, it increases sequentially each time a transaction is sent.
* Amount: The amount of value transferred in this transaction.
* Gas Price: Cost per gas measured in KLAY. In Klaytn network, Gas Price is fixed.
* Gas Used: Exact gas that was used to execute the transaction.
* Gas Limit: Maximum gas that the sender was willing to pay for this transaction.
* TX Fee: The actual cost used to process transaction. Calculated by multiplying Gas Price by Gas Used.
* TX Fee by Sender: Displayed when TX type is Fee Delegated with Ratio. The portion of TX fee paid by the sender.
* TX Fee by Fee Payer: Displayed when TX type is Fee Delegated with Ratio. The portion of TX fee paid by the fee payer.

#### Input Data

Extra data provided by the sender or contract.

### Account

![](img/scope_10_account_detail.png)

#### Overview

Overall information about the account.

* Address \(Hex\): The unique address of the account.
* Balance: The total amount of KLAY that this account has.
* Total TXs: The total number of transactions that this account sent or received.
* HRA: It informs whether this account type is HRA or not. \(TBD\)

#### Transactions

The list of transactions related to this account. The color of the arrow indicates if the account is a sender or receiver.

### Contract

![](img/scope_11_contract_detail.png)

#### Overview

Overall information about the contract.

* Account \(Hex\): The unique address of the contract.
* Balance: The total amount of KLAY that this contract has.
* Contract Creator: The account that deployed this contract. By clicking the address, you can go to the detail view of the accont.
* Total TXs: The total number of transactions that this contract received.
* Contract Created TX: The transaction that deployed this contract. Clicking on the hash takes you to the detail view of the transaction.
* HRA: It informs whether the contract account type is HRA or not. \(TBD\)

#### Transactions

The list of transactions related to this contract.

## Search

Through Klaytnscope, you can search for the information about account, contract, transactions and blocks. The search bar is placed on every page, making it easy to access. Entering a valid keyword will take you to the detail view of the entity.

![](img/scope_06_search.png)

### Search Keyword

In the mainnet version, searchable keywords are as follows:

* Block \#
* TX Hash
* Address \(Account, Contract\)
* Human Readable Address \(.klaytn\) \(TBD\)

### Keyword Format

The unique characteristics that distinguish each keyword are as follows:

#### Block

* Decimal numbers only \[0~9\]

#### TX Hash

* 66 characters long
* Starts with a prefix `0x`
* Hexadecimal number only \[0~9, a~f\]

#### Address

* 42 characters long
* Start with a prefix `0x`
* Hexadecimal number only \[0~9, a~f\]

#### Human Readable Address \(TBD\)

* 12~20 characters long
* Ends in `.klaytn`

### Search Errors

![](img/scope_07_noresult.png)

If you search for a keyword that doesn't fit in the specified format or information hasn't yet been generated, no result page will appear.

#### Wrong Format \(TX Hash / Address\)

* Wrong number of characters
* Doesn't start with a prefix `0x`
* Contains special characters or non-hexadecimal characters \[g~z\]

#### Doesn't Exist

* Blocks not yet generated \(if the block number entered was higher than recently generated block number\)
* Non-existent TX Hash


[Transactions]: ../klaytn/klaytn-design/transactions/README.md
[Klaytn Token Economy]: ../klaytn/klaytn-design/token_economy.md
