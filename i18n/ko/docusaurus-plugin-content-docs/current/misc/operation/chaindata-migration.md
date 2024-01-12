# Migrate Chaindata

<aside>
💡 PN 및 EN 노드(CN 제외)에 대해서만 마이그레이션 실행

</aside>

## 이 작업 전에 알아두어야 할 사항 <a id="things-to-know-before-this-job"></a>

- m6i.8xlarge 사양(32코어, 128GB 메모리) 이상 필요
- 전체 진행에 7일 소요(마이그레이션은 2부로 나누어 진행)
  - 1부 - 새 디렉터리로 DB 마이그레이션 (상태 마이그레이션 완료 메시지 표시)
  - 2부 - 새 디렉터리에 신규 블록 생성 (이후 기존 디렉터리는 삭제됨)
- 500GB의 여유 공간이 있어야 합니다.

## 클레이튼 콘솔로 이동하기

```bash
$ kpn attach klay.ipc

#start chain data Migration
> admin.startStateMigration()
null

# Check Status
> admin.stateMigrationStatus

#stop Migration
> admin.stopStateMigration()

```
