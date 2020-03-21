import request from '@/utils/request'

export function hwGet (chapter_id) {
  return request({
    url: `homework/${chapter_id}/`,
    method: 'get'
  })
}

export function hwPut (chapter_id,params) {
  return request({
    url: `homework/${chapter_id}/`,
    method: 'put',
    data: params
  })
}