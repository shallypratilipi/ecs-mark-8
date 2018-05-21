import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchInitialPublishedContents({ commit, state }, { authorId, resultCount }) {
        commit('setPublishedContentsLoadingTrue');
        DataAccessor.getPratilipiListByAuthor(authorId, 'PUBLISHED', null, null, resultCount, (data) => {
            if (data.status === 200) {
                commit('setPublishedContentsLoadingSuccess', data.response);    
            } else {
                commit('setPublishedContentsLoadingError');    
            }
        })
    },

    fetchMorePublishedContents({ commit, state }, { authorId, resultCount }) {
        commit('setPublishedContentsDynamicLoadingTrue');
        DataAccessor.getPratilipiListByAuthor(authorId, 'PUBLISHED', state.published_contents.cursor, null, resultCount, (data) => {
            if (data.status === 200) {
                commit('setPublishedContentsDynamicLoadingSuccess', data.response);
            } else {
                commit('setPublishedContentsDynamicLoadingError');
            }
        });  
    },

    fetchAuthorDetails({ commit, state }, authorSlug) {
        commit('setAuthorDataLoadingTrue');
        DataAccessor.getAuthorBySlug(authorSlug, (authorData) => {
            if (authorData) {
                commit('setAuthorDataLoadingSuccess', authorData);
            } else {
                commit('setAuthorDataLoadingError');
            }
        });    
    },

    fetchInitialAuthorFollowingUsers({ commit, state }, { userId, resultCount }) {
        commit('setInitialAuthorFollowingDataLoadingTrue');
        DataAccessor.getUserFollowing(userId, null, null, resultCount, (data) => {
            if (data.status === 200) {
                commit('setInitialAuthorFollowingDataLoadingSuccess', data.response);    
            } else {
                commit('setInitialAuthorFollowingDataLoadingError');    
            }
        });    
    },

    fetchMoreAuthorFollowingUsers({ commit, state }, { userId, resultCount }) {
        commit('setMoreAuthorFollowingDataLoadingTrue');
        DataAccessor.getUserFollowing(userId, state.following.cursor, null, resultCount, (data) => {
            if (data.status === 200) {
                commit('setMoreAuthorFollowingDataLoadingSuccess', data.response);    
            } else {
                commit('setMoreAuthorFollowingDataLoadingError');    
            }
        });    
    },

    fetchInitialAuthorFollowerUsers({ commit, state }, { authorId, resultCount }) {
        commit('setInitialAuthorFollowersDataTrue');
        DataAccessor.getAuthorFollowers(authorId, null, null, resultCount, (data) => {
            if (data.status === 200) {
                commit('setInitialAuthorFollowersDataSuccess', data.response);    
            } else {
                commit('setInitialAuthorFollowersDataError');    
            }
        });    
    },

    fetchMoreAuthorFollowerUsers({ commit, state }, { authorId, resultCount }) {
        commit('setMoreAuthorFollowersDataTrue');
        DataAccessor.getAuthorFollowers(authorId, state.followers.cursor, null, resultCount, (data) => {
            if (data.status === 200) {
                commit('setMoreAuthorFollowersDataSuccess', data.response);    
            } else {
                commit('setMoreAuthorFollowersDataError');    
            }
        });    
    },

    fetchInitialLibraryList({ commit, state }, resultCount) {
        commit('setLibraryListInitialDataLoadingTrue');
        DataAccessor.getUserLibraryList(null, resultCount, function(data) {
            if (data.status === 200) {
                commit('setLibraryListInitialDataLoadingSuccess', data.response);
            } else {
                commit('setLibraryListInitialDataLoadingError');
            }
        });
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
        });
    },
    
    removeFromLibraryPublished({ commit, state }, pratilipiId) {
        DataAccessor.addOrRemoveFromLibrary(pratilipiId, false, (response) => {
            commit('alert/triggerAlertView', '__('removed_from_library')', { root: true });
            setTimeout(() => {
                commit('alert/triggerAlertHide', null, { root: true });
            }, 3000);
            commit('removePratilipiFromLibraryPublishedSuccess', response);
        }, (error) => {
            commit('removePratilipiFromLibraryPublishedError');
        });
    },
    
    addToLibraryPublished({ commit, state }, pratilipiId) {
        DataAccessor.addOrRemoveFromLibrary(pratilipiId, true, (response) => {
            commit('alert/triggerAlertView', '__('added_to_library')', { root: true });
            setTimeout(() => {
                commit('alert/triggerAlertHide', null, { root: true });
            }, 3000);
            commit('addPratilipiToLibrarySuccess', response);
        }, (error) => {
            commit('addPratilipiToLibraryError');
        });
    },

    followOrUnfollowAuthor({ commit, state, dispatch }) {
        commit('setFollowUnfollowLoadingDataLoadingTrue');
        setTimeout(() => {
            dispatch('fetchInitialAuthorFollowerUsers', { authorId: state.author.data.authorId, resultCount: 5 });    
        }, 1200);
        
        DataAccessor.followOrUnfollowAuthor(state.author.data.authorId, !state.author.data.following, function(data) {
            commit('setFollowUnfollowLoadingDataLoadingSuccess', data);
        }, function (error) {
            commit('setFollowUnfollowLoadingDataLoadingError');
        });
    },

    uploadCoverImage({ commit, state }, formData ) {
        console.log(formData);
        commit('setCoverImageUploadingTrue');
        DataAccessor.uploadCoverImage(formData, state.author.data.authorId, (successData) => {
            console.log('Now I can die in peace');
            commit('setCoverImageUploadingSuccess', successData);
        }, (errorData) => {
            console.log('My life is wasted');
            commit('setCoverImageUploadingError');
        });
    },

    uploadProfileImage({ commit, state }, formData ) {
        console.log(formData);
        commit('setProfileImageUploadingTrue');
        DataAccessor.uploadProfileImage(formData, state.author.data.authorId, (successData) => {
            console.log('Now I can die in peace');
            commit('setProfileImageUploadingSuccess', successData);
        }, (errorData) => {
            console.log('My life is wasted');
            commit('setProfileImageUploadingError');
        });
    },

    followOrUnfollowFollowing({ commit, state }, { authorId, following }) {
        console.log(authorId);
        console.log(following);
        commit('setFollowUnfollowFollowingLoadingDataLoadingTrue');
        DataAccessor.followOrUnfollowAuthor(authorId, !following, function(data) {
            commit('setFollowUnfollowFollowingLoadingDataLoadingSuccess', data);
        }, function (error) {
            commit('setFollowUnfollowFollowingLoadingDataLoadingError');
        });
    },

    followOrUnfollowFollowers({ commit, state }, { authorId, following }) {
        console.log(authorId);
        console.log(following);
        commit('setFollowUnfollowFollowersLoadingDataLoadingTrue');
        DataAccessor.followOrUnfollowAuthor(authorId, !following, function(data) {
            commit('setFollowUnfollowFollowersLoadingDataLoadingSuccess', data);
        }, function (error) {
            commit('setFollowUnfollowFollowersLoadingDataLoadingError');
        });
    }


}
