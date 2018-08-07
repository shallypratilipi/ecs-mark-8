import DataAccessor from '@/utils/DataAccessor'

export default {
    publishPratilipi({commit, state}, {eventId, pratilipiId}) {
        commit('setEventPratilipiPublishLoadingTrue');
        DataAccessor.createOrUpdatePratilipi({ "pratilipiId" : pratilipiId, "eventId" : eventId, "state" : "PUBLISHED" }, (data) => {
            commit('setEventPratilipiPublishLoadingSuccess', data);
        }, (error) => {
            commit('setEventPratilipiPublishLoadingError');
        });
    },
}
