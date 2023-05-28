import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 提成设定-获取列表
export function getProjectCommissionList(params, query) {
  const url = '/projectCommission/projectCommissionList/' + params.pageNum + '/' + params.pageSize
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

// 提成设定-新增
export function addProjectCommission(params) {
  return request({
    url: '/projectCommission/add',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 提成设定-删除
export function deleteProjectCommission(params) {
  return request({
    url: '/projectCommission/delete',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
