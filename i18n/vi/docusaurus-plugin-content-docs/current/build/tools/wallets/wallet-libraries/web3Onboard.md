---
sidebar_label: Web3-Onboard
---

# Tích hợp Web3-Onboard vào dApp

![](/img/build/tools/klaytnXweb3Onboard.png)

## Giới thiệu

Tận dụng một công cụ như [Web3-Onboard](https://onboard.blocknative.com/docs/overview/introduction), các dự án và nhà phát triển có thể nhanh chóng tích hợp nhiều ví vào các ứng dụng phi tập trung của họ (dAPP). Với sự trợ giúp của Web3-Onboard, việc giới thiệu người dùng đã được đơn giản hóa. Web3-Onboard có các tính năng khác nhau, từ hỗ trợ một số ví đến khả năng người dùng kết nối tài khoản của họ với các chuỗi hoặc mạng khác nhau và nhận thông báo giao dịch theo thời gian thực, v.v.

Trong hướng dẫn này, bạn sẽ sử dụng thư viện Web3-Onboard để tích hợp nhiều ví (như ví Coinbase, Metamask, WalletConnect, v.v.) vào dApp của bạn được xây dựng trên Mạng lưới Klaytn.

## Điều kiện tiên quyết

- Một dự án react đang hoạt động (bằng cách thực hiện `npx create-react-app project-name`)
- Cài đặt các ví cần thiết ([Ví Coinbase Wallet](https://www.coinbase.com/wallet/downloads), [Metamask](https://metamask.io/download/)).
- Điểm cuối RPC: bạn có thể nhận từ một trong những [Nhà cung cấp điểm cuối](../../../../references/service-providers/public-en.md) được hỗ trợ.à cung cấp endpoint được hỗ trợ.
- KLAY thử nghiệm từ [Vòi](https://baobab.wallet.klaytn.foundation/faucet): nạp tiền vào tài khoản với một lượng KLAY vừa đủ.

## Bắt đầu

Web3-Onboard như một thư viện ví không phân biệt chuỗi, hỗ trợ tất cả các mạng tương thích EVM và cũng cung cấp tính linh hoạt của việc thêm các mạng mới vào thư viện. Trong hướng dẫn này, chúng tôi sẽ sử dụng Web3-Onboard để thêm Mạng chính thức Cypress Klaytn và Mạng thử nghiệm Baobab Klaytn vào dApp của chúng tôi. Như đã nói, hãy để bắt đầu tích hợp khả năng tương thích đa ví bằng Web3-Onboard vào dApp của bạn được xây dựng trên Mạng lưới Klaytn.

## Thiết lập các mô-đun Onboard và Ví

**Bước 1**: Cài đặt @web3-onboard/core

```bash
npm i @web3-onboard/core 
```

**Bước 2**: Nhập và khởi tạo các Mô-đun Ví

Trong bước này, bạn có thể thêm càng nhiều ví để được hỗ trợ trong dApp của bạn bằng các mô-đun ví. Nhưng đối với hướng dẫn này, bạn sẽ thêm Ví Coinbase, WalletConnect, Ví Injected được tiêm ví vào quá trình triển khai web3-Onboard của bạn. Tham khảo [tài liệu](https://onboard.blocknative.com/docs/overview/introduction#wallet-modules) này về danh sách các mô-đun ví bạn có thể thêm vào dApp của bạn bằng Web3-Onboard.

```bash
npm install @web3-onboard/coinbase // Coinbase Wallet
npm install @web3-onboard/walletconnect // WalletConnect
npm install @web3-onboard/injected-wallets  // Used to connect to Metamask
```

Trong tệp `App.js` của bạn, hãy khởi tạo các mô-đun ví để tích hợp với dApp của bạn. Lưu ý rằng mỗi mô-đun có các tham số tùy chọn riêng để truyền vào, chẳng hạn như URL RPC JSON dự phòng hoặc ID chuỗi mặc định.

```js
import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";

const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();
const injected = injectedModule();

const modules = [coinbaseWalletSdk, walletConnect, injected];
```

**Bước 3**: Cài đặt và nhập ether

Nhà cung cấp Web3-Onboard có thể được sử dụng với các thư viện như [ethers.js](https://docs.ethers.org/v6/) và [web3.js](https://web3js.readthedocs.io/en/v1.2.8/getting-started.html). Trong hướng dẫn này, chúng tôi sẽ sử dụng ethers.js để thực hiện các cuộc gọi chuỗi khối Klaytn như nhận tài khoản của người dùng, lấy số dư, ký giao dịch, gửi giao dịch, đọc và ghi vào hợp đồng thông minh.

```bash
npm install --save ethers
```

Trong tệp `App.js` của bạn, hãy nhập gói ether như sau:

```js
import { ethers } from "ethers";
```

**Bước 4**: Nhập và Thiết lập Web3ReactProvider

Trong bước này, bạn sẽ khởi tạo Onboard với các mô-đun được tạo và danh sách các chuỗi tương thích với thư viện. Mở tệp `App.js` của bạn và dán mã bên dưới:

```js
import Onboard from "@web3-onboard/core";
const ETH_MAINNET_RPC_URL = `Paste ETH RPC URL`;
const KLAYTN_MAINNET_URL = `Paste KLAYTN MAINNET URL`
const KLAYTN_BAOBAB_URL = `Paste KLAYTN BAOBAB URL`

const onboard = Onboard({
  wallets: modules, // created in previous step
  chains: [
    {
      id: "0x1", // chain ID must be in hexadecimal
      token: "ETH",
      namespace: "evm",
      label: "Ethereum Mainnet",
      rpcUrl: ETH_MAINNET_RPC_URL
    },
    {
      id: "0x2019", // chain ID must be in hexadecimal
      token: "KLAY",
      namespace: "evm",
      label: "Klaytn Mainnet",
      rpcUrl: KLAYTN_MAINNET_URL
    },
    {
      id: "0x3e9", // chain ID must be in hexadecimel
      token: "KLAY",
      namespace: "evm",
      label: "Klaytn Testnet",
      rpcUrl: KLAYTN_BAOBAB_URL
    },
   // you can add as much supported chains as possible
  ],
  appMetadata: {
    name: "Klaytn-web3-onboard-App", // change to your dApp name
    icon: "https://pbs.twimg.com/profile_images/1620693002149851137/GbBC5ZjI_400x400.jpg", // paste your icon 
    logo: "https://pbs.twimg.com/profile_images/1620693002149851137/GbBC5ZjI_400x400.jpg", // paste your logo
    description: "Web3Onboard-Klaytn",
    recommendedInjectedWallets: [
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      { name: "MetaMask", url: "https://metamask.io" }
    ]
  }
});
```

## Thiết lập chức năng sử dụng

Trong hướng dẫn này, chúng tôi sẽ sử dụng các hàm sử dụng như `truncateaddress()` và `tohex()`. Hàm truncateaddress () có một địa chỉ hợp lệ và trả về một định dạng dễ đọc hơn của địa chỉ được truyền vào. Trong khi hàm toHex() chuyển đổi số thành thập lục phân.  Các bước sau đây cho thấy cách thiết lập và sử dụng chức năng sử dụng trong dự án của bạn.

**Bước 1**: Tạo một tiệp `utils.js` trong thư mục gốc `src`.

Dán mã sau trong tệp Utils.js mới được tạo.

```js
export const truncateAddress = (address) => {
    if (!address) return "No Account";
    const match = address.match(
      /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };

  export const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
  };
```

**Bước 2**: Nhập các chức năng trong tệp `app.js` của bạn.

```js
import { truncateAddress, toHex } from "./utils";
```

## Kết nối ví

Bên trong chức năng Ứng dụng của bạn trong tệp `App.js` của bạn, hãy gọi phương pháp `connectWallet()` trên phiên bản onboard để bắt đầu hộp thoại bật lên onboard.

```js
function App() {
    const connectWallet = async () => {
    try {
      const wallets = await onboard.connectWallet();
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="App">
      <button onClick={connectWallet}>Connect Wallet</button>  
    </div>
  );
}
```

Khi bạn nhấp vào nút Kết nối Ví của mình, bạn sẽ thấy một hộp thoại cho phép bạn kết nối liền mạch với Ví Coinbase và các ví khởi tạo khác từ dApp của bạn.

![](/img/build/tools/web3-Onboard.png)

## Ngắt kết nối ví

Ngắt kết nối một ví được kết nối có thể đạt được bằng cách gọi phương pháp `disconnectWallet()` trên phiên bản onboard cùng với nhãn của ví chính của người dùng. Ngoài ra, một thực tế tốt là làm mới trạng thái để xóa bất kỳ dữ liệu kết nối được lưu trữ trước đó.

```js
function App() {
    const connectWallet = async () => {
    try {
      const wallets = await onboard.connectWallet();
    } catch (error) {
      console.error(error);
    }
  };
    
  const disconnect = async () => {
    const [primaryWallet] = await onboard.state.get().wallets;
    if (primaryWallet) await onboard.disconnectWallet({ label: primaryWallet.label });
    refreshState();
  };

  // refresh state
  const refreshState = () => {
    setAccount("");
    setChainId("");
    setProvider();
    // make sure to add every other state declared here.
  };
  
  return (
    <div className="App">
           <button onClick={connectWallet}>Connect Wallet</button>  
          <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}
```

## Truy cập kết nối, tài khoản, thông tin mạng

Sau khi kết nối thành công ví của bạn, bạn có thể sử dụng phương pháp [onboard.state.get()](https://onboard.blocknative.com/docs/modules/core#get-current-state) để tìm nạp trạng thái kết nối của bạn được lưu trữ thông qua phiên bản onboard. Bạn cũng có thể lấy trạng thái trong quá trình kết nối ban đầu. Bây giờ bạn có thể sửa đổi phương pháp xonnectWallet () để trả về danh sách các trạng thái ví mà bạn có thể lưu trữ trong trạng thái của mình và sử dụng trong suốt ứng dụng.

**Bước 1**: Nhập useState của React

```js
import { useState } from 'react';
```

**Bước 2**: Sửa đổi mã trong chức năng Ứng dụng của bạn

```js
function App() {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState();
  const [chainId, setChainId] = useState();
  const connectWallet = async () => {
    try {
      const wallets = await onboard.connectWallet();
      const { accounts, chains, provider } = wallets[0];
      
      setProvider(provider);
      setAccount(accounts[0].address);
      setChainId(chains[0].id);
     
    } catch (error) {
      console.error(error);
    }
  };
  
  ...
  
  return (
    <div className="App">
        <div>
            { !account ? ( <button  onClick={connectWallet}> Connect Wallet</button> ) : (
                <button onClick={disconnect}>Disconnect</button>
            )}
        </div>
     		
        <div>Wallet Address: ${truncateAddress(account)}</div>
        <div>Network Chain ID: ${chainId}</div>
    </div>
  );
}
```

## Chuyển đổi Mạng

Để nhắc người dùng chuyển đổi mạng trong dApp của bạn, Web3-Onboard cung cấp phương pháp `setChain` trên một phiên bản khởi tạo của Onboard. Lưu ý rằng mạng mục tiêu phải được khởi tạo với phiên bản onboard khi bắt đầu ứng dụng của bạn.

```js
const switchNetwork = async () => {
await onboard.setChain({ chainId: toHex(1001) });
};

return (
    <div className="App">
        <button onClick={switchNetwork}>Switch Network</button>
    </div>
)
```

## Gửi giao dịch bản địa

Sau khi kết nối thành công với ví, bạn có thể lưu trữ đối tượng nhà cung cấp được trả về từ kết nối ví trong biến trạng thái như được thực hiện trong hàm connectWallet (). Do đó, bạn có thể sử dụng đối tượng nhà cung cấp và người ký này để gửi các giao dịch đến chuỗi khối.

```js
 // add to the existing useState hook.
  const [txHash, setTxHash] = useState();

  const sendKlay = async () => {
    
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
	
    // this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(provider);
    // for ethers version below 6.3.0.
    // const provider = new ethers.providers.Web3Provider(provider);

    const signer = await ethersProvider.getSigner();

    // Submit transaction to the blockchain and wait for it to be mined
    const tx = await signer.sendTransaction({
          to: "0x75Bc50a5664657c869Edc0E058d192EeEfD570eb",
          value: ethers.parseEther("0.1"),
          maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
          maxFeePerGas: "6000000000000", // Max fee per gas
        })
    
        
    const receipt = await tx.wait();
    setTxHash(receipt.hash)
  }


return (
    <div className="App">
        <button onClick={sendKlay}>Send Klay</button>
        <div>Send-Klay Tx Hash :  {txHash ? <a href={`https://baobab.scope.klaytn.com/tx/${txHash}`} target="_blank">Klaytnscope</a> :  ' ' } </div>
    </div>
);

```

## Tương tác với Hợp đồng Thông minh

Với nhà cung cấp Web3-Onboard và đối tượng người ký, bạn có thể thực hiện các tương tác hợp đồng như viết và đọc từ hợp đồng thông minh được triển khai trên chuỗi khối.

```js
// add to existing useState hook
  const [contractTx, setContractTx] = useState();
  const [contractMessage, setContractMessage] = useState();

  const writeToContract = async (e) => {
    e.preventDefault();
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
  
     // this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(provider);
    // for ethers version below 6.3.0.
   // const provider = new ethers.providers.Web3Provider(provider);
    const signer = await ethersProvider.getSigner();
  
    // Paste your contractABI
    const contractABI = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_initNum",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "num",
            "type": "uint256"
          }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
  
     // Paste your contract address
    const contractAddress = "0x3b01E4025B428fFad9481a500BAc36396719092C";
  
    // const contract = new Contract(contractAddress, contractABI, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
    const value = e.target.store_value.value;
  
    // Send transaction to smart contract to update message
    const tx = await contract.store(value);
  
    // Wait for transaction to finish
    const receipt = await tx.wait();
    const result = receipt.hash;
  
    setContractTx(result)
  }

  const readFromContract = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
  	
	
    // this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(provider);
    // for ethers version below 6.3.0.
    // const provider = new ethers.providers.Web3Provider(provider);
  
    // paste your contract ABI
    const contractABI = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_initNum",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "num",
            "type": "uint256"
          }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
  
     // paste your contract address
    const contractAddress = "0x3b01E4025B428fFad9481a500BAc36396719092C"; 
  
    // const contract = new Contract(contractAddress, contractABI, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, ethersProvider)
  
    // Read message from smart contract
    const contractMessage = await contract.retrieve();
    setContractMessage(contractMessage.toString())
  }


  return (

    <div className="App">
         <form onSubmit={writeToContract}>
                  <input  name="store_value" placeholder="Set contract value" required/>
                  <input  type="submit" value="Store"/>
        </form> 
        <button onClick={readFromContract}>Read From Contract</button> 
        <div>Write-to-contract Tx Hash: ${contractTx}</div>
        <div>Read-from-contract Message: ${contractMessage}</div>
    </div>

  )
```

## Khắc phục sự cố

**Lỗi mô-đun lõi nút polyfill**

```js
BREAKING CHANGES: webpack<5 used to include polyfills for node.js core modules by default.
```

Lỗi này xảy ra khi bạn sử dụng webpack phiên bản 5. Trong phiên bản này, NodeJS polyfills không còn được hỗ trợ theo mặc định. Để giải quyết vấn đề này, hãy tham khảo [hướng dẫn](https://web3auth.io/docs/troubleshooting/webpack-issues).

## Bước tiếp theo

Để biết thêm các hướng dẫn chuyên sâu trên Web3-Onboard, vui lòng tham khảo [Tài liệu Blocknative](https://docs.blocknative.com/onboard) và [Kho lưu trữ GitHub Blocknative](https://github.com/blocknative/onboard). Ngoài ra, bạn có thể tìm thấy việc triển khai đầy đủ mã cho hướng dẫn này trên [GitHub](https://github.com/klaytn/examples/tree/main/wallet-libraries/web3Onboard-sample).
