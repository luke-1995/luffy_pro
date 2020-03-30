import request from '@/utils/request'
// 回复学生问题
export function taGet () {
  return request({
    url: 'teacher_answer/',
    method: 'get'
  })
}

export function taPatch (params) {
  return request({
    url: `teacher_answer/${params.id}/`,
    method: 'patch',
    data: params
  })
}
