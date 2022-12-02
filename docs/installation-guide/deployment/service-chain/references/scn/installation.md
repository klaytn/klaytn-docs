# Installation

This chapter explains the **Service Chain Consensus Node (SCN)** installation.

## Linux Archive Distribution <a href="#linux-archive-distribution" id="linux-archive-distribution"></a>

The archive file for Service Chain Consensus Node has the following directory layout.

| File Name       | File Description                  |
| --------------- | --------------------------------- |
| bin/kscn        | SCN executable file               |
| bin/kscnd       | SCN start/termination script file |
| conf/kscnd.conf | SCN configuration file            |

The archive file for homi binary has the following directory layout.

| File Name | File Description     |
| --------- | -------------------- |
| bin/homi  | HOMI executable file |

### Installation <a href="#installation" id="installation"></a>

The installation is the uncompression of the downloaded package.

```
$ tar zxf kscn-vX.X.X-XXXXX-amd64.tar.gz
$ tar zxf homi-vX.X.X-XXXXX-amd64.tar.gz
```

## RPM Distribution (RHEL/CentOS/Fedora) <a href="#rpm-rhel-centos-fedora" id="rpm-rhel-centos-fedora"></a>

### Installation <a href="#installation" id="installation"></a>

You can install the downloaded RPM file with the following `yum` command.

```
$ yum install kscnd-vX.X.X.el7.x86_64.rpm
$ yum install homi-vX.X.X.el7.x86_64.rpm
```

### Installed Location <a href="#scn-configuration" id="scn-configuration"></a>

The Klaytn Linux package consists of the executable binary and the configuration file structured as follows.

| File Name  | Location                   |
| ---------- | -------------------------- |
| kscn       | /usr/bin/kscn              |
| kscnd.conf | /etc/kscnd/conf/kscnd.conf |
| homi       | /usr/bin/homi              |
