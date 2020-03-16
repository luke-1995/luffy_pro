import request from '@/utils/request'

export function tcGet () {
  return request({
    url: 'teacher_correction/',
    method: 'get'
  })
}

export const upload = (e, item) => {
  var completeProgress = (((e.loaded / e.total) * 100) | 0) + '%'
  item.uploadPercentage = completeProgress
}

export function cfPost (params, config, id) {
  return request({
    ...config,
    url: `correction_file/${id}/`,
    method: 'post',
    data: params
    // onUploadProgress: upload,
    // headers: {
    //   "Content-Type": "multipart/form-data"
    // },
  })
}
