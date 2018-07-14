import DataAccessor from '@/utils/DataAccessor'

export default {
    setInputModalSaveAction({commit, state}, {action, data, heading, prefilled_value, initial_value, pratilipi_data}) {
    	commit('setInputModalSaveAction', { action, data, prefilled_value, initial_value, pratilipi_data });
    	commit('setModalHeading', heading);
    },

    setMultiInputModalSaveAction({ commit, state }, { action, data, heading, prefilled_value, prefilled_value_two }) {
        commit('setInputModalSaveAction', { action, data, prefilled_value, prefilled_value_two });
        commit('setModalHeading', heading);
    },


    setConfirmModalAction({commit, state}, {action, heading, message, data}) {
        commit('setConfirmModalAction', { action, data, message });
        commit('setModalHeading', heading);
    },

    dispatchAction({ commit, state, dispatch }) {
        console.log(state);
    	dispatch(state.action, {
    		...state.data,
    		value: state.prefilled_value
    	}, { root: true })
    },

    dispatchMultipleInputAction({ commit, state, dispatch }) {
        dispatch(state.action, {
            ...state.data,
            value: state.prefilled_value,
            value_two: state.prefilled_value_two
        }, { root: true })
    },

    updatePrefilledValue({ commit, state }, value) {
    	commit('updatePrefilledValue', value);
    },

    updatePrefilledValueTwo({ commit, state }, value) {
        commit('updatePrefilledValueTwo', value);
    }
}
