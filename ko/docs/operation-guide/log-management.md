# Log operation

## Configure Log Rotation

```bash
export LOG_DIR=$(cat /etc/k*nd/conf/k*nd.conf | grep LOG_DIR | cut -d '=' -f 2)
cat <<EOF > /etc/logrotate.d/klaytn
$LOG_DIR/*.out {
    daily
    copytruncate
    compress
    rotate 7
    dateext
    create 0644 root root
}
EOF
```

## Normal Log Status

| 타입                                          | Message                                                                                                            | 설명                                                                                                                                                                                                                                                                                                                                |     |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| 에러                                          | FastWebsocketHandler fail to upgrade message                                                                       | Version issue of WebSocket connection                                                                                                                                                                                                                                                                                             | low |
| 에러                                          | invalid index of the proposer                                                                                      | The error that occurs when EN receives transactions from CN                                                                                                                                                                                                                                                                       | low |
| WARN                                        | ProtocolManager failed to read msg                                                                                 |                                                                                                                                                                                                                                                                                                                                   | low |
| WARN                                        | Failed doConnTypeHandshake                                                                                         |                                                                                                                                                                                                                                                                                                                                   | low |
| ERRORErro                                   | Protocol istanbul/64 failed                                                                                        | Peer disconnected                                                                                                                                                                                                                                                                                                                 | low |
| 에러                                          | Fasthttp Err                                                                                                       | Error when serving connection: read timeout with nothing read                                                                                                                                                                                                                                                                     | low |
| 에러                                          | Fasthttp Err                                                                                                       | Error when serving connection: error when reading request headers: cannot find http request method in "\x16…                                                                                                                                                                                                                     | low |
| Warn                                        | hash=b1b26c…6b220a err="insufficient balance for transfer"                                                         | This log occurs when the transaction processed (usually mining) cannot be executed due to insufficient balance in the "from account”(Theoretically, it occurs when the balance was sufficient at the time when the transaction was created and entered the txpool, but there was no balance at the time of the actual execution.) | low |
| ERROR                                       | ERROR\[06/06,23:23:46 Z] \[7] decode anchor payload err="rlp: expected input list for types.AnchoringDataLegacy" | Any type of value may be included in the data field of Anchoring tx. However, an error log is the output to the node when an incorrect type of value is entered                                                                                                                                                                   |     |
| Proposer : `Successfully wrote mined block` |                                                                                                                    |                                                                                                                                                                                                                                                                                                                                   |     |

Non Proposer `Inserted a new block`

## Log Level Change (0\~5)

Go to Klaytn Console

```
#default Value
> debug.verbosity(3)
# hight detail logs Value
> debug.verbosity(5)
# No Logs Value
> debug.verbosity(0)

# Default Value for Blockchain log
> debug.vmodule("blockchain=3")
# High detail Value for Blockchain Log
> debug.vmodule("blockchain=5")

```
