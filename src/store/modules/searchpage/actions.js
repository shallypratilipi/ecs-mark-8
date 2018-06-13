import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchInitialSearchResult({ commit, state }, { searchQuery, language }) {
        commit('setSearchPageInitialDataLoadingTrue');
        DataAccessor.getInitialSearchResults(searchQuery, language, function(data) {
            if (data.status === 200) {
                commit('setSearchPageInitialDataLoadingSuccess', data.response);
            } else {
                commit('setSearchPageInitialDataLoadingError');
            }
        });
    },

    fetchMorePratilipisForSearchPage({ commit, state }, { searchQuery, resultCount, language }) {
        commit('setSearchPagePratilipiDynamicLoadingTrue');
        DataAccessor.getPratilipiSearchResults(searchQuery, state.pratilipi.cursor, resultCount, language, function(data) {
            if (data.status === 200) {
                commit('setSearchPagePratilipiDynamicLoadingSuccess', data.response);
            } else {
                commit('setSearchPagePratilipiDynamicLoadingError');
            }
        });  
    },

    addToLibrary({ commit, state }, pratilipiId) {
        DataAccessor.addOrRemoveFromLibrary(pratilipiId, true, (response) => {
            commit('alert/triggerAlertView', '__('added_to_library')', { root: true });
            setTimeout(() => {
                commit('alert/triggerAlertHide', null, { root: true });
            }, 3000);
            commit('addPratilipiToLibrarySuccess', response);
        }, (error) => {
            commit('addPratilipiToLibraryError');
        })
    },

    removeFromLibrary({ commit, state }, pratilipiId) {
        DataAccessor.addOrRemoveFromLibrary(pratilipiId, false, (response) => {
            commit('alert/triggerAlertView', '__('removed_from_library')', { root: true });
            setTimeout(() => {
                commit('alert/triggerAlertHide', null, { root: true });
            }, 3000);
            commit('removePratilipiFromLibrarySuccess', response);
        }, (error) => {
            commit('removePratilipiFromLibraryError');
        })
    },

    fetchTrendingSearch({ commit, state }, language) {
        DataAccessor.getTrendingSearchKeywords( language, (data) => {
            if (data.status === 200) {
                commit('setTrendingSearchLoadingSuccess', data.response);
            } else {
                commit('setTrendingSearchLoadingError');
            }
        });
    },

    followOrUnfollowAuthor({ commit, state }, { authorId, following }) {
        commit('setFollowUnfollowLoadingDataLoadingTrue');
        DataAccessor.followOrUnfollowAuthor(authorId, !following, function(data) {
            commit('setFollowUnfollowLoadingDataLoadingSuccess', data);
        }, function (error) {
            commit('setFollowUnfollowLoadingDataLoadingError');
        });
    },
}
