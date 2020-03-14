import request from '@/utils/request'

export function srGet (id) {
  return request({
    url: `student_record_list/${id}/`,
    method: 'get'
  })
}

export function srPost (params) {
  return request({
    url: 'student_record/',
    method: 'post',
    data: params
  })
}

export function srPatch (params) {
  return request({
    url: `student_record/${params.id}/`,
    method: 'patch',
    data: params
  })
}

export function srDel (id) {
  return request({
    url: `student_record/${id}/`,
    method: 'delete'
  })
}
