export default {
    // pushProductToCart(state, { id }) {
    //     state.added.push({
    //         id,
    //         quantity: 1
    //     })
    // },

    // incrementItemQuantity(state, { id }) {
    //     const cartItem = state.added.find(item => item.id === id)
    //     cartItem.quantity++
    // },

    // setCartItems(state, { items }) {
    //     state.added = items
    // },

    // setCheckoutStatus(state, status) {
    //     state.checkoutStatus = status
    // }

    setUserDataLoadingTrue(state) {
        state.loading_state = 'LOADING';
        state.loading_error_message = null;
    },

    setUserDataLoadingSuccess(state, userData) {
        state.loading_state = 'LOADING_SUCCESS';
        state.data = userData;
        state.loading_error_message = null;
    },

    setUserDataLoadingError(state, errorMessage) {
        state.loading_state = 'LOADING_ERROR';
        state.loading_error_message =  errorMessage;
    },

    setNotificationCount(state, notificationCount) {
        state.notification_count = notificationCount;
    },

    setUserLogoutInProgressTrue(state) {
        state.loading_state = 'LOADING';
    },

    setUserLogoutInProgressSuccess(state, data) {
        state.loading_state = 'LOADING_SUCCESS';
        state.logout_user = true;
    },

    setUserLogoutInProgressError(state) {
        state.loading_state = 'LOADING_ERROR';
    },

    setAfterLoginAction(state, { action, data }) {
        state.post_login_action.action = action;
        state.post_login_action.data = data;
    },

    clearPostLoginAction(state) {
        state.post_login_action.action = null;
        state.post_login_action.data = null;
    },

    setSignupSource(state, source) {
        state.signup_source = source;
    },

    setLoginSource(state, source) {
        state.login_source = source;
    },

    setForgotPasswordUpdateStateTrue(state) {
        state.forgot_password_update_state = 'LOADING';
    },

    setForgotPasswordUpdateStateSucess(state) {
        state.forgot_password_update_state = 'LOADING_SUCCESS';
    },

    setForgotPasswordUpdateStateError(state) {
        state.forgot_password_update_state = 'LOADING_ERROR';
    },

    setPendingMessagesStatus(state, status) {
        state.pendingMessages = status;
    },

    setFirebaseGrowthDBInitialisedTrue(state) {
        state.growth_db_initialized = true;
    },

    setReadCount(state, readCount) {
        state.read_stats.read_count = localStorage.readCount;
        state.read_stats.read_books = localStorage.readPratilipis ? JSON.parse(localStorage.readPratilipis) : [];
    }
}
