import { v4 as uuidv4 } from 'uuid'

export default class session {

    identifier = "app_session"
    break_time = 600 // in seconds

    getId(){
        return this.current().id
    }

    current(){
        let content = localStorage.getItem(this.identifier)
        if(content === null){
            this.create()
            content = localStorage.getItem(this.identifier)
        }
        return JSON.parse(content)
    }

    create(){
        let content = { id: uuidv4(), start_at: this.now(), last_activity: this.now() }
        this.updateStorage(content)
    }

    updateActivity(){
        let content = this.current()
        let dead_time = content.last_activity + this.break_time
        if(this.now() > dead_time){
            this.create()
        }else{
            content.last_activity = this.now()
            this.updateStorage(content)
        }
    }

    now(){
        return Math.round(new Date().getTime()/1000)
    }

    updateStorage(content){
        localStorage.setItem(this.identifier, JSON.stringify(content))
    }
}