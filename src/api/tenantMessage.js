import ApiInstance from '@/utils/api.instance'

export const getTenantMessageList = data => {
  let urlTenantMessage = `/tenantMessage/v1`
  if(data.hasOwnProperty("params")) {
    if(data.params.start !== undefined && data.params.dataLength !== undefined) {
      urlTenantMessage = `/tenantMessage/v1?start=${data.params.start}&dataLength=${data.params.dataLength}`
    } else {
      if(data.params.start !== undefined) {
        urlTenantMessage = `/tenantMessage/v1?start=${data.params.start}`
      } else if(data.params.dataLength !== undefined) {
        urlTenantMessage = `/tenantMessage/v1?dataLength=${data.params.dataLength}`
      }
    }
  }
  console.log('getTenantMessageList data == ', data)
  return ApiInstance.request({
    url: urlTenantMessage,
    method: 'get',
    data: data
  })
}
