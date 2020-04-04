import request from '@/utils/request'

export function dsGet () {
  return request({
    url: 'dis_stu/',
    method: 'get'
  })
}

export function dsPatch (params) {
  return request({
    url: `dis_stu/${params.id}/`,
    method: 'patch',
    data: params
  })
}
