import request from '@/utils/request'
// 作业列表
export function hwGet (chapter_id) {
  return request({
    url: `homework/${chapter_id}/`,
    method: 'get'
  })
}

export function hwPut (chapter_id, params) {
  return request({
    url: `homework/${chapter_id}/`,
    method: 'put',
    data: params
  })
} 

// 上传作业
export function filePost (id,params,config) {
  return request({
    ...config,
    url: `homework_file/${id}/`,
    method: 'post',
    data:params
  })
}