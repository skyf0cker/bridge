import { } from 'arconnect'
import { useStore } from "vuex";

export default function useHandleConnectWallet() {
    const store = useStore()

    const checkUserLogin = async () => {
        const permissions = await window.arweaveWallet.getPermissions()
        return permissions.map(p => p === "DISPATCH" || p === "ACCESS_ADDRESS").length === 2
    }

    if (window.arweaveWallet) {
        console.log("arconnect already loaded")
        store.commit("walletInstall")

        checkUserLogin().then(isLogin => {
            if (isLogin) {
                store.commit("login")
                return getAddress()
            }
        }).then(address => {
            if (address) {
                store.commit("setActiveAddress", address.activeAddress)
            }
        })
    }

    window.addEventListener("arweaveWalletLoaded", () => {
        console.log("arconnect already loaded")
        store.commit("walletInstall")

        checkUserLogin().then(isLogin => {
            if (isLogin) {
                store.commit("login") 
                return getAddress()
            }
        }).then(address => {
            if (address) {
                store.commit("setActiveAddress", address.activeAddress)
            }
        })
    })

    const loginWallet = async () => {
        window.arweaveWallet.connect(["ACCESS_ADDRESS", "ACCESS_ALL_ADDRESSES", "SIGN_TRANSACTION", "ENCRYPT", "DECRYPT", "DISPATCH"],
            {
                name: "perma.dev.to",
                logo: "https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
            }).then(() => {
                store.commit("login")
                return getAddress()
            }) .then(address => {
                store.commit("setActiveAddress", address.activeAddress)
            })
    }

    interface addressInfo {
        activeAddress: string
        addresses: string[]
    }

    const getAddress = async (): Promise<addressInfo> => {
        const active = await window.arweaveWallet.getActiveAddress()
        const all = await window.arweaveWallet.getAllAddresses()
        return {
            activeAddress: active,
            addresses: all
        }
    }

    return {
        checkUserLogin,
        loginWallet,
        getAddress
    }
}
