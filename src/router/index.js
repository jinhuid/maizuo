import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)  


//配置表
const routes = [
  {
    path:'/schedule/:scheduleId',
    component:()=>import('@/views/schedule'),
    name:'schedule'
  },
  {
    path:'/info',
    component:()=>import('@/views/info'),
    meta:{
      isMain:true,
    }
  },
  {
    path:'/city',
    component:()=>import('@/views/City')
    
  },
  {
    //当路径为/films加载Films组件
    path: '/films',
    name:'films',
    redirect:'/films/nowPlaying',
    component: ()=>import('@/views/Films'),
    children: [
      {
        path: 'nowPlaying',
        component: ()=>import("@/views/Films/nowPlaying"),
        meta:{
          isMain:true,
        },
      },
      {
        path: 'comingSoon',
        component: ()=>import("@/views/Films/comingsoon"),
        meta:{
          isMain:true,
        },
      }
    ]
  },
  {
    path: '/center',
    component: ()=>import("@/views/Center"),
    meta:{
      isMain:true,
    },
    children:[
      {
        path:'/center/signOut',
        component:()=>import('@/views/Center/SignOut'),
      },
    ]
  //   beforeEnter:(to,from,next)=>{             //局部路由守卫
  //     if(localStorage.getItem('token')){        //有该属性的为需要检测是否授权放行
  //       next()
  //     }else{
  //     next({
  //       path:'/login',
  //       query:{redirect:to.fullPath}
  //     })
  //   }
  // }
  },
  {
    path: '/cinemas',
    meta:{
      isMain:true,
    },
    component:()=>import('@/views/Cinemas'),
    children:[
      {
        path:'search',
        component:()=>import('@/views/Cinemas/search')      
      },
      {
        path:'',
        component:()=>import("@/components/CinemaList.vue"),
        meta:{
          isMain:true,
        }
      }
    ]
  },
  {
    name:'影院',
    path:'/cinemas/:cinemaId/film',
    component:()=>import('@/views/Cinemas/choiceCinema')
  },
  {
    path:'/Login',
    component:()=>import("@/views/Login")
  },
  {
    path:'/order',
    component:()=>import("@/views/order"),
    meta:{
      isNext:true     //路由独享拦截
    }
  },
  {
    name:'电影视图',
    path: '/detail/:myID/cinemas',
    component: ()=>import('@/views/Films/filmView/filmCinemas'),
    props: true           //上级路由传的this.$route.params属性会成为这个组件的props属性
  },
  {
    name:'详情',
    path: '/detail/:myID',  //设置动态路由  detail必须要有二级路由才跳转组件  接着他被route记录了
    component:()=>import("@/views/detail")
  },
  {
    path: '*',// 没有匹配路径时匹配该组件
    redirect: "/center"
  }
]

const router = new VueRouter({
  mode:'hash',//hash   history需要后台支持 因为我们的应用是单页客户端 当搜索不到静态资源时我们应该返回同一个index页面     history没有#号更美观 带#的一定时前端路由  #做一些网页分享时可能会带来意想不到的后果比如拼接字符串
  routes
})

// router.beforeEach((to,from,next)=>{   //全局前置守卫
//   if(to.meta.isNext){   //有该属性的为需要检测是否授权放行
//     if(localStorage.getItem('token')){
//       next()
//     }else{
//       // next('/login')
//       next({
//         path:'/login',
//         query:{redirect:to.fullPath}  //记录着原本next直接去的路径 这里是被path带过来的
//       })
//     }
//   }else{
//     next()
//   }


router.beforeEach((to,from,next)=>{   //全局前置守卫
  
  if(to.meta.isMain){   //有该属性的为需要检测是否授权放行
    router.app.$options.store.state.isFooterShow ||
    router.app.$options.store.commit('footerShow')
    next()
  }else{
    router.app.$options.store.state.isFooterShow &&
    router.app.$options.store.commit('footerHide') 
    next()
  }
})

  
// })
//导出路由
export default router
