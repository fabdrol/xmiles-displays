import axios from 'axios'
import {
  SK_HOST,
  SK_PORT
} from '../config'

const API = {
  async refresh (display:string) {
    const schema = SK_PORT === 443 ? 'https' : 'http'
    const url = `${schema}://${SK_HOST}:${SK_PORT}/_essense-instrument/api/v1/state/${display}`
    return await axios.get(url)
  }
}

export default API
