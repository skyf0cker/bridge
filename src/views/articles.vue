<template>
    <div id="articles">
        <a-row id="article-row" :gutter="16" justify="space-around">
            <a-col class="article-col" :span="8">
                <a-card id="article-list" :bordered="false">
                    <template #title>👋 Your Articles</template>
                    <article-list id="article-list-inner"></article-list>
                </a-card>
            </a-col>
            <a-col class="article-col" :span="14">
                <a-card id="article-preview" :bordered="false" :loading="previewLoading">
                    <template #title>
                        <div id="preview-header">
                            <span>
                                🔎 Preview
                            </span>
                            <span id="header-icons">
                                <span id="viewblock-icon">
                                    <a-tooltip placement="topLeft">
                                        <template #title>
                                            View in viewblocks
                                        </template>
                                        <cloud-two-tone v-if="store.state.article.isSynced" two-tone-color="#52c41a" @click="handleViewBlock()" />
                                    </a-tooltip>
                                </span>
                                <span id="sync-icon">
                                    <a-tooltip placement="topLeft">
                                        <template #title>
                                            Article has been synced
                                        </template>
                                        <check-circle-two-tone v-if="store.state.article.isSynced"
                                            two-tone-color="#52c41a" />
                                    </a-tooltip>
                                </span>
                            </span>
                        </div>
                    </template>
                    <div id="preview" v-html="previewContent"></div>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts" setup>
import ArticleList from "@/components/articleList.vue";
import { computed } from "vue";
import { useStore } from 'vuex';
import { CheckCircleTwoTone, CloudTwoTone } from '@ant-design/icons-vue'
import { allState } from "@/store";

const store = useStore<allState>();
const previewContent = computed(() => store.state.article.curPreviewArticleContent)
const previewLoading = computed(() => store.state.article.previewLoading)

const handleViewBlock = () => {
    const address = store.state.article.previewArweaveAddress;
    const vbUrl = `https://viewblock.io/arweave/tx/${address}`
    window.open(vbUrl)
}

</script>

<style>
#articles {
    background-color: #ececec;
    padding: 20px;
    height: 92%;
    width: 100%;
    margin: 0 auto 0 auto;
}

#article-row {
    height: 100%;
}

#article-list,
#article-preview {
    height: 100%;
    overflow-y: auto;
}

.article-col {
    height: 100%;
}

#preview {
    width: 100%;
    overflow-x: hidden;
}

.ant-card-head {
    position: sticky;
    background-color: white !important;
    top: 0;
    z-index: 99;
}

#preview-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

#header-icons {
    width: 10%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>