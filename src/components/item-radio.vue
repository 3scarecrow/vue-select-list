<template>
  <div class="vsp__item__radio">
    <slot>
      <span>{{ source.label }}</span>
      <!-- <icon-selected v-if="!source.selected" /> -->
      <svg-icon :name="source.selected ? 'selected' : 'unselected'"></svg-icon>
      <!-- <input type="radio" :checked="source.selected" /> -->
    </slot>
  </div>
</template>

<script>
// import IconSelected from '@/components/icons/icon-selected.vue'
export default {
  name: "ItemRadio",

  // components: {
  //   IconSelected
  // },

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

<style lang="less" scoped>
.vsp__item__radio {
}
/deep/.van-cell__title {
  &::after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    right: 16px;
    bottom: 0;
    left: 16px;
    border-bottom: 1px solid #ebedf0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
</style>
