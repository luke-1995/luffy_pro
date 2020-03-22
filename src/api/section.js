import request from '@/utils/request'

export function sGet (chapter_id) {
  return request({
    url: `section/${chapter_id}/`,
    method: 'get'
  })
}