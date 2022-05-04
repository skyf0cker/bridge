<template>
    <div id="login">
        <div id="cards">
            <a-row id="card-row" :gutter="16">
                <a-col class="card-col" :span="8">
                    <a-card class="card" :bordered="false" :hoverable="true">
                        <template #title>
                            <span>
                                1. Connect Wallet
                            </span>
                            <check-circle-two-tone v-if="stage > 1" two-tone-color="#52c41a" />
                        </template>
                        <p>
                            You need connect your arweave wallet(now supported ArConnect only).
                            <br>
                            What's an Arweave Wallet? You can find answer here.
                        </p>
                        <a-button id="connect-btn" type="primary" shape="round" size="large" :disabled="stage !== 1"
                            :loading="stage === 1 && !isWalletInstalled" @click="handleConnectWallet()">
                            Connect your wallet
                        </a-button>
                        <a-alert v-if="isUserLogin" id="login-tip" message="Login Succeeded" type="success" show-icon>
                            <template #description>
                                Congradulations! You have logined in! <br />
                                <span id="address">{{ activeAddress }}</span>
                            </template>
                        </a-alert>
                    </a-card>
                </a-col>
                <a-col class="card-col" :span="8">
                    <a-card class="card" :bordered="false" :hoverable="true">
                        <template #title>
                            <span>
                                2. Associate dev.to Account
                            </span>
                            <check-circle-two-tone v-if="stage > 2" two-tone-color="#52c41a" />
                        </template>
                        <p>You need to post a specific content in dev.to through your dev.to account, so that the
                            platform can verify your identify and associate with your wallet address.</p>
                        <div class="components-input-demo-presuffix">
                            <a-input v-if="stage == 2" v-model:value="username"
                                placeholder="input your dev.to username">
                                <template #prefix>
                                    <user-outlined type="user" />
                                </template>
                                <template #suffix>
                                    <a-tooltip title="Extra information">
                                        <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
                                    </a-tooltip>
                                </template>
                            </a-input>
                            <br />
                            <br />
                        </div>

                        <a-alert v-if="stage == 2 && username.length > 0" id="verify-tip"
                            message="Content you need to post on dev.to" type="info" show-icon>
                            <template #description>
                                You need post following content on your
                                <span id="username">{{ username }}</span>
                                dev.to account with [verify] tag. <br />
                                Verify Content: <br />
                                <span id="verify-content">I'm verifying my bridge account: {{ verifyContent }}</span>
                            </template>
                        </a-alert>

                        <a-button id="verify-btn" type="primary" shape="round" size="large" @click="handleVerify()"
                            :loading="isVerifying" :disabled="stage !== 2">
                            Verify Identify
                        </a-button>

                        <a-alert v-if="isVerified" id="after-verify-tip" message="You have been verified!"
                            description="Congradulations! Just check out next step and enjoy your perma trip."
                            type="success" show-icon>
                        </a-alert>
                    </a-card>
                </a-col>
                <a-col class="card-col" :span="8">
                    <a-card class="card" title="3. Further Actions" :bordered="false" :hoverable="true">
                        <p>
                            Now you have done all the register work.<br>
                            You can sync your dev.to posts to arweave permaweb to make your article being permanent.
                        </p>

                        <a-button id="sync-btn" type="primary" shape="round" size="large" @click="handleSync()"
                            :disabled="stage !== 3">
                            Let's GO!
                        </a-button>
                    </a-card>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script lang="ts" setup>
import useHandleConnectWallet from "@/composables/useHandleConnectWallet";
import { computed } from '@vue/reactivity';
import { ref } from 'vue'
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';
import SparkMD5 from 'spark-md5'
import { CheckCircleTwoTone } from '@ant-design/icons-vue';
import { useStore } from "vuex";
import router from "@/routes";
import { createAnonymousSession, Verify } from "@/appwrite";
import { notification } from "ant-design-vue";

const store = useStore()
const { loginWallet, getAddress } = useHandleConnectWallet()

const stage = computed(() => {
    if (store.state.login.isWalletInstalled && store.state.login.isUserLogin) {
        if (!isVerified.value) {
            return 2
        } else {
            return 3
        }
    }

    return 1
})

const isUserLogin = computed(() => store.state.login.isUserLogin)
const isVerified = computed(() => store.state.login.isVerified)
const isWalletInstalled = computed(() => store.state.login.isWalletInstalled)
const activeAddress = computed(() => store.state.login.activeAddress)

const username = ref<string>('')

const handleConnectWallet = async () => {
    if (!store.state.login.isUserLogin) {
        await loginWallet()
        const addrInfo = await getAddress()
        store.commit("setActiveAddress", addrInfo.activeAddress)
    }
}

const verifyContent = computed(() => {
    return SparkMD5.hash(store.state.login.activeAddress + username.value)
})

const isVerifying = ref<boolean>(false)
const handleVerify = () => {
    isVerifying.value = true
    createAnonymousSession()
    Verify(username.value, verifyContent.value).then(res => {
        const verifyResp = JSON.parse(res)
        if (verifyResp.isVerified) {
            store.commit("verify")
            store.commit("setDevtoUsername", username)
        } else {
            const key = "verify failed"
            notification["error"]({
                message: "verify failed",
                key: key,
                onClick: () => notification.close(key),
            })
        }

        isVerifying.value = false
    })
}

const handleSync = () => {
    router.push({
        name: "articles",
    })
}

</script>

<style>
#login {
    height: 92%;
}

#cards {
    background-color: #ececec;
    padding: 20px;
    height: 100%;
}

.card,
.card-col,
#card-row {
    height: 100%;
}

#login-tip,
#after-verify-tip {
    margin-top: 10px;
}

#verify-tip {
    margin-bottom: 10px;
}

#username {
    color: blue;
    font-weight: 500;
    font-size: 20px;
}

#verify-content,
#address {
    color: blue;
    font-weight: 500;
    font-size: 15px;
}
</style>