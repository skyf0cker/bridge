<template>
    <a-list class="demo-loadmore-list" :loading="initLoading || loading" item-layout="horizontal"
        :data-source="postList">
        <template #loadMore>
            <div :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
                <a-button @click="handleLoadMore()">loading more</a-button>
            </div>
        </template>
        <template #renderItem="{ item }">
            <a-list-item>
                <template #actions>
                    <loading-outlined
                        v-if="(store.state.article.previewLoading || store.state.article.syncLoading) && item.id === clickArticleId">
                    </loading-outlined>
                    <a key="list-loadmore-edit" @click="handleSync(item.id)">sync</a>
                    <a key="list-loadmore-more" @click="handlePreview(item.id)">preview</a>
                </template>
                <a-skeleton :title="false" :loading="false" active>
                    <a-list-item-meta :description="item.description">
                        <template #title>
                            <a :href="item.url">{{ item.title }}</a>
                        </template>
                    </a-list-item-meta>
                </a-skeleton>
            </a-list-item>
        </template>
    </a-list>
</template>
<script lang="ts" setup>
import { getUserArticles, getArticleDetail, Sync, getSyncInfo } from '@/appwrite';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { articleInfo, articleDetail, articleSyncInfo } from '@/appwrite/types'
import { notification } from 'ant-design-vue'
import { deployArticle } from '@/arweave';
import { allState } from "@/store";
import { LoadingOutlined } from "@ant-design/icons-vue";

const store = useStore<allState>();
const postList = ref<articleInfo[]>([]);
const initLoading = ref(true);
const loading = ref(false);
let currentPage = 1;

const handleGetArticleResp = (res: string) => {
    const posts: articleInfo[] = JSON.parse(res);
    if (posts.length === 0) {
        notification["info"]({
            message: "Articles Fetching Tips",
            description: "there are no more articles."
        })
        return
    }
    postList.value.push(...posts);
}

onMounted(() => {
    getUserArticles(store.state.login.devtoUsername, currentPage).then(res => {
        handleGetArticleResp(res);
        initLoading.value = false;
    }).catch(err => console.log(err.message));
})

const handleLoadMore = () => {
    loading.value = true;
    currentPage++;

    getUserArticles(store.state.login.devtoUsername, currentPage).then(res => {
        handleGetArticleResp(res)
        loading.value = false;
    });
}

const clickArticleId = ref(0);

const handlePreview = async (articleId: number) => {
    clickArticleId.value = articleId;
    store.commit("setPreviewLoading", true);
    try {
        const res = await getArticleDetail(articleId)
        const detail: articleDetail = JSON.parse(res);
        store.commit("setCurPreviewArticleId", articleId);
        store.commit("setCurPreviewArticleContent", decodeURIComponent(
            escape(detail.body_html)
        ));

        const infos = await getSyncInfo(articleId)
        const info = infos[0]
        if (info.arweaveAddress.length !== 0) {
            store.commit("setSync", true)
            store.commit("setPreviewArweaveAddress", info.arweaveAddress)
        }
    } catch (err: any) {
        console.log(err);
        const key = "getArticleDetailFailed"
        notification["error"]({
            message: "get article detail failed",
            description: err,
            key: key,
            onClick: () => {
                notification.close(key)
            },
        })
    }
    store.commit("setPreviewLoading", false)
}

const handleSync = async (articleId: number) => {
    if (store.state.article.isSynced) {
        const key = "articleSyncInfo"
        notification["info"]({
            key: key,
            message: "this article has been synced.",
            onClick: () => notification.close(key),
        })
        return
    }

    store.commit("setSyncLoading", true)
    let content = ""
    if (store.state.article.curPreviewArticleId === articleId
        && !store.state.article.previewLoading
        && store.state.article.curPreviewArticleContent !== "") {
        content = store.state.article.curPreviewArticleContent
    } else {
        await handlePreview(articleId)
        await handleSync(articleId)
    }

    try {
        if (content.length > 0) {
            const key = "sync success notify"
            const id = await deployArticle(content)

            await Sync({
                articleId: articleId,
                devtoUsername: store.state.login.devtoUsername,
                ownerAddress: store.state.login.activeAddress,
                address: id,
            })
            notification["success"]({
                key: key,
                message: "sync success",
                description: `article address: ${id}`,
                onClick: () => notification.close(key),
            })
        }
    } catch (err) {
        let errMsg = ""
        if (err instanceof Error) {
            errMsg = err.message
        }

        const key = "syncFailed"
        notification["error"]({
            message: "sync failed",
            description: errMsg,
            key: key,
            onClick: () => notification.close(key),
        })
    }

    store.commit("setSyncLoading", false)
}

</script>

<style scoped>
.demo-loadmore-list {
    min-height: 350px;
}
</style>