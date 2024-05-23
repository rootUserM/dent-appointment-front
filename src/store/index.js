import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../plugins/axios';
import consultingrooms from './consultingroom';
import appointments from './appointments';
import patients from './patients';
import services from './services';
import treatments from './treatments'
import payments from './payments'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
  },
  getters: {
    isAuthenticated: state => !!state.token,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearToken(state) {
      state.token = '';
      localStorage.removeItem('token');
    },
  },
  actions: {
    ...appointments,
    ...consultingrooms,
    ...patients,
    ...services,
    ...treatments,
    ...payments,
    async login({ commit }, form) {
      try {
        const response = await axios.post('/login', form);
        commit('setToken', response.data.token);
      } catch (e) {
        return e
      }
  },
  logout({ commit }) {
    commit('clearToken');
  },
  },
  modules: {
  }
})
