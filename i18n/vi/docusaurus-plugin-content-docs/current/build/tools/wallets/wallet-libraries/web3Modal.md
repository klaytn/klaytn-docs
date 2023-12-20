---
sidebar_label: Web3Modal
---

# Tích hợp Web3Modal vào dApp

![](/img/build/tools/klaytnXwebModal.png)

## Giới thiệu

[Web3Modal](https://docs.walletconnect.com/2.0/web3modal/about) là một thư viện dễ dùng giúp các nhà phát triển thêm trợ năng cho nhiều nhà cung cấp trong dApp của họ với cấu hình đơn giản, có thể tùy chỉnh. Nó làm cho việc kết nối ví, thực hiện giao dịch và quản lý tài khoản trở nên dễ dàng.

Trong hướng dẫn này, bạn sẽ sử dụng thư viện web3Modal để tích hợp nhiều ví như Kaikas, Klip, Metamask, Coinbase Wallet, v.v. vào dApp của bạn được xây dựng trên mạng lưới Klaytn.

## Điều kiện tiên quyết

* Một dự án react đang hoạt động (bằng cách thực hiện `npx create-react-app project-name`)
* Cài đặt các ví cần thiết ([Kaikas](https://app.kaikas.io/), [Ví Coinbase Wallet](https://www.coinbase.com/wallet/downloads), và [Metamask](https://metamask.io/download/)).
* Điểm cuối RPC: bạn có thể nhận từ một trong những [Nhà cung cấp điểm cuối](../../../../references/service-providers/public-en.md) được hỗ trợ.à cung cấp endpoint được hỗ trợ.
* KLAY thử nghiệm từ [Vòi](https://baobab.wallet.klaytn.foundation/faucet): nạp tiền vào tài khoản với một lượng KLAY vừa đủ.

## Thiết lập các tùy chọn của nhà cung cấp Ví và Web3Modal

**Bước 1**: Cài đặt Web3Modal và thư viện Ethereum

Cài đặt Web3Modal và thư viện ưa thích của bạn để tương tác với chuỗi khối. Trong hướng dẫn này, chúng tôi sẽ cài đặt [@klaytn/web3modal](https://github.com/klaytn/klaytn-web3modal) có nguồn gốc từ [Web3Modal](https://github.com/WalletConnect/web3modal) và được sửa đổi để thêm ví Kaikas và ví Klip. Ngoài ra, hướng dẫn này sẽ sử dụng ethers.js để tương tác với chuỗi khối Klaytn.

```bash
npm install @klaytn/web3modal
npm install --save ethers
```

**Bước 2**: khởi tạo web3modal với các tùy chọn nhà cung cấp ví

Cài đặt các nhà cung cấp ví mà bạn chọn. Ở đây chúng tôi cài đặt các nhà cung cấp ví Kaikas, Klip và Coinbase.

```bash
npm install --save @coinbase/wallet-sdk
npm install --save @klaytn/kaikas-web3-provider
npm install --save @klaytn/klip-web3-provider
```
Trong tệp `App.js` của bạn, nhập CoinbaseWalletSDK, KaikasWeb3Provider và KlipWeb3Provider và khởi tạo các tùy chọn nhà cung cấp khác nhau để tích hợp với dapp của bạn.

```js
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { KaikasWeb3Provider } from "@klaytn/kaikas-web3-provider";
import { KlipWeb3Provider } from "@klaytn/klip-web3-provider";

export const providerOptions = {
 coinbasewallet: {
   package: CoinbaseWalletSDK, 
   options: {
     appName: "Web 3 Modal Demo",
     infuraId: process.env.INFURA_KEY 
   }
 },
 walletconnect: {
   package: WalletConnect, 
   options: {
     infuraId: process.env.INFURA_KEY 
   }
 }
};
const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK, // required
    options: {
      appName: "Web3Modal Klaytn dApp", // required
      infuraId: "NFURA_KEY", // required
      rpc: "https://klaytn-mainnet-rpc.allthatnode.com:8551", // Optional if `infuraId` is provided; otherwise it's required
      chainId: 1001, // Optional. It defaults to 1 if not provided
darkMode: false // Optional. Use dark theme, defaults to false
}
},
klip: {
package: KlipWeb3Provider, //required
options: {
bappName: "Web3Modal Klaytn dApp", //required
rpcUrl: "https://klaytn-mainnet-rpc.allthatnode.com:8551" //required
}
},
kaikas: {
package: KaikasWeb3Provider // required
}
};
```
**Bước 3**: Instantiate web3modal

Sau đó, khởi tạo Web3Modal bằng cách chuyển các tùy chọn của nhà cung cấp.

```js
import Web3Modal from "@klaytn/web3modal";
const  web3Modal = new Web3Modal( {
    cacheProvider: true,
    providerOptions,
  } )
```

## Thiết lập kết nối ví

Để thiết lập kết nối với ví người dùng, hãy gọi phương pháp `Connect()` trên thể hiện Web3Modal. Chúng tôi khuyên bạn nên kết thúc thao tác này xung quanh một chức năng Async và lưu trữ nhà cung cấp được truy xuất ở trạng thái của bạn để sử dụng lại trong suốt ứng dụng.

```js
import { ethers } from 'ethers';
import { useState } from 'react';

function App() {
const [provider, setProvider] = useState();

const connectWallet = async () => {
try {

const web3ModalProvider = await web3Modal.connect();

// this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(web3ModalProvider);
// for ethers version below 6.3.0.
    // const provider = new ethers.providers.Web3Provider(web3ModalProvider);
setProvider(web3ModalProvider);
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

![](/img/build/tools/web3Modal.png)

## Thiết lập chức năng sử dụng

Trong hướng dẫn này, chúng tôi sẽ sử dụng các hàm tiện ích như `truncateAddress()` và `toHex()`. Hàm truncateaddress () có một địa chỉ hợp lệ và trả về một định dạng dễ đọc hơn của địa chỉ được truyền vào. Trong khi hàm toHex() chuyển đổi số thành thập lục phân.  Các bước sau đây cho thấy cách thiết lập và sử dụng chức năng sử dụng trong dự án của bạn.

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

## Truy cập kết nối, tài khoản, thông tin mạng

Như vậy, Web3Modal không cung cấp hỗ trợ tích hợp cho các tương tác Ethereum, chẳng hạn như truy xuất các tài khoản được kết nối và dữ liệu mạng. Lưu ý rằng để đọc địa chỉ người dùng hoặc ID mạng được kết nối, bạn phải trực tiếp yêu cầu thông tin từ thư viện Ethereum của bạn. Trong hướng dẫn này, chúng tôi sẽ nhận được thông tin đó bằng Ethers.js. Một cách là tìm nạp và lưu trữ dữ liệu này là khi kết nối người dùng của bạn với dapp của bạn.

```js
const [provider, setProvider] = useState();
const [tài khoản, setAccount] = useState();
const [chainId, setChainId] = useState();

const connectWallet = async () => {
  try {
    const web3ModalProvider = await web3Modal.connect();

    // this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(web3ModalProvider);
    // for ethers version below 6.3.0.
    // const provider = new ethers.providers.Web3Provider(web3ModalProvider);

    const tài khoảns = await ethersProvider.listAccounts();
    const network = await ethersProvider.getNetwork();

    setProvider(provider);
    if (tài khoảns) setAccount(tài khoảns[0]);
    setChainId(network.chainId.toString());
  } catch (error) {
    console.error(error);
  }
};

return (
  <div className="App">
       <button onClick={connectWallet}>Connect Wallet</button>
       <div>Connected To Chain ID: ${chainId}</div>
       <div>Wallet Address: ${truncateAddress(tài khoản)}</div>
  </div>
);
```
## Ngắt kết nối ví

Ngắt kết nối khỏi ví đạt được bằng cách sử dụng phương pháp `clearCachedProvider()` trên phiên bản Web3Modal. Ngoài ra, một thực tế tốt là làm mới trạng thái để xóa bất kỳ dữ liệu kết nối được lưu trữ trước đó.

```js
function App() {

const disconnect = async () => {
    await web3Modal.clearCachedProvider();
      refreshState();
  };

// refresh state
const refreshState = () => {
  setAccount();
  setChainId();
// make sure to add every other state variable declared here.
}

  return (
    <div className="App">
          <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}
```

Điều quan trọng là phải nhớ rằng trạng thái dApp thay đổi khi người dùng tương tác với nó và tốt nhất là đăng ký đăng ký các sự kiện được phát hành để đáp ứng. Tạo các móc sử dụng với các đăng ký cho các sự kiện này để chúng có thể phản hồi thích hợp với các thay đổi.

```js
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (tài khoảns) => {
        setAccount(tài khoảns);
      };

      const handleChainChanged = (chainId) => {
        setChainId(chainId);
      };

      const handleDisconnect = () => {
        disconnect();
      };

      provider.on("tài khoảnsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("tài khoảnsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);
```

## Chuyển mạng hoặc thêm mạng tùy chỉnh

Như đã thiết lập trước đây, Web3Modal không hỗ trợ tích hợp cho các tương tác Ethereum. Để thêm hoặc chuyển đổi mạng, bạn phải trực tiếp thực hiện yêu cầu (thông qua EIP-3085 hoặc EIP-3326) cho thư viện Ethereum của bạn. Dưới đây là một ví dụ về việc yêu cầu chuyển đổi mạng và thêm mạng dưới dạng dự phòng nếu nó chưa có trên ví của người dùng:

```js
  const switchNetwork = async () => {
    if (!provider) return;
    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(8217) }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: toHex(8217),
                chainName: "Klaytn TestNet",
                rpcUrls: ["https://klaytn-mainnet-rpc.allthatnode.com:8551"],
                blockExplorerUrls: ["https://baobob.scope.com/"],
              },
            ],
          });
        } catch (addError) {
          throw addError;
        }
      }
    }
  };

