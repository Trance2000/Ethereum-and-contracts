const path = require('path');
const fs = require('fs');
const solc = require('solc'); // solidity compiler installed via npm

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol'); // location of the contract
const source = fs.readFileSync(lotteryPath, 'utf8'); // reading code from contract in utf8
                                  //  | - the number of different contracts that we would like to compile
module.exports = solc.compile(source, 1).contracts[':Lottery']; // exporting the compiled code from the read Inbox.sol file
                                                              // specifically the 'Lottery' contract that is located inside the
                                                              // 'contracts' object
