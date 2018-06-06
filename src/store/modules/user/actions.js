import DataAccessor from '@/utils/DataAccessor'

export default {
    // checkout({ commit, state }, products) {
    //     const savedCartItems = [...state.added]
    //     commit('setCheckoutStatus', null)
    //     // empty cart
    //     commit('setCartItems', { items: [] })
    //     shop.buyProducts(
    //         products,
    //         () => commit('setCheckoutStatus', 'successful'),
    //         () => {
    //             commit('setCheckoutStatus', 'failed')
    //             // rollback to the cart saved before sending the request
    //             commit('setCartItems', { items: savedCartItems })
    //         }
    //     )
    // },

    // addProductToCart({ state, commit }, product) {
    //     commit('setCheckoutStatus', null)
    //     if (product.inventory > 0) {
    //         const cartItem = state.added.find(item => item.id === product.id)
    //         if (!cartItem) {
    //             commit('pushProductToCart', { id: product.id })
    //         } else {
    //             commit('incrementItemQuantity', cartItem)
    //         }
    //         // remove 1 item from stock
    //         commit('decrementProductInventory', { id: product.id })
    //     }
    // }
    fetchUserDetails({ commit, state }) {
        commit('setUserDataLoadingTrue');
        DataAccessor.getUser((data) => {
            if (data.status === 200) {
                commit('setUserDataLoadingSuccess', data.response);
            } else {
                commit('setUserDataLoadingError');
            }
        })
    },

    loginUser({ commit, state, dispatch }, { email, password }) {
        commit('setUserDataLoadingTrue');
        DataAccessor.loginUser(email, password, (data) => {
            commit('setUserDataLoadingSuccess', data);
            commit('setLoginSource', 'EMAIL');
            if (state.post_login_action.action) {
                dispatch(state.post_login_action.action, state.post_login_action.data, { root: true });
                commit('clearPostLoginAction');
            }

        }, (error) => {
            console.log(error);
            commit('setUserDataLoadingError', error);
        })
    },

    signupUser({ commit, state, dispatch }, { email, name, password, language }) {
        commit('setUserDataLoadingTrue');
        DataAccessor.registerUser(name, email, password, language, (data) => {
            commit('setUserDataLoadingSuccess', data);
            commit('setSignupSource', 'EMAIL');
            if (state.post_login_action.action) {
                dispatch(state.post_login_action.action, state.post_login_action.data, { root: true });
                commit('clearPostLoginAction');
            }

        }, (error) => {
            console.log(error);
            commit('setUserDataLoadingError', error);
        })
    },

    logoutUser({ commit, state }) {
        commit('setUserLogoutInProgressTrue');
        DataAccessor.logoutUser((data) => {
            commit('setUserLogoutInProgressSuccess', data);
        }, () => {
            commit('setUserLogoutInProgressError');
        })
    },

    setNotificationCount({ commit, state }, notificationCount) {
        commit('setNotificationCount', notificationCount);
    },

    setPendingMessages({ commit, state }, status) {
        commit('setPendingMessagesStatus', status);
    },

    resetNotificationCount({ commit, state }) {
        import('firebase').then((firebase) => {
            const node = firebase.database().ref( "NOTIFICATION" ).child( state.data.userId ).child( "newNotificationCount" );
            node.set( 0 );
        });
    },

    setAfterLoginAction({ commit, state }, { action, data }) {
        commit('setAfterLoginAction', {
            action,
            data
        });
    },

    sendPasswordResetEmail({ commit, state }, email) {
        commit('setForgotPasswordUpdateStateTrue');
        DataAccessor.forgotPassword(email, () => {
            commit('setForgotPasswordUpdateStateSucess');
            commit('alert/triggerAlertView', '__('password_reset_request_success')', { root: true });
            $('#forgotPassModal').modal('hide');
            setTimeout(() => {
                commit('alert/triggerAlertHide', null, { root: true });
            }, 3000);
        }, () => {
            commit('setForgotPasswordUpdateStateError');
            commit('alert/triggerAlertView', '__('server_error_message')', { root: true });
            setTimeout(() => {
                commit('alert/triggerAlertHide', null, { root: true });
            }, 3000);
        });
    },

    loginUserWithFacebookAccessToken({ commit, state, dispatch }, {facebookAccessToken, language}) {
        console.log(language);
        DataAccessor.loginFacebookUser( facebookAccessToken, language, ( data ) => {
            commit('setUserDataLoadingSuccess', data);
            commit('setSignupSource', 'FACEBOOK');
            if (state.post_login_action.action) {
                dispatch(state.post_login_action.action, state.post_login_action.data, { root: true });
                commit('clearPostLoginAction');
            }
        }, function( error ) {
            commit('setUserDataLoadingError', error.message || error.fbUserAccessToken);
        });
    },

    loginUserWithGoogleToken({ commit, state, dispatch }, { googleIdToken, language}) {
        commit('setUserDataLoadingTrue');
        DataAccessor.loginGoogleUser(googleIdToken, language, (data) => {
            commit('setUserDataLoadingSuccess', data);
            commit('setSignupSource', 'GOOGLE');
            if (state.post_login_action.action) {
                dispatch(state.post_login_action.action, state.post_login_action.data, { root: true });
                commit('clearPostLoginAction');
            }
        }, (error) => {
            console.log(error);
            commit('setUserDataLoadingError', error.message);
        })
    },

    resetUserPassword({ commit, state }, { email, idToken, newPassword }) {
        console.log(email, idToken, newPassword)
        DataAccessor.resetUserPassword(email, idToken, newPassword, (userDetails) => {
            commit('setUserDataLoadingSuccess', userDetails);
            window.location = '/';
        }, (error) => {
            console.log(error);
        });
    },

    dispatchReloadAction({ commit, state, dispatch }, { data, action }) {
        dispatch(action, data, { root: true });
    },


    setFirebaseGrowthDBInitialisedTrue({ commit }) {
        console.log("Setting firebase growth DB status to true")
        commit('setFirebaseGrowthDBInitialisedTrue');
    }
}
