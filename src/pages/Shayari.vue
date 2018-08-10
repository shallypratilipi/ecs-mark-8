<template>
    <MainLayout>
        <div class="shayari">
            <div class="shayari-item card" v-for="shayari in shayariList">
                <div class="shayari-details">
                    <img :src="shayari.image" />
                </div>
                <div class="social-icons">
                    <div class="like-button social-button" @click="triggerLikeShareAnalytics()">
                        <i class="material-icons">thumb_up</i>
                        <span>{{12345 | showThousandsInK(1)}}</span>
                    </div>
                    <div class="share-button social-button" @click="triggerWhatsappShareAnalytics()">
                        <icon name="whatsapp" scale="1.5"></icon>
                        <span>{{12345 | showThousandsInK(1)}}</span>
                    </div>
                </div>
            </div>
            <div class="shayari-shadow shayari-modal" v-if="shouldShowModal">
                <p class="close" @click="resetModal()"><b>X</b></p>
                <div class="shayari-details">
                  <div>
                    <img :src="shayariList[this.$route.query.postId].image" width=100%> </img>
                  </div>
                </div>
                <br>
                <div class="social-icons">
                    <div class="like-button social-button" @click="triggerLikeShareAnalytics()">
                        <i class="material-icons">thumb_up</i>
                        <span>{{12345 | showThousandsInK(1)}}</span>
                    </div>
                    <div class="share-button social-button" @click="triggerWhatsappShareAnalytics()">
                        <icon name="whatsapp"></icon>
                        <span>{{12345 | showThousandsInK(1)}}</span>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>
<script>
import mixins from '@/mixins';
import inViewport from 'vue-in-viewport-mixin';
import constants from '@/constants';
import WebPushUtil from '@/utils/WebPushUtil';
import MainLayout from '@/layout/main-layout.vue';
import 'vue-awesome/icons/whatsapp'
import * as firebase from "firebase";
import {
    mapGetters,
    mapActions
} from 'vuex';

export default {
    props: {
        'in-viewport-once': {
            default: true
        },
        'in-viewport-offset-top': {
            default: -350
        }
    },
    mixins: [
        mixins,
        inViewport
    ],
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    data() {
        return {
            shouldShowModal: this.$route.query.postId ? true : false,
            language: constants.LANGUAGES.filter((eachLanguage) => eachLanguage.shortName === process.env.LANGUAGE)[0].fullName.toUpperCase(),
            shayariList: []
        }
    },
    components: {
        MainLayout
    },
    methods: {
        resetModal() {
            this.shouldShowModal = false;
            this.triggerAnanlyticsEvent(`CLOSE_VAPSISHAYARI_SHAYARI`, 'CONTROL', {'USER_ID': this.getUserDetails.userId});
        },
        fetchShayariList() {
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
                const shayariPreferenceNode = firebase.database().ref("EXPERIMENT").child("SHAYARI").child(that.language);
                shayariPreferenceNode.on('value', (snapshot) => {
                    const shayariPreferences = snapshot.val();
                    that.shayariList = shayariPreferences;
                    console.log(that.shayariList)
                });
            });
        },
        setPageOgTags() {
            document.head.querySelector('meta[property="og:image"]').content = this.$route.query.postId ? (this.shayariList[this.$route.query.postId] ? this.shayariList[this.$route.query.postId].image : undefined) : (this.shayariList[0] ? this.shayariList[0].image : undefined);
        },
        triggerLikeShareAnalytics(postId) {
            this.triggerAnanlyticsEvent(`LIKE_VAPSISHAYARI_SHAYARI`, 'CONTROL', {'USER_ID': this.getUserDetails.userId});
        },
        triggerWhatsappShareAnalytics(postId) {
            this.triggerAnanlyticsEvent(`SHAREWA_VAPSISHAYARI_SHAYARI`, 'CONTROL', {'USER_ID': this.getUserDetails.userId});

            const textToShare = `${window.location.host}${window.location.pathname}${encodeURIComponent(`?postId=${1}&utm_source=whatsapp&utm_medium=social&utm_campaign=shayari`)}`;
            window.open(`https://api.whatsapp.com/send?text=${textToShare}`);
        }
    },
    watch: {
        'inViewport.now'(visible) {
            if (visible) {
                this.triggerAnanlyticsEvent(`VIEW_VAPSISHAYARI_SHAYARI`, 'CONTROL', {'USER_ID': this.getUserDetails.userId});
            }
        },
        'shayariList'() {
          this.setPageOgTags();
        }
    },
    mounted() {
        this.fetchShayariList();
    }
}
</script>

<style lang="scss">
.shayari {
    background: #f8f8f8;
    margin-top: 85px;
    min-height: 700px;
    max-width: 600px;
    margin: 0 auto;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
    }
    .shayari-item {
        margin: 10px;
    }
    .shayari-details {
        margin: 5px 5px 0;
        img {
            max-width: 100%;
        }
    }
    .social-icons {
        .social-button {
            display: inline-block;
            width: 49%;
            padding: 10px 0;
            span, i, .fa-icon {
                vertical-align: middle;
            }

        }
    }
}

.shayari-banner {
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

.shayari-image {
    flex: 1;
    @media screen and (min-width: 1400px) {
        font-size: 26px;
    }
}

.shayari-text {
    flex: 2;
    @media screen and (min-width: 1400px) {
        font-size: 26px;
        text-align: center;
    }
}

.shayari-shadow {
    -webkit-box-shadow: 0px 15px 54px -5px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 15px 54px -5px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 15px 54px -5px rgba(0, 0, 0, 0.75);
}

.shayari-heading {
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

.shayari-button {
    margin: 1px;
    text-align: center;
    font-weight: 200;
    @media screen and (min-width: 1400px) {
        font-size: 26px;
        text-align: center;
    }
}

.shayari-button:hover {
    background-color: #F99BA7;
}

.modal-message {
    display: flex;
    align-items: center;
    justify-content: center;
}

.shayari-footer {
    font-weight: bold;
    font-size: 12px;
    text-align: right;
    padding: 3%;
    cursor: pointer;
}

.shayari-modal {
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
    .shayari-details {
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
