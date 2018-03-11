import axios from 'axios'

export function login ({username, password}) {
  let url = '/api/login'

  let data = Object.assign({}, {
    username: username,
    password: password
  })

  return axios({
    url: url,
    method: 'post',
    data: data,
    timeout: 4000
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    return Promise.reject(err)
  })
}
