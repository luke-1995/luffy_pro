import request from '@/utils/request'
// 报表列表
export function rfGet () {
  return request({
    url: 'report_forms/',
    method: 'get'
  })
}
