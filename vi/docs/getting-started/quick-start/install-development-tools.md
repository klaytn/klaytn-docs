# Cài đặt các công cụ phát triển <a id="install-development-tools"></a>

## Cài đặt caver-js <a id="installing-caver-js"></a>

Chúng tôi đề nghị bạn nên tạo một thư mục dự án klaytn để:

```bash
$ mkdir $HOME/klaytn
```

> Bạn cần cài đặt `npm` và `node.js` để tiếp tục. Vui lòng tham khảo [get-npm](https://www.npmjs.com/get-npm) và [node.js](https://nodejs.org/en/) để xem cách cài đặt trên hệ thống của bạn.

[caver-js](../../dapp/sdk/caver-js/README.md) là bộ khung RPC JSON dành cho mạng lưới Klaytn \(tương đương với web3.js trong Ethereum\). Trước khi cài đặt caver-js, bạn phải tạo tập tin `package.json` qua lệnh `npm init`, sau đó gõ `npm install caver-js` để cài đặt caver-js.

```bash
$ npm init # initialize npm at the klaytn project directory
$ npm install caver-js
```

**LƯU Ý**: Nếu bạn đã cài đặt caver-js, vui lòng cập nhật lên phiên bản mới nhất.

```bash
$ npm cache clean --force # initialize npm cache
$ npm install caver-js@latest # update caver-js to the latest version
```

Nếu bạn nhận được các lỗi sau khi cập nhật caver-js, hãy xóa thư mục `.git` trong thư mục `websocket`.

```bash
npm ERR! path /Users/username/klaytn/node_modules/websocket
npm ERR! code EISGIT
npm ERR! git /Users/username/klaytn/node_modules/websocket: Appears to be a git repo or submodule.
npm ERR! git     /Users/username/klaytn/node_modules/websocket
npm ERR! git Refusing to remove it. Update manually,
npm ERR! git or move it out of the way first.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/username/.npm/_nhật ký/2019-06-25T01_49_37_032Z-debug.log​

$ rm /Users/username/klaytn/node_modules/websocket/.git
```

**Lưu ý:** Đối với tất cả các chức năng gọi ra hàm bắt đầu bằng `web3.eth...` in web3.js, nên được thay thế bằng `caver.klay...`.

`web3.eth.sendTransaction({ ... })` \(X\)

`caver.klay.sendTransaction({ ... })` \(O\)

## Cài đặt Truffle <a id="installing-truffle"></a>

Trong bài hướng dẫn này, Truffle được sử dụng để lập và triển khai hợp đồng thông minh được viết bằng Solidity. Hiện tại, Klaytn hỗ trợ Truffle phiên bản 4.1.15. Để biết thêm thông tin về Truffle, hãy tham khảo các trang sau:

* Kho lưu trữ Truffle - [https://github.com/trufflesuite/truffle](https://github.com/trufflesuite/truffle)
* Tài liệu Truffle - [https://trufflesuite.com/docs](https://trufflesuite.com/docs)​

Chúng ta có thể cài đặt Truffle theo hai cách

1\) theo cách toàn cục bằng npm, thực thi các lệnh sau:

```bash
$ sudo npm install -g truffle@4.1.15
$ cd /usr/local/lib/node_modules/truffle
$ sudo npm install solc@0.5.6
$ cd -
```

hoặc

2\) theo cách cục bộ, nghĩa là tại thư mục trong máy bạn, thực thi các lệnh sau:

```bash
# Assuming you are in $HOME/klaytn/.
$ npm install truffle@4.1.15
$ cd node_modules/truffle
$ npm install solc@0.5.6
$ cd -
$ ln -s node_modules/truffle/build/cli.bundled.js truffle
$ export PATH=`pwd`:$PATH
```

## Cài đặt vvisp <a id="installing-vvisp"></a>

vvisp là một công cụ/bộ khung cli dễ sử dụng để phát triển các hợp đồng thông minh, do [HEACHI LABS](https://henesis.io/) cung cấp. Bạn có thể dễ dàng thiết lập môi trường, triển khai và thực thi các hợp đồng thông minh Klaytn với một lệnh duy nhất. Nó hỗ trợ bộ khung Truffle, vì vậy, các nhà phát triển đã quen thuộc với Truffle có thể dễ dàng sử dụng vvisp.

Ở đây, chúng tôi giới thiệu cách cài đặt vvisp và sử dụng công cụ này để thiết lập môi trường phát triển Klaytn dApp.

* kho lưu trữ vvisp - [https://github.com/HAECHI-LABS/vvisp](https://github.com/HAECHI-LABS/vvisp)
* tài liệu vvisp - [https://github.com/HAECHI-LABS/vvisp/blob/dev/README\_KLAYTN.md](https://github.com/HAECHI-LABS/vvisp/blob/dev/README_KLAYTN.md)

bạn có thể dễ dàng cài đặt vvisp nếu có npm hoặc yarn bằng cách thực thi lệnh sau:

```bash
$ npm install -g @haechi-labs/vvisp
# or if you use yarn
$ yarn global add @haechi-labs/vvisp
```

Sau khi cài đặt xong, bạn có thể sử dụng lệnh vvisp để đảm bảo công cụ này đã được cài đặt đúng cách. **LƯU Ý**: Bạn nên sử dụng phiên bản cao hơn **v2.1.0**.

```bash
$ vvisp
Usage: vvisp <command> [options]

where <command> is one of: compile, console, deploy-contract, deploy-service, flatten, gen-script, init

Options:
  -v, --version  output the version number
  -h, --help     output usage information

Commands:

   compile [files...]                       compile the smart contracts

   console [script-api-path]                run interactive shell to execute contract scripts

   deploy-contract <file> [arguments...]    deploy the smart contracts

   deploy-service                           deploy or upgrade smart contract service using the deployment configure file

   flatten <files...>                       flatten the smart contracts

   gen-script [files...]                    generate javascript libraries communicating the smart contracts

   init [name]                              initialize directory to use vvisp

# you can check installed version.
$ vvisp --version
v2.1.0
```



