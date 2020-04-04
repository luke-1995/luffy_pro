import request from '@/utils/request'

export function tcGet () {
  return request({
    url: 'teacher_correction/',
    method: 'get'
  })
}

// 上传批改作业
export function filePost (id, params, config) {
  return request({
    ...config,
    url: `correction_file/${id}/`,
    method: 'post',
    data: params
  })
}
