<script setup lang="ts">
const post = {
  title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
}
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
