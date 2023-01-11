export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  '/basic': () => import('@/layout'),
  'clerk': () => import('@/views/basic/clerk'),
  'organizational': () => import('@/views/basic/organizational'),
  'collectionType': () => import('@/views/basic/collectionType'),
  'customer': () => import('@/views/basic/customer'),
  'dictionaries': () => import('@/views/basic/dictionaries'),
  'duties': () => import('@/views/basic/duties'),
  'essential': () => import('@/views/basic/essential'),
  'product': () => import('@/views/basic/product'),
  'supplier': () => import('@/views/basic/supplier'),
  'productCategory': () => import('@/views/basic/productCategory'),

  'achievement': () => import('@/views/project/achievement'),
  'marketing': () => import('@/views/project/marketing'),
  'score': () => import('@/views/project/score'),

  'activity': () => import('@/views/information/activity'),
  'attendanceRecord': () => import('@/views/information/attendanceRecord'),
  'cooperationFee': () => import('@/views/information/cooperationFee'),
  'listings': () => import('@/views/information/listings'),
  'otherWages': () => import('@/views/information/otherWages'),
  'record': () => import('@/views/information/record'),

  'calculation': () => import('@/views/commission/calculation'),
  'payroll': () => import('@/views/commission/payroll'),
  'riskFund': () => import('@/views/commission/riskFund'),

  'attractInvestment': () => import('@/views/reportForm/attractInvestment'),
  'cashier': () => import('@/views/reportForm/cashier'),
  'dean': () => import('@/views/reportForm/dean'),
  'teacher': () => import('@/views/reportForm/teacher'),
  'doctor': () => import('@/views/reportForm/doctor'),
  'guidance': () => import('@/views/reportForm/guidance'),
  'income': () => import('@/views/reportForm/income'),
  'investmentPromotionDepartment': () => import('@/views/reportForm/investmentPromotionDepartment'),
  'marketingDepartment': () => import('@/views/reportForm/marketingDepartment'),
  'marketPerformance': () => import('@/views/reportForm/marketPerformance'),
  'mktg': () => import('@/views/reportForm/mktg'),
  'monthlyRanking': () => import('@/views/reportForm/monthlyRanking'),
  'revenue': () => import('@/views/reportForm/revenue'),
  'marketingDepartmentDetail': () => import('@/views/reportForm/marketingDepartmentDetail'),


  'parameters': () => import('@/views/system/parameters'),
  'users': () => import('@/views/system/users'),
}
