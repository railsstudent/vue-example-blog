import {reactive, computed} from 'vue'

const activeRequests = reactive([] as string[])

export function usePageRequests() {
    const isLoading = computed(() => {
        console.log('isLoading', !!activeRequests.length)
        return !!activeRequests.length
    })

    async function makeRequest(url: string, signal?: AbortSignal) {
        const index = activeRequests.length

        console.log("makeRequest index ->", index, activeRequests.length)

        try {
            activeRequests[index] = url
            const response =  await fetch(url, { signal })
            return await response.json()
        } catch (err) {
            alert(err)
            return undefined
        } finally {
            activeRequests.splice(index, 1)
        }
    }

    return {
        isLoading,
        makeRequest,
    }
}