# アカウントの作成 <a id="creating-accounts"></a>

## 新規アカウントの作成 <a id="creating-a-new-account"></a>

これにより、新しいアカウントが作成され、画面にアドレスが印刷されます。 データディレクトリの下にキーストアファイルが作成されます。

**Klaytn キーストアファイル**

アカウントを作成すると、キーストアファイルが作成されます。 keystore ファイルは、トランザクションに署名するために使用する固有の Klaytn 秘密鍵の暗号化されたバージョンです。 キーストアのファイル名には、次の形式があります。

* `UTC--<created_at UTC ISO8601>-<address hex>`

ディレクトリ全体または個々のキーストアファイルを Klaytn ノード間で転送しても安全です。 別のノードからキーを追加する場合、アカウントの順序が変わることに注意してください。 したがって、スクリプトやコードスニペット内のインデックスに依存しないようにしてください。

### ken <a id="ken"></a>

```bash
$ ken account new --datadir <DATADIR>
$ ken account new --password <passwordfile> --datadir <DATADIR>
$ ken account new --password <(echo $mypassword) --datadir <DATADIR>
```

**`警告`**: パスワードファイルの使用はテストのみに使用されることに注意してください; パスワードをファイルに保存したり、他の方法で公開するのは悪い考えだ パスワードファイルでパスワードフラグを使用する場合 ファイルが読めないことを確認するのが最善だ 君以外の誰にでも読めない 次のように達成しました：

```bash
$ touch /path/to/password
$ chmod 700 /path/to/password
$ cat > /path/to/password
ここにパスを入力します
^D
```

### JavaScript Console <a id="javascript-console"></a>

コンソールでは、次の関数を呼び出してアカウントを作成できます。

```javascript
> personal.newAccount("passphrase")
```

アカウントは暗号化されたフォーマットで保存されます。 将来あなたのアカウントをロック解除するには、 **** このパスフレーズを覚えておいてください。

## アカウントのインポート <a id="importing-an-account"></a>

キーファイルを使用してアカウントをインポートできます。 鍵ファイルには、暗号化されていない秘密鍵が hex にエンコードされた正規の EC raw バイトとして含まれていると仮定されます。 簡単に言うと、それは主要な `00x`を持たないプレーンテキストの秘密鍵です。

指定されたキーファイルから暗号化されていない秘密鍵をインポートし、新しいアカウントを作成します。 データディレクトリの下にキーストアファイルを生成し、コンソールのアドレスを出力します。 今後アカウントのロックを解除するにはパスフレーズを覚えておく必要があります。

**注**: キーストアのファイルを別の Klaytn インスタンスに直接コピーできる場合、このインポート/エクスポートの仕組みは必要ありません。

### ken <a id="ken-1"></a>

```bash
$ ken account import <keyfile> --datadir <DATADIR>
$ ken account import --password <passwordfile> <keyfile> --datadir <DATADIR>
```

### JavaScript Console <a id="javascript-console-1"></a>

```bash
> personal.importRawKey('{private key}', 'mypassword')
"0xfa415bb3e6231f488ff39eb2897db0ef3636dd32"<unk>

// Klaytnウォレットキーを使用する
> personal.importRawKey('{private key}0x000x{address}', 'mypassword')
"0xfa415b3e6231f488ff39eb2897db0ef3636dd32"
```



