<template>
    <h2>
        Let your articles to be
        <div class="mask">
            <span class="caption" data-show>censorship-resistant.</span>
            <span class="caption">distributed.</span>
            <span class="caption">permanent.</span>
            <span class="caption">valuable.</span>
        </div>
    </h2>
</template>

<script lang="ts" setup>
setInterval(function () {
    const show = document.querySelector('span[data-show]')
    const next = show?.nextElementSibling || document.querySelector('span.caption:first-child')

    const up = document.querySelector('span[data-up]')
    if (up) {
        up.removeAttribute('data-up')
    }

    show?.removeAttribute('data-show')
    show?.setAttribute('data-up', '')

    next?.setAttribute('data-show', '')
}, 2000)
</script>

<style scoped>
:root {
    --offset: 6px;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

h2 {
    width: 980px;
    font-size: 100px;
    font-weight: 20000;
    line-height: 1.06;
    letter-spacing: -0.02em;
    color: #1d1d1f;
}

.mask {
    height: 106px;
    position: relative;
    overflow: hidden;
    margin-top: var(--offset);
}

.mask span {
    display: block;
    box-sizing: border-box;
    position: absolute;
    top: 100px;
    padding-bottom: var(--offset);

    background-size: 100% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-repeat: no-repeat;
}

.mask span[data-show] {
    transform: translateY(-100%);
    transition: .5s transform ease-in-out;
}

.mask span[data-up] {
    transform: translateY(-200%);
    transition: .5s transform ease-in-out;
}

.mask span:nth-child(1) {
    background-image: linear-gradient(45deg, #0ecffe 50%, #07a6f1);
}

.mask span:nth-child(2) {
    background-image: linear-gradient(45deg, #18e198 50%, #0ec15d);
}

.mask span:nth-child(3) {
    background-image: linear-gradient(45deg, #8a7cfb 50%, #633e9c);
}

.mask span:nth-child(4) {
    background-image: linear-gradient(45deg, #fa7671 50%, #f45f7f);
}

.mask {
    margin-top: 30px;
}
</style>