<template>
  <div id="demo">
    <vue-select-list :options="options" :height="400" v-model="value" />
    <vue-select-list
      :options="asyncOptions"
      height="300"
      v-model="value1"
      multiple
    />
  </div>
</template>
<script>
import VueSelectList from '../src'
export default {
  name: 'App',
  components: {
    VueSelectList
  },
  data() {
    const options = [...Array(500).keys()].map((val) => ({
      label: `label ${val}`,
      value: val
    }))
    return {
      value: 3,
      value1: [1, 3],
      options,
      asyncOptions: new Promise((resolve) => {
        setTimeout(() => {
          resolve(options)
        }, 5000)
      })
    }
  }
}
</script>
