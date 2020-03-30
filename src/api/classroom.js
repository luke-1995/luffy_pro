import request from '@/utils/request'
// 我的教室列表
export function crGet () {
  return request({
    url: 'classroom/',
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

