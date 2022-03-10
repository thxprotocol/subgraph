import { AssetPoolDeployed } from "../../generated/AssetPoolFactory/AssetPoolFactory";
import { AssetPool, Factory } from "../../generated/schema";
import { AssetPool as AssetPoolContract } from "../../generated/templates";

export function handleAssetPoolDeployed(event: AssetPoolDeployed): void {
  let factory = Factory.load("1");

  // if no factory yet, set up blank initial
  if (factory == null) {
    factory = new Factory("1");
    factory.poolCount = 0;
  }
  factory.poolCount++;
  factory.save();

  // Entities only exist after they have been saved to the store;
  const assetPool = new AssetPool(event.params.assetPool.toHex());
  assetPool.address = event.params.assetPool;
  assetPool.save();

  AssetPoolContract.create(event.params.assetPool);
}
