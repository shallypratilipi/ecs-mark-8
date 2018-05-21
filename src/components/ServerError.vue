<template>
    <div class="server_error">
        <p><img src="https://s3.ap-south-1.amazonaws.com/growth-test-mumbai.pratilipi.com/phoenix/loading.gif" alt=""></p>
        <span v-if="message">{{ message }}</span>
        <span v-else>__("server_error_message")</span>
        <button @click="reloadWithDefinedAction" type="button" name="button"><i class="material-icons">refresh</i></button>
    </div>  
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: {
        action: {
            type: String,
            required: true
        },
        data: {
            required: false
        },
        message: {
            type: String
        }
    },
    methods: {
        ...mapActions([
            'dispatchReloadAction'
        ]),
        reloadWithDefinedAction() {
            const { data, action } = this;
            this.dispatchReloadAction({ data, action });
        }
    }
}
</script>

<style  lang="scss" scoped>
.server_error {
    margin: 20px 0;
    padding: 10px;
    background: #f9f9f9;
    font-size: 14px;
    font-style: italic;
    text-align: center;
    span {
        display: block;
    }
    p {
        margin: 0;
        img {
            max-width: 100%;
            margin-top: -120px;
        }
    }
    button {
        background: #d0021b;
        border: 0;
        color: #fff;
        padding: 5px 20px;
        border-radius: 3px;
        margin: 10px;
        cursor: pointer;
        i {
            vertical-align: middle;
            -webkit-transition-duration: 500ms;
            -moz-transition-duration: 500ms;
            -o-transition-duration: 500ms;
             transition-duration: 500ms;
        }
        &:focus {
            outline: none;
        }
        &:active i {
           transform: rotate(360deg);
           -webkit-transform: rotate(360deg);
           -ms-transform: rotate(360deg);
        }
    }
}
</style>
