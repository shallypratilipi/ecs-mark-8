import Vuex from 'vuex'
import Vue from 'vue'
import homepage from './modules/homepage'
import user from './modules/user'
import notification from './modules/notification'
import searchpage from './modules/searchpage'
import pratilipipage from './modules/pratilipipage'
import recommendation from  './modules/recommendation'
import reviews from './modules/reviews'
import authorpage from './modules/authorpage'
import listpage from './modules/listpage'
import writepage from './modules/writepage'
import eventspage from './modules/eventspage'
import eventpage from './modules/eventpage'
import blogspage from './modules/blogspage'
import blogpage from './modules/blogpage'
import settingspage from './modules/settingspage'
import readerpage from './modules/readerpage'
import interviewpage from './modules/interviewpage'
import interviewspage from './modules/interviewspage'
import librarypage from './modules/librarypage'
import staticpage from './modules/staticpage'
import sharemodal from './modules/sharemodal'
import alert from './modules/alert'
import pratilipimodal from './modules/pratilipimodal'
import inputmodal from './modules/inputmodal'
import messages from  './modules/messages'
import eventparticipate from  './modules/eventparticipate'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        homepage,
        user,
        notification,
        searchpage,
        pratilipipage,
        recommendation,
        reviews,
        authorpage,
        listpage,
        writepage,
        eventspage,
        eventpage,
        blogspage,
        blogpage,
        settingspage,
        readerpage,
        interviewspage,
        interviewpage,
        librarypage,
        staticpage,
        sharemodal,
        alert,
        pratilipimodal,
        inputmodal,
        messages,
        eventparticipate
    }
})
