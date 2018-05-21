<template>
    <!-- Pratilipi Modal -->
    <div class="modal fade pratilipi-modal" id="pratilipi_modal" tabindex="-1" role="dialog" aria-labelledby="pratilipi-modalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">{{ getPratilipiData.title }}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body" v-if="getPratilipiData.pratilipiId">
                    <div class="book-type" :class="getPratilipiData.type">
                        {{ getPratilipiData.type | getPratilipiTypeInNativeLanguage }}<span></span>
                    </div>
                    <div class="book-cover" :style="{'background-image': `url('${getPratilipiData.coverImageUrl}')`}"></div>
                    <div class="image-mask">
                        <span>
                            <button class="add-library" v-if="!getUserPratilipiData.addedToLib" @click="addPratilipiToLibrary(getPratilipiData.pratilipiId)">
                                <i class="material-icons">bookmark_border</i>
                                <i class="material-icons stacked grey">add</i>
                            </button>
                            <button class="add-library" v-else @click="triggerAnalyticsAndRemovePratilipiFromLibrary(getPratilipiData.pratilipiId)">
                                <i class="material-icons added-to-lib">bookmark</i>
                                <i class="material-icons stacked">check</i>
                            </button>
                        </span>
                        <button type="button" data-toggle="modal" @click="openShareModal"><i class="material-icons">share</i></button>
                    </div>
                    <div class="book-name">
                        <router-link :to="getPratilipiData.pageUrl" @click.native="removeBackdrop">{{ getPratilipiData.title }}</router-link>
                    </div>
                    <div class="author-name" v-if="getPratilipiData.author">{{ getPratilipiData.author.fullName }}</div>
                    <div class="date-added">__("pratilipi_listing_date"): {{ getPratilipiData.listingDateMillis | convertDate }}</div>
                    <div class="book-summary">{{ getPratilipiData.summary || getPratilipiData.cardSummary }}</div>
                    <div class="book-tags">
                        <span v-for="each_tag in getPratilipiData.tags" :key="each_tag.id">{{ each_tag.name }}</span>
                    </div>
                    <div class="stats">
                        <div class="rating">
                            <div class="icons">
                                <i class="material-icons">star</i>
                            </div>
                            <span>
                                {{ getPratilipiData.averageRating | round(1) }}
                            </span>
                        </div>
                        <div class="read-count">
                            <div class="icons">
                                <i class="material-icons">remove_red_eye</i>
                            </div>
                            <span>
                                {{ getPratilipiData.readCount | round(1) }}
                            </span>
                        </div>
                        <div class="read-time">
                            <div class="icons">
                                <i class="material-icons">access_time</i>
                            </div>
                            <span>
                                {{ getPratilipiData.readingTime | showInMinutesOrHours }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer"  v-if="getPratilipiData.pratilipiId">
                    <div class="main-actions">
                        <router-link class="read-btn" :to="getPratilipiData.readPageUrl" @click.native="triggerReadPratilipiModalEvent" :title="getPratilipiData.title">
                            <span>__("read")</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixins from '@/mixins';
import PratilipiImage from '@/components/PratilipiImage';
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ]),
        ...mapGetters('pratilipimodal', [
            'getPratilipiData',
            'getUserPratilipiData'
        ])
    },
    mixins: [
        mixins
    ],
    methods: {
        ...mapActions('pratilipimodal', [
            'addToLibrary',
            'removeFromLibrary'
        ]),
        ...mapActions([
            'setShareDetails',
            'setAfterLoginAction'
        ]),
        triggerReadPratilipiModalEvent() {
            $('.modal-backdrop').hide();
            $('body').removeClass("modal-open");
        },
        removeBackdrop() {
            $('.modal-backdrop').hide();
            $('body').removeClass("modal-open");
        },
        addPratilipiToLibrary(pratilipiId) {
            if (this.getUserDetails.isGuest) {
                // throw popup modal
                console.log(this.$route);
                this.setAfterLoginAction({ action: `${this.$route.meta.store}/addToLibrary`, data: pratilipiId });
                this.openLoginModal(this.$route.meta.store, 'LIBRARYADD', this.screenLocation);
            } else {
                this.addToLibrary(pratilipiId);
            }
        },
        triggerAnalyticsAndRemovePratilipiFromLibrary() {
            this.removeFromLibrary();
        },
        openShareModal() {
            // const pratilipiAnalyticsData = this.getPratilipiAnalyticsData(this.getPratilipiData);
            // this.triggerAnanlyticsEvent(`CLICKSHRBOOK_${this.screenLocation}_${this.screenName}`, 'CONTROL', {
            //     ...pratilipiAnalyticsData,
            //     'USER_ID': this.getUserDetails.userId
            // });
            this.setShareDetails({ data: this.getPratilipiData, type: 'PRATILIPI', screen_name: 'HOME', screen_location: 'COLLECTIONS' });
            $('#share_modal').modal('show');
        }
    },
    created() {

    }
}
</script>


