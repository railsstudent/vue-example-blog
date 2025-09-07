<script setup lang="ts">
import PostCard from '../components/PostCard.vue'
import { useResource } from '@/composables/useResource'
import type { Post } from '@/types/post'

const { items, fetchAll } = useResource<Post>('posts')

fetchAll()
</script>

<template>
  <div class="flex flex-wrap flex-grow">
    <PostCard v-for="post in items" :key="post.id" :post="post" />
  </div>
</template>
