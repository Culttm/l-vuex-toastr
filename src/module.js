// @flow

const PREFIX = '@@toast/'

const ADD = `${PREFIX}ADD_TOAST_MESSAGE`
const REMOVE = `${PREFIX}REMOVE_TOAST_MESSAGE`
const REMOVE_ALL = `${PREFIX}REMOVE_ALL_MESSAGES`

export {
  ADD as ADD_TOAST_MESSAGE,
  REMOVE as REMOVE_TOAST_MESSAGE
}

function createMessage(id: number, text: string, type: string, dismissAfter: number): ToastMessage {
  return {
    id,
    text,
    type,
    dismissAfter
  }
}

export function createModule(options: ToastOptions = {}) {
  const {
    dismissInterval = 5000
  } = options

  let maxToastId = 0

  const state: ToastState = {
    messages: []
  }

  const getters = {
    toastMessages: (state: ToastState) => state.messages
  }

  const actions = {
    [ADD] ({ commit }, { text, type = 'info', dismissAfter = dismissInterval }) {
      const id = ++maxToastId

      commit(ADD, createMessage(id, text, type, dismissAfter))
      setTimeout(() => commit(REMOVE, id), dismissAfter)
    },

    [REMOVE] ({ commit }, id) {
      commit(REMOVE, id)
    },

    [REMOVE_ALL] ({ commit }) {
      commit(REMOVE_ALL)
    }
  }

  const mutations = {
    [ADD] (state: ToastState, data: ToastMessage) {
      state.messages.push(data)
    },

    [REMOVE] (state: ToastState, id: number) {
      state.messages = state.messages.filter(m => m.id !== id)
    },

    [REMOVE_ALL] (state: ToastState) {
      state.messages = []
    }
  };

  return {
    state,
    getters,
    actions,
    mutations
  }
}
