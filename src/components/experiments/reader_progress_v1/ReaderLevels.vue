<template>
    <div>
        <transition name="fade">
            <div v-if="showCongratulationMessage" class="congratulations" style="display: block;">
                <h3>__('reader_gamify_congratulations')</h3>
                <h2>__('reader_gamify_you_reached_level')</h2>
                <div class="hexagon"><icon class="bronze" name="trophy"></icon></div>
                <p v-if="getUserDetails.isGuest && getReaderLevel === 3">__('reader_gamify_login_to_save_your_progress')</p>
                <button v-if="getUserDetails.isGuest && getReaderLevel === 3" @click="saveReadProgress" data-target="#login_modal" class="btn-login">__("user_sign_in") / __("user_sign_up")</button>
            </div>
        </transition>
        <div class="reader-levels" style="display: block;">
            <h3>__('reader_gamify_read_levels')</h3>
            <h2>__('reader_gamify_level')</h2>
            <!-- <div class="level level-name-left bronze">Level 0</div>
            <div class="level level-name-right silver">Level 1</div> -->
            <div class="hexagon"><icon class="bronze" name="trophy"></icon></div>
            <div class="progress">
                <div class="progress-bar" :style="{ width: (getReadStats.read_count - readLevelThreshold[getReaderLevel - 1]) / (readLevelThreshold[getReaderLevel] - readLevelThreshold[getReaderLevel -1]) * 100 + '%'}"></div>
            </div>
            <p class="help-text" v-if="getReaderLevel < 3"><b>{{(( Number(getReadStats.read_count) - readLevelThreshold[getReaderLevel - 1] ) / (readLevelThreshold[getReaderLevel] - readLevelThreshold[getReaderLevel -1]) * 100).toFixed(2) }}%</b>
                __('reader_gamify_read_count_to_reach_level')</p>
            <p v-else class="help-text">__('reader_gamify_more_levels_coming_soon')</p>
            <router-link :to="'/'" @click.native="triggerAnanlyticsEventAndGoToCategories" class="explore-books">__('reader_gamify_explore_contents')</router-link>
        </div>
    </div>
</template>

<script>
import 'vue-awesome/icons/trophy'
import { mapGetters, mapActions } from 'vuex';
import inViewport from 'vue-in-viewport-mixin';
import mixins from '@/mixins'

