import request from '@/utils/request'

export function login (params) {
  return request({
    url: 'auth/login/',
    method: 'post',
    data: params
  })
}

export function registerApi (params) {
  return request({
    url: 'auth/register/',
    method: 'post',
    data: params
  })
}