import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


//配置表
const routes = [
  {
    path: '/schedule/:scheduleId',
    component: () => import('@/views/schedule'),
    name: 'schedule'
  },
  {
    path: '/info',
    component: () => import('@/views/info'),
    meta: {
      isMain: true,
    }
  },

  {
    //当路径为/films加载Films组件
    path: '/films',
    name: 'films',
    redirect: '/films/nowPlaying',
    component: () => import('@/views/Films/Films'),
    children: [
      {
        path: 'nowPlaying',
        component: () => import("@/views/Films/NowPlaying"),
        meta: {
          isMain: true,
        },
      },
      {
        path: 'comingSoon',
        component: () => import("@/views/Films/Comingsoon"),
        meta: {
          isMain: true,
        },
      }
    ]
  },
  {
    path: '/center',
    component: () => import("@/views/Center"),
    meta: {
      isMain: true,
    },
    children: [
      {
        path: '/center/signOut',
        component: () => import('@/views/Center/SignOut'),
      },
    ]
  },
  {
    path: '/city',
    name: 'city',
    component: () => import('@/views/Cinemas/City')
  },
  {
    path: '/cinemas',
    meta: {
      isMain: true,
    },
    component: () => import('@/views/Cinemas/Cinemas'),
    children: [
      {
        path: 'search',
        name: 'searchCinemas',
        component: () => import('@/views/Cinemas/search')
      },
      {
        path: '',
        component: () => import("@/components/CinemaList.vue"),
        meta: {
          isMain: true,
        }
      }
    ]
  },
  {
    name: '影院',
    path: '/cinemas/:cinemaId/film',
    component: () => import('@/views/Cinemas/choiceCinema')
  },
  {
    path: '/Login',
    component: () => import("@/views/Login")
  },
  {
    path: '/order',
    component: () => import("@/views/order"),
    meta: {
      isNext: true     //路由独享拦截
    }
  },
  {
    name: '电影视图',
    path: '/detail/:myID/cinemas',
    component: () => import('@/views/Films/filmView/filmCinemas'),
    props: true           //上级路由传的this.$route.params属性会成为这个组件的props属性
  },
  {
    name: '详情',
    path: '/detail/:myID',  //设置动态路由  detail必须要有二级路由才跳转组件  接着他被route记录了
    component: () => import("@/views/Details/Details")
  },
  {
    path: '*',// 没有匹配路径时匹配该组件
    redirect: "/center"
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})


router.beforeEach((to, from, next) => {   //全局前置守卫

  if (to.meta.isMain) {   //有该属性的为需要检测是否授权放行
    router.app.$options.store.state.isFooterShow ||
      router.app.$options.store.commit('footerShow')
    next()
  } else {
    router.app.$options.store.state.isFooterShow &&
      router.app.$options.store.commit('footerHide')
    next()
  }
})


// })
//导出路由
export default router
