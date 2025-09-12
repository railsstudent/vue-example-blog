<script setup lang="ts">
import type { Post } from '@/types/post'

const { post } = defineProps<{ post: Post }>()
</script>

<template>
  <div
    class="flex m-2 gap-2 items-center shadow-md w-1/4 flex-grow rounded overflow-hidden"
    style="border: 1px solid #eee"
  >
    <img src="https://placehold.co/150" style="background: #cccccc" width="150" height="150" />
    <router-link :to="{ name: 'Post', params: { id: post.id } }">
      {{ post.title }}
    </router-link>
  </div>
</template>
