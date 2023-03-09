import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 职员管理-获取列表
export function getClerkList(params, query) {
  const url = '/Admin/employee/list/' + params.pageNum + '/' + params.pageSize
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

// 职员管理-新增
export function addClerk(params) {
  return request({
    url: '/employee/add',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

// 职员管理-修改
export function alterClerk(params) {
  return request({
    url: '/employee/update',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    data: params
  })
}

// 职员管理-获取详情
export function clerkInfo(params) {
  return request({
    url: '/table/list' + params,
    headers: {
      'authorization': getToken('waprx')
    },
    method: 'get'
  })
}

// 职员管理-获取部门下拉
export function clerkDepartment(params) {
  return request({
    url: '/table/list' + params,
    headers: {
      'authorization': getToken('waprx')
    },
    method: 'get',
    params
  })
}

// 职员管理-删除
export function delClerk(params) {
  return request({
    url: '/employee/del/' + params,
    headers: {
      'authorization': getToken('waprx')
    },
    method: 'delete',
  })
}
// 字典类别-获取列表
export function getDictTypeList(params, query) {
  const url = '/dictType/dictTypeList/' + params.pageNum + '/' + params.pageSize
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

// 字典类别-新增
export function addDictType(params) {
  return request({
    url: '/dictType/add',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 字典类别-删除
export function deleteDictType(params) {
  return request({
    url: '/dictType/delete',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// 字典-获取列表
export function getDictList(params, query) {
  const url = '/dict/dictList/' + params.pageNum + '/' + params.pageSize
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

// 字典-新增
export function addDict(params) {
  return request({
    url: '/dict/add',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 字典-删除
export function deleteDict(params) {
  return request({
    url: '/dict/delete',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// 职务-获取列表
export function getDutyList(params, query) {
  const url = '/duty/dutyList/' + params.pageNum + '/' + params.pageSize
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

// 职务-新增
export function addDuty(params) {
  return request({
    url: '/duty/add',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 职务-删除
export function deleteDuty(params) {
  return request({
    url: '/duty/delete',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// 组织架构-获取列表
export function getOrganizationsList(params, query) {
  const url = '/organizations/organizationsList/' + params.pageNum + '/' + params.pageSize
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

// 组织架构-新增
export function addOrganizations(params) {
  return request({
    url: '/organizations/add',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 组织架构-删除
export function deleteOrganizations(params) {
  return request({
    url: '/organizations/delete',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 产品类别-获取列表
export function getProductionTypeList(params, query) {
  const url = '/productionType/productionTypeList/' + params.pageNum + '/' + params.pageSize
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

// 产品类别-新增
export function addProductionType(params) {
  return request({
    url: '/productionType/add',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 产品类别-删除
export function deleteProductionType(params) {
  return request({
    url: '/productionType/delete',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 产品-获取列表
export function getProductionList(params, query) {
  const url = '/production/productionList/' + params.pageNum + '/' + params.pageSize
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

// 产品-新增
export function addProduction(params) {
  return request({
    url: '/production/add',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 产品-删除
export function deleteProduction(params) {
  return request({
    url: '/production/delete',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 删除图片
export function deleteImg(params) {
  return request({
    url: '/file/deleteImg',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 参数表-获取列表
export function getSystemProfileList(params, query) {
  const url = '/systemProfile/systemProfileList/' + params.pageNum + '/' + params.pageSize
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

// 参数表-修改
export function updateProduction(params) {
  return request({
    url: '/systemProfile/update',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 收款类型-获取列表
export function getReceiveTypeList(params, query) {
  const url = '/receiveType/receiveTypeList/' + params.pageNum + '/' + params.pageSize
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

// 收款类型-新增
export function addReceiveType(params) {
  return request({
    url: '/receiveType/add',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 收款类型-删除
export function deleteReceiveType(params) {
  return request({
    url: '/receiveType/delete',
    headers: {
      'authorization': getToken('waprx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

