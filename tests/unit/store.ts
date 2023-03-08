export default {
  state: {
    step: {
      company: true,
      office: false,
      user: false,
      check: false,
    },
  },
  getters: {
    getStep(state) {
      return state.step;
    },
  },
  mutations: {},
  actions: {},
};
