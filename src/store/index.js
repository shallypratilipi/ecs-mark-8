import Vuex from 'vuex'
import Vue from 'vue'
import homepage from './modules/homepage'
import user from './modules/user'
import notification from './modules/notification'
import searchpage from './modules/searchpage'
import pratilipipage from './modules/pratilipipage'
import recommendation from './modules/recommendation'
import reviews from './modules/reviews'
import authorpage from './modules/authorpage'
import eventspage from './modules/eventspage'
import listpage from './modules/listpage'
import librarypage from './modules/librarypage'
import staticpage from './modules/staticpage'
import writepage from './modules/writepage'
import eventpage from './modules/eventpage'
import blogspage from './modules/blogspage'
import blogpage from './modules/blogpage'
import settingspage from './modules/settingspage'
import interviewspage from './modules/interviewspage'
import interviewpage from './modules/interviewpage'
import sharemodal from './modules/sharemodal'
import alert from './modules/alert'
import inputmodal from './modules/inputmodal'
import readerpage from './modules/readerpage'
import readerv2page from './modules/readerv2page'
import pratilipimodal from './modules/pratilipimodal'
import messages from './modules/messages'
import eventparticipate from './modules/eventparticipate'
import admineventsubmissions from './modules/admineventsubmissions'
import videoseries from './modules/videoseries'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        homepage,
        user,
        alert,
        notification,
        searchpage,
        pratilipipage,
        recommendation,
        reviews,
        eventspage,
        eventpage,
        authorpage,
        listpage,
        staticpage,
        writepage,
        librarypage,
        blogspage,
        blogpage,
        settingspage,
        readerpage,
        readerv2page,
        interviewspage,
        interviewpage,
        sharemodal,
        pratilipimodal,
        inputmodal,
        messages,
        eventparticipate,
        admineventsubmissions,
        videoseries
    },
    strict: debug
})
