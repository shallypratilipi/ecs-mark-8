import constants from '@/constants';
import controlAnalyticsEvents from '@/static_scripts/analytics_events_control'
import ratingV1AnalyticsEvents from '@/static_scripts/experiment_events/rating_v1'
import ratingV2AnalyticsEvents from '@/static_scripts/experiment_events/rating_v2'
import ratingV3AnalyticsEvents from '@/static_scripts/experiment_events/rating_v3'
import ratingV4AnalyticsEvents from '@/static_scripts/experiment_events/rating_v4'
import readerV1AnalyticsEvents from '@/static_scripts/experiment_events/reader_v1'
import readerV2AnalyticsEvents from '@/static_scripts/experiment_events/reader_v2'
import readerV3AnalyticsEvents from '@/static_scripts/experiment_events/reader_v3'
import readerV4AnalyticsEvents from '@/static_scripts/experiment_events/reader_v4'
import readerV5AnalyticsEvents from '@/static_scripts/experiment_events/reader_v5'
import readerV6AnalyticsEvents from '@/static_scripts/experiment_events/reader_v6'
import readerV7AnalyticsEvents from '@/static_scripts/experiment_events/reader_v7'
import readerV8AnalyticsEvents from '@/static_scripts/experiment_events/reader_v8'
import profileV1AnalyticsEvents from '@/static_scripts/experiment_events/profile_v1'
import profileV2AnalyticsEvents from '@/static_scripts/experiment_events/profile_v2'
import profileV3AnalyticsEvents from '@/static_scripts/experiment_events/profile_v3'
import profileV4AnalyticsEvents from '@/static_scripts/experiment_events/profile_v4'
import discoveryV1AnalyticsEvents from '@/static_scripts/experiment_events/discovery_v1'
import discoveryV2AnalyticsEvents from '@/static_scripts/experiment_events/discovery_v2'
import discoveryV3AnalyticsEvents from '@/static_scripts/experiment_events/discovery_v3'
import discoveryV4AnalyticsEvents from '@/static_scripts/experiment_events/discovery_v4'
import homeV1AnalyticsEvents from '@/static_scripts/experiment_events/home_v1'
import homeV2AnalyticsEvents from '@/static_scripts/experiment_events/home_v2'
import homeV3AnalyticsEvents from '@/static_scripts/experiment_events/home_v3'
import homeV4AnalyticsEvents from '@/static_scripts/experiment_events/home_v4'
import bookv1AnalyticsEvents from '@/static_scripts/experiment_events/book_v1'
import bookv2AnalyticsEvents from '@/static_scripts/experiment_events/book_v2'
import bookv3AnalyticsEvents from '@/static_scripts/experiment_events/book_v3'
import bookv4AnalyticsEvents from '@/static_scripts/experiment_events/book_v4'

const rating_v1 = ['WGEN001'];
const rating_v2 = ['WGEN002'];
const rating_v3 = ['WGEN003'];
const rating_v4 = ['WGEN004'];
// const reader_v1 = ['WGEN005'];
// const reader_v2 = ['WGEN006'];
// const reader_v3 = ['WGEN007'];
// const reader_v4 = ['WGEN008'];
const reader_v5 = ['WGEN005'];
const reader_v6 = ['WGEN006'];
const reader_v7 = ['WGEN007'];
const reader_v8 = ['WGEN008'];
const profile_v1 = ['WGEN009'];
const profile_v2 = ['WGEN010'];
const profile_v3 = ['WGEN011'];
const profile_v4 = ['WGEN012'];
const discovery_v1 = ['WGEN013'];
const discovery_v2 = ['WGEN014'];
const discovery_v3 = ['WGEN015'];
const discovery_v4 = ['WGEN016'];
const home_v1 = ['WGEN017'];
const home_v2 = ['WGEN018'];
const home_v3 = ['WGEN019'];
const home_v4 = ['WGEN020'];
const book_v1 = ['WGEN021'];
const book_v2 = ['WGEN022'];
const book_v3 = ['WGEN023'];
const book_v4 = ['WGEN024'];


let REFERRER_EVENT;
let REFERRER_EXPERIMENTID;
let REFERRER_DATA = {
    REFER_ACTION: 'DIRECT',
    REFER_LOCATION: 'DIRECT',
    REFER_SCREEN: 'DIRECT',
    REFER_EXPID: 'DIRECT'
};

export function translateWord(word, callback) {
    $.ajax({
        url: "https://www.google.com/inputtools/request?ime=transliteration_en_" + process.env.LANGUAGE + "&num=5&cp=0&cs=0&ie=utf-8&oe=utf-8&app=jsapi",
        data: {
            text: word
        },
        type: "GET",

        dataType: "json",
    }).done(function(json) {
        callback(json[1][0][1])
    });
}

