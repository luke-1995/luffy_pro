import request from '@/utils/request'
// 没有录入到api权限中
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
