const { ethers, network, deployments } = require("hardhat")
const fs = require("fs")
require("dotenv").config()

const frontEndContractsFile =
    "../nextjs-nft-marketplace-thegraph-fcc/constants/networkMapping.json"
const frontEndAbiLocation = "../nextjs-nft-marketplace-thegraph-fcc/constants/"

module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log("updating fron end...")
        await updateContractAddresses()
        await updateAbI()
    }
}

async function updateAbI() {
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    fs.writeFileSync(
        `${frontEndAbiLocation}NftMarketplace.json`,
        nftMarketplace.interface.format(ethers.utils.FormatTypes.json)
    )
    const basicNft = await ethers.getContract("BasicNft")
    fs.writeFileSync(
        `${frontEndAbiLocation}BasicNft.json`,
        basicNft.interface.format(ethers.utils.FormatTypes.json)
    )
}

async function updateContractAddresses() {
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    const chainId = network.config.chainId.toString()
    const contractAddresses = JSON.parse(
        fs.readFileSync(frontEndContractsFile, "utf8")
    )
    if (chainId in contractAddresses) {
        if (
            !contractAddresses[chainId]["NftMarketplace"].includes(
                nftMarketplace.address
            )
        ) {
            contractAddresses[chainId]["NftMarketplace"].push(
                nftMarketplace.address
            )
        }
    } else {
        contractAddresses[chainId] = {
            NftMarketplace: [nftMarketplace.address],
        }
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}

module.exports.tags = ["all", "frontend"]
