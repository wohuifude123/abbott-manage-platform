import ApiInstance from '@/utils/api.instance'
import Config from '@/config/config'

export const postArticleList = data => {
  return ApiInstance.request({
    // url: 'http://39.106.161.34:3060/heart/article/v1/get/technology/list',
    url: 'http://39.106.161.34:3060/heart/article/v1/get/technology/list',
    method: 'post',
    data: data
  })
}

export const getArticleList = data => {

  let urlTechnologyArticle = '/v1/technologyArticle'
  if(data.hasOwnProperty("params")) {
    if(data.params.start !== undefined && data.params.dataLength !== undefined) {
      urlTechnologyArticle = `/v1/technologyArticle?start=${data.params.start}&dataLength=${data.params.dataLength}`
    } else {
      if(data.params.start !== undefined) {
        urlTechnologyArticle = `/v1/technologyArticle?start=${data.params.start}`
      } else if(data.params.dataLength !== undefined) {
        urlTechnologyArticle = `/v1/technologyArticle?dataLength=${data.params.dataLength}`
      }
    }
  }
  return ApiInstance.request({
    // url: 'http://39.106.161.34:3060/heart/article/v1/get/technology/list',
    url: urlTechnologyArticle,
    method: 'get',
    data: data
  })
}

export const postArticleDetail = data => {
  return ApiInstance.request({
    url: '/v1/technologyArticle/selectById',
    method: 'post',
    data: data
  })
}

export const editArticleDetail = data => {
  return ApiInstance.request({
    url: `${Config.publicUrl.editArticle}`,
    method: 'post',
    data: data
  })
}



