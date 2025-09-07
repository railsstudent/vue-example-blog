import type { Post } from '@/types/post'
import { ref } from 'vue'

export function usePost() {
  const posts = ref<Post[]>([])
  const post = ref<Post | null>(null)

  function fetchAll() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json() as Promise<Post[]>)
      .then((data) => (posts.value = data))
  }

  function fetchOne(id: number) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json() as Promise<Post>)
      .then((data) => (post.value = data))
  }

  return {
    posts,
    post,
    fetchAll,
    fetchOne,
  }
}
