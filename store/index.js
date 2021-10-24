export const state = () => ({
  categories: []
})

export const mutations = {
  setCategories(state, payload) {
    state.categories = payload
  }
}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('loadCategories')
  },
  async loadCategories({commit}) {
    const response = await this.$axios.$get('/api-mocks/categories.json')
    commit('setCategories', response.body.categories)
  }
}
