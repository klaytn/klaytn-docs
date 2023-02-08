# Log operation

## ログの回転を設定

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
