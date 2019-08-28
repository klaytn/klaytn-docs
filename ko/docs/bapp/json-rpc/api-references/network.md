# Network API

The `net` namespace provides functions related to the Klaytn networks.

## net_networkID

Returns the network identifier (network ID).

**Parameters**

None

**Return Value**

| Type     | Description                                                                                                     |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| QUANTITY | The integer of the network identifier.  
- `"1000"`: Klaytn Aspen testnet.  
- `"1001"`: Klaytn Baobab testnet. |


**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_networkID","params":[],"id":67}' http://localhost:8551

// Result
{
    "jsonrpc":"2.0",
    "id":67,
    "result":"1001"
}
```

## net_listening

Returns `true` if the client is actively listening for network connections.

**Parameters**

None

**Return Value**

| Type    | Description                               |
| ------- | ----------------------------------------- |
| Boolean | `true` when listening, otherwise `false`. |


**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}' http://localhost:8551

// Result
{
    "id":67,
    "jsonrpc":"2.0",
    "result":true
}
```

## net_peerCount

Returns the number of peers currently connected to the client.

**Parameters**

None

**Return Value**

| Type     | Description                               |
| -------- | ----------------------------------------- |
| QUANTITY | Integer of the number of connected peers. |


**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}' http://localhost:8551

// Result
{
    "id":74,
    "jsonrpc": "2.0",
    "result": "0x3" // 2
}
```

## net_peerCountByType

Returns the number of connected nodes by type and the total number of connected nodes with key/value pairs.

**Parameters**

None

**Return Value**

| Type        | Description                                                                           |
| ----------- | ------------------------------------------------------------------------------------- |
| JSON string | The number of connected peers by type as well as the total number of connected peers. |


**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_peerCountByType","params":[],"id":74}' http://localhost:8551

// Result
{
    "id":74,
    "jsonrpc": "2.0",
    "result": {"en":3,"pn":2,"total":5}
}
```