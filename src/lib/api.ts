import axios from 'axios'
import {
  SK_HOST,
  SK_PORT
} from '../config'

const API = {
  async refresh (display:string) {
    return await axios.get(`http://${SK_HOST}:${SK_PORT}/_essense-instrument/api/v1/state/${display}`)
  }
}

export default API
