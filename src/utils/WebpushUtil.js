/**
    # Api Reference:
    https://developer.mozilla.org/en-US/docs/Web/API/notification
    https://developer.mozilla.org/en-US/docs/Web/API/PushManager
    https://www.sitepoint.com/how-to-use-push-notifications-for-web-applications/
    https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
    https://developers.google.com/web/fundamentals/codelabs/push-notifications/

    # PRD:
    https://docs.google.com/document/d/1rPHtQhqucWgyB20E2aHpW3uPHIyYORgWnVtzcJk0g0c

    # SPOC:
    1. Product - Shally
    2. Design - Drasti
    3. Tech Impl - Raghu
**/

// some boring import statements, important but boring
import {
    getCookie,
    setCookie
} from '@/mixins/methods'

import DataAccessor from '@/utils/DataAccessor'

// WEB_PUSH_COOKIE_NAME => Number of times user had clicked close on a custom prompt (Integer, converted as string in browser cookies)
// WEB_PUSH_COOKIE_DAYS => TTL for the WEB_PUSH_COOKIE_NAME in days
// WEB_PUSH_SHOW_LIMIT => Number of times user can be shown custom prompts
const WEB_PUSH_COOKIE_NAME = 'web_push_closed'
const WEB_PUSH_COOKIE_DAYS = 7
const WEB_PUSH_SHOW_LIMIT = 3

// WEB_PUSH_SESSION_COOKIE_NAME => Temporary cookie set to identify that the user had disabled push in the current session
const WEB_PUSH_SESSION_COOKIE_NAME = 'web_push_closed_now'

// staged release
const STAGED_START_BUCKET_ID = 20
const STAGED_END_BUCKET_ID = 30

// WebpushUtil
const WebpushUtil = (function () { // eslint-disable-line

    // _createOrUpdateFCMToken => creates or updates a fcm token through DataAccessor
    const _createOrUpdateFCMToken = (fcmToken) =>
        new Promise((resolve, reject) => DataAccessor.createOrUpdateFCMToken(fcmToken, resolve, reject))

    // _enableBrowserPush => Returns a promise, Shows the custom prompt (if needed) and makes server api calls
    const _enableBrowserPush = () =>
        navigator.serviceWorker.getRegistration()
            .then((serviceWorkerRegistration) => serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true}))
            .then(_createOrUpdateFCMToken)

    // isBrowserPushCompatible => Returns a boolean stating if the push is compatible with the browser or not
    const isBrowserPushCompatible = () => ('serviceWorker' in navigator) && ('PushManager' in window) && ('Notification' in window)

    // canShowCustomPrompt => Returns a boolean considering these factors:
    // 1. is BrowserPush compatible with the browser
    // 2. user has allowed the notifications already
    // 3. user has blocked the notifications already
    // 4. custom prompt has been closed by the user in the session, so don't piss off the user until next session
    // 5. custom prompt has been closed by the user x times already, so don't piss off the user for another WEB_PUSH_COOKIE_DAYS days
    // 6. staged release, if there's any
    const canShowCustomPrompt = () => isBrowserPushCompatible() &&
        (window.Notification.permission !== 'granted') &&
        (window.Notification.permission !== 'denied') &&
        (getCookie(WEB_PUSH_SESSION_COOKIE_NAME) === undefined) &&
        ((parseInt(getCookie(WEB_PUSH_COOKIE_NAME)) || 0) < WEB_PUSH_SHOW_LIMIT) &&
        ((parseInt(getCookie('bucketId')) || -1) >= STAGED_START_BUCKET_ID) &&
        ((parseInt(getCookie('bucketId')) || -1) < STAGED_END_BUCKET_ID)

    // enabledOnCustomPrompt => As the name defines
    // TODO: Impl
    const enabledOnCustomPrompt = () => {
        // some analytics calls
        // showing the prompt to user
        _enableBrowserPush()
            .then() // more analytics call
            .catch() // error handling
    }

    // disabledOnCustomPrompt => As the name defines again, genius
    // TODO: Impl
    const disabledOnCustomPrompt = () => {
        // some analytics calls
        // setting cookies
        setCookie(WEB_PUSH_COOKIE_NAME, (parseInt(getCookie(WEB_PUSH_COOKIE_NAME)) || 0) + 1, WEB_PUSH_COOKIE_DAYS, '/')
        setCookie(WEB_PUSH_SESSION_COOKIE_NAME, Date.now(), null, '/')
    }

    // if user had granted access, make an api call with the updated token
    (function _init () {
        if (window.Notification.permission === 'granted') {
            _enableBrowserPush()
        }
    })()

    return {
        isBrowserPushCompatible, // check if browser push is compatible with the browser
        canShowCustomPrompt, // check if custom prompts can be shown based on multiple factors
        enabledOnCustomPrompt, // user had clicked on 'yes' on custom prompt
        disabledOnCustomPrompt // user had clicked on 'no' on custom prompt
    }
})()

export {WebpushUtil}
