<template>
    <div id="index-header">
        <div id="left-header">
            <div id="logo-font" @click="backToHome()">bridge</div>
            <div id="alpha-logo">alpha</div>
        </div>
        <div id="right-header">
            <div class="right-header-items">
                <router-link class="router-link-active" to="/">Home</router-link>
            </div>
            <div class="right-header-items">
                <router-link class="router-link-active" to="/articles">Articles</router-link>
            </div>
            <div class="right-header-items">
                <router-link class="router-link-active" to="/explore">Explore</router-link>
            </div>
            <div class="right-header-items">
                <router-link class="router-link-active" to="/dashboard">Dashboard</router-link>
            </div>
            <div>
                <a-button v-if="!isUserLogin || !isVerified" id="login-btn" type="primary" shape="round" size="large" @click="handleLogin()">
                    Register / Login
                </a-button>
                <identicon @click="handleClickIdenticon()"></identicon>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from "vuex";
import Identicon from "@/components/identicon.vue";

const router = useRouter()
const store = useStore()

const isUserLogin = computed(() => store.state.login.isUserLogin)
const isVerified = computed(() => store.state.login.isVerified)

const handleLogin = () => {
    router.push({
        name: "login"
    })
}

const handleClickIdenticon = () => {
    if (isUserLogin && isVerified) {
        router.push({
            name: "login"
        })
    }
}

const backToHome = () => {
    router.push({
        name: "home"
    })
}
</script>

<style>
#index-header {
    width: 100%; 
    height: 8%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-shadow: 0 0 10px rgb(0 0 0 / 7%);
}

#left-header {
    margin: 0 0 0 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    width: 30%;
}

#logo-font {
    font-family: Product Sans;
    font-weight: 700;
    font-size: 28px;
}

#right-header {
    margin: 0 80px 0 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.router-link-active {
    text-decoration: none;
    color: rgba(0, 0, 0, .6);
}

.right-header-items {
    color: rgba(0, 0, 0, .6);
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0;
    margin-right: 45px;
}

#alpha-logo {
    background: #0786ff;
    border-radius: 29px;
    color: white;
    height: 40%;
    width: 12%;
    font-weight: 500;
    text-align: center;
    margin-left: 2px;
}

#login-btn {
    font-weight: 700;
}
</style>