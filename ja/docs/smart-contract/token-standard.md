# Klaytn 互換トークン \(KCTs\) <a id="klaytn-compatible-tokens-kcts"></a>

Klaytn Compatible Token (KCT) は、特定の技術仕様を実装した特別なタイプのスマートコントラクトです。 Klaytnの上にトークンを発行したい人は誰でも仕様に従わなければなりません。

トークン標準は、 [KIP-7](https://kips.klaytn.foundation/KIPs/kip-7) や [KIP-17](https://kips.klaytn.foundation/KIPs/kip-17) などの Klaytn で定義されています。

他のKCTは、特定の技術仕様を満たすように定義することができます。 誰かが他のトークン標準を必要とする場合は、 [Klaytn Improvement Proposal](https://github.com/klaytn/KIPs) にアクセスし、新しいトークン標準を提案してください。

## Fungible Token Standard \(KIP-7\) <a id="fungible-token-standard-kip-7"></a>

真菌トークンは、均一性と分割性の特性を持つトークンです。 各ファンジブルトークンは、トークンの各ユニットが同じ値を持つため、すべてのファンジブルトークンが交換可能です。 どのドル紙幣も同じ価値を持っているのと同じです ほとんどの場合、ファンジビリティは暗号通貨にとって不可欠な機能であるため、ブロックチェーントークンの大部分はファンジブルトークンです。

これらのプロパティをスマートコントラクトで実装するには、KIP-7 トークン標準を使用できます。 KIP-7 互換トークンは、以下のインターフェイスを実装しています。 [KIP-13](https://kips.klaytn.foundation/KIPs/kip-13) は一緒に実装する必要があることに注意してください。 ウォレットアプリケーションの場合、 [ウォレットインターフェイス](https://kips.klaytn.foundation/KIPs/kip-7#wallet-interface) を実装できます。

```solidity
// IKIP7
event Transfer(address indexed from, address indexed to, uint256 value);
event Approval(address indexed owner, address indexed spender, uint256 value);

function totalSupply() external view returns (uint256);
function balanceOf(address account) external view returns (uint256);
function transfer(address recipient, uint256 amount) external returns (bool);
function allowance(address owner, address spender) external view returns (uint256);
function approve(address spender, uint256 amount) external returns (bool);
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
function safeTransfer(address recipient, uint256 amount, bytes data) external;
function safeTransfer(address recipient, uint256 amount) external;
function safeTransferFrom(address sender, address recipient, uint256 amount, bytes data) external;
function safeTransferFrom(address sender, address recipient, uint256 amount) external;

// IKIP7Metadata (optional)
function name() external view returns (string memory);
function symbol() external view returns (string memory);
function decimals() external view returns (uint8);

// IKIP7Mintable (optional)
function mint(address _to, uint256 _amount) external returns (bool);
function isMinter(address _account) external view returns (bool);
function addMinter(address _account) external;
function renounceMinter() external;

// IKIP7Burnable (optional)
function burn(uint256 _amount) external;
function burnFrom(address _account, uint256 _amount) external;

// IKIP7Pausable (optional)
event Paused(address _account);
event Unpaused(address _account);

function paused() external view returns (bool);
function pause() external;
function unpause() external;
function isPauser(address _account) external view returns (bool);
function addPauser(address _account) external;
function renouncePauser() external;
```

上記のインターフェイスに基づいて、開発者は新しい機能とロジックを追加してトークンをカスタマイズし、Klaytnネットワークにデプロイすることができます。

詳細については、公式の [KIP-7 ドキュメント](https://kips.klaytn.foundation/KIPs/kip-7) を参照してください。

* 実装例は [https://github.com/klaytn-contrits/blob/master/contrits/KIP/token/KIP7/KIP7.sol](https://github.com/klaytn/klaytn-contracts/blob/master/contracts/KIP/token/KIP7/KIP7.sol) で入手できます。

## Non-fungible Token Standard \(KIP-17\) <a id="non-fungible-token-standard-kip-17"></a>

Non-fungible token \(NFT\) は、固有のアセットを表す特別なタイプのトークンです。 non-fungible という名前が示すように、すべてのトークンはユニークで分割できません。 このノンファンジブルトークンの独自性は、資産のデジタル化の新たな展望を開きます。 たとえば、デジタルアート、ゲームアイテム、またはあらゆる種類のユニークな資産を表現し、人々がそれらを取引できるようにするために使用できます。

例えば、ブロックチェーン収集ゲーム [Cryptokitties](https://www.cryptokitties.co/) は、遺伝情報が異なる異なる異なる子猫を表すためにノンファンジブルトークンを実装しています。 すべてのキティはユニークで交換不可能であり、さまざまなキティトークンに異なる値をもたらします。

ノンファンジブルトークンを実装するには、 [KIP-17](https://kips.klaytn.foundation/KIPs/kip-17) を使用することができます。 KIP-17 トークン コントラクトは、次のインターフェイスを実装します。 [KIP-13](https://kips.klaytn.foundation/KIPs/kip-13) は一緒に実装する必要があることに注意してください。 ウォレットアプリケーションの場合、 [ウォレットインターフェイス](https://kips.klaytn.foundation/KIPs/kip-17#wallet-interface) を実装できます。

```solidity
// IKIP17
event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

function balanceOf(address _owner) external view returns (uint256);
function ownerOf(uint256 _tokenId) external view returns (address);
function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes _data) external payable;
function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
function approve(address _approved, uint256 _tokenId) external payable;
function setApprovalForAll(address _operator, bool _approved) external;
function getApproved(uint256 _tokenId) external view returns (address);
function isApprovedForAll(address _owner, address _operator) external view returns (bool);

// IKIP17Metadata (optional)
function name() external view returns (string _name);
function symbol() external view returns (string _symbol);
function tokenURI(uint256 _tokenId) external view returns (string);

// IKIP17Enumerable (optional)
function totalSupply() external view returns (uint256);
function tokenByIndex(uint256 _index) external view returns (uint256);
function tokenOfOwnerByIndex(address _owner, uint256 _index) external view returns (uint256);

// IKIP17Mintable (optional)
function mint(address _to, uint256 _tokenId) public returns (bool);
function isMinter(address _account) public view returns (bool);
function addMinter(address _account) public;
function renounceMinter() public;

// IKIP17MetadataMintable (optional)
function mintWithTokenURI(address _to, uint256 _tokenId, string memory _tokenURI) public returns (bool);
function isMinter(address _account) public view returns (bool);
function addMinter(address _account) public;
function renounceMinter() public;

// IKIP17Burnable (optional)
function burn(uint256 _tokenId) public;

// IKIP17Pausable (optional)
event Paused(address _account);
event Unpaused(address _account);
function paused() public view returns (bool);
function pause() public;
function unpause() public;
function isPauser(address _account) public view returns (bool);
function addPauser(address _account) public;
function renouncePauser() public;
```

上記のインターフェイスに基づいて、開発者は新しい機能とロジックを追加してトークンをカスタマイズし、Klaytnネットワークにデプロイすることができます。

詳細については、公式の [KIP-17 ドキュメント](https://kips.klaytn.foundation/KIPs/kip-17) を参照してください。

* 実装例は [https://github.com/klaytn-contrits/blob/master/contrits/KIP/token/KIP17/KIP17.sol](https://github.com/klaytn/klaytn-contracts/blob/master/contracts/KIP/token/KIP17/KIP17.sol) で入手できます。

## Klaytn Service Chainのトークン規格 <a id="token-standards-for-klaytn-service-chain"></a>

Service Chainとは、Klaytnのメインブロックチェーンネットワークに固定されるKlaytnのサイドチェーンのことです。 サービスチェーンを実装する際には、メインチェーンとサービスチェーンの間の価値移転をサポートするために特別なタイプの契約が使用されます。 これらの契約は現在開発中であり、準備が整ったら、KlaytnDocsにサービスチェーンのトークン仕様が提供されます。

## ERC-20およびERC-721に関する注意事項 <a id="notes-on-erc-20-and-erc-721"></a>
Klaytnはトークン標準としてKIP-7とKIP-17を公開しています。 ERC-20とERC-721に従うのではなく、KIP-7とKIP-17に従って、それぞれ真菌性のあるトークン契約と非真菌性のトークン契約を実装することをお勧めします。 KIP-7とKIP-17はERC-20とERC-721に基づいていますが、Klaytnに合わせて調整されているため、Klaytnエコシステムに適しています。 しかし、ERC-20とERC-721はKlaytnネットワーク上でまだサポートされており、Klaytnエコシステムのさまざまなツールと互換性がないかもしれません。 トークン標準の違いの詳細については、 [KIP-7](https://kips.klaytn.foundation/KIPs/kip-7#differences-with-erc-20) と [KIP-17](https://kips.klaytn.foundation/KIPs/kip-17#differences-from-erc-721) をご覧ください。
