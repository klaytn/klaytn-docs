# Log operation

## ログの回転を設定
You can enable the log rotation by setting the `--log.rotate` flag, and configure the log rotation settings by the following flags.
- `--log.rotate`: By setting this flag, it enables the log rotation and applies the other log rotation options
- `--log.maxsize`: Specifies the file size in MB that triggers backup file creation
- `--log.maxbackups`: Determines the maximum number of backup files that can be stored. Once this limit is reached, older logs will be deleted.
- `--log.maxage`: Represents the maximum number of days to retain a log file. For example, if set to 30, a backup file will be deleted after 30 days.
- `--log.compress`: By setting this flag, it compresses the backup logs in gz format.

Example
```
./bin/ken ... --log.rotate --log.maxsize 100 --log.maxbackups 10 --log.maxage 30 --log.compress
```
You can also enable and configure the log rotation by setting following options in configuration file (e.g., `kend.conf`).
```
# log rotation related options
LOG_ROTATE=1 # setting 1 to enable the log rotation related options
LOG_MAXSIZE=100 # the unit is MB
LOG_MAXBACKUPS=10
LOG_MAXAGE=30 # maximum number of days to retain a log file
LOG_COMPRESS=1 # setting 1 to compress the backup logs in gz format
```
It is recommended to download and use the package which version is v1.11.0 or higher. You can download it in Binaries section of the release note(e.g., [v1.11.0 release note](https://github.com/klaytn/klaytn/releases/tag/v1.11.0)). Make sure next three files are v1.11.0 or higher: configuration file, daemon, and binary. Otherwise, it won't work.

## 通常のログステータス

| Type                      | メッセージ                                                                                  | Description                                                                                                                                      |     |
| ------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --- |
| Error                     | FastWebsocketHandler はメッセージのアップグレードに失敗しました                                             | Version issue of WebSocket connection                                                                                                            | 低い  |
| Error                     | 提案者のインデックスが不正です                                                                        | ENがCNからトランザクションを受信したときに発生するエラー                                                                                                                   | low |
| WARN                      | ProtocolManager は msg の読み込みに失敗しました                                                     |                                                                                                                                                  | low |
| WARN                      | Failed doConnTypeHandshake                                                             |                                                                                                                                                  | low |
| エラー                       | プロトコルistanbul/64 が失敗しました                                                               | ピアが接続されていません                                                                                                                                     | low |
| Error                     | Fasthttp Err                                                                           | 接続を提供中にエラーが発生しました: 読み込みタイムアウトです                                                                                                                  | low |
| Error                     | Fasthttp Err                                                                           | 接続時にエラーが発生しました: リクエストヘッダの読み取り時にエラー: "\x16… で http リクエストメソッドが見つかりません                                                                             | low |
| 警告                        | ハッシュ=b1b26c…6b220a err="送金に不十分な残高"                                                     | このログは、"from account"(理論的には、アカウントの残高が不足しているため、処理されたトランザクション(通常はマイニング)が実行できない場合に発生します。 取引が作成されtxpoolに入った時点で残高が十分だったときに発生します 実際の処刑時にはバランスがありませんでした」 | low |
| エラー                       | ERROR\[06/06/23:23:46 Z] \[7] デコードアンカーペイロードエラー="rlp: types.AnchoringDataLegacyの入力リスト | 任意のタイプの値は、アンカーtxのデータフィールドに含めることができます。 ただし、誤った値が入力されたときにエラーログがノードへ出力されます。                                                                         |     |
| 提案: `採掘したブロックを正常に書き込みました` |                                                                                        |                                                                                                                                                  |     |

非提案 `新しいブロックを挿入`

## ログレベルの変更 (0\~5)

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
