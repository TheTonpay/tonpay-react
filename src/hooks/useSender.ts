import { SenderArguments, beginCell, storeStateInit } from "ton-core";

type TonConnectUI = {
  sendTransaction: (args: any) => Promise<any>;
  connected: boolean;
};

export function useSender(tonConnectUi: TonConnectUI) {
  return {
    sender: {
      send: async ({ to, value, body, init }: SenderArguments) => {
        tonConnectUi?.sendTransaction({
          messages: [
            {
              address: to.toString(),
              amount: value.toString(),
              payload: body?.toBoc().toString("base64"),
              stateInit: init
                ? beginCell()
                    .storeWritable(storeStateInit(init))
                    .endCell()
                    .toBoc()
                    .toString("base64")
                : undefined,
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000,
        });
      },
      connected: tonConnectUi?.connected,
    },
  };
}
