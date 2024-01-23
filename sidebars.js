// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

/** (old) auto-generated config
const sidebars = {
  learnSidebar: [
    {type: 'autogenerated', dirName: 'learn'},
  ],
  buildSidebar: [
    {type: 'autogenerated', dirName: 'build'},
  ],
  nodeSidebar: [
    {type: 'autogenerated', dirName: 'nodes'},
  ],
  refSidebar: [
    {type: 'autogenerated', dirName: 'references'},
  ],
};
 */

const commonSidebar = [
  {
    type: 'html',
    value: '<span class="sidebar-divider" />',
  },
  {
    type: 'category',
    label: 'Operation Guide',
    link: {type: 'doc', id: 'misc/operation/operation'},
    items: [
      'misc/operation/configuration',
      'misc/operation/node-log',
      'misc/operation/log-management',
      'misc/operation/klaytn-command',
      'misc/operation/troubleshooting',
      'misc/operation/chaindata-change',
      'misc/operation/chaindata-migration',
      'misc/operation/upstream-en',
    ],
  },
  'misc/klaytn-history',
  'misc/faq',
  'misc/opensource',
  'misc/terms-of-use',
  'misc/internationalization',
];

const sidebars = {
  learnSidebar: [
    'learn/learn',
    'learn/why-klaytn',
    'learn/consensus-mechanism',
    'learn/accounts',
    {
      type: 'category',
      label: 'Transactions',
      link: {type: 'doc', id: 'learn/transactions/transactions'},
      items: [
        'learn/transactions/basic',
        'learn/transactions/ethereum',
        'learn/transactions/fee-delegation',
        'learn/transactions/partial-fee-delegation',
      ],
    },
    {
      type: 'category',
      label: 'Computation',
      link: {type: 'doc', id: 'learn/computation/computation'},
      items: [
        'learn/computation/computation-cost',
        'learn/computation/execution-model',
        'learn/computation/klaytn-smart-contract',
        'learn/computation/klaytn-virtual-machine',
        'learn/computation/precompiled-contracts',
      ],
    },
    {
      type: 'category',
      label: 'Storage Layer',
      link: {type: 'doc', id: 'learn/storage/storage'},
      items: [
        'learn/storage/state-migration',
        'learn/storage/live-pruning',
      ],
    },
    'learn/multiport',
    'learn/kni',
    'learn/scaling-solutions',
    'learn/klaytn-native-coin-klay',
    'learn/transaction-fees',
    'learn/token-economy',
    'learn/governance',
    {
      type: 'category',
      link: {type: 'doc', id: 'learn/klaytn2/klaytn2'},
      label: 'Klaytn 2.0',
      items: [
        'learn/klaytn2/decentralizing-governance',
        'learn/klaytn2/ethereum-compatibility',
        'learn/klaytn2/finality-and-improvements',
        'learn/klaytn2/massive-ecofund',
        'learn/klaytn2/metaverse-package',
      ],
    },
    'learn/glossary',
    ...commonSidebar,
  ],
  buildSidebar: [
    'build/build',
    {
      type: 'category',
      label: 'Get Started',
      link: {type: 'doc', id: 'build/get-started/get-started'},
      items: [
        'build/get-started/before-you-start',
        'build/get-started/hardhat',
        {
          type: 'category',
          label: 'Account Basics',
          link: {type: 'doc', id: 'build/get-started/account/account'},
          items: [
            'build/get-started/account/creating-accounts',
            'build/get-started/account/managing-accounts',
          ],
        },
        'build/get-started/getting-klay',
      ],
    },
    {
      type: 'category',
      label: 'Smart Contracts',
      link: {type: 'doc', id: 'build/smart-contracts/smart-contracts'},
      items: [
        'build/smart-contracts/solidity-smart-contract-language',
        'build/smart-contracts/ide-and-tools/ide-and-tools',
        {
          type: 'category',
          label: 'Deploy Smart Contracts',
          link: {type: 'doc', id: 'build/smart-contracts/deploy/deploy'},
          items: [
            'build/smart-contracts/deploy/foundry',
            'build/smart-contracts/deploy/thirdweb',
            'build/smart-contracts/deploy/ken',
          ],
        },
        {
          type: 'category',
          label: 'Sample Contracts',
          link: {type: 'doc', id: 'build/smart-contracts/samples/samples'},
          items: [
            'build/smart-contracts/samples/klaytngreeter',
            'build/smart-contracts/samples/erc-20',
            'build/smart-contracts/samples/erc-721',
          ],
        },
        'build/smart-contracts/token-standard',
        'build/smart-contracts/porting-ethereum-contract',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      link: {type: 'doc', id: 'build/tutorials/tutorials'},
      items: [
        {
          type: 'category',
          label: 'Build Count DApp',
          link: {type: 'doc', id: 'build/tutorials/count-dapp/count-dapp'},
          items: [
            'build/tutorials/count-dapp/setup-environment',
            'build/tutorials/count-dapp/deploy-contracts',
            'build/tutorials/count-dapp/directory-structure',
            {
              type: 'category',
              label: 'Frontend Code Overview',
              link: {type: 'doc', id: 'build/tutorials/count-dapp/code-overview/code-overview'},
              items: [
                'build/tutorials/count-dapp/code-overview/blocknumber-component',
                'build/tutorials/count-dapp/code-overview/auth-component',
                'build/tutorials/count-dapp/code-overview/count-component',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Build Klaystagram',
          link: {type: 'doc', id: 'build/tutorials/klaystagram/klaystagram'},
          items: [
            'build/tutorials/klaystagram/setup-environment',
            'build/tutorials/klaystagram/deploy-contracts',
            'build/tutorials/klaystagram/directory-structure',
            'build/tutorials/klaystagram/code-overview',
            'build/tutorials/klaystagram/feedpage',
          ],
        },
        'build/tutorials/fee-delegation-example',
        'build/tutorials/buy-me-a-coffee',
        'build/tutorials/connecting-metamask',
        'build/tutorials/connecting-remix',
        'build/tutorials/migrating-ethereum-app-to-klaytn',
        {type: 'doc', label: 'Verify Contracts', id: 'build/tutorials/verifying-contracts'},
      ],
    },
    {
      type: 'category',
      link: {type: 'doc', id: 'build/tools/tools'},
      label: 'Tools',
      items: [
        'build/tools/klaytn-online-toolkit',
        {
          type: 'category',
          label: 'Wallets',
          link: {type: 'doc', id: 'build/tools/wallets/wallets'},
          items: [
            'build/tools/wallets/kaikas',
            {
              type: 'category',
              label: 'Klaytn Safe',
              link: {type: 'doc', id: 'build/tools/wallets/klaytn-safe/klaytn-safe'},
              items: [
                'build/tools/wallets/klaytn-safe/overview',
                'build/tools/wallets/klaytn-safe/use-klaytn-safe',
                'build/tools/wallets/klaytn-safe/contract-interaction',
                'build/tools/wallets/klaytn-safe/tx-builder',
                'build/tools/wallets/klaytn-safe/faqs',
              ],
            },
            'build/tools/wallets/klaytn-wallet',
            'build/tools/wallets/safepal-s1',
            {
              type: 'category',
              label: 'Wallet Libraries',
              link: {type: 'doc', id: 'build/tools/wallets/wallet-libraries/wallet-libraries'},
              items: [
                'build/tools/wallets/wallet-libraries/web3Auth',
                'build/tools/wallets/wallet-libraries/web3Modal',
                'build/tools/wallets/wallet-libraries/web3Onboard',
                'build/tools/wallets/wallet-libraries/particle',
                'build/tools/wallets/wallet-libraries/privy',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Oracles',
          link: {type: 'doc', id: 'build/tools/oracles/oracles'},
          items: [
            'build/tools/oracles/orakl-network',
            'build/tools/oracles/supraoracles',
            'build/tools/oracles/witnet',
          ],
        },
        {
          type: 'category',
          label: 'Indexers',
          link: {type: 'doc', id: 'build/tools/indexers/indexers'},
          items: [
            'build/tools/indexers/subquery',
          ],
        },
        {
          type: 'category',
          label: 'Cross-chain',
          link: {type: 'doc', id: 'build/tools/cross-chain/cross-chain'},
          items: [
            'build/tools/cross-chain/layerzero',
          ],
        },
        {
          type: 'category',
          label: 'Block Explorers',
          link: {type: 'doc', id: 'build/tools/block-explorers/block-explorers'},
          items: [
            'build/tools/block-explorers/klaytnscope',
            {
              type: 'link',
              label: 'Klaytnfinder',
              href: 'https://www.klaytnfinder.io/',
            },
          ],
        },
        'build/tools/klaytn-contracts-wizard',
      ],
    },
    ...commonSidebar,
  ],
  nodeSidebar: [
    'nodes/nodes',
    {
      type: 'category',
      label: 'Endpoint Node',
      link: {type: 'doc', id: 'nodes/endpoint-node/endpoint-node'},
      items: [
        'nodes/endpoint-node/system-requirements',
        'nodes/endpoint-node/install-endpoint-nodes',
        'nodes/endpoint-node/docker-setup',
        'nodes/endpoint-node/ken-cli-commands',
        'nodes/endpoint-node/json-rpc-apis',
      ],
    },
    {
      type: 'category',
      label: 'Core Cell',
      link: {type: 'doc', id: 'nodes/core-cell/core-cell'},
      items: [
        'nodes/core-cell/system-requirements',
        'nodes/core-cell/network-configuration',
        {
          type: 'category',
          label: 'Install Core Cell',
          link: {type: 'doc', id: 'nodes/core-cell/install/install'},
          items: [
            'nodes/core-cell/install/before-you-install',
            'nodes/core-cell/install/install-consensus-nodes',
            'nodes/core-cell/install/install-proxy-nodes',
          ],
        },
        'nodes/core-cell/monitoring-setup',
        'nodes/core-cell/h-a-setup',            
      ],
    },
    {
      type: 'category',
      label: 'Service Chain',
      link: {type: 'doc', id: 'nodes/service-chain/service-chain'},
      items: [
        'nodes/service-chain/system-requirements',
        {
          type: 'category',
          label: 'Quick Start',
          link: {type: 'doc', id: 'nodes/service-chain/quick-start/quick-start'},
          items: [
            'nodes/service-chain/quick-start/4nodes-setup-guide',
            'nodes/service-chain/quick-start/en-scn-connection',
            'nodes/service-chain/quick-start/value-transfer',
            'nodes/service-chain/quick-start/ha-for-sc',
            'nodes/service-chain/quick-start/nested-sc',
            'nodes/service-chain/quick-start/value-transfer-between-sibling',            
          ],
        },
        'nodes/service-chain/install-service-chain',        
        {
          type: 'category',
          label: 'Configure Service Chain',
          link: {type: 'doc', id: 'nodes/service-chain/configure/configure'},
          items: [
            'nodes/service-chain/configure/bridge-configuration',
            'nodes/service-chain/configure/anchoring',
            'nodes/service-chain/configure/kas-anchoring',
            'nodes/service-chain/configure/value-transfer',
            'nodes/service-chain/configure/configuration-files',
            'nodes/service-chain/configure/genesis',
          ],
        },
        'nodes/service-chain/upgrade-and-hard-fork',
      ],
    },
    {
      type: 'category',
      label: 'Node Package Downloads',
      link: {type: 'doc', id: 'nodes/downloads/downloads'},
      items: [
        'nodes/downloads/v1.12.0',
        'nodes/downloads/v1.11.1',
        'nodes/downloads/v1.11.0',
        'nodes/downloads/v1.10.2',
        'nodes/downloads/v1.10.1',
        'nodes/downloads/v1.9.1',
        'nodes/downloads/v1.9.0',
        'nodes/downloads/v1.8.4',
        'nodes/downloads/v1.8.3',
        'nodes/downloads/v1.8.2',
        'nodes/downloads/v1.8.1',
        'nodes/downloads/v1.7.3',
        'nodes/downloads/v1.7.2',
        'nodes/downloads/v1.7.0',
        'nodes/downloads/v1.6.4',
        'nodes/downloads/v1.6.3',
        'nodes/downloads/v1.6.2',
        'nodes/downloads/v1.6.1',
        'nodes/downloads/v1.6.0',
        'nodes/downloads/v1.5.3',
        'nodes/downloads/v1.5.2',
        'nodes/downloads/v1.5.1',
        'nodes/downloads/v1.5.0',
        'nodes/downloads/v1.4.2',
        'nodes/downloads/v1.4.1',
        'nodes/downloads/v1.4.0',
        'nodes/downloads/v1.3.0',
        'nodes/downloads/v1.2.0',
        'nodes/downloads/v1.1.1',
        'nodes/downloads/v1.0.0',
        'nodes/downloads/v0.9.6',
        'nodes/downloads/v0.8.2',
      ],
    },
    ...commonSidebar,
  ],
  refSidebar: [
    'references/references',
    {
      type: 'category',
      label: 'RPC API Reference',
      link: {type: 'doc', id: 'references/json-rpc/json-rpc'},
      items: [
        {
          type: 'category',
          label: 'eth',
          link: {type: 'doc', id: 'references/json-rpc/eth/eth'},
          items: [
            'references/json-rpc/eth/caution',
            'references/json-rpc/eth/account',
            'references/json-rpc/eth/block',
            'references/json-rpc/eth/transaction',
            'references/json-rpc/eth/config',
            'references/json-rpc/eth/filter',
            'references/json-rpc/eth/gas',
            'references/json-rpc/eth/misc',
          ],
        },
        {
          type: 'category',
          label: 'klay',
          link: {type: 'doc', id: 'references/json-rpc/klay/klay'},
          items: [
            'references/json-rpc/klay/account',
            'references/json-rpc/klay/block',
            'references/json-rpc/klay/transaction',
            'references/json-rpc/klay/transaction-type-support',
            'references/json-rpc/klay/config',
            'references/json-rpc/klay/filter',
            'references/json-rpc/klay/gas',
            'references/json-rpc/klay/misc',
          ],
        },
        'references/json-rpc/network',
        {
          type: 'category',
          label: 'debug',
          link: {type: 'doc', id: 'references/json-rpc/debug/debug'},
          items: [
            'references/json-rpc/debug/logging',
            'references/json-rpc/debug/profile',
            'references/json-rpc/debug/go_trace',
            'references/json-rpc/debug/runtime',
            'references/json-rpc/debug/tracing',
            'references/json-rpc/debug/standard_tracing',
            'references/json-rpc/debug/blockchain',
          ],
        },
        'references/json-rpc/admin',
        'references/json-rpc/personal',
        'references/json-rpc/txpool',
        'references/json-rpc/governance',
      ],
    },
    // TODO-Klaytn : It will be activated after dacusaurus-openapi-docs plugin bug fix
    // {type:"category",label:"New RPC API Reference",link: {type:"generated-index",title:"JSON RPC NEW",slug:"/klaytn-docs/docs/klaytn-json-rpc",},items: require("./docs/klaytn-json-rpc/sidebar.js"),},

    {
      type: 'category',
      label: 'Service Chain API Reference',
      link: {type: 'doc', id: 'references/service-chain-api/service-chain-api'},
      items: [
        'references/service-chain-api/mainbridge',
        'references/service-chain-api/subbridge',          
      ],
    },
    'references/transaction-error-codes',
    {
      type: 'category',
      label: 'RPC Service Providers',
      link: {type: 'doc', id: 'references/service-providers/service-providers'},
      items: [
        'references/service-providers/public-en',       
      ],
    },
    {
      type: 'category',
      label: 'SDKs and Libraries',
      link: {type: 'doc', id: 'references/sdk/sdk'},
      items: [
        // TODO-Klaytn: it will be activated after the web3klaytn example contents have been completed
        // {
        //   type: 'category',
        //   label: 'web3klaytn',
        //   link: {type: 'doc', id: 'references/sdk/web3klaytn'},
        //   items: [
        //     {type: 'autogenerated', dirName: 'references/sdk/web3klaytn'},
        //   ]
        // },
        {
          type: 'category',
          label: 'caver',
          items: [
            {
              type: 'category',
              label: 'caver-js (1.5.0 or later)',
              link: {type: 'doc', id: 'references/sdk/caver-js/caver-js'},
              items: [
                'references/sdk/caver-js/get-started',
                'references/sdk/caver-js/send-transaction',
                {
                  type: 'category',
                  label: 'API References',
                  link: {type: 'doc', id: 'references/sdk/caver-js/api/api'},
                  items: [
                    'references/sdk/caver-js/api/caver.account',
                    {
                      type: 'category',
                      label: 'caver.wallet',
                      link: {type: 'doc', id: 'references/sdk/caver-js/api/caver-wallet/caver-wallet'},
                      items: [
                        'references/sdk/caver-js/api/caver-wallet/keyring',
                      ],
                    },
                    {
                      type: 'category',
                      label: 'caver.transaction',
                      link: {type: 'doc', id: 'references/sdk/caver-js/api/caver-transaction/caver-transaction'},
                      items: [
                        'references/sdk/caver-js/api/caver-transaction/basic',
                        'references/sdk/caver-js/api/caver-transaction/fee-delegation',
                        'references/sdk/caver-js/api/caver-transaction/partial-fee-delegation',
                      ],
                    },
                    {
                      type: 'category',
                      label: 'caver.rpc',
                      link: {type: 'doc', id: 'references/sdk/caver-js/api/caver-rpc/caver-rpc'},
                      items: [
                        'references/sdk/caver-js/api/caver-rpc/governance',
                        'references/sdk/caver-js/api/caver-rpc/klay',
                        'references/sdk/caver-js/api/caver-rpc/net',
                      ],
                    },
                    'references/sdk/caver-js/api/caver.contract',
                    'references/sdk/caver-js/api/caver.abi',
                    {
                      type: 'category',
                      label: 'caver.rpc',
                      link: {type: 'doc', id: 'references/sdk/caver-js/api/caver-kct/caver-kct'},
                      items: [
                        'references/sdk/caver-js/api/caver-kct/kip7',
                        'references/sdk/caver-js/api/caver-kct/kip17',
                        'references/sdk/caver-js/api/caver-kct/kip37',
                      ],
                    },
                    'references/sdk/caver-js/api/caver.validator',
                    'references/sdk/caver-js/api/caver.utils',
                    'references/sdk/caver-js/api/caver.ipfs',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'caver-js (1.4.1 or earlier)',
              link: {type: 'doc', id: 'references/sdk/caver-js-1.4.1/caver-js-1.4.1'},
              items: [
                'references/sdk/caver-js-1.4.1/get-started-1.4.1',
                {
                  type: 'category',
                  label: 'API References',
                  link: {type: 'doc', id: 'references/sdk/caver-js-1.4.1/api/api'},
                  items: [
                    {
                      type: 'category',
                      label: 'caver.klay',
                      link: {type: 'doc', id: 'references/sdk/caver-js-1.4.1/api/caver.klay/caver.klay'},
                      items: [
                        'references/sdk/caver-js-1.4.1/api/caver.klay/account',
                        'references/sdk/caver-js-1.4.1/api/caver.klay/block',
                        {
                          type: 'category',
                          label: 'Transaction',
                          link: {type: 'doc', id: 'references/sdk/caver-js-1.4.1/api/caver.klay/transaction/transaction'},
                          items: [
                            'references/sdk/caver-js-1.4.1/api/caver.klay/transaction/sendtx-legacy',
                            'references/sdk/caver-js-1.4.1/api/caver.klay/transaction/sendtx-value-transfer',
                            'references/sdk/caver-js-1.4.1/api/caver.klay/transaction/sendtx-value-transfer-memo',
                            'references/sdk/caver-js-1.4.1/api/caver.klay/transaction/sendtx-account-update',
                            'references/sdk/caver-js-1.4.1/api/caver.klay/transaction/sendtx-smart-contract-deploy',
                            'references/sdk/caver-js-1.4.1/api/caver.klay/transaction/sendtx-smart-contract-execution',
                            'references/sdk/caver-js-1.4.1/api/caver.klay/transaction/sendtx-cancel',
                          ],
                        },
                        'references/sdk/caver-js-1.4.1/api/caver.klay/config',
                        'references/sdk/caver-js-1.4.1/api/caver.klay/filter',
                        'references/sdk/caver-js-1.4.1/api/caver.klay/misc',
                      ],
                    },
                    'references/sdk/caver-js-1.4.1/api/caver.klay.net',
                    'references/sdk/caver-js-1.4.1/api/caver.klay.accounts',
                    'references/sdk/caver-js-1.4.1/api/caver.klay.Contract',
                    'references/sdk/caver-js-1.4.1/api/caver.klay.KIP7',
                    'references/sdk/caver-js-1.4.1/api/caver.klay.KIP17',
                    'references/sdk/caver-js-1.4.1/api/caver.klay.abi',
                    'references/sdk/caver-js-1.4.1/api/caver.utils_1.4.1',
                  ],
                },
                'references/sdk/caver-js-1.4.1/porting-from-web3.js',
              ],
            },
            {
              type: 'category',
              label: 'caver-java (1.5.0 or later)',
              link: {type: 'doc', id: 'references/sdk/caver-java/caver-java'},
              items: [
                'references/sdk/caver-java/get-started',
                {
                  type: 'link',
                  label: 'API References',
                  href: 'https://javadoc.io/doc/com.klaytn.caver/core/',
                },
              ],
            },
            {
              type: 'category',
              label: 'caver-java (1.4.0 or earlier)',
              link: {type: 'doc', id: 'references/sdk/caver-java-1.4.0/caver-java-1.4.0'},
              items: [
                'references/sdk/caver-java-1.4.0/getting-started-1.4.0',
                'references/sdk/caver-java-1.4.0/porting-from-web3j',
              ],
            },
          ],
        },
        'references/sdk/ether-js',
        'references/sdk/viem',
        'references/sdk/web3-js',
      ],
    },
    ...commonSidebar,
  ],
};

module.exports = sidebars;
