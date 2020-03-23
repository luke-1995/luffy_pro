import request from '@/utils/request'

export function aList() {
  return request({
    url: 'article/',
    method: 'get'
  })
}

export function aRet(id) {
  return request({
    url: `article/${id}/`,
    method: 'get'
  })
}



export function aPost(params) {
  return request({
    url: 'article/',
    method: 'post',
    data: params
  })
}

export function aPatch(params) {
  return request({
    url: `article/${params.id}/`,
    method: 'patch',
    data: params
  })
}

export function aDel (id) {
  return request({
    url: `article/${id}/`,
    method: 'delete'
  })
}