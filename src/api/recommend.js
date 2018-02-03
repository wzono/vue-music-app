import axios from 'axios'
import { commenParams } from './config'

export function getRecommends () {
  const url = '/api/getSlider'

  const data = Object.assign({}, commenParams, {
    platform: 'h5',
    needNewCode: 1,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getDiscList () {
  const url = '/api/getDiscList'

  const data = Object.assign({}, commenParams, {
    platform: 'yqq',
    needNewCode: 0,
    format: 'json',
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29,
    picmid: 1,
    hostUin: 0,
    rnd: Math.random()
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}