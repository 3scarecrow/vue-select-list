import VueSelectList from './vue-select-list.vue'

VueSelectList.install = function (Vue) {
  Vue.component('VueSelectList', VueSelectList)
  Vue.component('vue-select-list', VueSelectList)
}

if (typeof window !== 'undefined' && window.Vue) {
  VueSelectList.install(window.Vue)
}

export default VueSelectList
