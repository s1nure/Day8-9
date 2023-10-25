import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import WeatherInfo from '../components/WeatherInfo.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/weather-info/:selectedCity',
    name: 'weatherInfo',
    props: true,
    component: WeatherInfo
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
