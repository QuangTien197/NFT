Run the DApp Locally
Install truffle
npm install -g truffle
Install ganache-cli
npm i ganache-cli
Run ganache-cli
ganache-cli --port 7545
Open new terminal window and clone this repository
git clone https://github.com/devpavan04/cryptoboys-NFT-marketplace.git
Install dependencies
cd cryptoboys-NFT-marketplace
npm install
Compile smart contract
truffle compile
Deploy smart contract to ganache
truffle migrate
Test smart contract
truffle test
Start DApp
npm start
Open metamask browser wallet and connect network to Localhost 7545.
Import accounts from ganache-cli into the metamask browser wallet to make transactions on the DApp.
