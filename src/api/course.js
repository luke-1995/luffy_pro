import request from '@/utils/request'
// 路飞课程
export function courseGet () {
  return request({
    url: 'course/',
    method: 'get'
  })
}

export function cdGet (id) {
  return request({
    url: `course_detail/${id}/`,
    method: 'get'
  })
}

// 课程分类
export function categoryGet () {
  return request({
    url: 'category/',
    method: 'get'
  })
}
