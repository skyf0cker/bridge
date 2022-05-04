import { createStore, Module } from "vuex";
import VuexPersistance from 'vuex-persist'

// login vuex store persistance, it should store in localstorage
const loginP = new VuexPersistance<allState>({
    storage: window.localStorage,
    modules: ["login"],
});

// const articleP = new VuexPersistance<allState>({
//     storage: window.sessionStorage,
//     modules: ["article"],
// });

interface loginState {
    isWalletInstalled: boolean
    isUserLogin: boolean
    activeAddress: string
    isVerified: boolean
    devtoUsername: string
}

interface articleState {
    curPreviewArticleId: number
    curPreviewArticleContent: string
    previewLoading: boolean
    syncLoading: boolean
    isSynced: boolean
    previewArweaveAddress: string
}

export interface allState {
    login: loginState
    article: articleState
}

const loginStore: Module<loginState, allState> = {
    state() {
        return {
            isWalletInstalled: false,
            isUserLogin: false,
            activeAddress: "",
            isVerified: false,
            devtoUsername: "",
        }
    },
    mutations: {
        walletInstall(state) {
            state.isWalletInstalled = true
        },
        login(state) {
            state.isUserLogin = true
        },
        setActiveAddress(state, address) {
            state.activeAddress = address
        },
        verify(state) {
            state.isVerified = true
        },
        setDevtoUsername(state, username) {
            state.devtoUsername = username
        },
    }
};

const articleStore: Module<articleState, allState> = {
    state() {
        return {
            curPreviewArticleId: 0,
            curPreviewArticleContent: "",
            previewLoading: false,
            syncLoading: false,
            isSynced: false,
            previewArweaveAddress: ""
        }
    },
    mutations: {
        setCurPreviewArticleId(state, id) {
            state.curPreviewArticleId = id
        },
        setCurPreviewArticleContent(state, content) {
            state.curPreviewArticleContent = content
        },
        setPreviewLoading(state, isLoading) {
            state.previewLoading = isLoading
        },
        setSyncLoading(state, isLoading) {
            state.syncLoading = isLoading
        },
        setSync(state, synced) {
            state.isSynced = synced
        },
        setPreviewArweaveAddress(state, address) {
            state.previewArweaveAddress = address
        }
    },
};

export const store = createStore<allState>({
    modules: {
        login: loginStore,
        article: articleStore
    },
    plugins: [
        loginP.plugin,
    ]
})