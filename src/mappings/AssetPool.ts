import { RegistryUpdated } from "../../generated/templates/AssetPool/IdefaultDiamond";
import { AssetPool } from "../../generated/schema";

export function handleRegistryUpdated(event: RegistryUpdated): void {
  let assetPool = AssetPool.load(event.address.toHex());
  if (assetPool == null) {
    assetPool = new AssetPool(event.address.toHex());
  }
  assetPool.registry = event.params.current;
  assetPool.save();
}
