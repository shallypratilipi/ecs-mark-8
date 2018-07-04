<template>
    <div class="recommendation old-style">
        <PratilipiListComponent 
            :pratilipiList="getRecommendationList" 
            :title="getRecommendationTitle"
            v-bind="{ addToLibrary, removeFromLibrary }"
            v-if="getRecommendationLoadingState === 'LOADING_SUCCESS' && getRecommendationList.length > 0"
            :screenName="screenName"
            :screenLocation="screenLocation"
            :experimentId="experimentId"
            :redirectToReader="true"
        ></PratilipiListComponent>
    </div>
</template>

<script>
import PratilipiListComponent from '@/components/PratilipiListRecommendation.vue';
import inViewport from 'vue-in-viewport-mixin';
import mixins from '@/mixins'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Home',
    mixins: [
        mixins,
        inViewport
    ],
    props: {
        contextId: {
            type: Number,
            required: true
        },
        experimentId: {
            String
        },
        context: {
            type: String,
            required: true
        },
        resultCount: {
            type: Number,
            default: 6
        },
        'in-viewport-once': {
            default: true
        },
        'in-viewport-offset-top': {
            default: -350
        },
        screenName: {
            type: String,
            required: true
        },
        screenLocation: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            sectionList: []
        }
    },
    computed: {
        ...mapGetters('recommendation', [
            'getRecommendationList',
            'getRecommendationLoadingState',
            'getRecommendationTitle'
        ]),
        ...mapGetters([
            'getUserDetails'
        ])
    },
    methods: {
        ...mapActions('recommendation', [
            'fetchRecommendation',
            'addToLibrary',
            'removeFromLibrary'
        ]),
    },
    components: {
        PratilipiListComponent,
    },
    created() {
        const { contextId, context, resultCount } = this;
        this.fetchRecommendation({ contextId, context, resultCount });
    },
    watch: {
        'inViewport.now': function(visible) {
            if (visible) {
                this.triggerAnanlyticsEvent(`VIEWED_${this.screenLocation}_${this.screenName}`, this.experimentId ? this.experimentId : 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
                
            }
        }
    }
}
</script>

<style  lang="scss" scoped>
    .recommendation {
        .section {
            border: 0;
            margin-left: 0;
            .section-title {
                font-size: 14px;
            }
        }
    }
</style>
