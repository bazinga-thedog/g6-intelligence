import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import './CommentSystem.css'

export default function CommentSystem({ pageId = 'landing' }) {
  const [addMode, setAddMode] = useState(false)
  const [viewMode, setViewMode] = useState(false)
  const [comments, setComments] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
  const [commentText, setCommentText] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [selectedComment, setSelectedComment] = useState(null)
  const [replyingTo, setReplyingTo] = useState(null)
  const [showReplyForm, setShowReplyForm] = useState(null)

  // Use pageId prop instead of just pathname for SPA routing
  const currentPageUrl = pageId

  useEffect(() => {
    loadComments()
  }, [])

  useEffect(() => {
    if (viewMode) {
      loadComments()
    }
  }, [viewMode])

  async function loadComments() {
    try {
      const { data, error } = await supabase
        .from('page_comments')
        .select('*')
        .eq('page_url', currentPageUrl)
        .order('created_at', { ascending: false })

      if (error) throw error
      setComments(data || [])
    } catch (err) {
      console.error('Error loading comments:', err)
    }
  }

  function handlePageClick(e) {
    if (!addMode) return

    // Don't trigger if clicking on toggle buttons
    if (e.target.closest('.comment-toggles')) return

    const x = e.clientX + window.scrollX
    const y = e.clientY + window.scrollY

    setPopupPosition({ x, y })
    setShowPopup(true)
    setCommentText('')
  }

  async function saveComment() {
    if (!commentText.trim()) return

    try {
      const commentData = {
        page_url: currentPageUrl,
        comment_text: commentText,
        x_position: popupPosition.x,
        y_position: popupPosition.y,
        author_name: authorName.trim() || 'Anonymous'
      }

      // If replying to a comment, add parent reference
      if (replyingTo) {
        commentData.parent_comment_id = replyingTo
      }

      const { error } = await supabase
        .from('page_comments')
        .insert(commentData)

      if (error) throw error

      setShowPopup(false)
      setCommentText('')
      setAuthorName('')
      setReplyingTo(null)
      setShowReplyForm(null)

      // Always reload comments to update counter
      loadComments()
    } catch (err) {
      console.error('Error saving comment:', err)
      alert('Failed to save comment')
    }
  }

  function handleReplyClick(commentId) {
    setReplyingTo(commentId)
    setShowReplyForm(commentId)
    setCommentText('')
    setAuthorName('')
  }

  function cancelReply() {
    setReplyingTo(null)
    setShowReplyForm(null)
    setCommentText('')
    setAuthorName('')
  }

  // Get replies for a comment
  function getReplies(commentId) {
    return comments.filter(c => c.parent_comment_id === commentId)
  }

  // Get top-level comments (no parent)
  function getTopLevelComments() {
    return comments.filter(c => !c.parent_comment_id)
  }

  function handleMarkerClick(comment, e) {
    e.stopPropagation()
    setSelectedComment(comment)
  }

  function closeCommentView() {
    setSelectedComment(null)
  }

  useEffect(() => {
    if (addMode) {
      document.addEventListener('click', handlePageClick)
    } else {
      document.removeEventListener('click', handlePageClick)
      setShowPopup(false)
    }

    return () => {
      document.removeEventListener('click', handlePageClick)
    }
  }, [addMode, popupPosition])

  function toggleAddMode() {
    const newAddMode = !addMode
    setAddMode(newAddMode)

    if (newAddMode) {
      setViewMode(false)
      setSelectedComment(null)
      document.body.classList.add('comment-add-mode')
    } else {
      document.body.classList.remove('comment-add-mode')
    }
  }

  function toggleViewMode() {
    setViewMode(!viewMode)
    if (!viewMode) {
      setAddMode(false)
      setShowPopup(false)
      document.body.classList.remove('comment-add-mode')
    }
  }

  return (
    <>
      {/* Toggle Buttons */}
      <div className="comment-toggles">
        <button
          className={`toggle-btn ${addMode ? 'active' : ''}`}
          onClick={toggleAddMode}
          title="Add Comment Mode"
        >
          {addMode ? '✓ Add Comment' : '+ Add Comment'}
        </button>
        <button
          className={`toggle-btn ${viewMode ? 'active' : ''}`}
          onClick={toggleViewMode}
          title="View Comments"
        >
          {viewMode ? `✓ View (${comments.length})` : `View Comments (${comments.length})`}
        </button>
      </div>

      {/* Add Mode Indicator */}
      {addMode && (
        <div className="mode-indicator">
          Click anywhere on the page to add a comment
        </div>
      )}

      {/* Comment Markers in View Mode - only show top-level comments */}
      {viewMode && getTopLevelComments().map((comment) => (
        <div
          key={comment.id}
          className="comment-marker"
          style={{
            position: 'absolute',
            left: `${comment.x_position}px`,
            top: `${comment.y_position}px`
          }}
          onClick={(e) => handleMarkerClick(comment, e)}
        />
      ))}

      {/* Add Comment Popup */}
      {showPopup && (
        <div
          className="comment-popup"
          style={{
            position: 'absolute',
            left: `${popupPosition.x}px`,
            top: `${popupPosition.y}px`
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="popup-header">
            <span>Add Comment</span>
            <button onClick={() => setShowPopup(false)} className="close-btn">×</button>
          </div>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Your name (optional)"
            className="author-input"
          />
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment..."
            autoFocus
          />
          <div className="popup-actions">
            <button onClick={() => setShowPopup(false)} className="btn-cancel">
              Cancel
            </button>
            <button onClick={saveComment} className="btn-save">
              Save
            </button>
          </div>
        </div>
      )}

      {/* View Comment Popup with Replies */}
      {selectedComment && (
        <div
          className="comment-view-popup"
          style={{
            position: 'absolute',
            left: `${selectedComment.x_position}px`,
            top: `${selectedComment.y_position}px`
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="popup-header">
            <span>Comment</span>
            <button onClick={closeCommentView} className="close-btn">×</button>
          </div>
          <div className="comment-content">
            <div className="comment-author">{selectedComment.author_name || 'Anonymous'}</div>
            <p>{selectedComment.comment_text}</p>
            <span className="comment-date">
              {new Date(selectedComment.created_at).toLocaleString()}
            </span>

            {/* Reply Button */}
            {showReplyForm !== selectedComment.id && (
              <button
                className="btn-reply"
                onClick={() => handleReplyClick(selectedComment.id)}
              >
                💬 Reply
              </button>
            )}

            {/* Reply Form */}
            {showReplyForm === selectedComment.id && (
              <div className="reply-form">
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Your name (optional)"
                  className="author-input"
                />
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write your reply..."
                  autoFocus
                  className="reply-textarea"
                />
                <div className="reply-actions">
                  <button onClick={cancelReply} className="btn-cancel">
                    Cancel
                  </button>
                  <button onClick={saveComment} className="btn-save">
                    Reply
                  </button>
                </div>
              </div>
            )}

            {/* Display Replies */}
            {getReplies(selectedComment.id).length > 0 && (
              <div className="replies-section">
                <div className="replies-header">
                  {getReplies(selectedComment.id).length} {getReplies(selectedComment.id).length === 1 ? 'Reply' : 'Replies'}
                </div>
                {getReplies(selectedComment.id).map((reply) => (
                  <div key={reply.id} className="reply-item">
                    <div className="reply-author">{reply.author_name || 'Anonymous'}</div>
                    <p className="reply-text">{reply.comment_text}</p>
                    <span className="reply-date">
                      {new Date(reply.created_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
