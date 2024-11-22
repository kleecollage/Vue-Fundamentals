<template>
  <h1>Posts Page</h1>
  <CardMain
    v-for="{id, body, title} of posts"
    :key="id"
    :title="title"
    :body="body"
    :id="id"
  />
</template>

<script setup lang="ts">
import type { Post } from '@/interfaces/post.type';

const { data: posts } = await useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts')
console.log(posts.value)
</script>