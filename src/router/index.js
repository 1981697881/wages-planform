import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import notpage from '@/views/404'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    affix: true                  if set true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const StaticRouterMap = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
}, {
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
}, {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '首页',
      icon: 'dashboard',
      affix: true
    }
  }]
}, {
  path: '/basic',
  component: Layout,
  name: 'Basic',
  meta: {
    title: '基础资料',
    icon: 'component'
  },
  children: [
    {
      path: 'clerk',
      component: () => import('@/views/basic/clerk/index'),
      name: 'Clerk',
      meta: {
        title: '员工管理',
        noCache: true
      }
    },{
      path: 'organizational',
      component: () => import('@/views/basic/organizational/index'),
      name: 'Organizational',
      meta: {
        title: '组织架构'
      }
    },{
      path: 'duties',
      component: () => import('@/views/basic/duties/index'),
      name: 'Duties',
      meta: {
        title: '职务体系'
      }
    },{
      path: 'customer',
      component: () => import('@/views/basic/customer/index'),
      name: 'Customer',
      meta: {
        title: '客户信息'
      }
    },{
      path: 'supplier',
      component: () => import('@/views/basic/supplier/index'),
      name: 'Supplier',
      meta: {
        title: '供应商资料'
      }
    },{
      path: 'collectionType',
      component: () => import('@/views/basic/collectionType/index'),
      name: 'CollectionType',
      meta: {
        title: '收款类型'
      }
    },{
    path: 'productCategory',
      component: () => import('@/views/basic/productCategory/index'),
      name: 'ProductCategory',
      meta: {
      title: '产品类型'
    }
  },{
      path: 'product',
      component: () => import('@/views/basic/product/index'),
      name: 'Product',
      meta: {
        title: '产品资料'
      }
    },{
      path: 'essential',
      component: () => import('@/views/basic/essential/index'),
      name: 'Essential',
      meta: {
        title: '参数表'
      }
    },{
      path: 'dictionaries',
      component: () => import('@/views/basic/dictionaries/index'),
      name: 'Dictionaries',
      meta: {
        title: '字典表'
      }
    }
  ]
}, {
  path: '/project',
  component: Layout,
  name: 'Project',
  meta: {
    title: '项目参数',
    icon: 'component'
  },
  children: [
    {
      path: 'achievement',
      component: () => import('@/views/project/achievement/index'),
      name: 'Achievement',
      meta: {
        title: '业务提成比例设定'
      }
    },{
      path: 'score',
      component: () => import('@/views/project/score/index'),
      name: 'Score',
      meta: {
        title: '分值分数提成设定'
      }
    },{
      path: 'marketing',
      component: () => import('@/views/project/marketing/index'),
      name: 'Marketing',
      meta: {
        title: '营销方案提成'
      }
    }
  ]
}, {
  path: '/information',
  component: Layout,
  name: 'Information',
  meta: {
    title: '项目数据',
    icon: 'component'
  },
  children: [{
    path: 'activity',
    component: () => import('@/views/information/activity/index'),
    name: 'Activity',
    meta: {
      title: '营销活动'
    }
  },{
    path: 'attendanceRecord',
    component: () => import('@/views/information/attendanceRecord/index'),
    name: 'AttendanceRecord',
    meta: {
      title: '员工出勤记录'
    }
  },{
    path: 'cooperationFee',
    component: () => import('@/views/information/cooperationFee/index'),
    name: 'CooperationFee',
    meta: {
      title: '合作费'
    }
  },{
    path: 'listings',
    component: () => import('@/views/information/listings/index'),
    name: 'Listings',
    meta: {
      title: '项目信息'
    }
  },{
    path: 'otherWages',
    component: () => import('@/views/information/otherWages/index'),
    name: 'OtherWages',
    meta: {
      title: '其它工资录入'
    }
  },{
    path: 'record',
    component: () => import('@/views/information/record/index'),
    name: 'Record',
    meta: {
      title: '消费记录'
    }
  }
  ]
}, {
  path: '/commission',
  component: Layout,
  name: 'Commission',
  meta: {
    title: '提成计算',
    icon: 'component'
  },
  children: [{
    path: 'calculation',
    component: () => import('@/views/commission/calculation/index'),
    name: 'Calculation',
    meta: {
      title: '提成计算'
    }
  },{
    path: 'payroll',
    component: () => import('@/views/commission/payroll/index'),
    name: 'Payroll',
    meta: {
      title: '工资表'
    }
  },{
    path: 'riskFund',
    component: () => import('@/views/commission/riskFund/index'),
    name: 'RiskFund',
    meta: {
      title: '风险金报表'
    }
  }
  ]
},{
  path: '/reportForm',
  component: Layout,
  name: 'ReportForm',
  meta: {
    title: '报表',
    icon: 'component'
  },
  children: [{
    path: 'revenue',
    component: () => import('@/views/reportForm/revenue/index'),
    name: 'Revenue',
    meta: {
      title: '营收汇总表'
    }
  },{
    path: 'marketPerformance',
    component: () => import('@/views/reportForm/marketPerformance/index'),
    name: 'MarketPerformance',
    meta: {
      title: '市场业绩回款进度表'
    }
  },{
    path: 'guidance',
    component: () => import('@/views/reportForm/guidance/index'),
    name: 'Guidance',
    meta: {
      title: '咨询回款业绩报表'
    }
  },{
    path: 'marketingDepartment',
    component: () => import('@/views/reportForm/marketingDepartment/index'),
    name: 'MarketingDepartment',
    meta: {
      title: '市场部业绩排名表'
    }
  },{
    path: 'marketingDepartmentDetail',
    component: () => import('@/views/reportForm/marketingDepartmentDetail/index'),
    name: 'MarketingDepartmentDetail',
    meta: {
      title: '市场部业绩明细表'
    }
  },{
    path: 'attractInvestment',
    component: () => import('@/views/reportForm/attractInvestment/index'),
    name: 'AttractInvestment',
    meta: {
      title: '招商业绩明细表'
    }
  },{
    path: 'income',
    component: () => import('@/views/reportForm/income/index'),
    name: 'Income',
    meta: {
      title: '收入结算返款明细表'
    }
  },{
    path: 'cashier',
    component: () => import('@/views/reportForm/cashier/index'),
    name: 'Cashier',
    meta: {
      title: '收银统计表'
    }
  },{
    path: 'mktg',
    component: () => import('@/views/reportForm/mktg/index'),
    name: 'Mktg',
    meta: {
      title: '市场部门业绩表'
    }
  },{
    path: 'teacher',
    component: () => import('@/views/reportForm/teacher/index'),
    name: 'Teacher',
    meta: {
      title: '市场老师业绩提成表'
    }
  },{
    path: 'investmentPromotionDepartment',
    component: () => import('@/views/reportForm/investmentPromotionDepartment/index'),
    name: 'InvestmentPromotionDepartment',
    meta: {
      title: '招商部门业绩表'
    }
  },{
    path: 'monthlyRanking',
    component: () => import('@/views/reportForm/monthlyRanking/index'),
    name: 'MonthlyRanking',
    meta: {
      title: '月度排名奖励表'
    }
  },{
    path: 'dean',
    component: () => import('@/views/reportForm/dean/index'),
    name: 'Dean',
    meta: {
      title: '院长提成明细表'
    }
  },{
    path: 'doctor',
    component: () => import('@/views/reportForm/doctor/index'),
    name: 'Doctor',
    meta: {
      title: '医生提成明细表'
    }
  }
  ]
}, {
  path: '/system',
  component: Layout,
  name: 'System',
  meta: {
    title: '系统设置',
    icon: 'component'
  },
  children: [{
    path: 'users',
    component: () => import('@/views/system/users/index'),
    name: 'Users',
    meta: {
      title: '用户管理'
    }
  }]
}
 /* {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '开发文档', icon: 'link', roles: ['admin', 'editor'] } // 设置该路由进入的权限，支持多个权限叠加}
      }
    ]
  },

  // 404 page must be placed at the end !!!
  /* {
    path: '*',
    redirect: '/404',
    hidden: true
  } */
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})
