export async function sleep(sec: number) {
    return new Promise<void>((resolve, reject) => setTimeout(() => resolve(), sec * 1000)) 
}