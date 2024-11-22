<template>
  <Title text="This is the Blog page"/>
  <!-- <button @click="consumeApi">Consume API</button> -->
  <pre v-for="item in arrayBlog" :key="item.id">
    <router-link :to="`/blog/${item.id}`">
      {{ item.title }}
    </router-link>
  </pre>
  <pre></pre>
</template>

<script>
import Title from '@/components/Title.vue';
export default {
  components: {
    Title
  },
  data() {
    return {
      arrayBlog: []
    }
  },
  methods: {
    async consumeApi() {
      try {
        const data = await fetch('https://jsonplaceholder.typicode.com/posts');
        const array = await data.json();
        this.arrayBlog = array
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.consumeApi()
  }
}
</script>