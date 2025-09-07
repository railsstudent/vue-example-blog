import type { Post } from '@/types/post'
import { ref } from 'vue'

export function usePost() {
  const posts = ref<Post[]>([])

  function fetchAll() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json() as Promise<Post[]>)
      .then((data) => (posts.value = data))
  }

  return {
    posts,
    fetchAll,
  }
}
