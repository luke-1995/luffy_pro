import request from '@/utils/request'
// 学习进度
export function lpGet () {
  return request({
    url: 'learning_progress/',
    method: 'get'
  })
}

export function lpPatch (id, params) {
  return request({
    url: `learning_progress/${id}/`,
    method: 'patch',
    data: params
  })
}
