
/**
 * Setup primary
 */
import './src/main.scss'
import './node_modules/bootstrap/dist/css/bootstrap.css'

/**
 * Setup fontawesome
 */
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTwitter,
  faGithub,
  faGoogle,
  faFacebook
 } from '@fortawesome/free-brands-svg-icons'

 import {
  faSync,
  faTrash,
  faEdit,
  faWindowClose,
  faSignOutAlt,
  faUser,
  faFilter,
  faPlusCircle,
  faCalendarCheck
 } from '@fortawesome/free-solid-svg-icons'

 library.add(
  faFacebook,
  faTwitter,
  faGithub,
  faGoogle,
  faSync,
  faTrash,
  faEdit,
  faWindowClose,
  faSignOutAlt,
  faUser,
  faFilter,
  faPlusCircle,
  faCalendarCheck
 )