import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import {deleteComment} from '../../actions/post'
import Avatar from 'react-avatar'
import ReactEmoji from 'react-emoji'

const CommentItem = ({
    postId,
    comment: { _id, text, name, avatar, user, date},
    auth,
    deleteComment
}) => {
    return (
        <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              {/* <img
                class="round-img"
                src={avatar}
                alt=""
              /> */}
              <Avatar className="round-img" name={name} size="100" textSizeRatio={1.70} />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {ReactEmoji.emojify(text)}
            </p>
             <p class="post-date">
                Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>
            {!auth.loading && user === auth.user._id && (
                <button onClick={e => deleteComment(postId, _id)} type="button" className="btn btn-danger">
                    <i class="fas fa-times"></i>
                </button>
            )}
          </div>
        </div>
    )
}

CommentItem.propTypes = {
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {deleteComment})(CommentItem)
