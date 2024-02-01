const fs = require('fs');
const endpointRegex = /<MethodEndpoint(.*?)MethodEndpoint>/s;
const titleRegex = /sidebar_label: "\[[a-zA-Z]+\]/s;

const deleteEndpoint = (path) => {
    fs.readdir(path, (err, files) => {
        files.forEach(file => {
            // Read the file contents
            let fileContents = fs.readFileSync(path + "/" + file, 'utf8');
            
            // Replace the matching text
            let newFileContents = fileContents.replace(endpointRegex, '').replace(titleRegex, "sidebar_label: \"");
            
            // Write the updated contents back to the file
            fs.writeFileSync(path + "/" + file, newFileContents);
        })
    })
}

deleteEndpoint('../docs/klaytn-json-rpc/klay')
deleteEndpoint('../docs/klaytn-json-rpc/eth')
deleteEndpoint('../docs/klaytn-json-rpc/debug')
deleteEndpoint('../docs/klaytn-json-rpc/admin')
deleteEndpoint('../docs/klaytn-json-rpc/governance')
deleteEndpoint('../docs/klaytn-json-rpc/net')
deleteEndpoint('../docs/klaytn-json-rpc/txpool')
deleteEndpoint('../docs/klaytn-json-rpc/mainbridge')
deleteEndpoint('../docs/klaytn-json-rpc/subbridge')
deleteEndpoint('../docs/klaytn-json-rpc/personal')