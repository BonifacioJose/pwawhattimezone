import Vue from 'vue'
import Router from 'vue-router'
import TimezonesSelect from '@/components/TimezonesSelect'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TimezonesSelect',
      component: TimezonesSelect
    }
  ]
})
