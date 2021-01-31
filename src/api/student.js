import ApiInstance from '@/utils/api.instance'

export const getStudentList = data => {
  // console.log('getLogin')
  return ApiInstance.request({
    // url: 'http://39.105.168.44:9091/user/v1/login',
    // baseURL: 'http://39.105.168.44:9091',
    // url: '/v1/student?start=0&dataLength=100',
    url: data.url,
    method: 'get',
    data: data
  })
}

export const addOneStudent = data => {
  // console.log('getLogin')
  return ApiInstance.request({
    // url: 'http://39.105.168.44:9091/user/v1/login',
    // baseURL: 'http://39.105.168.44:9091',
    url: '/v1/student/add',
    method: 'post',
    data: data
  })
}
