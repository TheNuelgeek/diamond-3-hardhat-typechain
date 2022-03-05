import { ContractReceipt } from "ethers";
import { TransactionDescription, TransactionTypes } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { DiamondCutFacet } from "../typechain-types";
import { getSelectors, FacetCutAction } from "./libraries/diamond";

// Deploy
export let DiamondAddress: string;

export async function main(){
DiamondAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const cut = []
const getNewFacet = await ethers.getContractFactory("Test3Facet");

const facet = await getNewFacet.deploy();
await facet.deployed()

cut.push({
    facetAddress:facet.address,
    action:FacetCutAction.Add,
    functionSelectors: getSelectors(facet)
})

// Upgrade facets
const diamondCut = (await ethers.getContractAt("IDiamondCut", DiamondAddress)) as DiamondCutFacet
let tx;
let receipt: ContractReceipt;

let payload = facet.interface.encodeFunctionData("add", [2,3])
tx = await diamondCut.diamondCut(cut, DiamondAddress, payload);
console.log("Diamond cut tx: ", tx.hash);
receipt = await tx.wait();
if (!receipt.status) {
  throw Error(`Diamond upgrade failed: ${tx.hash}`);
}
console.log("Completed diamond cut");
// DiamondAddress =;






}
if (require.main === module) {
    main()
      .then(() => process.exit(0))
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  }
  
  exports.main = main;