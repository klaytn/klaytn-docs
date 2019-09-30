# Installation Guide

This chapter explains the **Service Chain Node \(SCN\)** installation. You need an Endpoint Node \(EN\) that connects to the Main Chain as well. For the EN installation, read the [EN Installation Guide](../../../endpoint-node/installation-guide/).

## Linux Archive Distribution

The archive file consists of the executable binary and the configuration file structured as follows.

```text
- bin
  |- kscn
  |- kscnd
- conf
  |- kscnd.conf
```

| File Name       | File Description                  |
|:--------------- |:--------------------------------- |
| bin/kscn        | SCN executable file               |
| bin/kscnd       | SCN start/termination script file |
| conf/kscnd.conf | SCN configuration file            |

### Installation

The installation is the uncompression of the downloaded package.

```text
$ tar zxf kscn-vX.X.X-XXXXX-amd64.tar.gz
```

## RPM Distribution \(RHEL/CentOS/Fedora\) <a id="rpm-rhel-centos-fedora"></a>

### Installation

You can install the downloaded RPM file with the following `yum` command.

```text
$ yum install kscnd-vX.X.X.el7.x86_64.rpm
```

### Installed Location <a id="scn-configuration"></a>

The Klaytn Linux package consists of the executable binary and the configuration file structured as follows.

| File Name  | Location                   |
|:---------- |:-------------------------- |
| kscn       | /usr/bin/kscn              |
| kscnd.conf | /etc/kscnd/conf/kscnd.conf |


