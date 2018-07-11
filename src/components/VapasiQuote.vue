<template>
   <div class="vapasi">
         <div class="vapasi-banner" @click="showModalContentQuote()">
            <div class="vapasi-text" >
               __("quote_of_the_day")
               <br class="vapasi-banner">
               __("click_here_to_know_more")
            </div>
            <div class="vapasi-image">
               <img src="../assets/quoteImage.svg"  height="50" width="50">
            </div>
         </div>
         <div class="vapasi-shadow vapasi-modal" v-if="shouldShowModal">
            <p class="close" @click="resetModal()"><b>X</b></p>
            <p class="vapasi-heading">
               __("thought_of_the_day")
               <span> <img src="../assets/quoteImage.svg" height="30" width="30" class="span-image"></span>
            </p>
            <div class="horoscope-details">
               <p id="shareThisAsImage">
                  {{getQuoteOfTheDay}}
               </p>
                <button class="btn btn-danger btn-sm" v-if="isNotificationButtonEnabled"
                        @click="triggerAnalyticsEventAndFireNotification()">
                  __("get_notofication")
                </button>
                <div class="social-icons">
                  <span><img src="../assets/facebookImage.png" height="30" width="30" @click="triggerFacebookShareAnalytics"></span>
                  <span ><img src="../assets/whatsappImage.png" height="30" width="30" @click="triggerWhatsappShareAnalytics"></span>
                  <!--                   <span><img src="../assets/twitterImage.png" height="30" width="30" ></span>
                     -->
               </div>
            </div>
            <br>
         </div>
   </div>
</template>
<script>
import Slick from 'vue-slick'
import mixins from '@/mixins';
import inViewport from 'vue-in-viewport-mixin';
import constants from '@/constants';
import WebPushUtil from '@/utils/WebPushUtil';
import * as firebase from "firebase";
import {
    mapGetters,
    mapActions
} from 'vuex';

export default {
    props: {},
    mixins: [
        mixins,
        inViewport
    ],
    computed: {
        ...mapGetters('homepage', [
            'getQuoteOfTheDay',
            'getQuoteImage',
        ]),
        ...mapGetters([
            'getUserDetails',
            'getPratilipiData',
        ]),


    },
    data() {
        return {
            shouldShowModal: false,
            goToDetails: false,
            language: '',
            shouldWebPush: false,
            isNotificationButtonEnabled: false

        }
    },
    methods: {
        ...mapActions('homepage', [
            'fetchQuoteOfTheDay'
        ]),
        resetModal() {
            this.goToDetails = false;
            this.shouldShowModal = false;
        },
        showModalContentQuote() {
            this.shouldShowModal = true;
            this.fetchQuoteOfTheDay(this.language);
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
            this.triggerAnanlyticsEvent(`CLICKEVENT_VAPASIQUOTE_HOME`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'QUOTE_OF_THE_DAY',
            });

        },

        vapasiNotification(isGuest) {
            if(WebPushUtil.isBrowserPushCompatible() ) {
                if(isGuest == null)
                    return;
                if (isGuest) {
                    this.isNotificationButtonEnabled=true;
                    } else {

                    const that = this;
                    import('firebase').then((firebase) => {
                        if (firebase.apps.length === 0) {
                            const config = {
                                apiKey: process.env.FIREBASE_API_KEY,
                                authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                                databaseURL: process.env.FIREBASE_DATABASE_URL,
                                storageBucket: process.env.FIREBASE_STORAGE_BUCKET
                            };
                            firebase.initializeApp(config);
                        }
                                firebase.auth().onAuthStateChanged( function( fbUser ) {
                            if (fbUser) {
                                const vapasiPreferencesNode = firebase.database().ref( "PREFERENCE" ).child( that.getUserDetails.userId).child('vapsiSubscription').child(that.language);
                                vapasiPreferencesNode.on( 'value', function( snapshot ) {
                                const vapasiPreferences = snapshot.val();
                                if(vapasiPreferences && vapasiPreferences.QUOTE) {
                                    that.isNotificationButtonEnabled=false;
                                }
                                else {
                                    that.isNotificationButtonEnabled=true;
                                }
                        });
                            }
                        })  
                        
                  
                    
                        
                       
                    });
                }
            }
        },
        triggerAnalyticsEventAndFireNotification() {
                let pratilipiAnalyticsData = {};
                if (this.getPratilipiData) {
                    pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
                }
//fix it
                this.triggerAnanlyticsEvent(`CLICKEVENT_QUOTENOTIFICATION_HOME`, 'CONTROL', {
                    ...pratilipiAnalyticsData,
                    'USER_ID': this.getUserDetails.userId,
                    'ENTITY_VALUE': 'QUOTE_OF_THE_DAY',
                });

                if (this.getUserDetails.isGuest) {
                    this.openLoginModal(this.$route.meta.store, 'NOTIFY', 'VAPASI');
                } else {
                    const that = this;
                    const vapasiPreferencesNode = firebase.database().ref("vapasiPreferencesNode").child(that.getUserDetails.userId).child("vapsiSubscription").child(that.language);

                    vapasiPreferencesNode.update({
                            "QUOTE": true,
                    });
                }
        

        },
        triggerFacebookShareAnalytics() {
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
                FB.ui({
                    method: 'share_open_graph',
                    action_type: 'og.shares',
                    action_properties: JSON.stringify({
                        object: {
                            'og:url': `https://${window.location.host}?utm_source=facebook&utm_medium=social&utm_campaign=vapsi-quote`,
                            'og:title': '__("thought_of_the_day")',
                            'og:description': this.getQuoteOfTheDay,
                            'og:image': this.getQuoteImage
                        }
                    })
                });
                this.triggerAnanlyticsEvent(`SHARE_QUOTEFB_HOME`, 'CONTROL', {
                    ...pratilipiAnalyticsData,
                    'USER_ID': this.getUserDetails.userId,
                    'ENTITY_VALUE': 'QUOTE_OF_THE_DAY',
                });
  
        },
        triggerWhatsappShareAnalytics() {
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
                this.triggerAnanlyticsEvent(`SHARE_QUOTEWA_HOME`, 'CONTROL', {
                    ...pratilipiAnalyticsData,
                    'USER_ID': this.getUserDetails.userId,
                    'ENTITY_VALUE': 'QUOTE_OF_THE_DAY',
                });

                const textToShare = `__("thought_of_the_day"): ${this.getQuoteImage}. To see: https://${window.location.host}/${encodeURIComponent('?utm_source=whatsapp&utm_medium=social&utm_campaign=vapsi-quote')}.`;
                window.open(`https://api.whatsapp.com/send?text=${textToShare}`);
        }
    },
    watch: {
         'getUserDetails.isGuest'(isGuest) {
            this.vapasiNotification(isGuest);
      
        },
    },
    created() {
        const currentLocale = process.env.LANGUAGE;
        constants.LANGUAGES.forEach((eachLanguage) => {
            if (eachLanguage.shortName === currentLocale) {
                this.language = eachLanguage.fullName.toUpperCase();
            }
        });
    },

    mounted() {
        let pratilipiAnalyticsData = {};
        if (this.getPratilipiData) {
            pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
        }
            this.triggerAnanlyticsEvent(`VIEWED_VAPASIQUOTE_HOME`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'VAPASI_QUOTE_VIEWED',
            });

        this.vapasiNotification(this.getUserDetails.isGuest);

    },
    components: {},
}
</script>

