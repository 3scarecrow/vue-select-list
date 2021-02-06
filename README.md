# vue-select-list

## Props

| prop | type | default | description |
| --- | --- | --- | --- |
| value/v-model | Number/String/Array | `[]` | 绑定值 |
| height | Number/String | `undefined` | 列表高度 |
| options | Array/Function | `[]` | 列表数据 |
| data-key | String | `value` | 每个选项用来作为唯一标识的属性 |
| multiple | Boolean | `false` | 是否多选 |
| item-height | Number | `50` | 选项高度，用于虚拟滚动效果计算 |
| item-remain | Number | `10` | 默认显示选项数量 |
| item-bench | Number | `10` | 虚拟滚动效果屏幕外选项数量 |
| empty-text | String | `No Result` | 数据为空显示的文本 |
| loading-text | String | `Loading...` | 数据尚未加载完时显示的文本 |

## Events

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| change | 目前的选中值 | 选中值发生变化时触发 |

## Slots

| name | 参数 | 说明 |
| --- | --- | --- |
| default | { data, index } | 自定义项的插槽 |
| loading | { data, index } | 自定义加载中的插槽 |
| empty | —— | 列表无数据时的插槽 |
