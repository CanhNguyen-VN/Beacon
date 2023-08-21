import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import {
    ColorMode,
    Network,
    NetworkType,
    TezosOperationType,
    getDAppClientInstance,
    BeaconEvent,
    defaultEventCallbacks,
    PermissionScope,
} from "@airgap/beacon-sdk";
import { createContext, useContext, useState, useEffect } from "react";

export const BeaconContext = createContext({ wallet: undefined });
BeaconContext.displayName = "BeaconContext";
const scopes = [PermissionScope.OPERATION_REQUEST, PermissionScope.SIGN];
export const BeaconProvider = ({ children }) => {
    // const wallet = new BeaconWallet({ name: "Beacon Docs Taquito" });
    const [wallet, setWallet] = useState(null);
    const [Tezos, setTezos] = useState(
        new TezosToolkit("https://ghostnet.ecadinfra.com/")
    );
    // const [wallet, setWallet] = useState(new BeaconWallet({ name: "Beacon Docs Taquito" }));

    const connectBeacon = async () => {
        //beacon
        let myAddress;
        console.log("beacon");
        const activeAccount = await wallet.client.getActiveAccount();
        if (activeAccount) {
            // If defined, the user is connected to a wallet.
            // You can now do an operation request, sign request, or send another permission request to switch wallet
            console.log("Already connected:", activeAccount.address);
            myAddress = activeAccount.address;
            // const permit = await wallet.requestPermissions();
            // myAddress = await wallet.getPKH();
            // console.log("New connection:", myAddress, permit);
        } else {
            try {
                console.log("new connect");
                // const wallet_instance = new BeaconWallet({
                //     name: "Template",
                //     preferredNetwork: NetworkType.GHOSTNET,
                //     colorMode: ColorMode.LIGHT,
                //     disableDefaultEvents: false, // Disable all events / UI. This also disables the pairing alert.
                //     eventHandlers: {
                //         // To keep the pairing alert, we have to add the following default event handlers back
                //         [BeaconEvent.PAIR_INIT]: {
                //             handler: defaultEventCallbacks.PAIR_INIT
                //         },
                //         // [BeaconEvent.PAIR_SUCCESS]: {
                //         //     handler: data => { return (data.publicKey);}
                //         // }
                //     }
                // });

                // Tezos.setWalletProvider(wallet);
                await wallet
                    .requestPermissions({
                        network: {
                            type: NetworkType.GHOSTNET,
                            rpcUrl: "https://ghostnet.ecadinfra.com/",
                        },
                    })
                    .then((res) => console.log("Res", res))
                    .catch((error) => {
                        if (error.title) {
                            // setnewState();
                            console.log("errr", error);
                        }
                    });
                myAddress = await wallet.getPKH();
                console.log("New connection:", myAddress);
            } catch (error) {
                console.log("Error", error);
            }
        }
    };

    useEffect(() => {
        (async () => {
            const wallet_instance = new BeaconWallet({
                name: "Odele",
                iconUrl: "https://tezostaquito.io/img/favicon.svg",
                preferredNetwork: NetworkType.GHOSTNET,

                // colorMode: ColorMode.LIGHT,
                // disableDefaultEvents: false, // Disable all events / UI. This also disables the pairing alert.
                // eventHandlers: {
                //     // To keep the pairing alert, we have to add the following default event handlers back
                //     [BeaconEvent.PAIR_INIT]: {
                //         handler: defaultEventCallbacks.PAIR_INIT
                //     },
                //     // [BeaconEvent.PAIR_SUCCESS]: {
                //     //     handler: data => { return (data.publicKey);}
                //     // }
                // }
            });
            Tezos.setWalletProvider(wallet_instance);
            const activeAccount = await wallet_instance.client.getActiveAccount();
            if (activeAccount) {
                const userAddress = await wallet_instance.getPKH();
                const balance = await Tezos.tz.getBalance(userAddress);

                console.log("balance", balance);
            }

            setWallet(wallet_instance);
        })();
    }, [Tezos]);
    return (
        <BeaconContext.Provider value={{ wallet, connectBeacon }}>
            {children}
        </BeaconContext.Provider>
    );
};

export const useBeaconContext = () => useContext(BeaconContext);
