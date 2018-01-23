const assert = require('assert');
const ganache = require('ganache-cli'); // ganache creates a set of accounts in an unlocked state to test code
const Web3 = require('web3'); // Web3 acts as a constructor function
const provider = ganache.provider();
const web3 = new Web3(provider); // creates a new instance of Web3 and connects it to
                                          // the ganache local testing network by calling the
                                          // provider() function
const { interface, bytecode } = require('../compile');


let accounts;
let inbox;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] }) // creates an object to be deployed
    .send({ from: accounts[0], gas: '1000000' }); // the send method is what triggers the deployment of an actual contract to the network
    inbox.setProvider(provider); // this line is a workaround for a bug with Web3
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address); // check to see if the value passed to the assert.ok() method exists
                                      // in this case, we are checking if the "address" value exists, and if it does, the contract is deployed.
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call(); // calls the 'message' method on the Inbox contract
    assert.equal(message, 'Hi there!'); // tests the value that is stored in "message";
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] }); // calls the 'setMessage' method and modifies the contract by changing the value of the message. Costs are accounted for with the 'send' function.
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });

});

























// example test specs:
// class Car {
//
//   park() {
//     return 'stopped';
//   }
//
//   drive() {
//     return 'vroom';
//   }
//
// }
//
//
// let car;
// beforeEach(() => {
//   car = new Car();
// });
//
// describe('Car', () => {
//
//   it('can park', () => {
//     assert(car.park(), 'stopped');
//   });
//
//   it('can drive', () => {
//     assert(car.drive(), 'vroom');
//   });
//
// });
