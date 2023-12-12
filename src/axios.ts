import axios from 'axios'
import { config } from './config'

export const ticketAPI = axios.create({
  baseURL: config.TICKET_API,
})

export const secureDownloadAPI = axios.create({
  baseURL: config.SECURE_DOWNLOAD_API,
})
