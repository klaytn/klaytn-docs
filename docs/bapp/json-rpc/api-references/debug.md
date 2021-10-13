---
description: >-
  APIs used to inspect and debug node state and blockchain data at run time.
---

# Namespace debug <a id="namespace-debug"></a>

The namespace `debug` gives you access to several non-standard RPC methods, which will allow you to inspect, debug and set certain debugging flags at run time.


## [Logging](./debug/logging.md) <a id="logging"></a>

- [debug_backtraceAt](./debug/logging.md#debug_backtraceat)
- [debug_setVMLogTarget](./debug/logging.md#debug_setvmlogtarget)
- [debug_verbosity](./debug/logging.md#debug_verbosity)
- [debug_verbosityByName](./debug/logging.md#debug_verbositybyname)
- [debug_verbosityByID](./debug/logging.md#debug_verbositybyid)
- [debug_vmodule](./debug/logging.md#debug_vmodule)


## [Profiling](./debug/profile.md) <a id="profiling"></a>

- [debug_blockProfile](./debug/profile.md#debug_blockprofile)
- [debug_cpuProfile](./debug/profile.md#debug_cpuprofile)
- [debug_mutexProfile](./debug/profile.md#debug_mutexprofile)
- [debug_isPProfRunning](./debug/profile.md#debug_ispprofrunning)
- [debug_setBlockProfileRate](./debug/profile.md#debug_setblockprofilerate)
- [debug_startCPUProfile](./debug/profile.md#debug_startcpuprofile)
- [debug_stopCPUProfile](./debug/profile.md#debug_stopcpuprofile)
- [debug_startPProf](./debug/profile.md#debug_startpprof)
- [debug_stopPProf](./debug/profile.md#debug_stoppprof)
- [debug_writeBlockProfile](./debug/profile.md#debug_writeblockprofile)
- [debug_writeMemProfile](./debug/profile.md#debug_writememprofile)
- [debug_writeMutexProfile](./debug/profile.md#debug_writemutexprofile)


## [Runtime Tracing](./debug/go_trace.md) <a id="runtime-tracing"></a>

- [debug_goTrace](./debug/go_trace.md#debug_gotrace)
- [debug_startGoTrace](./debug/go_trace.md#debug_startgotrace)
- [debug_stopGoTrace](./debug/go_trace.md#debug_stopgotrace)


## [Runtime Debugging](./debug/runtime.md) <a id="runtime-debugging"></a>

- [debug_freeOSMemory](./debug/runtime.md#debug_freeosmemory)
- [debug_gcStats](./debug/runtime.md#debug_gcstats)
- [debug_memStats](./debug/runtime.md#debug_memstats)
- [debug_metrics](./debug/runtime.md#debug_metrics)
- [debug_setGCPercent](./debug/runtime.md#debug_setgcpercent)
- [debug_stacks](./debug/runtime.md#debug_stacks)


## [VM Tracing](./debug/tracing.md) <a id="vm-tracing"></a>

- [debug_traceBadBlock](./debug/tracing.md#debug_tracebadblock)
- [debug_traceBlock](./debug/tracing.md#debug_traceblock)
- [debug_traceBlockByHash](./debug/tracing.md#debug_traceblockbyhash)
- [debug_traceBlockByNumber](./debug/tracing.md#debug_traceblockbynumber)
- [debug_traceBlockFromFile](./debug/tracing.md#debug_traceblockfromfile)
- [debug_traceTransaction](./debug/tracing.md#debug_tracetransaction)
- [Tracing Options](./debug/tracing.md#tracing-options)
- [JavaScript-based Tracing](./debug/tracing.md#javascript-based-tracing)


## [VM Standard Tracing](./debug/standard_tracing.md) <a id="vm-standard-tracing"></a>

- [debug_standardTraceBadBlockToFile](./debug/standard_tracing.md#debug_standardtracebadblocktofile)
- [debug_standardTraceBlockToFile](./debug/standard_tracing.md#debug_standardtraceblocktofile)
- [Standard Tracing Options](./debug/standard_tracing.md#standard-tracing-options)


## [Blockchain Inspection](./debug/blockchain.md) <a id="blockchain-inspection"></a>

- [debug_dumpBlock](./debug/blockchain.md#debug_dumpblock)
- [debug_dumpStateTrie](./debug/blockchain.md#debug_dumpstatetrie)
- [debug_getBlockRlp](./debug/blockchain.md#debug_getblockrlp)
- [debug_getModifiedAccountsByHash](./debug/blockchain.md#debug_getmodifiedaccountsbyhash)
- [debug_getModifiedAccountsByNumber](./debug/blockchain.md#debug_getmodifiedaccountsbynumber)
- [debug_getBadBlocks](./debug/blockchain.md#debug_getbadblocks)
- [debug_preimage](./debug/blockchain.md#debug_preimage)
- [debug_printBlock](./debug/blockchain.md#debug_printblock)
- [debug_setHead](./debug/blockchain.md#debug_sethead)
- [debug_seedHash](./debug/blockchain.md#debug_seedhash)
- [debug_startWarmUp](./debug/blockchain.md#debug_startwarmup)
- [debug_startContractWarmUp](./debug/blockchain.md#debug_startcontractwarmup)
- [debug_stopWarmUp](./debug/blockchain.md#debug_stopwarmup)
- [debug_startCollectingTrieStats](./debug/blockchain.md#debug_startCollectingTrieStats)


## [Debug ChainDB](./debug/chaindb.md) <a id="debug-chaindb"></a>

- [debug_chaindbProperty](./debug/chaindb.md#debug_chaindbproperty)
- [debug_chaindbCompact](./debug/chaindb.md#debug_chaindbcompact)

