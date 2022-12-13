# Startup the PN <a id="startup-the-pn"></a>

## プッシュ通知の開始/停止  <a id="pn-start-stop"></a>

以下の `systemctl` コマンドで Klaytn サービスを開始/停止できます。

**メモ**: root 権限が必要です。

**開始**

```bash
$ systemctl start kpnd.service

```

**停止する**

```bash
$ systemctl stop kpnd.service

```

**ステータス**

```bash
$ systemctl status kpnd.service

```

## Troubleshooting <a id="troubleshooting"></a>

次のエラーに遭遇した場合

```bash
kpnd.serviceの開始に失敗しました: ユニットが見つかりません。
```

systemdマネージャの設定を以下のコマンドで再読み込みしてください。

```bash
$ systemctl daemon-reload
```


