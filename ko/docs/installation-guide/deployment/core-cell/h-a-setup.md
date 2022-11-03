# H/A 설정 <a id="h-a-setup"></a>

코어 셀을 효과적으로 운영하려면, 높은 가용성을 위한 CN 구성이 중요합니다. 권장되는 높은 가용성을 가지는 구성은 코어 셀이 물리적 인프라에 배포되었는지 클라우드 인프라에 배포되는지에 따라 결정됩니다.

## Active-Standby \(베어메탈에 권장\) <a id="active-standby-recommended-for-bare-metal"></a>

이 환경설정에서는 두 개의 CN 노드가 액티브-스탠바이 설정으로 설치됩니다. 정상 작동 중에 active 노드는 블록 생성에 참여하는 반면, standby는 네트워크의 체인데이터만 동기화합니다. 이 환경설정은 active 노드에서 장애가 발생하는 경우에도 standby CN 노드가 새로운 체인데이터 사본을 가지고 있도록 합니다.

### 설정 <a id="setup"></a>

1. active CN의 `nodekey`의 백업 생성하기.
2. standby CN 설치하기. 구성은 다음을 제외하고 active CN과 동일합니다:
   * standby는 다른 `nodekey`를 사용해야 합니다.
   * PN의 주소를 `$DATA_DIR/static-nodes.json`에 추가하세요.

### 장애 조치 <a id="failover"></a>

1. standby CN 중지: `sudo systemctl stop kcnd`
2. standby의 `nodekey`를 장애가 발생한 active CN의 `nodekey`로 대체하세요.
3. active CN의 IP 주소를 standby CN에 재지정하세요.
4. standby CN을 시작하고 네트워크와 동기화되어 있는지 확인하세요: `sudo systemctl start kcnd`

## 머신 이미지 & 스냅샷 \(클라우드에 권장\) <a id="machine-image-snapshot-recommended-for-cloud"></a>

클라우드 인프라를 통해 운영자는 장애가 발생한 노드를 훨씬 빠르게 교체할 수 있으므로, 두 번째 standby CN을 운영할 필요가 없습니다. 대신 새로운 CN이 신속하게 공급되고 업데이트된 체인데이터 사본을 제공받는 것이 보장되는 것으로 충분합니다.

정확한 용어 및 절차는 클라우드 환경에 따라 다를 수 있습니다. 아래 절차는 AWS\(특히 EC2 및 EBS\)를 기반으로 하지만, 다른 클라우드 플랫폼에 맞게 조정할 수 있습니다.

### 설정 <a id="setup"></a>

1. active CN의 `nodekey`의 백업 생성하기.
2. CN 구성 또는 소프트웨어가 업데이트될 때마다 머신 이미지를 생성하세요\(예: AMI\). 이 이미지에 `DATA_DIR`을 담은 볼륨을 포함하지 마세요 - 이는 별도로 얻을 수 있습니다.

### 장애 조치 <a id="failover"></a>

CC의 PN 노드 중 하나를 사용하여 체인데이터 스냅샷을 얻으세요:

1. PN 노드에 연결하고 kpnd를 중지하세요: `sudo systemctl stop kpnd `. 데이터 일관성을 보장하기 위해 kpnd를 먼저 중지하는 것이 중요합니다.
2. AWS 콘솔을 사용하여 PN의 `DATA_DIR`이 포함된 볼륨의 스냅샷을 생성하세요.
3. kpnd를 중지하세요: `sudo systemctl stop kpnd`

기본 CN 이미지 및 체인데이터 이미지를 사용하여 새 CN을 생성하세요.

1. CN 이미지를 사용하여(\위의 "설정"에서 생성한) 인스턴스를 만듭니다.
2. PN의 `$DATA_DIR` 스냅샷에서 생성한 볼륨을 연결하세요.
3. `$DATA_DIR/klay/chaindata`를 제외한 볼륨의 모든 파일을 제거하세요. `kcnd.conf`에 설정된 `DATA_DIR`이 체인데이터를 포함하는 디렉토리와 일치하는지 확인하세요. 이름이 다른 경우 디렉토리 이름을 바꿔야 할 수도 있습니다.
4. 장애가 발생한 CN의 `nodekey`를 `$DATA_DIR/klay/nodekey`에 복사하세요.
5. 장애가 발생한 CN의 IP 주소를 대체재로 재지정하세요.
6. kcnd를 시작하세요: `sudo systemctl start kcnd`
7. CN이 네트워크와 동기화되어 있는지 확인하세요.

## 추가 고려 사항 <a id="additional-considerations"></a>

장애가 발생한 CN의 공용 IP를 대체 CN에 재할당하면 대체 CN이 다른 CN에 즉시 연결될 수 있습니다. IP가 변경되면 다른 모든 CCO가 방화벽 구성을 업데이트할 때까지 새 CN을 네트워크에 연결할 수 없습니다.

