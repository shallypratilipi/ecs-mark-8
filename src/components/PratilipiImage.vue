<template>
    <div 
        class="pratilipi-image" v-lazy:background-image="pratilipiImageObject">
    </div>
</template>

<script>
import mixins from '@/mixins';

export default {
    name: 'Pratilipi',
    props: {
        coverImageUrl: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            pratilipiImageObject: {
                src: this.getHighResolutionImage(this.coverImageUrl),
                loading: this.getLowResolutionImage(this.coverImageUrl)
             },
        }
    },
    mixins: [
        mixins
    ],
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
.pratilipi-image {
    margin: 5px;
    height: 150px;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s;
    &[lazy=loading] {
        filter: blur(5px);
        padding: 5px;
    }
}
</style>
