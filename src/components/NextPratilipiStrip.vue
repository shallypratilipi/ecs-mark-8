<template>
    <div class="next-pratilipi-strip">
        <div class="next-pratilipi-image"
             v-bind:style="{ backgroundImage: 'url(' + this.pratilipi.coverImageUrl  + ')' }">

        </div>
        <div class="next-pratilipi-text">
            <p class="next-pratilipi-text-title"> Read the next part of this book here</p>
            <p class="next-pratilipi-text-title">{{ this.pratilipi.title }}</p>
        </div>
    </div>
</template>
<script>

    import mixins from '@/mixins';

    export default {
        name: "NextPratilipiStrip",
        props: {
            pratilipi: {
                type: Object,
                required: true
            }
        },
        mixins: [
            mixins
        ],
        data() {
            return {
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .next-pratilipi-strip {
        display: flex;

        @media screen and (max-width: 576px) {
            box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
        }
        .next-pratilipi-image {
            flex: 2;
            background-repeat: no-repeat;
            background-size: cover;
            width: 200px;
            height: 150px;
            @media screen and (max-width: 576px) {
                height: 120px;
            }

        }
        .next-pratilipi-text {
            flex: 3;
            border: 1px solid #00000030;
            .next-pratilipi-text-title {
                font-size: 16px;
                margin: 10px;
            }
        }
    }
</style>
