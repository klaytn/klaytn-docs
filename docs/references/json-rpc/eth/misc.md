# Miscellaneous

## eth_hashrate <a id="eth_hashrate"></a>

Returns the number of hashes per second that the node is mining with.

Please note that it always return `0x0` because there is no PoW mechanism in Klaytn.

**Parameters**

None

**Return Value**

| Type     | Description                      |
|----------|----------------------------------|
| QUANTITY | The number of hashes per second. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": "0x0"
}
```

## eth_getHashrate <a id="eth_gethashrate"></a>

Returns the number of hashes per second that the node is mining with.

Please note that it always return `0` because there is no PoW mechanism in Klaytn.

**Parameters**

None

**Return Value**

| Type     | Description                      |
|----------|----------------------------------|
| QUANTITY | The number of hashes per second. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getHashrate","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": 0
}
```

## eth_getWork <a id="eth_getwork"></a>

Returns the hash of the current block, the seedHash, and the boundary condition to be met ("target").

Please note that it always return `errNoMiningWork` because there is no PoW mechanism in Klaytn.

**Parameters**

None

**Return Value**

| Type                  | Description                                                                                                                   |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Array of 32-byte DATA | List of current block header pow-hash, the seed hash used for the DAG, the boundary condition ("target"), 2^256 / difficulty. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_getWork","params":[],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "error": {
    "code": -32000,
    "message": "no mining work available yet"
  }
}
```


## eth_submitWork <a id="eth_submitwork"></a>

Used for submitting a proof-of-work solution.

Please note that it always return `false` because there is no PoW mechanism in Klaytn.

**Parameters**

| Type         | Description                      |
|--------------|----------------------------------|
| 8-byte DATA  | The nonce found (64 bits)        |
| 32-byte DATA | The header’s pow-hash (256 bits) |
| 32-byte DATA | The mix digest (256 bits)        |

**Return Value**

| Type      | Description                                                        |
|-----------|--------------------------------------------------------------------|
| Boolean   | Returns true if the provided solution is valid, otherwise false.   |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_submitWork","params":["0x0000000000000001", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": false
}
```


## eth_submitHashrate <a id="eth_submithashrate"></a>

Used for submitting mining hashrate.

Please note that it always return `false` because there is no PoW mechanism in Klaytn.

**Parameters**

| Name     | Type         | Description                                                      |
|----------|--------------|------------------------------------------------------------------|
| hashrate | 32-byte DATA | A hexadecimal string representation (32 bytes) of the hash rate. |
| id       | 32-byte DATA | A random hexadecimal(32 bytes) ID identifying the client.        |

**Return Value**

| Type      | Description                                                              |
|-----------|--------------------------------------------------------------------------|
| Boolean   | Returns true if submitting went through succesfully and false otherwise. |

**Example**

```shell
// Request
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_submithashrate","params":["0x5", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"],"id":1}' http://localhost:8551

// Result
{
  "jsonrpc": "2.0",
  "id":1,
  "result": false
}
```


