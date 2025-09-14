<script setup lang="ts">
import type { Post } from '@/types/post'
import type { User } from '@/types/user'
import { useFetch } from '@vueuse/core'
import { computed, shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'

const baseUrl = 'https://jsonplaceholder.typicode.com'

const { params } = useRoute()
const url = `${baseUrl}/posts/${params.id}`

const { data: post, isFetching: isFetchingPost, error: errorPost } = useFetch<Post>(url).json()

const userUrl = shallowRef('')

const {
  data: user,
  isFetching: isFetchingUser,
  error: errorUser,
} = useFetch<User>(userUrl, { refetch: true, immediate: false }).json()

const isFetching = computed(() => isFetchingPost.value || isFetchingUser.value)

watch(
  () => ({ ...post.value }),
  ({ userId = undefined }) => (userUrl.value = userId ? `${baseUrl}/users/${userId}` : ''),
)
</script>

<template>
  <div v-if="isFetching" class="text-center my-10">Loading...</div>
  <div v-if="errorPost || errorUser" class="text-center my-10">
    Error{{ errorPost || errorUser }}
  </div>
  <div v-if="post && user" class="mb-10">
    <h1 class="text-3xl">{{ post.title }}</h1>
    <div class="text-gray-500 mb-10">by {{ user?.name }}</div>
    <div class="mb-10">{{ post.body }}</div>
  </div>
</template>
