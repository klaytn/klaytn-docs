# ディスク管理 - Chaindata Change <a id="disk-management"></a>



<aside>
💡 このガイドは Amazon Linux 2 に基づいています

</aside>

## CNノード**移行 STEP**

### 新しいディスクを作成

1. Preparing new disk (3,500GB disk) or creating new path on the current disk (It must have 3,500GB available.)

<aside>
💡 新しいパスが `/var/kcnd2` であると仮定する

</aside>

#### Option 1 - New disk (more than 2500GB)

1. EC2にディスクを接続し、以下のコマンドを実行してください

```bash
$ lsblk
NAME          MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
nvme2n1       259:0    0  3500G  0 disk **# New Disk**
nvme1n1       259:0    0  4000G  0 disk /var/kcnd
nvme0n1       259:2    0    8G  0 disk
├─nvme0n1p1   259:3    0    8G  0 part /
└─nvme0n1p128 259:4    0    1M  0 part
```

2. 以下のプロセスに従ってマウントします。

```bash
$ sudo e2fsck -f /dev/nvme2n1
$ sudo mkfs -t ext4 /dev/nvme2n1
$ sudo mkdir /var/kcnd2
$ sudo mount /dev/nvme2n1 /var/kcnd2
$ sudo mkdir /var/kcnd2/data
$ sudo mkdir /var/kcnd2/log
```

#### オプション2 - 現在のディスク (非推奨)

1. 新しいフォルダを作成

```bash
$ sudo mkdir /var/kcnd2/data
$ sudo mkdir /var/kcnd2/log
```

### 最新のチェーンデータをダウンロード

新しいKlaytn Data DIRのデータにチェーン データをダウンロードします。 (詳細は[https://packages.klaytn.net/cypress/chaindata/](https://packages.klaytn.net/cypress/chaindata/) で確認できます。

1. 次のコマンドでダウンロード

```bash
# (Option 1: recommended) curl 
$ curl -o klaytn-cypress-chaindata-2021???????????.tar.gz "https://s3.ap-northeast-2.amazonaws.com/klaytn-chaindata/cypress/klaytn-cypress-chaindata-2021???????????.tar.gz"

# (Option 2) aws s3 command
$ aws s3 cp s3://klaytn-chaindata/cypress/klaytn-cypress-chaindata-2021???????????.tar.gz klaytn-cypress-chaindata-20211113011111.tar.gz 

# (Option 3) axel (need to install axel)
sudo amazon-linux-extras install epel -y
sudo yum install axel pigz
$ axel -n8 https://s3.ap-northeast-2.amazonaws.com/klaytn-chaindata/cypress/klaytn-cypress-chaindata-2021???????????.tar.gz
```

2. 解凍する

```bash
# (Option 1: recommended) tar
$ tar -xvf klaytn-cypress-chaindata-2021???????????.tar.gz

# (Option 2) pigz (need to isntall pigz)
$ tar -I pigz -xvf klaytn-cypress-chaindata-2021???????????.tar.gz
```



## DATA_DIR & LOG_DIR を設定できます

### Option 1 - Swap the old & new path

<aside>
🚨 TBD

</aside>

1. スワップ前に klaytn デーモンプロセスを停止する
    1. ***重要な*** ノードタイプがCNの場合、Klaytn評議会でCNノードを削除する

    💡 ENのパッケージは [CNのスタートアップ](../installation-guide/deployment/core-cell/installation-guide/consensus-node-setup/startup-the-cn.md)で入手できます。


2. 古いパスと新しいパスを入れ替え
    1. 新しいディスク

        ```bash
        umount /var/kcnd # old path
        umount /var/kcnd2 # new path
        mount /dev/nvme2n1 /var/kcnd
        ```
   💡 これらのコマンドは、適切な権限で実行する必要があります。

    2. 現在のディスク

        ```bash
        sudo mv /var/kcnd /var/kcnd_old # old_path
        sudo mv /var/kcnd2 /var/kcnd # new path
        ```

3. (オプション) 不要な場合は、古いパスを削除する

### Option 2 - Update DATA_DIR & LOG_DIR in klaytn config file

1. Klaytn DIRパスの変更
    - Option 1 - New disk
        - `fstab` の値を古いディスクから新しいディスクに変更する
    - オプション2 - 現在のディスク
        - DIR パスを `kcnd.conf` から変更する

## プロセスを再起動（またはインスタンスを再起動）

<aside>
💡 ディスクを追加するために再起動が必要な場合は、インスタンスを再起動します。

</aside>

1. ***IMPORTANT*** Remove CN node in Klaytn council if the node type is CN
2. プロセスを再起動するかインスタンスを再起動します