// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'

import App from './App'
import './filters'
import './bootstrap'
import store from './store'
import router from './router'
import Icon from 'vue-awesome/components/Icon'
import VueLazyload from 'vue-lazyload'

if (process.env.REALM !== 'PROD' && process.env.NODE_ENV === 'production') {
    import('raven-js').then((Raven) => {
        import('raven-js/plugins/vue').then((RavenVue) => {
            Raven
                .config('https://04a769a856594059abd7e06da9a203e7@sentry.io/305909')
                .addPlugin(RavenVue, Vue)
                .install();
        });
    });
}

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
Vue.use(Vuex);
Vue.directive('linkified', linkify)
Vue.component('icon', Icon)

Vue.use(VueLazyload)

/* eslint-disable no-new */
new Vue({
    store,
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
