import Session from './session'
import Webservice from './webservice'
import axios from 'axios'

export default class Log {

  MODULE_VISUALIZATION = 'module_visualization'
  RESOURCE_TYPE_USAGE = 'resource_type_usage'
  FILE_TYPE_USAGE = 'file_type_usage'
  INTERACTION_BY_RESOURCE =  'interaction_by_resource'
  RESOURCE_VISUALIZATION = 'resource_visualization'
  COURSE_COMMUNICATION = 'course_communication'
  EVALUATION_PANIC = 'evaluation_panic'
  COURSE_INTERACTION = 'course_interaction'

  FIRST_LEVEL = 'first_level'
  SECOND_LEVEL = 'second_level'
  THIRD_LEVEL = 'third_level'

  REPORT_CONTEXT = 'report'
  DOWNLOAD_CONTEXT = 'download'
  REPORT_INFORMATION_CONTEXT = 'report_information'

  fragment = 5
  config_key = "log_config"

  constructor(course_id) {
    this.course_id = course_id
    this.context = null
    this.report = null
    this.deep = null
    this.reference = null
    this.params = null
    this.webservice = new Webservice()
  }
  
  add() {
    let config = this.getConfig(this.course_id)
    if (!this.canStore()) {
      return false
    }
    let activity = this.buildActivity()
    config.activity.push(activity)
    this.updateConfig(config)
    let need_push = config.activity.length >= this.fragment
    if(need_push){
      this.pushToServer()
    }
    return true
  }

  pushToServer() {
    let url = this.webservice.baseURL() + '/logs/create'
    let config = this.getConfig(this.course_id)
    let content = JSON.stringify(config.activity)
    axios.post(url, content, {
      headers: {
        Authorization: `Bearer ${this.webservice.token()}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response.status)
      let pushed_elements = config.activity.length
      config.activity.splice(0, pushed_elements)
      this.updateConfig(config)
    })
  }

  buildActivity() {
    let session = new Session()
    return {
      course_id: this.course_id,
      session_id: session.getId(),
      context: this.context,
      report: this.report,
      deep: this.deep,
      reference: this.reference,
      params : this.params,
      created_at: this.now()
    }
  }

  now() {
    var moment = require('moment')
    return moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  }

  canStore() {
    let config = this.getConfig()
    return config.enabled[this.course_id]
  }

  enable() {
    let config = this.getConfig()
    config.enabled[this.course_id] = true
    this.updateConfig(config)
  }

  disable() {
    let config = this.getConfig()
    config.enabled[this.course_id] = false
    this.updateConfig(config)
  }

  getConfig() {
    let config = localStorage.getItem(this.config_key)
    if (config === null) {
      config = { enabled: {}, activity: [] }
      this.updateConfig(config)
    } else {
      config = JSON.parse(config)
    }
    return config
  }

  updateConfig(config) {
    localStorage.setItem(this.config_key, JSON.stringify(config))
  }

  setContext(context){
    let options = [this.REPORT_CONTEXT, this.DOWNLOAD_CONTEXT, this.REPORT_INFORMATION_CONTEXT]
    if(options.includes(context)){
      this.context = context
    }else{
      throw new Error(`${context} is not a valid context key.`)
    }
  }

  setReport(report){
    let options = [this.MODULE_VISUALIZATION, this.RESOURCE_TYPE_USAGE, this.FILE_TYPE_USAGE,
    this.INTERACTION_BY_RESOURCE, this.RESOURCE_VISUALIZATION, this.COURSE_COMMUNICATION,
    this.EVALUATION_PANIC, this.COURSE_INTERACTION]
    if(options.includes(report)){
      this.report = report
    }else{
      throw new Error(`${report} is not a valid report key.`)
    }
  }

  setDeep(deep){
    let options = [this.FIRST_LEVEL, this.SECOND_LEVEL, this.THIRD_LEVEL]
    if(options.includes(deep)){
      this.deep = deep
    }else{
      throw new Error(`${deep} is not a valid deep key.`)
    }
  }

  setReference(reference){
    this.reference = reference
  }

  setParams(params){
    this.params = params
  }

}