export function openLoginModal(pageSource, action, location) {
    triggerAnanlyticsEvent('LANDED_REGISTERM_GLOBAL', 'CONTROL', {
        REFER_SCREEN: getAnalyticsPageSource(pageSource),
        REFER_ACTION: action,
        REFER_LOCATION: location

    });
    $('#login_modal').modal('show');
}

export function openPratilipiModal() {
    $('#pratilipi_modal').modal('show');
}

export function getAnalyticsPageSource(pageSource) {
    let analyticsPageSource;
    switch (pageSource) {
        case 'homepage':
            analyticsPageSource = 'HOME';
            break;
        case 'pratilipipage':
            analyticsPageSource = 'BOOK';
            break;
        case 'authorpage':
            analyticsPageSource = 'USER';
            break;
        case 'notification':
            analyticsPageSource = 'NOTIFS';
            break;
        case 'readerpage':
            analyticsPageSource = 'READER';
            break;
        case 'eventspage':
            analyticsPageSource = 'EVENTLIST';
            break;
        case 'eventpage':
            analyticsPageSource = 'EVENT';
            break;
        case 'writepage':
            analyticsPageSource = 'CREATE';
            break;
        case 'librarypage':
            analyticsPageSource = 'LIBRARY';
            break;
        case 'searchpage':
            analyticsPageSource = 'SEARCH';
            break;
        case 'blogspage':
            analyticsPageSource = 'BLOGLIST';
            break;
        case 'blogpage':
            analyticsPageSource = 'BLOG';
            break;
        case 'interviewspage':
            analyticsPageSource = 'AUTHORINT';
            break;
        case 'interviewpage':
            analyticsPageSource = 'AUTHORINT';
            break;
        case 'listpage':
            analyticsPageSource = 'CATEGORY';
            break;
        case 'discover':
            analyticsPageSource = 'DISCOVER';
            break;
        case 'login':
            analyticsPageSource = 'LOGIN';
            break;
        case 'register':
            analyticsPageSource = 'SIGNUP';
            break;
        case 'messages':
            analyticsPageSource = 'MESSAGES';
            break;
    }
    return analyticsPageSource;
}

export function openInputModal() {
    $('#reportModal').modal('show');
}

export function openMultiInputModal() {
    $('#multiinput').modal('show');
}

export function openForgotPasswordModal() {
    $('#forgotPassModal').modal('show');
}

export function openConfirmationModal() {
    $('#confirmation').modal('show');
}

export function openPrimaryConfirmationModal() {
    $('#confirmation-primary').modal('show');
}

export function openWritePratilipiModal() {
    $('#writermodal').modal('show');
}

export function openWebPushModal() {
    $('#webPushModal').modal('show');
}

export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}

export function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
}

export function isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
}

export function getCurrentLanguage() {
    const currentLocale = process.env.LANGUAGE;
    let language;
    constants.LANGUAGES.forEach((eachLanguage) => {
        if (eachLanguage.shortName === currentLocale) {
            language = eachLanguage;
        }
    });
    return language;
}

export function getLowResolutionImage(imageUrl) {
    let type;

    if (isChrome()){
        type = 'webp';
    } else {
        type = 'jpg';
    }

    if (imageUrl.indexOf('?') === -1) {
        return imageUrl + `?quality=low&type=${type}&width=50`;
    } else {
        return imageUrl + `&quality=low&type=${type}&width=50`;
    }
}

// For Author Image
export function getMediumResolutionImage(imageUrl) {
    let type;

    if (isChrome()){
        type = 'webp';
    } else {
        type = 'jpg';
    }

    if (imageUrl.indexOf('?') === -1) {
        return imageUrl + `?quality=high&type=${type}&width=120`;
    } else {
        return imageUrl + `&quality=high&type=${type}&width=120`;
    }
}

export function getHighResolutionImage(imageUrl) {
    let type;
    if (isChrome()){
        type = 'webp';
    } else {
        type = 'jpg';
    }

    if (imageUrl.indexOf('?') === -1) {
        return imageUrl + `?quality=high&type=${type}`;
    } else {
        return imageUrl + `&quality=high&type=${type}`;
    }
}

export function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return true;
    } else {
        return false;
    }
}

export function validatePassword(password) {
    if (password && password.length >= 6  ){
        return true;
    } else {
        return false;
    }
}

export function validateUsername(name) {
    if (name && name.length > 0) {
        return true;
    } else {
        return false;
    }
}

