import Vue from 'vue'
import Vuex from 'vuex'
import AnomalyDaily from './modules/dashboardsummary/AnomalyDaily'
import DashboardChart from './modules/dashboardchart/DashboardChart'
import datachartTM from './modules/dashboardchart/datachartTM'
import datachartMMQ from './modules/dashboardchart/datachartMMQ'
import datachartSTDCount from './modules/dashboardchart/datachartSTDCount'

Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  // },
  // getters: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
    AnomalyDaily,
    DashboardChart,
    datachartTM,
    datachartMMQ,
    datachartSTDCount,
  }
})
