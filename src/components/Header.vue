<template>
    <div>
        <header v-if="!isHidden">
            <div class="container">
                <div class="row">
                    <div class="col-lg-2 col-sm-4 col-5 p-r-0">
                        <span
                          @click="triggerHomeEvent"
                          class="logo">
                        </span>
                        <div class="language-dropdown">
                            <button class="btn dropdown-toggle" type="button" @click="triggerLanguageEvent" id="languageDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            __("pratilipi")
                            </button>
                            <div class="dropdown-menu" aria-labelledby="languageDropdown">
                                <a class="dropdown-item" :class="{ 'isActive': getCurrentLanguage().fullName === eachLanguage.fullName }" :href="'https://' + eachLanguage.fullName + '.pratilipi.com'" :key="index" v-for="(eachLanguage, index) in languages">{{ eachLanguage.languageNative }}</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5 col-sm-8 col-7 search-box-wrap">
                        <div class="search-box d-none d-lg-block">
                            <div class="form-group has-feedback" id="search-box-big">
                                <label for="big-search">Search</label>
                                <input id="big-search" type="text" class="form-control" :value="searchText" @input="changeSearchText" @keyup.enter="goToSearchPage" @click="opendesktopsearch" v-bind:placeholder="'__("search_bar_help")'"/>
                                <i class="material-icons">search</i>
                                <SearchBox :searchText="searchText"></SearchBox>
                            </div>
                            <div
                            class="notification-icon"
                            @click="triggerEventAndResetNotificationCount">
                                <i class="material-icons">notifications</i>
                                <span v-if="notificationCount">{{ notificationCount }}</span>
                                <span v-if="(!notificationCount && pendingMessages.length > 0) || this.getUserDetails.isGuest" class="message-notification"></span>
                            </div>
                        </div>
                        <div class="d-block d-lg-none search-box search-box-2 text-right">
                            <div class="form-group has-feedback" id="search-box-small">
                                <label for="small-search">Search</label>
                                <input type="text" id="small-search" class="form-control" :value="searchText" @input="changeSearchText" @keyup.enter="goToSearchPage" @click="openmobilesearch" v-bind:placeholder="'__("search")'"/>
                                <i class="material-icons">search</i>
                                <SearchBox :searchText="searchText"></SearchBox>
                            </div>
                            <div
                            @click="triggerEventAndResetNotificationCount"
                            class="notification-icon">
                                <i class="material-icons">notifications</i>
                                <span v-if="notificationCount">{{ notificationCount }}</span>
                                <span v-if="(!notificationCount && pendingMessages.length > 0) || this.getUserDetails.isGuest" class="message-notification"></span>
                            </div>
                        </div>
                    </div>
                    <div class="d-none d-lg-block col-lg-5">
                        <MainMenu :userDetails="userDetails"></MainMenu>
                    </div>
                </div>
            </div>
        </header>
        <div class="d-block d-lg-none footer-menu" v-if="!hideFooter">
            <MainMenu :userDetails="userDetails"></MainMenu>
        </div>
        <div class="unread-message capsule" v-if="showUnreadCapsule" @click="triggerCapsuleClick">
            <span v-if="initialUnreadConversations === 1">__("message_capsule_conversation")</span>
            <span v-else>__("message_capsule_conversations")</span>
        </div>
    </div>
</template>

