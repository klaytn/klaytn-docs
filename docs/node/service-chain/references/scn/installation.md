# Installation

This chapter explains the **Service Chain Consensus Node \(SCN\)** installation.

## Linux Archive Distribution <a id="linux-archive-distribution"></a>

The archive file for Service Chain Consensus Node has the following directory layout.

| File Name | File Description |
| :--- | :--- |
| bin/kscn | SCN executable file |
| bin/kscnd | SCN start/termination script file |
| conf/kscnd.conf | SCN configuration file |

The archive file for homi binary has the following directory layout.

| File Name | File Description |
| :--- | :--- |
| bin/homi | HOMI executable file |

### Installation <a id="installation"></a>

The installation is the uncompression of the downloaded package.

```text
$ tar zxf kscn-vX.X.X-XXXXX-amd64.tar.gz
$ tar zxf homi-vX.X.X-XXXXX-amd64.tar.gz
```

## RPM Distribution \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

### Installation <a id="installation"></a>

You can install the downloaded RPM file with the following `yum` command.

```text
$ yum install kscnd-vX.X.X.el7.x86_64.rpm
$ yum install homi-vX.X.X.el7.x86_64.rpm
```

### Installed Location <a id="scn-configuration"></a>

The Klaytn Linux package consists of the executable binary and the configuration file structured as follows.

| File Name | Location |
| :--- | :--- |
| kscn | /usr/bin/kscn |
| kscnd.conf | /etc/kscnd/conf/kscnd.conf |
| homi | /usr/bin/homi |

