const path = require('path');
const fs = require('fs');
const solc = require('solc'); // solidity compiler installed via npm

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); // location of the contract
const source = fs.readFileSync(inboxPath, 'utf8'); // reading code from contract in utf8
                                  //  ^ - the number of different contracts that we would like to compile
module.exports = solc.compile(source, 1).contracts[':Inbox']; // exporting the compiled code from the read Inbox.sol file
                                                              // specifically the 'Inbox' contract that is located insude the
                                                              // 'contracts' object