<style lang="scss" scoped>
.pratilipi-modal {
    @media screen and (max-width: 500px ) {
        max-width: 320px;
        margin: 0 auto;
    }
    &.modal.show .modal-dialog {
        top: 10%;
    }
    .modal-header, .modal-footer {
        padding: 10px;
    }
    .modal-footer {
        padding: 0 10px 10px;
        border-top: 0;
    }
    .modal-title {
        font-size: 16px;
        width: 100%;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .modal-body {
        padding: 10px;
    }
    .book-name {
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        max-height: 52px;
        line-height: 24px;
        overflow: hidden;
        a {
            color: #d0021b;
        }
    }
    .book-type {
        font-size: 11px;
        line-height: 20px;
        font-weight: 700;
        color: #fff;
        padding: 0 20px 3px;
        background: #4CAF50;
        position: absolute;
        top: 15px;
        left: 1px;
        z-index: 1;
        height: 21px;
        &:before {
            content: '';
            position: absolute;
            border-left: 0px solid transparent;
            border-right: 10px solid transparent;
            border-top: 21px solid #4CAF50;
            bottom: -3px;
            left: 50%;
            margin-left: 0px;
            left: 100%;
            padding-bottom: 3px;
        }
        &:after {
            content: '';
            position: absolute;
            border-top: 0 solid transparent;
            border-bottom: 10px solid transparent;
            border-right: 10px solid #4CAF50;
            top: 100%;
            left: -10px;
            left: 0;
        }
        span {
            content: '';
            position: absolute;
            border-top: 0 solid transparent;
            border-bottom: 10px solid transparent;
            border-right: 10px solid rgba(0, 0, 0, 0.2);
            top: 100%;
            left: -10px;
            left: 0;
            z-index: 9;
        }
        &.ARTICLE {
            background: #42bab0;
        }
        &.ARTICLE:before {
            border-top: 21px solid #42bab0;
        }
        &.ARTICLE:after {
            border-right: 10px solid #42bab0;
        }
        &.POEM {
            background: #FF9800;
        }
        &.POEM:before {
            border-top: 21px solid #FF9800;
        }
        &.POEM:after {
            border-right: 10px solid #FF9800;
        }
    }
    .book-cover {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        margin: 0 auto 5px;
        width: 99%;
        height: 150px;
        position: relative;
        @media screen and (min-width: 768px ) {
            height: 245px;
        }
    }
    .image-mask {
        position: absolute;
        top: 5px;
        right: 5px;
        left: auto;
        margin: 5px;
        background: none;
        text-align: right;
        width: auto;
        height: auto;
        button {
            padding: 0;
            margin: 5px 5px 0 0;
            text-align: center;
            width: 40px;
            height: 40px;
            font-size: 14px;
            background: #fff;
            color: #2c3e50;
            border-radius: 50%;
            cursor: pointer;
            outline: none;
            border: 1px solid #e9e9e9;
            z-index: 2;
            position: relative;
            float: right;
            &.add-library {
                margin-right: 10px;
                i {
                    font-size: 23px;
                }
            }
            i {
                height: 40px;
                line-height: 40px;
                font-size: 18px;
                &.stacked {
                    position: absolute;
                    top: -1px;
                    left: -1px;
                    margin-left: 14px;
                    font-size: 11px;
                    color: #fff;
                    font-weight: 700;
                    &.grey {
                        color: #212121;
                        margin-left: 13.5px;
                        margin-top: -1px;
                        left: 0;
                    }
                }
            }
        }
    }
    .author-name {
        margin: 2px 0;
        display: inline-block;
        font-size: 15px;
    }
    .date-added {
        font-size: 12px;
        margin: 0;
        color: #555555;
    }
    .book-summary {
        color: #212121;
        font-size: 12px;
        max-height: 55px;
        overflow: hidden;
        margin: 5px 0 0;
    }
    .book-tags {
        margin-bottom: 5px;
        span {
            background: #e9e9e9;
            font-size: 12px;
            margin: 5px;
            padding: 5px 10px;
            border-radius: 15px;
            display: inline-block;
        }
    }
    .stats {
        border-top: 1px solid #e9e9e9;
        border-bottom: 1px solid #e9e9e9;
        margin-top: 5px;
        overflow: hidden;
        text-align: center;
        .rating, .read-count, .read-time {
            float: left;
            width: 32%;
            padding: 10px 2px;
            font-size: 12px;
            color: #212121;
            .icons {
                display: inline-block;
                vertical-align: middle;
                padding-right: 4px;
                i {
                    font-size: 13px;
                }
            }
        }
        .read-count, .read-time {
            border-left: 1px solid #e9e9e9;
            padding: 10px 0;
        }
        .read-time {
            font-size: 12px;
        }
    }
    .read-more {
        display: block;
        text-align: center;
        color: #d0021b;
        font-size: 12px;
        background: #fff;
        position: relative;
        padding: 2px 5px;
    }
    .main-actions {
        width: 100%;
        background: #fff;
        .read-btn {
            display: inline-block;
            width: 100%;
            height: 52px;
            line-height: 52px;
            font-size: 17px;
            text-align: center;
            background: #d0021b;
            color: #fff;
            font-weight: 700;
            border: 0;
            outline: none;
            padding: 0;
            margin: 0;
            cursor: pointer;
            &:hover {
                text-decoration: none;
                opacity: 0.8;
            }
        }
    }
    
}
.language-ta .stats .read-time, .language-te .stats .read-time, .language-ml .stats .read-time, .language-kn .stats .read-time {
    font-size: 10px;
    @media screen and (max-width: 768px ) {
        font-size: 9px;
    }
}
</style>
