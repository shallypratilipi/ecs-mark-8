<template>
    <div class="next-pratilipi-strip">
        <div class="row ">
            <div class="col-3 next-pratilipi-image-container">
                <img class="next-pratilipi-image" :src="this.pratilipi.coverImageUrl">
            </div>
            <div class="col-9">
                <h6 class="next-pratilipi-strip-title">Read the next part of this book here</h6>
                <p>{{ this.pratilipi.title }}</p>
            </div>
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
        text-align: left;
        box-shadow: -20px 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

        .next-pratilipi-image-container {
            padding: 0px;
        }

        .next-pratilipi-strip-title {
            margin-top: 10px;
        }

        .next-pratilipi-image {
            width: 100%;
        }
    }
</style>
