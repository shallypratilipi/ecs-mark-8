import Vue from 'vue'
import Vuex from 'vuex'

import App from './App'
import './filters'
import './bootstrap'
import router from './router'
import Icon from 'vue-awesome/components/Icon'
import store from './store'
import linkify from 'vue-linkify'
import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents'


if ('serviceWorker' in navigator) {
    const registration = runtime.register()
    registerEvents(registration, {
        onInstalled: () => console.log('sw onInstalled'),
        onUpdateReady: () => console.log('sw onUpdateReady'),
        onUpdating: () => console.log('sw onUpdating'),
        onUpdateFailed: () => console.log('sw onUpdateFailed'),
        onUpdated: () => console.log('sw onUpdated')
    })
} else {
    console.log('serviceWorker not available')
}

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
