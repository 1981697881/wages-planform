import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 工资表-获取列表
export function getProgrammeList(params, data) {
  const url = '/programme/programmeList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}
// 工资表-字段
export function chooseProgramme(params) {
  const url = '/programme/choose'
  return request({
    url: url,
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 工资表-新增
export function addProgramme(params) {
  const url = '/programme/add'
  return request({
    url: url,
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 工资表-刪除
export function deleteProgramme(params) {
  const url = '/programme/delete'
  return request({
    url: url,
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}

