
import PredefinedNotifications from '@/assets/js/PredefinedNotifications.json'
import Vue from 'vue'

export default class Notification {
        get(id){
            let predefineds = []
            id.forEach(element => {
                if(PredefinedNotifications[element] != undefined){
                    predefineds.push(PredefinedNotifications[element])
                }
            });
           return predefineds
        }

    filterBody(body,users){
        let student = '[estudiante]'
        let teacher = '[profesor]'
        let text =body
        if(users.length ==0){
            text = text.replace(student,' ')

        }
        else if(users.length >1){
        text = text.replace(student,'s estudiantes')
        }else{
         let  name= Vue.prototype.$SECTION.members.find(resp => resp.canvas_id == users[0]).name
         text = text.replace(student,` ${name}`)
        }
        let current_user = JSON.parse(localStorage.getItem('udecdash_user'))
        text = text.replace(teacher,current_user['name'])
        return text
    }
}