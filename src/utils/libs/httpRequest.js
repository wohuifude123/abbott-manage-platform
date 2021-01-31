import axios from 'axios'

const addErrorLog = errorInfo => {
  const {
    statusText,
    status,
    request: {
      responseURL
    }
  } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  // if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
    this.timeout = 5 * 1000
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      // withCredentials: true,
      headers: {}
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // console.log('interceptors instance url == ', url)
    // 请求拦截
    instance.interceptors.request.use(config => {
      // console.log('interceptors request config == ', config)
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      // console.log('interceptors length == ', Object.keys(this.queue).length)
      return config
    }, error => {
      // console.log('interceptors request error == ', error)
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      // console.log('interceptors res == ', res)
      this.destroy(url)
      const {
        data,
        status
      } = res
      if (res.data.code === '200') {
        return {
          data,
          status
        }
      } else if(res.data.code === '605'){
        router.replace('/605')
        let msg = res.data.msg
        if (msg) {
          // iView.Message.error(msg)
        }
        return {
          data,
          status
        }
      } else {
        let msg = res.data.msg
        if (msg) {
          let msgConfig = {}
          msgConfig.content = msg
          msgConfig.duration =3
          // iView.Message.error(msg)
        }
        return {
          data,
          status
        }
      }
    }, error => {
      // console.log('interceptors error.response', error.response)
      this.destroy(url)
      let errorInfo = error.response

      if (!errorInfo) {
        const {
          request: {
            statusText,
            status
          },
          config
        } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: {
            responseURL: config.url
          }
        }
      }
      addErrorLog(errorInfo)
      // return Promise.reject(error)
      return Promise.reject(error.response)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    // console.log('this.baseUrl == ', this.baseUrl)
    // console.log('options == ', options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
