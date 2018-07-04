<template>
	<div class="section">
		<div class="container-fluid">
	        <h2 class="section-title">
                <router-link v-if="listPageUrl" :to="listPageUrl" @click.native="triggerListLink">{{title}}</router-link>
                <span v-else>{{title}}</span>
            </h2>
	        <div class="pratilipi-list" v-if="pratilipiList.length > 0">
	            <slick ref="slick" :options="slickOptions" @beforeChange="handleBeforeChange" class="slick-pratilipis">
	                <PratilipiComponent 
	                v-for="(eachPratilipi, index) in pratilipiList" 
	                v-bind:key="eachPratilipi.pratilipiId + index"
	                :pratilipiData="eachPratilipi"
                    :addToLibrary="addToLibrary"
                    :removeFromLibrary="removeFromLibrary"
                    :redirectToReader="redirectToReader"
                    :screenName="screenName"
                	:screenLocation="screenLocation"
                    ></PratilipiComponent>
					<router-link :to="listPageUrl" v-if="listPageUrl" class="view_more">
						<div class="view_more_card">
							<i class="material-icons">keyboard_arrow_right</i>
							<span>__("view_more")</span>
						</div>
					</router-link>
	            </slick>
	        </div>
		</div>
	</div>
</template>

<script type="text/javascript">
import PratilipiComponent from '@/components/Pratilipi.vue'
import Slick from 'vue-slick'
import mixins from '@/mixins';
import inViewport from 'vue-in-viewport-mixin';
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
    name: 'PratilipiList',
    props: {
    	pratilipiList: {
    		type: Array,
    		required: true
    	},
        title: {
            type: String,
            require: true
        },
        listPageUrl: {
            type: String
        },
        addToLibrary: {
            type: Function
        }, 
        removeFromLibrary: {
            type: Function
        },
        redirectToReader: {
            type: Boolean
        },
        'in-viewport-once': {
            default: true
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
    mixins: [
        mixins,
        inViewport
    ],
    computed: {
        ...mapGetters([
            'getUserDetails'
        ]),
    },
    data() {
        return {
            slickOptions: {
                infinite: false,
                adaptiveHeight: false,
                variableWidth: true,
                draggable: true,
                edgeFriction: 0.30,
                swipe: true,
                prevArrow: '<div class="back"><i class="material-icons" aria-hidden="true">keyboard_arrow_left</i></div>',
                nextArrow: '<div class="forward"><i class="material-icons" aria-hidden="true">keyboard_arrow_right</i></div>'
            }
        }
    },
    methods: {
        next() {
            this.$refs.slick.next()
        },
        prev() {
            this.$refs.slick.prev()
        },
        handleBeforeChange() {
            if (this.$route.meta.store === 'homepage') {
                this.triggerAnanlyticsEvent(`SWIPE_COLLECTIONS_HOME`, 'WGEN020', {
                    'USER_ID': this.getUserDetails.userId,
                    'PARENT_ID': this.listPageUrl
                });
            }
        },
        reInit() {
            // Helpful if you have to deal with v-for to update dynamic lists
            // console.log(this.listPageUrl);
            this.$refs.slick.reSlick();
        },
        triggerListLink() {
            this.triggerAnanlyticsEvent(`CLICKCOLLECTION_${this.screenLocation}_${this.screenName}`, 'WGEN020', {
                'USER_ID': this.getUserDetails.userId,
                'PARENT_ID': this.listPageUrl
            });
        }
    },
    mounted() {
        const that = this;
    	if (this.pratilipiList.length > 0) {
    		this.reInit();
    	}
    },
    components: {
        PratilipiComponent,
        Slick
    },
    watch: {
        'inViewport.now': function(visible) {
            if (visible) {
                if (this.screenName === 'HOME') {
                    this.triggerAnanlyticsEvent(`VIEWED_COLLECTIONS_HOME`, 'WGEN020', {
                        'USER_ID': this.getUserDetails.userId,
                        'PARENT_ID': this.listPageUrl
                    });
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .section {
        background: #fff;
		border-top: 6px solid #e9e9e9;
		margin-left: -10px;
		.section-title {
            margin: 0;
            padding: 0;
			font-size: 22px;
            font-weight: bold;
			margin: 10px 0 5px 15px;
			text-align: left;
			border-left: 3px solid #d0021b;
			line-height: 24px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            a {
                color: #212121;
                padding: 5px 0 5px 10px;
                display: block;
                text-decoration: underline;
            }
			@media screen and (max-width: 576px ) {
                font-size: 18px;
				margin-bottom: 0;
            }
        }
    }
	.recommendation .section {
		.container-fluid {
			padding: 0;
			text-align: center;
			.section-title {
				text-align: left;
				font-weight: bold;
				font-size: 16px;
				border-left: 3px solid #d0021b;
				padding-left: 10px;
				margin: 10px 0;
			}
			.pratilipi-list {
				padding: 5px 10px;
			}
		}
        .section-title a {
            padding: 0;
        }
	}
    .pratilipi-list {
        position: relative;
        padding: 2px 5px;
		a.view_more {
			position: relative;
			.view_more_card {
				width: 300px;
                @media screen and (max-width: 768px ) {
                    width: 260px;
                }
				background: #fff;
				border: 1px solid #e9e9e9;
				height: 252px;
				margin: 10px;
				color: #d0021b;
				i {
					height: 210px;
					line-height: 210px;
					width: 100%;
					font-size: 50px;
					border-bottom: 1px solid #e9e9e9;
				}
				span {
					height: 41px;
					line-height: 37px; 
					display: block;
				}
			}
			&:hover {
				text-decoration: none;
			}
		}
    }
</style>
<style lang="scss">
	.back, .forward {
		position: absolute;
		top: 45%;
		z-index: 2;
		background-color: #fff;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		color: #000;
		border: 1px solid #e9e9e9;
		cursor: pointer;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-o-user-select: none;
		transition: all .3s, visibility 0s;
		-ms-transition: all .3s, visibility 0s;
		-webkit-transition: all .3s, visibility 0s;
		-moz-transition: all .3s, visibility 0s;
		i {
			height: 40px;
			line-height: 40px;
			font-size: 26px;
		}
		@media screen and (min-width: 768px ) {
			&:hover {
				background: #9E9E9E;
				border-color: #9E9E9E;
				box-shadow: 0 0px 2px rgba(0,0,0,0.2);
				color: #fff;
			}
		}
		&.slick-disabled {
			i {
				opacity: 0.2;
			}
            &:hover {
                background: #fff;
                border-color: #fff;
                i {
                    color: #212121;
                }
            }
		}
	}
	.back {
		margin-left: -5px;
	}
	.forward {
		right: -15px;
	}
    .recommendation .section {
        .back, .forward {
            top: 33%;
        }
    }
</style>
<style lang="scss">
    @import '../../../../node_modules/slick-carousel/slick/slick.css';
</style>
