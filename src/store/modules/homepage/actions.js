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

    addToLibrary({ commit, state }, pratilipiId) {
        DataAccessor.addOrRemoveFromLibrary(pratilipiId, true, (response) => {
            commit('alert/triggerAlertView', '__("added_to_library")', { root: true });
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
            commit('alert/triggerAlertView', '__("removed_from_library")', { root: true });
            setTimeout(() => {
                commit('alert/triggerAlertHide', null, { root: true });
            }, 3000);
            commit('removePratilipiFromLibrarySuccess', response);
        }, (error) => {
            commit('removePratilipiFromLibraryError');
        })
    },

    getListOfSections({ commit, state }, language) {
        commit('setSectionDataLoadingTrue');
        DataAccessor.getHomePageSections(language, (data) => {
            if (data.status === 200) {
                commit('setSectionData', data.response);
            } else {
                commit('setSectionDataLoadingError');
            }
        })
    },

    fetchBanners({ commit, state }, language) {
        commit('setHomePageBannerLoadingTrue');
        DataAccessor.getHomePageBanners(language, (data) => {
            if (data.status === 200) {
                commit('setHomePageBannerLoadingSuccess', data.response);
            } else {
                commit('setHomePageBannerLoadingError');
            }
        })
    },

    fetchJokeOfTheDay({commit, state}, language) {
        console.log("Language from Actions: " + language);
        DataAccessor.getJokeOfTheDay(language, (data) => {
            if (data.status === 200) {
                console.log("I am inside ACTIONS");
                commit('setJokeOfTheDay', data)
                // commit('setHomePageBannerLoadingSuccess', data.response);
            } else {
                // commit('setHomePageBannerLoadingError');
                console.log("Error in getJokeOfDayAPI");

            }
        })
    },

    fetchQuoteOfTheDay({commit, state}, language) {
        console.log("Language from Actions: " + language);
        DataAccessor.getQuoteOfTheDay(language, (data) => {
            if (data.status === 200) {
                console.log("I am inside ACTIONS");
                commit('setQuoteOfTheDay', data)
                // commit('setHomePageBannerLoadingSuccess', data.response);
            } else {
                // commit('setHomePageBannerLoadingError');
                console.log("Error in getQuoteOfTheDay");
            }
        })
    }
}
