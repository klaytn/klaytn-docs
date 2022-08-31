# Bridge contract

ServiceChain (SC) currently has three types of coin (`KLAY`, `ERC-20`, and `ERC-721`) transfer features between chains.
In this document, we list unsupported token standard functions.

## ERC-721
The ERC-721 standard has the [onERC721Received](https://eips.ethereum.org/EIPS/eip-721) callback function.
The `onERC721Received()` works with `safeTransferFrom()` function, but the current bridge contract implementation uses `transferFrom()`, which menas the `onERC721Recieved()` is not expected to be called.
Alternatively, a further action like `onERC721Recieved()` should be implemented in another way such as event listening (e.g., `event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId)`).
