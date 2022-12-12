---
description: >-
  APIs used to inspect and debug node state and blockchain data at run time.
---

# Namespace unsafedebug <a id="namespace-unsafedebug"></a>

The namespace `unsafedebug` gives you access to several non-standard RPC methods, which will allow you to inspect, debug and set certain debugging flags at run time.

**`WARNING`**: This namespace includes some unsafe APIs. Do not open this namespace over RPC. See [this link](../../installation-guide/deployment/endpoint-node/json-rpc-apis.md) to learn how to open a namespace over RPC.

## [Logging](./unsafedebug/logging.md) <a id="logging"></a>

- [unsafedebug_backtraceAt](./unsafedebug/logging.md#unsafedebug_backtraceat)
- [unsafedebug_setVMLogTarget](./unsafedebug/logging.md#unsafedebug_setvmlogtarget)
- [unsafedebug_verbosity](./unsafedebug/logging.md#unsafedebug_verbosity)
- [unsafedebug_verbosityByName](./unsafedebug/logging.md#unsafedebug_verbositybyname)
- [unsafedebug_verbosityByID](./unsafedebug/logging.md#unsafedebug_verbositybyid)
- [unsafedebug_vmodule](./unsafedebug/logging.md#unsafedebug_vmodule)


## [Profiling](./unsafedebug/profile.md) <a id="profiling"></a>

- [unsafedebug_blockProfile](./unsafedebug/profile.md#unsafedebug_blockprofile)
- [unsafedebug_cpuProfile](./unsafedebug/profile.md#unsafedebug_cpuprofile)
- [unsafedebug_mutexProfile](./unsafedebug/profile.md#unsafedebug_mutexprofile)
- [unsafedebug_isPProfRunning](./unsafedebug/profile.md#unsafedebug_ispprofrunning)
- [unsafedebug_setBlockProfileRate](./unsafedebug/profile.md#unsafedebug_setblockprofilerate)
- [unsafedebug_startCPUProfile](./unsafedebug/profile.md#unsafedebug_startcpuprofile)
- [unsafedebug_stopCPUProfile](./unsafedebug/profile.md#unsafedebug_stopcpuprofile)
- [unsafedebug_startPProf](./unsafedebug/profile.md#unsafedebug_startpprof)
- [unsafedebug_stopPProf](./unsafedebug/profile.md#unsafedebug_stoppprof)
- [unsafedebug_writeBlockProfile](./unsafedebug/profile.md#unsafedebug_writeblockprofile)
- [unsafedebug_writeMemProfile](./unsafedebug/profile.md#unsafedebug_writememprofile)
- [unsafedebug_writeMutexProfile](./unsafedebug/profile.md#unsafedebug_writemutexprofile)


## [Runtime Tracing](./unsafedebug/go_trace.md) <a id="runtime-tracing"></a>

- [unsafedebug_goTrace](./unsafedebug/go_trace.md#unsafedebug_gotrace)
- [unsafedebug_startGoTrace](./unsafedebug/go_trace.md#unsafedebug_startgotrace)
- [unsafedebug_stopGoTrace](./unsafedebug/go_trace.md#unsafedebug_stopgotrace)


## [Runtime Debugging](./unsafedebug/runtime.md) <a id="runtime-unsafedebugging"></a>

- [unsafedebug_freeOSMemory](./unsafedebug/runtime.md#unsafedebug_freeosmemory)
- [unsafedebug_gcStats](./unsafedebug/runtime.md#unsafedebug_gcstats)
- [unsafedebug_memStats](./unsafedebug/runtime.md#unsafedebug_memstats)
- [unsafedebug_metrics](./unsafedebug/runtime.md#unsafedebug_metrics)
- [unsafedebug_setGCPercent](./unsafedebug/runtime.md#unsafedebug_setgcpercent)
- [unsafedebug_stacks](./unsafedebug/runtime.md#unsafedebug_stacks)


## [VM Tracing](./unsafedebug/tracing.md) <a id="vm-tracing"></a>

- [unsafedebug_traceBadBlock](./unsafedebug/tracing.md#unsafedebug_tracebadblock)
- [unsafedebug_traceBlock](./unsafedebug/tracing.md#unsafedebug_traceblock)
- [unsafedebug_traceBlockByHash](./unsafedebug/tracing.md#unsafedebug_traceblockbyhash)
- [unsafedebug_traceBlockByNumber](./unsafedebug/tracing.md#unsafedebug_traceblockbynumber)
- [unsafedebug_traceBlockByNumberRange](./unsafedebug/tracing.md#unsafedebug_traceblockbynumberrange)
- [unsafedebug_traceBlockFromFile](./unsafedebug/tracing.md#unsafedebug_traceblockfromfile)
- [unsafedebug_traceTransaction](./unsafedebug/tracing.md#unsafedebug_tracetransaction)
- [unsafedebug_traceChain](./unsafedebug/tracing.md#unsafedebug_tracechain)
- [Tracing Options](./unsafedebug/tracing.md#tracing-options)
- [JavaScript-based Tracing](./unsafedebug/tracing.md#javascript-based-tracing)


## [VM Standard Tracing](./unsafedebug/standard_tracing.md) <a id="vm-standard-tracing"></a>

- [unsafedebug_standardTraceBadBlockToFile](./unsafedebug/standard_tracing.md#unsafedebug_standardtracebadblocktofile)
- [unsafedebug_standardTraceBlockToFile](./unsafedebug/standard_tracing.md#unsafedebug_standardtraceblocktofile)
- [Standard Tracing Options](./unsafedebug/standard_tracing.md#standard-tracing-options)


## [Blockchain Inspection](./unsafedebug/blockchain.md) <a id="blockchain-inspection"></a>

- [unsafedebug_preimage](./unsafedebug/blockchain.md#unsafedebug_preimage)
- [unsafedebug_printBlock](./unsafedebug/blockchain.md#unsafedebug_printblock)
- [unsafedebug_setHead](./unsafedebug/blockchain.md#unsafedebug_sethead)
- [unsafedebug_seedHash](./unsafedebug/blockchain.md#unsafedebug_seedhash)
- [unsafedebug_startWarmUp](./unsafedebug/blockchain.md#unsafedebug_startwarmup)
- [unsafedebug_startContractWarmUp](./unsafedebug/blockchain.md#unsafedebug_startcontractwarmup)
- [unsafedebug_stopWarmUp](./unsafedebug/blockchain.md#unsafedebug_stopwarmup)
- [unsafedebug_startCollectingTrieStats](./unsafedebug/blockchain.md#unsafedebug_startCollectingTrieStats)

