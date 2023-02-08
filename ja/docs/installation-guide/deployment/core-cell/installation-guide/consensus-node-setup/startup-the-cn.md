# Startup the CN <a id="startup-the-cn"></a>

## CN 開始/停止  <a id="cn-start-stop"></a>

以下の `systemctl` コマンドで Klaytn サービスを開始/停止できます。

**メモ**: root 権限が必要です。

**開始**

```bash
$ systemctl start kcnd.service

```

**停止する**

```bash
$ systemctl stop kcnd.service

```

**status**

```bash
$ systemctl status kcnd.service

```

## Troubleshooting <a id="troubleshooting"></a>

次のエラーに遭遇した場合

```bash
kcnd.service: ユニットが見つかりません。
```

systemdマネージャの設定を以下のコマンドで再読み込みしてください。

```bash
$ systemctl daemon-reload
```


