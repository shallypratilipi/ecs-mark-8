<template>
    <div class="tabs-section col-md-12 col-12">
        <div
          @click="triggerHomeEvent"
          class="main-tabs home-tab">
          <i class="material-icons">home</i>
          <span class="tooltiptext">__('read_popular_stories')</span>
          <span>__("goto_home")</span>
        </div>
        <span
          @click="triggerDiscoverEvent"
          class="main-tabs discover-tab">
          <i class="material-icons">all_out</i>
          <span>__('menu_category')</span>
        </span>
        <span
          @click="triggerCreateEvent"
          class="main-tabs create-tab">
          <i class="material-icons">mode_edit</i>
          <span>__("write")</span>
        </span>
        <div
          @click="triggerProfileEvent"
          v-if="userDetails.profilePageUrl"
          class="main-tabs profile-tab">
          <i class="material-icons">account_circle</i>
          <span>__('menu_profile')</span>
        </div>
        <div
          v-else
          @click="triggerLoginEvent"
          class="main-tabs login-tab">
          <i class="material-icons">account_circle</i>
          <span>__('user_sign_in')</span>
        </div>
    </div>
</template>

<script>
import constants from '@/constants'
import mixins from '@/mixins';
import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        userDetails: {
            type: Object,
            required: true
        }
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        triggerHomeEvent() {
            const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
            this.triggerAnanlyticsEvent('GOHOME_HEADER_GLOBAL', 'WGEN006', {
                'USER_ID': this.getUserDetails.userId,
                SCREEN_NAME
            });
            this.$router.push('/');
        },
        triggerLoginEvent() {
            const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
            this.triggerAnanlyticsEvent('GOLOGIN_HEADER_GLOBAL', 'WGEN006', {
                'USER_ID': this.getUserDetails.userId,
                SCREEN_NAME
            });
            this.$router.push('/login');
        },
        triggerProfileEvent() {
            const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
            this.triggerAnanlyticsEvent('GOMYPROFILE_HEADER_GLOBAL', 'WGEN006', {
                'USER_ID': this.getUserDetails.userId,
                SCREEN_NAME
            });
            this.$router.push(this.userDetails.profilePageUrl);
        },
        triggerCreateEvent() {
            const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
            this.triggerAnanlyticsEvent('GOCREATE_HEADER_GLOBAL', 'WGEN006', {
                'USER_ID': this.getUserDetails.userId,
                SCREEN_NAME
            });
            this.$router.push('/create');
        },
        triggerDiscoverEvent() {
            const SCREEN_NAME = this.getAnalyticsPageSource(this.$route.meta.store);
            this.triggerAnanlyticsEvent('GODISCOVER_HEADER_GLOBAL', 'WGEN006', {
                'USER_ID': this.getUserDetails.userId,
                SCREEN_NAME
            });
            this.$router.push('/discover');
        },
    },
    mounted() {
        if (this.$route.path === '/' ) {
            $(".home-tab").addClass("active");
        }
        if (this.$route.path === '/login' ) {
            $(".login-tab").addClass("active");
        }
        if (this.$route.path === this.userDetails.profilePageUrl ) {
            $(".profile-tab").addClass("active");
        }
        if (this.$route.path === '/create' ) {
            $(".create-tab").addClass("active");
        }
        if (this.$route.path === '/discover' ) {
            $(".discover-tab").addClass("active");
        }
    }
}
</script>

<style lang="scss" scoped>
.tabs-section {
    .main-tabs {
        display: inline-block;
        position: relative;
        width: 23.5%;
        color: #212121;
        font-size: 18px;
        border-bottom: 3px solid #fff;
        padding-bottom: 2px;
        cursor: pointer;
        span {
            display: block;
            font-size: 12px;
        }
        &:hover {
            text-decoration: none;
            color: #d00b12;
        }
        &.router-link-exact-active, &.active {
            color: #d00b12;
            border-bottom-color: #d00b12;
        }

        /* Tooltip text */
        .tooltiptext {
            background-color: #266a1f;
            color: #fff;
            font-size: 13px;
            text-align: center;
            padding: 5px 3px;
            border-radius: 6px;
         
            /* Position the tooltip text - see examples below! */
            position: absolute;

            width: 100px;
            bottom: 113%;
            left: 50%; 
            margin-left: -50px;

            -webkit-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
            -moz-box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
        }

        .tooltiptext:after {
            top: 100%;
            left: 50%;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
            border-color: rgba(0, 0, 0, 0);
            border-top-color: #266a1f;
            border-width: 5px;
            margin-left: -5px;
        }
    }
}
</style>
