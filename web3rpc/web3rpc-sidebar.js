const klaySidebar = require("../docs/klaytn-json-rpc/klay/sidebar.ts")
const ethSidebar = require("../docs/klaytn-json-rpc/eth/sidebar.ts")
const governanceSidebar = require("../docs/klaytn-json-rpc/governance/sidebar.ts")
const adminSidebar = require("../docs/klaytn-json-rpc/admin/sidebar.ts")
const netSidebar = require("../docs/klaytn-json-rpc/net/sidebar.ts")
const txpoolSidebar = require("../docs/klaytn-json-rpc/txpool/sidebar.ts")
const personalSidebar = require("../docs/klaytn-json-rpc/personal/sidebar.ts")
const debugSidebar = require("../docs/klaytn-json-rpc/debug/sidebar.ts")
const mainbridgeSidebar = require("../docs/klaytn-json-rpc/mainbridge/sidebar.ts")
const subbridgeSidebar = require("../docs/klaytn-json-rpc/subbridge/sidebar.ts")

// Function to find the common prefix of labels
const findCommonLabelPrefix = (sidebar, categories) => {
    categories.map(category => {
        let parentCategory = {}
        category.items.map(item => {
            const tokens = item.label.split(" ")
            if (tokens.length === 2) {
                const label = tokens[0].slice(1,-1)
                if (!parentCategory.hasOwnProperty(tokens[0])) {
                    parentCategory[tokens[0]] = {
                        type:"category",
                        label:label,
                        items:[]
                    }
                }
                item.label = tokens[1]
                parentCategory[tokens[0]].items.push(item)
            }
        })
        sidebar.map(originalCategory => {
            if (originalCategory.label === category.label) {
                originalCategory.items = Object.keys(parentCategory).map(key => {
                    return parentCategory[key]
                })
            }
        })
    });
};

findCommonLabelPrefix(klaySidebar, klaySidebar.slice(1))
findCommonLabelPrefix(ethSidebar, ethSidebar.slice(1))
findCommonLabelPrefix(debugSidebar, debugSidebar.slice(1))
export const klaySidebarFormatted = klaySidebar.slice(1)
export const ethSidebarFormatted = ethSidebar.slice(1)
export const governanceSidebarFormatted = governanceSidebar.slice(1)
export const adminSidebarFormatted = adminSidebar.slice(1)
export const netSidebarFormatted = netSidebar.slice(1)
export const txpoolSidebarFormatted = txpoolSidebar.slice(1)
export const personalSidebarFormatted = personalSidebar.slice(1)
export const debugSidebarFormatted = debugSidebar.slice(1)
export const mainbridgeSidebarFormatted = mainbridgeSidebar.slice(1)
export const subbridgeSidebarFormatted = subbridgeSidebar.slice(1)