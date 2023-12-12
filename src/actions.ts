import { ticketAPI } from './axios'

export const getAllTickets = () => {
  return ticketAPI
    .get(`reporting-module?getAllTickets=true`)
    .then((response) => response)
    .catch((error) => error)
}

export const postUserTicket = (payload: any) => {
  return ticketAPI
    .post(`reporting-module`, payload)
    .then((response) => response)
    .catch((error) => error)
}

export const updateTicket = (
  ticketId: string,
  updateType: string,
  payload: object
) => {
  return ticketAPI
    .put(
      `reporting-module?ticketId=${ticketId}&updateType=${updateType}`,
      payload
    )
    .then((response) => response)
    .catch((error) => error)
}

export const getTicketDetails = (ticketId: string | undefined) => {
  return ticketAPI
    .get(`reporting-module-stable?ticketId=${ticketId}`)
    .then((response) => response)
    .catch((error) => error)
}

export const departmentTickets = (departmentCode: string | undefined) => {
  return ticketAPI
    .get(`reporting-module-stable?departmentCode=${departmentCode}`)
    .then((response) => response)
    .catch((error) => error)
}

export const getIssuesDepartmentPriorityStatusAPI = (
  reqParameter: string | undefined
) => {
  return ticketAPI
    .get(`reporting-module?type=${reqParameter}`)
    .then((response) => response)
    .catch((error) => error)
}

export const putFileToS3 = (url: string, fileInput: any, contentType: any) => {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
      'x-amz-acl': 'public-read',
      mode: 'cors',
      'x-av-api-access-key': localStorage.getItem('jwtToken') || '',
    },
    body: fileInput,
  })
    .then((resp) => {
      return resp
    })
    .then((resp) => {
      return resp
    })
    .catch((err) => err)
}

export const getMetaDataAPI = (
  type: string | undefined,
  startDate: string | number,
  endDate: string | number
) => {
  return ticketAPI
    .get(
      `reporting-module?type=${type}&startDate=${startDate}&endDate=${endDate}`
    )
    .then((response) => response)
    .catch((error) => error)
}

export const getIssueResolvers = (type: string) => {
  return ticketAPI
    .get(`reporting-module?type=${type}`)
    .then((response) => response)
    .catch((error) => error)
}
