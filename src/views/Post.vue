<script setup lang="ts">
import { postsUrl, usersUrl } from '@/constants/apiEndpoints'
import type { Post } from '@/types/post'
import type { User } from '@/types/user'
import { useFetch } from '@vueuse/core'
import { computed, shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'

const { params } = useRoute()
const url = `${postsUrl}/${params.id}`

const { data: post, isFetching: isFetchingPost, error: errorPost } = useFetch<Post>(url).json()

const userUrl = shallowRef('')

const {
  data: user,
  isFetching: isFetchingUser,
  error: errorUser,
} = useFetch<User>(userUrl, { refetch: true, immediate: false }).json()

const isFetching = computed(() => isFetchingPost.value || isFetchingUser.value)
const error = computed(() => {
  if (errorPost.value) {
    return errorPost instanceof Error ? errorPost.message : 'Error retrieving a post.'
  }

  if (errorUser.value) {
    return errorUser instanceof Error ? errorUser.message : 'Error retrieving a user.'
  }

  return ''
})

watch(
  () => ({ ...post.value }),
  ({ userId = undefined }) => (userUrl.value = userId ? `${usersUrl}/${userId}` : ''),
)
</script>

<template>
  <div v-if="isFetching" class="text-center my-10">Loading...</div>
  <div v-if="error" class="text-center my-10">{{ error }}</div>
  <div v-if="post && user" class="mb-10">
    <h1 class="text-3xl">{{ post.title }}</h1>
    <div class="text-gray-500 mb-10">by {{ user?.name }}</div>
    <div class="mb-10">{{ post.body }}</div>
  </div>
</template>
