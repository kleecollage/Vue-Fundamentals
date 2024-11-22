<template>
  <h1>Post Page id: {{ id }} </h1>
  <h2>{{ post?.title }}</h2>
  <p>{{ post?.body }}</p>
</template>

<script setup lang="ts">
import type { Post } from '~/interfaces/post.type';

// const route = useRoute();
const { id } = useRoute().params;
const { data: post } = await useFetch<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)
</script>