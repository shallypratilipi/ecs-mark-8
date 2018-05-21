export default {
    triggerAlert({ commit, state }, { message, timer }) {
        commit('triggerAlertView', message);
        setTimeout(() => {
            commit('triggerAlertHide');
        }, timer)
    }
}
