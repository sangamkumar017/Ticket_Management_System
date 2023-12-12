import 'quill-mention'
import React, { useMemo, useState } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './ATMS_TicketDetailCommentsEditor.css'
import 'react-quill/dist/quill.bubble.css'

const ATMS_TicketDetailCommentsEditor: React.FC<any> = ({
  issueResolvers,
  setCommentsDataToPush,
  commentsDataToPush,
  commentFrom,
}) => {
  const [value, setValue] = useState<any>('')

  const atValues = issueResolvers
  const hashValues = issueResolvers?.[1].Assigned

  const mentionModuleConfig = {
    allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    mentionDenotationChars: ['@'],
    source: function (searchTerm: any, renderList: any, mentionChar: any) {
      let values

      if (mentionChar === '@') {
        values = atValues
      } else {
        values = hashValues
      }

      if (searchTerm.length === 0) {
        renderList(values, searchTerm)
      } else {
        const matches = []
        for (let i = 0; i < values.length; i++)
          if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
            matches.push(values[i])
        renderList(matches, searchTerm)
      }
    },
  }

  const modules = useMemo(() => {
    return {
      mention: mentionModuleConfig,
      toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
        ['sub'],
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    }
  }, [])

  const handleChange = (content: any, delta: any, source: any, editor: any) => {
    let commentStructure: any = {
      commentDescription: content,
      commentFrom: commentFrom,
      commentTo: [],
    }

    const element = editor.getContents()
    if (element.ops) {
      element.ops.forEach((insertedElements: any) => {
        // console.log(insertedElements.insert)
        if (insertedElements.insert?.mention) {
          if (
            !commentStructure.commentTo.includes(
              insertedElements.insert?.mention
            )
          )
            commentStructure.commentTo.push(insertedElements.insert?.mention)
        }
      })
    }
    setValue(content)
    setCommentsDataToPush(commentStructure)
  }

  console.log(value)
  return (
    <div className="atms-ticket-details-page-comment-editor-quill">
      <ReactQuill
        theme={'snow'}
        value={value}
        onChange={handleChange}
        modules={modules}
      />
    </div>
  )
}

export default ATMS_TicketDetailCommentsEditor
