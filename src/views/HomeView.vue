<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1 :style="colorCounter">{{ title }}: {{ counter }}</h1>
    <button @click="actionIncrement">Add +10</button> &nbsp;
    <ButtonDecrease />
    <hr />
    <ButtonAction :state="true" /> &nbsp;
    <ButtonAction :state="false" />
  </div>
</template>

<script>
// @ is an alias to /src
import ButtonAction from '@/components/ButtonAction.vue';
import ButtonDecrease from '@/components/ButtonDecrease.vue';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    ButtonDecrease,
    ButtonAction
  },
  data() {
return {
  title: 'My counter Vuex'
}
  },
  methods: {
    ...mapMutations(['increment']),
    ...mapActions(['actionIncrement'])
  },
  computed: {
    ...mapState(['counter']),
    colorCounter() {
      return [this.counter > 100 ? {'color': 'green'} : {'color': 'red'}]
    }
  }
}
</script>
