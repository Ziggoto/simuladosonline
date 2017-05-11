<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueSweetAlert from 'vue-sweetalert'

Vue.use(VueResource)
Vue.use(VueSweetAlert)

const inBrowser = typeof window !== 'undefined'
if (inBrowser) {
  require('../semantic/dist/semantic.min.js')
}

export default {
  name: 'app'
}
</script>

<style lang="stylus">
@import '../semantic/dist/semantic.min.css';

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
</style>
