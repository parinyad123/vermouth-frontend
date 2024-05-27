import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import DashboardSummary from '../views/DashboardSummary'
import DashboardCharts from '../views/DashboardCharts'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  {
    path: '/',
    name: 'dashboardsummary',
    component: DashboardSummary
  },
  {
    path: '/dashboardsummary',
    name: 'dashboardsummary',
    component: DashboardSummary
  },
  {
    path: '/dashboardcharts',
    name: 'dashboardcharts',
    component: DashboardCharts
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
