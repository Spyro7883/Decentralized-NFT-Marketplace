require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const RINKEBY_RPC_URL =
    process.env.RINKEBY_RPC_URL ||
    "https://rinkeby.infura.io/v3/a71e7c32207445b9b4df8c1979651e36"
const GOERLI_RPC_URL =
    process.env.GOERLI_RPC_URL ||
    "https://goerli.infura.io/v3/a25c545ecafa4b2897a88a22f267531e"
const MAINNET_RPC_URL =
    process.env.MAINNET_RPC_URL ||
    "https://mainnet.infura.io/v3/1a4d46c30ee94ba6a75b2926f7bcf983"
const PRIVATE_KEY = process.env.PRIVATE_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            gas: 6000000,
        },
        localhost: {
            chainId: 31337,
            blockConfirmations: 1,
            gas: 6000000,
        },
        rinkeby: {
            chainId: 4,
            blockConfirmations: 6,
            url: RINKEBY_RPC_URL,
            accounts: [PRIVATE_KEY],
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            blockConfirmations: 6,
            chainId: 5,
        },
    },
    etherscan: {
        // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
        apiKey: {
            rinkeby: ETHERSCAN_API_KEY,
            goerli: ETHERSCAN_API_KEY,
        },
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
    },
    solidity: {
        compilers: [{ version: "0.8.9" }, { version: "0.6.6" }],
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },
    mocha: {
        timeout: 200000, //200 seconds max
    },
}
