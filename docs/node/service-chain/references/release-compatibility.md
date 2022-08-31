# Release compatibility <a id="release-compatibility"></a>

As the ServiceChain bridge is established between `SCN`(child bridge node) and `EN`(parent bridge node) processes, both binaries must be compatible across.
Moreover, both binary and bridge contracts to be deployed on both child and parent chains must be compatible.

To have expected behaviors in short:
1. Both `SCN` and `EN` binaries must be compatible
2. Binary and bridge contract must be compatible

# Release changes
- v1.9.0 (07/29/2022)
    - Binary compatibility: The v1.9.0 releases of `SCN` and `EN` does not have backward compatibility with previous releases.
    If you plan to upgrade either one to v1.9.0 or above, both binaries must be v1.9.0 or above.
    - Contract compatibility: No changes.
