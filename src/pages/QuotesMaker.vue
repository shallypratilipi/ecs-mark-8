<template>
    <MainLayout>
        <div class="static-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2>Quotes Maker</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <!-- Quotes image -->
                        <span class="help-text">Preview:</span>
                        <div class="quotes" :style="{ backgroundImage: 'url(' + currentBackground + ')' }">
                            <div class="quote-text" :class="{ 
                                'overlay-yes': shouldHaveOverlay === 'overlay-yes',
                                'text-center': fontAlign === 'center',
                                'text-left': fontAlign === 'left',
                                'text-right': fontAlign === 'right',
                            }">
                                <div class="text" :style="{top: (fontTopLocation || 0) + 'px', left: (fontLeftLocation || 0 )+ 'px', fontSize: (fontSize || 30 )+ 'px', color: (fontColor || blue ) }">{{ quote }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 image-options">
                        <span class="help-text">Options:</span>
                        
                        <span class="label">Enter your quote below:</span>
                        <TranslatingInput :value="quote" :oninput="updateQuoteText"></TranslatingInput>
                        
                        <span class="label">Choose an image from the below options:</span>
                        <ul class="choose-image">
                            <li v-for="eachBackground in availableBackgrounds" :class="{ selected: eachBackground === currentBackground }" @click="changeBackground(eachBackground)"><img :src="eachBackground" alt=""></li>
                        </ul>
                        
                        <span class="label">Do you need a background overlay?</span>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" v-model="shouldHaveOverlay" name="background-overlay" id="overlay-yes" value="overlay-yes" checked>
                            <label class="form-check-label" for="overlay-yes">Yes</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" v-model="shouldHaveOverlay" name="background-overlay" id="overlay-no" value="overlay-no">
                            <label class="form-check-label" for="overlay-no">No</label>
                        </div>
                        
                        <div class="form-group">
                            <span class="label">Select text size(px):</span>
                            <input type="number" class="form-control" id="font-size" v-model="fontSize" placeholder="Font Size">
                        </div>
                        
                        <div class="form-group">
                            <span class="label">Select text color(name or hex code):</span>
                            <div class="form-row">
                                <div class="form-group col-4">
                                    <label for="topPosition">Pick a color:</label>
                                    <input type="color" class="form-control color-picker" name="favcolor" v-model="fontColor" placeholder="Font Color">
                                </div>
                                <div class="form-group col-8">
                                    <label for="leftPosition">Or type color code:</label>
                                    <input type="text" class="form-control" id="font-color" v-model="fontColor" placeholder="Font Color">
                                </div>
                            </div>
                        </div>
                        
                        <span class="label">Select text align:</span>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" v-model="fontAlign" name="text-align" id="align-left" value="left">
                            <label class="form-check-label" for="align-left">Left</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" v-model="fontAlign" name="text-align" id="align-center" value="center">
                            <label class="form-check-label" for="align-center">Center</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" v-model="fontAlign" name="text-align" id="align-right" value="right">
                            <label class="form-check-label" for="align-right">Right</label>
                        </div>
                        
                        <span class="label">Select text position.(Enter value in px)</span>
                        <div class="form-row">
                            <div class="form-group col-6">
                                <label for="topPosition">Top:</label>
                                <input type="number" class="form-control" id="topPosition" v-model="fontTopLocation" placeholder="Top">
                            </div>
                            <div class="form-group col-6">
                                <label for="leftPosition">Left:</label>
                                <input type="number" class="form-control" id="leftPosition" v-model="fontLeftLocation" placeholder="Left">
                            </div>
                        </div>
                        
                        <button class="generate-btn" @click="takeScreenShot" :disabled="generateIsDisabled">Generate Quote</button>
                        <a v-if="dataImageUrl && !generateIsDisabled" :href="dataImageUrl" download>Download Image</a>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import html2canvas from 'html2canvas';

import MainLayout from '@/layout/main-layout.vue';
import constants from '@/constants';
import Spinner from '@/components/Spinner.vue';
import TranslatingInput from '@/components/TranslatingInput.vue';
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            quote: '',
            dataImageUrl: null,
            shouldHaveOverlay: 'overlay-yes',
            fontSize: 30,
            fontColor: '#00faff',
            fontAlign: 'center',
            fontTopLocation: 0,
            fontLeftLocation: 0,
            generateIsDisabled: false,
            currentBackground: '/static/quotes_1.jpg',
            availableBackgrounds: [
                '/static/quotes_1.jpg',
                '/static/quotes_2.jpg',
                '/static/quotes_3.png'
            ]
        }
    },
    components: {
        MainLayout,
        Spinner,
        TranslatingInput
    },
    computed: {
    },
    methods: {
        updateQuoteText(text) {
            this.quote = text;
        },

        changeBackground(newBackground) {
            this.currentBackground = newBackground;
        },

        takeScreenShot() {
            const that = this;
            console.log(new Date);
            that.generateIsDisabled = true;
            html2canvas($('.quotes')[0], { useCORS: true}).then(function(canvas) {
                that.dataImageUrl = canvas.toDataURL("image/png");
                that.generateIsDisabled = false;
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    watch: {
        
    },
    created() {
    }
}
</script>

<style lang="scss" scoped>
.static-page {
    margin-top: 85px;
    text-align: left;
    min-height: 600px;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
    }
    h2 {
        font-size: 22px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0;
        @media screen and (max-width: 992px ) {
            font-size: 18px;
        }
    }

    .quotes {
        background-color: #e9e9e9;
        background-size: cover;
        background-repeat: no-repeat;
        height: 250px;
        position: relative;
        overflow: hidden;
        @media screen and (min-width: 992px ) {
            height: 400px;
        }
        .quote-text {
            position: relative;
            height: 100%;
            &:after {
                content: "";
                background: url(https://www.ptlp.co/resource-all/home-page/pratilipi_logo.png) no-repeat;
                background-size: 30px;
                width: 30px;
                height: 30px;
                opacity: 0.8;
                bottom: 10px;
                right: 10px;
                position: absolute;
                z-index: 1;
            }
            &.overlay-yes {
                background-color: rgba(0,0,0,0.5);
                width: 100%;
            }
            &.font-large {
                font-size: 35px;
            }
            &.font-medium {
                font-size: 25px;
            }
            &.font-small {
                font-size: 15px;
            }
            &.color-white {
                color: #fff;
            }
            &.color-black {
                color: #000;
            }
            &.color-red {
                color: #dc3545;
            }
            &.color-green {
                color: #28a745;
            }
            &.text-left {
                text-align: left;
            }
            &.text-center {
                text-align: center;
            }
            &.text-right {
                text-align: right;
            }
            .text {
                padding: 10px;
                font-weight: bold;
                position: absolute;
                width: 100%;
            }
        }
    }
    .help-text {
        font-size: 14px;
        font-weight: 700;
        margin: 5px 0;
        display: block;
    }
    span.label {
        font-size: 12px;
        margin: 15px 0 5px;
        display: block;
    }
    .image-options {
        margin: 20px 0;
        @media screen and (max-width: 500px ) {
            height: 250px;
            overflow-y: scroll;
        }
        .choose-image {
            margin: 10px 0;
            padding: 0;
            li {
                display: inline-block;
                margin: 0 5px 5px 0;
                width: 100px;
                height: 70px;
                img {
                    width: 100%;
                    height: 100%;
                    
                }
                &.selected img {
                    outline: 2px solid #d0031c;
                    outline-offset: -2px;
                }
            }
        }
        .form-check-label, label {
            font-size: 14px;
        }
        .color-picker {
            height: 40px;
        }
        .generate-btn {
            background: #d0031c;
            border: 0;
            outline: none;
            box-shadow: none;
            padding: 10px;
            color: #fff;
            border-radius: 4px;
            width: 90%;
            margin: 20px 0;
            font-size: 16px;
            font-weight: bold;
            &:disabled {
                background: grey;
            }
        }
    }
}
</style>
<style>
p {
    word-break: break-word !important;
}
</style>
