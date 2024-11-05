<script setup>
import { useCounterStore } from "@/store/counter";
import { storeToRefs } from "pinia";

const useCounter = useCounterStore()
// con refs no se puede hacer desestructuracion
const { increment } = useCounter
// asi se logran las desestructuraciones de refs
const { double, count } = storeToRefs(useCounter)

</script>

<template>
  <h1>Home Counter: {{ count }}</h1>
  <h2>Double: {{ double }}</h2>
  <button @click="increment">Increment</button>
  
</template>
