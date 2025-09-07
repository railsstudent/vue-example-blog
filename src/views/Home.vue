<script setup lang="ts">
import PostCard from '../components/PostCard.vue'
import { usePost } from '@/composables/usePost'

const { posts, fetchAll } = usePost()

fetchAll()
</script>

<template>
  <div class="flex flex-wrap flex-grow">
    <PostCard v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>
