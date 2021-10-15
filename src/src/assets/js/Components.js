import Vue from 'vue'
// Navegacion y barrita de arriba
import NavigationDrawer from '@/components/NavigationDrawer.vue'
import Loading from '@/components/others/Loading.vue'

import BreadCrumb from '@/components/others/BreadCrumb.vue'

import Warning from '@/components/alerts/Warning.vue'
import Error from '@/components/alerts/Error.vue'
import Notification from '@/components/modals/Notifications.vue'

/*
 *Reports
 */
import Download from '@/components/reports/Download.vue'
import Help from '@/components/reports/Help.vue'
import ItemState from '@/components/reports/ItemState.vue'
import NavigationButton from '@/components/reports/NavigationButton.vue'
import ProgressLinear from '@/components/reports/ProgressLinear.vue'
import DisplayState from '@/components/reports/DisplayState.vue'

Vue.component('Help', Help)
Vue.component('Download', Download)
Vue.component('ItemState', ItemState)
Vue.component('NavigationButton', NavigationButton)
Vue.component('ProgressLinear', ProgressLinear)
Vue.component('DisplayState', DisplayState)

/*
* end reports
*/
/*
* Icons
*/
import IconBase from '@/components/icons/IconBase.vue'
import IconUpgrade from '@/components/icons/IconUpgrade.vue'
import IconAccess from '@/components/icons/IconAccess.vue'
import IconExit from '@/components/icons/IconExit.vue'
import IconArrow from '@/components/icons/IconArrow.vue'
import IconPage from '@/components/icons/IconPage.vue'
import IconError from '@/components/icons/IconError.vue'

Vue.component('IconBase', IconBase)
Vue.component('IconUpgrade', IconUpgrade)
Vue.component('IconAccess', IconAccess)
Vue.component('IconExit', IconExit)
Vue.component('IconArrow', IconArrow)
Vue.component('IconPage', IconPage)
Vue.component('IconError', IconError)

/*
* end Icons
*/



Vue.component('NavigationDrawer', NavigationDrawer)
Vue.component('BreadCrumb', BreadCrumb)
Vue.component('Loading', Loading)
Vue.component('Notification', Notification)
Vue.component('Warning', Warning)
Vue.component('Error', Error)



