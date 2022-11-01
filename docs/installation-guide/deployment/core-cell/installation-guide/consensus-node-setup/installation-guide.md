# Installation Guide <a id="installation-guide"></a>

You can download the latest version of the `kcn`  on [Download](../download.md) page.

## Linux Archive Distribution <a id="linux-archive-distribution"></a>

The archive file consists of the executable binary and the configuration file structured as follows.

**Note**: Do NOT alter the file structure or file name. If you change it, the node may not function correctly.

```text
- bin
  |- kcn
  |- kcnd
- conf
  |- kcnd.conf
```

| File Name | File Description |
| :--- | :--- |
| bin/kcn | CN executable file |
| bin/kcnd | CN start/termination script file |
| conf/kcnd.conf | CN configuration file |

### Installation <a id="installation"></a>

The installation is the uncompression of the downloaded package where you want to install the package.

```bash
$ tar zxf kcn-vX.X.X-linux-amd64.tar.gz
```

Or,

```bash
$ tar zxf kcn-baobab-vX.X.X-linux-amd64.tar.gz
```

**Note**: it is recommended that the uncompressed directory `kcn-linux-amd64/bin` path should be added to the environment variable `$PATH` to run the `kcn` and `kcnd` globally. As an example,

```bash
$ export PATH=$PATH:~/downloaded/path/kcn-linux-amd64/bin
```

The other sections assume that the path is added to the variable.

## RPM Distribution \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

### Install downloaded RPM <a id="install-downloaded-rpm"></a>

You can install the downloaded RPM file with the following `yum` command.

```bash
$ yum install kcnd-vX.X.X.el7.x86_64.rpm
```

Or,

```bash
$ yum install kcnd-baobab-vX.X.X.el7.x86_64.rpm
```

### Install from Klaytn Yum Repo <a id="install-from-klaytn-yum-repo"></a>

Alternatively, you can install `kcnd` from the Klaytn Yum repo, run:

```bash
$ sudo curl -o /etc/yum.repos.d/klaytn.repo https://packages.klaytn.net/config/rhel/7/prod.repo && sudo yum install kcnd
```

### Installed Location <a id="installed-location"></a>

The installed files are located as follows.

| File Name | Location |
| :--- | :--- |
| kcn | /usr/bin/kcn |
| kcnd.conf | /etc/kcnd/conf/kcnd.conf |



