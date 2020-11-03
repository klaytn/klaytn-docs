# Installation Guide

You can download the latest version of the `ken` on [Download](download.md) page.

## Linux Archive Distribution <a id="linux-archive-distribution"></a>

The archive file consists of the executable binary and the configuration file structured as follows.

**Note**: Do NOT alter the file structure or file name. If you change it, the node may not function correctly.

```text
- bin
  |- ken
  |- kend
- conf
  |- kend.conf
```

| File Name | File Description |
| :--- | :--- |
| bin/ken | EN executable file |
| bin/kend | EN start/termination script file |
| conf/kend.conf | EN configuration file |

### Installation <a id="installation"></a>

The installation is the uncompression of the downloaded package where you want to install the package.

```text
$ tar zxf ken-vX.X.X-linux-amd64.tar.gz
```

Or,

```text
$ tar zxf ken-baobab-vX.X.X-linux-amd64.tar.gz
```

**Note**: it is recommended that the uncompressed directory `ken-linux-amd64/bin` path should be added to the environment variable `$PATH` to run the `ken` and `kend` globally. As an example,

```text
$ export PATH=$PATH:~/downloaded/path/ken-linux-amd64/bin
```

The other sections assume that the path is added to the variable.

## RPM Distribution \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

### Install downloaded RPM <a id="install-downloaded-rpm"></a>

You can install the downloaded RPM file with the following `yum` command.

```text
$ yum install kend-vX.X.X.el7.x86_64.rpm
```

Or,

```text
$ yum install kend-baobab-vX.X.X.el7.x86_64.rpm
```

### Install from Klaytn Yum Repo <a id="install-from-klaytn-yum-repo"></a>

Alternatively, you can install `kend` from the Klaytn Yum repo, run:

```text
$ sudo curl -o /etc/yum.repos.d/klaytn.repo https://packages.klaytn.net/config/rhel/7/prod.repo && sudo yum install kend
```

### Installed Location <a id="installed-location"></a>

The installed files are located as follows.

| File Name | Location |
| :--- | :--- |
| ken | /usr/bin/ken |
| kend.conf | /etc/kend/conf/kend.conf |

