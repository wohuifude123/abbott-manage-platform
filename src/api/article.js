import ApiInstance from '@/utils/api.instance'

export const getArticleList = data => {
  console.log('getArticleList')
  return ApiInstance.request({
    url: 'http://39.106.161.34:3060/heart/article/v1/get/technology/list',
    method: 'post',
    data: data
  })
}