export function setAnalyticsUserProperty(propertyName, propertyValue) {

    if (process.env.REALM !== 'PROD') {
        const identify = new amplitude.Identify();
        identify.set(propertyName, propertyValue);
        amplitude.getInstance().identify(identify);
    }

    const propertyObject = {};
    propertyObject[propertyName] = String(propertyValue)

    if (propertyName === 'USER_ID' && propertyValue != "0" ) {

        if (process.env.REALM !== 'PROD') {
            amplitude.getInstance().setUserId(propertyValue);
        }
    }

    if (!window.FB) {
        setTimeout(() => {
            if (propertyName === 'USER_ID') {
                try {
                    FB.AppEvents.setUserID(String(propertyValue));
                } catch (e) {}
            }
            if (window.FB && FB.AppEvents.getUserID() === undefined || FB.AppEvents.getUserID() === null || FB.AppEvents.getUserID().trim() === '') {
                return;
            }
            try{
                FB.AppEvents.updateUserProperties(propertyObject, function (res, error) {
                    console.log(res);
                });
            } catch (e) {}
        }, 15000);
    } else {
        if (propertyName === 'USER_ID') {
            try {
                FB.AppEvents.setUserID(String(propertyValue));
            } catch (e) {}
        }
        if (FB.AppEvents.getUserID() === undefined || FB.AppEvents.getUserID() === null || FB.AppEvents.getUserID().trim() === '') {
            return;
        }

        try {
            FB.AppEvents.updateUserProperties(propertyObject, function (res) {
                console.log("FACEBOOK USER_PROPS: ", res);
            });
        } catch(e) {}
    }

}


export function setReferrerEvent(eventName) {
    REFERRER_EVENT = eventName;
}

export function getReferrerEvent() {
    return REFERRER_EVENT;
}

export function setReferrerExperimentId(experimentId) {
    REFERRER_EXPERIMENTID = experimentId;
}

export function getReferrerExperimentId() {
    return REFERRER_EXPERIMENTID;
}

export function setReferrerData(referrerScreen, referrerLocation, referrerAction, referrerExpId) {
    REFERRER_DATA = {
        REFER_ACTION: referrerAction,
        REFER_LOCATION: referrerLocation,
        REFER_SCREEN: referrerScreen,
        REFER_EXPID: referrerExpId
    }
}

export function getReferrerData() {
    return REFERRER_DATA;
}

