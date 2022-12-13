# SCNの起動/停止 <a id="starting-stopping-scn"></a>

インストールタイプに応じて、以下の `systemctl`  または `kscnd` コマンドで Klaytn サービスを開始/停止できます。

**開始**

```bash
## rpmディストリビューションからインストールした場合 
$ systemctl start kscnd.service

## linuxアーカイブを使用してインストールした場合
$ kscnd start

```

**停止する**

```bash
## rpm ディストリビューションからインストールされた場合 
$ systemctl stop kscnd.service

## linux archを使用してインストールされた場合
$ kscnd stop

```

**ステータス**

```bash
## rpmディストリビューションからインストールされた場合 
$ systemctl status kscnd.service

## linuxアーカイブを使用してインストールされた場合
$ kscnd status

```


