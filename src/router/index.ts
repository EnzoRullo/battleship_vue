import Game from '@/components/Game.vue'
import home from '@/components/Home.vue'
import { useBattleshipStore } from '@/stores/battleship'

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/game',
      name: 'game',
      component : Game,
      beforeEnter: ()=>{
        if(!useBattleshipStore().gameInfo.readyToPlay){
          return '/'
        }
      }
    }
  ]
})

export default router