<script>
import constants from '@/constants'
import mixins from '@/mixins'
import SearchBox from '@/components/SearchBox.vue'
import MainMenu from '@/components/MainMenu.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        userDetails: {
            type: Object,
            required: true
        },
        notificationCount: {
            type: Number
        },
        pendingMessages: {
            type: Array
        },
        isHidden: {
            type: Boolean
        },
        hideFooter: {
            type: Boolean
        }
    },
    mixins: [
        mixins
    ],
    data(){
        return {
            languages: constants.LANGUAGES,
            isCurrentLanguage: (language) => {
                if (language === process.env.LANGUAGE) {
                    return true;
                } else {
                    return false;
                }

            },
            searchText: '',
            scrollPosition: null,
            scrollDirection: null,
            counter: 0,
            initialUnreadConversations: 0,
            showUnreadCapsule: false
        }
    },
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    components: {
        SearchBox,
        MainMenu
    },
    methods: {
        changeSearchText(event) {
            this.searchText = event.target.value;
        },
        triggerHomeEvent() {
            const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
            this.triggerAnanlyticsEvent('GOHOME_HEADER_GLOBAL', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                SCREEN_NAME
            });
            this.$router.push('/');
        },
        triggerLanguageEvent() {
            const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
            this.triggerAnanlyticsEvent('GOLANGUAGE_HEADER_GLOBAL', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                SCREEN_NAME
            });
        },
        goToSearchPage() {
            this.triggerAnanlyticsEvent(`SEARCH_SEARCHM_SEARCH`, 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                'ENTITY_VALUE': this.searchText
            });
            this.$router.push({ name: 'Search_Page', query: { q: this.searchText } });
            $("#search-box-small .search-dropdown").hide();
            $("#search-box-big .search-dropdown").hide();
        },
        opendesktopsearch() {
            $("#search-box-big .search-dropdown").show();
            this.triggerAnanlyticsEvent('LANDED_SEARCHM_SEARCH', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId
            });
            $(document).mouseup(function(e) {
                var container = $(".search-dropdown");
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    container.hide();
                }
            });
        },
        openmobilesearch() {
            $("#search-box-small .search-dropdown").show();
            this.triggerAnanlyticsEvent('LANDED_SEARCHM_SEARCH', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId
            });
            $(document).mouseup(function(e) {
                var container = $(".search-dropdown");
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    container.hide();
                }
            });
        },
        triggerEventAndResetNotificationCount() {
            const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
            this.triggerAnanlyticsEvent('GONOTIFPAGE_HEADER_GLOBAL', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                SCREEN_NAME
            });
            this.$router.push('/notifications');
            this.resetNotificationCount;
        },
        ...mapActions([
            'resetNotificationCount'
        ]),
        updateScroll() {
            this.scrollPosition = window.scrollY
        },
        triggerCapsuleClick() {
            this.showUnreadCapsule = false;
            
            const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
            this.triggerAnanlyticsEvent('GOMESSAGESPAGE_HEADER_GLOBAL', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId,
                SCREEN_NAME
            });
            
            this.$router.push('/messages');
        }
    },
    watch: {
        'scrollPosition'(newScrollPosition, prevScrollPosition){
            if (newScrollPosition > 70 && this.scrollDirection === 'DOWN') {
                $('header').addClass('nav-up');
            } else if(newScrollPosition <= 70) {
                $('header').removeClass('nav-up');
            }

            if (newScrollPosition < prevScrollPosition) {
                this.counter++;
                this.scrollDirection = 'UP';
            } else {
                this.scrollDirection = 'DOWN';
            }

            if (this.counter > 5) {
                $('header').removeClass('nav-up');
                this.counter = 0;
            }
        },
        '$route.query.q'(value) {
            this.searchText = value;
        },
        'pendingMessages'(messages) {
            if (messages && messages.length !== this.initialUnreadConversations) {
                this.initialUnreadConversations = messages.length;
                this.showUnreadCapsule = true;
                setTimeout(() => {
                    this.showUnreadCapsule = false;
                }, 10000);
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.updateScroll);

        // Hide Footer when keyboard comes
        if (this.isMobile()) {
            $(document).on('focus', 'input', function() {
                $(".footer-menu").css("height", "0")
            });
            $(document).on('blur', 'input', function() {
                $(".footer-menu").css("height", "51px")
            });
        }
        if (this.$route.path === '/notifications' ) {
            $(".notification-icon").addClass("active");
        }

        if(this.$route.query.q) {
            this.searchText = this.$route.query.q;
        }
    },
    destroyed() {
        window.removeEventListener('scroll', this.updateScroll);
    }
}
</script>

