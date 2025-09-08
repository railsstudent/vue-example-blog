import { ref } from 'vue'
import { usePageRequests } from '@/composables/userPageRequests'

export function useResource<T>(resource: string) {
  const items = ref<T[]>([])
  const item = ref<T | null>(null)

  const baseUrl = `https://jsonplaceholder.typicode.com/${resource}`

  const { makeRequest } = usePageRequests()

  async function fetchAll(signal?: AbortSignal) {
    const data = await makeRequest(baseUrl, signal)
    items.value = (data || []) as T[]
  }

  async function fetchOne(id: number, signal?: AbortSignal) {
    const data = await makeRequest(`${baseUrl}/${id}`, signal)
    item.value = data ? (data as T) : undefined
  }

  return {
    items,
    item,
    fetchAll,
    fetchOne,
  }
}
