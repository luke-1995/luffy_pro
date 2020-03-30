import request from '@/utils/request'
// 没有录入到api权限中
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
