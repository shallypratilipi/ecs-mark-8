import DataAccessor from '@/utils/DataAccessor'

export default {

    fetchEventPratilipis({ commit, state }, query) {
        commit('setEventPratilipiDataLoadingTrue');
        DataAccessor.getAdminEventPratilipis(query, (eventPratilipiData) => {
            if (eventPratilipiData.status === 200) {
                commit('setEventPratilipiDataLoadingSuccess', eventPratilipiData.response.pratilipis);
            } else {
                commit('setEventPratilipiDataLoadingError');
            }
        });
    },

    fetchEventPratilipiCount({ commit, state }, query) {
        commit('setEventPratilipiCountLoadingTrue');
        DataAccessor.getAdminEventPratilipis({ getCount: 'TRUE', ...query }, (eventPratilipiCount) => {
            if (eventPratilipiCount.status === 200) {
                // commit('setEventPratilipiCountLoadingSuccess', 90);
                commit('setEventPratilipiCountLoadingSuccess', eventPratilipiCount.response.count);
            } else {
                commit('setEventPratilipiCountLoadingError');
            }
        });
    },

    publishContent({ commit, state }, id) {
        commit('setEventPratilipiPublishLoading', id);
        DataAccessor.publishAdminEventPratilipi(id, (eventPratilipiData) => {
            if (eventPratilipiData) {
                commit('setEventPratilipiPublishSuccess', eventPratilipiData);
            } else {
                commit('setEventPratilipiPublishError');
            }
        });
    },

    fetchAuthorDetails({ commit, state }, id) {
        if (state.author.data.user && state.author.data.user.userId == id) {
            return;
        }

        commit('setAuthorDataTrue');
        DataAccessor.getAuthorByUserId(id, (authorData) => {
            if (authorData.status === 200) {
                commit('setAuthorDataSuccess', authorData.response);
            } else {
                commit('setAuthorDataError');
            }
        })
    },

    fetchListOfEvents({ commit, state }, language) {
        commit('setEventsDataLoadingTrue');
        DataAccessor.getEventList(language, function(data) {
            if (data.status === 200) {
                commit('setEventsDataLoadingSuccess', data.response);
            } else {
                commit('setEventsDataLoadingError');
            }
        });
    },

    fetchSingleEventPratilipi({ commit, state }, eventPratilipiId) {
        commit('setSingleEventPratilipiDataLoadingTrue');
        DataAccessor.getAdminEventPratilipi(eventPratilipiId, (eventPratilipiData) => {
            if (eventPratilipiData.status === 200) {
                commit('setSingleEventPratilipiDataLoadingSuccess', eventPratilipiData.response);
            } else {
                commit('setSingleEventPratilipiDataLoadingError');
            }
        });
    },

    updateSingleEventPratilipi({ commit, state }, data) {
        DataAccessor.updateAdminEventPratilipi(data, (eventPratilipiData) => {
            if (eventPratilipiData) {
                commit('setEventPratilipiUpdateSuccess', eventPratilipiData);
            } else {
                commit('setEventPratilipiUpdateError');
            }
        });
    }
}
