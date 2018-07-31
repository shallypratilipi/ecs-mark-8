import PratilipiContentType from '@/enum/PratilipiContentType'
import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchReaderData ({commit, dispatch}, chapterSlugId) {
        commit('setReaderLoadingTrue')
        DataAccessor.getReaderBatch(chapterSlugId, (response) => {
            if (response.status === 200) {
                commit('setReaderLoadingSuccess', response['response'])
                dispatch('fetchUserPratilipiData')
                dispatch('precacheContent', chapterSlugId)
            } else {
                commit('setReaderLoadingError')
            }
        })
    },

    fetchContentData ({commit, state, dispatch}, chapterSlugId) {
        switch (state.pratilipi.data.contentType) {
            case PratilipiContentType.PRATILIPI: {
                if (state.content.data[chapterSlugId]) {
                    dispatch('precacheContent', chapterSlugId)
                } else {
                    commit('setContentLoadingTrue')
                    DataAccessor.getReaderChapter(chapterSlugId, (response) => {
                        if (response.status === 200) {
                            commit('setContentLoadingSuccess', response['response'])
                            dispatch('precacheContent', chapterSlugId)
                        } else {
                            commit('setContentLoadingError')
                        }
                    })
                }
                break
            }
            case PratilipiContentType.IMAGE: {
                dispatch('precacheContent', chapterSlugId)
                break
            }
        }
    },

    fetchUserPratilipiData ({commit, state}) {
        commit('setUserPratilipiLoadingTrue')
        DataAccessor.getUserPratilipiByPratilipiId(state.pratilipi.data.pratilipiId, (response) => {
            if (response.status === 200) {
                commit('setUserPratilipiLoadingSuccess', response['response'])
            } else {
                commit('setUserPratilipiLoadingError')
            }
        })
    },

    // TODO: Implementation
    precacheContent ({state, dispatch}, chapterSlugId) {
        console.log(`precacheContent :: chapterSlugId :: ${chapterSlugId}`)
    },

    addToLibrary ({commit, state}) {
        commit('alert/triggerAlertView', '__("added_to_library")', {root: true})
        setTimeout(() => commit('alert/triggerAlertHide', null, {root: true}), 3000)
        DataAccessor.addOrRemoveFromLibrary(state.pratilipi.data.pratilipiId, true, () => commit('addPratilipiToLibrarySuccess'))
    },

    removeFromLibrary ({commit, state}) {
        commit('alert/triggerAlertView', '__("removed_from_library")', {root: true})
        setTimeout(() => commit('alert/triggerAlertHide', null, {root: true}), 3000)
        DataAccessor.addOrRemoveFromLibrary(state.pratilipi.data.pratilipiId, false, () => commit('removePratilipiFromLibrarySuccess'))
    },

    followAuthor ({commit, state}) {
        commit('alert/triggerAlertView', '__("author_follow_success")', {root: true})
        setTimeout(() => commit('alert/triggerAlertHide', null, {root: true}), 3000)
        DataAccessor.followOrUnfollowAuthor(state.author.data.authorId, true, () => commit('followAuthorSuccess'))
    },

    unFollowAuthor ({commit, state}) {
        commit('alert/triggerAlertView', '__("author_unfollow_success")', {root: true})
        setTimeout(() => commit('alert/triggerAlertHide', null, {root: true}), 3000)
        DataAccessor.followOrUnfollowAuthor(state.author.data.authorId, false, () => commit('UnfollowAuthorSuccess'))
    },

    setPratilipiRating ({commit}, {rating, pratilipiId}) {
        DataAccessor.createOrUpdateReview(pratilipiId, rating, null, () => commit('setPratilipiRatingUpdateSuccess', rating))
    },

    saveOrUpdateReview ({commit, state}, {review, pratilipiId}) {
        if (state.userPratilipi.data.rating == null) {
            commit('alert/triggerAlertView', 'need_rating', {root: true})
            setTimeout(() => commit('alert/triggerAlertHide', null, {root: true}), 3000)
            return
        }
        DataAccessor.createOrUpdateReview(pratilipiId, null, review, () => commit('setPratilipiReviewUpdateSuccess', review))
    },

    deleteReview ({commit}, pratilipiId) {
        DataAccessor.deleteReview(pratilipiId, () => {
            commit('setPratilipiReviewUpdateSuccess', '')
            commit('setPratilipiRatingUpdateSuccess', null)
        })
    },

    postReadingPercentage ({state}, {pratilipiId, chapterCount, maxRead, indexData}) {
        if (state.userPratilipi.data) {
            DataAccessor.postReadingPercent(pratilipiId, chapterCount, maxRead, indexData)
        }
    },

    submitPrailipiReport ({state}, {name, email, message, pratilipiId, language, dataType}) {
        DataAccessor.reportContent(name, email, null, message, dataType, pratilipiId, language)
    }

}