export function triggerAnanlyticsEvent(eventName, experimentType, eventProperty) {

    let eventProps;
    switch(true) {
        case (experimentType === 'CONTROL'):
            eventProps = { ...controlAnalyticsEvents[eventName] };
            break;
        case (rating_v1.indexOf(experimentType) > -1):
            eventProps = { ...ratingV1AnalyticsEvents[eventName] };
            break;
        case (rating_v2.indexOf(experimentType) > -1):
            eventProps = { ...ratingV2AnalyticsEvents[eventName] };
            break;
        case (rating_v3.indexOf(experimentType) > -1):
            eventProps = { ...ratingV3AnalyticsEvents[eventName] };
            break;
        case (rating_v4.indexOf(experimentType) > -1):
            eventProps = { ...ratingV4AnalyticsEvents[eventName] };
            break;
        // case (reader_v1.indexOf(experimentType) > -1):
        //     eventProps = { ...readerV1AnalyticsEvents[eventName] };
        //     break;
        // case (reader_v2.indexOf(experimentType) > -1):
        //     eventProps = { ...readerV2AnalyticsEvents[eventName] };
        //     break;
        // case (reader_v3.indexOf(experimentType) > -1):
        //     eventProps = { ...readerV3AnalyticsEvents[eventName] };
        //     break;
        // case (reader_v4.indexOf(experimentType) > -1):
        //     eventProps = { ...readerV4AnalyticsEvents[eventName] };
        //     break;
        case (reader_v5.indexOf(experimentType) > -1):
            eventProps = { ...readerV5AnalyticsEvents[eventName] };
            break;
        case (reader_v6.indexOf(experimentType) > -1):
            eventProps = { ...readerV6AnalyticsEvents[eventName] };
            break;
        case (reader_v7.indexOf(experimentType) > -1):
            eventProps = { ...readerV7AnalyticsEvents[eventName] };
            break;
        case (reader_v8.indexOf(experimentType) > -1):
            eventProps = { ...readerV8AnalyticsEvents[eventName] };
            break;
        case (profile_v1.indexOf(experimentType) > -1):
            eventProps = { ...profileV1AnalyticsEvents[eventName] };
            break;
        case (profile_v2.indexOf(experimentType) > -1):
            eventProps = { ...profileV2AnalyticsEvents[eventName] };
            break;
        case (profile_v3.indexOf(experimentType) > -1):
            eventProps = { ...profileV3AnalyticsEvents[eventName] };
            break;
        case (profile_v4.indexOf(experimentType) > -1):
            eventProps = { ...profileV4AnalyticsEvents[eventName] };
            break;
        case (discovery_v1.indexOf(experimentType) > -1):
            eventProps = { ...discoveryV1AnalyticsEvents[eventName] };
            break;
        case (discovery_v2.indexOf(experimentType) > -1):
            eventProps = { ...discoveryV2AnalyticsEvents[eventName] };
            break;
        case (discovery_v3.indexOf(experimentType) > -1):
            eventProps = { ...discoveryV3AnalyticsEvents[eventName] };
            break;
        case (discovery_v4.indexOf(experimentType) > -1):
            eventProps = { ...discoveryV4AnalyticsEvents[eventName] };
            break;
        case (home_v1.indexOf(experimentType) > -1):
            eventProps = { ...homeV1AnalyticsEvents[eventName] };
            break;
        case (home_v2.indexOf(experimentType) > -1):
            eventProps = { ...homeV2AnalyticsEvents[eventName] };
            break;
        case (home_v3.indexOf(experimentType) > -1):
            eventProps = { ...homeV3AnalyticsEvents[eventName] };
            break;
        case (home_v4.indexOf(experimentType) > -1):
            eventProps = { ...homeV4AnalyticsEvents[eventName] };
            break;
        case (book_v1.indexOf(experimentType) > -1):
            eventProps = { ...bookv1AnalyticsEvents[eventName] };
            break;
        case (book_v2.indexOf(experimentType) > -1):
            eventProps = { ...bookv2AnalyticsEvents[eventName] };
            break;
        case (book_v3.indexOf(experimentType) > -1):
            eventProps = { ...bookv3AnalyticsEvents[eventName] };
            break;
        case (book_v4.indexOf(experimentType) > -1):
            eventProps = { ...bookv4AnalyticsEvents[eventName] };
            break;
    }

    if (!eventProps.SCREEN_NAME) {
        eventProps.SCREEN_NAME = eventProperty['SCREEN_NAME'];
        delete eventProperty.SCREEN_NAME;
    }

    if (eventName.indexOf('LANDED') > -1) {
        eventProps = {
            ...eventProps,
            ...getReferrerData()
        }
    }

    if (eventProps && eventProps.ACTION) {
        if (eventName !== 'VIEWED_APPBANNER_GLOBAL') {
            setReferrerData(eventProps.SCREEN_NAME, eventProps.LOCATION, eventProps.ACTION, experimentType);
        }

        if (eventProps.ACTION === 'LOGOUT') {
            if (process.env.REALM !== 'PROD') {
                amplitude.getInstance().setUserId(null);
                amplitude.getInstance().regenerateDeviceId();
            }
        }

        eventProps = {
            ...eventProps,
            ...eventProperty,
            'DEVICE_TYPE': isMobile() ? 'MOBILE':'DESKTOP',
            'WEBSITE_TYPE': 'MARK8',
            'EXPERIMENT_ID': experimentType,
            'ENVIRONMENT': process.env.REALM,
            'CONTENT_LANGUAGE': getCurrentLanguage().fullName.toUpperCase(),
            'SCREEN_LOCATION': eventProps.SCREEN_NAME + '_' + eventProps.LOCATION
        }
        console.info(eventName, eventProperty, eventProps);
        if (eventName !== 'VIEWED_APPBANNER_GLOBAL' &&
            eventName !== 'VIEWED_AUTHORDETAIL_BOOK' &&
            eventName !== 'VIEWANDROID_OPENAPP_READER' &&
            eventName !== 'VIEWED_RATEREV_BOOK' &&
            eventName !== 'VIEWED_RECOMMENDBOOK_BOOK' &&
            eventName !== 'VIEWED_RECOMMENDBOOK_READER' &&
            eventName !== 'SENDMESSAGE_USERCHAT_P2PCHAT' &&
            eventName !== 'CLICKUSER_USERCHAT_P2PCHAT' &&
            eventName !== 'BLOCKUSER_USERCHAT_P2PCHAT' &&
            eventName !== 'UNBLOCKUSER_USERCHAT_P2PCHAT' &&
            eventName !== 'DELETECHAT_USERCHAT_P2PCHAT' &&
            eventName !== 'VIEWALLCHATS_USERCHAT_P2PCHAT' &&
            eventName !== 'DELETECHAT_ALLCHATS_P2PCHAT' &&
            eventName !== 'UNBLOCKUSER_ALLCHATS_P2PCHAT' &&
            eventName !== 'BLOCKUSER_ALLCHATS_P2PCHAT' &&
            eventName !== 'STARTCHAT_ALLCHATS_P2PCHAT' &&
            eventName !== 'DELETECHAT_ALLCHATS_P2PCHAT' &&
            eventName !== 'STARTCHAT_NEWCHATS_NOTIFS' &&
            eventName !== 'VIEWALLCHATS_NEWCHATS_NOTIFS') {
                if (process.env.REALM !== 'PROD') {
                    amplitude.getInstance().logEvent(eventName, eventProps);
                }
        } else {
            console.info('SKIPPING EVENT');
        }

        ga('send', {
            hitType: 'event',
            eventCategory: eventProps.LOCATION,
            eventAction: eventProps.ACTION,
            eventLabel: eventProps.SCREEN_NAME
        });

        if (!window.fbApiInit) {
            setTimeout(() => {
                try {
                    FB.AppEvents.logEvent(eventName, null, eventProperty)
                } catch (e) {}
            }, 15000);
        } else {
            try {
                FB.AppEvents.logEvent(eventName, null, eventProperty)
            } catch (e) {}
        }

    } else {
        console.info('NON REGISTERED EVENT: ', eventName);
    }
}

