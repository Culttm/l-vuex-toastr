<template>
    <div @click="toastClick" class="l-toast" :class="positionClass">
        <toast-transition>
            <div class="l-toast-message" :class="messageTypeClass(m)" v-for="m in messages" :key="m.id">
                <icon v-if="m.type == 'danger'" class="type-icon" type="Danger"></icon>
                <icon v-if="m.type == 'success'" class="type-icon" type="Success"></icon>
                <div v-if="m.text.title" class="l-toast-message-title">{{ m.text.title }}</div>
                <div v-if="m.text.data" class="l-toast-message-text">{{ m.text.data }}</div>
                <span class="l-toast-button" @click="close(m.id)">
                    <icon class="close-icon" type="Close"></icon>
                </span>
            </div>
        </toast-transition>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {REMOVE_TOAST_MESSAGE} from './module'
    import {DefaultTransition as ToastTransition} from './config'

    export default {
        props: {
            position: {
                validator(value) {
                    return /^(:?n|s|nw|ne|sw|se)$/.test(value)
                },
                default: 'ne'
            }
        },

        computed: {
            ...mapGetters({
                messages: 'toastMessages'
            }),

            positionClass() {
                return `l-toast-position-${this.position}`
            }
        },

        methods: {
            ...mapActions({
                close: REMOVE_TOAST_MESSAGE
            }),

            messageTypeClass(message) {
                return `l-type-${message.type}`
            },

            toastClick(){
                this.$emit('toastClick')
            }
        },

        components: {
            ToastTransition
        }
    }
</script>
