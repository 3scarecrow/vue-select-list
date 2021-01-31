<template>
  <div id="app">
    <vue-select-list :data="data" :height="400" v-model="value" multiple />
    <vue-select-list :data="data" :height="300" v-model="value1" />
  </div>
</template>

<script>
import VueSelectList from "./components/vue-select-list.vue";

export default {
  name: "App",
  components: {
    VueSelectList
  },
  data() {
    return {
      value: [1, 3],
      value1: 3,
      data: [...Array(500).keys()].map(val => ({
        label: `label ${val}`,
        value: val
      }))
    };
  }
};
</script>

<style lang="less"></style>
