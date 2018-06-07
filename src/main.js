import Vue from 'vue'
import Vuex from 'vuex'

import App from './App'
import './filters'
import './bootstrap'
import router from './router'
import Icon from 'vue-awesome/components/Icon'
import store from './store'
import linkify from 'vue-linkify'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.directive('linkified', linkify)

Vue.component('icon', Icon)


new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
