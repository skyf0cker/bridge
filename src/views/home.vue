<template>
    <div id="home">
        <scroll-screen id="scroll"></scroll-screen>
    </div>
</template>

<script lang="ts">
import ScrollScreen from "@/components/scrollScreen.vue";

export default {
    components: {
        ScrollScreen,
    }
}
</script>

<style>
#home {
    height: 92vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
}

#scroll { 
    position: absolute;
    top: 20%;
}
</style>