<style lang="scss">
.vapasi {
    .vapasi-break {
        @media screen and (min-width: 1400px) {
            display: none;
        }
    }
}

.vapasi-banner {
    background: #ff9966;
    background: -webkit-linear-gradient(to right, #ff5e62, #ff9966);
    background: linear-gradient(to right, #ff5e62, #ff9966);
    color: #fff;
    display: flex;
    width: 100%;
    height: 100%;
    padding: 3%;
    cursor: pointer;
    @media screen and (min-width: 1400px) {
        padding-left: 500px;
        padding-right: 400px;
        height: 100px;
        padding-top: 13px;
    }
}

.vapasi-image {
    flex: 1;
    @media screen and (min-width: 1400px) {
        font-size: 26px;
    }
}

.vapasi-text {
    flex: 2;
    @media screen and (min-width: 1400px) {
        font-size: 26px;
        text-align: center;
    }
}

.vapasi-shadow {
    -webkit-box-shadow: 0px 15px 54px -5px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 15px 54px -5px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 15px 54px -5px rgba(0, 0, 0, 0.75);
}

.vapasi-heading {
    font-weight: bold;
    font-size: 14px;
    text-align: left;
    padding-top: 5%;
    padding-left: 3%;
    @media screen and (min-width: 1400px) {
        font-size: 26px;
        text-align: center;
        padding-top: 1%;
    }
}

.horoscope-button {
    margin: 1px;
    text-align: center;
    font-weight: 200;
    @media screen and (min-width: 1400px) {
        font-size: 26px;
        text-align: center;
    }
}

.horoscope-button:hover {
    background-color: #F99BA7;
}

.modal-message {
    display: flex;
    align-items: center;
    justify-content: center;
}

.horoscope-footer {
    font-weight: bold;
    font-size: 12px;
    text-align: right;
    padding: 3%;
    cursor: pointer;
}

.vapasi-modal {
    position: fixed;
    z-index: 2;
    top: 20%;
    background-color: white;
    width: 90%;
    margin-left: 5%;
    @media screen and (min-width: 1400px) {
        left: 20%;
        width: 60%;
    }
    .horoscope-details {
        text-align: left;
        font-size: 18px;
        padding-left: 3%;
        padding-right: 3%;
        .social-icons {
            display: inline;
            position: absolute;
            cursor: pointer;
            right: 10%;
            bottom: 10%;
            @media screen and (min-width: 1400px) {
                right: 20%;
            }
        }
    }
}

.close {
    display: flex;
    align-items: right;
    margin: 10px;
    font-size: 16px;
    cursor: pointer;
}

.close:hover {
    font-weight: bold;
}

.span-image {
    position: absolute;
    right: 18%;
}
</style>
