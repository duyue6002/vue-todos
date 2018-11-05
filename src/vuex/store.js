import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './action';
import * as getters from './getter';

Vue.use(Vuex);

const state = {
  todoList: [],
  menuOpen: false
};

const mutations = {
  EDITTODE(state, data) {
    state.todoList = data;
  },
  MENUOPEN(state) {
    state.menuOpen = !state.menuOpen;
  }
};

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
});
