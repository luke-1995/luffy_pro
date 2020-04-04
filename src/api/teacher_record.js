import request from '@/utils/request'
// 导师跟进
export function trGet () {
  return request({
    url: 'teacher_record/',
    method: 'get'
  })
}
