const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'slush evoke rib odor beyond cram either able decide inmate pupil sort',
  'https://rinkeby.infura.io/n9VofDNLjMCRr7swiOD3'
);

const web3 = new Web3(provider);

const deploy = async () => {

  const accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to following address:', result.options.address);

};
deploy();
