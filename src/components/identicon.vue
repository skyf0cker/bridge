<template>
<img id="identicon">
</template>

<script lang="ts" setup>
import { onMounted, watch } from "vue";
import { useStore } from "vuex";
import Identicon from "identicon.js";
import SparkMD5 from "spark-md5";

const store = useStore()

const generateIdenticon = (username: string) => {
    const hash = SparkMD5.hash(username)
    return new Identicon(hash).toString()
}

onMounted(() => {
    if (store.state.login.devtoUsername.length !== 0) {
        const text = generateIdenticon(store.state.login.devtoUsername);
        const node = document.getElementById("identicon");
        node?.setAttribute("src", `data:image/png;base64,${text}`);
        node?.setAttribute("style", `height: 36px; width: 36px;object-fit: cover;object-position: center; border-radius: 50%;box-shadow: 0 0 10px rgb(0 0 0 / 7%);`);
    }
})

watch(() => store.state.login.devtoUsername, (newVal, oldVal) => {
    if (newVal.length > 0) {
        const text = generateIdenticon(newVal)
        const node = document.getElementById("identicon")
        node?.setAttribute("src", `data:image/png;base64,${text}`)
        node?.setAttribute("style", `height: 36px; width: 36px;object-fit: cover;object-position: center; border-radius: 50%;box-shadow: 0 0 10px rgb(0 0 0 / 7%);`)
    }
}, {immediate: true})
</script>

<style>
#identicon-wrap {
    height: 100%;
    width: 100%;
}
</style>