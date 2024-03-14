---
sidebar_label: Web3Auth
---

# Tích hợp Web3Auth vào dApp

![](/img/build/tools/klaytnXweb3Auth.png)

## Giới thiệu

[Web3Auth](https://web3auth.io/docs/) là một cơ sở hạ tầng ví được cắm vào dApp hoặc ví. Nó hoạt động như một cơ sở hạ tầng xác thực có thể cắm được vào ví và ứng dụng web3. Với trải nghiệm người dùng tuyệt vời của Web3Auth, cả tiền chính thống và tiền mã hóa có thể được đưa vào hoạt động trong vài phút.

Là một cơ sở hạ tầng ví, nó cung cấp hỗ trợ vượt trội cho tất cả các thông tin đăng nhập xã hội, nền tảng web và di động, ví và các phương pháp quản lý quan trọng khác. Đến cuối hướng dẫn này, bạn sẽ tích hợp được Web3Auth vào ứng dụng web phi tập trung của bạn được xây dựng trên Mạng lưới Klaytn. Để tích hợp Web3Auth vào các nền tảng khác (Android, iOS, React Native, Flutter, & Unity), vui lòng tham khảo chỉ dẫn này [guide](https://web3auth.io/docs/pnp/introduction).

## Điều kiện tiên quyết

- Một dự án react đang hoạt động (bằng cách thực hiện `npx create-react-app project-name`)
- Cài đặt các ví cần thiết ([Ví Coinbase Wallet](https://www.coinbase.com/wallet/downloads), [Metamask](https://metamask.io/download/)).
- Điểm cuối RPC: bạn có thể nhận từ một trong những [Nhà cung cấp điểm cuối](../../../../references/service-providers/public-en.md) được hỗ trợ.à cung cấp endpoint được hỗ trợ.
- KLAY thử nghiệm từ [Vòi](https://baobab.wallet.klaytn.foundation/faucet): nạp tiền vào tài khoản với một lượng KLAY vừa đủ.
- Nhận ID Khách hàng của bạn từ [Bảng điều khiển Web3Auth](https://dashboard.web3auth.io/).

## Cài đặt

Để sử dụng Web3Auth trong dApp, trước tiên bạn phải cài đặt các thư viện và SDK được yêu cầu. Do đó, bạn sẽ cần thiết lập Ethers.js và SDK web của Web3Auth. Bạn có thể sử dụng Web3Auth cùng với [ethers.js](https://docs.ethers.org/v6/) hoặc thư viện [web3.js](https://web3js.readthedocs.io/en/v1.2.8/getting-started.html) để liên lạc với chuỗi khối Klaytn. Chúng tôi sẽ sử dụng Ethers.js trong suốt hướng dẫn này.

```bash
npm install --save @web3auth/modal
npm install --save ethers	
```

## Khởi tạo phiên bản Web3Auth và nhà cung cấp

Sau khi cài đặt thành công các thư viện cần thiết, tiếp theo là khởi tạo phiên bản Web3Auth, đặt phiên bản nhà cung cấp Web3Auth trong Hook useState() và cả hàm init() trong useEffect().

```js
import { Web3Auth } from "@web3auth/modal";
import { ContractFactory, ethers } from "ethers";
import { useState, useEffect } from "react";

function App() {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);

useEffect(() => {

    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId: "YOUR_WEB3AUTH_CLIENT_ID", // get it from Web3Auth Dashboard
          web3AuthNetwork: "cyan",
          chainConfig: {
            chainNamespace: "eip155",
	        // modify if mainnet => “0x2019”
            chainId: "0x3e9", // hex of 1001, Klaytn Baobab testnet. 
            rpcTarget: "https://public-en-baobab.klaytn.net", // modify if mainnet
            displayName: "Klaytn Testnet", //  modify if mainnet
            blockExplorer: "https://baobab.scope.klaytn.com/", // modify if mainnet
            ticker: "KLAY",
            tickerName: "KLAY",
          },
        })
        setWeb3auth(web3auth);
        await web3auth.initModal();
        setProvider(web3auth.provider);
      } catch (error) {
        console.error(error);
      }
    };
    init();
}, []);
```

## Kết nối ví

Bên trong chức năng ứng dụng của bạn trong tệp ` app.js` của bạn, hãy gọi Phương thức [Kết nối ()](https://web3auth.io/docs/sdk/web/no-modal/usage#logging-in-the-user) trên phiên bản Web3Auth để bắt đầu kết nối ví của bạn.

```js
const connectWallet = async() => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    console.log(web3authProvider);
}
  return (
    <div className="App">
      <button onClick={connectWallet}>Connect Wallet</button>  
    </div>
  );
```

![](/img/build/tools/web3Auth.png)

## Thiết lập chức năng sử dụng

Trong hướng dẫn này, chúng tôi sẽ sử dụng chức năng sử dụng: `truncateAddress()`. Hàm truncateaddress () có một địa chỉ hợp lệ và trả về một định dạng dễ đọc hơn của địa chỉ được truyền vào. Các bước sau đây cho thấy cách thiết lập và sử dụng chức năng sử dụng trong dự án của bạn.

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
```

**Bước 2**: Nhập hàm trong tệp `app.js` của bạn.

```js
import { truncateAddress } from "./utils";
```

## Nhận tài khoản và cân bằng

Đã kết nối ví của bạn thành công bằng cách gọi phương pháp `Connect()` trên phiên bản Web3Auth, bạn có thể nhận tài khoản người dùng và số dư của nó bằng cách sử dụng đối tượng nhà cung cấp và người ký.

```js
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

 const connectWallet = async() => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    
    // this guide uses ethers version 6.3.0.
    const ethersProvider = new ethers.BrowserProvider(web3authProvider);
    // for ethers version below 6.3.0.
    // const provider = new ethers.providers.Web3Provider(web3authProvider);
    const ethersProvider = new ethers.BrowserProvider(web3authProvider);

    const signer = await ethersProvider.getSigner();

    // Get user's Ethereum public address
    const address =   signer.address;

    // Get user's balance in ether
    const balance = ethers.formatEther(
      await ethersProvider.getBalance(address) // balance is in wei
    );

    setAddress(address);
    setBalance(balance);

return (
    <div className="App">
        <button onClick={connectWallet}>Connect Wallet</button>  
        <div>Wallet Address: ${truncateAddress(address)} Balance: ${balance}</div>
    </div>
  );
}
```

## Ngắt kết nối ví

Ngắt kết nối với ví đạt được bằng cách sử dụng phương pháp [logout()](https://web3auth.io/docs/sdk/web/no-modal/usage#logging-out-the-user) trên phiên bản Web3Auth. Ngoài ra, một thực tế tốt là làm mới trạng thái để xóa bất kỳ dữ liệu kết nối được lưu trữ trước đó.

```js
function App() {
    
const disconnect = async () => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  await web3auth.logout();
  refreshState();
}

// refresh state
const refreshState = () => {
  setAddress();
  setBalance();
// make sure to add every other useState modifier function declared here.
}
  
return (
    <div className="App">
        <button onClick={disconnect}>Disconnect</button>
    </div>
  );
}
```

## Chuỗi chuyển đổi

Để chuyển chuỗi bằng cách sử dụng Web3Auth, trước tiên bạn phải thêm cấu hình chuỗi mong muốn vào bộ điều hợp được kết nối bằng cách gọi phương pháp [addChain()](https://web3auth.io/docs/sdk/web/no-modal/usage#add-chain), sau đó tiến hành gọi phương pháp [switchChain()](https://web3auth.io/docs/sdk/web/no-modal/usage#switch-chain).

```js
const switchChain = async () => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  // add chain - Klaytn Mainnet
  await web3auth.addChain({
    chainId: "0x2019",
    displayName: "Klaytn Cypress",
    chainNamespace: "eip155",
    tickerName: "KLAY",
    ticker: "KLAY",
    decimals: 18,
    rpcTarget: "https://public-en-cypress.klaytn.net",
    blockExplorer: "https://scope.klaytn.com",
  });
  // switch chain
  await web3auth.switchChain({chainId: "0x2019"});
}


return (
    <div className="App">
    	<button  onClick={switchChain}>Switch Chain</button>
    </div>
);
```

## Nhận thông tin người dùng

Một tính năng độc đáo của Web3Auth là đăng nhập xã hội. Khi đăng nhập người dùng bằng các nền tảng xã hội của họ, phiên bản Web3Auth trả về một số thông tin về người dùng đã đăng nhập. Nhận được thông tin người dùng đã đăng nhập đơn giản như gọi phương pháp getUserInfo() trên phiên bản Web3Auth.

```js
 // add to the existing useState hook.
  const [userData, setUserData] = useState({});
	
   const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    setUserData(user);
};

 return (
    <div className="App">
        <button onClick={getUserInfo}>Get User Info</button>  
        <div> { userData ? `User Email: ${userData.email}, User Name: ${userData.name}` :  ""} </div>
    </div>
  );
```

## Đăng nhập tin nhắn

Sau khi khởi tạo đối tượng nhà cung cấp và người ký, người dùng có thể ký một chuỗi tùy ý.

```js
 // add to the existing useState hook.
const [signedMessage, setSignedMessage] = useState("");

const signMessage = async(e) => {
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

  const originalMessage = e.target.message.value;
  const result = await signer.signMessage(originalMessage);
  setSignedMessage(result)  
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
    
      if (!provider) {
        console.log("provider not initialized yet");
        return;
      }
      const destination = "paste recipient address";

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

### 1. Triển khai một hợp đồng

Bạn có thể triển khai một hợp đồng thông minh với giao diện nhị phân ứng dụng (ABI) và mã byte hợp đồng của nó.

```js
// add to the existing useState hook.
const [contractAddress, setContractAddress] = useState(null);

const deployContract = async () => {
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
// this guide uses ethers version 6.3.0.
const ethersProvider = new ethers.BrowserProvider(provider);
// for ethers version below 6.3.0.
// const provider = new ethers.providers.Web3Provider(provider);

const signer =  await ethersProvider.getSigner();

// paste your contractABI
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

  // Paste your contract byte code
  const contractBytecode = '608060405234801561001057600080fd5b506040516102063803806102068339818101604052810190610032919061007a565b80600081905550506100a7565b600080fd5b6000819050919050565b61005781610044565b811461006257600080fd5b50565b6000815190506100748161004e565b92915050565b6000602082840312156100905761008f61003f565b5b600061009e84828501610065565b91505092915050565b610150806100b66000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100a1565b60405180910390f35b610073600480360381019061006e91906100ed565b61007e565b005b60008054905090565b8060008190555050565b6000819050919050565b61009b81610088565b82525050565b60006020820190506100b66000830184610092565b92915050565b600080fd5b6100ca81610088565b81146100d557600080fd5b50565b6000813590506100e7816100c1565b92915050565b600060208284031215610103576101026100bc565b5b6000610111848285016100d8565b9150509291505056fea26469706673582212200370e757ac1c15a024febfa9bf6999504ac6616672ad66bd654e87765f74813e64736f6c63430008120033'

  const contractFactory = new ContractFactory(contractABI, contractBytecode, signer);

  const contract = await contractFactory.deploy(400);
  
  // get contract address
  setContractAddress(contract.target)
}


return (
    <div className="App">
        <button onClick={deployContract}>Deploy Contract</button>  
        <div>Contract Address: {contractAddress ? contractAddress : ''} </div>
    </div>
  );
```

Với nhà cung cấp Web3Auth và đối tượng người ký, bạn có thể thực hiện các tương tác hợp đồng như viết và đọc từ hợp đồng thông minh được triển khai trên chuỗi khối.

### 2. Viết cho một hợp đồng

```js
  // add to existing useState hook
  const [contractTx, setContractTx] = useState();

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

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
    const value = e.target.store_value.value;
  
    // Send a transaction to smart contract to update the value
    const tx = await contract.store(value);
  
    // Wait for the transaction to finish
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
);
```

### 3. Đọc từ một hợp đồng

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
    <button onClick={readFromContract}>Read From Contract</button> 
    <div>Read-from-contract Message: ${contractMessage}</div>
  )
```

## Khắc phục sự cố

**Polyfill node core module error**

```js
BREAKING CHANGES: webpack<5 used to include polyfills for node.js core modules by default.
```

Lỗi này xảy ra khi bạn sử dụng webpack phiên bản 5. Trong phiên bản này, NodeJS polyfills không còn được hỗ trợ theo mặc định. Để giải quyết vấn đề này, hãy tham khảo [hướng dẫn](https://web3auth.io/docs/troubleshooting/webpack-issues).

## Bước tiếp theo

Để biết thêm các hướng dẫn chuyên sâu trên Web3Auth, vui lòng tham khảo [Web3Auth Docs](https://web3auth.io/docs/connect-blockchain/klaytn) và Kho lưu trữ [Web3Auth Github](https://github.com/web3auth). Also, you can find the full implementation of the code for this guide on [GitHub](https://github.com/klaytn/examples/tree/main/tools/wallet-libraries/web3Auth-sample).
