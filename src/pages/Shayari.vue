<template>
    <MainLayout>
        <div class="shayari">
            <div class="shayari-item card" v-for="(shayari, index) in shayariList" v-if="shayari.id == $route.query.postId && shouldShowModal && shayariList.length !== 0">
                <div class="shayari-details">
                    <img :src="shayari.image" />
                </div>
                <div class="social-icons">
                    <div class="like-button social-button" @click="triggerLikeShareAnalytics(shayari.id)">
                        <icon name="thumbs-o-up" scale="1.5"></icon>
                        <span>{{shayari.likeCount | showThousandsInK(1)}}</span>
                    </div>
                    <div class="share-button social-button" @click="triggerWhatsappShareAnalytics(shayari.id)">
                        <icon name="whatsapp" scale="1.5"></icon>
                        <span>{{shayari.shareCount | showThousandsInK(1)}}</span>
                    </div>
                </div>
            </div>
            <div class="shayari-item card" v-for="(shayari, index) in shayariList" v-if="shayari.active && shayari.id != $route.query.postId && shayariList.length !== 0">
                <div class="shayari-details">
                    <img :src="shayari.image" />
                </div>
                <div class="social-icons">
                    <div class="like-button social-button" @click="triggerLikeShareAnalytics(shayari.id)">
                        <icon name="thumbs-o-up" scale="1.5"></icon>
                        <span>{{shayari.likeCount | showThousandsInK(1)}}</span>
                    </div>
                    <div class="share-button social-button" @click="triggerWhatsappShareAnalytics(shayari.id)">
                        <icon name="whatsapp" scale="1.5"></icon>
                        <span>{{shayari.shareCount | showThousandsInK(1)}}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="shayari-shadow shayari-modal" v-for="(shayari, index) in shayariList" v-if="shayari.id == $route.query.postId && shouldShowModal && shayariList.length !== 0">
            <p class="close" @click="resetModal()"><b>X</b></p>
            <div class="shayari-details">
                <img :src="shayari.image" width=100%> </img>
            </div>
            <div class="social-icons">
                <div class="like-button social-button" @click="triggerLikeShareAnalytics(shayari.id)">
                    <icon name="thumbs-o-up" scale="1.5"></icon>
                    <span>{{shayariList[$route.query.postId].likeCount | showThousandsInK(1)}}</span>
                </div>
                <div class="share-button social-button" @click="triggerWhatsappShareAnalytics(shayari.id)">
                    <icon name="whatsapp" scale="1.5"></icon>
                    <span>{{shayariList[$route.query.postId].shareCount | showThousandsInK(1)}}</span>
                </div>
            </div>
        </div>
        <div class="modal-backdrop" v-if="shouldShowModal"></div> -->
    </MainLayout>
</template>
<script>
import mixins from '@/mixins';
import constants from '@/constants';
import WebPushUtil from '@/utils/WebPushUtil';
import MainLayout from '@/layout/main-layout.vue';
import 'vue-awesome/icons/whatsapp'
import 'vue-awesome/icons/thumbs-o-up'
import * as firebase from "firebase";
import {
    mapGetters,
    mapActions
} from 'vuex';

export default {
    mixins: [
        mixins
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
                });
            });
        },
        setPageOgTags() {
            var flag = false;
            for( var i = 0; i < this.shayariList.length; i++ ) {
                if(this.$route.query.postId && this.$route.query.postId == this.shayariList[i].id) {
                    document.head.querySelector('meta[property="og:image"]').content = this.shayariList[i].image;
                    flag = true;
                    break;
                }
            }
            if(flag == false) {
               for( var i = 0; i < this.shayariList.length; i++ ) {
                    if(this.shayariList[i].active) {
                        document.head.querySelector('meta[property="og:image"]').content = this.shayariList[i].image;
                        flag = true;
                        break;
                    }
                } 
            }
        },
        triggerLikeShareAnalytics(postId) {
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

                var node = firebase.database().ref("EXPERIMENT").child("SHAYARI").child(that.language);
                node.once('value', (snapshot) => {
                    node.update({
                        "likeCount": snapshot.val().likeCount == undefined ? 1 : snapshot.val().likeCount + 1,
                        "lastUpdated": firebase.database.ServerValue.TIMESTAMP
                    });
                });
            });
            this.triggerAnanlyticsEvent(`LIKE_VAPSISHAYARI_SHAYARI`, 'CONTROL', {'USER_ID': this.getUserDetails.userId});
        },
        triggerWhatsappShareAnalytics(postId) {
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

                var node = firebase.database().ref("EXPERIMENT").child("SHAYARI").child(that.language);
                node.once('value', (snapshot) => {
                    node.update({
                        "shareCount": snapshot.val().shareCount == undefined ? 1 : snapshot.val().shareCount + 1,
                        "lastUpdated": firebase.database.ServerValue.TIMESTAMP
                    });
                });
            });
            this.triggerAnanlyticsEvent(`SHAREWA_VAPSISHAYARI_SHAYARI`, 'CONTROL', {'USER_ID': this.getUserDetails.userId});

            const textToShare = `${window.location.host}${window.location.pathname}${encodeURIComponent(`?postId=${postId}&utm_source=whatsapp&utm_medium=social&utm_campaign=shayari`)}`;
            window.open(`https://api.whatsapp.com/send?text=${textToShare}`);
        }
    },
    watch: {
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
        &.share-button {
            .fa-icon {
                color: #48c631;
            }
        }
        &.like-button {
            .fa-icon {
                color: #3b5998;
            }
        }
        span {
            font-size: 14px;
            margin-left: 5px;
        }
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

.modal-backdrop {
    background: rgba(0,0,0,0.5);
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}
.shayari-modal {
    position: fixed;
    z-index: 2;
    top: 20%;
    background-color: white;
    width: 90%;
    max-width: 500px;
    left: 50%;
    transform: translate(-50%,0);
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
