import {
    translateWord,
    openLoginModal,
    openInputModal,
    openMultiInputModal,
    openConfirmationModal,
    openForgotPasswordModal,
    openWritePratilipiModal,
    openWebPushModal,
    getCurrentLanguage,
    getLowResolutionImage,
    getHighResolutionImage,
    isMobile,
    isAndroid,
    isChrome,
    setAnalyticsUserProperty,
    validateEmail,
    validatePassword,
    validateUsername,
    triggerAnanlyticsEvent,
    getPratilipiAnalyticsData,
    getAnalyticsPageSource,
    getAndroidIntentUri,
    openInNewTab,
    openPratilipiModal,
    getCookie,
    setCookie,
    isCurrentEvent,
    openPrimaryConfirmationModal,
    validateFirstAndSecondPassword
} from './methods'
import { defaultAuthorImage } from './data'

export default {
    data() {
        return {
            defaultAuthorImage
        }
    },
    methods: {
        translateWord,
        openLoginModal,
        openInputModal,
        openMultiInputModal,
        openConfirmationModal,
        openForgotPasswordModal,
        openWritePratilipiModal,
        openWebPushModal,
        getCurrentLanguage,
        getLowResolutionImage,
        getHighResolutionImage,
        isMobile,
        isAndroid,
        isChrome,
        setAnalyticsUserProperty,
        validateEmail,
        validatePassword,
        validateUsername,
        triggerAnanlyticsEvent,
        getPratilipiAnalyticsData,
        getAnalyticsPageSource,
        getAndroidIntentUri,
        openInNewTab,
        openPratilipiModal,
        getCookie,
        setCookie,
        isCurrentEvent,
        openPrimaryConfirmationModal,
        validateFirstAndSecondPassword
    }
}
