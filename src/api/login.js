import ApiInstance from '@/utils/api.instance'

export const getLogin = data => {
  // console.log('getLogin')
  return ApiInstance.request({
    // url: 'http://39.105.168.44:9091/user/v1/login',
    // baseURL: 'http://39.105.168.44:9091',
    url: '/user/v1/login',
    method: 'post',
    data: data
  })
}
