<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePost } from '@/composables/usePost'

const { post, fetchOne } = usePost()

const { params } = useRoute();
const postId = +params.id
console.log(postId)

fetchOne(postId)

const user = {
  name: 'Leanne Graham',
}
</script>

<template>
  <div v-if="post && user" class="mb-10">
    <h1 class="text-3xl">{{ post.title }}</h1>
    <div class="text-gray-500 mb-10">by {{ user.name }}</div>
    <div class="mb-10">{{ post.body }}</div>
  </div>
  <a href="/" class="text-blue-500 underline mt-10 inline-block">Back to home</a>
</template>
