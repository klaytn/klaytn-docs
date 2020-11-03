# Installation Guide

You can download the latest version of the `kpn` on [Download](../download.md) page.

## Linux Archive Distribution <a id="linux-archive-distribution"></a>

The archive file consists of the executable binary and the configuration file structured as follows.

**Note**: Do NOT alter the file structure or file name. If you change it, the node may not function correctly.

```text
- bin
  |- kpn
  |- kpnd
- conf
  |- kpnd.conf
```

| File Name | File Description |
| :--- | :--- |
| bin/kpn | PN executable file |
| bin/kpnd | PN start/termination script file |
| conf/kpnd.conf | PN configuration file |

### Installation <a id="installation"></a>

The installation is the uncompression of the downloaded package where you want to install the package.

```bash
$ tar zxf kpn-vX.X.X-linux-amd64.tar.gz
```

Or,

```bash
$ tar zxf kpn-baobab-vX.X.X-linux-amd64.tar.gz
```

**Note**: it is recommended that the uncompressed directory `kpn-linux-amd64/bin` path should be added to the environment variable `$PATH` to run the `kpn` and `kpnd` globally. As an example,

```bash
$ export PATH=$PATH:~/downloaded/path/kpn-linux-amd64/bin
```

The other sections assume that the path is added to the variable.

## RPM Distribution \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

### Install downloaded RPM <a id="install-downloaded-rpm"></a>

You can install the downloaded RPM file with the following `yum` command.

```bash
$ yum install kpnd-vX.X.X.el7.x86_64.rpm
```

Or,

```bash
$ yum install kpnd-baobab-vX.X.X.el7.x86_64.rpm
```

### Install from Klaytn Yum Repo <a id="install-from-klaytn-yum-repo"></a>

Alternatively, you can install `kpnd` from the Klaytn Yum repo, run:

```bash
$ sudo curl -o /etc/yum.repos.d/klaytn.repo https://packages.klaytn.net/config/rhel/7/prod.repo && sudo yum install kpnd
```

### Installed Location <a id="installed-location"></a>

The installed files are located as follows.

| File Name | Location |
| :--- | :--- |
| kpn | /usr/bin/kpn |
| kpnd.conf | /etc/kpnd/conf/kpnd.conf |

