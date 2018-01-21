const assert = require('assert');
const ganache = require('ganache-cli'); // ganache creates a set of accounts in an unlocked state to test code
const Web3 = require('web3'); // Web3 acts as a constructor function
const web3 = new Web3(ganache.provider()); // creates a new instance of Web3 and connects it to
                                          // the ganache local testing network by calling the
                                          // provider() function
const { interface, bytecode } = require('../compile');


let accounts;
let inbox;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] }) // creates an object to be deployed 
    .send({ from: accounts[0], gas: '1000000' }) // the send method is what triggers the deployment of an actual contract

});

describe('Inbox', () => {
  it('deploys a contract', () => {
    console.log(inbox);
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
