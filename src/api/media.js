import request from '@/utils/request'

export function dhGet (url) {
  return request({
    url: url,
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }

  })
}
