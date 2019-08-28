# VM Tracing Options

## Tracing Options

You may give trace API function a secondary optional argument, which specifies the options for this specific call. The possible options are:

- `disableStorage`: `BOOL`. Setting this to true will disable storage capture (default = false).
- `disableMemory`: `BOOL`. Setting this to true will disable memory capture (default = false).
- `disableStack`: `BOOL`. Setting this to true will disable stack capture (default = false).
- `timeout`: `STRING`. Overrides the default timeout of 5 seconds for JavaScript-based tracing calls. Valid values are described [here](https://golang.org/pkg/time/#ParseDuration).
- `tracer`: `STRING`. Setting this will enable JavaScript-based transaction tracing, described in the [next section](#javascript-based-tracing). If set, the previous four arguments will be ignored. The predefined tracers can also be used as the following table.

| Tracer Name    | Description                                                                                                                                                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4byteTracer    | 4byteTracer searches for 4byte-identifiers, and collects them for post-processing. It collects the methods identifiers along with the size of the supplied data, so a reversed signature can be matched against the size of the data. |
| callTracer     | callTracer is a full-blown transaction tracer that extracts and reports all the internal calls made by a transaction, along with any useful information.                                                                              |
| evmdisTracer   | evmdisTracer returns sufficient information from a trace to perform evmdis-style disassembly.                                                                                                                                         |
| noopTracer     | noopTracer is just the barebone boilerplate code required from a JavaScript object to be usable as a transaction tracer.                                                                                                              |
| opcountTracer  | opcountTracer is a sample tracer that just counts the number of instructions executed by the KLVM before the transaction terminated.                                                                                                  |
| prestateTracer | prestateTracer outputs sufficient information to create a local execution of the transaction from a custom assembled genesis block.                                                                                                   |
| revertTracer   | revertTracer outputs the error string of REVERT. If the execution is not reverted, it outputs an empty string.                                                                                                                        |


**Example**

Console

```javascript
> debug.traceTransaction("0x07f6057bc93aca52e53cdbfac9b9830f6a9cae2b3f48f0b47e4cb54959143d09", {tracer: "callTracer"})
{
  from: "0xb0945862f63b832849a5f20b19e9f8188eb2230a",
  gas: "0xd99d0",
  gasUsed: "0x22002",
  input: "0x608060405234801561001057600080fd5b5060405161037a38038061037a83398101806040528101908080518201929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060019080519060200190610089929190610090565b5050610135565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100d157805160ff19168380011785556100ff565b828001600101855582156100ff579182015b828111156100fe5782518255916020019190600101906100e3565b5b50905061010c9190610110565b5090565b61013291905b8082111561012e576000816000905550600101610116565b5090565b90565b610236806101446000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610051578063cfae321714610068575b600080fd5b34801561005d57600080fd5b506100666100f8565b005b34801561007457600080fd5b5061007d610168565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100bd5780820151818401526020810190506100a2565b50505050905090810190601f1680156100ea5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610166573373ffffffffffffffffffffffffffffffffffffffff16ff5b565b606060018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102005780601f106101d557610100808354040283529160200191610200565b820191906000526020600020905b8154815290600101906020018083116101e357829003601f168201915b50505050509050905600a165627a7a72305820f4e74ca2266a24aabd6a8ee6c4e54ad49014e2faa152e49e7f9d927c932c72870029",
  output: "0x60806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610051578063cfae321714610068575b600080fd5b34801561005d57600080fd5b506100666100f8565b005b34801561007457600080fd5b5061007d610168565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100bd5780820151818401526020810190506100a2565b50505050905090810190601f1680156100ea5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610166573373ffffffffffffffffffffffffffffffffffffffff16ff5b565b606060018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102005780601f106101d557610100808354040283529160200191610200565b820191906000526020600020905b8154815290600101906020018083116101e357829003601f168201915b50505050509050905600a165627a7a72305820f4e74ca2266a24aabd6a8ee6c4e54ad49014e2faa152e49e7f9d927c932c72870029",
  time: "2.507969ms",
  to: "0x98cf8b777dab0137b47a7fdaad1378ec93a7b80b",
  type: "CREATE",
  value: "0x0"
}
> debug.traceTransaction("0xbae8bd56daa6a3f1bba16854d14e37f265e76976c960ac57c4c7b56a78729e53", {tracer:'revertTracer'})
"reverted due to XXX"
```

HTTP RPC

```shell
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_traceTransaction","params":["0x07f6057bc93aca52e53cdbfac9b9830f6a9cae2b3f48f0b47e4cb54959143d09", {"tracer": "callTracer"}],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":{"type":"CREATE","from":"0xb0945862f63b832849a5f20b19e9f8188eb2230a","to":"0x98cf8b777dab0137b47a7fdaad1378ec93a7b80b","value":"0x0","gas":"0xd99d0","gasUsed":"0x22002","input":"0x608060405234801561001057600080fd5b5060405161037a38038061037a83398101806040528101908080518201929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060019080519060200190610089929190610090565b5050610135565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100d157805160ff19168380011785556100ff565b828001600101855582156100ff579182015b828111156100fe5782518255916020019190600101906100e3565b5b50905061010c9190610110565b5090565b61013291905b8082111561012e576000816000905550600101610116565b5090565b90565b610236806101446000396000f30060806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610051578063cfae321714610068575b600080fd5b34801561005d57600080fd5b506100666100f8565b005b34801561007457600080fd5b5061007d610168565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100bd5780820151818401526020810190506100a2565b50505050905090810190601f1680156100ea5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610166573373ffffffffffffffffffffffffffffffffffffffff16ff5b565b606060018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102005780601f106101d557610100808354040283529160200191610200565b820191906000526020600020905b8154815290600101906020018083116101e357829003601f168201915b50505050509050905600a165627a7a72305820f4e74ca2266a24aabd6a8ee6c4e54ad49014e2faa152e49e7f9d927c932c72870029","output":"0x60806040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610051578063cfae321714610068575b600080fd5b34801561005d57600080fd5b506100666100f8565b005b34801561007457600080fd5b5061007d610168565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100bd5780820151818401526020810190506100a2565b50505050905090810190601f1680156100ea5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610166573373ffffffffffffffffffffffffffffffffffffffff16ff5b565b606060018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102005780601f106101d557610100808354040283529160200191610200565b820191906000526020600020905b8154815290600101906020018083116101e357829003601f168201915b50505050509050905600a165627a7a72305820f4e74ca2266a24aabd6a8ee6c4e54ad49014e2faa152e49e7f9d927c932c72870029","time":"2.510754ms"}}

curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"debug_traceTransaction","params":["0xbae8bd56daa6a3f1bba16854d14e37f265e76976c960ac57c4c7b56a78729e53", {"tracer": "revertTracer"}],"id":1}' http://localhost:8551
{"jsonrpc":"2.0","id":1,"result":"reverted due to XXX"}
```

## JavaScript-based Tracing

Specifying the `tracer` option in the second argument enables JavaScript-based tracing. In this mode, `tracer` is interpreted as a JavaScript expression that is expected to evaluate to an object with (at least) two methods, named `step` and `result`.

`step` is a function that takes two arguments, `log` and `db`, and is called for each step of the KLVM, or when an error occurs, as the specified transaction is traced.

`log` has the following fields:

| Field Name | Type           | Description                                                 |
| ---------- | -------------- | ----------------------------------------------------------- |
| `pc`       | Number         | The current program counter.                                |
| `op`       | Object         | An OpCode object representing the current opcode.           |
| `gas`      | Number         | The amount of gas remaining.                                |
| `gasPrice` | Number         | The cost in peb of each unit of gas.                        |
| `memory`   | Object         | A structure representing the contract's memory space.       |
| `stack`    | array[big.Int] | The KLVM execution stack.                                   |
| `depth`    | Number         | The execution depth.                                        |
| `account`  | String         | The address of the account executing the current operation. |
| `err`      | String         | If an error occurred, information about the error.          |


If `err` is non-null, all other fields should be ignored.

For efficiency, the same `log` object is reused on each execution step, updated with current values; make sure to copy values you want to preserve beyond the current call. For instance, this step function will not work:

```javascript
function(log) {
  this.logs.append(log);
}
```

But this step function will:

```javascript
function(log) {
  this.logs.append({gas: log.gas, pc: log.pc, ...});
}
```

`log.op` has the following methods:

| Method Name  | Description                                      |
| ------------ | ------------------------------------------------ |
| `isPush()`   | Returns true if the opcode is a `PUSHn`.         |
| `toString()` | Returns the string representation of the opcode. |
| `toNumber()` | Returns the opcode's number.                     |


`log.memory` has the following methods:

| Method Name          | Description                                              |
| -------------------- | -------------------------------------------------------- |
| `slice(start, stop)` | Returns the specified segment of memory as a byte slice. |
| `length()`           | Returns the length of the memory.                        |


`log.stack` has the following methods:

| Method Name | Description                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------- |
| `peek(idx)` | Returns the idx-th element from the top of the stack (0 is the topmost element) as a `big.Int`. |
| `length()`  | Returns the number of elements in the stack.                                                    |


`db` has the following methods:

| Method Name               | Description                                                               |
| ------------------------- | ------------------------------------------------------------------------- |
| `getBalance(address)`     | Returns a `big.Int` with the specified account's balance.                 |
| `getNonce(address)`       | Returns a Number with the specified account's nonce.                      |
| `getCode(address)`        | Returns a byte slice with the code for the specified account.             |
| `getState(address, hash)` | Returns the state value for the specified account and the specified hash. |
| `exists(address)`         | Returns true if the specified address exists.                             |


The second function, `result`, takes no arguments, and is expected to return a JSON-serializable value to return to the RPC caller.

If the `step` function throws an exception or executes an illegal operation at any point, it will not be called on any further VM steps, and the error will be returned to the caller.

Note that several values are Golang `big.Int` objects, not JavaScript numbers or JS bigints. As such, they have the same interface as described in the godocs. Their default serialization to JSON is as a Javascript number; to serialize large numbers accurately call `.String()` on them. For convenience, `big.NewInt(x)` is provided, and will convert a uint to a Golang `big.Int`.

As an usage example below, it returns the top element of the stack at each CALL opcode only:

```javascript
debug.traceTransaction(txhash, {tracer: '{data: [], step: function(log) { if(log.op.toString() == "CALL") this.data.push(log.stack.peek(0)); }, result: function() { return this.data; }}'});
```