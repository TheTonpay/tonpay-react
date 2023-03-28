import { useEffect, useState } from "react";
import { Address, OpenedContract } from "ton-core";
import { useTonClient } from "./useTonClient";
import { InvoiceWrapper } from "@tonpay/core";

export const useInvoice = (address: string) => {
  const tonClient = useTonClient("testnet");
  const [invoiceContract, setInvoiceContract] =
    useState<OpenedContract<InvoiceWrapper> | null>(null);

  useEffect(() => {
    if (!tonClient || !address) return;

    setInvoiceContract(
      tonClient.open(new InvoiceWrapper(Address.parse(address)))
    );
  }, [address, tonClient]);

  return invoiceContract;
};
