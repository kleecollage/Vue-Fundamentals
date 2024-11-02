<script setup>
import { ref, computed, onMounted } from "vue";

import BlogPost from './components/BlogPost.vue';
import ButtonCounter from './components/ButtonCounter.vue';
import PaginatePost from "./components/PaginatePost.vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";

const posts = ref([]);
const postXpage = 10;
const inicio = ref(0);
const fin = ref(postXpage);
const loading = ref(true);

const favorito = ref('')
const cambiarFavorito = (title) => {
  favorito.value = title
};

const next = () => {
  inicio.value += postXpage
  fin.value += postXpage
};

const previous = () => {
  inicio.value -= postXpage
  fin.value -= postXpage
};

onMounted(async() => {
  loading.value = true;
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    posts.value = await res.json()
  } catch (error) {
    console.log(error)
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 1500);
  }
});

// fetch('https://jsonplaceholder.typicode.com/posts')
//   .then(res => res.json())
//   .then(data => posts.value = data )
//   .catch((e) => console.log(e))
//   .finally(() => {
//     setTimeout(() => {
//       loading.value = false
//     }, 1500);
//   });

const maxLength = computed(() => posts.value.length )

</script>

<template>
  <LoadingSpinner v-if="loading" />
  <div class="container" v-else>
    <h1>My First Vue App</h1>
    <h2>Mis Posts Favoritos: {{ favorito }}</h2>
    
    <PaginatePost 
      @next="next"
      @prev="previous"
      :inicio="inicio"
      :fin="fin"
      :maxLength = "maxLength"
    />
    
    <BlogPost
      v-for="post in posts.slice(inicio, fin)"
      :key="post.id"
      :title="post.title"
      :id="post.id"
      :body="post.body"
      :cambiarFavorito="cambiarFavorito"
    ></BlogPost>
    
    <!--
    <ButtonCounter />
    <ButtonCounter />
    <BlogPost color-text="primary" title="Post 1" id="1" body="lorem ipsum" />
    <BlogPost color-text="secondary" title="Post 2" id="2" body="Lorem ipsum dolor sit amet." />
    <BlogPost color-text="danger" title="Post 3" id="3" body="Lorem ipsum, dolor sit amet consectetur adipisicing." />
    <BlogPost color-text="success" title="Post 4" id="4" body="Lorem ipsum, dolor sit amet consectetur adipisicing." /> 
    <BlogPost title="Post 5" id="4" body="Lorem ipsum, dolor sit amet consectetur adipisicing." />
    <BlogPost title="Post 6" id="5" />
    -->



  </div>
</template>

<!-- 
<script>
  export default {
    data() {
      return {
        counter: 0
      }
    },
    methods: {
      increment() {
        this.counter++
      },
    },
  };
</script>

<script>
 import { ref } from 'vue'
    -- Declarar setup en el script hace la siguiente operacion --
   export default{
     setup(){
       const counter = ref(0);
       const increment = () => {
         counter.value ++
       }
       return {
         counter,
         increment,
       };
     },
   };
</script> !-->


<style scoped></style>
