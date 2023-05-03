# Nạp tiền vào tài khoản của bạn <a id="top-up-your-account"></a>

## Đính kèm vào Bảng điều khiển <a id="attaching-to-the-console"></a>

Nút điểm cuối Klaytn đi kèm bảng điều khiển JavaScript. Từ dòng lệnh bảng điều khiển, bạn có thể khởi tạo một phần của các cuộc gọi API Klaytn tới EN của mình. Để đính kèm vào bảng điều khiển JavaScript, hãy thực thi lệnh sau.

```bash
$ ken attach ~/kend_home/klay.ipc
Welcome to the Klaytn JavaScript console

!instance: Klaytn/vX.X.X/XXXX-XXXX/goX.X.X
 datadir: ~/kend_home
 modules: admin:1.0 debug:1.0 governance:1.0 istanbul:1.0 klay:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0

 >
```

**LƯU Ý**: Bạn phải đợi tới khi tất cả các khối đã được tải về. Enter `klay.blockNumber` in a console and check whether it matches the current block number [here](https://baobab.scope.klaytn.com/)

**NOTE**: Type `klay` or `personal` to get the list of available functions.

## Creating a New Klaytn Account <a id="creating-a-new-klaytn-account"></a>

To create a new Klaytn account from the JavaScript console, execute the following command. Your private key will be encrypted with the passphrase you enter.

```javascript
> personal.newAccount()
Passphrase:  # enter your passphrase
Repeat passphrase:
"0x75a59b94889a05c03c66c3c84e9d2f8308ca4abd" # created account address
```

Keystore file will be created under `keystore` folder in the EN data directory, `DATA_DIR` set in the `kend.conf`. If you follows the quick start default guideline, it must be `~/kend_home/keystore/`.

```javascript
$ ls ~/kend_home/keystore/
UTC--2019-06-24T11-20-15.590879000Z--75a59b94889a05c03c66c3c84e9d2f8308ca4abd
```

## Unlocking the Klaytn Account <a id="unlocking-the-klaytn-account"></a>

To unlock the created account, execute the following command. It unlocks the account for 300 seconds. **Note**: If you want to manually set the unlock duration, refer to this [link](../../dapp/json-rpc/api-references/personal.md#personal_unlockaccount). **`WARNING`**: Unlocking an account could be very dangerous if not done carefully. There are chances that your tokens will be taken away by hackers if your EN is hacked by a hacker. To use safer method, refer to this [deployment guide using private key](../../dapp/tutorials/count-dapp/6.-deploy-contract.md#deploy-method-1-by-private-key)

```javascript
> personal.unlockAccount('75a59b94889a05c03c66c3c84e9d2f8308ca4abd') # account address to unlock
Unlock account 75a59b94889a05c03c66c3c84e9d2f8308ca4abd
Passphrase: # enter your passphrase
true
```

## Getting testnet KLAY from the Baobab Faucet <a id="getting-testnet-klay-from-the-baobab-faucet"></a>

* Using the Baobab faucet in KlaytnWallet.
* Access [https://baobab.wallet.klaytn.foundation](https://baobab.wallet.klaytn.foundation/).
* You can either create a new account from the Wallet or use the keystore file you created from the EN JavaScript console above to log into the Wallet.
* Go to "KLAY Faucet" from the left pane menu, and click the "Run Faucet" button to get 150 KLAY.

  You can run the KLAY Faucet once every 24 hours.

* If you created a new account to get KLAY, then send the KLAY to your created account on the EN.

## Checking the Balance in Your Account <a id="checking-the-balance-in-your-account"></a>

To see the balance of your account, execute the following command.

The default unit is peb \(1 KLAY = 10^18 peb\). More information about KLAY units can be found at [Units of KLAY](../../klaytn/design/klaytn-native-coin-klay.md#units-of-klay).

```javascript
> klay.getBalance('75a59b94889a05c03c66c3c84e9d2f8308ca4abd') # enter your account address
1e+21  # 1000 KLAY
```

## Exiting the Console <a id="exiting-the-console"></a>

To leave the javascript console, execute the following command.

```javascript
> exit
$
```


