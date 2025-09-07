<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePost } from '@/composables/usePost'
import { useUser } from '@/composables/useUser'
import { watch } from 'vue'

const { post, fetchOne } = usePost()

const { params } = useRoute();
const postId = +params.id

fetchOne(postId)

const { user, fetchOne: fetchUser } = useUser()

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
  <div v-if="post && user" class="mb-10">
    <h1 class="text-3xl">{{ post.title }}</h1>
    <div class="text-gray-500 mb-10">by {{ user.name }}</div>
    <div class="mb-10">{{ post.body }}</div>
  </div>
</template>
