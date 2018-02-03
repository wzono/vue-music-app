import jsonp from 'common/js/jsonp'
import { commenParams, options } from './config'

export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg?'

  const data = Object.assign({}, commenParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 5381,
    needNewCode: 0,
    platform: 'yqq',
    hostUin: 0
  })

  return jsonp(url, data, options)
}