import request from '@/utils/request'

export function scGet () {
  return request({
    url: 'shopping_cart/',
    method: 'get'
  })
}

export function scPost (params) {
  return request({
    url: 'shopping_cart/',
    method: 'post',
    data: params
  })
}

export function scPatch (params) {
  return request({
    url: `shopping_cart/${params.id}/`,
    method: 'patch',
    data: params
  })
}

export function scDel (id) {
  return request({
    url: `shopping_cart/${id}/`,
    method: 'delete'
  })
}
