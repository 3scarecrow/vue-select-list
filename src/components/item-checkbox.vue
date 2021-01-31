<template>
  <div class="vue-select-panel__item__checkbox">
    <slot v-bind="{ data: source }">
      <input type="checkbox" :checked="source.selected" />
      <span>{{ source.label }}</span>
    </slot>
  </div>
</template>

<script>
export default {
  name: "ItemCheckbox",

  props: {
    index: {
      type: Number
    },
    source: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style></style>
