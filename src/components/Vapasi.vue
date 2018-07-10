<template>
   <div class="vapasi">
      <div v-if="this.language=='GUJARATI'">
         <div class="vapasi-banner" @click="showModalContentJoke()">
            <div class="vapasi-text" >
               __("joke_of_the_day") 
               <br class="vapasi-break">
               __("click_here_to_know_more") 
            </div>
            <div class="vapasi-image">
               <img src="../assets/smileImage.png"  height="50" width="50">
            </div>
         </div>
         <div class="vapasi-shadow vapasi-modal" v-if="shouldShowModal" >
            <p class="close" @click="resetModal()"><b>X</b></p>
            <div class="container">
               <p class="vapasi-heading">__("joke_of_the_day")  <span> <img src="../assets/smileImage.png" height="30" width="30" class="span-image"></span></p>
               <div class="horoscope-details">
                  <p id="shareThisAsImage">
                     {{getJokeOfTheDay}}
                  </p>
                  <!-- <button class="btn btn-danger btn-sm">
                     __("get_notofication")
                     </button>  -->     
                  <div class="social-icons">
                     <span id="fecebookShareButton"><img src="../assets/facebookImage.png" height="30" width="30" @click="triggerFacebookShareAnalytics"></span>
                     <span><a target="_blank" ><img  src="../assets/whatsappImage.png" height="30" width="30" @click="triggerWhatsappShareAnalytics"></a></span>
                     <!-- <span><img src="../assets/twitterImage.png" height="30" width="30" ></span> -->
                  </div>
               </div>
               <br>
            </div>
         </div>
      </div>
      <div v-if="this.language=='HINDI'">
         <div class="vapasi-banner" @click="showModalContentQuote()">
            <div class="vapasi-text" >
               __("thought_of_the_day") 
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
               <!-- <button class="btn btn-danger btn-sm">
                  __("get_notofication") 
                  </button> -->      
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
    props: {},
    mixins: [
        mixins,
        inViewport
    ],
    computed: {
        ...mapGetters('homepage', [
            'getJokeOfTheDay',
            'getQuoteOfTheDay',
            'getJokeImage',
            'getQuoteImage',
        ]),
        ...mapGetters([
            'getUserDetails',
            'getPratilipiData',
        ]),


    },
    data() {
        return {
            zodiacSigns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            shouldShowModal: false,
            goToDetails: false,
            language: '',
        }
    },
    methods: {
        ...mapActions('homepage', [
            'fetchJokeOfTheDay',
            'fetchQuoteOfTheDay'
        ]),
        resetModal() {
            this.goToDetails = false;
            this.shouldShowModal = false;
        },
        showModalContentJoke() {

            this.fetchJokeOfTheDay(this.language);
            this.shouldShowModal = true;

            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
            this.triggerAnanlyticsEvent(`CLICKEVENT_VAPASI_JOKE`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'JOKE_OF_THE_DAY',
            });
        },
        showModalContentQuote() {
            this.shouldShowModal = true;
            this.fetchQuoteOfTheDay(this.language);
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
            this.triggerAnanlyticsEvent(`CLICKEVENT_VAPASI_QUOTE`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'QUOTE_OF_THE_DAY',
            });

        },
        triggerFacebookShareAnalytics() {
            let fbShareUrl = this.getQuoteImage;
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
            if (this.language == "HINDI") {
                FB.ui({
                    display: 'popup',
                    method: 'share',
                    href: this.fbShareUrl,
                }, function(response) {
                    console.log(response);
                });
                this.triggerAnanlyticsEvent(`SHARE_VAPASI_QUOTE_FACEBOOK`, 'CONTROL', {
                    ...pratilipiAnalyticsData,
                    'USER_ID': this.getUserDetails.userId,
                    'ENTITY_VALUE': 'QUOTE_OF_THE_DAY',
                });
            } else if (this.language == "GUJARATI") {
                FB.ui({
                    display: 'popup',
                    method: 'share',
                    href: this.fbShareUrl,
                }, function(response) {
                    console.log(response);
                });
                this.triggerAnanlyticsEvent(`SHARE_VAPASI_JOKE_FACEBOOK`, 'CONTROL', {
                    ...pratilipiAnalyticsData,
                    'USER_ID': this.getUserDetails.userId,
                    'ENTITY_VALUE': 'JOKE_OF_THE_DAY',
                });
            }
        },
        triggerWhatsappShareAnalytics() {
            let pratilipiAnalyticsData = {};
            if (this.getPratilipiData) {
                pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            }
            if (this.language == "HINDI") {
                this.triggerAnanlyticsEvent(`SHARE_VAPASI_QUOTE_WHATSAPP`, 'CONTROL', {
                    ...pratilipiAnalyticsData,
                    'USER_ID': this.getUserDetails.userId,
                    'ENTITY_VALUE': 'QUOTE_OF_THE_DAY',
                });
                let waLink = "https://api.whatsapp.com/send?text=" + this.getQuoteImage;
                window.open(waLink);
            } else if (this.language == "GUJARATI") {
                this.triggerAnanlyticsEvent(`SHARE_VAPASI_JOKE_WHATSAPP`, 'CONTROL', {
                    ...pratilipiAnalyticsData,
                    'USER_ID': this.getUserDetails.userId,
                    'ENTITY_VALUE': 'joke_of_the_dayY',
                });
                let waLink = "https://api.whatsapp.com/send?text=" + this.getJokeImage;
                window.open(waLink);
            }


        }
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
        if (this.language == "HINDI") {
            this.triggerAnanlyticsEvent(`VIEWED_VAPASIQUOTE_HOME`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'VAPASI_QUOTE_VIEWED',
            });
        } else if (this.language == "GUJARATI") {
            this.triggerAnanlyticsEvent(`VIEWED_VAPASIJOKE_HOME`, 'CONTROL', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': 'VAPASI_JOKE_VIEWED',
            });
        }
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
    background-color: #F99BA7;
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
    z-index: 9999;
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