export default {
    data() {
        return {
            readLevelThreshold: {
                '-1': 0,
                0: 3,
                1: 8,
                2: 16,
                3: 17
            },
            showCongratulationMessage: false
        }
    },
    props: {
        pratilipiData: {
            required: true,
            type: Object
        },
        'in-viewport-once': {
            default: true
        }
    },
    computed: {
        ...mapGetters([
            'getReadStats',
            'getReaderLevel',
            'getUserDetails',
            'getFirebaseGrowthDBLoadingState'
        ])
    },
    methods: {
        ...mapActions([
            'setAfterLoginAction',
            'setReadCount'
        ]),
        saveReadProgress() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`CLICKLOGIN_CONGRATULATE_READER`, 'WGEN025', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': localStorage.readCount
            });
            this.setAfterLoginAction({ action: `setReadCount`, data: localStorage.readCount });
            this.openLoginModal();
        },
        triggerAnanlyticsEventAndGoToCategories() {
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`CLICKCATEGORY_PROGRESS_READER`, 'WGEN025', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': localStorage.readCount
            });
        },
        updateReadPratilipisInFirebase() {
            const that = this;
            import('firebase').then((firebase) => {
                firebase.app("FirebaseGrowth").database().ref('/READ_HISTORY').child(that.getUserDetails.userId).once('value').then((snapshot) => {
                    const readHistory = snapshot.val();
                    const { readPratilipis } = localStorage;

                    const pratilipisToUpdate = {};
                    if (readHistory && readPratilipis) {
                        JSON.parse(readPratilipis).forEach((eachPratilipi) => {
                            if (!readHistory[eachPratilipi]) {
                                pratilipisToUpdate[eachPratilipi] = true;
                            }
                        });
                    } else if(!readHistory) {
                        JSON.parse(readPratilipis).forEach((eachPratilipi) => {
                            pratilipisToUpdate[eachPratilipi] = true;
                        });
                    }

                    firebase.app("FirebaseGrowth").database().ref('/READ_HISTORY').child(that.getUserDetails.userId).update(pratilipisToUpdate).then(() => {
                        const finalReadHistory = {
                            ...readHistory,
                            ...pratilipisToUpdate
                        }

                        let totalReadCount = 0;
                        for (let pratilipiId in readHistory) {
                            totalReadCount++;
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                }).catch((error) => {
                    console.log(error);
                })
            });
        }
    },
    mounted() {
        const that = this;
        if (!this.getUserDetails.isGuest) {
            this.updateReadPratilipisInFirebase();
        }
        this.showCongratulationMessage = false;
    },
    mixins: [
        mixins,
        inViewport
    ],
    watch: {
        'getReadStats.read_count'(newCount) {
            console.log('Ive read a new book');
            if (!this.getUserDetails.isGuest) {
                this.updateReadPratilipisInFirebase();
            }
        },
        'getReaderLevel'(newLevel) {
            this.showCongratulationMessage = true;
            const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
            this.triggerAnanlyticsEvent(`VIEWED_CONGRATULATE_READER`, 'WGEN025', {
                ...pratilipiAnalyticsData,
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': newLevel
            });
            // setTimeout(() => {
            //     this.showCongratulationMessage = false;
            // }, 5000);
        },
        'getUserDetails.isGuest'(isGuest) {
            if (!isGuest) {

            }
        },
        'getFirebaseGrowthDBLoadingState'(loaded) {
            if (loaded) {
                this.updateReadPratilipisInFirebase();
            }
        },
        'inViewport.now': function(visible) {
            console.log('LEVEL VISIBILITY: ', visible);
            if (visible) {
                const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.pratilipiData);
                this.triggerAnanlyticsEvent(`VIEWED_PROGRESS_READER`, 'WGEN025', {
                    ...pratilipiAnalyticsData,
                    'USER_ID': this.getUserDetails.userId,
                    'ENTITY_VALUE': localStorage.readCount
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
.hexagon {
    width: 60px;
    height: 25px;
    background: #555;
    position: relative;
    filter: drop-shadow(0 2px 2px rgba(0,0,0,.2));
    &:before {
        content: "";
        position: absolute;
        top: -20px;
        left: 0;
        width: 0;
        height: 0;
        border-left: 30px solid transparent;
        border-right: 30px solid transparent;
        border-bottom: 20px solid #555;
    }
    &:after {
        content: "";
        position: absolute;
        bottom: -20px;
        left: 0;
        width: 0;
        height: 0;
        border-left: 30px solid transparent;
        border-right: 30px solid transparent;
        border-top: 20px solid #555;
    }
    .fa-icon {
        display: block;
        width: auto;
        height: 2em;
        max-width: 100%;
        max-height: 100%;
        margin: 0 auto;
        color: #555;
        &.bronze {
            color: #fb8c1e;
        }
        &.silver {
            color: #C0C0C0;
        }
        &.gold {
            color: #FFD700;
        }
    }
}
.reader-levels {
    padding: 5px 10px;
    background: #fff;
    border: 1px solid #e9e9e9;
    margin: 0 10px 10px;
    position: relative;
    h3 {
        text-align: left;
        font-size: 15px;
        padding: 5px 0;
        color: #8e8e8e;
        text-transform: uppercase;
    }
    h2 {
        font-size: 20px;
        color: #555;
    }
    .level {
        font-size: 12px;
        padding: 5px 2px;
        border: 1px solid #e9e9e9;
        padding: 5px;
        border-radius: 3px;
        margin: 5px 0;
        &:before {
            content: "";
            width: 5px;
            height: 5px;
            background: #e9e9e9;
            display: inline-block;
            border-radius: 50%;
            margin-right: 5px;
            vertical-align: middle;
        }
        &.bronze {
            border-color: #cd7f32;
            &:before {
                background: #cd7f32;
            }
        }
        &.silver {
            border-color: #C0C0C0;
            &:before {
                background: #C0C0C0;
            }
        }
        &.gold {
            border-color: #FFD700;
            &:before {
                background: #FFD700;
            }
        }
    }
    .hexagon {
        position: absolute;
        top: -5px;
        right: -5px;
    }
    .level-name-left, .level-name-right {
        float: left;
    }
    .level-name-right {
        float: right;
    }
    .progress {
        clear: both;
        height: 5px;
        border-radius: 0;
        .progress-bar {
            background: #555;
        }
    }
    .help-text {
        font-size: 13px;
        padding: 5px 0;
        color: #555;
        margin: 0;
        a {
            color: #d0021b;
        }
    }
    .explore-books {
        background: #d0021b;
        border-radius: 3px;
        outline: none;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        margin: 5px 0;
        padding: 5px 10px;
        display: inline-block;
        clear: both;
        cursor: pointer;
    }

    .btn-login {
        background: #d0021b;
        border-radius: 3px;
        outline: none;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        margin: 10px 0;
        padding: 5px 10px;
        display: inline-block;
        clear: both;
        cursor: pointer;
        outline: none;
        border: 0;
        float: right;
    }
}
.congratulations {
    padding: 5px 10px;
    background: #fff;
    border: 1px solid #e9e9e9;
    margin: 0 10px 10px;
    position: relative;
    text-align: center;
    h3 {
        font-size: 15px;
        padding: 5px 0;
        color: #8e8e8e;
        text-transform: uppercase;
    }
    h2 {
        font-size: 20px;
        color: #555;
        margin: 10px 0;
    }
    .hexagon {
        margin: 30px auto;
    }
    p {
        font-size: 14px;
        margin: 5px 0;
    }
    .btn-login {
        background: #d0021b;
        border-radius: 3px;
        outline: none;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        margin: 10px 0;
        padding: 5px 10px;
        display: inline-block;
        clear: both;
        cursor: pointer;
        outline: none;
        border: 0;
    }
}
</style>
