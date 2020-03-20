import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CopName from '@/components/EnterPage'
import MainMenu from '@/components/MainMenu'
import Main from '@/components/Main'
import logIn from '@/components/logIn'
import Form from '@/components/form'

Vue.use(Router)

export default new Router({
  components: { MainMenu },
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/mainmenu/',
      name: 'MainMenu',
      component: MainMenu
    },
    {
      path: '/form/',
      name: 'Form',
      component: Form
    },
    {
      path: '/main/',
      name: 'Main',
      component: Main
    },
    {
      path: '/login/',
      name: 'LogIn',
      component: logIn
    },
    {
      path: '/enter/',
      name: 'CopName',
      component: CopName
    }
  ]
})
