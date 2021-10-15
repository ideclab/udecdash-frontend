import Vue from 'vue'
import axios from 'axios'
import Authentication from '@/models/authentication'
export default class Webservice {
  token() {
    return localStorage.udecdash_token
  }
  baseURL() {
    return `${Vue.prototype.$URL_BACKEND}/api`
  }
  getSection(course_id) {
    return localStorage.getItem(course_id)
  }
  async query(path) {
    let url = `${this.baseURL()}${path}`
    let token = this.token()
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: 'Bearer ' + token,
          "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Origin": "http://www.backend_dev.cl",
        }
      })
      return this.checkAnswer({ status: response.status, data: response.data })
    } catch (error) {
      let status = null
      if (error.response) {
        status = error.response.status
      } else if (error.request) {
        status = error.request.status
      } else {
        status = -1
      }
      return this.checkAnswer({ status: status })
    }
  }
  courseList() {
    let url = `/courses/list`
    return this.query(url)
  }
  courseInformation(course_id) {
    let url = `/courses/information/${course_id}`
    return this.query(url)
  }
  async processCourseData(course_id) {
    let url = `/courses/process_data/${course_id}`
    return this.query(url)
  }

  destroyAuthentication(status) {
    let authentication = new Authentication()
    authentication.destroy(status)
  }

  /*************************************************************
   **************************************************************
   * Reportes
   **************************************************************
   *************************************************************/

  moduleVisualization(course_id) {
    let url = `/reports/module_visualizations/${course_id}/${this.getSection(
      course_id
    )}`
    return this.query(url)
  }
  resourceTypeUsage(course_id) {
    let url = `/reports/resource_type_usage/${course_id}/${this.getSection(
      course_id
    )}`
    return this.query(url)
  }
  fileTypeUsage(course_id) {
    let url = `/reports/file_type_usage/${course_id}/${this.getSection(
      course_id
    )}`
    return this.query(url)
  }
  interactionByResource(course_id) {
    let url = `/reports/interaction_by_resource/${course_id}/${this.getSection(
      course_id
    )}`
    return this.query(url)
  }
  resourceVisualizations(course_id) {
    let url = `/reports/resource_visualizations/${course_id}/${this.getSection(
      course_id
    )}`
    return this.query(url)
  }
  courseCommunication(course_id) {
    let url = `/reports/course_communication/${course_id}/${this.getSection(
      course_id
    )}`
    return this.query(url)
  }
  evaluationPanic(course_id) {
    let url = `/reports/evaluation_panic/${course_id}/${this.getSection(
      course_id
    )}`
    return this.query(url)
  }
  courseInteractionSpecific({ course_id, year, month }) {
    let url = `/reports/course_interactions/${course_id}/${this.getSection(
      course_id
    )}/${year}/${month}`
    return this.query(url)
  }
  courseInteractionGlobal({ course_id, year, month }) {
    let url = `/reports/course_interactions/${course_id}/${this.getSection(
      course_id
    )}/${year}/${month}/summary`
    return this.query(url)
  }
  notification(data) {
    let url = `${this.baseURL()}/canvas/send_mail`
    let token = this.token()
    return axios.post(url,data, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

  checkAnswer({ status, data = [] }) {
    if (status == 200) {
      return {
        error: false,
        information: data,
        message: '',
        status: status
      }
    } else if (status == 204) {
      return {
        error: true,
        information: data,
        message: 'El curso no posee datos, se recomienda actualización',
        status: status
      }
    } else if (status == 401) {
      this.destroyAuthentication(status)
      window.location.replace('/')
      return {
        error: true,
        information: data,
        message: 'La sesion a expirado',
        status: status
      }
    } else if (status == 0) {
      return {
        error: true,
        information: data,
        message: 'No hay conexión',
        status: status
      }
    }
  }

   get_tutorial() {
    let url = `/tutorial/viewed`
    return this.query(url)
  }
  set_tutorial(data) {
    let url = `${this.baseURL()}/tutorial/mark_as_viewed`
    let token = this.token()
    return axios.post(url,data, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }
  reset_tutorial() {
    let url = `${this.baseURL()}/tutorial/reset_all`
    let token = this.token()
    return axios.post(url,{}, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }
}
