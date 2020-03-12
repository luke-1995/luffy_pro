import request from '@/utils/request'

export function roleGet () {
  return request({
    url: 'role/',
    method: 'get'
  })
}

export function rolePost (params) {
  return request({
    url: 'role/',
    method: 'post',
    data: params
  })
}

export function rolePatch (params) {
  return request({
    url: `role/${params.id}/`,
    method: 'patch',
    data: params
  })
}

export function roleDel (id) {
  return request({
    url: `role/${id}/`,
    method: 'delete'
  })
}