<style lang="scss" scoped>
    header {
        box-shadow: 0 2px 2px rgba(0,0,0,0.2);
        margin-bottom: 10px;
        padding: 10px 0;
        position: fixed;
        top: 0;
        z-index: 5;
        width: 100%;
        background: #fff;
        -webkit-transition: .2s ease;
        -o-transition: .2s ease;
        transition: .2s ease;
        .p-r-0 {
            padding-right: 0;
        }
        .logo {
            background: url(../assets/pratilipi_logo.png) no-repeat left center;
            background-size: contain;
            height: 40px;
            float: left;
            width: 40px;
            display: inline-block;
            @media screen and (max-width: 370px ) {
                width: 29px
            }
            &:hover {
                text-decoration: none;
            }
        }
        .language-dropdown {
            display: inline-block;
            vertical-align: middle;
            float: left;
            margin-left: 4px;
            button {
                padding: 0;
                margin: 0;
                background: none;
                line-height: 40px;
                font-size: 14px;
                font-weight: 700;
                color: #212121;
                &:focus {
                    outline: none;
                    box-shadow: none;
                }
            }
            .dropdown-menu a {
                font-size: 14px;
            }
        }
        .search-box-wrap {
            padding: 0;
            margin-left: auto;
            .search-box label {
                position: absolute;
                z-index: -1;
                left: 0;
                color: #fff;
            }
        }
        .search-box {
            margin-top: 4px;
            padding: 0;
            .form-group {
                margin: 0;
                border: 1px solid #ced4da;
                border-radius: .25rem;
                position: relative;
                width: 88%;
                display: inline-block;
                input {
                    font-size: 14px;
                    width: 95%;
                    border: 0;
                    outline: none;
                    &:focus {
                        outline: none;
                        box-shadow: none;
                    }
                }
                i {
                    position: absolute;
                    top: 7px;
                    right: 6px;
                }
            }
        }
        .search-box-2 {
            margin-top: 3px;
            margin-left: auto;
            text-align: right;
            .form-group {
                position: absolute;
                right: 50px;
                width: 81%;
                -webkit-transition: width .4s ease;
                -o-transition: width .4s ease;
                transition: width .4s ease;
                display: inline-block;
                @media screen and (max-width: 410px ) {
                    width: 70%;
                }
                i {
                    top: 5px;
                }
                &:focus-within {
                    @media screen and (max-width: 450px ) {
                        width: calc(100vw - 109px);
                    }
                    @media screen and (max-width: 370px ) {
                        width: calc(100vw - 98px);
                    }
                }
            }
        }
        .btn {
            margin: 2px 4px;
        }
        .notification-icon {
            color: #212121;
            display: inline-block;
            vertical-align: middle;
            margin: 5px 12px 0 5px;
            position: relative;
            cursor: pointer;
            &:hover {
                text-decoration: none;
            }
            span {
                position: absolute;
                top: -10px;
                right: -10px;
                background: #d00b12;
                width: 22px;
                height: 22px;
                border-radius: 50%;
                color: #fff;
                text-align: center;
                font-size: 11px;
                line-height: 22px;
            }
            span.message-notification {
                width: 10px;
                height: 10px;
                top: 3px;
                right: 2px;
                border: 1px solid #fff;
            }
            &.router-link-exact-active , &.active {
                color: #d00b12;
            }
        }
        a.dropdown-item.isActive {
            color: #d00b12;
            &:before {
                content: "\e315";
                font-family: 'Material Icons';
                font-weight: normal;
                font-style: normal;
                font-size: 14px;
                display: inline-block;
                text-rendering: auto;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                transform: translate(0, 0);
                vertical-align: middle;
                margin-left: -15px;
                padding-right: 5px;
            }
        }
        .btn-outline-secondary:focus, .btn-outline-secondary:not(:disabled):not(.disabled):active:focus {
            box-shadow: none;
        }
        .btn-primary {
            font-size: 12px;
            &:focus {
                box-shadow: none;
            }
            i {
                vertical-align: middle;
                width: 30px;
                @media screen and (max-width: 576px ) {
                    width: 45px;
                }
            }
            @media screen and (max-width: 576px ) {
                width: 45px;
                padding-right: 0;
                padding-left: 0;
            }
        }
        &.nav-up {
            top: -75px;
        }
    }
    .footer-menu {
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #fff;
        z-index: 10;
        box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.2);
    }
    .capsule {
        color: #fff;
        border-radius: 500px;
        background: #d00b12;
        font-size: 14px;
        font-weight: bold;
        padding: 5px 20px;
        box-shadow: 0 1px 2px rgba(0,0,0,0.5);
        cursor: pointer;
        text-decoration: none;
        &.unread-message {
            position: fixed;
            bottom: 30px;
            z-index: 15;
            width: auto;
            white-space: nowrap;
            max-width: 320px;
            left: 50%;
            transform: translateX(-50%);
            @media screen and (max-width: 992px ) {
                bottom: 60px;
            }
        }
    }
</style>
<style lang="scss">
    .footer-menu {
        .tabs-section {
            margin-top: 5px;
            .main-tabs {
                border: 0 !important;
                &.router-link-exact-active {
                    border: 0;
                }
                i {
                    display: block;
                    margin-bottom: 2px;
                }
            }
        }
    }
    .language-ta .capsule.unread-message {
        white-space: pre-wrap;
        min-width: 290px;
    }
</style>
