import Arweave from "arweave";

const arweave = Arweave.init({});

export async function deployArticle(content: string) {
    let tx = await arweave.createTransaction({ data: content });
    tx.addTag('App-Name', 'perma');
    tx.addTag('Content-Type', 'text/html');
    tx.addTag('Version', '0.0.1');
    tx.addTag('Type', 'sync');

    await arweave.transactions.sign(tx);
    let uploader = await arweave.transactions.getUploader(tx);

    while (!uploader.isComplete) {
        await uploader.uploadChunk();
        console.log(uploader.uploadedChunks / uploader.totalChunks)
    }

    return tx.id
}