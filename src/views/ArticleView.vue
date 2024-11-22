<template>
  <Title text="Route with parameters" />
  <h2>Parameter: {{ $route.params.id }}</h2>
  <h3> {{  article.title }}</h3>
  <p> {{ article.body }} </p>
  <p> {{ article.id }} </p>
</template>

<script>
import Title from '@/components/Title.vue';

export default {
  components: {
    Title
  },
  data() {
    return {
      article: {}
    }
  },
  methods: {
    async consumeArticle() {
      try {
        const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`)
        const object = await data.json()
        this.article = object;
      } catch (error) {
        console.log(error)
      }
    },
  },
  created() {
    this.consumeArticle();
  },
}
</script>