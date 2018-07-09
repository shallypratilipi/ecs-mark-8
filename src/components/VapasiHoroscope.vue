<template>
   <div class="vapasi">
      <div class="horoscope-banner" @click="showModal()">
         <div class="horoscope-text" >
            __("today_horoscope") 
            <br class="vapasi-break">
            __("click_here_to_know_more") 
         </div>
         <div class="horoscope-image">
            <img v-bind:src="mockImage"  height="50" width="50">
         </div>
      </div>
      <div class="horoscope-shadow horoscope-modal" v-if="shouldShowModal">
         <div v-if="!goToDetails">
            <p class="close" @click="resetModal()">X</p>
            <p class="horoscope-heading"> __("select_zodiac_sign")</p>
            <div class="modal-message">
               <div class="modal-buttons">
                  <button  class="btn btn-default horoscope-button" v-for="eachSign in zodiacSigns" @click="setHoroscopeValue(eachSign)">{{eachSign}}</button>
               </div>
               <br><br>
            </div>
            <p class="horoscope-footer" @click="goToHoroscopeDetails">__("next") > </p>
         </div>
         <div v-if="goToDetails">
            <p class="close" @click="resetModal()">X</p>
            <p class="horoscope-heading">__("your_today_horoscope")  <span> <img v-bind:src="mockImage" height="30" width="30" class="span-image"></span></p>
            <div class="horoscope-details">
               <p id="shareThisAsImage">
                  {{getHoroscope}}
               </p>
               <!-- <button class="btn btn-danger btn-sm" @click="getPhotoHd()">Get in Notification</button>        -->
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
            zodiacSigns: ["capricorn", "aquarius", "pisces", "aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius"],
            shouldShowModal: false,
            mockImage: "https://cdn2.iconfinder.com/data/icons/horoscope/512/horoscope_5-512.png",
            goToDetails: false,
            valueOfHoroscope: "",
            language: ''
        }
    },
    methods: {
        ...mapActions('homepage', [
            'fetchHoroscope',
        ]),
        resetModal() {
            this.goToDetails = false;
            this.shouldShowModal = false;
        },
        showModal() {
            this.shouldShowModal = true;
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
            this.triggerAnanlyticsEvent(`CLICKEVENT_VAPASI_HOROSCOPE_LIST`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'HOROSCOPE_LIST',
            });
        },
        triggerFacebookShareAnalytics() {
            let fbShareUrl = this.getHoroscopeImage;
            console.log(fbShareUrl);
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
            FB.ui({
                display: 'popup',
                method: 'share',
                href: this.fbShareUrl,
            }, function(response) {
                console.log(response);
            });
            this.triggerAnanlyticsEvent(`SHARE_VAPASI_HOROSCOPE_FACEBOOK`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'HOROSCOPE_OF_THE_DAY',
            });
        },

        triggerWhatsappShareAnalytics() {

            let waLink = "https://api.whatsapp.com/send?text='" + this.getHoroscopeImage + "'";
            console.log(this.getHoroscopeImage);
            window.open(waLink);

            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }

            this.triggerAnanlyticsEvent(`SHARE_VAPASI_HOROSCOPE_WHATSAPP`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'HOROSCOPE_OF_THE_DAY',
            });


        },

        getPhotoHd() {
            let canvas = document.getElementById("shareThisAsImage");
            console.log(canvas);
        },
        goToHoroscopeDetails() {
            if (this.valueOfHoroscope.length > 0) {
                this.goToDetails = true;
                console.log(this.valueOfHoroscope);
                this.fetchHoroscope(this.valueOfHoroscope);

                let pratilipiAnalyticsData = {};
                if (this.getPratilipiData) {
                    pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
                }
                this.triggerAnanlyticsEvent(`CLICKEVENT_VAPASI_HOROSCOPE_DETAILS`, 'CONTROL', {
                    ...pratilipiAnalyticsData,
                    'USER_ID': this.getUserDetails.userId,
                    'ENTITY_VALUE': 'HOROSCOPE_DETAIL_' + this.valueOfHoroscope.toUpperCase(),
                });
            }

        },
        setHoroscopeValue(value) {
            this.valueOfHoroscope = value;
            console.log(value);
        }
    },
    created() {
        const currentLocale = process.env.LANGUAGE;
        constants.LANGUAGES.forEach((eachLanguage) => {
            if (eachLanguage.shortName === currentLocale) {
                this.language = eachLanguage.fullName.toUpperCase();
                console.log("MY LANG IS: " + this.language);

            }
        });
    },
    mounted() {
        let pratilipiAnalyticsData = {};
        if (this.getPratilipiData) {
            pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
        }
        this.triggerAnanlyticsEvent(`VIEWED_VAPASIHOROSCOPE_HOME`, 'CONTROL', {
            ...pratilipiAnalyticsData,
            'USER_ID': this.getUserDetails.userId,
            'ENTITY_VALUE': 'VAPASI_HOROSCOPE_VIEWED',
        });
    },
    components: {},
}
</script>

<style lang="scss">
.vapasi {
    margin-bottom: 20px;
}
.horoscope-banner {
        background-color: #F99BA7;
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
    z-index: 9999;
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
