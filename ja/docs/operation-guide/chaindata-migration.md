# ディスク管理 - Chainda移行 <a id="disk-management-2"></a>


<aside>
💡 PNノードとENノード(CNではない)に対してのみ移行を実行します。

</aside>

## この仕事の前に知っておくべきこと <a id="things-to-know-before-this-job"></a>
- m5.8xlarges仕様(32コアと128GBメモリ)以上が必要です
- 完了までの7日間（移転は2つのパートに分かれています）
    - パート 1 - DB を新しいディレクトリに移行します (「状態の移行が完了しました」というメッセージが表示されます)
    - パート2 - 新しいディレクトリの新しいブロック生成(この後古いディレクトリは削除されます)
- 500GBの空き容量が必要です

## Klaytn コンソールへ移動

```bash
$ kpn attach klay.ipc

#start chain data Migration
> admin.startStateMigration()
null

# Check Status
> admin.stateMigrationStatus

#stop Migration
> admin.stopStateMigration()

```