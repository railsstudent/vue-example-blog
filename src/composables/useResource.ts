import { ref } from 'vue'

export function useResource<T>(resource: string) {
  const items = ref<T[]>([])
  const item = ref<T | null>(null)

  const baseUrl = `https://jsonplaceholder.typicode.com/${resource}`

  function fetchAll(signal?: AbortSignal) {
    return fetch(baseUrl, { signal })
      .then((response) => response.json() as Promise<T[]>)
      .then((data) => (items.value = data))
      .catch((err) => alert(err))
  }

  function fetchOne(id: number, signal?: AbortSignal) {
    return fetch(`${baseUrl}/${id}`, { signal })
      .then((response) => response.json() as Promise<T>)
      .then((data) => (item.value = data))
      .catch((err) => alert(err))
  }

  return {
    items,
    item,
    fetchAll,
    fetchOne,
  }
}
