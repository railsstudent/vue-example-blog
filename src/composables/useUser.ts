import type { User } from '@/types/user'
import { ref } from 'vue'

export function useUser() {
  const user = ref<User | null>(null)

  function fetchOne(id: number, signal: AbortSignal) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { signal })
      .then((response) => response.json() as Promise<User>)
      .then((data) => (user.value = data))
  }

  return {
    user,
    fetchOne,
  }
}
