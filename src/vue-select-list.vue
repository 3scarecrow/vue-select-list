<template>
  <div class="vsl" :style="{ height: listHeight }">
    <div v-if="loading">
      <slot name="loading">
        <div class="vsl--loading">
          {{ loadingText }}
        </div>
      </slot>
    </div>
    <div v-else>
      <div v-if="internalData.length">
        <virtual-list
          :style="{ height: listHeight, 'overflow-y': 'auto' }"
          v-bind="mergeProps"
        >
          <div
            v-for="(item, index) in internalData"
            :key="item[dataKey]"
            :class="[
              'vsl__item',
              `vsl__item--${multiple ? 'multiple' : 'single'}`
            ]"
            :style="{ height: itemHeight + 'px' }"
            @click="onClick(item)"
          >
            <slot v-bind="{ index, data: item }">
              <span class="vsl__item__label">{{ item.label }}</span>
              <span class="vsl__item__icon">
                <span v-if="multiple">
                  <input type="checkbox" :checked="item.selected" />
                </span>
                <span v-else>
                  <input type="radio" :checked="item.selected" />
                </span>
              </span>
            </slot>
          </div>
        </virtual-list>
      </div>
      <div v-else>
        <slot name="empty">
          <div class="vsl--empty">{{ emptyText }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import VirtualList from "vue-virtual-scroll-list";
import { isArray, isFunction, isPromise, parseUnit } from "./utils";

export default {
  name: "VueSelectList",

  components: {
    VirtualList
  },

  model: {
    prop: "value",
    event: "change"
  },

  props: {
    height: {
      type: [Number, String]
    },
    options: {
      type: [Array, Promise, Function],
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    dataKey: {
      type: String,
      default: "value"
    },
    value: {
      type: [String, Number, Array]
    },
    itemHeight: {
      type: Number,
      default: 50
    },
    itemRemain: {
      type: Number,
      default: 10
    },
    itemBench: {
      type: Number,
      default: 10
    },
    loadingText: {
      type: String,
      default: "Loading..."
    },
    emptyText: {
      type: String,
      default: "No Result"
    }
  },

  data() {
    return {
      loading: false,
      listHeight: 0,
      internalValue: this.multiple ? [] : "",
      internalData: []
    };
  },

  computed: {
    getValue() {
      const val = this.internalValue;
      return isArray(val) ? [...val] : val;
    },
    mergeProps() {
      return {
        size: this.itemHeight,
        remain: this.itemRemain,
        bench: this.itemBench
      };
    }
  },

  watch: {
    height: {
      handler() {
        this.calcListHeight();
      },
      immediate: true
    },
    value: {
      handler(val) {
        this.normalizeValue(val);
        this.updateSelectedStatus(this.internalValue);
      },
      immediate: true
    },
    options: {
      handler() {
        this.initData();
      },
      immediate: true
    }
  },

  methods: {
    calcListHeight() {
      this.listHeight = parseUnit(
        this.height || this.itemHeight * this.itemRemain
      );
    },
    async initData() {
      let tempData = [];
      const options = this.options;
      if (isArray(options)) {
        tempData = options;
      } else if (isFunction(options) || isPromise(options)) {
        this.loading = true;
        const result = isPromise(options) ? await options : await options();
        if (isArray(result)) {
          tempData = result;
          this.loading = false;
        }
      }
      this.internalData = tempData.map(item => ({
        ...item,
        selected: !!item.selected
      }));
      this.updateSelectedStatus();
    },
    normalizeValue(val) {
      if (this.multiple) {
        this.internalValue = isArray(val) ? [...val] : [val];
      } else {
        this.internalValue = val;
      }
    },

    updateSelectedStatus() {
      const value = this.getValue;
      const values = isArray(value) ? value : [value];
      this.internalData.forEach(item => {
        item.selected = values.includes(item[this.dataKey]);
      });
    },
    onClick(data) {
      const key = data[this.dataKey];
      if (this.multiple) {
        const item = this.internalData.find(item => item[this.dataKey] === key);
        if (item.selected) {
          const index = this.internalValue.indexOf(key);
          this.internalValue.splice(index, 1);
        } else {
          this.internalValue.push(key);
        }
        item.selected = !item.selected;
      } else {
        this.internalData.forEach(item => {
          item.selected = item[this.dataKey] === key;
        });
        this.internalValue = key;
      }
      this.$emit("change", this.getValue, data);
    }
  }
};
</script>
<style lang="less" scoped>
.vsl {
  .vsl--loading,
  .vsl--empty {
    color: #969799;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
  }
  .vsl__item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    line-height: 24px;
    font-size: 14px;

    &::after {
      position: absolute;
      box-sizing: border-box;
      content: "";
      pointer-events: none;
      right: 0;
      bottom: 0;
      left: 0;
      border-bottom: 1px solid #ebedf0;
      transform: scaleY(0.5);
    }
  }
}
</style>
