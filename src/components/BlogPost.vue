<script setup>
// const props = defineProps(['title', 'id', 'body', 'colorText']);
// console.log(props.title)
// console.log(props.id)

defineProps({
  title: String,
  id: Number,
  body: {
    type: String,
    default: "Sin Descripcion",
  },
  cambiarFavorito: Function,
});

// emit se recomienda por encima de pasar las funciones como props
const emit = defineEmits(['cambiarFavoritoNombre']);
// emit('cambiarFavoritoNombre', title)" 
</script>

<template>
  <!-- <div class="card">
    <div class="card-body">
      <h5 class="card-title" :class="`text-${colorText}`">
        {{ id }}-{{ title }}
      </h5>
      <p>{{ body }}</p>
    </div>
  </div> -->

  <div class="card mb-2">
    <div class="card-body">
      <h5 class="card-title">
        {{ id }} - {{ title }}
      </h5>
      <p>{{ body }}</p>
      <!-- @click="$emit('cambiarFavoritoNombre', title)" -->
      <button
        @click="cambiarFavorito(title)"
        class="btn btn-outline-primary"
      >
        Favorito
      </button>
    </div>
  </div>

</template>