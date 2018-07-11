<template>
   <div class="vapasi">
      <div class="horoscope-banner" @click="showModal()">
         <div class="horoscope-text" >
            __("today_horoscope")
            <br class="vapasi-break">
            __("click_here_to_know_more")
         </div>
         <div class="horoscope-image">
             <img :src="imageHoroscopeBanner" height="50" width="50">
         </div>
      </div>
      <div class="horoscope-shadow horoscope-modal" v-if="shouldShowModal">
         <div v-if="!goToDetails">
            <p class="close" @click="resetModal()">X</p>
            <p class="horoscope-heading"> __("select_zodiac_sign")</p>
            <div class="modal-message">
               <div class="modal-buttons">
                   <button class="btn btn-default horoscope-button" v-for="(eachSign) in zodiac"
                           @click="setHoroscopeValue(eachSign.nameEn,eachSign.image)"> {{eachSign.name}}
                   </button>
               </div>
               <br><br>
            </div>
         </div>
         <div v-if="goToDetails">
            <p class="close" @click="resetModal()">X</p>
            <p class="horoscope-heading">__("your_today_horoscope")  <span> <img v-bind:src="horoscopeImage" height="30" width="30" class="span-image"></span></p>
            <div class="horoscope-details">
               <p id="shareThisAsImage">
                  {{getHoroscope}}
               </p>
                <button class="btn btn-danger btn-sm" v-if="isNotificationButtonEnabled"
                        @click="triggerAnalyticsEventAndFireNotification()">
                    __("get_notification")
                </button>
                <div class="social-icons">
                  <span id="fecebookShareButton"><img src="../assets/facebookImage.png" height="30" width="30" @click="triggerFacebookShareAnalytics"></span>
                  <span><img  src="../assets/whatsappImage.png" height="30" width="30" @click="triggerWhatsappShareAnalytics"></span>
                  <!-- <span><img src="../assets/twitterImage.png" height="30" width="30" ></span> -->
               </div>
            </div>
            <br><br>
         </div>
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
    props: {

    },
    mixins: [
        mixins,
        inViewport
    ],
    computed: {
        ...mapGetters('homepage', [
            'getHoroscope',
            'getHoroscopeImage'

        ]),
        ...mapGetters([
            'getUserDetails',
            'getPratilipiData',
        ]),


    },
    data() {
        return {
             zodiac : [
                {
                    'name': '__("zodiac_capricorn")',
                    'nameEn': 'capricorn',
                    'image': 'static/zodiac_signs/goat.svg'
                },
                {
                    'name': '__("zodiac_aquarius")',
                    'nameEn': 'aquarius',
                    'image': 'static/zodiac_signs/aquarius.svg'
                },
                {
                    'name': '__("zodiac_pisces")',
                    'nameEn': 'pisces',
                    'image': 'static/zodiac_signs/pisces.svg'
                },
                {
                    'name': '__("zodiac_aries")',
                    'nameEn': 'aries',
                    'image': 'static/zodiac_signs/aries.svg'
                },
                {
                    'name': '__("zodiac_taurus")',
                    'nameEn': 'taurus',
                    'image': 'static/zodiac_signs/taurus.svg'
                },
                {
                    'name': '__("zodiac_gemini")',
                    'nameEn': 'gemini',
                    'image': 'static/zodiac_signs/gemini.svg'
                },
                {
                    'name': '__("zodiac_cancer")',
                    'nameEn': 'cancer',
                    'image': 'static/zodiac_signs/cancer.svg'
                },
                {
                    'name': '__("zodiac_leo")',
                    'nameEn': 'leo',
                    'image': 'static/zodiac_signs/leo.svg'
                },
                {
                    'name': '__("zodiac_virgo")',
                    'nameEn': 'virgo',
                    'image': 'static/zodiac_signs/virgo.svg'
                },
                {
                    'name': '__("zodiac_libra")',
                    'nameEn': 'libra',
                    'image': 'static/zodiac_signs/libra.svg'
                },
                {
                    'name': '__("zodiac_scorpio")',
                    'nameEn': 'scorpio',
                    'image': 'static/zodiac_signs/scorpio.svg'
                },
                   {
                    'name': '__("zodiac_sagittarius")',
                    'nameEn': 'sagittarius',
                    'image': 'static/zodiac_signs/sagittarius.svg'
                },
                ],
            shouldShowModal: false,
            goToDetails: false,
            valueOfHoroscope: "",
            language: '',
            horoscopeImage: '',
            imageHoroscopeBanner: 'static/zodiac_signs/leo.svg',
            isNotificationButtonEnabled: false
        }
    },
    methods: {
        ...mapActions('homepage', [
            'fetchHoroscope',
        ]),


        resetModal() {
            this.goToDetails = false;
            this.shouldShowModal = false;
            let pratilipiAnalyticsData = {};
             if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
            this.triggerAnanlyticsEvent(`CLICKEVENT_HOROSCOPECLOSE_HOME`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'HOROSCOPE_CLOSE',
            });

        },
        showModal() {
            this.shouldShowModal = true;
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
            this.triggerAnanlyticsEvent(`CLICKEVENT_VAPASIHOROSCOPE_HOME`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'HOROSCOPE_LIST',
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
                                if(vapasiPreferences && vapasiPreferences.HOROSCOPE) {
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
                        'og:url': `https://${window.location.host}?utm_source=facebook&utm_medium=social&utm_campaign=vapsi-horoscope`,
                        'og:title': '__("your_today_horoscope")',
                        'og:description': this.getHoroscope,
                        'og:image': this.getHoroscopeImage
                    }
                })
            });
            this.triggerAnanlyticsEvent(`SHARE_HOROSCOPEFB_HOME`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'HOROSCOPE_OF_THE_DAY',
            });
        },
        triggerAnalyticsEventAndFireNotification() {
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }

            this.triggerAnanlyticsEvent(`CLICKEVENT_HOROSCOPENOTIFICATION_HOME`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'HOROSCOPE_OF_THE_DAY',
            });

            if (this.getUserDetails.isGuest) {
                this.openLoginModal(this.$route.meta.store, 'NOTIFY', 'VAPASI');
            }
            else {
                 WebPushUtil.enabledOnCustomPrompt(this.$route.meta.store);
                const that = this;

                const vapasiPreferencesNode = firebase.database().ref("PREFERENCE").child(that.getUserDetails.userId).child("vapsiSubscription").child(that.language);
                vapasiPreferencesNode.update({
                        "HOROSCOPE": this.valueOfHoroscope
                });
            }

        },
        triggerWhatsappShareAnalytics() {

            const textToShare = `__("today_horoscope"): ${this.getHoroscopeImage}. To see: https://${window.location.host}/${encodeURIComponent('?utm_source=whatsapp&utm_medium=social&utm_campaign=vapsi-horoscope')}.`;
            window.open(`https://api.whatsapp.com/send?text=${textToShare}`);

            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }

            this.triggerAnanlyticsEvent(`SHARE_HOROSCOPEWA_HOME`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'HOROSCOPE_OF_THE_DAY',
            });
        },
        goToHoroscopeDetails() {
                this.goToDetails = true;
                this.fetchHoroscope({horoscope: this.valueOfHoroscope, language: this.language});

                let pratilipiAnalyticsData = {};
                if (this.getPratilipiData) {
                    pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
                }
                this.triggerAnanlyticsEvent(`CLICKEVENT_HOROSCOPEDETAILS_HOME`, 'CONTROL', {
                    ...pratilipiAnalyticsData,
                    'USER_ID': this.getUserDetails.userId,
                    'ENTITY_VALUE': 'HOROSCOPE_DETAIL_' + this.valueOfHoroscope.toUpperCase(),
                });
        },
        setHoroscopeValue(value,image) {
            const that = this;
            this.valueOfHoroscope = value;
            this.horoscopeImage = image;
            this.goToHoroscopeDetails();
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
        let k = 0;
        let pratilipiAnalyticsData = {};
        if (this.getPratilipiData) {
            pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
        }
        this.triggerAnanlyticsEvent(`VIEWED_VAPASIHOROSCOPE_HOME`, 'CONTROL', {
            ...pratilipiAnalyticsData,
            'USER_ID': this.getUserDetails.userId,
            'ENTITY_VALUE': 'VAPASI_HOROSCOPE_VIEWED',
        });

        let that = this;
        setInterval(function () {
            that.imageHoroscopeBanner = that.zodiac[k].image;
            k++;
            if (k >= 11) {
                k = 0;
            }
        }, 3000);


        this.vapasiNotification(this.getUserDetails.isGuest);

    },
    components: {},
}
</script>

