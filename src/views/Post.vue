<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useResource } from '@/composables/useResource'
import { watch } from 'vue'
import type { Post } from '@/types/post'
import type { User } from '@/types/user'
import { usePageRequests } from '@/composables/userPageRequests'

const { isLoading } = usePageRequests()
const { item: post, fetchOne } = useResource<Post>('posts')
const { item: user, fetchOne: fetchUser } = useResource<User>('users')

const { params } = useRoute();

fetchOne(+params.id)

watch(() => ({ ...post.value }), (newPost, oldPost, onCleanup) => {
  const controller = new AbortController()

  if (newPost?.userId) {
    fetchUser(newPost.userId, controller.signal)
  }

  onCleanup(() => {
    controller.abort()
  })
})

</script>

<template>
  <div v-if="isLoading" class="text-center my-10">
    Loading...
  </div>
  <div v-if="post && user" class="mb-10">
    <h1 class="text-3xl">{{ post.title }}</h1>
    <div class="text-gray-500 mb-10">by {{ user.name }}</div>
    <div class="mb-10">{{ post.body }}</div>
  </div>
</template>
