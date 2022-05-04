<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineComponent } from '@vue/runtime-core';
import Navigate from '@/components/navigate.vue'

export default defineComponent({
    components: {
        Navigate
    }
})

</script>

<template>
    <div id="app-items">
        <Navigate></Navigate>
        <router-view></router-view>
    </div>
</template>

<style>
#app-items {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
}
</style>

