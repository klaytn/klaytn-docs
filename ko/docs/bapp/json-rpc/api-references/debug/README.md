---
description: 런타임 중 노드 상태와 블록체인 데이터를 검사하고 디버깅하는 API입니다.
---

# debug

`debug` namespace는 몇몇 비표준 RPC 메서드에 접근하여  런타임 인스펙션, 디버깅 및 특정 디버깅 플래그를 실시간으로 설정하도록 합니다.

## [Logging](logging.md) <a id="logging"></a>

* [debug\_backtraceAt](logging.md#debug_backtraceat)
* [debug\_setVMLogTarget](logging.md#debug_setvmlogtarget)
* [debug\_verbosity](logging.md#debug_verbosity)
* [debug\_vmodule](logging.md#debug_vmodule)

## [Profiling](profile.md) <a id="profiling"></a>

* [debug\_blockProfile](profile.md#debug_blockprofile)
* [debug\_cpuProfile](profile.md#debug_cpuprofile)
* [debug\_isPProfRunning](profile.md#debug_ispprofrunning)
* [debug\_setBlockProfileRate](profile.md#debug_setblockprofilerate)
* [debug\_startCPUProfile](profile.md#debug_startcpuprofile)
* [debug\_stopCPUProfile](profile.md#debug_stopcpuprofile)
* [debug\_startPProf](profile.md#debug_startpprof)
* [debug\_stopPProf](profile.md#debug_stoppprof)
* [debug\_writeBlockProfile](profile.md#debug_writeblockprofile)
* [debug\_writeMemProfile](profile.md#debug_writememprofile)

## [Runtime Tracing](go_trace.md) <a id="runtime-tracing"></a>

* [debug\_goTrace](go_trace.md#debug_gotrace)
* [debug\_startGoTrace](go_trace.md#debug_startgotrace)
* [debug\_stopGoTrace](go_trace.md#debug_stopgotrace)

## [Runtime Debugging](runtime.md) <a id="runtime-debugging"></a>

* [debug\_freeOSMemory](runtime.md#debug_freeosmemory)
* [debug\_gcStats](runtime.md#debug_gcstats)
* [debug\_memStats](runtime.md#debug_memstats)
* [debug\_metrics](runtime.md#debug_metrics)
* [debug\_setGCPercent](runtime.md#debug_setgcpercent)
* [debug\_stacks](runtime.md#debug_stacks)

## [VM Tracing](tracing.md) <a id="vm-tracing"></a>

* [debug\_traceBadBlock](tracing.md#debug_tracebadblock)
* [debug\_traceBlock](tracing.md#debug_traceblock)
* [debug\_traceBlockByHash](tracing.md#debug_traceblockbyhash)
* [debug\_traceBlockByNumber](tracing.md#debug_traceblockbynumber)
* [debug\_traceBlockFromFile](tracing.md#debug_traceblockfromfile)
* [debug\_traceTransaction](tracing.md#debug_tracetransaction)
* [추적 옵션](tracing.md#tracing-options)
* [자바스크립트 기반 추적](tracing.md#javascript-based-tracing)

## [VM Standard Tracing](standard_tracing.md) <a id="vm-standard-tracing"></a>

* [debug\_standardTraceBadBlockToFile](standard_tracing.md#debug_standardtracebadblocktofile)
* [debug\_standardTraceBlockToFile](standard_tracing.md#debug_standardtraceblocktofile)
* [표준 추적 옵션](standard_tracing.md#standard-tracing-options)

## [Blockchain Inspection](blockchain.md) <a id="blockchain-inspection"></a>

* [debug\_dumpBlock](blockchain.md#debug_dumpblock)
* [debug\_getBlockRlp](blockchain.md#debug_getblockrlp)
* [debug\_getModifiedAccountsByHash](blockchain.md#debug_getmodifiedaccountsbyhash)
* [debug\_getModifiedAccountsByNumber](blockchain.md#debug_getmodifiedaccountsbynumber)
* [debug\_preimage](blockchain.md#debug_preimage)
* [debug\_printBlock](blockchain.md#debug_printblock)
* [debug\_setHead](blockchain.md#debug_sethead)

