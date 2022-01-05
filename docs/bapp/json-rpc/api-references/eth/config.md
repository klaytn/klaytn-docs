## eth_chainID <a id="eth_chainid"></a>

Returns the chain ID of the chain.

**Parameters**

None

**Return Value**

| Type     | Description                                           |
| -------- | ----------------------------------------------------- |
| QUANTITY | Integer of the chain ID of the chain. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_chainID","id":1}' http://localhost:8551

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"0x7e2"
}
```


## eth_clientVersion <a id="eth_clientversion"></a>

Returns the current client version of a Klaytn node.

**Parameters**

None

**Return Value**

| Type   | Description                                  |
| ------ | -------------------------------------------- |
| String | The current client version of a Klaytn node. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_clientVersion","id":1}' http://localhost:8551

// Result
{
    "jsonrpc":"2.0",
    "id":1,
    "result":"Klaytn/v0.9.1+3518232250/linux-amd64/go1.11.2"
}
```


## eth_gasPrice <a id="eth_gasprice"></a>

Returns the current price per gas in peb.

**NOTE**: This API has different behavior from Ethereum's and returns a gas price of Klaytn instead of suggesting a gas price as in Ethereum.

**Parameters**

None

**Return Value**

| Type     | Description                              |
| -------- | ---------------------------------------- |
| QUANTITY | Integer of the current gas price in peb. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x5d21dba00" // 25,000,000,000 peb = 25 Gpeb
}
```

