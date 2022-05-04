import { sleep } from '@/utils';
import { Appwrite } from 'appwrite'
import { commonResp, syncParams, documentCommonResp, articleSyncInfo } from './types';

const appwrite = new Appwrite();

appwrite
    .setEndpoint("http://localhost:8081/v1")
    .setProject("62723ccbd8829654b529");

export async function createAnonymousSession() {
    try {
        return await appwrite.account.get()
    } catch (err) {
        return await appwrite.account.createAnonymousSession()
    }
}

export async function getUserArticles(username: string, pageNum: number) {
    const funcId = "62723d080002a036b25b";
    let ps = {
        idx: 0,
        method: "getUserArticles",
        username: username,
        perPage: 3,
        pageNum: pageNum
    }
    let payload = JSON.stringify(ps);

    let execution = await appwrite.functions.createExecution(funcId, payload);
    while (true) {
        const resp = await appwrite.functions.getExecution(funcId, execution.$id)
        if (resp.status == "completed") {
            const scr: commonResp = JSON.parse(resp.stdout)
            if (scr.status !== "success") {
                console.log(scr.msg)
                throw new Error(scr.msg);
            }

            if (scr.data?.isAll) {
                return scr.data.result;
            }

            ps.idx++
            payload = JSON.stringify(ps)
            execution = await appwrite.functions.createExecution(funcId, payload);
        }

        if (resp.status == "failed") {
            return resp.stderr;
        }

        await sleep(0.5);
    }
}

export async function getArticleDetail(articleId: number) {
    const funcId = "62723d080002a036b25b";
    let ps = {
        method: "getArticleDetail",
        articleId: articleId,
        idx: 0,
    }
    let payload = JSON.stringify(ps);

    let execution = await appwrite.functions.createExecution(funcId, payload);
    let result = ""

    while (true) {
        const resp = await appwrite.functions.getExecution(funcId, execution.$id)
        if (resp.status == "completed") {
            const scr: commonResp = JSON.parse(resp.stdout)
            if (scr.status !== "success") {
                throw new Error(scr.msg);
            }

            result += scr.data?.result

            if (scr.data?.isAll) {
                return result;
            }

            ps.idx++
            payload = JSON.stringify(ps)
            execution = await appwrite.functions.createExecution(funcId, payload);
        }

        if (resp.status == "failed") {
            return resp.stderr;
        }

        await sleep(0.5);
    }
}

export async function Verify(username: string, verifyHash: string) {
    const funcId = "62723d080002a036b25b";
    const execution = await appwrite.functions.createExecution(funcId, JSON.stringify({
        method: "verify",
        username: username,
        verifyHash: verifyHash,
    }));

    while (true) {
        const resp = await appwrite.functions.getExecution(funcId, execution.$id)
        if (resp.status == "completed") {
            const scr: commonResp = JSON.parse(resp.stdout)
            if (scr.status !== "success") {
                throw new Error(scr.msg);
            }

            if (!scr.data?.result) {
                throw new Error(scr.msg);
            }

            return scr.data.result
        }

        if (resp.status == "failed") {
            return resp.stderr;
        }

        await sleep(0.5);
    }

}

export async function Sync(syncParams: syncParams) {
    const funcId = "62723d080002a036b25b";
    const execution = await appwrite.functions.createExecution(funcId, JSON.stringify({
        method: "sync",
        articleId: syncParams.articleId,
        arweaveAddress: syncParams.address,
        ownerAddress: syncParams.ownerAddress,
        username: syncParams.devtoUsername,
    }));

    while (true) {
        const resp = await appwrite.functions.getExecution(funcId, execution.$id)
        if (resp.status == "completed") {
            const scr: commonResp = JSON.parse(resp.stdout)
            if (scr.status !== "success") {
                throw new Error(scr.msg);
            }

            if (!scr.data?.result) {
                throw new Error(scr.msg);
            }

            return scr.data.result
        }

        if (resp.status == "failed") {
            return resp.stderr;
        }

        await sleep(0.5);
    }
}

export async function getSyncInfo(articleId: number) {
    const funcId = "62723d080002a036b25b";
    const execution = await appwrite.functions.createExecution(funcId, JSON.stringify({
        method: "getSyncInfo",
        articleId: articleId,
    }));

    while (true) {
        const resp = await appwrite.functions.getExecution(funcId, execution.$id)
        if (resp.status == "completed") {
            const scr: commonResp = JSON.parse(resp.stdout)
            if (scr.status !== "success") {
                throw new Error(scr.msg);
            }

            if (!scr.data?.result) {
                throw new Error(scr.msg);
            }

            const cr: documentCommonResp<articleSyncInfo> = JSON.parse(scr.data.result)
            return cr.documents 
        }

        if (resp.status == "failed") {
            throw new Error(resp.stderr);
        }

        await sleep(0.5);
    }
}