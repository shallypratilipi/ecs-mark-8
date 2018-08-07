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

    precacheContent ({state, commit, dispatch}, chapterSlugId) {
        const slugIdArray = state.index.data.map(indexData => indexData.slugId)
        const prevChapterSlugId = slugIdArray.indexOf(chapterSlugId) !== 0 ? slugIdArray[slugIdArray.indexOf(chapterSlugId) - 1] : null
        const nextChapterSlugId = slugIdArray.indexOf(chapterSlugId) !== slugIdArray.length - 1 ? slugIdArray[slugIdArray.indexOf(chapterSlugId) + 1] : null
        if (prevChapterSlugId && !state.content.data[prevChapterSlugId]) {
            DataAccessor.getReaderChapter(prevChapterSlugId, (response) => {
                if (response.status === 200) {
                    commit('setPrecacheContentLoadingSuccess', response['response'])
                    dispatch('precacheImages', prevChapterSlugId)
                }
            })
        }
        if (nextChapterSlugId && !state.content.data[nextChapterSlugId]) {
            DataAccessor.getReaderChapter(nextChapterSlugId, (response) => {
                if (response.status === 200) {
                    commit('setPrecacheContentLoadingSuccess', response['response'])
                    dispatch('precacheImages', nextChapterSlugId)
                }
            })
        }
    },

    precacheImages ({state}, chapterSlugId) {
        let m
        let imageUrls = []
        let regex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g
        while ((m = regex.exec(state.content.data[chapterSlugId].content))) {
            imageUrls.push(m[1])
        }
        for (let i = 0; i < imageUrls.length; i++) {
            $(`<img src=${imageUrls[i]} />`).trigger('load')
        }
    },

    addToLibrary ({commit, state}) {
        commit('addPratilipiToLibrarySuccess')
        DataAccessor.addOrRemoveFromLibrary(state.pratilipi.data.pratilipiId, true, null, () => {
            commit('addPratilipiToLibraryError')
            commit('alert/triggerAlertView', '__("server_error_message")', {root: true})
            setTimeout(() => commit('alert/triggerAlertHide', null, {root: true}), 3000)
        })
    },

    removeFromLibrary ({commit, state}) {
        commit('removePratilipiFromLibrarySuccess')
        DataAccessor.addOrRemoveFromLibrary(state.pratilipi.data.pratilipiId, false, null, () => {
            commit('removePratilipiFromLibraryError')
            commit('alert/triggerAlertView', '__("server_error_message")', {root: true})
            setTimeout(() => commit('alert/triggerAlertHide', null, {root: true}), 3000)
        })
    },

    followAuthor ({commit, state}) {
        commit('followAuthorSuccess')
        DataAccessor.followOrUnfollowAuthor(state.author.data.authorId, true, null, () => {
            commit('followAuthorError')
            commit('alert/triggerAlertView', '__("server_error_message")', {root: true})
            setTimeout(() => commit('alert/triggerAlertHide', null, {root: true}), 3000)
        })
    },

    unFollowAuthor ({commit, state}) {
        commit('UnfollowAuthorSuccess')
        DataAccessor.followOrUnfollowAuthor(state.author.data.authorId, false, null, () => {
            commit('UnfollowAuthorError')
            commit('alert/triggerAlertView', '__("server_error_message")', {root: true})
            setTimeout(() => commit('alert/triggerAlertHide', null, {root: true}), 3000)
        })
    },

    updateRatingInStore ({commit}, {review, rating}) {
        commit('setPratilipiReviewRating', {review, rating})
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

    postReadingPercentage ({state}, {chapterNo, maxRead}) {
        DataAccessor.postReadingPercent(state.pratilipi.data.pratilipiId, chapterNo, maxRead, state.index.data)
    },

    submitPrailipiReport ({state}, {name, email, message, pratilipiId, language, dataType}) {
        DataAccessor.reportContent(name, email, null, message, dataType, pratilipiId, language)
    }

}