<style lang="scss">
.vapasi {
    margin-bottom: 20px;
}
.horoscope-banner {
        background: #1488CC;
        background: -webkit-linear-gradient(to right, #2B32B2, #1488CC);
        background: linear-gradient(to right, #2B32B2, #1488CC);
        color: #EEE;
        display: flex;
        width: 100%;
        height: 100%;
        padding: 3%;
        cursor: pointer;
        @media screen and (min-width: 700px ) {
        padding-left: 400px;
        padding-right: 400px;
    }

    }

.horoscope-image {
     flex: 1;
     @media screen and (min-width: 700px ) {
        font-size: 26px;
        text-align: center;
    }

}
.horoscope-text {
     flex: 2;
     padding-top: 1px;
    @media screen and (min-width: 700px ) {
        font-size: 26px;
        text-align: center;
    }

}
.horoscope-shadow {
    -webkit-box-shadow: 0px 6px 18px -2px rgba(89,128,122,1);
    -moz-box-shadow: 0px 6px 18px -2px rgba(89,128,122,1);
    box-shadow: 0px 6px 18px -2px rgba(89,128,122,1);
}
.horoscope-heading {
    font-weight: bold;
    font-size: 14px;
    text-align: left;
    padding-top: 5%;
    padding-left: 3%;
     @media screen and (min-width: 700px ) {
        font-size: 26px;
        text-align: center;
    }

}
.horoscope-button {
    margin: 1px;
    text-align: center;
    font-weight: 200;
    width: 100px;
    @media screen and (min-width: 700px ) {
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
    margin-bottom: 20px;
}
.horoscope-footer {
    font-weight: bold;
    font-size: 12px;
    text-align: right;
    padding: 3%;
    cursor: pointer;
}
.horoscope-modal {
    position: fixed;
    z-index: 2;
    top: 20%;
    background-color: white;
    width: 90%;
    margin-left: 5%;
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
