import request from '@/utils/request'
// 生成课时列表,video视图用到
export function sGet (chapter_id) {
  return request({
    url: `section/${chapter_id}/`,
    method: 'get'
  })
}
