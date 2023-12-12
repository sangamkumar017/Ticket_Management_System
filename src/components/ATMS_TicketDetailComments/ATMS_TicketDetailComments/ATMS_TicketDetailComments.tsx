import React, { useEffect, useRef, useState } from 'react'

import 'react-quill/dist/quill.snow.css'

import { Avatar, Button, Col, Popover, Row } from 'antd'
import { getIssueResolvers, updateTicket } from '../../../actions'
import './ATMS_TicketDetailComments.css'
import ATMS_TicketDetailCommentsEditor from '../ATMS_TicketDetailCommentsEditor/ATMS_TicketDetailCommentsEditor'
import moment from 'moment'
import Parser from 'html-react-parser'
import { ATMS_TimeAgo } from '../..'

const ATMS_TicketDetailComments: React.FC<any> = ({
  ticketDetails,
  setTicketDetails,
  privileges,
}) => {
  const userAttributesLocal = localStorage.getItem('userAttributes')
  const [updateType, setUpdateType] = useState<any>()
  const [issueResolvers, setIssueResolvers] = useState<any>([])
  const [commentsDataToPush, setCommentsDataToPush] = useState<any>()
  let userAttributes: any
  if (userAttributesLocal) {
    userAttributes = JSON.parse(userAttributesLocal)
  }

  useEffect(() => {
    getIssueResolvers('issueresolver')
      .then((res) => {
        const response = res.data
        response.forEach((responseItem: any) => {
          setIssueResolvers((prevIssueResolvers: any, index: any) => {
            let dummy = []
            dummy.push(
              {
                id: index,
                value: responseItem.category,
                disabled: true,
              },
              ...responseItem?.Assigned
            )
            return [...prevIssueResolvers, ...dummy]
          })
        })
      })
      .catch((error) => console.log(error))
  }, [])

  const addCommentHandler = () => {
    updateTicket(ticketDetails.ticketId, 'comment', commentsDataToPush).then(
      (res) => {
        console.log(res)
      }
    )
    let prevTicketDetails = { ...ticketDetails }
    if (!prevTicketDetails.comments) prevTicketDetails.comments = []
    prevTicketDetails.comments.push({
      ...commentsDataToPush,
      commentUpdated: moment().valueOf(),
    })
    setTicketDetails(prevTicketDetails)

    setUpdateType('')
  }

  const replyCommentButtonHandler = (event: any) => {
    if (event.target.innerText === 'Comment') setUpdateType('comment')
    else if (event.target.innerText === 'Reply') setUpdateType('reply')
  }

  function parseHtmlString(htmlString: any) {
    // if (htmlString.includes('#')) {
    //   const regex = /#([-\w]+)/
    //   const match = regex.exec(htmlString)
    //   console.log(match?.[1])
    //   let newString
    //   if (match) {
    //     newString = htmlString.replace(
    //       /#/g,
    //       `
    //     <div style={{ textAlign: 'center' }}>
    //     <iframe
    //       src="http://127.0.0.1:5173/${match[1]}"
    //       width="fit-content"
    //       height="160"
    //     ></iframe>
    //   </div>`
    //     )
    //   } else {
    //     newString = htmlString.replace(
    //       /#/g,
    //       `
    //     <div style={{ textAlign: 'center' }}>
    //     <iframe
    //       src="http://127.0.0.1:5173/"
    //       width="fit-content"
    //       height="160"
    //     ></iframe>
    //   </div>`
    //     )
    //   }

    //   return Parser(newString)
    // } else {
    return Parser(htmlString)
    // }
  }

  return (
    <div className="atms-ticket-details-page-conversation-container">
      <div className="atms-ticket-details-page-ticket-info-container">
        <span>{userAttributes && userAttributes.first_name}</span>
        <span className="atms-ticket-details-page-conversation-comments-reply-item-comment-time">
          {<ATMS_TimeAgo timestamp={ticketDetails.postedTimeEpoch} />}
        </span>
        <p>{ticketDetails?.description}</p>
        <hr className="atms-ticket-details-page-conversation-comments-description" />
      </div>
      <div className="atms-ticket-details-page-conversation-comments-reply-parent-container">
        <div className="atms-ticket-details-page-conversation-comments-reply-container">
          {ticketDetails?.comments
            ? ticketDetails.comments.map((ticketComments: any) => {
                return (
                  <>
                    <div
                      className={
                        ticketComments.commentTo.length !== 0
                          ? 'atms-ticket-details-page-conversation-comments-reply-item commented-to-present'
                          : 'atms-ticket-details-page-conversation-comments-reply-item'
                      }
                    >
                      <Row>
                        <Col
                          span={3}
                          style={{ textAlign: 'center', marginTop: '1%' }}
                        >
                          <Avatar>
                            {ticketComments.commentFrom.at(0).toUpperCase()}
                          </Avatar>
                        </Col>
                        <Col span={21}>
                          <span className="atms-ticket-details-page-conversation-comments-reply-item-comment-from">
                            {ticketComments.commentFrom}
                          </span>
                          <span className="atms-ticket-details-page-conversation-comments-reply-item-comment-time">
                            <ATMS_TimeAgo
                              timestamp={ticketComments.commentUpdated}
                            />
                          </span>
                          {parseHtmlString(ticketComments?.commentDescription)}
                        </Col>
                      </Row>
                    </div>
                    <hr className="atms-ticket-details-page-conversation-comments-reply-item-horizontal-break" />
                  </>
                )
              })
            : 'Comments Not Found'}
        </div>
      </div>
      <div className="atms-ticket-details-page-conversation-footer-container">
        {!updateType && (
          <div className="atms-ticket-detail-page-reply-comment-button-container">
            {privileges.departmentCode && (
              <Button
                type="primary"
                onClick={replyCommentButtonHandler}
                className="atms-ticket-detail-page-reply-button"
              >
                Reply
              </Button>
            )}

            <Button
              onClick={replyCommentButtonHandler}
              className="atms-ticket-detail-page-comment-button"
            >
              Comment
            </Button>
          </div>
        )}

        {updateType === 'comment' && issueResolvers && (
          <>
            <div className="atms-ticket-details-page-comments-rich-text-editor">
              <ATMS_TicketDetailCommentsEditor
                issueResolvers={issueResolvers}
                commentsDataToPush={commentsDataToPush}
                setCommentsDataToPush={setCommentsDataToPush}
                commentFrom={userAttributes.email}
              />
            </div>
            <Button
              className="atms-ticket-detail-page-submit-updates-button"
              type="primary"
              onClick={addCommentHandler}
            >
              Add Comment
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default ATMS_TicketDetailComments
