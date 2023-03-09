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

