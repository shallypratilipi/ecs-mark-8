import LoadingState from '@/enum/LoadingState'

export default {

    setReaderLoadingTrue (state) {
        // pratilipi
        state.pratilipi.loading_state = LoadingState.LOADING
        state.pratilipi.data = {}

        // author
        state.author.loading_state = LoadingState.LOADING
        state.author.data = {}

        // index
        state.index.loading_state = LoadingState.LOADING
        state.index.data = []

        // content
        state.content.loading_state = LoadingState.LOADING
        state.content.data = {}
    },

    setReaderLoadingSuccess (state, {pratilipiData, authorData, contentIndex, chapterData}) {
        // pratilipi
        state.pratilipi.loading_state = LoadingState.LOADING_SUCCESS
        state.pratilipi.data = pratilipiData

        // author
        state.author.loading_state = LoadingState.LOADING_SUCCESS
        state.author.data = authorData

        // index
        state.index.loading_state = LoadingState.LOADING_SUCCESS
        state.index.data = contentIndex

        // Refer: https://vuex.vuejs.org/guide/mutations.html
        // Refer: https://vuejs.org/v2/guide/reactivity.html
        // content
        state.content.loading_state = LoadingState.LOADING_SUCCESS
        state.content.data = {...state.content.data, [chapterData.slugId]: chapterData}
    },

    setReaderLoadingError (state) {
        // pratilipi
        state.pratilipi.loading_state = LoadingState.LOADING_ERROR

        // author
        state.author.loading_state = LoadingState.LOADING_ERROR

        // index
        state.index.loading_state = LoadingState.LOADING_ERROR

        // content
        state.content.loading_state = LoadingState.LOADING_ERROR
    },

    setContentLoadingTrue (state) {
        state.content.loading_state = LoadingState.LOADING
    },

    setContentLoadingSuccess (state, chapterData) {
        // Refer: https://vuex.vuejs.org/guide/mutations.html
        // Refer: https://vuejs.org/v2/guide/reactivity.html
        state.content.loading_state = LoadingState.LOADING_SUCCESS
        state.content.data = {...state.content.data, [chapterData.slugId]: chapterData}
    },

    setPrecacheContentLoadingSuccess (state, chapterData) {
        // Refer: https://vuex.vuejs.org/guide/mutations.html
        // Refer: https://vuejs.org/v2/guide/reactivity.html
        state.content.data = {...state.content.data, [chapterData.slugId]: chapterData}
    },

    setContentLoadingError (state) {
        state.content.loading_state = LoadingState.LOADING_ERROR
    },

    setUserPratilipiLoadingTrue (state) {
        state.userPratilipi.loading_state = LoadingState.LOADING
        state.userPratilipi.data = {}
    },

    setUserPratilipiLoadingSuccess (state, userPratilipiData) {
        state.userPratilipi.loading_state = LoadingState.LOADING_SUCCESS
        state.userPratilipi.data = userPratilipiData
    },

    setUserPratilipiLoadingError (state) {
        state.userPratilipi.loading_state = LoadingState.LOADING_ERROR
    },

    addPratilipiToLibrarySuccess (state) {
        state.userPratilipi.data.addedToLib = true
    },

    removePratilipiFromLibrarySuccess (state) {
        state.userPratilipi.data.addedToLib = false
    },

    addPratilipiToLibraryError (state) {
        state.userPratilipi.data.addedToLib = false
    },

    removePratilipiFromLibraryError (state) {
        state.userPratilipi.data.addedToLib = true
    },

    followAuthorSuccess (state) {
        state.author.data.following = true
        state.author.data.followCount++
    },

    UnfollowAuthorSuccess (state) {
        state.author.data.following = false
        state.author.data.followCount--
    },

    followAuthorError (state) {
        state.author.data.following = false
        state.author.data.followCount--
    },

    UnfollowAuthorError (state) {
        state.author.data.following = true
        state.author.data.followCount++
    },

    setPratilipiRatingUpdateSuccess (state, rating) {
        state.userPratilipi.data.rating = rating
        state.userPratilipi.data.reviewDateMillis = Date.now()
    },

    setPratilipiReviewUpdateSuccess (state, review) {
        state.userPratilipi.data.review = review
        state.userPratilipi.data.reviewDateMillis = Date.now()
    },

    setPratilipiReviewRating (state, {review, rating}) {
        state.userPratilipi.data.review = review
        state.userPratilipi.data.rating = rating
    }

}
