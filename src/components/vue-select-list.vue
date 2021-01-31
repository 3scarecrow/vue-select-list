<template>
  <virtual-list
    :size="50"
    :remain="10"
    :bench="25"
    :style="{ height: height + 'px', 'overflow-y': 'auto' }"
  >
    <div
      v-for="(item, index) in internalData"
      :key="item[dataKey]"
      style="height: 50px"
      @click="onClick(item)"
    >
      <item-checkbox v-if="multiple" :source="item" :index="index">
        <slot name="item-template" v-bind="{ index, data: item }"></slot>
      </item-checkbox>
      <item-radio v-else :source="item">
        <slot name="item-template" v-bind="{ index, data: item }"></slot>
      </item-radio>
    </div>
  </virtual-list>
</template>

<script>
import VirtualList from "vue-virtual-scroll-list";
import ItemRadio from "./item-radio";
import ItemCheckbox from "./item-checkbox";

export default {
  name: "VueSelectList",

  components: {
    VirtualList,
    ItemRadio,
    ItemCheckbox
  },

  model: {
    prop: "value",
    event: "change"
  },

  props: {
    height: {
      type: [Number, String],
      default: 0
    },
    data: {
      type: Array,
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
    }
  },

  data() {
    return {
      internalValue: this.multiple ? [] : "",
      internalData: []
    };
  },

  computed: {
    getValue() {
      const val = this.internalValue;
      return Array.isArray(val) ? [...val] : val;
    }
  },

  watch: {
    value: {
      handler(val) {
        this.normalizeValue(val);
        this.updateselectedStatus(this.internalValue);
      },
      immediate: true
    },
    "data.length": {
      handler() {
        this.internalData = (this.data || []).map(item => ({
          ...item,
          selected: !!item.selected
        }));
        this.updateselectedStatus(this.internalValue);
      },
      immediate: true
    }
  },

  methods: {
    normalizeValue(val) {
      if (this.multiple) {
        this.internalValue = Array.isArray(val) ? [...val] : [val];
      } else {
        this.internalValue = val;
      }
    },
    updateselectedStatus(arr) {
      const values = Array.isArray(arr) ? arr : [arr];
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