export function getPratilipiAnalyticsData(pratilipiData) {
    return {
        'PRATILIPI_TYPE': pratilipiData.type,
        'CONTENT_ID': pratilipiData.pratilipiId,
        'AUTHOR_ID': pratilipiData.author.authorId,
        'CONTENT_LANGUAGE': pratilipiData.language
    }
}

export function getAndroidIntentUri( utmParameters ) {``
    const SCHEME = 'http';
    const PACKAGE_NAME = 'com.pratilipi.mobile.android';
    const PLAYSTORE_URL = 'https://play.google.com/store/apps/details?id=' + PACKAGE_NAME;
    const UTM_PARAMETER = utmParameters ? encodeURIComponent( Object.keys(utmParameters).map(function(key){ return key + "=" + utmParameters[key] }).join("&") ) : "";
    const uri = window.location.host + window.location.pathname + ( window.location.search || '' );
    return isChrome() ?
        'intent://' + uri + '#Intent;scheme=' + SCHEME + ';package=' + PACKAGE_NAME + ';S.browser_fallback_url=' + PLAYSTORE_URL + '&referrer=' + UTM_PARAMETER + ';end' :
        'intent://' + uri + '#Intent;scheme=' + SCHEME + ';package=' + PACKAGE_NAME + ';S.browser_fallback_url=' + 'market://search?q=pname:' + PACKAGE_NAME + '&referrer=' + UTM_PARAMETER + ';end' ;
}

export function getCookie( cname ) {
    const name = cname + "=";
    const ca = document.cookie.split( ';' );
    for( let i = 0; i < ca.length; i++ ) {
        let c = ca[i];
        while( c.charAt(0) == ' ' ) c = c.substring( 1 );
        if( c.indexOf( name ) == 0 ) return c.substring( name.length, c.length );
    }
    return null;
}

export function setCookie( name, value, days, path ) {
    var expires = "";
    if( days ) {
        var date = new Date();
        date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
        expires = "expires=" + date.toGMTString() + ";";
    }
    document.cookie = name + "=" + ( value ? value : "" ) + ";" + expires + "path=" + ( path ? path : '/' );
}

export function isCurrentEvent( eventId ) {

    let isItCurrentEvent = false;


    if(!eventId) {
        return isItCurrentEvent;
    }

    if ( eventId == 6900000000000080 ||
        eventId == 6900000000000079 ||
        eventId == 6900000000000083 ||
        eventId == 6900000000000075 ||
        eventId == 6900000000000074 ||
        eventId == 6900000000000077 ||
        eventId == 6900000000000084 ) {
        isItCurrentEvent = true;
    }
    //
    // constants.CATEGORY_DATA.sections.forEach((eachSection) => {
    //     eachSection.categories.forEach((eachCategory) => {
    //         if (eachCategory && eachCategory.pratilipiListData && eachCategory.pratilipiListData.eventId == eventId) {
    //             isItCurrentEvent = true;
    //         }
    //     });
    // });

    return isItCurrentEvent;
}

export function validateFirstAndSecondPassword(firstPassword, secondPassword) {

    if(firstPassword == secondPassword)
    {
        return true;
    } else {
        return false
    }
}

export function isTestEnvironment() {
    return (!window.location.host.endsWith('.pratilipi.com')) || window.location.host.split('.')[0].includes('-gamma')
}
