
export default [
  {
    path:'/',
    redirect:'/index'
  },
    {
        path: '/index',
        name: 'home',
        redirect:'/admininfo',
        component:()=> import('../views/Home.vue'),
        children:[
          {
            path:'/editself',
            name:'EditSelf',
            component:() => import('../views/EditSelf.vue')
          },
          {
            path:'/editpass',
            name:'EditPass',
            component:() => import('../views/EditPass.vue')
          },
          {
            path:'/admin',
            name:'Admin',
            component:() => import('../components/account/Admin.vue')
          },
          {
            path:'/item',
            name:'Item',
            component:() => import('../components/exhibits/Item.vue')
          },
          {
            path:'/admininfo',
            name:'AdminInfo',
            component:() => import('../views/AdminInfo.vue'),
          }
        ]
      },
      {
        path:'/login',
        name:'Login',
        component:()=> import('../views/Login.vue')
      },
      {
        path:'/404',
        name:'NotFound',
        component:()=> import('../views/404.vue')
      },
      {
        path:'*',
        redirect:'/404'
      }
]