return (    
    <div className="App">
        <button onClick={switchNetwork}>Switch Network</button>  
    </div>
) 
```

## Đăng nhập tin nhắn

Sau khi khởi tạo đối tượng nhà cung cấp và người ký, người dùng có thể ký một chuỗi tùy ý.

```js
 // add to the existing useState hook.
const [signedMessage, setSignedMessage] = useState("");

const signMessage = async(e) => {
 e.preventDefault()
    if (!provider) return;
      try {
      const signature = await provider.request({
        method: "personal_sign",
        params: [message, tài khoản]
      });

    setSignedMessage(signature);

    } catch (error) {
      console.log(error);
    }
}
  return (
    <div className="App">
        <form onSubmit={signMessage}>
             <input type="text" name="message" placeholder="Set message" required/>
             <input type="submit" value="Sign Message"/>
         </form> 
         <div>SignedMessage: ${signedMessage}</div>
    </div>
  );
```

## Gửi giao dịch bản địa

Bạn có thể thực hiện các giao dịch gốc, như gửi Klay từ người dùng này sang người dùng khác.

```js
    // add to the existing useState hook.
    const [txHash, setTxHash] = useState();
    const sendKlay = async () => {
    if (!provider) return;
      const destination = “paste recipient address”;

    // this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(provider);
    // for ethers version below 6.3.0.
    // const provider = new ethers.providers.Web3Provider(provider);

    const signer = await ethersProvider.getSigner();

    // Submit transaction to the blockchain and wait for it to be mined
    const tx = await signer.sendTransaction({
        to: destination,
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

## Làm việc với một hợp đồng thông minh

Với nhà cung cấp Web3Modal và đối tượng người ký, bạn có thể thực hiện các tương tác hợp đồng như viết và đọc từ hợp đồng thông minh được triển khai cho chuỗi khối.

1. **Viết cho một hợp đồng**

```js
// add to existing useState hook
  const [contractTx, setContractTx] = useState();

  const writeToContract = async (e) => {
    e.preventDefault();
    if (!provider) return;

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
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const value = e.target.store_value.value;

    // Send transaction to smart contract to update message
    const tx = await contract.store(value);

    // Wait for transaction to finish
    const receipt = await tx.wait();
    const result = receipt.hash;

    setContractTx(result)
  }

return (
    <div className="App">
         <form onSubmit={writeToContract}>
            <input  name="store_value" placeholder="Set contract value" required/>
            <input  type="submit" value="Store"/>
        </form> 
         <div>Write-to-contract Tx Hash: ${contractTx}</div>
    </div>
)
```

2. **Đọc từ một hợp đồng**

```js
// add to existing useState hook
 const [contractMessage, setContractMessage] = useState();
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

    const contract = new ethers.Contract(contractAddress, contractABI, ethersProvider)

    // Reading a message from the smart contract
    const contractMessage = await contract.retrieve();
    setContractMessage(contractMessage.toString())
  }

  return (
    <div className="App">
        <button onClick={readFromContract}>Read From Contract</button> 
        <div>Read-from-contract Message: ${contractMessage}</div>
    </div>

  )
```

## Khắc phục sự cố

1. **Node fs error, add browser \{fs: false\} to package.json**

```bash
Node fs error, add browser {fs: false} to package.json
```

Điều này xảy ra khi bạn cài đặt Klip-web3-provider.  Để khắc phục vấn đề này, hãy làm theo các bước sau:

**Bước 1**: Mở và điều hướng đến thư mục node_modules của bạn. Tìm thư mục @Klaytn/klip-web3-provider và điều hướng đến tệp pack.json của nó như hiển thị bên dưới:

> **@klaytn/klip-web3-provider/node_modules/caver-js/packages/caver.ipfs/pack.json**

**Bước 2**: Dán mã bên dưới vào @klaytn/klip-web3-provider/node_modules/caver-js/packages/caver.ipfs/pack.json.

```js
"browser": {
        "fs": false
     },
```

2. **Lỗi mô-đun lõi nút polyfill**

```js
THAY ĐỔI ĐỘT PHÁ: webpack<5 được sử dụng để bao gồm polyfills cho node.js lõi node.js theo mặc định.
```
Lỗi này xảy ra khi bạn sử dụng webpack phiên bản 5. Trong phiên bản này, NodeJS polyfills không còn được hỗ trợ theo mặc định. Để giải quyết vấn đề này, hãy tham khảo [hướng dẫn](https://web3auth.io/docs/troubleshooting/webpack-issues).

## Bước tiếp theo

Để biết thêm các hướng dẫn chuyên sâu về Web3Modal, vui lòng tham khảo [Web3Modal Docs](https://docs.walletconnect.com/2.0/web3modal/about) và [Kho lưu trữ Web3Modal GitHub](https://github.com/klaytn/klaytn-web3modal). Ngoài ra, bạn có thể tìm thấy việc triển khai đầy đủ mã cho hướng dẫn này trên [GitHub](https://github.com/klaytn/examples/tree/main/wallet-libraries/web3Modal-sample).



