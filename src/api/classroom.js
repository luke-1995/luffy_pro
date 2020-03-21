import request from '@/utils/request'

export function crGet () {
  return request({
    url: 'classroom/',
    method: 'get'
  })
}