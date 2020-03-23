import request from '@/utils/request'

export function rfGet () {
  return request({
    url: 'report_forms/',
    method: 'get'
  })
}