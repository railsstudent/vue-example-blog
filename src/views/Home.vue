<script setup lang="ts">
import PostCard from '@/components/PostCard.vue';
import { postsUrl } from '@/constants/apiEndpoints';
import type { Post } from '@/types/post';
import { useFetch } from '@vueuse/core';

const {
  data: posts,
  isFetching,
  error,
} = useFetch<Post[]>(postsUrl).json()
</script>

<template>
  <div v-if="isFetching" class="text-center mb-10">Loading ...</div>
  <div v-if="error" class="text-center mb-10">{{ error }}</div>
  <div v-if="posts" class="flex flex-wrap flex-grow">
    <p class="ml-2 w-full">Number of posts: {{ posts.length }}</p>
    <PostCard v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>
