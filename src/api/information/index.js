import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 合作费-获取列表
export function getCooperationExpList(params, query) {
  const url = '/cooperationExp/cooperationExpList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 合作费-新增
export function addCooperationExp(params) {
  return request({
    url: '/cooperationExp/add',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 合作费-删除
export function deleteCooperationExp(params) {
  return request({
    url: '/cooperationExp/delete',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 员工出勤-获取列表
export function getAttendLists(params, query) {
  const url = '/attendList/attendLists/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 员工出勤-新增
export function addAttendList(params) {
  return request({
    url: '/attendList/add',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 员工出勤-删除
export function deleteAttendList(params) {
  return request({
    url: '/attendList/delete',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// 项目信息-获取列表
export function getProjectList(params, query) {
  const url = '/project/projectList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 项目信息-新增
export function addProject(params) {
  return request({
    url: '/project/add',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 项目信息-删除
export function deleteProject(params) {
  return request({
    url: '/project/delete',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

// 项目财务信息-获取列表
export function getProjectFinanceList(params, query) {
  const url = '/projectFinance/projectFinanceList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 项目财务信息-新增
export function addProjectFinance(params) {
  return request({
    url: '/projectFinance/add',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 项目财务信息-删除
export function deleteProjectFinance(params) {
  return request({
    url: '/projectFinance/delete',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 项目操作-获取列表
export function getProjectOperationMessageList(params, query) {
  const url = '/projectOperation/projectOperationMessageList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 项目操作-新增
export function addProjectOperation(params) {
  return request({
    url: '/projectOperation/add',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 项目操作-删除
export function deleteProjectOperation(params) {
  return request({
    url: '/projectOperation/delete',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// 使用耗材-获取列表
export function getProjectMaterialList(params, query) {
  const url = '/projectMaterial/projectMaterialList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 使用耗材-新增
export function addProjectMaterial(params) {
  return request({
    url: '/projectMaterial/add',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 使用耗材-删除
export function deleteProjectMaterial(params) {
  return request({
    url: '/projectMaterial/delete',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

// 销售方案-获取列表
export function getSalePrjList(params, query) {
  const url = '/salePrj/salePrjList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}
// 销售方案-新增
export function addSalePrj(params) {
  return request({
    url: '/salePrj/add',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 销售方案-删除
export function deleteSalePrj(params) {
  return request({
    url: '/salePrj/delete',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 销售记录-获取列表
export function getSalePrjListList(params, query) {
  const url = '/salePrjList/salePrjList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 销售记录-新增
export function addSalePrjList(params) {
  return request({
    url: '/salePrjList/add',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 销售记录-删除
export function deleteSalePrjList(params) {
  return request({
    url: '/salePrjList/delete',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

