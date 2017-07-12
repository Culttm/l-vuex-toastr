<template>
  <div class="l-toast" :class="positionClass">
    <toast-transition>
      <div class="l-toast-message" :class="messageTypeClass(m)" v-for="m in messages" :key="m.id">
        <div v-if="m.text.title" class="l-toast-message-title">{{ m.text.title }}</div>
        <div v-if="m.text.data" class="l-toast-message-text">{{ m.text.data }}</div>
        <span class="l-toast-button" @click="close(m.id)"></span>
      </div>
    </toast-transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { REMOVE_TOAST_MESSAGE } from './module'
import { DefaultTransition as ToastTransition } from './config'

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
      return `toast-position-${this.position}`
    }
  },

  methods: {
    ...mapActions({
      close: REMOVE_TOAST_MESSAGE
    }),

    messageTypeClass(message) {
      return `toast-type-${message.type}`
    }
  },

  components: {
    ToastTransition
  }
}
</script>
