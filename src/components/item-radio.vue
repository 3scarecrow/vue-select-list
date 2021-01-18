<template>
  <div class="vsp__item__radio">
    <slot>
      <span>{{ source.label }}</span>
      <input type="radio" :checked="source.checked" />
    </slot>
  </div>
</template>

<script>
export default {
  name: "ItemRadio",

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
  // display: flex;
  // align-items: center;
  // height: 100%;
  // padding: 0 .625rem;
  // border-bottom: 1px solid #dfe6ee;
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
