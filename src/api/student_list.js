import request from '@/utils/request'
// 导师查看学生记录
export function slGet () {
  return request({
    url: 'student_list/',
    method: 'get'
  })
}
