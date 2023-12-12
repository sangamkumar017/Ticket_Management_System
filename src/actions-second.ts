import axios from 'axios'
import { secureDownloadAPI, ticketAPI } from './axios'

export const getOpenTicket = (userID: string | undefined) => {
  return ticketAPI
    .get(`reporting-module?user_id=${userID}`)
    .then((response) => response)
    .catch((error) => error)
}

export const getUploadURlSecureDownload = (
  fileType: string | undefined,
  payload: any
) => {
  return secureDownloadAPI
    .post(
      `doc-uploader?requestType=get-upload-url&fileType=${fileType}`,
      payload
    )
    .then((response) => response)
    .catch((error) => error)
}

export const uploadFileApi = (
  uploadURL: string,
  fileList: string | undefined
) => {
  return axios
    .put(`${uploadURL}`, fileList)
    .then((response) => response)
    .catch((error) => error)
}
