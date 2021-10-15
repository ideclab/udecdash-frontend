import Vue from 'vue'
import axios from 'axios'

export default class Authentication {

  Create(code) {
    let url = Vue.prototype.$URL_BACKEND
    let new_url = url + '/api/account/redeem_code/' + code
    return axios.get(new_url)
  }

  registerToken({ user, token }) {
    localStorage.setItem('udecdash_token', token)
    localStorage.setItem('udecdash_user', JSON.stringify(user))
  }

  destroy(error_code) {
    localStorage.clear()
    localStorage.setItem('error_code', error_code)
  }
  resetErrorCode() {
    localStorage.setItem('error_code', null)
  }
}
