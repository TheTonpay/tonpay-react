import { useEffect, useState } from "react";
import { Address, OpenedContract } from "ton-core";
import { useTonClient } from "./useTonClient";
import { StoreWrapper } from "@tonpay/core";

export const useStore = (address: string) => {
  const tonClient = useTonClient("testnet");
  const [storeContract, setStoreContract] =
    useState<OpenedContract<StoreWrapper> | null>(null);

  useEffect(() => {
    if (!tonClient || !address) return;

    setStoreContract(tonClient.open(new StoreWrapper(Address.parse(address))));
  }, [address, tonClient]);

  return storeContract;
};
